import React, { useState, useRef } from 'react';
import {
  BookOpen, Upload, Trash2, Tag, Globe, EyeOff, Edit2, Eye,
  Plus, Search, Activity, X, Save, Check, AlertCircle, Star,
  Bold, Italic, Link, List, ListOrdered, ArrowLeft, ChevronDown
} from 'lucide-react';

type ImagenRecurso = { id: string; url: string; nombre: string; esPrincipal: boolean };

type Recurso = {
  id: string;
  titulo: string;
  descripcion: string;
  contenido: string;
  topico: string;
  estado: 'activo' | 'inactivo';
  fecha: string;
  imagenes: ImagenRecurso[];
  palabrasClave: string[];
};

const TOPICOS = ['Inversión', 'Legal', 'Mercado', 'Guías', 'Noticias'];

const MOCK: Recurso[] = [
  { id: 'r1', titulo: 'Cómo invertir en parcelas en Chile: guía completa', descripcion: 'Una guía paso a paso para entender el mercado de parcelas y tomar decisiones informadas al momento de invertir.', contenido: '<h2>¿Por qué invertir en parcelas?</h2><p>El mercado de terrenos rurales en Chile ha mostrado un crecimiento sostenido en los últimos años, convirtiéndose en una alternativa sólida frente a otros activos.</p><h3>Factores a considerar</h3><ul><li>Ubicación y accesibilidad</li><li>Regulaciones de uso de suelo</li><li>Infraestructura disponible</li></ul>', topico: 'Inversión', estado: 'activo', fecha: '10 jun 2026', imagenes: [], palabrasClave: ['inversión', 'parcelas', 'terrenos', 'Chile'] },
  { id: 'r2', titulo: 'Aspectos legales que debes conocer antes de comprar un terreno', descripcion: 'Todo lo que necesitas saber sobre escrituras, roles de avalúo y trámites notariales.', contenido: '<h2>Marco legal chileno</h2><p>Antes de comprar un terreno es fundamental entender el marco regulatorio.</p>', topico: 'Legal', estado: 'activo', fecha: '5 jun 2026', imagenes: [], palabrasClave: ['legal', 'escrituras', 'notaría'] },
  { id: 'r3', titulo: 'Mercado inmobiliario rural 2026: tendencias y oportunidades', descripcion: 'Análisis del mercado de terrenos rurales y proyecciones para el segundo semestre del año.', contenido: '<h2>Tendencias 2026</h2><p>El mercado inmobiliario rural muestra señales positivas.</p>', topico: 'Mercado', estado: 'activo', fecha: '1 jun 2026', imagenes: [], palabrasClave: ['mercado', '2026', 'tendencias'] },
  { id: 'r4', titulo: 'Diferencias entre parcela de agrado y agrícola', descripcion: 'Explicamos las principales diferencias legales y prácticas entre estos tipos de terreno.', contenido: '<h2>Parcela de agrado</h2><p>Las parcelas de agrado son terrenos destinados principalmente a uso residencial.</p>', topico: 'Guías', estado: 'inactivo', fecha: '22 may 2026', imagenes: [], palabrasClave: ['agrado', 'agrícola', 'tipos'] },
  { id: 'r5', titulo: 'CTP lanza nueva funcionalidad de reserva online', descripcion: 'Ahora puedes reservar tu parcela directamente desde la plataforma con pago integrado a Mercado Pago.', contenido: '<h2>Nueva funcionalidad</h2><p>CTP presenta su nuevo sistema de reservas online integrado con Mercado Pago.</p>', topico: 'Noticias', estado: 'activo', fecha: '15 may 2026', imagenes: [], palabrasClave: ['CTP', 'reservas', 'Mercado Pago'] },
];

// ─── Editor de recurso (vista completa) ───────────────────────────────────────

interface EditorProps {
  recurso: Recurso | null;
  onBack: () => void;
  onSave: (data: Omit<Recurso, 'id' | 'fecha'>) => void;
}

