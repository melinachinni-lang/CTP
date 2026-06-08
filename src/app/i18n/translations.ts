export type Language = 'es' | 'en';
export type Currency = 'CLP' | 'USD' | 'ARS' | 'UYU' | 'EUR';

export interface Translations {
  nav: {
    home: string; explore: string; listings: string; saved: string;
    inquiries: string; calendarios: string; compare: string; purchases: string;
    plan: string; help: string; settings: string; myAccount: string; signOut: string;
    parcelas: string; inmobiliarias: string; howItWorks: string; resources: string;
    publishProperty: string; publishShort: string; login: string;
  };
  common: {
    viewDetail: string; save: string; publish: string; pause: string; edit: string;
    view: string; search: string; filters: string; sortBy: string; from: string;
    available: string; area: string; download: string; type: string; date: string;
    amount: string; status: string; parcela: string; parcelas: string; project: string;
    rolAprobado: string; caminoEjecutado: string; listoEscritura: string;
    portonAcceso: string; factibilidadAgua: string;
    reservation: string; purchase: string; paymentMethod: string;
    allDates: string; availableLabel: string; noData: string;
    addToCompare: string; removeFromCompare: string;
  };
  status: {
    disponible: string; reservada: string; reservandose: string;
    aprobada: string; rechazada: string; activa: string; pausada: string;
    pendiente: string; aprobado: string; rechazado: string;
    preventa: string; enConstruccion: string; planosAprobados: string; lanzamiento: string;
  };
  purchases: {
    title: string; subtitle: string; viewDetail: string; backToList: string;
    operationTracking: string; operationRejected: string; operationRejectedDesc: string;
    paymentHistory: string; noPayments: string;
    dateCol: string; amountCol: string; statusCol: string; methodCol: string;
    documentation: string; noDocuments: string;
    operationSummary: string; operationType: string; parcelaLabel: string;
    parcelReservation: string; parcelPurchase: string;
    reservationType: string; purchaseType: string;
    msg_reservandose: string; msg_reservada: string; msg_aprobada: string; msg_rechazada: string;
  };
  explore: {
    includeProjects: string; parcelTag: string; projectTag: string;
    noResults: string; loadMore: string; loadingMore: string; sortBy: string;
    viewMap: string; viewList: string; surface: string; from: string;
    disponibles: string;
    pageTitle: string; pageSubtitle: string;
    noParcelasFound: string; noParcelasFoundDesc: string;
    parcelasFoundSuffix: string;
    projectsTitle: string; projectsDesc: string; viewAllProjects: string;
  };
  filters: {
    location: string; area: string; condition: string; priceRange: string;
    search: string; smartSearch: string;
    smartSearchPlaceholder: string; smartSearchDesc: string; close: string;
    all: string; yes: string; no: string;
    metropolitan: string; valparaiso: string; biobio: string; araucania: string;
    losLagos: string; losRios: string; maule: string; ohiggins: string;
    coquimbo: string; atacama: string; antofagasta: string; tarapaca: string;
    arica: string; aysen: string; magallanes: string;
    upTo5k: string; from5to10k: string; from1to5ha: string;
    from5to10ha: string; from10to50ha: string; more50ha: string;
    firstOwner: string; secondOwner: string; thirdOwner: string; fourthOwner: string;
    upTo10m: string; from10to30m: string; from30to50m: string;
    from50to100m: string; from100to200m: string; more200m: string;
    relevance: string; mostRecent: string; priceLow: string; priceHigh: string;
    areaLow: string; areaHigh: string;
    badgeNature: string; badgeWater: string; badgeInvestment: string;
    badgeAccess: string; badgeServices: string;
    searchParcels: string; suggestions: string; applySearch: string;
    applyFilters: string; clearFilters: string;
    parcelType: string; typeResidential: string; typeAgricultural: string;
    typeForestry: string; typeMixed: string;
  };
  home: {
    heroTitle: string; heroSubtitle: string;
    featuredTitle: string; featuredSubtitle: string; viewAllParcels: string;
    from: string;
    advisoryTitle: string; advisorySubtitle: string; moreInfo: string; talkToAdvisor: string;
    projectsTitle: string; projectsSubtitle: string; projectFrom: string;
    stepsTitle: string; stepsSubtitle: string;
    step1Title: string; step1Desc: string;
    step2Title: string; step2Desc: string;
    step3Title: string; step3Desc: string;
    platformTitle: string; platformSubtitle: string;
    buyersTitle: string; buyersDesc: string; buyersBtn: string;
    ownersTitle: string; ownersDesc: string; ownersBtn: string;
    inmobiliariasTitle: string; inmobiliariasDesc: string; inmobiliariasBtn: string;
    brokersTitle: string; brokersDesc: string; brokersBtn: string;
    blogTitle: string; blogSubtitle: string; viewAllArticles: string;
    ctaTitle: string; ctaSubtitle: string; exploreParcels: string; createAccount: string; ctaNote: string;
    footerDesc: string;
    footerExplore: string; footerPlatform: string; footerSupport: string;
    footerHowItWorks: string; footerPublish: string; footerPlans: string; footerBrokers: string;
    footerTerms: string; footerPrivacy: string; footerContact: string; footerCopyright: string;
    footerBlog: string;
    tabInmobiliarias: string; tabBrokers: string; viewAllFemale: string; viewAllMale: string;
    publishModalTitle: string; publishModalDesc: string;
    createAccountBtn: string; loginBtn: string; publishModalNote: string;
    errorTitle: string; errorDesc: string; backToHome: string; retry: string;
    blogCat1: string; blogCat2: string; blogCat3: string;
    blogTitle1: string; blogTitle2: string; blogTitle3: string;
    blogDesc1: string; blogDesc2: string; blogDesc3: string;
    blogDate1: string; blogDate2: string; blogDate3: string;
    socialTitle: string; socialSubtitle: string; socialFollow: string;
    contactTitle: string; contactPhone: string; contactHours: string; contactHoursValue: string;
    budgetTitle: string; budgetDesc: string; budgetTotal: string; budgetParams: string;
    budgetDownPayment: string; budgetDownPaymentDetail: string;
    budgetTerm: string; budgetTermYears: string;
    budgetInterestRate: string; budgetMonthlyPayment: string;
    budgetPerYears: string; budgetApply: string; budgetNote: string;
  };
  selector: {
    language: string; currency: string; spanish: string; english: string;
    clp: string; usd: string; ars: string; uyu: string; eur: string;
  };
}

