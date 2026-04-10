let stripe: any = null

function getStripe() {
  if (!stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('Missing STRIPE_SECRET_KEY environment variable')
    }
    // Lazy import Stripe only when needed
    const Stripe = require('stripe').default
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
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
      const session = await getStripe().checkout.sessions.create({
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
      const session = await getStripe().checkout.sessions.retrieve(sessionId)
      return session
    } catch (error) {
      console.error('Error retrieving session:', error)
      throw error
    }
  },

  /**
   * Construct webhook event from raw body and signature
   */
  constructEvent(body: string, signature: string, secret: string) {
    try {
      return getStripe().webhooks.constructEvent(body, signature, secret)
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
      return await getStripe().customers.retrieve(customerId)
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
      return await getStripe().subscriptions.retrieve(subscriptionId)
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
      return await getStripe().customers.create({
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
