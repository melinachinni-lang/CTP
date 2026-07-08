import React, { useState, useRef, useEffect } from 'react';
import { Home, FileText, MessageCircle, TrendingUp, TrendingDown, Users, CreditCard, HelpCircle, Settings, User, Eye, ArrowUp, ArrowDown, ArrowUpRight, ArrowDownRight, Heart, Plus, Edit, Star, AlertCircle, CheckCircle, Zap, Award, Check, X, FolderOpen, Calendar, CalendarDays, MessageSquare, CalendarCheck, Phone, ChevronDown, Sparkles } from 'lucide-react';
import { AdminInsightsModule } from '@/app/components/AdminInsightsModule';
import { ChartRangePicker, type AppliedRange } from '@/app/components/ChartRangePicker';
import { CalendariosView } from '@/app/components/CalendariosView';
import { InquiriesSection } from '@/app/components/InquiriesSection';
import { ConsultasView } from '@/app/components/ConsultasView';
import { RendimientoView, DualLineChart, CHART_DATA, Periodo } from '@/app/components/RendimientoView';
import { MyPublicationsView } from '@/app/components/MyPublicationsView';
import { TeamContent } from '@/app/components/TeamContent';
import { HelpContent } from '@/app/components/HelpContent';
import { SettingsContent } from '@/app/components/SettingsContent';
import { ReservasAdminView } from '@/app/components/ReservasAdminView';
import { AsignacionesContent, InteraccionesContent } from '@/app/components/CTPAdminDashboard';
import { CitasAdminView } from '@/app/components/CitasAdminView';
import { ContactosWhatsAppAdminView } from '@/app/components/ContactosWhatsAppAdminView';
import { SugerenciasButton } from '@/app/components/SugerenciasButton';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { DashboardRef } from '@/app/App';

interface RealEstateDashboardScreenProps {
  onNavigate: (screen: string, id?: number) => void;
}

