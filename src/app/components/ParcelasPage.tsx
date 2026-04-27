import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Expand, FileCheck, Pickaxe, DoorOpen, PenLine, X, Home, ChevronLeft, ChevronRight, Sparkles, Trees, Waves, TrendingUp, Car, Zap, MapPin, SlidersHorizontal, Calculator, Menu, List, Map as MapIcon } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { PublicadoPorCompact } from '@/app/components/PublicadoPorCompact';
import { VendedorCaptacionSection } from '@/app/components/VendedorCaptacionSection';
import { ParcelaCardImage } from '@/app/components/ParcelaCardImage';
import { VambeChat } from '@/app/components/VambeChat';
import { PrecioDisplay } from '@/app/components/PrecioDisplay';
import { ParcelasMapView } from '@/app/components/ParcelasMapView';
import { getAllParcelas } from '@/app/data/parcelasData';
import { getAllProyectos } from '@/app/data/proyectosData';
import logo from 'figma:asset/a4719ce43ce52ee49df30a2a5c090c8a8b743667.png';
import heroBackground from 'figma:asset/46be9646c60608d21a829a86b189efb4cfc6cbbc.png';

type ParcelaEstado = 'disponible' | 'reservandose' | 'pago-en-validacion' | 'reservada';

interface ParcelasPageProps {
  onNavigate: (screen: string, parcelaId?: number, data?: string) => void;
  parcelaEstados?: Record<number, ParcelaEstado>;
  initialFilters?: {
    ubicacion: string;
    superficie: string;
    condicion: string;
    precio: string;
    tipo: string;
  } | null;
}

