# Configuration Stripe pour les Paiements

## 📋 What is Stripe?

Stripe est la plateforme de paiement leader pour les applications. Elle gère:
- Cartes de crédit
- Abonnements
- Webhooks (confirmations de paiement)
- Dashboard de monitoring

## ✅ Setup Steps

### 1. Créer un compte Stripe

1. Allez sur [stripe.com](https://stripe.com)
2. Cliquez **Sign up**
3. Remplissez les informations
4. Vérifiez votre email

### 2. Obtenir les Test Keys

1. **Dashboard Stripe** → **Developers** (coin haut-droit)
2. **API Keys** dans la section Developers
3. Copiez les 2 clés **Test Mode** (mode de test):
   - **Publishable Key** (commence par `pk_test_`)
   - **Secret Key** (commence par `sk_test_`)

4. Ajoutez à `.env.local`:
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_test_xxxxxxxxxxxxxxxxxxxx  # Vous aurez ça after webhook setup
```

### 3. Créer les Products et Prices dans Stripe

**Via Dashboard Stripe :**

#### Product 1: Monthly
1. **Billing** → **Products**
2. **+ Add product**
   - Name: `SparkResume Premium Monthly`
   - Type: Service
   - Create Product

3. Dans le product, **Add pricing**
   - Price: `$4.99`
   - Billing Period: **Monthly**
   - Recurring: Yes

4. **Copy le Price ID** (commence par `price_`)
   - Collez dans `.env.local` ou `stripePrices.monthly.priceId` en code

#### Product 2: Yearly
Même processus mais:
- Price: `$39.99`
- Billing Period: **Yearly**

### 4. Mettre à jour le code avec Price IDs

**File: `/app/lib/stripeService.ts`**

```typescript
export const stripePrices = {
  monthly: {
    priceId: 'price_xxx...',  // ← Votre Price ID Stripe
    amount: 499,
  },
  yearly: {
    priceId: 'price_yyy...',   // ← Votre Price ID Stripe
    amount: 3999,
  },
}
```

### 5. Setup du Webhook (Important!)

**Via CLI** (Recommended pour test):

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Stripe va afficher:
```
> Ready! Your webhook signing secret is: whsec_test_xxxx...
```

Copiez et adjoutez à `.env.local`:
```env
STRIPE_WEBHOOK_SECRET=whsec_test_xxxx...
```

**Ou via Dashboard:**

1. **Developers** → **Webhooks**
2. **+ Add an endpoint**
   - URL: `https://sparkresume.work/api/webhooks/stripe` (en production)
   - Events: Select `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
3. Copy le signing secret → `.env.local`

### 6. Test le flux complet

1. Start dev server:
```bash
npm run dev
```

2. Allez sur `/upgrade`
3. Cliquez sur un pricing button
4. Vous allez être redirigé à Stripe Checkout

5. **Test Card Numbers** (Stripe donne):
   - Visa: `4242 4242 4242 4242`
   - Mastercard: `5555 5555 5555 4444`
   - Any future expiry date
   - Any 3-digit CVV

6. Remplissez et testez!

7. Vérifiez dans terminal où vous avez `stripe listen`:
   ```
   2024-04-10 10:23:45  checkout.session.completed
   ```

## 🔗 Routes Implémentées

### POST `/api/payment/create-checkout-session`
Crée une session de checkout Stripe
```
Body: { priceId, plan: 'monthly' | 'yearly' }
Response: { sessionId: 'cs_xxx...' }
```

### GET `/api/payment/retrieve-session?session_id=cs_xxx`
Récupère les détails d'une session
```
Response: Stripe Session object
```

### POST `/api/webhooks/stripe`
Webhook receiver (Stripe envoie les événements)
- Gère: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
- Appelle: `upgradeToPremium()` + `emailService.sendSubscriptionEmail()`
- Met à jour: `profiles.subscription_tier`, `subscription_expires_at`, `stripe_customer_id`

## 📧 Flux Complet

```
User clicks "Upgrade"
    ↓
/upgrade page loads
    ↓
Utilisateur choisit plan (monthly/yearly)
    ↓
Click "Passer à Premium"
    ↓
POST /api/payment/create-checkout-session
    ↓
Redirigé à Stripe Checkout
    ↓
User remplit payment details
    ↓
Payment réussi
    ↓
Stripe envoie webhook: checkout.session.completed
    ↓
POST /api/webhooks/stripe (reçoit l'event)
    ↓
✓ upgradeToPremium(userId, days)
✓ emailService.sendSubscriptionEmail()
✓ Updated profile avec subscription_tier = 'premium'
    ↓
User redirected to /upgrade?status=success
```

## 💳 Stripe Test Mode vs Live Mode

### Test Mode (Development)
- ✅ Use test keys (`pk_test_`, `sk_test_`)
- ✅ Test card numbers fournis
- ✅ Pas de vrais paiements
- ✅ Sandbox pour tester le flow

### Live Mode (Production)
- ⚠️ Use live keys (`pk_live_`, `sk_live_`)
- ⚠️ Real payments charged to real cards
- ⚠️ Stripes takes 2.9% + $0.30 per transaction
- ⚠️ Only after full testing complete

## 🔐 Security Notes

- ✅ Secret Key no exposé (server-side seulement)
- ✅ Webhook signature vérifié (prevent spoofing)
- ✅ All payments via HTTPS
- ✅ Customer data encrypted

## 📊 Monitoring Payments

**Stripe Dashboard:**
1. **Billing** → **Subscriptions**
   - Voir tous les users premium
   - Voir renewal dates
   - Voir which plan ils ont

2. **Payments**
   - Voir toutes les transactions
   - Fees breakdown
   - Refund options

## Troubleshooting

### Payment échoue
- Vérifiez les Price IDs dans `stripePrices`
- Vérifiez que webhook est setup
- Check Stripe Dashboard → Events

### Webhook non reçu
- `stripe listen` est-il runné?
- URL webhook correcte?
- Port 3000 ouvert?

### Email not sent
- Resend API key configuré?
- Check server logs pour erreurs

## Prochaines étapes

1. ✅ Stripe packages installés
2. ✅ API routes créées (checkout, webhook)
3. ✅ Database schema updated (stripe_customer_id)
4. 🔄 **GET Stripe Test Keys** ← You are here
5. 🔄 **Create Products & Prices** sur Stripe Dashboard
6. 🔄 **Setup Webhook** avec `stripe listen` ou Dashboard
7. 🔄 **Test end-to-end** payment flow
8. 🔄 Update `/upgrade` page avec Stripe button (suivant)

## Besoin d'aide?

- [Stripe Docs](https://stripe.com/docs)
- [Stripe Testing](https://stripe.com/docs/testing)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)
