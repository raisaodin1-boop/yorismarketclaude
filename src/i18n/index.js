import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import commonFr from "../locales/fr/common.json";
import commonEn from "../locales/en/common.json";

i18n.use(initReactI18next).init({
  lng: "fr",
  fallbackLng: "fr",
  supportedLngs: ["fr", "en"],
  ns: ["common"],
  defaultNS: "common",
  resources: {
    fr: { common: commonFr },
    en: { common: commonEn },
  },
  interpolation: { escapeValue: false },
  react: {
    useSuspense: false,
  },
});

export default i18n;
