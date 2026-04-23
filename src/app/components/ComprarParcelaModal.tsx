import React from 'react';
import { X, ShoppingCart, Calendar } from 'lucide-react';

interface ComprarParcelaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComprarAhora: () => void;
  onReservar: () => void;
  parcelaNombre: string;
}

export function ComprarParcelaModal({
  isOpen,
  onClose,
  onComprarAhora,
  onReservar,
  parcelaNombre
}: ComprarParcelaModalProps) {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
        style={{
          maxHeight: '90vh',
          overflow: 'auto'
        }}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b" style={{ borderColor: '#E5E5E5' }}>
          <div className="flex items-start justify-between">
            <div>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-h3)',
                color: '#0A0A0A',
                marginBottom: '0.25rem'
              }}>
                Comprar parcela
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                color: '#737373'
              }}>
                {parcelaNombre}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg transition-colors hover:bg-gray-100"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" style={{ color: '#525252' }} />
            </button>
          </div>
        </div>

        {/* Contenido */}
        <div className="px-6 py-6">
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-base)',
            color: '#525252',
            marginBottom: '1.5rem',
            lineHeight: '1.6'
          }}>
            Elige cómo quieres continuar con la adquisición de esta parcela:
          </p>

          <div className="space-y-3">
            {/* Opción: Comprar ahora */}
            <button
              onClick={onComprarAhora}
              className="w-full p-5 rounded-xl border-2 transition-all hover:border-gray-900 hover:bg-gray-50 text-left"
              style={{
                borderColor: '#E5E5E5',
                backgroundColor: '#FFFFFF'
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#0A0A0A' }}
                >
                  <ShoppingCart className="w-6 h-6" style={{ color: '#FFFFFF' }} />
                </div>
                <div className="flex-1">
                  <h3 style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 'var(--font-weight-semibold)',
                    fontSize: 'var(--font-size-body-base)',
                    color: '#0A0A0A',
                    marginBottom: '0.375rem'
                  }}>
                    Comprar ahora
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    color: '#737373',
                    lineHeight: '1.5'
                  }}>
                    Inicia el proceso de compra inmediata y completa el pago
                  </p>
                </div>
              </div>
            </button>

            {/* Opción: Reservar parcela */}
            <button
              onClick={onReservar}
              className="w-full p-5 rounded-xl border-2 transition-all hover:border-gray-900 hover:bg-gray-50 text-left"
              style={{
                borderColor: '#E5E5E5',
                backgroundColor: '#FFFFFF'
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#F5F5F5', border: '2px solid #0A0A0A' }}
                >
                  <Calendar className="w-6 h-6" style={{ color: '#0A0A0A' }} />
                </div>
                <div className="flex-1">
                  <h3 style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 'var(--font-weight-semibold)',
                    fontSize: 'var(--font-size-body-base)',
                    color: '#0A0A0A',
                    marginBottom: '0.375rem'
                  }}>
                    Reservar parcela
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    color: '#737373',
                    lineHeight: '1.5'
                  }}>
                    Reserva con una seña y asegura tu parcela mientras completas el proceso
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Footer informativo */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-2xl">
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-xs)',
            color: '#737373',
            lineHeight: '1.5',
            textAlign: 'center'
          }}>
            Ambas opciones te guiarán paso a paso hasta completar tu adquisición
          </p>
        </div>
      </div>
    </div>
  );
}
