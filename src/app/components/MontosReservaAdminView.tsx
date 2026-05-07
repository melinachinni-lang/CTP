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
    etiqueta: 'Monto estándar',
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
    etiqueta: 'Proyectos premium',
    montoCLP: '1000000',
    montoUF: '25.8',
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

function MontoModal({ monto, onClose, onGuardar }: {
  monto: MontoReserva | null;
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
            {monto ? 'Editar monto de reserva' : 'Agregar monto de reserva'}
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
            <input
              type="text"
              value={etiqueta}
              onChange={e => setEtiqueta(e.target.value)}
              placeholder="Ej: Monto estándar, Proyectos premium"
              className="w-full px-4 py-2.5 rounded-lg text-sm"
              style={{ border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA', color: '#0A0A0A', outline: 'none', fontFamily: 'var(--font-body)' }}
            />
          </div>

          {/* Montos */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                Monto en CLP <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', fontWeight: 600 }}>$</span>
                <input
                  type="text"
                  value={montoCLP}
                  onChange={e => setMontoCLP(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="500000"
                  className="w-full pl-7 pr-4 py-2.5 rounded-lg text-sm"
                  style={{ border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA', color: '#0A0A0A', outline: 'none', fontFamily: 'var(--font-body)' }}
                />
              </div>
              {montoCLP && (
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF', marginTop: '4px' }}>
                  ${formatCLP(montoCLP)}
                </p>
              )}
            </div>
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                Monto en UF <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', fontWeight: 600 }}>UF</span>
                <input
                  type="text"
                  value={montoUF}
                  onChange={e => setMontoUF(e.target.value.replace(/[^0-9.,]/g, ''))}
                  placeholder="12.9"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm"
                  style={{ border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA', color: '#0A0A0A', outline: 'none', fontFamily: 'var(--font-body)' }}
                />
              </div>
            </div>
          </div>

          {/* Asignar publicaciones */}
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
                <div className="px-4 py-3" style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }} />
                    <input
                      type="text"
                      placeholder="Buscar parcela o proyecto..."
                      value={busqueda}
                      onChange={e => setBusqueda(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 rounded-lg text-sm"
                      style={{ border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA', color: '#0A0A0A', outline: 'none', fontFamily: 'var(--font-body)' }}
                    />
                  </div>
                </div>
                <div className="max-h-48 overflow-y-auto">
                  {filtradas.map((pub, i) => {
                    const checked = seleccionadas.has(pub.id);
                    return (
                      <label
                        key={pub.id}
                        className="flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors"
                        style={{ borderBottom: i < filtradas.length - 1 ? '1px solid #F9FAFB' : 'none', backgroundColor: checked ? '#F0FDF4' : '#FFFFFF' }}
                        onMouseEnter={e => { if (!checked) e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = checked ? '#F0FDF4' : '#FFFFFF'; }}
                      >
                        <div
                          className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all"
                          style={{ backgroundColor: checked ? '#006B4E' : '#FFFFFF', border: `2px solid ${checked ? '#006B4E' : '#D1D5DB'}` }}
                          onClick={() => toggleSeleccion(pub.id)}
                        >
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

        <div className="px-6 py-4 border-t flex gap-3" style={{ borderColor: '#E5E5E5' }}>
          <button onClick={onClose} className="flex-1 py-2.5 rounded-full text-sm font-medium"
            style={{ backgroundColor: '#F5F5F5', color: '#374151', fontFamily: 'var(--font-body)' }}>
            Cancelar
          </button>
          <button
            onClick={handleGuardar}
            disabled={!puedeGuardar}
            className="flex-1 py-2.5 rounded-full text-sm font-medium transition-all"
            style={{ backgroundColor: puedeGuardar ? '#006B4E' : '#E5E5E5', color: puedeGuardar ? '#FFFFFF' : '#9CA3AF', fontFamily: 'var(--font-body)', cursor: puedeGuardar ? 'pointer' : 'not-allowed' }}
            onMouseEnter={e => { if (puedeGuardar) e.currentTarget.style.backgroundColor = '#01533E'; }}
            onMouseLeave={e => { if (puedeGuardar) e.currentTarget.style.backgroundColor = '#006B4E'; }}
          >
            {monto ? 'Guardar cambios' : 'Agregar monto'}
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
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'var(--font-size-body-lg)', color: '#0A0A0A' }}>Eliminar monto</h3>
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

export function MontosReservaAdminView() {
  const [montos, setMontos] = useState<MontoReserva[]>(MOCK_MONTOS);
  const [busqueda, setBusqueda] = useState('');
  const [modalMonto, setModalMonto] = useState<MontoReserva | null | 'new'>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<MontoReserva | null>(null);

  const filtrados = montos.filter(m =>
    m.etiqueta.toLowerCase().includes(busqueda.toLowerCase()) ||
    m.asignaciones.some(a => a.nombre.toLowerCase().includes(busqueda.toLowerCase()))
  );

  const handleGuardar = (data: Partial<MontoReserva>) => {
    if (modalMonto === 'new') {
      setMontos(prev => [...prev, { id: `mr-${Date.now()}`, etiqueta: '', montoCLP: '', montoUF: '', asignaciones: [], ...data }]);
    } else if (modalMonto) {
      setMontos(prev => prev.map(m => m.id === modalMonto.id ? { ...m, ...data } : m));
    }
    setModalMonto(null);
  };

  const handleEliminar = (monto: MontoReserva) => {
    setMontos(prev => prev.filter(m => m.id !== monto.id));
    setConfirmDelete(null);
    if (expandedId === monto.id) setExpandedId(null);
  };

  return (
    <div className="px-6 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h2)', fontWeight: 500, color: '#0A0A0A', lineHeight: 'var(--line-height-heading)' }}>
            Montos de reserva
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', color: '#6B6B6B', marginTop: '4px', lineHeight: 'var(--line-height-body)' }}>
            Montos fijos de reserva asignados a parcelas y proyectos específicos
          </p>
        </div>
        <button
          onClick={() => setModalMonto('new')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all"
          style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#01533E'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#006B4E'}
        >
          <Plus className="w-4 h-4" />
          Agregar monto
        </button>
      </div>

      {/* Buscador */}
      <div className="relative mb-4">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }} />
        <input
          type="text"
          placeholder="Buscar por etiqueta o publicación..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 rounded-xl text-sm"
          style={{ border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA', color: '#0A0A0A', outline: 'none', fontFamily: 'var(--font-body)' }}
        />
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 mb-5">
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>
          {montos.length} monto{montos.length !== 1 ? 's' : ''} configurado{montos.length !== 1 ? 's' : ''}
        </span>
        <span style={{ color: '#E5E5E5' }}>·</span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>
          {montos.filter(m => m.asignaciones.length === 0).length} sin asignar
        </span>
      </div>

      {/* Lista */}
      {filtrados.length === 0 ? (
        <div className="rounded-2xl p-12 text-center" style={{ border: '1px dashed #D1D5DB', backgroundColor: '#FAFAFA' }}>
          <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: '#F3F4F6' }}>
            <DollarSign className="w-6 h-6" style={{ color: '#D1D5DB' }} />
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontWeight: 500, color: '#374151', marginBottom: '4px' }}>
            {busqueda ? 'Sin resultados' : 'No hay montos configurados'}
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#9CA3AF' }}>
            {busqueda ? 'Intenta con otro término.' : 'Agrega el primer monto de reserva.'}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtrados.map(monto => {
            const isExpanded = expandedId === monto.id;
            return (
              <div key={monto.id} className="rounded-xl overflow-hidden" style={{ border: '1px solid #E5E5E5', backgroundColor: '#FFFFFF' }}>
                {/* Fila principal */}
                <div className="flex items-center gap-4 px-5 py-4">
                  {/* Ícono */}
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F0FDF4' }}>
                    <DollarSign className="w-5 h-5" style={{ color: '#006B4E' }} />
                  </div>

                  {/* Info principal */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', fontWeight: 600, color: '#0A0A0A' }}>
                        {monto.etiqueta}
                      </p>
                      {monto.asignaciones.length === 0 && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: '#FEF3C7', color: '#92400E', fontFamily: 'var(--font-body)' }}>
                          Sin asignar
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 700, color: '#0A0A0A' }}>
                        ${Number(monto.montoCLP).toLocaleString('es-CL')}
                      </span>
                      <span style={{ color: '#D1D5DB' }}>·</span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>
                        UF {monto.montoUF}
                      </span>
                    </div>
                  </div>

                  {/* Asignaciones badge */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : monto.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors hover:bg-gray-50"
                    style={{ border: '1px solid #E5E5E5' }}
                  >
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 500, color: monto.asignaciones.length > 0 ? '#006B4E' : '#9CA3AF' }}>
                      {monto.asignaciones.length} publicación{monto.asignaciones.length !== 1 ? 'es' : ''}
                    </span>
                    {isExpanded
                      ? <ChevronDown className="w-3.5 h-3.5" style={{ color: '#9CA3AF' }} />
                      : <ChevronRight className="w-3.5 h-3.5" style={{ color: '#9CA3AF' }} />
                    }
                  </button>

                  {/* Acciones */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => setModalMonto(monto)}
                      className="p-2 rounded-lg transition-colors hover:bg-gray-100"
                      title="Editar"
                    >
                      <Edit2 className="w-4 h-4" style={{ color: '#6B7280' }} />
                    </button>
                    <button
                      onClick={() => setConfirmDelete(monto)}
                      className="p-2 rounded-lg transition-colors hover:bg-red-50"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" style={{ color: '#9CA3AF' }} />
                    </button>
                  </div>
                </div>

                {/* Panel expandido: asignaciones */}
                {isExpanded && (
                  <div style={{ borderTop: '1px solid #F3F4F6', backgroundColor: '#FAFAFA' }}>
                    {monto.asignaciones.length === 0 ? (
                      <div className="px-5 py-4 flex items-center gap-2">
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#9CA3AF' }}>
                          No hay publicaciones asignadas a este monto.
                        </p>
                        <button
                          onClick={() => setModalMonto(monto)}
                          className="text-sm font-medium hover:underline"
                          style={{ color: '#006B4E', fontFamily: 'var(--font-body)' }}
                        >
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
                            <div
                              key={a.id}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                              style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}
                            >
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

      {/* Modal crear/editar */}
      {modalMonto !== null && (
        <MontoModal
          monto={modalMonto === 'new' ? null : modalMonto}
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
