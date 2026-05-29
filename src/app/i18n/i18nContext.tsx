import React, { createContext, useContext, useState } from 'react';
import { translations, Language, Currency, Translations } from './translations';

interface I18nContextType {
  language: Language;
  currency: Currency;
  setLanguage: (lang: Language) => void;
  setCurrency: (cur: Currency) => void;
  t: Translations;
  formatPrice: (clpAmount: number) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

const getInitialLanguage = (): Language => {
  try {
    const stored = localStorage.getItem('ctp_language');
    if (stored === 'es' || stored === 'en') return stored;
  } catch {}
  return 'es';
};

const getInitialCurrency = (): Currency => {
  try {
    const stored = localStorage.getItem('ctp_currency');
    if (stored === 'CLP' || stored === 'USD') return stored;
  } catch {}
  return 'CLP';
};

const USD_RATE = 0.0011;

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const [currency, setCurrencyState] = useState<Currency>(getInitialCurrency);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try { localStorage.setItem('ctp_language', lang); } catch {}
  };

  const setCurrency = (cur: Currency) => {
    setCurrencyState(cur);
    try { localStorage.setItem('ctp_currency', cur); } catch {}
  };

  const formatPrice = (clpAmount: number): string => {
    if (currency === 'USD') {
      const usd = clpAmount * USD_RATE;
      return `USD ${usd.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    }
    return `CLP ${clpAmount.toLocaleString('es-CL')}`;
  };

  return (
    <I18nContext.Provider value={{ language, currency, setLanguage, setCurrency, t: translations[language], formatPrice }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextType {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider');
  return ctx;
}
