import React, { useState, useRef, useEffect } from 'react';
import { Download, ChevronDown, CalendarDays, X } from 'lucide-react';

type Periodo = '7d' | '30d' | '90d';
const PERIODO_LABELS: Record<Periodo, string> = { '7d': 'Últimos 7 días', '30d': 'Últimos 30 días', '90d': 'Últimos 90 días' };

function formatRangeLabel(from: string, to: string) {
  const fmt = (d: string) => { const [y, m, day] = d.split('-'); return `${day}/${m}/${y}`; };
  return `${fmt(from)} – ${fmt(to)}`;
}

interface FilaPago {
  inmobiliaria: string;
  reservas: number;
  monto: number;
}

const DATOS: Record<string, FilaPago[]> = {
  'Enero 2026': [
    { inmobiliaria: 'Inmobiliaria Sol del Sur',   reservas: 14, monto: 7000000 },
    { inmobiliaria: 'Constructora Patagonia',      reservas: 9,  monto: 4500000 },
    { inmobiliaria: 'Inmobiliaria Valle Verde',    reservas: 6,  monto: 3000000 },
    { inmobiliaria: 'Grupo Raíces SpA',            reservas: 4,  monto: 2000000 },
    { inmobiliaria: 'Tierras del Sur Limitada',    reservas: 2,  monto: 1000000 },
  ],
  'Febrero 2026': [
    { inmobiliaria: 'Inmobiliaria Sol del Sur',   reservas: 11, monto: 5500000 },
    { inmobiliaria: 'Constructora Patagonia',      reservas: 7,  monto: 3500000 },
    { inmobiliaria: 'Inmobiliaria Valle Verde',    reservas: 5,  monto: 2500000 },
    { inmobiliaria: 'Grupo Raíces SpA',            reservas: 3,  monto: 1500000 },
    { inmobiliaria: 'Tierras del Sur Limitada',    reservas: 1,  monto: 500000  },
  ],
  'Marzo 2026': [
    { inmobiliaria: 'Inmobiliaria Sol del Sur',   reservas: 18, monto: 9000000 },
    { inmobiliaria: 'Constructora Patagonia',      reservas: 12, monto: 6000000 },
    { inmobiliaria: 'Inmobiliaria Valle Verde',    reservas: 8,  monto: 4000000 },
    { inmobiliaria: 'Grupo Raíces SpA',            reservas: 5,  monto: 2500000 },
    { inmobiliaria: 'Tierras del Sur Limitada',    reservas: 3,  monto: 1500000 },
  ],
  'Abril 2026': [
    { inmobiliaria: 'Inmobiliaria Sol del Sur',   reservas: 10, monto: 5000000 },
    { inmobiliaria: 'Constructora Patagonia',      reservas: 8,  monto: 4000000 },
    { inmobiliaria: 'Inmobiliaria Valle Verde',    reservas: 4,  monto: 2000000 },
    { inmobiliaria: 'Grupo Raíces SpA',            reservas: 6,  monto: 3000000 },
    { inmobiliaria: 'Tierras del Sur Limitada',    reservas: 2,  monto: 1000000 },
  ],
  'Mayo 2026': [
    { inmobiliaria: 'Inmobiliaria Sol del Sur',   reservas: 13, monto: 6500000 },
    { inmobiliaria: 'Constructora Patagonia',      reservas: 10, monto: 5000000 },
    { inmobiliaria: 'Inmobiliaria Valle Verde',    reservas: 7,  monto: 3500000 },
    { inmobiliaria: 'Grupo Raíces SpA',            reservas: 4,  monto: 2000000 },
    { inmobiliaria: 'Tierras del Sur Limitada',    reservas: 3,  monto: 1500000 },
  ],
  'Junio 2026': [
    { inmobiliaria: 'Inmobiliaria Sol del Sur',   reservas: 16, monto: 8000000 },
    { inmobiliaria: 'Constructora Patagonia',      reservas: 11, monto: 5500000 },
    { inmobiliaria: 'Inmobiliaria Valle Verde',    reservas: 9,  monto: 4500000 },
    { inmobiliaria: 'Grupo Raíces SpA',            reservas: 5,  monto: 2500000 },
    { inmobiliaria: 'Tierras del Sur Limitada',    reservas: 4,  monto: 2000000 },
  ],
  'Julio 2026': [
    { inmobiliaria: 'Inmobiliaria Sol del Sur',   reservas: 12, monto: 6000000 },
    { inmobiliaria: 'Constructora Patagonia',      reservas: 8,  monto: 4000000 },
    { inmobiliaria: 'Inmobiliaria Valle Verde',    reservas: 5,  monto: 2500000 },
    { inmobiliaria: 'Grupo Raíces SpA',            reservas: 3,  monto: 1500000 },
    { inmobiliaria: 'Tierras del Sur Limitada',    reservas: 2,  monto: 1000000 },
  ],
};

