import React, { useState } from 'react';
import { Home, BarChart3, TrendingDown, FolderOpen, DollarSign, ChevronDown, Calendar, Monitor, Smartphone, TrendingUp, ArrowUpRight, ArrowDownRight, AlertTriangle, Users, UserPlus, UserCheck, Activity, MousePointer, FileText, Send, MessageCircle, Eye, Mail, Phone, Globe, Search, Download, Filter, Image as ImageIcon, Save, Edit, X, Layout, Video, MoveUp, MoveDown, ToggleLeft, ToggleRight, Edit2, Settings, Shield, Zap, Link, ChevronRight, Plus, MapPin, Maximize2, Trash2, MoreVertical, Building2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar } from 'recharts';
import { AdminAnaliticaView } from '@/app/components/AdminAnaliticaView';
import { AdminEmbudoView } from '@/app/components/AdminEmbudoView';
import { LeadDetailDrawer } from '@/app/components/LeadDetailDrawer';
import { NewListingFlow } from '@/app/components/NewListingFlow';
import { NewProjectFlow } from '@/app/components/NewProjectFlow';
import { AdminPublicacionesSection } from '@/app/components/AdminPublicacionesSection';

interface AdminDashboardProps {
  onNavigate: (page: string, id?: string) => void;
}

type NavItem = 'inicio' | 'leads' | 'analitica' | 'embudo' | 'proyectos' | 'publicaciones' | 'configuracion';

interface HeroHome {
  id: number;
  tipo: 'imagen' | 'video';
  mediaUrl: string;
  titulo: string;
  subtitulo: string;
  ctaTexto: string;
  ctaUrl: string;
  estado: 'borrador' | 'publicado';
}

interface Banner {
  id: number;
  nombre: string;
  imagenUrl: string;
  texto: string;
  ctaTexto: string;
  ctaUrl: string;
  activo: boolean;
  prioridad: number;
}

interface BloqueHome {
  id: number;
  nombre: string;
  tipo: 'mensaje' | 'campana';
  contenido: string;
  activo: boolean;
}

interface LeadData {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  origen: string;
  estado: string;
  broker: string;
  fecha: string;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [activeNav, setActiveNav] = useState<NavItem>('inicio');
  const [dateRange, setDateRange] = useState('ultimos-30-dias');
  const [deviceFilter, setDeviceFilter] = useState('todos');
  const [origenFilter, setOrigenFilter] = useState('todos');
  const [leadStatusFilter, setLeadStatusFilter] = useState('todos');
  
  // Estado para el drawer de detalle de lead
  const [selectedLead, setSelectedLead] = useState<LeadData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Estados para Publicaciones
  const [heroHome, setHeroHome] = useState<HeroHome>({
    id: 1,
    tipo: 'imagen',
    mediaUrl: '/hero-placeholder.jpg',
    titulo: 'Encuentra tu parcela ideal en el lugar de tus sueños',
    subtitulo: 'Conectamos compradores con propiedades únicas en entornos naturales',
    ctaTexto: 'Ver parcelas disponibles',
    ctaUrl: '/parcelas',
    estado: 'publicado'
  });

  const [banners, setBanners] = useState<Banner[]>([
    { id: 1, nombre: 'Promo Verano 2024', imagenUrl: '/banner-verano.jpg', texto: 'Descuentos especiales hasta 30% en parcelas seleccionadas', ctaTexto: 'Ver ofertas', ctaUrl: '/ofertas', activo: true, prioridad: 1 },
    { id: 2, nombre: 'Financiamiento directo', imagenUrl: '/banner-financiamiento.jpg', texto: 'Financia tu parcela en hasta 60 cuotas sin interés', ctaTexto: 'Más información', ctaUrl: '/financiamiento', activo: true, prioridad: 2 },
    { id: 3, nombre: 'Nuevos proyectos', imagenUrl: '/banner-proyectos.jpg', texto: 'Conoce nuestros 5 nuevos proyectos en la precordillera', ctaTexto: 'Explorar', ctaUrl: '/proyectos', activo: false, prioridad: 3 }
  ]);

  const [bloquesHome, setBloquesHome] = useState<BloqueHome[]>([
    { id: 1, nombre: 'Mensaje temporada alta', tipo: 'campana', contenido: 'Temporada alta: Contáctanos para agendamientos prioritarios', activo: true },
    { id: 2, nombre: 'Aviso mantenimiento', tipo: 'mensaje', contenido: 'El sistema estará en mantenimiento el domingo 4 de febrero de 2:00 a 6:00 AM', activo: false }
  ]);

  // Estados para Configuración
  const [reglaAsignacion, setReglaAsignacion] = useState('round-robin');
  const [tiempoMaximoRespuesta, setTiempoMaximoRespuesta] = useState('24');
  const [estadoSistema, setEstadoSistema] = useState<'produccion' | 'mantenimiento'>('produccion');
  const [modulosActivos, setModulosActivos] = useState({
    leads: true,
    publicaciones: true,
    asignacionAutomatica: true
  });
  const [mensajeGlobal, setMensajeGlobal] = useState('');
  const [reasignacionAutomatica, setReasignacionAutomatica] = useState(true);
  const [horasReasignacion, setHorasReasignacion] = useState('48');
  const [prioridadLeads, setPrioridadLeads] = useState('proyecto');
  const [marcarInactivoDias, setMarcarInactivoDias] = useState('30');
  const [iaActiva, setIaActiva] = useState(true);
  const [nivelScoringIA, setNivelScoringIA] = useState('medio');

  // Estados para Nueva Publicación
  const [showTypeSelectionModal, setShowTypeSelectionModal] = useState(false);
  const [showListingFlow, setShowListingFlow] = useState(false);
  const [showProjectFlow, setShowProjectFlow] = useState(false);
  const [editingParcelaId, setEditingParcelaId] = useState<string | null>(null);
  const [editingProyectoId, setEditingProyectoId] = useState<string | null>(null);

  // Estado para subsección activa de publicaciones
  const [activePublicacionesTab, setActivePublicacionesTab] = useState<'parcelas' | 'proyectos' | 'home' | 'banners' | 'bloques'>('parcelas');

  // Datos mock de parcelas publicadas
  const [parcelasPublicadas, setParcelasPublicadas] = useState([
    {
      id: 'parc-1',
      titulo: 'Parcela Vista Cordillera con acceso pavimentado',
      ubicacion: 'Lo Barnechea, Región Metropolitana',
      superficie: '12.000 m²',
      precio: 'CLP $120.000.000',
      estado: 'publicado' as const,
      vistas: 234,
      consultas: 12,
      fechaPublicacion: '2025-03-05'
    },
    {
      id: 'parc-2',
      titulo: 'Terreno agrícola con pozo de agua',
      ubicacion: 'Colina, Región Metropolitana',
      superficie: '8.500 m²',
      precio: 'CLP $85.000.000',
      estado: 'publicado' as const,
      vistas: 156,
      consultas: 8,
      fechaPublicacion: '2025-03-03'
    },
    {
      id: 'parc-3',
      titulo: 'Parcela sector precordillera',
      ubicacion: 'Pirque, Región Metropolitana',
      superficie: '15.000 m²',
      precio: 'CLP $150.000.000',
      estado: 'borrador' as const,
      vistas: 0,
      consultas: 0,
      fechaPublicacion: '2025-03-08'
    }
  ]);

  // Datos mock de proyectos publicados
  const [proyectosPublicados, setProyectosPublicados] = useState([
    {
      id: 'proy-1',
      titulo: 'Parcelas Los Robles',
      ubicacion: 'San José de Maipo, Región Metropolitana',
      totalParcelas: 45,
      disponibles: 28,
      vendidas: 17,
      precioDesde: 'CLP $95.000.000',
      estado: 'publicado' as const,
      vistas: 542,
      consultas: 34,
      fechaPublicacion: '2025-03-01'
    },
    {
      id: 'proy-2',
      titulo: 'Condominio El Refugio',
      ubicacion: 'Calera de Tango, Región Metropolitana',
      totalParcelas: 32,
      disponibles: 18,
      vendidas: 14,
      precioDesde: 'CLP $78.000.000',
      estado: 'publicado' as const,
      vistas: 387,
      consultas: 21,
      fechaPublicacion: '2025-02-28'
    }
  ]);

  // Datos mock para KPIs con tendencias
  const kpis = [
    {
      label: 'Visitas',
      value: '12,458',
      change: '+12.5%',
      trending: 'up' as const,
      icon: TrendingUp
    },
    {
      label: 'Contactos',
      value: '847',
      change: '+8.2%',
      trending: 'up' as const,
      icon: TrendingUp
    },
    {
      label: 'Reservas',
      value: '124',
      change: '-3.4%',
      trending: 'down' as const,
      icon: TrendingDown
    },
    {
      label: 'Ventas',
      value: '42',
      change: '+15.7%',
      trending: 'up' as const,
      icon: TrendingUp
    }
  ];

  // Datos mock para embudo
  const funnelData = [
    { etapa: 'Visitas', valor: 12458, porcentaje: 100, caida: 0 },
    { etapa: 'Contactos', valor: 847, porcentaje: 6.8, caida: 93.2 },
    { etapa: 'Reservas', valor: 124, porcentaje: 14.6, caida: 85.4 },
    { etapa: 'Ventas', valor: 42, porcentaje: 33.9, caida: 66.1 }
  ];

  // Calcular la mayor caída del proceso
  const mayorCaidaIndex = funnelData.reduce((maxIndex, etapa, index, array) => {
    if (index === 0) return maxIndex;
    return etapa.caida > array[maxIndex].caida ? index : maxIndex;
  }, 1);

  // Datos mock para ranking de proyectos
  const proyectosRanking = [
    { nombre: 'Parcelas Valle Hermoso', visitas: 2845, contactos: 124 },
    { nombre: 'Condominio Los Arrayanes', visitas: 2234, contactos: 98 },
    { nombre: 'Parcelas Río Claro', visitas: 1876, contactos: 87 },
    { nombre: 'Proyecto Colina Verde', visitas: 1654, contactos: 72 },
    { nombre: 'Parcelas La Montaña', visitas: 1432, contactos: 65 }
  ];

  // Datos mock para origen del tráfico
  const trafficSources = [
    { origen: 'Orgánico', porcentaje: 45, valor: 5606 },
    { origen: 'Pagado', porcentaje: 32, valor: 3987 },
    { origen: 'Referido', porcentaje: 18, valor: 2242 },
    { origen: 'Otros', porcentaje: 5, valor: 623 }
  ];

  // Datos mock para leads
  const leadsData = [
    { id: 1, nombre: 'María González', email: 'maria@email.com', telefono: '+56 9 1234 5678', origen: 'Web', estado: 'nuevo', broker: 'Carlos Pérez', fecha: '2025-01-29' },
    { id: 2, nombre: 'Juan Martínez', email: 'juan@email.com', telefono: '+56 9 8765 4321', origen: 'Meta', estado: 'asignado', broker: 'Ana Silva', fecha: '2025-01-29' },
    { id: 3, nombre: 'Patricia López', email: 'patricia@email.com', telefono: '+56 9 5555 1234', origen: 'Google', estado: 'contactado', broker: 'Carlos Pérez', fecha: '2025-01-28' },
    { id: 4, nombre: 'Roberto Díaz', email: 'roberto@email.com', telefono: '+56 9 9999 8888', origen: 'WhatsApp', estado: 'nuevo', broker: '-', fecha: '2025-01-28' },
    { id: 5, nombre: 'Carmen Rojas', email: 'carmen@email.com', telefono: '+56 9 7777 6666', origen: 'Web', estado: 'cerrado', broker: 'Ana Silva', fecha: '2025-01-27' }
  ];

