import { useTranslation } from "react-i18next";
import { useCallback } from "react";

/**
 * Hook unifié pour textes FR/EN selon la langue active du site.
 */
export function useSiteT(siteLocale) {
  const { t, i18n } = useTranslation(["ui", "catalog", "chat", "marketing", "nav", "common"]);
  const active = siteLocale || (i18n.language?.startsWith("en") ? "en" : "fr");
  const isEn = active === "en";

  const tx = useCallback(
    (key, opts = {}) => t(key, { ...opts, lng: active }),
    [t, active],
  );

  return { t: tx, locale: active, isEn, i18n };
}

/**
 * Texte bilingue inline { fr, en } — utile pour données catalogue/API.
 * @param {{ fr?: string, en?: string } | string | null | undefined} block
 * @param {'fr'|'en'} locale
 */
export function pickLocaleText(block, locale = "fr") {
  if (!block) return "";
  if (typeof block === "string") return block;
  return locale === "en" ? block.en || block.fr || "" : block.fr || block.en || "";
}
