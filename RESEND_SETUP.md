# Configuration Resend pour les Emails Transactionnels

## 📧 What is Resend?

Resend est un service d'email pour développeurs. Il simplifie l'envoi d'emails transactionnels avec React et Next.js.

- **API simple** et moderne
- **Templates React** natifs
- **Test gratuit** jusqu'à 100 emails/jour
- **Production prête** avec analyse et monitoring

## ✅ Setup Steps

### 1. Créer un compte Resend

1. Allez sur [resend.com](https://resend.com)
2. Cliquez **Sign Up** (free)
3. Confirmez via email
4. Vous êtes prêt !

### 2. Obtenir votre clé API

1. Dashboard Resend → **API Keys**
2. Créez une nouvelle clé → Copiez-la
3. Ajoutez à `.env.local` :

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
```

### 3. Configurer votre domaine (Production)

Pour envoyer depuis `support@sparkresume.work` en production :

1. **Ajouter le domaine à Resend** :
   - Dashboard → Domains
   - Add Domain → `sparkresume.work`
   - Resend va vous donner les enregistrements DNS à ajouter

2. **Ajouter les DNS records** chez Namecheap :
   - Resend vous donne 3-4 records (DKIM, SPF, DMARC)
   - Copiez-les dans Namecheap DNS management
   - Ça peut prendre 24-48h

3. **Vérifier** :
   - Dans Resend Dashboard, cliquez **Verify Domain**
   - Une fois vérifié ✓, vous pouvez envoyer depuis ce domaine

### 4. Test Mode (Development)

En dev, vous pouvez envoyer depuis `onboarding@resend.dev` (test email).

C'est déjà configuré dans `emailService.ts` - pas besoin de changer !

## 📝 Emails implémentés

### 1. **WelcomeEmail** - Bienvenue
Envoyé après signup

```tsx
emailService.sendWelcomeEmail(email, name)
```

### 2. **SubscriptionConfirmEmail** - Confirmation Premium
Envoyé après paiement Stripe

```tsx
emailService.sendSubscriptionEmail(email, name, 'monthly', 4.99, '2026-05-10')
```

### 3. **DownloadConfirmEmail** - Confirmation Téléchargement
Envoyé après chaque téléchargement PDF (optionnel)

```tsx
emailService.sendDownloadConfirmEmail(email, name, 1, 1, 2)
```

## 🔗 Intégration - Où les ajouter ?

### Signup (Welcome Email)
- **File**: `/app/lib/authService.ts` ou lors du `auth.onAuthStateChange`
- **Quand**: Après confirmation email Supabase
- **Code**:
```tsx
await emailService.sendWelcomeEmail(email, name)
```

### Premium Upgrade (Subscription Email)
- **File**: `/app/lib/subscriptionService.ts` - fonction `upgradeToPremium()`
- **Quand**: Après paiement Stripe réussi
- **Code**:
```tsx
const renewalDate = new Date()
renewalDate.setDate(renewalDate.getDate() + 30) // ou 365
await emailService.sendSubscriptionEmail(
  email, 
  name, 
  'monthly', 
  4.99, 
  renewalDate.toLocaleDateString()
)
```

### Download (Optional - Limiter l'envoi)
- **File**: `/app/lib/subscriptionService.ts` - fonction `trackPdfDownload()`
- **Note**: Envoyer seulement si prochaine limite sera atteinte
- **Code**:
```tsx
if (downloadCount >= 1 && downloadCount < 2) {
  // Send only on 2nd download (warning)
  await emailService.sendDownloadConfirmEmail(...)
}
```

## 🧪 Test en Development

### Option 1: Utiliser l'email de test Resend
- L'email `onboarding@resend.dev` reçoit tous les tests
- C'est déjà configuré - aucun changement nécessaire

### Option 2: Verifier les logs
- Check server console après `npm run dev`
- Resend log les envois : `Email sent: {...}`

## 💰 Tarification

- **Gratuit**: 100 emails/jour
- **Premium**: $20/mois pour usage illimité
- **Pay-as-you-go**: $0.25 par email

## 🔐 Security Notes

- ✅ API Key ne s'expose jamais (server-side seulement)
- ✅ Templates React compilent en HTML sécurisé
- ✅ Possibilité d'ajouter balise `List-Unsubscribe` plus tard

## Prochaines étapes

1. ✅ Resend emails créés (templates + service)
2. 🔄 Intégrer dans signup → sendWelcomeEmail()
3. 🔄 Intégrer dans upgrade → sendSubscriptionEmail()
4. 🔄 Stripe integration (suivant)

## Questions ?

Allez voir :
- [Resend Docs](https://resend.com/docs)
- [React Email Docs](https://react.email)
