const DRAFT_KEY = "yorix_checkout_draft_v1";

/** Normalise un numéro mobile Cameroun en 9 chiffres (sans indicatif). */
export function normalizeCmMobileDigits(raw) {
  let d = String(raw || "").replace(/\D/g, "");
  if (d.startsWith("237")) d = d.slice(3);
  if (d.length > 9) d = d.slice(-9);
  return d;
}

/** Mobile Cameroun (9 chiffres, généralement 6…). */
export function isValidCmMobile(digits) {
  return /^6\d{8}$/.test(digits || "");
}

export function composeFullAddress({ line1, quartier, ville, landmark, deliveryTag }) {
  const parts = [
    line1?.trim(),
    quartier?.trim() && `Quartier ${quartier.trim()}`,
    ville?.trim(),
    landmark?.trim() && `Repère : ${landmark.trim()}`,
    deliveryTag?.trim(),
  ].filter(Boolean);
  return parts.join(" · ").trim();
}

export function validateCheckoutAddressStep(fields) {
  const errors = {};
  const digits = normalizeCmMobileDigits(fields.phone || "");
  if (!digits) errors.phone = "Numéro de téléphone obligatoire pour la livraison et le suivi.";
  else if (!isValidCmMobile(digits)) errors.phone = "Numéro mobile invalide (9 chiffres, ex. 6XXXXXXXX).";

  const line = (fields.line1 || "").trim();
  const ville = (fields.ville || "").trim();
  const quartier = (fields.quartier || "").trim();
  const allowShort = ville.length >= 2 && quartier.length >= 2;

  if (line.length < 4 && !allowShort) {
    errors.line1 =
      "Indiquez une adresse ou une rue précise (au moins 4 caractères), ou renseignez ville + quartier.";
  }

  if (ville.length < 2) errors.ville = "La ville est obligatoire.";
  else if (/toutes/i.test(ville)) errors.ville = "Choisissez une ville précise pour la livraison.";

  return { ok: Object.keys(errors).length === 0, errors, phoneDigits: digits };
}

export function loadCheckoutDraft(userId) {
  if (!userId) return null;
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.userId !== userId || !parsed?.data) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

export function saveCheckoutDraft(userId, data) {
  if (!userId || !data) return;
  try {
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ userId, data, savedAt: Date.now() }));
  } catch {
    /* quota / navigation privée */
  }
}

export function clearCheckoutDraft() {
  try {
    sessionStorage.removeItem(DRAFT_KEY);
  } catch {
    /* ignore */
  }
}
