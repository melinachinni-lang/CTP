import React, { useState } from 'react';
import { Home, Droplets, Zap, Route, TreePine, Users, Building2, Shield, Mountain, MapPin, Sprout, Eye, Waves, Expand, ChevronLeft, ChevronRight } from 'lucide-react';
import { PublicadoPorCompact } from '@/app/components/PublicadoPorCompact';
import { Proyecto } from '@/app/data/proyectosData';
import { PrecioDisplay } from '@/app/components/PrecioDisplay';

interface ProjectCardProps {
  proyecto: Proyecto;
  onViewProject: (id: number) => void;
}

// Mapeo de características a iconos
const getCaracteristicaIcon = (caracteristica: string) => {
  const lower = caracteristica.toLowerCase();
  
  // Agua y electricidad
  if (lower.includes('agua')) return <Droplets className="w-4 h-4" />;
  if (lower.includes('electricidad') || lower.includes('luz')) return <Zap className="w-4 h-4" />;
  
  // Accesos y caminos
  if (lower.includes('camino') || lower.includes('pavimentado')) return <Route className="w-4 h-4" />;
  if (lower.includes('acceso directo')) return <Route className="w-4 h-4" />;
  if (lower.includes('acceso') && lower.includes('controlado')) return <Shield className="w-4 h-4" />;
  
  // Seguridad
  if (lower.includes('portería') || (lower.includes('seguridad') && !lower.includes('sustentable'))) return <Shield className="w-4 h-4" />;
  
  // Áreas verdes y naturaleza
  if (lower.includes('áreas verdes') || lower.includes('verde')) return <TreePine className="w-4 h-4" />;
  if (lower.includes('bosque')) return <TreePine className="w-4 h-4" />;
  if (lower.includes('senderos')) return <Route className="w-4 h-4" />;
  
  // Áreas comunes
  if (lower.includes('quincho') || lower.includes('común')) return <Users className="w-4 h-4" />;
  if (lower.includes('club house') || lower.includes('club')) return <Building2 className="w-4 h-4" />;
  
  // Agrícola
  if (lower.includes('riego')) return <Droplets className="w-4 h-4" />;
  if (lower.includes('suelo') || lower.includes('fértil')) return <Sprout className="w-4 h-4" />;
  
  // Vistas y naturaleza
  if (lower.includes('vista')) return <Eye className="w-4 h-4" />;
  if (lower.includes('río')) return <Waves className="w-4 h-4" />;
  if (lower.includes('cordillerano') || lower.includes('entorno')) return <Mountain className="w-4 h-4" />;
  
  // Ubicación
  if (lower.includes('santiago') || lower.includes('1h')) return <MapPin className="w-4 h-4" />;
  
  // Diseño y sustentable
  if (lower.includes('sustentable') || lower.includes('diseño')) return <TreePine className="w-4 h-4" />;
  
  return <Building2 className="w-4 h-4" />;
};

// Mapeo de tipo de proyecto a icono
const getTipoIcon = (tipo: string) => {
  switch (tipo) {
    case 'Residencial':
      return <Home className="w-4 h-4" />;
    case 'Turístico':
      return <TreePine className="w-4 h-4" />;
    case 'Agrícola':
      return <Building2 className="w-4 h-4" />;
    case 'Mixto':
      return <Users className="w-4 h-4" />;
    default:
      return <Building2 className="w-4 h-4" />;
  }
};

