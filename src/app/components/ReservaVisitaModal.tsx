import React, { useState } from 'react';
import { X, Calendar, Clock, User, Mail, CheckCircle, Phone, AlertCircle, Loader2, ChevronLeft, ChevronRight, MapPin, BookOpen } from 'lucide-react';

interface Broker {
  id: number;
  nombre: string;
  cargo: string;
  zona: string;
  publicaciones: number;
  imagen: string;
}

const BROKERS_DISPONIBLES: Broker[] = [
  {
    id: 1,
    nombre: 'María González',
    cargo: 'Broker Senior',
    zona: 'Aysén y Los Lagos',
    publicaciones: 12,
    imagen: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTczOTU2MzIwMHww&ixlib=rb-4.1.0&q=80&w=400',
  },
  {
    id: 2,
    nombre: 'Carlos Ramírez',
    cargo: 'Asesor Comercial',
    zona: 'Patagonia',
    publicaciones: 8,
    imagen: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Mzk1NjMyMDB8MA&ixlib=rb-4.1.0&q=80&w=400',
  },
  {
    id: 3,
    nombre: 'Ana Silva',
    cargo: 'Broker',
    zona: 'Los Lagos',
    publicaciones: 15,
    imagen: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTczOTU2MzIwMHww&ixlib=rb-4.1.0&q=80&w=400',
  },
  {
    id: 4,
    nombre: 'Roberto Fernández',
    cargo: 'Asesor Comercial',
    zona: 'Aysén',
    publicaciones: 10,
    imagen: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Mzk1NjMyMDB8MA&ixlib=rb-4.1.0&q=80&w=400',
  },
  {
    id: 5,
    nombre: 'Patricia Morales',
    cargo: 'Broker',
    zona: 'Patagonia Sur',
    publicaciones: 6,
    imagen: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTczOTU2MzIwMHww&ixlib=rb-4.1.0&q=80&w=400',
  },
  {
    id: 6,
    nombre: 'Javier Torres',
    cargo: 'Asesor Comercial',
    zona: 'Los Lagos Norte',
    publicaciones: 9,
    imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Mzk1NjMyMDB8MA&ixlib=rb-4.1.0&q=80&w=400',
  },
];

interface ReservaVisitaModalProps {
  isOpen: boolean;
  onClose: () => void;
  parcela: {
    titulo: string;
    ubicacion: string;
  };
  agente: {
    nombre: string;
    telefono: string;
    email: string;
    foto?: string;
  };
  tipoVendedor?: string;
}

const HORARIOS_DISPONIBLES = [
  '09:00', '10:00', '11:00', '12:00',
  '14:00', '15:00', '16:00', '17:00', '18:00'
];

