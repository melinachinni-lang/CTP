import React, { useState, useRef, useEffect } from 'react';
import { Calendar, MessageCircle, Phone, Video, X, Check, Clock, RefreshCw, AlertCircle, ChevronDown, ChevronUp, Bell, Info, FileText, Send, Reply, Tag, Mail, UserCheck, Users, SlidersHorizontal, Plus, Minus } from 'lucide-react';

interface ConsultasViewProps {
  viewType?: 'personal' | 'broker' | 'inmobiliaria';
  onFeedback?: (msg: string) => void;
  defaultTab?: 'recibidas' | 'enviadas' | 'notificaciones' | 'reservas' | 'leads';
}

interface Lead {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  parcela: string;
  origen: string;
  fecha: string;
  estado: 'sin_asignar' | 'asignado' | 'nuevo' | 'contactado' | 'cerrado';
  brokerAsignado?: string;
}

type EstadoConsulta = 'pendiente' | 'confirmada' | 'reprogramada' | 'cancelada' | 'expirada';
type TipoContacto = 'visita' | 'videollamada' | 'whatsapp' | 'formulario';

interface Consulta {
  id: string;
  tipo: TipoContacto;
  parcela: { id: number; nombre: string; ubicacion: string; imagen: string; };
  otroUsuario: { nombre: string; avatar?: string; email?: string; telefono?: string; };
  fecha?: string;
  hora?: string;
  estado: EstadoConsulta;
  notas?: string;
  motivo?: string;
  origen?: string;
  brokerAsignado?: string;
  // campos específicos de formulario
  mensaje?: string;
  tipoInteres?: string;
  cuandoVisitar?: string;
  respuesta?: string;
}

