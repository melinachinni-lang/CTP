import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, X, Clock, MapPin, ChevronRight, CheckCircle, AlertCircle, Circle } from 'lucide-react';

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
  estado: 'nuevo' | 'contactado' | 'cerrado';
  leido: boolean;
}

// Datos de ejemplo
const mockInquiries: Inquiry[] = [
  {
    id: 1,
    nombre: 'María Rodríguez Contreras',
    email: 'maria.rodriguez@email.com',
    telefono: '+56 9 8765 4321',
    parcela: {
      nombre: 'Parcela Vista Cordillera',
      ubicacion: 'Lo Barnechea, Región Metropolitana'
    },
    mensaje: 'Hola, estoy muy interesada en esta parcela. Me gustaría agendar una visita para conocerla personalmente. ¿Tienen disponibilidad esta semana? También me gustaría conocer más detalles sobre los servicios básicos disponibles.',
    fecha: new Date(2025, 0, 27, 10, 30),
    estado: 'nuevo',
    leido: false
  },
  {
    id: 2,
    nombre: 'Juan Carlos Pérez',
    email: 'jc.perez@email.com',
    telefono: '+56 9 5555 1234',
    parcela: {
      nombre: 'Parcela Los Cedros',
      ubicacion: 'Paine, Región Metropolitana'
    },
    mensaje: 'Buenos días. Quisiera saber si esta parcela cuenta con factibilidad de agua y electricidad. También me interesa conocer el estado de los papeles.',
    fecha: new Date(2025, 0, 27, 8, 15),
    estado: 'nuevo',
    leido: false
  },
  {
    id: 3,
    nombre: 'Patricia Aros Silva',
    email: 'patroa@email.com',
    telefono: '+56 9 4444 3333',
    parcela: {
      nombre: 'Parcela Vista Cordillera',
      ubicacion: 'Lo Barnechea, Región Metropolitana'
    },
    mensaje: 'Hola, estoy buscando una parcela para proyecto agrícola. ¿Esta parcela tiene derechos de agua? ¿Cuál es el precio final con todos los gastos incluidos?',
    fecha: new Date(2025, 0, 26, 16, 45),
    estado: 'contactado',
    leido: true
  },
  {
    id: 4,
    nombre: 'Roberto Silva Campos',
    email: 'rsilva@email.com',
    telefono: '+56 9 2222 1111',
    parcela: {
      nombre: 'Parcela El Bosque',
      ubicacion: 'Aysén, Región de Aysén'
    },
    mensaje: 'Me interesa esta propiedad. ¿Hay posibilidad de negociar el precio? ¿Aceptan crédito hipotecario?',
    fecha: new Date(2025, 0, 25, 14, 20),
    estado: 'contactado',
    leido: true
  },
  {
    id: 5,
    nombre: 'Carlos Muñoz Torres',
    email: 'carlosm@email.com',
    telefono: '+56 9 7777 8888',
    parcela: {
      nombre: 'Parcela Los Cedros',
      ubicacion: 'Paine, Región Metropolitana'
    },
    mensaje: 'Buenas tardes, necesito más información sobre esta parcela. ¿Cuándo podría visitarla?',
    fecha: new Date(2025, 0, 24, 11, 0),
    estado: 'contactado',
    leido: true
  },
  {
    id: 6,
    nombre: 'Ana López Vargas',
    email: 'analopez@email.com',
    telefono: '+56 9 6666 7777',
    parcela: {
      nombre: 'Parcela Valle Alto',
      ubicacion: 'Curacaví, Región Metropolitana'
    },
    mensaje: 'Gracias por la información. Ya encontré otra propiedad.',
    fecha: new Date(2025, 0, 20, 9, 30),
    estado: 'cerrado',
    leido: true
  }
];

