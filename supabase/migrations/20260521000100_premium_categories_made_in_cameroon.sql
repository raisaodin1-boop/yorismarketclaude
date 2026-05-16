-- Yorix — Catégories premium (merchandising) + Made in Cameroun 🇨🇲 (hybride auto / vendeur / admin)
-- Appliquer après 20260520000100_marketplace_categories_taxonomy.sql

-- ---------------------------------------------------------------------------
-- marketplace_categories — kind merchandising + flags homepage
-- ---------------------------------------------------------------------------
alter table public.marketplace_categories
  add column if not exists category_kind text not null default 'standard'
    check (category_kind in ('standard','featured','promotional','local','seasonal','brand_driven'));

alter table public.marketplace_categories
  add column if not exists category_badge text null,
  add column if not exists category_theme text null,
  add column if not exists is_made_in_cameroon boolean not null default false,
  add column if not exists is_top_products boolean not null default false,
  add column if not exists is_featured_homepage boolean not null default false,
  add column if not exists city_target text[] null,
  add column if not exists seasonal_tag text null;

create index if not exists idx_marketplace_categories_kind_home
  on public.marketplace_categories (category_kind, is_featured_homepage, sort_order)
  where active = true and is_featured_homepage = true;

create index if not exists idx_marketplace_categories_made_in_cm
  on public.marketplace_categories (is_made_in_cameroon, sort_order)
  where active = true and is_made_in_cameroon = true;

-- ---------------------------------------------------------------------------
-- products — Made in Cameroun (hybride)
-- ---------------------------------------------------------------------------
alter table public.products
  add column if not exists is_made_in_cameroon boolean not null default false,
  add column if not exists made_in_cameroon_status text not null default 'imported'
    check (made_in_cameroon_status in ('declared','verified','imported','auto','rejected')),
  add column if not exists country_of_origin text null default 'CM',
  add column if not exists local_brand_name text null,
  add column if not exists made_in_cameroon_verified_at timestamptz null,
  add column if not exists made_in_cameroon_proof text null;

create index if not exists idx_products_made_in_cameroon
  on public.products (is_made_in_cameroon, made_in_cameroon_status)
  where actif is distinct from false;

create index if not exists idx_products_top_merch
  on public.products (sponsorise desc, vente_total desc nulls last, vues desc nulls last)
  where actif is distinct from false;

-- Sync legacy `local` → nouveau modèle (idempotent)
update public.products
set
  is_made_in_cameroon = true,
  made_in_cameroon_status = case
    when made_in_cameroon_status = 'imported' then 'auto'
    else made_in_cameroon_status
  end,
  country_of_origin = coalesce(country_of_origin, 'CM')
where coalesce(local, false) = true
  and is_made_in_cameroon = false;

-- ---------------------------------------------------------------------------
-- Catégories classiques élargies (product)
-- ---------------------------------------------------------------------------
insert into public.marketplace_categories
  (name_fr, name_en, slug, category_type, category_kind, parent_id, featured, trending,
   is_featured_homepage, sort_order, icon, seo_title_fr, seo_title_en, seo_description_fr, seo_description_en)
values
('Alimentation', 'Food & Groceries', 'alimentation', 'product', 'standard', null, false, true, false, 25,
 'Alimentation Cameroun', 'Food Cameroon', 'Épicerie, produits frais et spécialités.', 'Groceries and fresh food.', '🍽️'),
('Immobilier (annonces)', 'Real estate listings', 'immobilier-annonces', 'product', 'standard', null, false, false, false, 26,
 'Petites annonces immo', 'Property listings', 'Terrains, maisons et locations.', 'Land, houses and rentals.', '🏠'),
('Services & prestations', 'Services listings', 'services-annonces', 'product', 'standard', null, false, false, false, 27,
 'Services marketplace', 'Services marketplace', 'Offres de services divers.', 'Various service offers.', '🛠️'),
('Emploi & carrière', 'Jobs & careers', 'emploi', 'product', 'standard', null, false, false, false, 28,
 'Emploi Cameroun', 'Jobs Cameroon', 'Offres et opportunités.', 'Job opportunities.', '💼'),
('Événements', 'Events', 'evenements', 'product', 'standard', null, false, false, false, 29,
 'Événements Cameroun', 'Events Cameroon', 'Mariage, fêtes, culture.', 'Weddings, parties, culture.', '🎉'),
