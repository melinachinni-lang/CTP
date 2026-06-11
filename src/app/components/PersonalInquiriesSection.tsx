import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, X, Clock, MapPin, ChevronRight, CheckCircle, Circle, User, Send, Reply, Tag, Calendar, Video, ExternalLink } from 'lucide-react';

type InquiryTipo = 'formulario' | 'visita' | 'videollamada';

interface Inquiry {
  id: number;
  tipo: InquiryTipo;
  nombre: string;
  email: string;
  telefono: string;
  parcela: {
    nombre: string;
    ubicacion: string;
  };
  mensaje?: string;
  fecha: Date;
  estado: 'nueva' | 'contactada' | 'cerrada';
  leida: boolean;
  // formulario
  tipoInteres?: string;
  cuandoVisitar?: string;
  respuesta?: { texto: string; fecha: Date };
  // visita / videollamada
  fechaCita?: string;
  horaCita?: string;
  linkVideollamada?: string;
}

const tiposInteresLabels: Record<string, string> = {
  'inversion': 'Inversión',
  'uso-propio': 'Uso propio / vivir ahí',
  'segunda-vivienda': 'Segunda vivienda / descanso',
  'otro': 'Otro',
};

const tipoConfig: Record<InquiryTipo, { label: string; icon: React.ReactNode; color: string; bg: string }> = {
  formulario: {
    label: 'Consulta por formulario',
    icon: <MessageCircle className="w-3.5 h-3.5" />,
    color: '#006B4E',
    bg: '#EBFEF5',
  },
  visita: {
    label: 'Visita agendada',
    icon: <Calendar className="w-3.5 h-3.5" />,
    color: '#1D4ED8',
    bg: '#EFF6FF',
  },
  videollamada: {
    label: 'Videollamada agendada',
    icon: <Video className="w-3.5 h-3.5" />,
    color: '#7C3AED',
    bg: '#F5F3FF',
  },
};

const mockInquiries: Inquiry[] = [
  {
    id: 1,
    tipo: 'formulario',
    nombre: 'Andrés Muñoz',
    email: 'andres.munoz@email.com',
    telefono: '+56 9 8765 4321',
    parcela: { nombre: 'Mi Parcela en Paine', ubicacion: 'Paine, Región Metropolitana' },
    mensaje: 'Hola! Me encantó tu parcela. ¿Todavía está disponible? Me gustaría visitarla este fin de semana si es posible.',
    fecha: new Date(2025, 0, 27, 14, 30),
    estado: 'nueva',
    leida: false,
    tipoInteres: 'uso-propio',
    cuandoVisitar: '2025-02-01',
  },
  {
    id: 2,
    tipo: 'visita',
    nombre: 'Patricia Silva',
    email: 'paty.silva@email.com',
    telefono: '+56 9 7654 3210',
    parcela: { nombre: 'Mi Parcela en Paine', ubicacion: 'Paine, Región Metropolitana' },
    mensaje: 'Quedé muy interesada después de ver las fotos. Confirmo la visita para el viernes.',
    fecha: new Date(2025, 0, 27, 10, 15),
    estado: 'nueva',
    leida: false,
    fechaCita: '2025-01-31',
    horaCita: '10:00',
  },
  {
    id: 3,
    tipo: 'videollamada',
    nombre: 'Roberto Lagos',
    email: 'roberto.lagos@email.com',
    telefono: '+56 9 6543 2109',
    parcela: { nombre: 'Mi Parcela en Paine', ubicacion: 'Paine, Región Metropolitana' },
    mensaje: 'Me gustaría hacer una videollamada para ver la parcela antes de viajar. Quedo disponible el horario elegido.',
    fecha: new Date(2025, 0, 26, 16, 45),
    estado: 'contactada',
    leida: true,
    fechaCita: '2025-02-03',
    horaCita: '15:30',
    linkVideollamada: 'https://meet.google.com/abc-defg-hij',
    respuesta: {
      texto: '¡Hola Roberto! Confirmado para el lunes 3 a las 15:30. Te envié el link de Google Meet.',
      fecha: new Date(2025, 0, 26, 18, 0),
    },
  },
  {
    id: 4,
    tipo: 'formulario',
    nombre: 'Carolina Vargas',
    email: 'caro.vargas@email.com',
    telefono: '+56 9 5432 1098',
    parcela: { nombre: 'Mi Parcela en Paine', ubicacion: 'Paine, Región Metropolitana' },
    mensaje: 'Hola! Fui a ver la parcela ayer y me gustó mucho. ¿Hay alguna posibilidad de negociar el precio?',
    fecha: new Date(2025, 0, 25, 11, 20),
    estado: 'contactada',
    leida: true,
    tipoInteres: 'uso-propio',
  },
  {
    id: 5,
    tipo: 'visita',
    nombre: 'Felipe Contreras',
    email: 'felipe.c@email.com',
    telefono: '+56 9 4321 0987',
    parcela: { nombre: 'Mi Parcela en Paine', ubicacion: 'Paine, Región Metropolitana' },
    fecha: new Date(2025, 0, 22, 9, 30),
    estado: 'cerrada',
    leida: true,
    fechaCita: '2025-01-24',
    horaCita: '09:00',
  },
];

