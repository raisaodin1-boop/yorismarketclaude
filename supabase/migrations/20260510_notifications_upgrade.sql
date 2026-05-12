-- Notifications enrichies (colonnes facultatives ; table déjà utilisée par l’app)
alter table if exists public.notifications
  add column if not exists priority text default 'standard';

alter table if exists public.notifications
  add column if not exists category text default 'system';

alter table if exists public.notifications
  add column if not exists image_url text;

alter table if exists public.notifications
  add column if not exists metadata jsonb default '{}'::jsonb;

create index if not exists idx_notifications_user_created on public.notifications (user_id, created_at desc);