const es: Translations = {
  nav: {
    home: 'Inicio', explore: 'Explorar parcelas', listings: 'Mis publicaciones',
    saved: 'Guardados', inquiries: 'Consultas', calendarios: 'Calendarios',
    compare: 'Comparar', purchases: 'Mis compras', plan: 'Plan y límites',
    help: 'Ayuda', settings: 'Configuración', myAccount: 'Mi cuenta', signOut: 'Cerrar sesión',
    parcelas: 'Parcelas', inmobiliarias: 'Inmobiliarias',
    howItWorks: 'Cómo funciona', resources: 'Recursos',
    publishProperty: 'Publicar propiedad', publishShort: 'Publicar', login: 'Ingresar',
  },
  common: {
    viewDetail: 'Ver detalle', save: 'Guardar', publish: 'Publicar', pause: 'Pausar',
    edit: 'Editar', view: 'Ver', search: 'Buscar', filters: 'Filtros',
    sortBy: 'Ordenar por', from: 'Desde', available: 'Disponibles', area: 'Superficie',
    download: 'Descargar', type: 'Tipo', date: 'Fecha', amount: 'Monto',
    status: 'Estado', parcela: 'Parcela', parcelas: 'parcelas', project: 'Proyecto',
    rolAprobado: 'Rol aprobado', caminoEjecutado: 'Camino ejecutado', listoEscritura: 'Listo escritura',
    portonAcceso: 'Portón acceso', factibilidadAgua: 'Factibilidad agua',
    reservation: 'Reserva', purchase: 'Compra', paymentMethod: 'Método de pago',
    allDates: 'Todas las fechas', availableLabel: 'Disponible', noData: 'Sin datos disponibles',
    addToCompare: 'Agregar al comparador', removeFromCompare: 'Quitar del comparador',
  },
  status: {
    disponible: 'Disponible', reservada: 'Reservada', reservandose: 'Reservándose',
    aprobada: 'Aprobada', rechazada: 'Rechazada', activa: 'Activa', pausada: 'Pausada',
    pendiente: 'Pendiente', aprobado: 'Aprobado', rechazado: 'Rechazado',
    preventa: 'Pre-venta iniciada', enConstruccion: 'En construcción',
    planosAprobados: 'Planos aprobados', lanzamiento: 'Lanzamiento',
  },
  purchases: {
    title: 'Mis compras',
    subtitle: 'Historial de reservas y compras, de la más reciente a la más antigua',
    viewDetail: 'Ver detalle', backToList: '← Mis compras',
    operationTracking: 'Seguimiento de la operación',
    operationRejected: 'Operación rechazada',
    operationRejectedDesc: 'El pago fue rechazado. La parcela volvió a estar disponible.',
    paymentHistory: 'Historial de pagos', noPayments: 'Sin pagos registrados',
    dateCol: 'Fecha', amountCol: 'Monto', statusCol: 'Estado', methodCol: 'Medio de pago',
    documentation: 'Documentación', noDocuments: 'Sin documentos disponibles',
    operationSummary: 'Resumen de la operación', operationType: 'Tipo de operación',
    parcelaLabel: 'Parcela', parcelReservation: 'Reserva de parcela',
    parcelPurchase: 'Compra de parcela', reservationType: 'Reserva', purchaseType: 'Compra',
    msg_reservandose: 'Tu comprobante está siendo revisado. Te notificaremos por email en un plazo de 24 horas hábiles.',
    msg_reservada: 'Tu pago fue validado. La parcela está reservada a tu nombre. El equipo se pondrá en contacto para los pasos siguientes.',
    msg_aprobada: '¡Operación aprobada! Tu compra fue confirmada exitosamente.',
    msg_rechazada: 'El pago fue rechazado. Si quieres adquirir esta parcela, puedes iniciar una nueva reserva desde el detalle de la publicación.',
  },
  explore: {
    includeProjects: 'Incluir proyectos', parcelTag: 'Parcela', projectTag: 'Proyecto',
    noResults: 'No se encontraron resultados', loadMore: 'Cargar más parcelas...',
    loadingMore: 'Cargando más parcelas...',
    sortBy: 'Ordenar por', viewMap: 'Ver mapa', viewList: 'Ver lista',
    surface: 'Superficie', from: 'Desde', disponibles: 'Disponibles',
    pageTitle: 'Parcelas en venta',
    pageSubtitle: 'Encuentra parcelas verificadas con información clara para tomar decisiones seguras',
    noParcelasFound: 'No encontramos parcelas con estos filtros',
    noParcelasFoundDesc: 'Intenta ajustar tus criterios de búsqueda o elimina algunos filtros para ver más opciones disponibles.',
    parcelasFoundSuffix: 'parcelas encontradas',
    projectsTitle: 'Proyectos disponibles',
    projectsDesc: 'Descubre desarrollos con múltiples parcelas',
    viewAllProjects: 'Ver todos los proyectos',
  },
  filters: {
    location: 'Ubicación', area: 'Superficie', condition: 'Condición', priceRange: 'Rango de precio',
    search: 'Buscar', smartSearch: 'Búsqueda inteligente',
    smartSearchPlaceholder: 'Ej: busco una parcela cerca de un lago para vivir',
    smartSearchDesc: 'Describe lo que buscas y te mostramos las parcelas que mejor se ajustan.',
    close: 'Cerrar',
    all: 'Todos', yes: 'Sí', no: 'No',
    metropolitan: 'Región Metropolitana', valparaiso: 'Valparaíso', biobio: 'Biobío',
    araucania: 'La Araucanía', losLagos: 'Los Lagos', losRios: 'Los Ríos', maule: 'Maule',
    ohiggins: "O'Higgins", coquimbo: 'Coquimbo', atacama: 'Atacama',
    antofagasta: 'Antofagasta', tarapaca: 'Tarapacá', arica: 'Arica y Parinacota',
    aysen: 'Aysén', magallanes: 'Magallanes',
    upTo5k: 'Hasta 5.000 m²', from5to10k: '5.000 - 10.000 m²',
    from1to5ha: '1 - 5 hectáreas', from5to10ha: '5 - 10 hectáreas',
    from10to50ha: '10 - 50 hectáreas', more50ha: 'Más de 50 hectáreas',
    firstOwner: 'Primer dueño', secondOwner: 'Segundo dueño',
    thirdOwner: 'Tercer dueño', fourthOwner: 'Cuarto dueño o más',
    upTo10m: 'Hasta $10.000.000', from10to30m: '$10M - $30M', from30to50m: '$30M - $50M',
    from50to100m: '$50M - $100M', from100to200m: '$100M - $200M', more200m: 'Más de $200M',
    relevance: 'Relevancia', mostRecent: 'Más recientes',
    priceLow: 'Menor precio', priceHigh: 'Mayor precio',
    areaLow: 'Menor superficie', areaHigh: 'Mayor superficie',
    badgeNature: 'Rodeado de naturaleza', badgeWater: 'Cerca de lago o río',
    badgeInvestment: 'Ideal para inversión', badgeAccess: 'Buen acceso',
    badgeServices: 'Con servicios disponibles',
    searchParcels: 'Buscar parcelas', suggestions: 'Sugerencias', applySearch: 'Aplicar búsqueda',
    applyFilters: 'Aplicar filtros', clearFilters: 'Limpiar',
    parcelType: 'Tipo de parcela', typeResidential: 'Residencial', typeAgricultural: 'Agrícola',
    typeForestry: 'Forestal', typeMixed: 'Mixta',
  },
  home: {
    heroTitle: 'Compra y vende parcelas fácilmente',
    heroSubtitle: 'Explora oportunidades reales, en un solo lugar.',
    featuredTitle: 'Parcelas destacadas',
    featuredSubtitle: 'Propiedades seleccionadas con información verificada',
    viewAllParcels: 'Ver todas las parcelas',
    from: 'Desde',
    advisoryTitle: 'Asesoría gratuita para encontrar tu parcela ideal',
    advisorySubtitle: 'Te acompañamos en la búsqueda de tu terreno ideal, analizando ubicación, presupuesto y tipo de parcela según tus objetivos.',
    moreInfo: 'Más información',
    talkToAdvisor: 'Hablar con un asesor',
    projectsTitle: 'Próximos proyectos',
    projectsSubtitle: 'Nuevos desarrollos que estarán disponibles próximamente',
    projectFrom: 'Desde',
    stepsTitle: 'Proceso claro, paso a paso',
    stepsSubtitle: 'Te acompañamos en cada etapa con información clara y respaldo profesional',
    step1Title: 'Explora con información verificada',
    step1Desc: 'Revisa parcelas y proyectos con datos completos y confiables. Filtra por ubicación, precio y características relevantes para ti.',
    step2Title: 'Conecta con profesionales',
    step2Desc: 'Comunícate con inmobiliarias y brokers verificados. Agenda visitas y resuelve dudas con asesoría especializada.',
    step3Title: 'Decide con confianza',
    step3Desc: 'Accede a recursos y herramientas para avanzar de forma informada en cada etapa del proceso de compra.',
    platformTitle: 'Una plataforma para todos',
    platformSubtitle: 'Conectamos compradores, dueños, inmobiliarias y brokers en un solo lugar',
    buyersTitle: 'Compradores',
    buyersDesc: 'Explora con información verificada y compara opciones para encontrar la parcela que se ajuste a lo que buscas.',
    buyersBtn: 'Comenzar a explorar',
    ownersTitle: 'Dueños',
    ownersDesc: 'Publica tu parcela con información clara y conecta con compradores reales interesados en tu propiedad.',
    ownersBtn: 'Publicar parcela',
    inmobiliariasTitle: 'Inmobiliarias',
    inmobiliariasDesc: 'Gestiona tus publicaciones y coordina con tu equipo desde herramientas diseñadas para tu operación.',
    inmobiliariasBtn: 'Conocer planes',
    brokersTitle: 'Brokers',
    brokersDesc: 'Conecta con nuevas oportunidades, gestiona tus contactos y accede a herramientas para aumentar tu alcance.',
    brokersBtn: 'Registrarme',
    blogTitle: 'Recursos y consejos',
    blogSubtitle: 'Información útil para compradores e inversionistas',
    viewAllArticles: 'Ver todos los artículos →',
    ctaTitle: 'Encuentra tu parcela ideal con información clara y respaldo profesional',
    ctaSubtitle: 'Únete a cientos de personas que están tomando decisiones informadas sobre su próxima propiedad',
    exploreParcels: 'Explorar parcelas',
    createAccount: 'Crear cuenta gratis',
    ctaNote: 'Sin compromiso • Explora todas las funciones • Cancela cuando quieras',
    footerDesc: 'Plataforma especializada en compra y venta de parcelas',
    footerExplore: 'Explorar', footerPlatform: 'Plataforma', footerSupport: 'Soporte',
    footerHowItWorks: 'Cómo funciona', footerPublish: 'Publicar propiedad',
    footerPlans: 'Planes para inmobiliarias', footerBrokers: 'Para brokers',
    footerTerms: 'Términos y condiciones', footerPrivacy: 'Política de privacidad',
    footerContact: 'Contacto', footerBlog: 'Blog',
    footerCopyright: '© 2026 Compra Tu Parcela. Todos los derechos reservados.',
    tabInmobiliarias: 'Inmobiliarias', tabBrokers: 'Brokers',
    viewAllFemale: 'Ver todas', viewAllMale: 'Ver todos',
    publishModalTitle: 'Para publicar tu propiedad, necesitas una cuenta',
    publishModalDesc: 'Crear una cuenta te permite gestionar tus publicaciones, recibir consultas de compradores reales y avanzar con seguridad durante todo el proceso.',
    createAccountBtn: 'Crear cuenta', loginBtn: 'Iniciar sesión',
    publishModalNote: 'Es rápido, sin compromiso y te guía paso a paso.',
    errorTitle: 'Ocurrió un problema al cargar la página',
    errorDesc: 'Hubo un problema al obtener la información. Puedes reintentar ahora o volver al inicio.',
    backToHome: 'Volver al inicio', retry: 'Reintentar',
    blogCat1: 'GUÍA DE COMPRA', blogCat2: 'INVERSIÓN', blogCat3: 'LEGAL',
    blogTitle1: 'Qué considerar antes de comprar una parcela: checklist esencial',
    blogTitle2: 'Parcelas como inversión: tendencias del mercado 2026',
    blogTitle3: 'Entendiendo los permisos de construcción en terrenos rurales',
    blogDesc1: 'Conoce los aspectos legales, técnicos y financieros que debes revisar antes de tomar tu decisión de compra.',
    blogDesc2: 'Análisis de las zonas con mayor proyección de valorización y factores que impactan el mercado inmobiliario.',
    blogDesc3: 'Guía práctica sobre regulaciones, zonificación y requisitos para construir en parcelas de agrado.',
    blogDate1: 'Hace 2 días • 5 min de lectura',
    blogDate2: 'Hace 1 semana • 8 min de lectura',
    blogDate3: 'Hace 2 semanas • 6 min de lectura',
    socialTitle: 'Síguenos en redes', socialSubtitle: 'Tips, oportunidades y novedades sobre parcelas e inversión inmobiliaria', socialFollow: 'Síguenos en',
    contactTitle: 'Contacto', contactPhone: 'Teléfono / WhatsApp',
    contactHours: 'Horario de atención', contactHoursValue: 'Lunes a Viernes, 9:00 – 18:00 hrs',
    budgetTitle: 'Calculadora de presupuesto',
    budgetDesc: 'Ingresa tu presupuesto y ajusta los parámetros para ver cuánto pagarías mensualmente',
    budgetTotal: 'Presupuesto total para la parcela',
    budgetParams: 'Parámetros del crédito',
    budgetDownPayment: 'Pie inicial',
    budgetDownPaymentDetail: 'Pie: {pie} • Crédito: {credito}',
    budgetTerm: 'Plazo del crédito', budgetTermYears: 'años',
    budgetInterestRate: 'Tasa de interés anual',
    budgetMonthlyPayment: 'Cuota mensual aproximada',
    budgetPerYears: 'cuotas',
    budgetApply: 'Aplicar configuración',
    budgetNote: 'Este cálculo es referencial. Las condiciones reales dependen de tu institución financiera.',
  },
  selector: {
    language: 'Idioma', currency: 'Moneda', spanish: 'Español', english: 'English',
    clp: 'CLP — Peso chileno', usd: 'USD — Dólar', ars: 'ARS — Peso argentino', uyu: 'UYU — Peso uruguayo', eur: 'EUR — Euro',
  },
};

