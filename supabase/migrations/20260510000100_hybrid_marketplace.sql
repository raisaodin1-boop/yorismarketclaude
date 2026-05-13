-- Yorix Hybrid Marketplace foundation
-- Safe additive migration: only IF NOT EXISTS clauses.

create extension if not exists pgcrypto;

create table if not exists public.checkout_intents (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid null,
  payload jsonb not null,
  checkout_type text not null default 'product_only',
  status text not null default 'draft',
  subtotal numeric(14,2) not null default 0,
  delivery_fee numeric(14,2) not null default 0,
  total numeric(14,2) not null default 0,
  expires_at timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null,
  item_kind text not null default 'product',
  product_id uuid null,
  service_id uuid null,
  quantity int not null default 1,
  unit_price numeric(14,2) not null default 0,
  subtotal numeric(14,2) not null default 0,
  fulfillment_mode text null,
  meta jsonb null,
  created_at timestamptz not null default now()
);

create index if not exists idx_order_items_order_id on public.order_items(order_id);

create table if not exists public.service_bookings (
  id uuid primary key default gen_random_uuid(),
  order_id uuid null,
  service_id uuid null,
  provider_id uuid null,
  client_id uuid null,
  client_nom text null,
  client_tel text null,
  booking_date date null,
  booking_time text null,
  location_type text not null default 'home',
  location_address text null,
  status text not null default 'reserved',
  notes text null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.payment_transactions (
  id uuid primary key default gen_random_uuid(),
  checkout_intent_id uuid null,
  order_group_id text null,
  provider text not null default 'manual',
  provider_ref text null,
  payment_method text null,
  amount numeric(14,2) not null default 0,
  currency text not null default 'XAF',
  status text not null default 'pending',
  channel text null,
  payload jsonb null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists idx_payment_transactions_provider_ref
  on public.payment_transactions(provider, provider_ref)
  where provider_ref is not null;

create table if not exists public.wallet_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  order_id uuid null,
  service_booking_id uuid null,
  transaction_type text not null,
  amount numeric(14,2) not null default 0,
  currency text not null default 'XAF',
  status text not null default 'pending',
  provider text null,
  provider_ref text null,
  notes text null,
  meta jsonb null,
  created_at timestamptz not null default now()
);

create index if not exists idx_wallet_transactions_user on public.wallet_transactions(user_id, created_at desc);

-- IF EXISTS: safe when `orders` is created by 20260508000100_orders_baseline.sql (PG 15+).
alter table if exists public.orders add column if not exists order_group_id text;
alter table if exists public.orders add column if not exists payment_method text;
alter table if exists public.orders add column if not exists payment_status text default 'pending';
alter table if exists public.orders add column if not exists payment_provider text;
alter table if exists public.orders add column if not exists provider_tx_ref text;
alter table if exists public.orders add column if not exists payout_status text default 'locked';

create or replace view public.admin_finance_kpis as
select
  coalesce(sum(o.montant), 0)::numeric(14,2) as volume_total,
  coalesce(sum(o.commission), 0)::numeric(14,2) as yorix_commission_total,
  coalesce(sum(case when o.payment_status = 'paid' then o.montant_vendeur else 0 end), 0)::numeric(14,2) as seller_net_payable,
  coalesce(sum(case when o.payment_status = 'paid' and o.livraison_status = 'livre' then o.montant_vendeur else 0 end), 0)::numeric(14,2) as seller_net_releasable,
  coalesce(sum(case when o.payment_method = 'cod' then o.montant else 0 end), 0)::numeric(14,2) as cod_volume,
  count(*)::int as total_orders
from public.orders o;

