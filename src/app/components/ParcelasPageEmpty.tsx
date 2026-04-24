import React, { useState } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import { Navbar } from '@/app/components/Navbar';
import logo from 'figma:asset/a4719ce43ce52ee49df30a2a5c090c8a8b743667.png';
import heroBackground from 'figma:asset/46be9646c60608d21a829a86b189efb4cfc6cbbc.png';

interface ParcelasPageEmptyProps {
  onNavigate: (screen: string) => void;
}

export function ParcelasPageEmpty({ onNavigate }: ParcelasPageEmptyProps) {
  const [heroFilters, setHeroFilters] = useState({
    ubicacion: '',
    tipo: '',
    superficieMin: '',
    condicion: '',
    precioMin: ''
  });

  return (
    <div className="min-h-screen relative">
      {/* Navbar */}
      <Navbar 
        onNavigate={onNavigate}
        estado="visitante"
        onShowPublishModal={() => {}}
      />

      {/* Main Content - with padding for fixed header */}
      <main className="relative pt-28" style={{ backgroundColor: 'var(--hero-background)' }}>
        {/* Hero Section + Buscador */}
        <section className="relative py-32 pb-52 overflow-hidden" style={{ backgroundColor: 'var(--hero-background)' }}>
          {/* Background image */}
          <img 
            src={heroBackground}
            alt="Campos rurales"
            className="absolute inset-0 w-full h-full object-cover opacity-[0.15] select-none pointer-events-none"
            style={{
              filter: 'grayscale(100%)',
              mixBlendMode: 'multiply'
            }}
          />
          
          {/* Overlay gradient */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(250,250,250,0) 0%, rgba(250,250,250,0.8) 80%, rgba(250,250,250,1) 100%)'
            }}
          />

          <div className="relative max-w-7xl mx-auto px-6 z-10">
            {/* Título */}
            <div className="mb-12">
              <h1 
                className="mb-4" 
                style={{ 
                  color: '#0A0A0A',
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h1)',
                  fontWeight: 'var(--font-weight-semibold)',
                  lineHeight: '1.1',
                  letterSpacing: '-0.02em'
                }}
              >
                Parcelas en venta
              </h1>
              <p 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-lg)',
                  fontWeight: 'var(--font-weight-light)',
                  lineHeight: '1.6',
                  maxWidth: '600px',
                  color: '#0A0A0A'
                }}
              >
                Encuentra parcelas verificadas con información clara para tomar decisiones seguras
              </p>
            </div>

            {/* Buscador */}
            <div className="mb-12 bg-white p-8 w-full shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-[24px] border-2 border-gray-200">
              <div className="flex flex-wrap items-end gap-4">
                <div className="space-y-2.5">
                  <label 
                    className="block text-left pl-3 text-gray-700" 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontWeight: 'var(--font-weight-medium)' 
                    }}
                  >
                    Ubicación
                  </label>
                  <div className="relative">
                    <select 
                      value={heroFilters.ubicacion}
                      onChange={(e) => setHeroFilters(prev => ({ ...prev, ubicacion: e.target.value }))}
                      className="bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-9 py-2 text-sm text-gray-900 rounded-[100px] focus:outline-none transition-all duration-200 cursor-pointer h-[40px] shadow-sm hover:shadow-md w-[155px] appearance-none" 
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        fontWeight: 'var(--font-weight-regular)', 
                        lineHeight: '1.5' 
                      }}
                    >
                      <option value="">Todos</option>
                      <option value="aysen">Aysén</option>
                      <option value="metropolitana">Región Metropolitana</option>
                      <option value="valparaiso">Valparaíso</option>
                      <option value="biobio">Biobío</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label 
                    className="block text-left pl-3 text-gray-700" 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontWeight: 'var(--font-weight-medium)' 
                    }}
                  >
                    Tipo
                  </label>
                  <div className="relative">
                    <select 
                      value={heroFilters.tipo}
                      onChange={(e) => setHeroFilters(prev => ({ ...prev, tipo: e.target.value }))}
                      className="bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-9 py-2 text-sm text-gray-900 rounded-[100px] focus:outline-none transition-all duration-200 cursor-pointer h-[40px] shadow-sm hover:shadow-md w-[125px] appearance-none" 
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        fontWeight: 'var(--font-weight-regular)', 
                        lineHeight: '1.5' 
                      }}
                    >
                      <option value="">Todos</option>
                      <option value="parcelas">Parcelas</option>
                      <option value="proyectos">Proyectos</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label 
                    className="block text-left pl-3 text-gray-700" 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontWeight: 'var(--font-weight-medium)' 
                    }}
                  >
                    Superficie
                  </label>
                  <div className="relative">
                    <select 
                      value={heroFilters.superficieMin}
                      onChange={(e) => setHeroFilters(prev => ({ ...prev, superficieMin: e.target.value }))}
                      className="bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-9 py-2 text-sm text-gray-900 rounded-[100px] focus:outline-none transition-all duration-200 cursor-pointer h-[40px] shadow-sm hover:shadow-md w-[155px] appearance-none" 
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        fontWeight: 'var(--font-weight-regular)', 
                        lineHeight: '1.5' 
                      }}
                    >
                      <option value="">Todos</option>
                      <option value="0-5000">Hasta 5.000 m²</option>
                      <option value="5000-10000">5.000 - 10.000 m²</option>
                      <option value="10000-50000">1 - 5 hectáreas</option>
                      <option value="50000-100000">5 - 10 hectáreas</option>
                      <option value="100000-500000">10 - 50 hectáreas</option>
                      <option value="500000+">Más de 50 hectáreas</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label 
                    className="block text-left pl-3 text-gray-700" 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontWeight: 'var(--font-weight-medium)' 
                    }}
                  >
                    Condición
                  </label>
                  <div className="relative">
                    <select 
                      value={heroFilters.condicion}
                      onChange={(e) => setHeroFilters(prev => ({ ...prev, condicion: e.target.value }))}
                      className="bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-9 py-2 text-sm text-gray-900 rounded-[100px] focus:outline-none transition-all duration-200 cursor-pointer h-[40px] shadow-sm hover:shadow-md w-[130px] appearance-none" 
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        fontWeight: 'var(--font-weight-regular)', 
                        lineHeight: '1.5' 
                      }}
                    >
                      <option value="">Todos</option>
                      <option value="nuevo">Nuevo</option>
                      <option value="usado">Usado</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label 
                    className="block text-left pl-3 text-gray-700" 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontWeight: 'var(--font-weight-medium)' 
                    }}
                  >
                    Rango de precio
                  </label>
                  <div className="relative">
                    <select 
                      value={heroFilters.precioMin}
                      onChange={(e) => setHeroFilters(prev => ({ ...prev, precioMin: e.target.value }))}
                      className="bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-9 py-2 text-sm text-gray-900 rounded-[100px] focus:outline-none transition-all duration-200 cursor-pointer h-[40px] shadow-sm hover:shadow-md w-[165px] appearance-none" 
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        fontWeight: 'var(--font-weight-regular)', 
                        lineHeight: '1.5' 
                      }}
                    >
                      <option value="">Todos</option>
                      <option value="0-10000000">Hasta $10.000.000</option>
                      <option value="10000000-30000000">$10M - $30M</option>
                      <option value="30000000-50000000">$30M - $50M</option>
                      <option value="50000000-100000000">$50M - $100M</option>
                      <option value="100000000-200000000">$100M - $200M</option>
                      <option value="200000000+">Más de $200M</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="h-[20px]"></div>
                  <button 
                    className="bg-[#006B4E] hover:bg-[#0d3640] text-white px-[18px] h-[40px] text-sm leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center whitespace-nowrap"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Buscar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Empty State Section */}
        <section className="bg-white py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
              {/* Ícono */}
              <div className="mb-8">
                <MapPin 
                  size={80} 
                  style={{ color: 'var(--color-muted-foreground)' }}
                  strokeWidth={1.5}
                />
              </div>
              
              {/* Título */}
              <h2 
                className="mb-4"
                style={{ 
                  color: '#0A0A0A',
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h2)',
                  fontWeight: 'var(--font-weight-medium)'
                }}
              >
                No hay parcelas disponibles en este momento
              </h2>
              
              {/* Texto descriptivo */}
              <p 
                className="mb-10"
                style={{ 
                  color: '#737373',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-lg)',
                  lineHeight: 'var(--line-height-body)',
                  maxWidth: '540px'
                }}
              >
                Por ahora no hay publicaciones activas. Puedes volver más tarde o explorar otras opciones.
              </p>
              
              {/* Botón primario */}
              <button
                onClick={() => onNavigate('home')}
                className="h-12 px-8 text-base leading-[1.5] font-medium rounded-[200px] transition-colors shadow-sm"
                style={{ 
                  fontFamily: 'var(--font-body)',
                  backgroundColor: '#006B4E',
                  color: '#FFFFFF'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0D3640'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
              >
                Volver al inicio
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}