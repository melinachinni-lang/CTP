import { useState } from 'react';
import {
  Sparkles, AlertTriangle, AlertCircle, Info, TrendingUp, FileText, Camera,
  BarChart3, ChevronDown, ChevronUp, ExternalLink, Settings, RefreshCw,
  ArrowRight, Shield, Zap, Target, CheckCircle2, X, Clock,
  Image as ImageIcon, Upload, Eye, MapPin, Phone,
} from 'lucide-react';

type Priority = 'alta' | 'media' | 'baja';
type Category = 'precio' | 'descripcion' | 'imagenes' | 'informacion' | 'rendimiento';
type ScoringLevel = 'conservador' | 'medio' | 'agresivo';
type FilterTab = 'todos' | Priority;

interface Publicacion {
  titulo: string;
  tipo: 'parcela' | 'proyecto';
  ubicacion: string;
}

interface Insight {
  id: string;
  priority: Priority;
  category: Category;
  title: string;
  description: string;
  razon: string;
  publicacion?: Publicacion;
  accion: string;
  impacto: string;
}

interface AdminInsightsModuleProps {
  onNavigate?: (nav: string) => void;
}

const INSIGHTS: Insight[] = [
  {
    id: '1',
    priority: 'alta',
    category: 'precio',
    title: 'El precio está un 18% sobre el mercado en tu zona',
    description: 'El precio por m² de esta parcela está significativamente por encima de publicaciones similares en la misma región, lo que puede estar reduciendo tu tasa de consultas.',
    razon: 'Comparamos el precio por m² con 47 publicaciones activas en un radio de 30 km con características similares (superficie, acceso, servicios). El promedio de mercado es $450.000/m² y esta publicación está en $532.000/m².',
    publicacion: { titulo: 'Parcela Los Nogales', tipo: 'parcela', ubicacion: 'Maule' },
    accion: 'Revisar precio',
    impacto: 'Podría aumentar consultas hasta un 40%',
  },
  {
    id: '2',
    priority: 'alta',
    category: 'imagenes',
    title: 'Solo 2 fotos — necesitas al menos 8 para destacar',
    description: 'Las publicaciones con 8 o más fotos generan en promedio 3 veces más consultas. Los compradores necesitan ver el terreno para decidir si contactar.',
    razon: 'Analizamos el comportamiento de 1.200 publicaciones activas en los últimos 90 días. La correlación entre cantidad de fotos y consultas es consistente en todas las regiones.',
    publicacion: { titulo: 'Parcela Río Claro', tipo: 'parcela', ubicacion: 'Región de O\'Higgins' },
    accion: 'Añadir imágenes',
    impacto: 'Alto potencial — impacto inmediato',
  },
  {
    id: '3',
    priority: 'alta',
    category: 'rendimiento',
    title: '45 días sin consultas — esta publicación necesita atención',
    description: 'Esta parcela lleva más de 6 semanas sin recibir ninguna consulta ni interacción. El promedio en tu zona es de 3 a 5 contactos por mes para propiedades similares.',
    razon: 'El sistema monitorea la actividad de cada publicación semanalmente. Una publicación sin interacciones durante 30+ días activa esta alerta automáticamente.',
    publicacion: { titulo: 'Parcela Vista Cordillera', tipo: 'parcela', ubicacion: 'Los Ríos' },
    accion: 'Ver publicación',
    impacto: 'Urgente — revisar visibilidad',
  },
  {
    id: '4',
    priority: 'media',
    category: 'descripcion',
    title: 'Descripción demasiado corta para este tipo de publicación',
    description: 'La descripción actual tiene menos de 80 palabras. Una descripción detallada con atributos clave mejora el posicionamiento y genera más confianza en el comprador.',
    razon: 'Las publicaciones con 300 o más palabras tienen un 65% mayor tasa de conversión. Los compradores necesitan contexto antes de decidir contactar.',
    publicacion: { titulo: 'Proyecto Campos del Sur', tipo: 'proyecto', ubicacion: 'Biobío' },
    accion: 'Editar descripción',
    impacto: 'Mejora de posicionamiento y confianza',
  },
  {
    id: '5',
    priority: 'media',
    category: 'informacion',
    title: 'Faltan datos clave: superficie y tipo de acceso',
    description: 'Esta publicación no tiene declarada la superficie total ni el tipo de acceso al terreno, los dos filtros más usados por compradores antes de contactar.',
    razon: 'El 78% de los usuarios aplica el filtro de superficie antes de contactar. Sin este dato, la publicación no aparece en la mayoría de búsquedas filtradas.',
    publicacion: { titulo: 'Parcela El Manzanar', tipo: 'parcela', ubicacion: 'Maule' },
    accion: 'Completar información',
    impacto: 'Mejora de visibilidad en búsquedas filtradas',
  },
  {
    id: '6',
    priority: 'media',
    category: 'precio',
    title: 'Oportunidad: los precios en tu zona subieron 8% este mes',
    description: 'El mercado de parcelas en la Región del Maule experimentó un alza significativa. Podrías revisar y actualizar los precios de tus publicaciones activas.',
    razon: 'Análisis de 230 publicaciones activas en la región comparadas mes a mes. El alza es consistente en parcelas de 5.000 a 20.000 m² con acceso vial.',
    accion: 'Ver análisis de mercado',
    impacto: 'Oportunidad de valorización',
  },
  {
    id: '7',
    priority: 'baja',
    category: 'descripcion',
    title: 'Agrega palabras clave para mejorar visibilidad en búsquedas',
    description: 'Los términos más buscados en tu zona no aparecen en la descripción de esta publicación. Incluirlos puede mejorar su aparición en resultados de búsqueda.',
    razon: 'Analizamos los términos de búsqueda más frecuentes de los últimos 60 días en tu región. "acceso pavimentado", "agua de pozo" e "ideal para inversión" tienen alto volumen y no están en tu descripción.',
    publicacion: { titulo: 'Parcela Los Álamos', tipo: 'parcela', ubicacion: 'Ñuble' },
    accion: 'Editar descripción',
    impacto: 'Mejora leve de visibilidad en búsquedas',
  },
];

