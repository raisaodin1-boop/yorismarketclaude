import { supabase } from "./supabase";

export const REFERRAL_BONUS_AMOUNT = 5000; // FCFA
export const REFERRAL_CONSENT_VERSION = "v1.0-2026";

// Catégories de produits éligibles au bonus parrainage
export const REFERRAL_ELIGIBLE_CATEGORIES = [
  "electronique", "electromenager", "maison-cuisine", "mode-beaute",
  "sante-bienetre", "auto-moto", "alimentation", "bebe-enfants",
  "education", "agriculture",
];

const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sans 0/O/1/I ambigus

function generateRawCode() {
  let c = "";
  for (let i = 0; i < 6; i++) c += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  return c;
}

/**
 * Génère un code 6 caractères unique en vérifiant l'unicité en DB.
 */
async function generateUniqueCode() {
  for (let attempt = 0; attempt < 10; attempt++) {
    const code = generateRawCode();
    const { count } = await supabase
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .eq("referral_code", code);
    if (!count || count === 0) return code;
  }
  // Fallback sécurisé si collision (ultra-rare)
  return generateRawCode() + Math.floor(Math.random() * 9);
}

/**
 * Enregistre le consentement et génère le code.
 * Retourne { ok, code, error }
 */
export async function signConsentAndGetCode(userId, fullName) {
  if (!userId || !fullName?.trim()) return { ok: false, error: "Nom complet requis." };

  // Vérifier si déjà un code
  const { data: existing } = await supabase
    .from("profiles")
    .select("referral_code, referral_consent_signed_at")
    .eq("id", userId)
    .maybeSingle();

  if (existing?.referral_code) {
    return { ok: true, code: existing.referral_code, alreadyHad: true };
  }

  const code = await generateUniqueCode();

  const { error } = await supabase.from("profiles").update({
    referral_code: code,
    referral_consent_signed_at: new Date().toISOString(),
    referral_consent_fullname: fullName.trim(),
    referral_consent_version: REFERRAL_CONSENT_VERSION,
  }).eq("id", userId);

  if (error) return { ok: false, error: "Erreur lors de la sauvegarde. Réessayez." };
  return { ok: true, code };
}

/**
 * Vérifie si l'utilisateur a déjà son code de parrainage.
 */
export async function getReferralProfile(userId) {
  const { data } = await supabase
    .from("profiles")
    .select("referral_code, referral_consent_signed_at, referral_consent_fullname, referral_bonus_earned")
    .eq("id", userId)
    .maybeSingle();
  return data || {};
}

/**
 * Stats complètes de parrainage.
 */
export async function getReferralStats(userId) {
  const { data: bonuses } = await supabase
    .from("referral_bonuses")
    .select("*, referred:referred_id(nom, email, created_at)")
    .eq("referrer_id", userId)
    .order("created_at", { ascending: false });

  const list = bonuses || [];
  const totalEarned = list
    .filter((b) => b.status === "credited")
    .reduce((s, b) => s + Number(b.bonus_amount), 0);

  return {
    referrals: list,
    totalEarned,
    pendingCount: list.filter((b) => b.status === "pending").length,
    creditedCount: list.filter((b) => b.status === "credited").length,
  };
}

/**
 * Lie un nouvel utilisateur à son parrain (tous rôles acceptés).
 */
export async function applyReferralCode(referralCode, newUserId) {
  if (!referralCode || !newUserId) return { ok: false };

  const { data, error } = await supabase.rpc("apply_referral_code", {
    p_referral_code: referralCode.trim().toUpperCase(),
    p_new_user_id: newUserId,
  });

  if (error) throw error;
  return data || { ok: false };
}

/**
 * Crédite le bonus après la 1ère commande confirmée du filleul (produits éligibles).
 * Appeler après confirmCheckout() côté client.
 */
export async function creditReferralBonusIfEligible(userId, orderId) {
  if (!userId) return { ok: false, credited: false, reason: "missing_user" };

  const { data, error } = await supabase.rpc("credit_referral_bonus_if_eligible", {
    p_user_id: userId,
    p_order_id: orderId || null,
  });

  if (error) throw error;
  return data || { ok: true, credited: false };
}
