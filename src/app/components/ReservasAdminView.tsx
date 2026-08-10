import React, { useState, useRef, useEffect } from 'react';
import { SearchX, ChevronRight, ChevronDown, SlidersHorizontal, X, CheckCircle, XCircle, FileText, MapPin, DollarSign, User, Mail, Phone, Eye, AlertTriangle, Clock, CreditCard, Building2, Zap, Calendar } from 'lucide-react';

type FlujoPago = 'mp' | 'transferencia';
type EstadoReserva = 'pendiente' | 'aprobada' | 'rechazada';

interface ParcelaReserva {
  id: string;
  nombre: string;
  ubicacion: string;
  precio: string;
  superficie: string;
  tipo: 'individual' | 'proyecto';
  proyecto?: string;
  flujo: FlujoPago;
  estado: EstadoReserva;
  comprobante: {
    monto: string;
    fecha: string;
    referencia: string;
    archivo?: string;
    mensaje?: string;
    metodoPago?: string;
  };
  usuario: { nombre: string; email: string; telefono: string };
  fechaSolicitud: string;
  fechaRaw: string;
  motivoRechazo?: string;
}

const MOCK_RESERVAS: ParcelaReserva[] = [
  {
    id: 'res-1',
    nombre: 'Parcela Vista al Lago',
    ubicacion: 'Chile Chico, Aysén',
    precio: '$45.000.000',
    superficie: '5.000 m²',
    tipo: 'proyecto',
    proyecto: 'Proyecto Patagonia Sur',
    flujo: 'transferencia',
    estado: 'aprobada',
    comprobante: { monto: '$45.000.000', fecha: '2026-04-25', referencia: '000123456789', archivo: 'comprobante_transferencia.pdf', mensaje: 'Transferí ayer al mediodía, quedo atento.' },
    usuario: { nombre: 'Sebastián Torres', email: 'sebastian.torres@gmail.com', telefono: '+56 9 8765 4321' },
    fechaSolicitud: '25 Abr 2026', fechaRaw: '2026-04-25',
  },
  {
    id: 'res-2',
    nombre: 'Parcela Río Claro Norte',
    ubicacion: 'San Clemente, Maule',
    precio: '$32.000.000',
    superficie: '8.500 m²',
    tipo: 'individual',
    flujo: 'mp',
    estado: 'aprobada',
    comprobante: { monto: '$32.000.000', fecha: '2026-04-24', referencia: 'MP-8547291036', metodoPago: 'Tarjeta de crédito Visa' },
    usuario: { nombre: 'Valentina Morales', email: 'vmorales@outlook.com', telefono: '+56 9 6543 2109' },
    fechaSolicitud: '24 Abr 2026', fechaRaw: '2026-04-24',
  },
  {
    id: 'res-3',
    nombre: 'Parcela Lomas del Sur',
    ubicacion: 'Colbún, Maule',
    precio: '$28.500.000',
    superficie: '6.200 m²',
    tipo: 'proyecto',
    proyecto: 'Proyecto Lomas del Sur',
    flujo: 'transferencia',
    estado: 'pendiente',
    comprobante: { monto: '$28.500.000', fecha: '2026-04-26', referencia: '000456123789', archivo: 'comprobante.pdf', mensaje: 'Transferí el monto exacto con referencia de la parcela.' },
    usuario: { nombre: 'Andrés Fuentes', email: 'afuentes@gmail.com', telefono: '+56 9 1234 5678' },
    fechaSolicitud: '26 Abr 2026', fechaRaw: '2026-04-26',
  },
  {
    id: 'res-4',
    nombre: 'Parcela Sector Cordillera',
    ubicacion: 'Pirque, Región Metropolitana',
    precio: '$120.000.000',
    superficie: '12.000 m²',
    tipo: 'individual',
    flujo: 'mp',
    estado: 'aprobada',
    comprobante: { monto: '$120.000.000', fecha: '2026-04-18', referencia: 'MP-3614729850', metodoPago: 'Saldo Mercado Pago' },
    usuario: { nombre: 'Camila Reyes', email: 'camila.reyes@empresa.cl', telefono: '+56 9 9876 5432' },
    fechaSolicitud: '18 Abr 2026', fechaRaw: '2026-04-18',
  },
  {
    id: 'res-5',
    nombre: 'Parcela Valle Verde',
    ubicacion: 'Melipilla, Región Metropolitana',
    precio: '$55.000.000',
    superficie: '9.000 m²',
    tipo: 'proyecto',
    proyecto: 'Proyecto Valle Verde',
    flujo: 'transferencia',
    estado: 'rechazada',
    comprobante: { monto: '$50.000.000', fecha: '2026-04-15', referencia: '000369258147', archivo: 'comprobante_parcial.pdf' },
    usuario: { nombre: 'Roberto Soto', email: 'rsoto@correo.cl', telefono: '+56 9 5555 4444' },
    fechaSolicitud: '15 Abr 2026', fechaRaw: '2026-04-15',
    motivoRechazo: 'El monto transferido no corresponde al precio de la parcela.',
  },
  {
    id: 'res-6',
    nombre: 'Parcela El Arrayán',
    ubicacion: 'Lo Barnechea, Región Metropolitana',
    precio: '$85.000.000',
    superficie: '7.800 m²',
    tipo: 'individual',
    flujo: 'transferencia',
    estado: 'pendiente',
    comprobante: { monto: '$85.000.000', fecha: '2026-04-27', referencia: '000852741963', archivo: 'pago_reserva_arrayn.jpg' },
    usuario: { nombre: 'Felipe Muñoz', email: 'fmunoz@icloud.com', telefono: '+56 9 7777 8888' },
    fechaSolicitud: '27 Abr 2026', fechaRaw: '2026-04-27',
  },
];

