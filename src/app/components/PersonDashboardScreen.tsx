import React from 'react';
import { CalendariosView } from '@/app/components/CalendariosView';
import { NewListingFlow } from '@/app/components/NewListingFlow';
import { PersonalInquiriesSection } from '@/app/components/PersonalInquiriesSection';
import { MyPublicationsView } from '@/app/components/MyPublicationsView';
import { ConsultasView } from '@/app/components/ConsultasView';
import { Eye, MessageCircle, FileText, Star, Plus, Edit, Pause, Play, ArrowUp, AlertCircle, Zap, Info, Image as ImageIcon, Heart, MapPin, Bell, ChevronRight, Lock, LogOut, Search, Shield } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { DashboardRef } from '@/app/App';
import { getAllParcelas } from '@/app/data/parcelasData';
import { PrecioDisplay } from '@/app/components/PrecioDisplay';

interface PersonDashboardScreenProps {
  onNavigate: (screen: string, id?: number) => void;
  savedParcelaIds?: number[];
  onToggleSaved?: (id: number) => void;
}

export const PersonDashboardScreen = React.forwardRef<DashboardRef, PersonDashboardScreenProps>(
  ({ onNavigate, savedParcelaIds = [], onToggleSaved }, ref) => {
    const [showMenu, setShowMenu] = React.useState(false);
    const [currentSection, setCurrentSection] = React.useState('home');
    const [triggerPublishModal, setTriggerPublishModal] = React.useState(0);
    const [consultasDefaultTab, setConsultasDefaultTab] = React.useState<'recibidas' | 'enviadas' | 'notificaciones'>('recibidas');
    const [showNotifications, setShowNotifications] = React.useState(false);
    const [notifications, setNotifications] = React.useState([
      { id: 1, type: 'consulta', text: 'Pedro Soto envió una consulta sobre "Parcela en Colbún"', time: 'Hace 5 min', read: false },
      { id: 2, type: 'visita', text: 'Visita confirmada para el 15 de mayo a las 10:00 hrs', time: 'Hace 1 hora', read: false },
      { id: 3, type: 'system', text: 'Tu publicación "Parcela en Colbún" fue vista 50 veces', time: 'Hace 3 horas', read: false },
      { id: 4, type: 'consulta', text: 'Ana Torres respondió a tu consulta sobre "Parcela Lago Ranco"', time: 'Ayer', read: true },
      { id: 5, type: 'system', text: 'Recuerda completar tu perfil para más visibilidad', time: 'Hace 2 días', read: true },
    ]);
    const notifRef = React.useRef<HTMLDivElement>(null);
    const unreadCount = notifications.filter(n => !n.read).length;

    React.useEffect(() => {
      if (!showNotifications) return;
      const handler = (e: MouseEvent) => {
        if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
          setShowNotifications(false);
        }
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, [showNotifications]);

    // Exponer función para abrir modal de publicación
    React.useImperativeHandle(ref, () => ({
      openPublishModal: () => {
        setCurrentSection('listings');
        setTriggerPublishModal(prev => prev + 1);
      },
      openNotificationsSection: () => {
        setConsultasDefaultTab('notificaciones');
        setCurrentSection('inquiries');
      },
    }));

  const navItems = [
    { id: 'home', label: 'Inicio', icon: 'home' },
    { id: 'explore', label: 'Explorar parcelas', icon: 'search', group: 'buy' },
    { id: 'listings', label: 'Mis publicaciones', icon: 'list', group: 'sell' },
    { id: 'saved', label: 'Guardados', icon: 'heart', group: 'buy' },
    { id: 'inquiries', label: 'Consultas', icon: 'message', group: 'sell' },
    { id: 'calendarios', label: 'Calendarios', icon: 'calendar', group: 'sell' },
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
      case 'calendar':
        return (
          <svg className="w-5 h-5" fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth={strokeWidth}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
          <div className="border-b-2 border-gray-300 p-2 mt-8 flex items-center justify-between">
            <div className="font-bold text-base text-black">CompraTuParcela</div>
            <button
              onClick={() => setShowNotifications(v => !v)}
              className="relative p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              title="Notificaciones"
            >
              <Bell className="w-5 h-5" style={{ color: '#006B4E' }} />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full px-0.5">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          </div>

          {/* Notification panel */}
          {showNotifications && (
            <div
              ref={notifRef}
              className="fixed z-50 bg-white border-2 border-gray-200 rounded-[16px] shadow-xl overflow-hidden"
              style={{ left: 224, top: 0, width: 320, maxHeight: '80vh' }}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b-2 border-gray-100">
                <span style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-body-base)', color: '#0A0A0A' }}>
                  Notificaciones
                </span>
                {unreadCount > 0 && (
                  <button
                    onClick={() => setNotifications(ns => ns.map(n => ({ ...n, read: true })))}
                    className="text-xs hover:underline"
                    style={{ color: '#006B4E', fontFamily: 'var(--font-body)' }}
                  >
                    Marcar todo como leído
                  </button>
                )}
              </div>
              <div className="overflow-y-auto" style={{ maxHeight: 'calc(80vh - 52px)' }}>
                {notifications.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-gray-400">Sin notificaciones</div>
                ) : (
                  notifications.map(notif => (
                    <button
                      key={notif.id}
                      onClick={() => setNotifications(ns => ns.map(n => n.id === notif.id ? { ...n, read: true } : n))}
                      className="w-full flex items-start gap-3 px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {notif.type === 'consulta' && (
                          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E8F4F0' }}>
                            <MessageCircle className="w-4 h-4" style={{ color: '#006B4E' }} />
                          </div>
                        )}
                        {notif.type === 'visita' && (
                          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#EFF6FF' }}>
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                        {notif.type === 'system' && (
                          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFF7ED' }}>
                            <Info className="w-4 h-4 text-orange-500" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm leading-snug" style={{ color: notif.read ? '#6B6B6B' : '#0A0A0A', fontWeight: notif.read ? 400 : 500, fontFamily: 'var(--font-body)' }}>
                          {notif.text}
                        </p>
                        <p className="text-xs mt-1" style={{ color: '#A3A3A3', fontFamily: 'var(--font-body)' }}>{notif.time}</p>
                      </div>
                      {!notif.read && (
                        <div className="flex-shrink-0 w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#006B4E' }} />
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Navigation Items */}
          <nav className="flex-1 py-4 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'inquiries') setConsultasDefaultTab('recibidas');
                  setCurrentSection(item.id);
                }}
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
        {currentSection === 'saved' && <SavedContent savedParcelaIds={savedParcelaIds} onToggleSaved={onToggleSaved} onNavigate={onNavigate} />}
        {currentSection === 'inquiries' && <ConsultasView viewType="personal" defaultTab={consultasDefaultTab} />}
        {currentSection === 'calendarios' && <CalendariosView />}
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
  const maxPublications = 3;
  const currentPublications = 2;
  const canPublish = currentPublications < maxPublications;
  const slotsLibres = maxPublications - currentPublications;

  const [pub2Paused, setPub2Paused] = React.useState(true);
  const [showPauseConfirm, setShowPauseConfirm] = React.useState(false);

  return (
    <main className="px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
            marginTop: '6px'
          }}>
            Gestiona tus parcelas publicadas
          </p>
        </div>
        <button
          disabled={!canPublish}
          onClick={() => {
            setCurrentSection('listings');
            setTriggerPublishModal(prev => prev + 1);
          }}
          className="flex items-center justify-center gap-2 py-2.5 px-5 transition-all self-start sm:self-auto flex-shrink-0"
          style={{
            backgroundColor: canPublish ? '#006B4E' : '#F5F5F5',
            color: canPublish ? '#FFFFFF' : '#A3A3A3',
            borderRadius: '200px',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-sm)',
            fontWeight: 'var(--font-weight-medium)',
            letterSpacing: 'var(--letter-spacing-wide)',
            lineHeight: 'var(--line-height-ui)',
            cursor: canPublish ? 'pointer' : 'not-allowed',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => { if (canPublish) e.currentTarget.style.backgroundColor = '#01533E'; }}
          onMouseLeave={(e) => { if (canPublish) e.currentTarget.style.backgroundColor = '#006B4E'; }}
        >
          <Plus className="w-4 h-4 flex-shrink-0" />
          Nueva publicación
        </button>
      </div>

      {/* Resumen: slots + stats */}
      <div className="rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: maxPublications }).map((_, i) => (
              <div key={i} className="w-3 h-3 rounded-full" style={{
                backgroundColor: i < currentPublications ? '#006B4E' : '#E5E5E5'
              }} />
            ))}
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', color: '#0A0A0A' }}>
              {currentPublications} de {maxPublications} publicaciones usadas
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#737373', marginTop: '2px' }}>
              {canPublish
                ? `${slotsLibres === 1 ? 'Tienes 1 espacio disponible' : `Tienes ${slotsLibres} espacios disponibles`}`
                : 'Alcanzaste el límite gratuito'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1.5">
            <Eye className="w-4 h-4" style={{ color: '#006B4E' }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-semibold)', color: '#0A0A0A' }}>347</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#737373' }}>vistas</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MessageCircle className="w-4 h-4" style={{ color: '#006B4E' }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-semibold)', color: '#0A0A0A' }}>12</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#737373' }}>consultas</span>
            <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(70, 38, 17, 0.1)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#462611' }}>2 nuevas</span>
          </div>
        </div>
      </div>

      {/* Parcelas */}
      <section className="space-y-4">
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 'var(--font-weight-medium)',
          fontSize: 'var(--font-size-h3)',
          lineHeight: 'var(--line-height-heading)',
          color: '#0A0A0A'
        }}>
          Tus parcelas
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Publicación 1 */}
          <div className="rounded-xl p-4 flex flex-col" style={{ border: '1px solid #E5E5E5', backgroundColor: '#FFFFFF' }}>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0" style={{ border: '1px solid #E5E5E5' }}>
                  <img src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=80&h=80&fit=crop&q=80" alt="Parcela Valle del Sol" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h4)', fontWeight: 'var(--font-weight-semibold)', color: '#0A0A0A', lineHeight: 'var(--line-height-heading)' }}>
                    Parcela Valle del Sol
                  </h3>
                  <p style={{ fontSize: 'var(--font-size-body-sm)', color: '#737373', marginTop: '3px' }}>
                    Lampa, RM · 6.000 m²
                  </p>
                </div>
              </div>
              <div className="px-2.5 py-1 rounded-full flex-shrink-0" style={{ backgroundColor: 'rgba(100, 126, 63, 0.1)' }}>
                <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#647E3F' }}>Activa</span>
              </div>
            </div>

            <div className="flex-1 mb-4" style={{ borderTop: '1px solid #F5F5F5', paddingTop: '12px' }}>
              <div className="flex items-center gap-4 mb-2">
                <div className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" style={{ color: '#A3A3A3' }} />
                  <span style={{ fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>234 vistas</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5" style={{ color: '#A3A3A3' }} />
                  <span style={{ fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>8 consultas</span>
                </div>
              </div>
              <p style={{ fontSize: 'var(--font-size-xs)', color: '#A3A3A3' }}>Última modificación: hace 3 días</p>
            </div>

            <div className="flex gap-2">
              <button onClick={() => onNavigate('parcela-detalle', 1)} className="flex-1 py-2 px-3 transition-all" style={{ backgroundColor: '#FFFFFF', color: '#0A0A0A', border: '2px solid #DEDEDE', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-wide)' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FAFAFA'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; }}>
                Ver
              </button>
              <button onClick={() => setCurrentSection('listings')} className="flex-1 py-2 px-3 flex items-center justify-center gap-1.5 transition-all" style={{ backgroundColor: '#FFFFFF', color: '#0A0A0A', border: '2px solid #DEDEDE', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-wide)' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FAFAFA'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; }}>
                <Edit className="w-3.5 h-3.5 flex-shrink-0" />
                Editar
              </button>
              <button onClick={() => setShowPauseConfirm(true)} className="flex-1 py-2 px-3 flex items-center justify-center gap-1.5 transition-all" style={{ backgroundColor: '#FEF2F2', color: '#EF4444', border: '2px solid #FECACA', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-wide)' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FECACA'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FEF2F2'; }}>
                <Pause className="w-3.5 h-3.5 flex-shrink-0" />
                Pausar
              </button>
            </div>
          </div>

          {/* Publicación 2 */}
          <div className="rounded-xl p-4 flex flex-col" style={{ border: '1px solid #E5E5E5', backgroundColor: '#FFFFFF' }}>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0" style={{ border: '1px solid #E5E5E5' }}>
                  <img src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=80&h=80&fit=crop&q=80" alt="Terreno El Refugio" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h4)', fontWeight: 'var(--font-weight-semibold)', color: '#0A0A0A', lineHeight: 'var(--line-height-heading)' }}>
                    Terreno El Refugio
                  </h3>
                  <p style={{ fontSize: 'var(--font-size-body-sm)', color: '#737373', marginTop: '3px' }}>
                    Colina, RM · 3.500 m²
                  </p>
                </div>
              </div>
              <div className="px-2.5 py-1 rounded-full flex-shrink-0" style={{ backgroundColor: pub2Paused ? '#F3F4F6' : 'rgba(100, 126, 63, 0.1)' }}>
                <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: pub2Paused ? '#6B7280' : '#647E3F' }}>{pub2Paused ? 'Pausada' : 'Activa'}</span>
              </div>
            </div>

            <div className="flex-1 mb-4" style={{ borderTop: '1px solid #F5F5F5', paddingTop: '12px', opacity: pub2Paused ? 0.5 : 1 }}>
              <div className="flex items-center gap-4 mb-2">
                <div className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" style={{ color: '#A3A3A3' }} />
                  <span style={{ fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>113 vistas</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5" style={{ color: '#A3A3A3' }} />
                  <span style={{ fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>4 consultas</span>
                </div>
              </div>
              <p style={{ fontSize: 'var(--font-size-xs)', color: '#A3A3A3' }}>Última modificación: hace 12 días</p>
            </div>

            <div className="flex gap-2">
              <button onClick={() => onNavigate('parcela-detalle', 2)} className="flex-1 py-2 px-3 transition-all" style={{ backgroundColor: '#FFFFFF', color: '#0A0A0A', border: '2px solid #DEDEDE', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-wide)' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FAFAFA'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; }}>
                Ver
              </button>
              <button onClick={() => setCurrentSection('listings')} className="flex-1 py-2 px-3 flex items-center justify-center gap-1.5 transition-all" style={{ backgroundColor: '#FFFFFF', color: '#0A0A0A', border: '2px solid #DEDEDE', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-wide)' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FAFAFA'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; }}>
                <Edit className="w-3.5 h-3.5 flex-shrink-0" />
                Editar
              </button>
              {pub2Paused ? (
                <button onClick={() => setPub2Paused(false)} className="flex-1 py-2 px-3 flex items-center justify-center gap-1.5 transition-all" style={{ backgroundColor: '#F0FDF4', color: '#006B4E', border: '2px solid #A7F3D0', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-wide)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#DCFCE7'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#F0FDF4'; }}>
                  <Play className="w-3.5 h-3.5 flex-shrink-0" />
                  Publicar
                </button>
              ) : (
                <button onClick={() => setShowPauseConfirm(true)} className="flex-1 py-2 px-3 flex items-center justify-center gap-1.5 transition-all" style={{ backgroundColor: '#FEF2F2', color: '#EF4444', border: '2px solid #FECACA', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-wide)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FECACA'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FEF2F2'; }}>
                  <Pause className="w-3.5 h-3.5 flex-shrink-0" />
                  Pausar
                </button>
              )}
            </div>
          </div>

          {/* Slot vacío */}
          {canPublish && (
            <button
              onClick={() => {
                setCurrentSection('listings');
                setTriggerPublishModal(prev => prev + 1);
              }}
              className="rounded-xl p-4 flex flex-col items-center justify-center gap-3 transition-all"
              style={{ border: '2px dashed #DEDEDE', backgroundColor: 'transparent', cursor: 'pointer', minHeight: '160px' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FAFAFA'; e.currentTarget.style.borderColor = '#006B4E'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = '#DEDEDE'; }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 107, 78, 0.08)' }}>
                <Plus className="w-5 h-5" style={{ color: '#006B4E' }} />
              </div>
              <div className="text-center">
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', color: '#006B4E' }}>
                  Publicar nueva parcela
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#A3A3A3', marginTop: '4px' }}>
                  {slotsLibres === 1 ? 'Tienes 1 espacio disponible' : `Tienes ${slotsLibres} espacios disponibles`}
                </p>
              </div>
            </button>
          )}
        </div>
      </section>

      {/* Modal confirmación pausa */}
      {showPauseConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <div className="rounded-2xl p-6 w-full max-w-sm" style={{ backgroundColor: '#FFFFFF', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F3F4F6' }}>
                <svg viewBox="0 0 24 24" style={{ width: '20px', height: '20px', fill: 'none', stroke: '#6B7280', strokeWidth: 2 }}>
                  <rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h4)', fontWeight: 600, color: '#0A0A0A', marginBottom: '8px' }}>
                  ¿Pausar esta publicación?
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', lineHeight: '1.6' }}>
                  Los compradores no podrán verla mientras esté pausada. Puedes volver a publicarla cuando quieras.
                </p>
              </div>
              <div className="flex gap-3 w-full">
                <button onClick={() => setShowPauseConfirm(false)} className="flex-1 py-2.5 px-4 transition-all" style={{ backgroundColor: '#FFFFFF', color: '#0A0A0A', border: '2px solid #DEDEDE', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F5F5F5'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; }}>
                  Cancelar
                </button>
                <button onClick={() => { setPub2Paused(true); setShowPauseConfirm(false); }} className="flex-1 py-2.5 px-4 transition-all" style={{ backgroundColor: '#374151', color: '#FFFFFF', border: '2px solid #374151', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1F2937'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#374151'; }}>
                  Pausar publicación
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#01533E'}
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
              e.currentTarget.style.backgroundColor = '#01533E';
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
              e.currentTarget.style.backgroundColor = '#01533E';
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
            boxShadow: '0 4px 12px 0 rgba(0, 107, 78, 0.08)'
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
          ¿Tienes otra parcela para publicar?
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

function SavedContent({ savedParcelaIds, onToggleSaved, onNavigate }: { savedParcelaIds: number[]; onToggleSaved?: (id: number) => void; onNavigate: (screen: string, id?: number) => void; }) {
  const allParcelas = getAllParcelas();
  const savedParcelas = savedParcelaIds
    .map(id => allParcelas.find(p => p.id === id))
    .filter(Boolean) as ReturnType<typeof getAllParcelas>;

  if (savedParcelas.length === 0) {
    return (
      <main className="px-6 py-6">
        <div className="space-y-2 mb-8">
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h2)', fontWeight: 'var(--font-weight-medium)', color: '#0A0A0A', lineHeight: 'var(--line-height-heading)' }}>
            Guardados
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', color: '#6B6B6B', lineHeight: 'var(--line-height-body)' }}>
            Todas tus parcelas favoritas en un solo lugar
          </p>
        </div>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5" style={{ backgroundColor: '#F5F5F5' }}>
            <Heart className="w-10 h-10" style={{ color: '#D1D5DB' }} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h3)', fontWeight: 500, color: '#0A0A0A', marginBottom: '8px' }}>
            Todavía no guardaste ninguna parcela
          </h3>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', marginBottom: '24px', maxWidth: '320px', lineHeight: '1.6' }}>
            Guarda las parcelas que te interesan para encontrarlas fácilmente después.
          </p>
          <button
            onClick={() => onNavigate('parcelas')}
            className="px-6 py-3 rounded-full transition-all"
            style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500 }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#01533E'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#006B4E'}
          >
            Explorar parcelas
          </button>
        </div>
      </main>
    );
  }

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
            Guardados
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
            {savedParcelas.length}
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

      {/* Grid de guardadas */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedParcelas.map((parcela) => {
            const isUnavailable = false; // en producción: parcela.status !== 'published'
            return (
              <div
                key={parcela.id}
                onClick={() => !isUnavailable && onNavigate('parcela-detalle', parcela.id)}
                className="rounded-xl overflow-hidden transition-all bg-white"
                style={{
                  border: '2px solid #E5E5E5',
                  cursor: isUnavailable ? 'default' : 'pointer',
                  opacity: isUnavailable ? 0.7 : 1,
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => { if (!isUnavailable) e.currentTarget.style.boxShadow = '0 8px 24px rgba(100,126,63,0.25)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
              >
                {/* Imagen */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={parcela.imagenes?.[0] || ''}
                    alt={parcela.nombre}
                    className="w-full h-full object-cover"
                  />
                  {isUnavailable && (
                    <div className="absolute inset-0 flex items-end p-3" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#F3F4F6', color: '#6B7280', border: '1px solid #D1D5DB' }}>
                        No disponible
                      </span>
                    </div>
                  )}
                  {/* Botón eliminar (corazón relleno) */}
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      onToggleSaved?.(parcela.id);
                    }}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(255,255,255,0.92)', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }}
                    title="Eliminar de guardados"
                  >
                    <svg viewBox="0 0 24 24" style={{ width: '16px', height: '16px', fill: '#006B4E', stroke: '#006B4E', strokeWidth: 2 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                {/* Contenido */}
                <div className="p-4 space-y-2">
                  <h3 style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-lg)', fontWeight: 600, color: '#0A0A0A', lineHeight: '1.4' }}>
                    {parcela.nombre}
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#737373' }} />
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#737373' }}>{parcela.ubicacion}</p>
                  </div>
                  <div className="pt-2" style={{ borderTop: '1px solid #F0F0F0' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#737373', marginBottom: '2px' }}>Desde</p>
                    <PrecioDisplay precioCLP={parcela.precio} precioSize="sm" />
                  </div>
                  {!isUnavailable && (
                    <button
                      onClick={e => { e.stopPropagation(); onNavigate('parcela-detalle', parcela.id); }}
                      className="w-full py-2 rounded-full text-sm font-medium transition-all mt-1"
                      style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)' }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#01533E'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#006B4E'}
                    >
                      Ver detalles
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
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
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#01533E'}
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
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#01533E'}
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
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#01533E'}
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
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#01533E'}
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
  const [selectedId, setSelectedId] = React.useState<number | null>(null);

  type EstadoCompra = 'reservandose' | 'reservada' | 'aprobada' | 'rechazada';
  type TipoCompra = 'reserva' | 'compra';

  const estadoConfig: Record<EstadoCompra, { label: string; bg: string; color: string; border: string }> = {
    reservandose: { label: 'Reservándose', bg: '#FFFBEB', color: '#CA8A04', border: '#FDE68A' },
    reservada:    { label: 'Reservada',    bg: '#EBFEF5', color: '#006B4E', border: '#A7F3D0' },
    aprobada:     { label: 'Aprobada',     bg: '#DCFCE7', color: '#166534', border: '#86EFAC' },
    rechazada:    { label: 'Rechazada',    bg: '#FEF2F2', color: '#DC2626', border: '#FECACA' },
  };

  const compras: { id: number; nombre: string; ubicacion: string; superficie: string; fecha: string; monto: string; estado: EstadoCompra; tipo: TipoCompra; metodoPago: string; imagen: string }[] = [
    {
      id: 1,
      nombre: 'Parcela Vista al Valle',
      ubicacion: 'Pirque, Región Metropolitana',
      superficie: '5.000 m²',
      fecha: '15 May 2026',
      monto: '$500.000',
      estado: 'reservandose',
      tipo: 'reserva',
      metodoPago: 'Transferencia bancaria',
      imagen: 'https://images.unsplash.com/photo-1765574780421-451d6b943191?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXJhbCUyMGxhbmQlMjB2YWxsZXklMjBjaGlsZSUyMGNvdW50cnlzaWRlfGVufDF8fHx8MTc2OTc5MjgzMHww&ixlib=rb-4.1.0&q=80&w=400',
    },
    {
      id: 2,
      nombre: 'Parcela Bosque del Sur',
      ubicacion: 'Cabrero, Región del Biobío',
      superficie: '7.200 m²',
      fecha: '28 Abr 2026',
      monto: '$500.000',
      estado: 'reservada',
      tipo: 'reserva',
      metodoPago: 'Mercado Pago',
      imagen: 'https://images.unsplash.com/photo-1761786271694-66020392b461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGZvcmVzdCUyMHByb3BlcnR5JTIwYWVyaWFsfGVufDF8fHx8MTc2OTc5MjgzM3ww&ixlib=rb-4.1.0&q=80&w=400',
    },
    {
      id: 3,
      nombre: 'Parcela Los Robles',
      ubicacion: 'Colina, Región Metropolitana',
      superficie: '6.000 m²',
      fecha: '12 Mar 2026',
      monto: '$85.000.000',
      estado: 'aprobada',
      tipo: 'compra',
      metodoPago: 'Transferencia bancaria',
      imagen: 'https://images.unsplash.com/photo-1764168414096-fa2a80540745?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXJhbCUyMHByb3BlcnR5JTIwbGFuZCUyMGFlcmlhbHxlbnwxfHx8fDE3NzAxMzI5NjJ8MA&ixlib=rb-4.1.0&q=80&w=400',
    },
    {
      id: 4,
      nombre: 'Parcela Valle Escondido',
      ubicacion: "San Fernando, Región de O'Higgins",
      superficie: '4.500 m²',
      fecha: '3 Mar 2026',
      monto: '$500.000',
      estado: 'rechazada',
      tipo: 'reserva',
      metodoPago: 'Transferencia bancaria',
      imagen: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&h=300&fit=crop&q=80',
    },
  ];

  const STEPPER = ['Reservándose', 'Reservada', 'Aprobada'];
  const pasoActivo: Record<EstadoCompra, number> = {
    reservandose: 0,
    reservada:    1,
    aprobada:     2,
    rechazada:    -1,
  };

  // ── VISTA DETALLE ──
  if (selectedId !== null) {
    const compra = compras.find(c => c.id === selectedId)!;
    const cfg = estadoConfig[compra.estado];
    const pasoIdx = pasoActivo[compra.estado];

    return (
      <main className="px-8 py-8 space-y-6">
        <button
          onClick={() => setSelectedId(null)}
          className="flex items-center gap-2 text-sm transition-colors"
          style={{ color: '#737373', fontFamily: 'var(--font-body)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          onMouseEnter={e => e.currentTarget.style.color = '#0A0A0A'}
          onMouseLeave={e => e.currentTarget.style.color = '#737373'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Mis compras
        </button>

        {/* Header */}
        <div className="flex gap-5 items-start">
          <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0" style={{ border: '1px solid #E5E5E5' }}>
            <img src={compra.imagen} alt={compra.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h2)', fontWeight: 'var(--font-weight-regular)', color: '#0A0A0A', lineHeight: 'var(--line-height-heading)' }}>
                  {compra.nombre}
                </h1>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', marginTop: '4px' }}>{compra.ubicacion}</p>
              </div>
              <span className="px-3 py-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: cfg.bg, border: `1px solid ${cfg.border}`, fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: cfg.color }}>
                {cfg.label}
              </span>
            </div>
            <div className="flex gap-6 flex-wrap">
              {[
                { label: 'Tipo', value: compra.tipo === 'reserva' ? 'Reserva' : 'Compra' },
                { label: 'Fecha', value: compra.fecha },
                { label: 'Monto', value: compra.monto },
                { label: 'Superficie', value: compra.superficie },
              ].map(item => (
                <div key={item.label}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF', marginBottom: '2px' }}>{item.label}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#0A0A0A' }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stepper */}
        <div className="rounded-xl p-5" style={{ backgroundColor: '#FAFAFA', border: '1px solid #E5E5E5' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#0A0A0A', marginBottom: '20px' }}>
            Seguimiento de la operación
          </p>
          {compra.estado === 'rechazada' ? (
            <div className="flex items-center gap-3 p-4 rounded-xl" style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" className="flex-shrink-0">
                <circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M15 9l-6 6M9 9l6 6" />
              </svg>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#DC2626' }}>Operación rechazada</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF', marginTop: '2px' }}>El pago fue rechazado. La parcela volvió a estar disponible.</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              {STEPPER.map((label, i) => {
                const done = pasoIdx > i;
                const active = pasoIdx === i;
                return (
                  <React.Fragment key={label}>
                    <div className="flex flex-col items-center gap-2 flex-shrink-0">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: done ? '#006B4E' : active ? '#FFFBEB' : '#F5F5F5', border: `2px solid ${done ? '#006B4E' : active ? '#F59E0B' : '#E5E5E5'}` }}>
                        {done ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        ) : (
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: active ? '#F59E0B' : '#D1D5DB' }} />
                        )}
                      </div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: active ? 600 : 400, color: active ? '#0A0A0A' : done ? '#006B4E' : '#9CA3AF', whiteSpace: 'nowrap' }}>
                        {label}
                      </p>
                    </div>
                    {i < STEPPER.length - 1 && (
                      <div className="flex-1 h-0.5 mx-2 mb-6" style={{ backgroundColor: done ? '#006B4E' : '#E5E5E5' }} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </div>

        {/* Mensaje contextual */}
        {compra.estado === 'reservandose' && (
          <div className="rounded-xl p-4 flex items-start gap-3" style={{ backgroundColor: '#FFFBEB', border: '1px solid #FDE68A' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#CA8A04" strokeWidth="2" style={{ marginTop: '1px', flexShrink: 0 }}><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M12 8v4l2 2" /></svg>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#92400E', lineHeight: '1.5' }}>
              Tu comprobante está siendo revisado. Te notificaremos por email en un plazo de 24 horas hábiles.
            </p>
          </div>
        )}
        {compra.estado === 'reservada' && (
          <div className="rounded-xl p-4 flex items-start gap-3" style={{ backgroundColor: '#EBFEF5', border: '1px solid #A7F3D0' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#006B4E" strokeWidth="2" style={{ marginTop: '1px', flexShrink: 0 }}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#065F46', lineHeight: '1.5' }}>
              Tu pago fue validado. La parcela está reservada a tu nombre. El equipo se pondrá en contacto para los pasos siguientes.
            </p>
          </div>
        )}
        {compra.estado === 'aprobada' && (
          <div className="rounded-xl p-4 flex items-start gap-3" style={{ backgroundColor: '#DCFCE7', border: '1px solid #86EFAC' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="2" style={{ marginTop: '1px', flexShrink: 0 }}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#166534', lineHeight: '1.5' }}>
              ¡Operación aprobada! Tu compra fue confirmada exitosamente.
            </p>
          </div>
        )}
        {compra.estado === 'rechazada' && (
          <div className="rounded-xl p-4 flex items-start gap-3" style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" style={{ marginTop: '1px', flexShrink: 0 }}><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M12 8v4" /><circle cx="12" cy="16" r="0.5" fill="#DC2626" /></svg>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#B91C1C', lineHeight: '1.5' }}>
              El pago fue rechazado. Si quieres adquirir esta parcela, puedes iniciar una nueva reserva desde el detalle de la publicación.
            </p>
          </div>
        )}

        {/* Resumen de la operación */}
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #E5E5E5' }}>
          <div className="px-5 py-3" style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E5E5' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Resumen de la operación</p>
          </div>
          {[
            { label: 'Tipo de operación', value: compra.tipo === 'reserva' ? 'Reserva de parcela' : 'Compra de parcela' },
            { label: 'Parcela', value: compra.nombre },
            { label: 'Monto', value: compra.monto },
            { label: 'Método de pago', value: compra.metodoPago },
            { label: 'Fecha', value: compra.fecha },
            { label: 'Estado', value: cfg.label },
          ].map((row, i, arr) => (
            <div key={row.label} className="flex items-center justify-between px-5 py-3" style={{ borderBottom: i < arr.length - 1 ? '1px solid #F3F4F6' : 'none', backgroundColor: i % 2 === 0 ? '#FFFFFF' : '#FAFAFA' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF' }}>{row.label}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: row.label === 'Estado' ? cfg.color : '#111827' }}>{row.value}</span>
            </div>
          ))}
        </div>
      </main>
    );
  }

  // ── VISTA LISTA ──
  return (
    <main className="px-8 py-8 space-y-6">
      <div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-regular)', fontSize: 'var(--font-size-h2)', lineHeight: 'var(--line-height-heading)', color: '#0A0A0A' }}>
          Mis compras
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', color: '#737373', marginTop: '8px' }}>
          Historial de reservas y compras, de la más reciente a la más antigua
        </p>
      </div>

      <div className="space-y-3">
        {compras.map((compra) => {
          const cfg = estadoConfig[compra.estado];
          return (
            <div
              key={compra.id}
              className="rounded-2xl p-5 flex gap-5 items-center"
              style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0" style={{ border: '1px solid #E5E5E5' }}>
                <img src={compra.imagen} alt={compra.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', fontWeight: 600, color: '#0A0A0A', marginBottom: '4px' }}>{compra.nombre}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF' }}>{compra.ubicacion}</p>
                <div className="flex items-center gap-4 mt-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded-md" style={{ backgroundColor: '#F5F5F5', fontFamily: 'var(--font-body)', fontSize: '11px', color: '#525252', fontWeight: 500 }}>
                    {compra.tipo === 'reserva' ? 'Reserva' : 'Compra'}
                  </span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF' }}>{compra.fecha}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 500, color: '#374151' }}>{compra.monto}</span>
                </div>
              </div>
              <div className="flex-shrink-0 flex flex-col items-end" style={{ gap: '20px' }}>
                <span className="px-2.5 py-1 rounded-full" style={{ backgroundColor: cfg.bg, border: `1px solid ${cfg.border}`, fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: cfg.color }}>
                  {cfg.label}
                </span>
                <button
                  onClick={() => setSelectedId(compra.id)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full transition-all"
                  style={{ backgroundColor: '#F5F5F5', color: '#0A0A0A', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, border: 'none', cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#006B4E'; e.currentTarget.style.color = '#FFFFFF'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#F5F5F5'; e.currentTarget.style.color = '#0A0A0A'; }}
                >
                  Ver detalle
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
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
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#01533E'; }}
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
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#01533E'}
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
  const [isEditing, setIsEditing] = React.useState(false);
  const [nombre, setNombre] = React.useState('María García');
  const [editNombre, setEditNombre] = React.useState('María García');
  const [telefono, setTelefono] = React.useState('9 1234 5678');
  const [editTelefono, setEditTelefono] = React.useState('9 1234 5678');
  const [phoneCode, setPhoneCode] = React.useState('+56 (CL)');
  const [region, setRegion] = React.useState('Región Metropolitana');
  const [editRegion, setEditRegion] = React.useState('Región Metropolitana');
  const [avatarPreview, setAvatarPreview] = React.useState<string | null>(null);
  const [editAvatarPreview, setEditAvatarPreview] = React.useState<string | null>(null);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [emailNotifConsultas, setEmailNotifConsultas] = React.useState(true);
  const [showPasswordSection, setShowPasswordSection] = React.useState(false);
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [showCurrentPwd, setShowCurrentPwd] = React.useState(false);
  const [showNewPwd, setShowNewPwd] = React.useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = React.useState(false);
  const [showEmailTooltip, setShowEmailTooltip] = React.useState(false);
  const avatarInputRef = React.useRef<HTMLInputElement>(null);
  const isGoogleAccount = false; // simular cuenta de email

  const email = 'maria.garcia@gmail.com';
  const regiones = [
    'Región de Arica y Parinacota','Región de Tarapacá','Región de Antofagasta',
    'Región de Atacama','Región de Coquimbo','Región de Valparaíso',
    'Región Metropolitana','Región del Libertador General Bernardo O\'Higgins',
    'Región del Maule','Región de Ñuble','Región del Biobío',
    'Región de La Araucanía','Región de Los Ríos','Región de Los Lagos',
    'Región de Aysén','Región de Magallanes',
  ];
  const phoneCodes = ['+56 (CL)','+54 (AR)','+55 (BR)','+51 (PE)','+57 (CO)','+52 (MX)','+34 (ES)','+1 (US)'];

  const handleStartEdit = () => {
    setEditNombre(nombre);
    setEditTelefono(telefono);
    setEditRegion(region);
    setEditAvatarPreview(avatarPreview);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setShowPasswordSection(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSave = () => {
    if (!editNombre.trim()) return;
    setNombre(editNombre.trim());
    setTelefono(editTelefono);
    setRegion(editRegion);
    setAvatarPreview(editAvatarPreview);
    setIsEditing(false);
    setShowPasswordSection(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3500);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return;
    const reader = new FileReader();
    reader.onload = ev => setEditAvatarPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const getInitials = (name: string) => name.split(' ').map(p => p[0]).join('').substring(0, 2).toUpperCase();

  const canSave = editNombre.trim().length > 0;

  return (
    <main className="px-4 py-6 sm:px-6 space-y-5">
      {/* Toast éxito */}
      {showSuccess && (
        <div className="fixed bottom-6 left-1/2 z-[9999] flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg" style={{ transform: 'translateX(-50%)', backgroundColor: '#0A0A0A', color: '#FFFFFF', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', minWidth: '260px' }}>
          <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: 'none', stroke: '#86EFAC', strokeWidth: 2.5, flexShrink: 0 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Perfil actualizado correctamente
        </div>
      )}

      {/* Header */}
      <div className="space-y-1">
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h2)', fontWeight: 'var(--font-weight-medium)', color: '#0A0A0A', lineHeight: 'var(--line-height-heading)' }}>
          Configuración
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', color: '#6B6B6B' }}>
          Administra tu cuenta y preferencias
        </p>
      </div>

      {/* Información de perfil — ancho completo */}
      <section className="rounded-2xl p-5 space-y-5" style={{ backgroundColor: '#FFFFFF', border: isEditing ? '1px solid #006B4E' : '1px solid #E5E5E5' }}>
        <div className="flex items-center justify-between">
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h3)', fontWeight: 500, color: '#0A0A0A', lineHeight: 'var(--line-height-heading)' }}>
            Información de perfil
          </h2>
          {!isEditing && (
            <button
              onClick={handleStartEdit}
              className="w-11 h-11 flex items-center justify-center rounded-lg transition-all"
              style={{ backgroundColor: '#F5F5F5', border: '1px solid #E5E5E5' }}
              title="Editar perfil"
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#E5E5E5'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#F5F5F5'}
            >
              <svg viewBox="0 0 24 24" style={{ width: '14px', height: '14px', fill: 'none', stroke: '#374151', strokeWidth: 2 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          )}
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="relative flex-shrink-0">
            <div
              onClick={() => { if (isEditing) avatarInputRef.current?.click(); }}
              className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center"
              style={{ backgroundColor: '#006B4E', cursor: isEditing ? 'pointer' : 'default', position: 'relative' }}
            >
              {(isEditing ? editAvatarPreview : avatarPreview) ? (
                <img src={(isEditing ? editAvatarPreview : avatarPreview)!} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 600, color: '#FFFFFF' }}>{getInitials(nombre)}</span>
              )}
              {isEditing && (
                <div className="absolute inset-0 flex items-center justify-center rounded-full" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
                  <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: 'none', stroke: '#FFFFFF', strokeWidth: 2 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              )}
            </div>
            <input ref={avatarInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleAvatarChange} />
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', fontWeight: 600, color: '#0A0A0A' }}>{nombre}</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', marginTop: '2px' }}>Cuenta personal</p>
            {isEditing && (
              <button onClick={() => avatarInputRef.current?.click()} className="mt-1.5 text-xs underline" style={{ color: '#006B4E', fontFamily: 'var(--font-body)', background: 'none', border: 'none', cursor: 'pointer' }}>
                Cambiar foto
              </button>
            )}
            {isEditing && <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF', marginTop: '2px' }}>JPG, PNG o WEBP · Máx. 5 MB</p>}
          </div>
        </div>

        {/* Campos — 2 columnas en desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Nombre */}
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
              Nombre completo {isEditing && <span style={{ color: '#DC2626' }}>*</span>}
            </label>
            {isEditing ? (
              <input type="text" value={editNombre} onChange={e => setEditNombre(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-sm"
                style={{ border: `1px solid ${editNombre.trim() ? '#E5E5E5' : '#FCA5A5'}`, backgroundColor: '#FAFAFA', color: '#0A0A0A', outline: 'none', fontFamily: 'var(--font-body)' }}
              />
            ) : (
              <div onClick={handleStartEdit} className="px-4 py-2.5 rounded-xl cursor-pointer transition-colors"
                style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E5E5', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F0F0F0'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#F9FAFB'}
              >{nombre}</div>
            )}
          </div>

          {/* Teléfono */}
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
              Teléfono
            </label>
            {isEditing ? (
              <div className="flex gap-2">
                <select value={phoneCode} onChange={e => setPhoneCode(e.target.value)}
                  className="px-2 py-2.5 rounded-xl text-sm"
                  style={{ width: '110px', flexShrink: 0, border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA', color: '#0A0A0A', fontFamily: 'var(--font-body)', outline: 'none' }}
                >
                  {phoneCodes.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <input type="tel" value={editTelefono} onChange={e => setEditTelefono(e.target.value)} placeholder="9 1234 5678"
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm"
                  style={{ border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA', color: '#0A0A0A', outline: 'none', fontFamily: 'var(--font-body)' }}
                />
              </div>
            ) : (
              <div onClick={handleStartEdit} className="px-4 py-2.5 rounded-xl cursor-pointer transition-colors"
                style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E5E5', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: telefono ? '#0A0A0A' : '#9CA3AF' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F0F0F0'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#F9FAFB'}
              >{telefono ? `${phoneCode} ${telefono}` : 'Sin teléfono'}</div>
            )}
          </div>

          {/* Email */}
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
              Correo electrónico
            </label>
            <div className="relative">
              <div onMouseEnter={() => setShowEmailTooltip(true)} onMouseLeave={() => setShowEmailTooltip(false)}
                className="px-4 py-2.5 rounded-xl flex items-center justify-between"
                style={{ backgroundColor: '#F3F4F6', border: '1px solid #E5E5E5', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#9CA3AF', cursor: 'not-allowed' }}
              >
                <span>{email}</span>
                <svg viewBox="0 0 24 24" style={{ width: '14px', height: '14px', fill: 'none', stroke: '#9CA3AF', strokeWidth: 2, flexShrink: 0 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              {showEmailTooltip && (
                <div className="absolute left-0 -top-9 px-3 py-1.5 rounded-lg whitespace-nowrap z-10" style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)' }}>
                  El email no se puede modificar
                </div>
              )}
            </div>
          </div>

          {/* Región */}
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
              Región
            </label>
            {isEditing ? (
              <select value={editRegion} onChange={e => setEditRegion(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-sm"
                style={{ border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA', color: '#0A0A0A', outline: 'none', fontFamily: 'var(--font-body)' }}
              >
                <option value="">Sin especificar</option>
                {regiones.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            ) : (
              <div onClick={handleStartEdit} className="px-4 py-2.5 rounded-xl cursor-pointer transition-colors"
                style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E5E5', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: region ? '#0A0A0A' : '#9CA3AF' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F0F0F0'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#F9FAFB'}
              >{region || 'Sin especificar'}</div>
            )}
          </div>
        </div>

        {/* Contraseña */}
        {!isGoogleAccount && isEditing && (
          <div>
            <button onClick={() => setShowPasswordSection(!showPasswordSection)}
              className="flex items-center gap-2 text-sm"
              style={{ color: '#006B4E', fontFamily: 'var(--font-body)', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <svg viewBox="0 0 24 24" style={{ width: '15px', height: '15px', fill: 'none', stroke: '#006B4E', strokeWidth: 2, transform: showPasswordSection ? 'rotate(90deg)' : 'none', transition: 'transform 150ms' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              Cambiar contraseña
            </button>
            {showPasswordSection && (
              <div className="mt-4 space-y-3 p-4 rounded-xl" style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E5E5' }}>
                {[
                  { label: 'Contraseña actual', value: currentPassword, setter: setCurrentPassword, show: showCurrentPwd, toggleShow: () => setShowCurrentPwd(v => !v) },
                  { label: 'Nueva contraseña', value: newPassword, setter: setNewPassword, show: showNewPwd, toggleShow: () => setShowNewPwd(v => !v) },
                  { label: 'Confirmar nueva contraseña', value: confirmPassword, setter: setConfirmPassword, show: showConfirmPwd, toggleShow: () => setShowConfirmPwd(v => !v) },
                ].map(({ label, value, setter, show, toggleShow }) => (
                  <div key={label}>
                    <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>{label}</label>
                    <div className="relative">
                      <input type={show ? 'text' : 'password'} value={value} onChange={e => setter(e.target.value)}
                        className="w-full px-4 py-2.5 pr-10 rounded-xl text-sm"
                        style={{ border: '1px solid #E5E5E5', backgroundColor: '#FFFFFF', color: '#0A0A0A', outline: 'none', fontFamily: 'var(--font-body)' }}
                      />
                      <button type="button" onClick={toggleShow} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                        <svg viewBox="0 0 24 24" style={{ width: '16px', height: '16px', fill: 'none', stroke: '#9CA3AF', strokeWidth: 2 }}>
                          {show ? <><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></> : <><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></>}
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
                {newPassword && confirmPassword && newPassword !== confirmPassword && (
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#DC2626' }}>Las contraseñas no coinciden</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Guardar / Cancelar */}
        {isEditing && (
          <div className="flex gap-3 pt-1">
            <button onClick={handleCancel} className="px-5 py-2.5 rounded-full text-sm font-medium transition-all"
              style={{ backgroundColor: '#F5F5F5', color: '#374151', fontFamily: 'var(--font-body)' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#E5E5E5'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#F5F5F5'}
            >
              Cancelar
            </button>
            <button onClick={handleSave} disabled={!canSave} className="flex-1 py-2.5 rounded-full text-sm font-medium transition-all"
              style={{ backgroundColor: canSave ? '#006B4E' : '#E5E5E5', color: canSave ? '#FFFFFF' : '#9CA3AF', fontFamily: 'var(--font-body)', cursor: canSave ? 'pointer' : 'not-allowed' }}
              onMouseEnter={e => { if (canSave) e.currentTarget.style.backgroundColor = '#01533E'; }}
              onMouseLeave={e => { if (canSave) e.currentTarget.style.backgroundColor = '#006B4E'; }}
            >
              Guardar cambios
            </button>
          </div>
        )}
      </section>

      {/* Grid inferior: Preferencias + Cuenta | Notificaciones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">

        {/* Columna izquierda: Cuenta + Preferencias */}
        <div className="space-y-5">
          {/* Cuenta */}
          <section className="rounded-2xl p-5" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h3)', fontWeight: 500, color: '#0A0A0A', lineHeight: 'var(--line-height-heading)', marginBottom: '8px' }}>
              Cuenta
            </h2>
            <div style={{ borderTop: '1px solid #F5F5F5' }}>
              {[
                { label: 'Cambiar contraseña', icon: <Lock className="w-4 h-4" />, color: '#374151' },
                { label: 'Privacidad y datos', icon: <Shield className="w-4 h-4" />, color: '#374151' },
              ].map(item => (
                <button key={item.label} className="w-full flex items-center justify-between py-3.5 transition-colors"
                  style={{ borderBottom: '1px solid #F5F5F5', background: 'none', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FAFAFA'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div className="flex items-center gap-3">
                    <span style={{ color: '#737373' }}>{item.icon}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: item.color }}>{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4" style={{ color: '#A3A3A3' }} />
                </button>
              ))}
              <button className="w-full flex items-center justify-between py-3.5 transition-colors"
                style={{ background: 'none', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FEF2F2'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div className="flex items-center gap-3">
                  <LogOut className="w-4 h-4" style={{ color: '#EF4444' }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#EF4444' }}>Cerrar sesión</span>
                </div>
                <ChevronRight className="w-4 h-4" style={{ color: '#FCA5A5' }} />
              </button>
            </div>
          </section>

          {/* Preferencias de búsqueda */}
          <section className="rounded-2xl p-5" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(0, 107, 78, 0.08)' }}>
                <Search className="w-4 h-4" style={{ color: '#006B4E' }} />
              </div>
              <div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h3)', fontWeight: 500, color: '#0A0A0A', lineHeight: 'var(--line-height-heading)' }}>
                  Preferencias de búsqueda
                </h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#737373', marginTop: '3px' }}>
                  Configura tus criterios predeterminados
                </p>
              </div>
            </div>
            <button className="w-full py-2.5 px-4 rounded-full transition-all text-center"
              style={{ backgroundColor: '#FFFFFF', color: '#0A0A0A', border: '1px solid #DEDEDE', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500 }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FAFAFA'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}
            >
              Configurar preferencias
            </button>
          </section>
        </div>

        {/* Notificaciones */}
        <section className="rounded-2xl p-5" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h3)', fontWeight: 500, color: '#0A0A0A', lineHeight: 'var(--line-height-heading)', marginBottom: '16px' }}>
            Notificaciones
          </h2>
          <div style={{ borderTop: '1px solid #F5F5F5' }}>
            {[
              { label: 'Consultas y visitas por correo', desc: 'Recibir notificaciones al email sobre nuevas consultas', toggle: true, active: emailNotifConsultas, onToggle: () => setEmailNotifConsultas(v => !v) },
              { label: 'Nuevas parcelas', desc: 'Recibir alertas de nuevas publicaciones', toggle: false },
              { label: 'Cambios de precio', desc: 'Notificar si cambia el precio de favoritos', toggle: false },
              { label: 'Consejos y recomendaciones', desc: 'Recibir tips para compradores', toggle: false },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between py-3.5" style={{ borderBottom: '1px solid #F5F5F5' }}>
                <div className="pr-4">
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#0A0A0A' }}>{item.label}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#737373', marginTop: '2px' }}>{item.desc}</p>
                </div>
                {item.toggle ? (
                  <button onClick={item.onToggle} className="flex-shrink-0 w-11 h-6 rounded-full transition-colors relative" style={{ backgroundColor: item.active ? '#006B4E' : '#D1D5DB', minWidth: 44 }}>
                    <div className="w-4 h-4 bg-white rounded-full shadow absolute top-1 transition-all" style={{ left: item.active ? 'calc(100% - 20px)' : 4 }} />
                  </button>
                ) : (
                  <div className="flex-shrink-0 w-11 h-6 rounded-full" style={{ backgroundColor: '#E5E5E5', minWidth: 44 }}>
                    <div className="w-4 h-4 bg-white rounded-full shadow mt-1 ml-1" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}