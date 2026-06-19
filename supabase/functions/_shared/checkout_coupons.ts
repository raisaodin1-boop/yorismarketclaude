type SupabaseLike = {
  from: (table: string) => any;
};

export type CheckoutCouponResult = {
  code: string;
  discountAmount: number;
  error?: string;
};

export function normalizeCouponCode(code: unknown): string {
  return String(code || "").trim().toUpperCase();
}

export function applyCheckoutDiscount(total: number, discountAmount: number): number {
  const gross = Math.max(0, Math.round(Number(total || 0)));
  const discount = Math.min(gross, Math.max(0, Math.round(Number(discountAmount || 0))));
  return gross - discount;
}

export async function validateCheckoutCoupon(
  supabase: SupabaseLike,
  {
    code,
    customerId,
    grossTotal,
  }: {
    code: unknown;
    customerId: unknown;
    grossTotal: number;
  },
): Promise<CheckoutCouponResult> {
  const normalized = normalizeCouponCode(code);
  if (!normalized) return { code: "", discountAmount: 0 };

  const userId = typeof customerId === "string" ? customerId : "";
  if (!userId) {
    return { code: normalized, discountAmount: 0, error: "Connexion requise pour utiliser ce code promo." };
  }

  const { data: coupon, error: fetchError } = await supabase
    .from("coupons")
    .select("*")
    .eq("code", normalized)
    .eq("active", true)
    .maybeSingle();

  if (fetchError || !coupon) {
    return { code: normalized, discountAmount: 0, error: "Code promo invalide ou expiré." };
  }

  if (coupon.expires_at && new Date(String(coupon.expires_at)) < new Date()) {
    return { code: normalized, discountAmount: 0, error: "Ce code promo a expiré." };
  }

  const usageLimit = coupon.usage_limit == null ? null : Number(coupon.usage_limit);
  const usageCount = Number(coupon.usage_count ?? 0);
  if (
    usageLimit !== null &&
    Number.isFinite(usageLimit) &&
    Number.isFinite(usageCount) &&
    usageCount >= usageLimit
  ) {
    return {
      code: normalized,
      discountAmount: 0,
      error: "Ce code a atteint son nombre maximum d'utilisations.",
    };
  }

  const { data: existing, error: redemptionError } = await supabase
    .from("coupon_redemptions")
    .select("id")
    .eq("coupon_code", normalized)
    .eq("user_id", userId)
    .maybeSingle();

  if (redemptionError) {
    return { code: normalized, discountAmount: 0, error: "Impossible de valider ce code promo. Réessayez." };
  }
  if (existing) {
    return { code: normalized, discountAmount: 0, error: "Vous avez déjà utilisé ce code promo." };
  }

  if (coupon.first_order_only) {
    const { count, error: orderCountError } = await supabase
      .from("orders")
      .select("id", { count: "exact", head: true })
      .eq("client_id", userId);

    if (orderCountError) {
      return { code: normalized, discountAmount: 0, error: "Impossible de valider ce code promo. Réessayez." };
    }
    if (count && count > 0) {
      return { code: normalized, discountAmount: 0, error: "Ce code est réservé à votre première commande." };
    }
  }

  const gross = Math.max(0, Math.round(Number(grossTotal || 0)));
  const rawDiscount = Math.max(0, Math.round(Number(coupon.discount_amount || 0)));
  const discountAmount = Math.min(gross, rawDiscount);
  if (discountAmount <= 0) {
    return { code: normalized, discountAmount: 0, error: "Code promo sans remise applicable." };
  }

  return { code: normalized, discountAmount };
}
