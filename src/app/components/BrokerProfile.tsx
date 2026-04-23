import React, { useState } from 'react';
import { ChevronLeft, MapPin, Phone, Mail, CheckCircle, Star, Award, TrendingUp, Briefcase } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { getAllParcelas } from '@/app/data/parcelasData';
import { ParcelaCard } from '@/app/components/ParcelaCard';
import logo from 'figma:asset/a4719ce43ce52ee49df30a2a5c090c8a8b743667.png';

interface BrokerProfileProps {
  onNavigate: (screen: string, id?: number, data?: string) => void;
  brokerName: string | null;
}

export function BrokerProfile({ onNavigate, brokerName }: BrokerProfileProps) {
  const [activeTab, setActiveTab] = useState('sobre');

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
    zonasOperacion: ['Región Metropolitana', 'Valparaíso', 'O\'Higgins'],
    especialidades: [
      { icon: <Award className="w-5 h-5" />, titulo: 'Parcelas Rurales', descripcion: 'Especialista en terrenos rurales y agrícolas' },
      { icon: <TrendingUp className="w-5 h-5" />, titulo: 'Inversiones', descripcion: 'Asesoría en inversión inmobiliaria' },
      { icon: <Briefcase className="w-5 h-5" />, titulo: 'Gestión Integral', descripcion: 'Acompañamiento en todo el proceso' }
    ],
    testimonios: [
      {
        nombre: 'María González',
        ubicacion: 'Pirque',
        calificacion: 5,
        testimonio: 'Excelente profesional, me ayudó a encontrar la parcela perfecta para mi familia. Muy transparente y dedicado.',
        tipo: 'Compra de parcela'
      },
      {
        nombre: 'Carlos Muñoz',
        ubicacion: 'Colina',
        calificacion: 5,
        testimonio: 'Súper recomendado. Conoce muy bien el mercado y fue muy honesto con todas mis consultas.',
        tipo: 'Compra de parcela'
      },
      {
        nombre: 'Andrea Silva',
        ubicacion: 'San José de Maipo',
        calificacion: 5,
        testimonio: 'Gracias a su asesoría pude hacer una excelente inversión. Muy profesional y atento.',
        tipo: 'Compra de parcela'
      }
    ]
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
                <button onClick={() => onNavigate('brokers')} className="h-8 px-4 text-sm leading-[1.5] font-normal text-black hover:bg-[#efefef] hover:text-[#303030] rounded-[200px] transition-colors whitespace-nowrap flex items-center justify-center">Brokers</button>
                <button onClick={() => onNavigate('como-funciona')} className="h-8 px-4 text-sm leading-[1.5] font-normal text-black hover:bg-[#efefef] hover:text-[#303030] rounded-[200px] transition-colors whitespace-nowrap flex items-center justify-center">Cómo funciona</button>
                <button onClick={() => onNavigate('recursos')} className="h-8 px-4 text-sm leading-[1.5] font-normal text-black hover:bg-[#efefef] hover:text-[#303030] rounded-[200px] transition-colors whitespace-nowrap flex items-center justify-center">Recursos</button>
              </nav>
            </div>

            <div className="flex items-center justify-end gap-3">
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
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Botón volver */}
          <button
            onClick={() => onNavigate('brokers')}
            className="flex items-center gap-2 mb-6 text-sm hover:underline"
            style={{ color: 'var(--foreground)' }}
          >
            <ChevronLeft className="w-4 h-4" />
            Volver a Brokers
          </button>

          {/* Perfil del Broker */}
          <div className="bg-white rounded-3xl p-8 shadow-sm mb-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Foto del broker */}
              <div className="flex-shrink-0">
                <img
                  src={brokerData.foto}
                  alt={brokerData.nombre}
                  className="w-32 h-32 rounded-2xl object-cover"
                />
              </div>

              {/* Información del broker */}
              <div className="flex-1">
                <h1
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--font-size-h2)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--foreground)',
                    marginBottom: '0.5rem'
                  }}
                >
                  {brokerData.nombre}
                </h1>
                <p className="text-lg mb-4" style={{ color: '#6B6B6B' }}>{brokerData.titulo}</p>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4" style={{ color: '#6B6B6B' }} />
                    <span style={{ color: '#6B6B6B' }}>{brokerData.ubicacion}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="w-4 h-4" style={{ color: '#6B6B6B' }} />
                    <span style={{ color: '#6B6B6B' }}>{brokerData.añosExperiencia} años de experiencia</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4" style={{ color: '#6B6B6B' }} />
                    <span style={{ color: '#6B6B6B' }}>{brokerData.parcelasVendidas} parcelas vendidas</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-6">
                  <a
                    href={`tel:${brokerData.telefono}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-full transition-colors"
                    style={{ backgroundColor: '#124854', color: 'white' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0D3640'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#124854'}
                  >
                    <Phone className="w-4 h-4" />
                    Llamar
                  </a>
                  <a
                    href={`mailto:${brokerData.email}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-full transition-colors"
                    style={{ backgroundColor: '#efefef', color: '#0A0A0A' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dedede'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#efefef'}
                  >
                    <Mail className="w-4 h-4" />
                    Enviar email
                  </a>
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div className="mt-6 pt-6 border-t" style={{ borderColor: '#E5E5E5' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h4)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--foreground)',
                  marginBottom: '1rem'
                }}
              >
                Sobre mí
              </h3>
              <p style={{ color: '#6B6B6B', lineHeight: '1.6' }}>{brokerData.descripcion}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="flex gap-2 border-b" style={{ borderColor: '#E5E5E5' }}>
              <button
                onClick={() => setActiveTab('sobre')}
                className="px-6 py-3 text-sm font-medium transition-colors"
                style={{
                  color: activeTab === 'sobre' ? '#124854' : '#6B6B6B',
                  borderBottom: activeTab === 'sobre' ? '2px solid #124854' : 'none'
                }}
              >
                Especialidades
              </button>
              <button
                onClick={() => setActiveTab('parcelas')}
                className="px-6 py-3 text-sm font-medium transition-colors"
                style={{
                  color: activeTab === 'parcelas' ? '#124854' : '#6B6B6B',
                  borderBottom: activeTab === 'parcelas' ? '2px solid #124854' : 'none'
                }}
              >
                Parcelas activas
              </button>
              <button
                onClick={() => setActiveTab('testimonios')}
                className="px-6 py-3 text-sm font-medium transition-colors"
                style={{
                  color: activeTab === 'testimonios' ? '#124854' : '#6B6B6B',
                  borderBottom: activeTab === 'testimonios' ? '2px solid #124854' : 'none'
                }}
              >
                Testimonios
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'sobre' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {brokerData.especialidades.map((esp, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="mb-4" style={{ color: '#124854' }}>
                      {esp.icon}
                    </div>
                    <h4
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'var(--font-size-body)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: 'var(--foreground)',
                        marginBottom: '0.5rem'
                      }}
                    >
                      {esp.titulo}
                    </h4>
                    <p style={{ color: '#6B6B6B', fontSize: '0.875rem' }}>{esp.descripcion}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h4
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--font-size-h4)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--foreground)',
                    marginBottom: '1rem'
                  }}
                >
                  Zonas de operación
                </h4>
                <div className="flex flex-wrap gap-2">
                  {brokerData.zonasOperacion.map((zona, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full text-sm"
                      style={{ backgroundColor: '#F5F5F0', color: 'var(--foreground)' }}
                    >
                      {zona}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

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
                <div className="text-center py-12">
                  <p style={{ color: '#6B6B6B' }}>No hay parcelas activas en este momento.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'testimonios' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brokerData.testimonios.map((testimonio, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonio.calificacion)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" style={{ color: '#F59E0B' }} />
                    ))}
                  </div>
                  <p className="mb-4" style={{ color: 'var(--foreground)', lineHeight: '1.6' }}>
                    "{testimonio.testimonio}"
                  </p>
                  <div className="text-sm">
                    <p style={{ color: 'var(--foreground)', fontWeight: 500 }}>{testimonio.nombre}</p>
                    <p style={{ color: '#6B6B6B' }}>{testimonio.ubicacion}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
