# 🚀 Déploiement SparkResume sur Vercel

## 📋 Prérequis

- ✅ Compte GitHub créé
- ✅ Repository Git local prêt (fait!)
- ✅ Vercel CLI installé

---

## Étape 1: Push sur GitHub

### A. Créer un repository GitHub

1. Allez sur https://github.com/new
2. Remplissez:
   - **Repository name:** `sparkresume`
   - **Description:** `SparkResume - CV Builder with Supabase`
   - **Public** (pour que Vercel puisse accéder)
3. Cliquez **"Create repository"**
4. **NE cochez PAS** "Initialize with README" (on a déjà du contenu)

### B. Push le code sur GitHub

Exécutez dans le terminal:

```bash
cd /Users/oscar/projects/sparkresume-main

# Ajouter le remote GitHub
git remote add origin https://github.com/YOUR_USERNAME/sparkresume.git

# Renommer la branche (GitHub utilise 'main' par défaut)
git branch -M main

# Pousser le code
git push -u origin main
```

⚠️ **Remplacez `YOUR_USERNAME`** par votre nom d'utilisateur GitHub!

---

## Étape 2: Déployer sur Vercel

### Option A: Via Interface Web (Recommandé - Plus facile)

1. Allez sur https://vercel.com
2. Cliquez **"Sign Up"** ou connectez-vous avec GitHub
3. Cliquez **"New Project"**
4. Sélectionnez le repository `sparkresume` de GitHub
5. **Configurez les variables d'environnement:**

```
NEXT_PUBLIC_SUPABASE_URL=https://ubmijpjeopiqzroobxqm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_VtqSGCJnu0D26E8COEmmpA_UlBgDttE
```

6. Cliquez **"Deploy"**
7. Attendez 2-3 minutes que le build se termine
8. Vous recevrez une URL: `https://sparkresume-xxxxx.vercel.app`

### Option B: Via CLI Vercel

Si vous voulez déployer depuis le terminal:

```bash
# Installer Vercel CLI (si pas encore fait)
npm install -g vercel

# Se connecter à Vercel (ouvrira un navigateur)
vercel login

# Déployer
cd /Users/oscar/projects/sparkresume-main
vercel --prod
```

---

## ✅ Après le Déploiement

### 1. Vérifier que le site fonctionne

- Allez à votre URL Vercel: `https://sparkresume-xxxxx.vercel.app`
- Testez le sign-up: `/signup`
- Testez le login: `/login`
- Allez aux templates: `/templates` (devrait rediriger si pas connecté)

### 2. Voir les logs de déploiement

- Allez sur https://vercel.com/dashboard
- Cliquez sur votre projet `sparkresume`
- Cliquez "Deployments"
- Cliquez sur le dernier déploiement
- Allez à "Logs" pour voir les erreurs

### 3. Vérifier les variables d'environnement

- Dans Vercel Dashboard → Settings → Environment Variables
- Confirmez que `NEXT_PUBLIC_SUPABASE_*` sont là

---

## 🔧 Dépannage Courant

### "Website not available"
- Attendez 2-3 minutes, Vercel compile pas mal de trucs
- Actualisez la page (F5)

### "Error: Supabase connection failed"
- Vérifiez que les variables d'environnement sont correctes
- Vérifiez que Supabase est en ligne

### "Build failed"
- Allez à Vercel Dashboard → Deployments → Logs
- Lisez l'erreur (souvent TypeScript ou dépendances manquantes)
- Corrigez et poussez un nouveau commit à GitHub
- Vercel redéploiera automatiquement

### Sign-up ne fonctionne pas
- Vérifiez la console (F12) pour voir l'erreur exacte
- Vérifiez les logs Vercel

---

## 📊 Prochaines Étapes

1. ✅ Push sur GitHub
2. ✅ Déployer sur Vercel
3. ⏳ **Acheter un domaine personnalisé**
4. ⏳ **Configurer DNS**
5. ⏳ **Ajouter le domaine à Vercel**

---

## 🎯 Résumé Rapide

```bash
# 1. Push sur GitHub
git remote add origin https://github.com/YOUR_USERNAME/sparkresume.git
git branch -M main
git push -u origin main

# 2. Déployer sur Vercel (via web)
# Allez sur https://vercel.com
# Cliquez "New Project" → Sélectionnez sparkresume
# Ajoutez les variables d'environnement
# Cliquez "Deploy"

# 3. Vérifier
# Allez à https://sparkresume-xxxxx.vercel.app
# Testez sign-up/login
```

---

## ❓ Besoin d'aide?

Dis-moi:
- ✅ Quand ton repo GitHub est prêt
- ✅ Quand ton site est en ligne sur Vercel
- ❌ Le problème exact si erreur de build/déploiement

Prêt? 🚀
