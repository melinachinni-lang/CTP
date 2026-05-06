import React, { useState } from 'react';
import { Calendar, MessageCircle, Phone, Video, X, Check, Clock, RefreshCw, AlertCircle, ChevronDown, ChevronUp, Bell, Info } from 'lucide-react';

interface ConsultasViewProps {
  viewType?: 'personal' | 'broker' | 'inmobiliaria';
  onFeedback?: (msg: string) => void;
  defaultTab?: 'recibidas' | 'enviadas' | 'notificaciones';
}

type EstadoConsulta = 'pendiente' | 'confirmada' | 'reprogramada' | 'cancelada' | 'expirada';
type TipoContacto = 'visita' | 'videollamada' | 'whatsapp';

interface Consulta {
  id: string;
  tipo: TipoContacto;
  parcela: { id: number; nombre: string; ubicacion: string; imagen: string; };
  otroUsuario: { nombre: string; avatar?: string; };
  fecha?: string;
  hora?: string;
  estado: EstadoConsulta;
  notas?: string;
  motivo?: string; // razón de cancelación
}

const RECIBIDAS: Consulta[] = [
  {
    id: 'r1',
    tipo: 'visita',
    parcela: { id: 1, nombre: 'Parcela Vista Cordillera', ubicacion: 'Lo Barnechea, R. Metropolitana', imagen: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400' },
    otroUsuario: { nombre: 'Carlos Muñoz' },
    fecha: '2026-05-10',
    hora: '10:00',
    estado: 'pendiente',
    notas: 'Interesado en ver el acceso al predio y el sistema de agua',
  },
  {
    id: 'r2',
    tipo: 'videollamada',
    parcela: { id: 1, nombre: 'Parcela Vista Cordillera', ubicacion: 'Lo Barnechea, R. Metropolitana', imagen: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400' },
    otroUsuario: { nombre: 'María González' },
    fecha: '2026-05-07',
    hora: '15:30',
    estado: 'confirmada',
  },
  {
    id: 'r3',
    tipo: 'whatsapp',
    parcela: { id: 1, nombre: 'Parcela Vista Cordillera', ubicacion: 'Lo Barnechea, R. Metropolitana', imagen: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400' },
    otroUsuario: { nombre: 'Sofía Ramírez' },
    fecha: '2026-05-03',
    estado: 'confirmada',
    notas: 'Consulta sobre disponibilidad y precio',
  },
  {
    id: 'r4',
    tipo: 'visita',
    parcela: { id: 1, nombre: 'Parcela Vista Cordillera', ubicacion: 'Lo Barnechea, R. Metropolitana', imagen: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400' },
    otroUsuario: { nombre: 'Pedro Flores' },
    fecha: '2026-04-20',
    hora: '11:00',
    estado: 'cancelada',
    motivo: 'No pude coordinar el transporte para ese día',
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
  const labels = { visita: 'Visita presencial', videollamada: 'Videollamada', whatsapp: 'WhatsApp' };
  return <span>{labels[tipo]}</span>;
}

const NOTIFICACIONES_MOCK = [
  { id: 'n1', type: 'consulta' as const, text: 'Pedro Soto envió una consulta sobre "Parcela Vista Cordillera"', time: 'Hace 5 min', read: false },
  { id: 'n2', type: 'visita' as const, text: 'Visita confirmada para el 15 de mayo a las 10:00 hrs', time: 'Hace 1 hora', read: false },
  { id: 'n3', type: 'sistema' as const, text: 'Tu publicación "Parcela Vista Cordillera" fue vista 50 veces', time: 'Hace 3 horas', read: false },
  { id: 'n4', type: 'consulta' as const, text: 'Ana Torres respondió a tu consulta sobre "Parcela Lago Ranco"', time: 'Ayer', read: true },
  { id: 'n5', type: 'sistema' as const, text: 'Recuerda completar tu perfil para más visibilidad', time: 'Hace 2 días', read: true },
];

export function ConsultasView({ viewType = 'personal', onFeedback, defaultTab = 'recibidas' }: ConsultasViewProps) {
  const [activeTab, setActiveTab] = useState<'recibidas' | 'enviadas' | 'notificaciones'>(defaultTab);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [consultas, setConsultas] = useState<{ recibidas: Consulta[]; enviadas: Consulta[] }>({ recibidas: RECIBIDAS, enviadas: ENVIADAS });
  const [notificaciones, setNotificaciones] = useState(NOTIFICACIONES_MOCK);
  const [showReprogramar, setShowReprogramar] = useState<string | null>(null);
  const [showCancelar, setShowCancelar] = useState<string | null>(null);
  const [repFecha, setRepFecha] = useState('');
  const [repHora, setRepHora] = useState('');
  const [cancelMotivo, setCancelMotivo] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    if (onFeedback) onFeedback(msg);
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleReprogramar = (id: string) => {
    if (!repFecha || !repHora) return;
    setConsultas(prev => ({
      ...prev,
      recibidas: prev.recibidas.map(c => c.id === id ? { ...c, estado: 'reprogramada' as EstadoConsulta, fecha: repFecha, hora: repHora } : c),
    }));
    setShowReprogramar(null);
    setRepFecha('');
    setRepHora('');
    showFeedback('Visita reprogramada. Se notificó al comprador.');
  };

  const handleCancelar = (id: string) => {
    setConsultas(prev => ({
      ...prev,
      recibidas: prev.recibidas.map(c => c.id === id ? { ...c, estado: 'cancelada' as EstadoConsulta, motivo: cancelMotivo } : c),
    }));
    setShowCancelar(null);
    setCancelMotivo('');
    showFeedback('Visita cancelada. Se notificó al comprador.');
  };

  const lista = activeTab === 'recibidas' ? consultas.recibidas : activeTab === 'enviadas' ? consultas.enviadas : [];
  const canManage = (c: Consulta) => activeTab === 'recibidas' && (c.estado === 'pendiente' || c.estado === 'confirmada') && c.tipo !== 'whatsapp';
  const unreadNotifCount = notificaciones.filter(n => !n.read).length;

  return (
    <main className="px-6 py-6 space-y-6">
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

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl" style={{ backgroundColor: '#F3F4F6', width: 'fit-content' }}>
        {[
          { id: 'recibidas', label: 'Recibidas', count: consultas.recibidas.length },
          { id: 'enviadas', label: 'Enviadas', count: consultas.enviadas.length },
          { id: 'notificaciones', label: 'Notificaciones', count: unreadNotifCount },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id as 'recibidas' | 'enviadas' | 'notificaciones'); setExpandedId(null); }}
            className="px-5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1"
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

      {/* Lista (Recibidas / Enviadas) */}
      {activeTab !== 'notificaciones' && (lista.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#F5F5F5' }}>
            <MessageCircle className="w-8 h-8" style={{ color: '#D1D5DB' }} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h3)', fontWeight: 500, color: '#0A0A0A', marginBottom: '8px' }}>
            {activeTab === 'recibidas' ? 'No recibiste consultas aún' : 'No enviaste consultas aún'}
          </h3>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', maxWidth: '280px', lineHeight: '1.6' }}>
            {activeTab === 'recibidas' ? 'Las consultas de compradores sobre tus parcelas aparecerán acá.' : 'Cuando contactes a un vendedor, el historial aparecerá acá.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {lista.map(c => {
            const statusCfg = ESTADO_CONFIG[c.estado];
            const isExpanded = expandedId === c.id;
            const canAct = canManage(c);
            return (
              <div key={c.id} className="rounded-xl overflow-hidden" style={{ border: '1.5px solid #E5E5E5', backgroundColor: '#FFFFFF' }}>
                {/* Row */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : c.id)}
                  className="w-full flex items-center gap-4 p-4 text-left transition-colors"
                  style={{ backgroundColor: isExpanded ? '#F9FAFB' : 'transparent' }}
                  onMouseEnter={e => { if (!isExpanded) e.currentTarget.style.backgroundColor = '#F9FAFB'; }}
                  onMouseLeave={e => { if (!isExpanded) e.currentTarget.style.backgroundColor = 'transparent'; }}
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
                  </div>

                  {/* Badge + chevron */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: statusCfg.bg, color: statusCfg.text, border: `1px solid ${statusCfg.border}`, fontFamily: 'var(--font-body)' }}>
                      {statusCfg.label}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" style={{ color: '#9CA3AF' }} /> : <ChevronDown className="w-4 h-4" style={{ color: '#9CA3AF' }} />}
                  </div>
                </button>

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

                    {/* Botones del vendedor */}
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
export interface Consulta {
  id: string;
  tipo: TipoContacto;
  parcela: { id: number; nombre: string; ubicacion: string; imagen: string; };
  otroUsuario: { nombre: string; avatar?: string; };
  fecha?: string;
  hora?: string;
  estado: EstadoConsulta;
  notas?: string;
  motivo?: string;
}
