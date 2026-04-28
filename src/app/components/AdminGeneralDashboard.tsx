import React, { useState } from 'react';
import { Home, Users, ClipboardList, MessageSquare, Shield, Settings, Calendar, TrendingUp, TrendingDown, ArrowRight, AlertCircle, X, Search, Filter, ChevronDown, Check, UserPlus, ToggleLeft, ToggleRight, Edit2, PhoneCall, Mail, FileText, ArrowUpRight, ArrowDownRight, AlertTriangle, Layout, Eye, Save, Image as ImageIcon, Video, MoveUp, MoveDown, BarChart3, Smartphone, FilterX, Plus, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AdminAnaliticaView } from '@/app/components/AdminAnaliticaView';
import { AdminEmbudoView } from '@/app/components/AdminEmbudoView';
import { NewListingFlow } from '@/app/components/NewListingFlow';
import { NewProjectFlow } from '@/app/components/NewProjectFlow';
import { AdminPublicacionesSection } from '@/app/components/AdminPublicacionesSection';
import { CitasAdminView } from '@/app/components/CitasAdminView';
import { WhitelistAdminView } from '@/app/components/WhitelistAdminView';
import { ReservasAdminView } from '@/app/components/ReservasAdminView';
import { ContactosWhatsAppAdminView } from '@/app/components/ContactosWhatsAppAdminView';

// Dashboard Admin General - Versión completa con MVP de todas las secciones
interface AdminGeneralDashboardProps {
  onNavigate: (page: string) => void;
}

type NavItem = 'inicio' | 'analitica' | 'embudo' | 'brokers' | 'asignaciones' | 'interacciones' | 'citas' | 'reservas' | 'whatsapp' | 'whitelist' | 'publicaciones' | 'usuarios' | 'configuracion';

// Tipos de datos
interface Broker {
  id: number;
  name: string;
  email: string;
  estado: 'activo' | 'inactivo';
  leadsAsignados: number;
  contactos: number;
  ultimaInteraccion: string;
  rol: string;
}

interface Lead {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  proyecto: string;
  estado: 'sin-asignar' | 'asignado' | 'contactado';
  fechaIngreso: string;
  brokerAsignado?: string;
}

interface Interaccion {
  id: number;
  tipo: 'Llamada' | 'Email' | 'WhatsApp';
  broker: string;
  lead: string;
  fecha: string;
  notas: string;
}

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: 'Admin General' | 'Marketing' | 'Broker';
  estado: 'activo' | 'inactivo';
  ultimoAcceso: string;
}

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

