import React from 'react';
import { Plus, Edit2, Trash2, Eye, MapPin, Maximize2, MoreVertical, Building2, Calendar, AlertTriangle, X, FileSpreadsheet, RefreshCw, ExternalLink } from 'lucide-react';
import { PrecioDisplay } from '@/app/components/PrecioDisplay';

interface ParcelaPublicada {
  id: string;
  titulo: string;
  ubicacion: string;
  superficie: string;
  precio: string;
  estado: 'publicado' | 'borrador';
  vistas: number;
  consultas: number;
  fechaPublicacion: string;
}

interface ProyectoPublicado {
  id: string;
  titulo: string;
  ubicacion: string;
  totalParcelas: number;
  disponibles: number;
  vendidas: number;
  precioDesde: string;
  estado: 'publicado' | 'borrador';
  vistas: number;
  consultas: number;
  fechaPublicacion: string;
}

interface AdminPublicacionesSectionProps {
  activeTab: 'parcelas' | 'proyectos' | 'home' | 'banners' | 'bloques';
  onTabChange: (tab: 'parcelas' | 'proyectos' | 'home' | 'banners' | 'bloques') => void;
  parcelasPublicadas: ParcelaPublicada[];
  proyectosPublicados: ProyectoPublicado[];
  onNewPublicacion: () => void;
  onEditParcela: (id: string) => void;
  onDeleteParcela: (id: string) => void;
  onToggleEstadoParcela: (id: string) => void;
  onEditProyecto: (id: string) => void;
  onDeleteProyecto: (id: string) => void;
  onToggleEstadoProyecto: (id: string) => void;
}

