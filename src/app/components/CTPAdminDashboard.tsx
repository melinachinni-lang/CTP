import React, { useState } from 'react';
import {
  Home, FolderOpen, MessageCircle, FileText, Calendar, User,
  TrendingUp, BarChart3, Zap, Sparkles,
  Users, ClipboardList, MessageSquare, CalendarCheck,
  BookOpen, Megaphone, Phone, Shield,
  Building2, Settings, HelpCircle, ChevronDown,
  Plus, ArrowUpRight, ArrowDownRight, Eye, Search,
  CheckCircle, Clock, AlertCircle, MoreHorizontal,
} from 'lucide-react';
import { ConsultasView } from '@/app/components/ConsultasView';
import { ReservasAdminView } from '@/app/components/ReservasAdminView';
import { CalendariosView } from '@/app/components/CalendariosView';
import { RendimientoView } from '@/app/components/RendimientoView';
import { MyPublicationsView } from '@/app/components/MyPublicationsView';
import { TeamContent } from '@/app/components/TeamContent';
import { HelpContent } from '@/app/components/HelpContent';
import { SettingsContent } from '@/app/components/SettingsContent';
import { AdminAnaliticaView } from '@/app/components/AdminAnaliticaView';
import { AdminEmbudoView } from '@/app/components/AdminEmbudoView';
import { AdminInsightsModule } from '@/app/components/AdminInsightsModule';
import { CitasAdminView } from '@/app/components/CitasAdminView';
import { ContactosWhatsAppAdminView } from '@/app/components/ContactosWhatsAppAdminView';
import { WhitelistAdminView } from '@/app/components/WhitelistAdminView';
import { AdminBannersModule } from '@/app/components/AdminBannersModule';
import { AdminRecursosModule } from '@/app/components/AdminRecursosModule';
import { SugerenciasButton } from '@/app/components/SugerenciasButton';

// ─── Types ───────────────────────────────────────────────────────────────────

type NavSection =
  | 'inicio' | 'my-publications' | 'inquiries' | 'reservas' | 'calendarios' | 'profile'
  | 'performance' | 'analitica' | 'embudo' | 'insights'
  | 'brokers' | 'asignaciones' | 'interacciones' | 'citas'
  | 'recursos' | 'banners' | 'whatsapp' | 'whitelist'
  | 'team' | 'usuarios' | 'configuracion' | 'help';

interface CTPAdminDashboardProps {
  onNavigate: (screen: string, data?: any) => void;
}

// ─── Nav structure ────────────────────────────────────────────────────────────

const NAV_GROUPS = [
  {
    id: 'publicador',
    label: 'Como publicador',
    items: [
      { id: 'inicio' as NavSection,          label: 'Inicio',            icon: Home },
      { id: 'my-publications' as NavSection, label: 'Mis publicaciones', icon: FolderOpen },
      { id: 'inquiries' as NavSection,       label: 'Consultas',         icon: MessageCircle },
      { id: 'reservas' as NavSection,        label: 'Reservas',          icon: FileText },
      { id: 'calendarios' as NavSection,     label: 'Calendarios',       icon: Calendar },
      { id: 'profile' as NavSection,         label: 'Perfil',            icon: User },
    ],
  },
  {
    id: 'rendimiento',
    label: 'Rendimiento',
    items: [
      { id: 'performance' as NavSection, label: 'Rendimiento',          icon: TrendingUp },
      { id: 'analitica' as NavSection,   label: 'Analítica plataforma', icon: BarChart3 },
      { id: 'embudo' as NavSection,      label: 'Embudo digital',       icon: Zap },
      { id: 'insights' as NavSection,    label: 'Insights IA',          icon: Sparkles },
    ],
  },
  {
    id: 'gestion',
    label: 'Gestión de agentes',
    items: [
      { id: 'brokers' as NavSection,       label: 'Brokers',       icon: Users },
      { id: 'asignaciones' as NavSection,  label: 'Asignaciones',  icon: ClipboardList },
      { id: 'interacciones' as NavSection, label: 'Interacciones', icon: MessageSquare },
      { id: 'citas' as NavSection,         label: 'Citas',         icon: CalendarCheck },
    ],
  },
  {
    id: 'contenido',
    label: 'Contenido',
    items: [
      { id: 'recursos' as NavSection,  label: 'Recursos & Blog',    icon: BookOpen },
      { id: 'banners' as NavSection,   label: 'Banners & mensajes', icon: Megaphone },
      { id: 'whatsapp' as NavSection,  label: 'Números WhatsApp',   icon: Phone },
      { id: 'whitelist' as NavSection, label: 'Whitelist',          icon: Shield },
    ],
  },
  {
    id: 'administracion',
    label: 'Administración',
    items: [
      { id: 'team' as NavSection,         label: 'Equipo CTP',          icon: Building2 },
      { id: 'usuarios' as NavSection,     label: 'Usuarios & permisos', icon: Users },
      { id: 'configuracion' as NavSection, label: 'Configuración',      icon: Settings },
      { id: 'help' as NavSection,          label: 'Ayuda',              icon: HelpCircle },
    ],
  },
];