export function AdminGeneralDashboard({ onNavigate }: AdminGeneralDashboardProps) {
  const [activeNav, setActiveNav] = useState<NavItem>('inicio');
  const [dateRange, setDateRange] = useState('ultimos-30-dias');
  const [deviceFilter, setDeviceFilter] = useState<'todos' | 'mobile' | 'desktop'>('todos');
  
  // Estados para Brokers
  const [selectedBrokerId, setSelectedBrokerId] = useState<number | null>(null);
  const [brokerSearchQuery, setBrokerSearchQuery] = useState('');
  const [brokerFilter, setBrokerFilter] = useState<'todos' | 'activos' | 'inactivos'>('todos');
  
  // Estados para Asignaciones
  const [selectedLeadId, setSelectedLeadId] = useState<number | null>(null);
  const [assignmentFilter, setAssignmentFilter] = useState<'todos' | 'sin-asignar' | 'asignados'>('todos');
  const [leadSearchQuery, setLeadSearchQuery] = useState('');
  
  // Estados para Interacciones
  const [interactionTypeFilter, setInteractionTypeFilter] = useState<'todos' | 'Llamada' | 'Email' | 'WhatsApp'>('todos');
  const [interactionSearchQuery, setInteractionSearchQuery] = useState('');
  
  // Estados para Usuarios
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [userFilter, setUserFilter] = useState<'todos' | 'activos' | 'inactivos'>('todos');
  const [userSearchQuery, setUserSearchQuery] = useState('');

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

  // KPIs principales
  const kpis = [
    {
      label: 'Leads generados',
      value: '1,247',
      change: '+18.5%',
      trending: 'up' as const
    },
    {
      label: 'Contactos generados',
      value: '856',
      change: '+12.3%',
      trending: 'up' as const
    },
    {
      label: 'Brokers activos',
      value: '62',
      total: '80',
      change: '-18',
      trending: 'down' as const
    },
    {
      label: 'Leads sin asignar',
      value: '143',
      change: '+8',
      trending: 'up' as const
    }
  ];

  // Datos del embudo digital
  const funnelData = [
    { etapa: 'Visitas al sitio', valor: 45820, porcentaje: 100, caida: 0 },
    { etapa: 'Proyectos/parcelas vistas', valor: 12458, porcentaje: 27.2, caida: 72.8 },
    { etapa: 'Click en CTA', valor: 3247, porcentaje: 26.1, caida: 73.9 },
    { etapa: 'Formulario enviado', valor: 1247, porcentaje: 38.4, caida: 61.6 },
    { etapa: 'Contacto generado', valor: 856, porcentaje: 68.6, caida: 31.4 }
  ];

  // Identificar mayor drop-off
  const mayorCaidaIndex = funnelData.reduce((maxIndex, item, index) => {
    if (index === 0) return maxIndex;
    return item.caida > funnelData[maxIndex].caida ? index : maxIndex;
  }, 1);

  // Actividad de brokers (Home)
  const brokersActivity = [
    { name: 'María González', leadsAsignados: 45, contactos: 38, ultimaInteraccion: '2 horas', estado: 'activo' },
    { name: 'Carlos Pérez', leadsAsignados: 42, contactos: 35, ultimaInteraccion: '5 horas', estado: 'activo' },
    { name: 'Ana Martínez', leadsAsignados: 38, contactos: 31, ultimaInteraccion: '1 día', estado: 'activo' },
    { name: 'Luis Rodríguez', leadsAsignados: 35, contactos: 28, ultimaInteraccion: '3 días', estado: 'sin-actividad' },
    { name: 'Patricia Silva', leadsAsignados: 32, contactos: 27, ultimaInteraccion: '1 hora', estado: 'activo' }
  ];

  // Proyectos con mayor interés
  const topProyectos = [
    { name: 'Parcelas Valle Hermoso', visitas: 2845, contactos: 124, trend: 'up' },
    { name: 'Condominio Los Arrayanes', visitas: 2234, contactos: 98, trend: 'up' },
    { name: 'Parcelas Río Claro', visitas: 1876, contactos: 87, trend: 'down' },
    { name: 'Proyecto Colina Verde', visitas: 1654, contactos: 72, trend: 'up' },
    { name: 'Parcelas La Montaña', visitas: 1432, contactos: 65, trend: 'up' }
  ];

  // Origen del tráfico
  const trafficSources = [
    { origen: 'Orgánico', porcentaje: 45, valor: 5606 },
    { origen: 'Pagado', porcentaje: 32, valor: 3987 },
    { origen: 'Referido', porcentaje: 18, valor: 2242 },
    { origen: 'Otros', porcentaje: 5, valor: 623 }
  ];

  // DATOS MVP - BROKERS
  const [brokers, setBrokers] = useState<Broker[]>([
    { id: 1, name: 'María González', email: 'maria.gonzalez@brokers.com', estado: 'activo', leadsAsignados: 45, contactos: 38, ultimaInteraccion: '2 horas', rol: 'Broker Senior' },
    { id: 2, name: 'Carlos Pérez', email: 'carlos.perez@brokers.com', estado: 'activo', leadsAsignados: 42, contactos: 35, ultimaInteraccion: '5 horas', rol: 'Broker' },
    { id: 3, name: 'Ana Martínez', email: 'ana.martinez@brokers.com', estado: 'activo', leadsAsignados: 38, contactos: 31, ultimaInteraccion: '1 día', rol: 'Broker' },
    { id: 4, name: 'Luis Rodríguez', email: 'luis.rodriguez@brokers.com', estado: 'inactivo', leadsAsignados: 35, contactos: 28, ultimaInteraccion: '3 días', rol: 'Broker' },
    { id: 5, name: 'Patricia Silva', email: 'patricia.silva@brokers.com', estado: 'activo', leadsAsignados: 32, contactos: 27, ultimaInteraccion: '1 hora', rol: 'Broker Senior' },
    { id: 6, name: 'Roberto Campos', email: 'roberto.campos@brokers.com', estado: 'activo', leadsAsignados: 28, contactos: 24, ultimaInteraccion: '6 horas', rol: 'Broker' },
    { id: 7, name: 'Claudia Morales', email: 'claudia.morales@brokers.com', estado: 'inactivo', leadsAsignados: 25, contactos: 20, ultimaInteraccion: '2 días', rol: 'Broker' },
    { id: 8, name: 'Diego Torres', email: 'diego.torres@brokers.com', estado: 'activo', leadsAsignados: 30, contactos: 26, ultimaInteraccion: '3 horas', rol: 'Broker' }
  ]);

  // DATOS MVP - LEADS
  const [leads, setLeads] = useState<Lead[]>([
    { id: 1, nombre: 'Juan Pérez', email: 'juan.perez@email.com', telefono: '+56 9 1234 5678', proyecto: 'Parcelas Valle Hermoso', estado: 'sin-asignar', fechaIngreso: '2024-01-28' },
    { id: 2, nombre: 'María López', email: 'maria.lopez@email.com', telefono: '+56 9 8765 4321', proyecto: 'Condominio Los Arrayanes', estado: 'asignado', fechaIngreso: '2024-01-27', brokerAsignado: 'María González' },
    { id: 3, nombre: 'Pedro Soto', email: 'pedro.soto@email.com', telefono: '+56 9 2345 6789', proyecto: 'Parcelas Río Claro', estado: 'contactado', fechaIngreso: '2024-01-26', brokerAsignado: 'Carlos Pérez' },
    { id: 4, nombre: 'Carla Fuentes', email: 'carla.fuentes@email.com', telefono: '+56 9 9876 5432', proyecto: 'Proyecto Colina Verde', estado: 'sin-asignar', fechaIngreso: '2024-01-28' },
    { id: 5, nombre: 'Rodrigo Vega', email: 'rodrigo.vega@email.com', telefono: '+56 9 3456 7890', proyecto: 'Parcelas La Montaña', estado: 'asignado', fechaIngreso: '2024-01-27', brokerAsignado: 'Ana Martínez' },
    { id: 6, nombre: 'Sofía Ramírez', email: 'sofia.ramirez@email.com', telefono: '+56 9 7654 3210', proyecto: 'Parcelas Valle Hermoso', estado: 'sin-asignar', fechaIngreso: '2024-01-28' },
    { id: 7, nombre: 'Andrés Muñoz', email: 'andres.munoz@email.com', telefono: '+56 9 4567 8901', proyecto: 'Condominio Los Arrayanes', estado: 'asignado', fechaIngreso: '2024-01-26', brokerAsignado: 'Patricia Silva' },
    { id: 8, nombre: 'Valentina Cruz', email: 'valentina.cruz@email.com', telefono: '+56 9 6543 2109', proyecto: 'Parcelas Río Claro', estado: 'contactado', fechaIngreso: '2024-01-25', brokerAsignado: 'Carlos Pérez' }
  ]);

  // DATOS MVP - INTERACCIONES
  const [interacciones] = useState<Interaccion[]>([
    { id: 1, tipo: 'Llamada', broker: 'María González', lead: 'María López', fecha: '2024-01-28 14:30', notas: 'Interesada en visita presencial' },
    { id: 2, tipo: 'Email', broker: 'Carlos Pérez', lead: 'Pedro Soto', fecha: '2024-01-28 11:15', notas: 'Envío de información adicional' },
    { id: 3, tipo: 'WhatsApp', broker: 'Ana Martínez', lead: 'Rodrigo Vega', fecha: '2024-01-28 09:45', notas: 'Coordinación de visita' },
    { id: 4, tipo: 'Llamada', broker: 'Patricia Silva', lead: 'Andrés Muñoz', fecha: '2024-01-27 16:20', notas: 'Consulta sobre financiamiento' },
    { id: 5, tipo: 'Email', broker: 'Carlos Pérez', lead: 'Valentina Cruz', fecha: '2024-01-27 10:00', notas: 'Cotización enviada' },
    { id: 6, tipo: 'Llamada', broker: 'María González', lead: 'Juan Pérez', fecha: '2024-01-27 13:45', notas: 'Primer contacto' },
    { id: 7, tipo: 'WhatsApp', broker: 'Ana Martínez', lead: 'Carla Fuentes', fecha: '2024-01-26 15:30', notas: 'Respuesta a consultas' },
    { id: 8, tipo: 'Email', broker: 'Patricia Silva', lead: 'Sofía Ramírez', fecha: '2024-01-26 12:00', notas: 'Envío de planos' }
  ]);

  // DATOS MVP - USUARIOS
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    { id: 1, nombre: 'Admin Principal', email: 'admin@compratuparcela.com', rol: 'Admin General', estado: 'activo', ultimoAcceso: 'Hace 10 min' },
    { id: 2, nombre: 'Jefe Marketing', email: 'marketing@compratuparcela.com', rol: 'Marketing', estado: 'activo', ultimoAcceso: 'Hace 1 hora' },
    { id: 3, nombre: 'María González', email: 'maria.gonzalez@brokers.com', rol: 'Broker', estado: 'activo', ultimoAcceso: 'Hace 2 horas' },
    { id: 4, nombre: 'Carlos Pérez', email: 'carlos.perez@brokers.com', rol: 'Broker', estado: 'activo', ultimoAcceso: 'Hace 5 horas' },
    { id: 5, nombre: 'Ana Martínez', email: 'ana.martinez@brokers.com', rol: 'Broker', estado: 'inactivo', ultimoAcceso: 'Hace 2 días' }
  ]);

  // DATOS MVP - PUBLICACIONES
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

  const navItems = [
    { id: 'inicio' as NavItem, icon: Home, label: 'Inicio' },
    { id: 'analitica' as NavItem, icon: BarChart3, label: 'Analítica' },
    { id: 'embudo' as NavItem, icon: FilterX, label: 'Embudo' },
    { id: 'brokers' as NavItem, icon: Users, label: 'Brokers' },
    { id: 'asignaciones' as NavItem, icon: ClipboardList, label: 'Asignaciones' },
    { id: 'interacciones' as NavItem, icon: MessageSquare, label: 'Interacciones' },
    { id: 'citas' as NavItem, icon: Calendar, label: 'Citas' },
    { id: 'reservas' as NavItem, icon: FileText, label: 'Reservas' },
    { id: 'whatsapp' as NavItem, icon: MessageSquare, label: 'WhatsApp' },
    { id: 'whitelist' as NavItem, icon: Shield, label: 'Whitelist' },
    { id: 'publicaciones' as NavItem, icon: Layout, label: 'Publicaciones' },
    { id: 'usuarios' as NavItem, icon: Shield, label: 'Usuarios & permisos' },
    { id: 'configuracion' as NavItem, icon: Settings, label: 'Configuración' }
  ];

  // Funciones de filtrado
  const filteredBrokers = brokers.filter(broker => {
    const matchesSearch = broker.name.toLowerCase().includes(brokerSearchQuery.toLowerCase()) || 
                         broker.email.toLowerCase().includes(brokerSearchQuery.toLowerCase());
    const matchesFilter = brokerFilter === 'todos' || broker.estado === brokerFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.nombre.toLowerCase().includes(leadSearchQuery.toLowerCase()) || 
                         lead.email.toLowerCase().includes(leadSearchQuery.toLowerCase()) ||
                         lead.proyecto.toLowerCase().includes(leadSearchQuery.toLowerCase());
    const matchesFilter = assignmentFilter === 'todos' || 
                         (assignmentFilter === 'sin-asignar' && lead.estado === 'sin-asignar') ||
                         (assignmentFilter === 'asignados' && lead.estado !== 'sin-asignar');
    return matchesSearch && matchesFilter;
  });

  const filteredInteracciones = interacciones.filter(interaccion => {
    const matchesSearch = interaccion.broker.toLowerCase().includes(interactionSearchQuery.toLowerCase()) ||
                         interaccion.lead.toLowerCase().includes(interactionSearchQuery.toLowerCase());
    const matchesType = interactionTypeFilter === 'todos' || interaccion.tipo === interactionTypeFilter;
    return matchesSearch && matchesType;
  });

  const filteredUsuarios = usuarios.filter(usuario => {
    const matchesSearch = usuario.nombre.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
                         usuario.email.toLowerCase().includes(userSearchQuery.toLowerCase());
    const matchesFilter = userFilter === 'todos' || usuario.estado === userFilter;
    return matchesSearch && matchesFilter;
  });

  // Funciones de acciones
  const toggleBrokerEstado = (brokerId: number) => {
    setBrokers(brokers.map(broker => 
      broker.id === brokerId 
        ? { ...broker, estado: broker.estado === 'activo' ? 'inactivo' : 'activo' }
        : broker
    ));
  };

  const toggleUsuarioEstado = (usuarioId: number) => {
    setUsuarios(usuarios.map(usuario => 
      usuario.id === usuarioId 
        ? { ...usuario, estado: usuario.estado === 'activo' ? 'inactivo' : 'activo' }
        : usuario
    ));
  };

  const assignLeadToBroker = (leadId: number, brokerName: string) => {
    setLeads(leads.map(lead =>
      lead.id === leadId
        ? { ...lead, estado: 'asignado', brokerAsignado: brokerName }
        : lead
    ));
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

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#FAFAFA' }}>
      {/* Sidebar */}
      <nav
        className="fixed left-0 top-0 h-full flex flex-col"
        style={{
          width: '256px',
          backgroundColor: '#FAFAFA',
          borderRight: '1px solid #E5E5E5',
          zIndex: 50
        }}
      >
        {/* Logo */}
        <div className="px-6 py-8" style={{ borderBottom: '1px solid #E5E5E5' }}>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 'var(--font-weight-semibold)',
              fontSize: 'var(--font-size-h4)',
              color: '#0A0A0A',
              lineHeight: 'var(--line-height-heading)'
            }}
          >
            CompraTuParcela
          </h2>
        </div>

        {/* Navigation */}
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
                  color: '#006B4E',
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

        {/* User Info */}
        <div className="px-6 py-4" style={{ borderTop: '1px solid #E5E5E5' }}>
          <div className="w-full flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E8E7E6', border: '1px solid #E5E5E5' }}>
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
                Admin General
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
                  {navItems.find(item => item.id === activeNav)?.label}
                </h1>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    color: '#737373',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  {activeNav === 'inicio' && 'Visión general del rendimiento de la plataforma'}
                  {activeNav === 'analitica' && 'Análisis del comportamiento del canal digital y uso del sitio'}
                  {activeNav === 'embudo' && 'Proceso de conversión y tendencias de búsqueda'}
                  {activeNav === 'brokers' && 'Gestión de brokers y su actividad'}
                  {activeNav === 'asignaciones' && 'Asignación de leads a brokers'}
                  {activeNav === 'interacciones' && 'Registro de interacciones cliente-broker'}
                  {activeNav === 'citas' && 'Solicitudes de visita y videollamada enviadas por usuarios'}
                  {activeNav === 'reservas' && 'Comprobantes de transferencia recibidos — revisión y validación de pagos'}
                  {activeNav === 'whatsapp' && 'Gestión de números de WhatsApp y mensajes predeterminados por parcela o proyecto'}
                  {activeNav === 'whitelist' && 'Correos electrónicos autorizados para acceder a la plataforma'}
                  {activeNav === 'publicaciones' && 'Gestión de contenidos visibles del Home'}
                  {activeNav === 'usuarios' && 'Gestión de usuarios y permisos'}
                  {activeNav === 'configuracion' && 'Configuración general del sistema'}
                </p>
              </div>

              {/* Date Range Filter - solo en Inicio, Analítica y Embudo */}
              {(activeNav === 'inicio' || activeNav === 'analitica' || activeNav === 'embudo') && (
                <div className="flex items-center gap-3">
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
                        border: '1px solid #E5E5E5',
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

                  {/* Filtro de dispositivo - solo en Analítica */}
                  {activeNav === 'analitica' && (
                    <div className="relative">
                      <select
                        value={deviceFilter}
                        onChange={(e) => setDeviceFilter(e.target.value as 'todos' | 'mobile' | 'desktop')}
                        className="appearance-none pl-4 pr-10 py-2.5 rounded-full transition-all cursor-pointer"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#0A0A0A',
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E5E5E5',
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
                        <option value="todos">Todos los dispositivos</option>
                        <option value="mobile">Mobile</option>
                        <option value="desktop">Desktop</option>
                      </select>
                      <Smartphone
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none"
                        style={{ color: '#737373' }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* SECCIÓN: INICIO */}
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
                    <div className="flex items-baseline gap-2">
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
                      {kpi.total && (
                        <span
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            color: '#737373',
                            fontWeight: 'var(--font-weight-regular)',
                            lineHeight: '1'
                          }}
                        >
                          / {kpi.total}
                        </span>
                      )}
                    </div>
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
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
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

                  {/* Funnel visual vertical */}
                  <div className="flex flex-col gap-0">
                    {funnelData.map((etapa, index) => {
                      const isMayorCaida = index === mayorCaidaIndex;
                      const tasaConversion = index > 0 
                        ? ((etapa.valor / funnelData[index - 1].valor) * 100).toFixed(1)
                        : '100.0';
                      
                      // Calcular el ancho del embudo (100% -> 50% de forma proporcional)
                      const anchoMax = 100;
                      const anchoMin = 50;
                      const anchoEtapa = anchoMax - ((anchoMax - anchoMin) * (index / (funnelData.length - 1)));
                      
                      return (
                        <div key={index} className="relative">
                          {/* Conector visual entre etapas */}
                          {index > 0 && (
                            <div className="flex items-center relative" style={{ height: '32px', paddingLeft: '0' }}>
                              {/* Línea de caída/pérdida */}
                              <div className="flex items-center">
                                <div 
                                  className="rounded-full px-3 py-1"
                                  style={{
                                    backgroundColor: isMayorCaida ? '#FEF3C7' : '#F5F5F5',
                                    border: `1px solid ${isMayorCaida ? '#FDE68A' : '#E5E5E5'}`
                                  }}
                                >
                                  <span
                                    style={{
                                      fontFamily: 'var(--font-body)',
                                      fontSize: '11px',
                                      fontWeight: 'var(--font-weight-semibold)',
                                      color: isMayorCaida ? '#CA8A04' : '#737373',
                                      letterSpacing: '0.02em'
                                    }}
                                  >
                                    -{etapa.caida.toFixed(1)}%
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {/* Etapa del embudo */}
                          <div 
                            style={{ width: `${anchoEtapa}%` }}
                          >
                            <div
                              className="rounded-xl px-5 py-4"
                              style={{
                                backgroundColor: isMayorCaida ? '#FFFBEB' : '#FAFAFA',
                                border: `1px solid ${isMayorCaida ? '#FDE68A' : '#E5E5E5'}`,
                                boxShadow: isMayorCaida ? '0 1px 3px 0 rgba(202, 138, 4, 0.1)' : 'none'
                              }}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <h3
                                    style={{
                                      fontFamily: 'var(--font-body)',
                                      fontSize: 'var(--font-size-body-sm)',
                                      fontWeight: 'var(--font-weight-semibold)',
                                      color: '#0A0A0A',
                                      lineHeight: '1.2'
                                    }}
                                  >
                                    {etapa.etapa}
                                  </h3>
                                  {isMayorCaida && (
                                    <AlertTriangle 
                                      className="w-3.5 h-3.5 flex-shrink-0" 
                                      style={{ color: '#CA8A04' }} 
                                    />
                                  )}
                                </div>
                                {index > 0 && (
                                  <div
                                    className="rounded-md px-2 py-1"
                                    style={{
                                      backgroundColor: '#FFFFFF',
                                      border: '1px solid #E5E5E5'
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily: 'var(--font-body)',
                                        fontSize: '11px',
                                        fontWeight: 'var(--font-weight-semibold)',
                                        color: '#16A34A',
                                        whiteSpace: 'nowrap'
                                      }}
                                    >
                                      {tasaConversion}% conversión
                                    </span>
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex items-baseline gap-2">
                                <p
                                  style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: '32px',
                                    fontWeight: 'var(--font-weight-light)',
                                    color: '#0A0A0A',
                                    lineHeight: '1'
                                  }}
                                >
                                  {etapa.valor.toLocaleString()}
                                </p>
                                {index > 0 && (
                                  <span
                                    style={{
                                      fontFamily: 'var(--font-body)',
                                      fontSize: 'var(--font-size-xs)',
                                      color: '#A3A3A3',
                                      lineHeight: '1'
                                    }}
                                  >
                                    ({etapa.porcentaje}% del total)
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* Proyectos con mayor interés */}
                <section className="col-span-5 rounded-2xl p-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
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
                    Proyectos con mayor interés
                  </h2>
                  <div className="space-y-3">
                    {topProyectos.map((proyecto, index) => (
                      <div key={index} className="p-4 rounded-lg" style={{ backgroundColor: '#FAFAFA', border: '1px solid #E5E5E5' }}>
                        <div className="flex items-start justify-between mb-3">
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', color: '#0A0A0A', flex: 1 }}>{proyecto.name}</span>
                          {proyecto.trend === 'up' ? (
                            <TrendingUp className="w-4 h-4 flex-shrink-0" style={{ color: '#16A34A' }} />
                          ) : (
                            <TrendingDown className="w-4 h-4 flex-shrink-0" style={{ color: '#DC2626' }} />
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#737373' }}>Visitas: </span>
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', color: '#0A0A0A' }}>{proyecto.visitas.toLocaleString()}</span>
                          </div>
                          <div>
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#737373' }}>Contactos: </span>
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#0A0A0A' }}>{proyecto.contactos}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Actividad de Brokers */}
              <section className="rounded-2xl p-6 mt-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
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
                  Actividad de brokers
                </h2>
                <div className="overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr style={{ borderBottom: '1px solid #E5E5E5' }}>
                        <th className="text-left pb-3" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Broker</th>
                        <th className="text-center pb-3" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Leads asignados</th>
                        <th className="text-center pb-3" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contactos</th>
                        <th className="text-center pb-3" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Última interacción</th>
                        <th className="text-center pb-3" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {brokersActivity.map((broker, index) => (
                        <tr key={index} style={{ borderBottom: index < brokersActivity.length - 1 ? '1px solid #F5F5F5' : 'none' }}>
                          <td className="py-4">
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', color: '#0A0A0A' }}>{broker.name}</span>
                          </td>
                          <td className="text-center py-4">
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A' }}>{broker.leadsAsignados}</span>
                          </td>
                          <td className="text-center py-4">
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-semibold)', color: '#0A0A0A' }}>{broker.contactos}</span>
                          </td>
                          <td className="text-center py-4">
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>{broker.ultimaInteraccion}</span>
                          </td>
                          <td className="text-center py-4">
                            <span
                              className="inline-flex items-center px-2.5 py-1 rounded-full"
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--font-size-xs)',
                                fontWeight: 'var(--font-weight-medium)',
                                backgroundColor: broker.estado === 'activo' ? '#DCFCE7' : 'var(--muted)',
                                color: broker.estado === 'activo' ? '#16A34A' : '#737373'
                              }}
                            >
                              {broker.estado === 'activo' ? 'Activo' : 'Sin actividad'}
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

          {/* SECCIÓN: ANALÍTICA */}
          {activeNav === 'analitica' && (
            <AdminAnaliticaView />
          )}

          {/* SECCIÓN: EMBUDO */}
          {activeNav === 'embudo' && (
            <AdminEmbudoView />
          )}

          {/* SECCIÓN: BROKERS */}
          {activeNav === 'brokers' && (
            <>
              {/* Filtros y búsqueda */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  {/* Búsqueda */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#737373' }} />
                    <input
                      type="text"
                      placeholder="Buscar broker..."
                      value={brokerSearchQuery}
                      onChange={(e) => setBrokerSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2.5 rounded-lg"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E5E5E5',
                        width: '280px'
                      }}
                    />
                  </div>

                  {/* Filtro por estado */}
                  <select
                    value={brokerFilter}
                    onChange={(e) => setBrokerFilter(e.target.value as any)}
                    className="appearance-none pl-4 pr-10 py-2.5 rounded-lg cursor-pointer"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E5E5'
                    }}
                  >
                    <option value="todos">Todos los brokers</option>
                    <option value="activos">Solo activos</option>
                    <option value="inactivos">Solo inactivos</option>
                  </select>
                </div>

                {/* Contador */}
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    color: '#737373'
                  }}
                >
                  {filteredBrokers.length} broker{filteredBrokers.length !== 1 ? 's' : ''}
                </div>
              </div>

              {/* Tabla de brokers */}
              <div className="rounded-xl overflow-hidden" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                <table className="w-full">
                  <thead>
                    <tr style={{ backgroundColor: '#FAFAFA', borderBottom: '1px solid #E5E5E5' }}>
                      <th className="text-left px-6 py-4" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Broker</th>
                      <th className="text-center px-6 py-4" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Rol</th>
                      <th className="text-center px-6 py-4" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Leads asignados</th>
                      <th className="text-center px-6 py-4" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contactos</th>
                      <th className="text-center px-6 py-4" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Última actividad</th>
                      <th className="text-center px-6 py-4" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Estado</th>
                      <th className="text-center px-6 py-4" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBrokers.map((broker, index) => (
                      <tr key={broker.id} style={{ borderBottom: index < filteredBrokers.length - 1 ? '1px solid #F5F5F5' : 'none' }}>
                        <td className="px-6 py-4">
                          <div>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', color: '#0A0A0A', marginBottom: '2px' }}>{broker.name}</div>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#737373' }}>{broker.email}</div>
                          </div>
                        </td>
                        <td className="text-center px-6 py-4">
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A' }}>{broker.rol}</span>
                        </td>
                        <td className="text-center px-6 py-4">
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', fontWeight: 'var(--font-weight-semibold)', color: '#0A0A0A' }}>{broker.leadsAsignados}</span>
                        </td>
                        <td className="text-center px-6 py-4">
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', fontWeight: 'var(--font-weight-semibold)', color: '#0A0A0A' }}>{broker.contactos}</span>
                        </td>
                        <td className="text-center px-6 py-4">
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>{broker.ultimaInteraccion}</span>
                        </td>
                        <td className="text-center px-6 py-4">
                          <span
                            className="inline-flex items-center px-3 py-1 rounded-full"
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--font-size-xs)',
                              fontWeight: 'var(--font-weight-medium)',
                              backgroundColor: broker.estado === 'activo' ? '#DCFCE7' : 'var(--muted)',
                              color: broker.estado === 'activo' ? '#16A34A' : '#737373'
                            }}
                          >
                            {broker.estado === 'activo' ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                        <td className="text-center px-6 py-4">
                          <button
                            onClick={() => toggleBrokerEstado(broker.id)}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors"
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
                            {broker.estado === 'activo' ? (
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* SECCIÓN: ASIGNACIONES */}
          {activeNav === 'asignaciones' && (
            <>
              {/* Filtros y búsqueda */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#737373' }} />
                    <input
                      type="text"
                      placeholder="Buscar lead..."
                      value={leadSearchQuery}
                      onChange={(e) => setLeadSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2.5 rounded-lg"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E5E5E5',
                        width: '280px'
                      }}
                    />
                  </div>
                  <select
                    value={assignmentFilter}
                    onChange={(e) => setAssignmentFilter(e.target.value as any)}
                    className="appearance-none pl-4 pr-10 py-2.5 rounded-lg cursor-pointer"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E5E5'
                    }}
                  >
                    <option value="todos">Todos los leads</option>
                    <option value="sin-asignar">Sin asignar</option>
                    <option value="asignados">Asignados</option>
                  </select>
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>
                  {filteredLeads.length} lead{filteredLeads.length !== 1 ? 's' : ''}
                </div>
              </div>

              {/* Tabla de leads */}
              <div className="rounded-xl overflow-hidden" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                <table className="w-full">
                  <thead>
                    <tr style={{ backgroundColor: '#FAFAFA', borderBottom: '1px solid #E5E5E5' }}>
                      <th className="text-left px-6 py-4" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cliente</th>
                      <th className="text-left px-6 py-4" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Proyecto</th>
                      <th className="text-center px-6 py-4" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Fecha ingreso</th>
                      <th className="text-center px-6 py-4" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Estado</th>
                      <th className="text-left px-6 py-4" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Broker asignado</th>
                      <th className="text-center px-6 py-4" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((lead, index) => (
                      <tr key={lead.id} style={{ borderBottom: index < filteredLeads.length - 1 ? '1px solid #F5F5F5' : 'none' }}>
                        <td className="px-6 py-4">
                          <div>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', color: '#0A0A0A', marginBottom: '2px' }}>{lead.nombre}</div>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#737373' }}>{lead.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A' }}>{lead.proyecto}</span>
                        </td>
                        <td className="text-center px-6 py-4">
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>{lead.fechaIngreso}</span>
                        </td>
                        <td className="text-center px-6 py-4">
                          <span
                            className="inline-flex items-center px-3 py-1 rounded-full"
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--font-size-xs)',
                              fontWeight: 'var(--font-weight-medium)',
                              backgroundColor: lead.estado === 'sin-asignar' ? '#F9FAFB' : lead.estado === 'contactado' ? '#DCFCE7' : '#FEF3C7',
                              color: lead.estado === 'sin-asignar' ? '#6B7280' : lead.estado === 'contactado' ? '#16A34A' : '#CA8A04',
                              border: lead.estado === 'sin-asignar' ? '1px solid #E5E7EB' : 'none'
                            }}
                          >
                            {lead.estado === 'sin-asignar' ? 'Sin asignar' : lead.estado === 'asignado' ? 'Asignado' : 'Contactado'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {lead.brokerAsignado ? (
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A' }}>{lead.brokerAsignado}</span>
                          ) : (
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>—</span>
                          )}
                        </td>
                        <td className="text-center px-6 py-4">
                          {lead.estado === 'sin-asignar' && (
                            <button
                              onClick={() => assignLeadToBroker(lead.id, 'María González')}
                              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors"
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--font-size-xs)',
                                fontWeight: 'var(--font-weight-medium)',
                                color: '#FFFFFF',
                                backgroundColor: '#006B4E',
                                border: 'none'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#01533E';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#006B4E';
                              }}
                            >
                              <UserPlus className="w-4 h-4" />
                              Asignar
                            </button>
                          )}
                          {lead.estado !== 'sin-asignar' && (
                            <button
                              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors"
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
                              <Edit2 className="w-4 h-4" />
                              Reasignar
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* SECCIÓN: INTERACCIONES */}
          {activeNav === 'interacciones' && (
            <>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#737373' }} />
                    <input
                      type="text"
                      placeholder="Buscar interacción..."
                      value={interactionSearchQuery}
                      onChange={(e) => setInteractionSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2.5 rounded-lg"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E5E5E5',
                        width: '280px'
                      }}
                    />
                  </div>
                  <select
                    value={interactionTypeFilter}
                    onChange={(e) => setInteractionTypeFilter(e.target.value as any)}
                    className="appearance-none pl-4 pr-10 py-2.5 rounded-lg cursor-pointer"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E5E5'
                    }}
                  >
                    <option value="todos">Todos los tipos</option>
                    <option value="Llamada">Llamadas</option>
                    <option value="Email">Emails</option>
                    <option value="WhatsApp">WhatsApp</option>
                  </select>
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>
                  {filteredInteracciones.length} interaccion{filteredInteracciones.length !== 1 ? 'es' : ''}
                </div>
              </div>

              <div className="rounded-xl overflow-hidden" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                <table className="w-full">
                  <thead>
                    <tr style={{ backgroundColor: '#FAFAFA', borderBottom: '1px solid #E5E5E5' }}>
                      <th className="text-center px-6 py-4" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tipo</th>
                      <th className="text-left px-6 py-4" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Broker</th>
                      <th className="text-left px-6 py-4" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Lead</th>
                      <th className="text-center px-6 py-4" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Fecha</th>
                      <th className="text-left px-6 py-4" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Notas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInteracciones.map((interaccion, index) => (
                      <tr key={interaccion.id} style={{ borderBottom: index < filteredInteracciones.length - 1 ? '1px solid #F5F5F5' : 'none' }}>
                        <td className="text-center px-6 py-4">
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ backgroundColor: '#FAFAFA' }}>
                            {interaccion.tipo === 'Llamada' && <PhoneCall className="w-4 h-4" style={{ color: '#006B4E' }} />}
                            {interaccion.tipo === 'Email' && <Mail className="w-4 h-4" style={{ color: '#006B4E' }} />}
                            {interaccion.tipo === 'WhatsApp' && <MessageSquare className="w-4 h-4" style={{ color: '#16A34A' }} />}
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', color: '#0A0A0A' }}>{interaccion.tipo}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', color: '#0A0A0A' }}>{interaccion.broker}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A' }}>{interaccion.lead}</span>
                        </td>
                        <td className="text-center px-6 py-4">
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>{interaccion.fecha}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>{interaccion.notas}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* SECCIÓN: CITAS */}
          {activeNav === 'citas' && (
            <CitasAdminView />
          )}

          {/* SECCIÓN: RESERVAS */}
          {activeNav === 'reservas' && (
            <ReservasAdminView />
          )}

          {/* SECCIÓN: WHATSAPP */}
          {activeNav === 'whatsapp' && (
            <ContactosWhatsAppAdminView />
          )}

          {/* SECCIÓN: WHITELIST */}
          {activeNav === 'whitelist' && (
            <WhitelistAdminView />
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
                          color: activePublicacionesTab === tab.id ? '#006B4E' : '#737373',
                          borderBottom: activePublicacionesTab === tab.id ? '2px solid #006B4E' : '2px solid transparent',
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
              <section className="rounded-2xl p-6 mb-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                <div className="flex items-center justify-between mb-6">
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
                        backgroundColor: '#006B4E',
                        border: 'none'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#01533E';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#006B4E';
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
                        border: '1px solid #E5E5E5',
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
                          color: '#0A0A0A',
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
                          color: '#0A0A0A',
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E5E5E5'
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
                          color: '#0A0A0A',
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
                          color: '#0A0A0A',
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E5E5E5'
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#0A0A0A',
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
                          color: '#0A0A0A',
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E5E5E5'
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#0A0A0A',
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
                          color: '#0A0A0A',
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E5E5E5'
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#0A0A0A',
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
                          color: '#0A0A0A',
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E5E5E5'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </section>
              )}

              {/* Banners promocionales */}
              {activePublicacionesTab === 'banners' && (
              <section className="rounded-2xl p-6 mb-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                <div className="flex items-center justify-between mb-6">
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
                        border: '1px solid #E5E5E5'
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
                            border: '1px solid #E5E5E5'
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
                                  color: '#0A0A0A',
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
                                  CTA: <span style={{ color: '#0A0A0A', fontWeight: 'var(--font-weight-medium)' }}>{banner.ctaTexto}</span>
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
                                border: '1px solid #E5E5E5',
                                color: '#0A0A0A'
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
                                border: '1px solid #E5E5E5',
                                color: '#0A0A0A'
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
                              backgroundColor: '#006B4E',
                              border: 'none'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#01533E';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#006B4E';
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
              <section className="rounded-2xl p-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                <div className="mb-6">
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
                        border: '1px solid #E5E5E5'
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
                                color: '#0A0A0A'
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
                          e.currentTarget.style.borderColor = '#006B4E';
                          e.currentTarget.style.backgroundColor = '#FAFAFA';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#E5E5E5';
                          e.currentTarget.style.backgroundColor = '#FFFFFF';
                        }}
                      >
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                          style={{ backgroundColor: 'rgba(0, 107, 78, 0.1)' }}
                        >
                          <Layout className="w-6 h-6" style={{ color: '#006B4E' }} />
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
                          e.currentTarget.style.borderColor = '#006B4E';
                          e.currentTarget.style.backgroundColor = '#FAFAFA';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#E5E5E5';
                          e.currentTarget.style.backgroundColor = '#FFFFFF';
                        }}
                      >
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                          style={{ backgroundColor: 'rgba(0, 107, 78, 0.1)' }}
                        >
                          <Home className="w-6 h-6" style={{ color: '#006B4E' }} />
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

          {/* SECCIÓN: USUARIOS & PERMISOS */}
          {activeNav === 'usuarios' && (
            <>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#737373' }} />
                    <input
                      type="text"
                      placeholder="Buscar usuario..."
                      value={userSearchQuery}
                      onChange={(e) => setUserSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2.5 rounded-lg"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E5E5E5',
                        width: '280px'
                      }}
                    />
                  </div>
                  <select
                    value={userFilter}
                    onChange={(e) => setUserFilter(e.target.value as any)}
                    className="appearance-none pl-4 pr-10 py-2.5 rounded-lg cursor-pointer"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E5E5'
                    }}
                  >
                    <option value="todos">Todos los usuarios</option>
                    <option value="activos">Solo activos</option>
                    <option value="inactivos">Solo inactivos</option>
                  </select>
                </div>
                <div className="flex items-center gap-4">
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>
                    {filteredUsuarios.length} usuario{filteredUsuarios.length !== 1 ? 's' : ''}
                  </div>
                  <button
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#FFFFFF',
                      backgroundColor: '#006B4E',
                      border: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#01533E';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#006B4E';
                    }}
                  >
                    <Plus className="w-5 h-5" />
                    Crear nuevo usuario
                  </button>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                <table className="w-full">
                  <thead>
                    <tr style={{ backgroundColor: '#FAFAFA', borderBottom: '1px solid #E5E5E5' }}>
                      <th className="text-left px-6 py-4" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Usuario</th>
                      <th className="text-center px-6 py-4" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Rol</th>
                      <th className="text-center px-6 py-4" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Último acceso</th>
                      <th className="text-center px-6 py-4" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Estado</th>
                      <th className="text-center px-6 py-4" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsuarios.map((usuario, index) => (
                      <tr key={usuario.id} style={{ borderBottom: index < filteredUsuarios.length - 1 ? '1px solid #F5F5F5' : 'none' }}>
                        <td className="px-6 py-4">
                          <div>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', color: '#0A0A0A', marginBottom: '2px' }}>{usuario.nombre}</div>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#737373' }}>{usuario.email}</div>
                          </div>
                        </td>
                        <td className="text-center px-6 py-4">
                          <span
                            className="inline-flex items-center px-3 py-1 rounded-full"
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--font-size-xs)',
                              fontWeight: 'var(--font-weight-medium)',
                              backgroundColor: usuario.rol === 'Admin General' ? '#EEF2FF' : usuario.rol === 'Marketing' ? '#FEF3C7' : '#F3F4F6',
                              color: usuario.rol === 'Admin General' ? '#4338CA' : usuario.rol === 'Marketing' ? '#CA8A04' : '#6B7280'
                            }}
                          >
                            {usuario.rol}
                          </span>
                        </td>
                        <td className="text-center px-6 py-4">
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>{usuario.ultimoAcceso}</span>
                        </td>
                        <td className="text-center px-6 py-4">
                          <span
                            className="inline-flex items-center px-3 py-1 rounded-full"
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--font-size-xs)',
                              fontWeight: 'var(--font-weight-medium)',
                              backgroundColor: usuario.estado === 'activo' ? '#DCFCE7' : 'var(--muted)',
                              color: usuario.estado === 'activo' ? '#16A34A' : '#737373'
                            }}
                          >
                            {usuario.estado === 'activo' ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                        <td className="text-center px-6 py-4">
                          <button
                            onClick={() => toggleUsuarioEstado(usuario.id)}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors"
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
                            {usuario.estado === 'activo' ? (
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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

              {/* SECCIÓN 1: CONFIGURACIÓN GENERAL (mantener diseño actual) */}
              <section
                className="rounded-2xl p-6 mb-6"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E5E5',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                }}
              >
                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--font-size-h3)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-heading)',
                    marginBottom: '24px'
                  }}
                >
                  Configuración general
                </h2>
                <div className="grid grid-cols-2 gap-6">
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
                </div>
              </section>

              {/* SECCIÓN 2: GOBIERNO DEL SISTEMA */}
              <section
                className="rounded-2xl p-6 mb-6"
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
                className="rounded-2xl p-6 mb-6"
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

                <div className="grid grid-cols-2 gap-6 mb-6">
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
                <div className="pt-6" style={{ borderTop: '1px solid #E5E5E5' }}>
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
                className="rounded-2xl p-6 mb-6"
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
                    backgroundColor: '#EBFEF5',
                    border: '1px solid #B3DAC8'
                  }}
                >
                  <div className="flex gap-3">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0" style={{ color: '#01533E' }} />
                    <div>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#01533E',
                          marginBottom: '4px'
                        }}
                      >
                        Sobre los resultados de IA
                      </p>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          color: '#01533E',
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
                className="rounded-2xl p-6 mb-6"
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
                className="rounded-2xl p-6 mb-6"
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
                className="rounded-2xl p-6 mb-6"
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
