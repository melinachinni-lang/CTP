import React from 'react';
import { useI18n } from '@/app/i18n/i18nContext';

interface PrecioDisplayProps {
  precioCLP: string;
  className?: string;
  precioSize?: 'sm' | 'md' | 'lg' | 'xl';
  showUF?: boolean; // solo aplica en CLP
}

const VALOR_UF = 38750;

const convertirCLPaUF = (precioCLP: string): string => {
  const valorCLP = parseInt(precioCLP.replace(/[^\d]/g, ''), 10);
  if (isNaN(valorCLP)) return '0';
  return (valorCLP / VALOR_UF).toLocaleString('es-CL', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
};

const formatearCLP = (precioCLP: string): string => {
  if (precioCLP.includes('$')) return precioCLP.replace('CLP ', '');
  const valorCLP = parseInt(precioCLP.replace(/[^\d]/g, ''), 10);
  if (isNaN(valorCLP)) return '$0';
  return '$' + valorCLP.toLocaleString('es-CL');
};

export function PrecioDisplay({ precioCLP, className = '', precioSize = 'lg', showUF = true }: PrecioDisplayProps) {
  const { currency, formatPrice } = useI18n();

  const precioSizeMap = {
    sm: 'var(--font-size-body-base)',
    md: 'var(--font-size-body-lg)',
    lg: 'var(--font-size-h4)',
    xl: 'var(--font-size-h2)',
  };

  const valorCLP = parseInt(precioCLP.replace(/[^\d]/g, ''), 10);

  // Monedas distintas a CLP → usar formatPrice (conversión) sin UF
  if (currency !== 'CLP') {
    const precioConvertido = isNaN(valorCLP) ? `${currency} 0` : formatPrice(valorCLP);
    return (
      <div className={className}>
        <p style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 'var(--font-weight-semibold)',
          fontSize: precioSizeMap[precioSize],
          color: '#0A0A0A',
          lineHeight: '1.2',
          marginBottom: 0,
        }}>
          {precioConvertido}
        </p>
      </div>
    );
  }

  // CLP: mostrar precio + UF
  return (
    <div className={className}>
      <p style={{
        fontFamily: 'var(--font-heading)',
        fontWeight: 'var(--font-weight-semibold)',
        fontSize: precioSizeMap[precioSize],
        color: '#0A0A0A',
        lineHeight: '1.2',
        marginBottom: showUF ? '0.25rem' : 0,
      }}>
        {formatearCLP(precioCLP)}
      </p>
      {showUF && (
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--muted-foreground)',
          lineHeight: '1.4',
        }}>
          UF {convertirCLPaUF(precioCLP)} (1 UF = ${VALOR_UF.toLocaleString('es-CL')})
        </p>
      )}
    </div>
  );
}
