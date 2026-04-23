import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectCardImageProps {
  imagenes?: string[];
  imagen: string;
  nombre: string;
}

export function ProjectCardImage({ imagenes, imagen, nombre }: ProjectCardImageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const imageArray = imagenes && imagenes.length > 0 ? imagenes : [imagen];

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? imageArray.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === imageArray.length - 1 ? 0 : prev + 1));
  };

  return (
    <div 
      className="relative flex-shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[4/3] bg-gray-200 overflow-hidden">
        <img 
          src={imageArray[currentImageIndex]}
          alt={nombre}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
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
  );
}
