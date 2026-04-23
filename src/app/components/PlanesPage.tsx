import React, { useState } from 'react';
import { ChevronLeft, Check, X } from 'lucide-react';
import logo from 'figma:asset/a4719ce43ce52ee49df30a2a5c090c8a8b743667.png';

interface PlanesPageProps {
  onNavigate: (screen: string) => void;
  isLoggedIn?: boolean;
  currentUser?: { name: string; email: string } | null;
  onLogout?: () => void;
}

export function PlanesPage({ onNavigate, isLoggedIn = false, currentUser, onLogout }: PlanesPageProps) {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  const planes = [
    {
      nombre: 'Básico',
      descripcion: 'Ideal para comenzar a publicar parcelas',
      precioMensual: 29900,
      precioAnual: 299000,
      destacado: false,
      caracteristicas: [
        { incluido: true, texto: 'Hasta 5 publicaciones activas' },
        { incluido: true, texto: 'Panel de gestión básico' },
        { incluido: true, texto: 'Soporte por email' },
        { incluido: true, texto: 'Estadísticas básicas' },
        { incluido: false, texto: 'Gestión de equipo' },
        { incluido: false, texto: 'Publicaciones destacadas' },
        { incluido: false, texto: 'API de integración' },
        { incluido: false, texto: 'Soporte prioritario' }
      ]
    },
    {
      nombre: 'Profesional',
      descripcion: 'Para inmobiliarias en crecimiento',
      precioMensual: 69900,
      precioAnual: 699000,
      destacado: true,
      caracteristicas: [
        { incluido: true, texto: 'Hasta 20 publicaciones activas' },
        { incluido: true, texto: 'Panel de gestión avanzado' },
        { incluido: true, texto: 'Soporte prioritario' },
        { incluido: true, texto: 'Estadísticas avanzadas' },
        { incluido: true, texto: 'Gestión de equipo (hasta 5 usuarios)' },
        { incluido: true, texto: '3 publicaciones destacadas/mes' },
        { incluido: false, texto: 'API de integración' },
        { incluido: false, texto: 'Asesor dedicado' }
      ]
    },
    {
      nombre: 'Enterprise',
      descripcion: 'Para grandes inmobiliarias',
      precioMensual: 149900,
      precioAnual: 1499000,
      destacado: false,
      caracteristicas: [
        { incluido: true, texto: 'Publicaciones ilimitadas' },
        { incluido: true, texto: 'Panel personalizado' },
        { incluido: true, texto: 'Soporte 24/7' },
        { incluido: true, texto: 'Analytics empresarial' },
        { incluido: true, texto: 'Usuarios ilimitados' },
        { incluido: true, texto: 'Publicaciones destacadas ilimitadas' },
        { incluido: true, texto: 'API de integración' },
        { incluido: true, texto: 'Asesor dedicado' }
      ]
    }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: 'var(--hero-background)' }}>
      {/* Header */}
      <header className="fixed top-8 left-0 right-0 z-50" style={{ backgroundColor: 'var(--hero-background)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-0">
              <img
                src={logo}
                alt="CompraTuParcela"
                className="h-14 cursor-pointer"
                onClick={() => onNavigate('home')}
              />

              <nav className="flex items-center justify-center gap-0 whitespace-nowrap">
                <button onClick={() => onNavigate('parcelas')} className="h-8 px-4 text-sm leading-[1.5] font-normal text-black hover:bg-[#efefef] hover:text-[#303030] rounded-[200px] transition-colors whitespace-nowrap flex items-center justify-center">Parcelas</button>
                <button onClick={() => onNavigate('inmobiliarias')} className="h-8 px-4 text-sm leading-[1.5] font-normal text-black hover:bg-[#efefef] hover:text-[#303030] rounded-[200px] transition-colors whitespace-nowrap flex items-center justify-center">Inmobiliarias</button>
                <button onClick={() => onNavigate('como-funciona')} className="h-8 px-4 text-sm leading-[1.5] font-normal text-black hover:bg-[#efefef] hover:text-[#303030] rounded-[200px] transition-colors whitespace-nowrap flex items-center justify-center">Cómo funciona</button>
                <button onClick={() => onNavigate('recursos')} className="h-8 px-4 text-sm leading-[1.5] font-normal text-black hover:bg-[#efefef] hover:text-[#303030] rounded-[200px] transition-colors whitespace-nowrap flex items-center justify-center">Recursos</button>
              </nav>
            </div>

            <div className="flex items-center justify-end gap-3">
              {isLoggedIn && currentUser ? (
                <>
                  <span className="text-sm" style={{ color: '#6B6B6B' }}>
                    {currentUser.name}
                  </span>
                  <button
                    onClick={onLogout}
                    className="h-8 bg-[#efefef] text-black px-[20px] text-sm leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center py-[0px] hover:bg-[#dedede] hover:text-[#303030]"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <button
                    style={{ backgroundColor: '#124854' }}
                    className="h-8 text-white px-[20px] text-sm leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center py-[0px]"
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0D3640'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#124854'}
                  >
                    Publicar propiedad
                  </button>
                  <button
                    onClick={() => onNavigate('entry')}
                    className="h-8 bg-[#efefef] text-black px-[20px] text-sm leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center py-[0px] hover:bg-[#dedede] hover:text-[#303030]"
                  >
                    Iniciar sesión
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Botón volver */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 mb-6 text-sm hover:underline"
            style={{ color: 'var(--foreground)' }}
          >
            <ChevronLeft className="w-4 h-4" />
            Volver al inicio
          </button>

          {/* Encabezado */}
          <div className="text-center mb-12">
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--font-size-h1)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--foreground)',
                marginBottom: '1rem'
              }}
            >
              Planes para Inmobiliarias
            </h1>
            <p className="text-lg" style={{ color: '#6B6B6B', maxWidth: '700px', margin: '0 auto' }}>
              Elige el plan que mejor se adapte a tu negocio y comienza a publicar tus parcelas
            </p>

            {/* Selector de período */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className="px-6 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                  backgroundColor: billingPeriod === 'monthly' ? '#124854' : '#efefef',
                  color: billingPeriod === 'monthly' ? 'white' : '#0A0A0A'
                }}
              >
                Mensual
              </button>
              <button
                onClick={() => setBillingPeriod('annual')}
                className="px-6 py-2 rounded-full text-sm font-medium transition-all relative"
                style={{
                  backgroundColor: billingPeriod === 'annual' ? '#124854' : '#efefef',
                  color: billingPeriod === 'annual' ? 'white' : '#0A0A0A'
                }}
              >
                Anual
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                  -17%
                </span>
              </button>
            </div>
          </div>

          {/* Planes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {planes.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-3xl p-8 shadow-sm relative transition-all ${
                  plan.destacado ? 'ring-2 ring-[#124854] scale-105' : ''
                }`}
              >
                {plan.destacado && (
                  <div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-sm font-medium"
                    style={{ backgroundColor: '#124854', color: 'white' }}
                  >
                    Más popular
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-h3)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--foreground)',
                      marginBottom: '0.5rem'
                    }}
                  >
                    {plan.nombre}
                  </h3>
                  <p style={{ color: '#6B6B6B', fontSize: '0.875rem' }}>{plan.descripcion}</p>
                </div>

                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center gap-2">
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '2.5rem',
                        fontWeight: 'var(--font-weight-medium)',
                        color: 'var(--foreground)'
                      }}
                    >
                      {formatCurrency(billingPeriod === 'monthly' ? plan.precioMensual : plan.precioAnual)}
                    </span>
                  </div>
                  <p style={{ color: '#6B6B6B', fontSize: '0.875rem' }}>
                    {billingPeriod === 'monthly' ? 'por mes' : 'por año'}
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.caracteristicas.map((caracteristica, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      {caracteristica.incluido ? (
                        <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#10B981' }} />
                      ) : (
                        <X className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#D1D5DB' }} />
                      )}
                      <span
                        style={{
                          color: caracteristica.incluido ? 'var(--foreground)' : '#9CA3AF',
                          fontSize: '0.875rem'
                        }}
                      >
                        {caracteristica.texto}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className="w-full py-3 rounded-full text-sm font-medium transition-all"
                  style={{
                    backgroundColor: plan.destacado ? '#124854' : '#efefef',
                    color: plan.destacado ? 'white' : '#0A0A0A'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = plan.destacado ? '#0D3640' : '#dedede';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = plan.destacado ? '#124854' : '#efefef';
                  }}
                  onClick={() => onNavigate('entry')}
                >
                  Comenzar ahora
                </button>
              </div>
            ))}
          </div>

          {/* Información adicional */}
          <div className="mt-16 text-center">
            <div className="bg-white rounded-3xl p-8 max-w-4xl mx-auto">
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h3)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--foreground)',
                  marginBottom: '1rem'
                }}
              >
                ¿Necesitas un plan personalizado?
              </h3>
              <p className="mb-6" style={{ color: '#6B6B6B' }}>
                Si tienes necesidades específicas o manejas un gran volumen de propiedades, contáctanos para crear un plan a medida.
              </p>
              <button
                className="px-8 py-3 rounded-full text-sm font-medium transition-all"
                style={{ backgroundColor: '#124854', color: 'white' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0D3640'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#124854'}
              >
                Contactar a ventas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
