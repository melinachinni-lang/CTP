import React, { useState } from 'react';
import { Building2, Bell, Globe, Shield, Upload, Eye, EyeOff, Check, User, LogOut, X, Plus, Monitor, Smartphone, Tablet, AlertTriangle, Award, Briefcase, Image, Star, Copy, BarChart2, Users, MapPin, Phone, Mail, ShieldCheck, FileText, BadgeCheck, Link2, Search, MoreHorizontal } from 'lucide-react';
import { WhitelistAdminView } from '@/app/components/WhitelistAdminView';

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

const TESTIMONIOS_INIT = [
  { id: 1, nombre: 'Rodrigo Fuentes', fecha: 'Mayo 2026', estrellas: 5, texto: 'Excelente atención, muy profesionales. Nos ayudaron a encontrar la parcela perfecta en tiempo récord.', visible: true },
  { id: 2, nombre: 'Camila Torres', fecha: 'Abril 2026', estrellas: 5, texto: 'Proceso muy transparente y el equipo siempre disponible para resolver dudas. Muy recomendable.', visible: true },
  { id: 3, nombre: 'Sebastián Mora', fecha: 'Marzo 2026', estrellas: 4, texto: 'Buena experiencia general. El trámite tomó un poco más de lo esperado pero el resultado fue excelente.', visible: false },
];

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

