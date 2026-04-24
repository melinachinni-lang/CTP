import React from 'react';
import { Search, BookOpen, MessageSquare, CheckCircle, CreditCard, Mail, Phone, Clock, ChevronDown, MessageCircle, Send } from 'lucide-react';

export function HelpContent() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(null);

  const quickAccessCards = [
    {
      id: 1,
      title: 'Cómo publicar una parcela',
      description: 'Aprende a crear y gestionar publicaciones de parcelas en pocos pasos',
      icon: BookOpen,
      color: 'blue'
    },
    {
      id: 2,
      title: 'Cómo responder consultas',
      description: 'Gestiona y responde las consultas de potenciales compradores',
      icon: MessageSquare,
      color: 'purple'
    },
    {
      id: 3,
      title: 'Cómo vender o reservar una parcela',
      description: 'Marca tus parcelas como vendidas o reservadas correctamente',
      icon: CheckCircle,
      color: 'green'
    },
    {
      id: 4,
      title: 'Cómo funciona el pago',
      description: 'Conoce los planes, métodos de pago y facturación',
      icon: CreditCard,
      color: 'orange'
    }
  ];

  const faqs = [
    {
      question: '¿Cuántas parcelas puedo publicar?',
      answer: 'La cantidad de parcelas que puedes publicar depende de tu plan. El plan Bronce permite hasta 10 publicaciones, Plata hasta 30, y Oro publicaciones ilimitadas.'
    },
    {
      question: '¿Cómo destaco una publicación?',
      answer: 'Para destacar una publicación, ve a "Mis publicaciones", selecciona la parcela que deseas destacar y haz clic en el botón "Destacar". Las publicaciones destacadas aparecen en las primeras posiciones de búsqueda y tienen una etiqueta especial.'
    },
    {
      question: '¿Puedo editar una publicación después de crearla?',
      answer: 'Sí, puedes editar tus publicaciones en cualquier momento. Ve a "Mis publicaciones", selecciona la parcela y haz clic en "Editar". Podrás actualizar fotos, descripción, precio y otros detalles.'
    },
    {
      question: '¿Cómo sé si alguien está interesado en mi parcela?',
      answer: 'Recibirás notificaciones por email cada vez que alguien envíe una consulta sobre tu parcela. También puedes revisar todas tus consultas en la sección "Consultas" de tu dashboard.'
    },
    {
      question: '¿Qué hago cuando vendo una parcela?',
      answer: 'Cuando vendas una parcela, ve a "Mis publicaciones", selecciona la parcela vendida y marca su estado como "Vendida". Esto la ocultará de los resultados de búsqueda y actualizará tus estadísticas.'
    },
    {
      question: '¿Cómo cancelo mi plan?',
      answer: 'Puedes cancelar tu plan en cualquier momento desde la sección "Plan y facturación". Tu plan seguirá activo hasta el final del período de facturación actual.'
    },
    {
      question: '¿Puedo agregar brokers a mi equipo?',
      answer: 'Sí, los planes Plata y Oro incluyen la funcionalidad de equipo. Ve a "Equipo / Brokers" para invitar a nuevos miembros, asignar parcelas y gestionar permisos.'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-emerald-100 text-emerald-700',
      purple: 'bg-purple-100 text-purple-600',
      green: 'bg-green-100 text-green-600',
      orange: 'bg-orange-100 text-orange-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <main className="px-6 py-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 
          style={{ 
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--font-size-h2)',
            fontWeight: 'var(--font-weight-medium)',
            color: '#0A0A0A',
            lineHeight: 'var(--line-height-heading)',
            letterSpacing: 'var(--letter-spacing-normal)'
          }}
        >
          Ayuda y soporte
        </h1>
        <p 
          style={{ 
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-base)',
            fontWeight: 'var(--font-weight-regular)',
            color: '#6B6B6B',
            lineHeight: 'var(--line-height-body)',
            letterSpacing: 'var(--letter-spacing-normal)'
          }}
        >
          Encuentra respuestas, guías y contacta con nuestro equipo
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Busca ayuda sobre publicaciones, consultas, pagos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-[200px] focus:outline-none focus:border-gray-300 transition-colors"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-base)',
              fontWeight: 'var(--font-weight-regular)',
              color: '#0A0A0A',
              lineHeight: 'var(--line-height-body)'
            }}
          />
        </div>
      </div>

      {/* Quick Access Cards */}
      <section className="space-y-4">
        <h2 
          style={{ 
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--font-size-h3)',
            fontWeight: 'var(--font-weight-medium)',
            color: '#0A0A0A',
            lineHeight: 'var(--line-height-heading)'
          }}
        >
          Guías de inicio rápido
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickAccessCards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.id}
                className="bg-white border-2 border-gray-200 rounded-[24px] p-6 text-left hover:border-gray-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all space-y-4"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(18, 72, 84, 0.1)' }}>
                  <Icon className="w-6 h-6" style={{ color: '#124854' }} />
                </div>
                <div className="space-y-2">
                  <h3 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-base)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    {card.title}
                  </h3>
                  <p 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 'var(--font-weight-regular)',
                      color: '#6B6B6B',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    {card.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-4">
        <h2 
          style={{ 
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--font-size-h3)',
            fontWeight: 'var(--font-weight-medium)',
            color: '#0A0A0A',
            lineHeight: 'var(--line-height-heading)'
          }}
        >
          Preguntas frecuentes
        </h2>
        <div className="bg-white border-2 border-gray-200 rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b-2 border-gray-200 last:border-b-0">
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span 
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-base)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ml-4 ${
                    openFaqIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaqIndex === index && (
                <div 
                  className="px-8 pb-6"
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-base)',
                    fontWeight: 'var(--font-weight-regular)',
                    color: '#6B6B6B',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="space-y-4">
        <h2 
          style={{ 
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--font-size-h3)',
            fontWeight: 'var(--font-weight-medium)',
            color: '#0A0A0A',
            lineHeight: 'var(--line-height-heading)'
          }}
        >
          Contacta con soporte
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Chat/WhatsApp */}
          <div className="bg-white border-2 border-gray-200 rounded-[24px] p-6 space-y-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <MessageCircle className="w-6 h-6" style={{ color: '#0A0A0A' }} />
            </div>
            <div className="space-y-2">
              <h3 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                Chat en vivo
              </h3>
              <p 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#6B6B6B',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                Respuesta inmediata vía WhatsApp
              </p>
              <button
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-medium)',
                  lineHeight: 'var(--line-height-body)',
                  backgroundColor: '#124854'
                }}
                className="mt-3 w-full text-white py-3 px-6 rounded-[200px] transition-colors"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0D3640'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#124854'}
              >
                Iniciar chat
              </button>
            </div>
          </div>

          {/* Email */}
          <div className="bg-white border-2 border-gray-200 rounded-[24px] p-6 space-y-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <Mail className="w-6 h-6" style={{ color: '#0A0A0A' }} />
            </div>
            <div className="space-y-2">
              <h3 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                Correo electrónico
              </h3>
              <p 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#6B6B6B',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                Respuesta en 24 horas hábiles
              </p>
              <a
                href="mailto:soporte@compratuparcela.cl"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-medium)',
                  lineHeight: 'var(--line-height-body)',
                  backgroundColor: '#124854'
                }}
                className="mt-3 inline-block w-full text-white py-3 px-6 rounded-[200px] transition-colors text-center"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0D3640'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#124854'}
              >
                soporte@compratuparcela.cl
              </a>
            </div>
          </div>

          {/* Horarios */}
          <div className="bg-white border-2 border-gray-200 rounded-[24px] p-6 space-y-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <Clock className="w-6 h-6" style={{ color: '#0A0A0A' }} />
            </div>
            <div className="space-y-3">
              <h3 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                Horarios de atención
              </h3>
              <div className="space-y-2">
                <div 
                  className="flex items-center justify-between"
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: 'var(--font-weight-regular)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  <span>Lun - Vie</span>
                  <span className="font-medium">9:00 - 18:00</span>
                </div>
                <div 
                  className="flex items-center justify-between"
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: 'var(--font-weight-regular)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  <span>Sábado</span>
                  <span className="font-medium">10:00 - 14:00</span>
                </div>
                <div 
                  className="flex items-center justify-between"
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: 'var(--font-weight-regular)',
                    color: '#6B6B6B',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  <span>Domingo</span>
                  <span>Cerrado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Banner */}
      <div className="bg-gray-50 border-2 border-gray-200 rounded-[24px] p-8 text-center space-y-3">
        <h3 
          style={{ 
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-base)',
            fontWeight: 'var(--font-weight-medium)',
            color: '#0A0A0A',
            lineHeight: 'var(--line-height-body)'
          }}
        >
          ¿No encontraste lo que buscabas?
        </h3>
        <p 
          style={{ 
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-base)',
            fontWeight: 'var(--font-weight-regular)',
            color: '#6B6B6B',
            lineHeight: 'var(--line-height-body)'
          }}
        >
          Nuestro equipo está disponible para ayudarte con cualquier duda o consulta específica que tengas.
        </p>
        <button
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-base)',
            fontWeight: 'var(--font-weight-medium)',
            lineHeight: 'var(--line-height-body)',
            backgroundColor: '#124854'
          }}
          className="text-white py-3 px-8 rounded-[200px] transition-colors inline-flex items-center gap-2"
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0D3640'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#124854'}
        >
          <Send className="w-5 h-5" />
          Enviar consulta
        </button>
      </div>
    </main>
  );
}