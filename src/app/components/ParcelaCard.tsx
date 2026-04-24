import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { PublicadoPorCompact } from '@/app/components/PublicadoPorCompact';
import { PrecioDisplay } from '@/app/components/PrecioDisplay';

interface ParcelaCardProps {
  id: number;
  nombre: string;
  ubicacion: string;
  imagen: string;
  imagenes?: string[];
  precio: string;
  caracteristicas: Array<{
    icon: React.ReactNode;
    text: string;
  }>;
  inmobiliaria: string;
  brokerImagen: string;
  tipoVendedor: string;
  onClick: () => void;
}

export function ParcelaCard({
  nombre,
  ubicacion,
  imagen,
  imagenes,
  precio,
  caracteristicas,
  inmobiliaria,
  brokerImagen,
  tipoVendedor,
  onClick
}: ParcelaCardProps) {
  // Asegurar que siempre tengamos al menos 4 características para mostrar
  const displayCaracteristicas = [...caracteristicas];
  while (displayCaracteristicas.length < 4) {
    displayCaracteristicas.push(caracteristicas[caracteristicas.length - 1] || { icon: null, text: '-' });
  }

  // Estado para el carrusel
  const hasNoImages = (!imagenes || imagenes.length === 0) && !imagen;
  const imageArray = imagenes && imagenes.length > 0 ? imagenes : (imagen ? [imagen] : []);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

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
      onClick={onClick}
      className="h-full flex flex-col rounded-xl shadow-sm cursor-pointer group overflow-hidden"
      style={{
        border: '2px solid #E5E5E5',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(100, 126, 63, 0.25)';
        setIsHovered(true);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        setIsHovered(false);
      }}
    >
      {/* Área de imagen o placeholder */}
      {hasNoImages ? (
        <div className="relative flex-shrink-0">
          <div 
            className="aspect-[4/3] overflow-hidden flex flex-col items-center justify-center"
            style={{ backgroundColor: '#F5F5F5' }}
          >
            <ImageIcon 
              className="w-12 h-12 mb-2" 
              style={{ color: '#CDD8DE', strokeWidth: 1.5 }} 
            />
            <p 
              style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-xs)', 
                color: '#9CA3AF',
                fontWeight: 'var(--font-weight-medium)'
              }}
            >
              Sin imagen disponible
            </p>
          </div>
        </div>
      ) : (
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
                      backgroundColor: index === currentImageIndex ? '#006B4E' : 'rgba(255, 255, 255, 0.7)',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
      <div className="p-4 space-y-3 bg-white flex-grow flex flex-col">
        <div className="space-y-0.5">
          <h3 style={{ color: '#0A0A0A', fontSize: 'var(--font-size-body)', fontWeight: 'var(--font-weight-semibold)' }}>{nombre}</h3>
          <p className="text-xs text-gray-500" style={{ fontSize: 'var(--font-size-xs)', lineHeight: 'var(--line-height-ui)' }}>{ubicacion}</p>
        </div>
        
        <div className="space-y-1.5 flex-grow">
          <div className="grid grid-cols-2 gap-2">
            {displayCaracteristicas[0] && (
              <div className="flex items-center gap-1.5 text-xs" style={{ color: '#0A0A0A' }}>
                <div className="[&>svg]:w-3.5 [&>svg]:h-3.5 [&_path]:fill-[#006B4E] [&_circle]:stroke-[#006B4E] [&_rect]:fill-[#006B4E] [&_line]:stroke-[#006B4E] [&_polyline]:stroke-[#006B4E]" style={{ color: '#006B4E' }}>{displayCaracteristicas[0].icon}</div>
                <span className="font-medium">{displayCaracteristicas[0].text}</span>
              </div>
            )}
            {displayCaracteristicas[1] && (
              <div className="flex items-center gap-1.5 text-xs" style={{ color: '#0A0A0A' }}>
                <div className="[&>svg]:w-3.5 [&>svg]:h-3.5 [&_path]:fill-[#006B4E] [&_circle]:stroke-[#006B4E] [&_rect]:fill-[#006B4E] [&_line]:stroke-[#006B4E] [&_polyline]:stroke-[#006B4E]" style={{ color: '#006B4E' }}>{displayCaracteristicas[1].icon}</div>
                <span className="font-medium">{displayCaracteristicas[1].text}</span>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {displayCaracteristicas[2] && (
              <div className="flex items-center gap-1.5 text-xs" style={{ color: '#0A0A0A' }}>
                <div className="[&>svg]:w-3.5 [&>svg]:h-3.5 [&_path]:fill-[#006B4E] [&_circle]:stroke-[#006B4E] [&_rect]:fill-[#006B4E] [&_line]:stroke-[#006B4E] [&_polyline]:stroke-[#006B4E]" style={{ color: '#006B4E' }}>{displayCaracteristicas[2].icon}</div>
                <span className="font-medium">{displayCaracteristicas[2].text}</span>
              </div>
            )}
            {displayCaracteristicas[3] && (
              <div className="flex items-center gap-1.5 text-xs" style={{ color: '#0A0A0A' }}>
                <div className="[&>svg]:w-3.5 [&>svg]:h-3.5 [&_path]:fill-[#006B4E] [&_circle]:stroke-[#006B4E] [&_rect]:fill-[#006B4E] [&_line]:stroke-[#006B4E] [&_polyline]:stroke-[#006B4E]" style={{ color: '#006B4E' }}>{displayCaracteristicas[3].icon}</div>
                <span className="font-medium">{displayCaracteristicas[3].text}</span>
              </div>
            )}
          </div>
        </div>

        <div className="pt-2.5" style={{ borderTop: '1px solid #CDD8DE' }}>
          <div className="mb-2">
            <div className="text-xs mb-0.5" style={{ color: '#462611', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.625rem' }}>Desde</div>
            <PrecioDisplay 
              precioCLP={precio}
              precioSize="md"
            />
          </div>
          
          <PublicadoPorCompact 
            logo={brokerImagen} 
            nombre={inmobiliaria}
            tipoVendedor={tipoVendedor}
          />
        </div>
      </div>
    </div>
  );
}