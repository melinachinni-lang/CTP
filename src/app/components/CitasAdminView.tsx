import React, { useState } from 'react';
import { Calendar, Video, MapPin, CheckCircle, X, Clock, User, Mail, Phone, MessageSquare, Search, AlertCircle, Eye, Link, XCircle } from 'lucide-react';

interface SolicitudCita {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  parcela: string;
  ubicacion: string;
  tipoCita: 'presencial' | 'videollamada';
  fecha: string;
  horario: string;
  mensaje?: string;
  estado: 'pendiente' | 'confirmada' | 'rechazada';
  fechaCreacion: string;
  motivoRechazo?: string;
  linkMeet?: string;
}

const SOLICITUDES_MOCK: SolicitudCita[] = [
  {
    id: 1,
    nombre: 'Valentina Rojas',
    email: 'valentina.rojas@gmail.com',
    telefono: '+56 9 8765 4321',
    parcela: 'Parcela 12 — Valle Hermoso',
    ubicacion: 'Lago Ranco, Los Ríos',
    tipoCita: 'presencial',
    fecha: 'Jue 15 de May, 2025',
    horario: '10:00',
    mensaje: 'Me gustaría conocer el acceso al río y el deslinde con el vecino del norte.',
    estado: 'pendiente',
    fechaCreacion: 'Hace 2 horas',
  },
  {
    id: 2,
    nombre: 'Andrés Molina',
    email: 'andres.molina@outlook.com',
    telefono: '+56 9 7654 3210',
    parcela: 'Parcela 7 — Patagonia Norte',
    ubicacion: 'Coyhaique, Aysén',
    tipoCita: 'videollamada',
    fecha: 'Vie 16 de May, 2025',
    horario: '14:00',
    estado: 'pendiente',
    fechaCreacion: 'Hace 5 horas',
  },
  {
    id: 3,
    nombre: 'María Paz Contreras',
    email: 'mpaz.contreras@gmail.com',
    telefono: '+56 9 4321 0987',
    parcela: 'Parcela 5 — Colina Verde',
    ubicacion: 'Mulchén, Biobío',
    tipoCita: 'presencial',
    fecha: 'Mié 21 de May, 2025',
    horario: '15:00',
    mensaje: 'Venimos con mi familia, somos 4 personas.',
    estado: 'pendiente',
    fechaCreacion: 'Hace 3 horas',
  },
  {
    id: 4,
    nombre: 'Camila Fuentes',
    email: 'camila.fuentes@gmail.com',
    telefono: '+56 9 6543 2109',
    parcela: 'Parcela 3 — Los Arrayanes',
    ubicacion: 'Villarrica, Araucanía',
    tipoCita: 'videollamada',
    fecha: 'Lun 19 de May, 2025',
    horario: '11:00',
    mensaje: '¿Tienen opciones de financiamiento disponibles?',
    estado: 'confirmada',
    fechaCreacion: 'Hace 1 día',
    linkMeet: 'https://meet.google.com/abc-defg-hij',
  },
  {
    id: 5,
    nombre: 'Roberto Soto',
    email: 'roberto.soto@empresa.cl',
    telefono: '+56 9 5432 1098',
    parcela: 'Parcela 18 — Río Claro',
    ubicacion: 'Pucón, Araucanía',
    tipoCita: 'presencial',
    fecha: 'Mar 20 de May, 2025',
    horario: '09:00',
    estado: 'rechazada',
    fechaCreacion: 'Hace 2 días',
    motivoRechazo: 'No contamos con disponibilidad para esa fecha. Te invitamos a reagendar.',
  },
];

function BadgeEstado({ estado }: { estado: SolicitudCita['estado'] }) {
  const config = {
    pendiente: { label: 'Pendiente', bg: '#FEF3C7', color: '#92400E', dot: '#F59E0B' },
    confirmada: { label: 'Confirmada', bg: '#D1FAE5', color: '#065F46', dot: '#10B981' },
    rechazada: { label: 'Rechazada', bg: '#FEE2E2', color: '#991B1B', dot: '#EF4444' },
  }[estado];
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: config.bg, color: config.color }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: config.dot }} />
      {config.label}
    </span>
  );
}

function BadgeTipo({ tipo }: { tipo: SolicitudCita['tipoCita'] }) {
  return tipo === 'videollamada' ? (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#EEF2FF', color: '#3730A3' }}>
      <Video className="w-3 h-3" /> Videollamada
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#F0FDF4', color: '#166534' }}>
      <MapPin className="w-3 h-3" /> Presencial
    </span>
  );
}

