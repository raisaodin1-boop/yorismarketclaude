-- Yorix — Taxonomie complète : 15 catégories principales + sous-catégories produits
-- Appliquer après 20260522000100_reset_false_made_in_cameroon.sql

-- Renommer / aligner racines existantes
update public.marketplace_categories set
  name_fr = 'Automobile & Moto', name_en = 'Automotive & Motorcycles',
  slug = 'automobile-moto', icon = '🚗', sort_order = 60
where slug = 'automobile' and category_type = 'product';

update public.marketplace_categories set
  name_fr = 'Immobilier', slug = 'immobilier', icon = '🏢', sort_order = 70
where slug = 'immobilier-annonces' and category_type = 'product';

update public.marketplace_categories set
  name_fr = 'Services', slug = 'services', icon = '🛠️', sort_order = 80
where slug = 'services-annonces' and category_type = 'product';

update public.marketplace_categories set
  name_fr = 'Emploi & Opportunités', slug = 'emploi', sort_order = 90
where slug = 'emploi' and category_type = 'product';

update public.marketplace_categories set
  name_fr = 'Agriculture & Agrobusiness', sort_order = 100
where slug = 'agriculture' and category_type = 'product';

update public.marketplace_categories set
  name_fr = 'Industrie & Entreprise', slug = 'industrie-btp', sort_order = 150
where slug = 'industrie-btp' and category_type = 'product';

-- Insérer racines manquantes (idempotent)
insert into public.marketplace_categories
  (name_fr, name_en, slug, category_type, parent_id, featured, trending, sort_order, icon, seo_title_fr, seo_title_en, seo_description_fr, seo_description_en, category_kind)
values
('Électronique & Technologie', 'Electronics & Technology', 'electronique-technologie', 'product', null, true, true, 10, '📱', 'Électronique Cameroun — Yorix', 'Electronics Cameroon — Yorix', 'Smartphones, laptops, accessoires tech.', 'Phones, laptops, tech accessories.', 'standard'),
('Électroménager', 'Home Appliances', 'electromenager', 'product', null, true, true, 20, '🔌', 'Électroménager Cameroun', 'Appliances Cameroon', 'Gros et petit électroménager.', 'Major and small appliances.', 'standard'),
('Maison & Cuisine', 'Home & Kitchen', 'maison-cuisine', 'product', null, true, false, 30, '🏠', 'Maison & cuisine', 'Home & kitchen', 'Meubles, déco, ustensiles.', 'Furniture, decor, kitchenware.', 'standard'),
('Mode & Beauté', 'Fashion & Beauty', 'mode-beaute', 'product', null, true, true, 40, '👗', 'Mode & beauté', 'Fashion & beauty', 'Vêtements, chaussures, cosmétiques.', 'Clothing, shoes, cosmetics.', 'standard'),
('Santé & Bien-être', 'Health & Wellness', 'sante-bien-etre', 'product', null, false, false, 50, '💊', 'Santé & bien-être', 'Health & wellness', 'Parapharmacie, hygiène.', 'Health, hygiene.', 'standard'),
('Automobile & Moto', 'Automotive & Motorcycles', 'automobile-moto', 'product', null, false, false, 60, '🚗', 'Auto & moto', 'Auto & moto', 'Pièces et accessoires.', 'Parts and accessories.', 'standard'),
('Immobilier', 'Real Estate', 'immobilier', 'product', null, false, false, 70, '🏢', 'Immobilier Cameroun', 'Real estate Cameroon', 'Appartements, terrains, locations.', 'Apartments, land, rentals.', 'standard'),
('Services', 'Services', 'services', 'product', null, false, false, 80, '🛠️', 'Services marketplace', 'Services marketplace', 'Prestations locales.', 'Local services.', 'standard'),
('Emploi & Opportunités', 'Jobs & Opportunities', 'emploi', 'product', null, false, false, 90, '💼', 'Emploi Cameroun', 'Jobs Cameroon', 'Offres et stages.', 'Jobs and internships.', 'standard'),
('Agriculture & Agrobusiness', 'Agriculture & Agribusiness', 'agriculture', 'product', null, false, false, 100, '🌾', 'Agriculture', 'Agriculture', 'Intrants et matériel.', 'Inputs and equipment.', 'standard'),
('Alimentation', 'Food & Groceries', 'alimentation', 'product', null, false, true, 110, '🍽️', 'Alimentation', 'Food', 'Épicerie et frais.', 'Groceries and fresh food.', 'standard'),
('Bébé & Enfants', 'Baby & Kids', 'bebe-enfants', 'product', null, true, false, 120, '🍼', 'Bébé & enfants', 'Baby & kids', 'Puériculture, jouets.', 'Baby gear, toys.', 'standard'),
('Éducation & Formation', 'Education & Training', 'education', 'product', null, false, false, 130, '📚', 'Éducation', 'Education', 'Livres, fournitures, cours.', 'Books, supplies, courses.', 'standard'),
('Événements', 'Events', 'evenements', 'product', null, false, false, 140, '🎉', 'Événements', 'Events', 'Mariage, fêtes.', 'Weddings, parties.', 'standard'),
('Industrie & Entreprise', 'Industry & Business', 'industrie-btp', 'product', null, false, false, 150, '🏗️', 'Industrie & BTP', 'Industry & construction', 'Matériaux, équipements pro.', 'Materials, pro equipment.', 'standard')
on conflict (slug, category_type) do update set
  name_fr = excluded.name_fr,
  name_en = excluded.name_en,
  sort_order = excluded.sort_order,
  icon = excluded.icon,
  active = true;

