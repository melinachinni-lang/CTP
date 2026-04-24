import React from 'react';
import { ChevronLeft } from 'lucide-react';
import logo from 'figma:asset/a4719ce43ce52ee49df30a2a5c090c8a8b743667.png';

interface GoogleAccountSelectorProps {
  onSelectAccount: (account: { name: string; email: string }) => void;
  onBack?: () => void;
}

export function GoogleAccountSelector({ onSelectAccount, onBack }: GoogleAccountSelectorProps) {
  const accounts = [
    { name: 'María Pérez', email: 'maria.perez@gmail.com' },
    { name: 'Juan Gómez', email: 'juan.gomez@gmail.com' }
  ];

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img 
            src={logo} 
            alt="CompraTuParcela" 
            className="h-16" 
          />
        </div>

        {/* Card de selección */}
        <div className="bg-white rounded-2xl shadow-lg border p-8" style={{ borderColor: '#CDD8DE' }}>
          {/* Botón volver (opcional) */}
          {onBack && (
            <button
              onClick={onBack}
              className="mb-6 flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
              style={{ color: '#737373' }}
            >
              <ChevronLeft className="w-4 h-4" />
              <span style={{ fontFamily: 'var(--font-body)' }}>Volver</span>
            </button>
          )}

          {/* Título */}
          <h1 
            className="mb-6 text-center"
            style={{ 
              color: '#0A0A0A',
              fontSize: 'var(--font-size-h3)',
              fontWeight: 'var(--font-weight-semibold)',
              fontFamily: 'var(--font-heading)'
            }}
          >
            Elegí una cuenta
          </h1>

          {/* Lista de cuentas */}
          <div className="space-y-3">
            {accounts.map((account, index) => (
              <button
                key={index}
                onClick={() => onSelectAccount(account)}
                className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-[#F5F5F5] transition-all border border-transparent hover:border-[#CDD8DE] text-left"
              >
                {/* Avatar con iniciales */}
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white text-base font-semibold flex-shrink-0"
                  style={{ backgroundColor: '#006B4E' }}
                >
                  {getInitials(account.name)}
                </div>

                {/* Nombre y email */}
                <div className="flex-1 min-w-0">
                  <div 
                    className="font-medium truncate"
                    style={{ 
                      color: '#0A0A0A',
                      fontSize: 'var(--font-size-body-base)',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 'var(--font-weight-medium)'
                    }}
                  >
                    {account.name}
                  </div>
                  <div 
                    className="text-sm truncate"
                    style={{ 
                      color: '#737373',
                      fontSize: 'var(--font-size-xs)',
                      fontFamily: 'var(--font-body)'
                    }}
                  >
                    {account.email}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Texto legal pequeño */}
          <p 
            className="mt-6 text-center"
            style={{ 
              color: '#737373',
              fontSize: 'var(--font-size-xs)',
              fontFamily: 'var(--font-body)',
              lineHeight: '1.5'
            }}
          >
            Al continuar, aceptás los términos de servicio y la política de privacidad de CompraTuParcela.
          </p>
        </div>
      </div>
    </div>
  );
}
