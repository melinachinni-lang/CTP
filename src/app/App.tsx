import { useState, useRef } from 'react';
import '@/styles/index.css';
import { EntryScreen } from '@/app/components/EntryScreen';
import { RealEstateDashboardScreen } from '@/app/components/RealEstateDashboardScreen';
import { BrokerDashboardScreen } from '@/app/components/BrokerDashboardScreen';
import { PersonDashboardScreen } from '@/app/components/PersonDashboardScreen';
import { AdminDashboard } from '@/app/components/AdminDashboard';
import { AdminGeneralDashboard } from '@/app/components/AdminGeneralDashboard';
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

export interface DashboardRef {
  openPublishModal: () => void;
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
  | 'politica-privacidad'
  | 'terminos-condiciones'
  | 'asesoria'
  | 'acceso-no-autorizado';

export default function App() {
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

  // Refs para los dashboards
  const personDashboardRef = useRef<DashboardRef>(null);
  const realEstateDashboardRef = useRef<DashboardRef>(null);
  const brokerDashboardRef = useRef<DashboardRef>(null);

  // Estado compartido de compra por parcela (id → estado)
  type ParcelaEstado = 'disponible' | 'reservandose' | 'pago-en-validacion' | 'reservada';
  const [parcelaEstados, setParcelaEstados] = useState<Record<number, ParcelaEstado>>({});
  const reservaTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleParcelaEstadoChange = (id: number, estado: ParcelaEstado) => {
    setParcelaEstados(prev => ({ ...prev, [id]: estado }));
    if (estado === 'reservandose') {
      if (reservaTimerRef.current) clearTimeout(reservaTimerRef.current);
      reservaTimerRef.current = setTimeout(() => {
        setParcelaEstados(prev =>
          prev[id] === 'reservandose' ? { ...prev, [id]: 'disponible' } : prev
        );
      }, 30 * 60 * 1000);
    } else if (estado !== 'disponible') {
      if (reservaTimerRef.current) { clearTimeout(reservaTimerRef.current); reservaTimerRef.current = null; }
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

  const handleSelectAccount = (account: { name: string; email: string }) => {
    setCurrentUser(account);
    setIsLoggedIn(true);
    
    // Si hay una acción pendiente de publicar, ir al dashboard y abrir el modal
    if (pendingAction === 'publish') {
      setCurrentScreen('person-dashboard');
      setPendingAction(null);
      // Abrir el modal después de que el dashboard se monte
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
                <option value="person-dashboard">7. Dashboard Personal</option>
                <option value="real-estate-dashboard">10. Dashboard Inmobiliaria</option>
                <option value="broker-dashboard">11. Dashboard Broker</option>
                <option value="admin-dashboard">12. Dashboard Admin</option>
                <option value="admin-general-dashboard">13. Dashboard Admin General</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-8">
        {currentScreen === 'home' && <HomeWireframe onNavigate={handleNavigate} isLoggedIn={isLoggedIn} currentUser={currentUser} onLogout={handleLogout} onOpenPublishModal={handleOpenPublishModal} onNavigateToPublish={handleNavigateToPublish} />}
        {currentScreen === 'home-error' && <HomeWireframe onNavigate={handleNavigate} isLoggedIn={isLoggedIn} currentUser={currentUser} onLogout={handleLogout} initialLoadingError={true} onOpenPublishModal={handleOpenPublishModal} onNavigateToPublish={handleNavigateToPublish} />}
        {currentScreen === 'parcelas' && <ParcelasPage onNavigate={handleNavigate} initialFilters={searchFilters} parcelaEstados={parcelaEstados} />}
        {currentScreen === 'parcelas-empty' && <ParcelasPageEmpty onNavigate={handleNavigate} />}
        {currentScreen === 'parcelas-error' && <ParcelasPageError onNavigate={handleNavigate} />}
        {currentScreen === 'inmobiliarias' && <InmobiliariasPage onNavigate={handleNavigate} />}
        {currentScreen === 'brokers' && <BrokersPage onNavigate={handleNavigate} />}
        {currentScreen === 'not-found' && <NotFoundPage onNavigate={handleNavigate} />}
        {currentScreen === 'como-funciona-loading' && <ComoFuncionaPageLoading onNavigate={handleNavigate} isLoggedIn={isLoggedIn} currentUser={currentUser} onLogout={handleLogout} onOpenPublishModal={handleOpenPublishModal} onNavigateToPublish={handleNavigateToPublish} />}
        {currentScreen === 'como-funciona' && <ComoFuncionaPage onNavigate={handleNavigate} isLoggedIn={isLoggedIn} currentUser={currentUser} onLogout={handleLogout} onOpenPublishModal={handleOpenPublishModal} onNavigateToPublish={handleNavigateToPublish} />}
        {currentScreen === 'recursos' && <RecursosPage onNavigate={handleNavigate} isLoggedIn={isLoggedIn} currentUser={currentUser} onLogout={handleLogout} onOpenPublishModal={handleOpenPublishModal} onNavigateToPublish={handleNavigateToPublish} />}
        {currentScreen === 'parcela-detalle' && <ParcelaDetalle onNavigate={handleNavigate} parcelaId={selectedParcelaId} estadoCompraInicial={selectedParcelaId !== null ? (parcelaEstados[selectedParcelaId!] || 'disponible') : 'disponible'} onEstadoChange={handleParcelaEstadoChange} />}
        {currentScreen === 'proyecto-detalle' && <ProyectoDetalle onNavigate={handleNavigate} proyectoId={selectedProyectoId} />}
        {currentScreen === 'inmobiliaria-profile' && <InmobiliariaProfile onNavigate={handleNavigate} inmobiliariaName={selectedInmobiliaria} />}
        {currentScreen === 'vendedor-particular-profile' && <VendedorParticularProfile onNavigate={handleNavigate} vendedorName={selectedInmobiliaria} />}
        {currentScreen === 'broker-profile' && <BrokerProfile onNavigate={handleNavigate} brokerName={selectedBrokerName} />}
        {currentScreen === 'planes' && <PlanesPage onNavigate={handleNavigate} isLoggedIn={isLoggedIn} currentUser={currentUser} onLogout={handleLogout} />}
        {currentScreen === 'articulo' && <ArticuloPage onNavigate={handleNavigate} articuloId={selectedArticuloId} isLoggedIn={isLoggedIn} currentUser={currentUser} onLogout={handleLogout} />}
        {currentScreen === 'entry' && <EntryScreen onNavigate={handleNavigate} onSelectGoogleAccount={handleSelectAccount} />}
        {currentScreen === 'person-dashboard' && <PersonDashboardScreen onNavigate={handleNavigate} ref={personDashboardRef} />}
        {currentScreen === 'real-estate-dashboard' && <RealEstateDashboardScreen onNavigate={handleNavigate} ref={realEstateDashboardRef} />}
        {currentScreen === 'broker-dashboard' && <BrokerDashboardScreen onNavigate={handleNavigate} ref={brokerDashboardRef} />}
        {currentScreen === 'admin-dashboard' && <AdminDashboard onNavigate={handleNavigate} />}
        {currentScreen === 'admin-general-dashboard' && <AdminGeneralDashboard onNavigate={handleNavigate} />}
        {currentScreen === 'politica-privacidad' && <PoliticaPrivacidad onNavigateHome={() => setCurrentScreen('home')} />}
        {currentScreen === 'terminos-condiciones' && <TerminosCondiciones onNavigateHome={() => setCurrentScreen('home')} />}
        {currentScreen === 'asesoria' && <AsesoriaPage onNavigate={handleNavigate} />}
        {currentScreen === 'acceso-no-autorizado' && <AccesoNoAutorizadoPage onNavigate={handleNavigate} />}
      </div>
    </div>
  );
}