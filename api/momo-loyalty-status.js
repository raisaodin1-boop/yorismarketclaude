import { createClient } from "@supabase/supabase-js";
import { checkPaynoteMtnStatus } from "./_lib/paynote.js";

/*
 * Sondage du statut d'un paiement MTN MoMo (Paynote) pour un achat de points
 * fidélité. Sur succès, crédite les points via credit_pack_purchase_from_payment
 * (RPC service_role — vérifie elle-même qu'un paiement confirmé existe avant
 * de créditer, indépendamment de ce que cet endpoint prétend).
 */

const KNOWN_FAILURE_STATUSES = new Set(["FAILED", "REJECTED", "CANCELLED", "CANCELED", "EXPIRED", "TIMEOUT"]);

async function getAuthenticatedUser(req) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!token) return null;
  const anon = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
  const { data, error } = await anon.auth.getUser(token);
  if (error || !data?.user) return null;
  return data.user;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const user = await getAuthenticatedUser(req);
  if (!user) {
    return res.status(401).json({ error: "Authentification requise" });
  }

  const referenceId = String(req.query.reference_id || "");
  if (!referenceId) {
    return res.status(400).json({ error: "reference_id manquant" });
  }

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

  const { data: tx, error: txErr } = await supabase
    .from("payment_transactions")
    .select("*")
    .eq("provider", "paynote_mtn")
    .eq("provider_ref", referenceId)
    .maybeSingle();

  if (txErr) return res.status(500).json({ error: txErr.message });
  if (!tx || !tx.order_group_id?.startsWith("LOYALTY-")) {
    return res.status(404).json({ error: "Transaction introuvable" });
  }

  const purchaseId = tx.order_group_id.slice("LOYALTY-".length);

  const { data: purchase, error: purchaseErr } = await supabase
    .from("loyalty_pack_purchases")
    .select("user_id, status, points")
    .eq("id", purchaseId)
    .maybeSingle();
  if (purchaseErr) return res.status(500).json({ error: purchaseErr.message });
  if (!purchase || purchase.user_id !== user.id) {
    return res.status(403).json({ error: "Accès refusé" });
  }

  if (tx.status === "paid" || purchase.status === "credited") {
    return res.status(200).json({ status: "paid", points_credited: purchase.points });
  }
  if (tx.status === "failed") {
    return res.status(200).json({ status: "failed" });
  }

  try {
    const statusData = await checkPaynoteMtnStatus(referenceId);
    const paynoteStatus = String(statusData?.status || "").toUpperCase();

    if (!paynoteStatus || (!KNOWN_FAILURE_STATUSES.has(paynoteStatus) && paynoteStatus !== "SUCCESSFUL")) {
      return res.status(200).json({ status: "pending" });
    }

    const finalStatus = paynoteStatus === "SUCCESSFUL" ? "paid" : "failed";

    await supabase
      .from("payment_transactions")
      .update({ status: finalStatus, payload: statusData, updated_at: new Date().toISOString() })
      .eq("id", tx.id);

    if (finalStatus === "paid") {
      const { data: creditResult, error: creditErr } = await supabase.rpc(
        "credit_pack_purchase_from_payment",
        { p_purchase_id: purchaseId, p_payment_ref: referenceId },
      );
      if (creditErr) {
        console.error("[momo-loyalty-status] credit RPC:", creditErr.message);
        return res.status(200).json({ status: "paid", credit_pending: true });
      }
      return res.status(200).json({ status: "paid", points_credited: creditResult?.points_credited ?? null });
    }

    return res.status(200).json({ status: finalStatus });
  } catch (error) {
    return res.status(502).json({ error: error.message });
  }
}
