import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, X, Clock, MapPin, ChevronRight, CheckCircle, Circle, User } from 'lucide-react';

interface Inquiry {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  parcela: {
    nombre: string;
    ubicacion: string;
  };
  mensaje: string;
  fecha: Date;
  estado: 'nueva' | 'contactada' | 'cerrada';
  leida: boolean;
}

// Datos de ejemplo - consultas recibidas por un vendedor particular
const mockInquiries: Inquiry[] = [
  {
    id: 1,
    nombre: 'Andrés Muñoz',
    email: 'andres.munoz@email.com',
    telefono: '+56 9 8765 4321',
    parcela: {
      nombre: 'Mi Parcela en Paine',
      ubicacion: 'Paine, Región Metropolitana'
    },
    mensaje: 'Hola! Me encantó tu parcela. ¿Todavía está disponible? Me gustaría visitarla este fin de semana si es posible. ¿Cuál sería el mejor día para ti?',
    fecha: new Date(2025, 0, 27, 14, 30),
    estado: 'nueva',
    leida: false
  },
  {
    id: 2,
    nombre: 'Patricia Silva',
    email: 'paty.silva@email.com',
    telefono: '+56 9 7654 3210',
    parcela: {
      nombre: 'Mi Parcela en Paine',
      ubicacion: 'Paine, Región Metropolitana'
    },
    mensaje: 'Buenos días. Vi tu publicación y me interesa mucho. ¿Tiene agua y luz? ¿Aceptas pago con crédito hipotecario?',
    fecha: new Date(2025, 0, 27, 10, 15),
    estado: 'nueva',
    leida: false
  },
  {
    id: 3,
    nombre: 'Roberto Lagos',
    email: 'roberto.lagos@email.com',
    telefono: '+56 9 6543 2109',
    parcela: {
      nombre: 'Mi Parcela en Paine',
      ubicacion: 'Paine, Región Metropolitana'
    },
    mensaje: 'Hola, quedé muy interesado en la parcela. ¿Podríamos hablar por teléfono? Te dejé mi número.',
    fecha: new Date(2025, 0, 26, 16, 45),
    estado: 'contactada',
    leida: true
  },
  {
    id: 4,
    nombre: 'Carolina Vargas',
    email: 'caro.vargas@email.com',
    telefono: '+56 9 5432 1098',
    parcela: {
      nombre: 'Mi Parcela en Paine',
      ubicacion: 'Paine, Región Metropolitana'
    },
    mensaje: 'Hola! Fui a ver la parcela ayer y me gustó mucho. ¿Hay alguna posibilidad de negociar el precio?',
    fecha: new Date(2025, 0, 25, 11, 20),
    estado: 'contactada',
    leida: true
  },
  {
    id: 5,
    nombre: 'Felipe Contreras',
    email: 'felipe.c@email.com',
    telefono: '+56 9 4321 0987',
    parcela: {
      nombre: 'Mi Parcela en Paine',
      ubicacion: 'Paine, Región Metropolitana'
    },
    mensaje: 'Gracias por responder. Al final decidí comprar otra propiedad más cerca de mi trabajo. ¡Mucha suerte con la venta!',
    fecha: new Date(2025, 0, 22, 9, 30),
    estado: 'cerrada',
    leida: true
  }
];

