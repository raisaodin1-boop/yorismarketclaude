# 🧪 Mini-Test Technique — NGOUNOU TCHUINTEU Patricia Ornella
## Yorix.cm — Plateforme Marketplace Cameroun

**Délai :** Mardi à minuit (23h59)
**Branche de travail :** `test/ngounou-patricia`
**Rendu :** Push sur cette branche uniquement — une PR sera ouverte automatiquement

---

## Contexte de l'application

Yorix.cm est une marketplace multi-rôles opérant au Cameroun. Stack technique :
- **Frontend :** React 18 + Vite 5 + React Router 6 (SPA bilingue FR/EN)
- **Styling :** CSS-in-JS via un fichier `src/utils/styles.js` (5 181 lignes de styles inline)
- **Images :** Cloudinary CDN
- **Déploiement :** Vercel

---

## Ta Mission : Expérience Utilisateur Mobile & Design System

### Problème identifié

L'app souffre de plusieurs problèmes UX/UI critiques qui nuisent à la conversion sur mobile (où se trouvent 80% des utilisateurs camerounais) :

1. **Fiche produit illisible sur mobile** — grille 2 colonnes codée en dur, textes trop petits
2. **Pas d'états de chargement** — l'utilisateur voit une page blanche pendant le fetch des données
3. **Panier mobile cassé** — le composant "drawer" panier n'est pas monté, l'utilisateur va sur une page séparée
4. **Incohérence visuelle** — boutons, couleurs, espacements ne suivent aucun système défini

---

## Spécifications Techniques

### Tâche 1 — Responsive Mobile de la Fiche Produit

**Fichier :** `src/components/ProductDetail.jsx` (ou équivalent)

**Problème actuel :** La fiche produit utilise `gridTemplateColumns: "1fr 1fr"` (deux colonnes) même sur téléphone 320px.

**Ce que tu dois livrer :**

