import React from 'react';
import { X } from 'lucide-react';

interface WhatsAppHandoffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  initialMessage: string;
}

export function WhatsAppHandoffModal({ isOpen, onClose, onConfirm, initialMessage }: WhatsAppHandoffModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 100000
      }}
      onClick={onClose}
    >
      <div
        className="relative rounded-2xl"
        style={{
          backgroundColor: 'var(--background)',
          border: '1px solid var(--border)',
          width: '90%',
          maxWidth: '480px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div 
          className="px-6 py-5 flex items-start justify-between"
          style={{
            borderBottom: '1px solid var(--border)'
          }}
        >
          <div className="space-y-1 flex-1">
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--font-size-h3)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)',
              lineHeight: 'var(--line-height-heading)',
              margin: 0
            }}>
              Vas a continuar por WhatsApp
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-sm)',
              color: '#737373',
              lineHeight: 'var(--line-height-body)',
              margin: 0
            }}>
              Te vamos a redirigir a WhatsApp para que puedas continuar la conversación de forma directa.
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center transition-colors rounded-lg ml-4 flex-shrink-0"
            style={{
              width: '36px',
              height: '36px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--muted)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" style={{ color: 'var(--foreground)' }} />
          </button>
        </div>

        {/* Body - Preview del mensaje */}
        <div className="px-6 py-6 space-y-4">
          <div className="space-y-2">
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-sm)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--foreground)',
              lineHeight: 'var(--line-height-ui)',
              margin: 0
            }}>
              Mensaje que enviarás:
            </p>
            <div 
              className="p-4 rounded-xl"
              style={{
                backgroundColor: '#F5F5F5',
                border: '1px solid #E5E5E5'
              }}
            >
              <div className="flex items-start gap-3">
                {/* Ícono de WhatsApp */}
                <div 
                  className="flex items-center justify-center flex-shrink-0 rounded-lg"
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#25D366'
                  }}
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    className="w-6 h-6"
                    fill="white"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>

                {/* Mensaje */}
                <div className="flex-1">
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-body)',
                    margin: 0,
                    whiteSpace: 'pre-wrap'
                  }}>
                    {initialMessage}
                  </p>
                </div>
              </div>
            </div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-xs)',
              color: '#737373',
              lineHeight: 'var(--line-height-ui)',
              margin: 0
            }}>
              Vas a poder editar este mensaje antes de enviarlo en WhatsApp.
            </p>
          </div>

          {/* Info adicional */}
          <div 
            className="p-4 rounded-xl flex items-start gap-3"
            style={{
              backgroundColor: '#FAFAFA',
              border: '1px solid #E5E5E5'
            }}
          >
            <svg 
              className="w-5 h-5 flex-shrink-0 mt-0.5" 
              fill="none" 
              stroke="#737373"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4"/>
              <path d="M12 8h.01"/>
            </svg>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-xs)',
              color: '#525252',
              lineHeight: 'var(--line-height-body)',
              margin: 0
            }}>
              Al continuar, vas a salir de CompraTuParcela y abrirás WhatsApp en tu dispositivo.
            </p>
          </div>
        </div>

        {/* Footer - Acciones */}
        <div 
          className="px-6 py-5 flex items-center gap-3"
          style={{
            borderTop: '1px solid var(--border)'
          }}
        >
          <button
            onClick={onClose}
            className="flex-1 px-5 py-3 transition-all"
            style={{
              backgroundColor: 'var(--background)',
              color: 'var(--foreground)',
              border: '1px solid #DEDEDE',
              borderRadius: '200px',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-sm)',
              fontWeight: 'var(--font-weight-medium)',
              letterSpacing: 'var(--letter-spacing-wide)',
              lineHeight: 'var(--line-height-ui)',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FAFAFA';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--background)';
            }}
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-5 py-3 transition-all inline-flex items-center justify-center gap-2"
            style={{
              backgroundColor: '#25D366',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '200px',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-sm)',
              fontWeight: 'var(--font-weight-medium)',
              letterSpacing: 'var(--letter-spacing-wide)',
              lineHeight: 'var(--line-height-ui)',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#20BA56';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#25D366';
            }}
          >
            <svg 
              viewBox="0 0 24 24" 
              className="w-5 h-5"
              fill="white"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Continuar a WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
