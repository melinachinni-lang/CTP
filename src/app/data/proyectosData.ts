import { Expand, Home, Compass, Mountain } from 'lucide-react';

export interface Proyecto {
  id: number;
  nombre: string;
  ubicacion: string;
  region: string;
  tipo: 'Residencial' | 'Turístico' | 'Mixto' | 'Agrícola';
  estado: 'En venta' | 'Próximamente' | 'En construcción';
  parcelasDisponibles: number;
  totalParcelas: number;
  precioDesde: string;
  precioHasta: string;
  superficieDesde: string;
  superficieHasta: string;
  imagen: string;
  imagenes: string[];
  masterplan: string;
  caracteristicas: string[];
  descripcionCorta: string;
  descripcionCompleta: string;
  infraestructura: string[];
  publicadoPor: string;
  tipoVendedor: 'Inmobiliaria' | 'Broker' | 'Vendedor particular';
  descripcionVendedor?: string;
  imagenVendedor: string;
  emailVendedor: string;
  telefonoVendedor: string;
  direccion: string;
  coordenadas: { lat: number; lng: number };
  imagenPanoramica: string;
  // Nuevos campos para características y estado legal
  caracteristicasTerreno?: Array<{
    icon?: React.ReactNode;
    valor: string;
    label: string;
  }>;
  caracteristicasServicios?: Array<{
    icon?: React.ReactNode;
    valor: string;
    label: string;
  }>;
  caracteristicasLegal?: Array<{
    icon?: React.ReactNode;
    valor: string;
    label: string;
  }>;
  plano?: string;
  documentos?: Array<{
    nombre: string;
    tipo: string;
    disponible: boolean;
  }>;
  parcelasDelProyecto?: {
    id: number;
    nombre: string;
    superficie: string;
    precio: string;
    imagen: string;
  }[];
  // Información del entorno
  entorno?: {
    accesos: {
      tiempoAlCentro: string;
      tiempoAlCentroMinutos: number;
      ciudadCercana: string;
      distanciaCiudadCercana: string;
      tipoAcceso: string;
      calidadAcceso: number; // 1-4 (4 es mejor)
      ciudadPrincipal: string;
      distanciaCiudadPrincipal: string;
    };
    servicios: {
      educacion: { nivel: string; porcentaje: number };
      comercio: { nivel: string; porcentaje: number };
      salud: { nivel: string; porcentaje: number };
      recreacion: { nivel: string; porcentaje: number };
    };
    naturaleza: {
      nivel: number; // 1-5
      descripcion: string;
      vistas: number; // 1-5
      descripcionVistas: string;
      temperaturaPromedio: string;
      precipitaciones: string;
    };
    contexto: {
      poblacion: string;
      actividadesPrincipales: string[];
    };
  };
}

