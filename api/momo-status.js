import { createClient } from "@supabase/supabase-js";
import { checkPaynoteMtnStatus } from "./_lib/paynote.js";

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
 */

const KNOWN_FAILURE_STATUSES = new Set(["FAILED", "REJECTED", "CANCELLED", "CANCELED", "EXPIRED", "TIMEOUT"]);

const PAID_ORDER_PATCH = {
  payment_status: "paid",
  escrow_status: "securise",
  payment_provider: "paynote_mtn",
  status: "validee",
};

/**
 * Idempotently mark all orders in a MoMo checkout group as paid/escrowed.
 * Returns { ok:true } only when at least one matching order is paid.
 */
export async function ensureMomoOrdersPaid(supabase, { orderGroupId, referenceId }) {
  if (!orderGroupId) {
    return { ok: false, reason: "missing_order_group" };
  }

  const { data: updated, error: updateErr } = await supabase
    .from("orders")
    .update({
      ...PAID_ORDER_PATCH,
      provider_tx_ref: referenceId,
    })
    .eq("order_group_id", orderGroupId)
    .select("id, payment_status");

  if (updateErr) {
    return { ok: false, reason: updateErr.message };
  }

  if (updated?.length) {
    return { ok: true, orderIds: updated.map((row) => row.id) };
  }

  const { data: existing, error: readErr } = await supabase
    .from("orders")
    .select("id, payment_status")
    .eq("order_group_id", orderGroupId);

  if (readErr) {
    return { ok: false, reason: readErr.message };
  }
  if (!existing?.length) {
    return { ok: false, reason: "no_orders" };
  }
  if (existing.every((row) => row.payment_status === "paid")) {
    return { ok: true, orderIds: existing.map((row) => row.id) };
  }
  return { ok: false, reason: "orders_unpaid" };
}

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
  if (!tx) return res.status(404).json({ error: "Transaction introuvable" });

  const { data: intent, error: intentErr } = await supabase
    .from("checkout_intents")
    .select("customer_id")
    .eq("id", tx.checkout_intent_id)
    .maybeSingle();
  if (intentErr) return res.status(500).json({ error: intentErr.message });
  if (!intent || intent.customer_id !== user.id) {
    return res.status(403).json({ error: "Accès refusé" });
  }

  const respondPaidOrKeepPolling = async () => {
    const sync = await ensureMomoOrdersPaid(supabase, {
      orderGroupId: tx.order_group_id,
      referenceId,
    });
    if (!sync.ok) {
      console.error("[momo-status] order sync pending:", sync.reason, {
        txId: tx.id,
        orderGroupId: tx.order_group_id,
        referenceId,
      });
      // Keep CheckoutPage polling so a later attempt can repair stranded orders.
      return res.status(200).json({ status: "pending", orders_pending: true, reason: sync.reason });
    }
    return res.status(200).json({ status: "paid" });
  };

  if (tx.status === "failed") {
    return res.status(200).json({ status: "failed" });
  }

  if (tx.status === "paid") {
    return respondPaidOrKeepPolling();
  }

  try {
    const statusData = await checkPaynoteMtnStatus(referenceId);
    const paynoteStatus = String(statusData?.status || "").toUpperCase();

    if (!paynoteStatus || (!KNOWN_FAILURE_STATUSES.has(paynoteStatus) && paynoteStatus !== "SUCCESSFUL")) {
      return res.status(200).json({ status: "pending" });
    }

    const finalStatus = paynoteStatus === "SUCCESSFUL" ? "paid" : "failed";

    const { error: txUpdateErr } = await supabase
      .from("payment_transactions")
      .update({ status: finalStatus, payload: statusData, updated_at: new Date().toISOString() })
      .eq("id", tx.id);

    if (txUpdateErr) {
      console.error("[momo-status] payment_transactions update:", txUpdateErr.message);
      return res.status(200).json({ status: "pending" });
    }

    if (finalStatus === "paid") {
      return respondPaidOrKeepPolling();
    }

    return res.status(200).json({ status: finalStatus });
  } catch (error) {
    return res.status(502).json({ error: error.message });
  }
}
