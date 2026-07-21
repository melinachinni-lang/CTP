import React, { useState } from 'react';
import { Download, ChevronDown } from 'lucide-react';

const MESES = [
  'Enero 2026', 'Febrero 2026', 'Marzo 2026', 'Abril 2026',
  'Mayo 2026', 'Junio 2026', 'Julio 2026',
];

interface FilaPago {
  inmobiliaria: string;
  reservas: number;
  monto: number;
}

const DATOS: Record<string, FilaPago[]> = {
  'Enero 2026': [
    { inmobiliaria: 'Inmobiliaria Sol del Sur',   reservas: 14, monto: 7000000 },
    { inmobiliaria: 'Constructora Patagonia',      reservas: 9,  monto: 4500000 },
    { inmobiliaria: 'Inmobiliaria Valle Verde',    reservas: 6,  monto: 3000000 },
    { inmobiliaria: 'Grupo Raíces SpA',            reservas: 4,  monto: 2000000 },
    { inmobiliaria: 'Tierras del Sur Limitada',    reservas: 2,  monto: 1000000 },
  ],
  'Febrero 2026': [
    { inmobiliaria: 'Inmobiliaria Sol del Sur',   reservas: 11, monto: 5500000 },
    { inmobiliaria: 'Constructora Patagonia',      reservas: 7,  monto: 3500000 },
    { inmobiliaria: 'Inmobiliaria Valle Verde',    reservas: 5,  monto: 2500000 },
    { inmobiliaria: 'Grupo Raíces SpA',            reservas: 3,  monto: 1500000 },
    { inmobiliaria: 'Tierras del Sur Limitada',    reservas: 1,  monto: 500000  },
  ],
  'Marzo 2026': [
    { inmobiliaria: 'Inmobiliaria Sol del Sur',   reservas: 18, monto: 9000000 },
    { inmobiliaria: 'Constructora Patagonia',      reservas: 12, monto: 6000000 },
    { inmobiliaria: 'Inmobiliaria Valle Verde',    reservas: 8,  monto: 4000000 },
    { inmobiliaria: 'Grupo Raíces SpA',            reservas: 5,  monto: 2500000 },
    { inmobiliaria: 'Tierras del Sur Limitada',    reservas: 3,  monto: 1500000 },
  ],
  'Abril 2026': [
    { inmobiliaria: 'Inmobiliaria Sol del Sur',   reservas: 10, monto: 5000000 },
    { inmobiliaria: 'Constructora Patagonia',      reservas: 8,  monto: 4000000 },
    { inmobiliaria: 'Inmobiliaria Valle Verde',    reservas: 4,  monto: 2000000 },
    { inmobiliaria: 'Grupo Raíces SpA',            reservas: 6,  monto: 3000000 },
    { inmobiliaria: 'Tierras del Sur Limitada',    reservas: 2,  monto: 1000000 },
  ],
  'Mayo 2026': [
    { inmobiliaria: 'Inmobiliaria Sol del Sur',   reservas: 13, monto: 6500000 },
    { inmobiliaria: 'Constructora Patagonia',      reservas: 10, monto: 5000000 },
    { inmobiliaria: 'Inmobiliaria Valle Verde',    reservas: 7,  monto: 3500000 },
    { inmobiliaria: 'Grupo Raíces SpA',            reservas: 4,  monto: 2000000 },
    { inmobiliaria: 'Tierras del Sur Limitada',    reservas: 3,  monto: 1500000 },
  ],
  'Junio 2026': [
    { inmobiliaria: 'Inmobiliaria Sol del Sur',   reservas: 16, monto: 8000000 },
    { inmobiliaria: 'Constructora Patagonia',      reservas: 11, monto: 5500000 },
    { inmobiliaria: 'Inmobiliaria Valle Verde',    reservas: 9,  monto: 4500000 },
    { inmobiliaria: 'Grupo Raíces SpA',            reservas: 5,  monto: 2500000 },
    { inmobiliaria: 'Tierras del Sur Limitada',    reservas: 4,  monto: 2000000 },
  ],
  'Julio 2026': [
    { inmobiliaria: 'Inmobiliaria Sol del Sur',   reservas: 12, monto: 6000000 },
    { inmobiliaria: 'Constructora Patagonia',      reservas: 8,  monto: 4000000 },
    { inmobiliaria: 'Inmobiliaria Valle Verde',    reservas: 5,  monto: 2500000 },
    { inmobiliaria: 'Grupo Raíces SpA',            reservas: 3,  monto: 1500000 },
    { inmobiliaria: 'Tierras del Sur Limitada',    reservas: 2,  monto: 1000000 },
  ],
};

