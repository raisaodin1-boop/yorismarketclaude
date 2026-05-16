-- Yorix — Taxonomie marketplace centralisée (FR/EN), SEO fields, ville, migration douce depuis `categorie` texte.
-- Appliquer après les migrations orders/hybrid existantes.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Types métier verticaux
-- ---------------------------------------------------------------------------
create table if not exists public.marketplace_categories (
  id uuid primary key default gen_random_uuid(),
  name_fr text not null,
  name_en text not null,
  slug text not null,
  icon text null,
  seo_title_fr text null,
  seo_title_en text null,
  seo_description_fr text null,
  seo_description_en text null,
  category_type text not null
    check (category_type in ('product','service','real_estate','job','delivery')),
  parent_id uuid null references public.marketplace_categories(id) on delete set null,
  featured boolean not null default false,
  trending boolean not null default false,
  active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint marketplace_categories_slug_type_unique unique (slug, category_type)
);

create index if not exists idx_marketplace_categories_type_active_sort
  on public.marketplace_categories (category_type, active, sort_order);
create index if not exists idx_marketplace_categories_parent
  on public.marketplace_categories (parent_id) where parent_id is not null;
create index if not exists idx_marketplace_categories_featured
  on public.marketplace_categories (category_type, featured) where featured = true and active = true;
create index if not exists idx_marketplace_categories_trending
  on public.marketplace_categories (category_type, trending) where trending = true and active = true;

-- Villes locales (priorité UX + SEO hubs) — slugs alignés avec SEO_CITIES dans seoRoutes.js
create table if not exists public.category_city_feature (
  category_id uuid not null references public.marketplace_categories(id) on delete cascade,
  city_slug text not null check (city_slug ~ '^[a-z0-9-]+$'),
  spotlight boolean not null default false,
  sort_order int not null default 0,
  primary key (category_id, city_slug)
);

create index if not exists idx_category_city_feature_city
  on public.category_city_feature (city_slug, sort_order);

-- ---------------------------------------------------------------------------
-- Lien FK optionnel depuis catalogues existants (soft migration)
-- ---------------------------------------------------------------------------
alter table if exists public.products
  add column if not exists category_id uuid references public.marketplace_categories(id);

create index if not exists idx_products_category_id on public.products (category_id)
  where category_id is not null;

alter table if exists public.services
  add column if not exists category_id uuid references public.marketplace_categories(id);

create index if not exists idx_services_category_id on public.services (category_id)
  where category_id is not null;

-- ---------------------------------------------------------------------------
-- RLS lecture publique pour lignes actives (écriture = service_role / dashboard admin futur)
-- ---------------------------------------------------------------------------
alter table public.marketplace_categories enable row level security;
alter table public.category_city_feature enable row level security;

drop policy if exists "marketplace_categories_select_active_anon"
  on public.marketplace_categories;
create policy "marketplace_categories_select_active_anon"
  on public.marketplace_categories for select
  using (active = true);

drop policy if exists "category_city_feature_select_anon" on public.category_city_feature;
create policy "category_city_feature_select_anon"
  on public.category_city_feature for select
  using (true);

-- ---------------------------------------------------------------------------
-- Seed taxonomie demandée (idempotent via slug+type unique)
-- ---------------------------------------------------------------------------
insert into public.marketplace_categories
  (name_fr, name_en, slug, category_type, parent_id, featured, trending, sort_order, seo_title_fr, seo_title_en, seo_description_fr, seo_description_en, icon)
values
-- Produits
('Électronique & Technologie', 'Electronics & Technology', 'electronique-technologie', 'product', null, true, true, 10,
 'Électronique & High-Tech au Cameroun — Yorix', 'Electronics in Cameroon — Yorix',
 'Smartphones, accessoires, informatique et tech livrées au Cameroun.', 'Phones, accessories, IT and tech delivered in Cameroon.', '📱'),
('Électroménager', 'Home Appliances', 'electromenager', 'product', null, true, true, 20,
 'Électroménager Cameroun', 'Home appliances Cameroon',
 'Froid, cuisson, petit électro pour la maison au Cameroun.', 'Cooling, cooking, small appliances for homes in Cameroon.', '🔌'),
