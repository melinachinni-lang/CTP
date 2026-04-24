import React from 'react';
import { NewListingFlow } from '@/app/components/NewListingFlow';
import { PersonalInquiriesSection } from '@/app/components/PersonalInquiriesSection';
import { MyPublicationsView } from '@/app/components/MyPublicationsView';
import { ConsultasView } from '@/app/components/ConsultasView';
import { Eye, MessageCircle, FileText, Star, Plus, Edit, ArrowUp, AlertCircle, Zap, Info, Image as ImageIcon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { DashboardRef } from '@/app/App';

interface PersonDashboardScreenProps {
  onNavigate: (screen: string, id?: number) => void;
}

export const PersonDashboardScreen = React.forwardRef<DashboardRef, PersonDashboardScreenProps>(
  ({ onNavigate }, ref) => {
    const [showMenu, setShowMenu] = React.useState(false);
    const [currentSection, setCurrentSection] = React.useState('home');
    const [triggerPublishModal, setTriggerPublishModal] = React.useState(0);

    // Exponer función para abrir modal de publicación
    React.useImperativeHandle(ref, () => ({
      openPublishModal: () => {
        setCurrentSection('listings');
        // Incrementar contador para forzar el trigger
        setTriggerPublishModal(prev => prev + 1);
      }
    }));

  const navItems = [
    { id: 'home', label: 'Inicio', icon: 'home' },
    { id: 'explore', label: 'Explorar parcelas', icon: 'search', group: 'buy' },
    { id: 'listings', label: 'Mis publicaciones', icon: 'list', group: 'sell' },
    { id: 'saved', label: 'Guardados', icon: 'heart', group: 'buy' },
    { id: 'inquiries', label: 'Consultas recibidas', icon: 'message', group: 'sell' },
    { id: 'compare', label: 'Comparar', icon: 'chart', group: 'buy' },
    { id: 'purchases', label: 'Mis compras', icon: 'shopping-bag', group: 'buy' },
    { id: 'plan', label: 'Plan y límites', icon: 'credit-card', group: 'sell' },
    { id: 'help', label: 'Ayuda', icon: 'help' },
    { id: 'settings', label: 'Configuración', icon: 'settings' },
  ];

  const renderIcon = (iconType: string, isActive: boolean) => {
    const color = '#006B4E';
    const strokeWidth = isActive ? 2.5 : 2;

    switch (iconType) {
      case 'home':
        return (
          <svg className="w-5 h-5" fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth={strokeWidth}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'search':
        return (
          <svg className="w-5 h-5" fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth={strokeWidth}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        );
      case 'heart':
        return (
          <svg className="w-5 h-5" fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth={strokeWidth}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case 'chart':
        return (
          <svg className="w-5 h-5" fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth={strokeWidth}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
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
      case 'help':
        return (
          <svg className="w-5 h-5" fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth={strokeWidth}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'shopping-bag':
        return (
          <svg className="w-5 h-5" fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth={strokeWidth}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        );
      case 'credit-card':
        return (
          <svg className="w-5 h-5" fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth={strokeWidth}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3v-8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        );
      case 'settings':
        return (
          <svg className="w-5 h-5" fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth={strokeWidth}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Nav Rail - Left Sidebar */}
      <aside className="w-56 border-r-2 border-gray-300 bg-gray-50 flex-shrink-0 fixed left-0 top-0 bottom-0 z-20">
        <div className="h-full flex flex-col">
          {/* Logo Area */}
          <div className="border-b-2 border-gray-300 p-2 mt-8">
            <div className="font-bold text-base text-black">CompraTuParcela</div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 py-4 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                  currentSection === item.id
                    ? 'font-medium'
                    : ''
                }`}
                style={{
                  color: '#006B4E',
                  ...(currentSection === item.id
                    ? { backgroundColor: '#CDD8DE' }
                    : { transition: 'background-color 0.2s ease' })
                }}
                onMouseEnter={(e) => {
                  if (currentSection !== item.id) {
                    e.currentTarget.style.backgroundColor = 'rgba(100, 126, 63, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentSection !== item.id) {
                    e.currentTarget.style.backgroundColor = '';
                  }
                }}
              >
                {renderIcon(item.icon, currentSection === item.id)}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* User Profile Area */}
          <div className="border-t-2 border-gray-300 p-4">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-full flex items-center gap-3 text-sm text-gray-700 hover:text-black"
            >
              <div className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="flex-1 text-left font-medium">Mi cuenta</span>
            </button>
            {showMenu && (
              <div className="mt-2 bg-white border-2 border-gray-300">
                <button
                  onClick={() => onNavigate('entry')}
                  className="w-full text-left text-xs py-2 px-3"
                  style={{ transition: 'background-color 0.2s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(100, 126, 63, 0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-56">
        {currentSection === 'home' && <HomeContent setCurrentSection={setCurrentSection} setTriggerPublishModal={setTriggerPublishModal} />}
        {currentSection === 'explore' && <ExploreContent />}
        {currentSection === 'listings' && <MyPublicationsView userType="vendedor_particular" userId="person-123" onNavigate={onNavigate} onNavigateToSection={setCurrentSection} autoOpenModal={triggerPublishModal} />}
        {currentSection === 'saved' && <SavedContent />}
        {currentSection === 'inquiries' && <ConsultasView viewType="personal" />}
        {currentSection === 'compare' && <CompareContent />}
        {currentSection === 'purchases' && <MyPurchasesContent />}
        {currentSection === 'plan' && <PlanContent />}
        {currentSection === 'help' && <HelpContent />}
        {currentSection === 'settings' && <SettingsContent />}
      </div>
    </div>
  );
});

// Home Section Component - Seller focused dashboard
interface HomeContentProps {
  setCurrentSection: (section: string) => void;
  setTriggerPublishModal: React.Dispatch<React.SetStateAction<number>>;
}

function HomeContent({ setCurrentSection, setTriggerPublishModal }: HomeContentProps) {
  const maxPublications = 3; // Límite de publicaciones para usuarios persona natural
  const currentPublications = 2;
  const canPublish = currentPublications < maxPublications;

  // Datos simulados para el gráfico
  const interestData = [
    { date: '1 Feb', views: 45 },
    { date: '5 Feb', views: 52 },
    { date: '10 Feb', views: 67 },
    { date: '15 Feb', views: 78 },
    { date: '20 Feb', views: 89 },
    { date: '25 Feb', views: 95 },
    { date: '28 Feb', views: 108 },
  ];

  return (
    <main className="px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 style={{ 
            fontFamily: 'var(--font-heading)',
            fontWeight: 'var(--font-weight-regular)',
            fontSize: 'var(--font-size-h2)',
            lineHeight: 'var(--line-heading)',
            color: '#0A0A0A'
          }}>
            Mis publicaciones
          </h1>
          <p style={{ 
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-base)',
            color: '#737373',
            marginTop: '8px'
          }}>
            Gestiona tus parcelas y revisa el interés generado
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
            <Edit className="w-4 h-4" />
            Editar publicaciones
          </button>
          <button 
            disabled={!canPublish}
            onClick={() => {
              setCurrentSection('listings');
              setTriggerPublishModal(prev => prev + 1);
            }}
            className="py-2.5 px-5 flex items-center gap-2 transition-all" 
            style={{ 
              backgroundColor: canPublish ? '#006B4E' : '#F5F5F5',
              color: canPublish ? '#FFFFFF' : '#A3A3A3',
              borderRadius: '200px',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-sm)',
              fontWeight: 'var(--font-weight-medium)',
              letterSpacing: 'var(--letter-spacing-wide)',
              lineHeight: 'var(--line-height-ui)',
              cursor: canPublish ? 'pointer' : 'not-allowed'
            }}
            onMouseEnter={(e) => { if (canPublish) e.currentTarget.style.backgroundColor = '#0D3640'; }}
            onMouseLeave={(e) => { if (canPublish) e.currentTarget.style.backgroundColor = '#006B4E'; }}
          >
            <Plus className="w-4 h-4" />
            Nueva publicación
          </button>
        </div>
      </div>

      {/* Límite de publicaciones info */}
      <div className="rounded-xl p-4 flex items-start gap-3" style={{ backgroundColor: '#FFFBEB', border: '1px solid #FDE68A' }}>
        <Info className="w-5 h-5 flex-shrink-0" style={{ color: '#CA8A04', marginTop: '2px' }} />
        <div>
          <p style={{ 
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-sm)',
            color: '#0A0A0A',
            lineHeight: '1.5'
          }}>
            <strong>Tienes {currentPublications} de {maxPublications} publicaciones activas.</strong>
            {!canPublish && ' Has alcanzado el límite de publicaciones gratuitas.'}
          </p>
          <p style={{ 
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-xs)',
            color: '#6B6B6B',
            marginTop: '4px',
            lineHeight: '1.5'
          }}>
            Puedes destacar tus publicaciones para aumentar su visibilidad por un pago único.
          </p>
        </div>
      </div>

      {/* KPIs Section */}
      <section className="grid grid-cols-4 gap-6">
        {/* Publicaciones activas */}
        <div className="rounded-2xl p-6 flex flex-col" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 4px 12px 0 rgba(18, 72, 84, 0.08)' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(18, 72, 84, 0.1)' }}>
              <FileText className="w-5 h-5" style={{ color: '#006B4E' }} />
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
              Publicaciones activas
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
              {currentPublications}
            </div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: '#A3A3A3', lineHeight: '1.5' }}>
              de {maxPublications} disponibles
            </div>
          </div>
        </div>
        
        {/* Visualizaciones totales */}
        <div className="rounded-2xl p-6 flex flex-col" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 4px 12px 0 rgba(18, 72, 84, 0.08)' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(18, 72, 84, 0.1)' }}>
              <Eye className="w-5 h-5" style={{ color: '#006B4E' }} />
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full" style={{ backgroundColor: 'rgba(100, 126, 63, 0.1)' }}>
              <ArrowUp className="w-3 h-3" style={{ color: '#647E3F' }} />
              <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#647E3F' }}>
                +18%
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
              347
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
              <MessageCircle className="w-5 h-5" style={{ color: '#006B4E' }} />
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full" style={{ backgroundColor: 'rgba(70, 38, 17, 0.1)' }}>
              <AlertCircle className="w-3 h-3" style={{ color: '#462611' }} />
              <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#462611' }}>
                2 nuevas
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
              12
            </div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: '#A3A3A3', lineHeight: '1.5' }}>
              Últimos 30 días
            </div>
          </div>
        </div>
        
        {/* Publicaciones destacadas */}
        <div className="rounded-2xl p-6 flex flex-col" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 4px 12px 0 rgba(18, 72, 84, 0.08)' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(18, 72, 84, 0.1)' }}>
              <Star className="w-5 h-5" style={{ color: '#006B4E' }} />
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
              Destacadas
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
              0
            </div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: '#A3A3A3', lineHeight: '1.5' }}>
              Ninguna actualmente
            </div>
          </div>
        </div>
      </section>

      {/* Gráfico de interés */}
      <section className="rounded-2xl p-6 space-y-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
        <h2 style={{ 
          fontFamily: 'var(--font-heading)',
          fontWeight: 'var(--font-weight-medium)',
          fontSize: 'var(--font-size-h3)',
          lineHeight: 'var(--line-height-heading)',
          color: '#0A0A0A'
        }}>
          Interés en tus publicaciones
        </h2>
        <div style={{ width: '100%', height: '280px' }}>
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
                dataKey="views" 
                stroke="#006B4E" 
                strokeWidth={3}
                dot={{ fill: '#006B4E', r: 4 }}
                activeDot={{ r: 6, fill: '#006B4E' }}
                name="Visualizaciones"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p style={{ 
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-body-sm)',
          color: '#737373',
          lineHeight: '1.5'
        }}>
          Este gráfico muestra las visualizaciones de todas tus publicaciones en los últimos 30 días.
        </p>
      </section>

      {/* Lista de publicaciones */}
      <section className="rounded-2xl p-6 space-y-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
        <div className="flex items-center justify-between">
          <h2 style={{ 
            fontFamily: 'var(--font-heading)',
            fontWeight: 'var(--font-weight-medium)',
            fontSize: 'var(--font-size-h3)',
            lineHeight: 'var(--line-height-heading)',
            color: '#0A0A0A'
          }}>
            Tus parcelas publicadas
          </h2>
        </div>

        <div className="space-y-4">
          {/* Publicación 1 */}
          <div className="rounded-xl p-5 transition-all cursor-pointer" style={{ border: '1px solid #E5E5E5' }}
            onMouseEnter={(e) => { 
              e.currentTarget.style.backgroundColor = '#FAFAFA'; 
              e.currentTarget.style.borderColor = '#DEDEDE';
            }}
            onMouseLeave={(e) => { 
              e.currentTarget.style.backgroundColor = 'transparent'; 
              e.currentTarget.style.borderColor = '#E5E5E5';
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 style={{ 
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h4)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-heading)'
                }}>
                  Parcela Valle del Sol
                </h3>
                <p style={{ 
                  fontSize: 'var(--font-size-body-sm)',
                  color: '#737373',
                  marginTop: '4px'
                }}>
                  Lampa, Región Metropolitana • 6.000 m²
                </p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(100, 126, 63, 0.1)' }}>
                <span style={{ 
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: '#647E3F',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Activa
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-4">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" style={{ color: '#737373' }} />
                <div>
                  <div style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-h4)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: '#0A0A0A'
                  }}>
                    234
                  </div>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: '#A3A3A3' }}>
                    Visualizaciones
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" style={{ color: '#737373' }} />
                <div>
                  <div style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-h4)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: '#0A0A0A'
                  }}>
                    8
                  </div>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: '#A3A3A3' }}>
                    Consultas
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" style={{ color: '#737373' }} />
                <div>
                  <div style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-h4)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: '#0A0A0A'
                  }}>
                    No destacada
                  </div>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: '#A3A3A3' }}>
                    Visibilidad estándar
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => onNavigate('parcela-detalle', 1)}
                className="flex-1 py-2 px-4 transition-all" style={{ 
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
                Ver publicación
              </button>
              <button className="flex-1 py-2 px-4 transition-all" style={{ 
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
                Editar
              </button>
              <button className="flex-1 py-2 px-4 flex items-center justify-center gap-2 transition-all" style={{ 
                backgroundColor: '#FEF3C7',
                color: '#CA8A04',
                border: '2px solid #FDE68A',
                borderRadius: '200px',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                fontWeight: 'var(--font-weight-medium)',
                letterSpacing: 'var(--letter-spacing-wide)',
                lineHeight: 'var(--line-height-ui)'
              }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FDE68A'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FEF3C7'; }}
              >
                <Zap className="w-4 h-4" />
                Destacar
              </button>
            </div>
          </div>

          {/* Publicación 2 */}
          <div className="rounded-xl p-5 transition-all cursor-pointer" style={{ border: '1px solid #E5E5E5' }}
            onMouseEnter={(e) => { 
              e.currentTarget.style.backgroundColor = '#FAFAFA'; 
              e.currentTarget.style.borderColor = '#DEDEDE';
            }}
            onMouseLeave={(e) => { 
              e.currentTarget.style.backgroundColor = 'transparent'; 
              e.currentTarget.style.borderColor = '#E5E5E5';
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 style={{ 
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h4)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-heading)'
                }}>
                  Terreno El Refugio
                </h3>
                <p style={{ 
                  fontSize: 'var(--font-size-body-sm)',
                  color: '#737373',
                  marginTop: '4px'
                }}>
                  Colina, Región Metropolitana • 3.500 m²
                </p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(100, 126, 63, 0.1)' }}>
                <span style={{ 
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: '#647E3F',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Activa
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-4">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" style={{ color: '#737373' }} />
                <div>
                  <div style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-h4)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: '#0A0A0A'
                  }}>
                    113
                  </div>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: '#A3A3A3' }}>
                    Visualizaciones
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" style={{ color: '#737373' }} />
                <div>
                  <div style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-h4)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: '#0A0A0A'
                  }}>
                    4
                  </div>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: '#A3A3A3' }}>
                    Consultas
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" style={{ color: '#737373' }} />
                <div>
                  <div style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-h4)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: '#0A0A0A'
                  }}>
                    No destacada
                  </div>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: '#A3A3A3' }}>
                    Visibilidad estándar
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => onNavigate('parcela-detalle', 2)}
                className="flex-1 py-2 px-4 transition-all" style={{ 
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
                Ver publicación
              </button>
              <button className="flex-1 py-2 px-4 transition-all" style={{ 
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
                Editar
              </button>
              <button className="flex-1 py-2 px-4 flex items-center justify-center gap-2 transition-all" style={{ 
                backgroundColor: '#FEF3C7',
                color: '#CA8A04',
                border: '2px solid #FDE68A',
                borderRadius: '200px',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                fontWeight: 'var(--font-weight-medium)',
                letterSpacing: 'var(--letter-spacing-wide)',
                lineHeight: 'var(--line-height-ui)'
              }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FDE68A'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FEF3C7'; }}
              >
                <Zap className="w-4 h-4" />
                Destacar
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Placeholder components for other sections
function ExploreContent() {
  return (
    <main className="px-6 py-6 space-y-6">
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
          Explorar parcelas
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
          Encuentra la parcela ideal para tu proyecto
        </p>
      </div>

      {/* Search Module */}
      <section className="bg-white p-8 w-full shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-[24px] border-2 border-gray-200">
        {/* Main Search Field */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar por ubicación, características o proyecto"
            className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black px-6 py-4 rounded-[100px] focus:outline-none transition-colors"
            style={{ 
              color: '#0A0A0A',
              fontFamily: 'var(--font-body)', 
              fontSize: 'var(--font-size-body-base)',
              fontWeight: 'var(--font-weight-regular)', 
              lineHeight: 'var(--line-height-body)',
              letterSpacing: 'var(--letter-spacing-normal)'
            }}
          />
        </div>

        {/* Compact Filters */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Budget Filter */}
          <div className="space-y-2.5">
            <label 
              className="text-xs font-medium block text-left pl-1" 
              style={{ 
                color: '#0A0A0A', 
                fontFamily: 'var(--font-body)',
                fontWeight: 'var(--font-weight-medium)'
              }}
            >
              Presupuesto
            </label>
            <input
              type="text"
              placeholder="Ej: $40.000.000"
              className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black px-5 py-3 rounded-[100px] focus:outline-none transition-colors"
              style={{ 
                color: '#0A0A0A',
                fontFamily: 'var(--font-body)', 
                fontSize: '15px',
                fontWeight: 'var(--font-weight-regular)', 
                lineHeight: '1.5' 
              }}
            />
          </div>

          {/* Monthly Payment Filter */}
          <div className="space-y-2.5">
            <label 
              className="text-xs font-medium block text-left pl-1" 
              style={{ 
                color: '#0A0A0A', 
                fontFamily: 'var(--font-body)',
                fontWeight: 'var(--font-weight-medium)'
              }}
            >
              Cuota aproximada
            </label>
            <input
              type="text"
              placeholder="Ej: $500.000"
              className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black px-5 py-3 rounded-[100px] focus:outline-none transition-colors"
              style={{ 
                color: '#0A0A0A',
                fontFamily: 'var(--font-body)', 
                fontSize: '15px',
                fontWeight: 'var(--font-weight-regular)', 
                lineHeight: '1.5' 
              }}
            />
          </div>

          {/* Zone Filter */}
          <div className="space-y-2.5">
            <label 
              className="text-xs font-medium block text-left pl-1" 
              style={{ 
                color: '#0A0A0A', 
                fontFamily: 'var(--font-body)',
                fontWeight: 'var(--font-weight-medium)'
              }}
            >
              Zona
            </label>
            <input
              type="text"
              placeholder="Ej: Colina, Chicureo"
              className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black px-5 py-3 rounded-[100px] focus:outline-none transition-colors"
              style={{ 
                color: '#0A0A0A',
                fontFamily: 'var(--font-body)', 
                fontSize: '15px',
                fontWeight: 'var(--font-weight-regular)', 
                lineHeight: '1.5' 
              }}
            />
          </div>

          {/* Property Type Filter */}
          <div className="space-y-2.5">
            <label 
              className="text-xs font-medium block text-left pl-1" 
              style={{ 
                color: '#0A0A0A', 
                fontFamily: 'var(--font-body)',
                fontWeight: 'var(--font-weight-medium)'
              }}
            >
              Tipo de parcela
            </label>
            <input
              type="text"
              placeholder="Ej: Agrado, Residencial"
              className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black px-5 py-3 rounded-[100px] focus:outline-none transition-colors"
              style={{ 
                color: '#0A0A0A',
                fontFamily: 'var(--font-body)', 
                fontSize: '15px',
                fontWeight: 'var(--font-weight-regular)', 
                lineHeight: '1.5' 
              }}
            />
          </div>
        </div>

        {/* Search Button */}
        <button 
          className="w-full text-white py-3.5 px-8 rounded-[200px]"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-base)',
            fontWeight: 'var(--font-weight-medium)',
            lineHeight: 'var(--line-height-body)',
            letterSpacing: 'var(--letter-spacing-normal)',
            backgroundColor: '#006B4E',
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0D3640'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
        >
          Buscar parcelas
        </button>
      </section>

      {/* Results - Historial */}
      <section className="bg-white p-8 w-full shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-[24px] border-2 border-gray-200">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 
              style={{ 
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--font-size-h3)',
                fontWeight: 'var(--font-weight-medium)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-heading)',
                letterSpacing: 'var(--letter-spacing-normal)'
              }}
            >
              Historial de parcelas vistas
            </h2>
            <button 
              className="text-sm text-gray-600 hover:text-black transition-colors underline"
              style={{ 
                fontFamily: 'var(--font-body)',
                fontWeight: 'var(--font-weight-regular)',
                lineHeight: 'var(--line-height-body)'
              }}
            >
              Limpiar historial
            </button>
          </div>

          {/* Property History List */}
          <div className="space-y-4">
            {/* Property 1 */}
            <div className="border-2 border-gray-200 hover:border-gray-300 p-5 rounded-[16px] transition-all cursor-pointer">
              <div className="flex gap-5">
                <div className="w-32 h-32 bg-gray-100 flex-shrink-0 rounded-[12px] overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1764168414096-fa2a80540745?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXJhbCUyMHByb3BlcnR5JTIwbGFuZCUyMGFlcmlhbHxlbnwxfHx8fDE3NzAxMzI5NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Parcela Vista Hermosa"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-base)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#0A0A0A',
                        lineHeight: 'var(--line-height-body)'
                      }}
                    >
                      Parcela Vista Hermosa
                    </h3>
                    <p 
                      className="mt-1"
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        fontWeight: 'var(--font-weight-regular)',
                        color: '#6B6B6B',
                        lineHeight: 'var(--line-height-body)'
                      }}
                    >
                      Colina, Región Metropolitana
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span 
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        fontWeight: 'var(--font-weight-regular)',
                        color: '#6B6B6B',
                        lineHeight: 'var(--line-height-body)'
                      }}
                    >
                      5.000 m²
                    </span>
                    <span className="text-gray-300">•</span>
                    <span 
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#0A0A0A',
                        lineHeight: 'var(--line-height-body)'
                      }}
                    >
                      $45.000.000
                    </span>
                  </div>
                  <p 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      fontWeight: 'var(--font-weight-regular)',
                      color: '#959595',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    Visto hace 2 días
                  </p>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Property 2 */}
            <div className="border-2 border-gray-200 hover:border-gray-300 p-5 rounded-[16px] transition-all cursor-pointer">
              <div className="flex gap-5">
                <div className="w-32 h-32 bg-gray-100 flex-shrink-0 rounded-[12px] overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1762017374272-193decaa63c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VudHJ5c2lkZSUyMGxhbmQlMjBwcm9wZXJ0eSUyMGdyZWVufGVufDF8fHx8MTc3MDEzMjk2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Parcela El Roble"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-base)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#0A0A0A',
                        lineHeight: 'var(--line-height-body)'
                      }}
                    >
                      Parcela El Roble
                    </h3>
                    <p 
                      className="mt-1"
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        fontWeight: 'var(--font-weight-regular)',
                        color: '#6B6B6B',
                        lineHeight: 'var(--line-height-body)'
                      }}
                    >
                      Chicureo, Región Metropolitana
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span 
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        fontWeight: 'var(--font-weight-regular)',
                        color: '#6B6B6B',
                        lineHeight: 'var(--line-height-body)'
                      }}
                    >
                      8.500 m²
                    </span>
                    <span className="text-gray-300">•</span>
                    <span 
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#0A0A0A',
                        lineHeight: 'var(--line-height-body)'
                      }}
                    >
                      $72.000.000
                    </span>
                  </div>
                  <p 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      fontWeight: 'var(--font-weight-regular)',
                      color: '#959595',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    Visto hace 5 días
                  </p>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ListingsContent({ onNavigate }: { onNavigate: (screen: string, id?: number) => void }) {
  const [showNewListingFlow, setShowNewListingFlow] = React.useState(false);
  const [hasListings, setHasListings] = React.useState(true); // Set to false to show empty state

  const handlePublishListing = () => {
    setShowNewListingFlow(false);
    alert('¡Parcela publicada exitosamente! Ya está visible en la plataforma.');
  };

  // Si está en el flujo de nueva parcela
  if (showNewListingFlow) {
    return (
      <NewListingFlow
        onClose={() => setShowNewListingFlow(false)}
        onPublish={handlePublishListing}
      />
    );
  }

  if (!hasListings) {
    // Empty State
    return (
      <main className="px-6 py-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--font-size-h2)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)',
            lineHeight: 'var(--line-height-heading)'
          }}>
            Mis publicaciones
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-sm)',
            color: '#737373',
            lineHeight: 'var(--line-height-body)'
          }}>
            Acá vas a encontrar todas tus parcelas publicadas
          </p>
        </div>

        {/* Empty State */}
        <section 
          className="p-12 text-center space-y-6 rounded-2xl"
          style={{
            backgroundColor: '#FAFAFA',
            border: '2px dashed #DEDEDE'
          }}
        >
          <div className="flex justify-center">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: '#F5F5F5' }}
            >
              <FileText className="w-8 h-8" style={{ color: '#A3A3A3' }} />
            </div>
          </div>
          <div className="space-y-2">
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--font-size-h3)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--foreground)',
              lineHeight: 'var(--line-height-heading)'
            }}>
              Aún no tienes parcelas publicadas
            </h2>
            <p 
              className="max-w-md mx-auto"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                color: '#737373',
                lineHeight: 'var(--line-height-body)'
              }}
            >
              Comienza a publicar tu parcela para que compradores interesados puedan contactarte
            </p>
          </div>
          <button
            onClick={() => setShowNewListingFlow(true)}
            className="inline-flex items-center gap-2 px-6 py-3 transition-all"
            style={{
              backgroundColor: '#006B4E',
              color: '#FFFFFF',
              borderRadius: '200px',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-sm)',
              fontWeight: 'var(--font-weight-medium)',
              letterSpacing: 'var(--letter-spacing-wide)',
              lineHeight: 'var(--line-height-ui)',
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0D3640';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#006B4E';
            }}
          >
            <Plus className="w-4 h-4" />
            Publicar nueva parcela
          </button>
        </section>

        {/* Info Box */}
        <section 
          className="p-6 space-y-4 rounded-2xl"
          style={{
            backgroundColor: '#FAFAFA',
            border: '1px solid #E5E5E5'
          }}
        >
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--font-size-h4)',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--foreground)',
            lineHeight: 'var(--line-height-heading)'
          }}>
            ¿Por qué publicar en CompraTuParcela?
          </h2>
          <div className="space-y-3">
            {[
              'Llega a compradores realmente interesados en parcelas',
              'Publicación simple y rápida, sin complicaciones',
              'Gestiona tus consultas desde un solo lugar',
              'Tienes control total sobre tu publicación'
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <div 
                  className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: '#006B4E' }}
                />
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  color: '#525252',
                  lineHeight: 'var(--line-height-body)'
                }}>
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    );
  }

  // With Listings
  return (
    <main className="px-6 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--font-size-h2)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)',
              lineHeight: 'var(--line-height-heading)'
            }}>
              Mis publicaciones
            </h1>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-sm)',
              color: '#737373',
              lineHeight: 'var(--line-height-body)'
            }}>
              Administra todas tus parcelas publicadas
            </p>
          </div>
          <button
            onClick={() => setShowNewListingFlow(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 transition-all"
            style={{
              backgroundColor: '#006B4E',
              color: '#FFFFFF',
              borderRadius: '200px',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-sm)',
              fontWeight: 'var(--font-weight-medium)',
              letterSpacing: 'var(--letter-spacing-wide)',
              lineHeight: 'var(--line-height-ui)',
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0D3640';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#006B4E';
            }}
          >
            <Plus className="w-4 h-4" />
            Nueva publicación
          </button>
        </div>
      </div>

      {/* Listed Property */}
      <section className="space-y-4">
        <div 
          className="p-6 space-y-5 rounded-2xl transition-all"
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E5E5',
            boxShadow: '0 4px 12px 0 rgba(18, 72, 84, 0.08)'
          }}
        >
          <div className="flex gap-5">
            {/* Imagen */}
            <div 
              className="w-36 h-36 flex-shrink-0 rounded-xl overflow-hidden"
              style={{
                backgroundColor: '#F5F5F5',
                border: '1px solid #E5E5E5'
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1764222233275-87dc016c11dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmQlMjBwcm9wZXJ0eSUyMGFlcmlhbCUyMHZpZXd8ZW58MXx8fHwxNzY5NzAyMTA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Parcela Vista Cordillera"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Contenido */}
            <div className="flex-1 space-y-4">
              {/* Título y ubicación */}
              <div className="space-y-1">
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h4)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--foreground)',
                  lineHeight: 'var(--line-height-heading)'
                }}>
                  Parcela Vista Cordillera
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  color: '#737373',
                  lineHeight: 'var(--line-height-ui)'
                }}>
                  San José de Maipo, Región Metropolitana
                </p>
              </div>

              {/* Detalles */}
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    color: '#737373',
                    lineHeight: 'var(--line-height-ui)'
                  }}>
                    Tamaño:
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--foreground)',
                    lineHeight: 'var(--line-height-ui)'
                  }}>
                    8.500 m²
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    color: '#737373',
                    lineHeight: 'var(--line-height-ui)'
                  }}>
                    Precio:
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--foreground)',
                    lineHeight: 'var(--line-height-ui)'
                  }}>
                    $78.000.000
                  </span>
                </div>
              </div>

              {/* Estados y métricas */}
              <div className="flex items-center gap-2">
                <span 
                  className="inline-flex items-center px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: '#DCFCE7',
                    border: '1px solid #86EFAC',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: '#166534',
                    letterSpacing: 'var(--letter-spacing-wide)',
                    lineHeight: 'var(--line-height-ui)',
                    textTransform: 'uppercase'
                  }}
                >
                  Publicada
                </span>
                <span 
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: '#F5F5F5',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#525252',
                    lineHeight: 'var(--line-height-ui)'
                  }}
                >
                  <Eye className="w-3 h-3" />
                  247 vistas
                </span>
                <span 
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: '#F5F5F5',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#525252',
                    lineHeight: 'var(--line-height-ui)'
                  }}
                >
                  <MessageCircle className="w-3 h-3" />
                  2 consultas
                </span>
              </div>
            </div>
          </div>

          {/* Acciones */}
          <div 
            className="flex gap-3 pt-5"
            style={{ borderTop: '1px solid #F5F5F5' }}
          >
            <button 
              onClick={() => onNavigate('parcela-detalle', 1)}
              className="flex-1 px-5 py-2.5 transition-all"
              style={{
                backgroundColor: '#111',
                color: '#FFFFFF',
                borderRadius: '200px',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                fontWeight: 'var(--font-weight-medium)',
                letterSpacing: 'var(--letter-spacing-wide)',
                lineHeight: 'var(--line-height-ui)',
                border: 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#6B6B6B';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#111';
              }}
            >
              <Eye className="w-4 h-4 inline-block mr-2" />
              Ver publicación
            </button>
            <button 
              className="flex-1 px-5 py-2.5 transition-all"
              style={{
                backgroundColor: '#FFFFFF',
                color: 'var(--foreground)',
                border: '1px solid #DEDEDE',
                borderRadius: '200px',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                fontWeight: 'var(--font-weight-medium)',
                letterSpacing: 'var(--letter-spacing-wide)',
                lineHeight: 'var(--line-height-ui)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FAFAFA';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
              }}
            >
              <Edit className="w-4 h-4 inline-block mr-2" />
              Editar
            </button>
            <button 
              className="flex-1 px-5 py-2.5 transition-all"
              style={{
                backgroundColor: '#FFFFFF',
                color: 'var(--foreground)',
                border: '1px solid #DEDEDE',
                borderRadius: '200px',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                fontWeight: 'var(--font-weight-medium)',
                letterSpacing: 'var(--letter-spacing-wide)',
                lineHeight: 'var(--line-height-ui)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FAFAFA';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
              }}
            >
              Pausar
            </button>
          </div>
        </div>
      </section>

      {/* CTA for another listing */}
      <section 
        className="p-8 text-center space-y-4 rounded-2xl"
        style={{
          backgroundColor: '#FAFAFA',
          border: '2px dashed #DEDEDE'
        }}
      >
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-body-base)',
          fontWeight: 'var(--font-weight-medium)',
          color: '#525252',
          lineHeight: 'var(--line-height-body)'
        }}>
          ¿Tenés otra parcela para publicar?
        </p>
        <button
          onClick={() => setShowNewListingFlow(true)}
          className="inline-flex items-center gap-2 px-6 py-3 transition-all"
          style={{
            backgroundColor: '#FFFFFF',
            color: 'var(--foreground)',
            border: '2px solid #111',
            borderRadius: '200px',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-sm)',
            fontWeight: 'var(--font-weight-medium)',
            letterSpacing: 'var(--letter-spacing-wide)',
            lineHeight: 'var(--line-height-ui)',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#111';
            e.currentTarget.style.color = '#FFFFFF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#FFFFFF';
            e.currentTarget.style.color = 'var(--foreground)';
          }}
        >
          <Plus className="w-4 h-4" />
          Publicar otra parcela
        </button>
      </section>

      {/* Info Box */}
      <section 
        className="p-6 space-y-4 rounded-2xl"
        style={{
          backgroundColor: '#FAFAFA',
          border: '1px solid #E5E5E5'
        }}
      >
        <div className="flex items-start gap-3">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: '#F5F5F5' }}
          >
            <Info className="w-5 h-5" style={{ color: '#737373' }} />
          </div>
          <div className="flex-1 space-y-4">
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--font-size-h4)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--foreground)',
              lineHeight: 'var(--line-height-heading)'
            }}>
              Consejos para una buena publicación
            </h2>
            <div className="space-y-3">
              {[
                'Usa fotos de buena calidad y bien iluminadas',
                'Describe con detalle las características más importantes',
                'Sé claro y honesto con la información',
                'Responde rápido a las consultas que recibas'
              ].map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div 
                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: '#111' }}
                  />
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    color: '#525252',
                    lineHeight: 'var(--line-height-body)'
                  }}>
                    {tip}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function SavedContent() {
  return (
    <main className="px-6 py-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
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
            Parcelas guardadas
          </h1>
          <span 
            className="bg-gray-100 px-4 py-1.5 rounded-[100px]"
            style={{ 
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 'var(--font-weight-medium)',
              color: '#0A0A0A',
              lineHeight: 'var(--line-height-body)'
            }}
          >
            5
          </span>
        </div>
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
          Todas tus parcelas favoritas en un solo lugar
        </p>
      </div>

      {/* Saved Properties - With Data */}
      <section className="space-y-4">
        {/* Property 1 */}
        <div 
          className="bg-white p-6 rounded-[16px] cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
          style={{
            border: '2px solid #E5E5E5',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(100, 126, 63, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)';
          }}
        >
          <div className="flex gap-5">
            <div className="w-40 h-40 bg-gray-100 flex-shrink-0 rounded-[12px] overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1764222233275-87dc016c11dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmQlMjBwcm9wZXJ0eSUyMGFlcmlhbHxlbnwxfHx8fDE3NzAxMzMyOTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Parcela Vista al Valle"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-lg)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    Parcela Vista al Valle
                  </h3>
                  <p 
                    className="mt-1"
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 'var(--font-weight-regular)',
                      color: '#6B6B6B',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    Sector Los Aromos, Región Metropolitana
                  </p>
                </div>
                <button className="p-2 hover:bg-gray-50 rounded-[8px] transition-colors">
                  <svg className="w-6 h-6 text-red-600 fill-current" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </button>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#462611',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    Tamaño:
                  </span>
                  <span 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 'var(--font-weight-regular)',
                      color: '#6B6B6B',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    5.000 m²
                  </span>
                </div>
                <span className="text-gray-300">•</span>
                <div className="flex items-center gap-2">
                  <span 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#462611',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    Precio:
                  </span>
                  <span 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 'var(--font-weight-regular)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    $45.000.000
                  </span>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button 
                  className="flex-1 text-white py-3 px-6 rounded-[200px]"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: 'var(--font-weight-medium)',
                    lineHeight: 'var(--line-height-body)',
                    backgroundColor: '#006B4E',
                    transition: 'background-color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0D3640'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
                >
                  Ver detalles
                </button>
                <button 
                  className="flex-1 bg-white text-black py-3 px-6 border-2 rounded-[200px]"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: 'var(--font-weight-medium)',
                    lineHeight: 'var(--line-height-body)',
                    color: '#0A0A0A',
                    borderColor: '#E5E5E5',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(100, 126, 63, 0.08)';
                    e.currentTarget.style.borderColor = '#647E3F';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.borderColor = '#E5E5E5';
                  }}
                >
                  Agregar a comparación
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Property 2 */}
        <div 
          className="bg-white p-6 rounded-[16px] cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
          style={{
            border: '2px solid #E5E5E5',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(100, 126, 63, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)';
          }}
        >
          <div className="flex gap-5">
            <div className="w-40 h-40 bg-gray-100 flex-shrink-0 rounded-[12px] overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1762110341498-59a612f1bddb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXJhbCUyMHByb3BlcnR5JTIwdGVycmFpbiUyMGhpbGxzfGVufDF8fHx8MTc3MDEzMzI5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Parcela El Bosque"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-lg)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    Parcela El Bosque
                  </h3>
                  <p 
                    className="mt-1"
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 'var(--font-weight-regular)',
                      color: '#6B6B6B',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    Sector Piedra Roja, Colina
                  </p>
                </div>
                <button className="p-2 hover:bg-gray-50 rounded-[8px] transition-colors">
                  <svg className="w-6 h-6 text-red-600 fill-current" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </button>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#462611',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    Tamaño:
                  </span>
                  <span 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 'var(--font-weight-regular)',
                      color: '#6B6B6B',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    8.500 m²
                  </span>
                </div>
                <span className="text-gray-300">•</span>
                <div className="flex items-center gap-2">
                  <span 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#462611',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    Precio:
                  </span>
                  <span 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 'var(--font-weight-regular)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    $62.000.000
                  </span>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button 
                  className="flex-1 text-white py-3 px-6 rounded-[200px]"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: 'var(--font-weight-medium)',
                    lineHeight: 'var(--line-height-body)',
                    backgroundColor: '#006B4E',
                    transition: 'background-color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0D3640'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
                >
                  Ver detalles
                </button>
                <button 
                  className="flex-1 bg-white text-black py-3 px-6 border-2 rounded-[200px]"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: 'var(--font-weight-medium)',
                    lineHeight: 'var(--line-height-body)',
                    color: '#0A0A0A',
                    borderColor: '#E5E5E5',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(100, 126, 63, 0.08)';
                    e.currentTarget.style.borderColor = '#647E3F';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.borderColor = '#E5E5E5';
                  }}
                >
                  Agregar a comparación
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Property 3 */}
        <div 
          className="bg-white p-6 rounded-[16px] cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
          style={{
            border: '2px solid #E5E5E5',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(100, 126, 63, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)';
          }}
        >
          <div className="flex gap-5">
            <div className="w-40 h-40 bg-gray-100 flex-shrink-0 rounded-[12px] overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1763397929062-eb0582008877?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjBsYW5kJTIwZ3JlZW4lMjBmaWVsZHN8ZW58MXx8fHwxNzcwMTMzMjk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Parcela Los Robles"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-lg)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    Parcela Los Robles
                  </h3>
                  <p 
                    className="mt-1"
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 'var(--font-weight-regular)',
                      color: '#6B6B6B',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    Chicureo, Región Metropolitana
                  </p>
                </div>
                <button className="p-2 hover:bg-gray-50 rounded-[8px] transition-colors">
                  <svg className="w-6 h-6 text-red-600 fill-current" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </button>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#462611',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    Tamaño:
                  </span>
                  <span 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 'var(--font-weight-regular)',
                      color: '#6B6B6B',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    3.200 m²
                  </span>
                </div>
                <span className="text-gray-300">•</span>
                <div className="flex items-center gap-2">
                  <span 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#462611',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    Precio:
                  </span>
                  <span 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 'var(--font-weight-regular)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    $38.500.000
                  </span>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button 
                  className="flex-1 text-white py-3 px-6 rounded-[200px]"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: 'var(--font-weight-medium)',
                    lineHeight: 'var(--line-height-body)',
                    backgroundColor: '#006B4E',
                    transition: 'background-color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0D3640'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
                >
                  Ver detalles
                </button>
                <button 
                  className="flex-1 bg-white text-black py-3 px-6 border-2 rounded-[200px]"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: 'var(--font-weight-medium)',
                    lineHeight: 'var(--line-height-body)',
                    color: '#0A0A0A',
                    borderColor: '#E5E5E5',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(100, 126, 63, 0.08)';
                    e.currentTarget.style.borderColor = '#647E3F';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.borderColor = '#E5E5E5';
                  }}
                >
                  Agregar a comparación
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Property 4 */}
        <div 
          className="bg-white p-6 rounded-[16px] cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
          style={{
            border: '2px solid #E5E5E5',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(100, 126, 63, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)';
          }}
        >
          <div className="flex gap-5">
            <div className="w-40 h-40 bg-gray-100 flex-shrink-0 rounded-[12px] overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1557275134-5a789e9607be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBwcm9wZXJ0eSUyMGxhbmQlMjB0cmVlc3xlbnwxfHx8fDE3NzAxMzMyOTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Terreno Agrícola Las Vertientes"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-lg)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    Terreno Agrícola Las Vertientes
                  </h3>
                  <p 
                    className="mt-1"
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 'var(--font-weight-regular)',
                      color: '#6B6B6B',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    Pirque, Región Metropolitana
                  </p>
                </div>
                <button className="p-2 hover:bg-gray-50 rounded-[8px] transition-colors">
                  <svg className="w-6 h-6 text-red-600 fill-current" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </button>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#462611',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    Tamaño:
                  </span>
                  <span 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 'var(--font-weight-regular)',
                      color: '#6B6B6B',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    18.000 m²
                  </span>
                </div>
                <span className="text-gray-300">•</span>
                <div className="flex items-center gap-2">
                  <span 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#462611',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    Precio:
                  </span>
                  <span 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 'var(--font-weight-regular)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    $95.000.000
                  </span>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button 
                  className="flex-1 text-white py-3 px-6 rounded-[200px]"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: 'var(--font-weight-medium)',
                    lineHeight: 'var(--line-height-body)',
                    backgroundColor: '#006B4E',
                    transition: 'background-color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0D3640'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
                >
                  Ver detalles
                </button>
                <button 
                  className="flex-1 bg-white text-black py-3 px-6 border-2 rounded-[200px]"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: 'var(--font-weight-medium)',
                    lineHeight: 'var(--line-height-body)',
                    color: '#0A0A0A',
                    borderColor: '#E5E5E5',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(100, 126, 63, 0.08)';
                    e.currentTarget.style.borderColor = '#647E3F';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.borderColor = '#E5E5E5';
                  }}
                >
                  Agregar a comparación
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Property 5 */}
        <div 
          className="bg-white p-6 rounded-[16px] cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
          style={{
            border: '2px solid #E5E5E5',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(100, 126, 63, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)';
          }}
        >
          <div className="flex gap-5">
            <div className="w-40 h-40 bg-gray-100 flex-shrink-0 rounded-[12px] overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1694617447949-ce9399009bc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YWxsZXklMjBtZWFkb3clMjBsYW5kJTIwcHJvcGVydHl8ZW58MXx8fHwxNzcwMTMzNDY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Parcela El Manzano"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-lg)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    Parcela El Manzano
                  </h3>
                  <p 
                    className="mt-1"
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 'var(--font-weight-regular)',
                      color: '#6B6B6B',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    Lampa, Región Metropolitana
                  </p>
                </div>
                <button className="p-2 hover:bg-gray-50 rounded-[8px] transition-colors">
                  <svg className="w-6 h-6 text-red-600 fill-current" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </button>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#462611',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    Tamaño:
                  </span>
                  <span 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 'var(--font-weight-regular)',
                      color: '#6B6B6B',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    4.800 m²
                  </span>
                </div>
                <span className="text-gray-300">•</span>
                <div className="flex items-center gap-2">
                  <span 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#462611',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    Precio:
                  </span>
                  <span 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 'var(--font-weight-regular)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    $52.000.000
                  </span>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button 
                  className="flex-1 text-white py-3 px-6 rounded-[200px]"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: 'var(--font-weight-medium)',
                    lineHeight: 'var(--line-height-body)',
                    backgroundColor: '#006B4E',
                    transition: 'background-color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0D3640'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
                >
                  Ver detalles
                </button>
                <button 
                  className="flex-1 bg-white text-black py-3 px-6 border-2 rounded-[200px]"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: 'var(--font-weight-medium)',
                    lineHeight: 'var(--line-height-body)',
                    color: '#0A0A0A',
                    borderColor: '#E5E5E5',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(100, 126, 63, 0.08)';
                    e.currentTarget.style.borderColor = '#647E3F';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.borderColor = '#E5E5E5';
                  }}
                >
                  Agregar a comparación
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 border-2 border-gray-200 p-8 text-center space-y-4 rounded-[16px]">
        <p 
          style={{ 
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-base)',
            fontWeight: 'var(--font-weight-medium)',
            color: '#0A0A0A',
            lineHeight: 'var(--line-height-body)'
          }}
        >
          ¿Quieres comparar estas parcelas?
        </p>
        <button 
          style={{
            backgroundColor: '#006B4E',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-base)',
            fontWeight: 'var(--font-weight-medium)',
            lineHeight: 'var(--line-height-body)'
          }}
          className="text-white py-3.5 px-8 rounded-[200px] transition-colors"
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0D3640'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
        >
          Comparar guardadas
        </button>
      </section>
    </main>
  );
}

function CompareContent() {
  return (
    <main className="px-6 py-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
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
            Comparar parcelas
          </h1>
          <span 
            className="bg-gray-100 px-4 py-1.5 rounded-[100px]"
            style={{ 
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 'var(--font-weight-medium)',
              color: '#0A0A0A',
              lineHeight: 'var(--line-height-body)'
            }}
          >
            3 en comparación
          </span>
        </div>
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
          Compara características para tomar la mejor decisión
        </p>
      </div>

      {/* Comparison Table */}
      <section className="bg-white border-2 border-gray-200 rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
        <div className="overflow-x-auto">
          <div className="min-w-max">
            <div className="grid grid-cols-4 border-b-2 border-gray-200 bg-gray-50">
              <div className="border-r-2 border-gray-200 p-5">
                <span 
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-base)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  Característica
                </span>
              </div>
              <div className="border-r-2 border-gray-200 p-5 space-y-3">
                <div className="w-full h-28 bg-gray-100 rounded-[12px] overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1764222233275-87dc016c11dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmQlMjBwcm9wZXJ0eSUyMGFlcmlhbHxlbnwxfHx8fDE3NzAxMzMyOTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Parcela Vista al Valle"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div 
                  className="text-center"
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-base)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  Parcela Vista al Valle
                </div>
                <div 
                  className="text-center"
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: 'var(--font-weight-regular)',
                    color: '#6B6B6B',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  Los Aromos, RM
                </div>
              </div>
              <div className="border-r-2 border-gray-200 p-5 space-y-3">
                <div className="w-full h-28 bg-gray-100 rounded-[12px] overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1762110341498-59a612f1bddb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXJhbCUyMHByb3BlcnR5JTIwdGVycmFpbiUyMGhpbGxzfGVufDF8fHx8MTc3MDEzMzI5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Parcela El Bosque"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div 
                  className="text-center"
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-base)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  Parcela El Bosque
                </div>
                <div 
                  className="text-center"
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: 'var(--font-weight-regular)',
                    color: '#6B6B6B',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  Piedra Roja, Colina
                </div>
              </div>
              <div className="p-5 space-y-3">
                <div className="w-full h-28 bg-gray-100 rounded-[12px] overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1763397929062-eb0582008877?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjBsYW5kJTIwZ3JlZW4lMjBmaWVsZHN8ZW58MXx8fHwxNzcwMTMzMjk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Parcela Los Robles"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div 
                  className="text-center"
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-base)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  Parcela Los Robles
                </div>
                <div 
                  className="text-center"
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: 'var(--font-weight-regular)',
                    color: '#6B6B6B',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  Chicureo, RM
                </div>
              </div>
            </div>

          {/* Price */}
          <div className="grid grid-cols-4 border-b-2 border-gray-200 bg-white">
            <div className="border-r-2 border-gray-200 p-5">
              <span 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                Precio
              </span>
            </div>
            <div className="border-r-2 border-gray-200 p-5 text-center">
              <span 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-h3)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-heading)'
                }}
              >
                $45.000.000
              </span>
            </div>
            <div className="border-r-2 border-gray-200 p-5 text-center">
              <span 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-h3)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-heading)'
                }}
              >
                $62.000.000
              </span>
            </div>
            <div className="p-5 text-center">
              <span 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-h3)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-heading)'
                }}
              >
                $38.500.000
              </span>
              <div className="mt-2">
                <span 
                  className="bg-green-100 text-green-800 px-3 py-1.5 rounded-[100px]"
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    fontWeight: 'var(--font-weight-medium)',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  Mejor precio
                </span>
              </div>
            </div>
          </div>

          {/* Size */}
          <div className="grid grid-cols-4 border-b-2 border-gray-200 bg-gray-50">
            <div className="border-r-2 border-gray-200 p-5">
              <span 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                Tamaño
              </span>
            </div>
            <div className="border-r-2 border-gray-200 p-5 text-center">
              <span 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                5.000 m²
              </span>
            </div>
            <div className="border-r-2 border-gray-200 p-5 text-center">
              <div 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                8.500 m²
              </div>
              <div className="mt-2">
                <span 
                  className="bg-emerald-100 text-emerald-900 px-3 py-1.5 rounded-[100px]"
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    fontWeight: 'var(--font-weight-medium)',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  Más grande
                </span>
              </div>
            </div>
            <div className="p-5 text-center">
              <span 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                3.200 m²
              </span>
            </div>
          </div>

          {/* Price per m² */}
          <div className="grid grid-cols-4 border-b-2 border-gray-200 bg-white">
            <div className="border-r-2 border-gray-200 p-5">
              <span 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                Precio por m²
              </span>
            </div>
            <div className="border-r-2 border-gray-200 p-5 text-center">
              <span 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                $9.000/m²
              </span>
            </div>
            <div className="border-r-2 border-gray-200 p-5 text-center">
              <div 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                $7.294/m²
              </div>
              <div className="mt-2">
                <span 
                  className="bg-green-100 text-green-800 px-3 py-1.5 rounded-[100px]"
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    fontWeight: 'var(--font-weight-medium)',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  Mejor valor
                </span>
              </div>
            </div>
            <div className="p-5 text-center">
              <span 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                $12.031/m²
              </span>
            </div>
          </div>

          {/* Water */}
          <div className="grid grid-cols-4 border-b-2 border-gray-200 bg-gray-50">
            <div className="border-r-2 border-gray-200 p-5">
              <span 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                Agua
              </span>
            </div>
            <div className="border-r-2 border-gray-200 p-5 text-center">
              <span 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                Pozo profundo
              </span>
            </div>
            <div className="border-r-2 border-gray-200 p-5 text-center">
              <div 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                Red pública
              </div>
              <div className="mt-2">
                <span 
                  className="bg-emerald-100 text-emerald-900 px-3 py-1.5 rounded-[100px]"
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    fontWeight: 'var(--font-weight-medium)',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  Ventaja
                </span>
              </div>
            </div>
            <div className="p-5 text-center">
              <span 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                Pozo profundo
              </span>
            </div>
          </div>

          {/* Electricity */}
          <div className="grid grid-cols-4 border-b-2 border-gray-200 bg-white">
            <div className="border-r-2 border-gray-200 p-5">
              <span 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                Electricidad
              </span>
            </div>
            <div className="border-r-2 border-gray-200 p-5 text-center">
              <span 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                ✓ Disponible
              </span>
            </div>
            <div className="border-r-2 border-gray-200 p-5 text-center">
              <span 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                ✓ Disponible
              </span>
            </div>
            <div className="p-5 text-center">
              <span 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                ✓ Disponible
              </span>
            </div>
          </div>

          {/* Access */}
          <div className="grid grid-cols-4 border-b-2 border-gray-200 bg-gray-50">
            <div className="border-r-2 border-gray-200 p-5">
              <span 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                Acceso
              </span>
            </div>
            <div className="border-r-2 border-gray-200 p-5 text-center">
              <div 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                Camino pavimentado
              </div>
              <div className="mt-2">
                <span 
                  className="bg-emerald-100 text-emerald-900 px-3 py-1.5 rounded-[100px]"
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    fontWeight: 'var(--font-weight-medium)',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  Ventaja
                </span>
              </div>
            </div>
            <div className="border-r-2 border-gray-200 p-5 text-center">
              <span 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                Camino ripiado
              </span>
            </div>
            <div className="p-5 text-center">
              <div 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                Camino pavimentado
              </div>
              <div className="mt-2">
                <span 
                  className="bg-emerald-100 text-emerald-900 px-3 py-1.5 rounded-[100px]"
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    fontWeight: 'var(--font-weight-medium)',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  Ventaja
                </span>
              </div>
            </div>
          </div>

          {/* Topography */}
          <div className="grid grid-cols-4 border-b-2 border-gray-200 bg-white">
            <div className="border-r-2 border-gray-200 p-5">
              <span 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                Topografía
              </span>
            </div>
            <div className="border-r-2 border-gray-200 p-5 text-center">
              <span 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                Plana
              </span>
            </div>
            <div className="border-r-2 border-gray-200 p-5 text-center">
              <span 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                Semi-plana
              </span>
            </div>
            <div className="p-5 text-center">
              <span 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                Irregular
              </span>
            </div>
          </div>

          {/* Distance */}
          <div className="grid grid-cols-4 border-b-2 border-gray-200 bg-gray-50">
            <div className="border-r-2 border-gray-200 p-5">
              <span 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                Distancia a Santiago
              </span>
            </div>
            <div className="border-r-2 border-gray-200 p-5 text-center">
              <span 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                35 km
              </span>
            </div>
            <div className="border-r-2 border-gray-200 p-5 text-center">
              <span 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                42 km
              </span>
            </div>
            <div className="p-5 text-center">
              <div 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                28 km
              </div>
              <div className="mt-2">
                <span 
                  className="bg-green-100 text-green-800 px-3 py-1.5 rounded-[100px]"
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    fontWeight: 'var(--font-weight-medium)',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  Más cerca
                </span>
              </div>
            </div>
          </div>

          {/* Documentation */}
          <div className="grid grid-cols-4 border-b-2 border-gray-200 bg-white">
            <div className="border-r-2 border-gray-200 p-5">
              <span 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                Documentación
              </span>
            </div>
            <div className="border-r-2 border-gray-200 p-5 text-center">
              <span 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                Al día
              </span>
            </div>
            <div className="border-r-2 border-gray-200 p-5 text-center">
              <span 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                Al día
              </span>
            </div>
            <div className="p-5 text-center">
              <span 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                Al día
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-4 bg-gray-50">
            <div className="border-r-2 border-gray-200 p-5">
              <span 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                Acciones
              </span>
            </div>
            <div className="border-r-2 border-gray-200 p-5 space-y-3">
              <button 
                style={{
                  backgroundColor: '#006B4E',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 'var(--font-weight-medium)',
                  lineHeight: 'var(--line-height-body)'
                }}
                className="w-full text-white py-3 px-6 rounded-[200px] transition-colors"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0D3640'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
              >
                Ver detalles
              </button>
              <button 
                className="w-full bg-white hover:bg-gray-50 text-black py-3 px-6 border-2 border-gray-200 hover:border-gray-300 rounded-[200px] transition-colors"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 'var(--font-weight-medium)',
                  lineHeight: 'var(--line-height-body)',
                  color: '#0A0A0A'
                }}
              >
                Quitar
              </button>
            </div>
            <div className="border-r-2 border-gray-200 p-5 space-y-3">
              <button 
                style={{
                  backgroundColor: '#006B4E',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 'var(--font-weight-medium)',
                  lineHeight: 'var(--line-height-body)'
                }}
                className="w-full text-white py-3 px-6 rounded-[200px] transition-colors"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0D3640'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
              >
                Ver detalles
              </button>
              <button 
                className="w-full bg-white hover:bg-gray-50 text-black py-3 px-6 border-2 border-gray-200 hover:border-gray-300 rounded-[200px] transition-colors"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 'var(--font-weight-medium)',
                  lineHeight: 'var(--line-height-body)',
                  color: '#0A0A0A'
                }}
              >
                Quitar
              </button>
            </div>
            <div className="p-5 space-y-3">
              <button 
                style={{
                  backgroundColor: '#006B4E',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 'var(--font-weight-medium)',
                  lineHeight: 'var(--line-height-body)'
                }}
                className="w-full text-white py-3 px-6 rounded-[200px] transition-colors"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0D3640'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
              >
                Ver detalles
              </button>
              <button 
                className="w-full bg-white hover:bg-gray-50 text-black py-3 px-6 border-2 border-gray-200 hover:border-gray-300 rounded-[200px] transition-colors"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 'var(--font-weight-medium)',
                  lineHeight: 'var(--line-height-body)',
                  color: '#0A0A0A'
                }}
              >
                Quitar
              </button>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="bg-emerald-50 border-2 border-emerald-200 p-8 space-y-4 rounded-[24px]">
        <h2 
          style={{ 
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--font-size-h3)',
            fontWeight: 'var(--font-weight-medium)',
            color: '#0A0A0A',
            lineHeight: 'var(--line-height-heading)',
            letterSpacing: 'var(--letter-spacing-normal)'
          }}
        >
          Análisis de comparación
        </h2>
        <div className="space-y-3">
          <p 
            style={{ 
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-base)',
              fontWeight: 'var(--font-weight-regular)',
              color: '#0A0A0A',
              lineHeight: 'var(--line-height-body)'
            }}
          >
            • <strong style={{ fontWeight: 'var(--font-weight-medium)' }}>Mejor precio total:</strong> Parcela Los Robles ($38.500.000)
          </p>
          <p 
            style={{ 
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-base)',
              fontWeight: 'var(--font-weight-regular)',
              color: '#0A0A0A',
              lineHeight: 'var(--line-height-body)'
            }}
          >
            • <strong style={{ fontWeight: 'var(--font-weight-medium)' }}>Mejor valor por m²:</strong> Parcela El Bosque ($7.294/m²)
          </p>
          <p 
            style={{ 
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-base)',
              fontWeight: 'var(--font-weight-regular)',
              color: '#0A0A0A',
              lineHeight: 'var(--line-height-body)'
            }}
          >
            • <strong style={{ fontWeight: 'var(--font-weight-medium)' }}>Más grande:</strong> Parcela El Bosque (8.500 m²)
          </p>
          <p 
            style={{ 
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-base)',
              fontWeight: 'var(--font-weight-regular)',
              color: '#0A0A0A',
              lineHeight: 'var(--line-height-body)'
            }}
          >
            • <strong style={{ fontWeight: 'var(--font-weight-medium)' }}>Más cerca de Santiago:</strong> Parcela Los Robles (28 km)
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white border-2 border-gray-200 p-8 space-y-5 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
        <h2 
          style={{ 
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--font-size-h3)',
            fontWeight: 'var(--font-weight-medium)',
            color: '#0A0A0A',
            lineHeight: 'var(--line-height-heading)',
            letterSpacing: 'var(--letter-spacing-normal)'
          }}
        >
          ¿Ya elegiste tu favorita?
        </h2>
        <div className="flex gap-4">
          <button 
            className="flex-1 bg-white hover:bg-gray-50 text-black py-3.5 px-8 border-2 border-gray-200 hover:border-gray-300 rounded-[200px] transition-colors"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-base)',
              fontWeight: 'var(--font-weight-medium)',
              lineHeight: 'var(--line-height-body)',
              color: '#0A0A0A'
            }}
          >
            Agregar más parcelas
          </button>
          <button 
            style={{
              backgroundColor: '#006B4E',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-base)',
              fontWeight: 'var(--font-weight-medium)',
              lineHeight: 'var(--line-height-body)'
            }}
            className="flex-1 text-white py-3.5 px-8 rounded-[200px] transition-colors"
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0D3640'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
          >
            Contactar vendedores
          </button>
        </div>
      </section>
    </main>
  );
}

function MyPurchasesContent() {
  const compras = [
    {
      id: 1,
      nombre: 'Parcela Vista al Valle',
      ubicacion: 'Pirque, Región Metropolitana',
      superficie: '5.000 m²',
      fechaCompra: '12 Mar 2026',
      precioTotal: 85000000,
      estado: 'en-proceso',
      etapaActual: 'Documentación',
      cuotasPagadas: 3,
      cuotasTotales: 12,
      proximaCuota: '15 Abr 2026',
      imagen: 'https://images.unsplash.com/photo-1765574780421-451d6b943191?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXJhbCUyMGxhbmQlMjB2YWxsZXklMjBjaGlsZSUyMGNvdW50cnlzaWRlfGVufDF8fHx8MTc2OTc5MjgzMHww&ixlib=rb-4.1.0&q=80&w=1080',
      documentos: [
        { nombre: 'Contrato de compraventa', estado: 'completado' },
        { nombre: 'Escritura', estado: 'en-proceso' },
        { nombre: 'Comprobante de pago inicial', estado: 'completado' }
      ]
    },
    {
      id: 2,
      nombre: 'Parcela Bosque del Sur',
      ubicacion: 'Cabrero, Región del Biobío',
      superficie: '7.200 m²',
      fechaCompra: '28 Ene 2026',
      precioTotal: 62000000,
      estado: 'completado',
      etapaActual: 'Escritura firmada',
      cuotasPagadas: 12,
      cuotasTotales: 12,
      proximaCuota: null,
      imagen: 'https://images.unsplash.com/photo-1761786271694-66020392b461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGZvcmVzdCUyMHByb3BlcnR5JTIwYWVyaWFsfGVufDF8fHx8MTc2OTc5MjgzM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      documentos: [
        { nombre: 'Contrato de compraventa', estado: 'completado' },
        { nombre: 'Escritura', estado: 'completado' },
        { nombre: 'Comprobante de pago final', estado: 'completado' }
      ]
    }
  ];

  return (
    <main className="px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 style={{ 
          fontFamily: 'var(--font-heading)',
          fontWeight: 'var(--font-weight-regular)',
          fontSize: 'var(--font-size-h2)',
          lineHeight: 'var(--line-height-heading)',
          color: '#0A0A0A'
        }}>
          Mis compras
        </h1>
        <p style={{ 
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-body-base)',
          color: '#737373',
          marginTop: '8px'
        }}>
          Revisa el estado de tus parcelas adquiridas, pagos y documentación
        </p>
      </div>

      {/* Lista de compras */}
      <div className="space-y-6">
        {compras.map((compra) => (
          <section 
            key={compra.id}
            className="rounded-2xl p-6 space-y-6" 
            style={{ 
              backgroundColor: '#FFFFFF', 
              border: '1px solid #E5E5E5',
              boxShadow: '0 4px 12px 0 rgba(18, 72, 84, 0.08)'
            }}
          >
            {/* Property Header */}
            <div className="flex gap-6">
              <div 
                className="rounded-xl flex-shrink-0 overflow-hidden" 
                style={{ 
                  width: '160px', 
                  height: '160px'
                }}
              >
                <ImageWithFallback 
                  src={compra.imagen}
                  alt={compra.nombre}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 style={{ 
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-h3)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-heading)',
                      marginBottom: '6px'
                    }}>
                      {compra.nombre}
                    </h2>
                    <p style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#737373'
                    }}>
                      {compra.ubicacion}
                    </p>
                  </div>
                  <div 
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full" 
                    style={{ 
                      backgroundColor: compra.estado === 'completado' ? 'rgba(100, 126, 63, 0.1)' : '#FFFBEB'
                    }}
                  >
                    <span style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-xs)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: compra.estado === 'completado' ? '#647E3F' : '#CA8A04',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      {compra.estado === 'completado' ? 'Completado' : 'En proceso'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#F5F5F5' }}>
                      <svg className="w-5 h-5" fill="none" stroke="#0A0A0A" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </div>
                    <div>
                      <div style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-xs)',
                        color: '#737373',
                        marginBottom: '2px'
                      }}>
                        Superficie
                      </div>
                      <div style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: '#0A0A0A'
                      }}>
                        {compra.superficie}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#F5F5F5' }}>
                      <svg className="w-5 h-5" fill="none" stroke="#0A0A0A" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-xs)',
                        color: '#737373',
                        marginBottom: '2px'
                      }}>
                        Fecha de compra
                      </div>
                      <div style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: '#0A0A0A'
                      }}>
                        {compra.fechaCompra}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Estado del proceso */}
            <div 
              className="rounded-xl p-5" 
              style={{ 
                backgroundColor: '#FAFAFA', 
                border: '1px solid #E5E5E5' 
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: '#0A0A0A'
                }}>
                  Estado del proceso
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ 
                    backgroundColor: compra.estado === 'completado' ? '#647E3F' : '#CA8A04' 
                  }}
                />
                <span style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  color: '#737373'
                }}>
                  Etapa actual: <span style={{ fontWeight: 'var(--font-weight-semibold)', color: '#0A0A0A' }}>{compra.etapaActual}</span>
                </span>
              </div>
              {compra.estado === 'en-proceso' && (
                <p style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-xs)',
                  color: '#737373',
                  marginTop: '12px',
                  paddingLeft: '20px'
                }}>
                  Los documentos están siendo preparados. Te notificaremos cuando estén listos.
                </p>
              )}
            </div>

            {/* Información de pagos */}
            <div 
              className="rounded-xl p-5 space-y-5" 
              style={{ 
                backgroundColor: '#FAFAFA', 
                border: '1px solid #E5E5E5' 
              }}
            >
              <h3 style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                fontWeight: 'var(--font-weight-semibold)',
                color: '#0A0A0A'
              }}>
                Información de pagos
              </h3>
              <div className="grid grid-cols-4 gap-6">
                <div>
                  <div style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    color: '#737373',
                    marginBottom: '6px'
                  }}>
                    Precio total
                  </div>
                  <div style={{ 
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--font-size-h4)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: '#0A0A0A'
                  }}>
                    ${(compra.precioTotal / 1000000).toFixed(1)}M
                  </div>
                </div>
                <div>
                  <div style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    color: '#737373',
                    marginBottom: '6px'
                  }}>
                    Modalidad
                  </div>
                  <div style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    color: '#0A0A0A'
                  }}>
                    Pago en cuotas
                  </div>
                </div>
                <div>
                  <div style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    color: '#737373',
                    marginBottom: '6px'
                  }}>
                    Cuotas pagadas
                  </div>
                  <div style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    color: '#0A0A0A'
                  }}>
                    {compra.cuotasPagadas} de {compra.cuotasTotales}
                  </div>
                </div>
                <div>
                  <div style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    color: '#737373',
                    marginBottom: '6px'
                  }}>
                    Próxima cuota
                  </div>
                  <div style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    color: '#0A0A0A'
                  }}>
                    {compra.proximaCuota || '—'}
                  </div>
                </div>
              </div>
              <div 
                className="rounded-lg p-4 flex items-center gap-3" 
                style={{ 
                  backgroundColor: compra.estado === 'completado' ? 'rgba(100, 126, 63, 0.1)' : 'rgba(100, 126, 63, 0.1)',
                  border: `1px solid ${compra.estado === 'completado' ? 'rgba(100, 126, 63, 0.3)' : 'rgba(100, 126, 63, 0.3)'}`
                }}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="#647E3F" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: '#647E3F'
                }}>
                  Estado: {compra.estado === 'completado' ? 'Pagado completamente' : 'Al día'}
                </span>
              </div>
            </div>

            {/* Documentación */}
            <div 
              className="rounded-xl p-5 space-y-4" 
              style={{ 
                backgroundColor: '#FAFAFA', 
                border: '1px solid #E5E5E5' 
              }}
            >
              <h3 style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                fontWeight: 'var(--font-weight-semibold)',
                color: '#0A0A0A'
              }}>
                Documentación
              </h3>
              <div className="space-y-2">
                {compra.documentos.map((doc, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-lg" 
                    style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}
                  >
                    {doc.estado === 'completado' ? (
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="#647E3F" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="#CA8A04" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    <span style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#0A0A0A',
                      flex: '1'
                    }}>
                      {doc.nombre}
                      {doc.estado === 'en-proceso' && (
                        <span style={{ 
                          fontSize: 'var(--font-size-xs)', 
                          color: '#737373',
                          marginLeft: '8px'
                        }}>
                          (en preparación)
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <button 
                className="py-3 px-4 transition-all" 
                style={{ 
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
                Ver documentación
              </button>
              <button 
                className="py-3 px-4 transition-all" 
                style={{ 
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
                Ver pagos
              </button>
              <button 
                className="py-3 px-4 transition-all" 
                style={{ 
                  backgroundColor: '#111',
                  color: '#FFFFFF',
                  borderRadius: '200px',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  letterSpacing: 'var(--letter-spacing-wide)',
                  lineHeight: 'var(--line-height-ui)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#6B6B6B'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#111'; }}
              >
                Ver detalles
              </button>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

// Plan y límites Section Component
function PlanContent() {
  const maxPublications = 1;
  const currentPublications = 1;

  return (
    <main className="px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 style={{ 
          fontFamily: 'var(--font-heading)',
          fontWeight: 'var(--font-weight-regular)',
          fontSize: 'var(--font-size-h2)',
          lineHeight: 'var(--line-height-heading)',
          color: '#0A0A0A'
        }}>
          Plan y límites
        </h1>
        <p style={{ 
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-body-base)',
          color: '#737373',
          marginTop: '8px'
        }}>
          Conoce las características de tu perfil y qué puedes hacer
        </p>
      </div>

      {/* Estado del perfil */}
      <section className="rounded-2xl p-8" style={{ backgroundColor: '#FAFAFA', border: '1px solid #E5E5E5' }}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
                <svg className="w-5 h-5" fill="none" stroke="#0A0A0A" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-semibold)',
                color: '#6B6B6B',
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}>
                Tu perfil
              </span>
            </div>
            <h2 style={{ 
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--font-size-h2)',
              fontWeight: 'var(--font-weight-semibold)',
              lineHeight: 'var(--line-height-heading)',
              color: '#0A0A0A'
            }}>
              Vendedor particular
            </h2>
            <p style={{ 
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-base)',
              color: '#737373',
              marginTop: '8px'
            }}>
              Perfil gratuito para vender parcelas de forma directa
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(100, 126, 63, 0.1)' }}>
            <svg className="w-4 h-4" fill="none" stroke="#647E3F" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span style={{ 
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'var(--font-weight-semibold)',
              color: '#647E3F',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Activo
            </span>
          </div>
        </div>

        <div className="rounded-xl p-5" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
          <div className="flex items-center justify-between mb-3">
            <span style={{ 
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-sm)',
              fontWeight: 'var(--font-weight-medium)',
              color: '#0A0A0A'
            }}>
              Publicaciones activas
            </span>
            <span style={{ 
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--font-size-h3)',
              fontWeight: 'var(--font-weight-semibold)',
              color: '#0A0A0A'
            }}>
              {currentPublications} / {maxPublications}
            </span>
          </div>
          <div className="w-full h-2 rounded-full" style={{ backgroundColor: '#F5F5F5' }}>
            <div 
              className="h-2 rounded-full transition-all" 
              style={{ 
                backgroundColor: '#0A0A0A',
                width: `${(currentPublications / maxPublications) * 100}%`
              }}
            />
          </div>
          <p style={{ 
            fontSize: 'var(--font-size-xs)',
            color: '#737373',
            marginTop: '8px'
          }}>
            Tienes {maxPublications - currentPublications} {maxPublications - currentPublications === 1 ? 'publicación disponible' : 'publicaciones disponibles'}
          </p>
        </div>

        <div className="rounded-xl p-4 mt-4 flex items-start gap-3" style={{ backgroundColor: 'rgba(100, 126, 63, 0.05)', border: '1px solid rgba(100, 126, 63, 0.2)' }}>
          <Info className="w-5 h-5 flex-shrink-0" style={{ color: '#647E3F', marginTop: '2px' }} />
          <div>
            <p style={{ 
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-sm)',
              fontWeight: 'var(--font-weight-medium)',
              color: '#0A0A0A',
              lineHeight: '1.5'
            }}>
              Este perfil no requiere plan mensual
            </p>
            <p style={{ 
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-xs)',
              color: '#6B6B6B',
              marginTop: '4px',
              lineHeight: '1.5'
            }}>
              Puedes publicar hasta 1 propiedad de forma gratuita. Si necesitas más publicaciones o funcionalidades avanzadas, explora los planes profesionales.
            </p>
          </div>
        </div>
      </section>

      {/* Límites y capacidades del perfil */}
      <section className="rounded-2xl p-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
        <h3 style={{ 
          fontFamily: 'var(--font-heading)',
          fontWeight: 'var(--font-weight-medium)',
          fontSize: 'var(--font-size-h3)',
          lineHeight: 'var(--line-height-heading)',
          color: '#0A0A0A',
          marginBottom: '24px'
        }}>
          Qué incluye tu perfil
        </h3>

        <div className="space-y-6">
          {/* Publicaciones */}
          <div className="flex items-start gap-4 pb-6" style={{ borderBottom: '1px solid #F5F5F5' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F5F5F5' }}>
              <FileText className="w-5 h-5" style={{ color: '#0A0A0A' }} />
            </div>
            <div className="flex-1">
              <h4 style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                fontWeight: 'var(--font-weight-semibold)',
                color: '#0A0A0A',
                marginBottom: '6px'
              }}>
                Publicaciones gratuitas
              </h4>
              <p style={{ 
                fontSize: 'var(--font-size-body-sm)',
                color: '#737373',
                lineHeight: '1.6'
              }}>
                Publica hasta <strong>1 parcela activa</strong> sin costo. Tus publicaciones permanecen visibles mientras estén activas.
              </p>
            </div>
          </div>

          {/* Destacar publicaciones */}
          <div className="flex items-start gap-4 pb-6" style={{ borderBottom: '1px solid #F5F5F5' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FEF3C7' }}>
              <Zap className="w-5 h-5" style={{ color: '#CA8A04' }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: '#0A0A0A'
                }}>
                  Publicaciones destacadas
                </h4>
                <span className="px-2 py-0.5 rounded-full" style={{ 
                  backgroundColor: '#FEF3C7',
                  color: '#CA8A04',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'var(--font-weight-semibold)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Pago único
                </span>
              </div>
              <p style={{ 
                fontSize: 'var(--font-size-body-sm)',
                color: '#737373',
                lineHeight: '1.6',
                marginBottom: '8px'
              }}>
                Destaca cualquiera de tus publicaciones con un <strong>pago único por publicación</strong>. Las publicaciones destacadas aparecen primero en las búsquedas y tienen mayor visibilidad.
              </p>
              <p style={{ 
                fontSize: 'var(--font-size-xs)',
                color: '#A3A3A3',
                lineHeight: '1.5'
              }}>
                💡 Puedes destacar una publicación desde su panel de gestión
              </p>
            </div>
          </div>

          {/* Visibilidad */}
          <div className="flex items-start gap-4 pb-6" style={{ borderBottom: '1px solid #F5F5F5' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F5F5F5' }}>
              <Eye className="w-5 h-5" style={{ color: '#0A0A0A' }} />
            </div>
            <div className="flex-1">
              <h4 style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                fontWeight: 'var(--font-weight-semibold)',
                color: '#0A0A0A',
                marginBottom: '6px'
              }}>
                Visibilidad estándar
              </h4>
              <p style={{ 
                fontSize: 'var(--font-size-body-sm)',
                color: '#737373',
                lineHeight: '1.6'
              }}>
                Tus publicaciones aparecen en los resultados de búsqueda junto con todas las demás. Para mayor visibilidad, considera destacar tus publicaciones.
              </p>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="flex items-start gap-4 pb-6" style={{ borderBottom: '1px solid #F5F5F5' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F5F5F5' }}>
              <svg className="w-5 h-5" fill="none" stroke="#0A0A0A" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                fontWeight: 'var(--font-weight-semibold)',
                color: '#0A0A0A',
                marginBottom: '6px'
              }}>
                Estadísticas básicas
              </h4>
              <p style={{ 
                fontSize: 'var(--font-size-body-sm)',
                color: '#737373',
                lineHeight: '1.6'
              }}>
                Visualiza métricas esenciales: visualizaciones totales, consultas recibidas y estado de tus publicaciones.
              </p>
            </div>
          </div>

          {/* Gestión de consultas */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F5F5F5' }}>
              <MessageCircle className="w-5 h-5" style={{ color: '#0A0A0A' }} />
            </div>
            <div className="flex-1">
              <h4 style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                fontWeight: 'var(--font-weight-semibold)',
                color: '#0A0A0A',
                marginBottom: '6px'
              }}>
                Gestión de consultas
              </h4>
              <p style={{ 
                fontSize: 'var(--font-size-body-sm)',
                color: '#737373',
                lineHeight: '1.6'
              }}>
                Recibe y responde consultas de compradores interesados en tus parcelas. Comunícate directamente desde la plataforma.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upsell a planes profesionales */}
      <section className="rounded-2xl p-8" style={{ backgroundColor: '#FAFAFA', border: '1px solid #E5E5E5' }}>
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#0A0A0A' }}>
            <svg className="w-8 h-8" fill="none" stroke="#FFFFFF" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 style={{ 
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--font-size-h3)',
              fontWeight: 'var(--font-weight-semibold)',
              lineHeight: 'var(--line-height-heading)',
              color: '#0A0A0A',
              marginBottom: '12px'
            }}>
              ¿Necesitas más capacidad?
            </h3>
            <p style={{ 
              fontSize: 'var(--font-size-body-base)',
              color: '#737373',
              lineHeight: '1.6',
              marginBottom: '16px'
            }}>
              Si trabajas con múltiples propiedades o necesitas herramientas profesionales, explora nuestros planes para Brokers e Inmobiliarias.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#647E3F" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span style={{ fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A' }}>
                  Publicaciones ilimitadas o límites superiores
                </span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#647E3F" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span style={{ fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A' }}>
                  Múltiples publicaciones destacadas incluidas
                </span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#647E3F" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span style={{ fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A' }}>
                  Visibilidad premium y prioridad en búsquedas
                </span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#647E3F" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span style={{ fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A' }}>
                  Estadísticas avanzadas y exportación de datos
                </span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#647E3F" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span style={{ fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A' }}>
                  Gestión de equipo y brokers (Inmobiliarias)
                </span>
              </li>
            </ul>
            <button className="py-2.5 px-6 transition-all" style={{ 
              backgroundColor: '#006B4E',
              color: '#FFFFFF',
              borderRadius: '200px',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-sm)',
              fontWeight: 'var(--font-weight-medium)',
              letterSpacing: 'var(--letter-spacing-wide)',
              lineHeight: 'var(--line-height-ui)'
            }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0D3640'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#006B4E'; }}
            >
              Ver planes profesionales
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function HelpContent() {
  return (
    <main className="px-6 py-6 space-y-6">
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
          Estamos aquí para acompañarte en tu proceso
        </p>
      </div>

      {/* Contact Advisor */}
      <section className="bg-white border-2 border-gray-200 p-8 space-y-5 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
        <h2 
          style={{ 
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--font-size-h3)',
            fontWeight: 'var(--font-weight-medium)',
            color: '#0A0A0A',
            lineHeight: 'var(--line-height-heading)',
            letterSpacing: 'var(--letter-spacing-normal)'
          }}
        >
          Habla con un asesor
        </h2>
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
          Nuestro equipo está disponible para responder tus consultas y ayudarte a tomar la mejor decisión.
        </p>
        <button 
          style={{
            backgroundColor: '#006B4E',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-base)',
            fontWeight: 'var(--font-weight-medium)',
            lineHeight: 'var(--line-height-body)'
          }}
          className="w-full text-white py-3.5 px-8 rounded-[200px] transition-colors"
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0D3640'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
        >
          Iniciar conversación
        </button>
      </section>

      {/* FAQ */}
      <section className="bg-white border-2 border-gray-200 p-8 space-y-5 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
        <h2 
          style={{ 
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--font-size-h3)',
            fontWeight: 'var(--font-weight-medium)',
            color: '#0A0A0A',
            lineHeight: 'var(--line-height-heading)',
            letterSpacing: 'var(--letter-spacing-normal)'
          }}
        >
          Preguntas frecuentes
        </h2>
        <div className="space-y-3">
          <div className="border-2 border-gray-200 hover:border-gray-300 p-5 rounded-[12px] transition-colors">
            <div 
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                fontWeight: 'var(--font-weight-medium)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-body)'
              }}
            >
              ¿Cómo puedo guardar una parcela?
            </div>
            <p 
              className="mt-2"
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 'var(--font-weight-regular)',
                color: '#6B6B6B',
                lineHeight: 'var(--line-height-body)'
              }}
            >
              Desde la sección "Explorar", haz clic en el ícono de corazón en cualquier parcela que te interese.
            </p>
          </div>
          <div className="border-2 border-gray-200 hover:border-gray-300 p-5 rounded-[12px] transition-colors">
            <div 
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                fontWeight: 'var(--font-weight-medium)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-body)'
              }}
            >
              ¿Puedo comparar más de 2 parcelas?
            </div>
            <p 
              className="mt-2"
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 'var(--font-weight-regular)',
                color: '#6B6B6B',
                lineHeight: 'var(--line-height-body)'
              }}
            >
              Sí, puedes comparar hasta 4 parcelas simultáneamente para facilitar tu decisión.
            </p>
          </div>
          <div className="border-2 border-gray-200 hover:border-gray-300 p-5 rounded-[12px] transition-colors">
            <div 
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                fontWeight: 'var(--font-weight-medium)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-body)'
              }}
            >
              ¿Cómo contacto al vendedor?
            </div>
            <p 
              className="mt-2"
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 'var(--font-weight-regular)',
                color: '#6B6B6B',
                lineHeight: 'var(--line-height-body)'
              }}
            >
              Una vez que selecciones una parcela, encontrarás la opción de contacto en el detalle de la misma.
            </p>
          </div>
          <div className="border-2 border-gray-200 hover:border-gray-300 p-5 rounded-[12px] transition-colors">
            <div 
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                fontWeight: 'var(--font-weight-medium)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-body)'
              }}
            >
              ¿El servicio tiene algún costo?
            </div>
            <p 
              className="mt-2"
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 'var(--font-weight-regular)',
                color: '#6B6B6B',
                lineHeight: 'var(--line-height-body)'
              }}
            >
              El uso de la plataforma para buscar y comparar parcelas es completamente gratuito.
            </p>
          </div>
          <div className="border-2 border-gray-200 hover:border-gray-300 p-5 rounded-[12px] transition-colors">
            <div 
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                fontWeight: 'var(--font-weight-medium)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-body)'
              }}
            >
              ¿Cómo publico mi parcela?
            </div>
            <p 
              className="mt-2"
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 'var(--font-weight-regular)',
                color: '#6B6B6B',
                lineHeight: 'var(--line-height-body)'
              }}
            >
              Ve a "Mis publicaciones" y haz clic en "Nueva publicación". Completa los datos de tu parcela y fotos para crear el aviso.
            </p>
          </div>
          <div className="border-2 border-gray-200 hover:border-gray-300 p-5 rounded-[12px] transition-colors">
            <div 
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                fontWeight: 'var(--font-weight-medium)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-body)'
              }}
            >
              ¿Qué información debo incluir en mi publicación?
            </div>
            <p 
              className="mt-2"
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 'var(--font-weight-regular)',
                color: '#6B6B6B',
                lineHeight: 'var(--line-height-body)'
              }}
            >
              Incluye datos como tamaño, precio, ubicación, servicios disponibles (agua, luz), accesos y toda la documentación al día.
            </p>
          </div>
          <div className="border-2 border-gray-200 hover:border-gray-300 p-5 rounded-[12px] transition-colors">
            <div 
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                fontWeight: 'var(--font-weight-medium)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-body)'
              }}
            >
              ¿Cómo respondo a las consultas?
            </div>
            <p 
              className="mt-2"
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 'var(--font-weight-regular)',
                color: '#6B6B6B',
                lineHeight: 'var(--line-height-body)'
              }}
            >
              Las consultas aparecen en "Consultas recibidas". Desde ahí puedes responder directamente a cada interesado.
            </p>
          </div>
          <div className="border-2 border-gray-200 hover:border-gray-300 p-5 rounded-[12px] transition-colors">
            <div 
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                fontWeight: 'var(--font-weight-medium)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-body)'
              }}
            >
              ¿Puedo editar mi publicación después de crearla?
            </div>
            <p 
              className="mt-2"
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 'var(--font-weight-regular)',
                color: '#6B6B6B',
                lineHeight: 'var(--line-height-body)'
              }}
            >
              Sí, desde "Mis publicaciones" puedes editar el precio, descripción, fotos y cualquier dato en cualquier momento.
            </p>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="bg-gray-50 border-2 border-gray-200 p-8 space-y-5 rounded-[24px]">
        <h2 
          style={{ 
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--font-size-h3)',
            fontWeight: 'var(--font-weight-medium)',
            color: '#0A0A0A',
            lineHeight: 'var(--line-height-heading)',
            letterSpacing: 'var(--letter-spacing-normal)'
          }}
        >
          Recursos útiles
        </h2>
        <div className="space-y-3">
          <button className="w-full text-left border-2 border-gray-200 hover:border-gray-300 bg-white p-5 rounded-[12px] transition-colors">
            <div 
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                fontWeight: 'var(--font-weight-medium)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-body)'
              }}
            >
              Guía para compradores
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
              Todo lo que necesitas saber antes de comprar
            </div>
          </button>
          <button className="w-full text-left border-2 border-gray-200 hover:border-gray-300 bg-white p-5 rounded-[12px] transition-colors">
            <div 
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                fontWeight: 'var(--font-weight-medium)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-body)'
              }}
            >
              Guía para vendedores
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
              Cómo preparar y publicar tu parcela efectivamente
            </div>
          </button>
          <button className="w-full text-left border-2 border-gray-200 hover:border-gray-300 bg-white p-5 rounded-[12px] transition-colors">
            <div 
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                fontWeight: 'var(--font-weight-medium)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-body)'
              }}
            >
              Aspectos legales
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
              Información sobre documentación y trámites
            </div>
          </button>
          <button className="w-full text-left border-2 border-gray-200 hover:border-gray-300 bg-white p-5 rounded-[12px] transition-colors">
            <div 
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                fontWeight: 'var(--font-weight-medium)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-body)'
              }}
            >
              Cómo hacer una buena publicación
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
              Tips para atraer compradores con fotos y descripciones
            </div>
          </button>
          <button className="w-full text-left border-2 border-gray-200 hover:border-gray-300 bg-white p-5 rounded-[12px] transition-colors">
            <div 
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                fontWeight: 'var(--font-weight-medium)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-body)'
              }}
            >
              Consejos de inversión
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
              Cómo evaluar una buena oportunidad
            </div>
          </button>
          <button className="w-full text-left border-2 border-gray-200 hover:border-gray-300 bg-white p-5 rounded-[12px] transition-colors">
            <div 
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                fontWeight: 'var(--font-weight-medium)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-body)'
              }}
            >
              Valoración de propiedades
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
              Cómo determinar el precio adecuado para tu parcela
            </div>
          </button>
        </div>
      </section>
    </main>
  );
}

function SettingsContent() {
  return (
    <main className="px-6 py-6 space-y-6">
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
          Administra tu cuenta y preferencias
        </p>
      </div>

      {/* Profile Info */}
      <section className="bg-white border-2 border-gray-200 p-8 space-y-5 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
        <h2 
          style={{ 
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--font-size-h3)',
            fontWeight: 'var(--font-weight-medium)',
            color: '#0A0A0A',
            lineHeight: 'var(--line-height-heading)',
            letterSpacing: 'var(--letter-spacing-normal)'
          }}
        >
          Información de perfil
        </h2>
        <div className="space-y-4">
          <div>
            <div 
              className="mb-2"
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 'var(--font-weight-medium)',
                color: '#6B6B6B',
                lineHeight: 'var(--line-height-body)'
              }}
            >
              Tipo de usuario
            </div>
            <div 
              className="bg-gray-50 p-4 rounded-[12px]"
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                fontWeight: 'var(--font-weight-regular)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-body)'
              }}
            >
              Personal
            </div>
          </div>
          <div>
            <div 
              className="mb-2"
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 'var(--font-weight-medium)',
                color: '#6B6B6B',
                lineHeight: 'var(--line-height-body)'
              }}
            >
              Correo electrónico
            </div>
            <div 
              className="bg-gray-50 p-4 rounded-[12px]"
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                fontWeight: 'var(--font-weight-regular)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-body)'
              }}
            >
              usuario@ejemplo.com
            </div>
          </div>
        </div>
        <button 
          className="w-full bg-white hover:bg-gray-50 text-black py-3.5 px-8 border-2 border-gray-200 hover:border-gray-300 rounded-[200px] transition-colors"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-base)',
            fontWeight: 'var(--font-weight-medium)',
            lineHeight: 'var(--line-height-body)',
            color: '#0A0A0A'
          }}
        >
          Editar perfil
        </button>
      </section>

      {/* Preferences */}
      <section className="bg-white border-2 border-gray-200 p-8 space-y-5 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
        <h2 
          style={{ 
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--font-size-h3)',
            fontWeight: 'var(--font-weight-medium)',
            color: '#0A0A0A',
            lineHeight: 'var(--line-height-heading)',
            letterSpacing: 'var(--letter-spacing-normal)'
          }}
        >
          Preferencias de búsqueda
        </h2>
        <p 
          style={{ 
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: 'var(--font-weight-regular)',
            color: '#6B6B6B',
            lineHeight: 'var(--line-height-body)'
          }}
        >
          Configura tus criterios de búsqueda predeterminados
        </p>
        <button 
          className="w-full bg-white hover:bg-gray-50 text-black py-3.5 px-8 border-2 border-gray-200 hover:border-gray-300 rounded-[200px] transition-colors"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-base)',
            fontWeight: 'var(--font-weight-medium)',
            lineHeight: 'var(--line-height-body)',
            color: '#0A0A0A'
          }}
        >
          Configurar preferencias
        </button>
      </section>

      {/* Notifications */}
      <section className="bg-white border-2 border-gray-200 p-8 space-y-5 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
        <h2 
          style={{ 
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--font-size-h3)',
            fontWeight: 'var(--font-weight-medium)',
            color: '#0A0A0A',
            lineHeight: 'var(--line-height-heading)',
            letterSpacing: 'var(--letter-spacing-normal)'
          }}
        >
          Notificaciones
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between border-2 border-gray-200 p-5 rounded-[12px]">
            <div>
              <div 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                Nuevas parcelas
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
                Recibir alertas de nuevas publicaciones
              </div>
            </div>
            <div className="w-12 h-6 bg-gray-200 rounded-full"></div>
          </div>
          <div className="flex items-center justify-between border-2 border-gray-200 p-5 rounded-[12px]">
            <div>
              <div 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                Cambios de precio
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
                Notificar si cambia el precio de favoritos
              </div>
            </div>
            <div className="w-12 h-6 bg-gray-200 rounded-full"></div>
          </div>
          <div className="flex items-center justify-between border-2 border-gray-200 p-5 rounded-[12px]">
            <div>
              <div 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                Consejos y recomendaciones
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
                Recibir tips para compradores
              </div>
            </div>
            <div className="w-12 h-6 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Account Actions */}
      <section className="bg-white border-2 border-gray-200 p-8 space-y-4 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
        <h2 
          style={{ 
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--font-size-h3)',
            fontWeight: 'var(--font-weight-medium)',
            color: '#0A0A0A',
            lineHeight: 'var(--line-height-heading)',
            letterSpacing: 'var(--letter-spacing-normal)'
          }}
        >
          Cuenta
        </h2>
        <button 
          className="w-full text-left py-4 px-5 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-[12px] transition-colors"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-base)',
            fontWeight: 'var(--font-weight-regular)',
            color: '#0A0A0A',
            lineHeight: 'var(--line-height-body)'
          }}
        >
          Cambiar contraseña
        </button>
        <button 
          className="w-full text-left py-4 px-5 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-[12px] transition-colors"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-base)',
            fontWeight: 'var(--font-weight-regular)',
            color: '#0A0A0A',
            lineHeight: 'var(--line-height-body)'
          }}
        >
          Privacidad y datos
        </button>
        <button 
          className="w-full text-left py-4 px-5 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-[12px] transition-colors"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-base)',
            fontWeight: 'var(--font-weight-regular)',
            color: '#6B6B6B',
            lineHeight: 'var(--line-height-body)'
          }}
        >
          Cerrar sesión
        </button>
      </section>
    </main>
  );
}