function formatCLP(n: number) {
  return '$' + n.toLocaleString('es-CL');
}

export function PagosInmobiliariasAdminView() {
  const [mesSeleccionado, setMesSeleccionado] = useState('Julio 2026');
  const [mesOpen, setMesOpen] = useState(false);

  const filas = DATOS[mesSeleccionado] ?? [];
  const totalReservas = filas.reduce((s, f) => s + f.reservas, 0);
  const totalMonto = filas.reduce((s, f) => s + f.monto, 0);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h3)', fontWeight: 500, color: '#0A0A0A', marginBottom: '4px' }}>
            Pagos a inmobiliarias
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>
            Reservas confirmadas y montos a liquidar por inmobiliaria.
          </p>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-3">
          {/* Selector de mes */}
          <div className="relative">
            <button
              onClick={() => setMesOpen(prev => !prev)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors"
              style={{ border: '1px solid #E5E5E5', backgroundColor: '#FFFFFF', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#374151' }}
            >
              {mesSeleccionado}
              <ChevronDown className="w-4 h-4" style={{ color: '#9CA3AF' }} />
            </button>
            {mesOpen && (
              <div className="absolute right-0 top-full mt-1 z-20 rounded-xl shadow-lg overflow-hidden"
                style={{ border: '1px solid #E5E5E5', backgroundColor: '#FFFFFF', minWidth: '160px' }}>
                {MESES.map(mes => (
                  <button
                    key={mes}
                    onClick={() => { setMesSeleccionado(mes); setMesOpen(false); }}
                    className="w-full text-left px-4 py-2.5 transition-colors"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: mes === mesSeleccionado ? '#006B4E' : '#374151',
                      backgroundColor: mes === mesSeleccionado ? '#F0FDF4' : '#FFFFFF',
                      fontWeight: mes === mesSeleccionado ? 600 : 400,
                    }}
                    onMouseEnter={e => { if (mes !== mesSeleccionado) e.currentTarget.style.backgroundColor = '#F9FAFB'; }}
                    onMouseLeave={e => { if (mes !== mesSeleccionado) e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
                  >
                    {mes}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Exportar */}
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors"
            style={{ border: '1px solid #E5E5E5', backgroundColor: '#FFFFFF', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#374151' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F9FAFB'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}
          >
            <Download className="w-4 h-4" style={{ color: '#6B7280' }} />
            Exportar
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #E5E5E5' }}>
        {/* Cabecera */}
        <div className="grid px-6 py-3" style={{ gridTemplateColumns: '1fr 160px 200px', backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E5E5' }}>
          {['INMOBILIARIA', 'RESERVAS', 'MONTO TOTAL'].map(col => (
            <p key={col} style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {col}
            </p>
          ))}
        </div>

        {/* Filas */}
        {filas.map((fila, i) => (
          <div
            key={fila.inmobiliaria}
            className="grid px-6 py-4 items-center"
            style={{
              gridTemplateColumns: '1fr 160px 200px',
              borderBottom: i < filas.length - 1 ? '1px solid #F3F4F6' : 'none',
              backgroundColor: '#FFFFFF',
            }}
          >
            {/* Inmobiliaria */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, color: '#006B4E' }}>
                  {fila.inmobiliaria.charAt(0)}
                </span>
              </div>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#0A0A0A' }}>
                {fila.inmobiliaria}
              </span>
            </div>

            {/* Reservas */}
            <div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full"
                style={{ backgroundColor: '#EFF6FF', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#1E40AF' }}>
                {fila.reservas} reserva{fila.reservas !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Monto */}
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 700, color: '#006B4E' }}>
              {formatCLP(fila.monto)}
            </span>
          </div>
        ))}

        {/* Fila de totales */}
        <div className="grid px-6 py-4 items-center" style={{ gridTemplateColumns: '1fr 160px 200px', backgroundColor: '#F9FAFB', borderTop: '2px solid #E5E5E5' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 700, color: '#0A0A0A' }}>
            Total {mesSeleccionado}
          </span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 700, color: '#0A0A0A' }}>
            {totalReservas} reservas
          </span>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-body-lg)', fontWeight: 700, color: '#006B4E' }}>
            {formatCLP(totalMonto)}
          </span>
        </div>
      </div>
    </div>
  );
}
