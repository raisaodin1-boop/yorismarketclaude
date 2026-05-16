# Audit taxonomie catégories Yorix.cm

## État avant

- **10 libellés** hardcodés dans `CATS` (`constants.js`)
- Table `marketplace_categories` en SQL (15 racines partielles) **non lue** par le frontend
- `products.categorie` (texte) seul champ utilisé ; `category_id` ignoré
- SEO `/categories/:slug` basé sur `slugToCategoryName(slug, CATS)` → décalage avec la DB

## Livré (cette mission)

| Zone | Fichiers |
|------|----------|
| Source taxonomie | `src/data/categoryTaxonomy.js` — 15 parents + ~70 sous-catégories |
| SQL | `supabase/migrations/20260523000100_full_category_taxonomy_subcategories.sql` |
| API client | `src/lib/marketplaceCategories.js`, `src/hooks/useCategoryTaxonomy.js` |
| Vendeur | `CategoryPicker.jsx` dans `SellerDashboard` + `category_id` à l’insert |
| Recherche / filtres | `CategoryFilterPanel.jsx`, filtre client dans `YorixApp` |
| Navigation | `CategoryMegaMenu.jsx`, `CategoryMobileNav.jsx`, header |
| Homepage | `HomeCategoryGrid.jsx` |
| SEO | `seoRoutes.js` — `/electronique-technologie`, `/categories/parent/enfant` |
| Admin | Onglet **Catégories** + `AdminCategoryManager.jsx` |
| Sitemap | `generate-sitemap.js` — slugs racine taxonomie |

## Migration Supabase (ordre)

1. `20260520000100_marketplace_categories_taxonomy.sql`
2. `20260521000100_premium_categories_made_in_cameroon.sql`
3. `20260522000100_reset_false_made_in_cameroon.sql`
4. **`20260523000100_full_category_taxonomy_subcategories.sql`** ← nouvelle

## Rollback

- Désactiver sous-catégories : `update marketplace_categories set active = false where parent_id is not null`
- Frontend : revenir à `CATS` legacy via repli automatique si table vide
- Produits : colonne `categorie` texte **conservée** ; `category_id` nullable

## Prochaines étapes suggérées

- RLS écriture admin sur `marketplace_categories` (service role ou policy admin)
- Création catégorie / sous-catégorie depuis l’admin (insert, pas seulement update)
- Filtre Supabase `.in('category_id', …)` quand > 80 % des produits ont un FK
- Pages SEO dédiées avec JSON-LD `BreadcrumbList` parent → enfant
