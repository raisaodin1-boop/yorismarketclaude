-- Baseline `public.orders` for projects where the legacy table was never created.
-- Must run before 20260510_hybrid_marketplace.sql (which ALTERs this table).

create extension if not exists pgcrypto;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  product_id uuid null,
  vendeur_id uuid null,
  client_id uuid null,
  livreur_id uuid null,
  client_nom text null,
  telephone text null,
  montant numeric(14, 2) not null default 0,
  commission numeric(14, 2) not null default 0,
  montant_vendeur numeric(14, 2) not null default 0,
  status text not null default 'pending',
  livraison_status text not null default 'pending',
  escrow_status text not null default 'pending',
  order_group_id text null,
  payment_method text null,
  payment_status text null default 'pending',
  payment_provider text null,
  provider_tx_ref text null,
  payout_status text null default 'locked',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_orders_client_id on public.orders (client_id, created_at desc);
create index if not exists idx_orders_vendeur_id on public.orders (vendeur_id, created_at desc);
create index if not exists idx_orders_order_group_id on public.orders (order_group_id)
  where order_group_id is not null;
