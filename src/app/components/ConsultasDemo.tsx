import React, { useState } from 'react';
import { ConsultasView } from './ConsultasView';

/**
 * Componente de demostración para visualizar las diferentes vistas de Consultas
 * según el tipo de dashboard (personal, broker, inmobiliaria)
 */
export const ConsultasDemo: React.FC = () => {
  const [activeView, setActiveView] = useState<'personal' | 'broker' | 'inmobiliaria'>('personal');

  return (
    <div className="flex flex-col h-screen bg-[#F9FAFB]">
      {/* Demo Header */}
      <div className="bg-white border-b border-[#DEDEDE] p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="mb-2" style={{ color: '#0A0A0A', fontSize: '24px', fontWeight: 600 }}>
            Demo: Vista de Consultas
          </h1>
          <p style={{ color: '#6B7280', fontSize: '14px', marginBottom: '16px' }}>
            Visualiza cómo se adapta la vista de consultas según el tipo de dashboard
          </p>

          {/* View Selector */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveView('personal')}
              className={`px-4 py-2 transition-colors ${
                activeView === 'personal'
                  ? 'bg-[#124854] text-white'
                  : 'bg-white text-[#0A0A0A] border border-[#DEDEDE] hover:bg-[#F5F5F5]'
              }`}
              style={{ fontSize: '14px', borderRadius: '8px', fontWeight: 500 }}
            >
              Dashboard Personal
            </button>
            <button
              onClick={() => setActiveView('inmobiliaria')}
              className={`px-4 py-2 transition-colors ${
                activeView === 'inmobiliaria'
                  ? 'bg-[#124854] text-white'
                  : 'bg-white text-[#0A0A0A] border border-[#DEDEDE] hover:bg-[#F5F5F5]'
              }`}
              style={{ fontSize: '14px', borderRadius: '8px', fontWeight: 500 }}
            >
              Dashboard Inmobiliaria
            </button>
            <button
              onClick={() => setActiveView('broker')}
              className={`px-4 py-2 transition-colors ${
                activeView === 'broker'
                  ? 'bg-[#124854] text-white'
                  : 'bg-white text-[#0A0A0A] border border-[#DEDEDE] hover:bg-[#F5F5F5]'
              }`}
              style={{ fontSize: '14px', borderRadius: '8px', fontWeight: 500 }}
            >
              Dashboard Broker
            </button>
          </div>

          {/* Info about current view */}
          <div className="mt-4 p-3 bg-[#F0F9FF] border border-[#BAE6FD]" style={{ borderRadius: '6px' }}>
            <p style={{ color: '#0369A1', fontSize: '13px', lineHeight: '1.5' }}>
              {activeView === 'personal' && (
                <>
                  <strong>Dashboard Personal:</strong> Muestra consultas de una sola parcela. Sin filtros de parcela. Sin información de broker/inmobiliaria.
                </>
              )}
              {activeView === 'inmobiliaria' && (
                <>
                  <strong>Dashboard Inmobiliaria:</strong> Muestra todas las consultas del portafolio con información del broker asignado a cada consulta. Incluye filtros por parcela.
                </>
              )}
              {activeView === 'broker' && (
                <>
                  <strong>Dashboard Broker:</strong> Muestra consultas de parcelas gestionadas con información de la inmobiliaria propietaria. Incluye filtros por parcela.
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Demo Content */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-7xl mx-auto h-full p-6">
          <ConsultasView viewType={activeView} />
        </div>
      </div>
    </div>
  );
};
