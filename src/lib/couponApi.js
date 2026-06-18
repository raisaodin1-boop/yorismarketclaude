import { supabase } from "./supabase";

/**
 * Valide un code coupon pour un utilisateur.
 * Retourne { ok, discount, coupon, error }
 */
export async function validateCoupon(code, userId) {
  if (!code || !userId) return { ok: false, error: "Code ou utilisateur manquant." };

  const normalizedCode = String(code).trim().toUpperCase();

  const { data: coupon, error: fetchError } = await supabase
    .from("coupons")
    .select("*")
    .eq("code", normalizedCode)
    .eq("active", true)
    .maybeSingle();

  if (fetchError || !coupon) {
    return { ok: false, error: "Code promo invalide ou expiré." };
  }

  if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
    return { ok: false, error: "Ce code promo a expiré." };
  }

  if (coupon.usage_limit !== null && coupon.usage_count >= coupon.usage_limit) {
    return { ok: false, error: "Ce code a atteint son nombre maximum d'utilisations." };
  }

  // Vérifier si l'utilisateur a déjà utilisé ce coupon
  const { data: existing, error: redemptionError } = await supabase
    .from("coupon_redemptions")
    .select("id")
    .eq("coupon_code", normalizedCode)
    .eq("user_id", userId)
    .maybeSingle();

  if (redemptionError) {
    return { ok: false, error: "Impossible de valider ce code promo pour le moment." };
  }

  if (existing) {
    return { ok: false, error: "Vous avez déjà utilisé ce code promo." };
  }

  // Vérifier si c'est bien la 1ère commande
  if (coupon.first_order_only) {
    const { count, error: ordersError } = await supabase
      .from("orders")
      .select("id", { count: "exact", head: true })
      .eq("client_id", userId);

    if (ordersError) {
      return { ok: false, error: "Impossible de vérifier l'éligibilité du code promo." };
    }

    if (count && count > 0) {
      return { ok: false, error: "Ce code est réservé à votre première commande." };
    }
  }

  return { ok: true, discount: Number(coupon.discount_amount), coupon };
}

/**
 * Enregistre l'utilisation d'un coupon après une commande réussie.
 */
export async function recordCouponRedemption(code, userId, orderId, discountApplied) {
  const normalizedCode = String(code).trim().toUpperCase();

  const { error } = await supabase.from("coupon_redemptions").insert({
    coupon_code: normalizedCode,
    user_id: userId,
    order_id: orderId || null,
    discount_applied: Number(discountApplied),
  });

  if (!error) {
    // Incrémenter le compteur d'utilisation
    await supabase.rpc("increment_coupon_usage", { p_code: normalizedCode }).catch(() => {
      // RPC optionnelle — pas bloquant
    });
  }

  return { ok: !error };
}