export function InquiriesSection() {
  const [selectedFilter, setSelectedFilter] = useState<'todos' | 'nuevo' | 'contactado' | 'cerrado'>('todos');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>(mockInquiries);

  // Filtrar consultas según el filtro seleccionado
  const filteredInquiries = selectedFilter === 'todos' 
    ? inquiries 
    : inquiries.filter(inq => inq.estado === selectedFilter);

  // Marcar consulta como leída
  const markAsRead = (id: number) => {
    setInquiries(prev => prev.map(inq => 
      inq.id === id ? { ...inq, leido: true } : inq
    ));
  };

  // Cambiar estado de consulta
  const changeStatus = (id: number, newStatus: 'nuevo' | 'contactado' | 'cerrado') => {
    setInquiries(prev => prev.map(inq => 
      inq.id === id ? { ...inq, estado: newStatus } : inq
    ));
  };

  // Abrir detalle y marcar como leída
  const openInquiry = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    if (!inquiry.leido) {
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
  const getStatusBadge = (estado: 'nuevo' | 'contactado' | 'cerrado') => {
    switch (estado) {
      case 'nuevo':
        return (
          <span 
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
            style={{ 
              backgroundColor: '#EFF6FF',
              color: '#0047BA',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'var(--font-weight-medium)'
            }}
          >
            <Circle className="w-2 h-2 fill-current" />
            Nuevo
          </span>
        );
      case 'contactado':
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
            Contactado
          </span>
        );
      case 'cerrado':
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
            Cerrado
          </span>
        );
    }
  };

  // Contar consultas por estado
  const getCounts = () => {
    return {
      todos: inquiries.length,
      nuevo: inquiries.filter(i => i.estado === 'nuevo').length,
      contactado: inquiries.filter(i => i.estado === 'contactado').length,
      cerrado: inquiries.filter(i => i.estado === 'cerrado').length
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
          Contactos recibidos desde tus publicaciones
        </p>
      </div>

      {/* Filtros */}
      <div className="flex gap-3 mb-6 pb-6" style={{ borderBottom: '1px solid #E5E5E5' }}>
        <button
          onClick={() => setSelectedFilter('todos')}
          className={`px-4 py-2 rounded-full transition-all ${
            selectedFilter === 'todos' 
              ? 'bg-[#0A0A0A] text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-sm)',
            fontWeight: 'var(--font-weight-medium)'
          }}
        >
          Todos ({counts.todos})
        </button>
        <button
          onClick={() => setSelectedFilter('nuevo')}
          className={`px-4 py-2 rounded-full transition-all ${
            selectedFilter === 'nuevo' 
              ? 'bg-[#0A0A0A] text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-sm)',
            fontWeight: 'var(--font-weight-medium)'
          }}
        >
          Nuevos ({counts.nuevo})
        </button>
        <button
          onClick={() => setSelectedFilter('contactado')}
          className={`px-4 py-2 rounded-full transition-all ${
            selectedFilter === 'contactado' 
              ? 'bg-[#0A0A0A] text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-sm)',
            fontWeight: 'var(--font-weight-medium)'
          }}
        >
          Contactados ({counts.contactado})
        </button>
        <button
          onClick={() => setSelectedFilter('cerrado')}
          className={`px-4 py-2 rounded-full transition-all ${
            selectedFilter === 'cerrado' 
              ? 'bg-[#0A0A0A] text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-sm)',
            fontWeight: 'var(--font-weight-medium)'
          }}
        >
          Cerrados ({counts.cerrado})
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
              No hay consultas
            </h3>
            <p 
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                color: '#737373'
              }}
            >
              {selectedFilter === 'todos' 
                ? 'Aún no has recibido consultas en tus publicaciones'
                : `No tienes consultas en estado "${selectedFilter}"`}
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
                  {!inquiry.leido && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#0047BA]" />
                  )}
                  {inquiry.leido && (
                    <div className="w-2.5 h-2.5" />
                  )}
                </div>

                {/* Contenido principal */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <h3 
                        className="mb-1"
                        style={{ 
                          fontFamily: 'var(--font-heading)',
                          fontWeight: inquiry.leido ? 'var(--font-weight-medium)' : 'var(--font-weight-semibold)',
                          fontSize: 'var(--font-size-body-lg)',
                          color: '#0A0A0A'
                        }}
                      >
                        {inquiry.nombre}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-3.5 h-3.5" />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)' }}>
                          {inquiry.parcela.nombre}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)' }}>
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
                  Datos del interesado
                </h4>
                <div className="space-y-3">
                  <div>
                    <p 
                      style={{ 
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 'var(--font-weight-semibold)',
                        fontSize: 'var(--font-size-body-lg)',
                        color: '#0A0A0A',
                        marginBottom: '0.5rem'
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
                  Parcela de interés
                </h4>
                <p 
                  style={{ 
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 'var(--font-weight-semibold)',
                    fontSize: 'var(--font-size-body-base)',
                    color: '#0A0A0A',
                    marginBottom: '0.25rem'
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
                {selectedInquiry.estado !== 'contactado' && (
                  <button
                    onClick={() => {
                      changeStatus(selectedInquiry.id, 'contactado');
                      setSelectedInquiry({ ...selectedInquiry, estado: 'contactado' });
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
                    Marcar como contactado
                  </button>
                )}
                {selectedInquiry.estado !== 'cerrado' && (
                  <button
                    onClick={() => {
                      changeStatus(selectedInquiry.id, 'cerrado');
                      setSelectedInquiry({ ...selectedInquiry, estado: 'cerrado' });
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
