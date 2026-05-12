/** Aligné sur src/domain/deliveryPolicy.js (sous-total produits livrables vs seuil). */

export type DeliveryPolicy = {
  freeShippingThresholdXaf: number;
  standardDeliveryFeeXaf: number;
};

export function normalizePolicyFromEnv(): DeliveryPolicy {
  const t = Number(Deno.env.get("FREE_SHIPPING_THRESHOLD_XAF"));
  const f = Number(Deno.env.get("STANDARD_DELIVERY_FEE_XAF"));
  return {
    freeShippingThresholdXaf: Number.isFinite(t) && t >= 0 ? t : 50_000,
    standardDeliveryFeeXaf: Number.isFinite(f) && f >= 0 ? f : 1500,
  };
}

export async function resolveDeliveryPolicy(
  supabase: { from: (t: string) => any },
): Promise<DeliveryPolicy> {
  const fb = normalizePolicyFromEnv();
  try {
    const { data } = (await supabase
      .from("commerce_settings")
      .select("free_shipping_threshold_xaf,standard_delivery_fee_xaf")
      .eq("id", 1)
      .maybeSingle()) as { data: Record<string, unknown> | null };
    if (!data) return fb;
    const th = Number((data as { free_shipping_threshold_xaf?: unknown }).free_shipping_threshold_xaf);
    const fee = Number((data as { standard_delivery_fee_xaf?: unknown }).standard_delivery_fee_xaf);
    return {
      freeShippingThresholdXaf: Number.isFinite(th) && th >= 0 ? th : fb.freeShippingThresholdXaf,
      standardDeliveryFeeXaf: Number.isFinite(fee) && fee >= 0 ? fee : fb.standardDeliveryFeeXaf,
    };
  } catch {
    return fb;
  }
}

type CheckoutLine = {
  kind?: string;
  price?: number;
  prix?: number;
  qty?: number;
  fulfillmentMode?: string | null;
};

function kindOf(line: CheckoutLine): string {
  return line.kind || "product";
}

function lineTotal(line: CheckoutLine): number {
  const unit = Number(line.price ?? line.prix ?? 0);
  const q = Math.max(1, Number(line.qty || 1));
  return unit * q;
}

function fulfillmentOf(line: CheckoutLine): string {
  const k = kindOf(line);
  return line.fulfillmentMode || (k === "service" ? "booking" : "delivery");
}

/** Sous-total produits hors pickup. */
export function shippableProductsSubtotal(lines: CheckoutLine[]): number {
  return (lines || []).reduce((sum, line) => {
    if (kindOf(line) !== "product") return sum;
    if (fulfillmentOf(line) === "pickup") return sum;
    return sum + lineTotal(line);
  }, 0);
}

export function computeCheckoutTotals(lines: CheckoutLine[], policy: DeliveryPolicy): {
  subtotalFull: number;
  deliveryFee: number;
  total: number;
  shippableProductsSubtotal: number;
  freeShippingUnlocked: boolean;
} {
  const subtotalFull = (lines || []).reduce((s, l) => s + lineTotal(l), 0);
  const shipSub = Math.round(shippableProductsSubtotal(lines));
  const threshold = Math.max(0, policy.freeShippingThresholdXaf);
  const fee = Math.max(0, policy.standardDeliveryFeeXaf);
  const hasShippable = shipSub > 0;
  const freeShippingUnlocked = hasShippable && shipSub >= threshold;
  const deliveryFee =
    hasShippable && !freeShippingUnlocked ? Math.round(fee) : 0;
  const total = Math.round(subtotalFull + deliveryFee);
  return {
    subtotalFull: Math.round(subtotalFull),
    deliveryFee,
    total,
    shippableProductsSubtotal: shipSub,
    freeShippingUnlocked,
  };
}
