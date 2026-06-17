# 🧪 Mini-Test Technique — KETCHANGA Cabraule
## Yorix.cm — Plateforme Marketplace Cameroun

**Délai :** Mardi à minuit (23h59)
**Branche de travail :** `test/ketchanga-cabraule`
**Rendu :** Push sur cette branche uniquement — une PR sera ouverte automatiquement

---

## Contexte de l'application

Yorix.cm est une marketplace multi-rôles (acheteurs, vendeurs, livreurs, prestataires, admins) opérant au Cameroun. Stack technique :
- **Frontend :** React 18 + Vite 5 + React Router 6 (SPA bilingue FR/EN)
- **Backend :** Supabase (PostgreSQL + Auth + Realtime + Edge Functions en TypeScript)
- **Images :** Cloudinary (CDN externe)
- **Déploiement :** Vercel

---

## Ta Mission : Performance & Scalabilité du Catalogue

### Problème identifié

Le catalogue produits souffre de plusieurs problèmes de performance critiques :
1. **Chargement de 200 produits d'un coup** — pas de pagination, pas d'infinite scroll → temps de chargement long, mémoire saturée sur mobile bas de gamme
2. **Images non optimisées** — le composant `OptimizedImage` existe mais n'est pas utilisé partout ; beaucoup de `<img>` bruts chargent des images full-size depuis Cloudinary
3. **Pas de mise en cache** — chaque navigation vers le catalogue refait la requête Supabase complète
4. **Pas d'état de chargement** — l'utilisateur voit une page blanche pendant le fetch

---

## Spécifications Techniques

### Tâche 1 — Pagination côté serveur

**Fichier :** `src/pages/Products.jsx` (ou composant équivalent du catalogue)

Remplacer le fetch actuel par une requête paginée Supabase :

```javascript
// Avant (problématique)
const { data } = await supabase.from('products').select('*').limit(200);

// Après (paginé)
const PAGE_SIZE = 20;
const { data, count } = await supabase
  .from('products')
  .select('id, name, price, images, slug, category, stock', { count: 'exact' })
  .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1)
  .order('created_at', { ascending: false });
```

**Exigences :**
- Boutons "Page précédente / suivante" OU infinite scroll (choix au candidat, justifier)
- Conserver les filtres actifs (catégorie, recherche) lors de la pagination
- URL reflète la page active : `/produits?page=2&categorie=electronique`
- Ne sélectionner que les colonnes nécessaires à la liste (pas `SELECT *`)

### Tâche 2 — Optimisation des images Cloudinary

**Fichier :** `src/components/OptimizedImage.jsx` (déjà existant) + tous les endroits où des `<img>` bruts sont utilisés

Le composant `OptimizedImage` doit générer automatiquement les URLs Cloudinary transformées :

```javascript
// Transformer cette URL brute :
// https://res.cloudinary.com/dulwb03nf/image/upload/v1234/product.jpg

// En URL optimisée selon le contexte :
// Liste produits (card) : f_auto,q_auto,w_300,h_300,c_fill
// Fiche produit (hero) : f_auto,q_auto,w_800,h_600,c_limit
// Thumbnail panier : f_auto,q_auto,w_80,h_80,c_fill
```

**Exigences :**
- Le composant accepte une prop `size` : `"thumb" | "card" | "hero"`
- Attribut `loading="lazy"` sur toutes les images sauf la première visible (LCP)
- Attribut `srcSet` pour écrans Retina (x2)
- Fallback si l'image Cloudinary échoue (placeholder gris avec icône)
- Remplacer tous les `<img src=...>` dans `ProductCard.jsx` et la liste catalogue

### Tâche 3 — Cache côté client avec React Query ou SWR

Installer et configurer **un seul** de ces deux outils (au choix, justifier) :
- `@tanstack/react-query` (React Query v5)
- `swr`

**Exigences :**
- Les données catalogue sont mises en cache pendant **2 minutes**
- Si l'utilisateur revient sur le catalogue dans les 2 min → pas de nouveau fetch
- Affichage des données en cache instantanément pendant le re-fetch en arrière-plan (stale-while-revalidate)
- Ne pas casser la logique de filtrage et recherche existante

### Tâche 4 — Skeleton Loaders

Créer le composant `src/components/SkeletonCard.jsx` :

```jsx
// Skeleton pour une carte produit pendant le chargement
// Doit reproduire la forme visuelle de ProductCard avec des blocs gris animés
```

**Exigences :**
- Animation CSS `pulse` ou `shimmer` (pas de bibliothèque externe)
- Afficher une grille de 8 skeletons pendant le chargement initial
- Afficher 4 skeletons supplémentaires pendant le chargement de la page suivante (en bas)
- S'intégrer naturellement dans la grille existante

---

## Critères d'évaluation

| Critère | Points |
|---------|--------|
| Pagination fonctionnelle avec URL reflétant l'état | 25 |
| OptimizedImage correcte avec transformations Cloudinary | 25 |
| Cache React Query / SWR correctement configuré | 20 |
| SkeletonCard implémenté et intégré | 15 |
| Performance mesurable (Network tab : moins de requêtes, images plus petites) | 10 |
| Code propre, pas de régression sur les filtres existants | 5 |
| **Total** | **100** |

---

## Règles & Contraintes

### Utilisation des IA (Modérée)
Tu peux utiliser des outils d'IA (Copilot, ChatGPT, Claude, etc.) pour :
- ✅ Comprendre la syntaxe Supabase `.range()` et les transformations Cloudinary
- ✅ Générer le squelette CSS de l'animation shimmer
- ✅ Comprendre la configuration React Query / SWR

Tu **ne dois pas** :
- ❌ Laisser l'IA écrire toute l'intégration sans la comprendre
- ❌ Introduire une bibliothèque UI complète juste pour les skeletons
- ❌ Soumettre sans avoir testé que les filtres fonctionnent encore après pagination

**Lors du debriefing, on te demandera pourquoi tu as choisi React Query vs SWR et comment fonctionne `.range()` côté Supabase.**

### Git
- Travaille **uniquement** sur la branche `test/ketchanga-cabraule`
- Commits atomiques et descriptifs
- Ne touche pas aux autres branches ni à la configuration Supabase

---

## Lancer le projet en local

```bash
git clone https://github.com/raisaodin1-boop/yorismarketclaude.git
cd yorismarketclaude
git checkout test/ketchanga-cabraule
npm install
cp .env.example .env.local  # remplis avec les variables fournies séparément
npm run dev
```

Variables d'environnement nécessaires (fournies par email séparé) :
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

---

## Livrables attendus

1. Code pushé sur `test/ketchanga-cabraule`
2. Un fichier `NOTES_PERF.md` à la racine expliquant :
   - Pourquoi React Query ou SWR (ton choix + justification)
   - Ce que tu as mesuré avant/après dans l'onglet Network du navigateur
   - Les compromis de tes choix d'implémentation

Bonne chance.
