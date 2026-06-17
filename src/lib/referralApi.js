import { supabase } from "./supabase";

const REFERRAL_BONUS_AMOUNT = 5000; // FCFA

/**
 * Génère un code de parrainage unique pour un vendeur.
 * Format : PRENOM4-IDSLICE (ex: JEAN-A3F8B2)
 */
export function buildReferralCode(nom, userId) {
  const slug = String(nom || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z]/g, "")
    .toUpperCase()
    .slice(0, 5) || "YORIX";
  const idSlice = String(userId || "").replace(/-/g, "").slice(0, 6).toUpperCase();
  return `${slug}-${idSlice}`;
}

/**
 * Récupère ou crée le code de parrainage d'un vendeur.
 */
export async function getOrCreateReferralCode(userId, nom) {
  const { data: profile } = await supabase
    .from("profiles")
    .select("referral_code")
    .eq("id", userId)
    .maybeSingle();

  if (profile?.referral_code) return profile.referral_code;

  const code = buildReferralCode(nom, userId);
  await supabase
    .from("profiles")
    .update({ referral_code: code })
    .eq("id", userId);

  return code;
}

/**
 * Récupère les stats de parrainage d'un vendeur.
 * Retourne { referrals: [], totalEarned, pendingCount, creditedCount }
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
  const pendingCount = list.filter((b) => b.status === "pending").length;
  const creditedCount = list.filter((b) => b.status === "credited").length;

  return { referrals: list, totalEarned, pendingCount, creditedCount };
}

/**
 * Lie un nouvel utilisateur à son parrain via le code de parrainage.
 * À appeler à l'inscription si un code ref est présent dans l'URL.
 */
export async function applyReferralCode(referralCode, newUserId) {
  if (!referralCode || !newUserId) return { ok: false };

  const { data: referrer } = await supabase
    .from("profiles")
    .select("id")
    .eq("referral_code", referralCode.trim().toUpperCase())
    .eq("role", "seller")
    .maybeSingle();

  if (!referrer || referrer.id === newUserId) return { ok: false };

  await supabase
    .from("profiles")
    .update({ referrer_id: referrer.id })
    .eq("id", newUserId);

  await supabase.from("referral_bonuses").insert({
    referrer_id: referrer.id,
    referred_id: newUserId,
    bonus_amount: REFERRAL_BONUS_AMOUNT,
    status: "pending",
  }).onConflict("referred_id").ignore();

  return { ok: true, referrerId: referrer.id };
}

/**
 * Crédite le bonus de parrainage au parrain après la 1ère commande du filleul.
 * À appeler après confirmCheckout() si l'utilisateur a un referrer_id.
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

  // Créditer le bonus sur le wallet du parrain
  await supabase.rpc("add_wallet_credit", {
    p_user_id: profile.referrer_id,
    p_amount: REFERRAL_BONUS_AMOUNT,
  }).catch(() => {
    // Si RPC absente, update direct
    supabase
      .from("wallets")
      .upsert({ user_id: profile.referrer_id, solde: REFERRAL_BONUS_AMOUNT }, { onConflict: "user_id", ignoreDuplicates: false })
      .then(({ data: existing }) => {
        if (existing) {
          supabase
            .from("wallets")
            .update({ solde: supabase.raw("solde + ?", [REFERRAL_BONUS_AMOUNT]) })
            .eq("user_id", profile.referrer_id);
        }
      });
  });

  // Mettre à jour le statut du bonus
  await supabase
    .from("referral_bonuses")
    .update({ status: "credited", order_id: orderId || null, credited_at: new Date().toISOString() })
    .eq("id", bonus.id);

  // Mettre à jour le total gagné sur le profil du parrain
  await supabase
    .from("profiles")
    .update({ referral_bonus_earned: supabase.rpc ? undefined : REFERRAL_BONUS_AMOUNT })
    .eq("id", profile.referrer_id);

  // Notifier le parrain
  await supabase.from("notifications").insert({
    user_id: profile.referrer_id,
    type: "referral_bonus",
    title: "🎉 Bonus parrainage débloqué !",
    message: `Votre filleul vient de passer sa première commande. +${REFERRAL_BONUS_AMOUNT.toLocaleString("fr-FR")} FCFA crédités sur votre wallet Yorix.`,
    link: "/dashboard",
    priority: "important",
    category: "referral",
    lu: false,
  });
}
