import React, { useState, useRef } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Image as ImageIcon, Calendar, Check, X, Upload, Tag, AlertTriangle, CheckCircle, Megaphone, Info, Bell } from 'lucide-react';

interface BannerAdmin {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string | null;
  fechaInicio: string;
  fechaFin: string;
  activo: boolean;
}

interface MensajeInfo {
  id: number;
  titulo: string;
  descripcion: string;
  topico: 'oferta' | 'mantenimiento' | 'novedad' | 'alerta';
  activo: boolean;
}

const initialBanners: BannerAdmin[] = [
  { id: 1, titulo: 'Lanzamiento Parcelas Región Metropolitana', descripcion: 'Nuevas parcelas disponibles desde $18.000.000. Financiamiento directo con el propietario.', imagen: null, fechaInicio: '2025-02-01', fechaFin: '2025-03-31', activo: true },
  { id: 2, titulo: 'Feria de Parcelas — Febrero 2025', descripcion: 'Visita nuestros proyectos en terreno este fin de semana. Transporte incluido desde Santiago.', imagen: null, fechaInicio: '2025-02-14', fechaFin: '2025-02-16', activo: true },
  { id: 3, titulo: 'Plan Oro — Oferta temporada', descripcion: 'Publica ilimitado durante 3 meses al precio del plan Bronce. Solo hasta el 28 de febrero.', imagen: null, fechaInicio: '2025-02-01', fechaFin: '2025-02-28', activo: false },
];

const initialMensajes: MensajeInfo[] = [
  { id: 1, titulo: 'Mantenimiento programado', descripcion: 'El 15 de febrero entre las 02:00 y 04:00 hrs la plataforma estará en mantención. Las publicaciones no se verán afectadas.', topico: 'mantenimiento', activo: true },
  { id: 2, titulo: 'Nueva funcionalidad: Comparador de parcelas', descripcion: 'Ya puedes comparar hasta 3 parcelas simultáneamente desde la página de catálogo.', topico: 'novedad', activo: true },
  { id: 3, titulo: 'Descuento en plan anual', descripcion: 'Contrata tu plan anual antes del 28 de febrero y obtén 2 meses gratis. Aplica para planes Bronce y Oro.', topico: 'oferta', activo: false },
];

const TOPICOS: { value: MensajeInfo['topico']; label: string; color: string; bg: string }[] = [
  { value: 'oferta', label: 'Oferta', color: '#CA8A04', bg: '#FEF9C3' },
  { value: 'mantenimiento', label: 'Mantenimiento', color: '#DC2626', bg: '#FEE2E2' },
  { value: 'novedad', label: 'Novedad', color: '#006B4E', bg: '#DCFCE7' },
  { value: 'alerta', label: 'Alerta', color: '#D97706', bg: '#FEF3C7' },
];

function topicoStyle(topico: MensajeInfo['topico']) {
  return TOPICOS.find(t => t.value === topico) ?? TOPICOS[2];
}

