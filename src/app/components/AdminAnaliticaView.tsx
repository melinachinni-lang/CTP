import React, { useState, useRef, useEffect } from 'react';
import { Users, UserPlus, UserCheck, Activity, MousePointer, ArrowUpRight, ArrowDownRight, ChevronDown, Calendar, type LucideIcon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';

const RANGO_PRESETS = [
  { id: 'hoy',     label: 'Hoy' },
  { id: '7d',      label: 'Últimos 7 días' },
  { id: '28d',     label: 'Últimos 28 días' },
  { id: '30d',     label: 'Últimos 30 días' },
  { id: 'mes',     label: 'Este mes' },
  { id: 'mes_ant', label: 'El mes pasado' },
  { id: '90d',     label: 'Últimos 90 días' },
];

// ─── KPI Card ────────────────────────────────────────────────────────────────

function KPICard({ label, value, change, up, icon: Icon, iconBg, iconColor }: {
  label: string; value: string; change: string; up: boolean;
  icon: LucideIcon; iconBg: string; iconColor: string;
}) {
  return (
    <div className="rounded-2xl p-5" style={{ border: '1px solid #E5E5E5', backgroundColor: '#FFFFFF' }}>
      <div className="flex items-center justify-between mb-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: iconBg }}>
          <Icon className="w-4 h-4" style={{ color: iconColor }} />
        </div>
        <span
          className="flex items-center gap-0.5"
          style={{
            fontSize: '11px', fontWeight: 600, fontFamily: 'var(--font-body)',
            color: up ? '#006B4E' : '#DC2626',
            backgroundColor: up ? '#E8F5EE' : '#FEE2E2',
            padding: '2px 7px', borderRadius: '99px',
          }}
        >
          {up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {change}
        </span>
      </div>
      <p style={{ fontSize: '26px', fontWeight: 700, color: '#0A0A0A', fontFamily: 'var(--font-heading)', margin: '0 0 3px' }}>{value}</p>
      <p style={{ fontSize: '12px', color: '#737373', fontFamily: 'var(--font-body)', margin: 0 }}>{label}</p>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function AdminAnaliticaView() {
  const [rango, setRango] = useState('30d');
  const [showRango, setShowRango] = useState(false);
  const rangoLabel = RANGO_PRESETS.find(r => r.id === rango)?.label ?? '';

  const [origenPeriodo, setOrigenPeriodo] = useState('28d');
  const [showOrigenDropdown, setShowOrigenDropdown] = useState(false);
  const [showOrigenRango, setShowOrigenRango] = useState(false);
  const [origenFrom, setOrigenFrom] = useState('');
  const [origenTo, setOrigenTo] = useState('');
  const [origenApplied, setOrigenApplied] = useState<{ from: string; to: string } | null>(null);
  const origenPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (origenPickerRef.current && !origenPickerRef.current.contains(e.target as Node)) {
        setShowOrigenDropdown(false);
        setShowOrigenRango(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function formatOrigenRangeLabel(from: string, to: string) {
    if (!from && !to) return 'Rango personalizado';
    const fmt = (d: string) => { const [y, m, day] = d.split('-'); return `${day}/${m}/${y.slice(2)}`; };
    if (from && !to) return `Desde ${fmt(from)}`;
    if (!from && to) return `Hasta ${fmt(to)}`;
    return `${fmt(from)} – ${fmt(to)}`;
  }

  function handleApplyOrigenRango() {
    if (!origenFrom && !origenTo) return;
    setOrigenApplied({ from: origenFrom, to: origenTo });
    setShowOrigenRango(false);
  }

  const ORIGEN_PRESETS = [
    { id: '7d',  label: 'Últimos 7 días' },
    { id: '28d', label: 'Últimos 28 días' },
    { id: '90d', label: 'Últimos 90 días' },
    { id: 'mes', label: 'Este mes' },
  ];

  const origenData: Record<string, { fuentes: { nombre: string; actual: number; anterior: number }[] }> = {
    '7d':  { fuentes: [
      { nombre: 'Orgánico',       actual: 2100, anterior: 1890 },
      { nombre: 'Pagado',         actual: 1450, anterior: 1280 },
      { nombre: 'Redes Sociales', actual: 980,  anterior: 850  },
      { nombre: 'Directo',        actual: 620,  anterior: 710  },
    ]},
    '28d': { fuentes: [
      { nombre: 'Orgánico',       actual: 5606, anterior: 4890 },
      { nombre: 'Pagado',         actual: 3987, anterior: 3650 },
      { nombre: 'Redes Sociales', actual: 2890, anterior: 2340 },
      { nombre: 'Directo',        actual: 1823, anterior: 1980 },
    ]},
    '90d': { fuentes: [
      { nombre: 'Orgánico',       actual: 16200, anterior: 14100 },
      { nombre: 'Pagado',         actual: 11500, anterior: 10200 },
      { nombre: 'Redes Sociales', actual: 8400,  anterior: 7100  },
      { nombre: 'Directo',        actual: 5200,  anterior: 5800  },
    ]},
    'mes': { fuentes: [
      { nombre: 'Orgánico',       actual: 6800, anterior: 5900 },
      { nombre: 'Pagado',         actual: 4700, anterior: 4200 },
      { nombre: 'Redes Sociales', actual: 3200, anterior: 2800 },
      { nombre: 'Directo',        actual: 2100, anterior: 2350 },
    ]},
  };

  const traficoUnificado = [
    { dia: '1 jun',  visitas: 320,  consultas: 45,  reservas: 4  },
    { dia: '3 jun',  visitas: 385,  consultas: 52,  reservas: 5  },
    { dia: '5 jun',  visitas: 412,  consultas: 61,  reservas: 6  },
    { dia: '7 jun',  visitas: 456,  consultas: 58,  reservas: 7  },
    { dia: '9 jun',  visitas: 492,  consultas: 74,  reservas: 8  },
    { dia: '11 jun', visitas: 445,  consultas: 68,  reservas: 6  },
    { dia: '13 jun', visitas: 512,  consultas: 79,  reservas: 9  },
    { dia: '15 jun', visitas: 534,  consultas: 83,  reservas: 10 },
    { dia: '17 jun', visitas: 556,  consultas: 91,  reservas: 11 },
    { dia: '19 jun', visitas: 498,  consultas: 76,  reservas: 8  },
    { dia: '21 jun', visitas: 528,  consultas: 84,  reservas: 9  },
    { dia: '23 jun', visitas: 565,  consultas: 95,  reservas: 12 },
    { dia: '25 jun', visitas: 556,  consultas: 88,  reservas: 11 },
    { dia: '27 jun', visitas: 578,  consultas: 97,  reservas: 13 },
    { dia: '29 jun', visitas: 621,  consultas: 104, reservas: 14 },
  ];

  const LINEAS = [
    { key: 'visitas',   label: 'Visitas',   color: '#2563EB' },
    { key: 'consultas', label: 'Consultas', color: '#006B4E' },
    { key: 'reservas',  label: 'Reservas',  color: '#7C3AED' },
  ];

  const trafficKPIs = [
    { label: 'Usuarios totales',         value: '8.245',  change: '+14.2%', up: true,  icon: Users,        iconBg: '#EFF6FF', iconColor: '#2563EB' },
    { label: 'Usuarios nuevos',          value: '5.621',  change: '+18.5%', up: true,  icon: UserPlus,     iconBg: '#E8F5EE', iconColor: '#006B4E' },
    { label: 'Usuarios recurrentes',     value: '2.624',  change: '+7.3%',  up: true,  icon: UserCheck,    iconBg: '#F0FDFA', iconColor: '#0D9488' },
    { label: 'Sesiones',                 value: '12.458', change: '+12.5%', up: true,  icon: Activity,     iconBg: '#F5F3FF', iconColor: '#7C3AED' },
    { label: 'Promedio sesiones/usuario',value: '1.51',   change: '-2.1%',  up: false, icon: MousePointer, iconBg: '#FFF7ED', iconColor: '#C2410C' },
  ];

  const visitasPorDia = [
    { dia: '1', visitas: 320 }, { dia: '2', visitas: 385 }, { dia: '3', visitas: 412 },
    { dia: '4', visitas: 394 }, { dia: '5', visitas: 456 }, { dia: '6', visitas: 478 },
    { dia: '7', visitas: 492 }, { dia: '8', visitas: 445 }, { dia: '9', visitas: 421 },
    { dia: '10', visitas: 438 }, { dia: '11', visitas: 465 }, { dia: '12', visitas: 512 },
    { dia: '13', visitas: 498 }, { dia: '14', visitas: 476 }, { dia: '15', visitas: 521 },
    { dia: '16', visitas: 534 }, { dia: '17', visitas: 556 }, { dia: '18', visitas: 542 },
    { dia: '19', visitas: 498 }, { dia: '20', visitas: 487 }, { dia: '21', visitas: 512 },
    { dia: '22', visitas: 528 }, { dia: '23', visitas: 565 }, { dia: '24', visitas: 542 },
    { dia: '25', visitas: 534 }, { dia: '26', visitas: 556 }, { dia: '27', visitas: 578 },
    { dia: '28', visitas: 592 }, { dia: '29', visitas: 608 }, { dia: '30', visitas: 621 },
  ];

  const usuariosComparacion = [
    { semana: 'Sem 1', nuevos: 1250, recurrentes: 580 },
    { semana: 'Sem 2', nuevos: 1420, recurrentes: 640 },
    { semana: 'Sem 3', nuevos: 1380, recurrentes: 690 },
    { semana: 'Sem 4', nuevos: 1571, recurrentes: 714 },
  ];

  const porDispositivo = [
    { dispositivo: 'Mobile',  porcentaje: 68, valor: 5606 },
    { dispositivo: 'Desktop', porcentaje: 32, valor: 2639 },
  ];
  const pieColors = ['#006B4E', '#52C49A'];

  const proyectosMasVisitados = [
    { nombre: 'Parcelas Valle Hermoso',      visitas: 2845, ratio: 4.4 },
    { nombre: 'Condominio Los Arrayanes',    visitas: 2234, ratio: 4.4 },
    { nombre: 'Parcelas Río Claro',          visitas: 1876, ratio: 4.6 },
    { nombre: 'Proyecto Colina Verde',       visitas: 1654, ratio: 4.4 },
    { nombre: 'Parcelas La Montaña',         visitas: 1432, ratio: 4.5 },
    { nombre: 'Valle del Sol',               visitas: 1298, ratio: 4.5 },
    { nombre: 'Parcelas Los Robles',         visitas: 1156, ratio: 4.4 },
    { nombre: 'Condominio Piedra Azul',      visitas: 987,  ratio: 4.3 },
  ];

  const interaccionesSemanales = [
    { semana: 'Sem 1', ctaClicks: 245, formIniciados: 156, formEnviados: 98,  whatsapp: 142 },
    { semana: 'Sem 2', ctaClicks: 268, formIniciados: 172, formEnviados: 112, whatsapp: 158 },
    { semana: 'Sem 3', ctaClicks: 284, formIniciados: 185, formEnviados: 124, whatsapp: 176 },
    { semana: 'Sem 4', ctaClicks: 312, formIniciados: 198, formEnviados: 138, whatsapp: 192 },
  ];
  const lineColors = ['#006B4E', '#52C49A', '#7C3AED', '#F59E0B'];

  const tooltipStyle = {
    contentStyle: {
      backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5',
      borderRadius: '12px', padding: '8px 12px',
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
      fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)',
    },
  };

  const axisStyle = {
    stroke: '#A3A3A3',
    style: { fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)' },
  };

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div>
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 'var(--font-weight-regular)',
          fontSize: 'var(--font-size-h2)',
          lineHeight: 'var(--line-height-heading)',
          color: '#0A0A0A',
          marginBottom: '8px'
        }}>
          Analítica de la plataforma
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-body-base)',
          color: '#737373'
        }}>
          Métricas de tráfico, usuarios y comportamiento en CompraTuParcela
        </p>
      </div>

      {/* KPIs */}
      <section className="grid grid-cols-5 gap-4">
        {trafficKPIs.map((kpi, i) => (
          <KPICard key={i} {...kpi} />
        ))}
      </section>

      {/* Gráfico principal unificado estilo GA4 */}
      <section className="rounded-2xl p-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h4)', fontWeight: 500, color: '#0A0A0A', marginBottom: '4px' }}>
              Tráfico de la plataforma
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#A3A3A3' }}>
              Visitas, consultas y reservas en el período seleccionado
            </p>
          </div>
          {/* Date range selector */}
          <div className="relative">
            <button
              onClick={() => setShowRango(v => !v)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
              style={{ border: '1px solid #E5E5E5', backgroundColor: '#FFFFFF', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#0A0A0A', fontWeight: 500 }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
            >
              <Calendar className="w-4 h-4" style={{ color: '#737373' }} />
              {rangoLabel}
              <ChevronDown className="w-3.5 h-3.5" style={{ color: '#737373', transform: showRango ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
            </button>
            {showRango && (
              <div className="absolute right-0 top-full mt-1 z-50 rounded-xl overflow-hidden" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', minWidth: '200px' }}>
                {RANGO_PRESETS.map(preset => (
                  <button
                    key={preset.id}
                    onClick={() => { setRango(preset.id); setShowRango(false); }}
                    className="w-full text-left px-4 py-2.5 transition-colors"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: rango === preset.id ? 600 : 400, color: rango === preset.id ? '#006B4E' : '#0A0A0A', backgroundColor: rango === preset.id ? '#F0F9F5' : '#FFFFFF' }}
                    onMouseEnter={e => { if (rango !== preset.id) e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
                    onMouseLeave={e => { if (rango !== preset.id) e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Leyenda de líneas */}
        <div className="flex items-center gap-6 mb-4">
          {LINEAS.map(l => (
            <div key={l.key} className="flex items-center gap-2">
              <div style={{ width: '24px', height: '3px', borderRadius: '2px', backgroundColor: l.color }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#737373' }}>{l.label}</span>
            </div>
          ))}
        </div>

        <div style={{ height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={traficoUnificado} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
              <XAxis dataKey="dia" tick={{ fontFamily: 'var(--font-body)', fontSize: 11, fill: '#A3A3A3' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontFamily: 'var(--font-body)', fontSize: 11, fill: '#A3A3A3' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: '12px', fontFamily: 'var(--font-body)', fontSize: '13px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              {LINEAS.map(l => (
                <Line key={l.key} type="monotone" dataKey={l.key} stroke={l.color} strokeWidth={2.5} dot={false} name={l.label} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Visitas por día + Por dispositivo */}
      <div className="grid grid-cols-12 gap-6">
        <section className="col-span-8 rounded-2xl p-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h4)', fontWeight: 500, color: '#0A0A0A', marginBottom: '4px' }}>
            Visitas por día
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#A3A3A3', marginBottom: '24px' }}>
            Últimos 30 días
          </p>
          <div style={{ height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visitasPorDia}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                <XAxis dataKey="dia" {...axisStyle} />
                <YAxis {...axisStyle} />
                <Tooltip {...tooltipStyle} />
                <Line type="monotone" dataKey="visitas" stroke="#006B4E" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="col-span-4 rounded-2xl p-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h4)', fontWeight: 500, color: '#0A0A0A', marginBottom: '24px' }}>
            Por dispositivo
          </h2>
          <div style={{ height: '200px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={porDispositivo.map(d => ({ name: d.dispositivo, value: d.porcentaje }))}
                  cx="50%" cy="50%"
                  innerRadius={55} outerRadius={80}
                  paddingAngle={4} dataKey="value"
                >
                  {porDispositivo.map((_, i) => (
                    <Cell key={i} fill={pieColors[i]} />
                  ))}
                </Pie>
                <Tooltip {...tooltipStyle} formatter={(v: any) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-3 mt-4">
            {porDispositivo.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: pieColors[i], flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#0A0A0A' }}>{item.dispositivo}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', fontWeight: 600, color: '#0A0A0A' }}>{item.porcentaje}%</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#A3A3A3' }}>{item.valor.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Usuarios nuevos vs recurrentes */}
      <section className="rounded-2xl p-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h4)', fontWeight: 500, color: '#0A0A0A', marginBottom: '4px' }}>
          Usuarios nuevos vs recurrentes
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#A3A3A3', marginBottom: '24px' }}>
          Comparación semanal del período seleccionado
        </p>
        <div style={{ height: '280px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={usuariosComparacion}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
              <XAxis dataKey="semana" {...axisStyle} />
              <YAxis {...axisStyle} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="nuevos"      fill="#006B4E" radius={[4, 4, 0, 0]} name="Usuarios nuevos" />
              <Bar dataKey="recurrentes" fill="#52C49A" radius={[4, 4, 0, 0]} name="Usuarios recurrentes" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 mt-4">
          {[{ label: 'Usuarios nuevos', color: '#006B4E' }, { label: 'Usuarios recurrentes', color: '#52C49A' }].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: item.color }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Origen del tráfico */}
      <section className="rounded-2xl" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
        <div className="px-6 py-5 flex items-center justify-between" style={{ borderBottom: '1px solid #E5E5E5' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h4)', fontWeight: 500, color: '#0A0A0A', marginBottom: '4px' }}>
              Origen del tráfico
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#A3A3A3' }}>
              Distribución de sesiones por fuente
            </p>
          </div>
          <div className="flex items-center gap-2" ref={origenPickerRef}>
            {/* Preset dropdown */}
            <div className="relative">
              <button
                onClick={() => { setShowOrigenDropdown(!showOrigenDropdown); setShowOrigenRango(false); }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{ border: `1px solid ${origenApplied ? '#E5E5E5' : '#E5E5E5'}`, backgroundColor: origenApplied ? '#FAFAFA' : '#FAFAFA', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: origenApplied ? '#9CA3AF' : '#374151', cursor: 'pointer', opacity: origenApplied ? 0.6 : 1 }}
              >
                <Calendar className="w-3.5 h-3.5" style={{ color: '#737373' }} />
                {origenApplied ? formatOrigenRangeLabel(origenApplied.from, origenApplied.to) : ORIGEN_PRESETS.find(p => p.id === origenPeriodo)?.label}
                <ChevronDown className="w-3.5 h-3.5" style={{ color: '#737373' }} />
              </button>
              {showOrigenDropdown && (
                <div className="absolute right-0 top-full mt-1 z-20 rounded-xl py-1" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', minWidth: '160px' }}>
                  {ORIGEN_PRESETS.map(p => (
                    <button key={p.id} onClick={() => { setOrigenPeriodo(p.id); setOrigenApplied(null); setOrigenFrom(''); setOrigenTo(''); setShowOrigenDropdown(false); }}
                      className="w-full text-left px-4 py-2"
                      style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: !origenApplied && origenPeriodo === p.id ? '#006B4E' : '#374151', backgroundColor: !origenApplied && origenPeriodo === p.id ? '#E8F5EE' : 'transparent', cursor: 'pointer', display: 'block' }}>
                      {p.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Rango button */}
            <div className="relative">
              <button
                onClick={() => { setShowOrigenRango(!showOrigenRango); setShowOrigenDropdown(false); }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors"
                style={{ border: `1px solid ${origenApplied ? '#006B4E' : '#E5E5E5'}`, backgroundColor: origenApplied ? '#E8F5EE' : '#FAFAFA', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: origenApplied ? '#006B4E' : '#374151', cursor: 'pointer', fontWeight: origenApplied ? 600 : 400 }}>
                <Calendar className="w-3.5 h-3.5" />
                Rango
              </button>
              {showOrigenRango && (
                <div className="absolute right-0 top-full mt-1 z-20 rounded-xl p-4" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 4px 16px rgba(0,0,0,0.10)', minWidth: '240px' }}>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: '#374151', fontFamily: 'var(--font-body)', marginBottom: '12px' }}>Rango personalizado</p>
                  <div className="flex flex-col gap-3 mb-4">
                    <div>
                      <label style={{ fontSize: '11px', color: '#9CA3AF', fontFamily: 'var(--font-body)', display: 'block', marginBottom: '4px' }}>Desde</label>
                      <input type="date" value={origenFrom} onChange={e => setOrigenFrom(e.target.value)} style={{ width: '100%', border: '1px solid #E5E5E5', borderRadius: '8px', padding: '6px 10px', fontSize: '13px', fontFamily: 'var(--font-body)', color: '#0A0A0A', outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '11px', color: '#9CA3AF', fontFamily: 'var(--font-body)', display: 'block', marginBottom: '4px' }}>Hasta</label>
                      <input type="date" value={origenTo} onChange={e => setOrigenTo(e.target.value)} min={origenFrom} style={{ width: '100%', border: '1px solid #E5E5E5', borderRadius: '8px', padding: '6px 10px', fontSize: '13px', fontFamily: 'var(--font-body)', color: '#0A0A0A', outline: 'none' }} />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {origenApplied && (
                      <button onClick={() => { setOrigenApplied(null); setOrigenFrom(''); setOrigenTo(''); setShowOrigenRango(false); }} style={{ flex: 1, fontSize: '12px', fontWeight: 600, color: '#DC2626', borderRadius: '200px', border: '1px solid #FECACA', backgroundColor: '#FFF5F5', padding: '7px 0', cursor: 'pointer' }}>
                        Limpiar
                      </button>
                    )}
                    <button onClick={handleApplyOrigenRango} disabled={!origenFrom && !origenTo}
                      style={{ flex: 1, fontSize: '12px', fontWeight: 600, color: '#FFFFFF', borderRadius: '200px', backgroundColor: (origenFrom || origenTo) ? '#006B4E' : '#D1D5DB', padding: '7px 0', border: 'none', cursor: (origenFrom || origenTo) ? 'pointer' : 'not-allowed' }}>
                      Aplicar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="px-6 py-5">
          {(() => {
            const fuentes = origenData[origenApplied ? '28d' : origenPeriodo].fuentes;
            const total = fuentes.reduce((s, f) => s + f.actual, 0);
            const maxVal = origenApplied
              ? Math.max(...fuentes.map(f => f.actual))
              : Math.max(...fuentes.flatMap(f => [f.actual, f.anterior]));
            return (
              <div className="space-y-5">
                {fuentes.map((f, i) => {
                  const actualPct = (f.actual / maxVal) * 100;
                  const anteriorPct = (f.anterior / maxVal) * 100;
                  const sharePct = Math.round((f.actual / total) * 100);
                  const delta = f.actual - f.anterior;
                  const deltaUp = delta >= 0;
                  return (
                    <div key={i} className="flex items-center gap-4">
                      <span style={{ width: '120px', flexShrink: 0, fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151' }}>{f.nombre}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ height: '14px', width: `${actualPct}%`, backgroundColor: '#006B4E', borderRadius: '3px', marginBottom: origenApplied ? 0 : '5px', minWidth: '4px' }} />
                        {!origenApplied && (
                          <div style={{ height: '10px', width: `${anteriorPct}%`, borderRadius: '3px', minWidth: '4px', backgroundColor: '#A7E3C8', backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255,255,255,0.55) 3px, rgba(255,255,255,0.55) 6px)' }} />
                        )}
                      </div>
                      <div style={{ width: '100px', flexShrink: 0, textAlign: 'right' }}>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#0A0A0A' }}>{f.actual.toLocaleString('es-CL')}</div>
                        <div className="flex items-center justify-end gap-1.5" style={{ fontFamily: 'var(--font-body)', fontSize: '11px' }}>
                          <span style={{ color: '#9CA3AF' }}>{sharePct}%</span>
                          {!origenApplied && (
                            <span style={{ color: deltaUp ? '#006B4E' : '#DC2626', fontWeight: 500 }}>
                              {deltaUp ? '↑' : '↓'}{Math.abs(delta).toLocaleString('es-CL')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
          <div className="flex items-center gap-6 mt-6 pt-4" style={{ borderTop: '1px solid #F5F5F5' }}>
            <div className="flex items-center gap-2">
              <div style={{ width: '24px', height: '10px', backgroundColor: '#006B4E', borderRadius: '3px', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#737373' }}>
                {origenApplied ? formatOrigenRangeLabel(origenApplied.from, origenApplied.to) : 'Período actual'}
              </span>
            </div>
            {!origenApplied && (
              <div className="flex items-center gap-2">
                <div style={{ width: '24px', height: '8px', borderRadius: '3px', flexShrink: 0, backgroundColor: '#A7E3C8', backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255,255,255,0.55) 3px, rgba(255,255,255,0.55) 6px)' }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#737373' }}>Período anterior</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Proyectos + Interacciones */}
      <div className="grid grid-cols-2 gap-6">
        <section className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
          <div className="px-6 py-5" style={{ borderBottom: '1px solid #E5E5E5' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h4)', fontWeight: 500, color: '#0A0A0A' }}>
              Proyectos más visitados
            </h2>
          </div>
          <table className="w-full">
            <thead style={{ backgroundColor: '#FAFAFA', borderBottom: '1px solid #E5E5E5' }}>
              <tr>
                {['#', 'Proyecto', 'Visitas', 'Ratio'].map((h, i) => (
                  <th key={h} className={`px-6 py-4 ${i < 2 ? 'text-left' : 'text-right'}`}
                    style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {proyectosMasVisitados.map((p, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #F5F5F5' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#FAFAFA')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center" style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: i < 3 ? '#006B4E' : '#F5F5F5', color: i < 3 ? '#FFFFFF' : '#737373', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600 }}>
                      {i + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4"><span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#0A0A0A' }}>{p.nombre}</span></td>
                  <td className="px-6 py-4 text-right"><span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A' }}>{p.visitas.toLocaleString()}</span></td>
                  <td className="px-6 py-4 text-right"><span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#0A0A0A' }}>{p.ratio}%</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="rounded-2xl p-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h4)', fontWeight: 500, color: '#0A0A0A', marginBottom: '4px' }}>
            Interacciones clave
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#A3A3A3', marginBottom: '24px' }}>
            Evolución de acciones de interés
          </p>
          <div style={{ height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={interaccionesSemanales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                <XAxis dataKey="semana" {...axisStyle} />
                <YAxis {...axisStyle} />
                <Tooltip {...tooltipStyle} />
                <Line type="monotone" dataKey="ctaClicks"     stroke={lineColors[0]} strokeWidth={2} dot={false} name="CTA Clicks" />
                <Line type="monotone" dataKey="formIniciados" stroke={lineColors[1]} strokeWidth={2} dot={false} name="Forms iniciados" />
                <Line type="monotone" dataKey="formEnviados"  stroke={lineColors[2]} strokeWidth={2} dot={false} name="Forms enviados" />
                <Line type="monotone" dataKey="whatsapp"      stroke={lineColors[3]} strokeWidth={2} dot={false} name="WhatsApp" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-6">
            {[
              { label: 'CTA Clicks',     color: lineColors[0] },
              { label: 'Forms iniciados',color: lineColors[1] },
              { label: 'Forms enviados', color: lineColors[2] },
              { label: 'WhatsApp',       color: lineColors[3] },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: item.color }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#737373' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

    </div>
  );
}
