# Galerie de Templates SparkResume

## Vue d'ensemble

SparkResume dispose maintenant d'une **Galerie de Templates** dédiée où les utilisateurs peuvent:
- Parcourir les 20 templates disponibles
- Prévisualiser chaque template en format A4
- Sélectionner leur template préféré pour la construction du CV
- Le CV initial reste **complètement indépendant** des templates texte

## Structure

### Pages et Composants

#### 1. **Page: `/app/templates/page.tsx`**
La page principale de la galerie de templates
- Affiche la liste de tous les templates à gauche
- Affiche l'aperçu A4 du template sélectionné à droite
- Permet de sélectionner un template et de naviguer vers le builder
- Utilise les données d'exemple pour montrer tous les templates

#### 2. **Composant: `TemplateGallery.tsx`**
Liste scrollable des 20 templates
- Affiche le nom et la description de chaque template
- Indique le template sélectionné avec un badge
- Montre un aperçu du texte du template
- Interface intuitive avec sélection en un clic

#### 3. **Composant: `A4TemplatePreview.tsx`**
Affichage du template en format A4
- Simule exactement les dimensions d'une page A4 (210mm × 297mm)
- Affiche le contenu texte du template sélectionné
- Bouton pour imprimer
- Bouton pour télécharger en format TXT

## Navigation

### Accès à la galerie de templates depuis:

1. **Page d'accueil** (`/`)
   - Bouton "View Templates" au lieu de "Try Demo"

2. **En-tête de navigation** (Header)
   - Nouveau lien "Templates" dans le menu desktop et mobile
   - Accessible depuis n'importe quelle page

3. **Page du Builder** (`/builder`)
   - Bouton "Browse Templates Gallery" sous le sélecteur de template
   - Accessible en desktop et en mobile

## Design Responsif

### Desktop (1024px+)
```
┌─────────────────────────────────────────────┐
│ Back to Builder | CV Templates Gallery      │
├────────────────┬────────────────────────────┤
│  Templates     │                            │
│  List (1/3)    │   A4 Preview (2/3)        │
│  - Template 1  │   ┌──────────────────┐    │
│  - Template 2  │   │                  │    │
│  ...           │   │  A4 Format       │    │
│  - Template 20 │   │  Preview         │    │
│                │   │                  │    │
└────────────────┴────────────────────────────┘
```

### Tablet & Mobile
- Affichage vertical
- Templates list en full width (scrollable)
- Aperçu A4 dessous (scrollable)

## Indépendance du CV Initial

✅ **Le CV visuel existant reste indépendant**
- Localisation: `/app/components/CVPreview.tsx`
- Utilise sa propre mise en page et styling
- Affiche les données du formulaire du builder
- Peut être thématisé avec 32 thèmes DaisyUI

✅ **Les Templates Texte sont séparés**
- Généré par les classes de templates
- Formaté pour ATS (Applicant Tracking Systems)
- Format plain text (.txt)
- Pas d'impact sur le CV visuel

## Flux de Données

```
Page Templates (/templates)
    ↓
Affiche TemplateGallery + A4TemplatePreview
    ↓
Utilisateur sélectionne un template
    ↓
A4TemplatePreview change pour montrer le template sélectionné
    ↓
Utilisateur clique "Go to Builder"
    ↓
Navigue vers /builder avec templateId en localStorage (optionnel)
    ↓
Builder crée le CV avec le template sélectionné
```

## Fonctionnalités

### Galerie
- [x] Liste de tous les 20 templates
- [x] Sélection intuitive
- [x] Aperçu du contenu
- [x] Badge de sélection

### Prévisualisation A4
- [x] Dimensions exactes A4 (210mm × 297mm)
- [x] Rendu du contenu texte formaté
- [x] Bouton Imprimer (print)
- [x] Bouton Télécharger en TXT
- [x] Scrollable pour le contenu long

### Navigation
- [x] Lien dans le header (desktop + mobile)
- [x] Bouton dans le builder
- [x] CTA sur la page d'accueil
- [x] Bouton "Back to Builder"

## Format A4

### Dimensions
- Largeur: 210mm
- Hauteur: 297mm
- Correspond aux dimensions réelles du papier A4

### Contenu
- Font monospace (Courier New)
- Taille: 11px
- Espacement: 1.5 line-height
- Padding: 2cm (8 * 0.25" × 4)

## Templates Disponibles

1. Classic Professional
2. Modern Minimalist
3. Executive Summary
4. Chronological Detailed
5. Tech-Focused
6. Creative Designer
7. Functional Resume
8. Corporate Professional
9. Academic Scholar
10. Startup Entrepreneur
11. Healthcare Professional
12. Software Engineer
13. Sales Professional
14. Project Manager
15. Marketing Manager
16. Creative & Portfolio
17. Human Resources
18. Legal Professional
19. Educational Instructor
20. Financial Analyst

## Intégration avec le Builder

Quand un utilisateur revient au builder après avoir sélectionné un template:
1. Le template sélectionné est défini comme actif
2. Le utilisateur peut voir l'aperçu text du template avec `useTextTemplate` state
3. Peut basculer entre le mode Visual et le mode Text
4. Peut éditer les données du CV
5. L'aperçu A4 se met à jour automatiquement

## Export Options

### Depuis la Galerie
- Imprimer directement en PDF
- Télécharger en format TXT

### Depuis le Builder
- PDF du CV visuel (avec thème personnalisé)
- Texte du template (TXT)

## Code Structure

```
/app/templates/
    page.tsx              # Page principale

/app/components/
    TemplateGallery.tsx   # Liste des templates
    A4TemplatePreview.tsx # Aperçu A4
    TemplateSelector.tsx  # Sélecteur dropdown (builder)
    TextTemplatePreview.tsx # Aperçu texte (builder)

/app/utils/
    templates.ts          # 20 template classes + interfaces
```

## Points Importants

⚠️ **Indépendance des Systems**
- CV Visuel: Utilise `CVPreview.tsx` et les données du formulaire
- CV Texte: Utilise les classes CVTemplate et CVData interface
- Complètement séparés et indépendants

✅ **Expérience Utilisateur**
- Parcourir tous les templates AVANT de commencer
- Voir exactement comment ça ressemblera
- Prendre une décision éclairée sur le template
- Puis personnaliser avec les données

✅ **Format A4**
- Tous les templates affichés en format A4 identique
- Facile de comparer les styles
- Prêt pour impression
- Prêt pour export PDF/TXT

## Utilisations Futures

- [ ] Sauvegarder le template préféré dans le profil
- [ ] Catégoriser les templates par domaine
- [ ] Ajouter une recherche/filtre
- [ ] Afficher des statistiques (template le plus populaire)
- [ ] Permettre aux utilisateurs de créer des templates personnalisés
- [ ] Recommander des templates basés sur le type de job

---

**Version**: 2.0  
**Updates**: Galerie de templates complète + A4 preview  
**Date**: April 2026
