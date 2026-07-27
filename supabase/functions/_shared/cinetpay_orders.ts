/**
 * Mark CinetPay checkout orders paid/escrowed after a successful provider charge.
 *
 * payment_transactions=paid is not enough: orders must also move to
 * payment_status=paid / escrow securise / status validee. If that sync fails,
 * callers must retry (webhook 500 / return-path orders_pending) instead of
 * treating the charge as fully settled.
 *
 * Cancelled orders are intentionally skipped so a late ACCEPTED webhook cannot
 * resurrect annulee rows into fulfillment.
 */

export const CINETPAY_PAID_ORDER_PATCH = {
  payment_status: "paid",
  escrow_status: "securise",
  payment_provider: "cinetpay",
  status: "validee",
} as const;

const CANCELLED_ORDER_STATUSES = ["annulee", "cancelled", "canceled"] as const;

type EnsureResult =
  | { ok: true; orderIds: string[]; allCancelled?: false }
  | { ok: true; orderIds: string[]; allCancelled: true }
  | { ok: false; reason: string };

function isCancelledStatus(status: unknown): boolean {
  return CANCELLED_ORDER_STATUSES.includes(
    String(status || "").trim().toLowerCase() as (typeof CANCELLED_ORDER_STATUSES)[number],
  );
}

/**
 * Idempotently mark non-cancelled orders in a CinetPay checkout group as paid.
 * Returns { ok:true } when every active (non-cancelled) order is paid, or when
 * the whole group is cancelled (no resurrection).
 */
export async function ensureCinetPayOrdersPaid(
  supabase: {
    from: (table: string) => any;
  },
  { orderGroupId, transactionRef }: { orderGroupId: string | null | undefined; transactionRef: string },
): Promise<EnsureResult> {
  if (!orderGroupId) {
    return { ok: false, reason: "missing_order_group" };
  }

  const cancelledFilter = `(${CANCELLED_ORDER_STATUSES.join(",")})`;

  const { data: updated, error: updateErr } = await supabase
    .from("orders")
    .update({
      ...CINETPAY_PAID_ORDER_PATCH,
      provider_tx_ref: transactionRef,
    })
    .eq("order_group_id", orderGroupId)
    .not("status", "in", cancelledFilter)
    .select("id, payment_status, status");

  if (updateErr) {
    return { ok: false, reason: updateErr.message };
  }

  if (updated?.length) {
    return { ok: true, orderIds: updated.map((row: { id: string }) => row.id) };
  }

  const { data: existing, error: readErr } = await supabase
    .from("orders")
    .select("id, payment_status, status")
    .eq("order_group_id", orderGroupId);

  if (readErr) {
    return { ok: false, reason: readErr.message };
  }
  if (!existing?.length) {
    return { ok: false, reason: "no_orders" };
  }

  if (existing.every((row: { status?: string }) => isCancelledStatus(row.status))) {
    return {
      ok: true,
      allCancelled: true,
      orderIds: existing.map((row: { id: string }) => row.id),
    };
  }

  const active = existing.filter((row: { status?: string }) => !isCancelledStatus(row.status));
  if (active.every((row: { payment_status?: string }) => row.payment_status === "paid")) {
    return { ok: true, orderIds: active.map((row: { id: string }) => row.id) };
  }

  return { ok: false, reason: "orders_unpaid" };
}
