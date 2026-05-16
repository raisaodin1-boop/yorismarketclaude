-- Réinitialise les produits marqués Made in Cameroun par erreur (sync legacy local → auto).
-- Conserve uniquement declared / verified explicites.

update public.products
set
  local = false,
  is_made_in_cameroon = false,
  made_in_cameroon_status = 'imported',
  country_of_origin = coalesce(country_of_origin, 'CM')
where made_in_cameroon_status = 'auto'
  and made_in_cameroon_verified_at is null
  and coalesce(local_brand_name, '') = '';
