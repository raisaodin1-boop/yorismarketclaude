-- KYC vendeur : table seller_kyc + politiques RLS (soumission dashboard vendeur)

create table if not exists public.seller_kyc (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  full_name text,
  birth_date date,
  birth_place text,
  cni_number text,
  cni_expiry date,
  phone text,
  email text,
  whatsapp text,
  seller_type text not null default 'particulier',
  company_name text,
  rccm text,
  country text default 'Cameroun',
  city text,
  quartier text,
  address text,
  declaration boolean not null default false,
  doc_url text,
  doc_url2 text,
  selfie_url text,
  shop_photo_url text,
  status text not null default 'draft',
  kyc_level text default 'lite',
  submitted_at timestamptz,
  reviewed_at timestamptz,
  reviewer_id uuid references auth.users (id) on delete set null,
  reviewer_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_seller_kyc_status_submitted
  on public.seller_kyc (status, submitted_at desc nulls last);

create index if not exists idx_seller_kyc_user
  on public.seller_kyc (user_id);

alter table public.seller_kyc enable row level security;

drop policy if exists seller_kyc_select_own on public.seller_kyc;
create policy seller_kyc_select_own
  on public.seller_kyc for select to authenticated
  using (user_id = auth.uid() or public.is_platform_admin_viewer());

drop policy if exists seller_kyc_insert_own on public.seller_kyc;
create policy seller_kyc_insert_own
  on public.seller_kyc for insert to authenticated
  with check (user_id = auth.uid());

drop policy if exists seller_kyc_update_own on public.seller_kyc;
create policy seller_kyc_update_own
  on public.seller_kyc for update to authenticated
  using (user_id = auth.uid() or public.is_platform_admin())
  with check (user_id = auth.uid() or public.is_platform_admin());
