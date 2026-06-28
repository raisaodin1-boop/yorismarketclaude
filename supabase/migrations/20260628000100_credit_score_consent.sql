-- Yorix Credit Score — consentement explicite (RGPD / usage interne marketplace)

create table if not exists public.credit_score_consents (
  user_id uuid primary key references auth.users (id) on delete cascade,
  consented_at timestamptz not null default now(),
  revoked_at timestamptz null,
  consent_version text not null default '1.0',
  updated_at timestamptz not null default now()
);

create index if not exists idx_credit_score_consents_active
  on public.credit_score_consents (user_id)
  where revoked_at is null;

alter table public.credit_score_consents enable row level security;

drop policy if exists credit_consent_user_select on public.credit_score_consents;
create policy credit_consent_user_select
  on public.credit_score_consents for select to authenticated
  using (user_id = auth.uid());

drop policy if exists credit_consent_user_upsert on public.credit_score_consents;
create policy credit_consent_user_upsert
  on public.credit_score_consents for insert to authenticated
  with check (user_id = auth.uid());

drop policy if exists credit_consent_user_update on public.credit_score_consents;
create policy credit_consent_user_update
  on public.credit_score_consents for update to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());
