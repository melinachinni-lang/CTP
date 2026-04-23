import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { FileCheck, Pickaxe, Expand, PenLine, DoorOpen, X, ChevronDown, Sparkles, Trees, Waves, Home, TrendingUp, Car, Zap, ChevronLeft, ChevronRight, Search, Users, CheckCircle, CloudOff, Mail, Phone, Clock } from 'lucide-react';
import { PublicadoPorCompact } from '@/app/components/PublicadoPorCompact';
import { VambeChat } from '@/app/components/VambeChat';
import { SocialMediaBanner } from '@/app/components/SocialMediaBanner';
import { Navbar } from '@/app/components/Navbar';
import { PrecioDisplay } from '@/app/components/PrecioDisplay';
import { ParcelaCardImage } from '@/app/components/ParcelaCardImage';
import { ProjectCardImage } from '@/app/components/ProjectCardImage';
import logo from 'figma:asset/a4719ce43ce52ee49df30a2a5c090c8a8b743667.png';
import heroBackground from 'figma:asset/46be9646c60608d21a829a86b189efb4cfc6cbbc.png';
import topoBackground from 'figma:asset/1f8d7be2ded66ac9a17238954e64e513a352a1e5.png';
import ilustracionDocumento from 'figma:asset/e580ccb68b7f2064ee0b1464681e6594dcb5a797.png';
import ilustracionPersonas from 'figma:asset/cea3a2e78c2e93998f554eac9d05a789f2a4689a.png';
import ilustracionCheck from 'figma:asset/3941caca813963d29f797c0f3077415648af33f4.png';

const heroBackgroundFallback = 'https://images.unsplash.com/photo-1761170570787-04bcab4609a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXJhbCUyMGxhbmQlMjB2YWxsZXl8ZW58MXx8fHwxNzY5MTExODc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

interface HomeWireframeProps {
  onNavigate: (screen: string, id?: number, data?: string | {
    ubicacion: string;
    superficie: string;
    condicion: string;
    precio: string;
    tipo: string;
  }) => void;
  isLoggedIn?: boolean;
  currentUser?: { name: string; email: string } | null;
  onLogout?: () => void;
  initialLoadingError?: boolean;
  onOpenPublishModal?: () => void;
  onNavigateToPublish?: () => void;
}