('Maison & Cuisine', 'Home & Kitchen', 'maison-cuisine', 'product', null, true, false, 30,
 'Maison & cuisine — Yorix CM', 'Home & kitchen — Yorix CM',
 'Décoration, ustensiles, art de la table.', 'Decor, utensils, tableware.', '🏠'),
('Mode & Beauté', 'Fashion & Beauty', 'mode-beaute', 'product', null, true, true, 40,
 'Mode & beauté Cameroun', 'Fashion & beauty Cameroon',
 'Vêtements, chaussures, cosmétiques tendance.', 'Clothing, shoes, trending cosmetics.', '👗'),
('Santé & Bien-être', 'Health & Wellness', 'sante-bien-etre', 'product', null, false, false, 50,
 'Santé & bien-être', 'Health & wellness',
 'Compléments, soins, hygiène.', 'Supplements, care, hygiene.', '💊'),
('Automobile', 'Automotive', 'automobile', 'product', null, false, false, 60,
 'Pièces & accessoires auto', 'Car parts & accessories',
 'Accessoires et pièces pour véhicules.', 'Parts and accessories for vehicles.', '🚗'),
('Agriculture', 'Agriculture', 'agriculture', 'product', null, false, false, 70,
 'Agriculture & intrants', 'Agriculture & inputs',
 'Semences, outils, équipements agricoles.', 'Seeds, tools, farm equipment.', '🌾'),
('Bébé & Enfants', 'Baby & Kids', 'bebe-enfants', 'product', null, true, false, 80,
 'Bébé & enfants', 'Baby & kids',
 'Puériculture, jouets, vêtements enfants.', 'Baby gear, toys, kids clothing.', '🍼'),

-- Services
('Livraison', 'Delivery', 'livraison', 'service', null, true, true, 5,
 'Services de livraison Cameroun', 'Delivery services Cameroon',
 'Livraison rapide et fiable à Douala, Yaoundé et au-delà.', 'Fast reliable delivery in Douala, Yaoundé and beyond.', '🚚'),
('Plomberie', 'Plumbing', 'plomberie', 'service', null, false, false, 10,
 'Plombiers au Cameroun', 'Plumbers in Cameroon',
 'Dépannage, installation, rénovation sanitaire.', 'Repairs, installation, plumbing work.', '🔧'),
('Beauté', 'Beauty', 'beaute', 'service', null, true, false, 20,
 'Services beauté', 'Beauty services',
 'Coiffure, soins, esthétique à domicile ou en salon.', 'Hair, skincare, beauty at home or salon.', '💅'),
('Développement', 'Development', 'developpement', 'service', null, false, false, 30,
 'Développement web & tech', 'Web & tech development',
 'Sites, apps, maintenance et conseil digital.', 'Websites, apps, maintenance and digital consulting.', '💻'),
('Réparation', 'Repair', 'reparation', 'service', null, false, false, 40,
 'Réparation électronique & électroménager', 'Electronics & appliance repair',
 'Smartphones, TV, équipements — diagnostic et réparation.', 'Phones, TVs, equipment — diagnostics and repair.', '🛠'),
('Formation', 'Training', 'formation', 'service', null, false, false, 50,
 'Formations professionnelles', 'Professional training',
 'Cours, bootcamps, coaching métiers numériques.', 'Courses, bootcamps, career coaching.', '📚'),

-- Livraison (type dédié — hub métier livreurs / logistique)
('Livraison express', 'Express delivery', 'express', 'delivery', null, true, true, 1,
 'Livraison express Cameroun', 'Express delivery Cameroon',
 'Colis et courses rapides intra-ville.', 'Fast parcels and urban runs.', '⚡'),
('Courses & dernier kilomètre', 'Last-mile & errands', 'dernier-kilometre', 'delivery', null, false, false, 2,
 'Dernier kilomètre', 'Last mile',
 'Pickup, livraison B2C, optimisation tournées.', 'Pickup, B2C delivery, route optimization.', '📦'),

