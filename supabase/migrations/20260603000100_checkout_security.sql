-- ═══════════════════════════════════════════════════════════════════════════
-- Sécurité & intégrité du checkout
--   1) check_cart_stock  : vérification de stock verrouillée (FOR UPDATE)
--                          AVANT toute création de commande (anti-survente).
--   2) checkout_idempotency : déduplication des confirmations de checkout
--                          (réseau coupé + reclic → une seule commande).
--
-- Contexte : la Edge Function `confirm_checkout` n'est PAS exécutée dans une
-- transaction Postgres unique (supabase-js enchaîne des appels REST séparés).
-- On déporte donc l'atomicité dans des fonctions plpgsql (qui, elles, tournent
-- chacune dans une transaction) :
--   • check_cart_stock verrouille les lignes produits et valide le stock.
--   • decrement_product_stock (migration 20260601000100) re-vérifie sous verrou
--     et décrémente — c'est la double sécurité contre les race conditions.
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── 1) Vérification de stock pré-commande (verrou pessimiste) ───────────────
-- Reçoit le panier sous forme [{ "id": <uuid>, "qty": <int> }, ...] (lignes
-- produit uniquement) et verrouille toutes les lignes concernées via FOR UPDATE.
-- Retourne :
--   • NULL                              → tout le panier est servable, on peut
--                                         poursuivre la création des commandes ;
--   • jsonb { product_id, name,         → premier article en rupture rencontré,
--             available, requested }      à mapper en HTTP 409 STOCK_INSUFFICIENT.
create or replace function public.check_cart_stock(p_items jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_item     jsonb;
  v_id       uuid;
  v_qty      integer;
  v_stock    integer;
  v_name     text;
begin
  if p_items is null or jsonb_typeof(p_items) <> 'array' then
    return null;
  end if;

  -- Verrou pessimiste sur l'ensemble des produits du panier, pris en une seule
  -- requête ordonnée par id : ordre déterministe = pas de deadlock entre deux
  -- checkouts concurrents qui partagent des produits.
  perform 1
    from public.products
   where id in (
           select (elem->>'id')::uuid
             from jsonb_array_elements(p_items) elem
            where elem->>'id' is not null
         )
   order by id
     for update;

  -- Comparaison stock disponible / quantité demandée, ligne par ligne.
  for v_item in select * from jsonb_array_elements(p_items)
  loop
    if (v_item->>'id') is null then
      continue;
    end if;

    v_id  := (v_item->>'id')::uuid;
    v_qty := greatest(1, coalesce((v_item->>'qty')::integer, 1));

    select stock, name_fr
      into v_stock, v_name
      from public.products
     where id = v_id;

    if not found then
      return jsonb_build_object(
        'product_id', v_id,
        'name',       'Produit introuvable',
        'available',  0,
        'requested',  v_qty
      );
    end if;

    -- Stock NULL = illimité (produits sans gestion de stock) → pas d'opposition de rupture.
    -- Seul un stock renseigné et insuffisant bloque.
    if v_stock is not null and v_stock < v_qty then
      return jsonb_build_object(
        'product_id', v_id,
        'name',       coalesce(v_name, 'Produit'),
        'available',  v_stock,
        'requested',  v_qty
      );
    end if;
  end loop;

  return null;
end;
$$;

-- Réservé au service role (Edge Functions) — jamais exposé au client.
revoke all on function public.check_cart_stock(jsonb) from public;
revoke all on function public.check_cart_stock(jsonb) from authenticated;
revoke all on function public.check_cart_stock(jsonb) from anon;
grant  execute on function public.check_cart_stock(jsonb) to service_role;

comment on function public.check_cart_stock(jsonb) is
  'Verrouille (FOR UPDATE) et vérifie le stock des produits du panier avant '
  'création des commandes. Retourne NULL si OK, sinon le premier article en '
  'rupture (jsonb) à mapper en HTTP 409 STOCK_INSUFFICIENT.';


-- ─── 2) Idempotency du checkout ──────────────────────────────────────────────
-- Une confirmation de checkout crée PLUSIEURS commandes (une par article),
-- regroupées par `order_group_id`. On indexe donc l'idempotency sur le groupe
-- (et non sur un order_id unique) et on met en
-- cache la réponse complète pour pouvoir la rejouer telle quelle.
create table if not exists public.checkout_idempotency (
  key            uuid primary key,
  order_group_id text,
  -- Réponse JSON renvoyée à l'origine, rejouée à l'identique sur reclic.
  -- NULL tant que la confirmation est en cours (sert de verrou applicatif).
  response       jsonb,
  status         text not null default 'in_progress'
                   check (status in ('in_progress', 'completed')),
  created_at     timestamptz not null default now(),
  completed_at   timestamptz
);

-- Index pour le cleanup périodique (purge par date).
create index if not exists idx_checkout_idempotency_created_at
  on public.checkout_idempotency (created_at);

alter table public.checkout_idempotency enable row level security;
-- Aucune policy : table pilotée uniquement par le service role (Edge Functions),
-- qui bypasse RLS. Le client n'y accède jamais directement.

revoke all on table public.checkout_idempotency from anon;
revoke all on table public.checkout_idempotency from authenticated;
grant  all on table public.checkout_idempotency to service_role;


-- ─── 3) Cleanup automatique des clés ───────────────────────────
create or replace function public.cleanup_checkout_idempotency()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_deleted integer;
begin
  delete from public.checkout_idempotency
   where created_at < now() - interval '24 hours';
  get diagnostics v_deleted = row_count;
  return v_deleted;
end;
$$;

revoke all on function public.cleanup_checkout_idempotency() from public;
grant  execute on function public.cleanup_checkout_idempotency() to service_role;

-- Planification best-effort via pg_cron (soft-fail si l'extension manque, à
-- l'image de stock_lifecycle_cron). Sinon, planifier manuellement.
do $$
begin
  begin
    create extension if not exists pg_cron;
  exception when others then
    raise notice 'pg_cron indisponible : purge checkout_idempotency à planifier manuellement (%).', sqlerrm;
    return;
  end;

  begin
    perform cron.unschedule('checkout-idempotency-cleanup-daily');
  exception when others then
    null;
  end;

  perform cron.schedule(
    'checkout-idempotency-cleanup-daily',
    '30 3 * * *',
    $cron$select public.cleanup_checkout_idempotency();$cron$
  );
end
$$;
