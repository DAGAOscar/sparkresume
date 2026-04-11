import { NextRequest, NextResponse } from 'next/server'
import { stripeService } from '@/app/lib/stripeService'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    // Validate required environment variables
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY not found in environment')
      return NextResponse.json(
        { 
          error: 'Payment system is not configured', 
          details: 'STRIPE_SECRET_KEY is missing from environment variables' 
        },
        { status: 500 }
      )
    }

    if (!process.env.NEXT_PUBLIC_APP_URL) {
      console.error('NEXT_PUBLIC_APP_URL not found in environment')
      return NextResponse.json(
        { 
          error: 'Payment system is not configured', 
          details: 'NEXT_PUBLIC_APP_URL is missing from environment variables' 
        },
        { status: 500 }
      )
    }

    const { priceId, plan } = await request.json()

    // Validate input
    if (!priceId) {
      return NextResponse.json(
        { error: 'Missing priceId parameter' },
        { status: 400 }
      )
    }

    if (!plan || !['monthly', 'yearly'].includes(plan)) {
      return NextResponse.json(
        { error: 'Invalid plan parameter' },
        { status: 400 }
      )
    }

    // Get auth token from request header
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Missing authorization header' },
        { status: 401 }
      )
    }

    // Extract token
    const token = authHeader.replace('Bearer ', '')

    // Create Supabase client with token
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    )

    // Get user from token
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      console.error('Error getting user:', userError)
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userEmail = user.email || ''
    const userId = user.id

    if (!userEmail) {
      return NextResponse.json(
        { error: 'No email found for user' },
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
    const errorMessage = error instanceof Error ? error.message : String(error)
    return NextResponse.json(
      { 
        error: 'Failed to create checkout session', 
        details: errorMessage 
      },
      { status: 500 }
    )
  }
}
