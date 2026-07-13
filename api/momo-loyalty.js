import { createClient } from "@supabase/supabase-js";
import { initiatePaynoteMtnPayment } from "./_lib/paynote.js";

/*
 * MTN MoMo direct (Paynote) pour l'achat de points fidélité.
 *
 * Même garanties que api/momo.js : authentification obligatoire, montant
 * jamais pris depuis le client (relu depuis loyalty_pack_purchases.prix_fcfa),
 * tentative journalisée dans payment_transactions. La référence de commande
 * ("LOYALTY-<uuid achat>") permet à credit_pack_purchase_from_payment() de
 * vérifier qu'un paiement réellement confirmé existe avant de créditer les
 * points, sans jamais faire confiance à l'appelant.
 */

function normalizeCmMsisdn(raw) {
  const digits = String(raw || "").replace(/\D/g, "");
  if (digits.startsWith("237") && digits.length === 12) return digits.slice(3);
  if (digits.length === 9) return digits;
  return null;
}

function expectedPointsForPack(pack) {
  const basePoints = Math.round(Number(pack?.points || 0));
  const bonusPct = Number(pack?.bonus_pct || 0);
  return basePoints + Math.round(basePoints * (bonusPct / 100));
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

  const { purchase_id: purchaseId, phone } = req.body || {};
  if (!purchaseId || typeof purchaseId !== "string") {
    return res.status(400).json({ error: "purchase_id manquant" });
  }
  const msisdn = normalizeCmMsisdn(phone);
  if (!msisdn) {
    return res.status(400).json({ error: "Numéro de téléphone invalide (format Cameroun attendu)" });
  }

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

  const { data: purchase, error: purchaseErr } = await supabase
    .from("loyalty_pack_purchases")
    .select("id, user_id, pack_id, points, prix_fcfa, status, pack_nom")
    .eq("id", purchaseId)
    .maybeSingle();

  if (purchaseErr) return res.status(500).json({ error: purchaseErr.message });
  if (!purchase) return res.status(404).json({ error: "Achat introuvable" });
  if (purchase.user_id !== user.id) {
    return res.status(403).json({ error: "Cet achat n'appartient pas à cet utilisateur" });
  }
  if (purchase.status === "credited") {
    return res.status(409).json({ error: "Cet achat a déjà été crédité" });
  }
  if (purchase.status === "cancelled") {
    return res.status(409).json({ error: "Cet achat a été annulé" });
  }

  const { data: pack, error: packErr } = await supabase
    .from("loyalty_packs")
    .select("id, nom, points, prix_fcfa, bonus_pct, actif")
    .eq("id", purchase.pack_id)
    .maybeSingle();

  if (packErr) return res.status(500).json({ error: packErr.message });
  if (!pack || pack.actif === false) {
    return res.status(409).json({ error: "Pack fidélité indisponible" });
  }

  const amount = Math.round(Number(pack.prix_fcfa || 0));
  const purchaseAmount = Math.round(Number(purchase.prix_fcfa || 0));
  const expectedPoints = expectedPointsForPack(pack);
  const purchasePoints = Math.round(Number(purchase.points || 0));
  if (purchaseAmount !== amount || purchasePoints !== expectedPoints) {
    return res.status(409).json({ error: "Achat fidélité incohérent avec le pack sélectionné" });
  }

  if (!(amount > 0)) {
    return res.status(400).json({ error: "Montant invalide" });
  }

  const orderGroupId = `LOYALTY-${purchaseId}`;
  const notifUrl = `${(process.env.YORIX_SITE_URL || "https://www.yorix.cm").replace(/\/$/, "")}/api/paynote-webhook`;

  try {
    const { messageId, raw } = await initiatePaynoteMtnPayment({
      orderId: orderGroupId,
      amount,
      subscriberMsisdn: msisdn,
      description: `Pack points Yorix — ${pack.nom || purchase.pack_nom || "Pack"}`,
      notifUrl,
    });

    await supabase.from("payment_transactions").insert({
      checkout_intent_id: null,
      order_group_id: orderGroupId,
      provider: "paynote_mtn",
      provider_ref: messageId,
      payment_method: "mtn_momo",
      amount,
      currency: "XAF",
      status: "pending",
      channel: "momo",
      payload: { phone: msisdn, paynote: raw, loyalty_purchase_id: purchaseId },
    });

    return res.status(200).json({ reference_id: messageId, status: "pending" });
  } catch (error) {
    try {
      await supabase.from("payment_transactions").insert({
        checkout_intent_id: null,
        order_group_id: orderGroupId,
        provider: "paynote_mtn",
        provider_ref: null,
        payment_method: "mtn_momo",
        amount,
        currency: "XAF",
        status: "failed",
        channel: "momo",
        payload: { phone: msisdn, error: error.message, loyalty_purchase_id: purchaseId },
      });
    } catch {
      /* best-effort */
    }
    return res.status(502).json({ error: error.message });
  }
}
