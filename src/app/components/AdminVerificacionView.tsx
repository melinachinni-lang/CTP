import { useState } from 'react';
import {
  CheckCircle, XCircle, Clock, Eye, Building2, User, FileText,
  MapPin, Mail, Calendar, ChevronDown, Search, X, CheckCircle2,
  AlertCircle, RefreshCw, Download,
} from 'lucide-react';

type TipoRegistro = 'inmobiliaria' | 'broker';
type EstadoRegistro = 'pendiente' | 'aprobado' | 'rechazado';
type FiltroEstado = 'todos' | EstadoRegistro;
type FiltroTipo = 'todos' | TipoRegistro;

interface Documento {
  nombre: string;
  estado: 'subido' | 'faltante';
}

interface RegistroPendiente {
  id: string;
  tipo: TipoRegistro;
  nombre: string;
  email: string;
  region: string;
  fechaEnvio: string;
  estado: EstadoRegistro;
  documentos: Documento[];
  representante?: string;
  telefono?: string;
  rut?: string;
  nota?: string;
}

const REGISTROS: RegistroPendiente[] = [
  {
    id: '1',
    tipo: 'inmobiliaria',
    nombre: 'Inmobiliaria Del Campo SpA',
    email: 'contacto@delcampo.cl',
    region: 'Metropolitana',
    fechaEnvio: 'hace 3 días',
    estado: 'pendiente',
    representante: 'Carlos Herrera Núñez',
    telefono: '+56 9 8712 3456',
    rut: '76.543.210-1',
    documentos: [
      { nombre: 'RUT empresa', estado: 'subido' },
      { nombre: 'Escritura de constitución', estado: 'subido' },
      { nombre: 'Representante legal', estado: 'subido' },
      { nombre: 'Certificado vigencia', estado: 'faltante' },
    ],
  },
  {
    id: '2',
    tipo: 'broker',
    nombre: 'Rodrigo Alvarado Soto',
    email: 'rodrigo.alvarado@gmail.com',
    region: 'Valparaíso',
    fechaEnvio: 'hace 5 días',
    estado: 'pendiente',
    telefono: '+56 9 7823 4567',
    rut: '15.234.567-8',
    documentos: [
      { nombre: 'Cédula de identidad', estado: 'subido' },
      { nombre: 'Certificado antecedentes', estado: 'subido' },
      { nombre: 'Licencia de corredor', estado: 'faltante' },
    ],
  },
  {
    id: '3',
    tipo: 'broker',
    nombre: 'Valeria Torres Méndez',
    email: 'valeria.torres@outlook.com',
    region: 'La Araucanía',
    fechaEnvio: 'hace 2 días',
    estado: 'pendiente',
    telefono: '+56 9 6534 2891',
    rut: '17.891.234-5',
    documentos: [
      { nombre: 'Cédula de identidad', estado: 'subido' },
      { nombre: 'Certificado antecedentes', estado: 'subido' },
      { nombre: 'Licencia de corredor', estado: 'subido' },
    ],
  },
  {
    id: '4',
    tipo: 'inmobiliaria',
    nombre: 'Propiedades Rurales del Sur Ltda.',
    email: 'admin@propiedadesdelsur.cl',
    region: 'Los Lagos',
    fechaEnvio: 'hace 1 día',
    estado: 'pendiente',
    representante: 'Ana Sofía Muñoz',
    telefono: '+56 9 5423 6781',
    rut: '77.123.456-9',
    documentos: [
      { nombre: 'RUT empresa', estado: 'subido' },
      { nombre: 'Escritura de constitución', estado: 'subido' },
      { nombre: 'Representante legal', estado: 'faltante' },
      { nombre: 'Certificado vigencia', estado: 'faltante' },
    ],
  },
  {
    id: '5',
    tipo: 'broker',
    nombre: 'Ignacio Fuentes Parra',
    email: 'ifuentes@corredor.cl',
    region: 'Biobío',
    fechaEnvio: 'hoy',
    estado: 'pendiente',
    telefono: '+56 9 9123 4567',
    rut: '14.567.890-3',
    documentos: [
      { nombre: 'Cédula de identidad', estado: 'subido' },
      { nombre: 'Certificado antecedentes', estado: 'faltante' },
      { nombre: 'Licencia de corredor', estado: 'subido' },
    ],
  },
  {
    id: '6',
    tipo: 'inmobiliaria',
    nombre: 'Parcelandia S.A.',
    email: 'ventas@parcelandia.cl',
    region: 'O\'Higgins',
    fechaEnvio: 'hace 8 días',
    estado: 'aprobado',
    representante: 'Luis Morales',
    rut: '96.789.012-4',
    documentos: [
      { nombre: 'RUT empresa', estado: 'subido' },
      { nombre: 'Escritura de constitución', estado: 'subido' },
      { nombre: 'Representante legal', estado: 'subido' },
      { nombre: 'Certificado vigencia', estado: 'subido' },
    ],
  },
  {
    id: '7',
    tipo: 'broker',
    nombre: 'Sofía Ramírez Castro',
    email: 'sofia.ramirez@broker.cl',
    region: 'Metropolitana',
    fechaEnvio: 'hace 10 días',
    estado: 'rechazado',
    rut: '18.234.567-0',
    nota: 'Licencia de corredor vencida. Se le solicitó renovarla.',
    documentos: [
      { nombre: 'Cédula de identidad', estado: 'subido' },
      { nombre: 'Certificado antecedentes', estado: 'subido' },
      { nombre: 'Licencia de corredor', estado: 'subido' },
    ],
  },
];

