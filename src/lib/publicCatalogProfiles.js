/** Safe public projection of seller/buyer cards — no email, phone, or balances. */
export const PUBLIC_CATALOG_PROFILES_TABLE = "public_catalog_profiles";

export const PUBLIC_CATALOG_PROFILE_COLUMNS =
  "id, nom, role, verifie, note, nombre_avis, ville, langue, created_at, supplier_channel, referral_code, referral_consent_signed_at";
