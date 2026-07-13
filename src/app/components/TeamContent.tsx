import React from 'react';
import { User, Eye, Edit, AlertCircle, X, UserPlus, Check, Mail, Send, UserRoundPlus } from 'lucide-react';

const ROLES_CONFIG: Record<string, { color: string; bg: string; permisos: { label: string; ok: boolean }[] }> = {
  Admin: {
    color: '#7C3AED', bg: '#F5F3FF',
    permisos: [
      { label: 'Dashboard y analítica', ok: true },
      { label: 'Gestión de publicaciones', ok: true },
      { label: 'Verificación de usuarios', ok: true },
      { label: 'Gestión del equipo', ok: true },
      { label: 'Recursos & Blog', ok: true },
      { label: 'Configuración de plataforma', ok: true },
    ],
  },
  Broker: {
    color: '#006B4E', bg: '#ECFDF5',
    permisos: [
      { label: 'Dashboard personal', ok: true },
      { label: 'Leads y consultas asignadas', ok: true },
      { label: 'Calendario y citas', ok: true },
      { label: 'Analítica de plataforma', ok: false },
      { label: 'Gestión del equipo', ok: false },
      { label: 'Configuración de plataforma', ok: false },
    ],
  },
  Marketing: {
    color: '#1D4ED8', bg: '#EFF6FF',
    permisos: [
      { label: 'Dashboard y analítica', ok: true },
      { label: 'Recursos & Blog', ok: true },
      { label: 'Banners y mensajes', ok: true },
      { label: 'Verificación de usuarios', ok: false },
      { label: 'Gestión del equipo', ok: false },
      { label: 'Configuración de plataforma', ok: false },
    ],
  },
  Operaciones: {
    color: '#D97706', bg: '#FEF3C7',
    permisos: [
      { label: 'Verificación de usuarios', ok: true },
      { label: 'Regiones y comunas', ok: true },
      { label: 'Configuración básica', ok: true },
      { label: 'Analítica avanzada', ok: false },
      { label: 'Gestión del equipo', ok: false },
      { label: 'Recursos & Blog', ok: false },
    ],
  },
};