// ─── Main component ───────────────────────────────────────────────────────────

export function CTPAdminDashboard({ onNavigate }: CTPAdminDashboardProps) {
  const [currentSection, setCurrentSection] = useState<NavSection>('inicio');
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    publicador: true,
    rendimiento: true,
    gestion: false,
    contenido: false,
    administracion: false,
  });
  const [showMenu, setShowMenu] = useState(false);
  const [triggerPublishModal, setTriggerPublishModal] = useState(0);

  const toggleGroup = (groupId: string) => {
    setOpenGroups(prev => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const handleNavClick = (sectionId: NavSection, groupId: string) => {
    setCurrentSection(sectionId);
    if (!openGroups[groupId]) {
      setOpenGroups(prev => ({ ...prev, [groupId]: true }));
    }
  };

  return (
    <>
      <div className="fixed inset-0" style={{ backgroundColor: '#002F23', zIndex: 5 }} />

      {/* ── Sidebar ── */}
      <aside
        className="w-64 flex-shrink-0 fixed left-0 top-0 bottom-0 z-20 flex flex-col"
        style={{ backgroundColor: '#002F23' }}
      >
        {/* Logo */}
        <div className="px-6 pt-8 pb-5 flex-shrink-0">
          <p style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 'var(--font-weight-semibold)',
            fontSize: 'var(--font-size-h4)',
            color: '#FFFFFF',
            lineHeight: 'var(--line-height-heading)',
          }}>
            CompraTuParcela
          </p>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.38)', marginTop: '2px', fontFamily: 'var(--font-body)' }}>
            Admin CTP
          </p>
        </div>

        {/* Nav groups */}
        <nav className="flex-1 overflow-y-auto scrollbar-hide px-2 pb-2">
          {NAV_GROUPS.map((group) => {
            const isOpen = openGroups[group.id];
            const hasActive = group.items.some(i => i.id === currentSection);

            return (
              <div key={group.id} className="mb-0.5">
                {/* Group header */}
                <button
                  onClick={() => toggleGroup(group.id)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors"
                  style={{ backgroundColor: 'transparent' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  <span style={{
                    fontSize: '10.5px',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-body)',
                    color: hasActive ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.42)',
                  }}>
                    {group.label}
                  </span>
                  <ChevronDown
                    className="w-3 h-3 transition-transform duration-200 flex-shrink-0"
                    style={{
                      color: 'rgba(255,255,255,0.35)',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                </button>

                {/* Group items */}
                {isOpen && (
                  <div className="mb-1">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = currentSection === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavClick(item.id, group.id)}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all"
                          style={{
                            backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                            color: isActive ? '#002F23' : 'rgba(255,255,255,0.62)',
                            fontFamily: 'var(--font-body)',
                            fontWeight: isActive ? 600 : 400,
                            fontSize: '13px',
                          }}
                          onMouseEnter={e => {
                            if (!isActive) {
                              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.07)';
                              e.currentTarget.style.color = 'rgba(255,255,255,0.9)';
                            }
                          }}
                          onMouseLeave={e => {
                            if (!isActive) {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              e.currentTarget.style.color = 'rgba(255,255,255,0.62)';
                            }
                          }}
                        >
                          <Icon
                            className="w-4 h-4 flex-shrink-0"
                            style={{ strokeWidth: isActive ? 2.5 : 1.8, color: isActive ? '#002F23' : 'rgba(255,255,255,0.62)' }}
                          />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                    {group.id === 'administracion' && (
                      <div className="px-2 pb-1">
                        <SugerenciasButton />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* User area */}
        <div className="flex-shrink-0 px-4 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-full flex items-center gap-3 transition-colors"
            style={{ color: 'rgba(255,255,255,0.62)' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#FFFFFF'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.62)'; }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#006B4E', border: '1.5px solid rgba(255,255,255,0.2)' }}
            >
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#FFFFFF', fontFamily: 'var(--font-heading)' }}>CTP</span>
            </div>
            <div className="flex-1 text-left">
              <p style={{ fontWeight: 600, color: '#FFFFFF', fontSize: '13px', fontFamily: 'var(--font-body)', margin: 0 }}>Admin CTP</p>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '1px', fontFamily: 'var(--font-body)' }}>Administrador general</p>
            </div>
          </button>
          {showMenu && (
            <div
              className="mt-3 rounded-lg overflow-hidden"
              style={{ backgroundColor: '#FFFFFF', border: '1px solid #DEDEDE', boxShadow: '0 4px 12px rgba(0,107,78,0.1)' }}
            >
              <button
                onClick={() => onNavigate('entry')}
                className="w-full text-left px-4 py-2.5 transition-colors"
                style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#0A0A0A' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ── Main content ── */}
      <div
        className="fixed overflow-y-auto bg-white rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.45)]"
        style={{ left: '256px', top: 'calc(32px + 12px)', right: '12px', bottom: '12px', zIndex: 10 }}
      >
        {currentSection === 'inicio'          && <CTPHomeContent setCurrentSection={setCurrentSection} setTriggerPublishModal={setTriggerPublishModal} />}
        {currentSection === 'my-publications' && <MyPublicationsView userType="inmobiliaria" userId="ctp-admin" onNavigate={onNavigate} onNavigateToSection={setCurrentSection} autoOpenModal={triggerPublishModal} />}
        {currentSection === 'inquiries'       && <ConsultasView viewType="inmobiliaria" />}
        {currentSection === 'reservas'        && <ReservasAdminView />}
        {currentSection === 'calendarios'     && <CalendariosView />}
        {currentSection === 'profile'         && <SettingsContent mode="profile" userType="inmobiliaria" />}
        {currentSection === 'performance'     && <RendimientoView viewType="inmobiliaria" />}
        {currentSection === 'analitica'       && <AdminAnaliticaView />}
        {currentSection === 'embudo'          && <AdminEmbudoView />}
        {currentSection === 'insights'        && <AdminInsightsModule />}
        {currentSection === 'citas'           && <CitasAdminView />}
        {currentSection === 'whatsapp'        && <ContactosWhatsAppAdminView />}
        {currentSection === 'whitelist'       && <WhitelistAdminView />}
        {currentSection === 'banners'         && <AdminBannersModule />}
        {currentSection === 'recursos'        && <AdminRecursosModule />}
        {currentSection === 'team'            && <TeamContent />}
        {currentSection === 'help'            && <HelpContent />}
        {currentSection === 'configuracion'   && <SettingsContent mode="settings" userType="inmobiliaria" />}
        {currentSection === 'brokers'         && <BrokersContent />}
        {currentSection === 'asignaciones'    && <AsignacionesContent />}
        {currentSection === 'interacciones'   && <InteraccionesContent />}
        {currentSection === 'usuarios'        && <UsuariosContent />}
      </div>
    </>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionShell({ title, subtitle, action }: { title: string; subtitle: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, color: '#0A0A0A', margin: 0 }}>{title}</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#737373', marginTop: '4px' }}>{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

function KPICard({ label, value, change, up }: { label: string; value: string; change: string; up: boolean }) {
  return (
    <div className="rounded-2xl p-5" style={{ border: '1px solid #E5E5E5', backgroundColor: '#FFFFFF' }}>
      <p style={{ fontSize: '12px', color: '#737373', fontFamily: 'var(--font-body)', margin: '0 0 8px' }}>{label}</p>
      <p style={{ fontSize: '26px', fontWeight: 700, color: '#0A0A0A', fontFamily: 'var(--font-heading)', margin: '0 0 6px' }}>{value}</p>
      <div className="flex items-center gap-1">
        {up
          ? <ArrowUpRight className="w-3.5 h-3.5" style={{ color: '#006B4E' }} />
          : <ArrowDownRight className="w-3.5 h-3.5" style={{ color: '#E53E3E' }} />}
        <span style={{ fontSize: '12px', color: up ? '#006B4E' : '#E53E3E', fontFamily: 'var(--font-body)' }}>{change} vs mes anterior</span>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: 'activo' | 'pendiente' | 'inactivo' }) {
  const map = {
    activo:    { bg: '#E8F5EE', color: '#006B4E', label: 'Activo' },
    pendiente: { bg: '#FFF8E1', color: '#B7791F', label: 'Pendiente' },
    inactivo:  { bg: '#F5F5F5', color: '#737373', label: 'Inactivo' },
  };
  const s = map[status];
  return (
    <span style={{ backgroundColor: s.bg, color: s.color, fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '99px', fontFamily: 'var(--font-body)' }}>
      {s.label}
    </span>
  );
}

// ─── Inicio (CTP Home) ────────────────────────────────────────────────────────

function CTPHomeContent({ setCurrentSection, setTriggerPublishModal }: {
  setCurrentSection: (s: NavSection) => void;
  setTriggerPublishModal: (fn: (n: number) => number) => void;
}) {
  const kpisPublicador = [
    { label: 'Publicaciones activas',  value: '34',     change: '+3',     up: true },
    { label: 'Consultas recibidas',    value: '218',    change: '+12%',   up: true },
    { label: 'Reservas este mes',      value: '9',      change: '+2',     up: true },
    { label: 'Parcelas guardadas',     value: '1.243',  change: '+8%',    up: true },
  ];
  const kpisPlataforma = [
    { label: 'Usuarios totales',       value: '8.245',  change: '+14%',   up: true },
    { label: 'Inmobiliarias activas',  value: '41',     change: '+4',     up: true },
    { label: 'Brokers activos',        value: '87',     change: '+6',     up: true },
    { label: 'Conversión leads',       value: '3.4%',   change: '+0.2pp', up: true },
  ];
  const actividad = [
    { icon: CheckCircle, color: '#006B4E', text: 'Nueva reserva recibida para Parcela Los Robles', time: 'Hace 12 min' },
    { icon: MessageCircle, color: '#006B4E', text: '5 nuevas consultas en las últimas 2 horas', time: 'Hace 1 h' },
    { icon: Users, color: '#2563EB', text: 'Broker Carlos Pérez completó 3 asignaciones', time: 'Hace 2 h' },
    { icon: AlertCircle, color: '#B7791F', text: 'Publicación "Parcela Aysén Sur" requiere revisión', time: 'Hace 4 h' },
    { icon: CheckCircle, color: '#006B4E', text: 'Inmobiliaria Verde Sur activó su plan Premium', time: 'Ayer, 16:30' },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, color: '#0A0A0A', margin: '0 0 4px' }}>
            Bienvenido, Admin CTP
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#737373' }}>
            Visión general de tus publicaciones y el estado de la plataforma.
          </p>
        </div>
        <button
          onClick={() => { setCurrentSection('my-publications'); setTriggerPublishModal(n => n + 1); }}
          className="flex items-center gap-2 px-4 py-2.5 transition-colors"
          style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, borderRadius: '12px' }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#01533E'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#006B4E'; }}
        >
          <Plus className="w-4 h-4" />
          Nueva publicación
        </button>
      </div>

      {/* KPIs como publicador */}
      <div className="mb-2">
        <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#737373', fontFamily: 'var(--font-body)', marginBottom: '12px' }}>
          Como publicador
        </p>
        <div className="grid grid-cols-4 gap-4 mb-8">
          {kpisPublicador.map(k => <KPICard key={k.label} {...k} />)}
        </div>
      </div>

      {/* KPIs plataforma */}
      <div className="mb-8">
        <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#737373', fontFamily: 'var(--font-body)', marginBottom: '12px' }}>
          Plataforma
        </p>
        <div className="grid grid-cols-4 gap-4">
          {kpisPlataforma.map(k => <KPICard key={k.label} {...k} />)}
        </div>
      </div>

      {/* Accesos rápidos + Actividad reciente */}
      <div className="grid grid-cols-3 gap-6">
        {/* Accesos rápidos */}
        <div className="rounded-2xl p-6" style={{ border: '1px solid #E5E5E5' }}>
          <p style={{ fontSize: '14px', fontWeight: 700, color: '#0A0A0A', fontFamily: 'var(--font-heading)', margin: '0 0 16px' }}>
            Accesos rápidos
          </p>
          <div className="space-y-2">
            {[
              { label: 'Ver mis publicaciones', section: 'my-publications' as NavSection, icon: FolderOpen },
              { label: 'Consultas pendientes',  section: 'inquiries' as NavSection,       icon: MessageCircle },
              { label: 'Analítica plataforma',  section: 'analitica' as NavSection,       icon: BarChart3 },
              { label: 'Gestión de brokers',    section: 'brokers' as NavSection,         icon: Users },
              { label: 'Insights IA',           section: 'insights' as NavSection,        icon: Sparkles },
            ].map(({ label, section, icon: Icon }) => (
              <button
                key={section}
                onClick={() => setCurrentSection(section)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left"
                style={{ backgroundColor: '#FAFAFA', color: '#0A0A0A', fontFamily: 'var(--font-body)', fontSize: '13px' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#F0F9F5'; e.currentTarget.style.color = '#006B4E'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#FAFAFA'; e.currentTarget.style.color = '#0A0A0A'; }}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Actividad reciente */}
        <div className="col-span-2 rounded-2xl p-6" style={{ border: '1px solid #E5E5E5' }}>
          <p style={{ fontSize: '14px', fontWeight: 700, color: '#0A0A0A', fontFamily: 'var(--font-heading)', margin: '0 0 16px' }}>
            Actividad reciente
          </p>
          <div className="space-y-4">
            {actividad.map(({ icon: Icon, color, text, time }, i) => (
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
        </div>
      </div>
    </div>
  );
}

// ─── Brokers ──────────────────────────────────────────────────────────────────

const BROKERS_MOCK = [
  { id: 1, nombre: 'Carlos Pérez',    email: 'carlos@ctp.cl',   asignados: 12, cerrados: 4, status: 'activo' as const },
  { id: 2, nombre: 'Sofía Ramírez',   email: 'sofia@ctp.cl',    asignados: 8,  cerrados: 2, status: 'activo' as const },
  { id: 3, nombre: 'Diego Muñoz',     email: 'diego@ctp.cl',    asignados: 15, cerrados: 7, status: 'activo' as const },
  { id: 4, nombre: 'Valentina Cruz',  email: 'val@ctp.cl',      asignados: 3,  cerrados: 1, status: 'pendiente' as const },
  { id: 5, nombre: 'Martín Salinas',  email: 'martin@ctp.cl',   asignados: 0,  cerrados: 0, status: 'inactivo' as const },
];

function BrokersContent() {
  const [query, setQuery] = useState('');
  const filtered = BROKERS_MOCK.filter(b =>
    b.nombre.toLowerCase().includes(query.toLowerCase()) ||
    b.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-8">
      <SectionShell
        title="Brokers"
        subtitle="Gestión de brokers y su actividad en la plataforma"
        action={
          <button
            className="flex items-center gap-2 px-4 py-2.5 transition-colors"
            style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, borderRadius: '12px' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#01533E'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#006B4E'; }}
          >
            <Plus className="w-4 h-4" /> Agregar broker
          </button>
        }
      />
      {/* Search */}
      <div className="relative mb-6" style={{ maxWidth: '320px' }}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#A0A0A0' }} />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Buscar broker…"
          className="w-full pl-9 pr-4 py-2.5 rounded-xl"
          style={{ border: '1px solid #E5E5E5', fontSize: '13px', fontFamily: 'var(--font-body)', outline: 'none', color: '#0A0A0A' }}
        />
      </div>
      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #E5E5E5' }}>
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: '#FAFAFA', borderBottom: '1px solid #E5E5E5' }}>
              {['Broker', 'Email', 'Leads asignados', 'Leads cerrados', 'Estado', ''].map(h => (
                <th key={h} className="text-left px-5 py-3" style={{ fontSize: '11px', fontWeight: 600, color: '#737373', fontFamily: 'var(--font-body)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((b, i) => (
              <tr key={b.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #F0F0F0' : 'none' }}>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E8F5EE' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#006B4E', fontFamily: 'var(--font-heading)' }}>
                        {b.nombre.split(' ').map(w => w[0]).join('')}
                      </span>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#0A0A0A', fontFamily: 'var(--font-body)' }}>{b.nombre}</span>
                  </div>
                </td>
                <td className="px-5 py-4" style={{ fontSize: '13px', color: '#737373', fontFamily: 'var(--font-body)' }}>{b.email}</td>
                <td className="px-5 py-4" style={{ fontSize: '13px', color: '#0A0A0A', fontFamily: 'var(--font-body)', fontWeight: 600 }}>{b.asignados}</td>
                <td className="px-5 py-4" style={{ fontSize: '13px', color: '#0A0A0A', fontFamily: 'var(--font-body)', fontWeight: 600 }}>{b.cerrados}</td>
                <td className="px-5 py-4"><StatusBadge status={b.status} /></td>
                <td className="px-5 py-4">
                  <button className="p-1 rounded-xl transition-colors" onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#F5F5F5'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
                    <MoreHorizontal className="w-4 h-4" style={{ color: '#737373' }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Asignaciones ─────────────────────────────────────────────────────────────

const ASIGN_MOCK = [
  { id: 1, lead: 'Roberto Fuentes',  parcela: 'Parcela Los Robles',    broker: 'Carlos Pérez',   fecha: '14 jun 2026', status: 'activo' as const },
  { id: 2, lead: 'Camila Torres',    parcela: 'Parcela Valle Pirque',  broker: 'Sofía Ramírez',  fecha: '13 jun 2026', status: 'pendiente' as const },
  { id: 3, lead: 'Andrés Morales',   parcela: 'Proyecto Aysén Sur',    broker: 'Diego Muñoz',    fecha: '12 jun 2026', status: 'activo' as const },
  { id: 4, lead: 'Daniela Herrera',  parcela: 'Parcela El Manzano',    broker: 'Carlos Pérez',   fecha: '11 jun 2026', status: 'activo' as const },
  { id: 5, lead: 'Felipe Aguilera',  parcela: 'Parcela Paine Norte',   broker: 'Sin asignar',    fecha: '10 jun 2026', status: 'pendiente' as const },
];

function AsignacionesContent() {
  return (
    <div className="p-8">
      <SectionShell
        title="Asignaciones"
        subtitle="Asignación de leads a brokers"
        action={
          <button
            className="flex items-center gap-2 px-4 py-2.5 transition-colors"
            style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, borderRadius: '12px' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#01533E'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#006B4E'; }}
          >
            <Plus className="w-4 h-4" /> Nueva asignación
          </button>
        }
      />
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #E5E5E5' }}>
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: '#FAFAFA', borderBottom: '1px solid #E5E5E5' }}>
              {['Lead', 'Parcela / Proyecto', 'Broker asignado', 'Fecha', 'Estado'].map(h => (
                <th key={h} className="text-left px-5 py-3" style={{ fontSize: '11px', fontWeight: 600, color: '#737373', fontFamily: 'var(--font-body)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ASIGN_MOCK.map((a, i) => (
              <tr key={a.id} style={{ borderBottom: i < ASIGN_MOCK.length - 1 ? '1px solid #F0F0F0' : 'none' }}>
                <td className="px-5 py-4" style={{ fontSize: '13px', fontWeight: 600, color: '#0A0A0A', fontFamily: 'var(--font-body)' }}>{a.lead}</td>
                <td className="px-5 py-4" style={{ fontSize: '13px', color: '#737373', fontFamily: 'var(--font-body)' }}>{a.parcela}</td>
                <td className="px-5 py-4">
                  <span style={{ fontSize: '13px', color: a.broker === 'Sin asignar' ? '#B7791F' : '#0A0A0A', fontFamily: 'var(--font-body)' }}>
                    {a.broker}
                  </span>
                </td>
                <td className="px-5 py-4" style={{ fontSize: '13px', color: '#737373', fontFamily: 'var(--font-body)' }}>{a.fecha}</td>
                <td className="px-5 py-4"><StatusBadge status={a.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Interacciones ────────────────────────────────────────────────────────────

const INTER_MOCK = [
  { tipo: 'Consulta',  lead: 'Roberto Fuentes', broker: 'Carlos Pérez',  desc: 'Solicitó más fotos de la parcela', fecha: 'Hace 20 min', icon: MessageSquare, color: '#2563EB' },
  { tipo: 'Llamada',   lead: 'Camila Torres',   broker: 'Sofía Ramírez', desc: 'Llamada de 8 minutos, interesada en financiamiento', fecha: 'Hace 1 h', icon: Phone, color: '#006B4E' },
  { tipo: 'Cita',      lead: 'Andrés Morales',  broker: 'Diego Muñoz',   desc: 'Visita confirmada para el 20 jun', fecha: 'Hace 2 h', icon: Calendar, color: '#7C3AED' },
  { tipo: 'Consulta',  lead: 'Daniela Herrera', broker: 'Carlos Pérez',  desc: 'Preguntó por acceso a servicios básicos', fecha: 'Hace 3 h', icon: MessageSquare, color: '#2563EB' },
  { tipo: 'WhatsApp',  lead: 'Felipe Aguilera', broker: 'Sin asignar',   desc: 'Primer contacto vía WhatsApp', fecha: 'Ayer, 17:42', icon: MessageCircle, color: '#059669' },
];

function InteraccionesContent() {
  return (
    <div className="p-8">
      <SectionShell title="Interacciones" subtitle="Registro de interacciones cliente–broker" />
      <div className="space-y-3">
        {INTER_MOCK.map(({ tipo, lead, broker, desc, fecha, icon: Icon, color }, i) => (
          <div key={i} className="flex items-start gap-4 p-4 rounded-2xl" style={{ border: '1px solid #E5E5E5', backgroundColor: '#FFFFFF' }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: color + '15' }}>
              <Icon className="w-4 h-4" style={{ color }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span style={{ fontSize: '11px', fontWeight: 600, backgroundColor: color + '15', color, padding: '1px 7px', borderRadius: '99px', fontFamily: 'var(--font-body)' }}>
                  {tipo}
                </span>
                <span style={{ fontSize: '12px', color: '#737373', fontFamily: 'var(--font-body)' }}>{fecha}</span>
              </div>
              <p style={{ fontSize: '13px', color: '#0A0A0A', fontFamily: 'var(--font-body)', margin: '0 0 2px', fontWeight: 500 }}>
                {lead} <span style={{ fontWeight: 400, color: '#737373' }}>con {broker}</span>
              </p>
              <p style={{ fontSize: '12px', color: '#737373', fontFamily: 'var(--font-body)', margin: 0 }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Usuarios & permisos ──────────────────────────────────────────────────────

const USUARIOS_MOCK = [
  { nombre: 'Admin Principal',   email: 'admin@ctp.cl',         rol: 'Super admin',   status: 'activo' as const },
  { nombre: 'Valentina Cruz',    email: 'val@ctp.cl',           rol: 'Editor',        status: 'activo' as const },
  { nombre: 'Martín Salinas',    email: 'martin@ctp.cl',        rol: 'Moderador',     status: 'pendiente' as const },
  { nombre: 'Ana Fuentes',       email: 'ana@ctp.cl',           rol: 'Soporte',       status: 'activo' as const },
  { nombre: 'Luis Contreras',    email: 'luis@ctp.cl',          rol: 'Solo lectura',  status: 'inactivo' as const },
];

const ROLES = ['Super admin', 'Editor', 'Moderador', 'Soporte', 'Solo lectura'];

function UsuariosContent() {
  return (
    <div className="p-8">
      <SectionShell
        title="Usuarios & permisos"
        subtitle="Gestión de usuarios internos de CTP y sus roles"
        action={
          <button
            className="flex items-center gap-2 px-4 py-2.5 transition-colors"
            style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, borderRadius: '12px' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#01533E'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#006B4E'; }}
          >
            <Plus className="w-4 h-4" /> Invitar usuario
          </button>
        }
      />

      {/* Roles summary */}
      <div className="grid grid-cols-5 gap-3 mb-8">
        {ROLES.map(r => (
          <div key={r} className="rounded-2xl p-4 text-center" style={{ border: '1px solid #E5E5E5' }}>
            <p style={{ fontSize: '20px', fontWeight: 700, color: '#0A0A0A', fontFamily: 'var(--font-heading)', margin: '0 0 4px' }}>
              {USUARIOS_MOCK.filter(u => u.rol === r).length}
            </p>
            <p style={{ fontSize: '11px', color: '#737373', fontFamily: 'var(--font-body)', margin: 0 }}>{r}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #E5E5E5' }}>
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: '#FAFAFA', borderBottom: '1px solid #E5E5E5' }}>
              {['Usuario', 'Email', 'Rol', 'Estado', ''].map(h => (
                <th key={h} className="text-left px-5 py-3" style={{ fontSize: '11px', fontWeight: 600, color: '#737373', fontFamily: 'var(--font-body)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {USUARIOS_MOCK.map((u, i) => (
              <tr key={u.email} style={{ borderBottom: i < USUARIOS_MOCK.length - 1 ? '1px solid #F0F0F0' : 'none' }}>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E8F5EE' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#006B4E' }}>
                        {u.nombre.split(' ').map(w => w[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#0A0A0A', fontFamily: 'var(--font-body)' }}>{u.nombre}</span>
                  </div>
                </td>
                <td className="px-5 py-4" style={{ fontSize: '13px', color: '#737373', fontFamily: 'var(--font-body)' }}>{u.email}</td>
                <td className="px-5 py-4">
                  <span style={{ fontSize: '12px', color: '#006B4E', backgroundColor: '#E8F5EE', padding: '2px 8px', borderRadius: '99px', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
                    {u.rol}
                  </span>
                </td>
                <td className="px-5 py-4"><StatusBadge status={u.status} /></td>
                <td className="px-5 py-4">
                  <button className="p-1 rounded-xl transition-colors" onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#F5F5F5'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
                    <MoreHorizontal className="w-4 h-4" style={{ color: '#737373' }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
