/*
 * Settle a Paynote MTN payment after provider confirmation.
 *
 * Always re-check Paynote status by MessageId — never trust a webhook body's
 * status field. Shared by /api/momo-status (client poll) and
 * /api/paynote-webhook (async notifUrl).
 */

import { checkPaynoteMtnStatus, extractPaynoteMessageId } from "./paynote.js";
import { ensureMomoOrdersPaid } from "./momo_orders.js";

export const KNOWN_FAILURE_STATUSES = new Set([
  "FAILED",
  "REJECTED",
  "CANCELLED",
  "CANCELED",
  "EXPIRED",
  "TIMEOUT",
]);

/**
 * Extract a MessageId from a Paynote webhook / notification payload.
 * Docs place MessageId at the top level of webpayment responses; webhook
 * bodies may nest it or use paymentRef / message_id aliases.
 */
export function extractPaynoteWebhookMessageId(body) {
  if (!body || typeof body !== "object") return null;
  const direct =
    extractPaynoteMessageId(body) ||
    body.message_id ||
    body.messageId ||
    body.paymentRef ||
    body.PaymentRef ||
    null;
  if (direct) return String(direct);

  if (body.parameters && typeof body.parameters === "object") {
    const nested =
      body.parameters.MessageId ||
      body.parameters.message_id ||
      body.parameters.paymentRef ||
      null;
    if (nested) return String(nested);
  }

  // Some aggregators nest the original webpayment response under `message`.
  if (typeof body.message === "string") {
    try {
      const parsed = JSON.parse(body.message);
      return extractPaynoteWebhookMessageId(parsed);
    } catch {
      /* ignore */
    }
  }
  if (body.message && typeof body.message === "object") {
    return extractPaynoteWebhookMessageId(body.message);
  }

  return null;
}

function mapPaynoteStatus(paynoteStatusRaw) {
  const paynoteStatus = String(paynoteStatusRaw || "").toUpperCase();
  if (!paynoteStatus) return { kind: "pending", paynoteStatus };
  if (paynoteStatus === "SUCCESSFUL" || paynoteStatus === "SUCCESSFULL") {
    return { kind: "paid", paynoteStatus: "SUCCESSFUL" };
  }
  if (KNOWN_FAILURE_STATUSES.has(paynoteStatus)) {
    return { kind: "failed", paynoteStatus };
  }
  return { kind: "pending", paynoteStatus };
}

/**
 * Load journal row, re-verify with Paynote, update payment_transactions, and
 * sync checkout orders or loyalty credit.
 *
 * @returns {{
 *   outcome: "paid"|"failed"|"pending"|"not_found",
 *   reason?: string,
 *   tx?: object,
 *   creditPending?: boolean,
 * }}
 */
export async function settlePaynoteMtnPayment(supabase, messageId) {
  const referenceId = String(messageId || "").trim();
  if (!referenceId) {
    return { outcome: "not_found", reason: "missing_message_id" };
  }

  const { data: tx, error: txErr } = await supabase
    .from("payment_transactions")
    .select("*")
    .eq("provider", "paynote_mtn")
    .eq("provider_ref", referenceId)
    .maybeSingle();

  if (txErr) {
    return { outcome: "pending", reason: txErr.message };
  }
  if (!tx) {
    return { outcome: "not_found", reason: "transaction_not_found" };
  }

  const isLoyalty = String(tx.order_group_id || "").startsWith("LOYALTY-");

  const applyPaidSideEffects = async () => {
    if (isLoyalty) {
      const purchaseId = String(tx.order_group_id).slice("LOYALTY-".length);
      const { error: creditErr } = await supabase.rpc("credit_pack_purchase_from_payment", {
        p_purchase_id: purchaseId,
        p_payment_ref: referenceId,
      });
      if (creditErr) {
        console.error("[paynote_settle] loyalty credit:", creditErr.message);
        return { outcome: "paid", tx, creditPending: true, reason: creditErr.message };
      }
      return { outcome: "paid", tx };
    }

    const sync = await ensureMomoOrdersPaid(supabase, {
      orderGroupId: tx.order_group_id,
      referenceId,
    });
    if (!sync.ok) {
      console.error("[paynote_settle] order sync:", sync.reason, {
        txId: tx.id,
        orderGroupId: tx.order_group_id,
        referenceId,
      });
      return { outcome: "pending", tx, reason: sync.reason || "orders_pending" };
    }
    return { outcome: "paid", tx, ordersCancelled: Boolean(sync.allCancelled) };
  };

  if (tx.status === "failed") {
    return { outcome: "failed", tx };
  }

  if (tx.status === "paid") {
    return applyPaidSideEffects();
  }

  let statusData;
  try {
    statusData = await checkPaynoteMtnStatus(referenceId);
  } catch (error) {
    return { outcome: "pending", tx, reason: error.message };
  }

  const mapped = mapPaynoteStatus(statusData?.status);
  if (mapped.kind === "pending") {
    return { outcome: "pending", tx, reason: "provider_pending" };
  }

  const finalStatus = mapped.kind === "paid" ? "paid" : "failed";
  const { error: txUpdateErr } = await supabase
    .from("payment_transactions")
    .update({
      status: finalStatus,
      payload: statusData,
      updated_at: new Date().toISOString(),
    })
    .eq("id", tx.id);

  if (txUpdateErr) {
    return { outcome: "pending", tx, reason: txUpdateErr.message };
  }

  if (finalStatus === "failed") {
    return { outcome: "failed", tx: { ...tx, status: "failed" } };
  }

  return applyPaidSideEffects();
}
