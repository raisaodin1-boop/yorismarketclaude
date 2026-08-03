import { createClient } from "@supabase/supabase-js";
import {
  extractPaynoteWebhookMessageId,
  settlePaynoteMtnPayment,
} from "./_lib/paynote_settle.js";

/*
 * Paynote notifUrl callback for MTN MoMo webpayment.
 *
 * Both api/momo.js and api/momo-loyalty.js register:
 *   {YORIX_SITE_URL}/api/paynote-webhook
 *
 * Without this handler, Vercel's SPA rewrite returns HTTP 200 HTML for the
 * path. Paynote treats that as a successful notification delivery and stops
 * retrying — so a buyer who closes the tab (or whose client poll times out)
 * can leave money taken while orders/loyalty stay unpaid forever.
 *
 * Security: do NOT trust the webhook body's status. Extract MessageId (or
 * paymentRef alias), look up our payment_transactions row, then re-verify
 * with Paynote's status API before marking paid / crediting loyalty.
 */

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body || {};
  const messageId = extractPaynoteWebhookMessageId(body);
  if (!messageId) {
    // Definitive client error: Paynote payload unusable — ACK so they stop,
    // and log for ops. Returning 4xx forever would not recover a missing id.
    console.error("[paynote-webhook] missing MessageId in payload", {
      keys: Object.keys(body || {}),
    });
    return res.status(200).json({ handled: false, reason: "missing_message_id" });
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error("[paynote-webhook] missing Supabase env");
    return res.status(503).json({ error: "Réessayer plus tard" });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } },
  );

  try {
    const result = await settlePaynoteMtnPayment(supabase, messageId);

    if (result.outcome === "not_found") {
      // Unknown MessageId — ACK (no retry will create the journal row).
      console.error("[paynote-webhook] unknown MessageId", messageId);
      return res.status(200).json({ handled: false, reason: result.reason });
    }

    if (result.outcome === "pending") {
      // Provider still settling or our order sync failed — ask Paynote to retry.
      console.warn("[paynote-webhook] pending, requesting retry", {
        messageId,
        reason: result.reason,
      });
      return res.status(503).json({ error: "Réessayer plus tard", reason: result.reason });
    }

    return res.status(200).json({
      handled: true,
      status: result.outcome,
      credit_pending: Boolean(result.creditPending),
      orders_cancelled: Boolean(result.ordersCancelled),
    });
  } catch (error) {
    console.error("[paynote-webhook] unexpected:", error?.message || error);
    return res.status(503).json({ error: "Réessayer plus tard" });
  }
}