export function SettingsContent({ mode = 'settings', userType = 'inmobiliaria' }: { mode?: 'profile' | 'settings'; userType?: 'inmobiliaria' | 'broker' | 'personal' }) {
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'users' | 'security'>(
    mode === 'profile' ? 'profile' : 'preferences'
  );
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'success'>('idle');

  // — Perfil form state
  const [perfil, setPerfil] = useState({
    nombre: 'Inmobiliaria Valle Central',
    descripcion: 'Inmobiliaria especializada en parcelas de agrado en la zona central de Chile. Con más de 15 años de experiencia, conectamos a personas con sus terrenos ideales.',
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
  const [testimonios, setTestimonios] = useState(TESTIMONIOS_INIT);
  const [linkCopiado, setLinkCopiado] = useState(false);
  const [showCompartirModal, setShowCompartirModal] = useState(false);
  const [showCompartirModalBroker, setShowCompartirModalBroker] = useState(false);
  const [testimoniosBroker, setTestimoniosBroker] = useState([
    { id: 1, nombre: 'María González', fecha: 'Mayo 2026', estrellas: 5, texto: 'Excelente profesional, me ayudó a encontrar la parcela perfecta para mi familia. Muy transparente y dedicado.', visible: true },
    { id: 2, nombre: 'Carlos Muñoz', fecha: 'Abril 2026', estrellas: 5, texto: 'Súper recomendado. Conoce muy bien el mercado y fue muy honesto con todas mis consultas.', visible: true },
    { id: 3, nombre: 'Andrea Silva', fecha: 'Marzo 2026', estrellas: 5, texto: 'Gracias a su asesoría pude hacer una excelente inversión. Muy profesional y atento.', visible: false },
  ]);
  const [linkCopiadoBroker, setLinkCopiadoBroker] = useState(false);

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

  const handleCopiarLink = () => setShowCompartirModal(true);
  const handleCopiarLinkBroker = () => setShowCompartirModalBroker(true);

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
    { id: 'security',    label: 'Seguridad',             icon: Shield },
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
              <p className="mb-4" style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>
                Esta información aparecerá en los botones "Llamar" y "WhatsApp" de tu perfil público
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {([
                  { key: 'telefono', label: 'Teléfono', type: 'tel', placeholder: '+56 9 1234 5678', icon: Phone },
                  { key: 'email', label: 'Email de contacto', type: 'email', placeholder: 'tu@email.cl', icon: Mail },
                ] as const).map(field => {
                  const FieldIcon = field.icon;
                  return (
                    <div key={field.key}>
                      <label className="block mb-2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151' }}>
                        {field.label}
                      </label>
                      <div className="relative">
                        <FieldIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9CA3AF' }} />
                        <input
                          type={field.type}
                          value={perfilPersonal[field.key]}
                          placeholder={field.placeholder}
                          onChange={e => setPerfilPersonal(p => ({ ...p, [field.key]: e.target.value }))}
                          className="w-full pl-9 pr-4 py-3 rounded-xl text-sm transition-colors"
                          style={{ border: '1.5px solid #E5E5E5', fontFamily: 'var(--font-body)', color: '#0A0A0A', outline: 'none', backgroundColor: '#FAFAFA' }}
                          onFocus={e => e.target.style.borderColor = '#006B4E'}
                          onBlur={e => e.target.style.borderColor = '#E5E5E5'}
                        />
                      </div>
                    </div>
                  );
                })}
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

            {/* Testimonios broker */}
            <div style={{ paddingTop: '8px', borderTop: '1px solid #F0F0F0' }}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4" style={{ color: '#6B7280' }} />
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#374151' }}>Testimonios de clientes</p>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: '#F0FDF4', color: '#166534', border: '1px solid #BBF7D0', fontFamily: 'var(--font-body)' }}>
                    {testimoniosBroker.length}
                  </span>
                </div>
                <button
                  onClick={handleCopiarLinkBroker}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all"
                  style={{ backgroundColor: linkCopiadoBroker ? '#F0FDF4' : '#006B4E', color: linkCopiadoBroker ? '#166534' : '#FFFFFF', border: linkCopiadoBroker ? '1.5px solid #BBF7D0' : 'none', fontFamily: 'var(--font-body)' }}
                  onMouseEnter={e => { if (!linkCopiadoBroker) e.currentTarget.style.backgroundColor = '#01533E'; }}
                  onMouseLeave={e => { if (!linkCopiadoBroker) e.currentTarget.style.backgroundColor = '#006B4E'; }}
                >
                  {linkCopiadoBroker ? <><Check className="w-3.5 h-3.5" /> ¡Link copiado!</> : <><Copy className="w-3.5 h-3.5" /> Compartir link</>}
                </button>
              </div>
              <p className="mb-4" style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>
                Comparte el link para que tus clientes dejen su testimonio en tu perfil público. Puedes mostrar u ocultar cada uno.
              </p>
              <div className="space-y-3">
                {testimoniosBroker.map(t => {
                  const color = getColor(t.nombre);
                  return (
                    <div key={t.id} className="p-4 rounded-xl" style={{ border: `1.5px solid ${t.visible ? '#E5E5E5' : '#F3F4F6'}`, backgroundColor: t.visible ? '#FAFAFA' : '#F9FAFB', opacity: t.visible ? 1 : 0.6 }}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: color.bg }}>
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, color: color.text }}>{getInitials(t.nombre)}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: '#0A0A0A' }}>{t.nombre}</p>
                              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF' }}>{t.fecha}</p>
                            </div>
                            <div className="flex gap-0.5 mb-2">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5" fill={i < t.estrellas ? '#F59E0B' : 'none'} style={{ color: i < t.estrellas ? '#F59E0B' : '#E5E7EB' }} />
                              ))}
                            </div>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#374151', lineHeight: '1.5' }}>{t.texto}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-center gap-1 flex-shrink-0">
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: t.visible ? '#166534' : '#9CA3AF' }}>
                            {t.visible ? 'Visible' : 'Oculto'}
                          </span>
                          <button
                            onClick={() => setTestimoniosBroker(prev => prev.map(x => x.id === t.id ? { ...x, visible: !x.visible } : x))}
                            className="relative flex-shrink-0"
                            style={{ width: '36px', height: '20px', borderRadius: '200px', backgroundColor: t.visible ? '#006B4E' : '#D1D5DB', padding: '2px', transition: 'background-color 0.2s' }}
                          >
                            <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#FFFFFF', position: 'absolute', top: '2px', left: t.visible ? 'calc(100% - 18px)' : '2px', transition: 'left 0.2s' }} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
                rows={4}
                value={perfil.descripcion}
                onChange={e => setPerfil(p => ({ ...p, descripcion: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl text-sm resize-none transition-colors"
                style={{ border: '1.5px solid #E5E5E5', fontFamily: 'var(--font-body)', color: '#0A0A0A', outline: 'none', backgroundColor: '#FAFAFA', lineHeight: '1.6' }}
                onFocus={e => e.target.style.borderColor = '#006B4E'}
                onBlur={e => e.target.style.borderColor = '#E5E5E5'}
              />
              <p className="mt-1 text-right" style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF' }}>
                {perfil.descripcion.length} caracteres
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

            {/* Testimonios — solo inmobiliaria */}
            {userType === 'inmobiliaria' && (
              <div style={{ paddingTop: '8px', borderTop: '1px solid #F0F0F0' }}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4" style={{ color: '#6B7280' }} />
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#374151' }}>
                      Testimonios de clientes
                    </p>
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: '#F0FDF4', color: '#166534', border: '1px solid #BBF7D0', fontFamily: 'var(--font-body)' }}>
                      {testimonios.length}
                    </span>
                  </div>
                  <button
                    onClick={handleCopiarLink}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all"
                    style={{ backgroundColor: linkCopiado ? '#F0FDF4' : '#006B4E', color: linkCopiado ? '#166534' : '#FFFFFF', border: linkCopiado ? '1.5px solid #BBF7D0' : 'none', fontFamily: 'var(--font-body)' }}
                    onMouseEnter={e => { if (!linkCopiado) e.currentTarget.style.backgroundColor = '#01533E'; }}
                    onMouseLeave={e => { if (!linkCopiado) e.currentTarget.style.backgroundColor = '#006B4E'; }}
                  >
                    {linkCopiado ? <><Check className="w-3.5 h-3.5" /> ¡Link copiado!</> : <><Copy className="w-3.5 h-3.5" /> Compartir link</>}
                  </button>
                </div>
                <p className="mb-4" style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>
                  Comparte el link para que tus clientes puedan dejar su testimonio en tu perfil público
                </p>
                <div className="space-y-3">
                  {testimonios.map(t => {
                    const color = getColor(t.nombre);
                    return (
                      <div key={t.id} className="p-4 rounded-xl" style={{ border: `1.5px solid ${t.visible ? '#E5E5E5' : '#F3F4F6'}`, backgroundColor: t.visible ? '#FAFAFA' : '#F9FAFB', opacity: t.visible ? 1 : 0.6 }}>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: color.bg }}>
                              <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, color: color.text }}>{getInitials(t.nombre)}</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: '#0A0A0A' }}>{t.nombre}</p>
                                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF' }}>{t.fecha}</p>
                              </div>
                              <div className="flex gap-0.5 mb-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star key={i} className="w-3.5 h-3.5" fill={i < t.estrellas ? '#F59E0B' : 'none'} style={{ color: i < t.estrellas ? '#F59E0B' : '#E5E7EB' }} />
                                ))}
                              </div>
                              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#374151', lineHeight: '1.5' }}>{t.texto}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-center gap-1 flex-shrink-0">
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: t.visible ? '#166534' : '#9CA3AF' }}>
                              {t.visible ? 'Visible' : 'Oculto'}
                            </span>
                            <button
                              onClick={() => setTestimonios(prev => prev.map(x => x.id === t.id ? { ...x, visible: !x.visible } : x))}
                              className="relative flex-shrink-0"
                              style={{ width: '36px', height: '20px', borderRadius: '200px', backgroundColor: t.visible ? '#006B4E' : '#D1D5DB', padding: '2px', transition: 'background-color 0.2s' }}
                            >
                              <div
                                style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#FFFFFF', position: 'absolute', top: '2px', left: t.visible ? 'calc(100% - 18px)' : '2px', transition: 'left 0.2s' }}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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

            {/* ── Sección: Brokers ── */}
            <div className="space-y-4">
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
            </div>

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

            {/* ── Sección: Whitelist de acceso ── */}
            <div className="space-y-4" style={{ paddingTop: '8px', borderTop: '1px solid #F0F0F0' }}>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-4 h-4" style={{ color: '#6B7280' }} />
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#374151' }}>Whitelist de acceso</p>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>
                  Controla qué correos pueden registrarse o iniciar sesión en la plataforma.
                </p>
              </div>
              <WhitelistAdminView />
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

            {/* Sesiones activas */}
            <div className="space-y-4">
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, color: '#374151' }}>
                  Sesiones activas
                </p>
                <p className="mt-0.5" style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>
                  Dispositivos donde tu cuenta está actualmente iniciada
                </p>
              </div>

              <div className="space-y-2">
                {sessions.map(s => (
                  <div
                    key={s.id}
                    className="flex items-center justify-between p-4 rounded-xl"
                    style={{ border: `1.5px solid ${s.esCurrent ? '#BBF7D0' : '#E5E5E5'}`, backgroundColor: s.esCurrent ? '#F0FDF4' : '#FAFAFA' }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: s.esCurrent ? '#DCFCE7' : '#F3F4F6' }}>
                        <DeviceIcon type={s.icon} />
                      </div>
                      <div>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#0A0A0A' }}>
                          {s.dispositivo} · {s.browser}
                        </p>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>
                          {s.ubicacion} · {s.tiempo}
                        </p>
                      </div>
                    </div>
                    {s.esCurrent ? (
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#DCFCE7', color: '#166534', border: '1px solid #86EFAC', fontFamily: 'var(--font-body)' }}>
                        Este dispositivo
                      </span>
                    ) : (
                      <button
                        onClick={() => handleCloseSession(s.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                        style={{ color: '#DC2626', border: '1px solid #FCA5A5', backgroundColor: '#FFF1F1', fontFamily: 'var(--font-body)' }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FEE2E2'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFF1F1'}
                      >
                        <LogOut className="w-3 h-3" /> Cerrar sesión
                      </button>
                    )}
                  </div>
                ))}

                {sessions.filter(s => !s.esCurrent).length === 0 && sessions.length > 0 && (
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#9CA3AF', textAlign: 'center', padding: '8px 0' }}>
                    No hay otras sesiones activas
                  </p>
                )}
              </div>

              {/* Cerrar todas */}
              {sessions.filter(s => !s.esCurrent).length > 0 && !showCloseAllConfirm && (
                <button
                  onClick={() => setShowCloseAllConfirm(true)}
                  className="w-full py-3 px-6 rounded-full text-sm font-medium transition-all"
                  style={{ border: '1.5px solid #FCA5A5', color: '#DC2626', backgroundColor: '#FFFFFF', fontFamily: 'var(--font-body)' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FFF1F1'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                >
                  Cerrar todas las sesiones excepto esta
                </button>
              )}

              {showCloseAllConfirm && (
                <div className="p-4 rounded-xl space-y-3" style={{ backgroundColor: '#FFF1F1', border: '1.5px solid #FCA5A5' }}>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0" style={{ color: '#DC2626' }} />
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#991B1B' }}>
                      ¿Cerrar todas las sesiones?
                    </p>
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#B91C1C', lineHeight: '1.5' }}>
                    Esta acción cerrará la sesión en todos los dispositivos excepto el actual. Deberán volver a iniciar sesión.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowCloseAllConfirm(false)}
                      className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                      style={{ backgroundColor: '#FFFFFF', color: '#374151', border: '1px solid #E5E5E5', fontFamily: 'var(--font-body)' }}
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleCloseAllSessions}
                      className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                      style={{ backgroundColor: '#DC2626', color: '#FFFFFF', fontFamily: 'var(--font-body)' }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#B91C1C'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#DC2626'}
                    >
                      Sí, cerrar todas
                    </button>
                  </div>
                </div>
              )}
            </div>
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
        const roles: { value: UserRol; label: string; desc: string }[] = [
          { value: 'Admin',        label: 'Admin',        desc: 'Acceso completo a configuración, equipo y datos' },
          { value: 'Broker',       label: 'Broker',       desc: 'Gestión de publicaciones y consultas asignadas' },
          { value: 'Editor',       label: 'Editor',       desc: 'Puede crear y editar contenido, sin configuración' },
          { value: 'Moderador',    label: 'Moderador',    desc: 'Revisión y aprobación de contenido publicado' },
          { value: 'Solo lectura', label: 'Solo lectura', desc: 'Visualización sin posibilidad de editar' },
        ];
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
              <div>
                <label className="block mb-2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151' }}>
                  Tipo de usuario
                </label>
                <div className="flex flex-col gap-1.5">
                  {roles.map(({ value, label, desc }) => (
                    <button
                      key={value}
                      onClick={() => setInviteRol(value)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-all"
                      style={{
                        border: `1.5px solid ${inviteRol === value ? '#006B4E' : '#E5E5E5'}`,
                        backgroundColor: inviteRol === value ? '#F0FDF4' : '#FAFAFA',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      <span
                        className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center"
                        style={{
                          border: `2px solid ${inviteRol === value ? '#006B4E' : '#D1D5DB'}`,
                          backgroundColor: inviteRol === value ? '#006B4E' : 'transparent',
                        }}
                      >
                        {inviteRol === value && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </span>
                      <div className="flex flex-col gap-0.5">
                        <span style={{ fontSize: '13px', fontWeight: 500, color: inviteRol === value ? '#006B4E' : '#0A0A0A', lineHeight: '1.3' }}>{label}</span>
                        <span style={{ fontSize: '11px', color: '#9CA3AF', lineHeight: '1.3' }}>{desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
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
      {/* Modal compartir link — inmobiliaria */}
      {showCompartirModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }} onClick={() => setShowCompartirModal(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#DCFCE7' }}>
                  <Link2 className="w-5 h-5" style={{ color: '#006B4E' }} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 600, color: '#0A0A0A' }}>Compartir link de testimonios</h3>
              </div>
              <button onClick={() => setShowCompartirModal(false)} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5" style={{ color: '#737373' }} />
              </button>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#737373', marginBottom: '20px', lineHeight: '1.5' }}>
              Comparte este link con tus clientes para que puedan dejar su testimonio en tu perfil público.
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value="compratuparcela.cl/testimonial/valle-central"
                className="flex-1 px-4 py-3 rounded-xl text-sm"
                style={{ border: '1.5px solid #E5E5E5', fontFamily: 'var(--font-body)', color: '#0A0A0A', backgroundColor: '#FAFAFA', outline: 'none' }}
              />
              <button
                onClick={() => { setLinkCopiado(true); setTimeout(() => setLinkCopiado(false), 2500); }}
                className="px-4 py-3 rounded-xl flex items-center gap-2 transition-all flex-shrink-0"
                style={{ backgroundColor: linkCopiado ? '#F0FDF4' : '#006B4E', color: linkCopiado ? '#166534' : '#FFFFFF', border: linkCopiado ? '1.5px solid #BBF7D0' : 'none', fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500 }}
              >
                {linkCopiado ? <><Check className="w-4 h-4" />Copiado</> : <><Copy className="w-4 h-4" />Copiar</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal compartir link — broker */}
      {showCompartirModalBroker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }} onClick={() => setShowCompartirModalBroker(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#DCFCE7' }}>
                  <Link2 className="w-5 h-5" style={{ color: '#006B4E' }} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 600, color: '#0A0A0A' }}>Compartir link de testimonios</h3>
              </div>
              <button onClick={() => setShowCompartirModalBroker(false)} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5" style={{ color: '#737373' }} />
              </button>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#737373', marginBottom: '20px', lineHeight: '1.5' }}>
              Comparte este link con tus clientes para que puedan dejar su testimonio en tu perfil público.
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value="compratuparcela.cl/testimonial/broker/carlos-rodriguez"
                className="flex-1 px-4 py-3 rounded-xl text-sm"
                style={{ border: '1.5px solid #E5E5E5', fontFamily: 'var(--font-body)', color: '#0A0A0A', backgroundColor: '#FAFAFA', outline: 'none' }}
              />
              <button
                onClick={() => { setLinkCopiadoBroker(true); setTimeout(() => setLinkCopiadoBroker(false), 2500); }}
                className="px-4 py-3 rounded-xl flex items-center gap-2 transition-all flex-shrink-0"
                style={{ backgroundColor: linkCopiadoBroker ? '#F0FDF4' : '#006B4E', color: linkCopiadoBroker ? '#166534' : '#FFFFFF', border: linkCopiadoBroker ? '1.5px solid #BBF7D0' : 'none', fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500 }}
              >
                {linkCopiadoBroker ? <><Check className="w-4 h-4" />Copiado</> : <><Copy className="w-4 h-4" />Copiar</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
