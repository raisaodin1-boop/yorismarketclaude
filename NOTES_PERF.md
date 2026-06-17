# NOTES_PERF : Performance & Scalabilité du Catalogue

> Brouillon de travail. Les colonnes **AVANT** sont mesurées sur la branche d'origine
> (code non modifié). Les colonnes **APRÈS** sont à remplir une fois l'implémentation
> terminée, **dans des conditions identiques** (même page, même throttling, même scénario).

---

## 1. Conditions de mesure

- **Outil** : Chrome DevTools (Network + Performance « Local metrics »)
- **Throttling réseau** : profil **« 3G »** (~400 kbps, ~2 s RTT). CPU : sans throttling.
- **Cache** : « Disable cache » coché pour la mesure réseau.
- **Page** : `/produits` (catalogue), chargement initial.
- ⚠️ Les valeurs absolues dépendent du profil réseau ; **seul le delta AVANT/APRÈS fait foi**.

---

## 2. Mesures AVANT / APRÈS

### Requête catalogue (Supabase `products`)

| Phase | AVANT | APRÈS |
|-------|-------|-------|
| Stalled (contention connexion) | 4,06 s | quasi nul (bien moins de requêtes concurrentes) |
| TTFB (Waiting for server response) | 2,04 s | ~2 s (plancher latence Supabase, inchangé) |
| Requête SQL | `SELECT *` · `limit(200)` · 200 lignes | `SELECT` 24 colonnes · `range(0,19)` · 20 / 178 |
| Colonnes transférées | toutes | 24 colonnes ciblées |
| Requêtes au retour catalogue (< 2 min) | 1 (refetch systématique) | **0** (cache React Query) |

> Le TTFB Supabase (~2 s) est un **plancher serveur** que la pagination ne change pas ; le gain
> vient du **stalling** (contention connexion, 4 s → ~0) et du **payload** (24 colonnes × 20
> vs toutes × 200). Au retour catalogue dans les 2 min : **0 requête** (cache).

### Page entière

| Métrique | AVANT | APRÈS | Delta |
|----------|-------|-------|-------|
| Requêtes totales | **430** (184 images) | **329** (57 images) | −23 % (images −69 %) |
| Transféré total | **8,3 Mo** | **422 Ko** | **−95 %** |
| DOMContentLoaded | 4,13 s | 3,53 s | −15 % |
| **Load event** | **33,43 s** | **3,57 s** | **−89 %** |

### Images

| Métrique | AVANT | APRÈS |
|----------|-------|-------|
| Requêtes images | 184 | **57** |
| Transféré images | 834 Ko | ~0 (servies en cache / dédupliquées intra-page) |
| Carte produit inspectée - Rendered | 288 × 432 px | (inchangé) |
| Carte produit inspectée - **Intrinsic (téléchargé)** | **1024 × 1536 px** | **600 × 600 px** (variante 2x retina du preset `card`) |
| Carte produit inspectée - **Poids** | **267 Ko** | **48,2 Ko** (−82 %) |
| Placeholders `w_20` (1 par carte) | ~200 requêtes redondantes | ~20 (1 × 20 produits paginés) |

> Sur-téléchargement constaté : image de **1024×1536 / 267 Ko** affichée dans un slot de **288 px**.
> Cause : `sizes` trop généreux + `srcset` jusqu'à 1200w + `c_limit` qui renvoie l'original.
> Le preset `size="card"` (`w_300,h_300,c_fill`) plafonne le téléchargement.

### Web Vitals (Local metrics, 3G)

| Métrique | AVANT | APRÈS | Seuil |
|----------|-------|-------|-------|
| **LCP** | 2,59 s | ⚠️ 3,66 s | < 2,5 s |
| **CLS** | 0,36 (poor, 3 shifts) | 0,27 (2 shifts) | < 0,1 |
| **INP** | 216 ms | 88 ms (good) | < 200 ms |

> **INP −59 %** : gain net. Les valeurs live metrics ci-dessus sont des mesures **à chaud**
> sur serveur dev (bruitées)  pour des chiffres fiables, voir le **Lighthouse build prod**
> ci-dessous, qui **contredit le CLS** (0,27 à chaud → 0,743 à froid).

### Lighthouse (build prod + navigation privée : Slow 4G, Moto G, CPU 4×)

| Catégorie | Score |
|---|-------|
| Performance | **67** |
| Accessibilité | 80 |
| Best Practices | **96** |
| SEO | **92** |