export function ParcelasPage({ onNavigate, initialFilters, parcelaEstados }: ParcelasPageProps) {
  const [showMap, setShowMap] = useState(false);
  const [sortBy, setSortBy] = useState('relevancia');
  const proyectosCarouselRef = useRef<HTMLDivElement>(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isMobileCalculatorOpen, setIsMobileCalculatorOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSmartSearchBottomSheetOpen, setIsSmartSearchBottomSheetOpen] = useState(false);
  
  // Estado de carga para skeleton
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  // Estados para selector de vista (lista/mapa)
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedParcelaOnMap, setSelectedParcelaOnMap] = useState<number | null>(null);
  
  // Estados para filtros del buscador hero
  const [heroFilters, setHeroFilters] = useState({
    ubicacion: '',
    tipo: '',
    superficieMin: '',
    superficieMax: '',
    condicion: '',
    precioMin: '',
    precioMax: ''
  });
  
  // Estado para controlar si se aplicaron filtros
  const [filtersApplied, setFiltersApplied] = useState(false);
  
  // Estados para calculadora de presupuesto
  const [showBudgetCalculator, setShowBudgetCalculator] = useState(false);
  const [budget, setBudget] = useState('');
  const [calcZone, setCalcZone] = useState('');
  const [calcParcelType, setCalcParcelType] = useState('');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  // Estado para filtros activos (chips)
  const [activeFilters, setActiveFilters] = useState<{
    ubicacion?: string;
    precioMin?: string;
    precioMax?: string;
    superficieMin?: string;
    superficieMax?: string;
    condicion?: string;
    smartSearchText?: string;
    smartBadges: string[];
    tipos: string[];
    destacadas: boolean;
    nuevas: boolean;
  }>({
    tipos: [],
    smartBadges: [],
    destacadas: false,
    nuevas: false
  });

  // Estados para búsqueda inteligente
  const [isSmartSearchExpanded, setIsSmartSearchExpanded] = useState(false);
  const [smartSearchValue, setSmartSearchValue] = useState('');
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const [includeProjects, setIncludeProjects] = useState(false);

  // Estados para scroll infinito
  const [displayedParcelas, setDisplayedParcelas] = useState<any[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);
  const PARCELAS_PER_PAGE = 6;

  // Aplicar filtros iniciales cuando se reciben del Home
  useEffect(() => {
    if (initialFilters) {
      const newActiveFilters: typeof activeFilters = {
        tipos: [],
        smartBadges: [],
        destacadas: false,
        nuevas: false
      };

      // Mapeo de valores de filtros del Home
      const dropdownOptions = {
        ubicacion: [
          { value: '', label: 'Todos' },
          { value: 'metropolitana', label: 'Región Metropolitana' },
          { value: 'valparaiso', label: 'Valparaíso' },
          { value: 'biobio', label: 'Biobío' },
          { value: 'araucania', label: 'La Araucanía' },
          { value: 'los-lagos', label: 'Los Lagos' },
          { value: 'los-rios', label: 'Los Ríos' },
          { value: 'maule', label: 'Maule' },
          { value: 'ohiggins', label: "O'Higgins" },
          { value: 'coquimbo', label: 'Coquimbo' },
          { value: 'atacama', label: 'Atacama' },
          { value: 'antofagasta', label: 'Antofagasta' },
          { value: 'tarapaca', label: 'Tarapacá' },
          { value: 'arica', label: 'Arica y Parinacota' },
          { value: 'aysen', label: 'Aysén' },
          { value: 'magallanes', label: 'Magallanes' }
        ],
        superficie: [
          { value: '', label: 'Todos' },
          { value: '0-5000', label: 'Hasta 5.000 m²' },
          { value: '5000-10000', label: '5.000 - 10.000 m²' },
          { value: '10000-50000', label: '1 - 5 hectáreas' },
          { value: '50000-100000', label: '5 - 10 hectáreas' },
          { value: '100000-500000', label: '10 - 50 hectáreas' },
          { value: '500000+', label: 'Más de 50 hectáreas' }
        ],
        precio: [
          { value: '', label: 'Todos' },
          { value: '0-10000000', label: 'Hasta $10.000.000' },
          { value: '10000000-30000000', label: '$10M - $30M' },
          { value: '30000000-50000000', label: '$30M - $50M' },
          { value: '50000000-100000000', label: '$50M - $100M' },
          { value: '100000000-200000000', label: '$100M - $200M' },
          { value: '200000+', label: 'Más de $200M' }
        ]
      };

      // Aplicar filtro de ubicación
      if (initialFilters.ubicacion) {
        const ubicacionOption = dropdownOptions.ubicacion.find(opt => opt.value === initialFilters.ubicacion);
        if (ubicacionOption && ubicacionOption.value !== '') {
          newActiveFilters.ubicacion = ubicacionOption.label;
        }
      }

      // Aplicar filtro de superficie
      if (initialFilters.superficie) {
        const superficieOption = dropdownOptions.superficie.find(opt => opt.value === initialFilters.superficie);
        if (superficieOption && superficieOption.value !== '') {
          newActiveFilters.superficieMax = superficieOption.label;
        }
      }

      // Aplicar filtro de precio
      if (initialFilters.precio) {
        const precioOption = dropdownOptions.precio.find(opt => opt.value === initialFilters.precio);
        if (precioOption && precioOption.value !== '') {
          newActiveFilters.precioMax = precioOption.label;
        }
      }

      // Actualizar heroFilters también para la lógica de filtrado
      setHeroFilters({
        ubicacion: initialFilters.ubicacion || '',
        tipo: initialFilters.tipo || '',
        superficieMin: initialFilters.superficie || '',
        superficieMax: '',
        condicion: initialFilters.condicion || '',
        precioMin: initialFilters.precio || '',
        precioMax: ''
      });

      setActiveFilters(newActiveFilters);
      setFiltersApplied(true);
    }
  }, [initialFilters]);

  // Simular carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2500); // 2.5 segundos de carga
    
    return () => clearTimeout(timer);
  }, []);

  // Cerrar dropdown cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  // Función para eliminar un filtro
  const proyectos = getAllProyectos();

  const removeFilter = (filterType: string, value?: string) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      
      switch(filterType) {
        case 'ubicacion':
          delete newFilters.ubicacion;
          setHeroFilters(prev => ({ ...prev, ubicacion: '' }));
          break;
        case 'precioMin':
          delete newFilters.precioMin;
          setHeroFilters(prev => ({ ...prev, precioMin: '' }));
          break;
        case 'precioMax':
          delete newFilters.precioMax;
          setHeroFilters(prev => ({ ...prev, precioMin: '' }));
          break;
        case 'superficieMin':
          delete newFilters.superficieMin;
          setHeroFilters(prev => ({ ...prev, superficieMin: '' }));
          break;
        case 'superficieMax':
          delete newFilters.superficieMax;
          setHeroFilters(prev => ({ ...prev, superficieMin: '' }));
          break;
        case 'condicion':
          delete newFilters.condicion;
          setHeroFilters(prev => ({ ...prev, condicion: '' }));
          break;
        case 'smartSearchText':
          delete newFilters.smartSearchText;
          setSmartSearchValue('');
          break;
        case 'smartBadge':
          newFilters.smartBadges = newFilters.smartBadges.filter(b => b !== value);
          setSelectedBadges(prev => prev.filter(b => b !== value));
          break;
        case 'tipo':
          newFilters.tipos = newFilters.tipos.filter(t => t !== value);
          break;
        case 'destacadas':
          newFilters.destacadas = false;
          break;
        case 'nuevas':
          newFilters.nuevas = false;
          break;
      }
      
      return newFilters;
    });
  };

  // Función para manejar el cálculo de presupuesto
  const handleCalculate = () => {
    const newActiveFilters: typeof activeFilters = {
      tipos: [],
      smartBadges: [],
      destacadas: false,
      nuevas: false
    };
    
    // Aplicar filtro de presupuesto (precio máximo)
    if (budget) {
      const budgetNum = parseFloat(budget.replace(/\./g, '').replace(/,/g, '.'));
      newActiveFilters.precioMax = `$${budgetNum.toLocaleString('es-CL')}`;
    }
    
    // Aplicar filtro de zona
    if (calcZone) {
      newActiveFilters.ubicacion = calcZone;
    }
    
    // Aplicar filtro de tipo de parcela
    if (calcParcelType) {
      newActiveFilters.tipos = [calcParcelType];
    }
    
    setActiveFilters(newActiveFilters);
    setFiltersApplied(true);
    
    // Scroll suave a la sección de resultados
    setTimeout(() => {
      const resultsSection = document.getElementById('results-section');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Función para obtener labels de filtros activos
  const getActiveFilterLabels = () => {
    const labels: { type: string; label: string; value?: string }[] = [];
    
    if (activeFilters.ubicacion) {
      labels.push({ type: 'ubicacion', label: activeFilters.ubicacion });
    }
    if (activeFilters.precioMin) {
      labels.push({ type: 'precioMin', label: `Desde ${activeFilters.precioMin}` });
    }
    if (activeFilters.precioMax) {
      labels.push({ type: 'precioMax', label: activeFilters.precioMax });
    }
    if (activeFilters.superficieMin) {
      labels.push({ type: 'superficieMin', label: `Desde ${activeFilters.superficieMin} m²` });
    }
    if (activeFilters.superficieMax) {
      labels.push({ type: 'superficieMax', label: activeFilters.superficieMax });
    }
    if (activeFilters.condicion) {
      labels.push({ type: 'condicion', label: activeFilters.condicion });
    }
    if (activeFilters.smartSearchText) {
      labels.push({ type: 'smartSearchText', label: `"${activeFilters.smartSearchText}"` });
    }
    // Mapeo de badges a labels legibles
    const badgeLabels: Record<string, string> = {
      'naturaleza': 'Rodeado de naturaleza',
      'lago-rio': 'Cerca de lago o río',
      'inversion': 'Ideal para inversión',
      'acceso': 'Buen acceso',
      'servicios': 'Con servicios disponibles'
    };
    activeFilters.smartBadges.forEach(badge => {
      labels.push({ type: 'smartBadge', label: badgeLabels[badge] || badge, value: badge });
    });
    activeFilters.tipos.forEach(tipo => {
      labels.push({ type: 'tipo', label: tipo, value: tipo });
    });
    if (activeFilters.destacadas) {
      labels.push({ type: 'destacadas', label: 'Destacadas' });
    }
    if (activeFilters.nuevas) {
      labels.push({ type: 'nuevas', label: 'Nuevas' });
    }
    
    return labels;
  };

  // Obtener datos dinámicos de parcelas y convertir al formato necesario
  const parcelasData = getAllParcelas().map((parcela, index) => ({
    ...parcela,
    imagen: parcela.imagenes[0],
    caracteristicas: parcela.destacados,
    inmobiliaria: parcela.inmobiliaria.nombre,
    tipoVendedor: parcela.inmobiliaria.tipoVendedor,
    brokerImagen: parcela.inmobiliaria.logo,
    fechaPublicacion: new Date(2024, 0, 15 + (index * 3)) // Generar fechas dinámicas
  }));

  // Función para ordenar parcelas
  const getSortedParcelas = () => {
    let filtered = [...parcelasData];
    
    // Aplicar filtros del buscador hero si se presionó el botón buscar
    if (filtersApplied) {
      // Filtro de ubicación
      if (heroFilters.ubicacion) {
        // Mapeo de valores de filtro a nombres de ubicación
        const ubicacionMap: Record<string, string[]> = {
          'metropolitana': ['metropolitana', 'santiago'],
          'valparaiso': ['valparaíso', 'valparaiso'],
          'biobio': ['biobío', 'biobio'],
          'araucania': ['araucanía', 'araucania'],
          'los-lagos': ['los lagos', 'llanquihue', 'osorno'],
          'los-rios': ['los ríos', 'los rios', 'valdivia'],
          'maule': ['maule', 'talca'],
          'ohiggins': ["o'higgins", 'ohiggins', 'rancagua'],
          'coquimbo': ['coquimbo', 'la serena'],
          'atacama': ['atacama', 'copiapó'],
          'antofagasta': ['antofagasta'],
          'tarapaca': ['tarapacá', 'tarapaca', 'iquique'],
          'arica': ['arica', 'parinacota'],
          'aysen': ['aysén', 'aysen', 'chile chico', 'cochrane'],
          'magallanes': ['magallanes', 'punta arenas']
        };
        
        const searchTerms = ubicacionMap[heroFilters.ubicacion];
        if (searchTerms) {
          filtered = filtered.filter(p => 
            searchTerms.some(term => 
              p.ubicacion.toLowerCase().includes(term) || 
              p.ubicacionCompleta.toLowerCase().includes(term)
            )
          );
        }
      }
      
      // Filtro de superficie
      if (heroFilters.superficieMin) {
        const ranges: Record<string, [number, number]> = {
          '0-5000': [0, 5000],
          '5000-10000': [5000, 10000],
          '10000-50000': [10000, 50000],
          '50000-100000': [50000, 100000],
          '100000-500000': [100000, 500000],
          '500000+': [500000, Infinity]
        };
        
        const range = ranges[heroFilters.superficieMin];
        if (range) {
          filtered = filtered.filter(p => p.superficieNumero >= range[0] && p.superficieNumero <= range[1]);
        }
      }
      
      // Filtro de precio
      if (heroFilters.precioMin) {
        const ranges: Record<string, [number, number]> = {
          '0-10000000': [0, 10000000],
          '10000000-30000000': [10000000, 30000000],
          '30000000-50000000': [30000000, 50000000],
          '50000000-100000000': [50000000, 100000000],
          '100000000-200000000': [100000000, 200000000],
          '200000000+': [200000000, Infinity]
        };
        
        const range = ranges[heroFilters.precioMin];
        if (range) {
          filtered = filtered.filter(p => p.precioNumero >= range[0] && p.precioNumero <= range[1]);
        }
      }
    }
    
    // Aplicar filtros de búsqueda inteligente
    if (activeFilters.smartSearchText) {
      const searchText = activeFilters.smartSearchText.toLowerCase();
      filtered = filtered.filter(p => 
        p.titulo?.toLowerCase().includes(searchText) ||
        p.nombre?.toLowerCase().includes(searchText) ||
        p.ubicacion.toLowerCase().includes(searchText) ||
        p.ubicacionCompleta.toLowerCase().includes(searchText) ||
        p.descripcion.toLowerCase().includes(searchText) ||
        p.caracteristicas.some((c: any) => 
          (typeof c === 'string' ? c : c.text)?.toLowerCase().includes(searchText)
        )
      );
    }
    
    if (activeFilters.smartBadges.length > 0) {
      filtered = filtered.filter(p => {
        return activeFilters.smartBadges.every(badge => {
          // Función helper para buscar en características (puede ser string o {icon, text})
          const searchInCaracteristicas = (keywords: string[]) => {
            return p.caracteristicas.some((c: any) => {
              const text = (typeof c === 'string' ? c : c.text)?.toLowerCase() || '';
              return keywords.some(keyword => text.includes(keyword));
            });
          };
          
          const descripcion = p.descripcion.toLowerCase();
          
          switch(badge) {
            case 'naturaleza':
              // Buscar parcelas con características relacionadas a naturaleza
              return searchInCaracteristicas(['naturaleza', 'bosque', 'árboles', 'verde', 'nativo']) ||
                     descripcion.includes('naturaleza') ||
                     descripcion.includes('bosque') ||
                     descripcion.includes('verde') ||
                     descripcion.includes('nativo');
            case 'lago-rio':
              // Buscar parcelas cerca de agua
              return searchInCaracteristicas(['lago', 'río', 'agua', 'vista']) ||
                     descripcion.includes('lago') ||
                     descripcion.includes('río') ||
                     descripcion.includes('agua') ||
                     p.nombre?.toLowerCase().includes('lago') ||
                     p.ubicacion.toLowerCase().includes('lago');
            case 'inversion':
              // Buscar parcelas ideales para inversión
              return searchInCaracteristicas(['inversión', 'rentabilidad', 'plusvalía', 'turístico', 'proyecto']) ||
                     descripcion.includes('inversión') ||
                     descripcion.includes('invertir') ||
                     descripcion.includes('rentabilidad') ||
                     descripcion.includes('plusvalía') ||
                     descripcion.includes('potencial') ||
                     descripcion.includes('valorización');
            case 'acceso':
              // Buscar parcelas con buen acceso
              return searchInCaracteristicas(['acceso', 'camino', 'carretera', 'pavimentado', 'portón']) ||
                     descripcion.includes('acceso') ||
                     descripcion.includes('camino') ||
                     descripcion.includes('pavimentado') ||
                     descripcion.includes('carretera');
            case 'servicios':
              // Buscar parcelas con servicios
              return searchInCaracteristicas(['agua', 'luz', 'electricidad', 'servicios', 'factibilidad']) ||
                     descripcion.includes('servicios') ||
                     descripcion.includes('agua') ||
                     descripcion.includes('luz') ||
                     descripcion.includes('electricidad') ||
                     descripcion.includes('factibilidad');
            default:
              return true;
          }
        });
      });
    }
    
    // Aplicar ordenamiento
    switch(sortBy) {
      case 'precio-asc':
        return filtered.sort((a, b) => a.precioNumero - b.precioNumero);
      case 'precio-desc':
        return filtered.sort((a, b) => b.precioNumero - a.precioNumero);
      case 'superficie-asc':
        return filtered.sort((a, b) => a.superficieNumero - b.superficieNumero);
      case 'superficie-desc':
        return filtered.sort((a, b) => b.superficieNumero - a.superficieNumero);
      case 'recientes':
        return filtered.sort((a, b) => b.fechaPublicacion.getTime() - a.fechaPublicacion.getTime());
      case 'relevancia':
      default:
        return filtered;
    }
  };
  
  // Handler para el botón Buscar
  const handleSearch = () => {
    setFiltersApplied(true);
    
    // Actualizar activeFilters con los filtros del hero para mostrar chips
    const newActiveFilters: typeof activeFilters = {
      tipos: [],
      smartBadges: [],
      destacadas: false,
      nuevas: false
    };
    
    // Mapeo de opciones para obtener labels legibles
    const dropdownOptions = {
      ubicacion: [
        { value: '', label: 'Todos' },
        { value: 'metropolitana', label: 'Región Metropolitana' },
        { value: 'valparaiso', label: 'Valparaíso' },
        { value: 'biobio', label: 'Biobío' },
        { value: 'araucania', label: 'La Araucanía' },
        { value: 'los-lagos', label: 'Los Lagos' },
        { value: 'los-rios', label: 'Los Ríos' },
        { value: 'maule', label: 'Maule' },
        { value: 'ohiggins', label: "O'Higgins" },
        { value: 'coquimbo', label: 'Coquimbo' },
        { value: 'atacama', label: 'Atacama' },
        { value: 'antofagasta', label: 'Antofagasta' },
        { value: 'tarapaca', label: 'Tarapacá' },
        { value: 'arica', label: 'Arica y Parinacota' },
        { value: 'aysen', label: 'Aysén' },
        { value: 'magallanes', label: 'Magallanes' }
      ],
      superficie: [
        { value: '', label: 'Todos' },
        { value: '0-5000', label: 'Hasta 5.000 m²' },
        { value: '5000-10000', label: '5.000 - 10.000 m²' },
        { value: '10000-50000', label: '1 - 5 hectáreas' },
        { value: '50000-100000', label: '5 - 10 hectáreas' },
        { value: '100000-500000', label: '10 - 50 hectáreas' },
        { value: '500000+', label: 'Más de 50 hectáreas' }
      ],
      precio: [
        { value: '', label: 'Todos' },
        { value: '0-10000000', label: 'Hasta $10.000.000' },
        { value: '10000000-30000000', label: '$10M - $30M' },
        { value: '30000000-50000000', label: '$30M - $50M' },
        { value: '50000000-100000000', label: '$50M - $100M' },
        { value: '100000000-200000000', label: '$100M - $200M' },
        { value: '200000+', label: 'Más de $200M' }
      ],
      condicion: [
        { value: '', label: 'Todos' },
        { value: 'primer-dueno', label: 'Primer dueño' },
        { value: 'segundo-dueno', label: 'Segundo dueño' },
        { value: 'tercer-dueno', label: 'Tercer dueño' },
        { value: 'cuarto-dueno', label: 'Cuarto dueño o más' }
      ]
    };
    
    // Aplicar filtro de ubicación
    if (heroFilters.ubicacion) {
      const ubicacionOption = dropdownOptions.ubicacion.find(opt => opt.value === heroFilters.ubicacion);
      if (ubicacionOption && ubicacionOption.value !== '') {
        newActiveFilters.ubicacion = ubicacionOption.label;
      }
    }
    
    // Aplicar filtro de superficie
    if (heroFilters.superficieMin) {
      const superficieOption = dropdownOptions.superficie.find(opt => opt.value === heroFilters.superficieMin);
      if (superficieOption && superficieOption.value !== '') {
        newActiveFilters.superficieMax = superficieOption.label;
      }
    }
    
    // Aplicar filtro de precio
    if (heroFilters.precioMin) {
      const precioOption = dropdownOptions.precio.find(opt => opt.value === heroFilters.precioMin);
      if (precioOption && precioOption.value !== '') {
        newActiveFilters.precioMax = precioOption.label;
      }
    }
    
    // Aplicar filtro de condición
    if (heroFilters.condicion) {
      const condicionOption = dropdownOptions.condicion.find(opt => opt.value === heroFilters.condicion);
      if (condicionOption && condicionOption.value !== '') {
        newActiveFilters.condicion = condicionOption.label;
      }
    }
    
    setActiveFilters(newActiveFilters);
    
    // Scroll suave al área de resultados
    const resultsSection = document.getElementById('results-section');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handler para búsqueda inteligente
  const handleSmartSearch = () => {
    setFiltersApplied(true);
    
    // Actualizar activeFilters PRESERVANDO los filtros existentes y agregando búsqueda inteligente
    setActiveFilters(prev => {
      const updatedFilters = { ...prev };
      
      // Si hay texto de búsqueda, agregarlo
      if (smartSearchValue.trim()) {
        updatedFilters.smartSearchText = smartSearchValue.trim();
      } else {
        delete updatedFilters.smartSearchText;
      }
      
      // Agregar badges seleccionados
      if (selectedBadges.length > 0) {
        updatedFilters.smartBadges = [...selectedBadges];
      } else {
        updatedFilters.smartBadges = [];
      }
      
      return updatedFilters;
    });
    
    // Cerrar el panel de búsqueda inteligente
    setIsSmartSearchExpanded(false);
    
    // Scroll suave al área de resultados
    const resultsSection = document.getElementById('results-section');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Función para toggle de badges de búsqueda inteligente
  const toggleBadge = (badgeId: string) => {
    setSelectedBadges(prev => {
      if (prev.includes(badgeId)) {
        return prev.filter(id => id !== badgeId);
      } else {
        return [...prev, badgeId];
      }
    });
  };
  
  // Función para formatear moneda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Función para calcular cuota mensual
  const calculateMonthlyPayment = () => {
    if (!budget) return 0;
    const budgetValue = parseFloat(budget);
    const monthlyRate = 0.05 / 12; // 5% annual rate
    const months = 240; // 20 years
    const payment = budgetValue * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return payment;
  };
  
  const parcelas = getSortedParcelas();

  // Inicializar parcelas mostradas cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(0);
    setDisplayedParcelas(parcelas.slice(0, PARCELAS_PER_PAGE));
    setHasMore(parcelas.length > PARCELAS_PER_PAGE);
  }, [parcelas.length, sortBy, activeFilters, filtersApplied]);

  // Función para cargar más parcelas
  const loadMoreParcelas = () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);

    // Simular carga con timeout de 2 segundos
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const startIndex = nextPage * PARCELAS_PER_PAGE;
      const endIndex = startIndex + PARCELAS_PER_PAGE;
      const newParcelas = parcelas.slice(startIndex, endIndex);

      setDisplayedParcelas(prev => [...prev, ...newParcelas]);
      setCurrentPage(nextPage);
      setHasMore(endIndex < parcelas.length);
      setIsLoadingMore(false);
    }, 2000);
  };

  // IntersectionObserver para detectar scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          loadMoreParcelas();
        }
      },
      { threshold: 0.1 }
    );

    const currentTrigger = loadMoreTriggerRef.current;
    if (currentTrigger) {
      observer.observe(currentTrigger);
    }

    return () => {
      if (currentTrigger) {
        observer.unobserve(currentTrigger);
      }
    };
  }, [hasMore, isLoadingMore, currentPage, parcelas]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--hero-background)' }}>
      {/* Header - IGUAL AL HOME con alta fidelidad */}
      <header className="fixed top-8 left-0 right-0 z-50" style={{ backgroundColor: 'var(--hero-background)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Hamburger Menu - Mobile/Tablet only */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Abrir menú"
            >
              <Menu className="w-6 h-6 text-black" />
            </button>

            {/* Logo and Navigation - Left side */}
            <div className="flex items-center gap-0">
              <img 
                src={logo} 
                alt="CompraTuParcela" 
                className="h-10 sm:h-12 lg:h-14 cursor-pointer" 
                onClick={() => onNavigate('home')}
              />
              
              <nav className="hidden lg:flex items-center justify-center gap-0 whitespace-nowrap">
                <button 
                  onClick={() => onNavigate('parcelas')}
                  className="h-8 px-4 text-sm leading-[1.5] font-normal text-black bg-[#efefef] rounded-[200px] whitespace-nowrap flex items-center justify-center"
                >
                  Parcelas
                </button>
                <button 
                  onClick={() => onNavigate('inmobiliarias')}
                  className="h-8 px-4 text-sm leading-[1.5] font-normal text-black hover:bg-[#efefef] hover:text-[#303030] rounded-[200px] transition-colors whitespace-nowrap flex items-center justify-center"
                >
                  Inmobiliarias
                </button>
                <button onClick={() => onNavigate('como-funciona')} className="h-8 px-4 text-sm leading-[1.5] font-normal text-black hover:bg-[#efefef] hover:text-[#303030] rounded-[200px] transition-colors whitespace-nowrap flex items-center justify-center">
                  Cómo funciona
                </button>
                <button onClick={() => onNavigate('recursos')} className="h-8 px-4 text-sm leading-[1.5] font-normal text-black hover:bg-[#efefef] hover:text-[#303030] rounded-[200px] transition-colors whitespace-nowrap flex items-center justify-center">
                  Recursos
                </button>
              </nav>
            </div>

            {/* Action Buttons - Right side */}
            <div className="flex items-center justify-end gap-2 lg:gap-3">
              <button className="h-8 bg-[#006B4E] hover:bg-[#01533E] text-white px-3 lg:px-[20px] text-xs sm:text-sm leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center py-[0px]">
                <span className="hidden sm:inline">Publicar propiedad</span>
                <span className="sm:hidden">Publicar</span>
              </button>
              <button 
                onClick={() => onNavigate('entry')}
                className="hidden sm:flex h-8 bg-[#efefef] hover:bg-[#dedede] text-black hover:text-[#303030] px-3 lg:px-[20px] text-xs sm:text-sm leading-[1.5] font-medium rounded-[200px] transition-colors items-center justify-center py-[0px]"
              >
                Ingresar
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - with padding for fixed header */}
      <main className="relative pt-20 sm:pt-24 md:pt-28" style={{ backgroundColor: 'var(--hero-background)' }}>
        {/* Hero Section + Buscador */}
        <section className="relative py-12 sm:py-16 md:py-32 pb-24 sm:pb-32 md:pb-52 overflow-hidden" style={{ backgroundColor: 'var(--hero-background)' }}>
          {/* Background image */}
          <img 
            src={heroBackground}
            alt="Campos rurales"
            className="absolute inset-0 w-full h-full object-cover opacity-[0.15] select-none pointer-events-none"
            style={{
              filter: 'grayscale(100%)',
              mixBlendMode: 'multiply'
            }}
          />
          
          {/* Overlay gradient */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(250,250,250,0) 0%, rgba(250,250,250,0.8) 80%, rgba(250,250,250,1) 100%)'
            }}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-6 z-10">
            {/* Título */}
            <div className="mb-8 sm:mb-10 md:mb-12">
              <h1 
                className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-6xl" 
                style={{ 
                  color: '#0A0A0A',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 600,
                  lineHeight: '1.1',
                  letterSpacing: '-0.02em'
                }}
              >
                Parcelas en venta
              </h1>
              <p 
                className="text-sm sm:text-base md:text-xl"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 300,
                  lineHeight: '1.6',
                  maxWidth: '600px',
                  color: '#0A0A0A'
                }}
              >
                Encuentra parcelas verificadas con información clara para tomar decisiones seguras
              </p>
            </div>

            {/* Buscador Unificado */}
            <div className="mb-8 sm:mb-10 md:mb-12 bg-white p-4 sm:p-6 md:p-8 w-full shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-[20px] sm:rounded-[24px] border-2 border-gray-200 transition-all duration-300">
              {/* Fila principal de búsqueda */}
              <div className="flex flex-wrap items-end gap-3 sm:gap-4">
                <div className="space-y-2.5 w-full md:w-auto">
                  <label className="block text-left pl-3 text-gray-700" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                    Ubicación
                  </label>
                  <div className="relative">
                    <select 
                      value={heroFilters.ubicacion}
                      onChange={(e) => setHeroFilters(prev => ({ ...prev, ubicacion: e.target.value }))}
                      className="bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-9 py-2 text-sm text-gray-900 rounded-[100px] focus:outline-none transition-all duration-200 cursor-pointer h-[40px] shadow-sm hover:shadow-md w-full md:w-[155px] appearance-none" 
                      style={{ 
                        fontWeight: 400, 
                        lineHeight: '1.5' 
                      }}
                    >
                      <option value="">Todos</option>
                      <option value="metropolitana">Región Metropolitana</option>
                      <option value="valparaiso">Valparaíso</option>
                      <option value="biobio">Biobío</option>
                      <option value="araucania">La Araucanía</option>
                      <option value="los-lagos">Los Lagos</option>
                      <option value="los-rios">Los Ríos</option>
                      <option value="maule">Maule</option>
                      <option value="ohiggins">O'Higgins</option>
                      <option value="coquimbo">Coquimbo</option>
                      <option value="atacama">Atacama</option>
                      <option value="antofagasta">Antofagasta</option>
                      <option value="tarapaca">Tarapacá</option>
                      <option value="arica">Arica y Parinacota</option>
                      <option value="aysen">Aysén</option>
                      <option value="magallanes">Magallanes</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2.5 w-full md:w-auto">
                  <label className="block text-left pl-3 text-gray-700" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                    Superficie
                  </label>
                  <div className="relative">
                    <select 
                      value={heroFilters.superficieMin}
                      onChange={(e) => setHeroFilters(prev => ({ ...prev, superficieMin: e.target.value }))}
                      className="bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-9 py-2 text-sm text-gray-900 rounded-[100px] focus:outline-none transition-all duration-200 cursor-pointer h-[40px] shadow-sm hover:shadow-md w-full md:w-[155px] appearance-none" 
                      style={{ 
                        fontWeight: 400, 
                        lineHeight: '1.5' 
                      }}
                    >
                      <option value="">Todos</option>
                      <option value="0-5000">Hasta 5.000 m²</option>
                      <option value="5000-10000">5.000 - 10.000 m²</option>
                      <option value="10000-50000">1 - 5 hectáreas</option>
                      <option value="50000-100000">5 - 10 hectáreas</option>
                      <option value="100000-500000">10 - 50 hectáreas</option>
                      <option value="500000+">Más de 50 hectáreas</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2.5 w-full md:w-auto">
                  <label className="block text-left pl-3 text-gray-700" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                    Condición
                  </label>
                  <div className="relative">
                    <select 
                      value={heroFilters.condicion}
                      onChange={(e) => setHeroFilters(prev => ({ ...prev, condicion: e.target.value }))}
                      className="bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-9 py-2 text-sm text-gray-900 rounded-[100px] focus:outline-none transition-all duration-200 cursor-pointer h-[40px] shadow-sm hover:shadow-md w-full md:w-[170px] appearance-none" 
                      style={{ 
                        fontWeight: 400, 
                        lineHeight: '1.5' 
                      }}
                    >
                      <option value="">Todos</option>
                      <option value="primer-dueno">Primer dueño</option>
                      <option value="segundo-dueno">Segundo dueño</option>
                      <option value="tercer-dueno">Tercer dueño</option>
                      <option value="cuarto-dueno">Cuarto dueño o más</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2.5 w-full md:w-auto">
                  <label className="block text-left pl-3 text-gray-700" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                    Rango de precio
                  </label>
                  <div className="relative">
                    <select 
                      value={heroFilters.precioMin}
                      onChange={(e) => setHeroFilters(prev => ({ ...prev, precioMin: e.target.value }))}
                      className="bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-9 py-2 text-sm text-gray-900 rounded-[100px] focus:outline-none transition-all duration-200 cursor-pointer h-[40px] shadow-sm hover:shadow-md w-full md:w-[165px] appearance-none" 
                      style={{ 
                        fontWeight: 400, 
                        lineHeight: '1.5' 
                      }}
                    >
                      <option value="">Todos</option>
                      <option value="0-10000000">Hasta $10.000.000</option>
                      <option value="10000000-30000000">$10M - $30M</option>
                      <option value="30000000-50000000">$30M - $50M</option>
                      <option value="50000000-100000000">$50M - $100M</option>
                      <option value="100000000-200000000">$100M - $200M</option>
                      <option value="200000000+">Más de $200M</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                {/* Switch Incluir proyectos */}
                <div className="space-y-2.5 w-full md:w-auto">
                  <label className="block text-left pl-3 text-gray-700" style={{ fontWeight: 'var(--font-weight-medium)' }}>Incluir proyectos</label>
                  <div 
                    onClick={() => setIncludeProjects(!includeProjects)}
                    className="flex items-center gap-2 cursor-pointer h-[40px] px-3"
                  >
                    <div
                      className="relative w-11 h-6 rounded-full transition-all duration-200"
                      style={{
                        backgroundColor: includeProjects ? '#647E3F' : '#E5E5E5'
                      }}
                    >
                      <div
                        className="absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-200 shadow-sm"
                        style={{
                          left: includeProjects ? '24px' : '4px'
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-700" style={{ fontWeight: 400, lineHeight: '1.5' }}>
                      {includeProjects ? 'Sí' : 'No'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5 w-full md:w-auto">
                  <div className="h-[20px] hidden md:block"></div>
                  <button 
                    onClick={handleSearch}
                    className="bg-[#006B4E] hover:bg-[#01533E] text-white px-[18px] h-[40px] text-sm leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center whitespace-nowrap w-full md:w-auto"
                  >
                    Buscar
                  </button>
                </div>

                <div className="space-y-2.5 w-full md:w-auto">
                  <div className="h-[20px] hidden md:block"></div>
                  <button 
                    onClick={() => {
                      // En mobile/tablet: abrir bottom sheet
                      // En desktop: expandir inline
                      if (window.innerWidth < 1024) {
                        setIsSmartSearchBottomSheetOpen(true);
                      } else {
                        setIsSmartSearchExpanded(!isSmartSearchExpanded);
                      }
                    }}
                    className="h-[40px] bg-[#efefef] hover:bg-[#dedede] text-black hover:text-[#303030] px-[14px] text-sm leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap w-full md:w-auto"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Búsqueda inteligente</span>
                  </button>
                </div>
              </div>

              {/* Sección expandible de búsqueda inteligente */}
              <div 
                className="transition-all duration-500 ease-out overflow-hidden"
                style={{
                  opacity: isSmartSearchExpanded ? 1 : 0,
                  maxHeight: isSmartSearchExpanded ? '1000px' : '0',
                  transform: isSmartSearchExpanded ? 'translateY(0)' : 'translateY(-20px)',
                  pointerEvents: isSmartSearchExpanded ? 'auto' : 'none',
                  marginTop: isSmartSearchExpanded ? '32px' : '0'
                }}
              >
                {/* Encabezado con texto y botón cerrar */}
                <div className="flex items-start justify-between mb-4 sm:mb-5 gap-3">
                  <p className="text-xs sm:text-sm" style={{ fontWeight: 400, lineHeight: '1.6', color: '#0A0A0A' }}>
                    Describe lo que buscas y te mostramos las parcelas que mejor se ajustan.
                  </p>
                  <button
                    onClick={() => setIsSmartSearchExpanded(false)}
                    className="text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1.5 text-xs sm:text-sm flex-shrink-0"
                    style={{ fontWeight: 400, lineHeight: '1.5' }}
                  >
                    <X className="w-4 h-4" />
                    <span className="hidden sm:inline">Cerrar</span>
                  </button>
                </div>

                {/* Campo de texto con botón integrado */}
                <div className="w-full relative">
                  <input
                    type="text"
                    value={smartSearchValue}
                    onChange={(e) => setSmartSearchValue(e.target.value)}
                    placeholder="Ej: parcela cerca de un lago"
                    className="w-full h-12 sm:h-14 lg:h-16 pl-4 sm:pl-6 pr-4 sm:pr-32 lg:pr-40 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black rounded-[12px] sm:rounded-[16px] focus:outline-none transition-all duration-200"
                    style={{ fontWeight: 400, lineHeight: '1.5' }}
                  />
                  <button 
                    onClick={handleSmartSearch}
                    className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 h-9 sm:h-10 lg:h-12 bg-[#efefef] hover:bg-[#dedede] text-black hover:text-[#303030] px-3 sm:px-4 lg:px-5 text-xs sm:text-sm leading-[1.5] font-medium rounded-[8px] sm:rounded-[12px] transition-colors flex items-center justify-center gap-1.5 sm:gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>Buscar</span>
                  </button>
                </div>

                {/* Chips de sugerencias */}
                <div 
                  className="flex flex-wrap gap-2 sm:gap-2.5 mt-4 sm:mt-5 transition-all duration-500 ease-out"
                  style={{
                    opacity: isSmartSearchExpanded ? 1 : 0,
                    transform: isSmartSearchExpanded ? 'translateY(0)' : 'translateY(-10px)'
                  }}
                >
                  <button 
                    onClick={() => toggleBadge('naturaleza')}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-[100px] transition-all duration-200 flex items-center gap-1.5 sm:gap-2 ${
                      selectedBadges.includes('naturaleza')
                        ? 'bg-[#006B4E] text-white border border-[#006B4E] hover:bg-[#01533E]'
                        : 'text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                    }`}
                    style={{ fontWeight: 400, lineHeight: '1.5' }}
                  >
                    <Trees className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>Rodeado de naturaleza</span>
                  </button>
                  <button 
                    onClick={() => toggleBadge('lago-rio')}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-[100px] transition-all duration-200 flex items-center gap-1.5 sm:gap-2 ${
                      selectedBadges.includes('lago-rio')
                        ? 'bg-[#006B4E] text-white border border-[#006B4E] hover:bg-[#01533E]'
                        : 'text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                    }`}
                    style={{ fontWeight: 400, lineHeight: '1.5' }}
                  >
                    <Waves className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>Cerca de lago o río</span>
                  </button>
                  <button 
                    onClick={() => toggleBadge('inversion')}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-[100px] transition-all duration-200 flex items-center gap-1.5 sm:gap-2 ${
                      selectedBadges.includes('inversion')
                        ? 'bg-[#006B4E] text-white border border-[#006B4E] hover:bg-[#01533E]'
                        : 'text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                    }`}
                    style={{ fontWeight: 400, lineHeight: '1.5' }}
                  >
                    <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>Ideal para inversión</span>
                  </button>
                  <button 
                    onClick={() => toggleBadge('acceso')}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-[100px] transition-all duration-200 flex items-center gap-1.5 sm:gap-2 ${
                      selectedBadges.includes('acceso')
                        ? 'bg-[#006B4E] text-white border border-[#006B4E] hover:bg-[#01533E]'
                        : 'text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                    }`}
                    style={{ fontWeight: 400, lineHeight: '1.5' }}
                  >
                    <Car className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>Buen acceso</span>
                  </button>
                  <button 
                    onClick={() => toggleBadge('servicios')}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-[100px] transition-all duration-200 flex items-center gap-1.5 sm:gap-2 ${
                      selectedBadges.includes('servicios')
                        ? 'bg-[#006B4E] text-white border border-[#006B4E] hover:bg-[#01533E]'
                        : 'text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                    }`}
                    style={{ fontWeight: 400, lineHeight: '1.5' }}
                  >
                    <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>Con servicios disponibles</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resultados Section */}
        <section id="results-section" className="relative -mt-12 sm:-mt-16 md:-mt-32 pb-12 sm:pb-16 md:pb-20" style={{ backgroundColor: 'var(--hero-background)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6">
            <div className="flex gap-6 lg:gap-8">
              {/* Filtros Sidebar - Desktop */}
              <aside className="hidden lg:block w-80 flex-shrink-0">
                <div className="sticky top-36 space-y-6">
                  {/* Card de Calculadora/Estimador */}
                  <div className="bg-white rounded-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-200/50 p-6">
                    {/* Header con ícono y textos */}
                    <div className="flex items-start gap-3 mb-5">
                      <div className="flex-shrink-0 w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center">
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 
                          className="mb-1.5" 
                          style={{ 
                            color: '#006B4E',
                            fontFamily: 'Montserrat, sans-serif',
                            fontSize: '16px',
                            fontWeight: 600,
                            lineHeight: '1.3'
                          }}
                        >
                          Calcula tu presupuesto
                        </h3>
                        <p 
                          style={{ 
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '13px',
                            fontWeight: 400,
                            lineHeight: '1.5',
                            color: '#0A0A0A'
                          }}
                        >
                          Conocé qué parcela podés comprar según tu capacidad
                        </p>
                      </div>
                    </div>

                    {/* Campos del estimador */}
                    <div className="space-y-4">
                      {/* Presupuesto */}
                      <div className="space-y-2">
                        <label 
                          className="block" 
                          style={{ 
                            color: '#0A0A0A',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '13px',
                            fontWeight: 500
                          }}
                        >
                          Presupuesto disponible
                        </label>
                        <input
                          type="text"
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          placeholder="Ej: 50.000.000"
                          className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black px-4 py-2.5 rounded-[100px] focus:outline-none transition-colors"
                          style={{ 
                            color: '#0A0A0A', 
                            fontFamily: 'Inter, sans-serif', 
                            fontSize: '14px',
                            fontWeight: 400
                          }}
                        />
                      </div>

                      {/* Cuota aproximada */}
                      <div className="space-y-2">
                        <label 
                          className="block" 
                          style={{ 
                            color: '#0A0A0A',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '13px',
                            fontWeight: 500
                          }}
                        >
                          Cuota mensual aproximada
                        </label>
                        <div 
                          className="px-4 py-2.5 bg-gray-50 rounded-[100px] border-2 border-gray-200" 
                          style={{ 
                            color: budget ? '#0A0A0A' : '#a1a1a1', 
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '14px',
                            fontWeight: 500
                          }}
                        >
                          {budget ? formatCurrency(calculateMonthlyPayment()) : 'Ingresá tu presupuesto'}
                        </div>
                      </div>

                      {/* Zona */}
                      <div className="dropdown-container relative space-y-2">
                        <label 
                          className="block" 
                          style={{ 
                            color: '#0A0A0A',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '13px',
                            fontWeight: 500
                          }}
                        >
                          Zona de interés
                        </label>
                        <button
                          onClick={() => setOpenDropdown(openDropdown === 'calcZone' ? null : 'calcZone')}
                          className="w-full text-left rounded-[100px] px-4 py-2.5 transition-colors flex items-center justify-between bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black focus:outline-none"
                          style={{ 
                            color: calcZone ? '#0A0A0A' : '#a1a1a1', 
                            fontFamily: 'Inter, sans-serif', 
                            fontSize: '14px',
                            fontWeight: 400
                          }}
                        >
                          <span className="overflow-hidden text-ellipsis whitespace-nowrap">{calcZone || 'Seleccionar zona'}</span>
                          <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                        </button>
                        {openDropdown === 'calcZone' && (
                          <div className="absolute top-full left-0 mt-2 w-full bg-white border-2 border-gray-200 rounded-[12px] shadow-lg z-50 overflow-hidden">
                            {['Valle del Aconcagua', 'Valle de Casablanca', 'Cordillera de Los Andes', 'Litoral Central', 'Valle Central'].map((zona) => (
                              <button
                                key={zona}
                                onClick={() => {
                                  setCalcZone(zona);
                                  setOpenDropdown(null);
                                }}
                                className="w-full text-left px-4 py-2.5 hover:bg-gray-100 transition-colors"
                                style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}
                              >
                                {zona}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Tipo de parcela */}
                      <div className="dropdown-container relative space-y-2">
                        <label 
                          className="block" 
                          style={{ 
                            color: '#0A0A0A',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '13px',
                            fontWeight: 500
                          }}
                        >
                          Tipo de parcela
                        </label>
                        <button
                          onClick={() => setOpenDropdown(openDropdown === 'calcParcelType' ? null : 'calcParcelType')}
                          className="w-full text-left rounded-[100px] px-4 py-2.5 transition-colors flex items-center justify-between bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black focus:outline-none"
                          style={{ 
                            color: calcParcelType ? '#0A0A0A' : '#a1a1a1', 
                            fontFamily: 'Inter, sans-serif', 
                            fontSize: '14px',
                            fontWeight: 400
                          }}
                        >
                          <span className="overflow-hidden text-ellipsis whitespace-nowrap">{calcParcelType || 'Seleccionar tipo'}</span>
                          <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                        </button>
                        {openDropdown === 'calcParcelType' && (
                          <div className="absolute top-full left-0 mt-2 w-full bg-white border-2 border-gray-200 rounded-[12px] shadow-lg z-50 overflow-hidden">
                            {['Agrícola', 'Agrado/Residencial', 'Forestal', 'Mixta'].map((tipo) => (
                              <button
                                key={tipo}
                                onClick={() => {
                                  setCalcParcelType(tipo);
                                  setOpenDropdown(null);
                                }}
                                className="w-full text-left px-4 py-2.5 hover:bg-gray-100 transition-colors"
                                style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}
                              >
                                {tipo}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Botón Calcular */}
                      <button 
                        onClick={handleCalculate}
                        className="w-full bg-[#006B4E] hover:bg-[#01533E] text-white py-3 rounded-[200px] transition-colors mt-2"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '14px',
                          fontWeight: 500
                        }}
                      >
                        Calcular
                      </button>
                    </div>
                  </div>

                  {/* Card de Filtros */}
                  <div className="bg-white rounded-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-200/50 p-6">
                    <h2 
                      className="mb-6" 
                      style={{ 
                        color: '#006B4E',
                        fontFamily: 'Montserrat, sans-serif',
                        fontSize: '18px',
                        fontWeight: 600,
                        lineHeight: '1.3'
                      }}
                    >
                      Filtros
                    </h2>

                    {/* Ordenar por */}
                    <div className="mb-8">
                      <label 
                        className="block mb-3" 
                        style={{ 
                          color: '#0A0A0A',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '14px',
                          fontWeight: 500
                        }}
                      >
                        Ordenar por
                      </label>
                      <div className="relative">
                        <select 
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-10 py-2.5 rounded-[100px] appearance-none cursor-pointer transition-colors"
                          style={{ 
                            color: '#0A0A0A',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '14px',
                            fontWeight: 400
                          }}
                        >
                          <option value="relevancia">Relevancia</option>
                          <option value="recientes">Más recientes</option>
                          <option value="precio-asc">Menor precio</option>
                          <option value="precio-desc">Mayor precio</option>
                          <option value="superficie-asc">Menor superficie</option>
                          <option value="superficie-desc">Mayor superficie</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Precio Range */}
                    <div className="mb-8">
                      <label 
                        className="block mb-3" 
                        style={{ 
                          color: '#0A0A0A',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '14px',
                          fontWeight: 500
                        }}
                      >
                        Precio
                      </label>
                      <div className="space-y-2">
                        <div className="relative">
                          <select 
                            className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-10 py-2.5 rounded-[100px] appearance-none cursor-pointer transition-colors"
                            style={{ 
                              color: '#0A0A0A',
                              fontFamily: 'Inter, sans-serif',
                              fontSize: '13px',
                              fontWeight: 400
                            }}
                          >
                            <option>Mínimo</option>
                            <option>$10.000.000</option>
                            <option>$30.000.000</option>
                            <option>$50.000.000</option>
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                        <div className="relative">
                          <select 
                            className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-10 py-2.5 rounded-[100px] appearance-none cursor-pointer transition-colors"
                            style={{ 
                              color: '#0A0A0A',
                              fontFamily: 'Inter, sans-serif',
                              fontSize: '13px',
                              fontWeight: 400
                            }}
                          >
                            <option>Máximo</option>
                            <option>$100.000.000</option>
                            <option>$200.000.000</option>
                            <option>$500.000.000</option>
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Superficie */}
                    <div className="mb-8">
                      <label 
                        className="block mb-3" 
                        style={{ 
                          color: '#0A0A0A',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '14px',
                          fontWeight: 500
                        }}
                      >
                        Superficie
                      </label>
                      <div className="space-y-2">
                        <div className="relative">
                          <select 
                            className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-10 py-2.5 rounded-[100px] appearance-none cursor-pointer transition-colors"
                            style={{ 
                              color: '#0A0A0A',
                              fontFamily: 'Inter, sans-serif',
                              fontSize: '13px',
                              fontWeight: 400
                            }}
                          >
                            <option>Mínimo</option>
                            <option>1.000 m²</option>
                            <option>5.000 m²</option>
                            <option>10.000 m²</option>
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                        <div className="relative">
                          <select 
                            className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-10 py-2.5 rounded-[100px] appearance-none cursor-pointer transition-colors"
                            style={{ 
                              color: '#0A0A0A',
                              fontFamily: 'Inter, sans-serif',
                              fontSize: '13px',
                              fontWeight: 400
                            }}
                          >
                            <option>Máximo</option>
                            <option>50.000 m²</option>
                            <option>100.000 m²</option>
                            <option>500.000 m²</option>
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Tipo de parcela */}
                    <div className="mb-8">
                      <label 
                        className="block mb-3" 
                        style={{ 
                          color: '#0A0A0A',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '14px',
                          fontWeight: 500
                        }}
                      >
                        Tipo de parcela
                      </label>
                      <div className="space-y-3">
                        {['Residencial', 'Agrícola', 'Forestal', 'Mixta'].map((tipo) => (
                          <label key={tipo} className="flex items-center cursor-pointer group">
                            <input 
                              type="checkbox" 
                              className="w-5 h-5 rounded border-2 border-gray-300 text-black focus:ring-0 focus:ring-offset-0 cursor-pointer"
                            />
                            <span 
                              className="ml-3 group-hover:text-black transition-colors"
                              style={{ 
                                color: '#0A0A0A',
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '14px',
                                fontWeight: 400
                              }}
                            >
                              {tipo}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Filtros rápidos */}
                    <div>
                      <label 
                        className="block mb-3" 
                        style={{ 
                          color: '#0A0A0A',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '14px',
                          fontWeight: 500
                        }}
                      >
                        Filtros rápidos
                      </label>
                      <div className="space-y-3">
                        {['Destacadas', 'Nuevas', 'Terrenos', 'Certificadas'].map((filtro) => (
                          <label key={filtro} className="flex items-center cursor-pointer group">
                            <input 
                              type="checkbox" 
                              className="w-5 h-5 rounded border-2 border-gray-300 text-black focus:ring-0 focus:ring-offset-0 cursor-pointer"
                            />
                            <span 
                              className="ml-3 group-hover:text-black transition-colors"
                              style={{ 
                                color: '#0A0A0A',
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '14px',
                                fontWeight: 400
                              }}
                            >
                              {filtro}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Aplicar filtros button */}
                    <button 
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        fontWeight: 500,
                        backgroundColor: '#006B4E'
                      }}
                      className="w-full mt-8 text-white py-3 rounded-[200px] transition-colors"
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#01533E'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
                    >
                      Aplicar filtros
                    </button>
                  </div>
                </div>
              </aside>

              {/* Resultados */}
              <main className="flex-1">
                {/* Botones de filtros y calculadora para mobile only */}
                <div className="md:hidden mb-4 mt-8 flex items-center gap-3">
                  <button
                    onClick={() => setIsMobileFiltersOpen(true)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white border-2 border-gray-200 hover:border-gray-300 rounded-[100px] transition-colors"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#0A0A0A'
                    }}
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filtros
                  </button>
                  <button
                    onClick={() => setIsMobileCalculatorOpen(true)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white border-2 border-gray-200 hover:border-gray-300 rounded-[100px] transition-colors"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#0A0A0A'
                    }}
                  >
                    <Calculator className="w-4 h-4" />
                    Calculadora
                  </button>
                </div>

                {/* Filtros primarios inline para tablet */}
                <div className="hidden md:flex lg:hidden mb-6 mt-8 gap-4 flex-wrap">
                  {/* Ordenar por */}
                  <div className="flex-1 min-w-[200px]">
                    <label 
                      className="block mb-2 text-sm" 
                      style={{ 
                        color: '#0A0A0A',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 500
                      }}
                    >
                      Ordenar por
                    </label>
                    <div className="relative">
                      <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-10 py-2.5 rounded-[100px] appearance-none cursor-pointer transition-colors"
                        style={{ 
                          color: '#0A0A0A',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '14px',
                          fontWeight: 400
                        }}
                      >
                        <option value="relevancia">Relevancia</option>
                        <option value="recientes">Más recientes</option>
                        <option value="precio-asc">Menor precio</option>
                        <option value="precio-desc">Mayor precio</option>
                        <option value="superficie-asc">Menor superficie</option>
                        <option value="superficie-desc">Mayor superficie</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Botón de más filtros para tablet */}
                  <div className="flex items-end">
                    <button
                      onClick={() => setIsMobileFiltersOpen(true)}
                      className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white border-2 border-gray-200 hover:border-gray-300 rounded-[100px] transition-colors h-[42px]"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#0A0A0A'
                      }}
                    >
                      <SlidersHorizontal className="w-4 h-4" />
                      Más filtros
                    </button>
                  </div>
                </div>

                {/* Contador y filtros activos con selector de vista */}
                <div className="mb-6 mt-4 lg:mt-8">
                  {/* Fila con contador y botones de vista */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <p 
                      style={{ 
                        color: '#0A0A0A',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '15px',
                        fontWeight: 400
                      }}
                    >
                      {parcelas.length} parcelas encontradas
                    </p>

                    {/* Botones de selector de vista */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setViewMode('list')}
                        className="flex items-center gap-2 px-4 py-2 rounded-[100px] transition-colors"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '14px',
                          fontWeight: 500,
                          backgroundColor: viewMode === 'list' ? '#006B4E' : '#FFFFFF',
                          color: viewMode === 'list' ? '#FFFFFF' : '#0A0A0A',
                          border: viewMode === 'list' ? 'none' : '2px solid #E5E5E5'
                        }}
                        onMouseEnter={(e) => {
                          if (viewMode !== 'list') {
                            e.currentTarget.style.borderColor = '#CDD8DE';
                            e.currentTarget.style.backgroundColor = '#F5F5F5';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (viewMode !== 'list') {
                            e.currentTarget.style.borderColor = '#E5E5E5';
                            e.currentTarget.style.backgroundColor = '#FFFFFF';
                          }
                        }}
                      >
                        <List className="w-4 h-4" />
                        <span className="hidden sm:inline">Ver lista</span>
                      </button>

                      <button
                        onClick={() => setViewMode('map')}
                        className="flex items-center gap-2 px-4 py-2 rounded-[100px] transition-colors"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '14px',
                          fontWeight: 500,
                          backgroundColor: viewMode === 'map' ? '#006B4E' : '#FFFFFF',
                          color: viewMode === 'map' ? '#FFFFFF' : '#0A0A0A',
                          border: viewMode === 'map' ? 'none' : '2px solid #E5E5E5'
                        }}
                        onMouseEnter={(e) => {
                          if (viewMode !== 'map') {
                            e.currentTarget.style.borderColor = '#CDD8DE';
                            e.currentTarget.style.backgroundColor = '#F5F5F5';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (viewMode !== 'map') {
                            e.currentTarget.style.borderColor = '#E5E5E5';
                            e.currentTarget.style.backgroundColor = '#FFFFFF';
                          }
                        }}
                      >
                        <MapIcon className="w-4 h-4" />
                        <span className="hidden sm:inline">Ver mapa</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Chips de filtros activos */}
                  {getActiveFilterLabels().length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {getActiveFilterLabels().map((filter) => (
                        <div 
                          key={`${filter.type}-${filter.label}-${filter.value || ''}`}
                          className="inline-flex items-center gap-1.5 sm:gap-2 bg-white hover:bg-gray-50 border-2 border-gray-200 px-3 sm:px-4 py-1.5 sm:py-2 rounded-[100px] transition-colors"
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '12px',
                            fontWeight: 400
                          }}
                        >
                          <span style={{ color: '#0A0A0A' }}>{filter.label}</span>
                          <button 
                            onClick={() => removeFilter(filter.type, filter.value)}
                            className="hover:bg-gray-200 rounded-full p-0.5 transition-colors"
                          >
                            <X className="w-3.5 h-3.5 text-gray-600" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Vista condicional: Mapa o Grid de parcelas */}
                {viewMode === 'map' ? (
                  /* Vista de Mapa */
                  <ParcelasMapView
                    parcelas={displayedParcelas}
                    selectedParcelaId={selectedParcelaOnMap}
                    onParcelaSelect={setSelectedParcelaOnMap}
                    onParcelaClick={(id) => onNavigate('parcela-detalle', id)}
                  />
                ) : (
                  /* Vista de Lista - Grid de parcelas o Empty State */
                  <>
                    {parcelas.length === 0 && filtersApplied ? (
                  // Empty State cuando no hay resultados con filtros aplicados
                  <div className="col-span-2 py-12 sm:py-16 md:py-20">
                    <div className="flex flex-col items-center justify-center text-center max-w-xl mx-auto px-4">
                      {/* Ícono */}
                      <div className="mb-4 sm:mb-6">
                        <MapPin 
                          size={48}
                          className="sm:hidden"
                          style={{ color: '#CDD8DE' }}
                          strokeWidth={1.5}
                        />
                        <MapPin 
                          size={64}
                          className="hidden sm:block" 
                          style={{ color: '#CDD8DE' }}
                          strokeWidth={1.5}
                        />
                      </div>
                      
                      {/* Título */}
                      <h3 
                        className="mb-2 sm:mb-3"
                        style={{ 
                          color: '#0A0A0A',
                          fontFamily: 'var(--font-heading)',
                          fontSize: 'var(--font-size-h3)',
                          fontWeight: 'var(--font-weight-medium)',
                          lineHeight: 'var(--line-height-heading)'
                        }}
                      >
                        No encontramos parcelas con estos filtros
                      </h3>
                      
                      {/* Texto descriptivo */}
                      <p 
                        className="mb-6 sm:mb-8"
                        style={{ 
                          color: '#737373',
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-base)',
                          lineHeight: 'var(--line-height-body)',
                          maxWidth: '480px'
                        }}
                      >
                        Intenta ajustar tus criterios de búsqueda o elimina algunos filtros para ver más opciones disponibles.
                      </p>
                      
                      {/* Botones de acción */}
                      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <button
                          onClick={() => {
                            setActiveFilters({ tipos: [], destacadas: false, nuevas: false });
                            setHeroFilters({
                              ubicacion: '',
                              tipo: '',
                              superficieMin: '',
                              superficieMax: '',
                              condicion: '',
                              precioMin: '',
                              precioMax: ''
                            });
                            setFiltersApplied(false);
                          }}
                          className="h-10 sm:h-11 px-5 sm:px-6 text-sm sm:text-base leading-[1.5] font-medium rounded-[200px] transition-colors shadow-sm w-full sm:w-auto"
                          style={{ 
                            fontFamily: 'var(--font-body)',
                            backgroundColor: '#006B4E',
                            color: '#FFFFFF'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#01533E'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
                        >
                          Limpiar filtros
                        </button>
                        
                        <button
                          onClick={() => onNavigate('home')}
                          className="h-10 sm:h-11 px-5 sm:px-6 text-sm sm:text-base leading-[1.5] font-medium rounded-[200px] transition-colors border-2 w-full sm:w-auto"
                          style={{ 
                            fontFamily: 'var(--font-body)',
                            backgroundColor: 'transparent',
                            color: '#0A0A0A',
                            borderColor: '#DEDEDE'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#F5F5F5';
                            e.currentTarget.style.borderColor = '#C3C3C3';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.borderColor = '#DEDEDE';
                          }}
                        >
                          Volver al inicio
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                      {isInitialLoading ? (
                        // Skeleton cards durante la carga
                        Array.from({ length: 8 }).map((_, index) => (
                          <div 
                            key={`skeleton-${index}`}
                            className="h-full flex flex-col rounded-xl shadow-sm overflow-hidden"
                            style={{
                              border: '2px solid #E5E5E5',
                            }}
                          >
                            {/* Placeholder de imagen */}
                            <div 
                              className="skeleton-shimmer"
                              style={{
                                width: '100%',
                                height: '240px',
                                backgroundColor: '#F5F5F5'
                              }}
                            />
                            
                            {/* Contenido del card */}
                            <div className="p-4 sm:p-5 space-y-3 sm:space-y-4 bg-white flex-grow flex flex-col">
                              {/* Título y ubicación */}
                              <div className="space-y-2">
                                <div 
                                  className="skeleton-shimmer rounded"
                                  style={{
                                    width: '75%',
                                    height: '24px',
                                    backgroundColor: '#F5F5F5'
                                  }}
                                />
                                <div 
                                  className="skeleton-shimmer rounded"
                                  style={{
                                    width: '50%',
                                    height: '16px',
                                    backgroundColor: '#F5F5F5'
                                  }}
                                />
                              </div>
                              
                              {/* Características */}
                              <div className="space-y-2 flex-grow">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                                  <div className="flex items-center gap-2">
                                    <div 
                                      className="skeleton-shimmer rounded"
                                      style={{
                                        width: '20px',
                                        height: '20px',
                                        backgroundColor: '#F5F5F5',
                                        flexShrink: 0
                                      }}
                                    />
                                    <div 
                                      className="skeleton-shimmer rounded"
                                      style={{
                                        width: '80px',
                                        height: '16px',
                                        backgroundColor: '#F5F5F5'
                                      }}
                                    />
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div 
                                      className="skeleton-shimmer rounded"
                                      style={{
                                        width: '20px',
                                        height: '20px',
                                        backgroundColor: '#F5F5F5',
                                        flexShrink: 0
                                      }}
                                    />
                                    <div 
                                      className="skeleton-shimmer rounded"
                                      style={{
                                        width: '90px',
                                        height: '16px',
                                        backgroundColor: '#F5F5F5'
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                                  <div className="flex items-center gap-2">
                                    <div 
                                      className="skeleton-shimmer rounded"
                                      style={{
                                        width: '20px',
                                        height: '20px',
                                        backgroundColor: '#F5F5F5',
                                        flexShrink: 0
                                      }}
                                    />
                                    <div 
                                      className="skeleton-shimmer rounded"
                                      style={{
                                        width: '70px',
                                        height: '16px',
                                        backgroundColor: '#F5F5F5'
                                      }}
                                    />
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div 
                                      className="skeleton-shimmer rounded"
                                      style={{
                                        width: '20px',
                                        height: '20px',
                                        backgroundColor: '#F5F5F5',
                                        flexShrink: 0
                                      }}
                                    />
                                    <div 
                                      className="skeleton-shimmer rounded"
                                      style={{
                                        width: '85px',
                                        height: '16px',
                                        backgroundColor: '#F5F5F5'
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Precio y broker */}
                              <div className="pt-3" style={{ borderTop: '1px solid #CDD8DE' }}>
                                <div className="mb-3 space-y-2">
                                  <div 
                                    className="skeleton-shimmer rounded"
                                    style={{
                                      width: '60px',
                                      height: '12px',
                                      backgroundColor: '#F5F5F5'
                                    }}
                                  />
                                  <div 
                                    className="skeleton-shimmer rounded"
                                    style={{
                                      width: '140px',
                                      height: '28px',
                                      backgroundColor: '#F5F5F5'
                                    }}
                                  />
                                </div>
                                
                                {/* Broker placeholder */}
                                <div className="flex items-center gap-2">
                                  <div 
                                    className="skeleton-shimmer rounded-full"
                                    style={{
                                      width: '32px',
                                      height: '32px',
                                      backgroundColor: '#F5F5F5',
                                      flexShrink: 0
                                    }}
                                  />
                                  <div 
                                    className="skeleton-shimmer rounded"
                                    style={{
                                      width: '120px',
                                      height: '16px',
                                      backgroundColor: '#F5F5F5'
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        // Cards reales
                        displayedParcelas.map((parcela) => (
                          <div 
                            key={parcela.id}
                            onClick={() => onNavigate('parcela-detalle', parcela.id)}
                            className="h-full flex flex-col rounded-xl shadow-sm cursor-pointer group overflow-hidden"
                            style={{
                              border: '2px solid #E5E5E5',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.boxShadow = '0 8px 24px rgba(100, 126, 63, 0.25)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                            }}
                          >
                          <div className="relative">
                            <ParcelaCardImage
                              imagenes={parcela.imagenes}
                              imagen={parcela.imagen}
                              nombre={parcela.nombre}
                            />
                            {parcelaEstados?.[parcela.id] && parcelaEstados[parcela.id] !== 'disponible' && (
                              <div
                                className="absolute top-2 left-2 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
                                style={{
                                  backgroundColor: parcelaEstados[parcela.id] === 'reservada' ? '#065F46' : '#D97706',
                                  color: '#FFFFFF',
                                  fontFamily: 'var(--font-body)',
                                  boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
                                }}
                              >
                                {parcelaEstados[parcela.id] === 'reservandose' ? 'Reservándose' : 'Reservada'}
                              </div>
                            )}
                          </div>
                          <div className="p-4 sm:p-5 space-y-3 sm:space-y-4 bg-white flex-grow flex flex-col">
                            <div className="space-y-1">
                              <h3 style={{ color: '#0A0A0A', fontSize: 'var(--font-size-body-lg)', fontWeight: 'var(--font-weight-semibold)' }}>{parcela.nombre}</h3>
                              <p className="text-sm text-gray-500" style={{ fontSize: 'var(--font-size-xs)', lineHeight: 'var(--line-height-ui)' }}>{parcela.ubicacion}</p>
                            </div>
                            
                            <div className="space-y-2 flex-grow">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                                {parcela.caracteristicas?.[0]?.icon && (
                                  <div className="flex items-center gap-2 text-sm" style={{ color: '#0A0A0A' }}>
                                    <div className="[&_svg]:stroke-[#006B4E] [&_path]:fill-none [&_path]:stroke-[#006B4E] [&_circle]:fill-none [&_circle]:stroke-[#006B4E] [&_rect]:fill-none [&_rect]:stroke-[#006B4E] [&_line]:stroke-[#006B4E] [&_polyline]:stroke-[#006B4E]" style={{ color: '#006B4E' }}>{parcela.caracteristicas[0].icon}</div>
                                    <span className="font-medium">{parcela.caracteristicas[0].text}</span>
                                  </div>
                                )}
                                {parcela.caracteristicas?.[1]?.icon && (
                                  <div className="flex items-center gap-2 text-sm" style={{ color: '#0A0A0A' }}>
                                    <div className="[&_svg]:stroke-[#006B4E] [&_path]:fill-none [&_path]:stroke-[#006B4E] [&_circle]:fill-none [&_circle]:stroke-[#006B4E] [&_rect]:fill-none [&_rect]:stroke-[#006B4E] [&_line]:stroke-[#006B4E] [&_polyline]:stroke-[#006B4E]" style={{ color: '#006B4E' }}>{parcela.caracteristicas[1].icon}</div>
                                    <span className="font-medium">{parcela.caracteristicas[1].text}</span>
                                  </div>
                                )}
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                                {parcela.caracteristicas?.[2]?.icon && (
                                  <div className="flex items-center gap-2 text-sm" style={{ color: '#0A0A0A' }}>
                                    <div className="[&_svg]:stroke-[#006B4E] [&_path]:fill-none [&_path]:stroke-[#006B4E] [&_circle]:fill-none [&_circle]:stroke-[#006B4E] [&_rect]:fill-none [&_rect]:stroke-[#006B4E] [&_line]:stroke-[#006B4E] [&_polyline]:stroke-[#006B4E]" style={{ color: '#006B4E' }}>{parcela.caracteristicas[2].icon}</div>
                                    <span className="font-medium">{parcela.caracteristicas[2].text}</span>
                                  </div>
                                )}
                                {parcela.caracteristicas?.[3]?.icon && (
                                  <div className="flex items-center gap-2 text-sm" style={{ color: '#0A0A0A' }}>
                                    <div className="[&_svg]:stroke-[#006B4E] [&_path]:fill-none [&_path]:stroke-[#006B4E] [&_circle]:fill-none [&_circle]:stroke-[#006B4E] [&_rect]:fill-none [&_rect]:stroke-[#006B4E] [&_line]:stroke-[#006B4E] [&_polyline]:stroke-[#006B4E]" style={{ color: '#006B4E' }}>{parcela.caracteristicas[3].icon}</div>
                                    <span className="font-medium">{parcela.caracteristicas[3].text}</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="pt-3" style={{ borderTop: '1px solid #CDD8DE' }}>
                              <div className="mb-3">
                                <div className="text-xs mb-1" style={{ color: '#462611', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Desde</div>
                                <PrecioDisplay 
                                  precioCLP={parcela.precio}
                                  precioSize="lg"
                                />
                              </div>
                              
                              <PublicadoPorCompact 
                                logo={parcela.brokerImagen} 
                                nombre={parcela.inmobiliaria}
                                tipoVendedor={parcela.tipoVendedor}
                              />
                            </div>
                          </div>
                        </div>
                      ))
                      )}
                    </div>

                    {/* Trigger para scroll infinito */}
                    <div ref={loadMoreTriggerRef} className="mt-8 flex justify-center">
                      {!isInitialLoading && isLoadingMore && (
                        <div className="flex flex-col items-center gap-3">
                          <div className="relative w-8 h-8">
                            <div 
                              className="absolute inset-0 rounded-full border-3 border-t-transparent animate-spin"
                              style={{ 
                                borderWidth: '3px',
                                borderColor: '#006B4E',
                                borderTopColor: 'transparent'
                              }}
                            />
                          </div>
                          <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            color: '#737373'
                          }}>
                            Cargando más parcelas...
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                )}
                  </>
                )}

              </main>
            </div>

            {/* Sección de Proyectos */}
            <div id="proyectos-section" className="py-12 sm:py-14 md:py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
                {/* Título */}
                <div className="mb-6 sm:mb-8 text-center">
                  <h2 style={{ 
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 'var(--font-weight-regular)',
                    fontSize: 'var(--font-size-h2)',
                    color: '#0A0A0A',
                    marginBottom: '0.5rem'
                  }}>
                    Proyectos disponibles
                  </h2>
                  <p style={{ 
                    fontFamily: 'var(--font-body)',
                    color: '#737373',
                    fontSize: 'var(--font-size-body-base)',
                    lineHeight: 'var(--line-height-body)'
                  }}>
                    Descubrí desarrollos con múltiples parcelas
                  </p>
                </div>

                {/* Carrusel horizontal */}
                <div className="relative">
                  {/* Botón izquierdo */}
                  <button
                    onClick={() => {
                      if (proyectosCarouselRef.current) {
                        proyectosCarouselRef.current.scrollBy({ left: -400, behavior: 'smooth' });
                      }
                    }}
                    className="absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                    style={{ left: '-20px', border: '1px solid #E5E5E5' }}
                    aria-label="Anterior"
                  >
                    <ChevronLeft className="w-5 h-5" style={{ color: '#0A0A0A' }} />
                  </button>

                  {/* Contenedor del carrusel */}
                  <div 
                    ref={proyectosCarouselRef}
                    className="overflow-x-auto scrollbar-hide -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0"
                    style={{ 
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                      scrollSnapType: 'x mandatory'
                    }}
                  >
                    <style>{`
                      .scrollbar-hide::-webkit-scrollbar {
                        display: none;
                      }
                    `}</style>
                    
                    <div className="flex gap-4 sm:gap-5 lg:gap-6 py-2">
                      {proyectos.map((proyecto) => (
                        <div 
                          key={proyecto.id} 
                          className="flex-shrink-0 w-[280px] sm:w-[300px] lg:w-[320px] scroll-snap-align-start cursor-pointer"
                          onClick={() => onNavigate('proyecto-detalle', proyecto.id)}
                        >
                          {/* Card del proyecto */}
                          <div 
                            className="bg-white rounded-xl overflow-hidden h-full flex flex-col"
                            style={{
                              border: '2px solid #E5E5E5',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.boxShadow = '0 8px 24px rgba(70, 38, 17, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                            }}
                          >
                            {/* Imagen */}
                            <div className="relative w-full h-40 sm:h-44 lg:h-48 overflow-hidden">
                              <ImageWithFallback 
                                src={proyecto.imagen}
                                alt={proyecto.nombre}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                              />
                              {/* Badge de estado */}
                              <div 
                                className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium"
                                style={{
                                  fontFamily: 'var(--font-body)',
                                  fontSize: 'var(--font-size-xs)',
                                  fontWeight: 'var(--font-weight-medium)',
                                  backgroundColor: proyecto.estado === 'En venta' ? '#DCFCE7' : proyecto.estado === 'Próximamente' ? '#FEF3C7' : '#E0E7FF',
                                  color: proyecto.estado === 'En venta' ? '#166534' : proyecto.estado === 'Próximamente' ? '#854D0E' : '#3730A3',
                                  border: `1px solid ${proyecto.estado === 'En venta' ? '#BBF7D0' : proyecto.estado === 'Próximamente' ? '#FDE68A' : '#C7D2FE'}`
                                }}
                              >
                                {proyecto.estado}
                              </div>
                            </div>

                            {/* Contenido */}
                            <div className="p-4 sm:p-5 flex-1 flex flex-col">
                              {/* Nombre y ubicación */}
                              <h3 style={{ 
                                fontFamily: 'var(--font-heading)',
                                fontWeight: 'var(--font-weight-medium)',
                                fontSize: 'var(--font-size-body-lg)',
                                color: '#0A0A0A',
                                marginBottom: '0.5rem',
                                lineHeight: 'var(--line-height-heading)'
                              }}>
                                {proyecto.nombre}
                              </h3>
                              <p style={{ 
                                fontFamily: 'var(--font-body)',
                                color: '#737373',
                                fontSize: 'var(--font-size-body-sm)',
                                marginBottom: '1rem',
                                lineHeight: 'var(--line-height-body)'
                              }}>
                                {proyecto.ubicacion}, {proyecto.region}
                              </p>

                              {/* Información clave */}
                              <div className="space-y-2 mb-4 flex-1">
                                <div className="flex items-center justify-between">
                                  <span style={{ 
                                    fontFamily: 'var(--font-body)',
                                    color: '#737373',
                                    fontSize: 'var(--font-size-xs)'
                                  }}>
                                    Disponibles
                                  </span>
                                  <span style={{ 
                                    fontFamily: 'var(--font-body)',
                                    color: '#0A0A0A',
                                    fontSize: 'var(--font-size-body-sm)',
                                    fontWeight: 'var(--font-weight-medium)'
                                  }}>
                                    {proyecto.parcelasDisponibles} de {proyecto.totalParcelas}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span style={{ 
                                    fontFamily: 'var(--font-body)',
                                    color: '#737373',
                                    fontSize: 'var(--font-size-xs)'
                                  }}>
                                    Desde
                                  </span>
                                  <span style={{ 
                                    fontFamily: 'var(--font-body)',
                                    color: '#0A0A0A',
                                    fontSize: 'var(--font-size-body-sm)',
                                    fontWeight: 'var(--font-weight-medium)'
                                  }}>
                                    {proyecto.superficieDesde}
                                  </span>
                                </div>
                              </div>

                              {/* Precio */}
                              <div className="pt-4 border-t border-gray-200">
                                <p style={{ 
                                  fontFamily: 'var(--font-body)',
                                  color: '#737373',
                                  fontSize: 'var(--font-size-xs)',
                                  marginBottom: '0.25rem'
                                }}>
                                  Desde
                                </p>
                                <p style={{ 
                                  fontFamily: 'var(--font-heading)',
                                  fontWeight: 'var(--font-weight-semibold)',
                                  fontSize: 'var(--font-size-h4)',
                                  color: '#0A0A0A'
                                }}>
                                  {proyecto.precioDesde}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Botón derecho */}
                  <button
                    onClick={() => {
                      if (proyectosCarouselRef.current) {
                        proyectosCarouselRef.current.scrollBy({ left: 400, behavior: 'smooth' });
                      }
                    }}
                    className="absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                    style={{ right: '-20px', border: '1px solid #E5E5E5' }}
                    aria-label="Siguiente"
                  >
                    <ChevronRight className="w-5 h-5" style={{ color: '#0A0A0A' }} />
                  </button>
                </div>

                {/* Botón Ver todos los proyectos */}
                <div className="flex justify-center mt-6 sm:mt-8">
                  <button
                    onClick={() => {
                      // Scroll hacia arriba de la sección de proyectos
                      const proyectosSection = document.getElementById('proyectos-section');
                      if (proyectosSection) {
                        proyectosSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className="px-4 py-1.5 rounded-full transition-all duration-300"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-xs)',
                      fontWeight: 'var(--font-weight-medium)',
                      letterSpacing: 'var(--letter-spacing-normal)',
                      backgroundColor: 'transparent',
                      color: '#737373',
                      border: '1px solid #E5E5E5'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#111';
                      e.currentTarget.style.color = '#FFFFFF';
                      e.currentTarget.style.borderColor = '#111';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#737373';
                      e.currentTarget.style.borderColor = '#E5E5E5';
                    }}
                  >
                    Ver todos los proyectos
                  </button>
                </div>
              </div>
            </div>

            {/* Sección de captación para vendedores - Full Width */}
            <VendedorCaptacionSection 
              onPublicarClick={() => {
                // Aquí puedes implementar la navegación a la página de publicación
                console.log('Navegar a página de publicación');
              }}
            />
          </div>
        </section>
      </main>

      {/* Bottom Sheet de filtros móvil/tablet */}
      {isMobileFiltersOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 lg:hidden flex items-end"
          onClick={() => setIsMobileFiltersOpen(false)}
        >
          <div 
            className="w-full bg-white overflow-y-auto max-h-[85vh] rounded-t-[24px]"
            onClick={(e) => e.stopPropagation()}
            style={{ 
              animation: 'slideInUp 0.3s ease-out',
              boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.1)'
            }}
          >
            {/* Header del bottom sheet */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 rounded-t-[24px] z-10">
              {/* Handle bar */}
              <div className="flex justify-center mb-3">
                <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
              </div>
              
              <div className="flex items-center justify-between">
                <h3
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#0A0A0A'
                  }}
                >
                  Filtros
                </h3>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Contenido del bottom sheet */}
            <div className="p-4 space-y-6 pb-24">
              {/* Card de filtros principales - Solo visible en mobile */}
              <div className="md:hidden bg-gray-50 rounded-[16px] p-4">
                <h4
                  className="mb-4"
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#0A0A0A'
                  }}
                >
                  Filtros principales
                </h4>

                {/* Ordenar por */}
                <div className="mb-6">
                  <label 
                    className="block mb-3" 
                    style={{ 
                      color: '#0A0A0A',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      fontWeight: 500
                    }}
                  >
                    Ordenar por
                  </label>
                  <div className="relative">
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-10 py-2.5 rounded-[100px] appearance-none cursor-pointer transition-colors"
                      style={{ 
                        color: '#0A0A0A',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '13px',
                        fontWeight: 400
                      }}
                    >
                      <option value="relevancia">Más relevantes</option>
                      <option value="precio-asc">Menor precio</option>
                      <option value="precio-desc">Mayor precio</option>
                      <option value="superficie-asc">Menor superficie</option>
                      <option value="superficie-desc">Mayor superficie</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Precio Range */}
                <div className="mb-6">
                  <label 
                    className="block mb-3" 
                    style={{ 
                      color: '#0A0A0A',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      fontWeight: 500
                    }}
                  >
                    Precio
                  </label>
                  <div className="space-y-2">
                    <div className="relative">
                      <select 
                        className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-10 py-2.5 rounded-[100px] appearance-none cursor-pointer transition-colors"
                        style={{ 
                          color: '#0A0A0A',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '13px',
                          fontWeight: 400
                        }}
                      >
                        <option>Mínimo</option>
                        <option>$10.000.000</option>
                        <option>$30.000.000</option>
                        <option>$50.000.000</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                    <div className="relative">
                      <select 
                        className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-10 py-2.5 rounded-[100px] appearance-none cursor-pointer transition-colors"
                        style={{ 
                          color: '#0A0A0A',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '13px',
                          fontWeight: 400
                        }}
                      >
                        <option>Máximo</option>
                        <option>$100.000.000</option>
                        <option>$200.000.000</option>
                        <option>$500.000.000</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Superficie */}
                <div className="mb-6">
                  <label 
                    className="block mb-3" 
                    style={{ 
                      color: '#0A0A0A',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      fontWeight: 500
                    }}
                  >
                    Superficie
                  </label>
                  <div className="space-y-2">
                    <div className="relative">
                      <select 
                        className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-10 py-2.5 rounded-[100px] appearance-none cursor-pointer transition-colors"
                        style={{ 
                          color: '#0A0A0A',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '13px',
                          fontWeight: 400
                        }}
                      >
                        <option>Mínimo</option>
                        <option>1.000 m²</option>
                        <option>5.000 m²</option>
                        <option>10.000 m²</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                    <div className="relative">
                      <select 
                        className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-10 py-2.5 rounded-[100px] appearance-none cursor-pointer transition-colors"
                        style={{ 
                          color: '#0A0A0A',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '13px',
                          fontWeight: 400
                        }}
                      >
                        <option>Máximo</option>
                        <option>50.000 m²</option>
                        <option>100.000 m²</option>
                        <option>500.000 m²</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Tipo de parcela */}
                <div className="mb-6">
                  <label 
                    className="block mb-3" 
                    style={{ 
                      color: '#0A0A0A',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      fontWeight: 500
                    }}
                  >
                    Tipo de parcela
                  </label>
                  <div className="space-y-3">
                    {['Residencial', 'Agrícola', 'Forestal', 'Mixta'].map((tipo) => (
                      <label key={tipo} className="flex items-center cursor-pointer group">
                        <input 
                          type="checkbox" 
                          className="w-5 h-5 rounded border-2 border-gray-300 text-black focus:ring-0 focus:ring-offset-0 cursor-pointer"
                        />
                        <span 
                          className="ml-3 group-hover:text-black transition-colors"
                          style={{ 
                            color: '#0A0A0A',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '14px',
                            fontWeight: 400
                          }}
                        >
                          {tipo}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

              </div>

              {/* Card de filtros secundarios - Visible en mobile y tablet */}
              <div className="bg-gray-50 rounded-[16px] p-4">
                <h4
                  className="mb-4"
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#0A0A0A'
                  }}
                >
                  Filtros rápidos
                </h4>
                <div className="space-y-3">
                    <label className="flex items-center cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 rounded border-2 border-gray-300 text-black focus:ring-0 focus:ring-offset-0 cursor-pointer"
                      />
                      <span 
                        className="ml-3 group-hover:text-black transition-colors"
                        style={{ 
                          color: '#0A0A0A',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '14px',
                          fontWeight: 400
                        }}
                      >
                        Publicaciones destacadas
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 rounded border-2 border-gray-300 text-black focus:ring-0 focus:ring-offset-0 cursor-pointer"
                      />
                      <span 
                        className="ml-3 group-hover:text-black transition-colors"
                        style={{ 
                          color: '#0A0A0A',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '14px',
                          fontWeight: 400
                        }}
                      >
                        Nuevas publicaciones
                      </span>
                    </label>
                  </div>
              </div>

              {/* Botones de acción */}
              <div className="space-y-3">
                <button 
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="w-full bg-[#006B4E] hover:bg-[#01533E] text-white px-6 py-3 rounded-[100px] transition-colors"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    fontWeight: 500
                  }}
                >
                  Aplicar filtros
                </button>
                <button 
                  className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 text-black px-6 py-3 rounded-[100px] transition-colors"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    fontWeight: 500
                  }}
                >
                  Limpiar filtros
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de calculadora móvil */}
      {isMobileCalculatorOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 lg:hidden"
          onClick={() => setIsMobileCalculatorOpen(false)}
        >
          <div 
            className="bg-white rounded-[20px] sm:rounded-[24px] w-full max-w-md max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{ 
              animation: 'fadeInScale 0.3s ease-out',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
          >
            {/* Header del modal */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 rounded-t-[20px] sm:rounded-t-[24px] flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#006B4E',
                      lineHeight: '1.3'
                    }}
                  >
                    Calcula tu presupuesto
                  </h3>
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '13px',
                      fontWeight: 400,
                      color: '#0A0A0A',
                      lineHeight: '1.5'
                    }}
                  >
                    Conocé qué parcela podés comprar
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileCalculatorOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Contenido del modal */}
            <div className="p-4 sm:p-6 space-y-4">
              {/* Presupuesto */}
              <div className="space-y-2">
                <label 
                  className="block" 
                  style={{ 
                    color: '#0A0A0A',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    fontWeight: 500
                  }}
                >
                  Presupuesto disponible
                </label>
                <input
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="Ej: 50.000.000"
                  className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black px-4 py-2.5 rounded-[100px] focus:outline-none transition-colors"
                  style={{ 
                    color: '#0A0A0A', 
                    fontFamily: 'Inter, sans-serif', 
                    fontSize: '14px',
                    fontWeight: 400
                  }}
                />
              </div>

              {/* Cuota aproximada */}
              <div className="space-y-2">
                <label 
                  className="block" 
                  style={{ 
                    color: '#0A0A0A',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    fontWeight: 500
                  }}
                >
                  Cuota mensual aproximada
                </label>
                <div 
                  className="px-4 py-2.5 bg-gray-50 rounded-[100px] border-2 border-gray-200" 
                  style={{ 
                    color: budget ? '#0A0A0A' : '#a1a1a1', 
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    fontWeight: 500
                  }}
                >
                  {budget ? formatCurrency(calculateMonthlyPayment()) : 'Ingresá tu presupuesto'}
                </div>
              </div>

              {/* Zona */}
              <div className="dropdown-container relative space-y-2">
                <label 
                  className="block" 
                  style={{ 
                    color: '#0A0A0A',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    fontWeight: 500
                  }}
                >
                  Zona de interés
                </label>
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'calcZone' ? null : 'calcZone')}
                  className="w-full text-left rounded-[100px] px-4 py-2.5 transition-colors flex items-center justify-between bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black focus:outline-none"
                  style={{ 
                    color: calcZone ? '#0A0A0A' : '#a1a1a1', 
                    fontFamily: 'Inter, sans-serif', 
                    fontSize: '14px',
                    fontWeight: 400
                  }}
                >
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap">{calcZone || 'Seleccionar zona'}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                </button>
                {openDropdown === 'calcZone' && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-white border-2 border-gray-200 rounded-[12px] shadow-lg z-50 overflow-hidden">
                    {['Valle del Aconcagua', 'Valle de Casablanca', 'Cordillera de Los Andes', 'Litoral Central', 'Valle Central'].map((zona) => (
                      <button
                        key={zona}
                        onClick={() => {
                          setCalcZone(zona);
                          setOpenDropdown(null);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-gray-100 transition-colors"
                        style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}
                      >
                        {zona}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Tipo de parcela */}
              <div className="dropdown-container relative space-y-2">
                <label 
                  className="block" 
                  style={{ 
                    color: '#0A0A0A',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    fontWeight: 500
                  }}
                >
                  Tipo de parcela
                </label>
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'calcParcelType' ? null : 'calcParcelType')}
                  className="w-full text-left rounded-[100px] px-4 py-2.5 transition-colors flex items-center justify-between bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black focus:outline-none"
                  style={{ 
                    color: calcParcelType ? '#0A0A0A' : '#a1a1a1', 
                    fontFamily: 'Inter, sans-serif', 
                    fontSize: '14px',
                    fontWeight: 400
                  }}
                >
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap">{calcParcelType || 'Seleccionar tipo'}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                </button>
                {openDropdown === 'calcParcelType' && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-white border-2 border-gray-200 rounded-[12px] shadow-lg z-50 overflow-hidden">
                    {['Agrícola', 'Agrado/Residencial', 'Forestal', 'Mixta'].map((tipo) => (
                      <button
                        key={tipo}
                        onClick={() => {
                          setCalcParcelType(tipo);
                          setOpenDropdown(null);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-gray-100 transition-colors"
                        style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}
                      >
                        {tipo}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Botón Calcular */}
              <button 
                onClick={() => {
                  handleCalculate();
                  setIsMobileCalculatorOpen(false);
                }}
                className="w-full bg-[#006B4E] hover:bg-[#01533E] text-white py-3 rounded-[200px] transition-colors mt-2"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: 500
                }}
              >
                Calcular
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Drawer de menú móvil */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div 
            className="fixed left-0 top-0 bottom-0 w-[85vw] max-w-sm bg-white overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{ 
              animation: 'slideInLeft 0.3s ease-out',
              boxShadow: '4px 0 24px rgba(0, 0, 0, 0.1)'
            }}
          >
            {/* Header del drawer */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-3 sm:p-4 flex items-center justify-between z-10">
              <img 
                src={logo} 
                alt="CompraTuParcela" 
                className="h-10" 
              />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Contenido del menú */}
            <div className="p-3 sm:p-4">
              {/* Navegación principal */}
              <nav className="space-y-2 mb-6">
                <button
                  onClick={() => {
                    onNavigate('parcelas');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 bg-[#efefef] text-black rounded-[12px] transition-colors"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    fontWeight: 500
                  }}
                >
                  Parcelas
                </button>
                <button
                  onClick={() => {
                    onNavigate('inmobiliarias');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-[#efefef] text-black rounded-[12px] transition-colors"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    fontWeight: 500
                  }}
                >
                  Inmobiliarias
                </button>
                <button
                  onClick={() => {
                    onNavigate('como-funciona');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-[#efefef] text-black rounded-[12px] transition-colors"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    fontWeight: 500
                  }}
                >
                  Cómo funciona
                </button>
                <button
                  onClick={() => {
                    onNavigate('recursos');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-[#efefef] text-black rounded-[12px] transition-colors"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    fontWeight: 500
                  }}
                >
                  Recursos
                </button>
              </nav>

              {/* Divisor */}
              <div className="border-t border-gray-200 my-6"></div>

              {/* Botones de acción */}
              <div className="space-y-3">
                <button 
                  className="w-full bg-[#006B4E] hover:bg-[#01533E] text-white py-3 px-4 rounded-[200px] transition-colors"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    fontWeight: 500
                  }}
                >
                  Publicar propiedad
                </button>
                <button 
                  onClick={() => {
                    onNavigate('entry');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-[#efefef] hover:bg-[#dedede] text-black py-3 px-4 rounded-[200px] transition-colors"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    fontWeight: 500
                  }}
                >
                  Ingresar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Sheet de búsqueda inteligente móvil/tablet */}
      {isSmartSearchBottomSheetOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 lg:hidden flex items-end"
          onClick={() => setIsSmartSearchBottomSheetOpen(false)}
        >
          <div 
            className="w-full bg-white overflow-y-auto max-h-[85vh] rounded-t-[24px]"
            onClick={(e) => e.stopPropagation()}
            style={{ 
              animation: 'slideInUp 0.3s ease-out',
              boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.1)'
            }}
          >
            {/* Header del bottom sheet */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 rounded-t-[24px] z-10">
              {/* Handle bar */}
              <div className="flex justify-center mb-3">
                <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
              </div>
              
              <div className="flex items-center justify-between">
                <h3
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#0A0A0A'
                  }}
                >
                  Búsqueda inteligente
                </h3>
                <button
                  onClick={() => setIsSmartSearchBottomSheetOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Contenido del bottom sheet */}
            <div className="p-4 space-y-6 pb-24">
              {/* Descripción */}
              <p 
                className="text-sm"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400, 
                  lineHeight: '1.6', 
                  color: '#737373' 
                }}
              >
                Describe lo que buscas y te mostramos las parcelas que mejor se ajustan.
              </p>

              {/* Campo de texto con botón integrado */}
              <div className="w-full relative">
                <input
                  type="text"
                  value={smartSearchValue}
                  onChange={(e) => setSmartSearchValue(e.target.value)}
                  placeholder="Ej: parcela cerca de un lago"
                  className="w-full h-14 pl-4 pr-32 text-sm text-gray-900 placeholder:text-gray-400 bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black rounded-[16px] focus:outline-none transition-all duration-200"
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400, 
                    lineHeight: '1.5' 
                  }}
                />
                <button 
                  onClick={() => {
                    handleSmartSearch();
                    setIsSmartSearchBottomSheetOpen(false);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 bg-[#efefef] hover:bg-[#dedede] text-black hover:text-[#303030] px-4 text-sm leading-[1.5] font-medium rounded-[12px] transition-colors flex items-center justify-center gap-2"
                  style={{
                    fontFamily: 'Inter, sans-serif'
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Buscar</span>
                </button>
              </div>

              {/* Chips de sugerencias */}
              <div>
                <p 
                  className="text-sm mb-3"
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500, 
                    color: '#0A0A0A' 
                  }}
                >
                  Sugerencias
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <button 
                    onClick={() => toggleBadge('naturaleza')}
                    className={`px-4 py-2 text-sm rounded-[100px] transition-all duration-200 flex items-center gap-2 ${
                      selectedBadges.includes('naturaleza')
                        ? 'bg-[#006B4E] text-white border border-[#006B4E] hover:bg-[#01533E]'
                        : 'text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                    }`}
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 400, 
                      lineHeight: '1.5' 
                    }}
                  >
                    <Trees className="w-4 h-4" />
                    <span>Rodeado de naturaleza</span>
                  </button>
                  <button 
                    onClick={() => toggleBadge('lago-rio')}
                    className={`px-4 py-2 text-sm rounded-[100px] transition-all duration-200 flex items-center gap-2 ${
                      selectedBadges.includes('lago-rio')
                        ? 'bg-[#006B4E] text-white border border-[#006B4E] hover:bg-[#01533E]'
                        : 'text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                    }`}
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 400, 
                      lineHeight: '1.5' 
                    }}
                  >
                    <Waves className="w-4 h-4" />
                    <span>Cerca de lago o río</span>
                  </button>
                  <button 
                    onClick={() => toggleBadge('inversion')}
                    className={`px-4 py-2 text-sm rounded-[100px] transition-all duration-200 flex items-center gap-2 ${
                      selectedBadges.includes('inversion')
                        ? 'bg-[#006B4E] text-white border border-[#006B4E] hover:bg-[#01533E]'
                        : 'text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                    }`}
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 400, 
                      lineHeight: '1.5' 
                    }}
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span>Ideal para inversión</span>
                  </button>
                  <button 
                    onClick={() => toggleBadge('acceso')}
                    className={`px-4 py-2 text-sm rounded-[100px] transition-all duration-200 flex items-center gap-2 ${
                      selectedBadges.includes('acceso')
                        ? 'bg-[#006B4E] text-white border border-[#006B4E] hover:bg-[#01533E]'
                        : 'text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                    }`}
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 400, 
                      lineHeight: '1.5' 
                    }}
                  >
                    <Car className="w-4 h-4" />
                    <span>Buen acceso</span>
                  </button>
                </div>
              </div>

              {/* Botón de aplicar */}
              <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
                <button
                  onClick={() => {
                    handleSmartSearch();
                    setIsSmartSearchBottomSheetOpen(false);
                  }}
                  className="w-full h-12 bg-[#006B4E] hover:bg-[#01533E] text-white rounded-[100px] transition-colors"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    fontWeight: 500
                  }}
                >
                  Aplicar búsqueda
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideInUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

      {/* Modal de mapa */}
      {showMap && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]"
          onClick={() => setShowMap(false)}
        >
          <div 
            className="bg-white rounded-[24px] shadow-2xl w-[90vw] h-[85vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del modal */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 
                style={{ 
                  color: '#0A0A0A',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '24px',
                  fontWeight: 600
                }}
              >
                Buscar en mapa
              </h2>
              <button 
                onClick={() => setShowMap(false)}
                className="hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <X className="w-6 h-6" style={{ color: '#0A0A0A' }} />
              </button>
            </div>

            {/* Mapa Placeholder */}
            <div className="h-[calc(100%-88px)] bg-gray-50 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h3 
                  className="mb-2"
                  style={{ 
                    color: '#0A0A0A',
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '18px',
                    fontWeight: 600
                  }}
                >
                  Vista de mapa
                </h3>
                <p 
                  className="mb-4"
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    color: '#6B6B6B'
                  }}
                >
                  Funcionalidad en desarrollo
                </p>
                <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                  {parcelas.slice(0, 4).map((parcela) => (
                    <button
                      key={parcela.id}
                      onClick={() => {
                        setShowMap(false);
                        onNavigate('parcela-detalle', parcela.id);
                      }}
                      className="text-left p-3 bg-white rounded-xl border border-gray-200 hover:border-[#006B4E] transition-colors"
                    >
                      <p 
                        className="text-xs mb-1"
                        style={{ 
                          fontFamily: 'Montserrat, sans-serif',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#0A0A0A'
                        }}
                      >
                        {parcela.nombre}
                      </p>
                      <p 
                        className="text-xs mb-1"
                        style={{ 
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '11px',
                          color: '#6B6B6B'
                        }}
                      >
                        {parcela.ubicacion}
                      </p>
                      <p 
                        style={{ 
                          fontFamily: 'Montserrat, sans-serif',
                          fontSize: '13px',
                          fontWeight: 700,
                          color: '#006B4E'
                        }}
                      >
                        {parcela.precio}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Asistente Virtual - Contextual para listado de parcelas */}
      <VambeChat context="listado-parcelas" />

      {/* Footer */}
      <footer className="bg-white py-8 sm:py-10 md:py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-x-12 sm:gap-y-10 mb-6 sm:mb-8">
            <div className="space-y-4 sm:col-span-2 lg:col-span-1">
              <img src={logo} alt="CompraTuParcela" className="h-14 sm:h-16" />
              <p style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                fontWeight: 'var(--font-weight-regular)',
                color: '#737373',
                lineHeight: 'var(--line-height-body)'
              }}>
                Plataforma especializada en<br />compra y venta de parcelas
              </p>
            </div>
            
            <div className="space-y-3">
              <div style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-xs)',
                fontWeight: 'var(--font-weight-bold)',
                color: '#0A0A0A',
                letterSpacing: 'var(--letter-spacing-wide)'
              }}>EXPLORAR</div>
              <div className="space-y-2.5">
                <div style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#525252'
                }}>Parcelas</div>
                <div style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#525252'
                }}>Inmobiliarias</div>
                <div style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#525252'
                }}>Blog</div>
              </div>
            </div>

            <div className="space-y-3">
              <div style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-xs)',
                fontWeight: 'var(--font-weight-bold)',
                color: '#0A0A0A',
                letterSpacing: 'var(--letter-spacing-wide)'
              }}>PLATAFORMA</div>
              <div className="space-y-2.5">
                <div style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#525252'
                }}>Cómo funciona</div>
                <div style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#525252'
                }}>Publicar propiedad</div>
                <div style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#525252'
                }}>Planes para inmobiliarias</div>
                <div style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#525252'
                }}>Para brokers</div>
              </div>
            </div>

            <div className="space-y-3">
              <div style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-xs)',
                fontWeight: 'var(--font-weight-bold)',
                color: '#0A0A0A',
                letterSpacing: 'var(--letter-spacing-wide)'
              }}>SOPORTE</div>
              <div className="space-y-2.5">
                <div style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#525252'
                }}>Centro de ayuda</div>
                <div style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#525252'
                }}>Términos y condiciones</div>
                <div style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#525252'
                }}>Política de privacidad</div>
                <div style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#525252'
                }}>Contacto</div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              © 2026 Compra Tu Parcela. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}