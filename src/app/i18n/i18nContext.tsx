import React, { createContext, useContext, useState } from 'react';
import { translations, Language, Currency, Translations } from './translations';

export type Country = 'CL' | 'AR' | 'UY' | 'US' | 'ES';

interface I18nContextType {
  language: Language;
  currency: Currency;
  country: Country;
  setLanguage: (lang: Language) => void;
  setCurrency: (cur: Currency) => void;
  setCountry: (c: Country) => void;
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

const getInitialCountry = (): Country => {
  try {
    const stored = localStorage.getItem('ctp_country') as Country;
    if (['CL', 'AR', 'UY', 'US', 'ES'].includes(stored)) return stored;
  } catch {}
  return 'CL';
};

const USD_RATE = 0.0011;

// Country → auto language + suggested currency
export const COUNTRY_DEFAULTS: Record<Country, { language: Language; currency: Currency; label: string; flag: string }> = {
  CL: { language: 'es', currency: 'CLP', label: 'Chile',     flag: '🇨🇱' },
  AR: { language: 'es', currency: 'USD', label: 'Argentina', flag: '🇦🇷' },
  UY: { language: 'es', currency: 'USD', label: 'Uruguay',   flag: '🇺🇾' },
  US: { language: 'en', currency: 'USD', label: 'USA',       flag: '🇺🇸' },
  ES: { language: 'es', currency: 'USD', label: 'España',    flag: '🇪🇸' },
};

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const [currency, setCurrencyState] = useState<Currency>(getInitialCurrency);
  const [country, setCountryState] = useState<Country>(getInitialCountry);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try { localStorage.setItem('ctp_language', lang); } catch {}
  };

  const setCurrency = (cur: Currency) => {
    setCurrencyState(cur);
    try { localStorage.setItem('ctp_currency', cur); } catch {}
  };

  const setCountry = (c: Country) => {
    setCountryState(c);
    try { localStorage.setItem('ctp_country', c); } catch {}
    // Auto-set language and currency based on country
    const defaults = COUNTRY_DEFAULTS[c];
    setLanguage(defaults.language);
    setCurrency(defaults.currency);
  };

  const formatPrice = (clpAmount: number): string => {
    if (currency === 'USD') {
      const usd = clpAmount * USD_RATE;
      return `USD ${usd.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    }
    return `CLP ${clpAmount.toLocaleString('es-CL')}`;
  };

  return (
    <I18nContext.Provider value={{ language, currency, country, setLanguage, setCurrency, setCountry, t: translations[language], formatPrice }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextType {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider');
  return ctx;
}
