-- Promo -15 % sur l'alimentation (16 → 17 mai 2026, fin dimanche 23:59 Africa/Douala)
-- Les dates sont stockées sur chaque produit ; une fonction nettoie les promos expirées.

alter table public.products
  add column if not exists promo_starts_at timestamptz null,
  add column if not exists promo_ends_at timestamptz null;

create or replace function public.clear_expired_product_promos()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count integer;
begin
  update public.products
  set
    promo = false,
    promo_pct = 0,
    promo_starts_at = null,
    promo_ends_at = null
  where promo = true
    and promo_ends_at is not null
    and promo_ends_at < now();

  get diagnostics v_count = row_count;
  return v_count;
end;
$$;

-- Fenêtre : samedi 16 mai 2026 → dimanche 17 mai 2026 23:59 (Africa/Douala, UTC+1)
do $$
declare
  v_start timestamptz := timestamptz '2026-05-16 00:00:00+01';
  v_end timestamptz := timestamptz '2026-05-17 23:59:59+01';
begin
  with alimentation_root as (
    select id from public.marketplace_categories
    where slug = 'alimentation' and category_type = 'product' and active = true
    limit 1
  ),
  food_category_ids as (
    select c.id
    from public.marketplace_categories c
    cross join alimentation_root r
    where c.category_type = 'product'
      and c.active = true
      and (c.id = r.id or c.parent_id = r.id)
  )
  update public.products p
  set
    promo = true,
    promo_pct = 15,
    promo_starts_at = v_start,
    promo_ends_at = v_end
  where p.actif is distinct from false
    and (
      p.category_id in (select id from food_category_ids)
      or lower(coalesce(p.categorie, '')) like '%aliment%'
      or lower(coalesce(p.categorie, '')) in (
        'épicerie', 'epicerie', 'boissons', 'frais', 'snacks', 'produits frais'
      )
    );
end;
$$;

select public.clear_expired_product_promos();