export function AdminPublicacionesSection({
  activeTab,
  onTabChange,
  parcelasPublicadas,
  proyectosPublicados,
  onNewPublicacion,
  onEditParcela,
  onDeleteParcela,
  onToggleEstadoParcela,
  onEditProyecto,
  onDeleteProyecto,
  onToggleEstadoProyecto
}: AdminPublicacionesSectionProps) {
  const [menuAbiertoId, setMenuAbiertoId] = React.useState<string | null>(null);
  const [sheetConectado, setSheetConectado] = React.useState(false);
  const [sincronizando, setSincronizando] = React.useState(false);

  const handleSincronizar = () => {
    setSincronizando(true);
    setTimeout(() => setSincronizando(false), 2000);
  };
  const [modalDesactivar, setModalDesactivar] = React.useState<{
    isOpen: boolean;
    tipo: 'parcela' | 'proyecto';
    id: string;
    titulo: string;
  } | null>(null);
  const [modalEliminar, setModalEliminar] = React.useState<{
    isOpen: boolean;
    tipo: 'parcela' | 'proyecto';
    id: string;
    titulo: string;
  } | null>(null);

  const tabs = [
    { id: 'parcelas' as const, label: 'Parcelas' },
    { id: 'proyectos' as const, label: 'Proyectos' },
    { id: 'home' as const, label: 'Hero del Home' },
    { id: 'banners' as const, label: 'Banners' },
    { id: 'bloques' as const, label: 'Bloques informativos' }
  ];

  const getEstadoBadge = (estado: 'publicado' | 'borrador') => {
    const config = estado === 'publicado'
      ? { bg: '#DCFCE7', color: '#16A34A', label: 'Publicado' }
      : { bg: '#FEF3C7', color: '#CA8A04', label: 'Borrador' };

    return (
      <span
        className="inline-flex items-center px-3 py-1 rounded-full"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-xs)',
          fontWeight: 'var(--font-weight-medium)',
          backgroundColor: config.bg,
          color: config.color
        }}
      >
        {config.label}
      </span>
    );
  };

  const getEstadoSwitch = (
    estado: 'publicado' | 'borrador',
    tipo: 'parcela' | 'proyecto',
    id: string,
    titulo: string
  ) => {
    const isPublicado = estado === 'publicado';
    
    const handleToggle = () => {
      if (isPublicado) {
        // Si está publicado, abrir modal de confirmación
        setModalDesactivar({
          isOpen: true,
          tipo,
          id,
          titulo
        });
      } else {
        // Si está en borrador, publicar directamente
        if (tipo === 'parcela') {
          onToggleEstadoParcela(id);
        } else {
          onToggleEstadoProyecto(id);
        }
      }
    };

    return (
      <div className="flex items-center gap-2">
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-xs)',
            fontWeight: 'var(--font-weight-medium)',
            color: isPublicado ? '#16A34A' : '#CA8A04'
          }}
        >
          {isPublicado ? 'Publicado' : 'Borrador'}
        </span>
        <button
          onClick={handleToggle}
          className="relative inline-flex items-center transition-colors"
          style={{
            width: '44px',
            height: '24px',
            borderRadius: '100px',
            backgroundColor: isPublicado ? '#16A34A' : '#D4D4D4',
            border: 'none',
            cursor: 'pointer',
            padding: '0'
          }}
          aria-label={isPublicado ? 'Desactivar publicación' : 'Publicar'}
        >
          <span
            className="transition-transform"
            style={{
              position: 'absolute',
              top: '2px',
              left: isPublicado ? '22px' : '2px',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              transitionProperty: 'left',
              transitionDuration: '200ms'
            }}
          />
        </button>
      </div>
    );
  };

  return (
    <>
      {/* Tabs de navegación */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2" style={{ borderBottom: '1px solid var(--border)' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="px-4 py-3 whitespace-nowrap transition-all"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-sm)',
              fontWeight: 'var(--font-weight-medium)',
              color: activeTab === tab.id ? '#006B4E' : '#737373',
              borderBottom: activeTab === tab.id ? '2px solid #006B4E' : '2px solid transparent',
              backgroundColor: 'transparent'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Sección: Parcelas */}
      {activeTab === 'parcelas' && (
        <div>
          {/* Header con botón */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h3)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-heading)',
                  marginBottom: '4px'
                }}
              >
                Parcelas publicadas
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  color: '#737373',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                Administra las parcelas individuales publicadas en la plataforma
              </p>
            </div>
            <button
              onClick={onNewPublicacion}
              className="flex items-center gap-2 px-5 py-3 transition-all"
              style={{
                backgroundColor: '#006B4E',
                color: '#FFFFFF',
                borderRadius: '200px',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                fontWeight: 'var(--font-weight-medium)',
                letterSpacing: 'var(--letter-spacing-wide)',
                lineHeight: 'var(--line-height-ui)',
                border: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#01533E';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#006B4E';
              }}
            >
              <Plus className="w-5 h-5" />
              Nueva publicación
            </button>
          </div>

          {/* Bloque Google Sheets */}
          {!sheetConectado ? (
            <div className="rounded-2xl p-5 mb-6 flex items-center justify-between gap-4"
              style={{ backgroundColor: '#F9FAFB', border: '1px dashed #D1D5DB' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                  <FileSpreadsheet className="w-5 h-5" style={{ color: '#006B4E' }} />
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A', marginBottom: '2px' }}>
                    Hoja de cálculo
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF' }}>
                    No configurada — Conectá una Google Sheet para importar parcelas automáticamente
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSheetConectado(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0"
                style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#01533E'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#006B4E'}>
                <Plus className="w-4 h-4" /> Crear hoja de cálculo
              </button>
            </div>
          ) : (
            <div className="rounded-2xl p-5 mb-6 flex items-center justify-between gap-4"
              style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#EBFEF5', border: '1px solid #A7F3D0' }}>
                  <FileSpreadsheet className="w-5 h-5" style={{ color: '#006B4E' }} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A' }}>
                      Hoja de cálculo
                    </p>
                    <span className="flex items-center gap-1" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#16A34A', fontWeight: 500 }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" /> Conectada
                    </span>
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF' }}>
                    {sincronizando ? 'Sincronizando...' : 'Última sincronización: hace 2 horas'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <a href="#" onClick={e => e.preventDefault()}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all"
                  style={{ backgroundColor: '#F5F5F5', color: '#374151', fontFamily: 'var(--font-body)', textDecoration: 'none' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#E5E5E5'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#F5F5F5'}>
                  <ExternalLink className="w-3.5 h-3.5" /> Visualizar hoja
                </a>
                <button
                  onClick={handleSincronizar}
                  disabled={sincronizando}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all"
                  style={{ backgroundColor: sincronizando ? '#E5E5E5' : '#006B4E', color: sincronizando ? '#9CA3AF' : '#FFFFFF', fontFamily: 'var(--font-body)', cursor: sincronizando ? 'not-allowed' : 'pointer' }}
                  onMouseEnter={e => { if (!sincronizando) e.currentTarget.style.backgroundColor = '#01533E'; }}
                  onMouseLeave={e => { if (!sincronizando) e.currentTarget.style.backgroundColor = '#006B4E'; }}>
                  <RefreshCw className={`w-3.5 h-3.5 ${sincronizando ? 'animate-spin' : ''}`} />
                  {sincronizando ? 'Sincronizando...' : 'Sincronizar cambios'}
                </button>
              </div>
            </div>
          )}

          {/* Lista de parcelas */}
          <div className="space-y-4">
            {parcelasPublicadas.map((parcela) => (
              <div
                key={parcela.id}
                className="rounded-2xl p-6"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E5E5',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-1">
                        <h3
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'var(--font-size-h4)',
                            fontWeight: 'var(--font-weight-medium)',
                            color: '#0A0A0A',
                            lineHeight: 'var(--line-height-heading)',
                            marginBottom: '8px'
                          }}
                        >
                          {parcela.titulo}
                        </h3>
                        <div className="flex items-center gap-4 flex-wrap">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" style={{ color: '#737373' }} />
                            <span
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--font-size-body-sm)',
                                color: '#737373',
                                lineHeight: 'var(--line-height-body)'
                              }}
                            >
                              {parcela.ubicacion}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Maximize2 className="w-4 h-4" style={{ color: '#737373' }} />
                            <span
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--font-size-body-sm)',
                                color: '#737373',
                                lineHeight: 'var(--line-height-body)'
                              }}
                            >
                              {parcela.superficie}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" style={{ color: '#737373' }} />
                            <span
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--font-size-body-sm)',
                                color: '#737373',
                                lineHeight: 'var(--line-height-body)'
                              }}
                            >
                              {parcela.fechaPublicacion}
                            </span>
                          </div>
                        </div>
                      </div>
                      {getEstadoSwitch(parcela.estado, 'parcela', parcela.id, parcela.titulo)}
                    </div>

                    {/* Estadísticas y precio */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4" style={{ color: '#006B4E' }} />
                          <span
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--font-size-body-sm)',
                              fontWeight: 'var(--font-weight-medium)',
                              color: '#0A0A0A',
                              lineHeight: 'var(--line-height-body)'
                            }}
                          >
                            {parcela.vistas} vistas
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4" style={{ color: '#006B4E' }} />
                          <span
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--font-size-body-sm)',
                              fontWeight: 'var(--font-weight-medium)',
                              color: '#0A0A0A',
                              lineHeight: 'var(--line-height-body)'
                            }}
                          >
                            {parcela.consultas} consultas
                          </span>
                        </div>
                        <PrecioDisplay 
                          precioCLP={parcela.precio}
                          precioSize="lg"
                        />
                      </div>

                      {/* Acciones */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onEditParcela(parcela.id)}
                          className="p-2 rounded-lg transition-colors"
                          style={{
                            backgroundColor: '#F5F5F5',
                            border: 'none'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#E5E5E5';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#F5F5F5';
                          }}
                        >
                          <Edit2 className="w-4 h-4" style={{ color: '#0A0A0A' }} />
                        </button>
                        <button
                          onClick={() => setModalEliminar({
                            isOpen: true,
                            tipo: 'parcela',
                            id: parcela.id,
                            titulo: parcela.titulo
                          })}
                          className="p-2 rounded-lg transition-colors"
                          style={{
                            backgroundColor: '#FEF2F2',
                            border: 'none'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#FEE2E2';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#FEF2F2';
                          }}
                        >
                          <Trash2 className="w-4 h-4" style={{ color: '#DC2626' }} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sección: Proyectos */}
      {activeTab === 'proyectos' && (
        <div>
          {/* Header con botón */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h3)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-heading)',
                  marginBottom: '4px'
                }}
              >
                Proyectos publicados
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  color: '#737373',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                Administra los proyectos inmobiliarios publicados en la plataforma
              </p>
            </div>
            <button
              onClick={onNewPublicacion}
              className="flex items-center gap-2 px-5 py-3 transition-all"
              style={{
                backgroundColor: '#006B4E',
                color: '#FFFFFF',
                borderRadius: '200px',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                fontWeight: 'var(--font-weight-medium)',
                letterSpacing: 'var(--letter-spacing-wide)',
                lineHeight: 'var(--line-height-ui)',
                border: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#01533E';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#006B4E';
              }}
            >
              <Plus className="w-5 h-5" />
              Nueva publicación
            </button>
          </div>

          {/* Lista de proyectos */}
          <div className="space-y-4">
            {proyectosPublicados.map((proyecto) => (
              <div
                key={proyecto.id}
                className="rounded-2xl p-6"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E5E5',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(0, 107, 78, 0.1)' }}
                      >
                        <Building2 className="w-6 h-6" style={{ color: '#006B4E' }} />
                      </div>
                      <div className="flex-1">
                        <h3
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'var(--font-size-h4)',
                            fontWeight: 'var(--font-weight-medium)',
                            color: '#0A0A0A',
                            lineHeight: 'var(--line-height-heading)',
                            marginBottom: '8px'
                          }}
                        >
                          {proyecto.titulo}
                        </h3>
                        <div className="flex items-center gap-4 flex-wrap mb-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" style={{ color: '#737373' }} />
                            <span
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--font-size-body-sm)',
                                color: '#737373',
                                lineHeight: 'var(--line-height-body)'
                              }}
                            >
                              {proyecto.ubicacion}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" style={{ color: '#737373' }} />
                            <span
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--font-size-body-sm)',
                                color: '#737373',
                                lineHeight: 'var(--line-height-body)'
                              }}
                            >
                              {proyecto.fechaPublicacion}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div>
                            <span
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--font-size-body-sm)',
                                color: '#737373',
                                lineHeight: 'var(--line-height-body)'
                              }}
                            >
                              Total:{' '}
                            </span>
                            <span
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--font-size-body-sm)',
                                fontWeight: 'var(--font-weight-semibold)',
                                color: '#0A0A0A',
                                lineHeight: 'var(--line-height-body)'
                              }}
                            >
                              {proyecto.totalParcelas} parcelas
                            </span>
                          </div>
                          <div>
                            <span
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--font-size-body-sm)',
                                color: '#737373',
                                lineHeight: 'var(--line-height-body)'
                              }}
                            >
                              Disponibles:{' '}
                            </span>
                            <span
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--font-size-body-sm)',
                                fontWeight: 'var(--font-weight-semibold)',
                                color: '#647E3F',
                                lineHeight: 'var(--line-height-body)'
                              }}
                            >
                              {proyecto.disponibles}
                            </span>
                          </div>
                          <div>
                            <span
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--font-size-body-sm)',
                                color: '#737373',
                                lineHeight: 'var(--line-height-body)'
                              }}
                            >
                              Vendidas:{' '}
                            </span>
                            <span
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--font-size-body-sm)',
                                fontWeight: 'var(--font-weight-semibold)',
                                color: '#737373',
                                lineHeight: 'var(--line-height-body)'
                              }}
                            >
                              {proyecto.vendidas}
                            </span>
                          </div>
                        </div>
                      </div>
                      {getEstadoSwitch(proyecto.estado, 'proyecto', proyecto.id, proyecto.titulo)}
                    </div>

                    {/* Estadísticas y precio */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4" style={{ color: '#006B4E' }} />
                          <span
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--font-size-body-sm)',
                              fontWeight: 'var(--font-weight-medium)',
                              color: '#0A0A0A',
                              lineHeight: 'var(--line-height-body)'
                            }}
                          >
                            {proyecto.vistas} vistas
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4" style={{ color: '#006B4E' }} />
                          <span
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--font-size-body-sm)',
                              fontWeight: 'var(--font-weight-medium)',
                              color: '#0A0A0A',
                              lineHeight: 'var(--line-height-body)'
                            }}
                          >
                            {proyecto.consultas} consultas
                          </span>
                        </div>
                        <div>
                          <span
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--font-size-body-sm)',
                              color: '#737373',
                              lineHeight: 'var(--line-height-body)'
                            }}
                          >
                            Desde{' '}
                          </span>
                          <PrecioDisplay 
                            precioCLP={proyecto.precioDesde}
                            precioSize="lg"
                          />
                        </div>
                      </div>

                      {/* Acciones */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onEditProyecto(proyecto.id)}
                          className="p-2 rounded-lg transition-colors"
                          style={{
                            backgroundColor: '#F5F5F5',
                            border: 'none'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#E5E5E5';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#F5F5F5';
                          }}
                        >
                          <Edit2 className="w-4 h-4" style={{ color: '#0A0A0A' }} />
                        </button>
                        <button
                          onClick={() => setModalEliminar({
                            isOpen: true,
                            tipo: 'proyecto',
                            id: proyecto.id,
                            titulo: proyecto.titulo
                          })}
                          className="p-2 rounded-lg transition-colors"
                          style={{
                            backgroundColor: '#FEF2F2',
                            border: 'none'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#FEE2E2';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#FEF2F2';
                          }}
                        >
                          <Trash2 className="w-4 h-4" style={{ color: '#DC2626' }} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal de confirmación para desactivar publicación */}
      {modalDesactivar?.isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setModalDesactivar(null)}
        >
          <div
            className="rounded-2xl p-6 max-w-md w-full mx-4"
            style={{
              backgroundColor: '#FFFFFF',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del modal */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: '#FEF2F2' }}
                >
                  <AlertTriangle className="w-6 h-6" style={{ color: '#DC2626' }} />
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-h4)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-heading)',
                      marginBottom: '4px'
                    }}
                  >
                    Desactivar publicación
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setModalDesactivar(null)}
                className="p-1 rounded-lg transition-colors"
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F5F5F5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <X className="w-5 h-5" style={{ color: '#737373' }} />
              </button>
            </div>

            {/* Contenido del modal */}
            <div className="mb-6">
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)',
                  marginBottom: '12px'
                }}
              >
                ¿Estás seguro de que deseas desactivar la publicación <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>"{modalDesactivar.titulo}"</span>?
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  color: '#737373',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                Esta {modalDesactivar.tipo === 'parcela' ? 'parcela' : 'proyecto'} ya no estará disponible para la vista pública y los usuarios no podrán verla en la plataforma.
              </p>
            </div>

            {/* Acciones del modal */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setModalDesactivar(null)}
                className="flex-1 px-4 py-3 rounded-xl transition-colors"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  backgroundColor: '#F5F5F5',
                  color: '#0A0A0A',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#E5E5E5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#F5F5F5';
                }}
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (modalDesactivar.tipo === 'parcela') {
                    onToggleEstadoParcela(modalDesactivar.id);
                  } else {
                    onToggleEstadoProyecto(modalDesactivar.id);
                  }
                  setModalDesactivar(null);
                }}
                className="flex-1 px-4 py-3 rounded-xl transition-colors"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  backgroundColor: '#DC2626',
                  color: '#FFFFFF',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#B91C1C';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#DC2626';
                }}
              >
                Sí, desactivar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación para eliminar publicación */}
      {modalEliminar?.isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setModalEliminar(null)}
        >
          <div
            className="rounded-2xl p-6 max-w-md w-full mx-4"
            style={{
              backgroundColor: '#FFFFFF',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del modal */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: '#FEF2F2' }}
                >
                  <AlertTriangle className="w-6 h-6" style={{ color: '#DC2626' }} />
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-h4)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-heading)',
                      marginBottom: '4px'
                    }}
                  >
                    Eliminar publicación
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setModalEliminar(null)}
                className="p-1 rounded-lg transition-colors"
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F5F5F5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <X className="w-5 h-5" style={{ color: '#737373' }} />
              </button>
            </div>

            {/* Contenido del modal */}
            <div className="mb-6">
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)',
                  marginBottom: '12px'
                }}
              >
                ¿Estás seguro de que deseas eliminar la publicación <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>"{modalEliminar.titulo}"</span>?
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  color: '#737373',
                  lineHeight: 'var(--line-height-body)',
                  marginBottom: '8px'
                }}
              >
                Esta acción es permanente y no se puede deshacer. Se eliminarán todos los datos asociados a esta {modalEliminar.tipo === 'parcela' ? 'parcela' : 'proyecto'}, incluyendo:
              </p>
              <ul
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  color: '#737373',
                  lineHeight: 'var(--line-height-body)',
                  marginLeft: '20px',
                  listStyle: 'disc'
                }}
              >
                <li>Toda la información y fotografías</li>
                <li>Estadísticas de vistas y consultas</li>
                <li>Historial de publicación</li>
              </ul>
            </div>

            {/* Acciones del modal */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setModalEliminar(null)}
                className="flex-1 px-4 py-3 rounded-xl transition-colors"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  backgroundColor: '#F5F5F5',
                  color: '#0A0A0A',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#E5E5E5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#F5F5F5';
                }}
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (modalEliminar.tipo === 'parcela') {
                    onDeleteParcela(modalEliminar.id);
                  } else {
                    onDeleteProyecto(modalEliminar.id);
                  }
                  setModalEliminar(null);
                }}
                className="flex-1 px-4 py-3 rounded-xl transition-colors"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  backgroundColor: '#DC2626',
                  color: '#FFFFFF',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#B91C1C';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#DC2626';
                }}
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}