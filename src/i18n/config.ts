import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import commonPT from '@/locales/pt/common.json';
import homePT from '@/locales/pt/home.json';
import categoriesPT from '@/locales/pt/categories.json';
import audiobookPT from '@/locales/pt/audiobook.json';
import seoPT from '@/locales/pt/seo.json';

import commonEN from '@/locales/en/common.json';
import homeEN from '@/locales/en/home.json';
import categoriesEN from '@/locales/en/categories.json';
import audiobookEN from '@/locales/en/audiobook.json';
import seoEN from '@/locales/en/seo.json';

const resources = {
  pt: {
    common: commonPT,
    home: homePT,
    categories: categoriesPT,
    audiobook: audiobookPT,
    seo: seoPT,
  },
  en: {
    common: commonEN,
    home: homeEN,
    categories: categoriesEN,
    audiobook: audiobookEN,
    seo: seoEN,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt',
    defaultNS: 'common',
    ns: ['common', 'home', 'categories', 'audiobook', 'seo'],
    
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
