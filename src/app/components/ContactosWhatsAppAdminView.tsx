import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, X, ChevronRight, ChevronDown, MessageSquare, CheckCircle, XCircle, Phone, Tag, Link, AlertTriangle, Copy, Check } from 'lucide-react';

type EstadoNumero = 'activo' | 'inactivo';

interface Asignacion {
  tipo: 'parcela' | 'proyecto';
  id: string;
  nombre: string;
  ubicacion: string;
}

interface NumeroWhatsApp {
  id: string;
  etiqueta: string;
  numero: string; // con código de país
  estado: EstadoNumero;
  mensaje: string;
  asignaciones: Asignacion[];
  ambito: 'inmobiliaria' | 'broker' | 'parcela';
}


const PARCELAS_MOCK = [
  { id: 'parc-1', nombre: 'Parcela Vista al Lago', ubicacion: 'Chile Chico, Aysén' },
  { id: 'parc-2', nombre: 'Parcela Río Claro Norte', ubicacion: 'San Clemente, Maule' },
  { id: 'parc-3', nombre: 'Parcela Lomas del Sur', ubicacion: 'Colbún, Maule' },
  { id: 'parc-4', nombre: 'Parcela Sector Cordillera', ubicacion: 'Pirque, RM' },
  { id: 'parc-5', nombre: 'Parcela Valle Verde', ubicacion: 'Melipilla, RM' },
];

const PROYECTOS_MOCK = [
  { id: 'proy-1', nombre: 'Proyecto Patagonia Sur', ubicacion: 'Aysén' },
  { id: 'proy-2', nombre: 'Proyecto Maule Campo', ubicacion: 'Maule' },
  { id: 'proy-3', nombre: 'Proyecto Cordillera Viva', ubicacion: 'Región Metropolitana' },
];

const MOCK_NUMEROS: NumeroWhatsApp[] = [
  {
    id: 'wa-1',
    etiqueta: 'Inmobiliaria Principal',
    numero: '+56 9 8000 1234',
    estado: 'activo',
    mensaje: 'Hola, me interesa la parcela {nombre_parcela} ubicada en {ubicacion}. ¿Podrían darme más información?',
    ambito: 'inmobiliaria',
    asignaciones: [
      { tipo: 'parcela', id: 'parc-1', nombre: 'Parcela Vista al Lago', ubicacion: 'Chile Chico, Aysén' },
      { tipo: 'parcela', id: 'parc-3', nombre: 'Parcela Lomas del Sur', ubicacion: 'Colbún, Maule' },
      { tipo: 'proyecto', id: 'proy-1', nombre: 'Proyecto Patagonia Sur', ubicacion: 'Aysén' },
    ],
  },
  {
    id: 'wa-2',
    etiqueta: 'Broker Andrés Muñoz',
    numero: '+56 9 9123 4567',
    estado: 'activo',
    mensaje: 'Buenos días, vi la {nombre_parcela} (ID: {id_parcela}) en CompraTuParcela y quisiera coordinar una visita.',
    ambito: 'broker',
    asignaciones: [
      { tipo: 'parcela', id: 'parc-2', nombre: 'Parcela Río Claro Norte', ubicacion: 'San Clemente, Maule' },
      { tipo: 'proyecto', id: 'proy-2', nombre: 'Proyecto Maule Campo', ubicacion: 'Maule' },
    ],
  },
  {
    id: 'wa-3',
    etiqueta: 'Línea Proyectos RM',
    numero: '+56 9 7654 3210',
    estado: 'activo',
    mensaje: 'Hola, me interesa el proyecto {nombre_proyecto}. ¿Tienen parcelas disponibles?',
    ambito: 'broker',
    asignaciones: [
      { tipo: 'proyecto', id: 'proy-3', nombre: 'Proyecto Cordillera Viva', ubicacion: 'RM' },
      { tipo: 'parcela', id: 'parc-4', nombre: 'Parcela Sector Cordillera', ubicacion: 'Pirque, RM' },
    ],
  },
  {
    id: 'wa-4',
    etiqueta: 'Número de respaldo',
    numero: '+56 9 5000 9999',
    estado: 'inactivo',
    mensaje: 'Hola, consulto por la parcela {nombre_parcela}.',
    ambito: 'inmobiliaria',
    asignaciones: [],
  },
];

