-- Wishlist (favoris acheteur) — persistance par utilisateur connecté

create table if not exists public.wishlists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  product_id uuid not null,
  created_at timestamptz not null default now(),
  unique (user_id, product_id)
);

create index if not exists idx_wishlists_user_id
  on public.wishlists (user_id, created_at desc);

create index if not exists idx_wishlists_product_id
  on public.wishlists (product_id);

alter table public.wishlists enable row level security;

drop policy if exists wishlists_user_select on public.wishlists;
create policy wishlists_user_select
  on public.wishlists for select to authenticated
  using (user_id = auth.uid());

drop policy if exists wishlists_user_insert on public.wishlists;
create policy wishlists_user_insert
  on public.wishlists for insert to authenticated
  with check (user_id = auth.uid());

drop policy if exists wishlists_user_delete on public.wishlists;
create policy wishlists_user_delete
  on public.wishlists for delete to authenticated
  using (user_id = auth.uid());
