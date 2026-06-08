import React from 'react';
import { useI18n } from '@/app/i18n/i18nContext';

interface PublicadoPorCompactProps {
  nombre: string;
  tipoVendedor: string;
  logo: string;
}

export function PublicadoPorCompact({ nombre, tipoVendedor, logo }: PublicadoPorCompactProps) {
  const { t } = useI18n();

  const translateVendor = (tipo: string) => {
    if (tipo === 'Inmobiliaria') return t.common.vendorInmobiliaria;
    if (tipo === 'Broker') return t.common.vendorBroker;
    if (tipo === 'Persona natural') return t.common.vendorPersona;
    return tipo;
  };

  return (
    <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
      <img
        src={logo}
        alt={nombre}
        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
      />
      <div className="flex-grow min-w-0">
        <div
          className="text-xs text-gray-500"
          style={{ fontSize: '11px', fontFamily: 'var(--font-body)' }}
        >
          {t.common.publishedBy}
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className="text-xs font-medium truncate"
            style={{
              color: '#0A0A0A',
              fontSize: '13px',
              fontFamily: 'var(--font-body)',
              fontWeight: 'var(--font-weight-medium)'
            }}
          >
            {nombre}
          </div>
          <span
            className="px-1.5 py-0.5 text-[10px] font-normal rounded flex-shrink-0"
            style={{
              backgroundColor: '#F5F5F5',
              color: '#6B6B6B',
              letterSpacing: '0.01em',
              fontFamily: 'var(--font-body)'
            }}
          >
            {translateVendor(tipoVendedor)}
          </span>
        </div>
      </div>
    </div>
  );
}
