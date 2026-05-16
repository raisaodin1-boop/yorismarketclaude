-- =============================================================================
-- Runtime config pour les triggers/cron qui appellent les Edge Functions
-- =============================================================================
-- Supabase Cloud n'autorise pas ALTER DATABASE ... SET app.*  depuis le SQL
-- editor (permission denied 42501). On stocke donc les valeurs (URL projet +
-- secrets partages) dans une petite table single-row, lue par :
--   • fn_notifications_after_insert_dispatch (trigger auto-push)
--   • le job pg_cron 'stock-lifecycle-daily' (call dispatch quotidien)
--
-- L'admin remplit ces champs via :
--   update public.app_runtime_config
--      set supabase_url           = 'https://<projet>.supabase.co',
--          notify_dispatch_secret = '<secret aleatoire>',
--          stock_lifecycle_secret = '<autre secret aleatoire>'
--    where id = 1;
--
-- Memes valeurs a coller dans les Edge secrets Supabase :
--   NOTIFY_DISPATCH_SECRET  = <meme valeur que notify_dispatch_secret>
--   STOCK_LIFECYCLE_SECRET  = <meme valeur que stock_lifecycle_secret>

-- ─── 1) TABLE ────────────────────────────────────────────────────────────────
create table if not exists public.app_runtime_config (
  id smallint primary key default 1 check (id = 1),
  supabase_url text null,
  notify_dispatch_secret text null,
  stock_lifecycle_secret text null,
  updated_at timestamptz not null default now()
);

insert into public.app_runtime_config (id) values (1)
on conflict (id) do nothing;

alter table public.app_runtime_config enable row level security;

-- Personne ne lit ca cote client (les secrets ne doivent JAMAIS sortir de la
-- base). Lecture admin uniquement, update admin uniquement. Le trigger et le
-- cron tournent en SECURITY DEFINER → ils contournent les policies.
drop policy if exists app_runtime_config_admin_select on public.app_runtime_config;
create policy app_runtime_config_admin_select
  on public.app_runtime_config for select to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('admin','superadmin')
    )
  );

drop policy if exists app_runtime_config_admin_update on public.app_runtime_config;
create policy app_runtime_config_admin_update
  on public.app_runtime_config for update to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('admin','superadmin')
    )
  )
  with check (true);

-- ─── 2) Trigger auto-dispatch : lit la table au lieu de current_setting ─────
create or replace function public.fn_notifications_after_insert_dispatch()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_url text;
  v_secret text;
  v_full_url text;
begin
  if new.user_id is null then
    return new;
  end if;

  begin
    select supabase_url, notify_dispatch_secret
      into v_url, v_secret
      from public.app_runtime_config
     where id = 1;
  exception when others then
    v_url := null;
    v_secret := null;
  end;

  if v_url is null or v_url = '' or v_secret is null or v_secret = '' then
    raise notice
      'auto-dispatch skipped : app_runtime_config.supabase_url / notify_dispatch_secret non remplis. Notif % reste in-app.', new.id;
    return new;
  end if;

  v_full_url := rtrim(v_url, '/') || '/functions/v1/dispatch_notification';

  begin
    perform net.http_post(
      url := v_full_url,
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'x-yorix-dispatch-secret', v_secret
      ),
      body := jsonb_build_object('notification_id', new.id::text),
      timeout_milliseconds := 8000
    );
  exception when others then
    raise notice 'auto-dispatch error for notif % : %', new.id, sqlerrm;
  end;

  return new;
end
$$;

-- Recreer le trigger pour qu'il pointe sur la nouvelle definition
drop trigger if exists trg_notifications_auto_dispatch on public.notifications;
create trigger trg_notifications_auto_dispatch
  after insert on public.notifications
  for each row execute function public.fn_notifications_after_insert_dispatch();

-- ─── 3) Cron stock_lifecycle : reprogrammation avec lecture depuis la table ─
-- (Re-run la planification en utilisant les valeurs stockees. Soft-fail si
-- pg_cron / pg_net pas dispo.)
do $$
declare
  v_url text;
  v_secret text;
  v_full_url text;
begin
  begin
    create extension if not exists pg_cron;
    create extension if not exists pg_net;
  exception when others then
    raise notice 'pg_cron ou pg_net indisponible : %', sqlerrm;
    return;
  end;

  begin
    select supabase_url, stock_lifecycle_secret
      into v_url, v_secret
      from public.app_runtime_config
     where id = 1;
  exception when others then
    v_url := null;
    v_secret := null;
  end;

  if v_url is null or v_url = '' or v_secret is null or v_secret = '' then
    raise notice
      'cron stock_lifecycle : config absente, planification ignoree (remplir app_runtime_config puis relancer cette migration).';
    return;
  end if;

  v_full_url := rtrim(v_url, '/') || '/functions/v1/stock_lifecycle';

  begin
    perform cron.unschedule('stock-lifecycle-daily');
  exception when others then
    null;
  end;

  perform cron.schedule(
    'stock-lifecycle-daily',
    '0 3 * * *',
    format(
      $cron$select net.http_post(
        url := %L,
        headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'x-yorix-cron-secret', %L
        ),
        body := '{}'::jsonb,
        timeout_milliseconds := 60000
      );$cron$,
      v_full_url,
      v_secret
    )
  );
end
$$;