const generarDiasDisponibles = () => {
  const dias = [];
  const hoy = new Date();
  let diasAgregados = 0;
  let offset = 1;

  while (diasAgregados < 14) {
    const fecha = new Date(hoy);
    fecha.setDate(hoy.getDate() + offset);
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

const validarEmail = (email: string): { valido: boolean; mensaje: string } => {
  if (!email) return { valido: false, mensaje: '' };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return { valido: false, mensaje: 'El formato del email no es válido' };

  const dominiosInvalidos = ['.con', '.cmo', '.ocm', '.clm', '.cpm'];
  const emailLower = email.toLowerCase();
  for (const dominioInvalido of dominiosInvalidos) {
    if (emailLower.endsWith(dominioInvalido)) {
      if (dominioInvalido === '.con') return { valido: false, mensaje: 'El dominio ".con" no es válido. ¿Quisiste decir ".com"?' };
      return { valido: false, mensaje: `El dominio "${dominioInvalido}" no es válido` };
    }
  }

  return { valido: true, mensaje: '' };
};

const validarTelefono = (telefono: string): { valido: boolean; mensaje: string } => {
  if (!telefono) return { valido: false, mensaje: '' };

  const telefonoLimpio = telefono.replace(/[\s\-()]/g, '');
  const soloNumeros = /^\+?\d+$/;
  if (!soloNumeros.test(telefonoLimpio)) return { valido: false, mensaje: 'El teléfono solo puede contener números' };

  if (telefonoLimpio.startsWith('+56')) {
    if (telefonoLimpio.length !== 12 || telefonoLimpio[3] !== '9') return { valido: false, mensaje: 'Formato: +56 9 XXXX XXXX' };
  } else if (telefonoLimpio.startsWith('56')) {
    if (telefonoLimpio.length !== 11 || telefonoLimpio[2] !== '9') return { valido: false, mensaje: 'Formato: 56 9 XXXX XXXX o +56 9 XXXX XXXX' };
  } else if (telefonoLimpio.startsWith('9')) {
    if (telefonoLimpio.length !== 9) return { valido: false, mensaje: 'Formato: 9 XXXX XXXX' };
  } else {
    return { valido: false, mensaje: 'El teléfono debe comenzar con 9 (o +56 9)' };
  }

  return { valido: true, mensaje: '' };
};

const BROKERS_POR_PAGINA = 3;

export function ReservaVisitaModal({ isOpen, onClose, parcela, agente, tipoVendedor }: ReservaVisitaModalProps) {
  const esInmobiliaria = tipoVendedor === 'Inmobiliaria';

  const [paso, setPaso] = useState<'seleccion' | 'confirmacion'>('seleccion');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loadingHorarios, setLoadingHorarios] = useState(false);
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | null>(null);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [emailTocado, setEmailTocado] = useState<boolean>(false);
  const [telefono, setTelefono] = useState<string>('');
  const [telefonoError, setTelefonoError] = useState<string>('');
  const [telefonoTocado, setTelefonoTocado] = useState<boolean>(false);
  const [mostrarConflicto, setMostrarConflicto] = useState<boolean>(false);
  const [aceptoConflicto, setAceptoConflicto] = useState<boolean>(false);
  const [brokerSeleccionado, setBrokerSeleccionado] = useState<Broker | null>(null);
  const [paginaBroker, setPaginaBroker] = useState(0);
  const diasDisponibles = generarDiasDisponibles();

  if (!isOpen) return null;

  const totalPaginas = Math.ceil(BROKERS_DISPONIBLES.length / BROKERS_POR_PAGINA);
  const brokersPagina = BROKERS_DISPONIBLES.slice(
    paginaBroker * BROKERS_POR_PAGINA,
    paginaBroker * BROKERS_POR_PAGINA + BROKERS_POR_PAGINA
  );

  const agenteEfectivo = esInmobiliaria && brokerSeleccionado
    ? { nombre: brokerSeleccionado.nombre, foto: brokerSeleccionado.imagen }
    : { nombre: agente.nombre, foto: agente.foto };

  const tieneConflicto = (fecha: Date) => {
    const { diaSemana, diaMes } = formatearFecha(fecha);
    return diaSemana === 'Mié' && diaMes === 1;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevoEmail = e.target.value;
    setEmail(nuevoEmail);
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

  const handleTelefonoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevoTelefono = e.target.value;
    setTelefono(nuevoTelefono);
    if (telefonoTocado) {
      const validacion = validarTelefono(nuevoTelefono);
      setTelefonoError(validacion.valido ? '' : validacion.mensaje);
    }
  };

  const handleTelefonoBlur = () => {
    setTelefonoTocado(true);
    const validacion = validarTelefono(telefono);
    setTelefonoError(validacion.valido ? '' : validacion.mensaje);
  };

  const handleConfirmar = async () => {
    const validacionEmail = validarEmail(email);
    if (!validacionEmail.valido) {
      setEmailTocado(true);
      setEmailError(validacionEmail.mensaje);
      return;
    }

    const validacionTelefono = validarTelefono(telefono);
    if (!validacionTelefono.valido) {
      setTelefonoTocado(true);
      setTelefonoError(validacionTelefono.mensaje);
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setShowSuccess(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setShowSuccess(false);
    setPaso('confirmacion');
  };

  const handleCerrar = () => {
    if (isLoading) return;
    setPaso('seleccion');
    setFechaSeleccionada(null);
    setHorarioSeleccionado('');
    setEmail('');
    setEmailError('');
    setEmailTocado(false);
    setTelefono('');
    setTelefonoError('');
    setTelefonoTocado(false);
    setIsLoading(false);
    setShowSuccess(false);
    setBrokerSeleccionado(null);
    setPaginaBroker(0);
    onClose();
  };

  const emailValido = validarEmail(email).valido;
  const telefonoValido = validarTelefono(telefono).valido;
  const brokerListo = !esInmobiliaria || brokerSeleccionado !== null;
  const puedeConfirmar = brokerListo && fechaSeleccionada && horarioSeleccionado && emailValido && telefonoValido;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={handleCerrar}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {paso === 'seleccion' ? (
          <>
            {/* Header */}
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
              <div>
                <h2 style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontSize: 'var(--font-size-h3)',
                  color: 'var(--foreground)',
                  marginBottom: '0.25rem'
                }}>
                  Reservar visita
                </h2>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--muted-foreground)',
                  fontSize: 'var(--font-size-body-sm)'
                }}>
                  {parcela.titulo} • {parcela.ubicacion}
                </p>
              </div>
              <button onClick={handleCerrar} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5" style={{ color: 'var(--foreground)' }} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6" style={{ position: 'relative', minHeight: '400px' }}>
              {/* Loading / Success overlay */}
              {(isLoading || showSuccess) && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  zIndex: 10, borderRadius: '0.5rem'
                }}>
                  <div className="flex flex-col items-center gap-4">
                    {isLoading ? (
                      <>
                        <Loader2 className="w-12 h-12 animate-spin" style={{ color: 'var(--foreground)' }} />
                        <p style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-body-lg)', color: 'var(--foreground)' }}>
                          Agendando visita...
                        </p>
                      </>
                    ) : showSuccess ? (
                      <>
                        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#10B981' }}>
                          <CheckCircle className="w-8 h-8" style={{ color: '#FFFFFF' }} />
                        </div>
                        <p style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-body-lg)', color: 'var(--foreground)' }}>
                          Reserva enviada correctamente
                        </p>
                      </>
                    ) : null}
                  </div>
                </div>
              )}

              {/* ── BROKER CAROUSEL (solo Inmobiliaria) ── */}
              {esInmobiliaria && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <User className="w-5 h-5" style={{ color: 'var(--foreground)' }} />
                    <label style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 'var(--font-weight-medium)',
                      fontSize: 'var(--font-size-body-base)',
                      color: 'var(--foreground)'
                    }}>
                      Selecciona un broker
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Flecha izquierda */}
                    <button
                      onClick={() => setPaginaBroker(p => Math.max(0, p - 1))}
                      disabled={paginaBroker === 0}
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all"
                      style={{
                        backgroundColor: paginaBroker === 0 ? 'var(--input-background)' : 'var(--foreground)',
                        border: '1px solid var(--border)',
                        cursor: paginaBroker === 0 ? 'not-allowed' : 'pointer',
                        opacity: paginaBroker === 0 ? 0.4 : 1
                      }}
                    >
                      <ChevronLeft className="w-4 h-4" style={{ color: paginaBroker === 0 ? 'var(--muted-foreground)' : 'var(--background)' }} />
                    </button>

                    {/* Cards */}
                    <div className="flex-1 grid grid-cols-3 gap-3">
                      {brokersPagina.map((broker) => {
                        const isSelected = brokerSeleccionado?.id === broker.id;
                        return (
                          <button
                            key={broker.id}
                            onClick={() => setBrokerSeleccionado(broker)}
                            className="broker-card relative flex flex-col items-center p-4 rounded-xl text-left"
                            style={{
                              backgroundColor: 'var(--background)',
                              border: isSelected ? '2px solid #006B4E' : '1px solid var(--border)',
                              cursor: 'pointer',
                              transition: 'border-color 0.15s ease, box-shadow 0.15s ease'
                            }}
                          >
                            {/* Badge Activo */}
                            <span
                              className="absolute top-2 right-2 px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: '#D1FAE5',
                                color: '#065F46',
                                fontFamily: 'var(--font-body)',
                                fontSize: '10px',
                                fontWeight: 500
                              }}
                            >
                              Activo
                            </span>

                            {/* Avatar */}
                            <div className="w-14 h-14 rounded-full overflow-hidden mb-3 flex-shrink-0" style={{ border: '2px solid var(--border)' }}>
                              <img src={broker.imagen} alt={broker.nombre} className="w-full h-full object-cover" />
                            </div>

                            {/* Nombre */}
                            <p style={{
                              fontFamily: 'var(--font-body)',
                              fontWeight: 'var(--font-weight-semibold)',
                              fontSize: 'var(--font-size-body-sm)',
                              color: 'var(--foreground)',
                              textAlign: 'center',
                              marginBottom: '0.125rem',
                              lineHeight: '1.3'
                            }}>
                              {broker.nombre}
                            </p>

                            {/* Cargo */}
                            <p style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: '11px',
                              color: 'var(--muted-foreground)',
                              textAlign: 'center'
                            }}>
                              {broker.cargo}
                            </p>

                            {/* Info extra — visible solo en hover */}
                            <div className="broker-extra" style={{
                              maxHeight: 0,
                              overflow: 'hidden',
                              opacity: 0,
                              transition: 'max-height 0.25s ease, opacity 0.2s ease',
                              width: '100%'
                            }}>
                              <div style={{ height: '1px', backgroundColor: 'var(--border)', margin: '0.5rem 0' }} />
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: 'var(--muted-foreground)' }} />
                                <span style={{
                                  fontFamily: 'var(--font-body)',
                                  fontSize: '11px',
                                  color: 'var(--muted-foreground)',
                                  overflow: 'hidden',
                                  whiteSpace: 'nowrap',
                                  textOverflow: 'ellipsis'
                                }}>
                                  {broker.zona}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 mt-1">
                                <BookOpen className="w-3 h-3 flex-shrink-0" style={{ color: 'var(--muted-foreground)' }} />
                                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--muted-foreground)' }}>
                                  {broker.publicaciones} publicaciones
                                </span>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Flecha derecha */}
                    <button
                      onClick={() => setPaginaBroker(p => Math.min(totalPaginas - 1, p + 1))}
                      disabled={paginaBroker >= totalPaginas - 1}
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all"
                      style={{
                        backgroundColor: paginaBroker >= totalPaginas - 1 ? 'var(--input-background)' : 'var(--foreground)',
                        border: '1px solid var(--border)',
                        cursor: paginaBroker >= totalPaginas - 1 ? 'not-allowed' : 'pointer',
                        opacity: paginaBroker >= totalPaginas - 1 ? 0.4 : 1
                      }}
                    >
                      <ChevronRight className="w-4 h-4" style={{ color: paginaBroker >= totalPaginas - 1 ? 'var(--muted-foreground)' : 'var(--background)' }} />
                    </button>
                  </div>

                  {/* Indicadores de página */}
                  {totalPaginas > 1 && (
                    <div className="flex justify-center gap-1.5 mt-3">
                      {Array.from({ length: totalPaginas }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setPaginaBroker(i)}
                          className="rounded-full transition-all"
                          style={{
                            width: i === paginaBroker ? '20px' : '6px',
                            height: '6px',
                            backgroundColor: i === paginaBroker ? 'var(--foreground)' : 'var(--border)'
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ── AGENTE (persona particular o broker ya seleccionado) ── */}
              {!esInmobiliaria && (
                <div className="flex items-center gap-4 p-4 rounded-xl" style={{ backgroundColor: 'var(--input-background)' }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden" style={{ backgroundColor: 'var(--primary)' }}>
                    {agente.foto ? (
                      <img src={agente.foto} alt={agente.nombre} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-6 h-6" style={{ color: 'var(--primary-foreground)' }} />
                    )}
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-body-base)', color: 'var(--foreground)', marginBottom: '0.125rem' }}>
                      {agente.nombre}
                    </p>
                    <p style={{ fontFamily: 'var(--font-body)', color: 'var(--muted-foreground)', fontSize: 'var(--font-size-body-sm)' }}>
                      Te acompañará en la visita
                    </p>
                  </div>
                </div>
              )}

              {/* ── CALENDARIO Y HORARIOS (visible siempre para particular, o tras seleccionar broker) ── */}
              {brokerListo && (
                <>
                  {/* Selección de fecha */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-5 h-5" style={{ color: 'var(--foreground)' }} />
                      <label style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-body-base)', color: 'var(--foreground)' }}>
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
                              setHorarioSeleccionado('');
                              if (tieneConflicto(dia)) {
                                setMostrarConflicto(true);
                                setAceptoConflicto(false);
                              } else {
                                setMostrarConflicto(false);
                                setAceptoConflicto(false);
                              }
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
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: isSelected ? 'var(--background)' : 'var(--muted-foreground)', marginBottom: '0.25rem' }}>
                              {diaSemana}
                            </div>
                            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-body-lg)', color: isSelected ? 'var(--background)' : 'var(--foreground)' }}>
                              {diaMes}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Conflicto de disponibilidad */}
                  {mostrarConflicto && fechaSeleccionada && !aceptoConflicto && (
                    <div className="p-4 rounded-xl" style={{ backgroundColor: '#F5F5F5', border: '1px solid #E5E5E5' }}>
                      <div className="flex items-start gap-3 mb-4">
                        <AlertCircle className="w-5 h-5 mt-0.5" style={{ color: '#647E3F', strokeWidth: 2 }} />
                        <div className="flex-1">
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A', fontWeight: 'var(--font-weight-medium)', marginBottom: '0.25rem', lineHeight: '1.5' }}>
                            Esta fecha ya tiene solicitudes de visita.
                          </p>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#525252', lineHeight: '1.5' }}>
                            Tu reserva no garantiza disponibilidad y será confirmada posteriormente.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => setAceptoConflicto(true)}
                          className="flex-1 px-4 py-2.5 rounded-lg transition-all"
                          style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', border: 'none' }}
                        >
                          Continuar con la solicitud
                        </button>
                        <button
                          onClick={() => { setFechaSeleccionada(null); setMostrarConflicto(false); setAceptoConflicto(false); }}
                          className="flex-1 px-4 py-2.5 rounded-lg transition-all"
                          style={{ backgroundColor: 'transparent', color: '#0A0A0A', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', border: '1px solid #CDD8DE' }}
                        >
                          Elegir otra fecha
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Selección de horario */}
                  {fechaSeleccionada && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="w-5 h-5" style={{ color: 'var(--foreground)' }} />
                        <label style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-body-base)', color: 'var(--foreground)' }}>
                          Selecciona un horario
                        </label>
                      </div>
                      {loadingHorarios ? (
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                          {[...Array(9)].map((_, i) => (
                            <div key={i} className="px-4 py-3 rounded-lg animate-pulse" style={{ backgroundColor: 'var(--input-background)', height: '44px' }} />
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

                  {/* Email */}
                  {fechaSeleccionada && horarioSeleccionado && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Mail className="w-5 h-5" style={{ color: 'var(--foreground)' }} />
                        <label style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-body-base)', color: 'var(--foreground)' }}>
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
                        <div className="mt-2 px-3 py-2 rounded-lg flex items-start gap-2" style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5' }}>
                          <span style={{ color: '#DC2626', fontSize: '16px', marginTop: '1px' }}>⚠</span>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#DC2626', lineHeight: '1.5' }}>{emailError}</p>
                        </div>
                      )}
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: 'var(--muted-foreground)', marginTop: '0.5rem' }}>
                        Te enviaremos la confirmación y recordatorio a este correo
                      </p>
                    </div>
                  )}

                  {/* Teléfono */}
                  {fechaSeleccionada && horarioSeleccionado && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Phone className="w-5 h-5" style={{ color: 'var(--foreground)' }} />
                        <label style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-body-base)', color: 'var(--foreground)' }}>
                          Tu teléfono para confirmación
                        </label>
                      </div>
                      <input
                        type="tel"
                        value={telefono}
                        onChange={handleTelefonoChange}
                        onBlur={handleTelefonoBlur}
                        placeholder="+56 9 XXXX XXXX"
                        className="w-full px-4 py-3 rounded-lg transition-all"
                        style={{
                          backgroundColor: 'var(--input-background)',
                          border: telefonoError && telefonoTocado ? '2px solid #EF4444' : '1px solid var(--border)',
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-base)',
                          color: 'var(--foreground)',
                          outline: 'none'
                        }}
                      />
                      {telefonoError && telefonoTocado && (
                        <div className="mt-2 px-3 py-2 rounded-lg flex items-start gap-2" style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5' }}>
                          <span style={{ color: '#DC2626', fontSize: '16px', marginTop: '1px' }}>⚠</span>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#DC2626', lineHeight: '1.5' }}>{telefonoError}</p>
                        </div>
                      )}
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: 'var(--muted-foreground)', marginTop: '0.5rem' }}>
                        Te enviaremos la confirmación y recordatorio a este teléfono
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t px-6 py-4" style={{ borderColor: 'var(--border)' }}>
              <button
                onClick={handleConfirmar}
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
                Confirmar visita
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Confirmación */}
            <div className="p-8 text-center space-y-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#10B981' }}>
                  <CheckCircle className="w-8 h-8" style={{ color: '#FFFFFF' }} />
                </div>
              </div>

              <div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-h3)', color: 'var(--foreground)', marginBottom: '0.5rem' }}>
                  ¡Visita confirmada!
                </h2>
                <p style={{ fontFamily: 'var(--font-body)', color: 'var(--muted-foreground)', fontSize: 'var(--font-size-body-base)', marginBottom: '1.5rem' }}>
                  Tu visita ha sido agendada exitosamente
                </p>
              </div>

              <div className="p-6 rounded-xl space-y-4" style={{ backgroundColor: 'var(--input-background)' }}>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 mt-0.5" style={{ color: 'var(--foreground)' }} />
                  <div className="text-left">
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: 'var(--muted-foreground)', marginBottom: '0.25rem' }}>Fecha y hora</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-body-base)', color: 'var(--foreground)' }}>
                      {fechaSeleccionada && formatearFechaCompleta(fechaSeleccionada)} a las {horarioSeleccionado}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 mt-0.5" style={{ color: 'var(--foreground)' }} />
                  <div className="text-left">
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: 'var(--muted-foreground)', marginBottom: '0.25rem' }}>Te acompañará</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-body-base)', color: 'var(--foreground)' }}>
                      {agenteEfectivo.nombre}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 mt-0.5" style={{ color: 'var(--foreground)' }} />
                  <div className="text-left">
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: 'var(--muted-foreground)', marginBottom: '0.25rem' }}>Email de confirmación</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-body-base)', color: 'var(--foreground)' }}>{email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 mt-0.5" style={{ color: 'var(--foreground)' }} />
                  <div className="text-left">
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: 'var(--muted-foreground)', marginBottom: '0.25rem' }}>Teléfono de contacto</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-body-base)', color: 'var(--foreground)' }}>{telefono}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg" style={{ backgroundColor: '#EBFEF5', border: '1px solid #B3DAC8' }}>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 mt-0.5" style={{ color: '#006B4E' }} />
                  <div className="text-left">
                    <p style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-body-sm)', color: '#01533E', marginBottom: '0.25rem' }}>Revisa tu email</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#01533E' }}>
                      Te hemos enviado un correo con los detalles de tu visita y un recordatorio.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCerrar}
                className="w-full px-6 py-3 rounded-full transition-all"
                style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)', fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-body-base)' }}
              >
                Entendido
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
