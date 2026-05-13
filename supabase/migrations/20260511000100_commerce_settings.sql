-- Réglages commerciaux publics (seuil livraison offerte + frais standard) pour admin & Edge
create table if not exists public.commerce_settings (
  id smallint primary key default 1 check (id = 1),
  free_shipping_threshold_xaf numeric(14, 2) not null default 50000,
  standard_delivery_fee_xaf numeric(14, 2) not null default 1500,
  updated_at timestamptz not null default now()
);

insert into public.commerce_settings (id) values (1)
on conflict (id) do nothing;

alter table public.commerce_settings enable row level security;

drop policy if exists commerce_settings_select_all on public.commerce_settings;
create policy commerce_settings_select_all
  on public.commerce_settings for select using (true);

drop policy if exists commerce_settings_update_admin on public.commerce_settings;
create policy commerce_settings_update_admin
  on public.commerce_settings for update to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('admin', 'superadmin')
    )
  )
  with check (true);
