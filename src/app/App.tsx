import { useState, useRef, useEffect } from 'react';
import { Scale, X } from 'lucide-react';
import '@/styles/index.css';
import { I18nProvider, useI18n } from '@/app/i18n/i18nContext';
import { EntryScreen } from '@/app/components/EntryScreen';
import { CompletarPerfilScreen } from '@/app/components/CompletarPerfilScreen';
import { RealEstateDashboardScreen } from '@/app/components/RealEstateDashboardScreen';
import { BrokerDashboardScreen } from '@/app/components/BrokerDashboardScreen';
import { PersonDashboardScreen, CompareContent } from '@/app/components/PersonDashboardScreen';
import { Navbar } from '@/app/components/Navbar';
import { AdminDashboard } from '@/app/components/AdminDashboard';
import { AdminGeneralDashboard } from '@/app/components/AdminGeneralDashboard';
import { CTPAdminDashboard } from '@/app/components/CTPAdminDashboard';
import { HomeWireframe } from '@/app/components/HomeWireframe';
import { ParcelasPage } from '@/app/components/ParcelasPage';
import { ParcelasPageEmpty } from '@/app/components/ParcelasPageEmpty';
import { ParcelasPageError } from '@/app/components/ParcelasPageError';
import { InmobiliariasPage } from '@/app/components/InmobiliariasPage';
import { BrokersPage } from '@/app/components/BrokersPage';
import { NotFoundPage } from '@/app/components/NotFoundPage';
import { ParcelaDetalle } from '@/app/components/ParcelaDetalle';
import { ProyectoDetalle } from '@/app/components/ProyectoDetalle';
import { InmobiliariaProfile } from '@/app/components/InmobiliariaProfile';
import { VendedorParticularProfile } from '@/app/components/VendedorParticularProfile';
import { ComoFuncionaPage } from '@/app/components/ComoFuncionaPage';
import { ComoFuncionaPageLoading } from '@/app/components/ComoFuncionaPageLoading';
import { RecursosPage } from '@/app/components/RecursosPage';
import { PoliticaPrivacidad } from '@/app/components/PoliticaPrivacidad';
import { TerminosCondiciones } from '@/app/components/TerminosCondiciones';
import { BrokerProfile } from '@/app/components/BrokerProfile';
import { PlanesPage } from '@/app/components/PlanesPage';
import { ArticuloPage } from '@/app/components/ArticuloPage';
import { AsesoriaPage } from '@/app/components/AsesoriaPage';
import { AccesoNoAutorizadoPage } from '@/app/components/AccesoNoAutorizadoPage';

function ComparadorPublico({ onNavigate, compareParcelaIds, onClear, isLoggedIn, currentUser, onLogout }: {
  onNavigate: (screen: string, id?: number) => void;
  compareParcelaIds: number[];
  onToggleCompare: (id: number) => void;
  onClear: () => void;
  isLoggedIn?: boolean;
  currentUser?: { name: string; email: string } | null;
  onLogout?: () => void;
}) {
  const { t } = useI18n();
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--hero-background)' }}>
      <Navbar onNavigate={onNavigate} estado={isLoggedIn ? 'logueado' : 'visitante'} onLogout={onLogout} userName={currentUser?.name} />
      <main className="pt-28 pb-16">
        {compareParcelaIds.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-20">
            <div className="text-center max-w-md">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: '#EBFEF5' }}>
                <Scale className="w-8 h-8" style={{ color: '#006B4E' }} />
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h2)', fontWeight: 500, color: '#0A0A0A', marginBottom: '12px' }}>
                {t.comparator.title}
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-base)', color: '#737373', lineHeight: '1.6', marginBottom: '8px' }}>
                {t.comparator.empty}
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#9CA3AF', lineHeight: '1.6', marginBottom: '32px' }}>
                {t.comparator.hint}
              </p>
              <button
                onClick={() => onNavigate('parcelas')}
                className="px-6 py-3 rounded-full transition-colors"
                style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 'var(--font-size-body-base)' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#01533E'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#006B4E'}
              >
                {t.comparator.explore}
              </button>
            </div>
          </div>
        ) : (
          <CompareContent onNavigate={onNavigate} />
        )}
      </main>
    </div>
  );
}

