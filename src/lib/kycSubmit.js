import { supabase } from "./supabase";

/** Rafraîchit la session Supabase avant un envoi long (uploads + upsert). */
export async function ensureFreshAuthSession() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error || !session?.access_token) {
    throw Object.assign(new Error("SESSION_EXPIRED"), { code: "SESSION_EXPIRED" });
  }
  const expiresMs = (session.expires_at ?? 0) * 1000;
  if (expiresMs && Date.now() > expiresMs - 90_000) {
    const { error: refreshErr } = await supabase.auth.refreshSession();
    if (refreshErr) {
      throw Object.assign(new Error("SESSION_EXPIRED"), { code: "SESSION_EXPIRED" });
    }
  }
}

const OPTIONAL_V2_COLUMNS = new Set([
  "seller_category",
  "business_country",
  "business_country_code",
  "business_country_other",
  "location_map_url",
  "extra_docs",
  "kyc_level",
  "submitted_at",
  "reviewer_note",
]);

function isMissingColumnError(err) {
  const msg = `${err?.message || ""} ${err?.details || ""} ${err?.hint || ""}`;
  return /column|schema cache|does not exist|PGRST204|Could not find/i.test(msg);
}

function stripOptionalColumns(payload) {
  const out = { ...payload };
  for (const key of OPTIONAL_V2_COLUMNS) delete out[key];
  return out;
}

/** Upsert KYC avec repli si colonnes v2 absentes côté serveur. */
export async function upsertSellerKyc(payload) {
  const attempt = async (body) => {
    const { data, error } = await supabase
      .from("seller_kyc")
      .upsert(body, { onConflict: "user_id" })
      .select()
      .maybeSingle();
    return { data, error };
  };

  let { data, error } = await attempt(payload);
  if (error && isMissingColumnError(error)) {
    ({ data, error } = await attempt(stripOptionalColumns(payload)));
  }
  if (error) throw error;

  if (data) return data;

  const { data: row, error: readErr } = await supabase
    .from("seller_kyc")
    .select("*")
    .eq("user_id", payload.user_id)
    .maybeSingle();
  if (readErr) throw readErr;
  if (row) return row;

  throw new Error("KYC_SAVE_EMPTY");
}

export function mergeExtraDocs(existing = [], additions = []) {
  const map = new Map();
  for (const doc of [...existing, ...additions]) {
    if (doc?.url) map.set(doc.url, doc);
  }
  return [...map.values()];
}

/** Messages utilisateur — ne pas masquer les erreurs serveur/session derrière « réseau ». */
export function formatKycError(err) {
  const msg = String(err?.message || err || "");
  const code = err?.code || err?.status;

  if (code === "SESSION_EXPIRED" || /jwt|session|expired|not authenticated|401|invalid claim/i.test(msg)) {
    return "Session expirée — reconnectez-vous puis renvoyez votre dossier";
  }
  if (/row-level security|42501|permission denied|policy/i.test(msg)) {
    return "Accès refusé — reconnectez-vous ou contactez le support Yorix";
  }
  if (/column|schema cache|does not exist|PGRST204|Could not find/i.test(msg)) {
    return "Mise à jour serveur en cours — réessayez dans quelques minutes ou contactez le support";
  }
  if (/timeout|timed out|aborted|deadline/i.test(msg)) {
    return "L'envoi du document a pris trop de temps — réessayez avec une photo plus légère";
  }
  if (/cloudinary|upload|fichier|file|échec de l'envoi/i.test(msg)) {
    return msg.includes("Échec") ? msg : `Échec envoi document : ${msg}`;
  }
  if (/failed to fetch|networkerror|load failed|fetch error/i.test(msg)) {
    return "Connexion interrompue avec le serveur — ce n'est pas forcément votre réseau. Réessayez ou reconnectez-vous.";
  }
  if (msg === "KYC_SAVE_EMPTY") {
    return "Enregistrement non confirmé — réessayez ou contactez le support";
  }
  return msg || "Erreur lors de l'envoi — réessayez";
}
