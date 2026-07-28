/*
 * Mark MoMo/Paynote checkout orders paid/escrowed after a successful provider charge.
 *
 * payment_transactions=paid is not enough: orders must also move to
 * payment_status=paid / escrow securise / status validee. If that sync fails,
 * /api/momo-status must keep the client polling (orders_pending) instead of
 * treating the charge as fully settled.
 *
 * Cancelled orders are intentionally skipped so a late SUCCESSFUL poll cannot
 * resurrect annulee rows into fulfillment (same class as CinetPay cancel
 * resurrection).
 */

export const MOMO_PAID_ORDER_PATCH = {
  payment_status: "paid",
  escrow_status: "securise",
  payment_provider: "paynote_mtn",
  status: "validee",
};

const CANCELLED_ORDER_STATUSES = ["annulee", "cancelled", "canceled"];

function isCancelledStatus(status) {
  return CANCELLED_ORDER_STATUSES.includes(String(status || "").trim().toLowerCase());
}

/**
 * Idempotently mark non-cancelled orders in a MoMo checkout group as paid.
 * Returns { ok:true } when every active (non-cancelled) order is paid, or when
 * the whole group is cancelled (no resurrection).
 */
export async function ensureMomoOrdersPaid(supabase, { orderGroupId, referenceId }) {
  if (!orderGroupId) {
    return { ok: false, reason: "missing_order_group" };
  }

  const cancelledFilter = `(${CANCELLED_ORDER_STATUSES.join(",")})`;

  const { data: updated, error: updateErr } = await supabase
    .from("orders")
    .update({
      ...MOMO_PAID_ORDER_PATCH,
      provider_tx_ref: referenceId,
    })
    .eq("order_group_id", orderGroupId)
    .not("status", "in", cancelledFilter)
    .select("id, payment_status, status");

  if (updateErr) {
    return { ok: false, reason: updateErr.message };
  }

  if (updated?.length) {
    return { ok: true, orderIds: updated.map((row) => row.id) };
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

  if (existing.every((row) => isCancelledStatus(row.status))) {
    return {
      ok: true,
      allCancelled: true,
      orderIds: existing.map((row) => row.id),
    };
  }

  const active = existing.filter((row) => !isCancelledStatus(row.status));
  if (active.every((row) => row.payment_status === "paid")) {
    return { ok: true, orderIds: active.map((row) => row.id) };
  }

  return { ok: false, reason: "orders_unpaid" };
}
