import React from 'react';
import logo from 'figma:asset/a4719ce43ce52ee49df30a2a5c090c8a8b743667.png';
import entryBackground from 'figma:asset/e5096b94942ada0bf27ee8e61e30034a31f87b4c.png';

interface CompletarPerfilScreenProps {
  onNavigate: (screen: string) => void;
  email?: string;
}

const regiones = [
  'Región de Arica y Parinacota', 'Región de Tarapacá', 'Región de Antofagasta',
  'Región de Atacama', 'Región de Coquimbo', 'Región de Valparaíso',
  'Región Metropolitana', "Región del Libertador General Bernardo O'Higgins",
  'Región del Maule', 'Región de Ñuble', 'Región del Biobío',
  'Región de La Araucanía', 'Región de Los Ríos', 'Región de Los Lagos',
  'Región de Aysén', 'Región de Magallanes',
];

const phoneCodes = ['+56 (CL)', '+54 (AR)', '+55 (BR)', '+51 (PE)', '+57 (CO)', '+52 (MX)', '+34 (ES)', '+1 (US)'];

export function CompletarPerfilScreen({ onNavigate, email }: CompletarPerfilScreenProps) {
  const [nombre, setNombre] = React.useState('');
  const [phoneCode, setPhoneCode] = React.useState('+56 (CL)');
  const [telefono, setTelefono] = React.useState('');
  const [region, setRegion] = React.useState('');
  const [avatarPreview, setAvatarPreview] = React.useState<string | null>(null);
  const [nombreError, setNombreError] = React.useState(false);
  const avatarInputRef = React.useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return;
    const reader = new FileReader();
    reader.onload = ev => setAvatarPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!nombre.trim()) {
      setNombreError(true);
      return;
    }
    onNavigate('person-dashboard');
  };

  const getInitials = (name: string) =>
    name.trim() ? name.trim().split(' ').map(p => p[0]).join('').substring(0, 2).toUpperCase() : '?';

  return (
    <div className="min-h-screen relative">
      {/* Fondo */}
      <img
        src={entryBackground}
        alt="Fondo"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] z-0" />

      {/* Logo */}
      <header className="relative z-10 pt-8 pb-2">
        <div className="max-w-7xl mx-auto px-6">
          <img src={logo} alt="ComprarTuParcela" className="h-32 mx-auto mb-4" />
        </div>
      </header>

      {/* Card */}
      <div className="relative z-10 flex items-center justify-center px-6 py-4 pb-12">
        <div className="w-full max-w-md">
          <div className="bg-white/95 backdrop-blur-sm p-10 shadow-[0_20px_80px_rgba(0,0,0,0.25)] rounded-[24px] border border-white/20">

            {/* Título */}
            <div className="text-center space-y-2 mb-8">
              <h1 style={{ color: '#0A0A0A', fontFamily: 'Montserrat, sans-serif', fontSize: '28px', fontWeight: 600, lineHeight: '1.2' }}>
                Completa tu perfil
              </h1>
              <p style={{ color: '#6B7280', fontFamily: 'Montserrat, sans-serif', fontSize: '15px', fontWeight: 300, lineHeight: '1.5' }}>
                Solo unos datos más para comenzar
              </p>
            </div>

            <div className="space-y-5">
              {/* Foto de perfil */}
              <div className="flex flex-col items-center gap-3">
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  className="relative group"
                >
                  <div
                    className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center transition-opacity"
                    style={{ backgroundColor: '#006B4E' }}
                  >
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '24px', fontWeight: 600, color: '#FFFFFF' }}>
                        {getInitials(nombre)}
                      </span>
                    )}
                    <div className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
                      <svg viewBox="0 0 24 24" style={{ width: '20px', height: '20px', fill: 'none', stroke: '#FFFFFF', strokeWidth: 2 }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                </button>
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => avatarInputRef.current?.click()}
                    style={{ color: '#006B4E', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    {avatarPreview ? 'Cambiar foto' : 'Agregar foto de perfil'}
                  </button>
                  <p style={{ color: '#9CA3AF', fontFamily: 'Inter, sans-serif', fontSize: '11px', marginTop: '2px' }}>
                    JPG, PNG o WEBP · Máx. 5 MB · Opcional
                  </p>
                </div>
                <input ref={avatarInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleAvatarChange} />
              </div>

              {/* Nombre */}
              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif' }}>
                  Nombre completo <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ej: María García"
                  value={nombre}
                  onChange={e => { setNombre(e.target.value); if (e.target.value.trim()) setNombreError(false); }}
                  className="w-full bg-white border-2 py-3 px-4 rounded-lg text-black placeholder:text-gray-400 focus:outline-none transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', borderColor: nombreError ? '#EF4444' : '#D1D5DB' }}
                />
                {nombreError && (
                  <p style={{ color: '#EF4444', fontFamily: 'Inter, sans-serif', fontSize: '13px' }}>
                    El nombre es obligatorio.
                  </p>
                )}
              </div>

              {/* Teléfono */}
              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif' }}>
                  Teléfono
                </label>
                <div className="flex gap-2">
                  <select
                    value={phoneCode}
                    onChange={e => setPhoneCode(e.target.value)}
                    className="bg-white border-2 py-3 px-2 rounded-lg text-black focus:outline-none"
                    style={{ width: '120px', flexShrink: 0, fontFamily: 'Inter, sans-serif', fontSize: '14px', borderColor: '#D1D5DB' }}
                  >
                    {phoneCodes.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <input
                    type="tel"
                    placeholder="9 1234 5678"
                    value={telefono}
                    onChange={e => setTelefono(e.target.value)}
                    className="flex-1 bg-white border-2 py-3 px-4 rounded-lg text-black placeholder:text-gray-400 focus:outline-none transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', borderColor: '#D1D5DB' }}
                  />
                </div>
              </div>

              {/* Región */}
              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif' }}>
                  Región
                </label>
                <select
                  value={region}
                  onChange={e => setRegion(e.target.value)}
                  className="w-full bg-white border-2 py-3 px-4 rounded-lg text-black focus:outline-none transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', borderColor: '#D1D5DB', color: region ? '#0A0A0A' : '#9CA3AF' }}
                >
                  <option value="">Selecciona tu región</option>
                  {regiones.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              {/* Botón */}
              <button
                onClick={handleSubmit}
                className="w-full py-3.5 rounded-full font-semibold transition-all mt-2"
                style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'Inter, sans-serif', fontSize: '16px', border: 'none', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#01533E'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#006B4E'}
              >
                Comenzar
              </button>

              {/* Nota */}
              <p className="text-center" style={{ color: '#9CA3AF', fontFamily: 'Inter, sans-serif', fontSize: '13px', marginTop: '4px' }}>
                Puedes editar esta información más tarde desde tu perfil.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