  // Datos mock para proyectos
  const proyectosKpis = [
    { label: 'Proyectos activos', value: '12', change: '+2', trending: 'up' as const },
    { label: 'Leads generados', value: '847', change: '+12.3%', trending: 'up' as const },
    { label: 'Conversión promedio', value: '8.2%', change: '+1.4%', trending: 'up' as const },
    { label: 'Retorno estimado', value: '$24.5M', change: '+18.2%', trending: 'up' as const }
  ];

  const proyectosData = [
    { 
      id: 1, 
      nombre: 'Parcelas Valle Hermoso', 
      ubicacion: 'San José de Maipo, Región Metropolitana',
      estado: 'activo',
      totalParcelas: 45,
      parcelasDisponibles: 28,
      leadsGenerados: 124,
      conversion: 8.5,
      ultimaActividad: 'Hace 2 horas',
      responsable: 'Carlos Pérez'
    },
    { 
      id: 2, 
      nombre: 'Condominio Los Arrayanes', 
      ubicacion: 'Pucón, Región de La Araucanía',
      estado: 'activo',
      totalParcelas: 32,
      parcelasDisponibles: 12,
      leadsGenerados: 98,
      conversion: 12.3,
      ultimaActividad: 'Hace 5 horas',
      responsable: 'Ana Silva'
    },
    { 
      id: 3, 
      nombre: 'Parcelas Río Claro', 
      ubicacion: 'Talca, Región del Maule',
      estado: 'activo',
      totalParcelas: 60,
      parcelasDisponibles: 48,
      leadsGenerados: 87,
      conversion: 6.8,
      ultimaActividad: 'Hace 1 día',
      responsable: 'Carlos Pérez'
    },
    { 
      id: 4, 
      nombre: 'Proyecto Colina Verde', 
      ubicacion: 'Curicó, Región del Maule',
      estado: 'pausado',
      totalParcelas: 25,
      parcelasDisponibles: 25,
      leadsGenerados: 42,
      conversion: 4.2,
      ultimaActividad: 'Hace 3 días',
      responsable: 'Ana Silva'
    },
    { 
      id: 5, 
      nombre: 'Parcelas La Montaña', 
      ubicacion: 'Villarrica, Región de La Araucanía',
      estado: 'activo',
      totalParcelas: 38,
      parcelasDisponibles: 22,
      leadsGenerados: 156,
      conversion: 9.8,
      ultimaActividad: 'Hace 3 horas',
      responsable: 'María Torres'
    },
    { 
      id: 6, 
      nombre: 'Vista al Lago', 
      ubicacion: 'Frutillar, Región de Los Lagos',
      estado: 'completado',
      totalParcelas: 20,
      parcelasDisponibles: 0,
      leadsGenerados: 78,
      conversion: 15.4,
      ultimaActividad: 'Hace 1 semana',
      responsable: 'Carlos Pérez'
    }
  ];

  // Datos mock para configuración - Auditoría
  const actividadSistema = [
    { id: 1, usuario: 'Carlos Pérez', accion: 'Activó módulo de Leads', fecha: '2 feb 2026, 14:30' },
    { id: 2, usuario: 'Ana Silva', accion: 'Cambió regla de asignación automática', fecha: '1 feb 2026, 10:15' },
    { id: 3, usuario: 'Carlos Pérez', accion: 'Modificó tiempo máximo de respuesta', fecha: '31 ene 2026, 16:45' },
    { id: 4, usuario: 'Admin Sistema', accion: 'Desactivó módulo de Publicaciones', fecha: '30 ene 2026, 09:00' },
    { id: 5, usuario: 'Ana Silva', accion: 'Actualizó textos legales', fecha: '28 ene 2026, 11:20' }
  ];

  // Datos mock para roles y permisos
  const rolesData = [
    { nombre: 'Admin', alcance: 'Acceso completo', usuarios: 2 },
    { nombre: 'Marketing', alcance: 'Lectura y edición', usuarios: 5 },
    { nombre: 'Broker', alcance: 'Lectura', usuarios: 12 },
    { nombre: 'Inmobiliaria', alcance: 'Lectura y edición de proyectos', usuarios: 8 }
  ];

