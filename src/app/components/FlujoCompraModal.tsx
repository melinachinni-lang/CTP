import React, { useState } from 'react';
import { X, Copy, CheckCircle, AlertCircle, ChevronLeft, ExternalLink, Building2, Link } from 'lucide-react';

interface FlujoCompraModalProps {
  isOpen: boolean;
  onClose: () => void;
  parcelaNombre: string;
  precio: string;
  tipoCompra: 'comprar' | 'reservar';
  onContinuarAPago?: () => void;
}

const DATOS_BANCARIOS = [
  { label: 'Banco', value: 'Banco de Chile' },
  { label: 'Nombre', value: 'Compra Tu Parcela SpA' },
  { label: 'RUT', value: '76.842.310-5' },
  { label: 'Tipo de cuenta', value: 'Cuenta Corriente' },
  { label: 'N° de cuenta', value: '00-123-45678-09' },
  { label: 'Email', value: 'pagos@compratuparcela.cl' },
];

const LINK_PAGO_MOCK = 'https://pago.compratuparcela.cl/r/abc123xyz456';

export function FlujoCompraModal({
  isOpen,
  onClose,
  parcelaNombre,
  precio,
  tipoCompra,
  onContinuarAPago
}: FlujoCompraModalProps) {
  const [paso, setPaso] = useState<1 | 2>(1);
  const [metodoPago, setMetodoPago] = useState<'transferencia' | 'link'>('transferencia');
  const [copiado, setCopiado] = useState<string | null>(null);
  const [linkCopiado, setLinkCopiado] = useState(false);
  const [datosPersonales, setDatosPersonales] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    rut: ''
  });

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleCopiar = (valor: string, key: string) => {
    navigator.clipboard.writeText(valor).catch(() => {});
    setCopiado(key);
    setTimeout(() => setCopiado(null), 1500);
  };

  const handleCopiarLink = () => {
    navigator.clipboard.writeText(LINK_PAGO_MOCK).catch(() => {});
    setLinkCopiado(true);
    setTimeout(() => setLinkCopiado(false), 1500);
  };

  const handleContinuarTransferencia = () => {
    onClose();
    setPaso(1);
    if (onContinuarAPago) onContinuarAPago();
  };

  const handleIrAlLink = () => {
    onClose();
    setPaso(1);
  };

  const isFormValid =
    datosPersonales.nombre &&
    datosPersonales.apellido &&
    datosPersonales.email &&
    datosPersonales.telefono &&
    datosPersonales.rut;

  const paso2Label = metodoPago === 'link' ? 'Link de pago' : 'Transferencia';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl"
        style={{ maxHeight: '90vh', overflow: 'auto' }}
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
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>
                {parcelaNombre} · {precio}
              </p>
            </div>
            <button onClick={onClose} className="p-1 rounded-lg transition-colors hover:bg-gray-100" aria-label="Cerrar">
              <X className="w-5 h-5" style={{ color: '#525252' }} />
            </button>
          </div>

          {/* Stepper */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                style={{ backgroundColor: paso >= 1 ? '#0A0A0A' : '#E5E5E5', color: paso >= 1 ? '#FFFFFF' : '#9CA3AF' }}>
                1
              </div>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: paso === 1 ? '#0A0A0A' : '#9CA3AF', fontWeight: paso === 1 ? 600 : 400, whiteSpace: 'nowrap' }}>
                Tus datos
              </span>
            </div>
            <div className="flex-1 h-px" style={{ backgroundColor: paso >= 2 ? '#0A0A0A' : '#E5E5E5' }} />
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                style={{ backgroundColor: paso >= 2 ? '#0A0A0A' : '#E5E5E5', color: paso >= 2 ? '#FFFFFF' : '#9CA3AF' }}>
                2
              </div>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: paso === 2 ? '#0A0A0A' : '#9CA3AF', fontWeight: paso === 2 ? 600 : 400, whiteSpace: 'nowrap' }}>
                {paso2Label}
              </span>
            </div>
            {metodoPago === 'transferencia' && (
              <>
                <div className="flex-1 h-px" style={{ backgroundColor: '#E5E5E5' }} />
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                    style={{ backgroundColor: '#E5E5E5', color: '#9CA3AF' }}>
                    3
                  </div>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF', fontWeight: 400, whiteSpace: 'nowrap' }}>
                    Comprobante
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Contenido */}
        <div className="px-6 py-6">

          {/* Paso 1: Datos personales */}
          {paso === 1 && (
            <div className="space-y-4">
              <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-body-lg)', color: '#0A0A0A', marginBottom: '1rem' }}>
                Datos de quien transfiere
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#525252', fontWeight: 'var(--font-weight-medium)', display: 'block', marginBottom: '0.5rem' }}>Nombre *</label>
                  <input type="text" value={datosPersonales.nombre}
                    onChange={(e) => setDatosPersonales({ ...datosPersonales, nombre: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900"
                    style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', borderColor: '#E5E5E5' }}
                    placeholder="Ingresa tu nombre" />
                </div>
                <div>
                  <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#525252', fontWeight: 'var(--font-weight-medium)', display: 'block', marginBottom: '0.5rem' }}>Apellido *</label>
                  <input type="text" value={datosPersonales.apellido}
                    onChange={(e) => setDatosPersonales({ ...datosPersonales, apellido: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900"
                    style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', borderColor: '#E5E5E5' }}
                    placeholder="Ingresa tu apellido" />
                </div>
              </div>

              <div>
                <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#525252', fontWeight: 'var(--font-weight-medium)', display: 'block', marginBottom: '0.5rem' }}>RUT *</label>
                <input type="text" value={datosPersonales.rut}
                  onChange={(e) => setDatosPersonales({ ...datosPersonales, rut: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900"
                  style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', borderColor: '#E5E5E5' }}
                  placeholder="12.345.678-9" />
              </div>

              <div>
                <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#525252', fontWeight: 'var(--font-weight-medium)', display: 'block', marginBottom: '0.5rem' }}>Email *</label>
                <input type="email" value={datosPersonales.email}
                  onChange={(e) => setDatosPersonales({ ...datosPersonales, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900"
                  style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', borderColor: '#E5E5E5' }}
                  placeholder="tu@email.com" />
              </div>

              <div>
                <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#525252', fontWeight: 'var(--font-weight-medium)', display: 'block', marginBottom: '0.5rem' }}>Teléfono *</label>
                <input type="tel" value={datosPersonales.telefono}
                  onChange={(e) => setDatosPersonales({ ...datosPersonales, telefono: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900"
                  style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', borderColor: '#E5E5E5' }}
                  placeholder="+56 9 1234 5678" />
              </div>
            </div>
          )}

          {/* Paso 2: Método de pago */}
          {paso === 2 && (
            <div className="space-y-5">

              {/* Selector de método */}
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', color: '#525252', marginBottom: '10px' }}>
                  Selecciona cómo quieres pagar
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setMetodoPago('transferencia')}
                    className="flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left"
                    style={{
                      borderColor: metodoPago === 'transferencia' ? '#0A0A0A' : '#E5E5E5',
                      backgroundColor: metodoPago === 'transferencia' ? '#FAFAFA' : '#FFFFFF'
                    }}
                  >
                    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: metodoPago === 'transferencia' ? '#0A0A0A' : '#F5F5F5' }}>
                      <Building2 className="w-4 h-4" style={{ color: metodoPago === 'transferencia' ? '#FFFFFF' : '#737373' }} />
                    </div>
                    <div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#0A0A0A' }}>
                        Transferencia bancaria
                      </p>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#737373' }}>
                        Pagá desde tu banco
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => setMetodoPago('link')}
                    className="flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left"
                    style={{
                      borderColor: metodoPago === 'link' ? '#006B4E' : '#E5E5E5',
                      backgroundColor: metodoPago === 'link' ? '#EBFEF5' : '#FFFFFF'
                    }}
                  >
                    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: metodoPago === 'link' ? '#006B4E' : '#F5F5F5' }}>
                      <Link className="w-4 h-4" style={{ color: metodoPago === 'link' ? '#FFFFFF' : '#737373' }} />
                    </div>
                    <div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#0A0A0A' }}>
                        Link de pago
                      </p>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#737373' }}>
                        Pagá online con tarjeta
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Monto fijo */}
              <div className="rounded-xl p-4 text-center" style={{ backgroundColor: '#EBFEF5', border: '2px solid #006B4E' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#047857', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                  Monto de reserva
                </p>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h2)', fontWeight: 'var(--font-weight-semibold)', color: '#065F46' }}>
                  $500.000
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#047857', marginTop: '4px' }}>
                  UF 12,9 · Monto mínimo de reserva
                </p>
              </div>

              {/* Contenido según método */}
              {metodoPago === 'transferencia' && (
                <div className="space-y-4">
                  <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #E5E5E5' }}>
                    {DATOS_BANCARIOS.map((dato, i) => (
                      <div key={dato.label} className="flex items-center justify-between px-4 py-3"
                        style={{ borderBottom: i < DATOS_BANCARIOS.length - 1 ? '1px solid #F3F4F6' : 'none', backgroundColor: i % 2 === 0 ? '#FAFAFA' : '#FFFFFF' }}>
                        <div>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF', marginBottom: '1px' }}>{dato.label}</p>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#111827' }}>{dato.value}</p>
                        </div>
                        <button onClick={() => handleCopiar(dato.value, dato.label)}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all"
                          style={{ backgroundColor: copiado === dato.label ? '#D1FAE5' : '#F5F5F5', color: copiado === dato.label ? '#065F46' : '#6B7280', fontFamily: 'var(--font-body)' }}>
                          {copiado === dato.label
                            ? <><CheckCircle className="w-3 h-3" /> Copiado</>
                            : <><Copy className="w-3 h-3" /> Copiar</>}
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl p-3 flex items-start gap-2" style={{ backgroundColor: '#FEF3C7', border: '1px solid #FDE68A' }}>
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#D97706' }} />
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#92400E', lineHeight: '1.5' }}>
                      Asegúrate de transferir el monto exacto e incluir el número de parcela como referencia.
                    </p>
                  </div>
                </div>
              )}

              {metodoPago === 'link' && (
                <div className="space-y-4">
                  <div className="rounded-xl p-5" style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#DCFCE7' }}>
                        <CheckCircle className="w-3.5 h-3.5" style={{ color: '#16A34A' }} />
                      </div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#15803D' }}>
                        Link de pago generado
                      </p>
                    </div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#6B7280', marginBottom: '12px', lineHeight: '1.5' }}>
                      Usá este link para completar el pago con tarjeta de débito o crédito. Una vez confirmado el pago, la parcela quedará reservada.
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 px-3 py-2.5 rounded-lg overflow-hidden"
                        style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
                        <code style={{ fontFamily: 'monospace', fontSize: '12px', color: '#374151', whiteSpace: 'nowrap', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {LINK_PAGO_MOCK}
                        </code>
                      </div>
                      <button onClick={handleCopiarLink}
                        className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-medium transition-all flex-shrink-0"
                        style={{ backgroundColor: linkCopiado ? '#D1FAE5' : '#F5F5F5', color: linkCopiado ? '#065F46' : '#6B7280', fontFamily: 'var(--font-body)', border: '1px solid #E5E5E5' }}>
                        {linkCopiado
                          ? <><CheckCircle className="w-3 h-3" /> Copiado</>
                          : <><Copy className="w-3 h-3" /> Copiar</>}
                      </button>
                    </div>
                  </div>

                  <div className="rounded-xl p-3 flex items-start gap-2" style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}>
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#2563EB' }} />
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#1E40AF', lineHeight: '1.5' }}>
                      El link es válido por 48 hs. Una vez completado el pago, recibirás la confirmación por email.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex items-center justify-between gap-3" style={{ borderColor: '#E5E5E5' }}>
          {paso === 2 ? (
            <button onClick={() => setPaso(1)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg transition-colors hover:bg-gray-100"
              style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#525252', fontWeight: 'var(--font-weight-medium)' }}>
              <ChevronLeft className="w-4 h-4" />
              Anterior
            </button>
          ) : (
            <div />
          )}

          {paso === 1 && (
            <button onClick={() => setPaso(2)} disabled={!isFormValid}
              className="px-6 py-3 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'var(--font-body)', backgroundColor: '#0A0A0A', color: '#FFFFFF', fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-body-base)' }}>
              Siguiente →
            </button>
          )}

          {paso === 2 && metodoPago === 'transferencia' && (
            <button onClick={handleContinuarTransferencia}
              className="flex-1 py-3 rounded-full transition-all"
              style={{ fontFamily: 'var(--font-body)', backgroundColor: '#006B4E', color: '#FFFFFF', fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-body-base)' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#01533E'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#006B4E'}>
              Ya he realizado la transferencia →
            </button>
          )}

          {paso === 2 && metodoPago === 'link' && (
            <a href={LINK_PAGO_MOCK} target="_blank" rel="noopener noreferrer"
              onClick={handleIrAlLink}
              className="flex-1 py-3 rounded-full transition-all flex items-center justify-center gap-2"
              style={{ fontFamily: 'var(--font-body)', backgroundColor: '#006B4E', color: '#FFFFFF', fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-body-base)', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#01533E'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#006B4E'}>
              <ExternalLink className="w-4 h-4" />
              Ir al link de pago
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
