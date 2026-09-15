/**
 * Revalidation serveur (autoritaire) d'un coupon — miroir exact des règles de
 * src/lib/couponApi.js:validateCoupon, mais exécutée avec la clé service_role
 * (contourne RLS, ne peut pas être falsifiée par le client) et clampée au
 * total réel du panier calculé côté serveur.
 *
 * Un code invalide/expiré/déjà utilisé ne bloque jamais le checkout : la
 * remise est simplement de 0 (le client a déjà fait ce contrôle en amont
 * pour l'UX ; ici on ne fait que refuser de FAIRE CONFIANCE au montant).
 */
export async function resolveCouponDiscount(
  supabase: { from: (t: string) => any },
  code: unknown,
  userId: unknown,
  cartTotal: number,
): Promise<{ code: string | null; discount: number }> {
  const normalizedCode = typeof code === "string" ? code.trim().toUpperCase() : "";
  const uid = typeof userId === "string" ? userId : "";
  if (!normalizedCode || !uid) return { code: null, discount: 0 };

  const { data: coupon } = await supabase
    .from("coupons")
    .select("*")
    .eq("code", normalizedCode)
    .eq("active", true)
    .maybeSingle();
  if (!coupon) return { code: null, discount: 0 };

  if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
    return { code: null, discount: 0 };
  }
  if (coupon.usage_limit !== null && coupon.usage_count >= coupon.usage_limit) {
    return { code: null, discount: 0 };
  }

  const { data: existing } = await supabase
    .from("coupon_redemptions")
    .select("id")
    .eq("coupon_code", normalizedCode)
    .eq("user_id", uid)
    .maybeSingle();
  if (existing) return { code: null, discount: 0 };

  if (coupon.first_order_only) {
    const { count } = await supabase
      .from("orders")
      .select("id", { count: "exact", head: true })
      .eq("client_id", uid);
    if (count && count > 0) return { code: null, discount: 0 };
  }

  const raw = Number(coupon.discount_amount) || 0;
  const discount = Math.max(0, Math.min(raw, Math.max(0, cartTotal)));
  return { code: normalizedCode, discount };
}

/**
 * Coupon used to set the payable `checkout_intents.total`.
 * Never read `coupon_discount` from the row: leftover anon INSERT/PATCH can
 * stamp a forged discount (e.g. code "FORGED", discount = subtotal) and
 * confirm_checkout previously trusted that column when charging CinetPay/MoMo.
 */
export async function trustedCheckoutCoupon(
  supabase: { from: (t: string) => any },
  intent: { coupon_code?: unknown; coupon_discount?: unknown },
  customerId: unknown,
  cartTotal: number,
): Promise<{ code: string | null; discount: number }> {
  const resolved = await resolveCouponDiscount(
    supabase,
    intent?.coupon_code,
    customerId,
    cartTotal,
  );
  return {
    code: resolved.code,
    discount: Math.max(0, Math.round(Number(resolved.discount ?? 0))),
  };
}

export function payableCheckoutTotal(catalogTotal: number, couponDiscount: number): number {
  const total = Math.max(0, Math.round(Number(catalogTotal) || 0));
  const discount = Math.max(0, Math.round(Number(couponDiscount) || 0));
  return Math.max(0, total - discount);
}
