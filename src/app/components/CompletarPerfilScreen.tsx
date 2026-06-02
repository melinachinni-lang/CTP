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

const inputStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  borderColor: '#D1D5DB',
  width: '100%',
  boxSizing: 'border-box',
  appearance: 'none',
  WebkitAppearance: 'none',
};

export function CompletarPerfilScreen({ onNavigate, email }: CompletarPerfilScreenProps) {
  const [nombre, setNombre] = React.useState('');
  const [phoneCode, setPhoneCode] = React.useState('+56 (CL)');
  const [telefono, setTelefono] = React.useState('');
  const [region, setRegion] = React.useState('');
  const [nombreError, setNombreError] = React.useState(false);
  const [aceptaTyC, setAceptaTyC] = React.useState(false);
  const [newsletter, setNewsletter] = React.useState(false);

  const handleSubmit = () => {
    if (!nombre.trim()) {
      setNombreError(true);
      return;
    }
    onNavigate('person-dashboard');
  };

  return (
    <div className="min-h-screen relative">
      {/* Fondo */}
      <img src={entryBackground} alt="Fondo" className="absolute inset-0 w-full h-full object-cover z-0" />
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
                  className="bg-white border-2 py-3 px-4 rounded-lg text-black placeholder:text-gray-400 focus:outline-none transition-colors"
                  style={{ ...inputStyle, borderColor: nombreError ? '#EF4444' : '#D1D5DB' }}
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
                  <div className="relative flex-shrink-0" style={{ width: '130px' }}>
                    <select
                      value={phoneCode}
                      onChange={e => setPhoneCode(e.target.value)}
                      className="bg-white border-2 py-3 pl-3 pr-8 rounded-lg text-black focus:outline-none w-full"
                      style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', borderColor: '#D1D5DB', appearance: 'none', WebkitAppearance: 'none', boxSizing: 'border-box' }}
                    >
                      {phoneCodes.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" viewBox="0 0 24 24" style={{ width: '14px', height: '14px', fill: 'none', stroke: '#6B7280', strokeWidth: 2 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    placeholder="9 1234 5678"
                    value={telefono}
                    onChange={e => setTelefono(e.target.value)}
                    className="flex-1 bg-white border-2 py-3 px-4 rounded-lg text-black placeholder:text-gray-400 focus:outline-none transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', borderColor: '#D1D5DB', minWidth: 0 }}
                  />
                </div>
              </div>

              {/* Región */}
              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif' }}>
                  Región
                </label>
                <div className="relative">
                  <select
                    value={region}
                    onChange={e => setRegion(e.target.value)}
                    className="bg-white border-2 py-3 pl-4 pr-10 rounded-lg focus:outline-none transition-colors"
                    style={{ ...inputStyle, color: region ? '#0A0A0A' : '#9CA3AF' }}
                  >
                    <option value="">Selecciona tu región</option>
                    {regiones.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                  <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" viewBox="0 0 24 24" style={{ width: '14px', height: '14px', fill: 'none', stroke: '#6B7280', strokeWidth: 2 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Checkboxes legales */}
              <div className="space-y-3 mt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={aceptaTyC}
                    onChange={e => setAceptaTyC(e.target.checked)}
                    className="mt-0.5 flex-shrink-0 w-4 h-4 accent-[#006B4E]"
                  />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#374151', lineHeight: '1.5' }}>
                    Acepto los{' '}
                    <a href="#" style={{ color: '#006B4E', textDecoration: 'underline' }}>términos y condiciones</a>
                    {' '}y la{' '}
                    <a href="#" style={{ color: '#006B4E', textDecoration: 'underline' }}>política de privacidad</a>
                    {' '}<span style={{ color: '#DC2626' }}>*</span>
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newsletter}
                    onChange={e => setNewsletter(e.target.checked)}
                    className="mt-0.5 flex-shrink-0 w-4 h-4 accent-[#006B4E]"
                  />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#374151', lineHeight: '1.5' }}>
                    Quiero recibir el boletín de novedades y oportunidades de inversión
                  </span>
                </label>
              </div>

              {/* Botón */}
              <button
                onClick={handleSubmit}
                disabled={!aceptaTyC}
                className="w-full py-3.5 rounded-full font-semibold transition-all mt-2"
                style={{ backgroundColor: aceptaTyC ? '#006B4E' : '#D1D5DB', color: '#FFFFFF', fontFamily: 'Inter, sans-serif', fontSize: '16px', border: 'none', cursor: aceptaTyC ? 'pointer' : 'not-allowed' }}
                onMouseEnter={e => { if (aceptaTyC) e.currentTarget.style.backgroundColor = '#01533E'; }}
                onMouseLeave={e => { if (aceptaTyC) e.currentTarget.style.backgroundColor = '#006B4E'; }}
              >
                Comenzar
              </button>

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
