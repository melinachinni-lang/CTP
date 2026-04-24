import React, { useState } from 'react';
import { ChevronDown, MapPin, Star, Briefcase } from 'lucide-react';
import { ContactModal } from '@/app/components/ContactModal';
import logo from 'figma:asset/a4719ce43ce52ee49df30a2a5c090c8a8b743667.png';
import heroBackground from 'figma:asset/46be9646c60608d21a829a86b189efb4cfc6cbbc.png';

interface BrokersPageProps {
  onNavigate: (screen: string, id?: number, data?: string) => void;
}

// Datos de ejemplo de brokers
const brokersData = [
  {
    id: 1,
    nombre: 'María González',
    especialidad: 'Especialista en parcelas de inversión',
    rating: 4.9,
    numResenas: 87,
    ubicacion: 'Aysén · Patagonia',
    experiencia: '8 años',
    propiedadesVendidas: 45,
    imagen: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTczOTU2MzIwMHww&ixlib=rb-4.1.0&q=80&w=400',
    inmobiliaria: 'Patagonia Properties'
  },
  {
    id: 2,
    nombre: 'Carlos Pérez',
    especialidad: 'Experto en proyectos rurales y agrícolas',
    rating: 4.8,
    numResenas: 124,
    ubicacion: 'Los Lagos · Sur de Chile',
    experiencia: '12 años',
    propiedadesVendidas: 78,
    imagen: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Mzk1NjMyMDB8MA&ixlib=rb-4.1.0&q=80&w=400',
    inmobiliaria: 'Propiedades del Sur'
  },
  {
    id: 3,
    nombre: 'Ana Martínez',
    especialidad: 'Parcelas turísticas y vacacionales',
    rating: 4.9,
    numResenas: 95,
    ubicacion: 'Aysén · Chile Chico',
    experiencia: '6 años',
    propiedadesVendidas: 52,
    imagen: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTczOTU2MzIwMHww&ixlib=rb-4.1.0&q=80&w=400',
    inmobiliaria: 'Inmobiliaria Austral'
  },
  {
    id: 4,
    nombre: 'Luis Rodríguez',
    especialidad: 'Asesor en terrenos forestales',
    rating: 4.7,
    numResenas: 68,
    ubicacion: 'Araucanía · Temuco',
    experiencia: '10 años',
    propiedadesVendidas: 63,
    imagen: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Mzk1NjMyMDB8MA&ixlib=rb-4.1.0&q=80&w=400',
    inmobiliaria: 'Propiedades del Sur'
  },
  {
    id: 5,
    nombre: 'Patricia Silva',
    especialidad: 'Consultora en proyectos sustentables',
    rating: 5.0,
    numResenas: 42,
    ubicacion: 'Los Ríos · Valdivia',
    experiencia: '5 años',
    propiedadesVendidas: 38,
    imagen: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTczOTU2MzIwMHww&ixlib=rb-4.1.0&q=80&w=400',
    inmobiliaria: 'Patagonia Properties'
  },
  {
    id: 6,
    nombre: 'Roberto Muñoz',
    especialidad: 'Especialista en grandes extensiones',
    rating: 4.8,
    numResenas: 110,
    ubicacion: 'Magallanes · Punta Arenas',
    experiencia: '15 años',
    propiedadesVendidas: 91,
    imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Mzk1NjMyMDB8MA&ixlib=rb-4.1.0&q=80&w=400',
    inmobiliaria: 'Inmobiliaria Austral'
  }
];