export function HomeWireframe({ onNavigate, isLoggedIn = false, currentUser, onLogout, initialLoadingError = false, onOpenPublishModal, onNavigateToPublish }: HomeWireframeProps) {
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedValues, setSelectedValues] = useState({
    ubicacion: '',
    superficie: '',
    condicion: '',
    precio: '',
    tipo: ''
  });
  const inmobiliariasHeaderRef = useRef<HTMLDivElement>(null);
  const [isInmobiliariasHeaderVisible, setIsInmobiliariasHeaderVisible] = useState(false);
  const [isInmobiliariasHovered, setIsInmobiliariasHovered] = useState(false);
  const [isSmartSearchExpanded, setIsSmartSearchExpanded] = useState(false);
  const [smartSearchValue, setSmartSearchValue] = useState('');
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useState<'inmobiliarias' | 'brokers'>('inmobiliarias');
  const [isScrolling, setIsScrolling] = useState(false);
  const [includeProjects, setIncludeProjects] = useState(false);
  
  // Estados para mobile
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isSmartSearchBottomSheetOpen, setIsSmartSearchBottomSheetOpen] = useState(false);
  
  // Estado para error de carga
  // Se inicializa con la prop initialLoadingError
  const [loadingError, setLoadingError] = useState(initialLoadingError);

  // Estado para modal de contacto
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Actualizar estado cuando cambie la prop initialLoadingError
  useEffect(() => {
    setLoadingError(initialLoadingError);
  }, [initialLoadingError]);

  // Estados para la calculadora de presupuesto
  const [budget, setBudget] = useState<string>('');
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [loanTermYears, setLoanTermYears] = useState<number>(15);
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(4.5);
  const [calcZone, setCalcZone] = useState<string>('');
  const [calcParcelType, setCalcParcelType] = useState<string>('');
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);

  // Función para calcular la cuota mensual
  const calculateMonthlyPayment = () => {
    if (!budget || parseFloat(budget) === 0) return 0;
    
    const totalPrice = parseFloat(budget);
    const downPayment = (totalPrice * downPaymentPercent) / 100;
    const loanAmount = totalPrice - downPayment;
    const monthlyRate = annualInterestRate / 100 / 12;
    const numberOfPayments = loanTermYears * 12;
    
    if (monthlyRate === 0) return loanAmount / numberOfPayments;
    
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    return monthlyPayment;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Función para reintentar carga de parcelas
  const handleRetry = () => {
    // Navegar al home normal (sin error)
    onNavigate('home');
  };

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

  // Intersection Observer para el header de inmobiliarias
  useEffect(() => {
    const currentRef = inmobiliariasHeaderRef.current;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInmobiliariasHeaderVisible(true);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px'
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Manejador para scroll horizontal con la rueda del mouse
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const slickList = container.querySelector('.slick-list') as HTMLElement;
    if (slickList) {
      e.preventDefault();
      slickList.scrollLeft += e.deltaY;
    }
  };

  // Datos de dropdowns
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
    condicion: [
      { value: '', label: 'Todos' },
      { value: 'primer-dueno', label: 'Primer dueño' },
      { value: 'segundo-dueno', label: 'Segundo dueño' },
      { value: 'tercer-dueno', label: 'Tercer dueño' },
      { value: 'cuarto-dueno', label: 'Cuarto dueño o más' }
    ],
    precio: [
      { value: '', label: 'Todos' },
      { value: '0-10000000', label: 'Hasta $10.000.000' },
      { value: '10000000-30000000', label: '$10M - $30M' },
      { value: '30000000-50000000', label: '$30M - $50M' },
      { value: '50000000-100000000', label: '$50M - $100M' },
      { value: '100000000-200000000', label: '$100M - $200M' },
      { value: '200000000+', label: 'Más de $200M' }
    ],
    tipo: [
      { value: '', label: 'Todos' },
      { value: 'parcelas', label: 'Parcelas' }
    ]
  };

  const handleDropdownSelect = (dropdown: string, value: string) => {
    setSelectedValues(prev => ({ ...prev, [dropdown]: value }));
    setOpenDropdown(null);
  };

  const getSelectedLabel = (dropdown: keyof typeof dropdownOptions) => {
    const value = selectedValues[dropdown];
    const option = dropdownOptions[dropdown].find(opt => opt.value === value);
    return option ? option.label : dropdownOptions[dropdown][0].label;
  };

  const toggleBadge = (badgeId: string) => {
    setSelectedBadges(prev => {
      if (prev.includes(badgeId)) {
        return prev.filter(id => id !== badgeId);
      } else {
        return [...prev, badgeId];
      }
    });
  };

  // Función para manejar búsqueda inteligente
  const handleSmartSearch = () => {
    // Crear objeto de filtros basado en badges seleccionados o texto de búsqueda
    const smartFilters = {
      ubicacion: '',
      superficie: '',
      condicion: '',
      precio: '',
      tipo: 'parcelas'
    };

    // Analizar texto de búsqueda inteligente
    const searchText = smartSearchValue.toLowerCase();
    
    // Mapeo de palabras clave a filtros
    if (searchText.includes('lago') || searchText.includes('río') || selectedBadges.includes('lago-rio')) {
      smartFilters.ubicacion = 'aysen'; // Región con lagos
    }
    
    if (searchText.includes('naturaleza') || searchText.includes('bosque') || selectedBadges.includes('naturaleza')) {
      smartFilters.ubicacion = 'aysen';
      smartFilters.superficie = '10000-50000'; // Parcelas medianas en naturaleza
    }
    
    if (searchText.includes('inversión') || searchText.includes('invertir') || selectedBadges.includes('inversion')) {
      smartFilters.precio = '50000000-100000000'; // Rango medio-alto para inversión
    }
    
    if (searchText.includes('grande') || searchText.includes('amplia')) {
      smartFilters.superficie = '100000-500000'; // Parcelas grandes
    }
    
    if (searchText.includes('pequeña') || searchText.includes('compacta')) {
      smartFilters.superficie = '0-5000'; // Parcelas pequeñas
    }
    
    if (searchText.includes('barata') || searchText.includes('económica')) {
      smartFilters.precio = '30000000-50000000'; // Precio bajo-medio
    }
    
    if (searchText.includes('acceso') || searchText.includes('carretera') || selectedBadges.includes('acceso')) {
      smartFilters.ubicacion = 'aysen'; // Región con buenas rutas
    }
    
    if (searchText.includes('servicios') || searchText.includes('luz') || searchText.includes('agua') || selectedBadges.includes('servicios')) {
      smartFilters.ubicacion = 'aysen'; // Región con servicios
    }

    // Si hay texto pero no se detectaron palabras clave específicas, buscar en Aysén por defecto
    if (searchText && !smartFilters.ubicacion && !smartFilters.precio && !smartFilters.superficie) {
      smartFilters.ubicacion = 'aysen';
    }

    // Si solo hay badges sin texto
    if (!searchText && selectedBadges.length > 0) {
      if (!smartFilters.ubicacion) {
        smartFilters.ubicacion = 'aysen';
      }
    }

    // Navegar a página de parcelas con filtros inteligentes
    onNavigate('parcelas', undefined, smartFilters);
  };

  // Configuración del carrusel
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        }
      }
    ]
  };

  // Datos de inmobiliarias
  const inmobiliarias = [
    { id: 1, nombre: 'Premium Lands', logo: 'https://images.unsplash.com/photo-1741162917720-adc367c3af75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwbG9nbyUyMG1pbmltYWx8ZW58MXx8fHwxNzY5MTg1MjU1fDA&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 2, nombre: 'Propiedades del Valle', logo: 'https://images.unsplash.com/photo-1767706508376-84ab4d8ca165?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9wZXJ0eSUyMGNvbXBhbnklMjBsb2dvfGVufDF8fHx8MTc2OTE4MzkyMnww&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 3, nombre: 'Grupo Andino', logo: 'https://images.unsplash.com/photo-1759174712773-bd301ffa2993?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYnJhbmQlMjBsb2dvfGVufDF8fHx8MTc2OTE4NTI1Nnww&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 4, nombre: 'Inversiones Capital', logo: 'https://images.unsplash.com/photo-1658203897456-14cdc8e81146?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wYW55JTIwbG9nbyUyMGRlc2lnbnxlbnwxfHx8fDE3NjkxMDU0MDN8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 5, nombre: 'Torre Business', logo: 'https://images.unsplash.com/photo-1583813166791-525b211bd7ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwZW1ibGVtfGVufDF8fHx8MTc2OTE4NTI1Nnww&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 6, nombre: 'Grupo Inmobiliario', logo: 'https://images.unsplash.com/photo-1741162917720-adc367c3af75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwbG9nbyUyMG1pbmltYWx8ZW58MXx8fHwxNzY5MTg1MjU1fDA&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 7, nombre: 'Capital Inversiones', logo: 'https://images.unsplash.com/photo-1767706508376-84ab4d8ca165?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9wZXJ0eSUyMGNvbXBhbnklMjBsb2dvfGVufDF8fHx8MTc2OTE4MzkyMnww&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 8, nombre: 'Propiedades Premium', logo: 'https://images.unsplash.com/photo-1759174712773-bd301ffa2993?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYnJhbmQlMjBsb2dvfGVufDF8fHx8MTc2OTE4NTI1Nnww&ixlib=rb-4.1.0&q=80&w=1080' },
  ];

  // Datos de brokers
  const brokers = [
    { id: 1, nombre: 'María González', foto: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2OTA2Njg5Mnww&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 2, nombre: 'Carlos Ruiz', foto: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnR8ZW58MXx8fHwxNzY5MDI3Njk5fDA&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 3, nombre: 'Andrea Silva', foto: 'https://images.unsplash.com/photo-1763479169474-728a7de108c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJyb2tlcnxlbnwxfHx8fDE3NjkxMTk0Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 4, nombre: 'Roberto Muñoz', foto: 'https://images.unsplash.com/photo-1589458223095-03eee50f0054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMG1hbnxlbnwxfHx8fDE3NjkwMzE4OTR8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 5, nombre: 'Patricia López', foto: 'https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHdvbWFufGVufDF8fHx8MTc2OTA3OTk4NHww&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 6, nombre: 'Jorge Herrera', foto: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2OTA2Njg5Mnww&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 7, nombre: 'Daniela Torres', foto: 'https://images.unsplash.com/photo-1763479169474-728a7de108c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJyb2tlcnxlbnwxfHx8fDE3NjkxMTk0Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 8, nombre: 'Francisco Vega', foto: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnR8ZW58MXx8fHwxNzY5MDI3Njk5fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  ];

  // Efecto para el scroll infinito del carrusel
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      if (isScrolling) return;
      
      const scrollLeft = carousel.scrollLeft;
      const scrollWidth = carousel.scrollWidth;
      const clientWidth = carousel.clientWidth;
      
      // Calcular el ancho de un conjunto de items
      const itemWidth = 120 + 28; // ancho del item + gap
      const totalItems = selectedTab === 'inmobiliarias' ? inmobiliarias.length : brokers.length;
      const setWidth = itemWidth * totalItems;
      
      // Si llegamos al final, volver al inicio
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        setIsScrolling(true);
        carousel.scrollLeft = scrollLeft - setWidth;
        setTimeout(() => setIsScrolling(false), 50);
      }
      
      // Si llegamos al inicio (scrolleando hacia atrás), ir al final
      if (scrollLeft <= 10) {
        setIsScrolling(true);
        carousel.scrollLeft = scrollLeft + setWidth;
        setTimeout(() => setIsScrolling(false), 50);
      }
    };

    carousel.addEventListener('scroll', handleScroll);
    
    return () => {
      carousel.removeEventListener('scroll', handleScroll);
    };
  }, [selectedTab, isScrolling]);

  // Efecto para inicializar el scroll en el conjunto del medio
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Posicionar en el conjunto del medio para permitir scroll en ambas direcciones
    const itemWidth = 120 + 28; // ancho del item + gap
    const totalItems = selectedTab === 'inmobiliarias' ? inmobiliarias.length : brokers.length;
    const setWidth = itemWidth * totalItems;
    
    // Scroll inicial al conjunto del medio
    setTimeout(() => {
      carousel.scrollLeft = setWidth;
    }, 0);
  }, [selectedTab]);

  // Datos de las parcelas
  const parcelas = [
    {
      id: 1,
      nombre: 'Parcela Vista al Valle',
      ubicacion: 'Pirque, Región Metropolitana',
      imagen: 'https://images.unsplash.com/photo-1755439917128-c4cede457fa6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kJTIwcGxvdCUyMHJ1cmFsfGVufDF8fHx8MTc2ODg2NTMxMXww&ixlib=rb-4.1.0&q=80&w=1080',
      imagenes: [
        'https://images.unsplash.com/photo-1755439917128-c4cede457fa6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kJTIwcGxvdCUyMHJ1cmFsfGVufDF8fHx8MTc2ODg2NTMxMXww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1721592178758-b90205b29214?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXJhbCUyMGxhbmQlMjBhZXJpYWwlMjB2aWV3fGVufDF8fHx8MTc2OTExMTE3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1760811231126-be5c3587db10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHRlcnJhaW4lMjBjaGlsZXxlbnwxfHx8fDE3NjkxMDg2OTd8MA&ixlib=rb-4.1.0&q=80&w=1080'
      ],
      superficie: '5.000 m²',
      precio: '$85.000.000',
      caracteristicas: [
        { icon: <Expand className="w-4 h-4" />, text: '5.000 m²' },
        { icon: <FileCheck className="w-4 h-4" />, text: 'Rol aprobado' },
        { icon: <Pickaxe className="w-4 h-4" />, text: 'Camino ejecutado' },
        { icon: <PenLine className="w-4 h-4" />, text: 'Listo escritura' }
      ],
      inmobiliaria: 'Inmobiliaria Sur Propiedades',
      tipoVendedor: 'Inmobiliaria',
      brokerImagen: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2OTA2Njg5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 2,
      nombre: 'Parcela Los Robles',
      ubicacion: 'Colina, Región Metropolitana',
      imagen: 'https://images.unsplash.com/photo-1768715825473-1213f87ec005?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VudHJ5c2lkZSUyMHByb3BlcnR5fGVufDF8fHx8MTc2ODg2NTMxMXww&ixlib=rb-4.1.0&q=80&w=1080',
      imagenes: [
        'https://images.unsplash.com/photo-1768715825473-1213f87ec005?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VudHJ5c2lkZSUyMHByb3BlcnR5fGVufDF8fHx8MTc2ODg2NTMxMXww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1678483874487-a4d6f8ceffe9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjB2YWxsZXklMjBsYW5kfGVufDF8fHx8MTc2OTEwODY5OHww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1640958903934-b116ab32c95b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwdmlldyUyMGxhbmR8ZW58MXx8fHwxNzY5MTA4Njk3fDA&ixlib=rb-4.1.0&q=80&w=1080'
      ],
      superficie: '8.500 m²',
      precio: '$120.000.000',
      caracteristicas: [
        { icon: <Expand className="w-4 h-4" />, text: '8.500 m²' },
        { icon: <DoorOpen className="w-4 h-4" />, text: 'Portón acceso' },
        { icon: <FileCheck className="w-4 h-4" />, text: 'Rol aprobado' },
        { icon: <Pickaxe className="w-4 h-4" />, text: 'Factibilidad agua' }
      ],
      inmobiliaria: 'Inmobiliaria Premium Lands',
      tipoVendedor: 'Inmobiliaria',
      brokerImagen: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnR8ZW58MXx8fHwxNzY5MDI3Njk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 3,
      nombre: 'Parcela Alto Cordillera',
      ubicacion: 'Farellones, Región Metropolitana',
      imagen: 'https://images.unsplash.com/photo-1748711243680-1c4ab4f9979f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmR8ZW58MXx8fHwxNzY4ODY1MzExfDA&ixlib=rb-4.1.0&q=80&w=1080',
      superficie: '12.000 m²',
      precio: '$195.000.000',
      caracteristicas: [
        { icon: <Expand className="w-4 h-4" />, text: '12.000 m²' },
        { icon: <PenLine className="w-4 h-4" />, text: 'Listo escritura' },
        { icon: <Pickaxe className="w-4 h-4" />, text: 'Camino ejecutado' },
        { icon: <FileCheck className="w-4 h-4" />, text: 'Rol aprobado' }
      ],
      inmobiliaria: 'Carolina Morales',
      tipoVendedor: 'Broker',
      brokerImagen: 'https://images.unsplash.com/photo-1763479169474-728a7de108c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJyb2tlcnxlbnwxfHx8fDE3NjkxMTk0Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 4,
      nombre: 'Parcela Campo Verde',
      ubicacion: 'Buin, Región Metropolitana',
      imagen: 'https://images.unsplash.com/photo-1588011882503-2e6061ace84d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwdGVycmFpbnxlbnwxfHx8fDE3Njg4NjUzMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      superficie: '6.500 m²',
      precio: '$95.000.000',
      caracteristicas: [
        { icon: <Expand className="w-4 h-4" />, text: '6.500 m²' },
        { icon: <DoorOpen className="w-4 h-4" />, text: 'Portón acceso' },
        { icon: <FileCheck className="w-4 h-4" />, text: 'Rol aprobado' },
        { icon: <Pickaxe className="w-4 h-4" />, text: 'Camino ejecutado' }
      ],
      inmobiliaria: 'Roberto Silva',
      tipoVendedor: 'Persona natural',
      brokerImagen: 'https://images.unsplash.com/photo-1589458223095-03eee50f0054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMG1hbnxlbnwxfHx8fDE3NjkwMzE4OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 5,
      nombre: 'Parcela El Refugio',
      ubicacion: 'San José de Maipo, RM',
      imagen: 'https://images.unsplash.com/photo-1743670477099-88a9de024f04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXJhbCUyMGVzdGF0ZXxlbnwxfHx8fDE3Njg4NjUzMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      superficie: '10.000 m²',
      precio: '$145.000.000',
      caracteristicas: [
        { icon: <Expand className="w-4 h-4" />, text: '10.000 m²' },
        { icon: <PenLine className="w-4 h-4" />, text: 'Listo escritura' },
        { icon: <FileCheck className="w-4 h-4" />, text: 'Rol aprobado' },
        { icon: <DoorOpen className="w-4 h-4" />, text: 'Portón acceso' }
      ],
      inmobiliaria: 'Inmobiliaria Valle Andino',
      tipoVendedor: 'Inmobiliaria',
      brokerImagen: 'https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHdvbWFufGVufDF8fHx8MTc2OTA3OTk4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 6,
      nombre: 'Parcela Vista Panorámica',
      ubicacion: 'Lampa, Región Metropolitana',
      imagen: 'https://images.unsplash.com/photo-1609126917056-243a15e2e789?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YWxsZXklMjBsYW5kfGVufDF8fHx8MTc2ODg2NTMxM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      superficie: '7.200 m²',
      precio: '$105.000.000',
      caracteristicas: [
        { icon: <Expand className="w-4 h-4" />, text: '7.200 m²' },
        { icon: <Pickaxe className="w-4 h-4" />, text: 'Camino ejecutado' },
        { icon: <FileCheck className="w-4 h-4" />, text: 'Rol aprobado' },
        { icon: <DoorOpen className="w-4 h-4" />, text: 'Portón acceso' }
      ],
      inmobiliaria: 'Inmobiliaria Norte Verde',
      tipoVendedor: 'Inmobiliaria',
      brokerImagen: 'https://images.unsplash.com/photo-1713176988815-47bb84f325b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBsb2dvJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzY5MTE5NDI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  // Si hay error de carga, mostrar solo el estado de error
  if (loadingError) {
    return (
      <div className="min-h-screen relative">
        {/* Navbar */}
        <Navbar 
          onNavigate={onNavigate}
          estado={isLoggedIn ? 'logueado' : 'visitante'}
          onLogout={onLogout}
          userName={currentUser?.name}
          onShowPublishModal={isLoggedIn && onOpenPublishModal ? onOpenPublishModal : () => setShowPublishModal(true)}
        />

        {/* Mensaje de error centrado */}
        <div className="min-h-screen flex items-center justify-center bg-white pt-28">
          <div className="flex flex-col items-center justify-center py-20 px-6 max-w-2xl mx-auto">
            {/* Ícono */}
            <div className="mb-6">
              <CloudOff 
                size={64} 
                style={{ color: 'var(--color-muted-foreground)' }}
                strokeWidth={1.5}
              />
            </div>
            
            {/* Título */}
            <h3 
              className="mb-3 text-center"
              style={{ 
                color: '#0A0A0A',
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--font-size-h3)',
                fontWeight: 'var(--font-weight-medium)'
              }}
            >
              Ocurrió un problema al cargar la página
            </h3>
            
            {/* Texto descriptivo */}
            <p 
              className="mb-8 text-center max-w-md"
              style={{ 
                color: '#737373',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                lineHeight: 'var(--line-height-body)'
              }}
            >
              Hubo un problema al obtener la información. Puedes reintentar ahora o volver al inicio.
            </p>
            
            {/* Botones */}
            <div className="flex gap-3">
              {/* Botón secundario: Volver al inicio */}
              <button
                onClick={() => onNavigate('home')}
                className="h-12 px-6 text-base leading-[1.5] font-medium rounded-[200px] transition-all border-2"
                style={{ 
                  fontFamily: 'var(--font-body)',
                  backgroundColor: 'transparent',
                  color: '#124854',
                  borderColor: '#124854'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#124854';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#124854';
                }}
              >
                Volver al inicio
              </button>
              
              {/* Botón primario: Reintentar */}
              <button
                onClick={handleRetry}
                className="h-12 px-6 text-base leading-[1.5] font-medium rounded-[200px] transition-colors shadow-sm"
                style={{ 
                  fontFamily: 'var(--font-body)',
                  backgroundColor: '#124854',
                  color: '#FFFFFF'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0D3640'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#124854'}
              >
                Reintentar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* 1. Header / Navbar */}
      <Navbar 
        onNavigate={onNavigate}
        estado={isLoggedIn ? 'logueado' : 'visitante'}
        onLogout={onLogout}
        userName={currentUser?.name}
        onShowPublishModal={isLoggedIn && onOpenPublishModal ? onOpenPublishModal : () => setShowPublishModal(true)}
      />

      {/* Main Content - with padding for fixed header */}
      <main className="relative pt-20 md:pt-24 lg:pt-28" style={{ backgroundColor: 'var(--hero-background)' }}>
          {/* 2. Hero + Buscador */}
          <section className="relative py-16 pb-32 md:py-24 md:pb-40 lg:py-32 lg:pb-52 overflow-hidden" style={{ backgroundColor: 'var(--hero-background)' }}>
            {/* Background image */}
            <img 
              src={heroBackground}
              alt="Campos rurales"
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
            
            <div className="relative max-w-[1650px] mx-auto px-4 sm:px-6 text-center space-y-12 md:space-y-16 lg:space-y-24 z-10 -mt-[40px] md:-mt-[60px] lg:-mt-[80px]">
              {/* Headlines */}
              <div className="space-y-3 md:space-y-4">
                <h1 style={{ color: '#0A0A0A', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 'var(--font-weight-medium)', lineHeight: '1.1' }}>
                  Compra y vende parcelas fácilmente
                </h1>
                <p className="body-lead max-w-4xl mx-auto text-sm md:text-base lg:text-lg" style={{ color: '#0A0A0A' }}>
                  Explora oportunidades reales, en un solo lugar.
                </p>
              </div>

              {/* Buscador - Mobile/Tablet: Inline con selects | Desktop: Filtros inline con dropdowns */}
              
              {/* Buscador Mobile/Tablet - Inline con selects nativos (igual a ParcelasPage) */}
              <div className="lg:hidden bg-white p-4 sm:p-6 w-full shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-[20px] sm:rounded-[24px] border-2 border-gray-200 transition-all duration-300 mx-auto max-w-3xl">
                <div className="flex flex-wrap items-end gap-3 sm:gap-4">
                  {/* Select Ubicación */}
                  <div className="space-y-2.5 w-full md:w-auto">
                    <label className="block text-left pl-3 text-gray-700" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                      Ubicación
                    </label>
                    <div className="relative">
                      <select 
                        value={selectedValues.ubicacion}
                        onChange={(e) => setSelectedValues(prev => ({ ...prev, ubicacion: e.target.value }))}
                        className="bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-9 py-2 text-sm text-gray-900 rounded-[100px] focus:outline-none transition-all duration-200 cursor-pointer h-[40px] shadow-sm hover:shadow-md w-full md:w-[155px] appearance-none" 
                        style={{ 
                          fontWeight: 400, 
                          lineHeight: '1.5' 
                        }}
                      >
                        {dropdownOptions.ubicacion.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>
                  </div>

                  {/* Select Superficie */}
                  <div className="space-y-2.5 w-full md:w-auto">
                    <label className="block text-left pl-3 text-gray-700" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                      Superficie
                    </label>
                    <div className="relative">
                      <select 
                        value={selectedValues.superficie}
                        onChange={(e) => setSelectedValues(prev => ({ ...prev, superficie: e.target.value }))}
                        className="bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-9 py-2 text-sm text-gray-900 rounded-[100px] focus:outline-none transition-all duration-200 cursor-pointer h-[40px] shadow-sm hover:shadow-md w-full md:w-[155px] appearance-none" 
                        style={{ 
                          fontWeight: 400, 
                          lineHeight: '1.5' 
                        }}
                      >
                        {dropdownOptions.superficie.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>
                  </div>

                  {/* Select Condición */}
                  <div className="space-y-2.5 w-full md:w-auto">
                    <label className="block text-left pl-3 text-gray-700" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                      Condición
                    </label>
                    <div className="relative">
                      <select 
                        value={selectedValues.condicion}
                        onChange={(e) => setSelectedValues(prev => ({ ...prev, condicion: e.target.value }))}
                        className="bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-9 py-2 text-sm text-gray-900 rounded-[100px] focus:outline-none transition-all duration-200 cursor-pointer h-[40px] shadow-sm hover:shadow-md w-full md:w-[170px] appearance-none" 
                        style={{ 
                          fontWeight: 400, 
                          lineHeight: '1.5' 
                        }}
                      >
                        {dropdownOptions.condicion.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>
                  </div>

                  {/* Select Precio */}
                  <div className="space-y-2.5 w-full md:w-auto">
                    <label className="block text-left pl-3 text-gray-700" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                      Rango de precio
                    </label>
                    <div className="relative">
                      <select 
                        value={selectedValues.precio}
                        onChange={(e) => setSelectedValues(prev => ({ ...prev, precio: e.target.value }))}
                        className="bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-9 py-2 text-sm text-gray-900 rounded-[100px] focus:outline-none transition-all duration-200 cursor-pointer h-[40px] shadow-sm hover:shadow-md w-full md:w-[165px] appearance-none" 
                        style={{ 
                          fontWeight: 400, 
                          lineHeight: '1.5' 
                        }}
                      >
                        {dropdownOptions.precio.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
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

                  {/* Botón Buscar */}
                  <div className="space-y-2.5 w-full md:w-auto">
                    <div className="h-[20px] hidden md:block"></div>
                    <button 
                      onClick={() => onNavigate('parcelas', undefined, selectedValues)}
                      className="bg-[#124854] hover:bg-[#0d3640] text-white px-[18px] h-[40px] text-sm leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center whitespace-nowrap w-full md:w-auto"
                    >
                      Buscar
                    </button>
                  </div>

                  {/* Botón Búsqueda Inteligente */}
                  <div className="space-y-2.5 w-full md:w-auto">
                    <div className="h-[20px] hidden md:block"></div>
                    <button 
                      onClick={() => setIsSmartSearchBottomSheetOpen(true)}
                      className="h-[40px] bg-[#efefef] hover:bg-[#dedede] text-black hover:text-[#303030] px-[14px] text-sm leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap w-full md:w-auto"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Búsqueda inteligente</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Buscador completo desktop */}
              <div 
                className="hidden lg:block bg-white/95 backdrop-blur-sm p-6 xl:p-8 max-w-fit mx-auto shadow-[0_20px_80px_rgba(0,0,0,0.25)] rounded-[24px] border border-white/20 transition-all duration-500 ease-out"
                style={{
                  maxHeight: isSmartSearchExpanded ? '400px' : '120px',
                  overflow: openDropdown ? 'visible' : 'hidden'
                }}
              >
                <div className="flex items-end gap-2 flex-wrap lg:flex-nowrap">
                  {/* Dropdown Ubicación */}
                  <div className="space-y-2.5 relative dropdown-container">
                    <label className="block text-left pl-3 text-gray-700" style={{ fontWeight: 'var(--font-weight-medium)' }}>Ubicación</label>
                    <div className="relative">
                      <button
                        onClick={() => setOpenDropdown(openDropdown === 'ubicacion' ? null : 'ubicacion')}
                        className="bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-9 py-2 text-sm text-gray-900 rounded-[100px] focus:outline-none transition-all duration-200 cursor-pointer h-[40px] shadow-sm hover:shadow-md w-[155px] relative"
                        style={{ fontWeight: 400, lineHeight: '1.5' }}
                      >
                        <span className="text-left block pr-1 whitespace-nowrap overflow-hidden text-ellipsis">{getSelectedLabel('ubicacion')}</span>
                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 absolute right-3 top-1/2 -translate-y-1/2 ${openDropdown === 'ubicacion' ? 'rotate-180' : ''}`} />
                      </button>
                      {openDropdown === 'ubicacion' && (
                        <div className="absolute top-full mt-2 w-full bg-white border-2 border-gray-200 rounded-[16px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] z-50 max-h-[180px] overflow-y-auto dropdown-scroll">
                          {dropdownOptions.ubicacion.map((option) => (
                            <button
                              key={option.value}
                              onClick={() => handleDropdownSelect('ubicacion', option.value)}
                              className="w-full text-left px-5 py-2.5 text-sm hover:bg-gray-100 transition-colors first:rounded-t-[14px] last:rounded-b-[14px]"
                              style={{ fontWeight: 400, lineHeight: '1.5' }}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Dropdown Superficie */}
                  <div className="space-y-2.5 relative dropdown-container">
                    <label className="block text-left pl-3 text-gray-700" style={{ fontWeight: 'var(--font-weight-medium)' }}>Superficie</label>
                    <div className="relative">
                      <button
                        onClick={() => setOpenDropdown(openDropdown === 'superficie' ? null : 'superficie')}
                        className="bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-9 py-2 text-sm text-gray-900 rounded-[100px] focus:outline-none transition-all duration-200 cursor-pointer h-[40px] shadow-sm hover:shadow-md w-[155px] relative"
                        style={{ fontWeight: 400, lineHeight: '1.5' }}
                      >
                        <span className="text-left block pr-1 whitespace-nowrap overflow-hidden text-ellipsis">{getSelectedLabel('superficie')}</span>
                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 absolute right-3 top-1/2 -translate-y-1/2 ${openDropdown === 'superficie' ? 'rotate-180' : ''}`} />
                      </button>
                      {openDropdown === 'superficie' && (
                        <div className="absolute top-full mt-2 w-full bg-white border-2 border-gray-200 rounded-[16px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] z-50 max-h-[180px] overflow-y-auto dropdown-scroll">
                          {dropdownOptions.superficie.map((option) => (
                            <button
                              key={option.value}
                              onClick={() => handleDropdownSelect('superficie', option.value)}
                              className="w-full text-left px-5 py-2.5 text-sm hover:bg-gray-100 transition-colors first:rounded-t-[14px] last:rounded-b-[14px]"
                              style={{ fontWeight: 400, lineHeight: '1.5' }}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Dropdown Condición */}
                  <div className="space-y-2.5 relative dropdown-container">
                    <label className="block text-left pl-3 text-gray-700" style={{ fontWeight: 'var(--font-weight-medium)' }}>Condición</label>
                    <div className="relative">
                      <button
                        onClick={() => setOpenDropdown(openDropdown === 'condicion' ? null : 'condicion')}
                        className="bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-9 py-2 text-sm text-gray-900 rounded-[100px] focus:outline-none transition-all duration-200 cursor-pointer h-[40px] shadow-sm hover:shadow-md w-[130px] relative"
                        style={{ fontWeight: 400, lineHeight: '1.5' }}
                      >
                        <span className="text-left block pr-1 whitespace-nowrap overflow-hidden text-ellipsis">{getSelectedLabel('condicion')}</span>
                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 absolute right-3 top-1/2 -translate-y-1/2 ${openDropdown === 'condicion' ? 'rotate-180' : ''}`} />
                      </button>
                      {openDropdown === 'condicion' && (
                        <div className="absolute top-full mt-2 w-full bg-white border-2 border-gray-200 rounded-[16px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] z-50 max-h-[180px] overflow-y-auto dropdown-scroll">
                          {dropdownOptions.condicion.map((option) => (
                            <button
                              key={option.value}
                              onClick={() => handleDropdownSelect('condicion', option.value)}
                              className="w-full text-left px-5 py-2.5 text-sm hover:bg-gray-100 transition-colors first:rounded-t-[14px] last:rounded-b-[14px]"
                              style={{ fontWeight: 400, lineHeight: '1.5' }}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Dropdown Precio */}
                  <div className="space-y-2.5 relative dropdown-container">
                    <label className="block text-left pl-3 text-gray-700" style={{ fontWeight: 'var(--font-weight-medium)' }}>Rango de precio</label>
                    <div className="relative">
                      <button
                        onClick={() => setOpenDropdown(openDropdown === 'precio' ? null : 'precio')}
                        className="bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-9 py-2 text-sm text-gray-900 rounded-[100px] focus:outline-none transition-all duration-200 cursor-pointer h-[40px] shadow-sm hover:shadow-md w-[165px] relative"
                        style={{ fontWeight: 400, lineHeight: '1.5' }}
                      >
                        <span className="text-left block pr-1 whitespace-nowrap overflow-hidden text-ellipsis">{getSelectedLabel('precio')}</span>
                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 absolute right-3 top-1/2 -translate-y-1/2 ${openDropdown === 'precio' ? 'rotate-180' : ''}`} />
                      </button>
                      {openDropdown === 'precio' && (
                        <div className="absolute top-full mt-2 w-full bg-white border-2 border-gray-200 rounded-[16px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] z-50 max-h-[180px] overflow-y-auto dropdown-scroll">
                          {dropdownOptions.precio.map((option) => (
                            <button
                              key={option.value}
                              onClick={() => handleDropdownSelect('precio', option.value)}
                              className="w-full text-left px-5 py-2.5 text-sm hover:bg-gray-100 transition-colors first:rounded-t-[14px] last:rounded-b-[14px]"
                              style={{ fontWeight: 400, lineHeight: '1.5' }}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Switch Incluir proyectos */}
                  <div className="space-y-2.5">
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

                  <div className="space-y-2.5">
                    <div className="h-[20px]"></div>
                    <button 
                      onClick={() => onNavigate('parcelas', undefined, selectedValues)}
                      className="bg-[#124854] hover:bg-[#0d3640] text-white px-[18px] h-[40px] text-sm leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center whitespace-nowrap"
                    >
                      Buscar
                    </button>
                  </div>

                  <div className="space-y-2.5 w-full lg:w-auto">
                    <div className="h-[20px] hidden lg:block"></div>
                    <button 
                      onClick={() => {
                        // En desktop: expandir inline
                        setIsSmartSearchExpanded(!isSmartSearchExpanded);
                      }}
                      className="h-[40px] bg-[#efefef] hover:bg-[#dedede] text-black hover:text-[#303030] px-[14px] text-sm leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap w-full lg:w-auto"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Búsqueda inteligente</span>
                    </button>
                  </div>
                </div>

                {/* Sección expandible de búsqueda inteligente */}
                <div 
                  className="transition-all duration-500 ease-out"
                  style={{
                    opacity: isSmartSearchExpanded ? 1 : 0,
                    transform: isSmartSearchExpanded ? 'translateY(0)' : 'translateY(-20px)',
                    pointerEvents: isSmartSearchExpanded ? 'auto' : 'none',
                    marginTop: isSmartSearchExpanded ? '32px' : '0'
                  }}
                >
                  {/* Encabezado con texto y botón cerrar */}
                  <div className="flex items-start justify-between mb-5">
                    <p className="text-base text-gray-600" style={{ fontWeight: 400, lineHeight: '1.5' }}>
                      Describe lo que buscas y te mostramos las parcelas que mejor se ajustan.
                    </p>
                    <button
                      onClick={() => setIsSmartSearchExpanded(false)}
                      className="text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1.5 text-sm ml-4 flex-shrink-0"
                      style={{ fontWeight: 400, lineHeight: '1.5' }}
                    >
                      <X className="w-4 h-4" />
                      Cerrar
                    </button>
                  </div>

                  {/* Campo de texto con botón integrado */}
                  <div className="w-full relative">
                    <input
                      type="text"
                      value={smartSearchValue}
                      onChange={(e) => setSmartSearchValue(e.target.value)}
                      placeholder="Ej: busco una parcela cerca de un lago para vivir"
                      className="w-full h-[64px] pl-6 pr-[160px] text-base text-gray-900 placeholder:text-gray-400 bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black rounded-[16px] focus:outline-none transition-all duration-200"
                      style={{ fontWeight: 400, lineHeight: '1.5' }}
                    />
                    <button 
                      onClick={handleSmartSearch}
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-[48px] bg-[#efefef] hover:bg-[#dedede] text-black hover:text-[#303030] px-5 text-sm leading-[1.5] font-medium rounded-[12px] transition-colors flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      Buscar
                    </button>
                  </div>

                  {/* Chips de sugerencias */}
                  <div 
                    className="flex flex-wrap gap-2.5 mt-5 transition-all duration-500 ease-out"
                    style={{
                      opacity: isSmartSearchExpanded ? 1 : 0,
                      transform: isSmartSearchExpanded ? 'translateY(0)' : 'translateY(-10px)'
                    }}
                  >
                    <button 
                      onClick={() => toggleBadge('naturaleza')}
                      className={`px-4 py-2 text-sm rounded-[100px] transition-all duration-200 flex items-center gap-2 ${
                        selectedBadges.includes('naturaleza')
                          ? 'bg-[#124854] text-white border border-[#124854] hover:bg-[#0d3640]'
                          : 'text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                      }`}
                      style={{ fontWeight: 400, lineHeight: '1.5' }}
                    >
                      <Trees className="w-4 h-4" />
                      <span>Rodeado de naturaleza</span>
                    </button>
                    <button 
                      onClick={() => toggleBadge('lago-rio')}
                      className={`px-4 py-2 text-sm rounded-[100px] transition-all duration-200 flex items-center gap-2 ${
                        selectedBadges.includes('lago-rio')
                          ? 'bg-[#124854] text-white border border-[#124854] hover:bg-[#0d3640]'
                          : 'text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                      }`}
                      style={{ fontWeight: 400, lineHeight: '1.5' }}
                    >
                      <Waves className="w-4 h-4" />
                      <span>Cerca de lago o río</span>
                    </button>
                    <button 
                      onClick={() => toggleBadge('inversion')}
                      className={`px-4 py-2 text-sm rounded-[100px] transition-all duration-200 flex items-center gap-2 ${
                        selectedBadges.includes('inversion')
                          ? 'bg-[#124854] text-white border border-[#124854] hover:bg-[#0d3640]'
                          : 'text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                      }`}
                      style={{ fontWeight: 400, lineHeight: '1.5' }}
                    >
                      <TrendingUp className="w-4 h-4" />
                      <span>Ideal para inversión</span>
                    </button>
                    <button 
                      onClick={() => toggleBadge('acceso')}
                      className={`px-4 py-2 text-sm rounded-[100px] transition-all duration-200 flex items-center gap-2 ${
                        selectedBadges.includes('acceso')
                          ? 'bg-[#124854] text-white border border-[#124854] hover:bg-[#0d3640]'
                          : 'text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                      }`}
                      style={{ fontWeight: 400, lineHeight: '1.5' }}
                    >
                      <Car className="w-4 h-4" />
                      <span>Buen acceso</span>
                    </button>
                    <button 
                      onClick={() => toggleBadge('servicios')}
                      className={`px-4 py-2 text-sm rounded-[100px] transition-all duration-200 flex items-center gap-2 ${
                        selectedBadges.includes('servicios')
                          ? 'bg-[#124854] text-white border border-[#124854] hover:bg-[#0d3640]'
                          : 'text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                      }`}
                      style={{ fontWeight: 400, lineHeight: '1.5' }}
                    >
                      <Zap className="w-4 h-4" />
                      <span>Con servicios disponibles</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Inmobiliarias destacadas */}
          <section className="py-6 md:py-8 bg-white relative z-10">
            <div 
              className="max-w-6xl mx-auto px-4 sm:px-6 group"
              onMouseEnter={() => setIsInmobiliariasHovered(true)}
              onMouseLeave={() => setIsInmobiliariasHovered(false)}
            >
              {/* Header discreto */}
              <div 
                ref={inmobiliariasHeaderRef}
                className="mb-6 text-center"
              >
                {/* Tab Bar */}
                <div className="flex justify-center">
                  <div className="inline-flex bg-gray-100 rounded-full p-1 gap-1">
                    <button
                      onClick={() => setSelectedTab('inmobiliarias')}
                      className="px-5 py-1.5 rounded-full text-xs transition-all duration-200"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: selectedTab === 'inmobiliarias' ? 500 : 400,
                        color: selectedTab === 'inmobiliarias' ? '#0A0A0A' : '#6B6B6B',
                        backgroundColor: selectedTab === 'inmobiliarias' ? '#FFFFFF' : 'transparent',
                        boxShadow: selectedTab === 'inmobiliarias' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                      }}
                    >
                      Inmobiliarias
                    </button>
                    <button
                      onClick={() => setSelectedTab('brokers')}
                      className="px-5 py-1.5 rounded-full text-xs transition-all duration-200"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: selectedTab === 'brokers' ? 500 : 400,
                        color: selectedTab === 'brokers' ? '#0A0A0A' : '#6B6B6B',
                        backgroundColor: selectedTab === 'brokers' ? '#FFFFFF' : 'transparent',
                        boxShadow: selectedTab === 'brokers' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                      }}
                    >
                      Brokers
                    </button>
                  </div>
                </div>
              </div>

              {/* Carrusel horizontal con controles manuales */}
              <div className="relative mx-auto px-8 md:px-12 lg:px-[60px]" style={{ maxWidth: '1040px' }}>
                {/* Botón izquierdo */}
                <button
                  onClick={() => {
                    if (carouselRef.current) {
                      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
                    }
                  }}
                  className="absolute top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white shadow-md transition-all duration-300 left-0 md:left-[10px]"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
                </button>

                {/* Contenedor del carrusel */}
                <div 
                  ref={carouselRef}
                  className="overflow-x-auto scrollbar-hide"
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
                    
                    .carousel-item {
                      flex-shrink: 0;
                      width: 120px;
                      text-align: center;
                      opacity: 0.9;
                      transition: opacity 0.3s ease-in-out;
                      scroll-snap-align: start;
                    }
                    
                    .carousel-item:hover {
                      opacity: 1;
                    }
                    
                    .carousel-image {
                      overflow: hidden;
                      border-radius: 24px;
                    }
                    
                    .carousel-image img {
                      transition: transform 0.4s ease-out;
                    }
                    
                    .carousel-image:hover img {
                      transform: scale(1.08);
                    }
                    
                    .carousel-item p {
                      opacity: 0;
                      transition: opacity 0.4s ease-in-out;
                    }
                    
                    .carousel-container:hover .carousel-item p {
                      opacity: 1;
                    }
                  `}</style>
                  
                  <div className="carousel-container flex gap-7 py-2">
                    {selectedTab === 'inmobiliarias'
                      ? [...inmobiliarias, ...inmobiliarias, ...inmobiliarias].map((item, index) => (
                          <div key={`${item.id}-${index}`} className="carousel-item">
                            <div className="carousel-image">
                              <img
                                src={item.logo}
                                alt={item.nombre}
                                className="w-[120px] h-[86px] object-cover cursor-pointer"
                                style={{ borderRadius: '24px' }}
                                onClick={() => onNavigate('inmobiliaria-profile', undefined, item.nombre)}
                              />
                            </div>
                            <p style={{
                              fontFamily: 'Inter, sans-serif',
                              fontSize: '11px',
                              fontWeight: 400,
                              color: '#999999',
                              marginTop: '10px',
                              lineHeight: '1.3'
                            }}>
                              {item.nombre}
                            </p>
                          </div>
                        ))
                      : [...brokers, ...brokers, ...brokers].map((item, index) => (
                          <div key={`${item.id}-${index}`} className="carousel-item">
                            <div className="carousel-image">
                              <img
                                src={item.foto}
                                alt={item.nombre}
                                className="w-[120px] h-[86px] object-cover cursor-pointer"
                                style={{ borderRadius: '24px' }}
                                onClick={() => onNavigate('broker-profile', undefined, item.nombre)}
                              />
                            </div>
                            <p style={{
                              fontFamily: 'Inter, sans-serif',
                              fontSize: '11px',
                              fontWeight: 400,
                              color: '#999999',
                              marginTop: '10px',
                              lineHeight: '1.3'
                            }}>
                              {item.nombre}
                            </p>
                          </div>
                        ))
                    }
                  </div>
                </div>

                {/* Botón derecho */}
                <button
                  onClick={() => {
                    if (carouselRef.current) {
                      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
                    }
                  }}
                  className="absolute top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white shadow-md transition-all duration-300 right-0 md:right-[10px]"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
                </button>
              </div>

              {/* Botón Ver todas/todos */}
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => onNavigate(selectedTab === 'inmobiliarias' ? 'inmobiliarias' : 'brokers')}
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
                    e.currentTarget.style.backgroundColor = '#124854';
                    e.currentTarget.style.color = '#FFFFFF';
                    e.currentTarget.style.borderColor = '#124854';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#737373';
                    e.currentTarget.style.borderColor = '#E5E5E5';
                  }}
                >
                  {selectedTab === 'inmobiliarias' ? 'Ver todas' : 'Ver todos'}
                </button>
              </div>
            </div>
          </section>

          {/* Nueva Sección: Escaladora de Descubrimiento + Parcelas Destacadas */}
          <section className="py-12 md:py-16 lg:py-20 bg-white relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              {/* Título y subtítulo */}
              <div className="mb-8 md:mb-10 text-center">
                <h2 className="mb-2 md:mb-3" style={{ color: '#124854' }}>Parcelas destacadas</h2>
                <p className="body-lead text-sm md:text-base" style={{ color: '#0A0A0A' }}>
                  Propiedades seleccionadas con información verificada
                </p>
              </div>

              {/* Carrusel de Parcelas */}
              <div className="parcelas-carousel" onWheel={handleWheel}>
                    <Slider {...{
                  dots: true,
                  infinite: true,
                  speed: 500,
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  autoplay: true,
                  autoplaySpeed: 4000,
                  pauseOnHover: true,
                  arrows: false,
                  responsive: [
                    {
                      breakpoint: 1024,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        arrows: false
                      }
                    },
                    {
                      breakpoint: 640,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false
                      }
                    }
                  ]
                }}>
                  {parcelas.map((parcela) => (
                    <div key={parcela.id} className="px-2 sm:px-3 h-full">
                      <div 
                        onClick={() => onNavigate('parcela-detalle', parcela.id)}
                        className="flex flex-col rounded-xl shadow-sm cursor-pointer group overflow-hidden bg-white h-full"
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
                        {/* Imagen */}
                        <ParcelaCardImage
                          imagenes={parcela.imagenes || [parcela.imagen]}
                          imagen={parcela.imagen}
                          nombre={parcela.nombre}
                        />

                        {/* Contenido */}
                        <div className="p-4 md:p-5 flex flex-col flex-grow">
                          {/* Título y ubicación */}
                          <div className="mb-3">
                            <h3 
                              className="line-clamp-1 mb-1" 
                              style={{ 
                                color: '#0A0A0A', 
                                fontSize: 'var(--font-size-h5)', 
                                fontWeight: 'var(--font-weight-semibold)', 
                                lineHeight: 'var(--line-height-ui)' 
                              }}
                            >
                              {parcela.nombre}
                            </h3>
                            <p 
                              className="line-clamp-1" 
                              style={{ 
                                color: '#6B6B6B',
                                fontSize: 'var(--font-size-xs)', 
                                lineHeight: 'var(--line-height-ui)' 
                              }}
                            >
                              {parcela.ubicacion}
                            </p>
                          </div>
                          
                          {/* Características */}
                          <div className="mb-4">
                            <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                              <div className="flex items-center gap-1.5" style={{ fontSize: 'var(--font-size-xs)', color: '#0A0A0A' }}>
                                <div className="flex-shrink-0 [&>svg]:w-3.5 [&>svg]:h-3.5 [&_path]:fill-[#124854] [&_circle]:stroke-[#124854] [&_rect]:fill-[#124854] [&_line]:stroke-[#124854] [&_polyline]:stroke-[#124854]" style={{ color: '#124854' }}>
                                  {parcela.caracteristicas[0].icon}
                                </div>
                                <span className="truncate" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                                  {parcela.caracteristicas[0].text}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5" style={{ fontSize: 'var(--font-size-xs)', color: '#0A0A0A' }}>
                                <div className="flex-shrink-0 [&>svg]:w-3.5 [&>svg]:h-3.5 [&_path]:fill-[#124854] [&_circle]:stroke-[#124854] [&_rect]:fill-[#124854] [&_line]:stroke-[#124854] [&_polyline]:stroke-[#124854]" style={{ color: '#124854' }}>
                                  {parcela.caracteristicas[1].icon}
                                </div>
                                <span className="truncate" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                                  {parcela.caracteristicas[1].text}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5" style={{ fontSize: 'var(--font-size-xs)', color: '#0A0A0A' }}>
                                <div className="flex-shrink-0 [&>svg]:w-3.5 [&>svg]:h-3.5 [&_path]:fill-[#124854] [&_circle]:stroke-[#124854] [&_rect]:fill-[#124854] [&_line]:stroke-[#124854] [&_polyline]:stroke-[#124854]" style={{ color: '#124854' }}>
                                  {parcela.caracteristicas[2].icon}
                                </div>
                                <span className="truncate" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                                  {parcela.caracteristicas[2].text}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5" style={{ fontSize: 'var(--font-size-xs)', color: '#0A0A0A' }}>
                                <div className="flex-shrink-0 [&>svg]:w-3.5 [&>svg]:h-3.5 [&_path]:fill-[#124854] [&_circle]:stroke-[#124854] [&_rect]:fill-[#124854] [&_line]:stroke-[#124854] [&_polyline]:stroke-[#124854]" style={{ color: '#124854' }}>
                                  {parcela.caracteristicas[3].icon}
                                </div>
                                <span className="truncate" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                                  {parcela.caracteristicas[3].text}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Precio y broker */}
                          <div className="mt-auto pt-4" style={{ borderTop: '1px solid #CDD8DE' }}>
                            <div className="mb-3">
                              <div 
                                className="mb-1" 
                                style={{ 
                                  color: '#462611', 
                                  textTransform: 'uppercase', 
                                  letterSpacing: '0.05em', 
                                  fontSize: '0.625rem', 
                                  fontWeight: 'var(--font-weight-medium)' 
                                }}
                              >
                                Desde
                              </div>
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
                    </div>
                  ))}
                </Slider>
              </div>

              <div className="mt-16 md:mt-20 lg:mt-24 text-center">
                <button
                  onClick={() => onNavigate('parcelas')}
                  className="h-10 lg:h-11 px-6 lg:px-8 rounded-[200px] transition-colors inline-flex items-center justify-center"
                  style={{
                    backgroundColor: '#efefef',
                    color: '#0A0A0A',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body)',
                    fontWeight: 'var(--font-weight-medium)',
                    lineHeight: 'var(--line-height-ui)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#dedede';
                    e.currentTarget.style.color = '#303030';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#efefef';
                    e.currentTarget.style.color = '#0A0A0A';
                  }}
                >
                  Ver todas las parcelas
                </button>
              </div>
            </div>
          </section>

          {/* Sección de valor: Asesoría gratuita */}
          <section 
            className="py-12 md:py-16 lg:py-20 relative z-10 overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${heroBackground})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="flex flex-col items-center text-center">
                {/* Contenido centrado */}
                <div className="max-w-2xl">
                  {/* Título principal */}
                  <h2
                    className="mb-3 md:mb-4"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(24px, 4vw, var(--font-size-h2))',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#FFFFFF',
                      lineHeight: 'var(--line-height-heading)',
                      letterSpacing: 'var(--letter-spacing-normal)'
                    }}
                  >
                    Asesoría gratuita para encontrar tu parcela ideal
                  </h2>

                  {/* Texto explicativo */}
                  <p
                    className="mb-8 md:mb-10 text-sm md:text-base"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 'var(--font-weight-regular)',
                      color: '#E5E5E5',
                      lineHeight: 'var(--line-height-body)',
                      letterSpacing: 'var(--letter-spacing-normal)'
                    }}
                  >
                    Te acompañamos en la búsqueda de tu terreno ideal, analizando ubicación, presupuesto y tipo de parcela según tus objetivos.
                  </p>

                  {/* CTAs centrados */}
                  <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <button
                      className="w-full sm:w-auto h-11 md:h-12 px-6 md:px-8 rounded-[200px] transition-colors flex items-center justify-center whitespace-nowrap"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'clamp(14px, 2vw, var(--font-size-body-base))',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#FFFFFF',
                        backgroundColor: 'transparent',
                        border: '1px solid rgba(255, 255, 255, 0.4)',
                        lineHeight: '1.5'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                      }}
                    >
                      Más información
                    </button>
                    <button
                      className="w-full sm:w-auto h-11 md:h-12 px-6 md:px-8 rounded-[200px] transition-colors flex items-center justify-center whitespace-nowrap"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'clamp(14px, 2vw, var(--font-size-body-base))',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#0A0A0A',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #FFFFFF',
                        lineHeight: '1.5'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#F5F5F5';
                        e.currentTarget.style.borderColor = '#F5F5F5';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#FFFFFF';
                        e.currentTarget.style.borderColor = '#FFFFFF';
                      }}
                    >
                      Hablar con un asesor
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 5. Próximos proyectos / Lo más visto */}
          <section className="py-12 md:py-16 lg:py-20 bg-white relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="mb-8 md:mb-10 lg:mb-12">
                <h2 className="mb-2 md:mb-3" style={{ color: '#124854' }}>Próximos proyectos</h2>
                <p className="body-lead text-sm md:text-base" style={{ color: '#0A0A0A' }}>
                  Nuevos desarrollos que estarán disponibles próximamente
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[
                  {
                    id: 1,
                    nombre: 'Condominio Alto Refugio',
                    ubicacion: 'San José de Maipo, RM',
                    imagen: 'https://images.unsplash.com/photo-1766830110938-0ea8a6d78ecb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kJTIwZGV2ZWxvcG1lbnQlMjBwcm9qZWN0fGVufDF8fHx8MTc2ODg2NjMzOHww&ixlib=rb-4.1.0&q=80&w=1080',
                    imagenes: [
                      'https://images.unsplash.com/photo-1766830110938-0ea8a6d78ecb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kJTIwZGV2ZWxvcG1lbnQlMjBwcm9qZWN0fGVufDF8fHx8MTc2ODg2NjMzOHww&ixlib=rb-4.1.0&q=80&w=1080',
                      'https://images.unsplash.com/photo-1748711243680-1c4ab4f9979f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmR8ZW58MXx8fHwxNzY4ODY1MzExfDA&ixlib=rb-4.1.0&q=80&w=1080',
                      'https://images.unsplash.com/photo-1743670477099-88a9de024f04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXJhbCUyMGVzdGF0ZXxlbnwxfHx8fDE3Njg4NjUzMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
                    ],
                    parcelas: '18 parcelas',
                    desde: 'Desde 8.000 m²',
                    precio: 'Desde $125.000.000',
                    estado: 'Lanzamiento Q2 2026',
                    publicadoPor: 'Propiedades del Sur',
                    tipoVendedor: 'Inmobiliaria',
                    logo: 'https://images.unsplash.com/photo-1767706508376-84ab4d8ca165?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9wZXJ0eSUyMGNvbXBhbnklMjBsb2dvfGVufDF8fHx8MTc2OTE4MzkyMnww&ixlib=rb-4.1.0&q=80&w=1080'
                  },
                  {
                    id: 2,
                    nombre: 'Parcelación Valle Verde',
                    ubicacion: 'Colina, RM',
                    imagen: 'https://images.unsplash.com/photo-1602497485099-e41a116a272c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwY29uc3RydWN0aW9ufGVufDF8fHx8MTc2ODg2NjMzOXww&ixlib=rb-4.1.0&q=80&w=1080',
                    imagenes: [
                      'https://images.unsplash.com/photo-1602497485099-e41a116a272c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwY29uc3RydWN0aW9ufGVufDF8fHx8MTc2ODg2NjMzOXww&ixlib=rb-4.1.0&q=80&w=1080',
                      'https://images.unsplash.com/photo-1768715825473-1213f87ec005?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VudHJ5c2lkZSUyMHByb3BlcnR5fGVufDF8fHx8MTc2ODg2NTMxMXww&ixlib=rb-4.1.0&q=80&w=1080',
                      'https://images.unsplash.com/photo-1755439917128-c4cede457fa6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kJTIwcGxvdCUyMHJ1cmFsfGVufDF8fHx8MTc2ODg2NTMxMXww&ixlib=rb-4.1.0&q=80&w=1080'
                    ],
                    parcelas: '24 parcelas',
                    desde: 'Desde 5.000 m²',
                    precio: 'Desde $89.000.000',
                    estado: 'Pre-venta iniciada',
                    publicadoPor: 'Inmobiliaria Andes',
                    tipoVendedor: 'Inmobiliaria',
                    logo: 'https://images.unsplash.com/photo-1741162917720-adc367c3af75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwbG9nbyUyMG1pbmltYWx8ZW58MXx8fHwxNzY5MTg1MjU1fDA&ixlib=rb-4.1.0&q=80&w=1080'
                  },
                  {
                    id: 3,
                    nombre: 'Las Lomas del Sur',
                    ubicacion: 'Buin, RM',
                    imagen: 'https://images.unsplash.com/photo-1592595896616-c37162298647?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9wZXJ0eSUyMHN1YmRpdmlzaW9ufGVufDF8fHx8MTc2ODg2NjMzOXww&ixlib=rb-4.1.0&q=80&w=1080',
                    imagenes: [
                      'https://images.unsplash.com/photo-1592595896616-c37162298647?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9wZXJ0eSUyMHN1YmRpdmlzaW9ufGVufDF8fHx8MTc2ODg2NjMzOXww&ixlib=rb-4.1.0&q=80&w=1080',
                      'https://images.unsplash.com/photo-1588011882503-2e6061ace84d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwdGVycmFpbnxlbnwxfHx8fDE3Njg4NjUzMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
                    ],
                    parcelas: '32 parcelas',
                    desde: 'Desde 6.500 m²',
                    precio: 'Desde $95.000.000',
                    estado: 'En construcción',
                    publicadoPor: 'Inmobiliaria Horizonte',
                    tipoVendedor: 'Inmobiliaria',
                    logo: 'https://images.unsplash.com/photo-1767706508376-84ab4d8ca165?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9wZXJ0eSUyMGNvbXBhbnklMjBsb2dvfGVufDF8fHx8MTc2OTE4MzkyMnww&ixlib=rb-4.1.0&q=80&w=1080'
                  },
                  {
                    id: 4,
                    nombre: 'Proyecto Cordillera',
                    ubicacion: 'Farellones, RM',
                    imagen: 'https://images.unsplash.com/photo-1765260905437-992ca7850485?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXJhbCUyMGRldmVsb3BtZW50JTIwbGFuZHxlbnwxfHx8fDE3Njg4NjYzMzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
                    imagenes: [
                      'https://images.unsplash.com/photo-1765260905437-992ca7850485?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXJhbCUyMGRldmVsb3BtZW50JTIwbGFuZHxlbnwxfHx8fDE3Njg4NjYzMzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
                      'https://images.unsplash.com/photo-1609126917056-243a15e2e789?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YWxsZXklMjBsYW5kfGVufDF8fHx8MTc2ODg2NTMxM3ww&ixlib=rb-4.1.0&q=80&w=1080'
                    ],
                    parcelas: '12 parcelas',
                    desde: 'Desde 10.000 m²',
                    precio: 'Desde $180.000.000',
                    estado: 'Planos aprobados',
                    publicadoPor: 'Desarrollos Premium',
                    tipoVendedor: 'Inmobiliaria',
                    logo: 'https://images.unsplash.com/photo-1741162917720-adc367c3af75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwbG9nbyUyMG1pbmltYWx8ZW58MXx8fHwxNzY5MTg1MjU1fDA&ixlib=rb-4.1.0&q=80&w=1080'
                  }
                ].map((proyecto) => (
                  <div 
                    key={proyecto.id} 
                    className="rounded-xl shadow-sm cursor-pointer group overflow-hidden"
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
                    <ProjectCardImage
                      imagenes={proyecto.imagenes}
                      imagen={proyecto.imagen}
                      nombre={proyecto.nombre}
                    />
                    <div className="p-5 space-y-4 bg-white">
                      <div className="space-y-1">
                        <h3 style={{ color: '#0A0A0A', fontSize: 'var(--font-size-body-lg)', fontWeight: 'var(--font-weight-semibold)' }}>{proyecto.nombre}</h3>
                        <p className="text-sm text-gray-500" style={{ fontSize: 'var(--font-size-xs)', lineHeight: 'var(--line-height-ui)' }}>{proyecto.ubicacion}</p>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm font-medium" style={{ color: '#0A0A0A' }}>
                        <span>{proyecto.parcelas}</span>
                        <span>{proyecto.desde}</span>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-xs text-gray-500 mb-1" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>Desde</div>
                        <PrecioDisplay 
                          precioCLP={proyecto.precio.replace('Desde ', '')}
                          precioSize="lg"
                        />
                      </div>
                      
                      <div className="pt-3 border-t border-gray-200">
                        <div className="text-xs font-medium" style={{ color: '#0A0A0A', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{proyecto.estado}</div>
                      </div>
                      
                      <PublicadoPorCompact 
                        logo={proyecto.logo} 
                        nombre={proyecto.publicadoPor}
                        tipoVendedor={proyecto.tipoVendedor}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 6. ¿Cómo funciona? */}
          <section className="py-12 md:py-16 lg:py-20 bg-white relative z-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="mb-10 md:mb-12 lg:mb-16 text-center">
                <h2 className="mb-2 md:mb-3" style={{ color: '#124854' }}>Proceso claro, paso a paso</h2>
                <p className="body-lead max-w-2xl mx-auto text-sm md:text-base" style={{ color: '#0A0A0A' }}>
                  Te acompañamos en cada etapa con información clara y respaldo profesional
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {/* Step 1 */}
                <div className="text-center space-y-3 md:space-y-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    <Search className="w-7 h-7" style={{ color: '#0A0A0A' }} strokeWidth={1.5} />
                  </div>
                  <h3 style={{ color: '#0A0A0A' }}>
                    Explora con información verificada
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Revisa parcelas y proyectos con datos completos y confiables. Filtra por ubicación, precio y características relevantes para ti.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="text-center space-y-3 md:space-y-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    <Users className="w-7 h-7" style={{ color: '#0A0A0A' }} strokeWidth={1.5} />
                  </div>
                  <h3 style={{ color: '#0A0A0A' }}>
                    Conecta con profesionales
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Comunícate con inmobiliarias y brokers verificados. Agenda visitas y resuelve dudas con asesoría especializada.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="text-center space-y-3 md:space-y-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-7 h-7" style={{ color: '#0A0A0A' }} strokeWidth={1.5} />
                  </div>
                  <h3 style={{ color: '#0A0A0A' }}>
                    Decide con confianza
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Accede a recursos y herramientas para avanzar de forma informada en cada etapa del proceso de compra.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 7. ¿Quiénes pueden usar la plataforma? */}
          <section 
            className="py-20 relative z-10 bg-cover bg-center" 
            style={{ 
              backgroundColor: '#0A0A0A',
              backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.8), rgba(10, 10, 10, 0.8)), url(${topoBackground})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="max-w-7xl mx-auto px-6">
              <div className="mb-16 text-center">
                <h2 className="mb-3 text-white">Una plataforma para todos</h2>
                <p className="body-lead text-gray-300">
                  Conectamos compradores, dueños, inmobiliarias y brokers en un solo lugar
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                {/* Compradores */}
                <div className="rounded-2xl lg:rounded-3xl p-6 lg:p-8 flex flex-col transition-all duration-300 hover:scale-[1.02]" style={{ 
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
                }}>
                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 lg:mb-6" style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}>
                    <svg className="w-7 h-7 lg:w-8 lg:h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <div className="space-y-2 lg:space-y-3 flex-grow">
                    <h4 className="text-white text-lg lg:text-xl" style={{ fontWeight: 'var(--font-weight-semibold)' }}>Compradores</h4>
                    <p className="text-gray-200 text-sm lg:text-base leading-relaxed" style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-light)' }}>
                      Explora con información verificada y compara opciones para encontrar la parcela que se ajuste a lo que buscas.
                    </p>
                  </div>
                  <button onClick={() => onNavigate('parcelas')} className="w-full h-10 lg:h-11 px-4 text-sm lg:text-base leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center mt-5 lg:mt-6 bg-[#efefef] hover:bg-[#dedede] text-black hover:text-[#303030]">
                    Comenzar a explorar
                  </button>
                </div>

                {/* Dueños */}
                <div className="rounded-2xl lg:rounded-3xl p-6 lg:p-8 flex flex-col transition-all duration-300 hover:scale-[1.02]" style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
                }}>
                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 lg:mb-6" style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}>
                    <svg className="w-7 h-7 lg:w-8 lg:h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div className="space-y-2 lg:space-y-3 flex-grow">
                    <h4 className="text-white text-lg lg:text-xl" style={{ fontWeight: 'var(--font-weight-semibold)' }}>Dueños</h4>
                    <p className="text-gray-200 text-sm lg:text-base leading-relaxed" style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-light)' }}>
                      Publica tu parcela con información clara y conecta con compradores reales interesados en tu propiedad.
                    </p>
                  </div>
                  <button onClick={() => isLoggedIn ? onOpenPublishModal?.() : onNavigateToPublish?.()} className="w-full h-10 lg:h-11 px-4 text-sm lg:text-base leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center mt-5 lg:mt-6 bg-[#efefef] hover:bg-[#dedede] text-black hover:text-[#303030]">
                    Publicar parcela
                  </button>
                </div>

                {/* Inmobiliarias */}
                <div className="rounded-2xl lg:rounded-3xl p-6 lg:p-8 flex flex-col transition-all duration-300 hover:scale-[1.02]" style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
                }}>
                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 lg:mb-6" style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}>
                    <svg className="w-7 h-7 lg:w-8 lg:h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="space-y-2 lg:space-y-3 flex-grow">
                    <h4 className="text-white text-lg lg:text-xl" style={{ fontWeight: 'var(--font-weight-semibold)' }}>Inmobiliarias</h4>
                    <p className="text-gray-200 text-sm lg:text-base leading-relaxed" style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-light)' }}>
                      Gestiona tus publicaciones y coordina con tu equipo desde herramientas diseñadas para tu operación.
                    </p>
                  </div>
                  <button onClick={() => onNavigate('planes')} className="w-full h-10 lg:h-11 px-4 text-sm lg:text-base leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center mt-5 lg:mt-6 bg-[#efefef] hover:bg-[#dedede] text-black hover:text-[#303030]">
                    Conocer planes
                  </button>
                </div>

                {/* Brokers */}
                <div className="rounded-2xl lg:rounded-3xl p-6 lg:p-8 flex flex-col transition-all duration-300 hover:scale-[1.02]" style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
                }}>
                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 lg:mb-6" style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}>
                    <svg className="w-7 h-7 lg:w-8 lg:h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="space-y-2 lg:space-y-3 flex-grow">
                    <h4 className="text-white text-lg lg:text-xl" style={{ fontWeight: 'var(--font-weight-semibold)' }}>Brokers</h4>
                    <p className="text-gray-200 text-sm lg:text-base leading-relaxed" style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-light)' }}>
                      Conecta con nuevas oportunidades, gestiona tus contactos y accede a herramientas para aumentar tu alcance.
                    </p>
                  </div>
                  <button onClick={() => onNavigate('entry')} className="w-full h-10 lg:h-11 px-4 text-sm lg:text-base leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center mt-5 lg:mt-6 bg-[#efefef] hover:bg-[#dedede] text-black hover:text-[#303030]">
                    Registrarme
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 9. Blog / Noticias */}
          <section className="py-12 md:py-16 lg:py-20 bg-white relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="mb-8 md:mb-10 lg:mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="mb-2 md:mb-3" style={{ color: '#124854' }}>Recursos y consejos</h2>
                  <p className="body-lead text-sm md:text-base" style={{ color: '#0A0A0A' }}>
                    Información útil para compradores e inversionistas
                  </p>
                </div>
                <button onClick={() => onNavigate('recursos')} className="text-sm text-black font-medium hover:underline self-start md:self-auto">
                  Ver todos los artículos →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {/* Article 1 */}
                <div onClick={() => onNavigate('articulo', 1)} className="rounded-2xl border border-gray-200 hover:border-gray-400 hover:shadow-md transition-all duration-300 cursor-pointer group overflow-hidden">
                  <div className="aspect-[16/9] bg-gray-200">
                    <img
                      src="https://images.unsplash.com/photo-1662153480559-0485a7848921?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVja2xpc3QlMjBwbGFubmluZyUyMGRvY3VtZW50c3xlbnwxfHx8fDE3Njg4NjY3NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Checklist esencial para comprar parcela"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 space-y-4">
                    <div className="text-xs font-medium text-gray-500" style={{ textTransform: 'uppercase', letterSpacing: 'var(--letter-spacing-wide)' }}>GUÍA DE COMPRA</div>
                    <h3 style={{ color: '#0A0A0A' }}>
                      Qué considerar antes de comprar una parcela: checklist esencial
                    </h3>
                    <p className="text-gray-500">
                      Conoce los aspectos legales, técnicos y financieros que debes revisar
                      antes de tomar tu decisión de compra.
                    </p>
                    <div className="pt-3 border-t border-gray-200">
                      <span className="text-gray-500" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)' }}>Hace 2 días • 5 min de lectura</span>
                    </div>
                  </div>
                </div>

                {/* Article 2 */}
                <div onClick={() => onNavigate('articulo', 3)} className="rounded-2xl border border-gray-200 hover:border-gray-400 hover:shadow-md transition-all duration-300 cursor-pointer group overflow-hidden">
                  <div className="aspect-[16/9] bg-gray-200">
                    <img
                      src="https://images.unsplash.com/photo-1768055104929-cf2317674a80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZlc3RtZW50JTIwY2hhcnQlMjBncm93dGh8ZW58MXx8fHwxNzY4ODY2NzcyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Tendencias del mercado inmobiliario"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 space-y-4">
                    <div className="text-xs font-medium text-gray-500" style={{ textTransform: 'uppercase', letterSpacing: 'var(--letter-spacing-wide)' }}>INVERSIÓN</div>
                    <h3 style={{ color: '#0A0A0A' }}>
                      Parcelas como inversión: tendencias del mercado 2026
                    </h3>
                    <p className="text-gray-500">
                      Análisis de las zonas con mayor proyección de valorización y
                      factores que impactan el mercado inmobiliario.
                    </p>
                    <div className="pt-3 border-t border-gray-200">
                      <span className="text-gray-500" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)' }}>Hace 1 semana • 8 min de lectura</span>
                    </div>
                  </div>
                </div>

                {/* Article 3 */}
                <div onClick={() => onNavigate('articulo', 2)} className="rounded-2xl border border-gray-200 hover:border-gray-400 hover:shadow-md transition-all duration-300 cursor-pointer group overflow-hidden">
                  <div className="aspect-[16/9] bg-gray-200">
                    <img
                      src="https://images.unsplash.com/photo-1764106813759-9ef7bf42a0af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWdhbCUyMGRvY3VtZW50cyUyMGNvbnRyYWN0fGVufDF8fHx8MTc2ODg2NTc1Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Guía de permisos de construcción"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 space-y-4">
                    <div className="text-xs font-medium text-gray-500" style={{ textTransform: 'uppercase', letterSpacing: 'var(--letter-spacing-wide)' }}>LEGAL</div>
                    <h3 style={{ color: '#0A0A0A' }}>
                      Entendiendo los permisos de construcción en terrenos rurales
                    </h3>
                    <p className="text-gray-500">
                      Guía práctica sobre regulaciones, zonificación y requisitos
                      para construir en parcelas de agrado.
                    </p>
                    <div className="pt-3 border-t border-gray-200">
                      <span className="text-gray-500" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)' }}>Hace 2 semanas • 6 min de lectura</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 10. CTA Final */}
          <section className="py-16 md:py-20 lg:py-24 bg-white relative z-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6 md:space-y-8">
              <div className="space-y-3 md:space-y-4">
                <h2 style={{ 
                  color: '#124854',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '24px',
                  fontWeight: 'var(--font-weight-medium)',
                  lineHeight: 'var(--line-height-heading)',
                  margin: 0
                }}>
                  Encuentra tu parcela ideal con<br className="hidden sm:inline" /><span className="sm:hidden"> </span>información clara y respaldo profesional
                </h2>
                <p className="body-lead max-w-2xl mx-auto text-[14px]" style={{ color: '#0A0A0A' }}>
                  Únete a cientos de personas que están tomando decisiones informadas 
                  sobre su próxima propiedad
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
                <button
                  onClick={() => onNavigate('parcelas')}
                  className="w-full sm:w-auto h-11 md:h-12 bg-[#124854] hover:bg-[#0d3640] text-white px-6 md:px-8 text-sm md:text-base leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center"
                >
                  Explorar parcelas
                </button>
                <button onClick={() => onNavigate('entry')} className="w-full sm:w-auto h-11 md:h-12 bg-[#efefef] hover:bg-[#dedede] text-black hover:text-[#303030] px-6 md:px-8 text-sm md:text-base leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center">
                  Crear cuenta gratis
                </button>
              </div>

              <p className="text-sm text-gray-500">
                Sin compromiso • Explora todas las funciones • Cancela cuando quieras
              </p>
            </div>
          </section>

          {/* Banner de Redes Sociales - Antes del Footer */}
          <section className="py-8 md:py-10 lg:py-12 bg-white relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <SocialMediaBanner />
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-white py-10 md:py-12 lg:py-16 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-12 mb-8 md:mb-10 lg:mb-12">
                <div className="sm:col-span-2 lg:col-span-4 space-y-4">
                  <img src={logo} alt="CompraTuParcela" className="h-14 md:h-16" style={{ marginLeft: '-12px' }} />
                  <p className="text-sm md:text-base max-w-xs" style={{ 
                    color: '#666',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 'var(--font-weight-regular)',
                    lineHeight: 'var(--line-height-relaxed)'
                  }}>
                    Plataforma especializada en compra y venta de parcelas
                  </p>
                </div>
                
                <div className="lg:col-span-2 space-y-3 md:space-y-4">
                  <div className="text-xs font-semibold tracking-wider" style={{ 
                    color: '#0A0A0A',
                    textTransform: 'uppercase',
                    fontWeight: 'var(--font-weight-semibold)'
                  }}>
                    Explorar
                  </div>
                  <div className="space-y-2.5 text-sm" style={{ 
                    color: '#666',
                    fontFamily: 'var(--font-body)',
                    lineHeight: 'var(--line-height-ui)'
                  }}>
                    <div className="cursor-pointer hover:text-[#124854] transition-colors">Parcelas</div>
                    <div className="cursor-pointer hover:text-[#124854] transition-colors">Inmobiliarias</div>
                    <div className="cursor-pointer hover:text-[#124854] transition-colors">Blog</div>
                  </div>
                </div>

                <div className="lg:col-span-3 space-y-3 md:space-y-4">
                  <div className="text-xs font-semibold tracking-wider" style={{ 
                    color: '#0A0A0A',
                    textTransform: 'uppercase',
                    fontWeight: 'var(--font-weight-semibold)'
                  }}>
                    Plataforma
                  </div>
                  <div className="space-y-2.5 text-sm" style={{ 
                    color: '#666',
                    fontFamily: 'var(--font-body)',
                    lineHeight: 'var(--line-height-ui)'
                  }}>
                    <div className="cursor-pointer hover:text-[#124854] transition-colors">Cómo funciona</div>
                    <div className="cursor-pointer hover:text-[#124854] transition-colors">Publicar propiedad</div>
                    <div className="cursor-pointer hover:text-[#124854] transition-colors">Planes para inmobiliarias</div>
                    <div className="cursor-pointer hover:text-[#124854] transition-colors">Para brokers</div>
                  </div>
                </div>

                <div className="lg:col-span-3 space-y-3 md:space-y-4">
                  <div className="text-xs font-semibold tracking-wider" style={{ 
                    color: '#0A0A0A',
                    textTransform: 'uppercase',
                    fontWeight: 'var(--font-weight-semibold)'
                  }}>
                    Soporte
                  </div>
                  <div className="space-y-2.5 text-sm" style={{ 
                    color: '#666',
                    fontFamily: 'var(--font-body)',
                    lineHeight: 'var(--line-height-ui)'
                  }}>
                    <div className="cursor-pointer hover:text-[#124854] transition-colors">Centro de ayuda</div>
                    <div
                      className="cursor-pointer hover:text-[#124854] transition-colors"
                      onClick={() => onNavigate('terminos-condiciones')}
                    >
                      Términos y condiciones
                    </div>
                    <div
                      className="cursor-pointer hover:text-[#124854] transition-colors"
                      onClick={() => onNavigate('politica-privacidad')}
                    >
                      Política de privacidad
                    </div>
                    <div
                      className="cursor-pointer hover:text-[#124854] transition-colors"
                      onClick={() => setIsContactModalOpen(true)}
                    >
                      Contacto
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 md:pt-8" style={{ borderTop: '1px solid #CDD8DE' }}>
                <p className="text-xs md:text-sm text-center" style={{ 
                  color: '#999',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 'var(--font-weight-regular)'
                }}>
                  © 2026 Compra Tu Parcela. Todos los derechos reservados.
                </p>
              </div>
            </div>
          </footer>
      </main>

      {/* Modal de Publicar Propiedad */}
      {showPublishModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center px-6">
          <div className="bg-white w-full max-w-md rounded-[24px] shadow-[0_20px_80px_rgba(0,0,0,0.3)] overflow-hidden relative">
            {/* Botón cerrar */}
            <button
              onClick={() => setShowPublishModal(false)}
              className="absolute top-6 right-6 text-gray-500 hover:text-black transition-colors z-10"
              aria-label="Cerrar"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Contenido del modal */}
            <div className="p-8 pt-10">
              {/* Título */}
              <h2 className="mb-4 pr-8" style={{ color: '#124854', fontSize: 'var(--font-size-h3)' }}>
                Para publicar tu propiedad, necesitas una cuenta
              </h2>

              {/* Descripción */}
              <p className="text-gray-600 mb-6" style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-light)', fontSize: 'var(--font-size-body-base)', lineHeight: 'var(--line-height-body)' }}>
                Crear una cuenta te permite gestionar tus publicaciones, recibir consultas de compradores reales y avanzar con seguridad durante todo el proceso.
              </p>

              {/* Botones principales */}
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setShowPublishModal(false);
                    if (onNavigateToPublish) {
                      onNavigateToPublish();
                    } else {
                      onNavigate('entry');
                    }
                  }}
                  className="w-full h-12 bg-[#124854] hover:bg-[#0d3640] text-white px-6 text-base leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center shadow-sm"
                >
                  Crear cuenta
                </button>
                <button
                  onClick={() => {
                    setShowPublishModal(false);
                    if (onNavigateToPublish) {
                      onNavigateToPublish();
                    } else {
                      onNavigate('entry');
                    }
                  }}
                  className="w-full h-12 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-black px-6 text-base leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center"
                >
                  Iniciar sesión
                </button>
              </div>

              {/* Texto de refuerzo */}
              <p className="text-gray-500 text-center mt-6" style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-light)', fontSize: 'var(--font-size-body-sm)' }}>
                Es rápido, sin compromiso y te guía paso a paso.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal de calculadora de presupuesto */}
      {isBudgetModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsBudgetModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Contenido del modal */}
            <div className="space-y-8">
              {/* Título */}
              <div>
                <h2 className="pr-8 mb-2" style={{ color: '#124854' }}>
                  Calculadora de presupuesto
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Ingresa tu presupuesto y ajusta los parámetros para ver cuánto pagarías mensualmente
                </p>
              </div>

              {/* Campo de presupuesto */}
              <div className="space-y-3">
                <label className="block" style={{ color: '#0A0A0A', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-body-sm)' }}>
                  Presupuesto total para la parcela
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-base">
                    $
                  </span>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="Ej: 50000000"
                    className="w-full h-12 pl-8 pr-4 border-2 border-gray-300 rounded-xl text-base focus:outline-none focus:border-[#0047BA] transition-colors"
                    style={{ color: '#0A0A0A' }}
                  />
                </div>
                {budget && (
                  <p className="text-sm text-gray-600">
                    {formatCurrency(parseFloat(budget))}
                  </p>
                )}
              </div>

              {/* Parámetros del crédito */}
              <div className="space-y-6 border-t border-gray-200 pt-6">
                <h4 style={{ color: '#0A0A0A' }}>
                  Parámetros del crédito
                </h4>

                {/* Pie inicial */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label style={{ color: '#0A0A0A', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-body-sm)' }}>
                      Pie inicial
                    </label>
                    <span style={{ color: '#0A0A0A', fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-body-sm)' }}>
                      {downPaymentPercent}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    step="5"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #0047BA 0%, #0047BA ${(downPaymentPercent - 10) / 0.4}%, #e5e7eb ${(downPaymentPercent - 10) / 0.4}%, #e5e7eb 100%)`
                    }}
                  />
                  {budget && (
                    <p className="text-sm text-gray-600">
                      Pie: {formatCurrency(parseFloat(budget) * downPaymentPercent / 100)} • Crédito: {formatCurrency(parseFloat(budget) * (1 - downPaymentPercent / 100))}
                    </p>
                  )}
                </div>

                {/* Plazo */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label style={{ color: '#0A0A0A', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-body-sm)' }}>
                      Plazo del crédito
                    </label>
                    <span style={{ color: '#0A0A0A', fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-body-sm)' }}>
                      {loanTermYears} años
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="5"
                    value={loanTermYears}
                    onChange={(e) => setLoanTermYears(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #0047BA 0%, #0047BA ${(loanTermYears - 5) / 0.25}%, #e5e7eb ${(loanTermYears - 5) / 0.25}%, #e5e7eb 100%)`
                    }}
                  />
                </div>

                {/* Tasa de interés */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label style={{ color: '#0A0A0A', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-body-sm)' }}>
                      Tasa de interés anual
                    </label>
                    <span style={{ color: '#0A0A0A', fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-body-sm)' }}>
                      {annualInterestRate}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="8"
                    step="0.5"
                    value={annualInterestRate}
                    onChange={(e) => setAnnualInterestRate(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #0047BA 0%, #0047BA ${(annualInterestRate - 3) / 0.05}%, #e5e7eb ${(annualInterestRate - 3) / 0.05}%, #e5e7eb 100%)`
                    }}
                  />
                </div>
              </div>

              {/* Resultado destacado */}
              {budget && parseFloat(budget) > 0 && (
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                  <div className="text-center space-y-2">
                    <p className="text-sm font-medium text-gray-600">
                      Cuota mensual aproximada
                    </p>
                    <p className="text-4xl font-bold" style={{ color: '#0047BA' }}>
                      {formatCurrency(calculateMonthlyPayment())}
                    </p>
                    <p className="text-xs text-gray-500">
                      Por {loanTermYears} años ({loanTermYears * 12} cuotas)
                    </p>
                  </div>
                </div>
              )}

              {/* Botón de acción */}
              <button
                onClick={() => {
                  setIsBudgetModalOpen(false);
                  // Los valores ya están guardados en los estados
                }}
                className="w-full h-12 bg-[#124854] hover:bg-[#0d3640] text-white px-4 text-base leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center"
              >
                Aplicar configuración
              </button>

              {/* Nota aclaratoria */}
              <p className="text-xs text-gray-500 text-center">
                Este cálculo es referencial. Las condiciones reales dependen de tu institución financiera.
              </p>
            </div>
          </div>
        </div>
      )}

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
                  Buscar parcelas
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
              {/* Ubicación */}
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
                  Ubicación
                </label>
                <div className="relative">
                  <select 
                    value={selectedValues.ubicacion}
                    onChange={(e) => setSelectedValues(prev => ({ ...prev, ubicacion: e.target.value }))}
                    className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-10 py-2.5 rounded-[100px] appearance-none cursor-pointer transition-colors"
                    style={{ 
                      color: '#0A0A0A',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '13px',
                      fontWeight: 400
                    }}
                  >
                    {dropdownOptions.ubicacion.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Tipo */}
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
                  Tipo
                </label>
                <div className="relative">
                  <select 
                    value={selectedValues.tipo}
                    onChange={(e) => setSelectedValues(prev => ({ ...prev, tipo: e.target.value }))}
                    className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-10 py-2.5 rounded-[100px] appearance-none cursor-pointer transition-colors"
                    style={{ 
                      color: '#0A0A0A',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '13px',
                      fontWeight: 400
                    }}
                  >
                    {dropdownOptions.tipo.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Superficie */}
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
                  Superficie
                </label>
                <div className="relative">
                  <select 
                    value={selectedValues.superficie}
                    onChange={(e) => setSelectedValues(prev => ({ ...prev, superficie: e.target.value }))}
                    className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-10 py-2.5 rounded-[100px] appearance-none cursor-pointer transition-colors"
                    style={{ 
                      color: '#0A0A0A',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '13px',
                      fontWeight: 400
                    }}
                  >
                    {dropdownOptions.superficie.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Condición */}
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
                  Condición
                </label>
                <div className="relative">
                  <select 
                    value={selectedValues.condicion}
                    onChange={(e) => setSelectedValues(prev => ({ ...prev, condicion: e.target.value }))}
                    className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-10 py-2.5 rounded-[100px] appearance-none cursor-pointer transition-colors"
                    style={{ 
                      color: '#0A0A0A',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '13px',
                      fontWeight: 400
                    }}
                  >
                    {dropdownOptions.condicion.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Precio */}
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
                  Rango de precio
                </label>
                <div className="relative">
                  <select 
                    value={selectedValues.precio}
                    onChange={(e) => setSelectedValues(prev => ({ ...prev, precio: e.target.value }))}
                    className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black pl-4 pr-10 py-2.5 rounded-[100px] appearance-none cursor-pointer transition-colors"
                    style={{ 
                      color: '#0A0A0A',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '13px',
                      fontWeight: 400
                    }}
                  >
                    {dropdownOptions.precio.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Botón de búsqueda inteligente en mobile */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    setIsMobileFiltersOpen(false);
                    setIsSmartSearchBottomSheetOpen(true);
                  }}
                  className="w-full h-12 bg-[#efefef] hover:bg-[#dedede] text-black rounded-[100px] transition-colors flex items-center justify-center gap-2"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    fontWeight: 500
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Búsqueda inteligente</span>
                </button>
              </div>

              {/* Botón de aplicar búsqueda */}
              <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
                <button
                  onClick={() => {
                    onNavigate('parcelas', undefined, selectedValues);
                    setIsMobileFiltersOpen(false);
                  }}
                  className="w-full h-12 bg-[#124854] hover:bg-[#0d3640] text-white rounded-[100px] transition-colors"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    fontWeight: 500
                  }}
                >
                  Buscar
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
                  placeholder="Ej: busco una parcela cerca de un lago para vivir"
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
                        ? 'bg-[#124854] text-white border border-[#124854] hover:bg-[#0d3640]'
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
                        ? 'bg-[#124854] text-white border border-[#124854] hover:bg-[#0d3640]'
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
                        ? 'bg-[#124854] text-white border border-[#124854] hover:bg-[#0d3640]'
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
                        ? 'bg-[#124854] text-white border border-[#124854] hover:bg-[#0d3640]'
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
                  <button 
                    onClick={() => toggleBadge('servicios')}
                    className={`px-4 py-2 text-sm rounded-[100px] transition-all duration-200 flex items-center gap-2 ${
                      selectedBadges.includes('servicios')
                        ? 'bg-[#124854] text-white border border-[#124854] hover:bg-[#0d3640]'
                        : 'text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                    }`}
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 400, 
                      lineHeight: '1.5' 
                    }}
                  >
                    <Zap className="w-4 h-4" />
                    <span>Con servicios disponibles</span>
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
                  className="w-full h-12 bg-[#124854] hover:bg-[#0d3640] text-white rounded-[100px] transition-colors"
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

      {/* Vambe Chat Assistant */}
      <VambeChat context="home" />

      <style>{`
        @keyframes slideInUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        /* Slick Carousel Styles */
        .slick-slider {
          position: relative;
          display: block;
          box-sizing: border-box;
          user-select: none;
          touch-action: pan-y;
        }

        .slick-list {
          position: relative;
          display: block;
          overflow: hidden;
          margin: 0;
          padding: 0;
        }

        .slick-list:focus {
          outline: none;
        }

        .slick-track {
          position: relative;
          top: 0;
          left: 0;
          display: block;
          margin-left: auto;
          margin-right: auto;
        }

        .slick-track:before,
        .slick-track:after {
          display: table;
          content: '';
        }

        .slick-track:after {
          clear: both;
        }

        .slick-slide {
          display: none;
          float: left;
          height: 100%;
          min-height: 1px;
        }

        .slick-slide img {
          display: block;
        }

        .slick-initialized .slick-slide {
          display: block;
        }

        .slick-dots {
          position: relative;
          bottom: 0;
          display: flex !important;
          justify-content: center;
          align-items: center;
          gap: 8px;
          margin: 0;
          padding: 20px 0 0 0;
          list-style: none;
        }

        .slick-dots li {
          position: relative;
          display: inline-block;
          margin: 0;
          padding: 0;
          cursor: pointer;
        }

        .slick-dots li button {
          font-size: 0;
          line-height: 0;
          display: block;
          width: 8px;
          height: 8px;
          padding: 0;
          cursor: pointer;
          color: transparent;
          border: 0;
          outline: none;
          background: #D1D5DB;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .slick-dots li button:hover {
          background: #9CA3AF;
        }

        .slick-dots li.slick-active button {
          background: #124854;
          width: 24px;
          border-radius: 4px;
        }

        .slick-arrow {
          display: none !important;
        }
      `}</style>

      {/* Modal de Contacto */}
      {isContactModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center px-4"
          onClick={() => setIsContactModalOpen(false)}
        >
          <div
            className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón cerrar */}
            <button
              onClick={() => setIsContactModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors z-10"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Contenido del modal */}
            <div className="p-8">
              {/* Título */}
              <h2 className="mb-6 pr-8" style={{
                color: '#124854',
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--font-size-h3)',
                fontWeight: 'var(--font-weight-semibold)'
              }}>
                Contacto
              </h2>

              {/* Lista de información de contacto */}
              <div className="space-y-5">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F0F9FF] flex items-center justify-center">
                    <Mail className="w-5 h-5" style={{ color: '#124854' }} />
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-sm mb-1" style={{
                      color: '#666',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 'var(--font-weight-medium)'
                    }}>
                      Email
                    </p>
                    <a
                      href="mailto:contacto@compratuparcela.cl"
                      className="hover:underline"
                      style={{
                        color: '#0A0A0A',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-base)'
                      }}
                    >
                      contacto@compratuparcela.cl
                    </a>
                  </div>
                </div>

                {/* Teléfono / WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F0F9FF] flex items-center justify-center">
                    <Phone className="w-5 h-5" style={{ color: '#124854' }} />
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-sm mb-1" style={{
                      color: '#666',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 'var(--font-weight-medium)'
                    }}>
                      Teléfono / WhatsApp
                    </p>
                    <a
                      href="https://wa.me/56977714626"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                      style={{
                        color: '#0A0A0A',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-base)'
                      }}
                    >
                      +569 777 14626
                    </a>
                  </div>
                </div>

                {/* Horario de atención */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F0F9FF] flex items-center justify-center">
                    <Clock className="w-5 h-5" style={{ color: '#124854' }} />
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-sm mb-1" style={{
                      color: '#666',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 'var(--font-weight-medium)'
                    }}>
                      Horario de atención
                    </p>
                    <p style={{
                      color: '#0A0A0A',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-base)'
                    }}>
                      Lunes a Viernes, 9:00 – 18:00 hrs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}