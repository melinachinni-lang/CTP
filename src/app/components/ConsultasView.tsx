import React, { useState } from 'react';
import { ConsultasCalendar } from './ConsultasCalendar';
import { ConsultasRecientes } from './ConsultasRecientes';
import { ConsultaDetailDrawer } from './ConsultaDetailDrawer';
import { Calendar, List, Filter, ChevronDown } from 'lucide-react';

interface ConsultasViewProps {
  viewType?: 'personal' | 'broker' | 'inmobiliaria';
}

export interface Consulta {
  id: string;
  tipo: 'visita' | 'videollamada' | 'whatsapp';
  parcela: {
    id: number;
    nombre: string;
    ubicacion: string;
  };
  usuario: {
    nombre: string;
    email: string;
    telefono?: string;
  };
  fecha?: string; // ISO string para visita/videollamada
  hora?: string; // "14:00" format
  estado?: 'pendiente' | 'confirmada' | 'cancelada';
  fechaContacto?: string; // ISO string para whatsapp
  notas?: string;
  broker?: {
    nombre: string;
    email: string;
    telefono?: string;
  };
  inmobiliaria?: {
    nombre: string;
    logo?: string;
  };
}

const mockConsultas: Consulta[] = [
  {
    id: '1',
    tipo: 'visita',
    parcela: {
      id: 1,
      nombre: 'Parcela Vista al Valle',
      ubicacion: 'Valle Central, VI Región'
    },
    usuario: {
      nombre: 'María González',
      email: 'maria.gonzalez@email.com',
      telefono: '+56 9 8765 4321'
    },
    fecha: '2026-04-05',
    hora: '10:00',
    estado: 'confirmada',
    notas: 'Interesada en ver el sistema de riego',
    broker: {
      nombre: 'Carolina Méndez',
      email: 'carolina.mendez@inmobiliaria.cl',
      telefono: '+56 9 7777 8888'
    },
    inmobiliaria: {
      nombre: 'Propiedades del Sur',
      logo: undefined
    }
  },
  {
    id: '2',
    tipo: 'videollamada',
    parcela: {
      id: 2,
      nombre: 'Terreno Los Robles',
      ubicacion: 'Paine, Región Metropolitana'
    },
    usuario: {
      nombre: 'Carlos Muñoz',
      email: 'carlos.munoz@email.com',
      telefono: '+56 9 7654 3210'
    },
    fecha: '2026-04-05',
    hora: '15:00',
    estado: 'pendiente',
    notas: 'Primera consulta del usuario',
    broker: {
      nombre: 'Rodrigo Fuentes',
      email: 'rodrigo.fuentes@realestate.cl',
      telefono: '+56 9 6666 7777'
    },
    inmobiliaria: {
      nombre: 'Inmobiliaria Valle Verde',
      logo: undefined
    }
  },
  {
    id: '3',
    tipo: 'visita',
    parcela: {
      id: 3,
      nombre: 'Parcela El Refugio',
      ubicacion: 'Curacaví, Región Metropolitana'
    },
    usuario: {
      nombre: 'Sofía Ramírez',
      email: 'sofia.ramirez@email.com',
      telefono: '+56 9 6543 2109'
    },
    fecha: '2026-04-07',
    hora: '11:30',
    estado: 'confirmada',
    notas: 'Cliente referido',
    broker: {
      nombre: 'Patricia Lagos',
      email: 'patricia.lagos@corredora.cl',
      telefono: '+56 9 5555 6666'
    },
    inmobiliaria: {
      nombre: 'Propiedades del Sur',
      logo: undefined
    }
  },
  {
    id: '4',
    tipo: 'videollamada',
    parcela: {
      id: 1,
      nombre: 'Parcela Vista al Valle',
      ubicacion: 'Valle Central, VI Región'
    },
    usuario: {
      nombre: 'Pedro Flores',
      email: 'pedro.flores@email.com',
      telefono: '+56 9 5432 1098'
    },
    fecha: '2026-04-08',
    hora: '16:00',
    estado: 'pendiente',
    notas: 'Consulta sobre financiamiento',
    broker: {
      nombre: 'Carolina Méndez',
      email: 'carolina.mendez@inmobiliaria.cl',
      telefono: '+56 9 7777 8888'
    },
    inmobiliaria: {
      nombre: 'Propiedades del Sur',
      logo: undefined
    }
  },
  {
    id: '5',
    tipo: 'whatsapp',
    parcela: {
      id: 2,
      nombre: 'Terreno Los Robles',
      ubicacion: 'Paine, Región Metropolitana'
    },
    usuario: {
      nombre: 'Ana Torres',
      email: 'ana.torres@email.com',
      telefono: '+56 9 4321 0987'
    },
    fechaContacto: '2026-04-02T09:30:00',
    notas: 'Consulta sobre disponibilidad',
    broker: {
      nombre: 'Rodrigo Fuentes',
      email: 'rodrigo.fuentes@realestate.cl',
      telefono: '+56 9 6666 7777'
    },
    inmobiliaria: {
      nombre: 'Inmobiliaria Valle Verde',
      logo: undefined
    }
  },
  {
    id: '6',
    tipo: 'whatsapp',
    parcela: {
      id: 3,
      nombre: 'Parcela El Refugio',
      ubicacion: 'Curacaví, Región Metropolitana'
    },
    usuario: {
      nombre: 'Roberto Silva',
      email: 'roberto.silva@email.com',
      telefono: '+56 9 3210 9876'
    },
    fechaContacto: '2026-04-01T14:20:00',
    notas: 'Pregunta sobre servicios básicos',
    broker: {
      nombre: 'Patricia Lagos',
      email: 'patricia.lagos@corredora.cl',
      telefono: '+56 9 5555 6666'
    },
    inmobiliaria: {
      nombre: 'Propiedades del Sur',
      logo: undefined
    }
  },
  {
    id: '7',
    tipo: 'visita',
    parcela: {
      id: 4,
      nombre: 'Parcela Cordillera',
      ubicacion: 'San José de Maipo, Región Metropolitana'
    },
    usuario: {
      nombre: 'Laura Campos',
      email: 'laura.campos@email.com',
      telefono: '+56 9 2109 8765'
    },
    fecha: '2026-04-10',
    hora: '09:00',
    estado: 'confirmada',
    notas: 'Cliente VIP',
    broker: {
      nombre: 'Andrés Morales',
      email: 'andres.morales@broker.cl',
      telefono: '+56 9 4444 5555'
    },
    inmobiliaria: {
      nombre: 'Inmobiliaria Cordillera',
      logo: undefined
    }
  },
  {
    id: '8',
    tipo: 'visita',
    parcela: {
      id: 5,
      nombre: 'Terreno Laguna Verde',
      ubicacion: 'Valparaíso, V Región'
    },
    usuario: {
      nombre: 'Jorge Mendoza',
      email: 'jorge.mendoza@email.com',
      telefono: '+56 9 1098 7654'
    },
    fecha: '2026-04-12',
    hora: '14:00',
    estado: 'pendiente',
    notas: 'Segunda visita al terreno',
    broker: {
      nombre: 'Verónica Castillo',
      email: 'veronica.castillo@coastal.cl',
      telefono: '+56 9 3333 4444'
    },
    inmobiliaria: {
      nombre: 'Coastal Properties',
      logo: undefined
    }
  }
];

