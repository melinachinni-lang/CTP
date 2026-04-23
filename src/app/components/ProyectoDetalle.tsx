import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Home, MapPin, Phone, Mail, ExternalLink, Droplets, Zap, Route, TreePine, Users, Building2, Shield, Mountain, Sprout, Eye, Waves, Expand, Download, FileText, ChevronDown, ChevronUp, Navigation, School, ShoppingBag, TrendingUp, MessageSquare, Package } from 'lucide-react';
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
  const [selectedImage, setSelectedImage] = useState(0);
  const [ubicacionTab, setUbicacionTab] = useState<'panoramica' | 'mapa'>('mapa');
  const [isDocumentosOpen, setIsDocumentosOpen] = useState(false);
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
        return { backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#2563eb', border: '1px solid rgba(59, 130, 246, 0.2)' };
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
            <span>Volver a parcelas</span>
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
                  
                  {/* Badges */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Badge de tipo */}
                    <div 
                      className="px-3 py-1.5 rounded-full flex items-center gap-1.5"
                      style={{
                        backgroundColor: 'rgba(10, 10, 10, 0.05)',
                        border: '1px solid rgba(10, 10, 10, 0.1)'
                      }}
                    >
                      <div style={{ color: '#0A0A0A' }}>
                        {getTipoIcon(proyecto.tipo)}
                      </div>
                      <span style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '12px',
                        fontWeight: 500,
                        color: '#0A0A0A'
                      }}>
                        {proyecto.tipo}
                      </span>
                    </div>
                    
                    {/* Badge de estado */}
                    <div 
                      className="px-3 py-1.5 rounded-full"
                      style={estadoStyles}
                    >
                      <span style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '12px',
                        fontWeight: 500
                      }}>
                        {proyecto.estado}
                      </span>
                    </div>
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
                  <MapPin className="w-5 h-5" style={{ color: '#737373' }} />
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
                      aria-label="Imagen anterior"
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
                      aria-label="Imagen siguiente"
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
                        selectedImage === index 
                          ? 'border-gray-900 shadow-md' 
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
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

              {/* Información general del proyecto - Cards con iconos */}
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <h2 style={{ 
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 'var(--font-weight-regular)',
                  fontSize: 'var(--font-size-h3)',
                  color: '#0A0A0A',
                  marginBottom: '24px'
                }}>
                  Información general
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
                        Total parcelas
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
                        Disponibles
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
                        Superficie desde
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
                        Superficie hasta
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

              {/* Descripción del proyecto */}
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <h2 style={{ 
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 'var(--font-weight-regular)',
                  fontSize: 'var(--font-size-h3)',
                  color: '#0A0A0A',
                  marginBottom: '16px'
                }}>
                  Sobre el proyecto
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
                    Características
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
                          Terreno
                        </h3>
                        <div className="flex gap-4">
                          {proyecto.caracteristicasTerreno.map((carac, index) => (
                            <div key={index} className="flex-1 flex flex-col items-center text-center gap-4 min-w-0">
                              {carac.icon && (
                                <div 
                                  className="w-14 h-14 rounded-full bg-white flex items-center justify-center border border-gray-200 flex-shrink-0"
                                  style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.05)' }}
                                >
                                  <div className="text-gray-900">{carac.icon}</div>
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
                          Servicios
                        </h3>
                        <div className="flex gap-4">
                          {proyecto.caracteristicasServicios.map((carac, index) => (
                            <div key={index} className="flex-1 flex flex-col items-center text-center gap-4 min-w-0">
                              {carac.icon && (
                                <div 
                                  className="w-14 h-14 rounded-full bg-white flex items-center justify-center border border-gray-200 flex-shrink-0"
                                  style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.05)' }}
                                >
                                  <div className="text-gray-900">{carac.icon}</div>
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
                          Estado Legal
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                          {proyecto.caracteristicasLegal.map((carac, index) => (
                            <div key={index} className="flex flex-col items-center text-center gap-4">
                              {carac.icon && (
                                <div 
                                  className="w-14 h-14 rounded-full bg-white flex items-center justify-center border border-gray-200 flex-shrink-0"
                                  style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.05)' }}
                                >
                                  <div className="text-gray-900">{carac.icon}</div>
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

              {/* Planos y documentos - COPIADO EXACTO DE PARCELADETALLE */}
              {(proyecto.plano || (proyecto.documentos && proyecto.documentos.length > 0)) && (
                <div className="bg-white rounded-xl border border-gray-200 p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 style={{ 
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 'var(--font-weight-regular)',
                      fontSize: 'var(--font-size-h2)',
                      color: '#0A0A0A',
                      margin: 0
                    }}>
                      Planos y documentos
                    </h2>
                    {proyecto.documentos && proyecto.documentos.length > 0 && (
                      <button
                        onClick={() => setIsDocumentosOpen(!isDocumentosOpen)}
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                        style={{ 
                          fontFamily: 'var(--font-body)',
                          color: '#0A0A0A',
                          fontSize: 'var(--font-size-body-sm)',
                          fontWeight: 'var(--font-weight-medium)'
                        }}
                      >
                        <span>{isDocumentosOpen ? 'Ocultar documentos' : 'Ver documentos disponibles'}</span>
                        {isDocumentosOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-6">
                    {/* Lista de documentos - Colapsable */}
                    {isDocumentosOpen && proyecto.documentos && proyecto.documentos.length > 0 && (
                      <div className="space-y-3">
                        {proyecto.documentos.map((doc, index) => (
                          <div 
                            key={index}
                            className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                <FileText className="w-5 h-5 text-gray-600" />
                              </div>
                              <div>
                                <p style={{ 
                                  fontFamily: 'var(--font-body)',
                                  color: '#0A0A0A',
                                  fontSize: 'var(--font-size-body-sm)',
                                  fontWeight: 'var(--font-weight-medium)',
                                  marginBottom: '0.125rem'
                                }}>
                                  {doc.nombre}
                                </p>
                                <p style={{ 
                                  fontFamily: 'var(--font-body)',
                                  color: '#A3A3A3',
                                  fontSize: 'var(--font-size-xs)'
                                }}>
                                  {doc.tipo}
                                </p>
                              </div>
                            </div>
                            {doc.disponible ? (
                              <button 
                                className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 hover:border-gray-900 transition-colors"
                                style={{ 
                                  fontFamily: 'var(--font-body)',
                                  color: '#0A0A0A',
                                  fontSize: 'var(--font-size-body-sm)',
                                  fontWeight: 'var(--font-weight-medium)'
                                }}
                              >
                                <Download className="w-4 h-4" />
                                <span>Descargar</span>
                              </button>
                            ) : (
                              <span style={{ 
                                fontFamily: 'var(--font-body)',
                                color: '#A3A3A3',
                                fontSize: 'var(--font-size-xs)'
                              }}>
                                No disponible
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Vista previa del plano */}
                    {proyecto.plano && (
                      <div className="w-full aspect-[16/9] bg-white overflow-hidden rounded-lg border border-gray-200">
                        <ImageWithFallback 
                          src={proyecto.plano} 
                          alt="Plano del proyecto"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Masterplan y planos */}
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 style={{ 
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 'var(--font-weight-regular)',
                    fontSize: 'var(--font-size-h3)',
                    color: '#0A0A0A'
                  }}>
                    Masterplan
                  </h2>
                  <button 
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#0A0A0A'
                    }}
                  >
                    <Download className="w-4 h-4" />
                    Descargar
                  </button>
                </div>

                <div className="aspect-[16/10] bg-white overflow-hidden rounded-lg border border-gray-200 cursor-pointer hover:border-gray-400 transition-colors">
                  <ImageWithFallback 
                    src={proyecto.masterplan} 
                    alt="Masterplan del proyecto"
                    className="w-full h-full object-contain"
                  />
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
                  Ubicación
                </h2>

                {/* Dirección */}
                <p className="flex items-start gap-2 mb-6" style={{ 
                  fontFamily: 'var(--font-body)',
                  color: '#525252',
                  fontSize: 'var(--font-size-body-md)',
                  lineHeight: 'var(--line-height-body)'
                }}>
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#737373' }} />
                  {proyecto.direccion}
                </p>

                {/* Tabs */}
                <div className="flex gap-4 mb-6" style={{ borderBottom: '1px solid #E5E5E5' }}>
                  <button
                    onClick={() => setUbicacionTab('mapa')}
                    className="pb-3 px-1 transition-colors"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-md)',
                      fontWeight: ubicacionTab === 'mapa' ? 'var(--font-weight-semibold)' : 'var(--font-weight-regular)',
                      color: ubicacionTab === 'mapa' ? '#0A0A0A' : '#737373',
                      borderBottom: ubicacionTab === 'mapa' ? '2px solid #0A0A0A' : 'none'
                    }}
                  >
                    Mapa
                  </button>
                  <button
                    onClick={() => setUbicacionTab('panoramica')}
                    className="pb-3 px-1 transition-colors"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-md)',
                      fontWeight: ubicacionTab === 'panoramica' ? 'var(--font-weight-semibold)' : 'var(--font-weight-regular)',
                      color: ubicacionTab === 'panoramica' ? '#0A0A0A' : '#737373',
                      borderBottom: ubicacionTab === 'panoramica' ? '2px solid #0A0A0A' : 'none'
                    }}
                  >
                    Entorno
                  </button>
                </div>

                {/* Contenido de tabs */}
                {ubicacionTab === 'mapa' ? (
                  <div className="aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                    <iframe
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      style={{ border: 0 }}
                      src={`https://www.google.com/maps?q=${proyecto.coordenadas.lat},${proyecto.coordenadas.lng}&output=embed`}
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <div className="aspect-[16/9] bg-white overflow-hidden rounded-lg border border-gray-200">
                    <ImageWithFallback 
                      src={proyecto.imagenPanoramica} 
                      alt="Vista panorámica del entorno"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Información del entorno */}
              {proyecto.entorno && (
                <div className="mt-16 pt-12" style={{ borderTop: '1px solid #E5E5E5' }}>
                  <div className="mb-8">
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-regular)', fontSize: 'var(--font-size-h2)', color: '#0A0A0A', marginBottom: '0.5rem' }}>
                      Información del entorno
                    </h2>
                    <p style={{ fontFamily: 'var(--font-body)', color: '#737373', fontSize: 'var(--font-size-body-sm)', lineHeight: 'var(--line-height-body)' }}>
                      Conoce más sobre el área y contexto de este proyecto
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                          <Navigation className="w-5 h-5 text-gray-700" />
                        </div>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-body-lg)', color: '#0A0A0A' }}>
                          Accesos y conectividad
                        </h3>
                      </div>
                      <div className="space-y-5">
                        <div>
                          <div className="flex items-end justify-between mb-2">
                            <span style={{ fontFamily: 'var(--font-body)', color: '#737373', fontSize: 'var(--font-size-xs)' }}>Tiempo al centro</span>
                            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-h3)', color: '#0A0A0A' }}>{proyecto.entorno.accesos.tiempoAlCentro}</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gray-900 rounded-full transition-all duration-500" style={{ width: `${Math.min((proyecto.entorno.accesos.tiempoAlCentroMinutos / 60) * 100, 100)}%` }} />
                          </div>
                          <p style={{ fontFamily: 'var(--font-body)', color: '#A3A3A3', fontSize: 'var(--font-size-xs)', marginTop: '0.5rem' }}>{proyecto.entorno.accesos.ciudadCercana}</p>
                        </div>
                        <div>
                          <span style={{ fontFamily: 'var(--font-body)', color: '#737373', fontSize: 'var(--font-size-xs)', display: 'block', marginBottom: '0.75rem' }}>Tipo de acceso</span>
                          <div className="flex items-center gap-2">
                            {[1, 2, 3, 4].map((bar) => (<div key={bar} className={`flex-1 h-2 rounded-full ${bar <= proyecto.entorno!.accesos.calidadAcceso ? 'bg-gray-900' : 'bg-gray-100'}`} />))}
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
                        <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                          <ShoppingBag className="w-5 h-5 text-gray-700" />
                        </div>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-body-lg)', color: '#0A0A0A' }}>Servicios cercanos</h3>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <School className="w-4 h-4 text-gray-500" />
                              <span style={{ fontFamily: 'var(--font-body)', color: '#525252', fontSize: 'var(--font-size-xs)' }}>Educación</span>
                            </div>
                            <span style={{ fontFamily: 'var(--font-body)', color: '#0A0A0A', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)' }}>{proyecto.entorno.servicios.educacion.nivel}</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gray-900 rounded-full" style={{ width: `${proyecto.entorno.servicios.educacion.porcentaje}%` }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <ShoppingBag className="w-4 h-4 text-gray-500" />
                              <span style={{ fontFamily: 'var(--font-body)', color: '#525252', fontSize: 'var(--font-size-xs)' }}>Comercio</span>
                            </div>
                            <span style={{ fontFamily: 'var(--font-body)', color: '#0A0A0A', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)' }}>{proyecto.entorno.servicios.comercio.nivel}</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gray-900 rounded-full" style={{ width: `${proyecto.entorno.servicios.comercio.porcentaje}%` }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Home className="w-4 h-4 text-gray-500" />
                              <span style={{ fontFamily: 'var(--font-body)', color: '#525252', fontSize: 'var(--font-size-xs)' }}>Salud</span>
                            </div>
                            <span style={{ fontFamily: 'var(--font-body)', color: '#0A0A0A', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)' }}>{proyecto.entorno.servicios.salud.nivel}</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gray-900 rounded-full" style={{ width: `${proyecto.entorno.servicios.salud.porcentaje}%` }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <TreePine className="w-4 h-4 text-gray-500" />
                              <span style={{ fontFamily: 'var(--font-body)', color: '#525252', fontSize: 'var(--font-size-xs)' }}>Recreación</span>
                            </div>
                            <span style={{ fontFamily: 'var(--font-body)', color: '#0A0A0A', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)' }}>{proyecto.entorno.servicios.recreacion.nivel}</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gray-900 rounded-full" style={{ width: `${proyecto.entorno.servicios.recreacion.porcentaje}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                          <TreePine className="w-5 h-5 text-gray-700" />
                        </div>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-body-lg)', color: '#0A0A0A' }}>Entorno natural</h3>
                      </div>
                      <div className="space-y-5">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span style={{ fontFamily: 'var(--font-body)', color: '#737373', fontSize: 'var(--font-size-xs)' }}>Naturaleza</span>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((bar) => (<div key={bar} className={`w-2 h-8 rounded-sm ${bar <= proyecto.entorno!.naturaleza.nivel ? 'bg-gray-900' : 'bg-gray-100'}`} />))}
                            </div>
                          </div>
                          <p style={{ fontFamily: 'var(--font-body)', color: '#525252', fontSize: 'var(--font-size-xs)' }}>{proyecto.entorno.naturaleza.descripcion}</p>
                        </div>
                        <div className="pt-4" style={{ borderTop: '1px solid #E5E5E5' }}>
                          <div className="flex items-center justify-between mb-3">
                            <span style={{ fontFamily: 'var(--font-body)', color: '#737373', fontSize: 'var(--font-size-xs)' }}>Vistas</span>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((bar) => (<div key={bar} className={`w-2 h-8 rounded-sm ${bar <= proyecto.entorno!.naturaleza.vistas ? 'bg-gray-900' : 'bg-gray-100'}`} />))}
                            </div>
                          </div>
                          <p style={{ fontFamily: 'var(--font-body)', color: '#525252', fontSize: 'var(--font-size-xs)' }}>{proyecto.entorno.naturaleza.descripcionVistas}</p>
                        </div>
                        <div className="pt-4" style={{ borderTop: '1px solid #E5E5E5' }}>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <span style={{ fontFamily: 'var(--font-body)', color: '#737373', fontSize: 'var(--font-size-xs)', display: 'block', marginBottom: '0.25rem' }}>Temp. promedio</span>
                              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-h4)', color: '#0A0A0A' }}>{proyecto.entorno.naturaleza.temperaturaPromedio}</span>
                            </div>
                            <div>
                              <span style={{ fontFamily: 'var(--font-body)', color: '#737373', fontSize: 'var(--font-size-xs)', display: 'block', marginBottom: '0.25rem' }}>Precipitaciones</span>
                              <span style={{ fontFamily: 'var(--font-body)', color: '#0A0A0A', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)' }}>{proyecto.entorno.naturaleza.precipitaciones}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                          <TrendingUp className="w-5 h-5 text-gray-700" />
                        </div>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-body-lg)', color: '#0A0A0A' }}>Contexto del área</h3>
                      </div>
                      <div className="space-y-5">
                        <div>
                          <span style={{ fontFamily: 'var(--font-body)', color: '#737373', fontSize: 'var(--font-size-xs)', display: 'block', marginBottom: '0.5rem' }}>Población aproximada</span>
                          <div className="flex items-baseline gap-2">
                            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-h2)', color: '#0A0A0A' }}>{proyecto.entorno.contexto.poblacion}</span>
                            <span style={{ fontFamily: 'var(--font-body)', color: '#A3A3A3', fontSize: 'var(--font-size-xs)' }}>habitantes</span>
                          </div>
                        </div>
                        <div className="pt-4" style={{ borderTop: '1px solid #E5E5E5' }}>
                          <span style={{ fontFamily: 'var(--font-body)', color: '#737373', fontSize: 'var(--font-size-xs)', display: 'block', marginBottom: '0.75rem' }}>Actividades principales</span>
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
                      <strong style={{ color: '#525252' }}>Nota:</strong> La información presentada en esta sección es de carácter referencial y busca aportar contexto general sobre el área. Te recomendamos verificar detalles específicos directamente con el publicador o mediante visita al terreno.
                    </p>
                  </div>
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
                      Stock y disponibilidad
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
                    <span>{isStockOpen ? 'Ocultar parcelas' : 'Ver parcelas disponibles'}</span>
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
                            Ver parcela
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
                  <div className="space-y-6">
                    {/* Precio destacado */}
                    <div>
                      <p style={{ 
                        fontFamily: 'var(--font-body)',
                        color: '#A3A3A3',
                        fontSize: 'var(--font-size-xs)',
                        fontWeight: 'var(--font-weight-medium)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '0.5rem'
                      }}>
                        Precio base por parcela
                      </p>
                      <div className="flex items-baseline gap-3">
                        <span style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          color: '#737373'
                        }}>
                          Desde
                        </span>
                        <PrecioDisplay 
                          precioCLP={proyecto.precioDesde}
                          precioSize="xl"
                        />
                      </div>
                      <div className="mt-2">
                        <span style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          color: '#737373'
                        }}>
                          hasta {proyecto.precioHasta}
                        </span>
                      </div>
                    </div>

                    {/* CTA principal */}
                    <button 
                      onClick={() => setIsReservaVisitaOpen(true)}
                      className="w-full px-6 py-3 rounded-full transition-all hover:opacity-90"
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        backgroundColor: '#0A0A0A',
                        color: '#FFFFFF',
                        fontWeight: 'var(--font-weight-semibold)',
                        fontSize: 'var(--font-size-body-base)'
                      }}
                    >
                      Reservar visita
                    </button>

                    {/* CTA secundario */}
                    <button 
                      onClick={() => setIsConsultaOnlineOpen(true)}
                      className="w-full px-6 py-3 rounded-full transition-all hover:bg-muted flex items-center justify-center gap-2"
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        backgroundColor: 'var(--secondary)',
                        color: 'var(--secondary-foreground)',
                        fontWeight: 'var(--font-weight-medium)',
                        fontSize: 'var(--font-size-body-base)',
                        border: '1px solid var(--border)'
                      }}
                    >
                      <MessageSquare className="w-4 h-4" />
                      Consulta online
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
    </div>
  );
}