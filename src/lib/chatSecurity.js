/**
 * Sécurité messagerie Yorix — filtrage envoi + masquage affichage PII.
 */

const CONTACT_BLOCK_RULES = [
  {
    pattern: /(\+?237[\s.-]?[0-9]{8,9})/gi,
    raison: "Les numéros de téléphone ne peuvent pas être partagés dans la messagerie.",
  },
  {
    pattern: /(\+?[0-9]{1,3}[\s.-]?[0-9]{9,12})/g,
    raison: "Les numéros de téléphone ne peuvent pas être partagés dans la messagerie.",
  },
  {
    pattern: /(whatsapp|wa\.me|t\.me|telegram|signal|viber)/gi,
    raison: "Les liens vers des apps de contact externe sont interdits.",
  },
  {
    pattern: /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g,
    raison: "Les adresses e-mail ne peuvent pas être partagées dans la messagerie.",
  },
  {
    pattern: /(facebook\.com|instagram\.com|fb\.com|ig\.me)/gi,
    raison: "Les liens vers réseaux sociaux personnels sont interdits.",
  },
];

const PII_MASK_RULES = CONTACT_BLOCK_RULES.map((r) => r.pattern);

/**
 * @returns {{ bloque: boolean, raison?: string }}
 */
export function filtrerMsg(texte) {
  if (!texte || typeof texte !== "string") return { bloque: false };
  const t = texte.trim();
  if (!t) return { bloque: false };

  for (const rule of CONTACT_BLOCK_RULES) {
    rule.pattern.lastIndex = 0;
    if (rule.pattern.test(t)) {
      return { bloque: true, raison: rule.raison };
    }
  }
  return { bloque: false };
}

/**
 * Masque PII à l'affichage (utilisateurs non-admin).
 * @param {string} text
 * @param {{ reveal?: boolean }} opts
 */
export function maskPIIForDisplay(text, opts = {}) {
  if (!text || opts.reveal) return text || "";
  let out = String(text);
  for (const pattern of PII_MASK_RULES) {
    const re = new RegExp(pattern.source, pattern.flags);
    out = out.replace(re, "[coordonnée masquée]");
  }
  return out;
}

/** Libellé public sans email/téléphone brut */
export function publicDisplayName(profile, fallbackId = "") {
  if (!profile) {
    const short = fallbackId ? String(fallbackId).slice(0, 8) : "Membre";
    return `Membre Yorix · ${short}`;
  }
  const nom = (profile.nom || profile.display_name || "").trim();
  if (nom) return nom;
  return `Membre Yorix · ${String(profile.id || fallbackId).slice(0, 8)}`;
}

/** Fiche contact complète réservée admin */
export function adminContactLines(profile) {
  if (!profile) return [];
  const lines = [];
  if (profile.nom) lines.push({ k: "Nom", v: profile.nom });
  if (profile.email) lines.push({ k: "E-mail", v: profile.email });
  if (profile.telephone) lines.push({ k: "Téléphone", v: profile.telephone });
  if (profile.ville) lines.push({ k: "Ville", v: profile.ville });
  return lines;
}
