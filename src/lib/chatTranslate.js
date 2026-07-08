/**
 * Traduction instantanée FR ↔ EN pour la messagerie (MyMemory API + cache).
 */

const cache = new Map();
const MAX_CACHE = 500;

const FR_HINTS =
  /\b(le|la|les|de|du|des|un|une|est|sont|pour|avec|vous|bonjour|merci|je|nous|prix|livraison|commande|produit|bonsoir|salut|oui|non|chez|cameroon|cameroun)\b/gi;
const EN_HINTS =
  /\b(the|and|for|with|you|your|hello|thanks|price|delivery|order|please|product|yes|no|wholesale|supplier)\b/gi;

/** @param {string} text */
export function detectTextLanguage(text) {
  if (!text || typeof text !== "string") return "unknown";
  const sample = text.trim().slice(0, 400);
  if (sample.length < 2) return "unknown";

  const frScore = (sample.match(FR_HINTS) || []).length;
  const enScore = (sample.match(EN_HINTS) || []).length;

  if (frScore === 0 && enScore === 0) {
    if (/[àâäéèêëïîôùûüç]/i.test(sample)) return "fr";
    return "unknown";
  }
  if (frScore >= enScore) return "fr";
  return "en";
}

/**
 * @param {string} text
 * @param {'fr'|'en'} targetLang
 * @returns {Promise<string|null>}
 */
export async function translateChatText(text, targetLang) {
  const trimmed = String(text || "").trim();
  if (!trimmed || trimmed.length < 2) return null;

  const source = detectTextLanguage(trimmed);
  if (source === "unknown" || source === targetLang) return null;

  const cacheKey = `${source}|${targetLang}|${trimmed.slice(0, 480)}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  try {
    const url = new URL("https://api.mymemory.translated.net/get");
    url.searchParams.set("q", trimmed.slice(0, 500));
    url.searchParams.set("langpair", `${source}|${targetLang}`);

    const res = await fetch(url.toString(), { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;

    const data = await res.json();
    const translated = String(data?.responseData?.translatedText || "").trim();
    if (!translated || translated.toLowerCase() === trimmed.toLowerCase()) return null;

    if (cache.size >= MAX_CACHE) {
      const first = cache.keys().next().value;
      cache.delete(first);
    }
    cache.set(cacheKey, translated);
    return translated;
  } catch {
    return null;
  }
}

/** @param {string} locale */
export function chatViewerLang(locale) {
  return locale === "en" ? "en" : "fr";
}