// ---------- MODAL BANNER ----------
function BannerModal({
  banner,
  onSave,
  onClose,
}: {
  banner: BannerAdmin | null;
  onSave: (data: Omit<BannerAdmin, 'id'>) => void;
  onClose: () => void;
}) {
  const [titulo, setTitulo] = useState(banner?.titulo ?? '');
  const [descripcion, setDescripcion] = useState(banner?.descripcion ?? '');
  const [fechaInicio, setFechaInicio] = useState(banner?.fechaInicio ?? '');
  const [fechaFin, setFechaFin] = useState(banner?.fechaFin ?? '');
  const [activo, setActivo] = useState(banner?.activo ?? true);
  const [imagenUrl, setImagenUrl] = useState<string | null>(banner?.imagen ?? null);
  const [preview, setPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEdit = !!banner;

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setImagenUrl(ev.target?.result as string);
    reader.readAsDataURL(file);
  }
  const canSave = titulo.trim() && descripcion.trim() && fechaInicio && fechaFin;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: '1px solid #E5E5E5' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h4)', fontWeight: '500', color: '#0A0A0A' }}>
              {isEdit ? 'Editar banner' : 'Nuevo banner'}
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#737373', marginTop: '2px' }}>
              {isEdit ? 'Modifica los datos del banner' : 'Completa los datos para crear el banner'}
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F5F5F5', color: '#737373' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#E5E5E5'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#F5F5F5'}>
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Toggle vista */}
          <div className="flex gap-2 p-1 rounded-full" style={{ backgroundColor: '#F5F5F5' }}>
            <button onClick={() => setPreview(false)} className="flex-1 py-1.5 rounded-full text-sm font-medium transition-all" style={{ backgroundColor: !preview ? '#FFFFFF' : 'transparent', color: !preview ? '#0A0A0A' : '#737373', fontFamily: 'var(--font-body)', boxShadow: !preview ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}>Editar</button>
            <button onClick={() => setPreview(true)} className="flex-1 py-1.5 rounded-full text-sm font-medium transition-all flex items-center justify-center gap-1.5" style={{ backgroundColor: preview ? '#FFFFFF' : 'transparent', color: preview ? '#0A0A0A' : '#737373', fontFamily: 'var(--font-body)', boxShadow: preview ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}>
              <Eye className="w-3.5 h-3.5" /> Previsualizar
            </button>
          </div>

          {!preview ? (
            <>
              {/* Imagen */}
              <div>
                <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: '600', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '8px' }}>Imagen</label>
                <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/webp" style={{ display: 'none' }} onChange={handleFileChange} />
                {imagenUrl ? (
                  <div className="rounded-xl overflow-hidden relative" style={{ border: '1px solid #E5E5E5' }}>
                    <img src={imagenUrl} alt="Preview" style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }} />
                    <button onClick={() => { setImagenUrl(null); if (fileInputRef.current) fileInputRef.current.value = ''; }} className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.55)', color: '#FFFFFF' }}>
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-2 right-2 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs" style={{ backgroundColor: 'rgba(0,0,0,0.55)', color: '#FFFFFF', fontFamily: 'var(--font-body)', fontWeight: '500' }}>
                      <Upload className="w-3 h-3" /> Cambiar
                    </button>
                  </div>
                ) : (
                  <div onClick={() => fileInputRef.current?.click()} className="rounded-xl flex flex-col items-center justify-center gap-2 py-8 cursor-pointer transition-all" style={{ border: '2px dashed #D1D5DB', backgroundColor: '#FAFAFA' }} onMouseEnter={e => { (e.currentTarget.style as any).borderColor = '#006B4E'; (e.currentTarget.style as any).backgroundColor = '#F0FDF4'; }} onMouseLeave={e => { (e.currentTarget.style as any).borderColor = '#D1D5DB'; (e.currentTarget.style as any).backgroundColor = '#FAFAFA'; }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F0F5EB' }}>
                      <Upload className="w-5 h-5" style={{ color: '#3D5E28' }} />
                    </div>
                    <div className="text-center">
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: '500', color: '#0A0A0A' }}>Arrastra una imagen o haz clic para subir</p>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#737373', marginTop: '2px' }}>PNG, JPG o WEBP · Máx. 2 MB · Recomendado 1200×400 px</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Título */}
              <div>
                <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: '600', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '8px' }}>Título *</label>
                <input
                  value={titulo}
                  onChange={e => setTitulo(e.target.value)}
                  placeholder="Ej: Lanzamiento Parcelas Zona Sur"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #E5E5E5', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => e.currentTarget.style.borderColor = '#006B4E'}
                  onBlur={e => e.currentTarget.style.borderColor = '#E5E5E5'}
                />
              </div>

              {/* Descripción */}
              <div>
                <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: '600', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '8px' }}>Descripción *</label>
                <textarea
                  value={descripcion}
                  onChange={e => setDescripcion(e.target.value)}
                  placeholder="Describe brevemente la promoción o campaña"
                  rows={3}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #E5E5E5', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
                  onFocus={e => e.currentTarget.style.borderColor = '#006B4E'}
                  onBlur={e => e.currentTarget.style.borderColor = '#E5E5E5'}
                />
              </div>

              {/* Fechas */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: '600', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '8px' }}>Fecha inicio *</label>
                  <input
                    type="date"
                    value={fechaInicio}
                    onChange={e => setFechaInicio(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #E5E5E5', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A', outline: 'none', boxSizing: 'border-box' }}
                    onFocus={e => e.currentTarget.style.borderColor = '#006B4E'}
                    onBlur={e => e.currentTarget.style.borderColor = '#E5E5E5'}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: '600', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '8px' }}>Fecha término *</label>
                  <input
                    type="date"
                    value={fechaFin}
                    onChange={e => setFechaFin(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #E5E5E5', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A', outline: 'none', boxSizing: 'border-box' }}
                    onFocus={e => e.currentTarget.style.borderColor = '#006B4E'}
                    onBlur={e => e.currentTarget.style.borderColor = '#E5E5E5'}
                  />
                </div>
              </div>

              {/* Estado */}
              <div className="flex items-center justify-between py-3 px-4 rounded-xl" style={{ backgroundColor: '#FAFAFA', border: '1px solid #E5E5E5' }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: '500', color: '#0A0A0A' }}>Publicar al guardar</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#737373', marginTop: '1px' }}>El banner será visible en el portal inmediatamente</p>
                </div>
                <button onClick={() => setActivo(v => !v)} className="w-11 h-6 rounded-full transition-all relative" style={{ backgroundColor: activo ? '#006B4E' : '#D1D5DB' }}>
                  <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all" style={{ left: activo ? '22px' : '2px' }} />
                </button>
              </div>
            </>
          ) : (
            /* Preview */
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #E5E5E5' }}>
              {imagenUrl ? (
                <img src={imagenUrl} alt="Banner preview" style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block', borderBottom: '1px solid #E5E5E5' }} />
              ) : (
                <div className="flex items-center justify-center" style={{ height: '140px', backgroundColor: '#F3F4F6', borderBottom: '1px solid #E5E5E5' }}>
                  <div className="flex flex-col items-center gap-2">
                    <ImageIcon className="w-8 h-8" style={{ color: '#C3C3C3' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF' }}>Imagen del banner</span>
                  </div>
                </div>
              )}
              <div className="p-5" style={{ backgroundColor: '#FFFFFF' }}>
                <div className="flex items-start justify-between mb-2">
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h4)', fontWeight: '500', color: '#0A0A0A', lineHeight: '1.3' }}>
                    {titulo || <span style={{ color: '#C3C3C3' }}>Título del banner</span>}
                  </h3>
                  <span className="ml-3 flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: activo ? '#DCFCE7' : '#F3F4F6', color: activo ? '#16A34A' : '#737373', fontFamily: 'var(--font-body)' }}>
                    {activo ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', lineHeight: '1.5' }}>
                  {descripcion || <span style={{ color: '#C3C3C3' }}>Descripción del banner</span>}
                </p>
                {(fechaInicio || fechaFin) && (
                  <div className="flex items-center gap-1.5 mt-3" style={{ color: '#737373' }}>
                    <Calendar className="w-3.5 h-3.5" />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)' }}>
                      {fechaInicio || '—'} → {fechaFin || '—'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-5" style={{ borderTop: '1px solid #E5E5E5' }}>
          <button onClick={onClose} className="flex-1 py-2.5 transition-all" style={{ backgroundColor: '#FFFFFF', color: '#0A0A0A', border: '2px solid #DEDEDE', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: '500' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F5F5F5'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}>
            Cancelar
          </button>
          <button
            onClick={() => { if (canSave) onSave({ titulo, descripcion, imagen: imagenUrl, fechaInicio, fechaFin, activo }); }}
            disabled={!canSave}
            className="flex-1 py-2.5 transition-all"
            style={{ backgroundColor: canSave ? '#006B4E' : '#E5E5E5', color: canSave ? '#FFFFFF' : '#A3A3A3', border: 'none', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: '500', cursor: canSave ? 'pointer' : 'not-allowed' }}
            onMouseEnter={e => { if (canSave) e.currentTarget.style.backgroundColor = '#01533E'; }}
            onMouseLeave={e => { if (canSave) e.currentTarget.style.backgroundColor = '#006B4E'; }}
          >
            {isEdit ? 'Guardar cambios' : 'Crear banner'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- MODAL MENSAJE ----------
function MensajeModal({
  mensaje,
  onSave,
  onClose,
}: {
  mensaje: MensajeInfo | null;
  onSave: (data: Omit<MensajeInfo, 'id'>) => void;
  onClose: () => void;
}) {
  const [titulo, setTitulo] = useState(mensaje?.titulo ?? '');
  const [descripcion, setDescripcion] = useState(mensaje?.descripcion ?? '');
  const [topico, setTopico] = useState<MensajeInfo['topico']>(mensaje?.topico ?? 'novedad');
  const [activo, setActivo] = useState(mensaje?.activo ?? true);

  const isEdit = !!mensaje;
  const canSave = titulo.trim() && descripcion.trim();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: '1px solid #E5E5E5' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h4)', fontWeight: '500', color: '#0A0A0A' }}>
              {isEdit ? 'Editar mensaje' : 'Nuevo mensaje'}
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#737373', marginTop: '2px' }}>
              Mensaje informativo para los usuarios del portal
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F5F5F5', color: '#737373' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#E5E5E5'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#F5F5F5'}>
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Tópico */}
          <div>
            <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: '600', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '8px' }}>Tópico *</label>
            <div className="grid grid-cols-2 gap-2">
              {TOPICOS.map(t => (
                <button key={t.value} onClick={() => setTopico(t.value)} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-left transition-all" style={{ border: `1.5px solid ${topico === t.value ? t.color : '#E5E5E5'}`, backgroundColor: topico === t.value ? t.bg : '#FAFAFA' }}>
                  <Tag className="w-3.5 h-3.5 flex-shrink-0" style={{ color: topico === t.value ? t.color : '#9CA3AF' }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: topico === t.value ? '600' : '400', color: topico === t.value ? t.color : '#374151' }}>{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Título */}
          <div>
            <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: '600', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '8px' }}>Título *</label>
            <input
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
              placeholder="Ej: Mantenimiento programado del sistema"
              style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #E5E5E5', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A', outline: 'none', boxSizing: 'border-box' }}
              onFocus={e => e.currentTarget.style.borderColor = '#006B4E'}
              onBlur={e => e.currentTarget.style.borderColor = '#E5E5E5'}
            />
          </div>

          {/* Descripción */}
          <div>
            <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: '600', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '8px' }}>Descripción *</label>
            <textarea
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
              placeholder="Describe el mensaje de forma clara y concisa"
              rows={3}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #E5E5E5', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
              onFocus={e => e.currentTarget.style.borderColor = '#006B4E'}
              onBlur={e => e.currentTarget.style.borderColor = '#E5E5E5'}
            />
          </div>

          {/* Estado */}
          <div className="flex items-center justify-between py-3 px-4 rounded-xl" style={{ backgroundColor: '#FAFAFA', border: '1px solid #E5E5E5' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: '500', color: '#0A0A0A' }}>Publicar al guardar</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#737373', marginTop: '1px' }}>El mensaje será visible en el portal inmediatamente</p>
            </div>
            <button onClick={() => setActivo(v => !v)} className="w-11 h-6 rounded-full transition-all relative" style={{ backgroundColor: activo ? '#006B4E' : '#D1D5DB' }}>
              <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all" style={{ left: activo ? '22px' : '2px' }} />
            </button>
          </div>
        </div>

        <div className="flex gap-3 px-6 py-5" style={{ borderTop: '1px solid #E5E5E5' }}>
          <button onClick={onClose} className="flex-1 py-2.5 transition-all" style={{ backgroundColor: '#FFFFFF', color: '#0A0A0A', border: '2px solid #DEDEDE', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: '500' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F5F5F5'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}>
            Cancelar
          </button>
          <button
            onClick={() => { if (canSave) onSave({ titulo, descripcion, topico, activo }); }}
            disabled={!canSave}
            className="flex-1 py-2.5 transition-all"
            style={{ backgroundColor: canSave ? '#006B4E' : '#E5E5E5', color: canSave ? '#FFFFFF' : '#A3A3A3', border: 'none', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: '500', cursor: canSave ? 'pointer' : 'not-allowed' }}
            onMouseEnter={e => { if (canSave) e.currentTarget.style.backgroundColor = '#01533E'; }}
            onMouseLeave={e => { if (canSave) e.currentTarget.style.backgroundColor = '#006B4E'; }}
          >
            {isEdit ? 'Guardar cambios' : 'Crear mensaje'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- MODAL DELETE ----------
function DeleteModal({ nombre, onConfirm, onClose }: { nombre: string; onConfirm: () => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }} onClick={e => e.stopPropagation()}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#FEE2E2' }}>
          <AlertTriangle className="w-6 h-6" style={{ color: '#DC2626' }} />
        </div>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h4)', fontWeight: '500', color: '#0A0A0A', marginBottom: '8px' }}>
          Eliminar contenido
        </h3>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', lineHeight: '1.5', marginBottom: '24px' }}>
          ¿Deseas eliminar <strong style={{ color: '#0A0A0A' }}>"{nombre}"</strong>? Esta acción no se puede deshacer y dejará de mostrarse en el portal.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5" style={{ backgroundColor: '#FFFFFF', color: '#0A0A0A', border: '2px solid #DEDEDE', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: '500' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F5F5F5'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}>
            Cancelar
          </button>
          <button onClick={onConfirm} className="flex-1 py-2.5" style={{ backgroundColor: '#DC2626', color: '#FFFFFF', border: 'none', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: '500' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#B91C1C'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#DC2626'}>
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- MÓDULO PRINCIPAL ----------
export function AdminBannersModule() {
  const [tab, setTab] = useState<'banners' | 'mensajes'>('banners');
  const [banners, setBanners] = useState<BannerAdmin[]>(initialBanners);
  const [mensajes, setMensajes] = useState<MensajeInfo[]>(initialMensajes);

  const [showBannerModal, setShowBannerModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState<BannerAdmin | null>(null);
  const [bannerToDelete, setBannerToDelete] = useState<BannerAdmin | null>(null);

  const [showMensajeModal, setShowMensajeModal] = useState(false);
  const [editingMensaje, setEditingMensaje] = useState<MensajeInfo | null>(null);
  const [mensajeToDelete, setMensajeToDelete] = useState<MensajeInfo | null>(null);

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [savedLabel, setSavedLabel] = useState('');
  const [deleted, setDeleted] = useState(false);

  const nextId = () => Math.max(...banners.map(b => b.id), ...mensajes.map(m => m.id), 0) + 1;

  function showSuccess(label: string) {
    setSavedLabel(label);
    setSaved(true);
    setTimeout(() => setSaved(false), 3500);
  }

  function handleSaveBanner(data: Omit<BannerAdmin, 'id'>) {
    if (editingBanner) {
      setBanners(prev => prev.map(b => b.id === editingBanner.id ? { ...b, ...data } : b));
      showSuccess('Banner actualizado correctamente');
    } else {
      setBanners(prev => [...prev, { id: nextId(), ...data }]);
      showSuccess('Banner creado correctamente');
    }
    setShowBannerModal(false);
    setEditingBanner(null);
  }

  function handleDeleteBanner() {
    if (!bannerToDelete) return;
    setBanners(prev => prev.filter(b => b.id !== bannerToDelete.id));
    setBannerToDelete(null);
    setDeleted(true);
    setTimeout(() => setDeleted(false), 3000);
  }

  function handleSaveMensaje(data: Omit<MensajeInfo, 'id'>) {
    if (editingMensaje) {
      setMensajes(prev => prev.map(m => m.id === editingMensaje.id ? { ...m, ...data } : m));
      showSuccess('Mensaje actualizado correctamente');
    } else {
      setMensajes(prev => [...prev, { id: nextId(), ...data }]);
      showSuccess('Mensaje creado correctamente');
    }
    setShowMensajeModal(false);
    setEditingMensaje(null);
  }

  function handleDeleteMensaje() {
    if (!mensajeToDelete) return;
    setMensajes(prev => prev.filter(m => m.id !== mensajeToDelete.id));
    setMensajeToDelete(null);
    setDeleted(true);
    setTimeout(() => setDeleted(false), 3000);
  }

  function simulateLoading() {
    setLoading(true);
    setTimeout(() => setLoading(false), 1400);
  }

  function formatDate(d: string) {
    if (!d) return '—';
    const [y, m, day] = d.split('-');
    return `${day}/${m}/${y}`;
  }

  function isVigente(b: BannerAdmin) {
    const today = new Date().toISOString().slice(0, 10);
    return b.fechaInicio <= today && b.fechaFin >= today;
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h2)', fontWeight: 'var(--font-weight-medium)', color: '#0A0A0A', lineHeight: 'var(--line-height-heading)' }}>
            Banners & mensajes
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', marginTop: '4px' }}>
            Gestiona contenido promocional e informativo del portal
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={simulateLoading}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm transition-all"
            style={{ backgroundColor: '#F0F5EB', border: '1px solid #C5D9A8', color: '#3D5E28', fontFamily: 'var(--font-body)', fontWeight: '500' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#E2EDCC'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#F0F5EB'}
          >
            Actualizar
          </button>
          <button
            onClick={() => { setEditingBanner(null); setEditingMensaje(null); if (tab === 'banners') setShowBannerModal(true); else setShowMensajeModal(true); }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm transition-all"
            style={{ backgroundColor: '#006B4E', color: '#FFFFFF', border: 'none', fontFamily: 'var(--font-body)', fontWeight: '500' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#01533E'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#006B4E'}
          >
            <Plus className="w-4 h-4" />
            {tab === 'banners' ? 'Nuevo banner' : 'Nuevo mensaje'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 mb-6" style={{ borderBottom: '2px solid #F3F4F6' }}>
        {([
          { key: 'banners', label: 'Banners promocionales', icon: Megaphone, count: banners.length },
          { key: 'mensajes', label: 'Mensajes informativos', icon: Bell, count: mensajes.length },
        ] as const).map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="flex items-center gap-2 px-4 py-3 transition-all"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-sm)',
              fontWeight: tab === t.key ? '600' : '400',
              color: tab === t.key ? '#006B4E' : '#737373',
              borderBottom: `2px solid ${tab === t.key ? '#006B4E' : 'transparent'}`,
              marginBottom: '-2px',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottomWidth: '2px',
              borderBottomStyle: 'solid',
              borderBottomColor: tab === t.key ? '#006B4E' : 'transparent',
            }}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
            <span className="px-1.5 py-0.5 rounded-full text-xs" style={{ backgroundColor: tab === t.key ? '#F0F5EB' : '#F3F4F6', color: tab === t.key ? '#3D5E28' : '#737373', fontFamily: 'var(--font-body)', fontWeight: '600' }}>
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* ── BANNERS ── */}
      {tab === 'banners' && (
        <>
          {loading ? (
            /* Skeleton */
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="rounded-xl p-5 flex gap-4" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
                  <div className="flex-shrink-0 rounded-lg animate-pulse" style={{ width: '120px', height: '80px', backgroundColor: '#F3F4F6' }} />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 rounded animate-pulse" style={{ backgroundColor: '#F3F4F6', width: '60%' }} />
                    <div className="h-3 rounded animate-pulse" style={{ backgroundColor: '#F3F4F6', width: '90%' }} />
                    <div className="h-3 rounded animate-pulse" style={{ backgroundColor: '#F3F4F6', width: '40%' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : banners.length === 0 ? (
            /* Empty state */
            <div className="rounded-2xl py-16 flex flex-col items-center justify-center text-center" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: '#F0F5EB' }}>
                <Megaphone className="w-8 h-8" style={{ color: '#3D5E28' }} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h4)', fontWeight: '500', color: '#0A0A0A', marginBottom: '8px' }}>
                Sin banners creados
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', maxWidth: '320px', lineHeight: '1.5', marginBottom: '20px' }}>
                Crea el primer banner promocional para comunicar ofertas o destacar proyectos a los usuarios del portal.
              </p>
              <button onClick={() => { setEditingBanner(null); setShowBannerModal(true); }} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all" style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: '500' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#01533E'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#006B4E'}>
                <Plus className="w-4 h-4" /> Crear primer banner
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {banners.map(banner => (
                <div key={banner.id} className="rounded-xl overflow-hidden" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
                  <div className="flex items-start gap-4 p-5">
                    {/* Imagen */}
                    <div className="flex-shrink-0 rounded-lg overflow-hidden flex items-center justify-center" style={{ width: '120px', height: '80px', backgroundColor: '#F3F4F6', border: '1px solid #E5E5E5' }}>
                      {banner.imagen ? (
                        <img src={banner.imagen} alt={banner.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <ImageIcon className="w-7 h-7" style={{ color: '#C3C3C3' }} />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-1.5">
                        <h3 style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', fontWeight: '600', color: '#0A0A0A', lineHeight: '1.3' }}>
                          {banner.titulo}
                        </h3>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {isVigente(banner) && banner.activo && (
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: '#F0F5EB', color: '#3D5E28', fontFamily: 'var(--font-body)' }}>Vigente</span>
                          )}
                          <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: banner.activo ? '#DCFCE7' : '#F3F4F6', color: banner.activo ? '#16A34A' : '#737373', fontFamily: 'var(--font-body)' }}>
                            {banner.activo ? 'Activo' : 'Inactivo'}
                          </span>
                        </div>
                      </div>

                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', lineHeight: '1.5', marginBottom: '10px' }}>
                        {banner.descripcion}
                      </p>

                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <div className="flex items-center gap-1.5" style={{ color: '#737373' }}>
                          <Calendar className="w-3.5 h-3.5" />
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)' }}>
                            {formatDate(banner.fechaInicio)} → {formatDate(banner.fechaFin)}
                          </span>
                        </div>

                        {/* Acciones */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => { setEditingBanner(banner); setShowBannerModal(true); }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all"
                            style={{ backgroundColor: '#FAFAFA', border: '1px solid #E5E5E5', color: '#0A0A0A', fontFamily: 'var(--font-body)', fontWeight: '500' }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F0F5EB'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FAFAFA'}
                          >
                            <Edit2 className="w-3.5 h-3.5" /> Editar
                          </button>
                          <button
                            onClick={() => setBanners(prev => prev.map(b => b.id === banner.id ? { ...b, activo: !b.activo } : b))}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all"
                            style={{ backgroundColor: '#FAFAFA', border: '1px solid #E5E5E5', color: '#0A0A0A', fontFamily: 'var(--font-body)', fontWeight: '500' }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F3F4F6'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FAFAFA'}
                          >
                            {banner.activo ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            {banner.activo ? 'Desactivar' : 'Activar'}
                          </button>
                          <button
                            onClick={() => setBannerToDelete(banner)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all"
                            style={{ backgroundColor: '#FAFAFA', border: '1px solid #E5E5E5', color: '#DC2626', fontFamily: 'var(--font-body)', fontWeight: '500' }}
                            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#FEE2E2'; (e.currentTarget.style as any).borderColor = '#FECACA'; }}
                            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#FAFAFA'; (e.currentTarget.style as any).borderColor = '#E5E5E5'; }}
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* ── MENSAJES ── */}
      {tab === 'mensajes' && (
        <>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="rounded-xl p-5" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
                  <div className="space-y-2">
                    <div className="h-4 rounded animate-pulse" style={{ backgroundColor: '#F3F4F6', width: '50%' }} />
                    <div className="h-3 rounded animate-pulse" style={{ backgroundColor: '#F3F4F6', width: '85%' }} />
                    <div className="h-3 rounded animate-pulse" style={{ backgroundColor: '#F3F4F6', width: '30%' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : mensajes.length === 0 ? (
            <div className="rounded-2xl py-16 flex flex-col items-center justify-center text-center" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: '#F0F5EB' }}>
                <Bell className="w-8 h-8" style={{ color: '#3D5E28' }} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h4)', fontWeight: '500', color: '#0A0A0A', marginBottom: '8px' }}>
                Sin mensajes publicados
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', maxWidth: '320px', lineHeight: '1.5', marginBottom: '20px' }}>
                Crea mensajes informativos para comunicar novedades, mantenimientos u ofertas especiales a los usuarios.
              </p>
              <button onClick={() => { setEditingMensaje(null); setShowMensajeModal(true); }} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all" style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: '500' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#01533E'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#006B4E'}>
                <Plus className="w-4 h-4" /> Crear primer mensaje
              </button>
            </div>
          ) : (
            <div className="rounded-xl overflow-hidden" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: '#FAFAFA', borderBottom: '1px solid #E5E5E5' }}>
                    <th className="text-left px-6 py-4" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: '500', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mensaje</th>
                    <th className="text-center px-6 py-4" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: '500', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tópico</th>
                    <th className="text-center px-6 py-4" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: '500', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Estado</th>
                    <th className="text-center px-6 py-4" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: '500', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {mensajes.map((msg, i) => {
                    const tp = topicoStyle(msg.topico);
                    return (
                      <tr key={msg.id} style={{ borderBottom: i < mensajes.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                        <td className="px-6 py-4">
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: '600', color: '#0A0A0A', marginBottom: '3px' }}>{msg.titulo}</p>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#737373', lineHeight: '1.5', maxWidth: '380px' }}>{msg.descripcion}</p>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: tp.bg, color: tp.color, fontFamily: 'var(--font-body)' }}>
                            <Tag className="w-3 h-3" />
                            {tp.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: msg.activo ? '#DCFCE7' : '#F3F4F6', color: msg.activo ? '#16A34A' : '#737373', fontFamily: 'var(--font-body)' }}>
                            {msg.activo ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button onClick={() => { setEditingMensaje(msg); setShowMensajeModal(true); }} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all" style={{ backgroundColor: '#FAFAFA', border: '1px solid #E5E5E5', color: '#0A0A0A', fontFamily: 'var(--font-body)', fontWeight: '500' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F0F5EB'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FAFAFA'}>
                              <Edit2 className="w-3.5 h-3.5" /> Editar
                            </button>
                            <button onClick={() => setMensajes(prev => prev.map(m => m.id === msg.id ? { ...m, activo: !m.activo } : m))} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all" style={{ backgroundColor: '#FAFAFA', border: '1px solid #E5E5E5', color: '#0A0A0A', fontFamily: 'var(--font-body)', fontWeight: '500' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F3F4F6'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FAFAFA'}>
                              {msg.activo ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                              {msg.activo ? 'Desactivar' : 'Activar'}
                            </button>
                            <button onClick={() => setMensajeToDelete(msg)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all" style={{ backgroundColor: '#FAFAFA', border: '1px solid #E5E5E5', color: '#DC2626', fontFamily: 'var(--font-body)', fontWeight: '500' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#FEE2E2'; (e.currentTarget.style as any).borderColor = '#FECACA'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#FAFAFA'; (e.currentTarget.style as any).borderColor = '#E5E5E5'; }}>
                              <Trash2 className="w-3.5 h-3.5" /> Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* Modales */}
      {showBannerModal && (
        <BannerModal
          banner={editingBanner}
          onSave={handleSaveBanner}
          onClose={() => { setShowBannerModal(false); setEditingBanner(null); }}
        />
      )}
      {showMensajeModal && (
        <MensajeModal
          mensaje={editingMensaje}
          onSave={handleSaveMensaje}
          onClose={() => { setShowMensajeModal(false); setEditingMensaje(null); }}
        />
      )}
      {bannerToDelete && (
        <DeleteModal nombre={bannerToDelete.titulo} onConfirm={handleDeleteBanner} onClose={() => setBannerToDelete(null)} />
      )}
      {mensajeToDelete && (
        <DeleteModal nombre={mensajeToDelete.titulo} onConfirm={handleDeleteMensaje} onClose={() => setMensajeToDelete(null)} />
      )}

      {/* Toast éxito */}
      {saved && (
        <div className="fixed bottom-6 left-1/2 z-[100] flex items-center gap-3 px-5 py-4 rounded-2xl" style={{ transform: 'translateX(-50%)', backgroundColor: '#0A0A0A', boxShadow: '0 8px 32px rgba(0,0,0,0.28)', minWidth: '320px', maxWidth: '440px' }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#16A34A' }}>
            <CheckCircle className="w-4 h-4" style={{ color: '#FFFFFF' }} />
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: '500', color: '#FFFFFF' }}>
            {savedLabel}
          </p>
        </div>
      )}
      {deleted && (
        <div className="fixed bottom-6 left-1/2 z-[100] flex items-center gap-3 px-5 py-4 rounded-2xl" style={{ transform: 'translateX(-50%)', backgroundColor: '#0A0A0A', boxShadow: '0 8px 32px rgba(0,0,0,0.28)', minWidth: '280px' }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#737373' }}>
            <Trash2 className="w-4 h-4" style={{ color: '#FFFFFF' }} />
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: '500', color: '#FFFFFF' }}>
            Contenido eliminado
          </p>
        </div>
      )}
    </>
  );
}
