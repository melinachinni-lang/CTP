import React from 'react';
import logo from 'figma:asset/a4719ce43ce52ee49df30a2a5c090c8a8b743667.png';

interface NotFoundPageProps {
  onNavigate: (screen: string) => void;
}

export function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header - Navbar en estado Visitante */}
      <header className="fixed top-8 left-0 right-0 z-50" style={{ backgroundColor: 'var(--hero-background)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Navigation - Left side */}
            <div className="flex items-center gap-0">
              <img 
                src={logo} 
                alt="CompraTuParcela" 
                className="h-14 cursor-pointer" 
                onClick={() => onNavigate('home')}
              />
              
              <nav className="flex items-center justify-center gap-0 whitespace-nowrap">
                <button 
                  onClick={() => onNavigate('parcelas')}
                  className="h-8 px-4 text-sm leading-[1.5] font-normal text-black hover:bg-[#efefef] hover:text-[#303030] rounded-[200px] transition-colors whitespace-nowrap flex items-center justify-center"
                >
                  Parcelas
                </button>
                <button onClick={() => onNavigate('inmobiliarias')} className="h-8 px-4 text-sm leading-[1.5] font-normal text-black hover:bg-[#efefef] hover:text-[#303030] rounded-[200px] transition-colors whitespace-nowrap flex items-center justify-center">
                  Inmobiliarias
                </button>
                <button onClick={() => onNavigate('como-funciona-loading')} className="h-8 px-4 text-sm leading-[1.5] font-normal text-black hover:bg-[#efefef] hover:text-[#303030] rounded-[200px] transition-colors whitespace-nowrap flex items-center justify-center">
                  Cómo funciona
                </button>
                <button onClick={() => onNavigate('recursos')} className="h-8 px-4 text-sm leading-[1.5] font-normal text-black hover:bg-[#efefef] hover:text-[#303030] rounded-[200px] transition-colors whitespace-nowrap flex items-center justify-center">
                  Recursos
                </button>
              </nav>
            </div>

            {/* Action Buttons - Right side */}
            <div className="flex items-center justify-end gap-3">
              <button className="h-8 bg-[#006B4E] hover:bg-[#0d3640] text-white px-[20px] text-sm leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center py-[0px]">
                Publicar propiedad
              </button>
              <button 
                onClick={() => onNavigate('entry')}
                className="h-8 bg-[#efefef] hover:bg-[#dedede] text-black hover:text-[#303030] px-[20px] text-sm leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center py-[0px]"
              >
                Ingresar
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Centered 404 Message */}
      <main className="flex-1 flex items-center justify-center pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Ilustración - Error 404 */}
          <div className="mb-6 flex justify-center">
            <div className="relative w-48 h-48">
              <svg 
                viewBox="0 0 200 200" 
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Círculo de fondo gris claro */}
                <circle cx="100" cy="100" r="90" fill="#F5F5F5" />
                
                {/* Ícono de mapa con pin perdido */}
                {/* Mapa base */}
                <rect x="50" y="70" width="100" height="70" rx="4" fill="none" stroke="#CDD8DE" strokeWidth="3" />
                <line x1="75" y1="70" x2="75" y2="140" stroke="#CDD8DE" strokeWidth="2" />
                <line x1="100" y1="70" x2="100" y2="140" stroke="#CDD8DE" strokeWidth="2" />
                <line x1="125" y1="70" x2="125" y2="140" stroke="#CDD8DE" strokeWidth="2" />
                <line x1="50" y1="95" x2="150" y2="95" stroke="#CDD8DE" strokeWidth="2" />
                <line x1="50" y1="115" x2="150" y2="115" stroke="#CDD8DE" strokeWidth="2" />
                
                {/* Pin de ubicación con X */}
                <path 
                  d="M 100 40 C 90 40, 82 48, 82 58 C 82 70, 100 85, 100 85 C 100 85, 118 70, 118 58 C 118 48, 110 40, 100 40 Z" 
                  fill="#647E3F" 
                  stroke="#647E3F" 
                  strokeWidth="2"
                />
                
                {/* X dentro del pin - color más oscuro */}
                <line x1="94" y1="52" x2="106" y2="64" stroke="#1E2116" strokeWidth="3" strokeLinecap="round" />
                <line x1="106" y1="52" x2="94" y2="64" stroke="#1E2116" strokeWidth="3" strokeLinecap="round" />
                
                {/* Signo de interrogación decorativo */}
                <circle cx="135" cy="50" r="12" fill="none" stroke="#006B4E" strokeWidth="2.5" />
                <text x="135" y="57" fontSize="18" fontWeight="bold" fill="#006B4E" textAnchor="middle">?</text>
              </svg>
            </div>
          </div>

          {/* Código 404 - Elemento visual principal */}
          <div 
            className="mb-4"
            style={{ 
              color: '#006B4E',
              fontFamily: 'var(--font-heading)',
              fontSize: '72px',
              fontWeight: 'var(--font-weight-semibold)',
              lineHeight: '1',
              letterSpacing: 'var(--letter-spacing-tighter)'
            }}
          >
            404
          </div>

          {/* Título */}
          <h1 
            className="mb-3"
            style={{ 
              color: '#0A0A0A',
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--font-size-h2)',
              fontWeight: 'var(--font-weight-medium)',
              lineHeight: 'var(--line-height-heading)',
              letterSpacing: 'var(--letter-spacing-tight)'
            }}
          >
            Página no encontrada
          </h1>

          {/* Texto descriptivo */}
          <p 
            className="mb-8"
            style={{ 
              color: '#737373',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-base)',
              fontWeight: 'var(--font-weight-regular)',
              lineHeight: 'var(--line-height-body)',
              letterSpacing: 'var(--letter-spacing-normal)',
              maxWidth: '560px',
              margin: '0 auto 32px'
            }}
          >
            La página que buscás no existe o fue movida. Podés volver al inicio o explorar las parcelas disponibles.
          </p>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            {/* Botón primario - Explorar parcelas */}
            <button
              onClick={() => onNavigate('parcelas')}
              className="w-full sm:w-auto px-8 py-3 rounded-full transition-all duration-300"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                fontWeight: 'var(--font-weight-medium)',
                letterSpacing: 'var(--letter-spacing-normal)',
                backgroundColor: '#006B4E',
                color: '#FFFFFF'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0d3640'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
            >
              Explorar parcelas
            </button>

            {/* Botón secundario - Volver al inicio */}
            <button
              onClick={() => onNavigate('home')}
              className="w-full sm:w-auto px-8 py-3 rounded-full transition-all duration-300"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                fontWeight: 'var(--font-weight-medium)',
                letterSpacing: 'var(--letter-spacing-normal)',
                backgroundColor: 'transparent',
                color: '#006B4E',
                border: '2px solid #006B4E'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#006B4E';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#006B4E';
              }}
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-12 relative z-10 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <img src={logo} alt="CompraTuParcela" className="h-16 -ml-4" />
              <p className="text-xs text-gray-600">
                Plataforma especializada en<br />compra y venta de parcelas
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="text-xs font-bold text-black">EXPLORAR</div>
              <div className="space-y-2 text-xs text-gray-600">
                <div className="cursor-pointer hover:text-black" onClick={() => onNavigate('parcelas')}>Parcelas</div>
                <div className="cursor-pointer hover:text-black" onClick={() => onNavigate('inmobiliarias')}>Inmobiliarias</div>
                <div className="cursor-pointer hover:text-black" onClick={() => onNavigate('brokers')}>Brokers</div>
                <div>Blog</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold text-black">PLATAFORMA</div>
              <div className="space-y-2 text-xs text-gray-600">
                <div className="cursor-pointer hover:text-black" onClick={() => onNavigate('como-funciona-loading')}>Cómo funciona</div>
                <div>Publicar propiedad</div>
                <div>Planes para inmobiliarias</div>
                <div>Para brokers</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold text-black">SOPORTE</div>
              <div className="space-y-2 text-xs text-gray-600">
                <div>Centro de ayuda</div>
                <div>Términos y condiciones</div>
                <div>Política de privacidad</div>
                <div>Contacto</div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              © 2026 Compra Tu Parcela. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}