import type Stripe from 'stripe'

let stripe: Stripe | null = null

async function getStripe(): Promise<Stripe> {
  if (!stripe) {
    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) {
      console.error('STRIPE_SECRET_KEY is not defined in environment variables')
      console.error('Available env vars:', Object.keys(process.env).filter(k => k.includes('STRIPE')))
      throw new Error(
        `Missing STRIPE_SECRET_KEY environment variable. ` +
        `Make sure it's defined in .env.local or your production environment.`
      )
    }
    // Dynamic import to avoid module-level evaluation issues
    const { default: Stripe } = await import('stripe')
    stripe = new Stripe(secretKey, {
      typescript: true,
    })
  }
  return stripe
}

export const stripeService = {
  /**
   * Create a checkout session for payment
   * Returns a session ID to redirect to Stripe Checkout
   */
  async createCheckoutSession(
    priceId: string,
    userEmail: string,
    userId: string,
    plan: 'monthly' | 'yearly'
  ) {
    try {
      const stripeInstance = await getStripe()
      const session = await stripeInstance.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/upgrade?session_id={CHECKOUT_SESSION_ID}&status=success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/upgrade?status=cancelled`,
        customer_email: userEmail,
        client_reference_id: userId,
        metadata: {
          userId,
          plan,
          userEmail,
        },
        billing_address_collection: 'auto',
      })

      return session
    } catch (error) {
      console.error('Error creating checkout session:', error)
      throw error
    }
  },

  /**
   * Retrieve a checkout session
   */
  async retrieveSession(sessionId: string) {
    try {
      const stripeInstance = await getStripe()
      const session = await stripeInstance.checkout.sessions.retrieve(sessionId)
      return session
    } catch (error) {
      console.error('Error retrieving session:', error)
      throw error
    }
  },

  /**
   * Construct webhook event from raw body and signature
   */
  async constructEvent(body: string, signature: string, secret: string) {
    try {
      const stripeInstance = await getStripe()
      return stripeInstance.webhooks.constructEvent(body, signature, secret)
    } catch (error) {
      console.error('Error verifying webhook signature:', error)
      throw error
    }
  },

  /**
   * Retrieve customer from Stripe
   */
  async retrieveCustomer(customerId: string) {
    try {
      const stripeInstance = await getStripe()
      return await stripeInstance.customers.retrieve(customerId)
    } catch (error) {
      console.error('Error retrieving customer:', error)
      throw error
    }
  },

  /**
   * Retrieve subscription details
   */
  async retrieveSubscription(subscriptionId: string) {
    try {
      const stripeInstance = await getStripe()
      return await stripeInstance.subscriptions.retrieve(subscriptionId)
    } catch (error) {
      console.error('Error retrieving subscription:', error)
      throw error
    }
  },

  /**
   * Create Stripe customer
   */
  async createCustomer(email: string, userId: string) {
    try {
      const stripeInstance = await getStripe()
      return await stripeInstance.customers.create({
        email,
        metadata: {
          userId,
        },
      })
    } catch (error) {
      console.error('Error creating customer:', error)
      throw error
    }
  },
}

// Stripe product and price IDs
export const stripePrices = {
  monthly: {
    productId: 'prod_UJJxfwXA34uEsD',
    priceId: 'price_1TKhJuGYkMKHdQzhMrICt2VW',
    amount: 100, // $1.00 USD in cents
    interval: 'month',
  },
  yearly: {
    productId: 'prod_UJK06Elc7tzzLr',
    priceId: 'price_1TKhMaGYkMKHdQzhOdRGRVoR',
    amount: 1000, // $10.00 USD in cents
    interval: 'year',
  },
}
