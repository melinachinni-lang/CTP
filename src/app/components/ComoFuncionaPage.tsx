import React, { useState, useRef } from 'react';
import { Upload, MessageSquare, ClipboardList, CheckCircle, FileText, BarChart3, Users, CreditCard, MessageCircle, Mail, ChevronDown, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Navbar } from '@/app/components/Navbar';
import { useI18n } from '@/app/i18n/i18nContext';
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
  const { t } = useI18n();
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
      title: t.comoFunciona.step1Title,
      description: t.comoFunciona.step1Desc,
      image: 'https://images.unsplash.com/photo-1705508216613-be1715a31212?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBmb3JtJTIwdXBsb2FkfGVufDF8fHx8MTc3MDE0NzMyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      number: '2',
      icon: MessageSquare,
      title: t.comoFunciona.step2Title,
      description: t.comoFunciona.step2Desc,
      image: 'https://images.unsplash.com/photo-1609162554108-6490759499ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbm90aWZpY2F0aW9ucyUyMG1lc3NhZ2VzfGVufDF8fHx8MTc3MDE0NzMyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      number: '3',
      icon: ClipboardList,
      title: t.comoFunciona.step3Title,
      description: t.comoFunciona.step3Desc,
      image: 'https://images.unsplash.com/photo-1763038311036-6d18805537e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBhbmFseXRpY3MlMjBtYW5hZ2VtZW50fGVufDF8fHx8MTc3MDE0NzMyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      number: '4',
      icon: CheckCircle,
      title: t.comoFunciona.step4Title,
      description: t.comoFunciona.step4Desc,
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
      title: t.comoFunciona.feat1Title,
      description: t.comoFunciona.feat1Desc,
      color: '#006B4E',
      lightColor: 'rgba(0, 107, 78, 0.1)',
      detailedInfo: { intro: t.comoFunciona.feat1Intro, benefits: t.comoFunciona.feat1Benefits, cta: t.comoFunciona.feat1Cta }
    },
    {
      icon: MessageSquare,
      title: t.comoFunciona.feat2Title,
      description: t.comoFunciona.feat2Desc,
      color: '#006B4E',
      lightColor: 'rgba(0, 107, 78, 0.1)',
      detailedInfo: { intro: t.comoFunciona.feat2Intro, benefits: t.comoFunciona.feat2Benefits, cta: t.comoFunciona.feat2Cta }
    },
    {
      icon: BarChart3,
      title: t.comoFunciona.feat3Title,
      description: t.comoFunciona.feat3Desc,
      color: '#006B4E',
      lightColor: 'rgba(0, 107, 78, 0.1)',
      detailedInfo: { intro: t.comoFunciona.feat3Intro, benefits: t.comoFunciona.feat3Benefits, cta: t.comoFunciona.feat3Cta }
    },
    {
      icon: Users,
      title: t.comoFunciona.feat4Title,
      description: t.comoFunciona.feat4Desc,
      color: '#006B4E',
      lightColor: 'rgba(0, 107, 78, 0.1)',
      detailedInfo: { intro: t.comoFunciona.feat4Intro, benefits: t.comoFunciona.feat4Benefits, cta: t.comoFunciona.feat4Cta }
    },
    {
      icon: CreditCard,
      title: t.comoFunciona.feat5Title,
      description: t.comoFunciona.feat5Desc,
      color: '#006B4E',
      lightColor: 'rgba(0, 107, 78, 0.1)',
      detailedInfo: { intro: t.comoFunciona.feat5Intro, benefits: t.comoFunciona.feat5Benefits, cta: t.comoFunciona.feat5Cta }
    }
  ];

  const faqs = [
    { question: t.comoFunciona.faq1Q, answer: t.comoFunciona.faq1A },
    { question: t.comoFunciona.faq2Q, answer: t.comoFunciona.faq2A },
    { question: t.comoFunciona.faq3Q, answer: t.comoFunciona.faq3A },
    { question: t.comoFunciona.faq4Q, answer: t.comoFunciona.faq4A },
    { question: t.comoFunciona.faq5Q, answer: t.comoFunciona.faq5A },
    { question: t.comoFunciona.faq6Q, answer: t.comoFunciona.faq6A },
    { question: t.comoFunciona.faq7Q, answer: t.comoFunciona.faq7A },
    { question: t.comoFunciona.faq8Q, answer: t.comoFunciona.faq8A },
    { question: t.comoFunciona.faq9Q, answer: t.comoFunciona.faq9A },
    { question: t.comoFunciona.faq10Q, answer: t.comoFunciona.faq10A },
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
              {t.comoFunciona.pageTitle}
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
              {t.comoFunciona.pageSubtitle}
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
              {t.comoFunciona.stepsTitle}
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
              {t.comoFunciona.stepsSubtitle}
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
                    aria-label={`${index + 1}`}
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
              {t.comoFunciona.featuresTitle}
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
              {t.comoFunciona.featuresSubtitle}
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
              {t.comoFunciona.supportTitle}
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
              {t.comoFunciona.supportSubtitle}
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
                  {t.comoFunciona.chatTitle}
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
                  {t.comoFunciona.chatDesc}
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
                  {t.comoFunciona.chatHours}
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
                  {t.comoFunciona.emailTitle}
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
                  {t.comoFunciona.emailDesc}
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
                  {t.comoFunciona.helpTitle}
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
                  {t.comoFunciona.helpDesc}
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
                  {t.comoFunciona.viewArticles}
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
              {t.comoFunciona.faqTitle}
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
              {t.comoFunciona.faqSubtitle}
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
              {t.comoFunciona.ctaTitle}
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
              {t.comoFunciona.ctaSubtitle}
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
                {t.home.createAccountBtn}
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
                {t.comoFunciona.viewParcels}
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
                {t.home.footerDesc}
              </p>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold text-black">{t.home.footerExplore.toUpperCase()}</div>
              <div className="space-y-2 text-xs text-gray-600">
                <div>{t.nav.parcelas}</div>
                <div>{t.nav.inmobiliarias}</div>
                <div>{t.home.footerBlog}</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold text-black">{t.home.footerPlatform.toUpperCase()}</div>
              <div className="space-y-2 text-xs text-gray-600">
                <div>{t.home.footerHowItWorks}</div>
                <div>{t.home.footerPublish}</div>
                <div>{t.home.footerPlans}</div>
                <div className="cursor-pointer hover:text-black" onClick={() => onNavigate('planes-brokers')}>{t.home.footerBrokers}</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold text-black">{t.home.footerSupport.toUpperCase()}</div>
              <div className="space-y-2 text-xs text-gray-600">
                <div>{t.home.footerHelp}</div>
                <div>{t.home.footerTerms}</div>
                <div>{t.home.footerPrivacy}</div>
                <div>{t.home.footerContact}</div>
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
                {t.comoFunciona.modalFeaturesTitle}
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
                  {t.comoFunciona.modalStartBtn}
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
                {t.home.publishModalTitle}
              </h2>

              {/* Descripción */}
              <p className="text-gray-600 mb-6" style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-light)', fontSize: 'var(--font-size-body-base)', lineHeight: 'var(--line-height-body)' }}>
                {t.home.publishModalDesc}
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
                  {t.home.createAccountBtn}
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
                  {t.home.loginBtn}
                </button>
              </div>

              {/* Texto de refuerzo */}
              <p className="text-gray-500 text-center mt-6" style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-light)', fontSize: 'var(--font-size-body-sm)' }}>
                {t.home.publishModalNote}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}