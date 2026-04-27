import React, { useState } from 'react';
import { Search, Plus, Trash2, Shield, Mail, X, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface EmailAutorizado {
  id: number;
  email: string;
  nombre?: string;
  agregadoPor: string;
  fechaAgregado: string;
}

const EMAILS_MOCK: EmailAutorizado[] = [
  { id: 1, email: 'juan.perez@gmail.com', nombre: 'Juan Pérez', agregadoPor: 'Admin CTP', fechaAgregado: '12 Abr, 2025' },
  { id: 2, email: 'maria.gonzalez@empresa.cl', nombre: 'María González', agregadoPor: 'Admin CTP', fechaAgregado: '10 Abr, 2025' },
  { id: 3, email: 'carlos.rojas@outlook.com', agregadoPor: 'Admin CTP', fechaAgregado: '08 Abr, 2025' },
  { id: 4, email: 'piloto@drimo.com', nombre: 'Equipo Drimo', agregadoPor: 'Admin CTP', fechaAgregado: '01 Abr, 2025' },
  { id: 5, email: 'ana.silva@gmail.com', nombre: 'Ana Silva', agregadoPor: 'Admin CTP', fechaAgregado: '28 Mar, 2025' },
  { id: 6, email: 'roberto.morales@empresa.cl', agregadoPor: 'Admin CTP', fechaAgregado: '25 Mar, 2025' },
];

const validarEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export function WhitelistAdminView() {
  const [emails, setEmails] = useState<EmailAutorizado[]>(EMAILS_MOCK);
  const [busqueda, setBusqueda] = useState('');
  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState<EmailAutorizado | null>(null);
  const [nuevoEmail, setNuevoEmail] = useState('');
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [emailError, setEmailError] = useState('');
  const [agregadoExito, setAgregadoExito] = useState(false);

  const emailsFiltrados = emails.filter(e =>
    e.email.toLowerCase().includes(busqueda.toLowerCase()) ||
    (e.nombre ?? '').toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleAgregar = () => {
    if (!validarEmail(nuevoEmail)) {
      setEmailError('Ingresá un email válido');
      return;
    }
    if (emails.some(e => e.email.toLowerCase() === nuevoEmail.toLowerCase())) {
      setEmailError('Este correo ya está en la lista');
      return;
    }
    const nuevo: EmailAutorizado = {
      id: Date.now(),
      email: nuevoEmail.toLowerCase().trim(),
      nombre: nuevoNombre.trim() || undefined,
      agregadoPor: 'Admin CTP',
      fechaAgregado: new Date().toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' }),
    };
    setEmails(prev => [nuevo, ...prev]);
    setAgregadoExito(true);
    setTimeout(() => {
      setAgregadoExito(false);
      setModalAgregar(false);
      setNuevoEmail('');
      setNuevoNombre('');
      setEmailError('');
    }, 1200);
  };

  const handleEliminar = (id: number) => {
    setEmails(prev => prev.filter(e => e.id !== id));
    setModalEliminar(null);
  };

  const cerrarModalAgregar = () => {
    setModalAgregar(false);
    setNuevoEmail('');
    setNuevoNombre('');
    setEmailError('');
    setAgregadoExito(false);
  };

  const cardStyle = { backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' };

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Correos autorizados', value: emails.length, icon: Shield, color: '#006B4E', bg: '#EBFEF5' },
          { label: 'Agregados este mes', value: emails.filter(e => e.fechaAgregado.includes('Abr')).length, icon: Clock, color: '#4F46E5', bg: '#EEF2FF' },
          { label: 'Sin nombre asignado', value: emails.filter(e => !e.nombre).length, icon: Mail, color: '#D97706', bg: '#FEF3C7' },
        ].map(stat => (
          <div key={stat.label} className="rounded-2xl p-5 flex items-center gap-4" style={cardStyle}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: stat.bg }}>
              <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#737373', marginBottom: '2px' }}>{stat.label}</p>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 600, color: '#0A0A0A', lineHeight: 1 }}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabla */}
      <section className="rounded-2xl" style={cardStyle}>
        {/* Toolbar */}
        <div className="flex items-center gap-3 px-6 py-4 border-b" style={{ borderColor: '#E5E5E5' }}>
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9CA3AF' }} />
            <input
              type="text"
              placeholder="Buscar por email o nombre..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg text-sm"
              style={{ border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA', color: '#0A0A0A', outline: 'none', fontFamily: 'var(--font-body)' }}
            />
          </div>
          <button
            onClick={() => setModalAgregar(true)}
            className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all"
            style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#01533E'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#006B4E'}
          >
            <Plus className="w-4 h-4" /> Agregar correo
          </button>
        </div>

        {/* Lista */}
        {emailsFiltrados.length === 0 ? (
          <div className="py-16 text-center">
            <Shield className="w-10 h-10 mx-auto mb-3" style={{ color: '#D1D5DB' }} />
            <p style={{ fontFamily: 'var(--font-body)', color: '#9CA3AF', fontSize: 'var(--font-size-body-sm)' }}>
              {busqueda ? 'No se encontraron correos que coincidan' : 'No hay correos autorizados aún'}
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                {['Correo electrónico', 'Nombre', 'Agregado por', 'Fecha', ''].map(h => (
                  <th key={h} className="px-6 py-3 text-left" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {emailsFiltrados.map((item, i) => (
                <tr
                  key={item.id}
                  style={{ borderBottom: i < emailsFiltrados.length - 1 ? '1px solid #F9FAFB' : 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#FAFAFA')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#EBFEF5' }}>
                        <Mail className="w-3.5 h-3.5" style={{ color: '#006B4E' }} />
                      </div>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#111827' }}>{item.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: item.nombre ? '#374151' : '#9CA3AF' }}>
                      {item.nombre ?? '—'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#6B7280' }}>{item.agregadoPor}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#6B7280' }}>{item.fechaAgregado}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setModalEliminar(item)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                      style={{ backgroundColor: '#FEF2F2', color: '#DC2626', fontFamily: 'var(--font-body)' }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FCA5A5'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FEF2F2'}
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Modal agregar */}
      {modalAgregar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={cerrarModalAgregar}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: '#E5E5E5' }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#EBFEF5' }}>
                  <Shield className="w-4 h-4" style={{ color: '#006B4E' }} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: 'var(--font-size-h3)', color: '#0A0A0A' }}>Agregar correo</h3>
              </div>
              <button onClick={cerrarModalAgregar} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-4 h-4" style={{ color: '#6B7280' }} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {agregadoExito ? (
                <div className="py-8 text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#D1FAE5' }}>
                    <CheckCircle className="w-7 h-7" style={{ color: '#059669' }} />
                  </div>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: 'var(--font-size-h3)', color: '#0A0A0A' }}>¡Correo agregado!</p>
                </div>
              ) : (
                <>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                      Correo electrónico <span style={{ color: '#DC2626' }}>*</span>
                    </label>
                    <input
                      type="email"
                      value={nuevoEmail}
                      onChange={e => { setNuevoEmail(e.target.value); setEmailError(''); }}
                      placeholder="ejemplo@correo.com"
                      className="w-full px-4 py-2.5 rounded-lg text-sm"
                      style={{ border: `1px solid ${emailError ? '#FCA5A5' : '#E5E5E5'}`, backgroundColor: emailError ? '#FEF2F2' : '#FAFAFA', color: '#0A0A0A', outline: 'none', fontFamily: 'var(--font-body)' }}
                    />
                    {emailError && (
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <AlertCircle className="w-3.5 h-3.5" style={{ color: '#DC2626' }} />
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#DC2626' }}>{emailError}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                      Nombre <span style={{ color: '#9CA3AF', fontWeight: 400 }}>(opcional)</span>
                    </label>
                    <input
                      type="text"
                      value={nuevoNombre}
                      onChange={e => setNuevoNombre(e.target.value)}
                      placeholder="Ej: María González"
                      className="w-full px-4 py-2.5 rounded-lg text-sm"
                      style={{ border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA', color: '#0A0A0A', outline: 'none', fontFamily: 'var(--font-body)' }}
                    />
                  </div>

                  <div className="rounded-xl p-3 flex items-start gap-2" style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E5E5' }}>
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#9CA3AF' }} />
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#6B7280', lineHeight: '1.5' }}>
                      Solo los correos en esta lista podrán registrarse o iniciar sesión en la plataforma.
                    </p>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button onClick={cerrarModalAgregar} className="flex-1 py-2.5 rounded-full text-sm font-medium transition-all" style={{ backgroundColor: '#F5F5F5', color: '#374151', fontFamily: 'var(--font-body)' }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#E5E5E5'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#F5F5F5'}>
                      Cancelar
                    </button>
                    <button onClick={handleAgregar} className="flex-1 py-2.5 rounded-full text-sm font-medium transition-all" style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)' }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#01533E'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#006B4E'}>
                      Agregar correo
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal eliminar */}
      {modalEliminar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={() => setModalEliminar(null)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FEE2E2' }}>
                  <Trash2 className="w-5 h-5" style={{ color: '#DC2626' }} />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: 'var(--font-size-h3)', color: '#0A0A0A', marginBottom: '4px' }}>Eliminar acceso</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#6B7280' }}>
                    ¿Estás seguro de que querés eliminar el acceso de <strong style={{ color: '#111827' }}>{modalEliminar.email}</strong>?
                  </p>
                </div>
              </div>

              <div className="rounded-xl p-3 mb-6 flex items-start gap-2" style={{ backgroundColor: '#FEF3C7', border: '1px solid #FDE68A' }}>
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#D97706' }} />
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#92400E', lineHeight: '1.5' }}>
                  Este usuario no podrá iniciar sesión ni registrarse hasta que su correo vuelva a ser agregado a la lista.
                </p>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setModalEliminar(null)} className="flex-1 py-2.5 rounded-full text-sm font-medium transition-all" style={{ backgroundColor: '#F5F5F5', color: '#374151', fontFamily: 'var(--font-body)' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#E5E5E5'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#F5F5F5'}>
                  Cancelar
                </button>
                <button onClick={() => handleEliminar(modalEliminar.id)} className="flex-1 py-2.5 rounded-full text-sm font-medium transition-all" style={{ backgroundColor: '#DC2626', color: '#FFFFFF', fontFamily: 'var(--font-body)' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#B91C1C'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#DC2626'}>
                  Sí, eliminar acceso
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