function EmailPreviewModal({ solicitud, tipo, onClose }: { solicitud: SolicitudCita; tipo: 'confirmacion-presencial' | 'confirmacion-videollamada' | 'rechazo'; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }} onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#E5E5E5' }}>
          <div>
            <p className="text-xs font-medium mb-0.5" style={{ color: '#737373' }}>Vista previa del correo enviado a</p>
            <p className="text-sm font-medium" style={{ color: '#0A0A0A' }}>{solicitud.email}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors"><X className="w-4 h-4" style={{ color: '#737373' }} /></button>
        </div>

        {/* Email body */}
        <div className="p-6">
          {/* Email header */}
          <div className="rounded-xl p-6 mb-4 text-center" style={{ backgroundColor: tipo === 'rechazo' ? '#FEF2F2' : '#EBFEF5' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: tipo === 'rechazo' ? '#FEE2E2' : '#D1FAE5' }}>
              {tipo === 'rechazo' ? <XCircle className="w-6 h-6" style={{ color: '#DC2626' }} /> : <CheckCircle className="w-6 h-6" style={{ color: '#10B981' }} />}
            </div>
            <p className="font-semibold text-base mb-1" style={{ color: tipo === 'rechazo' ? '#991B1B' : '#065F46', fontFamily: 'var(--font-heading)' }}>
              {tipo === 'rechazo' ? 'Tu solicitud no pudo ser confirmada' : tipo === 'confirmacion-videollamada' ? '¡Tu videollamada está confirmada!' : '¡Tu visita está confirmada!'}
            </p>
            <p className="text-sm" style={{ color: tipo === 'rechazo' ? '#B91C1C' : '#047857' }}>
              {tipo === 'rechazo' ? 'Lamentamos los inconvenientes' : 'Compra Tu Parcela'}
            </p>
          </div>

          {/* Greeting */}
          <p className="text-sm mb-4" style={{ color: '#374151', lineHeight: '1.6' }}>
            Hola <strong>{solicitud.nombre}</strong>,{' '}
            {tipo === 'rechazo'
              ? 'lamentamos informarte que no pudimos confirmar tu solicitud de cita para la siguiente propiedad.'
              : tipo === 'confirmacion-videollamada'
              ? 'tu videollamada con nuestro equipo ha sido confirmada. Aquí tienes todos los detalles.'
              : 'tu visita presencial ha sido confirmada exitosamente. ¡Te esperamos!'}
          </p>

          {/* Details box */}
          <div className="rounded-xl p-4 mb-4 space-y-3" style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E5E5' }}>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#6B7280' }} />
              <div>
                <p className="text-xs mb-0.5" style={{ color: '#9CA3AF' }}>Propiedad</p>
                <p className="text-sm font-medium" style={{ color: '#111827' }}>{solicitud.parcela}</p>
                <p className="text-xs" style={{ color: '#6B7280' }}>{solicitud.ubicacion}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#6B7280' }} />
              <div>
                <p className="text-xs mb-0.5" style={{ color: '#9CA3AF' }}>Fecha y hora</p>
                <p className="text-sm font-medium" style={{ color: '#111827' }}>{solicitud.fecha} — {solicitud.horario} hrs</p>
              </div>
            </div>
            {tipo === 'confirmacion-videollamada' && solicitud.linkMeet && (
              <div className="flex items-start gap-3">
                <Video className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#6B7280' }} />
                <div className="flex-1">
                  <p className="text-xs mb-1" style={{ color: '#9CA3AF' }}>Enlace de Google Meet</p>
                  <a href={solicitud.linkMeet} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: '#006B4E', color: '#FFFFFF', textDecoration: 'none' }}>
                    <Video className="w-4 h-4" /> Unirse a la reunión
                  </a>
                  <p className="text-xs mt-1" style={{ color: '#9CA3AF' }}>{solicitud.linkMeet}</p>
                </div>
              </div>
            )}
            {tipo === 'rechazo' && solicitud.motivoRechazo && (
              <div className="flex items-start gap-3">
                <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#6B7280' }} />
                <div>
                  <p className="text-xs mb-0.5" style={{ color: '#9CA3AF' }}>Motivo</p>
                  <p className="text-sm" style={{ color: '#374151' }}>{solicitud.motivoRechazo}</p>
                </div>
              </div>
            )}
          </div>

          {tipo === 'rechazo' ? (
            <div className="rounded-xl p-4 text-center" style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}>
              <p className="text-sm" style={{ color: '#1D4ED8' }}>¿Quieres reagendar? Visita la ficha de la parcela y envía una nueva solicitud.</p>
            </div>
          ) : (
            <div className="rounded-xl p-4" style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}>
              <p className="text-sm" style={{ color: '#166534' }}>
                {tipo === 'confirmacion-videollamada'
                  ? 'Asegúrate de tener Google Meet instalado. El link estará disponible 10 minutos antes de la reunión.'
                  : 'Si tienes alguna duda o necesitas reagendar, contáctanos a contacto@compratuparcela.cl'}
              </p>
            </div>
          )}

          <p className="text-center text-xs mt-6" style={{ color: '#9CA3AF' }}>
            Compra Tu Parcela · contacto@compratuparcela.cl<br />Este correo fue enviado automáticamente, por favor no respondas a este mensaje.
          </p>
        </div>
      </div>
    </div>
  );
}

