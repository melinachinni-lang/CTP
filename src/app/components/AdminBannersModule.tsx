import React, { useState, useRef } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Image as ImageIcon, X, Upload, AlertTriangle, CheckCircle, Megaphone, RefreshCw, GripVertical, ArrowLeft, Check, AlertCircle, Link } from 'lucide-react';

interface BannerAdmin {
  id: number;
  titulo: string;
  descripcion: string;
  textoBoton: string;
  urlBoton: string;
  imagen: string | null;
  activo: boolean;
}

const BG = '#002F23';

const initialBanners: BannerAdmin[] = [
  {
    id: 1,
    titulo: 'Tu parcela en cuotas accesibles',
    descripcion: 'Planes de pago flexibles pensados para que puedas invertir sin apuros.',
    textoBoton: 'Ver planes',
    urlBoton: '/planes',
    imagen: 'https://images.unsplash.com/photo-1609126917056-243a15e2e789?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YWxsZXklMjBsYW5kfGVufDF8fHx8MTc2ODg2NTMxM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    activo: true,
  },
  {
    id: 2,
    titulo: 'Desde la búsqueda hasta la escritura',
    descripcion: 'Todo en un solo lugar, con respaldo legal y acompañamiento en cada paso.',
    textoBoton: 'Cómo funciona',
    urlBoton: '/como-funciona',
    imagen: 'https://images.unsplash.com/photo-1766830110938-0ea8a6d78ecb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kJTIwZGV2ZWxvcG1lbnQlMjBwcm9qZWN0fGVufDF8fHx8MTc2ODg2NjMzOHww&ixlib=rb-4.1.0&q=80&w=1080',
    activo: true,
  },
  {
    id: 3,
    titulo: 'La tierra que no se devalúa',
    descripcion: 'Invertir en parcelas es apostar por un activo real que crece con el tiempo.',
    textoBoton: 'Ver proyectos',
    urlBoton: '/proyectos',
    imagen: 'https://images.unsplash.com/photo-1748711243680-1c4ab4f9979f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmR8ZW58MXx8fHwxNzY4ODY1MzExfDA&ixlib=rb-4.1.0&q=80&w=1080',
    activo: true,
  },
];

// ─── BANNER EDITOR ────────────────────────────────────────────────────────────