function BadgeEstado({ estado }: { estado: EstadoNumero }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold" style={{
      backgroundColor: estado === 'activo' ? '#ECFDF5' : '#F3F4F6',
      color: estado === 'activo' ? '#065F46' : '#6B7280',
      border: `1px solid ${estado === 'activo' ? '#6EE7B7' : '#E5E5E5'}`,
      fontFamily: 'var(--font-body)',
    }}>
      {estado === 'activo' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
      {estado === 'activo' ? 'Activo' : 'Inactivo'}
    </span>
  );
}

function MensajePreview({ mensaje }: { mensaje: string }) {
  const preview = mensaje.length > 60 ? mensaje.slice(0, 60) + '…' : mensaje;
  return (
    <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF', fontStyle: 'italic' }}>
      "{preview}"
    </span>
  );
}

const TODAS_LAS_PUBLICACIONES: Asignacion[] = [
  ...PARCELAS_MOCK.map(p => ({ tipo: 'parcela' as const, id: p.id, nombre: p.nombre, ubicacion: p.ubicacion })),
  ...PROYECTOS_MOCK.map(p => ({ tipo: 'proyecto' as const, id: p.id, nombre: p.nombre, ubicacion: p.ubicacion })),
];

function NumeroModal({ numero, onClose, onGuardar }: {
  numero: NumeroWhatsApp | null;
  onClose: () => void;
  onGuardar: (data: Partial<NumeroWhatsApp>) => void;
}) {
  const [etiqueta, setEtiqueta] = useState(numero?.etiqueta || '');
  const [tel, setTel] = useState(numero?.numero || '+56 9 ');
  const [estado, setEstado] = useState<EstadoNumero>(numero?.estado || 'activo');
  const [mensaje, setMensaje] = useState(numero?.mensaje || 'Hola, me interesa la parcela {nombre_parcela} ubicada en {ubicacion}. ¿Me pueden dar más información?');

  const [asignacionesOpen, setAsignacionesOpen] = useState(false);
  const [busquedaPublicaciones, setBusquedaPublicaciones] = useState('');
  const [seleccionadas, setSeleccionadas] = useState<Set<string>>(
    new Set(numero?.asignaciones.map(a => a.id) || [])
  );

  const publicacionesFiltradas = TODAS_LAS_PUBLICACIONES.filter(p =>
    p.nombre.toLowerCase().includes(busquedaPublicaciones.toLowerCase()) ||
    p.ubicacion.toLowerCase().includes(busquedaPublicaciones.toLowerCase())
  );

  const toggleSeleccion = (id: string) => {
    setSeleccionadas(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const puedeGuardar = etiqueta.trim() && tel.trim().length > 6;

  const handleGuardar = () => {
    if (!puedeGuardar) return;
    const asignaciones = TODAS_LAS_PUBLICACIONES.filter(p => seleccionadas.has(p.id));
    onGuardar({ etiqueta, numero: tel, estado, mensaje, asignaciones });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-white px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: '#E5E5E5' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'var(--font-size-body-lg)', color: '#0A0A0A' }}>
            {numero ? 'Editar número' : 'Agregar número'}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4" style={{ color: '#6B7280' }} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Etiqueta */}
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
              Nombre / etiqueta <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <input type="text" value={etiqueta} onChange={e => setEtiqueta(e.target.value)}
              placeholder="Ej: Broker Andrés, Inmobiliaria Principal"
              className="w-full px-4 py-2.5 rounded-lg text-sm"
              style={{ border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA', color: '#0A0A0A', outline: 'none', fontFamily: 'var(--font-body)' }} />
          </div>

          {/* Número */}
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
              Número de WhatsApp <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <input type="text" value={tel} onChange={e => setTel(e.target.value)}
              placeholder="+56 9 1234 5678"
              className="w-full px-4 py-2.5 rounded-lg text-sm"
              style={{ border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA', color: '#0A0A0A', outline: 'none', fontFamily: 'var(--font-body)' }} />
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF', marginTop: '4px' }}>
              Incluir código de país. Ej: +56 para Chile.
            </p>
          </div>

          {/* Estado */}
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
              Estado
            </label>
            <div className="flex gap-3">
              {(['activo', 'inactivo'] as EstadoNumero[]).map(e => (
                <button key={e} onClick={() => setEstado(e)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{
                    backgroundColor: estado === e ? (e === 'activo' ? '#ECFDF5' : '#F3F4F6') : '#FAFAFA',
                    color: estado === e ? (e === 'activo' ? '#065F46' : '#374151') : '#9CA3AF',
                    border: `1px solid ${estado === e ? (e === 'activo' ? '#6EE7B7' : '#D1D5DB') : '#E5E5E5'}`,
                    fontFamily: 'var(--font-body)',
                  }}>
                  {e === 'activo' ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                  {e === 'activo' ? 'Activo' : 'Inactivo'}
                </button>
              ))}
            </div>
          </div>

          {/* Mensaje predeterminado */}
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
              Mensaje predeterminado
            </label>
            <textarea value={mensaje} onChange={e => setMensaje(e.target.value)} rows={3}
              className="w-full px-4 py-2.5 rounded-lg text-sm resize-none"
              style={{ border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA', color: '#0A0A0A', outline: 'none', fontFamily: 'var(--font-body)', lineHeight: '1.6' }} />
          </div>

          {/* Asignar publicaciones — colapsable */}
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #E5E5E5' }}>
            <button
              onClick={() => setAsignacionesOpen(prev => !prev)}
              className="w-full flex items-center justify-between px-4 py-3 transition-colors"
              style={{ backgroundColor: asignacionesOpen ? '#F9FAFB' : '#FFFFFF' }}
            >
              <div className="flex items-center gap-2">
                <Link className="w-4 h-4" style={{ color: '#006B4E' }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#111827' }}>
                  Asignar a publicaciones
                </span>
                {seleccionadas.size > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: '#EBFEF5', color: '#006B4E', fontFamily: 'var(--font-body)' }}>
                    {seleccionadas.size} seleccionada(s)
                  </span>
                )}
              </div>
              {asignacionesOpen
                ? <ChevronDown className="w-4 h-4" style={{ color: '#6B7280' }} />
                : <ChevronRight className="w-4 h-4" style={{ color: '#6B7280' }} />
              }
            </button>

            {asignacionesOpen && (
              <div style={{ borderTop: '1px solid #E5E5E5' }}>
                {/* Búsqueda */}
                <div className="px-4 py-3" style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }} />
                    <input type="text" placeholder="Buscar parcela o proyecto..." value={busquedaPublicaciones}
                      onChange={e => setBusquedaPublicaciones(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 rounded-lg text-sm"
                      style={{ border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA', color: '#0A0A0A', outline: 'none', fontFamily: 'var(--font-body)' }} />
                  </div>
                </div>

                {/* Checklist */}
                <div className="max-h-48 overflow-y-auto">
                  {publicacionesFiltradas.map((pub, i) => {
                    const checked = seleccionadas.has(pub.id);
                    return (
                      <label key={pub.id}
                        className="flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors"
                        style={{ borderBottom: i < publicacionesFiltradas.length - 1 ? '1px solid #F9FAFB' : 'none', backgroundColor: checked ? '#F0FDF4' : '#FFFFFF' }}
                        onMouseEnter={e => { if (!checked) e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = checked ? '#F0FDF4' : '#FFFFFF'; }}
                      >
                        <div className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all"
                          style={{ backgroundColor: checked ? '#006B4E' : '#FFFFFF', border: `2px solid ${checked ? '#006B4E' : '#D1D5DB'}` }}
                          onClick={() => toggleSeleccion(pub.id)}>
                          {checked && <Check className="w-2.5 h-2.5" style={{ color: '#FFFFFF' }} />}
                        </div>
                        <input type="checkbox" className="hidden" checked={checked} onChange={() => toggleSeleccion(pub.id)} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="px-1.5 py-0.5 rounded text-xs font-medium flex-shrink-0" style={{
                              backgroundColor: pub.tipo === 'parcela' ? '#EFF6FF' : '#F5F3FF',
                              color: pub.tipo === 'parcela' ? '#1E40AF' : '#5B21B6',
                              fontFamily: 'var(--font-body)',
                            }}>
                              {pub.tipo === 'parcela' ? 'Parcela' : 'Proyecto'}
                            </span>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#111827' }}>{pub.nombre}</p>
                          </div>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF' }}>{pub.ubicacion}</p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex gap-3" style={{ borderColor: '#E5E5E5' }}>
          <button onClick={onClose} className="flex-1 py-2.5 rounded-full text-sm font-medium"
            style={{ backgroundColor: '#F5F5F5', color: '#374151', fontFamily: 'var(--font-body)' }}>
            Cancelar
          </button>
          <button onClick={handleGuardar} disabled={!puedeGuardar}
            className="flex-1 py-2.5 rounded-full text-sm font-medium transition-all"
            style={{ backgroundColor: puedeGuardar ? '#006B4E' : '#E5E5E5', color: puedeGuardar ? '#FFFFFF' : '#9CA3AF', fontFamily: 'var(--font-body)', cursor: puedeGuardar ? 'pointer' : 'not-allowed' }}
            onMouseEnter={e => { if (puedeGuardar) e.currentTarget.style.backgroundColor = '#01533E'; }}
            onMouseLeave={e => { if (puedeGuardar) e.currentTarget.style.backgroundColor = '#006B4E'; }}>
            {numero ? 'Guardar cambios' : 'Agregar número'}
          </button>
        </div>
      </div>
    </div>
  );
}

function AsignacionModal({ numero, onClose, onAsignar }: {
  numero: NumeroWhatsApp;
  onClose: () => void;
  onAsignar: (asignacion: Asignacion) => void;
}) {
  const [tipo, setTipo] = useState<'parcela' | 'proyecto'>('parcela');
  const [busqueda, setBusqueda] = useState('');
  const lista = tipo === 'parcela' ? PARCELAS_MOCK : PROYECTOS_MOCK;
  const yaAsignados = numero.asignaciones.map(a => a.id);
  const filtrada = lista.filter(i =>
    !yaAsignados.includes(i.id) &&
    (i.nombre.toLowerCase().includes(busqueda.toLowerCase()) || i.ubicacion.toLowerCase().includes(busqueda.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: '#E5E5E5' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'var(--font-size-body-lg)', color: '#0A0A0A' }}>
            Asignar a parcela o proyecto
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100"><X className="w-4 h-4" style={{ color: '#6B7280' }} /></button>
        </div>

        <div className="p-5 space-y-4">
          {/* Tipo */}
          <div className="flex gap-2">
            {(['parcela', 'proyecto'] as const).map(t => (
              <button key={t} onClick={() => { setTipo(t); setBusqueda(''); }}
                className="flex-1 py-2 rounded-lg text-sm font-medium transition-all capitalize"
                style={{
                  backgroundColor: tipo === t ? '#006B4E' : '#F5F5F5',
                  color: tipo === t ? '#FFFFFF' : '#6B7280',
                  fontFamily: 'var(--font-body)',
                }}>
                {t === 'parcela' ? 'Parcela' : 'Proyecto'}
              </button>
            ))}
          </div>

          {/* Búsqueda */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }} />
            <input type="text" placeholder="Buscar..." value={busqueda} onChange={e => setBusqueda(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg text-sm"
              style={{ border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA', color: '#0A0A0A', outline: 'none', fontFamily: 'var(--font-body)' }} />
          </div>

          {/* Lista */}
          <div className="rounded-xl overflow-hidden max-h-64 overflow-y-auto" style={{ border: '1px solid #E5E5E5' }}>
            {filtrada.length === 0 ? (
              <p className="py-6 text-center" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#9CA3AF' }}>
                No hay resultados o ya están asignados.
              </p>
            ) : filtrada.map((item, i) => (
              <button key={item.id} onClick={() => onAsignar({ tipo, id: item.id, nombre: item.nombre, ubicacion: item.ubicacion })}
                className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors hover:bg-gray-50"
                style={{ borderBottom: i < filtrada.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#111827' }}>{item.nombre}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF' }}>{item.ubicacion}</p>
                </div>
                <Plus className="w-4 h-4 flex-shrink-0" style={{ color: '#006B4E' }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DetalleDrawer({ numero, onClose, onEditar, onEliminarAsignacion, onAgregarAsignacion }: {
  numero: NumeroWhatsApp;
  onClose: () => void;
  onEditar: () => void;
  onEliminarAsignacion: (id: string) => void;
  onAgregarAsignacion: () => void;
}) {
  const waLink = `https://wa.me/${numero.numero.replace(/\D/g, '')}?text=${encodeURIComponent(numero.mensaje)}`;

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-[440px] bg-white z-50 flex flex-col shadow-2xl">
        <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: '#E5E5E5' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'var(--font-size-body-lg)', color: '#0A0A0A' }}>
            Detalle del número
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4" style={{ color: '#6B7280' }} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Info principal */}
          <div className="rounded-xl p-4 space-y-3" style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E5E5' }}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF', marginBottom: '2px' }}>Etiqueta</p>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'var(--font-size-body-lg)', color: '#0A0A0A' }}>{numero.etiqueta}</p>
              </div>
              <BadgeEstado estado={numero.estado} />
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 flex-shrink-0" style={{ color: '#6B7280' }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#111827', fontWeight: 500 }}>{numero.numero}</span>
            </div>
            <a href={waLink} target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 text-xs"
              style={{ color: '#006B4E', fontFamily: 'var(--font-body)', textDecoration: 'none' }}>
              <Link className="w-3.5 h-3.5" /> Probar link de WhatsApp
            </a>
          </div>

          {/* Mensaje */}
          <div className="space-y-2">
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Mensaje predeterminado
            </p>
            <div className="px-4 py-3 rounded-xl" style={{ backgroundColor: '#EBFEF5', border: '1px solid #A7F3D0' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#065F46', lineHeight: '1.6', fontStyle: 'italic' }}>
                "{numero.mensaje}"
              </p>
            </div>
          </div>

          {/* Asignaciones */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Parcelas y proyectos asignados ({numero.asignaciones.length})
              </p>
              <button onClick={onAgregarAsignacion}
                className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full transition-all"
                style={{ backgroundColor: '#EBFEF5', color: '#006B4E', border: '1px solid #A7F3D0', fontFamily: 'var(--font-body)' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#D1FAE5'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#EBFEF5'}>
                <Plus className="w-3 h-3" /> Asignar
              </button>
            </div>

            {numero.asignaciones.length === 0 ? (
              <div className="py-6 text-center rounded-xl" style={{ backgroundColor: '#F9FAFB', border: '1px dashed #E5E5E5' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#9CA3AF' }}>
                  Sin asignaciones. Este número no se muestra en ninguna ficha.
                </p>
              </div>
            ) : (
              <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #E5E5E5' }}>
                {numero.asignaciones.map((a, i) => (
                  <div key={a.id} className="flex items-center justify-between px-4 py-3"
                    style={{ borderBottom: i < numero.asignaciones.length - 1 ? '1px solid #F3F4F6' : 'none', backgroundColor: i % 2 === 0 ? '#FAFAFA' : '#FFFFFF' }}>
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="px-1.5 py-0.5 rounded text-xs font-medium" style={{
                          backgroundColor: a.tipo === 'parcela' ? '#EFF6FF' : '#F5F3FF',
                          color: a.tipo === 'parcela' ? '#1E40AF' : '#5B21B6',
                          fontFamily: 'var(--font-body)',
                        }}>
                          {a.tipo === 'parcela' ? 'Parcela' : 'Proyecto'}
                        </span>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#111827' }}>{a.nombre}</p>
                      </div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF' }}>{a.ubicacion}</p>
                    </div>
                    <button onClick={() => onEliminarAsignacion(a.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                      title="Desasignar">
                      <X className="w-3.5 h-3.5" style={{ color: '#9CA3AF' }} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex gap-3" style={{ borderColor: '#E5E5E5' }}>
          <button onClick={onEditar}
            className="flex-1 py-2.5 rounded-full text-sm font-medium flex items-center justify-center gap-2 transition-all"
            style={{ backgroundColor: '#F5F5F5', color: '#374151', fontFamily: 'var(--font-body)' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#E5E5E5'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#F5F5F5'}>
            <Edit2 className="w-3.5 h-3.5" /> Editar
          </button>
        </div>
      </div>
    </>
  );
}

function EliminarModal({ numero, onClose, onConfirmar }: {
  numero: NumeroWhatsApp;
  onClose: () => void;
  onConfirmar: (id: string) => void;
}) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FEE2E2' }}>
            <Trash2 className="w-5 h-5" style={{ color: '#DC2626' }} />
          </div>
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'var(--font-size-body-lg)', color: '#0A0A0A' }}>Eliminar número</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#6B7280' }}>{numero.etiqueta}</p>
          </div>
        </div>
        {numero.asignaciones.length > 0 && (
          <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl" style={{ backgroundColor: '#FEF3C7', border: '1px solid #FDE68A' }}>
            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#D97706' }} />
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#92400E', lineHeight: '1.5' }}>
              Este número está asignado a <strong>{numero.asignaciones.length} parcela(s)/proyecto(s)</strong>. Al eliminarlo, esas fichas quedarán sin número de WhatsApp específico.
            </p>
          </div>
        )}
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#374151' }}>
          Esta acción no se puede deshacer.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-full text-sm font-medium"
            style={{ backgroundColor: '#F5F5F5', color: '#374151', fontFamily: 'var(--font-body)' }}>
            Cancelar
          </button>
          <button onClick={() => onConfirmar(numero.id)}
            className="flex-1 py-2.5 rounded-full text-sm font-medium transition-all"
            style={{ backgroundColor: '#DC2626', color: '#FFFFFF', fontFamily: 'var(--font-body)' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#B91C1C'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#DC2626'}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export function ContactosWhatsAppAdminView() {
  const [numeros, setNumeros] = useState<NumeroWhatsApp[]>(MOCK_NUMEROS);
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<'todos' | 'activo' | 'inactivo'>('todos');
  const [detalleAbierto, setDetalleAbierto] = useState<NumeroWhatsApp | null>(null);
  const [editando, setEditando] = useState<NumeroWhatsApp | null | 'nuevo'>('');
  const [eliminando, setEliminando] = useState<NumeroWhatsApp | null>(null);
  const [asignando, setAsignando] = useState<NumeroWhatsApp | null>(null);

  const activos = numeros.filter(n => n.estado === 'activo').length;
  const inactivos = numeros.filter(n => n.estado === 'inactivo').length;
  const sinAsignar = numeros.filter(n => n.asignaciones.length === 0).length;

  const filtrados = numeros.filter(n => {
    const matchBusqueda = !busqueda || n.etiqueta.toLowerCase().includes(busqueda.toLowerCase()) || n.numero.includes(busqueda);
    const matchEstado = filtroEstado === 'todos' || n.estado === filtroEstado;
    return matchBusqueda && matchEstado;
  });

  const handleGuardar = (data: Partial<NumeroWhatsApp>) => {
    if (editando === 'nuevo') {
      const nuevo: NumeroWhatsApp = {
        id: `wa-${Date.now()}`,
        etiqueta: data.etiqueta || '',
        numero: data.numero || '',
        estado: data.estado || 'activo',
        mensaje: data.mensaje || '',
        ambito: 'inmobiliaria',
        asignaciones: [],
      };
      setNumeros(prev => [...prev, nuevo]);
    } else if (editando) {
      setNumeros(prev => prev.map(n => n.id === editando.id ? { ...n, ...data } : n));
      if (detalleAbierto?.id === editando.id) setDetalleAbierto(prev => prev ? { ...prev, ...data } : prev);
    }
    setEditando('');
  };

  const handleEliminar = (id: string) => {
    setNumeros(prev => prev.filter(n => n.id !== id));
    setEliminando(null);
    setDetalleAbierto(null);
  };

  const handleEliminarAsignacion = (numeroId: string, asignacionId: string) => {
    setNumeros(prev => prev.map(n =>
      n.id === numeroId ? { ...n, asignaciones: n.asignaciones.filter(a => a.id !== asignacionId) } : n
    ));
    setDetalleAbierto(prev => prev?.id === numeroId
      ? { ...prev, asignaciones: prev.asignaciones.filter(a => a.id !== asignacionId) }
      : prev
    );
  };

  const handleAgregarAsignacion = (numeroId: string, asignacion: Asignacion) => {
    setNumeros(prev => prev.map(n =>
      n.id === numeroId ? { ...n, asignaciones: [...n.asignaciones, asignacion] } : n
    ));
    setDetalleAbierto(prev => prev?.id === numeroId
      ? { ...prev, asignaciones: [...prev.asignaciones, asignacion] }
      : prev
    );
    setAsignando(null);
  };

  const cardStyle = { backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total números', value: numeros.length, color: '#0A0A0A' },
          { label: 'Activos', value: activos, color: '#065F46' },
          { label: 'Inactivos', value: inactivos, color: '#6B7280' },
          { label: 'Sin asignar', value: sinAsignar, color: '#D97706' },
        ].map(stat => (
          <div key={stat.label} className="rounded-2xl p-5" style={cardStyle}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', marginBottom: '8px' }}>{stat.label}</p>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: stat.color }} />
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 600, color: stat.color, lineHeight: 1 }}>{stat.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex gap-1 p-1 rounded-lg" style={{ backgroundColor: '#F5F5F5' }}>
          {([['todos', 'Todos'], ['activo', 'Activos'], ['inactivo', 'Inactivos']] as const).map(([id, label]) => (
            <button key={id} onClick={() => setFiltroEstado(id)}
              className="px-3 py-1.5 rounded-md text-sm font-medium transition-all"
              style={{
                backgroundColor: filtroEstado === id ? '#FFFFFF' : 'transparent',
                color: filtroEstado === id ? '#006B4E' : '#6B7280',
                fontFamily: 'var(--font-body)',
                boxShadow: filtroEstado === id ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              }}>
              {label}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }} />
            <input type="text" placeholder="Buscar etiqueta o número..." value={busqueda} onChange={e => setBusqueda(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-lg text-sm"
              style={{ border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA', color: '#0A0A0A', outline: 'none', fontFamily: 'var(--font-body)', width: '220px' }} />
          </div>
          <button onClick={() => setEditando('nuevo')}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all"
            style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#01533E'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#006B4E'}>
            <Plus className="w-4 h-4" /> Agregar número
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="rounded-2xl overflow-hidden" style={cardStyle}>
        {/* Header */}
        <div className="grid grid-cols-12 px-5 py-3" style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E5E5' }}>
          {['Etiqueta', 'Número', 'Estado', 'Asignaciones', 'Mensaje', ''].map((h, i) => (
            <div key={i} className={['col-span-3', 'col-span-2', 'col-span-1', 'col-span-2', 'col-span-3', 'col-span-1'][i]}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</span>
            </div>
          ))}
        </div>

        {filtrados.length === 0 ? (
          <div className="py-12 text-center">
            <p style={{ fontFamily: 'var(--font-body)', color: '#9CA3AF' }}>No hay números con este filtro.</p>
          </div>
        ) : filtrados.map((n, idx) => (
          <div key={n.id}
            className="grid grid-cols-12 px-5 py-3.5 items-center cursor-pointer transition-colors"
            style={{ borderBottom: idx < filtrados.length - 1 ? '1px solid #F3F4F6' : 'none', backgroundColor: '#FFFFFF' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FAFAFA'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}
            onClick={() => setDetalleAbierto(n)}>

            {/* Etiqueta */}
            <div className="col-span-3 pr-2 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#EBFEF5' }}>
                <MessageSquare className="w-4 h-4" style={{ color: '#006B4E' }} />
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#111827' }}>{n.etiqueta}</p>
            </div>

            {/* Número */}
            <div className="col-span-2">
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#374151' }}>{n.numero}</p>
            </div>

            {/* Estado */}
            <div className="col-span-1">
              <BadgeEstado estado={n.estado} />
            </div>

            {/* Asignaciones */}
            <div className="col-span-2">
              <span className="flex items-center gap-1" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: n.asignaciones.length > 0 ? '#374151' : '#9CA3AF' }}>
                <Link className="w-3.5 h-3.5" />
                {n.asignaciones.length > 0 ? `${n.asignaciones.length} asignado(s)` : 'Sin asignar'}
              </span>
            </div>

            {/* Mensaje */}
            <div className="col-span-3 pr-2">
              <MensajePreview mensaje={n.mensaje} />
            </div>

            {/* Acciones */}
            <div className="col-span-1 flex items-center justify-end gap-1" onClick={e => e.stopPropagation()}>
              <button onClick={() => { setEditando(n); setDetalleAbierto(null); }}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors" title="Editar">
                <Edit2 className="w-3.5 h-3.5" style={{ color: '#6B7280' }} />
              </button>
              <button onClick={() => setEliminando(n)}
                className="p-1.5 rounded-lg hover:bg-red-50 transition-colors" title="Eliminar">
                <Trash2 className="w-3.5 h-3.5" style={{ color: '#9CA3AF' }} />
              </button>
              <ChevronRight className="w-4 h-4" style={{ color: '#006B4E' }} />
            </div>
          </div>
        ))}
      </div>

      {/* Drawer detalle */}
      {detalleAbierto && (
        <DetalleDrawer
          numero={detalleAbierto}
          onClose={() => setDetalleAbierto(null)}
          onEditar={() => { setEditando(detalleAbierto); setDetalleAbierto(null); }}
          onEliminarAsignacion={(asigId) => handleEliminarAsignacion(detalleAbierto.id, asigId)}
          onAgregarAsignacion={() => setAsignando(detalleAbierto)}
        />
      )}

      {/* Modal agregar/editar */}
      {editando !== '' && (
        <NumeroModal
          numero={editando === 'nuevo' ? null : editando as NumeroWhatsApp}
          onClose={() => setEditando('')}
          onGuardar={handleGuardar}
        />
      )}

      {/* Modal eliminar */}
      {eliminando && (
        <EliminarModal
          numero={eliminando}
          onClose={() => setEliminando(null)}
          onConfirmar={handleEliminar}
        />
      )}

      {/* Modal asignar */}
      {asignando && (
        <AsignacionModal
          numero={asignando}
          onClose={() => setAsignando(null)}
          onAsignar={(asignacion) => handleAgregarAsignacion(asignando.id, asignacion)}
        />
      )}
    </div>
  );
}