export interface DashboardRef {
  openPublishModal: () => void;
  openNotificationsSection?: () => void;
  openCompareSection?: () => void;
}

type Screen =
  | 'home'
  | 'home-error'
  | 'parcelas'
  | 'parcelas-empty'
  | 'parcelas-error'
  | 'inmobiliarias'
  | 'brokers'
  | 'not-found'
  | 'como-funciona'
  | 'como-funciona-loading'
  | 'recursos'
  | 'parcela-detalle'
  | 'proyecto-detalle'
  | 'inmobiliaria-profile'
  | 'vendedor-particular-profile'
  | 'broker-profile'
  | 'planes'
  | 'articulo'
  | 'entry'
  | 'person-dashboard'
  | 'real-estate-dashboard'
  | 'broker-dashboard'
  | 'admin-dashboard'
  | 'admin-general-dashboard'
  | 'ctp-admin-dashboard'
  | 'politica-privacidad'
  | 'terminos-condiciones'
  | 'asesoria'
  | 'acceso-no-autorizado'
  | 'completar-perfil';

function AppContent() {
  const { t } = useI18n();
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedParcelaId, setSelectedParcelaId] = useState<number | null>(null);
  const [selectedProyectoId, setSelectedProyectoId] = useState<number | null>(null);
  const [selectedInmobiliaria, setSelectedInmobiliaria] = useState<string | null>(null);
  const [selectedBrokerName, setSelectedBrokerName] = useState<string | null>(null);
  const [selectedArticuloId, setSelectedArticuloId] = useState<number | null>(null);
  
  // Estado de autenticación
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);
  const [pendingAction, setPendingAction] = useState<'publish' | null>(null);

  // Estado de guardados
  const [savedParcelaIds, setSavedParcelaIds] = useState<number[]>([]);
  const [pendingSaveId, setPendingSaveId] = useState<number | null>(null);
  const [compareParcelaIds, setCompareParcelaIds] = useState<number[]>([]);

  // Toast
  type Toast = { message: string; actionLabel?: string; onAction?: () => void; id: number };
  const [toast, setToast] = useState<Toast | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (t: Omit<Toast, 'id'>) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    const id = Date.now();
    setToast({ ...t, id });
    toastTimerRef.current = setTimeout(() => setToast(null), 4000);
  };

  const handleToggleSaved = (parcelaId: number) => {
    if (!isLoggedIn) {
      setPendingSaveId(parcelaId);
      showToast({
        message: t.toast.loginToSave,
        actionLabel: t.toast.login,
        onAction: () => setCurrentScreen('entry'),
      });
      return;
    }
    const isSaved = savedParcelaIds.includes(parcelaId);
    if (isSaved) {
      setSavedParcelaIds(prev => prev.filter(id => id !== parcelaId));
      showToast({
        message: t.toast.removedFromSaved,
        actionLabel: t.toast.undo,
        onAction: () => {
          setSavedParcelaIds(prev => [parcelaId, ...prev]);
          setToast(null);
        },
      });
    } else {
      if (savedParcelaIds.length >= 50) {
        showToast({ message: t.toast.limitReached });
        return;
      }
      setSavedParcelaIds(prev => [parcelaId, ...prev]);
      showToast({
        message: t.toast.parcelSaved,
        actionLabel: t.toast.viewSaved,
        onAction: () => {
          setCurrentScreen('person-dashboard');
          setToast(null);
        },
      });
    }
  };

  const handleToggleCompare = (parcelaId: number) => {
    if (compareParcelaIds.includes(parcelaId)) {
      setCompareParcelaIds(prev => prev.filter(id => id !== parcelaId));
    } else {
      if (compareParcelaIds.length >= 3) return;
      setCompareParcelaIds(prev => [...prev, parcelaId]);
    }
  };

  useEffect(() => {
    return () => { if (toastTimerRef.current) clearTimeout(toastTimerRef.current); };
  }, []);

  // Refs para los dashboards
  const personDashboardRef = useRef<DashboardRef>(null);
  const realEstateDashboardRef = useRef<DashboardRef>(null);
  const brokerDashboardRef = useRef<DashboardRef>(null);

  // Estado compartido de compra por parcela (id → estado)
  type ParcelaEstado = 'disponible' | 'reservandose' | 'pago-en-validacion' | 'reservada';
  const [parcelaEstados, setParcelaEstados] = useState<Record<number, ParcelaEstado>>({});
  const reservaTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const validacionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleParcelaEstadoChange = (id: number, estado: ParcelaEstado) => {
    setParcelaEstados(prev => ({ ...prev, [id]: estado }));
    if (estado === 'reservandose') {
      if (reservaTimerRef.current) clearTimeout(reservaTimerRef.current);
      reservaTimerRef.current = setTimeout(() => {
        setParcelaEstados(prev =>
          prev[id] === 'reservandose' ? { ...prev, [id]: 'disponible' } : prev
        );
      }, 30 * 60 * 1000);
    } else if (estado === 'pago-en-validacion') {
      if (validacionTimerRef.current) clearTimeout(validacionTimerRef.current);
      validacionTimerRef.current = setTimeout(() => {
        setParcelaEstados(prev =>
          prev[id] === 'pago-en-validacion' ? { ...prev, [id]: 'reservada' } : prev
        );
      }, 60 * 1000);
    } else {
      if (reservaTimerRef.current) { clearTimeout(reservaTimerRef.current); reservaTimerRef.current = null; }
      if (validacionTimerRef.current) { clearTimeout(validacionTimerRef.current); validacionTimerRef.current = null; }
    }
  };

  // Estado para filtros de búsqueda
  const [searchFilters, setSearchFilters] = useState<{
    ubicacion: string;
    superficie: string;
    condicion: string;
    precio: string;
    tipo: string;
  } | null>(null);

  // Función para abrir modal de publicación en el dashboard activo
  const handleOpenPublishModal = () => {
    if (currentScreen === 'person-dashboard') {
      personDashboardRef.current?.openPublishModal();
    } else if (currentScreen === 'real-estate-dashboard') {
      realEstateDashboardRef.current?.openPublishModal();
    } else if (currentScreen === 'broker-dashboard') {
      brokerDashboardRef.current?.openPublishModal();
    } else if (isLoggedIn) {
      // Si el usuario está logueado pero no está en un dashboard, navegar a su dashboard y abrir modal
      setCurrentScreen('person-dashboard');
      setTimeout(() => {
        personDashboardRef.current?.openPublishModal();
      }, 200);
    }
  };

  // Función para setear acción pendiente y navegar a login
  const handleNavigateToPublish = () => {
    setPendingAction('publish');
    setCurrentScreen('entry');
  };

  const handleNavigate = (screen: string, id?: number, data?: string | {
    ubicacion: string;
    superficie: string;
    condicion: string;
    precio: string;
    tipo: string;
  }) => {
    if (screen === 'person-dashboard-notifications') {
      setCurrentScreen('person-dashboard');
      setTimeout(() => personDashboardRef.current?.openNotificationsSection?.(), 50);
      return;
    }
    if (screen === 'person-dashboard-compare') {
      setCurrentScreen('person-dashboard');
      setTimeout(() => personDashboardRef.current?.openCompareSection?.(), 50);
      return;
    }
    setCurrentScreen(screen as Screen);
    
    // Si hay pendingAction y se navega a un dashboard, abrir el modal
    if (pendingAction === 'publish' && (screen === 'person-dashboard' || screen === 'real-estate-dashboard' || screen === 'broker-dashboard')) {
      setPendingAction(null);
      setTimeout(() => {
        if (screen === 'person-dashboard') {
          personDashboardRef.current?.openPublishModal();
        } else if (screen === 'real-estate-dashboard') {
          realEstateDashboardRef.current?.openPublishModal();
        } else if (screen === 'broker-dashboard') {
          brokerDashboardRef.current?.openPublishModal();
        }
      }, 300);
    }
    
    // Handle parcela navigation with filters
    if (screen === 'parcelas' && data && typeof data === 'object' && 'ubicacion' in data) {
      setSearchFilters(data);
    } else if (screen === 'parcelas' && !data) {
      setSearchFilters(null);
    }
    
    // Handle parcela navigation
    if (screen === 'parcela-detalle' && id) {
      setSelectedParcelaId(id);
    }
    
    // Handle proyecto navigation
    if (screen === 'proyecto-detalle' && id) {
      setSelectedProyectoId(id);
    }
    
    // Handle inmobiliaria and vendedor navigation
    if ((screen === 'inmobiliaria-profile' || screen === 'vendedor-particular-profile') && data && typeof data === 'string') {
      setSelectedInmobiliaria(data);
    }

    // Handle broker profile navigation
    if (screen === 'broker-profile' && data && typeof data === 'string') {
      setSelectedBrokerName(data);
    }

    // Handle articulo navigation
    if (screen === 'articulo' && id) {
      setSelectedArticuloId(id);
    }
  };

  const handleSelectAccount = (account: { name: string; email: string }, skipNavigation?: boolean) => {
    setCurrentUser(account);
    setIsLoggedIn(true);

    // Auto-guardar parcela pendiente si la había
    if (pendingSaveId !== null) {
      setSavedParcelaIds(prev => prev.includes(pendingSaveId) ? prev : [pendingSaveId, ...prev]);
      showToast({
        message: t.toast.parcelSaved,
        actionLabel: t.toast.viewSaved,
        onAction: () => { setCurrentScreen('person-dashboard'); setToast(null); },
      });
      setPendingSaveId(null);
    }

    if (skipNavigation) return; // Onboarding maneja la navegación

    // Si hay una acción pendiente de publicar, ir al dashboard y abrir el modal
    if (pendingAction === 'publish') {
      setCurrentScreen('person-dashboard');
      setPendingAction(null);
      setTimeout(() => {
        personDashboardRef.current?.openPublishModal();
      }, 300);
    } else {
      setCurrentScreen('home');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentScreen('home');
  };

  return (
    <div className="size-full">
      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 bg-gray-100 border-b border-gray-300 z-[9999]">
        <div className="max-w-4xl mx-auto px-4 py-1.5">
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-medium text-gray-700">
              Wireframe: CompraTuParcela {isLoggedIn && `(Logueado como: ${currentUser?.name})`}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentScreen('home')}
                className="text-[10px] px-2 py-0.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Inicio
              </button>
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="text-[10px] px-2 py-0.5 bg-red-50 border border-red-300 text-red-700 hover:bg-red-100"
                >
                  Cerrar Sesión
                </button>
              )}
              <select
                value={currentScreen}
                onChange={(e) => setCurrentScreen(e.target.value as Screen)}
                className="text-[10px] px-2 py-0.5 bg-white border border-gray-300 text-gray-700"
              >
                <option value="home">0. Home (Usuario NO logueado)</option>
                <option value="home-error">0.2 Home – Error de carga</option>
                <option value="parcelas">0.1. Parcelas</option>
                <option value="parcelas-empty">1.1 Parcelas – Sin resultados</option>
                <option value="parcelas-error">1.2 Parcelas – Error de carga</option>
                <option value="inmobiliarias">0.3. Inmobiliarias</option>
                <option value="brokers">0.4. Brokers</option>
                <option value="not-found">0.7. 404 – Página no encontrada</option>
                <option value="como-funciona-loading">0.5. Cómo funciona – Loading</option>
                <option value="como-funciona">0.5. Cómo funciona</option>
                <option value="recursos">0.6. Recursos</option>
                <option value="google-account-selector">Login - Selección de cuenta</option>
                <option value="entry">1. Punto de entrada</option>
                <option value="completar-perfil">1.1. Completar perfil (post-verificación)</option>
                <option value="comparador">Comparador público</option>
                <option value="person-dashboard">7. Dashboard Personal</option>
                <option value="real-estate-dashboard">10. Inmobiliaria CTP</option>
                <option value="broker-dashboard">11. Dashboard Broker</option>
                <option value="admin-dashboard">12. Dashboard Admin</option>
                <option value="admin-general-dashboard">13. Dashboard Admin General</option>
                <option value="ctp-admin-dashboard">14. CTP Plataforma</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-8">
        {currentScreen === 'comparador' && <ComparadorPublico onNavigate={handleNavigate} compareParcelaIds={compareParcelaIds} onToggleCompare={handleToggleCompare} onClear={() => setCompareParcelaIds([])} isLoggedIn={isLoggedIn} currentUser={currentUser} onLogout={handleLogout} />}
        {currentScreen === 'home' && <HomeWireframe onNavigate={handleNavigate} isLoggedIn={isLoggedIn} currentUser={currentUser} onLogout={handleLogout} onOpenPublishModal={handleOpenPublishModal} onNavigateToPublish={handleNavigateToPublish} savedParcelaIds={savedParcelaIds} onToggleSaved={handleToggleSaved} compareParcelaIds={compareParcelaIds} onToggleCompare={handleToggleCompare} />}
        {currentScreen === 'home-error' && <HomeWireframe onNavigate={handleNavigate} isLoggedIn={isLoggedIn} currentUser={currentUser} onLogout={handleLogout} initialLoadingError={true} onOpenPublishModal={handleOpenPublishModal} onNavigateToPublish={handleNavigateToPublish} savedParcelaIds={savedParcelaIds} onToggleSaved={handleToggleSaved} compareParcelaIds={compareParcelaIds} onToggleCompare={handleToggleCompare} />}
        {currentScreen === 'parcelas' && <ParcelasPage onNavigate={handleNavigate} initialFilters={searchFilters} parcelaEstados={parcelaEstados} savedParcelaIds={savedParcelaIds} onToggleSaved={handleToggleSaved} isLoggedIn={isLoggedIn} compareParcelaIds={compareParcelaIds} onToggleCompare={handleToggleCompare} />}
        {currentScreen === 'parcelas-empty' && <ParcelasPageEmpty onNavigate={handleNavigate} />}
        {currentScreen === 'parcelas-error' && <ParcelasPageError onNavigate={handleNavigate} />}
        {currentScreen === 'inmobiliarias' && <InmobiliariasPage onNavigate={handleNavigate} />}
        {currentScreen === 'brokers' && <BrokersPage onNavigate={handleNavigate} />}
        {currentScreen === 'not-found' && <NotFoundPage onNavigate={handleNavigate} />}
        {currentScreen === 'como-funciona-loading' && <ComoFuncionaPageLoading onNavigate={handleNavigate} isLoggedIn={isLoggedIn} currentUser={currentUser} onLogout={handleLogout} onOpenPublishModal={handleOpenPublishModal} onNavigateToPublish={handleNavigateToPublish} />}
        {currentScreen === 'como-funciona' && <ComoFuncionaPage onNavigate={handleNavigate} isLoggedIn={isLoggedIn} currentUser={currentUser} onLogout={handleLogout} onOpenPublishModal={handleOpenPublishModal} onNavigateToPublish={handleNavigateToPublish} />}
        {currentScreen === 'recursos' && <RecursosPage onNavigate={handleNavigate} isLoggedIn={isLoggedIn} currentUser={currentUser} onLogout={handleLogout} onOpenPublishModal={handleOpenPublishModal} onNavigateToPublish={handleNavigateToPublish} />}
        {currentScreen === 'parcela-detalle' && <ParcelaDetalle onNavigate={handleNavigate} parcelaId={selectedParcelaId} estadoCompraInicial={selectedParcelaId !== null ? (parcelaEstados[selectedParcelaId!] || 'disponible') : 'disponible'} onEstadoChange={handleParcelaEstadoChange} savedParcelaIds={savedParcelaIds} onToggleSaved={handleToggleSaved} isLoggedIn={isLoggedIn} compareParcelaIds={compareParcelaIds} onToggleCompare={handleToggleCompare} />}
        {currentScreen === 'proyecto-detalle' && <ProyectoDetalle onNavigate={handleNavigate} proyectoId={selectedProyectoId} />}
        {currentScreen === 'inmobiliaria-profile' && <InmobiliariaProfile onNavigate={handleNavigate} inmobiliariaName={selectedInmobiliaria} />}
        {currentScreen === 'vendedor-particular-profile' && <VendedorParticularProfile onNavigate={handleNavigate} vendedorName={selectedInmobiliaria} />}
        {currentScreen === 'broker-profile' && <BrokerProfile onNavigate={handleNavigate} brokerName={selectedBrokerName} />}
        {currentScreen === 'planes' && <PlanesPage onNavigate={handleNavigate} isLoggedIn={isLoggedIn} currentUser={currentUser} onLogout={handleLogout} />}
        {currentScreen === 'articulo' && <ArticuloPage onNavigate={handleNavigate} articuloId={selectedArticuloId} isLoggedIn={isLoggedIn} currentUser={currentUser} onLogout={handleLogout} />}
        {currentScreen === 'entry' && <EntryScreen onNavigate={handleNavigate} onSelectGoogleAccount={handleSelectAccount} />}
        {currentScreen === 'person-dashboard' && <PersonDashboardScreen onNavigate={handleNavigate} ref={personDashboardRef} savedParcelaIds={savedParcelaIds} onToggleSaved={handleToggleSaved} />}
        {currentScreen === 'real-estate-dashboard' && <RealEstateDashboardScreen onNavigate={handleNavigate} ref={realEstateDashboardRef} />}
        {currentScreen === 'broker-dashboard' && <BrokerDashboardScreen onNavigate={handleNavigate} ref={brokerDashboardRef} />}
        {currentScreen === 'admin-dashboard' && <AdminDashboard onNavigate={handleNavigate} />}
        {currentScreen === 'admin-general-dashboard' && <AdminGeneralDashboard onNavigate={handleNavigate} />}
        {currentScreen === 'ctp-admin-dashboard' && <CTPAdminDashboard onNavigate={handleNavigate} />}
        {currentScreen === 'politica-privacidad' && <PoliticaPrivacidad onNavigateHome={() => setCurrentScreen('home')} />}
        {currentScreen === 'terminos-condiciones' && <TerminosCondiciones onNavigateHome={() => setCurrentScreen('home')} />}
        {currentScreen === 'asesoria' && <AsesoriaPage onNavigate={handleNavigate} />}
        {currentScreen === 'acceso-no-autorizado' && <AccesoNoAutorizadoPage onNavigate={handleNavigate} />}
        {currentScreen === 'completar-perfil' && <CompletarPerfilScreen onNavigate={handleNavigate} />}
      </div>

      {/* Barra flotante del comparador */}
      {compareParcelaIds.length > 0 && currentScreen !== 'comparador' && (
        <div
          className="fixed bottom-0 left-0 right-0 z-[90]"
          style={{ backgroundColor: '#002F23', borderTop: '1px solid rgba(255,255,255,0.1)' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <Scale className="w-5 h-5 flex-shrink-0" style={{ color: '#86EFAC' }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#FFFFFF', fontWeight: 500 }}>
                {compareParcelaIds.length} {compareParcelaIds.length === 1 ? t.comparator.selected : t.comparator.selectedPlural}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCompareParcelaIds([])}
                className="flex items-center gap-1 transition-colors"
                style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: 'rgba(255,255,255,0.55)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#FFFFFF'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)'}
              >
                <X className="w-3.5 h-3.5" />
                {t.comparator.clear}
              </button>
              <button
                onClick={() => handleNavigate('comparador')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full transition-colors"
                style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600 }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#01533E'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#006B4E'}
              >
                {t.comparator.view} →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast global */}
      {toast && (
        <div
          key={toast.id}
          className="fixed bottom-6 left-1/2 z-[9999] flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg"
          style={{
            transform: 'translateX(-50%)',
            backgroundColor: '#0A0A0A',
            color: '#FFFFFF',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body-sm)',
            minWidth: '240px',
            maxWidth: '380px',
          }}
        >
          <span className="flex-1">{toast.message}</span>
          {toast.actionLabel && toast.onAction && (
            <button
              onClick={toast.onAction}
              className="flex-shrink-0 font-medium underline"
              style={{ color: '#86EFAC', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)' }}
            >
              {toast.actionLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}