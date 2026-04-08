# 📦 Guide Installation Base de Données & Email

## Phase 1: Créer la Base de Données

### Étape 1: Exécuter le SQL dans Supabase

1. **Accédez à la console Supabase:**
   - Allez sur https://supabase.com/dashboard
   - Cliquez sur votre projet `ubmijpjeopiqzroobxqm`

2. **Allez à SQL Editor:**
   - Cliquez sur "SQL Editor" dans le menu de gauche
   - Cliquez sur "New Query"

3. **Copiez-collez le SQL:**
   - Ouvrez le fichier `database.sql` à la racine du projet
   - Copiez **tout le contenu**
   - Collez-le dans l'éditeur SQL de Supabase
   - Cliquez "Run" (ou Cmd+Enter)

4. **Vérifiez la création:**
   - Les tables doivent apparaître dans le menu "Table Editor" à gauche:
     - `profiles`
     - `cvs`
     - `cv_data`
     - `templates_used`

✅ **Problèmes courants:**
- Si une table existe déjà → Utilisez "DROP TABLE IF EXISTS" avant
- Si l'erreur concerne auth.users → C'est normal, Supabase crée ça automatiquement

---

## Phase 2: Configurer Email avec Supabase

### Option A: Email intégré Supabase (Recommandé - Gratuit)

1. **Allez à Authentication > Providers:**
   - https://supabase.com/dashboard → Votre projet
   - Menu gauche: "Authentication" > "Providers"
   - Cherchez "Email"
   - Activez "Email OTP" et "Email Link"

2. **Configurez les templates:**
   - Allez à "Email Templates" (même menu)
   - Personnalisez les emails pour:
     - Confirmation d'email
     - Réinitialisation de mot de passe
     - Notification de sign-in

3. **Testez:**
   ```
   Allez à http://localhost:3000/signup
   - Inscrivez-vous avec un email test
   - Vérifiez que vous reçoirez des emails
   ```

### Option B: Service Email Externe (SendGrid, Resend, etc.)

Pour la production, je recommande **Resend** (simple pour Next.js):

**Installation:**
```bash
npm install resend
```

**Configuration:**
1. Créez un compte sur https://resend.com
2. Générez une API Key
3. Ajoutez à `.env.local`:
```
RESEND_API_KEY=your_api_key_here
```

4. Créez le service email: créez `/app/lib/emailService.ts`

---

## Phase 3: Utiliser les Services dans l'App

### Exemple 1: Sauvegarder un CV

```typescript
import { useCVData } from '@/app/hooks/useCVs';

function BuilderPage() {
  const { saveCVContent } = useCVData(currentCVId);

  const handleSave = async () => {
    const cvData = {
      name: "My CV",
      email: "user@example.com",
      experience: [...],
      education: [...],
      // ... autres champs
    };
    
    await saveCVContent(cvData);
    alert('CV saved successfully!');
  };

  return <button onClick={handleSave}>Save CV</button>;
}
```

### Exemple 2: Charger les CVs de l'utilisateur

```typescript
import { useCVs } from '@/app/hooks/useCVs';

function DashboardPage() {
  const { cvs, loading } = useCVs();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {cvs.map(cv => (
        <div key={cv.id}>
          <h3>{cv.name}</h3>
          <p>Template: {cv.template_id}</p>
        </div>
      ))}
    </div>
  );
}
```

### Exemple 3: Créer un nouveau CV

```typescript
import { useCVs } from '@/app/hooks/useCVs';

function NewCVButton() {
  const { addCV } = useCVs();

  const handleCreate = async () => {
    const newCV = await addCV('Nouveau CV', 1);
    if (newCV) {
      router.push(`/builder/${newCV.id}`);
    }
  };

  return <button onClick={handleCreate}>New CV</button>;
}
```

---

## 🔒 Sécurité: Row Level Security (RLS)

**Les politiques de sécurité sont déjà configurées!**

Elles garantissent que:
- ✅ Chaque utilisateur ne peut voir QUE ses propres CVs
- ✅ Impossible d'accéder aux CVs d'un autre utilisateur
- ✅ Les données sont protégées au niveau de la base de données

---

## ✅ Checklist de Vérification

- [ ] Les 4 tables sont créées dans Supabase
- [ ] RLS est activé sur toutes les tables
- [ ] Email Supabase est configuré
- [ ] Test d'inscription fonctionne
- [ ] Test de récuperati d'email fonctionne
- [ ] Les hooks `useCVs` et `useCVData` sont importables

---

## 📝 Prochaines Étapes

1. ✅ **Base de données créée** 
2. ✅ **Email configuré**
3. ⏳ **Intégrer save/load CV dans Builder** 
4. ⏳ **Intégrer save/load CV dans Dashboard**
5. ⏳ **Déployer sur Vercel**
6. ⏳ **Acheter domaine**

Besoin d'aide? Dis-moi quoi faire ensuite! 🚀
