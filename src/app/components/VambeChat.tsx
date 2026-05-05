import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { MessageCircle, X, Send, CheckCircle2 } from 'lucide-react';

type ChatContext = 'home' | 'parcela-detalle' | 'listado-parcelas' | 'publicar-parcela' | 'crear-proyecto';

interface VambeChatProps {
  /** Controla si el chat está inicialmente abierto o cerrado */
  initialOpen?: boolean;
  /** Contexto de la pantalla donde se muestra el chat */
  context?: ChatContext;
  /** Desactiva la animación de atención del botón flotante (útil en flujos de publicación) */
  subtle?: boolean;
}

export function VambeChat({ initialOpen = false, context = 'home', subtle = false }: VambeChatProps) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [problemDescription, setProblemDescription] = useState('');
  const [ticketCreated, setTicketCreated] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Asegurar que el componente está montado en el cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Auto-scroll al final del chat cuando hay nuevos mensajes
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedOption, isTyping, selectedCategory, ticketCreated]);

  // Resetear estado cuando cambia el contexto
  useEffect(() => {
    setSelectedOption(null);
    setIsTyping(false);
    setSelectedCategory(null);
    setProblemDescription('');
    setTicketCreated(false);
  }, [context]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    // Reset state cuando se cierra
    if (isOpen) {
      setTimeout(() => {
        setSelectedOption(null);
        setIsTyping(false);
        setSelectedCategory(null);
        setProblemDescription('');
        setTicketCreated(false);
      }, 300);
    }
  };

  const quickActions = [
    'Buscar parcelas',
    'Contactar inmobiliaria',
    'Reportar un problema',
    'Consultas sobre pagos / planes'
  ];

  const problemCategories = [
    'Publicaciones',
    'Pagos / Planes',
    'Cuenta / Acceso',
    'Equipo / Brokers',
    'Otro'
  ];

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
    }, 1200);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSubmitTicket = () => {
    if (problemDescription.trim() && selectedCategory) {
      // Generar número de ticket aleatorio
      const randomTicket = Math.floor(1000 + Math.random() * 9000);
      setTicketNumber(`#${randomTicket}`);
      setTicketCreated(true);
    }
  };

  const chatContent = (
    <>
      {/* Botón flotante */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 flex items-center justify-center shadow-lg"
          style={{
            width: '64px',
            height: '64px',
            backgroundColor: isHovered ? '#6B6B6B' : '#111',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            zIndex: 99999,
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'background-color 0.2s ease, transform 0.2s ease',
            animation: subtle ? 'none' : 'vambeAttention 3s ease-in-out 3'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label="Abrir chat de ayuda"
        >
          <MessageCircle 
            className="w-7 h-7" 
            style={{ color: '#FFFFFF' }} 
          />
        </button>
      )}

      {/* Contenedor del chat - Panel lateral */}
      {isOpen && (
        <>
          {/* Overlay para cerrar al hacer click fuera */}
          <div
            className="fixed inset-0 transition-opacity duration-300"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', zIndex: 99998 }}
            onClick={toggleChat}
          />

          {/* Panel de chat */}
          <div
            className="fixed bottom-0 right-0 flex flex-col transition-all duration-300"
            style={{
              width: '400px',
              height: '600px',
              maxHeight: '80vh',
              bottom: '24px',
              right: '24px',
              borderRadius: '24px',
              border: '2px solid #E5E5E5',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
              animation: 'slideInRight 0.3s ease-out',
              zIndex: 99999
            }}
          >
            {/* Header del chat */}
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{
                borderBottom: '2px solid #E5E5E5',
                backgroundColor: '#FFFFFF',
                borderTopLeftRadius: '24px',
                borderTopRightRadius: '24px'
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#F5F5F0',
                    borderRadius: '50%'
                  }}
                >
                  <MessageCircle className="w-6 h-6" style={{ color: '#006B4E' }} />
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-h4)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-heading)',
                      margin: 0
                    }}
                  >
                    Asistente de soporte
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-xs)',
                      color: '#6B6B6B',
                      lineHeight: 'var(--line-height-body)',
                      margin: 0
                    }}
                  >
                    Estamos para ayudarte
                  </p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="flex items-center justify-center transition-colors rounded-full"
                style={{
                  width: '36px',
                  height: '36px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F5F5F5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                aria-label="Cerrar chat"
              >
                <X className="w-5 h-5" style={{ color: '#0A0A0A' }} />
              </button>
            </div>

            {/* Cuerpo del chat - Mensajes */}
            <div
              className="flex-1 overflow-y-auto px-6 py-6"
              style={{
                backgroundColor: '#FAFAFA'
              }}
            >
              {/* Mensaje de bienvenida */}
              <div className="flex items-start gap-3">
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: '36px',
                    height: '36px',
                    backgroundColor: '#F5F5F0',
                    borderRadius: '50%'
                  }}
                >
                  <MessageCircle className="w-5 h-5" style={{ color: '#006B4E' }} />
                </div>
                <div
                  className="px-5 py-4 rounded-[24px]"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '2px solid #E5E5E5',
                    maxWidth: '85%',
                    borderBottomLeftRadius: '4px'
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-body)',
                      margin: 0,
                      marginBottom: '8px'
                    }}
                  >
                    Hola 👋 Estoy para ayudarte con cualquier consulta o problema dentro de CompraTuParcela.
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-body)',
                      margin: 0
                    }}
                  >
                    Podés buscar parcelas, hacer una consulta o reportar un inconveniente.
                  </p>
                </div>
              </div>

              {/* Opciones rápidas iniciales */}
              {!selectedOption && (
                <div className="mt-6 space-y-3">
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-xs)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#6B6B6B',
                      lineHeight: 'var(--line-height-body)',
                      marginBottom: '8px'
                    }}
                  >
                    ¿Qué necesitás?
                  </p>
                  {quickActions.map((action, index) => {
                    return (
                      <button
                        key={index}
                        className="w-full text-left px-5 py-3 transition-all rounded-[200px]"
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: '2px solid #E5E5E5',
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#0A0A0A',
                          lineHeight: 'var(--line-height-body)',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#F5F5F5';
                          e.currentTarget.style.borderColor = '#111';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#FFFFFF';
                          e.currentTarget.style.borderColor = '#E5E5E5';
                        }}
                        onClick={() => handleOptionSelect(action)}
                      >
                        {action}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Mensaje del usuario (cuando selecciona una opción) */}
              {selectedOption && (
                <div className="flex items-start gap-3 mt-4 justify-end">
                  <div
                    className="px-5 py-3 rounded-[24px]"
                    style={{
                      backgroundColor: '#E8E7E6',
                      border: '2px solid #DEDEDE',
                      maxWidth: '85%',
                      borderBottomRightRadius: '4px'
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        lineHeight: 'var(--line-height-body)',
                        margin: 0
                      }}
                    >
                      {selectedOption}
                    </p>
                  </div>
                </div>
              )}

              {/* Indicador de "escribiendo..." */}
              {isTyping && selectedOption && (
                <div className="flex items-start gap-3 mt-4">
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: '36px',
                      height: '36px',
                      backgroundColor: '#F5F5F0',
                      borderRadius: '50%'
                    }}
                  >
                    <MessageCircle className="w-5 h-5" style={{ color: '#006B4E' }} />
                  </div>
                  <div
                    className="px-5 py-3 rounded-[24px] flex items-center gap-1"
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '2px solid #E5E5E5',
                      borderBottomLeftRadius: '4px',
                      minHeight: '52px'
                    }}
                  >
                    <div
                      className="rounded-full"
                      style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: '#6B6B6B',
                        animation: 'typingDot 1.4s infinite ease-in-out',
                        animationDelay: '0s'
                      }}
                    />
                    <div
                      className="rounded-full"
                      style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: '#6B6B6B',
                        animation: 'typingDot 1.4s infinite ease-in-out',
                        animationDelay: '0.2s'
                      }}
                    />
                    <div
                      className="rounded-full"
                      style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: '#6B6B6B',
                        animation: 'typingDot 1.4s infinite ease-in-out',
                        animationDelay: '0.4s'
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Flujo de "Reportar un problema" */}
              {selectedOption === 'Reportar un problema' && !isTyping && !ticketCreated && (
                <>
                  {/* Mensaje del asistente */}
                  <div className="flex items-start gap-3 mt-4">
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: '36px',
                        height: '36px',
                        backgroundColor: '#F5F5F0',
                        borderRadius: '50%'
                      }}
                    >
                      <MessageCircle className="w-5 h-5" style={{ color: '#006B4E' }} />
                    </div>
                    <div
                      className="px-5 py-4 rounded-[24px]"
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '2px solid #E5E5E5',
                        maxWidth: '85%',
                        borderBottomLeftRadius: '4px'
                      }}
                    >
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          color: '#0A0A0A',
                          lineHeight: 'var(--line-height-body)',
                          margin: 0
                        }}
                      >
                        Entiendo. Para ayudarte mejor, selecciona la categoría del problema:
                      </p>
                    </div>
                  </div>

                  {/* Selector de categorías */}
                  {!selectedCategory && (
                    <div className="mt-4 space-y-2">
                      {problemCategories.map((category, index) => {
                        return (
                          <button
                            key={index}
                            className="w-full text-left px-4 py-2.5 transition-all rounded-[200px]"
                            style={{
                              backgroundColor: '#FFFFFF',
                              border: '2px solid #E5E5E5',
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--font-size-body-sm)',
                              fontWeight: 'var(--font-weight-medium)',
                              color: '#0A0A0A',
                              lineHeight: 'var(--line-height-body)',
                              cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#F5F5F5';
                              e.currentTarget.style.borderColor = '#111';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#FFFFFF';
                              e.currentTarget.style.borderColor = '#E5E5E5';
                            }}
                            onClick={() => handleCategorySelect(category)}
                          >
                            {category}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Campo de descripción del problema */}
                  {selectedCategory && (
                    <>
                      <div className="flex items-start gap-3 mt-4 justify-end">
                        <div
                          className="px-5 py-3 rounded-[24px]"
                          style={{
                            backgroundColor: '#E8E7E6',
                            border: '2px solid #DEDEDE',
                            maxWidth: '85%',
                            borderBottomRightRadius: '4px'
                          }}
                        >
                          <p
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--font-size-body-sm)',
                              color: '#0A0A0A',
                              lineHeight: 'var(--line-height-body)',
                              margin: 0
                            }}
                          >
                            {selectedCategory}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 mt-4">
                        <div
                          className="flex items-center justify-center flex-shrink-0"
                          style={{
                            width: '36px',
                            height: '36px',
                            backgroundColor: '#F5F5F0',
                            borderRadius: '50%'
                          }}
                        >
                          <MessageCircle className="w-5 h-5" style={{ color: '#006B4E' }} />
                        </div>
                        <div
                          className="px-5 py-4 rounded-[24px]"
                          style={{
                            backgroundColor: '#FFFFFF',
                            border: '2px solid #E5E5E5',
                            maxWidth: '85%',
                            borderBottomLeftRadius: '4px'
                          }}
                        >
                          <p
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--font-size-body-sm)',
                              color: '#0A0A0A',
                              lineHeight: 'var(--line-height-body)',
                              margin: 0
                            }}
                          >
                            Perfecto. Ahora describe brevemente el problema:
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 space-y-3">
                        <textarea
                          value={problemDescription}
                          onChange={(e) => setProblemDescription(e.target.value)}
                          placeholder="Describe brevemente el problema que estás teniendo"
                          rows={4}
                          className="w-full px-4 py-3 rounded-[24px] resize-none focus:outline-none transition-all"
                          style={{
                            backgroundColor: '#FFFFFF',
                            border: '2px solid #E5E5E5',
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            color: '#0A0A0A',
                            lineHeight: 'var(--line-height-body)'
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = '#111';
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = '#E5E5E5';
                          }}
                        />

                        <button
                          className="w-full transition-all rounded-[200px]"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: problemDescription.trim() ? '#111' : '#E5E5E5',
                            border: 'none',
                            paddingLeft: '24px',
                            paddingRight: '24px',
                            paddingTop: '14px',
                            paddingBottom: '14px',
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            fontWeight: 'var(--font-weight-medium)',
                            color: problemDescription.trim() ? '#FFFFFF' : '#6B6B6B',
                            lineHeight: 'var(--line-height-body)',
                            cursor: problemDescription.trim() ? 'pointer' : 'not-allowed',
                            whiteSpace: 'nowrap'
                          }}
                          onMouseEnter={(e) => {
                            if (problemDescription.trim()) {
                              e.currentTarget.style.backgroundColor = '#6B6B6B';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (problemDescription.trim()) {
                              e.currentTarget.style.backgroundColor = '#111';
                            }
                          }}
                          onClick={handleSubmitTicket}
                          disabled={!problemDescription.trim()}
                        >
                          Enviar consulta
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}

              {/* Confirmación del ticket */}
              {ticketCreated && (
                <div className="flex items-start gap-3 mt-4">
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: '36px',
                      height: '36px',
                      backgroundColor: '#F5F5F0',
                      borderRadius: '50%'
                    }}
                  >
                    <MessageCircle className="w-5 h-5" style={{ color: '#006B4E' }} />
                  </div>
                  <div
                    className="px-5 py-4 rounded-[24px]"
                    style={{
                      backgroundColor: 'rgba(100, 126, 63, 0.1)',
                      border: '2px solid rgba(100, 126, 63, 0.3)',
                      maxWidth: '85%',
                      borderBottomLeftRadius: '4px'
                    }}
                  >
                    <div className="flex items-start gap-2 mb-3">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#16A34A' }} />
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#0A0A0A',
                          lineHeight: 'var(--line-height-body)',
                          margin: 0
                        }}
                      >
                        Tu ticket de soporte fue creado correctamente
                      </p>
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        lineHeight: 'var(--line-height-body)',
                        margin: 0,
                        marginBottom: '12px'
                      }}
                    >
                      <span style={{ fontWeight: 'var(--font-weight-medium)' }}>Número de ticket:</span> {ticketNumber}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        lineHeight: 'var(--line-height-body)',
                        margin: 0
                      }}
                    >
                      Un especialista se pondrá en contacto a la brevedad para ayudarte.
                    </p>
                  </div>
                </div>
              )}

              {/* Otras opciones - Respuesta genérica */}
              {selectedOption && selectedOption !== 'Reportar un problema' && !isTyping && (
                <div className="flex items-start gap-3 mt-4">
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: '36px',
                      height: '36px',
                      backgroundColor: '#F5F5F0',
                      borderRadius: '50%'
                    }}
                  >
                    <MessageCircle className="w-5 h-5" style={{ color: '#006B4E' }} />
                  </div>
                  <div
                    className="px-5 py-4 rounded-[24px]"
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '2px solid #E5E5E5',
                      maxWidth: '85%',
                      borderBottomLeftRadius: '4px'
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        color: '#0A0A0A',
                        lineHeight: 'var(--line-height-body)',
                        margin: 0
                      }}
                    >
                      {selectedOption === 'Buscar parcelas' && 'Puedes explorar todas las parcelas disponibles usando los filtros de búsqueda para encontrar la ideal para ti.'}
                      {selectedOption === 'Contactar inmobiliaria' && 'Puedes contactar directamente a las inmobiliarias desde la página de cada parcela o proyecto.'}
                      {selectedOption === 'Consultas sobre pagos / planes' && 'Para consultas sobre planes y pagos, puedes revisar la sección de "Plan y facturación" en tu perfil o contactarnos por email.'}
                    </p>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes vambeAttention {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes typingDot {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.7;
          }
          30% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );

  // Solo renderizar en el cliente
  if (!isMounted) {
    return null;
  }

  // Usar portal para renderizar fuera del flujo del DOM
  return createPortal(chatContent, document.body);
}
