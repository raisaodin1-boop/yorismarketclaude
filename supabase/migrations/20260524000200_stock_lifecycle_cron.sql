-- =============================================================================
-- Stock lifecycle — planification quotidienne (best-effort)
-- =============================================================================
-- Essaye d'enregistrer un cron quotidien (03:00 UTC) qui appelle la fonction
-- Edge `stock_lifecycle`. Si l'extension pg_cron ou pg_net n'est pas
-- disponible dans le projet Supabase, la migration soft-fail sans casser le
-- reste : il faut alors planifier la fonction depuis le tableau de bord
-- Supabase (Edge Functions → Schedules), ou depuis un Cron externe.
--
-- Variables d'env requises côté projet :
--   • app.supabase_url  (postgres setting)  ex.: https://xxxx.supabase.co
--   • app.stock_lifecycle_secret             secret partage (header)
--
-- Si vous n'utilisez pas ces postgres settings, planifiez manuellement via le
-- dashboard Supabase :
--   curl -X POST "$SUPABASE_URL/functions/v1/stock_lifecycle" \
--     -H "x-yorix-cron-secret: $STOCK_LIFECYCLE_SECRET"

do $$
declare
  v_url text;
  v_secret text;
begin
  begin
    create extension if not exists pg_cron;
  exception when others then
    raise notice 'pg_cron indisponible : %', sqlerrm;
    return;
  end;

  begin
    create extension if not exists pg_net;
  exception when others then
    raise notice 'pg_net indisponible : %', sqlerrm;
    return;
  end;

  begin
    v_url := current_setting('app.supabase_url', true);
    v_secret := current_setting('app.stock_lifecycle_secret', true);
  exception when others then
    v_url := null;
    v_secret := null;
  end;

  if v_url is null or v_secret is null then
    raise notice 'app.supabase_url / app.stock_lifecycle_secret non configures : planifier manuellement le cron stock_lifecycle';
    return;
  end if;

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
      v_url || '/functions/v1/stock_lifecycle',
      v_secret
    )
  );
end
$$;
