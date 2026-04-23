import React, { useState } from 'react';
import { TrendingDown, Info } from 'lucide-react';
import { AdminFiltrosAnalytics } from '@/app/components/AdminFiltrosAnalytics';

export function AdminEmbudoView() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Datos del embudo
  const embudoData = [
    { 
      etapa: 'Visitas', 
      cantidad: 12458,
      conversion: null,
      caida: 0
    },
    { 
      etapa: 'Contactos', 
      cantidad: 847,
      conversion: 6.8,
      caida: 93.2
    },
    { 
      etapa: 'Reservas', 
      cantidad: 124,
      conversion: 14.6,
      caida: 85.4
    },
    { 
      etapa: 'Ventas', 
      cantidad: 42,
      conversion: 33.9,
      caida: 66.1
    }
  ];

  // Identificar mayor caída
  const mayorCaidaIndex = embudoData.reduce((maxIndex, item, index) => {
    if (index === 0) return maxIndex;
    return item.caida > embudoData[maxIndex].caida ? index : maxIndex;
  }, 1);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Módulo principal: Proceso de conversión */}
      <section
        className="rounded-2xl p-8"
        style={{
          backgroundColor: 'var(--background)',
          border: '1px solid var(--border)',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
        }}
      >
        <div className="mb-8">
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--font-size-h3)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--foreground)',
              lineHeight: 'var(--line-height-heading)',
              letterSpacing: 'var(--letter-spacing-normal)',
              marginBottom: '8px'
            }}
          >
            Proceso de conversión
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-sm)',
              fontWeight: 'var(--font-weight-regular)',
              color: 'var(--muted-foreground)',
              lineHeight: 'var(--line-height-body)',
              letterSpacing: 'var(--letter-spacing-normal)'
            }}
          >
            Visualización del embudo de conversión desde visitas hasta ventas
          </p>
        </div>

        {/* Embudo visual alineado a la derecha */}
        <div className="flex flex-col gap-2.5 items-end">
          {embudoData.map((etapa, index) => {
            const isMayorCaida = index === mayorCaidaIndex;
            const isHovered = hoveredIndex === index;
            
            // Calcular el ancho del embudo de forma proporcional
            const anchoMax = 100;
            const anchoMin = 45;
            const anchoEtapa = anchoMax - ((anchoMax - anchoMin) * (index / (embudoData.length - 1)));
            
            return (
              <div key={index} className="w-full flex justify-end">
                <div 
                  className="relative"
                  style={{ width: `${anchoEtapa}%` }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Card de la etapa del embudo */}
                  <div
                    className="rounded-2xl p-6 transition-all"
                    style={{
                      backgroundColor: isMayorCaida ? 'rgba(0, 71, 186, 0.02)' : 'var(--background)',
                      border: `1px solid ${isMayorCaida ? 'var(--primary)' : 'var(--border)'}`,
                      boxShadow: isHovered ? '0 4px 8px 0 rgba(0, 0, 0, 0.08)' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                      minHeight: '130px'
                    }}
                  >
                    {/* Header: título y badge de conversión */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <h3
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 'var(--font-weight-medium)',
                            color: '#6B6B6B',
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                            lineHeight: '1.2'
                          }}
                        >
                          {etapa.etapa}
                        </h3>
                        {isMayorCaida && (
                          <div
                            className="rounded-full px-2 py-0.5 flex items-center gap-1"
                            style={{
                              backgroundColor: 'var(--primary)',
                            }}
                          >
                            <TrendingDown 
                              className="w-2.5 h-2.5 flex-shrink-0" 
                              style={{ color: 'var(--primary-foreground)' }} 
                            />
                            <span
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '10px',
                                fontWeight: 'var(--font-weight-semibold)',
                                color: 'var(--primary-foreground)',
                                letterSpacing: 'var(--letter-spacing-normal)',
                                lineHeight: '1'
                              }}
                            >
                              Crítica
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {/* Badge de conversión */}
                      <div className="flex items-center gap-1.5">
                        {etapa.conversion !== null && (
                          <div
                            className="flex items-center gap-1 px-2.5 py-1 rounded-full"
                            style={{
                              backgroundColor: '#DCFCE7'
                            }}
                          >
                            <span
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '11px',
                                fontWeight: 'var(--font-weight-semibold)',
                                color: '#16A34A',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              +{etapa.conversion}%
                            </span>
                          </div>
                        )}
                        {index > 0 && (
                          <Info 
                            className="w-4 h-4 flex-shrink-0" 
                            style={{ color: 'var(--muted-foreground)', opacity: 0.5 }}
                          />
                        )}
                      </div>
                    </div>
                    
                    {/* Número principal - mismo tamaño que KPIs */}
                    <div className="flex items-baseline gap-2">
                      <p
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '40px',
                          fontWeight: 'var(--font-weight-light)',
                          color: 'var(--foreground)',
                          lineHeight: '1',
                          marginTop: 'auto'
                        }}
                      >
                        {etapa.cantidad.toLocaleString('es-CL')}
                      </p>
                    </div>
                  </div>

                  {/* Tooltip con información secundaria - aparece en hover */}
                  {isHovered && index > 0 && (
                    <div
                      className="absolute left-0 top-full mt-2 rounded-xl px-4 py-3 z-10"
                      style={{
                        backgroundColor: 'var(--foreground)',
                        border: '1px solid var(--border)',
                        boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.12)',
                        minWidth: '280px'
                      }}
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--font-size-xs)',
                              fontWeight: 'var(--font-weight-regular)',
                              color: 'var(--background)',
                              letterSpacing: 'var(--letter-spacing-normal)',
                              lineHeight: 'var(--line-height-ui)'
                            }}
                          >
                            Pérdida desde etapa anterior
                          </span>
                          <span
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--font-size-xs)',
                              fontWeight: 'var(--font-weight-semibold)',
                              color: 'var(--background)',
                              letterSpacing: 'var(--letter-spacing-normal)',
                              lineHeight: 'var(--line-height-ui)'
                            }}
                          >
                            -{etapa.caida.toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--font-size-xs)',
                              fontWeight: 'var(--font-weight-regular)',
                              color: 'var(--background)',
                              letterSpacing: 'var(--letter-spacing-normal)',
                              lineHeight: 'var(--line-height-ui)'
                            }}
                          >
                            Usuarios perdidos
                          </span>
                          <span
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--font-size-xs)',
                              fontWeight: 'var(--font-weight-semibold)',
                              color: 'var(--background)',
                              letterSpacing: 'var(--letter-spacing-normal)',
                              lineHeight: 'var(--line-height-ui)'
                            }}
                          >
                            {(embudoData[index - 1].cantidad - etapa.cantidad).toLocaleString('es-CL')}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Resumen ejecutivo - estilo unificado */}
        <div 
          className="mt-8 rounded-2xl p-6"
          style={{
            backgroundColor: 'var(--input-background)',
            border: '1px solid var(--border)',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#6B6B6B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  lineHeight: '1.2'
                }}
              >
                Conversión total
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h3)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--foreground)',
                  lineHeight: 'var(--line-height-heading)',
                  letterSpacing: 'var(--letter-spacing-normal)'
                }}
              >
                {((embudoData[embudoData.length - 1].cantidad / embudoData[0].cantidad) * 100).toFixed(2)}%
              </span>
            </div>
            
            <div 
              style={{
                width: '1px',
                height: '40px',
                backgroundColor: 'var(--border)'
              }}
            />
            
            <div className="flex flex-col gap-1">
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#6B6B6B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  lineHeight: '1.2'
                }}
              >
                Flujo completo
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h3)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--foreground)',
                  lineHeight: 'var(--line-height-heading)',
                  letterSpacing: 'var(--letter-spacing-normal)'
                }}
              >
                {embudoData[0].cantidad.toLocaleString('es-CL')} → {embudoData[embudoData.length - 1].cantidad}
              </span>
            </div>
            
            <div 
              style={{
                width: '1px',
                height: '40px',
                backgroundColor: 'var(--border)'
              }}
            />
            
            <div className="flex flex-col gap-1">
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#6B6B6B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  lineHeight: '1.2'
                }}
              >
                Etapa crítica
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h3)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--foreground)',
                  lineHeight: 'var(--line-height-heading)',
                  letterSpacing: 'var(--letter-spacing-normal)'
                }}
              >
                {embudoData[mayorCaidaIndex].etapa}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Módulo de filtros de búsqueda integrado */}
      <AdminFiltrosAnalytics />
    </div>
  );
}
