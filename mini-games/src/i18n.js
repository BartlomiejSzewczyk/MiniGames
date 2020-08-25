import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import common_pl from "./Translations/pl/common.json";
import common_en from "./Translations/en/common.json";

const resources = {
  en: {
    translation: common_en,
  },
  pl: {
    translation: common_pl,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  debug: true,

  keySeparator: false,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

export default i18n;
