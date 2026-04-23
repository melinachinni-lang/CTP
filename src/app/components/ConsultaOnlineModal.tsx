import React, { useEffect, useState } from 'react';
import { X, MessageCircle, Video, Calendar, Clock, User, CheckCircle, ChevronLeft, Mail, Loader2 } from 'lucide-react';

interface ConsultaOnlineModalProps {
  isOpen: boolean;
  onClose: () => void;
  parcela: {
    id: number;
    titulo: string;
    ubicacion: string;
  };
  agente: {
    nombre: string;
    telefono: string;
    calendlyUrl?: string;
  };
  isDisabled?: boolean;
}

// Horarios disponibles por día
const HORARIOS_DISPONIBLES = [
  '09:00', '10:00', '11:00', '12:00', 
  '14:00', '15:00', '16:00', '17:00', '18:00'
];

// Generar los próximos 14 días (excluyendo domingos)
const generarDiasDisponibles = () => {
  const dias = [];
  const hoy = new Date();
  let diasAgregados = 0;
  let offset = 1; // Empezar desde mañana

  while (diasAgregados < 14) {
    const fecha = new Date(hoy);
    fecha.setDate(hoy.getDate() + offset);
    
    // Excluir domingos (0 = domingo)
    if (fecha.getDay() !== 0) {
      dias.push(fecha);
      diasAgregados++;
    }
    offset++;
  }
  
  return dias;
};

const formatearFecha = (fecha: Date) => {
  const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  
  return {
    diaSemana: dias[fecha.getDay()],
    diaMes: fecha.getDate(),
    mes: meses[fecha.getMonth()],
    año: fecha.getFullYear()
  };
};

const formatearFechaCompleta = (fecha: Date) => {
  const { diaSemana, diaMes, mes, año } = formatearFecha(fecha);
  return `${diaSemana} ${diaMes} de ${mes}, ${año}`;
};

type Paso = 'seleccion' | 'agendar' | 'confirmacion';

// Validar formato de email y detectar errores comunes
const validarEmail = (email: string): { valido: boolean; mensaje: string } => {
  if (!email) {
    return { valido: false, mensaje: '' };
  }
  
  // Expresión regular básica para email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return { valido: false, mensaje: 'El formato del email no es válido' };
  }
  
  // Detectar errores comunes en el dominio
  const dominiosInvalidos = ['.con', '.cmo', '.ocm', '.clm', '.cpm'];
  const emailLower = email.toLowerCase();
  
  for (const dominioInvalido of dominiosInvalidos) {
    if (emailLower.endsWith(dominioInvalido)) {
      // Sugerir corrección si es un error común
      if (dominioInvalido === '.con') {
        return { valido: false, mensaje: 'El dominio ".con" no es válido. ¿Quisiste decir ".com"?' };
      }
      return { valido: false, mensaje: `El dominio "${dominioInvalido}" no es válido` };
    }
  }
  
  return { valido: true, mensaje: '' };
};