Sur mobile (≤ 768px) :
- Galerie photo en pleine largeur, empilée au-dessus des infos produit (une colonne)
- Nom produit : minimum 18px, lisible
- Prix en FCFA : gras, bien visible, couleur principale de la marque
- Bouton "Ajouter au panier" : pleine largeur, hauteur minimum 48px (touch target)
- Bouton "Quantité" (+ et -) : minimum 44x44px chacun
- Images produit : `loading="lazy"`, taille adaptée (pas d'image 2000px chargée sur mobile)

Sur desktop (> 768px) :
- Conserver le layout 2 colonnes existant — ne pas casser ce qui marche

**Contrainte :** Utiliser uniquement du CSS (media queries dans `styles.js` ou CSS modules) — pas de bibliothèque de layout externe.

### Tâche 2 — Composant Skeleton Loader

Créer **`src/components/SkeletonCard.jsx`** — un composant réutilisable qui simule visuellement une carte produit pendant le chargement.

**Spécifications visuelles du Skeleton :**
```
┌────────────────────┐
│                    │  ← rectangle gris (image placeholder, ratio 4:3)
│   [image grise]    │
│                    │
├────────────────────┤
│ ████████████ ░░░░  │  ← barre grise (nom produit)
│ ████████ ░░░░░░░░  │  ← barre grise plus courte (catégorie)
│ ████ ░░░░░░░░░░░░  │  ← barre grise courte (prix)
│ ██████████████████ │  ← bouton gris pleine largeur
└────────────────────┘
```

**Exigences :**
- Animation CSS `shimmer` (dégradé qui glisse de gauche à droite) — sans bibliothèque
- Doit correspondre exactement aux dimensions de `ProductCard` réelle
- Accepte une prop `count` pour afficher N skeletons en grille : `<SkeletonCard count={8} />`
- S'intégrer dans la page catalogue : afficher les skeletons pendant le chargement, remplacer par les vraies cartes quand les données arrivent

### Tâche 3 — Tokens de Design (Design System minimal)

Créer **`src/utils/designTokens.js`** — un fichier central définissant les valeurs de design de l'app :

```javascript
export const tokens = {
  colors: {
    primary: '#...',      // couleur principale de Yorix (à identifier depuis le code existant)
    primaryDark: '#...',
    secondary: '#...',
    success: '#...',
    error: '#...',
    warning: '#...',
    textPrimary: '#...',
    textSecondary: '#...',
    background: '#...',
    surface: '#...',
    border: '#...',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  typography: {
    fontFamily: "'...', sans-serif",  // identifier depuis le code
    sizes: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '20px',
      xl: '24px',
      xxl: '32px',
    },
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  radius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    full: '9999px',
  },
  shadows: {
    card: '0 2px 8px rgba(0,0,0,0.08)',
    modal: '0 8px 32px rgba(0,0,0,0.16)',
  },
};
```

**Exigences :**
- Les valeurs doivent être cohérentes avec les couleurs et polices **déjà utilisées** dans l'app (analyser `styles.js`)
- Mettre à jour **au minimum 2 composants** pour utiliser ces tokens au lieu de valeurs codées en dur
- `SkeletonCard` doit utiliser ces tokens pour ses couleurs

### Tâche 4 — Document de Recommandations UX (Bonus)

Créer **`UX_RECOMMANDATIONS.md`** à la racine avec :
- 3 captures d'écran annotées (mobile) montrant les problèmes identifiés
- 3 propositions d'amélioration prioritaires non adressées dans ce test
- 1 wireframe ASCII ou description textuelle du flux "Achat express" idéal sur mobile

---

## Critères d'évaluation

| Critère | Points |
|---------|--------|
| Fiche produit responsive et lisible sur 320px | 25 |
| Touch targets ≥ 44px sur tous les éléments interactifs | 10 |
| SkeletonCard avec animation shimmer, prop `count` | 20 |
| Intégration skeleton dans le catalogue (loading state) | 10 |
| Tokens de design cohérents avec l'existant | 15 |
| 2 composants refactorisés avec les tokens | 10 |
| Qualité visuelle globale (alignements, cohérence) | 5 |
| Bonus : `UX_RECOMMANDATIONS.md` | +5 |
| **Total** | **100** |

---

## Règles & Contraintes

### Utilisation des IA (Modérée)
Tu peux utiliser des outils d'IA (Copilot, ChatGPT, Claude, etc.) pour :
- ✅ Générer l'animation CSS shimmer
- ✅ Identifier les bonnes valeurs de media queries
- ✅ Suggérer des améliorations UX à documenter

Tu **ne dois pas** :
- ❌ Installer Tailwind, Material UI, Ant Design, ou toute bibliothèque de composants UI
- ❌ Modifier des pages entières non demandées (risque de régression)
- ❌ Utiliser des couleurs/polices qui ne correspondent pas à l'identité Yorix existante

**Lors du debriefing : on te montrera l'app sur un vrai mobile et tu devras justifier tes choix de design.**

### Git
- Travaille **uniquement** sur la branche `test/ngounou-patricia`
- Commits descriptifs : `feat: responsive product detail mobile`, `feat: skeleton card component`, etc.
- Ne touche pas à la logique métier (pas de modification des appels Supabase)

---

## Lancer le projet en local

```bash
git clone https://github.com/raisaodin1-boop/yorismarketclaude.git
cd yorismarketclaude
git checkout test/ngounou-patricia
npm install
cp .env.example .env.local  # remplis avec les variables fournies séparément
npm run dev
```

Ouvre l'app dans Chrome DevTools en mode mobile (iPhone SE 375px, puis Galaxy S20 412px) pour tester.

Variables d'environnement nécessaires (fournies par email séparé) :
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

---

## Livrables attendus

1. Code pushé sur `test/ngounou-patricia`
2. `SkeletonCard.jsx` et `designTokens.js` créés
3. Fiche produit responsive vérifiée sur 320px et 375px
4. (Bonus) `UX_RECOMMANDATIONS.md`

Bonne chance.
