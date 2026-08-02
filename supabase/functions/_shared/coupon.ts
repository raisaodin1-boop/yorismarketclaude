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

type CouponConsumeClient = {
  from: (t: string) => any;
  rpc: (fn: string, args: Record<string, unknown>) => any;
};

/**
 * Burn a coupon at confirm_checkout time (service_role).
 *
 * Why here (not the browser): CinetPay redirects away before
 * `recordCouponRedemption` runs, so limited coupons were never burned and
 * remained reusable while still discounting `checkout_intents.total`.
 *
 * Called BEFORE order inserts so a failed burn aborts confirmation instead of
 * leaving a discounted order with no redemption row.
 */
export async function consumeCouponRedemption(
  supabase: CouponConsumeClient,
  opts: {
    code: string;
    userId: string;
    orderId: string;
    expectedDiscount: number;
    cartTotal: number;
  },
): Promise<{ ok: true; discount: number } | { ok: false; reason: string }> {
  const normalizedCode = String(opts.code || "").trim().toUpperCase();
  const uid = String(opts.userId || "");
  const expectedDiscount = Math.max(0, Math.round(Number(opts.expectedDiscount) || 0));
  const cartTotal = Math.max(0, Math.round(Number(opts.cartTotal) || 0));

  if (!normalizedCode || !uid) {
    return { ok: false, reason: "missing_code_or_user" };
  }
  if (!(expectedDiscount > 0)) {
    return { ok: false, reason: "missing_discount" };
  }

  const resolved = await resolveCouponDiscount(supabase, normalizedCode, uid, cartTotal);
  if (!resolved.code || resolved.discount !== expectedDiscount) {
    return { ok: false, reason: "coupon_no_longer_valid" };
  }

  const { error: insertErr } = await supabase.from("coupon_redemptions").insert({
    coupon_code: normalizedCode,
    user_id: uid,
    order_id: opts.orderId || null,
    discount_applied: resolved.discount,
  });
  if (insertErr) {
    return { ok: false, reason: insertErr.message || "redemption_insert_failed" };
  }

  // Prefer the existing RPC when present; fall back to a direct increment so
  // usage_limit stays authoritative even if the RPC was never deployed.
  const { error: rpcErr } = await supabase.rpc("increment_coupon_usage", {
    p_code: normalizedCode,
  });
  if (rpcErr) {
    const { data: coupon, error: readErr } = await supabase
      .from("coupons")
      .select("usage_count, usage_limit")
      .eq("code", normalizedCode)
      .maybeSingle();
    if (readErr || !coupon) {
      await supabase
        .from("coupon_redemptions")
        .delete()
        .eq("coupon_code", normalizedCode)
        .eq("user_id", uid)
        .eq("order_id", opts.orderId || null);
      return { ok: false, reason: readErr?.message || "coupon_read_failed" };
    }

    const current = Number(coupon.usage_count) || 0;
    const next = current + 1;
    if (coupon.usage_limit !== null && next > Number(coupon.usage_limit)) {
      await supabase
        .from("coupon_redemptions")
        .delete()
        .eq("coupon_code", normalizedCode)
        .eq("user_id", uid)
        .eq("order_id", opts.orderId || null);
      return { ok: false, reason: "usage_limit_reached" };
    }

    const { data: updated, error: upErr } = await supabase
      .from("coupons")
      .update({ usage_count: next })
      .eq("code", normalizedCode)
      .eq("usage_count", current)
      .select("id");
    if (upErr || !updated?.length) {
      await supabase
        .from("coupon_redemptions")
        .delete()
        .eq("coupon_code", normalizedCode)
        .eq("user_id", uid)
        .eq("order_id", opts.orderId || null);
      return { ok: false, reason: upErr?.message || "usage_count_race" };
    }
  }

  return { ok: true, discount: resolved.discount };
}
