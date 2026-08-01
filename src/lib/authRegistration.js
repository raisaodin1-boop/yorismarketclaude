export const PRO_ROLES = ["seller", "provider", "delivery"];

export const PENDING_PROFILE_KEY = "yorix_pending_profile";
export const PENDING_CONTRACT_KEY = "yorix_pending_contract";
export const PENDING_ROLE_KEY = "yorix_pending_role";

export function validateIdentityFields({ nom, tel } = {}) {
  const name = String(nom || "").trim();
  const phone = String(tel || "").trim();
  if (!name || name.length < 2) {
    return "Nom obligatoire (2 caractères minimum).";
  }
  if (!phone || phone.replace(/\D/g, "").length < 9) {
    return "Téléphone obligatoire (9 chiffres minimum).";
  }
  return null;
}

export function validateRegistrationFields({ nom, email, password, tel } = {}) {
  const identityError = validateIdentityFields({ nom, tel });
  if (identityError) return identityError;
  if (!email?.trim()) return "Email obligatoire.";
  if (!password) return "Mot de passe obligatoire.";
  return null;
}

export function requiresContractAcceptance(role, contractAccepted, contractGateBypassed = false) {
  return PRO_ROLES.includes(role) && !contractAccepted && !contractGateBypassed;
}

export function resolveSignupRole(pendingRole, hasPendingContract) {
  const role = pendingRole || "buyer";
  if (PRO_ROLES.includes(role) && !hasPendingContract) {
    return "buyer";
  }
  return role;
}

export function buildContractAcceptanceRow(userId, acceptance = {}) {
  if (!userId) {
    throw new Error("user_id requis pour enregistrer l'acceptation du contrat.");
  }
  return {
    user_id: userId,
    full_name: String(acceptance.fullName || acceptance.full_name || "").trim() || "Inconnu",
    phone: String(acceptance.phone || "").trim() || "Inconnu",
    role: acceptance.role || "seller",
    contract_version: acceptance.version || acceptance.contract_version || "v1.0",
    accepted_at: acceptance.acceptedAt || acceptance.accepted_at || new Date().toISOString(),
    ip_address: acceptance.ip || acceptance.ip_address || "unknown",
    user_agent: acceptance.userAgent || acceptance.user_agent || "unknown",
    acceptance_checkbox: true,
    otp_verified: false,
    signature_type: acceptance.signature_type || "checkbox_v1",
  };
}

export function readJsonStorage(storage, key) {
  try {
    const raw = storage?.getItem?.(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function writeJsonStorage(storage, key, value) {
  storage?.setItem?.(key, JSON.stringify(value));
}

export function clearPendingSignupArtifacts(storage) {
  storage?.removeItem?.(PENDING_PROFILE_KEY);
  storage?.removeItem?.(PENDING_CONTRACT_KEY);
}
