import React from 'react';
import { Building2, Bell, Globe, Shield, Upload, Eye, EyeOff, Check, User, LogOut } from 'lucide-react';

export function SettingsContent() {
  const [activeTab, setActiveTab] = React.useState<'profile' | 'preferences' | 'users' | 'security'>('profile');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [savedNotification, setSavedNotification] = React.useState(false);

  const tabs = [
    { id: 'profile', label: 'Perfil de la inmobiliaria', icon: Building2 },
    { id: 'preferences', label: 'Preferencias', icon: Bell },
    { id: 'users', label: 'Usuarios y permisos', icon: User },
    { id: 'security', label: 'Seguridad', icon: Shield }
  ];

  const users = [
    {
      id: 1,
      nombre: 'María Fernanda González',
      email: 'mfernanda@inmobiliaria.cl',
      rol: 'Admin',
      ultimoAcceso: 'Hace 2 horas'
    },
    {
      id: 2,
      nombre: 'Carlos Andrés Muñoz',
      email: 'cmunoz@inmobiliaria.cl',
      rol: 'Broker',
      ultimoAcceso: 'Hace 1 día'
    },
    {
      id: 3,
      nombre: 'Javiera Paz Rojas',
      email: 'jrojas@inmobiliaria.cl',
      rol: 'Broker',
      ultimoAcceso: 'Hace 3 días'
    }
  ];

  const handleSave = () => {
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 3000);
  };

  const getIconColorClasses = (color: string) => {
    const colors = {
      blue: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
      green: { bg: 'bg-green-100', text: 'text-green-600' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600' }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

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
          Gestiona tu perfil, preferencias y ajustes de seguridad
        </p>
      </div>

      {/* Success Notification */}
      {savedNotification && (
        <div className="bg-green-50 border-2 border-green-200 rounded-[16px] p-4 flex items-center gap-3">
          <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
            <Check className="w-3 h-3 text-white" />
          </div>
          <span 
            style={{ 
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-base)',
              fontWeight: 'var(--font-weight-regular)',
              color: '#0A0A0A',
              lineHeight: 'var(--line-height-body)'
            }}
          >
            Cambios guardados exitosamente
          </span>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white border-2 border-gray-200 rounded-[24px] p-2 flex gap-2 overflow-x-auto shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className="flex items-center gap-2 px-6 py-3 transition-all whitespace-nowrap"
              style={{
                backgroundColor: isActive ? '#0A0A0A' : '#FFFFFF',
                color: isActive ? '#FFFFFF' : '#0A0A0A',
                borderRadius: '200px',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                fontWeight: isActive ? 'var(--font-weight-medium)' : 'var(--font-weight-regular)',
                lineHeight: 'var(--line-height-body)'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = '#F5F5F5';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                }
              }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: isActive ? '#6B6B6B' : '#F5F5F5' }}>
                <Icon className="w-5 h-5" style={{ color: isActive ? '#FFFFFF' : '#0A0A0A' }} />
              </div>
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="bg-white border-2 border-gray-200 rounded-[24px] p-8 space-y-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
        
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div>
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
                Perfil de la inmobiliaria
              </h2>
              
              {/* Logo */}
              <div className="space-y-3 mb-6">
                <label 
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-base)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  Logo de la empresa
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gray-100 border-2 border-gray-200 rounded-[16px] flex items-center justify-center">
                    <Building2 className="w-10 h-10 text-gray-400" />
                  </div>
                  <button
                    className="bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-black py-3 px-6 rounded-[200px] transition-colors flex items-center gap-2"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-base)',
                      fontWeight: 'var(--font-weight-medium)',
                      lineHeight: 'var(--line-height-body)',
                      color: '#0A0A0A'
                    }}
                  >
                    <Upload className="w-5 h-5" />
                    Cambiar logo
                  </button>
                </div>
              </div>

              {/* Nombre comercial */}
              <div className="space-y-3 mb-6">
                <label 
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-base)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  Nombre comercial
                </label>
                <input
                  type="text"
                  defaultValue="Inmobiliaria Valle Central"
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-[12px] focus:outline-none focus:border-gray-300 transition-colors"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-base)',
                    fontWeight: 'var(--font-weight-regular)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-body)'
                  }}
                />
              </div>

              {/* Descripción */}
              <div className="space-y-3 mb-6">
                <label 
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-base)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  Descripción de la empresa
                </label>
                <textarea
                  rows={4}
                  defaultValue="Inmobiliaria especializada en parcelas de agrado en la zona central de Chile. Con más de 15 años de experiencia, conectamos a personas con sus terrenos ideales."
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-[12px] focus:outline-none focus:border-gray-300 transition-colors resize-none"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-base)',
                    fontWeight: 'var(--font-weight-regular)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-body)'
                  }}
                />
              </div>

              {/* Datos de contacto */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-base)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    Email de contacto
                  </label>
                  <input
                    type="email"
                    defaultValue="contacto@vallecentral.cl"
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-[12px] focus:outline-none focus:border-gray-300 transition-colors"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-base)',
                      fontWeight: 'var(--font-weight-regular)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  />
                </div>
                <div className="space-y-3">
                  <label 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-base)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    defaultValue="+56 9 8765 4321"
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-[12px] focus:outline-none focus:border-gray-300 transition-colors"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-base)',
                      fontWeight: 'var(--font-weight-regular)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  />
                </div>
                <div className="space-y-3">
                  <label 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-base)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    Sitio web
                  </label>
                  <input
                    type="url"
                    defaultValue="www.vallecentral.cl"
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-[12px] focus:outline-none focus:border-gray-300 transition-colors"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-base)',
                      fontWeight: 'var(--font-weight-regular)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  />
                </div>
                <div className="space-y-3">
                  <label 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-base)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    Dirección
                  </label>
                  <input
                    type="text"
                    defaultValue="Av. Principal 1234, Santiago"
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-[12px] focus:outline-none focus:border-gray-300 transition-colors"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-base)',
                      fontWeight: 'var(--font-weight-regular)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <div className="space-y-6">
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
              Preferencias
            </h2>

            {/* Notificaciones */}
            <div className="space-y-4">
              <h3 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                Notificaciones por email
              </h3>
              <div className="space-y-3">
                {[
                  { id: 'new-inquiry', label: 'Nuevas consultas sobre mis publicaciones', checked: true },
                  { id: 'publication-status', label: 'Cambios de estado en mis publicaciones', checked: true },
                  { id: 'team-activity', label: 'Actividad del equipo', checked: false },
                  { id: 'marketing', label: 'Novedades y actualizaciones de la plataforma', checked: true }
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 p-4 bg-gray-50 border-2 border-gray-200 rounded-[12px] hover:border-gray-300 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked={item.checked}
                      className="w-5 h-5 accent-[#111] cursor-pointer"
                    />
                    <span 
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-base)',
                        fontWeight: 'var(--font-weight-regular)',
                        color: '#0A0A0A',
                        lineHeight: 'var(--line-height-body)'
                      }}
                    >
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Idioma y zona horaria */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t-2 border-gray-200">
              <div className="space-y-3">
                <label 
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-base)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  Idioma
                </label>
                <select
                  defaultValue="es-CL"
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-[12px] focus:outline-none focus:border-gray-300 transition-colors"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-base)',
                    fontWeight: 'var(--font-weight-regular)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  <option value="es-CL">Español (Chile)</option>
                  <option value="es-ES">Español (España)</option>
                  <option value="en-US">English (US)</option>
                </select>
              </div>
              <div className="space-y-3">
                <label 
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-base)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  Zona horaria
                </label>
                <select
                  defaultValue="America/Santiago"
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-[12px] focus:outline-none focus:border-gray-300 transition-colors"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-base)',
                    fontWeight: 'var(--font-weight-regular)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  <option value="America/Santiago">Santiago (GMT-3)</option>
                  <option value="America/Buenos_Aires">Buenos Aires (GMT-3)</option>
                  <option value="America/Sao_Paulo">São Paulo (GMT-3)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 
                style={{ 
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h3)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-heading)'
                }}
              >
                Usuarios y permisos
              </h2>
              <button
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-medium)',
                  lineHeight: 'var(--line-height-body)',
                  backgroundColor: '#006B4E'
                }}
                className="text-white py-3 px-6 rounded-[200px] transition-colors"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#01533E'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
              >
                Invitar usuario
              </button>
            </div>

            <div className="space-y-3">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 border-2 border-gray-200 rounded-[16px]">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-gray-600" />
                    </div>
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
                        {user.nombre}
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
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span 
                        className={`px-3 py-1.5 rounded-[100px] ${
                          user.rol === 'Admin' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-emerald-100 text-emerald-900'
                        }`}
                        style={{ 
                          fontFamily: 'var(--font-body)',
                          fontSize: '14px',
                          fontWeight: 'var(--font-weight-medium)',
                          lineHeight: 'var(--line-height-body)'
                        }}
                      >
                        {user.rol}
                      </span>
                      <div 
                        className="mt-1"
                        style={{ 
                          fontFamily: 'var(--font-body)',
                          fontSize: '12px',
                          fontWeight: 'var(--font-weight-regular)',
                          color: '#6B6B6B',
                          lineHeight: 'var(--line-height-body)'
                        }}
                      >
                        {user.ultimoAcceso}
                      </div>
                    </div>
                    <button
                      className="px-4 py-2 text-[#0A0A0A] hover:bg-gray-200 rounded-[8px] transition-colors"
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        fontWeight: 'var(--font-weight-medium)',
                        lineHeight: 'var(--line-height-body)'
                      }}
                    >
                      Editar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-[16px] p-4">
              <p 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                <strong>Admin:</strong> Acceso completo a todas las funciones. <strong>Broker:</strong> Puede gestionar publicaciones y consultas asignadas.
              </p>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="space-y-6">
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
              Seguridad
            </h2>

            {/* Cambiar contraseña */}
            <div className="space-y-4 pb-6 border-b-2 border-gray-200">
              <h3 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                Cambiar contraseña
              </h3>
              
              <div className="space-y-3 max-w-md">
                <label 
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-base)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  Contraseña actual
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="w-full px-4 py-3 pr-12 bg-white border-2 border-gray-200 rounded-[12px] focus:outline-none focus:border-gray-300 transition-colors"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-base)',
                      fontWeight: 'var(--font-weight-regular)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-[8px] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
                  </button>
                </div>
              </div>

              <div className="space-y-3 max-w-md">
                <label 
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-base)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  Nueva contraseña
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    className="w-full px-4 py-3 pr-12 bg-white border-2 border-gray-200 rounded-[12px] focus:outline-none focus:border-gray-300 transition-colors"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-base)',
                      fontWeight: 'var(--font-weight-regular)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-[8px] transition-colors"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
                  </button>
                </div>
              </div>

              <button
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-medium)',
                  lineHeight: 'var(--line-height-body)',
                  backgroundColor: '#006B4E'
                }}
                className="text-white py-3 px-6 rounded-[200px] transition-colors"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#01533E'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
              >
                Actualizar contraseña
              </button>
            </div>

            {/* Sesiones activas */}
            <div className="space-y-4">
              <h3 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                Sesiones activas
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-50 border-2 border-gray-200 rounded-[16px]">
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
                      MacBook Pro • Chrome
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
                      Santiago, Chile • Activo ahora
                    </div>
                  </div>
                  <span 
                    className="px-3 py-1.5 bg-green-100 text-green-800 rounded-[100px]"
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 'var(--font-weight-medium)',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    Este dispositivo
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 border-2 border-gray-200 rounded-[16px]">
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
                      iPhone 13 • Safari
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
                      Santiago, Chile • Hace 2 horas
                    </div>
                  </div>
                  <button
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-[8px] transition-colors"
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 'var(--font-weight-medium)',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    <LogOut className="w-4 h-4" />
                    Cerrar sesión
                  </button>
                </div>
              </div>

              <button
                className="w-full bg-white hover:bg-gray-50 border-2 border-red-200 hover:border-red-300 text-red-600 py-3 px-6 rounded-[200px] transition-colors"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-medium)',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                Cerrar todas las sesiones excepto esta
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Fixed CTA */}
      <div className="flex items-center justify-end gap-3 sticky bottom-6">
        <button
          className="bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-black py-3 px-6 rounded-[200px] transition-colors"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-base)',
            fontWeight: 'var(--font-weight-medium)',
            lineHeight: 'var(--line-height-body)',
            color: '#0A0A0A'
          }}
        >
          Cancelar
        </button>
        <button
          onClick={handleSave}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-base)',
            fontWeight: 'var(--font-weight-medium)',
            lineHeight: 'var(--line-height-body)',
            backgroundColor: '#006B4E'
          }}
          className="text-white py-3 px-8 rounded-[200px] transition-colors shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#01533E'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
        >
          Guardar cambios
        </button>
      </div>
    </main>
  );
}