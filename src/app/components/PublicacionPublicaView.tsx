import React from 'react';
import { X, MapPin, Maximize2, Home, CheckCircle2, Share2, Heart, ArrowLeft } from 'lucide-react';
import { PublicationData } from '@/app/components/PublicationWizard';

interface PublicacionPublicaViewProps {
  publication: PublicationData & { id: string; views?: number };
  onClose: () => void;
}

export function PublicacionPublicaView({ publication, onClose }: PublicacionPublicaViewProps) {
  const getTypologyLabel = (typology: string) => {
    const labels = {
      residencial: 'Residencial',
      agricola: 'Agrícola',
      industrial: 'Industrial',
      mixto: 'Mixto',
    };
    return labels[typology as keyof typeof labels] || typology;
  };

  const formatPrice = (price: string) => {
    return `$${parseInt(price).toLocaleString('es-CL')}`;
  };

  return (
    <div className="min-h-screen bg-input-background">
      {/* Header */}
      <div className="bg-background sticky top-0 z-10" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 transition-colors hover:bg-muted rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" style={{ color: 'var(--foreground)' }} />
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--foreground)',
                lineHeight: 'var(--line-height-ui)'
              }}>
                Volver a mis publicaciones
              </span>
            </button>

            <div className="flex items-center gap-3">
              <button
                className="flex items-center gap-2 px-4 py-2 transition-colors hover:bg-muted rounded-lg"
                style={{ border: '1px solid var(--border)' }}
              >
                <Heart className="w-5 h-5" style={{ color: '#737373' }} />
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--foreground)',
                  lineHeight: 'var(--line-height-ui)'
                }}>
                  Guardar
                </span>
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 transition-colors hover:bg-muted rounded-lg"
                style={{ border: '1px solid var(--border)' }}
              >
                <Share2 className="w-5 h-5" style={{ color: '#737373' }} />
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--foreground)',
                  lineHeight: 'var(--line-height-ui)'
                }}>
                  Compartir
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Image */}
            <div className="rounded-xl overflow-hidden bg-muted" style={{ border: '1px solid var(--border)' }}>
              <div className="aspect-[16/9] relative">
                {publication.mainImage ? (
                  <img
                    src={typeof publication.mainImage === 'string' ? publication.mainImage : ''}
                    alt={publication.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Maximize2 className="w-16 h-16" style={{ color: 'var(--border)' }} />
                  </div>
                )}
              </div>
            </div>

            {/* Title & Location */}
            <div>
              <h1 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--font-size-h2)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--foreground)',
                lineHeight: 'var(--line-height-heading)',
                marginBottom: '12px'
              }}>
                {publication.title}
              </h1>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" style={{ color: '#737373' }} />
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: '#737373',
                  lineHeight: 'var(--line-height-body)'
                }}>
                  {publication.sector}, {publication.comuna}, {publication.region}
                </span>
              </div>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-background" style={{ border: '1px solid var(--border)' }}>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-xs)',
                  color: '#737373',
                  lineHeight: 'var(--line-height-ui)',
                  marginBottom: '4px'
                }}>
                  Superficie
                </div>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h4)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                  lineHeight: 'var(--line-height-heading)'
                }}>
                  {parseInt(publication.surface).toLocaleString('es-CL')} m²
                </div>
              </div>

              <div className="p-4 rounded-lg bg-background" style={{ border: '1px solid var(--border)' }}>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-xs)',
                  color: '#737373',
                  lineHeight: 'var(--line-height-ui)',
                  marginBottom: '4px'
                }}>
                  Tipología
                </div>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h4)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                  lineHeight: 'var(--line-height-heading)'
                }}>
                  {getTypologyLabel(publication.typology)}
                </div>
              </div>

              {publication.lotNumber && (
                <div className="p-4 rounded-lg bg-background" style={{ border: '1px solid var(--border)' }}>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    color: '#737373',
                    lineHeight: 'var(--line-height-ui)',
                    marginBottom: '4px'
                  }}>
                    Lote
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--font-size-h4)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--foreground)',
                    lineHeight: 'var(--line-height-heading)'
                  }}>
                    {publication.lotNumber}
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            {publication.description && (
              <div className="p-6 rounded-xl bg-background" style={{ border: '1px solid var(--border)' }}>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h4)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--foreground)',
                  lineHeight: 'var(--line-height-heading)',
                  marginBottom: '12px'
                }}>
                  Descripción
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: 'var(--line-height-body)',
                  whiteSpace: 'pre-wrap'
                }}>
                  {publication.description}
                </p>
              </div>
            )}

            {/* Características */}
            <div className="p-6 rounded-xl bg-background" style={{ border: '1px solid var(--border)' }}>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--font-size-h4)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)',
                lineHeight: 'var(--line-height-heading)',
                marginBottom: '16px'
              }}>
                Características
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: publication.hasApprovedRole ? '#166534' : '#D4D4D4' }} />
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--foreground)',
                      lineHeight: 'var(--line-height-ui)'
                    }}>
                      Rol aprobado
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-xs)',
                      color: '#737373',
                      lineHeight: 'var(--line-height-ui)'
                    }}>
                      {publication.hasApprovedRole ? 'Sí' : 'No'}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: publication.readyForDeed ? '#166534' : '#D4D4D4' }} />
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--foreground)',
                      lineHeight: 'var(--line-height-ui)'
                    }}>
                      Lista para escriturar
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-xs)',
                      color: '#737373',
                      lineHeight: 'var(--line-height-ui)'
                    }}>
                      {publication.readyForDeed ? 'Sí' : 'No'}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: publication.roadExecuted ? '#166534' : '#D4D4D4' }} />
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--foreground)',
                      lineHeight: 'var(--line-height-ui)'
                    }}>
                      Camino ejecutado
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-xs)',
                      color: '#737373',
                      lineHeight: 'var(--line-height-ui)'
                    }}>
                      {publication.roadExecuted ? 'Sí' : 'No'}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: publication.hasGate ? '#166534' : '#D4D4D4' }} />
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--foreground)',
                      lineHeight: 'var(--line-height-ui)'
                    }}>
                      Portón de acceso
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-xs)',
                      color: '#737373',
                      lineHeight: 'var(--line-height-ui)'
                    }}>
                      {publication.hasGate ? 'Sí' : 'No'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="p-6 rounded-xl bg-background" style={{ border: '1px solid var(--border)' }}>
                {/* Price */}
                <div className="mb-6">
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    color: '#737373',
                    lineHeight: 'var(--line-height-ui)',
                    marginBottom: '4px'
                  }}>
                    {publication.priceType === 'from' ? 'Desde' : 'Precio'}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--font-size-h2)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--foreground)',
                    lineHeight: 'var(--line-height-heading)'
                  }}>
                    {formatPrice(publication.price)}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <button
                    className="w-full px-6 py-3 transition-all"
                    style={{
                      backgroundColor: '#111',
                      color: '#FFFFFF',
                      borderRadius: '200px',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      letterSpacing: 'var(--letter-spacing-wide)',
                      lineHeight: 'var(--line-height-ui)'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#6B6B6B'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#111'; }}
                  >
                    Contactar
                  </button>
                  <button
                    className="w-full px-6 py-3 transition-all"
                    style={{
                      backgroundColor: '#FFFFFF',
                      color: 'var(--foreground)',
                      border: '2px solid #DEDEDE',
                      borderRadius: '200px',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      letterSpacing: 'var(--letter-spacing-wide)',
                      lineHeight: 'var(--line-height-ui)'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
                  >
                    Agendar visita
                  </button>
                </div>

                {/* Publisher Info */}
                <div className="mt-6 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    color: '#737373',
                    lineHeight: 'var(--line-height-ui)',
                    marginBottom: '8px'
                  }}>
                    Publicado por
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F5F5F5' }}>
                      <Home className="w-6 h-6" style={{ color: '#737373' }} />
                    </div>
                    <div>
                      <div style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: 'var(--foreground)',
                        lineHeight: 'var(--line-height-ui)'
                      }}>
                        {publication.publisherType === 'inmobiliaria' ? 'Inmobiliaria' : publication.publisherType === 'broker' ? 'Broker' : 'Vendedor particular'}
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-xs)',
                        color: '#737373',
                        lineHeight: 'var(--line-height-ui)'
                      }}>
                        Verificado
                      </div>
                    </div>
                  </div>
                </div>

                {/* Safety Notice */}
                <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: '#FEF3C7', border: '1px solid #FCD34D' }}>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    color: '#92400E',
                    lineHeight: 'var(--line-height-ui)'
                  }}>
                    💡 <strong>Tip de seguridad:</strong> Nunca transfieras dinero antes de visitar la propiedad y verificar la documentación.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}