// ─── Badges ───────────────────────────────────────────────────────────────────

function BadgeFlujo({ flujo }: { flujo: FlujoPago }) {
  if (flujo === 'mp') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
        style={{ backgroundColor: '#EFF6FF', color: '#1D4ED8', border: '1px solid #BFDBFE', fontFamily: 'var(--font-body)' }}>
        <CreditCard className="w-3 h-3" /> Mercado Pago
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ backgroundColor: '#F5F5F5', color: '#525252', border: '1px solid #E5E5E5', fontFamily: 'var(--font-body)' }}>
      <Building2 className="w-3 h-3" /> Transferencia
    </span>
  );
}

function BadgeEstado({ estado }: { estado: EstadoReserva }) {
  const config: Record<EstadoReserva, { bg: string; color: string; border: string; label: string; Icon: React.ElementType }> = {
    pendiente:  { bg: '#FFFBEB', color: '#92400E', border: '#FDE68A', label: 'Pendiente', Icon: Clock },
    aprobada:   { bg: '#ECFDF5', color: '#065F46', border: '#6EE7B7', label: 'Aprobada',  Icon: CheckCircle },
    rechazada:  { bg: '#FEF2F2', color: '#991B1B', border: '#FECACA', label: 'Rechazada', Icon: XCircle },
  };
  const { bg, color, border, label, Icon } = config[estado];
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ backgroundColor: bg, color, border: `1px solid ${border}`, fontFamily: 'var(--font-body)' }}>
      <Icon className="w-3 h-3" /> {label}
    </span>
  );
}

// ─── Detalle Drawer ───────────────────────────────────────────────────────────

