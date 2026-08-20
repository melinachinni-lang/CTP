import React, { useState, useRef, useEffect } from 'react';
import { Building2, Bell, Globe, Shield, Upload, Eye, EyeOff, Check, User, LogOut, X, Plus, Monitor, Smartphone, Tablet, AlertTriangle, Award, Briefcase, Image, Star, Copy, BarChart2, Users, MapPin, Phone, Mail, ShieldCheck, FileText, BadgeCheck, Link2, Search, MoreHorizontal, MessageCircle, ChevronDown, Settings, Zap, Target, Activity, Clock, Power, Wrench } from 'lucide-react';
import { ContactosWhatsAppAdminView } from '@/app/components/ContactosWhatsAppAdminView';

// ─── Types ───────────────────────────────────────────────────────────────────

type UserRol = 'Admin' | 'Broker' | 'Editor' | 'Moderador' | 'Solo lectura';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getInitials(name: string) {
  return name.split(' ').filter(Boolean).map(w => w[0]).join('').substring(0, 2).toUpperCase();
}

const INITIALS_COLORS = [
  { bg: '#DCFCE7', text: '#166534' },
  { bg: '#DBEAFE', text: '#1E40AF' },
  { bg: '#F5F3FF', text: '#6D28D9' },
  { bg: '#FEF3C7', text: '#92400E' },
  { bg: '#FFE4E6', text: '#9F1239' },
];
function getColor(name: string) {
  return INITIALS_COLORS[name.charCodeAt(0) % INITIALS_COLORS.length];
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const EQUIPO_MOCK = [
  { id: 1, nombre: 'Carlos Andrés Muñoz', rol: 'Broker Senior', publicaciones: 12 },
  { id: 2, nombre: 'Javiera Paz Rojas', rol: 'Broker', publicaciones: 7 },
  { id: 3, nombre: 'Felipe Castillo', rol: 'Broker', publicaciones: 4 },
];

const USUARIOS_INIT: { id: number; nombre: string; email: string; rol: UserRol; ultimoAcceso: string }[] = [
  { id: 1, nombre: 'María Fernanda González', email: 'mfernanda@vallecentral.cl', rol: 'Admin',        ultimoAcceso: 'Hace 2 horas' },
  { id: 2, nombre: 'Carlos Andrés Muñoz',     email: 'cmunoz@vallecentral.cl',    rol: 'Broker',       ultimoAcceso: 'Hace 1 día' },
  { id: 3, nombre: 'Javiera Paz Rojas',        email: 'jrojas@vallecentral.cl',    rol: 'Editor',       ultimoAcceso: 'Hace 3 días' },
];

const SESIONES_INIT = [
  { id: 's1', dispositivo: 'MacBook Pro', browser: 'Chrome 124',     ubicacion: 'Santiago, Chile',   tiempo: 'Activa ahora',  esCurrent: true,  icon: 'monitor' as const },
  { id: 's2', dispositivo: 'iPhone 15',   browser: 'Safari Mobile',  ubicacion: 'Santiago, Chile',   tiempo: 'Hace 2 horas',  esCurrent: false, icon: 'phone' as const },
  { id: 's3', dispositivo: 'iPad Pro',    browser: 'Safari',          ubicacion: 'Viña del Mar, Chile', tiempo: 'Hace 1 día', esCurrent: false, icon: 'tablet' as const },
];

// ─── Subcomponents ────────────────────────────────────────────────────────────

function DeviceIcon({ type }: { type: 'monitor' | 'phone' | 'tablet' }) {
  const cls = 'w-5 h-5';
  const col = '#6B7280';
  if (type === 'phone')  return <Smartphone className={cls} style={{ color: col }} />;
  if (type === 'tablet') return <Tablet className={cls} style={{ color: col }} />;
  return <Monitor className={cls} style={{ color: col }} />;
}

function RequirementRow({ met, label }: { met: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
        style={{ backgroundColor: met ? '#16A34A' : '#E5E7EB' }}
      >
        {met && <Check className="w-2.5 h-2.5" style={{ color: '#FFFFFF' }} />}
      </div>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: met ? '#15803D' : '#9CA3AF' }}>
        {label}
      </span>
    </div>
  );
}

