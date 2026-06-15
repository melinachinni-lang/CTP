import React, { useState } from 'react';
import { ChevronDown, MapPin, Star, Home, Menu, X } from 'lucide-react';
import { ContactModal } from '@/app/components/ContactModal';
import { useI18n } from '@/app/i18n/i18nContext';
import LanguageCurrencySelector from '@/app/components/LanguageCurrencySelector';
import logo from 'figma:asset/a4719ce43ce52ee49df30a2a5c090c8a8b743667.png';
import heroBackground from 'figma:asset/46be9646c60608d21a829a86b189efb4cfc6cbbc.png';

interface InmobiliariasPageProps {
  onNavigate: (screen: string, id?: number, data?: string) => void;
}

// Datos de ejemplo de inmobiliarias
const inmobiliariasData = [
  {
    id: 1,
    nombre: 'Patagonia Properties',
    descripcion: 'Especialistas en propiedades y proyectos en la Patagonia chilena',
    descripcionEn: 'Specialists in properties and projects in Chilean Patagonia',
    rating: 4.8,
    numResenas: 120,
    zonas: ['Aysén', 'Patagonia', 'Coyhaique'],
    region: 'aysen',
    imagen: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwb2ZmaWNlfGVufDF8fHx8MTc2OTM2OTQ4M3ww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    nombre: 'Propiedades del Sur',
    nombreEn: 'Southern Properties',
    descripcion: 'Conectamos personas con sus terrenos ideales en la zona sur de Chile',
    descripcionEn: 'Connecting people with their ideal land in southern Chile',
    rating: 4.9,
    numResenas: 87,
    zonas: ['Los Lagos', 'Puerto Montt', 'Osorno'],
    region: 'los-lagos',
    imagen: 'https://images.unsplash.com/photo-1694702740570-0a31ee1525c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3Njk0NDIwNjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    nombre: 'Inmobiliaria Austral',
    nombreEn: 'Austral Real Estate',
    descripcion: 'Expertos en parcelas y desarrollos inmobiliarios en la Patagonia',
    descripcionEn: 'Experts in parcels and real estate developments in Patagonia',
    rating: 4.7,
    numResenas: 156,
    zonas: ['Aysén', 'Chile Chico', 'Cochrane'],
    region: 'aysen',
    imagen: 'https://images.unsplash.com/photo-1425421669292-0c3da3b8f529?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc3xlbnwxfHx8fDE3Njk0NDQ5MjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 4,
    nombre: 'Tierras del Valle',
    nombreEn: 'Valley Lands',
    descripcion: 'Parcelas agrícolas y residenciales en los valles del centro-sur de Chile',
    descripcionEn: 'Agricultural and residential parcels in the central-south valleys of Chile',
    rating: 4.6,
    numResenas: 64,
    zonas: ['Araucanía', 'Temuco', 'Villarrica'],
    region: 'araucania',
    imagen: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  {
    id: 5,
    nombre: 'InmoCentro SpA',
    descripcion: 'Especialistas en inversión inmobiliaria y terrenos rurales en la región metropolitana',
    descripcionEn: 'Real estate investment and rural land specialists in the metropolitan region',
    rating: 4.5,
    numResenas: 203,
    zonas: ['Metropolitana', 'Santiago', 'Melipilla'],
    region: 'metropolitana',
    imagen: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  {
    id: 6,
    nombre: 'Sur Verde Propiedades',
    descripcion: 'Tu aliado en la búsqueda de terrenos naturales con acceso a ríos y bosques en Los Ríos',
    descripcionEn: 'Your partner in finding natural land with river and forest access in Los Ríos',
    rating: 4.8,
    numResenas: 91,
    zonas: ['Los Ríos', 'Valdivia', 'Panguipulli'],
    region: 'los-rios',
    imagen: 'https://images.unsplash.com/photo-1448630360428-65456885c650?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
];

export function InmobiliariasPage({ onNavigate }: InmobiliariasPageProps) {
  const { t, language } = useI18n();
  const [searchText, setSearchText] = useState('');
  const [searchApplied, setSearchApplied] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedInmobiliaria, setSelectedInmobiliaria] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1400);
    return () => clearTimeout(t);
  }, []);

  const filteredInmobiliarias = inmobiliariasData.filter(i => {
    const matchesSearch = !searchApplied || i.nombre.toLowerCase().includes(searchApplied.toLowerCase());
    const matchesRegion = !selectedRegion || i.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  const handleBuscar = () => setSearchApplied(searchText);

  const handleContactar = (nombre: string) => {
    setSelectedInmobiliaria(nombre);
    setContactModalOpen(true);
  };

  const handleVerDetalle = (nombre: string) => {
    onNavigate('inmobiliaria-profile', undefined, nombre);
  };

  // Renderizar estrellas (reutilizando el patrón de Parcelas)
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
      {/* Header - IGUAL AL HOME Y PARCELAS con alta fidelidad */}
      <header className="fixed top-8 left-0 right-0 z-50" style={{ backgroundColor: 'var(--hero-background)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Hamburger Menu - Mobile/Tablet only */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label={t.common.openMenu}
            >
              <Menu className="w-6 h-6 text-black" />
            </button>

            {/* Logo and Navigation - Left side */}
            <div className="flex items-center gap-0">
              <img 
                src={logo} 
                alt="CompraTuParcela" 
                className="h-10 sm:h-12 lg:h-14 cursor-pointer" 
                onClick={() => onNavigate('home')}
              />
              
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center justify-center gap-0 whitespace-nowrap">
                <button 
                  onClick={() => onNavigate('parcelas')}
                  className="h-8 px-4 text-sm leading-[1.5] font-normal text-black hover:bg-[#efefef] hover:text-[#303030] rounded-[200px] transition-colors whitespace-nowrap flex items-center justify-center"
                >
                  {t.nav.parcelas}
                </button>
                <button
                  onClick={() => onNavigate('inmobiliarias')}
                  className="h-8 px-4 text-sm leading-[1.5] font-normal text-black bg-[#efefef] rounded-[200px] whitespace-nowrap flex items-center justify-center"
                >
                  {t.nav.inmobiliarias}
                </button>
                <button
                  onClick={() => onNavigate('como-funciona')}
                  className="h-8 px-4 text-sm leading-[1.5] font-normal text-black hover:bg-[#efefef] hover:text-[#303030] rounded-[200px] transition-colors whitespace-nowrap flex items-center justify-center"
                >
                  {t.nav.howItWorks}
                </button>
                <button
                  onClick={() => onNavigate('recursos')}
                  className="h-8 px-4 text-sm leading-[1.5] font-normal text-black hover:bg-[#efefef] hover:text-[#303030] rounded-[200px] transition-colors whitespace-nowrap flex items-center justify-center"
                >
                  {t.nav.resources}
                </button>
              </nav>
            </div>

            {/* Action Buttons - Right side */}
            <div className="flex items-center justify-end gap-2 lg:gap-3">
              <div className="hidden lg:block">
                <LanguageCurrencySelector variant="header" />
              </div>
              <button className="h-8 bg-[#006B4E] hover:bg-[#01533E] text-white px-3 lg:px-[20px] text-xs sm:text-sm leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center py-[0px]">
                <span className="hidden sm:inline">{t.nav.publishProperty}</span>
                <span className="sm:hidden">{t.nav.publishShort}</span>
              </button>
              <button
                onClick={() => onNavigate('entry')}
                className="hidden sm:flex h-8 bg-[#efefef] hover:bg-[#dedede] text-black hover:text-[#303030] px-3 lg:px-[20px] text-xs sm:text-sm leading-[1.5] font-medium rounded-[200px] transition-colors items-center justify-center py-[0px]"
              >
                {t.nav.login}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section - Responsive */}
        <section className="relative py-24 md:py-32 pb-40 md:pb-52 overflow-hidden pt-20 md:pt-28" style={{ backgroundColor: 'var(--hero-background)' }}>
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

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            {/* Título - Responsive */}
            <div className="mb-8 md:mb-12">
              <h1 
                className="mb-3 md:mb-4" 
                style={{ 
                  color: '#0A0A0A',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: 'clamp(32px, 8vw, 64px)',
                  fontWeight: 600,
                  lineHeight: '1.1',
                  letterSpacing: '-0.02em'
                }}
              >
                {t.inmobiliarias.pageTitle}
              </h1>
              <p
                className="text-base md:text-xl"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 300,
                  lineHeight: '1.6',
                  maxWidth: '600px',
                  color: '#0A0A0A'
                }}
              >
                {t.inmobiliarias.pageSubtitle}
              </p>
            </div>

            {/* Buscador - Responsive */}
            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl md:rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-4 md:p-8">
                <div className="flex flex-col md:flex-row gap-3 md:gap-4 md:items-end">
                  {/* Input nombre */}
                  <div className="flex-1 space-y-2">
                    <label 
                      className="block text-xs md:text-sm" 
                      style={{ 
                        color: '#0A0A0A',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 'clamp(11px, 2vw, 13px)',
                        fontWeight: 500
                      }}
                    >
                      {t.inmobiliarias.searchByName}
                    </label>
                    <input
                      type="text"
                      placeholder={t.inmobiliarias.searchPlaceholder}
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black px-4 md:px-5 py-2.5 md:py-3 rounded-[100px] focus:outline-none transition-colors text-sm md:text-base"
                      style={{ 
                        color: '#0A0A0A',
                        fontFamily: 'Inter, sans-serif', 
                        fontWeight: 400, 
                        lineHeight: '1.5' 
                      }}
                    />
                  </div>

                  {/* Select región */}
                  <div className="flex-1 space-y-2">
                    <label 
                      className="block text-xs md:text-sm" 
                      style={{ 
                        color: '#0A0A0A',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 'clamp(11px, 2vw, 13px)',
                        fontWeight: 500
                      }}
                    >
                      {t.inmobiliarias.regionLabel}
                    </label>
                    <div className="relative">
                      <select
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 md:pl-5 pr-10 py-2.5 md:py-3 rounded-[100px] appearance-none cursor-pointer transition-colors focus:outline-none text-sm md:text-base"
                        style={{ 
                          color: '#0A0A0A',
                          fontFamily: 'Inter, sans-serif', 
                          fontWeight: 400, 
                          lineHeight: '1.5' 
                        }}
                      >
                        <option value="">{t.inmobiliarias.allRegions}</option>
                        <option value="metropolitana">{t.inmobiliarias.regionMetropolitana}</option>
                        <option value="valparaiso">Valparaíso</option>
                        <option value="ohiggins">O'Higgins</option>
                        <option value="maule">Maule</option>
                        <option value="biobio">Biobío</option>
                        <option value="araucania">Araucanía</option>
                        <option value="los-rios">Los Ríos</option>
                        <option value="los-lagos">Los Lagos</option>
                        <option value="aysen">Aysén</option>
                        <option value="magallanes">Magallanes</option>
                      </select>
                      <ChevronDown className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Botón Buscar - Responsive */}
                  <button
                    onClick={handleBuscar}
                    className="w-full md:w-auto bg-[#006B4E] hover:bg-[#01533E] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-[200px] flex items-center justify-center whitespace-nowrap transition-colors text-sm md:text-base"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 500,
                      lineHeight: '1.5'
                    }}
                  >
                    {t.common.search}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resultados Section */}
        <section className="relative -mt-24 md:-mt-32 pb-12 md:pb-20" style={{ backgroundColor: 'var(--hero-background)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">

            {/* Estado de carga — skeleton */}
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-xl overflow-hidden border border-gray-200 bg-white animate-pulse">
                    <div className="aspect-[4/3] bg-gray-200" />
                    <div className="p-5 space-y-3">
                      <div className="h-5 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-full" />
                      <div className="h-4 bg-gray-200 rounded w-2/3" />
                      <div className="flex gap-2 pt-1">
                        <div className="h-5 bg-gray-200 rounded-full w-16" />
                        <div className="h-5 bg-gray-200 rounded-full w-20" />
                        <div className="h-5 bg-gray-200 rounded-full w-14" />
                      </div>
                      <div className="pt-3 border-t border-gray-200 space-y-2">
                        <div className="h-10 bg-gray-200 rounded-full" />
                        <div className="h-10 bg-gray-200 rounded-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Estado vacío */}
            {!isLoading && filteredInmobiliarias.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ backgroundColor: '#F0F5EB' }}>
                  <Home className="w-8 h-8" style={{ color: '#647E3F' }} />
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Montserrat, sans-serif', color: '#0A0A0A' }}>
                  {language === 'en' ? 'No agencies found' : 'No encontramos inmobiliarias'}
                </h3>
                <p className="text-gray-500 mb-6 max-w-sm" style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', lineHeight: '1.6' }}>
                  {language === 'en'
                    ? 'Try a different name or select another region.'
                    : 'Probá con otro nombre o seleccioná otra región.'}
                </p>
                <button
                  onClick={() => { setSearchText(''); setSearchApplied(''); setSelectedRegion(''); }}
                  className="px-5 py-2.5 rounded-full border-2 text-sm font-medium transition-colors hover:bg-gray-50"
                  style={{ borderColor: '#C5D9A8', color: '#3D5E28', fontFamily: 'Inter, sans-serif' }}
                >
                  {language === 'en' ? 'Clear filters' : 'Limpiar filtros'}
                </button>
              </div>
            )}

            {/* Grid de inmobiliarias */}
            {!isLoading && filteredInmobiliarias.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredInmobiliarias.map((inmobiliaria) => (
                  <div
                    key={inmobiliaria.id}
                    className="h-full flex flex-col border border-gray-200 rounded-xl shadow-sm hover:border-gray-400 hover:shadow-md transition-all duration-300 cursor-pointer group overflow-hidden bg-white"
                    onClick={() => handleVerDetalle(inmobiliaria.nombre)}
                  >
                    {/* Imagen */}
                    <div className="relative flex-shrink-0">
                      <div className="aspect-[4/3] bg-gray-200 overflow-hidden">
                        <img
                          src={inmobiliaria.imagen}
                          alt={inmobiliaria.nombre}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="p-4 md:p-5 space-y-3 bg-white flex-grow flex flex-col">
                      {/* Nombre */}
                      <h3 style={{ color: '#006B4E', fontSize: 'var(--font-size-body-lg)', fontWeight: 'var(--font-weight-semibold)', fontFamily: 'Montserrat, sans-serif' }}>
                        {language === 'en' && (inmobiliaria as any).nombreEn ? (inmobiliaria as any).nombreEn : inmobiliaria.nombre}
                      </h3>

                      {/* Descripción */}
                      <p className="text-sm text-gray-600 line-clamp-2 flex-grow" style={{ fontSize: 'var(--font-size-body-sm)', lineHeight: 'var(--line-height-body)' }}>
                        {language === 'en' && (inmobiliaria as any).descripcionEn ? (inmobiliaria as any).descripcionEn : inmobiliaria.descripcion}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {renderStars(inmobiliaria.rating)}
                        </div>
                        <span style={{ fontSize: 'var(--font-size-xs)', color: '#525252', fontFamily: 'Inter, sans-serif' }}>
                          {inmobiliaria.rating.toFixed(1)} · {inmobiliaria.numResenas} {t.inmobiliarias.reviews}
                        </span>
                      </div>

                      {/* Zonas de operación — badges */}
                      <div className="flex flex-wrap gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        {inmobiliaria.zonas.map(zona => (
                          <span
                            key={zona}
                            className="px-2 py-0.5 rounded-full text-xs"
                            style={{ backgroundColor: '#F0F5EB', color: '#3D5E28', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                          >
                            {zona}
                          </span>
                        ))}
                      </div>

                      {/* CTAs */}
                      <div className="pt-3 border-t border-gray-200 flex flex-col gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleContactar(inmobiliaria.nombre); }}
                          className="w-full bg-[#006B4E] hover:bg-[#01533E] text-white px-4 py-2.5 rounded-[200px] transition-colors text-sm font-medium"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          {t.inmobiliarias.contact}
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleVerDetalle(inmobiliaria.nombre); }}
                          className="w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 px-4 py-2.5 rounded-[200px] transition-colors text-sm font-medium"
                          style={{ fontFamily: 'Inter, sans-serif', color: '#0A0A0A' }}
                        >
                          {t.inmobiliarias.viewAgency}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </section>
      </main>

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        parcelaNombre={t.inmobiliarias.generalInquiry}
        parcelaUbicacion={t.nav.inmobiliarias}
        vendedorNombre={selectedInmobiliaria}
        vendedorTipo="inmobiliaria"
      />

      {/* Drawer de menú móvil */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="fixed left-0 top-0 bottom-0 w-[85vw] max-w-sm bg-white overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{ 
              animation: 'slideInLeft 0.3s ease-out',
              boxShadow: '4px 0 24px rgba(0, 0, 0, 0.1)'
            }}
          >
            {/* Header del drawer */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-3 sm:p-4 flex items-center justify-between z-10">
              <img 
                src={logo} 
                alt="CompraTuParcela" 
                className="h-10" 
              />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Contenido del menú */}
            <div className="p-3 sm:p-4">
              {/* Navegación principal */}
              <nav className="space-y-2 mb-6">
                <button
                  onClick={() => {
                    onNavigate('parcelas');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-[#efefef] text-black rounded-[12px] transition-colors"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    fontWeight: 500
                  }}
                >
                  {t.nav.parcelas}
                </button>
                <button
                  onClick={() => {
                    onNavigate('inmobiliarias');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 bg-[#efefef] text-black rounded-[12px] transition-colors"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    fontWeight: 500
                  }}
                >
                  {t.nav.inmobiliarias}
                </button>
                <button
                  onClick={() => {
                    onNavigate('como-funciona');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-[#efefef] text-black rounded-[12px] transition-colors"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    fontWeight: 500
                  }}
                >
                  {t.nav.howItWorks}
                </button>
                <button
                  onClick={() => {
                    onNavigate('recursos');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-[#efefef] text-black rounded-[12px] transition-colors"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    fontWeight: 500
                  }}
                >
                  {t.nav.resources}
                </button>
              </nav>

              {/* Divisor */}
              <div className="border-t border-gray-200 my-6"></div>

              {/* Selector de idioma y moneda */}
              <div className="mb-4">
                <LanguageCurrencySelector variant="sidebar" />
              </div>

              {/* Botones de acción */}
              <div className="space-y-3">
                <button
                  className="w-full bg-[#006B4E] hover:bg-[#01533E] text-white py-3 px-4 rounded-[200px] transition-colors"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    fontWeight: 500
                  }}
                >
                  {t.nav.publishProperty}
                </button>
                <button
                  onClick={() => {
                    onNavigate('entry');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-[#efefef] hover:bg-[#dedede] text-black py-3 px-4 rounded-[200px] transition-colors"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    fontWeight: 500
                  }}
                >
                  {t.nav.login}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer - Responsive */}
      <footer className="bg-white py-8 sm:py-10 md:py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-x-12 sm:gap-y-10 mb-6 sm:mb-8">
            <div className="space-y-4 sm:col-span-2 lg:col-span-1">
              <img src={logo} alt="CompraTuParcela" className="h-14 sm:h-16" />
              <p style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                fontWeight: 'var(--font-weight-regular)',
                color: '#737373',
                lineHeight: 'var(--line-height-body)'
              }}>
                {t.home.footerDesc}
              </p>
            </div>
            
            <div className="space-y-3">
              <div style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-xs)',
                fontWeight: 'var(--font-weight-bold)',
                color: '#0A0A0A',
                letterSpacing: 'var(--letter-spacing-wide)'
              }}>{t.home.footerExplore.toUpperCase()}</div>
              <div className="space-y-2.5">
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-regular)', color: '#525252' }}>{t.nav.parcelas}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-regular)', color: '#525252' }}>{t.nav.inmobiliarias}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-regular)', color: '#525252' }}>{t.home.footerBlog}</div>
              </div>
            </div>

            <div className="space-y-3">
              <div style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-xs)',
                fontWeight: 'var(--font-weight-bold)',
                color: '#0A0A0A',
                letterSpacing: 'var(--letter-spacing-wide)'
              }}>{t.home.footerPlatform.toUpperCase()}</div>
              <div className="space-y-2.5">
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-regular)', color: '#525252' }}>{t.home.footerHowItWorks}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-regular)', color: '#525252' }}>{t.home.footerPublish}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-regular)', color: '#525252' }}>{t.home.footerPlans}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-regular)', color: '#525252' }}>{t.home.footerBrokers}</div>
              </div>
            </div>

            <div className="space-y-3">
              <div style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-xs)',
                fontWeight: 'var(--font-weight-bold)',
                color: '#0A0A0A',
                letterSpacing: 'var(--letter-spacing-wide)'
              }}>{t.home.footerSupport.toUpperCase()}</div>
              <div className="space-y-2.5">
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-regular)', color: '#525252' }}>{t.home.footerHelp}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-regular)', color: '#525252' }}>{t.home.footerTerms}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-regular)', color: '#525252' }}>{t.home.footerPrivacy}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-regular)', color: '#525252' }}>{t.home.footerContact}</div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-6 sm:pt-8 border-t" style={{ borderColor: '#E5E5E5' }}>
            <p className="text-center" style={{ 
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-xs)',
              fontWeight: 'var(--font-weight-regular)',
              color: '#A3A3A3'
            }}>
              {t.home.footerCopyright}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}