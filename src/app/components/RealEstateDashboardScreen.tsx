import React from 'react';
import { Home, FileText, MessageCircle, TrendingUp, Users, CreditCard, HelpCircle, Settings, User, Eye, ArrowUp, ArrowDown, Heart, Plus, Edit, Star, AlertCircle, CheckCircle, Zap, Award, Check, X, FolderOpen } from 'lucide-react';
import { InquiriesSection } from '@/app/components/InquiriesSection';
import { ConsultasView } from '@/app/components/ConsultasView';
import { MyPublicationsView } from '@/app/components/MyPublicationsView';
import { TeamContent } from '@/app/components/TeamContent';
import { HelpContent } from '@/app/components/HelpContent';
import { SettingsContent } from '@/app/components/SettingsContent';
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

    // Exponer función para abrir modal de publicación
    React.useImperativeHandle(ref, () => ({
      openPublishModal: () => {
        setCurrentSection('my-publications');
        setTriggerPublishModal(prev => prev + 1);
      }
    }));

  const navItems = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'my-publications', label: 'Mis publicaciones', icon: FolderOpen },
    { id: 'inquiries', label: 'Consultas', icon: MessageCircle },
    { id: 'performance', label: 'Rendimiento', icon: TrendingUp },
    { id: 'team', label: 'Equipo / Brokers', icon: Users },
    { id: 'plan', label: 'Plan y facturación', icon: CreditCard },
    { id: 'help', label: 'Ayuda', icon: HelpCircle },
    { id: 'settings', label: 'Configuración', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Nav Rail - Left Sidebar */}
      <aside className="w-64 flex-shrink-0 fixed left-0 top-0 bottom-0 z-20" style={{ borderRight: '1px solid #DEDEDE', backgroundColor: '#FAFAFA' }}>
        <div className="h-full flex flex-col">
          {/* Logo Area */}
          <div className="px-6 py-8" style={{ borderBottom: '1px solid #DEDEDE' }}>
            <h2 style={{ 
              fontFamily: 'var(--font-heading)', 
              fontWeight: 'var(--font-weight-semibold)',
              fontSize: 'var(--font-size-h4)',
              color: '#0A0A0A',
              lineHeight: 'var(--line-height-heading)'
            }}>
              CompraTuParcela
            </h2>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 py-4 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentSection(item.id)}
                  className="w-full flex items-center gap-3 px-6 py-3 transition-all"
                  style={{
                    backgroundColor: isActive ? '#CDD8DE' : 'transparent',
                    color: '#124854',
                    fontFamily: 'var(--font-body)',
                    fontWeight: isActive ? 'var(--font-weight-medium)' : 'var(--font-weight-regular)',
                    fontSize: 'var(--font-size-body-sm)',
                    lineHeight: 'var(--line-height-ui)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'rgba(100, 126, 63, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <Icon className="w-5 h-5" style={{ strokeWidth: isActive ? 2.5 : 2 }} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Profile Area */}
          <div className="px-6 py-4" style={{ borderTop: '1px solid #DEDEDE' }}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-full flex items-center gap-3 transition-colors"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                color: '#737373'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#0A0A0A'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#737373'; }}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E8E7E6', border: '1px solid #DEDEDE' }}>
                <User className="w-5 h-5" style={{ color: '#737373' }} />
              </div>
              <div className="flex-1 text-left">
                <div style={{ 
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  fontSize: 'var(--font-size-body-sm)'
                }}>
                  Mi cuenta
                </div>
                <div style={{ 
                  fontSize: 'var(--font-size-xs)',
                  color: '#737373',
                  marginTop: '2px'
                }}>
                  Plan Profesional
                </div>
              </div>
            </button>
            {showMenu && (
              <div className="mt-3 rounded-lg overflow-hidden" style={{ backgroundColor: '#FFFFFF', border: '1px solid #DEDEDE', boxShadow: '0 4px 12px 0 rgba(18, 72, 84, 0.08)' }}>
                <button
                  onClick={() => onNavigate('entry')}
                  className="w-full text-left px-4 py-2.5 transition-colors"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    color: '#0A0A0A'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-64">
        {currentSection === 'home' && <HomeContent setCurrentSection={setCurrentSection} setTriggerPublishModal={setTriggerPublishModal} />}
        {currentSection === 'my-publications' && <MyPublicationsView userType="inmobiliaria" userId="inmob-123" onNavigate={onNavigate} onNavigateToSection={setCurrentSection} autoOpenModal={triggerPublishModal} />}
        {currentSection === 'inquiries' && <ConsultasView viewType="inmobiliaria" />}
        {currentSection === 'performance' && <PerformanceContent />}
        {currentSection === 'team' && <TeamContent />}
        {currentSection === 'plan' && <PlanContent />}
        {currentSection === 'help' && <HelpContent />}
        {currentSection === 'settings' && <SettingsContent />}
      </div>
    </div>
  );
});

// Home Section Component
interface HomeContentProps {
  setCurrentSection: (section: string) => void;
  setTriggerPublishModal: React.Dispatch<React.SetStateAction<number>>;
}

function HomeContent({ setCurrentSection, setTriggerPublishModal }: HomeContentProps) {
  const [selectedPeriod, setSelectedPeriod] = React.useState<'7' | '30' | '90'>('30');

  // Datos simulados para gráfico de evolución
  const evolutionData = selectedPeriod === '7' ? [
    { date: '21 Ene', views: 145 },
    { date: '22 Ene', views: 178 },
    { date: '23 Ene', views: 156 },
    { date: '24 Ene', views: 189 },
    { date: '25 Ene', views: 201 },
    { date: '26 Ene', views: 234 },
    { date: '27 Ene', views: 267 },
  ] : selectedPeriod === '30' ? [
    { date: 'Sem 1', views: 892 },
    { date: 'Sem 2', views: 1045 },
    { date: 'Sem 3', views: 1123 },
    { date: 'Sem 4', views: 1289 },
  ] : [
    { date: 'Mes 1', views: 3842 },
    { date: 'Mes 2', views: 4156 },
    { date: 'Mes 3', views: 4523 },
  ];

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
    { name: 'Consultas', value: 48, color: '#124854' },
    { name: 'Guardados', value: 32, color: '#462611' },
    { name: 'Clicks', value: 20, color: '#7D460D' },
  ];

  // Datos del ranking de parcelas
  const parcelasRanking = [
    { 
      name: 'Parcela Vista Cordillera', 
      location: 'Lo Barnechea',
      views: 267, 
      consultas: 24, 
      status: 'high',
      statusLabel: 'Alto interés',
      trend: 'up',
      trendValue: '+18%'
    },
    { 
      name: 'Parcela Los Cedros', 
      location: 'Colina',
      views: 234, 
      consultas: 18, 
      status: 'high',
      statusLabel: 'Alto interés',
      trend: 'up',
      trendValue: '+12%'
    },
    { 
      name: 'Terreno Valle Central', 
      location: 'Buin',
      views: 189, 
      consultas: 15, 
      status: 'medium',
      statusLabel: 'Interés medio',
      trend: 'neutral',
      trendValue: '+5%'
    },
    { 
      name: 'Parcela Alto Maipo', 
      location: 'San José de Maipo',
      views: 156, 
      consultas: 12, 
      status: 'medium',
      statusLabel: 'Interés medio',
      trend: 'up',
      trendValue: '+8%'
    },
    { 
      name: 'Terreno Los Andes', 
      location: 'Los Andes',
      views: 98, 
      consultas: 8, 
      status: 'low',
      statusLabel: 'Bajo rendimiento',
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
        <div className="flex gap-3">
          <button className="py-2.5 px-5 flex items-center gap-2 transition-all" style={{ 
            backgroundColor: '#FFFFFF',
            color: '#0A0A0A',
            border: '2px solid #DEDEDE',
            borderRadius: '200px',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-sm)',
            fontWeight: 'var(--font-weight-medium)',
            letterSpacing: 'var(--letter-spacing-wide)',
            lineHeight: 'var(--line-height-ui)'
          }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
          >
            <Star className="w-4 h-4" />
            Destacar parcela
          </button>
          <button 
            onClick={() => {
              setCurrentSection('my-publications');
              setTriggerPublishModal(prev => prev + 1);
            }}
            className="py-2.5 px-5 flex items-center gap-2 transition-all" style={{ 
            backgroundColor: '#124854',
            color: '#FFFFFF',
            borderRadius: '200px',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-sm)',
            fontWeight: 'var(--font-weight-medium)',
            letterSpacing: 'var(--letter-spacing-wide)',
            lineHeight: 'var(--line-height-ui)'
          }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0D3640'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#124854'; }}
          >
            <Plus className="w-4 h-4" />
            Nueva publicación
          </button>
        </div>
      </div>

      {/* KPIs Section */}
      <section className="grid grid-cols-4 gap-6">
        {/* Parcelas activas */}
        <div className="rounded-2xl p-6 flex flex-col" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 4px 12px 0 rgba(18, 72, 84, 0.08)' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(18, 72, 84, 0.1)' }}>
              <FileText className="w-5 h-5" style={{ color: '#124854' }} />
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full" style={{ backgroundColor: 'rgba(100, 126, 63, 0.1)' }}>
              <ArrowUp className="w-3 h-3" style={{ color: '#647E3F' }} />
              <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#647E3F' }}>
                +3
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
              Parcelas publicadas
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
              12
            </div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: '#A3A3A3', lineHeight: '1.5' }}>
              3 publicadas esta semana
            </div>
          </div>
        </div>
        
        {/* Visualizaciones totales */}
        <div className="rounded-2xl p-6 flex flex-col" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 4px 12px 0 rgba(18, 72, 84, 0.08)' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(18, 72, 84, 0.1)' }}>
              <Eye className="w-5 h-5" style={{ color: '#124854' }} />
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full" style={{ backgroundColor: 'rgba(100, 126, 63, 0.1)' }}>
              <ArrowUp className="w-3 h-3" style={{ color: '#647E3F' }} />
              <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#647E3F' }}>
                +22%
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
              4,523
            </div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: '#A3A3A3', lineHeight: '1.5' }}>
              Últimos 30 días
            </div>
          </div>
        </div>
        
        {/* Consultas recibidas */}
        <div className="rounded-2xl p-6 flex flex-col" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 4px 12px 0 rgba(18, 72, 84, 0.08)' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(18, 72, 84, 0.1)' }}>
              <MessageCircle className="w-5 h-5" style={{ color: '#124854' }} />
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full" style={{ backgroundColor: 'rgba(70, 38, 17, 0.1)' }}>
              <AlertCircle className="w-3 h-3" style={{ color: '#462611' }} />
              <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#462611' }}>
                5 nuevas
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
              Consultas recibidas
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
              77
            </div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: '#A3A3A3', lineHeight: '1.5' }}>
              Últimos 30 días
            </div>
          </div>
        </div>
        
        {/* Parcelas guardadas */}
        <div className="rounded-2xl p-6 flex flex-col" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 4px 12px 0 rgba(18, 72, 84, 0.08)' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(18, 72, 84, 0.1)' }}>
              <Heart className="w-5 h-5" style={{ color: '#124854' }} />
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full" style={{ backgroundColor: 'rgba(100, 126, 63, 0.1)' }}>
              <ArrowUp className="w-3 h-3" style={{ color: '#647E3F' }} />
              <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#647E3F' }}>
                +15%
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
              143
            </div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: '#A3A3A3', lineHeight: '1.5' }}>
              Usuarios interesados
            </div>
          </div>
        </div>
      </section>

      {/* Gráfico principal - Evolución de visualizaciones */}
      <section className="rounded-2xl p-6 space-y-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
        <div className="flex items-center justify-between">
          <h2 style={{ 
            fontFamily: 'var(--font-heading)',
            fontWeight: 'var(--font-weight-medium)',
            fontSize: 'var(--font-size-h3)',
            lineHeight: 'var(--line-height-heading)',
            color: '#0A0A0A'
          }}>
            Evolución de visualizaciones
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
            <LineChart data={evolutionData}>
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
                dataKey="views" 
                stroke="#124854" 
                strokeWidth={3}
                dot={{ fill: '#124854', r: 4 }}
                activeDot={{ r: 6, fill: '#124854' }}
                name="Visualizaciones"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Gráficos secundarios */}
      <div className="grid grid-cols-2 gap-6">
        {/* Gráfico de barras - Consultas por parcela */}
        <section className="rounded-2xl p-6 space-y-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
          <h2 style={{ 
            fontFamily: 'var(--font-heading)',
            fontWeight: 'var(--font-weight-medium)',
            fontSize: 'var(--font-size-h4)',
            lineHeight: 'var(--line-height-heading)',
            color: '#0A0A0A'
          }}>
            Consultas por parcela
          </h2>
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
                  fill="#124854" 
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

      {/* Ranking de parcelas */}
      <section className="rounded-2xl p-6 space-y-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
        <div className="flex items-center justify-between">
          <h2 style={{ 
            fontFamily: 'var(--font-heading)',
            fontWeight: 'var(--font-weight-medium)',
            fontSize: 'var(--font-size-h3)',
            lineHeight: 'var(--line-height-heading)',
            color: '#0A0A0A'
          }}>
            Ranking de parcelas
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
            <Edit className="w-3.5 h-3.5" />
            Editar publicaciones
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
            Parcela
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
          {parcelasRanking.map((parcela, index) => (
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
                    {parcela.name}
                  </div>
                  <div style={{ 
                    fontSize: 'var(--font-size-xs)',
                    color: '#737373',
                    marginTop: '2px'
                  }}>
                    {parcela.location}
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
                    {parcela.views}
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
                    {parcela.consultas}
                  </span>
                </div>
              </div>
              <div className="col-span-2 flex items-center justify-center">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ 
                  backgroundColor: parcela.trend === 'up' ? '#DCFCE7' : parcela.trend === 'down' ? '#FEE2E2' : '#F5F5F5'
                }}>
                  {parcela.trend === 'up' && <ArrowUp className="w-3.5 h-3.5" style={{ color: '#16A34A' }} />}
                  {parcela.trend === 'down' && <ArrowDown className="w-3.5 h-3.5" style={{ color: '#DC2626' }} />}
                  <span style={{ 
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: parcela.trend === 'up' ? '#16A34A' : parcela.trend === 'down' ? '#DC2626' : '#737373'
                  }}>
                    {parcela.trendValue}
                  </span>
                </div>
              </div>
              <div className="col-span-1 flex items-center justify-end pr-4">
                <span className="px-2.5 py-1 rounded-full whitespace-nowrap" style={{ 
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'var(--font-weight-medium)',
                  backgroundColor: parcela.status === 'high' ? '#DCFCE7' : parcela.status === 'medium' ? '#FEF3C7' : '#FEE2E2',
                  color: parcela.status === 'high' ? '#16A34A' : parcela.status === 'medium' ? '#CA8A04' : '#DC2626'
                }}>
                  {parcela.statusLabel}
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
          Ver todas las parcelas
        </button>
      </section>
    </main>
  );
}

