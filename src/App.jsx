// ═══════════════════════════════════════════════════════════════
//  YORIX CM — VERSION PROFESSIONNELLE COMPLÈTE
//  ✅ WhatsApp Commander
//  ✅ Upload multiple Cloudinary
//  ✅ Commandes Supabase (orders)
//  ✅ Avis / Étoiles / Commentaires
//  ✅ Avis / Étoiles / Commentaires
//  ✅ Commission automatique 5%
//  ✅ Livraison avec statuts
//  ✅ Escrow simulé
//  ✅ Dashboard vendeur complet
//  ✅ Notifications temps réel
//  ✅ 4 rôles : buyer / seller / delivery / provider
// ═══════════════════════════════════════════════════════════════

import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
// ─────────────────────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────────────────────
const SUPABASE_URL      = import.meta.env.VITE_SUPABASE_URL      || "https://msrymchhhxitdevthvdi.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_yJj7JNdn-r19Pjc070IOBg_y2VzGJXA";
const CLOUD_NAME        = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME    || "";
const UPLOAD_PRESET     = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "yorix_unsigned";
const YORIX_WA_NUMBER   = "237696565654";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const COMMISSION_RATE   = 0.05; // 5% commission Yorix



// ─────────────────────────────────────────────────────────────
// CONSTANTES
// ─────────────────────────────────────────────────────────────
const CATS   = ["Téléphones","Mode","Alimentation","Maison","Agricole","Beauté","BTP","Automobile","Éducation","Services"];
const CITIES = ["Toutes les villes","Douala","Yaoundé","Bafoussam","Bamenda","Garoua","Kribi","Ngaoundéré"];
const ROLE_LABELS = { buyer:"🛍️ Acheteur", seller:"🏪 Vendeur", delivery:"🚚 Livreur", provider:"👷 Prestataire" };
const DELIVERY_STATUSES = { pending:"⏳ En attente", en_cours:"🚚 En cours", livre:"✅ Livré", echec:"❌ Échoué" };
const ESCROW_STATUSES   = { pending:"⏳ En attente", securise:"🔐 Sécurisé", libere:"✅ Libéré", rembourse:"↩️ Remboursé" };

// ─────────────────────────────────────────────────────────────
// CONSTANTES LIVRAISON GOZEM-STYLE
// ─────────────────────────────────────────────────────────────
const QUARTIERS = {
  "Douala": [
    "Akwa","Bonanjo","Bonapriso","Bali","Deido","Makepe","Kotto",
    "Ndokotti","Logpom","Bépanda","PK 8","PK 10","PK 12","PK 14",
    "Bonabéri","Nyalla","Bonamoussadi","Cité des palmiers","Autre"
  ],
  "Yaoundé": [
    "Bastos","Centre-ville","Mvan","Mvog-Ada","Nlongkak","Obili",
    "Mendong","Biyem-Assi","Mfandena","Elig-Essono","Damas",
    "Ngousso","Emombo","Mokolo","Tsinga","Autre"
  ],
  "Bafoussam": ["Centre","Banengo","Tougang","Famla","Tamdja","Autre"],
  "Bamenda": ["Commercial Avenue","Up Station","Nkwen","Mile 4","Autre"],
  "Garoua":  ["Centre","Plateau","Marché central","Lopéré","Autre"],
  "Kribi":   ["Centre","Kribi Plage","Dombé","Autre"],
  "Ngaoundéré": ["Centre","Djalingo","Mbideng","Autre"],
};

// Tarifs en FCFA selon la combinaison ville/type de zone
const TARIFS_LIVRAISON = {
  intra_quartier:  { min: 500,  max: 1000, label:"Même quartier",       delai:"20–30 min" },
  intra_ville:     { min: 1000, max: 2000, label:"Même ville",           delai:"30–60 min" },
  inter_ville_proche: { min: 2500, max: 5000, label:"Villes proches",    delai:"2–4h"      },
  inter_ville:     { min: 5000, max: 10000, label:"Inter-villes",        delai:"J+1"       },
};

// Types de colis
const TYPES_COLIS = [
  { id:"enveloppe", label:"📄 Enveloppe / Documents",  desc:"Moins de 500g",  bonus:0 },
  { id:"petit",     label:"📦 Petit colis",             desc:"0.5 – 5 kg",    bonus:500 },
  { id:"moyen",     label:"🗃️ Colis moyen",             desc:"5 – 20 kg",     bonus:1000 },
  { id:"grand",     label:"📫 Grand colis / Palette",  desc:"Plus de 20 kg", bonus:2000 },
  { id:"fragile",   label:"🥚 Colis fragile",           desc:"Électronique, verre", bonus:1500 },
];

// Livreurs disponibles (données statiques enrichies)
const LIVREURS_DATA = [
  { id:"L1", emoji:"🏍️", name:"Jean-Pierre M.", sub:"Moto · Douala",  ville:"Douala",  livraisons:342, note:4.9, dispo:true,  temps:"~15 min", vehicule:"Moto",        tel:"655001122", types:["enveloppe","petit","moyen"] },
  { id:"L2", emoji:"🚐", name:"Augustin N.",    sub:"Minibus · Yaoundé", ville:"Yaoundé", livraisons:218, note:4.8, dispo:true,  temps:"~20 min", vehicule:"Minibus",     tel:"677882244", types:["petit","moyen","grand"] },
  { id:"L3", emoji:"🚗", name:"Grace T.",       sub:"Voiture · Douala",  ville:"Douala",  livraisons:156, note:5.0, dispo:true,  temps:"~10 min", vehicule:"Voiture",     tel:"699334455", types:["enveloppe","petit","moyen","fragile"] },
  { id:"L4", emoji:"🚚", name:"Fabrice K.",     sub:"Camionnette · Bafoussam", ville:"Bafoussam", livraisons:189, note:4.7, dispo:false, temps:null, vehicule:"Camionnette", tel:"670556677", types:["moyen","grand"] },
  { id:"L5", emoji:"🏍️", name:"Bertrand A.",    sub:"Moto · Yaoundé",  ville:"Yaoundé", livraisons:271, note:4.8, dispo:true,  temps:"~18 min", vehicule:"Moto",        tel:"655778899", types:["enveloppe","petit"] },
  { id:"L6", emoji:"🚐", name:"Carine M.",      sub:"Minibus · Douala",  ville:"Douala",  livraisons:98,  note:4.9, dispo:false, temps:null, vehicule:"Minibus",     tel:"677001234", types:["petit","moyen","grand"] },
];


// ─────────────────────────────────────────────────────────────
// DONNÉES STATIQUES
// ─────────────────────────────────────────────────────────────
const PREST_DATA = [
  {emoji:"🔨",name:"Claude Mbassi",meta:"Plombier · Douala",tags:["Plomberie","Sanitaire"],prix:"15 000 FCFA/h",note:4.9,avis:87},
  {emoji:"⚡",name:"Électro Bertrand",meta:"Électricien · Yaoundé",tags:["Électricité","Installation"],prix:"12 000 FCFA/h",note:4.8,avis:124},
  {emoji:"🎨",name:"Raissa Design",meta:"Graphiste · Douala",tags:["Logo","Flyer"],prix:"25 000 FCFA/projet",note:5.0,avis:56},
  {emoji:"📸",name:"PhotoCam Pro",meta:"Photographe · Kribi",tags:["Mariage","Portrait"],prix:"50 000 FCFA/jour",note:4.9,avis:203},
  {emoji:"🧹",name:"CleanPro237",meta:"Nettoyage · Douala",tags:["Ménage","Bureaux"],prix:"8 000 FCFA/h",note:4.6,avis:312},
  {emoji:"💻",name:"DevCam Tech",meta:"Développeur · Yaoundé",tags:["Site web","App"],prix:"200 000 FCFA/projet",note:4.8,avis:41},
];
const BLOG_DATA = [
  {
    emoji:"📈", cat:"Business",
    title:"Comment vendre en ligne au Cameroun en 2026",
    excerpt:"E-commerce, MTN MoMo, réseaux sociaux : tout ce qu'il faut savoir pour lancer votre boutique en ligne et toucher des milliers de clients au Cameroun.",
    date:"22 mars", read:"5 min",
    url:"https://businesscameroon.net/e-commerce-cameroun-guide-vendeur/",
    image:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80"
  },
  {
    emoji:"🌿", cat:"Produits locaux",
    title:"Les 10 produits camerounais les plus vendus en ligne",
    excerpt:"Beurre de karité, pagne wax, cacao, café arabica, poivre de Penja... Découvrez les produits locaux qui cartonnent sur internet.",
    date:"19 mars", read:"3 min",
    url:"https://www.cameroon-info.net/article/cameroun-les-produits-locaux-qui-se-vendent-le-mieux/",
    image:"https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80"
  },
  {
    emoji:"💳", cat:"Paiement",
    title:"MTN MoMo vs Orange Money : lequel choisir au Cameroun ?",
    excerpt:"Comparatif complet des deux géants du paiement mobile au Cameroun : frais, plafonds, couverture réseau, avantages et inconvénients.",
    date:"16 mars", read:"4 min",
    url:"https://www.mtn.cm/momo/",
    image:"https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80"
  },
  {
    emoji:"🚚", cat:"Livraison",
    title:"Comment fonctionne la livraison à domicile à Douala en 2026",
    excerpt:"Gozem, Jumia, livreurs indépendants : tous les services de livraison disponibles à Douala et Yaoundé, leurs tarifs et délais.",
    date:"12 mars", read:"2 min",
    url:"https://gozem.co/cm/fr/",
    image:"https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&q=80"
  },
  {
    emoji:"🔐", cat:"Sécurité",
    title:"Paiement en ligne sécurisé : comment éviter les arnaques au Cameroun",
    excerpt:"Escrow, vérification vendeur, signes d'alerte... Comment acheter en toute sécurité sur internet et éviter les fraudes.",
    date:"8 mars", read:"6 min",
    url:"https://www.antic.cm/index.php/cybersecurite",
    image:"https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&q=80"
  },
  {
    emoji:"👷", cat:"Prestataires",
    title:"Comment trouver un bon artisan ou technicien à Yaoundé",
    excerpt:"Plombier, électricien, menuisier... Les bonnes pratiques pour recruter un prestataire fiable, vérifier ses références et négocier le prix.",
    date:"5 mars", read:"4 min",
    url:"https://www.anor.cm/fr/",
    image:"https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80"
  },
  {
    emoji:"📱", cat:"Digital",
    title:"WhatsApp Business pour les commerçants camerounais",
    excerpt:"Créer un catalogue produit, automatiser les réponses, diffuser des offres... Guide complet de WhatsApp Business pour booster vos ventes.",
    date:"1 mars", read:"5 min",
    url:"https://business.whatsapp.com/",
    image:"https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&q=80"
  },
  {
    emoji:"🌍", cat:"Export",
    title:"Exporter des produits camerounais : les opportunités en 2026",
    excerpt:"Cacao, café, huile de palme, artisanat... Comment les PME camerounaises peuvent accéder aux marchés européens et africains.",
    date:"25 fév", read:"7 min",
    url:"https://www.mincommerce.cm/",
    image:"https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?w=400&q=80"
  },
  {
    emoji:"🎓", cat:"Formation",
    title:"Top 5 formations gratuites pour entrepreneurs camerounais",
    excerpt:"Coursera, Google Digital Garage, HubSpot Academy... Les meilleures formations en ligne gratuites pour développer votre business au Cameroun.",
    date:"20 fév", read:"4 min",
    url:"https://grow.google/intl/fr_fr/",
    image:"https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&q=80"
  },
];
const COURSES_DATA = [
  {
    emoji:"🏪", title:"Créer sa boutique en ligne en 1h",
    level:"Débutant", lc:"level-deb", duree:"1h30", apprenants:"2.4K", prix:"Gratuit", bg:"#e8f7ee",
    desc:"Ouvre ta boutique sur Yorix et commence à vendre dès aujourd'hui. Aucune connaissance technique requise.",
    url:"https://learndigital.withgoogle.com/digitalactivation/course/digital-skills-for-work"
  },
  {
    emoji:"📸", title:"Photographier ses produits avec un téléphone",
    level:"Débutant", lc:"level-deb", duree:"2h", apprenants:"1.8K", prix:"Gratuit", bg:"#fff3e0",
    desc:"Prends des photos professionnelles de tes produits avec ton smartphone. Lumière, cadrage, retouche simple.",
    url:"https://www.skillshop.exceedlms.com/student/catalog/list?category_ids=53-google-my-business"
  },
  {
    emoji:"📊", title:"Analyser ses ventes et optimiser",
    level:"Intermédiaire", lc:"level-int", duree:"3h", apprenants:"920", prix:"Gratuit", bg:"#e3f2fd",
    desc:"Comprendre ses données de vente, identifier ses best-sellers, ajuster ses prix pour maximiser les profits.",
    url:"https://analytics.google.com/analytics/academy/"
  },
  {
    emoji:"💡", title:"Marketing digital pour commerçants africains",
    level:"Intermédiaire", lc:"level-int", duree:"4h", apprenants:"640", prix:"Gratuit", bg:"#fce4ec",
    desc:"Facebook Ads, WhatsApp Business, Instagram Shopping : attirer des clients camerounais sur internet.",
    url:"https://learndigital.withgoogle.com/digitalactivation/courses"
  },
  {
    emoji:"💳", title:"Accepter les paiements MTN MoMo et Orange Money",
    level:"Débutant", lc:"level-deb", duree:"45 min", apprenants:"3.1K", prix:"Gratuit", bg:"#fff8e1",
    desc:"Configurer les paiements mobiles pour ta boutique. Recevoir, envoyer, gérer tes transactions MoMo.",
    url:"https://www.mtn.cm/momo/business/"
  },
  {
    emoji:"🤝", title:"Négocier avec les fournisseurs locaux",
    level:"Avancé", lc:"level-adv", duree:"2h30", apprenants:"380", prix:"Gratuit", bg:"#ede7f6",
    desc:"Techniques de négociation avec les grossistes de Douala et Yaoundé. Prix, délais, qualité.",
    url:"https://www.coursera.org/learn/negotiation"
  },
  {
    emoji:"📦", title:"Gérer son stock et éviter les ruptures",
    level:"Intermédiaire", lc:"level-int", duree:"2h", apprenants:"720", prix:"Gratuit", bg:"#e0f7fa",
    desc:"Organisation du stock, prévision de la demande, gestion des approvisionnements pour une boutique qui tourne.",
    url:"https://learndigital.withgoogle.com/digitalactivation/course/ecommerce-essentials"
  },
  {
    emoji:"🚀", title:"Développer son business vers le B2B",
    level:"Avancé", lc:"level-adv", duree:"5h", apprenants:"210", prix:"Gratuit", bg:"#e0f2f1",
    desc:"Vendre à d'autres entreprises, gérer les commandes en gros, établir des partenariats durables en Afrique centrale.",
    url:"https://www.coursera.org/specializations/sales-operations"
  },
];
const REWARDS_DATA = [
  {icon:"🎁", name:"Bon d'achat 5 000 FCFA",      pts:500,  type:"pts",   desc:"Valable sur tous les produits Yorix"},
  {icon:"🚚", name:"Livraison gratuite x3",         pts:300,  type:"pts",   desc:"3 livraisons offertes intra-ville"},
  {icon:"📱", name:"-20% sur les téléphones",       pts:400,  type:"pts",   desc:"Réduction valable 30 jours"},
  {icon:"☕", name:"Pack café 500g",                pts:200,  type:"pts",   desc:"Café arabica du Cameroun livré"},
  {icon:"🎓", name:"Cours Academy offert",          pts:350,  type:"pts",   desc:"Accès 1 cours au choix"},
  {icon:"👑", name:"Statut VIP Yorix — 1 mois",    pts:3000, type:"pts",   desc:"Badge VIP + avantages exclusifs · ou 15 000 FCFA/mois"},
  {icon:"⭐", name:"Badge Top Vendeur — 1 mois",   pts:3000, type:"pts",   desc:"Badge Top Vendeur + visibilité accrue · ou 15 000 FCFA/mois"},
  {icon:"🏆", name:"Best Seller — 1 mois",         pts:0,    type:"auto",  desc:"Automatique : vendeur avec le + de produits actifs"},
];

// ─────────────────────────────────────────────────────────────
// AVIS CLIENTS CAMEROUNAIS
// ─────────────────────────────────────────────────────────────
const AVIS_CLIENTS = [
  { nom:"Marie-Claire N.", ville:"Douala · Akwa", role:"Acheteuse", note:5, date:"15 mars 2026",
    texte:"J'ai commandé un téléphone Samsung sur Yorix et je l'ai reçu en moins de 2 heures à Akwa. Le vendeur était très sérieux, le produit exactement comme sur la photo. Je recommande à 100% !", avatar:"M" },
  { nom:"Jean-Baptiste K.", ville:"Yaoundé · Bastos", role:"Vendeur", note:5, date:"12 mars 2026",
    texte:"Depuis que j'ai ouvert ma boutique sur Yorix, mes ventes ont triplé. Le système de paiement MTN MoMo est simple et l'argent arrive directement. Merci Yorix !", avatar:"J" },
  { nom:"Fatima A.", ville:"Douala · Makepe", role:"Acheteuse", note:5, date:"8 mars 2026",
    texte:"Le système Escrow m'a vraiment rassurée pour mon premier achat. J'ai payé, le colis est arrivé en parfait état, puis j'ai confirmé et le vendeur a été payé. Très professionnel !", avatar:"F" },
  { nom:"Patrick Essame", ville:"Bafoussam", role:"Livreur Yorix", note:5, date:"5 mars 2026",
    texte:"Je gagne 45 000 FCFA par semaine comme livreur Yorix. Les missions arrivent directement sur mon téléphone, je choisis celles qui me conviennent. Vraiment une bonne opportunité !", avatar:"P" },
  { nom:"Christelle M.", ville:"Yaoundé · Mvan", role:"Acheteuse", note:4, date:"1 mars 2026",
    texte:"J'ai trouvé du pagne wax de qualité à prix abordable. La livraison était un peu longue (45 min) mais la qualité du tissu est excellente. Je reviendrai !", avatar:"C" },
  { nom:"Augustin N.", ville:"Douala · Bonapriso", role:"Vendeur", note:5, date:"25 fév 2026",
    texte:"Interface simple, paiement rapide, support réactif. En 2 semaines j'ai déjà fait 15 ventes sur Yorix. Bien mieux que de vendre sur Facebook uniquement !", avatar:"A" },
];

// ─────────────────────────────────────────────────────────────
// SYSTÈME DE POINTS — RÈGLES
// ─────────────────────────────────────────────────────────────
const POINTS_REGLES = {
  achat:      { pts:5,   label:"Par achat effectué",          icon:"🛍️" },
  vente:      { pts:5,   label:"Par vente conclue",           icon:"💰" },
  livraison:  { pts:5,   label:"Par livraison effectuée",     icon:"🚚" },
  prestation: { pts:5,   label:"Par prestation réalisée",     icon:"👷" },
  inscription:{ pts:10,  label:"Inscription sur Yorix",       icon:"🎉" },
  avis:       { pts:2,   label:"Avis client publié",          icon:"⭐" },
  parrainage: { pts:20,  label:"Parrainage d'un ami",         icon:"👥" },
};
const POINTS_VALEUR_FCFA = 1; // 1 point = 1 FCFA (5 pts = 5 FCFA)
const POINTS_MIN_ECHANGE = 500; // minimum 500 pts pour échanger

// ─────────────────────────────────────────────────────────────
// RÉCOMPENSES (mis à jour avec VIP et Top Vendeur payants)
// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
// HELPERS — FONCTIONS UTILITAIRES
// ─────────────────────────────────────────────────────────────

/** Upload UNE image sur Cloudinary → retourne URL */
async function uploadSingleImage(file) {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", UPLOAD_PRESET);
  const res  = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, { method:"POST", body:fd });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.secure_url;
}

/** Upload PLUSIEURS images sur Cloudinary en parallèle → retourne tableau d'URLs */
async function uploadMultipleImages(files) {
  const uploads = Array.from(files).map(f => uploadSingleImage(f));
  return Promise.all(uploads);
}