export function PersonalInquiriesSection() {
  const [selectedFilter, setSelectedFilter] = useState<'todas' | 'nueva' | 'contactada' | 'cerrada'>('todas');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>(mockInquiries);

  // Filtrar consultas según el filtro seleccionado
  const filteredInquiries = selectedFilter === 'todas' 
    ? inquiries 
    : inquiries.filter(inq => inq.estado === selectedFilter);

  // Marcar consulta como leída
  const markAsRead = (id: number) => {
    setInquiries(prev => prev.map(inq => 
      inq.id === id ? { ...inq, leida: true } : inq
    ));
  };

  // Cambiar estado de consulta
  const changeStatus = (id: number, newStatus: 'nueva' | 'contactada' | 'cerrada') => {
    setInquiries(prev => prev.map(inq => 
      inq.id === id ? { ...inq, estado: newStatus } : inq
    ));
  };

  // Abrir detalle y marcar como leída
  const openInquiry = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    if (!inquiry.leida) {
      markAsRead(inquiry.id);
    }
  };

  // Formatear fecha relativa
  const formatRelativeDate = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `Hace ${diffInMinutes} minutos`;
    } else if (diffInHours < 24) {
      return `Hace ${diffInHours} horas`;
    } else if (diffInDays === 1) {
      return 'Hace 1 día';
    } else if (diffInDays < 7) {
      return `Hace ${diffInDays} días`;
    } else {
      return date.toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric' });
    }
  };

  // Obtener badge de estado
  const getStatusBadge = (estado: 'nueva' | 'contactada' | 'cerrada') => {
    switch (estado) {
      case 'nueva':
        return (
          <span 
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
            style={{ 
              backgroundColor: '#EBFEF5',
              color: '#006B4E',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'var(--font-weight-medium)'
            }}
          >
            <Circle className="w-2 h-2 fill-current" />
            Nueva
          </span>
        );
      case 'contactada':
        return (
          <span 
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
            style={{ 
              backgroundColor: '#F0FDF4',
              color: '#15803D',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'var(--font-weight-medium)'
            }}
          >
            <CheckCircle className="w-3 h-3" />
            Contactada
          </span>
        );
      case 'cerrada':
        return (
          <span 
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
            style={{ 
              backgroundColor: '#F5F5F5',
              color: '#737373',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'var(--font-weight-medium)'
            }}
          >
            <X className="w-3 h-3" />
            Cerrada
          </span>
        );
    }
  };

  // Contar consultas por estado
  const getCounts = () => {
    return {
      todas: inquiries.length,
      nueva: inquiries.filter(i => i.estado === 'nueva').length,
      contactada: inquiries.filter(i => i.estado === 'contactada').length,
      cerrada: inquiries.filter(i => i.estado === 'cerrada').length
    };
  };

  const counts = getCounts();

  return (
    <main className="px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 
          style={{ 
            fontFamily: 'var(--font-heading)',
            fontWeight: 'var(--font-weight-semibold)',
            fontSize: 'var(--font-size-h1)',
            color: '#0A0A0A',
            marginBottom: '0.5rem'
          }}
        >
          Consultas
        </h1>
        <p 
          style={{ 
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-base)',
            color: '#737373'
          }}
        >
          Personas interesadas en tu parcela
        </p>
      </div>

      {/* Filtros */}
      <div className="flex gap-3 mb-6 pb-6" style={{ borderBottom: '1px solid #E5E5E5' }}>
        <button
          onClick={() => setSelectedFilter('todas')}
          className={`px-4 py-2 rounded-full transition-all ${
            selectedFilter === 'todas' 
              ? 'bg-[#0A0A0A] text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-sm)',
            fontWeight: 'var(--font-weight-medium)'
          }}
        >
          Todas ({counts.todas})
        </button>
        <button
          onClick={() => setSelectedFilter('nueva')}
          className={`px-4 py-2 rounded-full transition-all ${
            selectedFilter === 'nueva' 
              ? 'bg-[#0A0A0A] text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-sm)',
            fontWeight: 'var(--font-weight-medium)'
          }}
        >
          Nuevas ({counts.nueva})
        </button>
        <button
          onClick={() => setSelectedFilter('contactada')}
          className={`px-4 py-2 rounded-full transition-all ${
            selectedFilter === 'contactada' 
              ? 'bg-[#0A0A0A] text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-sm)',
            fontWeight: 'var(--font-weight-medium)'
          }}
        >
          Contactadas ({counts.contactada})
        </button>
        <button
          onClick={() => setSelectedFilter('cerrada')}
          className={`px-4 py-2 rounded-full transition-all ${
            selectedFilter === 'cerrada' 
              ? 'bg-[#0A0A0A] text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-sm)',
            fontWeight: 'var(--font-weight-medium)'
          }}
        >
          Cerradas ({counts.cerrada})
        </button>
      </div>

      {/* Lista de consultas */}
      <div className="space-y-3">
        {filteredInquiries.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-200">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 
              className="mb-2"
              style={{ 
                fontFamily: 'var(--font-heading)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-h4)',
                color: '#0A0A0A'
              }}
            >
              {selectedFilter === 'todas' ? 'Aún no tienes consultas' : 'No hay consultas en este estado'}
            </h3>
            <p 
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                color: '#737373'
              }}
            >
              {selectedFilter === 'todas' 
                ? 'Cuando alguien se interese en tu parcela, recibirás una consulta aquí'
                : `No tienes consultas "${selectedFilter}s" en este momento`}
            </p>
          </div>
        ) : (
          filteredInquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              onClick={() => openInquiry(inquiry)}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:border-gray-400 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start gap-4">
                {/* Indicador de no leído */}
                <div className="flex-shrink-0 pt-1">
                  {!inquiry.leida && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#006B4E]" />
                  )}
                  {inquiry.leida && (
                    <div className="w-2.5 h-2.5" />
                  )}
                </div>

                {/* Contenido principal */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 text-gray-600" />
                        <h3 
                          style={{ 
                            fontFamily: 'var(--font-heading)',
                            fontWeight: inquiry.leida ? 'var(--font-weight-medium)' : 'var(--font-weight-semibold)',
                            fontSize: 'var(--font-size-body-lg)',
                            color: '#0A0A0A'
                          }}
                        >
                          {inquiry.nombre}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-gray-500" />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>
                          {inquiry.parcela.ubicacion}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(inquiry.estado)}
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)' }}>
                          {formatRelativeDate(inquiry.fecha)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Extracto del mensaje */}
                  <p 
                    className="line-clamp-2 mb-3"
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#525252',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    {inquiry.mensaje}
                  </p>

                  {/* Información de contacto */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Mail className="w-3.5 h-3.5" />
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)' }}>
                        {inquiry.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Phone className="w-3.5 h-3.5" />
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)' }}>
                        {inquiry.telefono}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Icono de acción */}
                <div className="flex-shrink-0 pt-1">
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal de detalle */}
      {selectedInquiry && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]"
          onClick={() => setSelectedInquiry(null)}
        >
          <div 
            className="bg-white rounded-[24px] shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del modal */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 
                style={{ 
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 'var(--font-weight-semibold)',
                  fontSize: 'var(--font-size-h3)',
                  color: '#0A0A0A'
                }}
              >
                Detalle de consulta
              </h3>
              <button 
                onClick={() => setSelectedInquiry(null)}
                className="hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <X className="w-6 h-6" style={{ color: '#0A0A0A' }} />
              </button>
            </div>

            {/* Contenido del modal */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Estado y fecha */}
              <div className="flex items-center justify-between">
                {getStatusBadge(selectedInquiry.estado)}
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)' }}>
                    {formatRelativeDate(selectedInquiry.fecha)}
                  </span>
                </div>
              </div>

              {/* Datos del comprador */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <h4 
                  className="mb-4"
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    color: '#737373',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontWeight: 'var(--font-weight-semibold)'
                  }}
                >
                  Persona interesada
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-600" />
                    <p 
                      style={{ 
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 'var(--font-weight-semibold)',
                        fontSize: 'var(--font-size-body-lg)',
                        color: '#0A0A0A'
                      }}
                    >
                      {selectedInquiry.nombre}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)' }}>
                      {selectedInquiry.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)' }}>
                      {selectedInquiry.telefono}
                    </span>
                  </div>
                </div>
              </div>

              {/* Parcela relacionada */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <h4 
                  className="mb-4"
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    color: '#737373',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontWeight: 'var(--font-weight-semibold)'
                  }}
                >
                  Tu parcela
                </h4>
                <p 
                  style={{ 
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 'var(--font-weight-semibold)',
                    fontSize: 'var(--font-size-body-base)',
                    color: '#0A0A0A',
                    marginBottom: '0.5rem'
                  }}
                >
                  {selectedInquiry.parcela.nombre}
                </p>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-3.5 h-3.5" />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)' }}>
                    {selectedInquiry.parcela.ubicacion}
                  </span>
                </div>
              </div>

              {/* Mensaje completo */}
              <div>
                <h4 
                  className="mb-3"
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    color: '#737373',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontWeight: 'var(--font-weight-semibold)'
                  }}
                >
                  Mensaje
                </h4>
                <p 
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-base)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-body)',
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {selectedInquiry.mensaje}
                </p>
              </div>
            </div>

            {/* Footer con botones de acción */}
            <div className="p-6 border-t border-gray-200 space-y-3">
              {/* Botones de contacto */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/${selectedInquiry.telefono.replace(/\s/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-full transition-colors"
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-base)',
                    fontWeight: 'var(--font-weight-medium)',
                    backgroundColor: '#25D366',
                    color: '#FFFFFF'
                  }}
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
                <a
                  href={`mailto:${selectedInquiry.email}`}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-full transition-colors border-2 border-gray-200 hover:bg-gray-50"
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-base)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A'
                  }}
                >
                  <Mail className="w-4 h-4" />
                  Email
                </a>
              </div>

              {/* Cambiar estado */}
              <div className="flex gap-2">
                {selectedInquiry.estado !== 'contactada' && (
                  <button
                    onClick={() => {
                      changeStatus(selectedInquiry.id, 'contactada');
                      setSelectedInquiry({ ...selectedInquiry, estado: 'contactada' });
                    }}
                    className="flex-1 px-6 py-3 rounded-full transition-colors"
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-base)',
                      fontWeight: 'var(--font-weight-medium)',
                      backgroundColor: '#0A0A0A',
                      color: '#FFFFFF'
                    }}
                  >
                    Marcar como contactada
                  </button>
                )}
                {selectedInquiry.estado !== 'cerrada' && (
                  <button
                    onClick={() => {
                      changeStatus(selectedInquiry.id, 'cerrada');
                      setSelectedInquiry({ ...selectedInquiry, estado: 'cerrada' });
                    }}
                    className="flex-1 px-6 py-3 rounded-full transition-colors border-2 border-gray-200 hover:bg-gray-50"
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-base)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A'
                    }}
                  >
                    Cerrar consulta
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
