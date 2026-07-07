import { SiteFooter } from '@/app/components/SiteFooter';
import React, { useState, useRef } from 'react';
import { ChevronLeft, MapPin, Phone, Mail, Star, Shield } from 'lucide-react';
import { ContactModal } from '@/app/components/ContactModal';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { getAllParcelas } from '@/app/data/parcelasData';
import { ParcelaCard } from '@/app/components/ParcelaCard';
import { Tabs } from '@/app/components/Tabs';
import logo from 'figma:asset/a4719ce43ce52ee49df30a2a5c090c8a8b743667.png';

interface BrokerProfileProps {
  onNavigate: (screen: string, id?: number, data?: string) => void;
  brokerName: string | null;
}

export function BrokerProfile({ onNavigate, brokerName }: BrokerProfileProps) {
  const [activeTab, setActiveTab] = useState('sobre');
  const [showContactModal, setShowContactModal] = useState(false);
  const tabContentRef = useRef<HTMLDivElement>(null);

  const parcelasPublicadas = getAllParcelas().filter(
    parcela => parcela.inmobiliaria.nombre === brokerName || parcela.tipoVendedor === 'Broker'
  ).slice(0, 6);

  const brokerData = {
    nombre: brokerName || 'Broker',
    foto: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2OTA2Njg5Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    titulo: 'Broker Inmobiliario',
    ubicacion: 'Región Metropolitana, Chile',
    telefono: '+56 9 7771 4626',
    email: 'contacto@broker.cl',
    descripcion: 'Especialista en parcelas y terrenos rurales con más de 10 años de experiencia en el mercado inmobiliario. Comprometido con brindar asesoría personalizada y transparente en cada transacción.',
    añosExperiencia: 10,
    parcelasVendidas: 45,
    zonasOperacion: ['Región Metropolitana', 'Valparaíso', "O'Higgins"],
    idiomas: ['Español', 'Inglés'],
    certificaciones: ['Certificado CChC', 'Mediador Inmobiliario'],
    testimonios: [
      {
        nombre: 'María González',
        ubicacion: 'Pirque',
        calificacion: 5,
        testimonio: 'Excelente profesional, me ayudó a encontrar la parcela perfecta para mi familia. Muy transparente y dedicado.',
      },
      {
        nombre: 'Carlos Muñoz',
        ubicacion: 'Colina',
        calificacion: 5,
        testimonio: 'Súper recomendado. Conoce muy bien el mercado y fue muy honesto con todas mis consultas.',
      },
      {
        nombre: 'Andrea Silva',
        ubicacion: 'San José de Maipo',
        calificacion: 5,
        testimonio: 'Gracias a su asesoría pude hacer una excelente inversión. Muy profesional y atento.',
      }
    ]
  };

  const firstName = brokerData.nombre.split(' ')[0];

  const tabs = [
    { id: 'sobre', label: `Sobre ${firstName}` },
    { id: 'parcelas', label: 'Parcelas' },
  ];

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    setTimeout(() => {
      const tabsElement = document.querySelector('[data-tabs-container]');
      if (tabsElement) {
        const yOffset = -100;
        const y = tabsElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen relative">
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
                <button onClick={() => onNavigate('brokers')} className="h-8 px-4 text-sm leading-[1.5] font-normal text-black hover:bg-[#efefef] hover:text-[#303030] rounded-[200px] transition-colors whitespace-nowrap flex items-center justify-center">Brokers</button>
                <button onClick={() => onNavigate('como-funciona')} className="h-8 px-4 text-sm leading-[1.5] font-normal text-black hover:bg-[#efefef] hover:text-[#303030] rounded-[200px] transition-colors whitespace-nowrap flex items-center justify-center">Cómo funciona</button>
                <button onClick={() => onNavigate('recursos')} className="h-8 px-4 text-sm leading-[1.5] font-normal text-black hover:bg-[#efefef] hover:text-[#303030] rounded-[200px] transition-colors whitespace-nowrap flex items-center justify-center">Recursos</button>
              </nav>
            </div>
            <div className="flex items-center justify-end gap-3">
              <button
                style={{ backgroundColor: '#006B4E' }}
                className="h-8 text-white px-[20px] text-sm leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center py-[0px]"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#01533E'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
              >
                Publicar propiedad
              </button>
              <button
                onClick={() => onNavigate('entry')}
                className="h-8 bg-[#efefef] text-black px-[20px] text-sm leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center py-[0px] hover:bg-[#dedede] hover:text-[#303030]"
              >
                Iniciar sesión
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
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            <button
              onClick={() => onNavigate('brokers')}
              className="flex items-center gap-2 mb-8 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span style={{ fontSize: 'var(--font-size-body-sm)', fontFamily: 'var(--font-body)' }}>Volver a Brokers</span>
            </button>

            <div className="flex flex-col md:flex-row gap-8 items-start max-w-5xl">
              {/* Foto circular */}
              <div className="w-32 h-32 bg-white rounded-full overflow-hidden border-4 border-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex-shrink-0">
                <ImageWithFallback
                  src={brokerData.foto}
                  alt={brokerData.nombre}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 space-y-5">
                <div>
                  <h1 style={{
                    color: 'var(--foreground)',
                    marginBottom: '1rem',
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--font-size-display)',
                    fontWeight: 'var(--font-weight-light)',
                    lineHeight: 'var(--line-height-heading)',
                    letterSpacing: 'var(--letter-spacing-tighter)'
                  }}>
                    {brokerData.nombre}
                  </h1>

                  <div className="flex items-center gap-4 flex-wrap mb-3">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm" style={{
                      color: 'var(--foreground)',
                      fontSize: 'var(--font-size-xs)',
                      fontWeight: 'var(--font-weight-semibold)',
                      fontFamily: 'var(--font-body)',
                      letterSpacing: '0.01em'
                    }}>
                      <Shield className="w-4 h-4" style={{ color: 'var(--foreground)' }} />
                      Broker verificado
                    </span>

                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span style={{ fontSize: 'var(--font-size-body-sm)', fontFamily: 'var(--font-body)' }}>
                        {brokerData.ubicacion}
                      </span>
                    </div>
                  </div>
                </div>

                <p style={{
                  color: '#404040',
                  maxWidth: '42rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '20px',
                  fontWeight: 'var(--font-weight-light)',
                  lineHeight: 'var(--line-height-body)'
                }}>
                  {brokerData.descripcion}
                </p>

                <div className="flex gap-3 flex-wrap pt-3">
                  <button
                    onClick={() => setShowContactModal(true)}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      backgroundColor: '#006B4E'
                    }}
                    className="h-10 text-white px-[32px] rounded-[200px] transition-colors flex items-center justify-center gap-2 shadow-sm"
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#01533E'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
                  >
                    <Phone className="w-4 h-4" />
                    Contactar
                  </button>
                  <button
                    onClick={() => handleTabChange('parcelas')}
                    className="h-10 bg-[#efefef] hover:bg-[#dedede] text-black hover:text-[#303030] px-[32px] rounded-[200px] transition-colors flex items-center justify-center"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)'
                    }}
                  >
                    Ver parcelas
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TABS BAR */}
        <div className="bg-white" data-tabs-container>
          <div className="max-w-7xl mx-auto px-6">
            <div className="py-6 flex justify-center">
              <Tabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
            </div>
          </div>
        </div>

        {/* TAB CONTENT */}
        <div className="bg-white py-12" ref={tabContentRef}>
          <div className="max-w-7xl mx-auto px-6">

            {/* SOBRE tab */}
            {activeTab === 'sobre' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Columna principal */}
                <div className="lg:col-span-2 space-y-8">

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-xl p-5 border" style={{ borderColor: 'var(--border)' }}>
                      <p style={{
                        fontSize: 'var(--font-size-display)',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 'var(--font-weight-light)',
                        color: 'var(--foreground)',
                        lineHeight: 1
                      }}>{brokerData.añosExperiencia}</p>
                      <p style={{
                        fontSize: 'var(--font-size-body-sm)',
                        fontFamily: 'var(--font-body)',
                        color: '#737373',
                        marginTop: '0.5rem'
                      }}>años de experiencia</p>
                    </div>
                    <div className="rounded-xl p-5 border" style={{ borderColor: 'var(--border)' }}>
                      <p style={{
                        fontSize: 'var(--font-size-display)',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 'var(--font-weight-light)',
                        color: 'var(--foreground)',
                        lineHeight: 1
                      }}>{brokerData.parcelasVendidas}</p>
                      <p style={{
                        fontSize: 'var(--font-size-body-sm)',
                        fontFamily: 'var(--font-body)',
                        color: '#737373',
                        marginTop: '0.5rem'
                      }}>parcelas vendidas</p>
                    </div>
                    <div className="rounded-xl p-5 border" style={{ borderColor: 'var(--border)' }}>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map(i => (
                          <Star key={i} className="w-4 h-4 fill-current" style={{ color: '#F59E0B' }} />
                        ))}
                      </div>
                      <p style={{
                        fontSize: 'var(--font-size-body-sm)',
                        fontFamily: 'var(--font-body)',
                        color: '#737373',
                        marginTop: '0.5rem'
                      }}>calificación</p>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="rounded-xl p-6 border" style={{ borderColor: 'var(--border)' }}>
                    <h3 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-h4)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--foreground)',
                      marginBottom: '1rem'
                    }}>
                      Sobre {firstName}
                    </h3>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-base)',
                      color: '#404040',
                      lineHeight: '1.7'
                    }}>
                      {brokerData.descripcion}
                    </p>
                  </div>

                </div>

                {/* Sidebar */}
                <div className="space-y-5">

                  {/* Contacto */}
                  <div className="rounded-xl p-6 border" style={{ borderColor: 'var(--border)' }}>
                    <h4 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-body-base)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--foreground)',
                      marginBottom: '1rem'
                    }}>
                      Contacto
                    </h4>
                    <div className="space-y-3 mb-5">
                      <a href={`tel:${brokerData.telefono}`} className="flex items-center gap-3" style={{
                        color: '#404040',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)'
                      }}>
                        <Phone className="w-4 h-4 flex-shrink-0" style={{ color: '#737373' }} />
                        {brokerData.telefono}
                      </a>
                      <a href={`mailto:${brokerData.email}`} className="flex items-center gap-3" style={{
                        color: '#404040',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)'
                      }}>
                        <Mail className="w-4 h-4 flex-shrink-0" style={{ color: '#737373' }} />
                        {brokerData.email}
                      </a>
                    </div>
                    <button
                      onClick={() => setShowContactModal(true)}
                      style={{
                        backgroundColor: '#006B4E',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-medium)'
                      }}
                      className="w-full h-10 text-white rounded-[200px] transition-colors flex items-center justify-center gap-2"
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#01533E'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
                    >
                      <Phone className="w-4 h-4" />
                      Contactar
                    </button>
                  </div>

                  {/* Zonas */}
                  <div className="rounded-xl p-6 border" style={{ borderColor: 'var(--border)' }}>
                    <h4 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-body-base)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--foreground)',
                      marginBottom: '1rem'
                    }}>
                      Zonas de operación
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {brokerData.zonasOperacion.map((zona, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-full" style={{
                          backgroundColor: '#F5F5F0',
                          color: 'var(--foreground)',
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)'
                        }}>
                          {zona}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Idiomas */}
                  <div className="rounded-xl p-6 border" style={{ borderColor: 'var(--border)' }}>
                    <h4 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-body-base)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--foreground)',
                      marginBottom: '1rem'
                    }}>
                      Idiomas
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {brokerData.idiomas.map((idioma, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-full" style={{
                          backgroundColor: '#EBF5FF',
                          color: '#1D4ED8',
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-medium)'
                        }}>
                          {idioma}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Certificaciones */}
                  <div className="rounded-xl p-6 border" style={{ borderColor: 'var(--border)' }}>
                    <h4 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-body-base)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--foreground)',
                      marginBottom: '1rem'
                    }}>
                      Certificaciones
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {brokerData.certificaciones.map((cert, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-full" style={{
                          backgroundColor: '#F3E8FF',
                          color: '#7C3AED',
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-medium)'
                        }}>
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* PARCELAS tab */}
            {activeTab === 'parcelas' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {parcelasPublicadas.map((parcela) => (
                    <ParcelaCard
                      key={parcela.id}
                      parcela={parcela}
                      onClick={() => onNavigate('parcela-detalle', parcela.id)}
                    />
                  ))}
                </div>
                {parcelasPublicadas.length === 0 && (
                  <div className="text-center py-16">
                    <p style={{ color: '#737373', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)' }}>
                      No hay parcelas activas en este momento.
                    </p>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </main>

      <SiteFooter onNavigate={onNavigate} />

      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        parcelaNombre="Consulta general"
        parcelaUbicacion=""
        vendedorNombre={brokerData.nombre}
        vendedorTipo="broker"
      />
    </div>
  );
}
