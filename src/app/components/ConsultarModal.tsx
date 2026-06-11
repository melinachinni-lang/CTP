import React, { useState } from 'react';
import { X, Calendar, MessageCircle, Video, Send, ChevronLeft, CheckCircle, FileText } from 'lucide-react';

interface ConsultaFormData {
  nombre: string;
  email: string;
  telefono: string;
  tipoInteres: string;
  cuandoVisitar: string;
  mensaje: string;
}

interface ConsultarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReservarVisita: () => void;
  onWhatsApp: () => void;
  onVideollamada: () => void;
  onEnviarConsulta?: (data: ConsultaFormData) => void;
  parcelaNombre: string;
}

const tiposInteres = [
  { value: 'inversion', label: 'Inversión' },
  { value: 'uso-propio', label: 'Uso propio / vivir ahí' },
  { value: 'segunda-vivienda', label: 'Segunda vivienda / descanso' },
  { value: 'otro', label: 'Otro' },
];

const emptyForm: ConsultaFormData = {
  nombre: '',
  email: '',
  telefono: '',
  tipoInteres: '',
  cuandoVisitar: '',
  mensaje: '',
};

export function ConsultarModal({
  isOpen,
  onClose,
  onReservarVisita,
  onWhatsApp,
  onVideollamada,
  onEnviarConsulta,
  parcelaNombre
}: ConsultarModalProps) {
  const [paso, setPaso] = useState<'seleccion' | 'formulario' | 'enviado'>('seleccion');
  const [form, setForm] = useState<ConsultaFormData>(emptyForm);
  const [errors, setErrors] = useState<Partial<ConsultaFormData>>({});

  if (!isOpen) return null;

  const handleClose = () => {
    setPaso('seleccion');
    setForm(emptyForm);
    setErrors({});
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const validate = () => {
    const newErrors: Partial<ConsultaFormData> = {};
    if (!form.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!form.email.trim()) newErrors.email = 'El email es obligatorio';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Email inválido';
    if (!form.tipoInteres) newErrors.tipoInteres = 'Seleccioná tu tipo de interés';
    if (!form.mensaje.trim()) newErrors.mensaje = 'Escribí tu consulta';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onEnviarConsulta(form);
    setPaso('enviado');
  };

  const inputBase = {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--font-size-body-sm)',
    color: '#0A0A0A',
    backgroundColor: '#FFFFFF',
    borderRadius: '10px',
    outline: 'none',
    width: '100%',
    padding: '10px 14px',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
        style={{ maxHeight: '90vh', overflow: 'auto' }}
      >
        {/* ─── Header ─── */}
        <div className="px-6 py-5 border-b" style={{ borderColor: '#E5E5E5' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {paso === 'formulario' && (
                <button
                  onClick={() => { setPaso('seleccion'); setErrors({}); }}
                  className="p-1 rounded-lg transition-colors hover:bg-gray-100"
                  aria-label="Volver"
                >
                  <ChevronLeft className="w-5 h-5" style={{ color: '#525252' }} />
                </button>
              )}
              <div>
                <h2 style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 'var(--font-weight-semibold)',
                  fontSize: 'var(--font-size-h3)',
                  color: '#0A0A0A',
                  marginBottom: '0.2rem'
                }}>
                  {paso === 'seleccion' && 'Consultar'}
                  {paso === 'formulario' && 'Enviar consulta'}
                  {paso === 'enviado' && 'Consulta enviada'}
                </h2>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  color: '#737373'
                }}>
                  {parcelaNombre}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-1 rounded-lg transition-colors hover:bg-gray-100"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" style={{ color: '#525252' }} />
            </button>
          </div>
        </div>

        {/* ─── Paso 1: Selección de método ─── */}
        {paso === 'seleccion' && (
          <>
            <div className="px-6 py-6">
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                color: '#525252',
                marginBottom: '1.5rem',
                lineHeight: '1.6'
              }}>
                Elige cómo querés contactarte con el vendedor:
              </p>

              <div className="space-y-3">
                {/* Reservar visita */}
                <button
                  onClick={onReservarVisita}
                  className="w-full p-5 rounded-xl border-2 transition-all hover:border-gray-900 hover:bg-gray-50 text-left"
                  style={{ borderColor: '#E5E5E5', backgroundColor: '#FFFFFF' }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#0A0A0A' }}>
                      <Calendar className="w-6 h-6" style={{ color: '#FFFFFF' }} />
                    </div>
                    <div className="flex-1">
                      <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-body-base)', color: '#0A0A0A', marginBottom: '0.375rem' }}>
                        Reservar visita
                      </h3>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', lineHeight: '1.5' }}>
                        Agenda una visita presencial al terreno
                      </p>
                    </div>
                  </div>
                </button>

                {/* WhatsApp */}
                <button
                  onClick={onWhatsApp}
                  className="w-full p-5 rounded-xl border-2 transition-all hover:border-gray-900 hover:bg-gray-50 text-left"
                  style={{ borderColor: '#E5E5E5', backgroundColor: '#FFFFFF' }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#25D366' }}>
                      <MessageCircle className="w-6 h-6" style={{ color: '#FFFFFF' }} />
                    </div>
                    <div className="flex-1">
                      <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-body-base)', color: '#0A0A0A', marginBottom: '0.375rem' }}>
                        Consultar por WhatsApp
                      </h3>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', lineHeight: '1.5' }}>
                        Chatea directamente con el vendedor
                      </p>
                    </div>
                  </div>
                </button>

                {/* Videollamada */}
                <button
                  onClick={onVideollamada}
                  className="w-full p-5 rounded-xl border-2 transition-all hover:border-gray-900 hover:bg-gray-50 text-left"
                  style={{ borderColor: '#E5E5E5', backgroundColor: '#FFFFFF' }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#006B4E' }}>
                      <Video className="w-6 h-6" style={{ color: '#FFFFFF' }} />
                    </div>
                    <div className="flex-1">
                      <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-body-base)', color: '#0A0A0A', marginBottom: '0.375rem' }}>
                        Consultar por videollamada
                      </h3>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', lineHeight: '1.5' }}>
                        Programa una videollamada online
                      </p>
                    </div>
                  </div>
                </button>

                {/* Enviar consulta — solo para vendedor particular */}
                {onEnviarConsulta && (
                  <button
                    onClick={() => setPaso('formulario')}
                    className="w-full p-5 rounded-xl border-2 transition-all text-left"
                    style={{
                      borderColor: '#006B4E',
                      backgroundColor: '#F0FDF4',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#DCFCE7';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#F0FDF4';
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#006B4E' }}>
                        <FileText className="w-6 h-6" style={{ color: '#FFFFFF' }} />
                      </div>
                      <div className="flex-1">
                        <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-body-base)', color: '#006B4E', marginBottom: '0.375rem' }}>
                          Enviar consulta
                        </h3>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#166534', lineHeight: '1.5' }}>
                          Completá un formulario y el vendedor te responde
                        </p>
                      </div>
                    </div>
                  </button>
                )}
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 rounded-b-2xl">
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#737373', lineHeight: '1.5', textAlign: 'center' }}>
                Todas las opciones te conectan directamente con el vendedor
              </p>
            </div>
          </>
        )}

        {/* ─── Paso 2: Formulario ─── */}
        {paso === 'formulario' && (
          <>
            <div className="px-6 py-6 space-y-4">
              {/* Nombre */}
              <div>
                <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', color: '#0A0A0A', display: 'block', marginBottom: '6px' }}>
                  Nombre completo <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ej: Juan Pérez"
                  value={form.nombre}
                  onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
                  style={{
                    ...inputBase,
                    border: `1px solid ${errors.nombre ? '#EF4444' : '#E5E5E5'}`,
                  }}
                />
                {errors.nombre && <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#EF4444', marginTop: '4px' }}>{errors.nombre}</p>}
              </div>

              {/* Email */}
              <div>
                <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', color: '#0A0A0A', display: 'block', marginBottom: '6px' }}>
                  Email <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  style={{
                    ...inputBase,
                    border: `1px solid ${errors.email ? '#EF4444' : '#E5E5E5'}`,
                  }}
                />
                {errors.email && <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#EF4444', marginTop: '4px' }}>{errors.email}</p>}
              </div>

              {/* Teléfono */}
              <div>
                <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', color: '#0A0A0A', display: 'block', marginBottom: '6px' }}>
                  Teléfono <span style={{ color: '#A3A3A3', fontWeight: 400 }}>(opcional)</span>
                </label>
                <input
                  type="tel"
                  placeholder="+56 9 1234 5678"
                  value={form.telefono}
                  onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))}
                  style={{ ...inputBase, border: '1px solid #E5E5E5' }}
                />
              </div>

              {/* Tipo de interés */}
              <div>
                <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', color: '#0A0A0A', display: 'block', marginBottom: '6px' }}>
                  Tipo de interés <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {tiposInteres.map(tipo => (
                    <button
                      key={tipo.value}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, tipoInteres: tipo.value }))}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: form.tipoInteres === tipo.value ? 'var(--font-weight-medium)' : 'var(--font-weight-regular)',
                        padding: '10px 12px',
                        borderRadius: '10px',
                        border: `1.5px solid ${form.tipoInteres === tipo.value ? '#006B4E' : '#E5E5E5'}`,
                        backgroundColor: form.tipoInteres === tipo.value ? '#F0FDF4' : '#FFFFFF',
                        color: form.tipoInteres === tipo.value ? '#006B4E' : '#525252',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                      }}
                    >
                      {tipo.label}
                    </button>
                  ))}
                </div>
                {errors.tipoInteres && <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#EF4444', marginTop: '4px' }}>{errors.tipoInteres}</p>}
              </div>

              {/* ¿Cuándo podrías visitar? */}
              <div>
                <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', color: '#0A0A0A', display: 'block', marginBottom: '6px' }}>
                  ¿Cuándo podrías visitar? <span style={{ color: '#A3A3A3', fontWeight: 400 }}>(opcional)</span>
                </label>
                <input
                  type="date"
                  value={form.cuandoVisitar}
                  onChange={e => setForm(f => ({ ...f, cuandoVisitar: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                  style={{ ...inputBase, border: '1px solid #E5E5E5' }}
                />
              </div>

              {/* Mensaje */}
              <div>
                <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', color: '#0A0A0A', display: 'block', marginBottom: '6px' }}>
                  Tu consulta <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Escribí tu pregunta o comentario sobre la parcela..."
                  value={form.mensaje}
                  onChange={e => setForm(f => ({ ...f, mensaje: e.target.value }))}
                  style={{
                    ...inputBase,
                    border: `1px solid ${errors.mensaje ? '#EF4444' : '#E5E5E5'}`,
                    resize: 'none',
                    lineHeight: '1.6',
                  }}
                />
                {errors.mensaje && <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#EF4444', marginTop: '4px' }}>{errors.mensaje}</p>}
              </div>
            </div>

            <div className="px-6 py-4 border-t" style={{ borderColor: '#E5E5E5' }}>
              <button
                onClick={handleSubmit}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full transition-all"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-semibold)',
                  backgroundColor: '#006B4E',
                  color: '#FFFFFF',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#005540')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#006B4E')}
              >
                <Send className="w-4 h-4" />
                Enviar consulta
              </button>
            </div>
          </>
        )}

        {/* ─── Paso 3: Confirmación ─── */}
        {paso === 'enviado' && (
          <div className="px-6 py-10 flex flex-col items-center text-center gap-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#DCFCE7' }}
            >
              <CheckCircle className="w-8 h-8" style={{ color: '#006B4E' }} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-h3)', color: '#0A0A0A' }}>
              ¡Consulta enviada!
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', color: '#525252', lineHeight: '1.6', maxWidth: '320px' }}>
              El vendedor recibirá tu consulta y se va a comunicar contigo a la brevedad.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>
              Te avisaremos cuando haya una respuesta.
            </p>
            <button
              onClick={handleClose}
              className="mt-2 px-8 py-3 rounded-full transition-all"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                fontWeight: 'var(--font-weight-medium)',
                backgroundColor: '#0A0A0A',
                color: '#FFFFFF',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#333333')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#0A0A0A')}
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
