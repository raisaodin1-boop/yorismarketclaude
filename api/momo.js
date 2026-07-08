import crypto from "node:crypto";
import { createClient } from "@supabase/supabase-js";

/*
 * MTN MoMo Collections — initie un "Request to Pay" (production).
 *
 * Sécurité :
 *  - Authentification obligatoire (JWT Supabase de l'acheteur).
 *  - Le montant n'est JAMAIS pris depuis le corps de la requête : il est relu
 *    depuis `checkout_intents.total` (déjà calculé serveur, coupon inclus),
 *    exactement comme le fait le rail CinetPay existant. Le client ne peut
 *    donc pas forcer un montant arbitraire.
 *  - Chaque tentative est journalisée dans `payment_transactions` (même table
 *    que CinetPay) avec un statut "pending" — le statut final est appliqué
 *    par /api/momo-status (sondage) selon le même schéma que webhook_cinetpay.
 *
 * Ce endpoint ne modifie PAS encore le statut de la commande : il ne fait
 * qu'initier le paiement côté MTN et enregistrer la tentative.
 */

const MOMO_BASE_URL = "https://proxy.momoapi.mtn.com";
const MOMO_TARGET_ENVIRONMENT = "mtncameroon";

function normalizeCmMsisdn(raw) {
  const digits = String(raw || "").replace(/\D/g, "");
  if (digits.startsWith("237") && digits.length === 12) return digits;
  if (digits.length === 9) return `237${digits}`;
  return null;
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
  if (!tokenRes.ok) {
    throw new Error(`MTN auth failed (${tokenRes.status})`);
  }
  const tokenData = await tokenRes.json();
  if (!tokenData?.access_token) throw new Error("MTN auth: no access_token returned");
  return tokenData.access_token;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const user = await getAuthenticatedUser(req);
  if (!user) {
    return res.status(401).json({ error: "Authentification requise" });
  }

  const { checkout_intent_id: checkoutIntentId, order_group_id: orderGroupId, phone } = req.body || {};
  if (!checkoutIntentId || typeof checkoutIntentId !== "string") {
    return res.status(400).json({ error: "checkout_intent_id manquant" });
  }
  const msisdn = normalizeCmMsisdn(phone);
  if (!msisdn) {
    return res.status(400).json({ error: "Numéro de téléphone invalide (format Cameroun attendu)" });
  }

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

  const { data: intent, error: intentErr } = await supabase
    .from("checkout_intents")
    .select("id, total, customer_id, status")
    .eq("id", checkoutIntentId)
    .maybeSingle();

  if (intentErr) return res.status(500).json({ error: intentErr.message });
  if (!intent) return res.status(404).json({ error: "Checkout introuvable" });
  if (intent.customer_id !== user.id) {
    return res.status(403).json({ error: "Cette commande n'appartient pas à cet utilisateur" });
  }

  const amount = Math.round(Number(intent.total || 0));
  if (!(amount > 0)) {
    return res.status(400).json({ error: "Montant invalide" });
  }

  const referenceId = crypto.randomUUID();

  try {
    const accessToken = await getMomoAccessToken();

    const paymentRes = await fetch(`${MOMO_BASE_URL}/collection/v1_0/requesttopay`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Reference-Id": referenceId,
        "X-Target-Environment": MOMO_TARGET_ENVIRONMENT,
        "Ocp-Apim-Subscription-Key": process.env.MOMO_SUB_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: String(amount),
        currency: "XAF",
        externalId: `yorix-${checkoutIntentId}`,
        payer: {
          partyIdType: "MSISDN",
          partyId: msisdn,
        },
        payerMessage: "Paiement Yorix",
        payeeNote: "Commande Yorix",
      }),
    });

    // MTN répond 202 Accepted (traitement asynchrone) — tout le reste est une erreur.
    if (paymentRes.status !== 202) {
      const errBody = await paymentRes.text().catch(() => "");
      throw new Error(`MTN requesttopay refusé (${paymentRes.status}): ${errBody.slice(0, 300)}`);
    }

    await supabase.from("payment_transactions").insert({
      checkout_intent_id: checkoutIntentId,
      order_group_id: orderGroupId || null,
      provider: "mtn_momo",
      provider_ref: referenceId,
      payment_method: "mtn_momo",
      amount,
      currency: "XAF",
      status: "pending",
      channel: "momo",
      payload: { phone: msisdn },
    });

    return res.status(200).json({ reference_id: referenceId, status: "pending" });
  } catch (error) {
    await supabase.from("payment_transactions").insert({
      checkout_intent_id: checkoutIntentId,
      order_group_id: orderGroupId || null,
      provider: "mtn_momo",
      provider_ref: referenceId,
      payment_method: "mtn_momo",
      amount,
      currency: "XAF",
      status: "failed",
      channel: "momo",
      payload: { phone: msisdn, error: error.message },
    }).catch(() => {});
    return res.status(502).json({ error: error.message });
  }
}
