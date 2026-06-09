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
    publishedBy: string;
    vendorInmobiliaria: string; vendorBroker: string; vendorPersona: string;
    openMenu: string; previous: string; next: string;
    saveParcel: string; removeFromSaved: string; saveProject: string;
  };
  features: {
    portonAcceso: string; rolAprobado: string; factibilidadAgua: string;
    vistaCordillera: string; luzInstalada: string; pozoPropio: string;
    riegoTecnificado: string; luzTrifasica: string; enProduccion: string;
    zonaTuristica: string; sobreRuta7: string; riegoDisponible: string;
    rolAlDia: string; vistaAlLago: string; condominioCerrado: string;
    todosLosServicios: string; potencialTuristico: string;
    vertienteNatural: string; accesoAlRio: string; bosqueNativo: string;
    usoAgricola: string; aguaDisponible: string;
    altoPotencialTuristico: string; ubicacionPremium: string;
    vistaCerroCastillo: string; potencialEcoturistico: string;
  };
  inmobiliarias: {
    pageTitle: string; pageSubtitle: string;
    searchByName: string; searchPlaceholder: string;
    regionLabel: string; allRegions: string; regionMetropolitana: string;
    reviews: string; contact: string; viewAgency: string; generalInquiry: string;
  };
  recursos: {
    pageTitle: string; pageSubtitle: string;
    moreArticles: string; readLabel: string;
    featTitle: string; featExcerpt: string; featFullDesc: string;
    featCategory: string; featDate: string; featAuthor: string;
    featTag1: string; featTag2: string; featTag3: string;
    art2Title: string; art2Excerpt: string; art2Category: string; art2Date: string;
    art3Title: string; art3Excerpt: string; art3Category: string; art3Date: string;
    art4Title: string; art4Excerpt: string; art4Category: string; art4Date: string;
    art5Title: string; art5Excerpt: string; art5Category: string; art5Date: string;
    art6Title: string; art6Excerpt: string; art6Category: string; art6Date: string;
    art7Title: string; art7Excerpt: string; art7Category: string; art7Date: string;
  };
  comoFunciona: {
    pageTitle: string; pageSubtitle: string;
    stepsTitle: string; stepsSubtitle: string;
    step1Title: string; step1Desc: string;
    step2Title: string; step2Desc: string;
    step3Title: string; step3Desc: string;
    step4Title: string; step4Desc: string;
    featuresTitle: string; featuresSubtitle: string;
    feat1Title: string; feat1Desc: string; feat1Intro: string; feat1Benefits: string[]; feat1Cta: string;
    feat2Title: string; feat2Desc: string; feat2Intro: string; feat2Benefits: string[]; feat2Cta: string;
    feat3Title: string; feat3Desc: string; feat3Intro: string; feat3Benefits: string[]; feat3Cta: string;
    feat4Title: string; feat4Desc: string; feat4Intro: string; feat4Benefits: string[]; feat4Cta: string;
    feat5Title: string; feat5Desc: string; feat5Intro: string; feat5Benefits: string[]; feat5Cta: string;
    modalFeaturesTitle: string; modalStartBtn: string;
    supportTitle: string; supportSubtitle: string;
    chatTitle: string; chatDesc: string; chatHours: string;
    emailTitle: string; emailDesc: string;
    helpTitle: string; helpDesc: string; viewArticles: string;
    faqTitle: string; faqSubtitle: string;
    faq1Q: string; faq1A: string; faq2Q: string; faq2A: string;
    faq3Q: string; faq3A: string; faq4Q: string; faq4A: string;
    faq5Q: string; faq5A: string; faq6Q: string; faq6A: string;
    faq7Q: string; faq7A: string; faq8Q: string; faq8A: string;
    faq9Q: string; faq9A: string; faq10Q: string; faq10A: string;
    ctaTitle: string; ctaSubtitle: string; viewParcels: string;
  };
  status: {
    disponible: string; reservada: string; reservandose: string;
    aprobada: string; rechazada: string; activa: string; pausada: string;
    pendiente: string; aprobado: string; rechazado: string;
    preventa: string; enConstruccion: string; planosAprobados: string; lanzamiento: string;
    enVenta: string; proximamente: string;
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
    filtersTitle: string; price: string;
    minimum: string; maximum: string;
    quickFilters: string; filterFeatured: string; filterNew: string; filterLand: string; filterCertified: string;
    mainFilters: string; moreFilters: string; calculator: string;
    featuredListings: string; newListings: string;
    calculatorTitle: string; calculatorSubtitle: string;
    budgetLabel: string; monthlyPayment: string; enterBudget: string;
    zoneLabel: string; selectZone: string;
    zoneAconcagua: string; zoneCasablanca: string; zoneCordillera: string; zoneLitoral: string; zoneValleCentral: string;
    typeAgrado: string; selectType: string; calculate: string;
    searchOnMap: string; mapView: string; inDevelopment: string;
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
    footerBlog: string; footerHelp: string;
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
    sellTitle: string; sellDesc: string; sellBtn: string;
    sellCard1Title: string; sellCard1Desc: string;
    sellCard2Title: string; sellCard2Desc: string;
    sellCard3Title: string; sellCard3Desc: string;
  };
  selector: {
    language: string; currency: string; spanish: string; english: string;
    clp: string; usd: string; ars: string; uyu: string; eur: string;
  };
  chat: {
    assistantTitle: string; assistantSubtitle: string;
    welcomeMsg1: string; welcomeMsg2: string;
    whatDoYouNeed: string;
    action1: string; action2: string; action3: string; action4: string;
    cat1: string; cat2: string; cat3: string; cat4: string; cat5: string;
    selectCategory: string; describeIssue: string;
    issuePlaceholder: string; submitInquiry: string;
    ticketCreated: string; ticketNumber: string; specialistContact: string;
    responseSearch: string; responseContact: string; responsePayments: string;
    openChat: string; closeChat: string;
  };
  toast: {
    loginToSave: string; login: string;
    removedFromSaved: string; undo: string;
    limitReached: string;
    parcelSaved: string; viewSaved: string;
  };
  comparator: {
    title: string; empty: string; hint: string; explore: string;
    selected: string; selectedPlural: string;
    clear: string; view: string;
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
    publishedBy: 'Publicado por',
    vendorInmobiliaria: 'Inmobiliaria', vendorBroker: 'Broker', vendorPersona: 'Persona natural',
    openMenu: 'Abrir menú', previous: 'Anterior', next: 'Siguiente',
    saveParcel: 'Guardar parcela', removeFromSaved: 'Eliminar de guardados', saveProject: 'Guardar proyecto',
  },
  features: {
    portonAcceso: 'Portón acceso', rolAprobado: 'Rol aprobado', factibilidadAgua: 'Factibilidad agua',
    vistaCordillera: 'Vista cordillera', luzInstalada: 'Luz instalada', pozoPropio: 'Pozo propio',
    riegoTecnificado: 'Riego tecnificado', luzTrifasica: 'Luz trifásica', enProduccion: 'En producción',
    zonaTuristica: 'Zona turística', sobreRuta7: 'Sobre Ruta 7', riegoDisponible: 'Riego disponible',
    rolAlDia: 'Rol al día', vistaAlLago: 'Vista al lago', condominioCerrado: 'Condominio cerrado',
    todosLosServicios: 'Todos los servicios', potencialTuristico: 'Potencial turístico',
    vertienteNatural: 'Vertiente natural', accesoAlRio: 'Acceso al río', bosqueNativo: 'Bosque nativo',
    usoAgricola: 'Uso agrícola', aguaDisponible: 'Agua disponible',
    altoPotencialTuristico: 'Alto potencial turístico', ubicacionPremium: 'Ubicación premium',
    vistaCerroCastillo: 'Vista Cerro Castillo', potencialEcoturistico: 'Potencial ecoturístico',
  },
  recursos: {
    pageTitle: 'Recursos', pageSubtitle: 'Guías, noticias y consejos prácticos para comprar, vender e invertir en parcelas',
    moreArticles: 'Más artículos', readLabel: 'de lectura',
    featTitle: 'Guía completa para comprar tu primera parcela en Chile',
    featExcerpt: 'Todo lo que necesitas saber antes de invertir en una parcela: aspectos legales, financiamiento, permisos de construcción y errores comunes que debes evitar.',
    featFullDesc: 'Comprar una parcela es una decisión importante que requiere investigación y planificación. En esta guía completa te explicamos paso a paso todo el proceso, desde la búsqueda inicial hasta la firma de la escritura. Aprenderás a identificar terrenos con buen potencial, verificar la documentación legal, negociar el precio, y obtener el financiamiento necesario.',
    featCategory: 'Guía de compra', featDate: 'Hace 2 días', featAuthor: 'Equipo CompraTuParcela',
    featTag1: 'Compra', featTag2: 'Legal', featTag3: 'Financiamiento',
    art2Title: 'Parcelas de inversión: ¿vale la pena en 2026?',
    art2Excerpt: 'Analizamos el mercado actual de parcelas en Chile y las perspectivas de rentabilidad para inversionistas.',
    art2Category: 'Inversión', art2Date: 'Hace 5 días',
    art3Title: 'Aspectos legales que debes conocer antes de comprar',
    art3Excerpt: 'Documentación necesaria, inscripciones y trámites legales para una compra segura.',
    art3Category: 'Legal', art3Date: 'Hace 1 semana',
    art4Title: 'Cómo financiar la compra de tu parcela',
    art4Excerpt: 'Opciones de crédito hipotecario, subsidios y alternativas de financiamiento disponibles.',
    art4Category: 'Financiamiento', art4Date: 'Hace 2 semanas',
    art5Title: 'Permisos de construcción en terrenos rurales',
    art5Excerpt: 'Normativas, requisitos y proceso para obtener permisos de edificación en parcelas.',
    art5Category: 'Construcción', art5Date: 'Hace 3 semanas',
    art6Title: 'Tendencias del mercado inmobiliario rural 2026',
    art6Excerpt: 'Precios, demanda y zonas más atractivas para invertir en parcelas este año.',
    art6Category: 'Mercado', art6Date: 'Hace 1 mes',
    art7Title: 'Conectividad y servicios básicos en parcelas',
    art7Excerpt: 'Agua, luz, internet y acceso: qué preguntar antes de comprar una parcela.',
    art7Category: 'Guía de compra', art7Date: 'Hace 1 mes',
  },
  inmobiliarias: {
    pageTitle: 'Inmobiliarias', pageSubtitle: 'Encontrá inmobiliarias especializadas en parcelas y proyectos',
    searchByName: 'Buscar por nombre', searchPlaceholder: 'Ej: Patagonia Properties',
    regionLabel: 'Región / zona', allRegions: 'Todas las regiones', regionMetropolitana: 'Región Metropolitana',
    reviews: 'reseñas', contact: 'Contactar', viewAgency: 'Ver inmobiliaria', generalInquiry: 'Consulta general',
  },
  comoFunciona: {
    pageTitle: 'Cómo funciona CompraTuParcela',
    pageSubtitle: 'Publica, gestiona y vende parcelas de forma simple y segura',
    stepsTitle: 'El proceso paso a paso',
    stepsSubtitle: 'Desde crear tu publicación hasta cerrar la venta, seguí estos pasos simples',
    step1Title: 'Publica tu parcela', step1Desc: 'Completa un formulario simple con datos, fotos y ubicación. Todo en un solo lugar.',
    step2Title: 'Recibe consultas', step2Desc: 'Los interesados te contactan directamente. Cada consulta llega a tu panel en tiempo real.',
    step3Title: 'Gestiona el seguimiento', step3Desc: 'Sigue cada conversación, responde consultas y organiza visitas desde un solo lugar.',
    step4Title: 'Cierra la venta', step4Desc: 'Actualiza el estado de tu parcela y mantenla visible hasta concretar la operación.',
    featuresTitle: 'Qué puedes hacer desde la plataforma',
    featuresSubtitle: 'Todas las herramientas que necesitas para gestionar tus propiedades en un solo lugar',
    feat1Title: 'Publicaciones', feat1Desc: 'Administra tus propiedades y mantenlas actualizadas',
    feat1Intro: 'Crea y gestiona todas tus publicaciones de parcelas desde un panel centralizado.',
    feat1Benefits: ['Editor intuitivo para cargar fotos, videos y documentos', 'Campos personalizables con información clave (superficie, precio, ubicación)', 'Actualizaciones en tiempo real visibles para todos los interesados', 'Historial completo de cambios y versiones anteriores'],
    feat1Cta: 'Publica tu primera parcela en menos de 5 minutos',
    feat2Title: 'Consultas y leads', feat2Desc: 'Todos los interesados organizados en un solo lugar',
    feat2Intro: 'Centraliza todas las consultas y gestiona cada lead de forma eficiente.',
    feat2Benefits: ['Bandeja unificada con todas las conversaciones organizadas', 'Notificaciones instantáneas vía email y en la plataforma', 'Etiquetas y filtros para priorizar consultas importantes', 'Respuestas rápidas con plantillas personalizables'],
    feat2Cta: 'Nunca pierdas una oportunidad de venta',
    feat3Title: 'Rendimiento', feat3Desc: 'Visualiza métricas clave de tus publicaciones',
    feat3Intro: 'Analiza el desempeño de tus propiedades con métricas claras y accionables.',
    feat3Benefits: ['Estadísticas de visualizaciones, consultas y conversiones', 'Gráficos de tendencia para identificar patrones de interés', 'Comparativas entre propiedades para optimizar precios', 'Reportes exportables en PDF para compartir con tu equipo'],
    feat3Cta: 'Toma decisiones basadas en datos reales',
    feat4Title: 'Equipo y brokers', feat4Desc: 'Invita a tu equipo a colaborar en las ventas',
    feat4Intro: 'Colabora con tu equipo o brokers externos de forma ordenada y transparente.',
    feat4Benefits: ['Invitaciones por email con permisos personalizados', 'Asignación de consultas específicas a cada miembro', 'Visibilidad compartida del pipeline de ventas', 'Registro de actividad para seguimiento y accountability'],
    feat4Cta: 'Escala tu operación con el equipo adecuado',
    feat5Title: 'Planes y pagos', feat5Desc: 'Elige el plan que mejor se ajuste a tu operación',
    feat5Intro: 'Planes flexibles que crecen con tu negocio, sin sorpresas ni costos ocultos.',
    feat5Benefits: ['Plan gratuito para hasta 3 publicaciones activas', 'Planes escalables según volumen de propiedades', 'Pagos seguros con tarjeta o transferencia bancaria', 'Cambio de plan en cualquier momento sin penalizaciones'],
    feat5Cta: 'Comienza gratis, escala cuando lo necesites',
    modalFeaturesTitle: 'Características principales', modalStartBtn: 'Comenzar ahora',
    supportTitle: 'Ayuda y soporte', supportSubtitle: 'Nuestro equipo está listo para ayudarte cuando lo necesites',
    chatTitle: 'Chat en vivo', chatDesc: 'Conversa con nuestro equipo de soporte en tiempo real', chatHours: 'Lun - Vie: 9:00 - 18:00',
    emailTitle: 'Correo electrónico', emailDesc: 'Escríbenos y te respondemos en menos de 24 horas',
    helpTitle: 'Centro de ayuda', helpDesc: 'Encuentra respuestas en nuestra base de conocimiento', viewArticles: 'Ver artículos',
    faqTitle: 'Preguntas frecuentes', faqSubtitle: 'Resolvemos las dudas más comunes sobre cómo funciona la plataforma',
    faq1Q: '¿Necesito crear una cuenta para explorar parcelas?',
    faq1A: 'No, puedes explorar todas las parcelas disponibles sin registrarte. Para guardar favoritos, reservar o contactar vendedores necesitarás crear una cuenta gratuita — el proceso toma menos de 2 minutos.',
    faq2Q: '¿Cómo sé que la información de una parcela es confiable?',
    faq2A: 'Cada publicación pasa por un proceso de validación antes de mostrarse en la plataforma. Verificamos que los documentos legales básicos estén al día (rol de avalúo, titularidad) y que la información declarada sea consistente. Las parcelas con documentación completa se identifican claramente.',
    faq3Q: '¿Cuánto es el valor de la reserva y cómo se paga?',
    faq3A: 'El valor de la reserva es de $500.000 (UF 12,9 aproximadamente). Puedes pagar por transferencia bancaria directa o a través de un link de pago con tarjeta de crédito o débito vía Mercado Pago. Una vez confirmado el pago, la parcela queda reservada a tu nombre.',
    faq4Q: '¿Qué pasa si mi pago de reserva es rechazado o no puedo completarlo?',
    faq4A: 'Si el pago no se completa dentro de los 30 minutos del proceso de reserva, la parcela vuelve a estar disponible para otros compradores. Si fue rechazado por un problema técnico o bancario, puedes intentarlo nuevamente o contactar a nuestro equipo de soporte desde la sección "Mis compras" en tu dashboard.',
    faq5Q: '¿Puedo visitar la parcela antes de reservar?',
    faq5A: 'Sí, y te lo recomendamos. Puedes solicitar una visita directamente desde el detalle de la parcela. El vendedor o su representante se pondrá en contacto para agendar la fecha y hora que mejor te acomode, sin costo ni compromiso.',
    faq6Q: '¿La plataforma funciona para compradores desde el extranjero?',
    faq6A: 'Sí. Puedes explorar, comparar y reservar parcelas desde cualquier país. La plataforma muestra precios en CLP y USD según tu preferencia. Para completar la compra es necesario contar con RUT chileno o un representante legal en Chile. Nuestro equipo de asesoría puede orientarte en este proceso sin costo.',
    faq7Q: '¿Cuánto cuesta publicar mi parcela?',
    faq7A: 'Puedes publicar hasta 3 parcelas de forma completamente gratuita. Si necesitas publicar más o acceder a funciones avanzadas como estadísticas detalladas, publicaciones destacadas o colaboración con brokers, contamos con planes para inmobiliarias y vendedores profesionales. Sin costos ocultos.',
    faq8Q: '¿Qué documentos necesito para publicar?',
    faq8A: 'No es obligatorio subir documentos para publicar, pero te recomendamos adjuntar el título de propiedad, certificado de rol de avalúo, planos y certificados de uso de suelo. Las publicaciones con documentación completa generan más confianza y se venden considerablemente más rápido.',
    faq9Q: '¿Qué diferencia hay entre una parcela y un proyecto?',
    faq9A: 'Una parcela es una propiedad individual disponible para la venta directa. Un proyecto es un desarrollo inmobiliario que agrupa múltiples parcelas bajo una misma urbanización o parcelación, generalmente con infraestructura común y etapas de venta programadas. En ambos casos puedes explorar, comparar y reservar desde la plataforma.',
    faq10Q: '¿Cómo contacto a un asesor si necesito ayuda?',
    faq10A: 'Nuestro equipo de asesores está disponible de lunes a viernes de 9:00 a 18:00 hrs. Puedes contactarnos por WhatsApp (+569 777 14626), email (contacto@compratuparcela.cl) o usando el chat de la plataforma. Ofrecemos asesoría gratuita para compradores que necesitan orientación en el proceso.',
    ctaTitle: '¿Listo para empezar?',
    ctaSubtitle: 'Publica tu primera parcela gratis o explora las propiedades disponibles',
    viewParcels: 'Ver parcelas disponibles',
  },
  status: {
    disponible: 'Disponible', reservada: 'Reservada', reservandose: 'Reservándose',
    aprobada: 'Aprobada', rechazada: 'Rechazada', activa: 'Activa', pausada: 'Pausada',
    pendiente: 'Pendiente', aprobado: 'Aprobado', rechazado: 'Rechazado',
    preventa: 'Pre-venta iniciada', enConstruccion: 'En construcción',
    planosAprobados: 'Planos aprobados', lanzamiento: 'Lanzamiento',
    enVenta: 'En venta', proximamente: 'Próximamente',
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
    filtersTitle: 'Filtros', price: 'Precio',
    minimum: 'Mínimo', maximum: 'Máximo',
    quickFilters: 'Filtros rápidos', filterFeatured: 'Destacadas', filterNew: 'Nuevas', filterLand: 'Terrenos', filterCertified: 'Certificadas',
    mainFilters: 'Filtros principales', moreFilters: 'Más filtros', calculator: 'Calculadora',
    featuredListings: 'Publicaciones destacadas', newListings: 'Nuevas publicaciones',
    calculatorTitle: 'Calcula tu presupuesto', calculatorSubtitle: 'Conoce qué parcela puedes comprar según tu capacidad',
    budgetLabel: 'Presupuesto disponible', monthlyPayment: 'Cuota mensual aproximada', enterBudget: 'Ingresá tu presupuesto',
    zoneLabel: 'Zona de interés', selectZone: 'Seleccionar zona',
    zoneAconcagua: 'Valle del Aconcagua', zoneCasablanca: 'Valle de Casablanca', zoneCordillera: 'Cordillera de Los Andes', zoneLitoral: 'Litoral Central', zoneValleCentral: 'Valle Central',
    typeAgrado: 'Agrado/Residencial', selectType: 'Seleccionar tipo', calculate: 'Calcular',
    searchOnMap: 'Buscar en mapa', mapView: 'Vista de mapa', inDevelopment: 'Funcionalidad en desarrollo',
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
    footerContact: 'Contacto', footerBlog: 'Blog', footerHelp: 'Centro de ayuda',
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
    sellTitle: '¿Tienes una parcela para vender?',
    sellDesc: 'Llega a miles de compradores interesados en encontrar su parcela ideal.',
    sellBtn: 'Publicar mi parcela',
    sellCard1Title: 'Publicación en minutos', sellCard1Desc: 'Sube tu parcela en menos de 5 minutos y comienza a vender.',
    sellCard2Title: 'Miles de compradores activos', sellCard2Desc: 'Tu propiedad vista por personas que buscan activamente.',
    sellCard3Title: 'Sin intermediarios', sellCard3Desc: 'Conecta y negocia directamente con los interesados.',
  },
  selector: {
    language: 'Idioma', currency: 'Moneda', spanish: 'Español', english: 'English',
    clp: 'CLP — Peso chileno', usd: 'USD — Dólar', ars: 'ARS — Peso argentino', uyu: 'UYU — Peso uruguayo', eur: 'EUR — Euro',
  },
  chat: {
    assistantTitle: 'Asistente de soporte', assistantSubtitle: 'Estamos para ayudarte',
    welcomeMsg1: 'Hola 👋 Estoy para ayudarte con cualquier consulta o problema dentro de CompraTuParcela.',
    welcomeMsg2: 'Puedes buscar parcelas, hacer una consulta o reportar un inconveniente.',
    whatDoYouNeed: '¿Qué necesitas?',
    action1: 'Buscar parcelas', action2: 'Contactar inmobiliaria',
    action3: 'Reportar un problema', action4: 'Consultas sobre pagos / planes',
    cat1: 'Publicaciones', cat2: 'Pagos / Planes', cat3: 'Cuenta / Acceso',
    cat4: 'Equipo / Brokers', cat5: 'Otro',
    selectCategory: 'Entiendo. Para ayudarte mejor, selecciona la categoría del problema:',
    describeIssue: 'Perfecto. Ahora describe brevemente el problema:',
    issuePlaceholder: 'Describe brevemente el problema que estás teniendo',
    submitInquiry: 'Enviar consulta',
    ticketCreated: 'Tu ticket de soporte fue creado correctamente',
    ticketNumber: 'Número de ticket:',
    specialistContact: 'Un especialista se pondrá en contacto a la brevedad para ayudarte.',
    responseSearch: 'Puedes explorar todas las parcelas disponibles usando los filtros de búsqueda para encontrar la ideal para ti.',
    responseContact: 'Puedes contactar directamente a las inmobiliarias desde la página de cada parcela o proyecto.',
    responsePayments: 'Para consultas sobre planes y pagos, puedes revisar la sección "Plan y límites" en tu perfil o contactarnos por email.',
    openChat: 'Abrir chat de ayuda', closeChat: 'Cerrar chat',
  },
  toast: {
    loginToSave: 'Inicia sesión para guardar parcelas favoritas', login: 'Ingresar',
    removedFromSaved: 'Eliminada de guardados', undo: 'Deshacer',
    limitReached: 'Alcanzaste el límite de 50 guardados. Elimina alguno para agregar más',
    parcelSaved: 'Parcela guardada', viewSaved: 'Ver guardados',
  },
  comparator: {
    title: 'Compara parcelas',
    empty: 'Aún no tienes parcelas seleccionadas para comparar.',
    hint: 'Haz clic en el ícono ⚖ en cualquier card de parcela para agregarla. Puedes comparar hasta 3 parcelas a la vez.',
    explore: 'Explorar parcelas',
    selected: 'parcela seleccionada', selectedPlural: 'parcelas seleccionadas',
    clear: 'Limpiar', view: 'Ver comparador',
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
    publishedBy: 'Listed by',
    vendorInmobiliaria: 'Agency', vendorBroker: 'Broker', vendorPersona: 'Private seller',
    openMenu: 'Open menu', previous: 'Previous', next: 'Next',
    saveParcel: 'Save parcel', removeFromSaved: 'Remove from saved', saveProject: 'Save project',
  },
  features: {
    portonAcceso: 'Access gate', rolAprobado: 'Approved title', factibilidadAgua: 'Water study',
    vistaCordillera: 'Mountain view', luzInstalada: 'Power installed', pozoPropio: 'Private well',
    riegoTecnificado: 'Drip irrigation', luzTrifasica: 'Three-phase power', enProduccion: 'In production',
    zonaTuristica: 'Tourist zone', sobreRuta7: 'On Route 7', riegoDisponible: 'Irrigation available',
    rolAlDia: 'Title up to date', vistaAlLago: 'Lake view', condominioCerrado: 'Gated community',
    todosLosServicios: 'All utilities', potencialTuristico: 'Tourist potential',
    vertienteNatural: 'Natural spring', accesoAlRio: 'River access', bosqueNativo: 'Native forest',
    usoAgricola: 'Agricultural use', aguaDisponible: 'Water available',
    altoPotencialTuristico: 'High tourist potential', ubicacionPremium: 'Premium location',
    vistaCerroCastillo: 'Cerro Castillo view', potencialEcoturistico: 'Eco-tourism potential',
  },
  recursos: {
    pageTitle: 'Resources', pageSubtitle: 'Guides, news and practical tips for buying, selling and investing in parcels',
    moreArticles: 'More articles', readLabel: 'read',
    featTitle: 'Complete guide to buying your first parcel in Chile',
    featExcerpt: 'Everything you need to know before investing in a parcel: legal aspects, financing, construction permits and common mistakes to avoid.',
    featFullDesc: 'Buying a parcel is an important decision that requires research and planning. In this complete guide we explain the entire process step by step, from the initial search to signing the deed. You will learn to identify land with good potential, verify legal documentation, negotiate the price, and secure the necessary financing.',
    featCategory: 'Buying guide', featDate: '2 days ago', featAuthor: 'CompraTuParcela Team',
    featTag1: 'Purchase', featTag2: 'Legal', featTag3: 'Financing',
    art2Title: 'Investment parcels: is it worth it in 2026?',
    art2Excerpt: 'We analyze the current parcel market in Chile and the return prospects for investors.',
    art2Category: 'Investment', art2Date: '5 days ago',
    art3Title: 'Legal aspects you should know before buying',
    art3Excerpt: 'Required documentation, registrations and legal procedures for a safe purchase.',
    art3Category: 'Legal', art3Date: '1 week ago',
    art4Title: 'How to finance the purchase of your parcel',
    art4Excerpt: 'Mortgage credit options, subsidies and alternative financing available.',
    art4Category: 'Financing', art4Date: '2 weeks ago',
    art5Title: 'Construction permits on rural land',
    art5Excerpt: 'Regulations, requirements and process for obtaining building permits on parcels.',
    art5Category: 'Construction', art5Date: '3 weeks ago',
    art6Title: 'Rural real estate market trends 2026',
    art6Excerpt: 'Prices, demand and the most attractive areas to invest in parcels this year.',
    art6Category: 'Market', art6Date: '1 month ago',
    art7Title: 'Connectivity and basic services on parcels',
    art7Excerpt: 'Water, power, internet and access: what to ask before buying a parcel.',
    art7Category: 'Buying guide', art7Date: '1 month ago',
  },
  inmobiliarias: {
    pageTitle: 'Agencies', pageSubtitle: 'Find agencies specialized in parcels and projects',
    searchByName: 'Search by name', searchPlaceholder: 'E.g.: Patagonia Properties',
    regionLabel: 'Region / area', allRegions: 'All regions', regionMetropolitana: 'Metropolitan Region',
    reviews: 'reviews', contact: 'Contact', viewAgency: 'View agency', generalInquiry: 'General inquiry',
  },
  comoFunciona: {
    pageTitle: 'How CompraTuParcela works',
    pageSubtitle: 'List, manage and sell parcels simply and securely',
    stepsTitle: 'The step-by-step process',
    stepsSubtitle: 'From creating your listing to closing the sale, follow these simple steps',
    step1Title: 'List your parcel', step1Desc: 'Complete a simple form with details, photos and location. All in one place.',
    step2Title: 'Receive inquiries', step2Desc: 'Interested buyers contact you directly. Every inquiry arrives in your dashboard in real time.',
    step3Title: 'Manage follow-up', step3Desc: 'Follow every conversation, answer inquiries and organize visits from one place.',
    step4Title: 'Close the sale', step4Desc: 'Update the status of your parcel and keep it visible until the deal is done.',
    featuresTitle: 'What you can do from the platform',
    featuresSubtitle: 'All the tools you need to manage your properties in one place',
    feat1Title: 'Listings', feat1Desc: 'Manage your properties and keep them up to date',
    feat1Intro: 'Create and manage all your parcel listings from a centralized dashboard.',
    feat1Benefits: ['Intuitive editor to upload photos, videos and documents', 'Customizable fields with key information (area, price, location)', 'Real-time updates visible to all interested parties', 'Complete history of changes and previous versions'],
    feat1Cta: 'List your first parcel in under 5 minutes',
    feat2Title: 'Inquiries & leads', feat2Desc: 'All interested buyers organized in one place',
    feat2Intro: 'Centralize all inquiries and manage each lead efficiently.',
    feat2Benefits: ['Unified inbox with all organized conversations', 'Instant notifications via email and on the platform', 'Tags and filters to prioritize important inquiries', 'Quick replies with customizable templates'],
    feat2Cta: 'Never miss a sales opportunity',
    feat3Title: 'Performance', feat3Desc: 'Visualize key metrics for your listings',
    feat3Intro: 'Analyze the performance of your properties with clear, actionable metrics.',
    feat3Benefits: ['Views, inquiries and conversion statistics', 'Trend charts to identify interest patterns', 'Property comparisons to optimize pricing', 'Exportable PDF reports to share with your team'],
    feat3Cta: 'Make decisions based on real data',
    feat4Title: 'Team & brokers', feat4Desc: 'Invite your team to collaborate on sales',
    feat4Intro: 'Collaborate with your team or external brokers in an organized and transparent way.',
    feat4Benefits: ['Email invitations with custom permissions', 'Assignment of specific inquiries to each member', 'Shared visibility of the sales pipeline', 'Activity log for tracking and accountability'],
    feat4Cta: 'Scale your operation with the right team',
    feat5Title: 'Plans & payments', feat5Desc: 'Choose the plan that best fits your operation',
    feat5Intro: 'Flexible plans that grow with your business, no surprises or hidden costs.',
    feat5Benefits: ['Free plan for up to 3 active listings', 'Scalable plans based on property volume', 'Secure payments by card or bank transfer', 'Plan changes at any time without penalties'],
    feat5Cta: 'Start free, scale when you need it',
    modalFeaturesTitle: 'Key features', modalStartBtn: 'Get started',
    supportTitle: 'Help & support', supportSubtitle: 'Our team is ready to help you whenever you need it',
    chatTitle: 'Live chat', chatDesc: 'Chat with our support team in real time', chatHours: 'Mon - Fri: 9:00 - 18:00',
    emailTitle: 'Email', emailDesc: 'Write to us and we\'ll reply within 24 hours',
    helpTitle: 'Help center', helpDesc: 'Find answers in our knowledge base', viewArticles: 'View articles',
    faqTitle: 'Frequently asked questions', faqSubtitle: 'Answering the most common questions about how the platform works',
    faq1Q: 'Do I need to create an account to explore parcels?',
    faq1A: 'No, you can explore all available parcels without registering. To save favorites, reserve or contact sellers you will need to create a free account — the process takes less than 2 minutes.',
    faq2Q: 'How do I know the information on a parcel is reliable?',
    faq2A: 'Each listing goes through a validation process before appearing on the platform. We verify that the basic legal documents are up to date (tax roll, ownership) and that the declared information is consistent. Parcels with complete documentation are clearly identified.',
    faq3Q: 'How much is the reservation fee and how is it paid?',
    faq3A: 'The reservation fee is $500,000 CLP (approximately UF 12.9). You can pay by direct bank transfer or through a payment link with credit or debit card via Mercado Pago. Once payment is confirmed, the parcel is reserved in your name.',
    faq4Q: 'What happens if my reservation payment is rejected or I cannot complete it?',
    faq4A: 'If payment is not completed within 30 minutes of the reservation process, the parcel becomes available again for other buyers. If it was rejected due to a technical or banking issue, you can try again or contact our support team from the "My purchases" section in your dashboard.',
    faq5Q: 'Can I visit the parcel before reserving?',
    faq5A: 'Yes, and we recommend it. You can request a visit directly from the parcel detail page. The seller or their representative will get in touch to schedule the date and time that works best for you, at no cost or commitment.',
    faq6Q: 'Does the platform work for buyers from abroad?',
    faq6A: 'Yes. You can explore, compare and reserve parcels from any country. The platform shows prices in CLP and USD according to your preference. To complete the purchase you need a Chilean RUT or a legal representative in Chile. Our advisory team can guide you through this process at no cost.',
    faq7Q: 'How much does it cost to list my parcel?',
    faq7A: 'You can list up to 3 parcels completely free. If you need to list more or access advanced features such as detailed analytics, featured listings or broker collaboration, we have plans for real estate agencies and professional sellers. No hidden costs.',
    faq8Q: 'What documents do I need to list?',
    faq8A: 'Uploading documents is not required to list, but we recommend attaching the title deed, property tax certificate, plans and land use certificates. Listings with complete documentation generate more trust and sell considerably faster.',
    faq9Q: 'What is the difference between a parcel and a project?',
    faq9A: 'A parcel is an individual property available for direct sale. A project is a real estate development that groups multiple parcels under the same urbanization or subdivision, generally with shared infrastructure and planned sales phases. In both cases you can explore, compare and reserve from the platform.',
    faq10Q: 'How do I contact an advisor if I need help?',
    faq10A: 'Our advisory team is available Monday to Friday from 9:00 to 18:00. You can contact us via WhatsApp (+569 777 14626), email (contacto@compratuparcela.cl) or using the platform chat. We offer free advisory for buyers who need guidance through the process.',
    ctaTitle: 'Ready to get started?',
    ctaSubtitle: 'List your first parcel for free or explore available properties',
    viewParcels: 'View available parcels',
  },
  status: {
    disponible: 'Available', reservada: 'Reserved', reservandose: 'Being reserved',
    aprobada: 'Approved', rechazada: 'Rejected', activa: 'Active', pausada: 'Paused',
    pendiente: 'Pending', aprobado: 'Approved', rechazado: 'Rejected',
    preventa: 'Pre-sale started', enConstruccion: 'Under construction',
    planosAprobados: 'Plans approved', lanzamiento: 'Launch',
    enVenta: 'For sale', proximamente: 'Coming soon',
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
    filtersTitle: 'Filters', price: 'Price',
    minimum: 'Minimum', maximum: 'Maximum',
    quickFilters: 'Quick filters', filterFeatured: 'Featured', filterNew: 'New', filterLand: 'Land', filterCertified: 'Certified',
    mainFilters: 'Main filters', moreFilters: 'More filters', calculator: 'Calculator',
    featuredListings: 'Featured listings', newListings: 'New listings',
    calculatorTitle: 'Budget calculator', calculatorSubtitle: 'Find out what parcel you can buy based on your budget',
    budgetLabel: 'Available budget', monthlyPayment: 'Estimated monthly payment', enterBudget: 'Enter your budget',
    zoneLabel: 'Zone of interest', selectZone: 'Select zone',
    zoneAconcagua: 'Valle del Aconcagua', zoneCasablanca: 'Valle de Casablanca', zoneCordillera: 'Cordillera de los Andes', zoneLitoral: 'Central Coast', zoneValleCentral: 'Central Valley',
    typeAgrado: 'Residential/Leisure', selectType: 'Select type', calculate: 'Calculate',
    searchOnMap: 'Search on map', mapView: 'Map view', inDevelopment: 'Feature in development',
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
    footerContact: 'Contact', footerBlog: 'Blog', footerHelp: 'Help center',
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
    sellTitle: 'Do you have a parcel to sell?',
    sellDesc: 'Reach thousands of buyers looking for their ideal parcel.',
    sellBtn: 'List my parcel',
    sellCard1Title: 'Listed in minutes', sellCard1Desc: 'Upload your parcel in under 5 minutes and start selling.',
    sellCard2Title: 'Thousands of active buyers', sellCard2Desc: 'Your property seen by people actively searching.',
    sellCard3Title: 'No middlemen', sellCard3Desc: 'Connect and negotiate directly with interested parties.',
  },
  selector: {
    language: 'Language', currency: 'Currency', spanish: 'Español', english: 'English',
    clp: 'CLP — Chilean peso', usd: 'USD — US Dollar', ars: 'ARS — Argentine peso', uyu: 'UYU — Uruguayan peso', eur: 'EUR — Euro',
  },
  chat: {
    assistantTitle: 'Support assistant', assistantSubtitle: 'We\'re here to help',
    welcomeMsg1: 'Hello 👋 I\'m here to help you with any question or issue within CompraTuParcela.',
    welcomeMsg2: 'You can search for parcels, ask a question or report an issue.',
    whatDoYouNeed: 'What do you need?',
    action1: 'Search parcels', action2: 'Contact agency',
    action3: 'Report a problem', action4: 'Payment / plan inquiries',
    cat1: 'Listings', cat2: 'Payments / Plans', cat3: 'Account / Access',
    cat4: 'Team / Brokers', cat5: 'Other',
    selectCategory: 'I understand. To help you better, select the problem category:',
    describeIssue: 'Got it. Now briefly describe the problem:',
    issuePlaceholder: 'Briefly describe the issue you\'re experiencing',
    submitInquiry: 'Submit inquiry',
    ticketCreated: 'Your support ticket was created successfully',
    ticketNumber: 'Ticket number:',
    specialistContact: 'A specialist will contact you shortly to help you.',
    responseSearch: 'You can explore all available parcels using the search filters to find your ideal one.',
    responseContact: 'You can contact real estate agencies directly from each parcel or project page.',
    responsePayments: 'For questions about plans and payments, check the "Plan & limits" section in your profile or contact us by email.',
    openChat: 'Open help chat', closeChat: 'Close chat',
  },
  toast: {
    loginToSave: 'Sign in to save favorite parcels', login: 'Sign in',
    removedFromSaved: 'Removed from saved', undo: 'Undo',
    limitReached: 'You\'ve reached the 50 saved limit. Remove one to add more',
    parcelSaved: 'Parcel saved', viewSaved: 'View saved',
  },
  comparator: {
    title: 'Compare parcels',
    empty: 'You haven\'t selected any parcels to compare yet.',
    hint: 'Click the ⚖ icon on any parcel card to add it. You can compare up to 3 parcels at a time.',
    explore: 'Explore parcels',
    selected: 'parcel selected', selectedPlural: 'parcels selected',
    clear: 'Clear', view: 'Compare now',
  },
};

export const translations: Record<Language, Translations> = { es, en };
