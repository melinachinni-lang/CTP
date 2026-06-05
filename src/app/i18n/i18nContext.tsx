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
    const stored = localStorage.getItem('ctp_currency') as Currency;
    if (['CLP', 'USD', 'ARS', 'UYU', 'EUR'].includes(stored)) return stored;
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

// Tasas de conversión desde CLP (aproximadas, referencia wireframe)
const RATES: Record<Currency, number> = {
  CLP: 1,
  USD: 0.0011,       // 1 CLP ≈ 0.0011 USD  (~910 CLP/USD)
  ARS: 1.05,         // 1 CLP ≈ 1.05 ARS
  UYU: 0.04,         // 1 CLP ≈ 0.04 UYU
  EUR: 0.00099,      // 1 CLP ≈ 0.00099 EUR  (~1010 CLP/EUR)
};

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  CLP: 'CLP', USD: 'USD', ARS: 'ARS', UYU: 'UYU', EUR: 'EUR',
};

const CURRENCY_LOCALES: Record<Currency, string> = {
  CLP: 'es-CL', USD: 'en-US', ARS: 'es-AR', UYU: 'es-UY', EUR: 'de-DE',
};

// País → moneda local por defecto + idioma
export const COUNTRY_DEFAULTS: Record<Country, { language: Language; currency: Currency; label: string; flag: string }> = {
  CL: { language: 'es', currency: 'CLP', label: 'Chile',     flag: '🇨🇱' },
  AR: { language: 'es', currency: 'ARS', label: 'Argentina', flag: '🇦🇷' },
  UY: { language: 'es', currency: 'UYU', label: 'Uruguay',   flag: '🇺🇾' },
  US: { language: 'en', currency: 'USD', label: 'USA',       flag: '🇺🇸' },
  ES: { language: 'es', currency: 'EUR', label: 'España',    flag: '🇪🇸' },
};

// Monedas disponibles por país (moneda local + USD siempre)
export const COUNTRY_CURRENCIES: Record<Country, Currency[]> = {
  CL: ['CLP', 'USD'],
  AR: ['ARS', 'USD'],
  UY: ['UYU', 'USD'],
  US: ['USD'],
  ES: ['EUR', 'USD'],
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
    const defaults = COUNTRY_DEFAULTS[c];
    setLanguage(defaults.language);
    setCurrency(defaults.currency);
  };

  const formatPrice = (clpAmount: number): string => {
    if (currency === 'CLP') {
      return `CLP ${clpAmount.toLocaleString('es-CL')}`;
    }
    const converted = Math.round(clpAmount * RATES[currency]);
    const symbol = CURRENCY_SYMBOLS[currency];
    const locale = CURRENCY_LOCALES[currency];
    return `${symbol} ${converted.toLocaleString(locale)}`;
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
