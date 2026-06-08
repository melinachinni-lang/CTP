import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { MessageCircle, X, CheckCircle2 } from 'lucide-react';
import { useI18n } from '@/app/i18n/i18nContext';

type ChatContext = 'home' | 'parcela-detalle' | 'listado-parcelas' | 'publicar-parcela' | 'crear-proyecto';

interface VambeChatProps {
  initialOpen?: boolean;
  context?: ChatContext;
  subtle?: boolean;
}

export function VambeChat({ initialOpen = false, context = 'home', subtle = false }: VambeChatProps) {
  const { t } = useI18n();
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

  useEffect(() => { setIsMounted(true); }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedOption, isTyping, selectedCategory, ticketCreated]);

  useEffect(() => {
    setSelectedOption(null);
    setIsTyping(false);
    setSelectedCategory(null);
    setProblemDescription('');
    setTicketCreated(false);
  }, [context]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
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

  // Acciones con ID estable para comparaciones lógicas
  const quickActions = [
    { id: 'search',   label: t.chat.action1 },
    { id: 'contact',  label: t.chat.action2 },
    { id: 'report',   label: t.chat.action3 },
    { id: 'payments', label: t.chat.action4 },
  ];

  const problemCategories = [
    { id: 'listings',  label: t.chat.cat1 },
    { id: 'payments',  label: t.chat.cat2 },
    { id: 'account',   label: t.chat.cat3 },
    { id: 'team',      label: t.chat.cat4 },
    { id: 'other',     label: t.chat.cat5 },
  ];

  const selectedActionLabel = quickActions.find(a => a.id === selectedOption)?.label ?? '';
  const selectedCategoryLabel = problemCategories.find(c => c.id === selectedCategory)?.label ?? '';

  const handleOptionSelect = (id: string) => {
    setSelectedOption(id);
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1200);
  };

  const handleCategorySelect = (id: string) => {
    setSelectedCategory(id);
  };

  const handleSubmitTicket = () => {
    if (problemDescription.trim() && selectedCategory) {
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
            width: '64px', height: '64px',
            backgroundColor: isHovered ? '#6B6B6B' : '#111',
            borderRadius: '50%', border: 'none', cursor: 'pointer',
            zIndex: 99999,
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'background-color 0.2s ease, transform 0.2s ease',
            animation: subtle ? 'none' : 'vambeAttention 3s ease-in-out 3'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label={t.chat.openChat}
        >
          <MessageCircle className="w-7 h-7" style={{ color: '#FFFFFF' }} />
        </button>
      )}

      {/* Panel lateral */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 transition-opacity duration-300"
            style={{ backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 99998 }}
            onClick={toggleChat}
          />

          <div
            className="fixed bottom-0 right-0 flex flex-col transition-all duration-300"
            style={{
              width: '400px', height: '600px', maxHeight: '80vh',
              bottom: '24px', right: '24px', borderRadius: '24px',
              border: '2px solid #E5E5E5', backgroundColor: '#FFFFFF',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
              animation: 'slideInRight 0.3s ease-out', zIndex: 99999
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: '2px solid #E5E5E5', backgroundColor: '#FFFFFF', borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center" style={{ width: '48px', height: '48px', backgroundColor: '#F5F5F0', borderRadius: '50%' }}>
                  <MessageCircle className="w-6 h-6" style={{ color: '#006B4E' }} />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h4)', fontWeight: 'var(--font-weight-medium)', color: '#0A0A0A', lineHeight: 'var(--line-height-heading)', margin: 0 }}>
                    {t.chat.assistantTitle}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#6B6B6B', lineHeight: 'var(--line-height-body)', margin: 0 }}>
                    {t.chat.assistantSubtitle}
                  </p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="flex items-center justify-center transition-colors rounded-full"
                style={{ width: '36px', height: '36px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F5F5F5'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                aria-label={t.chat.closeChat}
              >
                <X className="w-5 h-5" style={{ color: '#0A0A0A' }} />
              </button>
            </div>

            {/* Cuerpo */}
            <div className="flex-1 overflow-y-auto px-6 py-6" style={{ backgroundColor: '#FAFAFA' }}>
              {/* Bienvenida */}
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center flex-shrink-0" style={{ width: '36px', height: '36px', backgroundColor: '#F5F5F0', borderRadius: '50%' }}>
                  <MessageCircle className="w-5 h-5" style={{ color: '#006B4E' }} />
                </div>
                <div className="px-5 py-4 rounded-[24px]" style={{ backgroundColor: '#FFFFFF', border: '2px solid #E5E5E5', maxWidth: '85%', borderBottomLeftRadius: '4px' }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A', lineHeight: 'var(--line-height-body)', margin: 0, marginBottom: '8px' }}>
                    {t.chat.welcomeMsg1}
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A', lineHeight: 'var(--line-height-body)', margin: 0 }}>
                    {t.chat.welcomeMsg2}
                  </p>
                </div>
              </div>

              {/* Opciones rápidas */}
              {!selectedOption && (
                <div className="mt-6 space-y-3">
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', color: '#6B6B6B', lineHeight: 'var(--line-height-body)', marginBottom: '8px' }}>
                    {t.chat.whatDoYouNeed}
                  </p>
                  {quickActions.map((action) => (
                    <button
                      key={action.id}
                      className="w-full text-left px-5 py-3 transition-all rounded-[200px]"
                      style={{ backgroundColor: '#FFFFFF', border: '2px solid #E5E5E5', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', color: '#0A0A0A', lineHeight: 'var(--line-height-body)', cursor: 'pointer' }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F5F5F5'; e.currentTarget.style.borderColor = '#111'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.borderColor = '#E5E5E5'; }}
                      onClick={() => handleOptionSelect(action.id)}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Mensaje del usuario */}
              {selectedOption && (
                <div className="flex items-start gap-3 mt-4 justify-end">
                  <div className="px-5 py-3 rounded-[24px]" style={{ backgroundColor: '#E8E7E6', border: '2px solid #DEDEDE', maxWidth: '85%', borderBottomRightRadius: '4px' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A', lineHeight: 'var(--line-height-body)', margin: 0 }}>
                      {selectedActionLabel}
                    </p>
                  </div>
                </div>
              )}

              {/* Typing indicator */}
              {isTyping && selectedOption && (
                <div className="flex items-start gap-3 mt-4">
                  <div className="flex items-center justify-center flex-shrink-0" style={{ width: '36px', height: '36px', backgroundColor: '#F5F5F0', borderRadius: '50%' }}>
                    <MessageCircle className="w-5 h-5" style={{ color: '#006B4E' }} />
                  </div>
                  <div className="px-5 py-3 rounded-[24px] flex items-center gap-1" style={{ backgroundColor: '#FFFFFF', border: '2px solid #E5E5E5', borderBottomLeftRadius: '4px', minHeight: '52px' }}>
                    {[0, 0.2, 0.4].map((delay, i) => (
                      <div key={i} className="rounded-full" style={{ width: '8px', height: '8px', backgroundColor: '#6B6B6B', animation: 'typingDot 1.4s infinite ease-in-out', animationDelay: `${delay}s` }} />
                    ))}
                  </div>
                </div>
              )}

              {/* Flujo: Reportar un problema */}
              {selectedOption === 'report' && !isTyping && !ticketCreated && (
                <>
                  <div className="flex items-start gap-3 mt-4">
                    <div className="flex items-center justify-center flex-shrink-0" style={{ width: '36px', height: '36px', backgroundColor: '#F5F5F0', borderRadius: '50%' }}>
                      <MessageCircle className="w-5 h-5" style={{ color: '#006B4E' }} />
                    </div>
                    <div className="px-5 py-4 rounded-[24px]" style={{ backgroundColor: '#FFFFFF', border: '2px solid #E5E5E5', maxWidth: '85%', borderBottomLeftRadius: '4px' }}>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A', lineHeight: 'var(--line-height-body)', margin: 0 }}>
                        {t.chat.selectCategory}
                      </p>
                    </div>
                  </div>

                  {!selectedCategory && (
                    <div className="mt-4 space-y-2">
                      {problemCategories.map((cat) => (
                        <button
                          key={cat.id}
                          className="w-full text-left px-4 py-2.5 transition-all rounded-[200px]"
                          style={{ backgroundColor: '#FFFFFF', border: '2px solid #E5E5E5', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', color: '#0A0A0A', lineHeight: 'var(--line-height-body)', cursor: 'pointer' }}
                          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F5F5F5'; e.currentTarget.style.borderColor = '#111'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.borderColor = '#E5E5E5'; }}
                          onClick={() => handleCategorySelect(cat.id)}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {selectedCategory && (
                    <>
                      <div className="flex items-start gap-3 mt-4 justify-end">
                        <div className="px-5 py-3 rounded-[24px]" style={{ backgroundColor: '#E8E7E6', border: '2px solid #DEDEDE', maxWidth: '85%', borderBottomRightRadius: '4px' }}>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A', lineHeight: 'var(--line-height-body)', margin: 0 }}>
                            {selectedCategoryLabel}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 mt-4">
                        <div className="flex items-center justify-center flex-shrink-0" style={{ width: '36px', height: '36px', backgroundColor: '#F5F5F0', borderRadius: '50%' }}>
                          <MessageCircle className="w-5 h-5" style={{ color: '#006B4E' }} />
                        </div>
                        <div className="px-5 py-4 rounded-[24px]" style={{ backgroundColor: '#FFFFFF', border: '2px solid #E5E5E5', maxWidth: '85%', borderBottomLeftRadius: '4px' }}>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A', lineHeight: 'var(--line-height-body)', margin: 0 }}>
                            {t.chat.describeIssue}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 space-y-3">
                        <textarea
                          value={problemDescription}
                          onChange={(e) => setProblemDescription(e.target.value)}
                          placeholder={t.chat.issuePlaceholder}
                          rows={4}
                          className="w-full px-4 py-3 rounded-[24px] resize-none focus:outline-none transition-all"
                          style={{ backgroundColor: '#FFFFFF', border: '2px solid #E5E5E5', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A', lineHeight: 'var(--line-height-body)' }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = '#111'; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E5E5'; }}
                        />
                        <button
                          className="w-full transition-all rounded-[200px]"
                          style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            backgroundColor: problemDescription.trim() ? '#111' : '#E5E5E5',
                            border: 'none', paddingLeft: '24px', paddingRight: '24px', paddingTop: '14px', paddingBottom: '14px',
                            fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)',
                            color: problemDescription.trim() ? '#FFFFFF' : '#6B6B6B', lineHeight: 'var(--line-height-body)',
                            cursor: problemDescription.trim() ? 'pointer' : 'not-allowed', whiteSpace: 'nowrap'
                          }}
                          onMouseEnter={(e) => { if (problemDescription.trim()) e.currentTarget.style.backgroundColor = '#6B6B6B'; }}
                          onMouseLeave={(e) => { if (problemDescription.trim()) e.currentTarget.style.backgroundColor = '#111'; }}
                          onClick={handleSubmitTicket}
                          disabled={!problemDescription.trim()}
                        >
                          {t.chat.submitInquiry}
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}

              {/* Confirmación del ticket */}
              {ticketCreated && (
                <div className="flex items-start gap-3 mt-4">
                  <div className="flex items-center justify-center flex-shrink-0" style={{ width: '36px', height: '36px', backgroundColor: '#F5F5F0', borderRadius: '50%' }}>
                    <MessageCircle className="w-5 h-5" style={{ color: '#006B4E' }} />
                  </div>
                  <div className="px-5 py-4 rounded-[24px]" style={{ backgroundColor: 'rgba(100,126,63,0.1)', border: '2px solid rgba(100,126,63,0.3)', maxWidth: '85%', borderBottomLeftRadius: '4px' }}>
                    <div className="flex items-start gap-2 mb-3">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#16A34A' }} />
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', color: '#0A0A0A', lineHeight: 'var(--line-height-body)', margin: 0 }}>
                        {t.chat.ticketCreated}
                      </p>
                    </div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A', lineHeight: 'var(--line-height-body)', margin: 0, marginBottom: '12px' }}>
                      <span style={{ fontWeight: 'var(--font-weight-medium)' }}>{t.chat.ticketNumber}</span> {ticketNumber}
                    </p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A', lineHeight: 'var(--line-height-body)', margin: 0 }}>
                      {t.chat.specialistContact}
                    </p>
                  </div>
                </div>
              )}

              {/* Respuesta genérica para otras opciones */}
              {selectedOption && selectedOption !== 'report' && !isTyping && (
                <div className="flex items-start gap-3 mt-4">
                  <div className="flex items-center justify-center flex-shrink-0" style={{ width: '36px', height: '36px', backgroundColor: '#F5F5F0', borderRadius: '50%' }}>
                    <MessageCircle className="w-5 h-5" style={{ color: '#006B4E' }} />
                  </div>
                  <div className="px-5 py-4 rounded-[24px]" style={{ backgroundColor: '#FFFFFF', border: '2px solid #E5E5E5', maxWidth: '85%', borderBottomLeftRadius: '4px' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A', lineHeight: 'var(--line-height-body)', margin: 0 }}>
                      {selectedOption === 'search'   && t.chat.responseSearch}
                      {selectedOption === 'contact'  && t.chat.responseContact}
                      {selectedOption === 'payments' && t.chat.responsePayments}
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
          from { opacity: 0; transform: translateX(100%); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.7; }
          30%            { transform: translateY(-10px); opacity: 1; }
        }
      `}</style>
    </>
  );

  if (!isMounted) return null;
  return createPortal(chatContent, document.body);
}
