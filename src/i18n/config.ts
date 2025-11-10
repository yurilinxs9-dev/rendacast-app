import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import commonPT from '@/locales/pt/common.json';
import homePT from '@/locales/pt/home.json';
import categoriesPT from '@/locales/pt/categories.json';

import commonEN from '@/locales/en/common.json';
import homeEN from '@/locales/en/home.json';
import categoriesEN from '@/locales/en/categories.json';

const resources = {
  pt: {
    common: commonPT,
    home: homePT,
    categories: categoriesPT,
  },
  en: {
    common: commonEN,
    home: homeEN,
    categories: categoriesEN,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt',
    defaultNS: 'common',
    ns: ['common', 'home', 'categories'],
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;
