-- Lock down sensitive tables that must never be readable with the anon key.
-- This migration intentionally removes legacy permissive policies before
-- recreating authenticated, owner/admin-scoped policies.

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

do $$
declare
  t text;
  p record;
  sensitive_tables text[] := array[
    'profiles',
    'wallets',
    'orders',
    'order_items',
    'checkout_intents',
    'service_bookings',
    'payment_transactions',
    'wallet_transactions',
    'deliveries',
    'delivery_logs',
    'notifications',
    'notification_preferences',
    'notification_delivery_log',
    'push_subscriptions',
    'conversations',
    'messages',
    'fraud_logs',
    'user_contract_acceptance'
  ];
begin
  foreach t in array sensitive_tables loop
    if to_regclass(format('public.%I', t)) is not null then
      execute format('alter table public.%I enable row level security', t);
      execute format('alter table public.%I force row level security', t);
      execute format('revoke all on table public.%I from anon', t);
      execute format('revoke all on table public.%I from public', t);

      for p in
        select policyname
        from pg_policies
        where schemaname = 'public'
          and tablename = t
      loop
        execute format('drop policy if exists %I on public.%I', p.policyname, t);
      end loop;
    end if;
  end loop;
end $$;

do $$
begin
  if to_regclass('public.profiles') is not null then
    grant select, insert, update on public.profiles to authenticated;

    create policy profiles_select_self_or_admin
      on public.profiles for select to authenticated
      using (id = auth.uid() or public.is_platform_admin());

    create policy profiles_insert_self
      on public.profiles for insert to authenticated
      with check (
        id = auth.uid()
        and coalesce(role, 'buyer') in ('buyer', 'seller', 'provider', 'delivery')
      );

    create policy profiles_update_self_or_admin
      on public.profiles for update to authenticated
      using (id = auth.uid() or public.is_platform_admin())
      with check (
        public.is_platform_admin()
        or (
          id = auth.uid()
          and coalesce(role, 'buyer') in ('buyer', 'seller', 'provider', 'delivery')
        )
      );
  end if;
end $$;

do $$
begin
  if to_regclass('public.wallets') is not null then
    grant select, insert, update on public.wallets to authenticated;

    create policy wallets_select_owner_or_admin
      on public.wallets for select to authenticated
      using (user_id = auth.uid() or public.is_platform_admin());

    create policy wallets_insert_owner
      on public.wallets for insert to authenticated
      with check (user_id = auth.uid());

    create policy wallets_update_admin_only
      on public.wallets for update to authenticated
      using (public.is_platform_admin())
      with check (public.is_platform_admin());
  end if;
end $$;

do $$
begin
  if to_regclass('public.orders') is not null then
    grant select, insert, update on public.orders to authenticated;

    create policy orders_select_related_or_admin
      on public.orders for select to authenticated
      using (
        client_id = auth.uid()
        or vendeur_id = auth.uid()
        or livreur_id = auth.uid()
        or public.is_platform_admin()
      );

    create policy orders_insert_buyer_pending_only
      on public.orders for insert to authenticated
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

    create policy orders_update_related_guarded
      on public.orders for update to authenticated
      using (
        public.is_platform_admin()
        or vendeur_id = auth.uid()
        or livreur_id = auth.uid()
      )
      with check (
        public.is_platform_admin()
        or (
          (vendeur_id = auth.uid() or livreur_id = auth.uid())
          and coalesce(status, 'pending') in ('pending', 'validee', 'livre', 'annulee', 'shipped', 'delivered')
          and coalesce(livraison_status, 'pending') in ('pending', 'pending_pickup', 'preparation', 'collecte', 'en_route', 'livre', 'shipped', 'delivered')
          and coalesce(escrow_status, 'pending') in ('pending', 'securise', 'libere', 'rembourse')
          and coalesce(payment_status, 'pending') in ('pending', 'cod_pending', 'paid', 'failed')
        )
      );
  end if;
end $$;

do $$
begin
  if to_regclass('public.deliveries') is not null then
    grant select, insert, update on public.deliveries to authenticated;

    create policy deliveries_select_related_or_admin
      on public.deliveries for select to authenticated
      using (
        client_id = auth.uid()
        or livreur_id = auth.uid()
        or public.is_platform_admin()
        or exists (
          select 1
          from public.orders o
          where o.id::text = deliveries.order_id::text
            and (o.client_id = auth.uid() or o.vendeur_id = auth.uid())
        )
      );

    create policy deliveries_insert_authenticated_owner_or_admin
      on public.deliveries for insert to authenticated
      with check (
        public.is_platform_admin()
        or client_id = auth.uid()
        or livreur_id = auth.uid()
      );

    create policy deliveries_update_related_or_admin
      on public.deliveries for update to authenticated
      using (
        public.is_platform_admin()
        or client_id = auth.uid()
        or livreur_id = auth.uid()
      )
      with check (
        public.is_platform_admin()
        or client_id = auth.uid()
        or livreur_id = auth.uid()
      );
  end if;