-- Helper: insert children for a parent slug
create or replace function public._seed_category_children(
  p_parent_slug text,
  p_children jsonb
) returns void language plpgsql as $$
declare
  v_parent_id uuid;
  v_child jsonb;
  v_slug text;
  v_fr text;
  v_en text;
  v_sort int;
  v_i int := 0;
begin
  select id into v_parent_id from public.marketplace_categories
  where slug = p_parent_slug and category_type = 'product' limit 1;
  if v_parent_id is null then return; end if;

  for v_child in select * from jsonb_array_elements(p_children)
  loop
    v_i := v_i + 1;
    v_slug := v_child->>'slug';
    v_fr := v_child->>'name_fr';
    v_en := v_child->>'name_en';
    v_sort := coalesce((v_child->>'sort_order')::int, v_i);

    insert into public.marketplace_categories
      (name_fr, name_en, slug, category_type, parent_id, sort_order, active, category_kind)
    values (v_fr, v_en, v_slug, 'product', v_parent_id, v_sort, true, 'standard')
    on conflict (slug, category_type) do update set
      name_fr = excluded.name_fr,
      name_en = excluded.name_en,
      parent_id = excluded.parent_id,
      sort_order = excluded.sort_order,
      active = true;
  end loop;
end;
$$;

select public._seed_category_children('electronique-technologie', '[
  {"slug":"smartphones","name_fr":"Smartphones","name_en":"Smartphones"},
  {"slug":"ordinateurs-portables","name_fr":"Ordinateurs portables","name_en":"Laptops"},
  {"slug":"tablettes","name_fr":"Tablettes","name_en":"Tablets"},
  {"slug":"televiseurs","name_fr":"Téléviseurs","name_en":"TVs"},
  {"slug":"accessoires-tech","name_fr":"Accessoires tech","name_en":"Tech accessories"},
  {"slug":"gaming","name_fr":"Gaming & consoles","name_en":"Gaming & consoles"},
  {"slug":"photo-video","name_fr":"Photo & vidéo","name_en":"Photo & video"}
]'::jsonb);

select public._seed_category_children('electromenager', '[
  {"slug":"gros-electromenager","name_fr":"Gros électroménager","name_en":"Major appliances"},
  {"slug":"petit-electromenager","name_fr":"Petit électroménager","name_en":"Small appliances"},
  {"slug":"climatisation","name_fr":"Climatisation","name_en":"Air conditioning"},
  {"slug":"cuisine-electro","name_fr":"Cuisine électro","name_en":"Kitchen appliances"}
]'::jsonb);

