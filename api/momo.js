import { createClient } from "@supabase/supabase-js";
import { initiatePaynoteMtnPayment } from "./_lib/paynote.js";

/*
 * MTN MoMo via l'agrégateur mutualisé Paynote (production).
 *
 * Sécurité :
 *  - Authentification obligatoire (JWT Supabase de l'acheteur).
 *  - Le montant n'est JAMAIS pris depuis le corps de la requête : il est relu
 *    depuis `checkout_intents.total` (déjà calculé serveur, coupon inclus),
 *    exactement comme le rail CinetPay existant.
 *  - Chaque tentative est journalisée dans `payment_transactions` (même
 *    table que CinetPay) avec un statut "pending" — le statut final est
 *    appliqué par /api/momo-status (sondage), Paynote n'ayant pas encore de
 *    callback fiable côté notre infra.
 */

function normalizeCmMsisdn(raw) {
  const digits = String(raw || "").replace(/\D/g, "");
  if (digits.startsWith("237") && digits.length === 12) return digits.slice(3);
  if (digits.length === 9) return digits;
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
    .select("id, total, customer_id")
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

  // Requis par l'API Paynote mais non exploité côté notre infra : le statut
  // final est obtenu par sondage via /api/momo-status, pas par ce callback.
  const notifUrl = `${(process.env.YORIX_SITE_URL || "https://www.yorix.cm").replace(/\/$/, "")}/api/paynote-webhook`;

  try {
    const { messageId, raw } = await initiatePaynoteMtnPayment({
      orderId: checkoutIntentId,
      amount,
      subscriberMsisdn: msisdn,
      description: "Paiement Yorix",
      notifUrl,
    });

    await supabase.from("payment_transactions").insert({
      checkout_intent_id: checkoutIntentId,
      order_group_id: orderGroupId || null,
      provider: "paynote_mtn",
      provider_ref: messageId,
      payment_method: "mtn_momo",
      amount,
      currency: "XAF",
      status: "pending",
      channel: "momo",
      payload: { phone: msisdn, paynote: raw },
    });

    return res.status(200).json({ reference_id: messageId, status: "pending" });
  } catch (error) {
    await supabase.from("payment_transactions").insert({
      checkout_intent_id: checkoutIntentId,
      order_group_id: orderGroupId || null,
      provider: "paynote_mtn",
      provider_ref: null,
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