/** Commander via WhatsApp — ouvre WhatsApp avec message préformaté */
function commanderWhatsApp(product, clientNom = "") {
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

/** Créer une commande dans Supabase */
async function creerCommandeSupabase({ product, clientNom, telephone, userId = null }) {
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

  // ── Créditer 5 points à l'acheteur et 5 points au vendeur ──
  if (userId) {
    // Mettre à jour dans Supabase (table users)
    supabase.from("users")
      .select("points_total")
      .eq("uid", userId)
      .maybeSingle()
      .then(({ data: u }) => {
        const pts = (u?.points_total || 0) + POINTS_REGLES.achat.pts;
        supabase.from("users").update({ points_total: pts }).eq("uid", userId)
          .then(() => {}).catch(() => {});
      }).catch(() => {});
  }

  return data;
}

/** Charger le profil utilisateur + son rôle depuis Supabase */
async function getUserProfile(uid) {
  // 1. Chercher dans "users" par uid (colonne uid = string)
  try {
    const { data: dataUsers } = await supabase
      .from("users")
      .select("*")
      .eq("uid", uid)
      .maybeSingle();
    if (dataUsers) {
      console.log("USER DATA (from users):", dataUsers);
      return dataUsers;
    }
  } catch(e) { console.warn("users lookup failed:", e?.message); }

  // 2. Fallback : chercher dans "profiles" par id (colonne id = uuid)
  try {
    const { data: dataProfiles } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", uid)
      .maybeSingle();
    if (dataProfiles) {
      console.log("USER DATA (from profiles):", dataProfiles);
      return dataProfiles;
    }
  } catch(e) { console.warn("profiles lookup failed:", e?.message); }

  // 3. Aucun profil trouvé — retourner null (le fallback role sera buyer)
  console.log("Aucun profil trouvé pour uid:", uid);
  return null;
}

function getUserRole(profileData) {
  const valid = ["buyer", "seller", "delivery", "provider"];
  const role  = profileData?.role;
  if (role && valid.includes(role)) {
    console.log("ROLE FINAL:", role);
    return role;
  }
  console.log("ROLE FINAL: seller (fallback — aucun rôle défini)");
  return "seller"; // fallback : acheteur par défaut (PAS vendeur)
}

/** Filtre anti-contournement messages */
const FORBIDDEN_PATTERNS = [
  /(\+?237[\s\-]?[0-9]{8,9})/g,
  /(\+?[0-9]{1,3}[\s\-]?[0-9]{9,10})/g,
  /(whatsapp|wa\.me|t\.me|telegram)/gi,
  /([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/g,
  /(facebook\.com|instagram\.com)/gi,
];
function filtrerMsg(texte) {
  return FORBIDDEN_PATTERNS.some(p => new RegExp(p.source, p.flags).test(texte))
    ? { bloque: true }
    : { bloque: false };
}

// ─────────────────────────────────────────────────────────────
// CSS
// ─────────────────────────────────────────────────────────────
const makeCSS = (dark) => `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
:root{
  --ink:${dark?"#e8f0eb":"#0d1f14"};
  --green:#1a6b3a;--green-mid:#27a85a;--green-light:#4fd17d;
  --green-pale:${dark?"#1a3a24":"#c8f5d9"};
  --red:#ce1126;--yellow:#fcd116;--gold:#c9a84c;
  --wa:#25D366;
  --bg:${dark?"#0d1a12":"#f5f2ed"};
  --surface:${dark?"#152118":"#ffffff"};
  --surface2:${dark?"#1c2e22":"#f0ece6"};
  --sand:${dark?"#1a2e1e":"#ede8df"};
  --border:${dark?"#2a4030":"#e2ddd6"};
  --gray:${dark?"#7a9a82":"#6b7a72"};
  --shadow:${dark?"rgba(0,0,0,.45)":"rgba(0,0,0,.08)"};
}
body{font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--ink);transition:background .3s,color .3s;}

/* TOPBAR */
.topbar{background:${dark?"#0a1410":"#0d1f14"};padding:5px 24px;display:flex;align-items:center;justify-content:space-between;font-size:.71rem;color:rgba(255,255,255,.44);}
.topbar-l{display:flex;gap:14px;align-items:center;}
.flag{display:flex;width:17px;height:11px;border-radius:2px;overflow:hidden;}
.fg{flex:1;background:#007a5e;}.fr{flex:1;background:#ce1126;}.fy{flex:1;background:#fcd116;}
.flag-wrap{display:flex;align-items:center;gap:5px;color:#b7e4c7;font-weight:600;}
.topbar-r{display:flex;gap:11px;}
.topbar-r span{cursor:pointer;transition:color .2s;}.topbar-r span:hover{color:#b7e4c7;}

/* NAVBAR */
.navbar{background:var(--surface);padding:0 24px;display:flex;align-items:center;gap:12px;height:64px;position:sticky;top:0;z-index:300;border-bottom:1px solid var(--border);box-shadow:0 2px 16px var(--shadow);}
.logo-wrap{cursor:pointer;display:flex;align-items:center;gap:8px;flex-shrink:0;}
.logo-txt{font-family:'Syne',sans-serif;font-weight:800;font-size:1.6rem;letter-spacing:-1px;color:var(--ink);}
.logo-txt span{color:var(--green);}
.logo-txt sup{font-size:.5rem;background:var(--yellow);color:#0d1f14;padding:1px 4px;border-radius:3px;font-weight:800;vertical-align:super;}
.nav-search{flex:1;max-width:440px;display:flex;background:var(--surface2);border:1.5px solid var(--border);border-radius:10px;overflow:hidden;transition:border-color .2s;}
.nav-search:focus-within{border-color:var(--green-mid);}
.nav-search select{border:none;border-right:1px solid var(--border);background:var(--sand);padding:9px 8px;font-family:'DM Sans',sans-serif;font-size:.76rem;color:var(--gray);outline:none;min-width:90px;}
.nav-search input{flex:1;border:none;background:transparent;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:.82rem;outline:none;color:var(--ink);}
.nav-search input::placeholder{color:var(--gray);}
.nav-search button{background:var(--green);color:#fff;border:none;padding:0 13px;cursor:pointer;font-size:1rem;}
.nav-actions{display:flex;align-items:center;gap:8px;margin-left:auto;}
.btn-ghost{border:1.5px solid var(--border);background:transparent;color:var(--ink);padding:7px 13px;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:.77rem;font-weight:500;cursor:pointer;transition:all .2s;}
.btn-ghost:hover{border-color:var(--green);color:var(--green);}
.btn-green{background:var(--green);color:#fff;border:none;padding:8px 14px;border-radius:8px;font-family:'DM Sans',sans-serif;font-weight:600;font-size:.77rem;cursor:pointer;}
.btn-red{background:var(--red);color:#fff;border:none;padding:8px 14px;border-radius:8px;font-family:'DM Sans',sans-serif;font-weight:600;font-size:.77rem;cursor:pointer;}
.btn-wa{background:var(--wa);color:#fff;border:none;padding:8px 14px;border-radius:8px;font-family:'DM Sans',sans-serif;font-weight:700;font-size:.77rem;cursor:pointer;display:flex;align-items:center;gap:5px;transition:all .2s;}
.btn-wa:hover{filter:brightness(1.1);transform:translateY(-1px);}
.icon-btn{position:relative;cursor:pointer;background:var(--surface2);border:1.5px solid var(--border);width:38px;height:38px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1rem;transition:all .2s;}
.icon-btn:hover{border-color:var(--green);}
.ibadge{position:absolute;top:-4px;right:-4px;background:var(--red);color:#fff;border-radius:50%;width:16px;height:16px;font-size:.55rem;font-weight:700;display:flex;align-items:center;justify-content:center;}
.dark-toggle{background:var(--surface2);border:1.5px solid var(--border);width:38px;height:38px;border-radius:8px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:1rem;}
.user-av{width:34px;height:34px;border-radius:50%;background:var(--green);color:#fff;display:flex;align-items:center;justify-content:center;font-size:.78rem;font-weight:700;cursor:pointer;border:2px solid var(--green-pale);}
.role-chip{padding:3px 9px;border-radius:50px;font-size:.64rem;font-weight:700;border:none;cursor:default;}
.chip-buyer{background:#e3f2fd;color:#1565c0;}
.chip-seller{background:var(--green-pale);color:var(--green);}
.chip-delivery{background:#fff3cd;color:#856404;}
.chip-provider{background:#ede7f6;color:#6a1b9a;}

/* TABS */
.nav-tabs{background:var(--green);display:flex;padding:0 24px;overflow-x:auto;scrollbar-width:none;}
.nav-tabs::-webkit-scrollbar{display:none;}
.tab{color:rgba(255,255,255,.65);padding:9px 13px;font-size:.77rem;font-weight:500;cursor:pointer;border-bottom:2px solid transparent;white-space:nowrap;transition:all .2s;}
.tab:hover{color:#fff;}.tab.active{color:var(--yellow);border-bottom-color:var(--yellow);}

/* PAY STRIP */
.pay-strip{background:var(--surface2);border-bottom:1px solid var(--border);padding:6px 24px;display:flex;align-items:center;gap:14px;font-size:.7rem;color:var(--gray);}
.pay-methods{display:flex;gap:5px;}
.pm{background:var(--surface);border:1px solid var(--border);border-radius:5px;padding:2px 7px;font-weight:600;font-size:.67rem;}
.mtn-b{background:#1a1a1a;color:#ffcc00;border-color:#1a1a1a;}.ora-b{color:#ff6600;}
.strip-right{margin-left:auto;display:flex;gap:12px;}

/* HERO */
.hero{background:linear-gradient(135deg,#0a1410 0%,#1a3a24 55%,var(--green) 100%);padding:44px 24px 52px;position:relative;overflow:hidden;}
.hero::before{content:'';position:absolute;inset:0;background-image:radial-gradient(circle at 78% 50%,rgba(79,209,125,.09) 0%,transparent 58%);}
.hero-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center;position:relative;}
.hero-tag{display:inline-flex;align-items:center;gap:6px;background:rgba(252,209,22,.14);color:var(--yellow);border:1px solid rgba(252,209,22,.28);padding:4px 12px;border-radius:50px;font-size:.7rem;font-weight:600;letter-spacing:.5px;margin-bottom:13px;}
.hero h1{font-family:'Syne',sans-serif;font-size:clamp(1.6rem,3vw,2.6rem);font-weight:800;color:#fff;line-height:1.15;margin-bottom:11px;letter-spacing:-1px;}
.hero h1 em{color:#4fd17d;font-style:normal;}
.hero-sub{color:rgba(255,255,255,.52);font-size:.87rem;line-height:1.75;margin-bottom:24px;}
.hero-ctas{display:flex;gap:8px;margin-bottom:26px;flex-wrap:wrap;}
.cta-y{background:var(--yellow);color:#0d1f14;border:none;padding:10px 18px;border-radius:8px;font-family:'DM Sans',sans-serif;font-weight:700;font-size:.82rem;cursor:pointer;transition:all .2s;}
.cta-y:hover{background:#e8bf00;transform:translateY(-2px);}
.cta-w{background:rgba(255,255,255,.09);color:#fff;border:1px solid rgba(255,255,255,.22);padding:10px 18px;border-radius:8px;font-family:'DM Sans',sans-serif;font-weight:500;font-size:.82rem;cursor:pointer;}
.hero-stats{display:flex;gap:22px;flex-wrap:wrap;}
.stat-num{font-family:'Syne',sans-serif;font-size:1.4rem;font-weight:800;color:#b7e4c7;}
.stat-lbl{font-size:.67rem;color:rgba(255,255,255,.38);}
.hero-card{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:22px;backdrop-filter:blur(8px);}
.hc-title{font-family:'Syne',sans-serif;font-size:.93rem;font-weight:700;color:#fff;margin-bottom:12px;}
.sf{display:flex;background:#fff;border-radius:9px;overflow:hidden;margin-bottom:8px;}
.sf select,.sf input{border:none;padding:10px 11px;font-family:'DM Sans',sans-serif;font-size:.79rem;outline:none;background:transparent;color:#0d1f14;}
.sf select{background:#f0ece6;border-right:1px solid #e2ddd6;min-width:95px;}
.sbtn{width:100%;background:var(--green);color:#fff;border:none;padding:10px;border-radius:9px;font-family:'DM Sans',sans-serif;font-weight:600;font-size:.82rem;cursor:pointer;margin-bottom:8px;}
.pop-row{display:flex;flex-wrap:wrap;gap:5px;align-items:center;}
.pop-lbl{font-size:.67rem;color:rgba(255,255,255,.38);}
.pop-tag{background:rgba(255,255,255,.07);color:rgba(255,255,255,.65);border:1px solid rgba(255,255,255,.13);padding:2px 8px;border-radius:50px;font-size:.67rem;cursor:pointer;}
.pop-tag:hover{background:rgba(255,255,255,.15);color:#fff;}

/* SECTIONS */
.sec{max-width:1200px;margin:0 auto;padding:28px 24px;}
.sec-head{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:17px;}
.sec-title{font-family:'Syne',sans-serif;font-size:1.3rem;font-weight:800;color:var(--ink);letter-spacing:-.5px;}
.sec-link{font-size:.75rem;color:var(--green);font-weight:600;cursor:pointer;border-bottom:1px solid var(--green-light);}

/* PRODUITS */
.prod-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;}
.prod-card{background:var(--surface);border-radius:12px;overflow:hidden;cursor:pointer;transition:all .25s;border:1px solid var(--border);display:flex;flex-direction:column;}
.prod-card:hover{transform:translateY(-4px);box-shadow:0 10px 28px rgba(26,107,58,.12);}
.prod-img-wrap{position:relative;width:100%;height:160px;background:var(--surface2);overflow:hidden;flex-shrink:0;}
.prod-img-wrap img{width:100%;height:100%;object-fit:cover;}
.prod-img-placeholder{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:3rem;}
.pbadge-r{position:absolute;top:7px;left:7px;background:var(--red);color:#fff;font-size:.58rem;font-weight:700;padding:2px 6px;border-radius:50px;z-index:1;}
.pbadge-y{position:absolute;top:7px;right:7px;background:var(--yellow);color:#0d1f14;font-size:.58rem;font-weight:700;padding:2px 6px;border-radius:50px;z-index:1;}
.escrow-badge{position:absolute;bottom:6px;left:6px;background:var(--green);color:#fff;font-size:.55rem;font-weight:700;padding:2px 5px;border-radius:50px;z-index:1;}
.wish-btn{position:absolute;bottom:6px;right:6px;width:26px;height:26px;border-radius:50%;background:rgba(255,255,255,.9);border:none;cursor:pointer;font-size:.8rem;display:flex;align-items:center;justify-content:center;z-index:1;transition:transform .2s;}
.wish-btn:hover{transform:scale(1.15);}
.prod-info{padding:11px;display:flex;flex-direction:column;gap:5px;flex:1;}
.prod-name{font-size:.8rem;font-weight:600;color:var(--ink);line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
.prod-loc{font-size:.65rem;color:var(--gray);}
.prod-desc{font-size:.7rem;color:var(--gray);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;line-height:1.5;}
.prod-stock{font-size:.65rem;font-weight:600;}
.stock-ok{color:var(--green);}
.stock-low{color:#e67e22;}
.stock-out{color:var(--red);}
.prod-rating{display:flex;align-items:center;gap:4px;}
.stars-display{display:flex;gap:1px;}
.star{font-size:.7rem;}.star.filled{color:var(--gold);}.star.empty{color:var(--border);}
.rcount{font-size:.63rem;color:var(--gray);}
.prod-price-row{display:flex;align-items:center;justify-content:space-between;margin-top:auto;}
.price{font-family:'Syne',sans-serif;font-size:.95rem;font-weight:700;color:var(--green);}
.price-unit{font-size:.62rem;color:var(--gray);font-family:'DM Sans',sans-serif;font-weight:400;}
.add-btn{background:var(--green);color:#fff;border:none;width:26px;height:26px;border-radius:6px;font-size:.95rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s;}
.add-btn:hover{background:#0f4a28;}
.prod-actions{display:flex;gap:5px;margin-top:6px;}
.btn-wa-sm{background:var(--wa);color:#fff;border:none;padding:6px 9px;border-radius:7px;font-family:'DM Sans',sans-serif;font-weight:600;font-size:.68rem;cursor:pointer;display:flex;align-items:center;gap:4px;flex:1;justify-content:center;transition:all .2s;}
.btn-wa-sm:hover{filter:brightness(1.1);}
.btn-cmd-sm{background:var(--green);color:#fff;border:none;padding:6px 9px;border-radius:7px;font-family:'DM Sans',sans-serif;font-weight:600;font-size:.68rem;cursor:pointer;flex:1;display:flex;align-items:center;justify-content:center;gap:4px;transition:all .2s;}
.btn-cmd-sm:hover{background:#0f4a28;}

/* GALERIE IMAGES */
.img-gallery{display:flex;gap:6px;overflow-x:auto;padding:8px 0;scrollbar-width:thin;}
.img-gallery::-webkit-scrollbar{height:4px;}
.img-gallery-thumb{width:70px;height:70px;border-radius:7px;object-fit:cover;cursor:pointer;border:2px solid transparent;transition:border-color .2s;flex-shrink:0;}
.img-gallery-thumb.active{border-color:var(--green);}
.img-main{width:100%;height:200px;object-fit:cover;border-radius:10px;}

/* LOADING / EMPTY */
.loading{display:flex;align-items:center;justify-content:center;padding:48px;color:var(--gray);gap:10px;font-size:.9rem;}
.spinner{width:28px;height:28px;border:3px solid var(--border);border-top-color:var(--green);border-radius:50%;animation:spin .7s linear infinite;}
@keyframes spin{to{transform:rotate(360deg);}}
.empty-state{text-align:center;padding:48px;color:var(--gray);}
.empty-icon{font-size:3rem;margin-bottom:12px;}

/* MODALS */
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:500;display:flex;align-items:center;justify-content:center;padding:16px;}
.modal{background:var(--surface);border-radius:16px;padding:24px;width:100%;max-width:480px;position:relative;border:1px solid var(--border);max-height:92vh;overflow-y:auto;}
.modal-lg{max-width:640px;}
.modal-close{position:absolute;top:12px;right:12px;background:var(--surface2);border:none;width:28px;height:28px;border-radius:7px;cursor:pointer;font-size:.9rem;display:flex;align-items:center;justify-content:center;color:var(--gray);}
.modal-title{font-family:'Syne',sans-serif;font-size:1.2rem;font-weight:800;color:var(--ink);margin-bottom:3px;letter-spacing:-.5px;}
.modal-sub{font-size:.79rem;color:var(--gray);margin-bottom:18px;}

/* AUTH */
.auth-tabs{display:flex;background:var(--surface2);border-radius:8px;padding:3px;margin-bottom:16px;}
.auth-tab{flex:1;padding:7px;border-radius:6px;border:none;background:transparent;font-family:'DM Sans',sans-serif;font-size:.79rem;font-weight:500;cursor:pointer;color:var(--gray);}
.auth-tab.active{background:var(--surface);color:var(--ink);font-weight:600;box-shadow:0 1px 4px var(--shadow);}
.role-selector{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:15px;}
.role-card{border:2px solid var(--border);border-radius:10px;padding:12px;cursor:pointer;transition:all .2s;text-align:center;background:var(--surface);}
.role-card:hover{border-color:var(--green-mid);}
.role-card.selected{border-color:var(--green);background:var(--green-pale);}
.role-card .rc-icon{font-size:1.6rem;margin-bottom:5px;}
.role-card h4{font-size:.82rem;font-weight:600;color:var(--ink);}
.role-card p{font-size:.69rem;color:var(--gray);margin-top:2px;}

/* FORMS */
.form-group{display:flex;flex-direction:column;gap:4px;margin-bottom:11px;}
.form-label{font-size:.73rem;font-weight:600;color:var(--ink);}
.form-label span{color:var(--red);margin-left:2px;}
.form-input,.form-select{border:1.5px solid var(--border);border-radius:8px;padding:9px 10px;font-family:'DM Sans',sans-serif;font-size:.81rem;color:var(--ink);outline:none;transition:border-color .2s;background:var(--surface);width:100%;}
.form-input:focus,.form-select:focus{border-color:var(--green);}
.form-input.error,.form-select.error{border-color:var(--red);}
.form-textarea{border:1.5px solid var(--border);border-radius:8px;padding:9px 10px;font-family:'DM Sans',sans-serif;font-size:.81rem;color:var(--ink);outline:none;transition:border-color .2s;background:var(--surface);resize:vertical;min-height:80px;width:100%;}
.form-textarea:focus{border-color:var(--green);}
.form-error-text{font-size:.68rem;color:var(--red);margin-top:2px;}
.form-submit{width:100%;background:var(--green);color:#fff;border:none;padding:11px;border-radius:9px;font-family:'Syne',sans-serif;font-weight:700;font-size:.85rem;cursor:pointer;transition:all .2s;margin-top:5px;display:flex;align-items:center;justify-content:center;gap:7px;}
.form-submit:hover:not(:disabled){background:#0f4a28;}
.form-submit:disabled{opacity:.55;cursor:not-allowed;}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:11px;margin-bottom:0;}
.form-group.full{grid-column:1/-1;}
.divider{display:flex;align-items:center;gap:8px;margin:11px 0;color:var(--gray);font-size:.72rem;}
.divider::before,.divider::after{content:'';flex:1;height:1px;background:var(--border);}
.social-btn{width:100%;background:var(--surface2);border:1.5px solid var(--border);border-radius:8px;padding:9px;font-family:'DM Sans',sans-serif;font-size:.79rem;cursor:pointer;color:var(--ink);display:flex;align-items:center;justify-content:center;gap:7px;}
.success-msg{background:var(--green-pale);border:1px solid #c0ecd0;border-radius:10px;padding:12px 14px;color:var(--green);font-weight:600;font-size:.82rem;margin-bottom:12px;display:flex;align-items:center;gap:8px;}
.error-msg{background:#f8d7da;border:1px solid #f5c6cb;border-radius:10px;padding:12px 14px;color:#721c24;font-size:.8rem;margin-bottom:12px;display:flex;align-items:center;gap:8px;}
.info-msg{background:#e3f2fd;border:1px solid #bbdefb;border-radius:10px;padding:12px 14px;color:#1565c0;font-size:.8rem;margin-bottom:12px;}

/* IMG UPLOAD MULTI */
.img-upload-area{border:2px dashed var(--border);border-radius:9px;padding:18px;text-align:center;cursor:pointer;transition:all .2s;}
.img-upload-area:hover{border-color:var(--green);background:var(--green-pale);}
.img-upload-area.dragover{border-color:var(--green-mid);background:var(--green-pale);}
.img-upload-icon{font-size:2rem;margin-bottom:6px;}
.img-upload-text{font-size:.79rem;color:var(--gray);}
.img-upload-hint{font-size:.69rem;color:var(--gray);margin-top:3px;opacity:.7;}
.img-previews{display:flex;flex-wrap:wrap;gap:7px;margin-top:10px;}
.img-preview-item{position:relative;width:70px;height:70px;}
.img-preview-item img{width:100%;height:100%;object-fit:cover;border-radius:7px;border:1.5px solid var(--border);}
.img-preview-del{position:absolute;top:-5px;right:-5px;width:18px;height:18px;background:var(--red);color:#fff;border:none;border-radius:50%;cursor:pointer;font-size:.65rem;display:flex;align-items:center;justify-content:center;font-weight:700;}
.upload-progress{background:var(--surface2);border-radius:50px;height:6px;margin-top:8px;overflow:hidden;}
.upload-progress-bar{background:var(--green);height:100%;border-radius:50px;transition:width .3s;}

/* TRUST */
.trust{background:${dark?"#0a1410":"#0d1f14"};padding:18px 24px;}
.trust-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:11px;}
.ti{display:flex;align-items:center;gap:10px;color:rgba(255,255,255,.7);}
.ti-icon{font-size:1.6rem;}.ti h4{font-size:.78rem;font-weight:600;color:#fff;margin-bottom:1px;}.ti p{font-size:.66rem;opacity:.42;}

/* DASHBOARD */
.dash-layout{display:grid;grid-template-columns:220px 1fr;gap:0;min-height:75vh;max-width:1200px;margin:22px auto;padding:0 24px;}
.dash-sidebar{background:var(--surface);border-radius:13px;padding:18px;border:1px solid var(--border);height:fit-content;position:sticky;top:88px;overflow:hidden;}
.dash-avatar{width:60px;height:60px;border-radius:50%;background:var(--green);color:#fff;display:flex;align-items:center;justify-content:center;font-size:1.8rem;margin:0 auto 8px;}
.dash-name{font-family:'Syne',sans-serif;font-weight:800;font-size:.82rem;text-align:center;color:var(--ink);margin-bottom:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:180px;word-break:break-all;}
.dash-role-badge{text-align:center;margin-bottom:14px;}
.dash-nav{display:flex;flex-direction:column;gap:2px;}
.dash-nav-item{display:flex;align-items:center;gap:7px;padding:8px 11px;border-radius:8px;cursor:pointer;font-size:.8rem;color:var(--gray);font-weight:500;transition:all .2s;}
.dash-nav-item:hover{background:var(--surface2);color:var(--ink);}
.dash-nav-item.active{background:var(--green-pale);color:var(--green);font-weight:600;}
.dash-nav-divider{height:1px;background:var(--border);margin:7px 0;}
.dash-content{padding-left:18px;}
.dash-page-title{font-family:'Syne',sans-serif;font-weight:800;font-size:1.2rem;color:var(--ink);margin-bottom:16px;letter-spacing:-.5px;display:flex;align-items:center;gap:8px;}
.dash-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:11px;margin-bottom:20px;}
.dstat{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:15px;}
.dstat-icon{font-size:1.3rem;margin-bottom:6px;}
.dstat-val{font-family:'Syne',sans-serif;font-size:1.35rem;font-weight:800;color:var(--ink);}
.dstat-lbl{font-size:.7rem;color:var(--gray);margin-top:2px;}
.dstat-trend{font-size:.66rem;color:var(--green);font-weight:600;margin-top:3px;}

/* PRODUCT FORM */
.prod-form{background:var(--surface);border:1px solid var(--border);border-radius:13px;padding:22px;margin-bottom:20px;}
.pf-title{font-family:'Syne',sans-serif;font-weight:800;font-size:.98rem;color:var(--ink);margin-bottom:16px;display:flex;align-items:center;gap:6px;}

/* ORDERS */
.order-card{background:var(--surface);border:1px solid var(--border);border-radius:11px;padding:14px 16px;margin-bottom:10px;display:flex;align-items:center;gap:14px;}
.oc-icon{width:42px;height:42px;background:var(--surface2);border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0;}
.oc-info{flex:1;}
.oc-name{font-size:.84rem;font-weight:600;color:var(--ink);margin-bottom:2px;}
.oc-meta{font-size:.7rem;color:var(--gray);line-height:1.6;}
.oc-actions{display:flex;flex-direction:column;gap:5px;align-items:flex-end;}
.status-badge{padding:3px 8px;border-radius:50px;font-size:.64rem;font-weight:700;white-space:nowrap;}
.s-pending{background:#fff3cd;color:#856404;}
.s-paid{background:#d4edda;color:#1a6b3a;}
.s-shipped{background:#cce5ff;color:#004085;}
.s-delivered,.s-livre{background:#d4edda;color:#1a6b3a;}
.s-dispute,.s-echec{background:#f8d7da;color:#721c24;}
.s-cancelled{background:#e2e3e5;color:#383d41;}
.s-securise{background:#ede7f6;color:#6a1b9a;}
.s-libere{background:#d4edda;color:#1a6b3a;}
.s-rembourse{background:#cce5ff;color:#004085;}
.s-en_cours{background:#fff3cd;color:#856404;}
.btn-action-sm{background:var(--surface2);border:1px solid var(--border);border-radius:6px;padding:4px 10px;font-size:.69rem;cursor:pointer;color:var(--ink);font-family:'DM Sans',sans-serif;font-weight:500;transition:all .2s;}
.btn-action-sm:hover{background:var(--green-pale);border-color:var(--green);color:var(--green);}

/* AVIS */
.avis-section{margin-top:20px;}
.avis-card{background:var(--surface2);border-radius:10px;padding:13px;margin-bottom:8px;}
.avis-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:5px;}
.avis-auteur{font-size:.8rem;font-weight:600;color:var(--ink);}
.avis-date{font-size:.67rem;color:var(--gray);}
.avis-texte{font-size:.78rem;color:var(--gray);line-height:1.6;}
.star-input{display:flex;gap:3px;cursor:pointer;}
.star-input span{font-size:1.3rem;transition:transform .15s;}
.star-input span:hover{transform:scale(1.2);}

/* COMMISSION */
.commission-box{background:var(--green-pale);border:1px solid var(--green-light);border-radius:9px;padding:11px 14px;font-size:.77rem;color:var(--green);display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;}
.commission-box strong{font-family:'Syne',sans-serif;}

/* CART */
.cart-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:350;opacity:0;pointer-events:none;transition:opacity .3s;}
.cart-overlay.open{opacity:1;pointer-events:all;}
.cart-drawer{position:fixed;top:0;right:0;width:min(380px,100vw);height:100vh;background:var(--surface);z-index:351;transform:translateX(100%);transition:transform .35s cubic-bezier(.4,0,.2,1);display:flex;flex-direction:column;box-shadow:-4px 0 28px rgba(0,0,0,.13);}
.cart-drawer.open{transform:none;}
.cart-header{padding:15px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;}
.cart-title{font-family:'Syne',sans-serif;font-weight:800;font-size:.98rem;color:var(--ink);}
.cart-close{background:var(--surface2);border:none;width:28px;height:28px;border-radius:7px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--gray);}
.cart-items{flex:1;overflow-y:auto;padding:12px 18px;}
.cart-item{display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--border);}
.ci-img{width:42px;height:42px;background:var(--surface2);border-radius:9px;flex-shrink:0;overflow:hidden;}
.ci-img img{width:100%;height:100%;object-fit:cover;}
.ci-info{flex:1;}
.ci-name{font-size:.77rem;font-weight:500;color:var(--ink);margin-bottom:2px;}
.ci-price{font-family:'Syne',sans-serif;font-size:.84rem;font-weight:700;color:var(--green);}
.ci-qty{display:flex;align-items:center;gap:6px;margin-top:4px;}
.qty-btn{width:22px;height:22px;border:1.5px solid var(--border);background:var(--surface);border-radius:5px;cursor:pointer;font-size:.84rem;display:flex;align-items:center;justify-content:center;color:var(--ink);}
.qty-btn:hover{border-color:var(--green);}
.qty-val{font-size:.77rem;font-weight:600;min-width:16px;text-align:center;}
.ci-del{background:none;border:none;cursor:pointer;font-size:.88rem;color:var(--gray);}
.cart-footer{padding:14px 18px;border-top:1px solid var(--border);}
.cart-note{border-radius:8px;padding:8px 10px;display:flex;align-items:center;gap:7px;margin-bottom:9px;font-size:.72rem;font-weight:500;}
.note-escrow{background:var(--green-pale);color:var(--green);}
.cart-total-row{display:flex;justify-content:space-between;margin-bottom:4px;font-size:.8rem;}
.cart-total-row.big{font-family:'Syne',sans-serif;font-size:.98rem;font-weight:800;color:var(--ink);}
.cart-checkout{width:100%;background:var(--green);color:#fff;border:none;padding:11px;border-radius:9px;font-family:'Syne',sans-serif;font-weight:700;font-size:.85rem;cursor:pointer;margin-top:7px;}
.cart-wa{width:100%;background:var(--wa);color:#fff;border:none;padding:10px;border-radius:9px;font-family:'DM Sans',sans-serif;font-weight:700;font-size:.83rem;cursor:pointer;margin-top:6px;display:flex;align-items:center;justify-content:center;gap:6px;}

/* NOTIFS */
.notif-drawer{position:fixed;top:64px;right:16px;width:min(320px,calc(100vw - 32px));background:var(--surface);border-radius:12px;border:1px solid var(--border);box-shadow:0 6px 26px var(--shadow);z-index:400;overflow:hidden;}
.notif-header{padding:12px 14px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;}
.notif-title{font-family:'Syne',sans-serif;font-weight:700;font-size:.86rem;color:var(--ink);}
.notif-clear{font-size:.69rem;color:var(--green);cursor:pointer;font-weight:600;}
.notif-list{max-height:290px;overflow-y:auto;}
.notif-item{padding:10px 14px;border-bottom:1px solid var(--border);display:flex;gap:9px;cursor:pointer;transition:background .2s;}
.notif-item:hover{background:var(--surface2);}
.notif-item.unread{background:var(--green-pale);}
.notif-icon{font-size:1.2rem;flex-shrink:0;}
.notif-body h4{font-size:.77rem;font-weight:600;color:var(--ink);margin-bottom:2px;}
.notif-body p{font-size:.69rem;color:var(--gray);line-height:1.4;}
.notif-time{font-size:.62rem;color:var(--gray);margin-top:2px;}

/* PRESTATAIRES */
.prest-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;}
.prest-card{background:var(--surface);border:1px solid var(--border);border-radius:11px;padding:16px;cursor:pointer;transition:all .25s;}
.prest-card:hover{transform:translateY(-3px);box-shadow:0 7px 20px rgba(26,107,58,.09);border-color:var(--green-light);}
.prest-top{display:flex;align-items:center;gap:10px;margin-bottom:10px;}
.prest-av{width:46px;height:46px;border-radius:11px;background:var(--green-pale);display:flex;align-items:center;justify-content:center;font-size:1.4rem;}
.prest-name{font-family:'Syne',sans-serif;font-weight:700;font-size:.88rem;color:var(--ink);}
.prest-meta{font-size:.69rem;color:var(--gray);}
.prest-tags{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:9px;}
.ptag{background:var(--green-pale);color:var(--green);padding:2px 7px;border-radius:50px;font-size:.63rem;font-weight:600;}
.prest-footer{display:flex;align-items:center;justify-content:space-between;}
.prest-price{font-family:'Syne',sans-serif;font-size:.88rem;font-weight:700;color:var(--green);}
.btn-hire{background:var(--green);color:#fff;border:none;padding:5px 12px;border-radius:6px;font-family:'DM Sans',sans-serif;font-weight:600;font-size:.7rem;cursor:pointer;}

/* BLOG */
.blog-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;}
.blog-card{background:var(--surface);border:1px solid var(--border);border-radius:11px;overflow:hidden;cursor:pointer;transition:all .25s;}
.blog-card:hover{transform:translateY(-3px);}
.blog-img{height:120px;display:flex;align-items:center;justify-content:center;font-size:3rem;background:var(--surface2);}
.blog-body{padding:13px;}
.blog-cat{font-size:.63rem;font-weight:700;color:var(--green);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px;}
.blog-title{font-family:'Syne',sans-serif;font-size:.88rem;font-weight:700;color:var(--ink);margin-bottom:4px;line-height:1.35;}
.blog-excerpt{font-size:.73rem;color:var(--gray);line-height:1.55;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
.blog-footer{display:flex;align-items:center;justify-content:space-between;padding:8px 13px;border-top:1px solid var(--border);font-size:.67rem;color:var(--gray);}

/* ACADEMY */
.courses-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:11px;}
.course-card{background:var(--surface);border:1px solid var(--border);border-radius:11px;overflow:hidden;cursor:pointer;transition:all .25s;}
.course-card:hover{transform:translateY(-3px);}
.course-img{height:95px;display:flex;align-items:center;justify-content:center;font-size:2.7rem;}
.course-body{padding:12px;}
.course-level{font-size:.62rem;font-weight:700;text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px;}
.level-deb{color:#27a85a;}.level-int{color:#e67e22;}.level-adv{color:var(--red);}
.course-title{font-family:'Syne',sans-serif;font-size:.85rem;font-weight:700;color:var(--ink);margin-bottom:4px;}
.course-meta{font-size:.69rem;color:var(--gray);margin-bottom:8px;}
.course-footer{display:flex;align-items:center;justify-content:space-between;}
.course-price{font-family:'Syne',sans-serif;font-size:.88rem;font-weight:700;color:var(--green);}
.course-btn{background:var(--green);color:#fff;border:none;padding:5px 11px;border-radius:6px;font-size:.7rem;font-weight:600;cursor:pointer;}

/* ESCROW STEPS */
.escrow-steps{display:flex;flex-direction:column;gap:10px;}
.estep{display:flex;align-items:flex-start;gap:10px;}
.estep-num{width:24px;height:24px;background:var(--green);color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.69rem;font-weight:700;flex-shrink:0;margin-top:1px;}
.estep-text h4{font-size:.8rem;font-weight:600;color:var(--ink);margin-bottom:2px;}
.estep-text p{font-size:.73rem;color:var(--gray);line-height:1.5;}

/* WALLET */
.wallet-card{background:linear-gradient(135deg,#1a3a24,var(--green));border-radius:14px;padding:22px;color:#fff;margin-bottom:18px;}
.wc-label{font-family:'Syne',sans-serif;font-weight:700;font-size:.95rem;margin-bottom:4px;}
.wc-amount{font-family:'Syne',sans-serif;font-size:2.2rem;font-weight:800;color:var(--yellow);}
.wc-sub{font-size:.75rem;opacity:.65;margin-top:4px;}
.info-box{background:var(--surface2);border:1.5px dashed var(--border);border-radius:11px;padding:18px;text-align:center;color:var(--gray);font-size:.82rem;}
.info-box .info-icon{font-size:1.6rem;margin-bottom:8px;}

/* REWARDS */
.rewards-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;}
.reward-card{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:14px;text-align:center;}
.reward-icon{font-size:1.8rem;margin-bottom:5px;}
.reward-name{font-size:.78rem;font-weight:600;color:var(--ink);margin-bottom:3px;}
.reward-pts{font-size:.71rem;color:var(--gold);font-weight:600;}
.reward-btn{background:var(--green);color:#fff;border:none;padding:5px 11px;border-radius:6px;font-family:'DM Sans',sans-serif;font-size:.71rem;font-weight:600;cursor:pointer;margin-top:8px;width:100%;}

/* BUSSINESS */
.biz-hero{background:linear-gradient(135deg,#0a1410,#1a3a24);border-radius:14px;padding:28px;margin-bottom:16px;}
.biz-title{font-family:'Syne',sans-serif;font-size:1.4rem;font-weight:800;color:#fff;margin-bottom:8px;}
.biz-sub{color:rgba(255,255,255,.5);font-size:.84rem;line-height:1.7;margin-bottom:16px;}
.biz-feats{display:grid;grid-template-columns:repeat(2,1fr);gap:9px;margin-top:14px;}
.biz-feat{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:9px;padding:12px;}
.biz-feat h4{font-size:.79rem;font-weight:600;color:#fff;margin-bottom:2px;}
.biz-feat p{font-size:.69rem;color:rgba(255,255,255,.4);line-height:1.5;}

/* WA FLOAT */
.wa-float{position:fixed;bottom:20px;right:20px;z-index:500;display:flex;flex-direction:column;align-items:flex-end;gap:8px;}
.wa-btn{width:50px;height:50px;background:var(--wa);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 16px rgba(37,211,102,.4);border:none;font-size:1.5rem;transition:all .25s;position:relative;}
.wa-btn:hover{transform:scale(1.1);}
.wa-pulse{position:absolute;width:50px;height:50px;background:var(--wa);border-radius:50%;animation:waPulse 2s infinite;opacity:.3;}
@keyframes waPulse{0%{transform:scale(1);opacity:.3;}70%{transform:scale(1.65);opacity:0;}100%{opacity:0;}}
.wa-card{background:var(--surface);border-radius:12px;padding:13px;box-shadow:0 5px 22px var(--shadow);border:1px solid var(--border);min-width:220px;}
.wa-card-title{font-family:'Syne',sans-serif;font-weight:700;font-size:.82rem;color:var(--ink);margin-bottom:2px;}
.wa-card-sub{font-size:.69rem;color:var(--gray);margin-bottom:9px;}
.wa-link{display:flex;align-items:center;gap:6px;padding:8px 11px;border-radius:8px;text-decoration:none;font-family:'DM Sans',sans-serif;font-weight:600;font-size:.77rem;transition:all .2s;margin-bottom:5px;cursor:pointer;border:none;width:100%;}
.wa-link-green{background:var(--wa);color:#fff;}
.wa-link-ghost{background:var(--surface2);color:var(--ink);border:1.5px solid var(--border);}

/* NEWSLETTER */
.newsletter{background:linear-gradient(135deg,var(--green),#27a85a);border-radius:14px;padding:26px;text-align:center;margin:0 24px 26px;}
.nl-title{font-family:'Syne',sans-serif;font-size:1.2rem;font-weight:800;color:#fff;margin-bottom:5px;}
.nl-sub{font-size:.82rem;color:rgba(255,255,255,.68);margin-bottom:16px;}
.nl-form{display:flex;max-width:380px;margin:0 auto;gap:7px;}
.nl-input{flex:1;border:none;border-radius:8px;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:.82rem;outline:none;}
.nl-btn{background:var(--yellow);color:#0d1f14;border:none;padding:9px 16px;border-radius:8px;font-family:'Syne',sans-serif;font-weight:700;font-size:.79rem;cursor:pointer;}

/* FOOTER */
.footer{background:${dark?"#060d09":"#0a1a10"};color:rgba(255,255,255,.44);padding:34px 24px 18px;margin-top:32px;}
.footer-grid{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:2.5fr 1fr 1fr 1fr;gap:30px;margin-bottom:24px;}
.footer-logo{font-family:'Syne',sans-serif;font-size:1.4rem;font-weight:800;color:#b7e4c7;margin-bottom:7px;letter-spacing:-1px;}
.footer-logo span{color:var(--red);}
.footer-desc{font-size:.73rem;line-height:1.8;margin-bottom:10px;}
.footer-contact{font-size:.71rem;color:rgba(255,255,255,.34);display:flex;flex-direction:column;gap:3px;}
.footer-col h4{color:#fff;font-size:.75rem;font-weight:600;margin-bottom:10px;}
.footer-col ul{list-style:none;}
.footer-col ul li{font-size:.71rem;margin-bottom:7px;cursor:pointer;transition:color .2s;}
.footer-col ul li:hover{color:#b7e4c7;}
.footer-bottom{max-width:1200px;margin:0 auto;padding-top:14px;border-top:1px solid rgba(255,255,255,.07);display:flex;justify-content:space-between;font-size:.66rem;align-items:center;flex-wrap:wrap;gap:8px;}
.fb-badges{display:flex;gap:5px;flex-wrap:wrap;}
.fbb{background:rgba(255,255,255,.05);padding:2px 7px;border-radius:4px;font-size:.62rem;}

/* MOBILE NAV */
.mobile-nav{display:none;position:fixed;bottom:0;left:0;right:0;background:var(--surface);border-top:1px solid var(--border);padding:6px 0 0;z-index:400;box-shadow:0 -4px 20px var(--shadow);}
.mn-inner{display:flex;justify-content:space-around;align-items:center;padding-bottom:6px;}
.mn-item{display:flex;flex-direction:column;align-items:center;gap:2px;cursor:pointer;padding:4px 12px;border-radius:8px;transition:all .2s;position:relative;}
.mn-item.active .mn-icon,.mn-item.active .mn-label{color:var(--green);}
.mn-icon{font-size:1.25rem;color:var(--gray);}
.mn-label{font-size:.6rem;color:var(--gray);font-weight:500;}
.mn-badge{position:absolute;top:2px;right:6px;background:var(--red);color:#fff;border-radius:50%;width:14px;height:14px;font-size:.5rem;font-weight:700;display:flex;align-items:center;justify-content:center;}

/* MISC */
@keyframes fadeUp{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:none;}}
.anim{animation:fadeUp .35s ease both;}
.tag{background:var(--surface2);border:1px solid var(--border);border-radius:50px;padding:3px 9px;font-size:.68rem;font-weight:600;color:var(--gray);}
.divider-h{height:1px;background:var(--border);margin:16px 0;}

/* VENDOR BADGES */
.vendor-badge{padding:2px 7px;border-radius:4px;font-size:.6rem;font-weight:700;white-space:nowrap;}
.badge-top{background:#fff9e6;color:#b8860b;}
.badge-verif{background:#e6fff0;color:#1a6b3a;}
.badge-promo{background:#fff0e6;color:#d4520a;}
.badge-flash{background:#ffe6e6;color:#c0392b;}
.badge-best{background:#e6f0ff;color:#1a4a9a;}

/* FLASH CARD */
.prod-card-flash{border-color:#ff4444;box-shadow:0 0 0 1.5px rgba(255,68,68,.2);}
.prod-card-flash .prod-img-wrap::after{content:"⚡ FLASH";position:absolute;top:0;left:0;right:0;background:rgba(255,68,68,.85);color:#fff;font-size:.62rem;font-weight:800;text-align:center;padding:2px;letter-spacing:.5px;}
.pbadge-flash{position:absolute;top:7px;left:7px;background:#ff4444;color:#fff;font-size:.58rem;font-weight:800;padding:3px 7px;border-radius:50px;z-index:2;animation:flashPulse 1.5s infinite;}
@keyframes flashPulse{0%,100%{opacity:1;}50%{opacity:.6;}}
.pbadge-promo{position:absolute;top:7px;left:7px;background:#ff6b35;color:#fff;font-size:.62rem;font-weight:800;padding:3px 8px;border-radius:50px;z-index:2;}

/* TRUST BANNER */
.trust-banner{background:${dark?"#0f1f16":"#f0faf4"};border-bottom:1px solid ${dark?"#2a4030":"#c8f0d8"};padding:8px 20px;display:flex;align-items:center;justify-content:center;gap:20px;flex-wrap:wrap;}
.tb-item{display:flex;align-items:center;gap:5px;font-size:.72rem;font-weight:600;color:${dark?"#7aca94":"#1a6b3a"};}

/* HERO BADGES */
.hero-badges{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px;}
.hbadge{display:flex;align-items:center;gap:5px;background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.16);color:#fff;padding:5px 10px;border-radius:50px;font-size:.72rem;font-weight:600;}
.hbadge-green{background:rgba(79,209,125,.15);border-color:rgba(79,209,125,.3);color:#4fd17d;}
.hbadge-yellow{background:rgba(252,209,22,.12);border-color:rgba(252,209,22,.28);color:var(--yellow);}

/* PROD CARD BADGES */
.prod-badge-row{display:flex;gap:4px;flex-wrap:wrap;margin-bottom:5px;}
.pb{padding:2px 6px;border-radius:4px;font-size:.58rem;font-weight:700;white-space:nowrap;}
.pb-fire{background:#fff0e6;color:#d4520a;}
.pb-truck{background:#e6f4ff;color:#0066cc;}
.pb-cash{background:#e6fff0;color:#1a6b3a;}

/* WHY SECTION */
.why-section{background:${dark?"#0f1a14":"#f8fbf9"};border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:28px 24px;}
.why-inner{max-width:1200px;margin:0 auto;}
.why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:16px;}
.why-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:18px;text-align:center;}
.why-icon{font-size:2rem;margin-bottom:8px;}
.why-title{font-family:'Syne',sans-serif;font-weight:700;font-size:.85rem;color:var(--ink);margin-bottom:4px;}
.why-desc{font-size:.72rem;color:var(--gray);line-height:1.55;}

/* SOCIAL PROOF */
.proof-bar{background:linear-gradient(135deg,#0d1f14,#1a3a24);padding:12px 24px;display:flex;align-items:center;justify-content:center;gap:28px;flex-wrap:wrap;}
.proof-item{display:flex;align-items:center;gap:6px;color:rgba(255,255,255,.85);font-size:.75rem;font-weight:600;}
.proof-num{font-family:'Syne',sans-serif;font-size:1rem;font-weight:800;color:var(--yellow);}

/* WA STICKY */
.wa-sticky{display:none;position:fixed;bottom:0;left:0;right:0;z-index:450;background:var(--wa);padding:10px 16px;gap:8px;align-items:center;justify-content:center;box-shadow:0 -3px 16px rgba(0,0,0,.2);}
.wa-sticky-btn{background:#fff;color:#1a5c38;border:none;padding:8px 20px;border-radius:50px;font-family:'Syne',sans-serif;font-weight:800;font-size:.82rem;cursor:pointer;flex:1;max-width:260px;}
.wa-sticky-text{color:#fff;font-size:.75rem;font-weight:600;}

@media(max-width:768px){
  .topbar{display:none;}
  .navbar{padding:0 14px;height:56px;}
  .nav-search select{display:none;}
  .btn-ghost,.btn-green,.btn-red,.dark-toggle{display:none;}
  .hero-inner{grid-template-columns:1fr;}
  .hero-card{display:none;}
  .prod-grid{grid-template-columns:repeat(2,1fr);}
  .trust-inner{grid-template-columns:repeat(2,1fr);}
  .prest-grid,.blog-grid,.courses-grid{grid-template-columns:1fr;}
  .rewards-grid{grid-template-columns:repeat(2,1fr);}
  .biz-feats{grid-template-columns:1fr;}
  .why-grid{grid-template-columns:repeat(2,1fr);}
  .proof-bar{gap:14px;}
  .footer-grid{grid-template-columns:1fr 1fr;}
  .dash-layout{grid-template-columns:1fr;padding:0 14px;}
  .dash-sidebar{display:none;}
  .dash-content{padding-left:0;}
  .dash-stats{grid-template-columns:repeat(2,1fr);}
  .mobile-nav{display:block;}
  .wa-float{bottom:100px;}
  .wa-sticky{display:flex;}
  .form-row{grid-template-columns:1fr;}
  .hero-badges{gap:6px;}
  .hbadge{font-size:.68rem;padding:4px 8px;}
  .trust-banner{gap:12px;padding:8px 14px;}
  .tb-item{font-size:.68rem;}
  .prod-badge-row{gap:3px;}
  .pb{font-size:.55rem;}
}
`;

// ─────────────────────────────────────────────────────────────
// COMPOSANT : ÉTOILES (rating)
// ─────────────────────────────────────────────────────────────
function Stars({ value = 0, max = 5, onSelect = null, size = "normal" }) {
  const [hover, setHover] = useState(0);
  const current = hover || value;
  return (
    <div className={`stars-display${onSelect ? " star-input" : ""}`} style={{ cursor: onSelect ? "pointer" : "default" }}>
      {Array.from({ length: max }, (_, i) => i + 1).map(n => (
        <span
          key={n}
          className={`star ${n <= current ? "filled" : "empty"}`}
          style={{ fontSize: size === "lg" ? "1.4rem" : ".72rem" }}
          onClick={() => onSelect && onSelect(n)}
          onMouseEnter={() => onSelect && setHover(n)}
          onMouseLeave={() => onSelect && setHover(0)}
        >★</span>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// COMPOSANT : MODAL COMMANDER (Commande + WhatsApp)
// ─────────────────────────────────────────────────────────────
function ModalCommander({ product, user, userData, onClose, onSuccess }) {
  const [nom, setNom]         = useState(userData?.nom || "");
  const [tel, setTel]         = useState(userData?.telephone || "");
  const [payMode, setPayMode] = useState(""); // "om" | "momo" | "visa"
  const [loading, setLoading] = useState(false);
  const [errors, setErrors]   = useState({});
  const [done, setDone]       = useState(false);

  const validate = () => {
    const e = {};
    if (!nom.trim()) e.nom = "Nom obligatoire";
    if (!tel.trim()) e.tel = "Téléphone obligatoire";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleCommander = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await creerCommandeSupabase({ product, clientNom: nom, telephone: tel, userId: user?.id || null });
      setDone(true);
      setTimeout(() => { onSuccess?.(); onClose(); }, 2000);
    } catch (err) {
      console.error("creerCommande:", err);
      alert("Erreur lors de la commande : " + err.message);
    }
    setLoading(false);
  };

  const commission  = Math.round(product.prix * COMMISSION_RATE);
  const netVendeur  = product.prix - commission;

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-title">📦 Commander ce produit</div>
        <p className="modal-sub">{product?.name_fr || "Produit Yorix"}</p>

        {done ? (
          <div className="success-msg">✅ Commande créée avec succès ! Vous serez contacté(e) sous peu.</div>
        ) : (
          <>
            {/* Résumé prix */}
            <div style={{ background:"var(--surface2)", borderRadius:10, padding:"12px 14px", marginBottom:16 }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:".88rem" }}>
                <span style={{ color:"var(--gray)" }}>💰 Total à payer</span>
                <strong style={{color:"var(--green)",fontFamily:"'Syne',sans-serif",fontSize:"1rem"}}>{product.prix?.toLocaleString()} FCFA</strong>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Votre nom <span>*</span></label>
              <input className={`form-input${errors.nom ? " error" : ""}`} placeholder="Ex: Amina Bello" value={nom} onChange={e => setNom(e.target.value)} />
              {errors.nom && <span className="form-error-text">{errors.nom}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Téléphone <span>*</span></label>
              <input className={`form-input${errors.tel ? " error" : ""}`} placeholder="+237 6XX XXX XXX" value={tel} onChange={e => setTel(e.target.value)} />
              {errors.tel && <span className="form-error-text">{errors.tel}</span>}
            </div>

            {/* ── MODE DE PAIEMENT ── */}
            <div style={{marginBottom:14}}>
              <div style={{fontSize:".78rem",fontWeight:700,color:"var(--ink)",marginBottom:8}}>💳 Choisir un mode de paiement</div>
              <div style={{display:"flex",flexDirection:"column",gap:7}}>
                {[
                  {id:"om",   label:"Orange Money", icon:"🔶", color:"#ff6600"},
                  {id:"momo", label:"MTN MoMo",     icon:"📱", color:"#ffcc00"},
                  {id:"visa", label:"Carte Visa",   icon:"💳", color:"#1a6b9a"},
                ].map(opt => (
                  <div
                    key={opt.id}
                    onClick={() => setPayMode(opt.id)}
                    style={{
                      border:`2px solid ${payMode===opt.id?opt.color:"var(--border)"}`,
                      borderRadius:9,padding:"10px 14px",cursor:"pointer",
                      background:payMode===opt.id?"var(--surface2)":"var(--surface)",
                      display:"flex",alignItems:"center",gap:10,transition:"all .2s",
                    }}
                  >
                    <span style={{fontSize:"1.3rem"}}>{opt.icon}</span>
                    <span style={{fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".83rem",color:"var(--ink)"}}>{opt.label}</span>
                    {payMode===opt.id && <span style={{marginLeft:"auto",color:opt.color,fontWeight:700,fontSize:".75rem"}}>✅ Sélectionné</span>}
                  </div>
                ))}
              </div>

              {/* Instructions par mode */}
              {payMode==="om" && (
                <div style={{marginTop:10,background:"#fff4e6",border:"1px solid #ffcc88",borderRadius:9,padding:"12px 14px"}}>
                  <div style={{fontWeight:700,fontSize:".82rem",color:"#cc5500",marginBottom:4}}>🔶 Orange Money</div>
                  <div style={{fontSize:".82rem",color:"#883300",marginBottom:6}}>Envoyez le paiement au numéro Orange Money :<br/><strong style={{fontSize:"1rem"}}>+237 696 56 56 54</strong></div>
                  <div style={{fontSize:".75rem",color:"#666",display:"flex",alignItems:"center",gap:5}}>
                    <span>📲</span>
                    <span style={{color:"#1a6b3a",fontWeight:600}}>Après paiement, envoyez la preuve via WhatsApp pour validation rapide</span>
                  </div>
                  <a href="https://wa.me/237696565654?text=Preuve%20de%20paiement%20Orange%20Money" target="_blank" rel="noreferrer"
                    style={{display:"inline-flex",alignItems:"center",gap:5,marginTop:8,background:"#25D366",color:"#fff",padding:"6px 12px",borderRadius:6,fontSize:".73rem",fontWeight:700,textDecoration:"none"}}>
                    📱 Envoyer la preuve WhatsApp
                  </a>
                </div>
              )}
              {payMode==="momo" && (
                <div style={{marginTop:10,background:"#fffbe6",border:"1px solid #ffdd44",borderRadius:9,padding:"12px 14px"}}>
                  <div style={{fontWeight:700,fontSize:".82rem",color:"#886600",marginBottom:4}}>📱 MTN MoMo</div>
                  <div style={{fontSize:".82rem",color:"#664400",marginBottom:6}}>Envoyez le paiement au numéro MTN MoMo :<br/><strong style={{fontSize:"1rem"}}>+237 676 93 51 95</strong></div>
                  <div style={{fontSize:".75rem",color:"#666",display:"flex",alignItems:"center",gap:5}}>
                    <span>📲</span>
                    <span style={{color:"#1a6b3a",fontWeight:600}}>Après paiement, envoyez la preuve via WhatsApp pour validation rapide</span>
                  </div>
                  <a href="https://wa.me/237696565654?text=Preuve%20de%20paiement%20MTN%20MoMo" target="_blank" rel="noreferrer"
                    style={{display:"inline-flex",alignItems:"center",gap:5,marginTop:8,background:"#25D366",color:"#fff",padding:"6px 12px",borderRadius:6,fontSize:".73rem",fontWeight:700,textDecoration:"none"}}>
                    📱 Envoyer la preuve WhatsApp
                  </a>
                </div>
              )}
              {payMode==="visa" && (
                <div style={{marginTop:10,background:"#e6f0ff",border:"1px solid #aaccff",borderRadius:9,padding:"12px 14px"}}>
                  <div style={{fontWeight:700,fontSize:".82rem",color:"#003388",marginBottom:4}}>💳 Carte Visa</div>
                  <div style={{fontSize:".82rem",color:"#334"}}>Paiement par carte indisponible pour le moment.<br/>Veuillez choisir Orange Money ou MTN MoMo.</div>
                </div>
              )}
            </div>

            <button
              className="form-submit"
              onClick={handleCommander}
              disabled={loading || !payMode || payMode==="visa"}
              style={{opacity:(!payMode||payMode==="visa")?0.5:1}}
            >
              {loading
                ? <><div className="spinner" style={{width:16,height:16,borderWidth:2}}/>Enregistrement...</>
                : !payMode
                  ? "Choisissez un mode de paiement"
                  : payMode==="visa"
                    ? "Carte indisponible — choisir MoMo/OM"
                    : "✅ Confirmer la commande"
              }
            </button>
            <p style={{fontSize:".7rem",color:"var(--gray)",textAlign:"center",marginTop:6}}>
              ⚡ Votre commande sera traitée après confirmation du paiement
            </p>

            <div className="divider">ou</div>
            <button
              className="btn-wa"
              style={{width:"100%",justifyContent:"center",padding:"11px",borderRadius:9,fontSize:".85rem"}}
              onClick={() => commanderWhatsApp(product, nom)}
            >
              📱 Commander via WhatsApp
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// COMPOSANT : FORMULAIRE AVIS
// ─────────────────────────────────────────────────────────────
function FormulaireAvis({ productId, userId, userName, onSubmit }) {
  const [note, setNote]       = useState(0);
  const [texte, setTexte]     = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);

  const submit = async () => {
    if (!note) { alert("Choisissez une note !"); return; }
    if (!texte.trim()) { alert("Rédigez un commentaire !"); return; }
    setLoading(true);
    try {
      await supabase.from("reviews").insert({
        product_id: productId,
        user_id: userId || null,
        auteur: userName || "Anonyme",
        note,
        texte,
      });
      setDone(true);
      onSubmit?.({ auteur: userName || "Anonyme", note, texte });
    } catch (err) {
      console.error("FormulaireAvis:", err);
    }
    setLoading(false);
  };

  if (done) return <div className="success-msg">✅ Merci pour votre avis !</div>;

  return (
    <div style={{ background:"var(--surface2)", borderRadius:12, padding:16, marginBottom:12 }}>
      <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:".88rem", color:"var(--ink)", marginBottom:10 }}>Laisser un avis</div>
      <div style={{ marginBottom:10 }}>
        <div style={{ fontSize:".73rem", fontWeight:600, color:"var(--ink)", marginBottom:5 }}>Note :</div>
        <Stars value={note} onSelect={setNote} size="lg" />
      </div>
      <textarea
        className="form-textarea"
        style={{ minHeight:65 }}
        placeholder="Votre commentaire..."
        value={texte}
        onChange={e => setTexte(e.target.value)}
      />
      <button className="form-submit" style={{ marginTop:8 }} onClick={submit} disabled={loading || !note}>
        {loading ? "⏳ Envoi..." : "📝 Publier l'avis"}
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// COMPOSANT : FICHE PRODUIT DÉTAIL
// ─────────────────────────────────────────────────────────────
function FicheProduit({ product, user, userData, onClose, onAddToCart }) {
  const [activeImg, setActiveImg]   = useState(0);
  const [avis, setAvis]             = useState([]);
  const [showCmdModal, setShowCmdModal] = useState(false);

  // Guard contre product null/undefined → évite la page blanche
  if (!product || !product.id) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal" style={{textAlign:"center",padding:40}}>
          <div style={{fontSize:"2.5rem",marginBottom:12}}>⚠️</div>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,color:"var(--ink)",marginBottom:8}}>Produit introuvable</div>
          <p style={{color:"var(--gray)",fontSize:".82rem",marginBottom:16}}>Ce produit n'est plus disponible.</p>
          <button className="form-submit" style={{width:"auto",padding:"9px 20px"}} onClick={onClose}>Fermer</button>
        </div>
      </div>
    );
  }

  // Priorité : p.image en premier, puis image_urls[], filtrer les URL non-http
  const rawImgs = product.image && product.image.startsWith("http")
    ? [product.image, ...(product.image_urls || []).filter(u => u && u.startsWith("http") && u !== product.image)]
    : (product.image_urls || []).filter(u => u && u.startsWith("http"));
  const images = rawImgs.length > 0 ? rawImgs : [];

  useEffect(() => {
    supabase.from("reviews").select("*").eq("product_id", product.id).order("created_at", { ascending: false }).then(({ data }) => setAvis(data || []));
  }, [product.id]);

  const avgNote = avis.length ? (avis.reduce((a, r) => a + r.note, 0) / avis.length).toFixed(1) : product.note || 0;

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal modal-lg">
        <button className="modal-close" onClick={onClose}>✕</button>

        {/* Images */}
        {images.length > 0 ? (
          <div style={{ marginBottom:16 }}>
            <img
              src={images[activeImg]}
              alt={product.name_fr}
              className="img-main"
              onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = "https://via.placeholder.com/300?text=Yorix"; }}
            />
            {images.length > 1 && (
              <div className="img-gallery">
                {images.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt=""
                    className={`img-gallery-thumb${i === activeImg ? " active" : ""}`}
                    onClick={() => setActiveImg(i)}
                    onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = "https://via.placeholder.com/80?text=📦"; }}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div style={{ height:140, background:"var(--surface2)", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"4rem", marginBottom:16 }}>📦</div>
        )}

        {/* Infos */}
        <div className="modal-title">{product.name_fr}</div>
        <div style={{ display:"flex", alignItems:"center", gap:8, margin:"6px 0 10px" }}>
          <Stars value={Math.round(avgNote)} />
          <span style={{ fontSize:".75rem", color:"var(--gray)" }}>{avgNote} / 5 ({avis.length} avis)</span>
          {product.ville && <span className="tag">📍 {product.ville}</span>}
          {product.categorie && <span className="tag">{product.categorie}</span>}
        </div>

        {product.description_fr && (
          <p style={{ fontSize:".82rem", color:"var(--gray)", lineHeight:1.75, marginBottom:12 }}>{product.description_fr}</p>
        )}

        {/* Stock */}
        {product.stock !== undefined && product.stock !== null && (
          <div style={{ marginBottom:10 }}>
            <span className={`prod-stock ${product.stock > 5 ? "stock-ok" : product.stock > 0 ? "stock-low" : "stock-out"}`}>
              {product.stock > 5 ? `✅ En stock (${product.stock})` : product.stock > 0 ? `⚠️ Plus que ${product.stock} en stock !` : "❌ Rupture de stock"}
            </span>
          </div>
        )}

        {/* Prix */}
        <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.5rem", fontWeight:800, color:"var(--green)", marginBottom:14 }}>
          {product.prix?.toLocaleString()} <span style={{ fontSize:".8rem", fontFamily:"'DM Sans',sans-serif", fontWeight:400, color:"var(--gray)" }}>FCFA</span>
        </div>

        {/* Escrow */}
        {product.escrow && (
          <div className="commission-box" style={{ marginBottom:12 }}>
            <span>🔐 Paiement protégé Escrow Yorix</span>
            <span style={{ fontSize:".68rem" }}>Fonds libérés à la livraison</span>
          </div>
        )}

        {/* Actions */}
        <div style={{ display:"flex", gap:8, marginBottom:16 }}>
          <button className="btn-wa" style={{ flex:1, justifyContent:"center", padding:"10px" }} onClick={() => commanderWhatsApp(product, userData?.nom)}>
            📱 Commander via WhatsApp
          </button>
          <button className="btn-cmd-sm" style={{ flex:1, padding:"10px" }} onClick={() => setShowCmdModal(true)}>
            ✅ Commander
          </button>
          {onAddToCart && (
            <button onClick={() => { onAddToCart(product); onClose(); }} style={{ background:"var(--surface2)", border:"1.5px solid var(--border)", borderRadius:8, padding:"10px 14px", cursor:"pointer", fontSize:".85rem" }}>
              🛒
            </button>
          )}
        </div>

        <div className="divider-h"/>

        {/* Avis */}
        <div className="avis-section">
          <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:".95rem", color:"var(--ink)", marginBottom:12 }}>
            💬 Avis clients ({avis.length})
          </div>
          {user && (
            <FormulaireAvis
              productId={product.id}
              userId={user.id}
              userName={userData?.nom || user.email}
              onSubmit={newAvis => setAvis(prev => [{ ...newAvis, id: Date.now() }, ...prev])}
            />
          )}
          {avis.length === 0 ? (
            <div style={{ fontSize:".8rem", color:"var(--gray)", textAlign:"center", padding:"12px 0" }}>Aucun avis pour l'instant.</div>
          ) : avis.map(a => (
            <div key={a.id} className="avis-card">
              <div className="avis-header">
                <div>
                  <span className="avis-auteur">{a.auteur}</span>
                  <Stars value={a.note} />
                </div>
                <span className="avis-date">{a.created_at ? new Date(a.created_at).toLocaleDateString("fr-FR") : ""}</span>
              </div>
              <p className="avis-texte">{a.texte}</p>
            </div>
          ))}
        </div>

        {showCmdModal && (
          <ModalCommander product={product} user={user} userData={userData} onClose={() => setShowCmdModal(false)} />
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// COMPOSANT : COMPTE À REBOURS OFFRE FLASH
// ─────────────────────────────────────────────────────────────
function FlashCountdown() {
  const getSecondsLeft = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(23, 59, 59, 999);
    return Math.floor((midnight - now) / 1000);
  };
  const [secs, setSecs] = useState(getSecondsLeft);
  useEffect(() => {
    const t = setInterval(() => setSecs(s => s > 0 ? s - 1 : getSecondsLeft()), 1000);
    return () => clearInterval(t);
  }, []);
  const h = String(Math.floor(secs / 3600)).padStart(2, "0");
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");
  return (
    <div style={{display:"flex",gap:4,alignItems:"center"}}>
      {[h,m,s].map((v,i) => (
        <span key={i} style={{display:"flex",alignItems:"center",gap:4}}>
          <span style={{background:"var(--red)",color:"#fff",padding:"2px 7px",borderRadius:5,fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".82rem",minWidth:30,textAlign:"center"}}>{v}</span>
          {i < 2 && <span style={{fontWeight:800,color:"var(--red)",fontSize:".82rem"}}>:</span>}
        </span>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// COMPOSANT : GRILLE PRODUITS
// ─────────────────────────────────────────────────────────────
function ProdGrid({ prods, user, userData, onAddToCart, onWish, wishlist }) {
  const [ficheOpen, setFicheOpen] = useState(null);
  const [cmdOpen, setCmdOpen]     = useState(null);

  // ── Image sécurisée
  const getSafeImg = (p) => {
    if (p.image && p.image.startsWith("http")) return p.image;
    if (p.image_urls && p.image_urls[0] && p.image_urls[0].startsWith("http")) return p.image_urls[0];
    return null;
  };

  // ── Badges vendeur (simulés selon données produit)
  const getVendeurBadges = (p) => {
    const badges = [];
    if (p.sponsorise)                      badges.push({label:"⭐ Top Vendeur",   cls:"badge-top"});
    if (p.verifie || p.vendeur_verifie)    badges.push({label:"✅ Vérifié",        cls:"badge-verif"});
    if (p.promo)                            badges.push({label:"🔥 Promo du jour", cls:"badge-promo"});
    if (p.flash)                            badges.push({label:"⚡ Offre flash",   cls:"badge-flash"});
    if (p.vente_total > 50)                 badges.push({label:"🏆 Best seller",   cls:"badge-best"});
    return badges;
  };

  return (
    <>
      <div className="prod-grid">
        {prods.map((p, _idx) => {
          const safeImg    = getSafeImg(p);
          const stockClass = p.stock > 5 ? "stock-ok" : p.stock > 0 ? "stock-low" : "stock-out";
          const vendBadges = getVendeurBadges(p);
          const prixPromo  = p.promo_pct ? Math.round(p.prix * (1 - p.promo_pct / 100)) : null;
          const cardKey    = p.id ? `prod-${p.id}` : `prod-idx-${_idx}`;
          const isLiked    = wishlist.has(p.id);

          return (
            <div key={cardKey} className={`prod-card${p.flash?" prod-card-flash":""}`}>

              {/* ── IMAGE ── */}
              <div className="prod-img-wrap" onClick={() => { if(p && p.id) setFicheOpen(p); }}>
                {safeImg ? (
                  <img
                    src={safeImg}
                    alt={p.name_fr}
                    onError={e => { e.currentTarget.onerror=null; e.currentTarget.src="https://via.placeholder.com/300?text=📦"; }}
                  />
                ) : (
                  <div className="prod-img-placeholder">📦</div>
                )}
                {/* Badge haut gauche */}
                {p.flash    && <span className="pbadge-flash">⚡ Flash</span>}
                {!p.flash && p.promo && <span className="pbadge-promo">-{p.promo_pct||20}%</span>}
                {!p.flash && !p.promo && p.sponsorise && <span className="pbadge-r">⭐ Top</span>}
                {/* Badge haut droit */}
                {p.local && <span className="pbadge-y">🇨🇲</span>}
                {/* Escrow bas gauche */}
                {p.escrow && <span className="escrow-badge">🔐</span>}
                {/* Wishlist */}
                <button className="wish-btn" onClick={e => { e.stopPropagation(); if(p.id) onWish(p.id); }}>
                  {isLiked ? "❤️" : "🤍"}
                </button>
              </div>

              {/* ── INFOS ── */}
              <div className="prod-info" onClick={() => { if(p && p.id) setFicheOpen(p); }}>
                {/* Badges vendeur */}
                {vendBadges.length > 0 && (
                  <div style={{display:"flex",gap:3,flexWrap:"wrap",marginBottom:4}}>
                    {vendBadges.map(b=>(
                      <span key={b.label} className={`vendor-badge ${b.cls}`}>{b.label}</span>
                    ))}
                  </div>
                )}

                <div className="prod-name">{p.name_fr}</div>
                {/* Infos vendeur bien visible sous le nom */}
                <div style={{display:"flex",alignItems:"center",gap:6,padding:"4px 0 2px",borderBottom:"1px solid var(--border)",marginBottom:3}}>
                  <div style={{width:22,height:22,borderRadius:"50%",background:"var(--green)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:".65rem",fontWeight:800,flexShrink:0}}>
                    {p.vendeur_nom?.[0]?.toUpperCase()||"V"}
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:".71rem",fontWeight:700,color:"var(--ink)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                      {p.vendeur_nom||"Vendeur Yorix"}
                      {p.sponsorise && <span style={{marginLeft:4,fontSize:".58rem",background:"#fff9e6",color:"#b8860b",padding:"1px 5px",borderRadius:3,fontWeight:700}}>⭐ Top</span>}
                      {p.verifie && <span style={{marginLeft:3,fontSize:".58rem",background:"#e6fff0",color:"#1a6b3a",padding:"1px 5px",borderRadius:3,fontWeight:700}}>✅</span>}
                    </div>
                    <div style={{fontSize:".62rem",color:"var(--gray)"}}>📍 {p.ville||"Cameroun"}</div>
                  </div>
                </div>

                {/* Badges conversion */}
                <div className="prod-badge-row">
                  {p.stock > 0 && p.stock <= 5 && <span className="pb pb-fire">🔥 Stock limité</span>}
                  <span className="pb pb-truck">🚚 Livraison rapide</span>
                  <span className="pb pb-cash">💰 Paiement MoMo/OM</span>
                </div>

                {p.description_fr && <div className="prod-desc">{p.description_fr}</div>}

                {p.stock !== undefined && p.stock !== null && (
                  <div className={`prod-stock ${stockClass}`} style={{ fontSize:".65rem" }}>
                    {p.stock > 5 ? `✅ ${p.stock} en stock` : p.stock > 0 ? `⚠️ ${p.stock} restant(s)` : "❌ Rupture"}
                  </div>
                )}

                <div className="prod-rating">
                  <Stars value={Math.round(p.note || 0)} />
                  <span className="rcount">({p.nombre_avis || 0})</span>
                </div>

                <div className="prod-price-row">
                  <div>
                    {prixPromo ? (
                      <>
                        <span className="price">{prixPromo.toLocaleString()} <span className="price-unit">FCFA</span></span>
                        <span style={{fontSize:".65rem",color:"var(--gray)",textDecoration:"line-through",marginLeft:5}}>{p.prix?.toLocaleString()}</span>
                      </>
                    ) : (
                      <span className="price">{p.prix?.toLocaleString()} <span className="price-unit">FCFA</span></span>
                    )}
                  </div>
                  <button className="add-btn" onClick={e => { e.stopPropagation(); onAddToCart(p); }}>+</button>
                </div>
              </div>

              {/* ── BOUTON WA ── */}
              <div className="prod-actions" style={{ padding:"0 11px 11px" }}>
                <button
                  className="btn-wa-sm"
                  onClick={e => { e.stopPropagation(); commanderWhatsApp(p, userData?.nom); }}
                >
                  📱 Commander via WhatsApp
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {ficheOpen && (
        <FicheProduit product={ficheOpen} user={user} userData={userData} onClose={() => setFicheOpen(null)} onAddToCart={onAddToCart} />
      )}
      {cmdOpen && (
        <ModalCommander product={cmdOpen} user={user} userData={userData} onClose={() => setCmdOpen(null)} />
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// COMPOSANT : FORMULAIRE AJOUT PRODUIT (multi-images)
// ─────────────────────────────────────────────────────────────
function FormulaireProduit({ user, userData, onSaved }) {
  const [form, setForm]           = useState({ name_fr:"", name_en:"", description_fr:"", prix:"", stock:"", categorie:"", ville:"", escrow:true });
  const [images, setImages]       = useState([]);          // File[]
  const [previews, setPreviews]   = useState([]);          // string[]
  const [errors, setErrors]       = useState({});
  const [saving, setSaving]       = useState(false);
  const [progress, setProgress]   = useState(0);
  const [saved, setSaved]         = useState(false);
  const [saveError, setSaveError] = useState("");
  const inputRef = useRef(null);

  const handleFiles = (files) => {
    const arr = Array.from(files).slice(0, 8); // max 8 images
    setImages(prev => [...prev, ...arr].slice(0, 8));
    const urls = arr.map(f => URL.createObjectURL(f));
    setPreviews(prev => [...prev, ...urls].slice(0, 8));
  };

  const removeImage = (i) => {
    setImages(prev => prev.filter((_, idx) => idx !== i));
    setPreviews(prev => prev.filter((_, idx) => idx !== i));
  };

  const validate = () => {
    const e = {};
    if (!form.name_fr.trim()) e.name_fr = "Nom obligatoire";
    if (!form.prix || isNaN(Number(form.prix))) e.prix = "Prix invalide";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const save = async () => {
    if (!validate()) return;
    setSaving(true); setSaveError(""); setProgress(10);

    try {
      let imageUrls = [];

      if (images.length > 0) {
        setProgress(20);
        // Upload en parallèle
        const uploads = images.map((f, i) =>
          uploadSingleImage(f).then(url => {
            setProgress(20 + Math.round((i + 1) / images.length * 50));
            return url;
          })
        );
        imageUrls = (await Promise.all(uploads)).filter(Boolean);
      }

      setProgress(80);

      const { error } = await supabase.from("products").insert({
        name_fr:       form.name_fr,
        name_en:       form.name_en || form.name_fr,
        description_fr: form.description_fr,
        prix:          Number(form.prix),
        stock:         Number(form.stock || 0),
        categorie:     form.categorie || "Autre",
        ville:         form.ville || "Douala",
        image:         imageUrls[0] || null,
        image_urls:    imageUrls,
        vendeur_id:    user.id,
        vendeur_nom:   userData?.nom || "",
        actif:         true,
        sponsorise:    false,
        escrow:        form.escrow,
        local:         true,
        vues:          0,
        clics:         0,
        vente_total:   0,
        note:          0,
        nombre_avis:   0,
      });

      if (error) throw error;

      setProgress(100);
      setSaved(true);
      setForm({ name_fr:"", name_en:"", description_fr:"", prix:"", stock:"", categorie:"", ville:"", escrow:true });
      setImages([]); setPreviews([]);
      setTimeout(() => { setSaved(false); setProgress(0); }, 3500);
      onSaved?.();

    } catch (err) {
      console.error("FormulaireProduit save:", err);
      setSaveError("Erreur : " + err.message);
      setProgress(0);
    }
    setSaving(false);
  };

  return (
    <div className="prod-form">
      <div className="pf-title">➕ Nouveau produit</div>

      {saved    && <div className="success-msg">✅ Produit publié ! Il est visible sur la plateforme.</div>}
      {saveError && <div className="error-msg">❌ {saveError}</div>}

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Nom du produit (FR) <span>*</span></label>
          <input className={`form-input${errors.name_fr?" error":""}`} placeholder="Ex: Sac tissé Bamoun" value={form.name_fr} onChange={e => setForm(f=>({...f,name_fr:e.target.value}))} />
          {errors.name_fr && <span className="form-error-text">{errors.name_fr}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Nom (EN)</label>
          <input className="form-input" placeholder="Ex: Bamoun woven bag" value={form.name_en} onChange={e => setForm(f=>({...f,name_en:e.target.value}))} />
        </div>
        <div className="form-group full">
          <label className="form-label">Description détaillée</label>
          <textarea className="form-textarea" placeholder="Matière, dimensions, utilisation, état..." value={form.description_fr} onChange={e => setForm(f=>({...f,description_fr:e.target.value}))} />
        </div>
        <div className="form-group">
          <label className="form-label">Prix (FCFA) <span>*</span></label>
          <input className={`form-input${errors.prix?" error":""}`} type="number" min="0" placeholder="Ex: 25000" value={form.prix} onChange={e => setForm(f=>({...f,prix:e.target.value}))} />
          {errors.prix && <span className="form-error-text">{errors.prix}</span>}
          {form.prix && !isNaN(Number(form.prix)) && (
            <span style={{ fontSize:".67rem", color:"var(--gray)", marginTop:3 }}>
              Commission Yorix ({Math.round(COMMISSION_RATE*100)}%) : {Math.round(Number(form.prix)*COMMISSION_RATE).toLocaleString()} FCFA · Vous recevez : {Math.round(Number(form.prix)*(1-COMMISSION_RATE)).toLocaleString()} FCFA
            </span>
          )}
        </div>
        <div className="form-group">
          <label className="form-label">Stock disponible</label>
          <input className="form-input" type="number" min="0" placeholder="Ex: 10" value={form.stock} onChange={e => setForm(f=>({...f,stock:e.target.value}))} />
        </div>
        <div className="form-group">
          <label className="form-label">Catégorie</label>
          <select className="form-select" value={form.categorie} onChange={e => setForm(f=>({...f,categorie:e.target.value}))}>
            <option value="">Choisir...</option>
            {CATS.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Ville</label>
          <select className="form-select" value={form.ville} onChange={e => setForm(f=>({...f,ville:e.target.value}))}>
            <option value="">Choisir...</option>
            {CITIES.filter(c => c !== "Toutes les villes").map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Upload multiple */}
        <div className="form-group full">
          <label className="form-label">📸 Photos du produit (max 8, via Cloudinary)</label>
          <div
            className="img-upload-area"
            onClick={() => inputRef.current?.click()}
            onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add("dragover"); }}
            onDragLeave={e => e.currentTarget.classList.remove("dragover")}
            onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove("dragover"); handleFiles(e.dataTransfer.files); }}
          >
            <div className="img-upload-icon">📸</div>
            <div className="img-upload-text">Cliquer pour choisir ou glisser-déposer</div>
            <div className="img-upload-hint">JPEG, PNG, WebP · Max 8 images · La 1ère sera la photo principale</div>
          </div>
          <input ref={inputRef} type="file" accept="image/*" multiple style={{ display:"none" }} onChange={e => handleFiles(e.target.files)} />

          {previews.length > 0 && (
            <div className="img-previews">
              {previews.map((url, i) => (
                <div key={i} className="img-preview-item">
                  <img src={url} alt={`preview ${i}`} onError={e=>{e.currentTarget.onerror=null;e.currentTarget.src="https://via.placeholder.com/70?text=📦";}} />
                  <button className="img-preview-del" onClick={() => removeImage(i)}>×</button>
                  {i === 0 && <span style={{ position:"absolute", bottom:2, left:2, background:"var(--green)", color:"#fff", fontSize:".5rem", fontWeight:700, padding:"1px 4px", borderRadius:3 }}>PRINCIPALE</span>}
                </div>
              ))}
            </div>
          )}

          {saving && progress > 0 && (
            <div className="upload-progress">
              <div className="upload-progress-bar" style={{ width:`${progress}%` }} />
            </div>
          )}
        </div>

        <div className="form-group full">
          <label style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer", fontSize:".82rem", fontWeight:600, color:"var(--ink)" }}>
            <input type="checkbox" checked={form.escrow} onChange={e => setForm(f=>({...f,escrow:e.target.checked}))} />
            🔐 Activer la protection Escrow (recommandé)
          </label>
        </div>
      </div>

      <button className="form-submit" onClick={save} disabled={saving}>
        {saving
          ? <><div className="spinner" style={{ width:16, height:16, borderWidth:2 }}/>Publication... ({progress}%)</>
          : "✅ Publier le produit"
        }
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DASHBOARD SELLER
// ─────────────────────────────────────────────────────────────
function SellerDashboard({ user, userData, dashTab, setDashTab }) {
  const [mesProduits, setMesProduits]   = useState([]);
  const [mesCommandes, setMesCommandes] = useState([]);
  const [wallet, setWallet]             = useState({ solde:0, total_gagne:0 });
  const [loadingData, setLoadingData]   = useState(true);

  useEffect(() => {
    const loadAll = async () => {
      setLoadingData(true);
      const [{ data: prods }, { data: cmds }, { data: wal }] = await Promise.all([
        supabase.from("products").select("*").eq("vendeur_id", user.id).order("created_at", { ascending:false }),
        supabase.from("orders").select("*").eq("vendeur_id", user.id).order("created_at", { ascending:false }),
        supabase.from("wallets").select("*").eq("user_id", user.id).maybeSingle(),
      ]);
      setMesProduits(prods || []);
      setMesCommandes(cmds || []);
      if (wal) setWallet(wal);
      setLoadingData(false);
    };
    loadAll();
  }, [user.id]);

  const revenusTotal    = mesCommandes.filter(c => c.status === "delivered").reduce((a, c) => a + (c.montant_vendeur || 0), 0);
  const commandesActives = mesCommandes.filter(c => ["pending","paid","shipped"].includes(c.status)).length;

  const updateOrderStatus = async (orderId, field, value) => {
    await supabase.from("orders").update({ [field]: value }).eq("id", orderId);
    setMesCommandes(prev => prev.map(c => c.id === orderId ? {...c, [field]: value} : c));
  };

  if (loadingData) return <div className="loading"><div className="spinner"/>Chargement...</div>;

  return (
    <>
      {dashTab === "overview" && (
        <>
          <div className="dash-page-title">
            Bonjour {userData?.nom} 🏪
            {userData?.verifie && <span style={{fontSize:".68rem",background:"#e6fff0",color:"#1a6b3a",padding:"2px 8px",borderRadius:50,fontWeight:700}}>✅ Vérifié</span>}
            {mesProduits.length >= 5 && <span style={{fontSize:".68rem",background:"#fff9e6",color:"#b8860b",padding:"2px 8px",borderRadius:50,fontWeight:700}}>⭐ Top Vendeur</span>}
            {mesProduits.length >= 10 && <span style={{fontSize:".68rem",background:"#e6f0ff",color:"#1a4a9a",padding:"2px 8px",borderRadius:50,fontWeight:700}}>🏆 Best Seller</span>}
          </div>
          <div className="dash-stats">
            {[
              { icon:"🏪", val:mesProduits.length,          lbl:"Produits actifs",   trend:"" },
              { icon:"📦", val:commandesActives,            lbl:"Commandes actives", trend:"" },
              { icon:"✅", val:mesCommandes.filter(c=>c.status==="delivered").length, lbl:"Livrées", trend:"" },
              { icon:"💰", val:`${revenusTotal.toLocaleString()} F`, lbl:"Revenus nets", trend:"+5%" },
            ].map(s => (
              <div key={s.lbl} className="dstat">
                <div className="dstat-icon">{s.icon}</div>
                <div className="dstat-val">{s.val}</div>
                <div className="dstat-lbl">{s.lbl}</div>
                {s.trend && <div className="dstat-trend">{s.trend}</div>}
              </div>
            ))}
          </div>

          {/* Dernières commandes */}
          <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:".95rem", color:"var(--ink)", marginBottom:12 }}>Dernières commandes reçues</div>
          {mesCommandes.length === 0
            ? <div className="empty-state"><div className="empty-icon">📦</div><p>Aucune commande pour l'instant</p></div>
            : mesCommandes.slice(0, 5).map(c => (
                <div key={c.id} className="order-card">
                  <div className="oc-icon">📦</div>
                  <div className="oc-info">
                    <div className="oc-name">#{String(c.id).slice(-8)} — {c.client_nom || "Client"}</div>
                    <div className="oc-meta">
                      {c.montant?.toLocaleString()} FCFA · Commission: {c.commission?.toLocaleString()} F · Net: {c.montant_vendeur?.toLocaleString()} F
                      <br/>📞 {c.telephone || "-"} · {c.created_at ? new Date(c.created_at).toLocaleDateString("fr-FR") : ""}
                    </div>
                  </div>
                  <div className="oc-actions">
                    <span className={`status-badge s-${c.status}`}>{c.status}</span>
                    <span className={`status-badge s-${c.escrow_status}`}>{ESCROW_STATUSES[c.escrow_status] || c.escrow_status}</span>
                  </div>
                </div>
              ))
          }
        </>
      )}

      {dashTab === "mesProduits" && (
        <>
          <div className="dash-page-title">🏪 Mes produits ({mesProduits.length})</div>
          {mesProduits.length === 0
            ? <div className="empty-state"><div className="empty-icon">📦</div><p>Aucun produit</p><button className="form-submit" style={{width:"auto",padding:"10px 24px",marginTop:12}} onClick={()=>setDashTab("ajouterProduit")}>+ Ajouter</button></div>
            : <div className="prod-grid">
                {mesProduits.map(p => (
                  <div key={p.id} className="prod-card">
                    <div className="prod-img-wrap">
                      {(p.image && p.image.startsWith("http")) || (p.image_urls?.[0] && p.image_urls[0].startsWith("http"))
                        ? <img
                            src={p.image && p.image.startsWith("http") ? p.image : p.image_urls[0]}
                            alt={p.name_fr}
                            onError={e=>{e.currentTarget.onerror=null;e.currentTarget.src="https://via.placeholder.com/300?text=📦";}}
                          />
                        : <div className="prod-img-placeholder">📦</div>
                      }
                      {!p.actif && <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:".8rem",fontWeight:700}}>Désactivé</div>}
                    </div>
                    <div className="prod-info">
                      <div className="prod-name">{p.name_fr}</div>
                      <div className="prod-loc">👁 {p.vues||0} vues · Stock: {p.stock != null ? p.stock : "-"}</div>
                      <div className="prod-price-row">
                        <span className="price">{p.prix?.toLocaleString()} <span className="price-unit">FCFA</span></span>
                        <button
                          style={{background:"var(--red)",color:"#fff",border:"none",width:26,height:26,borderRadius:6,cursor:"pointer",fontSize:".85rem",display:"flex",alignItems:"center",justifyContent:"center"}}
                          onClick={async () => { if (!window.confirm("Supprimer ?")) return; await supabase.from("products").update({actif:false}).eq("id",p.id); setMesProduits(prev=>prev.filter(x=>x.id!==p.id)); }}
                        >🗑</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
          }
        </>
      )}

      {dashTab === "ajouterProduit" && (
        <FormulaireProduit user={user} userData={userData} onSaved={() => setDashTab("mesProduits")} />
      )}

      {dashTab === "commandes" && (
        <>
          <div className="dash-page-title">📦 Toutes les commandes ({mesCommandes.length})</div>
          {mesCommandes.length === 0
            ? <div className="empty-state"><div className="empty-icon">📦</div><p>Aucune commande</p></div>
            : mesCommandes.map(c => (
                <div key={c.id} className="order-card" style={{ flexDirection:"column", alignItems:"stretch" }}>
                  <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                    <div className="oc-icon">📦</div>
                    <div className="oc-info">
                      <div className="oc-name">#{String(c.id).slice(-8)} — {c.client_nom}</div>
                      <div className="oc-meta">
                        💰 {c.montant?.toLocaleString()} FCFA · Net vendeur: {c.montant_vendeur?.toLocaleString()} FCFA<br/>
                        📞 {c.telephone} · {c.created_at ? new Date(c.created_at).toLocaleDateString("fr-FR") : ""}
                      </div>
                    </div>
                    <div className="oc-actions">
                      <span className={`status-badge s-${c.status}`}>{c.status}</span>
                      <span className={`status-badge s-${c.escrow_status}`}>{c.escrow_status}</span>
                      <span className={`status-badge s-${c.livraison_status}`}>{c.livraison_status}</span>
                    </div>
                  </div>
                  {/* Actions rapides */}
                  <div style={{ display:"flex", gap:6, marginTop:10, flexWrap:"wrap" }}>
                    {c.status === "pending" && (
                      <button className="btn-action-sm" onClick={() => updateOrderStatus(c.id, "status", "paid")}>✅ Marquer payée</button>
                    )}
                    {c.status === "paid" && (
                      <button className="btn-action-sm" onClick={() => updateOrderStatus(c.id, "status", "shipped")}>🚚 Marquer expédiée</button>
                    )}
                    {c.escrow_status === "pending" && c.status === "paid" && (
                      <button className="btn-action-sm" onClick={() => updateOrderStatus(c.id, "escrow_status", "securise")}>🔐 Sécuriser Escrow</button>
                    )}
                    {c.escrow_status === "securise" && c.status === "shipped" && (
                      <button className="btn-action-sm" onClick={() => updateOrderStatus(c.id, "escrow_status", "libere")}>💰 Libérer Escrow</button>
                    )}
                    {c.livraison_status === "pending" && (
                      <button className="btn-action-sm" onClick={() => updateOrderStatus(c.id, "livraison_status", "en_cours")}>🏍️ Livraison en cours</button>
                    )}
                    {c.livraison_status === "en_cours" && (
                      <button className="btn-action-sm" onClick={() => updateOrderStatus(c.id, "livraison_status", "livre")}>✅ Marquer livré</button>
                    )}
                    <button
                      className="btn-wa-sm"
                      onClick={() => window.open(`https://wa.me/${c.telephone?.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Bonjour ${c.client_nom} ! Votre commande Yorix est en cours de traitement. 🛍️`)}`, "_blank")}
                    >
                      📱 Contacter client
                    </button>
                  </div>
                </div>
              ))
          }
        </>
      )}

      {dashTab === "wallet" && (
        <>
          <div className="dash-page-title">💰 Mon Wallet</div>
          <div className="wallet-card">
            <div className="wc-label">Solde disponible</div>
            <div className="wc-amount">{wallet.solde?.toLocaleString() || 0} FCFA</div>
            <div className="wc-sub">
              Total gagné : {wallet.total_gagne?.toLocaleString() || 0} FCFA · Commission Yorix {Math.round(COMMISSION_RATE*100)}%
            </div>
          </div>
          <div className="commission-box">
            <span>Revenus des commandes livrées</span>
            <strong>{revenusTotal.toLocaleString()} FCFA</strong>
          </div>
          <div className="info-box">
            <div className="info-icon">📱</div>
            <p>Retrait MTN MoMo et Orange Money — bientôt disponible.</p>
          </div>
        </>
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// DASHBOARD BUYER
// ─────────────────────────────────────────────────────────────
function BuyerDashboard({ user, userData, wishlist, totalQty, loyaltyPts, setLoyaltyPts, dashTab, goPage }) {
  const [mesCommandes, setMesCommandes] = useState([]);

  useEffect(() => {
    supabase.from("orders").select("*").eq("client_id", user.id).order("created_at", { ascending:false }).then(({ data }) => setMesCommandes(data || []));
  }, [user.id]);

  return (
    <>
      {dashTab === "overview" && (
        <>
          <div className="dash-page-title">Bonjour {userData?.nom || user.email} 🛍️</div>
          <div className="dash-stats">
            {[
              { icon:"📦", val:mesCommandes.length,  lbl:"Commandes" },
              { icon:"❤️", val:wishlist.size,         lbl:"Favoris" },
              { icon:"🛒", val:totalQty,              lbl:"Panier" },
              { icon:"🌟", val:`${loyaltyPts} pts`,   lbl:"Points fidélité" },
            ].map(s => (
              <div key={s.lbl} className="dstat">
                <div className="dstat-icon">{s.icon}</div>
                <div className="dstat-val">{s.val}</div>
                <div className="dstat-lbl">{s.lbl}</div>
              </div>
            ))}
          </div>
          <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:".95rem", color:"var(--ink)", marginBottom:12 }}>Mes dernières commandes</div>
          {mesCommandes.length === 0
            ? <div className="empty-state"><div className="empty-icon">🛍️</div><p>Aucune commande</p><button className="form-submit" style={{width:"auto",padding:"10px 24px",marginTop:12}} onClick={() => goPage("produits")}>Voir les produits</button></div>
            : mesCommandes.slice(0, 5).map(c => (
                <div key={c.id} className="order-card">
                  <div className="oc-icon">📦</div>
                  <div className="oc-info">
                    <div className="oc-name">#{String(c.id).slice(-8)}</div>
                    <div className="oc-meta">{c.montant?.toLocaleString()} FCFA · {c.created_at ? new Date(c.created_at).toLocaleDateString("fr-FR") : ""}</div>
                  </div>
                  <div className="oc-actions">
                    <span className={`status-badge s-${c.status}`}>{c.status}</span>
                    <span className={`status-badge s-${c.livraison_status}`}>{DELIVERY_STATUSES[c.livraison_status] || c.livraison_status}</span>
                  </div>
                </div>
              ))
          }
        </>
      )}

      {dashTab === "commandes" && (
        <>
          <div className="dash-page-title">📦 Mes commandes</div>
          {mesCommandes.length === 0
            ? <div className="empty-state"><div className="empty-icon">📦</div><p>Aucune commande</p></div>
            : mesCommandes.map(c => (
                <div key={c.id} className="order-card">
                  <div className="oc-icon">📦</div>
                  <div className="oc-info">
                    <div className="oc-name">#{String(c.id).slice(-8)}</div>
                    <div className="oc-meta">{c.montant?.toLocaleString()} FCFA · {c.created_at ? new Date(c.created_at).toLocaleDateString("fr-FR") : ""}</div>
                  </div>
                  <div className="oc-actions">
                    <span className={`status-badge s-${c.status}`}>{c.status}</span>
                    <span className={`status-badge s-${c.escrow_status}`}>{ESCROW_STATUSES[c.escrow_status] || c.escrow_status}</span>
                  </div>
                </div>
              ))
          }
        </>
      )}

      {dashTab === "loyalty" && (
        <>
          <div className="dash-page-title">🌟 Programme fidélité</div>
          <div style={{ background:"linear-gradient(135deg,#1a3a24,var(--green))", borderRadius:14, padding:22, color:"#fff", marginBottom:18 }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, marginBottom:4 }}>Mes points</div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"2rem", fontWeight:800, color:"var(--yellow)" }}>{loyaltyPts} pts</div>
            <div style={{ fontSize:".71rem", opacity:.62, marginBottom:12 }}>Niveau Or · {1000 - loyaltyPts} pts pour Platine</div>
            <div style={{ background:"rgba(255,255,255,.2)", borderRadius:50, height:7 }}>
              <div style={{ background:"var(--yellow)", borderRadius:50, height:7, width:`${Math.min((loyaltyPts % 1000) / 10, 100)}%`, transition:"width .6s" }} />
            </div>
          </div>
          <div className="rewards-grid">
            {REWARDS_DATA.map(r => (
              <div key={r.name} className="reward-card">
                <div className="reward-icon">{r.icon}</div>
                <div className="reward-name">{r.name}</div>
                <div className="reward-pts">{r.pts} pts</div>
                <button className="reward-btn" onClick={() => setLoyaltyPts(p => Math.max(0, p - r.pts))}>Échanger</button>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// DASHBOARD DELIVERY — Système Uber Yorix Ride
// ─────────────────────────────────────────────────────────────
function DeliveryDashboard({ user, userData, dashTab, setDashTab }) {
  const [livraisons, setLivraisons] = useState([
    { id:"YX-2847", client:"Amina T.", telephone:"655112233", adresse_collecte:"Marché Central, Douala", adresse_livraison:"Akwa, Douala", produit:"iPhone 14 128GB", montant:287500, commission_livreur:2500, status:"available", distance:"2.4 km", temps_estime:"~15 min" },
    { id:"YX-2835", client:"Bertrand K.", telephone:"677884455", adresse_collecte:"Boutique Ngoa-Ekélé, Yaoundé", adresse_livraison:"Bastos, Yaoundé", produit:"Robe Pagne Wax", montant:20500, commission_livreur:1500, status:"available", distance:"5.1 km", temps_estime:"~25 min" },
    { id:"YX-2801", client:"Célestine M.", telephone:"699001122", adresse_collecte:"Mall de Douala", adresse_livraison:"Bonanjo, Douala", produit:"Ventilateur 40cm", montant:25000, commission_livreur:1200, status:"in_progress", distance:"1.2 km", temps_estime:"~8 min" },
    { id:"YX-2799", client:"Rodrigue E.", telephone:"670223344", adresse_collecte:"Centre Ville, Bafoussam", adresse_livraison:"Quartier Mtcheu, Bafoussam", produit:"Sac à main cuir", montant:15000, commission_livreur:800, status:"delivered", distance:"3.0 km", temps_estime:"Livré" },
  ]);
  const [gainsTotal]  = useState(47500);
  const [gainsMois]   = useState(127000);

  const actionLivraison = async (id, newStatus) => {
    try {
      await supabase.from("deliveries").update({ status: newStatus, livreur_id: user.id }).eq("commande_id", id).catch(e => console.warn("Supabase error:", e?.message));
      setLivraisons(prev => prev.map(l => l.id === id ? {...l, status: newStatus} : l));
    } catch (err) {
      console.error("actionLivraison:", err);
      setLivraisons(prev => prev.map(l => l.id === id ? {...l, status: newStatus} : l));
    }
  };

  const dispo     = livraisons.filter(l => l.status === "available");
  const enCours   = livraisons.filter(l => l.status === "in_progress");
  const livrees   = livraisons.filter(l => l.status === "delivered");

  const LivraisonCard = ({ l, showActions = true }) => (
    <div style={{background:"var(--surface)",border:"1.5px solid var(--border)",borderRadius:12,padding:16,marginBottom:12}}>
      {/* Header */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:36,height:36,background:"var(--green-pale)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.1rem"}}>📦</div>
          <div>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".85rem",color:"var(--ink)"}}>#{l.id}</div>
            <div style={{fontSize:".68rem",color:"var(--gray)"}}>👤 {l.client} · 📞 {l.telephone}</div>
          </div>
        </div>
        <span className={`status-badge s-${l.status==="available"?"pending":l.status==="in_progress"?"en_cours":l.status}`}>
          {l.status==="available"?"🟡 Disponible":l.status==="in_progress"?"🚚 En cours":"✅ Livré"}
        </span>
      </div>
      {/* Trajet */}
      <div style={{background:"var(--surface2)",borderRadius:8,padding:"10px 12px",marginBottom:10,fontSize:".75rem"}}>
        <div style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:6}}>
          <span style={{color:"var(--green)",fontWeight:700,flexShrink:0}}>📍</span>
          <div><span style={{fontWeight:600,color:"var(--gray)",fontSize:".67rem"}}>COLLECTE</span><br/><span style={{color:"var(--ink)"}}>{l.adresse_collecte}</span></div>
        </div>
        <div style={{borderLeft:"2px dashed var(--border)",marginLeft:6,height:10,marginBottom:6}}/>
        <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
          <span style={{color:"var(--red)",fontWeight:700,flexShrink:0}}>🏠</span>
          <div><span style={{fontWeight:600,color:"var(--gray)",fontSize:".67rem"}}>LIVRAISON</span><br/><span style={{color:"var(--ink)"}}>{l.adresse_livraison}</span></div>
        </div>
      </div>
      {/* Infos commande */}
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:showActions?10:0}}>
        <span style={{background:"var(--surface2)",borderRadius:6,padding:"3px 8px",fontSize:".68rem",fontWeight:600,color:"var(--ink)"}}>📦 {l.produit}</span>
        <span style={{background:"var(--surface2)",borderRadius:6,padding:"3px 8px",fontSize:".68rem",fontWeight:600,color:"var(--ink)"}}>📏 {l.distance}</span>
        <span style={{background:"var(--surface2)",borderRadius:6,padding:"3px 8px",fontSize:".68rem",fontWeight:600,color:"var(--ink)"}}>⏱ {l.temps_estime}</span>
        <span style={{background:"var(--green-pale)",borderRadius:6,padding:"3px 8px",fontSize:".68rem",fontWeight:700,color:"var(--green)"}}>💰 Gain: {l.commission_livreur?.toLocaleString()} FCFA</span>
      </div>
      {/* Actions */}
      {showActions && l.status === "available" && (
        <div style={{display:"flex",gap:8}}>
          <button
            style={{flex:2,background:"var(--green)",color:"#fff",border:"none",padding:"9px",borderRadius:8,fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".78rem",cursor:"pointer"}}
            onClick={() => actionLivraison(l.id, "in_progress")}
          >✅ Accepter la livraison</button>
          <button
            style={{flex:1,background:"var(--surface2)",color:"var(--ink)",border:"1.5px solid var(--border)",padding:"9px",borderRadius:8,fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".78rem",cursor:"pointer"}}
            onClick={() => actionLivraison(l.id, "refused")}
          >❌ Refuser</button>
        </div>
      )}
      {showActions && l.status === "in_progress" && (
        <div style={{display:"flex",gap:8}}>
          <button
            style={{flex:1,background:"#1565c0",color:"#fff",border:"none",padding:"9px",borderRadius:8,fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".78rem",cursor:"pointer"}}
            onClick={() => window.open(`https://wa.me/${l.telephone?.replace(/\D/g,"")}?text=${encodeURIComponent(`Bonjour ${l.client} ! Je suis votre livreur Yorix, je suis en route. 🚚\n\n📍 J'arrive dans ${l.temps_estime}.`)}`, "_blank")}
          >📱 Contacter client</button>
          <button
            style={{flex:1,background:"var(--green)",color:"#fff",border:"none",padding:"9px",borderRadius:8,fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".78rem",cursor:"pointer"}}
            onClick={() => actionLivraison(l.id, "delivered")}
          >✅ Confirmer livraison</button>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="dash-page-title">Bonjour {userData?.nom} 🏍️ <span style={{fontSize:".75rem",color:"var(--gray)",fontFamily:"'DM Sans',sans-serif",fontWeight:400}}>— Yorix Ride</span></div>

      {/* Stats */}
      <div className="dash-stats">
        {[
          { icon:"🟡", val:dispo.length,           lbl:"Disponibles",      trend:"Nouvelles missions" },
          { icon:"🚚", val:enCours.length,          lbl:"En cours",         trend:"" },
          { icon:"✅", val:livrees.length,           lbl:"Livrées",          trend:"+" },
          { icon:"💰", val:`${gainsTotal.toLocaleString()} F`, lbl:"Gains disponibles", trend:`${gainsMois.toLocaleString()} F ce mois` },
        ].map(s => (
          <div key={s.lbl} className="dstat">
            <div className="dstat-icon">{s.icon}</div>
            <div className="dstat-val">{s.val}</div>
            <div className="dstat-lbl">{s.lbl}</div>
            {s.trend && <div className="dstat-trend">{s.trend}</div>}
          </div>
        ))}
      </div>

      {/* Onglets dashboard livraison */}
      {dashTab === "overview" && (
        <>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".95rem",color:"var(--ink)",marginBottom:12}}>
            🟡 Missions disponibles ({dispo.length})
          </div>
          {dispo.length === 0
            ? <div className="empty-state"><div className="empty-icon">🛵</div><p>Aucune mission disponible pour l'instant</p><p style={{fontSize:".78rem",marginTop:6}}>Revenez dans quelques minutes !</p></div>
            : dispo.map(l => <LivraisonCard key={l.id} l={l}/>)
          }
          {enCours.length > 0 && (
            <>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".95rem",color:"var(--ink)",margin:"18px 0 12px"}}>🚚 En cours ({enCours.length})</div>
              {enCours.map(l => <LivraisonCard key={l.id} l={l}/>)}
            </>
          )}
        </>
      )}

      {dashTab === "disponibles" && (
        <>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".95rem",color:"var(--ink)",marginBottom:12}}>🟡 Missions disponibles</div>
          {dispo.length === 0
            ? <div className="empty-state"><div className="empty-icon">🛵</div><p>Aucune mission disponible</p></div>
            : dispo.map(l => <LivraisonCard key={l.id} l={l}/>)
          }
        </>
      )}

      {dashTab === "enCours" && (
        <>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".95rem",color:"var(--ink)",marginBottom:12}}>🚚 Livraisons en cours</div>
          {enCours.length === 0
            ? <div className="empty-state"><div className="empty-icon">🚚</div><p>Aucune livraison en cours</p></div>
            : enCours.map(l => <LivraisonCard key={l.id} l={l}/>)
          }
        </>
      )}

      {dashTab === "historique" && (
        <>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".95rem",color:"var(--ink)",marginBottom:12}}>✅ Historique ({livrees.length})</div>
          {livrees.length === 0
            ? <div className="empty-state"><div className="empty-icon">📋</div><p>Aucune livraison terminée</p></div>
            : livrees.map(l => <LivraisonCard key={l.id} l={l} showActions={false}/>)
          }
        </>
      )}

      {dashTab === "wallet" && (
        <>
          <div className="dash-page-title">💰 Mes Gains</div>
          <div className="wallet-card">
            <div className="wc-label">Gains disponibles</div>
            <div className="wc-amount">{gainsTotal.toLocaleString()} FCFA</div>
            <div className="wc-sub">Ce mois : {gainsMois.toLocaleString()} FCFA · {livrees.length} livraisons effectuées</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
            {[{label:"Aujourd'hui",val:"12 500 FCFA",ic:"📅"},{label:"Cette semaine",val:"47 500 FCFA",ic:"📆"},{label:"Ce mois",val:`${gainsMois.toLocaleString()} FCFA`,ic:"🗓️"},{label:"Total livraisons",val:livrees.length,ic:"✅"}].map(s=>(
              <div key={s.label} style={{background:"var(--surface2)",borderRadius:10,padding:"12px 14px",border:"1px solid var(--border)"}}>
                <div style={{fontSize:"1.1rem",marginBottom:4}}>{s.ic}</div>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".88rem",color:"var(--ink)"}}>{s.val}</div>
                <div style={{fontSize:".68rem",color:"var(--gray)"}}>{s.label}</div>
              </div>
            ))}
          </div>
          <div className="info-box"><div className="info-icon">📱</div><p>Retrait MTN MoMo et Orange Money — bientôt disponible.</p></div>
        </>
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// DASHBOARD PROVIDER
// ─────────────────────────────────────────────────────────────
function ProviderDashboard({ user, userData, dashTab, setDashTab }) {
  const [demandes, setDemandes] = useState([
    { id:1, client:"Amina T.", service:"Coiffure à domicile", date:"Demain 10h", adresse:"Akwa, Douala", budget:"5 000 FCFA", status:"pending" },
    { id:2, client:"Bertrand K.", service:"Réparation téléphone", date:"Aujourd'hui 15h", adresse:"Bastos, Yaoundé", budget:"3 500 FCFA", status:"pending" },
  ]);
  const [serviceForm, setServiceForm] = useState({ nom:"", categorie:"", description:"", prix:"", ville:"", disponible:true });
  const [serviceSaved, setServiceSaved] = useState(false);

  const repondre = (id, accepte) => setDemandes(prev => prev.map(d => d.id === id ? {...d, status: accepte ? "accepted" : "refused"} : d));

  const saveService = async () => {
    if (!serviceForm.nom || !serviceForm.prix) { alert("Nom et prix obligatoires !"); return; }
    await supabase.from("services").insert({ ...serviceForm, prix: Number(serviceForm.prix), provider_id: user.id, provider_nom: userData?.nom }).catch(e => console.warn("Supabase error:", e?.message));
    setServiceForm({ nom:"", categorie:"", description:"", prix:"", ville:"", disponible:true });
    setServiceSaved(true);
    setTimeout(() => setServiceSaved(false), 3000);
  };

  return (
    <>
      {dashTab === "overview" && (
        <>
          <div className="dash-page-title">Bonjour {userData?.nom} 👷</div>
          <div className="dash-stats">
            {[
              { icon:"📋", val:demandes.filter(d=>d.status==="pending").length,  lbl:"Demandes" },
              { icon:"✅", val:demandes.filter(d=>d.status==="accepted").length, lbl:"Acceptées" },
              { icon:"💰", val:"85 000 F", lbl:"Ce mois", trend:"+12%" },
              { icon:"⭐", val:"4.9/5", lbl:"Ma note", trend:"" },
            ].map(s => (
              <div key={s.lbl} className="dstat">
                <div className="dstat-icon">{s.icon}</div>
                <div className="dstat-val">{s.val}</div>
                <div className="dstat-lbl">{s.lbl}</div>
                {s.trend && <div className="dstat-trend">{s.trend}</div>}
              </div>
            ))}
          </div>
          <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:".95rem", color:"var(--ink)", marginBottom:12 }}>Demandes en attente</div>
          {demandes.filter(d => d.status === "pending").map(d => (
            <div key={d.id} className="order-card" style={{ flexDirection:"column", alignItems:"stretch" }}>
              <div style={{ display:"flex", gap:12 }}>
                <div className="oc-icon">🔧</div>
                <div className="oc-info">
                  <div className="oc-name">{d.client} — {d.service}</div>
                  <div className="oc-meta">📅 {d.date} · 📍 {d.adresse} · 💰 {d.budget}</div>
                </div>
                <span className="status-badge s-pending">⏳</span>
              </div>
              <div style={{ display:"flex", gap:8, marginTop:10 }}>
                <button className="btn-cmd-sm" onClick={() => repondre(d.id, true)}>✅ Accepter</button>
                <button className="btn-ghost" style={{ flex:1, fontSize:".78rem" }} onClick={() => repondre(d.id, false)}>❌ Refuser</button>
              </div>
            </div>
          ))}
        </>
      )}

      {dashTab === "ajouterService" && (
        <>
          <div className="dash-page-title">➕ Ajouter un service</div>
          {serviceSaved && <div className="success-msg">✅ Service publié !</div>}
          <div className="prod-form">
            <div className="form-row">
              <div className="form-group"><label className="form-label">Nom du service *</label><input className="form-input" placeholder="Ex: Coiffure à domicile" value={serviceForm.nom} onChange={e=>setServiceForm(f=>({...f,nom:e.target.value}))}/></div>
              <div className="form-group"><label className="form-label">Catégorie</label><select className="form-select" value={serviceForm.categorie} onChange={e=>setServiceForm(f=>({...f,categorie:e.target.value}))}><option value="">Choisir...</option>{["Beauté","Réparation","Cuisine","Transport","Nettoyage","Informatique","Photographie","Autre"].map(c=><option key={c}>{c}</option>)}</select></div>
              <div className="form-group full"><label className="form-label">Description</label><textarea className="form-textarea" placeholder="Décrivez votre service..." value={serviceForm.description} onChange={e=>setServiceForm(f=>({...f,description:e.target.value}))}/></div>
              <div className="form-group"><label className="form-label">Prix (FCFA) *</label><input className="form-input" type="number" placeholder="Ex: 5000" value={serviceForm.prix} onChange={e=>setServiceForm(f=>({...f,prix:e.target.value}))}/></div>
              <div className="form-group"><label className="form-label">Ville</label><select className="form-select" value={serviceForm.ville} onChange={e=>setServiceForm(f=>({...f,ville:e.target.value}))}><option value="">Choisir...</option>{CITIES.filter(c=>c!=="Toutes les villes").map(c=><option key={c}>{c}</option>)}</select></div>
              <div className="form-group full"><label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:".82rem",fontWeight:600,color:"var(--ink)"}}><input type="checkbox" checked={serviceForm.disponible} onChange={e=>setServiceForm(f=>({...f,disponible:e.target.checked}))}/>✅ Disponible maintenant</label></div>
            </div>
            <button className="form-submit" onClick={saveService}>✅ Publier le service</button>
          </div>
        </>
      )}
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
// APP PRINCIPALE
// ═══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────
// COMPOSANT : FOOTER PANIER AVEC OPTIONS DE PAIEMENT
// ─────────────────────────────────────────────────────────────
function CartPaymentFooter({ totalPrice, cartItems, onConfirm }) {
  const [payMode, setPayMode] = useState(""); // "om" | "momo" | "visa"

  const PAYMENT_OPTIONS = [
    { id:"om",   icon:"🔶", label:"Orange Money", color:"#ff6600", bg:"#fff4e6", border:"#ffcc88" },
    { id:"momo", icon:"📱", label:"MTN MoMo",     color:"#bb8800", bg:"#fffbe6", border:"#ffdd44" },
    { id:"visa", icon:"💳", label:"Carte Visa",   color:"#1a6b9a", bg:"#e6f0ff", border:"#aaccff" },
  ];

  return (
    <div className="cart-footer">
      <div className="cart-note note-escrow">🔐 Paiement sécurisé · Confirmation après preuve</div>
      <div className="cart-total-row"><span>Sous-total</span><span>{totalPrice.toLocaleString()} FCFA</span></div>
      <div className="cart-total-row"><span>Livraison estimée</span><span>2 500 FCFA</span></div>
      <div className="cart-total-row big"><span>Total</span><span>{(totalPrice+2500).toLocaleString()} FCFA</span></div>

      {/* ── CHOIX DU MODE DE PAIEMENT ── */}
      <div style={{marginTop:12,marginBottom:10}}>
        <div style={{fontSize:".74rem",fontWeight:700,color:"var(--ink)",marginBottom:7}}>
          💳 Mode de paiement
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {PAYMENT_OPTIONS.map(opt => (
            <div
              key={opt.id}
              onClick={() => setPayMode(opt.id)}
              style={{
                border:`2px solid ${payMode===opt.id ? opt.color : "var(--border)"}`,
                borderRadius:8, padding:"9px 12px", cursor:"pointer",
                background: payMode===opt.id ? opt.bg : "var(--surface)",
                display:"flex", alignItems:"center", gap:9, transition:"all .2s",
              }}
            >
              <span style={{fontSize:"1.2rem"}}>{opt.icon}</span>
              <span style={{fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".8rem",color:"var(--ink)",flex:1}}>{opt.label}</span>
              {payMode===opt.id && (
                <span style={{fontSize:".68rem",fontWeight:700,color:opt.color}}>✅</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── INSTRUCTIONS SELON LE CHOIX ── */}
      {payMode==="om" && (
        <div style={{background:"#fff4e6",border:"1px solid #ffcc88",borderRadius:8,padding:"10px 12px",marginBottom:10}}>
          <div style={{fontWeight:700,fontSize:".78rem",color:"#cc5500",marginBottom:3}}>🔶 Orange Money</div>
          <div style={{fontSize:".8rem",color:"#883300",marginBottom:5}}>
            Envoyez le paiement au :<br/>
            <strong style={{fontSize:".95rem"}}>+237 696 56 56 54</strong>
          </div>
          <div style={{fontSize:".72rem",color:"#1a6b3a",fontWeight:600,display:"flex",alignItems:"center",gap:4}}>
            <span>📲</span>
            <span>Après paiement, envoyez la preuve via WhatsApp pour validation rapide</span>
          </div>
          <a
            href="https://wa.me/237696565654?text=Bonjour%20Yorix%20!%20Voici%20ma%20preuve%20de%20paiement%20Orange%20Money%20%F0%9F%A7%BE"
            target="_blank" rel="noreferrer"
            style={{display:"inline-flex",alignItems:"center",gap:5,marginTop:7,background:"#25D366",color:"#fff",padding:"6px 11px",borderRadius:6,fontSize:".71rem",fontWeight:700,textDecoration:"none"}}
          >
            📱 Envoyer la preuve WhatsApp
          </a>
        </div>
      )}

      {payMode==="momo" && (
        <div style={{background:"#fffbe6",border:"1px solid #ffdd44",borderRadius:8,padding:"10px 12px",marginBottom:10}}>
          <div style={{fontWeight:700,fontSize:".78rem",color:"#886600",marginBottom:3}}>📱 MTN MoMo</div>
          <div style={{fontSize:".8rem",color:"#664400",marginBottom:5}}>
            Envoyez le paiement au :<br/>
            <strong style={{fontSize:".95rem"}}>+237 676 93 51 95</strong>
          </div>
          <div style={{fontSize:".72rem",color:"#1a6b3a",fontWeight:600,display:"flex",alignItems:"center",gap:4}}>
            <span>📲</span>
            <span>Après paiement, envoyez la preuve via WhatsApp pour validation rapide</span>
          </div>
          <a
            href="https://wa.me/237696565654?text=Bonjour%20Yorix%20!%20Voici%20ma%20preuve%20de%20paiement%20MTN%20MoMo%20%F0%9F%93%B1"
            target="_blank" rel="noreferrer"
            style={{display:"inline-flex",alignItems:"center",gap:5,marginTop:7,background:"#25D366",color:"#fff",padding:"6px 11px",borderRadius:6,fontSize:".71rem",fontWeight:700,textDecoration:"none"}}
          >
            📱 Envoyer la preuve WhatsApp
          </a>
        </div>
      )}

      {payMode==="visa" && (
        <div style={{background:"#e6f0ff",border:"1px solid #aaccff",borderRadius:8,padding:"10px 12px",marginBottom:10}}>
          <div style={{fontWeight:700,fontSize:".78rem",color:"#003388",marginBottom:3}}>💳 Carte Visa</div>
          <div style={{fontSize:".8rem",color:"#334"}}>
            Paiement par carte indisponible pour le moment.<br/>
            <span style={{color:"#1a6b3a",fontWeight:600}}>Veuillez utiliser Orange Money ou MTN MoMo.</span>
          </div>
        </div>
      )}

      {/* ── BOUTON CONFIRMER ── */}
      <button
        className="cart-checkout"
        onClick={onConfirm}
        disabled={!payMode || payMode==="visa"}
        style={{
          opacity: (!payMode || payMode==="visa") ? 0.5 : 1,
          cursor: (!payMode || payMode==="visa") ? "not-allowed" : "pointer",
        }}
      >
        {!payMode
          ? "Choisissez un mode de paiement"
          : payMode==="visa"
            ? "💳 Carte indisponible — choisir MoMo/OM"
            : "✅ Confirmer la commande"
        }
      </button>

      {payMode && payMode!=="visa" && (
        <p style={{fontSize:".69rem",color:"var(--gray)",textAlign:"center",marginTop:6}}>
          ⚡ Votre commande sera traitée après confirmation du paiement
        </p>
      )}
    </div>
  );
}


// ─────────────────────────────────────────────────────────────
// COMPOSANT : FORMULAIRE LIVRAISON GOZEM-STYLE
// ─────────────────────────────────────────────────────────────
function FormulaireLivraison({ user, userData, onClose }) {
  const [etape, setEtape] = useState(1); // 1=infos | 2=livreur | 3=confirmation

  // Étape 1 — Informations du colis
  const [villeCollecte, setVilleCollecte]       = useState("Douala");
  const [quartierCollecte, setQuartierCollecte] = useState("");
  const [adresseCollecte, setAdresseCollecte]   = useState("");
  const [quartierLivraison, setQuartierLivraison] = useState("");
  const [adresseLivraison, setAdresseLivraison] = useState("");
  const [typeColis, setTypeColis]               = useState("");
  const [descColis, setDescColis]               = useState("");
  const [valeurColis, setValeurColis]           = useState("");
  const [nomDestinataire, setNomDestinataire]   = useState("");
  const [telDestinataire, setTelDestinataire]   = useState("");
  const [heuresSouhaitee, setHeureSouhaitee]    = useState("Le plus tôt possible");
  const [errors, setErrors]                     = useState({});

  // Étape 2 — Livreur choisi
  const [livreurChoisi, setLivreurChoisi] = useState(null);

  // Calcul automatique du tarif
  const calculerTarif = () => {
    const typeMeta = TYPES_COLIS.find(t => t.id === typeColis);
    const bonus    = typeMeta?.bonus || 0;

    // Déterminer la zone selon la combinaison quartiers
    let zone;
    if (!quartierCollecte || !quartierLivraison) return null;
    if (quartierCollecte === quartierLivraison) {
      zone = TARIFS_LIVRAISON.intra_quartier;
    } else {
      zone = TARIFS_LIVRAISON.intra_ville;
    }

    const base = Math.round((zone.min + zone.max) / 2);
    const total = base + bonus;
    return { min: zone.min + bonus, max: zone.max + bonus, total, zone, delai: zone.delai, label: zone.label };
  };

  const tarif = calculerTarif();

  // Message WhatsApp complet pré-rempli
  const genererMessageWA = (livreur) => {
    const t = calculerTarif();
    const numCmd = "YX-" + Date.now().toString().slice(-6);
    const nomExp = userData?.nom || user?.email?.split("@")[0] || "Client";
    const telExp = userData?.telephone || "+237 XXX XXX XXX";

    return [
      `🛵 *YORIX RIDE — Demande de livraison*`,
      `──────────────────────────`,
      `📋 *Mission :* #${numCmd}`,
      `📦 *Colis :* ${descColis || typeColis}`,
      `🗃️ *Type :* ${TYPES_COLIS.find(x=>x.id===typeColis)?.label || typeColis}`,
      valeurColis ? `💎 *Valeur déclarée :* ${Number(valeurColis).toLocaleString()} FCFA` : "",
      ``,
      `📍 *COLLECTE :*`,
      `👤 Expéditeur : ${nomExp}`,
      `📌 Quartier : ${quartierCollecte}, ${villeCollecte}`,
      adresseCollecte ? `🏠 Adresse : ${adresseCollecte}` : "",
      `📞 Tél : ${telExp}`,
      ``,
      `🏠 *LIVRAISON :*`,
      `👤 Destinataire : ${nomDestinataire}`,
      `📌 Quartier : ${quartierLivraison}, ${villeCollecte}`,
      adresseLivraison ? `🏠 Adresse : ${adresseLivraison}` : "",
      `📞 Tél : ${telDestinataire}`,
      ``,
      `⏰ *Heure souhaitée :* ${heuresSouhaitee}`,
      t ? `💰 *Tarif estimé :* ${t.min.toLocaleString()} – ${t.max.toLocaleString()} FCFA` : "",
      t ? `⏱️ *Délai :* ${t.delai}` : "",
      livreur ? `🏍️ *Livreur :* ${livreur.name} (${livreur.vehicule})` : "",
      ``,
      `──────────────────────────`,
      `✅ Confirmation par Yorix sous 5 min`,
    ].filter(Boolean).join("\n");
  };

  const validerEtape1 = () => {
    const e = {};
    if (!quartierCollecte) e.quartierCollecte = "Quartier de collecte requis";
    if (!quartierLivraison) e.quartierLivraison = "Quartier de livraison requis";
    if (!typeColis) e.typeColis = "Type de colis requis";
    if (!nomDestinataire.trim()) e.nomDestinataire = "Nom du destinataire requis";
    if (!telDestinataire.trim()) e.telDestinataire = "Téléphone destinataire requis";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const livreursFiltres = LIVREURS_DATA.filter(l =>
    l.dispo &&
    (l.ville === villeCollecte || !villeCollecte) &&
    (!typeColis || l.types.includes(typeColis))
  );

  const confirmerLivraison = (livreur) => {
    const msg = genererMessageWA(livreur);
    const tel = livreur ? livreur.tel : "237696565654";
    window.open(`https://wa.me/${tel}?text=${encodeURIComponent(msg)}`, "_blank");
    setEtape(3);
  };

  // Styles inline réutilisables (respecte le design existant)
  const S = {
    label: { fontSize:".73rem", fontWeight:600, color:"var(--ink)", marginBottom:4, display:"block" },
    input: { border:"1.5px solid var(--border)", borderRadius:8, padding:"9px 10px", fontFamily:"'DM Sans',sans-serif", fontSize:".81rem", color:"var(--ink)", outline:"none", background:"var(--surface)", width:"100%" },
    inputErr: { border:"1.5px solid var(--red)", borderRadius:8, padding:"9px 10px", fontFamily:"'DM Sans',sans-serif", fontSize:".81rem", color:"var(--ink)", outline:"none", background:"var(--surface)", width:"100%" },
    errTxt: { fontSize:".68rem", color:"var(--red)", marginTop:2 },
    select: { border:"1.5px solid var(--border)", borderRadius:8, padding:"9px 10px", fontFamily:"'DM Sans',sans-serif", fontSize:".81rem", color:"var(--ink)", outline:"none", background:"var(--surface)", width:"100%" },
    row2: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:11, marginBottom:11 },
    grp: { display:"flex", flexDirection:"column", gap:4, marginBottom:11 },
    btnVert: { background:"var(--green)", color:"#fff", border:"none", padding:"11px", borderRadius:9, fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:".85rem", cursor:"pointer", width:"100%" },
    btnGhost: { background:"var(--surface2)", color:"var(--ink)", border:"1.5px solid var(--border)", padding:"9px", borderRadius:8, fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:".81rem", cursor:"pointer" },
    card: { background:"var(--surface2)", border:"1.5px solid var(--border)", borderRadius:11, padding:14, marginBottom:10 },
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal modal-lg" style={{ maxHeight:"92vh", overflowY:"auto" }}>
        <button className="modal-close" onClick={onClose}>✕</button>

        {/* ── EN-TÊTE ── */}
        <div style={{ marginBottom:18 }}>
          <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.1rem", color:"var(--ink)", marginBottom:3 }}>
            🛵 Demander une livraison
          </div>
          <p style={{ fontSize:".78rem", color:"var(--gray)" }}>
            Remplissez les informations — le message WhatsApp sera généré automatiquement pour le livreur
          </p>
          {/* Barre de progression */}
          <div style={{ display:"flex", gap:6, marginTop:12, alignItems:"center" }}>
            {[{n:1,l:"📦 Infos colis"},{n:2,l:"🏍️ Livreur"},{n:3,l:"✅ Confirmé"}].map(s => (
              <div key={s.n} style={{ display:"flex", alignItems:"center", gap:6, flex:1 }}>
                <div style={{
                  width:24, height:24, borderRadius:"50%", flexShrink:0,
                  background: etape >= s.n ? "var(--green)" : "var(--surface2)",
                  border: `2px solid ${etape >= s.n ? "var(--green)" : "var(--border)"}`,
                  color: etape >= s.n ? "#fff" : "var(--gray)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:".72rem",
                }}>{s.n}</div>
                <div style={{ fontSize:".68rem", fontWeight: etape===s.n ? 700 : 400, color: etape===s.n ? "var(--ink)" : "var(--gray)", whiteSpace:"nowrap" }}>{s.l}</div>
                {s.n < 3 && <div style={{ flex:1, height:2, background: etape > s.n ? "var(--green)" : "var(--border)", borderRadius:2 }}/>}
              </div>
            ))}
          </div>
        </div>

        {/* ═══ ÉTAPE 1 — INFORMATIONS DU COLIS ═══ */}
        {etape === 1 && (
          <>
            {/* Ville */}
            <div style={S.grp}>
              <label style={S.label}>🌍 Ville de livraison <span style={{color:"var(--red)"}}>*</span></label>
              <select style={S.select} value={villeCollecte} onChange={e => { setVilleCollecte(e.target.value); setQuartierCollecte(""); setQuartierLivraison(""); }}>
                {Object.keys(QUARTIERS).map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>

            {/* Collecte + Livraison */}
            <div style={{ background:"var(--surface2)", borderRadius:10, padding:"13px 14px", marginBottom:11, border:"1px solid var(--border)" }}>
              <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:".82rem", color:"var(--ink)", marginBottom:10 }}>📍 Adresses</div>
              <div style={S.row2}>
                <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                  <label style={S.label}>Quartier de collecte <span style={{color:"var(--red)"}}>*</span></label>
                  <select style={errors.quartierCollecte ? S.inputErr : S.select} value={quartierCollecte} onChange={e => setQuartierCollecte(e.target.value)}>
                    <option value="">Choisir...</option>
                    {(QUARTIERS[villeCollecte] || []).map(q => <option key={q} value={q}>{q}</option>)}
                  </select>
                  {errors.quartierCollecte && <span style={S.errTxt}>{errors.quartierCollecte}</span>}
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                  <label style={S.label}>Quartier de livraison <span style={{color:"var(--red)"}}>*</span></label>
                  <select style={errors.quartierLivraison ? S.inputErr : S.select} value={quartierLivraison} onChange={e => setQuartierLivraison(e.target.value)}>
                    <option value="">Choisir...</option>
                    {(QUARTIERS[villeCollecte] || []).map(q => <option key={q} value={q}>{q}</option>)}
                  </select>
                  {errors.quartierLivraison && <span style={S.errTxt}>{errors.quartierLivraison}</span>}
                </div>
              </div>
              <div style={S.row2}>
                <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                  <label style={S.label}>Adresse exacte collecte</label>
                  <input style={S.input} placeholder="Ex: Immeuble Total, Apt 3A" value={adresseCollecte} onChange={e => setAdresseCollecte(e.target.value)} />
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                  <label style={S.label}>Adresse exacte livraison</label>
                  <input style={S.input} placeholder="Ex: Carrefour Zéphyr, face pharmacie" value={adresseLivraison} onChange={e => setAdresseLivraison(e.target.value)} />
                </div>
              </div>
            </div>

            {/* Type de colis */}
            <div style={S.grp}>
              <label style={S.label}>📦 Type de colis <span style={{color:"var(--red)"}}>*</span></label>
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                {TYPES_COLIS.map(t => (
                  <div
                    key={t.id}
                    onClick={() => setTypeColis(t.id)}
                    style={{
                      border: `2px solid ${typeColis===t.id ? "var(--green)" : "var(--border)"}`,
                      borderRadius:8, padding:"9px 12px", cursor:"pointer",
                      background: typeColis===t.id ? "var(--green-pale)" : "var(--surface)",
                      display:"flex", alignItems:"center", justifyContent:"space-between",
                      transition:"all .15s",
                    }}
                  >
                    <div>
                      <div style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:".82rem", color:"var(--ink)" }}>{t.label}</div>
                      <div style={{ fontSize:".68rem", color:"var(--gray)", marginTop:2 }}>{t.desc}</div>
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end" }}>
                      {t.bonus > 0 && <span style={{ fontSize:".65rem", color:"var(--green)", fontWeight:600 }}>+{t.bonus.toLocaleString()} F</span>}
                      {typeColis===t.id && <span style={{ fontSize:".65rem", color:"var(--green)", fontWeight:700 }}>✅</span>}
                    </div>
                  </div>
                ))}
              </div>
              {errors.typeColis && <span style={S.errTxt}>{errors.typeColis}</span>}
            </div>

            {/* Description + valeur */}
            <div style={S.row2}>
              <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                <label style={S.label}>Description du colis</label>
                <input style={S.input} placeholder="Ex: Chaussures + vêtements" value={descColis} onChange={e => setDescColis(e.target.value)} />
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                <label style={S.label}>Valeur déclarée (FCFA)</label>
                <input style={S.input} type="number" placeholder="Ex: 25000" value={valeurColis} onChange={e => setValeurColis(e.target.value)} />
              </div>
            </div>

            {/* Destinataire */}
            <div style={{ background:"var(--surface2)", borderRadius:10, padding:"13px 14px", marginBottom:11, border:"1px solid var(--border)" }}>
              <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:".82rem", color:"var(--ink)", marginBottom:10 }}>👤 Destinataire</div>
              <div style={S.row2}>
                <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                  <label style={S.label}>Nom du destinataire <span style={{color:"var(--red)"}}>*</span></label>
                  <input style={errors.nomDestinataire ? S.inputErr : S.input} placeholder="Amina Bello" value={nomDestinataire} onChange={e => setNomDestinataire(e.target.value)} />
                  {errors.nomDestinataire && <span style={S.errTxt}>{errors.nomDestinataire}</span>}
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                  <label style={S.label}>Téléphone <span style={{color:"var(--red)"}}>*</span></label>
                  <input style={errors.telDestinataire ? S.inputErr : S.input} type="tel" placeholder="+237 6XX XXX XXX" value={telDestinataire} onChange={e => setTelDestinataire(e.target.value)} />
                  {errors.telDestinataire && <span style={S.errTxt}>{errors.telDestinataire}</span>}
                </div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                <label style={S.label}>Heure souhaitée</label>
                <select style={S.select} value={heuresSouhaitee} onChange={e => setHeureSouhaitee(e.target.value)}>
                  {["Le plus tôt possible","Dans 1h","Dans 2h","Ce soir","Demain matin","Demain après-midi"].map(h => <option key={h}>{h}</option>)}
                </select>
              </div>
            </div>

            {/* Estimation tarif */}
            {tarif && (
              <div style={{ background:"var(--green-pale)", border:"1.5px solid var(--green-light)", borderRadius:10, padding:"12px 14px", marginBottom:14 }}>
                <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:".88rem", color:"var(--green)", marginBottom:5 }}>
                  💰 Tarif estimé : {tarif.min.toLocaleString()} – {tarif.max.toLocaleString()} FCFA
                </div>
                <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                  <span style={{ fontSize:".72rem", color:"var(--green)" }}>⏱ {tarif.delai}</span>
                  <span style={{ fontSize:".72rem", color:"var(--green)" }}>📍 {tarif.label}</span>
                </div>
              </div>
            )}

            <button
              style={S.btnVert}
              onClick={() => { if (validerEtape1()) setEtape(2); }}
            >
              🏍️ Choisir un livreur →
            </button>
          </>
        )}

        {/* ═══ ÉTAPE 2 — CHOISIR UN LIVREUR ═══ */}
        {etape === 2 && (
          <>
            <div style={{ marginBottom:14 }}>
              <button style={S.btnGhost} onClick={() => setEtape(1)}>← Retour</button>
            </div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:".88rem", color:"var(--ink)", marginBottom:12 }}>
              🏍️ Livreurs disponibles ({livreursFiltres.length}) — {villeCollecte}
            </div>
            {livreursFiltres.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">🛵</div>
                <p>Aucun livreur disponible pour cette ville/type de colis.</p>
                <p style={{ fontSize:".78rem", marginTop:6, color:"var(--gray)" }}>Essayez WhatsApp pour une demande manuelle.</p>
                <button className="btn-wa" style={{ marginTop:12 }} onClick={() => confirmerLivraison(null)}>
                  📱 Demander via WhatsApp
                </button>
              </div>
            )}
            {livreursFiltres.map(l => (
              <div key={l.id} style={{
                background:"var(--surface)", border:`1.5px solid ${livreurChoisi?.id===l.id?"var(--green)":"var(--border)"}`,
                borderRadius:12, padding:15, marginBottom:10, cursor:"pointer", transition:"all .2s",
                ...(livreurChoisi?.id===l.id ? { background:"var(--green-pale)" } : {}),
              }} onClick={() => setLivreurChoisi(l)}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                  <div style={{ width:44, height:44, borderRadius:"50%", background:"var(--green)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.2rem", flexShrink:0 }}>
                    {l.emoji}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:".88rem", color:"var(--ink)" }}>{l.name}</div>
                    <div style={{ fontSize:".68rem", color:"var(--gray)" }}>{l.sub}</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:".88rem", color:"var(--green)" }}>
                      ⭐ {l.note}
                    </div>
                    <div style={{ fontSize:".62rem", color:"var(--gray)" }}>{l.livraisons} livraisons</div>
                  </div>
                </div>
                <div style={{ display:"flex", gap:7, flexWrap:"wrap", marginBottom:10 }}>
                  <span style={{ background:"var(--surface2)", borderRadius:6, padding:"3px 8px", fontSize:".67rem", fontWeight:600, color:"var(--ink)" }}>🏍️ {l.vehicule}</span>
                  <span style={{ background:"var(--surface2)", borderRadius:6, padding:"3px 8px", fontSize:".67rem", fontWeight:600, color:"#27a85a" }}>
                    <span style={{ width:6, height:6, background:"#4fd17d", borderRadius:"50%", display:"inline-block", marginRight:4 }}/>
                    Dispo · {l.temps}
                  </span>
                  {tarif && <span style={{ background:"var(--green-pale)", borderRadius:6, padding:"3px 8px", fontSize:".67rem", fontWeight:700, color:"var(--green)" }}>💰 {tarif.min.toLocaleString()} – {tarif.max.toLocaleString()} FCFA</span>}
                </div>
                <button
                  style={{ ...S.btnVert, background: livreurChoisi?.id===l.id ? "var(--green)" : "var(--surface2)", color: livreurChoisi?.id===l.id ? "#fff" : "var(--ink)" }}
                  onClick={e => { e.stopPropagation(); setLivreurChoisi(l); }}
                >
                  {livreurChoisi?.id===l.id ? "✅ Sélectionné" : "Choisir ce livreur"}
                </button>
              </div>
            ))}

            {livreursFiltres.length > 0 && (
              <button
                style={{ ...S.btnVert, marginTop:8, opacity: livreurChoisi ? 1 : 0.5 }}
                disabled={!livreurChoisi}
                onClick={() => { if (livreurChoisi) confirmerLivraison(livreurChoisi); }}
              >
                📱 Confirmer et contacter {livreurChoisi ? livreurChoisi.name.split(" ")[0] : "le livreur"} via WhatsApp
              </button>
            )}
          </>
        )}

        {/* ═══ ÉTAPE 3 — CONFIRMATION ═══ */}
        {etape === 3 && (
          <div style={{ textAlign:"center", padding:"24px 0" }}>
            <div style={{ fontSize:"3rem", marginBottom:12 }}>🎉</div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.1rem", color:"var(--ink)", marginBottom:8 }}>
              Demande envoyée !
            </div>
            <p style={{ fontSize:".82rem", color:"var(--gray)", marginBottom:18, lineHeight:1.7 }}>
              Votre message a été envoyé à {livreurChoisi?.name || "un livreur"} via WhatsApp.<br/>
              Il vous confirmera dans les 5 prochaines minutes.
            </p>
            {/* Récap */}
            <div style={{ background:"var(--surface2)", borderRadius:10, padding:"13px 14px", textAlign:"left", marginBottom:18, border:"1px solid var(--border)" }}>
              <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:".82rem", color:"var(--ink)", marginBottom:8 }}>📋 Récapitulatif</div>
              {[
                ["📍 Collecte", `${quartierCollecte}, ${villeCollecte}`],
                ["🏠 Livraison", `${quartierLivraison}, ${villeCollecte}`],
                ["📦 Colis", TYPES_COLIS.find(t=>t.id===typeColis)?.label || typeColis],
                ["👤 Destinataire", nomDestinataire],
                ["📞 Tél", telDestinataire],
                tarif ? ["💰 Tarif estimé", `${tarif.min.toLocaleString()} – ${tarif.max.toLocaleString()} FCFA`] : null,
                tarif ? ["⏱ Délai", tarif.delai] : null,
              ].filter(Boolean).map(([k,v]) => (
                <div key={k} style={{ display:"flex", justifyContent:"space-between", fontSize:".78rem", padding:"4px 0", borderBottom:"1px solid var(--border)" }}>
                  <span style={{ color:"var(--gray)" }}>{k}</span>
                  <span style={{ fontWeight:600, color:"var(--ink)" }}>{v}</span>
                </div>
              ))}
            </div>
            <button className="form-submit" style={{ width:"auto", padding:"10px 28px" }} onClick={onClose}>
              ✅ Fermer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────────────────────
// COMPOSANT : FORMULAIRE DE CONTACT
// ─────────────────────────────────────────────────────────────
function ContactForm({ user, userData }) {
  const [form, setForm] = useState({ nom: userData?.nom||"", email: userData?.email||"", sujet:"", message:"" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const send = async () => {
    if (!form.nom||!form.email||!form.sujet||!form.message) { setErr("Tous les champs sont obligatoires."); return; }
    setLoading(true); setErr("");
    try {
      // Sauvegarder dans Supabase
      await supabase.from("messages").insert({
        expediteur_id: user?.id || null,
        destinataire_id: "support",
        texte: `[CONTACT] Sujet: ${form.sujet}\n\n${form.message}`,
        conversation_id: `contact_${Date.now()}`,
        lu: false,
        meta: JSON.stringify({ nom: form.nom, email: form.email, sujet: form.sujet }),
      }).catch(e => console.warn("Contact save:", e?.message));

      // Ouvrir WhatsApp avec le message
      const msg = [
        `📩 *Contact Yorix CM*`,
        ``,
        `👤 Nom : ${form.nom}`,
        `✉️ Email : ${form.email}`,
        `📋 Sujet : ${form.sujet}`,
        ``,
        `💬 Message :`,
        form.message,
      ].join("\n");
      window.open(`https://wa.me/237696565654?text=${encodeURIComponent(msg)}`, "_blank");
      setSent(true);
    } catch(e) { setErr("Erreur d'envoi. Réessayez."); }
    setLoading(false);
  };

  if (sent) return (
    <div className="success-msg" style={{textAlign:"center",padding:"24px"}}>
      <div style={{fontSize:"2rem",marginBottom:8}}>✅</div>
      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"1rem",marginBottom:4}}>Message envoyé !</div>
      <p style={{fontSize:".8rem",color:"var(--gray)"}}>Notre équipe vous répond sous 2h via WhatsApp ou email.</p>
      <button className="btn-ghost" style={{marginTop:12}} onClick={()=>setSent(false)}>Envoyer un autre message</button>
    </div>
  );

  return (
    <>
      {err && <div className="error-msg">⚠️ {err}</div>}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11,marginBottom:11}}>
        <div className="form-group" style={{marginBottom:0}}>
          <label className="form-label">Nom complet <span style={{color:"var(--red)"}}>*</span></label>
          <input className="form-input" placeholder="Votre nom" value={form.nom} onChange={e=>setForm(f=>({...f,nom:e.target.value}))}/>
        </div>
        <div className="form-group" style={{marginBottom:0}}>
          <label className="form-label">Email <span style={{color:"var(--red)"}}>*</span></label>
          <input className="form-input" type="email" placeholder="votre@email.com" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}/>
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Sujet <span style={{color:"var(--red)"}}>*</span></label>
        <select className="form-select" value={form.sujet} onChange={e=>setForm(f=>({...f,sujet:e.target.value}))}>
          <option value="">Choisir un sujet...</option>
          {["Problème avec une commande","Signaler un vendeur","Demande de remboursement","Problème de paiement","Devenir vendeur","Devenir livreur","Autre question"].map(s=><option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Message <span style={{color:"var(--red)"}}>*</span></label>
        <textarea className="form-textarea" style={{minHeight:100}} placeholder="Décrivez votre demande en détail..." value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))}/>
      </div>
      <button className="form-submit" onClick={send} disabled={loading}>
        {loading ? <><div className="spinner" style={{width:16,height:16,borderWidth:2}}/>Envoi...</> : "📱 Envoyer via WhatsApp"}
      </button>
      <p style={{fontSize:".69rem",color:"var(--gray)",textAlign:"center",marginTop:6}}>
        Votre message sera envoyé sur WhatsApp à notre équipe support · Réponse garantie sous 2h
      </p>
    </>
  );
}

export default function Yorix() {
  const [dark, setDark]           = useState(false);
  const [page, setPage]           = useState("home");
  const [showLivraisonForm, setShowLivraisonForm] = useState(false); // Modal formulaire livraison
  const [user, setUser]           = useState(null);
  const [userData, setUserData]   = useState(null);
  const [userRole, setUserRole]   = useState(null);
  const [loading, setLoading]     = useState(true);

  // Auth
  const [authOpen, setAuthOpen]         = useState(false);
  const [authTab, setAuthTab]           = useState("login");
  const [selectedRole, setSelectedRole] = useState("buyer");
  const [authForm, setAuthForm]         = useState({ nom:"", email:"", tel:"", password:"" });
  const [authError, setAuthError]       = useState("");
  const [authLoading, setAuthLoading]   = useState(false);

  // Produits
  const [produits, setProduits]                 = useState([]);
  const [produitsLoading, setProduitsLoading]   = useState(true);
  const [search, setSearch]                     = useState("");
  const [filterCat, setFilterCat]               = useState("");

  // Panier
  const [cartOpen, setCartOpen]   = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Notifs
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs, setNotifs]       = useState([]);

  // Dashboard
  const [dashTab, setDashTab] = useState("overview");

  // Divers
  const [waOpen, setWaOpen]                 = useState(false);
  const [nlEmail, setNlEmail]               = useState("");
  const [nlSent, setNlSent]                 = useState(false);
  const [wishlist, setWishlist]             = useState(new Set());
  const [loyaltyPts, setLoyaltyPts]         = useState(320);
  const [inscriptionSent, setInscriptionSent] = useState(false);
  const [inscriptionForm, setInscriptionForm] = useState({ nom:"",prenom:"",tel:"",email:"",metier:"",ville:"",experience:"",tarif:"",bio:"" });

  const [chatMessages, setChatMessages] = useState([{ text:"Bonjour ! Comment puis-je vous aider ?", me:false, time:"10:02" }]);
  const [chatMsg, setChatMsg]       = useState("");
  const [chatBlocked, setChatBlocked] = useState(false);
  const chatEndRef = useRef(null);

  // ── NAVIGATION ──
  const goPage = useCallback((p) => {
    setPage(p);
    window.scrollTo(0, 0);
    setCartOpen(false);
    setNotifOpen(false);
  }, []);

  // ── SUPABASE AUTH ──
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) { setUser(session.user); chargerProfil(session.user.id); }
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session?.user) { setUser(session.user); chargerProfil(session.user.id); }
      else { setUser(null); setUserData(null); setUserRole(null); setNotifs([]); }
    });
    return () => subscription.unsubscribe();
  }, []);

  const chargerProfil = async (uid) => {
    const profile = await getUserProfile(uid);
    const role    = getUserRole(profile);
    setUserData(profile);
    setUserRole(role);
    // Notifs
    const { data } = await supabase.from("notifications").select("*").eq("user_id", uid).order("created_at", { ascending:false }).limit(10);
    setNotifs(data || []);
  };

  // ── PRODUITS TEMPS RÉEL ──
  useEffect(() => {
    setProduitsLoading(true);
    const load = async () => {
      let q = supabase.from("products").select("*").eq("actif", true).order("sponsorise", { ascending:false }).order("created_at", { ascending:false }).limit(40);
      if (filterCat) q = q.eq("categorie", filterCat);
      const { data } = await q;
      setProduits(data || []);
      setProduitsLoading(false);
    };
    load();
    const channel = supabase.channel("prod_rt").on("postgres_changes", { event:"*", schema:"public", table:"products" }, load).subscribe();
    return () => supabase.removeChannel(channel);
  }, [filterCat]);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior:"smooth" }); }, [chatMessages]);

  // ── AUTH ──
  const doLogin = async () => {
    setAuthError(""); setAuthLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email:authForm.email, password:authForm.password });
      if (error) throw error;
      setUser(data.user);
      await chargerProfil(data.user.id);
      setAuthOpen(false);
    } catch (err) { setAuthError("Email ou mot de passe incorrect."); }
    setAuthLoading(false);
  };

  const doRegister = async () => {
    setAuthError(""); setAuthLoading(true);
    try {
      // ── Validation champs ──
      if (!authForm.nom.trim())      throw new Error("Le nom est obligatoire.");
      if (!authForm.email.trim())    throw new Error("L'email est obligatoire.");
      if (!authForm.tel.trim())      throw new Error("Le téléphone est obligatoire.");
      if (!authForm.password.trim()) throw new Error("Le mot de passe est obligatoire.");
      if (!selectedRole)             throw new Error("Choisissez un profil : Acheteur, Vendeur, Livreur ou Prestataire.");

      // ── Créer le compte Supabase Auth ──
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email:    authForm.email.trim(),
        password: authForm.password.trim(),
        options:  { data: { display_name: authForm.nom.trim() } },
      });
      if (authError) throw authError;

      const uid = authData?.user?.id;
      if (!uid) throw new Error("Erreur lors de la création du compte. Réessayez.");

      // ── Profil à insérer ──
      const profileData = {
        uid:             uid,
        nom:             authForm.nom.trim(),
        email:           authForm.email.trim(),
        telephone:       authForm.tel.trim(),
        role:            selectedRole,   // rôle EXACT choisi par l'utilisateur
        langue:          "fr",
        actif:           true,
        verifie:         false,
        note:            0,
        nombre_avis:     0,
        total_commandes: 0,
        points_total:    10,             // 10 pts offerts à l'inscription
        points_historique: JSON.stringify([{ action:"inscription", pts:10, date: new Date().toISOString() }]),
      };

      // ── Essayer d'abord dans "users" ──
      const { error: usersErr } = await supabase.from("users").insert(profileData);

      if (usersErr) {
        console.warn("Insert users échoué:", usersErr.message);
        // ── Fallback dans "profiles" (même structure) ──
        const { error: profilesErr } = await supabase.from("profiles").insert({
          id:        uid,   // profiles utilise "id" comme clé
          ...profileData,
        });
        if (profilesErr) {
          console.warn("Insert profiles aussi échoué:", profilesErr.message);
          // On continue quand même — l'auth est créé, le profil sera chargé au login
        }
      }

      // ── Créer le wallet ──
      await supabase.from("wallets").insert({
        user_id:     uid,
        solde:       0,
        total_gagne: 0,
        devise:      "FCFA",
      }).then(() => {}).catch(e => console.warn("Wallet insert:", e?.message));

      // ── Charger le profil et fermer ──
      await chargerProfil(uid);
      setAuthOpen(false);
      setAuthForm({ nom:"", email:"", tel:"", password:"" });

    } catch (err) {
      console.error("Register error:", err);
      if (err.message?.includes("already registered") || err.message?.includes("already been registered")) {
        setAuthError("Cet email est déjà utilisé. Essayez de vous connecter.");
      } else if (err.message?.includes("Password")) {
        setAuthError("Mot de passe trop court (minimum 6 caractères).");
      } else {
        setAuthError(err.message || "Erreur lors de l'inscription. Réessayez.");
      }
    }
    setAuthLoading(false);
  };

  const doGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider:"google", options:{ redirectTo:window.location.origin } });
    if (error) setAuthError(error.message);
  };

  const doLogout = async () => {
    await supabase.auth.signOut();
    setUser(null); setUserData(null); setUserRole(null);
    setDashTab("overview");
    goPage("home");
  };

  // ── PANIER ──
  const addToCart = useCallback((p) => {
    setCartItems(prev => {
      const ex = prev.find(i => i.id === p.id);
      if (ex) return prev.map(i => i.id === p.id ? {...i, qty:i.qty+1} : i);
      const img = p.image_urls?.[0] || p.image || null;
      return [...prev, { id:p.id, name:p.name_fr, image:img, prix:p.prix, qty:1, vendeur_id:p.vendeur_id }];
    });
    setCartOpen(true);
  }, []);
  const changeQty = (id, d) => setCartItems(prev => prev.map(i => i.id===id ? {...i, qty:Math.max(1,i.qty+d)} : i));
  const removeItem = (id) => setCartItems(prev => prev.filter(i => i.id!==id));
  const totalQty   = cartItems.reduce((a,i) => a+i.qty, 0);
  const totalPrice = cartItems.reduce((a,i) => a+(i.prix*i.qty), 0);

  const passerCommande = async () => {
    if (!user) { setAuthOpen(true); setCartOpen(false); return; }
    try {
      const batch = cartItems.map(item =>
        supabase.from("orders").insert({
          product_id: item.id, vendeur_id: item.vendeur_id,
          client_id: user.id, client_nom: userData?.nom || user.email,
          telephone: userData?.telephone || "",
          montant: item.prix * item.qty,
          commission: Math.round(item.prix * item.qty * COMMISSION_RATE),
          montant_vendeur: Math.round(item.prix * item.qty * (1-COMMISSION_RATE)),
          status:"pending", livraison_status:"pending", escrow_status:"pending",
        })
      );
      await Promise.all(batch);
      setCartItems([]);
      setCartOpen(false);
      alert("✅ Commande créée ! Vous serez contacté(e) pour le paiement.");
      goPage("dashboard");
    } catch (err) { alert("Erreur : " + err.message); }
  };

  // ── CHAT ──
  const sendChat = async () => {
    if (!chatMsg.trim()) return;
    const filtre = filtrerMsg(chatMsg);
    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2,"0")}`;
    if (filtre.bloque) {
      setChatBlocked(true); setTimeout(() => setChatBlocked(false), 4000);
      if (user) await supabase.from("fraud_logs").insert({ type:"tentative_contournement", user_id:user.id, message:chatMsg }).catch(e => console.warn("Supabase error:", e?.message));
      setChatMsg(""); return;
    }
    if (user) await supabase.from("messages").insert({ expediteur_id:user.id, destinataire_id:"support", texte:chatMsg, conversation_id:`${user.id}_support`, lu:false }).catch(e => console.warn("Supabase error:", e?.message));
    setChatMessages(prev => [...prev, { text:chatMsg, me:true, time }]);
    setChatMsg("");
    setTimeout(() => setChatMessages(prev => [...prev, { text:"Merci ! Un conseiller Yorix vous répond dans quelques minutes. ⚡", me:false, time }]), 1200);
  };

  const toggleWish = useCallback((id) => { if (!id) return; setWishlist(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; }); }, []);

  const marquerNotifLue = async (id) => {
    await supabase.from("notifications").update({ lu:true }).eq("id", id).catch(e => console.warn("Supabase error:", e?.message));
    setNotifs(prev => prev.map(n => n.id===id ? {...n,lu:true} : n));
  };
  const marquerToutesLues = async () => {
    const ids = notifs.filter(n => !n.lu).map(n => n.id);
    if (ids.length) { await supabase.from("notifications").update({lu:true}).in("id",ids).catch(e => console.warn("Supabase error:", e?.message)); setNotifs(prev => prev.map(n => ({...n,lu:true}))); }
  };

  const unread = notifs.filter(n => !n.lu).length;
  const produitsFiltres = produits.filter(p => !search || p.name_fr?.toLowerCase().includes(search.toLowerCase()) || p.description_fr?.toLowerCase().includes(search.toLowerCase()));

  const roleChipClass = () => ({ buyer:"chip-buyer", seller:"chip-seller", delivery:"chip-delivery", provider:"chip-provider" }[userRole] || "chip-buyer");

  const getDashNav = () => {
    if (userRole === "seller")   return [{icon:"📊",id:"overview",label:"Vue d'ensemble"},{icon:"🏪",id:"mesProduits",label:"Mes produits"},{icon:"➕",id:"ajouterProduit",label:"Ajouter produit"},{icon:"📦",id:"commandes",label:"Commandes"},{icon:"💰",id:"wallet",label:"Wallet"}];
    if (userRole === "delivery") return [{icon:"📊",id:"overview",label:"Vue d'ensemble"},{icon:"🟡",id:"disponibles",label:"Disponibles"},{icon:"🚚",id:"enCours",label:"En cours"},{icon:"✅",id:"historique",label:"Historique"},{icon:"💰",id:"wallet",label:"Gains"}];
    if (userRole === "provider") return [{icon:"📊",id:"overview",label:"Vue d'ensemble"},{icon:"📋",id:"demandes",label:"Demandes"},{icon:"➕",id:"ajouterService",label:"Ajouter service"}];
    return [{icon:"📊",id:"overview",label:"Vue d'ensemble"},{icon:"📦",id:"commandes",label:"Mes commandes"},{icon:"❤️",id:"favoris",label:"Favoris"},{icon:"🌟",id:"loyalty",label:"Fidélité"}];
  };

  const TABS = [
    {l:"🏠 Accueil",p:"home"},{l:"🛍️ Produits",p:"produits"},{l:"🚚 Livraison",p:"livraison"},
    {l:"🔐 Escrow",p:"escrow"},{l:"👷 Prestataires",p:"prestataires"},{l:"💼 Business",p:"business"},
    {l:"🎓 Academy",p:"academy"},{l:"📰 Blog",p:"blog"},{l:"🌟 Fidélité",p:"loyalty"},
    {l:"📞 Contact",p:"contact"},{l:"🆘 Aide",p:"aide"},
    ...(user ? [{l:"📊 Mon espace",p:"dashboard"}] : []),
  ];

  if (loading) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100vh", fontFamily:"'DM Sans',sans-serif", color:"#1a6b3a", gap:12 }}>
      <div style={{ width:40, height:40, border:"4px solid #e2ddd6", borderTopColor:"#1a6b3a", borderRadius:"50%", animation:"spin .7s linear infinite" }}/>
      Chargement de Yorix...
      <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
    </div>
  );

  return (
    <>
      <style>{makeCSS(dark)}</style>

      {/* ── MODAL FORMULAIRE LIVRAISON ── */}
      {showLivraisonForm && (
        <FormulaireLivraison
          user={user}
          userData={userData}
          onClose={() => setShowLivraisonForm(false)}
        />
      )}

      {/* ── AUTH MODAL ── */}
      {authOpen && (
        <div className="modal-overlay" onClick={e => e.target===e.currentTarget && setAuthOpen(false)}>
          <div className="modal" style={{width:"100%",maxWidth:480,margin:"0 auto"}}>
            <button className="modal-close" onClick={() => setAuthOpen(false)}>✕</button>
            <div className="modal-title">{authTab==="login" ? "Bon retour ! 👋" : "Rejoindre Yorix 🇨🇲"}</div>
            <p className="modal-sub">Votre marketplace camerounaise de confiance</p>
            <div className="auth-tabs">
              <button className={`auth-tab${authTab==="login"?" active":""}`} onClick={() => { setAuthTab("login"); setAuthError(""); }}>🔑 Connexion</button>
              <button className={`auth-tab${authTab==="register"?" active":""}`} onClick={() => { setAuthTab("register"); setAuthError(""); }}>🚀 Inscription</button>
            </div>
            {authError && <div className="error-msg">⚠️ {authError}</div>}

            {authTab === "register" && (
              <>
                <div style={{background:"var(--green-pale)",border:"1px solid var(--green-light)",borderRadius:9,padding:"10px 12px",marginBottom:12,fontSize:".78rem",color:"var(--green)",fontWeight:600}}>
                  👇 Choisissez votre profil pour commencer
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
                  {[
                    {id:"buyer",   icon:"🛍️", label:"Acheteur",    desc:"J'achète des produits"},
                    {id:"seller",  icon:"🏪", label:"Vendeur",     desc:"Je vends mes produits"},
                    {id:"delivery",icon:"🚚", label:"Livreur",     desc:"J'effectue des livraisons"},
                    {id:"provider",icon:"👷", label:"Prestataire", desc:"Je propose des services"},
                  ].map(r => (
                    <div
                      key={r.id}
                      onClick={() => setSelectedRole(r.id)}
                      style={{
                        border:`2px solid ${selectedRole===r.id?"var(--green)":"var(--border)"}`,
                        borderRadius:10,padding:"12px 10px",cursor:"pointer",
                        background:selectedRole===r.id?"var(--green-pale)":"var(--surface)",
                        textAlign:"center",transition:"all .2s",
                      }}
                    >
                      <div style={{fontSize:"1.8rem",marginBottom:4}}>{r.icon}</div>
                      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".82rem",color:"var(--ink)"}}>{r.label}</div>
                      <div style={{fontSize:".67rem",color:"var(--gray)",marginTop:2}}>{r.desc}</div>
                      {selectedRole===r.id && <div style={{marginTop:5,fontSize:".62rem",fontWeight:700,color:"var(--green)"}}>✅ Sélectionné</div>}
                    </div>
                  ))}
                </div>
                <div className="form-group">
                  <label className="form-label">Nom complet <span>*</span></label>
                  <input className="form-input" placeholder="Ex: Amina Bello" value={authForm.nom} onChange={e => setAuthForm(f=>({...f,nom:e.target.value}))}/>
                </div>
                <div className="form-group">
                  <label className="form-label">Téléphone <span>*</span></label>
                  <input className="form-input" type="tel" placeholder="+237 6XX XXX XXX" value={authForm.tel} onChange={e => setAuthForm(f=>({...f,tel:e.target.value}))}/>
                </div>
              </>
            )}
            <div className="form-group">
              <label className="form-label">Email <span>*</span></label>
              <input className="form-input" type="email" placeholder="votre@email.com" value={authForm.email} onChange={e => setAuthForm(f=>({...f,email:e.target.value}))}/>
            </div>
            <div className="form-group">
              <label className="form-label">Mot de passe <span>*</span></label>
              <input className="form-input" type="password" placeholder="••••••••" value={authForm.password} onChange={e => setAuthForm(f=>({...f,password:e.target.value}))}/>
            </div>
            <button className="form-submit" onClick={authTab==="login" ? doLogin : doRegister} disabled={authLoading} style={{fontSize:".9rem",padding:"13px"}}>
              {authLoading
                ? <><div className="spinner" style={{width:16,height:16,borderWidth:2}}/>Chargement...</>
                : authTab==="login"
                  ? "🔑 Se connecter"
                  : `🚀 Créer mon compte ${selectedRole==="buyer"?"Acheteur":selectedRole==="seller"?"Vendeur":selectedRole==="delivery"?"Livreur":"Prestataire"}`
              }
            </button>
            {authTab==="register" && (
              <p style={{fontSize:".68rem",color:"var(--gray)",textAlign:"center",marginTop:8}}>
                En vous inscrivant, vous acceptez nos conditions d'utilisation
              </p>
            )}
            <div className="divider">ou</div>
            <button className="social-btn" onClick={doGoogle}><span>🇬</span> Continuer avec Google</button>
          </div>
        </div>
      )}

      {/* ── CART ── */}
      <div className={`cart-overlay${cartOpen?" open":""}`} onClick={() => setCartOpen(false)}/>
      <div className={`cart-drawer${cartOpen?" open":""}`}>
        <div className="cart-header"><span className="cart-title">🛒 Panier ({totalQty})</span><button className="cart-close" onClick={() => setCartOpen(false)}>✕</button></div>
        <div className="cart-items">
          {cartItems.length === 0
            ? <div style={{textAlign:"center",padding:"36px 0",color:"var(--gray)"}}><div style={{fontSize:"2.4rem"}}>🛒</div><p>Panier vide</p></div>
            : cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="ci-img">{item.image && item.image.startsWith("http") ? <img src={item.image} alt={item.name} onError={e=>{e.currentTarget.onerror=null;e.currentTarget.src="https://via.placeholder.com/42?text=📦";}}/> : <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--surface2)",fontSize:"1.4rem"}}>📦</div>}</div>
                  <div className="ci-info">
                    <div className="ci-name">{item.name}</div>
                    <div className="ci-price">{(item.prix*item.qty).toLocaleString()} FCFA</div>
                    <div className="ci-qty"><button className="qty-btn" onClick={()=>changeQty(item.id,-1)}>−</button><span className="qty-val">{item.qty}</span><button className="qty-btn" onClick={()=>changeQty(item.id,1)}>+</button></div>
                  </div>
                  <button className="ci-del" onClick={()=>removeItem(item.id)}>🗑️</button>
                </div>
              ))
          }
        </div>
        {cartItems.length > 0 && (
          <CartPaymentFooter
            totalPrice={totalPrice}
            cartItems={cartItems}
            onConfirm={passerCommande}
          />
        )}
      </div>

      {/* ── NOTIFS ── */}
      {notifOpen && (
        <div className="notif-drawer">
          <div className="notif-header"><span className="notif-title">🔔 Notifications ({unread})</span><span className="notif-clear" onClick={marquerToutesLues}>Tout lire</span></div>
          <div className="notif-list">
            {notifs.length === 0
              ? <div style={{padding:"20px",textAlign:"center",color:"var(--gray)",fontSize:".8rem"}}>Aucune notification</div>
              : notifs.map(n => (
                  <div key={n.id} className={`notif-item${!n.lu?" unread":""}`} onClick={() => marquerNotifLue(n.id)}>
                    <div className="notif-icon">{n.icon||"🔔"}</div>
                    <div className="notif-body"><h4>{n.title||n.type}</h4><p>{n.message}</p><div className="notif-time">{n.created_at?new Date(n.created_at).toLocaleString("fr-FR"):""}</div></div>
                  </div>
                ))
            }
          </div>
        </div>
      )}

      {/* ── TOPBAR ── */}
      <div className="topbar">
        <div className="topbar-l"><span className="flag-wrap"><div className="flag"><div className="fg"/><div className="fr"/><div className="fy"/></div>Cameroun · FCFA</span><span>📞 +237 696 56 56 54</span><span>✉️ support@yorix.cm</span></div>
        <div className="topbar-r"><span onClick={()=>goPage("academy")}>🎓 Academy</span><span>|</span><span onClick={()=>goPage("business")}>💼 Business</span><span>|</span><span onClick={()=>goPage("blog")}>Blog</span></div>
      </div>

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="logo-wrap" onClick={()=>goPage("home")}><div className="logo-txt">Yo<span>rix</span><sup>CM</sup></div></div>
        <div className="nav-search">
          <select value={filterCat} onChange={e => setFilterCat(e.target.value)}><option value="">Tout</option>{CATS.map(c=><option key={c}>{c}</option>)}</select>
          <input placeholder="Rechercher au Cameroun..." value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=>e.key==="Enter"&&goPage("produits")}/>
          <button onClick={()=>goPage("produits")}>🔍</button>
        </div>
        <div className="nav-actions">
          <button className="dark-toggle" onClick={()=>setDark(d=>!d)}>{dark?"☀️":"🌙"}</button>
          <button className="icon-btn" onClick={()=>{setNotifOpen(o=>!o);setCartOpen(false);}}>🔔{unread>0&&<span className="ibadge">{unread}</span>}</button>
          <button className="icon-btn" onClick={()=>{setCartOpen(o=>!o);setNotifOpen(false);}}>🛒{totalQty>0&&<span className="ibadge">{totalQty}</span>}</button>
          {user ? (
            <>
              {userRole && <span className={`role-chip ${roleChipClass()}`}>{ROLE_LABELS[userRole]}</span>}
              <div className="user-av" onClick={()=>goPage("dashboard")}>{userData?.nom?.[0]||user.email?.[0]?.toUpperCase()||"U"}</div>
              <button className="btn-ghost" onClick={doLogout}>Déco.</button>
            </>
          ) : (
            <><button className="btn-ghost" onClick={()=>{setAuthTab("login");setAuthOpen(true);}}>Connexion</button><button className="btn-green" onClick={()=>{setAuthTab("register");setAuthOpen(true);}}>S'inscrire</button></>
          )}
          <button className="btn-red" onClick={()=>goPage("inscription")}>+ Prestataire</button>
        </div>
      </nav>

      {/* ── TABS ── */}
      <div className="nav-tabs">{TABS.map(t=><div key={t.p} className={`tab${page===t.p?" active":""}`} onClick={()=>goPage(t.p)}>{t.l}</div>)}</div>

      {/* ── PAY STRIP ── */}
      <div className="pay-strip">
        <b style={{color:"var(--ink)"}}>Paiement :</b>
        <div className="pay-methods"><span className="pm mtn-b">📱 MTN MoMo</span><span className="pm ora-b">🔶 Orange Money</span><span className="pm">💳 Carte</span><span className="pm">💵 Cash</span></div>
        <div className="strip-right"><span>🚚 J+1 Douala & Yaoundé</span><span>🔐 Escrow sécurisé</span>{user&&<span style={{color:"var(--gold)"}}>👤 {userData?.nom||user.email}</span>}</div>
      </div>

      {/* ════════ PAGE : ACCUEIL ════════ */}
      {page==="home"&&(
        <div className="anim">

          {/* ── TRUST BANNER ── */}
          <div className="trust-banner">
            <div className="tb-item">🚚 Livraison rapide à Yaoundé &amp; Douala</div>
            <div className="tb-item">🔒 Paiement 100% sécurisé</div>
            <div className="tb-item">✅ Produits vérifiés</div>
            <div className="tb-item">📱 Support WhatsApp 7j/7</div>
          </div>

          {/* ── HERO ── */}
          <section className="hero">
            <div className="hero-inner">
              <div>
                <div className="hero-tag">🇨🇲 Marketplace #1 au Cameroun</div>
                <h1>Achetez et faites-vous<br/>livrer à <em>Yaoundé</em></h1>
                <p className="hero-sub">Produits locaux & importés · Prestataires vérifiés · Livraison express · MTN MoMo & Orange Money</p>

                {/* Badges confiance */}
                <div className="hero-badges">
                  <span className="hbadge hbadge-yellow">⭐ +2 000 avis clients</span>
                  <span className="hbadge hbadge-green">📦 +100 produits vendus</span>
                  <span className="hbadge">🔒 Paiement sécurisé</span>
                  <span className="hbadge">🚚 Livraison rapide</span>
                </div>

                <div className="hero-ctas">
                  <button className="cta-y" onClick={()=>goPage("produits")}>🛍️ Voir les produits</button>
                  <button
                    className="btn-wa"
                    onClick={()=>window.open(`https://wa.me/${YORIX_WA_NUMBER}?text=${encodeURIComponent("Bonjour Yorix ! Je veux commander un produit 🛍️")}`, "_blank")}
                  >📱 Commander via WhatsApp</button>
                </div>

                <div className="hero-stats">
                  {[["85K+","Produits"],["12K","Vendeurs"],["3K","Prestataires"],["10","Régions"]].map(([n,l])=>(
                    <div key={l}><div className="stat-num">{n}</div><div className="stat-lbl">{l}</div></div>
                  ))}
                </div>
              </div>

              <div className="hero-card">
                <div className="hc-title">🔍 Recherche rapide</div>
                <div className="sf">
                  <select value={filterCat} onChange={e=>setFilterCat(e.target.value)}>
                    <option value="">Tout</option>{CATS.map(c=><option key={c}>{c}</option>)}
                  </select>
                  <input placeholder="Produit, marque..." value={search} onChange={e=>setSearch(e.target.value)}/>
                </div>
                <div className="sf">
                  <select>{CITIES.map(c=><option key={c}>{c}</option>)}</select>
                  <input placeholder="Budget max (FCFA)"/>
                </div>
                <button className="sbtn" onClick={()=>goPage("produits")}>🔍 Rechercher</button>
                <div className="pop-row">
                  <span className="pop-lbl">Tendances :</span>
                  {["Pagne wax","iPhone","Karité","BTP"].map(s=>(
                    <span key={s} className="pop-tag" onClick={()=>{setSearch(s);goPage("produits");}}>{s}</span>
                  ))}
                </div>
                {/* Mini trust dans hero card */}
                <div style={{marginTop:12,paddingTop:10,borderTop:"1px solid rgba(255,255,255,.1)",display:"flex",flexDirection:"column",gap:4}}>
                  {["✅ Paiement sécurisé MTN MoMo","🚚 Livraison Yaoundé & Douala","🔐 Remboursement garanti Escrow"].map(t=>(
                    <div key={t} style={{fontSize:".68rem",color:"rgba(255,255,255,.65)",display:"flex",alignItems:"center",gap:5}}>{t}</div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── SOCIAL PROOF BAR ── */}
          <div className="proof-bar">
            <div className="proof-item"><span className="proof-num">2 400+</span> commandes passées</div>
            <div className="proof-item"><span className="proof-num">850+</span> vendeurs actifs</div>
            <div className="proof-item"><span className="proof-num">98%</span> satisfaction client</div>
            <div className="proof-item"><span className="proof-num">J+1</span> livraison Yaoundé</div>
          </div>

          {/* ── OFFRES FLASH DU JOUR ── */}
          <section className="sec" style={{paddingBottom:0}}>
            <div className="sec-head">
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <h2 className="sec-title">⚡ Offres Flash</h2>
                <span style={{background:"#ff4444",color:"#fff",padding:"3px 10px",borderRadius:50,fontSize:".68rem",fontWeight:800,animation:"flashPulse 1.5s infinite"}}>AUJOURD'HUI SEULEMENT</span>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:".75rem",color:"var(--gray)"}}>Se termine dans :</span>
                <FlashCountdown/>
              </div>
            </div>
            {/* Bandeau promo */}
            <div style={{background:"linear-gradient(135deg,#ff4444,#ff6b35)",borderRadius:12,padding:"14px 18px",marginBottom:16,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
              <div>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1rem",color:"#fff",marginBottom:3}}>🔥 Promo du jour — jusqu'à -30% sur tous les téléphones !</div>
                <div style={{fontSize:".78rem",color:"rgba(255,255,255,.75)"}}>Offre valable uniquement aujourd'hui · Paiement MTN MoMo accepté</div>
              </div>
              <button
                style={{background:"#fff",color:"#ff4444",border:"none",padding:"9px 18px",borderRadius:8,fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".82rem",cursor:"pointer",whiteSpace:"nowrap"}}
                onClick={()=>{ setFilterCat("Téléphones"); goPage("produits"); }}
              >🛍️ Voir les promos</button>
            </div>
            {/* Grille flash : les 4 premiers produits avec badge flash simulé */}
            {!produitsLoading && produits.length > 0 && (
              <ProdGrid
                prods={produits.slice(0,4).map((p,i) => ({
                  ...p,
                  flash: i < 2,
                  promo: i >= 2 && i < 4,
                  promo_pct: i === 2 ? 20 : i === 3 ? 15 : 0,
                }))}
                user={user} userData={userData} onAddToCart={addToCart} onWish={toggleWish} wishlist={wishlist}
              />
            )}
          </section>

          {/* ── PRODUITS RÉCENTS ── */}
          <section className="sec">
            <div className="sec-head">
              <h2 className="sec-title">🔥 Produits populaires</h2>
              <span className="sec-link" onClick={()=>goPage("produits")}>Voir tout →</span>
            </div>
            {produitsLoading
              ? <div className="loading"><div className="spinner"/>Chargement...</div>
              : produits.length===0
                ? <div className="empty-state"><div className="empty-icon">🛍️</div><p>Aucun produit pour l'instant</p></div>
                : <ProdGrid prods={produits.slice(0,10)} user={user} userData={userData} onAddToCart={addToCart} onWish={toggleWish} wishlist={wishlist}/>
            }
          </section>

          {/* ── TRUST BAND ── */}
          <div className="trust">
            <div className="trust-inner">
              {[
                {icon:"📱",t:"MTN MoMo & Orange",p:"Paiement mobile sécurisé"},
                {icon:"🔐",t:"Escrow Yorix",p:"Fonds protégés jusqu'à livraison"},
                {icon:"🚚",t:"Livraison J+1",p:"Yaoundé & Douala"},
                {icon:"🌟",t:"Vendeurs vérifiés",p:"Boutiques certifiées"},
              ].map(t=>(
                <div key={t.t} className="ti"><div className="ti-icon">{t.icon}</div><div><h4>{t.t}</h4><p>{t.p}</p></div></div>
              ))}
            </div>
          </div>

          {/* ── POURQUOI CHOISIR YORIX ── */}
          <div className="why-section">
            <div className="why-inner">
              <div style={{textAlign:"center",marginBottom:4}}>
                <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"var(--green-pale)",color:"var(--green)",padding:"4px 12px",borderRadius:50,fontSize:".72rem",fontWeight:700,marginBottom:8}}>🏆 Pourquoi nous choisissons Yorix ?</div>
                <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"1.3rem",fontWeight:800,color:"var(--ink)",letterSpacing:"-.5px"}}>La marketplace la plus fiable du Cameroun</h2>
              </div>
              <div className="why-grid">
                {[
                  {icon:"🚚",title:"Livraison rapide",desc:"Livraison le jour même ou J+1 sur Yaoundé et Douala. Suivi GPS en temps réel."},
                  {icon:"✅",title:"Produits vérifiés",desc:"Chaque vendeur est contrôlé. Produits authentiques garantis ou remboursés."},
                  {icon:"🔒",title:"Paiement sécurisé",desc:"MTN MoMo, Orange Money, Escrow Yorix. Votre argent libéré à la réception."},
                  {icon:"📱",title:"Support WhatsApp",desc:"Notre équipe répond 7j/7 sur WhatsApp pour vous aider à chaque étape."},
                ].map(w=>(
                  <div key={w.title} className="why-card">
                    <div className="why-icon">{w.icon}</div>
                    <div className="why-title">{w.title}</div>
                    <div className="why-desc">{w.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── PRESTATAIRES ── */}
          <section className="sec">
            <div className="sec-head">
              <h2 className="sec-title">👷 Prestataires de confiance</h2>
              <span className="sec-link" onClick={()=>goPage("prestataires")}>Voir tous →</span>
            </div>
            <div className="prest-grid">
              {PREST_DATA.slice(0,3).map(p=>(
                <div key={p.name} className="prest-card">
                  <div className="prest-top">
                    <div className="prest-av">{p.emoji}</div>
                    <div><div className="prest-name">{p.name}</div><div className="prest-meta">{p.meta}</div></div>
                  </div>
                  <div className="prest-tags">{p.tags.map(t=><span key={t} className="ptag">{t}</span>)}</div>
                  <div className="prest-footer">
                    <div><div className="prest-price">{p.prix}</div><div style={{fontSize:".69rem",color:"var(--gray)"}}>⭐ {p.note} · {p.avis} avis</div></div>
                    <button className="btn-hire" onClick={()=>window.open(`https://wa.me/${YORIX_WA_NUMBER}?text=${encodeURIComponent(`Bonjour, je cherche un prestataire : ${p.name}`)}`, "_blank")}>📱 Contacter</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── AVIS CLIENTS CAMEROUNAIS ── */}
          <section className="sec" style={{paddingTop:0}}>
            <div className="sec-head">
              <h2 className="sec-title">💬 Ils font confiance à Yorix</h2>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.1rem",color:"var(--green)"}}>4.9</span>
                <span style={{color:"var(--gold)"}}>★★★★★</span>
                <span style={{fontSize:".75rem",color:"var(--gray)"}}>+2 400 avis</span>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
              {AVIS_CLIENTS.map(a=>(
                <div key={a.nom} style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:12,padding:16}}>
                  <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:10}}>
                    <div style={{width:38,height:38,borderRadius:"50%",background:"var(--green)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1rem",flexShrink:0}}>
                      {a.avatar}
                    </div>
                    <div>
                      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".82rem",color:"var(--ink)"}}>{a.nom}</div>
                      <div style={{fontSize:".65rem",color:"var(--gray)"}}>{a.ville} · {a.role}</div>
                    </div>
                    <div style={{marginLeft:"auto",display:"flex",flexDirection:"column",alignItems:"flex-end"}}>
                      <div style={{color:"var(--gold)",fontSize:".75rem"}}>{"★".repeat(a.note)}</div>
                      <div style={{fontSize:".6rem",color:"var(--gray)"}}>{a.date}</div>
                    </div>
                  </div>
                  <p style={{fontSize:".78rem",color:"var(--gray)",lineHeight:1.65,fontStyle:"italic"}}>"{a.texte}"</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── AVIS CLIENTS CAMEROUNAIS ── */}
          <section className="sec" style={{paddingTop:0}}>
            <div className="sec-head">
              <h2 className="sec-title">💬 Ils font confiance à Yorix</h2>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.1rem",color:"var(--green)"}}>4.9</span>
                <span style={{color:"var(--gold)"}}>★★★★★</span>
                <span style={{fontSize:".75rem",color:"var(--gray)"}}>+2 400 avis</span>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
              {AVIS_CLIENTS.map(a=>(
                <div key={a.nom} style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:12,padding:16}}>
                  <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:10}}>
                    <div style={{width:38,height:38,borderRadius:"50%",background:"var(--green)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1rem",flexShrink:0}}>{a.avatar}</div>
                    <div>
                      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".82rem",color:"var(--ink)"}}>{a.nom}</div>
                      <div style={{fontSize:".65rem",color:"var(--gray)"}}>{a.ville} · {a.role}</div>
                    </div>
                    <div style={{marginLeft:"auto",display:"flex",flexDirection:"column",alignItems:"flex-end"}}>
                      <div style={{color:"var(--gold)",fontSize:".75rem"}}>{"★".repeat(a.note)}</div>
                      <div style={{fontSize:".6rem",color:"var(--gray)"}}>{a.date}</div>
                    </div>
                  </div>
                  <p style={{fontSize:".78rem",color:"var(--gray)",lineHeight:1.65,fontStyle:"italic"}}>"{a.texte}"</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── NEWSLETTER ── */}
          <div className="newsletter">
            <div className="nl-title">📬 Restez informé(e)</div>
            <p className="nl-sub">Les meilleures offres Yorix directement dans votre boîte mail.</p>
            {nlSent
              ? <div style={{background:"rgba(255,255,255,.2)",borderRadius:8,padding:"9px 18px",color:"#fff",fontWeight:600}}>✅ Vous êtes abonné(e) !</div>
              : <div className="nl-form">
                  <input className="nl-input" placeholder="Votre email..." value={nlEmail} onChange={e=>setNlEmail(e.target.value)}/>
                  <button className="nl-btn" onClick={async()=>{if(nlEmail){await supabase.from("newsletter").insert({email:nlEmail}).catch(e => console.warn("Supabase error:", e?.message));setNlSent(true);}}}>S'abonner 🚀</button>
                </div>
            }
          </div>

          {/* ── WA STICKY MOBILE ── */}
          <div className="wa-sticky">
            <span className="wa-sticky-text">📱 Commander maintenant</span>
            <button
              className="wa-sticky-btn"
              onClick={()=>window.open(`https://wa.me/${YORIX_WA_NUMBER}?text=${encodeURIComponent("Bonjour Yorix ! Je veux commander 🛍️")}`, "_blank")}
            >
              Commander via WhatsApp
            </button>
          </div>

        </div>
      )}

      {/* ════════ PAGE : PRODUITS ════════ */}
      {page==="produits"&&(
        <section className="sec anim">
          <div className="sec-head">
            <h2 className="sec-title">🛍️ Tous les produits</h2>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <span style={{fontSize:".8rem",color:"var(--gray)"}}>{produitsFiltres.length} résultat(s)</span>
              {filterCat && <button className="btn-ghost" style={{fontSize:".72rem",padding:"4px 10px"}} onClick={()=>setFilterCat("")}>✕ {filterCat}</button>}
            </div>
          </div>
          {/* Filtres catégories */}
          <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:18}}>
            <button onClick={()=>setFilterCat("")} style={{padding:"5px 12px",borderRadius:50,border:"1.5px solid var(--border)",background:!filterCat?"var(--green)":"var(--surface)",color:!filterCat?"#fff":"var(--ink)",font:"600 .72rem 'DM Sans',sans-serif",cursor:"pointer"}}>Tout</button>
            {CATS.map(c=><button key={c} onClick={()=>setFilterCat(c)} style={{padding:"5px 12px",borderRadius:50,border:"1.5px solid var(--border)",background:filterCat===c?"var(--green)":"var(--surface)",color:filterCat===c?"#fff":"var(--ink)",font:"600 .72rem 'DM Sans',sans-serif",cursor:"pointer"}}>{c}</button>)}
          </div>
          {produitsLoading?<div className="loading"><div className="spinner"/>Chargement...</div>
            :produitsFiltres.length===0?<div className="empty-state"><div className="empty-icon">🔍</div><p>Aucun produit{search?` pour "${search}"`:""}.</p></div>
            :<ProdGrid prods={produitsFiltres} user={user} userData={userData} onAddToCart={addToCart} onWish={toggleWish} wishlist={wishlist}/>}
        </section>
      )}

      {/* ════════ PAGE : LIVRAISON ════════ */}
      {page==="livraison"&&(
        <div className="anim">
          <section className="sec">

            {/* ── HERO LIVRAISON ── */}
            <div style={{background:"linear-gradient(135deg,#0a1410,#1a3a24,#0d3320)",borderRadius:16,padding:28,color:"#fff",marginBottom:20,position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:-20,right:-20,width:160,height:160,background:"rgba(79,209,125,.06)",borderRadius:"50%"}}/>
              <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(252,209,22,.14)",color:"var(--yellow)",border:"1px solid rgba(252,209,22,.28)",padding:"4px 12px",borderRadius:50,fontSize:".72rem",fontWeight:700,marginBottom:14}}>
                🛵 Yorix Ride — Livraison Express Cameroun
              </div>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"1.5rem",fontWeight:800,marginBottom:8,lineHeight:1.2}}>
                Livraison à domicile<br/><span style={{color:"#4fd17d"}}>comme Uber, partout au Cameroun</span>
              </h2>
              <p style={{color:"rgba(255,255,255,.6)",fontSize:".85rem",lineHeight:1.75,marginBottom:20,maxWidth:480}}>
                Commandez un produit, un livreur proche de vous accepte la mission en quelques secondes. Suivi GPS en temps réel, paiement sécurisé MTN MoMo / Orange Money.
              </p>

              {/* Stats livraison */}
              <div style={{display:"flex",gap:20,flexWrap:"wrap",marginBottom:20}}>
                {[["🏍️","850+","Livreurs actifs"],["⏱️","~25 min","Temps moyen"],["⭐","4.8/5","Note moyenne"],["📦","12K+","Livraisons/mois"]].map(([ic,val,lbl])=>(
                  <div key={lbl}>
                    <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:2}}>
                      <span style={{fontSize:"1rem"}}>{ic}</span>
                      <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1rem",color:"var(--yellow)"}}>{val}</span>
                    </div>
                    <div style={{fontSize:".62rem",color:"rgba(255,255,255,.35)"}}>{lbl}</div>
                  </div>
                ))}
              </div>

              {/* CTA commander livraison */}
              <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                <button
                  style={{background:"var(--yellow)",color:"#0d1f14",border:"none",padding:"11px 20px",borderRadius:9,fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".85rem",cursor:"pointer"}}
                  onClick={() => setShowLivraisonForm(true)}
                >📦 Demander une livraison</button>
                <button
                  style={{background:"rgba(255,255,255,.09)",color:"#fff",border:"1px solid rgba(255,255,255,.2)",padding:"11px 20px",borderRadius:9,fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".85rem",cursor:"pointer"}}
                  onClick={()=>{ setAuthTab("register"); setSelectedRole("delivery"); setAuthOpen(true); }}
                >🏍️ Devenir livreur Yorix</button>
              </div>
            </div>

            {/* ── COMMENT ÇA MARCHE ── */}
            <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,padding:22,marginBottom:20}}>
              <h3 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1rem",color:"var(--ink)",marginBottom:16,letterSpacing:"-.3px"}}>🗺️ Comment fonctionne Yorix Ride ?</h3>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
                {[
                  {n:1,icon:"🛍️",t:"Vous commandez",d:"Passez commande sur Yorix ou via WhatsApp"},
                  {n:2,icon:"🏍️",t:"Livreur assigné",d:"Un livreur proche accepte votre mission en quelques secondes"},
                  {n:3,icon:"📍",t:"Suivi en direct",d:"Suivez votre livreur sur la carte en temps réel"},
                  {n:4,icon:"✅",t:"Livraison confirmée",d:"Réceptionnez et confirmez. Paiement libéré au livreur."},
                ].map(s=>(
                  <div key={s.n} style={{textAlign:"center",padding:"14px 10px",background:"var(--surface2)",borderRadius:10}}>
                    <div style={{width:28,height:28,background:"var(--green)",color:"#fff",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".78rem",margin:"0 auto 8px"}}>{s.n}</div>
                    <div style={{fontSize:"1.4rem",marginBottom:5}}>{s.icon}</div>
                    <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".78rem",color:"var(--ink)",marginBottom:3}}>{s.t}</div>
                    <div style={{fontSize:".68rem",color:"var(--gray)",lineHeight:1.5}}>{s.d}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── TARIFS ── */}
            <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,padding:22,marginBottom:20}}>
              <h3 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1rem",color:"var(--ink)",marginBottom:14}}>💰 Tarifs de livraison</h3>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
                {[
                  {zone:"🏙️ Intra-ville",prix:"500 – 1 500 FCFA",delai:"20 – 45 min",dispo:"Douala, Yaoundé"},
                  {zone:"🌆 Inter-quartiers",prix:"1 500 – 3 000 FCFA",delai:"1h – 2h",dispo:"Bafoussam, Bamenda"},
                  {zone:"🗺️ Inter-villes",prix:"3 000 – 8 000 FCFA",delai:"J+1",dispo:"Tout le Cameroun"},
                ].map(t=>(
                  <div key={t.zone} style={{background:"var(--surface2)",borderRadius:10,padding:14,border:"1px solid var(--border)"}}>
                    <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".84rem",color:"var(--ink)",marginBottom:5}}>{t.zone}</div>
                    <div style={{fontFamily:"'Syne',sans-serif",fontSize:"1rem",fontWeight:800,color:"var(--green)",marginBottom:3}}>{t.prix}</div>
                    <div style={{fontSize:".69rem",color:"var(--gray)",marginBottom:2}}>⏱ {t.delai}</div>
                    <div style={{fontSize:".65rem",color:"var(--gray)"}}>{t.dispo}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── LIVREURS DISPONIBLES ── */}
            <div>
              <div className="sec-head"><h3 className="sec-title">🏍️ Livreurs disponibles maintenant</h3></div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
                {[
                  {emoji:"🏍️",name:"Jean-Pierre M.",sub:"Moto · Douala · Akwa",livraisons:342,note:4.9,dispo:true,temps:"~15 min",vehicule:"Moto"},
                  {emoji:"🚐",name:"Augustin N.",sub:"Minibus · Yaoundé · Bastos",livraisons:218,note:4.8,dispo:true,temps:"~20 min",vehicule:"Minibus"},
                  {emoji:"🚗",name:"Grace T.",sub:"Voiture · Douala · Bonanjo",livraisons:156,note:5.0,dispo:true,temps:"~10 min",vehicule:"Voiture"},
                  {emoji:"🚚",name:"Fabrice K.",sub:"Camionnette · Bafoussam",livraisons:189,note:4.7,dispo:false,temps:null,vehicule:"Camionnette"},
                  {emoji:"🏍️",name:"Bertrand A.",sub:"Moto · Yaoundé · Mvan",livraisons:271,note:4.8,dispo:true,temps:"~18 min",vehicule:"Moto"},
                  {emoji:"🚐",name:"Carine M.",sub:"Minibus · Douala · Bonapriso",livraisons:98,note:4.9,dispo:false,temps:null,vehicule:"Minibus"},
                ].map(d=>(
                  <div key={d.name} style={{background:d.dispo?"var(--surface)":"var(--surface2)",border:`1.5px solid ${d.dispo?"var(--green-light)":"var(--border)"}`,borderRadius:12,padding:15,opacity:d.dispo?1:.7,transition:"all .2s"}}>
                    <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:10}}>
                      <div style={{width:44,height:44,borderRadius:"50%",background:d.dispo?"var(--green)":"var(--border)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.3rem",flexShrink:0}}>{d.emoji}</div>
                      <div style={{flex:1}}>
                        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".86rem",color:"var(--ink)"}}>{d.name}</div>
                        <div style={{fontSize:".65rem",color:"var(--gray)",lineHeight:1.4}}>{d.sub}</div>
                      </div>
                    </div>
                    <div style={{display:"flex",gap:8,marginBottom:8}}>
                      <div style={{background:"var(--surface2)",borderRadius:7,padding:"4px 8px",fontSize:".67rem",fontWeight:600,color:"var(--ink)"}}>⭐ {d.note}</div>
                      <div style={{background:"var(--surface2)",borderRadius:7,padding:"4px 8px",fontSize:".67rem",fontWeight:600,color:"var(--ink)"}}>📦 {d.livraisons} livraisons</div>
                    </div>
                    <div style={{fontSize:".67rem",marginBottom:10,fontWeight:600,color:d.dispo?"#27a85a":"var(--gray)"}}>
                      {d.dispo
                        ? <><span style={{width:6,height:6,background:"#4fd17d",borderRadius:"50%",display:"inline-block",marginRight:4}}/>Disponible · {d.temps}</>
                        : "⏸️ Non disponible pour le moment"
                      }
                    </div>
                    <button
                      style={{width:"100%",background:d.dispo?"var(--green)":"var(--border)",color:d.dispo?"#fff":"var(--gray)",border:"none",padding:"8px",borderRadius:8,fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".75rem",cursor:d.dispo?"pointer":"default"}}
                      onClick={() => d.dispo && setShowLivraisonForm(true)}
                    >{d.dispo?"📦 Demander livraison":"⏳ Voir plus tard"}</button>
                  </div>
                ))}
              </div>
            </div>

            {/* ── REJOINDRE COMME LIVREUR ── */}
            <div style={{background:"linear-gradient(135deg,#1a3a24,#0d3320)",borderRadius:14,padding:24,marginTop:20,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16}}>
              <div>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.1rem",color:"#fff",marginBottom:5}}>🏍️ Devenez livreur Yorix</div>
                <div style={{color:"rgba(255,255,255,.6)",fontSize:".82rem",lineHeight:1.6,maxWidth:360}}>Gagnez 15 000 – 80 000 FCFA/mois selon votre activité. Horaires libres, votre propre véhicule, paiement quotidien.</div>
                <div style={{display:"flex",gap:10,marginTop:10,flexWrap:"wrap"}}>
                  {["✅ Paiement quotidien","🕐 Horaires libres","🏍️ Votre véhicule"].map(t=><span key={t} style={{background:"rgba(255,255,255,.1)",color:"rgba(255,255,255,.8)",padding:"3px 9px",borderRadius:50,fontSize:".67rem"}}>{t}</span>)}
                </div>
              </div>
              <button
                style={{background:"var(--yellow)",color:"#0d1f14",border:"none",padding:"12px 22px",borderRadius:10,fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".85rem",cursor:"pointer",whiteSpace:"nowrap"}}
                onClick={()=>{ setAuthTab("register"); setSelectedRole("delivery"); setAuthOpen(true); }}
              >🚀 S'inscrire comme livreur</button>
            </div>

          </section>
        </div>
      )}

      {/* ════════ PAGE : ESCROW ════════ */}
      {page==="escrow"&&(
        <section className="sec anim">
          <div style={{background:dark?"#152118":"#f0faf4",border:`1.5px solid ${dark?"#2a4030":"#c0ecd0"}`,borderRadius:14,padding:28,marginBottom:20}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"var(--green)",color:"#fff",padding:"4px 12px",borderRadius:50,fontSize:".7rem",fontWeight:700,marginBottom:12}}>🔐 Escrow Yorix</div>
            <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"1.4rem",fontWeight:800,color:"var(--ink)",marginBottom:10,letterSpacing:"-.5px"}}>Votre argent protégé jusqu'à la livraison</h2>
            <p style={{color:"var(--gray)",fontSize:".86rem",lineHeight:1.75,marginBottom:20}}>Votre argent reste bloqué chez Yorix jusqu'à ce que vous confirmiez la réception. En cas de litige, nous vous remboursons.</p>
            <div className="escrow-steps">
              {[{n:1,t:"Vous commandez",d:"Votre paiement est bloqué · statut : pending"},{n:2,t:"Vendeur expédie",d:"Les fonds passent au statut : sécurisé 🔐"},{n:3,t:"Vous confirmez",d:"Fonds libérés au vendeur · statut : libéré ✅"},{n:4,t:"Litige ? Yorix arbitre",d:"Remboursement sous 48h · statut : remboursé ↩️"}].map(s=>(
                <div key={s.n} className="estep"><div className="estep-num">{s.n}</div><div className="estep-text"><h4>{s.t}</h4><p>{s.d}</p></div></div>
              ))}
            </div>
          </div>
          <div className="sec-head"><h2 className="sec-title">Produits avec protection Escrow</h2></div>
          {produitsLoading?<div className="loading"><div className="spinner"/>Chargement...</div>
            :<ProdGrid prods={produits.filter(p=>p.escrow).slice(0,10)} user={user} userData={userData} onAddToCart={addToCart} onWish={toggleWish} wishlist={wishlist}/>}
        </section>
      )}

      {/* ════════ PAGE : PRESTATAIRES ════════ */}
      {page==="prestataires"&&(
        <section className="sec anim">
          <div className="sec-head"><h2 className="sec-title">👷 Prestataires Yorix vérifiés</h2><button className="btn-green" onClick={()=>goPage("inscription")}>+ Devenir prestataire</button></div>
          <div className="prest-grid">
            {PREST_DATA.map(p=>(
              <div key={p.name} className="prest-card">
                <div className="prest-top"><div className="prest-av">{p.emoji}</div><div><div className="prest-name">{p.name}</div><div className="prest-meta">{p.meta}</div></div></div>
                <div className="prest-tags">{p.tags.map(t=><span key={t} className="ptag">{t}</span>)}</div>
                <div className="prest-footer"><div><div className="prest-price">{p.prix}</div><div style={{fontSize:".69rem",color:"var(--gray)"}}>⭐ {p.note} · {p.avis} avis</div></div><button className="btn-hire" onClick={()=>window.open(`https://wa.me/${YORIX_WA_NUMBER}?text=${encodeURIComponent(`Bonjour, je souhaite contacter ${p.name} pour ${p.tags[0]}`)}`,'_blank')}>WhatsApp</button></div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ════════ PAGE : INSCRIPTION PRESTATAIRE ════════ */}
      {page==="inscription"&&(
        <section className="sec anim">
          <div style={{maxWidth:600,margin:"0 auto"}}>
            <div style={{textAlign:"center",marginBottom:24}}>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"1.6rem",fontWeight:800,color:"var(--ink)",marginBottom:7,letterSpacing:"-.5px"}}>👷 Devenir prestataire Yorix</h2>
              <p style={{color:"var(--gray)",fontSize:".86rem",lineHeight:1.7}}>Développez votre activité et accédez à des milliers de clients au Cameroun.</p>
            </div>
            {inscriptionSent?<div className="success-msg">🎉 Candidature envoyée ! L'équipe Yorix vous contacte sous 24h.</div>:(
              <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,padding:24}}>
                <div className="form-row">
                  <div className="form-group"><label className="form-label">Nom <span>*</span></label><input className="form-input" value={inscriptionForm.nom} onChange={e=>setInscriptionForm(f=>({...f,nom:e.target.value}))} placeholder="Votre nom"/></div>
                  <div className="form-group"><label className="form-label">Prénom</label><input className="form-input" value={inscriptionForm.prenom} onChange={e=>setInscriptionForm(f=>({...f,prenom:e.target.value}))} placeholder="Votre prénom"/></div>
                  <div className="form-group"><label className="form-label">Téléphone <span>*</span></label><input className="form-input" value={inscriptionForm.tel} onChange={e=>setInscriptionForm(f=>({...f,tel:e.target.value}))} placeholder="+237 696 56 56 54"/></div>
                  <div className="form-group"><label className="form-label">Email</label><input className="form-input" value={inscriptionForm.email} onChange={e=>setInscriptionForm(f=>({...f,email:e.target.value}))} placeholder="email@mail.com"/></div>
                  <div className="form-group"><label className="form-label">Métier <span>*</span></label><select className="form-select" value={inscriptionForm.metier} onChange={e=>setInscriptionForm(f=>({...f,metier:e.target.value}))}><option value="">Choisir...</option>{["Plomberie","Électricité","Maçonnerie","Peinture","Menuiserie","Informatique","Graphisme","Photographie","Nettoyage","Transport","Cuisine","Autre"].map(m=><option key={m}>{m}</option>)}</select></div>
                  <div className="form-group"><label className="form-label">Ville</label><select className="form-select" value={inscriptionForm.ville} onChange={e=>setInscriptionForm(f=>({...f,ville:e.target.value}))}><option value="">Choisir...</option>{CITIES.filter(c=>c!=="Toutes les villes").map(c=><option key={c}>{c}</option>)}</select></div>
                  <div className="form-group"><label className="form-label">Expérience</label><input className="form-input" value={inscriptionForm.experience} onChange={e=>setInscriptionForm(f=>({...f,experience:e.target.value}))} placeholder="Ex: 5 ans"/></div>
                  <div className="form-group"><label className="form-label">Tarif (FCFA)</label><input className="form-input" value={inscriptionForm.tarif} onChange={e=>setInscriptionForm(f=>({...f,tarif:e.target.value}))} placeholder="Ex: 15 000/h"/></div>
                  <div className="form-group full"><label className="form-label">Présentation</label><textarea className="form-textarea" value={inscriptionForm.bio} onChange={e=>setInscriptionForm(f=>({...f,bio:e.target.value}))} placeholder="Décrivez vos compétences..."/></div>
                </div>
                <button className="form-submit" onClick={async()=>{if(!inscriptionForm.nom||!inscriptionForm.tel||!inscriptionForm.metier){alert("Nom, téléphone et métier obligatoires !");return;}await supabase.from("prestataires").insert(inscriptionForm).catch(e => console.warn("Supabase error:", e?.message));setInscriptionSent(true);}}>🚀 Soumettre ma candidature</button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ════════ PAGE : BUSINESS ════════ */}
      {page==="business"&&(
        <section className="sec anim">
          <div className="biz-hero">
            <div style={{display:"inline-flex",alignItems:"center",gap:5,background:"rgba(252,209,22,.14)",color:"var(--yellow)",border:"1px solid rgba(252,209,22,.24)",padding:"4px 11px",borderRadius:50,fontSize:".7rem",fontWeight:700,marginBottom:12}}>💼 Yorix Business</div>
            <div className="biz-title">La solution B2B pour les entreprises camerounaises</div>
            <p className="biz-sub">Achetez en gros, gérez vos fournisseurs et accédez à des tarifs professionnels exclusifs.</p>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}><button className="cta-y">Démarrer gratuitement</button><button className="cta-w">Voir une démo</button></div>
            <div className="biz-feats">{[{icon:"📦",t:"Achats en gros",p:"Tarifs dégressifs dès 10 unités"},{icon:"🤝",t:"Fournisseurs vérifiés",p:"500+ fournisseurs certifiés"},{icon:"📊",t:"Tableaux de bord",p:"Suivi en temps réel"},{icon:"🔐",t:"Facturation pro",p:"Factures automatiques"}].map(f=><div key={f.t} className="biz-feat"><div style={{fontSize:"1.25rem",marginBottom:4}}>{f.icon}</div><h4>{f.t}</h4><p>{f.p}</p></div>)}</div>
          </div>
          <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:12,padding:22}}>
            <h3 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1rem",color:"var(--ink)",marginBottom:4}}>📋 Demande d'accès Business</h3>
            <p style={{fontSize:".78rem",color:"var(--gray)",marginBottom:16}}>Notre équipe B2B vous contacte sous 24h.</p>
            <div className="form-row">
              <div className="form-group"><label className="form-label">Entreprise *</label><input className="form-input" placeholder="Nom de l'entreprise"/></div>
              <div className="form-group"><label className="form-label">Contact</label><input className="form-input" placeholder="Votre nom"/></div>
              <div className="form-group"><label className="form-label">Email pro</label><input className="form-input" placeholder="contact@entreprise.cm"/></div>
              <div className="form-group"><label className="form-label">Téléphone</label><input className="form-input" placeholder="+237 ..."/></div>
              <div className="form-group full"><label className="form-label">Besoins principaux</label><textarea className="form-textarea" style={{minHeight:65}} placeholder="Décrivez vos besoins..."/></div>
            </div>
            <button className="form-submit">💼 Soumettre ma demande</button>
          </div>
        </section>
      )}

      {/* ════════ PAGE : ACADEMY ════════ */}
      {page==="academy"&&(
        <section className="sec anim">
          <div style={{background:"linear-gradient(135deg,#1a3a24,#0a1410)",borderRadius:14,padding:28,marginBottom:20,textAlign:"center"}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:5,background:"rgba(252,209,22,.14)",color:"var(--yellow)",border:"1px solid rgba(252,209,22,.24)",padding:"4px 11px",borderRadius:50,fontSize:".7rem",fontWeight:700,marginBottom:12}}>🎓 Yorix Academy</div>
            <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"1.45rem",fontWeight:800,color:"#fff",marginBottom:6,letterSpacing:"-.5px"}}>Formez-vous pour vendre mieux</h2>
            <p style={{color:"rgba(255,255,255,.5)",fontSize:".85rem",marginBottom:18}}>Des cours créés par des experts camerounais.</p>
            <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}><button className="cta-y">Commencer gratuitement</button><button className="cta-w">Voir le catalogue</button></div>
          </div>
          <div className="courses-grid">
            {COURSES_DATA.map(c=>(
              <div key={c.title} className="course-card" style={{cursor:"pointer"}} onClick={()=>window.open(c.url,"_blank")}>
                <div className="course-img" style={{background:c.bg}}>{c.emoji}</div>
                <div className="course-body">
                  <div className={`course-level ${c.lc}`}>{c.level}</div>
                  <div className="course-title">{c.title}</div>
                  <div style={{fontSize:".71rem",color:"var(--gray)",lineHeight:1.5,margin:"4px 0 6px"}}>{c.desc}</div>
                  <div className="course-meta">⏱ {c.duree} · 👥 {c.apprenants} apprenants</div>
                  <div className="course-footer">
                    <div className="course-price" style={{color:"var(--green)",fontWeight:700}}>{c.prix}</div>
                    <button className="course-btn" onClick={e=>{e.stopPropagation();window.open(c.url,"_blank");}}>Démarrer →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ════════ PAGE : BLOG ════════ */}
      {page==="blog"&&(
        <section className="sec anim">
          <div className="sec-head">
            <h2 className="sec-title">📰 Blog Yorix</h2>
            <span style={{fontSize:".78rem",color:"var(--gray)"}}>Cliquez sur un article pour le lire</span>
          </div>
          <div className="blog-grid">
            {BLOG_DATA.map(p=>(
              <div
                key={p.title}
                className="blog-card"
                style={{cursor:"pointer",transition:"transform .2s,box-shadow .2s"}}
                onClick={()=>window.open(p.url,"_blank")}
                onMouseOver={e=>e.currentTarget.style.transform="translateY(-4px)"}
                onMouseOut={e=>e.currentTarget.style.transform="none"}
              >
                <div className="blog-img" style={{
                  height:130,
                  background:p.image ? `url(${p.image}) center/cover` : "var(--surface2)",
                  position:"relative",overflow:"hidden",
                }}>
                  {!p.image && <span style={{fontSize:"2.5rem"}}>{p.emoji}</span>}
                  <div style={{position:"absolute",top:8,left:8,background:"var(--green)",color:"#fff",fontSize:".62rem",fontWeight:700,padding:"2px 8px",borderRadius:50}}>{p.cat}</div>
                  <div style={{position:"absolute",bottom:0,left:0,right:0,height:40,background:"linear-gradient(transparent,rgba(0,0,0,.4))"}}/>
                </div>
                <div className="blog-body">
                  <div className="blog-title">{p.title}</div>
                  <div className="blog-excerpt">{p.excerpt}</div>
                </div>
                <div className="blog-footer">
                  <span>{p.date}</span>
                  <span style={{display:"flex",alignItems:"center",gap:4}}>⏱ {p.read} <span style={{background:"var(--green)",color:"#fff",fontSize:".6rem",padding:"1px 6px",borderRadius:50}}>Lire →</span></span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ════════ PAGE : FIDÉLITÉ ════════ */}
      {page==="loyalty"&&(
        <section className="sec anim">

          {/* ── CARTE POINTS ── */}
          <div style={{background:"linear-gradient(135deg,#0a1410,#1a3a24,var(--green))",borderRadius:16,padding:24,color:"#fff",marginBottom:20,position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:-20,right:-20,width:140,height:140,background:"rgba(252,209,22,.06)",borderRadius:"50%"}}/>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12}}>
              <div>
                <div style={{fontSize:".72rem",color:"rgba(255,255,255,.5)",marginBottom:4,fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>Mes points Yorix</div>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:"2.4rem",fontWeight:800,color:"var(--yellow)",lineHeight:1}}>{loyaltyPts.toLocaleString()} pts</div>
                <div style={{fontSize:".72rem",color:"rgba(255,255,255,.5)",marginTop:4}}>= {loyaltyPts.toLocaleString()} FCFA · 1 pt = 1 FCFA</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:".72rem",color:"rgba(255,255,255,.5)",marginBottom:4}}>Niveau</div>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1rem",color:loyaltyPts>=3000?"#ffd700":loyaltyPts>=1000?"#c0c0c0":"#cd7f32"}}>
                  {loyaltyPts>=3000?"👑 Platine":loyaltyPts>=1000?"🥈 Or":loyaltyPts>=500?"🥉 Argent":"🌱 Bronze"}
                </div>
                <div style={{fontSize:".67rem",color:"rgba(255,255,255,.35)",marginTop:2}}>
                  {loyaltyPts>=3000?"Niveau maximum !":`${(loyaltyPts>=1000?3000:loyaltyPts>=500?1000:500)-loyaltyPts} pts pour le niveau suivant`}
                </div>
              </div>
            </div>
            {/* Barre de progression */}
            <div style={{background:"rgba(255,255,255,.15)",borderRadius:50,height:8,marginTop:16}}>
              <div style={{background:"var(--yellow)",borderRadius:50,height:8,width:`${Math.min(loyaltyPts/30,100)}%`,transition:"width .8s"}}/>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:".62rem",color:"rgba(255,255,255,.3)",marginTop:4}}>
              <span>0</span><span>500</span><span>1000</span><span>3000</span>
            </div>
          </div>

          {/* ── COMMENT GAGNER DES POINTS ── */}
          <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,padding:18,marginBottom:20}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".9rem",color:"var(--ink)",marginBottom:12}}>💡 Comment gagner des points ?</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
              {Object.entries(POINTS_REGLES).map(([k,v])=>(
                <div key={k} style={{textAlign:"center",background:"var(--surface2)",borderRadius:9,padding:"12px 8px"}}>
                  <div style={{fontSize:"1.4rem",marginBottom:5}}>{v.icon}</div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".85rem",color:"var(--green)"}}>+{v.pts} pts</div>
                  <div style={{fontSize:".63rem",color:"var(--gray)",marginTop:2,lineHeight:1.4}}>{v.label}</div>
                </div>
              ))}
            </div>
            <div style={{background:"var(--green-pale)",borderRadius:8,padding:"8px 12px",marginTop:12,fontSize:".75rem",color:"var(--green)",fontWeight:600}}>
              🔓 Échange possible dès {POINTS_MIN_ECHANGE.toLocaleString()} points · Échange minimum = {POINTS_MIN_ECHANGE.toLocaleString()} FCFA
            </div>
          </div>

          {/* ── RÉCOMPENSES ── */}
          <div className="sec-head"><h2 className="sec-title">🎁 Récompenses disponibles</h2></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:20}}>
            {REWARDS_DATA.map(r=>(
              <div key={r.name} className="reward-card" style={{position:"relative"}}>
                {r.type==="auto" && (
                  <div style={{position:"absolute",top:6,right:6,background:"var(--yellow)",color:"#0d1f14",fontSize:".55rem",fontWeight:800,padding:"1px 5px",borderRadius:50}}>AUTO</div>
                )}
                <div className="reward-icon">{r.icon}</div>
                <div className="reward-name">{r.name}</div>
                <div style={{fontSize:".67rem",color:"var(--gray)",marginBottom:5,lineHeight:1.4}}>{r.desc}</div>
                <div className="reward-pts">
                  {r.pts > 0 ? `${r.pts.toLocaleString()} pts` : "Automatique"}
                </div>
                {r.pts > 0 && r.type !== "auto" && (
                  <button
                    className="reward-btn"
                    disabled={loyaltyPts < r.pts}
                    style={{opacity: loyaltyPts >= r.pts ? 1 : 0.45, cursor: loyaltyPts >= r.pts ? "pointer" : "not-allowed"}}
                    onClick={() => {
                      if (loyaltyPts >= r.pts) {
                        setLoyaltyPts(p => p - r.pts);
                        alert(`✅ ${r.name} activé ! Votre solde : ${loyaltyPts - r.pts} pts`);
                      }
                    }}
                  >
                    {loyaltyPts >= r.pts ? "Échanger" : `Il manque ${r.pts - loyaltyPts} pts`}
                  </button>
                )}
                {r.type === "auto" && (
                  <div style={{fontSize:".67rem",color:"var(--green)",fontWeight:600,marginTop:6}}>Attribution automatique</div>
                )}
              </div>
            ))}
          </div>

          {/* ── ACHETER VIP / TOP VENDEUR ── */}
          <div style={{background:"linear-gradient(135deg,#0a1410,#1a3a24)",borderRadius:14,padding:20,marginBottom:20}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1rem",color:"#fff",marginBottom:4}}>👑 Statuts Premium</div>
            <p style={{color:"rgba(255,255,255,.55)",fontSize:".8rem",marginBottom:16}}>Boostez votre visibilité et gagnez la confiance des acheteurs</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              {[
                {icon:"👑",label:"Statut VIP",price:"15 000 FCFA/mois",pts:"ou 3 000 pts",avantages:["Badge VIP visible","Support prioritaire","Accès aux stats avancées","Mise en avant dans les résultats"]},
                {icon:"⭐",label:"Top Vendeur",price:"15 000 FCFA/mois",pts:"ou 3 000 pts",avantages:["Badge Top Vendeur","Produits en tête de liste","Certificat Yorix","Accès aux offres B2B"]},
              ].map(s=>(
                <div key={s.label} style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.12)",borderRadius:11,padding:16}}>
                  <div style={{fontSize:"1.8rem",marginBottom:6}}>{s.icon}</div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".88rem",color:"#fff",marginBottom:4}}>{s.label}</div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1rem",color:"var(--yellow)",marginBottom:2}}>{s.price}</div>
                  <div style={{fontSize:".68rem",color:"rgba(255,255,255,.4)",marginBottom:10}}>{s.pts}</div>
                  {s.avantages.map(a=><div key={a} style={{fontSize:".7rem",color:"rgba(255,255,255,.7)",marginBottom:3}}>✅ {a}</div>)}
                  <button
                    style={{width:"100%",background:"var(--yellow)",color:"#0d1f14",border:"none",padding:"9px",borderRadius:8,fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".78rem",cursor:"pointer",marginTop:12}}
                    onClick={()=>window.open(`https://wa.me/237696565654?text=${encodeURIComponent(`Bonjour Yorix ! Je veux acheter le statut ${s.label} à ${s.price}. Mon compte : ${user?.email||""}`)}`,"_blank")}
                  >
                    Obtenir {s.label}
                  </button>
                </div>
              ))}
            </div>
          </div>

        </section>
      )}

      {/* ════════ PAGE : DASHBOARD ════════ */}
      {page==="dashboard"&&(
        user?(
          <div className="dash-layout anim">
            <div className="dash-sidebar">
              <div className="dash-avatar">{userData?.nom?.[0]||"U"}</div>
              <div className="dash-name" title={userData?.nom||user.email}>{userData?.nom || (user.email ? user.email.split("@")[0] : "Utilisateur")}</div>
              <div className="dash-role-badge"><span className={`role-chip ${roleChipClass()}`}>{ROLE_LABELS[userRole||"buyer"]}</span></div>
              <div className="dash-nav">
                {getDashNav().map(item=>(
                  <div key={item.id} className={`dash-nav-item${dashTab===item.id?" active":""}`} onClick={()=>setDashTab(item.id)}>{item.icon} {item.label}</div>
                ))}
                <div className="dash-nav-divider"/>
                <div className={`dash-nav-item${dashTab==="messages"?" active":""}`} onClick={()=>setDashTab("messages")}>💬 Messages</div>
                <div className="dash-nav-item" onClick={doLogout} style={{color:"var(--red)"}}>🚪 Déconnexion</div>
              </div>
            </div>

            <div className="dash-content">
              {/* Messages commun à tous */}
              {dashTab==="messages"&&(
                <>
                  <div className="dash-page-title">💬 Messagerie sécurisée</div>
                  <div className="info-msg">🔐 La messagerie Yorix est sécurisée. Tout partage de contact externe est automatiquement bloqué et enregistré.</div>
                  <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:13,overflow:"hidden",height:420,display:"flex",flexDirection:"column"}}>
                    <div style={{background:"var(--green)",padding:"12px 16px"}}>
                      <div style={{fontSize:".85rem",fontWeight:600,color:"#fff"}}>Support Yorix</div>
                      <div style={{fontSize:".68rem",color:"rgba(255,255,255,.6)"}}><span style={{width:6,height:6,background:"#4fd17d",borderRadius:"50%",display:"inline-block",marginRight:4}}/>En ligne</div>
                    </div>
                    <div style={{flex:1,overflowY:"auto",padding:14}}>
                      {chatMessages.map((m,i)=><div key={i} style={{marginBottom:10,display:"flex",flexDirection:"column",alignItems:m.me?"flex-end":"flex-start"}}><div style={{background:m.me?"var(--green)":"var(--surface2)",color:m.me?"#fff":"var(--ink)",padding:"8px 11px",borderRadius:m.me?"11px 11px 3px 11px":"11px 11px 11px 3px",fontSize:".79rem",maxWidth:"75%",lineHeight:1.45}}>{m.text}</div><div style={{fontSize:".6rem",color:"var(--gray)",marginTop:2}}>{m.time}</div></div>)}
                      {chatBlocked&&<div style={{background:"#f8d7da",border:"1px solid #f5c6cb",borderRadius:8,padding:"8px 12px",fontSize:".75rem",color:"#721c24",margin:"6px 0",textAlign:"center"}}>⚠️ Message bloqué : partage de contact externe interdit sur Yorix.</div>}
                      <div ref={chatEndRef}/>
                    </div>
                    <div style={{padding:10,borderTop:"1px solid var(--border)",display:"flex",gap:7}}><input style={{flex:1,border:"1.5px solid var(--border)",borderRadius:8,padding:"8px 11px",fontFamily:"'DM Sans',sans-serif",fontSize:".81rem",outline:"none",background:"var(--surface)",color:"var(--ink)"}} placeholder="Écrire un message..." value={chatMsg} onChange={e=>setChatMsg(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendChat()}/><button style={{background:"var(--green)",color:"#fff",border:"none",width:34,height:34,borderRadius:8,cursor:"pointer",fontSize:".95rem"}} onClick={sendChat}>➤</button></div>
                  </div>
                </>
              )}

              {/* Dashboards par rôle */}
              {dashTab!=="messages"&&userRole==="seller"&&<SellerDashboard user={user} userData={userData} dashTab={dashTab} setDashTab={setDashTab}/>}
              {dashTab!=="messages"&&userRole==="delivery"&&<DeliveryDashboard user={user} userData={userData} dashTab={dashTab} setDashTab={setDashTab}/>}
              {dashTab!=="messages"&&userRole==="provider"&&<ProviderDashboard user={user} userData={userData} dashTab={dashTab} setDashTab={setDashTab}/>}
              {dashTab!=="messages"&&(userRole==="buyer"||!userRole)&&<BuyerDashboard user={user} userData={userData} wishlist={wishlist} totalQty={totalQty} loyaltyPts={loyaltyPts} setLoyaltyPts={setLoyaltyPts} dashTab={dashTab} goPage={goPage}/>}
            </div>
          </div>
        ):(
          <div className="empty-state anim" style={{padding:"60px 0"}}>
            <div className="empty-icon">🔐</div>
            <p>Connectez-vous pour accéder à votre espace</p>
            <button className="form-submit" style={{width:"auto",padding:"11px 28px",marginTop:16}} onClick={()=>setAuthOpen(true)}>Se connecter</button>
          </div>
        )
      )}

      {/* Newsletter hors home */}
      {page!=="home"&&(
        <div className="newsletter">
          <div className="nl-title">📬 Restez informé(e)</div>
          <p className="nl-sub">Les meilleures offres Yorix dans votre boîte mail.</p>
          {nlSent?<div style={{background:"rgba(255,255,255,.2)",borderRadius:8,padding:"9px 18px",color:"#fff",fontWeight:600}}>✅ Abonné(e) !</div>
            :<div className="nl-form"><input className="nl-input" placeholder="Votre email..." value={nlEmail} onChange={e=>setNlEmail(e.target.value)}/><button className="nl-btn" onClick={async()=>{if(nlEmail){await supabase.from("newsletter").insert({email:nlEmail}).catch(e => console.warn("Supabase error:", e?.message));setNlSent(true);}}}>S'abonner 🚀</button></div>}
        </div>
      )}


      {/* ════════ PAGE : CGV ════════ */}
      {page==="cgv"&&(
        <section className="sec anim">
          <div style={{maxWidth:800,margin:"0 auto"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:24}}>
              <button className="btn-ghost" style={{padding:"6px 12px",fontSize:".78rem"}} onClick={()=>goPage("home")}>← Retour</button>
              <h1 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.4rem",color:"var(--ink)",letterSpacing:"-.5px"}}>📜 Conditions Générales de Vente</h1>
            </div>
            <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,padding:28,lineHeight:1.9,fontSize:".84rem",color:"var(--ink)"}}>
              <p style={{color:"var(--gray)",marginBottom:20}}>Dernière mise à jour : 31 mars 2026 · Yorix CM — DOUALA/2026/B237</p>

              {[
                {title:"1. Objet et champ d'application",body:`Les présentes Conditions Générales de Vente (CGV) régissent les transactions réalisées sur la plateforme Yorix CM (yorix.cm), marketplace en ligne au Cameroun. En passant une commande, vous acceptez sans réserve les présentes CGV.`},
                {title:"2. Identification du vendeur de la plateforme",body:`Yorix CM est exploité par Yorix Cameroun SARL, société immatriculée à Douala (RC : DOUALA/2026/B237). Siège social : Douala, Cameroun. Email : support@yorix.cm — Tél : +237 696 56 56 54`},
                {title:"3. Produits et services",body:`Yorix CM est une marketplace qui met en relation des vendeurs indépendants et des acheteurs. Chaque vendeur est seul responsable de la conformité, de la qualité et de la légalité des produits qu'il publie. Yorix CM vérifie les vendeurs mais ne garantit pas chaque produit individuellement.`},
                {title:"4. Prix et paiement",body:`Tous les prix sont exprimés en Francs CFA (FCFA) toutes taxes comprises. Les paiements sont acceptés via MTN Mobile Money, Orange Money, et virement bancaire. La commission Yorix est prélevée automatiquement sur chaque transaction et n'est pas remboursable.`},
                {title:"5. Système Escrow Yorix",body:`Le système Escrow Yorix bloque les fonds de l'acheteur jusqu'à confirmation de réception. En cas de litige, Yorix CM arbitre dans un délai de 48h ouvrables. Les décisions d'arbitrage sont définitives. Le remboursement s'effectue via le même mode de paiement initial.`},
                {title:"6. Livraison",body:`Les délais de livraison sont indicatifs. Yorix CM ne peut être tenu responsable des retards liés aux livreurs indépendants, aux conditions météorologiques ou à des événements de force majeure. En cas de colis perdu, une enquête est ouverte sous 24h.`},
                {title:"7. Droit de rétractation",body:`Conformément à la réglementation camerounaise, tout acheteur dispose d'un délai de 48 heures après réception pour signaler un problème (produit non conforme, endommagé, ou non reçu). Au-delà de ce délai, la transaction est considérée comme validée.`},
                {title:"8. Responsabilités",body:`Yorix CM ne peut être tenu responsable des dommages indirects liés à l'utilisation de la plateforme. Yorix CM se réserve le droit de suspendre tout compte en cas de comportement frauduleux ou de violation des présentes CGV.`},
                {title:"9. Litiges",body:`Tout litige relatif à l'interprétation ou à l'exécution des présentes CGV sera soumis à la compétence exclusive des tribunaux de Douala, Cameroun.`},
              ].map(s=>(
                <div key={s.title} style={{marginBottom:20}}>
                  <h3 style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".92rem",color:"var(--ink)",marginBottom:7}}>{s.title}</h3>
                  <p style={{color:"var(--gray)",lineHeight:1.8}}>{s.body}</p>
                </div>
              ))}

              <div style={{background:"var(--green-pale)",border:"1px solid var(--green-light)",borderRadius:9,padding:"12px 16px",marginTop:16}}>
                <p style={{color:"var(--green)",fontWeight:600,fontSize:".82rem"}}>📞 Questions ? Contactez-nous : support@yorix.cm ou WhatsApp +237 696 56 56 54</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ════════ PAGE : MENTIONS LÉGALES ════════ */}
      {page==="mentions"&&(
        <section className="sec anim">
          <div style={{maxWidth:800,margin:"0 auto"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:24}}>
              <button className="btn-ghost" style={{padding:"6px 12px",fontSize:".78rem"}} onClick={()=>goPage("home")}>← Retour</button>
              <h1 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.4rem",color:"var(--ink)",letterSpacing:"-.5px"}}>⚖️ Mentions Légales</h1>
            </div>
            <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,padding:28,lineHeight:1.9,fontSize:".84rem",color:"var(--ink)"}}>
              <p style={{color:"var(--gray)",marginBottom:20}}>Conformément aux lois camerounaises en vigueur et à la réglementation de l'ANTIC.</p>

              {[
                {title:"Éditeur du site",items:[
                  "Nom de la société : Yorix Cameroun SARL",
                  "Numéro RC : DOUALA/2026/B237",
                  "Siège social : Douala, Cameroun",
                  "Email : support@yorix.cm",
                  "Téléphone : +237 696 56 56 54",
                  "WhatsApp : +237 696 56 56 54",
                ]},
                {title:"Hébergement",items:[
                  "Hébergeur : Vercel Inc.",
                  "Adresse : 340 S Lemon Ave #4133, Walnut, CA 91789, USA",
                  "Site : https://vercel.com",
                  "Base de données : Supabase Inc.",
                  "Images : Cloudinary Inc.",
                ]},
                {title:"Propriété intellectuelle",items:[
                  "Le nom Yorix CM, le logo et l'ensemble des éléments constituant la plateforme sont la propriété exclusive de Yorix Cameroun SARL.",
                  "Toute reproduction, représentation ou diffusion non autorisée est strictement interdite.",
                  "Les contenus publiés par les vendeurs restent leur propriété — Yorix CM dispose d'une licence d'utilisation pour les afficher.",
                ]},
                {title:"Données personnelles (RGPD/ANTIC)",items:[
                  "Responsable du traitement : Yorix Cameroun SARL",
                  "Les données collectées (nom, email, téléphone) sont utilisées uniquement pour la gestion des commandes et la relation client.",
                  "Aucune donnée n'est vendue à des tiers.",
                  "Droit d'accès, rectification et suppression : support@yorix.cm",
                  "Conservation des données : 3 ans après la dernière transaction.",
                ]},
                {title:"Cookies",items:[
                  "Yorix CM utilise des cookies techniques essentiels au fonctionnement du site (authentification, préférences).",
                  "Aucun cookie publicitaire n'est utilisé.",
                  "En continuant à naviguer, vous acceptez l'utilisation de ces cookies techniques.",
                ]},
              ].map(s=>(
                <div key={s.title} style={{marginBottom:20}}>
                  <h3 style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".92rem",color:"var(--ink)",marginBottom:10}}>{s.title}</h3>
                  <ul style={{paddingLeft:16,listStyle:"disc",color:"var(--gray)",lineHeight:1.9}}>
                    {s.items.map(item=><li key={item}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════ PAGE : POLITIQUE DE CONFIDENTIALITÉ ════════ */}
      {page==="privacy"&&(
        <section className="sec anim">
          <div style={{maxWidth:800,margin:"0 auto"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:24}}>
              <button className="btn-ghost" style={{padding:"6px 12px",fontSize:".78rem"}} onClick={()=>goPage("home")}>← Retour</button>
              <h1 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.4rem",color:"var(--ink)",letterSpacing:"-.5px"}}>🔐 Politique de Confidentialité</h1>
            </div>
            <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,padding:28,lineHeight:1.9,fontSize:".84rem",color:"var(--ink)"}}>
              <p style={{color:"var(--gray)",marginBottom:20}}>Dernière mise à jour : 31 mars 2026. Yorix CM s'engage à protéger vos données personnelles.</p>

              {[
                {title:"1. Données collectées",body:"Lors de votre inscription : nom complet, adresse email, numéro de téléphone, rôle choisi (acheteur/vendeur/livreur/prestataire). Lors d'une commande : adresse de livraison, historique des achats. Automatiquement : adresse IP, type d'appareil, pages visitées."},
                {title:"2. Utilisation des données",body:"Vos données sont utilisées pour : (1) Gérer votre compte et vos commandes, (2) Vous envoyer des confirmations et notifications, (3) Améliorer la plateforme, (4) Prévenir la fraude et respecter nos obligations légales. Nous ne vendons jamais vos données à des tiers."},
                {title:"3. Partage des données",body:"Vos données peuvent être partagées uniquement avec : (1) Les vendeurs impliqués dans votre commande (nom, téléphone uniquement), (2) Les livreurs assignés à votre livraison, (3) Nos prestataires techniques (Supabase, Cloudinary) soumis à des accords de confidentialité stricts."},
                {title:"4. Sécurité",body:"Vos données sont stockées de façon chiffrée sur des serveurs sécurisés (Supabase/PostgreSQL). Les mots de passe sont hashés et jamais stockés en clair. Les communications sont chiffrées via HTTPS/TLS."},
                {title:"5. Vos droits",body:"Conformément à la loi camerounaise sur la protection des données et au RGPD : droit d'accès, de rectification, de suppression, de portabilité. Pour exercer ces droits : support@yorix.cm. Réponse sous 30 jours."},
                {title:"6. Durée de conservation",body:"Données de compte : 3 ans après la dernière connexion. Historique des commandes : 5 ans (obligations comptables). Logs de sécurité : 12 mois. Après expiration, les données sont supprimées ou anonymisées."},
              ].map(s=>(
                <div key={s.title} style={{marginBottom:20}}>
                  <h3 style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".92rem",color:"var(--ink)",marginBottom:7}}>{s.title}</h3>
                  <p style={{color:"var(--gray)",lineHeight:1.8}}>{s.body}</p>
                </div>
              ))}

              <div style={{background:"var(--green-pale)",border:"1px solid var(--green-light)",borderRadius:9,padding:"12px 16px",marginTop:16}}>
                <p style={{color:"var(--green)",fontWeight:600,fontSize:".82rem"}}>🔐 Questions sur vos données ? support@yorix.cm ou WhatsApp +237 696 56 56 54</p>
              </div>
            </div>
          </div>
        </section>
      )}


      {/* ════════ PAGE : NOUS CONTACTER ════════ */}
      {page==="contact"&&(
        <section className="sec anim">
          <div style={{maxWidth:700,margin:"0 auto"}}>
            <div style={{textAlign:"center",marginBottom:24}}>
              <h1 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.5rem",color:"var(--ink)",letterSpacing:"-.5px",marginBottom:8}}>📞 Nous contacter</h1>
              <p style={{color:"var(--gray)",fontSize:".86rem"}}>Notre équipe répond en moins de 2h · 7j/7</p>
            </div>

            {/* Cartes de contact */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:24}}>
              {[
                {icon:"📱",label:"WhatsApp",val:"+237 696 56 56 54",action:()=>window.open(`https://wa.me/237696565654?text=${encodeURIComponent("Bonjour Yorix !")}`)},
                {icon:"📞",label:"Téléphone",val:"+237 696 56 56 54",action:()=>window.open("tel:+237696565654")},
                {icon:"✉️",label:"Email",val:"support@yorix.cm",action:()=>window.open("mailto:support@yorix.cm")},
              ].map(c=>(
                <div key={c.label} onClick={c.action} style={{background:"var(--surface)",border:"1.5px solid var(--border)",borderRadius:12,padding:18,textAlign:"center",cursor:"pointer",transition:"all .2s"}}
                  onMouseOver={e=>e.currentTarget.style.borderColor="var(--green)"}
                  onMouseOut={e=>e.currentTarget.style.borderColor="var(--border)"}
                >
                  <div style={{fontSize:"2rem",marginBottom:8}}>{c.icon}</div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".85rem",color:"var(--ink)",marginBottom:4}}>{c.label}</div>
                  <div style={{fontSize:".78rem",color:"var(--green)",fontWeight:600}}>{c.val}</div>
                </div>
              ))}
            </div>

            {/* Formulaire de contact */}
            <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,padding:24}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"1rem",color:"var(--ink)",marginBottom:16}}>💬 Envoyer un message</div>
              <ContactForm user={user} userData={userData}/>
            </div>

            {/* Horaires */}
            <div style={{background:"var(--green-pale)",border:"1px solid var(--green-light)",borderRadius:11,padding:16,marginTop:16,display:"flex",gap:14,flexWrap:"wrap"}}>
              <div style={{flex:1}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".82rem",color:"var(--green)",marginBottom:6}}>⏰ Horaires de support</div>
                {[["Lundi – Vendredi","8h – 20h"],["Samedi","9h – 18h"],["Dimanche","10h – 16h"]].map(([j,h])=>(
                  <div key={j} style={{display:"flex",justifyContent:"space-between",fontSize:".75rem",padding:"3px 0",borderBottom:"1px solid var(--border)"}}>
                    <span style={{color:"var(--gray)"}}>{j}</span><span style={{fontWeight:600,color:"var(--ink)"}}>{h}</span>
                  </div>
                ))}
              </div>
              <div style={{flex:1}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".82rem",color:"var(--green)",marginBottom:6}}>📍 Bureaux</div>
                <div style={{fontSize:".75rem",color:"var(--gray)",lineHeight:1.7}}>Douala — Akwa, face Hôtel Sawa<br/>Yaoundé — Bastos, rue des Ambassades<br/>📞 +237 696 56 56 54</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ════════ PAGE : CENTRE D'AIDE ════════ */}
      {page==="aide"&&(
        <section className="sec anim">
          <div style={{maxWidth:800,margin:"0 auto"}}>
            <div style={{textAlign:"center",marginBottom:24}}>
              <h1 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.5rem",color:"var(--ink)",letterSpacing:"-.5px",marginBottom:8}}>🆘 Centre d'aide Yorix</h1>
              <p style={{color:"var(--gray)",fontSize:".86rem"}}>Trouvez les réponses à vos questions</p>
            </div>

            {[
              {
                cat:"🛍️ Acheter sur Yorix",
                questions:[
                  {q:"Comment passer une commande ?",r:"Cliquez sur un produit → 'Commander via WhatsApp' ou '✅ Commander'. Remplissez votre nom et téléphone. Le vendeur vous contacte sous 1h."},
                  {q:"Quels modes de paiement sont acceptés ?",r:"MTN Mobile Money (+237 676 93 51 95), Orange Money (+237 696 56 56 54), et paiement en espèces à la livraison dans certaines villes."},
                  {q:"Comment fonctionne l'Escrow Yorix ?",r:"Votre paiement est sécurisé par Yorix jusqu'à réception du colis. Si le produit n'arrive pas ou n'est pas conforme, vous êtes remboursé sous 48h."},
                  {q:"Puis-je annuler une commande ?",r:"Oui, dans les 2 heures après la commande. Contactez le support sur WhatsApp : +237 696 56 56 54."},
                ]
              },
              {
                cat:"🏪 Vendre sur Yorix",
                questions:[
                  {q:"Comment créer ma boutique ?",r:"Inscrivez-vous en tant que Vendeur → Dashboard → 'Ajouter produit'. Ajoutez des photos, le prix, la ville. Votre produit est visible instantanément."},
                  {q:"Comment recevoir mes paiements ?",r:"Vos gains sont versés sur MTN MoMo ou Orange Money dans les 24h après confirmation de la livraison par l'acheteur."},
                  {q:"Quelle est la commission Yorix ?",r:"5% sur chaque vente. Exemple : produit vendu 10 000 FCFA → vous recevez 9 500 FCFA."},
                  {q:"Comment obtenir le badge Top Vendeur ?",r:"Automatiquement attribué au vendeur avec le plus de produits actifs. Ou achetez-le 15 000 FCFA/mois pour une visibilité accrue."},
                ]
              },
              {
                cat:"🚚 Livraison",
                questions:[
                  {q:"Quels sont les délais de livraison ?",r:"Intra-ville (Douala/Yaoundé) : 20–60 min. Inter-villes : 1–3 jours. Le livreur vous contacte à l'arrivée."},
                  {q:"Comment suivre ma livraison ?",r:"Votre livreur vous contacte directement par WhatsApp avec sa position. Suivi en temps réel dans votre dashboard."},
                  {q:"Que faire si mon colis n'arrive pas ?",r:"Contactez-nous immédiatement : WhatsApp +237 696 56 56 54 ou support@yorix.cm. Enquête ouverte sous 24h."},
                ]
              },
              {
                cat:"💰 Points & Fidélité",
                questions:[
                  {q:"Comment gagner des points ?",r:"5 points par achat, vente, livraison ou prestation. 10 points à l'inscription. 2 points par avis publié. 1 point = 1 FCFA."},
                  {q:"À partir de combien peut-on échanger ?",r:"Échange possible dès 500 points = 500 FCFA. Utilisables en bons d'achat, livraisons offertes, statuts VIP."},
                  {q:"Comment obtenir le statut VIP ?",r:"Achetez le statut VIP avec 3 000 points ou 15 000 FCFA/mois. Avantages : badge visible, priorité dans les résultats, support dédié."},
                ]
              },
            ].map(section=>(
              <div key={section.cat} style={{marginBottom:20}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".95rem",color:"var(--ink)",marginBottom:10,padding:"8px 0",borderBottom:"2px solid var(--green-light)"}}>{section.cat}</div>
                {section.questions.map(({q,r},i)=>(
                  <details key={i} style={{marginBottom:8,background:"var(--surface)",border:"1px solid var(--border)",borderRadius:9,overflow:"hidden"}}>
                    <summary style={{padding:"11px 14px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".83rem",color:"var(--ink)",userSelect:"none",listStyle:"none",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      {q}<span style={{color:"var(--green)",fontSize:"1rem"}}>▾</span>
                    </summary>
                    <div style={{padding:"10px 14px 14px",fontSize:".8rem",color:"var(--gray)",lineHeight:1.75,borderTop:"1px solid var(--border)"}}>{r}</div>
                  </details>
                ))}
              </div>
            ))}

            <div style={{textAlign:"center",marginTop:20}}>
              <p style={{fontSize:".82rem",color:"var(--gray)",marginBottom:12}}>Vous n'avez pas trouvé votre réponse ?</p>
              <button className="btn-wa" style={{display:"inline-flex",padding:"10px 20px"}} onClick={()=>goPage("contact")}>
                📞 Contacter le support
              </button>
            </div>
          </div>
        </section>
      )}

      {/* WA FLOAT */}
      <div className="wa-float">
        {waOpen&&<div className="wa-card">
          <div className="wa-card-title">💬 Contacter Yorix</div>
          <div className="wa-card-sub">Support 7j/7 · Réponse rapide</div>
          <a href={`https://wa.me/${YORIX_WA_NUMBER}?text=${encodeURIComponent("Bonjour Yorix ! J'ai besoin d'aide.")}`} target="_blank" rel="noreferrer" className="wa-link wa-link-green">📱 WhatsApp +237 696 56 56 54</a>
          <a href="tel:+237696565654" className="wa-link wa-link-ghost">📞 Appeler</a>
          <a href="mailto:support@yorix.cm" className="wa-link wa-link-ghost">✉️ support@yorix.cm</a>
        </div>}
        <div style={{position:"relative",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div className="wa-pulse"/>
          <button className="wa-btn" onClick={()=>setWaOpen(o=>!o)}>{waOpen?"✕":"💬"}</button>
        </div>
      </div>

      {/* MOBILE NAV */}
      <div className="mobile-nav">
        <div className="mn-inner">
          {[
            {icon:"🏠",label:"Accueil",p:"home"},
            {icon:"🛍️",label:"Produits",p:"produits"},
            {icon:"🚚",label:"Livraison",p:"livraison"},
            {icon:"📊",label:"Mon espace",p:"dashboard"},
            {icon:"💬",label:"WhatsApp",p:"wa"},
          ].map(item => (
            <div
              key={item.label}
              className={`mn-item${page===item.p?" active":""}`}
              onClick={() => {
                if (item.p === "wa") {
                  window.open(`https://wa.me/${YORIX_WA_NUMBER}?text=${encodeURIComponent("Bonjour Yorix ! J'ai besoin d'aide.")}`, "_blank");
                } else if (item.p === "dashboard" && !user) {
                  setAuthTab("register");
                  setAuthOpen(true);
                } else {
                  goPage(item.p);
                }
              }}
            >
              <div className="mn-icon">{item.icon}</div>
              <div className="mn-label">{item.label}</div>
              {item.p==="dashboard" && !user && (
                <div style={{position:"absolute",top:0,right:2,background:"var(--green)",color:"#fff",fontSize:".45rem",fontWeight:700,padding:"1px 3px",borderRadius:3}}>S'inscrire</div>
              )}
              {item.p==="dashboard" && unread>0 && user && <div className="mn-badge">{unread}</div>}
            </div>
          ))}
        </div>
        {/* Barre inscription rapide mobile si non connecté */}
        {!user && (
          <div style={{borderTop:"1px solid var(--border)",padding:"8px 16px",display:"flex",gap:8}}>
            <button
              onClick={() => { setAuthTab("login"); setAuthOpen(true); }}
              style={{flex:1,padding:"9px",borderRadius:8,border:"1.5px solid var(--border)",background:"var(--surface)",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".78rem",cursor:"pointer",color:"var(--ink)"}}
            >🔑 Connexion</button>
            <button
              onClick={() => { setAuthTab("register"); setSelectedRole("buyer"); setAuthOpen(true); }}
              style={{flex:2,padding:"9px",borderRadius:8,border:"none",background:"var(--green)",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".78rem",cursor:"pointer",color:"#fff"}}
            >🚀 S'inscrire gratuitement</button>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">Yo<span>rix</span> CM</div>
            <p className="footer-desc">La marketplace camerounaise complète — produits, prestataires, livraison, paiement MoMo sécurisé Escrow.</p>
            <div className="footer-contact"><span>📞 +237 696 56 56 54</span><span>✉️ support@yorix.cm</span><span>🇨🇲 Douala · Yaoundé · Bafoussam · et partout</span></div>
          </div>
          <div className="footer-col"><h4>Marketplace</h4><ul>{[{l:"Tous les produits",p:"produits"},{l:"Offres du jour",p:"produits"},{l:"Devenir vendeur",p:"inscription"}].map(i=><li key={i.l} onClick={()=>goPage(i.p)}>{i.l}</li>)}</ul></div>
          <div className="footer-col"><h4>Services</h4><ul>{[{l:"Escrow 🔐",p:"escrow"},{l:"Livraison 🚚",p:"livraison"},{l:"Prestataires 👷",p:"prestataires"},{l:"Business 💼",p:"business"},{l:"Academy 🎓",p:"academy"}].map(i=><li key={i.l} onClick={()=>goPage(i.p)}>{i.l}</li>)}</ul></div>
          <div className="footer-col"><h4>Aide</h4><ul>
            {[
              {l:"Centre d'aide",     p:"aide"},
              {l:"Payer avec MoMo",    p:null, url:"https://www.mtn.cm/momo/"},
              {l:"Suivi commande",     p:"dashboard"},
              {l:"Nous contacter",     p:"contact"},
            ].map(i=><li key={i.l} onClick={()=>{if(i.p)goPage(i.p);else if(i.url)window.open(i.url,"_blank");}} style={{cursor:"pointer"}}>{i.l}</li>)}
          </ul>
          <div style={{marginTop:10,display:"flex",flexDirection:"column",gap:4}}>
            <span onClick={()=>goPage("cgv")}      style={{fontSize:".69rem",cursor:"pointer",transition:"color .2s"}} onMouseOver={e=>e.target.style.color="#b7e4c7"} onMouseOut={e=>e.target.style.color=""}>📜 CGV</span>
            <span onClick={()=>goPage("mentions")} style={{fontSize:".69rem",cursor:"pointer",transition:"color .2s"}} onMouseOver={e=>e.target.style.color="#b7e4c7"} onMouseOut={e=>e.target.style.color=""}>⚖️ Mentions légales</span>
            <span onClick={()=>goPage("privacy")}  style={{fontSize:".69rem",cursor:"pointer",transition:"color .2s"}} onMouseOver={e=>e.target.style.color="#b7e4c7"} onMouseOut={e=>e.target.style.color=""}>🔐 Confidentialité</span>
          </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Yorix Cameroun — RC: DOUALA/2026/B237</span>
          <div className="fb-badges"><span className="fbb">📱 MTN MoMo</span><span className="fbb">🔶 Orange Money</span><span className="fbb">🔐 Escrow</span><span className="fbb">🇨🇲 Made in CM</span></div>
        </div>
      </footer>
    </>
  );
}
