import { supabase } from "./supabase";
import { logKycError, logKycEvent } from "./kycSubmitLog";

/** Rafraîchit la session Supabase avant un envoi long (uploads + upsert). */
export async function ensureFreshAuthSession() {
  logKycEvent("session.check");
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error || !session?.access_token) {
    logKycError("session.missing", error || new Error("SESSION_EXPIRED"));
    throw Object.assign(new Error("SESSION_EXPIRED"), { code: "SESSION_EXPIRED" });
  }
  const expiresMs = (session.expires_at ?? 0) * 1000;
  if (expiresMs && Date.now() > expiresMs - 90_000) {
    logKycEvent("session.refresh", { expiresInSec: Math.round((expiresMs - Date.now()) / 1000) });
    const { error: refreshErr } = await supabase.auth.refreshSession();
    if (refreshErr) {
      logKycError("session.refresh_fail", refreshErr);
      throw Object.assign(new Error("SESSION_EXPIRED"), { code: "SESSION_EXPIRED" });
    }
    logKycEvent("session.refresh_ok");
  } else {
    logKycEvent("session.ok");
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
  logKycEvent("db.upsert_start", {
    user_id: payload.user_id,
    status: payload.status,
    seller_category: payload.seller_category,
    extraDocsCount: Array.isArray(payload.extra_docs) ? payload.extra_docs.length : 0,
  });

  const attempt = async (body, label) => {
    const { data, error } = await supabase
      .from("seller_kyc")
      .upsert(body, { onConflict: "user_id" })
      .select()
      .maybeSingle();
    if (error) {
      logKycError(`db.upsert_${label}_fail`, error, { user_id: payload.user_id });
    }
    return { data, error };
  };

  let { data, error } = await attempt(payload, "full");
  if (error && isMissingColumnError(error)) {
    logKycEvent("db.upsert_fallback", { fallback: "strip_v2_columns" }, "warn");
    ({ data, error } = await attempt(stripOptionalColumns(payload), "legacy"));
  }
  if (error) throw error;

  if (data) {
    logKycEvent("db.upsert_ok", { user_id: payload.user_id, status: data.status, id: data.id });
    return data;
  }

  logKycEvent("db.upsert_empty_select", { user_id: payload.user_id }, "warn");
  const { data: row, error: readErr } = await supabase
    .from("seller_kyc")
    .select("*")
    .eq("user_id", payload.user_id)
    .maybeSingle();
  if (readErr) {
    logKycError("db.read_after_upsert_fail", readErr, { user_id: payload.user_id });
    throw readErr;
  }
  if (row) {
    logKycEvent("db.read_after_upsert_ok", { user_id: payload.user_id, status: row.status });
    return row;
  }

  logKycError("db.save_empty", new Error("KYC_SAVE_EMPTY"), { user_id: payload.user_id });
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
