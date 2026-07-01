import React from 'react';
import { Users, UserPlus, UserCheck, Activity, MousePointer, ArrowUpRight, ArrowDownRight, type LucideIcon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

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
  const pieColors = ['#006B4E', '#2563EB'];

  const origenTraficoDetallado = [
    { origen: 'Orgánico', semana1: 1200, semana2: 1320, semana3: 1410, semana4: 1565, total: 5606, porcentaje: 45, trending: 'up' },
    { origen: 'Pagado',   semana1: 980,  semana2: 1020, semana3: 990,  semana4: 997,  total: 3987, porcentaje: 32, trending: 'up' },
    { origen: 'Referido', semana1: 520,  semana2: 565,  semana3: 578,  semana4: 579,  total: 2242, porcentaje: 18, trending: 'up' },
    { origen: 'Otros',    semana1: 145,  semana2: 158,  semana3: 162,  semana4: 158,  total: 623,  porcentaje: 5,  trending: 'down' },
  ];

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
  const lineColors = ['#006B4E', '#2563EB', '#7C3AED', '#F59E0B'];

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

      {/* KPIs */}
      <section className="grid grid-cols-5 gap-4">
        {trafficKPIs.map((kpi, i) => (
          <KPICard key={i} {...kpi} />
        ))}
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
              <Bar dataKey="recurrentes" fill="#2563EB" radius={[4, 4, 0, 0]} name="Usuarios recurrentes" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 mt-4">
          {[{ label: 'Usuarios nuevos', color: '#006B4E' }, { label: 'Usuarios recurrentes', color: '#2563EB' }].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: item.color }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Origen del tráfico */}
      <section className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
        <div className="px-6 py-5" style={{ borderBottom: '1px solid #E5E5E5' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h4)', fontWeight: 500, color: '#0A0A0A', marginBottom: '4px' }}>
            Origen del tráfico
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#A3A3A3' }}>
            Evolución y distribución por fuente
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: '#FAFAFA', borderBottom: '1px solid #E5E5E5' }}>
              <tr>
                {['Origen', 'Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Total', '%', 'Tendencia'].map((h, i) => (
                  <th key={h} className={`px-6 py-4 ${i === 0 ? 'text-left' : 'text-right'}`}
                    style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {origenTraficoDetallado.map((origen, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #F5F5F5' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#FAFAFA')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
                >
                  <td className="px-6 py-4"><span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#0A0A0A' }}>{origen.origen}</span></td>
                  {[origen.semana1, origen.semana2, origen.semana3, origen.semana4].map((v, j) => (
                    <td key={j} className="px-6 py-4 text-right"><span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>{v.toLocaleString()}</span></td>
                  ))}
                  <td className="px-6 py-4 text-right"><span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#0A0A0A' }}>{origen.total.toLocaleString()}</span></td>
                  <td className="px-6 py-4 text-right"><span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#0A0A0A' }}>{origen.porcentaje}%</span></td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full" style={{ backgroundColor: origen.trending === 'up' ? '#E8F5EE' : '#FEE2E2' }}>
                      {origen.trending === 'up'
                        ? <ArrowUpRight className="w-3 h-3" style={{ color: '#006B4E' }} />
                        : <ArrowDownRight className="w-3 h-3" style={{ color: '#DC2626' }} />}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
