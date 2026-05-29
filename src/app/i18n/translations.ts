export type Language = 'es' | 'en';
export type Currency = 'CLP' | 'USD';

export interface Translations {
  nav: {
    home: string; explore: string; listings: string; saved: string;
    inquiries: string; calendarios: string; compare: string; purchases: string;
    plan: string; help: string; settings: string; myAccount: string; signOut: string;
  };
  common: {
    viewDetail: string; save: string; publish: string; pause: string; edit: string;
    view: string; search: string; filters: string; sortBy: string; from: string;
    available: string; area: string; download: string; type: string; date: string;
    amount: string; status: string; parcela: string; project: string;
    reservation: string; purchase: string; paymentMethod: string;
    allDates: string; availableLabel: string; noData: string;
  };
  status: {
    disponible: string; reservada: string; reservandose: string;
    aprobada: string; rechazada: string; activa: string; pausada: string;
    pendiente: string; aprobado: string; rechazado: string;
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
    noResults: string; loadMore: string; sortBy: string;
    viewMap: string; viewList: string; surface: string; from: string;
    disponibles: string;
  };
  selector: {
    language: string; currency: string; spanish: string; english: string;
    clp: string; usd: string;
  };
}

const es: Translations = {
  nav: {
    home: 'Inicio', explore: 'Explorar parcelas', listings: 'Mis publicaciones',
    saved: 'Guardados', inquiries: 'Consultas', calendarios: 'Calendarios',
    compare: 'Comparar', purchases: 'Mis compras', plan: 'Plan y límites',
    help: 'Ayuda', settings: 'Configuración', myAccount: 'Mi cuenta', signOut: 'Cerrar sesión',
  },
  common: {
    viewDetail: 'Ver detalle', save: 'Guardar', publish: 'Publicar', pause: 'Pausar',
    edit: 'Editar', view: 'Ver', search: 'Buscar', filters: 'Filtros',
    sortBy: 'Ordenar por', from: 'Desde', available: 'Disponibles', area: 'Superficie',
    download: 'Descargar', type: 'Tipo', date: 'Fecha', amount: 'Monto',
    status: 'Estado', parcela: 'Parcela', project: 'Proyecto',
    reservation: 'Reserva', purchase: 'Compra', paymentMethod: 'Método de pago',
    allDates: 'Todas las fechas', availableLabel: 'Disponible', noData: 'Sin datos disponibles',
  },
  status: {
    disponible: 'Disponible', reservada: 'Reservada', reservandose: 'Reservándose',
    aprobada: 'Aprobada', rechazada: 'Rechazada', activa: 'Activa', pausada: 'Pausada',
    pendiente: 'Pendiente', aprobado: 'Aprobado', rechazado: 'Rechazado',
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
    sortBy: 'Ordenar por', viewMap: 'Ver mapa', viewList: 'Ver lista',
    surface: 'Superficie', from: 'Desde', disponibles: 'Disponibles',
  },
  selector: {
    language: 'Idioma', currency: 'Moneda', spanish: 'Español', english: 'English',
    clp: 'CLP — Peso chileno', usd: 'USD — Dólar',
  },
};

const en: Translations = {
  nav: {
    home: 'Home', explore: 'Explore parcels', listings: 'My listings',
    saved: 'Saved', inquiries: 'Inquiries', calendarios: 'Calendars',
    compare: 'Compare', purchases: 'My purchases', plan: 'Plan & limits',
    help: 'Help', settings: 'Settings', myAccount: 'My account', signOut: 'Sign out',
  },
  common: {
    viewDetail: 'View detail', save: 'Save', publish: 'Publish', pause: 'Pause',
    edit: 'Edit', view: 'View', search: 'Search', filters: 'Filters',
    sortBy: 'Sort by', from: 'From', available: 'Available', area: 'Area',
    download: 'Download', type: 'Type', date: 'Date', amount: 'Amount',
    status: 'Status', parcela: 'Parcel', project: 'Project',
    reservation: 'Reservation', purchase: 'Purchase', paymentMethod: 'Payment method',
    allDates: 'All dates', availableLabel: 'Available', noData: 'No data available',
  },
  status: {
    disponible: 'Available', reservada: 'Reserved', reservandose: 'Being reserved',
    aprobada: 'Approved', rechazada: 'Rejected', activa: 'Active', pausada: 'Paused',
    pendiente: 'Pending', aprobado: 'Approved', rechazado: 'Rejected',
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
    noResults: 'No results found', loadMore: 'Loading more parcels...',
    sortBy: 'Sort by', viewMap: 'View map', viewList: 'View list',
    surface: 'Area', from: 'From', disponibles: 'Available',
  },
  selector: {
    language: 'Language', currency: 'Currency', spanish: 'Español', english: 'English',
    clp: 'CLP — Chilean peso', usd: 'USD — US Dollar',
  },
};

export const translations: Record<Language, Translations> = { es, en };