export function ConsultaOnlineModal({
  isOpen,
  onClose,
  parcela,
  agente,
  isDisabled = false
}: ConsultaOnlineModalProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [paso, setPaso] = useState<Paso>('seleccion');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingType, setLoadingType] = useState<'whatsapp' | 'videollamada' | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loadingHorarios, setLoadingHorarios] = useState(false);
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | null>(null);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [emailTocado, setEmailTocado] = useState<boolean>(false);
  const diasDisponibles = generarDiasDisponibles();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleWhatsApp = async () => {
    // Mostrar loading
    setIsLoading(true);
    setLoadingType('whatsapp');

    // Simular proceso de 2 segundos
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsLoading(false);
    setShowSuccess(true);

    // Mostrar éxito por 1 segundo
    await new Promise(resolve => setTimeout(resolve, 1000));

    setShowSuccess(false);
    setLoadingType(null);

    // Formatear número de teléfono (remover caracteres no numéricos)
    const phoneNumber = agente.telefono.replace(/\D/g, '');

    // Mensaje prellenado con identificador de parcela
    const mensaje = encodeURIComponent(
      `Hola ${agente.nombre}, estoy interesado en la parcela "${parcela.titulo}" (ID: ${parcela.id}) ubicada en ${parcela.ubicacion}. Me gustaría recibir más información.`
    );

    // Abrir WhatsApp
    window.open(`https://wa.me/${phoneNumber}?text=${mensaje}`, '_blank');
    handleCerrar();
  };

  const handleVideollamada = () => {
    setPaso('agendar');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevoEmail = e.target.value;
    setEmail(nuevoEmail);
    
    // Validar mientras el usuario escribe (solo si ya tocó el campo)
    if (emailTocado) {
      const validacion = validarEmail(nuevoEmail);
      setEmailError(validacion.valido ? '' : validacion.mensaje);
    }
  };

  const handleEmailBlur = () => {
    setEmailTocado(true);
    const validacion = validarEmail(email);
    setEmailError(validacion.valido ? '' : validacion.mensaje);
  };

  const handleConfirmarVideollamada = async () => {
    // Validar email antes de confirmar
    const validacion = validarEmail(email);
    if (!validacion.valido) {
      setEmailTocado(true);
      setEmailError(validacion.mensaje);
      return;
    }

    // Mostrar loading
    setIsLoading(true);
    setLoadingType('videollamada');

    // Simular proceso de 2 segundos
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsLoading(false);
    setShowSuccess(true);

    // Mostrar éxito por 1.5 segundos
    await new Promise(resolve => setTimeout(resolve, 1500));

    setShowSuccess(false);
    setLoadingType(null);
    setPaso('confirmacion');
  };

  const handleVolver = () => {
    setPaso('seleccion');
    setFechaSeleccionada(null);
    setHorarioSeleccionado('');
    setEmail('');
    setEmailError('');
    setEmailTocado(false);
  };

  const handleCerrar = () => {
    if (isLoading) return; // Prevenir cierre durante loading
    setPaso('seleccion');
    setFechaSeleccionada(null);
    setHorarioSeleccionado('');
    setEmail('');
    setEmailError('');
    setEmailTocado(false);
    setIsLoading(false);
    setLoadingType(null);
    setShowSuccess(false);
    onClose();
  };

  const emailValido = validarEmail(email).valido;
  const puedeConfirmar = fechaSeleccionada && horarioSeleccionado && emailValido;

  const ModalContent = () => {
    // Paso 1: Selección de método de contacto
    if (paso === 'seleccion') {
      return (
        <>
          {/* Header */}
          <div 
            className="flex items-center justify-between p-6 border-b"
            style={{ borderColor: 'var(--border)' }}
          >
            <div>
              <h2 style={{ 
                fontFamily: 'var(--font-heading)',
                fontWeight: 'var(--font-weight-medium)',
                fontSize: 'var(--font-size-h3)',
                color: 'var(--foreground)',
                marginBottom: '0.25rem'
              }}>
                Consulta online
              </h2>
              <p style={{ 
                fontFamily: 'var(--font-body)',
                color: 'var(--muted-foreground)',
                fontSize: 'var(--font-size-body-sm)'
              }}>
                Elige cómo te gustaría conversar con {agente.nombre}
              </p>
            </div>
            <button
              onClick={handleCerrar}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" style={{ color: 'var(--foreground)' }} />
            </button>
          </div>

          {/* Options */}
          <div className="p-6 space-y-3">
            {/* WhatsApp Option */}
            <button
              onClick={handleWhatsApp}
              disabled={isDisabled || isLoading}
              className="w-full p-4 rounded-xl border transition-all group"
              style={{
                backgroundColor: isDisabled || isLoading ? 'var(--muted)' : 'var(--background)',
                borderColor: 'var(--border)',
                cursor: isDisabled || isLoading ? 'not-allowed' : 'pointer',
                opacity: isDisabled || (isLoading && loadingType !== 'whatsapp') ? 0.6 : 1
              }}
              onMouseEnter={(e) => {
                if (!isDisabled && !isLoading) {
                  e.currentTarget.style.backgroundColor = 'var(--input-background)';
                  e.currentTarget.style.borderColor = 'var(--foreground)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isDisabled && !isLoading) {
                  e.currentTarget.style.backgroundColor = 'var(--background)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                }
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#25D366' }}
                >
                  {isLoading && loadingType === 'whatsapp' ? (
                    <Loader2 className="w-6 h-6 animate-spin" style={{ color: '#FFFFFF' }} />
                  ) : showSuccess && loadingType === 'whatsapp' ? (
                    <CheckCircle className="w-6 h-6" style={{ color: '#FFFFFF' }} />
                  ) : (
                    <MessageCircle className="w-6 h-6" style={{ color: '#FFFFFF' }} />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 'var(--font-weight-semibold)',
                    fontSize: 'var(--font-size-body-base)',
                    color: 'var(--foreground)',
                    marginBottom: '0.25rem'
                  }}>
                    {isLoading && loadingType === 'whatsapp'
                      ? 'Conectándote con el vendedor...'
                      : showSuccess && loadingType === 'whatsapp'
                      ? 'Redirigiendo a WhatsApp...'
                      : 'Consultar por WhatsApp'}
                  </p>
                  {!isLoading && !showSuccess && (
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      color: 'var(--muted-foreground)',
                      fontSize: 'var(--font-size-body-sm)'
                    }}>
                      Respuesta rápida por chat
                    </p>
                  )}
                </div>
              </div>
            </button>

            {/* Videollamada Option */}
            <button
              onClick={handleVideollamada}
              disabled={isDisabled}
              className="w-full p-4 rounded-xl border transition-all group"
              style={{
                backgroundColor: isDisabled ? 'var(--muted)' : 'var(--background)',
                borderColor: 'var(--border)',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                opacity: isDisabled ? 0.6 : 1
              }}
              onMouseEnter={(e) => {
                if (!isDisabled) {
                  e.currentTarget.style.backgroundColor = 'var(--input-background)';
                  e.currentTarget.style.borderColor = 'var(--foreground)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isDisabled) {
                  e.currentTarget.style.backgroundColor = 'var(--background)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                }
              }}
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#0047BA' }}
                >
                  <Video className="w-6 h-6" style={{ color: '#FFFFFF' }} />
                </div>
                <div className="flex-1 text-left">
                  <p style={{ 
                    fontFamily: 'var(--font-body)',
                    fontWeight: 'var(--font-weight-semibold)',
                    fontSize: 'var(--font-size-body-base)',
                    color: 'var(--foreground)',
                    marginBottom: '0.25rem'
                  }}>
                    Agendar videollamada
                  </p>
                  <p style={{ 
                    fontFamily: 'var(--font-body)',
                    color: 'var(--muted-foreground)',
                    fontSize: 'var(--font-size-body-sm)'
                  }}>
                    Conversación personalizada
                  </p>
                </div>
              </div>
            </button>

            {isDisabled && (
              <div 
                className="p-3 rounded-lg text-center"
                style={{ backgroundColor: 'var(--input-background)' }}
              >
                <p style={{ 
                  fontFamily: 'var(--font-body)',
                  color: 'var(--muted-foreground)',
                  fontSize: 'var(--font-size-body-sm)'
                }}>
                  No hay broker disponible en este momento
                </p>
              </div>
            )}
          </div>
        </>
      );
    }

    // Paso 2: Agendar fecha y hora para videollamada
    if (paso === 'agendar') {
      return (
        <>
          {/* Header */}
          <div className="sticky top-0 bg-white border-b px-6 py-4" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-3">
              <button
                onClick={handleVolver}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" style={{ color: 'var(--foreground)' }} />
              </button>
              <div className="flex-1">
                <h2 style={{ 
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontSize: 'var(--font-size-h3)',
                  color: 'var(--foreground)',
                  marginBottom: '0.25rem'
                }}>
                  Agendar videollamada
                </h2>
                <p style={{ 
                  fontFamily: 'var(--font-body)',
                  color: 'var(--muted-foreground)',
                  fontSize: 'var(--font-size-body-sm)'
                }}>
                  {parcela.titulo}
                </p>
              </div>
              <button
                onClick={handleCerrar}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" style={{ color: 'var(--foreground)' }} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6" style={{ position: 'relative', minHeight: '400px', maxHeight: 'calc(85vh - 140px)', overflowY: 'auto' }}>
            {/* Loading State Centered */}
            {(isLoading && loadingType === 'videollamada') || (showSuccess && loadingType === 'videollamada') ? (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10,
                  borderRadius: '0.5rem'
                }}
              >
                <div className="flex flex-col items-center gap-4">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-12 h-12 animate-spin" style={{ color: 'var(--foreground)' }} />
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 'var(--font-weight-semibold)',
                        fontSize: 'var(--font-size-body-lg)',
                        color: 'var(--foreground)'
                      }}>
                        Agendando videollamada...
                      </p>
                    </>
                  ) : showSuccess ? (
                    <>
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: '#10B981' }}
                      >
                        <CheckCircle className="w-8 h-8" style={{ color: '#FFFFFF' }} />
                      </div>
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 'var(--font-weight-semibold)',
                        fontSize: 'var(--font-size-body-lg)',
                        color: 'var(--foreground)'
                      }}>
                        Videollamada agendada
                      </p>
                    </>
                  ) : null}
                </div>
              </div>
            ) : null}
            {/* Información del agente */}
            <div className="flex items-center gap-4 p-4 rounded-xl" style={{ backgroundColor: 'var(--input-background)' }}>
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                <User className="w-6 h-6" style={{ color: 'var(--primary-foreground)' }} />
              </div>
              <div>
                <p style={{ 
                  fontFamily: 'var(--font-body)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  marginBottom: '0.125rem'
                }}>
                  {agente.nombre}
                </p>
                <p style={{ 
                  fontFamily: 'var(--font-body)',
                  color: 'var(--muted-foreground)',
                  fontSize: 'var(--font-size-body-sm)'
                }}>
                  Te acompañará en la videollamada
                </p>
              </div>
            </div>

            {/* Selección de fecha */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5" style={{ color: 'var(--foreground)' }} />
                <label style={{ 
                  fontFamily: 'var(--font-body)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)'
                }}>
                  Selecciona un día
                </label>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {diasDisponibles.map((dia, index) => {
                  const { diaSemana, diaMes } = formatearFecha(dia);
                  const isSelected = fechaSeleccionada?.toDateString() === dia.toDateString();
                  
                  return (
                    <button
                      key={index}
                      onClick={async () => {
                        setFechaSeleccionada(dia);
                        setHorarioSeleccionado(''); // Reset horario al cambiar fecha
                        // Activar loading en horarios
                        setLoadingHorarios(true);
                        await new Promise(resolve => setTimeout(resolve, 1500));
                        setLoadingHorarios(false);
                      }}
                      className="p-3 rounded-lg text-center transition-all hover:scale-105"
                      style={{
                        backgroundColor: isSelected ? 'var(--foreground)' : 'var(--input-background)',
                        border: isSelected ? 'none' : '1px solid var(--border)'
                      }}
                    >
                      <div style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-xs)',
                        color: isSelected ? 'var(--background)' : 'var(--muted-foreground)',
                        marginBottom: '0.25rem'
                      }}>
                        {diaSemana}
                      </div>
                      <div style={{ 
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 'var(--font-weight-semibold)',
                        fontSize: 'var(--font-size-body-lg)',
                        color: isSelected ? 'var(--background)' : 'var(--foreground)'
                      }}>
                        {diaMes}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selección de horario */}
            {fechaSeleccionada && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5" style={{ color: 'var(--foreground)' }} />
                  <label style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 'var(--font-weight-medium)',
                    fontSize: 'var(--font-size-body-base)',
                    color: 'var(--foreground)'
                  }}>
                    Selecciona un horario
                  </label>
                </div>
                {loadingHorarios ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {[...Array(9)].map((_, i) => (
                      <div
                        key={i}
                        className="px-4 py-3 rounded-lg animate-pulse"
                        style={{
                          backgroundColor: 'var(--input-background)',
                          height: '44px'
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {HORARIOS_DISPONIBLES.map((horario) => {
                      const isSelected = horarioSeleccionado === horario;

                      return (
                        <button
                          key={horario}
                          onClick={() => setHorarioSeleccionado(horario)}
                          className="px-4 py-3 rounded-lg transition-all hover:scale-105"
                          style={{
                            backgroundColor: isSelected ? 'var(--foreground)' : 'var(--input-background)',
                            border: isSelected ? 'none' : '1px solid var(--border)',
                            fontFamily: 'var(--font-body)',
                            fontWeight: isSelected ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)',
                            fontSize: 'var(--font-size-body-sm)',
                            color: isSelected ? 'var(--background)' : 'var(--foreground)'
                          }}
                        >
                          {horario}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Campo de Email */}
            {fechaSeleccionada && horarioSeleccionado && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Mail className="w-5 h-5" style={{ color: 'var(--foreground)' }} />
                  <label style={{ 
                    fontFamily: 'var(--font-body)',
                    fontWeight: 'var(--font-weight-medium)',
                    fontSize: 'var(--font-size-body-base)',
                    color: 'var(--foreground)'
                  }}>
                    Tu email para confirmación
                  </label>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  placeholder="ejemplo@correo.com"
                  className="w-full px-4 py-3 rounded-lg transition-all"
                  style={{
                    backgroundColor: 'var(--input-background)',
                    border: emailError && emailTocado ? '2px solid #EF4444' : '1px solid var(--border)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-base)',
                    color: 'var(--foreground)',
                    outline: 'none'
                  }}
                />
                {emailError && emailTocado && (
                  <div 
                    className="mt-2 px-3 py-2 rounded-lg flex items-start gap-2"
                    style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5' }}
                  >
                    <span style={{ color: '#DC2626', fontSize: '16px', marginTop: '1px' }}>⚠</span>
                    <p style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#DC2626',
                      lineHeight: '1.5'
                    }}>
                      {emailError}
                    </p>
                  </div>
                )}
                <p style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--muted-foreground)',
                  marginTop: '0.5rem'
                }}>
                  Te enviaremos el link de videollamada y recordatorio a este correo
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t px-6 py-4" style={{ borderColor: 'var(--border)' }}>
            <button
              onClick={handleConfirmarVideollamada}
              disabled={!puedeConfirmar || isLoading}
              className="w-full px-6 py-3 rounded-full transition-all"
              style={{
                backgroundColor: puedeConfirmar && !isLoading ? 'var(--foreground)' : 'var(--muted)',
                color: puedeConfirmar && !isLoading ? 'var(--background)' : 'var(--muted-foreground)',
                fontFamily: 'var(--font-body)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-body-base)',
                cursor: puedeConfirmar && !isLoading ? 'pointer' : 'not-allowed',
                opacity: puedeConfirmar && !isLoading ? 1 : 0.6
              }}
            >
              Confirmar videollamada
            </button>
          </div>
        </>
      );
    }

    // Paso 3: Confirmación
    return (
      <>
        {/* Confirmación */}
        <div className="p-8 text-center space-y-6">
          <div className="flex justify-center mb-4">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#10B981' }}
            >
              <CheckCircle className="w-8 h-8" style={{ color: '#FFFFFF' }} />
            </div>
          </div>

          <div>
            <h2 style={{ 
              fontFamily: 'var(--font-heading)',
              fontWeight: 'var(--font-weight-medium)',
              fontSize: 'var(--font-size-h3)',
              color: 'var(--foreground)',
              marginBottom: '0.5rem'
            }}>
              ¡Videollamada confirmada!
            </h2>
            <p style={{ 
              fontFamily: 'var(--font-body)',
              color: 'var(--muted-foreground)',
              fontSize: 'var(--font-size-body-base)',
              marginBottom: '1.5rem'
            }}>
              Tu videollamada ha sido agendada exitosamente
            </p>
          </div>

          <div className="p-6 rounded-xl space-y-4" style={{ backgroundColor: 'var(--input-background)' }}>
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 mt-0.5" style={{ color: 'var(--foreground)' }} />
              <div className="text-left">
                <p style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--muted-foreground)',
                  marginBottom: '0.25rem'
                }}>
                  Fecha y hora
                </p>
                <p style={{ 
                  fontFamily: 'var(--font-body)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)'
                }}>
                  {fechaSeleccionada && formatearFechaCompleta(fechaSeleccionada)} a las {horarioSeleccionado}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <User className="w-5 h-5 mt-0.5" style={{ color: 'var(--foreground)' }} />
              <div className="text-left">
                <p style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--muted-foreground)',
                  marginBottom: '0.25rem'
                }}>
                  Te acompañará
                </p>
                <p style={{ 
                  fontFamily: 'var(--font-body)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)'
                }}>
                  {agente.nombre}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 mt-0.5" style={{ color: 'var(--foreground)' }} />
              <div className="text-left">
                <p style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--muted-foreground)',
                  marginBottom: '0.25rem'
                }}>
                  Email de confirmación
                </p>
                <p style={{ 
                  fontFamily: 'var(--font-body)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)'
                }}>
                  {email}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Video className="w-5 h-5 mt-0.5" style={{ color: 'var(--foreground)' }} />
              <div className="text-left">
                <p style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--muted-foreground)',
                  marginBottom: '0.25rem'
                }}>
                  Link de videollamada
                </p>
                <p style={{ 
                  fontFamily: 'var(--font-body)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)'
                }}>
                  Se enviará por correo
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg" style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 mt-0.5" style={{ color: '#2563EB' }} />
              <div className="text-left">
                <p style={{ 
                  fontFamily: 'var(--font-body)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontSize: 'var(--font-size-body-sm)',
                  color: '#1E40AF',
                  marginBottom: '0.25rem'
                }}>
                  Revisa tu email
                </p>
                <p style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  color: '#1E40AF'
                }}>
                  Te hemos enviado un correo con el link de Google Meet y un recordatorio.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleCerrar}
            className="w-full px-6 py-3 rounded-full transition-all"
            style={{
              backgroundColor: 'var(--foreground)',
              color: 'var(--background)',
              fontFamily: 'var(--font-body)',
              fontWeight: 'var(--font-weight-semibold)',
              fontSize: 'var(--font-size-body-base)'
            }}
          >
            Entendido
          </button>
        </div>
      </>
    );
  };

  if (isMobile) {
    // Bottom Sheet para móvil
    return (
      <div 
        className="fixed inset-0 z-50 flex items-end"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={paso === 'seleccion' ? handleCerrar : undefined}
      >
        <div 
          className="bg-white w-full rounded-t-2xl shadow-xl animate-slide-up"
          style={{ maxHeight: '85vh', overflowY: 'auto' }}
          onClick={(e) => e.stopPropagation()}
        >
          <ModalContent />
        </div>
      </div>
    );
  }

  // Modal para desktop
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={paso === 'seleccion' ? handleCerrar : undefined}
    >
      <div 
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <ModalContent />
      </div>
    </div>
  );
}
