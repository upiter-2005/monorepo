import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// import en from './share/locations/en';
// import uk from './share/locations/uk';
// import {resources} from "@org/tranlations";
import en from './share/locations/en.json';
import uk from './share/locations/uk.json';

const resources = {
  en: {
    translation: en,
  },
  uk: {
    translation: uk,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
