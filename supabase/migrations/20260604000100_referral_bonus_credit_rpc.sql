-- Server-side referral bonus crediting.
--
-- The checkout client runs as the referred buyer, but wallet rows are intentionally
-- admin-only for updates. Keep the financial mutation in one SECURITY DEFINER RPC
-- so RLS stays strict and duplicate checkout callbacks cannot double-credit.

create extension if not exists pgcrypto;

alter table if exists public.profiles
  add column if not exists referral_code text,
  add column if not exists referral_consent_signed_at timestamptz,
  add column if not exists referral_consent_fullname text,
  add column if not exists referral_consent_version text,
  add column if not exists referral_bonus_earned numeric(14,2) not null default 0,
  add column if not exists referrer_id uuid references public.profiles(id) on delete set null;

create unique index if not exists idx_profiles_referral_code_unique
  on public.profiles (referral_code)
  where referral_code is not null;

create index if not exists idx_profiles_referrer_id
  on public.profiles (referrer_id)
  where referrer_id is not null;

create table if not exists public.referral_bonuses (
  id uuid primary key default gen_random_uuid(),
  referrer_id uuid not null references public.profiles(id) on delete cascade,
  referred_id uuid not null references public.profiles(id) on delete cascade,
  bonus_amount numeric(14,2) not null default 5000,
  status text not null default 'pending' check (status in ('pending', 'credited', 'cancelled')),
  order_id text,
  credited_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists idx_referral_bonuses_referred_unique
  on public.referral_bonuses (referred_id);

create index if not exists idx_referral_bonuses_referrer_created
  on public.referral_bonuses (referrer_id, created_at desc);

alter table public.referral_bonuses enable row level security;

drop policy if exists referral_bonuses_select_related_or_admin on public.referral_bonuses;
create policy referral_bonuses_select_related_or_admin
on public.referral_bonuses
for select
to authenticated
using (
  referrer_id = auth.uid()
  or referred_id = auth.uid()
  or public.is_platform_admin()
);

drop policy if exists referral_bonuses_insert_referred_self on public.referral_bonuses;
drop policy if exists referral_bonuses_insert_admin_only on public.referral_bonuses;
create policy referral_bonuses_insert_admin_only
on public.referral_bonuses
for insert
to authenticated
with check (public.is_platform_admin());

drop policy if exists referral_bonuses_update_admin_only on public.referral_bonuses;
create policy referral_bonuses_update_admin_only
on public.referral_bonuses
for update
to authenticated
using (public.is_platform_admin())
with check (public.is_platform_admin());

create table if not exists public.wallets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  solde numeric(14,2) not null default 0,
  total_gagne numeric(14,2) not null default 0,
  devise text not null default 'FCFA',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.wallets
  add column if not exists total_gagne numeric(14,2) not null default 0,
  add column if not exists devise text not null default 'FCFA';

create index if not exists idx_wallets_user_id
  on public.wallets (user_id);

alter table public.wallets enable row level security;

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

create or replace function public.apply_referral_code(
  p_referral_code text,
  p_new_user_id uuid
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_referrer_id uuid;
  v_existing_referrer_id uuid;
  v_bonus_id uuid;
begin
  if auth.uid() is null then
    raise exception 'Authentication required' using errcode = '28000';
  end if;

  if p_new_user_id is null then
    return jsonb_build_object('ok', false, 'reason', 'missing_user');
  end if;

  if p_new_user_id <> auth.uid() and not public.is_platform_admin() then
    raise exception 'Cannot apply referral code for another user' using errcode = '42501';
  end if;

  if p_referral_code is null or btrim(p_referral_code) = '' then
    return jsonb_build_object('ok', false, 'reason', 'missing_code');
  end if;

  select p.id
    into v_referrer_id
    from public.profiles p
   where p.referral_code = upper(btrim(p_referral_code))
     and p.referral_consent_signed_at is not null
   limit 1;

  if v_referrer_id is null then
    return jsonb_build_object('ok', false, 'reason', 'invalid_code');
  end if;

  if v_referrer_id = p_new_user_id then
    return jsonb_build_object('ok', false, 'reason', 'self_referral');
  end if;

  select p.referrer_id
    into v_existing_referrer_id
    from public.profiles p
   where p.id = p_new_user_id
   for update;

  if not found then
    return jsonb_build_object('ok', false, 'reason', 'profile_not_found');
  end if;

  if v_existing_referrer_id is not null and v_existing_referrer_id <> v_referrer_id then
    return jsonb_build_object('ok', false, 'reason', 'already_referred');
  end if;

  update public.profiles
     set referrer_id = v_referrer_id
   where id = p_new_user_id
     and referrer_id is null;

  insert into public.referral_bonuses (
    referrer_id,
    referred_id,
    bonus_amount,
    status
  )
  values (
    v_referrer_id,
    p_new_user_id,
    5000,
    'pending'
  )
  on conflict (referred_id) do nothing
  returning id into v_bonus_id;

  if v_bonus_id is null then
    select b.id
      into v_bonus_id
      from public.referral_bonuses b
     where b.referred_id = p_new_user_id
     limit 1;
  end if;

  return jsonb_build_object(
    'ok', true,
    'referrerId', v_referrer_id,
    'bonusId', v_bonus_id
  );
end;
$$;

create or replace function public.credit_referral_bonus_if_eligible(
  p_user_id uuid,
  p_order_id text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_referrer_id uuid;
  v_bonus_id uuid;
  v_bonus_amount numeric(14,2);
  v_order_ids uuid[];
  v_has_eligible boolean := true;
  v_wallet_id uuid;
begin
  if auth.uid() is null then
    raise exception 'Authentication required' using errcode = '28000';
  end if;

  if p_user_id is null then
    return jsonb_build_object('ok', false, 'credited', false, 'reason', 'missing_user');
  end if;

  if p_user_id <> auth.uid() and not public.is_platform_admin() then
    raise exception 'Cannot credit referral bonus for another user' using errcode = '42501';
  end if;

  select p.referrer_id
    into v_referrer_id
    from public.profiles p
   where p.id = p_user_id;

  if v_referrer_id is null or v_referrer_id = p_user_id then
    return jsonb_build_object('ok', true, 'credited', false, 'reason', 'no_referrer');
  end if;

  select b.id, 5000::numeric(14,2)
    into v_bonus_id, v_bonus_amount
    from public.referral_bonuses b
   where b.referred_id = p_user_id
     and b.referrer_id = v_referrer_id
     and b.status = 'pending'
   order by b.created_at asc
   limit 1
   for update;

  if v_bonus_id is null then
    return jsonb_build_object('ok', true, 'credited', false, 'reason', 'no_pending_bonus');
  end if;

  if p_order_id is not null and btrim(p_order_id) <> '' then
    if p_order_id ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' then
      select coalesce(array_agg(o.id), array[]::uuid[])
        into v_order_ids
        from public.orders o
       where o.id = p_order_id::uuid
          or o.order_group_id = p_order_id;
    else
      select coalesce(array_agg(o.id), array[]::uuid[])
        into v_order_ids
        from public.orders o
       where o.order_group_id = p_order_id;
    end if;

    if coalesce(array_length(v_order_ids, 1), 0) = 0 then
      return jsonb_build_object('ok', true, 'credited', false, 'reason', 'order_not_found');
    end if;

    with eligible_patterns(pattern) as (
      values
        ('%lectronique%'),
        ('%lectromenager%'),
        ('%maison%'),
        ('%cuisine%'),
        ('%mode%'),
        ('%beaut%'),
        ('%sant%'),
        ('%bien%'),
        ('%auto%'),
        ('%automobile%'),
        ('%moto%'),
        ('%alimentation%'),
        ('%bebe%'),
        ('%enfant%'),
        ('%education%'),
        ('%agriculture%')
    )
    select exists (
      select 1
        from public.order_items oi
        join public.products p on p.id = oi.product_id
        left join public.marketplace_categories c on c.id = p.category_id
        left join public.marketplace_categories parent_c on parent_c.id = c.parent_id
        join eligible_patterns ep on (
          lower(coalesce(p.categorie, '')) like ep.pattern
          or lower(coalesce(c.slug, '')) like ep.pattern
          or lower(coalesce(c.name_fr, '')) like ep.pattern
          or lower(coalesce(c.name_en, '')) like ep.pattern
          or lower(coalesce(parent_c.slug, '')) like ep.pattern
          or lower(coalesce(parent_c.name_fr, '')) like ep.pattern
          or lower(coalesce(parent_c.name_en, '')) like ep.pattern
        )
       where oi.order_id = any(v_order_ids)
         and coalesce(oi.item_kind, 'product') = 'product'
         and oi.product_id is not null
    )
      into v_has_eligible;

    if not v_has_eligible then
      return jsonb_build_object('ok', true, 'credited', false, 'reason', 'ineligible_order');
    end if;
  end if;

  -- Serialize wallet creation/update per referrer even if the legacy wallets table
  -- does not yet enforce a unique user_id constraint.
  perform pg_advisory_xact_lock(hashtext(v_referrer_id::text)::bigint);

  select w.id
    into v_wallet_id
    from public.wallets w
   where w.user_id = v_referrer_id
   limit 1
   for update;

  if v_wallet_id is null then
    insert into public.wallets (user_id, solde, total_gagne, devise)
    values (v_referrer_id, v_bonus_amount, v_bonus_amount, 'FCFA');
  else
    update public.wallets
       set solde = coalesce(solde, 0) + v_bonus_amount,
           total_gagne = coalesce(total_gagne, 0) + v_bonus_amount
     where id = v_wallet_id;
  end if;

  update public.referral_bonuses
     set status = 'credited',
         bonus_amount = v_bonus_amount,
         order_id = nullif(btrim(coalesce(p_order_id, '')), ''),
         credited_at = now(),
         updated_at = now()
   where id = v_bonus_id;

  update public.profiles
     set referral_bonus_earned = coalesce(referral_bonus_earned, 0) + v_bonus_amount
   where id = v_referrer_id;

  insert into public.notifications (
    user_id,
    type,
    title,
    message,
    link,
    priority,
    category,
    lu
  )
  values (
    v_referrer_id,
    'referral_bonus',
    'Bonus parrainage debloque',
    'Votre filleul vient de passer sa premiere commande eligible. +' || v_bonus_amount::text || ' FCFA credites sur votre wallet Yorix.',
    '/dashboard',
    'important',
    'referral',
    false
  );

  return jsonb_build_object(
    'ok', true,
    'credited', true,
    'bonusId', v_bonus_id,
    'referrerId', v_referrer_id,
    'amount', v_bonus_amount
  );
end;
$$;

revoke all on function public.apply_referral_code(text, uuid) from public;
revoke all on function public.apply_referral_code(text, uuid) from anon;
grant execute on function public.apply_referral_code(text, uuid) to authenticated;

revoke all on function public.credit_referral_bonus_if_eligible(uuid, text) from public;
revoke all on function public.credit_referral_bonus_if_eligible(uuid, text) from anon;
grant execute on function public.credit_referral_bonus_if_eligible(uuid, text) to authenticated;

comment on function public.apply_referral_code(text, uuid) is
  'Links the authenticated new user to a consenting referrer and creates the pending referral bonus.';

comment on function public.credit_referral_bonus_if_eligible(uuid, text) is
  'Credits one pending referral bonus for the authenticated referred user after an eligible first checkout.';
