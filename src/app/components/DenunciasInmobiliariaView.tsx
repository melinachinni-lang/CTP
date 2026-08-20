import React from 'react';
import { Flag, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';

type EstadoDenuncia = 'pendiente' | 'aprobada' | 'rechazada';

interface DenunciaInmo {
  id: number;
  publicacion: string;
  fecha: string;
  estado: EstadoDenuncia;
  descripcion: string;
  resultado?: string;
}

const MOCK: DenunciaInmo[] = [
  {
    id: 1,
    publicacion: 'Parcela Vista al Lago con acceso pavimentado',
    fecha: '2026-08-18',
    estado: 'pendiente',
    descripcion: 'Un usuario ha reportado que las imágenes de esta publicación fueron utilizadas sin autorización.',
  },
  {
    id: 3,
    publicacion: 'Parcela Agrícola Valle',
    fecha: '2026-08-10',
    estado: 'aprobada',
    descripcion: 'Se verificó el uso de material gráfico sin licencia comercial.',
    resultado: 'La denuncia fue aprobada. Te recomendamos actualizar las imágenes de esta publicación para evitar futuros reclamos.',
  },
];

function formatFecha(fecha: string) {
  const [y, m, d] = fecha.split('-');
  const meses = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  return `${parseInt(d)} ${meses[parseInt(m)-1]} ${y}`;
}

const ESTADO_CFG = {
  pendiente: { label: 'En revisión',         bg: '#FEF9C3', color: '#854D0E', border: '#FDE68A', icon: Clock,        desc: 'Nuestro equipo está revisando esta denuncia. Te notificaremos cuando haya una resolución.' },
  aprobada:  { label: 'Denuncia válida',      bg: '#FEE2E2', color: '#991B1B', border: '#FECACA', icon: XCircle,      desc: '' },
  rechazada: { label: 'Denuncia rechazada',   bg: '#DCFCE7', color: '#166534', border: '#86EFAC', icon: CheckCircle,  desc: 'La denuncia fue revisada y no se encontraron irregularidades en tu publicación.' },
};

export function DenunciasInmobiliariaView() {
  const pendientes = MOCK.filter(d => d.estado === 'pendiente').length;

  return (
    <main className="px-6 py-6 space-y-6">
      <div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h2)', fontWeight: 'var(--font-weight-medium)', color: '#0A0A0A', lineHeight: 'var(--line-height-heading)' }}>
          Denuncias
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', color: '#6B6B6B', marginTop: '4px' }}>
          Denuncias recibidas sobre tus publicaciones y su estado de revisión
        </p>
      </div>

      {/* Aviso si hay pendientes */}
      {pendientes > 0 && (
        <div className="flex items-start gap-3 p-4 rounded-xl" style={{ backgroundColor: '#FFFBEB', border: '1px solid #FDE68A' }}>
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#D97706' }} />
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#92400E' }}>
              {pendientes === 1 ? 'Tienes 1 denuncia en revisión' : `Tienes ${pendientes} denuncias en revisión`}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#92400E', marginTop: '2px' }}>
              Nuestro equipo está revisando la información. Te notificaremos con el resultado.
            </p>
          </div>
        </div>
      )}

      {MOCK.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#F3F4F6' }}>
            <Flag className="w-6 h-6" style={{ color: '#D1D5DB' }} />
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '15px', color: '#374151' }}>Sin denuncias</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#9CA3AF', marginTop: '4px' }}>
            No tienes denuncias registradas sobre tus publicaciones.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {MOCK.map(d => {
            const cfg = ESTADO_CFG[d.estado];
            const Icon = cfg.icon;
            return (
              <div key={d.id} className="bg-white rounded-2xl p-6 space-y-4" style={{ border: '1.5px solid #E5E5E5' }}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 600, color: '#0A0A0A' }}>{d.publicacion}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#9CA3AF', marginTop: '2px' }}>Denunciada el {formatFecha(d.fecha)}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium flex-shrink-0"
                    style={{ backgroundColor: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`, fontFamily: 'var(--font-body)' }}>
                    <Icon className="w-3 h-3" />{cfg.label}
                  </span>
                </div>

                <div className="p-4 rounded-xl" style={{ backgroundColor: '#FFFBEB', border: '1px solid #FDE68A' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="w-3.5 h-3.5" style={{ color: '#D97706' }} />
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: '#92400E' }}>
                      Uso indebido de material gráfico
                    </p>
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#92400E' }}>{d.descripcion}</p>
                </div>

                {d.resultado && (
                  <div className="p-4 rounded-xl" style={{ backgroundColor: cfg.bg, border: `1px solid ${cfg.border}` }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: cfg.color }}>{d.resultado}</p>
                  </div>
                )}

                {d.estado === 'pendiente' && (
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#9CA3AF' }}>{cfg.desc}</p>
                )}

                {d.estado === 'rechazada' && (
                  <div className="p-4 rounded-xl" style={{ backgroundColor: cfg.bg, border: `1px solid ${cfg.border}` }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: cfg.color }}>{cfg.desc}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
