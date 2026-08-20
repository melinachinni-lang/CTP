import { SiteFooter } from '@/app/components/SiteFooter';
import { useI18n } from '@/app/i18n/i18nContext';
import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Home, MapPin, Phone, Mail, ExternalLink, Droplets, Zap, Route, TreePine, Users, Building2, Shield, Mountain, Sprout, Eye, Waves, Expand, Download, FileText, ChevronDown, ChevronUp, Navigation, School, ShoppingBag, TrendingUp, MessageSquare, Package, Maximize2, Sparkles, Heart, Map, Info, ShoppingCart, Settings, FileCheck, Droplet, Check, X, CheckCircle2, AlertTriangle, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { PublicadoPor } from '@/app/components/PublicadoPor';
import { ContactModal } from '@/app/components/ContactModal';
import { ReservaVisitaModal } from '@/app/components/ReservaVisitaModal';
import { ConsultaOnlineModal } from '@/app/components/ConsultaOnlineModal';
import { ComprarProyectoModal } from '@/app/components/ComprarProyectoModal';
import { ConsultarModal } from '@/app/components/ConsultarModal';
import { FlujoCompraModal } from '@/app/components/FlujoCompraModal';
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
  const { t, language } = useI18n();
  const translateDescVendedor = (desc: string): string => {
    if (language !== 'en') return desc;
    const map: Record<string, string> = {
      'Especialistas en proyectos residenciales premium en la Región de La Araucanía': 'Specialists in premium residential projects in the La Araucanía Region',
      'Broker especializada en proyectos turísticos y de inversión en La Araucanía': 'Broker specializing in tourism and investment projects in La Araucanía',
      'Especializados en parcelas turísticas y agrícolas de la región': 'Specialists in tourist and agricultural parcels in the region',
      'Especialista en inversiones residenciales de montaña en la Región Metropolitana': 'Specialist in mountain residential investments in the Metropolitan Region',
      'Propietaria directa comprometida con proyectos sustentables y respetuosos con el medio ambiente': 'Direct owner committed to sustainable and environmentally responsible projects',
    };
    return map[desc] ?? desc;
  };

  const translateParcelaNombre = (nombre: string): string => {
    if (language !== 'en') return nombre;
    return nombre.replace(/^Parcela\b/, 'Parcel');
  };

  const getEstadoLabel = (estado: string): string => {
    if (estado === 'disponible') return t.status.disponible;
    if (estado === 'reservado') return t.status.reservado;
    if (estado === 'vendido') return t.detail.vendido;
    return estado;
  };
  const translateNivel = (nivel: string): string => {
    const map: Record<string, string> = {
      'Alta': t.detail.levelHigh,
      'Media': t.detail.levelMedium,
      'Baja': t.detail.levelLow,
      'Muy alta': t.detail.levelVeryHigh,
    };
    return map[nivel] ?? nivel;
  };
  const translateCaracLabel = (label: string): string => {
    const map: Record<string, string> = {
      'Superficie total': t.detail.totalArea,
      'Tipo de suelo': t.detail.soilType,
      'Orientación': t.detail.orientation,
      'Pendiente': t.detail.slope,
      'Uso permitido': t.detail.permittedUse,
      'Agua': t.detail.water,
      'Electricidad': t.detail.electricity,
      'Acceso': t.detail.access,
      'Cerco': t.detail.fence,
      'Portón': t.detail.gate,
    };
    return map[label] ?? label;
  };
  const translateTipo = (tipo: string): string => {
    const map: Record<string, string> = {
      'Residencial': t.detail.tipoResidencial,
      'Turístico': t.detail.tipoTuristico,
      'Agrícola': t.detail.tipoAgricola,
      'Mixto': t.detail.tipoMixto,
    };
    return map[tipo] ?? tipo;
  };
  const translateDescripcionCompleta = (desc: string): string => {
    if (language !== 'en') return desc;
    const map: Record<string, string> = {
      'Valle Verde es un proyecto residencial único en Pucón, diseñado para quienes buscan un estilo de vida conectado con la naturaleza sin renunciar a las comodidades urbanas. Con una ubicación privilegiada que ofrece vistas panorámicas al lago Villarrica y los volcanes circundantes, el proyecto cuenta con 30 parcelas de entre 5.000 y 12.000 m², cada una cuidadosamente planificada para maximizar la privacidad y las vistas. El desarrollo incluye infraestructura completa con agua potable, electricidad trifásica y caminos pavimentados internos. Actualmente en etapa de comercialización con 24 parcelas disponibles para entrega inmediata.':
        'Valle Verde is a unique residential project in Pucón, designed for those seeking a lifestyle connected with nature without giving up urban comforts. With a privileged location offering panoramic views of Lake Villarrica and the surrounding volcanoes, the project features 30 parcels ranging from 5,000 to 12,000 m², each carefully planned to maximize privacy and views. The development includes full infrastructure with drinking water, three-phase electricity, and paved internal roads. Currently in the sales phase with 24 parcels available for immediate delivery.',
      'Los Robles es un condominio turístico diseñado para quienes buscan un refugio natural cerca de Villarrica. Con parcelas desde 3.000 m², este proyecto ofrece la oportunidad perfecta para construir tu cabaña de descanso o invertir en el creciente mercado turístico de la zona. El condominio cuenta con seguridad permanente, áreas verdes comunes y un quincho equipado para reuniones. Ideal para familias que buscan escapar de la ciudad y conectar con la naturaleza sin sacrificar comodidades.':
        'Los Robles is a tourist condominium designed for those seeking a natural retreat near Villarrica. With parcels from 3,000 m², this project offers the perfect opportunity to build your vacation cabin or invest in the area\'s growing tourism market. The condominium features permanent security, common green areas, and an equipped BBQ area for gatherings. Ideal for families looking to escape the city and connect with nature without sacrificing comfort.',
      'Río Claro es un proyecto agrícola que ofrece parcelas productivas desde 8.000 m² en la fértil región del Biobío. Cada parcela cuenta con infraestructura de riego tecnificado instalada, acceso directo desde camino principal y suelos certificados de alta calidad para producción agrícola. Ideal para emprendimientos agrícolas, hortofrutícolas o viñedos. El proyecto incluye asesoría técnica inicial y facilidades de pago para inversionistas serios.':
        'Río Claro is an agricultural project offering productive parcels from 8,000 m² in the fertile Biobío region. Each parcel comes with installed technical irrigation infrastructure, direct access from the main road, and certified high-quality soils for agricultural production. Ideal for agricultural, horticultural, or vineyard ventures. The project includes initial technical advisory and flexible payment options for serious investors.',
      'Terrazas del Lago es un desarrollo inmobiliario de categoría superior en Puerto Varas, actualmente en etapa de construcción de obras de urbanización. Este proyecto mixto combina parcelas residenciales y turísticas con una ubicación privilegiada que ofrece vistas panorámicas al lago Llanquihue y los volcanes Osorno y Calbuco. Contará con un club house equipado, senderos naturales y áreas verdes diseñadas para el esparcimiento familiar. Pre-venta con descuentos especiales para los primeros compradores. Entrega estimada: Primer semestre 2026.':
        'Terrazas del Lago is a premium real estate development in Puerto Varas, currently in the urban infrastructure construction phase. This mixed project combines residential and tourist parcels with a privileged location offering panoramic views of Lake Llanquihue and the Osorno and Calbuco volcanoes. It will feature an equipped club house, natural trails, and green areas designed for family recreation. Pre-sale with special discounts for early buyers. Estimated delivery: First semester 2026.',
      'Valle Andino es un exclusivo proyecto residencial de montaña en San José de Maipo, próximo a lanzarse al mercado. A solo una hora de Santiago, ofrece la oportunidad única de vivir rodeado de naturaleza cordillerana sin alejarte de la ciudad. Con parcelas desde 6.000 m², este proyecto está diseñado para quienes buscan tranquilidad, aire puro y vistas espectaculares de la Cordillera de los Andes. Incluirá seguridad privada, acceso controlado y todas las autorizaciones para construcción de viviendas. Pre-venta exclusiva con condiciones especiales.':
        'Valle Andino is an exclusive mountain residential project in San José de Maipo, about to launch. Just one hour from Santiago, it offers the unique opportunity to live surrounded by Andean nature without leaving the city behind. With parcels from 6,000 m², this project is designed for those seeking tranquility, clean air, and spectacular views of the Andes. It will include private security, controlled access, and all permits for residential construction. Exclusive pre-sale with special conditions.',
      'Bosque Nativo es un proyecto ecológico único en Valdivia, diseñado bajo principios de sustentabilidad y respeto por el medio ambiente. Las parcelas están inmersas en bosque nativo valdiviano protegido, con acceso a un río de aguas cristalinas que atraviesa la propiedad. El proyecto promueve construcciones de bajo impacto ambiental y ofrece asesoría en diseño sustentable. Ideal para quienes buscan un estilo de vida en armonía con la naturaleza, con posibilidad de desarrollo turístico ecológico.':
        'Bosque Nativo is a unique ecological project in Valdivia, designed under principles of sustainability and environmental respect. The parcels are immersed in protected Valdivian native forest, with access to a crystal-clear river that runs through the property. The project promotes low-impact construction and offers advisory on sustainable design. Ideal for those seeking a lifestyle in harmony with nature, with potential for eco-tourism development.',
    };
    return map[desc] ?? desc;
  };
  const translateTipoAcceso = (tipo: string): string => {
    if (language !== 'en') return tipo;
    const map: Record<string, string> = {
      'Camino pavimentado': 'Paved road',
      'Camino de ripio consolidado': 'Consolidated gravel road',
    };
    return map[tipo] ?? tipo;
  };
  const translateNaturalezaDesc = (desc: string): string => {
    if (language !== 'en') return desc;
    const map: Record<string, string> = {
      'Rodeado de bosque nativo y volcanes': 'Surrounded by native forest and volcanoes',
      'Bosque nativo y entorno prístino': 'Native forest and pristine surroundings',
      'Entorno rural con río y campos': 'Rural setting with river and fields',
      'Entorno natural con vista al lago': 'Natural setting with lake views',
    };
    return map[desc] ?? desc;
  };
  const translateNaturalezaVistas = (desc: string): string => {
    if (language !== 'en') return desc;
    const map: Record<string, string> = {
      'Vista panorámica al lago Villarrica y volcán': 'Panoramic view of Lake Villarrica and volcano',
      'Vista a montañas y bosques': 'Views of mountains and forests',
      'Vista a campos y río': 'Views of fields and river',
      'Vista panorámica al lago Llanquihue': 'Panoramic view of Lake Llanquihue',
    };
    return map[desc] ?? desc;
  };
  const translateActividad = (actividad: string): string => {
    if (language !== 'en') return actividad;
    const map: Record<string, string> = {
      'Turismo': 'Tourism',
      'Servicios': 'Services',
      'Comercio': 'Commerce',
      'Agricultura': 'Agriculture',
      'Ganadería': 'Livestock',
      'Turismo rural': 'Rural tourism',
      'Turismo cultural': 'Cultural tourism',
    };
    return map[actividad] ?? actividad;
  };
  const translateDocNombre = (nombre: string): string => {
    if (language !== 'en') return nombre;
    const map: Record<string, string> = {
      'Masterplan general': 'General master plan',
      'Reglamento de copropiedad': 'Condominium regulations',
      'Certificado de informes previos': 'Prior information certificate',
      'Plano de loteo aprobado': 'Approved subdivision plan',
      'Factibilidad de servicios': 'Services feasibility report',
      'Plano de loteo': 'Subdivision plan',
      'Reglamento interno': 'Internal regulations',
      'Normas de construcción': 'Construction standards',
      'Estudio de impacto ambiental': 'Environmental impact study',
      'Plano de subdivisión': 'Subdivision plan',
      'Inscripción derechos de agua': 'Water rights registration',
      'Estudio de suelos agrícolas': 'Agricultural soil study',
      'Certificado de avalúo fiscal': 'Tax appraisal certificate',
      'Plano topográfico detallado': 'Detailed topographic plan',
      'Masterplan urbanístico': 'Urban master plan',
      'Normas urbanísticas': 'Urban planning regulations',
    };
    return map[nombre] ?? nombre;
  };
  const translateCaracValor = (valor: string): string => {
    if (language !== 'en') return valor;
    const map: Record<string, string> = {
      'Mixto': 'Mixed',
      'Norte': 'North',
      'Nor-Este': 'North-East',
      'Oeste': 'West',
      'Suave (5-10%)': 'Gentle (5–10%)',
      'Suave (5-8%)': 'Gentle (5–8%)',
      'Moderada (10-15%)': 'Moderate (10–15%)',
      'Plana (0-5%)': 'Flat (0–5%)',
      'Residencial, turístico': 'Residential, tourist',
      'Residencial exclusivo': 'Exclusive residential',
      'Turístico, cabañas': 'Tourist, cabins',
      'Mixto: agrícola y residencial': 'Mixed: agricultural and residential',
      'Forestal': 'Forest',
      'Agrícola clase I': 'Agricultural class I',
      'Arcilloso': 'Clay',
      'Factibilidad aprobada': 'Feasibility approved',
      'A 200 metros': '200 meters away',
      'Camino público pavimentado': 'Paved public road',
      'Perimetral ejecutado': 'Perimeter fence installed',
      'Acceso vehicular': 'Vehicle access',
      'Red instalada': 'Network installed',
      'Disponible en parcela': 'Available at parcel',
      'Portería 24/7': '24/7 gatehouse',
      'Perímetro completo': 'Full perimeter',
      'Quincho y senderos': 'BBQ area and trails',
      'Río + pozo profundo': 'River + deep well',
      'Trifásica disponible': 'Three-phase available',
      'Camino ripio consolidado': 'Consolidated gravel road',
      'Derechos de agua incluidos': 'Water rights included',
      'Red de riego proyectada': 'Irrigation network planned',
      'APR conectado': 'Rural water system connected',
      'Monofásica y trifásica': 'Single-phase and three-phase',
      'Calle pavimentada': 'Paved street',
      'Fibra óptica disponible': 'Fiber optic available',
      'En proyecto': 'Planned',
      'Aprobado y al día': 'Approved and up to date',
      'Escritura lista': 'Deed ready',
      'Completa y verificada': 'Complete and verified',
      'Actualizado': 'Updated',
      'Regularizado': 'Regularized',
      'Aprobado y vigente': 'Approved and valid',
      'Al día y subdividido': 'Up to date and subdivided',
      'Inscritos y traspasables': 'Registered and transferable',
      'Títulos saneados': 'Clear title',
      'Individual por parcela': 'Individual per parcel',
      'Construcción aprobados': 'Construction approved',
      'Listas para firma': 'Ready to sign',
    };
    return map[valor] ?? valor;
  };
  const [selectedImage, setSelectedImage] = useState(0);
  const [ubicacionTab, setUbicacionTab] = useState<'panoramica' | 'plano' | 'mapa'>('mapa');
  const [isDocumentosOpen, setIsDocumentosOpen] = useState(true);
  const [isDocTecnicaOpen, setIsDocTecnicaOpen] = useState(false);
  const [isStockOpen, setIsStockOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isReservaVisitaOpen, setIsReservaVisitaOpen] = useState(false);
  const [isConsultaOnlineOpen, setIsConsultaOnlineOpen] = useState(false);
  const [isComprarProyectoOpen, setIsComprarProyectoOpen] = useState(false);
  const [isConsultarOpen, setIsConsultarOpen] = useState(false);
  const [hoveredCompraButton, setHoveredCompraButton] = useState<string | null>(null);
  const [selectedParcelas, setSelectedParcelas] = useState<string[]>([]);
  const [isFlujoCompraMultipleOpen, setIsFlujoCompraMultipleOpen] = useState(false);
  const [tipoCompraMultiple, setTipoCompraMultiple] = useState<'comprar' | 'reservar'>('comprar');
  const stockRef = useRef<HTMLDivElement>(null);

  type EstadoParcela = 'disponible' | 'reservado' | 'vendido';
  const [parcelasData, setParcelasData] = useState<{ codigo: string; superficie: string; precio: string; estado: EstadoParcela; estadoLabel: string }[]>([
    { codigo: 'Parcela A-1', superficie: '5.000 m²', precio: '$38.500.000', estado: 'disponible', estadoLabel: 'Disponible' },
    { codigo: 'Parcela A-2', superficie: '5.200 m²', precio: '$39.800.000', estado: 'disponible', estadoLabel: 'Disponible' },
    { codigo: 'Parcela A-3', superficie: '4.800 m²', precio: '$36.200.000', estado: 'reservado',  estadoLabel: 'Reservado'  },
    { codigo: 'Parcela B-1', superficie: '6.500 m²', precio: '$48.000.000', estado: 'disponible', estadoLabel: 'Disponible' },
    { codigo: 'Parcela B-2', superficie: '6.300 m²', precio: '$46.500.000', estado: 'vendido',    estadoLabel: 'Vendido'    },
    { codigo: 'Parcela B-3', superficie: '6.700 m²', precio: '$50.000.000', estado: 'disponible', estadoLabel: 'Disponible' },
    { codigo: 'Parcela C-1', superficie: '8.000 m²', precio: '$52.000.000', estado: 'disponible', estadoLabel: 'Disponible' },
    { codigo: 'Parcela C-2', superficie: '7.800 m²', precio: '$51.000.000', estado: 'reservado',  estadoLabel: 'Reservado'  },
  ]);

  const handleCompletadoMultiple = (estadoModal: string) => {
    if (estadoModal !== 'pago-en-validacion') return;
    setParcelasData(prev => prev.map(p =>
      selectedParcelas.includes(p.codigo) ? { ...p, estado: 'reservado', estadoLabel: 'Reservado' } : p
    ));
    setSelectedParcelas([]);
  };

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

  const stockParcelasPrices: Record<string, string> = {
    'Parcela A-1': '$38.500.000', 'Parcela A-2': '$39.800.000',
    'Parcela B-1': '$48.000.000', 'Parcela B-3': '$50.000.000',
    'Parcela C-1': '$52.000.000',
  };

  const precioSeleccion = (() => {
    const total = selectedParcelas.reduce((sum, cod) => {
      const raw = stockParcelasPrices[cod] ?? proyecto.precioDesde;
      return sum + parseInt(raw.replace(/\D/g, ''), 10);
    }, 0);
    return '$' + total.toLocaleString('es-CL');
  })();

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
                  {t.nav.parcelas}
                </button>
                <button
                  onClick={() => onNavigate('inmobiliarias')}
                  className="px-4 py-2 text-sm rounded-full hover:bg-gray-50 transition-colors"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: '#737373'
                  }}
                >
                  {t.nav.inmobiliarias}
                </button>
                <button
                  onClick={() => onNavigate('como-funciona')}
                  className="px-4 py-2 text-sm rounded-full hover:bg-gray-50 transition-colors"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: '#737373'
                  }}
                >
                  {t.nav.howItWorks}
                </button>
                <button
                  onClick={() => onNavigate('recursos')}
                  className="px-4 py-2 text-sm rounded-full hover:bg-gray-50 transition-colors"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: '#737373'
                  }}
                >
                  {t.nav.resources}
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
                {t.nav.publishProperty}
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
                {t.nav.login}
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
                  {translateDescripcionCompleta(proyecto.descripcionCompleta)}
                </p>
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
                    {t.detail.plan}
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
                    {t.detail.map}
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
                                  {translateCaracValor(carac.valor)}
                                </p>
                                <p style={{ 
                                  fontFamily: 'var(--font-body)',
                                  color: '#737373',
                                  fontSize: 'var(--font-size-xs)',
                                  fontWeight: 'var(--font-weight-regular)',
                                  lineHeight: '1.4'
                                }}>
                                  {translateCaracLabel(carac.label)}
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
                                  {translateCaracValor(carac.valor)}
                                </p>
                                <p style={{ 
                                  fontFamily: 'var(--font-body)',
                                  color: '#737373',
                                  fontSize: 'var(--font-size-xs)',
                                  fontWeight: 'var(--font-weight-regular)',
                                  lineHeight: '1.4'
                                }}>
                                  {translateCaracLabel(carac.label)}
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
                                  {translateCaracValor(carac.valor)}
                                </p>
                                <p style={{ 
                                  fontFamily: 'var(--font-body)',
                                  color: '#737373',
                                  fontSize: 'var(--font-size-xs)',
                                  fontWeight: 'var(--font-weight-regular)',
                                  lineHeight: '1.4'
                                }}>
                                  {translateCaracLabel(carac.label)}
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
                          <p style={{ fontFamily: 'var(--font-body)', color: '#0A0A0A', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', marginTop: '0.75rem' }}>{translateTipoAcceso(proyecto.entorno.accesos.tipoAcceso)}</p>
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
                            <span style={{ fontFamily: 'var(--font-body)', color: '#0A0A0A', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)' }}>{translateNivel(proyecto.entorno.servicios.educacion.nivel)}</span>
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
                            <span style={{ fontFamily: 'var(--font-body)', color: '#0A0A0A', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)' }}>{translateNivel(proyecto.entorno.servicios.comercio.nivel)}</span>
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
                            <span style={{ fontFamily: 'var(--font-body)', color: '#0A0A0A', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)' }}>{translateNivel(proyecto.entorno.servicios.salud.nivel)}</span>
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
                            <span style={{ fontFamily: 'var(--font-body)', color: '#0A0A0A', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)' }}>{translateNivel(proyecto.entorno.servicios.recreacion.nivel)}</span>
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
                          <p style={{ fontFamily: 'var(--font-body)', color: '#525252', fontSize: 'var(--font-size-xs)' }}>{translateNaturalezaDesc(proyecto.entorno.naturaleza.descripcion)}</p>
                        </div>
                        <div className="pt-4" style={{ borderTop: '1px solid #E5E5E5' }}>
                          <div className="flex items-center justify-between mb-3">
                            <span style={{ fontFamily: 'var(--font-body)', color: '#737373', fontSize: 'var(--font-size-xs)' }}>{t.detail.views}</span>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((bar) => (<div key={bar} className="w-2 h-8 rounded-sm" style={{ backgroundColor: bar <= proyecto.entorno!.naturaleza.vistas ? '#647E3F' : '#F3F4F6' }} />))}
                            </div>
                          </div>
                          <p style={{ fontFamily: 'var(--font-body)', color: '#525252', fontSize: 'var(--font-size-xs)' }}>{translateNaturalezaVistas(proyecto.entorno.naturaleza.descripcionVistas)}</p>
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
                                <span style={{ fontFamily: 'var(--font-body)', color: '#525252', fontSize: 'var(--font-size-body-sm)' }}>{translateActividad(actividad)}</span>
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
                            {t.detail.masterplanDesc}
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
                                {translateDocNombre(doc.nombre)}
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
                              {t.detail.additionalTechDocs}
                            </span>
                          </div>
                          {isDocTecnicaOpen ? <ChevronUp className="w-4 h-4" style={{ color: '#737373' }} /> : <ChevronDown className="w-4 h-4" style={{ color: '#737373' }} />}
                        </button>
                        {isDocTecnicaOpen && (
                          <div className="mt-4 space-y-3 pl-4">
                            {[
                              { nombre: t.detail.soilStudy, icon: <FileText className="w-5 h-5" style={{ color: '#737373' }} /> },
                              { nombre: t.detail.priorInfoCert, icon: <FileCheck className="w-5 h-5" style={{ color: '#737373' }} /> },
                              { nombre: t.detail.communalPlan, icon: <FileText className="w-5 h-5" style={{ color: '#737373' }} /> },
                              { nombre: t.detail.hydrologicalReport, icon: <Droplet className="w-5 h-5" style={{ color: '#737373' }} /> },
                            ].map((doc) => (
                              <div key={doc.nombre} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all">
                                <div className="flex items-center gap-3 flex-1">
                                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">{doc.icon}</div>
                                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A', fontWeight: 'var(--font-weight-medium)' }}>{doc.nombre}</span>
                                </div>
                                <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 hover:bg-gray-50 transition-all" style={{ fontFamily: 'var(--font-body)', color: '#525252', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)' }}>
                                  <Download className="w-3.5 h-3.5" />
                                  <span>{t.common.download}</span>
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
              <div ref={stockRef} className="bg-white rounded-xl border border-gray-200 p-8">
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
                    {/* Hint de selección */}
                    <p style={{ fontSize: '13px', color: '#737373', fontFamily: 'var(--font-body)', marginBottom: '4px' }}>
                      {t.detail.selectParcelasHint}
                    </p>
                    {[...parcelasData].sort((a, b) => {
                      const order: Record<string, number> = { disponible: 0, reservado: 1, vendido: 2 };
                      return (order[a.estado] ?? 3) - (order[b.estado] ?? 3);
                    }).map((parcela, index) => {
                      const isSelected = selectedParcelas.includes(parcela.codigo);
                      const isDisponible = parcela.estado === 'disponible';
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            if (!isDisponible) return;
                            setSelectedParcelas(prev =>
                              prev.includes(parcela.codigo)
                                ? prev.filter(c => c !== parcela.codigo)
                                : [...prev, parcela.codigo]
                            );
                          }}
                          className="flex items-center justify-between p-4 rounded-lg border transition-all"
                          style={{
                            borderColor: isSelected ? '#006B4E' : '#E5E5E5',
                            backgroundColor: isSelected ? '#F0FDF4' : '#FFFFFF',
                            cursor: isDisponible ? 'pointer' : 'default',
                          }}
                        >
                          <div className="flex items-center gap-3 flex-1">
                            {/* Checkbox — solo en disponibles */}
                            {isDisponible && (
                              <div
                                className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all"
                                style={{
                                  backgroundColor: isSelected ? '#006B4E' : '#FFFFFF',
                                  border: `2px solid ${isSelected ? '#006B4E' : '#D4D4D4'}`,
                                }}
                              >
                                {isSelected && <Check className="w-3 h-3" style={{ color: '#FFFFFF' }} />}
                              </div>
                            )}
                            <div>
                              <p style={{ fontFamily: 'var(--font-body)', color: '#0A0A0A', fontSize: 'var(--font-size-body-base)', fontWeight: 'var(--font-weight-semibold)', marginBottom: '2px' }}>
                                {parcela.codigo}
                              </p>
                              <p style={{ fontFamily: 'var(--font-body)', color: '#737373', fontSize: 'var(--font-size-xs)' }}>
                                {parcela.superficie} · {parcela.precio}
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
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: parcela.estado === 'disponible' ? '#16A34A' : parcela.estado === 'reservado' ? '#CA8A04' : '#737373' }} />
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', color: parcela.estado === 'disponible' ? '#166534' : parcela.estado === 'reservado' ? '#854D0E' : '#525252' }}>
                              {getEstadoLabel(parcela.estado)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Panel de acciones inline */}
                {selectedParcelas.length > 0 && !isFlujoCompraMultipleOpen && (
                  <div className="mt-4 pt-4 space-y-3" style={{ borderTop: '1px solid #E5E5E5' }}>
                    <div className="flex items-center justify-between">
                      <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '14px', color: '#0A0A0A' }}>
                        {selectedParcelas.length} {selectedParcelas.length === 1 ? t.detail.parcelaSelected : t.detail.parcelasSelected}
                      </p>
                      <button
                        onClick={() => setSelectedParcelas([])}
                        style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#737373', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        {t.detail.clearSelection}
                      </button>
                    </div>
                    <button
                      onClick={() => { setTipoCompraMultiple('reservar'); setIsFlujoCompraMultipleOpen(true); }}
                      className="w-full flex items-center justify-center gap-2 rounded-full transition-all hover:opacity-90"
                      style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontWeight: 600, fontFamily: 'var(--font-body)', fontSize: '15px', padding: '14px 24px' }}
                    >
                      {t.detail.reserve} {selectedParcelas.length === 1 ? t.common.parcela : `${selectedParcelas.length} ${t.common.parcelas}`}
                    </button>
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
                    {t.detail.availableParcels} ({proyecto.parcelasDelProyecto.length})
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
                            {translateParcelaNombre(parcela.nombre)}
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
                    {/* Rango de precios */}
                    <div>
                      <p style={{ fontSize: '11px', fontWeight: 600, color: '#737373', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-body)', marginBottom: '6px' }}>
                        {t.filters.priceRange}
                      </p>
                      <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '21px', color: '#0A0A0A', lineHeight: 1.2, marginBottom: '4px', whiteSpace: 'nowrap' }}>
                        {proyecto.precioDesde} – {proyecto.precioHasta}
                      </p>
                    </div>

                    {/* Primer dueño badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ border: '1px solid #E5E5E5' }}>
                      <Info className="w-3.5 h-3.5" style={{ color: '#006B4E' }} />
                      <span style={{ fontSize: '12px', color: '#0A0A0A', fontFamily: 'var(--font-body)' }}>{t.filters.firstOwner}</span>
                    </div>

                    {/* Separador */}
                    <div style={{ height: '1px', backgroundColor: '#E5E5E5' }} />

                    {/* Financiamiento disponible */}
                    {proyecto.financiamiento?.disponible && proyecto.financiamiento.planes.length > 0 && (
                      <div>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: '#737373', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                          Financiamiento disponible
                        </p>
                        <div className="flex flex-col gap-2">
                          {proyecto.financiamiento.planes.map((plan, idx) => (
                            <div key={idx} className="flex items-center justify-between px-3 py-2 rounded-lg" style={{ backgroundColor: '#F0FBF7', border: '1px solid #A7F3D0' }}>
                              <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#065F46' }}>
                                Pie mín. ${plan.pieMinimoCLP.toLocaleString('es-CL')}
                              </span>
                              <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#065F46' }}>
                                {plan.cuotas} cuotas
                              </span>
                              <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#065F46' }}>
                                {plan.tasa}% anual
                              </span>
                            </div>
                          ))}
                        </div>
                        <div style={{ height: '1px', backgroundColor: '#E5E5E5', marginTop: '16px' }} />
                      </div>
                    )}

                    {/* Features grid con iconos */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                      <div className="flex items-center gap-1.5">
                        <Expand className="w-4 h-4 flex-shrink-0" style={{ color: '#006B4E' }} />
                        <span style={{ fontSize: '13px', color: '#0A0A0A', fontFamily: 'var(--font-body)' }}>{proyecto.superficieDesde}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Home className="w-4 h-4 flex-shrink-0" style={{ color: '#006B4E' }} />
                        <span style={{ fontSize: '13px', color: '#0A0A0A', fontFamily: 'var(--font-body)' }}>{proyecto.totalParcelas} {t.common.parcelas}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#006B4E' }} />
                        <span style={{ fontSize: '13px', color: '#0A0A0A', fontFamily: 'var(--font-body)' }}>{proyecto.parcelasDisponibles} {t.detail.projectAvailable}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: '#006B4E' }} />
                        <span style={{ fontSize: '13px', color: '#0A0A0A', fontFamily: 'var(--font-body)' }}>{translateTipo(proyecto.tipo)}</span>
                      </div>
                    </div>

                    {/* CTA principal: Ver parcelas disponibles */}
                    <button
                      onClick={() => {
                        setIsStockOpen(true);
                        setTimeout(() => stockRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
                      }}
                      className="w-full flex items-center justify-center gap-2 rounded-full transition-all hover:opacity-90"
                      style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontWeight: 600, fontFamily: 'var(--font-body)', fontSize: '15px', padding: '14px 24px' }}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {t.detail.showAvailableParcels}
                    </button>

                    {/* CTA secundario: Brochure */}
                    <button
                      className="w-full flex items-center justify-center gap-2 rounded-full transition-all"
                      style={{ backgroundColor: '#F5F5F0', color: '#006B4E', border: '1px solid #E5E5E0', fontFamily: 'var(--font-body)', fontSize: '14px', padding: '12px 24px', fontWeight: 'var(--font-weight-medium)' }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#EBEBEB')}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#F5F5F0')}
                    >
                      <Download className="w-4 h-4" />
                      {t.detail.downloadBrochure}
                    </button>

                    {/* CTA terciario: Consultar */}
                    <button
                      onClick={() => setIsConsultarOpen(true)}
                      className="w-full flex items-center justify-center gap-2 rounded-full transition-all hover:bg-gray-50"
                      style={{ border: '1px solid #E5E5E5', color: '#0A0A0A', fontFamily: 'var(--font-body)', fontSize: '14px', padding: '12px 24px' }}
                    >
                      <MessageSquare className="w-4 h-4" />
                      {t.detail.consult}
                    </button>
                  </div>
                </div>

                {/* Reportar publicación */}
                <ReportarButton />

                {/* Card de publicador - COMPONENTE UNIFICADO */}
                <PublicadoPor
                  nombre={proyecto.publicadoPor}
                  tipoVendedor={proyecto.tipoVendedor}
                  logo={proyecto.imagenVendedor}
                  descripcion={proyecto.descripcionVendedor ? translateDescVendedor(proyecto.descripcionVendedor) : undefined}
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
          calendlyUrl: undefined
        }}
      />

      {/* Modal de comprar proyecto */}
      <ComprarProyectoModal
        isOpen={isComprarProyectoOpen}
        onClose={() => setIsComprarProyectoOpen(false)}
        onComprarAhora={() => setIsComprarProyectoOpen(false)}
        onReservar={() => {
          setIsComprarProyectoOpen(false);
          setIsReservaVisitaOpen(true);
        }}
        proyectoNombre={proyecto.nombre}
      />

      {/* Modal de consultar */}
      <ConsultarModal
        isOpen={isConsultarOpen}
        onClose={() => setIsConsultarOpen(false)}
        onReservarVisita={() => {
          setIsConsultarOpen(false);
          setIsReservaVisitaOpen(true);
        }}
        onWhatsApp={() => {
          setIsConsultarOpen(false);
          window.open(`https://wa.me/${proyecto.telefonoVendedor?.replace(/\D/g, '')}`, '_blank');
        }}
        onVideollamada={() => {
          setIsConsultarOpen(false);
          setIsConsultaOnlineOpen(true);
        }}
        parcelaNombre={proyecto.nombre}
      />

      {/* Flujo de compra/reserva múltiple — mismo flujo que parcela individual */}
      <FlujoCompraModal
        isOpen={isFlujoCompraMultipleOpen}
        onClose={() => setIsFlujoCompraMultipleOpen(false)}
        parcelaNombre={selectedParcelas.join(', ')}
        precio={precioSeleccion}
        tipoCompra={tipoCompraMultiple}
        onEstadoChange={handleCompletadoMultiple}
      />

      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}

function ReportarButton() {
  const [open, setOpen] = React.useState(false);
  const [descripcion, setDescripcion] = React.useState('');
  const [enviado, setEnviado] = React.useState(false);

  const handleEnviar = () => {
    setEnviado(true);
    setTimeout(() => { setOpen(false); setEnviado(false); setDescripcion(''); }, 2500);
  };

  return (
    <>
      <div className="pt-1 pb-2 flex justify-center">
        <button
          onClick={() => setOpen(true)}
          style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: '4px 8px' }}
          onMouseEnter={e => e.currentTarget.style.color = '#EF4444'}
          onMouseLeave={e => e.currentTarget.style.color = '#9CA3AF'}
        >
          Reportar publicación
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            {enviado ? (
              <div className="p-8 flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#DCFCE7' }}>
                  <CheckCircle className="w-6 h-6" style={{ color: '#166534' }} />
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '15px', color: '#0A0A0A' }}>Reporte enviado</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6B6B6B', textAlign: 'center' }}>Nuestro equipo revisará tu reporte e informará el resultado.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 600, color: '#0A0A0A' }}>Reportar publicación</h3>
                  <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                    <X className="w-4 h-4" style={{ color: '#6B7280' }} />
                  </button>
                </div>
                <div className="p-5 space-y-4">
                  <div className="p-3 rounded-xl" style={{ backgroundColor: '#FFFBEB', border: '1px solid #FDE68A' }}>
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="w-3.5 h-3.5" style={{ color: '#D97706' }} />
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: '#92400E' }}>Uso indebido de material gráfico</p>
                    </div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#92400E' }}>Reporta si las imágenes o material de esta publicación son tuyos y fueron usados sin autorización.</p>
                  </div>
                  <div className="space-y-1.5">
                    <label style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: '#374151' }}>Descripción</label>
                    <textarea value={descripcion} onChange={e => setDescripcion(e.target.value)} rows={4}
                      placeholder="Describe por qué estás reportando esta publicación..."
                      className="w-full px-3 py-2.5 rounded-xl text-sm resize-none"
                      style={{ border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA', color: '#0A0A0A', outline: 'none', fontFamily: 'var(--font-body)', lineHeight: 1.5 }}
                      onFocus={e => e.target.style.borderColor = '#D97706'}
                      onBlur={e => e.target.style.borderColor = '#E5E5E5'}
                    />
                  </div>
                </div>
                <div className="p-5 border-t border-gray-100 flex gap-3">
                  <button onClick={() => setOpen(false)} className="flex-1 py-2.5 rounded-full text-sm transition-colors"
                    style={{ backgroundColor: '#F3F4F6', color: '#374151', fontFamily: 'var(--font-body)' }}>
                    Cancelar
                  </button>
                  <button onClick={handleEnviar} disabled={!descripcion.trim()} className="flex-1 py-2.5 rounded-full text-sm font-medium transition-all"
                    style={{ backgroundColor: descripcion.trim() ? '#EF4444' : '#FCA5A5', color: '#FFFFFF', fontFamily: 'var(--font-body)', cursor: descripcion.trim() ? 'pointer' : 'not-allowed' }}>
                    Enviar reporte
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}