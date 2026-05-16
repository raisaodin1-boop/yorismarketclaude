-- =============================================================================
-- Stock lifecycle automation (rupture detection + 30-day grace + soft delete)
-- =============================================================================
-- Adds the columns, indexes, audit log and trigger needed for the
-- Edge Function `stock_lifecycle` to detect out-of-stock products, notify the
-- seller, send J0/J15/J25 reminders and archive (soft-delete by default) after
-- a configurable grace period (commerce_settings.stock_out_grace_days).
--
-- The trigger keeps `out_of_stock_since`, `auto_removal_date` and
-- `stock_status` in sync with the canonical `stock` integer column without any
-- application change required.

-- ─── 1) PRODUCTS — colonnes lifecycle stock ──────────────────────────────────
alter table if exists public.products
  add column if not exists stock_status text not null default 'in_stock'
    check (stock_status in ('in_stock','low','out_of_stock','archived')),
  add column if not exists out_of_stock_since timestamptz null,
  add column if not exists auto_removal_date timestamptz null,
  add column if not exists is_archived boolean not null default false,
  add column if not exists hidden_from_marketplace boolean not null default false,
  add column if not exists seller_notified boolean not null default false,
  add column if not exists last_stock_alert_sent timestamptz null,
  add column if not exists stock_alerts_sent jsonb not null default '{}'::jsonb;

-- Indexes pour la cron (scan rapide) + filtrage catalogue
create index if not exists idx_products_out_of_stock_since
  on public.products (out_of_stock_since)
  where stock is not null and stock <= 0 and is_archived = false;

create index if not exists idx_products_stock_status
  on public.products (stock_status)
  where is_archived = false;

create index if not exists idx_products_archived
  on public.products (is_archived)
  where is_archived = true;

create index if not exists idx_products_auto_removal_due
  on public.products (auto_removal_date)
  where auto_removal_date is not null and is_archived = false;

-- ─── 2) COMMERCE_SETTINGS — paramètres rupture ───────────────────────────────
alter table if exists public.commerce_settings
  add column if not exists stock_out_grace_days int not null default 30
    check (stock_out_grace_days between 1 and 365),
  add column if not exists stock_low_threshold int not null default 5
    check (stock_low_threshold between 0 and 1000),
  add column if not exists stock_auto_archive boolean not null default true,
  add column if not exists stock_hard_delete boolean not null default false,
  add column if not exists stock_reminder_days_csv text not null default '1,15,25',
  add column if not exists stock_premium_seller_exempt boolean not null default true;

-- ─── 3) AUDIT LOG ────────────────────────────────────────────────────────────
create table if not exists public.stock_lifecycle_log (
  id bigserial primary key,
  product_id uuid null,
  vendeur_id uuid null,
  event text not null,        -- 'notified_j0', 'reminder', 'archived', 'restocked', 'hard_deleted'
  day_offset int null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_stock_lifecycle_log_product
  on public.stock_lifecycle_log (product_id, created_at desc);

create index if not exists idx_stock_lifecycle_log_event_date
  on public.stock_lifecycle_log (event, created_at desc);

alter table public.stock_lifecycle_log enable row level security;

drop policy if exists stock_lifecycle_log_admin_select on public.stock_lifecycle_log;
create policy stock_lifecycle_log_admin_select
  on public.stock_lifecycle_log for select to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('admin','superadmin')
    )
  );

-- Insertion exclusivement via service_role (Edge Function) → pas de policy.

-- ─── 4) RESTOCK SUBSCRIPTIONS — "notifier quand dispo" ───────────────────────
create table if not exists public.product_restock_subscriptions (
  id bigserial primary key,
  product_id uuid not null,
  user_id uuid null,           -- nullable pour les anonymes (email-only)
  email text null,
  notified_at timestamptz null,
  created_at timestamptz not null default now(),
  unique (product_id, user_id),
  unique (product_id, email)
);

create index if not exists idx_restock_subs_product
  on public.product_restock_subscriptions (product_id)
  where notified_at is null;

alter table public.product_restock_subscriptions enable row level security;

drop policy if exists restock_subs_user_insert on public.product_restock_subscriptions;
create policy restock_subs_user_insert
  on public.product_restock_subscriptions for insert to authenticated
  with check (user_id = auth.uid());

drop policy if exists restock_subs_user_select on public.product_restock_subscriptions;
create policy restock_subs_user_select
  on public.product_restock_subscriptions for select to authenticated
  using (
    user_id = auth.uid()
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('admin','superadmin')
    )
  );

drop policy if exists restock_subs_user_delete on public.product_restock_subscriptions;
create policy restock_subs_user_delete
  on public.product_restock_subscriptions for delete to authenticated
  using (user_id = auth.uid());

-- Insertion anonyme (email-only) via service_role uniquement.

-- ─── 5) TRIGGER — maintient stock_status + out_of_stock_since cohérents ──────
-- Ce trigger NE notifie pas. Il garantit juste que les colonnes dérivées
-- restent synchronisées dès qu'un vendeur change le stock (UI ou API), sans
-- toucher au reste du payload. La notification réelle est faite par l'Edge
-- Function `stock_lifecycle` qui tourne en cron quotidien.

create or replace function public.fn_products_sync_stock_lifecycle()
returns trigger
language plpgsql
as $$
declare
  v_grace int := 30;
  v_low int := 5;
begin
  begin
    select stock_out_grace_days, stock_low_threshold
    into v_grace, v_low
    from public.commerce_settings
    where id = 1;
  exception when others then
    -- Settings indisponibles : on garde les défauts.
    null;
  end;

  if new.stock is null then
    new.stock := 0;
  end if;

  if new.stock <= 0 then
    if new.out_of_stock_since is null then
      new.out_of_stock_since := now();
      new.auto_removal_date := now() + make_interval(days => v_grace);
      new.seller_notified := false;
      new.stock_alerts_sent := '{}'::jsonb;
    end if;
    if new.is_archived then
      new.stock_status := 'archived';
    else
      new.stock_status := 'out_of_stock';
    end if;
  else
    -- Restock détecté : on remet à zéro le compteur et l'historique d'alertes.
    if TG_OP = 'UPDATE' and (old.stock is null or old.stock <= 0) then
      insert into public.stock_lifecycle_log (product_id, vendeur_id, event, payload)
      values (new.id, new.vendeur_id, 'restocked',
        jsonb_build_object('previous_stock', old.stock, 'new_stock', new.stock));
    end if;
    new.out_of_stock_since := null;
    new.auto_removal_date := null;
    new.seller_notified := false;
    new.last_stock_alert_sent := null;
    new.stock_alerts_sent := '{}'::jsonb;
    new.is_archived := false;
    new.hidden_from_marketplace := false;
    if new.stock <= v_low then
      new.stock_status := 'low';
    else
      new.stock_status := 'in_stock';
    end if;
  end if;

  return new;
end
$$;

drop trigger if exists trg_products_sync_stock_lifecycle on public.products;
create trigger trg_products_sync_stock_lifecycle
  before insert or update of stock on public.products
  for each row execute function public.fn_products_sync_stock_lifecycle();

-- ─── 6) BACKFILL des produits existants ──────────────────────────────────────
-- On déclenche le trigger pour chaque ligne en faisant un no-op qui force
-- le recalcul des colonnes dérivées sans modifier le stock.
update public.products
set stock = stock
where out_of_stock_since is null
  and stock is not null
  and stock <= 0;
