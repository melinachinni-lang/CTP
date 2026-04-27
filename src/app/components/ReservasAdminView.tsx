import React, { useState } from 'react';
import { Search, ChevronRight, X, CheckCircle, XCircle, Clock, FileText, MapPin, DollarSign, User, Mail, Phone, Calendar, Eye, AlertTriangle } from 'lucide-react';

type EstadoReserva = 'por-revisar' | 'reservada' | 'rechazada';

interface ParcelaReserva {
  id: string;
  nombre: string;
  ubicacion: string;
  precio: string;
  superficie: string;
  estado: EstadoReserva;
  comprobante: {
    monto: string;
    fecha: string;
    referencia: string;
    archivo: string;
    mensaje?: string;
  };
  usuario: {
    nombre: string;
    email: string;
    telefono: string;
  };
  fechaSolicitud: string;
  motivoRechazo?: string;
}

const MOCK_RESERVAS: ParcelaReserva[] = [
  {
    id: 'res-1',
    nombre: 'Parcela Vista al Lago',
    ubicacion: 'Chile Chico, Aysén',
    precio: '$45.000.000',
    superficie: '5.000 m²',
    estado: 'por-revisar',
    comprobante: { monto: '$45.000.000', fecha: '2026-04-25', referencia: '000123456789', archivo: 'comprobante_transferencia.pdf', mensaje: 'Transferí ayer al mediodía, quedo atento.' },
    usuario: { nombre: 'Sebastián Torres', email: 'sebastian.torres@gmail.com', telefono: '+56 9 8765 4321' },
    fechaSolicitud: '25 Abr 2026',
  },
  {
    id: 'res-2',
    nombre: 'Parcela Río Claro Norte',
    ubicacion: 'San Clemente, Maule',
    precio: '$32.000.000',
    superficie: '8.500 m²',
    estado: 'por-revisar',
    comprobante: { monto: '$32.000.000', fecha: '2026-04-24', referencia: '000987654321', archivo: 'transferencia_banco_estado.jpg' },
    usuario: { nombre: 'Valentina Morales', email: 'vmorales@outlook.com', telefono: '+56 9 6543 2109' },
    fechaSolicitud: '24 Abr 2026',
  },
  {
    id: 'res-3',
    nombre: 'Parcela Lomas del Sur',
    ubicacion: 'Colbún, Maule',
    precio: '$28.500.000',
    superficie: '6.200 m²',
    estado: 'reservada',
    comprobante: { monto: '$28.500.000', fecha: '2026-04-20', referencia: '000456123789', archivo: 'comprobante.pdf' },
    usuario: { nombre: 'Andrés Fuentes', email: 'afuentes@gmail.com', telefono: '+56 9 1234 5678' },
    fechaSolicitud: '20 Abr 2026',
  },
  {
    id: 'res-4',
    nombre: 'Parcela Sector Cordillera',
    ubicacion: 'Pirque, Región Metropolitana',
    precio: '$120.000.000',
    superficie: '12.000 m²',
    estado: 'reservada',
    comprobante: { monto: '$120.000.000', fecha: '2026-04-18', referencia: '000741852963', archivo: 'pago_parcela_pirque.pdf', mensaje: 'Pago realizado en cuotas según acuerdo.' },
    usuario: { nombre: 'Camila Reyes', email: 'camila.reyes@empresa.cl', telefono: '+56 9 9876 5432' },
    fechaSolicitud: '18 Abr 2026',
  },
  {
    id: 'res-5',
    nombre: 'Parcela Valle Verde',
    ubicacion: 'Melipilla, Región Metropolitana',
    precio: '$55.000.000',
    superficie: '9.000 m²',
    estado: 'rechazada',
    comprobante: { monto: '$50.000.000', fecha: '2026-04-15', referencia: '000369258147', archivo: 'comprobante_parcial.pdf' },
    usuario: { nombre: 'Roberto Soto', email: 'rsoto@correo.cl', telefono: '+56 9 5555 4444' },
    fechaSolicitud: '15 Abr 2026',
    motivoRechazo: 'El monto transferido no corresponde al precio de la parcela.',
  },
];

function BadgeEstado({ estado }: { estado: EstadoReserva }) {
  const config = {
    'por-revisar': { bg: '#FEF3C7', color: '#92400E', border: '#FDE68A', label: 'Por revisar', Icon: Clock },
    'reservada': { bg: '#ECFDF5', color: '#065F46', border: '#6EE7B7', label: 'Reservada', Icon: CheckCircle },
    'rechazada': { bg: '#FEF2F2', color: '#991B1B', border: '#FECACA', label: 'Rechazada', Icon: XCircle },
  }[estado];
  const Icon = config.Icon;
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ backgroundColor: config.bg, color: config.color, border: `1px solid ${config.border}`, fontFamily: 'var(--font-body)' }}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
}