end $$;

do $$
begin
  if to_regclass('public.order_items') is not null then
    grant select on public.order_items to authenticated;

    create policy order_items_select_related_or_admin
      on public.order_items for select to authenticated
      using (
        exists (
          select 1
          from public.orders o
          where o.id = order_items.order_id
            and (
              o.client_id = auth.uid()
              or o.vendeur_id = auth.uid()
              or o.livreur_id = auth.uid()
              or public.is_platform_admin()
            )
        )
      );
  end if;
end $$;

do $$
begin
  if to_regclass('public.checkout_intents') is not null then
    grant select, update on public.checkout_intents to authenticated;

    create policy checkout_intents_select_owner_or_admin
      on public.checkout_intents for select to authenticated
      using (customer_id = auth.uid() or public.is_platform_admin());

    create policy checkout_intents_update_admin_only
      on public.checkout_intents for update to authenticated
      using (public.is_platform_admin())
      with check (public.is_platform_admin());
  end if;
end $$;

do $$
begin
  if to_regclass('public.service_bookings') is not null then
    grant select, insert, update on public.service_bookings to authenticated;

    create policy service_bookings_select_related_or_admin
      on public.service_bookings for select to authenticated
      using (client_id = auth.uid() or provider_id = auth.uid() or public.is_platform_admin());

    create policy service_bookings_insert_client_or_admin
      on public.service_bookings for insert to authenticated
      with check (client_id = auth.uid() or public.is_platform_admin());

    create policy service_bookings_update_related_or_admin
      on public.service_bookings for update to authenticated
      using (client_id = auth.uid() or provider_id = auth.uid() or public.is_platform_admin())
      with check (client_id = auth.uid() or provider_id = auth.uid() or public.is_platform_admin());
  end if;
end $$;

do $$
begin
  if to_regclass('public.payment_transactions') is not null then
    grant select on public.payment_transactions to authenticated;

    create policy payment_transactions_select_admin_or_related_client
      on public.payment_transactions for select to authenticated
      using (
        public.is_platform_admin()
        or exists (
          select 1
          from public.orders o
          where o.order_group_id = payment_transactions.order_group_id
            and o.client_id = auth.uid()
        )
      );
  end if;
end $$;

do $$
begin
  if to_regclass('public.wallet_transactions') is not null then
    grant select on public.wallet_transactions to authenticated;

    create policy wallet_transactions_select_owner_or_admin
      on public.wallet_transactions for select to authenticated
      using (user_id = auth.uid() or public.is_platform_admin());
  end if;
end $$;

do $$
begin
  if to_regclass('public.notifications') is not null then
    grant select, insert, update, delete on public.notifications to authenticated;

    create policy notifications_select_owner_or_admin
      on public.notifications for select to authenticated
      using (user_id = auth.uid() or public.is_platform_admin());

    create policy notifications_insert_owner_or_admin
      on public.notifications for insert to authenticated
      with check (user_id = auth.uid() or public.is_platform_admin());

    create policy notifications_update_owner_or_admin
      on public.notifications for update to authenticated
      using (user_id = auth.uid() or public.is_platform_admin())
      with check (user_id = auth.uid() or public.is_platform_admin());

    create policy notifications_delete_owner_or_admin
      on public.notifications for delete to authenticated
      using (user_id = auth.uid() or public.is_platform_admin());
  end if;
end $$;

do $$
begin
  if to_regclass('public.notification_preferences') is not null then
    grant select, insert, update on public.notification_preferences to authenticated;

    create policy notification_preferences_select_own
      on public.notification_preferences for select to authenticated
      using (auth.uid() = user_id);

    create policy notification_preferences_insert_own
      on public.notification_preferences for insert to authenticated
      with check (auth.uid() = user_id);

    create policy notification_preferences_update_own
      on public.notification_preferences for update to authenticated
      using (auth.uid() = user_id)
      with check (auth.uid() = user_id);
  end if;
end $$;

do $$
begin
  if to_regclass('public.push_subscriptions') is not null then
    grant select, insert, update, delete on public.push_subscriptions to authenticated;

    create policy push_subscriptions_owner_or_admin_select
      on public.push_subscriptions for select to authenticated
      using (user_id = auth.uid() or public.is_platform_admin());

    create policy push_subscriptions_owner_insert
      on public.push_subscriptions for insert to authenticated
      with check (user_id = auth.uid());

    create policy push_subscriptions_owner_or_admin_update
      on public.push_subscriptions for update to authenticated
      using (user_id = auth.uid() or public.is_platform_admin())
      with check (user_id = auth.uid() or public.is_platform_admin());

    create policy push_subscriptions_owner_or_admin_delete
      on public.push_subscriptions for delete to authenticated
      using (user_id = auth.uid() or public.is_platform_admin());
  end if;
