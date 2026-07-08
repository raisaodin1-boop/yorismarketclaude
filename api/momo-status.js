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

  if (tx.status === "paid" || tx.status === "failed") {
    return res.status(200).json({ status: tx.status });
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

    if (finalStatus === "paid" && tx.order_group_id) {
      await supabase
        .from("orders")
        .update({
          payment_status: "paid",
          escrow_status: "securise",
          payment_provider: "paynote_mtn",
          provider_tx_ref: referenceId,
          status: "validee",
        })
        .eq("order_group_id", tx.order_group_id);
    }

    return res.status(200).json({ status: finalStatus });
  } catch (error) {
    return res.status(502).json({ error: error.message });
  }
}
