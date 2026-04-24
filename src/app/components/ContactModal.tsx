import React, { useState } from 'react';
import { X, CheckCircle, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { WhatsAppHandoffModal } from '@/app/components/WhatsAppHandoffModal';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  parcelaNombre: string;
  parcelaUbicacion: string;
  vendedorNombre: string;
  vendedorTipo?: 'inmobiliaria' | 'particular';
}

export function ContactModal({ 
  isOpen, 
  onClose, 
  parcelaNombre, 
  parcelaUbicacion, 
  vendedorNombre,
  vendedorTipo = 'inmobiliaria'
}: ContactModalProps) {
  // Estado para simular si el usuario está logueado o no
  const [isLoggedIn] = useState(false);
  
  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });

  // Estado de envío
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Estado para modal de WhatsApp
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [whatsAppMessage, setWhatsAppMessage] = useState('');

  // Validación del formulario
  const [errors, setErrors] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error al escribir
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateForm = () => {
    const newErrors = {
      nombre: '',
      email: '',
      telefono: '',
      mensaje: ''
    };

    let isValid = true;

    // Si no está logueado, validar datos personales
    if (!isLoggedIn) {
      if (!formData.nombre.trim()) {
        newErrors.nombre = 'Ingresa tu nombre';
        isValid = false;
      }

      if (!formData.email.trim()) {
        newErrors.email = 'Ingresa tu email';
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Ingresa un email válido';
        isValid = false;
      }

      if (!formData.telefono.trim()) {
        newErrors.telefono = 'Ingresa tu teléfono';
        isValid = false;
      } else if (!/^[+]?[\d\s()-]{8,}$/.test(formData.telefono)) {
        newErrors.telefono = 'Ingresa un teléfono válido';
        isValid = false;
      }
    }

    // Validar mensaje (obligatorio siempre)
    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'Escribe un mensaje';
      isValid = false;
    } else if (formData.mensaje.trim().length < 10) {
      newErrors.mensaje = 'El mensaje debe tener al menos 10 caracteres';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simular envío del lead al backend
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Crear el lead
    const lead = {
      id: Date.now(),
      parcelaNombre,
      parcelaUbicacion,
      vendedorNombre,
      vendedorTipo,
      comprador: {
        nombre: isLoggedIn ? 'Usuario Logueado' : formData.nombre,
        email: isLoggedIn ? 'usuario@ejemplo.com' : formData.email,
        telefono: isLoggedIn ? '+56 9 1234 5678' : formData.telefono
      },
      mensaje: formData.mensaje,
      fecha: new Date(),
      estado: 'nueva',
      leida: false
    };

    console.log('Lead registrado:', lead);

    setIsSubmitting(false);
    setIsSuccess(true);

    // Resetear formulario después de 2 segundos y cerrar modal
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ nombre: '', email: '', telefono: '', mensaje: '' });
      onClose();
    }, 2500);
  };

  const handleClose = () => {
    if (!isSubmitting && !isSuccess) {
      setFormData({ nombre: '', email: '', telefono: '', mensaje: '' });
      setErrors({ nombre: '', email: '', telefono: '', mensaje: '' });
      setIsSuccess(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  // Detectar si es una consulta general (desde página de inmobiliarias)
  const isGeneralInquiry = parcelaNombre === 'Consulta general';
  const headerTitle = isGeneralInquiry ? 'Contactar inmobiliaria' : 'Contactar al vendedor';
  const headerSubtitle = isGeneralInquiry ? 'Envía tu consulta a la inmobiliaria' : 'Envía tu consulta sobre esta propiedad';

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div 
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h3 
              style={{ 
                fontFamily: 'var(--font-heading)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-h3)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-heading)'
              }}
            >
              {headerTitle}
            </h3>
            <p 
              className="mt-1"
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                color: '#737373'
              }}
            >
              {headerSubtitle}
            </p>
          </div>
          <button 
            onClick={handleClose}
            disabled={isSubmitting}
            className="hover:bg-gray-100 p-2 rounded-full transition-colors disabled:opacity-50"
          >
            <X className="w-6 h-6" style={{ color: '#0A0A0A' }} />
          </button>
        </div>

        {/* Contenido */}
        <div className="flex-1 overflow-y-auto p-6">
          {isSuccess ? (
            // Estado de éxito
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: '#DCFCE7' }}
              >
                <CheckCircle className="w-8 h-8" style={{ color: '#16A34A' }} />
              </div>
              <h4 
                className="mb-2"
                style={{ 
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 'var(--font-weight-semibold)',
                  fontSize: 'var(--font-size-h3)',
                  color: '#0A0A0A'
                }}
              >
                Tu consulta fue enviada correctamente
              </h4>
              <p 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: '#737373',
                  maxWidth: '400px'
                }}
              >
                El vendedor recibirá tu mensaje y se pondrá en contacto contigo pronto
              </p>
            </div>
          ) : (
            // Formulario
            <>
              {/* Información de la propiedad - solo mostrar si NO es consulta general */}
              {!isGeneralInquiry && (
                <div 
                  className="bg-gray-50 rounded-xl p-5 mb-6"
                  style={{ border: '1px solid #E5E5E5' }}
                >
                  <p 
                    className="mb-1"
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-xs)',
                      color: '#737373',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      fontWeight: 'var(--font-weight-semibold)'
                    }}
                  >
                    Propiedad
                  </p>
                  <h4 
                    style={{ 
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 'var(--font-weight-semibold)',
                      fontSize: 'var(--font-size-body-lg)',
                      color: '#0A0A0A',
                      marginBottom: '4px'
                    }}
                  >
                    {parcelaNombre}
                  </h4>
                  <p 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#737373'
                    }}
                  >
                    {parcelaUbicacion}
                  </p>
                  <p 
                    className="mt-3"
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#525252'
                    }}
                  >
                    Vendedor: <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>{vendedorNombre}</span>
                  </p>
                </div>
              )}

              {/* Info de inmobiliaria si es consulta general */}
              {isGeneralInquiry && (
                <div 
                  className="bg-gray-50 rounded-xl p-5 mb-6"
                  style={{ border: '1px solid #E5E5E5' }}
                >
                  <p 
                    className="mb-1"
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-xs)',
                      color: '#737373',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      fontWeight: 'var(--font-weight-semibold)'
                    }}
                  >
                    Inmobiliaria
                  </p>
                  <h4 
                    style={{ 
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 'var(--font-weight-semibold)',
                      fontSize: 'var(--font-size-body-lg)',
                      color: '#0A0A0A'
                    }}
                  >
                    {vendedorNombre}
                  </h4>
                </div>
              )}

              {/* Modal de WhatsApp */}
              {showWhatsAppModal && (
                <WhatsAppHandoffModal
                  isOpen={showWhatsAppModal}
                  onClose={() => setShowWhatsAppModal(false)}
                  onConfirm={() => {
                    console.log('Abriendo WhatsApp con mensaje:', whatsAppMessage);
                    alert('Simulación: Se abriría WhatsApp en tu dispositivo con el mensaje prellenado.');
                    setShowWhatsAppModal(false);
                  }}
                  initialMessage={whatsAppMessage}
                />
              )}

              {/* Botón primario de WhatsApp */}
              <button
                type="button"
                onClick={() => {
                  const message = isGeneralInquiry 
                    ? `Hola, vi tu publicación en Compra tu Parcela y quisiera hacer una consulta sobre ${vendedorNombre}.`
                    : `Hola, vi tu publicación "${parcelaNombre}" en Compra tu Parcela y quisiera hacer una consulta.`;
                  setWhatsAppMessage(message);
                  setShowWhatsAppModal(true);
                }}
                className="w-full transition-all mb-8"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  backgroundColor: '#25D366',
                  border: 'none',
                  borderRadius: '20px',
                  paddingLeft: '28px',
                  paddingRight: '28px',
                  paddingTop: '16px',
                  paddingBottom: '16px',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: '#FFFFFF',
                  lineHeight: 'var(--line-height-ui)',
                  letterSpacing: 'var(--letter-spacing-wide)',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(37, 211, 102, 0.25)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#128C7E';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(18, 140, 126, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#25D366';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.25)';
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ flexShrink: 0 }}
                >
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                    fill="currentColor"
                  />
                </svg>
                Contactar por WhatsApp
              </button>

              {/* Divisor visual */}
              <div className="relative mb-6">
                <div 
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div style={{ width: '100%', height: '1px', backgroundColor: '#E5E5E5' }} />
                </div>
                <div className="relative flex justify-center">
                  <span 
                    className="px-4 bg-white"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-xs)',
                      color: '#A3A3A3',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      fontWeight: 'var(--font-weight-medium)'
                    }}
                  >
                    O envía un formulario
                  </span>
                </div>
              </div>

              {/* Formulario */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Campos de datos personales - solo si no está logueado */}
                {!isLoggedIn && (
                  <div className="space-y-4 pb-5 border-b border-gray-200">
                    <p 
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-xs)',
                        color: '#737373',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontWeight: 'var(--font-weight-semibold)'
                      }}
                    >
                      Tus datos de contacto
                    </p>

                    {/* Nombre */}
                    <div>
                      <label 
                        htmlFor="nombre"
                        className="flex items-center gap-2 mb-2"
                        style={{ 
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#0A0A0A'
                        }}
                      >
                        <User className="w-4 h-4" />
                        Nombre completo
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        value={formData.nombre}
                        onChange={(e) => handleInputChange('nombre', e.target.value)}
                        placeholder="Ej: Juan Pérez"
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ 
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-base)',
                          border: errors.nombre ? '2px solid #DC2626' : '1px solid #E5E5E5',
                          color: '#0A0A0A',
                          backgroundColor: '#FFFFFF'
                        }}
                      />
                      {errors.nombre && (
                        <p 
                          className="mt-1 text-xs"
                          style={{ color: '#DC2626', fontFamily: 'var(--font-body)' }}
                        >
                          {errors.nombre}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label 
                        htmlFor="email"
                        className="flex items-center gap-2 mb-2"
                        style={{ 
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#0A0A0A'
                        }}
                      >
                        <Mail className="w-4 h-4" />
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="tu.email@ejemplo.com"
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ 
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-base)',
                          border: errors.email ? '2px solid #DC2626' : '1px solid #E5E5E5',
                          color: '#0A0A0A',
                          backgroundColor: '#FFFFFF'
                        }}
                      />
                      {errors.email && (
                        <p 
                          className="mt-1 text-xs"
                          style={{ color: '#DC2626', fontFamily: 'var(--font-body)' }}
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Teléfono */}
                    <div>
                      <label 
                        htmlFor="telefono"
                        className="flex items-center gap-2 mb-2"
                        style={{ 
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#0A0A0A'
                        }}
                      >
                        <Phone className="w-4 h-4" />
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        id="telefono"
                        value={formData.telefono}
                        onChange={(e) => handleInputChange('telefono', e.target.value)}
                        placeholder="+56 9 1234 5678"
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ 
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-base)',
                          border: errors.telefono ? '2px solid #DC2626' : '1px solid #E5E5E5',
                          color: '#0A0A0A',
                          backgroundColor: '#FFFFFF'
                        }}
                      />
                      {errors.telefono && (
                        <p 
                          className="mt-1 text-xs"
                          style={{ color: '#DC2626', fontFamily: 'var(--font-body)' }}
                        >
                          {errors.telefono}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Mensaje */}
                <div>
                  <label 
                    htmlFor="mensaje"
                    className="flex items-center gap-2 mb-2"
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A'
                    }}
                  >
                    <MessageSquare className="w-4 h-4" />
                    Tu mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    value={formData.mensaje}
                    onChange={(e) => handleInputChange('mensaje', e.target.value)}
                    placeholder="Ej: Hola, me interesa esta parcela. ¿Está disponible para visitar este fin de semana?"
                    disabled={isSubmitting}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl resize-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-base)',
                      border: errors.mensaje ? '2px solid #DC2626' : '1px solid #E5E5E5',
                      color: '#0A0A0A',
                      backgroundColor: '#FFFFFF',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  />
                  {errors.mensaje && (
                    <p 
                      className="mt-1 text-xs"
                      style={{ color: '#DC2626', fontFamily: 'var(--font-body)' }}
                    >
                      {errors.mensaje}
                    </p>
                  )}
                  <p 
                    className="mt-2 text-xs"
                    style={{ color: '#A3A3A3', fontFamily: 'var(--font-body)' }}
                  >
                    Mínimo 10 caracteres
                  </p>
                </div>

                {/* Información adicional */}
                <div 
                  className="bg-emerald-50 rounded-xl p-4"
                  style={{ border: '1px solid #D1FAE5' }}
                >
                  <p 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#01533E',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    💡 Tu consulta será enviada directamente al vendedor. Te recomendamos ser claro sobre tu interés y disponibilidad.
                  </p>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Footer con botones - solo si no es success */}
        {!isSuccess && (
          <div className="p-6 border-t border-gray-200 flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                fontWeight: 'var(--font-weight-medium)',
                backgroundColor: '#F5F5F5',
                color: '#0A0A0A',
                border: '1px solid #E5E5E5'
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                fontWeight: 'var(--font-weight-medium)',
                backgroundColor: isSubmitting ? '#6B6B6B' : '#737373',
                color: '#FFFFFF',
                border: '1px solid transparent'
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.backgroundColor = '#0A0A0A';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.backgroundColor = '#737373';
                }
              }}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar consulta'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}