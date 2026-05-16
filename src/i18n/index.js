import i18n from "i18next";
import { initReactI18next } from "react-i18next";
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

export const I18N_NAMESPACES = ["common", "nav", "checkout", "seller", "admin"];

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
    },
    en: {
      common: commonEn,
      nav: navEn,
      checkout: checkoutEn,
      seller: sellerEn,
      admin: adminEn,
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

export default i18n;
