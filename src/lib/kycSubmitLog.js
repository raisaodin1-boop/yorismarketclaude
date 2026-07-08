const BUFFER_KEY = "yorix_kyc_submit_log";
const MAX_ENTRIES = 40;
const DEBUG_FLAG = "yorix_kyc_debug";

/** Active les logs détaillés : localStorage yorix_kyc_debug=1 ou ?kyc_debug=1 */
export function isKycDebugEnabled() {
  if (typeof window === "undefined") return import.meta.env?.DEV === true;
  try {
    if (localStorage.getItem(DEBUG_FLAG) === "1") return true;
    if (new URLSearchParams(window.location.search).get("kyc_debug") === "1") return true;
  } catch {
    /* ignore */
  }
  return import.meta.env?.DEV === true;
}

function maskId(value) {
  const s = String(value || "");
  if (s.length <= 8) return "***";
  return `${s.slice(0, 8)}…`;
}

function redactPayload(data) {
  if (!data || typeof data !== "object") return data;
  const out = { ...data };
  const sensitive = [
    "full_name",
    "cni_number",
    "birth_date",
    "birth_place",
    "phone",
    "email",
    "whatsapp",
    "address",
    "doc_url",
    "doc_url2",
    "selfie_url",
    "shop_photo_url",
    "extra_docs",
  ];
  for (const key of sensitive) {
    if (key in out) {
      if (key === "extra_docs" && Array.isArray(out[key])) {
        out[key] = `${out[key].length} doc(s)`;
      } else if (typeof out[key] === "string" && out[key].startsWith("http")) {
        out[key] = "[url]";
      } else if (out[key]) {
        out[key] = "[redacted]";
      }
    }
  }
  if (out.user_id) out.user_id = maskId(out.user_id);
  return out;
}

function readBuffer() {
  if (typeof sessionStorage === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(BUFFER_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeBuffer(entries) {
  if (typeof sessionStorage === "undefined") return;
  try {
    sessionStorage.setItem(BUFFER_KEY, JSON.stringify(entries.slice(-MAX_ENTRIES)));
  } catch {
    /* quota */
  }
}

/** Dernières entrées (support / debug sans DevTools). */
export function getKycSubmitLogBuffer() {
  return readBuffer();
}

/** Efface le buffer local. */
export function clearKycSubmitLogBuffer() {
  if (typeof sessionStorage !== "undefined") {
    try {
      sessionStorage.removeItem(BUFFER_KEY);
    } catch {
      /* ignore */
    }
  }
}

/** Journalise une étape d'envoi KYC (toujours en cas d'erreur ; détail si debug). */
export function logKycEvent(phase, details = {}, level = "info") {
  const entry = {
    t: new Date().toISOString(),
    phase,
    level,
    ...(isKycDebugEnabled() ? redactPayload(details) : summarizeDetails(details)),
  };

  const buf = readBuffer();
  buf.push(entry);
  writeBuffer(buf);

  const prefix = `[KYC:${phase}]`;
  if (level === "error") {
    console.error(prefix, entry);
  } else if (level === "warn") {
    console.warn(prefix, isKycDebugEnabled() ? entry : phase, details?.message || "");
  } else if (isKycDebugEnabled()) {
    console.info(prefix, entry);
  }
}

function summarizeDetails(details) {
  if (!details || typeof details !== "object") return {};
  const out = {};
  if (details.user_id) out.user_id = maskId(details.user_id);
  if (details.slot) out.slot = details.slot;
  if (details.status) out.status = details.status;
  if (details.message) out.message = details.message;
  if (details.code) out.code = details.code;
  if (details.extraDocsCount != null) out.extraDocsCount = details.extraDocsCount;
  if (details.fallback) out.fallback = details.fallback;
  return out;
}

export function logKycError(phase, err, extra = {}) {
  const msg = String(err?.message || err || "unknown");
  logKycEvent(
    phase,
    {
      ...extra,
      message: msg,
      code: err?.code || err?.status || undefined,
      hint: err?.hint || undefined,
    },
    "error",
  );
}
