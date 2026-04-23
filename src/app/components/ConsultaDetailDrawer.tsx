import React, { useEffect } from 'react';
import { X, Calendar, Video, MessageCircle, MapPin, User, Mail, Phone, FileText, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Consulta } from './ConsultasView';

interface ConsultaDetailDrawerProps {
  consulta: Consulta;
  viewType?: 'personal' | 'broker' | 'inmobiliaria';
  onClose: () => void;
  onConfirmar: (id: string) => void;
  onCancelar: (id: string) => void;
  onReprogramar: (id: string) => void;
}

export const ConsultaDetailDrawer: React.FC<ConsultaDetailDrawerProps> = ({
  consulta,
  viewType = 'personal',
  onClose,
  onConfirmar,
  onCancelar,
  onReprogramar
}) => {
  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const getTipoIcon = () => {
    switch (consulta.tipo) {
      case 'visita':
        return <MapPin size={20} style={{ color: '#124854' }} />;
      case 'videollamada':
        return <Video size={20} style={{ color: '#7D460D' }} />;
      case 'whatsapp':
        return <MessageCircle size={20} style={{ color: '#25D366' }} />;
      default:
        return null;
    }
  };

  const getTipoLabel = () => {
    switch (consulta.tipo) {
      case 'visita':
        return 'Visita presencial';
      case 'videollamada':
        return 'Videollamada';
      case 'whatsapp':
        return 'Consulta por WhatsApp';
      default:
        return '';
    }
  };

  const getEstadoLabel = () => {
    switch (consulta.estado) {
      case 'confirmada':
        return 'Confirmada';
      case 'cancelada':
        return 'Cancelada';
      case 'pendiente':
        return 'Pendiente de confirmación';
      default:
        return '';
    }
  };

  const getEstadoColor = () => {
    switch (consulta.estado) {
      case 'confirmada':
        return '#647E3F';
      case 'cancelada':
        return '#DC2626';
      case 'pendiente':
        return '#6B7280';
      default:
        return '#6B7280';
    }
  };

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-CL', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatFechaContacto = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-CL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#DEDEDE]">
          <h3 style={{ color: '#0A0A0A' }}>Detalle de consulta</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#F5F5F5] transition-colors"
            style={{ borderRadius: '6px' }}
            aria-label="Cerrar"
          >
            <X size={20} style={{ color: '#0A0A0A' }} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Tipo de consulta */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-12 h-12 flex items-center justify-center bg-[#F5F5F5]"
              style={{ borderRadius: '8px' }}
            >
              {getTipoIcon()}
            </div>
            <div>
              <h4 style={{ color: '#0A0A0A', fontSize: '16px', fontWeight: 600 }}>
                {getTipoLabel()}
              </h4>
              {consulta.estado && (
                <div className="flex items-center gap-2 mt-1">
                  {consulta.estado === 'confirmada' && (
                    <CheckCircle size={14} style={{ color: getEstadoColor() }} />
                  )}
                  {consulta.estado === 'cancelada' && (
                    <XCircle size={14} style={{ color: getEstadoColor() }} />
                  )}
                  {consulta.estado === 'pendiente' && (
                    <Clock size={14} style={{ color: getEstadoColor() }} />
                  )}
                  <span
                    style={{
                      color: getEstadoColor(),
                      fontSize: '13px',
                      fontWeight: 500
                    }}
                  >
                    {getEstadoLabel()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Parcela */}
          <div className="mb-6 p-4 bg-[#F9FAFB] border border-[#DEDEDE]" style={{ borderRadius: '8px' }}>
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 flex items-center justify-center bg-[#124854] text-white flex-shrink-0"
                style={{ borderRadius: '6px' }}
              >
                <MapPin size={20} />
              </div>
              <div className="flex-1">
                <h4 style={{ color: '#0A0A0A', fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>
                  {consulta.parcela.nombre}
                </h4>
                <p style={{ color: '#6B7280', fontSize: '13px' }}>
                  {consulta.parcela.ubicacion}
                </p>
              </div>
            </div>
          </div>

          {/* Fecha y hora (para visita/videollamada) */}
          {consulta.fecha && consulta.hora && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Calendar size={18} style={{ color: '#124854' }} />
                <h4 style={{ color: '#0A0A0A', fontSize: '14px', fontWeight: 600 }}>
                  Fecha y hora
                </h4>
              </div>
              <div className="pl-7">
                <p style={{ color: '#0A0A0A', fontSize: '15px', marginBottom: '4px' }}>
                  {formatFecha(consulta.fecha)}
                </p>
                <p style={{ color: '#6B7280', fontSize: '14px' }}>
                  {consulta.hora} hrs
                </p>
              </div>
            </div>
          )}

          {/* Fecha de contacto (para WhatsApp) */}
          {consulta.fechaContacto && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={18} style={{ color: '#124854' }} />
                <h4 style={{ color: '#0A0A0A', fontSize: '14px', fontWeight: 600 }}>
                  Fecha de contacto
                </h4>
              </div>
              <div className="pl-7">
                <p style={{ color: '#0A0A0A', fontSize: '15px' }}>
                  {formatFechaContacto(consulta.fechaContacto)}
                </p>
              </div>
            </div>
          )}

          {/* Usuario */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <User size={18} style={{ color: '#124854' }} />
              <h4 style={{ color: '#0A0A0A', fontSize: '14px', fontWeight: 600 }}>
                Información del usuario
              </h4>
            </div>
            <div className="pl-7 space-y-3">
              <div className="flex items-center gap-3">
                <User size={16} style={{ color: '#6B7280' }} />
                <span style={{ color: '#0A0A0A', fontSize: '14px' }}>
                  {consulta.usuario.nombre}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} style={{ color: '#6B7280' }} />
                <a
                  href={`mailto:${consulta.usuario.email}`}
                  style={{ color: '#124854', fontSize: '14px' }}
                  className="hover:underline"
                >
                  {consulta.usuario.email}
                </a>
              </div>
              {consulta.usuario.telefono && (
                <div className="flex items-center gap-3">
                  <Phone size={16} style={{ color: '#6B7280' }} />
                  <a
                    href={`tel:${consulta.usuario.telefono}`}
                    style={{ color: '#124854', fontSize: '14px' }}
                    className="hover:underline"
                  >
                    {consulta.usuario.telefono}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Notas */}
          {consulta.notas && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <FileText size={18} style={{ color: '#124854' }} />
                <h4 style={{ color: '#0A0A0A', fontSize: '14px', fontWeight: 600 }}>
                  Notas
                </h4>
              </div>
              <div className="pl-7">
                <p style={{ color: '#0A0A0A', fontSize: '14px', lineHeight: '1.6' }}>
                  {consulta.notas}
                </p>
              </div>
            </div>
          )}

          {/* Broker asignado (para dashboard inmobiliaria) */}
          {viewType === 'inmobiliaria' && consulta.broker && (
            <div className="mb-6 p-4 bg-[#F9FAFB] border border-[#DEDEDE]" style={{ borderRadius: '8px' }}>
              <div className="flex items-center gap-2 mb-3">
                <User size={18} style={{ color: '#124854' }} />
                <h4 style={{ color: '#0A0A0A', fontSize: '14px', fontWeight: 600 }}>
                  Broker asignado
                </h4>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 flex items-center justify-center bg-[#124854] text-white flex-shrink-0"
                  style={{ borderRadius: '50%', fontSize: '14px', fontWeight: 600 }}
                >
                  {consulta.broker.nombre.charAt(0)}
                </div>
                <div className="flex-1">
                  <p style={{ color: '#0A0A0A', fontSize: '14px', fontWeight: 500 }}>
                    {consulta.broker.nombre}
                  </p>
                </div>
              </div>
              <div className="pl-13 space-y-2">
                <div className="flex items-center gap-2">
                  <Mail size={14} style={{ color: '#6B7280' }} />
                  <a
                    href={`mailto:${consulta.broker.email}`}
                    style={{ color: '#124854', fontSize: '13px' }}
                    className="hover:underline"
                  >
                    {consulta.broker.email}
                  </a>
                </div>
                {consulta.broker.telefono && (
                  <div className="flex items-center gap-2">
                    <Phone size={14} style={{ color: '#6B7280' }} />
                    <a
                      href={`tel:${consulta.broker.telefono}`}
                      style={{ color: '#124854', fontSize: '13px' }}
                      className="hover:underline"
                    >
                      {consulta.broker.telefono}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Inmobiliaria (para dashboard broker) */}
          {viewType === 'broker' && consulta.inmobiliaria && (
            <div className="mb-6 p-4 bg-[#F9FAFB] border border-[#DEDEDE]" style={{ borderRadius: '8px' }}>
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5" fill="none" stroke="#124854" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <h4 style={{ color: '#0A0A0A', fontSize: '14px', fontWeight: 600 }}>
                  Inmobiliaria
                </h4>
              </div>
              <div className="flex items-center gap-3 pl-7">
                <div
                  className="w-10 h-10 flex items-center justify-center bg-[#462611] text-white flex-shrink-0"
                  style={{ borderRadius: '6px', fontSize: '14px', fontWeight: 600 }}
                >
                  {consulta.inmobiliaria.nombre.charAt(0)}
                </div>
                <div className="flex-1">
                  <p style={{ color: '#0A0A0A', fontSize: '14px', fontWeight: 500 }}>
                    {consulta.inmobiliaria.nombre}
                  </p>
                  <p style={{ color: '#6B7280', fontSize: '12px' }}>
                    Propietario de la parcela
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        {consulta.estado && consulta.estado !== 'cancelada' && (
          <div className="p-6 border-t border-[#DEDEDE] bg-[#F9FAFB]">
            <div className="space-y-3">
              {consulta.estado === 'pendiente' && (
                <button
                  onClick={() => onConfirmar(consulta.id)}
                  className="w-full px-4 py-3 bg-[#647E3F] text-white hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
                  style={{ fontSize: '14px', fontWeight: 600, borderRadius: '8px' }}
                >
                  <CheckCircle size={18} />
                  Confirmar consulta
                </button>
              )}

              <button
                onClick={() => onReprogramar(consulta.id)}
                className="w-full px-4 py-3 bg-white text-[#124854] border border-[#124854] hover:bg-[#124854] hover:text-white transition-colors flex items-center justify-center gap-2"
                style={{ fontSize: '14px', fontWeight: 600, borderRadius: '8px' }}
              >
                <Calendar size={18} />
                Reprogramar
              </button>

              <button
                onClick={() => onCancelar(consulta.id)}
                className="w-full px-4 py-3 bg-white text-[#DC2626] border border-[#DEDEDE] hover:bg-[#DC2626] hover:text-white hover:border-[#DC2626] transition-colors flex items-center justify-center gap-2"
                style={{ fontSize: '14px', fontWeight: 600, borderRadius: '8px' }}
              >
                <XCircle size={18} />
                Cancelar consulta
              </button>
            </div>
          </div>
        )}

        {consulta.estado === 'cancelada' && (
          <div className="p-6 border-t border-[#DEDEDE] bg-[#FEF2F2]">
            <p style={{ color: '#DC2626', fontSize: '14px', textAlign: 'center' }}>
              Esta consulta ha sido cancelada
            </p>
          </div>
        )}

        {/* WhatsApp actions */}
        {consulta.tipo === 'whatsapp' && consulta.usuario.telefono && (
          <div className="p-6 border-t border-[#DEDEDE] bg-[#F9FAFB]">
            <a
              href={`https://wa.me/${consulta.usuario.telefono.replace(/\s/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-4 py-3 bg-[#25D366] text-white hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
              style={{ fontSize: '14px', fontWeight: 600, borderRadius: '8px', display: 'flex' }}
            >
              <MessageCircle size={18} />
              Abrir en WhatsApp
            </a>
          </div>
        )}
      </div>
    </>
  );
};