function BannerEditor({ banner, onBack, onSave }: {
  banner: BannerAdmin | null;
  onBack: () => void;
  onSave: (data: Omit<BannerAdmin, 'id'>) => void;
}) {
  const [titulo, setTitulo] = useState(banner?.titulo ?? '');
  const [descripcion, setDescripcion] = useState(banner?.descripcion ?? '');
  const [textoBoton, setTextoBoton] = useState(banner?.textoBoton ?? '');
  const [urlBoton, setUrlBoton] = useState(banner?.urlBoton ?? '');
  const [activo, setActivo] = useState(banner?.activo ?? true);
  const [imagenUrl, setImagenUrl] = useState<string | null>(banner?.imagen ?? null);
  const [preview, setPreview] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [errors, setErrors] = useState({ titulo: false, descripcion: false, textoBoton: false, urlBoton: false });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEdit = !!banner;

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setImagenUrl(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  const handleSave = () => {
    const newErrors = {
      titulo: !titulo.trim(),
      descripcion: !descripcion.trim(),
      textoBoton: !textoBoton.trim(),
      urlBoton: !urlBoton.trim(),
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;
    onSave({ titulo, descripcion, textoBoton, urlBoton, imagen: imagenUrl, activo });
    if (isEdit) {
      setSaveSuccess(true);
      setTimeout(() => { setSaveSuccess(false); onBack(); }, 1200);
    } else {
      setCreateSuccess(true);
    }
  };

  const inputStyle = (hasError: boolean) => ({
    width: '100%',
    padding: '10px 14px',
    borderRadius: '12px',
    border: `1.5px solid ${hasError ? '#EF4444' : '#E5E5E5'}`,
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--font-size-body-sm)',
    color: '#0A0A0A',
    outline: 'none',
    boxSizing: 'border-box' as const,
    backgroundColor: '#FAFAFA',
  });

  if (createSuccess) {
    return (
      <div className="flex flex-col items-center justify-center text-center px-6" style={{ minHeight: '70vh' }}>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: '#DCFCE7' }}>
          <CheckCircle className="w-8 h-8" style={{ color: '#16A34A' }} />
        </div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h3)', fontWeight: '500', color: '#0A0A0A', marginBottom: '8px' }}>
          ¡Banner creado!
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', lineHeight: '1.6', marginBottom: '24px', maxWidth: '320px' }}>
          <strong style={{ color: '#0A0A0A' }}>"{titulo}"</strong> ya está disponible en el listado de banners{activo ? ' y visible en el portal' : ''}.
        </p>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
          style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#01533E'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#006B4E'}
        >
          Ver listado
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      {/* Top bar */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors flex-shrink-0"
          style={{ backgroundColor: '#F5F5F5', color: '#737373', fontFamily: 'var(--font-body)', border: '1px solid #E5E5E5' }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#E5E5E5'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#F5F5F5'; }}
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al listado
        </button>
        <span style={{ color: '#D5D5D5' }}>/</span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>
          {isEdit ? 'Editar banner' : 'Nuevo banner'}
        </span>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Toggle editar/previsualizar */}
        <div className="inline-flex gap-1 p-1 rounded-full mb-6" style={{ backgroundColor: '#F5F5F5' }}>
          <button
            onClick={() => setPreview(false)}
            className="py-1.5 px-5 rounded-full text-sm font-medium transition-all"
            style={{ backgroundColor: !preview ? '#FFFFFF' : 'transparent', color: !preview ? '#0A0A0A' : '#737373', fontFamily: 'var(--font-body)', boxShadow: !preview ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}
          >
            Editar
          </button>
          <button
            onClick={() => setPreview(true)}
            className="py-1.5 px-5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5"
            style={{ backgroundColor: preview ? '#FFFFFF' : 'transparent', color: preview ? '#0A0A0A' : '#737373', fontFamily: 'var(--font-body)', boxShadow: preview ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}
          >
            <Eye className="w-3.5 h-3.5" /> Previsualizar
          </button>
        </div>

        {!preview ? (
          <div className="space-y-5">
            {/* Imagen */}
            <div className="rounded-2xl p-5" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
              <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: '600', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '10px' }}>Imagen</label>
              <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/webp" style={{ display: 'none' }} onChange={handleFileChange} />
              {imagenUrl ? (
                <div className="rounded-xl overflow-hidden relative" style={{ border: '1px solid #E5E5E5' }}>
                  <img src={imagenUrl} alt="Preview" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
                  <button onClick={() => { setImagenUrl(null); if (fileInputRef.current) fileInputRef.current.value = ''; }} className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.55)', color: '#FFFFFF' }}>
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-2 right-2 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs" style={{ backgroundColor: 'rgba(0,0,0,0.55)', color: '#FFFFFF', fontFamily: 'var(--font-body)', fontWeight: '500' }}>
                    <Upload className="w-3 h-3" /> Cambiar
                  </button>
                </div>
              ) : (
                <div onClick={() => fileInputRef.current?.click()} className="rounded-xl flex flex-col items-center justify-center gap-2 py-10 cursor-pointer transition-all" style={{ border: '2px dashed #D1D5DB', backgroundColor: '#FAFAFA' }} onMouseEnter={e => { e.currentTarget.style.borderColor = '#006B4E'; e.currentTarget.style.backgroundColor = '#F0FDF4'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = '#D1D5DB'; e.currentTarget.style.backgroundColor = '#FAFAFA'; }}>
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
            <div className="rounded-2xl p-5" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
              <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: '500', color: '#0A0A0A', display: 'block', marginBottom: '6px' }}>
                Título <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <input
                value={titulo}
                onChange={e => setTitulo(e.target.value)}
                placeholder="Ej: Lanzamiento Parcelas Zona Sur"
                style={inputStyle(errors.titulo)}
                onFocus={e => { e.currentTarget.style.borderColor = '#006B4E'; e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
                onBlur={e => { e.currentTarget.style.borderColor = errors.titulo ? '#EF4444' : '#E5E5E5'; e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
              />
              {errors.titulo && <p className="mt-1.5 flex items-center gap-1" style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#EF4444' }}><AlertCircle className="w-3 h-3" /> El título es obligatorio</p>}
            </div>

            {/* Descripción */}
            <div className="rounded-2xl p-5" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
              <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: '500', color: '#0A0A0A', display: 'block', marginBottom: '6px' }}>
                Descripción <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <textarea
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
                placeholder="Subtítulo que aparece bajo el título en el banner"
                rows={3}
                style={{ ...inputStyle(errors.descripcion), resize: 'vertical', lineHeight: '1.65' }}
                onFocus={e => { e.currentTarget.style.borderColor = '#006B4E'; e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
                onBlur={e => { e.currentTarget.style.borderColor = errors.descripcion ? '#EF4444' : '#E5E5E5'; e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
              />
              {errors.descripcion && <p className="mt-1.5 flex items-center gap-1" style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#EF4444' }}><AlertCircle className="w-3 h-3" /> La descripción es obligatoria</p>}
            </div>

            {/* Botón */}
            <div className="rounded-2xl p-5" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
              <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: '600', color: '#0A0A0A', display: 'block', marginBottom: '14px' }}>
                Botón de acción
              </label>
              <div className="space-y-4">
                <div>
                  <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '6px' }}>
                    Texto del botón <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input
                    value={textoBoton}
                    onChange={e => setTextoBoton(e.target.value)}
                    placeholder="Ej: Ver proyectos"
                    style={inputStyle(errors.textoBoton)}
                    onFocus={e => { e.currentTarget.style.borderColor = '#006B4E'; e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = errors.textoBoton ? '#EF4444' : '#E5E5E5'; e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
                  />
                  {errors.textoBoton && <p className="mt-1.5 flex items-center gap-1" style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#EF4444' }}><AlertCircle className="w-3 h-3" /> El texto del botón es obligatorio</p>}
                </div>
                <div>
                  <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '6px' }}>
                    URL de destino <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <div className="relative">
                    <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9CA3AF', pointerEvents: 'none' }} />
                    <input
                      value={urlBoton}
                      onChange={e => setUrlBoton(e.target.value)}
                      placeholder="/proyectos o https://..."
                      style={{ ...inputStyle(errors.urlBoton), paddingLeft: '36px' }}
                      onFocus={e => { e.currentTarget.style.borderColor = '#006B4E'; e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
                      onBlur={e => { e.currentTarget.style.borderColor = errors.urlBoton ? '#EF4444' : '#E5E5E5'; e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
                    />
                  </div>
                  {errors.urlBoton && <p className="mt-1.5 flex items-center gap-1" style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#EF4444' }}><AlertCircle className="w-3 h-3" /> La URL es obligatoria</p>}
                </div>
              </div>
            </div>

            {/* Estado */}
            <div className="rounded-2xl p-5 flex items-center justify-between" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: '500', color: '#0A0A0A' }}>Publicar al guardar</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#737373', marginTop: '2px' }}>
                  {activo ? 'El banner será visible en el portal inmediatamente' : 'El banner quedará inactivo hasta que lo actives'}
                </p>
              </div>
              <button onClick={() => setActivo(v => !v)} className="w-11 h-6 rounded-full transition-all relative flex-shrink-0" style={{ backgroundColor: activo ? '#006B4E' : '#D1D5DB' }}>
                <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all" style={{ left: activo ? '22px' : '2px' }} />
              </button>
            </div>
          </div>
        ) : (
          /* Vista previa — idéntica al carrusel del home */
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF', marginBottom: '10px' }}>
              Así se verá en el inicio del portal
            </p>
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #E5E5E5', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', height: '240px' }}>
              <div className="flex h-full">
                {/* Panel izquierdo */}
                <div
                  className="flex flex-col justify-center px-8 py-6 flex-shrink-0 overflow-hidden"
                  style={{ width: '44%', backgroundColor: BG }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 'var(--font-weight-semibold)',
                      fontSize: 'clamp(16px, 2vw, 22px)',
                      color: '#FFFFFF',
                      lineHeight: '1.25',
                      marginBottom: descripcion ? '10px' : '20px',
                    }}
                  >
                    {titulo || <span style={{ color: 'rgba(255,255,255,0.3)' }}>Título del banner</span>}
                  </h3>
                  {descripcion && (
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '13px',
                        color: 'rgba(255,255,255,0.72)',
                        lineHeight: '1.5',
                        marginBottom: '18px',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical' as const,
                      }}
                    >
                      {descripcion}
                    </p>
                  )}
                  <button
                    className="self-start px-5 py-2 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: '#FFFFFF',
                      color: BG,
                      fontFamily: 'var(--font-body)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    {textoBoton || 'Ver más'}
                  </button>
                </div>

                {/* Panel derecho: imagen */}
                <div className="flex-1 relative overflow-hidden">
                  {imagenUrl ? (
                    <>
                      <img src={imagenUrl} alt={titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div
                        className="absolute inset-y-0 left-0 w-16 pointer-events-none"
                        style={{ background: `linear-gradient(to right, ${BG}, transparent)` }}
                      />
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2" style={{ backgroundColor: '#F3F4F6' }}>
                      <ImageIcon className="w-10 h-10" style={{ color: '#C3C3C3' }} />
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF' }}>Sin imagen de banner</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer sticky */}
      <div className="flex items-center justify-end gap-3 pt-6 mt-6" style={{ borderTop: '1px solid #E5E5E5', position: 'sticky', bottom: 0, backgroundColor: '#FAFAFA', marginLeft: '-24px', marginRight: '-24px', paddingLeft: '24px', paddingRight: '24px' }}>
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all"
          style={{ backgroundColor: '#F5F5F5', border: '1px solid #E5E5E5', color: '#737373', fontFamily: 'var(--font-body)' }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#E5E5E5'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#F5F5F5'; }}
        >
          Cancelar
        </button>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-all"
          style={{ backgroundColor: saveSuccess ? '#166534' : '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)', borderRadius: '200px' }}
          onMouseEnter={e => { if (!saveSuccess) e.currentTarget.style.backgroundColor = '#01533E'; }}
          onMouseLeave={e => { if (!saveSuccess) e.currentTarget.style.backgroundColor = saveSuccess ? '#166534' : '#006B4E'; }}
        >
          {saveSuccess ? <><Check className="w-4 h-4" /> Guardado</> : isEdit ? 'Guardar cambios' : 'Crear banner'}
        </button>
      </div>
    </div>
  );
}

// ─── MODAL ELIMINAR ───────────────────────────────────────────────────────────

function DeleteModal({ nombre, onConfirm, onClose }: { nombre: string; onConfirm: () => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }} onClick={e => e.stopPropagation()}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#FEE2E2' }}>
          <AlertTriangle className="w-6 h-6" style={{ color: '#DC2626' }} />
        </div>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h4)', fontWeight: '500', color: '#0A0A0A', marginBottom: '8px' }}>
          Eliminar banner
        </h3>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', lineHeight: '1.5', marginBottom: '24px' }}>
          ¿Eliminar <strong style={{ color: '#0A0A0A' }}>"{nombre}"</strong>? Esta acción no se puede deshacer.
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

// ─── MODAL LÍMITE 3 BANNERS ───────────────────────────────────────────────────

function LimitModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }} onClick={e => e.stopPropagation()}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#FEF3C7' }}>
          <AlertTriangle className="w-6 h-6" style={{ color: '#D97706' }} />
        </div>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h4)', fontWeight: '500', color: '#0A0A0A', marginBottom: '8px' }}>
          Límite de banners activos
        </h3>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', lineHeight: '1.6', marginBottom: '24px' }}>
          Ya hay <strong style={{ color: '#0A0A0A' }}>3 banners activos</strong> en el portal. Para publicar uno nuevo, desactiva o elimina alguno de los existentes.
        </p>
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-full font-medium transition-all"
          style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#01533E'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#006B4E'}
        >
          Entendido
        </button>
      </div>
    </div>
  );
}

// ─── MÓDULO PRINCIPAL ─────────────────────────────────────────────────────────

export function AdminBannersModule({ autoOpenNew }: { autoOpenNew?: boolean }) {
  const [banners, setBanners] = useState<BannerAdmin[]>(initialBanners);
  const [view, setView] = useState<'list' | 'create' | BannerAdmin>(autoOpenNew ? 'create' : 'list');
  const [bannerToDelete, setBannerToDelete] = useState<BannerAdmin | null>(null);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [saved, setSaved] = useState(false);
  const [savedLabel, setSavedLabel] = useState('');
  const [deleted, setDeleted] = useState(false);

  // Drag to reorder
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const nextId = () => Math.max(...banners.map(b => b.id), 0) + 1;

  function showSuccess(label: string) {
    setSavedLabel(label);
    setSaved(true);
    setTimeout(() => setSaved(false), 3500);
  }

  function handleNuevoBanner() {
    const activos = banners.filter(b => b.activo).length;
    if (activos >= 3) {
      setShowLimitModal(true);
    } else {
      setView('create');
    }
  }

  function handleSaveBanner(data: Omit<BannerAdmin, 'id'>) {
    if (typeof view === 'object') {
      setBanners(prev => prev.map(b => b.id === (view as BannerAdmin).id ? { ...b, ...data } : b));
      showSuccess('Banner actualizado correctamente');
      setTimeout(() => setView('list'), 1200);
    } else {
      setBanners(prev => [{ id: nextId(), ...data }, ...prev]);
    }
  }

  function handleDeleteBanner() {
    if (!bannerToDelete) return;
    setBanners(prev => prev.filter(b => b.id !== bannerToDelete.id));
    setBannerToDelete(null);
    setDeleted(true);
    setTimeout(() => setDeleted(false), 3000);
  }

  // Drag handlers
  const handleDragStart = (idx: number) => setDragIndex(idx);
  const handleDragOver = (e: React.DragEvent, idx: number) => { e.preventDefault(); setDragOverIndex(idx); };
  const handleDrop = (idx: number) => {
    if (dragIndex === null || dragIndex === idx) { setDragIndex(null); setDragOverIndex(null); return; }
    const next = [...banners];
    const [removed] = next.splice(dragIndex, 1);
    next.splice(idx, 0, removed);
    setBanners(next);
    setDragIndex(null);
    setDragOverIndex(null);
  };
  const handleDragEnd = () => { setDragIndex(null); setDragOverIndex(null); };

  if (view !== 'list') {
    return (
      <BannerEditor
        banner={typeof view === 'object' ? view : null}
        onBack={() => setView('list')}
        onSave={handleSaveBanner}
      />
    );
  }

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h2)', fontWeight: 'var(--font-weight-medium)', color: '#0A0A0A', lineHeight: 'var(--line-height-heading)' }}>
            Banners promocionales
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', marginTop: '4px' }}>
            Gestiona el carrusel de banners del inicio del portal · Máx. 3 activos
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => { setLoadError(false); setLoading(true); setTimeout(() => { setLoading(false); setLoadError(true); }, 1400); }}
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg transition-all"
            title="Actualizar"
            style={{ backgroundColor: '#F0F5EB', border: '1px solid #C5D9A8', color: '#3D5E28' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#E2EDCC'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#F0F5EB'}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleNuevoBanner}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-sm transition-all"
            style={{ backgroundColor: '#006B4E', color: '#FFFFFF', border: 'none', fontFamily: 'var(--font-body)', fontWeight: '500' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#01533E'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#006B4E'}
          >
            <Plus className="w-4 h-4" /> Nuevo banner
          </button>
        </div>
      </div>

      {/* Hint carrusel */}
      {banners.length > 1 && !loading && !loadError && (
        <div className="flex items-center gap-2 mb-4 px-1">
          <GripVertical className="w-3.5 h-3.5" style={{ color: '#A3A3A3' }} />
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#A3A3A3' }}>
            Arrastra los banners para cambiar el orden en el carrusel del inicio
          </p>
        </div>
      )}

      {/* Lista */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="rounded-xl p-5 flex gap-4" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
              <div className="flex-shrink-0 rounded-lg animate-pulse" style={{ width: 'clamp(72px, 20vw, 140px)', height: 'clamp(52px, 14vw, 90px)', backgroundColor: '#F3F4F6' }} />
              <div className="flex-1 space-y-2 py-1">
                <div className="h-4 rounded animate-pulse" style={{ backgroundColor: '#F3F4F6', width: '55%' }} />
                <div className="h-3 rounded animate-pulse" style={{ backgroundColor: '#F3F4F6', width: '85%' }} />
                <div className="h-3 rounded animate-pulse" style={{ backgroundColor: '#F3F4F6', width: '35%' }} />
              </div>
            </div>
          ))}
        </div>
      ) : loadError ? (
        <div className="rounded-2xl py-16 flex flex-col items-center justify-center text-center" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: '#FEF2F2' }}>
            <AlertCircle className="w-8 h-8" style={{ color: '#EF4444' }} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h4)', fontWeight: '500', color: '#0A0A0A', marginBottom: '8px' }}>
            No se pudieron cargar los banners
          </h3>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', maxWidth: '320px', lineHeight: '1.5', marginBottom: '20px' }}>
            Hubo un problema al conectar con el servidor. Verifica tu conexión e intenta de nuevo.
          </p>
          <button onClick={() => { setLoadError(false); setLoading(true); setTimeout(() => setLoading(false), 1400); }} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all" style={{ backgroundColor: '#EF4444', color: '#FFFFFF', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: '500' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#DC2626'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#EF4444'}>
            <RefreshCw className="w-4 h-4" /> Reintentar
          </button>
        </div>
      ) : banners.length === 0 ? (
        <div className="rounded-2xl py-16 flex flex-col items-center justify-center text-center" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: '#F0F5EB' }}>
            <Megaphone className="w-8 h-8" style={{ color: '#3D5E28' }} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h4)', fontWeight: '500', color: '#0A0A0A', marginBottom: '8px' }}>
            Sin banners creados
          </h3>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', maxWidth: '320px', lineHeight: '1.5', marginBottom: '20px' }}>
            Crea el primer banner para que aparezca en el carrusel del inicio del portal.
          </p>
          <button onClick={handleNuevoBanner} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full transition-all" style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: '500' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#01533E'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#006B4E'}>
            <Plus className="w-4 h-4" /> Crear primer banner
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {banners.map((banner, idx) => (
            <div
              key={banner.id}
              draggable
              onDragStart={() => handleDragStart(idx)}
              onDragOver={e => handleDragOver(e, idx)}
              onDrop={() => handleDrop(idx)}
              onDragEnd={handleDragEnd}
              className="rounded-xl overflow-hidden transition-all"
              style={{
                backgroundColor: '#FFFFFF',
                border: dragOverIndex === idx && dragIndex !== idx ? '2px solid #006B4E' : '1px solid #E5E5E5',
                boxShadow: dragIndex === idx ? '0 8px 24px rgba(0,0,0,0.12)' : '0 1px 2px rgba(0,0,0,0.04)',
                opacity: dragIndex === idx ? 0.5 : 1,
                cursor: 'grab',
              }}
            >
              <div className="flex items-start gap-3 p-4">
                {/* Drag handle + posición */}
                <div className="flex flex-col items-center gap-1 flex-shrink-0 pt-1 select-none" style={{ width: '24px' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: '700', color: '#A3A3A3', lineHeight: '1' }}>{idx + 1}</span>
                  <GripVertical className="w-4 h-4" style={{ color: '#C3C3C3' }} />
                </div>

                {/* Imagen */}
                <div className="flex-shrink-0 rounded-lg overflow-hidden" style={{ width: 'clamp(72px, 20vw, 120px)', height: 'clamp(52px, 14vw, 80px)', backgroundColor: '#F3F4F6', border: '1px solid #E5E5E5' }}>
                  {banner.imagen ? (
                    <img src={banner.imagen} alt={banner.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-5 h-5" style={{ color: '#C3C3C3' }} />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="min-w-0" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', fontWeight: '600', color: '#0A0A0A', lineHeight: '1.3', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {banner.titulo}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0" style={{ backgroundColor: banner.activo ? '#DCFCE7' : '#F3F4F6', color: banner.activo ? '#16A34A' : '#737373', fontFamily: 'var(--font-body)' }}>
                      {banner.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                  <p className="hidden sm:block" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', lineHeight: '1.5', marginBottom: '8px' }}>
                    {banner.descripcion}
                  </p>
                  {/* Botón */}
                  <div className="flex items-center gap-1.5 mb-10px">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ backgroundColor: '#F3F4F6', fontFamily: 'var(--font-body)', fontSize: '11px', color: '#6B7280' }}>
                      <Link className="w-3 h-3" />
                      {banner.textoBoton}
                    </span>
                  </div>
                  <div className="flex items-center justify-end flex-wrap gap-2 mt-2" onClick={e => e.stopPropagation()}>
                    <button title="Editar" onClick={() => setView(banner)} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{ backgroundColor: '#F5F5F5', color: '#737373' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#E5E5E5'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#F5F5F5'}><Edit2 className="w-3.5 h-3.5" /></button>
                    <button title={banner.activo ? 'Desactivar' : 'Activar'} onClick={() => setBanners(prev => prev.map(b => b.id === banner.id ? { ...b, activo: !b.activo } : b))} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{ backgroundColor: banner.activo ? '#F0F5EB' : '#F5F5F5', color: banner.activo ? '#3D5E28' : '#A3A3A3' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = banner.activo ? '#E2EDCC' : '#E5E5E5'} onMouseLeave={e => e.currentTarget.style.backgroundColor = banner.activo ? '#F0F5EB' : '#F5F5F5'}>
                      {banner.activo ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                    <button title="Eliminar" onClick={() => setBannerToDelete(banner)} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{ backgroundColor: '#FEF2F2', color: '#EF4444' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FEE2E2'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FEF2F2'}><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modales */}
      {bannerToDelete && (
        <DeleteModal nombre={bannerToDelete.titulo} onConfirm={handleDeleteBanner} onClose={() => setBannerToDelete(null)} />
      )}
      {showLimitModal && (
        <LimitModal onClose={() => setShowLimitModal(false)} />
      )}

      {/* Toasts */}
      {saved && (
        <div className="fixed bottom-6 left-1/2 z-[100] flex items-center gap-3 px-5 py-4 rounded-2xl" style={{ transform: 'translateX(-50%)', backgroundColor: '#0A0A0A', boxShadow: '0 8px 32px rgba(0,0,0,0.28)', minWidth: '320px', maxWidth: '440px' }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#16A34A' }}>
            <CheckCircle className="w-4 h-4" style={{ color: '#FFFFFF' }} />
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: '500', color: '#FFFFFF' }}>{savedLabel}</p>
        </div>
      )}
      {deleted && (
        <div className="fixed bottom-6 left-1/2 z-[100] flex items-center gap-3 px-5 py-4 rounded-2xl" style={{ transform: 'translateX(-50%)', backgroundColor: '#0A0A0A', boxShadow: '0 8px 32px rgba(0,0,0,0.28)', minWidth: '280px' }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#737373' }}>
            <Trash2 className="w-4 h-4" style={{ color: '#FFFFFF' }} />
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: '500', color: '#FFFFFF' }}>Banner eliminado</p>
        </div>
      )}
    </div>
  );
}