| Métrique | Valeur |
|----------|--------|
| First Contentful Paint | 2,4 s |
| Largest Contentful Paint | 3,1 s |
| Speed Index | 2,4 s |
| Total Blocking Time | **40 ms** (excellent) |
| **Cumulative Layout Shift** | **0,743 (poor)** |

> ✅ **TBT 40 ms** (le JS ne bloque pas le thread principal), Speed Index 2,4 s,
> **Best Practices 96**, **SEO 92**.
>
> ⚠️ **CLS 0,743** = le **principal frein** au score Performance (67), bien plus élevé que les
> 0,27 des live metrics (à froid vs à chaud). Cause probable : la séquence d'apparition
> (panneau catégories + grille **8 skeletons → 20 produits** + polices) décale la mise en page.
> À creuser via l'insight **« Layout shift culprits »**.
>
> Honnêteté : pas de baseline Lighthouse sur l'ancien code → je ne peux pas attribuer ce CLS à
> mes changements. Mais il est mauvais et **corrigeable** : réserver la hauteur de la grille,
> aligner le nombre de skeletons sur la page, `aspect-ratio` sur les images.

---

## 3. Choix de l'outil de cache : React Query (v5) vs SWR

**Choix retenu : `@tanstack/react-query` v5.**

Justification spécifique à *ce* cahier des charges (pas « c'est plus populaire ») :

1. **`placeholderData: keepPreviousData`**  affiche la page précédente pendant le chargement
   de la suivante. C'est littéralement l'exigence *stale-while-revalidate* sur la pagination,
   sans code custom, et ça évite le flash de skeleton à chaque changement de page.
2. **`staleTime: 120_000`**  mappe directement l'exigence « cache 2 minutes ». Tant que la
   donnée est « fresh », React Query ne refetch pas.
3. **Query key `['products', { page, category, search }]`** — cache par combinaison de filtres.
   Revenir sur un filtre déjà visité dans les 2 min = instantané, zéro requête réseau.

SWR sait faire tout ça aussi, mais l'ergonomie pagination de React Query
(`placeholderData` + `staleTime` explicite) est plus directe pour ce besoin précis.

**Compromis Realtime** : l'app a un abonnement Supabase Realtime qui rechargeait *tout* le
catalogue à chaque changement produit ce qui contredit l'idée même de cache. Décision :
remplacer le « refetch tout » par `queryClient.invalidateQueries(['products'])` ; React Query
décide alors s'il refetch selon le `staleTime`.

---

## 4. Comment fonctionne `.range()` côté Supabase (note débrief)

`.range(from, to)` traduit en SQL un `LIMIT / OFFSET` (bornes **incluses**, indexées à 0).

```js
const PAGE_SIZE = 20;
const from = page * PAGE_SIZE;          // page 0 → 0
const to   = from + PAGE_SIZE - 1;      // page 0 → 19
const { data, count } = await supabase
  .from('products')
  .select('id, name_fr, prix, image, image_urls, slug, categorie, stock', { count: 'exact' })
  .order('sponsorise', { ascending: false })
  .order('created_at', { ascending: false })
  .range(from, to);
```

- `count: 'exact'` renvoie le **total** de lignes (pour calculer le nombre de pages).
- L'**ordre est obligatoire et stable** avec la pagination : sans `.order()` déterministe,
  deux pages peuvent se chevaucher ou sauter des lignes. On conserve `sponsorise` puis
  `created_at` pour ne pas casser le tri « Top Vendeur » existant.
- Si pagination serveur, **la recherche et le filtre catégorie doivent aussi passer serveur**
  (`.ilike()` / `.eq()`), sinon on pagine *puis* on filtre → pages à moitié vides.

---

## 5. Compromis d'implémentation assumés

- **Pas de refactor global de `YorixApp`** : la pagination est scopée au catalogue `/produits`
  via un hook dédié. Le reste de l'app (accueil, merch hubs, SEO villes) garde son flux actuel.
  Choix délibéré sous contrainte de temps pour **zéro régression**, pas un raccourci.
- **`q_auto` (brief) vs `q_auto:low` (code existant)** : preset aligné sur le brief (`q_auto`),
  mais `q_auto:low` resterait défendable pour la 3G camerounaise (bande passante).
- **URL** : `?page=` en query param (état de pagination) ; la catégorie reste lue depuis la
  route SEO existante OU `?categorie=`, pour ne pas bulldozer le routing en place.
- **Placeholder `w_20`** : à reconsidérer  1 requête HTTP par carte (200 au total). Un fond
  CSS ou un SVG inline éviterait ces requêtes sur 3G.