export const ConsultasView: React.FC<ConsultasViewProps> = ({ viewType = 'personal' }) => {
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [selectedConsulta, setSelectedConsulta] = useState<Consulta | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filtros
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');
  const [filtroParcela, setFiltroParcela] = useState<string>('todas');

  // Para dashboard personal, filtrar solo la primera parcela (usuario solo tiene una)
  const consultasData = viewType === 'personal'
    ? mockConsultas.filter(c => c.parcela.id === 1)
    : mockConsultas;

  // Separar consultas con y sin fecha
  const consultasConFecha = consultasData.filter(c => c.fecha && c.hora);
  const consultasSinFecha = consultasData.filter(c => !c.fecha && c.fechaContacto);

  // Aplicar filtros
  const consultasConFechaFiltradas = consultasConFecha.filter(c => {
    if (filtroEstado !== 'todos' && c.estado !== filtroEstado) return false;
    if (filtroTipo !== 'todos' && c.tipo !== filtroTipo) return false;
    if (filtroParcela !== 'todas' && c.parcela.nombre !== filtroParcela) return false;
    return true;
  });

  const consultasSinFechaFiltradas = consultasSinFecha.filter(c => {
    if (filtroTipo !== 'todos' && c.tipo !== filtroTipo) return false;
    if (filtroParcela !== 'todas' && c.parcela.nombre !== filtroParcela) return false;
    return true;
  });

  // Obtener lista única de parcelas para el filtro
  const parcelas = Array.from(new Set(consultasData.map(c => c.parcela.nombre)));

  const handleConsultaClick = (consulta: Consulta) => {
    setSelectedConsulta(consulta);
  };

  const handleCloseDrawer = () => {
    setSelectedConsulta(null);
  };

  const handleConfirmar = (id: string) => {
    console.log('Confirmar consulta:', id);
    setSelectedConsulta(null);
  };

  const handleCancelar = (id: string) => {
    console.log('Cancelar consulta:', id);
    setSelectedConsulta(null);
  };

  const handleReprogramar = (id: string) => {
    console.log('Reprogramar consulta:', id);
    setSelectedConsulta(null);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="mb-2" style={{ color: '#0A0A0A' }}>Consultas</h1>
        <p style={{ color: '#6B7280', fontSize: '14px' }}>
          {viewType === 'personal'
            ? 'Gestiona todas las consultas sobre tu parcela'
            : 'Gestiona todas las consultas sobre tus parcelas'}
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        {/* View Mode Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('calendar')}
            className={`flex items-center gap-2 px-4 py-2 transition-colors ${
              viewMode === 'calendar'
                ? 'bg-[#124854] text-white'
                : 'bg-white text-[#0A0A0A] border border-[#DEDEDE] hover:bg-[#F5F5F5]'
            }`}
            style={{ fontSize: '14px', borderRadius: '8px' }}
          >
            <Calendar size={16} />
            <span>Calendario</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 px-4 py-2 transition-colors ${
              viewMode === 'list'
                ? 'bg-[#124854] text-white'
                : 'bg-white text-[#0A0A0A] border border-[#DEDEDE] hover:bg-[#F5F5F5]'
            }`}
            style={{ fontSize: '14px', borderRadius: '8px' }}
          >
            <List size={16} />
            <span>Lista</span>
          </button>
        </div>

        {/* Filters (solo para broker/inmobiliaria) */}
        {(viewType === 'broker' || viewType === 'inmobiliaria') && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white text-[#0A0A0A] border border-[#DEDEDE] hover:bg-[#F5F5F5] transition-colors"
              style={{ fontSize: '14px', borderRadius: '8px' }}
            >
              <Filter size={16} />
              <span>Filtros</span>
              <ChevronDown size={16} className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (viewType === 'broker' || viewType === 'inmobiliaria') && (
        <div className="bg-[#F9FAFB] p-4 mb-6 border border-[#DEDEDE]" style={{ borderRadius: '8px' }}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Filter by Estado */}
            <div>
              <label className="block mb-2" style={{ color: '#6B7280', fontSize: '12px' }}>
                Estado
              </label>
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#DEDEDE] text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#124854]"
                style={{ fontSize: '14px', borderRadius: '8px' }}
              >
                <option value="todos">Todos</option>
                <option value="pendiente">Pendiente</option>
                <option value="confirmada">Confirmada</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>

            {/* Filter by Tipo */}
            <div>
              <label className="block mb-2" style={{ color: '#6B7280', fontSize: '12px' }}>
                Tipo de consulta
              </label>
              <select
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#DEDEDE] text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#124854]"
                style={{ fontSize: '14px', borderRadius: '8px' }}
              >
                <option value="todos">Todos</option>
                <option value="visita">Visita</option>
                <option value="videollamada">Videollamada</option>
                <option value="whatsapp">WhatsApp</option>
              </select>
            </div>

            {/* Filter by Parcela */}
            <div>
              <label className="block mb-2" style={{ color: '#6B7280', fontSize: '12px' }}>
                Parcela
              </label>
              <select
                value={filtroParcela}
                onChange={(e) => setFiltroParcela(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#DEDEDE] text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#124854]"
                style={{ fontSize: '14px', borderRadius: '8px' }}
              >
                <option value="todas">Todas</option>
                {parcelas.map(parcela => (
                  <option key={parcela} value={parcela}>{parcela}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
        {/* Main Area - Calendar or List */}
        <div className="flex-1 overflow-hidden">
          {viewMode === 'calendar' ? (
            <ConsultasCalendar
              consultas={consultasConFechaFiltradas}
              onConsultaClick={handleConsultaClick}
            />
          ) : (
            <div className="h-full overflow-y-auto bg-white border border-[#DEDEDE] p-6" style={{ borderRadius: '8px' }}>
              <h3 className="mb-4" style={{ color: '#0A0A0A' }}>Todas las consultas</h3>
              <div className="space-y-4">
                {[...consultasConFechaFiltradas, ...consultasSinFechaFiltradas]
                  .sort((a, b) => {
                    const dateA = a.fecha ? new Date(a.fecha + 'T' + a.hora) : new Date(a.fechaContacto!);
                    const dateB = b.fecha ? new Date(b.fecha + 'T' + b.hora) : new Date(b.fechaContacto!);
                    return dateB.getTime() - dateA.getTime();
                  })
                  .map(consulta => (
                    <div
                      key={consulta.id}
                      onClick={() => handleConsultaClick(consulta)}
                      className="p-4 border border-[#DEDEDE] cursor-pointer hover:border-[#124854] transition-colors"
                      style={{ borderRadius: '8px' }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span style={{ color: '#0A0A0A', fontSize: '16px', fontWeight: 500 }}>
                              {consulta.parcela.nombre}
                            </span>
                            {consulta.estado && (
                              <span
                                className="px-2 py-0.5 text-white"
                                style={{
                                  fontSize: '12px',
                                  borderRadius: '4px',
                                  backgroundColor:
                                    consulta.estado === 'confirmada'
                                      ? '#647E3F'
                                      : consulta.estado === 'cancelada'
                                      ? '#DC2626'
                                      : '#6B7280'
                                }}
                              >
                                {consulta.estado === 'confirmada' ? 'Confirmada' : consulta.estado === 'cancelada' ? 'Cancelada' : 'Pendiente'}
                              </span>
                            )}
                          </div>
                          <p style={{ color: '#6B7280', fontSize: '14px' }}>
                            {consulta.usuario.nombre} • {consulta.tipo === 'visita' ? 'Visita' : consulta.tipo === 'videollamada' ? 'Videollamada' : 'WhatsApp'}
                          </p>
                          {consulta.fecha && consulta.hora && (
                            <p style={{ color: '#6B7280', fontSize: '14px' }}>
                              {new Date(consulta.fecha).toLocaleDateString('es-CL', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long'
                              })} a las {consulta.hora}
                            </p>
                          )}
                          {consulta.fechaContacto && (
                            <p style={{ color: '#6B7280', fontSize: '14px' }}>
                              {new Date(consulta.fechaContacto).toLocaleDateString('es-CL', {
                                day: 'numeric',
                                month: 'long',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          )}
                          {/* Información adicional según tipo de dashboard */}
                          {viewType === 'inmobiliaria' && consulta.broker && (
                            <p style={{ color: '#6B7280', fontSize: '13px', marginTop: '4px' }}>
                              Broker: {consulta.broker.nombre}
                            </p>
                          )}
                          {viewType === 'broker' && consulta.inmobiliaria && (
                            <p style={{ color: '#6B7280', fontSize: '13px', marginTop: '4px' }}>
                              Inmobiliaria: {consulta.inmobiliaria.nombre}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Consultas Recientes (solo en modo calendario) */}
        {viewMode === 'calendar' && (
          <div className="lg:w-96 flex-shrink-0">
            <ConsultasRecientes
              consultas={consultasSinFechaFiltradas}
              onConsultaClick={handleConsultaClick}
            />
          </div>
        )}
      </div>

      {/* Detail Drawer */}
      {selectedConsulta && (
        <ConsultaDetailDrawer
          consulta={selectedConsulta}
          viewType={viewType}
          onClose={handleCloseDrawer}
          onConfirmar={handleConfirmar}
          onCancelar={handleCancelar}
          onReprogramar={handleReprogramar}
        />
      )}
    </div>
  );
};