// Placeholder components for other sections
function PerformanceContent() {
  const [selectedRange, setSelectedRange] = React.useState('30');

  const chartData = [
    { day: '1', consultas: 12 },
    { day: '5', consultas: 18 },
    { day: '10', consultas: 25 },
    { day: '15', consultas: 22 },
    { day: '20', consultas: 31 },
    { day: '25', consultas: 28 },
    { day: '30', consultas: 35 },
  ];

  const topPublicaciones = [
    {
      id: 1,
      nombre: 'Parcela Vista al Valle',
      ubicacion: 'Pirque, RM',
      visitas: 842,
      consultas: 23,
      estado: 'Activa',
      imagen: 'https://images.unsplash.com/photo-1764222233275-87dc016c11dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZWFsJTIwZXN0YXRlJTIwcHJvcGVydHklMjBhZXJpYWwlMjB2aWV3fGVufDF8fHx8MTc3MDEzNDQyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 2,
      nombre: 'Parcela Los Robles',
      ubicacion: 'Chicureo, RM',
      visitas: 621,
      consultas: 19,
      estado: 'Activa',
      imagen: 'https://images.unsplash.com/photo-1604250792319-1b064692cb94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsYW5kJTIwcHJvcGVydHklMjBjb3VudHJ5c2lkZXxlbnwxfHx8fDE3NzAxMzQ0MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 3,
      nombre: 'Parcela El Bosque',
      ubicacion: 'Colina, RM',
      visitas: 587,
      consultas: 17,
      estado: 'Activa',
      imagen: 'https://images.unsplash.com/photo-1665361460440-dad31300e157?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMHBsb3QlMjBncmVlbiUyMGZpZWxkc3xlbnwxfHx8fDE3NzAxMzQ0MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
  ];

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
          Rendimiento
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
          Métricas y estadísticas de tus publicaciones
        </p>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Consultas Recibidas */}
        <div className="bg-white border-2 border-gray-200 rounded-[24px] p-6 space-y-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(18, 72, 84, 0.1)' }}>
              <MessageCircle className="w-5 h-5" style={{ color: '#124854' }} />
            </div>
            <div className="flex items-center gap-1">
              <ArrowUp className="w-4 h-4" style={{ color: '#647E3F' }} />
              <span 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#647E3F',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                +12%
              </span>
            </div>
          </div>
          <div>
            <div 
              style={{ 
                fontFamily: 'var(--font-heading)',
                fontSize: '32px',
                fontWeight: 'var(--font-weight-medium)',
                color: '#0A0A0A',
                lineHeight: '1.2'
              }}
            >
              156
            </div>
            <div 
              className="mt-1"
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 'var(--font-weight-regular)',
                color: '#6B6B6B',
                lineHeight: 'var(--line-height-body)'
              }}
            >
              Consultas recibidas
            </div>
          </div>
        </div>

        {/* Publicaciones Activas */}
        <div className="bg-white border-2 border-gray-200 rounded-[24px] p-6 space-y-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(18, 72, 84, 0.1)' }}>
              <FileText className="w-5 h-5" style={{ color: '#124854' }} />
            </div>
            <div className="flex items-center gap-1">
              <span 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#6B6B6B',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                Sin cambio
              </span>
            </div>
          </div>
          <div>
            <div 
              style={{ 
                fontFamily: 'var(--font-heading)',
                fontSize: '32px',
                fontWeight: 'var(--font-weight-medium)',
                color: '#0A0A0A',
                lineHeight: '1.2'
              }}
            >
              24
            </div>
            <div 
              className="mt-1"
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 'var(--font-weight-regular)',
                color: '#6B6B6B',
                lineHeight: 'var(--line-height-body)'
              }}
            >
              Publicaciones activas
            </div>
          </div>
        </div>

        {/* Parcelas Vendidas */}
        <div className="bg-white border-2 border-gray-200 rounded-[24px] p-6 space-y-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(18, 72, 84, 0.1)' }}>
              <CheckCircle className="w-5 h-5" style={{ color: '#124854' }} />
            </div>
            <div className="flex items-center gap-1">
              <ArrowUp className="w-4 h-4" style={{ color: '#647E3F' }} />
              <span 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#647E3F',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                +8%
              </span>
            </div>
          </div>
          <div>
            <div 
              style={{ 
                fontFamily: 'var(--font-heading)',
                fontSize: '32px',
                fontWeight: 'var(--font-weight-medium)',
                color: '#0A0A0A',
                lineHeight: '1.2'
              }}
            >
              7
            </div>
            <div 
              className="mt-1"
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 'var(--font-weight-regular)',
                color: '#6B6B6B',
                lineHeight: 'var(--line-height-body)'
              }}
            >
              Parcelas vendidas
            </div>
          </div>
        </div>

        {/* Tasa de Conversión */}
        <div className="bg-white border-2 border-gray-200 rounded-[24px] p-6 space-y-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(18, 72, 84, 0.1)' }}>
              <TrendingUp className="w-5 h-5" style={{ color: '#124854' }} />
            </div>
            <div className="flex items-center gap-1">
              <ArrowDown className="w-4 h-4 text-red-600" />
              <span 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#DC2626',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                -3%
              </span>
            </div>
          </div>
          <div>
            <div 
              style={{ 
                fontFamily: 'var(--font-heading)',
                fontSize: '32px',
                fontWeight: 'var(--font-weight-medium)',
                color: '#0A0A0A',
                lineHeight: '1.2'
              }}
            >
              4.5%
            </div>
            <div 
              className="mt-1"
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 'var(--font-weight-regular)',
                color: '#6B6B6B',
                lineHeight: 'var(--line-height-body)'
              }}
            >
              Tasa de conversión
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <section className="bg-white border-2 border-gray-200 rounded-[24px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between mb-6">
          <h2 
            style={{ 
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--font-size-h3)',
              fontWeight: 'var(--font-weight-medium)',
              color: '#0A0A0A',
              lineHeight: 'var(--line-height-heading)'
            }}
          >
            Consultas por período
          </h2>
          <div className="flex gap-2">
            {['7', '30', '90'].map((range) => (
              <button
                key={range}
                onClick={() => setSelectedRange(range)}
                className={`px-4 py-2 rounded-[100px] transition-colors ${
                  selectedRange === range 
                    ? 'text-white' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                style={{
                  backgroundColor: selectedRange === range ? '#124854' : undefined,
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 'var(--font-weight-medium)',
                  lineHeight: 'var(--line-height-body)',
                  color: selectedRange === range ? '#FFFFFF' : '#0A0A0A'
                }}
              >
                {range} días
              </button>
            ))}
          </div>
        </div>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
              <XAxis 
                dataKey="day" 
                stroke="#6B6B6B"
                style={{ fontFamily: 'var(--font-body)', fontSize: '12px' }}
              />
              <YAxis 
                stroke="#6B6B6B"
                style={{ fontFamily: 'var(--font-body)', fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{ 
                  fontFamily: 'var(--font-body)', 
                  fontSize: '14px',
                  borderRadius: '12px',
                  border: '2px solid #E5E5E5'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="consultas" 
                stroke="#124854" 
                strokeWidth={3}
                dot={{ fill: '#124854', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Grid: Top Publications and AI Insight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Publicaciones */}
        <section className="lg:col-span-2 bg-white border-2 border-gray-200 rounded-[24px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
          <h2 
            className="mb-6"
            style={{ 
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--font-size-h3)',
              fontWeight: 'var(--font-weight-medium)',
              color: '#0A0A0A',
              lineHeight: 'var(--line-height-heading)'
            }}
          >
            Top publicaciones
          </h2>
          <div className="space-y-4">
            {topPublicaciones.map((pub) => (
              <div 
                key={pub.id}
                className="flex items-center gap-4 p-4 rounded-[16px] border-2 border-gray-200 hover:border-gray-300 transition-colors"
              >
                <div className="w-20 h-20 rounded-[12px] overflow-hidden flex-shrink-0 bg-gray-100">
                  <img 
                    src={pub.imagen} 
                    alt={pub.nombre}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div 
                    className="truncate"
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-base)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    {pub.nombre}
                  </div>
                  <div 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 'var(--font-weight-regular)',
                      color: '#6B6B6B',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    {pub.ubicacion}
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div 
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-base)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#0A0A0A',
                        lineHeight: 'var(--line-height-body)'
                      }}
                    >
                      {pub.visitas}
                    </div>
                    <div 
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: '12px',
                        fontWeight: 'var(--font-weight-regular)',
                        color: '#6B6B6B',
                        lineHeight: 'var(--line-height-body)'
                      }}
                    >
                      Visitas
                    </div>
                  </div>
                  <div className="text-center">
                    <div 
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-base)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#0A0A0A',
                        lineHeight: 'var(--line-height-body)'
                      }}
                    >
                      {pub.consultas}
                    </div>
                    <div 
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: '12px',
                        fontWeight: 'var(--font-weight-regular)',
                        color: '#6B6B6B',
                        lineHeight: 'var(--line-height-body)'
                      }}
                    >
                      Consultas
                    </div>
                  </div>
                  <div>
                    <span 
                      className="bg-green-100 text-green-800 px-3 py-1.5 rounded-[100px]"
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: '12px',
                        fontWeight: 'var(--font-weight-medium)',
                        lineHeight: 'var(--line-height-body)'
                      }}
                    >
                      {pub.estado}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AI Insight */}
        <section className="bg-gradient-to-br from-emerald-50 to-emerald-50 border-2 border-emerald-200 rounded-[24px] p-8 space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
            <Zap className="w-6 h-6 text-emerald-700" />
          </div>
          <h2 
            style={{ 
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--font-size-h3)',
              fontWeight: 'var(--font-weight-medium)',
              color: '#0A0A0A',
              lineHeight: 'var(--line-height-heading)'
            }}
          >
            Insight generado por IA
          </h2>
          <p 
            style={{ 
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-base)',
              fontWeight: 'var(--font-weight-regular)',
              color: '#0A0A0A',
              lineHeight: 'var(--line-height-body)',
              letterSpacing: 'var(--letter-spacing-normal)'
            }}
          >
            Tus publicaciones en Pirque están recibiendo un 35% más de consultas que el promedio. 
            Considera añadir más propiedades en esta zona para maximizar tu rendimiento.
          </p>
          <div 
            className="pt-2"
            style={{ 
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 'var(--font-weight-medium)',
              color: '#006B4E',
              lineHeight: 'var(--line-height-body)'
            }}
          >
            Basado en datos de los últimos 30 días
          </div>
        </section>
      </div>
    </main>
  );
}

// TeamContent is now imported from TeamContent.tsx

function PlanContent() {
  const [showCancelModal, setShowCancelModal] = React.useState(false);
  const currentPlan = 'oro';

  const plans = [
    {
      id: 'bronce',
      name: 'Bronce',
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
  const handleCancelPlan = () => { console.log('Cancelando plan...'); setShowCancelModal(false); };
  const getReasonBadgeStyle = (type: string) => {
    switch (type) {
      case 'subscription': return { backgroundColor: '#E8E7E6', color: 'var(--foreground)' };
      case 'creation': return { backgroundColor: '#DCFCE7', color: '#16A34A' };
      case 'upgrade': return { backgroundColor: '#FEF3C7', color: '#CA8A04' };
      default: return { backgroundColor: '#E8E7E6', color: '#737373' };
    }
  };

  return (
    <main className="px-8 py-8 space-y-8">
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
        <button className="py-2.5 px-6 transition-all" style={{ backgroundColor: '#FFFFFF', color: '#0A0A0A', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-wide)', lineHeight: 'var(--line-height-ui)' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#E8E7E6'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; }}>Ver otros planes</button>
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
      <section>
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
                <button disabled={isActive} className="w-full py-2.5 px-6 transition-all" style={{ backgroundColor: isActive ? '#F5F5F5' : isHigher ? '#124854' : '#FFFFFF', color: isActive ? '#A3A3A3' : isHigher ? '#FFFFFF' : 'var(--foreground)', border: isActive ? '2px solid #E5E5E5' : isHigher ? 'none' : '2px solid #DEDEDE', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-wide)', lineHeight: 'var(--line-height-ui)', cursor: isActive ? 'not-allowed' : 'pointer' }} onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = isHigher ? '#0D3640' : '#FAFAFA'; }} onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = isHigher ? '#124854' : '#FFFFFF'; }}>{isActive ? 'Plan activo' : isHigher ? 'Mejorar plan' : 'Cambiar a este plan'}</button>
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
              <button onClick={() => setShowCancelModal(false)} className="flex-1 px-6 py-3 transition-all" style={{ backgroundColor: '#124854', color: '#FFFFFF', border: '2px solid #124854', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-wide)', lineHeight: 'var(--line-height-ui)' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0D3640'; e.currentTarget.style.borderColor = '#0D3640'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#124854'; e.currentTarget.style.borderColor = '#124854'; }}>Mantener plan</button>
              <button onClick={handleCancelPlan} className="flex-1 px-6 py-3 transition-all" style={{ backgroundColor: '#FFFFFF', color: '#DC2626', border: '2px solid #DEDEDE', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-wide)', lineHeight: 'var(--line-height-ui)' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FEE2E2'; e.currentTarget.style.borderColor = '#DC2626'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.borderColor = '#DEDEDE'; }}>Sí, cancelar</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// HelpContent is now imported from HelpContent.tsx

// SettingsContent is now imported from SettingsContent.tsx