export function PersonalInquiriesSection() {
  const [selectedFilter, setSelectedFilter] = useState<'todas' | 'nueva' | 'contactada' | 'cerrada'>('todas');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>(mockInquiries);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replySent, setReplySent] = useState(false);

  const filteredInquiries = selectedFilter === 'todas'
    ? inquiries
    : inquiries.filter(inq => inq.estado === selectedFilter);

  const markAsRead = (id: number) => {
    setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, leida: true } : inq));
  };

  const changeStatus = (id: number, newStatus: 'nueva' | 'contactada' | 'cerrada') => {
    setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, estado: newStatus, leida: true } : inq));
  };

  const saveReply = (id: number, texto: string) => {
    const now = new Date();
    setInquiries(prev => prev.map(inq =>
      inq.id === id ? { ...inq, estado: 'contactada', leida: true, respuesta: { texto, fecha: now } } : inq
    ));
    if (selectedInquiry?.id === id) {
      setSelectedInquiry(prev => prev
        ? { ...prev, estado: 'contactada', leida: true, respuesta: { texto, fecha: now } }
        : prev
      );
    }
  };

  const openInquiry = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setShowReplyBox(false);
    setReplyText('');
    setReplySent(false);
    if (!inquiry.leida) markAsRead(inquiry.id);
  };

  const handleSendReply = () => {
    if (!selectedInquiry || !replyText.trim()) return;
    saveReply(selectedInquiry.id, replyText.trim());
    setReplyText('');
    setShowReplyBox(false);
    setReplySent(true);
  };

  const handleRecibido = () => {
    if (!selectedInquiry) return;
    changeStatus(selectedInquiry.id, 'contactada');
    setSelectedInquiry(prev => prev ? { ...prev, estado: 'contactada', leida: true } : prev);
  };

  const handleCloseModal = () => {
    setSelectedInquiry(null);
    setShowReplyBox(false);
    setReplyText('');
    setReplySent(false);
  };

  const formatRelativeDate = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInHours < 1) {
      return `Hace ${Math.floor(diffInMs / (1000 * 60))} minutos`;
    } else if (diffInHours < 24) {
      return `Hace ${diffInHours} horas`;
    } else if (diffInDays === 1) {
      return 'Hace 1 día';
    } else if (diffInDays < 7) {
      return `Hace ${diffInDays} días`;
    } else {
      return date.toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric' });
    }
  };

  const formatDateLong = (dateStr: string, hora?: string) => {
    const [year, month, day] = dateStr.split('-');
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const base = `${parseInt(day)} de ${months[parseInt(month) - 1]} de ${year}`;
    return hora ? `${base} · ${hora} hs` : base;
  };

  const getStatusBadge = (estado: 'nueva' | 'contactada' | 'cerrada') => {
    switch (estado) {
      case 'nueva':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ backgroundColor: '#EBFEF5', color: '#006B4E', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)' }}>
            <Circle className="w-2 h-2 fill-current" />Nueva
          </span>
        );
      case 'contactada':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ backgroundColor: '#F0FDF4', color: '#15803D', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)' }}>
            <CheckCircle className="w-3 h-3" />Recibida
          </span>
        );
      case 'cerrada':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ backgroundColor: '#F5F5F5', color: '#737373', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)' }}>
            <X className="w-3 h-3" />Cerrada
          </span>
        );
    }
  };

  const getTipoBadge = (tipo: InquiryTipo) => {
    const cfg = tipoConfig[tipo];
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ backgroundColor: cfg.bg, color: cfg.color, fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)' }}>
        {cfg.icon}
        {cfg.label}
      </span>
    );
  };

  const getCounts = () => ({
    todas: inquiries.length,
    nueva: inquiries.filter(i => i.estado === 'nueva').length,
    contactada: inquiries.filter(i => i.estado === 'contactada').length,
    cerrada: inquiries.filter(i => i.estado === 'cerrada').length,
  });

  const counts = getCounts();
  const isRecibido = selectedInquiry && selectedInquiry.estado !== 'nueva';

  return (
    <main className="px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-h1)', color: '#0A0A0A', marginBottom: '0.5rem' }}>
          Consultas
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', color: '#737373' }}>
          Visitas, videollamadas y formularios recibidos sobre tu parcela
        </p>
      </div>

      {/* Filtros de estado */}
      <div className="flex gap-3 mb-6 pb-6" style={{ borderBottom: '1px solid #E5E5E5' }}>
        {(['todas', 'nueva', 'contactada', 'cerrada'] as const).map(f => {
          const labels: Record<string, string> = {
            todas: `Todas (${counts.todas})`,
            nueva: `Nuevas (${counts.nueva})`,
            contactada: `Recibidas (${counts.contactada})`,
            cerrada: `Cerradas (${counts.cerrada})`,
          };
          return (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className="px-4 py-2 rounded-full transition-all"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                fontWeight: 'var(--font-weight-medium)',
                backgroundColor: selectedFilter === f ? '#0A0A0A' : '#F5F5F5',
                color: selectedFilter === f ? '#FFFFFF' : '#525252',
              }}
            >
              {labels[f]}
            </button>
          );
        })}
      </div>

      {/* Lista */}
      <div className="space-y-3">
        {filteredInquiries.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-200">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="mb-2" style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-h4)', color: '#0A0A0A' }}>
              {selectedFilter === 'todas' ? 'Aún no tienes consultas' : 'No hay consultas en este estado'}
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>
              {selectedFilter === 'todas'
                ? 'Cuando alguien agende una visita, videollamada o complete un formulario, aparecerá aquí'
                : 'No hay consultas en este estado por el momento'}
            </p>
          </div>
        ) : (
          filteredInquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              onClick={() => openInquiry(inquiry)}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:border-gray-400 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start gap-4">
                {/* Punto no leído */}
                <div className="flex-shrink-0 pt-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: !inquiry.leida ? '#006B4E' : 'transparent' }} />
                </div>

                <div className="flex-1 min-w-0">
                  {/* Tipo badge + estado + fecha */}
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      {getTipoBadge(inquiry.tipo)}
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {getStatusBadge(inquiry.estado)}
                      <div className="flex items-center gap-1 text-gray-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)' }}>
                          {formatRelativeDate(inquiry.fecha)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Nombre + ubicación */}
                  <div className="flex items-center gap-2 mb-1">
                    <User className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <span style={{ fontFamily: 'var(--font-body)', fontWeight: inquiry.leida ? 'var(--font-weight-medium)' : 'var(--font-weight-semibold)', fontSize: 'var(--font-size-body-base)', color: '#0A0A0A' }}>
                      {inquiry.nombre}
                    </span>
                    {inquiry.tipo === 'formulario' && inquiry.tipoInteres && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ backgroundColor: '#F5F5F5', color: '#525252', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)' }}>
                        <Tag className="w-3 h-3" />
                        {tiposInteresLabels[inquiry.tipoInteres] ?? inquiry.tipoInteres}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>
                      {inquiry.parcela.ubicacion}
                    </span>
                  </div>

                  {/* Fecha de cita (visita / videollamada) */}
                  {(inquiry.tipo === 'visita' || inquiry.tipo === 'videollamada') && inquiry.fechaCita && (
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-3"
                      style={{
                        backgroundColor: tipoConfig[inquiry.tipo].bg,
                        color: tipoConfig[inquiry.tipo].color,
                      }}
                    >
                      {inquiry.tipo === 'visita' ? <Calendar className="w-3.5 h-3.5" /> : <Video className="w-3.5 h-3.5" />}
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                        {formatDateLong(inquiry.fechaCita, inquiry.horaCita)}
                      </span>
                    </div>
                  )}

                  {/* Preview mensaje (solo si existe) */}
                  {inquiry.mensaje && (
                    <p className="line-clamp-1 mb-2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#525252', lineHeight: '1.6' }}>
                      {inquiry.mensaje}
                    </p>
                  )}

                  {/* Contacto */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <Mail className="w-3.5 h-3.5" />
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)' }}>{inquiry.email}</span>
                    </div>
                    {inquiry.telefono && (
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <Phone className="w-3.5 h-3.5" />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)' }}>{inquiry.telefono}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-shrink-0 pt-1">
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ─── Modal de detalle ─── */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]" onClick={handleCloseModal}>
          <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
              <div>
                <div className="mb-1">{getTipoBadge(selectedInquiry.tipo)}</div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>
                  {selectedInquiry.parcela.nombre}
                </p>
              </div>
              <button onClick={handleCloseModal} className="hover:bg-gray-100 p-2 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Contenido scrollable */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">

              {/* Estado y fecha de recepción */}
              <div className="flex items-center justify-between">
                {getStatusBadge(selectedInquiry.estado)}
                <div className="flex items-center gap-1.5 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)' }}>
                    {formatRelativeDate(selectedInquiry.fecha)}
                  </span>
                </div>
              </div>

              {/* Fecha/hora de la cita — visita o videollamada */}
              {(selectedInquiry.tipo === 'visita' || selectedInquiry.tipo === 'videollamada') && selectedInquiry.fechaCita && (
                <div
                  className="p-4 rounded-xl flex items-center gap-4"
                  style={{
                    backgroundColor: tipoConfig[selectedInquiry.tipo].bg,
                    border: `1.5px solid ${tipoConfig[selectedInquiry.tipo].color}22`,
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: tipoConfig[selectedInquiry.tipo].color }}
                  >
                    {selectedInquiry.tipo === 'visita'
                      ? <Calendar className="w-6 h-6 text-white" />
                      : <Video className="w-6 h-6 text-white" />}
                  </div>
                  <div className="flex-1">
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: tipoConfig[selectedInquiry.tipo].color, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>
                      {selectedInquiry.tipo === 'visita' ? 'Fecha de visita' : 'Fecha de videollamada'}
                    </p>
                    <p style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-body-base)', color: '#0A0A0A' }}>
                      {formatDateLong(selectedInquiry.fechaCita, selectedInquiry.horaCita)}
                    </p>
                  </div>
                  {selectedInquiry.tipo === 'videollamada' && selectedInquiry.linkVideollamada && (
                    <a
                      href={selectedInquiry.linkVideollamada}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full transition-colors"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-medium)',
                        backgroundColor: tipoConfig.videollamada.color,
                        color: '#FFFFFF',
                        textDecoration: 'none',
                      }}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Unirse
                    </a>
                  )}
                </div>
              )}

              {/* Persona interesada */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <h4 className="mb-4" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 'var(--font-weight-semibold)' }}>
                  Persona interesada
                </h4>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-body-base)', color: '#0A0A0A' }}>
                      {selectedInquiry.nombre}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <a href={`mailto:${selectedInquiry.email}`} onClick={e => e.stopPropagation()} style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#006B4E', textDecoration: 'underline' }}>
                      {selectedInquiry.email}
                    </a>
                  </div>
                  {selectedInquiry.telefono && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <a href={`https://wa.me/${selectedInquiry.telefono.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#006B4E', textDecoration: 'underline' }}>
                        {selectedInquiry.telefono}
                        <span style={{ color: '#737373', marginLeft: '6px', textDecoration: 'none', fontSize: 'var(--font-size-xs)' }}>(WhatsApp)</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Info adicional — solo formulario */}
              {selectedInquiry.tipo === 'formulario' && (selectedInquiry.tipoInteres || selectedInquiry.cuandoVisitar) && (
                <div className="grid grid-cols-2 gap-3">
                  {selectedInquiry.tipoInteres && (
                    <div className="p-4 rounded-xl border" style={{ backgroundColor: '#FAFAFA', borderColor: '#E5E5E5' }}>
                      <div className="flex items-center gap-1.5 mb-1">
                        <Tag className="w-3.5 h-3.5 text-gray-400" />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#737373', fontWeight: 'var(--font-weight-semibold)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tipo de interés</span>
                      </div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', color: '#0A0A0A' }}>
                        {tiposInteresLabels[selectedInquiry.tipoInteres] ?? selectedInquiry.tipoInteres}
                      </p>
                    </div>
                  )}
                  {selectedInquiry.cuandoVisitar && (
                    <div className="p-4 rounded-xl border" style={{ backgroundColor: '#FAFAFA', borderColor: '#E5E5E5' }}>
                      <div className="flex items-center gap-1.5 mb-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#737373', fontWeight: 'var(--font-weight-semibold)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Disponible para visitar</span>
                      </div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', color: '#0A0A0A' }}>
                        {formatDateLong(selectedInquiry.cuandoVisitar)}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Mensaje */}
              {selectedInquiry.mensaje && (
                <div>
                  <h4 className="mb-3" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 'var(--font-weight-semibold)' }}>
                    Mensaje
                  </h4>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', color: '#0A0A0A', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
                    {selectedInquiry.mensaje}
                  </p>
                </div>
              )}

              {/* Respuesta enviada */}
              {selectedInquiry.respuesta && (
                <div className="p-4 rounded-xl border-l-4" style={{ backgroundColor: '#F0FDF4', borderLeftColor: '#006B4E' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Reply className="w-4 h-4" style={{ color: '#006B4E' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#006B4E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tu respuesta</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#737373' }}>· {formatRelativeDate(selectedInquiry.respuesta.fecha)}</span>
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#166534', lineHeight: '1.6' }}>
                    {selectedInquiry.respuesta.texto}
                  </p>
                </div>
              )}

              {/* Textarea de respuesta */}
              {showReplyBox && !selectedInquiry.respuesta && (
                <div className="rounded-xl border p-4 space-y-3" style={{ borderColor: '#006B4E', backgroundColor: '#F0FDF4' }}>
                  <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', color: '#166534', marginBottom: '6px' }}>
                    Tu respuesta para {selectedInquiry.nombre.split(' ')[0]}
                  </label>
                  <textarea
                    rows={4}
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    placeholder="Escribí tu respuesta..."
                    autoFocus
                    style={{ width: '100%', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A', backgroundColor: '#FFFFFF', border: '1px solid #BBF7D0', borderRadius: '10px', padding: '10px 14px', resize: 'none', lineHeight: '1.6', outline: 'none' }}
                  />
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => { setShowReplyBox(false); setReplyText(''); }} className="px-4 py-2 rounded-full" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#525252', backgroundColor: '#FFFFFF', border: '1px solid #D1D5DB' }}>
                      Cancelar
                    </button>
                    <button onClick={handleSendReply} disabled={!replyText.trim()} className="flex items-center gap-2 px-5 py-2 rounded-full transition-all" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', backgroundColor: replyText.trim() ? '#006B4E' : '#D1D5DB', color: '#FFFFFF', cursor: replyText.trim() ? 'pointer' : 'not-allowed' }}>
                      <Send className="w-3.5 h-3.5" />Enviar
                    </button>
                  </div>
                </div>
              )}

              {/* Confirmación reply enviado */}
              {replySent && (
                <div className="flex items-center gap-3 p-4 rounded-xl" style={{ backgroundColor: '#DCFCE7', border: '1px solid #BBF7D0' }}>
                  <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#006B4E' }} />
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#166534' }}>
                    Tu respuesta fue enviada a {selectedInquiry.nombre.split(' ')[0]}.
                  </p>
                </div>
              )}

            </div>

            {/* Footer: Responder + Recibido */}
            <div className="px-6 py-5 border-t" style={{ borderColor: '#E5E5E5', backgroundColor: '#FAFAFA' }}>
              {!showReplyBox && (
                <div className="flex gap-3">
                  {!selectedInquiry.respuesta ? (
                    <button
                      onClick={() => setShowReplyBox(true)}
                      className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full transition-all"
                      style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', fontWeight: 'var(--font-weight-semibold)', backgroundColor: '#0A0A0A', color: '#FFFFFF' }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#333333')}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#0A0A0A')}
                    >
                      <Reply className="w-4 h-4" />Responder
                    </button>
                  ) : (
                    <div className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', fontWeight: 'var(--font-weight-medium)', backgroundColor: '#F5F5F5', color: '#A3A3A3' }}>
                      <CheckCircle className="w-4 h-4" />Respondida
                    </div>
                  )}

                  {!isRecibido ? (
                    <button
                      onClick={handleRecibido}
                      title="Marcar como recibida: ya la vi, voy a contactarlo por WhatsApp o email"
                      className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full border-2 transition-all"
                      style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', fontWeight: 'var(--font-weight-medium)', borderColor: '#E5E5E5', color: '#0A0A0A', backgroundColor: '#FFFFFF' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#0A0A0A'; e.currentTarget.style.backgroundColor = '#F9FAFB'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E5E5'; e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
                    >
                      <CheckCircle className="w-4 h-4" />Recibido
                    </button>
                  ) : (
                    <div className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full border-2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', fontWeight: 'var(--font-weight-medium)', borderColor: '#D1FAE5', color: '#006B4E', backgroundColor: '#F0FDF4' }}>
                      <CheckCircle className="w-4 h-4" />Recibido ✓
                    </div>
                  )}
                </div>
              )}

              <p className="mt-3 text-center" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#A3A3A3', lineHeight: '1.5' }}>
                {!isRecibido
                  ? '"Recibido" indica que ya viste la consulta y vas a contactar al interesado por tu cuenta.'
                  : 'También podés contactar por email o WhatsApp directamente desde los links de contacto arriba.'}
              </p>
            </div>

          </div>
        </div>
      )}
    </main>
  );
}