function RecursoEditor({ recurso, onBack, onSave }: EditorProps) {
  const [formTitulo, setFormTitulo] = useState(recurso?.titulo || '');
  const [formDescripcion, setFormDescripcion] = useState(recurso?.descripcion || '');
  const [formTopico, setFormTopico] = useState(recurso?.topico || 'Inversión');
  const [formEstado, setFormEstado] = useState<'activo' | 'inactivo'>(recurso?.estado || 'activo');
  const [formImagenes, setFormImagenes] = useState<ImagenRecurso[]>(recurso?.imagenes ? [...recurso.imagenes] : []);
  const [formPalabrasClave, setFormPalabrasClave] = useState<string[]>(recurso?.palabrasClave ? [...recurso.palabrasClave] : []);
  const [tagInput, setTagInput] = useState('');
  const [formErrors, setFormErrors] = useState({ titulo: false, descripcion: false });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [vistaPrevia, setVistaPrevia] = useState(false);
  const [currentBlockType, setCurrentBlockType] = useState<'p' | 'h1' | 'h2' | 'h3'>('p');

  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setTimeout(() => {
      if (editorRef.current) editorRef.current.innerHTML = recurso?.contenido || '<p><br></p>';
    }, 60);
  }, []);

  const getEditorContent = () => editorRef.current?.innerHTML || '';
  const imagenPrincipal = formImagenes.find(img => img.esPrincipal) || formImagenes[0];

  const handleSave = () => {
    const errors = { titulo: !formTitulo.trim(), descripcion: !formDescripcion.trim() };
    setFormErrors(errors);
    if (errors.titulo || errors.descripcion) return;
    onSave({ titulo: formTitulo, descripcion: formDescripcion, contenido: getEditorContent(), topico: formTopico, estado: formEstado, imagenes: formImagenes, palabrasClave: formPalabrasClave });
    if (!recurso) {
      setPublishSuccess(true);
    } else {
      setSaveSuccess(true);
      setTimeout(() => { setSaveSuccess(false); onBack(); }, 1200);
    }
  };

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !formPalabrasClave.includes(tag)) setFormPalabrasClave(prev => [...prev, tag]);
    setTagInput('');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setFormImagenes(prev => {
      const nuevas: ImagenRecurso[] = files.map((file, i) => ({
        id: `img-${Date.now()}-${i}`, url: URL.createObjectURL(file), nombre: file.name, esPrincipal: prev.length === 0 && i === 0,
      }));
      const combined = [...prev, ...nuevas];
      if (!combined.some(img => img.esPrincipal) && combined.length > 0) combined[0] = { ...combined[0], esPrincipal: true };
      return combined;
    });
    e.target.value = '';
  };

  const setPrincipal = (id: string) => setFormImagenes(prev => prev.map(img => ({ ...img, esPrincipal: img.id === id })));

  const eliminarImagen = (id: string) => {
    setFormImagenes(prev => {
      const filtered = prev.filter(img => img.id !== id);
      if (filtered.length > 0 && !filtered.some(img => img.esPrincipal)) filtered[0] = { ...filtered[0], esPrincipal: true };
      return filtered;
    });
  };

  const savedRangeRef = React.useRef<Range | null>(null);

  const saveSelectionOnBlur = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && editorRef.current?.contains(sel.anchorNode))
      savedRangeRef.current = sel.getRangeAt(0).cloneRange();
  };

  const execCmd = (cmd: string, value?: string) => { editorRef.current?.focus(); document.execCommand(cmd, false, value); };

  const applyBlock = (tag: 'p' | 'h1' | 'h2' | 'h3') => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    let node: Node | null = range.startContainer;
    while (node && node.parentNode !== editor) node = node.parentNode;
    if (!node || node === editor) return;
    const newEl = document.createElement(tag);
    newEl.innerHTML = (node as HTMLElement).innerHTML || '<br>';
    editor.replaceChild(newEl, node);
    const newRange = document.createRange();
    newRange.selectNodeContents(newEl);
    newRange.collapse(false);
    sel.removeAllRanges();
    sel.addRange(newRange);
    setCurrentBlockType(tag);
  };

  const detectBlockType = () => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || !editorRef.current) return;
    let node: Node | null = sel.getRangeAt(0).startContainer;
    while (node && node.parentNode !== editorRef.current) node = node.parentNode;
    if (node && node.nodeName) {
      const tag = node.nodeName.toLowerCase();
      if (tag === 'h1' || tag === 'h2' || tag === 'h3' || tag === 'p') setCurrentBlockType(tag as 'p' | 'h1' | 'h2' | 'h3');
    }
  };

  const applyFontSize = (size: string) => {
    const editor = editorRef.current;
    if (!editor) return;
    const sel = window.getSelection();
    // Restore selection if lost (because dropdown stole focus)
    if (savedRangeRef.current && (!sel || sel.isCollapsed)) {
      sel?.removeAllRanges();
      sel?.addRange(savedRangeRef.current);
    }
    const currentSel = window.getSelection();
    if (!currentSel || currentSel.rangeCount === 0 || currentSel.isCollapsed) return;
    const range = currentSel.getRangeAt(0);
    const span = document.createElement('span');
    span.style.fontSize = size;
    try { range.surroundContents(span); } catch {
      const contents = range.extractContents();
      span.appendChild(contents);
      range.insertNode(span);
    }
    currentSel.removeAllRanges();
    editor.focus();
  };

  const insertLink = () => {
    const url = window.prompt('URL del enlace:');
    if (url) { editorRef.current?.focus(); document.execCommand('createLink', false, url); }
  };

  return (
    <div className="p-6">
      <style>{`
        .ctp-editor h1{font-size:2rem;font-weight:700;color:#0A0A0A;margin:20px 0 8px;line-height:1.2;letter-spacing:-0.02em}
        .ctp-editor h2{font-size:1.5rem;font-weight:700;color:#0A0A0A;margin:18px 0 6px;line-height:1.3}
        .ctp-editor h3{font-size:1.15rem;font-weight:600;color:#0A0A0A;margin:14px 0 4px;line-height:1.4}
        .ctp-editor p{margin:0 0 10px;color:#3A3A3A;line-height:1.7;font-size:0.9375rem}
        .ctp-editor ul{list-style:disc;padding-left:22px;margin:4px 0 10px;color:#3A3A3A}
        .ctp-editor ol{list-style:decimal;padding-left:22px;margin:4px 0 10px;color:#3A3A3A}
        .ctp-editor li{margin-bottom:4px;line-height:1.6;font-size:0.9375rem}
        .ctp-editor a{color:#006B4E;text-decoration:underline}
        .ctp-editor strong,.ctp-editor b{font-weight:600}
        .ctp-editor em,.ctp-editor i{font-style:italic}
        .ctp-preview h1{font-size:2rem;font-weight:700;color:#0A0A0A;margin:20px 0 8px;line-height:1.2;letter-spacing:-0.02em}
        .ctp-preview h2{font-size:1.5rem;font-weight:700;color:#0A0A0A;margin:18px 0 6px;line-height:1.3}
        .ctp-preview h3{font-size:1.15rem;font-weight:600;color:#0A0A0A;margin:14px 0 4px;line-height:1.4}
        .ctp-preview p{margin:0 0 10px;color:#3A3A3A;line-height:1.7;font-size:0.9375rem}
        .ctp-preview ul{list-style:disc;padding-left:22px;margin:4px 0 10px}
        .ctp-preview ol{list-style:decimal;padding-left:22px;margin:4px 0 10px}
        .ctp-preview a{color:#006B4E;text-decoration:underline}
        .ctp-preview strong,.ctp-preview b{font-weight:600}
      `}</style>

      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={vistaPrevia ? () => setVistaPrevia(false) : onBack}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors"
            style={{ backgroundColor: '#F5F5F5', color: '#737373', fontFamily: 'var(--font-body)', border: '1px solid #E5E5E5' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#E5E5E5'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#F5F5F5'; }}
          >
            <ArrowLeft className="w-4 h-4" /> {vistaPrevia ? 'Volver a editar' : 'Volver al listado'}
          </button>
          <span style={{ color: '#D5D5D5' }}>/</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>
            {recurso ? 'Editar recurso' : 'Nuevo recurso'}
          </span>
        </div>
      </div>

      {publishSuccess ? (
        /* ── Pantalla de éxito ── */
        <div className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: '#DCFCE7' }}>
            <Check className="w-10 h-10" style={{ color: '#166534' }} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 'var(--font-size-h2)', color: '#0A0A0A', marginBottom: '12px', lineHeight: '1.3' }}>
            ¡Artículo publicado!
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', color: '#737373', lineHeight: '1.65', marginBottom: '32px' }}>
            <strong style={{ color: '#0A0A0A' }}>{formTitulo}</strong> ya está disponible en el portal público de CompraTuParcela.
          </p>
          <div className="flex gap-3">
            <button
              onClick={onBack}
              className="px-5 py-2.5 text-sm transition-all"
              style={{ backgroundColor: '#FFFFFF', color: '#0A0A0A', border: '1.5px solid #DEDEDE', borderRadius: '200px', fontFamily: 'var(--font-body)', fontWeight: 500 }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#F5F5F5'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
            >
              Volver al listado
            </button>
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-all"
              style={{ backgroundColor: '#006B4E', color: '#FFFFFF', borderRadius: '200px', fontFamily: 'var(--font-body)' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#01533E'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#006B4E'; }}
            >
              <Eye className="w-4 h-4" /> Ver artículo
            </button>
          </div>
        </div>
      ) : vistaPrevia ? (
        /* ── Vista previa ── */
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl overflow-hidden mb-8 inline-block w-72" style={{ border: '1px solid #E5E5E5', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div className="h-44 flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#F0F5EB' }}>
              {imagenPrincipal ? <img src={imagenPrincipal.url} alt="" className="w-full h-full object-cover" /> : <BookOpen className="w-10 h-10" style={{ color: '#C5D9A8' }} />}
            </div>
            <div className="p-4">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs mb-2" style={{ backgroundColor: '#F0F5EB', color: '#3D5E28', fontFamily: 'var(--font-body)', fontWeight: '500' }}><Tag className="w-2.5 h-2.5" />{formTopico}</span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: '600', color: '#0A0A0A', lineHeight: '1.4', marginBottom: '4px' }}>{formTitulo || 'Título del recurso'}</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#737373', lineHeight: '1.5' }}>{formDescripcion || 'Descripción corta...'}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#A3A3A3', marginTop: '12px' }}>12 jun 2026</p>
            </div>
          </div>

          <p className="text-xs font-medium uppercase tracking-wider mb-4" style={{ color: '#A3A3A3', fontFamily: 'var(--font-body)' }}>Vista del artículo completo</p>
          {imagenPrincipal && <div className="w-full rounded-2xl overflow-hidden mb-6" style={{ height: '300px' }}><img src={imagenPrincipal.url} alt="" className="w-full h-full object-cover" /></div>}
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs" style={{ backgroundColor: '#F0F5EB', color: '#3D5E28', fontFamily: 'var(--font-body)', fontWeight: '500' }}><Tag className="w-3 h-3" />{formTopico}</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#A3A3A3' }}>12 jun 2026</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: '700', color: '#0A0A0A', lineHeight: '1.3', marginBottom: '12px' }}>{formTitulo || 'Título del recurso'}</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: '#737373', lineHeight: '1.7', marginBottom: '28px', borderBottom: '1px solid #F0F0F0', paddingBottom: '28px' }}>{formDescripcion || 'Descripción corta...'}</p>
          <div className="ctp-preview" dangerouslySetInnerHTML={{ __html: getEditorContent() || '<p style="color:#A3A3A3">El contenido aparecerá aquí...</p>' }} />
          {formPalabrasClave.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-10 pt-6" style={{ borderTop: '1px solid #F0F0F0' }}>
              {formPalabrasClave.map(k => <span key={k} className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: '#F5F5F5', color: '#737373', fontFamily: 'var(--font-body)' }}>#{k}</span>)}
            </div>
          )}
        </div>
      ) : (
        /* ── Formulario ── */
        <div className="flex gap-6 items-start">

          {/* Columna principal */}
          <div className="flex-1 space-y-5">

            {/* Título */}
            <div className="rounded-2xl p-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
              <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: '500', color: '#0A0A0A', display: 'block', marginBottom: '6px' }}>
                Título <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <input type="text" placeholder="Ej: Cómo invertir en parcelas en Chile" value={formTitulo} onChange={e => setFormTitulo(e.target.value)} className="w-full px-4 py-3 rounded-xl outline-none transition-all" style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: '#0A0A0A', backgroundColor: '#FAFAFA', border: `1px solid ${formErrors.titulo ? '#EF4444' : '#E5E5E5'}` }} onFocus={e => { e.target.style.borderColor = '#3D5E28'; e.target.style.backgroundColor = '#FFFFFF'; }} onBlur={e => { e.target.style.borderColor = formErrors.titulo ? '#EF4444' : '#E5E5E5'; e.target.style.backgroundColor = '#FAFAFA'; }} />
              {formErrors.titulo && <p className="mt-1.5 flex items-center gap-1" style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#EF4444' }}><AlertCircle className="w-3 h-3" /> El título es obligatorio</p>}
            </div>

            {/* Descripción corta */}
            <div className="rounded-2xl p-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
              <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: '500', color: '#0A0A0A', display: 'block', marginBottom: '4px' }}>
                Descripción corta <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#A3A3A3', marginBottom: '8px' }}>Aparece en la card del listado público. Máximo ~160 caracteres.</p>
              <textarea placeholder="Breve resumen que aparecerá en la card del recurso..." value={formDescripcion} onChange={e => setFormDescripcion(e.target.value)} rows={3} className="w-full px-4 py-3 rounded-xl outline-none transition-all resize-none" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A', backgroundColor: '#FAFAFA', border: `1px solid ${formErrors.descripcion ? '#EF4444' : '#E5E5E5'}`, lineHeight: '1.65' }} onFocus={e => { e.target.style.borderColor = '#3D5E28'; e.target.style.backgroundColor = '#FFFFFF'; }} onBlur={e => { e.target.style.borderColor = formErrors.descripcion ? '#EF4444' : '#E5E5E5'; e.target.style.backgroundColor = '#FAFAFA'; }} />
              {formErrors.descripcion && <p className="mt-1.5 flex items-center gap-1" style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#EF4444' }}><AlertCircle className="w-3 h-3" /> La descripción es obligatoria</p>}
            </div>

            {/* Editor de contenido */}
            <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
              <div className="px-6 pt-5 pb-0">
                <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: '500', color: '#0A0A0A', display: 'block', marginBottom: '10px' }}>Contenido del artículo</label>
              </div>

              {/* Toolbar */}
              <div className="flex items-center gap-1 px-4 py-2 flex-wrap" style={{ backgroundColor: '#F8F8F8', borderTop: '1px solid #F0F0F0', borderBottom: '1px solid #F0F0F0' }}>
                {/* Jerarquía de bloques */}
                {([
                  { label: 'P', title: 'Párrafo', tag: 'p' as const },
                  { label: 'H1', title: 'Título 1', tag: 'h1' as const },
                  { label: 'H2', title: 'Título 2', tag: 'h2' as const },
                  { label: 'H3', title: 'Título 3', tag: 'h3' as const },
                ]).map(btn => (
                  <button
                    key={btn.label}
                    title={btn.title}
                    onMouseDown={e => { e.preventDefault(); applyBlock(btn.tag); }}
                    className="px-2 py-1 rounded text-xs font-medium transition-colors"
                    style={{ fontFamily: 'var(--font-body)', color: currentBlockType === btn.tag ? '#0A0A0A' : '#737373', backgroundColor: currentBlockType === btn.tag ? '#E5E5E5' : 'transparent', minWidth: '32px' }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#E5E5E5'; e.currentTarget.style.color = '#0A0A0A'; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = currentBlockType === btn.tag ? '#E5E5E5' : 'transparent'; e.currentTarget.style.color = currentBlockType === btn.tag ? '#0A0A0A' : '#737373'; }}
                  >
                    {btn.label}
                  </button>
                ))}
                <div className="w-px h-5 mx-1" style={{ backgroundColor: '#D5D5D5' }} />
                {/* Tamaño de fuente */}
                <select
                  title="Tamaño de texto"
                  onMouseDown={e => e.stopPropagation()}
                  onChange={e => { if (e.target.value) { applyFontSize(e.target.value); e.target.value = ''; } }}
                  defaultValue=""
                  className="rounded text-xs outline-none cursor-pointer"
                  style={{ height: '26px', padding: '0 4px', fontFamily: 'var(--font-body)', color: '#737373', backgroundColor: 'transparent', border: '1px solid #E5E5E5', maxWidth: '90px' }}
                >
                  <option value="" disabled>Tamaño</option>
                  <option value="0.75rem">Pequeño</option>
                  <option value="0.9375rem">Normal</option>
                  <option value="1.125rem">Grande</option>
                  <option value="1.375rem">Muy grande</option>
                </select>
                <div className="w-px h-5 mx-1" style={{ backgroundColor: '#D5D5D5' }} />
                <button title="Negrita" onMouseDown={e => { e.preventDefault(); execCmd('bold'); }} className="w-7 h-7 rounded flex items-center justify-center transition-colors" style={{ color: '#737373' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#E5E5E5'; e.currentTarget.style.color = '#0A0A0A'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#737373'; }}><Bold className="w-3.5 h-3.5" /></button>
                <button title="Cursiva" onMouseDown={e => { e.preventDefault(); execCmd('italic'); }} className="w-7 h-7 rounded flex items-center justify-center transition-colors" style={{ color: '#737373' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#E5E5E5'; e.currentTarget.style.color = '#0A0A0A'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#737373'; }}><Italic className="w-3.5 h-3.5" /></button>
                <div className="w-px h-5 mx-1" style={{ backgroundColor: '#D5D5D5' }} />
                <button title="Insertar enlace" onMouseDown={e => { e.preventDefault(); insertLink(); }} className="w-7 h-7 rounded flex items-center justify-center transition-colors" style={{ color: '#737373' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#E5E5E5'; e.currentTarget.style.color = '#0A0A0A'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#737373'; }}><Link className="w-3.5 h-3.5" /></button>
                <div className="w-px h-5 mx-1" style={{ backgroundColor: '#D5D5D5' }} />
                <button title="Lista con viñetas" onMouseDown={e => { e.preventDefault(); execCmd('insertUnorderedList'); }} className="w-7 h-7 rounded flex items-center justify-center transition-colors" style={{ color: '#737373' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#E5E5E5'; e.currentTarget.style.color = '#0A0A0A'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#737373'; }}><List className="w-3.5 h-3.5" /></button>
                <button title="Lista numerada" onMouseDown={e => { e.preventDefault(); execCmd('insertOrderedList'); }} className="w-7 h-7 rounded flex items-center justify-center transition-colors" style={{ color: '#737373' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#E5E5E5'; e.currentTarget.style.color = '#0A0A0A'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#737373'; }}><ListOrdered className="w-3.5 h-3.5" /></button>
              </div>

              {/* Área editable */}
              <div ref={editorRef} contentEditable suppressContentEditableWarning className="ctp-editor outline-none" style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#0A0A0A', padding: '20px 24px', minHeight: '320px', lineHeight: '1.7' }} onMouseUp={detectBlockType} onKeyUp={detectBlockType} onBlur={saveSelectionOnBlur} />
              <div className="px-6 pb-4">
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#A3A3A3' }}>Selecciona texto y usa la barra para aplicar formato. Coloca el cursor en un párrafo y presiona P / H2 / H3 para cambiar el tipo de bloque.</p>
              </div>
            </div>
          </div>

          {/* Sidebar derecho */}
          <div className="flex-shrink-0 space-y-4" style={{ width: '300px' }}>

            {/* Tópico + Estado */}
            <div className="rounded-2xl p-5 space-y-4" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
              <div>
                <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: '500', color: '#0A0A0A', display: 'block', marginBottom: '6px' }}>Tópico</label>
                <select value={formTopico} onChange={e => setFormTopico(e.target.value)} className="w-full px-3 py-2.5 rounded-xl outline-none cursor-pointer" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A', backgroundColor: '#FAFAFA', border: '1px solid #E5E5E5' }}>
                  {TOPICOS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: '500', color: '#0A0A0A', display: 'block', marginBottom: '8px' }}>Estado</label>
                <div className="flex rounded-xl overflow-hidden" style={{ border: '1px solid #E5E5E5' }}>
                  <button onClick={() => setFormEstado('activo')} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm transition-colors" style={{ fontFamily: 'var(--font-body)', backgroundColor: formEstado === 'activo' ? '#DCFCE7' : '#FFFFFF', color: formEstado === 'activo' ? '#166534' : '#737373', fontWeight: formEstado === 'activo' ? '600' : 'normal', borderRight: '1px solid #E5E5E5' }}>
                    <Globe className="w-3.5 h-3.5" /> Activo
                  </button>
                  <button onClick={() => setFormEstado('inactivo')} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm transition-colors" style={{ fontFamily: 'var(--font-body)', backgroundColor: formEstado === 'inactivo' ? '#F5F5F5' : '#FFFFFF', color: formEstado === 'inactivo' ? '#0A0A0A' : '#737373', fontWeight: formEstado === 'inactivo' ? '600' : 'normal' }}>
                    <EyeOff className="w-3.5 h-3.5" /> Inactivo
                  </button>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#A3A3A3', marginTop: '6px' }}>{formEstado === 'activo' ? 'Visible en el portal público.' : 'No visible en el portal público.'}</p>
              </div>
            </div>

            {/* Palabras clave */}
            <div className="rounded-2xl p-5" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
              <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: '500', color: '#0A0A0A', display: 'block', marginBottom: '6px' }}>Palabras clave (SEO)</label>
              <div className="flex gap-2">
                <input type="text" placeholder="Ej: inversión" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(); } }} className="flex-1 px-3 py-2 rounded-xl outline-none text-sm" style={{ fontFamily: 'var(--font-body)', color: '#0A0A0A', backgroundColor: '#FAFAFA', border: '1px solid #E5E5E5' }} onFocus={e => { e.target.style.borderColor = '#3D5E28'; }} onBlur={e => { e.target.style.borderColor = '#E5E5E5'; }} />
                <button onClick={addTag} className="px-3 py-2 rounded-xl" style={{ backgroundColor: '#F0F5EB', border: '1px solid #C5D9A8', color: '#3D5E28' }}><Plus className="w-4 h-4" /></button>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#A3A3A3', marginTop: '4px' }}>Enter o coma para agregar</p>
              {formPalabrasClave.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {formPalabrasClave.map(k => (
                    <span key={k} className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs" style={{ backgroundColor: '#F0F5EB', color: '#3D5E28', fontFamily: 'var(--font-body)' }}>
                      #{k}
                      <button onClick={() => setFormPalabrasClave(prev => prev.filter(p => p !== k))} className="hover:opacity-70"><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Imágenes */}
            <div className="rounded-2xl p-5" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
              <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: '500', color: '#0A0A0A', display: 'block', marginBottom: '6px' }}>
                Imágenes
                {formImagenes.length > 0 && <span style={{ fontWeight: 'normal', color: '#A3A3A3', marginLeft: '6px' }}>{formImagenes.length} subida{formImagenes.length !== 1 ? 's' : ''}</span>}
              </label>
              <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
              <button onClick={() => fileInputRef.current?.click()} className="w-full rounded-xl flex items-center justify-center gap-2 py-3 transition-colors" style={{ border: '2px dashed #C5D9A8', backgroundColor: '#F0F5EB', color: '#3D5E28', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: '500' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#E2EDCC'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#F0F5EB'; }}>
                <Upload className="w-4 h-4" />
                {formImagenes.length > 0 ? 'Agregar más imágenes' : 'Subir imágenes'}
              </button>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#A3A3A3', marginTop: '4px' }}>PNG, JPG o WEBP · Máx 5 MB · La imagen principal aparece en la card</p>
              {formImagenes.length > 0 && (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {formImagenes.map(img => (
                    <div key={img.id} className="relative rounded-xl overflow-hidden group" style={{ aspectRatio: '4/3', border: img.esPrincipal ? '2px solid #3D5E28' : '2px solid #E5E5E5' }}>
                      <img src={img.url} alt={img.nombre} className="w-full h-full object-cover" />
                      {img.esPrincipal && (
                        <div className="absolute top-1.5 left-1.5 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full" style={{ backgroundColor: '#3D5E28', color: '#FFFFFF', fontSize: '10px', fontFamily: 'var(--font-body)', fontWeight: '600' }}>
                          <Star className="w-2.5 h-2.5" /> Principal
                        </div>
                      )}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-1.5" style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}>
                        {!img.esPrincipal && (
                          <button onClick={() => setPrincipal(img.id)} className="flex items-center gap-0.5 px-1.5 py-1 rounded-lg text-xs" style={{ backgroundColor: '#3D5E28', color: '#FFFFFF', fontFamily: 'var(--font-body)' }}>
                            <Star className="w-3 h-3" /> Principal
                          </button>
                        )}
                        <button onClick={() => eliminarImagen(img.id)} className="w-7 h-7 rounded-lg flex items-center justify-center ml-auto" style={{ backgroundColor: '#EF4444', color: '#FFFFFF' }}>
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer de acciones */}
      {!publishSuccess && <div className="flex items-center justify-end gap-3 pt-6 mt-6" style={{ borderTop: '1px solid #E5E5E5', position: 'sticky', bottom: 0, backgroundColor: '#FAFAFA', marginLeft: '-24px', marginRight: '-24px', paddingLeft: '24px', paddingRight: '24px' }}>
        <button onClick={() => setVistaPrevia(v => !v)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all" style={{ backgroundColor: vistaPrevia ? '#F0F5EB' : '#F5F5F5', border: `1px solid ${vistaPrevia ? '#C5D9A8' : '#E5E5E5'}`, color: vistaPrevia ? '#3D5E28' : '#737373', fontFamily: 'var(--font-body)' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = vistaPrevia ? '#E2EDCC' : '#E5E5E5'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = vistaPrevia ? '#F0F5EB' : '#F5F5F5'; }}>
          <Eye className="w-3.5 h-3.5" /> {vistaPrevia ? 'Volver a editar' : 'Vista previa'}
        </button>
        <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-all" style={{ backgroundColor: saveSuccess ? '#166534' : '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)', borderRadius: '200px' }} onMouseEnter={e => { if (!saveSuccess) e.currentTarget.style.backgroundColor = '#01533E'; }} onMouseLeave={e => { if (!saveSuccess) e.currentTarget.style.backgroundColor = saveSuccess ? '#166534' : '#006B4E'; }}>
          {saveSuccess ? <><Check className="w-4 h-4" /> Guardado</> : <><Save className="w-4 h-4" /> {recurso ? 'Guardar cambios' : 'Publicar recurso'}</>}
        </button>
      </div>}
    </div>
  );
}

// ─── Módulo principal (listado) ───────────────────────────────────────────────

export function AdminRecursosModule() {
  const [recursos, setRecursos] = useState<Recurso[]>(MOCK);
  const [recursosLoading, setRecursosLoading] = useState(false);
  const [recursosSearch, setRecursosSearch] = useState('');
  const [filtroTopico, setFiltroTopico] = useState('todos');
  const [filtroEstado, setFiltroEstado] = useState<'todos' | 'activo' | 'inactivo'>('todos');
  const [editorView, setEditorView] = useState<'list' | 'create' | Recurso>('list');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const toggleEstado = (id: string) => {
    setRecursos(prev => prev.map(r => r.id === id ? { ...r, estado: r.estado === 'activo' ? 'inactivo' : 'activo' } : r));
  };

  const eliminar = (id: string) => {
    setRecursos(prev => prev.filter(r => r.id !== id));
    setDeleteConfirmId(null);
  };

  const handleSave = (data: Omit<Recurso, 'id' | 'fecha'>) => {
    if (typeof editorView === 'object') {
      setRecursos(prev => prev.map(r => r.id === editorView.id ? { ...r, ...data } : r));
      setEditorView('list'); // edición: vuelve al listado inmediatamente
    } else {
      setRecursos(prev => [{ id: `r${Date.now()}`, fecha: '12 jun 2026', ...data }, ...prev]);
      // artículo nuevo: NO redirige — el RecursoEditor muestra la pantalla de éxito
      // y llama onBack() cuando el usuario decide salir
    }
  };

  const filtrados = recursos.filter(r => {
    const matchSearch = r.titulo.toLowerCase().includes(recursosSearch.toLowerCase());
    const matchTopico = filtroTopico === 'todos' || r.topico === filtroTopico;
    const matchEstado = filtroEstado === 'todos' || r.estado === filtroEstado;
    return matchSearch && matchTopico && matchEstado;
  });

  // Mostrar editor si corresponde
  if (editorView !== 'list') {
    return (
      <RecursoEditor
        recurso={typeof editorView === 'object' ? editorView : null}
        onBack={() => setEditorView('list')}
        onSave={handleSave}
      />
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 'var(--font-weight-regular)',
          fontSize: 'var(--font-size-h2)',
          lineHeight: 'var(--line-height-heading)',
          color: '#0A0A0A',
          marginBottom: '8px'
        }}>
          Recursos &amp; Blog
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-body-base)',
          color: '#737373'
        }}>
          Gestiona los artículos, guías y contenido editorial de la plataforma
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#A3A3A3' }} />
          <input type="text" placeholder="Buscar recurso..." value={recursosSearch} onChange={e => setRecursosSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', fontFamily: 'var(--font-body)', color: '#0A0A0A' }} />
        </div>
        <div className="relative">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: '#737373' }} />
          <select value={filtroTopico} onChange={e => setFiltroTopico(e.target.value)} className="appearance-none pl-10 pr-9 py-2.5 rounded-full text-sm outline-none cursor-pointer" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', fontFamily: 'var(--font-body)', color: '#0A0A0A', minWidth: '160px' }}>
            <option value="todos">Todos los tópicos</option>
            {TOPICOS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: '#737373' }} />
        </div>
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: '#737373' }} />
          <select value={filtroEstado} onChange={e => setFiltroEstado(e.target.value as typeof filtroEstado)} className="appearance-none pl-10 pr-9 py-2.5 rounded-full text-sm outline-none cursor-pointer" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', fontFamily: 'var(--font-body)', color: '#0A0A0A', minWidth: '150px' }}>
            <option value="todos">Todos los estados</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: '#737373' }} />
        </div>
        <button onClick={() => setEditorView('create')} className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-all flex-shrink-0" style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)', borderRadius: '200px' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#01533E'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#006B4E'; }}>
          <Plus className="w-4 h-4" /> Nuevo recurso
        </button>
      </div>

      {/* Lista */}
      <section className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
        <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #F0F0F0' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>{filtrados.length} recurso{filtrados.length !== 1 ? 's' : ''}</p>
          <button onClick={() => { setRecursosLoading(true); setTimeout(() => setRecursosLoading(false), 1400); }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all" style={{ backgroundColor: '#F0F5EB', border: '1px solid #C5D9A8', color: '#3D5E28', fontFamily: 'var(--font-body)' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#E2EDCC'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#F0F5EB'; }}>
            <Activity className={`w-3.5 h-3.5 ${recursosLoading ? 'animate-spin' : ''}`} /> Actualizar
          </button>
        </div>

        {recursosLoading ? (
          <div className="divide-y divide-gray-50">
            {[1,2,3,4].map(i => (
              <div key={i} className="px-6 py-4 flex items-center gap-4 animate-pulse">
                <div className="w-14 h-14 rounded-xl flex-shrink-0" style={{ backgroundColor: '#F0F0F0' }} />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 rounded-full w-2/3" style={{ backgroundColor: '#F0F0F0' }} />
                  <div className="h-3 rounded-full w-1/3" style={{ backgroundColor: '#F5F5F5' }} />
                </div>
                <div className="h-6 w-16 rounded-full" style={{ backgroundColor: '#F0F0F0' }} />
                <div className="h-6 w-20 rounded-full" style={{ backgroundColor: '#F5F5F5' }} />
                <div className="flex gap-2">{[1,2,3].map(j => <div key={j} className="h-8 w-8 rounded-lg" style={{ backgroundColor: '#F0F0F0' }} />)}</div>
              </div>
            ))}
          </div>
        ) : filtrados.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: '#F0F5EB' }}>
              <BookOpen className="w-8 h-8" style={{ color: '#3D5E28' }} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h4)', fontWeight: '500', color: '#0A0A0A', marginBottom: '8px' }}>
              {recursosSearch || filtroTopico !== 'todos' || filtroEstado !== 'todos' ? 'Sin resultados' : 'Aún no hay recursos publicados'}
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', marginBottom: '24px', maxWidth: '360px' }}>
              {recursosSearch || filtroTopico !== 'todos' || filtroEstado !== 'todos' ? 'Probá con otros filtros.' : 'Creá tu primer recurso para que aparezca en el portal público.'}
            </p>
            {!(recursosSearch || filtroTopico !== 'todos' || filtroEstado !== 'todos') && (
              <button onClick={() => setEditorView('create')} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium" style={{ backgroundColor: '#3D5E28', color: '#FFFFFF', fontFamily: 'var(--font-body)' }}>
                <Plus className="w-4 h-4" /> Crear primer recurso
              </button>
            )}
          </div>
        ) : (
          <div>
            <div className="hidden md:grid px-6 py-3" style={{ gridTemplateColumns: '1fr 110px 100px 110px 124px', gap: '16px', borderBottom: '1px solid #F5F5F5' }}>
              {['Recurso', 'Tópico', 'Estado', 'Publicado', 'Acciones'].map(col => (
                <span key={col} style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: '500', color: '#A3A3A3', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{col}</span>
              ))}
            </div>
            {filtrados.map((recurso, idx) => {
              const imgPpal = recurso.imagenes.find(img => img.esPrincipal) || recurso.imagenes[0];
              return (
                <div key={recurso.id} className="px-6 py-4 flex flex-col md:grid md:items-center gap-3 md:gap-4 transition-colors" style={{ gridTemplateColumns: '1fr 110px 100px 110px 124px', backgroundColor: '#FFFFFF', borderBottom: idx < filtrados.length - 1 ? '1px solid #F5F5F5' : 'none' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#FAFAFA'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#FFFFFF'; }}>
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-14 h-14 rounded-xl flex-shrink-0 overflow-hidden" style={{ border: '1px solid #E5E5E5' }}>
                      {imgPpal ? <img src={imgPpal.url} alt={recurso.titulo} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: '#F0F5EB' }}><BookOpen className="w-6 h-6" style={{ color: '#3D5E28' }} /></div>}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: '500', color: '#0A0A0A' }}>{recurso.titulo}</p>
                      <p className="truncate mt-0.5" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#737373' }}>{recurso.descripcion.substring(0, 75)}...</p>
                      {recurso.palabrasClave.length > 0 && (
                        <div className="flex gap-1 mt-1 flex-wrap">
                          {recurso.palabrasClave.slice(0, 3).map(k => <span key={k} className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: '#F5F5F5', color: '#737373', fontFamily: 'var(--font-body)' }}>{k}</span>)}
                          {recurso.palabrasClave.length > 3 && <span className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: '#F5F5F5', color: '#A3A3A3', fontFamily: 'var(--font-body)' }}>+{recurso.palabrasClave.length - 3}</span>}
                        </div>
                      )}
                    </div>
                  </div>
                  <div><span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs" style={{ backgroundColor: '#F0F5EB', color: '#3D5E28', fontFamily: 'var(--font-body)', fontWeight: '500' }}><Tag className="w-3 h-3" />{recurso.topico}</span></div>
                  <div>
                    {recurso.estado === 'activo'
                      ? <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs" style={{ backgroundColor: '#DCFCE7', color: '#166534', fontFamily: 'var(--font-body)', fontWeight: '500' }}><Globe className="w-3 h-3" />Activo</span>
                      : <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs" style={{ backgroundColor: '#F5F5F5', color: '#737373', fontFamily: 'var(--font-body)', fontWeight: '500' }}><EyeOff className="w-3 h-3" />Inactivo</span>
                    }
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#A3A3A3' }}>{recurso.fecha}</p>
                  <div className="flex items-center gap-2">
                    <button title="Editar" onClick={() => setEditorView(recurso)} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{ backgroundColor: '#F5F5F5', color: '#737373' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#E5E5E5'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#F5F5F5'; }}><Edit2 className="w-3.5 h-3.5" /></button>
                    <button title={recurso.estado === 'activo' ? 'Desactivar' : 'Activar'} onClick={() => toggleEstado(recurso.id)} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{ backgroundColor: recurso.estado === 'activo' ? '#F0F5EB' : '#F5F5F5', color: recurso.estado === 'activo' ? '#3D5E28' : '#A3A3A3' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = recurso.estado === 'activo' ? '#E2EDCC' : '#E5E5E5'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = recurso.estado === 'activo' ? '#F0F5EB' : '#F5F5F5'; }}>
                      {recurso.estado === 'activo' ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>
                    <button title="Eliminar" onClick={() => setDeleteConfirmId(recurso.id)} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{ backgroundColor: '#FEF2F2', color: '#EF4444' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#FEE2E2'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#FEF2F2'; }}><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Modal eliminar */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="w-full max-w-sm rounded-2xl" style={{ backgroundColor: '#FFFFFF', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <div className="p-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: '#FEF2F2' }}>
                <Trash2 className="w-6 h-6" style={{ color: '#EF4444' }} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h4)', fontWeight: '500', color: '#0A0A0A', marginBottom: '8px' }}>¿Eliminar este recurso?</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', lineHeight: 'var(--line-height-body)', marginBottom: '24px' }}>Esta acción no se puede deshacer. El recurso dejará de estar disponible en el portal público de forma inmediata.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirmId(null)} className="flex-1 py-2.5 rounded-xl text-sm transition-colors" style={{ fontFamily: 'var(--font-body)', fontWeight: '500', color: '#0A0A0A', backgroundColor: '#F5F5F5', border: '1px solid #E5E5E5' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#E5E5E5'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#F5F5F5'; }}>Cancelar</button>
                <button onClick={() => eliminar(deleteConfirmId)} className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors" style={{ fontFamily: 'var(--font-body)', color: '#FFFFFF', backgroundColor: '#EF4444' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#DC2626'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#EF4444'; }}>Sí, eliminar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
