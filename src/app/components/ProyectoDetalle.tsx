import { SiteFooter } from '@/app/components/SiteFooter';
import { useI18n } from '@/app/i18n/i18nContext';
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Home, MapPin, Phone, Mail, ExternalLink, Droplets, Zap, Route, TreePine, Users, Building2, Shield, Mountain, Sprout, Eye, Waves, Expand, Download, FileText, ChevronDown, ChevronUp, Navigation, School, ShoppingBag, TrendingUp, MessageSquare, Package, Maximize2, Sparkles, Heart, Map, Info, ShoppingCart, Settings, FileCheck, Droplet } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { PublicadoPor } from '@/app/components/PublicadoPor';
import { ContactModal } from '@/app/components/ContactModal';
import { ReservaVisitaModal } from '@/app/components/ReservaVisitaModal';
import { ConsultaOnlineModal } from '@/app/components/ConsultaOnlineModal';
import { PrecioDisplay } from '@/app/components/PrecioDisplay';
import { getProyectoByIdWithIcons } from '@/app/data/proyectosDataWithIcons';
import logo from 'figma:asset/a4719ce43ce52ee49df30a2a5c090c8a8b743667.png';

interface ProyectoDetalleProps {
  onNavigate: (screen: string, id?: number, data?: string) => void;
  proyectoId?: number | null;
}

// Mapeo de características a iconos (reutilizando del ProjectCard)
const getCaracteristicaIcon = (caracteristica: string) => {
  const lower = caracteristica.toLowerCase();
  
  if (lower.includes('agua')) return <Droplets className="w-5 h-5" />;
  if (lower.includes('electricidad') || lower.includes('luz')) return <Zap className="w-5 h-5" />;
  if (lower.includes('camino') || lower.includes('pavimentado')) return <Route className="w-5 h-5" />;
  if (lower.includes('acceso directo')) return <Route className="w-5 h-5" />;
  if (lower.includes('acceso') && lower.includes('controlado')) return <Shield className="w-5 h-5" />;
  if (lower.includes('portería') || (lower.includes('seguridad') && !lower.includes('sustentable'))) return <Shield className="w-5 h-5" />;
  if (lower.includes('áreas verdes') || lower.includes('verde')) return <TreePine className="w-5 h-5" />;
  if (lower.includes('bosque')) return <TreePine className="w-5 h-5" />;
  if (lower.includes('senderos')) return <Route className="w-5 h-5" />;
  if (lower.includes('quincho') || lower.includes('común')) return <Users className="w-5 h-5" />;
  if (lower.includes('club house') || lower.includes('club')) return <Building2 className="w-5 h-5" />;
  if (lower.includes('riego')) return <Droplets className="w-5 h-5" />;
  if (lower.includes('suelo') || lower.includes('fértil')) return <Sprout className="w-5 h-5" />;
  if (lower.includes('vista')) return <Eye className="w-5 h-5" />;
  if (lower.includes('río')) return <Waves className="w-5 h-5" />;
  if (lower.includes('cordillerano') || lower.includes('entorno')) return <Mountain className="w-5 h-5" />;
  if (lower.includes('santiago') || lower.includes('1h')) return <MapPin className="w-5 h-5" />;
  if (lower.includes('sustentable') || lower.includes('diseño')) return <TreePine className="w-5 h-5" />;
  if (lower.includes('fibra') || lower.includes('iluminación') || lower.includes('led')) return <Zap className="w-5 h-5" />;
  if (lower.includes('piscina') || lower.includes('cancha') || lower.includes('mirador')) return <Users className="w-5 h-5" />;
  
  return <Building2 className="w-5 h-5" />;
};

// Mapeo de tipo de proyecto a icono
const getTipoIcon = (tipo: string) => {
  switch (tipo) {
    case 'Residencial':
      return <Home className="w-5 h-5" />;
    case 'Turístico':
      return <TreePine className="w-5 h-5" />;
    case 'Agrícola':
      return <Building2 className="w-5 h-5" />;
    case 'Mixto':
      return <Users className="w-5 h-5" />;
    default:
      return <Building2 className="w-5 h-5" />;
  }
};