('Industrie & BTP', 'Industry & construction', 'industrie-btp', 'product', 'standard', null, false, false, false, 35,
 'Industrie & BTP', 'Industry & construction', 'Matériaux, équipements pro.', 'Materials and pro equipment.', '🏗️'),
('Éducation & formation', 'Education & training', 'education', 'product', 'standard', null, false, false, false, 36,
 'Éducation Cameroun', 'Education Cameroon', 'Livres, fournitures, cours.', 'Books, supplies, courses.', '📚')
on conflict (slug, category_type) do nothing;

-- ---------------------------------------------------------------------------
-- Hubs premium (parents) + sous-catégories merchandising
-- ---------------------------------------------------------------------------
insert into public.marketplace_categories
  (name_fr, name_en, slug, category_type, category_kind, featured, trending,
   is_made_in_cameroon, is_top_products, is_featured_homepage, category_badge, category_theme,
   sort_order, icon, seo_title_fr, seo_title_en, seo_description_fr, seo_description_en)
values
('Made in Cameroun', 'Made in Cameroon', 'made-in-cameroun', 'product', 'local', true, true,
 true, false, true, '🇨🇲 Made in Cameroun', 'cameroon-green',
 2, '🇨🇲',
 'Made in Cameroun — produits locaux | Yorix.cm',
 'Made in Cameroon — local products | Yorix.cm',
 'Artisans, marques et producteurs camerounais vérifiés. Achetez local, soutenez l''économie nationale.',
 'Verified Cameroonian makers and brands. Shop local, support the national economy.'),
('Top produits', 'Top products', 'top-produits', 'product', 'featured', true, true,
 false, true, true, '⭐ Top produits', 'gold',
 3, '⭐',
 'Top produits Cameroun — meilleures ventes | Yorix',
 'Top products Cameroon — best sellers | Yorix',
 'Meilleures ventes, plus vus et recommandations premium.',
 'Best sellers, most viewed and premium picks.'),
('Tendances', 'Trending now', 'produits-tendance', 'product', 'promotional', true, true,
 false, false, true, '🔥 Tendances', 'fire',
 4, '🔥',
 'Produits tendance Cameroun | Yorix.cm',
 'Trending products Cameroon | Yorix.cm',
 'Nouveautés, viral et offres du moment.',
 'New arrivals, viral picks and hot deals.'),
('Bons plans & promos', 'Deals & promos', 'promotions-hub', 'product', 'promotional', true, true,
 false, false, true, '💸 Promotions', 'deal',
 5, '💸',
 'Promotions & bons plans Cameroun | Yorix',
 'Deals & promotions Cameroon | Yorix',
 'Réductions, déstockage et offres flash.',
 'Discounts, clearance and flash sales.'),
('Livraison express', 'Express delivery', 'livraison-express-hub', 'product', 'promotional', true, true,
 false, false, true, '🚚 Express', 'express',
 6, '🚚',
 'Livraison express Douala Yaoundé | Yorix',
 'Express delivery Douala Yaoundé | Yorix',
 'Livraison rapide zones prioritaires.',
 'Fast delivery in priority zones.'),
('Top vendeurs', 'Top sellers', 'top-vendeurs', 'product', 'brand_driven', true, false,
 false, false, true, '👑 Premium', 'crown',
 7, '👑',
 'Top vendeurs vérifiés Cameroun | Yorix',
 'Top verified sellers Cameroon | Yorix',
 'Boutiques officielles et marques premium.',
 'Official stores and premium brands.'),
('Nouveaux vendeurs', 'New sellers', 'nouveaux-vendeurs', 'product', 'brand_driven', false, true,
 false, false, true, '🚀 Nouveauté', 'rocket',
 8, '🚀',
 'Découvrir les nouveaux vendeurs | Yorix',
 'Discover new sellers | Yorix',
 'Talents et boutiques qui rejoignent Yorix.',
 'Fresh talent joining Yorix.'),
('Achat local par ville', 'Shop by city', 'achat-par-ville', 'product', 'local', true, false,
 false, false, true, '📍 Par ville', 'map',
 9, '📍',
 'Acheter local par ville — Cameroun | Yorix',
 'Shop local by city — Cameroon | Yorix',
 'Yaoundé, Douala, Bafoussam et plus.',
 'Yaoundé, Douala, Bafoussam and more.'),