const ESTADO_CONFIG: Record<EstadoRegistro, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  pendiente: { label: 'Pendiente',  color: '#92400E', bg: '#FEF3C7', icon: Clock },
  aprobado:  { label: 'Aprobado',  color: '#065F46', bg: '#D1FAE5', icon: CheckCircle },
  rechazado: { label: 'Rechazado', color: '#991B1B', bg: '#FEE2E2', icon: XCircle },
};

export function AdminVerificacionView() {
  const [filtroEstado, setFiltroEstado] = useState<FiltroEstado>('pendiente');
  const [filtroTipo, setFiltroTipo] = useState<FiltroTipo>('todos');
  const [showTipoDropdown, setShowTipoDropdown] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [drawerRegistro, setDrawerRegistro] = useState<RegistroPendiente | null>(null);
  const [registros, setRegistros] = useState<RegistroPendiente[]>(REGISTROS);
  const [procesando, setProcesando] = useState<string | null>(null);
  const [showRechazoInput, setShowRechazoInput] = useState(false);
  const [notaRechazo, setNotaRechazo] = useState('');

  const pendientesCount  = registros.filter(r => r.estado === 'pendiente').length;
  const aprobadosCount   = registros.filter(r => r.estado === 'aprobado').length;
  const rechazadosCount  = registros.filter(r => r.estado === 'rechazado').length;

  const filtrados = registros.filter(r => {
    const matchEstado = filtroEstado === 'todos' || r.estado === filtroEstado;
    const matchTipo   = filtroTipo === 'todos' || r.tipo === filtroTipo;
    const matchSearch = busqueda === '' || r.nombre.toLowerCase().includes(busqueda.toLowerCase()) || r.email.toLowerCase().includes(busqueda.toLowerCase());
    return matchEstado && matchTipo && matchSearch;
  });

  const handleAprobar = (id: string) => {
    setProcesando(id);
    setTimeout(() => {
      setRegistros(prev => prev.map(r => r.id === id ? { ...r, estado: 'aprobado' } : r));
      setProcesando(null);
      if (drawerRegistro?.id === id) setDrawerRegistro(prev => prev ? { ...prev, estado: 'aprobado' } : null);
    }, 1000);
  };

  const handleRechazar = (id: string) => {
    setProcesando(id);
    setTimeout(() => {
      setRegistros(prev => prev.map(r => r.id === id ? { ...r, estado: 'rechazado', nota: notaRechazo || undefined } : r));
      setProcesando(null);
      setShowRechazoInput(false);
      setNotaRechazo('');
      if (drawerRegistro?.id === id) setDrawerRegistro(prev => prev ? { ...prev, estado: 'rechazado' } : null);
    }, 1000);
  };

  const estadoFiltros: { key: FiltroEstado; label: string; count: number }[] = [
    { key: 'todos',     label: 'Todos',     count: registros.length },
    { key: 'pendiente', label: 'Pendientes', count: pendientesCount },
    { key: 'aprobado',  label: 'Aprobados', count: aprobadosCount },
    { key: 'rechazado', label: 'Rechazados',count: rechazadosCount },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">

      {/* Header */}
      <div className="mb-6">
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h3)', fontWeight: 500, color: '#0A0A0A', marginBottom: '4px' }}>
          Verificación de registros
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>
          Revisa y valida las solicitudes de registro de nuevas inmobiliarias y brokers.
        </p>
      </div>

      {/* KPI summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Pendientes de revisión', value: pendientesCount, color: '#92400E', bg: '#FFFBEB', border: '#FDE68A', icon: Clock },
          { label: 'Aprobados este mes',     value: aprobadosCount,  color: '#065F46', bg: '#ECFDF5', border: '#A7F3D0', icon: CheckCircle },
          { label: 'Rechazados este mes',    value: rechazadosCount, color: '#991B1B', bg: '#FEF2F2', border: '#FECACA', icon: XCircle },
        ].map(kpi => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="rounded-2xl p-5 flex items-center gap-4" style={{ backgroundColor: kpi.bg, border: `1px solid ${kpi.border}` }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: kpi.color + '20' }}>
                <Icon className="w-5 h-5" style={{ color: kpi.color }} />
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 700, color: kpi.color, lineHeight: 1 }}>{kpi.value}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: kpi.color, opacity: 0.8, marginTop: '2px' }}>{kpi.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filtros */}
      <div className="flex items-center justify-between gap-4 mb-5">
        {/* Estado tabs */}
        <div className="flex gap-1 p-1 rounded-full" style={{ backgroundColor: '#F3F4F6', width: 'fit-content' }}>
          {estadoFiltros.map(f => (
            <button
              key={f.key}
              onClick={() => setFiltroEstado(f.key)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full transition-all text-sm whitespace-nowrap"
              style={{
                fontFamily: 'var(--font-body)', fontWeight: filtroEstado === f.key ? 600 : 400,
                color: filtroEstado === f.key ? '#0A0A0A' : '#6B7280',
                backgroundColor: filtroEstado === f.key ? '#FFFFFF' : 'transparent',
                boxShadow: filtroEstado === f.key ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              }}
            >
              {f.label}
              <span className="px-1.5 py-0.5 rounded-full text-xs" style={{ backgroundColor: filtroEstado === f.key ? '#F0F5EB' : '#E5E5E5', color: filtroEstado === f.key ? '#3D5E28' : '#9CA3AF' }}>
                {f.count}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Tipo dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowTipoDropdown(v => !v)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors"
              style={{ border: '1px solid #E5E5E5', backgroundColor: '#FFFFFF', fontFamily: 'var(--font-body)', fontWeight: 500, color: '#0A0A0A' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
            >
              {filtroTipo === 'todos' ? 'Todos' : filtroTipo === 'inmobiliaria' ? 'Inmobiliarias' : 'Brokers'}
              <ChevronDown className="w-3.5 h-3.5" style={{ color: '#737373', transform: showTipoDropdown ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
            </button>
            {showTipoDropdown && (
              <div className="absolute right-0 top-full mt-1 z-50 rounded-xl overflow-hidden" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', minWidth: '160px' }}>
                {([['todos', 'Todos'], ['inmobiliaria', 'Inmobiliarias'], ['broker', 'Brokers']] as [FiltroTipo, string][]).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => { setFiltroTipo(key); setShowTipoDropdown(false); }}
                    className="w-full text-left px-4 py-2.5 transition-colors"
                    style={{
                      fontFamily: 'var(--font-body)', fontSize: '13px',
                      fontWeight: filtroTipo === key ? 600 : 400,
                      color: filtroTipo === key ? '#006B4E' : '#0A0A0A',
                      backgroundColor: filtroTipo === key ? '#F0F9F5' : '#FFFFFF',
                    }}
                    onMouseEnter={e => { if (filtroTipo !== key) e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
                    onMouseLeave={e => { if (filtroTipo !== key) e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Búsqueda */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }} />
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl text-sm outline-none"
              style={{ border: '1px solid #E5E5E5', fontFamily: 'var(--font-body)', color: '#0A0A0A', width: '240px', backgroundColor: '#FFFFFF' }}
            />
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
        {filtrados.length === 0 ? (
          <div className="py-16 text-center">
            <CheckCircle2 className="w-10 h-10 mx-auto mb-3" style={{ color: '#D1FAE5' }} />
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#737373' }}>No hay registros en esta categoría.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead style={{ backgroundColor: '#FAFAFA', borderBottom: '1px solid #E5E5E5' }}>
              <tr>
                {['Solicitante', 'Tipo', 'Región', 'Documentos', 'Enviado', 'Estado', 'Acciones'].map((h, i) => (
                  <th key={h}
                    className={`px-5 py-3.5 ${i === 0 ? 'text-left' : i >= 5 ? 'text-right' : 'text-left'}`}
                    style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.06em' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtrados.map((r, i) => {
                const cfg = ESTADO_CONFIG[r.estado];
                const EstIcon = cfg.icon;
                const docSubidos = r.documentos.filter(d => d.estado === 'subido').length;
                const docTotal   = r.documentos.length;
                const isProcesando = procesando === r.id;
                return (
                  <tr
                    key={r.id}
                    style={{ borderBottom: i < filtrados.length - 1 ? '1px solid #F5F5F5' : 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#FAFAFA')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
                  >
                    {/* Solicitante */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: r.tipo === 'inmobiliaria' ? '#EFF6FF' : '#F0F5EB' }}>
                          {r.tipo === 'inmobiliaria'
                            ? <Building2 className="w-4 h-4" style={{ color: '#2563EB' }} />
                            : <User className="w-4 h-4" style={{ color: '#006B4E' }} />
                          }
                        </div>
                        <div>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: '#0A0A0A' }}>{r.nombre}</p>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>{r.email}</p>
                        </div>
                      </div>
                    </td>
                    {/* Tipo */}
                    <td className="px-5 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: r.tipo === 'inmobiliaria' ? '#EFF6FF' : '#F0F5EB', color: r.tipo === 'inmobiliaria' ? '#1D4ED8' : '#006B4E' }}>
                        {r.tipo === 'inmobiliaria' ? 'Inmobiliaria' : 'Broker'}
                      </span>
                    </td>
                    {/* Región */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#9CA3AF' }} />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#737373' }}>{r.region}</span>
                      </div>
                    </td>
                    {/* Documentos */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5" style={{ color: docSubidos === docTotal ? '#006B4E' : '#D97706' }} />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, color: docSubidos === docTotal ? '#006B4E' : '#D97706' }}>
                          {docSubidos}/{docTotal}
                        </span>
                        {docSubidos < docTotal && (
                          <AlertCircle className="w-3.5 h-3.5" style={{ color: '#D97706' }} />
                        )}
                      </div>
                    </td>
                    {/* Fecha */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" style={{ color: '#9CA3AF' }} />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#737373' }}>{r.fechaEnvio}</span>
                      </div>
                    </td>
                    {/* Estado */}
                    <td className="px-5 py-4 text-right">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: cfg.bg, color: cfg.color }}>
                        <EstIcon className="w-3 h-3" />
                        {cfg.label}
                      </span>
                    </td>
                    {/* Acciones */}
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <button
                          onClick={() => { setDrawerRegistro(r); setShowRechazoInput(false); setNotaRechazo(''); }}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs transition-all"
                          style={{ border: '1px solid #E5E5E5', backgroundColor: '#FFFFFF', color: '#737373', fontFamily: 'var(--font-body)' }}
                          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
                          onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
                        >
                          <Eye className="w-3.5 h-3.5" /> Ver
                        </button>
                        {r.estado === 'pendiente' && (
                          <>
                            <button
                              onClick={() => handleRechazar(r.id)}
                              disabled={isProcesando}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs transition-all disabled:opacity-50"
                              style={{ border: '1px solid #FECACA', backgroundColor: '#FEF2F2', color: '#B91C1C', fontFamily: 'var(--font-body)' }}
                            >
                              <XCircle className="w-3.5 h-3.5" /> Rechazar
                            </button>
                            <button
                              onClick={() => handleAprobar(r.id)}
                              disabled={isProcesando}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs transition-all disabled:opacity-50"
                              style={{ backgroundColor: isProcesando ? '#C5D9A8' : '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)' }}
                            >
                              {isProcesando
                                ? <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Procesando…</>
                                : <><CheckCircle className="w-3.5 h-3.5" /> Aprobar</>
                              }
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Drawer detalle */}
      {drawerRegistro && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.35)' }} onClick={() => setDrawerRegistro(null)} />
          <div className="relative flex flex-col w-full bg-white h-full overflow-y-auto" style={{ maxWidth: '420px', boxShadow: '-4px 0 32px rgba(0,0,0,0.12)' }}>

            {/* Drawer header */}
            <div className="flex items-start justify-between p-6 flex-shrink-0" style={{ borderBottom: '1px solid #E5E5E5' }}>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ backgroundColor: drawerRegistro.tipo === 'inmobiliaria' ? '#EFF6FF' : '#F0F5EB', color: drawerRegistro.tipo === 'inmobiliaria' ? '#1D4ED8' : '#006B4E' }}>
                    {drawerRegistro.tipo === 'inmobiliaria' ? 'Inmobiliaria' : 'Broker'}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ backgroundColor: ESTADO_CONFIG[drawerRegistro.estado].bg, color: ESTADO_CONFIG[drawerRegistro.estado].color }}>
                    {drawerRegistro.estado}
                  </span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 600, color: '#0A0A0A' }}>{drawerRegistro.nombre}</h3>
              </div>
              <button onClick={() => setDrawerRegistro(null)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                <X className="w-4 h-4" style={{ color: '#737373' }} />
              </button>
            </div>

            {/* Drawer body */}
            <div className="flex-1 p-6 space-y-6">

              {/* Info básica */}
              <div className="space-y-3">
                {[
                  { icon: Mail,     label: 'Email',         value: drawerRegistro.email },
                  { icon: MapPin,   label: 'Región',        value: drawerRegistro.region },
                  { icon: Calendar, label: 'Enviado',       value: drawerRegistro.fechaEnvio },
                  ...(drawerRegistro.rut ? [{ icon: FileText, label: 'RUT', value: drawerRegistro.rut }] : []),
                  ...(drawerRegistro.representante ? [{ icon: User, label: 'Representante', value: drawerRegistro.representante }] : []),
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F5F5F5' }}>
                        <Icon className="w-3.5 h-3.5" style={{ color: '#737373' }} />
                      </div>
                      <div>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</p>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#0A0A0A' }}>{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Documentos */}
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: '#0A0A0A', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Documentos</p>
                <div className="space-y-2">
                  {drawerRegistro.documentos.map(doc => (
                    <div key={doc.nombre} className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: '#FAFAFA', border: '1px solid #F0F0F0' }}>
                      <div className="flex items-center gap-2">
                        {doc.estado === 'subido'
                          ? <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#006B4E' }} />
                          : <AlertCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#D97706' }} />
                        }
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#0A0A0A' }}>{doc.nombre}</span>
                      </div>
                      {doc.estado === 'subido' ? (
                        <button className="flex items-center gap-1 text-xs" style={{ color: '#006B4E' }}>
                          <Download className="w-3.5 h-3.5" /> Ver
                        </button>
                      ) : (
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>Faltante</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Nota si fue rechazado */}
              {drawerRegistro.nota && (
                <div className="p-4 rounded-xl" style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA' }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: '#B91C1C', marginBottom: '4px' }}>Motivo de rechazo</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#991B1B' }}>{drawerRegistro.nota}</p>
                </div>
              )}

              {/* Acciones si pendiente */}
              {drawerRegistro.estado === 'pendiente' && (
                <div className="space-y-3">
                  {showRechazoInput && (
                    <div>
                      <label style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: '#0A0A0A', display: 'block', marginBottom: '6px' }}>
                        Motivo de rechazo (opcional)
                      </label>
                      <textarea
                        rows={3}
                        value={notaRechazo}
                        onChange={e => setNotaRechazo(e.target.value)}
                        placeholder="Ej: Documentación incompleta, licencia vencida..."
                        className="w-full px-3 py-2.5 rounded-xl outline-none text-sm resize-none"
                        style={{ border: '1px solid #FECACA', fontFamily: 'var(--font-body)', fontSize: '13px', backgroundColor: '#FEF2F2' }}
                      />
                    </div>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => showRechazoInput ? handleRechazar(drawerRegistro.id) : setShowRechazoInput(true)}
                      disabled={procesando === drawerRegistro.id}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm font-medium transition-all disabled:opacity-50"
                      style={{ border: '1px solid #FECACA', backgroundColor: '#FEF2F2', color: '#B91C1C', fontFamily: 'var(--font-body)' }}
                    >
                      <XCircle className="w-4 h-4" />
                      {showRechazoInput ? 'Confirmar rechazo' : 'Rechazar'}
                    </button>
                    <button
                      onClick={() => handleAprobar(drawerRegistro.id)}
                      disabled={procesando === drawerRegistro.id}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm font-medium transition-all disabled:opacity-50"
                      style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)' }}
                    >
                      {procesando === drawerRegistro.id
                        ? <><RefreshCw className="w-4 h-4 animate-spin" /> Procesando…</>
                        : <><CheckCircle className="w-4 h-4" /> Aprobar registro</>
                      }
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