export function CitasAdminView() {
  const [solicitudes, setSolicitudes] = useState<SolicitudCita[]>(SOLICITUDES_MOCK);
  const [filtroEstado, setFiltroEstado] = useState<'todas' | 'pendiente' | 'confirmada' | 'rechazada'>('todas');
  const [busqueda, setBusqueda] = useState('');
  const [modalConfirmar, setModalConfirmar] = useState<SolicitudCita | null>(null);
  const [modalRechazar, setModalRechazar] = useState<SolicitudCita | null>(null);
  const [motivoRechazo, setMotivoRechazo] = useState('');
  const [emailPreview, setEmailPreview] = useState<{ solicitud: SolicitudCita; tipo: 'confirmacion-presencial' | 'confirmacion-videollamada' | 'rechazo' } | null>(null);

  const solicitudesFiltradas = solicitudes.filter(s => {
    const matchEstado = filtroEstado === 'todas' || s.estado === filtroEstado;
    const matchBusqueda = busqueda === '' ||
      s.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      s.email.toLowerCase().includes(busqueda.toLowerCase()) ||
      s.parcela.toLowerCase().includes(busqueda.toLowerCase());
    return matchEstado && matchBusqueda;
  });

  const stats = {
    total: solicitudes.length,
    pendientes: solicitudes.filter(s => s.estado === 'pendiente').length,
    confirmadas: solicitudes.filter(s => s.estado === 'confirmada').length,
    rechazadas: solicitudes.filter(s => s.estado === 'rechazada').length,
  };

  const handleConfirmar = (id: number) => {
    setSolicitudes(prev => prev.map(s =>
      s.id === id ? {
        ...s,
        estado: 'confirmada' as const,
        linkMeet: s.tipoCita === 'videollamada'
          ? `https://meet.google.com/ctp-${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 3)}`
          : undefined,
      } : s
    ));
    setModalConfirmar(null);
  };

  const handleRechazar = (id: number) => {
    setSolicitudes(prev => prev.map(s =>
      s.id === id ? { ...s, estado: 'rechazada' as const, motivoRechazo: motivoRechazo.trim() || undefined } : s
    ));
    setModalRechazar(null);
    setMotivoRechazo('');
  };

  const cardStyle = { backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' };

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total solicitudes', value: stats.total, color: '#0A0A0A', bg: '#F9FAFB' },
          { label: 'Pendientes', value: stats.pendientes, color: '#92400E', bg: '#FEF3C7' },
          { label: 'Confirmadas', value: stats.confirmadas, color: '#065F46', bg: '#D1FAE5' },
          { label: 'Rechazadas', value: stats.rechazadas, color: '#991B1B', bg: '#FEE2E2' },
        ].map(stat => (
          <div key={stat.label} className="rounded-2xl p-5" style={cardStyle}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', marginBottom: '8px' }}>{stat.label}</p>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stat.color }} />
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 600, color: stat.color, lineHeight: 1 }}>{stat.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Table section */}
      <section className="rounded-2xl" style={cardStyle}>
        {/* Toolbar */}
        <div className="flex items-center gap-3 px-6 py-4 border-b" style={{ borderColor: '#E5E5E5' }}>
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9CA3AF' }} />
            <input
              type="text"
              placeholder="Buscar por nombre, email o parcela..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg text-sm"
              style={{ border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA', color: '#0A0A0A', outline: 'none', fontFamily: 'var(--font-body)' }}
            />
          </div>
          <div className="flex items-center gap-1 ml-auto">
            {(['todas', 'pendiente', 'confirmada', 'rechazada'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFiltroEstado(f)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize"
                style={{
                  backgroundColor: filtroEstado === f ? '#0A0A0A' : '#F5F5F5',
                  color: filtroEstado === f ? '#FFFFFF' : '#525252',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {f === 'todas' ? 'Todas' : f.charAt(0).toUpperCase() + f.slice(1) + 's'}
                {f !== 'todas' && (
                  <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-xs" style={{ backgroundColor: filtroEstado === f ? 'rgba(255,255,255,0.2)' : '#E5E5E5', color: filtroEstado === f ? '#FFFFFF' : '#737373' }}>
                    {solicitudes.filter(s => s.estado === f).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        {solicitudesFiltradas.length === 0 ? (
          <div className="py-16 text-center">
            <Calendar className="w-10 h-10 mx-auto mb-3" style={{ color: '#D1D5DB' }} />
            <p style={{ fontFamily: 'var(--font-body)', color: '#9CA3AF', fontSize: 'var(--font-size-body-sm)' }}>No hay solicitudes que coincidan</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                {['Usuario', 'Parcela', 'Tipo', 'Fecha y hora', 'Estado', 'Acciones'].map(h => (
                  <th key={h} className="px-6 py-3 text-left" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {solicitudesFiltradas.map((s, i) => (
                <tr key={s.id} style={{ borderBottom: i < solicitudesFiltradas.length - 1 ? '1px solid #F9FAFB' : 'none' }}>
                  {/* Usuario */}
                  <td className="px-6 py-4">
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#111827', marginBottom: '2px' }}>{s.nombre}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#6B7280' }}>{s.email}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF' }}>{s.telefono}</p>
                  </td>
                  {/* Parcela */}
                  <td className="px-6 py-4">
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#111827', marginBottom: '2px' }}>{s.parcela}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#6B7280' }}>{s.ubicacion}</p>
                    {s.mensaje && (
                      <p className="mt-1 italic" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF' }}>"{s.mensaje.length > 50 ? s.mensaje.substring(0, 50) + '...' : s.mensaje}"</p>
                    )}
                  </td>
                  {/* Tipo */}
                  <td className="px-6 py-4"><BadgeTipo tipo={s.tipoCita} /></td>
                  {/* Fecha */}
                  <td className="px-6 py-4">
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#111827', marginBottom: '2px' }}>{s.fecha}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#6B7280' }}>{s.horario} hrs</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF' }}>{s.fechaCreacion}</p>
                  </td>
                  {/* Estado */}
                  <td className="px-6 py-4">
                    <BadgeEstado estado={s.estado} />
                    {s.estado === 'confirmada' && s.tipoCita === 'videollamada' && s.linkMeet && (
                      <a href={s.linkMeet} target="_blank" rel="noreferrer" className="flex items-center gap-1 mt-1.5 text-xs" style={{ color: '#4F46E5', textDecoration: 'none' }}>
                        <Link className="w-3 h-3" /> Meet
                      </a>
                    )}
                    {s.estado === 'rechazada' && s.motivoRechazo && (
                      <p className="mt-1 text-xs italic" style={{ color: '#9CA3AF', maxWidth: '120px' }}>"{s.motivoRechazo.substring(0, 40)}..."</p>
                    )}
                  </td>
                  {/* Acciones */}
                  <td className="px-6 py-4">
                    {s.estado === 'pendiente' ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setModalConfirmar(s)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                          style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)' }}
                          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#01533E'}
                          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#006B4E'}
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> Confirmar
                        </button>
                        <button
                          onClick={() => setModalRechazar(s)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                          style={{ backgroundColor: '#FEE2E2', color: '#DC2626', fontFamily: 'var(--font-body)' }}
                          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FCA5A5'}
                          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FEE2E2'}
                        >
                          <X className="w-3.5 h-3.5" /> Rechazar
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setEmailPreview({ solicitud: s, tipo: s.estado === 'rechazada' ? 'rechazo' : s.tipoCita === 'videollamada' ? 'confirmacion-videollamada' : 'confirmacion-presencial' })}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                        style={{ backgroundColor: '#F5F5F5', color: '#525252', fontFamily: 'var(--font-body)' }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#E5E5E5'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#F5F5F5'}
                      >
                        <Eye className="w-3.5 h-3.5" /> Ver correo
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Modal confirmar */}
      {modalConfirmar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={() => setModalConfirmar(null)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#D1FAE5' }}>
                  <CheckCircle className="w-5 h-5" style={{ color: '#059669' }} />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: 'var(--font-size-h3)', color: '#0A0A0A', marginBottom: '4px' }}>Confirmar solicitud</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>
                    Se enviará un correo de confirmación a <strong>{modalConfirmar.email}</strong>
                  </p>
                </div>
              </div>

              <div className="rounded-xl p-4 mb-6 space-y-3" style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E5E5' }}>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" style={{ color: '#6B7280' }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#374151' }}>{modalConfirmar.nombre}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" style={{ color: '#6B7280' }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#374151' }}>{modalConfirmar.fecha} — {modalConfirmar.horario} hrs</span>
                </div>
                <div className="flex items-center gap-2">
                  {modalConfirmar.tipoCita === 'videollamada' ? <Video className="w-4 h-4" style={{ color: '#6B7280' }} /> : <MapPin className="w-4 h-4" style={{ color: '#6B7280' }} />}
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#374151' }}>
                    {modalConfirmar.tipoCita === 'videollamada' ? 'Videollamada — se generará un link de Google Meet' : 'Visita presencial — ' + modalConfirmar.ubicacion}
                  </span>
                </div>
              </div>

              {modalConfirmar.tipoCita === 'videollamada' && (
                <div className="rounded-xl p-4 mb-6 flex items-start gap-3" style={{ backgroundColor: '#EEF2FF', border: '1px solid #C7D2FE' }}>
                  <Video className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#4F46E5' }} />
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#3730A3' }}>
                    Se generará automáticamente un link de Google Meet y se incluirá en el correo de confirmación.
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={() => setModalConfirmar(null)} className="flex-1 py-2.5 rounded-full text-sm font-medium transition-all" style={{ backgroundColor: '#F5F5F5', color: '#374151', fontFamily: 'var(--font-body)' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#E5E5E5'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#F5F5F5'}>
                  Cancelar
                </button>
                <button onClick={() => handleConfirmar(modalConfirmar.id)} className="flex-1 py-2.5 rounded-full text-sm font-medium transition-all" style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#01533E'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#006B4E'}>
                  Confirmar y enviar correo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal rechazar */}
      {modalRechazar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={() => { setModalRechazar(null); setMotivoRechazo(''); }}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FEE2E2' }}>
                  <AlertCircle className="w-5 h-5" style={{ color: '#DC2626' }} />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: 'var(--font-size-h3)', color: '#0A0A0A', marginBottom: '4px' }}>Rechazar solicitud</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>
                    Se notificará a <strong>{modalRechazar.email}</strong> sobre el rechazo.
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                  Motivo del rechazo <span style={{ color: '#9CA3AF', fontWeight: 400 }}>(opcional)</span>
                </label>
                <textarea
                  value={motivoRechazo}
                  onChange={e => setMotivoRechazo(e.target.value)}
                  placeholder="Ej: No tenemos disponibilidad para esa fecha. Te invitamos a reagendar..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl text-sm resize-none"
                  style={{ border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA', color: '#0A0A0A', outline: 'none', fontFamily: 'var(--font-body)', lineHeight: '1.5' }}
                />
              </div>

              <div className="flex gap-3">
                <button onClick={() => { setModalRechazar(null); setMotivoRechazo(''); }} className="flex-1 py-2.5 rounded-full text-sm font-medium transition-all" style={{ backgroundColor: '#F5F5F5', color: '#374151', fontFamily: 'var(--font-body)' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#E5E5E5'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#F5F5F5'}>
                  Cancelar
                </button>
                <button onClick={() => handleRechazar(modalRechazar.id)} className="flex-1 py-2.5 rounded-full text-sm font-medium transition-all" style={{ backgroundColor: '#DC2626', color: '#FFFFFF', fontFamily: 'var(--font-body)' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#B91C1C'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#DC2626'}>
                  Rechazar y notificar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Email preview */}
      {emailPreview && (
        <EmailPreviewModal
          solicitud={emailPreview.solicitud}
          tipo={emailPreview.tipo}
          onClose={() => setEmailPreview(null)}
        />
      )}
    </div>
  );
}