const BROKERS_MOCK = [
  { id: 1, nombre: 'Carlos Pérez',    email: 'carlos@ctp.cl',  asignados: 12, cerrados: 4,  status: 'activo'    as const },
  { id: 2, nombre: 'Sofía Ramírez',   email: 'sofia@ctp.cl',   asignados: 8,  cerrados: 2,  status: 'activo'    as const },
  { id: 3, nombre: 'Diego Muñoz',     email: 'diego@ctp.cl',   asignados: 15, cerrados: 7,  status: 'activo'    as const },
  { id: 4, nombre: 'Valentina Cruz',  email: 'val@ctp.cl',     asignados: 3,  cerrados: 1,  status: 'pendiente' as const },
  { id: 5, nombre: 'Martín Salinas',  email: 'martin@ctp.cl',  asignados: 0,  cerrados: 0,  status: 'inactivo'  as const },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export function SettingsContent({ mode = 'settings', userType = 'inmobiliaria' }: { mode?: 'profile' | 'settings'; userType?: 'inmobiliaria' | 'broker' | 'personal' | 'ctp' }) {
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'users' | 'security' | 'whatsapp' | 'sistema'>(
    mode === 'profile' ? 'profile' : 'preferences'
  );
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'success'>('idle');

  // — Perfil form state
  const [perfil, setPerfil] = useState({
    nombre: 'Inmobiliaria Valle Central',
    descripcion: 'Inmobiliaria especializada en parcelas de agrado.',
    quienesSomos: 'Con más de 15 años de experiencia, conectamos a personas con sus terrenos ideales en la zona central de Chile.',
    email: 'contacto@vallecentral.cl',
    telefono: '+56 9 8765 4321',
    whatsapp: '+56 9 8765 4321',
    web: 'www.vallecentral.cl',
    direccion: 'Av. Principal 1234, Santiago',
  });
  const [hasBanner, setHasBanner] = useState(false);
  const [servicios, setServicios] = useState(['Tasación de propiedades', 'Asesoramiento legal', 'Financiamiento', 'Gestión de proyectos']);
  const [certificaciones, setCertificaciones] = useState(['Miembro CCHC', 'ISO 9001:2015']);
  const [newServicio, setNewServicio] = useState('');
  const [newCertificacion, setNewCertificacion] = useState('');

  // — Perfil personal state
  const [perfilPersonal, setPerfilPersonal] = useState({
    nombre: 'Carlos Muñoz',
    descripcion: 'Propietario directo - Sin intermediarios',
    ciudad: 'Coyhaique',
    region: 'Aysén',
    telefono: '+56 9 5555 1234',
    email: 'carlos.munoz@email.cl',
    whatsapp: '+56 9 5555 1234',
  });
  const [hasAvatarPersonal, setHasAvatarPersonal] = useState(false);
  const [hasBannerPersonal, setHasBannerPersonal] = useState(false);
  const [tipoNumeroPersonal, setTipoNumeroPersonal] = useState<'Celular' | 'Teléfono'>('Celular');
  const [tipoNumeroOpen, setTipoNumeroOpen] = useState(false);
  const tipoNumeroRef = useRef<HTMLDivElement>(null);

  // — Perfil broker state
  const [perfilBroker, setPerfilBroker] = useState({
    nombre: 'Carlos Andrés Muñoz',
    especialidad: 'Broker especializado en parcelas de agrado',
    descripcion: 'Más de 8 años conectando familias con su terreno ideal. Especializado en la zona central y sur de Chile.',
    ciudad: 'Santiago',
    region: 'Metropolitana',
    telefono: '+56 9 8765 4321',
    email: 'carlos.munoz@vallecentral.cl',
    experiencia: '8',
  });
  const [hasAvatarBroker, setHasAvatarBroker] = useState(false);
  const [hasBannerBroker, setHasBannerBroker] = useState(false);
  const [zonas, setZonas] = useState(["Región Metropolitana", "Valparaíso", "O'Higgins"]);
  const [newZona, setNewZona] = useState('');
  const [idiomas, setIdiomas] = useState(['Español', 'Inglés']);
  const [newIdioma, setNewIdioma] = useState('');
  const [certificacionesBroker, setCertificacionesBroker] = useState(['Certificado CChC', 'Mediador Inmobiliario']);
  const [newCertificacionBroker, setNewCertificacionBroker] = useState('');

  // — Sistema state (CTP only)
  const [modulosActivos, setModulosActivos] = useState({ leads: true, publicaciones: true, asignacionAutomatica: false, mantenimiento: false });
  const [confirmModulo, setConfirmModulo] = useState<null | { key: string; nombre: string }>(null);
  const [iaActiva, setIaActiva] = useState(true);
  const [scoringLevel, setScoringLevel] = useState<'conservador' | 'medio' | 'agresivo'>('medio');
  const [reasignacionAuto, setReasignacionAuto] = useState(true);
  const [horasReasignacion, setHorasReasignacion] = useState('24');
  const [prioridadLeads, setPrioridadLeads] = useState('proyecto');
  const [diasInactivo, setDiasInactivo] = useState('30');
  const [sistemaSaved, setSistemaSaved] = useState(false);
  const [isLoadingSistema, setIsLoadingSistema] = useState(false);
  const [mensajeGlobalActivo, setMensajeGlobalActivo] = useState(false);
  const [mensajeGlobalTitulo, setMensajeGlobalTitulo] = useState('');
  const [mensajeGlobalTexto, setMensajeGlobalTexto] = useState('');
  const [mensajeGlobalTipo, setMensajeGlobalTipo] = useState<'info' | 'advertencia' | 'mantenimiento'>('info');
  const [mensajeGlobalVisibilidad, setMensajeGlobalVisibilidad] = useState('todos');

  // — Preferencias state
  const [notifs, setNotifs] = useState({ newInquiry: true, statusChange: true, teamActivity: false, updates: true });
  const [idioma, setIdioma] = useState('es-CL');
  const [timezone, setTimezone] = useState('America/Santiago');

  // — Usuarios state
  const [usuarios, setUsuarios] = useState(USUARIOS_INIT);
  const [brokerQuery, setBrokerQuery] = useState('');
  const [brokerMenuOpen, setBrokerMenuOpen] = useState<number | null>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRol, setInviteRol] = useState<UserRol>('Broker');
  const [inviteError, setInviteError] = useState('');
  const [editingUser, setEditingUser] = useState<{ id: number; nombre: string; rol: UserRol } | null>(null);
  const [newRol, setNewRol] = useState<UserRol>('Broker');

  // — Seguridad state
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass]         = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showCurrentPass, setShowCurrentPass]   = useState(false);
  const [showNewPass, setShowNewPass]           = useState(false);
  const [showConfirmPass, setShowConfirmPass]   = useState(false);
  const [passwordSaved, setPasswordSaved]       = useState(false);
  const [sessions, setSessions]                 = useState(SESIONES_INIT);
  const [showCloseAllConfirm, setShowCloseAllConfirm] = useState(false);

  // Password requirements
  const passReqs = [
    { label: 'Mínimo 8 caracteres',   met: newPass.length >= 8 },
    { label: 'Al menos una mayúscula', met: /[A-Z]/.test(newPass) },
    { label: 'Al menos un número',    met: /[0-9]/.test(newPass) },
  ];
  const passMatch = newPass === confirmPass && newPass.length > 0;
  const passValid = passReqs.every(r => r.met) && passMatch && currentPass.length > 0;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (tipoNumeroRef.current && !tipoNumeroRef.current.contains(e.target as Node)) setTipoNumeroOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (activeTab === 'sistema') {
      setIsLoadingSistema(true);
      const t = setTimeout(() => setIsLoadingSistema(false), 1400);
      return () => clearTimeout(t);
    }
  }, [activeTab]);

  // ─── Handlers ──────────────────────────────────────────────────────────────

  const handleSave = () => {
    setSaveState('saving');
    setTimeout(() => {
      setSaveState('success');
      setTimeout(() => setSaveState('idle'), 3000);
    }, 1200);
  };

  const handlePasswordSave = () => {
    if (!passValid) return;
    setPasswordSaved(true);
    setCurrentPass(''); setNewPass(''); setConfirmPass('');
    setTimeout(() => setPasswordSaved(false), 3500);
  };


  const handleInviteUser = () => {
    if (!inviteEmail.trim() || !inviteEmail.includes('@')) {
      setInviteError('Ingresa un email válido');
      return;
    }
    const newUser = {
      id: Date.now(),
      nombre: inviteEmail.split('@')[0].replace(/[._-]/g, ' '),
      email: inviteEmail.trim(),
      rol: inviteRol,
      ultimoAcceso: 'Invitado',
    };
    setUsuarios(prev => [...prev, newUser]);
    setInviteEmail(''); setInviteRol('Broker'); setInviteError('');
    setShowInviteModal(false);
  };

  const handleRolChange = () => {
    if (!editingUser) return;
    setUsuarios(prev => prev.map(u => u.id === editingUser.id ? { ...u, rol: newRol } : u));
    setEditingUser(null);
  };

  const handleCloseSession = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
  };

  const handleCloseAllSessions = () => {
    setSessions(prev => prev.filter(s => s.esCurrent));
    setShowCloseAllConfirm(false);
  };

  const showSaveCTA = mode === 'profile' || activeTab === 'preferences';

  // ─── Render ────────────────────────────────────────────────────────────────

  const tabs = [
    { id: 'preferences', label: 'Preferencias',         icon: Bell },
    { id: 'users',       label: 'Usuarios y permisos',  icon: User },
    ...((userType === 'inmobiliaria' || userType === 'broker') ? [{ id: 'whatsapp', label: 'Canales de contacto', icon: MessageCircle }] : []),
    { id: 'security',    label: 'Seguridad',             icon: Shield },
    ...(userType === 'ctp' ? [{ id: 'sistema', label: 'Sistema', icon: Settings }] : []),
  ];

  return (
    <main className="px-6 py-6 space-y-6">

      {/* Header */}
      <div className="space-y-1">
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h2)', fontWeight: 500, color: '#0A0A0A', lineHeight: 'var(--line-height-heading)' }}>
          {mode === 'profile' ? 'Perfil' : 'Configuración'}
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', color: '#6B6B6B', lineHeight: 'var(--line-height-body)' }}>
          {mode === 'profile'
            ? userType === 'broker' ? 'Tu perfil profesional visible para compradores e inmobiliarias'
            : userType === 'personal' ? 'Información pública de tu perfil'
            : 'Información pública de tu inmobiliaria'
            : 'Seguridad, notificaciones y equipo'}
        </p>
      </div>

      {/* Success toast — profile / preferences save */}
      {saveState === 'success' && (
        <div className="fixed bottom-6 left-1/2 z-[9999] flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg" style={{ transform: 'translateX(-50%)', backgroundColor: '#0A0A0A', color: '#FFFFFF', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', minWidth: '280px' }}>
          <Check className="w-4 h-4 flex-shrink-0" style={{ color: '#86EFAC' }} />
          {activeTab === 'profile' ? 'Perfil actualizado correctamente.' : 'Preferencias guardadas correctamente.'}
        </div>
      )}

      {/* Password saved toast */}
      {passwordSaved && (
        <div className="fixed bottom-6 left-1/2 z-[9999] flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg" style={{ transform: 'translateX(-50%)', backgroundColor: '#0A0A0A', color: '#FFFFFF', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', minWidth: '280px' }}>
          <Check className="w-4 h-4 flex-shrink-0" style={{ color: '#86EFAC' }} />
          Contraseña actualizada correctamente.
        </div>
      )}

      {/* Tabs — solo en modo settings */}
      {mode === 'settings' && (
        <div className="flex gap-1 p-1 rounded-2xl overflow-x-auto" style={{ backgroundColor: '#F3F4F6' }}>
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition-all whitespace-nowrap"
                style={{
                  fontFamily: 'var(--font-body)',
                  borderRadius: '200px',
                  backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                  color: isActive ? '#0A0A0A' : '#6B7280',
                  boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Content card */}
      <div className="rounded-2xl" style={{ border: '1.5px solid #E5E5E5', backgroundColor: '#FFFFFF' }}>

        {/* ── Tab: Perfil ──────────────────────────────────────────────────── */}
        {activeTab === 'profile' && userType === 'personal' && (
          <div className="p-6 space-y-6">
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h3)', fontWeight: 500, color: '#0A0A0A' }}>
              Tu perfil público
            </h2>

            {/* Banner */}
            <div>
              <p className="mb-3" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151' }}>
                Banner
              </p>
              {hasBannerPersonal ? (
                <div className="relative w-full rounded-xl overflow-hidden" style={{ height: '128px' }}>
                  <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #4a90a4 100%)' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 600, color: '#FFFFFF', opacity: 0.6 }}>
                      Banner — Carlos Muñoz
                    </span>
                  </div>
                  <button
                    onClick={() => setHasBannerPersonal(false)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.7)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)'}
                  >
                    <X className="w-3.5 h-3.5" style={{ color: '#FFFFFF' }} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setHasBannerPersonal(true)}
                  className="w-full flex flex-col items-center justify-center gap-2 rounded-xl transition-all"
                  style={{ height: '128px', border: '2px dashed #D1D5DB', backgroundColor: '#FAFAFA' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#006B4E'; e.currentTarget.style.backgroundColor = '#F0FDF4'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#D1D5DB'; e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
                >
                  <Image className="w-6 h-6" style={{ color: '#9CA3AF' }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#6B7280' }}>Subir banner</span>
                </button>
              )}
              <p className="mt-1.5" style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF' }}>
                Se mostrará como fondo en tu perfil público. Recomendado: 1200×300 px, máximo 5 MB
              </p>
            </div>

            {/* Foto de perfil */}
            <div style={{ paddingTop: '8px', borderTop: '1px solid #F0F0F0' }}>
              <p className="mb-3" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151' }}>
                Foto de perfil
              </p>
              <div className="flex items-center gap-4">
                {hasAvatarPersonal ? (
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: '#DCFCE7' }}>
                      <span style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700, color: '#166534' }}>
                        {getInitials(perfilPersonal.nombre)}
                      </span>
                    </div>
                    <button
                      onClick={() => setHasAvatarPersonal(false)}
                      className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: '#DC2626' }}
                    >
                      <X className="w-3 h-3" style={{ color: '#FFFFFF' }} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setHasAvatarPersonal(true)}
                    className="w-20 h-20 rounded-full flex flex-col items-center justify-center flex-shrink-0 transition-all"
                    style={{ border: '2px dashed #D1D5DB', backgroundColor: '#FAFAFA' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#006B4E'; e.currentTarget.style.backgroundColor = '#F0FDF4'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#D1D5DB'; e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
                  >
                    <Upload className="w-5 h-5" style={{ color: '#9CA3AF' }} />
                  </button>
                )}
                <div className="space-y-1">
                  <button
                    onClick={() => setHasAvatarPersonal(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all"
                    style={{ border: '1.5px solid #E5E5E5', color: '#0A0A0A', fontFamily: 'var(--font-body)', backgroundColor: '#FFFFFF' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                  >
                    <Upload className="w-4 h-4" /> Subir foto
                  </button>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF' }}>PNG o JPG, máximo 2 MB</p>
                </div>
              </div>
            </div>

            {/* Nombre */}
            <div style={{ paddingTop: '8px', borderTop: '1px solid #F0F0F0' }}>
              <label className="block mb-2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151' }}>
                Nombre completo <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <input
                type="text"
                value={perfilPersonal.nombre}
                onChange={e => setPerfilPersonal(p => ({ ...p, nombre: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl text-sm transition-colors"
                style={{ border: `1.5px solid ${perfilPersonal.nombre ? '#E5E5E5' : '#DC2626'}`, fontFamily: 'var(--font-body)', color: '#0A0A0A', outline: 'none', backgroundColor: '#FAFAFA' }}
                onFocus={e => e.target.style.borderColor = '#006B4E'}
                onBlur={e => e.target.style.borderColor = perfilPersonal.nombre ? '#E5E5E5' : '#DC2626'}
              />
            </div>

            {/* Descripción corta */}
            <div>
              <label className="block mb-2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151' }}>
                Descripción corta
              </label>
              <textarea
                rows={2}
                value={perfilPersonal.descripcion}
                onChange={e => setPerfilPersonal(p => ({ ...p, descripcion: e.target.value }))}
                placeholder="Ej: Propietario directo - Sin intermediarios"
                className="w-full px-4 py-3 rounded-xl text-sm resize-none transition-colors"
                style={{ border: '1.5px solid #E5E5E5', fontFamily: 'var(--font-body)', color: '#0A0A0A', outline: 'none', backgroundColor: '#FAFAFA', lineHeight: '1.6' }}
                onFocus={e => e.target.style.borderColor = '#006B4E'}
                onBlur={e => e.target.style.borderColor = '#E5E5E5'}
              />
              <p className="mt-1 text-right" style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF' }}>
                {perfilPersonal.descripcion.length}/160 caracteres
              </p>
            </div>

            {/* Ubicación */}
            <div style={{ paddingTop: '8px', borderTop: '1px solid #F0F0F0' }}>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4" style={{ color: '#6B7280' }} />
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#374151' }}>
                  Ubicación
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="block mb-2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151' }}>Ciudad</label>
                  <input
                    type="text"
                    value={perfilPersonal.ciudad}
                    onChange={e => setPerfilPersonal(p => ({ ...p, ciudad: e.target.value }))}
                    placeholder="Ej: Santiago"
                    className="w-full px-4 py-3 rounded-xl text-sm transition-colors"
                    style={{ border: '1.5px solid #E5E5E5', fontFamily: 'var(--font-body)', color: '#0A0A0A', outline: 'none', backgroundColor: '#FAFAFA' }}
                    onFocus={e => e.target.style.borderColor = '#006B4E'}
                    onBlur={e => e.target.style.borderColor = '#E5E5E5'}
                  />
                </div>
                <div>
                  <label className="block mb-2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151' }}>Región</label>
                  <input
                    type="text"
                    value={perfilPersonal.region}
                    onChange={e => setPerfilPersonal(p => ({ ...p, region: e.target.value }))}
                    placeholder="Ej: Metropolitana"
                    className="w-full px-4 py-3 rounded-xl text-sm transition-colors"
                    style={{ border: '1.5px solid #E5E5E5', fontFamily: 'var(--font-body)', color: '#0A0A0A', outline: 'none', backgroundColor: '#FAFAFA' }}
                    onFocus={e => e.target.style.borderColor = '#006B4E'}
                    onBlur={e => e.target.style.borderColor = '#E5E5E5'}
                  />
                </div>
              </div>
            </div>

            {/* Información de contacto */}
            <div style={{ paddingTop: '8px', borderTop: '1px solid #F0F0F0' }}>
              <div className="flex items-center gap-2 mb-3">
                <Phone className="w-4 h-4" style={{ color: '#6B7280' }} />
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#374151' }}>
                  Información de contacto
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>

                {/* WhatsApp o número de contacto con dropdown de tipo */}
                <div>
                  <label className="block mb-2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151' }}>
                    WhatsApp o número de contacto
                  </label>
                  <div className="flex rounded-xl overflow-visible" style={{ border: '1.5px solid #E5E5E5', backgroundColor: '#FAFAFA' }}
                    onFocus={() => {}} >
                    {/* Dropdown tipo */}
                    <div className="relative flex-shrink-0" ref={tipoNumeroRef}>
                      <button
                        type="button"
                        onClick={() => setTipoNumeroOpen(prev => !prev)}
                        className="flex items-center gap-1.5 px-3 h-full text-sm transition-colors"
                        style={{
                          borderRight: '1.5px solid #E5E5E5',
                          backgroundColor: '#F5F5F5',
                          color: '#374151',
                          fontFamily: 'var(--font-body)',
                          borderRadius: '0',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {tipoNumeroPersonal}
                        <ChevronDown className="w-3.5 h-3.5" style={{ color: '#9CA3AF' }} />
                      </button>
                      {tipoNumeroOpen && (
                        <div className="absolute left-0 top-full mt-1 rounded-xl shadow-lg z-50 overflow-hidden"
                          style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', minWidth: '120px' }}>
                          {(['Celular', 'Teléfono'] as const).map(tipo => (
                            <button key={tipo} type="button"
                              onClick={() => { setTipoNumeroPersonal(tipo); setTipoNumeroOpen(false); }}
                              className="w-full flex items-center justify-between px-4 py-2.5 text-sm"
                              style={{
                                fontFamily: 'var(--font-body)',
                                color: tipoNumeroPersonal === tipo ? '#006B4E' : '#374151',
                                fontWeight: tipoNumeroPersonal === tipo ? 500 : 400,
                                backgroundColor: tipoNumeroPersonal === tipo ? '#F0FDF4' : '#FFFFFF',
                                cursor: 'pointer',
                              }}
                              onMouseEnter={e => { if (tipoNumeroPersonal !== tipo) e.currentTarget.style.backgroundColor = '#F9FAFB'; }}
                              onMouseLeave={e => { e.currentTarget.style.backgroundColor = tipoNumeroPersonal === tipo ? '#F0FDF4' : '#FFFFFF'; }}
                            >
                              {tipo}
                              {tipoNumeroPersonal === tipo && <Check className="w-3.5 h-3.5" style={{ color: '#006B4E' }} />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* Input número */}
                    <input
                      type="tel"
                      value={perfilPersonal.telefono}
                      placeholder="+56 9 1234 5678"
                      onChange={e => setPerfilPersonal(p => ({ ...p, telefono: e.target.value, whatsapp: e.target.value }))}
                      className="flex-1 px-3 py-3 text-sm"
                      style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', color: '#0A0A0A', fontFamily: 'var(--font-body)' }}
                    />
                  </div>
                  <p className="mt-1.5" style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF' }}>
                    Este número aparecerá en los botones de contacto de tu perfil público
                  </p>
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151' }}>
                    Email de contacto
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9CA3AF' }} />
                    <input
                      type="email"
                      value={perfilPersonal.email}
                      placeholder="tu@email.cl"
                      onChange={e => setPerfilPersonal(p => ({ ...p, email: e.target.value }))}
                      className="w-full pl-9 pr-4 py-3 rounded-xl text-sm transition-colors"
                      style={{ border: '1.5px solid #E5E5E5', fontFamily: 'var(--font-body)', color: '#0A0A0A', outline: 'none', backgroundColor: '#FAFAFA' }}
                      onFocus={e => e.target.style.borderColor = '#006B4E'}
                      onBlur={e => e.target.style.borderColor = '#E5E5E5'}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Verificaciones (read-only) */}
            <div style={{ paddingTop: '8px', borderTop: '1px solid #F0F0F0' }}>
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-4 h-4" style={{ color: '#6B7280' }} />
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#374151' }}>
                  Verificaciones
                </p>
              </div>
              <p className="mb-4" style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>
                Estas insignias se muestran en tu perfil público y son gestionadas por CompraTuParcela
              </p>
              <div className="space-y-2">
                {[
                  { label: 'Identidad verificada', icon: BadgeCheck, done: true },
                  { label: 'Documentación cargada', icon: FileText, done: true },
                  { label: 'Rol aprobado', icon: ShieldCheck, done: true },
                ].map(v => {
                  const VIcon = v.icon;
                  return (
                    <div key={v.label} className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ border: `1.5px solid ${v.done ? '#BBF7D0' : '#E5E5E5'}`, backgroundColor: v.done ? '#F0FDF4' : '#FAFAFA' }}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: v.done ? '#DCFCE7' : '#F3F4F6' }}>
                        <VIcon className="w-4 h-4" style={{ color: v.done ? '#166534' : '#9CA3AF' }} />
                      </div>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: v.done ? '#166534' : '#6B7280', fontWeight: v.done ? 500 : 400 }}>
                        {v.label}
                      </span>
                      {v.done && <Check className="w-4 h-4 ml-auto flex-shrink-0" style={{ color: '#16A34A' }} />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── Tab: Perfil Broker ───────────────────────────────────────────── */}
        {activeTab === 'profile' && userType === 'broker' && (
          <div className="p-6 space-y-6">
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h3)', fontWeight: 500, color: '#0A0A0A' }}>
              Tu perfil de broker
            </h2>

            {/* Banner */}
            <div>
              <p className="mb-3" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151' }}>Banner</p>
              {hasBannerBroker ? (
                <div className="relative w-full rounded-xl overflow-hidden" style={{ height: '128px' }}>
                  <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #002F23 0%, #006B4E 100%)' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 600, color: '#FFFFFF', opacity: 0.6 }}>Banner — {perfilBroker.nombre}</span>
                  </div>
                  <button onClick={() => setHasBannerBroker(false)} className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.7)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)'}>
                    <X className="w-3.5 h-3.5" style={{ color: '#FFFFFF' }} />
                  </button>
                </div>
              ) : (
                <button onClick={() => setHasBannerBroker(true)} className="w-full flex flex-col items-center justify-center gap-2 rounded-xl transition-all" style={{ height: '128px', border: '2px dashed #D1D5DB', backgroundColor: '#FAFAFA' }} onMouseEnter={e => { e.currentTarget.style.borderColor = '#006B4E'; e.currentTarget.style.backgroundColor = '#F0FDF4'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = '#D1D5DB'; e.currentTarget.style.backgroundColor = '#FAFAFA'; }}>
                  <Image className="w-6 h-6" style={{ color: '#9CA3AF' }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#6B7280' }}>Subir banner</span>
                </button>
              )}
              <p className="mt-1.5" style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF' }}>Recomendado: 1200×300 px, máximo 5 MB</p>
            </div>

            {/* Foto de perfil */}
            <div style={{ paddingTop: '8px', borderTop: '1px solid #F0F0F0' }}>
              <p className="mb-3" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151' }}>Foto de perfil</p>
              <div className="flex items-center gap-4">
                {hasAvatarBroker ? (
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: '#DBEAFE' }}>
                      <span style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700, color: '#1E40AF' }}>{getInitials(perfilBroker.nombre)}</span>
                    </div>
                    <button onClick={() => setHasAvatarBroker(false)} className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#DC2626' }}>
                      <X className="w-3 h-3" style={{ color: '#FFFFFF' }} />
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setHasAvatarBroker(true)} className="w-20 h-20 rounded-full flex flex-col items-center justify-center flex-shrink-0 transition-all" style={{ border: '2px dashed #D1D5DB', backgroundColor: '#FAFAFA' }} onMouseEnter={e => { e.currentTarget.style.borderColor = '#006B4E'; e.currentTarget.style.backgroundColor = '#F0FDF4'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = '#D1D5DB'; e.currentTarget.style.backgroundColor = '#FAFAFA'; }}>
                    <Upload className="w-5 h-5" style={{ color: '#9CA3AF' }} />
                  </button>
                )}
                <div className="space-y-1">
                  <button onClick={() => setHasAvatarBroker(true)} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all" style={{ border: '1.5px solid #E5E5E5', color: '#0A0A0A', fontFamily: 'var(--font-body)', backgroundColor: '#FFFFFF' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F9FAFB'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}>
                    <Upload className="w-4 h-4" /> Subir foto
                  </button>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF' }}>PNG o JPG, máximo 2 MB</p>
                </div>
              </div>
            </div>

            {/* Nombre + Especialidad */}
            <div style={{ paddingTop: '8px', borderTop: '1px solid #F0F0F0' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label className="block mb-2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151' }}>Nombre completo <span style={{ color: '#DC2626' }}>*</span></label>
                  <input type="text" value={perfilBroker.nombre} onChange={e => setPerfilBroker(p => ({ ...p, nombre: e.target.value }))} className="w-full px-4 py-3 rounded-xl text-sm transition-colors" style={{ border: `1.5px solid ${perfilBroker.nombre ? '#E5E5E5' : '#DC2626'}`, fontFamily: 'var(--font-body)', color: '#0A0A0A', outline: 'none', backgroundColor: '#FAFAFA' }} onFocus={e => e.target.style.borderColor = '#006B4E'} onBlur={e => e.target.style.borderColor = perfilBroker.nombre ? '#E5E5E5' : '#DC2626'} />
                </div>
                <div>
                  <label className="block mb-2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151' }}>Especialidad</label>
                  <input type="text" value={perfilBroker.especialidad} onChange={e => setPerfilBroker(p => ({ ...p, especialidad: e.target.value }))} placeholder="Ej: Broker en parcelas de agrado" className="w-full px-4 py-3 rounded-xl text-sm transition-colors" style={{ border: '1.5px solid #E5E5E5', fontFamily: 'var(--font-body)', color: '#0A0A0A', outline: 'none', backgroundColor: '#FAFAFA' }} onFocus={e => e.target.style.borderColor = '#006B4E'} onBlur={e => e.target.style.borderColor = '#E5E5E5'} />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block mb-2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151' }}>Descripción / Bio</label>
              <textarea rows={3} value={perfilBroker.descripcion} onChange={e => setPerfilBroker(p => ({ ...p, descripcion: e.target.value }))} placeholder="Contá tu experiencia y qué te hace diferente como broker..." className="w-full px-4 py-3 rounded-xl text-sm resize-none transition-colors" style={{ border: '1.5px solid #E5E5E5', fontFamily: 'var(--font-body)', color: '#0A0A0A', outline: 'none', backgroundColor: '#FAFAFA', lineHeight: '1.6' }} onFocus={e => e.target.style.borderColor = '#006B4E'} onBlur={e => e.target.style.borderColor = '#E5E5E5'} />
              <p className="mt-1 text-right" style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF' }}>{perfilBroker.descripcion.length}/300 caracteres</p>
            </div>

            {/* Zona de trabajo + Experiencia */}
            <div style={{ paddingTop: '8px', borderTop: '1px solid #F0F0F0' }}>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4" style={{ color: '#6B7280' }} />
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#374151' }}>Zona de trabajo</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 140px', gap: '12px' }}>
                <div>
                  <label className="block mb-2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151' }}>Ciudad</label>
                  <input type="text" value={perfilBroker.ciudad} onChange={e => setPerfilBroker(p => ({ ...p, ciudad: e.target.value }))} placeholder="Ej: Santiago" className="w-full px-4 py-3 rounded-xl text-sm transition-colors" style={{ border: '1.5px solid #E5E5E5', fontFamily: 'var(--font-body)', color: '#0A0A0A', outline: 'none', backgroundColor: '#FAFAFA' }} onFocus={e => e.target.style.borderColor = '#006B4E'} onBlur={e => e.target.style.borderColor = '#E5E5E5'} />
                </div>
                <div>
                  <label className="block mb-2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151' }}>Región</label>
                  <input type="text" value={perfilBroker.region} onChange={e => setPerfilBroker(p => ({ ...p, region: e.target.value }))} placeholder="Ej: Metropolitana" className="w-full px-4 py-3 rounded-xl text-sm transition-colors" style={{ border: '1.5px solid #E5E5E5', fontFamily: 'var(--font-body)', color: '#0A0A0A', outline: 'none', backgroundColor: '#FAFAFA' }} onFocus={e => e.target.style.borderColor = '#006B4E'} onBlur={e => e.target.style.borderColor = '#E5E5E5'} />
                </div>
                <div>
                  <label className="block mb-2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151' }}>Años de exp.</label>
                  <input type="number" min="0" max="50" value={perfilBroker.experiencia} onChange={e => setPerfilBroker(p => ({ ...p, experiencia: e.target.value }))} className="w-full px-4 py-3 rounded-xl text-sm transition-colors" style={{ border: '1.5px solid #E5E5E5', fontFamily: 'var(--font-body)', color: '#0A0A0A', outline: 'none', backgroundColor: '#FAFAFA' }} onFocus={e => e.target.style.borderColor = '#006B4E'} onBlur={e => e.target.style.borderColor = '#E5E5E5'} />
                </div>
              </div>
            </div>

            {/* Zonas de operación */}
            <div style={{ paddingTop: '8px', borderTop: '1px solid #F0F0F0' }}>
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4" style={{ color: '#6B7280' }} />
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#374151' }}>Zonas de operación</p>
              </div>
              <p className="mb-3" style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>Regiones o comunas donde ofrecés tus servicios</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {zonas.map((z, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ backgroundColor: '#F5F5F0', border: '1px solid #E5E5E5' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#374151' }}>{z}</span>
                    <button onClick={() => setZonas(prev => prev.filter((_, idx) => idx !== i))} className="flex items-center justify-center w-4 h-4 rounded-full transition-colors" style={{ color: '#9CA3AF' }} onMouseEnter={e => e.currentTarget.style.color = '#374151'} onMouseLeave={e => e.currentTarget.style.color = '#9CA3AF'}>
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                {zonas.length === 0 && <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#D1D5DB' }}>Sin zonas agregadas</p>}
              </div>
              <div className="flex gap-2">
                <input type="text" value={newZona} onChange={e => setNewZona(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && newZona.trim()) { setZonas(prev => [...prev, newZona.trim()]); setNewZona(''); } }} placeholder="Ej: Región Metropolitana, Valparaíso..." className="flex-1 px-4 py-2.5 rounded-xl text-sm transition-colors" style={{ border: '1.5px solid #E5E5E5', fontFamily: 'var(--font-body)', color: '#0A0A0A', outline: 'none', backgroundColor: '#FAFAFA', maxWidth: '280px' }} onFocus={e => e.target.style.borderColor = '#006B4E'} onBlur={e => e.target.style.borderColor = '#E5E5E5'} />
                <button onClick={() => { if (newZona.trim()) { setZonas(prev => [...prev, newZona.trim()]); setNewZona(''); } }} className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium transition-all" style={{ backgroundColor: newZona.trim() ? '#006B4E' : '#E5E5E5', color: newZona.trim() ? '#FFFFFF' : '#9CA3AF', fontFamily: 'var(--font-body)', cursor: newZona.trim() ? 'pointer' : 'not-allowed' }}>
                  <Plus className="w-3.5 h-3.5" /> Agregar
                </button>
              </div>
            </div>

            {/* Contacto */}
            <div style={{ paddingTop: '8px', borderTop: '1px solid #F0F0F0' }}>
              <div className="flex items-center gap-2 mb-3">
                <Phone className="w-4 h-4" style={{ color: '#6B7280' }} />
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#374151' }}>Contacto</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="block mb-2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151' }}>Teléfono</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9CA3AF' }} />
                    <input type="tel" value={perfilBroker.telefono} onChange={e => setPerfilBroker(p => ({ ...p, telefono: e.target.value }))} placeholder="+56 9 1234 5678" className="w-full pl-9 pr-4 py-3 rounded-xl text-sm transition-colors" style={{ border: '1.5px solid #E5E5E5', fontFamily: 'var(--font-body)', color: '#0A0A0A', outline: 'none', backgroundColor: '#FAFAFA' }} onFocus={e => e.target.style.borderColor = '#006B4E'} onBlur={e => e.target.style.borderColor = '#E5E5E5'} />
                  </div>
                </div>
                <div>
                  <label className="block mb-2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151' }}>Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9CA3AF' }} />
                    <input type="email" value={perfilBroker.email} onChange={e => setPerfilBroker(p => ({ ...p, email: e.target.value }))} placeholder="tu@email.cl" className="w-full pl-9 pr-4 py-3 rounded-xl text-sm transition-colors" style={{ border: '1.5px solid #E5E5E5', fontFamily: 'var(--font-body)', color: '#0A0A0A', outline: 'none', backgroundColor: '#FAFAFA' }} onFocus={e => e.target.style.borderColor = '#006B4E'} onBlur={e => e.target.style.borderColor = '#E5E5E5'} />
                  </div>
                </div>
              </div>
            </div>

            {/* Idiomas */}
            <div style={{ paddingTop: '8px', borderTop: '1px solid #F0F0F0' }}>
              <div className="flex items-center gap-2 mb-1">
                <Globe className="w-4 h-4" style={{ color: '#6B7280' }} />
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#374151' }}>Idiomas</p>
              </div>
              <p className="mb-3" style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>Idiomas en los que puedes atender a tus clientes</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {idiomas.map((id, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#1E40AF' }}>{id}</span>
                    <button onClick={() => setIdiomas(prev => prev.filter((_, idx) => idx !== i))} className="flex items-center justify-center w-4 h-4 rounded-full transition-colors" style={{ color: '#93C5FD' }} onMouseEnter={e => e.currentTarget.style.color = '#1E40AF'} onMouseLeave={e => e.currentTarget.style.color = '#93C5FD'}>
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                {idiomas.length === 0 && <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#D1D5DB' }}>Sin idiomas agregados</p>}
              </div>
              <div className="flex gap-2">
                <input type="text" value={newIdioma} onChange={e => setNewIdioma(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && newIdioma.trim()) { setIdiomas(prev => [...prev, newIdioma.trim()]); setNewIdioma(''); } }} placeholder="Ej: Español, Inglés, Portugués..." className="flex-1 px-4 py-2.5 rounded-xl text-sm transition-colors" style={{ border: '1.5px solid #E5E5E5', fontFamily: 'var(--font-body)', color: '#0A0A0A', outline: 'none', backgroundColor: '#FAFAFA', maxWidth: '280px' }} onFocus={e => e.target.style.borderColor = '#1D4ED8'} onBlur={e => e.target.style.borderColor = '#E5E5E5'} />
                <button onClick={() => { if (newIdioma.trim()) { setIdiomas(prev => [...prev, newIdioma.trim()]); setNewIdioma(''); } }} className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium transition-all" style={{ backgroundColor: newIdioma.trim() ? '#1D4ED8' : '#E5E5E5', color: newIdioma.trim() ? '#FFFFFF' : '#9CA3AF', fontFamily: 'var(--font-body)', cursor: newIdioma.trim() ? 'pointer' : 'not-allowed' }}>
                  <Plus className="w-3.5 h-3.5" /> Agregar
                </button>
              </div>
            </div>

            {/* Certificaciones broker */}
            <div style={{ paddingTop: '8px', borderTop: '1px solid #F0F0F0' }}>
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-4 h-4" style={{ color: '#6B7280' }} />
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#374151' }}>Certificaciones</p>
              </div>
              <p className="mb-3" style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>Acreditaciones y certificaciones profesionales</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {certificacionesBroker.map((c, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ backgroundColor: '#F5F3FF', border: '1px solid #DDD6FE' }}>
                    <Award className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#7C3AED' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6D28D9' }}>{c}</span>
                    <button onClick={() => setCertificacionesBroker(prev => prev.filter((_, idx) => idx !== i))} className="flex items-center justify-center w-4 h-4 rounded-full transition-colors" style={{ color: '#C4B5FD' }} onMouseEnter={e => e.currentTarget.style.color = '#6D28D9'} onMouseLeave={e => e.currentTarget.style.color = '#C4B5FD'}>
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                {certificacionesBroker.length === 0 && <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#D1D5DB' }}>Sin certificaciones</p>}
              </div>
              <div className="flex gap-2">
                <input type="text" value={newCertificacionBroker} onChange={e => setNewCertificacionBroker(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && newCertificacionBroker.trim()) { setCertificacionesBroker(prev => [...prev, newCertificacionBroker.trim()]); setNewCertificacionBroker(''); } }} placeholder="Ej: Certificado CChC, Mediador..." className="flex-1 px-4 py-2.5 rounded-xl text-sm transition-colors" style={{ border: '1.5px solid #E5E5E5', fontFamily: 'var(--font-body)', color: '#0A0A0A', outline: 'none', backgroundColor: '#FAFAFA', maxWidth: '280px' }} onFocus={e => e.target.style.borderColor = '#7C3AED'} onBlur={e => e.target.style.borderColor = '#E5E5E5'} />
                <button onClick={() => { if (newCertificacionBroker.trim()) { setCertificacionesBroker(prev => [...prev, newCertificacionBroker.trim()]); setNewCertificacionBroker(''); } }} className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium transition-all" style={{ backgroundColor: newCertificacionBroker.trim() ? '#7C3AED' : '#E5E5E5', color: newCertificacionBroker.trim() ? '#FFFFFF' : '#9CA3AF', fontFamily: 'var(--font-body)', cursor: newCertificacionBroker.trim() ? 'pointer' : 'not-allowed' }}>
                  <Plus className="w-3.5 h-3.5" /> Agregar
                </button>
              </div>
            </div>

            {/* Inmobiliaria asociada (read-only) */}
            <div style={{ paddingTop: '8px', borderTop: '1px solid #F0F0F0' }}>
              <div className="flex items-center gap-2 mb-1">
                <Building2 className="w-4 h-4" style={{ color: '#6B7280' }} />
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#374151' }}>Inmobiliaria asociada</p>
              </div>
              <p className="mb-3" style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>Se actualiza automáticamente según tu vinculación en la plataforma</p>
              <div className="flex items-center gap-3 p-4 rounded-xl" style={{ border: '1.5px solid #BBF7D0', backgroundColor: '#F0FDF4' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#DCFCE7' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '13px', fontWeight: 700, color: '#166534' }}>VC</span>
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#0A0A0A' }}>Inmobiliaria Valle Central</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#6B7280' }}>Broker activo · Desde enero 2024</p>
                </div>
              </div>
            </div>

            {/* Verificaciones (read-only) */}
            <div style={{ paddingTop: '8px', borderTop: '1px solid #F0F0F0' }}>
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-4 h-4" style={{ color: '#6B7280' }} />
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#374151' }}>Verificaciones</p>
              </div>
              <p className="mb-4" style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>Insignias gestionadas por CompraTuParcela que aparecen en tu perfil público</p>
              <div className="space-y-2">
                {[
                  { label: 'Identidad verificada', icon: BadgeCheck, done: true },
                  { label: 'Documentación cargada', icon: FileText, done: true },
                  { label: 'Rol aprobado', icon: ShieldCheck, done: true },
                ].map(v => {
                  const VIcon = v.icon;
                  return (
                    <div key={v.label} className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ border: `1.5px solid ${v.done ? '#BBF7D0' : '#E5E5E5'}`, backgroundColor: v.done ? '#F0FDF4' : '#FAFAFA' }}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: v.done ? '#DCFCE7' : '#F3F4F6' }}>
                        <VIcon className="w-4 h-4" style={{ color: v.done ? '#166534' : '#9CA3AF' }} />
                      </div>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: v.done ? '#166534' : '#6B7280', fontWeight: v.done ? 500 : 400 }}>{v.label}</span>
                      {v.done && <Check className="w-4 h-4 ml-auto flex-shrink-0" style={{ color: '#16A34A' }} />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && userType === 'inmobiliaria' && (
          <div className="p-6 space-y-6">
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h3)', fontWeight: 500, color: '#0A0A0A' }}>
              Perfil de la inmobiliaria
            </h2>

            {/* Banner */}
            <div>
              <p className="mb-3" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151' }}>
                Banner
              </p>
              {hasBanner ? (
                <div className="relative w-full rounded-xl overflow-hidden" style={{ height: '128px', backgroundColor: '#D1FAE5' }}>
                  <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #006B4E 0%, #34D399 100%)' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 600, color: '#FFFFFF', opacity: 0.6 }}>
                      Banner — Inmobiliaria Valle Central
                    </span>
                  </div>
                  <button
                    onClick={() => setHasBanner(false)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-all"
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.7)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)'}
                  >
                    <X className="w-3.5 h-3.5" style={{ color: '#FFFFFF' }} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setHasBanner(true)}
                  className="w-full flex flex-col items-center justify-center gap-2 rounded-xl transition-all"
                  style={{ height: '128px', border: '2px dashed #D1D5DB', backgroundColor: '#FAFAFA' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#006B4E'; e.currentTarget.style.backgroundColor = '#F0FDF4'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#D1D5DB'; e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
                >
                  <Image className="w-6 h-6" style={{ color: '#9CA3AF' }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#6B7280' }}>Subir banner</span>
                </button>
              )}
              <p className="mt-1.5" style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF' }}>
                Se mostrará en la parte superior de tu perfil público. Recomendado: 1200×300 px, máximo 5 MB
              </p>
            </div>

            {/* Logo */}
            <div style={{ paddingTop: '8px', borderTop: '1px solid #F0F0F0' }}>
              <p className="mb-3" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151' }}>
                Logo de la empresa
              </p>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#DCFCE7' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700, color: '#166534' }}>
                    {getInitials(perfil.nombre)}
                  </span>
                </div>
                <div className="space-y-1">
                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all"
                    style={{ border: '1.5px solid #E5E5E5', color: '#0A0A0A', fontFamily: 'var(--font-body)', backgroundColor: '#FFFFFF' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                  >
                    <Upload className="w-4 h-4" /> Cambiar logo
                  </button>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF' }}>PNG o JPG, máximo 2 MB</p>
                </div>
              </div>
            </div>

            {/* Nombre */}
            <div style={{ paddingTop: '8px', borderTop: '1px solid #F0F0F0' }}>
              <label className="block mb-2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151' }}>
                Nombre comercial <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <input
                type="text"
                value={perfil.nombre}
                onChange={e => setPerfil(p => ({ ...p, nombre: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl text-sm transition-colors"
                style={{ border: `1.5px solid ${perfil.nombre ? '#E5E5E5' : '#DC2626'}`, fontFamily: 'var(--font-body)', color: '#0A0A0A', outline: 'none', backgroundColor: '#FAFAFA' }}
                onFocus={e => e.target.style.borderColor = '#006B4E'}
                onBlur={e => e.target.style.borderColor = perfil.nombre ? '#E5E5E5' : '#DC2626'}
              />
              {!perfil.nombre && (
                <p className="mt-1" style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#DC2626' }}>El nombre es obligatorio</p>
              )}
            </div>

            {/* Descripción */}
            <div>
              <label className="block mb-2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151' }}>
                Descripción
              </label>
              <textarea
                rows={2}
                maxLength={50}
                value={perfil.descripcion}
                onChange={e => setPerfil(p => ({ ...p, descripcion: e.target.value.slice(0, 50) }))}
                placeholder="Breve descripción de la empresa..."
                className="w-full px-4 py-3 rounded-xl text-sm resize-none transition-colors"
                style={{ border: '1.5px solid #E5E5E5', fontFamily: 'var(--font-body)', color: '#0A0A0A', outline: 'none', backgroundColor: '#FAFAFA', lineHeight: '1.6' }}
                onFocus={e => e.target.style.borderColor = '#006B4E'}
                onBlur={e => e.target.style.borderColor = '#E5E5E5'}
              />
              <p className="mt-1 text-right" style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: perfil.descripcion.length >= 50 ? '#DC2626' : '#9CA3AF' }}>
                {perfil.descripcion.length}/50 caracteres
              </p>
            </div>

            {/* Quiénes somos */}
            <div>
              <label className="block mb-2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151' }}>
                Quiénes somos
              </label>
              <textarea
                rows={3}
                maxLength={100}
                value={perfil.quienesSomos}
                onChange={e => setPerfil(p => ({ ...p, quienesSomos: e.target.value.slice(0, 100) }))}
                placeholder="Cuéntale a tus clientes quiénes son y qué los diferencia..."
                className="w-full px-4 py-3 rounded-xl text-sm resize-none transition-colors"
                style={{ border: '1.5px solid #E5E5E5', fontFamily: 'var(--font-body)', color: '#0A0A0A', outline: 'none', backgroundColor: '#FAFAFA', lineHeight: '1.6' }}
                onFocus={e => e.target.style.borderColor = '#006B4E'}
                onBlur={e => e.target.style.borderColor = '#E5E5E5'}
              />
              <p className="mt-1 text-right" style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: perfil.quienesSomos.length >= 100 ? '#DC2626' : '#9CA3AF' }}>
                {perfil.quienesSomos.length}/100 caracteres
              </p>
            </div>

            {/* Contacto grid */}
            <div style={{ paddingTop: '8px', borderTop: '1px solid #F0F0F0' }}>
              <p className="mb-4" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#374151' }}>
                Información de contacto
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {([
                  { key: 'email',     label: 'Email de contacto', type: 'email', placeholder: 'contacto@empresa.cl' },
                  { key: 'telefono',  label: 'Teléfono',          type: 'tel',   placeholder: '+56 9 1234 5678' },
                  { key: 'web',       label: 'Sitio web',         type: 'url',   placeholder: 'www.empresa.cl' },
                  { key: 'direccion', label: 'Dirección',         type: 'text',  placeholder: 'Av. Principal 1234, Santiago' },
                ] as const).map(field => (
                  <div key={field.key}>
                    <label className="block mb-2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151' }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      value={perfil[field.key]}
                      placeholder={field.placeholder}
                      onChange={e => setPerfil(p => ({ ...p, [field.key]: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl text-sm transition-colors"
                      style={{ border: '1.5px solid #E5E5E5', fontFamily: 'var(--font-body)', color: '#0A0A0A', outline: 'none', backgroundColor: '#FAFAFA' }}
                      onFocus={e => e.target.style.borderColor = '#006B4E'}
                      onBlur={e => e.target.style.borderColor = '#E5E5E5'}
                    />
                  </div>
                ))}
              </div>

              {/* WhatsApp oficial */}
              <div className="mt-4" style={{ maxWidth: 'calc(50% - 8px)' }}>
                <label className="block mb-2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151' }}>
                  WhatsApp oficial
                </label>
                <input
                  type="tel"
                  value={perfil.whatsapp}
                  placeholder="+56 9 1234 5678"
                  onChange={e => setPerfil(p => ({ ...p, whatsapp: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl text-sm transition-colors"
                  style={{ border: '1.5px solid #E5E5E5', fontFamily: 'var(--font-body)', color: '#0A0A0A', outline: 'none', backgroundColor: '#FAFAFA' }}
                  onFocus={e => e.target.style.borderColor = '#006B4E'}
                  onBlur={e => e.target.style.borderColor = '#E5E5E5'}
                />
                <p className="mt-1.5" style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF' }}>
                  Este número se usa para el botón "Consultar por WhatsApp" en tu perfil público
                </p>
              </div>
            </div>

            {/* Servicios */}
            <div style={{ paddingTop: '8px', borderTop: '1px solid #F0F0F0' }}>
              <div className="flex items-center gap-2 mb-1">
                <Briefcase className="w-4 h-4" style={{ color: '#6B7280' }} />
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#374151' }}>
                  Servicios
                </p>
              </div>
              <p className="mb-3" style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>
                Mostrá qué servicios ofrece tu inmobiliaria en tu perfil público
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {servicios.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}
                  >
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#166534' }}>{s}</span>
                    <button
                      onClick={() => setServicios(prev => prev.filter((_, idx) => idx !== i))}
                      className="flex items-center justify-center w-4 h-4 rounded-full transition-colors"
                      style={{ color: '#6EE7B7' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#166534'}
                      onMouseLeave={e => e.currentTarget.style.color = '#6EE7B7'}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                {servicios.length === 0 && (
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#D1D5DB' }}>Sin servicios agregados</p>
                )}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newServicio}
                  onChange={e => setNewServicio(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && newServicio.trim()) { setServicios(prev => [...prev, newServicio.trim()]); setNewServicio(''); } }}
                  placeholder="Ej: Tasación, Asesoramiento legal..."
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm transition-colors"
                  style={{ border: '1.5px solid #E5E5E5', fontFamily: 'var(--font-body)', color: '#0A0A0A', outline: 'none', backgroundColor: '#FAFAFA', maxWidth: '320px' }}
                  onFocus={e => e.target.style.borderColor = '#006B4E'}
                  onBlur={e => e.target.style.borderColor = '#E5E5E5'}
                />
                <button
                  onClick={() => { if (newServicio.trim()) { setServicios(prev => [...prev, newServicio.trim()]); setNewServicio(''); } }}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium transition-all"
                  style={{ backgroundColor: newServicio.trim() ? '#006B4E' : '#E5E5E5', color: newServicio.trim() ? '#FFFFFF' : '#9CA3AF', fontFamily: 'var(--font-body)', cursor: newServicio.trim() ? 'pointer' : 'not-allowed' }}
                >
                  <Plus className="w-3.5 h-3.5" /> Agregar
                </button>
              </div>
            </div>

            {/* Certificaciones */}
            <div style={{ paddingTop: '8px', borderTop: '1px solid #F0F0F0' }}>
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-4 h-4" style={{ color: '#6B7280' }} />
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#374151' }}>
                  Certificaciones
                </p>
              </div>
              <p className="mb-3" style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>
                Agrega certificaciones o membresías que acrediten la calidad de tu inmobiliaria
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {certificaciones.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: '#F5F3FF', border: '1px solid #DDD6FE' }}
                  >
                    <Award className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#7C3AED' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6D28D9' }}>{c}</span>
                    <button
                      onClick={() => setCertificaciones(prev => prev.filter((_, idx) => idx !== i))}
                      className="flex items-center justify-center w-4 h-4 rounded-full transition-colors"
                      style={{ color: '#C4B5FD' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#6D28D9'}
                      onMouseLeave={e => e.currentTarget.style.color = '#C4B5FD'}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                {certificaciones.length === 0 && (
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#D1D5DB' }}>Sin certificaciones agregadas</p>
                )}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCertificacion}
                  onChange={e => setNewCertificacion(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && newCertificacion.trim()) { setCertificaciones(prev => [...prev, newCertificacion.trim()]); setNewCertificacion(''); } }}
                  placeholder="Ej: Miembro CCHC, ISO 9001..."
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm transition-colors"
                  style={{ border: '1.5px solid #E5E5E5', fontFamily: 'var(--font-body)', color: '#0A0A0A', outline: 'none', backgroundColor: '#FAFAFA', maxWidth: '320px' }}
                  onFocus={e => e.target.style.borderColor = '#7C3AED'}
                  onBlur={e => e.target.style.borderColor = '#E5E5E5'}
                />
                <button
                  onClick={() => { if (newCertificacion.trim()) { setCertificaciones(prev => [...prev, newCertificacion.trim()]); setNewCertificacion(''); } }}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium transition-all"
                  style={{ backgroundColor: newCertificacion.trim() ? '#7C3AED' : '#E5E5E5', color: newCertificacion.trim() ? '#FFFFFF' : '#9CA3AF', fontFamily: 'var(--font-body)', cursor: newCertificacion.trim() ? 'pointer' : 'not-allowed' }}
                >
                  <Plus className="w-3.5 h-3.5" /> Agregar
                </button>
              </div>
            </div>

            {/* Estadísticas — solo inmobiliaria */}
            {userType === 'inmobiliaria' && (
              <div style={{ paddingTop: '8px', borderTop: '1px solid #F0F0F0' }}>
                <div className="flex items-center gap-2 mb-1">
                  <BarChart2 className="w-4 h-4" style={{ color: '#6B7280' }} />
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#374151' }}>
                    Estadísticas de perfil
                  </p>
                </div>
                <p className="mb-4" style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>
                  Se calculan automáticamente en base a la actividad de tu perfil público. Son distintas a las métricas generales del dashboard.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  {[
                    { label: 'Visitas al perfil', value: '1.248', sub: 'Últimos 30 días', color: '#006B4E', border: '#BBF7D0', bg: '#F0FDF4' },
                    { label: 'Consultas recibidas', value: '87', sub: 'Últimos 30 días', color: '#1D4ED8', border: '#BFDBFE', bg: '#EFF6FF' },
                    { label: 'Publicaciones activas', value: '14', sub: 'En este momento', color: '#7C3AED', border: '#DDD6FE', bg: '#F5F3FF' },
                  ].map(stat => (
                    <div key={stat.label} className="p-4 rounded-xl" style={{ backgroundColor: stat.bg, border: `1px solid ${stat.border}` }}>
                      <p style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, color: stat.color }}>{stat.value}</p>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, color: '#374151', marginTop: '2px' }}>{stat.label}</p>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF', marginTop: '2px' }}>{stat.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Equipo — solo inmobiliaria */}
            {userType === 'inmobiliaria' && (
              <div style={{ paddingTop: '8px', borderTop: '1px solid #F0F0F0' }}>
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4" style={{ color: '#6B7280' }} />
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#374151' }}>
                    Equipo
                  </p>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: '#F3F4F6', color: '#6B7280', border: '1px solid #E5E7EB', fontFamily: 'var(--font-body)' }}>
                    {EQUIPO_MOCK.length} brokers
                  </span>
                </div>
                <p className="mb-4" style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>
                  Se actualiza automáticamente a medida que agregás brokers desde Configuración → Usuarios
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  {EQUIPO_MOCK.map(broker => {
                    const color = getColor(broker.nombre);
                    return (
                      <div key={broker.id} className="p-4 rounded-xl text-center" style={{ border: '1.5px solid #E5E5E5', backgroundColor: '#FAFAFA' }}>
                        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: color.bg }}>
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 700, color: color.text }}>{getInitials(broker.nombre)}</span>
                        </div>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: '#0A0A0A' }}>{broker.nombre}</p>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF', marginTop: '2px' }}>{broker.rol}</p>
                        <span className="mt-2 px-2 py-0.5 rounded-full text-xs inline-block" style={{ backgroundColor: '#F0FDF4', color: '#166534', border: '1px solid #BBF7D0', fontFamily: 'var(--font-body)' }}>
                          {broker.publicaciones} publicaciones
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Tab: Preferencias ────────────────────────────────────────────── */}
        {activeTab === 'preferences' && (
          <div className="p-6 space-y-6">
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h3)', fontWeight: 500, color: '#0A0A0A' }}>
              Preferencias
            </h2>

            {/* Notificaciones */}
            <div className="space-y-4">
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#374151' }}>
                  Notificaciones por email
                </p>
                <p className="mt-0.5" style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>
                  Elige qué avisos quieres recibir en tu correo
                </p>
              </div>
              <div className="space-y-2">
                {([
                  { key: 'newInquiry',    label: 'Nuevas consultas sobre mis publicaciones' },
                  { key: 'statusChange',  label: 'Cambios de estado en mis publicaciones' },
                  { key: 'teamActivity',  label: 'Actividad del equipo' },
                  { key: 'updates',       label: 'Novedades y actualizaciones de la plataforma' },
                ] as const).map(item => (
                  <label
                    key={item.key}
                    className="flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-colors"
                    style={{ border: `1.5px solid ${notifs[item.key] ? '#BBF7D0' : '#E5E5E5'}`, backgroundColor: notifs[item.key] ? '#F0FDF4' : '#FAFAFA' }}
                  >
                    <div
                      className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-colors"
                      style={{ backgroundColor: notifs[item.key] ? '#006B4E' : '#FFFFFF', border: `2px solid ${notifs[item.key] ? '#006B4E' : '#D1D5DB'}` }}
                      onClick={() => setNotifs(n => ({ ...n, [item.key]: !n[item.key] }))}
                    >
                      {notifs[item.key] && <Check className="w-3 h-3" style={{ color: '#FFFFFF' }} />}
                    </div>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A' }}>
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Configuración regional */}
            <div className="pt-5" style={{ borderTop: '1px solid #F0F0F0' }}>
              <p className="mb-4" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#374151' }}>
                Configuración regional
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                <div>
                  <label className="block mb-2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151' }}>
                    Idioma
                  </label>
                  <select
                    value={idioma}
                    onChange={e => setIdioma(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm"
                    style={{ border: '1.5px solid #E5E5E5', fontFamily: 'var(--font-body)', color: '#0A0A0A', outline: 'none', backgroundColor: '#FAFAFA' }}
                  >
                    <option value="es-CL">Español (Chile)</option>
                    <option value="es-ES">Español (España)</option>
                    <option value="en-US">English (US)</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151' }}>
                    Zona horaria
                  </label>
                  <select
                    value={timezone}
                    onChange={e => setTimezone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm"
                    style={{ border: '1.5px solid #E5E5E5', fontFamily: 'var(--font-body)', color: '#0A0A0A', outline: 'none', backgroundColor: '#FAFAFA' }}
                  >
                    <option value="America/Santiago">Santiago (GMT-3)</option>
                    <option value="America/Buenos_Aires">Buenos Aires (GMT-3)</option>
                    <option value="America/Sao_Paulo">São Paulo (GMT-3)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Tab: Usuarios ────────────────────────────────────────────────── */}
        {activeTab === 'users' && (
          <div className="p-6 space-y-8">
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h3)', fontWeight: 500, color: '#0A0A0A' }}>
              Usuarios y permisos
            </h2>

            {/* ── Sección: Brokers (solo inmobiliaria/broker) ── */}
            {false && <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#374151' }}>Brokers</p>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: '#DCFCE7', color: '#166534', border: '1px solid #86EFAC', fontFamily: 'var(--font-body)' }}>
                    {BROKERS_MOCK.filter(b => b.status === 'activo').length} activos
                  </span>
                  {BROKERS_MOCK.filter(b => b.status === 'pendiente').length > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: '#FEF9C3', color: '#854D0E', border: '1px solid #FDE68A', fontFamily: 'var(--font-body)' }}>
                      {BROKERS_MOCK.filter(b => b.status === 'pendiente').length} pendientes
                    </span>
                  )}
                </div>
                <button
                  onClick={() => { setInviteRol('Broker'); setInviteEmail(''); setInviteError(''); setShowInviteModal(true); }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all"
                  style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#01533E'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#006B4E'}
                >
                  <Plus className="w-4 h-4" /> Agregar usuario
                </button>
              </div>

              {/* Buscador */}
              <div className="relative" style={{ maxWidth: '300px' }}>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9CA3AF' }} />
                <input
                  value={brokerQuery}
                  onChange={e => setBrokerQuery(e.target.value)}
                  placeholder="Buscar broker..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl"
                  style={{ border: '1.5px solid #E5E5E5', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#0A0A0A', outline: 'none', backgroundColor: '#FAFAFA' }}
                  onFocus={e => e.target.style.borderColor = '#006B4E'}
                  onBlur={e => e.target.style.borderColor = '#E5E5E5'}
                />
              </div>

              {/* Tabla */}
              <div className="rounded-2xl overflow-hidden" style={{ border: '1.5px solid #E5E5E5' }} onClick={() => setBrokerMenuOpen(null)}>
                <table className="w-full">
                  <thead>
                    <tr style={{ backgroundColor: '#FAFAFA', borderBottom: '1px solid #E5E5E5' }}>
                      {['Broker', 'Email', 'Leads asignados', 'Leads cerrados', 'Estado', ''].map(h => (
                        <th key={h} className="text-left px-5 py-3" style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: '#737373', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {BROKERS_MOCK
                      .filter(b =>
                        b.nombre.toLowerCase().includes(brokerQuery.toLowerCase()) ||
                        b.email.toLowerCase().includes(brokerQuery.toLowerCase())
                      )
                      .map((b, i, arr) => {
                        const statusStyle =
                          b.status === 'activo'    ? { bg: '#DCFCE7', color: '#166534', border: '#86EFAC', label: 'Activo' } :
                          b.status === 'pendiente' ? { bg: '#FEF9C3', color: '#854D0E', border: '#FDE68A', label: 'Pendiente' } :
                                                     { bg: '#F3F4F6', color: '#6B7280', border: '#E5E7EB', label: 'Inactivo' };
                        const initials = b.nombre.split(' ').map(w => w[0]).join('').substring(0, 2);
                        return (
                          <tr key={b.id} style={{ borderBottom: i < arr.length - 1 ? '1px solid #F0F0F0' : 'none' }}
                            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#FAFAFA')}
                            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                          >
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#E8F5EE' }}>
                                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#006B4E', fontFamily: 'var(--font-heading)' }}>{initials}</span>
                                </div>
                                <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: '#0A0A0A' }}>{b.nombre}</span>
                              </div>
                            </td>
                            <td className="px-5 py-4" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#737373' }}>{b.email}</td>
                            <td className="px-5 py-4" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: '#0A0A0A' }}>{b.asignados}</td>
                            <td className="px-5 py-4" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: '#0A0A0A' }}>{b.cerrados}</td>
                            <td className="px-5 py-4">
                              <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: statusStyle.bg, color: statusStyle.color, border: `1px solid ${statusStyle.border}`, fontFamily: 'var(--font-body)' }}>
                                {statusStyle.label}
                              </span>
                            </td>
                            <td className="px-5 py-4" style={{ position: 'relative' }}>
                              <button
                                className="p-1.5 rounded-lg transition-colors"
                                onClick={e => { e.stopPropagation(); setBrokerMenuOpen(brokerMenuOpen === b.id ? null : b.id); }}
                                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F3F4F6')}
                                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                              >
                                <MoreHorizontal className="w-4 h-4" style={{ color: '#9CA3AF' }} />
                              </button>
                              {brokerMenuOpen === b.id && (
                                <div
                                  className="absolute right-0 z-50 rounded-xl overflow-hidden"
                                  style={{ top: 'calc(100% - 4px)', minWidth: '160px', backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 8px 24px rgba(0,0,0,0.10)' }}
                                  onClick={e => e.stopPropagation()}
                                >
                                  {[
                                    { label: 'Cambiar estado', color: '#0A0A0A' },
                                    { label: 'Desvincular', color: '#DC2626' },
                                  ].map(({ label, color }) => (
                                    <button
                                      key={label}
                                      className="w-full text-left px-4 py-2.5 transition-colors"
                                      style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color, backgroundColor: 'transparent' }}
                                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F9FAFB')}
                                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                                      onClick={() => setBrokerMenuOpen(null)}
                                    >
                                      {label}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>}

            {/* ── Sección: Equipo administrativo ── */}
            <div className="space-y-4" style={{ paddingTop: '8px', borderTop: '1px solid #F0F0F0' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#374151' }}>Equipo administrativo</p>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: '#F5F3FF', color: '#6D28D9', border: '1px solid #DDD6FE', fontFamily: 'var(--font-body)' }}>
                    {usuarios.filter(u => u.rol === 'Admin').length} admins
                  </span>
                </div>
                <button
                  onClick={() => { setInviteRol('Admin'); setShowInviteModal(true); }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all"
                  style={{ border: '1.5px solid #E5E5E5', color: '#374151', backgroundColor: '#FFFFFF', fontFamily: 'var(--font-body)' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                >
                  <Plus className="w-4 h-4" /> Agregar admin
                </button>
              </div>

              {usuarios.filter(u => u.rol === 'Admin').map(user => {
                const color = getColor(user.nombre);
                return (
                  <div key={user.id} className="flex items-center justify-between p-4 rounded-xl transition-colors" style={{ border: '1.5px solid #E5E5E5', backgroundColor: '#FAFAFA' }}
                    onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.backgroundColor = '#F3F4F6'}
                    onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.backgroundColor = '#FAFAFA'}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: color.bg }}>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 700, color: color.text }}>{getInitials(user.nombre)}</span>
                      </div>
                      <div>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#0A0A0A' }}>{user.nombre}</p>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#F5F3FF', color: '#6D28D9', border: '1px solid #DDD6FE', fontFamily: 'var(--font-body)' }}>Admin</span>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#A3A3A3' }}>{user.ultimoAcceso}</p>
                      <button
                        onClick={() => { setEditingUser({ id: user.id, nombre: user.nombre, rol: user.rol }); setNewRol(user.rol); }}
                        className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                        style={{ border: '1px solid #E5E5E5', color: '#374151', backgroundColor: '#FFFFFF', fontFamily: 'var(--font-body)' }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F3F4F6'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                      >
                        Editar
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ── Tab: Seguridad ───────────────────────────────────────────────── */}
        {activeTab === 'security' && (
          <div className="p-6 space-y-8">
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h3)', fontWeight: 500, color: '#0A0A0A' }}>
              Seguridad
            </h2>

            {/* Cambiar contraseña */}
            <div className="space-y-4" style={{ paddingBottom: '32px', borderBottom: '1px solid #F0F0F0' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#374151' }}>
                  Cambiar contraseña
                </p>
                <p className="mt-0.5" style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>
                  Usá una contraseña segura que no uses en otros sitios
                </p>
              </div>

              <div className="space-y-4" style={{ maxWidth: '420px' }}>
                {/* Contraseña actual */}
                <div>
                  <label className="block mb-2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151' }}>
                    Contraseña actual
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPass ? 'text' : 'password'}
                      value={currentPass}
                      onChange={e => setCurrentPass(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 pr-12 rounded-xl text-sm"
                      style={{ border: '1.5px solid #E5E5E5', fontFamily: 'var(--font-body)', color: '#0A0A0A', outline: 'none', backgroundColor: '#FAFAFA' }}
                      onFocus={e => e.target.style.borderColor = '#006B4E'}
                      onBlur={e => e.target.style.borderColor = '#E5E5E5'}
                    />
                    <button type="button" onClick={() => setShowCurrentPass(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-100 transition-colors">
                      {showCurrentPass ? <EyeOff className="w-4 h-4" style={{ color: '#9CA3AF' }} /> : <Eye className="w-4 h-4" style={{ color: '#9CA3AF' }} />}
                    </button>
                  </div>
                </div>

                {/* Nueva contraseña */}
                <div>
                  <label className="block mb-2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151' }}>
                    Nueva contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPass ? 'text' : 'password'}
                      value={newPass}
                      onChange={e => setNewPass(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 pr-12 rounded-xl text-sm"
                      style={{ border: '1.5px solid #E5E5E5', fontFamily: 'var(--font-body)', color: '#0A0A0A', outline: 'none', backgroundColor: '#FAFAFA' }}
                      onFocus={e => e.target.style.borderColor = '#006B4E'}
                      onBlur={e => e.target.style.borderColor = '#E5E5E5'}
                    />
                    <button type="button" onClick={() => setShowNewPass(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-100 transition-colors">
                      {showNewPass ? <EyeOff className="w-4 h-4" style={{ color: '#9CA3AF' }} /> : <Eye className="w-4 h-4" style={{ color: '#9CA3AF' }} />}
                    </button>
                  </div>
                  {newPass && (
                    <div className="mt-3 space-y-1.5">
                      {passReqs.map((r, i) => <RequirementRow key={i} met={r.met} label={r.label} />)}
                    </div>
                  )}
                </div>

                {/* Confirmar contraseña */}
                <div>
                  <label className="block mb-2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151' }}>
                    Confirmar nueva contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPass ? 'text' : 'password'}
                      value={confirmPass}
                      onChange={e => setConfirmPass(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 pr-12 rounded-xl text-sm"
                      style={{
                        border: `1.5px solid ${confirmPass && !passMatch ? '#DC2626' : confirmPass && passMatch ? '#16A34A' : '#E5E5E5'}`,
                        fontFamily: 'var(--font-body)', color: '#0A0A0A', outline: 'none', backgroundColor: '#FAFAFA',
                      }}
                      onFocus={e => { if (!confirmPass) e.target.style.borderColor = '#006B4E'; }}
                      onBlur={e => { e.target.style.borderColor = confirmPass && !passMatch ? '#DC2626' : confirmPass && passMatch ? '#16A34A' : '#E5E5E5'; }}
                    />
                    <button type="button" onClick={() => setShowConfirmPass(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-100 transition-colors">
                      {showConfirmPass ? <EyeOff className="w-4 h-4" style={{ color: '#9CA3AF' }} /> : <Eye className="w-4 h-4" style={{ color: '#9CA3AF' }} />}
                    </button>
                  </div>
                  {confirmPass && (
                    <p className="mt-1" style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: passMatch ? '#16A34A' : '#DC2626' }}>
                      {passMatch ? '✓ Las contraseñas coinciden' : 'Las contraseñas no coinciden'}
                    </p>
                  )}
                </div>

                <button
                  onClick={handlePasswordSave}
                  disabled={!passValid}
                  className="px-6 py-2.5 rounded-full text-sm font-medium transition-all"
                  style={{
                    backgroundColor: passValid ? '#006B4E' : '#E5E5E5',
                    color: passValid ? '#FFFFFF' : '#9CA3AF',
                    fontFamily: 'var(--font-body)',
                    cursor: passValid ? 'pointer' : 'not-allowed',
                  }}
                  onMouseEnter={e => { if (passValid) e.currentTarget.style.backgroundColor = '#01533E'; }}
                  onMouseLeave={e => { if (passValid) e.currentTarget.style.backgroundColor = '#006B4E'; }}
                >
                  Actualizar contraseña
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ── Tab: WhatsApp ────────────────────────────────────────────────── */}
        {activeTab === 'whatsapp' && (userType === 'inmobiliaria' || userType === 'broker') && (
          <ContactosWhatsAppAdminView />
        )}

        {/* ── Tab: Sistema ─────────────────────────────────────────────────── */}
        {activeTab === 'sistema' && userType === 'ctp' && (
          <div className="space-y-5">

            {/* Skeleton loader */}
            {isLoadingSistema && (
              <div className="space-y-5 animate-pulse">
                {[120, 180, 160, 100, 140, 90].map((h, i) => (
                  <div key={i} className="rounded-2xl border p-5" style={{ borderColor: '#E5E5E5', backgroundColor: '#fff' }}>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: '#E5E5E5' }} />
                      <div className="h-3.5 rounded-full w-32" style={{ backgroundColor: '#E5E5E5' }} />
                    </div>
                    <div className="space-y-3">
                      {Array.from({ length: Math.floor(h / 40) + 1 }).map((_, j) => (
                        <div key={j} className="flex items-center justify-between gap-4">
                          <div className="flex-1 space-y-1.5">
                            <div className="h-3 rounded-full" style={{ backgroundColor: '#E5E5E5', width: `${60 + (j % 3) * 15}%` }} />
                            <div className="h-2.5 rounded-full" style={{ backgroundColor: '#F3F4F6', width: `${40 + (j % 2) * 20}%` }} />
                          </div>
                          <div className="w-11 h-6 rounded-full flex-shrink-0" style={{ backgroundColor: '#E5E5E5' }} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Toast */}
            {!isLoadingSistema && sistemaSaved && (
              <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl shadow-lg text-sm font-medium"
                style={{ backgroundColor: '#006B4E', color: '#fff' }}>
                <Activity className="w-4 h-4" />
                Configuración del sistema guardada
              </div>
            )}

            {!isLoadingSistema && (<>

            {/* Modal confirmar desactivar módulo */}
            {confirmModulo && (
              <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.35)' }}>
                <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FEF2F2' }}>
                      <Power className="w-5 h-5" style={{ color: '#DC2626' }} />
                    </div>
                    <h3 className="font-semibold text-base" style={{ color: '#0A0A0A' }}>Desactivar módulo</h3>
                  </div>
                  <p className="text-sm mb-5" style={{ color: '#525252' }}>
                    ¿Confirmas que quieres desactivar <strong>{confirmModulo.nombre}</strong>? Los usuarios dejarán de tener acceso a esta sección.
                  </p>
                  <div className="flex gap-3 justify-end">
                    <button onClick={() => setConfirmModulo(null)}
                      className="px-4 py-2 rounded-xl text-sm font-medium border" style={{ color: '#525252', borderColor: '#E5E5E5' }}>
                      Cancelar
                    </button>
                    <button onClick={() => {
                      setModulosActivos(prev => ({ ...prev, [confirmModulo.key]: false }));
                      setConfirmModulo(null);
                    }}
                      className="px-4 py-2 rounded-xl text-sm font-medium" style={{ backgroundColor: '#DC2626', color: '#fff' }}>
                      Desactivar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── Sección 1: Módulos del sistema ───────────────────────────── */}
            <div className="rounded-2xl p-5 border" style={{ borderColor: '#E5E5E5', backgroundColor: '#fff' }}>
              <div className="flex items-center gap-2 mb-1">
                <Power className="w-4 h-4" style={{ color: '#006B4E' }} />
                <h3 className="font-semibold text-sm" style={{ color: '#0A0A0A' }}>Módulos del sistema</h3>
              </div>
              <p className="text-xs mb-4" style={{ color: '#9CA3AF' }}>Activa o desactiva secciones de la plataforma para todos los usuarios.</p>
              <div className="space-y-3">
                {[
                  { key: 'leads', nombre: 'Gestión de leads', desc: 'Panel de captación y seguimiento de clientes potenciales' },
                  { key: 'publicaciones', nombre: 'Publicaciones', desc: 'Módulo de propiedades e inmuebles publicados' },
                  { key: 'asignacionAutomatica', nombre: 'Asignación automática de leads', desc: 'Distribución inteligente de leads entre brokers disponibles' },
                  { key: 'mantenimiento', nombre: 'Modo mantenimiento', desc: 'Bloquea el acceso a la plataforma temporalmente para todos los usuarios' },
                ].map(mod => {
                  const activo = modulosActivos[mod.key as keyof typeof modulosActivos];
                  return (
                    <div key={mod.key} className="flex items-center justify-between gap-4 py-3 border-b last:border-0" style={{ borderColor: '#F3F4F6' }}>
                      <div>
                        <p className="text-sm font-medium" style={{ color: '#0A0A0A' }}>{mod.nombre}</p>
                        <p className="text-xs" style={{ color: '#9CA3AF' }}>{mod.desc}</p>
                      </div>
                      <button
                        onClick={() => {
                          if (activo) { setConfirmModulo({ key: mod.key, nombre: mod.nombre }); }
                          else { setModulosActivos(prev => ({ ...prev, [mod.key]: true })); }
                        }}
                        className="relative flex-shrink-0 w-11 h-6 rounded-full transition-colors duration-200"
                        style={{ backgroundColor: activo ? '#006B4E' : '#D1D5DB' }}>
                        <span className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200"
                          style={{ transform: activo ? 'translateX(20px)' : 'translateX(0)' }} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Sección 2: Mensaje global ─────────────────────────────────── */}
            {(() => {
              const tipoConfig = {
                info:          { bg: '#EFF6FF', border: '#BFDBFE', Icon: MessageCircle, label: 'Informativo',   textColor: '#1E40AF' },
                advertencia:   { bg: '#FFFBEB', border: '#FDE68A', Icon: AlertTriangle,  label: 'Advertencia',   textColor: '#92400E' },
                mantenimiento: { bg: '#F5F5F5', border: '#D4D4D4', Icon: Wrench,         label: 'Mantenimiento', textColor: '#404040' },
              };
              const cfg = tipoConfig[mensajeGlobalTipo];
              return (
                <div className="rounded-2xl border overflow-hidden" style={{ borderColor: '#006B4E', backgroundColor: '#fff' }}>
                  {/* Header diferenciado */}
                  <div className="px-5 py-4 flex items-center justify-between" style={{ backgroundColor: '#F0FAF5', borderBottom: '1px solid #D1FAE5' }}>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" style={{ color: '#006B4E' }} />
                      <h3 className="font-semibold text-sm" style={{ color: '#006B4E' }}>Mensaje global</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: '#DCFCE7', color: '#15803D' }}>Todos los usuarios</span>
                    </div>
                    <button
                      onClick={() => setMensajeGlobalActivo(v => !v)}
                      className="relative flex-shrink-0 w-11 h-6 rounded-full transition-colors duration-200"
                      style={{ backgroundColor: mensajeGlobalActivo ? '#006B4E' : '#D1D5DB' }}>
                      <span className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200"
                        style={{ transform: mensajeGlobalActivo ? 'translateX(20px)' : 'translateX(0)' }} />
                    </button>
                  </div>

                  <div className="px-5 pt-4 pb-5 space-y-4">
                    {/* Tipo */}
                    <div>
                      <p className="text-xs font-medium mb-2" style={{ color: '#525252' }}>Tipo de mensaje</p>
                      <div className="flex gap-2">
                        {(['info', 'advertencia', 'mantenimiento'] as const).map(t => (
                          <button key={t} onClick={() => setMensajeGlobalTipo(t)}
                            className="flex-1 py-2 rounded-xl border text-xs font-medium transition-colors capitalize"
                            style={{
                              borderColor: mensajeGlobalTipo === t ? tipoConfig[t].border : '#E5E5E5',
                              backgroundColor: mensajeGlobalTipo === t ? tipoConfig[t].bg : '#FAFAFA',
                              color: mensajeGlobalTipo === t ? tipoConfig[t].textColor : '#525252',
                            }}>
                            <span className="inline-flex items-center gap-1.5">
                              {(() => { const I = tipoConfig[t].Icon; return <I className="w-3.5 h-3.5" />; })()}
                              {tipoConfig[t].label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Título */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs font-medium" style={{ color: '#525252' }}>Título</p>
                        <span className="text-xs" style={{ color: mensajeGlobalTitulo.length > 70 ? '#DC2626' : '#9CA3AF' }}>{mensajeGlobalTitulo.length}/80</span>
                      </div>
                      <input
                        maxLength={80}
                        value={mensajeGlobalTitulo}
                        onChange={e => setMensajeGlobalTitulo(e.target.value)}
                        placeholder="Ej: Mantenimiento programado el lunes 14 de agosto"
                        className="w-full text-sm rounded-xl border px-3 py-2 outline-none"
                        style={{ borderColor: '#E5E5E5', color: '#0A0A0A' }} />
                    </div>

                    {/* Mensaje */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs font-medium" style={{ color: '#525252' }}>Mensaje</p>
                        <span className="text-xs" style={{ color: mensajeGlobalTexto.length > 180 ? '#DC2626' : '#9CA3AF' }}>{mensajeGlobalTexto.length}/200</span>
                      </div>
                      <textarea
                        maxLength={200}
                        rows={3}
                        value={mensajeGlobalTexto}
                        onChange={e => setMensajeGlobalTexto(e.target.value)}
                        placeholder="Detallá brevemente el motivo o instrucciones para los usuarios..."
                        className="w-full text-sm rounded-xl border px-3 py-2 outline-none resize-none"
                        style={{ borderColor: '#E5E5E5', color: '#0A0A0A' }} />
                    </div>

                    {/* Visibilidad */}
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-medium" style={{ color: '#525252' }}>Visibilidad</p>
                        <p className="text-xs" style={{ color: '#9CA3AF' }}>A quién se muestra este mensaje</p>
                      </div>
                      <select value={mensajeGlobalVisibilidad} onChange={e => setMensajeGlobalVisibilidad(e.target.value)}
                        className="text-sm rounded-xl border px-3 py-1.5 outline-none w-full sm:w-auto"
                        style={{ borderColor: '#E5E5E5', color: '#0A0A0A', backgroundColor: '#FAFAFA' }}>
                        <option value="todos">Todos los usuarios</option>
                        <option value="inmobiliarias">Inmobiliarias y brokers</option>
                        <option value="admins">Solo administradores</option>
                      </select>
                    </div>

                    {/* Preview */}
                    {(mensajeGlobalTitulo || mensajeGlobalTexto) && (
                      <div>
                        <p className="text-xs font-medium mb-2" style={{ color: '#525252' }}>Vista previa</p>
                        <div className="rounded-xl px-4 py-3 flex gap-3 items-start" style={{ backgroundColor: cfg.bg, border: `1px solid ${cfg.border}` }}>
                          <cfg.Icon className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: cfg.textColor }} />
                          <div className="flex-1 min-w-0">
                            {mensajeGlobalTitulo && (
                              <p className="text-sm font-semibold leading-snug" style={{ color: cfg.textColor }}>{mensajeGlobalTitulo}</p>
                            )}
                            {mensajeGlobalTexto && (
                              <p className="text-xs mt-0.5" style={{ color: cfg.textColor, opacity: 0.85, lineHeight: '1.5' }}>{mensajeGlobalTexto}</p>
                            )}
                          </div>
                          <button className="flex-shrink-0 text-xs" style={{ color: cfg.textColor, opacity: 0.6 }}>✕</button>
                        </div>
                        <p className="text-xs mt-1.5" style={{ color: '#9CA3AF' }}>Así verán el mensaje los usuarios en la plataforma.</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* ── Sección 3: Reglas de negocio ─────────────────────────────── */}
            <div className="rounded-2xl p-5 border" style={{ borderColor: '#E5E5E5', backgroundColor: '#fff' }}>
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4" style={{ color: '#006B4E' }} />
                <h3 className="font-semibold text-sm" style={{ color: '#0A0A0A' }}>Reglas de negocio</h3>
              </div>
              <p className="text-xs mb-4" style={{ color: '#9CA3AF' }}>Parámetros que definen el comportamiento operativo de la plataforma.</p>
              <div className="space-y-4">

                <div className="flex items-center justify-between gap-4 py-3 border-b" style={{ borderColor: '#F3F4F6' }}>
                  <div>
                    <p className="text-sm font-medium" style={{ color: '#0A0A0A' }}>Reasignación automática de leads</p>
                    <p className="text-xs" style={{ color: '#9CA3AF' }}>Reasigna leads sin respuesta al siguiente broker disponible</p>
                  </div>
                  <button
                    onClick={() => setReasignacionAuto(v => !v)}
                    className="relative flex-shrink-0 w-11 h-6 rounded-full transition-colors duration-200"
                    style={{ backgroundColor: reasignacionAuto ? '#006B4E' : '#D1D5DB' }}>
                    <span className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200"
                      style={{ transform: reasignacionAuto ? 'translateX(20px)' : 'translateX(0)' }} />
                  </button>
                </div>

                {reasignacionAuto && (
                  <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-b" style={{ borderColor: '#F3F4F6' }}>
                    <div>
                      <p className="text-sm font-medium" style={{ color: '#0A0A0A' }}>Horas sin respuesta para reasignar</p>
                      <p className="text-xs" style={{ color: '#9CA3AF' }}>Tiempo de espera antes de reasignar automáticamente</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <input
                        type="number" min="1" max="168" value={horasReasignacion}
                        onChange={e => setHorasReasignacion(e.target.value)}
                        className="w-16 text-right text-sm rounded-xl border px-2 py-1.5 outline-none"
                        style={{ borderColor: '#E5E5E5', color: '#0A0A0A' }} />
                      <span className="text-xs" style={{ color: '#9CA3AF' }}>hs</span>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap items-start justify-between gap-3 py-3 border-b" style={{ borderColor: '#F3F4F6' }}>
                  <div>
                    <p className="text-sm font-medium" style={{ color: '#0A0A0A' }}>Criterio de prioridad de leads</p>
                    <p className="text-xs" style={{ color: '#9CA3AF' }}>Qué determina la prioridad de un lead en el pipeline</p>
                  </div>
                  <select value={prioridadLeads} onChange={e => setPrioridadLeads(e.target.value)}
                    className="text-sm rounded-xl border px-3 py-1.5 outline-none w-full sm:w-auto"
                    style={{ borderColor: '#E5E5E5', color: '#0A0A0A', backgroundColor: '#FAFAFA' }}>
                    <option value="proyecto">Proyecto de interés</option>
                    <option value="fecha">Fecha de ingreso</option>
                    <option value="fuente">Fuente del lead</option>
                    <option value="score">Score IA</option>
                  </select>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 py-3">
                  <div>
                    <p className="text-sm font-medium" style={{ color: '#0A0A0A' }}>Días sin actividad para marcar lead inactivo</p>
                    <p className="text-xs" style={{ color: '#9CA3AF' }}>Leads sin movimiento se marcan automáticamente como inactivos</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      type="number" min="7" max="365" value={diasInactivo}
                      onChange={e => setDiasInactivo(e.target.value)}
                      className="w-16 text-right text-sm rounded-xl border px-2 py-1.5 outline-none"
                      style={{ borderColor: '#E5E5E5', color: '#0A0A0A' }} />
                    <span className="text-xs" style={{ color: '#9CA3AF' }}>días</span>
                  </div>
                </div>

              </div>
            </div>

            {/* ── Sección 3: Roles y usuarios ──────────────────────────────── */}
            <div className="rounded-2xl p-5 border" style={{ borderColor: '#E5E5E5', backgroundColor: '#fff' }}>
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4" style={{ color: '#006B4E' }} />
                <h3 className="font-semibold text-sm" style={{ color: '#0A0A0A' }}>Roles y usuarios</h3>
              </div>
              <p className="text-xs mb-4" style={{ color: '#9CA3AF' }}>Distribución actual de usuarios por rol en la plataforma.</p>
              <div className="space-y-2">
                {[
                  { rol: 'Admin CTP',          desc: 'Acceso total a configuración y gestión',          count: 3,   color: '#7C3AED', bg: '#F5F3FF' },
                  { rol: 'Admin Inmobiliaria', desc: 'Gestión completa del perfil de su inmobiliaria', count: 28,  color: '#006B4E', bg: '#F0FAF5' },
                  { rol: 'Broker',             desc: 'Gestión de leads y propiedades asignadas',        count: 134, color: '#525252', bg: '#F5F5F5' },
                  { rol: 'Personal',           desc: 'Acceso al panel de búsqueda y reservas',          count: 892, color: '#525252', bg: '#F5F5F5' },
                ].map(item => (
                  <div key={item.rol} className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl" style={{ backgroundColor: '#FAFAFA' }}>
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-semibold flex-shrink-0"
                        style={{ backgroundColor: item.bg, color: item.color }}>
                        {item.rol}
                      </span>
                      <span className="text-xs truncate hidden sm:block" style={{ color: '#9CA3AF' }}>{item.desc}</span>
                    </div>
                    <span className="flex-shrink-0 text-sm font-semibold tabular-nums" style={{ color: '#0A0A0A' }}>
                      {item.count.toLocaleString('es-CL')}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t flex items-center justify-between" style={{ borderColor: '#F3F4F6' }}>
                <span className="text-xs" style={{ color: '#9CA3AF' }}>Total de usuarios registrados</span>
                <span className="text-sm font-bold" style={{ color: '#0A0A0A' }}>1.057</span>
              </div>
            </div>

            {/* ── Sección 4: Scoring IA ─────────────────────────────────────── */}
            <div className="rounded-2xl p-5 border" style={{ borderColor: '#E5E5E5', backgroundColor: '#fff' }}>
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4" style={{ color: '#006B4E' }} />
                <h3 className="font-semibold text-sm" style={{ color: '#0A0A0A' }}>Scoring con IA</h3>
              </div>
              <p className="text-xs mb-4" style={{ color: '#9CA3AF' }}>Configuración del motor de puntuación automática de leads.</p>

              <div className="flex items-center justify-between gap-4 py-3 border-b mb-4" style={{ borderColor: '#F3F4F6' }}>
                <div>
                  <p className="text-sm font-medium" style={{ color: '#0A0A0A' }}>Scoring automático activo</p>
                  <p className="text-xs" style={{ color: '#9CA3AF' }}>El sistema asigna un puntaje 0–100 a cada lead según su perfil y comportamiento</p>
                </div>
                <button onClick={() => setIaActiva(v => !v)}
                  className="relative flex-shrink-0 w-11 h-6 rounded-full transition-colors duration-200"
                  style={{ backgroundColor: iaActiva ? '#006B4E' : '#D1D5DB' }}>
                  <span className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200"
                    style={{ transform: iaActiva ? 'translateX(20px)' : 'translateX(0)' }} />
                </button>
              </div>

              {iaActiva && (
                <div>
                  <p className="text-xs font-medium mb-3" style={{ color: '#525252' }}>Nivel de agresividad del modelo</p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {([
                      { value: 'conservador', label: 'Conservador', desc: 'Puntajes más bajos, menos falsos positivos' },
                      { value: 'medio',       label: 'Equilibrado',  desc: 'Balance entre precisión y cobertura' },
                      { value: 'agresivo',    label: 'Agresivo',     desc: 'Puntajes más altos, más leads destacados' },
                    ] as const).map(opt => (
                      <button key={opt.value} onClick={() => setScoringLevel(opt.value)}
                        className="rounded-xl p-3 border text-left transition-colors"
                        style={{
                          borderColor: scoringLevel === opt.value ? '#006B4E' : '#E5E5E5',
                          backgroundColor: scoringLevel === opt.value ? '#F0FAF5' : '#FAFAFA',
                        }}>
                        <p className="text-xs font-semibold mb-1" style={{ color: scoringLevel === opt.value ? '#006B4E' : '#0A0A0A' }}>{opt.label}</p>
                        <p className="text-xs" style={{ color: '#9CA3AF', lineHeight: '1.4' }}>{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Sección 5: Auditoría ──────────────────────────────────────── */}
            <div className="rounded-2xl p-5 border" style={{ borderColor: '#E5E5E5', backgroundColor: '#fff' }}>
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-4 h-4" style={{ color: '#006B4E' }} />
                <h3 className="font-semibold text-sm" style={{ color: '#0A0A0A' }}>Auditoría de cambios</h3>
              </div>
              <p className="text-xs mb-4" style={{ color: '#9CA3AF' }}>Últimas modificaciones realizadas en la configuración del sistema.</p>
              {(() => {
                const auditLogs = [
                  { quien: 'admin@ctp.cl',      accion: 'Activó asignación automática de leads',     fecha: '10 ago 2026, 11:42', critico: false },
                  { quien: 'admin@ctp.cl',      accion: 'Cambió criterio de prioridad a "Proyecto"', fecha: '09 ago 2026, 18:05', critico: false },
                  { quien: 'superadmin@ctp.cl', accion: 'Desactivó modo mantenimiento',              fecha: '08 ago 2026, 09:30', critico: true  },
                  { quien: 'superadmin@ctp.cl', accion: 'Activó scoring IA (nivel: equilibrado)',    fecha: '05 ago 2026, 14:17', critico: false },
                  { quien: 'admin@ctp.cl',      accion: 'Modificó días inactivo a 30 días',          fecha: '01 ago 2026, 10:00', critico: false },
                ];
                if (auditLogs.length === 0) {
                  return (
                    <div className="flex flex-col items-center justify-center py-10 gap-3">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F3F4F6' }}>
                        <Activity className="w-5 h-5" style={{ color: '#D1D5DB' }} />
                      </div>
                      <p className="text-sm font-medium" style={{ color: '#525252' }}>Sin registros aún</p>
                      <p className="text-xs text-center" style={{ color: '#9CA3AF', maxWidth: '220px' }}>
                        Aquí aparecerán los cambios realizados en la configuración del sistema.
                      </p>
                    </div>
                  );
                }
                return (
                  <div className="divide-y" style={{ borderColor: '#F3F4F6' }}>
                    {auditLogs.map((log, i) => (
                      <div key={i} className="py-3 flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2 min-w-0">
                          {log.critico && (
                            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#DC2626' }} />
                          )}
                          <div className="min-w-0">
                            <p className="text-xs font-medium" style={{ color: log.critico ? '#DC2626' : '#0A0A0A' }}>{log.accion}</p>
                            <p className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>{log.quien}</p>
                          </div>
                        </div>
                        <span className="text-xs flex-shrink-0" style={{ color: '#9CA3AF' }}>{log.fecha}</span>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>

            {/* Botón guardar */}
            <div className="flex justify-end pb-4">
              <button
                onClick={() => {
                  setSistemaSaved(true);
                  setTimeout(() => setSistemaSaved(false), 3000);
                }}
                className="px-5 py-2.5 rounded-xl text-sm font-medium"
                style={{ backgroundColor: '#006B4E', color: '#fff' }}>
                Guardar configuración
              </button>
            </div>

            </>)}

          </div>
        )}
      </div>

      {/* Sticky save CTA — solo para Perfil y Preferencias */}
      {showSaveCTA && (
        <div className="flex items-center justify-end gap-3 sticky bottom-6">
          <button
            onClick={() => {
              if (activeTab === 'profile' && userType === 'personal') setPerfilPersonal({ nombre: 'Carlos Muñoz', descripcion: 'Propietario directo - Sin intermediarios', ciudad: 'Coyhaique', region: 'Aysén', telefono: '+56 9 5555 1234', email: 'carlos.munoz@email.cl', whatsapp: '+56 9 5555 1234' });
              if (activeTab === 'profile' && userType === 'broker') setPerfilBroker({ nombre: 'Carlos Andrés Muñoz', especialidad: 'Broker especializado en parcelas de agrado', descripcion: 'Más de 8 años conectando familias con su terreno ideal. Especializado en la zona central y sur de Chile.', ciudad: 'Santiago', region: 'Metropolitana', telefono: '+56 9 8765 4321', email: 'carlos.munoz@vallecentral.cl', experiencia: '8' });
              if (activeTab === 'profile' && userType === 'inmobiliaria') setPerfil({ nombre: 'Inmobiliaria Valle Central', descripcion: 'Inmobiliaria especializada en parcelas de agrado en la zona central de Chile. Con más de 15 años de experiencia, conectamos a personas con sus terrenos ideales.', email: 'contacto@vallecentral.cl', telefono: '+56 9 8765 4321', whatsapp: '+56 9 8765 4321', web: 'www.vallecentral.cl', direccion: 'Av. Principal 1234, Santiago' });
            }}
            className="px-6 py-2.5 rounded-full text-sm font-medium transition-all"
            style={{ backgroundColor: '#FFFFFF', color: '#374151', border: '1.5px solid #E5E5E5', fontFamily: 'var(--font-body)' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F9FAFB'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={saveState === 'saving' || (activeTab === 'profile' && userType === 'personal' && !perfilPersonal.nombre) || (activeTab === 'profile' && userType === 'broker' && !perfilBroker.nombre) || (activeTab === 'profile' && userType === 'inmobiliaria' && !perfil.nombre)}
            className="flex items-center gap-2 px-8 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm"
            style={{
              backgroundColor: saveState === 'saving' ? '#E5E5E5' : '#006B4E',
              color: saveState === 'saving' ? '#9CA3AF' : '#FFFFFF',
              fontFamily: 'var(--font-body)',
              cursor: saveState === 'saving' ? 'not-allowed' : 'pointer',
            }}
            onMouseEnter={e => { if (saveState === 'idle') e.currentTarget.style.backgroundColor = '#01533E'; }}
            onMouseLeave={e => { if (saveState === 'idle') e.currentTarget.style.backgroundColor = '#006B4E'; }}
          >
            {saveState === 'saving' ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Guardando...
              </>
            ) : (
              'Guardar cambios'
            )}
          </button>
        </div>
      )}

      {/* Modal: Agregar usuario */}
      {showInviteModal && (() => {
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 space-y-5" style={{ border: '1px solid #E5E5E5' }}>
              <div className="flex items-center justify-between">
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h4)', fontWeight: 500, color: '#0A0A0A' }}>Agregar usuario</h3>
                <button onClick={() => { setShowInviteModal(false); setInviteError(''); }} className="p-1 rounded-lg hover:bg-gray-100">
                  <X className="w-4 h-4" style={{ color: '#9CA3AF' }} />
                </button>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#6B6B6B', lineHeight: '1.5' }}>
                El usuario recibirá un correo para crear su cuenta y acceder a la plataforma.
              </p>
              <div>
                <label className="block mb-2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151' }}>
                  Email <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={e => { setInviteEmail(e.target.value); setInviteError(''); }}
                  placeholder="usuario@empresa.cl"
                  className="w-full px-4 py-3 rounded-xl text-sm"
                  style={{ border: `1.5px solid ${inviteError ? '#DC2626' : '#E5E5E5'}`, fontFamily: 'var(--font-body)', color: '#0A0A0A', outline: 'none', backgroundColor: '#FAFAFA' }}
                  onFocus={e => { if (!inviteError) e.target.style.borderColor = '#006B4E'; }}
                  onBlur={e => { if (!inviteError) e.target.style.borderColor = '#E5E5E5'; }}
                />
                {inviteError && <p className="mt-1" style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#DC2626' }}>{inviteError}</p>}
              </div>
              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => { setShowInviteModal(false); setInviteError(''); }}
                  className="px-4 py-2.5 rounded-full text-sm font-medium"
                  style={{ backgroundColor: '#F5F5F5', color: '#374151', fontFamily: 'var(--font-body)' }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleInviteUser}
                  className="flex-1 py-2.5 rounded-full text-sm font-medium transition-all"
                  style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#01533E'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#006B4E'}
                >
                  Enviar invitación
                </button>
              </div>
            </div>
          </div>
        );
      })()}



      {/* Modal: Editar rol */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4 space-y-5" style={{ border: '1px solid #E5E5E5' }}>
            <div className="flex items-center justify-between">
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h4)', fontWeight: 500, color: '#0A0A0A' }}>Editar rol</h3>
              <button onClick={() => setEditingUser(null)} className="p-1 rounded-lg hover:bg-gray-100">
                <X className="w-4 h-4" style={{ color: '#9CA3AF' }} />
              </button>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E5E5' }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: getColor(editingUser.nombre).bg }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, color: getColor(editingUser.nombre).text }}>
                  {getInitials(editingUser.nombre)}
                </span>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#0A0A0A' }}>
                {editingUser.nombre}
              </p>
            </div>
            <div>
              <label className="block mb-2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151' }}>
                Nuevo rol
              </label>
              <div className="flex flex-col gap-1.5">
                {(['Admin', 'Broker', 'Editor', 'Moderador', 'Solo lectura'] as const).map(r => (
                  <button
                    key={r}
                    onClick={() => setNewRol(r)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-all"
                    style={{
                      border: `1.5px solid ${newRol === r ? '#006B4E' : '#E5E5E5'}`,
                      backgroundColor: newRol === r ? '#F0FDF4' : '#FAFAFA',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    <span
                      className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center"
                      style={{ border: `2px solid ${newRol === r ? '#006B4E' : '#D1D5DB'}`, backgroundColor: newRol === r ? '#006B4E' : 'transparent' }}
                    >
                      {newRol === r && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                    <span style={{ fontSize: '13px', fontWeight: 500, color: newRol === r ? '#006B4E' : '#0A0A0A' }}>{r}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3 pt-1">
              <button onClick={() => setEditingUser(null)} className="px-4 py-2.5 rounded-full text-sm font-medium" style={{ backgroundColor: '#F5F5F5', color: '#374151', fontFamily: 'var(--font-body)' }}>
                Cancelar
              </button>
              <button
                onClick={handleRolChange}
                className="flex-1 py-2.5 rounded-full text-sm font-medium transition-all"
                style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#01533E'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#006B4E'}
              >
                Confirmar cambio
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