export function BrokersPage({ onNavigate }: BrokersPageProps) {
  const [searchText, setSearchText] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedEspecialidad, setSelectedEspecialidad] = useState('');
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedBroker, setSelectedBroker] = useState('');

  const handleContactar = (nombre: string) => {
    setSelectedBroker(nombre);
    setContactModalOpen(true);
  };

  // Renderizar estrellas
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className="w-3.5 h-3.5"
          fill={i < fullStars ? '#FFA500' : 'none'}
          stroke={i < fullStars ? '#FFA500' : '#DEDEDE'}
          strokeWidth={1.5}
        />
      );
    }
    
    return stars;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-8 left-0 right-0 z-50" style={{ backgroundColor: 'var(--hero-background)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Navigation - Left side */}
            <div className="flex items-center gap-0">
              <img 
                src={logo} 
                alt="CompraTuParcela" 
                className="h-14 cursor-pointer" 
                onClick={() => onNavigate('home')}
              />
              
              <nav className="flex items-center justify-center gap-0 whitespace-nowrap">
                <button 
                  onClick={() => onNavigate('parcelas')}
                  className="h-8 px-4 text-sm leading-[1.5] font-normal text-black hover:bg-[#efefef] hover:text-[#303030] rounded-[200px] transition-colors whitespace-nowrap flex items-center justify-center"
                >
                  Parcelas
                </button>
                <button 
                  onClick={() => onNavigate('inmobiliarias')}
                  className="h-8 px-4 text-sm leading-[1.5] font-normal text-black hover:bg-[#efefef] hover:text-[#303030] rounded-[200px] transition-colors whitespace-nowrap flex items-center justify-center"
                >
                  Inmobiliarias
                </button>
                <button onClick={() => onNavigate('como-funciona')} className="h-8 px-4 text-sm leading-[1.5] font-normal text-black hover:bg-[#efefef] hover:text-[#303030] rounded-[200px] transition-colors whitespace-nowrap flex items-center justify-center">
                  Cómo funciona
                </button>
                <button onClick={() => onNavigate('recursos')} className="h-8 px-4 text-sm leading-[1.5] font-normal text-black hover:bg-[#efefef] hover:text-[#303030] rounded-[200px] transition-colors whitespace-nowrap flex items-center justify-center">
                  Recursos
                </button>
              </nav>
            </div>

            {/* Action Buttons - Right side */}
            <div className="flex items-center justify-end gap-3">
              <button className="h-8 bg-[#006B4E] hover:bg-[#01533E] text-white px-[20px] text-sm leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center py-[0px]">
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

      <main>
        {/* Hero Section */}
        <section className="relative py-32 pb-52 overflow-hidden pt-28" style={{ backgroundColor: 'var(--hero-background)' }}>
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

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* Título */}
            <div className="mb-12">
              <h1 
                className="mb-4" 
                style={{ 
                  color: '#0A0A0A',
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-display)',
                  fontWeight: 'var(--font-weight-semibold)',
                  lineHeight: 'var(--line-height-heading)',
                  letterSpacing: 'var(--letter-spacing-tighter)'
                }}
              >
                Brokers especializados
              </h1>
              <p 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-lg)',
                  fontWeight: 'var(--font-weight-light)',
                  lineHeight: 'var(--line-height-body)',
                  maxWidth: '600px',
                  color: '#0A0A0A'
                }}
              >
                Conectá con expertos en parcelas y propiedades rurales que te guiarán en tu decisión
              </p>
            </div>

            {/* Buscador */}
            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-8">
                <div className="flex gap-4 items-end">
                  {/* Input nombre */}
                  <div className="flex-1 space-y-2">
                    <label 
                      className="block text-sm" 
                      style={{ 
                        color: '#0A0A0A',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-medium)'
                      }}
                    >
                      Buscar por nombre
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: María González"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black px-5 py-3 rounded-[100px] focus:outline-none transition-colors"
                      style={{ 
                        color: '#0A0A0A',
                        fontFamily: 'var(--font-body)', 
                        fontSize: 'var(--font-size-body-base)',
                        fontWeight: 'var(--font-weight-regular)', 
                        lineHeight: 'var(--line-height-body)' 
                      }}
                    />
                  </div>

                  {/* Select región */}
                  <div className="flex-1 space-y-2">
                    <label 
                      className="block text-sm" 
                      style={{ 
                        color: '#0A0A0A',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-medium)'
                      }}
                    >
                      Región / zona
                    </label>
                    <div className="relative">
                      <select
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-5 pr-10 py-3 rounded-[100px] appearance-none cursor-pointer transition-colors focus:outline-none"
                        style={{ 
                          color: '#0A0A0A',
                          fontFamily: 'var(--font-body)', 
                          fontSize: 'var(--font-size-body-base)',
                          fontWeight: 'var(--font-weight-regular)', 
                          lineHeight: 'var(--line-height-body)' 
                        }}
                      >
                        <option value="">Todas las regiones</option>
                        <option value="aysen">Aysén</option>
                        <option value="los-lagos">Los Lagos</option>
                        <option value="los-rios">Los Ríos</option>
                        <option value="araucania">Araucanía</option>
                        <option value="magallanes">Magallanes</option>
                      </select>
                      <ChevronDown 
                        className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" 
                        size={20} 
                        style={{ color: '#737373' }}
                      />
                    </div>
                  </div>

                  {/* Select especialidad */}
                  <div className="flex-1 space-y-2">
                    <label 
                      className="block text-sm" 
                      style={{ 
                        color: '#0A0A0A',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-medium)'
                      }}
                    >
                      Especialidad
                    </label>
                    <div className="relative">
                      <select
                        value={selectedEspecialidad}
                        onChange={(e) => setSelectedEspecialidad(e.target.value)}
                        className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-5 pr-10 py-3 rounded-[100px] appearance-none cursor-pointer transition-colors focus:outline-none"
                        style={{ 
                          color: '#0A0A0A',
                          fontFamily: 'var(--font-body)', 
                          fontSize: 'var(--font-size-body-base)',
                          fontWeight: 'var(--font-weight-regular)', 
                          lineHeight: 'var(--line-height-body)' 
                        }}
                      >
                        <option value="">Todas las especialidades</option>
                        <option value="inversion">Inversión</option>
                        <option value="rurales">Proyectos rurales</option>
                        <option value="turisticas">Parcelas turísticas</option>
                        <option value="forestales">Terrenos forestales</option>
                        <option value="sustentables">Proyectos sustentables</option>
                      </select>
                      <ChevronDown 
                        className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" 
                        size={20} 
                        style={{ color: '#737373' }}
                      />
                    </div>
                  </div>

                  {/* Botón Buscar */}
                  <button 
                    className="bg-[#006B4E] hover:bg-[#01533E] text-white px-8 py-3 rounded-[100px] transition-colors shadow-sm"
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-base)',
                      fontWeight: 'var(--font-weight-medium)',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    Buscar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Listado de Brokers */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header con contador */}
            <div className="flex items-center justify-between mb-8">
              <h2 
                style={{ 
                  color: '#0A0A0A',
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h3)',
                  fontWeight: 'var(--font-weight-medium)'
                }}
              >
                {brokersData.length} brokers disponibles
              </h2>
            </div>

            {/* Grid de brokers */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brokersData.map((broker) => (
                <div 
                  key={broker.id}
                  className="bg-white border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  style={{ borderColor: '#E5E5E5' }}
                >
                  {/* Imagen del broker */}
                  <div className="relative h-64 bg-gray-100">
                    <img 
                      src={broker.imagen}
                      alt={broker.nombre}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Contenido */}
                  <div className="p-6">
                    {/* Nombre y rating */}
                    <div className="mb-3">
                      <h3 
                        className="mb-2"
                        style={{ 
                          color: '#0A0A0A',
                          fontFamily: 'var(--font-heading)',
                          fontSize: 'var(--font-size-h4)',
                          fontWeight: 'var(--font-weight-medium)',
                          lineHeight: 'var(--line-height-heading)'
                        }}
                      >
                        {broker.nombre}
                      </h3>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {renderStars(broker.rating)}
                        </div>
                        <span 
                          style={{ 
                            color: '#0A0A0A',
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            fontWeight: 'var(--font-weight-medium)'
                          }}
                        >
                          {broker.rating}
                        </span>
                        <span 
                          style={{ 
                            color: '#737373',
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)'
                          }}
                        >
                          ({broker.numResenas} reseñas)
                        </span>
                      </div>
                    </div>

                    {/* Especialidad */}
                    <p 
                      className="mb-4"
                      style={{ 
                        color: '#737373',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        lineHeight: 'var(--line-height-body)'
                      }}
                    >
                      {broker.especialidad}
                    </p>

                    {/* Stats */}
                    <div className="space-y-2 mb-4 pb-4" style={{ borderBottom: '1px solid #E5E5E5' }}>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} style={{ color: '#737373' }} />
                        <span 
                          style={{ 
                            color: '#737373',
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-xs)'
                          }}
                        >
                          {broker.ubicacion}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase size={16} style={{ color: '#737373' }} />
                        <span 
                          style={{ 
                            color: '#737373',
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-xs)'
                          }}
                        >
                          {broker.experiencia} de experiencia · {broker.propiedadesVendidas} propiedades vendidas
                        </span>
                      </div>
                    </div>

                    {/* Inmobiliaria */}
                    <p 
                      className="mb-4"
                      style={{ 
                        color: '#737373',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-xs)'
                      }}
                    >
                      <span style={{ fontWeight: 'var(--font-weight-medium)', color: '#0A0A0A' }}>Trabaja en:</span> {broker.inmobiliaria}
                    </p>

                    {/* Botón contactar */}
                    <button
                      onClick={() => handleContactar(broker.nombre)}
                      className="w-full py-2.5 rounded-full transition-all duration-300"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-medium)',
                        backgroundColor: '#006B4E',
                        color: '#FFFFFF'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#01533E'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
                    >
                      Contactar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Modal de contacto */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        parcelaNombre="Consulta sobre servicios"
        parcelaUbicacion="Broker"
        vendedorNombre={selectedBroker}
        vendedorTipo="inmobiliaria"
      />

      {/* Footer */}
      <footer className="bg-white py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <img src={logo} alt="CompraTuParcela" className="h-16 -ml-4" />
              <p className="text-xs text-gray-600">
                Plataforma especializada en<br />compra y venta de parcelas
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="text-xs font-bold text-black">EXPLORAR</div>
              <div className="space-y-2 text-xs text-gray-600">
                <div className="cursor-pointer hover:text-black" onClick={() => onNavigate('parcelas')}>Parcelas</div>
                <div className="cursor-pointer hover:text-black" onClick={() => onNavigate('inmobiliarias')}>Inmobiliarias</div>
                <div className="cursor-pointer hover:text-black" onClick={() => onNavigate('brokers')}>Brokers</div>
                <div>Blog</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold text-black">PLATAFORMA</div>
              <div className="space-y-2 text-xs text-gray-600">
                <div className="cursor-pointer hover:text-black" onClick={() => onNavigate('como-funciona')}>Cómo funciona</div>
                <div>Publicar propiedad</div>
                <div>Planes para inmobiliarias</div>
                <div>Para brokers</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold text-black">SOPORTE</div>
              <div className="space-y-2 text-xs text-gray-600">
                <div>Centro de ayuda</div>
                <div>Términos y condiciones</div>
                <div>Política de privacidad</div>
                <div>Contacto</div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              © 2026 Compra Tu Parcela. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}