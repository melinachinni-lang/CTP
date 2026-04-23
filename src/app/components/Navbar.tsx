import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, User, Settings, LogOut, Menu, X } from 'lucide-react';
import logo from 'figma:asset/a4719ce43ce52ee49df30a2a5c090c8a8b743667.png';

interface NavbarProps {
  onNavigate: (screen: string) => void;
  estado?: 'visitante' | 'logueado';
  onLogout?: () => void;
  userName?: string;
  userAvatar?: string;
  onShowPublishModal?: () => void;
}

export function Navbar({ 
  onNavigate, 
  estado = 'visitante', 
  onLogout,
  userName = 'María Pérez',
  userAvatar,
  onShowPublishModal
}: NavbarProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const handleLogoutClick = () => {
    setShowDropdown(false);
    if (onLogout) {
      onLogout();
    }
  };

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <>
      <header className="fixed top-8 left-0 right-0 z-50" style={{ backgroundColor: 'var(--hero-background)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Hamburger Menu - Mobile/Tablet only */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Abrir menú"
            >
              <Menu className="w-6 h-6 text-black" />
            </button>

            {/* Logo and Navigation - Left side */}
            <div className="flex items-center gap-0">
              <img 
                src={logo} 
                alt="CompraTuParcela" 
                className="h-10 sm:h-12 lg:h-14 cursor-pointer" 
                onClick={() => onNavigate('home')}
              />
              
              <nav className="hidden lg:flex items-center justify-center gap-0 whitespace-nowrap">
                <button onClick={() => onNavigate('parcelas')} className="h-8 px-4 text-sm leading-[1.5] font-normal text-black hover:bg-[#efefef] hover:text-[#303030] rounded-[200px] transition-colors whitespace-nowrap flex items-center justify-center">Parcelas</button>
                <button onClick={() => onNavigate('inmobiliarias')} className="h-8 px-4 text-sm leading-[1.5] font-normal text-black hover:bg-[#efefef] hover:text-[#303030] rounded-[200px] transition-colors whitespace-nowrap flex items-center justify-center">Inmobiliarias</button>
                <button onClick={() => onNavigate('como-funciona-loading')} className="h-8 px-4 text-sm leading-[1.5] font-normal text-black hover:bg-[#efefef] hover:text-[#303030] rounded-[200px] transition-colors whitespace-nowrap flex items-center justify-center">Cómo funciona</button>
                <button onClick={() => onNavigate('recursos')} className="h-8 px-4 text-sm leading-[1.5] font-normal text-black hover:bg-[#efefef] hover:text-[#303030] rounded-[200px] transition-colors whitespace-nowrap flex items-center justify-center">Recursos</button>
              </nav>
            </div>

            {/* Action Buttons - Right side */}
            <div className="flex items-center justify-end gap-2 lg:gap-3">
              <button 
                onClick={() => {
                  if (onShowPublishModal) {
                    // Usuario logueado o no logueado: mostrar modal
                    onShowPublishModal();
                  }
                }}
                className="h-8 bg-red-600 hover:bg-red-700 text-white px-3 lg:px-[20px] text-xs sm:text-sm leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center py-[0px]"
              >
                <span className="hidden sm:inline">Publicar propiedad</span>
                <span className="sm:hidden">Publicar</span>
              </button>
              
              {estado === 'visitante' ? (
                <button 
                  onClick={() => onNavigate('entry')}
                  className="hidden sm:flex h-8 bg-[#efefef] hover:bg-[#dedede] text-black hover:text-[#303030] px-3 lg:px-[20px] text-xs sm:text-sm leading-[1.5] font-medium rounded-[200px] transition-colors items-center justify-center py-[0px]"
                >
                  Ingresar
                </button>
              ) : (
                <div className="relative hidden sm:block" ref={dropdownRef}>
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="h-8 bg-[#efefef] hover:bg-[#dedede] px-3 rounded-[200px] transition-colors flex items-center gap-2"
                  >
                    {/* Avatar */}
                    <div className="w-6 h-6 rounded-full bg-[#124854] flex items-center justify-center text-white text-xs font-medium overflow-hidden">
                      {userAvatar ? (
                        <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
                      ) : (
                        <span>{getInitials(userName)}</span>
                      )}
                    </div>
                    
                    {/* Nombre */}
                    <span className="text-sm leading-[1.5] font-medium text-black">
                      {userName}
                    </span>
                    
                    {/* Icono dropdown */}
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
                      style={{ color: '#0A0A0A' }}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {showDropdown && (
                    <div 
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border overflow-hidden"
                      style={{ borderColor: '#CDD8DE' }}
                    >
                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          onNavigate('person-dashboard');
                        }}
                        className="w-full px-4 py-3 text-left text-sm hover:bg-[#F5F5F5] transition-colors flex items-center gap-3"
                        style={{ color: '#0A0A0A' }}
                      >
                        <User className="w-4 h-4" style={{ color: '#124854' }} />
                        <span style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-medium)' }}>Mi perfil</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          // TODO: Navegar a configuración cuando exista
                        }}
                        className="w-full px-4 py-3 text-left text-sm hover:bg-[#F5F5F5] transition-colors flex items-center gap-3"
                        style={{ color: '#0A0A0A' }}
                      >
                        <Settings className="w-4 h-4" style={{ color: '#124854' }} />
                        <span style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-medium)' }}>Configuración</span>
                      </button>
                      
                      <div className="border-t" style={{ borderColor: '#CDD8DE' }}></div>
                      
                      <button
                        onClick={handleLogoutClick}
                        className="w-full px-4 py-3 text-left text-sm hover:bg-[#FEF2F2] transition-colors flex items-center gap-3"
                        style={{ color: '#DC2626' }}
                      >
                        <LogOut className="w-4 h-4" />
                        <span style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-medium)' }}>Cerrar sesión</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div 
            className="fixed left-0 top-0 bottom-0 w-[85vw] max-w-sm bg-white overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{ 
              animation: 'slideInLeft 0.3s ease-out',
              boxShadow: '4px 0 24px rgba(0, 0, 0, 0.1)'
            }}
          >
            {/* Header del drawer */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-3 sm:p-4 flex items-center justify-between z-10">
              <img 
                src={logo} 
                alt="CompraTuParcela" 
                className="h-10" 
              />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Contenido del menú */}
            <div className="p-3 sm:p-4">
              {/* Navegación principal */}
              <nav className="space-y-2 mb-6">
                <button
                  onClick={() => {
                    onNavigate('parcelas');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-[#efefef] text-black rounded-[12px] transition-colors"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    fontWeight: 500
                  }}
                >
                  Parcelas
                </button>
                <button
                  onClick={() => {
                    onNavigate('inmobiliarias');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-[#efefef] text-black rounded-[12px] transition-colors"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    fontWeight: 500
                  }}
                >
                  Inmobiliarias
                </button>
                <button
                  onClick={() => {
                    onNavigate('como-funciona-loading');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-[#efefef] text-black rounded-[12px] transition-colors"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    fontWeight: 500
                  }}
                >
                  Cómo funciona
                </button>
                <button
                  onClick={() => {
                    onNavigate('recursos');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-[#efefef] text-black rounded-[12px] transition-colors"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    fontWeight: 500
                  }}
                >
                  Recursos
                </button>
              </nav>

              {/* Divisor */}
              <div className="border-t border-gray-200 my-6"></div>

              {/* Botones de acción */}
              <div className="space-y-3">
                <button 
                  onClick={() => {
                    if (onShowPublishModal) {
                      onShowPublishModal();
                    }
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-[200px] transition-colors"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    fontWeight: 500
                  }}
                >
                  Publicar propiedad
                </button>
                {estado === 'visitante' ? (
                  <button 
                    onClick={() => {
                      onNavigate('entry');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-[#efefef] hover:bg-[#dedede] text-black py-3 px-4 rounded-[200px] transition-colors"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '15px',
                      fontWeight: 500
                    }}
                  >
                    Ingresar
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={() => {
                        onNavigate('person-dashboard');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-[#efefef] hover:bg-[#dedede] text-black py-3 px-4 rounded-[200px] transition-colors flex items-center justify-center gap-2"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '15px',
                        fontWeight: 500
                      }}
                    >
                      <div className="w-6 h-6 rounded-full bg-[#124854] flex items-center justify-center text-white text-xs font-medium overflow-hidden">
                        {userAvatar ? (
                          <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
                        ) : (
                          <span>{getInitials(userName)}</span>
                        )}
                      </div>
                      <span>{userName}</span>
                    </button>
                    <button 
                      onClick={() => {
                        handleLogoutClick();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-[#FEF2F2] hover:bg-[#FEE2E2] py-3 px-4 rounded-[200px] transition-colors"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '15px',
                        fontWeight: 500,
                        color: '#DC2626'
                      }}
                    >
                      Cerrar sesión
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}