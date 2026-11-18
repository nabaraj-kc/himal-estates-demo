'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import enTranslations from '@/i18n/en.json';
import neTranslations from '@/i18n/ne.json';

export type Language = 'en' | 'ne';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (keyPath: string, fallback?: string) => string;
  isNepali: boolean;
}

const translations: Record<Language, any> = {
  en: enTranslations,
  ne: neTranslations,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('himal_estates_language_v1') as Language;
      if (saved === 'en' || saved === 'ne') {
        setLanguageState(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('himal_estates_language_v1', lang);
      document.documentElement.lang = lang;
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ne' : 'en');
  };

  // Helper to resolve nested keys like "nav.home" or "home.stats.listings"
  const t = (keyPath: string, fallback?: string): string => {
    const keys = keyPath.split('.');
    let current = translations[language];

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        // Fallback to English if key missing in Nepali
        let enCurrent = translations.en;
        for (const enKey of keys) {
          if (enCurrent && typeof enCurrent === 'object' && enKey in enCurrent) {
            enCurrent = enCurrent[enKey];
          } else {
            return fallback || keyPath;
          }
        }
        return typeof enCurrent === 'string' ? enCurrent : fallback || keyPath;
      }
    }

    return typeof current === 'string' ? current : fallback || keyPath;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        isNepali: language === 'ne',
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