function DetalleDrawer({ reserva, onClose, onValidar, onRechazar }: {
  reserva: ParcelaReserva;
  onClose: () => void;
  onValidar: (id: string) => void;
  onRechazar: (id: string) => void;
}) {
  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-[440px] bg-white z-50 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: '#E5E5E5' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'var(--font-size-body-lg)', color: '#0A0A0A' }}>
            Detalle de reserva
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4" style={{ color: '#6B7280' }} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Estado */}
          <div className="flex items-center gap-2">
            <BadgeEstado estado={reserva.estado} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF' }}>
              Solicitud recibida el {reserva.fechaSolicitud}
            </span>
          </div>

          {/* Parcela */}
          <div className="rounded-xl p-4 space-y-3" style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E5E5' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Parcela</p>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'var(--font-size-body-lg)', color: '#0A0A0A' }}>{reserva.nombre}</p>
            <div className="flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-1" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#6B7280' }}>
                <MapPin className="w-3.5 h-3.5" /> {reserva.ubicacion}
              </span>
              <span className="flex items-center gap-1" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#6B7280' }}>
                <DollarSign className="w-3.5 h-3.5" /> {reserva.precio}
              </span>
            </div>
          </div>

          {/* Usuario */}
          <div className="space-y-3">
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Comprador</p>
            <div className="space-y-2">
              {[
                { icon: User, text: reserva.usuario.nombre },
                { icon: Mail, text: reserva.usuario.email },
                { icon: Phone, text: reserva.usuario.telefono },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 flex-shrink-0" style={{ color: '#6B7280' }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#111827' }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Comprobante */}
          <div className="space-y-3">
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Comprobante de transferencia</p>
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #E5E5E5' }}>
              {[
                { label: 'Monto transferido', value: reserva.comprobante.monto },
                { label: 'Fecha de transferencia', value: reserva.comprobante.fecha },
                { label: 'N° de referencia', value: reserva.comprobante.referencia },
              ].map((row, i, arr) => (
                <div key={row.label} className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: i < arr.length - 1 ? '1px solid #F3F4F6' : 'none', backgroundColor: i % 2 === 0 ? '#FAFAFA' : '#FFFFFF' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF' }}>{row.label}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#111827' }}>{row.value}</span>
                </div>
              ))}
            </div>

            {/* Archivo */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}>
              <FileText className="w-5 h-5 flex-shrink-0" style={{ color: '#2563EB' }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#1E40AF', flex: 1 }}>{reserva.comprobante.archivo}</span>
              <button className="flex items-center gap-1 text-xs font-medium" style={{ color: '#2563EB', fontFamily: 'var(--font-body)' }}>
                <Eye className="w-3.5 h-3.5" /> Ver
              </button>
            </div>

            {reserva.comprobante.mensaje && (
              <div className="px-4 py-3 rounded-xl" style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E5E5' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF', marginBottom: '4px' }}>Mensaje del comprador</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#374151', lineHeight: '1.5' }}>{reserva.comprobante.mensaje}</p>
              </div>
            )}
          </div>

          {/* Motivo rechazo si aplica */}
          {reserva.estado === 'rechazada' && reserva.motivoRechazo && (
            <div className="flex items-start gap-3 px-4 py-3 rounded-xl" style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA' }}>
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#DC2626' }} />
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: '#991B1B', marginBottom: '2px' }}>Motivo de rechazo</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#991B1B', lineHeight: '1.5' }}>{reserva.motivoRechazo}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer acciones */}
        {reserva.estado === 'por-revisar' && (
          <div className="px-6 py-4 border-t flex gap-3" style={{ borderColor: '#E5E5E5' }}>
            <button
              onClick={() => onRechazar(reserva.id)}
              className="flex-1 py-2.5 rounded-full text-sm font-medium transition-all"
              style={{ backgroundColor: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', fontFamily: 'var(--font-body)' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FEE2E2'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FEF2F2'}
            >
              Rechazar
            </button>
            <button
              onClick={() => onValidar(reserva.id)}
              className="flex-1 py-2.5 rounded-full text-sm font-medium transition-all"
              style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#01533E'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#006B4E'}
            >
              Validar pago
            </button>
          </div>
        )}
      </div>
    </>
  );
}

