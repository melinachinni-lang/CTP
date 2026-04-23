import React, { useState } from 'react';
import { Instagram, Youtube, Facebook } from 'lucide-react';

interface SocialMediaBannerProps {
  className?: string;
}

// Componente custom para TikTok (ya que lucide-react no tiene ícono nativo)
function TikTokIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

export function SocialMediaBanner({ className = '' }: SocialMediaBannerProps) {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/compratuparcela' },
    { name: 'TikTok', icon: TikTokIcon, url: 'https://tiktok.com/@compratuparcela' },
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com/compratuparcela' },
    { name: 'YouTube', icon: Youtube, url: 'https://youtube.com/@compratuparcela' }
  ];

  return (
    <div className={className}>
      <div
        className="w-full px-6 md:px-8 py-8 md:py-10 transition-all relative overflow-hidden"
        style={{
          backgroundColor: '#E8EBDD',
          border: '2px solid #D9DDD0',
          borderRadius: '24px'
        }}
      >
        {/* Capa de fondo: Gradiente sutil */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 160, 97, 0.08) 0%, rgba(107, 142, 35, 0.12) 100%)',
            zIndex: 0
          }}
        />
        
        {/* Silueta de montañas SVG - Sombra sutil */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 1
          }}
        >
          <svg
            viewBox="0 0 1200 300"
            preserveAspectRatio="none"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 1
            }}
          >
            {/* Montañas en tonos verdes apenas más claros */}
            <path
              d="M0,300 L0,180 Q150,100 300,150 T600,120 T900,140 T1200,100 L1200,300 Z"
              fill="#EEF1E6"
              opacity="0.6"
            />
            <path
              d="M0,300 L0,200 Q200,120 400,180 T800,160 T1200,140 L1200,300 Z"
              fill="#F0F3E9"
              opacity="0.5"
            />
            <path
              d="M0,300 L0,220 Q300,160 600,200 T1200,180 L1200,300 Z"
              fill="#F2F5EB"
              opacity="0.4"
            />
          </svg>
        </div>
        
        {/* Contenido con posición relativa para estar sobre el fondo */}
        <div className="relative" style={{ zIndex: 2 }}>
          <div className="flex flex-col items-center text-center">
            {/* Contenido: Texto + Iconos */}
            <div className="space-y-6 flex flex-col items-center w-full">
              {/* Título y subtítulo */}
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--font-size-h3)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-heading)',
                    margin: 0,
                    marginBottom: '8px'
                  }}
                >
                  Síguenos en redes
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    color: '#6B6B6B',
                    lineHeight: 'var(--line-height-body)',
                    margin: 0,
                    maxWidth: '560px'
                  }}
                >
                  Tips, oportunidades y novedades sobre parcelas e inversión inmobiliaria
                </p>
              </div>

              {/* Íconos de redes sociales debajo del texto */}
              <div className="flex items-center justify-center lg:justify-start gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  const isHovered = hoveredIcon === social.name;
                  
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center transition-all"
                      style={{
                        width: '48px',
                        height: '48px',
                        backgroundColor: isHovered ? '#0D3640' : '#124854',
                        border: '2px solid',
                        borderColor: isHovered ? '#0D3640' : '#124854',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                        boxShadow: isHovered ? '0 4px 12px rgba(18, 72, 84, 0.25)' : '0 2px 4px rgba(18, 72, 84, 0.15)'
                      }}
                      onMouseEnter={() => setHoveredIcon(social.name)}
                      onMouseLeave={() => setHoveredIcon(null)}
                      aria-label={`Síguenos en ${social.name}`}
                    >
                      <Icon 
                        className="w-5 h-5" 
                        style={{ 
                          color: isHovered ? '#FFFFFF' : '#F5F5F0',
                          transition: 'color 0.2s ease'
                        }} 
                      />
                    </a>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}