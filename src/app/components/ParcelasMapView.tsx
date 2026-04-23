import React, { useState } from 'react';
import { MapPin, X, Minus, Plus, Maximize2, Navigation } from 'lucide-react';
import { PrecioDisplay } from '@/app/components/PrecioDisplay';

interface ParcelaDisplay {
  id: number;
  nombre: string;
  ubicacion: string;
  precio: string;
  precioNumero: number;
  superficie: string;
  superficieNumero: number;
  imagenes: string[];
  imagen: string;
  lat?: number;
  lng?: number;
  caracteristicas?: Array<{ icon: React.ReactNode; text: string }>;
  inmobiliaria: string;
  tipoVendedor: string;
  brokerImagen: string;
}

interface ParcelasMapViewProps {
  parcelas: ParcelaDisplay[];
  selectedParcelaId: number | null;
  onParcelaSelect: (id: number | null) => void;
  onParcelaClick: (id: number) => void;
}

export function ParcelasMapView({ 
  parcelas, 
  selectedParcelaId, 
  onParcelaSelect,
  onParcelaClick 
}: ParcelasMapViewProps) {
  const selectedParcela = parcelas.find(p => p.id === selectedParcelaId);
  const [zoomLevel, setZoomLevel] = useState(12);
  const [isPanelAnimating, setIsPanelAnimating] = useState(false);

  // Manejar zoom
  const handleZoomIn = () => {
    if (zoomLevel < 18) setZoomLevel(prev => prev + 1);
  };

  const handleZoomOut = () => {
    if (zoomLevel > 8) setZoomLevel(prev => prev - 1);
  };

  // Calcular escala del mapa basado en zoom
  const mapScale = 1 + (zoomLevel - 12) * 0.15;

  return (
    <div className="relative w-full min-h-[600px] md:min-h-[700px]">
      {/* =========================
          CONTENEDOR PRINCIPAL DEL MAPA
          ========================= */}
      <div 
        className="relative w-full h-full min-h-[600px] md:min-h-[700px] rounded-xl overflow-hidden"
        style={{ 
          border: '1px solid #E0E0E0',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          backgroundColor: '#E5E3DF'
        }}
      >
        {/* =========================
            SUPERFICIE DEL MAPA (Base Interactiva)
            ========================= */}
        <div 
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1620662892011-f5c2d523fae2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXRlbGxpdGUlMjBtYXAlMjBzdHJlZXRzJTIwY2l0eSUyMHVyYmFufGVufDF8fHx8MTc3NDg4MjEwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'contrast(1.05) saturate(0.95) brightness(1.02)',
            transform: `scale(${mapScale})`,
            transformOrigin: 'center center'
          }}
        >
          {/* Overlay de grid estilo Google Maps */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              pointerEvents: 'none'
            }}
          />

          {/* Overlay sutil para legibilidad */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)',
              pointerEvents: 'none'
            }}
          />
        </div>

        {/* =========================
            CAPA DE MARKERS (Posicionamiento Absoluto)
            ========================= */}
        <div 
          className="absolute inset-0"
          style={{ 
            zIndex: 10,
            pointerEvents: 'none'
          }}
        >
          {parcelas.slice(0, 15).map((parcela, index) => {
            // Distribución inteligente de markers
            const gridCols = 4;
            const gridRows = 4;
            
            // Posición base en grid
            const colIndex = index % gridCols;
            const rowIndex = Math.floor(index / gridCols);
            
            // Calcular posición con variación natural
            const baseX = (colIndex / (gridCols - 1)) * 80 + 10;
            const baseY = (rowIndex / (gridRows - 1)) * 70 + 15;
            
            // Offset pseudo-aleatorio para distribución natural
            const offsetX = ((parcela.id * 17 + index * 7) % 12) - 6;
            const offsetY = ((parcela.id * 23 + index * 11) % 12) - 6;
            
            const x = Math.min(Math.max(baseX + offsetX, 5), 95);
            const y = Math.min(Math.max(baseY + offsetY, 10), 90);
            
            const isSelected = selectedParcelaId === parcela.id;

            return (
              <button
                key={parcela.id}
                onClick={() => {
                  onParcelaSelect(parcela.id);
                  setIsPanelAnimating(true);
                  setTimeout(() => setIsPanelAnimating(false), 300);
                }}
                className="absolute transition-all duration-300 ease-out group"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: `translate(-50%, -100%) scale(${isSelected ? 1.15 : 1})`,
                  zIndex: isSelected ? 60 : 50,
                  pointerEvents: 'auto'
                }}
                aria-label={`Ver ${parcela.nombre}`}
              >
                {/* Pin del marker */}
                <div className="relative">
                  {/* SVG del pin */}
                  <svg 
                    width={isSelected ? 42 : 35} 
                    height={isSelected ? 54 : 45} 
                    viewBox="0 0 35 45" 
                    fill="none"
                    className="transition-all duration-300"
                    style={{
                      filter: isSelected 
                        ? 'drop-shadow(0 10px 20px rgba(0,0,0,0.35))' 
                        : 'drop-shadow(0 6px 12px rgba(0,0,0,0.25))'
                    }}
                  >
                    {/* Pin principal */}
                    <path 
                      d="M17.5 0C9.492 0 3 6.492 3 14.5C3 24.5 17.5 45 17.5 45C17.5 45 32 24.5 32 14.5C32 6.492 25.508 0 17.5 0Z" 
                      fill={isSelected ? '#647E3F' : '#124854'}
                      className="transition-colors duration-300"
                    />
                    {/* Círculo blanco interno */}
                    <circle 
                      cx="17.5" 
                      cy="14.5" 
                      r="6.5" 
                      fill="white"
                    />
                    {/* Punto central */}
                    <circle 
                      cx="17.5" 
                      cy="14.5" 
                      r="3.5" 
                      fill={isSelected ? '#647E3F' : '#124854'}
                      className="transition-colors duration-300"
                    />
                    {/* Sombra del pin */}
                    <ellipse 
                      cx="17.5" 
                      cy="43" 
                      rx="5" 
                      ry="1.5" 
                      fill="black" 
                      opacity="0.25"
                    />
                  </svg>
                  
                  {/* Badge de precio flotante (solo cuando NO está seleccionado) */}
                  {!isSelected && (
                    <div 
                      className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{
                        background: 'white',
                        border: '1px solid #E5E5E5',
                        fontSize: '11px',
                        fontFamily: 'var(--font-body)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: '#0A0A0A',
                        pointerEvents: 'none'
                      }}
                    >
                      ${Math.round(parcela.precioNumero / 1000000)}M
                    </div>
                  )}
                </div>

                {/* Pulso de animación para marker seleccionado */}
                {isSelected && (
                  <div 
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full animate-ping"
                    style={{
                      backgroundColor: '#647E3F',
                      opacity: 0.3,
                      zIndex: -1
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* =========================
            CONTROLES DEL MAPA (estilo Google Maps)
            ========================= */}
        <div 
          className="absolute top-4 right-4 z-[100] flex flex-col gap-3"
          style={{ pointerEvents: 'auto' }}
        >
          {/* Controles de Zoom */}
          <div 
            className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden"
            style={{ border: '1px solid rgba(0,0,0,0.12)' }}
          >
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 18}
              className="w-11 h-11 flex items-center justify-center hover:bg-gray-50 active:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}
              aria-label="Acercar"
            >
              <Plus 
                size={20} 
                style={{ 
                  color: '#5F6368',
                  strokeWidth: 2.5
                }} 
              />
            </button>
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 8}
              className="w-11 h-11 flex items-center justify-center hover:bg-gray-50 active:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Alejar"
            >
              <Minus 
                size={20} 
                style={{ 
                  color: '#5F6368',
                  strokeWidth: 2.5
                }} 
              />
            </button>
          </div>

          {/* Botón de navegación / recentrar */}
          <button
            className="w-11 h-11 flex items-center justify-center bg-white rounded-lg shadow-lg hover:bg-gray-50 active:bg-gray-100 transition-colors"
            style={{ border: '1px solid rgba(0,0,0,0.12)' }}
            aria-label="Recentrar mapa"
          >
            <Navigation 
              size={18} 
              style={{ 
                color: '#5F6368',
                strokeWidth: 2
              }} 
            />
          </button>

          {/* Botón de pantalla completa */}
          <button
            className="w-11 h-11 flex items-center justify-center bg-white rounded-lg shadow-lg hover:bg-gray-50 active:bg-gray-100 transition-colors"
            style={{ border: '1px solid rgba(0,0,0,0.12)' }}
            aria-label="Pantalla completa"
          >
            <Maximize2 
              size={17} 
              style={{ 
                color: '#5F6368',
                strokeWidth: 2
              }} 
            />
          </button>
        </div>

        {/* Logo y atribución */}
        <div 
          className="absolute bottom-3 left-3 z-[100] flex items-center gap-2"
          style={{ pointerEvents: 'none' }}
        >
          <div 
            className="px-3 py-1.5 bg-white rounded-md shadow-sm"
            style={{ 
              fontSize: '11px',
              fontFamily: 'var(--font-body)',
              fontWeight: 'var(--font-weight-regular)',
              color: '#70757A',
              border: '1px solid rgba(0,0,0,0.08)'
            }}
          >
            © 2026 CompraTuParcela
          </div>
        </div>

        {/* Indicador de nivel de zoom */}
        <div 
          className="absolute bottom-3 right-3 z-[100] px-2.5 py-1 bg-white rounded-md shadow-sm"
          style={{ 
            fontSize: '11px',
            fontFamily: 'var(--font-body)',
            fontWeight: 'var(--font-weight-medium)',
            color: '#5F6368',
            border: '1px solid rgba(0,0,0,0.08)',
            pointerEvents: 'none'
          }}
        >
          Zoom {zoomLevel}
        </div>
      </div>

      {/* =========================
          PANEL LATERAL DE DETALLE (Desktop)
          ========================= */}
      {selectedParcela && (
        <>
          {/* Desktop Panel - Lateral derecho */}
          <div 
            className={`hidden lg:block fixed top-[140px] right-8 w-[380px] bg-white rounded-xl overflow-hidden shadow-2xl z-[200] transition-all duration-300 ${
              isPanelAnimating ? 'translate-x-0' : ''
            }`}
            style={{
              border: '1px solid #CDD8DE',
              maxHeight: 'calc(100vh - 180px)',
              animation: 'slideInRight 0.3s ease-out'
            }}
          >
            {/* Header del Panel */}
            <div 
              className="flex items-center justify-between px-5 py-4"
              style={{ 
                borderBottom: '1px solid #CDD8DE',
                background: '#F5F3F0'
              }}
            >
              <h3 
                style={{ 
                  color: '#0A0A0A',
                  fontSize: 'var(--font-size-body)',
                  fontWeight: 'var(--font-weight-semibold)',
                  fontFamily: 'var(--font-body)'
                }}
              >
                Detalle de la parcela
              </h3>
              <button
                onClick={() => onParcelaSelect(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/80 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-4 h-4" style={{ color: '#0A0A0A' }} />
              </button>
            </div>

            {/* Contenido del Panel - Scrollable */}
            <div 
              className="overflow-y-auto"
              style={{ maxHeight: 'calc(100vh - 280px)' }}
            >
              {/* Imagen de la Parcela */}
              {selectedParcela.imagenes?.[0] && (
                <div 
                  className="w-full h-52 bg-gray-100 overflow-hidden cursor-pointer relative group"
                  onClick={() => onParcelaClick(selectedParcela.id)}
                >
                  <img
                    src={selectedParcela.imagenes[0]}
                    alt={selectedParcela.nombre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Overlay en hover */}
                  <div 
                    className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  />
                </div>
              )}

              {/* Información de la Parcela */}
              <div className="p-5 space-y-4">
                {/* Título y Ubicación */}
                <div className="space-y-2">
                  <h4 
                    style={{ 
                      color: '#0A0A0A', 
                      fontSize: 'var(--font-size-h4)', 
                      fontWeight: 'var(--font-weight-semibold)',
                      lineHeight: 'var(--line-height-heading)',
                      fontFamily: 'var(--font-heading)'
                    }}
                  >
                    {selectedParcela.nombre}
                  </h4>
                  <div className="flex items-start gap-2">
                    <MapPin 
                      className="w-4 h-4 mt-0.5 flex-shrink-0" 
                      style={{ color: '#124854' }} 
                    />
                    <p 
                      style={{ 
                        fontSize: 'var(--font-size-sm)', 
                        lineHeight: 'var(--line-height-body)',
                        color: '#737373',
                        fontFamily: 'var(--font-body)'
                      }}
                    >
                      {selectedParcela.ubicacion}
                    </p>
                  </div>
                </div>

                {/* Características */}
                {selectedParcela.caracteristicas && selectedParcela.caracteristicas.length > 0 && (
                  <div 
                    className="pt-4 space-y-3"
                    style={{ borderTop: '1px solid #CDD8DE' }}
                  >
                    <h5 
                      style={{ 
                        color: '#0A0A0A',
                        fontSize: 'var(--font-size-sm)',
                        fontWeight: 'var(--font-weight-semibold)',
                        fontFamily: 'var(--font-body)'
                      }}
                    >
                      Características principales
                    </h5>
                    <div className="space-y-2.5">
                      {selectedParcela.caracteristicas.slice(0, 4).map((caracteristica, idx) => (
                        <div key={idx} className="flex items-center gap-2.5">
                          <div 
                            className="[&_svg]:stroke-[#124854] [&_path]:fill-none [&_path]:stroke-[#124854] flex-shrink-0"
                            style={{ color: '#124854' }}
                          >
                            {caracteristica.icon}
                          </div>
                          <span 
                            style={{ 
                              fontSize: 'var(--font-size-sm)',
                              fontFamily: 'var(--font-body)',
                              color: '#0A0A0A',
                              fontWeight: 'var(--font-weight-regular)',
                              lineHeight: 'var(--line-height-body)'
                            }}
                          >
                            {caracteristica.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Precio y CTA */}
                <div 
                  className="pt-4 space-y-4"
                  style={{ borderTop: '1px solid #CDD8DE' }}
                >
                  <div>
                    <div 
                      className="text-xs mb-1.5" 
                      style={{ 
                        color: '#462611', 
                        textTransform: 'uppercase', 
                        letterSpacing: '0.05em',
                        fontFamily: 'var(--font-body)',
                        fontWeight: 'var(--font-weight-medium)'
                      }}
                    >
                      Desde
                    </div>
                    <PrecioDisplay 
                      precioCLP={selectedParcela.precio}
                      precioSize="lg"
                    />
                  </div>
                  
                  <button
                    onClick={() => onParcelaClick(selectedParcela.id)}
                    className="w-full h-11 px-6 text-base leading-[1.5] font-medium rounded-[200px] transition-all shadow-sm"
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      backgroundColor: '#124854',
                      color: '#FFFFFF'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#647E3F';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(18, 72, 84, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#124854';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '';
                    }}
                  >
                    Ver detalle completo
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Panel - Bottom Sheet */}
          <div 
            className="lg:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl overflow-hidden shadow-2xl z-[200] max-h-[70vh]"
            style={{
              border: '1px solid #CDD8DE',
              animation: 'slideInUp 0.3s ease-out'
            }}
          >
            {/* Handle para arrastrar */}
            <div className="flex justify-center pt-2 pb-1">
              <div 
                className="w-12 h-1 rounded-full"
                style={{ backgroundColor: '#CDD8DE' }}
              />
            </div>

            {/* Header del Panel */}
            <div 
              className="flex items-center justify-between px-4 py-3"
              style={{ 
                borderBottom: '1px solid #CDD8DE',
                background: '#F5F3F0'
              }}
            >
              <h3 
                style={{ 
                  color: '#0A0A0A',
                  fontSize: 'var(--font-size-body)',
                  fontWeight: 'var(--font-weight-semibold)',
                  fontFamily: 'var(--font-body)'
                }}
              >
                Detalle de la parcela
              </h3>
              <button
                onClick={() => onParcelaSelect(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/80 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" style={{ color: '#0A0A0A' }} />
              </button>
            </div>

            {/* Contenido del Panel - Scrollable */}
            <div 
              className="overflow-y-auto"
              style={{ maxHeight: 'calc(70vh - 120px)' }}
            >
              {/* Imagen de la Parcela */}
              {selectedParcela.imagenes?.[0] && (
                <div 
                  className="w-full h-48 bg-gray-100 overflow-hidden cursor-pointer"
                  onClick={() => onParcelaClick(selectedParcela.id)}
                >
                  <img
                    src={selectedParcela.imagenes[0]}
                    alt={selectedParcela.nombre}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Información de la Parcela */}
              <div className="p-4 space-y-4">
                {/* Título y Ubicación */}
                <div className="space-y-1">
                  <h4 
                    style={{ 
                      color: '#0A0A0A', 
                      fontSize: 'var(--font-size-h4)', 
                      fontWeight: 'var(--font-weight-semibold)',
                      lineHeight: 'var(--line-height-heading)',
                      fontFamily: 'var(--font-heading)'
                    }}
                  >
                    {selectedParcela.nombre}
                  </h4>
                  <div className="flex items-start gap-2">
                    <MapPin 
                      className="w-4 h-4 mt-0.5 flex-shrink-0" 
                      style={{ color: '#124854' }} 
                    />
                    <p 
                      style={{ 
                        fontSize: 'var(--font-size-sm)', 
                        lineHeight: 'var(--line-height-body)',
                        color: '#737373',
                        fontFamily: 'var(--font-body)'
                      }}
                    >
                      {selectedParcela.ubicacion}
                    </p>
                  </div>
                </div>

                {/* Características */}
                {selectedParcela.caracteristicas && selectedParcela.caracteristicas.length > 0 && (
                  <div 
                    className="pt-3 space-y-2"
                    style={{ borderTop: '1px solid #CDD8DE' }}
                  >
                    <h5 
                      style={{ 
                        color: '#0A0A0A',
                        fontSize: 'var(--font-size-sm)',
                        fontWeight: 'var(--font-weight-semibold)',
                        fontFamily: 'var(--font-body)'
                      }}
                    >
                      Características principales
                    </h5>
                    <div className="space-y-2">
                      {selectedParcela.caracteristicas.slice(0, 4).map((caracteristica, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div 
                            className="[&_svg]:stroke-[#124854] [&_path]:fill-none [&_path]:stroke-[#124854] flex-shrink-0"
                            style={{ color: '#124854' }}
                          >
                            {caracteristica.icon}
                          </div>
                          <span 
                            style={{ 
                              fontSize: 'var(--font-size-sm)',
                              fontFamily: 'var(--font-body)',
                              color: '#0A0A0A',
                              fontWeight: 'var(--font-weight-regular)'
                            }}
                          >
                            {caracteristica.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Precio y CTA */}
                <div 
                  className="pt-3 space-y-3 pb-4"
                  style={{ borderTop: '1px solid #CDD8DE' }}
                >
                  <div>
                    <div 
                      className="text-xs mb-1" 
                      style={{ 
                        color: '#462611', 
                        textTransform: 'uppercase', 
                        letterSpacing: '0.05em',
                        fontFamily: 'var(--font-body)'
                      }}
                    >
                      Desde
                    </div>
                    <PrecioDisplay 
                      precioCLP={selectedParcela.precio}
                      precioSize="lg"
                    />
                  </div>
                  
                  <button
                    onClick={() => onParcelaClick(selectedParcela.id)}
                    className="w-full h-11 px-6 text-base leading-[1.5] font-medium rounded-[200px] transition-colors shadow-sm"
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      backgroundColor: '#124854',
                      color: '#FFFFFF'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#647E3F'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#124854'}
                  >
                    Ver detalle completo
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Overlay para mobile cuando panel está abierto */}
          <div 
            className="lg:hidden fixed inset-0 bg-black/40 z-[190]"
            onClick={() => onParcelaSelect(null)}
            style={{ animation: 'fadeIn 0.3s ease-out' }}
          />
        </>
      )}

      {/* Estilos de animación inline */}
      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}