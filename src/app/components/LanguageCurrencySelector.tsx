import React, { useState, useRef, useEffect } from 'react';
import { useI18n, Country, COUNTRY_DEFAULTS, COUNTRY_CURRENCIES } from '../i18n/i18nContext';
import { Language, Currency } from '../i18n/translations';

interface Props {
  variant?: 'sidebar' | 'header';
}

function FlagCircle({ code, size = 20 }: { code: string; size?: number }) {
  return (
    <div style={{
      width: size, height: size,
      borderRadius: '50%',
      overflow: 'hidden',
      flexShrink: 0,
      border: '1px solid rgba(0,0,0,0.1)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: '#f0f0f0',
    }}>
      <img
        src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
        alt={code}
        style={{ width: '140%', height: '140%', objectFit: 'cover', objectPosition: 'center' }}
      />
    </div>
  );
}

export default function LanguageCurrencySelector({ variant = 'header' }: Props) {
  const { language, currency, country, setLanguage, setCurrency, setCountry, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const currentCountry = COUNTRY_DEFAULTS[country];

  if (variant === 'sidebar') {
    return (
      <div className="px-3 py-2 space-y-3">
        {/* País */}
        <div>
          <p className="text-xs text-gray-400 mb-1">País</p>
          <div className="flex flex-col gap-1">
            {(Object.entries(COUNTRY_DEFAULTS) as [Country, typeof COUNTRY_DEFAULTS[Country]][]).map(([code, info]) => (
              <button
                key={code}
                onClick={() => setCountry(code)}
                className="flex items-center gap-2 text-xs py-1.5 px-2 rounded border transition-colors text-left"
                style={{
                  borderColor: country === code ? '#006B4E' : '#d1d5db',
                  backgroundColor: country === code ? '#006B4E' : 'transparent',
                  color: country === code ? '#fff' : '#6b7280',
                  fontWeight: country === code ? 700 : 400,
                }}
              >
                <FlagCircle code={code} size={18} />
                <span>{info.label}</span>
              </button>
            ))}
          </div>
        </div>
        {/* Idioma */}
        <div>
          <p className="text-xs text-gray-400 mb-1">{t.selector.language}</p>
          <div className="flex gap-1">
            {(['es', 'en'] as Language[]).map(lang => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className="flex-1 text-xs py-1 rounded border transition-colors"
                style={{
                  borderColor: language === lang ? '#006B4E' : '#d1d5db',
                  backgroundColor: language === lang ? '#006B4E' : 'transparent',
                  color: language === lang ? '#fff' : '#6b7280',
                  fontWeight: language === lang ? 700 : 400,
                }}
              >
                {lang === 'es' ? 'ES' : 'EN'}
              </button>
            ))}
          </div>
        </div>
        {/* Moneda */}
        <div>
          <p className="text-xs text-gray-400 mb-1">{t.selector.currency}</p>
          <div className="flex gap-1">
            {COUNTRY_CURRENCIES[country].map(cur => (
              <button
                key={cur}
                onClick={() => setCurrency(cur)}
                className="flex-1 text-xs py-1 rounded border transition-colors"
                style={{
                  borderColor: currency === cur ? '#006B4E' : '#d1d5db',
                  backgroundColor: currency === cur ? '#006B4E' : 'transparent',
                  color: currency === cur ? '#fff' : '#6b7280',
                  fontWeight: currency === cur ? 700 : 400,
                }}
              >
                {cur}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1.5 text-sm px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
        style={{ color: '#374151', fontWeight: 500 }}
      >
        <FlagCircle code={country} size={18} />
        <span>{language.toUpperCase()}</span>
        <span className="text-gray-300">|</span>
        <span>{currency}</span>
        <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-3 w-56">
          {/* País */}
          <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">País / Region</p>
          <div className="space-y-1 mb-3">
            {(Object.entries(COUNTRY_DEFAULTS) as [Country, typeof COUNTRY_DEFAULTS[Country]][]).map(([code, info]) => (
              <button
                key={code}
                onClick={() => { setCountry(code); setOpen(false); }}
                className="w-full text-left text-sm px-2 py-1.5 rounded-lg flex items-center gap-2.5 transition-colors"
                style={{
                  backgroundColor: country === code ? '#f0fdf4' : 'transparent',
                  color: country === code ? '#006B4E' : '#374151',
                  fontWeight: country === code ? 600 : 400,
                }}
              >
                <FlagCircle code={code} size={20} />
                <span>{info.label}</span>
                {country === code && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-700 inline-block" />}
              </button>
            ))}
          </div>

          {/* Idioma */}
          <div className="border-t border-gray-100 pt-2 mb-3">
            <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">{t.selector.language}</p>
            <div className="space-y-1">
              {([['es', t.selector.spanish], ['en', t.selector.english]] as [Language, string][]).map(([lang, label]) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className="w-full text-left text-sm px-2 py-1.5 rounded-lg flex items-center gap-2 transition-colors"
                  style={{
                    backgroundColor: language === lang ? '#f0fdf4' : 'transparent',
                    color: language === lang ? '#006B4E' : '#374151',
                    fontWeight: language === lang ? 600 : 400,
                  }}
                >
                  {language === lang && <span className="w-1.5 h-1.5 rounded-full bg-green-700 inline-block" />}
                  {language !== lang && <span className="w-1.5 h-1.5 inline-block" />}
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Moneda */}
          <div className="border-t border-gray-100 pt-2">
            <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">{t.selector.currency}</p>
            <div className="space-y-1">
              {(COUNTRY_CURRENCIES[country].map(cur => [cur, t.selector[cur.toLowerCase() as keyof typeof t.selector] || cur] as [Currency, string])).map(([cur, label]) => (
                <button
                  key={cur}
                  onClick={() => setCurrency(cur)}
                  className="w-full text-left text-sm px-2 py-1.5 rounded-lg flex items-center gap-2 transition-colors"
                  style={{
                    backgroundColor: currency === cur ? '#f0fdf4' : 'transparent',
                    color: currency === cur ? '#006B4E' : '#374151',
                    fontWeight: currency === cur ? 600 : 400,
                  }}
                >
                  {currency === cur && <span className="w-1.5 h-1.5 rounded-full bg-green-700 inline-block" />}
                  {currency !== cur && <span className="w-1.5 h-1.5 inline-block" />}
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
