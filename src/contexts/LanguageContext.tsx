import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export type Language = 'th' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translate: (thText: string, enText?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Load language from localStorage
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLang = localStorage.getItem('preferredLanguage');
    return (savedLang as Language) || 'th';
  });

  // Save language preference
  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const translate = (thText: string, enText?: string) => {
    if (language === 'en') {
      return enText || thText;
    }
    return thText;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// For simple text translation
export const useTranslation = () => {
  const { language, translate } = useLanguage();
  
  return {
    language,
    t: translate,
    isThai: language === 'th',
    isEnglish: language === 'en'
  };
};