const en: Translations = {
  nav: {
    home: 'Home', explore: 'Explore parcels', listings: 'My listings',
    saved: 'Saved', inquiries: 'Inquiries', calendarios: 'Calendars',
    compare: 'Compare', purchases: 'My purchases', plan: 'Plan & limits',
    help: 'Help', settings: 'Settings', myAccount: 'My account', signOut: 'Sign out',
    parcelas: 'Parcels', inmobiliarias: 'Real estate agencies',
    howItWorks: 'How it works', resources: 'Resources',
    publishProperty: 'List your property', publishShort: 'List', login: 'Log in',
  },
  common: {
    viewDetail: 'View detail', save: 'Save', publish: 'Publish', pause: 'Pause',
    edit: 'Edit', view: 'View', search: 'Search', filters: 'Filters',
    sortBy: 'Sort by', from: 'From', available: 'Available', area: 'Area',
    download: 'Download', type: 'Type', date: 'Date', amount: 'Amount',
    status: 'Status', parcela: 'Parcel', parcelas: 'parcels', project: 'Project',
    rolAprobado: 'Approved deed roll', caminoEjecutado: 'Road built', listoEscritura: 'Deed ready',
    portonAcceso: 'Access gate', factibilidadAgua: 'Water study',
    reservation: 'Reservation', purchase: 'Purchase', paymentMethod: 'Payment method',
    allDates: 'All dates', availableLabel: 'Available', noData: 'No data available',
    addToCompare: 'Add to compare', removeFromCompare: 'Remove from compare',
  },
  status: {
    disponible: 'Available', reservada: 'Reserved', reservandose: 'Being reserved',
    aprobada: 'Approved', rechazada: 'Rejected', activa: 'Active', pausada: 'Paused',
    pendiente: 'Pending', aprobado: 'Approved', rechazado: 'Rejected',
    preventa: 'Pre-sale started', enConstruccion: 'Under construction',
    planosAprobados: 'Plans approved', lanzamiento: 'Launch',
  },
  purchases: {
    title: 'My purchases',
    subtitle: 'History of reservations and purchases, from most recent to oldest',
    viewDetail: 'View detail', backToList: '← My purchases',
    operationTracking: 'Operation tracking',
    operationRejected: 'Operation rejected',
    operationRejectedDesc: 'Payment was rejected. The parcel is available again.',
    paymentHistory: 'Payment history', noPayments: 'No payments recorded',
    dateCol: 'Date', amountCol: 'Amount', statusCol: 'Status', methodCol: 'Payment method',
    documentation: 'Documentation', noDocuments: 'No documents available',
    operationSummary: 'Operation summary', operationType: 'Operation type',
    parcelaLabel: 'Parcel', parcelReservation: 'Parcel reservation',
    parcelPurchase: 'Parcel purchase', reservationType: 'Reservation', purchaseType: 'Purchase',
    msg_reservandose: 'Your receipt is being reviewed. We will notify you by email within 24 business hours.',
    msg_reservada: 'Your payment has been validated. The parcel is reserved in your name. The team will contact you for next steps.',
    msg_aprobada: 'Operation approved! Your purchase has been successfully confirmed.',
    msg_rechazada: 'Payment was rejected. If you want to acquire this parcel, you can start a new reservation from the listing detail.',
  },
  explore: {
    includeProjects: 'Include projects', parcelTag: 'Parcel', projectTag: 'Project',
    noResults: 'No results found', loadMore: 'Load more parcels...',
    loadingMore: 'Loading more parcels...',
    sortBy: 'Sort by', viewMap: 'View map', viewList: 'View list',
    surface: 'Area', from: 'From', disponibles: 'Available',
    pageTitle: 'Parcels for sale',
    pageSubtitle: 'Find verified parcels with clear information to make confident decisions',
    noParcelasFound: 'No parcels found with these filters',
    noParcelasFoundDesc: 'Try adjusting your search criteria or remove some filters to see more available options.',
    parcelasFoundSuffix: 'parcels found',
    projectsTitle: 'Available projects',
    projectsDesc: 'Discover developments with multiple parcels',
    viewAllProjects: 'View all projects',
  },
  filters: {
    location: 'Location', area: 'Area', condition: 'Condition', priceRange: 'Price range',
    search: 'Search', smartSearch: 'Smart search',
    smartSearchPlaceholder: 'E.g.: looking for a parcel near a lake to live',
    smartSearchDesc: 'Describe what you are looking for and we will show you the best matching parcels.',
    close: 'Close',
    all: 'All', yes: 'Yes', no: 'No',
    metropolitan: 'Metropolitan Region', valparaiso: 'Valparaíso', biobio: 'Biobío',
    araucania: 'La Araucanía', losLagos: 'Los Lagos', losRios: 'Los Ríos', maule: 'Maule',
    ohiggins: "O'Higgins", coquimbo: 'Coquimbo', atacama: 'Atacama',
    antofagasta: 'Antofagasta', tarapaca: 'Tarapacá', arica: 'Arica y Parinacota',
    aysen: 'Aysén', magallanes: 'Magallanes',
    upTo5k: 'Up to 5,000 m²', from5to10k: '5,000 - 10,000 m²',
    from1to5ha: '1 - 5 hectares', from5to10ha: '5 - 10 hectares',
    from10to50ha: '10 - 50 hectares', more50ha: 'More than 50 hectares',
    firstOwner: 'First owner', secondOwner: 'Second owner',
    thirdOwner: 'Third owner', fourthOwner: 'Fourth owner or more',
    upTo10m: 'Up to $10,000,000', from10to30m: '$10M - $30M', from30to50m: '$30M - $50M',
    from50to100m: '$50M - $100M', from100to200m: '$100M - $200M', more200m: 'More than $200M',
    relevance: 'Relevance', mostRecent: 'Most recent',
    priceLow: 'Lowest price', priceHigh: 'Highest price',
    areaLow: 'Smallest area', areaHigh: 'Largest area',
    badgeNature: 'Surrounded by nature', badgeWater: 'Near lake or river',
    badgeInvestment: 'Ideal for investment', badgeAccess: 'Good road access',
    badgeServices: 'With available utilities',
    searchParcels: 'Search parcels', suggestions: 'Suggestions', applySearch: 'Apply search',
    applyFilters: 'Apply filters', clearFilters: 'Clear',
    parcelType: 'Parcel type', typeResidential: 'Residential', typeAgricultural: 'Agricultural',
    typeForestry: 'Forestry', typeMixed: 'Mixed',
  },
  home: {
    heroTitle: 'Buy and sell parcels easily',
    heroSubtitle: 'Explore real opportunities, all in one place.',
    featuredTitle: 'Featured parcels',
    featuredSubtitle: 'Selected properties with verified information',
    viewAllParcels: 'View all parcels',
    from: 'From',
    advisoryTitle: 'Free advisory to find your ideal parcel',
    advisorySubtitle: 'We guide you in finding your ideal land, analyzing location, budget and parcel type according to your goals.',
    moreInfo: 'More information',
    talkToAdvisor: 'Talk to an advisor',
    projectsTitle: 'Upcoming projects',
    projectsSubtitle: 'New developments coming soon',
    projectFrom: 'From',
    stepsTitle: 'Clear process, step by step',
    stepsSubtitle: 'We are with you at every stage with clear information and professional support',
    step1Title: 'Explore with verified information',
    step1Desc: 'Browse parcels and projects with complete, reliable data. Filter by location, price and features relevant to you.',
    step2Title: 'Connect with professionals',
    step2Desc: 'Communicate with verified agencies and brokers. Schedule visits and get answers with specialized advisory.',
    step3Title: 'Decide with confidence',
    step3Desc: 'Access resources and tools to move forward in an informed way at every stage of the buying process.',
    platformTitle: 'A platform for everyone',
    platformSubtitle: 'Connecting buyers, owners, real estate agencies and brokers in one place',
    buyersTitle: 'Buyers',
    buyersDesc: 'Explore with verified information and compare options to find the parcel that fits what you are looking for.',
    buyersBtn: 'Start exploring',
    ownersTitle: 'Owners',
    ownersDesc: 'List your parcel with clear information and connect with real buyers interested in your property.',
    ownersBtn: 'List parcel',
    inmobiliariasTitle: 'Real estate agencies',
    inmobiliariasDesc: 'Manage your listings and coordinate with your team using tools designed for your operation.',
    inmobiliariasBtn: 'See plans',
    brokersTitle: 'Brokers',
    brokersDesc: 'Connect with new opportunities, manage your contacts and access tools to expand your reach.',
    brokersBtn: 'Sign up',
    blogTitle: 'Resources & tips',
    blogSubtitle: 'Useful information for buyers and investors',
    viewAllArticles: 'View all articles →',
    ctaTitle: 'Find your ideal parcel with clear information and professional support',
    ctaSubtitle: 'Join hundreds of people making informed decisions about their next property',
    exploreParcels: 'Explore parcels',
    createAccount: 'Create free account',
    ctaNote: 'No commitment • Explore all features • Cancel anytime',
    footerDesc: 'Specialized platform for buying and selling parcels',
    footerExplore: 'Explore', footerPlatform: 'Platform', footerSupport: 'Support',
    footerHowItWorks: 'How it works', footerPublish: 'List your property',
    footerPlans: 'Plans for agencies', footerBrokers: 'For brokers',
    footerTerms: 'Terms & conditions', footerPrivacy: 'Privacy policy',
    footerContact: 'Contact', footerBlog: 'Blog',
    footerCopyright: '© 2026 CompraTuParcela. All rights reserved.',
    tabInmobiliarias: 'Agencies', tabBrokers: 'Brokers',
    viewAllFemale: 'View all', viewAllMale: 'View all',
    publishModalTitle: 'To list your property you need an account',
    publishModalDesc: 'Creating an account lets you manage your listings, receive inquiries from real buyers and move forward securely throughout the process.',
    createAccountBtn: 'Create account', loginBtn: 'Log in',
    publishModalNote: 'Quick, no commitment and guides you step by step.',
    errorTitle: 'Something went wrong loading the page',
    errorDesc: 'There was a problem fetching the information. You can retry now or go back home.',
    backToHome: 'Back to home', retry: 'Retry',
    blogCat1: 'BUYING GUIDE', blogCat2: 'INVESTMENT', blogCat3: 'LEGAL',
    blogTitle1: 'What to consider before buying a parcel: essential checklist',
    blogTitle2: 'Parcels as investment: 2026 market trends',
    blogTitle3: 'Understanding construction permits on rural land',
    blogDesc1: 'Learn the legal, technical and financial aspects to review before making your purchase decision.',
    blogDesc2: 'Analysis of the areas with the highest appreciation potential and factors that impact the real estate market.',
    blogDesc3: 'Practical guide on regulations, zoning and requirements to build on leisure parcels.',
    blogDate1: '2 days ago • 5 min read',
    blogDate2: '1 week ago • 8 min read',
    blogDate3: '2 weeks ago • 6 min read',
    socialTitle: 'Follow us', socialSubtitle: 'Tips, opportunities and news about parcels and real estate investment', socialFollow: 'Follow us on',
    contactTitle: 'Contact', contactPhone: 'Phone / WhatsApp',
    contactHours: 'Business hours', contactHoursValue: 'Monday to Friday, 9:00 – 18:00',
    budgetTitle: 'Budget calculator',
    budgetDesc: 'Enter your budget and adjust the parameters to see your estimated monthly payment',
    budgetTotal: 'Total budget for the parcel',
    budgetParams: 'Loan parameters',
    budgetDownPayment: 'Down payment',
    budgetDownPaymentDetail: 'Down: {pie} • Loan: {credito}',
    budgetTerm: 'Loan term', budgetTermYears: 'years',
    budgetInterestRate: 'Annual interest rate',
    budgetMonthlyPayment: 'Estimated monthly payment',
    budgetPerYears: 'installments',
    budgetApply: 'Apply settings',
    budgetNote: 'This calculation is for reference only. Actual conditions depend on your financial institution.',
  },
  selector: {
    language: 'Language', currency: 'Currency', spanish: 'Español', english: 'English',
    clp: 'CLP — Chilean peso', usd: 'USD — US Dollar', ars: 'ARS — Argentine peso', uyu: 'UYU — Uruguayan peso', eur: 'EUR — Euro',
  },
};

export const translations: Record<Language, Translations> = { es, en };
