import React, { useState, useRef } from 'react';
import { Upload, MessageSquare, ClipboardList, CheckCircle, FileText, BarChart3, Users, CreditCard, MessageCircle, Mail, ChevronDown, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Navbar } from '@/app/components/Navbar';
import logo from 'figma:asset/a4719ce43ce52ee49df30a2a5c090c8a8b743667.png';
import heroBackground from 'figma:asset/46be9646c60608d21a829a86b189efb4cfc6cbbc.png';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { SocialMediaBanner } from '@/app/components/SocialMediaBanner';

interface ComoFuncionaPageProps {
  onNavigate: (page: string) => void;
  isLoggedIn?: boolean;
  currentUser?: { name: string; email: string } | null;
  onLogout?: () => void;
  onOpenPublishModal?: () => void;
  onNavigateToPublish?: () => void;
}

export function ComoFuncionaPage({ onNavigate, isLoggedIn = false, currentUser, onLogout, onOpenPublishModal, onNavigateToPublish }: ComoFuncionaPageProps) {
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

  const steps = [
    {
      number: '1',
      icon: Upload,
      title: 'Publica tu parcela',
      description: 'Completa un formulario simple con datos, fotos y ubicación. Todo en un solo lugar.',
      image: 'https://images.unsplash.com/photo-1705508216613-be1715a31212?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBmb3JtJTIwdXBsb2FkfGVufDF8fHx8MTc3MDE0NzMyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      number: '2',
      icon: MessageSquare,
      title: 'Recibe consultas',
      description: 'Los interesados te contactan directamente. Cada consulta llega a tu panel en tiempo real.',
      image: 'https://images.unsplash.com/photo-1609162554108-6490759499ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbm90aWZpY2F0aW9ucyUyMG1lc3NhZ2VzfGVufDF8fHx8MTc3MDE0NzMyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      number: '3',
      icon: ClipboardList,
      title: 'Gestiona el seguimiento',
      description: 'Sigue cada conversación, responde consultas y organiza visitas desde un solo lugar.',
      image: 'https://images.unsplash.com/photo-1763038311036-6d18805537e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBhbmFseXRpY3MlMjBtYW5hZ2VtZW50fGVufDF8fHx8MTc3MDE0NzMyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      number: '4',
      icon: CheckCircle,
      title: 'Cierra la venta',
      description: 'Actualiza el estado de tu parcela y mantenla visible hasta concretar la operación.',
      image: 'https://images.unsplash.com/photo-1758519288905-38b7b00c1023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWNjZXNzJTIwaGFuZHNoYWtlJTIwZGVhbHxlbnwxfHx8fDE3NzAxNDczMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  const scrollToSlide = (index: number) => {
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.scrollWidth / steps.length;
      carouselRef.current.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
      });
      setCurrentSlide(index);
    }
  };

  const handleNext = () => {
    const nextSlide = (currentSlide + 1) % steps.length;
    scrollToSlide(nextSlide);
  };

  const handlePrev = () => {
    const prevSlide = (currentSlide - 1 + steps.length) % steps.length;
    scrollToSlide(prevSlide);
  };

  const features = [
    {
      icon: FileText,
      title: 'Publicaciones',
      description: 'Administra tus propiedades y mantenlas actualizadas',
      color: '#006B4E',
      lightColor: 'rgba(0, 107, 78, 0.1)',
      detailedInfo: {
        intro: 'Crea y gestiona todas tus publicaciones de parcelas desde un panel centralizado.',
        benefits: [
          'Editor intuitivo para cargar fotos, videos y documentos',
          'Campos personalizables con información clave (superficie, precio, ubicación)',
          'Actualizaciones en tiempo real visibles para todos los interesados',
          'Historial completo de cambios y versiones anteriores'
        ],
        cta: 'Publica tu primera parcela en menos de 5 minutos'
      }
    },
    {
      icon: MessageSquare,
      title: 'Consultas y leads',
      description: 'Todos los interesados organizados en un solo lugar',
      color: '#006B4E',
      lightColor: 'rgba(0, 107, 78, 0.1)',
      detailedInfo: {
        intro: 'Centraliza todas las consultas y gestiona cada lead de forma eficiente.',
        benefits: [
          'Bandeja unificada con todas las conversaciones organizadas',
          'Notificaciones instantáneas vía email y en la plataforma',
          'Etiquetas y filtros para priorizar consultas importantes',
          'Respuestas rápidas con plantillas personalizables'
        ],
        cta: 'Nunca pierdas una oportunidad de venta'
      }
    },
    {
      icon: BarChart3,
      title: 'Rendimiento',
      description: 'Visualiza métricas clave de tus publicaciones',
      color: '#006B4E',
      lightColor: 'rgba(0, 107, 78, 0.1)',
      detailedInfo: {
        intro: 'Analiza el desempeño de tus propiedades con métricas claras y accionables.',
        benefits: [
          'Estadísticas de visualizaciones, consultas y conversiones',
          'Gráficos de tendencia para identificar patrones de interés',
          'Comparativas entre propiedades para optimizar precios',
          'Reportes exportables en PDF para compartir con tu equipo'
        ],
        cta: 'Toma decisiones basadas en datos reales'
      }
    },
    {
      icon: Users,
      title: 'Equipo y brokers',
      description: 'Invita a tu equipo a colaborar en las ventas',
      color: '#006B4E',
      lightColor: 'rgba(0, 107, 78, 0.1)',
      detailedInfo: {
        intro: 'Colabora con tu equipo o brokers externos de forma ordenada y transparente.',
        benefits: [
          'Invitaciones por email con permisos personalizados',
          'Asignación de consultas específicas a cada miembro',
          'Visibilidad compartida del pipeline de ventas',
          'Registro de actividad para seguimiento y accountability'
        ],
        cta: 'Escala tu operación con el equipo adecuado'
      }
    },
    {
      icon: CreditCard,
      title: 'Planes y pagos',
      description: 'Elige el plan que mejor se ajuste a tu operación',
      color: '#006B4E',
      lightColor: 'rgba(0, 107, 78, 0.1)',
      detailedInfo: {
        intro: 'Planes flexibles que crecen con tu negocio, sin sorpresas ni costos ocultos.',
        benefits: [
          'Plan gratuito para hasta 3 publicaciones activas',
          'Planes escalables según volumen de propiedades',
          'Pagos seguros con tarjeta o transferencia bancaria',
          'Cambio de plan en cualquier momento sin penalizaciones'
        ],
        cta: 'Comienza gratis, escala cuando lo necesites'
      }
    }
  ];

  const faqs = [
    {
      question: '¿Cuánto cuesta publicar una parcela?',
      answer: 'Contamos con planes flexibles según lo que necesites. Puedes comenzar gratis publicando hasta 3 parcelas, o elegir un plan con más funcionalidades si gestionas varias propiedades. Sin costos ocultos ni sorpresas.'
    },
    {
      question: '¿Cómo recibo las consultas de los interesados?',
      answer: 'Todas las consultas llegan directamente a tu panel de control. Te avisamos por email cada vez que alguien se interesa, y puedes responder desde la plataforma o asignar la conversación a alguien de tu equipo.'
    },
    {
      question: '¿Puedo gestionar varias parcelas a la vez?',
      answer: 'Sí, puedes gestionar todas tus propiedades desde un solo lugar. Cada publicación tiene su propio seguimiento independiente: consultas, visitas y estado de venta organizados para que tengas el control total.'
    },
    {
      question: '¿Qué documentos necesito para publicar?',
      answer: 'No es obligatorio, pero te recomendamos subir documentos como el título de propiedad, planos o certificados de uso de suelo. Más información genera más confianza en los compradores y acelera el proceso de venta.'
    },
    {
      question: '¿Puedo trabajar con brokers o inmobiliarias?',
      answer: 'Por supuesto. Puedes invitar a brokers e inmobiliarias a colaborar en tus publicaciones. Ellos gestionan las consultas y el seguimiento, mientras tú mantienes el control y la visibilidad de todo el proceso.'
    },
    {
      question: '¿Cómo marco una parcela como vendida?',
      answer: 'Desde tu panel puedes cambiar el estado de cualquier publicación en un clic: "Activa", "Reservada" o "Vendida". Esto actualiza la visibilidad automáticamente y avisa a los interesados que estaban haciendo seguimiento.'
    }
  ];

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Header / Navbar */}
      <Navbar 
        onNavigate={onNavigate}
        estado={isLoggedIn ? 'logueado' : 'visitante'}
        onLogout={onLogout}
        userName={currentUser?.name}
        onShowPublishModal={isLoggedIn && onOpenPublishModal ? onOpenPublishModal : () => setShowPublishModal(true)}
      />

      {/* Main Content - with padding for fixed header */}
      <main className="relative pt-28" style={{ backgroundColor: 'var(--hero-background)' }}>
        {/* Section 1: Header / Intro */}
        <section className="relative overflow-hidden flex flex-col justify-center items-center" style={{ backgroundColor: 'var(--hero-background)', minHeight: '360px', paddingTop: '60px', paddingBottom: '80px' }}>
          {/* Background image */}
          <img 
            src={heroBackground}
            alt="Campos rurales"
            className="absolute inset-0 w-full h-full object-cover opacity-[0.25] select-none pointer-events-none"
            style={{
              filter: 'grayscale(35%)',
              mixBlendMode: 'multiply'
            }}
          />
          
          {/* Overlay gradient */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, var(--hero-background) 0%, var(--hero-background) 20%, transparent 45%, transparent 75%, var(--hero-background) 100%)'
            }}
          />
          
          <div className="relative w-full px-6 text-center z-10 flex flex-col items-center justify-center">
            <h1
              className="text-center mb-6" 
              style={{ 
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '64px',
                fontWeight: 600,
                lineHeight: '1.1',
                letterSpacing: '-0.02em',
                color: '#0A0A0A'
              }}
            >
              Cómo funciona CompraTuParcela
            </h1>
            <p
              className="body-lead"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '20px',
                fontWeight: 'var(--font-weight-light)',
                color: '#0A0A0A',
                textAlign: 'center',
                maxWidth: '700px',
                lineHeight: '1.6'
              }}
            >
              Publica, gestiona y vende parcelas de forma simple y segura
            </p>
          </div>
        </section>

        {/* Section 2: El proceso paso a paso */}
        <section 
          className="py-24"
          style={{ backgroundColor: '#FAFAFA' }}
        >
          <div className="max-w-[1280px] mx-auto px-6">
            <h2
              className="text-center mb-4"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--font-size-h2)',
                fontWeight: 'var(--font-weight-regular)',
                color: '#006B4E',
                lineHeight: 'var(--line-height-heading)',
                letterSpacing: 'var(--letter-spacing-tight)'
              }}
            >
              El proceso paso a paso
            </h2>
            <p
              className="text-center mb-16"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                fontWeight: 'var(--font-weight-regular)',
                color: '#462611',
                lineHeight: 'var(--line-height-body)',
                maxWidth: '640px',
                margin: '0 auto 64px'
              }}
            >
              Desde crear tu publicación hasta cerrar la venta, seguí estos pasos simples
            </p>

            {/* Carrusel Container */}
            <div className="relative">
              {/* Navigation Arrows - Desktop */}
              <div className="hidden md:block">
                <button
                  onClick={handlePrev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '2px solid #E5E5E5',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#111';
                    e.currentTarget.style.borderColor = '#111';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.12)';
                    const icon = e.currentTarget.querySelector('svg');
                    if (icon) (icon as SVGElement).style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.borderColor = '#E5E5E5';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
                    const icon = e.currentTarget.querySelector('svg');
                    if (icon) (icon as SVGElement).style.color = '#0A0A0A';
                  }}
                >
                  <ChevronLeft size={24} style={{ color: '#0A0A0A' }} />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '2px solid #E5E5E5',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#111';
                    e.currentTarget.style.borderColor = '#111';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.12)';
                    const icon = e.currentTarget.querySelector('svg');
                    if (icon) (icon as SVGElement).style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.borderColor = '#E5E5E5';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
                    const icon = e.currentTarget.querySelector('svg');
                    if (icon) (icon as SVGElement).style.color = '#0A0A0A';
                  }}
                >
                  <ChevronRight size={24} style={{ color: '#0A0A0A' }} />
                </button>
              </div>

              {/* Carousel Scroll Container */}
              <div 
                ref={carouselRef}
                className="overflow-x-auto scroll-smooth scrollbar-hide"
                style={{
                  scrollSnapType: 'x mandatory',
                  WebkitOverflowScrolling: 'touch'
                }}
                onScroll={(e) => {
                  const container = e.currentTarget;
                  const slideWidth = container.scrollWidth / steps.length;
                  const newIndex = Math.round(container.scrollLeft / slideWidth);
                  if (newIndex !== currentSlide) {
                    setCurrentSlide(newIndex);
                  }
                }}
                onMouseDown={(e) => {
                  setIsDragging(true);
                  setStartX(e.pageX - e.currentTarget.offsetLeft);
                  setScrollLeft(e.currentTarget.scrollLeft);
                }}
                onMouseLeave={() => setIsDragging(false)}
                onMouseUp={() => setIsDragging(false)}
                onMouseMove={(e) => {
                  if (!isDragging) return;
                  e.preventDefault();
                  const x = e.pageX - e.currentTarget.offsetLeft;
                  const walk = (x - startX) * 1.5;
                  e.currentTarget.scrollLeft = scrollLeft - walk;
                }}
              >
                <div className="flex gap-8 pb-4" style={{ minWidth: '100%' }}>
                  {steps.map((step, index) => (
                    <div 
                      key={index}
                      className="flex-none w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]"
                      style={{ scrollSnapAlign: 'start' }}
                    >
                      {/* Card */}
                      <div
                        className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E5E5E5',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                          height: '100%'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.1)';
                          e.currentTarget.style.transform = 'translateY(-4px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        {/* Image Container */}
                        <div 
                          className="relative overflow-hidden"
                          style={{ 
                            height: '240px',
                            backgroundColor: '#F5F5F5'
                          }}
                        >
                          <ImageWithFallback
                            src={step.image}
                            alt={step.title}
                            className="w-full h-full object-cover"
                            style={{
                              objectPosition: 'center'
                            }}
                          />
                          {/* Overlay gradient for legibility */}
                          <div 
                            className="absolute inset-0 pointer-events-none"
                            style={{
                              background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 100%)'
                            }}
                          />
                          
                          {/* Number Badge Overlay */}
                          <div 
                            className="absolute top-4 left-4 w-14 h-14 rounded-full flex items-center justify-center z-10"
                            style={{
                              backgroundColor: index === 3 ? '#22C55E' : '#111',
                              color: '#FFFFFF',
                              fontFamily: 'var(--font-heading)',
                              fontSize: '24px',
                              fontWeight: 'var(--font-weight-medium)',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)'
                            }}
                          >
                            {step.number}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          {/* Title */}
                          <h3
                            className="mb-2"
                            style={{
                              fontFamily: 'var(--font-heading)',
                              fontSize: 'var(--font-size-h4)',
                              fontWeight: 'var(--font-weight-medium)',
                              color: '#0A0A0A',
                              lineHeight: 'var(--line-height-heading)'
                            }}
                          >
                            {step.title}
                          </h3>

                          {/* Description - limited to 2 lines */}
                          <p
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--font-size-body-sm)',
                              fontWeight: 'var(--font-weight-regular)',
                              color: '#737373',
                              lineHeight: 'var(--line-height-body)',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}
                          >
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress Dots */}
              <div className="flex items-center justify-center gap-2 mt-8">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSlide(index)}
                    className="transition-all duration-300"
                    style={{
                      width: currentSlide === index ? '32px' : '8px',
                      height: '8px',
                      borderRadius: '100px',
                      backgroundColor: currentSlide === index ? '#111' : '#DEDEDE',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    aria-label={`Ir al paso ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Qué puedes hacer desde la plataforma */}
        <section className="py-24" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="max-w-[1360px] mx-auto px-6">
            <h2
              className="text-center mb-4"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--font-size-h2)',
                fontWeight: 'var(--font-weight-regular)',
                color: '#006B4E',
                lineHeight: 'var(--line-height-heading)',
                letterSpacing: 'var(--letter-spacing-tight)'
              }}
            >
              Qué puedes hacer desde la plataforma
            </h2>
            <p
              className="text-center mb-16"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                fontWeight: 'var(--font-weight-regular)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-body)',
                maxWidth: '640px',
                margin: '0 auto 64px'
              }}
            >
              Todas las herramientas que necesitás para gestionar tus propiedades en un solo lugar
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedFeature(index)}
                  className="rounded-2xl p-7 cursor-pointer transition-all duration-300 flex flex-col h-full"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E5E5',
                    minHeight: '220px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#C3C3C3';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.06)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E5E5E5';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.02)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 flex-shrink-0 transition-all duration-300"
                    style={{
                      backgroundColor: feature.lightColor,
                      border: 'none'
                    }}
                  >
                    <feature.icon size={26} style={{ color: feature.color, strokeWidth: 1.8 }} />
                  </div>

                  {/* Title */}
                  <h3
                    className="mb-2 flex-shrink-0"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-h4)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-heading)'
                    }}
                  >
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-regular)',
                      color: '#737373',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Ayuda y soporte */}
        <section 
          className="py-24"
          style={{ backgroundColor: '#FAFAFA' }}
        >
          <div className="max-w-[1200px] mx-auto px-6">
            <h2
              className="text-center mb-4"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--font-size-h2)',
                fontWeight: 'var(--font-weight-regular)',
                color: '#006B4E',
                lineHeight: 'var(--line-height-heading)',
                letterSpacing: 'var(--letter-spacing-tight)'
              }}
            >
              Ayuda y soporte
            </h2>
            <p
              className="text-center mb-16"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                fontWeight: 'var(--font-weight-regular)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-body)',
                maxWidth: '640px',
                margin: '0 auto 64px'
              }}
            >
              Nuestro equipo está listo para ayudarte cuando lo necesites
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Chat en vivo */}
              <div
                className="rounded-2xl p-6 text-center"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E5E5'
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    backgroundColor: '#FAFAFA',
                    border: '1px solid #E5E5E5'
                  }}
                >
                  <MessageCircle size={24} style={{ color: '#0A0A0A' }} />
                </div>
                <h3
                  className="mb-2"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--font-size-h4)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-heading)'
                  }}
                >
                  Chat en vivo
                </h3>
                <p
                  className="mb-4"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-regular)',
                    color: '#737373',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  Conversa con nuestro equipo de soporte en tiempo real
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  Lun - Vie: 9:00 - 18:00
                </p>
              </div>

              {/* Correo electrónico */}
              <div
                className="rounded-2xl p-6 text-center"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E5E5'
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    backgroundColor: '#FAFAFA',
                    border: '1px solid #E5E5E5'
                  }}
                >
                  <Mail size={24} style={{ color: '#0A0A0A' }} />
                </div>
                <h3
                  className="mb-2"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--font-size-h4)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-heading)'
                  }}
                >
                  Correo electrónico
                </h3>
                <p
                  className="mb-4"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-regular)',
                    color: '#737373',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  Escríbenos y te respondemos en menos de 24 horas
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  soporte@compratuparcela.cl
                </p>
              </div>

              {/* Centro de ayuda */}
              <div
                className="rounded-2xl p-6 text-center"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E5E5'
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    backgroundColor: '#FAFAFA',
                    border: '1px solid #E5E5E5'
                  }}
                >
                  <MessageSquare size={24} style={{ color: '#0A0A0A' }} />
                </div>
                <h3
                  className="mb-2"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--font-size-h4)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-heading)'
                  }}
                >
                  Centro de ayuda
                </h3>
                <p
                  className="mb-4"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-regular)',
                    color: '#737373',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  Encuentra respuestas en nuestra base de conocimiento
                </p>
                <button
                  className="px-4 py-2 rounded-lg transition-colors"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    backgroundColor: '#FAFAFA',
                    border: '1px solid #E5E5E5'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#E8E7E6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FAFAFA';
                  }}
                >
                  Ver artículos
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Preguntas frecuentes */}
        <section className="py-24" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="max-w-[800px] mx-auto px-6">
            <h2
              className="text-center mb-4"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--font-size-h2)',
                fontWeight: 'var(--font-weight-regular)',
                color: '#006B4E',
                lineHeight: 'var(--line-height-heading)',
                letterSpacing: 'var(--letter-spacing-tight)'
              }}
            >
              Preguntas frecuentes
            </h2>
            <p
              className="text-center mb-16"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                fontWeight: 'var(--font-weight-regular)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-body)',
                maxWidth: '640px',
                margin: '0 auto 64px'
              }}
            >
              Resolvemos las dudas más comunes sobre cómo funciona la plataforma
            </p>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-xl overflow-hidden transition-all duration-200"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E5E5',
                    boxShadow: expandedFaq === index ? '0 2px 8px rgba(0, 0, 0, 0.04)' : '0 1px 3px rgba(0, 0, 0, 0.02)'
                  }}
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors duration-200"
                    style={{
                      backgroundColor: expandedFaq === index ? '#FAFAFA' : '#FFFFFF'
                    }}
                    onMouseEnter={(e) => {
                      if (expandedFaq !== index) {
                        e.currentTarget.style.backgroundColor = '#FAFAFA';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (expandedFaq !== index) {
                        e.currentTarget.style.backgroundColor = '#FFFFFF';
                      }
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '18px',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#0A0A0A',
                        lineHeight: 'var(--line-height-heading)',
                        paddingRight: '24px'
                      }}
                    >
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={20}
                      style={{
                        color: '#737373',
                        transform: expandedFaq === index ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                        flexShrink: 0
                      }}
                    />
                  </button>
                  {expandedFaq === index && (
                    <div 
                      className="px-6 pb-5"
                      style={{ backgroundColor: '#FAFAFA' }}
                    >
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-body-base)',
                          fontWeight: 'var(--font-weight-regular)',
                          color: '#595959',
                          lineHeight: 'var(--line-height-body)'
                        }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: CTA Final */}
        <section 
          className="py-24"
          style={{ backgroundColor: '#FAFAFA' }}
        >
          <div className="max-w-[800px] mx-auto px-6 text-center">
            <h2
              className="mb-5"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--font-size-h2)',
                fontWeight: 'var(--font-weight-regular)',
                color: '#0A0A0A',
                lineHeight: 'var(--line-height-heading)',
                letterSpacing: 'var(--letter-spacing-tight)'
              }}
            >
              ¿Listo para empezar?
            </h2>
            <p
              className="mb-10"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-lg)',
                fontWeight: 'var(--font-weight-regular)',
                color: '#737373',
                lineHeight: 'var(--line-height-body)'
              }}
            >
              Publica tu primera parcela gratis o explora las propiedades disponibles
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('entry')}
                style={{
                  boxShadow: '0 2px 8px rgba(0, 107, 78, 0.15)',
                  backgroundColor: '#006B4E'
                }}
                className="h-12 text-white px-8 text-base leading-[1.5] font-medium rounded-[200px] transition-all duration-200 flex items-center justify-center min-w-[180px]"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 107, 78, 0.25)';
                  e.currentTarget.style.backgroundColor = '#01533E';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#006B4E';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 107, 78, 0.15)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Crear cuenta
              </button>
              <button
                onClick={() => onNavigate('parcelas')}
                className="h-12 bg-[#efefef] hover:bg-[#dedede] text-black hover:text-[#303030] px-8 text-base leading-[1.5] font-medium rounded-[200px] transition-all duration-200 flex items-center justify-center min-w-[180px]"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Ver parcelas disponibles
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Social Media Banner - Antes del Footer */}
      <div className="bg-white py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <SocialMediaBanner />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <img src={logo} alt="CompraTuParcela" className="h-16 -ml-4" />
              <p className="text-xs text-gray-600">
                Plataforma especializada en<br />compra y venta de parcelas
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="text-xs font-bold text-black">EXPLORAR</div>
              <div className="space-y-2 text-xs text-gray-600">
                <div>Parcelas</div>
                <div>Inmobiliarias</div>
                <div>Blog</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold text-black">PLATAFORMA</div>
              <div className="space-y-2 text-xs text-gray-600">
                <div>Cómo funciona</div>
                <div>Publicar propiedad</div>
                <div>Planes para inmobiliarias</div>
                <div>Para brokers</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold text-black">SOPORTE</div>
              <div className="space-y-2 text-xs text-gray-600">
                <div>Centro de ayuda</div>
                <div>Términos y condiciones</div>
                <div>Política de privacidad</div>
                <div>Contacto</div>
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

      {/* Modal de Información Detallada */}
      {selectedFeature !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)'
          }}
          onClick={() => setSelectedFeature(null)}
        >
          <div
            className="rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            style={{
              backgroundColor: '#FFFFFF',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal */}
            <div
              className="relative p-8 rounded-t-2xl"
              style={{
                backgroundColor: features[selectedFeature].lightColor,
                borderBottom: '1px solid #E5E5E5'
              }}
            >
              {/* Botón Cerrar */}
              <button
                onClick={() => setSelectedFeature(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E5E5'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F5F5F5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                }}
              >
                <X size={20} style={{ color: '#0A0A0A' }} />
              </button>

              {/* Ícono y Título */}
              <div className="flex items-start gap-4">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
                  }}
                >
                  {React.createElement(features[selectedFeature].icon, {
                    size: 32,
                    style: { color: features[selectedFeature].color, strokeWidth: 1.8 }
                  })}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '32px',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-heading)',
                      marginBottom: '8px'
                    }}
                  >
                    {features[selectedFeature].title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-base)',
                      fontWeight: 'var(--font-weight-regular)',
                      color: '#595959',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    {features[selectedFeature].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Contenido del Modal */}
            <div className="p-8">
              {/* Introducción */}
              <p
                className="mb-6"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-lg)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-body)'
                }}
              >
                {features[selectedFeature].detailedInfo.intro}
              </p>

              {/* Beneficios */}
              <h4
                className="mb-4"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h4)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#0A0A0A',
                  lineHeight: 'var(--line-height-heading)'
                }}
              >
                Características principales
              </h4>
              <ul className="space-y-3 mb-8">
                {features[selectedFeature].detailedInfo.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{
                        backgroundColor: features[selectedFeature].lightColor
                      }}
                    >
                      <CheckCircle
                        size={16}
                        style={{
                          color: features[selectedFeature].color,
                          strokeWidth: 2.5
                        }}
                      />
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-base)',
                        fontWeight: 'var(--font-weight-regular)',
                        color: '#404040',
                        lineHeight: 'var(--line-height-body)'
                      }}
                    >
                      {benefit}
                    </p>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div
                className="rounded-xl p-6 text-center"
                style={{
                  backgroundColor: features[selectedFeature].lightColor,
                  border: `1px solid ${features[selectedFeature].color}20`
                }}
              >
                <p
                  className="mb-4"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--font-size-body-lg)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#0A0A0A',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  {features[selectedFeature].detailedInfo.cta}
                </p>
                <button
                  onClick={() => {
                    setSelectedFeature(null);
                    onNavigate('entry');
                  }}
                  className="h-12 px-8 rounded-full transition-all duration-200 flex items-center justify-center mx-auto"
                  style={{
                    backgroundColor: features[selectedFeature].color,
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-base)',
                    fontWeight: 'var(--font-weight-medium)',
                    border: 'none',
                    boxShadow: `0 4px 12px ${features[selectedFeature].color}40`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = `0 6px 20px ${features[selectedFeature].color}50`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = `0 4px 12px ${features[selectedFeature].color}40`;
                  }}
                >
                  Comenzar ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
              <h2 className="mb-4 pr-8" style={{ color: '#006B4E', fontSize: 'var(--font-size-h3)' }}>
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
                  className="w-full h-12 bg-[#006B4E] hover:bg-[#01533E] text-white px-6 text-base leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center shadow-sm"
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
    </div>
  );
}