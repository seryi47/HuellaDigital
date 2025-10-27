
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '@/locales/en.json';
import es from '@/locales/es.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // Aquí estaba la pequeña errata, ¡ya corregida!
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es }
    },
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false, // React ya se encarga de esto
    },
  });

export default i18n;
