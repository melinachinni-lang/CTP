import React, { useState, useEffect, useRef } from 'react';
import { Eye, MessageCircle, Heart, Home, TrendingUp, TrendingDown, Edit2, Phone, Plus, BarChart2, CalendarDays, X, ChevronDown } from 'lucide-react';

type ViewType = 'inmobiliaria' | 'broker';
export type Periodo = '7d' | '30d' | '90d';

interface RendimientoViewProps {
  viewType: ViewType;
}

interface KPI {
  label: string;
  value: number;
  change: number;
  desc: string;
  icon: React.ReactNode;
  iconBg: string;
}

interface PropiedadRanking {
  id: number;
  nombre: string;
  ubicacion: string;
  imagen: string;
  vistas: number;
  consultas: number;
  tendencia: number;
  estado: string;
  inmobiliaria?: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

export type DualSeries = { parcelas: number[]; proyectos: number[] };

export const CHART_DATA: Record<ViewType, Record<Periodo, DualSeries>> = {
  inmobiliaria: {
    '7d': {
      parcelas:  [88, 124, 105, 142, 159, 134, 182],
      proyectos: [54,  74,  62,  82,  92,  79, 107],
    },
    '30d': {
      parcelas:  [75, 84, 80, 97,104, 90,112,119,115,125,134,124,140,144,136,151,159,149,163,174,165,177,186,175,190,199,187,204,213,222],
      proyectos: [45, 51, 48, 59, 63, 55, 66, 73, 70, 76, 81, 74, 84, 87, 82, 91, 96, 90, 98,104, 99,106,111,106,114,119,112,121,128,135],
    },
    '90d': {
      parcelas:  [540, 620, 700, 662, 748, 858, 824, 905, 980, 960,1045,1120,1204],
      proyectos: [350, 400, 450, 427, 482, 552, 531, 583, 632, 620, 675, 725, 776],
    },
  },
  broker: {
    '7d': {
      parcelas:  [42, 57, 48, 67, 77, 64, 86],
      proyectos: [26, 34, 29, 41, 47, 39, 52],
    },
    '30d': {
      parcelas:  [34, 39, 36, 45, 51, 43, 55, 60, 53, 64, 72, 61, 76, 81, 70, 85, 93, 82, 98,106, 96,111,120,110,128,137,124,145,155,167],
      proyectos: [21, 24, 22, 27, 30, 26, 33, 36, 31, 38, 43, 37, 45, 48, 42, 51, 55, 49, 59, 63, 58, 67, 72, 66, 76, 82, 74, 86, 93,100],
    },
    '90d': {
      parcelas:  [237, 270, 305, 290, 329, 376, 355, 396, 438, 424, 470, 517, 571],
      proyectos: [153, 175, 197, 188, 212, 242, 229, 256, 283, 274, 304, 334, 369],
    },
  },
};

export const X_LABELS: Record<Periodo, { label: string; index: number }[]> = {
  '7d': [
    { label: 'Lun', index: 0 }, { label: 'Mar', index: 1 }, { label: 'Mié', index: 2 },
    { label: 'Jue', index: 3 }, { label: 'Vie', index: 4 }, { label: 'Sáb', index: 5 }, { label: 'Dom', index: 6 },
  ],
  '30d': [
    { label: 'Sem 1', index: 0 }, { label: 'Sem 2', index: 9 }, { label: 'Sem 3', index: 19 }, { label: 'Sem 4', index: 29 },
  ],
  '90d': [
    { label: 'Mes 1', index: 0 }, { label: 'Mes 2', index: 4 }, { label: 'Mes 3', index: 8 }, { label: 'Hoy', index: 12 },
  ],
};

const RANKING_INMO: PropiedadRanking[] = [
  { id: 1, nombre: 'Parcela Vista Cordillera', ubicacion: 'Lo Barnechea, R. Metropolitana', imagen: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=80', vistas: 847, consultas: 12, tendencia: 23, estado: 'Alto interés' },
  { id: 2, nombre: 'Parcela Lago Azul', ubicacion: 'Villarrica, Araucanía', imagen: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=80', vistas: 612, consultas: 8, tendencia: 11, estado: 'Alta demanda' },
  { id: 3, nombre: 'Parcela Los Robles', ubicacion: 'Rancagua, O\'Higgins', imagen: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=80', vistas: 445, consultas: 5, tendencia: -4, estado: 'Estable' },
  { id: 4, nombre: 'Parcela El Valle Verde', ubicacion: 'San José de Maipo, R. Metropolitana', imagen: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80', vistas: 322, consultas: 3, tendencia: 6, estado: 'En crecimiento' },
  { id: 5, nombre: 'Parcela Sur Verde', ubicacion: 'Valdivia, Los Ríos', imagen: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=80', vistas: 189, consultas: 1, tendencia: -12, estado: 'Bajo interés' },
];

const RANKING_BROKER: PropiedadRanking[] = [
  { id: 1, nombre: 'Parcela Las Vertientes', ubicacion: 'Pucón, Araucanía', imagen: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=80', vistas: 512, consultas: 7, tendencia: 18, estado: 'Alto interés', inmobiliaria: 'Patagonia Properties' },
  { id: 2, nombre: 'Parcela Río Claro', ubicacion: 'Paillaco, Los Ríos', imagen: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=80', vistas: 387, consultas: 5, tendencia: 9, estado: 'Alta demanda', inmobiliaria: 'Sur Verde Propiedades' },
  { id: 3, nombre: 'Parcela Los Álamos', ubicacion: 'Colina, R. Metropolitana', imagen: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=80', vistas: 241, consultas: 3, tendencia: -5, estado: 'Estable', inmobiliaria: 'InmoCentro SpA' },
  { id: 4, nombre: 'Parcela Cerro Amarillo', ubicacion: 'Pirque, R. Metropolitana', imagen: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80', vistas: 198, consultas: 2, tendencia: 4, estado: 'En crecimiento', inmobiliaria: 'Tierras del Valle' },
];

const RANKING_INMO_PROYECTOS: PropiedadRanking[] = [
  { id: 1, nombre: 'Proyecto Vista Cordillera — Fase 2', ubicacion: 'Lo Barnechea, R. Metropolitana', imagen: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=80', vistas: 1240, consultas: 24, tendencia: 31, estado: 'Alto interés' },
  { id: 2, nombre: 'Condominio Los Arrayanes', ubicacion: 'Villarrica, Araucanía', imagen: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=80', vistas: 890, consultas: 17, tendencia: 14, estado: 'Alta demanda' },
  { id: 3, nombre: 'Proyecto Lago Ranco', ubicacion: 'Los Lagos, Los Ríos', imagen: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=80', vistas: 623, consultas: 11, tendencia: -2, estado: 'Estable' },
];

const RANKING_BROKER_PROYECTOS: PropiedadRanking[] = [
  { id: 1, nombre: 'Condominio Pucón Norte', ubicacion: 'Pucón, Araucanía', imagen: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=80', vistas: 734, consultas: 15, tendencia: 22, estado: 'Alto interés', inmobiliaria: 'Patagonia Properties' },
  { id: 2, nombre: 'Proyecto Ribera Sur', ubicacion: 'Valdivia, Los Ríos', imagen: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=80', vistas: 489, consultas: 9, tendencia: 7, estado: 'En crecimiento', inmobiliaria: 'Sur Verde Propiedades' },
];

const ESTADO_BADGE: Record<string, { bg: string; text: string; border: string }> = {
  'Alto interés':   { bg: '#DCFCE7', text: '#166534', border: '#86EFAC' },
  'Alta demanda':   { bg: '#DBEAFE', text: '#1E40AF', border: '#93C5FD' },
  'En crecimiento': { bg: '#F0FDF4', text: '#15803D', border: '#BBF7D0' },
  'Estable':        { bg: '#F3F4F6', text: '#6B7280', border: '#E5E7EB' },
  'Bajo interés':   { bg: '#FEF3C7', text: '#92400E', border: '#FCD34D' },
};

const PERIODO_LABELS: Record<Periodo, string> = { '7d': 'Últimos 7 días', '30d': 'Últimos 30 días', '90d': 'Últimos 90 días' };

const RANKING_SCALE: Record<Periodo, number> = { '7d': 0.22, '30d': 1.0, '90d': 3.1 };

// ─── Dual Line Chart (Parcelas vs Proyectos) ─────────────────────────────────

export function DualLineChart({ parcelas, proyectos, loading, periodo }: {
  parcelas: number[]; proyectos: number[]; loading: boolean; periodo: Periodo;
}) {
  const W = 800, H = 210;
  const PAD = { top: 16, right: 16, bottom: 36, left: 56 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const allVals = [...parcelas, ...proyectos];
  const minRaw = Math.min(...allVals);
  const maxRaw = Math.max(...allVals);
  const range = (maxRaw - minRaw) || 1;
  const min = minRaw - range * 0.08;
  const max = maxRaw + range * 0.06;
  const extent = max - min;

  const px = (i: number, len: number) => PAD.left + (i / (len - 1)) * innerW;
  const py = (v: number) => PAD.top + innerH - ((v - min) / extent) * innerH;

  const ySteps = 4;
  const yTicks = Array.from({ length: ySteps + 1 }, (_, i) => ({
    v: Math.round(min + (i / ySteps) * extent),
    y: PAD.top + innerH - (i / ySteps) * innerH,
  }));

  const makePath = (data: number[]) =>
    data.map((v, i) => `${i === 0 ? 'M' : 'L'}${px(i, data.length).toFixed(1)},${py(v).toFixed(1)}`).join(' ');

  const pPath = makePath(parcelas);
  const prPath = makePath(proyectos);
  const pArea = `${pPath} L${px(parcelas.length - 1, parcelas.length).toFixed(1)},${(PAD.top + innerH).toFixed(1)} L${px(0, parcelas.length).toFixed(1)},${(PAD.top + innerH).toFixed(1)}Z`;

  const showDots = parcelas.length <= 7;

  return (
    <div className="relative" style={{ opacity: loading ? 0.35 : 1, transition: 'opacity 0.25s ease' }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: '190px', display: 'block' }}>
        <defs>
          <linearGradient id="dualGradP" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#006B4E" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#006B4E" stopOpacity="0" />
          </linearGradient>
        </defs>

        {yTicks.map((t, i) => (
          <line key={i} x1={PAD.left} y1={t.y} x2={W - PAD.right} y2={t.y} stroke="#F0F0F0" strokeWidth="1" />
        ))}
        {yTicks.map((t, i) => (
          <text key={i} x={PAD.left - 8} y={t.y + 4} textAnchor="end" fontSize="11" fill="#B0B0B0" fontFamily="system-ui, sans-serif">
            {t.v >= 1000 ? `${(t.v / 1000).toFixed(1)}k` : t.v < 0 ? '' : t.v}
          </text>
        ))}
        {X_LABELS[periodo].map(({ label, index }) => (
          <text key={index} x={px(index, parcelas.length)} y={H - 6} textAnchor="middle" fontSize="11" fill="#B0B0B0" fontFamily="system-ui, sans-serif">
            {label}
          </text>
        ))}

        <path d={pArea} fill="url(#dualGradP)" />
        <path d={pPath} fill="none" stroke="#006B4E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d={prPath} fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 3" />

        {showDots && parcelas.map((v, i) => (
          <circle key={`p-${i}`} cx={px(i, parcelas.length)} cy={py(v)} r="4" fill="#006B4E" stroke="#FFFFFF" strokeWidth="2" />
        ))}
        {showDots && proyectos.map((v, i) => (
          <circle key={`pr-${i}`} cx={px(i, proyectos.length)} cy={py(v)} r="4" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
        ))}
      </svg>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}>
          <div className="w-6 h-6 rounded-full border-2 animate-spin" style={{ borderColor: '#E5E5E5', borderTopColor: '#006B4E' }} />
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function RendimientoView({ viewType }: RendimientoViewProps) {
  const [periodo, setPeriodo] = useState<Periodo>('30d');
  const [isLoading, setIsLoading] = useState(true);
  const [isChartLoading, setIsChartLoading] = useState(false);
  const [rankingTab, setRankingTab] = useState<'parcelas' | 'proyectos'>('parcelas');
  const [rankingPeriodo, setRankingPeriodo] = useState<Periodo>('30d');

  // Dropdown de período + rango personalizado
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCustomRange, setShowCustomRange] = useState(false);
  const [customFrom, setCustomFrom] = useState('');
  const [customTo, setCustomTo] = useState('');
  const [appliedRange, setAppliedRange] = useState<{ from: string; to: string } | null>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  // Cerrar el dropdown al hacer click fuera
  useEffect(() => {
    if (!showDropdown) return;
    const handler = (e: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
        setShowCustomRange(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showDropdown]);

  const handlePeriodo = (p: Periodo) => {
    if (p === periodo) return;
    setPeriodo(p);
    setAppliedRange(null);
    setIsChartLoading(true);
    setTimeout(() => setIsChartLoading(false), 500);
  };

  const handleApplyRange = () => {
    if (!customFrom || !customTo) return;
    setAppliedRange({ from: customFrom, to: customTo });
    setShowDropdown(false);
    setShowCustomRange(false);
    setIsChartLoading(true);
    setTimeout(() => setIsChartLoading(false), 500);
  };

  const formatRangeLabel = (from: string, to: string) => {
    const fmt = (d: string) => {
      const [y, m, day] = d.split('-');
      const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
      return `${parseInt(day)} ${meses[parseInt(m) - 1]}`;
    };
    return `${fmt(from)} – ${fmt(to)}`;
  };

  const kpis: KPI[] = viewType === 'inmobiliaria'
    ? [
        { label: 'Parcelas publicadas',  value: 12,   change: 2,   desc: 'vs mes anterior', icon: <Home className="w-5 h-5" style={{ color: '#006B4E' }} />, iconBg: '#F0FDF4' },
        { label: 'Visualizaciones',      value: 3840, change: 18,  desc: 'vs mes anterior', icon: <Eye className="w-5 h-5" style={{ color: '#2563EB' }} />, iconBg: '#EFF6FF' },
        { label: 'Consultas recibidas',  value: 47,   change: 12,  desc: 'vs mes anterior', icon: <MessageCircle className="w-5 h-5" style={{ color: '#7C3AED' }} />, iconBg: '#F5F3FF' },
        { label: 'Favoritos usuarios',   value: 28,   change: -3,  desc: 'vs mes anterior', icon: <Heart className="w-5 h-5" style={{ color: '#DC2626' }} />, iconBg: '#FFF1F2' },
      ]
    : [
        { label: 'En seguimiento',       value: 8,    change: 1,   desc: 'vs mes anterior', icon: <Home className="w-5 h-5" style={{ color: '#006B4E' }} />, iconBg: '#F0FDF4' },
        { label: 'Visualizaciones',      value: 1920, change: 24,  desc: 'vs mes anterior', icon: <Eye className="w-5 h-5" style={{ color: '#2563EB' }} />, iconBg: '#EFF6FF' },
        { label: 'Consultas generadas',  value: 31,   change: 8,   desc: 'vs mes anterior', icon: <MessageCircle className="w-5 h-5" style={{ color: '#7C3AED' }} />, iconBg: '#F5F3FF' },
        { label: 'Favoritos usuarios',   value: 14,   change: 5,   desc: 'vs mes anterior', icon: <Heart className="w-5 h-5" style={{ color: '#DC2626' }} />, iconBg: '#FFF1F2' },
      ];

  const chartData  = CHART_DATA[viewType][periodo];
  const ranking    = viewType === 'inmobiliaria'
    ? (rankingTab === 'parcelas' ? RANKING_INMO : RANKING_INMO_PROYECTOS)
    : (rankingTab === 'parcelas' ? RANKING_BROKER : RANKING_BROKER_PROYECTOS);

  // ─── Skeleton ──────────────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <main className="px-6 py-6 space-y-6">
        <div className="space-y-2">
          <div className="h-7 rounded-full animate-pulse" style={{ backgroundColor: '#E5E7EB', width: '220px' }} />
          <div className="h-3.5 rounded-full animate-pulse" style={{ backgroundColor: '#F3F4F6', width: '340px' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="p-5 rounded-2xl animate-pulse" style={{ border: '1.5px solid #E5E5E5', backgroundColor: '#FFFFFF', height: '118px' }} />
          ))}
        </div>
        <div className="p-5 rounded-2xl animate-pulse" style={{ border: '1.5px solid #E5E5E5', backgroundColor: '#FFFFFF', height: '268px' }} />
        <div className="rounded-2xl animate-pulse" style={{ border: '1.5px solid #E5E5E5', backgroundColor: '#FFFFFF', height: '320px' }} />
      </main>
    );
  }

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <main className="px-6 py-6 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h2)', fontWeight: 500, color: '#0A0A0A', lineHeight: 'var(--line-height-heading)' }}>
          Rendimiento comercial
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', color: '#6B6B6B', lineHeight: 'var(--line-height-body)' }}>
          Actividad e indicadores de tu operación en la plataforma
        </p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
        {kpis.map((kpi, i) => {
          const pos = kpi.change >= 0;
          return (
            <div key={i} className="p-5 rounded-2xl" style={{ border: '1.5px solid #E5E5E5', backgroundColor: '#FFFFFF' }}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: kpi.iconBg }}>
                  {kpi.icon}
                </div>
                <span
                  className="flex items-center gap-1 px-2 py-1 rounded-full"
                  style={{ backgroundColor: pos ? '#DCFCE7' : '#FEE2E2', color: pos ? '#166534' : '#991B1B', fontSize: '12px', fontWeight: 600, fontFamily: 'var(--font-body)' }}
                >
                  {pos ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  {pos ? '+' : ''}{kpi.change}%
                </span>
              </div>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h2)', fontWeight: 600, color: '#0A0A0A', lineHeight: 1.1, marginBottom: '4px' }}>
                {kpi.value.toLocaleString('es-CL')}
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151' }}>
                {kpi.label}
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#A3A3A3', marginTop: '2px' }}>
                {kpi.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Chart Section */}
      <div className="p-5 rounded-2xl" style={{ border: '1.5px solid #E5E5E5', backgroundColor: '#FFFFFF' }}>
        <div className="flex items-start justify-between mb-5">
          {/* Título + subtítulo + leyenda a la izquierda */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h4)', fontWeight: 500, color: '#0A0A0A' }}>
              Evolución de visualizaciones
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>
              Visitas de parcelas y proyectos en el período seleccionado
            </p>
            {/* Leyenda debajo del subtítulo */}
            <div className="flex items-center gap-6 mt-3">
              {[
                { color: '#006B4E', label: 'Parcelas', dash: false },
                { color: '#2563EB', label: 'Proyectos', dash: true },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <svg width="20" height="10" viewBox="0 0 20 10">
                    <line x1="0" y1="5" x2="20" y2="5" stroke={item.color} strokeWidth="2.5"
                      strokeDasharray={item.dash ? '6 3' : undefined} strokeLinecap="round" />
                  </svg>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#737373' }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dropdown único estilo GA4 */}
          <div className="relative" ref={datePickerRef}>
            <button
              onClick={() => setShowDropdown(v => !v)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
              style={{ border: '1px solid #E5E5E5', backgroundColor: '#FFFFFF', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#0A0A0A', fontWeight: 500, cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
            >
              <CalendarDays className="w-4 h-4" style={{ color: '#737373' }} />
              {appliedRange ? formatRangeLabel(appliedRange.from, appliedRange.to) : PERIODO_LABELS[periodo]}
              <ChevronDown className="w-3.5 h-3.5" style={{ color: '#737373', transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
            </button>

            {showDropdown && (
              <div
                className="absolute right-0 top-full mt-1 z-50 rounded-xl overflow-hidden"
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', minWidth: '210px' }}
              >
                {/* Presets */}
                {(['7d', '30d', '90d'] as Periodo[]).map(p => (
                  <button
                    key={p}
                    onClick={() => { handlePeriodo(p); setAppliedRange(null); setShowDropdown(false); setShowCustomRange(false); }}
                    className="w-full text-left px-4 py-2.5 transition-colors"
                    style={{
                      fontFamily: 'var(--font-body)', fontSize: '13px',
                      fontWeight: !appliedRange && periodo === p ? 600 : 400,
                      color: !appliedRange && periodo === p ? '#006B4E' : '#0A0A0A',
                      backgroundColor: !appliedRange && periodo === p ? '#F0F9F5' : '#FFFFFF',
                      border: 'none', cursor: 'pointer', display: 'block',
                    }}
                    onMouseEnter={e => { if (appliedRange || periodo !== p) e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
                    onMouseLeave={e => { if (appliedRange || periodo !== p) e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
                  >
                    {PERIODO_LABELS[p]}
                  </button>
                ))}

                {/* Separador */}
                <div style={{ height: '1px', backgroundColor: '#F0F0F0', margin: '2px 0' }} />

                {/* Rango personalizado */}
                <button
                  onClick={() => setShowCustomRange(v => !v)}
                  className="w-full text-left px-4 py-2.5 transition-colors flex items-center justify-between"
                  style={{
                    fontFamily: 'var(--font-body)', fontSize: '13px',
                    fontWeight: appliedRange ? 600 : 400,
                    color: appliedRange ? '#006B4E' : '#0A0A0A',
                    backgroundColor: appliedRange ? '#F0F9F5' : '#FFFFFF',
                    border: 'none', cursor: 'pointer',
                  }}
                  onMouseEnter={e => { if (!appliedRange) e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
                  onMouseLeave={e => { if (!appliedRange) e.currentTarget.style.backgroundColor = appliedRange ? '#F0F9F5' : '#FFFFFF'; }}
                >
                  <span>{appliedRange ? formatRangeLabel(appliedRange.from, appliedRange.to) : 'Rango personalizado'}</span>
                  <ChevronDown className="w-3.5 h-3.5" style={{ color: '#9CA3AF', transform: showCustomRange ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                </button>

                {/* Campos de fecha (expandibles) */}
                {showCustomRange && (
                  <div className="px-4 pb-4 space-y-3" style={{ borderTop: '1px solid #F0F0F0', paddingTop: '12px' }}>
                    <div>
                      <label style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: '#6B7280', display: 'block', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Desde
                      </label>
                      <input
                        type="date"
                        value={customFrom}
                        onChange={e => setCustomFrom(e.target.value)}
                        max={customTo || undefined}
                        className="w-full px-3 py-2 rounded-lg outline-none transition-colors"
                        style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#0A0A0A', border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA' }}
                        onFocus={e => { e.currentTarget.style.borderColor = '#006B4E'; }}
                        onBlur={e => { e.currentTarget.style.borderColor = '#E5E5E5'; }}
                      />
                    </div>
                    <div>
                      <label style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: '#6B7280', display: 'block', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Hasta
                      </label>
                      <input
                        type="date"
                        value={customTo}
                        onChange={e => setCustomTo(e.target.value)}
                        min={customFrom || undefined}
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
                      style={{
                        fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: '#FFFFFF',
                        backgroundColor: customFrom && customTo ? '#006B4E' : '#D1D5DB',
                        border: 'none', cursor: customFrom && customTo ? 'pointer' : 'not-allowed',
                      }}
                      onMouseEnter={e => { if (customFrom && customTo) e.currentTarget.style.backgroundColor = '#01533E'; }}
                      onMouseLeave={e => { if (customFrom && customTo) e.currentTarget.style.backgroundColor = '#006B4E'; }}
                    >
                      Aplicar
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <DualLineChart parcelas={chartData.parcelas} proyectos={chartData.proyectos} loading={isChartLoading} periodo={periodo} />
      </div>

      {/* Ranking / Tabla */}
      <div className="rounded-2xl overflow-hidden" style={{ border: '1.5px solid #E5E5E5', backgroundColor: '#FFFFFF' }}>
        {/* Table header */}
        <div className="px-5 pt-4 pb-0">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h4)', fontWeight: 500, color: '#0A0A0A' }}>
                {viewType === 'inmobiliaria' ? 'Ranking de publicaciones' : 'Propiedades en seguimiento'}
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>
                Top 10 parcelas y proyectos por interacción — {PERIODO_LABELS[rankingPeriodo]}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-1 p-1 rounded-full" style={{ backgroundColor: '#F5F5F5' }}>
                {(['7d', '30d', '90d'] as Periodo[]).map(p => (
                  <button
                    key={p}
                    onClick={() => setRankingPeriodo(p)}
                    className="px-3 py-1.5 rounded-full transition-all"
                    style={{
                      backgroundColor: rankingPeriodo === p ? '#0A0A0A' : 'transparent',
                      color: rankingPeriodo === p ? '#FFFFFF' : '#737373',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-xs)',
                      fontWeight: rankingPeriodo === p ? 600 : 400,
                      border: 'none', cursor: 'pointer',
                    }}
                  >
                    {PERIODO_LABELS[p]}
                  </button>
                ))}
              </div>
              {viewType === 'broker' && (
                <button
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all"
                  style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#333333'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0A0A0A'}
                >
                  <Plus className="w-3.5 h-3.5" />
                  Agregar propiedad
                </button>
              )}
            </div>
          </div>
          {/* Tabs */}
          <div className="flex gap-0" style={{ borderBottom: '1px solid #F0F0F0' }}>
            {(['parcelas', 'proyectos'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setRankingTab(tab)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: rankingTab === tab ? 600 : 400,
                  color: rankingTab === tab ? '#006B4E' : '#9CA3AF',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: rankingTab === tab ? '2px solid #006B4E' : '2px solid transparent',
                  padding: '8px 16px 10px',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  transition: 'color 0.15s',
                }}
              >
                {tab === 'parcelas' ? 'Parcelas' : 'Proyectos'}
              </button>
            ))}
          </div>
        </div>

        {/* Column headers */}
        <div
          className="px-5 py-2.5"
          style={{
            display: 'grid',
            gridTemplateColumns: viewType === 'inmobiliaria' ? '1fr 96px 80px 88px 130px 88px' : '1fr 96px 80px 88px 130px 88px',
            gap: '8px',
            borderBottom: '1px solid #F0F0F0',
            backgroundColor: '#FAFAFA',
          }}
        >
          {['Propiedad', 'Vistas', 'Consultas', 'Tendencia', 'Estado', ''].map((col, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 600,
                color: '#9CA3AF',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                textAlign: i > 0 ? 'center' : 'left',
              }}
            >
              {col}
            </span>
          ))}
        </div>

        {/* Rows */}
        {ranking.map((prop, rowIdx) => {
          const badge = ESTADO_BADGE[prop.estado] ?? { bg: '#F3F4F6', text: '#6B7280', border: '#E5E7EB' };
          const pos = prop.tendencia >= 0;
          return (
            <div
              key={prop.id}
              className="px-5 py-3 transition-colors"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 96px 80px 88px 130px 88px',
                gap: '8px',
                alignItems: 'center',
                borderBottom: rowIdx < ranking.length - 1 ? '1px solid #F9FAFB' : 'none',
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F9FAFB'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              {/* Propiedad */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                  <img src={prop.imagen} alt={prop.nombre} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#0A0A0A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {prop.nombre}
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {prop.inmobiliaria ? `${prop.inmobiliaria} · ` : ''}{prop.ubicacion}
                  </p>
                </div>
              </div>

              {/* Vistas */}
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151', textAlign: 'center' }}>
                {Math.round(prop.vistas * RANKING_SCALE[rankingPeriodo]).toLocaleString('es-CL')}
              </p>

              {/* Consultas */}
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151', textAlign: 'center' }}>
                {Math.max(1, Math.round(prop.consultas * RANKING_SCALE[rankingPeriodo]))}
              </p>

              {/* Tendencia */}
              <div className="flex items-center justify-center gap-1">
                {pos
                  ? <TrendingUp className="w-3.5 h-3.5" style={{ color: '#16A34A' }} />
                  : <TrendingDown className="w-3.5 h-3.5" style={{ color: '#DC2626' }} />
                }
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: pos ? '#16A34A' : '#DC2626' }}>
                  {pos ? '+' : ''}{prop.tendencia}%
                </span>
              </div>

              {/* Estado badge */}
              <div className="flex justify-center">
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: badge.bg, color: badge.text, border: `1px solid ${badge.border}`, fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}
                >
                  {prop.estado}
                </span>
              </div>

              {/* Action */}
              <div className="flex justify-center">
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                  style={{ backgroundColor: '#F5F5F5', color: '#374151', fontFamily: 'var(--font-body)' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#E5E5E5'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#F5F5F5'}
                >
                  {viewType === 'inmobiliaria'
                    ? <><Edit2 className="w-3 h-3" /> Editar</>
                    : <><Phone className="w-3 h-3" /> Contactar</>
                  }
                </button>
              </div>
            </div>
          );
        })}

        {/* Empty state (si no hubiera ranking) */}
        {ranking.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#F5F5F5' }}>
              <BarChart2 className="w-7 h-7" style={{ color: '#D1D5DB' }} />
            </div>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h4)', fontWeight: 500, color: '#0A0A0A', marginBottom: '6px' }}>
              {viewType === 'inmobiliaria' ? 'Sin publicaciones aún' : 'Sin propiedades en seguimiento'}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', maxWidth: '260px', lineHeight: '1.6' }}>
              {viewType === 'inmobiliaria'
                ? 'Publica tu primera parcela para ver el rendimiento acá.'
                : 'Agrega propiedades a tu seguimiento para ver el ranking.'}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
