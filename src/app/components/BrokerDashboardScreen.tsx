import React from 'react';
import { MyPublicationsView } from '@/app/components/MyPublicationsView';
import { BrokerInquiriesSection } from '@/app/components/BrokerInquiriesSection';
import { ConsultasView } from '@/app/components/ConsultasView';
import { CalendariosView } from '@/app/components/CalendariosView';
import { RendimientoView } from '@/app/components/RendimientoView';
import { SettingsContent } from '@/app/components/SettingsContent';
import { ReservasAdminView } from '@/app/components/ReservasAdminView';
import { SugerenciasButton } from '@/app/components/SugerenciasButton';
import { AdminInsightsModule } from '@/app/components/AdminInsightsModule';
import { Eye, MessageCircle, Heart, Bookmark, ArrowUp, ArrowDown, Plus, Share2, Building2, Users, AlertCircle, CheckCircle, TrendingUp, Star, Zap, Award, Check, X, CreditCard } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { DashboardRef } from '@/app/App';

interface BrokerDashboardScreenProps {
  onNavigate: (screen: string, id?: number) => void;
}

export const BrokerDashboardScreen = React.forwardRef<DashboardRef, BrokerDashboardScreenProps>(
  ({ onNavigate }, ref) => {
    const [showMenu, setShowMenu] = React.useState(false);
    const [currentSection, setCurrentSection] = React.useState('home');
    const [triggerPublishModal, setTriggerPublishModal] = React.useState(0);

    // Exponer función para abrir modal de publicación
    React.useImperativeHandle(ref, () => ({
      openPublishModal: () => {
        setCurrentSection('listings');
        setTriggerPublishModal(prev => prev + 1);
      }
    }));

  const navGroups = [
    [
      { id: 'home', label: 'Inicio', icon: 'home' },
      { id: 'listings', label: 'Mis publicaciones', icon: 'list' },
      { id: 'inquiries', label: 'Consultas', icon: 'message' },
      { id: 'reservas', label: 'Reservas', icon: 'file' },
      { id: 'calendarios', label: 'Calendarios', icon: 'calendar' },
    ],
    [
      { id: 'performance', label: 'Rendimiento', icon: 'chart' },
      { id: 'insights',    label: 'Insights IA', icon: 'sparkles' },
      { id: 'plan',        label: 'Plan y facturación', icon: 'card' },
    ],
    [
      { id: 'profile', label: 'Perfil', icon: 'profile' },
      { id: 'settings', label: 'Configuración', icon: 'settings' },
      { id: 'help', label: 'Ayuda', icon: 'help' },
    ],
  ];

  const renderIcon = (iconType: string, isActive: boolean) => {
    const color = 'currentColor';
    const strokeWidth = isActive ? 2.5 : 2;

    switch (iconType) {
      case 'home':
        return (
          <svg className="w-5 h-5" fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth={strokeWidth}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'list':
        return (
          <svg className="w-5 h-5" fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth={strokeWidth}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        );
      case 'message':
        return (
          <svg className="w-5 h-5" fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth={strokeWidth}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        );
      case 'chart':
        return (
          <svg className="w-5 h-5" fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth={strokeWidth}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'card':
        return (
          <svg className="w-5 h-5" fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth={strokeWidth}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        );
      case 'help':
        return (
          <svg className="w-5 h-5" fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth={strokeWidth}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'calendar':
        return (
          <svg className="w-5 h-5" fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth={strokeWidth}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'profile':
        return (
          <svg className="w-5 h-5" fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth={strokeWidth}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'settings':
        return (
          <svg className="w-5 h-5" fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth={strokeWidth}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      case 'file':
        return (
          <svg className="w-5 h-5" fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth={strokeWidth}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'sparkles':
        return (
          <svg className="w-5 h-5" fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth={strokeWidth}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="fixed inset-0" style={{ backgroundColor: '#002F23', zIndex: 5 }} />
      {/* Nav Rail - Left Sidebar */}
      <aside className="w-56 flex-shrink-0 fixed left-0 top-0 bottom-0 z-20" style={{ backgroundColor: '#002F23' }}>
        <div className="h-full flex flex-col">
          {/* Logo Area */}
          <div className="p-2 mt-8">
            <div className="font-bold text-base" style={{ color: '#FFFFFF' }}>CompraTuParcela</div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 py-4 overflow-y-auto scrollbar-hide">
            {navGroups.map((group, groupIdx) => (
              <React.Fragment key={groupIdx}>
                {groupIdx > 0 && (
                  <div style={{ height: '1px', margin: '6px 16px', backgroundColor: 'rgba(255,255,255,0.08)' }} />
                )}
                {group.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentSection(item.id)}
                    className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                      currentSection === item.id ? 'font-medium' : ''
                    }`}
                    style={{
                      color: currentSection === item.id ? '#002F23' : 'rgba(255,255,255,0.65)',
                      width: 'calc(100% - 16px)',
                      marginLeft: '8px',
                      marginRight: '8px',
                      borderRadius: '8px',
                      ...(currentSection === item.id
                        ? { backgroundColor: '#FFFFFF' }
                        : { transition: 'background-color 0.2s ease' })
                    }}
                    onMouseEnter={(e) => {
                      if (currentSection !== item.id) {
                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.07)';
                        e.currentTarget.style.color = 'rgba(255,255,255,0.9)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (currentSection !== item.id) {
                        e.currentTarget.style.backgroundColor = '';
                        e.currentTarget.style.color = 'rgba(255,255,255,0.65)';
                      }
                    }}
                  >
                    {renderIcon(item.icon, currentSection === item.id)}
                    <span>{item.label}</span>
                  </button>
                ))}
              </React.Fragment>
            ))}
          </nav>

          {/* Sugerencias */}
          <div className="px-4 py-5">
            <SugerenciasButton />
          </div>

          {/* User Profile Area */}
          <div className="p-4" style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-full flex items-center gap-3 text-sm"
              style={{ color: 'rgba(255,255,255,0.65)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.9)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ border: '1.5px solid rgba(255,255,255,0.3)' }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="flex-1 text-left font-medium">Mi cuenta</span>
            </button>
            <div className="mt-2 pl-11">
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>Plan Básico</span>
            </div>
            {showMenu && (
              <div className="mt-2 rounded-lg overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                <button
                  onClick={() => onNavigate('entry')}
                  className="w-full text-left text-xs py-2 px-3"
                  style={{ color: 'rgba(255,255,255,0.8)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.07)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ''; }}
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="fixed overflow-y-auto bg-white rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.45)]" style={{ left: '224px', top: 'calc(32px + 12px)', right: '12px', bottom: '12px', zIndex: 10 }}>
        {currentSection === 'home' && <HomeContent />}
        {currentSection === 'listings' && <MyPublicationsView userType="broker" userId="broker-456" onNavigate={onNavigate} onNavigateToSection={setCurrentSection} autoOpenModal={triggerPublishModal} />}
        {currentSection === 'inquiries' && <ConsultasView viewType="broker" />}
        {currentSection === 'reservas' && (
          <div className="p-8">
            <div className="mb-6">
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h3)', fontWeight: 600, color: '#0A0A0A' }}>Reservas</h1>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', marginTop: '4px' }}>Gestión de comprobantes y confirmación de reservas</p>
            </div>
            <ReservasAdminView />
          </div>
        )}
        {currentSection === 'calendarios' && (
          <div className="flex flex-col" style={{ height: 'calc(100vh - 32px)' }}>
            <CalendariosView />
          </div>
        )}
        {currentSection === 'performance' && <RendimientoView viewType="broker" />}
        {currentSection === 'insights'    && <AdminInsightsModule />}
        {currentSection === 'plan' && <PlanContent />}
        {currentSection === 'help' && <HelpContent />}
        {currentSection === 'profile' && <SettingsContent mode="profile" userType="broker" />}
        {currentSection === 'settings' && <SettingsContent mode="settings" userType="broker" />}
      </div>
    </>
  );
});

// Home Section Component
function HomeContent() {
  const [selectedPeriod, setSelectedPeriod] = React.useState<'7' | '30' | '90'>('30');

  // Datos simulados para gráfico de evolución
  const interestData = selectedPeriod === '7' ? [
    { date: '21 Ene', interacciones: 38 },
    { date: '22 Ene', interacciones: 45 },
    { date: '23 Ene', interacciones: 42 },
    { date: '24 Ene', interacciones: 51 },
    { date: '25 Ene', interacciones: 48 },
    { date: '26 Ene', interacciones: 62 },
    { date: '27 Ene', interacciones: 71 },
  ] : selectedPeriod === '30' ? [
    { date: 'Sem 1', interacciones: 156 },
    { date: 'Sem 2', interacciones: 189 },
    { date: 'Sem 3', interacciones: 212 },
    { date: 'Sem 4', interacciones: 245 },
  ] : [
    { date: 'Mes 1', interacciones: 634 },
    { date: 'Mes 2', interacciones: 712 },
    { date: 'Mes 3', interacciones: 802 },
  ];

  // Datos para gráfico de barras - consultas por propiedad
  const consultasPorPropiedad = [
    { name: 'Vista Cordillera', consultas: 24 },
    { name: 'Los Cedros', consultas: 18 },
    { name: 'Valle Alto', consultas: 15 },
    { name: 'El Roble', consultas: 12 },
    { name: 'Los Andes', consultas: 8 },
  ];

  // Datos para gráfico donut - tipo de interacción
  const tiposInteraccion = [
    { name: 'Consultas', value: 45, color: '#006B4E' },
    { name: 'Guardados', value: 35, color: '#462611' },
    { name: 'Clicks contacto', value: 20, color: '#7D460D' },
  ];

  // Datos del ranking de propiedades
  const propiedadesRanking = [
    { 
      name: 'Parcela Vista Cordillera', 
      location: 'Lo Barnechea',
      inmobiliaria: 'InmoSur',
      views: 267, 
      consultas: 24, 
      status: 'high',
      statusLabel: 'Alta demanda',
      trend: 'up',
      trendValue: '+18%'
    },
    { 
      name: 'Parcela Los Cedros', 
      location: 'Colina',
      inmobiliaria: 'Propiedades Chile',
      views: 234, 
      consultas: 18, 
      status: 'high',
      statusLabel: 'Alta demanda',
      trend: 'up',
      trendValue: '+12%'
    },
    { 
      name: 'Terreno Valle Alto', 
      location: 'San Bernardo',
      inmobiliaria: 'Broker directo',
      views: 189, 
      consultas: 15, 
      status: 'medium',
      statusLabel: 'Demanda media',
      trend: 'neutral',
      trendValue: '+5%'
    },
    { 
      name: 'Parcela El Roble', 
      location: 'Lampa',
      inmobiliaria: 'InmoSur',
      views: 156, 
      consultas: 12, 
      status: 'medium',
      statusLabel: 'Demanda media',
      trend: 'up',
      trendValue: '+8%'
    },
    { 
      name: 'Terreno Los Andes', 
      location: 'Los Andes',
      inmobiliaria: 'Broker directo',
      views: 98, 
      consultas: 8, 
      status: 'low',
      statusLabel: 'Baja demanda',
      trend: 'down',
      trendValue: '-3%'
    },
  ];

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
            Panel de oportunidades
          </h1>
          <p style={{ 
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-base)',
            color: '#737373',
            marginTop: '8px'
          }}>
            Visualiza y gestiona las propiedades que estás promoviendo
          </p>
        </div>
        <div className="flex gap-3">
          <button className="py-2.5 px-5 flex items-center gap-2 transition-all" style={{
            backgroundColor: '#006B4E',
            color: '#FFFFFF',
            borderRadius: '200px',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-sm)',
            fontWeight: 'var(--font-weight-medium)',
            letterSpacing: 'var(--letter-spacing-wide)',
            lineHeight: 'var(--line-height-ui)'
          }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#01533E'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#006B4E'; }}
          >
            <Plus className="w-4 h-4" />
            Agregar a seguimiento
          </button>
        </div>
      </div>

      {/* KPIs Section */}
      <section className="grid grid-cols-4 gap-6">
        {/* Propiedades en seguimiento */}
        <div className="rounded-2xl p-6 flex flex-col" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 4px 12px 0 rgba(0, 107, 78, 0.08)' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 107, 78, 0.1)' }}>
              <Bookmark className="w-5 h-5" style={{ color: '#006B4E' }} />
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full" style={{ backgroundColor: 'rgba(100, 126, 63, 0.1)' }}>
              <ArrowUp className="w-3 h-3" style={{ color: '#647E3F' }} />
              <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#647E3F' }}>
                +2
              </span>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div style={{ 
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'var(--font-weight-medium)',
              color: '#6B6B6B',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              lineHeight: '1.4'
            }}>
              En seguimiento
            </div>
            <div style={{ 
              fontFamily: 'var(--font-heading)',
              fontSize: '48px',
              fontWeight: 'var(--font-weight-light)',
              lineHeight: '1',
              color: '#0A0A0A',
              marginTop: '12px',
              marginBottom: '8px'
            }}>
              8
            </div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: '#A3A3A3', lineHeight: '1.5' }}>
              2 agregadas esta semana
            </div>
          </div>
        </div>
        
        {/* Visualizaciones totales */}
        <div className="rounded-2xl p-6 flex flex-col" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 4px 12px 0 rgba(0, 107, 78, 0.08)' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 107, 78, 0.1)' }}>
              <Eye className="w-5 h-5" style={{ color: '#006B4E' }} />
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full" style={{ backgroundColor: 'rgba(100, 126, 63, 0.1)' }}>
              <ArrowUp className="w-3 h-3" style={{ color: '#647E3F' }} />
              <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#647E3F' }}>
                +28%
              </span>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div style={{ 
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'var(--font-weight-medium)',
              color: '#6B6B6B',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              lineHeight: '1.4'
            }}>
              Visualizaciones
            </div>
            <div style={{ 
              fontFamily: 'var(--font-heading)',
              fontSize: '48px',
              fontWeight: 'var(--font-weight-light)',
              lineHeight: '1',
              color: '#0A0A0A',
              marginTop: '12px',
              marginBottom: '8px'
            }}>
              2,148
            </div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: '#A3A3A3', lineHeight: '1.5' }}>
              Últimos 30 días
            </div>
          </div>
        </div>
        
        {/* Consultas generadas */}
        <div className="rounded-2xl p-6 flex flex-col" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 4px 12px 0 rgba(0, 107, 78, 0.08)' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 107, 78, 0.1)' }}>
              <MessageCircle className="w-5 h-5" style={{ color: '#006B4E' }} />
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full" style={{ backgroundColor: 'rgba(70, 38, 17, 0.1)' }}>
              <AlertCircle className="w-3 h-3" style={{ color: '#462611' }} />
              <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#462611' }}>
                3 nuevas
              </span>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div style={{ 
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'var(--font-weight-medium)',
              color: '#6B6B6B',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              lineHeight: '1.4'
            }}>
              Consultas generadas
            </div>
            <div style={{ 
              fontFamily: 'var(--font-heading)',
              fontSize: '48px',
              fontWeight: 'var(--font-weight-light)',
              lineHeight: '1',
              color: '#0A0A0A',
              marginTop: '12px',
              marginBottom: '8px'
            }}>
              42
            </div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: '#A3A3A3', lineHeight: '1.5' }}>
              Últimos 30 días
            </div>
          </div>
        </div>
        
        {/* Propiedades guardadas */}
        <div className="rounded-2xl p-6 flex flex-col" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 4px 12px 0 rgba(0, 107, 78, 0.08)' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 107, 78, 0.1)' }}>
              <Heart className="w-5 h-5" style={{ color: '#006B4E' }} />
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full" style={{ backgroundColor: 'rgba(100, 126, 63, 0.1)' }}>
              <ArrowUp className="w-3 h-3" style={{ color: '#647E3F' }} />
              <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#647E3F' }}>
                +19%
              </span>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div style={{ 
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'var(--font-weight-medium)',
              color: '#6B6B6B',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              lineHeight: '1.4'
            }}>
              Favoritos usuarios
            </div>
            <div style={{ 
              fontFamily: 'var(--font-heading)',
              fontSize: '48px',
              fontWeight: 'var(--font-weight-light)',
              lineHeight: '1',
              color: '#0A0A0A',
              marginTop: '12px',
              marginBottom: '8px'
            }}>
              67
            </div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: '#A3A3A3', lineHeight: '1.5' }}>
              Señal de alto interés
            </div>
          </div>
        </div>
      </section>

      {/* Gráfico principal - Interés en propiedades */}
      <section className="rounded-2xl p-6 space-y-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
        <div className="flex items-center justify-between">
          <h2 style={{ 
            fontFamily: 'var(--font-heading)',
            fontWeight: 'var(--font-weight-medium)',
            fontSize: 'var(--font-size-h3)',
            lineHeight: 'var(--line-height-heading)',
            color: '#0A0A0A'
          }}>
            Interés en propiedades
          </h2>
          <div className="flex gap-2 rounded-full p-1" style={{ backgroundColor: '#FAFAFA', border: '1px solid #E5E5E5' }}>
            {(['7', '30', '90'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className="px-4 py-1.5 rounded-full transition-all"
                style={{
                  backgroundColor: selectedPeriod === period ? '#0A0A0A' : 'transparent',
                  color: selectedPeriod === period ? '#FFFFFF' : '#737373',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'var(--font-weight-medium)'
                }}
              >
                {period} días
              </button>
            ))}
          </div>
        </div>
        <div style={{ width: '100%', height: '320px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={interestData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#CDD8DE" />
              <XAxis 
                dataKey="date" 
                style={{ fontSize: '12px', fontFamily: 'var(--font-body)', fill: '#737373' }}
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
              <Line 
                type="monotone" 
                dataKey="interacciones" 
                stroke="#006B4E" 
                strokeWidth={3}
                dot={{ fill: '#006B4E', r: 4 }}
                activeDot={{ r: 6, fill: '#006B4E' }}
                name="Interacciones"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Gráficos secundarios */}
      <div className="grid grid-cols-2 gap-6">
        {/* Gráfico de barras - Consultas por propiedad */}
        <section className="rounded-2xl p-6 space-y-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
          <h2 style={{ 
            fontFamily: 'var(--font-heading)',
            fontWeight: 'var(--font-weight-medium)',
            fontSize: 'var(--font-size-h4)',
            lineHeight: 'var(--line-height-heading)',
            color: '#0A0A0A'
          }}>
            Consultas por propiedad
          </h2>
          <div style={{ width: '100%', height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={consultasPorPropiedad}>
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
          <h2 style={{ 
            fontFamily: 'var(--font-heading)',
            fontWeight: 'var(--font-weight-medium)',
            fontSize: 'var(--font-size-h4)',
            lineHeight: 'var(--line-height-heading)',
            color: '#0A0A0A'
          }}>
            Tipo de interacción
          </h2>
          <div style={{ width: '100%', height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tiposInteraccion}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {tiposInteraccion.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #CDD8DE', 
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

      {/* Ranking de propiedades en seguimiento */}
      <section className="rounded-2xl p-6 space-y-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
        <div className="flex items-center justify-between">
          <h2 style={{ 
            fontFamily: 'var(--font-heading)',
            fontWeight: 'var(--font-weight-medium)',
            fontSize: 'var(--font-size-h3)',
            lineHeight: 'var(--line-height-heading)',
            color: '#0A0A0A'
          }}>
            Propiedades en seguimiento
          </h2>
          <button className="py-2 px-4 flex items-center gap-2 transition-all" style={{ 
            backgroundColor: '#FFFFFF',
            color: '#0A0A0A',
            border: '2px solid #DEDEDE',
            borderRadius: '200px',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-xs)',
            fontWeight: 'var(--font-weight-medium)',
            letterSpacing: 'var(--letter-spacing-wide)',
            lineHeight: 'var(--line-height-ui)'
          }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
          >
            <Building2 className="w-3.5 h-3.5" />
            Contactar inmobiliaria
          </button>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 pb-3" style={{ borderBottom: '1px solid #E5E5E5' }}>
          <div className="col-span-5" style={{ 
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-xs)',
            fontWeight: 'var(--font-weight-semibold)',
            color: '#737373',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Propiedad
          </div>
          <div className="col-span-2 text-center" style={{ 
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-xs)',
            fontWeight: 'var(--font-weight-semibold)',
            color: '#737373',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Visualizaciones
          </div>
          <div className="col-span-2 text-center" style={{ 
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-xs)',
            fontWeight: 'var(--font-weight-semibold)',
            color: '#737373',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Consultas
          </div>
          <div className="col-span-2 text-center" style={{ 
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-xs)',
            fontWeight: 'var(--font-weight-semibold)',
            color: '#737373',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Tendencia
          </div>
          <div className="col-span-1 text-right" style={{ 
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-xs)',
            fontWeight: 'var(--font-weight-semibold)',
            color: '#737373',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Estado
          </div>
        </div>

        {/* Table Rows */}
        <div className="space-y-3">
          {propiedadesRanking.map((propiedad, index) => (
            <div 
              key={index}
              className="grid grid-cols-12 gap-4 py-4 rounded-xl transition-all cursor-pointer" 
              style={{ border: '1px solid #F5F5F5' }}
              onMouseEnter={(e) => { 
                e.currentTarget.style.backgroundColor = '#FAFAFA'; 
                e.currentTarget.style.borderColor = '#E5E5E5';
              }}
              onMouseLeave={(e) => { 
                e.currentTarget.style.backgroundColor = 'transparent'; 
                e.currentTarget.style.borderColor = '#F5F5F5';
              }}
            >
              <div className="col-span-5 flex items-center gap-3 pl-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ 
                  backgroundColor: '#FAFAFA',
                  border: '1px solid #E5E5E5',
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: '#737373'
                }}>
                  {index + 1}
                </div>
                <div>
                  <div style={{ 
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--font-size-body-base)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-ui)'
                  }}>
                    {propiedad.name}
                  </div>
                  <div className="flex items-center gap-2" style={{ marginTop: '2px' }}>
                    <span style={{ fontSize: 'var(--font-size-xs)', color: '#737373' }}>
                      {propiedad.location}
                    </span>
                    <span style={{ fontSize: 'var(--font-size-xs)', color: '#C3C3C3' }}>•</span>
                    <span style={{ fontSize: 'var(--font-size-xs)', color: '#737373' }}>
                      {propiedad.inmobiliaria}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-span-2 flex items-center justify-center">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" style={{ color: '#737373' }} />
                  <span style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-base)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: '#0A0A0A'
                  }}>
                    {propiedad.views}
                  </span>
                </div>
              </div>
              <div className="col-span-2 flex items-center justify-center">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" style={{ color: '#737373' }} />
                  <span style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-base)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: '#0A0A0A'
                  }}>
                    {propiedad.consultas}
                  </span>
                </div>
              </div>
              <div className="col-span-2 flex items-center justify-center">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ 
                  backgroundColor: propiedad.trend === 'up' ? '#DCFCE7' : propiedad.trend === 'down' ? '#FEE2E2' : '#F5F5F5'
                }}>
                  {propiedad.trend === 'up' && <ArrowUp className="w-3.5 h-3.5" style={{ color: '#16A34A' }} />}
                  {propiedad.trend === 'down' && <ArrowDown className="w-3.5 h-3.5" style={{ color: '#DC2626' }} />}
                  <span style={{ 
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: propiedad.trend === 'up' ? '#16A34A' : propiedad.trend === 'down' ? '#DC2626' : '#737373'
                  }}>
                    {propiedad.trendValue}
                  </span>
                </div>
              </div>
              <div className="col-span-1 flex items-center justify-end pr-4">
                <span className="px-2.5 py-1 rounded-full whitespace-nowrap" style={{ 
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'var(--font-weight-medium)',
                  backgroundColor: propiedad.status === 'high' ? '#DCFCE7' : propiedad.status === 'medium' ? '#FEF3C7' : '#FEE2E2',
                  color: propiedad.status === 'high' ? '#16A34A' : propiedad.status === 'medium' ? '#CA8A04' : '#DC2626'
                }}>
                  {propiedad.statusLabel}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full py-2.5 px-6 transition-all" style={{ 
          backgroundColor: '#FFFFFF',
          color: '#737373',
          border: '2px solid #DEDEDE',
          borderRadius: '200px',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-body-sm)',
          fontWeight: 'var(--font-weight-medium)',
          letterSpacing: 'var(--letter-spacing-wide)',
          lineHeight: 'var(--line-height-ui)'
        }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FAFAFA'; e.currentTarget.style.color = '#0A0A0A'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.color = '#737373'; }}
        >
          Ver todas las propiedades
        </button>
      </section>
    </main>
  );
}

// Leads Section Component
function LeadsContent() {
  const [viewMode, setViewMode] = React.useState<'list' | 'kanban'>('list');
  
  // Mock data for Kanban
  const kanbanLeads = {
    nuevo: [
      {
        id: 1,
        name: 'María Rodríguez',
        property: 'Parcela Vista Cordillera',
        lastContact: 'Hace 2 horas',
        email: 'mariar@email.com',
        phone: '+56 9 8765 4321'
      },
      {
        id: 2,
        name: 'Juan Pérez',
        property: 'Parcela Los Cedros',
        lastContact: 'Hace 5 horas',
        email: 'juanp@email.com',
        phone: '+56 9 5555 1234'
      }
    ],
    contactado: [
      {
        id: 3,
        name: 'Carlos Muñoz',
        property: 'Parcela Los Cedros',
        lastContact: 'Hace 1 día',
        email: 'carlosm@email.com',
        phone: '+56 9 7777 8888'
      }
    ],
    seguimiento: [
      {
        id: 4,
        name: 'Patricia Aros',
        property: 'Parcela Vista Cordillera',
        lastContact: 'Hace 3 días',
        email: 'patroa@email.com',
        phone: '+56 9 4444 3333'
      },
      {
        id: 5,
        name: 'Roberto Silva',
        property: 'Parcela El Bosque',
        lastContact: 'Hace 5 días',
        email: 'rsilva@email.com',
        phone: '+56 9 2222 1111'
      }
    ],
    cerrado: [
      {
        id: 6,
        name: 'Ana López',
        property: 'Parcela Vista Cordillera',
        lastContact: 'Hace 1 semana',
        email: 'analopez@email.com',
        phone: '+56 9 6666 7777'
      }
    ]
  };

  if (viewMode === 'kanban') {
    return (
      <main className="px-6 py-6 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-black">Consultas / Leads</h1>
            <span className="text-xs font-medium text-gray-600 bg-gray-200 px-3 py-1">
              12
            </span>
          </div>
          <p className="text-sm text-gray-600">
            Gestiona tus oportunidades y convierte consultas en ventas
          </p>
        </div>

        {/* View Selector */}
        <section className="border-2 border-gray-300 inline-flex">
          <button
            onClick={() => setViewMode('list')}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            Vista lista
          </button>
          <button
            onClick={() => setViewMode('kanban')}
            className="px-4 py-2 text-sm font-medium bg-black text-white flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
            Vista Kanban
          </button>
        </section>

        {/* Kanban Board */}
        <section className="grid grid-cols-4 gap-4 overflow-x-auto">
          {/* Column 1: Nuevo lead */}
          <div className="space-y-3 min-w-[250px]">
            <div className="bg-emerald-100 border-2 border-emerald-300 p-3">
              <h3 className="text-sm font-bold text-emerald-900">Nuevo lead</h3>
              <span className="text-xs text-emerald-800">{kanbanLeads.nuevo.length}</span>
            </div>
            <div className="space-y-3">
              {kanbanLeads.nuevo.map((lead) => (
                <div key={lead.id} className="border-2 border-gray-300 bg-white p-4 space-y-3 hover:border-black transition-colors cursor-move">
                  <div>
                    <h4 className="text-sm font-bold text-black">{lead.name}</h4>
                    <p className="text-xs text-gray-600 mt-1">{lead.property}</p>
                  </div>
                  <div className="text-xs text-gray-600">
                    <p>Último contacto:</p>
                    <p className="font-medium text-black">{lead.lastContact}</p>
                  </div>
                  <div className="flex gap-1 pt-2 border-t-2 border-gray-200">
                    <button className="flex-1 bg-black text-white py-1.5 px-2 text-xs font-medium hover:bg-gray-800">
                      Ver
                    </button>
                    <button className="bg-gray-200 text-gray-700 py-1.5 px-2 text-xs hover:bg-gray-300">
                      →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Contactado */}
          <div className="space-y-3 min-w-[250px]">
            <div className="bg-yellow-100 border-2 border-yellow-300 p-3">
              <h3 className="text-sm font-bold text-yellow-900">Contactado</h3>
              <span className="text-xs text-yellow-700">{kanbanLeads.contactado.length}</span>
            </div>
            <div className="space-y-3">
              {kanbanLeads.contactado.map((lead) => (
                <div key={lead.id} className="border-2 border-gray-300 bg-white p-4 space-y-3 hover:border-black transition-colors cursor-move">
                  <div>
                    <h4 className="text-sm font-bold text-black">{lead.name}</h4>
                    <p className="text-xs text-gray-600 mt-1">{lead.property}</p>
                  </div>
                  <div className="text-xs text-gray-600">
                    <p>Último contacto:</p>
                    <p className="font-medium text-black">{lead.lastContact}</p>
                  </div>
                  <div className="flex gap-1 pt-2 border-t-2 border-gray-200">
                    <button className="flex-1 bg-black text-white py-1.5 px-2 text-xs font-medium hover:bg-gray-800">
                      Ver
                    </button>
                    <button className="bg-gray-200 text-gray-700 py-1.5 px-2 text-xs hover:bg-gray-300">
                      →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: En seguimiento */}
          <div className="space-y-3 min-w-[250px]">
            <div className="bg-green-100 border-2 border-green-300 p-3">
              <h3 className="text-sm font-bold text-green-900">En seguimiento</h3>
              <span className="text-xs text-green-700">{kanbanLeads.seguimiento.length}</span>
            </div>
            <div className="space-y-3">
              {kanbanLeads.seguimiento.map((lead) => (
                <div key={lead.id} className="border-2 border-gray-300 bg-white p-4 space-y-3 hover:border-black transition-colors cursor-move">
                  <div>
                    <h4 className="text-sm font-bold text-black">{lead.name}</h4>
                    <p className="text-xs text-gray-600 mt-1">{lead.property}</p>
                  </div>
                  <div className="text-xs text-gray-600">
                    <p>Último contacto:</p>
                    <p className="font-medium text-black">{lead.lastContact}</p>
                  </div>
                  <div className="flex gap-1 pt-2 border-t-2 border-gray-200">
                    <button className="flex-1 bg-black text-white py-1.5 px-2 text-xs font-medium hover:bg-gray-800">
                      Ver
                    </button>
                    <button className="bg-gray-200 text-gray-700 py-1.5 px-2 text-xs hover:bg-gray-300">
                      →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Cerrado / No interesado */}
          <div className="space-y-3 min-w-[250px]">
            <div className="bg-gray-200 border-2 border-gray-400 p-3">
              <h3 className="text-sm font-bold text-gray-800">Cerrado / No interesado</h3>
              <span className="text-xs text-gray-600">{kanbanLeads.cerrado.length}</span>
            </div>
            <div className="space-y-3">
              {kanbanLeads.cerrado.map((lead) => (
                <div key={lead.id} className="border-2 border-gray-300 bg-gray-50 p-4 space-y-3 opacity-60">
                  <div>
                    <h4 className="text-sm font-bold text-black">{lead.name}</h4>
                    <p className="text-xs text-gray-600 mt-1">{lead.property}</p>
                  </div>
                  <div className="text-xs text-gray-600">
                    <p>Último contacto:</p>
                    <p className="font-medium text-black">{lead.lastContact}</p>
                  </div>
                  <div className="flex gap-1 pt-2 border-t-2 border-gray-200">
                    <button className="flex-1 bg-white text-gray-700 border-2 border-gray-300 py-1.5 px-2 text-xs hover:bg-gray-100">
                      Ver
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Info Box */}
        <section className="bg-gray-50 border-2 border-gray-300 p-6 space-y-3">
          <h2 className="text-base font-bold text-black">Cómo usar el tablero Kanban</h2>
          <div className="space-y-2 text-sm text-gray-700">
            <p>• Mueve los leads entre columnas según el estado de avance</p>
            <p>• Prioriza los nuevos leads para responder dentro de las primeras 2 horas</p>
            <p>• Revisa diariamente los leads en seguimiento</p>
            <p>• Mantén actualizado el estado para tener claridad de tus oportunidades</p>
          </div>
        </section>
      </main>
    );
  }

  // List View (default)
  return (
    <main className="px-6 py-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-black">Consultas / Leads</h1>
          <span className="text-xs font-medium text-gray-600 bg-gray-200 px-3 py-1">
            12
          </span>
        </div>
        <p className="text-sm text-gray-600">
          Gestiona tus oportunidades y convierte consultas en ventas
        </p>
      </div>

      {/* View Selector */}
      <section className="border-2 border-gray-300 inline-flex">
        <button
          onClick={() => setViewMode('list')}
          className="px-4 py-2 text-sm font-medium bg-black text-white flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          Vista lista
        </button>
        <button
          onClick={() => setViewMode('kanban')}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
          </svg>
          Vista Kanban
        </button>
      </section>

      {/* Filter Tabs */}
      <section className="border-b-2 border-gray-300 flex gap-1">
        <button className="px-4 py-2 text-sm font-medium bg-black text-white">
          Todas (12)
        </button>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
          Sin responder (3)
        </button>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
          En seguimiento (5)
        </button>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
          Respondidas (4)
        </button>
      </section>

      {/* Leads List with Data */}
      <section className="space-y-3">
        {/* Lead 1 - New/Priority */}
        <div className="border-2 border-emerald-300 bg-emerald-50 p-5 space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-200 px-2 py-1">
                  NUEVA
                </span>
                <span className="text-xs text-gray-600">Hace 2 horas</span>
              </div>
              <h3 className="text-base font-bold text-black">Parcela Vista Cordillera</h3>
              <p className="text-xs text-gray-600 mt-1">Lo Barnechea • $120.000.000</p>
            </div>
          </div>
          <div className="bg-white border-2 border-gray-300 p-4 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 border-2 border-gray-300 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-gray-600">MR</span>
              </div>
              <div>
                <div className="text-sm font-bold text-black">María Rodríguez</div>
                <div className="text-xs text-gray-600">mariar@email.com • +56 9 8765 4321</div>
              </div>
            </div>
            <p className="text-sm text-gray-700 pl-10">
              "Hola, me interesa visitar la parcela este fin de semana. ¿Tienen disponibilidad el sábado en la mañana?"
            </p>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 bg-black text-white py-2.5 px-4 text-sm font-medium hover:bg-gray-800">
              Responder
            </button>
            <button className="flex-1 bg-white text-black border-2 border-black py-2.5 px-4 text-sm font-medium hover:bg-gray-100">
              Marcar seguimiento
            </button>
          </div>
        </div>

        {/* Lead 2 - New */}
        <div className="border-2 border-emerald-300 bg-emerald-50 p-5 space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-200 px-2 py-1">
                  NUEVA
                </span>
                <span className="text-xs text-gray-600">Hace 5 horas</span>
              </div>
              <h3 className="text-base font-bold text-black">Parcela Los Cedros</h3>
              <p className="text-xs text-gray-600 mt-1">Colina • $68.000.000</p>
            </div>
          </div>
          <div className="bg-white border-2 border-gray-300 p-4 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 border-2 border-gray-300 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-gray-600">JP</span>
              </div>
              <div>
                <div className="text-sm font-bold text-black">Juan Pérez</div>
                <div className="text-xs text-gray-600">juanp@email.com • +56 9 5555 1234</div>
              </div>
            </div>
            <p className="text-sm text-gray-700 pl-10">
              "¿El precio es negociable? Me gustaría agendar una visita para la próxima semana."
            </p>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 bg-black text-white py-2.5 px-4 text-sm font-medium hover:bg-gray-800">
              Responder
            </button>
            <button className="flex-1 bg-white text-black border-2 border-black py-2.5 px-4 text-sm font-medium hover:bg-gray-100">
              Marcar seguimiento
            </button>
          </div>
        </div>

        {/* Lead 3 - In Follow-up */}
        <div className="border-2 border-yellow-300 bg-yellow-50 p-5 space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-yellow-800 bg-yellow-200 px-2 py-1">
                  EN SEGUIMIENTO
                </span>
                <span className="text-xs text-gray-600">Hace 1 día</span>
              </div>
              <h3 className="text-base font-bold text-black">Parcela Los Cedros</h3>
              <p className="text-xs text-gray-600 mt-1">Colina • $68.000.000</p>
            </div>
          </div>
          <div className="bg-white border-2 border-gray-300 p-4 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 border-2 border-gray-300 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-gray-600">CM</span>
              </div>
              <div>
                <div className="text-sm font-bold text-black">Carlos Muñoz</div>
                <div className="text-xs text-gray-600">carlosm@email.com • +56 9 7777 8888</div>
              </div>
            </div>
            <p className="text-sm text-gray-700 pl-10">
              "¿Tiene factibilidad de agua y electricidad?"
            </p>
            <div className="pl-10 text-xs text-gray-600 bg-gray-50 p-2 border-l-2 border-gray-300 mt-2">
              <span className="font-medium text-black">Tu respuesta:</span> "Hola Carlos, sí cuenta con factibilidad de ambos servicios..."
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 bg-black text-white py-2.5 px-4 text-sm font-medium hover:bg-gray-800">
              Continuar conversación
            </button>
            <button className="flex-1 bg-white text-black border-2 border-gray-300 py-2.5 px-4 text-sm font-medium hover:bg-gray-100">
              Ver historial
            </button>
          </div>
        </div>

        {/* Lead 4 - Answered */}
        <div className="border-2 border-gray-300 p-5 space-y-3 opacity-75">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1">
                  RESPONDIDA
                </span>
                <span className="text-xs text-gray-600">Hace 3 días</span>
              </div>
              <h3 className="text-base font-bold text-black">Parcela Vista Cordillera</h3>
              <p className="text-xs text-gray-600 mt-1">Lo Barnechea • $120.000.000</p>
            </div>
          </div>
          <div className="bg-white border-2 border-gray-300 p-4 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 border-2 border-gray-300 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-gray-600">PA</span>
              </div>
              <div>
                <div className="text-sm font-bold text-black">Patricia Aros</div>
                <div className="text-xs text-gray-600">patroa@email.com</div>
              </div>
            </div>
            <p className="text-sm text-gray-700 pl-10">
              "¿Cuánto es el gasto común? ¿Hay colegios cerca?"
            </p>
          </div>
          <button className="w-full bg-white text-black border-2 border-gray-300 py-2.5 px-4 text-sm font-medium hover:bg-gray-100">
            Ver conversación completa
          </button>
        </div>
      </section>

      {/* Info Box */}
      <section className="bg-gray-50 border-2 border-gray-300 p-6 space-y-3">
        <h2 className="text-base font-bold text-black">Mejores prácticas para convertir leads</h2>
        <div className="space-y-2 text-sm text-gray-700">
          <p>• Responde en menos de 2 horas para aumentar las posibilidades de conversión</p>
          <p>• Personaliza tu respuesta según el interés del comprador</p>
          <p>• Haz seguimiento de las oportunidades calificadas</p>
          <p>• Mantén organizadas tus conversaciones por propiedad</p>
        </div>
      </section>
    </main>
  );
}

// Plan Section Component
function PlanContent() {
  const [showCancelModal, setShowCancelModal] = React.useState(false);
  const [currentPlan, setCurrentPlan] = React.useState('bronce');
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
      price: '$19.990',
      description: 'Ideal para comenzar a promocionar propiedades',
      features: [
        { name: 'Hasta 5 propiedades en seguimiento', included: true },
        { name: '1 propiedad destacada', included: true },
        { name: 'Visibilidad estándar', included: true },
        { name: 'Estadísticas básicas', included: true },
        { name: 'Soporte por email', included: true },
        { name: 'Prioridad en búsquedas', included: false },
        { name: 'Asesor dedicado', included: false },
      ]
    },
    {
      id: 'plata',
      name: 'Plata',
      price: '$39.990',
      description: 'Para brokers que buscan mayor visibilidad',
      features: [
        { name: 'Hasta 15 propiedades en seguimiento', included: true },
        { name: '3 propiedades destacadas', included: true },
        { name: 'Visibilidad alta', included: true },
        { name: 'Estadísticas avanzadas', included: true },
        { name: 'Soporte prioritario', included: true },
        { name: 'Prioridad en búsquedas', included: true },
        { name: 'Asesor dedicado', included: false },
      ]
    },
    {
      id: 'oro',
      name: 'Oro',
      price: '$69.990',
      description: 'Máxima exposición para profesionales',
      features: [
        { name: 'Propiedades ilimitadas en seguimiento', included: true },
        { name: '10 propiedades destacadas', included: true },
        { name: 'Visibilidad premium', included: true },
        { name: 'Estadísticas completas + exportación', included: true },
        { name: 'Soporte 24/7', included: true },
        { name: 'Máxima prioridad en búsquedas', included: true },
        { name: 'Asesor dedicado', included: true },
      ]
    }
  ];

  const currentPlanData = plans.find(p => p.id === currentPlan);

  const invoices = [
    { id: 'INV-2025-001', date: '28 Ene 2025', reason: 'Ciclo de suscripción - Plan Plata', reasonType: 'subscription', amount: '$49.990' },
    { id: 'INV-2024-012', date: '28 Dic 2024', reason: 'Ciclo de suscripción - Plan Plata', reasonType: 'subscription', amount: '$49.990' },
    { id: 'INV-2024-011', date: '28 Nov 2024', reason: 'Ciclo de suscripción - Plan Plata', reasonType: 'subscription', amount: '$49.990' },
    { id: 'INV-2024-010', date: '28 Oct 2024', reason: 'Ciclo de suscripción - Plan Plata', reasonType: 'subscription', amount: '$49.990' },
    { id: 'INV-2024-009', date: '28 Sep 2024', reason: 'Upgrade a Plan Plata', reasonType: 'upgrade', amount: '$49.990' },
    { id: 'INV-2024-008', date: '28 Ago 2024', reason: 'Creación de suscripción - Plan Bronce', reasonType: 'creation', amount: '$29.990' }
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
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', color: '#C3C3C3', marginTop: '8px' }}>Perfil: Broker</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: '#16A34A' }}>
            <CheckCircle className="w-4 h-4" style={{ color: '#FFFFFF' }} />
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Activo</span>
          </div>
        </div>
        <button onClick={() => document.getElementById('broker-compara-planes')?.scrollIntoView({ behavior: 'smooth' })} className="py-2.5 px-6 transition-all" style={{ backgroundColor: '#FFFFFF', color: '#0A0A0A', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-wide)', lineHeight: 'var(--line-height-ui)', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#E8E7E6'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; }}>Ver otros planes</button>
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
      <section id="broker-compara-planes">
        <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-h3)', lineHeight: 'var(--line-height-heading)', color: 'var(--foreground)', marginBottom: '24px' }}>Compara planes</h3>
        <div className="grid grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isActive = plan.id === currentPlan;
            const isHigher = currentPlan === 'bronce' && (plan.id === 'plata' || plan.id === 'oro') || currentPlan === 'plata' && plan.id === 'oro';
            return (
              <div key={plan.id} className="rounded-2xl p-6 flex flex-col" style={{ backgroundColor: '#FFFFFF', border: isActive ? '2px solid #0A0A0A' : '1px solid #E5E5E5', boxShadow: isActive ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                <div className="mb-6">
                  {isActive && (<div className="flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full inline-flex" style={{ backgroundColor: '#006B4E' }}><Star className="w-3.5 h-3.5" style={{ color: '#FFFFFF' }} /><span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Plan actual</span></div>)}
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
                <button
                  disabled={isActive}
                  onClick={() => { if (!isActive) { setPendingPlan(plan.id); setShowUpgradeModal(true); } }}
                  className="w-full py-2.5 px-6 transition-all"
                  style={{
                    backgroundColor: isActive ? '#F5F5F5' : isHigher ? '#006B4E' : '#FFFFFF',
                    color: isActive ? '#A3A3A3' : isHigher ? '#FFFFFF' : 'var(--foreground)',
                    border: isActive ? '2px solid #E5E5E5' : isHigher ? 'none' : '2px solid #DEDEDE',
                    borderRadius: '200px',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    letterSpacing: 'var(--letter-spacing-wide)',
                    lineHeight: 'var(--line-height-ui)',
                    cursor: isActive ? 'not-allowed' : 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = isHigher ? '#01533E' : '#FAFAFA';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = isHigher ? '#006B4E' : '#FFFFFF';
                  }}
                >
                  {isActive ? 'Plan activo' : isHigher ? 'Contratar plan' : 'Cambiar a este plan'}
                </button>
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
              <button onClick={() => setShowCancelModal(false)} className="flex-1 px-6 py-3 transition-all" style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', border: '2px solid #0A0A0A', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-wide)', lineHeight: 'var(--line-height-ui)' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#737373'; e.currentTarget.style.borderColor = '#737373'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#0A0A0A'; e.currentTarget.style.borderColor = '#0A0A0A'; }}>Mantener plan</button>
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

// Help Section Component
function HelpContent() {
  return (
    <main className="px-6 py-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 
          style={{ 
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--font-size-h2)',
            fontWeight: 'var(--font-weight-medium)',
            color: '#0A0A0A',
            lineHeight: 'var(--line-height-heading)',
            letterSpacing: 'var(--letter-spacing-normal)'
          }}
        >
          Centro de ayuda
        </h1>
        <p 
          style={{ 
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-base)',
            fontWeight: 'var(--font-weight-regular)',
            color: '#6B6B6B',
            lineHeight: 'var(--line-height-body)',
            letterSpacing: 'var(--letter-spacing-normal)'
          }}
        >
          Estamos para ayudarte a maximizar tus oportunidades
        </p>
      </div>

      {/* FAQ */}
      <section className="rounded-2xl p-6 space-y-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 4px 12px 0 rgba(0, 107, 78, 0.08)' }}>
        <h2 
          style={{ 
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--font-size-h4)',
            fontWeight: 'var(--font-weight-medium)',
            color: '#0A0A0A',
            lineHeight: 'var(--line-height-heading)'
          }}
        >
          Preguntas frecuentes
        </h2>
        <div className="space-y-3">
          <div className="rounded-xl p-5" style={{ backgroundColor: '#FAFAFA', border: '1px solid #E5E5E5' }}>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#EBFEF5' }}>
                <Plus className="w-4 h-4" style={{ color: '#006B4E' }} />
              </div>
              <div className="flex-1">
                <div 
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-body)',
                    marginBottom: '8px'
                  }}
                >
                  ¿Cómo publico una propiedad?
                </div>
                <p 
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-regular)',
                    color: '#6B6B6B',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  Ve a "Mis publicaciones", haz clic en "Nueva publicación" y completa los datos de la propiedad.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl p-5" style={{ backgroundColor: '#FAFAFA', border: '1px solid #E5E5E5' }}>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(100, 126, 63, 0.1)' }}>
                <MessageCircle className="w-4 h-4" style={{ color: '#647E3F' }} />
              </div>
              <div className="flex-1">
                <div 
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-body)',
                    marginBottom: '8px'
                  }}
                >
                  ¿Cómo gestiono las consultas?
                </div>
                <p 
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-regular)',
                    color: '#6B6B6B',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  Las consultas aparecen en "Consultas / Leads". Puedes responder, marcar como en seguimiento o cerradas.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl p-5" style={{ backgroundColor: '#FAFAFA', border: '1px solid #E5E5E5' }}>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FEF3C7' }}>
                <TrendingUp className="w-4 h-4" style={{ color: '#F59E0B' }} />
              </div>
              <div className="flex-1">
                <div 
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-body)',
                    marginBottom: '8px'
                  }}
                >
                  ¿Qué datos muestra "Mi rendimiento"?
                </div>
                <p 
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-regular)',
                    color: '#6B6B6B',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  Puedes ver consultas atendidas, tasa de respuesta, oportunidades cerradas y evolución mensual.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl p-5" style={{ backgroundColor: '#FAFAFA', border: '1px solid #E5E5E5' }}>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FEE2E2' }}>
                <CreditCard className="w-4 h-4" style={{ color: '#DC2626' }} />
              </div>
              <div className="flex-1">
                <div 
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-body)',
                    marginBottom: '8px'
                  }}
                >
                  ¿Puedo cambiar de plan?
                </div>
                <p 
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-regular)',
                    color: '#6B6B6B',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  Sí, desde "Plan y facturación" puedes ver los planes disponibles y cambiar en cualquier momento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="rounded-2xl p-6 space-y-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 4px 12px 0 rgba(0, 107, 78, 0.08)' }}>
        <h2 
          style={{ 
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--font-size-h4)',
            fontWeight: 'var(--font-weight-medium)',
            color: '#0A0A0A',
            lineHeight: 'var(--line-height-heading)'
          }}
        >
          Recursos para brokers
        </h2>
        <div className="space-y-3">
          <button 
            className="w-full text-left rounded-xl p-5 transition-all"
            style={{ backgroundColor: '#FAFAFA', border: '1px solid #E5E5E5' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F5F5F5'; e.currentTarget.style.borderColor = '#D4D4D4'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FAFAFA'; e.currentTarget.style.borderColor = '#E5E5E5'; }}
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(100, 126, 63, 0.1)' }}>
                <Star className="w-4 h-4" style={{ color: '#647E3F' }} />
              </div>
              <div className="flex-1">
                <div 
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-body)',
                    marginBottom: '4px'
                  }}
                >
                  Guía para brokers exitosos
                </div>
                <div 
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-regular)',
                    color: '#6B6B6B',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  Mejores prácticas para convertir consultas en ventas
                </div>
              </div>
            </div>
          </button>
          <button 
            className="w-full text-left rounded-xl p-5 transition-all"
            style={{ backgroundColor: '#FAFAFA', border: '1px solid #E5E5E5' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F5F5F5'; e.currentTarget.style.borderColor = '#D4D4D4'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FAFAFA'; e.currentTarget.style.borderColor = '#E5E5E5'; }}
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#EBFEF5' }}>
                <Eye className="w-4 h-4" style={{ color: '#006B4E' }} />
              </div>
              <div className="flex-1">
                <div 
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-body)',
                    marginBottom: '4px'
                  }}
                >
                  Cómo crear publicaciones que venden
                </div>
                <div 
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-regular)',
                    color: '#6B6B6B',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  Tips para destacar y atraer compradores calificados
                </div>
              </div>
            </div>
          </button>
          <button 
            className="w-full text-left rounded-xl p-5 transition-all"
            style={{ backgroundColor: '#FAFAFA', border: '1px solid #E5E5E5' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F5F5F5'; e.currentTarget.style.borderColor = '#D4D4D4'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FAFAFA'; e.currentTarget.style.borderColor = '#E5E5E5'; }}
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FEF3C7' }}>
                <Zap className="w-4 h-4" style={{ color: '#F59E0B' }} />
              </div>
              <div className="flex-1">
                <div 
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-body)',
                    marginBottom: '4px'
                  }}
                >
                  Gestión efectiva de leads
                </div>
                <div 
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-regular)',
                    color: '#6B6B6B',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  Estrategias para maximizar tu tasa de conversión
                </div>
              </div>
            </div>
          </button>
        </div>
      </section>
    </main>
  );
}

// Settings Section Component
function BrokerLocalSettingsContent() {
  return (
    <main className="px-6 py-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 
          style={{ 
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--font-size-h2)',
            fontWeight: 'var(--font-weight-medium)',
            color: '#0A0A0A',
            lineHeight: 'var(--line-height-heading)',
            letterSpacing: 'var(--letter-spacing-normal)'
          }}
        >
          Configuración
        </h1>
        <p 
          style={{ 
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-base)',
            fontWeight: 'var(--font-weight-regular)',
            color: '#6B6B6B',
            lineHeight: 'var(--line-height-body)',
            letterSpacing: 'var(--letter-spacing-normal)'
          }}
        >
          Administra tu cuenta y preferencias profesionales
        </p>
      </div>

      {/* Professional Profile */}
      <section className="rounded-2xl p-6 space-y-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 4px 12px 0 rgba(0, 107, 78, 0.08)' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#F5F5F5' }}>
            <Users className="w-5 h-5" style={{ color: '#0A0A0A' }} />
          </div>
          <h2 
            style={{ 
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--font-size-h4)',
              fontWeight: 'var(--font-weight-medium)',
              color: '#0A0A0A',
              lineHeight: 'var(--line-height-heading)'
            }}
          >
            Perfil profesional
          </h2>
        </div>
        <div className="space-y-4">
          <div>
            <div 
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-medium)',
                color: '#6B6B6B',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '8px'
              }}
            >
              Nombre completo
            </div>
            <div 
              className="rounded-lg p-4"
              style={{ 
                backgroundColor: '#FAFAFA',
                border: '1px solid #E5E5E5',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                color: '#0A0A0A'
              }}
            >
              Nombre Apellido
            </div>
          </div>
          <div>
            <div 
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-medium)',
                color: '#6B6B6B',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '8px'
              }}
            >
              Correo electrónico
            </div>
            <div 
              className="rounded-lg p-4"
              style={{ 
                backgroundColor: '#FAFAFA',
                border: '1px solid #E5E5E5',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                color: '#0A0A0A'
              }}
            >
              broker@ejemplo.com
            </div>
          </div>
          <div>
            <div 
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-medium)',
                color: '#6B6B6B',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '8px'
              }}
            >
              Teléfono de contacto
            </div>
            <div 
              className="rounded-lg p-4"
              style={{ 
                backgroundColor: '#FAFAFA',
                border: '1px solid #E5E5E5',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                color: '#0A0A0A'
              }}
            >
              +56 9 1234 5678
            </div>
          </div>
          <div>
            <div 
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-medium)',
                color: '#6B6B6B',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '8px'
              }}
            >
              Especialidad
            </div>
            <div 
              className="rounded-lg p-4"
              style={{ 
                backgroundColor: '#FAFAFA',
                border: '1px solid #E5E5E5',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                color: '#0A0A0A'
              }}
            >
              Propiedades comerciales
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2" style={{ marginBottom: '8px' }}>
              <div 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#6B6B6B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em'
                }}
              >
                Descripción profesional
              </div>
              <span 
                className="rounded-full px-2 py-0.5"
                style={{ 
                  backgroundColor: '#F5F5F5',
                  fontFamily: 'var(--font-body)',
                  fontSize: '10px',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#6B6B6B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em'
                }}
              >
                Opcional
              </span>
            </div>
            <div 
              className="rounded-lg p-4"
              style={{ 
                backgroundColor: '#FAFAFA',
                border: '1px solid #E5E5E5',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-body)',
                minHeight: '80px'
              }}
            >
              Broker con más de 10 años de experiencia en el mercado inmobiliario de parcelas. Especializado en propiedades comerciales y de inversión en zonas rurales. Mi objetivo es ayudarte a encontrar la propiedad ideal que se ajuste a tus necesidades y presupuesto.
            </div>
          </div>
        </div>
        <button 
          className="w-full py-3 px-6 transition-all"
          style={{
            backgroundColor: '#FFFFFF',
            color: '#0A0A0A',
            border: '2px solid #0A0A0A',
            borderRadius: '200px',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-sm)',
            fontWeight: 'var(--font-weight-medium)',
            letterSpacing: 'var(--letter-spacing-wide)',
            lineHeight: 'var(--line-height-ui)'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F5F5F5'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
        >
          Editar perfil profesional
        </button>
      </section>

      {/* Notifications */}
      <section className="rounded-2xl p-6 space-y-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 4px 12px 0 rgba(0, 107, 78, 0.08)' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#F5F5F5' }}>
            <AlertCircle className="w-5 h-5" style={{ color: '#0A0A0A' }} />
          </div>
          <h2 
            style={{ 
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--font-size-h4)',
              fontWeight: 'var(--font-weight-medium)',
              color: '#0A0A0A',
              lineHeight: 'var(--line-height-heading)'
            }}
          >
            Notificaciones
          </h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-xl p-5" style={{ backgroundColor: '#FAFAFA', border: '1px solid #E5E5E5' }}>
            <div className="flex-1">
              <div 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: '#0A0A0A',
                  marginBottom: '4px'
                }}
              >
                Nuevas consultas
              </div>
              <div 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-xs)',
                  color: '#6B6B6B'
                }}
              >
                Recibir alertas de consultas inmediatamente
              </div>
            </div>
            <div className="relative w-12 h-6 rounded-full flex-shrink-0 ml-4" style={{ backgroundColor: '#647E3F' }}>
              <div className="absolute right-1 top-1 w-4 h-4 rounded-full" style={{ backgroundColor: '#FFFFFF' }}></div>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-xl p-5" style={{ backgroundColor: '#FAFAFA', border: '1px solid #E5E5E5' }}>
            <div className="flex-1">
              <div 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: '#0A0A0A',
                  marginBottom: '4px'
                }}
              >
                Recordatorios de seguimiento
              </div>
              <div 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-xs)',
                  color: '#6B6B6B'
                }}
              >
                Avisos para hacer seguimiento de leads
              </div>
            </div>
            <div className="relative w-12 h-6 rounded-full flex-shrink-0 ml-4" style={{ backgroundColor: '#647E3F' }}>
              <div className="absolute right-1 top-1 w-4 h-4 rounded-full" style={{ backgroundColor: '#FFFFFF' }}></div>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-xl p-5" style={{ backgroundColor: '#FAFAFA', border: '1px solid #E5E5E5' }}>
            <div className="flex-1">
              <div 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: '#0A0A0A',
                  marginBottom: '4px'
                }}
              >
                Reporte semanal de rendimiento
              </div>
              <div 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-xs)',
                  color: '#6B6B6B'
                }}
              >
                Recibir resumen de actividad cada semana
              </div>
            </div>
            <div className="relative w-12 h-6 rounded-full flex-shrink-0 ml-4" style={{ backgroundColor: '#D4D4D4' }}>
              <div className="absolute left-1 top-1 w-4 h-4 rounded-full" style={{ backgroundColor: '#FFFFFF' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Account Actions */}
      <section className="rounded-2xl p-6 space-y-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 4px 12px 0 rgba(0, 107, 78, 0.08)' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#F5F5F5' }}>
            <Building2 className="w-5 h-5" style={{ color: '#0A0A0A' }} />
          </div>
          <h2 
            style={{ 
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--font-size-h4)',
              fontWeight: 'var(--font-weight-medium)',
              color: '#0A0A0A',
              lineHeight: 'var(--line-height-heading)'
            }}
          >
            Cuenta
          </h2>
        </div>
        <div className="space-y-3">
          <button 
            className="w-full text-left rounded-xl p-5 transition-all"
            style={{ backgroundColor: '#FAFAFA', border: '1px solid #E5E5E5' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F5F5F5'; e.currentTarget.style.borderColor = '#D4D4D4'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FAFAFA'; e.currentTarget.style.borderColor = '#E5E5E5'; }}
          >
            <div 
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                fontWeight: 'var(--font-weight-medium)',
                color: '#0A0A0A'
              }}
            >
              Cambiar contraseña
            </div>
          </button>
          <button 
            className="w-full text-left rounded-xl p-5 transition-all"
            style={{ backgroundColor: '#FAFAFA', border: '1px solid #E5E5E5' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F5F5F5'; e.currentTarget.style.borderColor = '#D4D4D4'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FAFAFA'; e.currentTarget.style.borderColor = '#E5E5E5'; }}
          >
            <div 
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                fontWeight: 'var(--font-weight-medium)',
                color: '#0A0A0A'
              }}
            >
              Privacidad y datos
            </div>
          </button>
          <button 
            className="w-full text-left rounded-xl p-5 transition-all"
            style={{ backgroundColor: '#FAFAFA', border: '1px solid #E5E5E5' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FEE2E2'; e.currentTarget.style.borderColor = '#FCA5A5'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FAFAFA'; e.currentTarget.style.borderColor = '#E5E5E5'; }}
          >
            <div 
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                fontWeight: 'var(--font-weight-medium)',
                color: '#DC2626'
              }}
            >
              Cerrar sesión
            </div>
          </button>
        </div>
      </section>
    </main>
  );
}