function RechazarModal({ reserva, onClose, onConfirmar }: {
  reserva: ParcelaReserva;
  onClose: () => void;
  onConfirmar: (id: string, motivo: string) => void;
}) {
  const [motivo, setMotivo] = useState('');
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FEE2E2' }}>
            <XCircle className="w-5 h-5" style={{ color: '#DC2626' }} />
          </div>
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'var(--font-size-body-lg)', color: '#0A0A0A' }}>Rechazar comprobante</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#6B7280' }}>{reserva.nombre}</p>
          </div>
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#374151' }}>
          La parcela volverá a estar <strong>disponible</strong> y se notificará al comprador por correo.
        </p>
        <div>
          <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
            Motivo del rechazo <span style={{ color: '#DC2626' }}>*</span>
          </label>
          <textarea
            value={motivo}
            onChange={e => setMotivo(e.target.value)}
            rows={3}
            placeholder="Ej: El monto transferido no corresponde al precio de la parcela."
            className="w-full px-4 py-2.5 rounded-lg text-sm resize-none"
            style={{ border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA', color: '#0A0A0A', outline: 'none', fontFamily: 'var(--font-body)', lineHeight: '1.5' }}
          />
        </div>
        <div className="flex gap-3 pt-1">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-full text-sm font-medium" style={{ backgroundColor: '#F5F5F5', color: '#374151', fontFamily: 'var(--font-body)' }}>
            Cancelar
          </button>
          <button
            onClick={() => { if (motivo.trim()) onConfirmar(reserva.id, motivo); }}
            disabled={!motivo.trim()}
            className="flex-1 py-2.5 rounded-full text-sm font-medium transition-all"
            style={{ backgroundColor: motivo.trim() ? '#DC2626' : '#E5E5E5', color: motivo.trim() ? '#FFFFFF' : '#9CA3AF', fontFamily: 'var(--font-body)', cursor: motivo.trim() ? 'pointer' : 'not-allowed' }}
          >
            Confirmar rechazo
          </button>
        </div>
      </div>
    </div>
  );
}