export const RealEstateDashboardScreen = React.forwardRef<DashboardRef, RealEstateDashboardScreenProps>(
  ({ onNavigate }, ref) => {
    const [showMenu, setShowMenu] = React.useState(false);
    const [currentSection, setCurrentSection] = React.useState('home');
    const [triggerPublishModal, setTriggerPublishModal] = React.useState(0);
    const [publishModalOrigin, setPublishModalOrigin] = React.useState('home');
    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
      gestion: true, interacciones: true, rendimiento: true, cuenta: false,
    });
    const toggleGroup = (id: string) => setOpenGroups(prev => ({ ...prev, [id]: !prev[id] }));

    // Exponer función para abrir modal de publicación
    React.useImperativeHandle(ref, () => ({
      openPublishModal: () => {
        setCurrentSection('my-publications');
        setTriggerPublishModal(prev => prev + 1);
      }
    }));

  const navGroups = [
    {
      key: null, label: null,
      items: [
        { id: 'home',           label: 'Inicio',            icon: Home },
        { id: 'my-publications',label: 'Mis publicaciones', icon: FolderOpen },
        { id: 'inquiries',      label: 'Consultas',         icon: MessageCircle },
        { id: 'calendarios',    label: 'Calendarios',       icon: Calendar },
      ],
    },
    {
      key: 'gestion', label: 'Gestión',
      items: [
        { id: 'reservas',    label: 'Valores de reservas', icon: FileText },
        { id: 'asignaciones',label: 'Asignaciones',        icon: Users },
        { id: 'whatsapp',    label: 'Números WhatsApp',    icon: Phone },
      ],
    },
    {
      key: 'interacciones', label: 'Interacciones',
      items: [
        { id: 'interacciones', label: 'Interacciones', icon: MessageSquare },
        { id: 'citas',         label: 'Citas',         icon: CalendarCheck },
      ],
    },
    {
      key: 'rendimiento', label: 'Rendimiento',
      items: [
        { id: 'performance', label: 'Rendimiento', icon: TrendingUp },
        { id: 'insights',    label: 'Insights IA', icon: Sparkles },
      ],
    },
    {
      key: 'cuenta', label: 'Cuenta',
      items: [
        { id: 'profile',  label: 'Perfil',             icon: User        },
        { id: 'plan',     label: 'Plan y facturación',  icon: CreditCard  },
        { id: 'settings', label: 'Configuración',       icon: Settings    },
        { id: 'help',     label: 'Ayuda',               icon: HelpCircle  },
      ],
    },
  ];

  return (
    <>
      <div className="fixed inset-0" style={{ backgroundColor: '#002F23', zIndex: 5 }} />
      {/* Nav Rail - Left Sidebar */}
      <aside className="w-64 flex-shrink-0 fixed left-0 top-0 bottom-0 z-20" style={{ backgroundColor: '#002F23' }}>
        <div className="h-full flex flex-col">
          {/* Logo Area */}
          <div className="px-6 py-8">
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 'var(--font-weight-semibold)',
              fontSize: 'var(--font-size-h4)',
              color: '#FFFFFF',
              lineHeight: 'var(--line-height-heading)'
            }}>
              CompraTuParcela
            </h2>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 py-2 overflow-y-auto scrollbar-hide px-2">
            {navGroups.map((group, groupIdx) => {
              const isOpen = group.key ? openGroups[group.key] : true;
              const hasActive = group.items.some(i => i.id === currentSection);
              return (
                <div key={groupIdx} className="mb-0.5">
                  {group.label && (
                    <button
                      onClick={() => group.key && toggleGroup(group.key)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors"
                      style={{ backgroundColor: 'transparent' }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                    >
                      <span style={{ fontSize: '10.5px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', color: hasActive ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.42)' }}>
                        {group.label}
                      </span>
                      <ChevronDown className="w-3 h-3 transition-transform duration-200 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.35)', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                    </button>
                  )}
                  {isOpen && (
                    <div className={group.label ? 'mb-1' : 'mb-2'}>
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        const isActive = currentSection === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => setCurrentSection(item.id)}
                            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all"
                            style={{
                              backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                              color: isActive ? '#002F23' : 'rgba(255,255,255,0.65)',
                              fontFamily: 'var(--font-body)',
                              fontWeight: isActive ? 600 : 400,
                              fontSize: '13px',
                            }}
                            onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.9)'; } }}
                            onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; } }}
                          >
                            <Icon className="w-4 h-4 flex-shrink-0" style={{ strokeWidth: isActive ? 2.5 : 1.8, color: isActive ? '#002F23' : 'rgba(255,255,255,0.65)' }} />
                            <span>{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Sugerencias */}
          <div className="px-4 py-5">
            <SugerenciasButton />
          </div>

          {/* User Profile Area */}
          <div className="px-6 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-3 flex-1 transition-colors"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  color: 'rgba(255,255,255,0.65)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#FFFFFF'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <User className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.65)' }} />
                </div>
                <div className="flex-1 text-left">
                  <div style={{ fontWeight: 'var(--font-weight-medium)', color: '#FFFFFF', fontSize: 'var(--font-size-body-sm)' }}>
                    Mi cuenta
                  </div>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
                    Plan Profesional
                  </div>
                </div>
              </button>
              {showMenu && (
                <button
                  onClick={() => setShowMenu(false)}
                  className="flex-shrink-0 p-1 rounded transition-colors"
                  style={{ lineHeight: 0 }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <X className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.5)' }} />
                </button>
              )}
            </div>
            {showMenu && (
              <div className="mt-3 rounded-lg overflow-hidden" style={{ backgroundColor: '#FFFFFF', border: '1px solid #DEDEDE', boxShadow: '0 4px 12px 0 rgba(0, 107, 78, 0.08)' }}>
                <button
                  onClick={() => onNavigate('entry')}
                  className="w-full text-left px-4 py-2.5 transition-colors"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    color: '#0A0A0A',
                    backgroundColor: 'transparent',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F5F5F5'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="fixed overflow-y-auto bg-white rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.45)]" style={{ left: '256px', top: 'calc(32px + 12px)', right: '12px', bottom: '12px', zIndex: 10 }}>
        {currentSection === 'home' && <HomeContent setCurrentSection={setCurrentSection} setTriggerPublishModal={setTriggerPublishModal} />}
        {currentSection === 'my-publications' && <MyPublicationsView userType="inmobiliaria" userId="inmob-123" onNavigate={onNavigate} onNavigateToSection={setCurrentSection} autoOpenModal={triggerPublishModal} onTypeModalCancel={() => setCurrentSection(publishModalOrigin)} />}
        {currentSection === 'inquiries' && <ConsultasView viewType="inmobiliaria" />}
        {currentSection === 'reservas' && (
          <div className="p-8">
            <div className="mb-6">
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h3)', fontWeight: 600, color: '#0A0A0A' }}>Reservas</h1>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', marginTop: '4px' }}>Gestión de comprobantes y confirmación de reservas</p>
            </div>
            <ReservasAdminView />
          </div>
        )}
        {currentSection === 'calendarios' && <CalendariosView />}
        {currentSection === 'asignaciones'  && <AsignacionesContent />}
        {currentSection === 'interacciones' && <InteraccionesContent />}
        {currentSection === 'citas'         && <CitasAdminView />}
        {currentSection === 'whatsapp'      && <ContactosWhatsAppAdminView />}
        {currentSection === 'performance' && <RendimientoView viewType="inmobiliaria" />}
        {currentSection === 'insights'    && <AdminInsightsModule onNavigate={setCurrentSection} />}
        {currentSection === 'team' && <TeamContent />}
        {currentSection === 'plan' && <PlanContent />}
        {currentSection === 'help' && <HelpContent />}
        {currentSection === 'profile' && <SettingsContent mode="profile" userType="inmobiliaria" />}
        {currentSection === 'settings' && <SettingsContent mode="settings" userType="inmobiliaria" />}
      </div>
    </>
  );
});

// Home Section Component
interface HomeContentProps {
  setCurrentSection: (section: string) => void;
  setTriggerPublishModal: React.Dispatch<React.SetStateAction<number>>;
}

function HomeContent({ setCurrentSection, setTriggerPublishModal }: HomeContentProps) {
  const [selectedPeriod, setSelectedPeriod] = React.useState<'7' | '30' | '90'>('30');
  const [evolApplied, setEvolApplied] = React.useState<AppliedRange | null>(null);
  const [consultasApplied, setConsultasApplied] = React.useState<AppliedRange | null>(null);
  const [consultasPeriod, setConsultasPeriod] = React.useState('30d');
  const [interaccionApplied, setInteraccionApplied] = React.useState<AppliedRange | null>(null);
  const [interaccionPeriod, setInteraccionPeriod] = React.useState('30d');
  const CHART_PRESETS = [{ id: '7d', label: 'Últimos 7 días' }, { id: '30d', label: 'Últimos 30 días' }, { id: '90d', label: 'Últimos 90 días' }];
  const EVOL_PRESETS = [{ id: '7', label: '7 días' }, { id: '30', label: '30 días' }, { id: '90', label: '90 días' }];
  const [dashRankingTab, setDashRankingTab] = React.useState<'parcelas' | 'proyectos'>('parcelas');
  const [dashRankingPeriod, setDashRankingPeriod] = React.useState<'7' | '30' | '90'>('30');
  const DASH_RANKING_SCALE: Record<'7' | '30' | '90', number> = { '7': 0.22, '30': 1.0, '90': 3.1 };
  const DASH_PERIODO_LABELS: Record<'7' | '30' | '90', string> = { '7': 'Últimos 7 días', '30': 'Últimos 30 días', '90': 'Últimos 90 días' };
  const [showDashRankingDropdown, setShowDashRankingDropdown] = useState(false);
  const [showDashRankingRange, setShowDashRankingRange] = useState(false);
  const [dashRankingFrom, setDashRankingFrom] = useState('');
  const [dashRankingTo, setDashRankingTo] = useState('');
  const [dashRankingApplied, setDashRankingApplied] = useState<{ from: string; to: string } | null>(null);
  const dashRankingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showDashRankingDropdown && !showDashRankingRange) return;
    const handler = (e: MouseEvent) => {
      if (dashRankingRef.current && !dashRankingRef.current.contains(e.target as Node)) {
        setShowDashRankingDropdown(false);
        setShowDashRankingRange(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showDashRankingDropdown, showDashRankingRange]);

  const formatDashRangeLabel = (from: string, to: string) => {
    const fmt = (d: string) => { const [, m, day] = d.split('-'); const meses = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic']; return `${parseInt(day)} ${meses[parseInt(m)-1]}`; };
    return `${fmt(from)} – ${fmt(to)}`;
  };

  const handleApplyDashRankingRange = () => {
    if (!dashRankingFrom || !dashRankingTo) return;
    setDashRankingApplied({ from: dashRankingFrom, to: dashRankingTo });
    setShowDashRankingDropdown(false);
    setShowDashRankingRange(false);
  };

  const periodoMap: Record<'7' | '30' | '90', Periodo> = { '7': '7d', '30': '30d', '90': '90d' };
  const chartSeries = CHART_DATA['inmobiliaria'][periodoMap[selectedPeriod]];

  // Datos para gráfico de barras - consultas por parcela
  const consultasData = [
    { name: 'Vista Cordillera', consultas: 24 },
    { name: 'Los Cedros', consultas: 18 },
    { name: 'Valle Central', consultas: 15 },
    { name: 'Alto Maipo', consultas: 12 },
    { name: 'Los Andes', consultas: 8 },
  ];

  // Datos para gráfico donut - tipo de interacción
  const interactionData = [
    { name: 'Consultas', value: 48, color: '#006B4E' },
    { name: 'Guardados', value: 32, color: '#462611' },
    { name: 'Clicks', value: 20, color: '#7D460D' },
  ];

  // Datos del ranking
  const parcelasRanking = [
    { name: 'Parcela Vista Cordillera', location: 'Lo Barnechea', inmobiliaria: 'Vista Natura Propiedades', imagen: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=80', views: 267, consultas: 24, status: 'high', statusLabel: 'Alto interés', tendencia: 18 },
    { name: 'Parcela Los Cedros', location: 'Colina', inmobiliaria: 'Vista Natura Propiedades', imagen: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=80', views: 234, consultas: 18, status: 'high', statusLabel: 'Alto interés', tendencia: 12 },
    { name: 'Terreno Valle Central', location: 'Buin', inmobiliaria: 'Vista Natura Propiedades', imagen: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=80', views: 189, consultas: 15, status: 'medium', statusLabel: 'Interés medio', tendencia: 5 },
    { name: 'Parcela Alto Maipo', location: 'San José de Maipo', inmobiliaria: 'Vista Natura Propiedades', imagen: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80', views: 156, consultas: 12, status: 'medium', statusLabel: 'Interés medio', tendencia: 8 },
    { name: 'Terreno Los Andes', location: 'Los Andes', inmobiliaria: 'Vista Natura Propiedades', imagen: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=80', views: 98, consultas: 8, status: 'low', statusLabel: 'Bajo rendimiento', tendencia: -3 },
  ];

  const proyectosRanking = [
    { name: 'Proyecto Vista Cordillera — Fase 2', location: 'Lo Barnechea', inmobiliaria: 'Vista Natura Propiedades', imagen: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=80', views: 1240, consultas: 24, status: 'high', statusLabel: 'Alto interés', tendencia: 31 },
    { name: 'Condominio Los Arrayanes', location: 'Villarrica', inmobiliaria: 'Vista Natura Propiedades', imagen: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=80', views: 890, consultas: 17, status: 'high', statusLabel: 'Alta demanda', tendencia: 14 },
    { name: 'Proyecto Lago Ranco', location: 'Los Lagos', inmobiliaria: 'Vista Natura Propiedades', imagen: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=80', views: 623, consultas: 11, status: 'medium', statusLabel: 'Interés medio', tendencia: -2 },
  ];

  const activeRanking = dashRankingTab === 'parcelas' ? parcelasRanking : proyectosRanking;

  return (
    <main className="px-8 py-8 space-y-8">
      {/* Header with Quick Actions */}
      <div className="flex items-start justify-between">
        <div>
          <h1 style={{ 
            fontFamily: 'var(--font-heading)',
            fontWeight: 'var(--font-weight-regular)',
            fontSize: 'var(--font-size-h2)',
            lineHeight: 'var(--line-height-heading)',
            color: '#0A0A0A'
          }}>
            Panel de rendimiento
          </h1>
          <p style={{ 
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-base)',
            color: '#737373',
            marginTop: '8px'
          }}>
            Visualiza el desempeño de tus publicaciones
          </p>
        </div>
      </div>

      {/* KPIs Section */}
      <section className="grid grid-cols-4 gap-6">
        {[
          { label: 'Parcelas publicadas', value: '12',    change: '+3',    up: true,  Icon: FileText,      iconBg: '#E8F5EE', iconColor: '#006B4E' },
          { label: 'Visualizaciones',     value: '4.523', change: '+22%',  up: true,  Icon: Eye,           iconBg: '#EFF6FF', iconColor: '#2563EB' },
          { label: 'Consultas recibidas', value: '77',    change: '+12%',  up: true,  Icon: MessageCircle, iconBg: '#F5F3FF', iconColor: '#7C3AED' },
          { label: 'Favoritos usuarios',  value: '143',   change: '+15%',  up: true,  Icon: Heart,         iconBg: '#FFF1F2', iconColor: '#DC2626' },
        ].map(({ label, value, change, up, Icon, iconBg, iconColor }) => (
          <div key={label} className="rounded-2xl p-5" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: iconBg }}>
                <Icon className="w-4 h-4" style={{ color: iconColor }} />
              </div>
              <span
                className="flex items-center gap-0.5"
                style={{
                  fontSize: '11px', fontWeight: 600, fontFamily: 'var(--font-body)',
                  color: up ? '#006B4E' : '#DC2626',
                  backgroundColor: up ? '#E8F5EE' : '#FEE2E2',
                  padding: '2px 7px', borderRadius: '99px',
                }}
              >
                {up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {change}
              </span>
            </div>
            <p style={{ fontSize: '26px', fontWeight: 700, color: '#0A0A0A', fontFamily: 'var(--font-heading)', margin: '0 0 3px' }}>{value}</p>
            <p style={{ fontSize: '12px', color: '#737373', fontFamily: 'var(--font-body)', margin: 0 }}>{label}</p>
          </div>
        ))}
      </section>

      {/* Gráfico principal - Evolución de visualizaciones */}
      <section className="rounded-2xl p-6 space-y-4" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
        <div className="flex items-center justify-between">
          <div>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 'var(--font-weight-medium)',
              fontSize: 'var(--font-size-h3)',
              lineHeight: 'var(--line-height-heading)',
              color: '#0A0A0A'
            }}>
              Evolución de visualizaciones
            </h2>
            <div className="flex items-center gap-4 mt-1">
              <span className="flex items-center gap-1.5" style={{ fontSize: '12px', color: '#737373', fontFamily: 'var(--font-body)' }}>
                <span style={{ display: 'inline-block', width: 12, height: 2, backgroundColor: '#006B4E', borderRadius: 2 }} />
                Parcelas
              </span>
              <span className="flex items-center gap-1.5" style={{ fontSize: '12px', color: '#737373', fontFamily: 'var(--font-body)' }}>
                <span style={{ display: 'inline-block', width: 12, height: 0, borderTop: '2px dashed #2563EB' }} />
                Proyectos
              </span>
            </div>
          </div>
          <ChartRangePicker
            presets={EVOL_PRESETS}
            selected={selectedPeriod}
            onSelectPreset={(id) => setSelectedPeriod(id as '7' | '30' | '90')}
            appliedRange={evolApplied}
            onApplyRange={setEvolApplied}
            onClearRange={() => setEvolApplied(null)}
          />
        </div>
        <DualLineChart
          parcelas={chartSeries.parcelas}
          proyectos={chartSeries.proyectos}
          loading={false}
          periodo={periodoMap[selectedPeriod]}
        />
      </section>

      {/* Gráficos secundarios */}
      <div className="grid grid-cols-2 gap-6">
        {/* Gráfico de barras - Consultas por parcela */}
        <section className="rounded-2xl p-6 space-y-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
          <div className="flex items-center justify-between">
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-h4)', lineHeight: 'var(--line-height-heading)', color: '#0A0A0A' }}>
              Consultas por parcela
            </h2>
            <ChartRangePicker presets={CHART_PRESETS} selected={consultasPeriod} onSelectPreset={setConsultasPeriod} appliedRange={consultasApplied} onApplyRange={setConsultasApplied} onClearRange={() => setConsultasApplied(null)} />
          </div>
          <div style={{ width: '100%', height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={consultasData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#CDD8DE" />
                <XAxis 
                  dataKey="name" 
                  style={{ fontSize: '11px', fontFamily: 'var(--font-body)', fill: '#737373' }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  style={{ fontSize: '12px', fontFamily: 'var(--font-body)', fill: '#737373' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #CDD8DE', 
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'var(--font-body)'
                  }}
                />
                <Bar 
                  dataKey="consultas" 
                  fill="#006B4E" 
                  radius={[8, 8, 0, 0]}
                  name="Consultas"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Gráfico donut - Tipo de interacción */}
        <section className="rounded-2xl p-6 space-y-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
          <div className="flex items-center justify-between">
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-h4)', lineHeight: 'var(--line-height-heading)', color: '#0A0A0A' }}>
              Tipo de interacción
            </h2>
            <ChartRangePicker presets={CHART_PRESETS} selected={interaccionPeriod} onSelectPreset={setInteraccionPeriod} appliedRange={interaccionApplied} onApplyRange={setInteraccionApplied} onClearRange={() => setInteraccionApplied(null)} />
          </div>
          <div style={{ width: '100%', height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={interactionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {interactionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E5E5E5', 
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'var(--font-body)'
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  iconType="circle"
                  wrapperStyle={{
                    fontSize: '14px',
                    fontFamily: 'var(--font-body)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      {/* Ranking de publicaciones */}
      <section className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
        {/* Header */}
        <div className="px-5 pt-5 pb-0">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: 'var(--font-size-h4)', color: '#0A0A0A', marginBottom: '2px' }}>
                Ranking de publicaciones
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>
                Top 10 parcelas y proyectos por interacción — {dashRankingApplied ? formatDashRangeLabel(dashRankingApplied.from, dashRankingApplied.to) : DASH_PERIODO_LABELS[dashRankingPeriod]}
              </p>
            </div>
            <div className="flex items-center gap-2" ref={dashRankingRef}>
              {/* Dropdown períodos */}
              <div className="relative">
                <button
                  onClick={() => { setShowDashRankingDropdown(v => !v); setShowDashRankingRange(false); }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                  style={{ border: '1px solid #E5E5E5', backgroundColor: '#FFFFFF', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#0A0A0A', fontWeight: 500, cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
                >
                  <CalendarDays className="w-4 h-4" style={{ color: '#737373' }} />
                  {DASH_PERIODO_LABELS[dashRankingPeriod]}
                  <ChevronDown className="w-3.5 h-3.5" style={{ color: '#737373', transform: showDashRankingDropdown ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                </button>
                {showDashRankingDropdown && (
                  <div className="absolute right-0 top-full mt-1 z-50 rounded-xl overflow-hidden" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', minWidth: '190px' }}>
                    {(['7', '30', '90'] as const).map(p => (
                      <button key={p} onClick={() => { setDashRankingPeriod(p); setDashRankingApplied(null); setDashRankingFrom(''); setDashRankingTo(''); setShowDashRankingDropdown(false); }}
                        className="w-full text-left px-4 py-2.5 transition-colors"
                        style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: !dashRankingApplied && dashRankingPeriod === p ? 600 : 400, color: !dashRankingApplied && dashRankingPeriod === p ? '#006B4E' : '#0A0A0A', backgroundColor: !dashRankingApplied && dashRankingPeriod === p ? '#F0F9F5' : '#FFFFFF', border: 'none', cursor: 'pointer', display: 'block' }}
                        onMouseEnter={e => { if (dashRankingApplied || dashRankingPeriod !== p) e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = (!dashRankingApplied && dashRankingPeriod === p) ? '#F0F9F5' : '#FFFFFF'; }}
                      >{DASH_PERIODO_LABELS[p]}</button>
                    ))}
                  </div>
                )}
              </div>
              {/* Botón rango personalizado */}
              <div className="relative">
                <button
                  onClick={() => { setShowDashRankingRange(v => !v); setShowDashRankingDropdown(false); }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors"
                  style={{ border: dashRankingApplied ? '1px solid #006B4E' : '1px solid #E5E5E5', backgroundColor: dashRankingApplied ? '#F0F9F5' : '#FFFFFF', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: dashRankingApplied ? 600 : 400, color: dashRankingApplied ? '#006B4E' : '#6B7280', cursor: 'pointer' }}
                  onMouseEnter={e => { if (!dashRankingApplied) e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
                  onMouseLeave={e => { if (!dashRankingApplied) e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
                >
                  <CalendarDays className="w-3.5 h-3.5" />
                  {dashRankingApplied ? formatDashRangeLabel(dashRankingApplied.from, dashRankingApplied.to) : 'Rango'}
                  {dashRankingApplied && (
                    <span role="button" onClick={e => { e.stopPropagation(); setDashRankingApplied(null); setDashRankingFrom(''); setDashRankingTo(''); setShowDashRankingRange(false); }} className="hover:opacity-60 transition-opacity">
                      <X className="w-3 h-3" />
                    </span>
                  )}
                </button>
                {showDashRankingRange && (
                  <div className="absolute right-0 top-full mt-1 z-50 rounded-xl p-4 space-y-3" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', minWidth: '240px' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: '#0A0A0A', marginBottom: '2px' }}>Rango personalizado</p>
                    <div>
                      <label style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: '#6B7280', display: 'block', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Desde</label>
                      <input type="date" value={dashRankingFrom} onChange={e => setDashRankingFrom(e.target.value)} max={dashRankingTo || undefined} className="w-full px-3 py-2 rounded-lg outline-none" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#0A0A0A', border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA' }} onFocus={e => { e.currentTarget.style.borderColor = '#006B4E'; }} onBlur={e => { e.currentTarget.style.borderColor = '#E5E5E5'; }} />
                    </div>
                    <div>
                      <label style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: '#6B7280', display: 'block', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Hasta</label>
                      <input type="date" value={dashRankingTo} onChange={e => setDashRankingTo(e.target.value)} min={dashRankingFrom || undefined} className="w-full px-3 py-2 rounded-lg outline-none" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#0A0A0A', border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA' }} onFocus={e => { e.currentTarget.style.borderColor = '#006B4E'; }} onBlur={e => { e.currentTarget.style.borderColor = '#E5E5E5'; }} />
                    </div>
                    <button onClick={handleApplyDashRankingRange} disabled={!dashRankingFrom || !dashRankingTo} className="w-full py-2 rounded-lg" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: '#FFFFFF', backgroundColor: dashRankingFrom && dashRankingTo ? '#006B4E' : '#D1D5DB', border: 'none', cursor: dashRankingFrom && dashRankingTo ? 'pointer' : 'not-allowed' }} onMouseEnter={e => { if (dashRankingFrom && dashRankingTo) e.currentTarget.style.backgroundColor = '#01533E'; }} onMouseLeave={e => { if (dashRankingFrom && dashRankingTo) e.currentTarget.style.backgroundColor = '#006B4E'; }}>
                      Aplicar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Tabs */}
          <div className="flex" style={{ borderBottom: '1px solid #F0F0F0' }}>
            {(['parcelas', 'proyectos'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setDashRankingTab(tab)}
                style={{
                  fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)',
                  fontWeight: dashRankingTab === tab ? 600 : 400,
                  color: dashRankingTab === tab ? '#006B4E' : '#9CA3AF',
                  backgroundColor: 'transparent', border: 'none',
                  borderBottom: dashRankingTab === tab ? '2px solid #006B4E' : '2px solid transparent',
                  padding: '8px 16px 10px', cursor: 'pointer', transition: 'color 0.15s',
                }}
              >
                {tab === 'parcelas' ? 'Parcelas' : 'Proyectos'}
              </button>
            ))}
          </div>
        </div>

        {/* Table Header */}
        <div
          className="px-5 py-2.5"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 96px 80px 88px 130px',
            gap: '8px',
            borderBottom: '1px solid #F0F0F0',
            backgroundColor: '#FAFAFA',
          }}
        >
          {['Propiedad', 'Vistas', 'Consultas', 'Tendencia', 'Estado'].map((col, i) => (
            <span key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: i > 0 ? 'center' : 'left' }}>
              {col}
            </span>
          ))}
        </div>

        {/* Table Rows */}
        {activeRanking.map((item, index) => {
          const pos = item.tendencia >= 0;
          const estadoBadge: Record<string, { bg: string; text: string; border: string }> = {
            'Alto interés':   { bg: '#DCFCE7', text: '#166534', border: '#86EFAC' },
            'Alta demanda':   { bg: '#DBEAFE', text: '#1E40AF', border: '#93C5FD' },
            'En crecimiento': { bg: '#F0FDF4', text: '#15803D', border: '#BBF7D0' },
            'Estable':        { bg: '#F3F4F6', text: '#6B7280', border: '#E5E7EB' },
            'Interés medio':  { bg: '#FEF3C7', text: '#92400E', border: '#FCD34D' },
            'Bajo rendimiento': { bg: '#FEE2E2', text: '#991B1B', border: '#FCA5A5' },
          };
          const badge = estadoBadge[item.statusLabel] ?? { bg: '#F3F4F6', text: '#6B7280', border: '#E5E7EB' };
          return (
            <div
              key={index}
              className="px-5 py-3 transition-colors"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 96px 80px 88px 130px',
                gap: '8px',
                alignItems: 'center',
                borderBottom: index < activeRanking.length - 1 ? '1px solid #F9FAFB' : 'none',
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F9FAFB'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              {/* Propiedad */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                  <img src={item.imagen} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#0A0A0A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.name}
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.inmobiliaria ? <><span style={{ color: '#006B4E', fontWeight: 500 }}>Inmobiliaria: {item.inmobiliaria}</span> · {item.location}</> : item.location}
                  </p>
                </div>
              </div>
              {/* Vistas */}
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151', textAlign: 'center' }}>
                {Math.round(item.views * DASH_RANKING_SCALE[dashRankingPeriod]).toLocaleString('es-CL')}
              </p>
              {/* Consultas */}
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151', textAlign: 'center' }}>
                {Math.max(1, Math.round(item.consultas * DASH_RANKING_SCALE[dashRankingPeriod]))}
              </p>
              {/* Tendencia */}
              <div className="flex items-center justify-center gap-1">
                {pos ? <TrendingUp className="w-3.5 h-3.5" style={{ color: '#16A34A' }} /> : <TrendingDown className="w-3.5 h-3.5" style={{ color: '#DC2626' }} />}
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: pos ? '#16A34A' : '#DC2626' }}>
                  {pos ? '+' : ''}{item.tendencia}%
                </span>
              </div>
              {/* Estado */}
              <div className="flex justify-center">
                <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: badge.bg, color: badge.text, border: `1px solid ${badge.border}`, fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>
                  {item.statusLabel}
                </span>
              </div>
            </div>
          );
        })}

        {/* Footer */}
        <div className="px-5 py-4" style={{ borderTop: '1px solid #F0F0F0' }}>
          <button className="w-full py-2 transition-all" style={{
            backgroundColor: 'transparent', color: '#737373', border: 'none',
            fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', cursor: 'pointer'
          }}
            onMouseEnter={e => e.currentTarget.style.color = '#0A0A0A'}
            onMouseLeave={e => e.currentTarget.style.color = '#737373'}
          >
            Ver todas las {dashRankingTab === 'parcelas' ? 'parcelas' : 'proyectos'} →
          </button>
        </div>
      </section>
    </main>
  );
}

// TeamContent is now imported from TeamContent.tsx

function PlanContent() {
  const [showCancelModal, setShowCancelModal] = React.useState(false);
  const [currentPlan, setCurrentPlan] = React.useState('plata');
  const [showUpgradeModal, setShowUpgradeModal] = React.useState(false);
  const [pendingPlan, setPendingPlan] = React.useState<string | null>(null);
  const [planChanged, setPlanChanged] = React.useState(false);
  const [showPaymentModal, setShowPaymentModal] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState<'card' | 'mercadopago' | null>(null);
  const [billingPeriod, setBillingPeriod] = React.useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      id: 'bronce',
      name: 'Bronce',
      price: '$29.990',
      description: 'Ideal para inmobiliarias que inician',
      features: [
        { name: 'Hasta 10 parcelas publicadas', included: true },
        { name: '2 publicaciones destacadas', included: true },
        { name: 'Visibilidad estándar', included: true },
        { name: 'Estadísticas básicas', included: true },
        { name: 'Soporte por email', included: true },
        { name: 'Panel de equipo y brokers', included: false },
        { name: 'Asesor comercial dedicado', included: false },
      ]
    },
    {
      id: 'plata',
      name: 'Plata',
      price: '$49.990',
      description: 'Para inmobiliarias en crecimiento',
      features: [
        { name: 'Hasta 30 parcelas publicadas', included: true },
        { name: '5 publicaciones destacadas', included: true },
        { name: 'Visibilidad alta', included: true },
        { name: 'Estadísticas avanzadas', included: true },
        { name: 'Soporte prioritario', included: true },
        { name: 'Panel de equipo y brokers', included: true },
        { name: 'Asesor comercial dedicado', included: false },
      ]
    },
    {
      id: 'oro',
      name: 'Oro',
      price: '$89.990',
      description: 'Máxima exposición para empresas',
      features: [
        { name: 'Publicaciones ilimitadas', included: true },
        { name: '15 publicaciones destacadas', included: true },
        { name: 'Visibilidad premium', included: true },
        { name: 'Estadísticas completas + exportación', included: true },
        { name: 'Soporte 24/7', included: true },
        { name: 'Panel completo de equipo y brokers', included: true },
        { name: 'Asesor comercial dedicado', included: true },
      ]
    }
  ];

  const currentPlanData = plans.find(p => p.id === currentPlan);

  const invoices = [
    { id: 'INV-2025-001', date: '28 Ene 2025', reason: 'Ciclo de suscripción - Plan Oro', reasonType: 'subscription', amount: '$89.990' },
    { id: 'INV-2024-012', date: '28 Dic 2024', reason: 'Ciclo de suscripción - Plan Oro', reasonType: 'subscription', amount: '$89.990' },
    { id: 'INV-2024-011', date: '28 Nov 2024', reason: 'Ciclo de suscripción - Plan Oro', reasonType: 'subscription', amount: '$89.990' },
    { id: 'INV-2024-010', date: '28 Oct 2024', reason: 'Upgrade a Plan Oro', reasonType: 'upgrade', amount: '$89.990' },
    { id: 'INV-2024-009', date: '28 Sep 2024', reason: 'Ciclo de suscripción - Plan Plata', reasonType: 'subscription', amount: '$49.990' },
    { id: 'INV-2024-008', date: '28 Ago 2024', reason: 'Creación de suscripción - Plan Plata', reasonType: 'creation', amount: '$49.990' }
  ];

  const handleDownload = (invoiceId: string) => console.log(`Descargando factura ${invoiceId}`);
  const handleCancelPlan = () => { setShowCancelModal(false); };
  const handleUpgrade = () => {
    if (pendingPlan) {
      setCurrentPlan(pendingPlan);
      setPendingPlan(null);
      setShowUpgradeModal(false);
      setShowPaymentModal(false);
      setPaymentMethod(null);
      setPlanChanged(true);
      setTimeout(() => setPlanChanged(false), 3500);
    }
  };
  const getReasonBadgeStyle = (type: string) => {
    switch (type) {
      case 'subscription': return { backgroundColor: '#E8E7E6', color: 'var(--foreground)' };
      case 'creation': return { backgroundColor: '#DCFCE7', color: '#16A34A' };
      case 'upgrade': return { backgroundColor: '#FEF3C7', color: '#CA8A04' };
      default: return { backgroundColor: '#E8E7E6', color: '#737373' };
    }
  };

  const pendingPlanData = plans.find(p => p.id === pendingPlan);
  const currentPlanFeatures = plans.find(p => p.id === currentPlan)?.features || [];
  const newBenefits = pendingPlanData?.features.filter(
    f => f.included && !currentPlanFeatures.find(cf => cf.name === f.name && cf.included)
  ) || [];

  const formatCLP = (num: number) => '$' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const monthlyAmount = pendingPlanData ? parseInt(pendingPlanData.price.replace('$', '').replace(/\./g, '')) : 0;
  const annualMonthlyAmount = Math.round(monthlyAmount * 0.9);
  const annualTotalAmount = annualMonthlyAmount * 12;

  return (
    <main className="px-8 py-8 space-y-8">
      {planChanged && (
        <div className="fixed bottom-6 left-1/2 z-[100] flex items-center gap-3 px-5 py-4 rounded-2xl" style={{ transform: 'translateX(-50%)', backgroundColor: '#0A0A0A', boxShadow: '0 8px 32px rgba(0,0,0,0.28)', minWidth: '320px', maxWidth: '440px' }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#16A34A' }}>
            <CheckCircle className="w-4 h-4" style={{ color: '#FFFFFF' }} />
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-semibold)', color: '#FFFFFF', marginBottom: '1px' }}>
              Plan actualizado correctamente
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#A3A3A3' }}>
              Ya puedes disfrutar los beneficios de tu nuevo plan.
            </p>
          </div>
        </div>
      )}
      <div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-regular)', fontSize: 'var(--font-size-h2)', lineHeight: 'var(--line-height-heading)', color: 'var(--foreground)' }}>Plan y facturación</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', color: '#737373', marginTop: '8px' }}>Gestiona tu plan y compara opciones</p>
      </div>
      <section className="rounded-2xl p-8" style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF' }}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-6 h-6" style={{ color: '#FFFFFF' }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Tu plan actual</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h2)', fontWeight: 'var(--font-weight-semibold)', lineHeight: 'var(--line-height-heading)', color: '#FFFFFF' }}>Plan {currentPlanData?.name}</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', color: '#C3C3C3', marginTop: '8px' }}>Perfil: Inmobiliaria</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: '#16A34A' }}>
            <CheckCircle className="w-4 h-4" style={{ color: '#FFFFFF' }} />
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Activo</span>
          </div>
        </div>
        <button onClick={() => document.getElementById('re-compara-planes')?.scrollIntoView({ behavior: 'smooth' })} className="py-2.5 px-6 transition-all" style={{ backgroundColor: '#FFFFFF', color: '#0A0A0A', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-wide)', lineHeight: 'var(--line-height-ui)', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#E8E7E6'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; }}>Ver otros planes</button>
      </section>
      <section className="rounded-2xl p-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-h4)', lineHeight: 'var(--line-height-heading)', color: 'var(--foreground)', marginBottom: '24px' }}>Beneficios de tu plan</h3>
        <div className="grid grid-cols-2 gap-6">
          {currentPlanData?.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: feature.included ? 'rgba(100, 126, 63, 0.1)' : '#FAFAFA', marginTop: '2px' }}>
                {feature.included ? <Check className="w-3.5 h-3.5" style={{ color: '#647E3F' }} /> : <X className="w-3.5 h-3.5" style={{ color: '#C3C3C3' }} />}
              </div>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', color: feature.included ? 'var(--foreground)' : '#A3A3A3', lineHeight: '1.5' }}>{feature.name}</span>
            </div>
          ))}
        </div>
      </section>
      <section id="re-compara-planes">
        <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-h3)', lineHeight: 'var(--line-height-heading)', color: 'var(--foreground)', marginBottom: '24px' }}>Compara planes</h3>
        <div className="grid grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isActive = plan.id === currentPlan;
            const isHigher = currentPlan === 'bronce' && (plan.id === 'plata' || plan.id === 'oro') || currentPlan === 'plata' && plan.id === 'oro';
            return (
              <div key={plan.id} className="rounded-2xl p-6 flex flex-col" style={{ backgroundColor: '#FFFFFF', border: isActive ? '2px solid #0A0A0A' : '1px solid #E5E5E5', boxShadow: isActive ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                <div className="mb-6">
                  {isActive && (<div className="flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full inline-flex" style={{ backgroundColor: '#0A0A0A' }}><Star className="w-3.5 h-3.5" style={{ color: '#FFFFFF' }} /><span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Plan actual</span></div>)}
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-h3)', lineHeight: 'var(--line-height-heading)', color: 'var(--foreground)', marginBottom: '8px' }}>{plan.name}</h4>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', lineHeight: '1.5' }}>{plan.description}</p>
                </div>
                <div className="flex-1 space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="flex-shrink-0" style={{ marginTop: '2px' }}>{feature.included ? <Check className="w-4 h-4" style={{ color: '#647E3F' }} /> : <X className="w-4 h-4" style={{ color: '#C3C3C3' }} />}</div>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: feature.included ? 'var(--foreground)' : '#A3A3A3', lineHeight: '1.5' }}>{feature.name}</span>
                    </div>
                  ))}
                </div>
                <button disabled={isActive} onClick={() => { if (!isActive) { setPendingPlan(plan.id); setShowUpgradeModal(true); } }} className="w-full py-2.5 px-6 transition-all" style={{ backgroundColor: isActive ? '#F5F5F5' : isHigher ? '#006B4E' : '#FFFFFF', color: isActive ? '#A3A3A3' : isHigher ? '#FFFFFF' : 'var(--foreground)', border: isActive ? '2px solid #E5E5E5' : isHigher ? 'none' : '2px solid #DEDEDE', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-wide)', lineHeight: 'var(--line-height-ui)', cursor: isActive ? 'not-allowed' : 'pointer' }} onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = isHigher ? '#01533E' : '#FAFAFA'; }} onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = isHigher ? '#006B4E' : '#FFFFFF'; }}>{isActive ? 'Plan activo' : isHigher ? 'Contratar plan' : 'Cambiar a este plan'}</button>
              </div>
            );
          })}
        </div>
      </section>
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-h3)', lineHeight: 'var(--line-height-heading)', color: 'var(--foreground)', marginBottom: '8px' }}>Historial de facturación</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', lineHeight: 'var(--line-height-body)' }}>Consulta y descarga tus facturas anteriores</p>
          </div>
          <button onClick={() => setShowCancelModal(true)} className="px-6 py-2.5 transition-all" style={{ backgroundColor: '#FFFFFF', color: '#737373', border: '2px solid #DEDEDE', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-wide)', lineHeight: 'var(--line-height-ui)' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FEE2E2'; e.currentTarget.style.borderColor = '#DC2626'; e.currentTarget.style.color = '#DC2626'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.borderColor = '#DEDEDE'; e.currentTarget.style.color = '#737373'; }}>Cancelar suscripción</button>
        </div>
        <div className="bg-white rounded-xl" style={{ border: '2px solid #DEDEDE', overflow: 'hidden' }}>
          <div className="grid grid-cols-12 gap-4 px-6 py-4" style={{ backgroundColor: '#FAFAFA', borderBottom: '1px solid #DEDEDE' }}>
            <div className="col-span-2"><span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#737373', letterSpacing: 'var(--letter-spacing-wide)', textTransform: 'uppercase' }}>Fecha</span></div>
            <div className="col-span-5"><span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#737373', letterSpacing: 'var(--letter-spacing-wide)', textTransform: 'uppercase' }}>Motivo</span></div>
            <div className="col-span-3"><span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#737373', letterSpacing: 'var(--letter-spacing-wide)', textTransform: 'uppercase' }}>Monto</span></div>
            <div className="col-span-2 text-right"><span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#737373', letterSpacing: 'var(--letter-spacing-wide)', textTransform: 'uppercase' }}>Acción</span></div>
          </div>
          <div>
            {invoices.map((invoice, index) => (
              <div key={invoice.id} className="grid grid-cols-12 gap-4 px-6 py-5 transition-colors" style={{ borderBottom: index < invoices.length - 1 ? '1px solid #DEDEDE' : 'none' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FAFAFA'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
                <div className="col-span-2 flex items-center"><span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-regular)', color: '#737373', lineHeight: 'var(--line-height-ui)' }}>{invoice.date}</span></div>
                <div className="col-span-5 flex items-center"><span className="inline-flex items-center px-3 py-1.5 rounded-full" style={{ ...getReasonBadgeStyle(invoice.reasonType), fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', lineHeight: 'var(--line-height-ui)' }}>{invoice.reason}</span></div>
                <div className="col-span-3 flex items-center"><span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', lineHeight: 'var(--line-height-ui)' }}>{invoice.amount}</span></div>
                <div className="col-span-2 flex items-center justify-end"><button onClick={() => handleDownload(invoice.id)} className="inline-flex items-center gap-2 px-4 py-2 transition-all" style={{ backgroundColor: '#FFFFFF', color: 'var(--foreground)', border: '1px solid #DEDEDE', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-wide)', lineHeight: 'var(--line-height-ui)' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0A0A0A'; e.currentTarget.style.color = '#FFFFFF'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.color = 'var(--foreground)'; }}><CreditCard className="w-4 h-4" />Descargar</button></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onClick={() => setShowCancelModal(false)}>
          <div className="bg-white rounded-xl p-8 max-w-md w-full" style={{ border: '2px solid #DEDEDE' }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FEE2E2' }}><AlertCircle className="w-6 h-6" style={{ color: '#DC2626' }} /></div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-h3)', color: 'var(--foreground)', lineHeight: 'var(--line-height-heading)', marginBottom: '0.5rem' }}>¿Cancelar tu suscripción?</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', lineHeight: 'var(--line-height-body)' }}>Tu plan se mantendrá activo hasta el final del periodo de facturación actual (28 Feb 2025). Después de esa fecha, perderás acceso a todas las funcionalidades premium.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowCancelModal(false)} className="flex-1 px-6 py-3 transition-all" style={{ backgroundColor: '#006B4E', color: '#FFFFFF', border: '2px solid #006B4E', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-wide)', lineHeight: 'var(--line-height-ui)' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#01533E'; e.currentTarget.style.borderColor = '#01533E'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#006B4E'; e.currentTarget.style.borderColor = '#006B4E'; }}>Mantener plan</button>
              <button onClick={handleCancelPlan} className="flex-1 px-6 py-3 transition-all" style={{ backgroundColor: '#FFFFFF', color: '#DC2626', border: '2px solid #DEDEDE', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-wide)', lineHeight: 'var(--line-height-ui)' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FEE2E2'; e.currentTarget.style.borderColor = '#DC2626'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.borderColor = '#DEDEDE'; }}>Sí, cancelar</button>
            </div>
          </div>
        </div>
      )}
      {showUpgradeModal && pendingPlanData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onClick={() => { setShowUpgradeModal(false); setPendingPlan(null); }}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full" style={{ border: '1px solid #E5E5E5', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }} onClick={(e) => e.stopPropagation()}>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F0FDF4' }}>
                  <TrendingUp className="w-5 h-5" style={{ color: '#006B4E' }} />
                </div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#006B4E', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Cambio de plan</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-h3)', color: 'var(--foreground)', lineHeight: 'var(--line-height-heading)', marginBottom: '4px' }}>
                Cambia al Plan {pendingPlanData.name}
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>
                {pendingPlanData.price}/mes · {pendingPlanData.description}
              </p>
            </div>
            {newBenefits.length > 0 && (
              <div className="rounded-xl p-4 mb-6 space-y-2" style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#15803D', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Lo que ganas con este plan</p>
                {newBenefits.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 flex-shrink-0" style={{ color: '#16A34A' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#15803D' }}>{f.name}</span>
                  </div>
                ))}
              </div>
            )}
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', marginBottom: '24px', lineHeight: '1.5' }}>
              El cambio se aplicará inmediatamente y el nuevo monto se reflejará en tu próximo ciclo de facturación.
            </p>
            <div className="flex gap-3">
              <button onClick={() => { setShowUpgradeModal(false); setPendingPlan(null); }} className="flex-1 px-6 py-3 transition-all" style={{ backgroundColor: '#FFFFFF', color: 'var(--foreground)', border: '2px solid #DEDEDE', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F5F5F5'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}>Cancelar</button>
              <button onClick={() => { setShowUpgradeModal(false); setShowPaymentModal(true); }} className="flex-1 px-6 py-3 transition-all" style={{ backgroundColor: '#006B4E', color: '#FFFFFF', border: '2px solid #006B4E', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#01533E'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}>Contratar</button>
            </div>
          </div>
        </div>
      )}
      {showPaymentModal && pendingPlanData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={() => { setShowPaymentModal(false); setPendingPlan(null); setPaymentMethod(null); setBillingPeriod('monthly'); }}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full" style={{ border: '1px solid #E5E5E5', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }} onClick={e => e.stopPropagation()}>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F0FDF4' }}>
                  <CreditCard className="w-5 h-5" style={{ color: '#006B4E' }} />
                </div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#006B4E', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Método de pago</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-h3)', color: 'var(--foreground)', lineHeight: 'var(--line-height-heading)', marginBottom: '4px' }}>Plan {pendingPlanData.name}</h3>
              {billingPeriod === 'monthly' ? (
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>{pendingPlanData.price}/mes</p>
              ) : (
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: 'var(--foreground)' }}>{formatCLP(annualMonthlyAmount)}/mes</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#737373' }}>Facturado anualmente · {formatCLP(annualTotalAmount)}/año</p>
                </div>
              )}
            </div>
            <div className="flex gap-2 rounded-full p-1 mb-6" style={{ backgroundColor: '#FAFAFA', border: '1px solid #E5E5E5' }}>
              <button onClick={() => setBillingPeriod('monthly')} className="flex-1 px-4 py-1.5 rounded-full transition-all" style={{ border: 'none', backgroundColor: billingPeriod === 'monthly' ? '#0A0A0A' : 'transparent', color: billingPeriod === 'monthly' ? '#FFFFFF' : '#737373', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: billingPeriod === 'monthly' ? 600 : 400, cursor: 'pointer' }}>Por mes</button>
              <button onClick={() => setBillingPeriod('annual')} className="flex-1 px-4 py-1.5 rounded-full transition-all" style={{ border: 'none', backgroundColor: billingPeriod === 'annual' ? '#0A0A0A' : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <span style={{ color: billingPeriod === 'annual' ? '#FFFFFF' : '#737373', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: billingPeriod === 'annual' ? 600 : 400 }}>Por año</span>
                <span style={{ backgroundColor: billingPeriod === 'annual' ? '#16A34A' : '#DCFCE7', color: billingPeriod === 'annual' ? '#FFFFFF' : '#16A34A', fontSize: '11px', fontWeight: 700, padding: '2px 6px', borderRadius: '100px', fontFamily: 'var(--font-body)' }}>-10%</span>
              </button>
            </div>
            <div className="space-y-3 mb-6">
              <button onClick={() => setPaymentMethod('card')} className="w-full p-4 rounded-xl flex items-center gap-3 transition-all text-left" style={{ border: paymentMethod === 'card' ? '2px solid #006B4E' : '2px solid #E5E5E5', backgroundColor: paymentMethod === 'card' ? '#F0FDF4' : '#FFFFFF', cursor: 'pointer' }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: paymentMethod === 'card' ? '#DCFCE7' : '#F5F5F5' }}>
                  <CreditCard className="w-5 h-5" style={{ color: paymentMethod === 'card' ? '#006B4E' : '#737373' }} />
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)' }}>Tarjeta de crédito o débito</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#737373' }}>Visa, Mastercard, American Express</p>
                </div>
              </button>
              <button onClick={() => setPaymentMethod('mercadopago')} className="w-full p-4 rounded-xl flex items-center gap-3 transition-all text-left" style={{ border: paymentMethod === 'mercadopago' ? '2px solid #009EE3' : '2px solid #E5E5E5', backgroundColor: paymentMethod === 'mercadopago' ? '#EFF9FF' : '#FFFFFF', cursor: 'pointer' }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: paymentMethod === 'mercadopago' ? '#BAE6FD' : '#F5F5F5' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 800, color: paymentMethod === 'mercadopago' ? '#009EE3' : '#737373', letterSpacing: '-0.5px' }}>MP</span>
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)' }}>Mercado Pago</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#737373' }}>Pagá con tu cuenta de Mercado Pago</p>
                </div>
              </button>
            </div>
            {paymentMethod === 'card' && (
              <div className="space-y-4 mb-6">
                <div>
                  <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#737373', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Número de tarjeta</label>
                  <input placeholder="0000 0000 0000 0000" maxLength={19} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '2px solid #E5E5E5', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: 'var(--foreground)', outline: 'none', boxSizing: 'border-box' }} onFocus={e => e.currentTarget.style.borderColor = '#006B4E'} onBlur={e => e.currentTarget.style.borderColor = '#E5E5E5'} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#737373', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Vencimiento</label>
                    <input placeholder="MM/AA" maxLength={5} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '2px solid #E5E5E5', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: 'var(--foreground)', outline: 'none', boxSizing: 'border-box' }} onFocus={e => e.currentTarget.style.borderColor = '#006B4E'} onBlur={e => e.currentTarget.style.borderColor = '#E5E5E5'} />
                  </div>
                  <div>
                    <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#737373', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>CVV</label>
                    <input placeholder="000" maxLength={4} type="password" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '2px solid #E5E5E5', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: 'var(--foreground)', outline: 'none', boxSizing: 'border-box' }} onFocus={e => e.currentTarget.style.borderColor = '#006B4E'} onBlur={e => e.currentTarget.style.borderColor = '#E5E5E5'} />
                  </div>
                </div>
                <div>
                  <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#737373', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Nombre en la tarjeta</label>
                  <input placeholder="Como aparece en tu tarjeta" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '2px solid #E5E5E5', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: 'var(--foreground)', outline: 'none', boxSizing: 'border-box' }} onFocus={e => e.currentTarget.style.borderColor = '#006B4E'} onBlur={e => e.currentTarget.style.borderColor = '#E5E5E5'} />
                </div>
              </div>
            )}
            {paymentMethod === 'mercadopago' && (
              <div className="rounded-xl p-4 mb-6" style={{ backgroundColor: '#EFF9FF', border: '1px solid #BAE6FD' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#0369A1', lineHeight: '1.5' }}>Serás redirigido a Mercado Pago para completar el pago de forma segura. El plan se activará automáticamente al confirmar.</p>
              </div>
            )}
            <div className="flex gap-3">
              <button onClick={() => { setShowPaymentModal(false); setPendingPlan(null); setPaymentMethod(null); setBillingPeriod('monthly'); }} className="flex-1 px-6 py-3 transition-all" style={{ backgroundColor: '#FFFFFF', color: 'var(--foreground)', border: '2px solid #DEDEDE', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F5F5F5'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}>Cancelar</button>
              <button onClick={handleUpgrade} disabled={!paymentMethod} className="flex-1 px-6 py-3 transition-all" style={{ backgroundColor: paymentMethod ? '#006B4E' : '#E5E5E5', color: paymentMethod ? '#FFFFFF' : '#A3A3A3', border: 'none', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', cursor: paymentMethod ? 'pointer' : 'not-allowed' }} onMouseEnter={e => { if (paymentMethod) e.currentTarget.style.backgroundColor = '#01533E'; }} onMouseLeave={e => { if (paymentMethod) e.currentTarget.style.backgroundColor = '#006B4E'; }}>{billingPeriod === 'monthly' ? `Pagar ${pendingPlanData.price}` : `Pagar ${formatCLP(annualTotalAmount)}/año`}</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// HelpContent is now imported from HelpContent.tsx

// SettingsContent is now imported from SettingsContent.tsx
