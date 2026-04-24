import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface PlanesModalProps {
  onClose: () => void;
  onNavigatePlanes: () => void;
}

const planes = [
  {
    nombre: 'Bronce',
    descripcion: 'Ideal para inmobiliarias que inician',
    precioMensual: 29900,
    precioAnual: 299000,
    destacado: false,
    caracteristicas: [
      'Hasta 10 parcelas publicadas',
      '2 publicaciones destacadas',
      'Visibilidad estándar',
      'Estadísticas básicas',
      'Soporte por email',
    ],
  },
  {
    nombre: 'Plata',
    descripcion: 'Para inmobiliarias en crecimiento',
    precioMensual: 69900,
    precioAnual: 699000,
    destacado: true,
    caracteristicas: [
      'Hasta 30 parcelas publicadas',
      '5 publicaciones destacadas',
      'Visibilidad alta',
      'Estadísticas avanzadas',
      'Soporte prioritario',
      'Panel de equipo y brokers',
    ],
  },
  {
    nombre: 'Oro',
    descripcion: 'Máxima exposición para empresas',
    precioMensual: 149900,
    precioAnual: 1499000,
    destacado: false,
    caracteristicas: [
      'Publicaciones ilimitadas',
      '15 publicaciones destacadas',
      'Visibilidad premium',
      'Estadísticas completas + exportación',
      'Soporte 24/7',
      'Panel completo de equipo y brokers',
      'Asesor comercial dedicado',
    ],
  },
];

const fmt = (n: number) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(n);

export function PlanesModal({ onClose, onNavigatePlanes }: PlanesModalProps) {
  const [periodo, setPeriodo] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--border)' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: '22px', color: '#0A0A0A' }}>
              Planes para inmobiliarias
            </h3>
            <p style={{ color: '#6B6B6B', fontSize: '14px', marginTop: '4px' }}>
              Elegí el plan que mejor se adapta a tu operación.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
            style={{ backgroundColor: '#F5F5F5' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E8E8E8'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F5F5F5'}
          >
            <X className="w-4 h-4" style={{ color: '#6B6B6B' }} />
          </button>
        </div>

        {/* Toggle mensual/anual */}
        <div className="flex justify-center pt-6 px-6">
          <div
            className="inline-flex rounded-full p-1"
            style={{ backgroundColor: '#F5F5F5', border: '1px solid var(--border)' }}
          >
            {(['monthly', 'annual'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriodo(p)}
                className="px-5 py-2 rounded-full transition-all text-sm"
                style={{
                  fontWeight: periodo === p ? 500 : 400,
                  backgroundColor: periodo === p ? '#FFFFFF' : 'transparent',
                  color: periodo === p ? '#0A0A0A' : '#6B6B6B',
                  boxShadow: periodo === p ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                {p === 'monthly' ? 'Mensual' : 'Anual'}
                {p === 'annual' && (
                  <span
                    className="ml-2 px-2 py-0.5 rounded-full text-xs"
                    style={{ backgroundColor: 'rgba(0,107,78,0.1)', color: '#006B4E', fontWeight: 600 }}
                  >
                    -15%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
          {planes.map((plan) => (
            <div
              key={plan.nombre}
              className="rounded-2xl p-5 flex flex-col"
              style={{
                border: plan.destacado ? '2px solid #006B4E' : '1px solid var(--border)',
                backgroundColor: plan.destacado ? 'rgba(0,107,78,0.03)' : '#FAFAFA',
                position: 'relative',
              }}
            >
              {plan.destacado && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: '#006B4E', color: '#FFFFFF', whiteSpace: 'nowrap' }}
                >
                  Más popular
                </div>
              )}
              <div className="mb-4">
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '18px', color: '#0A0A0A' }}>
                  {plan.nombre}
                </div>
                <div style={{ color: '#6B6B6B', fontSize: '13px', marginTop: '2px' }}>{plan.descripcion}</div>
              </div>
              <div className="mb-5">
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 300, fontSize: '28px', color: '#0A0A0A' }}>
                  {fmt(periodo === 'monthly' ? plan.precioMensual : Math.round(plan.precioAnual / 12))}
                </span>
                <span style={{ color: '#6B6B6B', fontSize: '13px' }}>/mes</span>
                {periodo === 'annual' && (
                  <div style={{ color: '#006B4E', fontSize: '12px', marginTop: '2px' }}>
                    {fmt(plan.precioAnual)} al año
                  </div>
                )}
              </div>
              <ul className="space-y-2 flex-grow mb-5">
                {plan.caracteristicas.map((c) => (
                  <li key={c} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: '#006B4E' }} />
                    <span style={{ fontSize: '13px', color: '#4B4B4B', lineHeight: '1.4' }}>{c}</span>
                  </li>
                ))}
              </ul>
              <button
                className="w-full h-10 rounded-[200px] text-sm font-medium transition-colors"
                style={{
                  backgroundColor: plan.destacado ? '#006B4E' : 'transparent',
                  color: plan.destacado ? '#FFFFFF' : '#0A0A0A',
                  border: plan.destacado ? 'none' : '1px solid #DEDEDE',
                }}
                onMouseEnter={(e) => {
                  if (plan.destacado) e.currentTarget.style.backgroundColor = '#01533E';
                  else { e.currentTarget.style.borderColor = '#006B4E'; e.currentTarget.style.color = '#006B4E'; }
                }}
                onMouseLeave={(e) => {
                  if (plan.destacado) e.currentTarget.style.backgroundColor = '#006B4E';
                  else { e.currentTarget.style.borderColor = '#DEDEDE'; e.currentTarget.style.color = '#0A0A0A'; }
                }}
              >
                Empezar con {plan.nombre}
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 text-center">
          <button
            onClick={() => { onClose(); onNavigatePlanes(); }}
            style={{ color: '#006B4E', fontSize: '14px', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}
            onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
            onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
          >
            Ver página completa de planes →
          </button>
        </div>
      </div>
    </div>
  );
}
