import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, CreditCard, Building2, Wallet, ExternalLink, AlertCircle, CheckCircle, Copy } from 'lucide-react';

interface FlujoCompraModalProps {
  isOpen: boolean;
  onClose: () => void;
  parcelaNombre: string;
  precio: string;
  tipoCompra: 'comprar' | 'reservar';
  onContinuarAPago?: () => void;
}

type Paso = 'datos-personales' | 'metodo-pago' | 'confirmacion';
type MetodoPago = 'transferencia' | 'tarjeta' | 'paypal';

export function FlujoCompraModal({
  isOpen,
  onClose,
  parcelaNombre,
  precio,
  tipoCompra,
  onContinuarAPago
}: FlujoCompraModalProps) {
  const [pasoActual, setPasoActual] = useState<Paso>('datos-personales');
  const [metodoPagoSeleccionado, setMetodoPagoSeleccionado] = useState<MetodoPago>('transferencia');
  const [mostrarLinkPago, setMostrarLinkPago] = useState(false);
  const [moneda, setMoneda] = useState<'CLP' | 'UF'>('CLP');
  const [montoIngresado, setMontoIngresado] = useState('');
  const [datosPersonales, setDatosPersonales] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    rut: ''
  });

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSiguiente = () => {
    if (pasoActual === 'datos-personales') {
      setPasoActual('metodo-pago');
    } else if (pasoActual === 'metodo-pago') {
      if (onContinuarAPago) {
        onClose();
        onContinuarAPago();
      } else {
        setPasoActual('confirmacion');
      }
    }
  };

  const handleAnterior = () => {
    if (pasoActual === 'metodo-pago') {
      setPasoActual('datos-personales');
    } else if (pasoActual === 'confirmacion') {
      setPasoActual('metodo-pago');
    }
  };

  const pasoTitulo = {
    'datos-personales': 'Tus datos',
    'metodo-pago': 'Método de pago',
    'confirmacion': 'Confirmación'
  };

  const isFormValid = datosPersonales.nombre && datosPersonales.apellido && datosPersonales.email && datosPersonales.telefono && datosPersonales.rut;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl"
        style={{
          maxHeight: '90vh',
          overflow: 'auto'
        }}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b" style={{ borderColor: '#E5E5E5' }}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-h3)',
                color: '#0A0A0A',
                marginBottom: '0.25rem'
              }}>
                {tipoCompra === 'comprar' ? 'Comprar parcela' : 'Reservar parcela'}
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                color: '#737373'
              }}>
                {parcelaNombre} · {precio}
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

          {/* Progress steps */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 flex-1">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium"
                style={{
                  backgroundColor: '#0A0A0A',
                  color: '#FFFFFF'
                }}
              >
                1
              </div>
              <div className="flex-1 h-1 rounded-full" style={{ backgroundColor: pasoActual !== 'datos-personales' ? '#0A0A0A' : '#E5E5E5' }}></div>
            </div>
            <div className="flex items-center gap-2 flex-1">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium"
                style={{
                  backgroundColor: pasoActual === 'metodo-pago' || pasoActual === 'confirmacion' ? '#0A0A0A' : '#E5E5E5',
                  color: pasoActual === 'metodo-pago' || pasoActual === 'confirmacion' ? '#FFFFFF' : '#737373'
                }}
              >
                2
              </div>
              <div className="flex-1 h-1 rounded-full" style={{ backgroundColor: pasoActual === 'confirmacion' ? '#0A0A0A' : '#E5E5E5' }}></div>
            </div>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium"
              style={{
                backgroundColor: pasoActual === 'confirmacion' ? '#0A0A0A' : '#E5E5E5',
                color: pasoActual === 'confirmacion' ? '#FFFFFF' : '#737373'
              }}
            >
              3
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="px-6 py-6">
          <h3 style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 'var(--font-weight-semibold)',
            fontSize: 'var(--font-size-body-lg)',
            color: '#0A0A0A',
            marginBottom: '1.5rem'
          }}>
            {pasoTitulo[pasoActual]}
          </h3>

          {/* Paso 1: Datos personales */}
          {pasoActual === 'datos-personales' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    color: '#525252',
                    fontWeight: 'var(--font-weight-medium)',
                    display: 'block',
                    marginBottom: '0.5rem'
                  }}>
                    Nombre *
                  </label>
                  <input
                    type="text"
                    value={datosPersonales.nombre}
                    onChange={(e) => setDatosPersonales({ ...datosPersonales, nombre: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-base)',
                      borderColor: '#E5E5E5'
                    }}
                    placeholder="Ingresa tu nombre"
                  />
                </div>
                <div>
                  <label style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    color: '#525252',
                    fontWeight: 'var(--font-weight-medium)',
                    display: 'block',
                    marginBottom: '0.5rem'
                  }}>
                    Apellido *
                  </label>
                  <input
                    type="text"
                    value={datosPersonales.apellido}
                    onChange={(e) => setDatosPersonales({ ...datosPersonales, apellido: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-base)',
                      borderColor: '#E5E5E5'
                    }}
                    placeholder="Ingresa tu apellido"
                  />
                </div>
              </div>

              <div>
                <label style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  color: '#525252',
                  fontWeight: 'var(--font-weight-medium)',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}>
                  RUT *
                </label>
                <input
                  type="text"
                  value={datosPersonales.rut}
                  onChange={(e) => setDatosPersonales({ ...datosPersonales, rut: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-base)',
                    borderColor: '#E5E5E5'
                  }}
                  placeholder="12.345.678-9"
                />
              </div>

              <div>
                <label style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  color: '#525252',
                  fontWeight: 'var(--font-weight-medium)',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}>
                  Email *
                </label>
                <input
                  type="email"
                  value={datosPersonales.email}
                  onChange={(e) => setDatosPersonales({ ...datosPersonales, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-base)',
                    borderColor: '#E5E5E5'
                  }}
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  color: '#525252',
                  fontWeight: 'var(--font-weight-medium)',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}>
                  Teléfono *
                </label>
                <input
                  type="tel"
                  value={datosPersonales.telefono}
                  onChange={(e) => setDatosPersonales({ ...datosPersonales, telefono: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-base)',
                    borderColor: '#E5E5E5'
                  }}
                  placeholder="+56 9 1234 5678"
                />
              </div>
            </div>
          )}

          {/* Paso 2: Método de pago */}
          {pasoActual === 'metodo-pago' && (
            <div className="space-y-3">

              {/* Monto a transferir */}
              <div className="rounded-xl p-4" style={{ backgroundColor: '#EBFEF5', border: '2px solid #006B4E' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#047857', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, textAlign: 'center' }}>
                  Monto a transferir
                </p>
                <div className="flex gap-2">
                  <select
                    value={moneda}
                    onChange={e => setMoneda(e.target.value as 'CLP' | 'UF')}
                    className="px-3 py-2.5 rounded-lg text-sm font-semibold"
                    style={{ border: '1px solid #A7F3D0', backgroundColor: '#FFFFFF', color: '#065F46', fontFamily: 'var(--font-body)', outline: 'none', flexShrink: 0 }}
                  >
                    <option value="CLP">CLP $</option>
                    <option value="UF">UF</option>
                  </select>
                  <input
                    type="text"
                    value={montoIngresado}
                    onChange={e => setMontoIngresado(e.target.value.replace(/[^0-9.,]/g, ''))}
                    placeholder={moneda === 'CLP' ? '500.000' : '12,5'}
                    className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold"
                    style={{ border: '1px solid #A7F3D0', backgroundColor: '#FFFFFF', color: '#065F46', fontFamily: 'var(--font-body)', outline: 'none' }}
                  />
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#047857', marginTop: '8px', textAlign: 'center' }}>
                  Monto mínimo: {moneda === 'CLP' ? '$500.000' : 'UF 12,9'}
                </p>
              </div>

              {/* Transferencia bancaria - ACTIVO */}
              <button
                className="w-full p-5 rounded-xl border-2 transition-all hover:border-gray-900 text-left"
                style={{
                  borderColor: metodoPagoSeleccionado === 'transferencia' ? '#0A0A0A' : '#E5E5E5',
                  backgroundColor: metodoPagoSeleccionado === 'transferencia' ? '#FAFAFA' : '#FFFFFF'
                }}
                onClick={() => setMetodoPagoSeleccionado('transferencia')}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: metodoPagoSeleccionado === 'transferencia' ? '#0A0A0A' : '#F5F5F5' }}
                  >
                    <Building2 className="w-6 h-6" style={{ color: metodoPagoSeleccionado === 'transferencia' ? '#FFFFFF' : '#525252' }} />
                  </div>
                  <div className="flex-1">
                    <h3 style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 'var(--font-weight-semibold)',
                      fontSize: 'var(--font-size-body-base)',
                      color: '#0A0A0A',
                      marginBottom: '0.5rem'
                    }}>
                      Transferencia bancaria
                    </h3>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#737373',
                      lineHeight: '1.5'
                    }}>
                      Paga directamente desde tu cuenta bancaria
                    </p>
                  </div>
                </div>
              </button>

              {/* Tarjeta de crédito - PRÓXIMAMENTE */}
              <button
                className="w-full p-5 rounded-xl border-2 transition-all hover:border-gray-900 text-left"
                style={{
                  borderColor: metodoPagoSeleccionado === 'tarjeta' ? '#0A0A0A' : '#E5E5E5',
                  backgroundColor: metodoPagoSeleccionado === 'tarjeta' ? '#FAFAFA' : '#FFFFFF'
                }}
                onClick={() => setMetodoPagoSeleccionado('tarjeta')}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: metodoPagoSeleccionado === 'tarjeta' ? '#0A0A0A' : '#F5F5F5' }}
                  >
                    <CreditCard className="w-6 h-6" style={{ color: metodoPagoSeleccionado === 'tarjeta' ? '#FFFFFF' : '#525252' }} />
                  </div>
                  <div className="flex-1">
                    <h3 style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 'var(--font-weight-semibold)',
                      fontSize: 'var(--font-size-body-base)',
                      color: '#0A0A0A',
                      marginBottom: '0.5rem'
                    }}>
                      Tarjeta de crédito o débito
                    </h3>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#737373',
                      lineHeight: '1.5'
                    }}>
                      Paga con Visa, Mastercard o American Express
                    </p>
                  </div>
                </div>
              </button>

              {/* PayPal - PRÓXIMAMENTE */}
              <button
                className="w-full p-5 rounded-xl border-2 transition-all hover:border-gray-900 text-left"
                style={{
                  borderColor: metodoPagoSeleccionado === 'paypal' ? '#0A0A0A' : '#E5E5E5',
                  backgroundColor: metodoPagoSeleccionado === 'paypal' ? '#FAFAFA' : '#FFFFFF'
                }}
                onClick={() => setMetodoPagoSeleccionado('paypal')}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: metodoPagoSeleccionado === 'paypal' ? '#0A0A0A' : '#F5F5F5' }}
                  >
                    <Wallet className="w-6 h-6" style={{ color: metodoPagoSeleccionado === 'paypal' ? '#FFFFFF' : '#525252' }} />
                  </div>
                  <div className="flex-1">
                    <h3 style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 'var(--font-weight-semibold)',
                      fontSize: 'var(--font-size-body-base)',
                      color: '#0A0A0A',
                      marginBottom: '0.5rem'
                    }}>
                      PayPal / Billeteras digitales
                    </h3>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#737373',
                      lineHeight: '1.5'
                    }}>
                      Paga con PayPal o billeteras en USD
                    </p>
                  </div>
                </div>
              </button>

              {/* Info adicional */}
              <div className="flex items-start gap-3 p-4 rounded-lg" style={{ backgroundColor: '#F0F9FF', border: '1px solid #BAE6FD' }}>
                <AlertCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#0369A1' }} />
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  color: '#0C4A6E',
                  lineHeight: '1.5'
                }}>
                  Por el momento solo aceptamos transferencias bancarias. Próximamente habilitaremos más métodos de pago.
                </p>
              </div>
            </div>
          )}

          {/* Paso 3: Confirmación */}
          {pasoActual === 'confirmacion' && (
            <div className="space-y-6">
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#DCFCE7' }}>
                  <CheckCircle className="w-8 h-8" style={{ color: '#16A34A' }} />
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 'var(--font-weight-semibold)',
                  fontSize: 'var(--font-size-h4)',
                  color: '#0A0A0A',
                  marginBottom: '0.5rem'
                }}>
                  ¡Listo para continuar!
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: '#737373',
                  lineHeight: '1.6'
                }}>
                  Serás redirigido a completar el pago por transferencia bancaria
                </p>
              </div>

              {/* Resumen */}
              <div className="p-5 rounded-xl" style={{ backgroundColor: '#FAFAFA', border: '1px solid #E5E5E5' }}>
                <h4 style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 'var(--font-weight-semibold)',
                  fontSize: 'var(--font-size-body-sm)',
                  color: '#525252',
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Resumen
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#737373'
                    }}>
                      Parcela
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#0A0A0A',
                      fontWeight: 'var(--font-weight-medium)'
                    }}>
                      {parcelaNombre}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#737373'
                    }}>
                      Cliente
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#0A0A0A',
                      fontWeight: 'var(--font-weight-medium)'
                    }}>
                      {datosPersonales.nombre} {datosPersonales.apellido}
                    </span>
                  </div>
                  <div className="flex justify-between pt-3 border-t" style={{ borderColor: '#E5E5E5' }}>
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-base)',
                      color: '#0A0A0A',
                      fontWeight: 'var(--font-weight-semibold)'
                    }}>
                      Total
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-body-lg)',
                      color: '#0A0A0A',
                      fontWeight: 'var(--font-weight-semibold)'
                    }}>
                      {precio}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA final */}
              {!mostrarLinkPago ? (
                <button
                  onClick={() => setMostrarLinkPago(true)}
                  className="w-full px-6 py-3 rounded-full transition-all hover:opacity-90 flex items-center justify-center gap-2"
                  style={{
                    fontFamily: 'var(--font-body)',
                    backgroundColor: '#0A0A0A',
                    color: '#FFFFFF',
                    fontWeight: 'var(--font-weight-semibold)',
                    fontSize: 'var(--font-size-body-base)',
                    textDecoration: 'none'
                  }}
                >
                  <span>Continuar al pago</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              ) : (
                <div className="space-y-3">
                  {/* Link de pago generado */}
                  <div 
                    className="p-4 rounded-xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(249, 250, 251, 0.9) 0%, rgba(243, 244, 246, 0.95) 100%)',
                      border: '1px solid rgba(229, 229, 229, 0.8)'
                    }}
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#16A34A' }} />
                      <div className="flex-1">
                        <h4 style={{
                          fontFamily: 'var(--font-body)',
                          fontWeight: 'var(--font-weight-semibold)',
                          fontSize: 'var(--font-size-body-sm)',
                          color: '#0A0A0A',
                          marginBottom: '0.5rem'
                        }}>
                          Link de pago generado
                        </h4>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          color: '#737373',
                          lineHeight: '1.5'
                        }}>
                          Usa este link para completar tu pago por transferencia bancaria
                        </p>
                      </div>
                    </div>
                    
                    {/* Link copiable */}
                    <div className="flex items-center gap-2 mt-3">
                      <div 
                        className="flex-1 px-3 py-2 rounded-lg overflow-x-auto"
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E5E5E5'
                        }}
                      >
                        <code style={{
                          fontFamily: 'monospace',
                          fontSize: 'var(--font-size-xs)',
                          color: '#0A0A0A',
                          whiteSpace: 'nowrap'
                        }}>
                          https://pago.compratuparcela.cl/t/abc123xyz456
                        </code>
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText('https://pago.compratuparcela.cl/t/abc123xyz456');
                        }}
                        className="px-3 py-2 rounded-lg transition-all hover:bg-gray-200 flex-shrink-0"
                        style={{
                          backgroundColor: '#F5F5F5',
                          border: '1px solid #E5E5E5'
                        }}
                        title="Copiar link"
                      >
                        <Copy className="w-4 h-4" style={{ color: '#525252' }} />
                      </button>
                    </div>
                  </div>

                  {/* Botón para abrir link */}
                  <a
                    href="https://pago.compratuparcela.cl/t/abc123xyz456"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-6 py-3 rounded-full transition-all hover:opacity-90 flex items-center justify-center gap-2"
                    style={{
                      fontFamily: 'var(--font-body)',
                      backgroundColor: '#0A0A0A',
                      color: '#FFFFFF',
                      fontWeight: 'var(--font-weight-semibold)',
                      fontSize: 'var(--font-size-body-base)',
                      textDecoration: 'none'
                    }}
                  >
                    <span>Abrir link de pago</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer con acciones */}
        {pasoActual !== 'confirmacion' && (
          <div className="px-6 py-4 border-t flex items-center justify-between gap-3" style={{ borderColor: '#E5E5E5' }}>
            <button
              onClick={handleAnterior}
              disabled={pasoActual === 'datos-personales'}
              className="px-4 py-2 rounded-lg transition-all hover:bg-gray-100 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                color: '#525252',
                fontWeight: 'var(--font-weight-medium)'
              }}
            >
              <ChevronLeft className="w-4 h-4" />
              Anterior
            </button>

            <button
              onClick={handleSiguiente}
              disabled={pasoActual === 'datos-personales' && !isFormValid}
              className="px-6 py-2 rounded-full transition-all hover:opacity-90 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                fontFamily: 'var(--font-body)',
                backgroundColor: '#0A0A0A',
                color: '#FFFFFF',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-body-sm)'
              }}
            >
              Siguiente
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}