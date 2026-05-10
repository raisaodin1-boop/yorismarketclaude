-- Yorix RLS hardening (table-by-table)
-- Objective: lock sensitive finance/payment writes to backend while preserving user flows.

-- ------------------------------------------------------------------
-- Helper role predicates
-- ------------------------------------------------------------------
create or replace function public.is_platform_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role in ('admin', 'superadmin')
  );
$$;

create or replace function public.has_profile_role(target_role text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = target_role
  );
$$;

-- ------------------------------------------------------------------
-- Profiles
-- ------------------------------------------------------------------
alter table if exists public.profiles enable row level security;

drop policy if exists profiles_select_self_or_admin on public.profiles;
create policy profiles_select_self_or_admin
on public.profiles
for select
to authenticated
using (id = auth.uid() or public.is_platform_admin());

drop policy if exists profiles_insert_self on public.profiles;
create policy profiles_insert_self
on public.profiles
for insert
to authenticated
with check (
  id = auth.uid()
  and coalesce(role, 'buyer') in ('buyer', 'seller', 'provider', 'delivery')
);

drop policy if exists profiles_update_self_or_admin on public.profiles;
create policy profiles_update_self_or_admin
on public.profiles
for update
to authenticated
using (id = auth.uid() or public.is_platform_admin())
with check (
  (id = auth.uid() and coalesce(role, 'buyer') in ('buyer', 'seller', 'provider', 'delivery'))
  or public.is_platform_admin()
);

-- ------------------------------------------------------------------
-- Wallets
-- ------------------------------------------------------------------
alter table if exists public.wallets enable row level security;

drop policy if exists wallets_select_owner_or_admin on public.wallets;
create policy wallets_select_owner_or_admin
on public.wallets
for select
to authenticated
using (user_id = auth.uid() or public.is_platform_admin());

drop policy if exists wallets_insert_owner on public.wallets;
create policy wallets_insert_owner
on public.wallets
for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists wallets_update_admin_only on public.wallets;
create policy wallets_update_admin_only
on public.wallets
for update
to authenticated
using (public.is_platform_admin())
with check (public.is_platform_admin());

-- ------------------------------------------------------------------
-- Orders (legacy + hybrid)
-- ------------------------------------------------------------------
alter table if exists public.orders enable row level security;

drop policy if exists orders_select_related_or_admin on public.orders;
create policy orders_select_related_or_admin
on public.orders
for select
to authenticated
using (
  client_id = auth.uid()
  or vendeur_id = auth.uid()
  or livreur_id = auth.uid()
  or public.is_platform_admin()
);

drop policy if exists orders_insert_buyer_pending_only on public.orders;
create policy orders_insert_buyer_pending_only
on public.orders
for insert
to authenticated
with check (
  client_id = auth.uid()
  and coalesce(status, 'pending') = 'pending'
  and coalesce(livraison_status, 'pending') in ('pending', 'pending_pickup')
  and coalesce(escrow_status, 'pending') = 'pending'
  and coalesce(payment_status, 'pending') in ('pending', 'cod_pending')
  and coalesce(commission, 0) >= 0
  and coalesce(montant, 0) >= 0
  and coalesce(montant_vendeur, 0) >= 0
);

drop policy if exists orders_update_seller_or_admin_guarded on public.orders;
create policy orders_update_seller_or_admin_guarded
on public.orders
for update
to authenticated
using (
  public.is_platform_admin()
  or vendeur_id = auth.uid()
)
with check (
  public.is_platform_admin()
  or (
    vendeur_id = auth.uid()
    and coalesce(status, 'pending') in ('pending', 'validee', 'livre', 'annulee', 'shipped', 'delivered')
    and coalesce(livraison_status, 'pending') in ('pending', 'pending_pickup', 'preparation', 'collecte', 'en_route', 'livre', 'shipped', 'delivered')
    and coalesce(escrow_status, 'pending') in ('pending', 'securise', 'libere', 'rembourse')
    and coalesce(payment_status, 'pending') in ('pending', 'cod_pending', 'paid', 'failed')
  )
);

-- ------------------------------------------------------------------
-- Deliveries
-- ------------------------------------------------------------------
alter table if exists public.deliveries enable row level security;

drop policy if exists deliveries_select_related_or_admin on public.deliveries;
create policy deliveries_select_related_or_admin
on public.deliveries
for select
to authenticated
using (
  livreur_id = auth.uid()
  or public.is_platform_admin()
  or exists (
    select 1 from public.orders o
    where o.id = deliveries.order_id
      and (o.client_id = auth.uid() or o.vendeur_id = auth.uid())
  )
);

drop policy if exists deliveries_insert_auth_or_admin on public.deliveries;
create policy deliveries_insert_auth_or_admin
on public.deliveries
for insert
to authenticated
with check (
  public.is_platform_admin()
  or livreur_id is null
  or livreur_id = auth.uid()
);

drop policy if exists deliveries_update_livreur_or_admin on public.deliveries;
create policy deliveries_update_livreur_or_admin
on public.deliveries
for update
to authenticated
using (
  public.is_platform_admin()
  or livreur_id = auth.uid()
)
with check (
  public.is_platform_admin()
  or livreur_id = auth.uid()
);

-- ------------------------------------------------------------------
-- Services
-- ------------------------------------------------------------------
alter table if exists public.services enable row level security;

drop policy if exists services_select_public_active_or_owner_or_admin on public.services;
create policy services_select_public_active_or_owner_or_admin
on public.services
for select
to authenticated
using (
  (coalesce(actif, true) = true and coalesce(disponible, true) = true)
  or provider_id = auth.uid()
  or public.is_platform_admin()
);

