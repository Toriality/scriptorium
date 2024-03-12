import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/locales/en.json";
import pt_BR from "@/locales/pt-br.json";
import cz from "@/locales/cz.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: { ...en } },
    pt: { translation: { ...pt_BR } },
    cz: { translation: { ...cz } },
  },
  lng: window.localStorage.getItem("locale") || "en",
  fallbackLng: "en",
});
