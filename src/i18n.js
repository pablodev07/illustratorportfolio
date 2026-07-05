import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationES from './locales/es/translation.json';
import translationEN from './locales/en/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: translationES },
      en: { translation: translationEN },
    },
    fallbackLng: 'es',
    supportedLngs: ['es', 'en'], // ← Solo estos idiomas son válidos
    nonExplicitSupportedLngs: true, // ← Aceptar variantes como "es-AR"
    detection: {
      order: ['path', 'navigator'],
      lookupFromPathIndex: 0,
      caches: [],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;