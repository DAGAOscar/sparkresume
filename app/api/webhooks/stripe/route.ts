import { NextRequest, NextResponse } from 'next/server'
import { stripeService } from '@/app/lib/stripeService'
import { upgradeToPremium } from '@/app/lib/subscriptionService'
import { emailService } from '@/app/lib/emailService'
import { supabase } from '@/app/lib/supabase'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature') || ''

    if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
      console.error('Missing signature or webhook secret')
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      )
    }

    // Verify webhook signature
    let event: Stripe.Event
    try {
      event = stripeService.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      )
    } catch (error) {
      console.error('Webhook signature verification failed:', error)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutSessionCompleted(session)
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdated(subscription)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(subscription)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

/**
 * Handle successful checkout
 */
async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  try {
    const userId = session.client_reference_id
    const userEmail = session.customer_email || ''
    const subscriptionId = session.subscription as string
    const plan = (session.metadata?.plan as 'monthly' | 'yearly') || 'monthly'

    if (!userId) {
      console.error('No user ID in session metadata')
      return
    }

    // Retrieve user details from Supabase
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, email')
      .eq('id', userId)
      .single()

    const userName = profile?.full_name || 'User'
    const userEmailToUse = profile?.email || userEmail

    // Calculate expiration date
    const expirationDays = plan === 'monthly' ? 30 : 365
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + expirationDays)

    // Update user subscription in database
    await upgradeToPremium(userId, expirationDays)

    // Update Stripe customer metadata with subscription
    await supabase
      .from('profiles')
      .update({
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: subscriptionId,
        subscription_tier: 'premium',
        subscription_expires_at: expirationDate.toISOString(),
      })
      .eq('id', userId)

    // Send subscription confirmation email
    if (userEmailToUse) {
      const price = plan === 'monthly' ? 4.99 : 39.99
      await emailService.sendSubscriptionEmail(
        userEmailToUse,
        userName,
        plan,
        price,
        expirationDate.toLocaleDateString('fr-FR')
      )
    }

    console.log(`✓ Subscription completed for user ${userId}`)
  } catch (error) {
    console.error('Error handling checkout completion:', error)
  }
}

/**
 * Handle subscription update
 */
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  try {
    const userId = subscription.metadata?.userId as string

    if (!userId) {
      console.error('No user ID in subscription metadata')
      return
    }

    // Update subscription status in database
    await supabase
      .from('profiles')
      .update({
        stripe_subscription_id: subscription.id,
        subscription_tier: subscription.status === 'active' ? 'premium' : 'free',
      })
      .eq('id', userId)

    console.log(`✓ Subscription updated for user ${userId}`)
  } catch (error) {
    console.error('Error handling subscription update:', error)
  }
}

/**
 * Handle subscription cancellation
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  try {
    const userId = subscription.metadata?.userId as string

    if (!userId) {
      console.error('No user ID in subscription metadata')
      return
    }

    // Revert to free tier
    await supabase
      .from('profiles')
      .update({
        subscription_tier: 'free',
        subscription_expires_at: null,
      })
      .eq('id', userId)

    console.log(`✓ Subscription cancelled for user ${userId}`)
  } catch (error) {
    console.error('Error handling subscription cancellation:', error)
  }
}
