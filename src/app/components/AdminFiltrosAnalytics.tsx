import React, { useState, useRef, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ChevronDown, Calendar } from 'lucide-react';

const RANGO_PRESETS = [
  { id: 'hoy',     label: 'Hoy' },
  { id: '7d',      label: 'Últimos 7 días' },
  { id: '28d',     label: 'Últimos 28 días' },
  { id: '30d',     label: 'Últimos 30 días' },
  { id: 'mes',     label: 'Este mes' },
  { id: 'mes_ant', label: 'El mes pasado' },
  { id: '90d',     label: 'Últimos 90 días' },
];

const DATA: Record<string, { nombre: string; busquedas: number }[]> = {
  ubicacion: [
    { nombre: 'Cajón del Maipo',   busquedas: 3847 },
    { nombre: 'Pucón',             busquedas: 2914 },
    { nombre: 'Villarrica',        busquedas: 2156 },
    { nombre: 'Puerto Varas',      busquedas: 1823 },
    { nombre: 'Olmué',             busquedas: 1547 },
    { nombre: 'San José de Maipo', busquedas: 1204 },
    { nombre: 'Lago Ranco',        busquedas: 987  },
    { nombre: 'Curacaví',          busquedas: 834  },
    { nombre: 'Panguipulli',       busquedas: 712  },
    { nombre: 'Pirque',            busquedas: 658  },
  ],
  region: [
    { nombre: 'Metropolitana',  busquedas: 4523 },
    { nombre: 'La Araucanía',  busquedas: 3214 },
    { nombre: 'Los Lagos',     busquedas: 2847 },
    { nombre: 'Valparaíso',    busquedas: 1956 },
    { nombre: "O'Higgins",     busquedas: 954  },
    { nombre: 'Biobío',        busquedas: 823  },
    { nombre: 'Maule',         busquedas: 712  },
    { nombre: 'Los Ríos',      busquedas: 645  },
    { nombre: 'Aysén',         busquedas: 432  },
    { nombre: 'Coquimbo',      busquedas: 318  },
  ],
  tipo: [
    { nombre: 'Parcela de agrado',  busquedas: 5847 },
    { nombre: 'Terreno rural',      busquedas: 3214 },
    { nombre: 'Parcela con casa',   busquedas: 2456 },
    { nombre: 'Sitio condominio',   busquedas: 1324 },
    { nombre: 'Fundo',              busquedas: 653  },
    { nombre: 'Parcela agrícola',   busquedas: 541  },
    { nombre: 'Loteo',              busquedas: 423  },
    { nombre: 'Hacienda',           busquedas: 312  },
    { nombre: 'Campo',              busquedas: 287  },
    { nombre: 'Parcela forestal',   busquedas: 198  },
  ],
  precio: [
    { nombre: '$30M - $50M',    busquedas: 4123 },
    { nombre: '$50M - $80M',    busquedas: 3547 },
    { nombre: '$20M - $30M',    busquedas: 2814 },
    { nombre: '$80M - $120M',   busquedas: 1956 },
    { nombre: 'Más de $120M',   busquedas: 1054 },
    { nombre: '$10M - $20M',    busquedas: 876  },
    { nombre: '$120M - $200M',  busquedas: 743  },
    { nombre: 'Menos de $10M',  busquedas: 512  },
    { nombre: 'Más de $200M',   busquedas: 387  },
    { nombre: '$200M - $500M',  busquedas: 234  },
  ],
};

const TABS = [
  { id: 'ubicacion', label: 'Ubicación/Comuna' },
  { id: 'region',    label: 'Región' },
  { id: 'tipo',      label: 'Tipo de propiedad' },
  { id: 'precio',    label: 'Rango de precio' },
];

const BAR_COLORS = ['#006B4E', '#01533E', '#007A5A', '#1A8A6A', '#2E9A7A', '#42AA8A', '#56BA9A', '#6ACAAA', '#7EDABA', '#92EACA'];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ backgroundColor: '#0A0A0A', padding: '8px 12px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
      <p style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600, marginBottom: '2px' }}>{label}</p>
      <p style={{ color: '#52C49A', fontSize: '13px', fontWeight: 700 }}>
        {payload[0].value.toLocaleString('es-CL')} búsquedas
      </p>
    </div>
  );
}

