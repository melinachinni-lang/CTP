import React from 'react';

export type LeadEstado = 'nuevo' | 'contactado' | 'cerrado';

export interface Lead {
  id: string;
  comprador: {
    nombre: string;
    email: string;
    telefono: string;
  };
  publicacion: {
    id: string;
    nombre: string;
    tipo: 'parcela' | 'proyecto';
    ubicacion: string;
    precio: string;
  };
  vendedor: {
    nombre: string;
    tipo: 'Inmobiliaria' | 'Particular';
    email: string;
  };
  fechaCreacion: string;
  horaCreacion: string;
  estado: LeadEstado;
  mensaje?: string;
}

const LEADS_DATA: Lead[] = [
  {
    id: 'lead-001',
    comprador: {
      nombre: 'Rodrigo Sánchez',
      email: 'rodrigo.sanchez@email.com',
      telefono: '+56 9 8765 4321'
    },
    publicacion: {
      id: 'parcela-001',
      nombre: 'Parcela Vista al Lago',
      tipo: 'parcela',
      ubicacion: 'Villarrica, Región de La Araucanía',
      precio: 'CLP $45.000.000'
    },
    vendedor: {
      nombre: 'Inmobiliaria Parcelas del Sur',
      tipo: 'Inmobiliaria',
      email: 'ventas@parcelasdelsur.cl'
    },
    fechaCreacion: '2025-01-27',
    horaCreacion: '09:30',
    estado: 'nuevo',
    mensaje: 'Estoy interesado en conocer más sobre esta parcela. ¿Podemos coordinar una visita?'
  },
  {
    id: 'lead-002',
    comprador: {
      nombre: 'Carolina Morales',
      email: 'carolina.morales@email.com',
      telefono: '+56 9 7654 3210'
    },
    publicacion: {
      id: 'proyecto-001',
      nombre: 'Condominio Valle Verde',
      tipo: 'proyecto',
      ubicacion: 'Colina, Región Metropolitana',
      precio: 'Desde CLP $35.000.000'
    },
    vendedor: {
      nombre: 'Inmobiliaria Valle',
      tipo: 'Inmobiliaria',
      email: 'contacto@inmovalle.cl'
    },
    fechaCreacion: '2025-01-27',
    horaCreacion: '11:15',
    estado: 'contactado',
    mensaje: 'Me gustaría recibir información sobre las condiciones de financiamiento disponibles.'
  },
  {
    id: 'lead-003',
    comprador: {
      nombre: 'Felipe Vargas',
      email: 'felipe.vargas@email.com',
      telefono: '+56 9 6543 2109'
    },
    publicacion: {
      id: 'parcela-002',
      nombre: 'Parcela Bosque Nativo',
      tipo: 'parcela',
      ubicacion: 'Pucón, Región de La Araucanía',
      precio: 'CLP $65.000.000'
    },
    vendedor: {
      nombre: 'Juan Pablo Rojas',
      tipo: 'Particular',
      email: 'jp.rojas@email.com'
    },
    fechaCreacion: '2025-01-26',
    horaCreacion: '16:45',
    estado: 'contactado',
    mensaje: '¿La parcela cuenta con todos los servicios básicos? Quiero agendar una visita.'
  },
  {
    id: 'lead-004',
    comprador: {
      nombre: 'Daniela Fuentes',
      email: 'daniela.fuentes@email.com',
      telefono: '+56 9 5432 1098'
    },
    publicacion: {
      id: 'parcela-003',
      nombre: 'Terreno Agrícola Premium',
      tipo: 'parcela',
      ubicacion: 'San Fernando, Región del Libertador Bernardo O\'Higgins',
      precio: 'CLP $85.000.000'
    },
    vendedor: {
      nombre: 'Inmobiliaria Agro Propiedades',
      tipo: 'Inmobiliaria',
      email: 'info@agropropiedades.cl'
    },
    fechaCreacion: '2025-01-26',
    horaCreacion: '14:20',
    estado: 'cerrado',
    mensaje: 'Quisiera información sobre los documentos de la propiedad y restricciones de uso.'
  },
  {
    id: 'lead-005',
    comprador: {
      nombre: 'Matías Hernández',
      email: 'matias.hernandez@email.com',
      telefono: '+56 9 4321 0987'
    },
    publicacion: {
      id: 'parcela-004',
      nombre: 'Parcela Cordillera',
      tipo: 'parcela',
      ubicacion: 'Cajón del Maipo, Región Metropolitana',
      precio: 'CLP $120.000.000'
    },
    vendedor: {
      nombre: 'Patricia González',
      tipo: 'Particular',
      email: 'patricia.gonzalez@email.com'
    },
    fechaCreacion: '2025-01-25',
    horaCreacion: '10:00',
    estado: 'cerrado',
    mensaje: 'Me interesa mucho la ubicación. ¿Hay posibilidad de negociar el precio?'
  },
  {
    id: 'lead-006',
    comprador: {
      nombre: 'Valentina Torres',
      email: 'valentina.torres@email.com',
      telefono: '+56 9 3210 9876'
    },
    publicacion: {
      id: 'proyecto-002',
      nombre: 'Parcelas Los Andes',
      tipo: 'proyecto',
      ubicacion: 'San Esteban, Región de Valparaíso',
      precio: 'Desde CLP $28.000.000'
    },
    vendedor: {
      nombre: 'Inmobiliaria Andes Propiedades',
      tipo: 'Inmobiliaria',
      email: 'ventas@andespropiedades.cl'
    },
    fechaCreacion: '2025-01-25',
    horaCreacion: '15:30',
    estado: 'contactado',
    mensaje: '¿Cuál es el tamaño mínimo de las parcelas disponibles en el proyecto?'
  },
  {
    id: 'lead-007',
    comprador: {
      nombre: 'Andrés Muñoz',
      email: 'andres.munoz@email.com',
      telefono: '+56 9 2109 8765'
    },
    publicacion: {
      id: 'parcela-005',
      nombre: 'Parcela Vista al Mar',
      tipo: 'parcela',
      ubicacion: 'Algarrobo, Región de Valparaíso',
      precio: 'CLP $95.000.000'
    },
    vendedor: {
      nombre: 'Inmobiliaria Costa',
      tipo: 'Inmobiliaria',
      email: 'contacto@inmocosta.cl'
    },
    fechaCreacion: '2025-01-24',
    horaCreacion: '12:00',
    estado: 'nuevo',
    mensaje: 'Necesito saber si la parcela tiene acceso directo a la playa.'
  },
  {
    id: 'lead-008',
    comprador: {
      nombre: 'Sofía Reyes',
      email: 'sofia.reyes@email.com',
      telefono: '+56 9 1098 7654'
    },
    publicacion: {
      id: 'parcela-006',
      nombre: 'Parcela Valle Central',
      tipo: 'parcela',
      ubicacion: 'Curicó, Región del Maule',
      precio: 'CLP $42.000.000'
    },
    vendedor: {
      nombre: 'Carlos Pérez',
      tipo: 'Particular',
      email: 'carlos.perez@email.com'
    },
    fechaCreacion: '2025-01-24',
    horaCreacion: '09:15',
    estado: 'contactado',
    mensaje: '¿La parcela tiene factibilidad de agua y luz? Me interesa para proyecto agrícola.'
  },
  {
    id: 'lead-009',
    comprador: {
      nombre: 'Ignacio Silva',
      email: 'ignacio.silva@email.com',
      telefono: '+56 9 0987 6543'
    },
    publicacion: {
      id: 'proyecto-003',
      nombre: 'Condominio Montaña',
      tipo: 'proyecto',
      ubicacion: 'La Calera, Región de Valparaíso',
      precio: 'Desde CLP $38.000.000'
    },
    vendedor: {
      nombre: 'Inmobiliaria Montaña Verde',
      tipo: 'Inmobiliaria',
      email: 'info@montanaverde.cl'
    },
    fechaCreacion: '2025-01-23',
    horaCreacion: '17:00',
    estado: 'nuevo',
    mensaje: '¿Cuándo está programada la entrega del proyecto?'
  },
  {
    id: 'lead-010',
    comprador: {
      nombre: 'Francisca Castro',
      email: 'francisca.castro@email.com',
      telefono: '+56 9 9876 5432'
    },
    publicacion: {
      id: 'parcela-007',
      nombre: 'Parcela Río y Montaña',
      tipo: 'parcela',
      ubicacion: 'Futaleufú, Región de Los Lagos',
      precio: 'CLP $78.000.000'
    },
    vendedor: {
      nombre: 'Inmobiliaria Sur Extremo',
      tipo: 'Inmobiliaria',
      email: 'contacto@surextremo.cl'
    },
    fechaCreacion: '2025-01-23',
    horaCreacion: '13:45',
    estado: 'cerrado',
    mensaje: 'Busco una parcela para proyecto turístico. ¿Hay restricciones de construcción?'
  }
];

export function getAllLeads(): Lead[] {
  return LEADS_DATA;
}

export function getLeadById(id: string): Lead | undefined {
  return LEADS_DATA.find(lead => lead.id === id);
}

export function getLeadsByEstado(estado: LeadEstado): Lead[] {
  return LEADS_DATA.filter(lead => lead.estado === estado);
}

export function getLeadsByVendedor(vendedorNombre: string): Lead[] {
  return LEADS_DATA.filter(lead => lead.vendedor.nombre === vendedorNombre);
}

export function getLeadsEstadisticas() {
  const total = LEADS_DATA.length;
  const nuevos = LEADS_DATA.filter(lead => lead.estado === 'nuevo').length;
  const contactados = LEADS_DATA.filter(lead => lead.estado === 'contactado').length;
  const cerrados = LEADS_DATA.filter(lead => lead.estado === 'cerrado').length;

  return {
    total,
    nuevos,
    contactados,
    cerrados
  };
}
