import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import uiFr from "../locales/fr/ui.json";
import uiEn from "../locales/en/ui.json";
import catalogFr from "../locales/fr/catalog.json";
import catalogEn from "../locales/en/catalog.json";
import chatFr from "../locales/fr/chat.json";
import chatEn from "../locales/en/chat.json";
import marketingFr from "../locales/fr/marketing.json";
import marketingEn from "../locales/en/marketing.json";
import commonFr from "../locales/fr/common.json";
import commonEn from "../locales/en/common.json";
import navFr from "../locales/fr/nav.json";
import navEn from "../locales/en/nav.json";
import checkoutFr from "../locales/fr/checkout.json";
import checkoutEn from "../locales/en/checkout.json";
import sellerFr from "../locales/fr/seller.json";
import sellerEn from "../locales/en/seller.json";
import adminFr from "../locales/fr/admin.json";
import adminEn from "../locales/en/admin.json";

export const I18N_NAMESPACES = [
  "common",
  "nav",
  "checkout",
  "seller",
  "admin",
  "ui",
  "catalog",
  "chat",
  "marketing",
];

i18n.use(initReactI18next).init({
  lng: "fr",
  fallbackLng: "fr",
  supportedLngs: ["fr", "en"],
  ns: I18N_NAMESPACES,
  defaultNS: "common",
  resources: {
    fr: {
      common: commonFr,
      nav: navFr,
      checkout: checkoutFr,
      seller: sellerFr,
      admin: adminFr,
      ui: uiFr,
      catalog: catalogFr,
      chat: chatFr,
      marketing: marketingFr,
    },
    en: {
      common: commonEn,
      nav: navEn,
      checkout: checkoutEn,
      seller: sellerEn,
      admin: adminEn,
      ui: uiEn,
      catalog: catalogEn,
      chat: chatEn,
      marketing: marketingEn,
    },
  },
  interpolation: { escapeValue: false },
  react: {
    useSuspense: false,
  },
});

/** Libellé rôle avec emoji (header / dashboard). */
export function roleLabel(t, role) {
  const icons = { buyer: "🛍️", seller: "🏪", delivery: "🚚", provider: "👷", admin: "🛡️" };
  const key = `roles.${role || "buyer"}`;
  const label = t(key, { ns: "nav", defaultValue: role || "buyer" });
  return `${icons[role] || "👤"} ${label}`;
}

/** @param {'fr'|'en'} locale */
export function setSiteLanguage(locale) {
  const lng = locale === "en" ? "en" : "fr";
  if (i18n.language !== lng) {
    void i18n.changeLanguage(lng);
  }
  if (typeof document !== "undefined") {
    document.documentElement.lang = lng === "en" ? "en" : "fr";
  }
}

export default i18n;
