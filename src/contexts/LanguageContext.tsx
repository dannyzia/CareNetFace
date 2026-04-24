import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import i18n from '@/lib/i18n';

type Language = 'bn' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [language, setLanguageState] = useState<Language>('bn');

  useEffect(() => {
    // Detect language from URL first
    const urlLang = location.pathname.split('/')[1] as Language;
    
    // Check localStorage for saved language preference
    const savedLang = localStorage.getItem('language') as Language;
    
    // Priority: URL > localStorage > default (bn)
    const targetLang = (urlLang === 'bn' || urlLang === 'en') ? urlLang : (savedLang || 'bn');
    
    setLanguageState(targetLang);
    i18n.changeLanguage(targetLang);
  }, [location.pathname]);

  useEffect(() => {
    // Update HTML lang attribute
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);

    // Update URL to reflect new language
    const pathWithoutLang = location.pathname.replace(/^\/(bn|en)/, '') || '/';
    navigate(`/${lang}${pathWithoutLang}`, { replace: true });
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
