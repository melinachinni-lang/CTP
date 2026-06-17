import React, { useState } from 'react';
import { X, Check, Paperclip, Lightbulb, AlertCircle, ChevronRight } from 'lucide-react';

type TipoFeedback = 'sugerencia' | 'error' | 'otro';

export function SugerenciasButton() {
  const [open, setOpen] = useState(false);
  const [tipo, setTipo] = useState<TipoFeedback>('sugerencia');
  const [descripcion, setDescripcion] = useState('');
  const [adjunto, setAdjunto] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const tipoConfig: Record<TipoFeedback, { label: string; icon: React.ReactNode; color: string; bg: string; border: string }> = {
    sugerencia: {
      label: 'Sugerencia',
      icon: <Lightbulb className="w-4 h-4" />,
      color: '#1D4ED8',
      bg: '#EFF6FF',
      border: '#BFDBFE',
    },
    error: {
      label: 'Reporte de error',
      icon: <AlertCircle className="w-4 h-4" />,
      color: '#DC2626',
      bg: '#FEF2F2',
      border: '#FECACA',
    },
    otro: {
      label: 'Otro',
      icon: <ChevronRight className="w-4 h-4" />,
      color: '#374151',
      bg: '#F9FAFB',
      border: '#E5E7EB',
    },
  };

  const handleSend = () => {
    if (!descripcion.trim()) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setOpen(false);
      setDescripcion('');
      setAdjunto(null);
      setTipo('sugerencia');
    }, 2000);
  };

  const handleClose = () => {
    setOpen(false);
    setDescripcion('');
    setAdjunto(null);
    setTipo('sugerencia');
    setSent(false);
  };

  return (
    <>
      {/* Sidebar button */}
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all"
        style={{
          color: 'rgba(255,255,255,0.55)',
          backgroundColor: 'transparent',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-body-sm)',
          border: '1px solid rgba(255,255,255,0.12)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.07)';
          e.currentTarget.style.color = 'rgba(255,255,255,0.85)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = 'rgba(255,255,255,0.55)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
        }}
      >
        <Lightbulb className="w-4 h-4 flex-shrink-0" />
        <span>Sugerencias</span>
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
          onClick={e => { if (e.target === e.currentTarget) handleClose(); }}
        >
          <div className="bg-white rounded-2xl w-full max-w-md mx-4 overflow-hidden shadow-2xl" style={{ border: '1px solid #E5E5E5' }}>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: '1px solid #F0F0F0' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h4)', fontWeight: 500, color: '#0A0A0A' }}>
                  Dejanos tu feedback
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>
                  Tu opinión nos ayuda a mejorar la plataforma
                </p>
              </div>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-lg transition-colors"
                style={{ color: '#9CA3AF' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F3F4F6'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {sent ? (
              /* Success state */
              <div className="flex flex-col items-center justify-center py-14 px-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#DCFCE7' }}>
                  <Check className="w-8 h-8" style={{ color: '#166534' }} />
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h4)', fontWeight: 500, color: '#0A0A0A', marginBottom: '6px' }}>
                    ¡Gracias por tu feedback!
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#6B7280' }}>
                    Tu mensaje fue enviado al equipo de CTP.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-6 space-y-5">
                {/* Selector de tipo */}
                <div>
                  <p className="mb-3" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151' }}>
                    ¿Qué tipo de feedback es?
                  </p>
                  <div className="flex gap-2">
                    {(Object.entries(tipoConfig) as [TipoFeedback, typeof tipoConfig['sugerencia']][]).map(([key, cfg]) => (
                      <button
                        key={key}
                        onClick={() => setTipo(key)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-medium transition-all"
                        style={{
                          border: `1.5px solid ${tipo === key ? cfg.border : '#E5E5E5'}`,
                          backgroundColor: tipo === key ? cfg.bg : '#FAFAFA',
                          color: tipo === key ? cfg.color : '#6B7280',
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        {cfg.icon}
                        {cfg.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Descripción */}
                <div>
                  <label className="block mb-2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151' }}>
                    Descripción <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                    placeholder={
                      tipo === 'sugerencia'
                        ? 'Contanos tu idea o mejora...'
                        : tipo === 'error'
                        ? 'Describí el error que encontraste, qué hiciste antes de que ocurra...'
                        : 'Escribí tu mensaje...'
                    }
                    className="w-full px-4 py-3 rounded-xl text-sm resize-none transition-colors"
                    style={{
                      border: '1.5px solid #E5E5E5',
                      fontFamily: 'var(--font-body)',
                      color: '#0A0A0A',
                      outline: 'none',
                      backgroundColor: '#FAFAFA',
                      lineHeight: '1.6',
                    }}
                    onFocus={e => e.target.style.borderColor = '#006B4E'}
                    onBlur={e => e.target.style.borderColor = '#E5E5E5'}
                  />
                  <p className="mt-1 text-right" style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF' }}>
                    {descripcion.length}/500
                  </p>
                </div>

                {/* Adjuntar evidencia */}
                <div>
                  <p className="mb-2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151' }}>
                    Adjuntar evidencia <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF', fontWeight: 400 }}>(opcional)</span>
                  </p>
                  {adjunto ? (
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ border: '1.5px solid #BBF7D0', backgroundColor: '#F0FDF4' }}>
                      <Paperclip className="w-4 h-4 flex-shrink-0" style={{ color: '#166534' }} />
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#166534', flex: 1 }}>{adjunto}</span>
                      <button
                        onClick={() => setAdjunto(null)}
                        style={{ color: '#9CA3AF' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#374151'}
                        onMouseLeave={e => e.currentTarget.style.color = '#9CA3AF'}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setAdjunto('captura-pantalla.png')}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl transition-all"
                      style={{ border: '1.5px dashed #D1D5DB', backgroundColor: '#FAFAFA', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#6B7280' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#006B4E'; e.currentTarget.style.backgroundColor = '#F0FDF4'; e.currentTarget.style.color = '#006B4E'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = '#D1D5DB'; e.currentTarget.style.backgroundColor = '#FAFAFA'; e.currentTarget.style.color = '#6B7280'; }}
                    >
                      <Paperclip className="w-4 h-4" />
                      Adjuntar imagen o captura
                    </button>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-1">
                  <button
                    onClick={handleClose}
                    className="px-5 py-2.5 rounded-full text-sm font-medium transition-all"
                    style={{ backgroundColor: '#F5F5F5', color: '#374151', fontFamily: 'var(--font-body)' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#EBEBEB'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#F5F5F5'}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSend}
                    disabled={!descripcion.trim()}
                    className="flex-1 py-2.5 rounded-full text-sm font-medium transition-all"
                    style={{
                      backgroundColor: descripcion.trim() ? '#006B4E' : '#E5E5E5',
                      color: descripcion.trim() ? '#FFFFFF' : '#9CA3AF',
                      fontFamily: 'var(--font-body)',
                      cursor: descripcion.trim() ? 'pointer' : 'not-allowed',
                    }}
                    onMouseEnter={e => { if (descripcion.trim()) e.currentTarget.style.backgroundColor = '#01533E'; }}
                    onMouseLeave={e => { if (descripcion.trim()) e.currentTarget.style.backgroundColor = '#006B4E'; }}
                  >
                    Enviar feedback
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
