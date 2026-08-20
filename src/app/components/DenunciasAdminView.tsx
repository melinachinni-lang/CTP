import React, { useState } from 'react';
import { Flag, CheckCircle, XCircle, Clock, ChevronRight, X, AlertTriangle } from 'lucide-react';

type EstadoDenuncia = 'pendiente' | 'aprobada' | 'rechazada';

interface Denuncia {
  id: number;
  publicacion: string;
  inmobiliaria: string;
  tipo: string;
  denunciante: string;
  email: string;
  fecha: string;
  estado: EstadoDenuncia;
  descripcion: string;
}

const MOCK_DENUNCIAS: Denuncia[] = [
  { id: 1, publicacion: 'Parcela Vista al Lago', inmobiliaria: 'Inmobiliaria del Sur', tipo: 'Uso indebido de material gráfico', denunciante: 'Juan Pérez', email: 'juan@example.cl', fecha: '2026-08-18', estado: 'pendiente', descripcion: 'Las imágenes utilizadas corresponden a fotografías de mi propiedad publicadas sin autorización en otra plataforma.' },
  { id: 2, publicacion: 'Terreno Cordillera', inmobiliaria: 'CTP Propiedades', tipo: 'Uso indebido de material gráfico', denunciante: 'María López', email: 'maria@example.cl', fecha: '2026-08-17', estado: 'pendiente', descripcion: 'Las fotos fueron tomadas de mi portafolio fotográfico sin permiso ni crédito.' },
  { id: 3, publicacion: 'Parcela Agrícola Valle', inmobiliaria: 'Inmobiliaria del Sur', tipo: 'Uso indebido de material gráfico', denunciante: 'Carlos Rojas', email: 'carlos@example.cl', fecha: '2026-08-10', estado: 'aprobada', descripcion: 'Material gráfico utilizado sin licencia comercial.' },
  { id: 4, publicacion: 'Valle Verde Proyecto', inmobiliaria: 'CTP Propiedades', tipo: 'Uso indebido de material gráfico', denunciante: 'Ana Torres', email: 'ana@example.cl', fecha: '2026-08-08', estado: 'rechazada', descripcion: 'Las fotos son similares pero no son las mismas imágenes.' },
];

function formatFecha(fecha: string) {
  const [y, m, d] = fecha.split('-');
  const meses = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  return `${parseInt(d)} ${meses[parseInt(m)-1]} ${y}`;
}

const ESTADO_CFG = {
  pendiente: { label: 'Pendiente',  bg: '#FEF9C3', color: '#854D0E', border: '#FDE68A', icon: Clock },
  aprobada:  { label: 'Aprobada',   bg: '#DCFCE7', color: '#166534', border: '#86EFAC', icon: CheckCircle },
  rechazada: { label: 'Rechazada',  bg: '#FEE2E2', color: '#991B1B', border: '#FECACA', icon: XCircle },
};

