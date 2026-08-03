import { createClient } from "@supabase/supabase-js";
import { settlePaynoteMtnPayment } from "./_lib/paynote_settle.js";

/*
 * Sondage du statut d'un paiement MTN MoMo initié via Paynote.
 *
 * Le champ `status` documenté par Paynote confirme explicitement la valeur
 * "SUCCESSFUL" pour un paiement réussi. Aucune autre valeur terminale n'est
 * documentée à ce jour — par prudence (argent réel), seule "SUCCESSFUL" est
 * traitée comme un succès ; les statuts explicitement négatifs connus dans
 * l'écosystème MTN MoMo (FAILED, REJECTED, CANCELLED, EXPIRED, TIMEOUT)
 * sont traités comme un échec définitif. Toute autre valeur (y compris
 * inconnue) est traitée comme "encore en attente" plutôt que faussement
 * marquée échouée.
 *
 * Important : marquer payment_transactions=paid ne suffit pas. Les commandes
 * doivent aussi passer payment_status=paid / escrow securise. Si la synchro
 * commandes échoue après un paiement opérateur réussi, on garde le client en
 * "pending" pour qu'il continue à sonder et retenter la réparation — un
 * early-return "paid" stopperait le polling CheckoutPage et laisserait les
 * commandes impayées définitivement.
 *
 * Les commandes déjà annulées (annulee/cancelled) sont exclues de la synchro
 * pour qu'un SUCCESSFUL tardif ne les ressuscite pas en fulfillment.
 *
 * Le règlement effectif (re-vérif Paynote + synchro) est partagé avec
 * /api/paynote-webhook via settlePaynoteMtnPayment.
 */

async function getAuthenticatedUser(req) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!token) return null;
  const anon = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
  const { data, error } = await anon.auth.getUser(token);
  if (error || !data?.user) return null;
  return data.user;
}

export { ensureMomoOrdersPaid } from "./_lib/momo_orders.js";

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
    .select("id, checkout_intent_id, order_group_id")
    .eq("provider", "paynote_mtn")
    .eq("provider_ref", referenceId)
    .maybeSingle();

  if (txErr) return res.status(500).json({ error: txErr.message });
  if (!tx) return res.status(404).json({ error: "Transaction introuvable" });
  if (String(tx.order_group_id || "").startsWith("LOYALTY-")) {
    return res.status(404).json({ error: "Transaction introuvable" });
  }

  const { data: intent, error: intentErr } = await supabase
    .from("checkout_intents")
    .select("customer_id")
    .eq("id", tx.checkout_intent_id)
    .maybeSingle();
  if (intentErr) return res.status(500).json({ error: intentErr.message });
  if (!intent || intent.customer_id !== user.id) {
    return res.status(403).json({ error: "Accès refusé" });
  }

  try {
    const result = await settlePaynoteMtnPayment(supabase, referenceId);

    if (result.outcome === "not_found") {
      return res.status(404).json({ error: "Transaction introuvable" });
    }
    if (result.outcome === "pending") {
      return res.status(200).json({
        status: "pending",
        orders_pending: Boolean(result.reason && result.reason !== "provider_pending"),
        reason: result.reason,
      });
    }
    if (result.outcome === "failed") {
      return res.status(200).json({ status: "failed" });
    }
    return res.status(200).json({
      status: "paid",
      orders_cancelled: Boolean(result.ordersCancelled),
    });
  } catch (error) {
    return res.status(502).json({ error: error.message });
  }
}