export function ProjectCard({ proyecto, onViewProject }: ProjectCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Usar imagenes array si existe, sino usar la imagen única
  const imageArray = proyecto.imagenes && proyecto.imagenes.length > 0 ? proyecto.imagenes : [proyecto.imagen];

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? imageArray.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === imageArray.length - 1 ? 0 : prev + 1));
  };

  const getEstadoBadgeStyles = () => {
    switch (proyecto.estado) {
      case 'En venta':
        return { backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#16a34a', border: '1px solid rgba(34, 197, 94, 0.2)' };
      case 'Próximamente':
        return { backgroundColor: 'rgba(0, 107, 78, 0.1)', color: '#006B4E', border: '1px solid rgba(0, 107, 78, 0.2)' };
      case 'En construcción':
        return { backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#d97706', border: '1px solid rgba(245, 158, 11, 0.2)' };
      default:
        return { backgroundColor: 'rgba(156, 163, 175, 0.1)', color: '#6b7280', border: '1px solid rgba(156, 163, 175, 0.2)' };
    }
  };

  const estadoStyles = getEstadoBadgeStyles();

  return (
    <div 
      onClick={() => onViewProject(proyecto.id)}
      className="h-full flex flex-col rounded-xl shadow-sm cursor-pointer group overflow-hidden"
      style={{
        border: '2px solid #E5E5E5',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(70, 38, 17, 0.15)';
        setIsHovered(true);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        setIsHovered(false);
      }}
    >
      {/* Imagen con carrusel */}
      <div 
        className="relative flex-shrink-0"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="aspect-[4/3] bg-gray-200 overflow-hidden">
          <img
            src={imageArray[currentImageIndex]}
            alt={proyecto.nombre}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              console.log('Error cargando imagen:', imageArray[currentImageIndex]);
            }}
          />
        </div>
        
        {/* Badge de estado - top right */}
        <div 
          className="absolute top-3 right-3 px-2.5 py-1 rounded-full z-10"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            color: '#0A0A0A',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            fontWeight: 500,
            backdropFilter: 'blur(8px)'
          }}
        >
          {proyecto.estado}
        </div>

        {/* Flechas de navegación - solo si hay más de 1 imagen */}
        {imageArray.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-opacity duration-200 hover:bg-white shadow-lg"
              style={{
                opacity: isHovered ? 1 : 0,
                pointerEvents: isHovered ? 'auto' : 'none'
              }}
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-5 h-5" style={{ color: '#0A0A0A' }} />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-opacity duration-200 hover:bg-white shadow-lg"
              style={{
                opacity: isHovered ? 1 : 0,
                pointerEvents: isHovered ? 'auto' : 'none'
              }}
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="w-5 h-5" style={{ color: '#0A0A0A' }} />
            </button>

            {/* Indicadores de posición */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {imageArray.map((_, index) => (
                <div
                  key={index}
                  className="transition-all duration-200"
                  style={{
                    width: index === currentImageIndex ? '20px' : '6px',
                    height: '6px',
                    borderRadius: '3px',
                    backgroundColor: index === currentImageIndex ? '#462611' : 'rgba(255, 255, 255, 0.7)',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Contenido */}
      <div className="p-5 space-y-4 bg-white flex-grow flex flex-col">
        {/* Nombre y ubicación */}
        <div className="space-y-1">
          <h3 style={{ color: '#0A0A0A', fontSize: 'var(--font-size-body-lg)', fontWeight: 'var(--font-weight-semibold)' }}>
            {proyecto.nombre}
          </h3>
          <p className="text-sm text-gray-500" style={{ fontSize: 'var(--font-size-xs)', lineHeight: 'var(--line-height-ui)' }}>
            {proyecto.ubicacion}, {proyecto.region}
          </p>
        </div>

        {/* Tipo de proyecto con parcelas disponibles */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="text-gray-600">
              {getTipoIcon(proyecto.tipo)}
            </div>
            <span 
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                fontWeight: 500,
                color: '#0A0A0A'
              }}
            >
              Proyecto {proyecto.tipo}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Home className="w-4 h-4" style={{ color: '#16a34a' }} />
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                fontWeight: 500,
                color: '#16a34a'
              }}
            >
              {proyecto.parcelasDisponibles} disponibles
            </span>
          </div>
        </div>

        {/* Descripción corta */}
        <p 
          className="text-sm flex-grow"
          style={{ 
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            fontWeight: 400,
            color: '#6B6B6B',
            lineHeight: '1.5'
          }}
        >
          {proyecto.descripcionCorta}
        </p>

        {/* Precio */}
        <div className="pt-3 border-t border-gray-200">
          <div className="text-xs text-gray-500 mb-1" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>Desde</div>
          <PrecioDisplay 
            precioCLP={proyecto.precioDesde}
            precioSize="lg"
          />
        </div>

        {/* Características con iconos */}
        <div className="grid grid-cols-2 gap-3">
          {proyecto.caracteristicas.slice(0, 3).map((caracteristica, index) => (
            <div key={index} className="flex items-center gap-2 text-sm" style={{ color: '#0A0A0A' }}>
              <div className="text-gray-600">
                {getCaracteristicaIcon(caracteristica)}
              </div>
              <span className="font-medium" style={{ fontSize: '13px' }}>{caracteristica}</span>
            </div>
          ))}
          {/* Superficie desde */}
          <div className="flex items-center gap-2 text-sm" style={{ color: '#0A0A0A' }}>
            <div className="text-gray-600">
              <Expand className="w-4 h-4" />
            </div>
            <span className="font-medium" style={{ fontSize: '13px' }}>Desde {proyecto.superficieDesde}</span>
          </div>
        </div>

        {/* Publicado por */}
        <PublicadoPorCompact 
          logo={proyecto.imagenVendedor} 
          nombre={proyecto.publicadoPor}
          tipoVendedor={proyecto.tipoVendedor}
        />
      </div>
    </div>
  );
}