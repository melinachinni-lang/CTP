import React from 'react';
import logo from 'figma:asset/a4719ce43ce52ee49df30a2a5c090c8a8b743667.png';
import { useI18n } from '@/app/i18n/i18nContext';

interface SiteFooterProps {
  onNavigate: (screen: string) => void;
  isLoggedIn?: boolean;
  onPublish?: () => void;
}

export function SiteFooter({ onNavigate, isLoggedIn = false, onPublish }: SiteFooterProps) {
  const { t } = useI18n();
  const handlePublish = () => {
    if (onPublish) onPublish();
    else onNavigate('entry');
  };

  return (
    <footer className="bg-white py-10 md:py-12 lg:py-16" style={{ borderTop: '1px solid #E5E5E5' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-12 mb-8 md:mb-10 lg:mb-12">

          {/* Logo + descripción */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4">
            <img
              src={logo}
              alt="CompraTuParcela"
              className="h-14 md:h-16 cursor-pointer"
              style={{ marginLeft: '-12px' }}
              onClick={() => onNavigate('home')}
            />
            <p className="text-sm md:text-base max-w-xs" style={{ color: '#666', fontFamily: 'var(--font-body)', lineHeight: 'var(--line-height-relaxed)' }}>
              {t.footer.tagline}
            </p>
          </div>

          {/* Explorar */}
          <div className="lg:col-span-2 space-y-3 md:space-y-4">
            <div className="text-xs font-semibold tracking-wider" style={{ color: '#0A0A0A', textTransform: 'uppercase', fontWeight: 600 }}>
              {t.footer.exploreLabel}
            </div>
            <div className="space-y-2.5 text-sm" style={{ color: '#666', fontFamily: 'var(--font-body)' }}>
              <div className="cursor-pointer hover:text-[#006B4E] transition-colors" onClick={() => onNavigate('parcelas')}>{t.nav.parcelas}</div>
              <div className="cursor-pointer hover:text-[#006B4E] transition-colors" onClick={() => onNavigate('inmobiliarias')}>{t.nav.inmobiliarias}</div>
              <div className="cursor-pointer hover:text-[#006B4E] transition-colors" onClick={() => onNavigate('recursos')}>{t.footer.blog}</div>
            </div>
          </div>

          {/* Plataforma */}
          <div className="lg:col-span-3 space-y-3 md:space-y-4">
            <div className="text-xs font-semibold tracking-wider" style={{ color: '#0A0A0A', textTransform: 'uppercase', fontWeight: 600 }}>
              {t.footer.platformLabel}
            </div>
            <div className="space-y-2.5 text-sm" style={{ color: '#666', fontFamily: 'var(--font-body)' }}>
              <div className="cursor-pointer hover:text-[#006B4E] transition-colors" onClick={() => onNavigate('como-funciona')}>{t.nav.howItWorks}</div>
              <div className="cursor-pointer hover:text-[#006B4E] transition-colors" onClick={handlePublish}>{t.nav.publishProperty}</div>
              <div className="cursor-pointer hover:text-[#006B4E] transition-colors" onClick={() => onNavigate('planes')}>{t.footer.plansAgencies}</div>
              <div className="cursor-pointer hover:text-[#006B4E] transition-colors" onClick={() => onNavigate('planes-brokers')}>{t.footer.plansBrokers}</div>
            </div>
          </div>

          {/* Soporte */}
          <div className="lg:col-span-3 space-y-3 md:space-y-4">
            <div className="text-xs font-semibold tracking-wider" style={{ color: '#0A0A0A', textTransform: 'uppercase', fontWeight: 600 }}>
              {t.footer.supportLabel}
            </div>
            <div className="space-y-2.5 text-sm" style={{ color: '#666', fontFamily: 'var(--font-body)' }}>
              <a href="mailto:contacto@compratuparcela.cl" className="block hover:text-[#006B4E] transition-colors" style={{ color: 'inherit', textDecoration: 'none' }}>
                contacto@compratuparcela.cl
              </a>
              <div className="cursor-pointer hover:text-[#006B4E] transition-colors" onClick={() => onNavigate('terminos-condiciones')}>{t.footer.terms}</div>
              <div className="cursor-pointer hover:text-[#006B4E] transition-colors" onClick={() => onNavigate('politica-privacidad')}>{t.footer.privacy}</div>
            </div>
          </div>
        </div>

        <div className="pt-6 md:pt-8" style={{ borderTop: '1px solid #CDD8DE' }}>
          <p className="text-xs md:text-sm text-center" style={{ color: '#999', fontFamily: 'var(--font-body)' }}>
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
