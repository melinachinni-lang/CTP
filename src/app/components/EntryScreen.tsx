import React from 'react';
import logo from 'figma:asset/a4719ce43ce52ee49df30a2a5c090c8a8b743667.png';
import entryBackground from 'figma:asset/e5096b94942ada0bf27ee8e61e30034a31f87b4c.png';

interface EntryScreenProps {
  onNavigate: (screen: string) => void;
  onSelectGoogleAccount?: (account: { name: string; email: string }, skipNavigation?: boolean) => void;
}

export function EntryScreen({ onNavigate, onSelectGoogleAccount }: EntryScreenProps) {
  const [showGoogleSelector, setShowGoogleSelector] = React.useState(false);
  const [showForgotPassword, setShowForgotPassword] = React.useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = React.useState('');
  const [passwordResetSent, setPasswordResetSent] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'login' | 'register'>('login');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [registerEmail, setRegisterEmail] = React.useState('');
  const [registerPassword, setRegisterPassword] = React.useState('');
  const [pendingGoogleAccount, setPendingGoogleAccount] = React.useState<{ name: string; email: string } | null>(null);
  const [showProfileSelection, setShowProfileSelection] = React.useState(false);
  const [selectedProfile, setSelectedProfile] = React.useState<string | null>(null);
  const [showPersonAction, setShowPersonAction] = React.useState(false);
  const [selectedAction, setSelectedAction] = React.useState<string | null>(null);
  const [showPersonExperience, setShowPersonExperience] = React.useState(false);
  const [selectedExperience, setSelectedExperience] = React.useState<string | null>(null);
  const [showPersonAdvisory, setShowPersonAdvisory] = React.useState(false);
  const [selectedAdvisory, setSelectedAdvisory] = React.useState<string | null>(null);
  const [showProfileForm, setShowProfileForm] = React.useState(false);
  
  // Form states for Personal profile
  const [fullName, setFullName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [city, setCity] = React.useState('');
  
  // Form states for Real Estate profile
  const [companyName, setCompanyName] = React.useState('');
  const [cuit, setCuit] = React.useState('');
  const [officeAddress, setOfficeAddress] = React.useState('');
  const [website, setWebsite] = React.useState('');
  
  // Form states for Broker profile
  const [dni, setDni] = React.useState('');
  const [license, setLicense] = React.useState('');
  const [operationZone, setOperationZone] = React.useState('');
  
  // Onboarding states for Real Estate profile
  const [showRealEstateOnboarding, setShowRealEstateOnboarding] = React.useState(false);
  const [onboardingStep, setOnboardingStep] = React.useState(1);
  const [usageIntent, setUsageIntent] = React.useState<string | null>(null);
  const [mainGoal, setMainGoal] = React.useState<string | null>(null);
  const [teamSize, setTeamSize] = React.useState<string | null>(null);

  // Onboarding states for Broker profile
  const [showBrokerOnboarding, setShowBrokerOnboarding] = React.useState(false);
  const [brokerOnboardingStep, setBrokerOnboardingStep] = React.useState(1);
  const [brokerRole, setBrokerRole] = React.useState<string | null>(null);
  const [brokerFocus, setBrokerFocus] = React.useState<string | null>(null);
  const [brokerExperience, setBrokerExperience] = React.useState<string | null>(null);

  // Completion/Loading states
  const [showCompletion, setShowCompletion] = React.useState(false);
  const [completionProfile, setCompletionProfile] = React.useState<'real-estate' | 'broker' | null>(null);
  
  // Login error states
  const [loginError, setLoginError] = React.useState(false);
  const [emailFormatError, setEmailFormatError] = React.useState(false);

  const googleAccounts = [
    { name: 'María Pérez', email: 'maria.perez@gmail.com' },
    { name: 'Juan Gómez', email: 'juan.gomez@gmail.com' },
  ];

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleGoogleAccountSelect = (account: { name: string; email: string }) => {
    setShowGoogleSelector(false);
    if (activeTab === 'register') {
      // Guardar cuenta y mostrar onboarding igual que con email/contraseña
      setPendingGoogleAccount(account);
      setFullName(account.name);
      setShowProfileSelection(true);
    } else {
      if (onSelectGoogleAccount) onSelectGoogleAccount(account);
    }
  };

  // Auto-redirect after completion modal
  React.useEffect(() => {
    if (showCompletion && completionProfile) {
      // Si viene de Google, registrar el login (sin navegar, el timeout maneja eso)
      if (pendingGoogleAccount && onSelectGoogleAccount) {
        onSelectGoogleAccount(pendingGoogleAccount, true);
      }
      const timer = setTimeout(() => {
        if (completionProfile === 'real-estate') {
          onNavigate('real-estate-dashboard');
        } else if (completionProfile === 'broker') {
          onNavigate('broker-dashboard');
        }
      }, 3500); // 3.5 seconds

      return () => clearTimeout(timer);
    }
  }, [showCompletion, completionProfile, onNavigate]);

  // Limpiar errores cuando el usuario cambia de tab o modifica los campos
  React.useEffect(() => {
    setLoginError(false);
    setEmailFormatError(false);
  }, [activeTab, email, password]);

  const validateEmailFormat = (emailToValidate: string): boolean => {
    // Validar que tenga @
    if (!emailToValidate.includes('@')) {
      return false;
    }

    // Detectar errores comunes de tipeo en dominios
    const commonTypos = ['.con', '.cmo', '.ocm', '.comm'];
    const hasTypo = commonTypos.some(typo => emailToValidate.toLowerCase().endsWith(typo));
    
    if (hasTypo) {
      return false;
    }

    // Validación básica de estructura de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailToValidate);
  };

  const handleEmailSubmit = () => {
    if (activeTab === 'login') {
      // Primero validar formato del email
      if (!validateEmailFormat(email)) {
        setEmailFormatError(true);
        setLoginError(false);
        return;
      }

      // Validar contraseña
      if (password.length < 6) {
        setLoginError(true);
        setEmailFormatError(false);
        return;
      }
      
      // Login exitoso: simular usuario logueado y usar el mismo flujo que Google
      setLoginError(false);
      setEmailFormatError(false);
      if (onSelectGoogleAccount) {
        onSelectGoogleAccount({ 
          name: email.split('@')[0], // Usar parte del email como nombre
          email: email 
        });
      }
    } else {
      // Cuando el usuario se registra, mostrar la selección de perfil
      setShowProfileSelection(true);
    }
  };

  const handleBackToRegister = () => {
    setShowProfileSelection(false);
    setSelectedProfile(null);
  };

  const handleProfileContinue = () => {
    if (selectedProfile) {
      if (selectedProfile === 'person') {
        // Si es perfil Personal, mostrar la pregunta de acción
        setShowPersonAction(true);
        setShowProfileSelection(false);
      } else {
        // Para Inmobiliaria y Broker, mostrar el formulario de perfil directamente
        setShowProfileForm(true);
        setShowProfileSelection(false);
      }
    }
  };

  const handleBackToProfileSelection = () => {
    setShowPersonAction(false);
    setShowProfileSelection(true);
    setSelectedAction(null);
  };

  const handleBackToPersonAction = () => {
    setShowProfileForm(false);
    setShowPersonAdvisory(true);
  };

  const handleBackToProfileSelectionFromForm = () => {
    setShowProfileForm(false);
    setShowProfileSelection(true);
  };

  const handleActionContinue = () => {
    if (selectedAction) {
      // Mostrar pregunta de experiencia
      setShowPersonExperience(true);
      setShowPersonAction(false);
    }
  };

  const handleExperienceContinue = () => {
    if (selectedExperience) {
      // Mostrar pregunta de asesoría
      setShowPersonAdvisory(true);
      setShowPersonExperience(false);
    }
  };

  const handleAdvisoryContinue = () => {
    if (selectedAdvisory) {
      // Mostrar formulario de perfil personal
      setShowProfileForm(true);
      setShowPersonAdvisory(false);
    }
  };

  const handleBackToAction = () => {
    setShowPersonExperience(false);
    setShowPersonAction(true);
    setSelectedExperience(null);
  };

  const handleBackToExperience = () => {
    setShowPersonAdvisory(false);
    setShowPersonExperience(true);
    setSelectedAdvisory(null);
  };

  const handleBackToAdvisory = () => {
    setShowProfileForm(false);
    setShowPersonAdvisory(true);
  };

  const handleProfileFormSubmit = () => {
    if (selectedProfile === 'person') {
      // Si viene de Google, registrar el login (sin navegar, onNavigate lo maneja)
      if (pendingGoogleAccount && onSelectGoogleAccount) {
        onSelectGoogleAccount(pendingGoogleAccount, true);
      }
      onNavigate('person-dashboard');
    } else if (selectedProfile === 'real-estate') {
      setShowRealEstateOnboarding(true);
      setShowProfileForm(false);
    } else if (selectedProfile === 'broker') {
      setShowBrokerOnboarding(true);
      setShowProfileForm(false);
    }
  };

  const handleOnboardingContinue = () => {
    if (onboardingStep === 1 && usageIntent) {
      setOnboardingStep(2);
    } else if (onboardingStep === 2 && mainGoal) {
      setOnboardingStep(3);
    } else if (onboardingStep === 3 && teamSize) {
      // Mostrar modal de completado
      setShowRealEstateOnboarding(false);
      setShowCompletion(true);
      setCompletionProfile('real-estate');
    }
  };

  const handleOnboardingSkip = () => {
    // Mostrar modal de completado
    setShowRealEstateOnboarding(false);
    setShowCompletion(true);
    setCompletionProfile('real-estate');
  };

  const handleOnboardingBack = () => {
    if (onboardingStep === 1) {
      // Volver al formulario de datos
      setShowRealEstateOnboarding(false);
      setShowProfileForm(true);
      setOnboardingStep(1);
    } else if (onboardingStep === 2) {
      setOnboardingStep(1);
    } else if (onboardingStep === 3) {
      setOnboardingStep(2);
    }
  };

  const handleBrokerOnboardingContinue = () => {
    if (brokerOnboardingStep === 1 && brokerRole) {
      setBrokerOnboardingStep(2);
    } else if (brokerOnboardingStep === 2 && brokerFocus) {
      setBrokerOnboardingStep(3);
    } else if (brokerOnboardingStep === 3 && brokerExperience) {
      // Mostrar modal de completado
      setShowBrokerOnboarding(false);
      setShowCompletion(true);
      setCompletionProfile('broker');
    }
  };

  const handleBrokerOnboardingSkip = () => {
    // Mostrar modal de completado
    setShowBrokerOnboarding(false);
    setShowCompletion(true);
    setCompletionProfile('broker');
  };

  const handleBrokerOnboardingBack = () => {
    if (brokerOnboardingStep === 1) {
      // Volver al formulario de datos
      setShowBrokerOnboarding(false);
      setShowProfileForm(true);
      setBrokerOnboardingStep(1);
    } else if (brokerOnboardingStep === 2) {
      setBrokerOnboardingStep(1);
    } else if (brokerOnboardingStep === 3) {
      setBrokerOnboardingStep(2);
    }
  };

  const profiles = [
    { id: 'person', label: 'Personal', description: 'Comprar y/o vender parcelas de forma directa' },
    { id: 'real-estate', label: 'Inmobiliaria', description: 'Gestiono múltiples propiedades o proyectos' },
    { id: 'broker', label: 'Broker', description: 'Intermedio entre compradores y vendedores' },
  ];

  const actions = [
    { id: 'buy', label: 'Comprar una parcela', description: 'Quiero buscar y comprar parcelas' },
    { id: 'sell', label: 'Vender mi parcela', description: 'Quiero publicar mi propiedad para venderla' },
    { id: 'both', label: 'Ambas cosas', description: 'Quiero comprar y vender parcelas' },
  ];

  const experienceLevels = [
    { id: 'experienced', label: 'Sí, ya tengo experiencia', description: 'He comprado o vendido parcelas antes' },
    { id: 'some-experience', label: 'Tengo algo de experiencia', description: 'Conozco el proceso pero necesito orientación' },
    { id: 'first-time', label: 'No, es mi primera vez', description: 'Es mi primera experiencia con parcelas' },
  ];

  const advisoryOptions = [
    { id: 'yes', label: 'Sí, me gustaría recibir asesoría', description: 'Quiero acompañamiento profesional durante el proceso' },
    { id: 'maybe', label: 'Tal vez más adelante', description: 'Prefiero evaluar esta opción en el futuro' },
    { id: 'no', label: 'No, prefiero gestionarlo por mi cuenta', description: 'Me siento cómodo avanzando de forma independiente' },
  ];

  const handleForgotPasswordSubmit = () => {
    // Simular envío de email
    setPasswordResetSent(true);
  };

  const closeForgotPasswordModal = () => {
    setShowForgotPassword(false);
    setForgotPasswordEmail('');
    setPasswordResetSent(false);
  };

  return (
    <div className="min-h-screen relative">
      {/* Background image */}
      <img 
        src={entryBackground}
        alt="Fondo"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      
      {/* Overlay suave para mejor legibilidad */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] z-0"></div>

      {/* Header con logo */}
      <header className="relative z-10 pt-8 pb-2">
        <div className="max-w-7xl mx-auto px-6">
          <img src={logo} alt="CompraTuParcela" className="h-32 mx-auto mb-4" />
        </div>
      </header>

      {/* Contenido principal */}
      <div className="relative z-10 flex items-center justify-center px-6 py-4">
        <div className="w-full max-w-md">
          {/* Card principal */}
          <div className="bg-white/95 backdrop-blur-sm p-10 shadow-[0_20px_80px_rgba(0,0,0,0.25)] rounded-[24px] border border-white/20">
            
            {/* Tabs */}
            <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-full">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2.5 px-4 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'login'
                    ? 'bg-white shadow-sm text-black'
                    : 'text-gray-600 hover:text-black'
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Ingresar
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-2.5 px-4 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'register'
                    ? 'bg-white shadow-sm text-black'
                    : 'text-gray-600 hover:text-black'
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Crear cuenta
              </button>
            </div>

            {/* Título y descripción */}
            <div className="text-center space-y-2 mb-8">
              <h1 style={{ color: '#0A0A0A', fontFamily: 'Montserrat, sans-serif', fontSize: '32px', fontWeight: 600, lineHeight: '1.2' }}>
                {activeTab === 'login' ? 'Ingresa a tu cuenta' : 'Crea tu cuenta'}
              </h1>
              <p className="text-gray-600" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '16px', fontWeight: 300, lineHeight: '1.5' }}>
                {activeTab === 'login' 
                  ? 'Continúa donde lo dejaste' 
                  : 'Es rápido y sin costo'}
              </p>
            </div>

            {/* Formulario de login */}
            {activeTab === 'login' && (
              <div className="space-y-4">
                {/* Email Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif' }}>
                    Email <span style={{ color: '#0A0A0A' }}>*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-white border-2 py-3 px-4 rounded-lg text-black placeholder:text-gray-400 focus:outline-none transition-colors"
                    style={{ 
                      fontFamily: 'Inter, sans-serif', 
                      fontSize: '16px',
                      borderColor: (loginError || emailFormatError) ? 'var(--error)' : '#D1D5DB'
                    }}
                  />
                  {/* Error message - Email format */}
                  {emailFormatError && (
                    <p 
                      className="text-sm"
                      style={{ 
                        color: 'var(--error)', 
                        fontFamily: 'Inter, sans-serif',
                        marginTop: '8px'
                      }}
                    >
                      El formato del email no es correcto. Revisá que esté bien escrito (ej: usuario@email.com).
                    </p>
                  )}
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif' }}>
                    Contraseña <span style={{ color: '#0A0A0A' }}>*</span>
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-white border-2 py-3 px-4 rounded-lg text-black placeholder:text-gray-400 focus:outline-none transition-colors"
                    style={{ 
                      fontFamily: 'Inter, sans-serif', 
                      fontSize: '16px',
                      borderColor: loginError ? 'var(--error)' : '#D1D5DB'
                    }}
                  />
                  {/* Error message - Credentials */}
                  {loginError && !emailFormatError && (
                    <p 
                      className="text-sm"
                      style={{ 
                        color: 'var(--error)', 
                        fontFamily: 'Inter, sans-serif',
                        marginTop: '8px'
                      }}
                    >
                      Email o contraseña incorrectos. Verificá tus datos e intentá nuevamente.
                    </p>
                  )}
                </div>

                {/* Forgot password */}
                <div className="text-right">
                  <button
                    className="text-sm text-gray-600 hover:text-black transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                    onClick={() => setShowForgotPassword(true)}
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                {/* Primary CTA */}
                <button
                  onClick={handleEmailSubmit}
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    backgroundColor: '#006B4E'
                  }}
                  className="w-full h-12 text-white px-6 text-base leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center shadow-sm"
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#01533E'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
                >
                  Ingresar
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4 py-2">
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span className="text-sm text-gray-500" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                    o
                  </span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                {/* Google Button */}
                <button
                  onClick={() => setShowGoogleSelector(true)}
                  className="w-full h-12 bg-white hover:bg-gray-50 border-2 border-gray-300 hover:border-gray-400 text-black px-6 text-base leading-[1.5] font-medium rounded-[200px] transition-all flex items-center justify-center gap-3 shadow-sm"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.8055 10.2292C19.8055 9.55156 19.7501 8.86719 19.6323 8.19531H10.2002V12.0492H15.6014C15.3734 13.2911 14.6571 14.3898 13.6175 15.0875V17.5867H16.8294C18.7171 15.8447 19.8055 13.2728 19.8055 10.2292Z" fill="#4285F4"/>
                    <path d="M10.2002 20.0008C12.9527 20.0008 15.2726 19.1053 16.8363 17.5867L13.6244 15.0875C12.7429 15.6977 11.6129 16.0436 10.2071 16.0436C7.5463 16.0436 5.28849 14.2831 4.50641 11.9086H1.20312V14.4836C2.79925 17.6555 6.33929 20.0008 10.2002 20.0008Z" fill="#34A853"/>
                    <path d="M4.49958 11.9086C4.05958 10.6667 4.05958 9.33801 4.49958 8.09613V5.52109H1.20312C-0.400937 8.73801 -0.400937 12.2667 1.20312 15.4836L4.49958 11.9086Z" fill="#FBBC04"/>
                    <path d="M10.2002 3.95891C11.6823 3.93719 13.1089 4.47266 14.1902 5.45891L17.0317 2.61735C15.1863 0.890469 12.7361 -0.0488281 10.2002 -0.0214844C6.33929 -0.0214844 2.79925 2.32391 1.20312 5.52109L4.49958 8.09613C5.27483 5.71485 7.53958 3.95891 10.2002 3.95891Z" fill="#EA4335"/>
                  </svg>
                  Ingresar con Google
                </button>
              </div>
            )}

            {/* Formulario de registro */}
            {activeTab === 'register' && (
              <div className="space-y-4">
                {/* Email Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif' }}>
                    Email <span style={{ color: '#0A0A0A' }}>*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    required
                    className="w-full bg-white border-2 border-gray-300 focus:border-black py-3 px-4 rounded-lg text-black placeholder:text-gray-400 focus:outline-none transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px' }}
                  />
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif' }}>
                    Contraseña <span style={{ color: '#0A0A0A' }}>*</span>
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    required
                    className="w-full bg-white border-2 border-gray-300 focus:border-black py-3 px-4 rounded-lg text-black placeholder:text-gray-400 focus:outline-none transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px' }}
                  />
                </div>

                {/* Confirm Password Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif' }}>
                    Confirmar contraseña <span style={{ color: '#0A0A0A' }}>*</span>
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full bg-white border-2 border-gray-300 focus:border-black py-3 px-4 rounded-lg text-black placeholder:text-gray-400 focus:outline-none transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px' }}
                  />
                </div>

                {/* Primary CTA */}
                <button
                  onClick={handleEmailSubmit}
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    backgroundColor: '#006B4E'
                  }}
                  className="w-full h-12 text-white px-6 text-base leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center shadow-sm mt-6"
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#01533E'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
                >
                  Registrarme
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4 py-2">
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span className="text-sm text-gray-500" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                    o
                  </span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                {/* Google Button */}
                <button
                  onClick={() => setShowGoogleSelector(true)}
                  className="w-full h-12 bg-white hover:bg-gray-50 border-2 border-gray-300 hover:border-gray-400 text-black px-6 text-base leading-[1.5] font-medium rounded-[200px] transition-all flex items-center justify-center gap-3 shadow-sm"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.8055 10.2292C19.8055 9.55156 19.7501 8.86719 19.6323 8.19531H10.2002V12.0492H15.6014C15.3734 13.2911 14.6571 14.3898 13.6175 15.0875V17.5867H16.8294C18.7171 15.8447 19.8055 13.2728 19.8055 10.2292Z" fill="#4285F4"/>
                    <path d="M10.2002 20.0008C12.9527 20.0008 15.2726 19.1053 16.8363 17.5867L13.6244 15.0875C12.7429 15.6977 11.6129 16.0436 10.2071 16.0436C7.5463 16.0436 5.28849 14.2831 4.50641 11.9086H1.20312V14.4836C2.79925 17.6555 6.33929 20.0008 10.2002 20.0008Z" fill="#34A853"/>
                    <path d="M4.49958 11.9086C4.05958 10.6667 4.05958 9.33801 4.49958 8.09613V5.52109H1.20312C-0.400937 8.73801 -0.400937 12.2667 1.20312 15.4836L4.49958 11.9086Z" fill="#FBBC04"/>
                    <path d="M10.2002 3.95891C11.6823 3.93719 13.1089 4.47266 14.1902 5.45891L17.0317 2.61735C15.1863 0.890469 12.7361 -0.0488281 10.2002 -0.0214844C6.33929 -0.0214844 2.79925 2.32391 1.20312 5.52109L4.49958 8.09613C5.27483 5.71485 7.53958 3.95891 10.2002 3.95891Z" fill="#EA4335"/>
                  </svg>
                  Continuar con Google
                </button>
              </div>
            )}
          </div>

          {/* Nota de seguridad */}
          <p className="text-center text-xs text-white mt-6" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
            Al continuar, aceptas nuestros términos de servicio y política de privacidad
          </p>
        </div>
      </div>

      {/* Google Account Selector Modal */}
      {showGoogleSelector && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8" style={{ borderColor: '#CDD8DE', border: '1px solid' }}>
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
              {googleAccounts.map((account, index) => (
                <button
                  key={index}
                  onClick={() => handleGoogleAccountSelect(account)}
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

            {/* Botón Cancelar */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setShowGoogleSelector(false)}
                className="text-sm hover:text-black font-medium transition-colors"
                style={{ color: '#737373', fontFamily: 'var(--font-body)' }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="bg-white w-full max-w-md rounded-[24px] shadow-[0_20px_80px_rgba(0,0,0,0.3)] overflow-hidden">
            
            {!passwordResetSent ? (
              <>
                {/* Modal Header */}
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-xl font-semibold mb-1" style={{ color: '#0A0A0A', fontFamily: 'Montserrat, sans-serif' }}>
                    Recuperar contraseña
                  </h3>
                  <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
                    Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña
                  </p>
                </div>

                {/* Email Input */}
                <div className="p-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif' }}>
                      Email <span style={{ color: '#0A0A0A' }}>*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="tu@email.com"
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                      required
                      className="w-full bg-white border-2 border-gray-300 focus:border-black py-3 px-4 rounded-lg text-black placeholder:text-gray-400 focus:outline-none transition-colors"
                      style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px' }}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="p-6 border-t border-gray-200 flex gap-3">
                  <button
                    onClick={closeForgotPasswordModal}
                    className="flex-1 h-12 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-black px-6 text-base leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleForgotPasswordSubmit}
                    disabled={!forgotPasswordEmail}
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      backgroundColor: forgotPasswordEmail ? '#006B4E' : undefined
                    }}
                    className="flex-1 h-12 text-white px-6 text-base leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    onMouseEnter={(e) => { if (forgotPasswordEmail) e.currentTarget.style.backgroundColor = '#01533E'; }}
                    onMouseLeave={(e) => { if (forgotPasswordEmail) e.currentTarget.style.backgroundColor = '#006B4E'; }}
                  >
                    Enviar enlace
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Success State */}
                <div className="p-8 text-center">
                  {/* Icon de éxito */}
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3" style={{ color: '#0A0A0A', fontFamily: 'Montserrat, sans-serif' }}>
                    Enlace enviado
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, lineHeight: '1.6' }}>
                    Te enviamos un enlace de recuperación a:
                  </p>
                  
                  <p className="text-base font-medium mb-6" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif' }}>
                    {forgotPasswordEmail}
                  </p>
                  
                  <p className="text-sm text-gray-600 mb-6" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, lineHeight: '1.6' }}>
                    Revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.
                  </p>

                  <button
                    onClick={closeForgotPasswordModal}
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      backgroundColor: '#006B4E'
                    }}
                    className="w-full h-12 text-white px-6 text-base leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center shadow-sm"
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#01533E'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
                  >
                    Entendido
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Profile Selection Modal */}
      {showProfileSelection && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="bg-white/95 backdrop-blur-sm w-full max-w-2xl rounded-[24px] shadow-[0_20px_80px_rgba(0,0,0,0.3)] p-10">
            {/* Back Button */}
            <button
              onClick={handleBackToRegister}
              className="flex items-center gap-2 text-sm mb-6"
              style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Atrás
            </button>

            {/* Header */}
            <div className="mb-8">
              <h1 style={{ color: '#0A0A0A', fontFamily: 'Montserrat, sans-serif', fontSize: '32px', fontWeight: 600, lineHeight: '1.2', marginBottom: '12px' }}>
                ¿Qué tipo de cuenta quieres crear?
              </h1>
              <p className="text-gray-600" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '16px', fontWeight: 300, lineHeight: '1.5' }}>
                Selecciona la opción que mejor se adapte a cómo usarás CompraTuParcela.
              </p>
            </div>

            {/* Profile Options */}
            <div className="space-y-4 mb-8">
              {profiles.map((profile) => (
                <button
                  key={profile.id}
                  onClick={() => setSelectedProfile(profile.id)}
                  className={`w-full text-left p-5 border-2 rounded-lg transition-all ${
                    selectedProfile === profile.id
                      ? 'border-black bg-gray-50'
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Radio Button Visual */}
                    <div className="mt-0.5">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedProfile === profile.id ? 'border-black' : 'border-gray-400'
                        }`}
                      >
                        {selectedProfile === profile.id && (
                          <div className="w-3 h-3 rounded-full bg-black"></div>
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold mb-1" style={{ color: '#0A0A0A', fontFamily: 'Montserrat, sans-serif', fontSize: '18px' }}>
                        {profile.label}
                      </div>
                      <div className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 300 }}>
                        {profile.description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Continue Button */}
            <button
              onClick={handleProfileContinue}
              disabled={!selectedProfile}
              style={{ 
                fontFamily: 'Inter, sans-serif',
                backgroundColor: selectedProfile ? '#006B4E' : '#E5E5E5'
              }}
              className={`w-full h-12 px-6 text-base leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center shadow-sm ${
                selectedProfile
                  ? 'text-white'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
              onMouseEnter={(e) => { if (selectedProfile) e.currentTarget.style.backgroundColor = '#01533E'; }}
              onMouseLeave={(e) => { if (selectedProfile) e.currentTarget.style.backgroundColor = '#006B4E'; }}
            >
              Continuar
            </button>
          </div>
        </div>
      )}

      {/* Person Action Selection Modal */}
      {showPersonAction && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="bg-white/95 backdrop-blur-sm w-full max-w-2xl rounded-[24px] shadow-[0_20px_80px_rgba(0,0,0,0.3)] p-10">
            {/* Back Button */}
            <button
              onClick={handleBackToProfileSelection}
              className="flex items-center gap-2 text-sm mb-6"
              style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Atrás
            </button>

            {/* Header */}
            <div className="mb-8">
              <h1 style={{ color: '#0A0A0A', fontFamily: 'Montserrat, sans-serif', fontSize: '32px', fontWeight: 600, lineHeight: '1.2', marginBottom: '12px' }}>
                ¿Qué quieres hacer?
              </h1>
              <p className="text-gray-600" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '16px', fontWeight: 300, lineHeight: '1.5' }}>
                Selecciona la acción que deseas realizar con tu cuenta personal.
              </p>
            </div>

            {/* Action Options */}
            <div className="space-y-4 mb-8">
              {actions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => setSelectedAction(action.id)}
                  className={`w-full text-left p-5 border-2 rounded-lg transition-all ${
                    selectedAction === action.id
                      ? 'border-black bg-gray-50'
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Radio Button Visual */}
                    <div className="mt-0.5">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedAction === action.id ? 'border-black' : 'border-gray-400'
                        }`}
                      >
                        {selectedAction === action.id && (
                          <div className="w-3 h-3 rounded-full bg-black"></div>
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold mb-1" style={{ color: '#0A0A0A', fontFamily: 'Montserrat, sans-serif', fontSize: '18px' }}>
                        {action.label}
                      </div>
                      <div className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 300 }}>
                        {action.description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Continue Button */}
            <button
              onClick={handleActionContinue}
              disabled={!selectedAction}
              style={{ 
                fontFamily: 'Inter, sans-serif',
                backgroundColor: selectedAction ? '#006B4E' : '#E5E5E5'
              }}
              className={`w-full h-12 px-6 text-base leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center shadow-sm ${
                selectedAction
                  ? 'text-white'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
              onMouseEnter={(e) => { if (selectedAction) e.currentTarget.style.backgroundColor = '#01533E'; }}
              onMouseLeave={(e) => { if (selectedAction) e.currentTarget.style.backgroundColor = '#006B4E'; }}
            >
              Continuar
            </button>
          </div>
        </div>
      )}

      {/* Person Experience Level Modal */}
      {showPersonExperience && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="bg-white/95 backdrop-blur-sm w-full max-w-2xl rounded-[24px] shadow-[0_20px_80px_rgba(0,0,0,0.3)] p-10">
            {/* Back Button */}
            <button
              onClick={handleBackToAction}
              className="flex items-center gap-2 text-sm mb-6"
              style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Atrás
            </button>

            {/* Header */}
            <div className="mb-8">
              <h1 style={{ color: '#0A0A0A', fontFamily: 'Montserrat, sans-serif', fontSize: '32px', fontWeight: 600, lineHeight: '1.2', marginBottom: '12px' }}>
                ¿Tenés experiencia comprando o vendiendo parcelas?
              </h1>
              <p className="text-gray-600" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '16px', fontWeight: 300, lineHeight: '1.5' }}>
                Esto nos ayuda a personalizar tu experiencia en la plataforma.
              </p>
            </div>

            {/* Experience Options */}
            <div className="space-y-4 mb-8">
              {experienceLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setSelectedExperience(level.id)}
                  className={`w-full text-left p-5 border-2 rounded-lg transition-all ${
                    selectedExperience === level.id
                      ? 'border-black bg-gray-50'
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Radio Button Visual */}
                    <div className="mt-0.5">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedExperience === level.id ? 'border-black' : 'border-gray-400'
                        }`}
                      >
                        {selectedExperience === level.id && (
                          <div className="w-3 h-3 rounded-full bg-black"></div>
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold mb-1" style={{ color: '#0A0A0A', fontFamily: 'Montserrat, sans-serif', fontSize: '18px' }}>
                        {level.label}
                      </div>
                      <div className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 300 }}>
                        {level.description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Continue Button */}
            <button
              onClick={handleExperienceContinue}
              disabled={!selectedExperience}
              style={{ 
                fontFamily: 'Inter, sans-serif',
                backgroundColor: selectedExperience ? '#006B4E' : '#E5E5E5'
              }}
              className={`w-full h-12 px-6 text-base leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center shadow-sm ${
                selectedExperience
                  ? 'text-white'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
              onMouseEnter={(e) => { if (selectedExperience) e.currentTarget.style.backgroundColor = '#01533E'; }}
              onMouseLeave={(e) => { if (selectedExperience) e.currentTarget.style.backgroundColor = '#006B4E'; }}
            >
              Continuar
            </button>
          </div>
        </div>
      )}

      {/* Person Advisory Modal */}
      {showPersonAdvisory && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="bg-white/95 backdrop-blur-sm w-full max-w-2xl rounded-[24px] shadow-[0_20px_80px_rgba(0,0,0,0.3)] p-10">
            {/* Back Button */}
            <button
              onClick={handleBackToExperience}
              className="flex items-center gap-2 text-sm mb-6"
              style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Atrás
            </button>

            {/* Header */}
            <div className="mb-8">
              <h1 style={{ color: '#0A0A0A', fontFamily: 'Montserrat, sans-serif', fontSize: '32px', fontWeight: 600, lineHeight: '1.2', marginBottom: '12px' }}>
                ¿Te gustaría contar con asesoría durante el proceso?
              </h1>
              <p className="text-gray-600" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '16px', fontWeight: 300, lineHeight: '1.5' }}>
                Podés solicitarla más adelante si lo necesitás.
              </p>
            </div>

            {/* Advisory Options */}
            <div className="space-y-4 mb-8">
              {advisoryOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedAdvisory(option.id)}
                  className={`w-full text-left p-5 border-2 rounded-lg transition-all ${
                    selectedAdvisory === option.id
                      ? 'border-black bg-gray-50'
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Radio Button Visual */}
                    <div className="mt-0.5">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedAdvisory === option.id ? 'border-black' : 'border-gray-400'
                        }`}
                      >
                        {selectedAdvisory === option.id && (
                          <div className="w-3 h-3 rounded-full bg-black"></div>
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold mb-1" style={{ color: '#0A0A0A', fontFamily: 'Montserrat, sans-serif', fontSize: '18px' }}>
                        {option.label}
                      </div>
                      <div className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 300 }}>
                        {option.description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Continue Button */}
            <button
              onClick={handleAdvisoryContinue}
              disabled={!selectedAdvisory}
              style={{ 
                fontFamily: 'Inter, sans-serif',
                backgroundColor: selectedAdvisory ? '#006B4E' : '#E5E5E5'
              }}
              className={`w-full h-12 px-6 text-base leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center shadow-sm ${
                selectedAdvisory
                  ? 'text-white'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
              onMouseEnter={(e) => { if (selectedAdvisory) e.currentTarget.style.backgroundColor = '#01533E'; }}
              onMouseLeave={(e) => { if (selectedAdvisory) e.currentTarget.style.backgroundColor = '#006B4E'; }}
            >
              Continuar
            </button>
          </div>
        </div>
      )}

      {/* Profile Form Modal */}
      {showProfileForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="bg-white/95 backdrop-blur-sm w-full max-w-2xl rounded-[24px] shadow-[0_20px_80px_rgba(0,0,0,0.3)] p-10">
            {/* Back Button */}
            {selectedProfile === 'person' ? (
              <button
                onClick={handleBackToPersonAction}
                className="flex items-center gap-2 text-sm mb-6"
                style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Atrás
              </button>
            ) : (
              <button
                onClick={handleBackToProfileSelectionFromForm}
                className="flex items-center gap-2 text-sm mb-6"
                style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Atrás
              </button>
            )}

            {/* Header */}
            <div className="mb-8">
              <h1 style={{ color: '#0A0A0A', fontFamily: 'Montserrat, sans-serif', fontSize: '32px', fontWeight: 600, lineHeight: '1.2', marginBottom: '12px' }}>
                {selectedProfile === 'person' && 'Completa tu perfil'}
                {selectedProfile === 'real-estate' && 'Datos de la inmobiliaria'}
                {selectedProfile === 'broker' && 'Datos del broker'}
              </h1>
              <p className="text-gray-600 mb-4" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 300, lineHeight: '1.5' }}>
                {selectedProfile === 'person' && 'Perfil: Personal'}
                {selectedProfile === 'real-estate' && 'Perfil: Inmobiliaria'}
                {selectedProfile === 'broker' && 'Perfil: Broker'}
              </p>
              {selectedProfile === 'person' && (
                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                  <p className="text-gray-700" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 300, lineHeight: '1.6' }}>
                    Estos datos son opcionales. Puedes completarlos ahora o después desde tu perfil. Tu cuenta te permite tanto comprar como vender parcelas.
                  </p>
                </div>
              )}
              {selectedProfile === 'real-estate' && (
                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                  <p className="text-gray-700" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 300, lineHeight: '1.6' }}>
                    Configura el perfil de tu inmobiliaria. Podrás gestionar publicaciones y equipo desde un solo lugar.
                  </p>
                </div>
              )}
              {selectedProfile === 'broker' && (
                <div className="bg-gray-100 p-4 rounded-lg mb-6 flex items-start gap-3">
                  <svg className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-700" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 300, lineHeight: '1.6' }}>
                    Como broker, intermedias entre compradores y vendedores. No publicas inventario propio.
                  </p>
                </div>
              )}
            </div>

            {/* Formulario de perfil */}
            {selectedProfile === 'person' && (
              <div className="space-y-4">
                {/* Full Name Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif' }}>
                    Nombre completo <span style={{ color: '#0A0A0A' }}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Juan Pérez González"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full bg-white border-2 border-gray-300 focus:border-black py-3 px-4 rounded-lg text-black placeholder:text-gray-400 focus:outline-none transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px' }}
                  />
                </div>

                {/* Phone Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif' }}>
                    Teléfono <span style={{ color: '#0A0A0A' }}>*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+56 9 1234 5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full bg-white border-2 border-gray-300 focus:border-black py-3 px-4 rounded-lg text-black placeholder:text-gray-400 focus:outline-none transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px' }}
                  />
                </div>

                {/* City Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif' }}>
                    Región o comuna <span style={{ color: '#0A0A0A' }}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Región Metropolitana, Santiago"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="w-full bg-white border-2 border-gray-300 focus:border-black py-3 px-4 rounded-lg text-black placeholder:text-gray-400 focus:outline-none transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px' }}
                  />
                </div>
              </div>
            )}

            {selectedProfile === 'real-estate' && (
              <div className="space-y-4">
                {/* Company Name Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif' }}>
                    Nombre de la inmobiliaria <span style={{ color: '#0A0A0A' }}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Inmobiliaria Los Andes"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    className="w-full bg-white border-2 border-gray-300 focus:border-black py-3 px-4 rounded-lg text-black placeholder:text-gray-400 focus:outline-none transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px' }}
                  />
                </div>

                {/* RUT Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif' }}>
                    RUT de la empresa <span style={{ color: '#0A0A0A' }}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="76.123.456-7"
                    value={cuit}
                    onChange={(e) => setCuit(e.target.value)}
                    required
                    className="w-full bg-white border-2 border-gray-300 focus:border-black py-3 px-4 rounded-lg text-black placeholder:text-gray-400 focus:outline-none transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px' }}
                  />
                </div>

                {/* Phone Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif' }}>
                    Teléfono de contacto <span style={{ color: '#0A0A0A' }}>*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+56 2 2345 6789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full bg-white border-2 border-gray-300 focus:border-black py-3 px-4 rounded-lg text-black placeholder:text-gray-400 focus:outline-none transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px' }}
                  />
                </div>

                {/* Office Address Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif' }}>
                    Dirección de oficina <span style={{ color: '#0A0A0A' }}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Av. Providencia 1234, Providencia"
                    value={officeAddress}
                    onChange={(e) => setOfficeAddress(e.target.value)}
                    required
                    className="w-full bg-white border-2 border-gray-300 focus:border-black py-3 px-4 rounded-lg text-black placeholder:text-gray-400 focus:outline-none transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px' }}
                  />
                </div>

                {/* Region/City Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif' }}>
                    Región o comuna <span style={{ color: '#0A0A0A' }}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Región Metropolitana, Santiago"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="w-full bg-white border-2 border-gray-300 focus:border-black py-3 px-4 rounded-lg text-black placeholder:text-gray-400 focus:outline-none transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px' }}
                  />
                </div>

                {/* Website Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif' }}>
                    Sitio web <span style={{ color: '#0A0A0A' }}>*</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://www.inmobiliarialosandes.cl"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    required
                    className="w-full bg-white border-2 border-gray-300 focus:border-black py-3 px-4 rounded-lg text-black placeholder:text-gray-400 focus:outline-none transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px' }}
                  />
                </div>
              </div>
            )}

            {selectedProfile === 'broker' && (
              <div className="space-y-4">
                {/* Full Name Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif' }}>
                    Nombre completo <span style={{ color: '#0A0A0A' }}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Juan Pérez González"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full bg-white border-2 border-gray-300 focus:border-black py-3 px-4 rounded-lg text-black placeholder:text-gray-400 focus:outline-none transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px' }}
                  />
                </div>

                {/* RUT Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif' }}>
                    RUT <span style={{ color: '#0A0A0A' }}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="12.345.678-9"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    required
                    className="w-full bg-white border-2 border-gray-300 focus:border-black py-3 px-4 rounded-lg text-black placeholder:text-gray-400 focus:outline-none transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px' }}
                  />
                </div>

                {/* Phone Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif' }}>
                    Teléfono <span style={{ color: '#0A0A0A' }}>*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+56 9 1234 5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full bg-white border-2 border-gray-300 focus:border-black py-3 px-4 rounded-lg text-black placeholder:text-gray-400 focus:outline-none transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px' }}
                  />
                </div>

                {/* License Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif' }}>
                    Matrícula profesional <span style={{ color: '#0A0A0A' }}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="MAT-12345"
                    value={license}
                    onChange={(e) => setLicense(e.target.value)}
                    required
                    className="w-full bg-white border-2 border-gray-300 focus:border-black py-3 px-4 rounded-lg text-black placeholder:text-gray-400 focus:outline-none transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px' }}
                  />
                </div>

                {/* Operation Zone Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif' }}>
                    Zona de operación <span style={{ color: '#0A0A0A' }}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Región Metropolitana, Santiago"
                    value={operationZone}
                    onChange={(e) => setOperationZone(e.target.value)}
                    required
                    className="w-full bg-white border-2 border-gray-300 focus:border-black py-3 px-4 rounded-lg text-black placeholder:text-gray-400 focus:outline-none transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px' }}
                  />
                </div>
              </div>
            )}

            {/* Continue Button */}
            <button
              onClick={handleProfileFormSubmit}
              style={{ 
                fontFamily: 'Inter, sans-serif',
                backgroundColor: '#006B4E'
              }}
              className="w-full h-12 px-6 text-base leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center shadow-sm text-white mt-6"
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#01533E'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
            >
              {selectedProfile === 'real-estate' && 'Finalizar registro'}
              {selectedProfile === 'broker' && 'Finalizar registro'}
              {selectedProfile === 'person' && 'Continuar'}
            </button>
          </div>
        </div>
      )}

      {/* Real Estate Onboarding Modal */}
      {showRealEstateOnboarding && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="bg-white/95 backdrop-blur-sm w-full max-w-2xl rounded-[24px] shadow-[0_20px_80px_rgba(0,0,0,0.3)] p-10">
            {/* Back Button */}
            <button
              onClick={handleOnboardingBack}
              className="flex items-center gap-2 text-sm mb-6"
              style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Atrás
            </button>

            {/* Step Indicator */}
            <div className="text-center mb-6">
              <p className="text-sm text-gray-500" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                Paso {onboardingStep} de 3
              </p>
            </div>

            {/* Onboarding Steps */}
            {onboardingStep === 1 && (
              <div>
                <h1 style={{ color: '#0A0A0A', fontFamily: 'Montserrat, sans-serif', fontSize: '32px', fontWeight: 600, lineHeight: '1.2', marginBottom: '16px' }}>
                  ¿Cómo piensas usar CompraTuParcela?
                </h1>
                <p className="text-gray-600 mb-8" style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 300, lineHeight: '1.5' }}>
                  Elige la opción que mejor te represente.
                </p>
                <div className="space-y-3 mb-8">
                  <button
                    onClick={() => setUsageIntent('few')}
                    className={`w-full text-left p-5 border-2 rounded-lg transition-all ${
                      usageIntent === 'few'
                        ? 'border-black bg-gray-50'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="mt-0.5">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            usageIntent === 'few' ? 'border-black' : 'border-gray-400'
                          }`}
                        >
                          {usageIntent === 'few' && (
                            <div className="w-3 h-3 rounded-full bg-black"></div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 400 }}>
                          Publicar pocas propiedades
                        </div>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => setUsageIntent('many')}
                    className={`w-full text-left p-5 border-2 rounded-lg transition-all ${
                      usageIntent === 'many'
                        ? 'border-black bg-gray-50'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="mt-0.5">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            usageIntent === 'many' ? 'border-black' : 'border-gray-400'
                          }`}
                        >
                          {usageIntent === 'many' && (
                            <div className="w-3 h-3 rounded-full bg-black"></div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 400 }}>
                          Gestionar varias propiedades
                        </div>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => setUsageIntent('evaluate')}
                    className={`w-full text-left p-5 border-2 rounded-lg transition-all ${
                      usageIntent === 'evaluate'
                        ? 'border-black bg-gray-50'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="mt-0.5">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            usageIntent === 'evaluate' ? 'border-black' : 'border-gray-400'
                          }`}
                        >
                          {usageIntent === 'evaluate' && (
                            <div className="w-3 h-3 rounded-full bg-black"></div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 400 }}>
                          Evaluar la plataforma primero
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {onboardingStep === 2 && (
              <div>
                <h1 style={{ color: '#0A0A0A', fontFamily: 'Montserrat, sans-serif', fontSize: '32px', fontWeight: 600, lineHeight: '1.2', marginBottom: '16px' }}>
                  ¿Cuál es tu objetivo principal hoy?
                </h1>
                <p className="text-gray-600 mb-8" style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 300, lineHeight: '1.5' }}>
                  Vamos a organizar el panel según esto.
                </p>
                <div className="space-y-3 mb-8">
                  <button
                    onClick={() => setMainGoal('inventory')}
                    className={`w-full text-left p-5 border-2 rounded-lg transition-all ${
                      mainGoal === 'inventory'
                        ? 'border-black bg-gray-50'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="mt-0.5">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            mainGoal === 'inventory' ? 'border-black' : 'border-gray-400'
                          }`}
                        >
                          {mainGoal === 'inventory' && (
                            <div className="w-3 h-3 rounded-full bg-black"></div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 400 }}>
                          Publicar inventario
                        </div>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => setMainGoal('contacts')}
                    className={`w-full text-left p-5 border-2 rounded-lg transition-all ${
                      mainGoal === 'contacts'
                        ? 'border-black bg-gray-50'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="mt-0.5">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            mainGoal === 'contacts' ? 'border-black' : 'border-gray-400'
                          }`}
                        >
                          {mainGoal === 'contacts' && (
                            <div className="w-3 h-3 rounded-full bg-black"></div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 400 }}>
                          Gestionar contactos y consultas
                        </div>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => setMainGoal('visibility')}
                    className={`w-full text-left p-5 border-2 rounded-lg transition-all ${
                      mainGoal === 'visibility'
                        ? 'border-black bg-gray-50'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="mt-0.5">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            mainGoal === 'visibility' ? 'border-black' : 'border-gray-400'
                          }`}
                        >
                          {mainGoal === 'visibility' && (
                            <div className="w-3 h-3 rounded-full bg-black"></div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 400 }}>
                          Dar visibilidad a mis propiedades
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {onboardingStep === 3 && (
              <div>
                <h1 style={{ color: '#0A0A0A', fontFamily: 'Montserrat, sans-serif', fontSize: '32px', fontWeight: 600, lineHeight: '1.2', marginBottom: '16px' }}>
                  ¿Cómo gestionarás tus propiedades?
                </h1>
                <p className="text-gray-600 mb-8" style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 300, lineHeight: '1.5' }}>
                  Esto nos ayuda a adaptar las herramientas a tu equipo de trabajo.
                </p>
                <div className="space-y-3 mb-8">
                  <button
                    onClick={() => setTeamSize('alone')}
                    className={`w-full text-left p-5 border-2 rounded-lg transition-all ${
                      teamSize === 'alone'
                        ? 'border-black bg-gray-50'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="mt-0.5">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            teamSize === 'alone' ? 'border-black' : 'border-gray-400'
                          }`}
                        >
                          {teamSize === 'alone' && (
                            <div className="w-3 h-3 rounded-full bg-black"></div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 400 }}>
                          La voy a usar solo/a
                        </div>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => setTeamSize('multiple')}
                    className={`w-full text-left p-5 border-2 rounded-lg transition-all ${
                      teamSize === 'multiple'
                        ? 'border-black bg-gray-50'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="mt-0.5">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            teamSize === 'multiple' ? 'border-black' : 'border-gray-400'
                          }`}
                        >
                          {teamSize === 'multiple' && (
                            <div className="w-3 h-3 rounded-full bg-black"></div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 400 }}>
                          La usamos entre varias personas
                        </div>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => setTeamSize('unsure')}
                    className={`w-full text-left p-5 border-2 rounded-lg transition-all ${
                      teamSize === 'unsure'
                        ? 'border-black bg-gray-50'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="mt-0.5">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            teamSize === 'unsure' ? 'border-black' : 'border-gray-400'
                          }`}
                        >
                          {teamSize === 'unsure' && (
                            <div className="w-3 h-3 rounded-full bg-black"></div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 400 }}>
                          Todavía no lo sé
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Continue Button */}
            <button
              onClick={handleOnboardingContinue}
              disabled={
                (onboardingStep === 1 && !usageIntent) ||
                (onboardingStep === 2 && !mainGoal) ||
                (onboardingStep === 3 && !teamSize)
              }
              style={{ 
                fontFamily: 'Inter, sans-serif',
                backgroundColor: ((onboardingStep === 1 && usageIntent) ||
                (onboardingStep === 2 && mainGoal) ||
                (onboardingStep === 3 && teamSize)) ? '#006B4E' : '#E5E5E5'
              }}
              className={`w-full h-12 px-6 text-base leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center shadow-sm ${
                ((onboardingStep === 1 && usageIntent) ||
                (onboardingStep === 2 && mainGoal) ||
                (onboardingStep === 3 && teamSize))
                  ? 'text-white'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
              onMouseEnter={(e) => { 
                if ((onboardingStep === 1 && usageIntent) ||
                    (onboardingStep === 2 && mainGoal) ||
                    (onboardingStep === 3 && teamSize)) {
                  e.currentTarget.style.backgroundColor = '#01533E';
                }
              }}
              onMouseLeave={(e) => { 
                if ((onboardingStep === 1 && usageIntent) ||
                    (onboardingStep === 2 && mainGoal) ||
                    (onboardingStep === 3 && teamSize)) {
                  e.currentTarget.style.backgroundColor = '#006B4E';
                }
              }}
            >
              Continuar
            </button>

            {/* Skip Link */}
            <div className="text-center mt-4">
              <button
                onClick={handleOnboardingSkip}
                className="text-base text-gray-600 hover:text-black transition-colors underline"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              >
                Omitir por ahora
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Broker Onboarding Modal */}
      {showBrokerOnboarding && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="bg-white/95 backdrop-blur-sm w-full max-w-2xl rounded-[24px] shadow-[0_20px_80px_rgba(0,0,0,0.3)] p-10">
            {/* Back Button */}
            <button
              onClick={handleBrokerOnboardingBack}
              className="flex items-center gap-2 text-sm mb-6"
              style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Atrás
            </button>

            {/* Step Indicator */}
            <div className="text-center mb-6">
              <p className="text-sm text-gray-500" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                Paso {brokerOnboardingStep} de 3
              </p>
            </div>

            {/* Onboarding Steps */}
            {brokerOnboardingStep === 1 && (
              <div>
                <h1 style={{ color: '#0A0A0A', fontFamily: 'Montserrat, sans-serif', fontSize: '32px', fontWeight: 600, lineHeight: '1.2', marginBottom: '16px' }}>
                  ¿Cuál es tu rol principal dentro de la plataforma?
                </h1>
                <p className="text-gray-600 mb-8" style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 300, lineHeight: '1.5' }}>
                  Esto nos permite mostrarte las herramientas adecuadas.
                </p>
                <div className="space-y-3 mb-8">
                  <button
                    onClick={() => setBrokerRole('intermediary')}
                    className={`w-full text-left p-5 border-2 rounded-lg transition-all ${
                      brokerRole === 'intermediary'
                        ? 'border-black bg-gray-50'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="mt-0.5">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            brokerRole === 'intermediary' ? 'border-black' : 'border-gray-400'
                          }`}
                        >
                          {brokerRole === 'intermediary' && (
                            <div className="w-3 h-3 rounded-full bg-black"></div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 400 }}>
                          Intermediar operaciones
                        </div>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => setBrokerRole('leads')}
                    className={`w-full text-left p-5 border-2 rounded-lg transition-all ${
                      brokerRole === 'leads'
                        ? 'border-black bg-gray-50'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="mt-0.5">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            brokerRole === 'leads' ? 'border-black' : 'border-gray-400'
                          }`}
                        >
                          {brokerRole === 'leads' && (
                            <div className="w-3 h-3 rounded-full bg-black"></div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 400 }}>
                          Gestionar leads y contactos
                        </div>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => setBrokerRole('explore')}
                    className={`w-full text-left p-5 border-2 rounded-lg transition-all ${
                      brokerRole === 'explore'
                        ? 'border-black bg-gray-50'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="mt-0.5">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            brokerRole === 'explore' ? 'border-black' : 'border-gray-400'
                          }`}
                        >
                          {brokerRole === 'explore' && (
                            <div className="w-3 h-3 rounded-full bg-black"></div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 400 }}>
                          Explorar oportunidades
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {brokerOnboardingStep === 2 && (
              <div>
                <h1 style={{ color: '#0A0A0A', fontFamily: 'Montserrat, sans-serif', fontSize: '32px', fontWeight: 600, lineHeight: '1.2', marginBottom: '16px' }}>
                  ¿En qué te enfocarás primero?
                </h1>
                <p className="text-gray-600 mb-8" style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 300, lineHeight: '1.5' }}>
                  Puedes cambiar tu enfoque en cualquier momento.
                </p>
                <div className="space-y-3 mb-8">
                  <button
                    onClick={() => setBrokerFocus('contacts')}
                    className={`w-full text-left p-5 border-2 rounded-lg transition-all ${
                      brokerFocus === 'contacts'
                        ? 'border-black bg-gray-50'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="mt-0.5">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            brokerFocus === 'contacts' ? 'border-black' : 'border-gray-400'
                          }`}
                        >
                          {brokerFocus === 'contacts' && (
                            <div className="w-3 h-3 rounded-full bg-black"></div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 400 }}>
                          Contactos
                        </div>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => setBrokerFocus('opportunities')}
                    className={`w-full text-left p-5 border-2 rounded-lg transition-all ${
                      brokerFocus === 'opportunities'
                        ? 'border-black bg-gray-50'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="mt-0.5">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            brokerFocus === 'opportunities' ? 'border-black' : 'border-gray-400'
                          }`}
                        >
                          {brokerFocus === 'opportunities' && (
                            <div className="w-3 h-3 rounded-full bg-black"></div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 400 }}>
                          Oportunidades
                        </div>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => setBrokerFocus('tracking')}
                    className={`w-full text-left p-5 border-2 rounded-lg transition-all ${
                      brokerFocus === 'tracking'
                        ? 'border-black bg-gray-50'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="mt-0.5">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            brokerFocus === 'tracking' ? 'border-black' : 'border-gray-400'
                          }`}
                        >
                          {brokerFocus === 'tracking' && (
                            <div className="w-3 h-3 rounded-full bg-black"></div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 400 }}>
                          Seguimiento
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {brokerOnboardingStep === 3 && (
              <div>
                <h1 style={{ color: '#0A0A0A', fontFamily: 'Montserrat, sans-serif', fontSize: '32px', fontWeight: 600, lineHeight: '1.2', marginBottom: '16px' }}>
                  ¿Qué experiencia tienes como broker?
                </h1>
                <p className="text-gray-600 mb-8" style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 300, lineHeight: '1.5' }}>
                  Nos ayuda a adaptar la plataforma a tu nivel de experiencia.
                </p>
                <div className="space-y-3 mb-8">
                  <button
                    onClick={() => setBrokerExperience('beginner')}
                    className={`w-full text-left p-5 border-2 rounded-lg transition-all ${
                      brokerExperience === 'beginner'
                        ? 'border-black bg-gray-50'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="mt-0.5">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            brokerExperience === 'beginner' ? 'border-black' : 'border-gray-400'
                          }`}
                        >
                          {brokerExperience === 'beginner' && (
                            <div className="w-3 h-3 rounded-full bg-black"></div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 400 }}>
                          Estoy empezando y necesito guía
                        </div>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => setBrokerExperience('intermediate')}
                    className={`w-full text-left p-5 border-2 rounded-lg transition-all ${
                      brokerExperience === 'intermediate'
                        ? 'border-black bg-gray-50'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="mt-0.5">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            brokerExperience === 'intermediate' ? 'border-black' : 'border-gray-400'
                          }`}
                        >
                          {brokerExperience === 'intermediate' && (
                            <div className="w-3 h-3 rounded-full bg-black"></div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 400 }}>
                          Tengo experiencia intermediar operaciones
                        </div>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => setBrokerExperience('advanced')}
                    className={`w-full text-left p-5 border-2 rounded-lg transition-all ${
                      brokerExperience === 'advanced'
                        ? 'border-black bg-gray-50'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="mt-0.5">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            brokerExperience === 'advanced' ? 'border-black' : 'border-gray-400'
                          }`}
                        >
                          {brokerExperience === 'advanced' && (
                            <div className="w-3 h-3 rounded-full bg-black"></div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 400 }}>
                          Tengo mucha experiencia y trabajo de forma autónoma
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Continue Button */}
            <button
              onClick={handleBrokerOnboardingContinue}
              disabled={
                (brokerOnboardingStep === 1 && !brokerRole) ||
                (brokerOnboardingStep === 2 && !brokerFocus) ||
                (brokerOnboardingStep === 3 && !brokerExperience)
              }
              style={{ 
                fontFamily: 'Inter, sans-serif',
                backgroundColor: ((brokerOnboardingStep === 1 && brokerRole) ||
                (brokerOnboardingStep === 2 && brokerFocus) ||
                (brokerOnboardingStep === 3 && brokerExperience)) ? '#006B4E' : '#E5E5E5'
              }}
              className={`w-full h-12 px-6 text-base leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center shadow-sm ${
                ((brokerOnboardingStep === 1 && brokerRole) ||
                (brokerOnboardingStep === 2 && brokerFocus) ||
                (brokerOnboardingStep === 3 && brokerExperience))
                  ? 'text-white'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
              onMouseEnter={(e) => { 
                if ((brokerOnboardingStep === 1 && brokerRole) ||
                    (brokerOnboardingStep === 2 && brokerFocus) ||
                    (brokerOnboardingStep === 3 && brokerExperience)) {
                  e.currentTarget.style.backgroundColor = '#01533E';
                }
              }}
              onMouseLeave={(e) => { 
                if ((brokerOnboardingStep === 1 && brokerRole) ||
                    (brokerOnboardingStep === 2 && brokerFocus) ||
                    (brokerOnboardingStep === 3 && brokerExperience)) {
                  e.currentTarget.style.backgroundColor = '#006B4E';
                }
              }}
            >
              Continuar
            </button>

            {/* Skip Link */}
            <div className="text-center mt-4">
              <button
                onClick={handleBrokerOnboardingSkip}
                className="text-base text-gray-600 hover:text-black transition-colors underline"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              >
                Omitir por ahora
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Completion/Loading Modal */}
      {showCompletion && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="bg-white/95 backdrop-blur-sm w-full max-w-md rounded-[24px] shadow-[0_20px_80px_rgba(0,0,0,0.3)] p-10">
            
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full border-4 border-black flex items-center justify-center">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#0A0A0A' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-center mb-4" style={{ color: '#0A0A0A', fontFamily: 'Montserrat, sans-serif', fontSize: '32px', fontWeight: 600, lineHeight: '1.2' }}>
              ¡Todo listo!
            </h1>

            {/* Description */}
            <p className="text-center text-gray-600 mb-6" style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 300, lineHeight: '1.5' }}>
              Tu cuenta está configurada. Ahora puedes empezar a usar CompraTuParcela.
            </p>

            {/* Info Box */}
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <p className="text-center text-gray-700" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 300, lineHeight: '1.6' }}>
                Estamos preparando tu portal. En unos segundos serás redirigido automáticamente.
              </p>
            </div>

            {/* Loading Spinner */}
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}