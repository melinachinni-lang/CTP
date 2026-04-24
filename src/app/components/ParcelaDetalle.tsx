import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, FileCheck, Download, MapPin, Phone, Mail, ExternalLink, Zap, Droplet, FileText, TreePine, School, ShoppingBag, Navigation, TrendingUp, Users, Home, Compass, Mountain, CheckCircle, Fence, DoorClosed, ChevronDown, ChevronUp, Map, Maximize2, FileImage, DollarSign, MessageSquare, Package, X, ShoppingCart, Sparkles, ThumbsUp, AlertCircle, Clock, Activity, FileBadge, Settings, MapPinOff, Image as ImageIcon } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { PublicadoPor } from '@/app/components/PublicadoPor';
import { ContactModal } from '@/app/components/ContactModal';
import { ReservaVisitaModal } from '@/app/components/ReservaVisitaModal';
import { ConsultaOnlineModal } from '@/app/components/ConsultaOnlineModal';
import { ComprarParcelaModal } from '@/app/components/ComprarParcelaModal';
import { FlujoCompraModal } from '@/app/components/FlujoCompraModal';
import { ConsultarModal } from '@/app/components/ConsultarModal';
import { PrecioDisplay } from '@/app/components/PrecioDisplay';
import { VambeChat } from '@/app/components/VambeChat';
import { getParcelaById, getSimilarParcelas } from '@/app/data/parcelasData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import logo from 'figma:asset/a4719ce43ce52ee49df30a2a5c090c8a8b743667.png';

// Datos de ejemplo de parcelas para el masterplan interactivo
// Cada parcela tiene puntos que definen su forma irregular (terreno rural)
// y una posición central (centroid) para el marcador
const parcelasGeoData = [
  { id: 1, numero: 1, points: [[10, 8], [28, 6], [30, 20], [12, 22]], centroid: [20, 14], estado: 'disponible', area: '5,000 m²' },
  { id: 2, numero: 2, points: [[32, 6], [50, 5], [52, 19], [34, 21]], centroid: [42, 13], estado: 'disponible', area: '5,200 m²' },
  { id: 3, numero: 3, points: [[54, 5], [72, 7], [74, 21], [56, 19]], centroid: [64, 13], estado: 'reservado', area: '5,100 m²' },
  { id: 4, numero: 4, points: [[76, 8], [92, 10], [94, 24], [78, 22]], centroid: [85, 16], estado: 'vendido', area: '4,800 m²' },
  
  { id: 5, numero: 5, points: [[8, 26], [26, 24], [28, 40], [10, 42]], centroid: [18, 33], estado: 'disponible', area: '5,300 m²' },
  { id: 6, numero: 6, points: [[30, 24], [48, 22], [50, 38], [32, 41]], centroid: [40, 31], estado: 'vendido', area: '5,000 m²' },
  { id: 7, numero: 7, points: [[52, 22], [70, 24], [72, 40], [54, 39]], centroid: [62, 31], estado: 'disponible', area: '5,100 m²' },
  { id: 8, numero: 8, points: [[74, 25], [90, 27], [92, 43], [76, 41]], centroid: [83, 34], estado: 'reservado', area: '4,900 m²' },
  
  { id: 9, numero: 9, points: [[10, 46], [28, 44], [30, 62], [12, 64]], centroid: [20, 54], estado: 'disponible', area: '5,200 m²' },
  { id: 10, numero: 10, points: [[32, 44], [50, 42], [52, 60], [34, 63]], centroid: [42, 52], estado: 'vendido', area: '5,100 m²' },
  { id: 11, numero: 11, points: [[54, 42], [72, 44], [74, 62], [56, 61]], centroid: [64, 52], estado: 'disponible', area: '5,300 m²' },
  { id: 12, numero: 12, points: [[76, 45], [92, 47], [94, 65], [78, 63]], centroid: [85, 55], estado: 'reservado', area: '4,800 m²' },
  
  { id: 13, numero: 13, points: [[8, 68], [26, 66], [28, 86], [10, 88]], centroid: [18, 77], estado: 'disponible', area: '5,000 m²' },
  { id: 14, numero: 14, points: [[30, 66], [48, 64], [50, 84], [32, 87]], centroid: [40, 75], estado: 'reservado', area: '5,200 m²' },
  { id: 15, numero: 15, points: [[52, 64], [70, 66], [72, 86], [54, 85]], centroid: [62, 75], estado: 'vendido', area: '5,100 m²' },
  { id: 16, numero: 16, points: [[74, 67], [90, 69], [92, 89], [76, 87]], centroid: [83, 78], estado: 'disponible', area: '4,900 m²' },
];

// Componente de mapa de geolocalización
interface GeolocalizacionMapProps {
  parcelaActualId: number;
  hoveredParcela: number | null;
  setHoveredParcela: (id: number | null) => void;
  mapZoom: number;
  setMapZoom: (zoom: number) => void;
  onNavigate: (screen: string, id?: number) => void;
}

