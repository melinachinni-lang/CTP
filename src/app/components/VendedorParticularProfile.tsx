import React, { useState } from 'react';
import { ChevronLeft, MapPin, Phone, Mail, CheckCircle, Shield, FileCheck, Clock, User, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { getAllParcelas } from '@/app/data/parcelasData';
import { ParcelaCard } from '@/app/components/ParcelaCard';
import { Tabs } from '@/app/components/Tabs';
import logo from 'figma:asset/a4719ce43ce52ee49df30a2a5c090c8a8b743667.png';

interface VendedorParticularProfileProps {
  onNavigate: (screen: string, id?: number, data?: string) => void;
  vendedorName: string;
}

export function VendedorParticularProfile({ onNavigate, vendedorName }: VendedorParticularProfileProps) {
  const [activeTab, setActiveTab] = useState('sobre');

  const parcelasPublicadas = getAllParcelas().filter(
    parcela => parcela.inmobiliaria.nombre === vendedorName
  );

  const vendedor = parcelasPublicadas[0]?.inmobiliaria;

  if (!vendedor) {
    return (
      <div className="min-h-screen bg-input-background flex items-center justify-center">
        <div className="text-center">
          <h2>Vendedor no encontrado</h2>
          <p style={{ marginBottom: '2rem', marginTop: '1rem' }}>
            No se encontraron datos para "{vendedorName}"
          </p>
          <button 
            onClick={() => onNavigate('home')}
            style={{ backgroundColor: '#006B4E' }}
            className="h-10 text-white px-8 text-sm leading-[1.5] font-medium rounded-[200px] transition-colors inline-flex items-center justify-center"
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0D3640'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const profileData = {
    ubicacion: parcelasPublicadas[0]?.ubicacion || 'Aysén',
    tiempoPlataforma: '3 meses',
    sobre: vendedor.descripcion || 'Persona natural publicando parcelas de manera directa en la plataforma.',
    verificaciones: [
      { icon: <Shield className="w-4 h-4" />, texto: 'Identidad verificada' },
      { icon: <FileCheck className="w-4 h-4" />, texto: 'Documentación cargada' },
      { icon: <CheckCircle className="w-4 h-4" />, texto: 'Rol aprobado' }
    ]
  };

  const tabs = [
    { id: 'sobre', label: `Sobre ${vendedorName.split(' ')[0]}` },
    { id: 'parcelas', label: 'Parcelas en venta' }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Header - igual al Home */}
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
              <button 
                style={{ backgroundColor: '#006B4E' }}
                className="h-8 text-white px-[20px] text-sm leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center py-[0px]"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0D3640'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
              >
                Publicar propiedad
              </button>
              <button 
                onClick={() => onNavigate('entry')}
                className="h-8 bg-[#efefef] hover:bg-[#dedede] text-black hover:text-[#303030] px-[20px] text-sm leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center py-[0px]"
              >
                Ingresar
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative pt-28" style={{ backgroundColor: 'var(--hero-background)' }}>
        {/* HERO SECTION */}
        <section className="relative py-20 overflow-hidden" style={{ backgroundColor: 'var(--hero-background)' }}>
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1672404029233-49796e381f09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXJpYWwlMjBwcm9wZXJ0eSUyMGxhbmRzY2FwZSUyMG1vdW50YWluc3xlbnwxfHx8fDE3Njk0NjU2ODF8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Hero background"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 mb-8 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span style={{ fontSize: 'var(--font-size-body-sm)' }}>Volver</span>
            </button>

            <div className="flex flex-col md:flex-row gap-8 items-start max-w-5xl">
              <div className="w-32 h-32 bg-white rounded-[16px] overflow-hidden border-4 border-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex-shrink-0">
                <ImageWithFallback 
                  src={vendedor.logo} 
                  alt={vendedor.nombre}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 space-y-5">
                <div>
                  <h1 className="display-hero" style={{ color: '#0A0A0A', marginBottom: '1rem' }}>
                    {vendedor.nombre}
                  </h1>
                  
                  <div className="flex items-center gap-4 flex-wrap mb-3">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm" style={{ 
                      color: '#0A0A0A',
                      fontSize: 'var(--font-size-xs)',
                      fontWeight: 'var(--font-weight-semibold)',
                      letterSpacing: '0.01em'
                    }}>
                      <User className="w-4 h-4" style={{ color: '#006B4E' }} />
                      Persona natural
                    </span>
                    
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span style={{ fontSize: 'var(--font-size-body-sm)' }}>
                        {profileData.ubicacion}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="body-lead" style={{ color: '#404040', maxWidth: '42rem' }}>
                  {vendedor.descripcion}
                </p>

                <div className="flex gap-3 flex-wrap pt-3">
                  <button 
                    style={{ backgroundColor: '#006B4E' }}
                    className="h-10 text-white px-[32px] text-sm leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center shadow-sm"
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0D3640'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
                  >
                    Contactar
                  </button>
                  <button 
                    onClick={() => setActiveTab('parcelas')}
                    className="h-10 bg-[#efefef] hover:bg-[#dedede] text-black hover:text-[#303030] px-[32px] text-sm leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center"
                  >
                    Ver propiedades
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TABS */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="py-6 flex justify-center">
              <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
          </div>
        </div>

        {/* TAB CONTENT */}
        <div className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-6">
            {activeTab === 'sobre' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Columna principal */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* MÉTRICAS CLAVE - Destacadas visualmente */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl border-2 border-border p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#006B4E' }}>
                          <Clock className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <p style={{ 
                        fontSize: '2.5rem',
                        fontWeight: 'var(--font-weight-light)',
                        fontFamily: 'var(--font-heading)',
                        color: '#0A0A0A',
                        lineHeight: '1',
                        marginBottom: '0.5rem'
                      }}>
                        {profileData.tiempoPlataforma}
                      </p>
                      <p style={{ 
                        fontSize: 'var(--font-size-body-base)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: '#0A0A0A',
                        marginBottom: '0.25rem'
                      }}>
                        En la plataforma
                      </p>
                      <p style={{ fontSize: 'var(--font-size-xs)', color: '#737373' }}>
                        Vendedor activo
                      </p>
                    </div>

                    <div className="bg-white rounded-xl border-2 border-border p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-input-background">
                          <MapPin className="w-6 h-6" style={{ color: '#0A0A0A' }} />
                        </div>
                      </div>
                      <p style={{ 
                        fontSize: '2.5rem',
                        fontWeight: 'var(--font-weight-light)',
                        fontFamily: 'var(--font-heading)',
                        color: '#0A0A0A',
                        lineHeight: '1',
                        marginBottom: '0.5rem'
                      }}>
                        {parcelasPublicadas.length}
                      </p>
                      <p style={{ 
                        fontSize: 'var(--font-size-body-base)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: '#0A0A0A',
                        marginBottom: '0.25rem'
                      }}>
                        {parcelasPublicadas.length === 1 ? 'Parcela' : 'Parcelas'}
                      </p>
                      <p style={{ fontSize: 'var(--font-size-xs)', color: '#737373' }}>
                        En venta
                      </p>
                    </div>
                  </div>

                  {/* SOBRE EL VENDEDOR */}
                  <div className="bg-white rounded-xl border border-border p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#006B4E' }}>
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <h3 style={{ 
                        fontSize: 'var(--font-size-h3)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#0A0A0A'
                      }}>
                        Sobre {vendedorName.split(' ')[0]}
                      </h3>
                    </div>

                    <p style={{ 
                      fontSize: 'var(--font-size-body-base)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-body)'
                    }}>
                      {profileData.sobre}
                    </p>
                  </div>

                  {/* INFORMACIÓN DE CONTACTO - Destacada y accesible */}
                  <div className="bg-input-background rounded-xl border-2 border-border p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#006B4E' }}>
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <h3 style={{ 
                        fontSize: 'var(--font-size-h3)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#0A0A0A'
                      }}>
                        Información de contacto
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-5 rounded-xl bg-white border-2 border-border">
                        <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 bg-input-background border-2 border-border">
                          <Phone className="w-6 h-6" style={{ color: '#111' }} />
                        </div>
                        <div className="flex-1">
                          <p style={{ fontSize: 'var(--font-size-xs)', color: '#737373', marginBottom: '0.25rem', fontWeight: 'var(--font-weight-medium)' }}>
                            Teléfono
                          </p>
                          <p style={{ 
                            fontSize: 'var(--font-size-h4)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: '#0A0A0A'
                          }}>
                            {vendedor.telefono}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-5 rounded-xl bg-white border-2 border-border">
                        <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 bg-input-background border-2 border-border">
                          <Mail className="w-6 h-6" style={{ color: '#0A0A0A' }} />
                        </div>
                        <div className="flex-1">
                          <p style={{ fontSize: 'var(--font-size-xs)', color: '#737373', marginBottom: '0.25rem', fontWeight: 'var(--font-weight-medium)' }}>
                            Email
                          </p>
                          <p style={{ 
                            fontSize: 'var(--font-size-h4)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: '#0A0A0A',
                            wordBreak: 'break-word'
                          }}>
                            {vendedor.email}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 grid grid-cols-2 gap-4">
                        <button className="h-12 bg-white hover:bg-input-background text-black px-6 text-sm leading-[1.5] font-semibold rounded-[200px] transition-all border-2 border-black flex items-center justify-center gap-2 shadow-sm hover:shadow">
                          <Phone className="w-5 h-5" />
                          Llamar
                        </button>
                        <button 
                          style={{ backgroundColor: '#006B4E' }}
                          className="h-12 text-white px-6 text-sm leading-[1.5] font-semibold rounded-[200px] transition-colors flex items-center justify-center shadow-sm hover:shadow"
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0D3640'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
                        >
                          WhatsApp
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar - Información complementaria */}
                <div className="space-y-6">
                  {/* VERIFICACIONES */}
                  <div className="bg-white rounded-xl border border-border p-6 sticky top-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Shield className="w-5 h-5" style={{ color: '#111' }} />
                      <h4 style={{ 
                        fontSize: 'var(--font-size-body-base)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: '#0A0A0A'
                      }}>
                        Verificaciones
                      </h4>
                    </div>

                    <div className="space-y-3">
                      {profileData.verificaciones.map((verificacion, index) => (
                        <div 
                          key={index}
                          className="flex items-center gap-3 p-3 rounded-lg bg-input-background border border-border"
                        >
                          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-white border border-border">
                            {verificacion.icon}
                          </div>
                          <span style={{ 
                            fontSize: 'var(--font-size-body-sm)',
                            fontWeight: 'var(--font-weight-medium)',
                            color: '#0A0A0A'
                          }}>
                            {verificacion.texto}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'parcelas' && (
              <div>
                <h2 style={{ marginBottom: '2rem' }}>
                  Parcelas en venta ({parcelasPublicadas.length})
                </h2>

                {parcelasPublicadas.length === 0 ? (
                  <div className="text-center py-12">
                    <p style={{ fontSize: 'var(--font-size-body-base)', color: '#737373' }}>
                      Este vendedor aún no tiene parcelas publicadas.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {parcelasPublicadas.map((parcela) => (
                      <ParcelaCard
                        key={parcela.id}
                        id={parcela.id}
                        nombre={parcela.nombre}
                        ubicacion={parcela.ubicacion}
                        imagen={parcela.imagenes[0]}
                        imagenes={parcela.imagenes}
                        precio={parcela.precio}
                        caracteristicas={parcela.destacados}
                        inmobiliaria={parcela.inmobiliaria.nombre}
                        brokerImagen={parcela.inmobiliaria.logo}
                        tipoVendedor={parcela.inmobiliaria.tipoVendedor}
                        onClick={() => onNavigate('parcela-detalle', parcela.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}