('Saisonnier & événements', 'Seasonal picks', 'saisonnier', 'product', 'seasonal', false, true,
 false, false, false, '🎉 Saison', 'season',
 90, '🎉',
 'Offres saisonnières Cameroun | Yorix',
 'Seasonal offers Cameroon | Yorix',
 'Rentrée, fêtes, mariage, Ramadan…',
 'Back to school, holidays, weddings…'),
('Business & entrepreneuriat', 'Business & entrepreneurship', 'business-hub', 'product', 'brand_driven', false, false,
 false, false, false, '💼 Business', 'business',
 95, '💼',
 'Équipement PME & startup | Yorix',
 'SME & startup equipment | Yorix',
 'Fournitures pro et solutions PME.',
 'Pro supplies and SME solutions.')
on conflict (slug, category_type) do update set
  category_kind = excluded.category_kind,
  is_made_in_cameroon = excluded.is_made_in_cameroon,
  is_top_products = excluded.is_top_products,
  is_featured_homepage = excluded.is_featured_homepage,
  category_badge = excluded.category_badge,
  category_theme = excluded.category_theme,
  seo_title_fr = excluded.seo_title_fr,
  seo_description_fr = excluded.seo_description_fr;

-- Sous-catégories Made in Cameroun
insert into public.marketplace_categories
  (name_fr, name_en, slug, category_type, category_kind, parent_id, is_made_in_cameroon, sort_order, icon)
select v.name_fr, v.name_en, v.slug, 'product', 'local', p.id, true, v.ord, v.icon
from (values
  ('Mode locale', 'Local fashion', 'mic-mode-locale', 11, '👗'),
  ('Artisanat', 'Handicraft', 'mic-artisanat', 12, '🎨'),
  ('Produits agricoles locaux', 'Local farm products', 'mic-agricole-local', 13, '🌾'),
  ('Cosmétiques locaux', 'Local cosmetics', 'mic-cosmetiques', 14, '💄'),
  ('Décoration locale', 'Local decor', 'mic-decoration', 15, '🏡'),
  ('Gastronomie camerounaise', 'Cameroonian food', 'mic-gastronomie', 16, '🍲'),
  ('Marques camerounaises', 'Cameroonian brands', 'mic-marques', 17, '🏷️'),
  ('Créateurs camerounais', 'Cameroonian creators', 'mic-createurs', 18, '✨')
) as v(name_fr, name_en, slug, ord, icon)
join public.marketplace_categories p on p.slug = 'made-in-cameroun' and p.category_type = 'product'
on conflict (slug, category_type) do nothing;

-- Saisonnier tags
update public.marketplace_categories
set seasonal_tag = 'rentree', city_target = null
where slug = 'saisonnier' and category_type = 'product';

insert into public.marketplace_categories
  (name_fr, name_en, slug, category_type, category_kind, parent_id, seasonal_tag, sort_order, icon)
select v.name_fr, v.name_en, v.slug, 'product', 'seasonal', p.id, v.tag, v.ord, v.icon
from (values
  ('Rentrée scolaire', 'Back to school', 'saison-rentree', 'rentree', 1, '🎒'),
  ('Ramadan', 'Ramadan', 'saison-ramadan', 'ramadan', 2, '🌙'),
  ('Noël & fêtes', 'Christmas & holidays', 'saison-noel', 'noel', 3, '🎄'),
  ('Mariage & cérémonies', 'Weddings', 'saison-mariage', 'mariage', 4, '💒'),
  ('Saint-Valentin', 'Valentine''s', 'saison-saint-valentin', 'saint-valentin', 5, '💝'),
  ('Fête du travail', 'Labour day', 'saison-travail', 'fete-travail', 6, '⚒️')
) as v(name_fr, name_en, slug, tag, ord, icon)
join public.marketplace_categories p on p.slug = 'saisonnier' and p.category_type = 'product'
on conflict (slug, category_type) do nothing;

-- Villes hub (city_target sur parent achat-par-ville)
update public.marketplace_categories
set city_target = array['yaounde','douala','bafoussam','bamenda','garoua','kribi']
where slug = 'achat-par-ville' and category_type = 'product';

-- Admin write policies (authenticated admin role via profiles — simplifié : service_role en prod)
comment on column public.products.made_in_cameroon_status is 'declared=vendeur, auto=détection, verified=admin, imported=étranger, rejected=refusé';
