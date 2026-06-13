export type CheckoutLine = {
  id?: unknown;
  kind?: unknown;
  qty?: unknown;
};

export type ProductStockReservation = {
  product_id: string;
  qty: number;
};

export function collectProductStockReservations(items: CheckoutLine[]): ProductStockReservation[] {
  const byProduct = new Map<string, number>();

  for (const item of items) {
    if (String(item.kind || "product") !== "product") continue;

    const productId = String(item.id ?? "").trim();
    if (!productId) continue;

    const parsedQty = Number(item.qty || 1);
    const qty = Number.isFinite(parsedQty) ? Math.max(1, Math.trunc(parsedQty)) : 1;
    byProduct.set(productId, (byProduct.get(productId) || 0) + qty);
  }

  return [...byProduct.entries()].map(([product_id, qty]) => ({ product_id, qty }));
}

export function stockUnavailablePayload(message: string, productId?: string) {
  return {
    error: "Stock insuffisant pour finaliser cette commande.",
    code: "stock_unavailable",
    product_id: productId || null,
    details: message,
  };
}
