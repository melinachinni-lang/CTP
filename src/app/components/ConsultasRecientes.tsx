import React from 'react';
import { MessageCircle, Clock } from 'lucide-react';
import { Consulta } from './ConsultasView';

interface ConsultasRecientesProps {
  consultas: Consulta[];
  onConsultaClick: (consulta: Consulta) => void;
}

export const ConsultasRecientes: React.FC<ConsultasRecientesProps> = ({
  consultas,
  onConsultaClick
}) => {
  // Ordenar por fecha más reciente
  const consultasOrdenadas = [...consultas].sort((a, b) => {
    const dateA = new Date(a.fechaContacto || '');
    const dateB = new Date(b.fechaContacto || '');
    return dateB.getTime() - dateA.getTime();
  });

  const formatRelativeTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Hace un momento';
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours} h`;
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;

    return date.toLocaleDateString('es-CL', {
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className="flex flex-col h-full bg-white border border-[#DEDEDE]" style={{ borderRadius: '8px' }}>
      {/* Header */}
      <div className="p-4 border-b border-[#DEDEDE]">
        <div className="flex items-center gap-2">
          <MessageCircle size={20} style={{ color: '#124854' }} />
          <h3 style={{ color: '#0A0A0A' }}>Consultas recientes</h3>
        </div>
        <p style={{ color: '#6B7280', fontSize: '12px', marginTop: '4px' }}>
          Contactos por WhatsApp
        </p>
      </div>

      {/* Lista de consultas */}
      <div className="flex-1 overflow-y-auto">
        {consultasOrdenadas.length > 0 ? (
          <div className="divide-y divide-[#DEDEDE]">
            {consultasOrdenadas.map((consulta) => (
              <button
                key={consulta.id}
                onClick={() => onConsultaClick(consulta)}
                className="w-full text-left p-4 hover:bg-[#F9FAFB] transition-colors"
              >
                {/* Parcela */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 style={{ color: '#0A0A0A', fontSize: '14px', fontWeight: 500 }}>
                    {consulta.parcela.nombre}
                  </h4>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Clock size={12} style={{ color: '#6B7280' }} />
                    <span style={{ color: '#6B7280', fontSize: '11px' }}>
                      {consulta.fechaContacto && formatRelativeTime(consulta.fechaContacto)}
                    </span>
                  </div>
                </div>

                {/* Ubicación */}
                <p style={{ color: '#6B7280', fontSize: '12px', marginBottom: '8px' }}>
                  {consulta.parcela.ubicacion}
                </p>

                {/* Usuario */}
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-8 h-8 flex items-center justify-center bg-[#124854] text-white"
                    style={{ borderRadius: '50%', fontSize: '12px', fontWeight: 600 }}
                  >
                    {consulta.usuario.nombre.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ color: '#0A0A0A', fontSize: '13px', fontWeight: 500 }}>
                      {consulta.usuario.nombre}
                    </p>
                    <p style={{ color: '#6B7280', fontSize: '11px' }} className="truncate">
                      {consulta.usuario.email}
                    </p>
                  </div>
                </div>

                {/* Tipo de consulta */}
                <div className="flex items-center gap-2">
                  <span
                    className="px-2 py-1 bg-[#124854] text-white inline-flex items-center gap-1"
                    style={{ fontSize: '11px', borderRadius: '4px' }}
                  >
                    <MessageCircle size={12} />
                    WhatsApp
                  </span>
                </div>

                {/* Notas (si existen) */}
                {consulta.notas && (
                  <p
                    style={{ color: '#6B7280', fontSize: '12px', marginTop: '8px' }}
                    className="line-clamp-2"
                  >
                    {consulta.notas}
                  </p>
                )}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <div
              className="w-16 h-16 mb-4 flex items-center justify-center bg-[#F5F5F5]"
              style={{ borderRadius: '50%' }}
            >
              <MessageCircle size={32} style={{ color: '#CDD8DE' }} />
            </div>
            <p style={{ color: '#6B7280', fontSize: '14px', marginBottom: '4px' }}>
              No hay consultas recientes
            </p>
            <p style={{ color: '#9CA3AF', fontSize: '12px' }}>
              Las consultas por WhatsApp aparecerán aquí
            </p>
          </div>
        )}
      </div>

      {/* Footer info */}
      <div className="p-3 border-t border-[#DEDEDE] bg-[#F9FAFB]">
        <p style={{ color: '#6B7280', fontSize: '11px', textAlign: 'center' }}>
          {consultasOrdenadas.length} {consultasOrdenadas.length === 1 ? 'consulta' : 'consultas'}
        </p>
      </div>
    </div>
  );
};
