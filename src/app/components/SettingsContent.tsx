import React, { useState } from 'react';
import { Building2, Bell, Globe, Shield, Upload, Eye, EyeOff, Check, User, LogOut, X, Plus, Monitor, Smartphone, Tablet, AlertTriangle, Award, Briefcase, Image } from 'lucide-react';

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

const USUARIOS_INIT = [
  { id: 1, nombre: 'María Fernanda González', email: 'mfernanda@vallecentral.cl', rol: 'Admin' as const,  ultimoAcceso: 'Hace 2 horas' },
  { id: 2, nombre: 'Carlos Andrés Muñoz',     email: 'cmunoz@vallecentral.cl',     rol: 'Broker' as const, ultimoAcceso: 'Hace 1 día' },
  { id: 3, nombre: 'Javiera Paz Rojas',        email: 'jrojas@vallecentral.cl',     rol: 'Broker' as const, ultimoAcceso: 'Hace 3 días' },
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

// ─── Main Component ───────────────────────────────────────────────────────────

export function SettingsContent() {
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'users' | 'security'>('profile');
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

  // — Preferencias state
  const [notifs, setNotifs] = useState({ newInquiry: true, statusChange: true, teamActivity: false, updates: true });
  const [idioma, setIdioma] = useState('es-CL');
  const [timezone, setTimezone] = useState('America/Santiago');

  // — Usuarios state
  const [usuarios, setUsuarios] = useState(USUARIOS_INIT);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRol, setInviteRol] = useState<'Admin' | 'Broker'>('Broker');
  const [inviteError, setInviteError] = useState('');
  const [editingUser, setEditingUser] = useState<{ id: number; nombre: string; rol: 'Admin' | 'Broker' } | null>(null);
  const [newRol, setNewRol] = useState<'Admin' | 'Broker'>('Broker');

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

  const handleInviteUser = () => {
    if (!inviteEmail.trim() || !inviteEmail.includes('@')) {
      setInviteError('Ingresá un email válido');
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

  const showSaveCTA = activeTab === 'profile' || activeTab === 'preferences';

  // ─── Render ────────────────────────────────────────────────────────────────

  const tabs = [
    { id: 'profile',     label: 'Perfil',              icon: Building2 },
    { id: 'preferences', label: 'Preferencias',         icon: Bell },
    { id: 'users',       label: 'Usuarios y permisos',  icon: User },
    { id: 'security',    label: 'Seguridad',             icon: Shield },
  ];

  return (
    <main className="px-6 py-6 space-y-6">

      {/* Header */}
      <div className="space-y-1">
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h2)', fontWeight: 500, color: '#0A0A0A', lineHeight: 'var(--line-height-heading)' }}>
          Configuración
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', color: '#6B6B6B', lineHeight: 'var(--line-height-body)' }}>
          Gestioná tu perfil institucional, equipo y seguridad
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

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-2xl overflow-x-auto" style={{ backgroundColor: '#F3F4F6' }}>
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap"
              style={{
                fontFamily: 'var(--font-body)',
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

      {/* Content card */}
      <div className="rounded-2xl" style={{ border: '1.5px solid #E5E5E5', backgroundColor: '#FFFFFF' }}>

        {/* ── Tab: Perfil ──────────────────────────────────────────────────── */}
        {activeTab === 'profile' && (
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
              <div className="mt-4">
                <label className="block mb-2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151' }}>
                  WhatsApp oficial
                </label>
                <input
                  type="tel"
                  value={perfil.whatsapp}
                  placeholder="+56 9 1234 5678"
                  onChange={e => setPerfil(p => ({ ...p, whatsapp: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl text-sm transition-colors"
                  style={{ border: '1.5px solid #E5E5E5', fontFamily: 'var(--font-body)', color: '#0A0A0A', outline: 'none', backgroundColor: '#FAFAFA', maxWidth: '320px' }}
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
                Agregá certificaciones o membresías que acrediten la calidad de tu inmobiliaria
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
                  Elegí qué avisos querés recibir en tu correo
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
          <div className="p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h3)', fontWeight: 500, color: '#0A0A0A' }}>
                  Usuarios y permisos
                </h2>
                <p className="mt-0.5" style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>
                  {usuarios.length} {usuarios.length === 1 ? 'usuario' : 'usuarios'} en tu equipo
                </p>
              </div>
              <button
                onClick={() => setShowInviteModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all"
                style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#01533E'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#006B4E'}
              >
                <Plus className="w-4 h-4" /> Invitar usuario
              </button>
            </div>

            {usuarios.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#F5F5F5' }}>
                  <User className="w-7 h-7" style={{ color: '#D1D5DB' }} />
                </div>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h4)', fontWeight: 500, color: '#0A0A0A', marginBottom: '6px' }}>
                  Sin usuarios aún
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>
                  Invitá a los miembros de tu equipo para empezar.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {usuarios.map(user => {
                  const color = getColor(user.nombre);
                  const isAdmin = user.rol === 'Admin';
                  return (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 rounded-xl transition-colors"
                      style={{ border: '1.5px solid #E5E5E5', backgroundColor: '#FAFAFA' }}
                      onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.backgroundColor = '#F3F4F6'}
                      onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.backgroundColor = '#FAFAFA'}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: color.bg }}>
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 700, color: color.text }}>
                            {getInitials(user.nombre)}
                          </span>
                        </div>
                        <div>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#0A0A0A' }}>
                            {user.nombre}
                          </p>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span
                            className="px-2.5 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: isAdmin ? '#F5F3FF' : '#DCFCE7',
                              color: isAdmin ? '#6D28D9' : '#166534',
                              border: `1px solid ${isAdmin ? '#DDD6FE' : '#86EFAC'}`,
                              fontFamily: 'var(--font-body)',
                            }}
                          >
                            {user.rol}
                          </span>
                          <p className="mt-1" style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#A3A3A3' }}>
                            {user.ultimoAcceso}
                          </p>
                        </div>
                        <button
                          onClick={() => { setEditingUser({ id: user.id, nombre: user.nombre, rol: user.rol }); setNewRol(user.rol); }}
                          className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                          style={{ border: '1px solid #E5E5E5', color: '#374151', backgroundColor: '#FFFFFF', fontFamily: 'var(--font-body)' }}
                          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F3F4F6'}
                          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                        >
                          Editar rol
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Leyenda de roles */}
            <div className="p-4 rounded-xl" style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#374151', lineHeight: '1.6' }}>
                <strong style={{ color: '#166534' }}>Admin:</strong> Acceso completo a todas las funciones y configuración.{' '}
                <strong style={{ color: '#166534' }}>Broker:</strong> Puede gestionar publicaciones y consultas asignadas.
              </p>
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
              if (activeTab === 'profile') setPerfil({ nombre: 'Inmobiliaria Valle Central', descripcion: 'Inmobiliaria especializada en parcelas de agrado en la zona central de Chile. Con más de 15 años de experiencia, conectamos a personas con sus terrenos ideales.', email: 'contacto@vallecentral.cl', telefono: '+56 9 8765 4321', web: 'www.vallecentral.cl', direccion: 'Av. Principal 1234, Santiago' });
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
            disabled={saveState === 'saving' || (activeTab === 'profile' && !perfil.nombre)}
            className="flex items-center gap-2 px-8 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm"
            style={{
              backgroundColor: saveState === 'saving' || (activeTab === 'profile' && !perfil.nombre) ? '#E5E5E5' : '#006B4E',
              color: saveState === 'saving' || (activeTab === 'profile' && !perfil.nombre) ? '#9CA3AF' : '#FFFFFF',
              fontFamily: 'var(--font-body)',
              cursor: saveState === 'saving' ? 'not-allowed' : 'pointer',
            }}
            onMouseEnter={e => { if (saveState === 'idle' && perfil.nombre) e.currentTarget.style.backgroundColor = '#01533E'; }}
            onMouseLeave={e => { if (saveState === 'idle' && perfil.nombre) e.currentTarget.style.backgroundColor = '#006B4E'; }}
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

      {/* Modal: Invitar usuario */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4 space-y-5" style={{ border: '1px solid #E5E5E5' }}>
            <div className="flex items-center justify-between">
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h4)', fontWeight: 500, color: '#0A0A0A' }}>Invitar usuario</h3>
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
                Rol
              </label>
              <div className="flex gap-2">
                {(['Broker', 'Admin'] as const).map(r => (
                  <button
                    key={r}
                    onClick={() => setInviteRol(r)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all"
                    style={{
                      border: `1.5px solid ${inviteRol === r ? '#006B4E' : '#E5E5E5'}`,
                      backgroundColor: inviteRol === r ? '#F0FDF4' : '#FAFAFA',
                      color: inviteRol === r ? '#006B4E' : '#6B7280',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <p className="mt-1.5" style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF' }}>
                {inviteRol === 'Admin' ? 'Acceso completo a configuración y equipo' : 'Acceso a publicaciones y consultas asignadas'}
              </p>
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
      )}

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
              <div className="flex gap-2">
                {(['Broker', 'Admin'] as const).map(r => (
                  <button
                    key={r}
                    onClick={() => setNewRol(r)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all"
                    style={{
                      border: `1.5px solid ${newRol === r ? '#006B4E' : '#E5E5E5'}`,
                      backgroundColor: newRol === r ? '#F0FDF4' : '#FAFAFA',
                      color: newRol === r ? '#006B4E' : '#6B7280',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {r}
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