const PRIORITY_CONFIG: Record<Priority, { label: string; color: string; bgColor: string; borderColor: string; badgeBg: string; icon: React.ElementType }> = {
  alta:  { label: 'Alta prioridad',  color: '#B91C1C', bgColor: '#FEF2F2', borderColor: '#DC2626', badgeBg: '#FEE2E2', icon: AlertTriangle },
  media: { label: 'Media prioridad', color: '#92400E', bgColor: '#FFFBEB', borderColor: '#D97706', badgeBg: '#FEF3C7', icon: AlertCircle },
  baja:  { label: 'Baja prioridad',  color: '#1D4ED8', bgColor: '#EFF6FF', borderColor: '#3B82F6', badgeBg: '#DBEAFE', icon: Info },
};

const CATEGORY_CONFIG: Record<Category, { label: string; icon: React.ElementType }> = {
  precio:       { label: 'Precio',       icon: TrendingUp },
  descripcion:  { label: 'Descripción',  icon: FileText },
  imagenes:     { label: 'Imágenes',     icon: Camera },
  informacion:  { label: 'Información',  icon: Info },
  rendimiento:  { label: 'Rendimiento',  icon: BarChart3 },
};

const SCORING_OPTIONS: { key: ScoringLevel; label: string; icon: React.ElementType; description: string; count: number; color: string }[] = [
  {
    key: 'conservador',
    label: 'Conservador',
    icon: Shield,
    description: 'Solo muestra insights de alto impacto comprobado. Menos notificaciones, mayor certeza.',
    count: 3,
    color: '#3B82F6',
  },
  {
    key: 'medio',
    label: 'Medio',
    icon: Target,
    description: 'Balance entre sensibilidad y relevancia. Muestra insights de alta y media prioridad.',
    count: 5,
    color: '#006B4E',
  },
  {
    key: 'agresivo',
    label: 'Agresivo',
    icon: Zap,
    description: 'Muestra todos los insights detectados, incluyendo oportunidades menores.',
    count: 7,
    color: '#D97706',
  },
];

