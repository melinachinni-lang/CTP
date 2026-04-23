import React, { useEffect } from 'react';
import { Navbar } from '@/app/components/Navbar';
import logo from 'figma:asset/a4719ce43ce52ee49df30a2a5c090c8a8b743667.png';

interface TerminosCondicionesProps {
  onNavigateHome: () => void;
}

export function TerminosCondiciones({ onNavigateHome }: TerminosCondicionesProps) {
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
              Términos y Condiciones
            </h1>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body-base)',
              color: 'var(--foreground)',
              lineHeight: '1.6'
            }}>
              Inmobiliaria Isla SpA – "Compra Tu Parcela"
            </p>
          </header>

          {/* Contenido legal */}
          <div style={{ lineHeight: '1.8' }}>
            {/* TÍTULO PRINCIPAL */}
            <section style={{ marginBottom: '3rem', textAlign: 'center' }}>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-h2)',
                color: 'var(--foreground)',
                marginBottom: '0.5rem',
                lineHeight: '1.3'
              }}>
                TÉRMINOS Y CONDICIONES DE USO DEL SERVICIO DE PUBLICACIÓN DE PARCELAS
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                color: 'var(--foreground)',
                lineHeight: '1.6'
              }}>
                Inmobiliaria Isla SpA – "Compra Tu Parcela"
              </p>
            </section>

            {/* 1. OBJETO DEL SERVICIO */}
            <section style={{ marginBottom: '3rem' }}>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-h3)',
                color: 'var(--foreground)',
                marginBottom: '1rem'
              }}>
                1. Objeto del Servicio
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                color: 'var(--foreground)',
                lineHeight: '1.8',
                marginBottom: '1rem'
              }}>
                El presente documento establece los términos y condiciones aplicables al uso del servicio de publicación de parcelas a través de la plataforma digital www.compratuparcela.cl (en adelante, la "Plataforma"), operada por Inmobiliaria Isla SpA, bajo el nombre de fantasía "Compra Tu Parcela" (en adelante, "CTP").
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                color: 'var(--foreground)',
                lineHeight: '1.8'
              }}>
                La Plataforma permite a clientes que han adquirido parcelas a través de CTP publicarlas con el objeto de facilitar su visibilidad ante potenciales compradores, actuando exclusivamente como vitrina publicitaria, sin intervenir en el proceso de venta.
              </p>
            </section>

            {/* 2. REQUISITOS PARA PUBLICACIÓN */}
            <section style={{ marginBottom: '3rem' }}>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-h3)',
                color: 'var(--foreground)',
                marginBottom: '1rem'
              }}>
                2. Requisitos para Publicación
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                color: 'var(--foreground)',
                lineHeight: '1.8',
                marginBottom: '1rem'
              }}>
                Podrán utilizar este servicio personas naturales o jurídicas que:
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
                  Sean propietarios legales del inmueble que se desea publicar, o cuenten con poder suficiente para disponer del mismo.
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8'
                }}>
                  Presenten la documentación exigida, entre la cual se incluye: certificado de dominio vigente, planos visados por el SAG, certificado de ruralidad y fotografías recientes del predio.
                </li>
              </ul>
            </section>

            {/* 3. PLANES Y TARIFAS DE PUBLICACIÓN */}
            <section style={{ marginBottom: '3rem' }}>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-h3)',
                color: 'var(--foreground)',
                marginBottom: '1rem'
              }}>
                3. Planes y Tarifas de Publicación
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                color: 'var(--foreground)',
                lineHeight: '1.8'
              }}>
                El portal cuenta con diversas opciones de planes según el tipo de usuarios, el detalle de precios y características se encuentra en la sección de planes correspondiente. El pago es anticipado y habilita el derecho al uso de todas las características del plan adquirido durante el período indicado. CTP emitirá factura/boleta electrónica de acuerdo con los datos entregados por el cliente.
              </p>
            </section>

            {/* 4. PROCESO DE EVALUACIÓN */}
            <section style={{ marginBottom: '3rem' }}>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-h3)',
                color: 'var(--foreground)',
                marginBottom: '1rem'
              }}>
                4. Proceso de Evaluación
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                color: 'var(--foreground)',
                lineHeight: '1.8'
              }}>
                Una vez recibido el pago y los antecedentes, CTP evaluará la admisibilidad de la publicación dentro de cinco (5) días hábiles. CTP se reserva el derecho a rechazar publicaciones que no cumplan con requisitos técnicos, jurídicos o comerciales mínimos. En tal caso, se reembolsará íntegramente el monto pagado.
              </p>
            </section>

            {/* 5. RESPONSABILIDADES DEL CLIENTE */}
            <section style={{ marginBottom: '3rem' }}>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-h3)',
                color: 'var(--foreground)',
                marginBottom: '1rem'
              }}>
                5. Responsabilidades del Cliente
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                color: 'var(--foreground)',
                lineHeight: '1.8',
                marginBottom: '1rem'
              }}>
                El cliente declara que:
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
                  La información entregada es fidedigna y actualizada.
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8',
                  marginBottom: '0.75rem'
                }}>
                  Se abstendrá de publicar inmuebles que no cumplan la normativa legal vigente.
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8'
                }}>
                  Es responsable de responder a los contactos de posibles interesados y de todas las gestiones asociadas a la venta del inmueble.
                </li>
              </ul>
            </section>

            {/* 6. RESPONSABILIDADES DE COMPRA TU PARCELA */}
            <section style={{ marginBottom: '3rem' }}>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-h3)',
                color: 'var(--foreground)',
                marginBottom: '1rem'
              }}>
                6. Responsabilidades de Compra Tu Parcela
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                color: 'var(--foreground)',
                lineHeight: '1.8',
                marginBottom: '1rem'
              }}>
                CTP actúa únicamente como intermediario publicitario, y no se hace responsable por:
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
                  El éxito o fracaso de la venta.
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8',
                  marginBottom: '0.75rem'
                }}>
                  Negociaciones entre las partes.
                </li>
                <li style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-body-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.8'
                }}>
                  Irregularidades legales, urbanísticas o registrales de los inmuebles.
                </li>
              </ul>
            </section>

            {/* 7. FINALIZACIÓN DEL SERVICIO */}
            <section style={{ marginBottom: '3rem' }}>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-h3)',
                color: 'var(--foreground)',
                marginBottom: '1rem'
              }}>
                7. Finalización del Servicio
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                color: 'var(--foreground)',
                lineHeight: '1.8'
              }}>
                El servicio de publicación tiene una duración fija de acuerdo a lo indicado en el plan contratado. Al término del período, la publicación será retirada, salvo contratación de una nueva vigencia. No se contemplan reembolsos parciales por retiro anticipado.
              </p>
            </section>

            {/* 8. USO RESPONSABLE Y CONFIDENCIALIDAD */}
            <section style={{ marginBottom: '3rem' }}>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-h3)',
                color: 'var(--foreground)',
                marginBottom: '1rem'
              }}>
                8. Uso Responsable y Confidencialidad
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                color: 'var(--foreground)',
                lineHeight: '1.8'
              }}>
                El cliente es responsable de la veracidad de sus datos y del uso adecuado de su cuenta. Toda cuenta es personal e intransferible.
              </p>
            </section>

            {/* 9. PROTECCIÓN DE DATOS */}
            <section style={{ marginBottom: '3rem' }}>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-h3)',
                color: 'var(--foreground)',
                marginBottom: '1rem'
              }}>
                9. Protección de Datos
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                color: 'var(--foreground)',
                lineHeight: '1.8'
              }}>
                Los datos personales entregados por los clientes serán tratados conforme a la legislación vigente y utilizada exclusivamente para los fines del servicio contratado.
              </p>
            </section>

            {/* 10. EXENCIÓN DE RESPONSABILIDAD LEGAL */}
            <section style={{ marginBottom: '3rem' }}>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-h3)',
                color: 'var(--foreground)',
                marginBottom: '1rem'
              }}>
                10. Exención de Responsabilidad Legal
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                color: 'var(--foreground)',
                lineHeight: '1.8'
              }}>
                CTP queda exenta de toda responsabilidad civil, comercial, administrativa o penal que pudiera derivarse de la publicación o transacción de la propiedad, así como de la interacción entre el cliente y potenciales compradores. Cualquier disputa legal o extrajudicial deberá ser resuelta directamente entre las partes intervinientes en la compraventa.
              </p>
            </section>

            {/* 11. VERIFICACIÓN DE REGULARIDAD DEL PREDIO */}
            <section style={{ marginBottom: '3rem' }}>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-h3)',
                color: 'var(--foreground)',
                marginBottom: '1rem'
              }}>
                11. Verificación de Regularidad del Predio
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                color: 'var(--foreground)',
                lineHeight: '1.8'
              }}>
                La empresa no garantiza ni se hace responsable por la regularidad urbanística, subdivisión, factibilidad de construcción, uso de suelo, existencia de servicios básicos o cumplimiento normativo del inmueble. Corresponde exclusivamente al cliente informar y gestionar dichas condiciones ante eventuales interesados.
              </p>
            </section>

            {/* 12. ACEPTACIÓN */}
            <section style={{ marginBottom: '3rem' }}>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-h3)',
                color: 'var(--foreground)',
                marginBottom: '1rem'
              }}>
                12. Aceptación
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-body-base)',
                color: 'var(--foreground)',
                lineHeight: '1.8'
              }}>
                La contratación del servicio implica la aceptación total e irrestricta de estos Términos y Condiciones.
              </p>
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
                lineHeight: '1.6'
              }}>
                © 2026 Inmobiliaria Isla SpA · Compra Tu Parcela · Todos los derechos reservados · Chile
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
                <div className="cursor-pointer hover:text-[#124854] transition-colors">Términos y condiciones</div>
                <div className="cursor-pointer hover:text-[#124854] transition-colors">Política de privacidad</div>
                <div className="cursor-pointer hover:text-[#124854] transition-colors">Contacto</div>
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
