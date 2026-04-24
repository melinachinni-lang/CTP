import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface BudgetCalculatorProps {
  onNavigate: (screen: string) => void;
}

export function BudgetCalculator({ onNavigate }: BudgetCalculatorProps) {
  const [budget, setBudget] = useState('');
  const [calcZone, setCalcZone] = useState('');
  const [calcParcelType, setCalcParcelType] = useState('');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);

  // Cerrar dropdown cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const calculateMonthlyPayment = () => {
    if (!budget) return 0;
    const budgetValue = parseFloat(budget);
    const monthlyRate = 0.05 / 12; // 5% annual rate
    const months = 240; // 20 years
    const payment = budgetValue * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return payment;
  };

  return (
    <div className="mb-12 bg-white border-2 border-gray-300 p-3 shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-[200px]">
      <div className="grid grid-cols-12 gap-6 items-center pt-[0px] pr-[16px] pb-[0px] pl-[0px]">
        {/* Ícono de calculadora/simulación */}
        <div className="col-span-1 flex justify-center">
          <button
            onClick={() => setIsBudgetModalOpen(true)}
            className="flex-shrink-0 w-12 h-12 bg-gray-100 border-2 border-gray-300 rounded-full flex items-center justify-center group relative cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:bg-gray-200"
            title="Calcula qué parcelas se ajustan a tu presupuesto"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            {/* Tooltip discreto desde abajo */}
            <div className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-2 px-3 rounded opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-y-1 whitespace-nowrap pointer-events-none z-10 shadow-lg">
              Calcula qué parcelas se ajustan a tu presupuesto
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-0">
                <div className="border-4 border-transparent border-b-black"></div>
              </div>
            </div>
          </button>
        </div>

        {/* Campos interactivos */}
        <div className="col-span-9">
          <div className="grid grid-cols-4 gap-5">
            {/* Campo de Presupuesto */}
            <button
              onClick={() => setIsBudgetModalOpen(true)}
              className="space-y-1 text-left hover:bg-gray-50 rounded-lg p-2 transition-colors"
            >
              <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Presupuesto
              </div>
              <div className="text-sm font-medium" style={{ color: budget ? '#0A0A0A' : '#a1a1a1' }}>
                {budget ? formatCurrency(parseFloat(budget)) : '--'}
              </div>
            </button>

            {/* Campo de Cuota aproximada */}
            <button
              onClick={() => setIsBudgetModalOpen(true)}
              className="space-y-1 text-left hover:bg-gray-50 rounded-lg p-2 transition-colors"
            >
              <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Cuota aproximada
              </div>
              <div className="text-sm font-medium" style={{ color: budget ? '#0A0A0A' : '#a1a1a1' }}>
                {budget ? formatCurrency(calculateMonthlyPayment()) : '--'}
              </div>
            </button>

            {/* Campo de Zona */}
            <div className="dropdown-container relative space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Zona
              </div>
              <button
                onClick={() => setOpenDropdown(openDropdown === 'calcZone' ? null : 'calcZone')}
                className="w-full text-left text-sm font-medium hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors flex items-center justify-between"
                style={{ color: calcZone ? '#0A0A0A' : '#a1a1a1' }}
              >
                <span className="whitespace-nowrap">{calcZone || '--'}</span>
                <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
              </button>
              {openDropdown === 'calcZone' && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  {['Valle del Aconcagua', 'Valle de Casablanca', 'Cordillera de Los Andes', 'Litoral Central', 'Valle Central'].map((zona) => (
                    <button
                      key={zona}
                      onClick={() => {
                        setCalcZone(zona);
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm transition-colors whitespace-nowrap"
                      style={{ color: '#0A0A0A' }}
                    >
                      {zona}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Campo de Tipo de parcela */}
            <div className="dropdown-container relative space-y-1">
              <div className="text-xs font-medium text-gray-500">
                Tipo de parcela
              </div>
              <button
                onClick={() => setOpenDropdown(openDropdown === 'calcParcelType' ? null : 'calcParcelType')}
                className="w-full text-left text-sm font-medium hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors flex items-center justify-between"
                style={{ color: calcParcelType ? '#0A0A0A' : '#a1a1a1' }}
              >
                <span className="whitespace-nowrap">{calcParcelType || '--'}</span>
                <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
              </button>
              {openDropdown === 'calcParcelType' && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  {['Agrícola', 'Agrado/Residencial', 'Forestal', 'Mixta'].map((tipo) => (
                    <button
                      key={tipo}
                      onClick={() => {
                        setCalcParcelType(tipo);
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm transition-colors whitespace-nowrap"
                      style={{ color: '#0A0A0A' }}
                    >
                      {tipo}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="col-span-2 flex flex-col items-stretch gap-1">
          <button 
            onClick={() => onNavigate('entry')}
            style={{ backgroundColor: '#006B4E' }}
            className="w-full text-white px-4 py-2 text-base leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center"
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#01533E'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
}