export function TeamContent({ autoOpenInvite }: { autoOpenInvite?: boolean }) {
  const [selectedBroker, setSelectedBroker] = React.useState<number | null>(null);
  const [showAddModal, setShowAddModal] = React.useState(false);

  React.useEffect(() => {
    if (autoOpenInvite) setShowAddModal(true);
  }, []);
  const [activeMenu, setActiveMenu] = React.useState<number | null>(null);
  const [inviteEmail, setInviteEmail] = React.useState('');
  const [inviteName, setInviteName] = React.useState('');
  const [inviteRol, setInviteRol] = React.useState<'Admin' | 'Marketing' | 'Operaciones'>('Admin');
  const [inviteSent, setInviteSent] = React.useState(false);

  const handleSendInvite = () => {
    if (!inviteEmail.trim() || !inviteName.trim()) return;
    setInviteSent(true);
  };
  const handleCloseInviteModal = () => {
    setShowAddModal(false);
    setInviteSent(false);
    setInviteEmail('');
    setInviteName('');
    setInviteRol('Admin');
  };

  const brokers = [
    {
      id: 1,
      nombre: 'María Fernanda González',
      email: 'mfernanda@inmobiliaria.cl',
      rol: 'Admin',
      estado: 'Activo',
      parcelasAsignadas: 12,
      consultasGestionadas: 48,
      avatar: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcwMDYxMjE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      fechaIngreso: 'Mar 2024',
      telefono: '+56 9 8765 4321',
      tasaRespuesta: '95%',
      tiempoPromedioRespuesta: '2.3 hrs',
      ventasCerradas: 3
    },
    {
      id: 2,
      nombre: 'Carlos Andrés Muñoz',
      email: 'cmunoz@inmobiliaria.cl',
      rol: 'Broker',
      estado: 'Activo',
      parcelasAsignadas: 8,
      consultasGestionadas: 32,
      avatar: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMG1hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MDAzNzY1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      fechaIngreso: 'Ene 2025',
      telefono: '+56 9 7654 3210',
      tasaRespuesta: '88%',
      tiempoPromedioRespuesta: '3.1 hrs',
      ventasCerradas: 2
    },
    {
      id: 3,
      nombre: 'Javiera Paz Rojas',
      email: 'jrojas@inmobiliaria.cl',
      rol: 'Broker',
      estado: 'Activo',
      parcelasAsignadas: 10,
      consultasGestionadas: 41,
      avatar: 'https://images.unsplash.com/photo-1763478958776-ebd04b6459ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjByZWFsdG9yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcwMDI1OTgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      fechaIngreso: 'Oct 2024',
      telefono: '+56 9 6543 2109',
      tasaRespuesta: '92%',
      tiempoPromedioRespuesta: '2.8 hrs',
      ventasCerradas: 2
    },
    {
      id: 4,
      nombre: 'Roberto Silva Campos',
      email: 'rsilva@inmobiliaria.cl',
      rol: 'Broker',
      estado: 'Inactivo',
      parcelasAsignadas: 0,
      consultasGestionadas: 15,
      avatar: 'https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc3MDA1MjQyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      fechaIngreso: 'Jun 2024',
      telefono: '+56 9 5432 1098',
      tasaRespuesta: '78%',
      tiempoPromedioRespuesta: '4.5 hrs',
      ventasCerradas: 1
    },
  ];

  const broker = selectedBroker !== null ? brokers.find(b => b.id === selectedBroker) : null;

  return (
    <main className="px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
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
            Equipo CTP
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
            Gestiona los miembros de tu equipo
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 transition-colors"
          style={{
            backgroundColor: '#006B4E',
            color: '#FFFFFF',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-sm)',
            fontWeight: 600,
            borderRadius: '200px',
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#01533E'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#006B4E'; }}
        >
          <UserRoundPlus className="w-4 h-4" />
          Nueva invitación
        </button>
      </div>

      {/* Brokers Table */}
      <section className="bg-white border-2 border-gray-200 rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left" style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}>
                  Broker
                </th>
                <th className="px-6 py-4 text-left" style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}>
                  Rol
                </th>
                <th className="px-6 py-4 text-left" style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}>
                  Estado
                </th>
                <th className="px-6 py-4 text-center" style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}>
                  Parcelas asignadas
                </th>
                <th className="px-6 py-4 text-center" style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}>
                  Consultas gestionadas
                </th>
                <th className="px-6 py-4 text-right" style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-gray-200">
              {brokers.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
                        <img 
                          src={b.avatar} 
                          alt={b.nombre}
                          className="w-full h-full object-cover"
                        />
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
                          {b.nombre}
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
                          {b.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span 
                      className={`px-3 py-1.5 rounded-[100px] ${
                        b.rol === 'Admin' 
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
                      {b.rol}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span 
                      className={`px-3 py-1.5 rounded-[100px] ${
                        b.estado === 'Activo' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        fontWeight: 'var(--font-weight-medium)',
                        lineHeight: 'var(--line-height-body)'
                      }}
                    >
                      {b.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span 
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-base)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#0A0A0A',
                        lineHeight: 'var(--line-height-body)'
                      }}
                    >
                      {b.parcelasAsignadas}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span 
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-base)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#0A0A0A',
                        lineHeight: 'var(--line-height-body)'
                      }}
                    >
                      {b.consultasGestionadas}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedBroker(b.id)}
                        className="p-2 hover:bg-gray-100 rounded-[8px] transition-colors"
                        style={{ 
                          fontFamily: 'var(--font-body)',
                          fontSize: '14px',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#0A0A0A',
                          lineHeight: 'var(--line-height-body)'
                        }}
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <div className="relative">
                        <button
                          onClick={() => setActiveMenu(activeMenu === b.id ? null : b.id)}
                          className="p-2 hover:bg-gray-100 rounded-[8px] transition-colors"
                        >
                          <span className="text-lg" style={{ color: '#0A0A0A' }}>⋮</span>
                        </button>
                        {activeMenu === b.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-gray-200 rounded-[16px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden z-10">
                            <button
                              onClick={() => {
                                setSelectedBroker(b.id);
                                setActiveMenu(null);
                              }}
                              className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-2"
                              style={{ 
                                fontFamily: 'var(--font-body)',
                                fontSize: '14px',
                                fontWeight: 'var(--font-weight-regular)',
                                color: '#0A0A0A',
                                lineHeight: 'var(--line-height-body)'
                              }}
                            >
                              <User className="w-4 h-4" />
                              Ver perfil
                            </button>
                            <button
                              className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-2"
                              style={{ 
                                fontFamily: 'var(--font-body)',
                                fontSize: '14px',
                                fontWeight: 'var(--font-weight-regular)',
                                color: '#0A0A0A',
                                lineHeight: 'var(--line-height-body)'
                              }}
                            >
                              <Edit className="w-4 h-4" />
                              Editar rol
                            </button>
                            <button
                              className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-2 border-t-2 border-gray-200"
                              style={{ 
                                fontFamily: 'var(--font-body)',
                                fontSize: '14px',
                                fontWeight: 'var(--font-weight-regular)',
                                color: '#DC2626',
                                lineHeight: 'var(--line-height-body)'
                              }}
                            >
                              <AlertCircle className="w-4 h-4" />
                              {b.estado === 'Activo' ? 'Desactivar' : 'Activar'}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Broker Detail Modal */}
      {broker && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-6" style={{ backgroundColor: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(4px)' }}>
          <div className="bg-white rounded-[24px] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-8 border-b-2 border-gray-200">
              <h2 
                style={{ 
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h3)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-heading)'
                }}
              >
                Perfil del broker
              </h2>
              <button
                onClick={() => setSelectedBroker(null)}
                className="p-2 hover:bg-gray-100 rounded-[8px] transition-colors"
              >
                <X className="w-6 h-6" style={{ color: '#0A0A0A' }} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-8">
              {/* Basic Info */}
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
                  <img 
                    src={broker.avatar} 
                    alt={broker.nombre}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-h3)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-heading)'
                    }}
                  >
                    {broker.nombre}
                  </h3>
                  <p 
                    className="mt-1"
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-base)',
                      fontWeight: 'var(--font-weight-regular)',
                      color: '#6B6B6B',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    {broker.email}
                  </p>
                  <p 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-base)',
                      fontWeight: 'var(--font-weight-regular)',
                      color: '#6B6B6B',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    {broker.telefono}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <span 
                      className={`px-3 py-1.5 rounded-[100px] ${
                        broker.rol === 'Admin' 
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
                      {broker.rol}
                    </span>
                    <span 
                      className={`px-3 py-1.5 rounded-[100px] ${
                        broker.estado === 'Activo' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        fontWeight: 'var(--font-weight-medium)',
                        lineHeight: 'var(--line-height-body)'
                      }}
                    >
                      {broker.estado}
                    </span>
                  </div>
                </div>
              </div>

              {/* KPIs */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 border-2 border-gray-200 rounded-[16px] p-4">
                  <div 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: '24px',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      lineHeight: '1.2'
                    }}
                  >
                    {broker.parcelasAsignadas}
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
                    Parcelas asignadas
                  </div>
                </div>
                <div className="bg-gray-50 border-2 border-gray-200 rounded-[16px] p-4">
                  <div 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: '24px',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      lineHeight: '1.2'
                    }}
                  >
                    {broker.consultasGestionadas}
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
                    Consultas gestionadas
                  </div>
                </div>
                <div className="bg-gray-50 border-2 border-gray-200 rounded-[16px] p-4">
                  <div 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: '24px',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      lineHeight: '1.2'
                    }}
                  >
                    {broker.ventasCerradas}
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
                    Ventas cerradas
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div>
                <h4 
                  className="mb-4"
                  style={{ 
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--font-size-body-base)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-heading)'
                  }}
                >
                  Métricas de rendimiento
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-gray-50 border-2 border-gray-200 rounded-[12px]">
                    <span 
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-base)',
                        fontWeight: 'var(--font-weight-regular)',
                        color: '#0A0A0A',
                        lineHeight: 'var(--line-height-body)'
                      }}
                    >
                      Tasa de respuesta
                    </span>
                    <span 
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-base)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#0A0A0A',
                        lineHeight: 'var(--line-height-body)'
                      }}
                    >
                      {broker.tasaRespuesta}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 border-2 border-gray-200 rounded-[12px]">
                    <span 
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-base)',
                        fontWeight: 'var(--font-weight-regular)',
                        color: '#0A0A0A',
                        lineHeight: 'var(--line-height-body)'
                      }}
                    >
                      Tiempo promedio de respuesta
                    </span>
                    <span 
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-base)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#0A0A0A',
                        lineHeight: 'var(--line-height-body)'
                      }}
                    >
                      {broker.tiempoPromedioRespuesta}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 border-2 border-gray-200 rounded-[12px]">
                    <span 
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-base)',
                        fontWeight: 'var(--font-weight-regular)',
                        color: '#0A0A0A',
                        lineHeight: 'var(--line-height-body)'
                      }}
                    >
                      Fecha de ingreso
                    </span>
                    <span 
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-base)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#0A0A0A',
                        lineHeight: 'var(--line-height-body)'
                      }}
                    >
                      {broker.fechaIngreso}
                    </span>
                  </div>
                </div>
              </div>

              {/* Parcelas Asignadas */}
              {broker.parcelasAsignadas > 0 && (
                <div>
                  <h4 
                    className="mb-4"
                    style={{ 
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-body-base)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-heading)'
                    }}
                  >
                    Parcelas asignadas ({broker.parcelasAsignadas})
                  </h4>
                  <div className="space-y-2">
                    {['Parcela Vista al Valle', 'Parcela Los Robles', 'Parcela El Bosque'].slice(0, Math.min(3, broker.parcelasAsignadas)).map((parcela, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center justify-between p-3 bg-gray-50 border-2 border-gray-200 rounded-[12px] hover:border-gray-300 transition-colors"
                      >
                        <span 
                          style={{ 
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-base)',
                            fontWeight: 'var(--font-weight-regular)',
                            color: '#0A0A0A',
                            lineHeight: 'var(--line-height-body)'
                          }}
                        >
                          {parcela}
                        </span>
                        <span 
                          className="bg-green-100 text-green-800 px-3 py-1 rounded-[100px]"
                          style={{ 
                            fontFamily: 'var(--font-body)',
                            fontSize: '12px',
                            fontWeight: 'var(--font-weight-medium)',
                            lineHeight: 'var(--line-height-body)'
                          }}
                        >
                          Activa
                        </span>
                      </div>
                    ))}
                    {broker.parcelasAsignadas > 3 && (
                      <div 
                        className="text-center py-2"
                        style={{ 
                          fontFamily: 'var(--font-body)',
                          fontSize: '14px',
                          fontWeight: 'var(--font-weight-regular)',
                          color: '#6B6B6B',
                          lineHeight: 'var(--line-height-body)'
                        }}
                      >
                        +{broker.parcelasAsignadas - 3} parcelas más
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-8 border-t-2 border-gray-200">
              <button
                onClick={() => setSelectedBroker(null)}
                className="bg-white hover:bg-gray-50 text-black py-3 px-6 border-2 border-gray-200 hover:border-gray-300 rounded-[200px] transition-colors"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-medium)',
                  lineHeight: 'var(--line-height-body)',
                  color: '#0A0A0A'
                }}
              >
                Cerrar
              </button>
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
                Editar broker
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Nueva Invitación Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-6" style={{ backgroundColor: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(4px)' }}>
          <div className="bg-white rounded-[24px] max-w-lg w-full shadow-[0_8px_30px_rgba(0,0,0,0.2)] flex flex-col" style={{ maxHeight: '90vh' }}>
            {inviteSent ? (
              <div className="p-10 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#ECFDF5' }}>
                  <Check className="w-8 h-8" style={{ color: '#006B4E' }} />
                </div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h3)', fontWeight: 700, color: '#0A0A0A', marginTop: '8px' }}>
                  Invitación enviada
                </h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', color: '#6B6B6B', lineHeight: '1.6', maxWidth: '360px' }}>
                  Le enviamos una invitación a{' '}
                  <strong style={{ color: '#0A0A0A' }}>{inviteEmail}</strong>{' '}
                  para unirse como{' '}
                  <strong style={{ color: ROLES_CONFIG[inviteRol].color }}>{inviteRol}</strong>.
                </p>
                <div className="flex gap-3 pt-4 w-full">
                  <button
                    onClick={() => { setInviteSent(false); setInviteEmail(''); setInviteName(''); setInviteRol('Admin'); }}
                    className="flex-1 py-3 px-6 border-2 border-gray-200 hover:border-gray-300 rounded-[200px] transition-colors"
                    style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', fontWeight: 600, color: '#0A0A0A' }}
                  >
                    Nueva invitación
                  </button>
                  <button
                    onClick={handleCloseInviteModal}
                    className="flex-1 text-white py-3 px-6 rounded-[200px] transition-colors"
                    style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', fontWeight: 600, backgroundColor: '#006B4E' }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#01533E'; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#006B4E'; }}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-gray-100 flex-shrink-0">
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h3)', fontWeight: 700, color: '#0A0A0A', lineHeight: 'var(--line-height-heading)' }}>
                      Nueva invitación
                    </h2>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#6B6B6B', marginTop: '4px' }}>
                      Invita a un nuevo miembro a unirse a tu equipo
                    </p>
                  </div>
                  <button onClick={handleCloseInviteModal} className="p-2 hover:bg-gray-100 rounded-[8px] transition-colors">
                    <X className="w-5 h-5" style={{ color: '#6B6B6B' }} />
                  </button>
                </div>

                {/* Form body */}
                <div className="px-8 py-6 space-y-5 overflow-y-auto flex-1">
                  {/* Email */}
                  <div>
                    <label style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: '#0A0A0A', display: 'block', marginBottom: '6px' }}>
                      Correo electrónico <span style={{ color: '#DC2626' }}>*</span>
                    </label>
                    <input
                      type="email"
                      value={inviteEmail}
                      onChange={e => setInviteEmail(e.target.value)}
                      placeholder="nombre@empresa.cl"
                      className="w-full border-2 border-gray-200 rounded-[12px] px-4 py-3 outline-none transition-colors focus:border-[#006B4E]"
                      style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', color: '#0A0A0A' }}
                    />
                  </div>

                  {/* Name (optional) */}
                  <div>
                    <label style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: '#0A0A0A', display: 'block', marginBottom: '6px' }}>
                      Nombre <span style={{ color: '#DC2626' }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={inviteName}
                      onChange={e => setInviteName(e.target.value)}
                      placeholder="Ej. Ana González"
                      className="w-full border-2 border-gray-200 rounded-[12px] px-4 py-3 outline-none transition-colors focus:border-[#006B4E]"
                      style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', color: '#0A0A0A' }}
                    />
                  </div>

                  {/* Role selector */}
                  <div>
                    <label style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: '#0A0A0A', display: 'block', marginBottom: '8px' }}>
                      Rol en la plataforma
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Admin', 'Marketing', 'Operaciones'] as const).map(rol => {
                        const cfg = ROLES_CONFIG[rol];
                        const selected = inviteRol === rol;
                        return (
                          <button
                            key={rol}
                            onClick={() => setInviteRol(rol)}
                            className="flex items-center justify-center gap-1.5 py-3 px-2 rounded-[12px] border-2 transition-all"
                            style={{ borderColor: selected ? cfg.color : '#E5E7EB', backgroundColor: selected ? cfg.bg : '#FAFAFA' }}
                          >
                            {selected && <Check className="w-3 h-3 flex-shrink-0" style={{ color: cfg.color }} />}
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: selected ? cfg.color : '#374151' }}>
                              {rol}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Permissions preview */}
                  <div className="rounded-[12px] p-4 border border-gray-100" style={{ backgroundColor: '#F9FAFB' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '10px' }}>
                      Permisos de {inviteRol}
                    </p>
                    <div className="grid grid-cols-1 gap-1.5">
                      {ROLES_CONFIG[inviteRol].permisos.map(p => (
                        <div key={p.label} className="flex items-center gap-2.5">
                          <div
                            className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: p.ok ? '#ECFDF5' : '#FEF2F2' }}
                          >
                            {p.ok
                              ? <Check className="w-2.5 h-2.5" style={{ color: '#006B4E' }} />
                              : <X className="w-2.5 h-2.5" style={{ color: '#DC2626' }} />
                            }
                          </div>
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: p.ok ? '#0A0A0A' : '#9CA3AF', fontWeight: p.ok ? 500 : 400 }}>
                            {p.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 px-8 py-6 border-t border-gray-100 flex-shrink-0">
                  <button
                    onClick={handleCloseInviteModal}
                    className="py-3 px-6 border-2 border-gray-200 hover:border-gray-300 rounded-[200px] transition-colors"
                    style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', fontWeight: 600, color: '#0A0A0A' }}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSendInvite}
                    disabled={!inviteEmail.trim() || !inviteName.trim()}
                    className="flex items-center gap-2 text-white py-3 px-6 rounded-[200px] transition-all"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-base)',
                      fontWeight: 600,
                      backgroundColor: inviteEmail.trim() && inviteName.trim() ? '#006B4E' : '#D1D5DB',
                      cursor: inviteEmail.trim() && inviteName.trim() ? 'pointer' : 'not-allowed',
                    }}
                    onMouseEnter={e => { if (inviteEmail.trim() && inviteName.trim()) e.currentTarget.style.backgroundColor = '#01533E'; }}
                    onMouseLeave={e => { if (inviteEmail.trim() && inviteName.trim()) e.currentTarget.style.backgroundColor = '#006B4E'; }}
                  >
                    <Send className="w-4 h-4" />
                    Enviar invitación
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
