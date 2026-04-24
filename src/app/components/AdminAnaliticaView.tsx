import React from 'react';
import { Users, UserPlus, UserCheck, Activity, MousePointer, FileText, Send, MessageCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export function AdminAnaliticaView() {
  // KPIs de tráfico
  const trafficKPIs = [
    { label: 'Usuarios totales', value: '8,245', change: '+14.2%', trending: 'up' as const, icon: Users },
    { label: 'Usuarios nuevos', value: '5,621', change: '+18.5%', trending: 'up' as const, icon: UserPlus },
    { label: 'Usuarios recurrentes', value: '2,624', change: '+7.3%', trending: 'up' as const, icon: UserCheck },
    { label: 'Sesiones', value: '12,458', change: '+12.5%', trending: 'up' as const, icon: Activity },
    { label: 'Promedio sesiones/usuario', value: '1.51', change: '-2.1%', trending: 'down' as const, icon: Activity }
  ];

  // Datos de visitas por día (últimos 30 días)
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
    { dia: '28', visitas: 592 }, { dia: '29', visitas: 608 }, { dia: '30', visitas: 621 }
  ];

  // Usuarios nuevos vs recurrentes
  const usuariosComparacion = [
    { semana: 'Sem 1', nuevos: 1250, recurrentes: 580 },
    { semana: 'Sem 2', nuevos: 1420, recurrentes: 640 },
    { semana: 'Sem 3', nuevos: 1380, recurrentes: 690 },
    { semana: 'Sem 4', nuevos: 1571, recurrentes: 714 }
  ];

  // Distribución por dispositivo
  const porDispositivo = [
    { dispositivo: 'Mobile', porcentaje: 68, valor: 5606 },
    { dispositivo: 'Desktop', porcentaje: 32, valor: 2639 }
  ];

  // Origen del tráfico detallado con evolución
  const origenTraficoDetallado = [
    { origen: 'Orgánico', semana1: 1200, semana2: 1320, semana3: 1410, semana4: 1565, total: 5606, porcentaje: 45, trending: 'up' },
    { origen: 'Pagado', semana1: 980, semana2: 1020, semana3: 990, semana4: 997, total: 3987, porcentaje: 32, trending: 'up' },
    { origen: 'Referido', semana1: 520, semana2: 565, semana3: 578, semana4: 579, total: 2242, porcentaje: 18, trending: 'up' },
    { origen: 'Otros', semana1: 145, semana2: 158, semana3: 162, semana4: 158, total: 623, porcentaje: 5, trending: 'down' }
  ];

  // Top proyectos más visitados
  const proyectosMasVisitados = [
    { nombre: 'Parcelas Valle Hermoso', visitas: 2845, contactos: 124, ratio: 4.4 },
    { nombre: 'Condominio Los Arrayanes', visitas: 2234, contactos: 98, ratio: 4.4 },
    { nombre: 'Parcelas Río Claro', visitas: 1876, contactos: 87, ratio: 4.6 },
    { nombre: 'Proyecto Colina Verde', visitas: 1654, contactos: 72, ratio: 4.4 },
    { nombre: 'Parcelas La Montaña', visitas: 1432, contactos: 65, ratio: 4.5 },
    { nombre: 'Valle del Sol', visitas: 1298, contactos: 58, ratio: 4.5 },
    { nombre: 'Parcelas Los Robles', visitas: 1156, contactos: 51, ratio: 4.4 },
    { nombre: 'Condominio Piedra Azul', visitas: 987, contactos: 42, ratio: 4.3 }
  ];

  // Interacciones clave por semana
  const interaccionesSemanales = [
    { semana: 'Sem 1', ctaClicks: 245, formIniciados: 156, formEnviados: 98, whatsapp: 142 },
    { semana: 'Sem 2', ctaClicks: 268, formIniciados: 172, formEnviados: 112, whatsapp: 158 },
    { semana: 'Sem 3', ctaClicks: 284, formIniciados: 185, formEnviados: 124, whatsapp: 176 },
    { semana: 'Sem 4', ctaClicks: 312, formIniciados: 198, formEnviados: 138, whatsapp: 192 }
  ];

  return (
    <div>
      {/* KPIs de tráfico */}
      <section className="grid grid-cols-5 gap-6 mb-8">
        {trafficKPIs.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div
              key={index}
              className="rounded-2xl flex flex-col relative"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E5E5',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                width: '100%',
                height: '140px',
                padding: '20px'
              }}
            >
              {/* Badge positioned absolutely in top right */}
              <div
                className="flex items-center rounded-full absolute"
                style={{
                  top: '16px',
                  right: '16px',
                  backgroundColor: kpi.trending === 'up' ? '#DCFCE7' : '#FEE2E2',
                  gap: '3px',
                  padding: '3px 7px'
                }}
              >
                {kpi.trending === 'up' ? (
                  <ArrowUpRight className="flex-shrink-0" style={{ width: '9px', height: '9px', color: '#16A34A' }} />
                ) : (
                  <ArrowDownRight className="flex-shrink-0" style={{ width: '9px', height: '9px', color: '#DC2626' }} />
                )}
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '9px',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: kpi.trending === 'up' ? '#16A34A' : '#DC2626',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {kpi.change}
                </span>
              </div>

              {/* Label with more space */}
              <div style={{ marginBottom: '12px', paddingRight: '60px' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#6B6B6B',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    lineHeight: '1.4'
                  }}
                >
                  {kpi.label}
                </p>
              </div>

              {/* Value at bottom */}
              <div style={{ marginTop: 'auto' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '28px',
                    fontWeight: 'var(--font-weight-light)',
                    color: '#0A0A0A',
                    lineHeight: '1'
                  }}
                >
                  {kpi.value}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      {/* Comportamiento de usuarios */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        {/* Visitas por día */}
        <section
          className="col-span-8 rounded-2xl p-6"
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E5E5',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
          }}
        >
          <div className="mb-6">
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--font-size-h4)',
                fontWeight: 'var(--font-weight-medium)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-heading)',
                marginBottom: '4px'
              }}
            >
              Visitas por día
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-xs)',
                color: '#A3A3A3',
                lineHeight: 'var(--line-height-body)'
              }}
            >
              Últimos 30 días
            </p>
          </div>

          <div style={{ height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visitasPorDia}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                <XAxis 
                  dataKey="dia" 
                  stroke="#A3A3A3"
                  style={{ 
                    fontFamily: 'var(--font-body)', 
                    fontSize: 'var(--font-size-xs)' 
                  }}
                />
                <YAxis 
                  stroke="#A3A3A3"
                  style={{ 
                    fontFamily: 'var(--font-body)', 
                    fontSize: 'var(--font-size-xs)' 
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E5E5',
                    borderRadius: '12px',
                    padding: '8px 12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="visitas" 
                  stroke="#0A0A0A" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Distribución por dispositivo */}
        <section
          className="col-span-4 rounded-2xl p-6"
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E5E5',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
          }}
        >
          <div className="mb-6">
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--font-size-h4)',
                fontWeight: 'var(--font-weight-medium)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-heading)'
              }}
            >
              Por dispositivo
            </h2>
          </div>

          <div style={{ height: '200px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={porDispositivo.map(d => ({
                    name: d.dispositivo,
                    value: d.porcentaje
                  }))}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {porDispositivo.map((entry, index) => {
                    const colors = ['#0A0A0A', '#737373'];
                    return <Cell key={`cell-${index}`} fill={colors[index]} />;
                  })}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E5E5',
                    borderRadius: '12px',
                    padding: '8px 12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)'
                  }}
                  formatter={(value: any) => `${value}%`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-col gap-3 mt-4">
            {porDispositivo.map((item, index) => {
              const colors = ['#0A0A0A', '#737373'];
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '3px',
                        backgroundColor: colors[index],
                        flexShrink: 0
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#0A0A0A'
                      }}
                    >
                      {item.dispositivo}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-base)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: '#0A0A0A'
                      }}
                    >
                      {item.porcentaje}%
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-xs)',
                        color: '#A3A3A3'
                      }}
                    >
                      {item.valor.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Usuarios nuevos vs recurrentes */}
      <section
        className="rounded-2xl p-6 mb-6"
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E5E5E5',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
        }}
      >
        <div className="mb-6">
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--font-size-h4)',
              fontWeight: 'var(--font-weight-medium)',
              color: '#0A0A0A',
              lineHeight: 'var(--line-height-heading)',
              marginBottom: '4px'
            }}
          >
            Usuarios nuevos vs recurrentes
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-xs)',
              color: '#A3A3A3',
              lineHeight: 'var(--line-height-body)'
            }}
          >
            Comparación semanal del período seleccionado
          </p>
        </div>

        <div style={{ height: '280px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={usuariosComparacion}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
              <XAxis 
                dataKey="semana" 
                stroke="#A3A3A3"
                style={{ 
                  fontFamily: 'var(--font-body)', 
                  fontSize: 'var(--font-size-xs)' 
                }}
              />
              <YAxis 
                stroke="#A3A3A3"
                style={{ 
                  fontFamily: 'var(--font-body)', 
                  fontSize: 'var(--font-size-xs)' 
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E5E5',
                  borderRadius: '12px',
                  padding: '8px 12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)'
                }}
              />
              <Bar dataKey="nuevos" fill="#0A0A0A" radius={[4, 4, 0, 0]} />
              <Bar dataKey="recurrentes" fill="#737373" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '3px',
                backgroundColor: '#0A0A0A'
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                color: '#737373'
              }}
            >
              Usuarios nuevos
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '3px',
                backgroundColor: '#737373'
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                color: '#737373'
              }}
            >
              Usuarios recurrentes
            </span>
          </div>
        </div>
      </section>

      {/* Origen del tráfico detallado */}
      <section
        className="rounded-2xl overflow-hidden mb-6"
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E5E5E5',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
        }}
      >
        <div
          className="px-6 py-5"
          style={{
            borderBottom: '1px solid #E5E5E5'
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--font-size-h4)',
              fontWeight: 'var(--font-weight-medium)',
              color: '#0A0A0A',
              lineHeight: 'var(--line-height-heading)',
              marginBottom: '4px'
            }}
          >
            Origen del tráfico
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-xs)',
              color: '#A3A3A3',
              lineHeight: 'var(--line-height-body)'
            }}
          >
            Evolución y distribución por fuente
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead
              style={{
                backgroundColor: '#FAFAFA',
                borderBottom: '1px solid #E5E5E5'
              }}
            >
              <tr>
                <th
                  className="px-6 py-4 text-left"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: '#6B6B6B',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em'
                  }}
                >
                  Origen
                </th>
                <th
                  className="px-6 py-4 text-right"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: '#6B6B6B',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em'
                  }}
                >
                  Semana 1
                </th>
                <th
                  className="px-6 py-4 text-right"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: '#6B6B6B',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em'
                  }}
                >
                  Semana 2
                </th>
                <th
                  className="px-6 py-4 text-right"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: '#6B6B6B',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em'
                  }}
                >
                  Semana 3
                </th>
                <th
                  className="px-6 py-4 text-right"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: '#6B6B6B',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em'
                  }}
                >
                  Semana 4
                </th>
                <th
                  className="px-6 py-4 text-right"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: '#6B6B6B',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em'
                  }}
                >
                  Total
                </th>
                <th
                  className="px-6 py-4 text-right"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: '#6B6B6B',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em'
                  }}
                >
                  %
                </th>
                <th
                  className="px-6 py-4 text-right"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: '#6B6B6B',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em'
                  }}
                >
                  Tendencia
                </th>
              </tr>
            </thead>
            <tbody>
              {origenTraficoDetallado.map((origen, index) => (
                <tr
                  key={index}
                  className="transition-colors"
                  style={{
                    borderBottom: '1px solid #F5F5F5'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FAFAFA';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                  }}
                >
                  <td className="px-6 py-4">
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#0A0A0A'
                      }}
                    >
                      {origen.origen}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#737373'
                      }}
                    >
                      {origen.semana1.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#737373'
                      }}
                    >
                      {origen.semana2.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#737373'
                      }}
                    >
                      {origen.semana3.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#737373'
                      }}
                    >
                      {origen.semana4.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: '#0A0A0A'
                      }}
                    >
                      {origen.total.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: '#0A0A0A'
                      }}
                    >
                      {origen.porcentaje}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: origen.trending === 'up' ? '#DCFCE7' : '#FEE2E2'
                      }}
                    >
                      {origen.trending === 'up' ? (
                        <ArrowUpRight className="w-3 h-3" style={{ color: '#16A34A' }} />
                      ) : (
                        <ArrowDownRight className="w-3 h-3" style={{ color: '#DC2626' }} />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-6">
        {/* Proyectos más visitados */}
        <section
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E5E5',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
          }}
        >
          <div
            className="px-6 py-5"
            style={{
              borderBottom: '1px solid #E5E5E5'
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--font-size-h4)',
                fontWeight: 'var(--font-weight-medium)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-heading)'
              }}
            >
              Proyectos más visitados
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead
                style={{
                  backgroundColor: '#FAFAFA',
                  borderBottom: '1px solid #E5E5E5'
                }}
              >
                <tr>
                  <th
                    className="px-6 py-4 text-left"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-xs)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: '#6B6B6B',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      width: '60px'
                    }}
                  >
                    #
                  </th>
                  <th
                    className="px-6 py-4 text-left"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-xs)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: '#6B6B6B',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em'
                    }}
                  >
                    Proyecto
                  </th>
                  <th
                    className="px-6 py-4 text-right"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-xs)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: '#6B6B6B',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em'
                    }}
                  >
                    Visitas
                  </th>
                  <th
                    className="px-6 py-4 text-right"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-xs)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: '#6B6B6B',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em'
                    }}
                  >
                    Ratio
                  </th>
                </tr>
              </thead>
              <tbody>
                {proyectosMasVisitados.map((proyecto, index) => (
                  <tr
                    key={index}
                    className="transition-colors"
                    style={{
                      borderBottom: '1px solid #F5F5F5'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#FAFAFA';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#FFFFFF';
                    }}
                  >
                    <td className="px-6 py-4">
                      <div
                        className="flex items-center justify-center"
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          backgroundColor: index < 3 ? '#006B4E' : '#F5F5F5',
                          color: index < 3 ? '#FFFFFF' : '#737373',
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          fontWeight: 'var(--font-weight-semibold)'
                        }}
                      >
                        {index + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#0A0A0A'
                        }}
                      >
                        {proyecto.nombre}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          color: '#0A0A0A'
                        }}
                      >
                        {proyecto.visitas.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#0A0A0A'
                        }}
                      >
                        {proyecto.ratio}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Interacciones clave */}
        <section
          className="rounded-2xl p-6"
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E5E5',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
          }}
        >
          <div className="mb-6">
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--font-size-h4)',
                fontWeight: 'var(--font-weight-medium)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-heading)',
                marginBottom: '4px'
              }}
            >
              Interacciones clave
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-xs)',
                color: '#A3A3A3',
                lineHeight: 'var(--line-height-body)'
              }}
            >
              Evolución de acciones de interés
            </p>
          </div>

          <div style={{ height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={interaccionesSemanales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                <XAxis 
                  dataKey="semana" 
                  stroke="#A3A3A3"
                  style={{ 
                    fontFamily: 'var(--font-body)', 
                    fontSize: 'var(--font-size-xs)' 
                  }}
                />
                <YAxis 
                  stroke="#A3A3A3"
                  style={{ 
                    fontFamily: 'var(--font-body)', 
                    fontSize: 'var(--font-size-xs)' 
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E5E5',
                    borderRadius: '12px',
                    padding: '8px 12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)'
                  }}
                />
                <Line type="monotone" dataKey="ctaClicks" stroke="#0A0A0A" strokeWidth={2} dot={false} name="CTA Clicks" />
                <Line type="monotone" dataKey="formIniciados" stroke="#404040" strokeWidth={2} dot={false} name="Forms iniciados" />
                <Line type="monotone" dataKey="formEnviados" stroke="#737373" strokeWidth={2} dot={false} name="Forms enviados" />
                <Line type="monotone" dataKey="whatsapp" stroke="#A3A3A3" strokeWidth={2} dot={false} name="WhatsApp" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6">
            {[
              { label: 'CTA Clicks', color: '#0A0A0A' },
              { label: 'Forms iniciados', color: '#404040' },
              { label: 'Forms enviados', color: '#737373' },
              { label: 'WhatsApp', color: '#A3A3A3' }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '3px',
                    backgroundColor: item.color
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    color: '#737373'
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}