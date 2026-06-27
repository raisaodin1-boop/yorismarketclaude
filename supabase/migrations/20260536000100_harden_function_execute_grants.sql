-- Durcissement EXECUTE sur fonctions SECURITY DEFINER sensibles.
-- Révoque l'accès anon (et trigger-only pour authenticated) sans casser le flux authentifié.

do $$
declare
  fn regprocedure;
  fn_name text;
begin
  for fn, fn_name in
    select p.oid::regprocedure, p.proname
    from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public'
      and p.prosecdef = true
  loop
    -- Admin, loyalty interne, triggers : jamais via anon
    if fn_name like 'fn_admin_%'
      or fn_name like 'trg_%'
      or fn_name like 'trigger_loyalty_%'
      or fn_name in (
        'add_loyalty_points',
        'cancel_pack_purchase',
        'validate_pack_purchase',
        'create_notification',
        'notify_all_users_new_product',
        'fn_notify_admins_new_product',
        'fn_notifications_after_insert_dispatch',
        'trg_dispatch_notification',
        'clear_expired_product_promos',
        'handle_new_user',
        'create_default_notification_prefs'
      )
    then
      execute format('revoke execute on function %s from anon', fn);
    end if;

    -- Fonctions trigger-only : pas d'appel direct client
    if fn_name like 'trg_%'
      or fn_name like 'trigger_loyalty_%'
      or fn_name in (
        'fn_messages_touch_conversation',
        'fn_notifications_after_insert_dispatch',
        'trg_dispatch_notification',
        'update_conversation_last_message',
        'fn_notify_peer_chat_message',
        'fn_notify_admins_new_product',
        'notify_all_users_new_product',
        'handle_new_user',
        'create_default_notification_prefs'
      )
    then
      execute format('revoke execute on function %s from authenticated', fn);
    end if;
  end loop;
end $$;

-- Helpers admin : authenticated uniquement (contrôle interne is_platform_admin)
do $$
declare fn regprocedure;
begin
  for fn in
    select p.oid::regprocedure
    from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public'
      and p.proname in ('is_platform_admin', 'is_platform_admin_viewer', 'is_admin')
  loop
    execute format('revoke execute on function %s from anon', fn);
  end loop;
end $$;

-- Catalogue / chat : anon peut lire le site public mais pas invoquer les RPC sensibles
do $$
declare fn regprocedure;
begin
  for fn in
    select p.oid::regprocedure
    from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public'
      and p.proname in (
        'fn_delete_product',
        'insert_chat_message_safe',
        'mark_conversation_messages_read',
        'search_profiles_for_chat',
        'accepter_livraison',
        'refuser_livraison',
        'fn_create_chat_notification'
      )
  loop
    execute format('revoke execute on function %s from anon', fn);
  end loop;
end $$;