export function ProyectoDetalle({ onNavigate, proyectoId }: ProyectoDetalleProps) {
  const { t } = useI18n();
  const [selectedImage, setSelectedImage] = useState(0);
  const [ubicacionTab, setUbicacionTab] = useState<'panoramica' | 'plano' | 'mapa'>('mapa');
  const [isDocumentosOpen, setIsDocumentosOpen] = useState(true);
  const [isDocTecnicaOpen, setIsDocTecnicaOpen] = useState(false);
  const [isStockOpen, setIsStockOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isReservaVisitaOpen, setIsReservaVisitaOpen] = useState(false);
  const [isConsultaOnlineOpen, setIsConsultaOnlineOpen] = useState(false);

  // Obtener datos dinámicos del proyecto
  // Si proyectoId es null o undefined, usar 1 por defecto
  const idToUse = proyectoId ?? 1;
  const proyectoData = getProyectoByIdWithIcons(idToUse);
  
  // Si no se encuentra el proyecto, usar el primero por defecto
  const proyecto = proyectoData || getProyectoByIdWithIcons(1)!;

  // Debug: verificar si tiene plano y documentos
  console.log('Proyecto:', proyecto.nombre);
  console.log('Tiene plano:', !!proyecto.plano);
  console.log('Tiene documentos:', proyecto.documentos?.length || 0);

  const getEstadoBadgeStyles = () => {
    switch (proyecto.estado) {
      case 'En venta':
        return { backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#16a34a', border: '1px solid rgba(34, 197, 94, 0.2)' };
      case 'Próximamente':
        return { backgroundColor: 'rgba(0, 107, 78, 0.1)', color: '#006B4E', border: '1px solid rgba(0, 107, 78, 0.2)' };
      case 'En construcción':
        return { backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#d97706', border: '1px solid rgba(245, 158, 11, 0.2)' };
      default:
        return { backgroundColor: 'rgba(156, 163, 175, 0.1)', color: '#6b7280', border: '1px solid rgba(156, 163, 175, 0.2)' };
    }
  };

  const estadoStyles = getEstadoBadgeStyles();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAFA' }}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50" style={{ borderBottom: '1px solid #E5E5E5' }}>
        <div className="max-w-[1400px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo y Navegación */}
            <div className="flex items-center gap-8">
              <img 
                src={logo} 
                alt="CompraTuParcela" 
                className="h-14 cursor-pointer" 
                onClick={() => onNavigate('home')}
              />
              
              <nav className="flex items-center gap-1">
                <button 
                  onClick={() => onNavigate('parcelas')}
                  className="px-4 py-2 text-sm rounded-full hover:bg-gray-50 transition-colors"
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    color: '#737373'
                  }}
                >
                  Parcelas
                </button>
                <button 
                  onClick={() => onNavigate('inmobiliarias')}
                  className="px-4 py-2 text-sm rounded-full hover:bg-gray-50 transition-colors"
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    color: '#737373'
                  }}
                >
                  Inmobiliarias
                </button>
                <button 
                  onClick={() => onNavigate('como-funciona')}
                  className="px-4 py-2 text-sm rounded-full hover:bg-gray-50 transition-colors"
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    color: '#737373'
                  }}
                >
                  Cómo funciona
                </button>
                <button 
                  onClick={() => onNavigate('recursos')}
                  className="px-4 py-2 text-sm rounded-full hover:bg-gray-50 transition-colors"
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    color: '#737373'
                  }}
                >
                  Recursos
                </button>
              </nav>
            </div>

            {/* Botones de acción */}
            <div className="flex items-center gap-3">
              <button 
                className="px-5 py-2 text-sm rounded-full transition-colors"
                style={{ 
                  fontFamily: 'var(--font-body)',
                  backgroundColor: '#0A0A0A',
                  color: '#FFFFFF',
                  fontWeight: 'var(--font-weight-medium)'
                }}
              >
                Publicar propiedad
              </button>
              <button 
                onClick={() => onNavigate('entry')}
                className="px-5 py-2 text-sm rounded-full transition-colors"
                style={{ 
                  fontFamily: 'var(--font-body)',
                  backgroundColor: '#F5F5F5',
                  color: '#0A0A0A',
                  fontWeight: 'var(--font-weight-medium)'
                }}
              >
                Ingresar
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24">
        <div className="max-w-[1400px] mx-auto px-8 py-8">
          {/* Breadcrumb */}
          <button 
            onClick={() => onNavigate('parcelas')}
            className="flex items-center gap-2 mb-8 transition-colors hover:text-gray-900"
            style={{ 
              fontFamily: 'var(--font-body)',
              color: '#737373',
              fontSize: 'var(--font-size-body-sm)'
            }}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{t.detail.backToParcels}</span>
          </button>

          {/* Layout: 2 columnas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Columna izquierda - Contenido principal */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Título principal y metadatos */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <h1 style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 'var(--font-weight-light)',
                    fontSize: 'var(--font-size-h1)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-heading)',
                    letterSpacing: 'var(--letter-spacing-tight)'
                  }}>
                    {proyecto.nombre}
                  </h1>

                  {/* Botones de acción */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100" style={{ border: '1px solid #E5E5E5' }}>
                      <Sparkles className="w-4 h-4" style={{ color: '#0A0A0A' }} />
                    </button>
                    <button className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100" style={{ border: '1px solid #E5E5E5' }}>
                      <Map className="w-4 h-4" style={{ color: '#0A0A0A' }} />
                    </button>
                    <button className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100" style={{ border: '1px solid #E5E5E5' }}>
                      <Heart className="w-4 h-4" style={{ color: '#0A0A0A' }} />
                    </button>
                  </div>
                </div>

                {/* Subtítulo - Ubicación */}
                <p className="flex items-center gap-2" style={{
                  fontFamily: 'var(--font-body)',
                  color: '#737373',
                  fontSize: 'var(--font-size-body-lg)',
                  fontWeight: 'var(--font-weight-regular)',
                  lineHeight: 'var(--line-height-body)'
                }}>
                  <MapPin className="w-5 h-5" style={{ color: '#006B4E' }} />
                  {proyecto.ubicacion}, {proyecto.region}
                </p>
              </div>
              
              {/* Galería de imágenes */}
              <div className="space-y-4">
                {/* Imagen principal */}
                <div className="w-full aspect-[16/9] bg-white overflow-hidden rounded-xl border border-gray-200 shadow-sm relative group">
                  <ImageWithFallback 
                    src={proyecto.imagenes[selectedImage]} 
                    alt={proyecto.nombre}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Navegación de imágenes - visible en hover */}
                  <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage((prev) => (prev === 0 ? proyecto.imagenes.length - 1 : prev - 1));
                      }}
                      className="pointer-events-auto w-10 h-10 rounded-full flex items-center justify-center transition-all hover:opacity-90"
                      style={{ 
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E5E5E5',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                      }}
                      aria-label={t.detail.prevImage}
                    >
                      <ChevronLeft className="w-5 h-5" style={{ color: '#0A0A0A' }} />
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage((prev) => (prev === proyecto.imagenes.length - 1 ? 0 : prev + 1));
                      }}
                      className="pointer-events-auto w-10 h-10 rounded-full flex items-center justify-center transition-all hover:opacity-90"
                      style={{ 
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E5E5E5',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                      }}
                      aria-label={t.detail.nextImage}
                    >
                      <ChevronRight className="w-5 h-5" style={{ color: '#0A0A0A' }} />
                    </button>
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-4 gap-3">
                  {proyecto.imagenes.map((imagen, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-[4/3] bg-white overflow-hidden rounded-lg transition-all border-2 ${
                        selectedImage !== index ? 'border-gray-200 hover:border-gray-400' : ''
                      }`}
                      style={selectedImage === index ? { borderColor: '#006B4E', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' } : {}}
                    >
                      <ImageWithFallback 
                        src={imagen} 
                        alt={`Vista ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Descripción del proyecto */}
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <h2 style={{ 
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 'var(--font-weight-regular)',
                  fontSize: 'var(--font-size-h3)',
                  color: '#0A0A0A',
                  marginBottom: '16px'
                }}>
                  {t.detail.aboutProject}
                </h2>
                <p style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-md)',
                  color: '#525252',
                  lineHeight: 'var(--line-height-body)',
                  whiteSpace: 'pre-line'
                }}>
                  {proyecto.descripcionCompleta}
                </p>
              </div>

              {/* Información general del proyecto - Cards con iconos */}
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <h2 style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 'var(--font-weight-regular)',
                  fontSize: 'var(--font-size-h3)',
                  color: '#0A0A0A',
                  marginBottom: '24px'
                }}>
                  {t.detail.generalInfo}
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Total de parcelas */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Home className="w-5 h-5" style={{ color: '#737373' }} />
                      <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-xs)',
                        color: '#737373',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        {t.detail.totalParcels}
                      </span>
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-lg)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: '#0A0A0A'
                    }}>
                      {proyecto.totalParcelas}
                    </div>
                  </div>

                  {/* Parcelas disponibles */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Home className="w-5 h-5" style={{ color: '#16a34a' }} />
                      <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-xs)',
                        color: '#737373',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        {t.detail.availableCount}
                      </span>
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-lg)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: '#16a34a'
                    }}>
                      {proyecto.parcelasDisponibles}
                    </div>
                  </div>

                  {/* Superficie desde */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Expand className="w-5 h-5" style={{ color: '#737373' }} />
                      <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-xs)',
                        color: '#737373',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        {t.detail.surfaceFrom}
                      </span>
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-lg)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: '#0A0A0A'
                    }}>
                      {proyecto.superficieDesde}
                    </div>
                  </div>

                  {/* Superficie hasta */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Expand className="w-5 h-5" style={{ color: '#737373' }} />
                      <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-xs)',
                        color: '#737373',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        {t.detail.surfaceTo}
                      </span>
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-lg)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: '#0A0A0A'
                    }}>
                      {proyecto.superficieHasta}
                    </div>
                  </div>
                </div>
              </div>

              {/* Ubicación */}
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <h2 style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 'var(--font-weight-regular)',
                  fontSize: 'var(--font-size-h3)',
                  color: '#0A0A0A',
                  marginBottom: '24px'
                }}>
                  {t.detail.location}
                </h2>

                {/* Dirección */}
                <div className="flex items-start gap-2 mb-6 px-4 py-3 rounded-xl" style={{ backgroundColor: '#F5F5F5' }}>
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#006B4E' }} />
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', color: '#0A0A0A', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', marginBottom: '2px' }}>
                      {proyecto.ubicacion}, {proyecto.region}
                    </p>
                    <p style={{ fontFamily: 'var(--font-body)', color: '#737373', fontSize: 'var(--font-size-xs)' }}>
                      {proyecto.direccion}
                    </p>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex mb-6" style={{ borderBottom: '1px solid #E5E5E5' }}>
                  <button
                    onClick={() => setUbicacionTab('panoramica')}
                    className="flex items-center gap-2 pb-3 px-4 transition-colors"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: ubicacionTab === 'panoramica' ? 'var(--font-weight-semibold)' : 'var(--font-weight-regular)',
                      color: ubicacionTab === 'panoramica' ? '#006B4E' : '#737373',
                      borderBottom: ubicacionTab === 'panoramica' ? '2px solid #006B4E' : '2px solid transparent',
                      marginBottom: '-1px'
                    }}
                  >
                    <Maximize2 className="w-4 h-4" />
                    360°
                  </button>
                  <button
                    onClick={() => setUbicacionTab('plano')}
                    className="flex items-center gap-2 pb-3 px-4 transition-colors"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: ubicacionTab === 'plano' ? 'var(--font-weight-semibold)' : 'var(--font-weight-regular)',
                      color: ubicacionTab === 'plano' ? '#006B4E' : '#737373',
                      borderBottom: ubicacionTab === 'plano' ? '2px solid #006B4E' : '2px solid transparent',
                      marginBottom: '-1px'
                    }}
                  >
                    <FileText className="w-4 h-4" />
                    Plano
                  </button>
                  <button
                    onClick={() => setUbicacionTab('mapa')}
                    className="flex items-center gap-2 pb-3 px-4 transition-colors"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: ubicacionTab === 'mapa' ? 'var(--font-weight-semibold)' : 'var(--font-weight-regular)',
                      color: ubicacionTab === 'mapa' ? '#006B4E' : '#737373',
                      borderBottom: ubicacionTab === 'mapa' ? '2px solid #006B4E' : '2px solid transparent',
                      marginBottom: '-1px'
                    }}
                  >
                    <MapPin className="w-4 h-4" />
                    Mapa
                  </button>
                </div>

                {/* Contenido de tabs */}
                {ubicacionTab === 'mapa' ? (
                  <div className="aspect-[16/9] bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                    <iframe
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      style={{ border: 0 }}
                      src={`https://www.google.com/maps?q=${proyecto.coordenadas.lat},${proyecto.coordenadas.lng}&output=embed`}
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : ubicacionTab === 'plano' ? (
                  <div className="aspect-[16/9] bg-white overflow-hidden rounded-xl border border-gray-200 flex items-center justify-center">
                    <ImageWithFallback
                      src={proyecto.masterplan}
                      alt="Plano del proyecto"
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="aspect-[16/9] overflow-hidden rounded-xl border border-gray-200">
                    <iframe
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      src={`https://www.google.com/maps/embed?pb=!4v1705234567890!6m8!1m7!1sCAoSLEFGMVFpcE5oVXZ4cGtWZjR0ZXN0!2m2!1d${proyecto.coordenadas.lat}!2d${proyecto.coordenadas.lng}!3f0!4f0!5f0.7`}
                    />
                  </div>
                )}
              </div>

              {/* Características - COPIADO EXACTO DE PARCELADETALLE */}
              {(proyecto.caracteristicasTerreno || proyecto.caracteristicasServicios || proyecto.caracteristicasLegal) && (
                <div className="bg-white rounded-xl border border-gray-200 p-8">
                  <h2 style={{ 
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 'var(--font-weight-regular)',
                    fontSize: 'var(--font-size-h2)',
                    color: '#0A0A0A',
                    marginBottom: '2rem'
                  }}>
                    {t.detail.characteristics}
                  </h2>

                  <div className="space-y-6">
                    {/* Grupo: Terreno */}
                    {proyecto.caracteristicasTerreno && proyecto.caracteristicasTerreno.length > 0 && (
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 style={{ 
                          fontFamily: 'var(--font-heading)',
                          fontWeight: 'var(--font-weight-medium)',
                          fontSize: 'var(--font-size-body-lg)',
                          color: '#0A0A0A',
                          marginBottom: '1.5rem'
                        }}>
                          {t.detail.land}
                        </h3>
                        <div className="flex gap-4">
                          {proyecto.caracteristicasTerreno.map((carac, index) => (
                            <div key={index} className="flex-1 flex flex-col items-center text-center gap-4 min-w-0">
                              {carac.icon && (
                                <div 
                                  className="w-14 h-14 rounded-full bg-white flex items-center justify-center border border-gray-200 flex-shrink-0"
                                  style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.05)' }}
                                >
                                  <div style={{ color: '#006B4E' }}>{carac.icon}</div>
                                </div>
                              )}
                              <div className="w-full">
                                <p style={{ 
                                  fontFamily: 'var(--font-body)',
                                  color: '#0A0A0A',
                                  fontSize: 'var(--font-size-body-sm)',
                                  fontWeight: 'var(--font-weight-medium)',
                                  marginBottom: '0.375rem',
                                  lineHeight: '1.4'
                                }}>
                                  {carac.valor}
                                </p>
                                <p style={{ 
                                  fontFamily: 'var(--font-body)',
                                  color: '#737373',
                                  fontSize: 'var(--font-size-xs)',
                                  fontWeight: 'var(--font-weight-regular)',
                                  lineHeight: '1.4'
                                }}>
                                  {carac.label}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Grupo: Servicios */}
                    {proyecto.caracteristicasServicios && proyecto.caracteristicasServicios.length > 0 && (
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 style={{ 
                          fontFamily: 'var(--font-heading)',
                          fontWeight: 'var(--font-weight-medium)',
                          fontSize: 'var(--font-size-body-lg)',
                          color: '#0A0A0A',
                          marginBottom: '1.5rem'
                        }}>
                          {t.detail.services}
                        </h3>
                        <div className="flex gap-4">
                          {proyecto.caracteristicasServicios.map((carac, index) => (
                            <div key={index} className="flex-1 flex flex-col items-center text-center gap-4 min-w-0">
                              {carac.icon && (
                                <div 
                                  className="w-14 h-14 rounded-full bg-white flex items-center justify-center border border-gray-200 flex-shrink-0"
                                  style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.05)' }}
                                >
                                  <div style={{ color: '#006B4E' }}>{carac.icon}</div>
                                </div>
                              )}
                              <div className="w-full">
                                <p style={{ 
                                  fontFamily: 'var(--font-body)',
                                  color: '#0A0A0A',
                                  fontSize: 'var(--font-size-body-sm)',
                                  fontWeight: 'var(--font-weight-medium)',
                                  marginBottom: '0.375rem',
                                  lineHeight: '1.4'
                                }}>
                                  {carac.valor}
                                </p>
                                <p style={{ 
                                  fontFamily: 'var(--font-body)',
                                  color: '#737373',
                                  fontSize: 'var(--font-size-xs)',
                                  fontWeight: 'var(--font-weight-regular)',
                                  lineHeight: '1.4'
                                }}>
                                  {carac.label}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Grupo: Estado Legal */}
                    {proyecto.caracteristicasLegal && proyecto.caracteristicasLegal.length > 0 && (
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 style={{ 
                          fontFamily: 'var(--font-heading)',
                          fontWeight: 'var(--font-weight-medium)',
                          fontSize: 'var(--font-size-body-lg)',
                          color: '#0A0A0A',
                          marginBottom: '1.5rem'
                        }}>
                          {t.detail.legalStatus}
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                          {proyecto.caracteristicasLegal.map((carac, index) => (
                            <div key={index} className="flex flex-col items-center text-center gap-4">
                              {carac.icon && (
                                <div 
                                  className="w-14 h-14 rounded-full bg-white flex items-center justify-center border border-gray-200 flex-shrink-0"
                                  style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.05)' }}
                                >
                                  <div style={{ color: '#006B4E' }}>{carac.icon}</div>
                                </div>
                              )}
                              <div>
                                <p style={{ 
                                  fontFamily: 'var(--font-body)',
                                  color: '#0A0A0A',
                                  fontSize: 'var(--font-size-body-sm)',
                                  fontWeight: 'var(--font-weight-medium)',
                                  marginBottom: '0.375rem',
                                  lineHeight: '1.4'
                                }}>
                                  {carac.valor}
                                </p>
                                <p style={{ 
                                  fontFamily: 'var(--font-body)',
                                  color: '#737373',
                                  fontSize: 'var(--font-size-xs)',
                                  fontWeight: 'var(--font-weight-regular)',
                                  lineHeight: '1.4'
                                }}>
                                  {carac.label}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Información del entorno */}
              {proyecto.entorno && (
                <div className="mt-16 pt-12" style={{ borderTop: '1px solid #E5E5E5' }}>
                  <div className="mb-8">
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-regular)', fontSize: 'var(--font-size-h2)', color: '#0A0A0A', marginBottom: '0.5rem' }}>
                      {t.detail.surroundingInfo}
                    </h2>
                    <p style={{ fontFamily: 'var(--font-body)', color: '#737373', fontSize: 'var(--font-size-body-sm)', lineHeight: 'var(--line-height-body)' }}>
                      {t.detail.knowMoreArea}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(0, 107, 78, 0.08)' }}>
                          <Navigation className="w-5 h-5" style={{ color: '#006B4E' }} />
                        </div>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-body-lg)', color: '#0A0A0A' }}>
                          {t.detail.accessConnectivity}
                        </h3>
                      </div>
                      <div className="space-y-5">
                        <div>
                          <div className="flex items-end justify-between mb-2">
                            <span style={{ fontFamily: 'var(--font-body)', color: '#737373', fontSize: 'var(--font-size-xs)' }}>{t.detail.timeToCenter}</span>
                            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-h3)', color: '#0A0A0A' }}>{proyecto.entorno.accesos.tiempoAlCentro}</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min((proyecto.entorno.accesos.tiempoAlCentroMinutos / 60) * 100, 100)}%`, backgroundColor: '#647E3F' }} />
                          </div>
                          <p style={{ fontFamily: 'var(--font-body)', color: '#A3A3A3', fontSize: 'var(--font-size-xs)', marginTop: '0.5rem' }}>{proyecto.entorno.accesos.ciudadCercana}</p>
                        </div>
                        <div>
                          <span style={{ fontFamily: 'var(--font-body)', color: '#737373', fontSize: 'var(--font-size-xs)', display: 'block', marginBottom: '0.75rem' }}>{t.detail.accessType}</span>
                          <div className="flex items-center gap-2">
                            {[1, 2, 3, 4].map((bar) => (<div key={bar} className="flex-1 h-2 rounded-full" style={{ backgroundColor: bar <= proyecto.entorno!.accesos.calidadAcceso ? '#647E3F' : '#F3F4F6' }} />))}
                          </div>
                          <p style={{ fontFamily: 'var(--font-body)', color: '#0A0A0A', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', marginTop: '0.75rem' }}>{proyecto.entorno.accesos.tipoAcceso}</p>
                        </div>
                        <div className="pt-4" style={{ borderTop: '1px solid #E5E5E5' }}>
                          <div className="flex items-center justify-between">
                            <span style={{ fontFamily: 'var(--font-body)', color: '#737373', fontSize: 'var(--font-size-xs)' }}>{proyecto.entorno.accesos.ciudadPrincipal}</span>
                            <span style={{ fontFamily: 'var(--font-body)', color: '#0A0A0A', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)' }}>{proyecto.entorno.accesos.distanciaCiudadPrincipal}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(0, 107, 78, 0.08)' }}>
                          <ShoppingBag className="w-5 h-5" style={{ color: '#006B4E' }} />
                        </div>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-body-lg)', color: '#0A0A0A' }}>{t.detail.nearbyServices}</h3>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <School className="w-4 h-4 text-gray-500" />
                              <span style={{ fontFamily: 'var(--font-body)', color: '#525252', fontSize: 'var(--font-size-xs)' }}>{t.detail.education}</span>
                            </div>
                            <span style={{ fontFamily: 'var(--font-body)', color: '#0A0A0A', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)' }}>{proyecto.entorno.servicios.educacion.nivel}</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${proyecto.entorno.servicios.educacion.porcentaje}%`, backgroundColor: '#647E3F' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <ShoppingBag className="w-4 h-4 text-gray-500" />
                              <span style={{ fontFamily: 'var(--font-body)', color: '#525252', fontSize: 'var(--font-size-xs)' }}>{t.detail.commerce}</span>
                            </div>
                            <span style={{ fontFamily: 'var(--font-body)', color: '#0A0A0A', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)' }}>{proyecto.entorno.servicios.comercio.nivel}</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${proyecto.entorno.servicios.comercio.porcentaje}%`, backgroundColor: '#647E3F' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Home className="w-4 h-4 text-gray-500" />
                              <span style={{ fontFamily: 'var(--font-body)', color: '#525252', fontSize: 'var(--font-size-xs)' }}>{t.detail.health}</span>
                            </div>
                            <span style={{ fontFamily: 'var(--font-body)', color: '#0A0A0A', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)' }}>{proyecto.entorno.servicios.salud.nivel}</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${proyecto.entorno.servicios.salud.porcentaje}%`, backgroundColor: '#647E3F' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <TreePine className="w-4 h-4 text-gray-500" />
                              <span style={{ fontFamily: 'var(--font-body)', color: '#525252', fontSize: 'var(--font-size-xs)' }}>{t.detail.recreation}</span>
                            </div>
                            <span style={{ fontFamily: 'var(--font-body)', color: '#0A0A0A', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)' }}>{proyecto.entorno.servicios.recreacion.nivel}</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${proyecto.entorno.servicios.recreacion.porcentaje}%`, backgroundColor: '#647E3F' }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(0, 107, 78, 0.08)' }}>
                          <TreePine className="w-5 h-5" style={{ color: '#006B4E' }} />
                        </div>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-body-lg)', color: '#0A0A0A' }}>{t.detail.naturalSurroundings}</h3>
                      </div>
                      <div className="space-y-5">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span style={{ fontFamily: 'var(--font-body)', color: '#737373', fontSize: 'var(--font-size-xs)' }}>{t.detail.nature}</span>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((bar) => (<div key={bar} className="w-2 h-8 rounded-sm" style={{ backgroundColor: bar <= proyecto.entorno!.naturaleza.nivel ? '#647E3F' : '#F3F4F6' }} />))}
                            </div>
                          </div>
                          <p style={{ fontFamily: 'var(--font-body)', color: '#525252', fontSize: 'var(--font-size-xs)' }}>{proyecto.entorno.naturaleza.descripcion}</p>
                        </div>
                        <div className="pt-4" style={{ borderTop: '1px solid #E5E5E5' }}>
                          <div className="flex items-center justify-between mb-3">
                            <span style={{ fontFamily: 'var(--font-body)', color: '#737373', fontSize: 'var(--font-size-xs)' }}>{t.detail.views}</span>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((bar) => (<div key={bar} className="w-2 h-8 rounded-sm" style={{ backgroundColor: bar <= proyecto.entorno!.naturaleza.vistas ? '#647E3F' : '#F3F4F6' }} />))}
                            </div>
                          </div>
                          <p style={{ fontFamily: 'var(--font-body)', color: '#525252', fontSize: 'var(--font-size-xs)' }}>{proyecto.entorno.naturaleza.descripcionVistas}</p>
                        </div>
                        <div className="pt-4" style={{ borderTop: '1px solid #E5E5E5' }}>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <span style={{ fontFamily: 'var(--font-body)', color: '#737373', fontSize: 'var(--font-size-xs)', display: 'block', marginBottom: '0.25rem' }}>{t.detail.avgTemp}</span>
                              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-h4)', color: '#0A0A0A' }}>{proyecto.entorno.naturaleza.temperaturaPromedio}</span>
                            </div>
                            <div>
                              <span style={{ fontFamily: 'var(--font-body)', color: '#737373', fontSize: 'var(--font-size-xs)', display: 'block', marginBottom: '0.25rem' }}>{t.detail.rainfall}</span>
                              <span style={{ fontFamily: 'var(--font-body)', color: '#0A0A0A', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)' }}>{proyecto.entorno.naturaleza.precipitaciones}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(0, 107, 78, 0.08)' }}>
                          <TrendingUp className="w-5 h-5" style={{ color: '#006B4E' }} />
                        </div>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-body-lg)', color: '#0A0A0A' }}>{t.detail.areaContext}</h3>
                      </div>
                      <div className="space-y-5">
                        <div>
                          <span style={{ fontFamily: 'var(--font-body)', color: '#737373', fontSize: 'var(--font-size-xs)', display: 'block', marginBottom: '0.5rem' }}>{t.detail.approxPop}</span>
                          <div className="flex items-baseline gap-2">
                            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-h2)', color: '#0A0A0A' }}>{proyecto.entorno.contexto.poblacion}</span>
                            <span style={{ fontFamily: 'var(--font-body)', color: '#A3A3A3', fontSize: 'var(--font-size-xs)' }}>{t.detail.inhabitants}</span>
                          </div>
                        </div>
                        <div className="pt-4" style={{ borderTop: '1px solid #E5E5E5' }}>
                          <span style={{ fontFamily: 'var(--font-body)', color: '#737373', fontSize: 'var(--font-size-xs)', display: 'block', marginBottom: '0.75rem' }}>{t.detail.mainActivities}</span>
                          <div className="space-y-2">
                            {proyecto.entorno.contexto.actividadesPrincipales.map((actividad, index) => (
                              <div key={index} className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#0A0A0A' }}>{index + 1}</span>
                                </div>
                                <span style={{ fontFamily: 'var(--font-body)', color: '#525252', fontSize: 'var(--font-size-body-sm)' }}>{actividad}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-5 rounded-xl bg-gray-50 border border-gray-200">
                    <p style={{ fontFamily: 'var(--font-body)', color: '#737373', fontSize: 'var(--font-size-xs)', lineHeight: 'var(--line-height-body)' }}>
                      {t.detail.referenceNote}
                    </p>
                  </div>
                </div>
              )}

              {/* Planos y documentos */}
              {(proyecto.documentos && proyecto.documentos.length > 0) && (
                <div className="bg-white rounded-xl border border-gray-200 p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(0, 107, 78, 0.08)' }}>
                        <FileText className="w-5 h-5" style={{ color: '#006B4E' }} />
                      </div>
                      <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-regular)', fontSize: 'var(--font-size-h2)', color: '#0A0A0A', margin: 0 }}>
                        {t.detail.plansDocuments}
                      </h2>
                    </div>
                    <button
                      onClick={() => setIsDocumentosOpen(!isDocumentosOpen)}
                      className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                      style={{ fontFamily: 'var(--font-body)', color: '#0A0A0A', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)' }}
                    >
                      <span>{isDocumentosOpen ? t.detail.hideDocuments : t.detail.showDocuments}</span>
                      {isDocumentosOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Masterplan */}
                  {proyecto.masterplan && (
                    <div className="flex items-center justify-between p-5 rounded-xl border border-gray-200 hover:border-gray-300 transition-all mb-3">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F5F5F5', border: '1px solid #E5E5E5' }}>
                          <FileText className="w-4 h-4" style={{ color: '#525252' }} />
                        </div>
                        <div>
                          <p style={{ fontFamily: 'var(--font-body)', color: '#0A0A0A', fontSize: 'var(--font-size-body-base)', fontWeight: 'var(--font-weight-semibold)', marginBottom: '0.375rem' }}>
                            {t.detail.masterplan}
                          </p>
                          <p style={{ fontFamily: 'var(--font-body)', color: '#737373', fontSize: 'var(--font-size-body-sm)' }}>
                            Plano general del proyecto
                          </p>
                        </div>
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-300 hover:bg-gray-50 hover:border-gray-900 transition-all flex-shrink-0 ml-4" style={{ fontFamily: 'var(--font-body)', color: '#0A0A0A', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                        <Download className="w-4 h-4" />
                        <span>{t.common.download}</span>
                      </button>
                    </div>
                  )}

                  {isDocumentosOpen && (
                    <div className="space-y-3">
                      {proyecto.documentos.map((doc, index) => (
                        <div key={index} className="flex items-start justify-between p-5 rounded-xl border border-gray-200 hover:border-gray-300 transition-all">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F5F5F5', border: '1px solid #E5E5E5' }}>
                              <FileText className="w-4 h-4" style={{ color: '#525252' }} />
                            </div>
                            <div className="flex-1">
                              <p style={{ fontFamily: 'var(--font-body)', color: '#0A0A0A', fontSize: 'var(--font-size-body-base)', fontWeight: 'var(--font-weight-semibold)', marginBottom: '0.375rem' }}>
                                {doc.nombre}
                              </p>
                              <p style={{ fontFamily: 'var(--font-body)', color: '#737373', fontSize: 'var(--font-size-body-sm)', lineHeight: 'var(--line-height-body)' }}>
                                {doc.tipo}
                              </p>
                            </div>
                          </div>
                          {doc.disponible ? (
                            <button className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-300 hover:bg-gray-50 hover:border-gray-900 transition-all flex-shrink-0 ml-4" style={{ fontFamily: 'var(--font-body)', color: '#0A0A0A', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                              <Download className="w-4 h-4" />
                              <span>{t.common.download}</span>
                            </button>
                          ) : (
                            <span style={{ fontFamily: 'var(--font-body)', color: '#A3A3A3', fontSize: 'var(--font-size-xs)' }}>{t.detail.notAvailable}</span>
                          )}
                        </div>
                      ))}

                      {/* Documentación técnica adicional */}
                      <div className="mt-2 pt-6 border-t" style={{ borderColor: '#E5E5E5' }}>
                        <button onClick={() => setIsDocTecnicaOpen(!isDocTecnicaOpen)} className="flex items-center justify-between w-full p-4 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center gap-3">
                            <Settings className="w-5 h-5" style={{ color: '#737373' }} />
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#525252', fontWeight: 'var(--font-weight-medium)' }}>
                              Documentación técnica adicional
                            </span>
                          </div>
                          {isDocTecnicaOpen ? <ChevronUp className="w-4 h-4" style={{ color: '#737373' }} /> : <ChevronDown className="w-4 h-4" style={{ color: '#737373' }} />}
                        </button>
                        {isDocTecnicaOpen && (
                          <div className="mt-4 space-y-3 pl-4">
                            {[
                              { nombre: 'Estudio de suelo', icon: <FileText className="w-5 h-5" style={{ color: '#737373' }} /> },
                              { nombre: 'Certificado de informaciones previas', icon: <FileCheck className="w-5 h-5" style={{ color: '#737373' }} /> },
                              { nombre: 'Plano regulador comunal', icon: <FileText className="w-5 h-5" style={{ color: '#737373' }} /> },
                              { nombre: 'Informe hidrológico', icon: <Droplet className="w-5 h-5" style={{ color: '#737373' }} /> },
                            ].map((doc) => (
                              <div key={doc.nombre} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all">
                                <div className="flex items-center gap-3 flex-1">
                                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">{doc.icon}</div>
                                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A', fontWeight: 'var(--font-weight-medium)' }}>{doc.nombre}</span>
                                </div>
                                <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 hover:bg-gray-50 transition-all" style={{ fontFamily: 'var(--font-body)', color: '#525252', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)' }}>
                                  <Download className="w-3.5 h-3.5" />
                                  <span>Descargar</span>
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Stock y disponibilidad */}
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                      <Package className="w-5 h-5 text-gray-700" />
                    </div>
                    <h2 style={{ 
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 'var(--font-weight-regular)',
                      fontSize: 'var(--font-size-h2)',
                      color: 'var(--foreground)',
                      margin: 0
                    }}>
                      {t.detail.stockAvailability}
                    </h2>
                  </div>
                  <button
                    onClick={() => setIsStockOpen(!isStockOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      color: 'var(--foreground)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)'
                    }}
                  >
                    <span>{isStockOpen ? t.detail.hideParcels : t.detail.showAvailableParcels}</span>
                    {isStockOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
                
                {/* Listado de parcelas - Colapsable */}
                {isStockOpen && (
                  <div className="space-y-3">
                    {[
                      { codigo: 'Parcela A-1', superficie: '5.000 m²', estado: 'disponible', estadoLabel: 'Disponible' },
                      { codigo: 'Parcela A-2', superficie: '5.200 m²', estado: 'disponible', estadoLabel: 'Disponible' },
                      { codigo: 'Parcela A-3', superficie: '4.800 m²', estado: 'reservado', estadoLabel: 'Reservado' },
                      { codigo: 'Parcela B-1', superficie: '6.500 m²', estado: 'disponible', estadoLabel: 'Disponible' },
                      { codigo: 'Parcela B-2', superficie: '6.300 m²', estado: 'vendido', estadoLabel: 'Vendido' },
                      { codigo: 'Parcela B-3', superficie: '6.700 m²', estado: 'disponible', estadoLabel: 'Disponible' },
                      { codigo: 'Parcela C-1', superficie: '8.000 m²', estado: 'disponible', estadoLabel: 'Disponible' },
                      { codigo: 'Parcela C-2', superficie: '7.800 m²', estado: 'reservado', estadoLabel: 'Reservado' },
                    ].map((parcela, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div>
                            <p style={{ 
                              fontFamily: 'var(--font-body)',
                              color: 'var(--foreground)',
                              fontSize: 'var(--font-size-body-base)',
                              fontWeight: 'var(--font-weight-semibold)',
                              marginBottom: '0.25rem'
                            }}>
                              {parcela.codigo}
                            </p>
                            <p style={{ 
                              fontFamily: 'var(--font-body)',
                              color: '#737373',
                              fontSize: 'var(--font-size-xs)'
                            }}>
                              {parcela.superficie}
                            </p>
                          </div>
                        </div>
                        <div 
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                          style={{ 
                            backgroundColor: parcela.estado === 'disponible' ? '#DCFCE7' : parcela.estado === 'reservado' ? '#FEF3C7' : '#F5F5F5',
                            border: `1px solid ${parcela.estado === 'disponible' ? '#BBF7D0' : parcela.estado === 'reservado' ? '#FDE68A' : '#E5E5E5'}`
                          }}
                        >
                          <div 
                            className="w-1.5 h-1.5 rounded-full" 
                            style={{ backgroundColor: parcela.estado === 'disponible' ? '#16A34A' : parcela.estado === 'reservado' ? '#CA8A04' : '#737373' }} 
                          />
                          <span style={{ 
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 'var(--font-weight-medium)',
                            color: parcela.estado === 'disponible' ? '#166534' : parcela.estado === 'reservado' ? '#854D0E' : '#525252'
                          }}>
                            {parcela.estadoLabel}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Parcelas disponibles dentro del proyecto */}
              {proyecto.parcelasDelProyecto && proyecto.parcelasDelProyecto.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-8">
                  <h2 style={{ 
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 'var(--font-weight-regular)',
                    fontSize: 'var(--font-size-h3)',
                    color: '#0A0A0A',
                    marginBottom: '24px'
                  }}>
                    Parcelas disponibles ({proyecto.parcelasDelProyecto.length})
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {proyecto.parcelasDelProyecto.map((parcela) => (
                      <div 
                        key={parcela.id}
                        className="border border-gray-200 rounded-xl overflow-hidden hover:border-gray-400 hover:shadow-md transition-all cursor-pointer group"
                      >
                        {/* Imagen */}
                        <div className="aspect-[4/3] bg-gray-200 overflow-hidden">
                          <ImageWithFallback 
                            src={parcela.imagen} 
                            alt={parcela.nombre}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        {/* Contenido */}
                        <div className="p-4 space-y-3">
                          <h3 style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-lg)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: '#0A0A0A'
                          }}>
                            {parcela.nombre}
                          </h3>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Expand className="w-4 h-4" style={{ color: '#737373' }} />
                              <span style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--font-size-body-sm)',
                                color: '#737373'
                              }}>
                                {parcela.superficie}
                              </span>
                            </div>

                            <PrecioDisplay 
                              precioCLP={parcela.precio}
                              precioSize="md"
                            />
                          </div>

                          <button 
                            className="w-full py-2 px-4 rounded-lg border border-gray-300 hover:border-gray-900 hover:bg-gray-50 transition-colors"
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--font-size-body-sm)',
                              fontWeight: 'var(--font-weight-medium)',
                              color: '#0A0A0A'
                            }}
                          >
                            {t.detail.viewParcel}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Columna derecha - Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-6">
                {/* Card de resumen y CTA */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <div className="space-y-4">
                    {/* Precio */}
                    <div>
                      <p style={{ fontSize: '11px', fontWeight: 600, color: '#737373', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-body)', marginBottom: '6px' }}>
                        {t.detail.basePricePerParcel}
                      </p>
                      <PrecioDisplay precioCLP={proyecto.precioDesde} precioSize="xl" />
                    </div>

                    {/* Primer dueño badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ border: '1px solid #E5E5E5' }}>
                      <Info className="w-3.5 h-3.5" style={{ color: '#006B4E' }} />
                      <span style={{ fontSize: '12px', color: '#0A0A0A', fontFamily: 'var(--font-body)' }}>Primer dueño</span>
                    </div>

                    {/* Separador */}
                    <div style={{ height: '1px', backgroundColor: '#E5E5E5' }} />

                    {/* Features grid */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                      <div className="flex items-center gap-1.5">
                        <Expand className="w-4 h-4 flex-shrink-0" style={{ color: '#006B4E' }} />
                        <span style={{ fontSize: '13px', color: '#0A0A0A', fontFamily: 'var(--font-body)' }}>{proyecto.superficieDesde}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Home className="w-4 h-4 flex-shrink-0" style={{ color: '#006B4E' }} />
                        <span style={{ fontSize: '13px', color: '#0A0A0A', fontFamily: 'var(--font-body)' }}>{proyecto.totalParcelas} parcelas</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 flex-shrink-0" style={{ color: '#006B4E' }} />
                        <span style={{ fontSize: '13px', color: '#0A0A0A', fontFamily: 'var(--font-body)' }}>{proyecto.parcelasDisponibles} disponibles</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: '#006B4E' }} />
                        <span style={{ fontSize: '13px', color: '#0A0A0A', fontFamily: 'var(--font-body)' }}>{proyecto.tipo}</span>
                      </div>
                    </div>

                    {/* Badges de estado */}
                    <div className="flex flex-wrap gap-1.5">
                      <span style={{ backgroundColor: '#006B4E', color: '#fff', fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '200px', fontFamily: 'var(--font-body)' }}>
                        disponible
                      </span>
                      {['reservándose', 'pago-en-validación', 'reservada'].map(s => (
                        <span key={s} style={{ border: '1px solid #E5E5E5', color: '#737373', fontSize: '11px', padding: '4px 10px', borderRadius: '200px', fontFamily: 'var(--font-body)' }}>
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* CTA principal */}
                    <button
                      onClick={() => setIsReservaVisitaOpen(true)}
                      className="w-full flex items-center justify-center gap-2 rounded-full transition-all hover:opacity-90"
                      style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontWeight: 600, fontFamily: 'var(--font-body)', fontSize: '15px', padding: '14px 24px' }}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {t.detail.bookVisit}
                    </button>

                    {/* CTA secundario */}
                    <button
                      className="w-full flex items-center justify-center gap-2 rounded-full transition-all"
                      style={{ backgroundColor: '#F5F5F0', color: '#006B4E', border: '1px solid #E5E5E0', fontFamily: 'var(--font-body)', fontSize: '14px', padding: '12px 24px', fontWeight: 'var(--font-weight-medium)' }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#EBEBEB')}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#F5F5F0')}
                    >
                      <Download className="w-4 h-4" />
                      Descargar brochure
                    </button>

                    {/* CTA terciario */}
                    <button
                      onClick={() => setIsConsultaOnlineOpen(true)}
                      className="w-full flex items-center justify-center gap-2 rounded-full transition-all hover:bg-gray-50"
                      style={{ border: '1px solid #E5E5E5', color: '#0A0A0A', fontFamily: 'var(--font-body)', fontSize: '14px', padding: '12px 24px' }}
                    >
                      <MessageSquare className="w-4 h-4" />
                      {t.detail.onlineConsult}
                    </button>
                  </div>
                </div>

                {/* Card de publicador - COMPONENTE UNIFICADO */}
                <PublicadoPor
                  nombre={proyecto.publicadoPor}
                  tipoVendedor={proyecto.tipoVendedor}
                  logo={proyecto.imagenVendedor}
                  descripcion={proyecto.descripcionVendedor}
                  telefono={proyecto.telefonoVendedor}
                  email={proyecto.emailVendedor}
                  onContactar={() => setIsContactModalOpen(true)}
                  onVerPerfil={() => {
                    const tipoVendedor = proyecto.tipoVendedor.toLowerCase();
                    if (tipoVendedor.includes('particular') || tipoVendedor.includes('natural')) {
                      onNavigate('vendedor-particular-profile', undefined, proyecto.publicadoPor);
                    } else {
                      onNavigate('inmobiliaria-profile', undefined, proyecto.publicadoPor);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal de contacto */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        parcelaNombre={proyecto.nombre}
        parcelaUbicacion={proyecto.ubicacion}
        vendedorNombre={proyecto.publicadoPor}
        vendedorTipo="inmobiliaria"
      />

      {/* Modal de reserva de visita */}
      <ReservaVisitaModal
        isOpen={isReservaVisitaOpen}
        onClose={() => setIsReservaVisitaOpen(false)}
        parcela={{
          titulo: proyecto.nombre,
          ubicacion: proyecto.ubicacion
        }}
        agente={{
          nombre: proyecto.publicadoPor,
          telefono: proyecto.telefonoVendedor,
          email: proyecto.emailVendedor,
          foto: proyecto.imagenVendedor
        }}
        tipoVendedor={proyecto.tipoVendedor}
      />

      {/* Modal de consulta online */}
      <ConsultaOnlineModal
        isOpen={isConsultaOnlineOpen}
        onClose={() => setIsConsultaOnlineOpen(false)}
        parcela={{
          id: proyecto.id,
          titulo: proyecto.nombre,
          ubicacion: proyecto.ubicacion
        }}
        agente={{
          nombre: proyecto.publicadoPor,
          telefono: proyecto.telefonoVendedor,
          calendlyUrl: undefined // Aquí puedes agregar la URL de Calendly del agente si está disponible
        }}
      />
      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}