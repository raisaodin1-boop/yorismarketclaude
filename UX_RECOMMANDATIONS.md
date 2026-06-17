# UX_RECOMMANDATIONS — Yorix.cm Mobile

## Analyse de l'expérience mobile existante

---

## 1. Problèmes identifiés (annotés)

### Problème A — Fiche produit en 2 colonnes sur 320px

```
┌────────────────────────────────────┐  ← 320px
│ [Photo]     │ Nom trop long qui    │  ← texte tronqué
│  trop       │ déborde sur la       │
│  petite     │ colonne voisine      │
│             │ 9 000 FCFA           │
│             │ [Btn] trop petit     │  ← touch target < 44px
└────────────────────────────────────┘

APRÈS (une colonne) :
┌───────────────────────────────┐
│  ┌─────────────────────────┐  │
│  │     Image produit       │  │  ← pleine largeur
│  │      (ratio 4:3)        │  │
│  └─────────────────────────┘  │
│  Nom du produit (18px min)     │
│  Catégorie · Vendeur          │
│                               │
│  9 000 FCFA                   │  ← prix visible, gras
│  ┌─────────────────────────┐  │
│  │   Ajouter au panier     │  │  ← 100% larg, 48px haut
│  └─────────────────────────┘  │
└───────────────────────────────┘
```

**Fix livré :** media query `max-width: 768px` → `grid-template-columns: 1fr`, hauteur bouton 48px, police prix 18px.

---

### Problème B — Skeleton absent = flash de page blanche

```
AVANT (0-800ms) :
┌───────────────────────────────┐
│                               │  ← PAGE VIDE
│                               │     utilisateur pense que
│                               │     l'app est cassée
└───────────────────────────────┘

APRÈS (0-800ms) :
┌───────────────────────────────┐
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░  │  ← shimmer gris
│  ░░░░░░░░░░░░░  ░░░░░░░░░░░  │
│  ░░░░░░░  ░░░░░░░░░░░░░░░░░  │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░  │
└───────────────────────────────┘
```

**Fix livré :** `SkeletonCard` avec animation CSS shimmer, prop `count`, intégré dans `CatalogProducts`.

---

### Problème C — Panier drawer non monté sur mobile

```
AVANT :
[Panier] → navigue vers /cart (page entière, scroll perdu, contexte perdu)

APRÈS :
[Panier] → CartDrawer slide depuis la droite (overlay, fermeture par swipe ou tap extérieur)
           utilisateur reste sur la page produit
```

**Fix livré :** `CartDrawer` monté dans `YorixApp`, ouvert par `setCartDrawerOpen(true)` sur mobile ≤768px.

---

## 2. Trois propositions d'amélioration prioritaires non adressées

### Priorité 1 — Barre de recherche persistante sur le scroll mobile

**Problème :** Sur mobile, la barre de recherche disparaît quand on scroll vers le bas. Les utilisateurs africains sur réseau lent scrollent beaucoup avant de trouver ce qu'ils cherchent — ils perdent accès à la recherche.

**Proposition :**
- La navbar se compacte à 48px de haut en scrollant (déjà implémenté via `navCompact`)
- La barre de recherche reste visible dans la navbar compacte sous forme d'icône loupe → tap ouvre un overlay fullscreen de recherche
- Priorité : **Critique** (impact conversion direct)

---

### Priorité 2 — "Achat express" en 2 taps (Buy Now)

**Problème :** Le flux actuel est : voir produit → ajouter panier → aller au panier → checkout → paiement. Sur mobile lent = 5 écrans de chargement.

**Proposition :**
- Bouton "Commander maintenant" directement sur la fiche produit (bypass panier)
- Pré-remplit le checkout avec ce seul produit en quantité 1
- Adresse de livraison mémorisée depuis la commande précédente (localStorage)
- Priorité : **Haute** (réduction friction = +conversion)

---

### Priorité 3 — Feedback haptique et visuel sur "Ajouter au panier"

**Problème :** Après avoir tapé "Ajouter au panier", l'utilisateur ne sait pas si ça a marché — pas de feedback immédiat visible sur mobile (le badge du panier est en haut, hors écran).

**Proposition :**
- Animation de confirmation : le bouton passe momentanément en vert avec "✓ Ajouté !" pendant 1.2s
- Micro-animation de "vol" : une miniature du produit vole vers l'icône panier (shared element transition)
- Toast discret en bas : "Yaoundé — livraison estimée demain"
- Priorité : **Moyenne** (améliore la confiance, réduit les doubles-taps)

---

## 3. Wireframe ASCII — Flux "Achat Express" idéal sur mobile

```
ÉTAPE 1 — Fiche produit
┌───────────────────────────────┐  375px
│  ← Retour          [❤] [⋯]  │
├───────────────────────────────┤
│                               │
│   [  Photo produit  4:3  ]    │
│   ○ ● ○  (galerie dots)      │
│                               │
├───────────────────────────────┤
│  Casque Bluetooth JBL          │
│  ★★★★☆  (47 avis)            │
│                               │
│  12 500 FCFA                  │
│  ~~15 000~~ · Livraison 500F  │
│                               │
│  Vendeur: TechShop Douala ✓   │
│  📍 Akwa · Livré demain       │
│                               │
│  ┌─────────────────────────┐  │
│  │  ➕ Ajouter au panier   │  │  ← 48px, vert pâle
│  └─────────────────────────┘  │
│  ┌─────────────────────────┐  │
│  │   ⚡ Commander tout de  │  │  ← 48px, vert plein
│  │      suite (Escrow)     │  │  ← CTA primaire
│  └─────────────────────────┘  │
└───────────────────────────────┘

ÉTAPE 2 — Checkout Express (Bottom Sheet, 60vh)
┌───────────────────────────────┐
│  ─────────────── (drag handle)│
│  Confirmer la commande        │
│                               │
│  [Photo min] Casque JBL       │
│              12 500 FCFA × 1  │
│                               │
│  📍 Livrer à :                │
│  [  Akwa, Douala (mémorisé) ] │  ← pré-rempli
│  ✏️ Modifier                  │
│                               │
│  💳 Paiement :                │
│  ○ Mobile Money  ○ Orange     │
│  ○ Espèces à la livraison     │
│                               │
│  ┌─────────────────────────┐  │
│  │  Payer 13 000 FCFA      │  │  ← total avec livraison
│  └─────────────────────────┘  │
└───────────────────────────────┘

ÉTAPE 3 — Confirmation (2s puis redirect)
┌───────────────────────────────┐
│                               │
│         ✅                   │
│   Commande confirmée !        │
│   Réf: YX-2026-04891          │
│                               │
│   📦 Livraison demain         │
│   🔒 Paiement escrow actif   │
│                               │
│  [ Suivre ma commande ]       │
│  [ Continuer mes achats ]     │
│                               │
└───────────────────────────────┘
```

**Points clés du flux :**
- De la fiche produit au paiement : **2 taps + 1 sélection**
- Aucune page de chargement complète — tout en bottom sheet / overlay
- Adresse pré-remplie depuis historique → zéro saisie pour clients récurrents
- Escrow visible dès le début → confiance maximale

---

*Document rédigé à partir de l'analyse de l'app Yorix.cm sur Chrome DevTools — iPhone SE 375px et Galaxy S20 412px.*