export function AdminInsightsModule({ onNavigate }: AdminInsightsModuleProps) {
  const [filterTab, setFilterTab]         = useState<FilterTab>('todos');
  const [expandedRazon, setExpandedRazon] = useState<string | null>(null);
  const [scoringLevel, setScoringLevel]   = useState<ScoringLevel>('medio');
  const [showScoringConfig, setShowScoringConfig] = useState(false);
  const [isLoading, setIsLoading]         = useState(false);
  const [showEmpty, setShowEmpty]         = useState(false);
  const [drawerInsight, setDrawerInsight] = useState<Insight | null>(null);
  const [keywords, setKeywords]           = useState<string[]>([]);

  const allInsights      = showEmpty ? [] : INSIGHTS;
  const filteredInsights = allInsights.filter(i => filterTab === 'todos' || i.priority === filterTab);
  const altaCount        = INSIGHTS.filter(i => i.priority === 'alta').length;
  const mediaCount       = INSIGHTS.filter(i => i.priority === 'media').length;
  const bajaCount        = INSIGHTS.filter(i => i.priority === 'baja').length;
  const afectadas        = new Set(INSIGHTS.filter(i => i.publicacion).map(i => i.publicacion!.titulo)).size;

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1800);
  };

  const handleInsightAction = (insight: Insight) => {
    if (insight.accion === 'Ver análisis de mercado') {
      onNavigate?.('analitica');
    } else {
      setDrawerInsight(insight);
    }
  };

  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: 'todos', label: 'Todos',          count: allInsights.length },
    { key: 'alta',  label: 'Alta prioridad', count: altaCount },
    { key: 'media', label: 'Media',          count: mediaCount },
    { key: 'baja',  label: 'Baja',           count: bajaCount },
  ];

  /* ── DRAWER CONTENT ── */
  const renderDrawerContent = (insight: Insight) => {
    if (insight.category === 'precio') {
      return (
        <div>
          <div className="flex items-start gap-2.5 p-4 rounded-xl mb-5"
            style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA' }}>
            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#DC2626' }} />
            <div>
              <p className="text-sm font-semibold mb-0.5" style={{ color: '#B91C1C' }}>18% sobre el promedio de mercado</p>
              <p className="text-xs" style={{ color: '#DC2626' }}>Precio actual: $532.000/m² · Promedio zona: $450.000/m²</p>
            </div>
          </div>

          <p className="text-xs font-semibold mb-3" style={{ color: '#737373' }}>Comparación con el mercado</p>
          <div className="space-y-3 mb-6">
            {[
              { label: 'Tu precio actual', value: 532, max: 600, color: '#DC2626' },
              { label: 'Promedio de zona',  value: 450, max: 600, color: '#006B4E' },
              { label: 'Rango sugerido',    value: 455, max: 600, color: '#3B82F6' },
            ].map(item => (
              <div key={item.label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span style={{ color: '#737373' }}>{item.label}</span>
                  <span className="font-semibold" style={{ color: item.color }}>${item.value.toLocaleString('es-CL')}.000/m²</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#F0F0F0' }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${(item.value / item.max) * 100}%`, backgroundColor: item.color }} />
                </div>
              </div>
            ))}
          </div>

          <label className="text-xs font-semibold block mb-2" style={{ color: '#0A0A0A' }}>Nuevo precio por m²</label>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-sm font-medium" style={{ color: '#737373' }}>$</span>
            <input
              type="text"
              defaultValue="455.000"
              className="flex-1 px-3 py-2.5 rounded-xl outline-none text-sm font-medium"
              style={{ border: '1px solid #C5D9A8', backgroundColor: '#F0F5EB', color: '#0A0A0A', fontFamily: 'var(--font-body)' }}
            />
            <span className="text-sm" style={{ color: '#737373' }}>/m²</span>
          </div>
          <p className="text-xs mb-6" style={{ color: '#006B4E' }}>Rango recomendado: $445.000 — $465.000/m²</p>

          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm font-semibold"
            style={{ backgroundColor: '#006B4E', color: '#FFFFFF' }}>
            <CheckCircle2 className="w-4 h-4" /> Actualizar precio
          </button>
        </div>
      );
    }

    if (insight.category === 'imagenes') {
      return (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold" style={{ color: '#0A0A0A' }}>Fotos actuales</p>
            <span className="text-xs px-2.5 py-1 rounded-full font-medium"
              style={{ backgroundColor: '#FEE2E2', color: '#B91C1C' }}>2 de 12 recomendadas</span>
          </div>

          <div className="grid grid-cols-4 gap-2 mb-4">
            {[1, 2].map(i => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden flex items-center justify-center"
                style={{ backgroundColor: '#E5E5E5' }}>
                <ImageIcon className="w-5 h-5" style={{ color: '#9CA3AF' }} />
              </div>
            ))}
            {[3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="aspect-square rounded-xl border-2 border-dashed flex items-center justify-center"
                style={{ borderColor: '#C5D9A8' }}>
                <span className="text-xs" style={{ color: '#C5D9A8' }}>+</span>
              </div>
            ))}
          </div>

          <div className="rounded-xl border-2 border-dashed flex flex-col items-center justify-center py-8 mb-6 cursor-pointer transition-colors"
            style={{ borderColor: '#C5D9A8', backgroundColor: '#F9FFF6' }}>
            <Upload className="w-6 h-6 mb-2" style={{ color: '#006B4E' }} />
            <p className="text-sm font-medium mb-1" style={{ color: '#006B4E' }}>Arrastra o selecciona fotos</p>
            <p className="text-xs" style={{ color: '#737373' }}>JPG, PNG · máx. 10 MB por imagen</p>
          </div>

          <div className="flex items-start gap-2 mb-6 p-3 rounded-xl" style={{ backgroundColor: '#F0F5EB' }}>
            <Sparkles className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#006B4E' }} />
            <p className="text-xs leading-relaxed" style={{ color: '#3D5E28' }}>
              Las publicaciones con 8+ fotos generan en promedio <strong>3× más consultas</strong>. Incluye fotos del acceso, la vista y el entorno.
            </p>
          </div>

          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm font-semibold"
            style={{ backgroundColor: '#006B4E', color: '#FFFFFF' }}>
            <Upload className="w-4 h-4" /> Subir imágenes
          </button>
        </div>
      );
    }

    if (insight.category === 'rendimiento') {
      return (
        <div>
          <p className="text-xs font-semibold mb-3" style={{ color: '#737373' }}>Actividad últimos 30 días</p>
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: 'Vistas',    value: 127, color: '#3B82F6' },
              { label: 'Favoritos', value: 3,   color: '#D97706' },
              { label: 'Consultas', value: 0,   color: '#DC2626' },
            ].map(stat => (
              <div key={stat.label} className="rounded-xl p-3 text-center"
                style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E5E5' }}>
                <p className="text-2xl font-bold mb-0.5" style={{ color: stat.color, fontFamily: 'var(--font-heading)' }}>{stat.value}</p>
                <p className="text-xs" style={{ color: '#737373' }}>{stat.label}</p>
              </div>
            ))}
          </div>

          <p className="text-xs font-semibold mb-3" style={{ color: '#737373' }}>Vistas por semana</p>
          <div className="flex items-end gap-1.5 mb-5" style={{ height: '64px' }}>
            {[42, 38, 25, 22].map((v, i) => (
              <div key={i} className="flex-1 rounded-t-md" style={{ height: `${(v / 42) * 100}%`, backgroundColor: i === 3 ? '#E5E5E5' : '#C5D9A8' }} />
            ))}
          </div>
          <div className="flex justify-between text-xs mb-5" style={{ color: '#9CA3AF' }}>
            {['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'].map(l => <span key={l}>{l}</span>)}
          </div>

          <div className="rounded-xl p-4 mb-6" style={{ backgroundColor: '#FFFBEB', border: '1px solid #FDE68A' }}>
            <p className="text-xs font-semibold mb-2" style={{ color: '#92400E' }}>Posibles causas del bajo rendimiento</p>
            <ul className="space-y-1.5">
              {['Solo 2 fotos — los compradores necesitan ver el terreno', 'Precio un 18% sobre el promedio de zona', 'Sin descripción detallada de acceso y servicios'].map(c => (
                <li key={c} className="flex items-start gap-1.5 text-xs" style={{ color: '#92400E' }}>
                  <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: '#D97706' }} />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => { setDrawerInsight(null); onNavigate?.('publicaciones'); }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm font-semibold"
            style={{ backgroundColor: '#006B4E', color: '#FFFFFF' }}
          >
            <Eye className="w-4 h-4" /> Ir a la publicación
          </button>
        </div>
      );
    }

    if (insight.category === 'descripcion') {
      const suggestionKeywords = ['acceso pavimentado', 'agua de pozo', 'ideal para inversión', 'energía eléctrica', 'cerca de Santiago'];
      return (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold" style={{ color: '#0A0A0A' }}>Descripción</label>
            <span className="text-xs" style={{ color: insight.id === '4' ? '#DC2626' : '#737373' }}>
              {insight.id === '4' ? '78 palabras · mínimo recomendado: 300' : '145 palabras · recomendado: 300+'}
            </span>
          </div>

          <textarea
            defaultValue={insight.id === '4'
              ? 'Parcela de 10.000 m² ubicada en la zona rural de Biobío. Acceso por camino de ripio. Ideal para descanso y turismo.'
              : 'Parcela de 8.500 m² en el corazón de Ñuble. Terreno plano con vista a la precordillera. Tranquilidad y naturaleza a solo 2 horas de Santiago. Ideal para construir tu casa de campo o como inversión.'}
            rows={5}
            className="w-full px-3 py-2.5 rounded-xl outline-none text-sm mb-4 resize-none leading-relaxed"
            style={{ border: '1px solid #E5E5E5', color: '#0A0A0A', fontFamily: 'var(--font-body)', fontSize: '13px' }}
          />

          <p className="text-xs font-semibold mb-2.5" style={{ color: '#0A0A0A' }}>
            {insight.id === '4' ? 'Palabras clave sugeridas' : 'Palabras clave más buscadas en tu zona'}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {suggestionKeywords.map(kw => {
              const isAdded = keywords.includes(kw);
              return (
                <button
                  key={kw}
                  onClick={() => setKeywords(prev => isAdded ? prev.filter(k => k !== kw) : [...prev, kw])}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs transition-all"
                  style={{
                    backgroundColor: isAdded ? '#E8F5EE' : '#F5F5F5',
                    color: isAdded ? '#006B4E' : '#737373',
                    border: `1px solid ${isAdded ? '#C5D9A8' : '#E5E5E5'}`,
                    fontWeight: isAdded ? '500' : '400',
                  }}
                >
                  {isAdded ? <CheckCircle2 className="w-3 h-3" /> : <span style={{ fontSize: '10px' }}>+</span>}
                  {kw}
                </button>
              );
            })}
          </div>

          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm font-semibold"
            style={{ backgroundColor: '#006B4E', color: '#FFFFFF' }}>
            <CheckCircle2 className="w-4 h-4" /> Guardar descripción
          </button>
        </div>
      );
    }

    if (insight.category === 'informacion') {
      return (
        <div>
          <div className="flex items-start gap-2.5 p-4 rounded-xl mb-5"
            style={{ backgroundColor: '#FFFBEB', border: '1px solid #FDE68A' }}>
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#D97706' }} />
            <div>
              <p className="text-sm font-semibold mb-0.5" style={{ color: '#92400E' }}>2 campos obligatorios sin completar</p>
              <p className="text-xs" style={{ color: '#D97706' }}>El 78% de los compradores filtra por superficie antes de contactar.</p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: '#0A0A0A' }}>
                Superficie total <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ej: 10.000"
                  className="flex-1 px-3 py-2.5 rounded-xl outline-none text-sm"
                  style={{ border: '1px solid #FDE68A', backgroundColor: '#FFFBEB', color: '#0A0A0A', fontFamily: 'var(--font-body)' }}
                />
                <span className="text-sm font-medium" style={{ color: '#737373' }}>m²</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: '#0A0A0A' }}>
                Tipo de acceso <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <select
                className="w-full appearance-none px-3 py-2.5 rounded-xl outline-none text-sm"
                style={{ border: '1px solid #FDE68A', backgroundColor: '#FFFBEB', color: '#737373', fontFamily: 'var(--font-body)' }}
              >
                <option value="">Selecciona un tipo</option>
                <option>Pavimentado</option>
                <option>Ripio</option>
                <option>Tierra</option>
                <option>Mixto</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: '#0A0A0A' }}>Servicios disponibles</label>
              <div className="flex flex-wrap gap-2">
                {['Agua potable', 'Electricidad', 'Alcantarillado', 'Internet', 'Gas'].map(s => (
                  <label key={s} className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" className="rounded" style={{ accentColor: '#006B4E' }} />
                    <span className="text-xs" style={{ color: '#737373' }}>{s}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm font-semibold"
            style={{ backgroundColor: '#006B4E', color: '#FFFFFF' }}>
            <CheckCircle2 className="w-4 h-4" /> Guardar cambios
          </button>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="p-6 lg:p-8 max-w-screen-xl mx-auto">

      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#E8F5EE' }}>
            <Sparkles className="w-5 h-5" style={{ color: '#006B4E' }} />
          </div>
          <div>
            <h2 className="text-lg font-semibold leading-tight" style={{ color: '#0A0A0A', fontFamily: 'var(--font-heading)' }}>
              Insights y recomendaciones IA
            </h2>
            <div className="flex items-center gap-2 mt-0.5">
              <Clock className="w-3 h-3" style={{ color: '#737373' }} />
              <span className="text-xs" style={{ color: '#737373' }}>Actualizado hace 5 min · {INSIGHTS.length} insights disponibles</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => { setShowEmpty(v => !v); setFilterTab('todos'); }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs transition-all"
            style={{ backgroundColor: '#F5F5F5', color: '#737373', border: '1px solid #E5E5E5' }}
          >
            {showEmpty ? 'Ver con datos' : 'Ver estado vacío'}
          </button>
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs transition-all disabled:opacity-50"
            style={{ backgroundColor: '#F0F5EB', color: '#3D5E28', border: '1px solid #C5D9A8' }}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Actualizando…' : 'Actualizar'}
          </button>
          <button
            onClick={() => setShowScoringConfig(v => !v)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs transition-all"
            style={{
              backgroundColor: showScoringConfig ? '#006B4E' : '#F5F5F5',
              color: showScoringConfig ? '#FFFFFF' : '#0A0A0A',
              border: `1px solid ${showScoringConfig ? '#006B4E' : '#E5E5E5'}`,
            }}
          >
            <Settings className="w-3.5 h-3.5" />
            Configurar scoring
          </button>
        </div>
      </div>

      {/* ── SCORING CONFIG PANEL ── */}
      <div
        className="overflow-hidden transition-all duration-400"
        style={{ maxHeight: showScoringConfig ? '500px' : '0', opacity: showScoringConfig ? 1 : 0, marginBottom: showScoringConfig ? '24px' : '0' }}
      >
        <div className="rounded-2xl p-5" style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E5E5' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold" style={{ color: '#0A0A0A' }}>Configuración del scoring IA</p>
              <p className="text-xs mt-0.5" style={{ color: '#737373' }}>Define qué tan sensible es el sistema al detectar recomendaciones</p>
            </div>
            <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
              Solo administradores CTP
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {SCORING_OPTIONS.map(opt => {
              const Icon = opt.icon;
              const isSelected = scoringLevel === opt.key;
              return (
                <button
                  key={opt.key}
                  onClick={() => setScoringLevel(opt.key)}
                  className="text-left p-4 rounded-xl transition-all"
                  style={{ border: `2px solid ${isSelected ? opt.color : '#E5E5E5'}`, backgroundColor: isSelected ? `${opt.color}10` : '#FFFFFF' }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" style={{ color: opt.color }} />
                      <span className="text-sm font-semibold" style={{ color: '#0A0A0A' }}>{opt.label}</span>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4" style={{ color: opt.color }} />}
                  </div>
                  <p className="text-xs leading-relaxed mb-2" style={{ color: '#737373' }}>{opt.description}</p>
                  <span className="text-xs font-medium" style={{ color: opt.color }}>{opt.count} insights visibles</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── KPI SUMMARY ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total insights',        value: INSIGHTS.length, color: '#006B4E', bg: '#F0F5EB', border: '#C5D9A8' },
          { label: 'Alta prioridad',        value: altaCount,       color: '#B91C1C', bg: '#FEF2F2', border: '#FECACA' },
          { label: 'Media prioridad',       value: mediaCount,      color: '#92400E', bg: '#FFFBEB', border: '#FDE68A' },
          { label: 'Publicaciones afectadas', value: afectadas,     color: '#374151', bg: '#F5F5F5', border: '#E5E5E5' },
        ].map(kpi => (
          <div key={kpi.label} className="rounded-2xl p-4" style={{ backgroundColor: kpi.bg, border: `1px solid ${kpi.border}` }}>
            <p className="text-xs mb-1" style={{ color: kpi.color, opacity: 0.8 }}>{kpi.label}</p>
            <p className="text-3xl font-bold" style={{ color: kpi.color, fontFamily: 'var(--font-heading)' }}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* ── FILTER TABS ── */}
      <div className="flex gap-1 p-1 rounded-full mb-6 overflow-x-auto" style={{ backgroundColor: '#F3F4F6', width: 'fit-content' }}>
        {tabs.map(tab => {
          const isActive = filterTab === tab.key;
          const dotColor = tab.key === 'alta' ? '#DC2626' : tab.key === 'media' ? '#D97706' : tab.key === 'baja' ? '#3B82F6' : undefined;
          return (
            <button
              key={tab.key}
              onClick={() => setFilterTab(tab.key)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full transition-all whitespace-nowrap text-sm"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: isActive ? '600' : '400',
                color: isActive ? '#0A0A0A' : '#6B7280',
                backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              }}
            >
              {dotColor && <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: isActive ? dotColor : '#9CA3AF' }} />}
              {tab.label}
              <span className="px-1.5 py-0.5 rounded-full text-xs"
                style={{ backgroundColor: isActive ? '#F0F5EB' : '#E5E5E5', color: isActive ? '#3D5E28' : '#9CA3AF' }}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── LOADING ── */}
      {isLoading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="rounded-2xl p-5 animate-pulse"
              style={{ border: '1px solid #E5E5E5', borderLeft: '4px solid #E5E5E5', backgroundColor: '#FFFFFF' }}>
              <div className="flex justify-between mb-3">
                <div className="h-5 w-20 rounded-full" style={{ backgroundColor: '#F0F0F0' }} />
                <div className="h-5 w-24 rounded-full" style={{ backgroundColor: '#F0F0F0' }} />
              </div>
              <div className="h-5 w-3/4 rounded-full mb-2" style={{ backgroundColor: '#F0F0F0' }} />
              <div className="space-y-2 mb-4">
                <div className="h-3 rounded-full" style={{ backgroundColor: '#F0F0F0' }} />
                <div className="h-3 w-4/5 rounded-full" style={{ backgroundColor: '#F0F0F0' }} />
              </div>
              <div className="h-10 rounded-full" style={{ backgroundColor: '#F0F0F0' }} />
            </div>
          ))}
        </div>
      )}

      {/* ── EMPTY STATE ── */}
      {!isLoading && filteredInsights.length === 0 && (
        <div className="text-center py-16 px-6 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: '#E8F5EE' }}>
            <Sparkles className="w-8 h-8 animate-pulse" style={{ color: '#006B4E' }} />
          </div>
          <h3 className="text-base font-semibold mb-2" style={{ color: '#0A0A0A', fontFamily: 'var(--font-heading)' }}>
            {filterTab !== 'todos'
              ? `No hay insights de ${PRIORITY_CONFIG[filterTab as Priority]?.label.toLowerCase()} en este momento`
              : 'Aún estamos analizando tus publicaciones'}
          </h3>
          <p className="text-sm mb-6 leading-relaxed" style={{ color: '#737373' }}>
            {filterTab !== 'todos'
              ? 'No se encontraron recomendaciones en esta categoría. Puedes revisar otras prioridades o volver cuando el sistema tenga más datos.'
              : 'La IA necesita al menos 7 días de actividad para generar recomendaciones precisas. Asegúrate de que tus publicaciones estén completas.'}
          </p>
          {filterTab === 'todos' && (
            <div className="text-left rounded-2xl p-5 mb-6" style={{ backgroundColor: '#F0F5EB', border: '1px solid #C5D9A8' }}>
              <p className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: '#3D5E28' }}>
                <Info className="w-4 h-4" /> Cómo funciona
              </p>
              <ol className="space-y-2.5">
                {[
                  'La IA analiza el rendimiento de tus publicaciones y las compara con el mercado',
                  'Detecta oportunidades de mejora en precio, contenido e información',
                  'Genera recomendaciones claras para que puedas actuar de inmediato',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: '#3D5E28' }}>
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: '#C5D9A8', color: '#3D5E28' }}>{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}
          <button
            onClick={() => filterTab !== 'todos' ? setFilterTab('todos') : undefined}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium mx-auto transition-all"
            style={{ backgroundColor: '#006B4E', color: '#FFFFFF' }}
          >
            <ArrowRight className="w-4 h-4" />
            {filterTab !== 'todos' ? 'Ver todos los insights' : 'Ver mis publicaciones'}
          </button>
        </div>
      )}

      {/* ── INSIGHTS GRID ── */}
      {!isLoading && filteredInsights.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredInsights.map(insight => {
            const p = PRIORITY_CONFIG[insight.priority];
            const c = CATEGORY_CONFIG[insight.category];
            const PIcon = p.icon;
            const CIcon = c.icon;
            const isExpanded = expandedRazon === insight.id;

            return (
              <div
                key={insight.id}
                className="bg-white rounded-2xl overflow-hidden flex flex-col"
                style={{ border: '1px solid #E5E5E5', borderLeft: `4px solid ${p.borderColor}`, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}
              >
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs" style={{ backgroundColor: '#F5F5F5', color: '#737373' }}>
                      <CIcon className="w-3 h-3" />
                      <span>{c.label}</span>
                    </div>
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: p.badgeBg, color: p.color }}>
                      <PIcon className="w-3 h-3" />
                      <span>{p.label}</span>
                    </div>
                  </div>

                  <h3 className="text-sm font-semibold mb-2 leading-snug" style={{ color: '#0A0A0A', fontFamily: 'var(--font-body)' }}>
                    {insight.title}
                  </h3>
                  <p className="text-xs leading-relaxed mb-3" style={{ color: '#737373' }}>
                    {insight.description}
                  </p>

                  <button
                    onClick={() => setExpandedRazon(isExpanded ? null : insight.id)}
                    className="flex items-center gap-1 text-xs mb-3 transition-opacity hover:opacity-70"
                    style={{ color: '#006B4E' }}
                  >
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    ¿Por qué esta recomendación?
                  </button>

                  {isExpanded && (
                    <div className="mb-3 p-3 rounded-xl text-xs leading-relaxed"
                      style={{ backgroundColor: '#F0F5EB', color: '#3D5E28', border: '1px solid #C5D9A8' }}>
                      {insight.razon}
                    </div>
                  )}

                  {insight.publicacion && (
                    <div className="flex items-center gap-1.5 mb-2 text-xs" style={{ color: '#737373' }}>
                      <ExternalLink className="w-3 h-3 flex-shrink-0" style={{ color: '#006B4E' }} />
                      <span className="capitalize">{insight.publicacion.tipo}:</span>
                      <span className="font-medium" style={{ color: '#0A0A0A' }}>{insight.publicacion.titulo}</span>
                      <span>— {insight.publicacion.ubicacion}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5 mb-4 text-xs" style={{ color: '#737373' }}>
                    <Sparkles className="w-3 h-3 flex-shrink-0" style={{ color: '#006B4E' }} />
                    <span>{insight.impacto}</span>
                  </div>

                  <div className="mt-auto">
                    <button
                      onClick={() => handleInsightAction(insight)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all"
                      style={{
                        backgroundColor: insight.priority === 'alta' ? '#006B4E' : '#F0F5EB',
                        color: insight.priority === 'alta' ? '#FFFFFF' : '#006B4E',
                      }}
                    >
                      <ArrowRight className="w-4 h-4" />
                      {insight.accion}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!isLoading && filteredInsights.length > 0 && (
        <div className="flex items-start gap-2 mt-6 px-1">
          <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#9CA3AF' }} />
          <p className="text-xs leading-relaxed" style={{ color: '#9CA3AF' }}>
            Las recomendaciones son generadas automáticamente y no modifican tus publicaciones. Tú decides qué ajustar y cuándo.
          </p>
        </div>
      )}

      {/* ── DRAWER ── */}
      {drawerInsight && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(0,0,0,0.35)' }}
            onClick={() => { setDrawerInsight(null); setKeywords([]); }}
          />
          <div
            className="relative flex flex-col w-full bg-white h-full overflow-y-auto"
            style={{ maxWidth: '440px', boxShadow: '-4px 0 32px rgba(0,0,0,0.12)' }}
          >
            {/* Drawer header */}
            <div className="flex items-start justify-between p-6 flex-shrink-0"
              style={{ borderBottom: '1px solid #E5E5E5' }}>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium capitalize"
                    style={{
                      backgroundColor: PRIORITY_CONFIG[drawerInsight.priority].badgeBg,
                      color: PRIORITY_CONFIG[drawerInsight.priority].color,
                    }}
                  >
                    {PRIORITY_CONFIG[drawerInsight.priority].label}
                  </span>
                  {drawerInsight.publicacion && (
                    <span className="text-xs" style={{ color: '#737373' }}>
                      · {drawerInsight.publicacion.ubicacion}
                    </span>
                  )}
                </div>
                <h3 className="text-base font-semibold leading-tight" style={{ color: '#0A0A0A', fontFamily: 'var(--font-heading)' }}>
                  {drawerInsight.publicacion?.titulo ?? 'Recomendación IA'}
                </h3>
              </div>
              <button
                onClick={() => { setDrawerInsight(null); setKeywords([]); }}
                className="w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0 ml-3 mt-0.5 transition-colors hover:bg-gray-100"
              >
                <X className="w-4 h-4" style={{ color: '#737373' }} />
              </button>
            </div>

            {/* Insight context strip */}
            <div className="px-6 py-3 flex items-start gap-2" style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E5E5' }}>
              <Sparkles className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#006B4E' }} />
              <p className="text-xs leading-relaxed" style={{ color: '#3D5E28' }}>{drawerInsight.title}</p>
            </div>

            {/* Drawer body */}
            <div className="flex-1 p-6">
              {renderDrawerContent(drawerInsight)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
