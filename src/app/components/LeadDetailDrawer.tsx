import React from 'react';
import { X, Mail, Phone, Calendar, User, Globe, MousePointer, FileText, Send, MessageCircle, CheckCircle, ArrowLeft } from 'lucide-react';

interface LeadEvent {
  id: number;
  tipo: 'visita' | 'formulario' | 'cta' | 'contacto' | 'reserva';
  accion: string;
  fecha: string;
  hora: string;
  detalles?: string;
}

interface Lead {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  origen: string;
  estado: string;
  broker: string;
  fecha: string;
}

interface LeadDetailDrawerProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
}

export function LeadDetailDrawer({ lead, isOpen, onClose }: LeadDetailDrawerProps) {
  if (!lead || !isOpen) return null;

  // Datos de ejemplo de eventos de contacto para cada lead
  const eventsData: Record<number, LeadEvent[]> = {
    1: [
      { id: 1, tipo: 'visita', accion: 'Visitó página de inicio', fecha: '2025-01-29', hora: '10:24', detalles: 'Sesión de 4 min' },
      { id: 2, tipo: 'cta', accion: 'Click en "Ver parcelas disponibles"', fecha: '2025-01-29', hora: '10:26' },
      { id: 3, tipo: 'visita', accion: 'Navegó catálogo de parcelas', fecha: '2025-01-29', hora: '10:27', detalles: 'Filtró por Región Metropolitana' },
      { id: 4, tipo: 'formulario', accion: 'Completó formulario de contacto', fecha: '2025-01-29', hora: '10:32', detalles: 'Interés en Parcela #4523' },
      { id: 5, tipo: 'contacto', accion: 'Recibió llamada de seguimiento', fecha: '2025-01-29', hora: '15:10', detalles: 'Llamada con Carlos Pérez' }
    ],
    2: [
      { id: 1, tipo: 'cta', accion: 'Click desde anuncio Meta', fecha: '2025-01-29', hora: '09:15' },
      { id: 2, tipo: 'visita', accion: 'Visitó landing de campaña', fecha: '2025-01-29', hora: '09:15', detalles: 'Sesión de 2 min' },
      { id: 3, tipo: 'formulario', accion: 'Llenó formulario express', fecha: '2025-01-29', hora: '09:17', detalles: 'Solicitó asesoría' },
      { id: 4, tipo: 'contacto', accion: 'Asignado a broker Ana Silva', fecha: '2025-01-29', hora: '11:30' }
    ],
    3: [
      { id: 1, tipo: 'visita', accion: 'Llegó desde Google Ads', fecha: '2025-01-28', hora: '14:20' },
      { id: 2, tipo: 'visita', accion: 'Exploró 5 propiedades', fecha: '2025-01-28', hora: '14:22', detalles: 'Tiempo promedio: 3 min por propiedad' },
      { id: 3, tipo: 'cta', accion: 'Click en "Solicitar información"', fecha: '2025-01-28', hora: '14:28' },
      { id: 4, tipo: 'formulario', accion: 'Envió consulta sobre financiamiento', fecha: '2025-01-28', hora: '14:30' },
      { id: 5, tipo: 'contacto', accion: 'Primera llamada realizada', fecha: '2025-01-28', hora: '16:45', detalles: 'Llamada con Carlos Pérez' },
      { id: 6, tipo: 'contacto', accion: 'Email de seguimiento enviado', fecha: '2025-01-28', hora: '17:00' }
    ],
    4: [
      { id: 1, tipo: 'contacto', accion: 'Mensaje recibido por WhatsApp', fecha: '2025-01-28', hora: '11:30', detalles: 'Pregunta sobre disponibilidad' },
      { id: 2, tipo: 'formulario', accion: 'Registrado como lead en sistema', fecha: '2025-01-28', hora: '11:32' }
    ],
    5: [
      { id: 1, tipo: 'visita', accion: 'Visitó página de inicio', fecha: '2025-01-27', hora: '08:15' },
      { id: 2, tipo: 'cta', accion: 'Click en banner promocional', fecha: '2025-01-27', hora: '08:17' },
      { id: 3, tipo: 'visita', accion: 'Navegó proyecto específico', fecha: '2025-01-27', hora: '08:18', detalles: 'Condominio Los Arrayanes' },
      { id: 4, tipo: 'formulario', accion: 'Solicitó cotización', fecha: '2025-01-27', hora: '08:25' },
      { id: 5, tipo: 'contacto', accion: 'Llamada de seguimiento', fecha: '2025-01-27', hora: '10:30', detalles: 'Llamada con Ana Silva' },
      { id: 6, tipo: 'reserva', accion: 'Reservó visita presencial', fecha: '2025-01-27', hora: '10:45', detalles: 'Agendada para 2025-02-03' },
      { id: 7, tipo: 'contacto', accion: 'Envío de documentación', fecha: '2025-01-27', hora: '14:20' },
      { id: 8, tipo: 'reserva', accion: 'Separación de parcela', fecha: '2025-01-27', hora: '16:00', detalles: 'Parcela #4523 - 5.000 m²' }
    ]
  };

  const events = eventsData[lead.id] || [];

  // Calcular resumen de intención
  const totalEventos = events.length;
  const eventosPorTipo = events.reduce((acc, event) => {
    acc[event.tipo] = (acc[event.tipo] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const tipoPredominante = Object.entries(eventosPorTipo).sort((a, b) => b[1] - a[1])[0];

  const getEventIcon = (tipo: string) => {
    switch (tipo) {
      case 'visita': return <MousePointer className="w-4 h-4" />;
      case 'formulario': return <FileText className="w-4 h-4" />;
      case 'cta': return <Send className="w-4 h-4" />;
      case 'contacto': return <MessageCircle className="w-4 h-4" />;
      case 'reserva': return <CheckCircle className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  const getEventColor = (tipo: string) => {
    switch (tipo) {
      case 'visita': return { bg: '#F3F4F6', border: '#E5E5E5', icon: '#737373' };
      case 'formulario': return { bg: '#D1FAE5', border: '#86EFAC', icon: '#01533E' };
      case 'cta': return { bg: '#E0E7FF', border: '#A5B4FC', icon: '#4338CA' };
      case 'contacto': return { bg: 'rgba(100, 126, 63, 0.15)', border: 'rgba(100, 126, 63, 0.3)', icon: '#647E3F' };
      case 'reserva': return { bg: 'rgba(100, 126, 63, 0.1)', border: 'rgba(100, 126, 63, 0.3)', icon: '#647E3F' };
      default: return { bg: '#F3F4F6', border: '#E5E5E5', icon: '#737373' };
    }
  };

  const getEventLabel = (tipo: string) => {
    switch (tipo) {
      case 'visita': return 'Navegación';
      case 'formulario': return 'Formulario';
      case 'cta': return 'Interacción';
      case 'contacto': return 'Contacto';
      case 'reserva': return 'Reserva';
      default: return tipo;
    }
  };

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'nuevo': return { bg: '#D1FAE5', text: '#01533E', label: 'Nuevo' };
      case 'asignado': return { bg: '#E0E7FF', text: '#4338CA', label: 'Asignado' };
      case 'contactado': return { bg: 'rgba(100, 126, 63, 0.15)', text: '#647E3F', label: 'Contactado' };
      case 'cerrado': return { bg: 'rgba(100, 126, 63, 0.1)', text: '#647E3F', label: 'Cerrado' };
      case 'no-interesado': return { bg: '#FEE2E2', text: '#DC2626', label: 'No interesado' };
      default: return { bg: '#F3F4F6', text: '#6B7280', label: estado };
    }
  };

  const statusStyle = getStatusColor(lead.estado);

  return (
    <div className="space-y-6">
      {/* Header con navegación de regreso */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full transition-all"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-sm)',
              fontWeight: 'var(--font-weight-medium)',
              color: '#0A0A0A',
              backgroundColor: '#FFFFFF',
              border: '1px solid #DEDEDE'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FAFAFA';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a leads
          </button>
          <div>
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--font-size-h2)',
                fontWeight: 'var(--font-weight-medium)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-heading)',
                letterSpacing: 'var(--letter-spacing-normal)',
                marginBottom: '4px'
              }}
            >
              {lead.nombre}
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                fontWeight: 'var(--font-weight-regular)',
                color: '#737373',
                lineHeight: 'var(--line-height-body)'
              }}
            >
              Detalle completo y trazabilidad de eventos
            </p>
          </div>
        </div>
      </div>

      {/* Grid de 2 columnas: Info básica + Resumen */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Información básica del lead - 2 columnas */}
        <section
          className="lg:col-span-2 rounded-2xl p-6"
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E5E5',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--font-size-h4)',
              fontWeight: 'var(--font-weight-medium)',
              color: '#0A0A0A',
              lineHeight: 'var(--line-height-heading)',
              letterSpacing: 'var(--letter-spacing-normal)',
              marginBottom: '20px'
            }}
          >
            Información del lead
          </h3>

          {/* Grid de contacto en 2 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Email */}
            <div className="flex items-center gap-3">
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#FAFAFA',
                  border: '1px solid #E5E5E5',
                  flexShrink: 0
                }}
              >
                <Mail className="w-5 h-5" style={{ color: '#0A0A0A' }} />
              </div>
              <div className="flex-1">
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#6B6B6B',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    lineHeight: '1.2',
                    marginBottom: '4px'
                  }}
                >
                  Email
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-base)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  {lead.email}
                </p>
              </div>
            </div>

            {/* Teléfono */}
            <div className="flex items-center gap-3">
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#FAFAFA',
                  border: '1px solid #E5E5E5',
                  flexShrink: 0
                }}
              >
                <Phone className="w-5 h-5" style={{ color: '#0A0A0A' }} />
              </div>
              <div className="flex-1">
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#6B6B6B',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    lineHeight: '1.2',
                    marginBottom: '4px'
                  }}
                >
                  Teléfono
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-base)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  {lead.telefono}
                </p>
              </div>
            </div>
          </div>

          {/* Grid de información administrativa en 4 columnas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6" style={{ borderTop: '1px solid #E5E5E5' }}>
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#6B6B6B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  lineHeight: '1.2',
                  marginBottom: '8px'
                }}
              >
                Origen
              </p>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{ backgroundColor: '#FAFAFA', border: '1px solid #E5E5E5' }}
              >
                <Globe className="w-3.5 h-3.5" style={{ color: '#0A0A0A' }} />
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A'
                  }}
                >
                  {lead.origen}
                </span>
              </div>
            </div>

            <div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#6B6B6B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  lineHeight: '1.2',
                  marginBottom: '8px'
                }}
              >
                Estado
              </p>
              <span
                className="inline-flex items-center px-3 py-1.5 rounded-full"
                style={{
                  backgroundColor: statusStyle.bg,
                  color: statusStyle.text,
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'var(--font-weight-semibold)'
                }}
              >
                {statusStyle.label}
              </span>
            </div>

            <div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#6B6B6B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  lineHeight: '1.2',
                  marginBottom: '8px'
                }}
              >
                Broker asignado
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                {lead.broker}
              </p>
            </div>

            <div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#6B6B6B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  lineHeight: '1.2',
                  marginBottom: '8px'
                }}
              >
                Fecha de registro
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                {lead.fecha}
              </p>
            </div>
          </div>
        </section>

        {/* Resumen de intención - 1 columna */}
        <section
          className="rounded-2xl p-6"
          style={{
            backgroundColor: '#FAFAFA',
            border: '1px solid #E5E5E5',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--font-size-h4)',
              fontWeight: 'var(--font-weight-medium)',
              color: '#0A0A0A',
              lineHeight: 'var(--line-height-heading)',
              letterSpacing: 'var(--letter-spacing-normal)',
              marginBottom: '20px'
            }}
          >
            Resumen de intención
          </h3>

          <div className="space-y-6">
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#6B6B6B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  lineHeight: '1.2'
                }}
              >
                Total de eventos
              </span>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '48px',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  lineHeight: '1.2',
                  marginTop: '8px'
                }}
              >
                {totalEventos}
              </div>
            </div>

            <div style={{ borderTop: '1px solid #E5E5E5', paddingTop: '24px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#6B6B6B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  lineHeight: '1.2'
                }}
              >
                Tipo predominante
              </span>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h3)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-heading)',
                  marginTop: '8px'
                }}
              >
                {tipoPredominante ? getEventLabel(tipoPredominante[0]) : '-'}
              </div>
            </div>

            <div style={{ borderTop: '1px solid #E5E5E5', paddingTop: '24px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#6B6B6B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  lineHeight: '1.2'
                }}
              >
                Frecuencia
              </span>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h3)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-heading)',
                  marginTop: '8px'
                }}
              >
                {tipoPredominante ? `${tipoPredominante[1]} veces` : '-'}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Línea de tiempo de eventos - ancho completo */}
      <section
        className="rounded-2xl p-6"
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E5E5E5',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--font-size-h4)',
            fontWeight: 'var(--font-weight-medium)',
            color: '#0A0A0A',
            lineHeight: 'var(--line-height-heading)',
            letterSpacing: 'var(--letter-spacing-normal)',
            marginBottom: '8px'
          }}
        >
          Eventos de contacto
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-sm)',
            fontWeight: 'var(--font-weight-regular)',
            color: '#737373',
            lineHeight: 'var(--line-height-body)',
            letterSpacing: 'var(--letter-spacing-normal)',
            marginBottom: '32px'
          }}
        >
          Historial completo de interacciones y actividades del lead
        </p>

        {/* Timeline en grid de 2 columnas para pantallas grandes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {events.map((event, index) => {
            const colors = getEventColor(event.tipo);

            return (
              <div key={event.id} className="flex gap-4">
                {/* Icono del evento */}
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: colors.bg,
                    border: `2px solid ${colors.border}`,
                    flexShrink: 0,
                    color: colors.icon
                  }}
                >
                  {getEventIcon(event.tipo)}
                </div>

                {/* Contenido del evento */}
                <div className="flex-1">
                  <div className="mb-2">
                    <span
                      className="inline-block px-2 py-0.5 rounded-full mb-2"
                      style={{
                        backgroundColor: colors.bg,
                        fontFamily: 'var(--font-body)',
                        fontSize: '10px',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: colors.icon,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em'
                      }}
                    >
                      {getEventLabel(event.tipo)}
                    </span>
                    <p
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'var(--font-size-body-base)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#0A0A0A',
                        lineHeight: 'var(--line-height-heading)',
                        marginBottom: '4px'
                      }}
                    >
                      {event.accion}
                    </p>
                    {event.detalles && (
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-regular)',
                          color: '#737373',
                          lineHeight: 'var(--line-height-body)'
                        }}
                      >
                        {event.detalles}
                      </p>
                    )}
                  </div>

                  {/* Fecha y hora */}
                  <div className="flex items-center gap-2 pt-3" style={{ borderTop: '1px solid #F3F4F6' }}>
                    <Calendar className="w-3.5 h-3.5" style={{ color: '#737373' }} />
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-xs)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#737373'
                      }}
                    >
                      {event.fecha} • {event.hora}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mensaje si no hay eventos */}
        {events.length === 0 && (
          <div
            className="text-center py-12 rounded-xl"
            style={{
              backgroundColor: '#FAFAFA',
              border: '1px solid #E5E5E5'
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                fontWeight: 'var(--font-weight-regular)',
                color: '#737373',
                lineHeight: 'var(--line-height-body)'
              }}
            >
              No hay eventos registrados para este lead
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