end $$;

do $$
begin
  if to_regclass('public.conversations') is not null then
    grant select, insert, update on public.conversations to authenticated;

    create policy conversations_select_participant_or_admin
      on public.conversations for select to authenticated
      using (
        public.is_platform_admin()
        or to_jsonb(conversations)->>'user1_id' = auth.uid()::text
        or to_jsonb(conversations)->>'user2_id' = auth.uid()::text
      );

    create policy conversations_insert_participant
      on public.conversations for insert to authenticated
      with check (
        to_jsonb(conversations)->>'user1_id' = auth.uid()::text
        or to_jsonb(conversations)->>'user2_id' = auth.uid()::text
      );

    create policy conversations_update_participant_or_admin
      on public.conversations for update to authenticated
      using (
        public.is_platform_admin()
        or to_jsonb(conversations)->>'user1_id' = auth.uid()::text
        or to_jsonb(conversations)->>'user2_id' = auth.uid()::text
      )
      with check (
        public.is_platform_admin()
        or to_jsonb(conversations)->>'user1_id' = auth.uid()::text
        or to_jsonb(conversations)->>'user2_id' = auth.uid()::text
      );
  end if;
end $$;

do $$
begin
  if to_regclass('public.messages') is not null then
    grant select, insert, update on public.messages to authenticated;

    create policy messages_select_participant_or_admin
      on public.messages for select to authenticated
      using (
        public.is_platform_admin()
        or to_jsonb(messages)->>'sender_id' = auth.uid()::text
        or to_jsonb(messages)->>'expediteur_id' = auth.uid()::text
        or exists (
          select 1
          from public.conversations c
          where c.id::text = to_jsonb(messages)->>'conversation_id'
            and (
              to_jsonb(c)->>'user1_id' = auth.uid()::text
              or to_jsonb(c)->>'user2_id' = auth.uid()::text
            )
        )
      );

    create policy messages_insert_sender
      on public.messages for insert to authenticated
      with check (
        to_jsonb(messages)->>'sender_id' = auth.uid()::text
        or to_jsonb(messages)->>'expediteur_id' = auth.uid()::text
      );

    create policy messages_update_sender_or_admin
      on public.messages for update to authenticated
      using (
        public.is_platform_admin()
        or to_jsonb(messages)->>'sender_id' = auth.uid()::text
        or to_jsonb(messages)->>'expediteur_id' = auth.uid()::text
      )
      with check (
        public.is_platform_admin()
        or to_jsonb(messages)->>'sender_id' = auth.uid()::text
        or to_jsonb(messages)->>'expediteur_id' = auth.uid()::text
      );
  end if;
end $$;

do $$
begin
  if to_regclass('public.delivery_logs') is not null then
    grant select, insert on public.delivery_logs to authenticated;

    create policy delivery_logs_select_related_or_admin
      on public.delivery_logs for select to authenticated
      using (
        public.is_platform_admin()
        or acteur_id = auth.uid()
        or exists (
          select 1
          from public.deliveries d
          where d.id::text = delivery_logs.delivery_id::text
            and (d.client_id = auth.uid() or d.livreur_id = auth.uid())
        )
      );

    create policy delivery_logs_insert_actor_or_admin
      on public.delivery_logs for insert to authenticated
      with check (acteur_id = auth.uid() or public.is_platform_admin());
  end if;
end $$;

do $$
begin
  if to_regclass('public.fraud_logs') is not null then
    grant select, insert on public.fraud_logs to authenticated;

    create policy fraud_logs_insert_self
      on public.fraud_logs for insert to authenticated
      with check (user_id = auth.uid());

    create policy fraud_logs_select_admin_only
      on public.fraud_logs for select to authenticated
      using (public.is_platform_admin());
  end if;
end $$;

do $$
begin
  if to_regclass('public.user_contract_acceptance') is not null then
    grant select, insert on public.user_contract_acceptance to authenticated;

    create policy user_contract_acceptance_select_self_or_admin
      on public.user_contract_acceptance for select to authenticated
      using (user_id = auth.uid() or public.is_platform_admin());

    create policy user_contract_acceptance_insert_self
      on public.user_contract_acceptance for insert to authenticated
      with check (user_id = auth.uid());
  end if;
end $$;

do $$
begin
  if to_regclass('public.notification_delivery_log') is not null then
    grant select on public.notification_delivery_log to authenticated;

    create policy notification_delivery_log_select_admin_only
      on public.notification_delivery_log for select to authenticated
      using (public.is_platform_admin());
  end if;
end $$;
