import React from 'react';
import { ChevronLeft, Calendar, Clock, User } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import logo from 'figma:asset/a4719ce43ce52ee49df30a2a5c090c8a8b743667.png';

interface ArticuloPageProps {
  onNavigate: (screen: string) => void;
  articuloId: number | null;
  isLoggedIn?: boolean;
  currentUser?: { name: string; email: string } | null;
  onLogout?: () => void;
}

export function ArticuloPage({ onNavigate, articuloId, isLoggedIn = false, currentUser, onLogout }: ArticuloPageProps) {
  const articulos = [
    {
      id: 1,
      titulo: 'Guía completa para comprar tu primera parcela',
      autor: 'Carolina Muñoz',
      fecha: '15 de Marzo, 2026',
      tiempoLectura: '8 min',
      categoria: 'Guías',
      imagen: 'https://images.unsplash.com/photo-1755439917128-c4cede457fa6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kJTIwcGxvdCUyMHJ1cmFsfGVufDF8fHx8MTc2ODg2NTMxMXww&ixlib=rb-4.1.0&q=80&w=1080',
      contenido: [
        {
          tipo: 'parrafo',
          texto: 'Comprar una parcela puede ser una de las inversiones más emocionantes y gratificantes de tu vida. Ya sea que busques un refugio de fin de semana, un proyecto de inversión a largo plazo, o un lugar para construir tu hogar soñado, es fundamental tomar decisiones informadas.'
        },
        {
          tipo: 'subtitulo',
          texto: '1. Define tu propósito'
        },
        {
          tipo: 'parrafo',
          texto: 'Antes de comenzar tu búsqueda, es esencial que tengas claro el propósito de tu compra. ¿Quieres vivir allí permanentemente, usar la parcela como casa de vacaciones, o invertir para revenderla en el futuro? Cada objetivo requiere diferentes consideraciones en términos de ubicación, acceso a servicios, y potencial de valorización.'
        },
        {
          tipo: 'subtitulo',
          texto: '2. Investiga la ubicación'
        },
        {
          tipo: 'parrafo',
          texto: 'La ubicación es uno de los factores más importantes. Considera la distancia a centros urbanos, la calidad de las vías de acceso, la disponibilidad de servicios básicos como agua y electricidad, y el entorno natural. Visita la zona en diferentes momentos del día y, si es posible, en diferentes estaciones del año.'
        },
        {
          tipo: 'subtitulo',
          texto: '3. Verifica la documentación legal'
        },
        {
          tipo: 'parrafo',
          texto: 'Es fundamental revisar que la parcela tenga toda su documentación en regla: escritura, rol de avalúo, certificado de dominio vigente, y plano de mensura. Si la parcela pertenece a un condominio o parcelación, solicita el reglamento de copropiedad y verifica que no existan deudas de contribuciones o gastos comunes.'
        },
        {
          tipo: 'subtitulo',
          texto: '4. Evalúa el terreno'
        },
        {
          tipo: 'parrafo',
          texto: 'Más allá del precio y la ubicación, es importante evaluar las características físicas del terreno: topografía, tipo de suelo, orientación, presencia de agua (napas subterráneas, pozos, esteros), vegetación existente, y cualquier riesgo natural como inundaciones o deslizamientos.'
        },
        {
          tipo: 'subtitulo',
          texto: '5. Planifica el presupuesto total'
        },
        {
          tipo: 'parrafo',
          texto: 'El precio de compra es solo el comienzo. Considera también los costos de escrituración (notaría, conservador de bienes raíces), impuestos de transferencia, eventual costo de cierre y cerco perimetral, instalación de servicios básicos, y construcción si planeas edificar.'
        }
      ]
    },
    {
      id: 2,
      titulo: 'Aspectos legales al adquirir terrenos rurales',
      autor: 'Roberto Silva',
      fecha: '10 de Marzo, 2026',
      tiempoLectura: '6 min',
      categoria: 'Legal',
      imagen: 'https://images.unsplash.com/photo-1768715825473-1213f87ec005?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VudHJ5c2lkZSUyMHByb3BlcnR5fGVufDF8fHx8MTc2ODg2NTMxMXww&ixlib=rb-4.1.0&q=80&w=1080',
      contenido: [
        {
          tipo: 'parrafo',
          texto: 'La compra de terrenos rurales implica consideraciones legales específicas que difieren de la adquisición de propiedades urbanas. En este artículo exploramos los aspectos más relevantes que debes conocer.'
        },
        {
          tipo: 'subtitulo',
          texto: 'Régimen de subdivisión predial'
        },
        {
          tipo: 'parrafo',
          texto: 'En Chile, la subdivisión de predios rústicos está regulada por el Decreto Ley 3.516. Esta normativa establece superficies mínimas de subdivisión según la región y tipo de suelo. Es fundamental verificar que la parcela que deseas comprar cumpla con la normativa vigente y que su subdivisión haya sido autorizada correctamente.'
        },
        {
          tipo: 'subtitulo',
          texto: 'Derechos de agua'
        },
        {
          tipo: 'parrafo',
          texto: 'Los derechos de agua son independientes de la propiedad del terreno. Si la parcela tiene derechos de agua inscritos, estos deben aparecer en el certificado de dominio vigente. Verifica si existen derechos constituidos, su tipo (consuntivos o no consuntivos), y su caudal. Si no hay derechos constituidos pero existe agua en el terreno, averigua las posibilidades de solicitar nuevos derechos.'
        },
        {
          tipo: 'subtitulo',
          texto: 'Planificación territorial'
        },
        {
          tipo: 'parrafo',
          texto: 'Consulta el Plan Regulador Comunal o Intercomunal aplicable para conocer las restricciones de uso de suelo, construcción permitida, coeficientes de edificación, y zonas de protección. Algunos terrenos pueden tener restricciones ambientales, arqueológicas o de protección patrimonial que limitan su uso.'
        }
      ]
    },
    {
      id: 3,
      titulo: 'Las mejores regiones para invertir en parcelas',
      autor: 'María González',
      fecha: '5 de Marzo, 2026',
      tiempoLectura: '10 min',
      categoria: 'Inversión',
      imagen: 'https://images.unsplash.com/photo-1748711243680-1c4ab4f9979f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmR8ZW58MXx8fHwxNzY4ODY1MzExfDA&ixlib=rb-4.1.0&q=80&w=1080',
      contenido: [
        {
          tipo: 'parrafo',
          texto: 'El mercado de parcelas en Chile ofrece oportunidades interesantes en diversas regiones. Cada zona tiene características particulares que pueden hacer de tu inversión un éxito a largo plazo.'
        },
        {
          tipo: 'subtitulo',
          texto: 'Región Metropolitana'
        },
        {
          tipo: 'parrafo',
          texto: 'Las comunas precordilleranas como Pirque, San José de Maipo y Colina han experimentado un crecimiento sostenido en los últimos años. La proximidad a Santiago y el acceso a naturaleza hacen de estas zonas opciones atractivas para quienes buscan calidad de vida sin alejarse de la capital.'
        },
        {
          tipo: 'subtitulo',
          texto: 'Región de Valparaíso'
        },
        {
          tipo: 'parrafo',
          texto: 'La costa y el valle de Casablanca ofrecen oportunidades tanto para proyectos turísticos como agrícolas. La denominación de origen de los vinos ha impulsado el valor de terrenos aptos para viñedos.'
        },
        {
          tipo: 'subtitulo',
          texto: 'Región de Los Lagos y Aysén'
        },
        {
          tipo: 'parrafo',
          texto: 'El sur de Chile atrae cada vez más inversores interesados en la naturaleza prístina y el potencial turístico. Zonas como Puerto Varas, Pucón y Chile Chico han visto incrementos importantes en el valor de las parcelas, especialmente aquellas con acceso a lagos, ríos o vistas privilegiadas.'
        }
      ]
    }
  ];

  const articulo = articulos.find(a => a.id === articuloId) || articulos[0];

  const articulosRelacionados = articulos.filter(a => a.id !== articulo.id).slice(0, 2);

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: 'var(--hero-background)' }}>
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
              {isLoggedIn && currentUser ? (
                <>
                  <span className="text-sm" style={{ color: '#6B6B6B' }}>
                    {currentUser.name}
                  </span>
                  <button
                    onClick={onLogout}
                    className="h-8 bg-[#efefef] text-black px-[20px] text-sm leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center py-[0px] hover:bg-[#dedede] hover:text-[#303030]"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <button
                    style={{ backgroundColor: '#006B4E' }}
                    className="h-8 text-white px-[20px] text-sm leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center py-[0px]"
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#01533E'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006B4E'}
                  >
                    Publicar propiedad
                  </button>
                  <button
                    onClick={() => onNavigate('entry')}
                    className="h-8 bg-[#efefef] text-black px-[20px] text-sm leading-[1.5] font-medium rounded-[200px] transition-colors flex items-center justify-center py-[0px] hover:bg-[#dedede] hover:text-[#303030]"
                  >
                    Iniciar sesión
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Botón volver */}
          <button
            onClick={() => onNavigate('recursos')}
            className="flex items-center gap-2 mb-6 text-sm hover:underline"
            style={{ color: 'var(--foreground)' }}
          >
            <ChevronLeft className="w-4 h-4" />
            Volver a Recursos
          </button>

          {/* Artículo */}
          <article>
            {/* Categoría */}
            <div className="mb-4">
              <span
                className="inline-block px-4 py-1 rounded-full text-sm"
                style={{ backgroundColor: '#F5F5F0', color: 'var(--foreground)' }}
              >
                {articulo.categoria}
              </span>
            </div>

            {/* Título */}
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--font-size-h1)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--foreground)',
                marginBottom: '1.5rem',
                lineHeight: '1.2'
              }}
            >
              {articulo.titulo}
            </h1>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b" style={{ borderColor: '#E5E5E5' }}>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" style={{ color: '#6B6B6B' }} />
                <span style={{ color: '#6B6B6B', fontSize: '0.875rem' }}>{articulo.autor}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" style={{ color: '#6B6B6B' }} />
                <span style={{ color: '#6B6B6B', fontSize: '0.875rem' }}>{articulo.fecha}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" style={{ color: '#6B6B6B' }} />
                <span style={{ color: '#6B6B6B', fontSize: '0.875rem' }}>{articulo.tiempoLectura} de lectura</span>
              </div>
            </div>

            {/* Imagen principal */}
            <div className="mb-8">
              <img
                src={articulo.imagen}
                alt={articulo.titulo}
                className="w-full h-[400px] object-cover rounded-2xl"
              />
            </div>

            {/* Contenido */}
            <div className="prose prose-lg max-w-none">
              {articulo.contenido.map((bloque, index) => {
                if (bloque.tipo === 'parrafo') {
                  return (
                    <p
                      key={index}
                      className="mb-6"
                      style={{
                        color: 'var(--foreground)',
                        lineHeight: '1.7',
                        fontSize: '1.125rem'
                      }}
                    >
                      {bloque.texto}
                    </p>
                  );
                } else if (bloque.tipo === 'subtitulo') {
                  return (
                    <h2
                      key={index}
                      className="mt-10 mb-4"
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'var(--font-size-h3)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: 'var(--foreground)'
                      }}
                    >
                      {bloque.texto}
                    </h2>
                  );
                }
                return null;
              })}
            </div>
          </article>

          {/* Artículos relacionados */}
          <div className="mt-16 pt-8 border-t" style={{ borderColor: '#E5E5E5' }}>
            <h3
              className="mb-6"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--font-size-h3)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--foreground)'
              }}
            >
              Artículos relacionados
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articulosRelacionados.map((art) => (
                <div
                  key={art.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => onNavigate('articulo', art.id)}
                >
                  <img
                    src={art.imagen}
                    alt={art.titulo}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs mb-3"
                      style={{ backgroundColor: '#F5F5F0', color: 'var(--foreground)' }}
                    >
                      {art.categoria}
                    </span>
                    <h4
                      className="mb-2"
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'var(--font-size-h5)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: 'var(--foreground)'
                      }}
                    >
                      {art.titulo}
                    </h4>
                    <div className="flex items-center gap-4 text-sm" style={{ color: '#6B6B6B' }}>
                      <span>{art.tiempoLectura} lectura</span>
                      <span>{art.fecha}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
