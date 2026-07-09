import React, { useState } from 'react';
import {
  Home, FolderOpen, MessageCircle, FileText, Calendar, User,
  TrendingUp, BarChart3, Zap, Sparkles,
  Users, ClipboardList, MessageSquare, CalendarCheck,
  BookOpen, Megaphone, Phone, MapPin,
  Building2, Settings, HelpCircle, ChevronDown, ShieldCheck,
  Plus, ArrowUpRight, ArrowDownRight, Eye, Search,
  CheckCircle, Clock, AlertCircle, MoreHorizontal,
  Bookmark, UserCheck, type LucideIcon,
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

import { CitasAdminView } from '@/app/components/CitasAdminView';
import { ContactosWhatsAppAdminView } from '@/app/components/ContactosWhatsAppAdminView';
import { AdminBannersModule } from '@/app/components/AdminBannersModule';
import { AdminRecursosModule } from '@/app/components/AdminRecursosModule';
import { AdminRegionesView } from '@/app/components/AdminRegionesView';
import { AdminVerificacionView } from '@/app/components/AdminVerificacionView';
import { SugerenciasButton } from '@/app/components/SugerenciasButton';

// ─── Types ───────────────────────────────────────────────────────────────────

type NavSection =
  | 'inicio' | 'my-publications' | 'inquiries' | 'reservas' | 'calendarios' | 'profile'
  | 'performance' | 'analitica' | 'embudo' | 'verificacion'
  | 'asignaciones' | 'interacciones' | 'citas'
  | 'recursos' | 'banners' | 'whatsapp' | 'regiones'
  | 'team' | 'configuracion' | 'help';

interface CTPAdminDashboardProps {
  onNavigate: (screen: string, data?: any) => void;
}

// ─── Nav structure ────────────────────────────────────────────────────────────

const NAV_GROUPS = [
  {
    id: 'rendimiento',
    label: 'Rendimiento',
    items: [
      { id: 'performance' as NavSection, label: 'Rendimiento',          icon: TrendingUp },
      { id: 'analitica' as NavSection,   label: 'Analítica plataforma', icon: BarChart3 },
      { id: 'embudo' as NavSection,      label: 'Embudo digital',       icon: Zap },
    ],
  },
  {
    id: 'contenido',
    label: 'Contenido',
    items: [
      { id: 'recursos' as NavSection,  label: 'Recursos & Blog',    icon: BookOpen },
      { id: 'banners' as NavSection,   label: 'Banners & mensajes', icon: Megaphone },
    ],
  },
  {
    id: 'administracion',
    label: 'Administración',
    items: [
      { id: 'verificacion' as NavSection,   label: 'Verificación',       icon: ShieldCheck },
      { id: 'team' as NavSection,          label: 'Equipo CTP',         icon: Building2 },
      { id: 'regiones' as NavSection,      label: 'Regiones y Comunas', icon: MapPin },
      { id: 'configuracion' as NavSection, label: 'Configuración',      icon: Settings },
      { id: 'help' as NavSection,          label: 'Ayuda',              icon: HelpCircle },
    ],
  },
];

// ─── Main component ───────────────────────────────────────────────────────────

export function CTPAdminDashboard({ onNavigate }: CTPAdminDashboardProps) {
  const [currentSection, setCurrentSection] = useState<NavSection>('inicio');
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    rendimiento: true,
    contenido: false,
    administracion: false,
  });
  const [showMenu, setShowMenu] = useState(false);
  const [triggerPublishModal, setTriggerPublishModal] = useState(0);
  const [publishModalOrigin, setPublishModalOrigin] = useState<NavSection>('inicio');

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
        </div>

        {/* Nav groups */}
        <nav className="flex-1 overflow-y-auto scrollbar-hide px-2 pb-2">
          {/* Inicio standalone */}
          <button
            onClick={() => setCurrentSection('inicio')}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all mb-1"
            style={{
              backgroundColor: currentSection === 'inicio' ? '#FFFFFF' : 'transparent',
              color: currentSection === 'inicio' ? '#002F23' : 'rgba(255,255,255,0.62)',
              fontFamily: 'var(--font-body)', fontWeight: currentSection === 'inicio' ? 600 : 400, fontSize: '13px',
            }}
            onMouseEnter={e => { if (currentSection !== 'inicio') { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.9)'; } }}
            onMouseLeave={e => { if (currentSection !== 'inicio') { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.62)'; } }}
          >
            <Home className="w-4 h-4 flex-shrink-0" style={{ strokeWidth: currentSection === 'inicio' ? 2.5 : 1.8, color: currentSection === 'inicio' ? '#002F23' : 'rgba(255,255,255,0.62)' }} />
            <span>Inicio</span>
          </button>

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
                      <SugerenciasButton />
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
        {currentSection === 'my-publications' && <MyPublicationsView userType="inmobiliaria" userId="ctp-admin" onNavigate={onNavigate} onNavigateToSection={setCurrentSection} autoOpenModal={triggerPublishModal} onTypeModalCancel={() => setCurrentSection(publishModalOrigin)} />}
        {currentSection === 'inquiries'       && <ConsultasView viewType="inmobiliaria" />}
        {currentSection === 'reservas'        && <ReservasAdminView />}
        {currentSection === 'calendarios'     && <CalendariosView />}
        {currentSection === 'profile'         && <SettingsContent mode="profile" userType="inmobiliaria" />}
        {currentSection === 'performance'     && <RendimientoView viewType="inmobiliaria" />}
        {currentSection === 'analitica'       && <AdminAnaliticaView />}
        {currentSection === 'embudo'          && <AdminEmbudoView />}

        {currentSection === 'citas'           && <CitasAdminView />}
        {currentSection === 'whatsapp'        && <ContactosWhatsAppAdminView />}
        {currentSection === 'banners'         && <AdminBannersModule />}
        {currentSection === 'regiones'        && <AdminRegionesView />}
        {currentSection === 'recursos'        && <AdminRecursosModule />}
        {currentSection === 'team'            && <TeamContent />}
        {currentSection === 'help'            && <HelpContent />}
        {currentSection === 'verificacion'    && <AdminVerificacionView />}
        {currentSection === 'configuracion'   && <SettingsContent mode="settings" userType="inmobiliaria" />}
        {currentSection === 'asignaciones'    && <AsignacionesContent />}
        {currentSection === 'interacciones'   && <InteraccionesContent />}
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

function KPICard({ label, value, change, up, icon: Icon, iconBg, iconColor }: {
  label: string; value: string; change: string; up: boolean;
  icon: LucideIcon; iconBg: string; iconColor: string;
}) {
  return (
    <div className="rounded-2xl p-5" style={{ border: '1px solid #E5E5E5', backgroundColor: '#FFFFFF' }}>
      <div className="flex items-center justify-between mb-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: iconBg }}>
          <Icon className="w-4 h-4" style={{ color: iconColor }} />
        </div>
        <span
          className="flex items-center gap-0.5"
          style={{ fontSize: '11px', fontWeight: 600, fontFamily: 'var(--font-body)', color: up ? '#006B4E' : '#E53E3E', backgroundColor: up ? '#E8F5EE' : '#FEE2E2', padding: '2px 7px', borderRadius: '99px' }}
        >
          {up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {change}
        </span>
      </div>
      <p style={{ fontSize: '26px', fontWeight: 700, color: '#0A0A0A', fontFamily: 'var(--font-heading)', margin: '0 0 3px' }}>{value}</p>
      <p style={{ fontSize: '12px', color: '#737373', fontFamily: 'var(--font-body)', margin: 0 }}>{label}</p>
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

function CTPHomeContent({ setCurrentSection }: {
  setCurrentSection: (s: NavSection) => void;
  setTriggerPublishModal: (fn: (n: number) => number) => void;
}) {
  const kpisActividad = [
    { label: 'Publicaciones activas',   value: '1.847',  change: '+23',    up: true,  icon: FolderOpen,    iconBg: '#E8F5EE', iconColor: '#006B4E' },
    { label: 'Consultas este mes',      value: '4.312',  change: '+18%',   up: true,  icon: MessageCircle, iconBg: '#EFF6FF', iconColor: '#2563EB' },
    { label: 'Reservas este mes',       value: '94',     change: '+11',    up: true,  icon: FileText,      iconBg: '#F5F3FF', iconColor: '#7C3AED' },
    { label: 'Tasa de conversión',      value: '3.4%',   change: '+0.2pp', up: true,  icon: TrendingUp,    iconBg: '#FFF7ED', iconColor: '#C2410C' },
  ];
  const kpisParticipantes = [
    { label: 'Inmobiliarias activas',         value: '41',     change: '+4',   up: true,  icon: Building2,     iconBg: '#E8F5EE', iconColor: '#006B4E' },
    { label: 'Brokers activos',               value: '87',     change: '+6',   up: true,  icon: UserCheck,     iconBg: '#F0FDFA', iconColor: '#0D9488' },
    { label: 'Usuarios registrados',          value: '8.245',  change: '+14%', up: true,  icon: Users,         iconBg: '#EFF6FF', iconColor: '#2563EB' },
    { label: 'Pendientes de verificación',    value: '5',      change: '+3',   up: false, icon: ClipboardList, iconBg: '#FEF3C7', iconColor: '#B7791F' },
  ];
  const actividad = [
    { icon: CheckCircle,   color: '#006B4E', text: 'Nueva reserva — Parcela Los Robles (Inmobiliaria Verde Sur)', time: 'Hace 12 min' },
    { icon: MessageCircle, color: '#2563EB', text: '5 nuevas consultas recibidas en la plataforma', time: 'Hace 1 h' },
    { icon: AlertCircle,   color: '#B7791F', text: 'Inmobiliaria Patagonia Sur pendiente de verificación', time: 'Hace 2 h' },
    { icon: UserCheck,     color: '#0D9488', text: 'Broker Diego Muñoz validado y activado', time: 'Hace 3 h' },
    { icon: Building2,     color: '#006B4E', text: 'Inmobiliaria Verde Sur activó su plan Premium', time: 'Ayer, 16:30' },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, color: '#0A0A0A', margin: '0 0 4px' }}>
          Bienvenido, Admin CTP
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#737373' }}>
          Visión general de la plataforma CompraTuParcela.
        </p>
      </div>

      {/* KPIs actividad global */}
      <div className="mb-2">
        <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#737373', fontFamily: 'var(--font-body)', marginBottom: '12px' }}>
          Actividad global
        </p>
        <div className="grid grid-cols-4 gap-4 mb-8">
          {kpisActividad.map(k => <KPICard key={k.label} {...k} />)}
        </div>
      </div>

      {/* KPIs participantes */}
      <div className="mb-8">
        <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#737373', fontFamily: 'var(--font-body)', marginBottom: '12px' }}>
          Participantes
        </p>
        <div className="grid grid-cols-4 gap-4">
          {kpisParticipantes.map(k => <KPICard key={k.label} {...k} />)}
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
              { label: 'Verificar registros',  section: 'verificacion' as NavSection, icon: ClipboardList },
              { label: 'Analítica plataforma', section: 'analitica' as NavSection,     icon: BarChart3 },
              { label: 'Banners & mensajes',   section: 'banners' as NavSection,       icon: Megaphone },
              { label: 'Gestión de equipo',    section: 'team' as NavSection,          icon: Users },
              { label: 'Regiones y comunas',   section: 'regiones' as NavSection,      icon: MapPin },
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

// ─── Asignaciones ─────────────────────────────────────────────────────────────

const SIN_ASIGNAR_INITIAL = [
  { id: 's1', interesado: 'Laura Vásquez',    email: 'l.vasquez@gmail.com',   parcela: 'Parcela Vista Cordillera', fecha: '15 jun 2026' },
  { id: 's2', interesado: 'Matías Contreras', email: 'm.contreras@gmail.com', parcela: 'Parcela Sur Verde',        fecha: '15 jun 2026' },
  { id: 's3', interesado: 'Carla Sepúlveda',  email: 'c.sepulveda@gmail.com', parcela: 'Proyecto Aysén Sur',       fecha: '14 jun 2026' },
  { id: 's4', interesado: 'Felipe Aguilera',  email: 'f.aguilera@gmail.com',  parcela: 'Parcela Paine Norte',      fecha: '10 jun 2026' },
];

const ASIGNADAS_INITIAL = [
  { id: 1, interesado: 'Roberto Fuentes',  email: 'r.fuentes@gmail.com',  parcela: 'Parcela Los Robles',   broker: 'Carlos Pérez',  fecha: '14 jun 2026', status: 'activo' as const },
  { id: 2, interesado: 'Camila Torres',    email: 'c.torres@outlook.com', parcela: 'Parcela Valle Pirque', broker: 'Sofía Ramírez', fecha: '13 jun 2026', status: 'activo' as const },
  { id: 3, interesado: 'Andrés Morales',   email: 'am.morales@gmail.com', parcela: 'Proyecto Aysén Sur',   broker: 'Diego Muñoz',   fecha: '12 jun 2026', status: 'activo' as const },
  { id: 4, interesado: 'Daniela Herrera',  email: 'dherrera@yahoo.com',   parcela: 'Parcela El Manzano',   broker: 'Carlos Pérez',  fecha: '11 jun 2026', status: 'activo' as const },
];

const BROKERS_ASIGN = ['Carlos Pérez', 'Sofía Ramírez', 'Diego Muñoz'];

type AsignModal =
  | { type: 'asignar'; consultaId: string }
  | { type: 'editar'; asignadaId: number }
  | null;

export function AsignacionesContent() {
  const [tab, setTab] = useState<'sin-asignar' | 'asignadas'>('sin-asignar');
  const [sinAsignar, setSinAsignar] = useState(SIN_ASIGNAR_INITIAL);
  const [asignadas, setAsignadas] = useState(ASIGNADAS_INITIAL);
  const [modal, setModal] = useState<AsignModal>(null);
  const [brokerTemp, setBrokerTemp] = useState(BROKERS_ASIGN[0]);
  const [toast, setToast] = useState<string | null>(null);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  function openAsignar(consultaId: string) {
    setBrokerTemp(BROKERS_ASIGN[0]);
    setModal({ type: 'asignar', consultaId });
  }

  function openEditar(asignadaId: number) {
    const a = asignadas.find(x => x.id === asignadaId)!;
    setBrokerTemp(a.broker);
    setModal({ type: 'editar', asignadaId });
  }

  function handleConfirmarAsignar() {
    if (modal?.type !== 'asignar') return;
    const consulta = sinAsignar.find(c => c.id === modal.consultaId)!;
    const today = new Date();
    const fecha = `${today.getDate()} ${['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'][today.getMonth()]} ${today.getFullYear()}`;
    setSinAsignar(prev => prev.filter(c => c.id !== modal.consultaId));
    setAsignadas(prev => [{ id: Date.now(), interesado: consulta.interesado, email: consulta.email, parcela: consulta.parcela, broker: brokerTemp, fecha, status: 'activo' as const }, ...prev]);
    setModal(null);
    showToast(`Consulta asignada a ${brokerTemp}`);
  }

  function handleConfirmarEditar() {
    if (modal?.type !== 'editar') return;
    setAsignadas(prev => prev.map(r => r.id === modal.asignadaId ? { ...r, broker: brokerTemp } : r));
    setModal(null);
    showToast(`Reasignado a ${brokerTemp}`);
  }

  function handleEliminar(id: number) {
    const a = asignadas.find(x => x.id === id)!;
    setAsignadas(prev => prev.filter(x => x.id !== id));
    setSinAsignar(prev => [{ id: `r${id}`, interesado: a.interesado, email: a.email, parcela: a.parcela, fecha: a.fecha }, ...prev]);
    showToast('Asignación eliminada');
  }

  const modalConsulta = modal?.type === 'asignar' ? sinAsignar.find(c => c.id === modal.consultaId) : null;
  const modalAsignada = modal?.type === 'editar' ? asignadas.find(a => a.id === modal.asignadaId) : null;

  return (
    <div className="p-8">
      <SectionShell
        title="Distribución de consultas"
        subtitle="Asigna las consultas entrantes a tu equipo de brokers"
      />

      {/* Tabs */}
      <div className="flex gap-1 mb-6 p-1" style={{ backgroundColor: '#F5F5F5', width: 'fit-content', borderRadius: '200px' }}>
        {([
          { key: 'sin-asignar', label: 'Sin asignar', count: sinAsignar.length, badgeBg: '#FEF3C7', badgeColor: '#B45309' },
          { key: 'asignadas',   label: 'Asignadas',   count: asignadas.length,  badgeBg: '#DCFCE7', badgeColor: '#166534' },
        ] as const).map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="flex items-center gap-2 px-4 py-2 transition-colors"
            style={{
              borderRadius: '200px',
              fontSize: '13px',
              fontWeight: tab === t.key ? 600 : 400,
              fontFamily: 'var(--font-body)',
              color: tab === t.key ? '#0A0A0A' : '#737373',
              backgroundColor: tab === t.key ? '#FFFFFF' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              boxShadow: tab === t.key ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            {t.label}
            <span
              className="flex items-center justify-center"
              style={{
                fontSize: '11px', fontWeight: 600,
                width: '20px', height: '20px', borderRadius: '99px',
                backgroundColor: tab === t.key ? t.badgeBg : '#E5E5E5',
                color: tab === t.key ? t.badgeColor : '#737373',
              }}
            >
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* Sin asignar */}
      {tab === 'sin-asignar' && (
        sinAsignar.length === 0 ? (
          <div className="rounded-2xl flex items-center justify-center py-16" style={{ border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA' }}>
            <div className="text-center">
              <CheckCircle className="w-10 h-10 mx-auto mb-3" style={{ color: '#006B4E' }} />
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#0A0A0A', fontFamily: 'var(--font-body)' }}>Todo al día</p>
              <p style={{ fontSize: '12px', color: '#9CA3AF', fontFamily: 'var(--font-body)', marginTop: '4px' }}>No hay consultas pendientes de asignar</p>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #E5E5E5' }}>
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: '#FAFAFA', borderBottom: '1px solid #E5E5E5' }}>
                  {['Interesado', 'Publicación', 'Fecha', 'Acción'].map(h => (
                    <th key={h} className="text-left px-5 py-3" style={{ fontSize: '11px', fontWeight: 600, color: '#737373', fontFamily: 'var(--font-body)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sinAsignar.map((c, i) => (
                  <tr key={c.id} style={{ borderBottom: i < sinAsignar.length - 1 ? '1px solid #F0F0F0' : 'none' }}>
                    <td className="px-5 py-4">
                      <p style={{ fontSize: '13px', fontWeight: 600, color: '#0A0A0A', fontFamily: 'var(--font-body)', margin: 0 }}>{c.interesado}</p>
                      <p style={{ fontSize: '11px', color: '#9CA3AF', fontFamily: 'var(--font-body)', margin: '2px 0 0' }}>{c.email}</p>
                    </td>
                    <td className="px-5 py-4" style={{ fontSize: '13px', color: '#737373', fontFamily: 'var(--font-body)' }}>{c.parcela}</td>
                    <td className="px-5 py-4" style={{ fontSize: '13px', color: '#737373', fontFamily: 'var(--font-body)' }}>{c.fecha}</td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => openAsignar(c.id)}
                        className="px-3 py-1.5 transition-colors"
                        style={{ backgroundColor: '#F0FAF5', color: '#006B4E', borderRadius: '200px', fontSize: '12px', fontWeight: 600, fontFamily: 'var(--font-body)', border: '1px solid #A7E3C8', cursor: 'pointer' }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#DCF5EB'; }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#F0FAF5'; }}
                      >
                        Asignar broker
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}

      {/* Asignadas */}
      {tab === 'asignadas' && (
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #E5E5E5' }}>
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: '#FAFAFA', borderBottom: '1px solid #E5E5E5' }}>
                {['Interesado', 'Publicación', 'Broker asignado', 'Fecha', 'Acciones'].map(h => (
                  <th key={h} className="text-left px-5 py-3" style={{ fontSize: '11px', fontWeight: 600, color: '#737373', fontFamily: 'var(--font-body)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {asignadas.map((a, i) => (
                <tr key={a.id} style={{ borderBottom: i < asignadas.length - 1 ? '1px solid #F0F0F0' : 'none' }}>
                  <td className="px-5 py-4">
                    <p style={{ fontSize: '13px', fontWeight: 600, color: '#0A0A0A', fontFamily: 'var(--font-body)', margin: 0 }}>{a.interesado}</p>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', fontFamily: 'var(--font-body)', margin: '2px 0 0' }}>{a.email}</p>
                  </td>
                  <td className="px-5 py-4" style={{ fontSize: '13px', color: '#737373', fontFamily: 'var(--font-body)' }}>{a.parcela}</td>
                  <td className="px-5 py-4" style={{ fontSize: '13px', color: '#0A0A0A', fontFamily: 'var(--font-body)' }}>{a.broker}</td>
                  <td className="px-5 py-4" style={{ fontSize: '13px', color: '#737373', fontFamily: 'var(--font-body)' }}>{a.fecha}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => openEditar(a.id)}
                        style={{ fontSize: '12px', color: '#006B4E', fontFamily: 'var(--font-body)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                      >
                        Editar
                      </button>
                      <span style={{ color: '#E5E5E5', fontSize: '14px' }}>|</span>
                      <button
                        onClick={() => handleEliminar(a.id)}
                        style={{ fontSize: '12px', color: '#DC2626', fontFamily: 'var(--font-body)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal asignar / editar */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
          onClick={() => setModal(null)}
        >
          <div
            className="rounded-2xl p-6 w-full max-w-sm"
            style={{ backgroundColor: '#FFFFFF', fontFamily: 'var(--font-body)' }}
            onClick={e => e.stopPropagation()}
          >
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0A0A0A', marginBottom: '4px' }}>
              {modal.type === 'asignar' ? 'Asignar broker' : 'Editar asignación'}
            </h3>
            <p style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '20px' }}>
              {modal.type === 'asignar'
                ? `${modalConsulta?.interesado} · ${modalConsulta?.parcela}`
                : `${modalAsignada?.interesado} · ${modalAsignada?.parcela}`}
            </p>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>
              Broker asignado
            </label>
            <div className="relative mb-6">
              <select
                value={brokerTemp}
                onChange={e => setBrokerTemp(e.target.value)}
                className="w-full px-3 py-2 pr-9 outline-none"
                style={{ border: '1px solid #E5E5E5', borderRadius: '10px', fontSize: '13px', color: '#0A0A0A', appearance: 'none', backgroundColor: '#FFFFFF' }}
              >
                {BROKERS_ASIGN.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#9CA3AF' }} />
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setModal(null)}
                style={{ fontSize: '13px', fontWeight: 600, color: '#737373', borderRadius: '200px', border: '1px solid #E5E5E5', backgroundColor: '#FFFFFF', padding: '8px 16px', cursor: 'pointer' }}
              >
                Cancelar
              </button>
              <button
                onClick={modal.type === 'asignar' ? handleConfirmarAsignar : handleConfirmarEditar}
                className="transition-colors"
                style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF', borderRadius: '200px', backgroundColor: '#006B4E', padding: '8px 16px', border: 'none', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#01533E'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#006B4E'; }}
              >
                {modal.type === 'asignar' ? 'Asignar' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg"
          style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, animation: 'fadeInUp 0.2s ease' }}
        >
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          {toast}
        </div>
      )}
    </div>
  );
}

// ─── Interacciones ────────────────────────────────────────────────────────────

type InterBase = { tipo: string; fecha: string; icon: typeof MessageSquare; color: string };
type InterRegistrada = InterBase & { anonimo?: false; lead: string; broker: string; desc: string };
type InterWhatsApp   = InterBase & { anonimo: true;  parcela: string; numero: string; dispositivo: string; fuente: string };
type InterItem = InterRegistrada | InterWhatsApp;

const INTER_MOCK: InterItem[] = [
  { tipo: 'Consulta', lead: 'Roberto Fuentes', broker: 'Carlos Pérez',  desc: 'Solicitó más fotos de la parcela',                  fecha: 'Hace 20 min',  icon: MessageSquare, color: '#2563EB' },
  { tipo: 'Llamada',  lead: 'Camila Torres',   broker: 'Sofía Ramírez', desc: 'Llamada de 8 minutos, interesada en financiamiento', fecha: 'Hace 1 h',     icon: Phone,         color: '#006B4E' },
  { tipo: 'Cita',     lead: 'Andrés Morales',  broker: 'Diego Muñoz',   desc: 'Visita confirmada para el 20 jun',                  fecha: 'Hace 2 h',     icon: Calendar,      color: '#7C3AED' },
  { tipo: 'Consulta', lead: 'Daniela Herrera', broker: 'Carlos Pérez',  desc: 'Preguntó por acceso a servicios básicos',           fecha: 'Hace 3 h',     icon: MessageSquare, color: '#2563EB' },
  {
    tipo: 'WhatsApp', anonimo: true,
    parcela: 'Parcela Paine Norte', numero: '+56 9 8000 1234',
    dispositivo: 'Móvil · Chrome 124', fuente: 'Ficha pública',
    fecha: 'Ayer, 17:42', icon: MessageCircle, color: '#059669',
  },
  {
    tipo: 'WhatsApp', anonimo: true,
    parcela: 'Proyecto Aysén Sur', numero: '+56 9 7654 3210',
    dispositivo: 'Escritorio · Safari', fuente: 'Ficha pública',
    fecha: 'Ayer, 14:10', icon: MessageCircle, color: '#059669',
  },
];

export function InteraccionesContent() {
  return (
    <div className="p-8">
      <SectionShell title="Interacciones" subtitle="Registro de interacciones cliente–broker" />
      <div className="space-y-3">
        {INTER_MOCK.map((item, i) => (
          <div key={i} className="flex items-start gap-4 p-4 rounded-2xl" style={{ border: '1px solid #E5E5E5', backgroundColor: '#FFFFFF' }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: item.color + '15' }}>
              <item.icon className="w-4 h-4" style={{ color: item.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span style={{ fontSize: '11px', fontWeight: 600, backgroundColor: item.color + '15', color: item.color, padding: '1px 7px', borderRadius: '99px', fontFamily: 'var(--font-body)' }}>
                  {item.tipo}
                </span>
                <span style={{ fontSize: '12px', color: '#737373', fontFamily: 'var(--font-body)' }}>{item.fecha}</span>
              </div>

              {item.anonimo ? (
                <>
                  <p style={{ fontSize: '13px', fontWeight: 500, color: '#0A0A0A', fontFamily: 'var(--font-body)', margin: '0 0 4px' }}>
                    Visitante anónimo
                    <span style={{ fontWeight: 400, color: '#9CA3AF', fontSize: '12px', marginLeft: '6px' }}>· sin sesión iniciada</span>
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    <span style={{ fontSize: '12px', color: '#737373', fontFamily: 'var(--font-body)' }}>
                      Publicación: <span style={{ color: '#0A0A0A', fontWeight: 500 }}>{item.parcela}</span>
                    </span>
                    <span style={{ fontSize: '12px', color: '#737373', fontFamily: 'var(--font-body)' }}>
                      Nº destino: <span style={{ color: '#0A0A0A', fontWeight: 500 }}>{item.numero}</span>
                    </span>
                    <span style={{ fontSize: '12px', color: '#737373', fontFamily: 'var(--font-body)' }}>
                      {item.dispositivo}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <p style={{ fontSize: '13px', color: '#0A0A0A', fontFamily: 'var(--font-body)', margin: '0 0 2px', fontWeight: 500 }}>
                    {item.lead} <span style={{ fontWeight: 400, color: '#737373' }}>con {item.broker}</span>
                  </p>
                  <p style={{ fontSize: '12px', color: '#737373', fontFamily: 'var(--font-body)', margin: 0 }}>{item.desc}</p>
                </>
              )}
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
            style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, borderRadius: '200px' }}
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
