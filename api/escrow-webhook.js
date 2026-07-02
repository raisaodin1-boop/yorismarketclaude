import { createClient } from "@supabase/supabase-js";
import crypto from "node:crypto";

/*
 * Webhook opérateur (MTN MoMo / Orange Money) → validation dépôt escrow.
 *
 * Résilience serverless :
 *  - Idempotence garantie par la BASE (UNIQUE ref_momo + verrou FOR UPDATE dans
 *    valider_depot_escrow), pas par ce code : une ré-exécution Vercel ou un
 *    double webhook opérateur est inoffensif.
 *  - Une seule opération réseau (le RPC) → très en dessous du timeout Vercel.
 *  - Codes HTTP choisis pour piloter le retry opérateur : 200 = ne plus renvoyer
 *    (y compris fraude/état invalide, cas définitifs), 5xx = renvoyer plus tard.
 */

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY, // service_role : seul rôle autorisé à exécuter le RPC
  { auth: { persistSession: false } }
);

// Erreurs métier définitives (levées par la fonction PLpgSQL) : inutile que
// l'opérateur retente, on répond 200 avec le détail.
const ERREURS_DEFINITIVES = [
  "ESCROW_REF_DEJA_UTILISEE",
  "ESCROW_ETAT_INVALIDE",
  "ESCROW_MONTANT_INSUFFISANT",
  "ESCROW_COMMANDE_INTROUVABLE",
];

function verifierSignature(req, rawBody) {
  const secret = process.env.PAYMENT_WEBHOOK_SECRET;
  const signature = req.headers["x-webhook-signature"];
  if (!secret || !signature) return false;
  const attendu = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(signature);
  const b = Buffer.from(attendu);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const rawBody = JSON.stringify(req.body);
  if (!verifierSignature(req, rawBody)) {
    return res.status(401).json({ error: "Signature invalide" });
  }

  const { order_id, transaction_ref, amount, status } = req.body || {};

  if (!order_id || !transaction_ref || !amount) {
    return res.status(400).json({ error: "Champs requis: order_id, transaction_ref, amount" });
  }

  // Seuls les paiements confirmés par l'opérateur déclenchent l'escrow
  if (status !== "SUCCESSFUL" && status !== "SUCCESS") {
    return res.status(200).json({ handled: false, reason: `status opérateur: ${status}` });
  }

  const { data, error } = await supabase.rpc("valider_depot_escrow", {
    id_commande: order_id,
    ref_momo: transaction_ref,
    montant: Number(amount),
  });

  if (error) {
    const definitive = ERREURS_DEFINITIVES.some((code) => error.message?.includes(code));
    if (definitive) {
      // Cas terminal (ref déjà consommée, mauvais état…) : ACK pour stopper les retries,
      // le détail reste tracé côté logs Vercel + exception Postgres.
      console.error("[escrow-webhook] rejet définitif:", error.message);
      return res.status(200).json({ handled: false, reason: error.message });
    }
    // Erreur transitoire (réseau, pool saturé) : 503 → l'opérateur retentera,
    // et l'idempotence en base rend le retry sûr.
    console.error("[escrow-webhook] erreur transitoire:", error.message);
    return res.status(503).json({ error: "Réessayer plus tard" });
  }

  return res.status(200).json({ handled: true, ...data });
}
