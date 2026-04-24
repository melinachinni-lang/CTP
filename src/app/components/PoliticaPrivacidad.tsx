import React, { useEffect } from 'react';
import { Navbar } from '@/app/components/Navbar';
import logo from 'figma:asset/a4719ce43ce52ee49df30a2a5c090c8a8b743667.png';

interface PoliticaPrivacidadProps {
  onNavigateHome: () => void;
}

export function PoliticaPrivacidad({ onNavigateHome }: PoliticaPrivacidadProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--hero-background)' }}>
      {/* Navbar */}
      <Navbar
        onNavigate={(screen) => {
          if (screen === 'home') {
            onNavigateHome();
          } else {
            onNavigateHome();
          }
        }}
        estado="visitante"
      />

      {/* Content */}
      <main style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: '3rem 1.5rem'
      }}>
        <article style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {/* Header del documento */}
          <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 'var(--font-weight-semibold)',
              fontSize: 'var(--font-size-h1)',
              color: 'var(--foreground)',
              marginBottom: '1rem',
              lineHeight: '1.2'
            }}>
              Política de Privacidad
            </h1>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-base)',
              color: 'var(--foreground)',
              marginBottom: '0.5rem',
              lineHeight: '1.6'
            }}>
              Compra Tu Parcela — Inmobiliaria Isla SPA
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-base)',
              color: 'var(--muted-foreground)',
              marginBottom: '0.25rem',
              lineHeight: '1.6'
            }}>
              Última actualización: Abril 2025
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-base)',
              color: 'var(--muted-foreground)',
              lineHeight: '1.6'
            }}>
              Jurisdicción: República de Chile
            </p>
          </header>

          {/* Contenido legal */}
          <div style={{ lineHeight: '1.8' }}>
            {/* INTRODUCCIÓN */}
            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-h3)',
                color: 'var(--foreground)',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                INTRODUCCIÓN
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                color: 'var(--foreground)',
                lineHeight: '1.8'
              }}>
                Bienvenido/a al portal inmobiliario Compra Tu Parcela, operado por Inmobiliaria Isla SPA. Nos comprometemos a proteger y respetar su privacidad conforme a la legislación chilena vigente, en especial la Ley N.° 19.628 sobre Protección de la Vida Privada y demás normativa aplicable. Le rogamos leer detenidamente esta Política antes de facilitar cualquier dato personal a través de nuestro portal.
              </p>
            </section>

            {/* 1. IDENTIFICACIÓN DEL RESPONSABLE DEL TRATAMIENTO */}
            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-h3)',
                color: 'var(--foreground)',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                1. IDENTIFICACIÓN DEL RESPONSABLE DEL TRATAMIENTO
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                color: 'var(--foreground)',
                lineHeight: '1.8',
                marginBottom: '1rem'
              }}>
                El responsable del tratamiento de sus datos personales es Inmobiliaria Isla SPA, sociedad legalmente constituida en la República de Chile, que opera el portal inmobiliario bajo la marca comercial Compra Tu Parcela.
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                color: 'var(--foreground)',
                lineHeight: '1.8',
                marginBottom: '0.75rem'
              }}>
                Puede contactarnos para cualquier consulta relacionada con el tratamiento de sus datos a través de los siguientes medios:
              </p>
              <ul style={{
                listStyleType: 'disc',
                paddingLeft: '2rem',
                marginBottom: '0'
              }}>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8',
                  marginBottom: '0.5rem'
                }}>
                  Correo electrónico: contacto@compratuparcela.cl
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8',
                  marginBottom: '0.5rem'
                }}>
                  Teléfono / WhatsApp: +569 777 14626
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8'
                }}>
                  Sitio web: www.compratuparcela.cl
                </li>
              </ul>
            </section>

            {/* 2. DATOS PERSONALES QUE RECOPILAMOS */}
            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-h3)',
                color: 'var(--foreground)',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                2. DATOS PERSONALES QUE RECOPILAMOS
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                color: 'var(--foreground)',
                lineHeight: '1.8',
                marginBottom: '1rem'
              }}>
                Dependiendo de la forma en que interactúe con nuestro portal, podemos recopilar las siguientes categorías de datos:
              </p>

              <h3 style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-body-base)',
                color: 'var(--foreground)',
                marginBottom: '0.75rem',
                marginTop: '1.5rem'
              }}>
                2.1 Datos facilitados directamente por el usuario
              </h3>
              <ul style={{
                listStyleType: 'disc',
                paddingLeft: '2rem',
                marginBottom: '1.5rem'
              }}>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8',
                  marginBottom: '0.5rem'
                }}>
                  Nombre y apellidos
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8',
                  marginBottom: '0.5rem'
                }}>
                  Dirección de correo electrónico
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8',
                  marginBottom: '0.5rem'
                }}>
                  Número de teléfono o celular
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8',
                  marginBottom: '0.5rem'
                }}>
                  Región, ciudad o comuna de interés
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8',
                  marginBottom: '0.5rem'
                }}>
                  Información sobre la propiedad de interés (superficie, precio, ubicación)
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8',
                  marginBottom: '0.5rem'
                }}>
                  Consultas, mensajes y comunicaciones remitidas a través de formularios de contacto o chat
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8'
                }}>
                  Preferencias de búsqueda y filtros aplicados en el portal
                </li>
              </ul>

              <h3 style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-body-base)',
                color: 'var(--foreground)',
                marginBottom: '0.75rem',
                marginTop: '1.5rem'
              }}>
                2.2 Datos recopilados automáticamente
              </h3>
              <ul style={{
                listStyleType: 'disc',
                paddingLeft: '2rem'
              }}>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8',
                  marginBottom: '0.5rem'
                }}>
                  Dirección IP y datos de geolocalización aproximada
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8',
                  marginBottom: '0.5rem'
                }}>
                  Tipo y versión del navegador y sistema operativo
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8',
                  marginBottom: '0.5rem'
                }}>
                  Páginas visitadas, tiempo de navegación y acciones realizadas dentro del portal
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8',
                  marginBottom: '0.5rem'
                }}>
                  Fuente de acceso al portal (buscadores, redes sociales, enlaces directos)
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8'
                }}>
                  Información de cookies y tecnologías similares (véase sección 8)
                </li>
              </ul>
            </section>

            {/* 3. FINALIDAD DEL TRATAMIENTO DE DATOS */}
            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-h3)',
                color: 'var(--foreground)',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                3. FINALIDAD DEL TRATAMIENTO DE DATOS
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                color: 'var(--foreground)',
                lineHeight: '1.8',
                marginBottom: '1rem'
              }}>
                Sus datos personales serán tratados exclusivamente para las siguientes finalidades:
              </p>
              <ol style={{
                paddingLeft: '2rem',
                marginBottom: '1rem'
              }}>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8',
                  marginBottom: '0.75rem'
                }}>
                  Gestionar y responder las consultas o solicitudes de información sobre parcelas y propiedades publicadas en el portal.
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8',
                  marginBottom: '0.75rem'
                }}>
                  Enviar información comercial sobre nuevas publicaciones, proyectos inmobiliarios, ofertas y noticias del sector, siempre que haya otorgado su consentimiento.
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8',
                  marginBottom: '0.75rem'
                }}>
                  Contactarle para agendar visitas a terrenos, reuniones con ejecutivos comerciales o asesoría personalizada.
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8',
                  marginBottom: '0.75rem'
                }}>
                  Mejorar la experiencia de navegación y personalizar los contenidos mostrados en el portal.
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8',
                  marginBottom: '0.75rem'
                }}>
                  Elaborar estadísticas internas de uso del sitio web y análisis del comportamiento de los usuarios de forma agregada y anonimizada.
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8',
                  marginBottom: '0.75rem'
                }}>
                  Cumplir con obligaciones legales y regulatorias que correspondan a Inmobiliaria Isla SPA.
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8'
                }}>
                  Gestionar la relación contractual en caso de que se formalice una operación de compraventa de parcelas.
                </li>
              </ol>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                color: 'var(--foreground)',
                lineHeight: '1.8'
              }}>
                Sus datos nunca serán utilizados para finalidades distintas a las expresamente indicadas en esta Política, ni serán objeto de decisiones automatizadas que produzcan efectos jurídicos sobre usted sin su consentimiento.
              </p>
            </section>

            {/* 4. BASE LEGAL PARA EL TRATAMIENTO */}
            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-h3)',
                color: 'var(--foreground)',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                4. BASE LEGAL PARA EL TRATAMIENTO
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                color: 'var(--foreground)',
                lineHeight: '1.8',
                marginBottom: '1rem'
              }}>
                El tratamiento de sus datos personales se sustenta en las siguientes bases legales conforme a la Ley N.° 19.628:
              </p>
              <ul style={{
                listStyleType: 'disc',
                paddingLeft: '2rem'
              }}>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8',
                  marginBottom: '0.75rem'
                }}>
                  <strong>Consentimiento del titular:</strong> cuando usted completa formularios, suscribe boletines informativos o solicita ser contactado, otorga su consentimiento expreso para el tratamiento de sus datos.
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8',
                  marginBottom: '0.75rem'
                }}>
                  <strong>Ejecución de una relación contractual:</strong> cuando se formaliza o tramita una operación inmobiliaria que requiere el tratamiento de sus datos.
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8',
                  marginBottom: '0.75rem'
                }}>
                  <strong>Cumplimiento de obligaciones legales:</strong> cuando la normativa chilena exige el tratamiento o conservación de determinados datos.
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8'
                }}>
                  <strong>Interés legítimo:</strong> para el envío de comunicaciones comerciales sobre propiedades similares a las consultadas previamente, siempre respetando su derecho a oponerse.
                </li>
              </ul>
            </section>

            {/* 5. ALMACENAMIENTO Y SEGURIDAD DE LOS DATOS */}
            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-h3)',
                color: 'var(--foreground)',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                5. ALMACENAMIENTO Y SEGURIDAD DE LOS DATOS
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                color: 'var(--foreground)',
                lineHeight: '1.8',
                marginBottom: '1rem'
              }}>
                Inmobiliaria Isla SPA implementa medidas técnicas y organizativas adecuadas para proteger sus datos personales frente a accesos no autorizados, pérdidas, alteraciones, divulgación o destrucción accidental o ilícita.
              </p>
              <ul style={{
                listStyleType: 'disc',
                paddingLeft: '2rem',
                marginBottom: '1rem'
              }}>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8',
                  marginBottom: '0.75rem'
                }}>
                  Los datos son almacenados en servidores con protocolos de seguridad SSL/TLS y cifrado en reposo.
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8',
                  marginBottom: '0.75rem'
                }}>
                  El acceso a la información personal está restringido al personal autorizado, bajo deber de confidencialidad.
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8',
                  marginBottom: '0.75rem'
                }}>
                  Realizamos revisiones periódicas de nuestras medidas de seguridad para adaptarlas a los estándares vigentes.
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8'
                }}>
                  En caso de una brecha de seguridad que afecte sus derechos, le notificaremos conforme a los plazos establecidos por la legislación aplicable.
                </li>
              </ul>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                color: 'var(--foreground)',
                lineHeight: '1.8'
              }}>
                <strong>Plazo de conservación:</strong> Sus datos serán conservados durante el tiempo estrictamente necesario para cumplir la finalidad para la que fueron recabados y, en todo caso, durante los plazos mínimos exigidos por la legislación vigente. Una vez cumplida la finalidad, los datos serán eliminados de forma segura o anonimizados.
              </p>
            </section>

            {/* 6. COMUNICACIÓN Y COMPARTICIÓN CON TERCEROS */}
            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-h3)',
                color: 'var(--foreground)',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                6. COMUNICACIÓN Y COMPARTICIÓN CON TERCEROS
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                color: 'var(--foreground)',
                lineHeight: '1.8',
                marginBottom: '1rem'
              }}>
                Como regla general, Inmobiliaria Isla SPA no cede ni vende sus datos personales a terceros. No obstante, podremos compartirlos en los siguientes supuestos:
              </p>
              <ul style={{
                listStyleType: 'disc',
                paddingLeft: '2rem',
                marginBottom: '1rem'
              }}>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8',
                  marginBottom: '0.75rem'
                }}>
                  <strong>Proveedores de servicios:</strong> empresas que prestan servicios de tecnología, hosting, CRM, análisis web o marketing digital, que actúan como encargados del tratamiento bajo nuestras instrucciones y con las debidas garantías de confidencialidad.
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8',
                  marginBottom: '0.75rem'
                }}>
                  <strong>Obligación legal:</strong> cuando una norma jurídica, resolución judicial o requerimiento de autoridad competente obligue a la divulgación de datos.
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8',
                  marginBottom: '0.75rem'
                }}>
                  <strong>Operaciones corporativas:</strong> en caso de fusión, adquisición o reestructuración societaria, sus datos podrán ser transferidos al nuevo responsable, quien quedará vinculado por esta Política.
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8'
                }}>
                  <strong>Consentimiento expreso del titular:</strong> cuando usted haya autorizado expresamente la comunicación a un tercero determinado.
                </li>
              </ul>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                color: 'var(--foreground)',
                lineHeight: '1.8'
              }}>
                Inmobiliaria Isla SPA no transfiere datos personales a países que no ofrezcan niveles de protección adecuados, salvo que se adopten las garantías contractuales oportunas.
              </p>
            </section>

            {/* 7. DERECHOS DEL TITULAR DE LOS DATOS */}
            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-h3)',
                color: 'var(--foreground)',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                7. DERECHOS DEL TITULAR DE LOS DATOS
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                color: 'var(--foreground)',
                lineHeight: '1.8',
                marginBottom: '1rem'
              }}>
                Conforme a la Ley N.° 19.628 y la normativa vigente en Chile, usted tiene los siguientes derechos respecto de sus datos personales:
              </p>
              <ul style={{
                listStyleType: 'disc',
                paddingLeft: '2rem',
                marginBottom: '1rem'
              }}>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8',
                  marginBottom: '0.75rem'
                }}>
                  <strong>Acceso:</strong> solicitar confirmación de si tratamos sus datos y obtener una copia de los mismos.
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8',
                  marginBottom: '0.75rem'
                }}>
                  <strong>Rectificación:</strong> solicitar la corrección de datos inexactos o incompletos.
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8',
                  marginBottom: '0.75rem'
                }}>
                  <strong>Cancelación / Supresión:</strong> solicitar la eliminación de sus datos cuando ya no sean necesarios para la finalidad para la que fueron recabados.
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8',
                  marginBottom: '0.75rem'
                }}>
                  <strong>Oposición:</strong> oponerse al tratamiento de sus datos para fines de marketing o comunicaciones comerciales.
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8'
                }}>
                  <strong>Bloqueo:</strong> solicitar la suspensión temporal del tratamiento en los casos previstos por la ley.
                </li>
              </ul>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                color: 'var(--foreground)',
                lineHeight: '1.8',
                marginBottom: '1rem'
              }}>
                Para ejercer cualquiera de estos derechos, puede dirigirse a nosotros mediante:
              </p>
              <ul style={{
                listStyleType: 'disc',
                paddingLeft: '2rem',
                marginBottom: '1rem'
              }}>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8',
                  marginBottom: '0.75rem'
                }}>
                  Correo electrónico: contacto@compratuparcela.cl, indicando en el asunto "Ejercicio de derechos ARCO" y adjuntando documento que acredite su identidad.
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8'
                }}>
                  Teléfono: +569 777 14626
                </li>
              </ul>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                color: 'var(--foreground)',
                lineHeight: '1.8'
              }}>
                Atenderemos su solicitud en el plazo máximo de 15 días hábiles desde su recepción. En caso de que no quede satisfecho/a con nuestra respuesta, puede presentar una reclamación ante los organismos competentes de protección de datos en Chile.
              </p>
            </section>

            {/* 8. COOKIES Y TECNOLOGÍAS DE SEGUIMIENTO */}
            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-h3)',
                color: 'var(--foreground)',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                8. COOKIES Y TECNOLOGÍAS DE SEGUIMIENTO
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                color: 'var(--foreground)',
                lineHeight: '1.8',
                marginBottom: '1rem'
              }}>
                Nuestro portal utiliza cookies propias y de terceros para mejorar su experiencia de navegación, analizar el tráfico y personalizar los contenidos mostrados.
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                color: 'var(--foreground)',
                lineHeight: '1.8',
                marginBottom: '0.75rem'
              }}>
                Tipos de cookies utilizadas:
              </p>
              <ul style={{
                listStyleType: 'disc',
                paddingLeft: '2rem',
                marginBottom: '1rem'
              }}>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8',
                  marginBottom: '0.75rem'
                }}>
                  <strong>Cookies técnicas o necesarias:</strong> imprescindibles para el correcto funcionamiento del portal.
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8',
                  marginBottom: '0.75rem'
                }}>
                  <strong>Cookies analíticas:</strong> permiten medir y analizar el uso del sitio (por ejemplo, Google Analytics).
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8',
                  marginBottom: '0.75rem'
                }}>
                  <strong>Cookies de personalización:</strong> recuerdan sus preferencias de búsqueda y filtros aplicados.
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8'
                }}>
                  <strong>Cookies de marketing:</strong> utilizadas para mostrarle anuncios relevantes sobre propiedades en otras plataformas.
                </li>
              </ul>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                color: 'var(--foreground)',
                lineHeight: '1.8',
                marginBottom: '1rem'
              }}>
                Al acceder al portal por primera vez, se le presentará un aviso de cookies donde podrá aceptar, rechazar o configurar las cookies no esenciales. Puede modificar sus preferencias en cualquier momento desde la configuración de su navegador o desde el panel de gestión de cookies del sitio.
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                color: 'var(--foreground)',
                lineHeight: '1.8'
              }}>
                Para más información sobre las cookies que utilizamos y cómo gestionarlas, puede consultarnos en contacto@compratuparcela.cl.
              </p>
            </section>

            {/* 9. MENORES DE EDAD */}
            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-h3)',
                color: 'var(--foreground)',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                9. MENORES DE EDAD
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                color: 'var(--foreground)',
                lineHeight: '1.8'
              }}>
                El portal Compra Tu Parcela está dirigido exclusivamente a personas mayores de 18 años. No recopilamos de forma consciente datos personales de menores de edad. Si usted tiene conocimiento de que un menor nos ha facilitado datos sin consentimiento de sus padres o tutores legales, le rogamos que nos lo comunique de inmediato a través de contacto@compratuparcela.cl, y procederemos a eliminarlos.
              </p>
            </section>

            {/* 10. MODIFICACIONES A LA POLÍTICA DE PRIVACIDAD */}
            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-h3)',
                color: 'var(--foreground)',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                10. MODIFICACIONES A LA POLÍTICA DE PRIVACIDAD
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                color: 'var(--foreground)',
                lineHeight: '1.8',
                marginBottom: '1rem'
              }}>
                Inmobiliaria Isla SPA se reserva el derecho de actualizar o modificar esta Política de Privacidad en cualquier momento para adaptarla a cambios legislativos, jurisprudenciales o de negocio. Las modificaciones entrarán en vigor desde su publicación en el portal.
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                color: 'var(--foreground)',
                lineHeight: '1.8',
                marginBottom: '1rem'
              }}>
                Le recomendamos revisar periódicamente esta página para estar informado/a de cualquier cambio. En caso de modificaciones sustanciales que afecten sus derechos, le notificaremos mediante aviso destacado en el portal o por correo electrónico si disponemos de su dirección.
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                color: 'var(--foreground)',
                lineHeight: '1.8'
              }}>
                La versión vigente de esta Política es la que se encuentra publicada en el portal en cada momento. La fecha de la última actualización figura al inicio del documento.
              </p>
            </section>

            {/* CONTACTO */}
            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-h3)',
                color: 'var(--foreground)',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                CONTACTO
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                color: 'var(--foreground)',
                lineHeight: '1.8',
                marginBottom: '1rem'
              }}>
                Para cualquier consulta relacionada con esta Política de Privacidad o con el tratamiento de sus datos personales, puede contactarnos:
              </p>
              <ul style={{
                listStyleType: 'disc',
                paddingLeft: '2rem'
              }}>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8',
                  marginBottom: '0.75rem'
                }}>
                  Correo electrónico: contacto@compratuparcela.cl
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8',
                  marginBottom: '0.75rem'
                }}>
                  Teléfono / WhatsApp: +569 777 14626
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8'
                }}>
                  Horario de atención: Lunes a Viernes, 9:00 – 18:00 hrs
                </li>
              </ul>
            </section>

            {/* Footer Legal */}
            <section style={{
              borderTop: '1px solid var(--border)',
              paddingTop: '2rem',
              textAlign: 'center'
            }}>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                color: 'var(--muted-foreground)',
                lineHeight: '1.6',
                marginBottom: '0.5rem'
              }}>
                © 2025 Inmobiliaria Isla SPA · Compra Tu Parcela · Todos los derechos reservados · Chile
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-sm)',
                color: 'var(--muted-foreground)',
                lineHeight: '1.6'
              }}>
                Política regida por la Ley N.° 19.628 sobre Protección de la Vida Privada, República de Chile
              </p>
            </section>
          </div>
        </article>
      </main>

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
                <div className="cursor-pointer hover:text-[#006B4E] transition-colors">Parcelas</div>
                <div className="cursor-pointer hover:text-[#006B4E] transition-colors">Inmobiliarias</div>
                <div className="cursor-pointer hover:text-[#006B4E] transition-colors">Blog</div>
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
                <div className="cursor-pointer hover:text-[#006B4E] transition-colors">Cómo funciona</div>
                <div className="cursor-pointer hover:text-[#006B4E] transition-colors">Publicar propiedad</div>
                <div className="cursor-pointer hover:text-[#006B4E] transition-colors">Planes para inmobiliarias</div>
                <div className="cursor-pointer hover:text-[#006B4E] transition-colors">Para brokers</div>
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
                <div className="cursor-pointer hover:text-[#006B4E] transition-colors">Centro de ayuda</div>
                <div className="cursor-pointer hover:text-[#006B4E] transition-colors">Términos y condiciones</div>
                <div className="cursor-pointer hover:text-[#006B4E] transition-colors">Política de privacidad</div>
                <div className="cursor-pointer hover:text-[#006B4E] transition-colors">Contacto</div>
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
    </div>
  );
}
