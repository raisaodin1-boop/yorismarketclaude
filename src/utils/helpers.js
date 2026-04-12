import { supabase, COMMISSION_RATE, CLOUD_NAME, UPLOAD_PRESET, YORIX_WA_NUMBER } from "../lib/supabase";
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
  const res  = await fetch(`https://res.cloudinary.com/TON_CLOUD/image/upload/f_auto,q_auto,w_400/v123456/photo.jpg`, { method:"POST", body:fd });
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
  return "seller";
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
