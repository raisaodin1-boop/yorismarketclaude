-- Catalogue statique des catégories éligibles au parrainage.
-- Lecture publique ; écriture réservée au service_role (dashboard / migrations).
alter table public.referral_eligible_categories enable row level security;

drop policy if exists "referral_eligible_categories_select_public"
  on public.referral_eligible_categories;
create policy "referral_eligible_categories_select_public"
  on public.referral_eligible_categories for select
  using (true);
