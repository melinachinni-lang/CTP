import React from 'react';
import { Upload, Eye, MessageCircle } from 'lucide-react';
import topoBackground from 'figma:asset/1f8d7be2ded66ac9a17238954e64e513a352a1e5.png';

interface VendedorCaptacionSectionProps {
  onPublicarClick?: () => void;
}

export function VendedorCaptacionSection({ onPublicarClick }: VendedorCaptacionSectionProps) {
  const features = [
    {
      icon: <Upload className="w-7 h-7" />,
      titulo: 'Publicación en minutos',
      descripcion: 'Sube tu parcela en menos de 5 minutos y comienza a vender.'
    },
    {
      icon: <Eye className="w-7 h-7" />,
      titulo: 'Miles de compradores activos',
      descripcion: 'Tu propiedad vista por personas que buscan activamente.'
    },
    {
      icon: <MessageCircle className="w-7 h-7" />,
      titulo: 'Sin intermediarios',
      descripcion: 'Conecta y negocia directamente con los interesados.'
    }
  ];

  return (
    <div className="mt-16 mb-8">
      <div 
        className="rounded-2xl p-12 relative overflow-hidden"
        style={{
          backgroundColor: '#0A0A0A',
          backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.8), rgba(10, 10, 10, 0.8)), url(${topoBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Header de la sección */}
        <div className="text-center mb-10">
          <h2 style={{ 
            fontFamily: 'var(--font-heading)',
            fontWeight: 'var(--font-weight-regular)',
            fontSize: 'var(--font-size-h2)',
            color: '#FFFFFF',
            lineHeight: 'var(--line-height-heading)',
            letterSpacing: 'var(--letter-spacing-tight)',
            marginBottom: '1rem'
          }}>
            ¿Tienes una parcela para vender?
          </h2>
          <p style={{ 
            fontFamily: 'var(--font-body)',
            fontWeight: 'var(--font-weight-regular)',
            fontSize: 'var(--font-size-body-lg)',
            color: '#D4D4D4',
            lineHeight: 'var(--line-height-body)',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Llega a miles de compradores interesados en encontrar su parcela ideal.
          </p>
        </div>

        {/* Cards con efecto glass - Grid horizontal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="rounded-3xl p-8 flex flex-col transition-all duration-300 hover:scale-[1.02]"
              style={{ 
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
              }}
            >
              {/* Ícono con fondo blanco sólido */}
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div style={{ color: '#0A0A0A' }}>
                  {feature.icon}
                </div>
              </div>

              {/* Contenido */}
              <div className="space-y-3 flex-grow">
                {/* Título */}
                <h3 style={{ 
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 'var(--font-weight-semibold)',
                  fontSize: 'var(--font-size-body-lg)',
                  color: '#FFFFFF',
                  lineHeight: 'var(--line-height-ui)'
                }}>
                  {feature.titulo}
                </h3>

                {/* Descripción */}
                <p style={{ 
                  fontFamily: 'var(--font-body)',
                  fontWeight: 'var(--font-weight-regular)',
                  fontSize: 'var(--font-size-body-base)',
                  color: '#D4D4D4',
                  lineHeight: 'var(--line-height-body)'
                }}>
                  {feature.descripcion}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button - Centrado con estilo claro sobre fondo oscuro */}
        <div className="text-center">
          <button 
            onClick={onPublicarClick}
            className="px-10 py-3.5 rounded-full transition-all duration-300 hover:bg-white inline-flex items-center gap-2 whitespace-nowrap"
            style={{ 
              fontFamily: 'var(--font-body)',
              backgroundColor: '#FFFFFF',
              color: '#0A0A0A',
              fontWeight: 'var(--font-weight-medium)',
              fontSize: 'var(--font-size-body-base)',
              letterSpacing: 'var(--letter-spacing-wide)',
              boxShadow: '0 4px 20px rgba(255, 255, 255, 0.25)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            Publicar mi parcela
          </button>
        </div>
      </div>
    </div>
  );
}