-- Immobilier
('Terrains', 'Land plots', 'terrains', 'real_estate', null, true, false, 10,
 'Terrains à vendre Cameroun', 'Land for sale Cameroon',
 'Parcelles vérifiées, titres à clarifier avec experts locaux.', 'Verified plots; titles checked with local experts.', '🌍'),
('Maisons', 'Houses', 'maisons', 'real_estate', null, true, true, 20,
 'Maisons à vendre / louer', 'Houses for sale / rent',
 'Villas, duplex, résidences sécurisées.', 'Villas, duplexes, gated homes.', '🏡'),
('Appartements', 'Apartments', 'appartements', 'real_estate', null, true, true, 30,
 'Appartements Douala Yaoundé', 'Apartments Douala Yaounde',
 'Studios, T3, résidences urbaines.', 'Studios, 3-bedroom units, urban flats.', '🏬'),

-- Emploi
('Jobs', 'Jobs', 'jobs', 'job', null, true, true, 10,
 'Offres emploi Cameroun', 'Jobs in Cameroon',
 'CDI, CDD et missions salariées vérifiées.', 'Permanent, fixed-term and verified salaried roles.', '💼'),
('Freelance', 'Freelance', 'freelance', 'job', null, true, true, 20,
 'Freelance Cameroun', 'Freelance Cameroon',
 'Missions courts contrats prestataires indépendants.', 'Short-term gigs for independent professionals.', '🧑‍💻'),
('Stages', 'Internships', 'stages', 'job', null, false, false, 30,
 'Stages étudiants & juniors', 'Internships students & juniors',
 'Stages rémunérés et structures accueillantes.', 'Paid internships with host companies.', '🎓')
on conflict (slug, category_type) do nothing;

-- Villes locales : marquer plusieurs catégories pour chaque hub
insert into public.category_city_feature (category_id, city_slug, spotlight, sort_order)
select c.id, v.city_slug, v.spotlight, v.ord
from (values
  ('douala', 'electronique-technologie', 'product', true, 1),
  ('douala', 'mode-beaute', 'product', true, 2),
  ('douala', 'livraison', 'service', true, 3),
  ('yaounde', 'electronique-technologie', 'product', true, 1),
  ('yaounde', 'maisons', 'real_estate', true, 2),
  ('yaounde', 'jobs', 'job', false, 3),
  ('bafoussam', 'agriculture', 'product', true, 1),
  ('bafoussam', 'terrains', 'real_estate', false, 2),
  ('bamenda', 'electronique-technologie', 'product', true, 1),
  ('bamenda', 'reparation', 'service', false, 2)
) as v(city_slug, slug, ctype, spotlight, ord)
join public.marketplace_categories c on c.slug = v.slug and c.category_type = v.ctype
on conflict do nothing;

-- ---------------------------------------------------------------------------
-- Backfill category_id depuis libellés legacy (table products.categorie texte)
-- Adapter la liste aux anciennes constantes dans src/lib/constants.js
-- ---------------------------------------------------------------------------
update public.products p
set category_id = c.id
from public.marketplace_categories c
where p.category_id is null
  and p.categorie is not null
  and trim(lower(p.categorie)) = trim(lower(c.name_fr))
  and c.category_type = 'product';

-- Aliases usuels ancienne taxonomie → nouvelle (exemples)
update public.products p
set category_id = c.id
from public.marketplace_categories c
where p.category_id is null
  and c.slug = 'electronique-technologie'
  and c.category_type = 'product'
  and trim(lower(p.categorie)) in ('téléphones & hightech','telephones & hightech');

update public.products p
set category_id = c.id
from public.marketplace_categories c
where p.category_id is null
  and c.slug = 'mode-beaute'
  and c.category_type = 'product'
  and trim(lower(p.categorie)) like '%mode%';

update public.products p
set category_id = c.id
from public.marketplace_categories c
where p.category_id is null
  and c.slug = 'agriculture'
  and c.category_type = 'product'
  and trim(lower(p.categorie)) = 'agricole';