function GeolocalizacionMap({ 
  parcelaActualId, 
  hoveredParcela, 
  setHoveredParcela,
  mapZoom,
  setMapZoom,
  onNavigate
}: GeolocalizacionMapProps) {
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [clickedParcela, setClickedParcela] = useState<number | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'disponible': return '#10B981'; // Verde
      case 'reservado': return '#3B82F6'; // Azul
      case 'vendido': return '#EF4444'; // Rojo
      default: return '#9CA3AF';
    }
  };

  const getEstadoBackgroundColor = (estado: string) => {
    switch (estado) {
      case 'disponible': return '#FFFFFF'; // Blanco
      case 'reservado': return '#3B82F6'; // Azul
      case 'vendido': return '#EF4444'; // Rojo
      default: return '#E5E5E5';
    }
  };

  const getEstadoLabel = (estado: string) => {
    switch (estado) {
      case 'disponible': return 'Disponible';
      case 'reservado': return 'Reservado';
      case 'vendido': return 'Vendido';
      default: return '';
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    setClickedParcela(null); // Cerrar popover al hacer drag
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleContainerClick = () => {
    if (!isDragging) {
      setClickedParcela(null);
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    // Zoom más progresivo y natural
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = Math.min(Math.max(mapZoom + delta, 0.5), 3);
    setMapZoom(newZoom);
  };

  return (
    <div className="w-full h-full relative">
      {/* Visor de masterplan */}
      <div 
        ref={containerRef}
        className="w-full h-full relative overflow-hidden"
        style={{
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onWheel={handleWheel}
        onClick={handleContainerClick}
      >
        {/* Contenedor transformable con zoom y pan */}
        <div
          className="absolute inset-0"
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${mapZoom})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            width: '100%',
            height: '100%',
            willChange: 'transform'
          }}
        >
          {/* Imagen base: terreno rural desde vista aérea (dron) */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1732543425672-cbb37a92250c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXJpYWwlMjBkcm9uZSUyMGdyZWVuJTIwZmllbGQlMjBydXJhbCUyMGxhbmR8ZW58MXx8fHwxNzcwMDcxMDIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              pointerEvents: 'none',
              // Efecto de profundidad: más brillante al acercar (zoom in), más oscuro al alejar (zoom out)
              filter: `brightness(${0.95 + (mapZoom - 1) * 0.08}) contrast(${0.95 + (mapZoom - 1) * 0.05}) saturate(${1 + (mapZoom - 1) * 0.1})`,
              transition: isDragging ? 'none' : 'filter 0.3s ease'
            }}
          />

          {/* Overlay suave para mejor contraste */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,${0.05 - (mapZoom - 1) * 0.02}) 100%),
                linear-gradient(180deg, rgba(0,0,0,${0.01 - (mapZoom - 1) * 0.005}) 0%, rgba(0,0,0,${0.06 - (mapZoom - 1) * 0.015}) 100%)
              `,
              transition: isDragging ? 'none' : 'background 0.3s ease'
            }}
          ></div>

          {/* SVG Layer: Delimitación de parcelas con líneas punteadas */}
          <svg 
            className="absolute inset-0 w-full h-full" 
            style={{ pointerEvents: 'none' }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Pattern para líneas punteadas suaves */}
              <pattern id="dottedPattern" x="0" y="0" width="2" height="2" patternUnits="userSpaceOnUse">
                <circle cx="0.5" cy="0.5" r="0.3" fill="rgba(255, 255, 255, 0.7)" />
              </pattern>
            </defs>
            
            {parcelasGeoData.map((parcela) => {
              const isHovered = hoveredParcela === parcela.numero;
              const isActual = parcelaActualId === parcela.id;
              const borderColor = getEstadoColor(parcela.estado);
              
              // Convertir points array a string de polígono
              const pointsString = parcela.points.map(p => `${p[0]},${p[1]}`).join(' ');
              
              return (
                <g key={`polygon-${parcela.id}`}>
                  {/* Polígono de relleno sutil (solo visible en hover o actual) */}
                  {(isHovered || isActual) && (
                    <polygon
                      points={pointsString}
                      fill={borderColor}
                      opacity="0.08"
                      style={{ 
                        pointerEvents: 'none',
                        transition: 'opacity 0.3s ease'
                      }}
                    />
                  )}
                  
                  {/* Borde con líneas punteadas suaves */}
                  <polygon
                    points={pointsString}
                    fill="none"
                    stroke={isHovered || isActual ? borderColor : 'rgba(255, 255, 255, 0.6)'}
                    strokeWidth={isActual ? "0.35" : isHovered ? "0.3" : "0.2"}
                    strokeDasharray={isHovered || isActual ? "1,0.8" : "0.8,1.2"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={isHovered || isActual ? "0.95" : "0.7"}
                    style={{ 
                      pointerEvents: 'auto',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      filter: isActual ? 'drop-shadow(0 0 1px rgba(255,255,255,0.5))' : 'none'
                    }}
                    onMouseEnter={() => setHoveredParcela(parcela.numero)}
                    onMouseLeave={() => setHoveredParcela(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setClickedParcela(parcela.numero);
                    }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Marcadores circulares numerados */}
          <div className="absolute inset-0">
            {parcelasGeoData.map((parcela) => {
              const isHovered = hoveredParcela === parcela.numero;
              const isActual = parcelaActualId === parcela.id;
              const bgColor = getEstadoBackgroundColor(parcela.estado);
              const borderColor = getEstadoColor(parcela.estado);
              const textColor = parcela.estado === 'disponible' ? '#0A0A0A' : '#FFFFFF';
              
              return (
                <div
                  key={`marker-${parcela.id}`}
                  className="absolute"
                  style={{
                    left: `${parcela.centroid[0]}%`,
                    top: `${parcela.centroid[1]}%`,
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'auto',
                    zIndex: isHovered || isActual ? 20 : 10
                  }}
                  onMouseEnter={() => setHoveredParcela(parcela.numero)}
                  onMouseLeave={() => setHoveredParcela(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setClickedParcela(parcela.numero);
                  }}
                >
                  {/* Marcador circular */}
                  <div
                    className="flex items-center justify-center cursor-pointer transition-all select-none"
                    style={{
                      width: isHovered || isActual ? '46px' : '38px',
                      height: isHovered || isActual ? '46px' : '38px',
                      borderRadius: '50%',
                      backgroundColor: bgColor,
                      border: `${isActual ? '3px' : isHovered ? '2.5px' : '2px'} solid ${borderColor}`,
                      boxShadow: isHovered || isActual 
                        ? `0 4px 16px ${borderColor}40, 0 0 0 4px ${borderColor}15` 
                        : `0 2px 10px rgba(0, 0, 0, 0.2)`,
                      fontFamily: 'var(--font-body)',
                      fontSize: isHovered || isActual ? 'var(--font-size-body)' : 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: textColor,
                      transform: `scale(${1 / mapZoom})`,
                      transformOrigin: 'center'
                    }}
                  >
                    {parcela.numero}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tooltips para parcelas */}
          {hoveredParcela && !isDragging && !clickedParcela && (
            <div 
              className="absolute pointer-events-none z-50"
              style={{
                left: `${parcelasGeoData.find(p => p.numero === hoveredParcela)?.centroid[0]}%`,
                top: `${parcelasGeoData.find(p => p.numero === hoveredParcela)?.centroid[1]}%`,
                transform: `translate(-50%, calc(-100% - ${40 / mapZoom}px)) scale(${1 / mapZoom})`,
                transformOrigin: 'bottom center'
              }}
            >
              <div 
                className="px-3 py-2 rounded-lg shadow-lg"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E5E5',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-xs)',
                  whiteSpace: 'nowrap'
                }}
              >
                <span style={{ 
                  color: '#0A0A0A',
                  fontWeight: 'var(--font-weight-semibold)'
                }}>
                  Parcela {hoveredParcela}
                </span>
                <span style={{ color: '#737373' }}> — </span>
                <span style={{ 
                  color: getEstadoColor(parcelasGeoData.find(p => p.numero === hoveredParcela)?.estado || ''),
                  fontWeight: 'var(--font-weight-medium)'
                }}>
                  {getEstadoLabel(parcelasGeoData.find(p => p.numero === hoveredParcela)?.estado || '')}
                </span>
                {/* Flecha del tooltip */}
                <div 
                  className="absolute left-1/2 -translate-x-1/2 -bottom-1"
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: '6px solid transparent',
                    borderRight: '6px solid transparent',
                    borderTop: '6px solid #FFFFFF'
                  }}
                ></div>
              </div>
            </div>
          )}

          {/* Popover al hacer click en una parcela */}
          {clickedParcela && !isDragging && (
            <div 
              className="absolute pointer-events-none z-50"
              style={{
                left: `${parcelasGeoData.find(p => p.numero === clickedParcela)?.centroid[0]}%`,
                top: `${parcelasGeoData.find(p => p.numero === clickedParcela)?.centroid[1]}%`,
                transform: `translate(-50%, calc(-100% - ${40 / mapZoom}px)) scale(${1 / mapZoom})`,
                transformOrigin: 'bottom center'
              }}
            >
              <div 
                className="rounded-lg shadow-xl"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E5E5',
                  fontFamily: 'var(--font-body)',
                  width: '260px',
                  pointerEvents: 'auto'
                }}
              >
                <div className="p-4">
                  <div style={{ 
                    color: '#0A0A0A',
                    fontWeight: 'var(--font-weight-semibold)',
                    fontSize: 'var(--font-size-body-sm)',
                    marginBottom: '0.75rem'
                  }}>
                    Parcela {clickedParcela}
                  </div>
                  
                  <div style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ 
                      color: '#737373',
                      fontSize: 'var(--font-size-xs)',
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}>
                      <span>Superficie:</span>
                      <span style={{ 
                        color: '#0A0A0A',
                        fontWeight: 'var(--font-weight-medium)'
                      }}>
                        {parcelasGeoData.find(p => p.numero === clickedParcela)?.area}
                      </span>
                    </div>
                    <div style={{ 
                      color: '#737373',
                      fontSize: 'var(--font-size-xs)',
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}>
                      <span>Estado:</span>
                      <span style={{ 
                        color: getEstadoColor(parcelasGeoData.find(p => p.numero === clickedParcela)?.estado || ''),
                        fontWeight: 'var(--font-weight-medium)'
                      }}>
                        {getEstadoLabel(parcelasGeoData.find(p => p.numero === clickedParcela)?.estado || '')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const parcela = parcelasGeoData.find(p => p.numero === clickedParcela);
                        if (parcela) {
                          onNavigate('parcela-detalle', parcela.id);
                        }
                      }}
                      className="flex-1 px-3 py-2 rounded-lg transition-opacity hover:opacity-80"
                      style={{
                        backgroundColor: '#124854',
                        color: '#FFFFFF',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-xs)',
                        fontWeight: 'var(--font-weight-medium)',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      Ver ficha
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setClickedParcela(null);
                      }}
                      className="px-3 py-2 rounded-lg transition-opacity hover:opacity-80"
                      style={{
                        backgroundColor: '#F5F5F5',
                        color: '#0A0A0A',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-xs)',
                        fontWeight: 'var(--font-weight-medium)',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
                {/* Flecha del popover */}
                <div 
                  className="absolute left-1/2 -translate-x-1/2 -bottom-2"
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: '8px solid transparent',
                    borderRight: '8px solid transparent',
                    borderTop: '8px solid #FFFFFF'
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Indicador de interactividad (solo visible al inicio) */}
      {!isDragging && !clickedParcela && panOffset.x === 0 && panOffset.y === 0 && mapZoom === 1 && (
        <div 
          className="absolute top-4 right-4 pointer-events-none flex items-center gap-2 px-3 py-2 rounded-lg"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.96)',
            border: '1px solid #E5E5E5',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(4px)'
          }}
        >
          <div className="[&_svg]:stroke-[#525252] [&_path]:fill-none [&_path]:stroke-[#525252] [&_circle]:fill-none [&_circle]:stroke-[#525252] [&_rect]:fill-none [&_rect]:stroke-[#525252] [&_line]:stroke-[#525252] [&_polyline]:stroke-[#525252]">
            <Mountain className="w-4 h-4" style={{ color: '#525252' }} />
          </div>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-xs)',
            color: '#525252',
            fontWeight: 'var(--font-weight-medium)'
          }}>
            Explora el terreno interactivamente
          </span>
        </div>
      )}

      {/* Controles y leyenda */}
      <div className="absolute bottom-4 left-0 right-0 px-4 flex items-end justify-between pointer-events-none">
        {/* Controles de navegación */}
        <div className="flex flex-col gap-2 pointer-events-auto">
          {/* Zoom In */}
          <button
            onClick={() => setMapZoom(Math.min(mapZoom + 0.2, 3))}
            className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:opacity-80"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E5E5',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              cursor: mapZoom >= 3 ? 'not-allowed' : 'pointer',
              opacity: mapZoom >= 3 ? 0.5 : 1
            }}
            aria-label="Acercar"
            title="Acercar"
            disabled={mapZoom >= 3}
          >
            <span style={{ 
              fontFamily: 'var(--font-body)',
              fontSize: '20px',
              fontWeight: 'var(--font-weight-medium)',
              color: '#0A0A0A'
            }}>+</span>
          </button>
          
          {/* Zoom Out */}
          <button
            onClick={() => setMapZoom(Math.max(mapZoom - 0.2, 0.5))}
            className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:opacity-80"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E5E5',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              cursor: mapZoom <= 0.5 ? 'not-allowed' : 'pointer',
              opacity: mapZoom <= 0.5 ? 0.5 : 1
            }}
            aria-label="Alejar"
            title="Alejar"
            disabled={mapZoom <= 0.5}
          >
            <span style={{ 
              fontFamily: 'var(--font-body)',
              fontSize: '20px',
              fontWeight: 'var(--font-weight-medium)',
              color: '#0A0A0A'
            }}>−</span>
          </button>
          
          {/* Reset */}
          <button
            onClick={() => {
              setMapZoom(1);
              setPanOffset({ x: 0, y: 0 });
            }}
            className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:opacity-80"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E5E5',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              cursor: mapZoom === 1 && panOffset.x === 0 && panOffset.y === 0 ? 'not-allowed' : 'pointer',
              opacity: mapZoom === 1 && panOffset.x === 0 && panOffset.y === 0 ? 0.5 : 1
            }}
            aria-label="Restablecer vista"
            title="Restablecer vista"
            disabled={mapZoom === 1 && panOffset.x === 0 && panOffset.y === 0}
          >
            <div className="[&_svg]:stroke-[#0A0A0A] [&_path]:fill-none [&_path]:stroke-[#0A0A0A] [&_circle]:fill-none [&_circle]:stroke-[#0A0A0A] [&_rect]:fill-none [&_rect]:stroke-[#0A0A0A] [&_line]:stroke-[#0A0A0A] [&_polyline]:stroke-[#0A0A0A]">
              <Compass className="w-5 h-5" style={{ color: '#0A0A0A' }} />
            </div>
          </button>
          
          {/* Indicador de nivel de zoom */}
          {mapZoom !== 1 && (
            <div 
              className="px-3 py-2 rounded-lg flex items-center justify-center"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E5E5',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-xs)',
                color: '#525252',
                fontWeight: 'var(--font-weight-medium)',
                minWidth: '56px'
              }}
            >
              {Math.round(mapZoom * 100)}%
            </div>
          )}
        </div>

        {/* Leyenda */}
        <div 
          className="flex gap-4 px-4 py-3 rounded-lg pointer-events-auto"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid #E5E5E5',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            backdropFilter: 'blur(8px)'
          }}
        >
          <div className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded-full flex items-center justify-center" 
              style={{ 
                backgroundColor: '#FFFFFF',
                border: '2px solid #10B981'
              }}
            ></div>
            <span style={{ 
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-xs)',
              color: '#0A0A0A',
              fontWeight: 'var(--font-weight-medium)'
            }}>Disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: '#3B82F6' }}
            ></div>
            <span style={{ 
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-xs)',
              color: '#0A0A0A',
              fontWeight: 'var(--font-weight-medium)'
            }}>Reservado</span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: '#EF4444' }}
            ></div>
            <span style={{ 
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-xs)',
              color: '#0A0A0A',
              fontWeight: 'var(--font-weight-medium)'
            }}>Vendido</span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ParcelaDetalleProps {
  onNavigate: (screen: string, id?: number, data?: string) => void;
  parcelaId?: number | null;
}

export function ParcelaDetalle({ onNavigate, parcelaId }: ParcelaDetalleProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isDocumentosOpen, setIsDocumentosOpen] = useState(false);
  const [isDocTecnicaOpen, setIsDocTecnicaOpen] = useState(false);
  const [isStockOpen, setIsStockOpen] = useState(false);
  const [isDescripcionExpanded, setIsDescripcionExpanded] = useState(false);
  const [ubicacionTab, setUbicacionTab] = useState<'360' | 'plano' | 'mapa'>('mapa');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isReservaVisitaOpen, setIsReservaVisitaOpen] = useState(false);
  const [isConsultaOnlineOpen, setIsConsultaOnlineOpen] = useState(false);
  const [isComprarParcelaOpen, setIsComprarParcelaOpen] = useState(false);
  const [isFlujoCompraOpen, setIsFlujoCompraOpen] = useState(false);
  const [tipoCompra, setTipoCompra] = useState<'comprar' | 'reservar'>('comprar');
  const [isConsultarOpen, setIsConsultarOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [isPublicadoPorExpanded, setIsPublicadoPorExpanded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  // Ref para que el useEffect acceda a las imágenes sin depender de `parcela`
  const imagenesRef = useRef<string[]>([]);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const lightboxPrev = useCallback(() =>
    setLightboxIndex(i => (i === 0 ? imagenesRef.current.length - 1 : i - 1)), []);

  const lightboxNext = useCallback(() =>
    setLightboxIndex(i => (i === imagenesRef.current.length - 1 ? 0 : i + 1)), []);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lightboxPrev();
      if (e.key === 'ArrowRight') lightboxNext();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, closeLightbox, lightboxPrev, lightboxNext]);
  const [hoveredParcela, setHoveredParcela] = useState<number | null>(null);
  const [mapZoom, setMapZoom] = useState(1);
  const [parcelaSeleccionadaStock, setParcelaSeleccionadaStock] = useState<string>('');
  const [isStockComprarModalOpen, setIsStockComprarModalOpen] = useState(false);
  const [isConfirmCompraModalOpen, setIsConfirmCompraModalOpen] = useState(false);
  const [hoveredCompraButton, setHoveredCompraButton] = useState<string | null>(null);
  const [isAnalisisDrawerOpen, setIsAnalisisDrawerOpen] = useState(false);
  const [hoveredAnalisisButton, setHoveredAnalisisButton] = useState(false);
  const publicadoPorRef = React.useRef<HTMLDivElement>(null);

  // Obtener datos dinámicos de la parcela
  // Si parcelaId es null o undefined, usar 1 por defecto
  const idToUse = parcelaId ?? 1;
  const parcelaData = getParcelaById(idToUse);
  
  // Si no se encuentra la parcela, usar la primera por defecto
  const parcela = parcelaData || getParcelaById(1)!;

  // Actualizar ref de imágenes para el lightbox (se lee dentro del useEffect)
  imagenesRef.current = parcela?.imagenes ?? [];

  // Obtener parcelas similares
  const parcelasSimilares = getSimilarParcelas(idToUse).map(p => ({
    id: p.id,
    nombre: p.nombre,
    ubicacion: p.ubicacion,
    superficie: p.superficie,
    precio: p.precio,
    imagen: p.imagenes[0]
  }));

  // Función para manejar el toggle con scroll suave
  const handleTogglePublicadoPor = () => {
    const newState = !isPublicadoPorExpanded;
    setIsPublicadoPorExpanded(newState);
    
    // Si se está expandiendo, hacer scroll después de un pequeño delay
    if (newState) {
      setTimeout(() => {
        if (publicadoPorRef.current) {
          const elementTop = publicadoPorRef.current.getBoundingClientRect().top;
          const offsetPosition = elementTop + window.scrollY - 100; // Offset ajustado para sticky top-20 (80px) + margen
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 50);
    }
  };

  // Funciones para manejar la compra desde stock
  const handleStockComprarClick = (parcelaCodigo: string) => {
    setParcelaSeleccionadaStock(parcelaCodigo);
    setIsConfirmCompraModalOpen(true);
  };

  const handleConfirmCompra = () => {
    setIsConfirmCompraModalOpen(false);
    setIsStockComprarModalOpen(true);
  };

  const handleStockComprarAhora = () => {
    setIsStockComprarModalOpen(false);
    setTipoCompra('comprar');
    setIsFlujoCompraOpen(true);
  };

  const handleStockReservar = () => {
    setIsStockComprarModalOpen(false);
    setTipoCompra('reservar');
    setIsFlujoCompraOpen(true);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAFA' }}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50" style={{ borderBottom: '1px solid #E5E5E5' }}>
        <div className="max-w-[1400px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo y Navegación */}
            <div className="flex items-center gap-8">
              <img 
                src={logo} 
                alt="CompraTuParcela" 
                className="h-14 cursor-pointer" 
                onClick={() => onNavigate('home')}
              />
              
              <nav className="flex items-center gap-1">
                <button 
                  onClick={() => onNavigate('parcelas')}
                  className="px-4 py-2 text-sm rounded-full"
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    color: '#0A0A0A',
                    backgroundColor: '#F5F5F5',
                    fontWeight: 'var(--font-weight-medium)'
                  }}
                >
                  Parcelas
                </button>
                <button 
                  onClick={() => onNavigate('inmobiliarias')}
                  className="px-4 py-2 text-sm rounded-full hover:bg-gray-50 transition-colors"
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    color: '#737373'
                  }}
                >
                  Inmobiliarias
                </button>
                <button 
                  onClick={() => onNavigate('como-funciona')}
                  className="px-4 py-2 text-sm rounded-full hover:bg-gray-50 transition-colors"
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    color: '#737373'
                  }}
                >
                  Cómo funciona
                </button>
                <button 
                  onClick={() => onNavigate('recursos')}
                  className="px-4 py-2 text-sm rounded-full hover:bg-gray-50 transition-colors"
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    color: '#737373'
                  }}
                >
                  Recursos
                </button>
              </nav>
            </div>

            {/* Botones de acción */}
            <div className="flex items-center gap-3">
              <button 
                className="px-5 py-2 text-sm rounded-full transition-colors"
                style={{ 
                  fontFamily: 'var(--font-body)',
                  backgroundColor: '#0A0A0A',
                  color: '#FFFFFF',
                  fontWeight: 'var(--font-weight-medium)'
                }}
              >
                Publicar propiedad
              </button>
              <button 
                onClick={() => onNavigate('entry')}
                className="px-5 py-2 text-sm rounded-full transition-colors"
                style={{ 
                  fontFamily: 'var(--font-body)',
                  backgroundColor: '#F5F5F5',
                  color: '#0A0A0A',
                  fontWeight: 'var(--font-weight-medium)'
                }}
              >
                Ingresar
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24">
        <div className="max-w-[1400px] mx-auto px-8 py-8">
          {/* Breadcrumb */}
          <button 
            onClick={() => onNavigate('parcelas')}
            className="flex items-center gap-2 mb-8 transition-colors hover:text-gray-900"
            style={{ 
              fontFamily: 'var(--font-body)',
              color: '#737373',
              fontSize: 'var(--font-size-body-sm)'
            }}
          >
            <div className="[&_svg]:stroke-[#737373] [&_path]:fill-none [&_path]:stroke-[#737373] [&_circle]:fill-none [&_circle]:stroke-[#737373] [&_rect]:fill-none [&_rect]:stroke-[#737373] [&_line]:stroke-[#737373] [&_polyline]:stroke-[#737373]">
              <ChevronLeft className="w-4 h-4" />
            </div>
            <span>Volver a resultados</span>
          </button>

          {/* Layout: 2 columnas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Columna izquierda - Contenido principal */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Título principal y metadatos */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <h1 className="flex-1" style={{ 
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 'var(--font-weight-light)',
                    fontSize: 'var(--font-size-h1)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-heading)',
                    letterSpacing: 'var(--letter-spacing-tight)'
                  }}>
                    {parcela.nombre}
                  </h1>
                  
                  {/* Botón de análisis con IA */}
                  <div className="relative">
                    <button
                      onClick={() => setIsAnalisisDrawerOpen(true)}
                      onMouseEnter={() => setHoveredAnalisisButton(true)}
                      onMouseLeave={() => setHoveredAnalisisButton(false)}
                      className="w-10 h-10 rounded-full flex items-center justify-center border transition-all flex-shrink-0"
                      style={{ 
                        background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 50%, #E5E5E5 100%)',
                        borderColor: '#D4D4D4',
                        boxShadow: hoveredAnalisisButton 
                          ? '0 8px 16px -4px rgba(0, 0, 0, 0.12), 0 4px 8px -2px rgba(0, 0, 0, 0.08)' 
                          : '0 4px 8px -2px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                        transform: hoveredAnalisisButton ? 'translateY(-2px) scale(1.05)' : 'translateY(0) scale(1)',
                        animation: 'vambeAttention 3s ease-in-out infinite'
                      }}
                      aria-label="Ver análisis de mercado con IA"
                    >
                      <div className="[&_svg]:stroke-[#525252] [&_path]:fill-none [&_path]:stroke-[#525252] [&_circle]:fill-none [&_circle]:stroke-[#525252] [&_rect]:fill-none [&_rect]:stroke-[#525252] [&_line]:stroke-[#525252] [&_polyline]:stroke-[#525252]">
                        <Sparkles 
                          className="w-5 h-5" 
                          style={{ color: '#525252' }}
                        />
                      </div>
                    </button>
                    {hoveredAnalisisButton && (
                      <div 
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none z-10"
                        style={{
                          backgroundColor: '#0A0A0A',
                          color: '#FFFFFF',
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-medium)'
                        }}
                      >
                        Ver análisis de mercado con IA
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Subtítulo - Ubicación */}
                <p className="flex items-center gap-2" style={{ 
                  fontFamily: 'var(--font-body)',
                  color: '#737373',
                  fontSize: 'var(--font-size-body-lg)',
                  fontWeight: 'var(--font-weight-regular)',
                  lineHeight: 'var(--line-height-body)'
                }}>
                  <div className="[&_svg]:stroke-[#124854] [&_path]:fill-none [&_path]:stroke-[#124854] [&_circle]:fill-none [&_circle]:stroke-[#124854] [&_rect]:fill-none [&_rect]:stroke-[#124854] [&_line]:stroke-[#124854] [&_polyline]:stroke-[#124854]">
                    <MapPin className="w-5 h-5" style={{ color: '#124854' }} />
                  </div>
                  {parcela.ubicacion}
                </p>
              </div>
              
              {/* Galería de imágenes - NUEVA ESTRUCTURA */}
              <div className="space-y-4">
                {parcela.imagenes && parcela.imagenes.length > 0 ? (
                  <>
                    {/* Imagen principal */}
                    <div className="w-full aspect-[16/9] bg-white overflow-hidden rounded-xl border border-gray-200 shadow-sm relative group">
                      <ImageWithFallback
                        src={parcela.imagenes[selectedImage]}
                        alt={parcela.nombre}
                        className="w-full h-full object-cover cursor-zoom-in"
                        onClick={() => openLightbox(selectedImage)}
                      />

                      {/* Botón expandir - siempre visible en hover */}
                      <button
                        onClick={() => openLightbox(selectedImage)}
                        aria-label="Ver en pantalla completa"
                        className="absolute top-3 right-3 w-9 h-9 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
                      >
                        <Maximize2 className="w-4 h-4" style={{ color: '#fff' }} />
                      </button>

                      {/* Contador de imagen */}
                      {parcela.imagenes.length > 1 && (
                        <div
                          className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                          style={{ backgroundColor: 'rgba(0,0,0,0.55)', color: '#fff', fontFamily: 'var(--font-body)', backdropFilter: 'blur(4px)' }}
                        >
                          {selectedImage + 1} / {parcela.imagenes.length}
                        </div>
                      )}

                      {/* Navegación de imágenes - visible en hover */}
                      {parcela.imagenes.length > 1 && (
                        <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedImage((prev) => (prev === 0 ? parcela.imagenes.length - 1 : prev - 1));
                            }}
                            className="pointer-events-auto w-10 h-10 rounded-full flex items-center justify-center transition-all hover:opacity-90"
                            style={{ 
                              backgroundColor: '#FFFFFF',
                              border: '1px solid #E5E5E5',
                              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                            }}
                            aria-label="Imagen anterior"
                          >
                            <div className="[&_svg]:stroke-[#0A0A0A] [&_path]:fill-none [&_path]:stroke-[#0A0A0A] [&_circle]:fill-none [&_circle]:stroke-[#0A0A0A] [&_rect]:fill-none [&_rect]:stroke-[#0A0A0A] [&_line]:stroke-[#0A0A0A] [&_polyline]:stroke-[#0A0A0A]">
                              <ChevronLeft className="w-5 h-5" style={{ color: '#0A0A0A' }} />
                            </div>
                          </button>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedImage((prev) => (prev === parcela.imagenes.length - 1 ? 0 : prev + 1));
                            }}
                            className="pointer-events-auto w-10 h-10 rounded-full flex items-center justify-center transition-all hover:opacity-90"
                            style={{ 
                              backgroundColor: '#FFFFFF',
                              border: '1px solid #E5E5E5',
                              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                            }}
                            aria-label="Imagen siguiente"
                          >
                            <div className="[&_svg]:stroke-[#0A0A0A] [&_path]:fill-none [&_path]:stroke-[#0A0A0A] [&_circle]:fill-none [&_circle]:stroke-[#0A0A0A] [&_rect]:fill-none [&_rect]:stroke-[#0A0A0A] [&_line]:stroke-[#0A0A0A] [&_polyline]:stroke-[#0A0A0A]">
                              <ChevronRight className="w-5 h-5" style={{ color: '#0A0A0A' }} />
                            </div>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Thumbnails */}
                    {parcela.imagenes.length > 1 && (
                      <div className="grid grid-cols-4 gap-3">
                        {parcela.imagenes.map((imagen, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`aspect-[4/3] bg-white overflow-hidden rounded-lg transition-all border-2 ${
                              selectedImage === index 
                                ? 'border-gray-900 shadow-md' 
                                : 'border-gray-200 hover:border-gray-400'
                            }`}
                          >
                            <ImageWithFallback 
                              src={imagen} 
                              alt={`Vista ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full aspect-[16/9] overflow-hidden rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center" style={{ backgroundColor: '#F5F5F5' }}>
                    <ImageIcon 
                      className="w-16 h-16 mb-4" 
                      style={{ color: '#CDD8DE', strokeWidth: 1.5 }} 
                    />
                    <p 
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body)', 
                        color: '#9CA3AF',
                        fontWeight: 'var(--font-weight-medium)',
                        marginBottom: '0.5rem'
                      }}
                    >
                      Sin imágenes disponibles
                    </p>
                    <p 
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-xs)', 
                        color: '#D1D5DB',
                        fontWeight: 'var(--font-weight-regular)'
                      }}
                    >
                      Esta publicación no cuenta con fotografías en este momento
                    </p>
                  </div>
                )}
              </div>

              {/* Descripción */}
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <h2 style={{ 
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 'var(--font-weight-regular)',
                  fontSize: 'var(--font-size-h2)',
                  color: '#0A0A0A',
                  marginBottom: '1rem'
                }}>
                  Descripción
                </h2>
                <div style={{ 
                  fontFamily: 'var(--font-body)',
                  color: '#525252',
                  lineHeight: 'var(--line-height-body)',
                  fontSize: 'var(--font-size-body-base)'
                }}>
                  {parcela.descripcion.split('\n\n').map((parrafo, index) => {
                    const totalParrafos = parcela.descripcion.split('\n\n').length;
                    const shouldShow = isDescripcionExpanded || index < 1;
                    
                    if (!shouldShow) return null;
                    
                    return (
                      <p key={index} style={{ 
                        marginBottom: index < totalParrafos - 1 ? '1.25rem' : '0'
                      }}>
                        {parrafo}
                      </p>
                    );
                  })}
                </div>
                {parcela.descripcion.split('\n\n').length > 1 && (
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={() => setIsDescripcionExpanded(!isDescripcionExpanded)}
                      className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        color: 'var(--foreground)',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-medium)'
                      }}
                    >
                      <span>{isDescripcionExpanded ? 'Ver menos' : 'Ver más'}</span>
                      <div className="[&_svg]:stroke-currentColor [&_path]:fill-none [&_path]:stroke-currentColor [&_circle]:fill-none [&_circle]:stroke-currentColor [&_rect]:fill-none [&_rect]:stroke-currentColor [&_line]:stroke-currentColor [&_polyline]:stroke-currentColor]">
                        {isDescripcionExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* Ubicación - MEJORADO */}
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <h2 style={{ 
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 'var(--font-weight-regular)',
                  fontSize: 'var(--font-size-h2)',
                  color: '#0A0A0A',
                  marginBottom: '1.5rem'
                }}>
                  Ubicación
                </h2>
                
                <div className="space-y-6">
                  {/* Dirección */}
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50">
                    <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#124854' }} />
                    <div>
                      <p style={{ 
                        fontFamily: 'var(--font-body)',
                        color: '#0A0A0A',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-medium)',
                        marginBottom: '0.25rem'
                      }}>
                        {parcela.ubicacion}
                      </p>
                      <p style={{ 
                        fontFamily: 'var(--font-body)',
                        color: '#737373',
                        fontSize: 'var(--font-size-xs)'
                      }}>
                        {parcela.ubicacionCompleta}
                      </p>
                    </div>
                  </div>
                  
                  {/* Condicional: Si es parcela ID 3, mostrar estado sin ubicación */}
                  {parcela.id === 3 ? (
                    // Estado: Ubicación no disponible (solo para Parcela Agrícola Valle)
                    <div className="w-full h-[400px] overflow-hidden rounded-lg relative border border-gray-200 bg-gray-50 flex items-center justify-center">
                      <div className="flex flex-col items-center justify-center text-center px-8 py-12 max-w-md">
                        {/* Icono minimalista */}
                        <div className="mb-4" style={{ color: '#525252' }}>
                          <MapPinOff className="w-12 h-12" strokeWidth={1.5} style={{ color: '#124854' }} />
                        </div>
                        
                        {/* Título */}
                        <h3 style={{ 
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-lg)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: '#0A0A0A',
                          marginBottom: '0.5rem'
                        }}>
                          Ubicación no disponible
                        </h3>
                        
                        {/* Texto descriptivo */}
                        <p style={{ 
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          color: '#737373',
                          lineHeight: '1.6'
                        }}>
                          El propietario no ha proporcionado una ubicación exacta para esta parcela, por lo que el mapa no está disponible.
                        </p>
                      </div>
                    </div>
                  ) : (
                    // Contenido normal con tabs y mapa (para todas las demás parcelas)
                    <>
                      {/* Tabs */}
                      <div className="flex gap-2 border-b" style={{ borderColor: '#CDD8DE' }}>
                        {/* Tab 360 */}
                        <div className="relative">
                          <button
                            onClick={() => parcela.id === 1 ? setUbicacionTab('360') : null}
                            onMouseEnter={() => parcela.id !== 1 ? setShowTooltip('360') : null}
                            onMouseLeave={() => setShowTooltip(null)}
                            disabled={parcela.id !== 1}
                            className="flex items-center gap-2 px-4 py-3 transition-colors relative"
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--font-size-body-sm)',
                              fontWeight: 'var(--font-weight-medium)',
                              color: parcela.id !== 1 ? '#525252' : (ubicacionTab === '360' ? '#124854' : '#737373'),
                              borderBottom: ubicacionTab === '360' ? '2px solid #124854' : '2px solid transparent',
                              marginBottom: '-1px',
                              cursor: parcela.id !== 1 ? 'not-allowed' : 'pointer',
                              opacity: parcela.id !== 1 ? 0.6 : 1
                            }}
                          >
                            <Maximize2 className="w-4 h-4" />
                            360
                          </button>
                          
                          {/* Tooltip para disabled */}
                          {showTooltip === '360' && parcela.id !== 1 && (
                            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-50 pointer-events-none"
                              style={{ 
                                fontFamily: 'var(--font-body)',
                                fontWeight: 'var(--font-weight-regular)',
                                maxWidth: '200px',
                                whiteSpace: 'normal'
                              }}
                            >
                              Este contenido no está disponible para esta publicación.
                              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                            </div>
                          )}
                        </div>

                        {/* Tab Plano */}
                        <div className="relative">
                          <button
                            onClick={() => [1, 2].includes(parcela.id) ? setUbicacionTab('plano') : null}
                            onMouseEnter={() => ![1, 2].includes(parcela.id) ? setShowTooltip('plano') : null}
                            onMouseLeave={() => setShowTooltip(null)}
                            disabled={![1, 2].includes(parcela.id)}
                            className="flex items-center gap-2 px-4 py-3 transition-colors relative"
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--font-size-body-sm)',
                              fontWeight: 'var(--font-weight-medium)',
                              color: ![1, 2].includes(parcela.id) ? '#525252' : (ubicacionTab === 'plano' ? '#124854' : '#737373'),
                              borderBottom: ubicacionTab === 'plano' ? '2px solid #124854' : '2px solid transparent',
                              marginBottom: '-1px',
                              cursor: ![1, 2].includes(parcela.id) ? 'not-allowed' : 'pointer',
                              opacity: ![1, 2].includes(parcela.id) ? 0.6 : 1
                            }}
                          >
                            <FileText className="w-4 h-4" />
                            Plano
                          </button>
                          
                          {/* Tooltip para disabled */}
                          {showTooltip === 'plano' && ![1, 2].includes(parcela.id) && (
                            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-50 pointer-events-none"
                              style={{ 
                                fontFamily: 'var(--font-body)',
                                fontWeight: 'var(--font-weight-regular)',
                                maxWidth: '200px',
                                whiteSpace: 'normal'
                              }}
                            >
                              Este contenido no está disponible para esta publicación.
                              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                            </div>
                          )}
                        </div>

                        {/* Tab Mapa */}
                        <button
                          onClick={() => setUbicacionTab('mapa')}
                          className="flex items-center gap-2 px-4 py-3 transition-colors relative"
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            fontWeight: 'var(--font-weight-medium)',
                            color: ubicacionTab === 'mapa' ? '#124854' : '#737373',
                            borderBottom: ubicacionTab === 'mapa' ? '2px solid #124854' : '2px solid transparent',
                            marginBottom: '-1px'
                          }}
                        >
                          <MapPin className="w-4 h-4" />
                          Mapa
                        </button>
                      </div>
                      
                      {/* Contenido según tab activo */}
                      <div className="w-full h-[400px] overflow-hidden rounded-lg relative border border-gray-200 bg-gray-50">
                        {ubicacionTab === '360' && (
                          <iframe
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            src="https://www.google.com/maps/embed?pb=!4v1705234567890!6m8!1m7!1sCAoSLEFGMVFpcE5oVXZ4cGtWZjR0ZXN0!2m2!1d-46.54!2d-71.72!3f0!4f0!5f0.7"
                          />
                        )}
                        
                        {ubicacionTab === 'plano' && (
                          <div className="w-full h-full flex items-center justify-center bg-white">
                            {parcela.plano ? (
                              <ImageWithFallback
                                src={parcela.plano}
                                alt="Plano de la parcela"
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
                                <FileText 
                                  className="w-16 h-16" 
                                  style={{ color: '#CDD8DE' }}
                                />
                                <div>
                                  <p style={{
                                    fontFamily: 'var(--font-body)',
                                    fontSize: 'var(--font-size-body-base)',
                                    fontWeight: 'var(--font-weight-medium)',
                                    color: '#0A0A0A',
                                    marginBottom: '8px'
                                  }}>
                                    Plano no disponible
                                  </p>
                                  <p style={{
                                    fontFamily: 'var(--font-body)',
                                    fontSize: 'var(--font-size-body-sm)',
                                    color: '#737373',
                                    lineHeight: 'var(--line-height-body)'
                                  }}>
                                    El propietario no ha proporcionado un plano para esta parcela.
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        
                        {ubicacionTab === 'mapa' && (
                          <iframe
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${parcela.lat},${parcela.lng}&zoom=14`}
                          />
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Características - REORGANIZADAS EN GRUPOS */}
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <h2 style={{ 
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 'var(--font-weight-regular)',
                  fontSize: 'var(--font-size-h2)',
                  color: '#0A0A0A',
                  marginBottom: '2rem'
                }}>
                  Características
                </h2>

                <div className="space-y-6">
                  {/* Grupo: Terreno */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 style={{ 
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 'var(--font-weight-medium)',
                      fontSize: 'var(--font-size-body-lg)',
                      color: '#0A0A0A',
                      marginBottom: '1.5rem'
                    }}>
                      Terreno
                    </h3>
                    <div className="flex gap-4">
                      {parcela.caracteristicasTerreno.map((carac, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center text-center gap-4 min-w-0">
                          {carac.icon && (
                            <div 
                              className="w-14 h-14 rounded-full bg-white flex items-center justify-center border border-gray-200 flex-shrink-0"
                              style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.05)' }}
                            >
                              <div className="[&_svg]:stroke-[#124854] [&_path]:fill-none [&_path]:stroke-[#124854] [&_circle]:fill-none [&_circle]:stroke-[#124854] [&_rect]:fill-none [&_rect]:stroke-[#124854] [&_line]:stroke-[#124854] [&_polyline]:stroke-[#124854]" style={{ color: '#124854' }}>{carac.icon}</div>
                            </div>
                          )}
                          <div className="w-full">
                            <p style={{ 
                              fontFamily: 'var(--font-body)',
                              color: '#0A0A0A',
                              fontSize: 'var(--font-size-body-sm)',
                              fontWeight: 'var(--font-weight-medium)',
                              marginBottom: '0.375rem',
                              lineHeight: '1.4'
                            }}>
                              {carac.valor}
                            </p>
                            <p style={{ 
                              fontFamily: 'var(--font-body)',
                              color: '#737373',
                              fontSize: 'var(--font-size-xs)',
                              fontWeight: 'var(--font-weight-regular)',
                              lineHeight: '1.4'
                            }}>
                              {carac.label}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Grupo: Servicios */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 style={{ 
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 'var(--font-weight-medium)',
                      fontSize: 'var(--font-size-body-lg)',
                      color: '#0A0A0A',
                      marginBottom: '1.5rem'
                    }}>
                      Servicios
                    </h3>
                    <div className="flex gap-4">
                      {parcela.caracteristicasServicios.map((carac, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center text-center gap-4 min-w-0">
                          {carac.icon && (
                            <div 
                              className="w-14 h-14 rounded-full bg-white flex items-center justify-center border border-gray-200 flex-shrink-0"
                              style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.05)' }}
                            >
                              <div className="[&_svg]:stroke-[#124854] [&_path]:fill-none [&_path]:stroke-[#124854] [&_circle]:fill-none [&_circle]:stroke-[#124854] [&_rect]:fill-none [&_rect]:stroke-[#124854] [&_line]:stroke-[#124854] [&_polyline]:stroke-[#124854]" style={{ color: '#124854' }}>{carac.icon}</div>
                            </div>
                          )}
                          <div className="w-full">
                            <p style={{ 
                              fontFamily: 'var(--font-body)',
                              color: '#0A0A0A',
                              fontSize: 'var(--font-size-body-sm)',
                              fontWeight: 'var(--font-weight-medium)',
                              marginBottom: '0.375rem',
                              lineHeight: '1.4'
                            }}>
                              {carac.valor}
                            </p>
                            <p style={{ 
                              fontFamily: 'var(--font-body)',
                              color: '#737373',
                              fontSize: 'var(--font-size-xs)',
                              fontWeight: 'var(--font-weight-regular)',
                              lineHeight: '1.4'
                            }}>
                              {carac.label}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Grupo: Estado Legal */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 style={{ 
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 'var(--font-weight-medium)',
                      fontSize: 'var(--font-size-body-lg)',
                      color: '#0A0A0A',
                      marginBottom: '1.5rem'
                    }}>
                      Estado Legal
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {parcela.caracteristicasLegal.map((carac, index) => (
                        <div key={index} className="flex flex-col items-center text-center gap-4">
                          {carac.icon && (
                            <div 
                              className="w-14 h-14 rounded-full bg-white flex items-center justify-center border border-gray-200 flex-shrink-0"
                              style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.05)' }}
                            >
                              <div className="[&_svg]:stroke-[#124854] [&_path]:fill-none [&_path]:stroke-[#124854] [&_circle]:fill-none [&_circle]:stroke-[#124854] [&_rect]:fill-none [&_rect]:stroke-[#124854] [&_line]:stroke-[#124854] [&_polyline]:stroke-[#124854]" style={{ color: '#124854' }}>{carac.icon}</div>
                            </div>
                          )}
                          <div>
                            <p style={{ 
                              fontFamily: 'var(--font-body)',
                              color: '#0A0A0A',
                              fontSize: 'var(--font-size-body-sm)',
                              fontWeight: 'var(--font-weight-medium)',
                              marginBottom: '0.375rem',
                              lineHeight: '1.4'
                            }}>
                              {carac.valor}
                            </p>
                            <p style={{ 
                              fontFamily: 'var(--font-body)',
                              color: '#737373',
                              fontSize: 'var(--font-size-xs)',
                              fontWeight: 'var(--font-weight-regular)',
                              lineHeight: '1.4'
                            }}>
                              {carac.label}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Información contextual avanzada - NUEVA SECCIÓN */}
              <div className="mt-16 pt-12" style={{ borderTop: '1px solid #CDD8DE' }}>
                <div className="mb-8">
                  <h2 style={{ 
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 'var(--font-weight-regular)',
                    fontSize: 'var(--font-size-h2)',
                    color: '#0A0A0A',
                    marginBottom: '0.5rem'
                  }}>
                    Información del entorno
                  </h2>
                  <p style={{ 
                    fontFamily: 'var(--font-body)',
                    color: '#737373',
                    fontSize: 'var(--font-size-body-sm)',
                    lineHeight: 'var(--line-height-body)'
                  }}>
                    Conoce más sobre el área y contexto de esta propiedad
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Accesos y conectividad */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                        <div className="[&_svg]:stroke-[#124854] [&_path]:fill-none [&_path]:stroke-[#124854] [&_circle]:fill-none [&_circle]:stroke-[#124854] [&_rect]:fill-none [&_rect]:stroke-[#124854] [&_line]:stroke-[#124854] [&_polyline]:stroke-[#124854]">
                          <Navigation className="w-5 h-5" style={{ color: '#124854' }} />
                        </div>
                      </div>
                      <h3 style={{ 
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 'var(--font-weight-medium)',
                        fontSize: 'var(--font-size-body-lg)',
                        color: '#0A0A0A'
                      }}>
                        Accesos y conectividad
                      </h3>
                    </div>

                    <div className="space-y-5">
                      {/* Tiempo al centro urbano */}
                      <div>
                        <div className="flex items-end justify-between mb-2">
                          <span style={{ 
                            fontFamily: 'var(--font-body)',
                            color: '#737373',
                            fontSize: 'var(--font-size-xs)'
                          }}>
                            Tiempo al centro
                          </span>
                          <span style={{ 
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 'var(--font-weight-semibold)',
                            fontSize: 'var(--font-size-h3)',
                            color: '#0A0A0A'
                          }}>
                            15min
                          </span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: '25%', backgroundColor: '#647E3F' }}
                          />
                        </div>
                        <p style={{ 
                          fontFamily: 'var(--font-body)',
                          color: '#A3A3A3',
                          fontSize: 'var(--font-size-xs)',
                          marginTop: '0.5rem'
                        }}>
                          Chile Chico, 12 km
                        </p>
                      </div>

                      {/* Tipo de acceso */}
                      <div>
                        <span style={{ 
                          fontFamily: 'var(--font-body)',
                          color: '#737373',
                          fontSize: 'var(--font-size-xs)',
                          display: 'block',
                          marginBottom: '0.75rem'
                        }}>
                          Tipo de acceso
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: '#124854' }} />
                          <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: '#124854' }} />
                          <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: '#124854' }} />
                          <div className="flex-1 h-2 bg-gray-100 rounded-full" />
                        </div>
                        <p style={{ 
                          fontFamily: 'var(--font-body)',
                          color: '#0A0A0A',
                          fontSize: 'var(--font-size-body-sm)',
                          fontWeight: 'var(--font-weight-medium)',
                          marginTop: '0.75rem'
                        }}>
                          Camino pavimentado
                        </p>
                      </div>

                      {/* Distancia ciudad principal */}
                      <div className="pt-4" style={{ borderTop: '1px solid #CDD8DE' }}>
                        <div className="flex items-center justify-between">
                          <span style={{ 
                            fontFamily: 'var(--font-body)',
                            color: '#737373',
                            fontSize: 'var(--font-size-xs)'
                          }}>
                            Coyhaique
                          </span>
                          <span style={{ 
                            fontFamily: 'var(--font-body)',
                            color: '#0A0A0A',
                            fontSize: 'var(--font-size-body-sm)',
                            fontWeight: 'var(--font-weight-medium)'
                          }}>
                            220 km
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Servicios cercanos */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                        <div className="[&_svg]:stroke-[#124854] [&_path]:fill-none [&_path]:stroke-[#124854] [&_circle]:fill-none [&_circle]:stroke-[#124854] [&_rect]:fill-none [&_rect]:stroke-[#124854] [&_line]:stroke-[#124854] [&_polyline]:stroke-[#124854]">
                          <ShoppingBag className="w-5 h-5" style={{ color: '#124854' }} />
                        </div>
                      </div>
                      <h3 style={{ 
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 'var(--font-weight-medium)',
                        fontSize: 'var(--font-size-body-lg)',
                        color: '#0A0A0A'
                      }}>
                        Servicios cercanos
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {/* Educación */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <School className="w-4 h-4 text-gray-500" />
                            <span style={{ 
                              fontFamily: 'var(--font-body)',
                              color: '#525252',
                              fontSize: 'var(--font-size-xs)'
                            }}>
                              Educación
                            </span>
                          </div>
                          <span style={{ 
                            fontFamily: 'var(--font-body)',
                            color: '#0A0A0A',
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 'var(--font-weight-semibold)'
                          }}>
                            Alta
                          </span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full"
                            style={{ width: '85%', backgroundColor: '#647E3F' }}
                          />
                        </div>
                      </div>

                      {/* Comercio */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <ShoppingBag className="w-4 h-4 text-gray-500" />
                            <span style={{ 
                              fontFamily: 'var(--font-body)',
                              color: '#525252',
                              fontSize: 'var(--font-size-xs)'
                            }}>
                              Comercio
                            </span>
                          </div>
                          <span style={{ 
                            fontFamily: 'var(--font-body)',
                            color: '#0A0A0A',
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 'var(--font-weight-semibold)'
                          }}>
                            Alta
                          </span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full"
                            style={{ width: '90%', backgroundColor: '#647E3F' }}
                          />
                        </div>
                      </div>

                      {/* Salud */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Home className="w-4 h-4 text-gray-500" />
                            <span style={{ 
                              fontFamily: 'var(--font-body)',
                              color: '#525252',
                              fontSize: 'var(--font-size-xs)'
                            }}>
                              Salud
                            </span>
                          </div>
                          <span style={{ 
                            fontFamily: 'var(--font-body)',
                            color: '#0A0A0A',
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 'var(--font-weight-semibold)'
                          }}>
                            Media
                          </span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full"
                            style={{ width: '65%', backgroundColor: '#647E3F' }}
                          />
                        </div>
                      </div>

                      {/* Recreación */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <TreePine className="w-4 h-4 text-gray-500" />
                            <span style={{ 
                              fontFamily: 'var(--font-body)',
                              color: '#525252',
                              fontSize: 'var(--font-size-xs)'
                            }}>
                              Recreación
                            </span>
                          </div>
                          <span style={{ 
                            fontFamily: 'var(--font-body)',
                            color: '#0A0A0A',
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 'var(--font-weight-semibold)'
                          }}>
                            Alta
                          </span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full"
                            style={{ width: '80%', backgroundColor: '#647E3F' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Entorno natural */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                        <div className="[&_svg]:stroke-[#124854] [&_path]:fill-none [&_path]:stroke-[#124854] [&_circle]:fill-none [&_circle]:stroke-[#124854] [&_rect]:fill-none [&_rect]:stroke-[#124854] [&_line]:stroke-[#124854] [&_polyline]:stroke-[#124854]">
                          <TreePine className="w-5 h-5" style={{ color: '#124854' }} />
                        </div>
                      </div>
                      <h3 style={{ 
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 'var(--font-weight-medium)',
                        fontSize: 'var(--font-size-body-lg)',
                        color: '#0A0A0A'
                      }}>
                        Entorno natural
                      </h3>
                    </div>

                    <div className="space-y-5">
                      {/* Nivel de naturaleza */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span style={{ 
                            fontFamily: 'var(--font-body)',
                            color: '#737373',
                            fontSize: 'var(--font-size-xs)'
                          }}>
                            Naturaleza
                          </span>
                          <div className="flex gap-1">
                            <div className="w-2 h-8 rounded-sm" style={{ backgroundColor: '#647E3F' }} />
                            <div className="w-2 h-8 rounded-sm" style={{ backgroundColor: '#647E3F' }} />
                            <div className="w-2 h-8 rounded-sm" style={{ backgroundColor: '#647E3F' }} />
                            <div className="w-2 h-8 rounded-sm" style={{ backgroundColor: '#647E3F' }} />
                            <div className="w-2 h-8 bg-gray-100 rounded-sm" />
                          </div>
                        </div>
                        <p style={{ 
                          fontFamily: 'var(--font-body)',
                          color: '#525252',
                          fontSize: 'var(--font-size-xs)'
                        }}>
                          Rodeado de naturaleza patagónica
                        </p>
                      </div>

                      {/* Vistas */}
                      <div className="pt-4" style={{ borderTop: '1px solid #CDD8DE' }}>
                        <div className="flex items-center justify-between mb-3">
                          <span style={{ 
                            fontFamily: 'var(--font-body)',
                            color: '#737373',
                            fontSize: 'var(--font-size-xs)'
                          }}>
                            Vistas
                          </span>
                          <div className="flex gap-1">
                            <div className="w-2 h-8 rounded-sm" style={{ backgroundColor: '#647E3F' }} />
                            <div className="w-2 h-8 rounded-sm" style={{ backgroundColor: '#647E3F' }} />
                            <div className="w-2 h-8 rounded-sm" style={{ backgroundColor: '#647E3F' }} />
                            <div className="w-2 h-8 rounded-sm" style={{ backgroundColor: '#647E3F' }} />
                            <div className="w-2 h-8 rounded-sm" style={{ backgroundColor: '#647E3F' }} />
                          </div>
                        </div>
                        <p style={{ 
                          fontFamily: 'var(--font-body)',
                          color: '#525252',
                          fontSize: 'var(--font-size-xs)'
                        }}>
                          Vista panorámica al lago
                        </p>
                      </div>

                      {/* Clima */}
                      <div className="pt-4" style={{ borderTop: '1px solid #CDD8DE' }}>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span style={{ 
                              fontFamily: 'var(--font-body)',
                              color: '#737373',
                              fontSize: 'var(--font-size-xs)',
                              display: 'block',
                              marginBottom: '0.25rem'
                            }}>
                              Temp. promedio
                            </span>
                            <span style={{ 
                              fontFamily: 'var(--font-heading)',
                              fontWeight: 'var(--font-weight-semibold)',
                              fontSize: 'var(--font-size-h4)',
                              color: '#0A0A0A'
                            }}>
                              9°C
                            </span>
                          </div>
                          <div>
                            <span style={{ 
                              fontFamily: 'var(--font-body)',
                              color: '#737373',
                              fontSize: 'var(--font-size-xs)',
                              display: 'block',
                              marginBottom: '0.25rem'
                            }}>
                              Precipitaciones
                            </span>
                            <span style={{ 
                              fontFamily: 'var(--font-body)',
                              color: '#0A0A0A',
                              fontSize: 'var(--font-size-body-sm)',
                              fontWeight: 'var(--font-weight-medium)'
                            }}>
                              Moderadas
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contexto del área */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                        <div className="[&_svg]:stroke-[#124854] [&_path]:fill-none [&_path]:stroke-[#124854] [&_circle]:fill-none [&_circle]:stroke-[#124854] [&_rect]:fill-none [&_rect]:stroke-[#124854] [&_line]:stroke-[#124854] [&_polyline]:stroke-[#124854]">
                          <TrendingUp className="w-5 h-5" style={{ color: '#124854' }} />
                        </div>
                      </div>
                      <h3 style={{ 
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 'var(--font-weight-medium)',
                        fontSize: 'var(--font-size-body-lg)',
                        color: '#0A0A0A'
                      }}>
                        Contexto del área
                      </h3>
                    </div>

                    <div className="space-y-5">
                      {/* Población */}
                      <div>
                        <span style={{ 
                          fontFamily: 'var(--font-body)',
                          color: '#737373',
                          fontSize: 'var(--font-size-xs)',
                          display: 'block',
                          marginBottom: '0.5rem'
                        }}>
                          Población aproximada
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span style={{ 
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 'var(--font-weight-semibold)',
                            fontSize: 'var(--font-size-h2)',
                            color: '#0A0A0A'
                          }}>
                            4.500
                          </span>
                          <span style={{ 
                            fontFamily: 'var(--font-body)',
                            color: '#A3A3A3',
                            fontSize: 'var(--font-size-xs)'
                          }}>
                            habitantes
                          </span>
                        </div>
                      </div>

                      {/* Actividades económicas */}
                      <div className="pt-4" style={{ borderTop: '1px solid #CDD8DE' }}>
                        <span style={{ 
                          fontFamily: 'var(--font-body)',
                          color: '#737373',
                          fontSize: 'var(--font-size-xs)',
                          display: 'block',
                          marginBottom: '0.75rem'
                        }}>
                          Actividades principales
                        </span>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                              <span style={{ 
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--font-size-xs)',
                                fontWeight: 'var(--font-weight-semibold)',
                                color: '#0A0A0A'
                              }}>
                                1
                              </span>
                            </div>
                            <span style={{ 
                              fontFamily: 'var(--font-body)',
                              color: '#525252',
                              fontSize: 'var(--font-size-body-sm)'
                            }}>
                              Turismo
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                              <span style={{ 
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--font-size-xs)',
                                fontWeight: 'var(--font-weight-semibold)',
                                color: '#0A0A0A'
                              }}>
                                2
                              </span>
                            </div>
                            <span style={{ 
                              fontFamily: 'var(--font-body)',
                              color: '#525252',
                              fontSize: 'var(--font-size-body-sm)'
                            }}>
                              Agricultura
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                              <span style={{ 
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--font-size-xs)',
                                fontWeight: 'var(--font-weight-semibold)',
                                color: '#0A0A0A'
                              }}>
                                3
                              </span>
                            </div>
                            <span style={{ 
                              fontFamily: 'var(--font-body)',
                              color: '#525252',
                              fontSize: 'var(--font-size-body-sm)'
                            }}>
                              Ganadería
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Indicadores económicos y comerciales */}
                  <div className="bg-white rounded-xl border p-6 md:col-span-2" style={{ borderColor: '#CDD8DE' }}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F5F5F5' }}>
                        <div className="[&_svg]:stroke-[#124854] [&_path]:fill-none [&_path]:stroke-[#124854] [&_circle]:fill-none [&_circle]:stroke-[#124854] [&_rect]:fill-none [&_rect]:stroke-[#124854] [&_line]:stroke-[#124854] [&_polyline]:stroke-[#124854]">
                          <TrendingUp className="w-5 h-5" style={{ color: '#124854' }} />
                        </div>
                      </div>
                      <h3 style={{ 
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 'var(--font-weight-medium)',
                        fontSize: 'var(--font-size-body-lg)',
                        color: '#0A0A0A'
                      }}>
                        Indicadores económicos y comerciales
                      </h3>
                    </div>
                    <p style={{ 
                      fontFamily: 'var(--font-body)',
                      color: '#737373',
                      fontSize: 'var(--font-size-xs)',
                      marginBottom: '1.5rem',
                      marginLeft: '3.25rem'
                    }}>
                      Obtén información para realizar la mejor compra
                    </p>

                    {/* Gráfico de Plusvalía */}
                    <div className="mt-6">
                      <h4 style={{ 
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 'var(--font-weight-medium)',
                        fontSize: 'var(--font-size-body-base)',
                        color: '#0A0A0A',
                        marginBottom: '1.5rem'
                      }}>
                        Gráfico de Plusvalía
                      </h4>

                      {parcela.plusvalia && parcela.plusvalia.length > 0 ? (
                        <div style={{ width: '100%', height: '300px' }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart 
                              data={parcela.plusvalia} 
                              margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
                            >
                              <CartesianGrid 
                                strokeDasharray="3 3" 
                                stroke="#CDD8DE" 
                                vertical={false}
                              />
                              <XAxis 
                                dataKey="año" 
                                tick={{ 
                                  fontFamily: 'var(--font-body)', 
                                  fontSize: 12,
                                  fill: '#737373' 
                                }}
                                tickLine={false}
                                axisLine={{ stroke: '#CDD8DE' }}
                              />
                              <YAxis 
                                tick={{ 
                                  fontFamily: 'var(--font-body)', 
                                  fontSize: 12,
                                  fill: '#737373' 
                                }}
                                tickLine={false}
                                axisLine={{ stroke: '#CDD8DE' }}
                                tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}M`}
                              />
                              <Tooltip 
                                contentStyle={{
                                  backgroundColor: '#FFFFFF',
                                  border: '1px solid #CDD8DE',
                                  borderRadius: '8px',
                                  fontFamily: 'var(--font-body)',
                                  fontSize: '12px',
                                  padding: '8px 12px'
                                }}
                                labelStyle={{ 
                                  color: '#0A0A0A',
                                  fontWeight: 'var(--font-weight-medium)',
                                  marginBottom: '4px'
                                }}
                                formatter={(value: number) => [
                                  `$${value.toLocaleString('es-CL')}`,
                                  'Valor'
                                ]}
                              />
                              <Line 
                                type="monotone" 
                                dataKey="valor" 
                                stroke="#124854" 
                                strokeWidth={2.5}
                                dot={{ 
                                  fill: '#124854', 
                                  strokeWidth: 2, 
                                  r: 5,
                                  stroke: '#FFFFFF'
                                }}
                                activeDot={{ 
                                  r: 7,
                                  fill: '#124854',
                                  stroke: '#FFFFFF',
                                  strokeWidth: 2
                                }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center py-12 px-4 rounded-lg border" style={{ 
                          backgroundColor: '#F5F5F5', 
                          borderColor: '#CDD8DE' 
                        }}>
                          <p style={{ 
                            fontFamily: 'var(--font-body)',
                            color: '#737373',
                            fontSize: 'var(--font-size-body-sm)',
                            textAlign: 'center'
                          }}>
                            No hay información de plusvalía disponible para esta parcela.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Nota informativa */}
                <div className="mt-6 p-5 rounded-xl bg-gray-50 border border-gray-200">
                  <p style={{ 
                    fontFamily: 'var(--font-body)',
                    color: '#737373',
                    fontSize: 'var(--font-size-xs)',
                    lineHeight: 'var(--line-height-body)'
                  }}>
                    <strong style={{ color: '#525252' }}>Nota:</strong> La información presentada en esta sección es de carácter referencial y busca aportar contexto general sobre el área. Te recomendamos verificar detalles específicos directamente con el publicador o mediante visita al terreno.
                  </p>
                </div>
              </div>

              {/* Planos y documentos */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 mt-16">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-200 flex-shrink-0"
                      style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.05)' }}
                    >
                      <div className="[&_svg]:stroke-[#124854] [&_path]:fill-none [&_path]:stroke-[#124854] [&_circle]:fill-none [&_circle]:stroke-[#124854] [&_rect]:fill-none [&_rect]:stroke-[#124854] [&_line]:stroke-[#124854] [&_polyline]:stroke-[#124854]">
                        <FileText className="w-5 h-5" style={{ color: '#124854' }} />
                      </div>
                    </div>
                    <h2 style={{ 
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 'var(--font-weight-regular)',
                      fontSize: 'var(--font-size-h2)',
                      color: '#0A0A0A',
                      margin: 0
                    }}>
                      Planos y documentos
                    </h2>
                  </div>
                  <button
                    onClick={() => setIsDocumentosOpen(!isDocumentosOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      color: '#0A0A0A',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)'
                    }}
                  >
                    <span>{isDocumentosOpen ? 'Ocultar planos y documentos' : 'Ver planos y documentos'}</span>
                    <div className="[&_svg]:stroke-currentColor [&_path]:fill-none [&_path]:stroke-currentColor [&_circle]:fill-none [&_circle]:stroke-currentColor [&_rect]:fill-none [&_rect]:stroke-currentColor [&_line]:stroke-currentColor [&_polyline]:stroke-currentColor]">
                      {isDocumentosOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>
                </div>

                {/* Documentos principales - Colapsable */}
                {isDocumentosOpen && (
                <div className="space-y-4 mt-6">
                  {/* Plano del terreno */}
                  <div className="flex items-start justify-between p-5 rounded-xl border border-gray-200 hover:border-gray-300 transition-all">
                    <div className="flex items-start gap-4 flex-1">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ 
                          backgroundColor: '#F5F5F5',
                          border: '1px solid #E5E5E5'
                        }}
                      >
                        <div className="[&_svg]:stroke-[#525252] [&_path]:fill-none [&_path]:stroke-[#525252] [&_circle]:fill-none [&_circle]:stroke-[#525252] [&_rect]:fill-none [&_rect]:stroke-[#525252] [&_line]:stroke-[#525252] [&_polyline]:stroke-[#525252]">
                          <Map className="w-4 h-4" style={{ color: '#525252' }} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 style={{ 
                          fontFamily: 'var(--font-body)',
                          fontWeight: 'var(--font-weight-semibold)',
                          fontSize: 'var(--font-size-body-base)',
                          color: '#0A0A0A',
                          marginBottom: '0.375rem'
                        }}>
                          Plano del terreno
                        </h3>
                        <p style={{ 
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          color: '#737373',
                          lineHeight: 'var(--line-height-body)'
                        }}>
                          Topografía, medidas y límites oficiales de la parcela
                        </p>
                      </div>
                    </div>
                    <button 
                      className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-300 hover:bg-gray-50 hover:border-gray-900 transition-all flex-shrink-0 ml-4"
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        color: '#0A0A0A',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-medium)'
                      }}
                    >
                      <Download className="w-4 h-4" />
                      <span>Descargar</span>
                    </button>
                  </div>

                  {/* Rol aprobado */}
                  <div className="flex items-start justify-between p-5 rounded-xl border border-gray-200 hover:border-gray-300 transition-all">
                    <div className="flex items-start gap-4 flex-1">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ 
                          backgroundColor: '#F5F5F5',
                          border: '1px solid #E5E5E5'
                        }}
                      >
                        <div className="[&_svg]:stroke-[#525252] [&_path]:fill-none [&_path]:stroke-[#525252] [&_circle]:fill-none [&_circle]:stroke-[#525252] [&_rect]:fill-none [&_rect]:stroke-[#525252] [&_line]:stroke-[#525252] [&_polyline]:stroke-[#525252]">
                          <FileBadge className="w-4 h-4" style={{ color: '#525252' }} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 style={{ 
                          fontFamily: 'var(--font-body)',
                          fontWeight: 'var(--font-weight-semibold)',
                          fontSize: 'var(--font-size-body-base)',
                          color: '#0A0A0A',
                          marginBottom: '0.375rem'
                        }}>
                          Rol aprobado
                        </h3>
                        <p style={{ 
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          color: '#737373',
                          lineHeight: 'var(--line-height-body)'
                        }}>
                          Certificado de inscripción y avalúo fiscal del Conservador de Bienes Raíces
                        </p>
                      </div>
                    </div>
                    <button 
                      className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-300 hover:bg-gray-50 hover:border-gray-900 transition-all flex-shrink-0 ml-4"
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        color: '#0A0A0A',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-medium)'
                      }}
                    >
                      <Download className="w-4 h-4" />
                      <span>Descargar</span>
                    </button>
                  </div>

                  {/* Factibilidad de servicios */}
                  <div className="flex items-start justify-between p-5 rounded-xl border border-gray-200 hover:border-gray-300 transition-all">
                    <div className="flex items-start gap-4 flex-1">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ 
                          backgroundColor: '#F5F5F5',
                          border: '1px solid #E5E5E5'
                        }}
                      >
                        <div className="[&_svg]:stroke-[#525252] [&_path]:fill-none [&_path]:stroke-[#525252] [&_circle]:fill-none [&_circle]:stroke-[#525252] [&_rect]:fill-none [&_rect]:stroke-[#525252] [&_line]:stroke-[#525252] [&_polyline]:stroke-[#525252]">
                          <Zap className="w-4 h-4" style={{ color: '#525252' }} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 style={{ 
                          fontFamily: 'var(--font-body)',
                          fontWeight: 'var(--font-weight-semibold)',
                          fontSize: 'var(--font-size-body-base)',
                          color: '#0A0A0A',
                          marginBottom: '0.375rem'
                        }}>
                          Factibilidad de servicios
                        </h3>
                        <p style={{ 
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          color: '#737373',
                          lineHeight: 'var(--line-height-body)'
                        }}>
                          Informe de disponibilidad de agua, luz y conexiones básicas
                        </p>
                      </div>
                    </div>
                    <button 
                      className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-300 hover:bg-gray-50 hover:border-gray-900 transition-all flex-shrink-0 ml-4"
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        color: '#0A0A0A',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-medium)'
                      }}
                    >
                      <Download className="w-4 h-4" />
                      <span>Descargar</span>
                    </button>
                  </div>

                  {/* Sección de documentación técnica adicional (colapsable) */}
                  <div className="mt-2 pt-6 border-t" style={{ borderColor: '#CDD8DE' }}>
                    <button
                      onClick={() => setIsDocTecnicaOpen(!isDocTecnicaOpen)}
                      className="flex items-center justify-between w-full p-4 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="[&_svg]:stroke-[#737373] [&_path]:fill-none [&_path]:stroke-[#737373] [&_circle]:fill-none [&_circle]:stroke-[#737373] [&_rect]:fill-none [&_rect]:stroke-[#737373] [&_line]:stroke-[#737373] [&_polyline]:stroke-[#737373]">
                          <Settings className="w-5 h-5" style={{ color: '#737373' }} />
                        </div>
                        <span style={{ 
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          color: '#525252',
                          fontWeight: 'var(--font-weight-medium)'
                        }}>
                          Documentación técnica adicional
                        </span>
                      </div>
                      <div className="[&_svg]:stroke-[#737373] [&_path]:fill-none [&_path]:stroke-[#737373] [&_circle]:fill-none [&_circle]:stroke-[#737373] [&_rect]:fill-none [&_rect]:stroke-[#737373] [&_line]:stroke-[#737373] [&_polyline]:stroke-[#737373]">
                        {isDocTecnicaOpen ? <ChevronUp className="w-4 h-4" style={{ color: '#737373' }} /> : <ChevronDown className="w-4 h-4" style={{ color: '#737373' }} />}
                      </div>
                    </button>

                    {isDocTecnicaOpen && (
                    <div className="mt-4 space-y-3 pl-4">
                      {/* Estudio de suelo */}
                      <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                            <div className="[&_svg]:stroke-[#737373] [&_path]:fill-none [&_path]:stroke-[#737373] [&_circle]:fill-none [&_circle]:stroke-[#737373] [&_rect]:fill-none [&_rect]:stroke-[#737373] [&_line]:stroke-[#737373] [&_polyline]:stroke-[#737373]">
                              <FileText className="w-5 h-5" style={{ color: '#737373' }} />
                            </div>
                          </div>
                          <span style={{ 
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            color: '#0A0A0A',
                            fontWeight: 'var(--font-weight-medium)'
                          }}>
                            Estudio de suelo
                          </span>
                        </div>
                        <button 
                          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 hover:bg-gray-50 transition-all"
                          style={{ 
                            fontFamily: 'var(--font-body)',
                            color: '#525252',
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 'var(--font-weight-medium)'
                          }}
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Descargar</span>
                        </button>
                      </div>

                      {/* Certificado de informaciones previas */}
                      <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                            <div className="[&_svg]:stroke-[#737373] [&_path]:fill-none [&_path]:stroke-[#737373] [&_circle]:fill-none [&_circle]:stroke-[#737373] [&_rect]:fill-none [&_rect]:stroke-[#737373] [&_line]:stroke-[#737373] [&_polyline]:stroke-[#737373]">
                              <FileCheck className="w-5 h-5" style={{ color: '#737373' }} />
                            </div>
                          </div>
                          <span style={{ 
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            color: '#0A0A0A',
                            fontWeight: 'var(--font-weight-medium)'
                          }}>
                            Certificado de informaciones previas
                          </span>
                        </div>
                        <button 
                          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 hover:bg-gray-50 transition-all"
                          style={{ 
                            fontFamily: 'var(--font-body)',
                            color: '#525252',
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 'var(--font-weight-medium)'
                          }}
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Descargar</span>
                        </button>
                      </div>

                      {/* Plano regulador comunal */}
                      <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                            <div className="[&_svg]:stroke-[#737373] [&_path]:fill-none [&_path]:stroke-[#737373] [&_circle]:fill-none [&_circle]:stroke-[#737373] [&_rect]:fill-none [&_rect]:stroke-[#737373] [&_line]:stroke-[#737373] [&_polyline]:stroke-[#737373]">
                              <FileText className="w-5 h-5" style={{ color: '#737373' }} />
                            </div>
                          </div>
                          <span style={{ 
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            color: '#0A0A0A',
                            fontWeight: 'var(--font-weight-medium)'
                          }}>
                            Plano regulador comunal
                          </span>
                        </div>
                        <button 
                          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 hover:bg-gray-50 transition-all"
                          style={{ 
                            fontFamily: 'var(--font-body)',
                            color: '#525252',
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 'var(--font-weight-medium)'
                          }}
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Descargar</span>
                        </button>
                      </div>

                      {/* Informe hidrológico */}
                      <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                            <div className="[&_svg]:stroke-[#737373] [&_path]:fill-none [&_path]:stroke-[#737373] [&_circle]:fill-none [&_circle]:stroke-[#737373] [&_rect]:fill-none [&_rect]:stroke-[#737373] [&_line]:stroke-[#737373] [&_polyline]:stroke-[#737373]">
                              <Droplet className="w-5 h-5" style={{ color: '#737373' }} />
                            </div>
                          </div>
                          <span style={{ 
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            color: '#0A0A0A',
                            fontWeight: 'var(--font-weight-medium)'
                          }}>
                            Informe hidrológico
                          </span>
                        </div>
                        <button 
                          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 hover:bg-gray-50 transition-all"
                          style={{ 
                            fontFamily: 'var(--font-body)',
                            color: '#525252',
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 'var(--font-weight-medium)'
                          }}
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Descargar</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              )}
            </div>

              {/* Stock y disponibilidad */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 mt-16">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-200 flex-shrink-0"
                      style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.05)' }}
                    >
                      <div className="[&_svg]:stroke-[#124854] [&_path]:fill-none [&_path]:stroke-[#124854] [&_circle]:fill-none [&_circle]:stroke-[#124854] [&_rect]:fill-none [&_rect]:stroke-[#124854] [&_line]:stroke-[#124854] [&_polyline]:stroke-[#124854]">
                        <Package className="w-5 h-5" style={{ color: '#124854' }} />
                      </div>
                    </div>
                    <h2 style={{ 
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 'var(--font-weight-regular)',
                      fontSize: 'var(--font-size-h2)',
                      color: '#0A0A0A',
                      margin: 0
                    }}>
                      Stock y disponibilidad
                    </h2>
                  </div>
                  <button
                    onClick={() => setIsStockOpen(!isStockOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      color: '#0A0A0A',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)'
                    }}
                  >
                    <span>{isStockOpen ? 'Ocultar parcelas' : 'Ver parcelas disponibles'}</span>
                    {isStockOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
                
                {/* Listado de parcelas - Colapsable */}
                {isStockOpen && (
                  <div className="space-y-3 mt-6">
                    {[
                      { codigo: 'Parcela A-1', superficie: '5.000 m²', estado: 'disponible', estadoLabel: 'Disponible' },
                      { codigo: 'Parcela A-2', superficie: '5.200 m²', estado: 'disponible', estadoLabel: 'Disponible' },
                      { codigo: 'Parcela A-3', superficie: '4.800 m²', estado: 'reservado', estadoLabel: 'Reservado' },
                      { codigo: 'Parcela B-1', superficie: '6.500 m²', estado: 'disponible', estadoLabel: 'Disponible' },
                      { codigo: 'Parcela B-2', superficie: '6.300 m²', estado: 'vendido', estadoLabel: 'Vendido' },
                      { codigo: 'Parcela B-3', superficie: '6.700 m²', estado: 'disponible', estadoLabel: 'Disponible' },
                      { codigo: 'Parcela C-1', superficie: '8.000 m²', estado: 'disponible', estadoLabel: 'Disponible' },
                      { codigo: 'Parcela C-2', superficie: '7.800 m²', estado: 'reservado', estadoLabel: 'Reservado' },
                    ].map((parcela, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div>
                            <p style={{ 
                              fontFamily: 'var(--font-body)',
                              color: 'var(--foreground)',
                              fontSize: 'var(--font-size-body-base)',
                              fontWeight: 'var(--font-weight-semibold)',
                              marginBottom: '0.25rem'
                            }}>
                              {parcela.codigo}
                            </p>
                            <p style={{ 
                              fontFamily: 'var(--font-body)',
                              color: '#737373',
                              fontSize: 'var(--font-size-xs)'
                            }}>
                              {parcela.superficie}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div 
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                            style={{ 
                              backgroundColor: parcela.estado === 'disponible' ? '#DCFCE7' : parcela.estado === 'reservado' ? '#FEF3C7' : '#F5F5F5',
                              border: `1px solid ${parcela.estado === 'disponible' ? '#BBF7D0' : parcela.estado === 'reservado' ? '#FDE68A' : '#E5E5E5'}`
                            }}
                          >
                            <div 
                              className="w-1.5 h-1.5 rounded-full" 
                              style={{ backgroundColor: parcela.estado === 'disponible' ? '#16A34A' : parcela.estado === 'reservado' ? '#CA8A04' : '#737373' }} 
                            />
                            <span style={{ 
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--font-size-xs)',
                              fontWeight: 'var(--font-weight-medium)',
                              color: parcela.estado === 'disponible' ? '#166534' : parcela.estado === 'reservado' ? '#854D0E' : '#525252'
                            }}>
                              {parcela.estadoLabel}
                            </span>
                          </div>
                          <div className="relative">
                            <button
                              onClick={parcela.estado !== 'vendido' ? () => handleStockComprarClick(parcela.codigo) : undefined}
                              disabled={parcela.estado === 'vendido'}
                              className="w-10 h-10 rounded-full flex items-center justify-center border transition-all"
                              style={{ 
                                backgroundColor: parcela.estado === 'vendido' ? '#F5F5F5' : '#FFFFFF',
                                borderColor: parcela.estado === 'vendido' ? '#E5E5E5' : '#D4D4D4',
                                cursor: parcela.estado === 'vendido' ? 'not-allowed' : 'pointer',
                                opacity: parcela.estado === 'vendido' ? 0.5 : 1
                              }}
                              onMouseEnter={(e) => {
                                if (parcela.estado !== 'vendido') {
                                  setHoveredCompraButton(parcela.codigo);
                                  e.currentTarget.style.borderColor = '#A3A3A3';
                                  e.currentTarget.style.backgroundColor = '#FAFAFA';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (parcela.estado !== 'vendido') {
                                  setHoveredCompraButton(null);
                                  e.currentTarget.style.borderColor = '#D4D4D4';
                                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                                }
                              }}
                            >
                              <ShoppingCart 
                                className="w-4 h-4" 
                                style={{ color: parcela.estado === 'vendido' ? '#A3A3A3' : '#0A0A0A' }}
                              />
                            </button>
                            {hoveredCompraButton === parcela.codigo && parcela.estado !== 'vendido' && (
                              <div 
                                className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none z-10"
                                style={{
                                  backgroundColor: '#0A0A0A',
                                  color: '#FFFFFF',
                                  fontFamily: 'var(--font-body)',
                                  fontSize: 'var(--font-size-xs)',
                                  fontWeight: 'var(--font-weight-medium)'
                                }}
                              >
                                Comprar esta parcela
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Columna derecha - Sidebar STICKY con resumen clave */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-6">
                {/* Card principal - Publicación */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
                  {/* Precio destacado */}
                  <div>
                      <p style={{ 
                        fontFamily: 'var(--font-body)',
                        color: '#A3A3A3',
                        fontSize: 'var(--font-size-xs)',
                        fontWeight: 'var(--font-weight-medium)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '0.5rem'
                      }}>
                        Precio
                      </p>
                      <PrecioDisplay 
                        precioCLP={parcela.precio}
                        precioSize="xl"
                      />
                      
                      {/* Badge de historial de propiedad */}
                      <div 
                        className="inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 rounded-full"
                        style={{ 
                          backgroundColor: '#F5F5F0',
                          border: '1px solid #E5E5E0'
                        }}
                      >
                        <div className="[&_svg]:stroke-[#124854] [&_path]:fill-none [&_path]:stroke-[#124854] [&_circle]:fill-none [&_circle]:stroke-[#124854] [&_rect]:fill-none [&_rect]:stroke-[#124854] [&_line]:stroke-[#124854] [&_polyline]:stroke-[#124854]">
                          <FileBadge className="w-3.5 h-3.5" style={{ color: '#124854' }} />
                        </div>
                        <span style={{ 
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          color: '#525252',
                          fontWeight: 'var(--font-weight-medium)'
                        }}>
                          {parcela.historialPropiedad}
                        </span>
                      </div>
                    </div>

                    {/* Características destacadas */}
                    <div className="grid grid-cols-2 gap-3 pt-4" style={{ borderTop: '1px solid #CDD8DE' }}>
                      {parcela.destacados.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="[&_svg]:stroke-[#124854] [&_path]:fill-none [&_path]:stroke-[#124854] [&_circle]:fill-none [&_circle]:stroke-[#124854] [&_rect]:fill-none [&_rect]:stroke-[#124854] [&_line]:stroke-[#124854] [&_polyline]:stroke-[#124854]" style={{ color: '#124854' }}>
                            {item.icon}
                          </div>
                          <span style={{ 
                            fontFamily: 'var(--font-body)',
                            color: '#525252',
                            fontSize: 'var(--font-size-body-sm)'
                          }}>
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA principal */}
                    <button 
                      onClick={() => setIsComprarParcelaOpen(true)}
                      className="w-full px-6 py-3 rounded-full transition-all hover:opacity-90 flex items-center justify-center gap-2"
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        backgroundColor: '#124854',
                        color: '#FFFFFF',
                        fontWeight: 'var(--font-weight-semibold)',
                        fontSize: 'var(--font-size-body-base)'
                      }}
                    >
                      <div className="[&_svg]:stroke-white [&_path]:fill-none [&_path]:stroke-white [&_circle]:fill-none [&_circle]:stroke-white [&_rect]:fill-none [&_rect]:stroke-white [&_line]:stroke-white [&_polyline]:stroke-white">
                        <ShoppingCart className="w-4 h-4" />
                      </div>
                      Comprar parcela
                    </button>

                    {/* Botón Descargar brochure */}
                    <button 
                      onClick={() => {
                        // Aquí iría la lógica de descarga del brochure
                        console.log('Descargando brochure...');
                      }}
                      className="w-full px-6 py-3 rounded-full transition-all hover:opacity-90 flex items-center justify-center gap-2"
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        backgroundColor: '#F5F5F0',
                        color: '#124854',
                        fontWeight: 'var(--font-weight-medium)',
                        fontSize: 'var(--font-size-body-base)',
                        border: '1px solid #E5E5E0'
                      }}
                    >
                      <div className="[&_svg]:stroke-[#124854] [&_path]:fill-none [&_path]:stroke-[#124854] [&_circle]:fill-none [&_circle]:stroke-[#124854] [&_rect]:fill-none [&_rect]:stroke-[#124854] [&_line]:stroke-[#124854] [&_polyline]:stroke-[#124854]">
                        <Download className="w-4 h-4" />
                      </div>
                      Descargar brochure
                    </button>

                    {/* CTA secundario */}
                    <button 
                      onClick={() => setIsConsultarOpen(true)}
                      className="w-full px-6 py-3 rounded-full transition-all hover:bg-gray-100 flex items-center justify-center gap-2"
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        backgroundColor: '#FFFFFF',
                        color: '#525252',
                        fontWeight: 'var(--font-weight-medium)',
                        fontSize: 'var(--font-size-body-base)',
                        border: '1px solid #E5E5E5'
                      }}
                    >
                      <div className="[&_svg]:stroke-[#525252] [&_path]:fill-none [&_path]:stroke-[#525252] [&_circle]:fill-none [&_circle]:stroke-[#525252] [&_rect]:fill-none [&_rect]:stroke-[#525252] [&_line]:stroke-[#525252] [&_polyline]:stroke-[#525252]">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      Consultar
                    </button>

                    {/* Card secundaria - Inmobiliaria */}
                    <div ref={publicadoPorRef} className="p-5 rounded-lg border" style={{ backgroundColor: '#FAFAFA', borderColor: '#E5E5E5' }}>
                    <h3 style={{ 
                      fontFamily: 'var(--font-body)',
                      color: '#A3A3A3',
                      fontSize: '11px',
                      fontWeight: 'var(--font-weight-semibold)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '1rem'
                    }}>
                      Publicado por
                    </h3>
                    
                    <div className="space-y-4">
                      {/* Avatar y nombre - Siempre visible */}
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-white rounded-full overflow-hidden flex-shrink-0" style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: '#E5E5E5' }}>
                          <ImageWithFallback 
                            src={parcela.inmobiliaria.logo} 
                            alt={parcela.inmobiliaria.nombre}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p style={{ 
                              fontFamily: 'var(--font-heading)',
                              fontWeight: 'var(--font-weight-semibold)',
                              color: '#0A0A0A',
                              fontSize: 'var(--font-size-body-base)',
                              marginBottom: '0.375rem',
                              lineHeight: '1.3'
                            }}>
                              {parcela.inmobiliaria.nombre}
                            </p>
                            <button
                              onClick={handleTogglePublicadoPor}
                              className="flex-shrink-0 transition-colors"
                              style={{ 
                                padding: '2px',
                                marginTop: '-2px'
                              }}
                              aria-label={isPublicadoPorExpanded ? 'Ocultar información' : 'Ver más información'}
                            >
                              {isPublicadoPorExpanded ? (
                                <div className="[&_svg]:stroke-[#737373] [&_path]:fill-none [&_path]:stroke-[#737373] [&_circle]:fill-none [&_circle]:stroke-[#737373] [&_rect]:fill-none [&_rect]:stroke-[#737373] [&_line]:stroke-[#737373] [&_polyline]:stroke-[#737373]">
                                  <ChevronUp className="w-4 h-4" style={{ color: '#737373' }} />
                                </div>
                              ) : (
                                <div className="[&_svg]:stroke-[#737373] [&_path]:fill-none [&_path]:stroke-[#737373] [&_circle]:fill-none [&_circle]:stroke-[#737373] [&_rect]:fill-none [&_rect]:stroke-[#737373] [&_line]:stroke-[#737373] [&_polyline]:stroke-[#737373]">
                                  <ChevronDown className="w-4 h-4" style={{ color: '#737373' }} />
                                </div>
                              )}
                            </button>
                          </div>
                          <span 
                            className="inline-block px-2 py-0.5 rounded"
                            style={{ 
                              backgroundColor: '#E5E5E5',
                              color: '#6B6B6B',
                              fontSize: '10px',
                              fontWeight: 'var(--font-weight-regular)',
                              letterSpacing: '0.01em'
                            }}
                          >
                            {parcela.inmobiliaria.tipoVendedor}
                          </span>
                        </div>
                      </div>

                      {/* Información expandible */}
                      {isPublicadoPorExpanded && (
                        <>
                          {/* Descripción compacta */}
                          {parcela.inmobiliaria.descripcion && (
                            <p 
                              className="line-clamp-2"
                              style={{ 
                                fontFamily: 'var(--font-body)',
                                color: '#737373',
                                fontSize: 'var(--font-size-body-sm)',
                                lineHeight: '1.5'
                              }}
                            >
                              {parcela.inmobiliaria.descripcion}
                            </p>
                          )}

                          {/* Información de contacto */}
                          <div className="space-y-2.5 pt-3" style={{ borderTop: '1px solid #CDD8DE' }}>
                            {/* WhatsApp */}
                            <div className="flex items-center gap-2">
                              <div className="[&_svg]:stroke-[#525252] [&_path]:fill-none [&_path]:stroke-[#525252] [&_circle]:fill-none [&_circle]:stroke-[#525252] [&_rect]:fill-none [&_rect]:stroke-[#525252] [&_line]:stroke-[#525252] [&_polyline]:stroke-[#525252]">
                                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: '#525252' }} />
                              </div>
                              <span style={{ 
                                fontFamily: 'var(--font-body)',
                                color: '#525252',
                                fontSize: 'var(--font-size-body-sm)',
                                fontWeight: 'var(--font-weight-regular)'
                              }}>
                                {parcela.inmobiliaria.telefono}
                              </span>
                            </div>

                            {/* Email */}
                            <div className="flex items-center gap-2">
                              <div className="[&_svg]:stroke-[#525252] [&_path]:fill-none [&_path]:stroke-[#525252] [&_circle]:fill-none [&_circle]:stroke-[#525252] [&_rect]:fill-none [&_rect]:stroke-[#525252] [&_line]:stroke-[#525252] [&_polyline]:stroke-[#525252]">
                                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: '#525252' }} />
                              </div>
                              <span 
                                className="truncate"
                                style={{ 
                                  fontFamily: 'var(--font-body)',
                                  color: '#525252',
                                  fontSize: 'var(--font-size-body-sm)',
                                  fontWeight: 'var(--font-weight-regular)'
                                }}
                              >
                                {parcela.inmobiliaria.email}
                              </span>
                            </div>
                          </div>

                          {/* Botón ver perfil */}
                          <button 
                            onClick={() => {
                              const tipoVendedor = parcela.inmobiliaria.tipoVendedor.toLowerCase();
                              if (tipoVendedor.includes('particular') || tipoVendedor.includes('natural')) {
                                onNavigate('vendedor-particular-profile', undefined, parcela.inmobiliaria.nombre);
                              } else {
                                onNavigate('inmobiliaria-profile', undefined, parcela.inmobiliaria.nombre);
                              }
                            }}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full transition-all hover:bg-gray-200"
                            style={{ 
                              fontFamily: 'var(--font-body)',
                              color: '#525252',
                              fontSize: 'var(--font-size-body-sm)',
                              fontWeight: 'var(--font-weight-medium)',
                              backgroundColor: 'transparent'
                            }}
                          >
                            <span>Ver perfil</span>
                            <div className="[&_svg]:stroke-[#525252] [&_path]:fill-none [&_path]:stroke-[#525252] [&_circle]:fill-none [&_circle]:stroke-[#525252] [&_rect]:fill-none [&_rect]:stroke-[#525252] [&_line]:stroke-[#525252] [&_polyline]:stroke-[#525252]">
                              <ExternalLink className="w-3.5 h-3.5" />
                            </div>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Parcelas similares */}
          <div className="mt-16 pt-12" style={{ borderTop: '1px solid #E5E5E5' }}>
            <h2 style={{ 
              fontFamily: 'var(--font-heading)',
              fontWeight: 'var(--font-weight-regular)',
              fontSize: 'var(--font-size-h2)',
              color: '#0A0A0A',
              marginBottom: '2rem'
            }}>
              Parcelas similares
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {parcelasSimilares.map((parcelaSimilar) => (
                <div 
                  key={parcelaSimilar.id}
                  onClick={() => onNavigate('parcela-detalle', parcelaSimilar.id)}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm hover:border-gray-400 hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden group"
                >
                  <div className="aspect-[4/3] bg-gray-200 overflow-hidden">
                    <ImageWithFallback 
                      src={parcelaSimilar.imagen} 
                      alt={parcelaSimilar.nombre}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 style={{ 
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 'var(--font-weight-semibold)',
                      fontSize: 'var(--font-size-body-lg)',
                      color: '#0A0A0A',
                      marginBottom: '0.25rem'
                    }}>
                      {parcelaSimilar.nombre}
                    </h3>
                    <p style={{ 
                      fontFamily: 'var(--font-body)',
                      color: '#737373',
                      fontSize: 'var(--font-size-body-sm)',
                      marginBottom: '0.75rem'
                    }}>
                      {parcelaSimilar.ubicacion}
                    </p>
                    <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid #E5E5E5' }}>
                      <p style={{ 
                        fontFamily: 'var(--font-body)',
                        color: '#525252',
                        fontSize: 'var(--font-size-body-sm)'
                      }}>
                        {parcelaSimilar.superficie}
                      </p>
                      <PrecioDisplay 
                        precioCLP={parcelaSimilar.precio}
                        precioSize="md"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Modal de contacto */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        parcelaNombre={parcela.nombre}
        parcelaUbicacion={parcela.ubicacion}
        vendedorNombre={parcela.inmobiliaria.nombre}
      />

      {/* Modal de reserva de visita */}
      <ReservaVisitaModal
        isOpen={isReservaVisitaOpen}
        onClose={() => setIsReservaVisitaOpen(false)}
        parcela={{
          titulo: parcela.nombre,
          ubicacion: parcela.ubicacion
        }}
        agente={{
          nombre: parcela.inmobiliaria.nombre,
          telefono: parcela.inmobiliaria.telefono,
          email: parcela.inmobiliaria.email,
          foto: parcela.inmobiliaria.logo
        }}
        tipoVendedor={parcela.inmobiliaria.tipoVendedor}
      />

      {/* Modal de consulta online */}
      <ConsultaOnlineModal
        isOpen={isConsultaOnlineOpen}
        onClose={() => setIsConsultaOnlineOpen(false)}
        parcela={{
          id: parcela.id,
          titulo: parcela.nombre,
          ubicacion: parcela.ubicacion
        }}
        agente={{
          nombre: parcela.inmobiliaria.nombre,
          telefono: parcela.inmobiliaria.telefono,
          calendlyUrl: undefined // Aquí puedes agregar la URL de Calendly del agente si está disponible
        }}
      />

      {/* Modal flotante de análisis con IA */}
      {isAnalisisDrawerOpen && (
        <>
          {/* Overlay oscuro semitransparente */}
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-8"
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(4px)',
              animation: 'fadeIn 0.2s ease-out'
            }}
            onClick={() => setIsAnalisisDrawerOpen(false)}
          >
            {/* Modal flotante centrado */}
            <div 
              className="bg-white rounded-2xl w-full relative flex flex-col"
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '760px',
                maxHeight: '85vh',
                boxShadow: '0 20px 60px -10px rgba(0, 0, 0, 0.3), 0 10px 30px -5px rgba(0, 0, 0, 0.2)',
                border: '1px solid transparent',
                backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.08) 50%, rgba(59, 130, 246, 0.06) 100%)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                animation: 'modalSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* Header */}
              <div 
                className="flex-shrink-0 p-6 rounded-t-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(250, 250, 255, 0.95) 100%)',
                  borderBottom: '1px solid rgba(226, 232, 240, 0.8)'
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h2 style={{ 
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 'var(--font-weight-medium)',
                      fontSize: 'var(--font-size-h3)',
                      color: '#0A0A0A',
                      marginBottom: '0.5rem'
                    }}>
                      Análisis de mercado
                    </h2>
                    <div 
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, rgba(249, 250, 251, 0.9) 0%, rgba(243, 244, 246, 0.95) 100%)',
                        border: '1px solid rgba(99, 102, 241, 0.15)'
                      }}
                    >
                      <div className="[&_svg]:stroke-[#6366F1] [&_path]:fill-none [&_path]:stroke-[#6366F1] [&_circle]:fill-none [&_circle]:stroke-[#6366F1] [&_rect]:fill-none [&_rect]:stroke-[#6366F1] [&_line]:stroke-[#6366F1] [&_polyline]:stroke-[#6366F1]">
                        <Sparkles className="w-3 h-3" style={{ color: '#6366F1' }} />
                      </div>
                      <span style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-xs)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#525252'
                      }}>
                        Análisis potenciado por IA
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsAnalisisDrawerOpen(false)}
                    className="w-8 h-8 rounded-full flex items-center justify-center border transition-all flex-shrink-0"
                    style={{ 
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E5E5E5'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#FAFAFA';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#FFFFFF';
                    }}
                  >
                    <div className="[&_svg]:stroke-[#525252] [&_path]:fill-none [&_path]:stroke-[#525252] [&_circle]:fill-none [&_circle]:stroke-[#525252] [&_rect]:fill-none [&_rect]:stroke-[#525252] [&_line]:stroke-[#525252] [&_polyline]:stroke-[#525252]">
                      <X className="w-4 h-4" style={{ color: '#525252' }} />
                    </div>
                  </button>
                </div>
              </div>

              {/* Content con scroll interno */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Score destacado */}
                <div 
                  className="p-6 rounded-xl text-center relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(250, 250, 255, 0.6) 0%, rgba(245, 245, 250, 0.8) 100%)',
                    border: '1px solid transparent',
                    backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.15) 100%)',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box'
                  }}
                >
                <div className="mb-2">
                  <span style={{ 
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 'var(--font-weight-semibold)',
                    fontSize: '3rem',
                    color: '#0A0A0A',
                    lineHeight: '1'
                  }}>
                    9
                  </span>
                  <span style={{ 
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 'var(--font-weight-regular)',
                    fontSize: 'var(--font-size-h3)',
                    color: '#737373'
                  }}>
                    /10
                  </span>
                </div>
                <p style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: '#0A0A0A'
                }}>
                  Excelente
                </p>
                <p style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-xs)',
                  color: '#737373',
                  marginTop: '0.25rem'
                }}>
                  Puntuación de inversión
                </p>
                {/* Última actualización */}
                <div className="flex items-center justify-center gap-1.5 mt-3">
                  <div className="[&_svg]:stroke-[#737373] [&_path]:fill-none [&_path]:stroke-[#737373] [&_circle]:fill-none [&_circle]:stroke-[#737373] [&_rect]:fill-none [&_rect]:stroke-[#737373] [&_line]:stroke-[#737373] [&_polyline]:stroke-[#737373]">
                    <Clock className="w-3 h-3" style={{ color: '#737373' }} />
                  </div>
                  <span style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    color: '#737373'
                  }}>
                    Análisis actualizado hace 2 días
                  </span>
                </div>
              </div>

                {/* Señales de mercado */}
                <div>
                  <h3 style={{ 
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 'var(--font-weight-medium)',
                    fontSize: 'var(--font-size-body-base)',
                    color: '#0A0A0A',
                    marginBottom: '1rem'
                  }}>
                    Señales de mercado
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Tendencia de precios */}
                    <div 
                      className="p-4 rounded-lg"
                      style={{
                        background: 'linear-gradient(135deg, rgba(249, 250, 251, 0.8) 0%, rgba(255, 255, 255, 0.9) 100%)',
                        border: '1px solid rgba(229, 229, 229, 0.6)'
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ 
                            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(22, 163, 74, 0.08) 100%)'
                          }}
                        >
                          <div className="[&_svg]:stroke-[#16A34A] [&_path]:fill-none [&_path]:stroke-[#16A34A] [&_circle]:fill-none [&_circle]:stroke-[#16A34A] [&_rect]:fill-none [&_rect]:stroke-[#16A34A] [&_line]:stroke-[#16A34A] [&_polyline]:stroke-[#16A34A]">
                            <TrendingUp className="w-4 h-4" style={{ color: '#16A34A' }} />
                          </div>
                        </div>
                        <span style={{ 
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: '#0A0A0A'
                        }}>
                          Tendencia de precio
                        </span>
                      </div>
                      <p style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-xs)',
                        color: '#737373',
                        lineHeight: 'var(--line-height-body)'
                      }}>
                        +8% últimos 6 meses
                      </p>
                    </div>

                    {/* Nivel de demanda */}
                    <div 
                      className="p-4 rounded-lg"
                      style={{
                        background: 'linear-gradient(135deg, rgba(249, 250, 251, 0.8) 0%, rgba(255, 255, 255, 0.9) 100%)',
                        border: '1px solid rgba(229, 229, 229, 0.6)'
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ 
                            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(79, 70, 229, 0.08) 100%)'
                          }}
                        >
                          <div className="[&_svg]:stroke-[#6366F1] [&_path]:fill-none [&_path]:stroke-[#6366F1] [&_circle]:fill-none [&_circle]:stroke-[#6366F1] [&_rect]:fill-none [&_rect]:stroke-[#6366F1] [&_line]:stroke-[#6366F1] [&_polyline]:stroke-[#6366F1]">
                            <Activity className="w-4 h-4" style={{ color: '#6366F1' }} />
                          </div>
                        </div>
                        <span style={{ 
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: '#0A0A0A'
                        }}>
                          Nivel de demanda
                        </span>
                      </div>
                      <p style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-xs)',
                        color: '#737373',
                        lineHeight: 'var(--line-height-body)'
                      }}>
                        Alto en esta zona
                      </p>
                    </div>

                    {/* Interés de usuarios */}
                    <div 
                      className="p-4 rounded-lg"
                      style={{
                        background: 'linear-gradient(135deg, rgba(249, 250, 251, 0.8) 0%, rgba(255, 255, 255, 0.9) 100%)',
                        border: '1px solid rgba(229, 229, 229, 0.6)'
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ 
                            background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.1) 0%, rgba(249, 115, 22, 0.08) 100%)'
                          }}
                        >
                          <div className="[&_svg]:stroke-[#F97316] [&_path]:fill-none [&_path]:stroke-[#F97316] [&_circle]:fill-none [&_circle]:stroke-[#F97316] [&_rect]:fill-none [&_rect]:stroke-[#F97316] [&_line]:stroke-[#F97316] [&_polyline]:stroke-[#F97316]">
                            <Users className="w-4 h-4" style={{ color: '#F97316' }} />
                          </div>
                        </div>
                        <span style={{ 
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: '#0A0A0A'
                        }}>
                          Interés de usuarios
                        </span>
                      </div>
                      <p style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-xs)',
                        color: '#737373',
                        lineHeight: 'var(--line-height-body)'
                      }}>
                        127 vistas en 7 días
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card principal con insight clave */}
                <div 
                  className="p-5 rounded-xl relative overflow-hidden"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid transparent',
                    backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(168, 85, 247, 0.08) 50%, rgba(59, 130, 246, 0.06) 100%)',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box'
                  }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ 
                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.08) 100%)'
                      }}
                    >
                      <div className="[&_svg]:stroke-[#6366F1] [&_path]:fill-none [&_path]:stroke-[#6366F1] [&_circle]:fill-none [&_circle]:stroke-[#6366F1] [&_rect]:fill-none [&_rect]:stroke-[#6366F1] [&_line]:stroke-[#6366F1] [&_polyline]:stroke-[#6366F1]">
                        <Sparkles className="w-5 h-5" style={{ color: '#6366F1' }} />
                      </div>
                    </div>
                  <div className="flex-1">
                    <h3 style={{ 
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 'var(--font-weight-medium)',
                      fontSize: 'var(--font-size-body-lg)',
                      color: '#0A0A0A',
                      marginBottom: '0.5rem'
                    }}>
                      Insight clave
                    </h3>
                    <p style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#525252',
                      lineHeight: 'var(--line-height-body)'
                    }}>
                      Esta parcela presenta una excelente relación calidad-precio en comparación con propiedades similares en la zona. La ubicación estratégica cerca del lago y el crecimiento sostenido del turismo regional la posicionan como una inversión prometedora.
                    </p>
                  </div>
                </div>
              </div>

              {/* Fortalezas */}
              <div>
                <h3 style={{ 
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontSize: 'var(--font-size-body-lg)',
                  color: '#0A0A0A',
                  marginBottom: '1rem'
                }}>
                  Fortalezas
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#DCFCE7' }}
                    >
                      <div className="[&_svg]:stroke-[#16A34A] [&_path]:fill-none [&_path]:stroke-[#16A34A] [&_circle]:fill-none [&_circle]:stroke-[#16A34A] [&_rect]:fill-none [&_rect]:stroke-[#16A34A] [&_line]:stroke-[#16A34A] [&_polyline]:stroke-[#16A34A]">
                        <ThumbsUp className="w-4 h-4" style={{ color: '#16A34A' }} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#0A0A0A',
                        marginBottom: '0.25rem'
                      }}>
                        Ubicación privilegiada
                      </p>
                      <p style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-xs)',
                        color: '#737373',
                        lineHeight: 'var(--line-height-body)'
                      }}>
                        Proximidad al lago y acceso pavimentado facilitan conectividad y aumentan el valor.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#DCFCE7' }}
                    >
                      <div className="[&_svg]:stroke-[#16A34A] [&_path]:fill-none [&_path]:stroke-[#16A34A] [&_circle]:fill-none [&_circle]:stroke-[#16A34A] [&_rect]:fill-none [&_rect]:stroke-[#16A34A] [&_line]:stroke-[#16A34A] [&_polyline]:stroke-[#16A34A]">
                        <ThumbsUp className="w-4 h-4" style={{ color: '#16A34A' }} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#0A0A0A',
                        marginBottom: '0.25rem'
                      }}>
                        Potencial turístico
                      </p>
                      <p style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-xs)',
                        color: '#737373',
                        lineHeight: 'var(--line-height-body)'
                      }}>
                        El aumento del turismo en la región genera oportunidades de valorización y renta.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#DCFCE7' }}
                    >
                      <div className="[&_svg]:stroke-[#16A34A] [&_path]:fill-none [&_path]:stroke-[#16A34A] [&_circle]:fill-none [&_circle]:stroke-[#16A34A] [&_rect]:fill-none [&_rect]:stroke-[#16A34A] [&_line]:stroke-[#16A34A] [&_polyline]:stroke-[#16A34A]">
                        <ThumbsUp className="w-4 h-4" style={{ color: '#16A34A' }} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#0A0A0A',
                        marginBottom: '0.25rem'
                      }}>
                        Servicios disponibles
                      </p>
                      <p style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-xs)',
                        color: '#737373',
                        lineHeight: 'var(--line-height-body)'
                      }}>
                        Electricidad y agua aseguran habitabilidad inmediata y reducen costos iniciales.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#DCFCE7' }}
                    >
                      <div className="[&_svg]:stroke-[#16A34A] [&_path]:fill-none [&_path]:stroke-[#16A34A] [&_circle]:fill-none [&_circle]:stroke-[#16A34A] [&_rect]:fill-none [&_rect]:stroke-[#16A34A] [&_line]:stroke-[#16A34A] [&_polyline]:stroke-[#16A34A]">
                        <ThumbsUp className="w-4 h-4" style={{ color: '#16A34A' }} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#0A0A0A',
                        marginBottom: '0.25rem'
                      }}>
                        Documentación en orden
                      </p>
                      <p style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-xs)',
                        color: '#737373',
                        lineHeight: 'var(--line-height-body)'
                      }}>
                        Títulos saneados y permisos vigentes minimizan riesgos legales.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

                {/* Aspectos a considerar */}
                <div 
                  className="p-5 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(250, 250, 250, 0.8) 0%, rgba(245, 245, 250, 0.6) 100%)',
                    border: '1px solid rgba(229, 229, 229, 0.6)'
                  }}
                >
                <div className="flex items-start gap-3 mb-4">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#FFFFFF' }}
                  >
                    <div className="[&_svg]:stroke-[#737373] [&_path]:fill-none [&_path]:stroke-[#737373] [&_circle]:fill-none [&_circle]:stroke-[#737373] [&_rect]:fill-none [&_rect]:stroke-[#737373] [&_line]:stroke-[#737373] [&_polyline]:stroke-[#737373]">
                      <AlertCircle className="w-4 h-4" style={{ color: '#737373' }} />
                    </div>
                  </div>
                  <h3 style={{ 
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 'var(--font-weight-medium)',
                    fontSize: 'var(--font-size-body-base)',
                    color: '#525252'
                  }}>
                    Aspectos a considerar
                  </h3>
                </div>
                <div className="space-y-3 ml-11">
                  <div>
                    <p style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#525252',
                      marginBottom: '0.25rem'
                    }}>
                      Clima patagónico
                    </p>
                    <p style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-xs)',
                      color: '#737373',
                      lineHeight: 'var(--line-height-body)'
                    }}>
                      Considera las condiciones climáticas para planificar construcciones y actividades.
                    </p>
                  </div>

                  <div>
                    <p style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#525252',
                      marginBottom: '0.25rem'
                    }}>
                      Distancia a centros urbanos
                    </p>
                    <p style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-xs)',
                      color: '#737373',
                      lineHeight: 'var(--line-height-body)'
                    }}>
                      Evalúa los tiempos de traslado según tu proyecto y necesidades.
                    </p>
                  </div>
                </div>
              </div>

                {/* Nota final */}
                <div 
                  className="p-4 rounded-lg"
                  style={{
                    background: 'linear-gradient(135deg, rgba(245, 245, 250, 0.5) 0%, rgba(250, 250, 255, 0.4) 100%)',
                    border: '1px solid rgba(229, 229, 229, 0.5)'
                  }}
                >
                <p style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-xs)',
                  color: '#737373',
                  lineHeight: 'var(--line-height-body)'
                }}>
                  <strong style={{ color: '#525252' }}>Nota:</strong> Este análisis es de carácter referencial y se basa en datos públicos y tendencias del mercado. Te recomendamos realizar tu propia evaluación y consultar con profesionales antes de tomar decisiones de inversión.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Modal de comprar parcela (selector de tipo) */}
      <ComprarParcelaModal
        isOpen={isComprarParcelaOpen}
        onClose={() => setIsComprarParcelaOpen(false)}
        onComprarAhora={() => {
          setIsComprarParcelaOpen(false);
          setTipoCompra('comprar');
          setIsFlujoCompraOpen(true);
        }}
        onReservar={() => {
          setIsComprarParcelaOpen(false);
          setTipoCompra('reservar');
          setIsFlujoCompraOpen(true);
        }}
        parcelaNombre={parcela.nombre}
      />

      {/* Modal de flujo de compra */}
      <FlujoCompraModal
        isOpen={isFlujoCompraOpen}
        onClose={() => setIsFlujoCompraOpen(false)}
        parcelaNombre={parcelaSeleccionadaStock || parcela.nombre}
        precio={parcela.precio}
        tipoCompra={tipoCompra}
      />

      {/* Modal de confirmación de compra */}
      {isConfirmCompraModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setIsConfirmCompraModalOpen(false)}
        >
          <div 
            className="bg-white rounded-xl p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
          >
            <h3 
              className="mb-6 text-center"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--font-size-xl)',
                fontWeight: 'var(--font-weight-semibold)',
                color: '#0A0A0A'
              }}
            >
              ¿Quieres comprar esta parcela?
            </h3>
            <div className="flex gap-3">
              <button
                onClick={() => setIsConfirmCompraModalOpen(false)}
                className="flex-1 px-6 py-3 rounded-lg border transition-all"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#D4D4D4',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FAFAFA';
                  e.currentTarget.style.borderColor = '#A3A3A3';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.borderColor = '#D4D4D4';
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmCompra}
                className="flex-1 px-6 py-3 rounded-lg transition-all"
                style={{
                  backgroundColor: '#124854',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#FFFFFF',
                  border: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#0F3A43';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#124854';
                }}
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de compra desde stock (selector inicial) */}
      <ComprarParcelaModal
        isOpen={isStockComprarModalOpen}
        onClose={() => setIsStockComprarModalOpen(false)}
        onComprarAhora={handleStockComprarAhora}
        onReservar={handleStockReservar}
        parcelaNombre={parcelaSeleccionadaStock}
      />

      {/* Modal de consultar (selector de canal) */}
      <ConsultarModal
        isOpen={isConsultarOpen}
        onClose={() => setIsConsultarOpen(false)}
        onReservarVisita={() => {
          setIsConsultarOpen(false);
          setIsReservaVisitaOpen(true);
        }}
        onWhatsApp={() => {
          setIsConsultarOpen(false);
          window.open(`https://wa.me/${parcela.inmobiliaria.telefono.replace(/\D/g, '')}`, '_blank');
        }}
        onVideollamada={() => {
          setIsConsultarOpen(false);
          setIsConsultaOnlineOpen(true);
        }}
        parcelaNombre={parcela.nombre}
      />

      {/* Asistente Virtual - Contextual para detalle de parcela */}
      <VambeChat context="parcela-detalle" />

      {/* ── LIGHTBOX ── */}
      {lightboxOpen && parcela.imagenes && parcela.imagenes.length > 0 && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col"
          style={{ backgroundColor: 'rgba(0,0,0,0.95)' }}
          onClick={closeLightbox}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 flex-shrink-0"
            style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)' }}
            onClick={e => e.stopPropagation()}
          >
            <p style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)', fontSize: '14px' }}>
              {parcela.nombre}
            </p>
            <div className="flex items-center gap-3">
              <span style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', fontSize: '13px' }}>
                {lightboxIndex + 1} / {parcela.imagenes.length}
              </span>
              <button
                onClick={closeLightbox}
                aria-label="Cerrar"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
              >
                <X className="w-5 h-5" style={{ color: '#fff' }} />
              </button>
            </div>
          </div>

          {/* Imagen central */}
          <div
            className="flex-1 flex items-center justify-center relative px-14 min-h-0"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={parcela.imagenes[lightboxIndex]}
              alt={`${parcela.nombre} — imagen ${lightboxIndex + 1}`}
              className="max-w-full max-h-full object-contain select-none"
              style={{ borderRadius: '4px' }}
              draggable={false}
            />

            {/* Prev */}
            {parcela.imagenes.length > 1 && (
              <>
                <button
                  onClick={() => lightboxPrev()}
                  aria-label="Imagen anterior"
                  className="absolute left-3 w-11 h-11 rounded-full flex items-center justify-center transition-colors"
                  style={{ backgroundColor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)' }}
                >
                  <ChevronLeft className="w-6 h-6" style={{ color: '#fff' }} />
                </button>

                {/* Next */}
                <button
                  onClick={() => lightboxNext()}
                  aria-label="Imagen siguiente"
                  className="absolute right-3 w-11 h-11 rounded-full flex items-center justify-center transition-colors"
                  style={{ backgroundColor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)' }}
                >
                  <ChevronRight className="w-6 h-6" style={{ color: '#fff' }} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {parcela.imagenes.length > 1 && (
            <div
              className="flex-shrink-0 flex justify-center gap-2 px-4 pb-5 pt-3 overflow-x-auto"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}
              onClick={e => e.stopPropagation()}
            >
              {parcela.imagenes.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`Ver imagen ${i + 1}`}
                  className="flex-shrink-0 w-14 h-14 rounded-md overflow-hidden transition-all"
                  style={{
                    border: i === lightboxIndex
                      ? '2px solid #fff'
                      : '2px solid rgba(255,255,255,0.2)',
                    opacity: i === lightboxIndex ? 1 : 0.5
                  }}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" draggable={false} />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}