export function AdminFiltrosAnalytics() {
  const [activeTab, setActiveTab] = useState('ubicacion');
  const [rango, setRango] = useState('28d');
  const [showRango, setShowRango] = useState(false);
  const [showCustomRango, setShowCustomRango] = useState(false);
  const [customFrom, setCustomFrom] = useState('');
  const [customTo, setCustomTo] = useState('');
  const [appliedRange, setAppliedRange] = useState<{ from: string; to: string } | null>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShowRango(false);
        setShowCustomRango(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function formatRangeLabel(from: string, to: string) {
    const fmt = (d: string) => { const [y, m, day] = d.split('-'); return `${day}/${m}/${y.slice(2)}`; };
    if (from && !to) return `Desde ${fmt(from)}`;
    if (!from && to) return `Hasta ${fmt(to)}`;
    return `${fmt(from)} – ${fmt(to)}`;
  }

  function handleApplyRange() {
    if (!customFrom && !customTo) return;
    setAppliedRange({ from: customFrom, to: customTo });
    setShowCustomRango(false);
  }

  const datos = DATA[activeTab];
  const rangoLabel = appliedRange ? formatRangeLabel(appliedRange.from, appliedRange.to) : (RANGO_PRESETS.find(r => r.id === rango)?.label ?? '');

  return (
    <div className="max-w-6xl mx-auto">
      <section
        className="rounded-2xl p-4 md:p-8"
        style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}
      >
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-6">
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h3)', fontWeight: 'var(--font-weight-medium)', color: 'var(--foreground)', lineHeight: 'var(--line-height-heading)', marginBottom: '6px' }}>
              Tendencias de búsqueda
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: 'var(--muted-foreground)' }}>
              Top 10 filtros más utilizados por los usuarios al buscar propiedades
            </p>
          </div>

          {/* Date range selector */}
          <div className="flex items-center gap-2" ref={pickerRef}>
            {/* Preset dropdown */}
            <div className="relative">
              <button
                onClick={() => { setShowRango(v => !v); setShowCustomRango(false); }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors"
                style={{ border: '1px solid var(--border)', backgroundColor: 'var(--background)', fontFamily: 'var(--font-body)', fontSize: '13px', color: appliedRange ? '#9CA3AF' : 'var(--foreground)', fontWeight: 500, opacity: appliedRange ? 0.6 : 1 }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--background)'; }}
              >
                <Calendar className="w-4 h-4" style={{ color: '#737373' }} />
                <span className="hidden md:inline">{appliedRange ? formatRangeLabel(appliedRange.from, appliedRange.to) : rangoLabel}</span>
                <ChevronDown className="w-3.5 h-3.5" style={{ color: '#737373', transform: showRango ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
              </button>
              {showRango && (
                <div className="absolute right-0 top-full mt-1 z-50 rounded-xl overflow-hidden"
                  style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', minWidth: '200px' }}>
                  {RANGO_PRESETS.map(preset => (
                    <button key={preset.id}
                      onClick={() => { setRango(preset.id); setAppliedRange(null); setCustomFrom(''); setCustomTo(''); setShowRango(false); }}
                      className="w-full text-left px-4 py-2.5 transition-colors"
                      style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: !appliedRange && rango === preset.id ? 600 : 400, color: !appliedRange && rango === preset.id ? '#006B4E' : '#0A0A0A', backgroundColor: !appliedRange && rango === preset.id ? '#F0F9F5' : '#FFFFFF' }}
                      onMouseEnter={e => { if (rango !== preset.id) e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
                      onMouseLeave={e => { if (rango !== preset.id) e.currentTarget.style.backgroundColor = '#FFFFFF'; }}>
                      {preset.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Rango button */}
            <div className="relative">
              <button
                onClick={() => { setShowCustomRango(v => !v); setShowRango(false); }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors"
                style={{ border: `1px solid ${appliedRange ? '#006B4E' : 'var(--border)'}`, backgroundColor: appliedRange ? '#E8F5EE' : 'var(--background)', fontFamily: 'var(--font-body)', fontSize: '13px', color: appliedRange ? '#006B4E' : 'var(--foreground)', fontWeight: appliedRange ? 600 : 500, cursor: 'pointer' }}>
                <Calendar className="w-4 h-4" />
                <span className="hidden md:inline">Rango</span>
              </button>
              {showCustomRango && (
                <div className="absolute right-0 top-full mt-1 z-50 rounded-xl p-4"
                  style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', minWidth: '240px' }}>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: '#374151', fontFamily: 'var(--font-body)', marginBottom: '12px' }}>Rango personalizado</p>
                  <div className="flex flex-col gap-3 mb-4">
                    <div>
                      <label style={{ fontSize: '11px', color: '#9CA3AF', fontFamily: 'var(--font-body)', display: 'block', marginBottom: '4px' }}>Desde</label>
                      <input type="date" value={customFrom} onChange={e => setCustomFrom(e.target.value)}
                        style={{ width: '100%', border: '1px solid #E5E5E5', borderRadius: '8px', padding: '6px 10px', fontSize: '13px', fontFamily: 'var(--font-body)', color: '#0A0A0A', outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '11px', color: '#9CA3AF', fontFamily: 'var(--font-body)', display: 'block', marginBottom: '4px' }}>Hasta</label>
                      <input type="date" value={customTo} onChange={e => setCustomTo(e.target.value)} min={customFrom}
                        style={{ width: '100%', border: '1px solid #E5E5E5', borderRadius: '8px', padding: '6px 10px', fontSize: '13px', fontFamily: 'var(--font-body)', color: '#0A0A0A', outline: 'none' }} />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {appliedRange && (
                      <button onClick={() => { setAppliedRange(null); setCustomFrom(''); setCustomTo(''); setShowCustomRango(false); }}
                        style={{ flex: 1, fontSize: '12px', fontWeight: 600, color: '#DC2626', borderRadius: '200px', border: '1px solid #FECACA', backgroundColor: '#FFF5F5', padding: '7px 0', cursor: 'pointer' }}>
                        Limpiar
                      </button>
                    )}
                    <button onClick={handleApplyRange} disabled={!customFrom && !customTo}
                      style={{ flex: 1, fontSize: '12px', fontWeight: 600, color: '#FFFFFF', borderRadius: '200px', backgroundColor: (customFrom || customTo) ? '#006B4E' : '#D1D5DB', padding: '7px 0', border: 'none', cursor: (customFrom || customTo) ? 'pointer' : 'not-allowed' }}>
                      Aplicar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-4 py-2 rounded-full transition-all"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                fontWeight: 500,
                color: activeTab === tab.id ? '#FFFFFF' : 'var(--foreground)',
                backgroundColor: activeTab === tab.id ? '#006B4E' : 'var(--background)',
                border: `1px solid ${activeTab === tab.id ? '#006B4E' : 'var(--border)'}`,
              }}
              onMouseEnter={e => { if (activeTab !== tab.id) e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
              onMouseLeave={e => { if (activeTab !== tab.id) e.currentTarget.style.backgroundColor = 'var(--background)'; }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Bar chart */}
        <ResponsiveContainer width="100%" height={360}>
          <BarChart
            data={datos}
            layout="vertical"
            margin={{ top: 0, right: 24, left: 8, bottom: 0 }}
            barSize={22}
          >
            <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="#F0F0F0" />
            <XAxis
              type="number"
              tickFormatter={v => v.toLocaleString('es-CL')}
              tick={{ fontFamily: 'var(--font-body)', fontSize: 11, fill: '#9CA3AF' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="nombre"
              width={140}
              tick={{ fontFamily: 'var(--font-body)', fontSize: 12, fill: '#374151' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,107,78,0.04)' }} />
            <Bar dataKey="busquedas" radius={[0, 6, 6, 0]}>
              {datos.map((_, i) => (
                <Cell key={i} fill={BAR_COLORS[i] ?? '#006B4E'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Resumen */}
        <div className="mt-6 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0" style={{ backgroundColor: 'var(--input-background)', border: '1px solid var(--border)' }}>
          <div className="flex flex-col gap-1">
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Total búsquedas</span>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h3)', fontWeight: 'var(--font-weight-medium)', color: 'var(--foreground)' }}>
              {datos.reduce((s, d) => s + d.busquedas, 0).toLocaleString('es-CL')}
            </span>
          </div>
          <div className="hidden md:block" style={{ width: '1px', height: '40px', backgroundColor: 'var(--border)' }} />
          <div className="flex flex-col gap-1">
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Más buscado</span>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h3)', fontWeight: 'var(--font-weight-medium)', color: 'var(--foreground)' }}>
              {datos[0].nombre}
            </span>
          </div>
          <div className="hidden md:block" style={{ width: '1px', height: '40px', backgroundColor: 'var(--border)' }} />
          <div className="flex flex-col gap-1">
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Período</span>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h3)', fontWeight: 'var(--font-weight-medium)', color: 'var(--foreground)' }}>
              {rangoLabel}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
