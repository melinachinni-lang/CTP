import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Consulta } from './ConsultasView';

interface ConsultasCalendarProps {
  consultas: Consulta[];
  onConsultaClick: (consulta: Consulta) => void;
}

export const ConsultasCalendar: React.FC<ConsultasCalendarProps> = ({
  consultas,
  onConsultaClick
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');

  // Obtener el inicio de la semana (lunes)
  const getWeekStart = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  // Generar días de la semana
  const getWeekDays = () => {
    const weekStart = getWeekStart(currentDate);
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const weekDays = getWeekDays();

  // Navegar semanas
  const goToPrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Formatear fecha
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-CL', {
      day: 'numeric',
      month: 'short'
    });
  };

  const formatDayName = (date: Date) => {
    return date.toLocaleDateString('es-CL', {
      weekday: 'short'
    });
  };

  // Obtener consultas para un día específico
  const getConsultasForDay = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return consultas.filter(c => c.fecha === dateStr).sort((a, b) => {
      if (!a.hora || !b.hora) return 0;
      return a.hora.localeCompare(b.hora);
    });
  };

  // Generar horarios (8:00 - 20:00)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 20; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Obtener el color según el tipo de consulta
  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'visita':
        return '#006B4E'; // Primary
      case 'videollamada':
        return '#7D460D'; // Accent
      default:
        return '#6B7280'; // Gray
    }
  };

  // Obtener el color según el estado
  const getEstadoStyle = (estado?: string) => {
    switch (estado) {
      case 'confirmada':
        return { backgroundColor: '#647E3F', borderColor: '#647E3F' }; // Success
      case 'cancelada':
        return { backgroundColor: '#DC2626', borderColor: '#DC2626' }; // Error
      case 'pendiente':
        return { backgroundColor: '#6B7280', borderColor: '#6B7280' }; // Gray
      default:
        return { backgroundColor: '#6B7280', borderColor: '#6B7280' };
    }
  };

  // Determinar si es hoy
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="flex flex-col h-full bg-white border border-[#DEDEDE]" style={{ borderRadius: '8px' }}>
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#DEDEDE]">
        <div className="flex items-center gap-4">
          <h3 style={{ color: '#0A0A0A' }}>
            {weekDays[0].toLocaleDateString('es-CL', { month: 'long', year: 'numeric' })}
          </h3>
          <button
            onClick={goToToday}
            className="px-3 py-1.5 text-[#5D8B9D] border border-[#5D8B9D] hover:bg-[#5D8B9D] hover:text-white transition-colors"
            style={{ fontSize: '14px', borderRadius: '6px' }}
          >
            Hoy
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrevWeek}
            className="p-2 hover:bg-[#F5F5F5] transition-colors"
            style={{ borderRadius: '6px' }}
            aria-label="Semana anterior"
          >
            <ChevronLeft size={20} style={{ color: '#0A0A0A' }} />
          </button>
          <button
            onClick={goToNextWeek}
            className="p-2 hover:bg-[#F5F5F5] transition-colors"
            style={{ borderRadius: '6px' }}
            aria-label="Semana siguiente"
          >
            <ChevronRight size={20} style={{ color: '#0A0A0A' }} />
          </button>
        </div>
      </div>

      {/* Calendar Grid - Desktop */}
      <div className="hidden md:flex flex-col flex-1 overflow-hidden">
        {/* Days Header */}
        <div className="grid grid-cols-8 border-b border-[#DEDEDE]">
          <div className="p-3 border-r border-[#DEDEDE]" style={{ width: '80px' }}>
            {/* Time column header */}
          </div>
          {weekDays.map((day, index) => (
            <div
              key={index}
              className={`p-3 text-center border-r last:border-r-0 ${
                isToday(day) ? 'border-[#5D8B9D] border-2' : 'border-[#DEDEDE]'
              }`}
            >
              <div style={{ color: isToday(day) ? '#5D8B9D' : '#6B7280', fontSize: '12px', fontWeight: 500 }}>
                {formatDayName(day).toUpperCase()}
              </div>
              <div
                className={`mt-1 ${isToday(day) ? 'w-8 h-8 mx-auto flex items-center justify-center rounded-full bg-[#5D8B9D] text-white' : ''}`}
                style={{ color: isToday(day) ? '#FFFFFF' : '#0A0A0A', fontSize: '18px', fontWeight: 600 }}
              >
                {day.getDate()}
              </div>
            </div>
          ))}
        </div>

        {/* Time Grid */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-8">
            {/* Time Column */}
            <div style={{ width: '80px' }}>
              {timeSlots.map((time, index) => (
                <div
                  key={time}
                  className="p-2 pr-3 text-right border-b border-[#DEDEDE]"
                  style={{ height: '80px', color: '#6B7280', fontSize: '12px' }}
                >
                  {time}
                </div>
              ))}
            </div>

            {/* Day Columns */}
            {weekDays.map((day, dayIndex) => {
              const dayConsultas = getConsultasForDay(day);

              return (
                <div key={dayIndex} className="border-r border-[#DEDEDE] last:border-r-0">
                  {timeSlots.map((time, timeIndex) => {
                    // Encontrar consultas en este horario
                    const consultasEnHora = dayConsultas.filter(c => {
                      if (!c.hora) return false;
                      const consultaHour = parseInt(c.hora.split(':')[0]);
                      const slotHour = parseInt(time.split(':')[0]);
                      return consultaHour === slotHour;
                    });

                    return (
                      <div
                        key={time}
                        className={`relative border-b p-1 ${
                          isToday(day) ? 'border-l-2 border-r-2 border-l-[#5D8B9D] border-r-[#5D8B9D] border-b-[#DEDEDE]' : 'border-[#DEDEDE]'
                        }`}
                        style={{ height: '80px' }}
                      >
                        {consultasEnHora.map((consulta) => {
                          const estadoStyle = getEstadoStyle(consulta.estado);

                          return (
                            <button
                              key={consulta.id}
                              onClick={() => onConsultaClick(consulta)}
                              className="w-full text-left p-2 mb-1 last:mb-0 hover:opacity-90 transition-opacity"
                              style={{
                                ...estadoStyle,
                                borderRadius: '4px',
                                borderLeft: `3px solid ${getTipoColor(consulta.tipo)}`
                              }}
                            >
                              <div style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>
                                {consulta.hora}
                              </div>
                              <div style={{ color: '#FFFFFF', fontSize: '11px', marginTop: '2px' }} className="truncate">
                                {consulta.tipo === 'visita' ? '📍' : '📹'} {consulta.parcela.nombre}
                              </div>
                              <div style={{ color: '#FFFFFF', fontSize: '11px', opacity: 0.9 }} className="truncate">
                                {consulta.usuario.nombre}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Calendar List - Mobile */}
      <div className="md:hidden flex-1 overflow-y-auto">
        {weekDays.map((day, dayIndex) => {
          const dayConsultas = getConsultasForDay(day);

          return (
            <div key={dayIndex} className="border-b border-[#DEDEDE] last:border-b-0">
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className={`flex items-center justify-center w-10 h-10 ${
                      isToday(day) ? 'bg-[#5D8B9D] text-white' : 'bg-[#F5F5F5] text-[#0A0A0A]'
                    }`}
                    style={{ borderRadius: '8px', fontSize: '16px', fontWeight: 600 }}
                  >
                    {day.getDate()}
                  </div>
                  <div>
                    <div style={{ color: '#0A0A0A', fontSize: '14px', fontWeight: 500 }}>
                      {formatDayName(day)}
                    </div>
                    <div style={{ color: '#6B7280', fontSize: '12px' }}>
                      {day.toLocaleDateString('es-CL', { month: 'long' })}
                    </div>
                  </div>
                </div>

                {dayConsultas.length > 0 ? (
                  <div className="space-y-2">
                    {dayConsultas.map((consulta) => {
                      const estadoStyle = getEstadoStyle(consulta.estado);

                      return (
                        <button
                          key={consulta.id}
                          onClick={() => onConsultaClick(consulta)}
                          className="w-full text-left p-3 hover:opacity-90 transition-opacity"
                          style={{
                            ...estadoStyle,
                            borderRadius: '6px',
                            borderLeft: `3px solid ${getTipoColor(consulta.tipo)}`
                          }}
                        >
                          <div style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 600 }}>
                            {consulta.hora} • {consulta.tipo === 'visita' ? 'Visita' : 'Videollamada'}
                          </div>
                          <div style={{ color: '#FFFFFF', fontSize: '13px', marginTop: '4px' }}>
                            {consulta.parcela.nombre}
                          </div>
                          <div style={{ color: '#FFFFFF', fontSize: '12px', opacity: 0.9, marginTop: '2px' }}>
                            {consulta.usuario.nombre}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <p style={{ color: '#6B7280', fontSize: '13px' }}>
                    Sin consultas programadas
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 p-4 border-t border-[#DEDEDE] flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#5D8B9D]"></div>
          <span style={{ color: '#6B7280', fontSize: '12px' }}>Día actual</span>
        </div>
        <div className="w-px h-4 bg-[#DEDEDE]"></div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#006B4E]" style={{ borderRadius: '2px' }}></div>
          <span style={{ color: '#6B7280', fontSize: '12px' }}>Visita</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#7D460D]" style={{ borderRadius: '2px' }}></div>
          <span style={{ color: '#6B7280', fontSize: '12px' }}>Videollamada</span>
        </div>
        <div className="w-px h-4 bg-[#DEDEDE]"></div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#647E3F]" style={{ borderRadius: '2px' }}></div>
          <span style={{ color: '#6B7280', fontSize: '12px' }}>Confirmada</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#6B7280]" style={{ borderRadius: '2px' }}></div>
          <span style={{ color: '#6B7280', fontSize: '12px' }}>Pendiente</span>
        </div>
      </div>
    </div>
  );
};
