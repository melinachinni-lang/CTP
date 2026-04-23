import React from 'react';
import { Expand, Pickaxe, Compass, Mountain, Home, Droplet, Zap, DoorOpen, Fence, FileCheck, FileText, CheckCircle } from 'lucide-react';
import { proyectosData } from './proyectosData';
import type { Proyecto } from './proyectosData';

// Agregar características detalladas a todos los proyectos
const proyectosConCaracteristicas: Proyecto[] = proyectosData.map((proyecto) => {
  // Proyecto 1: Parcelas Valle Verde (Pucón - Residencial)
  if (proyecto.id === 1) {
    return {
      ...proyecto,
      caracteristicasTerreno: [
        { label: 'Superficie total', valor: '5.000-12.000 m²', icon: <Expand className="w-6 h-6" /> },
        { label: 'Tipo de suelo', valor: 'Mixto', icon: <Pickaxe className="w-6 h-6" /> },
        { label: 'Orientación', valor: 'Norte', icon: <Compass className="w-6 h-6" /> },
        { label: 'Pendiente', valor: 'Suave (5-10%)', icon: <Mountain className="w-6 h-6" /> },
        { label: 'Uso permitido', valor: 'Residencial, turístico', icon: <Home className="w-6 h-6" /> }
      ],
      caracteristicasServicios: [
        { label: 'Agua', valor: 'Factibilidad aprobada', icon: <Droplet className="w-6 h-6" /> },
        { label: 'Electricidad', valor: 'A 200 metros', icon: <Zap className="w-6 h-6" /> },
        { label: 'Acceso', valor: 'Camino público pavimentado', icon: <DoorOpen className="w-6 h-6" /> },
        { label: 'Cerco', valor: 'Perimetral ejecutado', icon: <Fence className="w-6 h-6" /> },
        { label: 'Portón', valor: 'Acceso vehicular', icon: <DoorOpen className="w-6 h-6" /> }
      ],
      caracteristicasLegal: [
        { label: 'Rol de avalúo', valor: 'Aprobado y al día', icon: <FileCheck className="w-6 h-6" /> },
        { label: 'Estado legal', valor: 'Escritura lista', icon: <FileText className="w-6 h-6" /> },
        { label: 'Documentación', valor: 'Completa y verificada', icon: <CheckCircle className="w-6 h-6" /> }
      ],
      plano: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmUlMjBibHVlcHJpbnQlMjBwbGFufGVufDF8fHx8MTczNzg4NjAwMHww&ixlib=rb-4.1.0&q=80&w=1080',
      documentos: [
        { nombre: 'Masterplan general', tipo: 'PDF - 2.4 MB', disponible: true },
        { nombre: 'Reglamento de copropiedad', tipo: 'PDF - 1.8 MB', disponible: true },
        { nombre: 'Certificado de informes previos', tipo: 'PDF - 850 KB', disponible: true },
        { nombre: 'Plano de loteo aprobado', tipo: 'PDF - 3.2 MB', disponible: true },
        { nombre: 'Factibilidad de servicios', tipo: 'PDF - 1.1 MB', disponible: false }
      ],
      entorno: {
        accesos: {
          tiempoAlCentro: '10min',
          tiempoAlCentroMinutos: 10,
          ciudadCercana: 'Pucón, 8 km',
          distanciaCiudadCercana: '8 km',
          tipoAcceso: 'Camino pavimentado',
          calidadAcceso: 4,
          ciudadPrincipal: 'Temuco',
          distanciaCiudadPrincipal: '110 km'
        },
        servicios: {
          educacion: { nivel: 'Alta', porcentaje: 90 },
          comercio: { nivel: 'Alta', porcentaje: 95 },
          salud: { nivel: 'Alta', porcentaje: 85 },
          recreacion: { nivel: 'Muy alta', porcentaje: 98 }
        },
        naturaleza: {
          nivel: 5,
          descripcion: 'Rodeado de bosque nativo y volcanes',
          vistas: 5,
          descripcionVistas: 'Vista panorámica al lago Villarrica y volcán',
          temperaturaPromedio: '12°C',
          precipitaciones: 'Altas'
        },
        contexto: {
          poblacion: '28.000',
          actividadesPrincipales: ['Turismo', 'Servicios', 'Comercio']
        }
      }
    };
  }
  
  // Proyecto 2: Condominio Los Robles (Villarrica - Turístico)
  if (proyecto.id === 2) {
    return {
      ...proyecto,
      caracteristicasTerreno: [
        { label: 'Superficie total', valor: '3.000-8.000 m²', icon: <Expand className="w-6 h-6" /> },
        { label: 'Tipo de suelo', valor: 'Forestal', icon: <Pickaxe className="w-6 h-6" /> },
        { label: 'Orientación', valor: 'Nor-Este', icon: <Compass className="w-6 h-6" /> },
        { label: 'Pendiente', valor: 'Moderada (10-15%)', icon: <Mountain className="w-6 h-6" /> },
        { label: 'Uso permitido', valor: 'Turístico, cabañas', icon: <Home className="w-6 h-6" /> }
      ],
      caracteristicasServicios: [
        { label: 'Agua', valor: 'Red instalada', icon: <Droplet className="w-6 h-6" /> },
        { label: 'Electricidad', valor: 'Disponible en parcela', icon: <Zap className="w-6 h-6" /> },
        { label: 'Acceso', valor: 'Portería 24/7', icon: <DoorOpen className="w-6 h-6" /> },
        { label: 'Cerco', valor: 'Perímetro completo', icon: <Fence className="w-6 h-6" /> },
        { label: 'Áreas comunes', valor: 'Quincho y senderos', icon: <Home className="w-6 h-6" /> }
      ],
      caracteristicasLegal: [
        { label: 'Rol de avalúo', valor: 'Actualizado', icon: <FileCheck className="w-6 h-6" /> },
        { label: 'Estado legal', valor: 'Regularizado', icon: <FileText className="w-6 h-6" /> },
        { label: 'Reglamento', valor: 'Aprobado y vigente', icon: <CheckCircle className="w-6 h-6" /> }
      ],
      plano: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmUlMjBibHVlcHJpbnQlMjBwbGFufGVufDF8fHx8MTczNzg4NjAwMHww&ixlib=rb-4.1.0&q=80&w=1080',
      documentos: [
        { nombre: 'Plano de loteo', tipo: 'PDF - 1.9 MB', disponible: true },
        { nombre: 'Reglamento interno', tipo: 'PDF - 1.2 MB', disponible: true },
        { nombre: 'Normas de construcción', tipo: 'PDF - 680 KB', disponible: true },
        { nombre: 'Estudio de impacto ambiental', tipo: 'PDF - 2.8 MB', disponible: false }
      ],
      entorno: {
        accesos: {
          tiempoAlCentro: '12min',
          tiempoAlCentroMinutos: 12,
          ciudadCercana: 'Villarrica, 9 km',
          distanciaCiudadCercana: '9 km',
          tipoAcceso: 'Camino de ripio consolidado',
          calidadAcceso: 3,
          ciudadPrincipal: 'Temuco',
          distanciaCiudadPrincipal: '95 km'
        },
        servicios: {
          educacion: { nivel: 'Alta', porcentaje: 85 },
          comercio: { nivel: 'Media', porcentaje: 70 },
          salud: { nivel: 'Media', porcentaje: 75 },
          recreacion: { nivel: 'Muy alta', porcentaje: 95 }
        },
        naturaleza: {
          nivel: 5,
          descripcion: 'Bosque nativo y entorno prístino',
          vistas: 4,
          descripcionVistas: 'Vista a montañas y bosques',
          temperaturaPromedio: '11°C',
          precipitaciones: 'Altas'
        },
        contexto: {
          poblacion: '59.000',
          actividadesPrincipales: ['Turismo', 'Agricultura', 'Servicios']
        }
      }
    };
  }
  
  // Proyecto 3: Reserva Natural Alto Río (Río Bueno - Mixto)
  if (proyecto.id === 3) {
    return {
      ...proyecto,
      caracteristicasTerreno: [
        { label: 'Superficie total', valor: '10.000-20.000 m²', icon: <Expand className="w-6 h-6" /> },
        { label: 'Tipo de suelo', valor: 'Agrícola clase I', icon: <Pickaxe className="w-6 h-6" /> },
        { label: 'Orientación', valor: 'Norte', icon: <Compass className="w-6 h-6" /> },
        { label: 'Pendiente', valor: 'Plana (0-5%)', icon: <Mountain className="w-6 h-6" /> },
        { label: 'Uso permitido', valor: 'Mixto: agrícola y residencial', icon: <Home className="w-6 h-6" /> }
      ],
      caracteristicasServicios: [
        { label: 'Agua', valor: 'Río + pozo profundo', icon: <Droplet className="w-6 h-6" /> },
        { label: 'Electricidad', valor: 'Trifásica disponible', icon: <Zap className="w-6 h-6" /> },
        { label: 'Acceso', valor: 'Camino ripio consolidado', icon: <DoorOpen className="w-6 h-6" /> },
        { label: 'Riego', valor: 'Derechos de agua incluidos', icon: <Droplet className="w-6 h-6" /> },
        { label: 'Infraestructura', valor: 'Red de riego proyectada', icon: <Fence className="w-6 h-6" /> }
      ],
      caracteristicasLegal: [
        { label: 'Rol de avalúo', valor: 'Al día y subdividido', icon: <FileCheck className="w-6 h-6" /> },
        { label: 'Derechos de agua', valor: 'Inscritos y traspasables', icon: <FileText className="w-6 h-6" /> },
        { label: 'Documentación', valor: 'Títulos saneados', icon: <CheckCircle className="w-6 h-6" /> }
      ],
      plano: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmUlMjBibHVlcHJpbnQlMjBwbGFufGVufDF8fHx8MTczNzg4NjAwMHww&ixlib=rb-4.1.0&q=80&w=1080',
      documentos: [
        { nombre: 'Plano de subdivisión', tipo: 'PDF - 3.1 MB', disponible: true },
        { nombre: 'Inscripción derechos de agua', tipo: 'PDF - 1.5 MB', disponible: true },
        { nombre: 'Estudio de suelos agrícolas', tipo: 'PDF - 2.2 MB', disponible: true },
        { nombre: 'Certificado de avalúo fiscal', tipo: 'PDF - 450 KB', disponible: true },
        { nombre: 'Plano topográfico detallado', tipo: 'PDF - 4.8 MB', disponible: false }
      ],
      entorno: {
        accesos: {
          tiempoAlCentro: '18min',
          tiempoAlCentroMinutos: 18,
          ciudadCercana: 'Río Bueno, 14 km',
          distanciaCiudadCercana: '14 km',
          tipoAcceso: 'Camino de ripio consolidado',
          calidadAcceso: 3,
          ciudadPrincipal: 'Osorno',
          distanciaCiudadPrincipal: '35 km'
        },
        servicios: {
          educacion: { nivel: 'Media', porcentaje: 70 },
          comercio: { nivel: 'Media', porcentaje: 65 },
          salud: { nivel: 'Media', porcentaje: 60 },
          recreacion: { nivel: 'Alta', porcentaje: 85 }
        },
        naturaleza: {
          nivel: 4,
          descripcion: 'Entorno rural con río y campos',
          vistas: 3,
          descripcionVistas: 'Vista a campos y río',
          temperaturaPromedio: '11°C',
          precipitaciones: 'Muy altas'
        },
        contexto: {
          poblacion: '32.000',
          actividadesPrincipales: ['Agricultura', 'Ganadería', 'Turismo rural']
        }
      }
    };
  }
  
  // Proyecto 4: Parcelas Los Alerces (Frutillar - Residencial)
  if (proyecto.id === 4) {
    return {
      ...proyecto,
      caracteristicasTerreno: [
        { label: 'Superficie total', valor: '5.000-10.000 m²', icon: <Expand className="w-6 h-6" /> },
        { label: 'Tipo de suelo', valor: 'Arcilloso', icon: <Pickaxe className="w-6 h-6" /> },
        { label: 'Orientación', valor: 'Oeste', icon: <Compass className="w-6 h-6" /> },
        { label: 'Pendiente', valor: 'Suave (5-8%)', icon: <Mountain className="w-6 h-6" /> },
        { label: 'Uso permitido', valor: 'Residencial exclusivo', icon: <Home className="w-6 h-6" /> }
      ],
      caracteristicasServicios: [
        { label: 'Agua', valor: 'APR conectado', icon: <Droplet className="w-6 h-6" /> },
        { label: 'Electricidad', valor: 'Monofásica y trifásica', icon: <Zap className="w-6 h-6" /> },
        { label: 'Acceso', valor: 'Calle pavimentada', icon: <DoorOpen className="w-6 h-6" /> },
        { label: 'Internet', valor: 'Fibra óptica disponible', icon: <Zap className="w-6 h-6" /> },
        { label: 'Alcantarillado', valor: 'En proyecto', icon: <Fence className="w-6 h-6" /> }
      ],
      caracteristicasLegal: [
        { label: 'Rol de avalúo', valor: 'Individual por parcela', icon: <FileCheck className="w-6 h-6" /> },
        { label: 'Permisos', valor: 'Construcción aprobados', icon: <FileText className="w-6 h-6" /> },
        { label: 'Escrituras', valor: 'Listas para firma', icon: <CheckCircle className="w-6 h-6" /> }
      ],
      plano: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmUlMjBibHVlcHJpbnQlMjBwbGFufGVufDF8fHx8MTczNzg4NjAwMHww&ixlib=rb-4.1.0&q=80&w=1080',
      documentos: [
        { nombre: 'Masterplan urbanístico', tipo: 'PDF - 2.7 MB', disponible: true },
        { nombre: 'Certificado de informes previos', tipo: 'PDF - 920 KB', disponible: true },
        { nombre: 'Normas urbanísticas', tipo: 'PDF - 1.4 MB', disponible: true }
      ],
      entorno: {
        accesos: {
          tiempoAlCentro: '8min',
          tiempoAlCentroMinutos: 8,
          ciudadCercana: 'Frutillar, 6 km',
          distanciaCiudadCercana: '6 km',
          tipoAcceso: 'Camino pavimentado',
          calidadAcceso: 4,
          ciudadPrincipal: 'Puerto Montt',
          distanciaCiudadPrincipal: '48 km'
        },
        servicios: {
          educacion: { nivel: 'Muy alta', porcentaje: 95 },
          comercio: { nivel: 'Alta', porcentaje: 88 },
          salud: { nivel: 'Alta', porcentaje: 82 },
          recreacion: { nivel: 'Muy alta', porcentaje: 92 }
        },
        naturaleza: {
          nivel: 5,
          descripcion: 'Entorno natural con vista al lago',
          vistas: 5,
          descripcionVistas: 'Vista panorámica al lago Llanquihue',
          temperaturaPromedio: '10°C',
          precipitaciones: 'Muy altas'
        },
        contexto: {
          poblacion: '18.000',
          actividadesPrincipales: ['Turismo cultural', 'Servicios', 'Comercio']
        }
      }
    };
  }
  
  return proyecto;
});

export const getAllProyectosWithIcons = (): Proyecto[] => {
  return proyectosConCaracteristicas;
};

export const getProyectoByIdWithIcons = (id: number): Proyecto | undefined => {
  return proyectosConCaracteristicas.find(proyecto => proyecto.id === id);
};