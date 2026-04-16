import { supabase, COMMISSION_RATE, CLOUD_NAME, UPLOAD_PRESET, YORIX_WA_NUMBER, SUPABASE_ANON_KEY } from "../lib/supabase";
const getOptimizedImageUrl = (url, width = 400) => {
  if (!url || !url.includes('cloudinary.com')) return url
  // Si l'URL a déjà des transformations, on ne les duplique pas
  if (url.includes('f_auto')) return url
  return url.replace(
    '/upload/',
    `/upload/f_auto,q_auto,w_${width},c_limit/`
  )
}

export async function uploadSingleImage(file) {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", UPLOAD_PRESET);
  const res  = await fetch(`https://api.cloudinary.com/v1_1/dulwb03nf/image/upload`, { method:"POST", body:fd });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.secure_url;
}

export async function uploadMultipleImages(files) {
  const uploads = Array.from(files).map(f => uploadSingleImage(f));
  return Promise.all(uploads);
}

export function commanderWhatsApp(product, clientNom = "") {
  const msg = [
    `🛍️ *Bonjour Yorix !*`,
    ``,
    `Je souhaite commander ce produit :`,
    `📦 *${product.name_fr}*`,
    `💰 Prix : *${product.prix?.toLocaleString()} FCFA*`,
    `📍 Ville : ${product.ville || "Cameroun"}`,
    `🏪 Vendeur : ${product.vendeur_nom || ""}`,
    ``,
    clientNom ? `👤 Mon nom : ${clientNom}` : "",
    ``,
    `Merci de me confirmer la disponibilité ! ✅`,
  ].filter(Boolean).join("\n");

  window.open(`https://wa.me/${YORIX_WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
}

export async function creerCommandeSupabase({ product, clientNom, telephone, userId = null }) {
  const commission = product.prix * COMMISSION_RATE;
  const montantVendeur = product.prix - commission;

  const { data, error } = await supabase.from("orders").insert({
    product_id:       product.id,
    vendeur_id:       product.vendeur_id,
    client_nom:       clientNom,
    telephone:        telephone,
    client_id:        userId || null,
    montant:          product.prix,
    commission:       commission,
    montant_vendeur:  montantVendeur,
    status:           "pending",
    livraison_status: "pending",
    escrow_status:    "pending",
    livreur_id:       null,
  }).select().single();

  if (error) throw error;
  return data;
}

export async function getUserProfile(uid) {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", uid).maybeSingle();
  if (error) { console.error("getUserProfile ERROR:", error); return null; }
  console.log("USER DATA:", data);
  return data;
}

export function getUserRole(profileData) {
  const valid = ["buyer", "seller", "delivery", "provider", "admin"];
  const role  = profileData?.role;
  if (role && valid.includes(role)) {
    console.log("ROLE FINAL:", role);
    return role;
  }
  console.log("ROLE FINAL: seller (fallback)");
  return "buyer";
}

const FORBIDDEN_PATTERNS = [
  /(\+?237[\s\-]?[0-9]{8,9})/g,
  /(\+?[0-9]{1,3}[\s\-]?[0-9]{9,10})/g,
  /(whatsapp|wa\.me|t\.me|telegram)/gi,
  /([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/g,
  /(facebook\.com|instagram\.com)/gi,
];

export function filtrerMsg(texte) {
  return FORBIDDEN_PATTERNS.some(p => new RegExp(p.source, p.flags).test(texte))
    ? { bloque: true }
    : { bloque: false };
}
// ═══════════════════════════════════════════════════════════════
// ✅ EMAILS AUTOMATIQUES — Resend via Supabase Edge Function
// ═══════════════════════════════════════════════════════════════

const EMAIL_FUNCTION_URL = "https://msrymchhhxitdevthvdi.supabase.co/functions/v1/send-email";

/**
 * Envoie un email via l'Edge Function send-email.
 * @param {Object} opts - { to, subject, html, from }
 * @returns {Promise<{success: boolean, id?: string, error?: string}>}
 */
export async function sendEmail({ to, subject, html, from }) {
  try {
    const res = await fetch(EMAIL_FUNCTION_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, subject, html, from }),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error("sendEmail error:", data);
      return { success: false, error: data.error };
    }
    return { success: true, id: data.id };
  } catch (err) {
    console.error("sendEmail exception:", err);
    return { success: false, error: err.message };
  }
}

// ── Template de base réutilisable ──
function emailWrapper(title, bodyHtml) {
  return `
    <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#f5f1e8;padding:0">
      <div style="background:linear-gradient(135deg,#1a6b3a,#0d4a25);padding:24px 32px;text-align:center">
        <h1 style="color:#fff;margin:0;font-size:28px;letter-spacing:-.5px">Yo<span style="color:#fcd116">rix</span> CM</h1>
        <p style="color:rgba(255,255,255,.8);margin:4px 0 0;font-size:13px">Marketplace du Cameroun 🇨🇲</p>
      </div>
      <div style="background:#fff;padding:32px;border-left:1px solid #e2ddd6;border-right:1px solid #e2ddd6">
        <h2 style="color:#1a6b3a;margin:0 0 16px;font-size:20px">${title}</h2>
        ${bodyHtml}
      </div>
      <div style="background:#0d1f14;padding:20px 32px;text-align:center;color:rgba(255,255,255,.6);font-size:12px">
        <p style="margin:0 0 8px"><strong style="color:#fff">Yorix CM</strong> — RC DOUALA/2026/B237</p>
        <p style="margin:0">📱 +237 696 56 56 54 · ✉️ support@yorix.cm · 🌐 <a href="https://yorix.cm" style="color:#4fd17d">yorix.cm</a></p>
        <p style="margin:12px 0 0;font-size:11px;opacity:.5">Vous recevez cet email car vous êtes utilisateur de Yorix CM.</p>
      </div>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════════════
// Templates d'emails spécifiques
// ═══════════════════════════════════════════════════════════════

/** Email de bienvenue à l'inscription */
export function emailBienvenue(nom, role = "client") {
  const roleLabels = {
    buyer:    "acheteur",
    seller:   "vendeur",
    delivery: "livreur",
    provider: "prestataire",
    client:   "client",
  };
  const label = roleLabels[role] || "client";
  return emailWrapper(
    `Bienvenue sur Yorix, ${nom} ! 🎉`,
    `
      <p style="font-size:15px;line-height:1.7;color:#0d1f14">Nous sommes ravis de vous compter parmi nos <strong>${label}s</strong> sur Yorix CM, la marketplace camerounaise #1.</p>
      <p style="font-size:15px;line-height:1.7;color:#0d1f14">Voici ce que vous pouvez faire dès maintenant :</p>
      <ul style="font-size:14px;line-height:1.9;color:#4a5048;padding-left:20px">
        <li>🛍️ Explorer des milliers de produits locaux et importés</li>
        <li>🚚 Commander avec livraison rapide à Yaoundé & Douala</li>
        <li>💳 Payer en toute sécurité via MTN MoMo ou Orange Money</li>
        <li>🔐 Bénéficier de la protection Escrow Yorix</li>
      </ul>
      <div style="text-align:center;margin:24px 0">
        <a href="https://yorix.cm" style="display:inline-block;background:#1a6b3a;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px">🚀 Explorer Yorix</a>
      </div>
      <p style="font-size:13px;color:#888;margin-top:24px">Des questions ? Répondez à cet email ou écrivez-nous sur WhatsApp au +237 696 56 56 54.</p>
    `
  );
}

/** Email de confirmation de commande au client */
export function emailCommandeClient(nom, commande) {
  const { numero, produits = [], total, livraison, adresse, moyenPaiement } = commande;
  const lignes = produits.map(p => `
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid #e2ddd6">${p.name} <span style="color:#888">× ${p.qty}</span></td>
      <td style="padding:8px 0;border-bottom:1px solid #e2ddd6;text-align:right;font-weight:600">${(p.prix * p.qty).toLocaleString()} FCFA</td>
    </tr>
  `).join("");
  return emailWrapper(
    `Commande confirmée ✅`,
    `
      <p style="font-size:15px;line-height:1.7">Bonjour <strong>${nom}</strong>,</p>
      <p style="font-size:15px;line-height:1.7">Merci pour votre commande <strong>#${numero}</strong> ! Nous la préparons avec soin.</p>
      <table style="width:100%;border-collapse:collapse;margin:20px 0;font-size:14px">
        ${lignes}
        <tr><td style="padding:8px 0">Sous-total</td><td style="padding:8px 0;text-align:right">${(total - (livraison||0)).toLocaleString()} FCFA</td></tr>
        <tr><td style="padding:8px 0">🚚 Livraison</td><td style="padding:8px 0;text-align:right">${livraison ? livraison.toLocaleString() + " FCFA" : "Offerte"}</td></tr>
        <tr style="font-weight:800;color:#1a6b3a"><td style="padding:12px 0;border-top:2px solid #1a6b3a;font-size:16px">TOTAL</td><td style="padding:12px 0;border-top:2px solid #1a6b3a;text-align:right;font-size:16px">${total.toLocaleString()} FCFA</td></tr>
      </table>
      <div style="background:#f0faf4;border-left:4px solid #1a6b3a;padding:14px 18px;margin:16px 0;border-radius:4px">
        <p style="margin:0;font-size:13px;color:#0d1f14"><strong>💳 Paiement :</strong> ${moyenPaiement || "À confirmer"}</p>
        ${adresse ? `<p style="margin:6px 0 0;font-size:13px;color:#0d1f14"><strong>📍 Livraison :</strong> ${adresse}</p>` : ""}
      </div>
      <p style="font-size:13px;color:#1a6b3a;background:#f0faf4;padding:12px;border-radius:6px;margin:16px 0">🔐 Votre paiement est <strong>protégé par Escrow Yorix</strong> jusqu'à la réception du produit.</p>
      <p style="font-size:13px;color:#888;margin-top:24px">Questions ? WhatsApp : <a href="https://wa.me/237696565654" style="color:#1a6b3a">+237 696 56 56 54</a></p>
    `
  );
}

/** Email d'alerte nouvelle commande au vendeur */
export function emailNouvelleCommandeVendeur(vendeurNom, clientNom, produits, total) {
  const lignes = produits.map(p => `<li style="margin-bottom:4px">${p.name} × ${p.qty} — ${(p.prix*p.qty).toLocaleString()} FCFA</li>`).join("");
  return emailWrapper(
    `🛒 Nouvelle commande à préparer !`,
    `
      <p style="font-size:15px;line-height:1.7">Bonjour <strong>${vendeurNom}</strong>,</p>
      <p style="font-size:15px;line-height:1.7">Vous avez une nouvelle commande de <strong>${clientNom}</strong> !</p>
      <div style="background:#fff9e6;border-left:4px solid #fcd116;padding:14px 18px;margin:16px 0;border-radius:4px">
        <p style="margin:0 0 8px;font-size:13px;color:#0d1f14;font-weight:600">📦 Produits commandés :</p>
        <ul style="margin:0;padding-left:20px;color:#4a5048;font-size:13px">${lignes}</ul>
        <p style="margin:10px 0 0;font-size:14px;color:#1a6b3a;font-weight:700">💰 Montant total : ${total.toLocaleString()} FCFA</p>
      </div>
      <p style="font-size:14px;line-height:1.7">Merci de <strong>préparer la commande rapidement</strong> et de contacter le client pour la livraison.</p>
      <div style="text-align:center;margin:24px 0">
        <a href="https://yorix.cm" style="display:inline-block;background:#1a6b3a;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px">Voir la commande</a>
      </div>
    `
  );
}

/** Email de confirmation de livraison */
export function emailLivraisonConfirmee(nom, numero) {
  return emailWrapper(
    `Votre commande est livrée ! 📦✅`,
    `
      <p style="font-size:15px;line-height:1.7">Bonjour <strong>${nom}</strong>,</p>
      <p style="font-size:15px;line-height:1.7">Votre commande <strong>#${numero}</strong> vous a été livrée avec succès.</p>
      <p style="font-size:15px;line-height:1.7">Nous espérons que tout est parfait ! 🌟</p>
      <div style="background:#f0faf4;padding:16px;border-radius:8px;margin:20px 0;text-align:center">
        <p style="margin:0 0 10px;font-size:14px;color:#0d1f14">Un moment pour laisser votre avis ?</p>
        <a href="https://yorix.cm" style="display:inline-block;background:#1a6b3a;color:#fff;padding:10px 24px;border-radius:6px;text-decoration:none;font-weight:600;font-size:13px">⭐ Laisser un avis</a>
      </div>
      <p style="font-size:13px;color:#888;margin-top:20px">Un problème ? Contactez-nous immédiatement sur WhatsApp : <a href="https://wa.me/237696565654" style="color:#1a6b3a">+237 696 56 56 54</a></p>
    `
  );
}