function formatCLP(n: number) {
  return '$' + n.toLocaleString('es-CL');
}

export function PagosInmobiliariasAdminView() {
  const [periodo, setPeriodo] = useState<Periodo>('30d');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCustomRange, setShowCustomRange] = useState(false);
  const [appliedRange, setAppliedRange] = useState<{ from: string; to: string } | null>(null);
  const [customFrom, setCustomFrom] = useState('');
  const [customTo, setCustomTo] = useState('');
  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (datePickerRef.current && !datePickerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
        setShowCustomRange(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleApplyRange = () => {
    if (!customFrom || !customTo) return;
    setAppliedRange({ from: customFrom, to: customTo });
    setShowCustomRange(false);
  };

  const filas = DATOS['Julio 2026'] ?? [];
  const totalReservas = filas.reduce((s, f) => s + f.reservas, 0);
  const totalMonto = filas.reduce((s, f) => s + f.monto, 0);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h3)', fontWeight: 500, color: '#0A0A0A', marginBottom: '4px' }}>
            Pagos a inmobiliarias
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>
            Reservas confirmadas y montos a liquidar por inmobiliaria.
          </p>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-2" ref={datePickerRef}>

          {/* Dropdown períodos */}
          <div className="relative">
            <button
              onClick={() => { setShowDropdown(v => !v); setShowCustomRange(false); }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors"
              style={{ border: '1px solid #E5E5E5', backgroundColor: '#FFFFFF', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#0A0A0A', fontWeight: 500, cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
            >
              <CalendarDays className="w-4 h-4" style={{ color: '#737373' }} />
              {PERIODO_LABELS[periodo]}
              <ChevronDown className="w-3.5 h-3.5" style={{ color: '#737373', transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
            </button>
            {showDropdown && (
              <div className="absolute right-0 top-full mt-1 z-50 rounded-xl overflow-hidden"
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', minWidth: '190px' }}>
                {(['7d', '30d', '90d'] as Periodo[]).map(p => (
                  <button
                    key={p}
                    onClick={() => { setPeriodo(p); setAppliedRange(null); setCustomFrom(''); setCustomTo(''); setShowDropdown(false); }}
                    className="w-full text-left px-4 py-2.5 transition-colors"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: !appliedRange && periodo === p ? 600 : 400, color: !appliedRange && periodo === p ? '#006B4E' : '#0A0A0A', backgroundColor: !appliedRange && periodo === p ? '#F0F9F5' : '#FFFFFF', border: 'none', cursor: 'pointer', display: 'block' }}
                    onMouseEnter={e => { if (appliedRange || periodo !== p) e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = (!appliedRange && periodo === p) ? '#F0F9F5' : '#FFFFFF'; }}
                  >
                    {PERIODO_LABELS[p]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Rango personalizado */}
          <div className="relative">
            <button
              onClick={() => { setShowCustomRange(v => !v); setShowDropdown(false); }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors"
              style={{ border: appliedRange ? '1px solid #006B4E' : '1px solid #E5E5E5', backgroundColor: appliedRange ? '#F0F9F5' : '#FFFFFF', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: appliedRange ? 600 : 400, color: appliedRange ? '#006B4E' : '#6B7280', cursor: 'pointer' }}
              onMouseEnter={e => { if (!appliedRange) e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
              onMouseLeave={e => { if (!appliedRange) e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
            >
              <CalendarDays className="w-3.5 h-3.5" />
              {appliedRange ? <span>{formatRangeLabel(appliedRange.from, appliedRange.to)}</span> : <span>Rango</span>}
              {appliedRange && (
                <span role="button" onClick={e => { e.stopPropagation(); setAppliedRange(null); setCustomFrom(''); setCustomTo(''); setShowCustomRange(false); }} className="hover:opacity-60 transition-opacity">
                  <X className="w-3 h-3" />
                </span>
              )}
            </button>
            {showCustomRange && (
              <div className="absolute right-0 top-full mt-1 z-50 rounded-xl p-4 space-y-3"
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', minWidth: '240px' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: '#0A0A0A', marginBottom: '2px' }}>Rango personalizado</p>
                <div>
                  <label style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: '#6B7280', display: 'block', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Desde</label>
                  <input type="date" value={customFrom} onChange={e => setCustomFrom(e.target.value)} max={customTo || undefined}
                    className="w-full px-3 py-2 rounded-lg outline-none transition-colors"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#0A0A0A', border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA' }}
                    onFocus={e => { e.currentTarget.style.borderColor = '#006B4E'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = '#E5E5E5'; }}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: '#6B7280', display: 'block', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Hasta</label>
                  <input type="date" value={customTo} onChange={e => setCustomTo(e.target.value)} min={customFrom || undefined}
                    className="w-full px-3 py-2 rounded-lg outline-none transition-colors"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#0A0A0A', border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA' }}
                    onFocus={e => { e.currentTarget.style.borderColor = '#006B4E'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = '#E5E5E5'; }}
                  />
                </div>
                <button
                  onClick={handleApplyRange}
                  disabled={!customFrom || !customTo}
                  className="w-full py-2 rounded-lg transition-colors"
                  style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: '#FFFFFF', backgroundColor: customFrom && customTo ? '#006B4E' : '#D1D5DB', border: 'none', cursor: customFrom && customTo ? 'pointer' : 'not-allowed' }}
                  onMouseEnter={e => { if (customFrom && customTo) e.currentTarget.style.backgroundColor = '#01533E'; }}
                  onMouseLeave={e => { if (customFrom && customTo) e.currentTarget.style.backgroundColor = '#006B4E'; }}
                >
                  Aplicar
                </button>
              </div>
            )}
          </div>

          {/* Exportar */}
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors"
            style={{ border: '1px solid #E5E5E5', backgroundColor: '#FFFFFF', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#374151', cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F9FAFB'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}
          >
            <Download className="w-4 h-4" style={{ color: '#6B7280' }} />
            Exportar
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #E5E5E5' }}>
        {/* Cabecera */}
        <div className="grid px-6 py-3" style={{ gridTemplateColumns: '1fr 160px 200px', backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E5E5' }}>
          {['INMOBILIARIA', 'RESERVAS', 'MONTO TOTAL'].map(col => (
            <p key={col} style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {col}
            </p>
          ))}
        </div>

        {/* Filas */}
        {filas.map((fila, i) => (
          <div
            key={fila.inmobiliaria}
            className="grid px-6 py-4 items-center"
            style={{
              gridTemplateColumns: '1fr 160px 200px',
              borderBottom: i < filas.length - 1 ? '1px solid #F3F4F6' : 'none',
              backgroundColor: '#FFFFFF',
            }}
          >
            {/* Inmobiliaria */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, color: '#006B4E' }}>
                  {fila.inmobiliaria.charAt(0)}
                </span>
              </div>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#0A0A0A' }}>
                {fila.inmobiliaria}
              </span>
            </div>

            {/* Reservas */}
            <div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full"
                style={{ backgroundColor: '#EFF6FF', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#1E40AF' }}>
                {fila.reservas} reserva{fila.reservas !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Monto */}
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 700, color: '#006B4E' }}>
              {formatCLP(fila.monto)}
            </span>
          </div>
        ))}

        {/* Fila de totales */}
        <div className="grid px-6 py-4 items-center" style={{ gridTemplateColumns: '1fr 160px 200px', backgroundColor: '#F9FAFB', borderTop: '2px solid #E5E5E5' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 700, color: '#0A0A0A' }}>
            Total {appliedRange ? `${appliedRange.from} – ${appliedRange.to}` : PERIODO_LABELS[periodo]}
          </span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 700, color: '#0A0A0A' }}>
            {totalReservas} reservas
          </span>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-body-lg)', fontWeight: 700, color: '#006B4E' }}>
            {formatCLP(totalMonto)}
          </span>
        </div>
      </div>
    </div>
  );
}