  // Datos mock para textos legales
  const textosLegalesData = {
    terminosCondiciones: { activo: true, ultimaActualizacion: '15 ene 2026' },
    politicaPrivacidad: { activo: true, ultimaActualizacion: '15 ene 2026' },
    disclaimerPublicaciones: { activo: true, ultimaActualizacion: '20 dic 2025' }
  };

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'nuevo': return { bg: '#DBEAFE', text: '#1E40AF', label: 'Nuevo' };
      case 'asignado': return { bg: '#E0E7FF', text: '#4338CA', label: 'Asignado' };
      case 'contactado': return { bg: '#DCFCE7', text: '#16A34A', label: 'Contactado' };
      case 'cerrado': return { bg: 'rgba(100, 126, 63, 0.1)', text: '#647E3F', label: 'Cerrado' };
      case 'no-interesado': return { bg: '#FEE2E2', text: '#DC2626', label: 'No interesado' };
      default: return { bg: '#F3F4F6', text: '#6B7280', label: estado };
    }
  };

  const getOrigenIcon = (origen: string) => {
    switch (origen) {
      case 'Web': return <Globe className="w-4 h-4" />;
      case 'Meta': return <span className="w-4 h-4 flex items-center justify-center font-bold text-xs">f</span>;
      case 'Google': return <Search className="w-4 h-4" />;
      case 'WhatsApp': return <Phone className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  const getProyectoEstadoColor = (estado: string) => {
    switch (estado) {
      case 'activo': return { bg: '#DCFCE7', text: '#16A34A', label: 'Activo' };
      case 'pausado': return { bg: '#FEF3C7', text: '#CA8A04', label: 'Pausado' };
      case 'completado': return { bg: '#E0E7FF', text: '#4338CA', label: 'Completado' };
      default: return { bg: '#F3F4F6', text: '#6B7280', label: estado };
    }
  };

  // Funciones para Publicaciones
  const toggleBannerActivo = (bannerId: number) => {
    setBanners(banners.map(banner =>
      banner.id === bannerId
        ? { ...banner, activo: !banner.activo }
        : banner
    ));
  };

  const moveBannerUp = (bannerId: number) => {
    const index = banners.findIndex(b => b.id === bannerId);
    if (index > 0) {
      const newBanners = [...banners];
      [newBanners[index - 1], newBanners[index]] = [newBanners[index], newBanners[index - 1]];
      newBanners[index - 1].prioridad = index;
      newBanners[index].prioridad = index + 1;
      setBanners(newBanners);
    }
  };

  const moveBannerDown = (bannerId: number) => {
    const index = banners.findIndex(b => b.id === bannerId);
    if (index < banners.length - 1) {
      const newBanners = [...banners];
      [newBanners[index], newBanners[index + 1]] = [newBanners[index + 1], newBanners[index]];
      newBanners[index].prioridad = index + 1;
      newBanners[index + 1].prioridad = index + 2;
      setBanners(newBanners);
    }
  };

  const toggleBloqueActivo = (bloqueId: number) => {
    setBloquesHome(bloquesHome.map(bloque =>
      bloque.id === bloqueId
        ? { ...bloque, activo: !bloque.activo }
        : bloque
    ));
  };

  const toggleHeroEstado = () => {
    setHeroHome({ ...heroHome, estado: heroHome.estado === 'publicado' ? 'borrador' : 'publicado' });
  };

  // Funciones para Nueva Publicación
  const handlePublishListing = (data: any) => {
    console.log('Nueva parcela publicada:', data);
    setShowListingFlow(false);
    // Aquí se integraría con el backend para crear la publicación
  };

  const handlePublishProject = (data: any) => {
    console.log('Nuevo proyecto publicado:', data);
    setShowProjectFlow(false);
    // Aquí se integraría con el backend para crear el proyecto
  };

  // Funciones para administrar parcelas publicadas
  const handleEditParcela = (id: string) => {
    console.log('Editar parcela:', id);
    setEditingParcelaId(id);
    setShowListingFlow(true);
  };

  const handleDeleteParcela = (id: string) => {
    setParcelasPublicadas(parcelasPublicadas.filter(p => p.id !== id));
  };

  const handleToggleEstadoParcela = (id: string) => {
    setParcelasPublicadas(parcelasPublicadas.map(p => 
      p.id === id 
        ? { ...p, estado: p.estado === 'publicado' ? 'borrador' as const : 'publicado' as const }
        : p
    ));
  };

  // Funciones para administrar proyectos publicados
  const handleEditProyecto = (id: string) => {
    console.log('Editar proyecto:', id);
    setEditingProyectoId(id);
    setShowProjectFlow(true);
  };

  const handleDeleteProyecto = (id: string) => {
    setProyectosPublicados(proyectosPublicados.filter(p => p.id !== id));
  };

  const handleToggleEstadoProyecto = (id: string) => {
    setProyectosPublicados(proyectosPublicados.map(p => 
      p.id === id 
        ? { ...p, estado: p.estado === 'publicado' ? 'borrador' as const : 'publicado' as const }
        : p
    ));
  };

  const navItems = [
    { id: 'inicio' as NavItem, icon: Home, label: 'Inicio' },
    { id: 'leads' as NavItem, icon: Users, label: 'Leads' },
    { id: 'analitica' as NavItem, icon: BarChart3, label: 'Analítica' },
    { id: 'embudo' as NavItem, icon: TrendingDown, label: 'Embudo' },
    { id: 'proyectos' as NavItem, icon: FolderOpen, label: 'Proyectos' },
    { id: 'publicaciones' as NavItem, icon: Layout, label: 'Publicaciones' },
    { id: 'configuracion' as NavItem, icon: Settings, label: 'Configuración' }
  ];

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#FAFAFA' }}>
      {/* Nav Rail */}
      <nav
        className="fixed left-0 top-0 h-full flex flex-col"
        style={{
          width: '256px',
          backgroundColor: '#FAFAFA',
          borderRight: '1px solid #DEDEDE',
          zIndex: 50
        }}
      >
        {/* Logo/Brand */}
        <div
          className="px-6 py-8"
          style={{
            borderBottom: '1px solid #DEDEDE'
          }}
        >
          <h2 style={{ 
            fontFamily: 'var(--font-heading)', 
            fontWeight: 'var(--font-weight-semibold)',
            fontSize: 'var(--font-size-h4)',
            color: '#0A0A0A',
            lineHeight: 'var(--line-height-heading)'
          }}>
            CompraTuParcela
          </h2>
        </div>

        {/* Nav Items */}
        <div className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className="w-full flex items-center gap-3 px-6 py-3 transition-all"
                style={{
                  backgroundColor: isActive ? '#CDD8DE' : 'transparent',
                  color: '#124854',
                  fontFamily: 'var(--font-body)',
                  fontWeight: isActive ? 'var(--font-weight-medium)' : 'var(--font-weight-regular)',
                  fontSize: 'var(--font-size-body-sm)',
                  lineHeight: 'var(--line-height-ui)'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'rgba(100, 126, 63, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <Icon className="w-5 h-5" style={{ strokeWidth: isActive ? 2.5 : 2 }} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* User Profile Area */}
        <div className="px-6 py-4" style={{ borderTop: '1px solid #DEDEDE' }}>
          <div className="w-full flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E8E7E6', border: '1px solid #DEDEDE' }}>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--font-size-body-base)',
                fontWeight: 'var(--font-weight-semibold)',
                color: '#737373'
              }}>A</span>
            </div>
            <div className="flex-1 text-left">
              <div style={{ 
                fontWeight: 'var(--font-weight-medium)',
                color: '#0A0A0A',
                fontSize: 'var(--font-size-body-sm)',
                fontFamily: 'var(--font-body)'
              }}>
                Admin
              </div>
              <div style={{ 
                fontSize: 'var(--font-size-xs)',
                color: '#737373',
                marginTop: '2px',
                fontFamily: 'var(--font-body)'
              }}>
                Administrador
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1" style={{ marginLeft: '256px' }}>
        {/* Header */}
        <div
          className="sticky top-0 z-40"
          style={{
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #E5E5E5'
          }}
        >
          {/* Header principal - ocultamos cuando el detalle de lead está abierto */}
          {!(activeNav === 'leads' && isDrawerOpen) && (
            <div className="px-8 py-6">
              <div className="flex items-center justify-between">
                {/* Title */}
                <div>
                  <h1
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-h2)',
                      fontWeight: 'var(--font-weight-regular)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-heading)',
                      marginBottom: '4px'
                    }}
                  >
                  {activeNav === 'inicio' && 'Inicio'}
                  {activeNav === 'leads' && 'Leads'}
                  {activeNav === 'analitica' && 'Analítica'}
                  {activeNav === 'embudo' && 'Embudo'}
                  {activeNav === 'proyectos' && 'Proyectos'}
                  {activeNav === 'publicaciones' && 'Publicaciones'}
                  {activeNav === 'configuracion' && 'Configuración'}
                </h1>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    color: '#737373',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  {activeNav === 'inicio' && 'Visión general del rendimiento del canal digital'}
                  {activeNav === 'leads' && 'Gestión y seguimiento de leads'}
                  {activeNav === 'analitica' && 'Entender el comportamiento del canal digital e identificar proyectos de mayor interés'}
                  {activeNav === 'embudo' && 'Análisis detallado del proceso de conversión'}
                  {activeNav === 'proyectos' && 'Gestión y seguimiento de proyectos'}
                  {activeNav === 'publicaciones' && 'Gestión de contenidos visibles del Home'}
                  {activeNav === 'configuracion' && 'Gestión de reglas globales del sistema'}
                </p>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-3">
                {/* Date Range Filter */}
                <div className="relative">
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="appearance-none pl-4 pr-10 py-2.5 rounded-full transition-all cursor-pointer"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #DEDEDE',
                      lineHeight: 'var(--line-height-ui)',
                      letterSpacing: 'var(--letter-spacing-wide)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#FAFAFA';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#FFFFFF';
                    }}
                  >
                    <option value="ultimos-7-dias">Últimos 7 días</option>
                    <option value="ultimos-30-dias">Últimos 30 días</option>
                    <option value="ultimos-90-dias">Últimos 90 días</option>
                    <option value="este-ano">Este año</option>
                  </select>
                  <Calendar
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none"
                    style={{ color: '#737373' }}
                  />
                </div>

                {/* Device Filter */}
                <div className="relative">
                  <select
                    value={deviceFilter}
                    onChange={(e) => setDeviceFilter(e.target.value)}
                    className="appearance-none pl-4 pr-10 py-2.5 rounded-full transition-all cursor-pointer"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #DEDEDE',
                      lineHeight: 'var(--line-height-ui)',
                      letterSpacing: 'var(--letter-spacing-wide)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#FAFAFA';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#FFFFFF';
                    }}
                  >
                    <option value="todos">Todos</option>
                    <option value="desktop">Desktop</option>
                    <option value="mobile">Mobile</option>
                  </select>
                  <Monitor
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none"
                    style={{ color: '#737373' }}
                  />
                </div>

                {/* Origen Filter */}
                <div className="relative">
                  <select
                    value={origenFilter}
                    onChange={(e) => setOrigenFilter(e.target.value)}
                    className="appearance-none pl-4 pr-10 py-2.5 rounded-full transition-all cursor-pointer"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #DEDEDE',
                      lineHeight: 'var(--line-height-ui)',
                      letterSpacing: 'var(--letter-spacing-wide)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#FAFAFA';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#FFFFFF';
                    }}
                  >
                    <option value="todos">Todos</option>
                    <option value="organico">Orgánico</option>
                    <option value="pagado">Pagado</option>
                    <option value="referido">Referido</option>
                    <option value="otros">Otros</option>
                  </select>
                  <MessageCircle
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none"
                    style={{ color: '#737373' }}
                  />
                </div>

                {/* Lead Status Filter */}
                <div className="relative">
                  <select
                    value={leadStatusFilter}
                    onChange={(e) => setLeadStatusFilter(e.target.value)}
                    className="appearance-none pl-4 pr-10 py-2.5 rounded-full transition-all cursor-pointer"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #DEDEDE',
                      lineHeight: 'var(--line-height-ui)',
                      letterSpacing: 'var(--letter-spacing-wide)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#FAFAFA';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#FFFFFF';
                    }}
                  >
                    <option value="todos">Todos</option>
                    <option value="nuevo">Nuevo</option>
                    <option value="contactado">Contactado</option>
                    <option value="calificado">Calificado</option>
                    <option value="propuesta">Propuesta</option>
                    <option value="cerrado">Cerrado</option>
                  </select>
                  <UserCheck
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none"
                    style={{ color: '#737373' }}
                  />
                </div>
              </div>
            </div>
          </div>
          )}
        </div>

        {/* Content */}
        <div className="p-8">
          {activeNav === 'inicio' && (
            <>
              {/* KPIs Section */}
              <section className="grid grid-cols-4 gap-6 mb-8">
                {kpis.map((kpi, index) => (
                  <div
                    key={index}
                    className="rounded-2xl p-6 flex flex-col"
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E5E5',
                      boxShadow: '0 4px 12px 0 rgba(18, 72, 84, 0.08)',
                      minHeight: '140px'
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#6B6B6B',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          lineHeight: '1.2'
                        }}
                      >
                        {kpi.label}
                      </p>
                      <div
                        className="flex items-center gap-1 px-2.5 py-1 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: kpi.trending === 'up' ? '#DCFCE7' : '#FEE2E2'
                        }}
                      >
                        {kpi.trending === 'up' ? (
                          <ArrowUpRight className="w-3 h-3 flex-shrink-0" style={{ color: '#16A34A' }} />
                        ) : (
                          <ArrowDownRight className="w-3 h-3 flex-shrink-0" style={{ color: '#DC2626' }} />
                        )}
                        <span
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '11px',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: kpi.trending === 'up' ? '#16A34A' : '#DC2626',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {kpi.change}
                        </span>
                      </div>
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '40px',
                        fontWeight: 'var(--font-weight-light)',
                        color: '#0A0A0A',
                        lineHeight: '1',
                        marginTop: 'auto'
                      }}
                    >
                      {kpi.value}
                    </p>
                  </div>
                ))}
              </section>

              <div className="grid grid-cols-12 gap-6">
                {/* Proceso de conversión */}
                <section
                  className="col-span-7 rounded-2xl p-6"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E5E5',
                    boxShadow: '0 4px 12px 0 rgba(18, 72, 84, 0.08)'
                  }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: 'var(--font-size-h4)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#0A0A0A',
                          lineHeight: 'var(--line-height-heading)',
                          marginBottom: '4px'
                        }}
                      >
                        Proceso de conversión
                      </h2>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          color: '#A3A3A3',
                          lineHeight: 'var(--line-height-body)'
                        }}
                      >
                        Datos correspondientes al período seleccionado
                      </p>
                    </div>
                  </div>

                  {/* Funnel visual rediseñado */}
                  <div className="flex flex-col gap-0">
                    {funnelData.map((etapa, index) => {
                      const isMayorCaida = index === mayorCaidaIndex;
                      // Calcular tasa de conversión respecto a etapa anterior
                      const tasaConversion = index > 0 
                        ? ((etapa.valor / funnelData[index - 1].valor) * 100).toFixed(1)
                        : '100.0';
                      
                      return (
                        <div key={index} className="relative">
                          {/* Línea de conexión entre etapas */}
                          {index > 0 && (
                            <div className="flex items-center justify-center py-2">
                              <div 
                                style={{
                                  width: '2px',
                                  height: '20px',
                                  backgroundColor: '#E5E5E5'
                                }}
                              />
                            </div>
                          )}
                          
                          {/* Card de etapa */}
                          <div
                            className="rounded-xl p-5 transition-all"
                            style={{
                              backgroundColor: '#FAFAFA',
                              border: '1px solid #E5E5E5'
                            }}
                          >
                            <div className="flex items-center justify-between">
                              {/* Info principal */}
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3
                                    style={{
                                      fontFamily: 'var(--font-body)',
                                      fontSize: 'var(--font-size-body-base)',
                                      fontWeight: 'var(--font-weight-semibold)',
                                      color: '#0A0A0A',
                                      lineHeight: '1.3'
                                    }}
                                  >
                                    {etapa.etapa}
                                  </h3>
                                  {isMayorCaida && (
                                    <div 
                                      className="flex items-center gap-1 px-2 py-0.5 rounded"
                                      style={{ 
                                        backgroundColor: '#FEF3C7'
                                      }}
                                    >
                                      <AlertTriangle 
                                        className="w-3 h-3" 
                                        style={{ color: '#CA8A04' }} 
                                      />
                                      <span
                                        style={{
                                          fontFamily: 'var(--font-body)',
                                          fontSize: '10px',
                                          fontWeight: 'var(--font-weight-medium)',
                                          color: '#CA8A04',
                                          textTransform: 'uppercase',
                                          letterSpacing: '0.05em'
                                        }}
                                      >
                                        Mayor caída
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <p
                                  style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: 'var(--font-size-h2)',
                                    fontWeight: 'var(--font-weight-light)',
                                    color: '#0A0A0A',
                                    lineHeight: '1'
                                  }}
                                >
                                  {etapa.valor.toLocaleString()}
                                </p>
                              </div>

                              {/* Tasa de conversión */}
                              <div className="flex flex-col items-end gap-1">
                                {index > 0 && (
                                  <>
                                    <span
                                      style={{
                                        fontFamily: 'var(--font-body)',
                                        fontSize: 'var(--font-size-xs)',
                                        color: '#737373',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                      }}
                                    >
                                      Tasa conversión
                                    </span>
                                    <span
                                      style={{
                                        fontFamily: 'var(--font-heading)',
                                        fontSize: 'var(--font-size-h4)',
                                        fontWeight: 'var(--font-weight-semibold)',
                                        color: '#0A0A0A',
                                        lineHeight: '1'
                                      }}
                                    >
                                      {tasaConversion}%
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>

                            {/* Barra de progreso visual */}
                            <div 
                              className="mt-4 rounded-full overflow-hidden"
                              style={{
                                height: '6px',
                                backgroundColor: '#E5E5E5'
                              }}
                            >
                              <div
                                style={{
                                  width: `${etapa.porcentaje}%`,
                                  height: '100%',
                                  backgroundColor: '#404040',
                                  transition: 'width 0.3s ease'
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* Origen del tráfico */}
                <section
                  className="col-span-5 rounded-2xl p-6"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E5E5',
                    boxShadow: '0 4px 12px 0 rgba(18, 72, 84, 0.08)'
                  }}
                >
                  <h2
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-h4)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-heading)',
                      marginBottom: '24px'
                    }}
                  >
                    Origen del tráfico
                  </h2>

                  {/* Donut Chart */}
                  <div style={{ height: '240px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={trafficSources.map(source => ({
                            name: source.origen,
                            value: source.porcentaje
                          }))}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {trafficSources.map((entry, index) => {
                            // Paleta monocromática de negro a gris claro (sin azul)
                            const colors = ['#0A0A0A', '#404040', '#737373', '#A3A3A3'];
                            return <Cell key={`cell-${index}`} fill={colors[index]} />;
                          })}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #E5E5E5',
                            borderRadius: '12px',
                            padding: '8px 12px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)'
                          }}
                          formatter={(value: any) => `${value}%`}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Legend */}
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    {trafficSources.map((source, index) => {
                      // Paleta monocromática de negro a gris claro (sin azul)
                      const colors = ['#0A0A0A', '#404040', '#737373', '#A3A3A3'];
                      return (
                        <div key={index} className="flex items-center gap-2">
                          <div
                            style={{
                              width: '12px',
                              height: '12px',
                              borderRadius: '3px',
                              backgroundColor: colors[index],
                              flexShrink: 0
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <div
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--font-size-xs)',
                                fontWeight: 'var(--font-weight-medium)',
                                color: '#0A0A0A',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}
                            >
                              {source.origen}
                            </div>
                            <div className="flex items-center gap-2">
                              <span
                                style={{
                                  fontFamily: 'var(--font-body)',
                                  fontSize: 'var(--font-size-body-base)',
                                  fontWeight: 'var(--font-weight-semibold)',
                                  color: '#0A0A0A'
                                }}
                              >
                                {source.porcentaje}%
                              </span>
                              <span
                                style={{
                                  fontFamily: 'var(--font-body)',
                                  fontSize: 'var(--font-size-xs)',
                                  color: '#A3A3A3'
                                }}
                              >
                                {source.valor.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>

              {/* Ranking de proyectos */}
              <section
                className="mt-6 rounded-2xl overflow-hidden"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E5E5',
                  boxShadow: '0 4px 12px 0 rgba(18, 72, 84, 0.08)'
                }}
              >
                <div
                  className="px-6 py-5"
                  style={{
                    borderBottom: '1px solid #E5E5E5'
                  }}
                >
                  <h2
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-h4)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-heading)'
                    }}
                  >
                    Proyectos más visitados
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead
                      style={{
                        backgroundColor: '#FAFAFA',
                        borderBottom: '1px solid #E5E5E5'
                      }}
                    >
                      <tr>
                        <th
                          className="px-6 py-4 text-left"
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: '#6B6B6B',
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                            width: '60px'
                          }}
                        >
                          #
                        </th>
                        <th
                          className="px-6 py-4 text-left"
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: '#6B6B6B',
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em'
                          }}
                        >
                          Proyecto
                        </th>
                        <th
                          className="px-6 py-4 text-right"
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: '#6B6B6B',
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em'
                          }}
                        >
                          Visitas
                        </th>
                        <th
                          className="px-6 py-4 text-right"
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: '#6B6B6B',
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em'
                          }}
                        >
                          Contactos
                        </th>
                        <th
                          className="px-6 py-4 text-right"
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: '#6B6B6B',
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em'
                          }}
                        >
                          Tasa
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {proyectosRanking.map((proyecto, index) => (
                        <tr
                          key={index}
                          className="transition-colors"
                          style={{
                            borderBottom: '1px solid #F5F5F5'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#FAFAFA';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#FFFFFF';
                          }}
                        >
                          <td className="px-6 py-4">
                            <div
                              className="flex items-center justify-center"
                              style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '8px',
                                backgroundColor: index < 3 ? '#124854' : '#F5F5F5',
                                color: index < 3 ? '#FFFFFF' : '#737373',
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--font-size-body-sm)',
                                fontWeight: 'var(--font-weight-semibold)'
                              }}
                            >
                              {index + 1}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--font-size-body-sm)',
                                fontWeight: 'var(--font-weight-medium)',
                                color: '#0A0A0A'
                              }}
                            >
                              {proyecto.nombre}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--font-size-body-sm)',
                                color: '#0A0A0A'
                              }}
                            >
                              {proyecto.visitas.toLocaleString()}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--font-size-body-sm)',
                                color: '#0A0A0A'
                              }}
                            >
                              {proyecto.contactos}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--font-size-body-sm)',
                                fontWeight: 'var(--font-weight-medium)',
                                color: '#0A0A0A'
                              }}
                            >
                              {((proyecto.contactos / proyecto.visitas) * 100).toFixed(1)}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}

          {activeNav === 'analitica' && <AdminAnaliticaView />}
          {activeNav === 'embudo' && <AdminEmbudoView />}

          {/* PROYECTOS */}
          {activeNav === 'proyectos' && (
            <>
              {/* KPIs de Proyectos */}
              <section className="grid grid-cols-4 gap-6 mb-8">
                {proyectosKpis.map((kpi, index) => (
                  <div
                    key={index}
                    className="rounded-2xl p-6 flex flex-col"
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E5E5',
                      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                      minHeight: '140px'
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#6B6B6B',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          lineHeight: '1.2'
                        }}
                      >
                        {kpi.label}
                      </p>
                      <div
                        className="flex items-center gap-1 px-2.5 py-1 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: kpi.trending === 'up' ? '#DCFCE7' : '#FEE2E2'
                        }}
                      >
                        {kpi.trending === 'up' ? (
                          <ArrowUpRight className="w-3 h-3 flex-shrink-0" style={{ color: '#16A34A' }} />
                        ) : (
                          <ArrowDownRight className="w-3 h-3 flex-shrink-0" style={{ color: '#DC2626' }} />
                        )}
                        <span
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '11px',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: kpi.trending === 'up' ? '#16A34A' : '#DC2626',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {kpi.change}
                        </span>
                      </div>
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '40px',
                        fontWeight: 'var(--font-weight-light)',
                        color: '#0A0A0A',
                        lineHeight: '1',
                        marginTop: 'auto'
                      }}
                    >
                      {kpi.value}
                    </p>
                  </div>
                ))}
              </section>

              {/* Listado de Proyectos */}
              <section
                className="rounded-2xl overflow-hidden"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E5E5',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                }}
              >
                <div
                  className="px-6 py-5"
                  style={{
                    borderBottom: '1px solid #E5E5E5'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <h2
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'var(--font-size-h4)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#0A0A0A',
                        lineHeight: 'var(--line-height-heading)'
                      }}
                    >
                      Proyectos inmobiliarios
                    </h2>
                    <button
                      className="flex items-center gap-2 px-4 py-2.5 rounded-full transition-all"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#0A0A0A',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #DEDEDE'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#FAFAFA';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#FFFFFF';
                      }}
                    >
                      <Download className="w-4 h-4" />
                      Exportar
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead
                      style={{
                        backgroundColor: '#FAFAFA',
                        borderBottom: '1px solid #E5E5E5'
                      }}
                    >
                      <tr>
                        <th
                          className="px-6 py-4 text-left"
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: '#6B6B6B',
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em'
                          }}
                        >
                          Proyecto
                        </th>
                        <th
                          className="px-6 py-4 text-center"
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: '#6B6B6B',
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em'
                          }}
                        >
                          Estado
                        </th>
                        <th
                          className="px-6 py-4 text-right"
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: '#6B6B6B',
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em'
                          }}
                        >
                          Parcelas
                        </th>
                        <th
                          className="px-6 py-4 text-right"
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: '#6B6B6B',
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em'
                          }}
                        >
                          Leads
                        </th>
                        <th
                          className="px-6 py-4 text-right"
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: '#6B6B6B',
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em'
                          }}
                        >
                          Conversión
                        </th>
                        <th
                          className="px-6 py-4 text-left"
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: '#6B6B6B',
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em'
                          }}
                        >
                          Responsable
                        </th>
                        <th
                          className="px-6 py-4 text-right"
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: '#6B6B6B',
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em'
                          }}
                        >
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {proyectosData.map((proyecto) => {
                        const estadoStyle = getProyectoEstadoColor(proyecto.estado);
                        return (
                          <tr
                            key={proyecto.id}
                            className="transition-colors"
                            style={{
                              borderBottom: '1px solid #F5F5F5'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#FAFAFA';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#FFFFFF';
                            }}
                          >
                            <td className="px-6 py-5">
                              <div>
                                <div
                                  style={{
                                    fontFamily: 'var(--font-body)',
                                    fontSize: 'var(--font-size-body-sm)',
                                    fontWeight: 'var(--font-weight-semibold)',
                                    color: '#0A0A0A',
                                    marginBottom: '4px'
                                  }}
                                >
                                  {proyecto.nombre}
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <FolderOpen className="w-3.5 h-3.5" style={{ color: '#A3A3A3' }} />
                                  <span
                                    style={{
                                      fontFamily: 'var(--font-body)',
                                      fontSize: 'var(--font-size-xs)',
                                      color: '#A3A3A3'
                                    }}
                                  >
                                    {proyecto.ubicacion}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-5 text-center">
                              <span
                                className="inline-flex items-center px-3 py-1 rounded-full"
                                style={{
                                  backgroundColor: estadoStyle.bg,
                                  color: estadoStyle.text,
                                  fontFamily: 'var(--font-body)',
                                  fontSize: 'var(--font-size-xs)',
                                  fontWeight: 'var(--font-weight-semibold)'
                                }}
                              >
                                {estadoStyle.label}
                              </span>
                            </td>
                            <td className="px-6 py-5">
                              <div className="text-right">
                                <div
                                  style={{
                                    fontFamily: 'var(--font-body)',
                                    fontSize: 'var(--font-size-body-sm)',
                                    fontWeight: 'var(--font-weight-semibold)',
                                    color: '#0A0A0A',
                                    marginBottom: '2px'
                                  }}
                                >
                                  {proyecto.parcelasDisponibles}/{proyecto.totalParcelas}
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'var(--font-body)',
                                    fontSize: 'var(--font-size-xs)',
                                    color: '#A3A3A3'
                                  }}
                                >
                                  disponibles
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-5 text-right">
                              <span
                                style={{
                                  fontFamily: 'var(--font-body)',
                                  fontSize: 'var(--font-size-body-sm)',
                                  fontWeight: 'var(--font-weight-semibold)',
                                  color: '#0A0A0A'
                                }}
                              >
                                {proyecto.leadsGenerados}
                              </span>
                            </td>
                            <td className="px-6 py-5 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <div
                                  className="flex-shrink-0"
                                  style={{
                                    width: '60px',
                                    height: '6px',
                                    backgroundColor: '#E5E5E5',
                                    borderRadius: '3px',
                                    overflow: 'hidden'
                                  }}
                                >
                                  <div
                                    style={{
                                      width: `${proyecto.conversion * 10}%`,
                                      height: '100%',
                                      backgroundColor: proyecto.conversion >= 10 ? '#16A34A' : proyecto.conversion >= 7 ? '#CA8A04' : '#DC2626',
                                      transition: 'width 0.3s ease'
                                    }}
                                  />
                                </div>
                                <span
                                  style={{
                                    fontFamily: 'var(--font-body)',
                                    fontSize: 'var(--font-size-body-sm)',
                                    fontWeight: 'var(--font-weight-semibold)',
                                    color: '#0A0A0A',
                                    minWidth: '45px',
                                    textAlign: 'right'
                                  }}
                                >
                                  {proyecto.conversion}%
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-5">
                              <div>
                                <div
                                  style={{
                                    fontFamily: 'var(--font-body)',
                                    fontSize: 'var(--font-size-body-sm)',
                                    color: '#0A0A0A',
                                    marginBottom: '2px'
                                  }}
                                >
                                  {proyecto.responsable}
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'var(--font-body)',
                                    fontSize: 'var(--font-size-xs)',
                                    color: '#A3A3A3'
                                  }}
                                >
                                  {proyecto.ultimaActividad}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-5">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all"
                                  style={{
                                    fontFamily: 'var(--font-body)',
                                    fontSize: 'var(--font-size-xs)',
                                    fontWeight: 'var(--font-weight-medium)',
                                    color: '#0A0A0A',
                                    backgroundColor: '#FAFAFA',
                                    border: '1px solid #E5E5E5'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#E8E7E6';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#FAFAFA';
                                  }}
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  Ver
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}

          {/* LEADS */}
          {activeNav === 'leads' && (
            <>
              {!isDrawerOpen ? (
                <section
                  className="rounded-2xl p-6"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E5E5',
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'var(--font-size-h4)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#0A0A0A',
                        lineHeight: 'var(--line-height-heading)'
                      }}
                    >
                      Gestión de leads
                    </h2>
                    <button
                      className="flex items-center gap-2 px-4 py-2.5 rounded-full transition-all"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#0A0A0A',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #DEDEDE'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#FAFAFA';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#FFFFFF';
                      }}
                    >
                      <Download className="w-4 h-4" />
                      Exportar
                    </button>
                  </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead style={{ backgroundColor: '#FAFAFA', borderBottom: '1px solid #E5E5E5' }}>
                    <tr>
                      <th
                        className="px-6 py-4 text-left"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: '#6B6B6B',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em'
                        }}
                      >
                        Nombre
                      </th>
                      <th
                        className="px-6 py-4 text-left"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: '#6B6B6B',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em'
                        }}
                      >
                        Contacto
                      </th>
                      <th
                        className="px-6 py-4 text-center"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: '#6B6B6B',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em'
                        }}
                      >
                        Origen
                      </th>
                      <th
                        className="px-6 py-4 text-center"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: '#6B6B6B',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em'
                        }}
                      >
                        Estado
                      </th>
                      <th
                        className="px-6 py-4 text-left"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: '#6B6B6B',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em'
                        }}
                      >
                        Broker
                      </th>
                      <th
                        className="px-6 py-4 text-left"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: '#6B6B6B',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em'
                        }}
                      >
                        Fecha
                      </th>
                      <th
                        className="px-6 py-4 text-center"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: '#6B6B6B',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em'
                        }}
                      >
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {leadsData.map((lead) => {
                      const statusStyle = getStatusColor(lead.estado);
                      return (
                        <tr
                          key={lead.id}
                          className="transition-colors"
                          style={{ borderBottom: '1px solid #F3F4F6' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#FAFAFA';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#FFFFFF';
                          }}
                        >
                          <td className="px-6 py-4">
                            <span
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--font-size-body-sm)',
                                fontWeight: 'var(--font-weight-medium)',
                                color: '#0A0A0A'
                              }}
                            >
                              {lead.nombre}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <Mail className="w-3.5 h-3.5" style={{ color: '#737373' }} />
                                <span
                                  style={{
                                    fontFamily: 'var(--font-body)',
                                    fontSize: 'var(--font-size-xs)',
                                    color: '#737373'
                                  }}
                                >
                                  {lead.email}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="w-3.5 h-3.5" style={{ color: '#737373' }} />
                                <span
                                  style={{
                                    fontFamily: 'var(--font-body)',
                                    fontSize: 'var(--font-size-xs)',
                                    color: '#737373'
                                  }}
                                >
                                  {lead.telefono}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div
                              className="inline-flex items-center gap-2 px-3 py-1 rounded-full"
                              style={{ backgroundColor: '#FAFAFA', border: '1px solid #E5E5E5' }}
                            >
                              <div style={{ color: '#0A0A0A' }}>{getOrigenIcon(lead.origen)}</div>
                              <span
                                style={{
                                  fontFamily: 'var(--font-body)',
                                  fontSize: 'var(--font-size-xs)',
                                  fontWeight: 'var(--font-weight-medium)',
                                  color: '#0A0A0A'
                                }}
                              >
                                {lead.origen}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span
                              className="inline-flex items-center px-3 py-1 rounded-full"
                              style={{
                                backgroundColor: statusStyle.bg,
                                color: statusStyle.text,
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--font-size-xs)',
                                fontWeight: 'var(--font-weight-semibold)'
                              }}
                            >
                              {statusStyle.label}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--font-size-body-sm)',
                                color: '#737373'
                              }}
                            >
                              {lead.broker}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--font-size-body-sm)',
                                color: '#737373'
                              }}
                            >
                              {lead.fecha}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full transition-all"
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--font-size-xs)',
                                fontWeight: 'var(--font-weight-medium)',
                                color: '#0A0A0A',
                                backgroundColor: '#FAFAFA',
                                border: '1px solid #E5E5E5'
                              }}
                              onClick={() => {
                                setSelectedLead(lead);
                                setIsDrawerOpen(true);
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#E8E7E6';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#FAFAFA';
                              }}
                            >
                              <Eye className="w-3.5 h-3.5" />
                              Ver detalle
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
              ) : (
                <LeadDetailDrawer
                  lead={selectedLead}
                  isOpen={isDrawerOpen}
                  onClose={() => {
                    setIsDrawerOpen(false);
                    setSelectedLead(null);
                  }}
                />
              )}
            </>
          )}

          {/* SECCIÓN: PUBLICACIONES */}
          {activeNav === 'publicaciones' && (
            <>
              {/* Componente de administración de publicaciones (Parcelas y Proyectos) o secciones del Home */}
              {(activePublicacionesTab === 'parcelas' || activePublicacionesTab === 'proyectos') ? (
                <AdminPublicacionesSection
                  activeTab={activePublicacionesTab}
                  onTabChange={setActivePublicacionesTab}
                  parcelasPublicadas={parcelasPublicadas}
                  proyectosPublicados={proyectosPublicados}
                  onNewPublicacion={() => setShowTypeSelectionModal(true)}
                  onEditParcela={handleEditParcela}
                  onDeleteParcela={handleDeleteParcela}
                  onToggleEstadoParcela={handleToggleEstadoParcela}
                  onEditProyecto={handleEditProyecto}
                  onDeleteProyecto={handleDeleteProyecto}
                  onToggleEstadoProyecto={handleToggleEstadoProyecto}
                />
              ) : (
                <>
                  {/* Tabs de navegación */}
                  <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2" style={{ borderBottom: '1px solid var(--border)' }}>
                    {[
                      { id: 'parcelas' as const, label: 'Parcelas' },
                      { id: 'proyectos' as const, label: 'Proyectos' },
                      { id: 'home' as const, label: 'Hero del Home' },
                      { id: 'banners' as const, label: 'Banners' },
                      { id: 'bloques' as const, label: 'Bloques informativos' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActivePublicacionesTab(tab.id)}
                        className="px-4 py-3 whitespace-nowrap transition-all"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: activePublicacionesTab === tab.id ? '#124854' : '#737373',
                          borderBottom: activePublicacionesTab === tab.id ? '2px solid #124854' : '2px solid transparent',
                          backgroundColor: 'transparent'
                        }}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* Hero Principal */}
              {activePublicacionesTab === 'home' && (
              <section className="rounded-2xl p-6 mb-6" style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'var(--font-size-h4)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: 'var(--foreground)',
                        lineHeight: 'var(--line-height-heading)',
                        marginBottom: '4px'
                      }}
                    >
                      Hero principal del Home
                    </h2>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#737373',
                        lineHeight: 'var(--line-height-body)'
                      }}
                    >
                      Imagen o video destacado con llamado a la acción principal
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-flex items-center px-3 py-1.5 rounded-full"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-xs)',
                        fontWeight: 'var(--font-weight-medium)',
                        backgroundColor: heroHome.estado === 'publicado' ? '#DCFCE7' : '#FEF3C7',
                        color: heroHome.estado === 'publicado' ? '#16A34A' : '#CA8A04'
                      }}
                    >
                      {heroHome.estado === 'publicado' ? 'Publicado' : 'Borrador'}
                    </span>
                    <button
                      onClick={toggleHeroEstado}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#FFFFFF',
                        backgroundColor: '#124854',
                        border: 'none'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#0D3640';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#124854';
                      }}
                    >
                      <Save className="w-4 h-4" />
                      {heroHome.estado === 'publicado' ? 'Mover a borrador' : 'Publicar'}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* Preview */}
                  <div>
                    <label
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-xs)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#737373',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        display: 'block',
                        marginBottom: '12px'
                      }}
                    >
                      Preview
                    </label>
                    <div
                      className="rounded-xl overflow-hidden relative"
                      style={{
                        backgroundColor: '#F5F5F5',
                        border: '1px solid var(--border)',
                        aspectRatio: '16/9'
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        {heroHome.tipo === 'imagen' ? (
                          <ImageIcon className="w-16 h-16" style={{ color: '#C3C3C3' }} />
                        ) : (
                          <Video className="w-16 h-16" style={{ color: '#C3C3C3' }} />
                        )}
                      </div>
                      <div
                        className="absolute bottom-0 left-0 right-0 p-6"
                        style={{
                          background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)'
                        }}
                      >
                        <h3
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'var(--font-size-h3)',
                            fontWeight: 'var(--font-weight-medium)',
                            color: '#FFFFFF',
                            marginBottom: '8px'
                          }}
                        >
                          {heroHome.titulo}
                        </h3>
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-base)',
                            color: '#E5E5E5',
                            marginBottom: '16px'
                          }}
                        >
                          {heroHome.subtitulo}
                        </p>
                        <div
                          className="inline-flex items-center px-6 py-3 rounded-lg"
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            fontWeight: 'var(--font-weight-medium)',
                            color: '#0A0A0A',
                            backgroundColor: '#FFFFFF'
                          }}
                        >
                          {heroHome.ctaTexto}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Formulario de edición */}
                  <div className="space-y-4">
                    <div>
                      <label
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: 'var(--foreground)',
                          display: 'block',
                          marginBottom: '8px'
                        }}
                      >
                        Tipo de contenido
                      </label>
                      <select
                        value={heroHome.tipo}
                        onChange={(e) => setHeroHome({ ...heroHome, tipo: e.target.value as 'imagen' | 'video' })}
                        className="w-full px-4 py-2.5 rounded-lg"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          color: 'var(--foreground)',
                          backgroundColor: 'var(--background)',
                          border: '1px solid var(--border)'
                        }}
                      >
                        <option value="imagen">Imagen</option>
                        <option value="video">Video</option>
                      </select>
                    </div>

                    <div>
                      <label
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: 'var(--foreground)',
                          display: 'block',
                          marginBottom: '8px'
                        }}
                      >
                        Título principal
                      </label>
                      <input
                        type="text"
                        value={heroHome.titulo}
                        onChange={(e) => setHeroHome({ ...heroHome, titulo: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          color: 'var(--foreground)',
                          backgroundColor: 'var(--background)',
                          border: '1px solid var(--border)'
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: 'var(--foreground)',
                          display: 'block',
                          marginBottom: '8px'
                        }}
                      >
                        Subtítulo
                      </label>
                      <textarea
                        value={heroHome.subtitulo}
                        onChange={(e) => setHeroHome({ ...heroHome, subtitulo: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-lg"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          color: 'var(--foreground)',
                          backgroundColor: 'var(--background)',
                          border: '1px solid var(--border)'
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: 'var(--foreground)',
                          display: 'block',
                          marginBottom: '8px'
                        }}
                      >
                        Texto del botón
                      </label>
                      <input
                        type="text"
                        value={heroHome.ctaTexto}
                        onChange={(e) => setHeroHome({ ...heroHome, ctaTexto: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          color: 'var(--foreground)',
                          backgroundColor: 'var(--background)',
                          border: '1px solid var(--border)'
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: 'var(--foreground)',
                          display: 'block',
                          marginBottom: '8px'
                        }}
                      >
                        URL del botón
                      </label>
                      <input
                        type="text"
                        value={heroHome.ctaUrl}
                        onChange={(e) => setHeroHome({ ...heroHome, ctaUrl: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          color: 'var(--foreground)',
                          backgroundColor: 'var(--background)',
                          border: '1px solid var(--border)'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </section>
              )}

              {/* Banners promocionales */}
              {activePublicacionesTab === 'banners' && (
              <section className="rounded-2xl p-6 mb-6" style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'var(--font-size-h4)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: 'var(--foreground)',
                        lineHeight: 'var(--line-height-heading)',
                        marginBottom: '4px'
                      }}
                    >
                      Banners promocionales
                    </h2>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#737373',
                        lineHeight: 'var(--line-height-body)'
                      }}
                    >
                      Gestiona los banners que aparecen en el Home
                    </p>
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#737373'
                    }}
                  >
                    {banners.filter(b => b.activo).length} de {banners.length} activos
                  </div>
                </div>

                <div className="space-y-3">
                  {banners.map((banner, index) => (
                    <div
                      key={banner.id}
                      className="rounded-xl p-5"
                      style={{
                        backgroundColor: '#FAFAFA',
                        border: '1px solid var(--border)'
                      }}
                    >
                      <div className="flex items-start gap-4">
                        {/* Preview de imagen */}
                        <div
                          className="flex-shrink-0 rounded-lg overflow-hidden flex items-center justify-center"
                          style={{
                            width: '120px',
                            height: '80px',
                            backgroundColor: '#E5E5E5',
                            border: '1px solid var(--border)'
                          }}
                        >
                          <ImageIcon className="w-8 h-8" style={{ color: '#C3C3C3' }} />
                        </div>

                        {/* Info del banner */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h3
                                style={{
                                  fontFamily: 'var(--font-body)',
                                  fontSize: 'var(--font-size-body-base)',
                                  fontWeight: 'var(--font-weight-semibold)',
                                  color: 'var(--foreground)',
                                  marginBottom: '4px'
                                }}
                              >
                                {banner.nombre}
                              </h3>
                              <p
                                style={{
                                  fontFamily: 'var(--font-body)',
                                  fontSize: 'var(--font-size-body-sm)',
                                  color: '#737373',
                                  marginBottom: '8px'
                                }}
                              >
                                {banner.texto}
                              </p>
                              <div className="flex items-center gap-3">
                                <span
                                  style={{
                                    fontFamily: 'var(--font-body)',
                                    fontSize: 'var(--font-size-xs)',
                                    color: '#737373'
                                  }}
                                >
                                  CTA: <span style={{ color: 'var(--foreground)', fontWeight: 'var(--font-weight-medium)' }}>{banner.ctaTexto}</span>
                                </span>
                                <span style={{ color: '#C3C3C3' }}>•</span>
                                <span
                                  style={{
                                    fontFamily: 'var(--font-body)',
                                    fontSize: 'var(--font-size-xs)',
                                    color: '#737373'
                                  }}
                                >
                                  Prioridad: {banner.prioridad}
                                </span>
                              </div>
                            </div>

                            <span
                              className="inline-flex items-center px-3 py-1 rounded-full flex-shrink-0 ml-3"
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--font-size-xs)',
                                fontWeight: 'var(--font-weight-medium)',
                                backgroundColor: banner.activo ? '#DCFCE7' : 'var(--muted)',
                                color: banner.activo ? '#16A34A' : '#737373'
                              }}
                            >
                              {banner.activo ? 'Activo' : 'Inactivo'}
                            </span>
                          </div>
                        </div>

                        {/* Acciones */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {/* Reordenar */}
                          <div className="flex flex-col gap-1">
                            <button
                              onClick={() => moveBannerUp(banner.id)}
                              disabled={index === 0}
                              className="p-1.5 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                              style={{
                                backgroundColor: '#FAFAFA',
                                border: '1px solid var(--border)',
                                color: 'var(--foreground)'
                              }}
                              onMouseEnter={(e) => {
                                if (index !== 0) {
                                  e.currentTarget.style.backgroundColor = '#E8E7E6';
                                }
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#FAFAFA';
                              }}
                            >
                              <MoveUp className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => moveBannerDown(banner.id)}
                              disabled={index === banners.length - 1}
                              className="p-1.5 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                              style={{
                                backgroundColor: '#FAFAFA',
                                border: '1px solid var(--border)',
                                color: 'var(--foreground)'
                              }}
                              onMouseEnter={(e) => {
                                if (index !== banners.length - 1) {
                                  e.currentTarget.style.backgroundColor = '#E8E7E6';
                                }
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#FAFAFA';
                              }}
                            >
                              <MoveDown className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Activar/Desactivar */}
                          <button
                            onClick={() => toggleBannerActivo(banner.id)}
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg transition-colors"
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--font-size-xs)',
                              fontWeight: 'var(--font-weight-medium)',
                              color: 'var(--foreground)',
                              backgroundColor: '#FAFAFA',
                              border: '1px solid var(--border)'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#E8E7E6';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#FAFAFA';
                            }}
                          >
                            {banner.activo ? (
                              <>
                                <ToggleRight className="w-4 h-4" />
                                Desactivar
                              </>
                            ) : (
                              <>
                                <ToggleLeft className="w-4 h-4" />
                                Activar
                              </>
                            )}
                          </button>

                          {/* Editar */}
                          <button
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg transition-colors"
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--font-size-xs)',
                              fontWeight: 'var(--font-weight-medium)',
                              color: '#FFFFFF',
                              backgroundColor: '#124854',
                              border: 'none'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#0D3640';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#124854';
                            }}
                          >
                            <Edit2 className="w-4 h-4" />
                            Editar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              )}

              {/* Bloques informativos */}
              {activePublicacionesTab === 'bloques' && (
              <section className="rounded-2xl p-6" style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                <div className="mb-6">
                  <h2
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-h4)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--foreground)',
                      lineHeight: 'var(--line-height-heading)',
                      marginBottom: '4px'
                    }}
                  >
                    Bloques informativos
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#737373',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    Mensajes y avisos temporales para el Home
                  </p>
                </div>

                <div className="space-y-3">
                  {bloquesHome.map((bloque) => (
                    <div
                      key={bloque.id}
                      className="rounded-xl p-4"
                      style={{
                        backgroundColor: '#FAFAFA',
                        border: '1px solid var(--border)'
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--font-size-body-sm)',
                                fontWeight: 'var(--font-weight-semibold)',
                                color: 'var(--foreground)'
                              }}
                            >
                              {bloque.nombre}
                            </h3>
                            <span
                              className="inline-flex items-center px-2 py-0.5 rounded"
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '10px',
                                fontWeight: 'var(--font-weight-medium)',
                                backgroundColor: bloque.tipo === 'campana' ? '#FEF3C7' : '#EEF2FF',
                                color: bloque.tipo === 'campana' ? '#CA8A04' : '#4338CA',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                              }}
                            >
                              {bloque.tipo === 'campana' ? 'Campaña' : 'Mensaje'}
                            </span>
                          </div>
                          <p
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--font-size-body-sm)',
                              color: '#737373'
                            }}
                          >
                            {bloque.contenido}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                          <span
                            className="inline-flex items-center px-3 py-1 rounded-full"
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--font-size-xs)',
                              fontWeight: 'var(--font-weight-medium)',
                              backgroundColor: bloque.activo ? '#DCFCE7' : 'var(--muted)',
                              color: bloque.activo ? '#16A34A' : '#737373'
                            }}
                          >
                            {bloque.activo ? 'Activo' : 'Inactivo'}
                          </span>
                          <button
                            onClick={() => toggleBloqueActivo(bloque.id)}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors"
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--font-size-xs)',
                              fontWeight: 'var(--font-weight-medium)',
                              color: 'var(--foreground)',
                              backgroundColor: '#FAFAFA',
                              border: '1px solid var(--border)'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#E8E7E6';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#FAFAFA';
                            }}
                          >
                            {bloque.activo ? (
                              <>
                                <ToggleRight className="w-4 h-4" />
                                Desactivar
                              </>
                            ) : (
                              <>
                                <ToggleLeft className="w-4 h-4" />
                                Activar
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              )}

              {/* Modal de selección de tipo de publicación */}
              {showTypeSelectionModal && (
                <div
                  className="fixed inset-0 z-[9999] flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                  onClick={() => setShowTypeSelectionModal(false)}
                >
                  <div
                    className="rounded-2xl p-8 max-w-2xl w-full mx-4"
                    style={{
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'var(--font-size-h3)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: '#0A0A0A',
                            lineHeight: 'var(--line-height-heading)',
                            marginBottom: '8px'
                          }}
                        >
                          ¿Qué te gustaría publicar?
                        </h2>
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-base)',
                            color: '#737373',
                            lineHeight: 'var(--line-height-body)'
                          }}
                        >
                          Elige el tipo de publicación que deseas crear
                        </p>
                      </div>
                      <button
                        onClick={() => setShowTypeSelectionModal(false)}
                        className="p-2 rounded-lg transition-colors"
                        style={{
                          color: '#737373',
                          backgroundColor: 'transparent'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#F5F5F5';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Opción: Parcela individual */}
                      <button
                        onClick={() => {
                          setShowTypeSelectionModal(false);
                          setShowListingFlow(true);
                        }}
                        className="group p-6 rounded-xl text-left transition-all"
                        style={{
                          border: '2px solid #E5E5E5',
                          backgroundColor: '#FFFFFF'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#124854';
                          e.currentTarget.style.backgroundColor = '#FAFAFA';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#E5E5E5';
                          e.currentTarget.style.backgroundColor = '#FFFFFF';
                        }}
                      >
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                          style={{ backgroundColor: 'rgba(18, 72, 84, 0.1)' }}
                        >
                          <Layout className="w-6 h-6" style={{ color: '#124854' }} />
                        </div>
                        <h3
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'var(--font-size-h4)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: '#0A0A0A',
                            lineHeight: 'var(--line-height-heading)',
                            marginBottom: '8px'
                          }}
                        >
                          Parcela individual
                        </h3>
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            color: '#737373',
                            lineHeight: 'var(--line-height-body)'
                          }}
                        >
                          Publica una parcela única con características específicas
                        </p>
                      </button>

                      {/* Opción: Proyecto inmobiliario */}
                      <button
                        onClick={() => {
                          setShowTypeSelectionModal(false);
                          setShowProjectFlow(true);
                        }}
                        className="group p-6 rounded-xl text-left transition-all"
                        style={{
                          border: '2px solid #E5E5E5',
                          backgroundColor: '#FFFFFF'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#124854';
                          e.currentTarget.style.backgroundColor = '#FAFAFA';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#E5E5E5';
                          e.currentTarget.style.backgroundColor = '#FFFFFF';
                        }}
                      >
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                          style={{ backgroundColor: 'rgba(18, 72, 84, 0.1)' }}
                        >
                          <Home className="w-6 h-6" style={{ color: '#124854' }} />
                        </div>
                        <h3
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'var(--font-size-h4)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: '#0A0A0A',
                            lineHeight: 'var(--line-height-heading)',
                            marginBottom: '8px'
                          }}
                        >
                          Proyecto inmobiliario
                        </h3>
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            color: '#737373',
                            lineHeight: 'var(--line-height-body)'
                          }}
                        >
                          Crea un proyecto con múltiples parcelas disponibles
                        </p>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Flujo de creación de parcela individual */}
              {showListingFlow && (
                <NewListingFlow
                  onClose={() => {
                    setShowListingFlow(false);
                    setEditingParcelaId(null);
                  }}
                  onPublish={handlePublishListing}
                  parcelaId={editingParcelaId}
                />
              )}

              {/* Flujo de creación de proyecto */}
              {showProjectFlow && (
                <NewProjectFlow
                  onClose={() => {
                    setShowProjectFlow(false);
                    setEditingProyectoId(null);
                  }}
                  onPublish={handlePublishProject}
                  proyectoId={editingProyectoId}
                />
              )}
            </>
          )}

          {/* SECCIÓN: CONFIGURACIÓN */}
          {activeNav === 'configuracion' && (
            <>
              {/* Descripción principal */}
              <div className="mb-8">
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-base)',
                    color: '#737373',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  Administra las reglas globales, permisos y configuraciones del sistema CompraTuParcela
                </p>
              </div>

              {/* Grid de Cards de Configuración */}
              <div className="grid grid-cols-3 gap-6">
                {/* Card: Configuración de Proyectos */}
                <div
                  className="rounded-2xl p-6 flex flex-col transition-all cursor-pointer group"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E5E5',
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                    minHeight: '200px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.borderColor = '#D4D4D4';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
                    e.currentTarget.style.borderColor = '#E5E5E5';
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: '#F5F5F5' }}
                    >
                      <FolderOpen className="w-6 h-6" style={{ color: '#0A0A0A' }} />
                    </div>
                    <ChevronRight
                      className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: '#737373' }}
                    />
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-h4)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-heading)',
                      marginBottom: '8px'
                    }}
                  >
                    Configuración de Proyectos
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#737373',
                      lineHeight: 'var(--line-height-body)',
                      marginBottom: '16px',
                      flex: 1
                    }}
                  >
                    Estados, orden, prioridad y visibilidad en la web
                  </p>

                  <button
                    className="w-full py-2.5 px-4 rounded-lg transition-all"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      backgroundColor: '#FAFAFA',
                      border: '1px solid #E5E5E5'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E8E7E6';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#FAFAFA';
                    }}
                  >
                    Configurar
                  </button>
                </div>

                {/* Card: Configuración de Publicaciones */}
                <div
                  className="rounded-2xl p-6 flex flex-col transition-all cursor-pointer group"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E5E5',
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                    minHeight: '200px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.borderColor = '#D4D4D4';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
                    e.currentTarget.style.borderColor = '#E5E5E5';
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: '#F5F5F5' }}
                    >
                      <Layout className="w-6 h-6" style={{ color: '#0A0A0A' }} />
                    </div>
                    <ChevronRight
                      className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: '#737373' }}
                    />
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-h4)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-heading)',
                      marginBottom: '8px'
                    }}
                  >
                    Configuración de Publicaciones
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#737373',
                      lineHeight: 'var(--line-height-body)',
                      marginBottom: '16px',
                      flex: 1
                    }}
                  >
                    Campos obligatorios, aprobación y textos legales
                  </p>

                  <button
                    className="w-full py-2.5 px-4 rounded-lg transition-all"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      backgroundColor: '#FAFAFA',
                      border: '1px solid #E5E5E5'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E8E7E6';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#FAFAFA';
                    }}
                  >
                    Configurar
                  </button>
                </div>

                {/* Card: Configuración de Leads */}
                <div
                  className="rounded-2xl p-6 flex flex-col transition-all cursor-pointer group"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E5E5',
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                    minHeight: '200px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.borderColor = '#D4D4D4';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
                    e.currentTarget.style.borderColor = '#E5E5E5';
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: '#F5F5F5' }}
                    >
                      <Users className="w-6 h-6" style={{ color: '#0A0A0A' }} />
                    </div>
                    <ChevronRight
                      className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: '#737373' }}
                    />
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-h4)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-heading)',
                      marginBottom: '8px'
                    }}
                  >
                    Configuración de Leads
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#737373',
                      lineHeight: 'var(--line-height-body)',
                      marginBottom: '16px',
                      flex: 1
                    }}
                  >
                    Estados del lead, SLA de respuesta y automatizaciones
                  </p>

                  <button
                    className="w-full py-2.5 px-4 rounded-lg transition-all"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      backgroundColor: '#FAFAFA',
                      border: '1px solid #E5E5E5'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E8E7E6';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#FAFAFA';
                    }}
                  >
                    Configurar
                  </button>
                </div>

                {/* Card: Usuarios y Roles */}
                <div
                  className="rounded-2xl p-6 flex flex-col transition-all cursor-pointer group"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E5E5',
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                    minHeight: '200px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.borderColor = '#D4D4D4';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
                    e.currentTarget.style.borderColor = '#E5E5E5';
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: '#F5F5F5' }}
                    >
                      <Shield className="w-6 h-6" style={{ color: '#0A0A0A' }} />
                    </div>
                    <ChevronRight
                      className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: '#737373' }}
                    />
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-h4)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-heading)',
                      marginBottom: '8px'
                    }}
                  >
                    Usuarios y Roles
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#737373',
                      lineHeight: 'var(--line-height-body)',
                      marginBottom: '16px',
                      flex: 1
                    }}
                  >
                    Gestión de roles, permisos y asignación por proyecto
                  </p>

                  <button
                    className="w-full py-2.5 px-4 rounded-lg transition-all"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      backgroundColor: '#FAFAFA',
                      border: '1px solid #E5E5E5'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E8E7E6';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#FAFAFA';
                    }}
                  >
                    Configurar
                  </button>
                </div>

                {/* Card: Integraciones */}
                <div
                  className="rounded-2xl p-6 flex flex-col transition-all cursor-pointer group"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E5E5',
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                    minHeight: '200px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.borderColor = '#D4D4D4';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
                    e.currentTarget.style.borderColor = '#E5E5E5';
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: '#F5F5F5' }}
                    >
                      <Link className="w-6 h-6" style={{ color: '#0A0A0A' }} />
                    </div>
                    <ChevronRight
                      className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: '#737373' }}
                    />
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-h4)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-heading)',
                      marginBottom: '8px'
                    }}
                  >
                    Integraciones
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#737373',
                      lineHeight: 'var(--line-height-body)',
                      marginBottom: '16px',
                      flex: 1
                    }}
                  >
                    WhatsApp, Analytics, CRM y plataformas de pago
                  </p>

                  <button
                    className="w-full py-2.5 px-4 rounded-lg transition-all"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      backgroundColor: '#FAFAFA',
                      border: '1px solid #E5E5E5'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E8E7E6';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#FAFAFA';
                    }}
                  >
                    Configurar
                  </button>
                </div>

                {/* Card: Configuración General */}
                <div
                  className="rounded-2xl p-6 flex flex-col transition-all cursor-pointer group"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E5E5',
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                    minHeight: '200px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.borderColor = '#D4D4D4';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
                    e.currentTarget.style.borderColor = '#E5E5E5';
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: '#F5F5F5' }}
                    >
                      <Settings className="w-6 h-6" style={{ color: '#0A0A0A' }} />
                    </div>
                    <ChevronRight
                      className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: '#737373' }}
                    />
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-h4)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-heading)',
                      marginBottom: '8px'
                    }}
                  >
                    Configuración General
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#737373',
                      lineHeight: 'var(--line-height-body)',
                      marginBottom: '16px',
                      flex: 1
                    }}
                  >
                    Preferencias del sistema, notificaciones y branding
                  </p>

                  <button
                    className="w-full py-2.5 px-4 rounded-lg transition-all"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      backgroundColor: '#FAFAFA',
                      border: '1px solid #E5E5E5'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E8E7E6';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#FAFAFA';
                    }}
                  >
                    Configurar
                  </button>
                </div>
              </div>

              {/* SECCIÓN 2: GOBIERNO DEL SISTEMA */}
              <section
                className="rounded-2xl p-6 mt-8"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E5E5',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className="mb-6">
                  <h2
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-h3)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-heading)',
                      marginBottom: '4px'
                    }}
                  >
                    Gobierno del sistema
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#737373',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    Control global del estado y módulos del sistema
                  </p>
                </div>

                {/* Estado del sistema */}
                <div className="mb-6 pb-6" style={{ borderBottom: '1px solid #E5E5E5' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <label
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-base)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#0A0A0A',
                          display: 'block',
                          marginBottom: '4px'
                        }}
                      >
                        Estado del sistema
                      </label>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          color: '#737373',
                          lineHeight: 'var(--line-height-body)'
                        }}
                      >
                        {estadoSistema === 'produccion' ? 'Sistema operativo normal' : 'Sistema en mantenimiento programado'}
                      </p>
                    </div>
                    <button
                      onClick={() => setEstadoSistema(estadoSistema === 'produccion' ? 'mantenimiento' : 'produccion')}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: estadoSistema === 'produccion' ? '#16A34A' : '#CA8A04',
                        backgroundColor: estadoSistema === 'produccion' ? '#DCFCE7' : '#FEF3C7',
                        border: `1px solid ${estadoSistema === 'produccion' ? '#BBF7D0' : '#FDE68A'}`
                      }}
                    >
                      {estadoSistema === 'produccion' ? (
                        <>
                          <Activity className="w-4 h-4" />
                          Producción
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-4 h-4" />
                          Mantenimiento
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Módulos activos */}
                <div className="mb-6 pb-6" style={{ borderBottom: '1px solid #E5E5E5' }}>
                  <label
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-base)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      display: 'block',
                      marginBottom: '12px'
                    }}
                  >
                    Módulos del sistema
                  </label>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#FAFAFA' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          color: '#0A0A0A'
                        }}
                      >
                        Leads
                      </span>
                      <button
                        onClick={() => setModulosActivos({ ...modulosActivos, leads: !modulosActivos.leads })}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: modulosActivos.leads ? '#16A34A' : '#737373',
                          backgroundColor: modulosActivos.leads ? '#DCFCE7' : '#FFFFFF',
                          border: '1px solid #E5E5E5'
                        }}
                      >
                        {modulosActivos.leads ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                        {modulosActivos.leads ? 'Activo' : 'Inactivo'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#FAFAFA' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          color: '#0A0A0A'
                        }}
                      >
                        Publicaciones
                      </span>
                      <button
                        onClick={() => setModulosActivos({ ...modulosActivos, publicaciones: !modulosActivos.publicaciones })}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: modulosActivos.publicaciones ? '#16A34A' : '#737373',
                          backgroundColor: modulosActivos.publicaciones ? '#DCFCE7' : '#FFFFFF',
                          border: '1px solid #E5E5E5'
                        }}
                      >
                        {modulosActivos.publicaciones ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                        {modulosActivos.publicaciones ? 'Activo' : 'Inactivo'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#FAFAFA' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          color: '#0A0A0A'
                        }}
                      >
                        Asignación automática
                      </span>
                      <button
                        onClick={() => setModulosActivos({ ...modulosActivos, asignacionAutomatica: !modulosActivos.asignacionAutomatica })}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: modulosActivos.asignacionAutomatica ? '#16A34A' : '#737373',
                          backgroundColor: modulosActivos.asignacionAutomatica ? '#DCFCE7' : '#FFFFFF',
                          border: '1px solid #E5E5E5'
                        }}
                      >
                        {modulosActivos.asignacionAutomatica ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                        {modulosActivos.asignacionAutomatica ? 'Activo' : 'Inactivo'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mensaje global */}
                <div>
                  <label
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-base)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      display: 'block',
                      marginBottom: '4px'
                    }}
                  >
                    Mensaje global del sistema
                  </label>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#737373',
                      lineHeight: 'var(--line-height-body)',
                      marginBottom: '8px'
                    }}
                  >
                    Este mensaje será visible para todos los usuarios finales en la plataforma
                  </p>
                  <input
                    type="text"
                    value={mensajeGlobal}
                    onChange={(e) => setMensajeGlobal(e.target.value)}
                    placeholder="Ej: El sistema estará en mantenimiento el domingo de 2:00 a 6:00 AM"
                    className="w-full px-4 py-2.5 rounded-lg"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#0A0A0A',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E5E5'
                    }}
                  />
                </div>
              </section>

              {/* SECCIÓN 3: REGLAS DE NEGOCIO */}
              <section
                className="rounded-2xl p-6 mt-6"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E5E5',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className="mb-6">
                  <h2
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-h3)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-heading)',
                      marginBottom: '4px'
                    }}
                  >
                    Reglas de negocio
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#737373',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    Configuración estratégica del comportamiento del sistema
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* Regla de asignación */}
                  <div>
                    <label
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-base)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#0A0A0A',
                        display: 'block',
                        marginBottom: '8px'
                      }}
                    >
                      Regla de asignación automática
                    </label>
                    <select
                      value={reglaAsignacion}
                      onChange={(e) => setReglaAsignacion(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E5E5E5'
                      }}
                    >
                      <option value="round-robin">Round-robin (rotación equitativa)</option>
                      <option value="disponibilidad">Por disponibilidad</option>
                      <option value="carga">Por carga de trabajo</option>
                      <option value="especializacion">Por especialización</option>
                    </select>
                  </div>

                  {/* Tiempo máximo de respuesta */}
                  <div>
                    <label
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-base)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#0A0A0A',
                        display: 'block',
                        marginBottom: '8px'
                      }}
                    >
                      Tiempo máximo sin respuesta (horas)
                    </label>
                    <input
                      type="number"
                      value={tiempoMaximoRespuesta}
                      onChange={(e) => setTiempoMaximoRespuesta(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E5E5E5'
                      }}
                      min="1"
                      max="168"
                    />
                  </div>

                  {/* Reasignación automática */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-base)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#0A0A0A'
                        }}
                      >
                        Reasignar automáticamente
                      </label>
                      <button
                        onClick={() => setReasignacionAutomatica(!reasignacionAutomatica)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: reasignacionAutomatica ? '#16A34A' : '#737373',
                          backgroundColor: reasignacionAutomatica ? '#DCFCE7' : '#FAFAFA',
                          border: '1px solid #E5E5E5'
                        }}
                      >
                        {reasignacionAutomatica ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                        {reasignacionAutomatica ? 'Activo' : 'Inactivo'}
                      </button>
                    </div>
                    <input
                      type="number"
                      value={horasReasignacion}
                      onChange={(e) => setHorasReasignacion(e.target.value)}
                      disabled={!reasignacionAutomatica}
                      placeholder="Horas sin respuesta"
                      className="w-full px-4 py-2.5 rounded-lg"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: reasignacionAutomatica ? '#0A0A0A' : '#A3A3A3',
                        backgroundColor: reasignacionAutomatica ? '#FFFFFF' : '#F5F5F5',
                        border: '1px solid #E5E5E5'
                      }}
                      min="1"
                      max="168"
                    />
                  </div>

                  {/* Prioridad de leads */}
                  <div>
                    <label
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-base)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#0A0A0A',
                        display: 'block',
                        marginBottom: '8px'
                      }}
                    >
                      Prioridad de leads
                    </label>
                    <select
                      value={prioridadLeads}
                      onChange={(e) => setPrioridadLeads(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E5E5E5'
                      }}
                    >
                      <option value="proyecto">Por proyecto</option>
                      <option value="ubicacion">Por ubicación</option>
                      <option value="valor">Por valor estimado</option>
                      <option value="fecha">Por fecha de ingreso</option>
                    </select>
                  </div>
                </div>

                {/* Marcar como inactivo */}
                <div className="mt-6 pt-6" style={{ borderTop: '1px solid #E5E5E5' }}>
                  <label
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-base)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      display: 'block',
                      marginBottom: '4px'
                    }}
                  >
                    Marcar oportunidad como inactiva
                  </label>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#737373',
                      lineHeight: 'var(--line-height-body)',
                      marginBottom: '8px'
                    }}
                  >
                    Si no hay actividad durante este periodo (días)
                  </p>
                  <input
                    type="number"
                    value={marcarInactivoDias}
                    onChange={(e) => setMarcarInactivoDias(e.target.value)}
                    className="w-full max-w-xs px-4 py-2.5 rounded-lg"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#0A0A0A',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E5E5'
                    }}
                    min="7"
                    max="365"
                  />
                </div>
              </section>

              {/* SECCIÓN 4: IA Y AUTOMATIZACIONES */}
              <section
                className="rounded-2xl p-6 mt-6"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E5E5',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className="mb-6">
                  <h2
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-h3)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-heading)',
                      marginBottom: '4px'
                    }}
                  >
                    Configuración de IA y automatizaciones
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#737373',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    Análisis inteligente y scoring de oportunidades
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* Toggle IA */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-base)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#0A0A0A'
                        }}
                      >
                        Análisis por IA
                      </label>
                      <button
                        onClick={() => setIaActiva(!iaActiva)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: iaActiva ? '#16A34A' : '#737373',
                          backgroundColor: iaActiva ? '#DCFCE7' : '#FAFAFA',
                          border: '1px solid #E5E5E5'
                        }}
                      >
                        {iaActiva ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                        {iaActiva ? 'Activo' : 'Inactivo'}
                      </button>
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#737373',
                        lineHeight: 'var(--line-height-body)'
                      }}
                    >
                      Análisis predictivo de probabilidad de conversión
                    </p>
                  </div>

                  {/* Nivel de scoring */}
                  <div>
                    <label
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-base)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#0A0A0A',
                        display: 'block',
                        marginBottom: '8px'
                      }}
                    >
                      Nivel de scoring IA
                    </label>
                    <select
                      value={nivelScoringIA}
                      onChange={(e) => setNivelScoringIA(e.target.value)}
                      disabled={!iaActiva}
                      className="w-full px-4 py-2.5 rounded-lg"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: iaActiva ? '#0A0A0A' : '#A3A3A3',
                        backgroundColor: iaActiva ? '#FFFFFF' : '#F5F5F5',
                        border: '1px solid #E5E5E5'
                      }}
                    >
                      <option value="bajo">Bajo (conservador)</option>
                      <option value="medio">Medio (balanceado)</option>
                      <option value="alto">Alto (agresivo)</option>
                    </select>
                  </div>
                </div>

                {/* Nota informativa */}
                <div
                  className="mt-6 p-4 rounded-lg"
                  style={{
                    backgroundColor: '#EFF6FF',
                    border: '1px solid #BFDBFE'
                  }}
                >
                  <div className="flex gap-3">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0" style={{ color: '#1E40AF' }} />
                    <div>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#1E40AF',
                          marginBottom: '4px'
                        }}
                      >
                        Sobre los resultados de IA
                      </p>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          color: '#1E40AF',
                          lineHeight: 'var(--line-height-body)'
                        }}
                      >
                        Los análisis son estimativos y deben ser validados por el equipo comercial. No tomar como única fuente de decisión.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECCIÓN 5: USUARIOS, ROLES Y PERMISOS */}
              <section
                className="rounded-2xl p-6 mt-6"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E5E5',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'var(--font-size-h3)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#0A0A0A',
                        lineHeight: 'var(--line-height-heading)',
                        marginBottom: '4px'
                      }}
                    >
                      Usuarios, roles y permisos
                    </h2>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#737373',
                        lineHeight: 'var(--line-height-body)'
                      }}
                    >
                      Control de accesos y permisos por rol
                    </p>
                  </div>
                  <button
                    className="px-4 py-2 rounded-lg transition-all"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      backgroundColor: '#FAFAFA',
                      border: '1px solid #E5E5E5'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E8E7E6';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#FAFAFA';
                    }}
                  >
                    Gestionar permisos
                  </button>
                </div>

                <div className="space-y-3">
                  {rolesData.map((rol, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl"
                      style={{
                        backgroundColor: '#FAFAFA',
                        border: '1px solid #E5E5E5'
                      }}
                    >
                      <div className="flex-1">
                        <h3
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-base)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: '#0A0A0A',
                            marginBottom: '4px'
                          }}
                        >
                          {rol.nombre}
                        </h3>
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            color: '#737373',
                            lineHeight: 'var(--line-height-body)'
                          }}
                        >
                          {rol.alcance}
                        </p>
                      </div>
                      <span
                        className="px-3 py-1.5 rounded-full"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#737373',
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E5E5E5'
                        }}
                      >
                        {rol.usuarios} {rol.usuarios === 1 ? 'usuario' : 'usuarios'}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECCIÓN 6: AUDITORÍA Y ACTIVIDAD */}
              <section
                className="rounded-2xl p-6 mt-6"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E5E5',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'var(--font-size-h3)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#0A0A0A',
                        lineHeight: 'var(--line-height-heading)',
                        marginBottom: '4px'
                      }}
                    >
                      Auditoría y actividad del sistema
                    </h2>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#737373',
                        lineHeight: 'var(--line-height-body)'
                      }}
                    >
                      Registro de cambios y modificaciones recientes
                    </p>
                  </div>
                  <button
                    className="px-4 py-2 rounded-lg transition-all"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      backgroundColor: '#FAFAFA',
                      border: '1px solid #E5E5E5'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E8E7E6';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#FAFAFA';
                    }}
                  >
                    Ver historial completo
                  </button>
                </div>

                <div className="space-y-3">
                  {actividadSistema.map((actividad) => (
                    <div
                      key={actividad.id}
                      className="flex items-start gap-4 p-4 rounded-xl"
                      style={{
                        backgroundColor: '#FAFAFA',
                        border: '1px solid #E5E5E5'
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: '#E8E7E6' }}
                      >
                        <Activity className="w-4 h-4" style={{ color: '#0A0A0A' }} />
                      </div>
                      <div className="flex-1">
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            fontWeight: 'var(--font-weight-medium)',
                            color: '#0A0A0A',
                            marginBottom: '4px'
                          }}
                        >
                          {actividad.usuario}
                        </p>
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            color: '#737373',
                            lineHeight: 'var(--line-height-body)',
                            marginBottom: '4px'
                          }}
                        >
                          {actividad.accion}
                        </p>
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-xs)',
                            color: '#A3A3A3'
                          }}
                        >
                          {actividad.fecha}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECCIÓN 7: LEGAL Y COMPLIANCE */}
              <section
                className="rounded-2xl p-6 mt-6"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E5E5',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'var(--font-size-h3)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#0A0A0A',
                        lineHeight: 'var(--line-height-heading)',
                        marginBottom: '4px'
                      }}
                    >
                      Legal y compliance
                    </h2>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#737373',
                        lineHeight: 'var(--line-height-body)'
                      }}
                    >
                      Gestión de textos legales y políticas
                    </p>
                  </div>
                  <button
                    className="px-4 py-2 rounded-lg transition-all"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      backgroundColor: '#FAFAFA',
                      border: '1px solid #E5E5E5'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E8E7E6';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#FAFAFA';
                    }}
                  >
                    Gestionar textos legales
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div
                    className="p-4 rounded-xl"
                    style={{
                      backgroundColor: '#FAFAFA',
                      border: '1px solid #E5E5E5'
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: textosLegalesData.terminosCondiciones.activo ? '#16A34A' : '#DC2626' }}
                      />
                      <h3
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: '#0A0A0A'
                        }}
                      >
                        Términos y condiciones
                      </h3>
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-xs)',
                        color: '#737373'
                      }}
                    >
                      Actualizado: {textosLegalesData.terminosCondiciones.ultimaActualizacion}
                    </p>
                  </div>

                  <div
                    className="p-4 rounded-xl"
                    style={{
                      backgroundColor: '#FAFAFA',
                      border: '1px solid #E5E5E5'
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: textosLegalesData.politicaPrivacidad.activo ? '#16A34A' : '#DC2626' }}
                      />
                      <h3
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: '#0A0A0A'
                        }}
                      >
                        Política de privacidad
                      </h3>
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-xs)',
                        color: '#737373'
                      }}
                    >
                      Actualizado: {textosLegalesData.politicaPrivacidad.ultimaActualizacion}
                    </p>
                  </div>

                  <div
                    className="p-4 rounded-xl"
                    style={{
                      backgroundColor: '#FAFAFA',
                      border: '1px solid #E5E5E5'
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: textosLegalesData.disclaimerPublicaciones.activo ? '#16A34A' : '#DC2626' }}
                      />
                      <h3
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: '#0A0A0A'
                        }}
                      >
                        Disclaimer publicaciones
                      </h3>
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-xs)',
                        color: '#737373'
                      }}
                    >
                      Actualizado: {textosLegalesData.disclaimerPublicaciones.ultimaActualizacion}
                    </p>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}