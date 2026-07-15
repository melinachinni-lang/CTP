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
      ],
    },
    {
      key: 'gestion', label: 'Gestión',
      items: [
        { id: 'reservas',    label: 'Valores de reservas', icon: FileText },
        { id: 'asignaciones',label: 'Asignaciones',        icon: Users },
        { id: 'whatsapp',    label: 'Números WhatsApp',    icon: Phone },
        { id: 'calendarios', label: 'Calendarios',         icon: Calendar },
      ],
    },
    {
      key: 'interacciones', label: 'Actividad',
      items: [
        { id: 'inquiries',     label: 'Consultas',     icon: MessageCircle },
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
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(t);
  }, []);

  function handleActualizar() {
    setLoading(true); setError(false);
    setTimeout(() => { setLoading(false); if (Math.random() < 0.35) setError(true); }, 1400);
  }

  const kpis = [
    { label: 'Publicaciones activas',  value: '12',    change: '+3',     up: true,  bg: '#E8F5EE', color: '#006B4E', Icon: FolderOpen    },
    { label: 'Consultas este mes',     value: '77',    change: '+12%',   up: true,  bg: '#EFF6FF', color: '#2563EB', Icon: MessageCircle },
    { label: 'Reservas confirmadas',   value: '4',     change: '+1',     up: true,  bg: '#F5F3FF', color: '#7C3AED', Icon: FileText      },
    { label: 'Tasa de conversión',     value: '3.4%',  change: '+0.2pp', up: true,  bg: '#FFF7ED', color: '#C2410C', Icon: TrendingUp    },
  ];

  const accesos = [
    { label: 'Publicar nueva parcela',          Icon: Plus,          action: () => { setCurrentSection('my-publications'); setTriggerPublishModal(n => n + 1); } },
    { label: 'Responder consultas pendientes',  Icon: MessageCircle, action: () => setCurrentSection('inquiries') },
    { label: 'Agregar número de WhatsApp',       Icon: Phone,         action: () => setCurrentSection('whatsapp') },
    { label: 'Asignar consulta a broker',       Icon: Users,         action: () => setCurrentSection('asignaciones') },
    { label: 'Usuarios y permisos',             Icon: Users,         action: () => setCurrentSection('team') },
  ];

  const actividad = [
    { Icon: CheckCircle,   color: '#006B4E', text: 'Nueva consulta en "Parcela Vista Cordillera"',      time: 'Hace 15 min' },
    { Icon: FileText,      color: '#7C3AED', text: 'Reserva confirmada — Parcela Los Cedros',            time: 'Hace 2h' },
    { Icon: Heart,         color: '#DC2626', text: '3 nuevos favoritos en "Proyecto Vista Cordillera"',  time: 'Hace 3h' },
    { Icon: MessageCircle, color: '#2563EB', text: 'Nueva consulta en Terreno Valle Central',            time: 'Ayer, 16:30' },
    { Icon: CalendarDays,  color: '#0D9488', text: 'Cita agendada con Ana García — Mañana 11:00',        time: 'Ayer, 14:20' },
  ];

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, color: '#0A0A0A', margin: '0 0 4px' }}>Bienvenido, Propiedades del Sur</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#737373' }}>Visión general de tu cuenta en CompraTuParcela.</p>
        </div>
        <button onClick={handleActualizar} className="flex items-center gap-2 px-4 py-2 rounded-[200px] text-sm transition-colors flex-shrink-0" style={{ color: '#006B4E', backgroundColor: '#E8F5EE', border: '1px solid #B2D8C5', fontFamily: 'var(--font-body)', fontWeight: 500 }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#D4EDDF'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#E8F5EE'; }}>
          <Zap className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Actualizar datos
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-6" style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA' }}>
          <AlertCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#DC2626' }} />
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#DC2626', margin: 0, flex: 1 }}>No se pudieron actualizar los datos. Verifica tu conexión e intenta nuevamente.</p>
          <button onClick={handleActualizar} style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#DC2626', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Reintentar</button>
        </div>
      )}

      <div className="mb-8">
        <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#737373', fontFamily: 'var(--font-body)', marginBottom: '12px' }}>Tu actividad</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {loading ? [1,2,3,4].map(i => (
            <div key={i} className="rounded-2xl p-5" style={{ border: '1px solid #E5E5E5', backgroundColor: '#FFFFFF' }}>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl animate-pulse" style={{ backgroundColor: '#F0F0F0' }} />
                <div className="h-5 w-14 rounded-full animate-pulse" style={{ backgroundColor: '#F0F0F0' }} />
              </div>
              <div className="h-7 w-20 rounded-lg animate-pulse mb-2" style={{ backgroundColor: '#F0F0F0' }} />
              <div className="h-3 w-32 rounded-full animate-pulse" style={{ backgroundColor: '#F0F0F0' }} />
            </div>
          )) : kpis.map(({ label, value, change, up, bg, color, Icon }) => (
            <div key={label} className="rounded-2xl p-3 md:p-5" style={{ border: '1px solid #E5E5E5', backgroundColor: '#FFFFFF' }}>
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: bg }}>
                  <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" style={{ color }} />
                </div>
                <span className="flex items-center gap-0.5 flex-shrink-0" style={{ fontSize: '10px', fontWeight: 600, fontFamily: 'var(--font-body)', color: up ? '#006B4E' : '#E53E3E', backgroundColor: up ? '#E8F5EE' : '#FEE2E2', padding: '2px 5px', borderRadius: '99px', whiteSpace: 'nowrap' }}>
                  {up ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />}{change}
                </span>
              </div>
              <p className="text-xl md:text-[26px]" style={{ fontWeight: 700, color: '#0A0A0A', fontFamily: 'var(--font-heading)', margin: '0 0 2px' }}>{value}</p>
              <p style={{ fontSize: '11px', color: '#737373', fontFamily: 'var(--font-body)', margin: 0 }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl p-6" style={{ border: '1px solid #E5E5E5' }}>
          <p style={{ fontSize: '14px', fontWeight: 700, color: '#0A0A0A', fontFamily: 'var(--font-heading)', margin: '0 0 16px' }}>Accesos rápidos</p>
          <div className="space-y-2">
            {accesos.map(({ label, Icon, action }) => (
              <button key={label} onClick={action} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left" style={{ backgroundColor: '#FAFAFA', color: '#0A0A0A', fontFamily: 'var(--font-body)', fontSize: '13px' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#F0F9F5'; e.currentTarget.style.color = '#006B4E'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#FAFAFA'; e.currentTarget.style.color = '#0A0A0A'; }}>
                <Icon className="w-4 h-4 flex-shrink-0" />{label}
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 rounded-2xl p-6" style={{ border: '1px solid #E5E5E5' }}>
          <p style={{ fontSize: '14px', fontWeight: 700, color: '#0A0A0A', fontFamily: 'var(--font-heading)', margin: '0 0 16px' }}>Actividad reciente</p>
          {loading ? (
            <div className="space-y-4">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full animate-pulse flex-shrink-0 mt-0.5" style={{ backgroundColor: '#F0F0F0' }} />
                  <div className="flex-1">
                    <div className="h-3 rounded-full animate-pulse mb-1.5" style={{ backgroundColor: '#F0F0F0', width: '75%' }} />
                    <div className="h-2.5 rounded-full animate-pulse" style={{ backgroundColor: '#F0F0F0', width: '35%' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {actividad.map(({ Icon, color, text, time }, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: color + '18' }}>
                    <Icon className="w-3.5 h-3.5" style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: '13px', color: '#0A0A0A', fontFamily: 'var(--font-body)', margin: 0 }}>{text}</p>
                    <p style={{ fontSize: '11px', color: '#A0A0A0', fontFamily: 'var(--font-body)', marginTop: '2px' }}>{time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
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
  const [invoiceRange, setInvoiceRange] = React.useState<{ from: string; to: string } | null>(null);
  const [showRangoDropdown, setShowRangoDropdown] = React.useState(false);
  const [rangoFrom, setRangoFrom] = React.useState('');
  const [rangoTo, setRangoTo] = React.useState('');
  const rangoRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handler = (e: MouseEvent) => { if (rangoRef.current && !rangoRef.current.contains(e.target as Node)) setShowRangoDropdown(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  const [invoicesLoading, setInvoicesLoading] = React.useState(true);
  React.useEffect(() => { const t = setTimeout(() => setInvoicesLoading(false), 1400); return () => clearTimeout(t); }, []);
  const [planCancelled, setPlanCancelled] = React.useState(false);
  const [invoiceError, setInvoiceError] = React.useState(false);
  const [paymentError, setPaymentError] = React.useState(false);

  const plans = [
    {
      id: 'bronce',
      name: 'Bronce',
      price: '$150.000',
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
      price: '$300.000',
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
      price: '$600.000',
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

  const usageLimits: Record<string, Array<{ label: string; used: number; limit: number }>> = {
    bronce: [
      { label: 'Parcelas publicadas',       used: 7,  limit: 10 },
      { label: 'Publicaciones destacadas',  used: 2,  limit: 2  },
    ],
    plata: [
      { label: 'Parcelas publicadas',       used: 18, limit: 30 },
      { label: 'Publicaciones destacadas',  used: 3,  limit: 5  },
    ],
    oro: [
      { label: 'Parcelas publicadas',       used: 47, limit: -1 },
      { label: 'Publicaciones destacadas',  used: 9,  limit: 15 },
    ],
  };

  const [invoices, setInvoices] = React.useState([
    { id: 'INV-2025-001', date: '28 Ene 2025', reason: 'Ciclo de suscripción - Plan Oro', reasonType: 'subscription', amount: '$89.990' },
    { id: 'INV-2024-012', date: '28 Dic 2024', reason: 'Ciclo de suscripción - Plan Oro', reasonType: 'subscription', amount: '$89.990' },
    { id: 'INV-2024-011', date: '28 Nov 2024', reason: 'Ciclo de suscripción - Plan Oro', reasonType: 'subscription', amount: '$89.990' },
    { id: 'INV-2024-010', date: '28 Oct 2024', reason: 'Upgrade a Plan Oro', reasonType: 'upgrade', amount: '$89.990' },
    { id: 'INV-2024-009', date: '28 Sep 2024', reason: 'Ciclo de suscripción - Plan Plata', reasonType: 'subscription', amount: '$49.990' },
    { id: 'INV-2024-008', date: '28 Ago 2024', reason: 'Creación de suscripción - Plan Plata', reasonType: 'creation', amount: '$49.990' }
  ]);

  const invoiceMonthMap: Record<string, string> = { ene: '01', feb: '02', mar: '03', abr: '04', may: '05', jun: '06', jul: '07', ago: '08', sep: '09', oct: '10', nov: '11', dic: '12' };
  const parseInvoiceDate = (date: string) => { const p = date.toLowerCase().split(' '); return p.length >= 3 ? `${p[2]}-${invoiceMonthMap[p[1]] || '01'}-${p[0].padStart(2, '0')}` : ''; };
  const formatRangeLabel = (from: string, to: string) => { const fmt = (d: string) => { const [y, m, day] = d.split('-'); return `${day}/${m}/${y.slice(2)}`; }; if (from && !to) return `Desde ${fmt(from)}`; if (!from && to) return `Hasta ${fmt(to)}`; return `${fmt(from)} – ${fmt(to)}`; };
  const filteredInvoices = invoiceRange ? invoices.filter((inv) => { const d = parseInvoiceDate(inv.date); if (invoiceRange.from && d < invoiceRange.from) return false; if (invoiceRange.to && d > invoiceRange.to) return false; return true; }) : invoices;

  const handleDownload = (invoiceId: string) => console.log(`Descargando factura ${invoiceId}`);
  const handleCancelPlan = () => {
    setPlanCancelled(true);
    setInvoices(prev => [
      { id: 'INV-2025-CANCEL', date: '14 Feb 2025', reason: 'Cancelación de suscripción', reasonType: 'cancellation', amount: '$0' },
      ...prev
    ]);
    setShowCancelModal(false);
  };
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
      case 'cancellation': return { backgroundColor: '#FEE2E2', color: '#DC2626' };
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
    <main className="px-4 py-6 md:px-8 md:py-8 space-y-8">
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
      <section className="rounded-2xl p-6 md:p-8" style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF' }}>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-6 h-6" style={{ color: '#FFFFFF' }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Tu plan actual</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h2)', fontWeight: 'var(--font-weight-semibold)', lineHeight: 'var(--line-height-heading)', color: '#FFFFFF' }}>Plan {currentPlanData?.name}</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', color: '#C3C3C3', marginTop: '8px' }}>Perfil: Inmobiliaria</p>
          </div>
          {planCancelled ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full self-start" style={{ backgroundColor: '#FEF3C7' }}>
              <AlertCircle className="w-4 h-4" style={{ color: '#D97706' }} />
              <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>Cancelado · activo hasta 28 Feb 2025</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full self-start" style={{ backgroundColor: '#16A34A' }}>
              <CheckCircle className="w-4 h-4" style={{ color: '#FFFFFF' }} />
              <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Activo</span>
            </div>
          )}
        </div>
        <button onClick={() => document.getElementById('re-compara-planes')?.scrollIntoView({ behavior: 'smooth' })} className="py-2.5 px-6 transition-all" style={{ backgroundColor: '#FFFFFF', color: '#0A0A0A', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-wide)', lineHeight: 'var(--line-height-ui)', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#E8E7E6'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; }}>Ver otros planes</button>
      </section>
      <section className="rounded-2xl p-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-h4)', lineHeight: 'var(--line-height-heading)', color: 'var(--foreground)', marginBottom: '24px' }}>Beneficios de tu plan</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
      <section className="rounded-2xl p-6 md:p-8" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-h3)', lineHeight: 'var(--line-height-heading)', color: 'var(--foreground)', marginBottom: '24px' }}>Uso del plan</h3>
        <div className="space-y-5">
          {(usageLimits[currentPlan] || []).map(({ label, used, limit }) => {
            const pct = limit === -1 ? 0 : Math.round((used / limit) * 100);
            const barColor = pct >= 100 ? '#DC2626' : pct >= 80 ? '#F59E0B' : '#006B4E';
            return (
              <div key={label}>
                <div className="flex items-center justify-between" style={{ marginBottom: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: 'var(--foreground)' }}>{label}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: limit === -1 ? '#006B4E' : pct >= 100 ? '#DC2626' : '#0A0A0A' }}>
                    {limit === -1 ? 'Ilimitado' : `${used} de ${limit}`}
                  </span>
                </div>
                {limit !== -1 ? (
                  <div className="w-full rounded-full" style={{ height: '6px', backgroundColor: '#F0F0F0' }}>
                    <div className="rounded-full" style={{ height: '6px', width: `${Math.min(pct, 100)}%`, backgroundColor: barColor }} />
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#006B4E' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#737373' }}>Sin límite en tu plan actual</span>
                  </div>
                )}
                {pct >= 100 && limit !== -1 && (
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#DC2626', marginTop: '4px' }}>Límite alcanzado · considera actualizar tu plan</p>
                )}
                {pct >= 80 && pct < 100 && limit !== -1 && (
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#92400E', marginTop: '4px' }}>Cerca del límite</p>
                )}
              </div>
            );
          })}
        </div>
      </section>
      <section id="re-compara-planes">
        <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-h3)', lineHeight: 'var(--line-height-heading)', color: 'var(--foreground)', marginBottom: '24px' }}>Compara planes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isActive = plan.id === currentPlan;
            const isHigher = currentPlan === 'bronce' && (plan.id === 'plata' || plan.id === 'oro') || currentPlan === 'plata' && plan.id === 'oro';
            return (
              <div key={plan.id} className="rounded-2xl p-6 flex flex-col" style={{ backgroundColor: '#FFFFFF', border: isActive ? '2px solid #0A0A0A' : '1px solid #E5E5E5', boxShadow: isActive ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                <div className="mb-6">
                  {isActive && (<div className="flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full inline-flex" style={{ backgroundColor: '#0A0A0A' }}><Star className="w-3.5 h-3.5" style={{ color: '#FFFFFF' }} /><span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Plan actual</span></div>)}
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-h3)', lineHeight: 'var(--line-height-heading)', color: 'var(--foreground)', marginBottom: '4px' }}>{plan.name}</h4>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', lineHeight: '1.5', marginBottom: '10px' }}>{plan.description}</p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '22px', color: '#0A0A0A' }}>{plan.price}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#737373' }}>/mes</span>
                  </div>
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-h3)', lineHeight: 'var(--line-height-heading)', color: 'var(--foreground)', marginBottom: '8px' }}>Historial de facturación</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', lineHeight: 'var(--line-height-body)' }}>Consulta y descarga tus facturas anteriores</p>
          </div>
          {!planCancelled && (
            <button onClick={() => setShowCancelModal(true)} className="px-6 py-2.5 transition-all self-start sm:self-auto" style={{ backgroundColor: '#FFFFFF', color: '#737373', border: '2px solid #DEDEDE', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-wide)', lineHeight: 'var(--line-height-ui)', whiteSpace: 'nowrap' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FEE2E2'; e.currentTarget.style.borderColor = '#DC2626'; e.currentTarget.style.color = '#DC2626'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.borderColor = '#DEDEDE'; e.currentTarget.style.color = '#737373'; }}>Cancelar suscripción</button>
          )}
        </div>
        <div className="flex items-center gap-3">
        <button onClick={() => setInvoiceError(v => !v)} style={{ fontSize: '11px', color: '#A3A3A3', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}>{invoiceError ? 'Ocultar error' : 'Simular error de carga'}</button>
        <div className="relative" ref={rangoRef}>
          <button onClick={() => setShowRangoDropdown(v => !v)} className="flex items-center gap-1.5 px-3 py-2 rounded-xl" style={{ border: `1px solid ${invoiceRange ? '#006B4E' : '#E5E5E5'}`, backgroundColor: invoiceRange ? '#E8F5EE' : '#FAFAFA', fontFamily: 'var(--font-body)', fontSize: '13px', color: invoiceRange ? '#006B4E' : '#374151', cursor: 'pointer', fontWeight: invoiceRange ? 600 : 400 }}>
            <CalendarDays className="w-3.5 h-3.5" />
            {invoiceRange ? formatRangeLabel(invoiceRange.from, invoiceRange.to) : 'Rango'}
          </button>
          {showRangoDropdown && (
            <div className="absolute right-0 top-full mt-1 z-50 rounded-xl p-4" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 4px 16px rgba(0,0,0,0.10)', minWidth: '240px' }}>
              <p style={{ fontSize: '12px', fontWeight: 600, color: '#374151', fontFamily: 'var(--font-body)', marginBottom: '12px' }}>Rango personalizado</p>
              <div className="flex flex-col gap-3 mb-4">
                <div>
                  <label style={{ fontSize: '11px', color: '#9CA3AF', fontFamily: 'var(--font-body)', display: 'block', marginBottom: '4px' }}>Desde</label>
                  <input type="date" value={rangoFrom} onChange={e => setRangoFrom(e.target.value)} style={{ width: '100%', border: '1px solid #E5E5E5', borderRadius: '8px', padding: '6px 10px', fontSize: '13px', fontFamily: 'var(--font-body)', color: '#0A0A0A', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ fontSize: '11px', color: '#9CA3AF', fontFamily: 'var(--font-body)', display: 'block', marginBottom: '4px' }}>Hasta</label>
                  <input type="date" value={rangoTo} min={rangoFrom} onChange={e => setRangoTo(e.target.value)} style={{ width: '100%', border: '1px solid #E5E5E5', borderRadius: '8px', padding: '6px 10px', fontSize: '13px', fontFamily: 'var(--font-body)', color: '#0A0A0A', outline: 'none' }} />
                </div>
              </div>
              <div className="flex gap-2">
                {invoiceRange && (
                  <button onClick={() => { setInvoiceRange(null); setRangoFrom(''); setRangoTo(''); setShowRangoDropdown(false); }} style={{ flex: 1, fontSize: '12px', fontWeight: 600, color: '#DC2626', borderRadius: '200px', border: '1px solid #FECACA', backgroundColor: '#FFF5F5', padding: '7px 0', cursor: 'pointer' }}>Limpiar</button>
                )}
                <button onClick={() => { if (rangoFrom || rangoTo) { setInvoiceRange({ from: rangoFrom, to: rangoTo }); setShowRangoDropdown(false); } }} disabled={!rangoFrom && !rangoTo} style={{ flex: 1, fontSize: '12px', fontWeight: 600, color: '#FFFFFF', borderRadius: '200px', backgroundColor: (rangoFrom || rangoTo) ? '#006B4E' : '#D1D5DB', padding: '7px 0', border: 'none', cursor: (rangoFrom || rangoTo) ? 'pointer' : 'not-allowed' }}>Aplicar</button>
              </div>
            </div>
          )}
        </div>
        </div>
        <div className="rounded-xl" style={{ border: '2px solid #DEDEDE', overflow: 'hidden' }}><div className="overflow-x-auto"><div style={{ minWidth: '680px' }}>
          <div className="grid grid-cols-12 gap-4 px-6 py-4" style={{ backgroundColor: '#FAFAFA', borderBottom: '1px solid #DEDEDE' }}>
            <div className="col-span-2"><span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#737373', letterSpacing: 'var(--letter-spacing-wide)', textTransform: 'uppercase' }}>Fecha</span></div>
            <div className="col-span-5"><span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#737373', letterSpacing: 'var(--letter-spacing-wide)', textTransform: 'uppercase' }}>Motivo</span></div>
            <div className="col-span-3"><span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#737373', letterSpacing: 'var(--letter-spacing-wide)', textTransform: 'uppercase' }}>Monto</span></div>
            <div className="col-span-2 text-right"><span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#737373', letterSpacing: 'var(--letter-spacing-wide)', textTransform: 'uppercase' }}>Acción</span></div>
          </div>
          <div>
            {invoicesLoading ? (
              <>{[1,2,3].map(i => (
                <div key={i} className="grid grid-cols-12 gap-4 px-6 py-5" style={{ borderBottom: i < 3 ? '1px solid #DEDEDE' : 'none' }}>
                  <div className="col-span-2 flex items-center"><div className="h-3.5 rounded-full animate-pulse" style={{ width: '72%', backgroundColor: '#F0F0F0' }} /></div>
                  <div className="col-span-5 flex items-center"><div className="h-6 rounded-full animate-pulse" style={{ width: '78%', backgroundColor: '#F0F0F0' }} /></div>
                  <div className="col-span-3 flex items-center"><div className="h-3.5 rounded-full animate-pulse" style={{ width: '54%', backgroundColor: '#F0F0F0' }} /></div>
                  <div className="col-span-2 flex items-center justify-end"><div className="h-8 rounded-full animate-pulse" style={{ width: '80px', backgroundColor: '#F0F0F0' }} /></div>
                </div>
              ))}</>
            ) : invoiceError ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: '#FEF2F2' }}>
                  <AlertCircle className="w-6 h-6" style={{ color: '#DC2626' }} />
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', fontWeight: 600, color: 'var(--foreground)', marginBottom: '4px' }}>No se pudo cargar el historial</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', marginBottom: '16px' }}>Ocurrió un error al obtener tus facturas. Intenta nuevamente.</p>
                <button onClick={() => { setInvoiceError(false); setInvoicesLoading(true); setTimeout(() => setInvoicesLoading(false), 1400); }} className="px-6 py-2 transition-all" style={{ backgroundColor: '#006B4E', color: '#FFFFFF', border: 'none', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#01533E'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#006B4E'}>Reintentar</button>
              </div>
            ) : filteredInvoices.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: '#F5F5F5' }}>
                  <CalendarDays className="w-6 h-6" style={{ color: '#A3A3A3' }} />
                </div>
                {invoiceRange ? (
                  <>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', fontWeight: 600, color: 'var(--foreground)', marginBottom: '4px' }}>Sin facturas en este período</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>Prueba con otro rango de fechas</p>
                  </>
                ) : (
                  <>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', fontWeight: 600, color: 'var(--foreground)', marginBottom: '4px' }}>Aún no tienes facturas</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>Tus facturas aparecerán aquí cuando realices tu primer pago</p>
                  </>
                )}
              </div>
            ) : filteredInvoices.map((invoice, index) => (
              <div key={invoice.id} className="grid grid-cols-12 gap-4 px-6 py-5 transition-colors" style={{ borderBottom: index < filteredInvoices.length - 1 ? '1px solid #DEDEDE' : 'none' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FAFAFA'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
                <div className="col-span-2 flex items-center"><span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-regular)', color: '#737373', lineHeight: 'var(--line-height-ui)' }}>{invoice.date}</span></div>
                <div className="col-span-5 flex items-center"><span className="inline-flex items-center px-3 py-1.5 rounded-full" style={{ ...getReasonBadgeStyle(invoice.reasonType), fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', lineHeight: 'var(--line-height-ui)' }}>{invoice.reason}</span></div>
                <div className="col-span-3 flex items-center"><span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', lineHeight: 'var(--line-height-ui)' }}>{invoice.amount}</span></div>
                <div className="col-span-2 flex items-center justify-end"><button onClick={() => handleDownload(invoice.id)} className="inline-flex items-center gap-2 px-4 py-2 transition-all" style={{ backgroundColor: '#FFFFFF', color: 'var(--foreground)', border: '1px solid #DEDEDE', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-wide)', lineHeight: 'var(--line-height-ui)' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0A0A0A'; e.currentTarget.style.color = '#FFFFFF'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.color = 'var(--foreground)'; }}><CreditCard className="w-4 h-4" />Descargar</button></div>
              </div>
            ))}
          </div>
        </div></div></div>
      </section>
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onClick={() => setShowCancelModal(false)}>
          <div className="bg-white rounded-xl p-8 max-w-md w-full" style={{ border: '2px solid #DEDEDE' }} onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#FEE2E2' }}><AlertCircle className="w-7 h-7" style={{ color: '#DC2626' }} /></div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-h3)', color: 'var(--foreground)', lineHeight: 'var(--line-height-heading)', marginBottom: '8px' }}>¿Cancelar tu suscripción?</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', lineHeight: 'var(--line-height-body)' }}>Tu plan seguirá activo hasta el <strong>28 Feb 2025</strong>. Después perderás acceso a las funcionalidades premium.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => setShowCancelModal(false)} className="flex-1 px-6 py-3 transition-all" style={{ backgroundColor: '#006B4E', color: '#FFFFFF', border: '2px solid #006B4E', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', lineHeight: 'var(--line-height-ui)' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#01533E'; e.currentTarget.style.borderColor = '#01533E'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#006B4E'; e.currentTarget.style.borderColor = '#006B4E'; }}>Mantener plan</button>
              <button onClick={handleCancelPlan} className="flex-1 px-6 py-3 transition-all" style={{ backgroundColor: '#FFFFFF', color: '#DC2626', border: '2px solid #DEDEDE', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', lineHeight: 'var(--line-height-ui)' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FEE2E2'; e.currentTarget.style.borderColor = '#DC2626'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.borderColor = '#DEDEDE'; }}>Sí, cancelar</button>
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
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => { setShowUpgradeModal(false); setPendingPlan(null); }} className="flex-1 px-6 py-3 transition-all" style={{ backgroundColor: '#FFFFFF', color: 'var(--foreground)', border: '2px solid #DEDEDE', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F5F5F5'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}>Cancelar</button>
              <button onClick={() => { setShowUpgradeModal(false); setShowPaymentModal(true); }} className="flex-1 px-6 py-3 transition-all" style={{ backgroundColor: '#006B4E', color: '#FFFFFF', border: '2px solid #006B4E', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#01533E'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}>Contratar</button>
            </div>
          </div>
        </div>
      )}
      {showPaymentModal && pendingPlanData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={() => { setShowPaymentModal(false); setPendingPlan(null); setPaymentMethod(null); setBillingPeriod('monthly'); }}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full my-4 max-h-[90vh] overflow-y-auto" style={{ border: '1px solid #E5E5E5', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }} onClick={e => e.stopPropagation()}>
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
            {paymentError && (
              <div className="flex items-start gap-3 rounded-xl p-4 mb-4" style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA' }}>
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#DC2626' }} />
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#DC2626', marginBottom: '2px' }}>No se pudo procesar el pago</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#B91C1C', lineHeight: '1.4' }}>Verifica los datos de tu tarjeta e intenta nuevamente.</p>
                </div>
              </div>
            )}
            <div className="flex gap-3">
              <button onClick={() => { setShowPaymentModal(false); setPendingPlan(null); setPaymentMethod(null); setBillingPeriod('monthly'); setPaymentError(false); }} className="flex-1 px-6 py-3 transition-all" style={{ backgroundColor: '#FFFFFF', color: 'var(--foreground)', border: '2px solid #DEDEDE', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F5F5F5'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}>Cancelar</button>
              <button onClick={() => { if (paymentError) { handleUpgrade(); setPaymentError(false); } else { setPaymentError(true); } }} disabled={!paymentMethod} className="flex-1 px-6 py-3 transition-all" style={{ backgroundColor: paymentMethod ? '#006B4E' : '#E5E5E5', color: paymentMethod ? '#FFFFFF' : '#A3A3A3', border: 'none', borderRadius: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 'var(--font-weight-medium)', cursor: paymentMethod ? 'pointer' : 'not-allowed' }} onMouseEnter={e => { if (paymentMethod) e.currentTarget.style.backgroundColor = '#01533E'; }} onMouseLeave={e => { if (paymentMethod) e.currentTarget.style.backgroundColor = '#006B4E'; }}>{paymentError ? 'Reintentar' : 'Pagar'}</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// HelpContent is now imported from HelpContent.tsx

// SettingsContent is now imported from SettingsContent.tsx