function DetalleDrawer({ reserva, onClose, onAprobar, onRechazar }: {
  reserva: ParcelaReserva;
  onClose: () => void;
  onAprobar: (id: string) => void;
  onRechazar: (reserva: ParcelaReserva) => void;
}) {
  const esPendiente = reserva.estado === 'pendiente';
  const esMp = reserva.flujo === 'mp';

  const rowStyle = (i: number, total: number) => ({
    borderBottom: i < total - 1 ? '1px solid #F3F4F6' : 'none',
    backgroundColor: i % 2 === 0 ? '#FAFAFA' : '#FFFFFF',
  });

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

          {/* Estado + flujo + fecha */}
          <div className="flex items-center gap-2 flex-wrap">
            <BadgeEstado estado={reserva.estado} />
            <BadgeFlujo flujo={reserva.flujo} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF' }}>
              {reserva.fechaSolicitud}
            </span>
          </div>

          {/* Parcela */}
          <div className="rounded-xl p-4 space-y-3" style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E5E5' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Parcela</p>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'var(--font-size-body-lg)', color: '#0A0A0A' }}>{reserva.nombre}</p>
            <div>
              {reserva.tipo === 'proyecto' ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: '#EFF6FF', color: '#1D4ED8', border: '1px solid #BFDBFE', fontFamily: 'var(--font-body)' }}>
                  Proyecto · {reserva.proyecto}
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: '#F5F5F0', color: '#6B7280', border: '1px solid #E5E5E5', fontFamily: 'var(--font-body)' }}>
                  Parcela individual
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-1" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#6B7280' }}>
                <MapPin className="w-3.5 h-3.5" /> {reserva.ubicacion}
              </span>
              <span className="flex items-center gap-1" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#6B7280' }}>
                <DollarSign className="w-3.5 h-3.5" /> {reserva.precio}
              </span>
            </div>
          </div>

          {/* Comprador */}
          <div className="space-y-3">
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Comprador</p>
            <div className="space-y-2">
              {[
                { Icon: User, text: reserva.usuario.nombre },
                { Icon: Mail, text: reserva.usuario.email },
                { Icon: Phone, text: reserva.usuario.telefono },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 flex-shrink-0" style={{ color: '#6B7280' }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#111827' }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pago — diferenciado por flujo */}
          {esMp ? (
            <div className="space-y-3">
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Pago Mercado Pago
              </p>
              {/* Confirmación automática */}
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ backgroundColor: '#ECFDF5', border: '1px solid #6EE7B7' }}>
                <Zap className="w-4 h-4 flex-shrink-0" style={{ color: '#059669' }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#065F46' }}>
                  Confirmado automáticamente por Mercado Pago
                </span>
              </div>
              {/* Datos del pago */}
              <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #E5E5E5' }}>
                {[
                  { label: 'Monto', value: reserva.comprobante.monto },
                  { label: 'Fecha de pago', value: reserva.comprobante.fecha },
                  { label: 'N° de operación', value: reserva.comprobante.referencia },
                  { label: 'Método de pago', value: reserva.comprobante.metodoPago || '—' },
                ].map((row, i, arr) => (
                  <div key={row.label} className="flex items-center justify-between px-4 py-2.5" style={rowStyle(i, arr.length)}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF' }}>{row.label}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#111827' }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Comprobante de transferencia
              </p>
              {esPendiente && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ backgroundColor: '#FFFBEB', border: '1px solid #FDE68A' }}>
                  <Clock className="w-4 h-4 flex-shrink-0" style={{ color: '#D97706' }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#92400E' }}>
                    Comprobante recibido · pendiente de validación
                  </span>
                </div>
              )}
              <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #E5E5E5' }}>
                {[
                  { label: 'Monto transferido', value: reserva.comprobante.monto },
                  { label: 'Fecha de transferencia', value: reserva.comprobante.fecha },
                  { label: 'N° de referencia', value: reserva.comprobante.referencia },
                ].map((row, i, arr) => (
                  <div key={row.label} className="flex items-center justify-between px-4 py-2.5" style={rowStyle(i, arr.length)}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF' }}>{row.label}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#111827' }}>{row.value}</span>
                  </div>
                ))}
              </div>

              {reserva.comprobante.archivo && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}>
                  <FileText className="w-5 h-5 flex-shrink-0" style={{ color: '#2563EB' }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#1E40AF', flex: 1 }}>{reserva.comprobante.archivo}</span>
                  <button className="flex items-center gap-1 text-xs font-medium" style={{ color: '#2563EB', fontFamily: 'var(--font-body)', background: 'none', border: 'none', cursor: 'pointer' }}>
                    <Eye className="w-3.5 h-3.5" /> Ver
                  </button>
                </div>
              )}

              {reserva.comprobante.mensaje && (
                <div className="px-4 py-3 rounded-xl" style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E5E5' }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF', marginBottom: '4px' }}>Mensaje del comprador</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#374151', lineHeight: '1.5' }}>{reserva.comprobante.mensaje}</p>
                </div>
              )}
            </div>
          )}

          {/* Motivo de rechazo */}
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

        {/* Footer de acciones — solo para transferencia pendiente */}
        {esPendiente && !esMp && (
          <div className="px-6 py-4 flex gap-3" style={{ borderTop: '1px solid #E5E5E5' }}>
            <button
              onClick={() => onRechazar(reserva)}
              className="flex-1 py-2.5 rounded-full text-sm font-medium transition-all"
              style={{ backgroundColor: '#FEF2F2', color: '#991B1B', border: '1px solid #FECACA', fontFamily: 'var(--font-body)', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FEE2E2'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FEF2F2'}
            >
              Rechazar
            </button>
            <button
              onClick={() => onAprobar(reserva.id)}
              className="flex-1 py-2.5 rounded-full text-sm font-medium flex items-center justify-center gap-2 transition-all"
              style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)', border: 'none', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#01533E'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#006B4E'}
            >
              <CheckCircle className="w-4 h-4" /> Aprobar reserva
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// ─── Rechazar Modal ───────────────────────────────────────────────────────────

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
          <button onClick={onClose} className="flex-1 py-2.5 rounded-full text-sm font-medium" style={{ backgroundColor: '#F5F5F5', color: '#374151', fontFamily: 'var(--font-body)', border: 'none', cursor: 'pointer' }}>
            Cancelar
          </button>
          <button
            onClick={() => { if (motivo.trim()) onConfirmar(reserva.id, motivo); }}
            disabled={!motivo.trim()}
            className="flex-1 py-2.5 rounded-full text-sm font-medium"
            style={{ backgroundColor: motivo.trim() ? '#DC2626' : '#E5E5E5', color: motivo.trim() ? '#FFFFFF' : '#9CA3AF', fontFamily: 'var(--font-body)', border: 'none', cursor: motivo.trim() ? 'pointer' : 'not-allowed' }}
          >
            Confirmar rechazo
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Filtros genérico + específicos ──────────────────────────────────────────

export type FiltroEstado = 'todas' | 'pendiente' | 'aprobada' | 'rechazada';
export type FiltroFlujo  = 'todos' | 'mp' | 'transferencia';

const FILTRO_ESTADO_OPCIONES: { id: FiltroEstado; label: string }[] = [
  { id: 'todas',     label: 'Todos' },
  { id: 'pendiente', label: 'Pendiente' },
  { id: 'aprobada',  label: 'Aprobada' },
  { id: 'rechazada', label: 'Rechazada' },
];

const FILTRO_FLUJO_OPCIONES: { id: string; label: string }[] = [
  { id: 'todos',         label: 'Todos' },
  { id: 'mp',            label: 'Mercado Pago' },
  { id: 'transferencia', label: 'Transferencia' },
];

function GenericFilterDropdown({ label, value, options, onChange, isDefault }: {
  label: string;
  value: string;
  options: { id: string; label: string }[];
  onChange: (v: string) => void;
  isDefault: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3.5 py-2 transition-colors"
        style={{
          border: `1px solid ${!isDefault ? '#006B4E' : '#E5E5E5'}`,
          backgroundColor: !isDefault ? '#F0FAF5' : '#FFFFFF',
          color: !isDefault ? '#006B4E' : '#374151',
          borderRadius: '8px',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-body-sm)',
          fontWeight: 500,
          cursor: 'pointer',
        }}
      >
        <SlidersHorizontal className="w-3.5 h-3.5" />
        {label}
        <ChevronDown className="w-3.5 h-3.5" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 rounded-xl overflow-hidden z-50"
          style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', minWidth: '170px' }}>
          {options.map(opcion => (
            <button
              key={opcion.id}
              onClick={() => { onChange(opcion.id); setOpen(false); }}
              className="w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                color: value === opcion.id ? '#006B4E' : '#374151',
                backgroundColor: value === opcion.id ? '#F0FAF5' : 'transparent',
                fontWeight: value === opcion.id ? 600 : 400,
                cursor: 'pointer',
                border: 'none',
              }}
              onMouseEnter={e => { if (value !== opcion.id) e.currentTarget.style.backgroundColor = '#F9FAFB'; }}
              onMouseLeave={e => { if (value !== opcion.id) e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              {opcion.label}
              {value === opcion.id && <CheckCircle className="w-3.5 h-3.5" style={{ color: '#006B4E' }} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function FiltroDropdown({ value, onChange }: { value: FiltroEstado; onChange: (v: FiltroEstado) => void }) {
  return (
    <GenericFilterDropdown
      label="Estados"
      value={value}
      options={FILTRO_ESTADO_OPCIONES}
      onChange={v => onChange(v as FiltroEstado)}
      isDefault={value === 'todas'}
    />
  );
}

export function FiltroDropdownTransaccion({ value, onChange }: { value: FiltroFlujo; onChange: (v: FiltroFlujo) => void }) {
  return (
    <GenericFilterDropdown
      label="Transacción"
      value={value}
      options={FILTRO_FLUJO_OPCIONES}
      onChange={v => onChange(v as FiltroFlujo)}
      isDefault={value === 'todos'}
    />
  );
}

// ─── Filtro fecha ─────────────────────────────────────────────────────────────

export function FiltroDropdownFecha({ desde, hasta, onChange }: {
  desde: string; hasta: string;
  onChange: (desde: string, hasta: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasFilter = !!(desde || hasta);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  function formatLabel() {
    if (!desde && !hasta) return 'Fecha';
    const fmt = (s: string) => `${s.slice(8, 10)}/${s.slice(5, 7)}/${s.slice(0, 4)}`;
    if (desde && hasta) return `${fmt(desde)} – ${fmt(hasta)}`;
    if (desde) return `Desde ${fmt(desde)}`;
    return `Hasta ${fmt(hasta)}`;
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '7px 10px', borderRadius: '8px',
    border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA',
    fontFamily: 'var(--font-body)', fontSize: '13px', color: '#0A0A0A',
    outline: 'none', cursor: 'pointer',
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3.5 py-2 transition-colors"
        style={{
          border: `1px solid ${hasFilter ? '#006B4E' : '#E5E5E5'}`,
          backgroundColor: hasFilter ? '#F0FAF5' : '#FFFFFF',
          color: hasFilter ? '#006B4E' : '#374151',
          borderRadius: '8px', fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-body-sm)', fontWeight: 500, cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}
      >
        <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
        {formatLabel()}
        <ChevronDown className="w-3.5 h-3.5 flex-shrink-0" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 rounded-xl z-50 p-4 space-y-3"
          style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', minWidth: '220px' }}>
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: '#6B7280', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Desde</label>
            <input type="date" value={desde} onChange={e => onChange(e.target.value, hasta)} style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#006B4E'}
              onBlur={e => e.target.style.borderColor = '#E5E5E5'} />
          </div>
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: '#6B7280', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Hasta</label>
            <input type="date" value={hasta} min={desde || undefined} onChange={e => onChange(desde, e.target.value)} style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#006B4E'}
              onBlur={e => e.target.style.borderColor = '#E5E5E5'} />
          </div>
          {hasFilter && (
            <button onClick={() => onChange('', '')}
              style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#DC2626', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              Limpiar filtro
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Vista principal ──────────────────────────────────────────────────────────

export function ReservasAdminView({ busqueda, filtroEstado, filtroFlujo, fechaDesde, fechaHasta }: { busqueda?: string; filtroEstado?: FiltroEstado; filtroFlujo?: FiltroFlujo; fechaDesde?: string; fechaHasta?: string }) {
  const [reservas, setReservas] = useState<ParcelaReserva[]>(MOCK_RESERVAS);
  const [detalleAbierto, setDetalleAbierto] = useState<ParcelaReserva | null>(null);
  const [rechazarModal, setRechazarModal] = useState<ParcelaReserva | null>(null);
  const [toast, setToast] = useState<{ msg: string; tipo: 'exito' | 'error' } | null>(null);

  function showToast(msg: string, tipo: 'exito' | 'error' = 'exito') {
    setToast({ msg, tipo });
    setTimeout(() => setToast(null), 3000);
  }

  function handleAprobar(id: string) {
    setReservas(prev => prev.map(r => r.id === id ? { ...r, estado: 'aprobada' as EstadoReserva } : r));
    setDetalleAbierto(null);
    showToast('Reserva aprobada correctamente');
  }

  function handleRechazar(id: string, motivo: string) {
    setReservas(prev => prev.map(r => r.id === id ? { ...r, estado: 'rechazada' as EstadoReserva, motivoRechazo: motivo } : r));
    setRechazarModal(null);
    setDetalleAbierto(null);
    showToast('Reserva rechazada');
  }

  const filtradas = reservas
    .filter(r => {
      const matchEstado = !filtroEstado || filtroEstado === 'todas' || r.estado === filtroEstado;
      const matchFlujo = !filtroFlujo || filtroFlujo === 'todos' || r.flujo === filtroFlujo;
      const q = (busqueda || '').toLowerCase();
      const matchBusqueda = !q || r.nombre.toLowerCase().includes(q) || (r.proyecto ?? '').toLowerCase().includes(q);
      const matchFecha = (!fechaDesde || r.fechaRaw >= fechaDesde) && (!fechaHasta || r.fechaRaw <= fechaHasta);
      return matchEstado && matchFlujo && matchBusqueda && matchFecha;
    })
    .sort((a, b) => b.fechaRaw.localeCompare(a.fechaRaw));

  const pendientesCount = reservas.filter(r => r.estado === 'pendiente').length;

  const COL_HEADERS = ['Parcela', 'Comprador', 'Precio', 'Transacción', 'Estado', ''];
  const COL_SPANS   = ['col-span-3', 'col-span-2', 'col-span-2', 'col-span-2', 'col-span-2', 'col-span-1'];

  return (
    <div className="pb-8 space-y-4">

      {/* Contador pendientes */}
      {pendientesCount > 0 && (
        <div className="px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ backgroundColor: '#FFFBEB', border: '1px solid #FDE68A' }}>
            <Clock className="w-3.5 h-3.5" style={{ color: '#D97706' }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: '#92400E' }}>
              {pendientesCount} pendiente{pendientesCount > 1 ? 's' : ''} de validación
            </span>
          </div>
        </div>
      )}

      {/* Tabla */}
      <div className="mx-8 rounded-xl overflow-hidden" style={{ border: '1px solid #E5E5E5' }}>
        {/* Header */}
        <div className="grid grid-cols-12 px-4 py-3" style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E5E5' }}>
          {COL_HEADERS.map((h, i) => (
            <div key={i} className={COL_SPANS[i]}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</span>
            </div>
          ))}
        </div>

        {/* Rows */}
        {filtradas.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#F3F4F6' }}>
              <SearchX className="w-6 h-6" style={{ color: '#D1D5DB' }} />
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 'var(--font-size-body-base)', color: '#374151', marginBottom: '4px' }}>
              {busqueda || filtroEstado !== 'todas' || filtroFlujo !== 'todos' ? 'Sin resultados' : 'Sin reservas'}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#9CA3AF', maxWidth: '280px' }}>
              No se encontraron reservas con los filtros actuales.
            </p>
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
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  {reserva.tipo === 'proyecto' ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: '#EFF6FF', color: '#1D4ED8', border: '1px solid #BFDBFE', fontFamily: 'var(--font-body)' }}>
                      Proyecto · {reserva.proyecto}
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: '#F5F5F0', color: '#6B7280', border: '1px solid #E5E5E5', fontFamily: 'var(--font-body)' }}>
                      Parcela individual
                    </span>
                  )}
                </div>
                <p className="mt-1" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF' }}>{reserva.fechaSolicitud}</p>
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

              {/* Flujo */}
              <div className="col-span-2">
                <BadgeFlujo flujo={reserva.flujo} />
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
          onAprobar={handleAprobar}
          onRechazar={r => setRechazarModal(r)}
        />
      )}

      {/* Modal rechazo */}
      {rechazarModal && (
        <RechazarModal
          reserva={rechazarModal}
          onClose={() => setRechazarModal(null)}
          onConfirmar={handleRechazar}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[70] flex items-center gap-2 px-5 py-3 rounded-xl shadow-lg"
          style={{ transform: 'translateX(-50%)', backgroundColor: toast.tipo === 'exito' ? '#006B4E' : '#DC2626', color: '#FFFFFF', fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500 }}>
          {toast.tipo === 'exito' ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
          {toast.msg}
        </div>
      )}
    </div>
  );
}