export function DenunciasAdminView() {
  const [tab, setTab] = useState<EstadoDenuncia>('pendiente');
  const [selected, setSelected] = useState<Denuncia | null>(null);
  const [denuncias, setDenuncias] = useState(MOCK_DENUNCIAS);
  const [comentario, setComentario] = useState('');

  const filtradas = denuncias.filter(d => d.estado === tab);

  const handleAction = (id: number, action: 'aprobada' | 'rechazada') => {
    setDenuncias(prev => prev.map(d => d.id === id ? { ...d, estado: action } : d));
    setSelected(null);
    setComentario('');
  };

  return (
    <main className="px-6 py-6 space-y-6">
      <div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h2)', fontWeight: 'var(--font-weight-medium)', color: '#0A0A0A', lineHeight: 'var(--line-height-heading)' }}>
          Denuncias
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', color: '#6B6B6B', marginTop: '4px' }}>
          Revisión y resolución de denuncias por uso indebido de material gráfico
        </p>
      </div>

      {/* Tabs */}
      <div className="inline-flex bg-gray-100 rounded-full p-1 gap-1">
        {(['pendiente','aprobada','rechazada'] as EstadoDenuncia[]).map(t => {
          const count = denuncias.filter(d => d.estado === t).length;
          const isActive = tab === t;
          const cfg = ESTADO_CFG[t];
          return (
            <button key={t} onClick={() => setTab(t)}
              className="px-5 py-2 rounded-full text-sm transition-all duration-200"
              style={{ fontFamily: 'var(--font-body)', fontWeight: isActive ? 500 : 400, color: isActive ? '#0A0A0A' : '#6B6B6B', backgroundColor: isActive ? '#FFFFFF' : 'transparent', boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}
            >
              {cfg.label}
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-xs"
                style={{ backgroundColor: isActive ? cfg.bg : '#E5E5E5', color: isActive ? cfg.color : '#9CA3AF', fontWeight: 500 }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tabla */}
      <section className="bg-white border-2 border-gray-200 rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                {['Publicación','Inmobiliaria','Denunciante','Fecha','Estado',''].map(h => (
                  <th key={h} className="px-6 py-4 text-left" style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, color: '#0A0A0A' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-gray-200">
              {filtradas.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center" style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#9CA3AF' }}>
                    No hay denuncias {tab === 'pendiente' ? 'pendientes' : tab === 'aprobada' ? 'aprobadas' : 'rechazadas'}
                  </td>
                </tr>
              ) : filtradas.map(d => {
                const cfg = ESTADO_CFG[d.estado];
                const Icon = cfg.icon;
                return (
                  <tr key={d.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => { setSelected(d); setComentario(''); }}>
                    <td className="px-6 py-4">
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#0A0A0A' }}>{d.publicacion}</div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>{d.tipo}</div>
                    </td>
                    <td className="px-6 py-4" style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#374151' }}>{d.inmobiliaria}</td>
                    <td className="px-6 py-4">
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#0A0A0A' }}>{d.denunciante}</div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>{d.email}</div>
                    </td>
                    <td className="px-6 py-4" style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#374151' }}>{formatFecha(d.fecha)}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`, fontFamily: 'var(--font-body)' }}>
                        <Icon className="w-3 h-3" />{cfg.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ChevronRight className="w-4 h-4 ml-auto" style={{ color: '#9CA3AF' }} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl overflow-y-auto flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 600, color: '#0A0A0A' }}>Detalle de denuncia</h2>
              <button onClick={() => setSelected(null)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5" style={{ color: '#6B7280' }} />
              </button>
            </div>

            <div className="p-6 space-y-6 flex-1">
              {(() => { const cfg = ESTADO_CFG[selected.estado]; const Icon = cfg.icon; return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
                  style={{ backgroundColor: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`, fontFamily: 'var(--font-body)' }}>
                  <Icon className="w-3.5 h-3.5" />{cfg.label}
                </span>
              ); })()}

              <div className="space-y-1">
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: '#737373', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Publicación denunciada</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 600, color: '#0A0A0A' }}>{selected.publicacion}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#737373' }}>{selected.inmobiliaria}</p>
              </div>

              <div className="p-4 rounded-xl" style={{ backgroundColor: '#FFFBEB', border: '1px solid #FDE68A' }}>
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-4 h-4" style={{ color: '#D97706' }} />
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: '#92400E' }}>Motivo</p>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#92400E' }}>{selected.tipo}</p>
              </div>

              <div className="space-y-1">
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: '#737373', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Denunciante</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, color: '#0A0A0A' }}>{selected.denunciante}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#737373' }}>{selected.email}</p>
              </div>

              <div className="space-y-2">
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: '#737373', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Descripción</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#374151', lineHeight: 1.6 }}>{selected.descripcion}</p>
              </div>

              <div className="space-y-1">
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: '#737373', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Fecha</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#0A0A0A' }}>{formatFecha(selected.fecha)}</p>
              </div>

              {selected.estado === 'pendiente' && (
                <div className="space-y-2">
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: '#737373', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Comentario (opcional)</p>
                  <textarea value={comentario} onChange={e => setComentario(e.target.value)} rows={3}
                    placeholder="Ej: Se verificó que las imágenes corresponden al material denunciado."
                    className="w-full px-4 py-3 rounded-xl text-sm resize-none"
                    style={{ border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA', color: '#0A0A0A', outline: 'none', fontFamily: 'var(--font-body)', lineHeight: 1.5 }}
                    onFocus={e => e.target.style.borderColor = '#006B4E'}
                    onBlur={e => e.target.style.borderColor = '#E5E5E5'}
                  />
                </div>
              )}
            </div>

            {selected.estado === 'pendiente' && (
              <div className="p-6 border-t border-gray-100 flex gap-3">
                <button onClick={() => handleAction(selected.id, 'rechazada')}
                  className="flex-1 py-3 rounded-full text-sm font-medium transition-all"
                  style={{ backgroundColor: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', fontFamily: 'var(--font-body)' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FEE2E2'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FEF2F2'}>
                  Rechazar
                </button>
                <button onClick={() => handleAction(selected.id, 'aprobada')}
                  className="flex-1 py-3 rounded-full text-sm font-semibold transition-all"
                  style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#01533E'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#006B4E'}>
                  Aprobar denuncia
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
