import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

export type RangePreset = { id: string; label: string };
export type AppliedRange = { from: string; to: string };

interface ChartRangePickerProps {
  presets: RangePreset[];
  selected: string;
  onSelectPreset: (id: string) => void;
  appliedRange: AppliedRange | null;
  onApplyRange: (range: AppliedRange) => void;
  onClearRange: () => void;
}

function formatRangeLabel(from: string, to: string): string {
  const fmt = (d: string) => { const [y, m, day] = d.split('-'); return `${day}/${m}/${y.slice(2)}`; };
  if (from && !to) return `Desde ${fmt(from)}`;
  if (!from && to) return `Hasta ${fmt(to)}`;
  return `${fmt(from)} – ${fmt(to)}`;
}

export function ChartRangePicker({ presets, selected, onSelectPreset, appliedRange, onApplyRange, onClearRange }: ChartRangePickerProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showRango, setShowRango] = useState(false);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowDropdown(false);
        setShowRango(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleApply() {
    if (!from && !to) return;
    onApplyRange({ from, to });
    setShowRango(false);
  }

  const currentLabel = appliedRange
    ? formatRangeLabel(appliedRange.from, appliedRange.to)
    : (presets.find(p => p.id === selected)?.label ?? '');

  return (
    <div className="flex items-center gap-2" ref={ref}>
      {/* Preset dropdown */}
      <div className="relative">
        <button
          onClick={() => { setShowDropdown(v => !v); setShowRango(false); }}
          className="flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{ border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#374151', cursor: 'pointer', opacity: appliedRange ? 0.55 : 1 }}
        >
          <Calendar className="w-3.5 h-3.5" style={{ color: '#737373' }} />
          {currentLabel}
          <ChevronDown className="w-3.5 h-3.5" style={{ color: '#737373' }} />
        </button>
        {showDropdown && (
          <div className="absolute right-0 top-full mt-1 z-50 rounded-xl py-1"
            style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', minWidth: '180px' }}>
            {presets.map(p => (
              <button key={p.id}
                onClick={() => { onSelectPreset(p.id); onClearRange(); setFrom(''); setTo(''); setShowDropdown(false); }}
                className="w-full text-left px-4 py-2"
                style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: !appliedRange && selected === p.id ? '#006B4E' : '#374151', backgroundColor: !appliedRange && selected === p.id ? '#E8F5EE' : 'transparent', cursor: 'pointer', display: 'block' }}>
                {p.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Rango button */}
      <div className="relative">
        <button
          onClick={() => { setShowRango(v => !v); setShowDropdown(false); }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl"
          style={{ border: `1px solid ${appliedRange ? '#006B4E' : '#E5E5E5'}`, backgroundColor: appliedRange ? '#E8F5EE' : '#FAFAFA', fontFamily: 'var(--font-body)', fontSize: '13px', color: appliedRange ? '#006B4E' : '#374151', cursor: 'pointer', fontWeight: appliedRange ? 600 : 400 }}>
          <Calendar className="w-3.5 h-3.5" />
          Rango
        </button>
        {showRango && (
          <div className="absolute right-0 top-full mt-1 z-50 rounded-xl p-4"
            style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 4px 16px rgba(0,0,0,0.10)', minWidth: '240px' }}>
            <p style={{ fontSize: '12px', fontWeight: 600, color: '#374151', fontFamily: 'var(--font-body)', marginBottom: '12px' }}>Rango personalizado</p>
            <div className="flex flex-col gap-3 mb-4">
              <div>
                <label style={{ fontSize: '11px', color: '#9CA3AF', fontFamily: 'var(--font-body)', display: 'block', marginBottom: '4px' }}>Desde</label>
                <input type="date" value={from} onChange={e => setFrom(e.target.value)}
                  style={{ width: '100%', border: '1px solid #E5E5E5', borderRadius: '8px', padding: '6px 10px', fontSize: '13px', fontFamily: 'var(--font-body)', color: '#0A0A0A', outline: 'none' }} />
              </div>
              <div>
                <label style={{ fontSize: '11px', color: '#9CA3AF', fontFamily: 'var(--font-body)', display: 'block', marginBottom: '4px' }}>Hasta</label>
                <input type="date" value={to} min={from} onChange={e => setTo(e.target.value)}
                  style={{ width: '100%', border: '1px solid #E5E5E5', borderRadius: '8px', padding: '6px 10px', fontSize: '13px', fontFamily: 'var(--font-body)', color: '#0A0A0A', outline: 'none' }} />
              </div>
            </div>
            <div className="flex gap-2">
              {appliedRange && (
                <button onClick={() => { onClearRange(); setFrom(''); setTo(''); setShowRango(false); }}
                  style={{ flex: 1, fontSize: '12px', fontWeight: 600, color: '#DC2626', borderRadius: '200px', border: '1px solid #FECACA', backgroundColor: '#FFF5F5', padding: '7px 0', cursor: 'pointer' }}>
                  Limpiar
                </button>
              )}
              <button onClick={handleApply} disabled={!from && !to}
                style={{ flex: 1, fontSize: '12px', fontWeight: 600, color: '#FFFFFF', borderRadius: '200px', backgroundColor: (from || to) ? '#006B4E' : '#D1D5DB', padding: '7px 0', border: 'none', cursor: (from || to) ? 'pointer' : 'not-allowed' }}>
                Aplicar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
