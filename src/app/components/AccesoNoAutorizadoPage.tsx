import React from 'react';
import { ShieldOff, Mail, ArrowLeft } from 'lucide-react';
import logo from 'figma:asset/a4719ce43ce52ee49df30a2a5c090c8a8b743667.png';

interface AccesoNoAutorizadoPageProps {
  email?: string;
  onNavigate: (screen: string) => void;
}

export function AccesoNoAutorizadoPage({ email, onNavigate }: AccesoNoAutorizadoPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ backgroundColor: 'var(--hero-background)' }}>
      <div className="w-full max-w-md text-center">
        {/* Logo */}
        <img
          src={logo}
          alt="CompraTuParcela"
          className="h-12 mx-auto mb-10 cursor-pointer"
          onClick={() => onNavigate('home')}
        />

        {/* Icono */}
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#FEE2E2' }}>
          <ShieldOff className="w-9 h-9" style={{ color: '#DC2626' }} />
        </div>

        {/* Título */}
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--font-size-h2)',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--foreground)',
            marginBottom: '0.75rem',
          }}
        >
          Acceso no autorizado
        </h1>

        {/* Descripción */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-base)',
            color: '#6B7280',
            lineHeight: '1.6',
            marginBottom: '1.5rem',
          }}
        >
          {email ? (
            <>
              El correo <strong style={{ color: '#111827' }}>{email}</strong> no está autorizado para acceder a esta plataforma.
            </>
          ) : (
            'Tu correo electrónico no está autorizado para acceder a esta plataforma.'
          )}
        </p>

        {/* Card informativa */}
        <div
          className="rounded-2xl p-6 mb-8 text-left space-y-4"
          style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-sm)',
              fontWeight: 600,
              color: '#111827',
              marginBottom: '4px',
            }}
          >
            ¿Por qué veo esto?
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-sm)',
              color: '#6B7280',
              lineHeight: '1.6',
            }}
          >
            Compra Tu Parcela opera actualmente en modo de acceso restringido. Solo los usuarios previamente autorizados por el equipo pueden registrarse e iniciar sesión.
          </p>

          <div style={{ height: '1px', backgroundColor: '#F3F4F6' }} />

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#EBFEF5' }}>
              <Mail className="w-4 h-4" style={{ color: '#006B4E' }} />
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 500, color: '#111827', marginBottom: '2px' }}>
                ¿Querés solicitar acceso?
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#6B7280', lineHeight: '1.5' }}>
                Escribinos a{' '}
                <a
                  href="mailto:contacto@compratuparcela.cl"
                  style={{ color: '#006B4E', textDecoration: 'none', fontWeight: 500 }}
                >
                  contacto@compratuparcela.cl
                </a>{' '}
                indicando tu nombre y el correo con el que quieres acceder.
              </p>
            </div>
          </div>
        </div>

        {/* Botón volver */}
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all"
          style={{ backgroundColor: '#F5F5F5', color: '#374151', fontFamily: 'var(--font-body)' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#E5E5E5'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#F5F5F5'}
        >
          <ArrowLeft className="w-4 h-4" /> Volver al inicio
        </button>
      </div>
    </div>
  );
}
