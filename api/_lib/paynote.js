/*
 * Client Paynote (agrégateur mutualisé MTN MoMo / Orange Money — y-note.cm).
 * Doc source : documentation-paynote.html (section MTN Cameroun), fournie
 * intégralement par l'utilisateur — aucun champ deviné.
 *
 *  - Jeton : POST https://omapi-token.ynote.africa/oauth2/token
 *            Basic(clientId:clientSecret), grant_type=client_credentials
 *  - Paiement : POST https://omapi.ynote.africa/prod/webpayment
 *            Bearer <token>, body { API_MUT: { ... } }
 *  - Statut : POST https://omapi.ynote.africa/prod/webpayment/status
 *            Bearer <token>, body { customerkey, customersecret, message_id, payment_method }
 */

const TOKEN_URL = "https://omapi-token.ynote.africa/oauth2/token";
const PAYMENT_URL = "https://omapi.ynote.africa/prod/webpayment";
const STATUS_URL = "https://omapi.ynote.africa/prod/webpayment/status";
const BALANCE_URL = "https://omapi.ynote.africa/prod/balance/";

// Cache best-effort au niveau du module : utile seulement si l'instance
// serverless reste "chaude" entre deux appels. Sans effet si froid — dans ce
// cas on redemande simplement un nouveau jeton, ce qui reste correct.
let cachedToken = null;
let cachedTokenExpiresAt = 0;

async function getPaynoteAccessToken() {
  if (cachedToken && Date.now() < cachedTokenExpiresAt) {
    return cachedToken;
  }

  const clientId = process.env.PAYNOTE_CLIENT_ID;
  const clientSecret = process.env.PAYNOTE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("PAYNOTE_CLIENT_ID / PAYNOTE_CLIENT_SECRET manquants");
  }

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Paynote token: ${res.status} ${body.slice(0, 200)}`);
  }

  const data = await res.json();
  if (!data?.access_token) throw new Error("Paynote token: réponse sans access_token");

  cachedToken = data.access_token;
  // Marge de sécurité de 30s pour éviter d'utiliser un jeton expiré pile au moment de l'appel.
  cachedTokenExpiresAt = Date.now() + Math.max(0, (Number(data.expires_in) || 0) - 30) * 1000;
  return cachedToken;
}

/**
 * Initie un paiement MTN MoMo via Paynote (webpayment).
 * `amount` est un entier XAF ; l'API attend une chaîne.
 */
export async function initiatePaynoteMtnPayment({ orderId, amount, subscriberMsisdn, description, notifUrl }) {
  const customerkey = process.env.PAYNOTE_CUSTOMER_KEY;
  const customersecret = process.env.PAYNOTE_CUSTOMER_SECRET;
  if (!customerkey || !customersecret) {
    throw new Error("PAYNOTE_CUSTOMER_KEY / PAYNOTE_CUSTOMER_SECRET manquants");
  }

  const token = await getPaynoteAccessToken();

  const res = await fetch(PAYMENT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      API_MUT: {
        notifUrl,
        subscriberMsisdn,
        description,
        amount: String(Math.round(amount)),
        order_id: orderId,
        customerkey,
        customersecret,
        PaiementMethod: "MTN_CMR",
      },
    }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok || Number(data?.ErrorCode) !== 200) {
    throw new Error(
      `Paynote webpayment refusé: ${data?.ErrorMessage || data?.body || res.status}`,
    );
  }

  const messageId = data?.parameters?.MessageId;
  if (!messageId) throw new Error("Paynote webpayment: réponse sans MessageId");

  return { messageId, raw: data };
}

/**
 * Interroge le statut d'un paiement MTN via Paynote.
 * Retourne le statut brut Paynote ("SUCCESSFUL" à ce jour est le seul
 * documenté explicitement) — l'appelant décide comment le mapper.
 */
export async function checkPaynoteMtnStatus(messageId) {
  const customerkey = process.env.PAYNOTE_CUSTOMER_KEY;
  const customersecret = process.env.PAYNOTE_CUSTOMER_SECRET;
  if (!customerkey || !customersecret) {
    throw new Error("PAYNOTE_CUSTOMER_KEY / PAYNOTE_CUSTOMER_SECRET manquants");
  }

  const token = await getPaynoteAccessToken();

  const res = await fetch(STATUS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      customerkey,
      customersecret,
      message_id: messageId,
      payment_method: "MTN_CMR",
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Paynote status: ${res.status} ${body.slice(0, 200)}`);
  }

  return res.json();
}

/**
 * Consulte le solde du compte marchand MTN via Paynote.
 * Note : la prose de la doc indique "MTN_MOMO_CMR" pour payment_method,
 * alors que l'exemple curl de cette section (copié d'un autre endpoint)
 * montre "M2U_CMR" par erreur — on suit la prose, explicite pour MTN.
 */
export async function checkPaynoteMtnBalance() {
  const customerkey = process.env.PAYNOTE_CUSTOMER_KEY;
  const customersecret = process.env.PAYNOTE_CUSTOMER_SECRET;
  if (!customerkey || !customersecret) {
    throw new Error("PAYNOTE_CUSTOMER_KEY / PAYNOTE_CUSTOMER_SECRET manquants");
  }

  const token = await getPaynoteAccessToken();

  const res = await fetch(BALANCE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      customerkey,
      customersecret,
      payment_method: "MTN_MOMO_CMR",
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Paynote balance: ${res.status} ${body.slice(0, 200)}`);
  }

  return res.json();
}
