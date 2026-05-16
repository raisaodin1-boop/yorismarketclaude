-- =============================================================================
-- AUTO-DISPATCH des notifications push
-- =============================================================================
-- Chaque insertion dans `notifications` appelle automatiquement l'Edge
-- Function `dispatch_notification` (via pg_net), qui se charge ensuite d'envoyer
-- le Web Push (FCM/Mozilla/Apple) a tous les appareils enregistres dans
-- `push_subscriptions` pour l'utilisateur cible.
--
-- Resout le probleme : aujourd'hui seul `confirm_checkout` appelait le
-- dispatcher explicitement → toutes les autres notifs restaient in-app sans
-- push systeme. Avec ce trigger, **toute** insertion (alerte stock, messages,
-- promotions, alerte admin, etc.) declenche un push si le user a accepte les
-- notifications du navigateur.
--
-- Pre-requis cote projet Supabase (a configurer en dashboard) :
--   • Extensions    : pg_net (dashboard → Database → Extensions)
--   • Postgres conf : ALTER DATABASE postgres SET app.supabase_url = '<url>';
--                     ALTER DATABASE postgres SET app.notify_dispatch_secret = '<secret>';
--   • Edge secrets  : NOTIFY_DISPATCH_SECRET = meme valeur que app.notify_dispatch_secret
--                     VAPID_PUBLIC_KEY / VAPID_PRIVATE_KEY / VAPID_SUBJECT
--
-- Si app.supabase_url ou app.notify_dispatch_secret ne sont pas definis, le
-- trigger soft-fail (raise notice) sans casser l'INSERT initial — la
-- notification reste in-app et sera quand meme visible dans le centre.

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
  -- Pas de push pour les notifs sans destinataire
  if new.user_id is null then
    return new;
  end if;

  begin
    v_url := current_setting('app.supabase_url', true);
    v_secret := current_setting('app.notify_dispatch_secret', true);
  exception when others then
    v_url := null;
    v_secret := null;
  end;

  if v_url is null or v_url = '' or v_secret is null or v_secret = '' then
    raise notice
      'auto-dispatch skipped : app.supabase_url ou app.notify_dispatch_secret manquant. Notif % reste in-app.', new.id;
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
    -- pg_net indisponible / erreur reseau : on log mais on ne casse pas
    -- l'INSERT (la notif reste in-app).
    raise notice 'auto-dispatch error for notif % : %', new.id, sqlerrm;
  end;

  return new;
end
$$;

drop trigger if exists trg_notifications_auto_dispatch on public.notifications;
create trigger trg_notifications_auto_dispatch
  after insert on public.notifications
  for each row execute function public.fn_notifications_after_insert_dispatch();

-- Audit utile : on rappelle aux operateurs ce qu'il reste a faire.
do $$
begin
  raise notice
    'Trigger trg_notifications_auto_dispatch installe. Pour activer l''envoi push :';
  raise notice
    '  1) Activer extension pg_net (Dashboard → Database → Extensions).';
  raise notice
    '  2) ALTER DATABASE postgres SET app.supabase_url = ''https://<projet>.supabase.co'';';
  raise notice
    '  3) ALTER DATABASE postgres SET app.notify_dispatch_secret = ''<secret>''; (memes valeurs dans Edge secret NOTIFY_DISPATCH_SECRET)';
  raise notice
    '  4) Edge secrets : VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT.';
end
$$;
