import { NextRequest, NextResponse } from 'next/server'
import { stripeService } from '@/app/lib/stripeService'
import { supabase } from '@/app/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { priceId, plan } = await request.json()

    // Get user from auth header or session
    const { data: { session } } = await supabase.auth.getSession()

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userEmail = session.user.email || ''
    const userId = session.user.id

    if (!userEmail) {
      return NextResponse.json(
        { error: 'No email found' },
        { status: 400 }
      )
    }

    // Create checkout session
    const checkoutSession = await stripeService.createCheckoutSession(
      priceId,
      userEmail,
      userId,
      plan
    )

    return NextResponse.json({ sessionId: checkoutSession.id })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
