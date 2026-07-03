import React, { useState, useEffect } from 'react';
import { Eye, MessageCircle, Heart, Home, TrendingUp, TrendingDown, Edit2, Phone, Plus, BarChart2 } from 'lucide-react';

type ViewType = 'inmobiliaria' | 'broker';
type Periodo = '7d' | '30d' | '90d';

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

const CHART_DATA: Record<ViewType, Record<Periodo, number[]>> = {
  inmobiliaria: {
    '7d': [142, 198, 167, 224, 251, 213, 289],
    '30d': [120, 135, 128, 156, 167, 145, 178, 192, 185, 201, 215, 198, 224, 231, 218, 242, 255, 239, 261, 278, 265, 283, 297, 281, 304, 318, 299, 325, 341, 357],
    '90d': [890, 1020, 1150, 1089, 1230, 1410, 1355, 1488, 1612, 1580, 1720, 1845, 1980],
  },
  broker: {
    '7d': [68, 91, 77, 108, 124, 103, 138],
    '30d': [55, 63, 58, 72, 81, 69, 88, 96, 84, 102, 115, 98, 121, 129, 112, 136, 148, 131, 157, 169, 154, 178, 192, 176, 204, 219, 198, 231, 248, 267],
    '90d': [390, 445, 502, 478, 541, 618, 584, 652, 721, 698, 774, 851, 940],
  },
};

const X_LABELS: Record<Periodo, { label: string; index: number }[]> = {
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

const PERIODO_LABELS: Record<Periodo, string> = { '7d': '7 días', '30d': '30 días', '90d': '90 días' };

const RANKING_SCALE: Record<Periodo, number> = { '7d': 0.22, '30d': 1.0, '90d': 3.1 };

// ─── SVG Line Chart ───────────────────────────────────────────────────────────

function LineChart({ data, color, loading, periodo }: { data: number[]; color: string; loading: boolean; periodo: Periodo }) {
  const W = 800, H = 210;
  const PAD = { top: 16, right: 16, bottom: 36, left: 56 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const minRaw = Math.min(...data);
  const maxRaw = Math.max(...data);
  const range = (maxRaw - minRaw) || 1;
  const min = minRaw - range * 0.08;
  const max = maxRaw + range * 0.06;
  const extent = max - min;

  const px = (i: number) => PAD.left + (i / (data.length - 1)) * innerW;
  const py = (v: number) => PAD.top + innerH - ((v - min) / extent) * innerH;

  const linePath = data.map((v, i) => `${i === 0 ? 'M' : 'L'}${px(i).toFixed(1)},${py(v).toFixed(1)}`).join(' ');
  const areaPath = `${linePath} L${px(data.length - 1).toFixed(1)},${(PAD.top + innerH).toFixed(1)} L${px(0).toFixed(1)},${(PAD.top + innerH).toFixed(1)}Z`;

  const ySteps = 4;
  const yTicks = Array.from({ length: ySteps + 1 }, (_, i) => ({
    v: Math.round(min + (i / ySteps) * extent),
    y: PAD.top + innerH - (i / ySteps) * innerH,
  }));

  const showDots = data.length <= 7;
  const gradId = `chartGrad${color.replace('#', '')}`;

  return (
    <div className="relative" style={{ opacity: loading ? 0.35 : 1, transition: 'opacity 0.25s ease' }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: '190px', display: 'block' }}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.18" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        {yTicks.map((t, i) => (
          <line key={i} x1={PAD.left} y1={t.y} x2={W - PAD.right} y2={t.y} stroke="#F0F0F0" strokeWidth="1" />
        ))}

        {/* Y-axis labels */}
        {yTicks.map((t, i) => (
          <text key={i} x={PAD.left - 8} y={t.y + 4} textAnchor="end" fontSize="11" fill="#B0B0B0" fontFamily="system-ui, sans-serif">
            {t.v >= 1000 ? `${(t.v / 1000).toFixed(t.v >= 10000 ? 0 : 1)}k` : t.v < 0 ? '' : t.v}
          </text>
        ))}

        {/* X-axis labels */}
        {X_LABELS[periodo].map(({ label, index }) => (
          <text key={index} x={px(index)} y={H - 6} textAnchor="middle" fontSize="11" fill="#B0B0B0" fontFamily="system-ui, sans-serif">
            {label}
          </text>
        ))}

        {/* Area fill */}
        <path d={areaPath} fill={`url(#${gradId})`} />

        {/* Line */}
        <path d={linePath} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Dots — only for 7-day view */}
        {showDots && data.map((v, i) => (
          <circle key={i} cx={px(i)} cy={py(v)} r="4" fill={color} stroke="#FFFFFF" strokeWidth="2" />
        ))}
      </svg>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}>
          <div
            className="w-6 h-6 rounded-full border-2 animate-spin"
            style={{ borderColor: '#E5E5E5', borderTopColor: color }}
          />
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

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const handlePeriodo = (p: Periodo) => {
    if (p === periodo) return;
    setPeriodo(p);
    setIsChartLoading(true);
    setTimeout(() => setIsChartLoading(false), 500);
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
  const chartTitle = viewType === 'inmobiliaria'
    ? 'Evolución de visualizaciones'
    : 'Evolución del interés en propiedades';

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
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h4)', fontWeight: 500, color: '#0A0A0A' }}>
              {chartTitle}
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>
              Últimos {PERIODO_LABELS[periodo]}
            </p>
          </div>
          {/* Period selector */}
          <div className="flex gap-1 p-1 rounded-full" style={{ backgroundColor: '#F3F4F6' }}>
            {(['7d', '30d', '90d'] as Periodo[]).map(p => (
              <button
                key={p}
                onClick={() => handlePeriodo(p)}
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
                style={{
                  fontFamily: 'var(--font-body)',
                  backgroundColor: periodo === p ? '#FFFFFF' : 'transparent',
                  color: periodo === p ? '#0A0A0A' : '#6B7280',
                  boxShadow: periodo === p ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                }}
              >
                {PERIODO_LABELS[p]}
              </button>
            ))}
          </div>
        </div>
        <LineChart data={chartData} color="#006B4E" loading={isChartLoading} periodo={periodo} />
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
                Por interacción — {PERIODO_LABELS[rankingPeriodo]}
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