export function ReservasAdminView() {
  const [reservas, setReservas] = useState<ParcelaReserva[]>(MOCK_RESERVAS);
  const [filtroEstado, setFiltroEstado] = useState<'todas' | 'por-revisar' | 'reservada'>('todas');
  const [busqueda, setBusqueda] = useState('');
  const [detalleAbierto, setDetalleAbierto] = useState<ParcelaReserva | null>(null);
  const [rechazarTarget, setRechazarTarget] = useState<ParcelaReserva | null>(null);

  const porRevisar = reservas.filter(r => r.estado === 'por-revisar').length;
  const reservadas = reservas.filter(r => r.estado === 'reservada').length;

  const filtradas = reservas.filter(r => {
    const matchEstado = filtroEstado === 'todas' || r.estado === filtroEstado;
    const matchBusqueda = !busqueda || r.nombre.toLowerCase().includes(busqueda.toLowerCase()) || r.usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) || r.ubicacion.toLowerCase().includes(busqueda.toLowerCase());
    return matchEstado && matchBusqueda;
  });

  const handleValidar = (id: string) => {
    setReservas(prev => prev.map(r => r.id === id ? { ...r, estado: 'reservada' as EstadoReserva } : r));
    setDetalleAbierto(prev => prev?.id === id ? { ...prev, estado: 'reservada' as EstadoReserva } : prev);
  };

  const handleRechazarConfirmar = (id: string, motivo: string) => {
    setReservas(prev => prev.map(r => r.id === id ? { ...r, estado: 'rechazada' as EstadoReserva, motivoRechazo: motivo } : r));
    setDetalleAbierto(null);
    setRechazarTarget(null);
  };

  const TABS: { id: 'todas' | 'por-revisar' | 'reservada'; label: string; count?: number }[] = [
    { id: 'todas', label: 'Todas', count: reservas.length },
    { id: 'por-revisar', label: 'Por revisar', count: porRevisar },
    { id: 'reservada', label: 'Reservadas', count: reservadas },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total solicitudes', value: reservas.length, color: '#006B4E', bg: '#EBFEF5' },
          { label: 'Por revisar', value: porRevisar, color: '#D97706', bg: '#FEF3C7' },
          { label: 'Reservadas', value: reservadas, color: '#059669', bg: '#ECFDF5' },
          { label: 'Rechazadas', value: reservas.filter(r => r.estado === 'rechazada').length, color: '#DC2626', bg: '#FEF2F2' },
        ].map(stat => (
          <div key={stat.label} className="rounded-xl p-4 flex flex-col gap-1" style={{ backgroundColor: stat.bg, border: `1px solid ${stat.bg}` }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: stat.color, fontWeight: 600 }}>{stat.label}</p>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700, color: stat.color, lineHeight: 1 }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-lg" style={{ backgroundColor: '#F5F5F5' }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setFiltroEstado(tab.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all"
              style={{
                backgroundColor: filtroEstado === tab.id ? '#FFFFFF' : 'transparent',
                color: filtroEstado === tab.id ? '#006B4E' : '#6B7280',
                fontFamily: 'var(--font-body)',
                boxShadow: filtroEstado === tab.id ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              }}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className="px-1.5 py-0.5 rounded-full text-xs" style={{
                  backgroundColor: filtroEstado === tab.id ? '#EBFEF5' : '#E5E5E5',
                  color: filtroEstado === tab.id ? '#006B4E' : '#9CA3AF',
                }}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Búsqueda */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }} />
          <input
            type="text"
            placeholder="Buscar parcela o comprador..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            className="pl-9 pr-4 py-2 rounded-lg text-sm"
            style={{ border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA', color: '#0A0A0A', outline: 'none', fontFamily: 'var(--font-body)', width: '240px' }}
          />
        </div>
      </div>

      {/* Tabla */}
      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #E5E5E5' }}>
        {/* Header */}
        <div className="grid grid-cols-12 px-4 py-3" style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E5E5' }}>
          {['Parcela', 'Comprador', 'Precio', 'Superficie', 'Fecha solicitud', 'Estado', ''].map((h, i) => (
            <div key={i} className={['col-span-3', 'col-span-2', 'col-span-2', 'col-span-1', 'col-span-1', 'col-span-2', 'col-span-1'][i]}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</span>
            </div>
          ))}
        </div>

        {/* Rows */}
        {filtradas.length === 0 ? (
          <div className="py-12 text-center">
            <p style={{ fontFamily: 'var(--font-body)', color: '#9CA3AF' }}>No hay reservas con este filtro.</p>
          </div>
        ) : (
          filtradas.map((reserva, idx) => (
            <div
              key={reserva.id}
              className="grid grid-cols-12 px-4 py-3.5 items-center cursor-pointer transition-colors"
              style={{ borderBottom: idx < filtradas.length - 1 ? '1px solid #F3F4F6' : 'none', backgroundColor: '#FFFFFF' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FAFAFA'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}
              onClick={() => setDetalleAbierto(reserva)}
            >
              {/* Parcela */}
              <div className="col-span-3 pr-2">
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#111827' }}>{reserva.nombre}</p>
                <p className="flex items-center gap-1 mt-0.5" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF' }}>
                  <MapPin className="w-3 h-3" />{reserva.ubicacion}
                </p>
              </div>

              {/* Comprador */}
              <div className="col-span-2 pr-2">
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#374151' }}>{reserva.usuario.nombre}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF' }}>{reserva.usuario.email}</p>
              </div>

              {/* Precio */}
              <div className="col-span-2">
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#111827' }}>{reserva.precio}</p>
              </div>

              {/* Superficie */}
              <div className="col-span-1">
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#6B7280' }}>{reserva.superficie}</p>
              </div>

              {/* Fecha */}
              <div className="col-span-1">
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#6B7280' }}>{reserva.fechaSolicitud}</p>
              </div>

              {/* Estado */}
              <div className="col-span-2" onClick={e => e.stopPropagation()}>
                <BadgeEstado estado={reserva.estado} />
              </div>

              {/* Chevron */}
              <div className="col-span-1 flex justify-end">
                <ChevronRight className="w-4 h-4" style={{ color: '#006B4E' }} />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Drawer detalle */}
      {detalleAbierto && (
        <DetalleDrawer
          reserva={detalleAbierto}
          onClose={() => setDetalleAbierto(null)}
          onValidar={handleValidar}
          onRechazar={(id) => {
            const r = reservas.find(x => x.id === id);
            if (r) { setRechazarTarget(r); }
          }}
        />
      )}

      {/* Modal rechazo */}
      {rechazarTarget && (
        <RechazarModal
          reserva={rechazarTarget}
          onClose={() => setRechazarTarget(null)}
          onConfirmar={handleRechazarConfirmar}
        />
      )}
    </div>
  );
}
