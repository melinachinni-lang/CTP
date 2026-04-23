import React, { useState } from 'react';
import { Clock, Calendar } from 'lucide-react';
import { Navbar } from '@/app/components/Navbar';
import logo from 'figma:asset/a4719ce43ce52ee49df30a2a5c090c8a8b743667.png';
import heroBackground from 'figma:asset/46be9646c60608d21a829a86b189efb4cfc6cbbc.png';
import { SocialMediaBanner } from '@/app/components/SocialMediaBanner';

interface RecursosPageProps {
  onNavigate: (page: string) => void;
  isLoggedIn?: boolean;
  currentUser?: { name: string; email: string } | null;
  onLogout?: () => void;
  onOpenPublishModal?: () => void;
  onNavigateToPublish?: () => void;
}

export function RecursosPage({ onNavigate, isLoggedIn = false, currentUser, onLogout, onOpenPublishModal, onNavigateToPublish }: RecursosPageProps) {
  const [showPublishModal, setShowPublishModal] = useState(false);
  // Featured article (la más reciente)
  const featuredArticle = {
    id: 1,
    title: 'Guía completa para comprar tu primera parcela en Chile',
    excerpt: 'Todo lo que necesitás saber antes de invertir en una parcela: aspectos legales, financiamiento, permisos de construcción y errores comunes que debes evitar.',
    fullDescription: 'Comprar una parcela es una decisión importante que requiere investigación y planificación. En esta guía completa te explicamos paso a paso todo el proceso, desde la búsqueda inicial hasta la firma de la escritura. Aprenderás a identificar terrenos con buen potencial, verificar la documentación legal, negociar el precio, y obtener el financiamiento necesario.',
    category: 'Guía de compra',
    readTime: '8 min',
    date: 'Hace 2 días',
    author: 'Equipo CompraTuParcela',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    tags: ['Compra', 'Legal', 'Financiamiento']
  };

  // Secondary articles
  const articles = [
    {
      id: 2,
      title: 'Parcelas de inversión: ¿vale la pena en 2026?',
      excerpt: 'Analizamos el mercado actual de parcelas en Chile y las perspectivas de rentabilidad para inversionistas.',
      category: 'Inversión',
      readTime: '6 min',
      date: 'Hace 5 días',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80'
    },
    {
      id: 3,
      title: 'Aspectos legales que debes conocer antes de comprar',
      excerpt: 'Documentación necesaria, inscripciones y trámites legales para una compra segura.',
      category: 'Legal',
      readTime: '5 min',
      date: 'Hace 1 semana',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80'
    },
    {
      id: 4,
      title: 'Cómo financiar la compra de tu parcela',
      excerpt: 'Opciones de crédito hipotecario, subsidios y alternativas de financiamiento disponibles.',
      category: 'Financiamiento',
      readTime: '7 min',
      date: 'Hace 2 semanas',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80'
    },
    {
      id: 5,
      title: 'Permisos de construcción en terrenos rurales',
      excerpt: 'Normativas, requisitos y proceso para obtener permisos de edificación en parcelas.',
      category: 'Construcción',
      readTime: '6 min',
      date: 'Hace 3 semanas',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80'
    },
    {
      id: 6,
      title: 'Tendencias del mercado inmobiliario rural 2026',
      excerpt: 'Precios, demanda y zonas más atractivas para invertir en parcelas este año.',
      category: 'Mercado',
      readTime: '5 min',
      date: 'Hace 1 mes',
      image: 'https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=400&q=80'
    },
    {
      id: 7,
      title: 'Conectividad y servicios básicos en parcelas',
      excerpt: 'Agua, luz, internet y acceso: qué preguntar antes de comprar una parcela.',
      category: 'Guía de compra',
      readTime: '4 min',
      date: 'Hace 1 mes',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80'
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Guía de compra': '#0047BA',
      'Inversión': '#336BCC',
      'Legal': '#6B6B6B',
      'Financiamiento': '#0047BA',
      'Construcción': '#336BCC',
      'Mercado': '#6B6B6B'
    };
    return colors[category] || '#0047BA';
  };

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

      {/* Main Content */}
      <main className="relative pt-28" style={{ backgroundColor: 'var(--hero-background)' }}>
        {/* Hero Section - Exactly like Como Funciona */}
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
              Recursos
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
              Guías, noticias y consejos prácticos para comprar, vender e invertir en parcelas
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-[1440px] mx-auto px-6">
          {/* Featured Article + Secondary Articles Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            {/* Featured Article (8 columns) */}
            <article
              className="lg:col-span-8 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E5E5',
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
              {/* Featured Image */}
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Featured Content */}
              <div className="p-8">
                {/* Category Badge */}
                <div className="mb-4">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: getCategoryColor(featuredArticle.category) + '15',
                      color: getCategoryColor(featuredArticle.category),
                      fontFamily: 'var(--font-body)',
                      fontWeight: 'var(--font-weight-medium)',
                      letterSpacing: 'var(--letter-spacing-wide)'
                    }}
                  >
                    {featuredArticle.category}
                  </span>
                </div>

                {/* Title */}
                <h2
                  className="mb-4"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--font-size-h2)',
                    fontWeight: 'var(--font-weight-regular)',
                    color: '#124854',
                    lineHeight: 'var(--line-height-heading)',
                    letterSpacing: 'var(--letter-spacing-tight)'
                  }}
                >
                  {featuredArticle.title}
                </h2>

                {/* Excerpt */}
                <p
                  className="mb-4"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-base)',
                    fontWeight: 'var(--font-weight-regular)',
                    color: '#595959',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  {featuredArticle.excerpt}
                </p>

                {/* Full Description */}
                <p
                  className="mb-6"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-regular)',
                    color: '#737373',
                    lineHeight: 'var(--line-height-body)'
                  }}
                >
                  {featuredArticle.fullDescription}
                </p>

                {/* Tags */}
                <div className="flex items-center gap-2 mb-6">
                  {featuredArticle.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-xs"
                      style={{
                        backgroundColor: '#FAFAFA',
                        border: '1px solid #E5E5E5',
                        fontFamily: 'var(--font-body)',
                        fontWeight: 'var(--font-weight-regular)',
                        color: '#737373'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Metadata */}
                <div className="flex items-center gap-4 pt-4" style={{ borderTop: '1px solid #E5E5E5' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#0A0A0A',
                      lineHeight: 'var(--line-height-body)'
                    }}
                  >
                    {featuredArticle.author}
                  </span>
                  <span style={{ color: '#DEDEDE' }}>•</span>
                  <div className="flex items-center gap-2">
                    <Clock size={16} style={{ color: '#737373' }} />
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-regular)',
                        color: '#737373',
                        lineHeight: 'var(--line-height-body)'
                      }}
                    >
                      {featuredArticle.readTime} de lectura
                    </span>
                  </div>
                  <span style={{ color: '#DEDEDE' }}>•</span>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} style={{ color: '#737373' }} />
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body-sm)',
                        fontWeight: 'var(--font-weight-regular)',
                        color: '#737373',
                        lineHeight: 'var(--line-height-body)'
                      }}
                    >
                      {featuredArticle.date}
                    </span>
                  </div>
                </div>
              </div>
            </article>

            {/* Secondary Articles (4 columns) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {articles.slice(0, 2).map((article) => (
                <article
                  key={article.id}
                  className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E5E5',
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
                  {/* Image */}
                  <div className="relative w-full" style={{ paddingBottom: '60%' }}>
                    <img
                      src={article.image}
                      alt={article.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category Badge */}
                    <div className="mb-3">
                      <span
                        className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: getCategoryColor(article.category) + '15',
                          color: getCategoryColor(article.category),
                          fontFamily: 'var(--font-body)',
                          fontWeight: 'var(--font-weight-medium)',
                          letterSpacing: 'var(--letter-spacing-wide)'
                        }}
                      >
                        {article.category}
                      </span>
                    </div>

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
                      {article.title}
                    </h3>

                    {/* Excerpt */}
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
                      {article.excerpt}
                    </p>

                    {/* Metadata */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Clock size={14} style={{ color: '#737373' }} />
                        <span
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 'var(--font-weight-regular)',
                            color: '#737373',
                            lineHeight: 'var(--line-height-body)'
                          }}
                        >
                          {article.readTime}
                        </span>
                      </div>
                      <span style={{ color: '#DEDEDE' }}>•</span>
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-regular)',
                          color: '#737373',
                          lineHeight: 'var(--line-height-body)'
                        }}
                      >
                        {article.date}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* More Articles Grid */}
          <div className="mb-12">
            <h2
              className="mb-8"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--font-size-h3)',
                fontWeight: 'var(--font-weight-medium)',
                color: '#124854',
                lineHeight: 'var(--line-height-heading)',
                letterSpacing: 'var(--letter-spacing-normal)'
              }}
            >
              Más artículos
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.slice(2).map((article) => (
                <article
                  key={article.id}
                  className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E5E5',
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
                  {/* Image */}
                  <div className="relative w-full" style={{ paddingBottom: '60%' }}>
                    <img
                      src={article.image}
                      alt={article.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category Badge */}
                    <div className="mb-3">
                      <span
                        className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: getCategoryColor(article.category) + '15',
                          color: getCategoryColor(article.category),
                          fontFamily: 'var(--font-body)',
                          fontWeight: 'var(--font-weight-medium)',
                          letterSpacing: 'var(--letter-spacing-wide)'
                        }}
                      >
                        {article.category}
                      </span>
                    </div>

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
                      {article.title}
                    </h3>

                    {/* Excerpt */}
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
                      {article.excerpt}
                    </p>

                    {/* Metadata */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Clock size={14} style={{ color: '#737373' }} />
                        <span
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 'var(--font-weight-regular)',
                            color: '#737373',
                            lineHeight: 'var(--line-height-body)'
                          }}
                        >
                          {article.readTime}
                        </span>
                      </div>
                      <span style={{ color: '#DEDEDE' }}>•</span>
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-regular)',
                          color: '#737373',
                          lineHeight: 'var(--line-height-body)'
                        }}
                      >
                        {article.date}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
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
    </div>
  );
}