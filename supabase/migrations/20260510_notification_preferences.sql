-- Préférences notifications utilisateur (source de vérité côté cloud + synchro SPA)
create table if not exists public.notification_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  push_enabled boolean not null default true,
  desktop_alerts boolean not null default true,
  sound_enabled boolean not null default false,
  email_critical boolean not null default false,
  sms_critical boolean not null default false,
  whatsapp_critical boolean not null default true,
  category_messages boolean not null default true,
  category_orders boolean not null default true,
  category_payments boolean not null default true,
  category_delivery boolean not null default true,
  category_security boolean not null default true,
  category_promotions boolean not null default true,
  category_system boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table public.notification_preferences enable row level security;

drop policy if exists notification_preferences_select_own on public.notification_preferences;
create policy notification_preferences_select_own on public.notification_preferences
  for select to authenticated using (auth.uid() = user_id);

drop policy if exists notification_preferences_insert_own on public.notification_preferences;
create policy notification_preferences_insert_own on public.notification_preferences
  for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists notification_preferences_update_own on public.notification_preferences;
create policy notification_preferences_update_own on public.notification_preferences
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
