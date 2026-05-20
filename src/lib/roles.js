/**
 * Rôles Yorix — admin complet, admin partenaire (lecture seule), affichage public.
 */

export const ROLE_ADMIN_PARTNER = "admin_partner";
export const ROLES_PUBLIC_SIGNUP = ["buyer", "seller", "delivery", "provider"];
export const ROLES_ADMIN_FULL = ["admin", "superadmin"];

/** Rôle brut stocké dans profiles.role */
export function getProfileRole(profile) {
  return profile?.role || "buyer";
}

export function isAdminFull(profile) {
  const r = getProfileRole(profile);
  return ROLES_ADMIN_FULL.includes(r);
}

/** Accès panneau admin (lecture ou écriture) */
export function isAdminViewer(profile) {
  const r = getProfileRole(profile);
  return isAdminFull(profile) || r === ROLE_ADMIN_PARTNER;
}

/** Écriture admin (RPC, mutations, attribution de rôles) */
export function canWriteAdmin(profile) {
  return isAdminFull(profile);
}

/**
 * Rôle affiché dans le header / dashboard (chip).
 * admin_partner → vendeur (invisible comme rôle staff).
 */
export function getUserRole(profile) {
  const r = getProfileRole(profile);
  if (r === "superadmin") return "admin";
  if (r === ROLE_ADMIN_PARTNER) return "seller";
  if (r === "admin") return "admin";
  const valid = [...ROLES_PUBLIC_SIGNUP, "admin"];
  if (valid.includes(r)) return r;
  return "buyer";
}

/** Libellé réservé au panneau admin (jamais sur le site public) */
export const ADMIN_ROLE_LABELS = {
  buyer: "Acheteur",
  seller: "Vendeur",
  delivery: "Livreur",
  provider: "Prestataire",
  admin: "Administrateur",
  superadmin: "Super admin",
  [ROLE_ADMIN_PARTNER]: "Admin partenaire (lecture seule)",
};
