import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, X, ChevronRight, ChevronDown, DollarSign, Link, Check, AlertTriangle } from 'lucide-react';

interface Asignacion {
  tipo: 'parcela' | 'proyecto';
  id: string;
  nombre: string;
  ubicacion: string;
}

interface MontoReserva {
  id: string;
  etiqueta: string;
  montoCLP: string;
  montoUF: string;
  asignaciones: Asignacion[];
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

const TODAS_LAS_PUBLICACIONES: Asignacion[] = [
  ...PARCELAS_MOCK.map(p => ({ tipo: 'parcela' as const, id: p.id, nombre: p.nombre, ubicacion: p.ubicacion })),
  ...PROYECTOS_MOCK.map(p => ({ tipo: 'proyecto' as const, id: p.id, nombre: p.nombre, ubicacion: p.ubicacion })),
];

const MOCK_MONTOS: MontoReserva[] = [
  {
    id: 'mr-1',
    etiqueta: 'Valor Región Valparaíso',
    montoCLP: '500000',
    montoUF: '12.9',
    asignaciones: [
      { tipo: 'parcela', id: 'parc-1', nombre: 'Parcela Vista al Lago', ubicacion: 'Chile Chico, Aysén' },
      { tipo: 'parcela', id: 'parc-3', nombre: 'Parcela Lomas del Sur', ubicacion: 'Colbún, Maule' },
      { tipo: 'proyecto', id: 'proy-1', nombre: 'Proyecto Patagonia Sur', ubicacion: 'Aysén' },
    ],
  },
  {
    id: 'mr-2',
    etiqueta: 'Valor estándar',
    montoCLP: '100000',
    montoUF: '2.6',
    asignaciones: [
      { tipo: 'proyecto', id: 'proy-3', nombre: 'Proyecto Cordillera Viva', ubicacion: 'RM' },
      { tipo: 'parcela', id: 'parc-4', nombre: 'Parcela Sector Cordillera', ubicacion: 'Pirque, RM' },
    ],
  },
  {
    id: 'mr-3',
    etiqueta: 'Parcelas pequeñas',
    montoCLP: '200000',
    montoUF: '5.2',
    asignaciones: [],
  },
];

function formatCLP(value: string) {
  const n = Number(value.replace(/\D/g, ''));
  if (isNaN(n)) return value;
  return n.toLocaleString('es-CL');
}

// Modal simplificado — solo edita el valor del monto por defecto
function DefaultValueModal({ montoCLP, montoUF, onClose, onGuardar }: {
  montoCLP: string;
  montoUF: string;
  onClose: () => void;
  onGuardar: (montoCLP: string, montoUF: string) => void;
}) {
  const [clp, setClp] = useState(montoCLP);
  const [uf, setUf] = useState(montoUF);
  const puedeGuardar = clp.trim() && uf.trim();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm" onClick={e => e.stopPropagation()}>
        <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: '#E5E5E5' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'var(--font-size-body-lg)', color: '#0A0A0A' }}>
              Editar valor por defecto
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF', marginTop: '2px' }}>
              Se aplica a publicaciones sin valor asignado
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4" style={{ color: '#6B7280' }} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                Monto en CLP <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', fontWeight: 600 }}>$</span>
                <input type="text" value={clp} onChange={e => setClp(e.target.value.replace(/[^0-9]/g, ''))} placeholder="50000"
                  className="w-full pl-7 pr-4 py-2.5 rounded-lg text-sm"
                  style={{ border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA', color: '#0A0A0A', outline: 'none', fontFamily: 'var(--font-body)' }} />
              </div>
              {clp && <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF', marginTop: '4px' }}>${formatCLP(clp)}</p>}
            </div>
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                Monto en UF <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', fontWeight: 600 }}>UF</span>
                <input type="text" value={uf} onChange={e => setUf(e.target.value.replace(/[^0-9.,]/g, ''))} placeholder="1.3"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm"
                  style={{ border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA', color: '#0A0A0A', outline: 'none', fontFamily: 'var(--font-body)' }} />
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t flex gap-3" style={{ borderColor: '#E5E5E5' }}>
          <button onClick={onClose} className="flex-1 py-2.5 rounded-full text-sm font-medium"
            style={{ backgroundColor: '#F5F5F5', color: '#374151', fontFamily: 'var(--font-body)' }}>
            Cancelar
          </button>
          <button onClick={() => { if (puedeGuardar) onGuardar(clp, uf); }} disabled={!puedeGuardar}
            className="flex-1 py-2.5 rounded-full text-sm font-medium transition-all"
            style={{ backgroundColor: puedeGuardar ? '#006B4E' : '#E5E5E5', color: puedeGuardar ? '#FFFFFF' : '#9CA3AF', fontFamily: 'var(--font-body)', cursor: puedeGuardar ? 'pointer' : 'not-allowed' }}>
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}

function MontoModal({ monto, todosLosMontos, onClose, onGuardar }: {
  monto: MontoReserva | null;
  todosLosMontos: MontoReserva[];
  onClose: () => void;
  onGuardar: (data: Partial<MontoReserva>) => void;
}) {
  const [etiqueta, setEtiqueta] = useState(monto?.etiqueta || '');
  const [montoCLP, setMontoCLP] = useState(monto?.montoCLP || '');
  const [montoUF, setMontoUF] = useState(monto?.montoUF || '');
  const [asignacionesOpen, setAsignacionesOpen] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [seleccionadas, setSeleccionadas] = useState<Set<string>>(
    new Set(monto?.asignaciones.map(a => a.id) || [])
  );

  const asignadaEn = React.useMemo(() => {
    const map = new Map<string, string>();
    for (const m of todosLosMontos) {
      if (monto && m.id === monto.id) continue;
      for (const a of m.asignaciones) {
        map.set(a.id, m.etiqueta);
      }
    }
    return map;
  }, [todosLosMontos, monto]);

  const filtradas = TODAS_LAS_PUBLICACIONES.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.ubicacion.toLowerCase().includes(busqueda.toLowerCase())
  );

  const toggleSeleccion = (id: string) => {
    setSeleccionadas(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const puedeGuardar = etiqueta.trim() && montoCLP.trim() && montoUF.trim();

  const handleGuardar = () => {
    if (!puedeGuardar) return;
    const asignaciones = TODAS_LAS_PUBLICACIONES.filter(p => seleccionadas.has(p.id));
    onGuardar({ etiqueta, montoCLP, montoUF, asignaciones });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: '#E5E5E5' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'var(--font-size-body-lg)', color: '#0A0A0A' }}>
            {monto ? 'Editar valor de reserva' : 'Agregar valor de reserva'}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4" style={{ color: '#6B7280' }} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
              Nombre / etiqueta <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <input type="text" value={etiqueta} onChange={e => setEtiqueta(e.target.value)} placeholder="Ej: Valor estándar, Proyectos premium"
              className="w-full px-4 py-2.5 rounded-lg text-sm"
              style={{ border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA', color: '#0A0A0A', outline: 'none', fontFamily: 'var(--font-body)' }} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                Monto en CLP <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', fontWeight: 600 }}>$</span>
                <input type="text" value={montoCLP} onChange={e => setMontoCLP(e.target.value.replace(/[^0-9]/g, ''))} placeholder="500000"
                  className="w-full pl-7 pr-4 py-2.5 rounded-lg text-sm"
                  style={{ border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA', color: '#0A0A0A', outline: 'none', fontFamily: 'var(--font-body)' }} />
              </div>
              {montoCLP && <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF', marginTop: '4px' }}>${formatCLP(montoCLP)}</p>}
            </div>
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                Monto en UF <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', fontWeight: 600 }}>UF</span>
                <input type="text" value={montoUF} onChange={e => setMontoUF(e.target.value.replace(/[^0-9.,]/g, ''))} placeholder="12.9"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm"
                  style={{ border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA', color: '#0A0A0A', outline: 'none', fontFamily: 'var(--font-body)' }} />
              </div>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #E5E5E5' }}>
            <button onClick={() => setAsignacionesOpen(prev => !prev)}
              className="w-full flex items-center justify-between px-4 py-3 transition-colors"
              style={{ backgroundColor: asignacionesOpen ? '#F9FAFB' : '#FFFFFF' }}>
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
                : <ChevronRight className="w-4 h-4" style={{ color: '#6B7280' }} />}
            </button>

            {asignacionesOpen && (
              <div style={{ borderTop: '1px solid #E5E5E5' }}>
                <div className="px-4 py-3" style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }} />
                    <input type="text" placeholder="Buscar parcela o proyecto..." value={busqueda} onChange={e => setBusqueda(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 rounded-lg text-sm"
                      style={{ border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA', color: '#0A0A0A', outline: 'none', fontFamily: 'var(--font-body)' }} />
                  </div>
                </div>
                <div className="max-h-48 overflow-y-auto">
                  {filtradas.map((pub, i) => {
                    const checked = seleccionadas.has(pub.id);
                    const conflicto = asignadaEn.get(pub.id);
                    return (
                      <label key={pub.id} className="flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors"
                        style={{ borderBottom: i < filtradas.length - 1 ? '1px solid #F9FAFB' : 'none', backgroundColor: checked ? '#F0FDF4' : '#FFFFFF' }}
                        onMouseEnter={e => { if (!checked) e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = checked ? '#F0FDF4' : '#FFFFFF'; }}>
                        <div className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all"
                          style={{ backgroundColor: checked ? '#006B4E' : '#FFFFFF', border: `2px solid ${checked ? '#006B4E' : '#D1D5DB'}` }}
                          onClick={() => toggleSeleccion(pub.id)}>
                          {checked && <Check className="w-2.5 h-2.5" style={{ color: '#FFFFFF' }} />}
                        </div>
                        <input type="checkbox" className="hidden" checked={checked} onChange={() => toggleSeleccion(pub.id)} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="px-1.5 py-0.5 rounded text-xs font-medium flex-shrink-0" style={{
                              backgroundColor: pub.tipo === 'parcela' ? '#EFF6FF' : '#F5F3FF',
                              color: pub.tipo === 'parcela' ? '#1E40AF' : '#5B21B6',
                              fontFamily: 'var(--font-body)',
                            }}>
                              {pub.tipo === 'parcela' ? 'Parcela' : 'Proyecto'}
                            </span>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#111827' }}>{pub.nombre}</p>
                            {conflicto && !checked && (
                              <span className="px-2 py-0.5 rounded-full text-xs flex-shrink-0" style={{ backgroundColor: '#FEF3C7', color: '#92400E', fontFamily: 'var(--font-body)' }}>
                                ya en "{conflicto}"
                              </span>
                            )}
                            {conflicto && checked && (
                              <span className="px-2 py-0.5 rounded-full text-xs flex-shrink-0" style={{ backgroundColor: '#FEF3C7', color: '#92400E', fontFamily: 'var(--font-body)' }}>
                                reemplaza a "{conflicto}"
                              </span>
                            )}
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
            {monto ? 'Guardar cambios' : 'Agregar valor'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ConfirmDeleteModal({ etiqueta, onConfirm, onClose }: {
  etiqueta: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FEF2F2' }}>
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'var(--font-size-body-lg)', color: '#0A0A0A' }}>Eliminar valor</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#6B7280', marginTop: '2px' }}>
              ¿Eliminar <strong>"{etiqueta}"</strong>? Esta acción no se puede deshacer.
            </p>
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-full text-sm font-medium"
            style={{ backgroundColor: '#F5F5F5', color: '#374151', fontFamily: 'var(--font-body)' }}>
            Cancelar
          </button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-full text-sm font-medium"
            style={{ backgroundColor: '#DC2626', color: '#FFFFFF', fontFamily: 'var(--font-body)' }}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

type Tab = 'todos' | 'con-asignaciones' | 'sin-asignar';

export function MontosReservaAdminView() {
  const [montos, setMontos] = useState<MontoReserva[]>(MOCK_MONTOS);
  const [defaultCLP, setDefaultCLP] = useState('50000');
  const [defaultUF, setDefaultUF] = useState('1.3');
  const [busqueda, setBusqueda] = useState('');
  const [tab, setTab] = useState<Tab>('todos');
  const [modalMonto, setModalMonto] = useState<MontoReserva | null | 'new'>(null);
  const [editandoDefault, setEditandoDefault] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<MontoReserva | null>(null);

  const filtrados = montos
    .filter(m => {
      if (tab === 'con-asignaciones') return m.asignaciones.length > 0;
      if (tab === 'sin-asignar') return m.asignaciones.length === 0;
      return true;
    })
    .filter(m =>
      m.etiqueta.toLowerCase().includes(busqueda.toLowerCase()) ||
      m.asignaciones.some(a => a.nombre.toLowerCase().includes(busqueda.toLowerCase()))
    );

  const handleGuardar = (data: Partial<MontoReserva>) => {
    const nuevasAsignaciones = new Set((data.asignaciones || []).map(a => a.id));
    const idEditado = modalMonto !== 'new' && modalMonto ? modalMonto.id : null;

    setMontos(prev => {
      const desconflictado = prev.map(m => {
        if (m.id === idEditado) return m;
        return { ...m, asignaciones: m.asignaciones.filter(a => !nuevasAsignaciones.has(a.id)) };
      });

      if (modalMonto === 'new') {
        return [...desconflictado, { id: `mr-${Date.now()}`, etiqueta: '', montoCLP: '', montoUF: '', asignaciones: [], ...data }];
      } else if (idEditado) {
        return desconflictado.map(m => m.id === idEditado ? { ...m, ...data } : m);
      }
      return desconflictado;
    });
    setModalMonto(null);
  };

  const handleEliminar = (monto: MontoReserva) => {
    setMontos(prev => prev.filter(m => m.id !== monto.id));
    setConfirmDelete(null);
    if (expandedId === monto.id) setExpandedId(null);
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: 'todos', label: 'Todos' },
    { id: 'con-asignaciones', label: 'Con asignaciones' },
    { id: 'sin-asignar', label: 'Sin asignar' },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h3)', fontWeight: 500, color: '#0A0A0A', lineHeight: 'var(--line-height-heading)', marginBottom: '4px' }}>
            Valores de Reserva
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>
            Gestiona los valores de reserva asociados a tus parcelas y proyectos.
          </p>
        </div>
        <button
          onClick={() => setModalMonto('new')}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all"
          style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#01533E'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#006B4E'}
        >
          <Plus className="w-4 h-4" />
          Agregar valor
        </button>
      </div>

      {/* Tarjeta Valor por defecto */}
      <div className="rounded-xl flex items-center justify-between px-5 py-4 mb-6"
        style={{ border: '2px dashed #D1D5DB', backgroundColor: '#FFFFFF' }}>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}>
            <DollarSign className="w-5 h-5" style={{ color: '#006B4E' }} />
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', fontWeight: 600, color: '#0A0A0A', marginBottom: '2px' }}>
              Valor por defecto
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#6B7280' }}>
              ${Number(defaultCLP).toLocaleString('es-CL')} · UF {defaultUF} — Se aplica a publicaciones sin valor asignado
            </p>
          </div>
        </div>
        <button
          onClick={() => setEditandoDefault(true)}
          className="p-2 rounded-lg transition-colors hover:bg-gray-100 flex-shrink-0"
          title="Editar valor por defecto">
          <Edit2 className="w-4 h-4" style={{ color: '#6B7280' }} />
        </button>
      </div>

      {/* Tabs + Buscador */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1" style={{ borderBottom: '2px solid #F3F4F6' }}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="px-4 py-2 text-sm font-medium transition-colors relative"
              style={{
                fontFamily: 'var(--font-body)',
                color: tab === t.id ? '#006B4E' : '#6B7280',
                borderBottom: tab === t.id ? '2px solid #006B4E' : '2px solid transparent',
                marginBottom: '-2px',
                backgroundColor: 'transparent',
              }}>
              {t.label}
              {t.id === 'sin-asignar' && montos.filter(m => m.asignaciones.length === 0).length > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-xs"
                  style={{ backgroundColor: '#FEF3C7', color: '#92400E', fontFamily: 'var(--font-body)' }}>
                  {montos.filter(m => m.asignaciones.length === 0).length}
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }} />
          <input
            type="text"
            placeholder="Buscar por etiqueta..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            className="pl-9 pr-4 py-2 rounded-lg text-sm"
            style={{ border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA', color: '#0A0A0A', outline: 'none', fontFamily: 'var(--font-body)', width: '220px' }}
          />
        </div>
      </div>

      {/* Cabecera de tabla */}
      <div className="grid px-5 py-2 mb-1" style={{ gridTemplateColumns: '1fr 140px 1fr 80px' }}>
        {['ETIQUETA', 'VALOR', 'ASIGNACIONES', ''].map(col => (
          <p key={col} style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {col}
          </p>
        ))}
      </div>

      {/* Lista */}
      {filtrados.length === 0 ? (
        <div className="rounded-2xl p-12 text-center" style={{ border: '1px dashed #D1D5DB', backgroundColor: '#FAFAFA' }}>
          <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: '#F3F4F6' }}>
            <DollarSign className="w-6 h-6" style={{ color: '#D1D5DB' }} />
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontWeight: 500, color: '#374151', marginBottom: '4px' }}>
            {busqueda ? 'Sin resultados' : 'No hay valores configurados'}
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#9CA3AF' }}>
            {busqueda ? 'Intenta con otro término.' : 'Agrega el primer valor de reserva.'}
          </p>
        </div>
      ) : (
        <div className="space-y-1">
          {filtrados.map(monto => {
            const isExpanded = expandedId === monto.id;
            return (
              <div key={monto.id} className="rounded-xl overflow-hidden" style={{ border: '1px solid #E5E5E5', backgroundColor: '#FFFFFF' }}>
                <div className="grid items-center px-5 py-4 gap-4" style={{ gridTemplateColumns: '1fr 140px 1fr 80px' }}>
                  {/* Etiqueta */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F0FDF4' }}>
                      <DollarSign className="w-4 h-4" style={{ color: '#006B4E' }} />
                    </div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#0A0A0A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {monto.etiqueta}
                    </p>
                  </div>

                  {/* Valor */}
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 700, color: '#006B4E' }}>
                      ${Number(monto.montoCLP).toLocaleString('es-CL')}
                    </p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF' }}>UF {monto.montoUF}</p>
                  </div>

                  {/* Asignaciones */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : monto.id)}
                    className="flex items-center gap-1.5 hover:opacity-70 transition-opacity text-left"
                  >
                    <Link className="w-3.5 h-3.5 flex-shrink-0" style={{ color: monto.asignaciones.length > 0 ? '#006B4E' : '#D1D5DB' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: monto.asignaciones.length > 0 ? '#374151' : '#9CA3AF' }}>
                      {monto.asignaciones.length} asignacion{monto.asignaciones.length !== 1 ? 'es' : ''}
                    </span>
                  </button>

                  {/* Acciones */}
                  <div className="flex items-center gap-1 justify-end">
                    <button onClick={() => setModalMonto(monto)} className="p-1.5 rounded-lg transition-colors hover:bg-gray-100" title="Editar">
                      <Edit2 className="w-3.5 h-3.5" style={{ color: '#6B7280' }} />
                    </button>
                    <button onClick={() => setConfirmDelete(monto)} className="p-1.5 rounded-lg transition-colors hover:bg-red-50" title="Eliminar">
                      <Trash2 className="w-3.5 h-3.5" style={{ color: '#9CA3AF' }} />
                    </button>
                    <button onClick={() => setExpandedId(isExpanded ? null : monto.id)} className="p-1.5 rounded-lg transition-colors hover:bg-gray-100">
                      {isExpanded
                        ? <ChevronDown className="w-3.5 h-3.5" style={{ color: '#9CA3AF' }} />
                        : <ChevronRight className="w-3.5 h-3.5" style={{ color: '#9CA3AF' }} />}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div style={{ borderTop: '1px solid #F3F4F6', backgroundColor: '#FAFAFA' }}>
                    {monto.asignaciones.length === 0 ? (
                      <div className="px-5 py-4 flex items-center gap-2">
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#9CA3AF' }}>
                          No hay publicaciones asignadas.
                        </p>
                        <button onClick={() => setModalMonto(monto)} className="text-sm font-medium hover:underline"
                          style={{ color: '#006B4E', fontFamily: 'var(--font-body)' }}>
                          Asignar ahora
                        </button>
                      </div>
                    ) : (
                      <div className="px-5 py-3">
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 500, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
                          Publicaciones asignadas
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {monto.asignaciones.map(a => (
                            <div key={a.id} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                              style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
                              <span className="px-1.5 py-0.5 rounded text-xs font-medium" style={{
                                backgroundColor: a.tipo === 'parcela' ? '#EFF6FF' : '#F5F3FF',
                                color: a.tipo === 'parcela' ? '#1E40AF' : '#5B21B6',
                                fontFamily: 'var(--font-body)',
                              }}>
                                {a.tipo === 'parcela' ? 'P' : 'Py'}
                              </span>
                              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#374151', fontWeight: 500 }}>
                                {a.nombre}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Modal valor por defecto */}
      {editandoDefault && (
        <DefaultValueModal
          montoCLP={defaultCLP}
          montoUF={defaultUF}
          onClose={() => setEditandoDefault(false)}
          onGuardar={(clp, uf) => { setDefaultCLP(clp); setDefaultUF(uf); setEditandoDefault(false); }}
        />
      )}

      {/* Modal crear/editar */}
      {modalMonto !== null && (
        <MontoModal
          monto={modalMonto === 'new' ? null : modalMonto}
          todosLosMontos={montos}
          onClose={() => setModalMonto(null)}
          onGuardar={handleGuardar}
        />
      )}

      {/* Modal confirmar eliminación */}
      {confirmDelete && (
        <ConfirmDeleteModal
          etiqueta={confirmDelete.etiqueta}
          onConfirm={() => handleEliminar(confirmDelete)}
          onClose={() => setConfirmDelete(null)}
        />
      )}
    </div>
  );
}
