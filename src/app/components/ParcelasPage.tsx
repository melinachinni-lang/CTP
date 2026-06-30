import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Expand, FileCheck, Pickaxe, DoorOpen, PenLine, X, Home, ChevronLeft, ChevronRight, Sparkles, Trees, Waves, TrendingUp, Car, Zap, MapPin, SlidersHorizontal, Calculator, Menu, List, Map as MapIcon, Scale } from 'lucide-react';
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
import { useI18n } from '@/app/i18n/i18nContext';

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
  savedParcelaIds?: number[];
  onToggleSaved?: (id: number) => void;
  isLoggedIn?: boolean;
  compareParcelaIds?: number[];
  onToggleCompare?: (id: number) => void;
}

export function ParcelasPage({ onNavigate, initialFilters, parcelaEstados, savedParcelaIds = [], onToggleSaved, isLoggedIn, compareParcelaIds = [], onToggleCompare }: ParcelasPageProps) {
  const { t, language } = useI18n();
  const [animatingSaveId, setAnimatingSaveId] = useState<number | null>(null);
  const [savedProyectoIds, setSavedProyectoIds] = useState<number[]>([]);
  const [animatingProyectoSaveId, setAnimatingProyectoSaveId] = useState<number | null>(null);
  const handleToggleProyecto = (id: number) => {
    setAnimatingProyectoSaveId(id);
    setTimeout(() => setAnimatingProyectoSaveId(null), 300);
    setSavedProyectoIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };
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
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [aiInterpretedQuery, setAiInterpretedQuery] = useState<string | null>(null);
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
          { value: '', label: t.filters.all },
          { value: 'metropolitana', label: t.filters.metropolitan },
          { value: 'valparaiso', label: t.filters.valparaiso },
          { value: 'biobio', label: t.filters.biobio },
          { value: 'araucania', label: t.filters.araucania },
          { value: 'los-lagos', label: t.filters.losLagos },
          { value: 'los-rios', label: t.filters.losRios },
          { value: 'maule', label: t.filters.maule },
          { value: 'ohiggins', label: t.filters.ohiggins },
          { value: 'coquimbo', label: t.filters.coquimbo },
          { value: 'atacama', label: t.filters.atacama },
          { value: 'antofagasta', label: t.filters.antofagasta },
          { value: 'tarapaca', label: t.filters.tarapaca },
          { value: 'arica', label: t.filters.arica },
          { value: 'aysen', label: t.filters.aysen },
          { value: 'magallanes', label: t.filters.magallanes }
        ],
        superficie: [
          { value: '', label: t.filters.all },
          { value: '0-5000', label: t.filters.upTo5k },
          { value: '5000-10000', label: t.filters.from5to10k },
          { value: '10000-50000', label: t.filters.from1to5ha },
          { value: '50000-100000', label: t.filters.from5to10ha },
          { value: '100000-500000', label: t.filters.from10to50ha },
          { value: '500000+', label: t.filters.more50ha }
        ],
        precio: [
          { value: '', label: t.filters.all },
          { value: '0-10000000', label: t.filters.upTo10m },
          { value: '10000000-30000000', label: t.filters.from10to30m },
          { value: '30000000-50000000', label: t.filters.from30to50m },
          { value: '50000000-100000000', label: t.filters.from50to100m },
          { value: '100000000-200000000', label: t.filters.from100to200m },
          { value: '200000+', label: t.filters.more200m }
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

  const featureMap: Record<string, keyof typeof t.features> = {
    'Portón acceso': 'portonAcceso', 'Rol aprobado': 'rolAprobado', 'Factibilidad agua': 'factibilidadAgua',
    'Vista cordillera': 'vistaCordillera', 'Luz instalada': 'luzInstalada', 'Pozo propio': 'pozoPropio',
    'Riego tecnificado': 'riegoTecnificado', 'Luz trifásica': 'luzTrifasica', 'En producción': 'enProduccion',
    'Zona turística': 'zonaTuristica', 'Sobre Ruta 7': 'sobreRuta7', 'Riego disponible': 'riegoDisponible',
    'Rol al día': 'rolAlDia', 'Vista al lago': 'vistaAlLago', 'Condominio cerrado': 'condominioCerrado',
    'Todos los servicios': 'todosLosServicios', 'Potencial turístico': 'potencialTuristico',
    'Vertiente natural': 'vertienteNatural', 'Acceso al río': 'accesoAlRio', 'Bosque nativo': 'bosqueNativo',
    'Uso agrícola': 'usoAgricola', 'Agua disponible': 'aguaDisponible',
    'Alto potencial turístico': 'altoPotencialTuristico', 'Ubicación premium': 'ubicacionPremium',
    'Vista Cerro Castillo': 'vistaCerroCastillo', 'Potencial ecoturístico': 'potencialEcoturistico',
  };
  const translateFeature = (text: string): string => {
    const key = featureMap[text];
    return key ? t.features[key] : text;
  };

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
      labels.push({ type: 'precioMin', label: `${t.explore.from} ${activeFilters.precioMin}` });
    }
    if (activeFilters.precioMax) {
      labels.push({ type: 'precioMax', label: activeFilters.precioMax });
    }
    if (activeFilters.superficieMin) {
      labels.push({ type: 'superficieMin', label: `${t.explore.from} ${activeFilters.superficieMin} m²` });
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
      'naturaleza': t.filters.badgeNature,
      'lago-rio': t.filters.badgeWater,
      'inversion': t.filters.badgeInvestment,
      'acceso': t.filters.badgeAccess,
      'servicios': t.filters.badgeServices
    };
    activeFilters.smartBadges.forEach(badge => {
      labels.push({ type: 'smartBadge', label: badgeLabels[badge] || badge, value: badge });
    });
    activeFilters.tipos.forEach(tipo => {
      labels.push({ type: 'tipo', label: tipo, value: tipo });
    });
    if (activeFilters.destacadas) {
      labels.push({ type: 'destacadas', label: t.explore.filterFeatured });
    }
    if (activeFilters.nuevas) {
      labels.push({ type: 'nuevas', label: t.explore.filterNew });
    }
    
    return labels;
  };

  // Obtener datos dinámicos de parcelas y convertir al formato necesario
  const parcelasData = getAllParcelas().map((parcela, index) => ({
    ...parcela,
    nombre: language === 'en' && parcela.nombreEn ? parcela.nombreEn : parcela.nombre,
    imagen: parcela.imagenes[0],
    caracteristicas: parcela.destacados,
    inmobiliaria: parcela.inmobiliaria.nombre,
    tipoVendedor: parcela.inmobiliaria.tipoVendedor,
    brokerImagen: parcela.inmobiliaria.logo,
    fechaPublicacion: new Date(2024, 0, 15 + (index * 3))
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
        { value: '', label: t.filters.all },
        { value: 'metropolitana', label: t.filters.metropolitan },
        { value: 'valparaiso', label: t.filters.valparaiso },
        { value: 'biobio', label: t.filters.biobio },
        { value: 'araucania', label: t.filters.araucania },
        { value: 'los-lagos', label: t.filters.losLagos },
        { value: 'los-rios', label: t.filters.losRios },
        { value: 'maule', label: t.filters.maule },
        { value: 'ohiggins', label: t.filters.ohiggins },
        { value: 'coquimbo', label: t.filters.coquimbo },
        { value: 'atacama', label: t.filters.atacama },
        { value: 'antofagasta', label: t.filters.antofagasta },
        { value: 'tarapaca', label: t.filters.tarapaca },
        { value: 'arica', label: t.filters.arica },
        { value: 'aysen', label: t.filters.aysen },
        { value: 'magallanes', label: t.filters.magallanes }
      ],
      superficie: [
        { value: '', label: t.filters.all },
        { value: '0-5000', label: t.filters.upTo5k },
        { value: '5000-10000', label: t.filters.from5to10k },
        { value: '10000-50000', label: t.filters.from1to5ha },
        { value: '50000-100000', label: t.filters.from5to10ha },
        { value: '100000-500000', label: t.filters.from10to50ha },
        { value: '500000+', label: t.filters.more50ha }
      ],
      precio: [
        { value: '', label: t.filters.all },
        { value: '0-10000000', label: t.filters.upTo10m },
        { value: '10000000-30000000', label: t.filters.from10to30m },
        { value: '30000000-50000000', label: t.filters.from30to50m },
        { value: '50000000-100000000', label: t.filters.from50to100m },
        { value: '100000000-200000000', label: t.filters.from100to200m },
        { value: '200000+', label: t.filters.more200m }
      ],
      condicion: [
        { value: '', label: t.filters.all },
        { value: 'primer-dueno', label: t.filters.firstOwner },
        { value: 'segundo-dueno', label: t.filters.secondOwner },
        { value: 'tercer-dueno', label: t.filters.thirdOwner },
        { value: 'cuarto-dueno', label: t.filters.fourthOwner }
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
    const query = smartSearchValue.trim();

    // Cerrar panel/bottom sheet de inmediato y arrancar loading
    setIsAiProcessing(true);
    setIsSmartSearchExpanded(false);
    setIsSmartSearchBottomSheetOpen(false);

    // Scroll a resultados para que el usuario vea el estado de carga
    setTimeout(() => {
      const resultsSection = document.getElementById('results-section');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);

    // Simular procesamiento IA (1.8s) → aplicar filtros y mostrar resultados
    setTimeout(() => {
      setIsAiProcessing(false);
      setFiltersApplied(true);
      if (query) setAiInterpretedQuery(query);

      setActiveFilters(prev => {
        const updatedFilters = { ...prev };
        if (query) {
          updatedFilters.smartSearchText = query;
        } else {
          delete updatedFilters.smartSearchText;
        }
        if (selectedBadges.length > 0) {
          updatedFilters.smartBadges = [...selectedBadges];
        } else {
          updatedFilters.smartBadges = [];
        }
        return updatedFilters;
      });
    }, 1800);
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
              aria-label={t.common.openMenu}
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
                  {t.nav.parcelas}
                </button>
                <button
                  onClick={() => onNavigate('inmobiliarias')}
                  className="h-8 px-4 text-sm leading-[1.5] font-normal text-black hover:bg-[#efefef] hover:text-[#303030] rounded-[200px] transition-colors whitespace-nowrap flex items-center justify-center"
                >
                  {t.nav.inmobiliarias}
                </button>
                <button onClick={() => onNavigate('como-funciona')} className="h-8 px-4 text-sm leading-[1.5] font-normal text-black hover:bg-[#efefef] hover:text-[#303030] rounded-[200px] transition-colors whitespace-nowrap flex items-center justify-center">
                  {t.nav.howItWorks}
                </button>
                <button onClick={() => onNavigate('recursos')} className="h-8 px-4 text-sm leading-[1.5] font-normal text-black hover:bg-[#efefef] hover:text-[#303030] rounded-[200px] transition-colors whitespace-nowrap flex items-center justify-center">
                  {t.nav.resources}
                </button>
              </nav>
            </div>

            {/* Action Buttons - Right side */}
            <div className="flex items-center justify-end gap-2 lg:gap-3">
              <button className="h-8 bg-[#006B4E] hover:bg-[#01533E] text-white px-3 lg:px-[20px] text-xs sm:text-sm leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center py-[0px]">
                <span className="hidden sm:inline">{t.nav.publishProperty}</span>
                <span className="sm:hidden">{t.nav.publishShort}</span>
              </button>
              <button
                onClick={() => onNavigate('entry')}
                className="hidden sm:flex h-8 bg-[#efefef] hover:bg-[#dedede] text-black hover:text-[#303030] px-3 lg:px-[20px] text-xs sm:text-sm leading-[1.5] font-medium rounded-[200px] transition-colors items-center justify-center py-[0px]"
              >
                {t.nav.login}
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
                {t.explore.pageTitle}
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
                {t.explore.pageSubtitle}
              </p>
            </div>

            {/* Buscador Unificado */}
            <div className="mb-8 sm:mb-10 md:mb-12 bg-white p-4 sm:p-6 md:p-8 w-full shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-[20px] sm:rounded-[24px] border-2 border-gray-200 transition-all duration-300">
              {/* Fila principal de búsqueda */}
              <div className="flex flex-wrap items-end gap-3 sm:gap-4">
                <div className="space-y-2.5 w-full md:w-auto">
                  <label className="block text-left pl-3 text-gray-700" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                    {t.filters.location}
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
                      <option value="">{t.filters.all}</option>
                      <option value="metropolitana">{t.filters.metropolitan}</option>
                      <option value="valparaiso">{t.filters.valparaiso}</option>
                      <option value="biobio">{t.filters.biobio}</option>
                      <option value="araucania">{t.filters.araucania}</option>
                      <option value="los-lagos">{t.filters.losLagos}</option>
                      <option value="los-rios">{t.filters.losRios}</option>
                      <option value="maule">{t.filters.maule}</option>
                      <option value="ohiggins">{t.filters.ohiggins}</option>
                      <option value="coquimbo">{t.filters.coquimbo}</option>
                      <option value="atacama">{t.filters.atacama}</option>
                      <option value="antofagasta">{t.filters.antofagasta}</option>
                      <option value="tarapaca">{t.filters.tarapaca}</option>
                      <option value="arica">{t.filters.arica}</option>
                      <option value="aysen">{t.filters.aysen}</option>
                      <option value="magallanes">{t.filters.magallanes}</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2.5 w-full md:w-auto">
                  <label className="block text-left pl-3 text-gray-700" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                    {t.filters.area}
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
                      <option value="">{t.filters.all}</option>
                      <option value="0-5000">{t.filters.upTo5k}</option>
                      <option value="5000-10000">{t.filters.from5to10k}</option>
                      <option value="10000-50000">{t.filters.from1to5ha}</option>
                      <option value="50000-100000">{t.filters.from5to10ha}</option>
                      <option value="100000-500000">{t.filters.from10to50ha}</option>
                      <option value="500000+">{t.filters.more50ha}</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2.5 w-full md:w-auto">
                  <label className="block text-left pl-3 text-gray-700" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                    {t.filters.condition}
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
                      <option value="">{t.filters.all}</option>
                      <option value="primer-dueno">{t.filters.firstOwner}</option>
                      <option value="segundo-dueno">{t.filters.secondOwner}</option>
                      <option value="tercer-dueno">{t.filters.thirdOwner}</option>
                      <option value="cuarto-dueno">{t.filters.fourthOwner}</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2.5 w-full md:w-auto">
                  <label className="block text-left pl-3 text-gray-700" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                    {t.filters.priceRange}
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
                      <option value="">{t.filters.all}</option>
                      <option value="0-10000000">{t.filters.upTo10m}</option>
                      <option value="10000000-30000000">{t.filters.from10to30m}</option>
                      <option value="30000000-50000000">{t.filters.from30to50m}</option>
                      <option value="50000000-100000000">{t.filters.from50to100m}</option>
                      <option value="100000000-200000000">{t.filters.from100to200m}</option>
                      <option value="200000000+">{t.filters.more200m}</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                {/* Switch Incluir proyectos */}
                <div className="space-y-2.5 w-full md:w-auto">
                  <label className="block text-left pl-3 text-gray-700" style={{ fontWeight: 'var(--font-weight-medium)' }}>{t.explore.includeProjects}</label>
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
                      {includeProjects ? t.filters.yes : t.filters.no}
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5 w-full md:w-auto">
                  <div className="h-[20px] hidden md:block"></div>
                  <button 
                    onClick={handleSearch}
                    className="bg-[#006B4E] hover:bg-[#01533E] text-white px-[18px] h-[40px] text-sm leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center whitespace-nowrap w-full md:w-auto"
                  >
                    {t.filters.search}
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
                    className="h-[40px] px-[14px] text-sm leading-[1.5] font-medium rounded-[200px] transition-all flex items-center justify-center gap-1.5 whitespace-nowrap w-full md:w-auto relative"
                    style={{
                      backgroundColor: aiInterpretedQuery ? '#006B4E' : '#efefef',
                      color: aiInterpretedQuery ? '#FFFFFF' : '#0A0A0A',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = aiInterpretedQuery ? '#01533E' : '#dedede';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = aiInterpretedQuery ? '#006B4E' : '#efefef';
                    }}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{aiInterpretedQuery ? 'IA activa' : t.filters.smartSearch}</span>
                    {aiInterpretedQuery && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#A8D97F' }} />
                    )}
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
                {/* Estado de procesamiento IA — reemplaza el contenido del panel */}
                {isAiProcessing ? (
                  <div className="py-8 flex flex-col items-center justify-center text-center gap-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#E8F5EE' }}>
                      <Sparkles className="w-7 h-7 animate-pulse" style={{ color: '#006B4E' }} />
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1" style={{ color: '#006B4E', fontFamily: 'Inter, sans-serif' }}>
                        La IA está analizando tu búsqueda…
                      </p>
                      <p className="text-xs" style={{ color: '#737373', fontFamily: 'Inter, sans-serif', lineHeight: '1.6', maxWidth: '320px' }}>
                        Estamos interpretando tu búsqueda y encontrando las parcelas que mejor se adaptan a lo que describes.
                      </p>
                    </div>
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map(i => (
                        <span
                          key={i}
                          className="w-2 h-2 rounded-full animate-pulse"
                          style={{ backgroundColor: '#006B4E', animationDelay: `${i * 0.25}s` }}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                {/* Encabezado con texto y botón cerrar */}
                <div className="flex items-start justify-between mb-4 sm:mb-5 gap-3">
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5" style={{ backgroundColor: '#E8F5EE' }}>
                      <Sparkles className="w-3.5 h-3.5" style={{ color: '#006B4E' }} />
                    </div>
                    <p className="text-xs sm:text-sm" style={{ fontWeight: 400, lineHeight: '1.6', color: '#0A0A0A' }}>
                      {t.filters.smartSearchDesc}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSmartSearchExpanded(false)}
                    className="text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1.5 text-xs sm:text-sm flex-shrink-0"
                    style={{ fontWeight: 400, lineHeight: '1.5' }}
                  >
                    <X className="w-4 h-4" />
                    <span className="hidden sm:inline">{t.filters.close}</span>
                  </button>
                </div>

                {/* Campo de texto con botón integrado */}
                <div className="w-full relative">
                  <input
                    type="text"
                    value={smartSearchValue}
                    onChange={(e) => setSmartSearchValue(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && smartSearchValue.trim()) handleSmartSearch(); }}
                    placeholder={t.filters.smartSearchPlaceholder}
                    className="w-full h-12 sm:h-14 lg:h-16 pl-4 sm:pl-6 pr-4 sm:pr-32 lg:pr-40 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 bg-white border-2 hover:border-gray-300 focus:border-[#006B4E] rounded-[12px] sm:rounded-[16px] focus:outline-none transition-all duration-200"
                    style={{ fontWeight: 400, lineHeight: '1.5', borderColor: '#E5E5E5' }}
                  />
                  <button
                    onClick={handleSmartSearch}
                    disabled={!smartSearchValue.trim() && selectedBadges.length === 0}
                    className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 h-9 sm:h-10 lg:h-12 px-3 sm:px-4 lg:px-5 text-xs sm:text-sm leading-[1.5] font-medium rounded-[8px] sm:rounded-[12px] transition-all flex items-center justify-center gap-1.5 sm:gap-2 disabled:opacity-40"
                    style={{
                      backgroundColor: (smartSearchValue.trim() || selectedBadges.length > 0) ? '#006B4E' : '#efefef',
                      color: (smartSearchValue.trim() || selectedBadges.length > 0) ? '#FFFFFF' : '#0A0A0A',
                    }}
                    onMouseEnter={(e) => {
                      if (smartSearchValue.trim() || selectedBadges.length > 0) e.currentTarget.style.backgroundColor = '#01533E';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = (smartSearchValue.trim() || selectedBadges.length > 0) ? '#006B4E' : '#efefef';
                    }}
                  >
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>Buscar con IA</span>
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
                    <span>{t.filters.badgeNature}</span>
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
                    <span>{t.filters.badgeWater}</span>
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
                    <span>{t.filters.badgeInvestment}</span>
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
                    <span>{t.filters.badgeAccess}</span>
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
                    <span>{t.filters.badgeServices}</span>
                  </button>
                </div>
                  </>
                )}
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
                          {t.explore.calculatorTitle}
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
                          {t.explore.calculatorSubtitle}
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
                          {t.explore.budgetLabel}
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
                          {t.explore.monthlyPayment}
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
                          {budget ? formatCurrency(calculateMonthlyPayment()) : t.explore.enterBudget}
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
                          {t.explore.zoneLabel}
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
                          <span className="overflow-hidden text-ellipsis whitespace-nowrap">{calcZone || t.explore.selectZone}</span>
                          <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                        </button>
                        {openDropdown === 'calcZone' && (
                          <div className="absolute top-full left-0 mt-2 w-full bg-white border-2 border-gray-200 rounded-[12px] shadow-lg z-50 overflow-hidden">
                            {[t.explore.zoneAconcagua, t.explore.zoneCasablanca, t.explore.zoneCordillera, t.explore.zoneLitoral, t.explore.zoneValleCentral].map((zona) => (
                              <button
                                key={zona}
                                onClick={() => { setCalcZone(zona); setOpenDropdown(null); }}
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
                          {t.filters.parcelType}
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
                          <span className="overflow-hidden text-ellipsis whitespace-nowrap">{calcParcelType || t.explore.selectType}</span>
                          <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                        </button>
                        {openDropdown === 'calcParcelType' && (
                          <div className="absolute top-full left-0 mt-2 w-full bg-white border-2 border-gray-200 rounded-[12px] shadow-lg z-50 overflow-hidden">
                            {[t.filters.typeAgricultural, t.explore.typeAgrado, t.filters.typeForestry, t.filters.typeMixed].map((tipo) => (
                              <button
                                key={tipo}
                                onClick={() => { setCalcParcelType(tipo); setOpenDropdown(null); }}
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
                        {t.explore.calculate}
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
                      {t.explore.filtersTitle}
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
                        {t.explore.sortBy}
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
                          <option value="relevancia">{t.filters.relevance}</option>
                          <option value="recientes">{t.filters.mostRecent}</option>
                          <option value="precio-asc">{t.filters.priceLow}</option>
                          <option value="precio-desc">{t.filters.priceHigh}</option>
                          <option value="superficie-asc">{t.filters.areaLow}</option>
                          <option value="superficie-desc">{t.filters.areaHigh}</option>
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
                        {t.explore.price}
                      </label>
                      <div className="space-y-2">
                        <div className="relative">
                          <select className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-10 py-2.5 rounded-[100px] appearance-none cursor-pointer transition-colors" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 400 }}>
                            <option>{t.explore.minimum}</option>
                            <option>$10.000.000</option>
                            <option>$30.000.000</option>
                            <option>$50.000.000</option>
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                        <div className="relative">
                          <select className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-10 py-2.5 rounded-[100px] appearance-none cursor-pointer transition-colors" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 400 }}>
                            <option>{t.explore.maximum}</option>
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
                      <label className="block mb-3" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500 }}>
                        {t.filters.area}
                      </label>
                      <div className="space-y-2">
                        <div className="relative">
                          <select className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-10 py-2.5 rounded-[100px] appearance-none cursor-pointer transition-colors" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 400 }}>
                            <option>{t.explore.minimum}</option>
                            <option>1.000 m²</option>
                            <option>5.000 m²</option>
                            <option>10.000 m²</option>
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                        <div className="relative">
                          <select className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-10 py-2.5 rounded-[100px] appearance-none cursor-pointer transition-colors" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 400 }}>
                            <option>{t.explore.maximum}</option>
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
                      <label className="block mb-3" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500 }}>
                        {t.filters.parcelType}
                      </label>
                      <div className="space-y-3">
                        {[t.filters.typeResidential, t.filters.typeAgricultural, t.filters.typeForestry, t.filters.typeMixed].map((tipo) => (
                          <label key={tipo} className="flex items-center cursor-pointer group">
                            <input type="checkbox" className="w-5 h-5 rounded border-2 border-gray-300 text-black focus:ring-0 focus:ring-offset-0 cursor-pointer" />
                            <span className="ml-3 group-hover:text-black transition-colors" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 400 }}>
                              {tipo}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Filtros rápidos */}
                    <div>
                      <label className="block mb-3" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500 }}>
                        {t.explore.quickFilters}
                      </label>
                      <div className="space-y-3">
                        {[t.explore.filterFeatured, t.explore.filterNew, t.explore.filterLand, t.explore.filterCertified].map((filtro) => (
                          <label key={filtro} className="flex items-center cursor-pointer group">
                            <input type="checkbox" className="w-5 h-5 rounded border-2 border-gray-300 text-black focus:ring-0 focus:ring-offset-0 cursor-pointer" />
                            <span className="ml-3 group-hover:text-black transition-colors" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 400 }}>
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
                      {t.filters.applyFilters}
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
                    {t.explore.filtersTitle}
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
                    {t.explore.calculator}
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
                      {t.explore.sortBy}
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
                        <option value="relevancia">{t.filters.relevance}</option>
                        <option value="recientes">{t.filters.mostRecent}</option>
                        <option value="precio-asc">{t.filters.priceLow}</option>
                        <option value="precio-desc">{t.filters.priceHigh}</option>
                        <option value="superficie-asc">{t.filters.areaLow}</option>
                        <option value="superficie-desc">{t.filters.areaHigh}</option>
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
                      {t.explore.moreFilters}
                    </button>
                  </div>
                </div>

                {/* Contador y filtros activos con selector de vista */}
                <div className="mb-6 mt-4 lg:mt-8">

                  {/* Banner IA activa */}
                  {(isAiProcessing || aiInterpretedQuery) && (
                    <div
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl mb-4 flex-wrap"
                      style={{ backgroundColor: '#F0F9F5', border: '1px solid #C5E8D8' }}
                    >
                      {isAiProcessing ? (
                        <>
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <div className="w-5 h-5 flex-shrink-0 relative">
                              <Sparkles className="w-5 h-5 absolute animate-pulse" style={{ color: '#006B4E' }} />
                            </div>
                            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#006B4E', fontWeight: 500 }}>
                              La IA está analizando tu búsqueda…
                            </span>
                          </div>
                          <div className="flex gap-1">
                            {[0, 1, 2].map(i => (
                              <span
                                key={i}
                                className="w-2 h-2 rounded-full"
                                style={{
                                  backgroundColor: '#006B4E',
                                  opacity: 0.3,
                                  animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`
                                }}
                              />
                            ))}
                          </div>
                        </>
                      ) : aiInterpretedQuery ? (
                        <>
                          <Sparkles className="w-4 h-4 flex-shrink-0" style={{ color: '#006B4E' }} />
                          <div className="flex-1 min-w-0">
                            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#737373', fontWeight: 400 }}>
                              IA interpretó:{' '}
                            </span>
                            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#006B4E', fontWeight: 600 }}>
                              &ldquo;{aiInterpretedQuery}&rdquo;
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              setAiInterpretedQuery(null);
                              setSmartSearchValue('');
                              setSelectedBadges([]);
                              setActiveFilters(prev => {
                                const updated = { ...prev };
                                delete updated.smartSearchText;
                                updated.smartBadges = [];
                                return updated;
                              });
                            }}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs transition-colors flex-shrink-0"
                            style={{ fontFamily: 'Inter, sans-serif', color: '#737373', backgroundColor: '#E8F5EE', fontWeight: 500 }}
                            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#D5EEE2'; }}
                            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#E8F5EE'; }}
                          >
                            <X className="w-3 h-3" />
                            Limpiar IA
                          </button>
                        </>
                      ) : null}
                    </div>
                  )}

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
                      {isAiProcessing ? (
                        <span style={{ color: '#737373' }}>Buscando parcelas…</span>
                      ) : (
                        <>{parcelas.length} {t.explore.parcelasFoundSuffix}</>
                      )}
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
                        <span className="hidden sm:inline">{t.explore.viewList}</span>
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
                        <span className="hidden sm:inline">{t.explore.viewMap}</span>
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
                    {/* Loading overlay mientras IA procesa */}
                    {isAiProcessing ? (
                      <div className="col-span-2 py-16 sm:py-24 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: '#F0F9F5' }}>
                          <Sparkles className="w-8 h-8 animate-pulse" style={{ color: '#006B4E' }} />
                        </div>
                        <h3 className="mb-2" style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h4)', fontWeight: 500, color: '#0A0A0A' }}>
                          Buscando con IA…
                        </h3>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#737373', maxWidth: '340px', lineHeight: '1.6' }}>
                          Estamos interpretando tu búsqueda y encontrando las parcelas que mejor se ajustan a lo que describes.
                        </p>
                        <div className="flex gap-2 mt-5">
                          {[0, 1, 2, 3].map(i => (
                            <div
                              key={i}
                              className="h-1.5 rounded-full animate-pulse"
                              style={{
                                width: i === 1 || i === 2 ? '32px' : '16px',
                                backgroundColor: '#006B4E',
                                opacity: 0.3 + i * 0.2,
                                animationDelay: `${i * 0.15}s`
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    ) : parcelas.length === 0 && filtersApplied ? (
                  // Empty State cuando no hay resultados con filtros aplicados
                  <div className="col-span-2 py-12 sm:py-16 md:py-20">
                    <div className="flex flex-col items-center justify-center text-center max-w-xl mx-auto px-4">
                      {/* Ícono - diferenciado si es búsqueda IA */}
                      <div className="mb-4 sm:mb-6">
                        {aiInterpretedQuery ? (
                          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto" style={{ backgroundColor: '#F0F9F5' }}>
                            <Sparkles size={32} style={{ color: '#006B4E' }} strokeWidth={1.5} />
                          </div>
                        ) : (
                          <>
                            <MapPin size={48} className="sm:hidden" style={{ color: '#CDD8DE' }} strokeWidth={1.5} />
                            <MapPin size={64} className="hidden sm:block" style={{ color: '#CDD8DE' }} strokeWidth={1.5} />
                          </>
                        )}
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
                        {aiInterpretedQuery ? 'La IA no encontró coincidencias' : t.explore.noParcelasFound}
                      </h3>

                      {/* Texto descriptivo */}
                      <p
                        className="mb-4 sm:mb-5"
                        style={{
                          color: '#737373',
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-base)',
                          lineHeight: 'var(--line-height-body)',
                          maxWidth: '480px'
                        }}
                      >
                        {aiInterpretedQuery
                          ? `No encontramos parcelas que coincidan con "${aiInterpretedQuery}". Prueba con otras palabras o usa los filtros para afinar tu búsqueda.`
                          : t.explore.noParcelasFoundDesc}
                      </p>

                      {/* Sugerencias IA */}
                      {aiInterpretedQuery && (
                        <div className="flex flex-wrap gap-2 justify-center mb-6">
                          {['parcela con lago', 'con acceso pavimentado', 'ideal para inversión', 'cerca de Santiago'].map(sug => (
                            <button
                              key={sug}
                              onClick={() => {
                                setSmartSearchValue(sug);
                                setAiInterpretedQuery(null);
                                setTimeout(() => {
                                  if (window.innerWidth < 1024) {
                                    setIsSmartSearchBottomSheetOpen(true);
                                  } else {
                                    setIsSmartSearchExpanded(true);
                                  }
                                }, 100);
                              }}
                              className="px-3 py-1.5 rounded-full text-xs transition-colors"
                              style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#F0F9F5', border: '1px solid #C5E8D8', color: '#006B4E', fontWeight: 500 }}
                              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#D5EEE2'; }}
                              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#F0F9F5'; }}
                            >
                              {sug}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Botones de acción */}
                      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        {aiInterpretedQuery && (
                          <button
                            onClick={() => {
                              setAiInterpretedQuery(null);
                              setSmartSearchValue('');
                              setSelectedBadges([]);
                              setActiveFilters(prev => {
                                const updated = { ...prev };
                                delete updated.smartSearchText;
                                updated.smartBadges = [];
                                return updated;
                              });
                            }}
                            className="h-10 sm:h-11 px-5 sm:px-6 text-sm leading-[1.5] font-medium rounded-[200px] transition-colors w-full sm:w-auto flex items-center justify-center gap-2"
                            style={{ fontFamily: 'var(--font-body)', backgroundColor: '#006B4E', color: '#FFFFFF' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#01533E'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
                          >
                            <Sparkles className="w-4 h-4" />
                            Probar otra búsqueda
                          </button>
                        )}
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
                            setAiInterpretedQuery(null);
                            setSmartSearchValue('');
                            setSelectedBadges([]);
                            setFiltersApplied(false);
                          }}
                          className="h-10 sm:h-11 px-5 sm:px-6 text-sm sm:text-base leading-[1.5] font-medium rounded-[200px] transition-colors shadow-sm w-full sm:w-auto"
                          style={{
                            fontFamily: 'var(--font-body)',
                            backgroundColor: aiInterpretedQuery ? 'transparent' : '#006B4E',
                            color: aiInterpretedQuery ? '#0A0A0A' : '#FFFFFF',
                            border: aiInterpretedQuery ? '2px solid #DEDEDE' : 'none'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = aiInterpretedQuery ? '#F5F5F5' : '#01533E';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = aiInterpretedQuery ? 'transparent' : '#006B4E';
                          }}
                        >
                          {aiInterpretedQuery ? 'Ver todas las parcelas' : t.filters.clearFilters}
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
                          {t.home.backToHome}
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
                        <>
                        {displayedParcelas.map((parcela) => (
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
                            {(!parcelaEstados?.[parcela.id] || parcelaEstados[parcela.id] === 'disponible') && (
                              <span className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: '#006B4E', fontSize: '11px', fontWeight: 600, fontFamily: 'var(--font-body)' }}>{t.explore.parcelTag}</span>
                            )}
                            {parcelaEstados?.[parcela.id] && parcelaEstados[parcela.id] !== 'disponible' && (
                              <div
                                className="absolute top-2 left-2 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
                                style={{
                                  backgroundColor:
                                    (parcelaEstados[parcela.id] === 'reservada' || parcelaEstados[parcela.id] === 'pago-en-validacion') ? '#065F46' :
                                    '#D97706',
                                  color: '#FFFFFF',
                                  fontFamily: 'var(--font-body)',
                                  boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
                                }}
                              >
                                {parcelaEstados[parcela.id] === 'reservandose' && t.status.reservandose}
                                {(parcelaEstados[parcela.id] === 'pago-en-validacion' || parcelaEstados[parcela.id] === 'reservada') && t.status.reservada}
                              </div>
                            )}
                            {/* Botón comparar */}
                            <button
                              onClick={(e) => { e.stopPropagation(); onToggleCompare?.(parcela.id); }}
                              className="absolute top-2 right-10 w-8 h-8 rounded-full flex items-center justify-center transition-all"
                              style={{ backgroundColor: compareParcelaIds.includes(parcela.id) ? '#006B4E' : 'rgba(255,255,255,0.92)', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }}
                              title={compareParcelaIds.includes(parcela.id) ? t.common.removeFromCompare : t.common.addToCompare}
                            >
                              <Scale className="w-4 h-4" style={{ color: compareParcelaIds.includes(parcela.id) ? '#FFFFFF' : '#6B7280' }} />
                            </button>
                            {/* Botón guardar */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onToggleSaved) {
                                  setAnimatingSaveId(parcela.id);
                                  setTimeout(() => setAnimatingSaveId(null), 300);
                                  onToggleSaved(parcela.id);
                                }
                              }}
                              className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all"
                              style={{ backgroundColor: 'rgba(255,255,255,0.92)', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }}
                              title={savedParcelaIds.includes(parcela.id) ? t.common.removeFromSaved : t.common.saveParcel}
                            >
                              <svg
                                viewBox="0 0 24 24"
                                style={{
                                  width: '16px',
                                  height: '16px',
                                  fill: savedParcelaIds.includes(parcela.id) ? '#006B4E' : 'none',
                                  stroke: savedParcelaIds.includes(parcela.id) ? '#006B4E' : '#6B7280',
                                  strokeWidth: 2,
                                  transform: animatingSaveId === parcela.id ? 'scale(1.5)' : 'scale(1)',
                                  transition: 'transform 150ms ease, fill 150ms ease, stroke 150ms ease',
                                }}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                            </button>
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
                                    <span className="font-medium">{translateFeature(parcela.caracteristicas[0].text)}</span>
                                  </div>
                                )}
                                {parcela.caracteristicas?.[1]?.icon && (
                                  <div className="flex items-center gap-2 text-sm" style={{ color: '#0A0A0A' }}>
                                    <div className="[&_svg]:stroke-[#006B4E] [&_path]:fill-none [&_path]:stroke-[#006B4E] [&_circle]:fill-none [&_circle]:stroke-[#006B4E] [&_rect]:fill-none [&_rect]:stroke-[#006B4E] [&_line]:stroke-[#006B4E] [&_polyline]:stroke-[#006B4E]" style={{ color: '#006B4E' }}>{parcela.caracteristicas[1].icon}</div>
                                    <span className="font-medium">{translateFeature(parcela.caracteristicas[1].text)}</span>
                                  </div>
                                )}
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                                {parcela.caracteristicas?.[2]?.icon && (
                                  <div className="flex items-center gap-2 text-sm" style={{ color: '#0A0A0A' }}>
                                    <div className="[&_svg]:stroke-[#006B4E] [&_path]:fill-none [&_path]:stroke-[#006B4E] [&_circle]:fill-none [&_circle]:stroke-[#006B4E] [&_rect]:fill-none [&_rect]:stroke-[#006B4E] [&_line]:stroke-[#006B4E] [&_polyline]:stroke-[#006B4E]" style={{ color: '#006B4E' }}>{parcela.caracteristicas[2].icon}</div>
                                    <span className="font-medium">{translateFeature(parcela.caracteristicas[2].text)}</span>
                                  </div>
                                )}
                                {parcela.caracteristicas?.[3]?.icon && (
                                  <div className="flex items-center gap-2 text-sm" style={{ color: '#0A0A0A' }}>
                                    <div className="[&_svg]:stroke-[#006B4E] [&_path]:fill-none [&_path]:stroke-[#006B4E] [&_circle]:fill-none [&_circle]:stroke-[#006B4E] [&_rect]:fill-none [&_rect]:stroke-[#006B4E] [&_line]:stroke-[#006B4E] [&_polyline]:stroke-[#006B4E]" style={{ color: '#006B4E' }}>{parcela.caracteristicas[3].icon}</div>
                                    <span className="font-medium">{translateFeature(parcela.caracteristicas[3].text)}</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="pt-3" style={{ borderTop: '1px solid #CDD8DE' }}>
                              <div className="mb-3">
                                <div className="text-xs mb-1" style={{ color: '#462611', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.explore.from}</div>
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
                      ))}
                          {includeProjects && proyectos.map((item) => (
                            <div
                              key={`proyecto-${item.id}`}
                              onClick={() => onNavigate('proyecto-detalle', item.id)}
                              className="h-full flex flex-col rounded-xl shadow-sm cursor-pointer overflow-hidden"
                              style={{ border: '2px solid #E5E5E5', transition: 'all 0.3s ease' }}
                              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(70,38,17,0.15)'; }}
                              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'; }}
                            >
                              <div className="relative w-full h-40 overflow-hidden">
                                <img src={item.imagen} alt={item.nombre} className="w-full h-full object-cover" />
                                <span className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: 'rgba(146,64,14,0.55)', backdropFilter: 'blur(4px)', fontSize: '11px', fontWeight: 700, fontFamily: 'var(--font-body)' }}>{t.explore.projectTag}</span>
                                <button
                                  onClick={(e) => { e.stopPropagation(); handleToggleProyecto(item.id); }}
                                  className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center z-10"
                                  style={{ backgroundColor: 'rgba(255,255,255,0.92)', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }}
                                >
                                  <svg viewBox="0 0 24 24" style={{ width: '16px', height: '16px', fill: savedProyectoIds.includes(item.id) ? '#006B4E' : 'none', stroke: savedProyectoIds.includes(item.id) ? '#006B4E' : '#6B7280', strokeWidth: 2, transition: 'all 150ms ease' }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                  </svg>
                                </button>
                              </div>
                              <div className="p-4 flex-1 flex flex-col bg-white">
                                <div className="mb-2">
                                  <span className="px-2.5 py-0.5 rounded-full" style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, backgroundColor: item.estado === 'En venta' ? '#DCFCE7' : item.estado === 'Próximamente' ? '#FEF3C7' : '#E0E7FF', color: item.estado === 'En venta' ? '#166534' : item.estado === 'Próximamente' ? '#854D0E' : '#3730A3', border: `1px solid ${item.estado === 'En venta' ? '#BBF7D0' : item.estado === 'Próximamente' ? '#FDE68A' : '#C7D2FE'}` }}>{item.estado === 'En venta' ? t.status.enVenta : item.estado === 'Próximamente' ? t.status.proximamente : t.status.enConstruccion}</span>
                                </div>
                                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'var(--font-size-body-lg)', color: '#0A0A0A', marginBottom: '4px' }}>{language === 'en' && item.nombreEn ? item.nombreEn : item.nombre}</h3>
                                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373', marginBottom: '12px' }}>{item.ubicacion}, {item.region}</p>
                                <div className="space-y-1 mb-3">
                                  <div className="flex justify-between"><span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF' }}>{t.explore.disponibles}</span><span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: '#0A0A0A' }}>{item.parcelasDisponibles} de {item.totalParcelas}</span></div>
                                  <div className="flex justify-between"><span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF' }}>{t.explore.from}</span><span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: '#0A0A0A' }}>{item.superficieDesde}</span></div>
                                </div>
                                <div className="mt-auto pt-3" style={{ borderTop: '1px solid #F3F4F6' }}>
                                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF' }}>{t.explore.from}</p>
                                  <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-h3)', fontWeight: 700, color: '#0A0A0A' }}>{item.precioDesde}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
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
                            {t.explore.loadingMore}
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
            {!includeProjects && <div id="proyectos-section" className="py-12 sm:py-14 md:py-16 bg-white">
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
                    {t.explore.projectsTitle}
                  </h2>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    color: '#737373',
                    fontSize: 'var(--font-size-body-base)',
                    lineHeight: 'var(--line-height-body)'
                  }}>
                    {t.explore.projectsDesc}
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
                    aria-label={t.common.previous}
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
                              <span className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: 'rgba(146, 64, 14, 0.55)', backdropFilter: 'blur(4px)', fontSize: '11px', fontWeight: 700, fontFamily: 'var(--font-body)' }}>{t.explore.projectTag}</span>
                              {/* Botón favorito */}
                              <button
                                onClick={(e) => { e.stopPropagation(); handleToggleProyecto(proyecto.id); }}
                                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10"
                                style={{ backgroundColor: 'rgba(255,255,255,0.92)', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }}
                                title={savedProyectoIds.includes(proyecto.id) ? t.common.removeFromSaved : t.common.saveProject}
                              >
                                <svg viewBox="0 0 24 24" style={{ width: '16px', height: '16px', fill: savedProyectoIds.includes(proyecto.id) ? '#006B4E' : 'none', stroke: savedProyectoIds.includes(proyecto.id) ? '#006B4E' : '#6B7280', strokeWidth: 2, transform: animatingProyectoSaveId === proyecto.id ? 'scale(1.5)' : 'scale(1)', transition: 'transform 150ms ease, fill 150ms ease' }}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                              </button>
                            </div>

                            {/* Contenido */}
                            <div className="p-4 sm:p-5 flex-1 flex flex-col">
                              {/* Badge de estado */}
                              <div className="mb-2">
                                <span
                                  className="px-2.5 py-0.5 rounded-full"
                                  style={{
                                    fontFamily: 'var(--font-body)',
                                    fontSize: '11px',
                                    fontWeight: 600,
                                    backgroundColor: proyecto.estado === 'En venta' ? '#DCFCE7' : proyecto.estado === 'Próximamente' ? '#FEF3C7' : '#E0E7FF',
                                    color: proyecto.estado === 'En venta' ? '#166534' : proyecto.estado === 'Próximamente' ? '#854D0E' : '#3730A3',
                                    border: `1px solid ${proyecto.estado === 'En venta' ? '#BBF7D0' : proyecto.estado === 'Próximamente' ? '#FDE68A' : '#C7D2FE'}`
                                  }}
                                >
                                  {proyecto.estado === 'En venta' ? t.status.enVenta : proyecto.estado === 'Próximamente' ? t.status.proximamente : t.status.enConstruccion}
                                </span>
                              </div>
                              {/* Nombre y ubicación */}
                              <h3 style={{
                                fontFamily: 'var(--font-heading)',
                                fontWeight: 'var(--font-weight-medium)',
                                fontSize: 'var(--font-size-body-lg)',
                                color: '#0A0A0A',
                                marginBottom: '0.25rem',
                                lineHeight: 'var(--line-height-heading)'
                              }}>
                                {language === 'en' && proyecto.nombreEn ? proyecto.nombreEn : proyecto.nombre}
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
                                    {t.explore.disponibles}
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
                                    {t.explore.from}
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
                                  {t.explore.from}
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
                    aria-label={t.common.next}
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
                    {t.explore.viewAllProjects}
                  </button>
                </div>
              </div>
            </div>}

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
                  {t.explore.filtersTitle}
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
                  {t.explore.mainFilters}
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
                    {t.explore.sortBy}
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
                      <option value="relevancia">{t.filters.relevance}</option>
                      <option value="precio-asc">{t.filters.priceLow}</option>
                      <option value="precio-desc">{t.filters.priceHigh}</option>
                      <option value="superficie-asc">{t.filters.areaLow}</option>
                      <option value="superficie-desc">{t.filters.areaHigh}</option>
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
                    {t.explore.price}
                  </label>
                  <div className="space-y-2">
                    <div className="relative">
                      <select className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-10 py-2.5 rounded-[100px] appearance-none cursor-pointer transition-colors" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 400 }}>
                        <option>{t.explore.minimum}</option>
                        <option>$10.000.000</option>
                        <option>$30.000.000</option>
                        <option>$50.000.000</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                    <div className="relative">
                      <select className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-10 py-2.5 rounded-[100px] appearance-none cursor-pointer transition-colors" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 400 }}>
                        <option>{t.explore.maximum}</option>
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
                  <label className="block mb-3" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500 }}>
                    {t.filters.area}
                  </label>
                  <div className="space-y-2">
                    <div className="relative">
                      <select className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-10 py-2.5 rounded-[100px] appearance-none cursor-pointer transition-colors" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 400 }}>
                        <option>{t.explore.minimum}</option>
                        <option>1.000 m²</option>
                        <option>5.000 m²</option>
                        <option>10.000 m²</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                    <div className="relative">
                      <select className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-10 py-2.5 rounded-[100px] appearance-none cursor-pointer transition-colors" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 400 }}>
                        <option>{t.explore.maximum}</option>
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
                  <label className="block mb-3" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500 }}>
                    {t.filters.parcelType}
                  </label>
                  <div className="space-y-3">
                    {[t.filters.typeResidential, t.filters.typeAgricultural, t.filters.typeForestry, t.filters.typeMixed].map((tipo) => (
                      <label key={tipo} className="flex items-center cursor-pointer group">
                        <input type="checkbox" className="w-5 h-5 rounded border-2 border-gray-300 text-black focus:ring-0 focus:ring-offset-0 cursor-pointer" />
                        <span className="ml-3 group-hover:text-black transition-colors" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 400 }}>
                          {tipo}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

              </div>

              {/* Card de filtros secundarios - Visible en mobile y tablet */}
              <div className="bg-gray-50 rounded-[16px] p-4">
                <h4 className="mb-4" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', fontWeight: 600, color: '#0A0A0A' }}>
                  {t.explore.quickFilters}
                </h4>
                <div className="space-y-3">
                  <label className="flex items-center cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-2 border-gray-300 text-black focus:ring-0 focus:ring-offset-0 cursor-pointer" />
                    <span className="ml-3 group-hover:text-black transition-colors" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 400 }}>
                      {t.explore.featuredListings}
                    </span>
                  </label>
                  <label className="flex items-center cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-2 border-gray-300 text-black focus:ring-0 focus:ring-offset-0 cursor-pointer" />
                    <span className="ml-3 group-hover:text-black transition-colors" style={{ color: '#0A0A0A', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 400 }}>
                      {t.explore.newListings}
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
                  {t.filters.applyFilters}
                </button>
                <button
                  className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 text-black px-6 py-3 rounded-[100px] transition-colors"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    fontWeight: 500
                  }}
                >
                  {t.filters.clearFilters}
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
                    {t.explore.calculatorTitle}
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
                    {t.explore.calculatorSubtitle}
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
                  {t.explore.budgetLabel}
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
                  {t.explore.monthlyPayment}
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
                  {budget ? formatCurrency(calculateMonthlyPayment()) : t.explore.enterBudget}
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
                  {t.explore.zoneLabel}
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
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap">{calcZone || t.explore.selectZone}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                </button>
                {openDropdown === 'calcZone' && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-white border-2 border-gray-200 rounded-[12px] shadow-lg z-50 overflow-hidden">
                    {[t.explore.zoneAconcagua, t.explore.zoneCasablanca, t.explore.zoneCordillera, t.explore.zoneLitoral, t.explore.zoneValleCentral].map((zona) => (
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
                  {t.filters.parcelType}
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
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap">{calcParcelType || t.explore.selectType}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                </button>
                {openDropdown === 'calcParcelType' && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-white border-2 border-gray-200 rounded-[12px] shadow-lg z-50 overflow-hidden">
                    {[t.filters.typeAgricultural, t.explore.typeAgrado, t.filters.typeForestry, t.filters.typeMixed].map((tipo) => (
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
                {t.explore.calculate}
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
                  {t.nav.parcelas}
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
                  {t.nav.inmobiliarias}
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
                  {t.nav.howItWorks}
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
                  {t.nav.resources}
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
                  {t.nav.publishProperty}
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
                  {t.nav.login}
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
                  {t.filters.smartSearch}
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
              {isAiProcessing ? (
                /* Estado de carga IA dentro del bottom sheet */
                <div className="py-16 flex flex-col items-center justify-center text-center gap-4">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#E8F5EE' }}>
                    <Sparkles className="w-8 h-8 animate-pulse" style={{ color: '#006B4E' }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1" style={{ color: '#006B4E', fontFamily: 'Inter, sans-serif' }}>
                      La IA está analizando tu búsqueda…
                    </p>
                    <p className="text-xs" style={{ color: '#737373', fontFamily: 'Inter, sans-serif', lineHeight: '1.6', maxWidth: '280px' }}>
                      Estamos interpretando tu búsqueda y encontrando las parcelas que mejor se adaptan a lo que describes.
                    </p>
                  </div>
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map(i => (
                      <span key={i} className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: '#006B4E', animationDelay: `${i * 0.25}s` }} />
                    ))}
                  </div>
                </div>
              ) : (
                <>
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
                    {t.filters.smartSearchDesc}
                  </p>

                  {/* Campo de texto con botón integrado */}
                  <div className="w-full relative">
                    <input
                      type="text"
                      value={smartSearchValue}
                      onChange={(e) => setSmartSearchValue(e.target.value)}
                      placeholder={t.filters.smartSearchPlaceholder}
                      className="w-full h-14 pl-4 pr-32 text-sm text-gray-900 placeholder:text-gray-400 bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black rounded-[16px] focus:outline-none transition-all duration-200"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 400,
                        lineHeight: '1.5'
                      }}
                    />
                    <button
                      onClick={handleSmartSearch}
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-10 bg-[#efefef] hover:bg-[#dedede] text-black hover:text-[#303030] px-4 text-sm leading-[1.5] font-medium rounded-[12px] transition-colors flex items-center justify-center gap-2"
                      style={{
                        fontFamily: 'Inter, sans-serif'
                      }}
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>{t.filters.search}</span>
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
                      {t.filters.suggestions}
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
                        <span>{t.filters.badgeNature}</span>
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
                        <span>{t.filters.badgeWater}</span>
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
                        <span>{t.filters.badgeInvestment}</span>
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
                        <span>{t.filters.badgeAccess}</span>
                      </button>
                    </div>
                  </div>

                  {/* Botón de aplicar */}
                  <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
                    <button
                      onClick={handleSmartSearch}
                      className="w-full h-12 bg-[#006B4E] hover:bg-[#01533E] text-white rounded-[100px] transition-colors"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '15px',
                        fontWeight: 500
                      }}
                    >
                      {t.filters.applySearch}
                    </button>
                  </div>
                </>
              )}
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
                {t.explore.searchOnMap}
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
                  {t.explore.mapView}
                </h3>
                <p
                  className="mb-4"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    color: '#6B6B6B'
                  }}
                >
                  {t.explore.inDevelopment}
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
                {t.home.footerDesc}
              </p>
            </div>
            
            <div className="space-y-3">
              <div style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-xs)',
                fontWeight: 'var(--font-weight-bold)',
                color: '#0A0A0A',
                letterSpacing: 'var(--letter-spacing-wide)'
              }}>{t.home.footerExplore.toUpperCase()}</div>
              <div className="space-y-2.5">
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#525252'
                }}>{t.nav.parcelas}</div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#525252'
                }}>{t.nav.inmobiliarias}</div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#525252'
                }}>{t.home.footerBlog}</div>
              </div>
            </div>

            <div className="space-y-3">
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-xs)',
                fontWeight: 'var(--font-weight-bold)',
                color: '#0A0A0A',
                letterSpacing: 'var(--letter-spacing-wide)'
              }}>{t.home.footerPlatform.toUpperCase()}</div>
              <div className="space-y-2.5">
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#525252'
                }}>{t.home.footerHowItWorks}</div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#525252'
                }}>{t.home.footerPublish}</div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#525252'
                }}>{t.home.footerPlans}</div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#525252'
                }}>{t.home.footerBrokers}</div>
              </div>
            </div>

            <div className="space-y-3">
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-xs)',
                fontWeight: 'var(--font-weight-bold)',
                color: '#0A0A0A',
                letterSpacing: 'var(--letter-spacing-wide)'
              }}>{t.home.footerSupport.toUpperCase()}</div>
              <div className="space-y-2.5">
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#525252'
                }}>{t.home.footerHelp}</div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#525252'
                }}>{t.home.footerTerms}</div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#525252'
                }}>{t.home.footerPrivacy}</div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#525252'
                }}>{t.home.footerContact}</div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              {t.home.footerCopyright}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}