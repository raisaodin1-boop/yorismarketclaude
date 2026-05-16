# Audit catégories & merchandising premium — Yorix.cm

## État avant

- Taxonomie **texte** (`products.categorie` + `CATS` dans `constants.js`)
- Migration `20260520000100` : table `marketplace_categories` + `category_id` **non branchée** au frontend
- Badge 🇨🇲 via `products.local` toujours `true` à la création — **pas de choix vendeur ni validation admin**

## Architecture livrée

### SQL (`20260521000100_premium_categories_made_in_cameroon.sql`)

- `marketplace_categories` : `category_kind` (standard, featured, promotional, local, seasonal, brand_driven), flags homepage, `city_target`, `seasonal_tag`
- `products` : `is_made_in_cameroon`, `made_in_cameroon_status` (declared | verified | imported | auto | rejected), `country_of_origin`, `local_brand_name`, `made_in_cameroon_verified_at`
- Seeds : catégories classiques élargies + **10 hubs premium** + sous-catégories Made in CM & saisonnier

### Made in Cameroun — système hybride (réponse à votre question)

| Niveau | Mécanisme |
|--------|-----------|
| **1. Vendeur** | Radio Oui 🇨🇲 / Non / Importé + marque locale optionnelle (`SellerDashboard`) |
| **2. Auto** | Ville CM, catégorie locale, marque renseignée (`madeInCameroon.js`) |
| **3. Admin** | Boutons 🇨🇲✔ vérifier / ✖ refuser (`AdminDashboard` produits) |

Le drapeau **s’applique automatiquement** quand les règles auto ou la déclaration vendeur le permettent ; l’admin peut **confirmer** (badge « Vérifié ») ou **refuser**.

### Frontend

- `merchHubs.js` — hubs SEO + filtres catalogue
- `MerchHubPage.jsx` — landings `/made-in-cameroun`, `/top-produits`, etc.
- `HomePremiumMerch.jsx` — blocs homepage
- `MadeInCameroonBadge.jsx` — cartes & fiches
- Nav émotionnelle header : Produits | Services | Made in Cameroun | Top Produits | Promotions | …

### SEO

- Routes : `/fr/made-in-cameroun`, `/fr/top-produits`, `/fr/produits-tendance`, `/fr/promotions`, `/fr/livraison-express`, `/fr/top-vendeurs`, etc.
- Sitemap : URLs hubs × FR/EN
- Métas dynamiques dans `YorixApp` pour `page === "merchHub"`

## Prochaines étapes recommandées

1. Appliquer les migrations Supabase en prod
2. Brancher le catalogue sur `category_id` (remplacer progressivement `CATS`)
3. Admin CRUD `marketplace_categories` + blocs homepage configurables
4. Filtres recherche « Made in Cameroun » / « Importé » dans `ProductRouteSections`
5. Stats admin : % produits locaux, top vendeurs locaux

## Stratégie conversion

- **Émotion** : Made in CM, fierté nationale, créateurs locaux
- **Urgence** : Tendances, promos, livraison express
- **Confiance** : Top vendeurs, badge vérifié admin
- **Local** : Hubs par ville, achat local Cameroun
