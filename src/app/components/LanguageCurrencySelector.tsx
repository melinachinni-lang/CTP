import React, { useState, useRef, useEffect } from 'react';
import { useI18n } from '../i18n/i18nContext';
import { Language, Currency } from '../i18n/translations';

interface Props {
  variant?: 'sidebar' | 'header';
}

export default function LanguageCurrencySelector({ variant = 'header' }: Props) {
  const { language, currency, setLanguage, setCurrency, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const langLabel = language === 'es' ? 'ES' : 'EN';
  const currLabel = currency;

  if (variant === 'sidebar') {
    return (
      <div className="px-3 py-2 space-y-2">
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
        <div>
          <p className="text-xs text-gray-400 mb-1">{t.selector.currency}</p>
          <div className="flex gap-1">
            {(['CLP', 'USD'] as Currency[]).map(cur => (
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
        className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
        style={{ color: '#374151', fontWeight: 500 }}
      >
        <span>{langLabel}</span>
        <span className="text-gray-300">|</span>
        <span>{currLabel}</span>
        <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-3 w-52">
          <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">{t.selector.language}</p>
          <div className="space-y-1 mb-3">
            {([['es', t.selector.spanish], ['en', t.selector.english]] as [Language, string][]).map(([lang, label]) => (
              <button
                key={lang}
                onClick={() => { setLanguage(lang); }}
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

          <div className="border-t border-gray-100 pt-2">
            <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">{t.selector.currency}</p>
            <div className="space-y-1">
              {([['CLP', t.selector.clp], ['USD', t.selector.usd]] as [Currency, string][]).map(([cur, label]) => (
                <button
                  key={cur}
                  onClick={() => { setCurrency(cur); }}
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
