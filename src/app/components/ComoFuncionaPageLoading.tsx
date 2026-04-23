import React, { useEffect } from 'react';
import { Navbar } from '@/app/components/Navbar';

interface ComoFuncionaPageLoadingProps {
  onNavigate: (page: string) => void;
  isLoggedIn?: boolean;
  currentUser?: { name: string; email: string } | null;
  onLogout?: () => void;
  onOpenPublishModal?: () => void;
  onNavigateToPublish?: () => void;
}

export function ComoFuncionaPageLoading({ onNavigate, isLoggedIn = false, currentUser, onLogout, onOpenPublishModal, onNavigateToPublish }: ComoFuncionaPageLoadingProps) {
  // Auto-navigate to the real page after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onNavigate('como-funciona');
    }, 2000);

    return () => clearTimeout(timer);
  }, [onNavigate]);

  return (
    <div className="min-h-screen relative flex flex-col" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Header / Navbar */}
      <Navbar 
        onNavigate={onNavigate}
        estado={isLoggedIn ? 'logueado' : 'visitante'}
        onLogout={onLogout}
        userName={currentUser?.name}
        onShowPublishModal={onOpenPublishModal || (() => {})}
      />

      {/* Loading Content - Centered */}
      <main className="flex-1 flex items-center justify-center pt-28 pb-20">
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Loading Text */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '18px',
              fontWeight: 'var(--font-weight-regular)',
              color: '#0A0A0A',
              textAlign: 'center'
            }}
          >
            Cargando página...
          </p>

          {/* Animated Dots Loader */}
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ 
                backgroundColor: '#124854',
                animationDelay: '0ms',
                animationDuration: '1400ms'
              }}
            />
            <div 
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ 
                backgroundColor: '#124854',
                animationDelay: '200ms',
                animationDuration: '1400ms'
              }}
            />
            <div 
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ 
                backgroundColor: '#124854',
                animationDelay: '400ms',
                animationDuration: '1400ms'
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}