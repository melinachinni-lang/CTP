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
  UserPlus, ToggleLeft, ToggleRight, AlertTriangle, X, Check,
  Download, Activity, Mail,
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
  | 'team' | 'configuracion' | 'help'
  | 'leads' | 'brokers';

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
    id: 'comercial',
    label: 'Comercial',
    items: [
      { id: 'leads' as NavSection,   label: 'Leads',   icon: Users },
      { id: 'brokers' as NavSection, label: 'Brokers', icon: UserCheck },
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
    comercial: false,
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
        {currentSection === 'leads'           && <CTPLeadsView />}
        {currentSection === 'brokers'         && <CTPBrokersView />}
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

// ─── Leads mock data ──────────────────────────────────────────────────────────

const CTP_LEADS_DATA = [
  { id: 'l001', nombre: 'Rodrigo Sánchez',   email: 'rodrigo.sanchez@email.com',   telefono: '+56 9 8765 4321', origen: 'Web',      estado: 'nuevo',      broker: '-',            fecha: '27 ene 2026', publicacion: 'Parcela Vista al Lago',       mensaje: 'Estoy interesado en conocer más sobre esta parcela. ¿Podemos coordinar una visita?' },
  { id: 'l002', nombre: 'Carolina Morales',  email: 'carolina.morales@email.com',  telefono: '+56 9 7654 3210', origen: 'Meta',     estado: 'asignado',   broker: 'Carlos Pérez',  fecha: '27 ene 2026', publicacion: 'Condominio Valle Verde',       mensaje: 'Me gustaría recibir información sobre las condiciones de financiamiento.' },
  { id: 'l003', nombre: 'Felipe Vargas',     email: 'felipe.vargas@email.com',     telefono: '+56 9 6543 2109', origen: 'Google',   estado: 'contactado', broker: 'Sofía Ramírez', fecha: '26 ene 2026', publicacion: 'Parcela Bosque Nativo',        mensaje: '¿La parcela cuenta con todos los servicios básicos?' },
  { id: 'l004', nombre: 'Daniela Fuentes',   email: 'daniela.fuentes@email.com',   telefono: '+56 9 5432 1098', origen: 'WhatsApp', estado: 'cerrado',    broker: 'Diego Muñoz',   fecha: '26 ene 2026', publicacion: 'Terreno Agrícola Premium',     mensaje: 'Quisiera información sobre los documentos de la propiedad.' },
  { id: 'l005', nombre: 'Matías Hernández',  email: 'matias.hernandez@email.com',  telefono: '+56 9 4321 0987', origen: 'Web',      estado: 'cerrado',    broker: 'Carlos Pérez',  fecha: '25 ene 2026', publicacion: 'Parcela Cordillera',          mensaje: '¿Hay posibilidad de negociar el precio?' },
  { id: 'l006', nombre: 'Valentina Torres',  email: 'valentina.torres@email.com',  telefono: '+56 9 3210 9876', origen: 'Meta',     estado: 'contactado', broker: 'Sofía Ramírez', fecha: '25 ene 2026', publicacion: 'Parcelas Los Andes',          mensaje: '¿Cuál es el tamaño mínimo de las parcelas disponibles?' },
  { id: 'l007', nombre: 'Andrés Muñoz',      email: 'andres.munoz@email.com',      telefono: '+56 9 2109 8765', origen: 'Google',   estado: 'nuevo',      broker: '-',            fecha: '24 ene 2026', publicacion: 'Parcela Vista al Mar',        mensaje: 'Necesito saber si la parcela tiene acceso directo a la playa.' },
  { id: 'l008', nombre: 'Sofía Reyes',       email: 'sofia.reyes@email.com',       telefono: '+56 9 1098 7654', origen: 'Web',      estado: 'asignado',   broker: 'Diego Muñoz',   fecha: '24 ene 2026', publicacion: 'Parcela Valle Central',       mensaje: '¿La parcela tiene factibilidad de agua y luz?' },
  { id: 'l009', nombre: 'Ignacio Silva',     email: 'ignacio.silva@email.com',     telefono: '+56 9 0987 6543', origen: 'WhatsApp', estado: 'nuevo',      broker: '-',            fecha: '23 ene 2026', publicacion: 'Condominio Montaña',          mensaje: '¿Cuándo está programada la entrega del proyecto?' },
  { id: 'l010', nombre: 'Francisca Castro',  email: 'francisca.castro@email.com',  telefono: '+56 9 9876 5432', origen: 'Meta',     estado: 'cerrado',    broker: 'Carlos Pérez',  fecha: '23 ene 2026', publicacion: 'Parcela Río y Montaña',       mensaje: 'Busco una parcela para proyecto turístico.' },
  { id: 'l011', nombre: 'Pablo Soto',        email: 'pablo.soto@email.com',        telefono: '+56 9 8877 6655', origen: 'Google',   estado: 'contactado', broker: 'Diego Muñoz',   fecha: '22 ene 2026', publicacion: 'Parcela Lago Azul',           mensaje: 'Me interesa el acceso al lago y las vistas panorámicas.' },
  { id: 'l012', nombre: 'Catalina Riquelme', email: 'catalina.riquelme@email.com', telefono: '+56 9 7766 5544', origen: 'Web',      estado: 'asignado',   broker: 'Sofía Ramírez', fecha: '22 ene 2026', publicacion: 'Parcela Viento Norte',        mensaje: '¿Existen restricciones para construir en esa zona?' },
];

const LEAD_ESTADO_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  nuevo:            { bg: '#EFF6FF', color: '#2563EB', label: 'Nuevo' },
  asignado:         { bg: '#F0FDFA', color: '#0D9488', label: 'Asignado' },
  contactado:       { bg: '#FFF7ED', color: '#C2410C', label: 'Contactado' },
  cerrado:          { bg: '#E8F5EE', color: '#006B4E', label: 'Cerrado' },
  'no-interesado':  { bg: '#F5F5F5', color: '#737373', label: 'No interesado' },
};