const RECIBIDAS: Consulta[] = [
  {
    id: 'r1',
    tipo: 'visita',
    parcela: { id: 1, nombre: 'Parcela Vista Cordillera', ubicacion: 'Lo Barnechea, R. Metropolitana', imagen: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400' },
    otroUsuario: { nombre: 'Carlos Muñoz', email: 'carlos.munoz@gmail.com', telefono: '+56 9 8821 4433' },
    fecha: '2026-05-10',
    hora: '10:00',
    estado: 'pendiente',
    origen: 'Portal web',
    notas: 'Interesado en ver el acceso al predio y el sistema de agua',
  },
  {
    id: 'r2',
    tipo: 'videollamada',
    parcela: { id: 1, nombre: 'Parcela Vista Cordillera', ubicacion: 'Lo Barnechea, R. Metropolitana', imagen: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400' },
    otroUsuario: { nombre: 'María González', email: 'mgonzalez@outlook.com', telefono: '+56 9 7734 2291' },
    fecha: '2026-05-07',
    hora: '15:30',
    estado: 'confirmada',
    origen: 'Portal web',
    brokerAsignado: 'Ana Silva',
  },
  {
    id: 'r3',
    tipo: 'formulario',
    parcela: { id: 1, nombre: 'Parcela Vista Cordillera', ubicacion: 'Lo Barnechea, R. Metropolitana', imagen: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400' },
    otroUsuario: { nombre: 'Sofía Ramírez', email: 'sofia.r@icloud.com', telefono: '+56 9 6612 9988' },
    fecha: '2026-05-03',
    estado: 'pendiente',
    origen: 'Formulario de contacto',
    mensaje: 'Hola, vi tu publicación y me interesa mucho la parcela. ¿Sigue disponible? ¿Tiene acceso a agua potable y luz eléctrica?',
    tipoInteres: 'Uso propio / vivir ahí',
    cuandoVisitar: '2026-05-20',
  },
  {
    id: 'r4',
    tipo: 'visita',
    parcela: { id: 1, nombre: 'Parcela Vista Cordillera', ubicacion: 'Lo Barnechea, R. Metropolitana', imagen: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400' },
    otroUsuario: { nombre: 'Pedro Flores', email: 'pf.flores@yahoo.com', telefono: '+56 9 5541 7762' },
    fecha: '2026-04-20',
    hora: '11:00',
    estado: 'cancelada',
    origen: 'Portal web',
    motivo: 'No pude coordinar el transporte para ese día',
  },
  {
    id: 'r5',
    tipo: 'whatsapp',
    parcela: { id: 2, nombre: 'Parcela Lago Azul', ubicacion: 'Villarrica, Araucanía', imagen: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400' },
    otroUsuario: { nombre: 'Lucía Fernández', email: 'lucia.f@gmail.com', telefono: '+56 9 9923 4401' },
    fecha: '2026-05-12',
    estado: 'pendiente',
    origen: 'WhatsApp',
  },
];

const ENVIADAS: Consulta[] = [
  {
    id: 'e1',
    tipo: 'visita',
    parcela: { id: 5, nombre: 'Parcela El Valle Verde', ubicacion: 'San José de Maipo, R. Metropolitana', imagen: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400' },
    otroUsuario: { nombre: 'Inmobiliaria del Sur' },
    fecha: '2026-05-12',
    hora: '09:00',
    estado: 'pendiente',
    notas: 'Me gustaría ver la vista al río y las colindancias',
  },
  {
    id: 'e2',
    tipo: 'videollamada',
    parcela: { id: 7, nombre: 'Parcela Los Aromos', ubicacion: 'Pirque, R. Metropolitana', imagen: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400' },
    otroUsuario: { nombre: 'Rodrigo Sepúlveda' },
    fecha: '2026-05-06',
    hora: '18:00',
    estado: 'reprogramada',
  },
  {
    id: 'e3',
    tipo: 'whatsapp',
    parcela: { id: 9, nombre: 'Parcela Cerro Alto', ubicacion: 'Colina, R. Metropolitana', imagen: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400' },
    otroUsuario: { nombre: 'Ana Torres' },
    fecha: '2026-04-28',
    estado: 'expirada',
  },
];

const ESTADO_CONFIG: Record<EstadoConsulta, { label: string; bg: string; text: string; border: string }> = {
  pendiente:    { label: 'Pendiente',    bg: '#FEF3C7', text: '#92400E', border: '#FCD34D' },
  confirmada:   { label: 'Confirmada',   bg: '#DCFCE7', text: '#166534', border: '#86EFAC' },
  reprogramada: { label: 'Reprogramada', bg: '#DBEAFE', text: '#1E40AF', border: '#93C5FD' },
  cancelada:    { label: 'Cancelada',    bg: '#FEE2E2', text: '#991B1B', border: '#FCA5A5' },
  expirada:     { label: 'Expirada',     bg: '#F3F4F6', text: '#6B7280', border: '#D1D5DB' },
};

function TipoIcon({ tipo }: { tipo: TipoContacto }) {
  const style = { width: '16px', height: '16px', fill: 'none', stroke: '#006B4E', strokeWidth: 2 };
  if (tipo === 'visita') return (
    <svg viewBox="0 0 24 24" style={style}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
  if (tipo === 'videollamada') return (
    <svg viewBox="0 0 24 24" style={style}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.362a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
  if (tipo === 'formulario') return (
    <svg viewBox="0 0 24 24" style={style}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
  return (
    <svg viewBox="0 0 24 24" style={style}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  );
}

function formatFecha(fecha?: string, hora?: string) {
  if (!fecha) return null;
  const d = new Date(fecha + 'T00:00:00');
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
  const dateStr = d.toLocaleDateString('es-CL', options);
  return hora ? `${dateStr} · ${hora}` : dateStr;
}

function TipoLabel({ tipo }: { tipo: TipoContacto }) {
  const labels: Record<TipoContacto, string> = { visita: 'Visita presencial', videollamada: 'Videollamada', whatsapp: 'WhatsApp', formulario: 'Consulta por formulario' };
  return <span>{labels[tipo]}</span>;
}

const BROKERS_MOCK = [
  { id: 1, nombre: 'Ana Silva', rol: 'Broker Senior', disponible: true },
  { id: 2, nombre: 'Carlos Pérez', rol: 'Broker', disponible: true },
  { id: 3, nombre: 'Rodrigo Mena', rol: 'Broker', disponible: false },
  { id: 4, nombre: 'Valentina Rojas', rol: 'Broker', disponible: true },
];

const RESERVAS_MOCK: Consulta[] = [
  {
    id: 'res1',
    tipo: 'visita',
    parcela: { id: 1, nombre: 'Parcela Vista Cordillera', ubicacion: 'Lo Barnechea, R. Metropolitana', imagen: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400' },
    otroUsuario: { nombre: 'Martín Castillo', email: 'mcastillo@gmail.com', telefono: '+56 9 8811 2233' },
    fecha: '2026-06-20',
    hora: '10:00',
    estado: 'confirmada',
    origen: 'Portal web',
    notas: 'Quiere ver el acceso vehicular y el sistema de agua',
    brokerAsignado: 'Ana Silva',
  },
  {
    id: 'res2',
    tipo: 'videollamada',
    parcela: { id: 2, nombre: 'Parcela Lago Azul', ubicacion: 'Villarrica, Araucanía', imagen: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400' },
    otroUsuario: { nombre: 'Isabel Moreno', email: 'imoreno@outlook.com', telefono: '+56 9 7712 9944' },
    fecha: '2026-06-22',
    hora: '15:00',
    estado: 'confirmada',
    origen: 'Portal web',
  },
  {
    id: 'res3',
    tipo: 'visita',
    parcela: { id: 1, nombre: 'Parcela Vista Cordillera', ubicacion: 'Lo Barnechea, R. Metropolitana', imagen: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400' },
    otroUsuario: { nombre: 'Roberto Vega', email: 'rvega@yahoo.com', telefono: '+56 9 6623 5577' },
    fecha: '2026-06-18',
    hora: '09:30',
    estado: 'reprogramada',
    origen: 'Portal web',
    notas: 'Pidió visita grupal con su familia',
  },
  {
    id: 'res4',
    tipo: 'visita',
    parcela: { id: 2, nombre: 'Parcela Lago Azul', ubicacion: 'Villarrica, Araucanía', imagen: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400' },
    otroUsuario: { nombre: 'Camila Reyes', email: 'creyes@gmail.com', telefono: '+56 9 5534 8821' },
    fecha: '2026-06-25',
    hora: '11:00',
    estado: 'confirmada',
    origen: 'Portal web',
  },
];

const NOTIFICACIONES_MOCK = [
  { id: 'n1', type: 'consulta' as const, text: 'Pedro Soto envió una consulta sobre "Parcela Vista Cordillera"', time: 'Hace 5 min', read: false },
  { id: 'n2', type: 'visita' as const, text: 'Visita confirmada para el 15 de mayo a las 10:00 hrs', time: 'Hace 1 hora', read: false },
  { id: 'nwa', type: 'whatsapp' as const, text: 'Sofía Ramírez hizo click en "Consultar por WhatsApp" para tu Parcela Vista Cordillera. Revisá tu WhatsApp.', time: 'Hace 2 horas', read: false },
  { id: 'n3', type: 'sistema' as const, text: 'Tu publicación "Parcela Vista Cordillera" fue vista 50 veces', time: 'Hace 3 horas', read: false },
  { id: 'n4', type: 'consulta' as const, text: 'Ana Torres respondió a tu consulta sobre "Parcela Lago Ranco"', time: 'Ayer', read: true },
  { id: 'n5', type: 'sistema' as const, text: 'Recuerda completar tu perfil para más visibilidad', time: 'Hace 2 días', read: true },
];

const LEADS_MOCK: Lead[] = [
  { id: 'l1', nombre: 'Juan Martínez', email: 'juan.m@gmail.com', telefono: '+56 9 8834 5566', parcela: 'Parcela Vista Cordillera', origen: 'Portal web', fecha: '2026-05-15', estado: 'sin_asignar' },
  { id: 'l2', nombre: 'Andrea López', email: 'andrea.l@outlook.com', telefono: '+56 9 7723 4411', parcela: 'Parcela Lago Azul', origen: 'Portal web', fecha: '2026-05-14', estado: 'asignado', brokerAsignado: 'Ana Silva' },
  { id: 'l3', nombre: 'Felipe Torres', email: 'ftorres@email.com', telefono: '+56 9 6612 3300', parcela: 'Parcela Vista Cordillera', origen: 'WhatsApp', fecha: '2026-05-13', estado: 'asignado', brokerAsignado: 'Carlos Pérez' },
  { id: 'l4', nombre: 'Camila Herrera', email: 'c.herrera@gmail.com', telefono: '+56 9 5501 2299', parcela: 'Parcela Los Robles', origen: 'Portal web', fecha: '2026-05-12', estado: 'sin_asignar' },
  { id: 'l5', nombre: 'Roberto Díaz', email: 'rdiaz@yahoo.com', telefono: '+56 9 4490 1188', parcela: 'Parcela Lago Azul', origen: 'Formulario', fecha: '2026-05-10', estado: 'asignado', brokerAsignado: 'Ana Silva' },
];

const LEADS_BROKER_MOCK: Lead[] = [
  { id: 'lb1', nombre: 'Felipe Torres', email: 'ftorres@email.com', telefono: '+56 9 6612 3300', parcela: 'Parcela Vista Cordillera', origen: 'WhatsApp', fecha: '2026-05-13', estado: 'nuevo', brokerAsignado: 'Carlos Pérez' },
  { id: 'lb2', nombre: 'Valentina Soto', email: 'vsoto@gmail.com', telefono: '+56 9 3312 7744', parcela: 'Parcela Los Robles', origen: 'Portal web', fecha: '2026-05-09', estado: 'nuevo', brokerAsignado: 'Carlos Pérez' },
];

const LEAD_ESTADO_CONFIG: Record<Lead['estado'], { label: string; bg: string; text: string; border: string }> = {
  sin_asignar: { label: 'Sin asignar', bg: '#FEF3C7', text: '#92400E',  border: '#FCD34D' },
  asignado:    { label: 'Asignado',    bg: '#D1FAE5', text: '#065F46',  border: '#6EE7B7' },
  nuevo:       { label: 'Nuevo',       bg: '#EDE9FE', text: '#5B21B6',  border: '#C4B5FD' },
  contactado:  { label: 'Contactado',  bg: '#DBEAFE', text: '#1E40AF',  border: '#93C5FD' },
  cerrado:     { label: 'Cerrado',     bg: '#F3F4F6', text: '#6B7280',  border: '#D1D5DB' },
};

export function ConsultasView({ viewType = 'personal', onFeedback, defaultTab = 'recibidas' }: ConsultasViewProps) {
  const [activeTab, setActiveTab] = useState<'recibidas' | 'enviadas' | 'notificaciones' | 'reservas' | 'leads'>(defaultTab);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  React.useEffect(() => {
    setActiveTab(defaultTab);
    setExpandedId(null);
  }, [defaultTab]);
  const [consultas, setConsultas] = useState<{ recibidas: Consulta[]; enviadas: Consulta[] }>({ recibidas: RECIBIDAS, enviadas: ENVIADAS });
  const [reservas, setReservas] = useState<Consulta[]>(RESERVAS_MOCK);
  const [notificaciones, setNotificaciones] = useState(NOTIFICACIONES_MOCK);
  const [leads, setLeads] = useState<Lead[]>(viewType === 'broker' ? LEADS_BROKER_MOCK : LEADS_MOCK);
  const [showReprogramar, setShowReprogramar] = useState<string | null>(null);
  const [showCancelar, setShowCancelar] = useState<string | null>(null);
  const [showAsignarBroker, setShowAsignarBroker] = useState<string | null>(null);
  const [brokerSeleccionado, setBrokerSeleccionado] = useState('');
  const [showAsignarLeadBroker, setShowAsignarLeadBroker] = useState<string | null>(null);
  const [leadBrokerSeleccionado, setLeadBrokerSeleccionado] = useState('');
  const [leadFiltro, setLeadFiltro] = useState<'todos' | 'asignados' | 'sin_asignar' | 'nuevo' | 'contactado' | 'cerrado'>('todos');
  const [showLeadFiltroDropdown, setShowLeadFiltroDropdown] = useState(false);
  const leadFiltroRef = useRef<HTMLDivElement>(null);
  const [showLeadStatusDropdown, setShowLeadStatusDropdown] = useState<string | null>(null);
  const [showContactarModal, setShowContactarModal] = useState<Lead | null>(null);
  const [showStatusDropdown, setShowStatusDropdown] = useState<string | null>(null);
  const [consultaFiltro, setConsultaFiltro] = useState<'todas' | EstadoConsulta>('todas');
  const [showConsultaFiltroDropdown, setShowConsultaFiltroDropdown] = useState(false);
  const consultaFiltroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (leadFiltroRef.current && !leadFiltroRef.current.contains(e.target as Node)) {
        setShowLeadFiltroDropdown(false);
      }
      if (consultaFiltroRef.current && !consultaFiltroRef.current.contains(e.target as Node)) {
        setShowConsultaFiltroDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);
  const [repFecha, setRepFecha] = useState('');
  const [repHora, setRepHora] = useState('');
  const [cancelMotivo, setCancelMotivo] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [replyOpenId, setReplyOpenId] = useState<string | null>(null);
  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({});

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    if (onFeedback) onFeedback(msg);
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleReprogramar = (id: string) => {
    if (!repFecha || !repHora) return;
    if (activeTab === 'reservas') {
      setReservas(prev => prev.map(c => c.id === id ? { ...c, estado: 'reprogramada' as EstadoConsulta, fecha: repFecha, hora: repHora } : c));
    } else {
      setConsultas(prev => ({
        ...prev,
        recibidas: prev.recibidas.map(c => c.id === id ? { ...c, estado: 'reprogramada' as EstadoConsulta, fecha: repFecha, hora: repHora } : c),
      }));
    }
    setShowReprogramar(null);
    setRepFecha('');
    setRepHora('');
    showFeedback('Visita reprogramada. Se notificó al comprador.');
  };

  const handleCancelar = (id: string) => {
    if (activeTab === 'reservas') {
      setReservas(prev => prev.map(c => c.id === id ? { ...c, estado: 'cancelada' as EstadoConsulta, motivo: cancelMotivo } : c));
    } else {
      setConsultas(prev => ({
        ...prev,
        recibidas: prev.recibidas.map(c => c.id === id ? { ...c, estado: 'cancelada' as EstadoConsulta, motivo: cancelMotivo } : c),
      }));
    }
    setShowCancelar(null);
    setCancelMotivo('');
    showFeedback('Visita cancelada. Se notificó al comprador.');
  };

  const listaBase = activeTab === 'recibidas' ? consultas.recibidas : activeTab === 'enviadas' ? consultas.enviadas : activeTab === 'reservas' ? reservas : [];
  const lista = consultaFiltro === 'todas' ? listaBase : listaBase.filter(c => c.estado === consultaFiltro);
  const leadsFiltered = viewType === 'broker'
    ? (leadFiltro === 'todos' ? leads : leads.filter(l => l.estado === leadFiltro))
    : leadFiltro === 'asignados'
    ? leads.filter(l => l.brokerAsignado)
    : leadFiltro === 'sin_asignar'
    ? leads.filter(l => !l.brokerAsignado)
    : [...leads].sort((a, b) => (a.brokerAsignado ? 1 : 0) - (b.brokerAsignado ? 1 : 0));
  const canManage = (c: Consulta) => {
    const manageable = c.tipo !== 'whatsapp' && c.tipo !== 'formulario';
    if (activeTab === 'reservas') return manageable && (c.estado === 'confirmada' || c.estado === 'reprogramada');
    return activeTab === 'recibidas' && manageable && (c.estado === 'pendiente' || c.estado === 'confirmada');
  };
  const canManageFormulario = (c: Consulta) => activeTab === 'recibidas' && c.tipo === 'formulario' && c.estado !== 'cancelada';
  const unreadNotifCount = notificaciones.filter(n => !n.read).length;

  const handleSendReply = (id: string) => {
    const texto = replyTexts[id]?.trim();
    if (!texto) return;
    setConsultas(prev => ({
      ...prev,
      recibidas: prev.recibidas.map(c => c.id === id ? { ...c, estado: 'confirmada' as EstadoConsulta, respuesta: texto } : c),
    }));
    setReplyOpenId(null);
    setReplyTexts(prev => ({ ...prev, [id]: '' }));
    showFeedback('Respuesta enviada correctamente.');
  };

  const handleMarcarRecibido = (id: string) => {
    setConsultas(prev => ({
      ...prev,
      recibidas: prev.recibidas.map(c => c.id === id ? { ...c, estado: 'confirmada' as EstadoConsulta } : c),
    }));
    showFeedback('Consulta marcada como recibida.');
  };

  const handleAsignarBroker = (id: string) => {
    if (!brokerSeleccionado) return;
    setConsultas(prev => ({
      ...prev,
      recibidas: prev.recibidas.map(c => c.id === id ? { ...c, brokerAsignado: brokerSeleccionado } : c),
    }));
    setShowAsignarBroker(null);
    setBrokerSeleccionado('');
    showFeedback(`Broker asignado correctamente. Se notificó a ${brokerSeleccionado}.`);
  };

  const handleAsignarLeadBroker = (id: string) => {
    if (!leadBrokerSeleccionado) return;
    setLeads(prev => prev.map(l => l.id === id ? { ...l, brokerAsignado: leadBrokerSeleccionado, estado: 'asignado' as const } : l));
    setShowAsignarLeadBroker(null);
    setLeadBrokerSeleccionado('');
    showFeedback(`Lead asignado a ${leadBrokerSeleccionado}. Recibirá una notificación.`);
  };

  const handleCambiarEstadoLead = (id: string, nuevoEstado: Lead['estado']) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, estado: nuevoEstado } : l));
    showFeedback('Estado actualizado.');
  };

  const handleCambiarEstado = (id: string, nuevoEstado: EstadoConsulta) => {
    if (activeTab === 'reservas') {
      setReservas(prev => prev.map(c => c.id === id ? { ...c, estado: nuevoEstado } : c));
    } else {
      setConsultas(prev => ({
        ...prev,
        recibidas: prev.recibidas.map(c => c.id === id ? { ...c, estado: nuevoEstado } : c),
      }));
    }
    showFeedback('Estado actualizado correctamente.');
  };

  return (
    <main className="px-6 py-6 space-y-6">
      {/* Overlays para cerrar dropdowns al hacer click afuera */}
      {showStatusDropdown && (
        <div className="fixed inset-0 z-20" onClick={() => setShowStatusDropdown(null)} />
      )}
      {showLeadStatusDropdown && (
        <div className="fixed inset-0 z-20" onClick={() => setShowLeadStatusDropdown(null)} />
      )}

      {/* Feedback toast */}
      {feedback && (
        <div className="fixed bottom-6 left-1/2 z-[9999] flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg" style={{ transform: 'translateX(-50%)', backgroundColor: '#0A0A0A', color: '#FFFFFF', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', minWidth: '280px' }}>
          <Check className="w-4 h-4 flex-shrink-0" style={{ color: '#86EFAC' }} />
          {feedback}
        </div>
      )}

      {/* Header */}
      <div className="space-y-1">
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h2)', fontWeight: 500, color: '#0A0A0A', lineHeight: 'var(--line-height-heading)' }}>
          Consultas
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', color: '#6B6B6B', lineHeight: 'var(--line-height-body)' }}>
          Historial de contactos y visitas de los últimos 6 meses
        </p>
      </div>

      {/* Tabs + filtro leads */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1 p-1 rounded-full" style={{ backgroundColor: '#F3F4F6', width: 'fit-content' }}>
          {[
            { id: 'recibidas', label: 'Recibidas', count: consultas.recibidas.length },
            ...(viewType === 'personal' ? [{ id: 'enviadas', label: 'Enviadas', count: consultas.enviadas.length }] : []),
            { id: 'notificaciones', label: 'Notificaciones', count: unreadNotifCount },
            ...(viewType !== 'personal' ? [{ id: 'leads', label: 'Leads', count: leads.length }] : []),
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as 'recibidas' | 'enviadas' | 'notificaciones' | 'reservas' | 'leads'); setExpandedId(null); setConsultaFiltro('todas'); setShowStatusDropdown(null); }}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1"
              style={{
                fontFamily: 'var(--font-body)',
                backgroundColor: activeTab === tab.id ? '#FFFFFF' : 'transparent',
                color: activeTab === tab.id ? '#0A0A0A' : '#6B7280',
                boxShadow: activeTab === tab.id ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              }}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full text-xs" style={{ backgroundColor: activeTab === tab.id ? (tab.id === 'notificaciones' ? '#DC2626' : '#006B4E') : '#E5E5E5', color: activeTab === tab.id ? '#FFFFFF' : '#9CA3AF' }}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Filtro estado consultas */}
        {(activeTab === 'recibidas' || activeTab === 'reservas') && viewType !== 'personal' && (
          <div className="relative" ref={consultaFiltroRef}>
            <button
              onClick={() => setShowConsultaFiltroDropdown(v => !v)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors"
              style={{
                border: '1px solid #E5E5E5',
                backgroundColor: consultaFiltro !== 'todas' ? '#F0FDF4' : '#FAFAFA',
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: consultaFiltro !== 'todas' ? '#006B4E' : '#374151',
                cursor: 'pointer',
              }}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" style={{ color: consultaFiltro !== 'todas' ? '#006B4E' : '#737373' }} />
              <span>{consultaFiltro === 'todas' ? 'Filtros' : ESTADO_CONFIG[consultaFiltro as EstadoConsulta]?.label ?? 'Filtros'}</span>
              <ChevronDown className="w-3.5 h-3.5" style={{ color: consultaFiltro !== 'todas' ? '#006B4E' : '#9CA3AF', transform: showConsultaFiltroDropdown ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.15s' }} />
            </button>
            {showConsultaFiltroDropdown && (
              <div className="absolute right-0 mt-1 rounded-xl overflow-hidden z-20" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', minWidth: '150px' }}>
                {([
                  { id: 'todas', label: 'Todas' },
                  { id: 'pendiente', label: 'Pendiente' },
                  { id: 'confirmada', label: 'Confirmada' },
                  { id: 'reprogramada', label: 'Reprogramada' },
                  { id: 'cancelada', label: 'Cancelada' },
                ] as const).map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => { setConsultaFiltro(opt.id); setShowConsultaFiltroDropdown(false); }}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      color: consultaFiltro === opt.id ? '#006B4E' : '#374151',
                      backgroundColor: consultaFiltro === opt.id ? '#F0FDF4' : 'transparent',
                      fontWeight: consultaFiltro === opt.id ? 500 : 400,
                    }}
                    onMouseEnter={e => { if (consultaFiltro !== opt.id) e.currentTarget.style.backgroundColor = '#F9FAFB'; }}
                    onMouseLeave={e => { if (consultaFiltro !== opt.id) e.currentTarget.style.backgroundColor = 'transparent'; }}
                  >
                    {opt.label}
                    {consultaFiltro === opt.id && <Check className="w-3.5 h-3.5" style={{ color: '#006B4E' }} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Filtro leads dropdown — broker */}
        {activeTab === 'leads' && viewType === 'broker' && (
          <div className="relative" ref={leadFiltroRef}>
            <button
              onClick={() => setShowLeadFiltroDropdown(v => !v)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors"
              style={{ border: '1px solid #E5E5E5', backgroundColor: leadFiltro !== 'todos' ? '#F0FDF4' : '#FAFAFA', fontFamily: 'var(--font-body)', fontSize: '13px', color: leadFiltro !== 'todos' ? '#006B4E' : '#374151', cursor: 'pointer' }}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" style={{ color: leadFiltro !== 'todos' ? '#006B4E' : '#737373' }} />
              <span>{leadFiltro === 'todos' ? 'Filtros' : LEAD_ESTADO_CONFIG[leadFiltro as 'nuevo' | 'contactado' | 'cerrado']?.label ?? 'Filtros'}</span>
              <ChevronDown className="w-3.5 h-3.5" style={{ color: leadFiltro !== 'todos' ? '#006B4E' : '#9CA3AF', transform: showLeadFiltroDropdown ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.15s' }} />
            </button>
            {showLeadFiltroDropdown && (
              <div className="absolute right-0 mt-1 rounded-xl overflow-hidden z-20" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', minWidth: '140px' }}>
                {([
                  { id: 'todos', label: 'Todos' },
                  { id: 'nuevo', label: 'Nuevo' },
                  { id: 'contactado', label: 'Contactado' },
                  { id: 'cerrado', label: 'Cerrado' },
                ] as const).map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => { setLeadFiltro(opt.id); setShowLeadFiltroDropdown(false); }}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: leadFiltro === opt.id ? '#006B4E' : '#374151', backgroundColor: leadFiltro === opt.id ? '#F0FDF4' : 'transparent', fontWeight: leadFiltro === opt.id ? 500 : 400 }}
                    onMouseEnter={e => { if (leadFiltro !== opt.id) e.currentTarget.style.backgroundColor = '#F9FAFB'; }}
                    onMouseLeave={e => { if (leadFiltro !== opt.id) e.currentTarget.style.backgroundColor = 'transparent'; }}
                  >
                    {opt.label}
                    {leadFiltro === opt.id && <Check className="w-3.5 h-3.5" style={{ color: '#006B4E' }} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Filtro leads dropdown — inmobiliaria */}
        {activeTab === 'leads' && viewType === 'inmobiliaria' && (
          <div className="relative" ref={leadFiltroRef}>
            <button
              onClick={() => setShowLeadFiltroDropdown(v => !v)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors"
              style={{
                border: '1px solid #E5E5E5',
                backgroundColor: leadFiltro !== 'todos' ? '#F0FDF4' : '#FAFAFA',
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: leadFiltro !== 'todos' ? '#006B4E' : '#374151',
                cursor: 'pointer',
              }}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" style={{ color: leadFiltro !== 'todos' ? '#006B4E' : '#737373' }} />
              <span>
                {leadFiltro === 'todos' ? 'Filtros' : leadFiltro === 'asignados' ? 'Asignados' : 'Sin asignar'}
              </span>
              <ChevronDown className="w-3.5 h-3.5" style={{ color: leadFiltro !== 'todos' ? '#006B4E' : '#9CA3AF', transform: showLeadFiltroDropdown ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.15s' }} />
            </button>
            {showLeadFiltroDropdown && (
              <div className="absolute right-0 mt-1 rounded-xl overflow-hidden z-20" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', minWidth: '140px' }}>
                {([
                  { id: 'todos', label: 'Todos' },
                  { id: 'sin_asignar', label: 'Sin asignar' },
                  { id: 'asignados', label: 'Asignados' },
                ] as const).map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => { setLeadFiltro(opt.id); setShowLeadFiltroDropdown(false); }}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      color: leadFiltro === opt.id ? '#006B4E' : '#374151',
                      backgroundColor: leadFiltro === opt.id ? '#F0FDF4' : 'transparent',
                      fontWeight: leadFiltro === opt.id ? 500 : 400,
                    }}
                    onMouseEnter={e => { if (leadFiltro !== opt.id) e.currentTarget.style.backgroundColor = '#F9FAFB'; }}
                    onMouseLeave={e => { if (leadFiltro !== opt.id) e.currentTarget.style.backgroundColor = 'transparent'; }}
                  >
                    {opt.label}
                    {leadFiltro === opt.id && <Check className="w-3.5 h-3.5" style={{ color: '#006B4E' }} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Notificaciones tab content */}
      {activeTab === 'notificaciones' && (
        <div className="space-y-3">
          {unreadNotifCount > 0 && (
            <div className="flex items-center justify-between">
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B6B6B' }}>
                {unreadNotifCount} sin leer
              </p>
              <button
                onClick={() => setNotificaciones(ns => ns.map(n => ({ ...n, read: true })))}
                className="text-sm font-medium hover:underline"
                style={{ color: '#006B4E', fontFamily: 'var(--font-body)' }}
              >
                Marcar todo como leído
              </button>
            </div>
          )}
          {notificaciones.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#F5F5F5' }}>
                <Bell className="w-8 h-8" style={{ color: '#D1D5DB' }} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h3)', fontWeight: 500, color: '#0A0A0A', marginBottom: '8px' }}>
                Sin notificaciones
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>
                Acá aparecerán las novedades sobre tus consultas y publicaciones.
              </p>
            </div>
          ) : (
            notificaciones.map(notif => (
              <button
                key={notif.id}
                onClick={() => setNotificaciones(ns => ns.map(n => n.id === notif.id ? { ...n, read: true } : n))}
                className="w-full flex items-start gap-4 p-4 rounded-2xl border-2 text-left transition-colors hover:bg-gray-50"
                style={{ borderColor: notif.read ? '#E5E7EB' : '#006B4E', backgroundColor: notif.read ? '#FFFFFF' : '#F0FAF7' }}
              >
                <div className="flex-shrink-0">
                  {notif.type === 'consulta' && (
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#DCFCE7' }}>
                      <MessageCircle className="w-5 h-5" style={{ color: '#006B4E' }} />
                    </div>
                  )}
                  {notif.type === 'visita' && (
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#DBEAFE' }}>
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                  )}
                  {notif.type === 'whatsapp' && (
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#DCFCE7' }}>
                      <MessageCircle className="w-5 h-5" style={{ color: '#25D366' }} />
                    </div>
                  )}
                  {notif.type === 'sistema' && (
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FEF3C7' }}>
                      <Info className="w-5 h-5 text-amber-600" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', fontWeight: notif.read ? 400 : 500, color: notif.read ? '#6B6B6B' : '#0A0A0A', lineHeight: '1.5' }}>
                    {notif.text}
                  </p>
                  <p className="mt-1" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#A3A3A3' }}>
                    {notif.time}
                  </p>
                </div>
                {!notif.read && (
                  <div className="flex-shrink-0 w-2.5 h-2.5 rounded-full mt-1.5" style={{ backgroundColor: '#006B4E' }} />
                )}
              </button>
            ))
          )}
        </div>
      )}

      {/* Leads tab content */}
      {activeTab === 'leads' && (
        <div className="space-y-3">
          {leadsFiltered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#F5F5F5' }}>
                  <Users className="w-8 h-8" style={{ color: '#D1D5DB' }} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h3)', fontWeight: 500, color: '#0A0A0A', marginBottom: '8px' }}>
                  {leadFiltro === 'sin_asignar' ? 'Sin leads pendientes' : leadFiltro === 'asignados' ? 'Sin leads asignados' : 'Sin leads'}
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>
                  {viewType === 'broker' ? 'Los leads que te asignen aparecerán acá.' : 'Los leads captados aparecerán acá.'}
                </p>
              </div>
            ) : leadsFiltered.map(lead => {
              const leadCfg = LEAD_ESTADO_CONFIG[lead.estado];
              return (
                <div key={lead.id} className="rounded-xl p-4 flex items-center gap-4" style={{ border: '1.5px solid #E5E5E5', backgroundColor: '#FFFFFF' }}>
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F3F4F6' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 600, color: '#374151' }}>
                      {lead.nombre.charAt(0)}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#0A0A0A' }}>{lead.nombre}</span>
                      {/* Badge estado — clickeable para broker */}
                      {viewType === 'broker' ? (
                        <div className="relative" style={{ display: 'inline-block' }}>
                          <button
                            onClick={() => setShowLeadStatusDropdown(showLeadStatusDropdown === lead.id ? null : lead.id)}
                            className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                            style={{ backgroundColor: leadCfg.bg, color: leadCfg.text, border: `1px solid ${leadCfg.border}`, fontFamily: 'var(--font-body)' }}
                          >
                            {leadCfg.label}
                            <ChevronDown className="w-3 h-3" style={{ transform: showLeadStatusDropdown === lead.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.15s' }} />
                          </button>
                          {showLeadStatusDropdown === lead.id && (
                            <div className="absolute left-0 mt-1 rounded-xl overflow-hidden z-30" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', minWidth: '130px' }}>
                              {(['nuevo', 'contactado', 'cerrado'] as const).map(estado => {
                                const cfg = LEAD_ESTADO_CONFIG[estado];
                                return (
                                  <button
                                    key={estado}
                                    onClick={() => { handleCambiarEstadoLead(lead.id, estado); setShowLeadStatusDropdown(null); }}
                                    className="w-full flex items-center justify-between px-3 py-2.5 text-left"
                                    style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: lead.estado === estado ? '#006B4E' : '#374151', backgroundColor: lead.estado === estado ? '#F0FDF4' : 'transparent', fontWeight: lead.estado === estado ? 500 : 400 }}
                                    onMouseEnter={e => { if (lead.estado !== estado) e.currentTarget.style.backgroundColor = '#F9FAFB'; }}
                                    onMouseLeave={e => { if (lead.estado !== estado) e.currentTarget.style.backgroundColor = 'transparent'; }}
                                  >
                                    <div className="flex items-center gap-2">
                                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cfg.border }} />
                                      {cfg.label}
                                    </div>
                                    {lead.estado === estado && <Check className="w-3.5 h-3.5" style={{ color: '#006B4E' }} />}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: leadCfg.bg, color: leadCfg.text, border: `1px solid ${leadCfg.border}`, fontFamily: 'var(--font-body)' }}>
                          {leadCfg.label}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                      <span className="flex items-center gap-1" style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#6B7280' }}>
                        <Mail className="w-3 h-3" style={{ color: '#9CA3AF' }} />{lead.email}
                      </span>
                      <span className="flex items-center gap-1" style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#6B7280' }}>
                        <Phone className="w-3 h-3" style={{ color: '#9CA3AF' }} />{lead.telefono}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#737373' }}>{lead.parcela}</span>
                      <span className="flex items-center gap-1" style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF' }}>
                        <Tag className="w-3 h-3" />{lead.origen}
                      </span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF' }}>{formatFecha(lead.fecha)}</span>
                    </div>
                    {lead.brokerAsignado && viewType === 'inmobiliaria' && (
                      <div className="flex items-center gap-1 mt-1">
                        <UserCheck className="w-3 h-3" style={{ color: '#006B4E' }} />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#006B4E', fontWeight: 500 }}>{lead.brokerAsignado}</span>
                      </div>
                    )}
                  </div>

                  {/* Acciones */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {viewType === 'broker' && (
                      <button
                        onClick={() => { setShowContactarModal(lead); if (lead.estado === 'nuevo') handleCambiarEstadoLead(lead.id, 'contactado'); }}
                        className="py-1.5 rounded-full text-xs font-medium transition-colors"
                        style={{ border: '1px solid #006B4E', color: '#006B4E', backgroundColor: 'transparent', fontFamily: 'var(--font-body)', width: '90px', textAlign: 'center' }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#F0FDF4'; }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                      >
                        Contactar
                      </button>
                    )}
                    {viewType === 'inmobiliaria' && (
                      <button
                        onClick={() => { setShowAsignarLeadBroker(lead.id); setLeadBrokerSeleccionado(lead.brokerAsignado || ''); }}
                        className="py-1.5 rounded-full text-xs font-medium transition-colors"
                        style={{ border: '1px solid #006B4E', color: '#006B4E', backgroundColor: 'transparent', fontFamily: 'var(--font-body)', width: '120px', textAlign: 'center' }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#F0FDF4'; }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                      >
                        {lead.brokerAsignado ? 'Reasignar' : 'Asignar broker'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
      )}

      {/* Lista (Recibidas / Enviadas) */}
      {activeTab !== 'notificaciones' && activeTab !== 'leads' && (isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="rounded-xl overflow-hidden animate-pulse" style={{ border: '1.5px solid #E5E5E5', backgroundColor: '#FFFFFF' }}>
              <div className="flex items-center gap-4 p-4">
                <div className="w-14 h-14 rounded-xl flex-shrink-0" style={{ backgroundColor: '#F3F4F6' }} />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 rounded-full" style={{ backgroundColor: '#E5E7EB', width: '60%' }} />
                  <div className="h-3 rounded-full" style={{ backgroundColor: '#F3F4F6', width: '40%' }} />
                </div>
                <div className="h-6 w-20 rounded-full flex-shrink-0" style={{ backgroundColor: '#F3F4F6' }} />
              </div>
            </div>
          ))}
        </div>
      ) : lista.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#F5F5F5' }}>
            <MessageCircle className="w-8 h-8" style={{ color: '#D1D5DB' }} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h3)', fontWeight: 500, color: '#0A0A0A', marginBottom: '8px' }}>
            {activeTab === 'recibidas' ? 'No recibiste consultas aún' : activeTab === 'reservas' ? 'No hay reservas aún' : 'No enviaste consultas aún'}
          </h3>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', maxWidth: '280px', lineHeight: '1.6' }}>
            {activeTab === 'recibidas' ? 'Las consultas de compradores sobre tus parcelas aparecerán acá.' : activeTab === 'reservas' ? 'Los agendamientos confirmados aparecerán acá.' : 'Cuando contactes a un vendedor, el historial aparecerá acá.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {lista.map(c => {
            const statusCfg = ESTADO_CONFIG[c.estado];
            const isExpanded = expandedId === c.id;
            const canAct = canManage(c);
            const showContactInfo = (viewType === 'inmobiliaria' || viewType === 'broker') && activeTab === 'recibidas';
            return (
              <div key={c.id} className="rounded-xl" style={{ border: '1.5px solid #E5E5E5', backgroundColor: '#FFFFFF', overflow: 'visible' }}>
                {/* Row */}
                <div
                  onClick={() => { setExpandedId(isExpanded ? null : c.id); setShowStatusDropdown(null); }}
                  className="w-full flex items-center gap-4 p-4 transition-colors"
                  style={{ backgroundColor: isExpanded ? '#F9FAFB' : 'transparent', cursor: 'pointer' }}
                  onMouseEnter={e => { if (!isExpanded) (e.currentTarget as HTMLDivElement).style.backgroundColor = '#F9FAFB'; }}
                  onMouseLeave={e => { if (!isExpanded) (e.currentTarget as HTMLDivElement).style.backgroundColor = 'transparent'; }}
                >
                  {/* Imagen parcela */}
                  <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                    <img src={c.parcela.imagen} alt={c.parcela.nombre} className="w-full h-full object-cover" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <TipoIcon tipo={c.tipo} />
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#0A0A0A' }}>
                        {c.parcela.nombre}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#737373' }}>
                        <TipoLabel tipo={c.tipo} /> · {activeTab === 'recibidas' ? 'de' : 'a'} {c.otroUsuario.nombre}
                      </span>
                      {formatFecha(c.fecha, c.hora) && (
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF' }}>
                          {formatFecha(c.fecha, c.hora)}
                        </span>
                      )}
                    </div>
                    {showContactInfo && (
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        {c.otroUsuario.email && (
                          <span className="flex items-center gap-1" style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#6B7280' }}>
                            <Mail className="w-3 h-3" style={{ color: '#9CA3AF' }} />
                            {c.otroUsuario.email}
                          </span>
                        )}
                        {c.otroUsuario.telefono && (
                          <span className="flex items-center gap-1" style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#6B7280' }}>
                            <Phone className="w-3 h-3" style={{ color: '#9CA3AF' }} />
                            {c.otroUsuario.telefono}
                          </span>
                        )}
                        {c.origen && (
                          <span className="flex items-center gap-1" style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#6B7280' }}>
                            <Tag className="w-3 h-3" style={{ color: '#9CA3AF' }} />
                            {c.origen}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Badge con selector de estado + chevron expand */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="relative" onClick={e => e.stopPropagation()}>
                      <button
                        onClick={() => setShowStatusDropdown(showStatusDropdown === c.id ? null : c.id)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors"
                        style={{ backgroundColor: statusCfg.bg, color: statusCfg.text, border: `1px solid ${statusCfg.border}`, fontFamily: 'var(--font-body)' }}
                        onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(0.95)'; }}
                        onMouseLeave={e => { e.currentTarget.style.filter = 'none'; }}
                      >
                        {statusCfg.label}
                        <ChevronDown className="w-3 h-3 flex-shrink-0" style={{ transform: showStatusDropdown === c.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.15s' }} />
                      </button>
                      {showStatusDropdown === c.id && (
                        <div className="absolute right-0 mt-1 rounded-xl overflow-hidden z-30" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', minWidth: '160px' }}>
                          {(Object.entries(ESTADO_CONFIG) as [EstadoConsulta, typeof ESTADO_CONFIG[EstadoConsulta]][]).map(([estado, cfg]) => (
                            <button
                              key={estado}
                              onClick={() => { handleCambiarEstado(c.id, estado); setShowStatusDropdown(null); }}
                              className="w-full flex items-center justify-between px-4 py-2.5 text-left"
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '13px',
                                color: c.estado === estado ? '#006B4E' : '#374151',
                                backgroundColor: c.estado === estado ? '#F0FDF4' : 'transparent',
                                fontWeight: c.estado === estado ? 500 : 400,
                              }}
                              onMouseEnter={e => { if (c.estado !== estado) e.currentTarget.style.backgroundColor = '#F9FAFB'; }}
                              onMouseLeave={e => { if (c.estado !== estado) e.currentTarget.style.backgroundColor = 'transparent'; }}
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: cfg.border }} />
                                {cfg.label}
                              </div>
                              {c.estado === estado && <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#006B4E' }} />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <div onClick={e => { e.stopPropagation(); setExpandedId(isExpanded ? null : c.id); setShowStatusDropdown(null); }} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      {isExpanded
                        ? <Minus className="w-4 h-4" style={{ color: '#9CA3AF' }} />
                        : <Plus className="w-4 h-4" style={{ color: '#9CA3AF' }} />}
                    </div>
                  </div>
                </div>

                {/* Detalle expandido */}
                {isExpanded && (
                  <div className="px-4 pb-4 space-y-4 border-t" style={{ borderColor: '#F0F0F0' }}>
                    <div className="pt-3 grid grid-cols-2 gap-4">
                      <div>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF', marginBottom: '2px' }}>Parcela</p>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A', fontWeight: 500 }}>{c.parcela.nombre}</p>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#737373' }}>{c.parcela.ubicacion}</p>
                      </div>
                      {(c.fecha || c.hora) && (
                        <div>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF', marginBottom: '2px' }}>
                            {c.tipo === 'whatsapp' ? 'Fecha de contacto' : 'Fecha y hora'}
                          </p>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A', fontWeight: 500 }}>
                            {formatFecha(c.fecha, c.hora)}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Datos de contacto del lead — solo para inmobiliaria/broker */}
                    {(viewType === 'inmobiliaria' || viewType === 'broker') && activeTab === 'recibidas' && (
                      <div className="grid grid-cols-2 gap-3">
                        {c.otroUsuario.email && (
                          <div className="p-3 rounded-xl" style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E5E5' }}>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF', marginBottom: '2px' }}>Correo</p>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#374151', fontWeight: 500 }}>{c.otroUsuario.email}</p>
                          </div>
                        )}
                        {c.otroUsuario.telefono && (
                          <div className="p-3 rounded-xl" style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E5E5' }}>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF', marginBottom: '2px' }}>Teléfono</p>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#374151', fontWeight: 500 }}>{c.otroUsuario.telefono}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Broker asignado — solo para inmobiliaria */}
                    {viewType === 'inmobiliaria' && activeTab === 'recibidas' && (
                      <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: c.brokerAsignado ? '#F0FDF4' : '#FAFAFA', border: `1px solid ${c.brokerAsignado ? '#BBF7D0' : '#E5E5E5'}` }}>
                        <div>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: c.brokerAsignado ? '#15803D' : '#9CA3AF', marginBottom: '2px' }}>Broker asignado</p>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: c.brokerAsignado ? '#166534' : '#737373', fontWeight: c.brokerAsignado ? 500 : 400 }}>
                            {c.brokerAsignado ?? 'Sin asignar'}
                          </p>
                        </div>
                        <button
                          onClick={() => { setShowAsignarBroker(c.id); setBrokerSeleccionado(c.brokerAsignado ?? ''); }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                          style={{ backgroundColor: c.brokerAsignado ? '#DCFCE7' : '#0A0A0A', color: c.brokerAsignado ? '#166534' : '#FFFFFF', fontFamily: 'var(--font-body)' }}
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                          {c.brokerAsignado ? 'Reasignar' : 'Asignar broker'}
                        </button>
                      </div>
                    )}

                    {c.notas && (
                      <div className="px-3 py-2.5 rounded-xl" style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E5E5' }}>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF', marginBottom: '2px' }}>Notas</p>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#374151', lineHeight: '1.5' }}>{c.notas}</p>
                      </div>
                    )}

                    {c.estado === 'cancelada' && c.motivo && (
                      <div className="px-3 py-2.5 rounded-xl" style={{ backgroundColor: '#FFF1F1', border: '1px solid #FCA5A5' }}>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#991B1B', marginBottom: '2px' }}>Motivo de cancelación</p>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#991B1B', lineHeight: '1.5' }}>{c.motivo}</p>
                      </div>
                    )}

                    {/* Campos específicos de formulario */}
                    {c.tipo === 'formulario' && (
                      <div className="space-y-3">
                        {(c.tipoInteres || c.cuandoVisitar) && (
                          <div className="grid grid-cols-2 gap-3">
                            {c.tipoInteres && (
                              <div className="p-3 rounded-xl border" style={{ backgroundColor: '#FAFAFA', borderColor: '#E5E5E5' }}>
                                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF', marginBottom: '3px' }}>Tipo de interés</p>
                                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#0A0A0A' }}>{c.tipoInteres}</p>
                              </div>
                            )}
                            {c.cuandoVisitar && (
                              <div className="p-3 rounded-xl border" style={{ backgroundColor: '#FAFAFA', borderColor: '#E5E5E5' }}>
                                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF', marginBottom: '3px' }}>Disponible para visitar</p>
                                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#0A0A0A' }}>{formatFecha(c.cuandoVisitar)}</p>
                              </div>
                            )}
                          </div>
                        )}
                        {c.mensaje && (
                          <div className="px-3 py-2.5 rounded-xl" style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E5E5' }}>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF', marginBottom: '2px' }}>Mensaje</p>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#374151', lineHeight: '1.5' }}>{c.mensaje}</p>
                          </div>
                        )}
                        {c.respuesta && (
                          <div className="px-3 py-2.5 rounded-xl border-l-4" style={{ backgroundColor: '#F0FDF4', borderLeftColor: '#006B4E' }}>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#006B4E', fontWeight: 600, marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Tu respuesta</p>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#166534', lineHeight: '1.5' }}>{c.respuesta}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Reply textarea para formulario */}
                    {c.tipo === 'formulario' && replyOpenId === c.id && !c.respuesta && (
                      <div className="rounded-xl border p-3 space-y-2" style={{ borderColor: '#006B4E', backgroundColor: '#F0FDF4' }}>
                        <textarea
                          rows={3}
                          value={replyTexts[c.id] ?? ''}
                          onChange={e => setReplyTexts(prev => ({ ...prev, [c.id]: e.target.value }))}
                          placeholder="Escribí tu respuesta..."
                          autoFocus
                          style={{ width: '100%', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A', backgroundColor: '#FFFFFF', border: '1px solid #BBF7D0', borderRadius: '8px', padding: '8px 12px', resize: 'none', lineHeight: '1.5', outline: 'none' }}
                        />
                        <div className="flex gap-2 justify-end">
                          <button onClick={() => setReplyOpenId(null)} className="px-3 py-1.5 rounded-full text-xs" style={{ fontFamily: 'var(--font-body)', color: '#525252', backgroundColor: '#FFFFFF', border: '1px solid #D1D5DB' }}>Cancelar</button>
                          <button
                            onClick={() => handleSendReply(c.id)}
                            disabled={!(replyTexts[c.id]?.trim())}
                            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs transition-all"
                            style={{ fontFamily: 'var(--font-body)', fontWeight: 500, backgroundColor: replyTexts[c.id]?.trim() ? '#006B4E' : '#D1D5DB', color: '#FFFFFF', cursor: replyTexts[c.id]?.trim() ? 'pointer' : 'not-allowed' }}
                          >
                            <Send className="w-3 h-3" />Enviar
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Botones del vendedor — visita/videollamada */}
                    {canAct && (
                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => setShowReprogramar(c.id)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all"
                          style={{ backgroundColor: '#DBEAFE', color: '#1E40AF', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)' }}
                          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#BFDBFE'}
                          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#DBEAFE'}
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          Reprogramar
                        </button>
                        <button
                          onClick={() => setShowCancelar(c.id)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all"
                          style={{ backgroundColor: '#FEE2E2', color: '#991B1B', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)' }}
                          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FECACA'}
                          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FEE2E2'}
                        >
                          <X className="w-3.5 h-3.5" />
                          Cancelar visita
                        </button>
                      </div>
                    )}

                    {/* Botones del vendedor — formulario */}
                    {canManageFormulario(c) && !replyOpenId && !c.respuesta && (
                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => setReplyOpenId(c.id)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all"
                          style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)' }}
                          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#333333'}
                          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0A0A0A'}
                        >
                          <Reply className="w-3.5 h-3.5" />
                          Responder
                        </button>
                        {c.estado === 'pendiente' && (
                          <button
                            onClick={() => handleMarcarRecibido(c.id)}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border-2 transition-all"
                            style={{ borderColor: '#E5E5E5', color: '#0A0A0A', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', backgroundColor: '#FFFFFF' }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = '#0A0A0A'; e.currentTarget.style.backgroundColor = '#F9FAFB'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E5E5'; e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
                            title="Ya la vi, la voy a contactar por email o WhatsApp"
                          >
                            <Check className="w-3.5 h-3.5" />
                            Recibido
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}

      {/* Modal Reprogramar */}
      {showReprogramar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4 space-y-4" style={{ border: '1px solid #E5E5E5' }}>
            <div className="flex items-center justify-between">
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h4)', fontWeight: 500, color: '#0A0A0A' }}>Reprogramar visita</h3>
              <button onClick={() => setShowReprogramar(null)} className="p-1 rounded-lg hover:bg-gray-100">
                <X className="w-4 h-4" style={{ color: '#6B7280' }} />
              </button>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#6B7280', lineHeight: '1.5' }}>
              Elige la nueva fecha y hora. El comprador recibirá una notificación automáticamente.
            </p>
            <div className="space-y-3">
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                  Nueva fecha <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <input type="date" value={repFecha} onChange={e => setRepFecha(e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm"
                  style={{ border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA', outline: 'none', fontFamily: 'var(--font-body)', color: '#0A0A0A' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                  Nueva hora <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <select value={repHora} onChange={e => setRepHora(e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm"
                  style={{ border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA', outline: 'none', fontFamily: 'var(--font-body)', color: '#0A0A0A' }}>
                  <option value="">Seleccionar hora</option>
                  {['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00'].map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3 pt-1">
              <button onClick={() => setShowReprogramar(null)} className="px-4 py-2.5 rounded-full text-sm font-medium transition-all"
                style={{ backgroundColor: '#F5F5F5', color: '#374151', fontFamily: 'var(--font-body)' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#E5E5E5'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#F5F5F5'}>
                Cancelar
              </button>
              <button onClick={() => handleReprogramar(showReprogramar)} disabled={!repFecha || !repHora}
                className="flex-1 py-2.5 rounded-full text-sm font-medium transition-all"
                style={{ backgroundColor: repFecha && repHora ? '#006B4E' : '#E5E5E5', color: repFecha && repHora ? '#FFFFFF' : '#9CA3AF', fontFamily: 'var(--font-body)', cursor: repFecha && repHora ? 'pointer' : 'not-allowed' }}
                onMouseEnter={e => { if (repFecha && repHora) e.currentTarget.style.backgroundColor = '#01533E'; }}
                onMouseLeave={e => { if (repFecha && repHora) e.currentTarget.style.backgroundColor = '#006B4E'; }}>
                Confirmar reprogramación
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Asignar Broker */}
      {showAsignarBroker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4 space-y-4" style={{ border: '1px solid #E5E5E5' }}>
            <div className="flex items-center justify-between">
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h4)', fontWeight: 500, color: '#0A0A0A' }}>Asignar broker</h3>
              <button onClick={() => setShowAsignarBroker(null)} className="p-1 rounded-lg hover:bg-gray-100">
                <X className="w-4 h-4" style={{ color: '#6B7280' }} />
              </button>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#6B7280', lineHeight: '1.5' }}>
              Elegí el broker que se encargará de esta consulta. Recibirá una notificación con los datos del contacto.
            </p>
            <div className="space-y-2">
              {BROKERS_MOCK.map(b => (
                <button
                  key={b.id}
                  onClick={() => b.disponible && setBrokerSeleccionado(b.nombre)}
                  disabled={!b.disponible}
                  className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all"
                  style={{
                    border: `1.5px solid ${brokerSeleccionado === b.nombre ? '#006B4E' : '#E5E5E5'}`,
                    backgroundColor: brokerSeleccionado === b.nombre ? '#F0FDF4' : b.disponible ? '#FFFFFF' : '#F9FAFB',
                    opacity: b.disponible ? 1 : 0.5,
                    cursor: b.disponible ? 'pointer' : 'not-allowed',
                  }}
                >
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: brokerSeleccionado === b.nombre ? '#DCFCE7' : '#F3F4F6' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: brokerSeleccionado === b.nombre ? '#166534' : '#6B7280' }}>
                      {b.nombre.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#0A0A0A' }}>{b.nombre}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: b.disponible ? '#737373' : '#D1D5DB' }}>
                      {b.rol} · {b.disponible ? 'Disponible' : 'No disponible'}
                    </p>
                  </div>
                  {brokerSeleccionado === b.nombre && (
                    <Check className="w-4 h-4 flex-shrink-0" style={{ color: '#006B4E' }} />
                  )}
                </button>
              ))}
            </div>
            <div className="flex gap-3 pt-1">
              <button onClick={() => setShowAsignarBroker(null)} className="px-4 py-2.5 rounded-full text-sm font-medium"
                style={{ backgroundColor: '#F5F5F5', color: '#374151', fontFamily: 'var(--font-body)' }}>
                Cancelar
              </button>
              <button
                onClick={() => handleAsignarBroker(showAsignarBroker)}
                disabled={!brokerSeleccionado}
                className="flex-1 py-2.5 rounded-full text-sm font-medium transition-all"
                style={{ backgroundColor: brokerSeleccionado ? '#006B4E' : '#E5E5E5', color: brokerSeleccionado ? '#FFFFFF' : '#9CA3AF', fontFamily: 'var(--font-body)', cursor: brokerSeleccionado ? 'pointer' : 'not-allowed' }}>
                Confirmar asignación
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Contactar lead */}
      {showContactarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={e => { if (e.target === e.currentTarget) setShowContactarModal(null); }}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm space-y-5" style={{ border: '1px solid #E5E5E5' }}>
            <div className="flex items-center justify-between">
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h4)', fontWeight: 500, color: '#0A0A0A' }}>Contactar lead</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#737373', marginTop: '2px' }}>{showContactarModal.nombre}</p>
              </div>
              <button onClick={() => setShowContactarModal(null)} className="p-1 rounded-lg hover:bg-gray-100">
                <X className="w-4 h-4" style={{ color: '#6B7280' }} />
              </button>
            </div>

            <div className="space-y-3">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${showContactarModal.telefono.replace(/\D/g, '')}?text=Hola%20${encodeURIComponent(showContactarModal.nombre)}%2C%20te%20contacto%20por%20tu%20inter%C3%A9s%20en%20${encodeURIComponent(showContactarModal.parcela)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl transition-colors"
                style={{ backgroundColor: '#F0FDF4', border: '1.5px solid #BBF7D0', textDecoration: 'none' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#DCFCE7'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#F0FDF4'; }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#25D366' }}>
                  <svg viewBox="0 0 24 24" fill="white" style={{ width: '20px', height: '20px' }}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#166534' }}>WhatsApp</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#4B7C5B' }}>{showContactarModal.telefono}</p>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${showContactarModal.email}?subject=${encodeURIComponent(`Consulta sobre ${showContactarModal.parcela}`)}&body=${encodeURIComponent(`Hola ${showContactarModal.nombre},\n\nMe pongo en contacto contigo por tu interés en ${showContactarModal.parcela}.\n\nQuedo a tu disposición.`)}`}
                className="flex items-center gap-4 p-4 rounded-2xl transition-colors"
                style={{ backgroundColor: '#EFF6FF', border: '1.5px solid #BFDBFE', textDecoration: 'none' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#DBEAFE'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#EFF6FF'; }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#3B82F6' }}>
                  <Mail className="w-5 h-5" style={{ color: '#FFFFFF' }} />
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#1E40AF' }}>Correo electrónico</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#3B5EA6' }}>{showContactarModal.email}</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Modal Asignar Broker a Lead */}
      {showAsignarLeadBroker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4 space-y-4" style={{ border: '1px solid #E5E5E5' }}>
            <div className="flex items-center justify-between">
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h4)', fontWeight: 500, color: '#0A0A0A' }}>Asignar broker al lead</h3>
              <button onClick={() => { setShowAsignarLeadBroker(null); setLeadBrokerSeleccionado(''); }} className="p-1 rounded-lg hover:bg-gray-100">
                <X className="w-4 h-4" style={{ color: '#6B7280' }} />
              </button>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#6B7280', lineHeight: '1.5' }}>
              Elegí el broker que se encargará de este lead. Recibirá una notificación con los datos de contacto.
            </p>
            <div className="space-y-2">
              {BROKERS_MOCK.map(b => (
                <button
                  key={b.id}
                  onClick={() => b.disponible && setLeadBrokerSeleccionado(b.nombre)}
                  disabled={!b.disponible}
                  className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all"
                  style={{
                    border: `1.5px solid ${leadBrokerSeleccionado === b.nombre ? '#006B4E' : '#E5E5E5'}`,
                    backgroundColor: leadBrokerSeleccionado === b.nombre ? '#F0FDF4' : b.disponible ? '#FFFFFF' : '#F9FAFB',
                    opacity: b.disponible ? 1 : 0.5,
                    cursor: b.disponible ? 'pointer' : 'not-allowed',
                  }}
                >
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: leadBrokerSeleccionado === b.nombre ? '#DCFCE7' : '#F3F4F6' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: leadBrokerSeleccionado === b.nombre ? '#166534' : '#6B7280' }}>
                      {b.nombre.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#0A0A0A' }}>{b.nombre}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: b.disponible ? '#737373' : '#D1D5DB' }}>
                      {b.rol} · {b.disponible ? 'Disponible' : 'No disponible'}
                    </p>
                  </div>
                  {leadBrokerSeleccionado === b.nombre && (
                    <Check className="w-4 h-4 flex-shrink-0" style={{ color: '#006B4E' }} />
                  )}
                </button>
              ))}
            </div>
            <div className="flex gap-3 pt-1">
              <button onClick={() => { setShowAsignarLeadBroker(null); setLeadBrokerSeleccionado(''); }} className="px-4 py-2.5 rounded-full text-sm font-medium"
                style={{ backgroundColor: '#F5F5F5', color: '#374151', fontFamily: 'var(--font-body)' }}>
                Cancelar
              </button>
              <button
                onClick={() => handleAsignarLeadBroker(showAsignarLeadBroker)}
                disabled={!leadBrokerSeleccionado}
                className="flex-1 py-2.5 rounded-full text-sm font-medium transition-all"
                style={{ backgroundColor: leadBrokerSeleccionado ? '#006B4E' : '#E5E5E5', color: leadBrokerSeleccionado ? '#FFFFFF' : '#9CA3AF', fontFamily: 'var(--font-body)', cursor: leadBrokerSeleccionado ? 'pointer' : 'not-allowed' }}>
                Confirmar asignación
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Cancelar */}
      {showCancelar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4 space-y-4" style={{ border: '1px solid #E5E5E5' }}>
            <div className="flex items-center justify-between">
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h4)', fontWeight: 500, color: '#0A0A0A' }}>¿Cancelar esta visita?</h3>
              <button onClick={() => setShowCancelar(null)} className="p-1 rounded-lg hover:bg-gray-100">
                <X className="w-4 h-4" style={{ color: '#6B7280' }} />
              </button>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#6B7280', lineHeight: '1.5' }}>
              El comprador recibirá una notificación. Esta acción no se puede deshacer.
            </p>
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                Motivo <span style={{ color: '#9CA3AF', fontWeight: 400 }}>(opcional)</span>
              </label>
              <textarea value={cancelMotivo} onChange={e => setCancelMotivo(e.target.value)} rows={3}
                placeholder="Ej: No puedo atenderte en esa fecha, necesito reorganizar mis compromisos..."
                className="w-full px-4 py-2.5 rounded-xl text-sm resize-none"
                style={{ border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA', outline: 'none', fontFamily: 'var(--font-body)', color: '#0A0A0A', lineHeight: '1.5' }} />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowCancelar(null)} className="flex-1 px-4 py-2.5 rounded-full text-sm font-medium transition-all"
                style={{ backgroundColor: '#F5F5F5', color: '#374151', fontFamily: 'var(--font-body)' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#E5E5E5'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#F5F5F5'}>
                No cancelar
              </button>
              <button onClick={() => handleCancelar(showCancelar)}
                className="flex-1 py-2.5 rounded-full text-sm font-medium transition-all"
                style={{ backgroundColor: '#DC2626', color: '#FFFFFF', fontFamily: 'var(--font-body)' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#B91C1C'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#DC2626'}>
                Cancelar visita
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// Export legacy interface for backward compatibility
export type { ConsultasViewProps };
