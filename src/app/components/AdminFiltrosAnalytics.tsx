import React, { useState } from 'react';

interface FiltroData {
  nombre: string;
  cantidad: number;
  porcentaje: number;
}

export function AdminFiltrosAnalytics() {
  const [activeTab, setActiveTab] = useState<'ubicacion' | 'region' | 'tipo' | 'precio'>('ubicacion');

  // Datos de ejemplo para cada categoría
  const datosUbicacion: FiltroData[] = [
    { nombre: 'Cajón del Maipo', cantidad: 3847, porcentaje: 28.5 },
    { nombre: 'Pucón', cantidad: 2914, porcentaje: 21.6 },
    { nombre: 'Villarrica', cantidad: 2156, porcentaje: 16.0 },
    { nombre: 'Puerto Varas', cantidad: 1823, porcentaje: 13.5 },
    { nombre: 'Olmué', cantidad: 1547, porcentaje: 11.5 },
    { nombre: 'San José de Maipo', cantidad: 1204, porcentaje: 8.9 }
  ];

  const datosRegion: FiltroData[] = [
    { nombre: 'Región Metropolitana', cantidad: 4523, porcentaje: 33.5 },
    { nombre: 'Región de La Araucanía', cantidad: 3214, porcentaje: 23.8 },
    { nombre: 'Región de Los Lagos', cantidad: 2847, porcentaje: 21.1 },
    { nombre: 'Región de Valparaíso', cantidad: 1956, porcentaje: 14.5 },
    { nombre: "Región de O'Higgins", cantidad: 954, porcentaje: 7.1 }
  ];

  const datosTipo: FiltroData[] = [
    { nombre: 'Parcela de agrado', cantidad: 5847, porcentaje: 43.3 },
    { nombre: 'Terreno rural', cantidad: 3214, porcentaje: 23.8 },
    { nombre: 'Parcela con casa', cantidad: 2456, porcentaje: 18.2 },
    { nombre: 'Sitio en condominio', cantidad: 1324, porcentaje: 9.8 },
    { nombre: 'Fundo', cantidad: 653, porcentaje: 4.8 }
  ];

  const datosPrecio: FiltroData[] = [
    { nombre: '$30M - $50M', cantidad: 4123, porcentaje: 30.5 },
    { nombre: '$50M - $80M', cantidad: 3547, porcentaje: 26.3 },
    { nombre: '$20M - $30M', cantidad: 2814, porcentaje: 20.9 },
    { nombre: '$80M - $120M', cantidad: 1956, porcentaje: 14.5 },
    { nombre: 'Más de $120M', cantidad: 1054, porcentaje: 7.8 }
  ];

  const obtenerDatos = () => {
    switch (activeTab) {
      case 'ubicacion': return datosUbicacion;
      case 'region': return datosRegion;
      case 'tipo': return datosTipo;
      case 'precio': return datosPrecio;
    }
  };

  const datos = obtenerDatos();
  const maxCantidad = Math.max(...datos.map(d => d.cantidad));

  const tabs = [
    { id: 'ubicacion' as const, label: 'Ubicación/Comuna' },
    { id: 'region' as const, label: 'Región' },
    { id: 'tipo' as const, label: 'Tipo de propiedad' },
    { id: 'precio' as const, label: 'Rango de precio' }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Módulo principal */}
      <section
        className="rounded-2xl p-8"
        style={{
          backgroundColor: 'var(--background)',
          border: '1px solid var(--border)',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
        }}
      >
        {/* Header */}
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
            Tendencias de búsqueda
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
            Filtros más utilizados por los usuarios al buscar propiedades
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-4 py-2.5 rounded-full transition-all"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                fontWeight: 'var(--font-weight-medium)',
                color: activeTab === tab.id ? 'var(--primary-foreground)' : 'var(--foreground)',
                backgroundColor: activeTab === tab.id ? 'var(--primary)' : 'var(--background)',
                border: `1px solid ${activeTab === tab.id ? 'var(--primary)' : 'var(--border)'}`,
                lineHeight: 'var(--line-height-ui)',
                letterSpacing: 'var(--letter-spacing-normal)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = '#FAFAFA';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = 'var(--background)';
                }
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Rankings con barras horizontales */}
        <div className="space-y-4">
          {datos.map((item, index) => (
            <div
              key={index}
              className="rounded-xl p-5"
              style={{
                backgroundColor: 'var(--input-background)',
                border: '1px solid var(--border)',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
              }}
            >
              {/* Header del item */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {/* Número de ranking */}
                  <div
                    className="flex items-center justify-center rounded-full"
                    style={{
                      width: '32px',
                      height: '32px',
                      backgroundColor: index < 3 ? 'var(--primary)' : 'var(--muted)',
                      flexShrink: 0
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: index < 3 ? 'var(--primary-foreground)' : 'var(--foreground)',
                        lineHeight: '1'
                      }}
                    >
                      {index + 1}
                    </span>
                  </div>

                  {/* Nombre del filtro */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-body-base)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--foreground)',
                      lineHeight: 'var(--line-height-heading)',
                      letterSpacing: 'var(--letter-spacing-normal)'
                    }}
                  >
                    {item.nombre}
                  </h3>
                </div>

                {/* Estadísticas */}
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-xs)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#6B6B6B',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        lineHeight: '1.2',
                        marginBottom: '4px'
                      }}
                    >
                      Búsquedas
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'var(--font-size-h4)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: 'var(--foreground)',
                        lineHeight: '1'
                      }}
                    >
                      {item.cantidad.toLocaleString('es-CL')}
                    </p>
                  </div>

                  <div className="text-right">
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-xs)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#6B6B6B',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        lineHeight: '1.2',
                        marginBottom: '4px'
                      }}
                    >
                      Porcentaje
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'var(--font-size-h4)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: 'var(--foreground)',
                        lineHeight: '1'
                      }}
                    >
                      {item.porcentaje}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Barra de progreso */}
              <div
                className="rounded-full overflow-hidden"
                style={{
                  height: '8px',
                  backgroundColor: 'var(--muted)'
                }}
              >
                <div
                  className="rounded-full transition-all duration-500"
                  style={{
                    height: '100%',
                    width: `${(item.cantidad / maxCantidad) * 100}%`,
                    backgroundColor: index < 3 ? 'var(--primary)' : '#737373'
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Resumen final */}
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
                Total de búsquedas
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
                {datos.reduce((sum, item) => sum + item.cantidad, 0).toLocaleString('es-CL')}
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
                Filtro más popular
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
                {datos[0].nombre}
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
                Categoría activa
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
                {tabs.find(t => t.id === activeTab)?.label}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
