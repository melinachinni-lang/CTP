import React from 'react';

interface PrecioDisplayProps {
  precioCLP: string; // Formato: "CLP $120.000.000" o "$120.000.000"
  className?: string;
  precioSize?: 'sm' | 'md' | 'lg' | 'xl';
  showUF?: boolean; // Por defecto true
}

// Valor aproximado de UF (se actualiza diariamente en la realidad)
const VALOR_UF = 38750; // CLP por UF (valor aproximado - 17 marzo 2026)

/**
 * Convierte un precio en CLP a UF
 */
const convertirCLPaUF = (precioCLP: string): string => {
  // Extraer solo los números del string
  const numeroLimpio = precioCLP.replace(/[^\d]/g, '');
  const valorCLP = parseInt(numeroLimpio, 10);
  
  if (isNaN(valorCLP)) return '0';
  
  const valorUF = valorCLP / VALOR_UF;
  
  // Formatear con separador de miles y decimales
  return valorUF.toLocaleString('es-CL', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
};

/**
 * Formatea el precio en CLP con separadores
 */
const formatearCLP = (precioCLP: string): string => {
  // Si ya viene formateado, retornarlo
  if (precioCLP.includes('$')) {
    return precioCLP.replace('CLP ', '');
  }
  
  // Extraer solo los números
  const numeroLimpio = precioCLP.replace(/[^\d]/g, '');
  const valorCLP = parseInt(numeroLimpio, 10);
  
  if (isNaN(valorCLP)) return '$0';
  
  return '$' + valorCLP.toLocaleString('es-CL');
};

export function PrecioDisplay({ 
  precioCLP, 
  className = '', 
  precioSize = 'lg',
  showUF = true 
}: PrecioDisplayProps) {
  const precioFormateado = formatearCLP(precioCLP);
  const precioUF = convertirCLPaUF(precioCLP);
  
  // Tamaños de fuente según el prop
  const precioSizeMap = {
    sm: 'var(--font-size-body-base)',
    md: 'var(--font-size-body-lg)',
    lg: 'var(--font-size-h4)',
    xl: 'var(--font-size-h2)'
  };
  
  return (
    <div className={className}>
      <p style={{ 
        fontFamily: 'var(--font-heading)',
        fontWeight: 'var(--font-weight-semibold)',
        fontSize: precioSizeMap[precioSize],
        color: '#0A0A0A',
        lineHeight: '1.2',
        marginBottom: showUF ? '0.25rem' : '0'
      }}>
        {precioFormateado}
      </p>
      
      {showUF && (
        <p style={{ 
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--muted-foreground)',
          lineHeight: '1.4'
        }}>
          UF {precioUF} (1 UF = ${VALOR_UF.toLocaleString('es-CL')})
        </p>
      )}
    </div>
  );
}