select public._seed_category_children('maison-cuisine', '[
  {"slug":"meubles","name_fr":"Meubles","name_en":"Furniture"},
  {"slug":"decoration","name_fr":"Décoration","name_en":"Home decor"},
  {"slug":"ustensiles-cuisine","name_fr":"Ustensiles cuisine","name_en":"Kitchenware"},
  {"slug":"literie","name_fr":"Literie","name_en":"Bedding"},
  {"slug":"jardin-bricolage","name_fr":"Jardin & bricolage","name_en":"Garden & DIY"}
]'::jsonb);

select public._seed_category_children('mode-beaute', '[
  {"slug":"vetements-femme","name_fr":"Vêtements femme","name_en":"Women''s clothing"},
  {"slug":"vetements-homme","name_fr":"Vêtements homme","name_en":"Men''s clothing"},
  {"slug":"chaussures","name_fr":"Chaussures","name_en":"Shoes"},
  {"slug":"sacs-accessoires","name_fr":"Sacs & accessoires","name_en":"Bags & accessories"},
  {"slug":"cosmetiques","name_fr":"Cosmétiques","name_en":"Cosmetics"},
  {"slug":"bijoux","name_fr":"Bijoux","name_en":"Jewelry"}
]'::jsonb);

select public._seed_category_children('sante-bien-etre', '[
  {"slug":"parapharmacie","name_fr":"Parapharmacie","name_en":"OTC health"},
  {"slug":"complements","name_fr":"Compléments","name_en":"Supplements"},
  {"slug":"hygiene","name_fr":"Hygiène","name_en":"Hygiene"},
  {"slug":"materiel-medical","name_fr":"Matériel médical","name_en":"Medical equipment"}
]'::jsonb);

select public._seed_category_children('automobile-moto', '[
  {"slug":"pieces-auto","name_fr":"Pièces auto","name_en":"Car parts"},
  {"slug":"accessoires-auto","name_fr":"Accessoires auto","name_en":"Car accessories"},
  {"slug":"motos","name_fr":"Motos & scooters","name_en":"Motorcycles"},
  {"slug":"entretien-auto","name_fr":"Entretien auto","name_en":"Car maintenance"}
]'::jsonb);

select public._seed_category_children('immobilier', '[
  {"slug":"appartements","name_fr":"Appartements","name_en":"Apartments"},
  {"slug":"maisons","name_fr":"Maisons","name_en":"Houses"},
  {"slug":"terrains","name_fr":"Terrains","name_en":"Land"},
  {"slug":"locations","name_fr":"Locations","name_en":"Rentals"},
  {"slug":"bureaux-commerces","name_fr":"Bureaux & commerces","name_en":"Commercial property"}
]'::jsonb);

select public._seed_category_children('services', '[
  {"slug":"livraison-svc","name_fr":"Livraison","name_en":"Delivery"},
  {"slug":"plomberie-svc","name_fr":"Plomberie","name_en":"Plumbing"},
  {"slug":"electricite-svc","name_fr":"Électricité","name_en":"Electrical"},
  {"slug":"nettoyage-svc","name_fr":"Nettoyage","name_en":"Cleaning"},
  {"slug":"informatique-svc","name_fr":"Informatique","name_en":"IT services"},
  {"slug":"beaute-services","name_fr":"Beauté & coiffure","name_en":"Beauty services"}
]'::jsonb);

select public._seed_category_children('emploi', '[
  {"slug":"offres-emploi","name_fr":"Offres d''emploi","name_en":"Job offers"},
  {"slug":"stages","name_fr":"Stages","name_en":"Internships"},
  {"slug":"freelance","name_fr":"Freelance","name_en":"Freelance"},
  {"slug":"bourses","name_fr":"Bourses & concours","name_en":"Scholarships"}
]'::jsonb);