export const proyectosData: Proyecto[] = [
  {
    id: 1,
    nombre: 'Parcelas Valle Verde',
    ubicacion: 'Pucón',
    region: 'La Araucanía',
    tipo: 'Residencial',
    estado: 'En venta',
    parcelasDisponibles: 24,
    totalParcelas: 30,
    precioDesde: '$45.000.000',
    precioHasta: '$82.000.000',
    superficieDesde: '5.000 m²',
    superficieHasta: '12.000 m²',
    imagen: 'https://images.unsplash.com/photo-1654720227757-b1dacf6d181d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxha2UlMjBmb3Jlc3R8ZW58MXx8fHwxNzY5NDQ5MjIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    imagenes: [
      'https://images.unsplash.com/photo-1654720227757-b1dacf6d181d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxha2UlMjBmb3Jlc3R8ZW58MXx8fHwxNzY5NDQ5MjIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1763257708309-d42f13d74c2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXJpYWwlMjB2aWV3JTIwcmVzaWRlbnRpYWwlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3Njk0NTE0MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1626385785701-a0d3b879de2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBzaXRlJTIwZGV2ZWxvcG1lbnR8ZW58MXx8fHwxNzY5NDUxNDE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    masterplan: 'https://images.unsplash.com/photo-1721244654392-9c912a6eb236?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXN0ZXJwbGFuJTIwYXJjaGl0ZWN0dXJlJTIwYmx1ZXByaW50fGVufDF8fHx8MTc2OTQ1MTQxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caracteristicas: ['Agua potable', 'Electricidad', 'Camino pavimentado'],
    descripcionCorta: 'Exclusivo proyecto residencial con vista al lago y volcán',
    descripcionCompleta: 'Valle Verde es un proyecto residencial único en Pucón, diseñado para quienes buscan un estilo de vida conectado con la naturaleza sin renunciar a las comodidades urbanas. Con una ubicación privilegiada que ofrece vistas panorámicas al lago Villarrica y los volcanes circundantes, el proyecto cuenta con 30 parcelas de entre 5.000 y 12.000 m², cada una cuidadosamente planificada para maximizar la privacidad y las vistas. El desarrollo incluye infraestructura completa con agua potable, electricidad trifásica y caminos pavimentados internos. Actualmente en etapa de comercialización con 24 parcelas disponibles para entrega inmediata.',
    infraestructura: ['Agua potable', 'Electricidad trifásica', 'Camino pavimentado', 'Iluminación LED', 'Fibra óptica', 'Portería con control de acceso'],
    publicadoPor: 'Inmobiliaria Valle Verde',
    tipoVendedor: 'Inmobiliaria',
    descripcionVendedor: 'Especialistas en proyectos residenciales premium en la Región de La Araucanía',
    imagenVendedor: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2OTM5MjI3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    emailVendedor: 'contacto@valleverde.cl',
    telefonoVendedor: '+56 9 8765 4321',
    direccion: 'Camino a Caburgua Km 18, Pucón',
    coordenadas: { lat: -39.2748, lng: -71.9581 },
    imagenPanoramica: 'https://images.unsplash.com/photo-1654720227757-b1dacf6d181d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxha2UlMjBmb3Jlc3R8ZW58MXx8fHwxNzY5NDQ5MjIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    parcelasDelProyecto: [
      {
        id: 101,
        nombre: 'Parcela A-12',
        superficie: '5.000 m²',
        precio: '$45.000.000',
        imagen: 'https://images.unsplash.com/photo-1654720227757-b1dacf6d181d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxha2UlMjBmb3Jlc3R8ZW58MXx8fHwxNzY5NDQ5MjIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      {
        id: 102,
        nombre: 'Parcela B-05',
        superficie: '7.500 m²',
        precio: '$58.000.000',
        imagen: 'https://images.unsplash.com/photo-1654720227757-b1dacf6d181d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxha2UlMjBmb3Jlc3R8ZW58MXx8fHwxNzY5NDQ5MjIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      {
        id: 103,
        nombre: 'Parcela C-08',
        superficie: '10.000 m²',
        precio: '$72.000.000',
        imagen: 'https://images.unsplash.com/photo-1654720227757-b1dacf6d181d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxha2UlMjBmb3Jlc3R8ZW58MXx8fHwxNzY5NDQ5MjIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      }
    ]
  },
  {
    id: 2,
    nombre: 'Condominio Los Robles',
    ubicacion: 'Villarrica',
    region: 'La Araucanía',
    tipo: 'Turístico',
    estado: 'En venta',
    parcelasDisponibles: 18,
    totalParcelas: 25,
    precioDesde: '$38.500.000',
    precioHasta: '$65.000.000',
    superficieDesde: '3.000 m²',
    superficieHasta: '8.000 m²',
    imagen: 'https://images.unsplash.com/photo-1627750168257-9a7d3965ef8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBjYWJpbnMlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzY5NDQ5MjIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    imagenes: [
      'https://images.unsplash.com/photo-1627750168257-9a7d3965ef8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBjYWJpbnMlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzY5NDQ5MjIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1763257708309-d42f13d74c2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXJpYWwlMjB2aWV3JTIwcmVzaWRlbnRpYWwlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3Njk0NTE0MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    masterplan: 'https://images.unsplash.com/photo-1721244654392-9c912a6eb236?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXN0ZXJwbGFuJTIwYXJjaGl0ZWN0dXJlJTIwYmx1ZXByaW50fGVufDF8fHx8MTc2OTQ1MTQxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caracteristicas: ['Portería 24/7', 'Áreas verdes', 'Quincho común'],
    descripcionCorta: 'Proyecto turístico en entorno natural privilegiado',
    descripcionCompleta: 'Los Robles es un condominio turístico diseñado para quienes buscan un refugio natural cerca de Villarrica. Con parcelas desde 3.000 m², este proyecto ofrece la oportunidad perfecta para construir tu cabaña de descanso o invertir en el creciente mercado turístico de la zona. El condominio cuenta con seguridad permanente, áreas verdes comunes y un quincho equipado para reuniones. Ideal para familias que buscan escapar de la ciudad y conectar con la naturaleza sin sacrificar comodidades.',
    infraestructura: ['Portería 24/7', 'Áreas verdes', 'Quincho común', 'Juegos infantiles', 'Senderos naturales', 'Estacionamientos de visitas'],
    publicadoPor: 'Carolina Méndez',
    tipoVendedor: 'Broker',
    descripcionVendedor: 'Broker especializada en proyectos turísticos y de inversión en La Araucanía',
    imagenVendedor: 'https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHdvbWFufGVufDF8fHx8MTc2OTQwNDQ2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    emailVendedor: 'cmendez@realestate.cl',
    telefonoVendedor: '+56 9 7654 3210',
    direccion: 'Camino Los Robles s/n, Villarrica',
    coordenadas: { lat: -39.2838, lng: -72.2279 },
    imagenPanoramica: 'https://images.unsplash.com/photo-1627750168257-9a7d3965ef8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBjYWJpbnMlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzY5NDQ5MjIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    parcelasDelProyecto: [
      {
        id: 201,
        nombre: 'Parcela 15',
        superficie: '3.000 m²',
        precio: '$38.500.000',
        imagen: 'https://images.unsplash.com/photo-1627750168257-9a7d3965ef8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBjYWJpbnMlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzY5NDQ5MjIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      {
        id: 202,
        nombre: 'Parcela 22',
        superficie: '5.000 m²',
        precio: '$52.000.000',
        imagen: 'https://images.unsplash.com/photo-1627750168257-9a7d3965ef8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBjYWJpbnMlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzY5NDQ5MjIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      }
    ]
  },
  {
    id: 3,
    nombre: 'Parcelas Río Claro',
    ubicacion: 'Los Ángeles',
    region: 'Biobío',
    tipo: 'Agrícola',
    estado: 'En venta',
    parcelasDisponibles: 32,
    totalParcelas: 45,
    precioDesde: '$28.000.000',
    precioHasta: '$58.000.000',
    superficieDesde: '8.000 m²',
    superficieHasta: '15.000 m²',
    imagen: 'https://images.unsplash.com/photo-1678483874574-0326c60e3f20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjBsYW5kJTIwdmFsbGV5fGVufDF8fHx8MTc2OTQ0OTIyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    imagenes: [
      'https://images.unsplash.com/photo-1678483874574-0326c60e3f20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjBsYW5kJTIwdmFsbGV5fGVufDF8fHx8MTc2OTQ0OTIyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1626385785701-a0d3b879de2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBzaXRlJTIwZGV2ZWxvcG1lbnR8ZW58MXx8fHwxNzY5NDUxNDE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    masterplan: 'https://images.unsplash.com/photo-1721244654392-9c912a6eb236?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXN0ZXJwbGFuJTIwYXJjaGl0ZWN0dXJlJTIwYmx1ZXByaW50fGVufDF8fHx8MTc2OTQ1MTQxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caracteristicas: ['Riego tecnificado', 'Acceso directo', 'Suelo fértil'],
    descripcionCorta: 'Parcelas agrícolas con infraestructura de riego incluida',
    descripcionCompleta: 'Río Claro es un proyecto agrícola que ofrece parcelas productivas desde 8.000 m² en la fértil región del Biobío. Cada parcela cuenta con infraestructura de riego tecnificado instalada, acceso directo desde camino principal y suelos certificados de alta calidad para producción agrícola. Ideal para emprendimientos agrícolas, hortofrutícolas o viñedos. El proyecto incluye asesoría técnica inicial y facilidades de pago para inversionistas serios.',
    infraestructura: ['Riego tecnificado', 'Acceso directo', 'Suelo fértil certificado', 'Electricidad rural', 'Bodega de herramientas compartida', 'Cerco perimetral'],
    publicadoPor: 'Araucanía Bienes Raíces',
    tipoVendedor: 'Inmobiliaria',
    descripcionVendedor: 'Especializados en parcelas turísticas y agrícolas de la región',
    imagenVendedor: 'https://images.unsplash.com/photo-1760636803392-85a2a18e562d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wYW55JTIwbG9nbyUyMGJ1aWxkaW5nfGVufDF8fHx8MTc2OTQ2MTExM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    emailVendedor: 'contacto@araucaniabienes.cl',
    telefonoVendedor: '+56 9 6543 2109',
    direccion: 'Ruta 5 Sur Km 512, Los Ángeles',
    coordenadas: { lat: -37.4689, lng: -72.3527 },
    imagenPanoramica: 'https://images.unsplash.com/photo-1678483874574-0326c60e3f20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjBsYW5kJTIwdmFsbGV5fGVufDF8fHx8MTc2OTQ0OTIyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    parcelasDelProyecto: [
      {
        id: 301,
        nombre: 'Lote Agrícola 8',
        superficie: '8.000 m²',
        precio: '$28.000.000',
        imagen: 'https://images.unsplash.com/photo-1678483874574-0326c60e3f20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjBsYW5kJTIwdmFsbGV5fGVufDF8fHx8MTc2OTQ0OTIyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      {
        id: 302,
        nombre: 'Lote Agrícola 15',
        superficie: '12.000 m²',
        precio: '$42.000.000',
        imagen: 'https://images.unsplash.com/photo-1678483874574-0326c60e3f20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjBsYW5kJTIwdmFsbGV5fGVufDF8fHx8MTc2OTQ0OTIyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      }
    ]
  },
  {
    id: 4,
    nombre: 'Terrazas del Lago',
    ubicacion: 'Puerto Varas',
    region: 'Los Lagos',
    tipo: 'Mixto',
    estado: 'En construcción',
    parcelasDisponibles: 40,
    totalParcelas: 50,
    precioDesde: '$52.000.000',
    precioHasta: '$95.000.000',
    superficieDesde: '4.500 m²',
    superficieHasta: '10.000 m²',
    imagen: 'https://images.unsplash.com/photo-1632168593163-62bbf63a1047?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwdmlldyUyMG1vdW50YWluc3xlbnwxfHx8fDE3NjkzOTQzNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    imagenes: [
      'https://images.unsplash.com/photo-1632168593163-62bbf63a1047?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwdmlldyUyMG1vdW50YWluc3xlbnwxfHx8fDE3NjkzOTQzNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1626385785701-a0d3b879de2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBzaXRlJTIwZGV2ZWxvcG1lbnR8ZW58MXx8fHwxNzY5NDUxNDE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1763257708309-d42f13d74c2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXJpYWwlMjB2aWV3JTIwcmVzaWRlbnRpYWwlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3Njk0NTE0MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    masterplan: 'https://images.unsplash.com/photo-1721244654392-9c912a6eb236?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXN0ZXJwbGFuJTIwYXJjaGl0ZWN0dXJlJTIwYmx1ZXByaW50fGVufDF8fHx8MTc2OTQ1MTQxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caracteristicas: ['Vista panorámica', 'Club house', 'Senderos'],
    descripcionCorta: 'Desarrollo mixto con vistas privilegiadas al lago Llanquihue',
    descripcionCompleta: 'Terrazas del Lago es un desarrollo inmobiliario de categoría superior en Puerto Varas, actualmente en etapa de construcción de obras de urbanización. Este proyecto mixto combina parcelas residenciales y turísticas con una ubicación privilegiada que ofrece vistas panorámicas al lago Llanquihue y los volcanes Osorno y Calbuco. Contará con un club house equipado, senderos naturales y áreas verdes diseñadas para el esparcimiento familiar. Pre-venta con descuentos especiales para los primeros compradores. Entrega estimada: Primer semestre 2026.',
    infraestructura: ['Vista panorámica', 'Club house en construcción', 'Senderos naturales', 'Piscina temperada', 'Cancha de tenis', 'Miradores', 'Seguridad 24/7'],
    publicadoPor: 'Inmobiliaria Lagos del Sur',
    tipoVendedor: 'Inmobiliaria',
    imagenVendedor: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnR8ZW58MXx8fHwxNzY5NDA5ODkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    emailVendedor: 'ventas@lagosdelsur.cl',
    telefonoVendedor: '+56 9 5432 1098',
    direccion: 'Camino a Ensenada Km 8, Puerto Varas',
    coordenadas: { lat: -41.3195, lng: -72.9381 },
    imagenPanoramica: 'https://images.unsplash.com/photo-1632168593163-62bbf63a1047?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwdmlldyUyMG1vdW50YWluc3xlbnwxfHx8fDE3NjkzOTQzNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    parcelasDelProyecto: [
      {
        id: 401,
        nombre: 'Terraza Vista Lago 3',
        superficie: '4.500 m²',
        precio: '$52.000.000',
        imagen: 'https://images.unsplash.com/photo-1632168593163-62bbf63a1047?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwdmlldyUyMG1vdW50YWluc3xlbnwxfHx8fDE3NjkzOTQzNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      {
        id: 402,
        nombre: 'Terraza Premium 12',
        superficie: '8.000 m²',
        precio: '$78.000.000',
        imagen: 'https://images.unsplash.com/photo-1632168593163-62bbf63a1047?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwdmlldyUyMG1vdW50YWluc3xlbnwxfHx8fDE3NjkzOTQzNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      {
        id: 403,
        nombre: 'Terraza Vista Volcán 7',
        superficie: '10.000 m²',
        precio: '$95.000.000',
        imagen: 'https://images.unsplash.com/photo-1632168593163-62bbf63a1047?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwdmlldyUyMG1vdW50YWluc3xlbnwxfHx8fDE3NjkzOTQzNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      }
    ]
  },
  {
    id: 5,
    nombre: 'Valle Andino',
    ubicacion: 'San José de Maipo',
    region: 'Metropolitana',
    tipo: 'Residencial',
    estado: 'Próximamente',
    parcelasDisponibles: 28,
    totalParcelas: 35,
    precioDesde: '$65.000.000',
    precioHasta: '$120.000.000',
    superficieDesde: '6.000 m²',
    superficieHasta: '15.000 m²',
    imagen: 'https://images.unsplash.com/photo-1623545848644-1a0730842621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHZhbGxleSUyMHJpdmVyfGVufDF8fHx8MTc2OTQ0OTIyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    imagenes: [
      'https://images.unsplash.com/photo-1623545848644-1a0730842621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHZhbGxleSUyMHJpdmVyfGVufDF8fHx8MTc2OTQ0OTIyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1763257708309-d42f13d74c2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXJpYWwlMjB2aWV3JTIwcmVzaWRlbnRpYWwlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3Njk0NTE0MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    masterplan: 'https://images.unsplash.com/photo-1721244654392-9c912a6eb236?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXN0ZXJwbGFuJTIwYXJjaGl0ZWN0dXJlJTIwYmx1ZXByaW50fGVufDF8fHx8MTc2OTQ1MTQxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caracteristicas: ['Entorno cordillerano', 'A 1h de Santiago', 'Seguridad privada'],
    descripcionCorta: 'Proyecto residencial de montaña cerca de la capital',
    descripcionCompleta: 'Valle Andino es un exclusivo proyecto residencial de montaña en San José de Maipo, próximo a lanzarse al mercado. A solo una hora de Santiago, ofrece la oportunidad única de vivir rodeado de naturaleza cordillerana sin alejarte de la ciudad. Con parcelas desde 6.000 m², este proyecto está diseñado para quienes buscan tranquilidad, aire puro y vistas espectaculares de la Cordillera de los Andes. Incluirá seguridad privada, acceso controlado y todas las autorizaciones para construcción de viviendas. Pre-venta exclusiva con condiciones especiales.',
    infraestructura: ['Entorno cordillerano', 'A 1h de Santiago', 'Seguridad privada', 'Acceso controlado', 'Agua de vertiente', 'Electricidad', 'Fibra óptica'],
    publicadoPor: 'Roberto Silva',
    tipoVendedor: 'Broker',
    descripcionVendedor: 'Especialista en inversiones residenciales de montaña en la Región Metropolitana',
    imagenVendedor: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2OTQxMjQ4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    emailVendedor: 'rsilva@broker.cl',
    telefonoVendedor: '+56 9 4321 0987',
    direccion: 'Camino al Volcán Km 45, San José de Maipo',
    coordenadas: { lat: -33.6446, lng: -70.3556 },
    imagenPanoramica: 'https://images.unsplash.com/photo-1623545848644-1a0730842621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHZhbGxleSUyMHJpdmVyfGVufDF8fHx8MTc2OTQ0OTIyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    parcelasDelProyecto: []
  },
  {
    id: 6,
    nombre: 'Parcelas Bosque Nativo',
    ubicacion: 'Valdivia',
    region: 'Los Ríos',
    tipo: 'Turístico',
    estado: 'En venta',
    parcelasDisponibles: 15,
    totalParcelas: 20,
    precioDesde: '$42.000.000',
    precioHasta: '$75.000.000',
    superficieDesde: '7.000 m²',
    superficieHasta: '12.000 m²',
    imagen: 'https://images.unsplash.com/photo-1662419089740-da2a6365501d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBuYXR1cmUlMjB0cmFpbHN8ZW58MXx8fHwxNzY5NDQ5MjIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    imagenes: [
      'https://images.unsplash.com/photo-1662419089740-da2a6365501d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBuYXR1cmUlMjB0cmFpbHN8ZW58MXx8fHwxNzY5NDQ5MjIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1627750168257-9a7d3965ef8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBjYWJpbnMlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzY5NDQ5MjIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    masterplan: 'https://images.unsplash.com/photo-1721244654392-9c912a6eb236?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXN0ZXJwbGFuJTIwYXJjaGl0ZWN0dXJlJTIwYmx1ZXByaW50fGVufDF8fHx8MTc2OTQ1MTQxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caracteristicas: ['Bosque nativo', 'Río interior', 'Diseño sustentable'],
    descripcionCorta: 'Proyecto ecológico inmerso en bosque nativo valdiviano',
    descripcionCompleta: 'Bosque Nativo es un proyecto ecológico único en Valdivia, diseñado bajo principios de sustentabilidad y respeto por el medio ambiente. Las parcelas están inmersas en bosque nativo valdiviano protegido, con acceso a un río de aguas cristalinas que atraviesa la propiedad. El proyecto promueve construcciones de bajo impacto ambiental y ofrece asesoría en diseño sustentable. Ideal para quienes buscan un estilo de vida en armonía con la naturaleza, con posibilidad de desarrollo turístico ecológico.',
    infraestructura: ['Bosque nativo protegido', 'Río interior', 'Diseño sustentable', 'Senderos ecológicos', 'Energía renovable', 'Tratamiento de aguas'],
    publicadoPor: 'María González',
    tipoVendedor: 'Vendedor particular',
    descripcionVendedor: 'Propietaria directa comprometida con proyectos sustentables y respetuosos con el medio ambiente',
    imagenVendedor: 'https://images.unsplash.com/photo-1627199219038-e8263f729e3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBzbWlsZXxlbnwxfHx8fDE3Njk0MTE0Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    emailVendedor: 'mgonzalez@email.com',
    telefonoVendedor: '+56 9 3210 9876',
    direccion: 'Camino a Niebla Km 22, Valdivia',
    coordenadas: { lat: -39.8142, lng: -73.2459 },
    imagenPanoramica: 'https://images.unsplash.com/photo-1662419089740-da2a6365501d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBuYXR1cmUlMjB0cmFpbHN8ZW58MXx8fHwxNzY5NDQ5MjIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    parcelasDelProyecto: [
      {
        id: 601,
        nombre: 'Parcela Bosque 4',
        superficie: '7.000 m²',
        precio: '$42.000.000',
        imagen: 'https://images.unsplash.com/photo-1662419089740-da2a6365501d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBuYXR1cmUlMjB0cmFpbHN8ZW58MXx8fHwxNzY5NDQ5MjIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      {
        id: 602,
        nombre: 'Parcela Río 9',
        superficie: '10.000 m²',
        precio: '$62.000.000',
        imagen: 'https://images.unsplash.com/photo-1662419089740-da2a6365501d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBuYXR1cmUlMjB0cmFpbHN8ZW58MXx8fHwxNzY5NDQ5MjIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      }
    ]
  }
];

export const getAllProyectos = (): Proyecto[] => {
  return proyectosData;
};

export const getProyectoById = (id: number): Proyecto | undefined => {
  return proyectosData.find(proyecto => proyecto.id === id);
};