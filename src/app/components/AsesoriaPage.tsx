import { SiteFooter } from '@/app/components/SiteFooter';
import React from 'react';
import { ChevronLeft, MapPin, Clock, CheckCircle, Users, MessageCircle, Search, FileText, Phone } from 'lucide-react';
import { useI18n } from '@/app/i18n/i18nContext';

interface AsesoriaPageProps {
  onNavigate: (screen: string, id?: number, data?: string) => void;
}

const WHATSAPP_URL = 'https://wa.me/56977714626?text=Hola%2C%20me%20gustar%C3%ADa%20obtener%20una%20asesor%C3%ADa%20gratuita%20para%20encontrar%20mi%20parcela%20ideal';

export function AsesoriaPage({ onNavigate }: AsesoriaPageProps) {
  const { language } = useI18n();
  const en = language === 'en';

  const [preguntaAbierta, setPreguntaAbierta] = React.useState<number | null>(null);

  const pasos = [
    {
      numero: '01',
      titulo: en ? 'Contact us' : 'Nos contactás',
      descripcion: en
        ? 'Reach one of our advisors via WhatsApp or our form. Tell us your idea, budget and which region you are thinking of investing in.'
        : 'Te comunicas con uno de nuestros asesores por WhatsApp o formulario. Nos cuentas tu idea, presupuesto y en qué región estás pensando invertir.',
      icono: MessageCircle,
    },
    {
      numero: '02',
      titulo: en ? 'Personalized analysis' : 'Análisis personalizado',
      descripcion: en
        ? 'The advisor studies your profile and goals: whether you are looking for an agricultural, tourist, construction or investment parcel. No commitment.'
        : 'El asesor estudia tu perfil y objetivos: si buscas una parcela agrícola, turística, para construcción o inversión. Sin compromiso.',
      icono: Search,
    },
    {
      numero: '03',
      titulo: en ? 'Option selection' : 'Selección de opciones',
      descripcion: en
        ? 'We present the parcels that best match your needs, with all available documentation so you can evaluate them with peace of mind.'
        : 'Te presentamos las parcelas que mejor se ajustan a tus necesidades, con toda la documentación disponible para que puedas evaluar con tranquilidad.',
      icono: FileText,
    },
    {
      numero: '04',
      titulo: en ? 'Support throughout the process' : 'Acompañamiento en el proceso',
      descripcion: en
        ? 'From the visit to the signing, we guide you at every stage. We coordinate with the agency or seller so everything is transparent.'
        : 'Desde la visita hasta la firma, te guiamos en cada etapa. Coordinamos con la inmobiliaria o vendedor para que todo sea transparente.',
      icono: CheckCircle,
    },
  ];

  const beneficios = [
    {
      titulo: en ? 'No cost to the buyer' : 'Sin costo para el comprador',
      descripcion: en
        ? 'Our advisory service is completely free for those looking to buy.'
        : 'Nuestro servicio de asesoría es completamente gratuito para quienes buscan comprar.',
    },
    {
      titulo: en ? 'Advisors with local expertise' : 'Asesores con experiencia local',
      descripcion: en
        ? 'We know the areas, real prices and most reliable projects in each region.'
        : 'Conocemos las zonas, los precios reales y los proyectos más confiables de cada región.',
    },
    {
      titulo: en ? 'Response within 24 hours' : 'Respuesta en menos de 24 horas',
      descripcion: en
        ? 'We commit to contacting you on the same business day you write to us.'
        : 'Nos comprometemos a contactarte el mismo día hábil en que nos escribes.',
    },
    {
      titulo: en ? 'No sales pressure' : 'Sin presión de venta',
      descripcion: en
        ? 'We do not push you to decide quickly. The goal is for you to find the right parcel.'
        : 'No te empujamos a decidir rápido. El objetivo es que encuentres la parcela correcta.',
    },
    {
      titulo: en ? 'Access to exclusive properties' : 'Acceso a propiedades exclusivas',
      descripcion: en
        ? 'We have access to properties that are not always publicly listed on the portal.'
        : 'Tenemos acceso a propiedades que no siempre se publican de forma abierta en el portal.',
    },
    {
      titulo: en ? 'Basic legal advice included' : 'Asesoría legal básica incluida',
      descripcion: en
        ? 'We explain what documents to request, what to check in the title, and the steps to complete the deed.'
        : 'Te explicamos qué documentos pedir, qué revisar en el título y los pasos para escriturar.',
    },
  ];

  const preguntas = [
    {
      pregunta: en ? 'Is it really free?' : '¿Es realmente gratis?',
      respuesta: en
        ? 'Yes. For the buyer there is no cost. We are funded through agreements with the verified agencies and sellers we list on the platform.'
        : 'Sí. Para el comprador el servicio no tiene ningún costo. Nos financiamos a través de acuerdos con las inmobiliarias y vendedores verificados que publicamos en la plataforma.',
    },
    {
      pregunta: en ? 'Which regions do you cover?' : '¿En qué regiones operan?',
      respuesta: en
        ? 'We mainly cover the regions of La Araucanía, Los Ríos, Los Lagos, Aysén and Chilean Patagonia. We also have properties in the central zone.'
        : 'Cubrimos principalmente las regiones de La Araucanía, Los Ríos, Los Lagos, Aysén y la Patagonia chilena. También contamos con propiedades en la zona central.',
    },
    {
      pregunta: en ? 'How long does the process take?' : '¿Cuánto tarda el proceso?',
      respuesta: en
        ? 'It depends on what you are looking for. In some cases we can present options the same day. In others, if the search is more specific, it may take between 3 and 7 business days.'
        : 'Depende de lo que buscas. En algunos casos podemos presentarte opciones el mismo día. En otros, si la búsqueda es más específica, puede tomar entre 3 y 7 días hábiles.',
    },
    {
      pregunta: en ? 'Can you accompany me to see the parcel?' : '¿Pueden acompañarme a ver la parcela?',
      respuesta: en
        ? 'We coordinate the visit with the seller and in some cases our advisors can accompany you in person or via video call.'
        : 'Coordinamos la visita con el vendedor y en algunos casos nuestros asesores pueden acompañarte presencialmente o mediante videollamada.',
    },
  ];

  const stats = [
    { valor: '+500', label: en ? 'Buyers advised' : 'Compradores asesorados' },
    { valor: '+120', label: en ? 'Available properties' : 'Propiedades disponibles' },
    { valor: '< 24h', label: en ? 'Response time' : 'Tiempo de respuesta' },
    { valor: '100%', label: en ? 'Free for buyers' : 'Gratuito para compradores' },
  ];

  return (
    <div style={{ fontFamily: 'var(--font-body)', backgroundColor: '#FFFFFF', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 transition-colors"
            style={{ color: '#6B6B6B', fontSize: '14px' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#006B4E'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#6B6B6B'}
          >
            <ChevronLeft className="w-4 h-4" />
            {en ? 'Back to home' : 'Volver al inicio'}
          </button>
        </div>
      </div>

      {/* Hero */}
      <section style={{ backgroundColor: 'var(--hero-background)', paddingTop: '64px', paddingBottom: '64px' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ backgroundColor: 'rgba(0, 107, 78, 0.1)', color: '#006B4E', fontSize: '13px', fontWeight: 500 }}
          >
            <Users className="w-4 h-4" />
            {en ? 'Free service for buyers' : 'Servicio gratuito para compradores'}
          </div>
          <h1 style={{ color: '#0A0A0A', marginBottom: '20px', fontFamily: 'var(--font-heading)', fontWeight: 300, fontSize: 'clamp(32px, 5vw, 48px)', lineHeight: '1.2' }}>
            {en ? 'Free advisory to find your ideal parcel' : 'Asesoría gratuita para encontrar tu parcela ideal'}
          </h1>
          <p style={{ color: '#6B6B6B', fontSize: '18px', lineHeight: '1.6', marginBottom: '36px' }}>
            {en
              ? 'We guide you through the entire process: from understanding what type of land you need to coordinating the visit and guiding you through the purchase. No cost, no pressure.'
              : 'Te acompañamos en todo el proceso: desde entender qué tipo de terreno necesitas hasta coordinar la visita y guiarte en la compra. Sin costo, sin presión.'}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-[200px] transition-colors"
              style={{ backgroundColor: '#006B4E', color: '#FFFFFF', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = '#01533E'}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = '#006B4E'}
            >
              <Phone className="w-4 h-4" />
              {en ? 'Talk to an advisor' : 'Hablar con un asesor'}
            </a>
            <button
              onClick={() => onNavigate('parcelas')}
              className="inline-flex items-center justify-center h-12 px-8 rounded-[200px] transition-colors"
              style={{ backgroundColor: 'transparent', color: '#0A0A0A', fontSize: '14px', fontWeight: 500, border: '1px solid #DEDEDE' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#006B4E'; e.currentTarget.style.color = '#006B4E'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#DEDEDE'; e.currentTarget.style.color = '#0A0A0A'; }}
            >
              {en ? 'Explore parcels' : 'Explorar parcelas'}
            </button>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 style={{ color: '#0A0A0A', fontFamily: 'var(--font-heading)', fontWeight: 400, fontSize: 'clamp(24px, 4vw, 36px)', marginBottom: '12px' }}>
              {en ? 'How does it work?' : '¿Cómo funciona?'}
            </h2>
            <p style={{ color: '#6B6B6B', fontSize: '16px' }}>
              {en ? 'A simple, clear process at your pace.' : 'Un proceso simple, claro y a tu ritmo.'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pasos.map((paso) => {
              const Icono = paso.icono;
              return (
                <div
                  key={paso.numero}
                  className="p-6 rounded-2xl"
                  style={{ border: '1px solid var(--border)', backgroundColor: '#FAFAFA' }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'rgba(0, 107, 78, 0.1)' }}
                    >
                      <Icono className="w-5 h-5" style={{ color: '#006B4E' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 600, color: '#006B4E', letterSpacing: '0.05em', marginBottom: '4px' }}>
                        {en ? 'STEP' : 'PASO'} {paso.numero}
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: '18px', color: '#0A0A0A', marginBottom: '8px' }}>
                        {paso.titulo}
                      </h3>
                      <p style={{ color: '#6B6B6B', fontSize: '14px', lineHeight: '1.6' }}>
                        {paso.descripcion}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', backgroundColor: 'var(--hero-background)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 style={{ color: '#0A0A0A', fontFamily: 'var(--font-heading)', fontWeight: 400, fontSize: 'clamp(24px, 4vw, 36px)', marginBottom: '12px' }}>
              {en ? 'Why choose our advisory?' : '¿Por qué elegir nuestra asesoría?'}
            </h2>
            <p style={{ color: '#6B6B6B', fontSize: '16px' }}>
              {en
                ? 'We work to make the experience of buying a parcel simple and safe.'
                : 'Trabajamos para que la experiencia de comprar una parcela sea simple y segura.'}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {beneficios.map((b, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white" style={{ border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#006B4E' }} />
                  <span style={{ fontWeight: 600, fontSize: '14px', color: '#0A0A0A' }}>{b.titulo}</span>
                </div>
                <p style={{ color: '#6B6B6B', fontSize: '13px', lineHeight: '1.6' }}>{b.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ paddingTop: '64px', paddingBottom: '64px' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 300, fontSize: 'clamp(28px, 4vw, 40px)', color: '#006B4E', lineHeight: 1 }}>
                  {stat.valor}
                </div>
                <div style={{ color: '#6B6B6B', fontSize: '13px', marginTop: '8px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preguntas frecuentes */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', backgroundColor: '#FAFAFA' }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 style={{ color: '#0A0A0A', fontFamily: 'var(--font-heading)', fontWeight: 400, fontSize: 'clamp(24px, 4vw, 36px)', marginBottom: '12px' }}>
              {en ? 'Frequently asked questions' : 'Preguntas frecuentes'}
            </h2>
          </div>
          <div className="space-y-3">
            {preguntas.map((p, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden"
                style={{ border: '1px solid var(--border)', backgroundColor: '#FFFFFF' }}
              >
                <button
                  onClick={() => setPreguntaAbierta(preguntaAbierta === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  style={{ backgroundColor: 'transparent' }}
                >
                  <span style={{ fontWeight: 500, fontSize: '15px', color: '#0A0A0A' }}>{p.pregunta}</span>
                  <span style={{ color: '#006B4E', fontSize: '20px', lineHeight: 1, flexShrink: 0 }}>
                    {preguntaAbierta === i ? '−' : '+'}
                  </span>
                </button>
                {preguntaAbierta === i && (
                  <div style={{ padding: '0 20px 20px', color: '#6B6B6B', fontSize: '14px', lineHeight: '1.7' }}>
                    {p.respuesta}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', backgroundColor: '#006B4E' }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 300, fontSize: 'clamp(28px, 4vw, 40px)', color: '#FFFFFF', marginBottom: '16px', lineHeight: '1.2' }}>
            {en ? 'Ready to find your parcel?' : '¿Listo para encontrar tu parcela?'}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', marginBottom: '36px' }}>
            {en
              ? 'Write to us today and an advisor will contact you within 24 hours.'
              : 'Escríbenos hoy y un asesor se pondrá en contacto contigo en menos de 24 horas.'}
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 h-12 px-10 rounded-[200px] transition-colors"
            style={{ backgroundColor: '#FFFFFF', color: '#006B4E', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = '#F5F5F5'}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = '#FFFFFF'}
          >
            <MessageCircle className="w-4 h-4" />
            {en ? 'Talk to an advisor on WhatsApp' : 'Hablar con un asesor por WhatsApp'}
          </a>
          <div style={{ marginTop: '16px', color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>
            <MapPin className="w-3 h-3 inline-block mr-1" />
            {en ? 'Coverage across Patagonia and Southern Chile' : 'Cobertura en toda la Patagonia y Sur de Chile'}
            <span className="mx-3">·</span>
            <Clock className="w-3 h-3 inline-block mr-1" />
            {en ? 'Monday to Friday, 9am to 6pm' : 'Lunes a viernes, 9 a 18 hs'}
          </div>
        </div>
      </section>

      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}