select public._seed_category_children('agriculture', '[
  {"slug":"semences","name_fr":"Semences","name_en":"Seeds"},
  {"slug":"intrants","name_fr":"Intrants","name_en":"Farm inputs"},
  {"slug":"elevage","name_fr":"Élevage","name_en":"Livestock"},
  {"slug":"materiel-agricole","name_fr":"Matériel agricole","name_en":"Farm equipment"},
  {"slug":"produits-agricoles","name_fr":"Produits agricoles","name_en":"Farm produce"}
]'::jsonb);

select public._seed_category_children('alimentation', '[
  {"slug":"epicerie","name_fr":"Épicerie","name_en":"Groceries"},
  {"slug":"frais","name_fr":"Produits frais","name_en":"Fresh food"},
  {"slug":"boissons","name_fr":"Boissons","name_en":"Beverages"},
  {"slug":"produits-locaux","name_fr":"Produits locaux","name_en":"Local products"}
]'::jsonb);

select public._seed_category_children('bebe-enfants', '[
  {"slug":"puericulture","name_fr":"Puériculture","name_en":"Baby care"},
  {"slug":"jouets","name_fr":"Jouets","name_en":"Toys"},
  {"slug":"vetements-enfants","name_fr":"Vêtements enfants","name_en":"Kids clothing"},
  {"slug":"mobilier-bebe","name_fr":"Mobilier bébé","name_en":"Baby furniture"}
]'::jsonb);

select public._seed_category_children('education', '[
  {"slug":"livres","name_fr":"Livres","name_en":"Books"},
  {"slug":"fournitures","name_fr":"Fournitures scolaires","name_en":"School supplies"},
  {"slug":"cours-formations","name_fr":"Cours & formations","name_en":"Courses"},
  {"slug":"informatique-education","name_fr":"Informatique éducation","name_en":"EdTech"}
]'::jsonb);

select public._seed_category_children('evenements', '[
  {"slug":"mariage","name_fr":"Mariage","name_en":"Weddings"},
  {"slug":"fetes","name_fr":"Fêtes & anniversaires","name_en":"Parties"},
  {"slug":"decoration-evenement","name_fr":"Décoration événement","name_en":"Event decor"},
  {"slug":"location-materiel","name_fr":"Location matériel","name_en":"Equipment rental"}
]'::jsonb);

select public._seed_category_children('industrie-btp', '[
  {"slug":"materiaux","name_fr":"Matériaux BTP","name_en":"Building materials"},
  {"slug":"equipements","name_fr":"Équipements pro","name_en":"Professional equipment"},
  {"slug":"outillage","name_fr":"Outillage","name_en":"Tools"},
  {"slug":"securite-travail","name_fr":"Sécurité au travail","name_en":"Work safety"}
]'::jsonb);

drop function if exists public._seed_category_children(text, jsonb);

-- Backfill category_id depuis categorie texte (legacy + sous-catégories par nom)
update public.products p
set category_id = c.id
from public.marketplace_categories c
where p.category_id is null
  and p.categorie is not null
  and (
    lower(trim(p.categorie)) = lower(trim(c.name_fr))
    or lower(trim(p.categorie)) = lower(trim(c.name_en))
  );

update public.products p
set category_id = c.id,
    categorie = c.name_fr
from public.marketplace_categories c
where p.category_id is null
  and c.parent_id is null
  and c.slug = case lower(trim(p.categorie))
    when 'téléphones & hightech' then 'electronique-technologie'
    when 'telephones & hightech' then 'electronique-technologie'
    when 'mode & accessoires' then 'mode-beaute'
    when 'maison & decoration' then 'maison-cuisine'
    when 'agricole' then 'agriculture'
    when 'beauté & soins' then 'mode-beaute'
    when 'btp' then 'industrie-btp'
    when 'automobile' then 'automobile-moto'
    when 'éducation' then 'education'
    when 'services' then 'services'
    else null
  end;
