import { SiteFooter } from '@/app/components/SiteFooter';
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, MapPin, Phone, Mail, CheckCircle, FileCheck, TrendingUp, Building2, Scale, FileText, Handshake, Shield, Users, CreditCard, X, ChevronRight, Star } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { getAllParcelas } from '@/app/data/parcelasData';
import { getAllProyectos } from '@/app/data/proyectosData';
import { ParcelaCard } from '@/app/components/ParcelaCard';
import { ProjectCard } from '@/app/components/ProjectCard';
import { Tabs } from '@/app/components/Tabs';
import logo from 'figma:asset/a4719ce43ce52ee49df30a2a5c090c8a8b743667.png';

interface InmobiliariaProfileProps {
  onNavigate: (screen: string, id?: number, data?: string) => void;
  inmobiliariaName: string | null;
}

export function InmobiliariaProfile({ onNavigate, inmobiliariaName }: InmobiliariaProfileProps) {
  const [activeTab, setActiveTab] = useState('sobre');
  const [isLoading, setIsLoading] = useState(true);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showContactBrokerModal, setShowContactBrokerModal] = useState(false);
  const [selectedBroker, setSelectedBroker] = useState<{ nombre: string; rol: string; imagen: string; zona: string; parcelasActivas: number; estado: string } | null>(null);
  const [contactForm, setContactForm] = useState({ nombre: '', email: '', mensaje: '' });
  const [contactSent, setContactSent] = useState(false);
  const [showTestimoniosModal, setShowTestimoniosModal] = useState(false);
  const tabContentRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const equipoScrollRef = useRef<HTMLDivElement>(null);
  const testimoniosScrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingTestimonios, setIsDraggingTestimonios] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [testimoniosStartX, setTestimoniosStartX] = useState(0);
  const [testimoniosScrollLeft, setTestimoniosScrollLeft] = useState(0);

  // Función para drag del carrusel
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!equipoScrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - equipoScrollRef.current.offsetLeft);
    setScrollLeft(equipoScrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !equipoScrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - equipoScrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Multiplicador para velocidad de scroll
    equipoScrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Función para drag del carrusel de testimonios
  const handleTestimoniosMouseDown = (e: React.MouseEvent) => {
    if (!testimoniosScrollRef.current) return;
    setIsDraggingTestimonios(true);
    setTestimoniosStartX(e.pageX - testimoniosScrollRef.current.offsetLeft);
    setTestimoniosScrollLeft(testimoniosScrollRef.current.scrollLeft);
  };

  const handleTestimoniosMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingTestimonios || !testimoniosScrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - testimoniosScrollRef.current.offsetLeft;
    const walk = (x - testimoniosStartX) * 2; // Multiplicador para velocidad de scroll
    testimoniosScrollRef.current.scrollLeft = testimoniosScrollLeft - walk;
  };

  const handleTestimoniosMouseUp = () => {
    setIsDraggingTestimonios(false);
  };

  const handleTestimoniosMouseLeave = () => {
    setIsDraggingTestimonios(false);
  };

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1300);
    return () => clearTimeout(t);
  }, []);

  const parcelasPublicadas = getAllParcelas().filter(
    parcela => parcela.inmobiliaria.nombre === inmobiliariaName
  );

  const proyectosPublicados = getAllProyectos().filter(
    proyecto => proyecto.publicadoPor === inmobiliariaName
  );

  // Función para cambiar tab y hacer scroll
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    setTimeout(() => {
      if (tabContentRef.current) {
        const tabsElement = document.querySelector('[data-tabs-container]');
        if (tabsElement) {
          const yOffset = -100;
          const y = tabsElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    }, 100);
  };

  const inmobiliaria = parcelasPublicadas[0]?.inmobiliaria || 
    (proyectosPublicados[0] ? {
      nombre: proyectosPublicados[0].publicadoPor,
      tipoVendedor: proyectosPublicados[0].tipoVendedor,
      descripcion: proyectosPublicados[0].descripcionVendedor || '',
      logo: proyectosPublicados[0].imagenVendedor,
      telefono: proyectosPublicados[0].telefonoVendedor,
      email: proyectosPublicados[0].emailVendedor
    } : null);

  if (!inmobiliaria) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--input-background)' }}>
        <div className="text-center">
          <h2 style={{ color: 'var(--foreground)', marginBottom: '1rem' }}>Inmobiliaria no encontrada</h2>
          <p style={{ marginBottom: '2rem', marginTop: '1rem', color: '#6B6B6B' }}>
            No se encontraron datos para "{inmobiliariaName}"
          </p>
          <button 
            onClick={() => onNavigate('inmobiliarias')}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-sm)',
              fontWeight: 'var(--font-weight-medium)',
              backgroundColor: '#006B4E'
            }}
            className="h-10 text-white px-8 rounded-[200px] transition-colors inline-flex items-center justify-center"
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#01533E'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
          >
            Volver a Inmobiliarias
          </button>
        </div>
      </div>
    );
  }

  const profileData = {
    ubicacionPrincipal: 'Chile Chico, Aysén',
    añosExperiencia: 15,
    zonasOperacion: ['Aysén', 'Los Lagos', 'Patagonia'],
    tiposPropiedad: ['Parcelas rurales', 'Terrenos turísticos', 'Campos'],
    quienesSomos: 'Con años de trayectoria en la región, somos especialistas en conectar a personas con propiedades en la Patagonia. Nuestro compromiso es brindarte asesoría transparente y acompañamiento profesional en cada etapa de tu inversión.',
    equipo: [
      { nombre: 'María González', rol: 'Gerente Comercial', imagen: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY5NTc1Mzk1fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { nombre: 'Carlos Ramírez', rol: 'Asesor Senior', imagen: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMG1hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2OTYwODg3Nnww&ixlib=rb-4.1.0&q=80&w=1080' },
      { nombre: 'Ana Silva', rol: 'Coordinadora Legal', imagen: 'https://images.unsplash.com/photo-1758518729459-235dcaadc611?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc3dvbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzY5NTA3NDM2fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { nombre: 'Roberto Fernández', rol: 'Asesor Comercial', imagen: 'https://images.unsplash.com/photo-1568585105565-e372998a195d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc21hbiUyMGhlYWRzaG90fGVufDF8fHx8MTc2OTU5NjgyNHww&ixlib=rb-4.1.0&q=80&w=1080' },
      { nombre: 'Patricia Morales', rol: 'Especialista en Terrenos', imagen: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGhlYWRzaG90fGVufDF8fHx8MTc2OTYwODg3Nnww&ixlib=rb-4.1.0&q=80&w=1080' },
      { nombre: 'Javier Torres', rol: 'Asesor de Ventas', imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBoZWFkc2hvdHxlbnwxfHx8fDE3Njk2MDg4NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { nombre: 'Sofía Vargas', rol: 'Asesora Financiera', imagen: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY5NjA4ODc2fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { nombre: 'Diego Muñoz', rol: 'Coordinador de Proyectos', imagen: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njk2MDg4NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { nombre: 'Valentina Soto', rol: 'Especialista en Marketing', imagen: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJ1c2luZXNzfGVufDF8fHx8MTc2OTYwODg3Nnww&ixlib=rb-4.1.0&q=80&w=1080' }
    ],
    brokers: [
      { 
        nombre: 'María González', 
        rol: 'Broker Senior', 
        imagen: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY5NTc1Mzk1fDA&ixlib=rb-4.1.0&q=80&w=1080',
        zona: 'Aysén y Los Lagos',
        parcelasActivas: 12,
        estado: 'Activo'
      },
      { 
        nombre: 'Carlos Ramírez', 
        rol: 'Asesor Comercial', 
        imagen: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMG1hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2OTYwODg3Nnww&ixlib=rb-4.1.0&q=80&w=1080',
        zona: 'Patagonia',
        parcelasActivas: 8,
        estado: 'Activo'
      },
      { 
        nombre: 'Ana Silva', 
        rol: 'Broker', 
        imagen: 'https://images.unsplash.com/photo-1758518729459-235dcaadc611?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc3dvbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzY5NTA3NDM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
        zona: 'Los Lagos',
        parcelasActivas: 15,
        estado: 'Activo'
      },
      { 
        nombre: 'Roberto Fernández', 
        rol: 'Asesor Comercial', 
        imagen: 'https://images.unsplash.com/photo-1568585105565-e372998a195d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc21hbiUyMGhlYWRzaG90fGVufDF8fHx8MTc2OTU5NjgyNHww&ixlib=rb-4.1.0&q=80&w=1080',
        zona: 'Aysén',
        parcelasActivas: 10,
        estado: 'Activo'
      },
      { 
        nombre: 'Patricia Morales', 
        rol: 'Broker', 
        imagen: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGhlYWRzaG90fGVufDF8fHx8MTc2OTYwODg3Nnww&ixlib=rb-4.1.0&q=80&w=1080',
        zona: 'Patagonia Sur',
        parcelasActivas: 6,
        estado: 'Activo'
      },
      { 
        nombre: 'Javier Torres', 
        rol: 'Asesor Comercial', 
        imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBoZWFkc2hvdHxlbnwxfHx8fDE3Njk2MDg4NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        zona: 'Los Lagos Norte',
        parcelasActivas: 9,
        estado: 'Activo'
      }
    ],
    servicios: [
      { icon: <Building2 className="w-5 h-5" style={{ color: 'var(--foreground)' }} />, titulo: 'Venta de parcelas', descripcion: 'Asesoría completa en compra y venta' },
      { icon: <Scale className="w-5 h-5" style={{ color: 'var(--foreground)' }} />, titulo: 'Asesoramiento legal', descripcion: 'Equipo legal especializado' },
      { icon: <FileText className="w-5 h-5" style={{ color: 'var(--foreground)' }} />, titulo: 'Gestión de escritura', descripcion: 'Tramitación de documentos' },
      { icon: <Handshake className="w-5 h-5" style={{ color: 'var(--foreground)' }} />, titulo: 'Acompañamiento posventa', descripcion: 'Seguimiento integral' }
    ],
    badges: [
      { icon: <Shield className="w-4 h-4" style={{ color: 'var(--foreground)' }} />, texto: 'Inmobiliaria verificada' },
      { icon: <FileCheck className="w-4 h-4" style={{ color: 'var(--foreground)' }} />, texto: 'Documentación validada' },
      { icon: <CheckCircle className="w-4 h-4" style={{ color: 'var(--foreground)' }} />, texto: 'Rol aprobado' },
      { icon: <CreditCard className="w-4 h-4" style={{ color: 'var(--foreground)' }} />, texto: 'Financiamiento disponible' }
    ],
    testimonios: [
      {
        nombre: 'Carolina Muñoz',
        ubicacion: 'Puerto Varas',
        calificacion: 5,
        testimonio: 'Excelente servicio y asesoría. Me ayudaron en cada paso de la compra de mi parcela en la zona de Los Lagos. Muy profesionales y confiables.',
        tipo: 'Compra de parcela'
      },
      {
        nombre: 'Roberto Sepúlveda',
        ubicacion: 'Coyhaique',
        calificacion: 5,
        testimonio: 'Quedé muy satisfecho con la atención recibida. El equipo fue transparente y me acompañó durante todo el proceso legal y de escrituración.',
        tipo: 'Compra de parcela'
      },
      {
        nombre: 'Daniela Torres',
        ubicacion: 'Chile Chico',
        calificacion: 5,
        testimonio: 'La mejor decisión fue trabajar con ellos. Conocen muy bien la zona y me ayudaron a encontrar exactamente lo que buscaba.',
        tipo: 'Compra de parcela'
      },
      {
        nombre: 'Martín Valdés',
        ubicacion: 'Osorno',
        calificacion: 5,
        testimonio: 'Profesionales serios y comprometidos. Me asesoraron de principio a fin y respondieron todas mis dudas con paciencia.',
        tipo: 'Compra de parcela'
      },
      {
        nombre: 'Andrea Rojas',
        ubicacion: 'Puerto Montt',
        calificacion: 5,
        testimonio: 'Muy buena experiencia. El proceso fue rápido y claro. Recomiendo totalmente sus servicios para quien busque invertir en parcelas.',
        tipo: 'Compra de parcela'
      },
      {
        nombre: 'Felipe González',
        ubicacion: 'Futaleufú',
        calificacion: 5,
        testimonio: 'Encontré la parcela perfecta gracias a su conocimiento del mercado local. Excelente atención y seguimiento posventa.',
        tipo: 'Compra de parcela'
      }
    ]
  };

  const tabs = [
    { id: 'sobre', label: 'Sobre la inmobiliaria' },
    { id: 'parcelas', label: 'Parcelas' },
    { id: 'brokers', label: 'Brokers' }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <header className="fixed top-8 left-0 right-0 z-50" style={{ backgroundColor: 'var(--hero-background)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-0">
              <img 
                src={logo} 
                alt="CompraTuParcela" 
                className="h-14 cursor-pointer" 
                onClick={() => onNavigate('home')}
              />
              
              <nav className="flex items-center justify-center gap-0 whitespace-nowrap">
                <button onClick={() => onNavigate('parcelas')} className="h-8 px-4 text-sm leading-[1.5] font-normal text-black hover:bg-[#efefef] hover:text-[#303030] rounded-[200px] transition-colors whitespace-nowrap flex items-center justify-center">Parcelas</button>
                <button onClick={() => onNavigate('inmobiliarias')} className="h-8 px-4 text-sm leading-[1.5] font-normal text-black hover:bg-[#efefef] hover:text-[#303030] rounded-[200px] transition-colors whitespace-nowrap flex items-center justify-center">Inmobiliarias</button>
                <button onClick={() => onNavigate('como-funciona')} className="h-8 px-4 text-sm leading-[1.5] font-normal text-black hover:bg-[#efefef] hover:text-[#303030] rounded-[200px] transition-colors whitespace-nowrap flex items-center justify-center">Cómo funciona</button>
                <button onClick={() => onNavigate('recursos')} className="h-8 px-4 text-sm leading-[1.5] font-normal text-black hover:bg-[#efefef] hover:text-[#303030] rounded-[200px] transition-colors whitespace-nowrap flex items-center justify-center">Recursos</button>
              </nav>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button 
                style={{ backgroundColor: '#006B4E' }}
                className="h-8 text-white px-[20px] text-sm leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center py-[0px]"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#01533E'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
              >                Publicar propiedad
              </button>
              <button 
                onClick={() => onNavigate('entry')}
                className="h-8 bg-[#efefef] hover:bg-[#dedede] text-black hover:text-[#303030] px-[20px] text-sm leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center py-[0px]"
              >
                Ingresar
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative pt-28" style={{ backgroundColor: 'var(--hero-background)' }}>
        {/* HERO SECTION */}
        <section className="relative py-20 overflow-hidden" style={{ backgroundColor: 'var(--hero-background)' }}>
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1672404029233-49796e381f09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXJpYWwlMjBwcm9wZXJ0eSUyMGxhbmRzY2FwZSUyMG1vdW50YWluc3xlbnwxfHx8fDE3Njk0NjU2ODF8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Hero background"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            <button 
              onClick={() => onNavigate('inmobiliarias')}
              className="flex items-center gap-2 mb-8 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span style={{ fontSize: 'var(--font-size-body-sm)', fontFamily: 'var(--font-body)' }}>Volver a Inmobiliarias</span>
            </button>

            {isLoading ? (
              <div className="flex flex-col md:flex-row gap-8 items-start max-w-5xl animate-pulse">
                <div className="w-32 h-32 rounded-[16px] flex-shrink-0" style={{ backgroundColor: '#E5E7EB' }} />
                <div className="flex-1 space-y-4 pt-2">
                  <div className="h-10 rounded-full" style={{ backgroundColor: '#E5E7EB', width: '55%' }} />
                  <div className="flex gap-3">
                    <div className="h-7 rounded-full" style={{ backgroundColor: '#E5E7EB', width: '160px' }} />
                    <div className="h-7 rounded-full" style={{ backgroundColor: '#E5E7EB', width: '120px' }} />
                  </div>
                  <div className="h-5 rounded-full" style={{ backgroundColor: '#E5E7EB', width: '70%' }} />
                  <div className="h-5 rounded-full" style={{ backgroundColor: '#E5E7EB', width: '50%' }} />
                  <div className="flex gap-3 pt-2">
                    <div className="h-10 rounded-full" style={{ backgroundColor: '#E5E7EB', width: '120px' }} />
                    <div className="h-10 rounded-full" style={{ backgroundColor: '#E5E7EB', width: '140px' }} />
                  </div>
                </div>
              </div>
            ) : (
            <div className="flex flex-col md:flex-row gap-8 items-start max-w-5xl">
              <div className="w-32 h-32 bg-white rounded-[16px] overflow-hidden border-4 border-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex-shrink-0">
                <ImageWithFallback 
                  src={inmobiliaria.logo} 
                  alt={inmobiliaria.nombre}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 space-y-5">
                <div>
                  <h1 style={{ 
                    color: 'var(--foreground)', 
                    marginBottom: '1rem',
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--font-size-display)',
                    fontWeight: 'var(--font-weight-light)',
                    lineHeight: 'var(--line-height-heading)',
                    letterSpacing: 'var(--letter-spacing-tighter)'
                  }}>
                    {inmobiliaria.nombre}
                  </h1>
                  
                  <div className="flex items-center gap-4 flex-wrap mb-3">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm" style={{ 
                      color: 'var(--foreground)',
                      fontSize: 'var(--font-size-xs)',
                      fontWeight: 'var(--font-weight-semibold)',
                      fontFamily: 'var(--font-body)',
                      letterSpacing: '0.01em'
                    }}>
                      <Shield className="w-4 h-4" style={{ color: 'var(--foreground)' }} />
                      Inmobiliaria verificada
                    </span>
                    
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span style={{ fontSize: 'var(--font-size-body-sm)', fontFamily: 'var(--font-body)' }}>
                        {profileData.ubicacionPrincipal}
                      </span>
                    </div>
                  </div>
                </div>

                <p style={{ 
                  color: '#404040', 
                  maxWidth: '42rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '20px',
                  fontWeight: 'var(--font-weight-light)',
                  lineHeight: 'var(--line-height-body)'
                }}>
                  {inmobiliaria.descripcion}
                </p>

                <div className="flex gap-3 flex-wrap pt-3">
                  <button
                    onClick={() => {
                      if (activeTab !== 'sobre') setActiveTab('sobre');
                      setTimeout(() => {
                        contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }, activeTab !== 'sobre' ? 150 : 0);
                    }}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      backgroundColor: '#006B4E'
                    }}
                    className="h-10 text-white px-[32px] rounded-[200px] transition-colors flex items-center justify-center shadow-sm"
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#01533E'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
                  >
                    Contactar
                  </button>
                  <button 
                    onClick={() => handleTabChange('parcelas')}
                    className="h-10 bg-[#efefef] hover:bg-[#dedede] text-black hover:text-[#303030] px-[32px] rounded-[200px] transition-colors flex items-center justify-center"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)'
                    }}
                  >
                    Ver propiedades
                  </button>
                </div>
              </div>
            </div>
            )}
          </div>
        </section>

        {/* TABS */}
        <div className="bg-white" data-tabs-container>
          <div className="max-w-7xl mx-auto px-6">
            <div className="py-6 flex justify-center">
              <Tabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
            </div>
          </div>
        </div>

        {/* TAB CONTENT */}
        <div className="bg-white py-12" ref={tabContentRef}>
          <div className="max-w-7xl mx-auto px-6">
            {isLoading ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
                <div className="lg:col-span-2 space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="rounded-xl p-6" style={{ border: '2px solid #E5E7EB', minHeight: '120px' }}>
                        <div className="w-12 h-12 rounded-full mb-3" style={{ backgroundColor: '#E5E7EB' }} />
                        <div className="h-8 rounded-full mb-2" style={{ backgroundColor: '#E5E7EB', width: '50%' }} />
                        <div className="h-3 rounded-full" style={{ backgroundColor: '#F3F4F6', width: '70%' }} />
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl p-6" style={{ border: '2px solid #E5E7EB' }}>
                    <div className="h-5 rounded-full mb-4" style={{ backgroundColor: '#E5E7EB', width: '30%' }} />
                    <div className="grid grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-16 rounded-xl" style={{ backgroundColor: '#F3F4F6' }} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="rounded-xl p-6" style={{ border: '2px solid #E5E7EB', minHeight: '200px' }}>
                    <div className="h-5 rounded-full mb-4" style={{ backgroundColor: '#E5E7EB', width: '50%' }} />
                    <div className="space-y-2">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-3 rounded-full" style={{ backgroundColor: '#F3F4F6', width: i % 2 === 0 ? '65%' : '85%' }} />
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl p-6" style={{ border: '2px solid #E5E7EB', minHeight: '160px' }}>
                    <div className="h-5 rounded-full mb-4" style={{ backgroundColor: '#E5E7EB', width: '40%' }} />
                    <div className="flex gap-3">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-16 h-16 rounded-full" style={{ backgroundColor: '#F3F4F6' }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : activeTab === 'sobre' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Columna principal */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* MÉTRICAS CLAVE */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl border-2 p-6 hover:shadow-md transition-shadow" style={{ borderColor: 'var(--border)' }}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#006B4E' }}>
                          <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <p style={{ 
                        fontSize: '2.5rem',
                        fontWeight: 'var(--font-weight-light)',
                        fontFamily: 'var(--font-heading)',
                        color: 'var(--foreground)',
                        lineHeight: '1',
                        marginBottom: '0.5rem'
                      }}>
                        {profileData.añosExperiencia}
                      </p>
                      <p style={{ 
                        fontSize: 'var(--font-size-body-base)',
                        fontWeight: 'var(--font-weight-semibold)',
                        fontFamily: 'var(--font-body)',
                        color: 'var(--foreground)',
                        marginBottom: '0.25rem'
                      }}>
                        Años de experiencia
                      </p>
                      <p style={{ fontSize: 'var(--font-size-xs)', color: '#737373', fontFamily: 'var(--font-body)' }}>
                        Especialistas en la región
                      </p>
                    </div>

                    <div className="bg-white rounded-xl border-2 p-6 hover:shadow-md transition-shadow" style={{ borderColor: 'var(--border)' }}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--input-background)' }}>
                          <Building2 className="w-6 h-6" style={{ color: 'var(--foreground)' }} />
                        </div>
                      </div>
                      <p style={{ 
                        fontSize: '2.5rem',
                        fontWeight: 'var(--font-weight-light)',
                        fontFamily: 'var(--font-heading)',
                        color: 'var(--foreground)',
                        lineHeight: '1',
                        marginBottom: '0.5rem'
                      }}>
                        {parcelasPublicadas.length}
                      </p>
                      <p style={{ 
                        fontSize: 'var(--font-size-body-base)',
                        fontWeight: 'var(--font-weight-semibold)',
                        fontFamily: 'var(--font-body)',
                        color: 'var(--foreground)',
                        marginBottom: '0.25rem'
                      }}>
                        Parcelas activas
                      </p>
                      <p style={{ fontSize: 'var(--font-size-xs)', color: '#737373', fontFamily: 'var(--font-body)' }}>
                        Disponibles para venta
                      </p>
                    </div>

                    <div className="bg-white rounded-xl border-2 p-6 hover:shadow-md transition-shadow" style={{ borderColor: 'var(--border)' }}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--input-background)' }}>
                          <MapPin className="w-6 h-6" style={{ color: 'var(--foreground)' }} />
                        </div>
                      </div>
                      <p style={{ 
                        fontSize: '2.5rem',
                        fontWeight: 'var(--font-weight-light)',
                        fontFamily: 'var(--font-heading)',
                        color: 'var(--foreground)',
                        lineHeight: '1',
                        marginBottom: '0.5rem'
                      }}>
                        {profileData.zonasOperacion.length}
                      </p>
                      <p style={{ 
                        fontSize: 'var(--font-size-body-base)',
                        fontWeight: 'var(--font-weight-semibold)',
                        fontFamily: 'var(--font-body)',
                        color: 'var(--foreground)',
                        marginBottom: '0.25rem'
                      }}>
                        Zonas de operación
                      </p>
                      <p style={{ fontSize: 'var(--font-size-xs)', color: '#737373', fontFamily: 'var(--font-body)' }}>
                        Cobertura regional
                      </p>
                    </div>
                  </div>

                  {/* SERVICIOS OFRECIDOS */}
                  <div className="bg-white rounded-xl border p-8" style={{ borderColor: 'var(--border)' }}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--input-background)' }}>
                        <Handshake className="w-5 h-5" style={{ color: 'var(--foreground)' }} />
                      </div>
                      <h3 style={{ 
                        fontSize: 'var(--font-size-h3)',
                        fontWeight: 'var(--font-weight-medium)',
                        fontFamily: 'var(--font-heading)',
                        color: 'var(--foreground)'
                      }}>
                        Servicios ofrecidos
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {profileData.servicios.map((servicio, index) => (
                        <div
                          key={index}
                          className="px-4 py-3 rounded-xl border"
                          style={{ backgroundColor: 'var(--input-background)', borderColor: 'var(--border)' }}
                        >
                          <p style={{
                            fontSize: 'var(--font-size-body-base)',
                            fontWeight: 'var(--font-weight-semibold)',
                            fontFamily: 'var(--font-body)',
                            color: 'var(--foreground)'
                          }}>
                            {servicio.titulo}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* TESTIMONIOS DE CLIENTES */}
                  <div className="bg-white rounded-xl border p-8" style={{ borderColor: 'var(--border)' }}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--input-background)' }}>
                        <Star className="w-5 h-5" style={{ color: 'var(--foreground)' }} />
                      </div>
                      <h3 style={{ 
                        fontSize: 'var(--font-size-h3)',
                        fontWeight: 'var(--font-weight-medium)',
                        fontFamily: 'var(--font-heading)',
                        color: 'var(--foreground)'
                      }}>
                        Testimonios de clientes
                      </h3>
                    </div>

                    {/* Carrusel horizontal de testimonios */}
                    <div 
                      ref={testimoniosScrollRef}
                      className="flex gap-4 overflow-x-auto pb-4 mb-4 scrollbar-hide"
                      style={{ 
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        WebkitOverflowScrolling: 'touch',
                        cursor: isDraggingTestimonios ? 'grabbing' : 'grab'
                      }}
                      onMouseDown={handleTestimoniosMouseDown}
                      onMouseMove={handleTestimoniosMouseMove}
                      onMouseUp={handleTestimoniosMouseUp}
                      onMouseLeave={handleTestimoniosMouseLeave}
                    >
                      {profileData.testimonios.slice(0, 3).map((testimonio, index) => (
                        <div 
                          key={index}
                          className="flex-shrink-0 rounded-xl border p-5 bg-white hover:shadow-sm transition-all"
                          style={{ 
                            width: '320px',
                            borderColor: 'var(--border)',
                            userSelect: 'none'
                          }}
                        >
                          {/* Estrellas */}
                          <div className="flex gap-1 mb-3">
                            {[...Array(testimonio.calificacion)].map((_, i) => (
                              <Star 
                                key={i} 
                                className="w-4 h-4" 
                                style={{ color: '#FFA500', fill: '#FFA500' }} 
                              />
                            ))}
                          </div>

                          {/* Testimonio */}
                          <p style={{ 
                            fontSize: 'var(--font-size-body-sm)',
                            color: 'var(--foreground)',
                            lineHeight: 'var(--line-height-body)',
                            fontFamily: 'var(--font-body)',
                            marginBottom: '1rem',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            "{testimonio.testimonio}"
                          </p>

                          {/* Información del cliente */}
                          <div className="pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
                            <p style={{ 
                              fontSize: 'var(--font-size-body-sm)',
                              fontWeight: 'var(--font-weight-semibold)',
                              fontFamily: 'var(--font-body)',
                              color: 'var(--foreground)',
                              marginBottom: '0.25rem'
                            }}>
                              {testimonio.nombre}
                            </p>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span style={{ 
                                fontSize: 'var(--font-size-xs)',
                                color: '#737373',
                                fontFamily: 'var(--font-body)'
                              }}>
                                {testimonio.ubicacion}
                              </span>
                              {testimonio.tipo && (
                                <>
                                  <span style={{ color: '#D4D4D4' }}>•</span>
                                  <span 
                                    className="px-2 py-0.5 rounded-full"
                                    style={{ 
                                      fontSize: 'var(--font-size-xs)',
                                      fontWeight: 'var(--font-weight-medium)',
                                      fontFamily: 'var(--font-body)',
                                      backgroundColor: 'var(--input-background)',
                                      color: '#737373'
                                    }}
                                  >
                                    {testimonio.tipo}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Link Ver más opiniones */}
                    <button
                      onClick={() => setShowTestimoniosModal(true)}
                      className="text-sm hover:underline"
                      style={{ 
                        color: '#737373',
                        fontFamily: 'var(--font-body)',
                        fontWeight: 'var(--font-weight-medium)',
                        fontSize: 'var(--font-size-body-sm)'
                      }}
                    >
                      Ver más opiniones →
                    </button>
                  </div>

                  {/* INFORMACIÓN DE CONTACTO */}
                  <div ref={contactRef} className="rounded-xl border-2 p-8" style={{
                    backgroundColor: 'var(--input-background)',
                    borderColor: 'var(--border)'
                  }}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#006B4E' }}>
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <h3 style={{ 
                        fontSize: 'var(--font-size-h3)',
                        fontWeight: 'var(--font-weight-medium)',
                        fontFamily: 'var(--font-heading)',
                        color: 'var(--foreground)'
                      }}>
                        Información de contacto
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-5 rounded-xl bg-white border-2" style={{ borderColor: 'var(--border)' }}>
                        <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 border-2" style={{ 
                          backgroundColor: 'var(--input-background)',
                          borderColor: 'var(--border)'
                        }}>
                          <Phone className="w-6 h-6" style={{ color: '#111' }} />
                        </div>
                        <div className="flex-1">
                          <p style={{ 
                            fontSize: 'var(--font-size-xs)', 
                            color: '#737373', 
                            marginBottom: '0.25rem', 
                            fontWeight: 'var(--font-weight-medium)',
                            fontFamily: 'var(--font-body)'
                          }}>
                            Teléfono
                          </p>
                          <p style={{ 
                            fontSize: 'var(--font-size-h4)',
                            fontWeight: 'var(--font-weight-semibold)',
                            fontFamily: 'var(--font-heading)',
                            color: 'var(--foreground)'
                          }}>
                            {inmobiliaria.telefono}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-5 rounded-xl bg-white border-2" style={{ borderColor: 'var(--border)' }}>
                        <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 border-2" style={{ 
                          backgroundColor: 'var(--input-background)',
                          borderColor: 'var(--border)'
                        }}>
                          <Mail className="w-6 h-6" style={{ color: 'var(--foreground)' }} />
                        </div>
                        <div className="flex-1">
                          <p style={{ 
                            fontSize: 'var(--font-size-xs)', 
                            color: '#737373', 
                            marginBottom: '0.25rem', 
                            fontWeight: 'var(--font-weight-medium)',
                            fontFamily: 'var(--font-body)'
                          }}>
                            Email
                          </p>
                          <p style={{ 
                            fontSize: 'var(--font-size-h4)',
                            fontWeight: 'var(--font-weight-semibold)',
                            fontFamily: 'var(--font-heading)',
                            color: 'var(--foreground)',
                            wordBreak: 'break-word'
                          }}>
                            {inmobiliaria.email}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 grid grid-cols-2 gap-4">
                        <button className="h-12 bg-white hover:bg-gray-50 text-black px-6 rounded-[200px] transition-all border-2 border-black flex items-center justify-center gap-2 shadow-sm hover:shadow" style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-sm)',
                          fontWeight: 'var(--font-weight-semibold)'
                        }}>
                          <Phone className="w-5 h-5" />
                          Llamar
                        </button>
                        <button 
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-body-sm)',
                            fontWeight: 'var(--font-weight-semibold)',
                            backgroundColor: '#006B4E'
                          }}
                          className="h-12 text-white px-6 rounded-[200px] transition-colors flex items-center justify-center shadow-sm hover:shadow"
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#01533E'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
                        >
                          WhatsApp
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* QUIÉNES SOMOS */}
                  <div className="bg-white rounded-xl border p-6 sticky top-6" style={{ borderColor: 'var(--border)' }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--input-background)' }}>
                        <Building2 className="w-5 h-5" style={{ color: 'var(--foreground)' }} />
                      </div>
                      <h3 style={{ 
                        fontSize: 'var(--font-size-h4)',
                        fontWeight: 'var(--font-weight-medium)',
                        fontFamily: 'var(--font-heading)',
                        color: 'var(--foreground)'
                      }}>
                        Quiénes somos
                      </h3>
                    </div>

                    <p style={{ 
                      fontSize: 'var(--font-size-body-sm)', 
                      color: 'var(--foreground)', 
                      lineHeight: 'var(--line-height-body)',
                      fontFamily: 'var(--font-body)',
                      marginBottom: '1.5rem'
                    }}>
                      {profileData.quienesSomos}
                    </p>

                    {/* EQUIPO */}
                    <div className="pt-6 mb-6" style={{ borderTop: '1px solid var(--border)' }}>
                      <div className="flex items-center gap-2 mb-4">
                        <Users className="w-5 h-5" style={{ color: '#111' }} />
                        <h4 style={{ 
                          fontSize: 'var(--font-size-body-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                          fontFamily: 'var(--font-body)',
                          color: 'var(--foreground)'
                        }}>
                          Equipo
                        </h4>
                      </div>

                      {/* Carrusel horizontal */}
                      <div 
                        ref={equipoScrollRef}
                        className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
                        style={{ 
                          scrollbarWidth: 'none',
                          msOverflowStyle: 'none',
                          WebkitOverflowScrolling: 'touch',
                          cursor: isDragging ? 'grabbing' : 'grab'
                        }}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseLeave}
                      >
                        {profileData.equipo.map((miembro, index) => (
                          <div 
                            key={index} 
                            className="flex flex-col items-center text-center flex-shrink-0"
                            style={{ width: '90px', userSelect: 'none' }}
                          >
                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 mb-2" style={{ 
                              backgroundColor: 'var(--input-background)',
                              borderColor: 'var(--border)',
                              pointerEvents: 'none'
                            }}>
                              <ImageWithFallback 
                                src={miembro.imagen} 
                                alt={miembro.nombre}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <p style={{ 
                              fontSize: 'var(--font-size-xs)',
                              fontWeight: 'var(--font-weight-semibold)',
                              fontFamily: 'var(--font-body)',
                              color: 'var(--foreground)',
                              marginBottom: '0.125rem',
                              lineHeight: '1.2'
                            }}>
                              {miembro.nombre.split(' ')[0]}
                            </p>
                            <p style={{ 
                              fontSize: '10px', 
                              color: '#737373', 
                              lineHeight: '1.2',
                              fontFamily: 'var(--font-body)'
                            }}>
                              {miembro.rol}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Botón Ver todo el equipo */}
                      <button
                        onClick={() => setShowTeamModal(true)}
                        className="w-full mt-4 h-9 bg-white hover:bg-gray-50 text-black border rounded-[200px] transition-all flex items-center justify-center gap-2"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-medium)',
                          borderColor: 'var(--border)'
                        }}
                      >
                        Ver todo el equipo
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* CONFIANZA Y VERIFICACIÓN */}
                    <div className="pt-6" style={{ borderTop: '1px solid var(--border)' }}>
                      <div className="flex items-center gap-2 mb-4">
                        <Shield className="w-5 h-5" style={{ color: '#111' }} />
                        <h4 style={{ 
                          fontSize: 'var(--font-size-body-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                          fontFamily: 'var(--font-body)',
                          color: 'var(--foreground)'
                        }}>
                          Confianza y verificación
                        </h4>
                      </div>

                      <div className="space-y-3">
                        {profileData.badges.map((badge, index) => (
                          <div 
                            key={index}
                            className="flex items-center gap-3 p-3 rounded-lg border"
                            style={{ 
                              backgroundColor: 'var(--input-background)',
                              borderColor: 'var(--border)'
                            }}
                          >
                            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-white border" style={{ borderColor: 'var(--border)' }}>
                              {badge.icon}
                            </div>
                            <span style={{ 
                              fontSize: 'var(--font-size-body-sm)',
                              fontWeight: 'var(--font-weight-medium)',
                              fontFamily: 'var(--font-body)',
                              color: 'var(--foreground)'
                            }}>
                              {badge.texto}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!isLoading && activeTab === 'parcelas' && (
              <div>
                <h2 style={{ 
                  marginBottom: '2rem',
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h2)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: 'var(--foreground)'
                }}>
                  Parcelas ({parcelasPublicadas.length})
                </h2>

                {parcelasPublicadas.length === 0 ? (
                  <div className="text-center py-12">
                    <p style={{ 
                      fontSize: 'var(--font-size-body-base)', 
                      color: '#737373',
                      fontFamily: 'var(--font-body)'
                    }}>
                      Esta inmobiliaria aún no tiene parcelas publicadas.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {parcelasPublicadas.map((parcela) => (
                      <ParcelaCard
                        key={parcela.id}
                        id={parcela.id}
                        nombre={parcela.nombre}
                        ubicacion={parcela.ubicacion}
                        imagen={parcela.imagenes[0]}
                        imagenes={parcela.imagenes}
                        precio={parcela.precio}
                        caracteristicas={parcela.destacados}
                        inmobiliaria={parcela.inmobiliaria.nombre}
                        brokerImagen={parcela.inmobiliaria.logo}
                        tipoVendedor={parcela.inmobiliaria.tipoVendedor}
                        onClick={() => onNavigate('parcela-detalle', parcela.id)}
                      />
                    ))}
                  </div>
                )}

                {proyectosPublicados.length > 0 && (
                  <div className="mt-12">
                    <h2 style={{ 
                      marginBottom: '2rem',
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-h2)',
                      fontWeight: 'var(--font-weight-regular)',
                      color: 'var(--foreground)'
                    }}>
                      Proyectos ({proyectosPublicados.length})
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {proyectosPublicados.map((proyecto) => (
                        <ProjectCard
                          key={proyecto.id}
                          proyecto={proyecto}
                          onViewProject={(id) => onNavigate('proyecto-detalle', id)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {!isLoading && activeTab === 'brokers' && (
              <div>
                <h2 style={{ 
                  marginBottom: '2rem',
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h2)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: 'var(--foreground)'
                }}>
                  Brokers ({profileData.brokers.length})
                </h2>

                {profileData.brokers.length === 0 ? (
                  <div className="text-center py-12">
                    <p style={{ 
                      fontSize: 'var(--font-size-body-base)', 
                      color: '#737373',
                      fontFamily: 'var(--font-body)'
                    }}>
                      Esta inmobiliaria aún no tiene brokers asociados.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {profileData.brokers.map((broker, index) => (
                      <div 
                        key={index} 
                        className="bg-white rounded-xl border p-6 hover:shadow-md transition-all duration-300" 
                        style={{ borderColor: 'var(--border)' }}
                      >
                        {/* Avatar y Badge de estado */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-16 h-16 rounded-full overflow-hidden border-2" style={{ 
                            backgroundColor: 'var(--input-background)',
                            borderColor: 'var(--border)'
                          }}>
                            <ImageWithFallback 
                              src={broker.imagen} 
                              alt={broker.nombre}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span 
                            className="px-2.5 py-1 rounded-full text-xs"
                            style={{ 
                              backgroundColor: broker.estado === 'Activo' ? '#E8F5E9' : '#F5F5F5',
                              color: broker.estado === 'Activo' ? '#2E7D32' : '#757575',
                              fontFamily: 'var(--font-body)',
                              fontWeight: 'var(--font-weight-medium)',
                              fontSize: 'var(--font-size-xs)'
                            }}
                          >
                            {broker.estado}
                          </span>
                        </div>

                        {/* Nombre */}
                        <h3 style={{ 
                          fontSize: 'var(--font-size-h4)',
                          fontWeight: 'var(--font-weight-medium)',
                          fontFamily: 'var(--font-heading)',
                          color: 'var(--foreground)',
                          marginBottom: '0.25rem',
                          lineHeight: 'var(--line-height-heading)'
                        }}>
                          {broker.nombre}
                        </h3>

                        {/* Rol */}
                        <p style={{ 
                          fontSize: 'var(--font-size-body-sm)',
                          fontWeight: 'var(--font-weight-medium)',
                          fontFamily: 'var(--font-body)',
                          color: '#737373',
                          marginBottom: '1rem'
                        }}>
                          {broker.rol}
                        </p>

                        {/* Información secundaria */}
                        <div className="space-y-2 mb-5 pb-5" style={{ borderBottom: '1px solid var(--border)' }}>
                          {/* Zona */}
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" style={{ color: '#737373' }} />
                            <span style={{ 
                              fontSize: 'var(--font-size-body-sm)',
                              fontFamily: 'var(--font-body)',
                              color: '#737373'
                            }}>
                              {broker.zona}
                            </span>
                          </div>

                          {/* Parcelas activas */}
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4" style={{ color: '#737373' }} />
                            <span style={{ 
                              fontSize: 'var(--font-size-body-sm)',
                              fontFamily: 'var(--font-body)',
                              color: '#737373'
                            }}>
                              {broker.parcelasActivas} {broker.parcelasActivas === 1 ? 'publicación' : 'publicaciones'}
                            </span>
                          </div>
                        </div>

                        {/* CTAs */}
                        <div className="space-y-2">
                          <button
                            onClick={() => { setSelectedBroker(broker); setContactForm({ nombre: '', email: '', mensaje: '' }); setContactSent(false); setShowContactBrokerModal(true); }}
                            className="w-full h-10 rounded-[200px] transition-colors flex items-center justify-center gap-2"
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--font-size-body-sm)',
                              fontWeight: 'var(--font-weight-medium)',
                              backgroundColor: '#006B4E',
                              color: '#FFFFFF'
                            }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#01533E'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#006B4E'}
                          >
                            <Mail className="w-4 h-4" />
                            Contactar
                          </button>
                          <button
                            className="w-full h-10 bg-[#efefef] hover:bg-[#dedede] text-black hover:text-[#303030] rounded-[200px] transition-colors flex items-center justify-center gap-2"
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--font-size-body-sm)',
                              fontWeight: 'var(--font-weight-medium)'
                            }}
                            onClick={() => onNavigate('broker-profile', undefined, broker.nombre)}
                          >
                            Ver perfil
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* MODAL EQUIPO COMPLETO */}
      {showTeamModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setShowTeamModal(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-5xl w-full max-h-[85vh] overflow-y-auto relative"
            style={{ boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del modal */}
            <div className="sticky top-0 bg-white border-b z-10 px-8 py-6 rounded-t-2xl" style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 style={{ 
                    fontSize: 'var(--font-size-h2)',
                    fontWeight: 'var(--font-weight-medium)',
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--foreground)',
                    marginBottom: '0.25rem'
                  }}>
                    Equipo de {inmobiliaria.nombre}
                  </h2>
                  <p style={{ 
                    fontSize: 'var(--font-size-body-sm)',
                    color: '#737373',
                    fontFamily: 'var(--font-body)'
                  }}>
                    {profileData.equipo.length} miembros
                  </p>
                </div>
                <button
                  onClick={() => setShowTeamModal(false)}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                  style={{ color: 'var(--foreground)' }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Contenido del modal */}
            <div className="p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {profileData.equipo.map((miembro, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-xl border p-5 hover:shadow-md transition-all text-center"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 mb-3 mx-auto" style={{ 
                      backgroundColor: 'var(--input-background)',
                      borderColor: 'var(--border)'
                    }}>
                      <ImageWithFallback 
                        src={miembro.imagen} 
                        alt={miembro.nombre}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 style={{ 
                      fontSize: 'var(--font-size-body-base)',
                      fontWeight: 'var(--font-weight-semibold)',
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--foreground)',
                      marginBottom: '0.25rem'
                    }}>
                      {miembro.nombre}
                    </h3>
                    <p style={{ 
                      fontSize: 'var(--font-size-body-sm)',
                      color: '#737373',
                      fontFamily: 'var(--font-body)',
                      marginBottom: '1rem'
                    }}>
                      {miembro.rol}
                    </p>
                    <div className="space-y-1.5">
                      <button
                        className="w-full h-9 rounded-[200px] transition-colors flex items-center justify-center gap-2"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-medium)',
                          backgroundColor: '#006B4E',
                          color: '#FFFFFF'
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#01533E'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#006B4E'}
                      >
                        <Mail className="w-3.5 h-3.5" />
                        Contactar
                      </button>
                      <button
                        className="w-full h-9 bg-[#efefef] hover:bg-[#dedede] text-black hover:text-[#303030] rounded-[200px] transition-colors flex items-center justify-center"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-medium)'
                        }}
                        onClick={() => { setShowTeamModal(false); onNavigate('broker-profile', undefined, miembro.nombre); }}
                      >
                        Ver perfil
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL TESTIMONIOS COMPLETO */}
      {showTestimoniosModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setShowTestimoniosModal(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-5xl w-full max-h-[85vh] overflow-y-auto relative"
            style={{ boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del modal */}
            <div className="sticky top-0 bg-white border-b z-10 px-8 py-6 rounded-t-2xl" style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 style={{ 
                    fontSize: 'var(--font-size-h2)',
                    fontWeight: 'var(--font-weight-medium)',
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--foreground)',
                    marginBottom: '0.25rem'
                  }}>
                    Testimonios de clientes
                  </h2>
                  <p style={{ 
                    fontSize: 'var(--font-size-body-sm)',
                    color: '#737373',
                    fontFamily: 'var(--font-body)'
                  }}>
                    {profileData.testimonios.length} opiniones
                  </p>
                </div>
                <button
                  onClick={() => setShowTestimoniosModal(false)}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                  style={{ color: 'var(--foreground)' }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Contenido del modal */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profileData.testimonios.map((testimonio, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-xl border p-6 hover:shadow-md transition-all"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    {/* Estrellas */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonio.calificacion)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-5 h-5" 
                          style={{ color: '#FFA500', fill: '#FFA500' }} 
                        />
                      ))}
                    </div>

                    {/* Testimonio */}
                    <p style={{ 
                      fontSize: 'var(--font-size-body-base)',
                      color: 'var(--foreground)',
                      lineHeight: 'var(--line-height-body)',
                      fontFamily: 'var(--font-body)',
                      marginBottom: '1.5rem'
                    }}>
                      "{testimonio.testimonio}"
                    </p>

                    {/* Información del cliente */}
                    <div className="pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                      <p style={{ 
                        fontSize: 'var(--font-size-body-base)',
                        fontWeight: 'var(--font-weight-semibold)',
                        fontFamily: 'var(--font-body)',
                        color: 'var(--foreground)',
                        marginBottom: '0.5rem'
                      }}>
                        {testimonio.nombre}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <div className="flex items-center gap-1.5" style={{ color: '#737373' }}>
                          <MapPin className="w-4 h-4" />
                          <span style={{ 
                            fontSize: 'var(--font-size-body-sm)',
                            fontFamily: 'var(--font-body)'
                          }}>
                            {testimonio.ubicacion}
                          </span>
                        </div>
                        {testimonio.tipo && (
                          <>
                            <span style={{ color: '#D4D4D4' }}>•</span>
                            <span 
                              className="px-2.5 py-1 rounded-full"
                              style={{ 
                                fontSize: 'var(--font-size-xs)',
                                fontWeight: 'var(--font-weight-medium)',
                                fontFamily: 'var(--font-body)',
                                backgroundColor: 'var(--input-background)',
                                color: '#737373'
                              }}
                            >
                              {testimonio.tipo}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* MODAL CONTACTAR BROKER */}
      {showContactBrokerModal && createPortal(
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={(e) => { if (e.target === e.currentTarget) { setShowContactBrokerModal(false); } }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4" style={{ borderBottom: '1px solid #E5E7EB' }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0" style={{ border: '2px solid #E5E7EB' }}>
                  <ImageWithFallback src={selectedBroker?.imagen ?? ''} alt={selectedBroker?.nombre ?? ''} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'var(--font-size-body-base)', color: '#0A0A0A', marginBottom: '2px' }}>
                    {selectedBroker?.nombre}
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#737373' }}>
                    {selectedBroker?.rol} · {selectedBroker?.zona}
                  </p>
                </div>
              </div>
              <button onClick={() => setShowContactBrokerModal(false)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <X className="w-4 h-4" style={{ color: '#737373' }} />
              </button>
            </div>

            <div className="px-6 py-5">
              {contactSent ? (
                <div className="text-center py-6">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#F0FDF4' }}>
                    <CheckCircle className="w-7 h-7" style={{ color: '#006B4E' }} />
                  </div>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'var(--font-size-h4)', color: '#0A0A0A', marginBottom: '8px' }}>
                    ¡Consulta enviada!
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#737373' }}>
                    {selectedBroker?.nombre} recibirá tu mensaje y te responderá a la brevedad.
                  </p>
                  <button onClick={() => setShowContactBrokerModal(false)} className="mt-6 h-10 px-8 rounded-full text-white transition-colors" style={{ backgroundColor: '#006B4E', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600 }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#01533E'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#006B4E'}>
                    Cerrar
                  </button>
                </div>
              ) : (
                <>
                  {/* WhatsApp CTA */}
                  <button className="w-full h-11 rounded-full flex items-center justify-center gap-2 mb-4 text-white font-medium transition-colors" style={{ backgroundColor: '#25D366', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600 }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1DA851'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#25D366'}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Contactar por WhatsApp
                  </button>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 h-px" style={{ backgroundColor: '#E5E7EB' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: '#9CA3AF' }}>o enviá una consulta</span>
                    <div className="flex-1 h-px" style={{ backgroundColor: '#E5E7EB' }} />
                  </div>

                  {/* Formulario */}
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      value={contactForm.nombre}
                      onChange={e => setContactForm(f => ({ ...f, nombre: e.target.value }))}
                      className="w-full h-10 px-4 rounded-xl outline-none"
                      style={{ border: '1.5px solid #E5E7EB', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A' }}
                    />
                    <input
                      type="email"
                      placeholder="Tu email"
                      value={contactForm.email}
                      onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full h-10 px-4 rounded-xl outline-none"
                      style={{ border: '1.5px solid #E5E7EB', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A' }}
                    />
                    <textarea
                      placeholder="¿En qué te puede ayudar este broker?"
                      value={contactForm.mensaje}
                      onChange={e => setContactForm(f => ({ ...f, mensaje: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl outline-none resize-none"
                      style={{ border: '1.5px solid #E5E7EB', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', color: '#0A0A0A' }}
                    />
                    <button
                      onClick={() => { if (contactForm.nombre && contactForm.email && contactForm.mensaje) setContactSent(true); }}
                      disabled={!contactForm.nombre || !contactForm.email || !contactForm.mensaje}
                      className="w-full h-10 rounded-full text-white transition-colors"
                      style={{ backgroundColor: contactForm.nombre && contactForm.email && contactForm.mensaje ? '#006B4E' : '#D1D5DB', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-body-sm)', fontWeight: 600, cursor: contactForm.nombre && contactForm.email && contactForm.mensaje ? 'pointer' : 'not-allowed' }}
                      onMouseEnter={e => { if (contactForm.nombre && contactForm.email && contactForm.mensaje) e.currentTarget.style.backgroundColor = '#01533E'; }}
                      onMouseLeave={e => { if (contactForm.nombre && contactForm.email && contactForm.mensaje) e.currentTarget.style.backgroundColor = '#006B4E'; }}
                    >
                      Enviar consulta
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}

      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}