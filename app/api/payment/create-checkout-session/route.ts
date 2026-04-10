import { NextRequest, NextResponse } from 'next/server'
import { stripeService } from '@/app/lib/stripeService'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const { priceId, plan } = await request.json()

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
      { error: 'Failed to create checkout session', details: String(error) },
      { status: 500 }
    )
  }
}
