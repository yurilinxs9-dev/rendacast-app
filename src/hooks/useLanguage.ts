import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export type Language = 'pt' | 'en';

export const useLanguage = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: Language) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };

  const currentLanguage = (i18n.language || 'pt').split('-')[0] as Language;

  useEffect(() => {
    // Sincronizar HTML lang attribute
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  return {
    language: currentLanguage,
    changeLanguage,
    isPortuguese: currentLanguage === 'pt',
    isEnglish: currentLanguage === 'en',
  };
};