drop policy if exists services_insert_provider_or_admin on public.services;
create policy services_insert_provider_or_admin
on public.services
for insert
to authenticated
with check (
  provider_id = auth.uid()
  or public.is_platform_admin()
);

drop policy if exists services_update_provider_or_admin on public.services;
create policy services_update_provider_or_admin
on public.services
for update
to authenticated
using (provider_id = auth.uid() or public.is_platform_admin())
with check (provider_id = auth.uid() or public.is_platform_admin());

drop policy if exists services_delete_provider_or_admin on public.services;
create policy services_delete_provider_or_admin
on public.services
for delete
to authenticated
using (provider_id = auth.uid() or public.is_platform_admin());

-- ------------------------------------------------------------------
-- Checkout intents
-- ------------------------------------------------------------------
alter table if exists public.checkout_intents enable row level security;

drop policy if exists checkout_intents_select_owner_or_admin on public.checkout_intents;
create policy checkout_intents_select_owner_or_admin
on public.checkout_intents
for select
to authenticated
using (customer_id = auth.uid() or public.is_platform_admin());

drop policy if exists checkout_intents_insert_owner on public.checkout_intents;
create policy checkout_intents_insert_owner
on public.checkout_intents
for insert
to authenticated
with check (customer_id = auth.uid());

drop policy if exists checkout_intents_update_owner_or_admin on public.checkout_intents;
create policy checkout_intents_update_owner_or_admin
on public.checkout_intents
for update
to authenticated
using (customer_id = auth.uid() or public.is_platform_admin())
with check (customer_id = auth.uid() or public.is_platform_admin());

-- ------------------------------------------------------------------
-- Order items
-- ------------------------------------------------------------------
alter table if exists public.order_items enable row level security;

drop policy if exists order_items_select_related_or_admin on public.order_items;
create policy order_items_select_related_or_admin
on public.order_items
for select
to authenticated
using (
  exists (
    select 1 from public.orders o
    where o.id = order_items.order_id
      and (
        o.client_id = auth.uid()
        or o.vendeur_id = auth.uid()
        or o.livreur_id = auth.uid()
        or public.is_platform_admin()
      )
  )
);

drop policy if exists order_items_insert_admin_only on public.order_items;
create policy order_items_insert_admin_only
on public.order_items
for insert
to authenticated
with check (public.is_platform_admin());

drop policy if exists order_items_update_admin_only on public.order_items;
create policy order_items_update_admin_only
on public.order_items
for update
to authenticated
using (public.is_platform_admin())
with check (public.is_platform_admin());

-- ------------------------------------------------------------------
-- Service bookings
-- ------------------------------------------------------------------
alter table if exists public.service_bookings enable row level security;

drop policy if exists service_bookings_select_related_or_admin on public.service_bookings;
create policy service_bookings_select_related_or_admin
on public.service_bookings
for select
to authenticated
using (
  client_id = auth.uid()
  or provider_id = auth.uid()
  or public.is_platform_admin()
);

drop policy if exists service_bookings_insert_client_or_admin on public.service_bookings;
create policy service_bookings_insert_client_or_admin
on public.service_bookings
for insert
to authenticated
with check (
  client_id = auth.uid()
  or public.is_platform_admin()
);

drop policy if exists service_bookings_update_related_or_admin on public.service_bookings;
create policy service_bookings_update_related_or_admin
on public.service_bookings
for update
to authenticated
using (
  client_id = auth.uid()
  or provider_id = auth.uid()
  or public.is_platform_admin()
)
with check (
  client_id = auth.uid()
  or provider_id = auth.uid()
  or public.is_platform_admin()
);

-- ------------------------------------------------------------------
-- Payment transactions
-- ------------------------------------------------------------------
alter table if exists public.payment_transactions enable row level security;

drop policy if exists payment_transactions_select_admin_or_related_client on public.payment_transactions;
create policy payment_transactions_select_admin_or_related_client
on public.payment_transactions
for select
to authenticated
using (
  public.is_platform_admin()
  or exists (
    select 1 from public.orders o
    where o.order_group_id = payment_transactions.order_group_id
      and o.client_id = auth.uid()
  )
);

drop policy if exists payment_transactions_insert_admin_only on public.payment_transactions;
create policy payment_transactions_insert_admin_only
on public.payment_transactions
for insert
to authenticated
with check (public.is_platform_admin());

drop policy if exists payment_transactions_update_admin_only on public.payment_transactions;
create policy payment_transactions_update_admin_only
on public.payment_transactions
for update
to authenticated
using (public.is_platform_admin())
with check (public.is_platform_admin());

-- ------------------------------------------------------------------
-- Wallet transactions
-- ------------------------------------------------------------------
alter table if exists public.wallet_transactions enable row level security;

drop policy if exists wallet_transactions_select_owner_or_admin on public.wallet_transactions;
create policy wallet_transactions_select_owner_or_admin
on public.wallet_transactions
for select
to authenticated
using (user_id = auth.uid() or public.is_platform_admin());

drop policy if exists wallet_transactions_insert_admin_only on public.wallet_transactions;
create policy wallet_transactions_insert_admin_only
on public.wallet_transactions
for insert
to authenticated
with check (public.is_platform_admin());

drop policy if exists wallet_transactions_update_admin_only on public.wallet_transactions;
create policy wallet_transactions_update_admin_only
on public.wallet_transactions
for update
to authenticated
using (public.is_platform_admin())
with check (public.is_platform_admin());

-- ------------------------------------------------------------------
-- Admin KPI view permissions
-- ------------------------------------------------------------------
revoke all on table public.admin_finance_kpis from anon;
revoke all on table public.admin_finance_kpis from authenticated;
grant select on table public.admin_finance_kpis to authenticated;

