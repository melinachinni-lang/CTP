import React from 'react';
import { Mail, ExternalLink } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { useI18n } from '@/app/i18n/i18nContext';

interface PublicadoPorProps {
  // Información del publicador
  nombre: string;
  tipoVendedor: string;
  logo: string;
  descripcion?: string;
  
  // Contacto
  email: string;
  
  // Acciones
  onContactar?: () => void;
  onVerPerfil?: () => void;
}

export function PublicadoPor({
  nombre,
  tipoVendedor,
  logo,
  descripcion,
  email,
  onContactar,
  onVerPerfil
}: PublicadoPorProps) {
  const { t, language } = useI18n();

  const translateTipoVendedor = (tipo: string): string => {
    if (language !== 'en') return tipo;
    if (tipo === 'Inmobiliaria') return t.common.vendorInmobiliaria;
    if (tipo === 'Broker') return t.common.vendorBroker;
    if (tipo === 'Vendedor particular') return t.common.vendorPersona;
    return tipo;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 style={{ 
        fontFamily: 'var(--font-body)',
        color: '#A3A3A3',
        fontSize: 'var(--font-size-xs)',
        fontWeight: 'var(--font-weight-semibold)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginBottom: '1rem'
      }}>
        {t.common.publishedBy}
      </h3>
      
      <div className="space-y-4">
        {/* Avatar y nombre */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
            <ImageWithFallback 
              src={logo} 
              alt={nombre}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p style={{ 
              fontFamily: 'var(--font-heading)',
              fontWeight: 'var(--font-weight-semibold)',
              color: '#0A0A0A',
              fontSize: 'var(--font-size-body-base)',
              marginBottom: '0.25rem'
            }}>
              {nombre}
            </p>
            <span 
              className="inline-block px-2 py-0.5 rounded text-[10px] font-normal"
              style={{ 
                backgroundColor: '#F5F5F5',
                color: '#6B6B6B',
                letterSpacing: '0.01em'
              }}
            >
              {translateTipoVendedor(tipoVendedor)}
            </span>
          </div>
        </div>

        {/* Descripción (opcional, máximo 2 líneas) */}
        {descripcion && (
          <p 
            className="line-clamp-2"
            style={{ 
              fontFamily: 'var(--font-body)',
              color: '#737373',
              fontSize: 'var(--font-size-body-sm)',
              lineHeight: 'var(--line-height-body)'
            }}
          >
            {descripcion}
          </p>
        )}

        {/* Datos de contacto */}
        <div className="pt-4 space-y-2" style={{ borderTop: '1px solid #E5E5E5' }}>
          <div className="flex items-center gap-2" style={{ color: '#525252' }}>
            <Mail className="w-4 h-4" />
            <span style={{ 
              fontFamily: 'var(--font-body)',
              color: '#525252',
              fontSize: 'var(--font-size-body-sm)'
            }}>
              {email}
            </span>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="pt-4 space-y-2" style={{ borderTop: '1px solid #E5E5E5' }}>
          {/* CTA Secundario: Ver perfil */}
          <button 
            onClick={onVerPerfil}
            className="w-full flex items-center justify-center gap-2 px-6 py-2.5 rounded-full transition-all hover:bg-gray-50"
            style={{ 
              fontFamily: 'var(--font-body)',
              color: '#0A0A0A',
              fontSize: 'var(--font-size-body-sm)',
              fontWeight: 'var(--font-weight-medium)'
            }}
          >
            <span>{t.detail.viewProfile}</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}