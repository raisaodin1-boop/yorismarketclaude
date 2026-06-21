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

  const { data: referrer } = await supabase
    .from("profiles")
    .select("id")
    .eq("referral_code", referralCode.trim().toUpperCase())
    .not("referral_consent_signed_at", "is", null) // doit avoir signé le consentement
    .maybeSingle();

  if (!referrer || referrer.id === newUserId) return { ok: false };

  await supabase.from("profiles").update({ referrer_id: referrer.id }).eq("id", newUserId);

  await supabase.from("referral_bonuses").insert({
    referrer_id: referrer.id,
    referred_id: newUserId,
    bonus_amount: REFERRAL_BONUS_AMOUNT,
    status: "pending",
  }).on("conflict", { ignoreDuplicates: true }).catch(() => {});

  return { ok: true, referrerId: referrer.id };
}

/**
 * Crédite le bonus après la 1ère commande confirmée du filleul (produits éligibles).
 * Appeler après confirmCheckout() côté client.
 */
export async function creditReferralBonusIfEligible(userId, orderId) {
  if (!userId) return;

  const { data: profile } = await supabase
    .from("profiles")
    .select("referrer_id")
    .eq("id", userId)
    .maybeSingle();

  if (!profile?.referrer_id) return;

  const { data: bonus } = await supabase
    .from("referral_bonuses")
    .select("id, status")
    .eq("referred_id", userId)
    .eq("status", "pending")
    .maybeSingle();

  if (!bonus) return;

  // Vérifier que la commande contient des produits des catégories éligibles
  if (orderId) {
    const { data: orderItems } = await supabase
      .from("order_items")
      .select("categorie, parent_slug")
      .eq("order_id", orderId)
      .limit(20);

    if (orderItems && orderItems.length > 0) {
      const hasEligible = orderItems.some((item) =>
        REFERRAL_ELIGIBLE_CATEGORIES.some(
          (cat) => (item.parent_slug || item.categorie || "").toLowerCase().includes(cat)
        )
      );
      if (!hasEligible) return;
    }
  }

  // Créditer le wallet du parrain
  const { data: wallet } = await supabase
    .from("wallets")
    .select("id, solde")
    .eq("user_id", profile.referrer_id)
    .maybeSingle();

  if (wallet) {
    await supabase.from("wallets").update({
      solde: Number(wallet.solde) + REFERRAL_BONUS_AMOUNT,
      total_gagne: supabase.rpc
        ? undefined
        : Number(wallet.total_gagne || 0) + REFERRAL_BONUS_AMOUNT,
    }).eq("id", wallet.id);
  } else {
    await supabase.from("wallets").insert({
      user_id: profile.referrer_id,
      solde: REFERRAL_BONUS_AMOUNT,
      total_gagne: REFERRAL_BONUS_AMOUNT,
      devise: "FCFA",
    });
  }

  // Marquer le bonus comme crédité
  await supabase.from("referral_bonuses").update({
    status: "credited",
    order_id: orderId || null,
    credited_at: new Date().toISOString(),
  }).eq("id", bonus.id);

  // Notification au parrain
  await supabase.from("notifications").insert({
    user_id: profile.referrer_id,
    type: "referral_bonus",
    title: "🎉 Bonus parrainage débloqué !",
    message: `Votre filleul vient de passer sa première commande. +${REFERRAL_BONUS_AMOUNT.toLocaleString("fr-FR")} FCFA crédités sur votre wallet Yorix.`,
    link: "/dashboard",
    priority: "high",
    category: "referral",
    lu: false,
  }).catch(() => {});
}