const ORIGEN_ICONS: Record<string, string> = {
  'Web':      '🌐',
  'Meta':     '📘',
  'Google':   '🔍',
  'WhatsApp': '💬',
};

const CTP_BROKERS_ASIGN = [
  { id: 'b1', nombre: 'Carlos Pérez',   leads: 14, disponible: true  },
  { id: 'b2', nombre: 'Sofía Ramírez',  leads: 9,  disponible: true  },
  { id: 'b3', nombre: 'Diego Muñoz',    leads: 17, disponible: true  },
  { id: 'b4', nombre: 'Ana Valenzuela', leads: 3,  disponible: false },
];

type CTPLead = typeof CTP_LEADS_DATA[0];

// ─── Modal asignar broker (compartido) ───────────────────────────────────────

function AsignarBrokerModal({ lead, brokers, brokerSeleccionado, onSelect, onConfirm, onClose, asignadoOk }: {
  lead: CTPLead;
  brokers: typeof CTP_BROKERS_ASIGN;
  brokerSeleccionado: string | null;
  onSelect: (id: string) => void;
  onConfirm: () => void;
  onClose: () => void;
  asignadoOk: string | null;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="w-full max-w-md rounded-2xl overflow-hidden" style={{ backgroundColor: '#FFFFFF', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
        <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: '1px solid #E5E5E5' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 600, color: '#0A0A0A', margin: 0 }}>Asignar broker</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#737373', marginTop: '2px' }}>Lead: <strong>{lead.nombre}</strong></p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: '#F5F5F5', color: '#737373' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#E5E5E5'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#F5F5F5'; }}>
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-6 py-5 space-y-2">
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, color: '#0A0A0A', marginBottom: '12px' }}>Seleccioná un broker disponible</p>
          {brokers.map(b => (
            <button key={b.id} onClick={() => { if (b.disponible) onSelect(b.id); }} disabled={!b.disponible} className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all text-left" style={{ border: `1px solid ${brokerSeleccionado === b.id ? '#006B4E' : '#E5E5E5'}`, backgroundColor: brokerSeleccionado === b.id ? '#E8F5EE' : '#FAFAFA', opacity: b.disponible ? 1 : 0.5, cursor: b.disponible ? 'pointer' : 'not-allowed' }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0" style={{ backgroundColor: brokerSeleccionado === b.id ? '#006B4E' : '#E5E5E5', color: brokerSeleccionado === b.id ? '#FFFFFF' : '#737373', fontFamily: 'var(--font-body)' }}>{b.nombre.charAt(0)}</div>
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: '#0A0A0A', margin: 0 }}>{b.nombre}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#737373', marginTop: '1px' }}>{b.leads} leads asignados</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '99px', fontFamily: 'var(--font-body)', backgroundColor: b.disponible ? '#DCFCE7' : '#F5F5F5', color: b.disponible ? '#166534' : '#737373' }}>{b.disponible ? 'Disponible' : 'Inactivo'}</span>
                {brokerSeleccionado === b.id && <Check className="w-4 h-4" style={{ color: '#006B4E' }} />}
              </div>
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between px-6 py-4" style={{ borderTop: '1px solid #E5E5E5' }}>
          <button onClick={onClose} className="px-4 py-2.5 rounded-xl text-sm transition-colors" style={{ fontFamily: 'var(--font-body)', color: '#737373', backgroundColor: '#F5F5F5', border: '1px solid #E5E5E5' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#E5E5E5'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#F5F5F5'; }}>Cancelar</button>
          <button onClick={onConfirm} disabled={!brokerSeleccionado} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors" style={{ fontFamily: 'var(--font-body)', backgroundColor: asignadoOk === lead.id ? '#166534' : brokerSeleccionado ? '#006B4E' : '#B2D8C5', color: '#FFFFFF', cursor: brokerSeleccionado ? 'pointer' : 'not-allowed' }} onMouseEnter={e => { if (brokerSeleccionado && asignadoOk !== lead.id) e.currentTarget.style.backgroundColor = '#01533E'; }} onMouseLeave={e => { if (asignadoOk !== lead.id) e.currentTarget.style.backgroundColor = brokerSeleccionado ? '#006B4E' : '#B2D8C5'; }}>
            {asignadoOk === lead.id ? <><Check className="w-4 h-4" />Asignado</> : <><UserPlus className="w-4 h-4" />Confirmar asignación</>}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── CTPLeadsView ─────────────────────────────────────────────────────────────

function CTPLeadsView() {
  const [leads, setLeads] = useState(CTP_LEADS_DATA);
  const [search, setSearch] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [filtroOrigen, setFiltroOrigen] = useState('todos');
  const [loading, setLoading] = useState(false);
  const [selectedLead, setSelectedLead] = useState<CTPLead | null>(null);
  const [leadParaAsignar, setLeadParaAsignar] = useState<CTPLead | null>(null);
  const [brokerSeleccionado, setBrokerSeleccionado] = useState<string | null>(null);
  const [asignadoOk, setAsignadoOk] = useState<string | null>(null);

  const filtrados = leads.filter(l => {
    const matchSearch = l.nombre.toLowerCase().includes(search.toLowerCase()) || l.email.toLowerCase().includes(search.toLowerCase());
    const matchEstado = filtroEstado === 'todos' || l.estado === filtroEstado;
    const matchOrigen = filtroOrigen === 'todos' || l.origen === filtroOrigen;
    return matchSearch && matchEstado && matchOrigen;
  });

  function confirmarAsignacion() {
    if (!leadParaAsignar || !brokerSeleccionado) return;
    const broker = CTP_BROKERS_ASIGN.find(b => b.id === brokerSeleccionado);
    if (!broker) return;
    setLeads(prev => prev.map(l => l.id === leadParaAsignar.id ? { ...l, estado: 'asignado', broker: broker.nombre } : l));
    setAsignadoOk(leadParaAsignar.id);
    setTimeout(() => { setLeadParaAsignar(null); setBrokerSeleccionado(null); setAsignadoOk(null); }, 1200);
  }

  if (selectedLead) {
    const estStyle = LEAD_ESTADO_STYLES[selectedLead.estado] || LEAD_ESTADO_STYLES['nuevo'];
    return (
      <div className="p-8">
        <button onClick={() => setSelectedLead(null)} className="flex items-center gap-2 mb-6 text-sm transition-colors" style={{ color: '#737373', fontFamily: 'var(--font-body)' }} onMouseEnter={e => { e.currentTarget.style.color = '#0A0A0A'; }} onMouseLeave={e => { e.currentTarget.style.color = '#737373'; }}>
          <ChevronDown className="w-4 h-4" style={{ transform: 'rotate(90deg)' }} /> Volver a leads
        </button>
        <SectionShell title={selectedLead.nombre} subtitle="Detalle del lead" />
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-5">
            <div className="rounded-2xl p-6" style={{ border: '1px solid #E5E5E5' }}>
              <p style={{ fontSize: '11px', fontWeight: 600, color: '#737373', letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', marginBottom: '16px' }}>Información de contacto</p>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { label: 'Email', value: selectedLead.email },
                  { label: 'Teléfono', value: selectedLead.telefono },
                  { label: 'Origen', value: `${ORIGEN_ICONS[selectedLead.origen] || ''} ${selectedLead.origen}` },
                  { label: 'Fecha de ingreso', value: selectedLead.fecha },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p style={{ fontSize: '11px', color: '#A3A3A3', fontFamily: 'var(--font-body)', marginBottom: '3px' }}>{label}</p>
                    <p style={{ fontSize: '14px', color: '#0A0A0A', fontFamily: 'var(--font-body)', fontWeight: 500, margin: 0 }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-6" style={{ border: '1px solid #E5E5E5' }}>
              <p style={{ fontSize: '11px', fontWeight: 600, color: '#737373', letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', marginBottom: '12px' }}>Publicación de interés</p>
              <p style={{ fontSize: '14px', color: '#0A0A0A', fontFamily: 'var(--font-body)', fontWeight: 500, margin: 0 }}>{selectedLead.publicacion}</p>
            </div>
            <div className="rounded-2xl p-6" style={{ border: '1px solid #E5E5E5' }}>
              <p style={{ fontSize: '11px', fontWeight: 600, color: '#737373', letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', marginBottom: '12px' }}>Mensaje</p>
              <p style={{ fontSize: '14px', color: '#525252', fontFamily: 'var(--font-body)', lineHeight: '1.6', fontStyle: 'italic', margin: 0 }}>"{selectedLead.mensaje}"</p>
            </div>
            <div className="rounded-2xl p-6" style={{ border: '1px solid #E5E5E5' }}>
              <p style={{ fontSize: '11px', fontWeight: 600, color: '#737373', letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', marginBottom: '16px' }}>Historial</p>
              <div className="space-y-4">
                {[
                  { icon: CheckCircle, color: '#006B4E', bg: '#E8F5EE', text: 'Lead creado en la plataforma', time: selectedLead.fecha },
                  ...(selectedLead.broker !== '-' ? [{ icon: UserCheck, color: '#0D9488', bg: '#F0FDFA', text: `Asignado a ${selectedLead.broker}`, time: selectedLead.fecha }] : []),
                  ...(selectedLead.estado === 'contactado' || selectedLead.estado === 'cerrado' ? [{ icon: MessageCircle, color: '#2563EB', bg: '#EFF6FF', text: 'Primer contacto realizado', time: selectedLead.fecha }] : []),
                  ...(selectedLead.estado === 'cerrado' ? [{ icon: Bookmark, color: '#006B4E', bg: '#E8F5EE', text: 'Lead marcado como cerrado', time: selectedLead.fecha }] : []),
                ].map(({ icon: Icon, color, bg, text, time }, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: bg }}>
                      <Icon className="w-3.5 h-3.5" style={{ color }} />
                    </div>
                    <div>
                      <p style={{ fontSize: '13px', color: '#0A0A0A', fontFamily: 'var(--font-body)', margin: 0 }}>{text}</p>
                      <p style={{ fontSize: '11px', color: '#A3A3A3', fontFamily: 'var(--font-body)', marginTop: '2px' }}>{time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl p-5" style={{ border: '1px solid #E5E5E5' }}>
              <p style={{ fontSize: '11px', fontWeight: 600, color: '#737373', letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', marginBottom: '12px' }}>Estado</p>
              <span style={{ backgroundColor: estStyle.bg, color: estStyle.color, fontSize: '12px', fontWeight: 600, padding: '4px 12px', borderRadius: '99px', fontFamily: 'var(--font-body)' }}>{estStyle.label}</span>
            </div>
            <div className="rounded-2xl p-5" style={{ border: '1px solid #E5E5E5' }}>
              <p style={{ fontSize: '11px', fontWeight: 600, color: '#737373', letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', marginBottom: '10px' }}>Broker asignado</p>
              <p style={{ fontSize: '14px', color: '#0A0A0A', fontFamily: 'var(--font-body)', fontWeight: 500, margin: '0 0 14px' }}>{selectedLead.broker === '-' ? 'Sin asignar' : selectedLead.broker}</p>
              <button onClick={() => { setLeadParaAsignar(selectedLead); setBrokerSeleccionado(null); }} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-colors" style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#01533E'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#006B4E'; }}>
                <UserPlus className="w-4 h-4" />{selectedLead.broker === '-' ? 'Asignar broker' : 'Reasignar broker'}
              </button>
            </div>
          </div>
        </div>
        {leadParaAsignar && <AsignarBrokerModal lead={leadParaAsignar} brokers={CTP_BROKERS_ASIGN} brokerSeleccionado={brokerSeleccionado} onSelect={setBrokerSeleccionado} onConfirm={confirmarAsignacion} onClose={() => { setLeadParaAsignar(null); setBrokerSeleccionado(null); }} asignadoOk={asignadoOk} />}
      </div>
    );
  }

  return (
    <div className="p-8">
      <SectionShell
        title="Leads"
        subtitle={`${leads.length} leads registrados en la plataforma`}
        action={
          <div className="flex items-center gap-2">
            <button onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 1400); }} className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors" style={{ color: '#006B4E', backgroundColor: '#E8F5EE', border: '1px solid #B2D8C5', fontFamily: 'var(--font-body)', fontWeight: 500 }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#D4EDDF'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#E8F5EE'; }}>
              <Activity className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Actualizar
            </button>
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors" style={{ color: '#0A0A0A', backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', fontFamily: 'var(--font-body)', fontWeight: 500 }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#FAFAFA'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#FFFFFF'; }}>
              <Download className="w-3.5 h-3.5" /> Exportar
            </button>
          </div>
        }
      />
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#A3A3A3' }} />
          <input type="text" placeholder="Buscar por nombre o email..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none" style={{ backgroundColor: '#FAFAFA', border: '1px solid #E5E5E5', fontFamily: 'var(--font-body)', color: '#0A0A0A' }} onFocus={e => { e.target.style.borderColor = '#006B4E'; e.target.style.backgroundColor = '#FFFFFF'; }} onBlur={e => { e.target.style.borderColor = '#E5E5E5'; e.target.style.backgroundColor = '#FAFAFA'; }} />
        </div>
        <select value={filtroEstado} onChange={e => setFiltroEstado(e.target.value)} className="px-3 py-2.5 rounded-xl text-sm outline-none cursor-pointer" style={{ backgroundColor: '#FAFAFA', border: '1px solid #E5E5E5', fontFamily: 'var(--font-body)', color: '#0A0A0A', minWidth: '160px' }}>
          <option value="todos">Todos los estados</option>
          <option value="nuevo">Nuevo</option>
          <option value="asignado">Asignado</option>
          <option value="contactado">Contactado</option>
          <option value="cerrado">Cerrado</option>
          <option value="no-interesado">No interesado</option>
        </select>
        <select value={filtroOrigen} onChange={e => setFiltroOrigen(e.target.value)} className="px-3 py-2.5 rounded-xl text-sm outline-none cursor-pointer" style={{ backgroundColor: '#FAFAFA', border: '1px solid #E5E5E5', fontFamily: 'var(--font-body)', color: '#0A0A0A', minWidth: '150px' }}>
          <option value="todos">Todos los orígenes</option>
          <option value="Web">Web</option>
          <option value="Meta">Meta</option>
          <option value="Google">Google</option>
          <option value="WhatsApp">WhatsApp</option>
        </select>
      </div>
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #E5E5E5', backgroundColor: '#FFFFFF' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: '#FAFAFA', borderBottom: '1px solid #E5E5E5' }}>
              <tr>
                {['Nombre', 'Contacto', 'Origen', 'Estado', 'Broker', 'Fecha', 'Acciones'].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left" style={{ fontSize: '11px', fontWeight: 600, color: '#737373', fontFamily: 'var(--font-body)', letterSpacing: '0.05em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? [1,2,3,4,5].map(i => (
                <tr key={i} style={{ borderBottom: '1px solid #F3F4F6' }}>
                  {[160,180,80,90,110,80,130].map((w,j) => (
                    <td key={j} className="px-5 py-4"><div className="h-3 rounded-full animate-pulse" style={{ backgroundColor: '#F0F0F0', width: `${w}px` }} /></td>
                  ))}
                </tr>
              )) : filtrados.length === 0 ? (
                <tr><td colSpan={7}>
                  <div className="flex flex-col items-center justify-center py-14 text-center">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3" style={{ backgroundColor: '#EFF6FF' }}><Users className="w-6 h-6" style={{ color: '#2563EB' }} /></div>
                    <p style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 500, color: '#0A0A0A', margin: '0 0 4px' }}>{search || filtroEstado !== 'todos' || filtroOrigen !== 'todos' ? 'Sin resultados' : 'Aún no hay leads'}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#737373' }}>{search || filtroEstado !== 'todos' || filtroOrigen !== 'todos' ? 'Probá con otros filtros.' : 'Los leads aparecerán aquí cuando lleguen.'}</p>
                  </div>
                </td></tr>
              ) : filtrados.map((lead, idx) => {
                const est = LEAD_ESTADO_STYLES[lead.estado] || LEAD_ESTADO_STYLES['nuevo'];
                return (
                  <tr key={lead.id} style={{ borderBottom: idx < filtrados.length - 1 ? '1px solid #F3F4F6' : 'none' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#FAFAFA'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#FFFFFF'; }}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#EFF6FF' }}>
                          <span style={{ fontSize: '11px', fontWeight: 700, color: '#2563EB' }}>{lead.nombre.charAt(0)}</span>
                        </div>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#0A0A0A', fontFamily: 'var(--font-body)' }}>{lead.nombre}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5"><Mail className="w-3 h-3 flex-shrink-0" style={{ color: '#A3A3A3' }} /><span style={{ fontSize: '12px', color: '#737373', fontFamily: 'var(--font-body)' }}>{lead.email}</span></div>
                        <div className="flex items-center gap-1.5"><Phone className="w-3 h-3 flex-shrink-0" style={{ color: '#A3A3A3' }} /><span style={{ fontSize: '12px', color: '#737373', fontFamily: 'var(--font-body)' }}>{lead.telefono}</span></div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ backgroundColor: '#FAFAFA', border: '1px solid #E5E5E5' }}>
                        <span style={{ fontSize: '13px' }}>{ORIGEN_ICONS[lead.origen] || '🌐'}</span>
                        <span style={{ fontSize: '12px', fontWeight: 500, color: '#0A0A0A', fontFamily: 'var(--font-body)' }}>{lead.origen}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span style={{ backgroundColor: est.bg, color: est.color, fontSize: '12px', fontWeight: 600, padding: '3px 10px', borderRadius: '99px', fontFamily: 'var(--font-body)' }}>{est.label}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span style={{ fontSize: '13px', color: lead.broker === '-' ? '#A3A3A3' : '#0A0A0A', fontFamily: 'var(--font-body)' }}>{lead.broker === '-' ? 'Sin asignar' : lead.broker}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span style={{ fontSize: '12px', color: '#737373', fontFamily: 'var(--font-body)' }}>{lead.fecha}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => { setLeadParaAsignar(lead); setBrokerSeleccionado(null); }} className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium transition-colors" style={{ color: '#006B4E', backgroundColor: '#E8F5EE', border: '1px solid #B2D8C5', fontFamily: 'var(--font-body)' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#D4EDDF'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#E8F5EE'; }}>
                          <UserPlus className="w-3.5 h-3.5" />{lead.broker === '-' ? 'Asignar' : 'Reasignar'}
                        </button>
                        <button onClick={() => setSelectedLead(lead)} className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium transition-colors" style={{ color: '#0A0A0A', backgroundColor: '#FAFAFA', border: '1px solid #E5E5E5', fontFamily: 'var(--font-body)' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#F0F0F0'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#FAFAFA'; }}>
                          <Eye className="w-3.5 h-3.5" />Ver detalle
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {leadParaAsignar && <AsignarBrokerModal lead={leadParaAsignar} brokers={CTP_BROKERS_ASIGN} brokerSeleccionado={brokerSeleccionado} onSelect={setBrokerSeleccionado} onConfirm={confirmarAsignacion} onClose={() => { setLeadParaAsignar(null); setBrokerSeleccionado(null); }} asignadoOk={asignadoOk} />}
    </div>
  );
}

// ─── Brokers mock data ────────────────────────────────────────────────────────

const CTP_BROKERS_DATA = [
  { id: 'b001', nombre: 'Carlos Pérez',     email: 'carlos.perez@ctp.cl',     leadsAsignados: 14, contactos: 38, ultimaActividad: 'Hace 1h',      estado: 'activo'   as const },
  { id: 'b002', nombre: 'Sofía Ramírez',    email: 'sofia.ramirez@ctp.cl',    leadsAsignados: 9,  contactos: 21, ultimaActividad: 'Hace 3h',      estado: 'activo'   as const },
  { id: 'b003', nombre: 'Diego Muñoz',      email: 'diego.munoz@ctp.cl',      leadsAsignados: 17, contactos: 44, ultimaActividad: 'Hace 5h',      estado: 'activo'   as const },
  { id: 'b004', nombre: 'Ana Valenzuela',   email: 'ana.valenzuela@ctp.cl',   leadsAsignados: 3,  contactos: 8,  ultimaActividad: 'Hace 2 días',  estado: 'inactivo' as const },
  { id: 'b005', nombre: 'Roberto Castillo', email: 'r.castillo@ctp.cl',       leadsAsignados: 11, contactos: 29, ultimaActividad: 'Ayer 14:20',   estado: 'activo'   as const },
  { id: 'b006', nombre: 'Valentina Mora',   email: 'v.mora@ctp.cl',           leadsAsignados: 6,  contactos: 15, ultimaActividad: 'Hace 6h',      estado: 'activo'   as const },
  { id: 'b007', nombre: 'Gonzalo Ibáñez',   email: 'g.ibanez@ctp.cl',         leadsAsignados: 0,  contactos: 0,  ultimaActividad: 'Hace 1 semana',estado: 'inactivo' as const },
  { id: 'b008', nombre: 'Patricia Flores',  email: 'p.flores@ctp.cl',         leadsAsignados: 8,  contactos: 20, ultimaActividad: 'Hace 2h',      estado: 'activo'   as const },
];

// ─── CTPBrokersView ───────────────────────────────────────────────────────────

function CTPBrokersView() {
  const [brokers, setBrokers] = useState(CTP_BROKERS_DATA);
  const [search, setSearch] = useState('');
  const [filtro, setFiltro] = useState<'todos' | 'activos' | 'inactivos'>('todos');
  const [loading, setLoading] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const filtrados = brokers.filter(b => {
    const matchSearch = b.nombre.toLowerCase().includes(search.toLowerCase()) || b.email.toLowerCase().includes(search.toLowerCase());
    const matchFiltro = filtro === 'todos' || (filtro === 'activos' ? b.estado === 'activo' : b.estado === 'inactivo');
    return matchSearch && matchFiltro;
  });

  function handleToggle(id: string) {
    const broker = brokers.find(b => b.id === id);
    if (!broker) return;
    if (broker.estado === 'activo') {
      setConfirmId(id);
    } else {
      setBrokers(prev => prev.map(b => b.id === id ? { ...b, estado: 'activo' as const } : b));
    }
  }

  function confirmarDesactivacion() {
    if (!confirmId) return;
    setBrokers(prev => prev.map(b => b.id === confirmId ? { ...b, estado: 'inactivo' as const } : b));
    setConfirmId(null);
  }

  const brokerConfirm = brokers.find(b => b.id === confirmId);

  return (
    <div className="p-8">
      <SectionShell
        title="Brokers"
        subtitle={`${brokers.length} brokers registrados en la plataforma`}
        action={
          <button onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 1400); }} className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors" style={{ color: '#006B4E', backgroundColor: '#E8F5EE', border: '1px solid #B2D8C5', fontFamily: 'var(--font-body)', fontWeight: 500 }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#D4EDDF'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#E8F5EE'; }}>
            <Activity className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Actualizar
          </button>
        }
      />
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#A3A3A3' }} />
            <input type="text" placeholder="Buscar broker..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none" style={{ backgroundColor: '#FAFAFA', border: '1px solid #E5E5E5', fontFamily: 'var(--font-body)', color: '#0A0A0A', width: '260px' }} onFocus={e => { e.target.style.borderColor = '#006B4E'; e.target.style.backgroundColor = '#FFFFFF'; }} onBlur={e => { e.target.style.borderColor = '#E5E5E5'; e.target.style.backgroundColor = '#FAFAFA'; }} />
          </div>
          <select value={filtro} onChange={e => setFiltro(e.target.value as any)} className="px-3 py-2.5 rounded-xl text-sm outline-none cursor-pointer" style={{ backgroundColor: '#FAFAFA', border: '1px solid #E5E5E5', fontFamily: 'var(--font-body)', color: '#0A0A0A' }}>
            <option value="todos">Todos los brokers</option>
            <option value="activos">Solo activos</option>
            <option value="inactivos">Solo inactivos</option>
          </select>
        </div>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#737373' }}>{filtrados.length} broker{filtrados.length !== 1 ? 's' : ''}</span>
      </div>
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #E5E5E5', backgroundColor: '#FFFFFF' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: '#FAFAFA', borderBottom: '1px solid #E5E5E5' }}>
              <tr>
                {['Broker', 'Email', 'Leads asignados', 'Contactos', 'Última actividad', 'Estado', 'Acciones'].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left" style={{ fontSize: '11px', fontWeight: 600, color: '#737373', fontFamily: 'var(--font-body)', letterSpacing: '0.05em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? [1,2,3,4].map(i => (
                <tr key={i} style={{ borderBottom: '1px solid #F3F4F6' }}>
                  {[160,180,90,70,110,80,120].map((w,j) => (
                    <td key={j} className="px-5 py-4"><div className="h-3 rounded-full animate-pulse" style={{ backgroundColor: '#F0F0F0', width: `${w}px` }} /></td>
                  ))}
                </tr>
              )) : filtrados.length === 0 ? (
                <tr><td colSpan={7}>
                  <div className="flex flex-col items-center justify-center py-14 text-center">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3" style={{ backgroundColor: '#F0FDFA' }}><UserCheck className="w-6 h-6" style={{ color: '#0D9488' }} /></div>
                    <p style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 500, color: '#0A0A0A', margin: '0 0 4px' }}>{search || filtro !== 'todos' ? 'Sin resultados' : 'No hay brokers registrados'}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#737373' }}>{search || filtro !== 'todos' ? 'Probá con otros filtros.' : 'Los brokers aparecerán aquí una vez que se registren.'}</p>
                  </div>
                </td></tr>
              ) : filtrados.map((broker, idx) => (
                <tr key={broker.id} style={{ borderBottom: idx < filtrados.length - 1 ? '1px solid #F3F4F6' : 'none' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#FAFAFA'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#FFFFFF'; }}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: broker.estado === 'activo' ? '#F0FDFA' : '#F5F5F5' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: broker.estado === 'activo' ? '#0D9488' : '#737373' }}>{broker.nombre.charAt(0)}</span>
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#0A0A0A', fontFamily: 'var(--font-body)' }}>{broker.nombre}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4"><span style={{ fontSize: '13px', color: '#737373', fontFamily: 'var(--font-body)' }}>{broker.email}</span></td>
                  <td className="px-5 py-4 text-center"><span style={{ fontSize: '16px', fontWeight: 700, color: '#0A0A0A', fontFamily: 'var(--font-heading)' }}>{broker.leadsAsignados}</span></td>
                  <td className="px-5 py-4 text-center"><span style={{ fontSize: '16px', fontWeight: 700, color: '#0A0A0A', fontFamily: 'var(--font-heading)' }}>{broker.contactos}</span></td>
                  <td className="px-5 py-4"><span style={{ fontSize: '13px', color: '#737373', fontFamily: 'var(--font-body)' }}>{broker.ultimaActividad}</span></td>
                  <td className="px-5 py-4">
                    <span style={{ fontSize: '12px', fontWeight: 600, padding: '3px 10px', borderRadius: '99px', fontFamily: 'var(--font-body)', backgroundColor: broker.estado === 'activo' ? '#DCFCE7' : '#F5F5F5', color: broker.estado === 'activo' ? '#16A34A' : '#737373' }}>
                      {broker.estado === 'activo' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button onClick={() => handleToggle(broker.id)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors" style={{ fontFamily: 'var(--font-body)', color: '#0A0A0A', backgroundColor: '#FAFAFA', border: '1px solid #E5E5E5' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#F0F0F0'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#FAFAFA'; }}>
                      {broker.estado === 'activo'
                        ? <><ToggleRight className="w-4 h-4" style={{ color: '#16A34A' }} />Desactivar</>
                        : <><ToggleLeft className="w-4 h-4" style={{ color: '#737373' }} />Activar</>}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {confirmId && brokerConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="w-full max-w-sm rounded-2xl overflow-hidden" style={{ backgroundColor: '#FFFFFF', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <div className="p-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: '#FEF3C7' }}>
                <AlertTriangle className="w-6 h-6" style={{ color: '#CA8A04' }} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 600, color: '#0A0A0A', margin: '0 0 8px' }}>¿Desactivar a {brokerConfirm.nombre}?</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#737373', lineHeight: '1.6', margin: '0 0 24px' }}>
                El broker quedará inactivo y no podrá recibir nuevos leads hasta que sea reactivado. Los leads ya asignados no se verán afectados.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setConfirmId(null)} className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors" style={{ fontFamily: 'var(--font-body)', color: '#0A0A0A', backgroundColor: '#F5F5F5', border: '1px solid #E5E5E5' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#E5E5E5'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#F5F5F5'; }}>Cancelar</button>
                <button onClick={confirmarDesactivacion} className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors" style={{ fontFamily: 'var(--font-body)', color: '#FFFFFF', backgroundColor: '#CA8A04' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#A16207'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#CA8A04'; }}>Sí, desactivar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
