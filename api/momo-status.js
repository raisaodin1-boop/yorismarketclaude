import { createClient } from "@supabase/supabase-js";

/*
 * MTN MoMo — sondage du statut d'un "Request to Pay" en cours.
 *
 * Le compte marchand n'a pas encore de callback URL enregistrée côté MTN
 * (aucun webhook possible pour l'instant), donc le client interroge cet
 * endpoint après avoir initié le paiement via /api/momo, jusqu'à obtenir un
 * statut final. Sur succès, applique exactement la même mise à jour de
 * commande que webhook_cinetpay (payment_status/escrow_status/status),
 * pour rester cohérent entre les deux rails de paiement.
 */

const MOMO_BASE_URL = "https://proxy.momoapi.mtn.com";
const MOMO_TARGET_ENVIRONMENT = "mtncameroon";

async function getAuthenticatedUser(req) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!token) return null;
  const anon = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
  const { data, error } = await anon.auth.getUser(token);
  if (error || !data?.user) return null;
  return data.user;
}

async function getMomoAccessToken() {
  const tokenRes = await fetch(`${MOMO_BASE_URL}/collection/token/`, {
    method: "POST",
    headers: {
      Authorization: "Basic " + Buffer.from(
        `${process.env.MOMO_USER_ID}:${process.env.MOMO_API_KEY}`,
      ).toString("base64"),
      "Ocp-Apim-Subscription-Key": process.env.MOMO_SUB_KEY,
    },
  });
  if (!tokenRes.ok) throw new Error(`MTN auth failed (${tokenRes.status})`);
  const tokenData = await tokenRes.json();
  if (!tokenData?.access_token) throw new Error("MTN auth: no access_token returned");
  return tokenData.access_token;
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
    .eq("provider", "mtn_momo")
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
    const accessToken = await getMomoAccessToken();
    const statusRes = await fetch(
      `${MOMO_BASE_URL}/collection/v1_0/requesttopay/${referenceId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Target-Environment": MOMO_TARGET_ENVIRONMENT,
          "Ocp-Apim-Subscription-Key": process.env.MOMO_SUB_KEY,
        },
      },
    );
    if (!statusRes.ok) {
      throw new Error(`MTN status check failed (${statusRes.status})`);
    }
    const statusData = await statusRes.json();
    const mtnStatus = String(statusData?.status || "").toUpperCase();

    if (mtnStatus === "PENDING") {
      return res.status(200).json({ status: "pending" });
    }

    const finalStatus = mtnStatus === "SUCCESSFUL" ? "paid" : "failed";

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
          payment_provider: "mtn_momo",
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
