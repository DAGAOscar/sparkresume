# 🚀 Instructions Supabase - Étape par Étape

## ✅ Ce qui a été créé:

1. **database.sql** - Script SQL complet avec:
   - ✅ Tables: profiles, cvs, cv_data, templates_used
   - ✅ Row Level Security (RLS) pour protéger les données
   - ✅ Indextes pour la performance
   - ✅ Triggers pour créer un profil à chaque sign-up

2. **app/lib/cvService.ts** - Service pour gérer:
   - ✅ Lister/créer/update/supprimer les CVs
   - ✅ Sauvegarder/charger les données CV
   - ✅ Suivre l'utilisation des templates

3. **app/hooks/useCVs.ts** - Hooks React pour:
   - ✅ useCVs() - Gérer la liste de CVs
   - ✅ useCVData() - Gérer les données d'un CV
   - ✅ useTemplateTracking() - Suivre les templates

---

## 📋 INSTRUCTIONS POUR CONFIGURER SUPABASE

### Étape 1: Exécuter le SQL

1. **Ouvrez:** https://supabase.com/dashboard
2. **Sélectionnez** votre projet: "ubmijpjeopiqzroobxqm"
3. **Allez à:** "SQL Editor" (menu gauche)
4. **Cliquez:** "New Query" 
5. **Copiez** le fichier `database.sql` **entièrement**
6. **Collez** dans l'éditeur SQL
7. **Cliquez:** le bouton "Run" (ou Cmd+Enter)
8. **Attendez:** La page confirme "Success"

✅ **Vérification:**
- Allez à "Table Editor" (menu gauche) 
- Vous devez voir les 4 tables:
  - profiles
  - cvs
  - cv_data
  - templates_used

---

### Étape 2: Configurer Email pour Sign-up

1. **Allez à:** Authentication > Email (menu gauche)
2. **Activez:**
   - ✅ "Enable Email provider"
   - ✅ Cocher "Confirm email"
   - ✅ Cocher "Enable sign in with email link"

3. **Testez:**
   ```
   http://localhost:3000/signup
   - Remplissez: email + password
   - Cliquez "Create Account"
   - Vérifiez que ça fonctionne
   ```

---

### Étape 3: Vérifier les Données de Connexion

Dans Supabase, allez à:
- **Settings > API**
- Vous verrez:
  - `Project URL`: https://ubmijpjeopiqzroobxqm.supabase.co
  - `Anon Key`: sb_publishable_VtqSGCJnu0D26E... (votre clé)

✅ Ces valeurs sont déjà dans `.env.local`

---

### Étape 4: Tester les Opérations BD

Dans `SQL Editor`, testez ces requêtes:

**A. Lister tous les profils:**
```sql
SELECT * FROM profiles;
```

**B. Lister tous les CVs d'un utilisateur:**
```sql
SELECT * FROM cvs WHERE user_id = (SELECT id FROM auth.users LIMIT 1);
```

**C. Vérifier la Sécurité RLS:**
```sql
SELECT tablename FROM pg_tables WHERE tablename IN ('profiles', 'cvs', 'cv_data', 'templates_used');
```

---

## 📝 UTILISER LES SERVICES DANS L'APP

### Exemple 1: Lister les CVs de l'utilisateur

**Fichier: app/dashboard/page.tsx**

```typescript
'use client';

import { useCVs } from '@/app/hooks/useCVs';

export default function Dashboard() {
  const { cvs, loading, error } = useCVs();

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div>
      <h1>Mes CVs</h1>
      {cvs.map(cv => (
        <div key={cv.id}>
          <h3>{cv.name}</h3>
          <p>Créé: {new Date(cv.created_at).toLocaleDateString('fr-FR')}</p>
        </div>
      ))}
    </div>
  );
}
```

### Exemple 2: Créer un nouveau CV

```typescript
import { useCVs } from '@/app/hooks/useCVs';

export default function NewCVButton() {
  const { addCV } = useCVs();

  const handleCreate = async () => {
    const newCV = await addCV('Mon nouveau CV', 1);
    if (newCV) {
      console.log('CV créé:', newCV.id);
    }
  };

  return <button onClick={handleCreate}>Nouveau CV</button>;
}
```

### Exemple 3: Sauvegarder les données CV

```typescript
import { useCVData } from '@/app/hooks/useCVs';

export default function CVBuilder({ cvId }: { cvId: string }) {
  const { saveCVContent, loading } = useCVData(cvId);

  const handleSave = async () => {
    const cvData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '0123456789',
      location: 'Paris',
      summary: 'Developer expérimenté',
      experience: [...],
      education: [...],
      skills: ['JavaScript', 'React', 'Next.js'],
      languages: [...],
      // ... autres champs
    };

    const result = await saveCVContent(cvData);
    if (result) {
      alert('CV sauvegardé!');
    }
  };

  return (
    <button onClick={handleSave} disabled={loading}>
      {loading ? 'Sauvegarde...' : 'Sauvegarder'}
    </button>
  );
}
```

---

## 🔒 Sécurité: Qu'est-ce que RLS?

**Row Level Security** = Protection automatique des données

✅ **Garanties:**
- Chaque utilisateur ne voit QUE ses propres CVs
- Pas d'accès aux CVs d'autres utilisateurs
- Protégé au niveau de la base de données

**Exemple:**
```sql
-- Utilisateur A essaie d'accéder au CV de l'Utilisateur B
SELECT * FROM cvs WHERE user_id = 'user-B-id';
-- ❌ Erreur: "RLS denied"
```

---

## ✅ Checklist

- [ ] SQL exécuté dans Supabase ✓
- [ ] Les 4 tables créées ✓
- [ ] RLS activé ✓
- [ ] Email configuré ✓
- [ ] Test sign-up fonctionne ✓
- [ ] Hooks importables dans l'app ✓
- [ ] Dev server compile sans erreur ✓

---

## 🚀 Prochaines Étapes

### C'est fait:
✅ 1. Base de données créée
✅ 2. Services TypeScript créés 
✅ 3. Hooks React créés

### À faire:
⏳ 3. **Tester save/load CV en local** 
⏳ 4. **Intégrer dans builder/dashboard**
⏳ 5. **Déployer sur Vercel**
⏳ 6. **Acheter domaine**

---

## ❓ Questions?

Si une erreur survient:
1. Vérifiez que le SQL a bien tourné (pas d'erreurs)
2. Vérifiez les variables `.env.local`
3. Vérifiez que vous êtes connecté à Supabase dans l'app

Prêt pour la prochaine étape? Dis-moi! 🚀
