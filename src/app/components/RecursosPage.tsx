import React, { useState } from 'react';
import { Clock, Calendar, X } from 'lucide-react';
import { Navbar } from '@/app/components/Navbar';
import logo from 'figma:asset/a4719ce43ce52ee49df30a2a5c090c8a8b743667.png';
import heroBackground from 'figma:asset/46be9646c60608d21a829a86b189efb4cfc6cbbc.png';
import { SocialMediaBanner } from '@/app/components/SocialMediaBanner';
import { useI18n } from '@/app/i18n/i18nContext';

interface RecursosPageProps {
  onNavigate: (page: string) => void;
  isLoggedIn?: boolean;
  currentUser?: { name: string; email: string } | null;
  onLogout?: () => void;
  onOpenPublishModal?: () => void;
  onNavigateToPublish?: () => void;
}

export function RecursosPage({ onNavigate, isLoggedIn = false, currentUser, onLogout, onOpenPublishModal, onNavigateToPublish }: RecursosPageProps) {
  const { t } = useI18n();
  const [showPublishModal, setShowPublishModal] = useState(false);

  const featuredArticle = {
    id: 1,
    title: t.recursos.featTitle,
    excerpt: t.recursos.featExcerpt,
    fullDescription: t.recursos.featFullDesc,
    category: t.recursos.featCategory,
    readTime: '8 min',
    date: t.recursos.featDate,
    author: t.recursos.featAuthor,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    tags: [t.recursos.featTag1, t.recursos.featTag2, t.recursos.featTag3]
  };

  const articles = [
    { id: 2, title: t.recursos.art2Title, excerpt: t.recursos.art2Excerpt, category: t.recursos.art2Category, readTime: '6 min', date: t.recursos.art2Date, image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80' },
    { id: 3, title: t.recursos.art3Title, excerpt: t.recursos.art3Excerpt, category: t.recursos.art3Category, readTime: '5 min', date: t.recursos.art3Date, image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80' },
    { id: 4, title: t.recursos.art4Title, excerpt: t.recursos.art4Excerpt, category: t.recursos.art4Category, readTime: '7 min', date: t.recursos.art4Date, image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80' },
    { id: 5, title: t.recursos.art5Title, excerpt: t.recursos.art5Excerpt, category: t.recursos.art5Category, readTime: '6 min', date: t.recursos.art5Date, image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80' },
    { id: 6, title: t.recursos.art6Title, excerpt: t.recursos.art6Excerpt, category: t.recursos.art6Category, readTime: '5 min', date: t.recursos.art6Date, image: 'https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=400&q=80' },
    { id: 7, title: t.recursos.art7Title, excerpt: t.recursos.art7Excerpt, category: t.recursos.art7Category, readTime: '4 min', date: t.recursos.art7Date, image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80' },
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Guía de compra': '#006B4E', 'Buying guide': '#006B4E',
      'Inversión': '#006B4E', 'Investment': '#006B4E',
      'Legal': '#6B6B6B',
      'Financiamiento': '#006B4E', 'Financing': '#006B4E',
      'Construcción': '#006B4E', 'Construction': '#006B4E',
      'Mercado': '#6B6B6B', 'Market': '#6B6B6B',
    };
    return colors[category] || '#006B4E';
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
              {t.recursos.pageTitle}
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
              {t.recursos.pageSubtitle}
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
                    color: '#006B4E',
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
                      {featuredArticle.readTime} {t.recursos.readLabel}
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
                color: '#006B4E',
                lineHeight: 'var(--line-height-heading)',
                letterSpacing: 'var(--letter-spacing-normal)'
              }}
            >
              {t.recursos.moreArticles}
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
                <div>{t.home.footerBrokers}</div>
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