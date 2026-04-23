import React from 'react';
import { Expand, Pickaxe, DoorOpen, FileCheck, FileText, Zap, Droplet, Fence, DoorClosed, CheckCircle, Compass, Mountain, Home, TreePine, Users, TrendingUp, Shield } from 'lucide-react';

export interface Parcela {
  id: number;
  nombre: string;
  ubicacion: string;
  ubicacionCompleta: string;
  precio: string;
  precioNumero: number;
  superficie: string;
  superficieNumero: number;
  lat: number;
  lng: number;
  descripcion: string;
  imagenes: string[];
  caracteristicasTerreno: Array<{ label: string; valor: string; icon: React.ReactNode }>;
  caracteristicasServicios: Array<{ label: string; valor: string; icon: React.ReactNode }>;
  caracteristicasLegal: Array<{ label: string; valor: string; icon: React.ReactNode }>;
  destacados: Array<{ icon: React.ReactNode; text: string }>;
  inmobiliaria: {
    nombre: string;
    tipoVendedor: string;
    descripcion: string;
    logo: string;
    telefono: string;
    email: string;
  };
  plano: string;
  documentos: Array<{ nombre: string; tipo: string; disponible: boolean }>;
  plusvalia?: Array<{ año: number; valor: number }>;
  historialPropiedad: 'Primer dueño' | 'Segundo dueño' | 'Tercer dueño' | 'Cuarto dueño';
}

export const PARCELAS_DATA: Parcela[] = [
  {
    id: 1,
    nombre: 'Parcela Vista al Lago',
    ubicacion: 'Chile Chico, Aysén',
    ubicacionCompleta: 'Camino al Lago, Km 12, Chile Chico, Región de Aysén',
    precio: '$45.000.000',
    precioNumero: 45000000,
    superficie: '5.000 m²',
    superficieNumero: 5000,
    lat: -46.5417,
    lng: -71.7222,
    descripcion: 'Esta hermosa parcela de 5.000 m² te ofrece una vista panorámica privilegiada al lago General Carrera, uno de los paisajes más emblemáticos de la Patagonia chilena. Ubicada estratégicamente en Chile Chico, a solo 12 km del centro urbano, esta propiedad se encuentra en una zona de alto potencial tanto turístico como residencial, perfecta para quienes buscan calidad de vida o emprender un proyecto innovador.\n\nEl terreno presenta una topografía con pendiente suave (5-10%) que permite diseños arquitectónicos aprovechando al máximo las vistas, con orientación norte ideal para captar luz natural durante todo el día. El suelo tipo agrícola ofrece múltiples posibilidades de uso: desde un proyecto residencial familiar hasta emprendimientos turísticos como cabañas, glamping o lodge boutique.\n\nLa propiedad cuenta con acceso directo desde camino público pavimentado, lo que garantiza conectividad durante todo el año. Ya tiene factibilidad de agua aprobada y electricidad disponible a solo 200 metros del límite. Además, cuenta con cerco perimetral ejecutado y portón de acceso vehicular, brindando seguridad desde el primer día.\n\nEn términos legales, todos los permisos están al día: rol de avalúo aprobado, escritura lista para firmar y documentación completa verificada. Puedes avanzar con tu proyecto sin preocupaciones burocráticas. Esta es una oportunidad concreta para quienes buscan invertir en una zona con proyección de valorización sostenida, rodeada de naturaleza patagónica y con todos los servicios básicos resueltos.',
    imagenes: [
      'https://images.unsplash.com/photo-1640958903934-b116ab32c95b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwdmlldyUyMGxhbmR8ZW58MXx8fHwxNzY5MTA4Njk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1721592178758-b90205b29214?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXJhbCUyMGxhbmQlMjBhZXJpYWwlMjB2aWV3fGVufDF8fHx8MTc2OTExMTE3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1760811231126-be5c3587db10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHRlcnJhaW4lMjBjaGlsZXxlbnwxfHx8fDE3NjkxMDg2OTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1678483874487-a4d6f8ceffe9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjB2YWxsZXklMjBsYW5kfGVufDF8fHx8MTc2OTEwODY5OHww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    caracteristicasTerreno: [
      { label: 'Superficie total', valor: '5.000 m²', icon: <Expand className="w-6 h-6" /> },
      { label: 'Tipo de suelo', valor: 'Agrícola', icon: <Pickaxe className="w-6 h-6" /> },
      { label: 'Orientación', valor: 'Norte', icon: <Compass className="w-6 h-6" /> },
      { label: 'Pendiente', valor: 'Suave (5-10%)', icon: <Mountain className="w-6 h-6" /> },
      { label: 'Uso permitido', valor: 'Residencial, turístico, agrícola', icon: <Home className="w-6 h-6" /> },
    ],
    caracteristicasServicios: [
      { label: 'Agua', valor: 'Factibilidad aprobada', icon: <Droplet className="w-6 h-6" /> },
      { label: 'Electricidad', valor: 'A 200 metros', icon: <Zap className="w-6 h-6" /> },
      { label: 'Acceso', valor: 'Camino público pavimentado', icon: <DoorOpen className="w-6 h-6" /> },
      { label: 'Cerco', valor: 'Perimetral ejecutado', icon: <Fence className="w-6 h-6" /> },
      { label: 'Portón', valor: 'Acceso vehicular', icon: <DoorClosed className="w-6 h-6" /> },
    ],
    caracteristicasLegal: [
      { label: 'Rol de avalúo', valor: 'Aprobado y al día', icon: <FileCheck className="w-6 h-6" /> },
      { label: 'Estado legal', valor: 'Escritura lista', icon: <FileText className="w-6 h-6" /> },
      { label: 'Documentación', valor: 'Completa y verificada', icon: <CheckCircle className="w-6 h-6" /> },
    ],
    destacados: [
      { icon: <Expand className="w-5 h-5" />, text: '5.000 m²' },
      { icon: <DoorOpen className="w-5 h-5" />, text: 'Portón acceso' },
      { icon: <FileCheck className="w-5 h-5" />, text: 'Rol aprobado' },
      { icon: <Pickaxe className="w-5 h-5" />, text: 'Factibilidad agua' }
    ],
    inmobiliaria: {
      nombre: 'Inmobiliaria Austral',
      tipoVendedor: 'Inmobiliaria',
      descripcion: 'Especialistas en propiedades en la Patagonia con más de 15 años de experiencia',
      logo: 'https://images.unsplash.com/photo-1763479169474-728a7de108c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzY5MDYwNzI2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      telefono: '+56 9 1234 5678',
      email: 'contacto@inmobiliariaustral.cl'
    },
    plano: 'https://images.unsplash.com/photo-1762146828422-50a8bd416d3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9wZXJ0eSUyMGJsdWVwcmludCUyMHBsYW58ZW58MXx8fHwxNzY5MTExMTczfDA&ixlib=rb-4.1.0&q=80&w=1080',
    documentos: [
      { nombre: 'Brochure', tipo: 'PDF', disponible: true },
      { nombre: 'Plano del terreno', tipo: 'PDF', disponible: true },
      { nombre: 'Certificado de avalúo', tipo: 'PDF', disponible: true },
      { nombre: 'Factibilidad de servicios', tipo: 'PDF', disponible: true },
      { nombre: 'Informe de suelo', tipo: 'PDF', disponible: true },
    ],
    plusvalia: [
      { año: 2021, valor: 38000000 },
      { año: 2022, valor: 40500000 },
      { año: 2023, valor: 42800000 },
      { año: 2024, valor: 45000000 }
    ],
    historialPropiedad: 'Primer dueño'
  },
  {
    id: 2,
    nombre: 'Terreno Cordillera',
    ubicacion: 'Cochrane, Aysén',
    ubicacionCompleta: 'Ruta X-83, Km 8, Cochrane, Región de Aysén',
    precio: '$68.500.000',
    precioNumero: 68500000,
    superficie: '10.000 m²',
    superficieNumero: 10000,
    lat: -47.2534,
    lng: -72.5730,
    descripcion: 'Te presentamos este impresionante terreno de 10.000 m² (1 hectárea) con vista directa e inigualable a la cordillera de los Andes, ubicado en Cochrane, una de las comunas más auténticas y menos exploradas de la Región de Aysén. Este predio representa una oportunidad única para quienes buscan desarrollar un proyecto turístico de alto estándar o crear una residencia exclusiva en plena naturaleza patagónica.\n\nLa topografía ondulada del terreno, con pendiente moderada del 10-20%, no solo otorga carácter al paisaje sino que permite diseños arquitectónicos creativos que aprovechan las vistas panorámicas desde múltiples niveles. La orientación sur-oeste captura los atardeceres más espectaculares de la región, creando una experiencia visual diaria que pocos terrenos pueden ofrecer.\n\nEl predio cuenta con pozo de agua autorizado y electricidad instalada en el límite de la propiedad, lo que facilita significativamente el inicio de cualquier construcción. El acceso se realiza por camino ripiado en buenas condiciones, transitable todo el año. El suelo mixto es ideal tanto para construcciones como para proyectos que combinen edificación con áreas de paisajismo o huertos.\n\nActualmente, el estado legal se encuentra en proceso de regularización, con rol de avalúo vigente. Esta situación representa una oportunidad de inversión inteligente, ya que el precio considera este factor temporal que pronto será resuelto. La zona presenta gran potencial de valorización gracias al creciente interés turístico en Cochrane como destino de naturaleza prístina y aventura. Si buscas un terreno con vistas excepcionales y proyección futura, esta es tu oportunidad.',
    imagenes: [
      'https://images.unsplash.com/photo-1760811231126-be5c3587db10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHRlcnJhaW4lMjBjaGlsZXxlbnwxfHx8fDE3NjkxMDg2OTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHBhdGFnb25pYXxlbnwxfHx8fDE3NjkxMDg2OTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NjkxMDg2OTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHZhbGxleXxlbnwxfHx8fDE3NjkxMDg2OTd8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    caracteristicasTerreno: [
      { label: 'Superficie total', valor: '10.000 m²', icon: <Expand className="w-6 h-6" /> },
      { label: 'Tipo de suelo', valor: 'Mixto', icon: <Pickaxe className="w-6 h-6" /> },
      { label: 'Orientación', valor: 'Sur-Oeste', icon: <Compass className="w-6 h-6" /> },
      { label: 'Pendiente', valor: 'Moderada (10-20%)', icon: <Mountain className="w-6 h-6" /> },
      { label: 'Uso permitido', valor: 'Residencial, turístico', icon: <Home className="w-6 h-6" /> },
    ],
    caracteristicasServicios: [
      { label: 'Agua', valor: 'Pozo autorizado', icon: <Droplet className="w-6 h-6" /> },
      { label: 'Electricidad', valor: 'Instalada en límite', icon: <Zap className="w-6 h-6" /> },
      { label: 'Acceso', valor: 'Camino ripiado', icon: <DoorOpen className="w-6 h-6" /> },
      { label: 'Cerco', valor: 'No disponible', icon: <Fence className="w-6 h-6" /> },
      { label: 'Portón', valor: 'No disponible', icon: <DoorClosed className="w-6 h-6" /> },
    ],
    caracteristicasLegal: [
      { label: 'Rol de avalúo', valor: 'Vigente', icon: <FileCheck className="w-6 h-6" /> },
      { label: 'Estado legal', valor: 'En proceso de regularización', icon: <FileText className="w-6 h-6" /> },
      { label: 'Documentación', valor: 'Parcial', icon: <CheckCircle className="w-6 h-6" /> },
    ],
    destacados: [
      { icon: <Expand className="w-5 h-5" />, text: '10.000 m²' },
      { icon: <Mountain className="w-5 h-5" />, text: 'Vista cordillera' },
      { icon: <Zap className="w-5 h-5" />, text: 'Luz instalada' },
      { icon: <Droplet className="w-5 h-5" />, text: 'Pozo propio' }
    ],
    inmobiliaria: {
      nombre: 'Propiedades del Sur',
      tipoVendedor: 'Inmobiliaria',
      descripcion: 'Conectamos personas con la naturaleza a través de propiedades únicas en el sur de Chile',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwbG9nb3xlbnwxfHx8fDE3NjkwNjA3MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      telefono: '+56 9 8765 4321',
      email: 'ventas@propiedadesdelsur.cl'
    },
    plano: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlcHJpbnQlMjBtYXB8ZW58MXx8fHwxNzY5MTExMTczfDA&ixlib=rb-4.1.0&q=80&w=1080',
    documentos: [
      { nombre: 'Brochure', tipo: 'PDF', disponible: true },
      { nombre: 'Plano del terreno', tipo: 'PDF', disponible: true },
      { nombre: 'Certificado de avalúo', tipo: 'PDF', disponible: true },
      { nombre: 'Factibilidad de servicios', tipo: 'PDF', disponible: false },
      { nombre: 'Informe de suelo', tipo: 'PDF', disponible: false },
    ],
    plusvalia: [
      { año: 2021, valor: 55000000 },
      { año: 2022, valor: 60000000 },
      { año: 2023, valor: 64500000 },
      { año: 2024, valor: 68500000 }
    ],
    historialPropiedad: 'Segundo dueño'
  },
  {
    id: 3,
    nombre: 'Parcela Agrícola Valle',
    ubicacion: 'Coyhaique, Aysén',
    ubicacionCompleta: 'Camino a Villa Ortega, Km 5, Coyhaique, Región de Aysén',
    precio: '$95.000.000',
    precioNumero: 95000000,
    superficie: '2,5 ha',
    superficieNumero: 25000,
    lat: -45.5752,
    lng: -72.0662,
    descripcion: 'Esta excepcional parcela agrícola de 2,5 hectáreas representa una oportunidad única para quienes buscan un emprendimiento productivo consolidado en el fértil valle de Coyhaique. Ubicada a solo 5 km del centro de la capital regional, combina la cercanía a servicios urbanos con la tranquilidad y productividad del campo.\n\nEl terreno es completamente plano (pendiente 0-3%) con suelo agrícola premium, actualmente en plena producción de hortalizas con rendimientos comprobados año tras año. Esta no es una promesa: es un negocio funcionando que puedes continuar desde el día uno. La propiedad cuenta con infraestructura productiva completa: sistema de riego tecnificado por goteo, dos galpones de almacenamiento en excelente estado, invernaderos operativos y maquinaria agrícola básica incluida en la venta.\n\nLos servicios están completamente resueltos: electricidad trifásica conectada (ideal para maquinaria y posibles ampliaciones), riego tecnificado con derechos de agua, acceso por camino pavimentado y cerco perimetral con malla que protege toda la propiedad. Además, cuenta con dos accesos vehiculares que facilitan la operación logística.\n\nLa documentación está impecable: rol de avalúo al día, escritura pública y papeles completos. Esto significa que puedes concretar la compra rápidamente y comenzar a operar sin demoras. La orientación este aprovecha las primeras luces del día, fundamental para cultivos. Esta propiedad es perfecta tanto para un agricultor profesional que quiere expandirse como para un nuevo emprendedor que busca un proyecto agrícola llave en mano, o incluso para desarrollar un innovador proyecto de agroturismo que combine producción con experiencias para visitantes. El valle de Coyhaique ofrece un microclima especial y una demanda local creciente de productos frescos y de calidad.',
    imagenes: [
      'https://images.unsplash.com/photo-1678483874487-a4d6f8ceffe9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjB2YWxsZXklMjBsYW5kfGVufDF8fHx8MTc2OTEwODY5OHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwZmllbGQlMjBjaGlsZXxlbnwxfHx8fDE3NjkxMDg2OTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1574943320219-553eb213f72d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjBmaWVsZHxlbnwxfHx8fDE3NjkxMDg2OTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1560493676-04071c5f467b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwbGFuZHxlbnwxfHx8fDE3NjkxMDg2OTd8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    caracteristicasTerreno: [
      { label: 'Superficie total', valor: '2,5 ha', icon: <Expand className="w-6 h-6" /> },
      { label: 'Tipo de suelo', valor: 'Agrícola premium', icon: <Pickaxe className="w-6 h-6" /> },
      { label: 'Orientación', valor: 'Este', icon: <Compass className="w-6 h-6" /> },
      { label: 'Pendiente', valor: 'Plano (0-3%)', icon: <Mountain className="w-6 h-6" /> },
      { label: 'Uso permitido', valor: 'Agrícola, agroturismo', icon: <Home className="w-6 h-6" /> },
    ],
    caracteristicasServicios: [
      { label: 'Agua', valor: 'Riego tecnificado instalado', icon: <Droplet className="w-6 h-6" /> },
      { label: 'Electricidad', valor: 'Trifásica conectada', icon: <Zap className="w-6 h-6" /> },
      { label: 'Acceso', valor: 'Camino pavimentado', icon: <DoorOpen className="w-6 h-6" /> },
      { label: 'Cerco', valor: 'Perimetral con malla', icon: <Fence className="w-6 h-6" /> },
      { label: 'Portón', valor: 'Dos accesos vehiculares', icon: <DoorClosed className="w-6 h-6" /> },
    ],
    caracteristicasLegal: [
      { label: 'Rol de avalúo', valor: 'Al día', icon: <FileCheck className="w-6 h-6" /> },
      { label: 'Estado legal', valor: 'Escritura pública', icon: <FileText className="w-6 h-6" /> },
      { label: 'Documentación', valor: 'Completa', icon: <CheckCircle className="w-6 h-6" /> },
    ],
    destacados: [
      { icon: <Expand className="w-5 h-5" />, text: '2,5 ha' },
      { icon: <Droplet className="w-5 h-5" />, text: 'Riego tecnificado' },
      { icon: <Zap className="w-5 h-5" />, text: 'Luz trifásica' },
      { icon: <TreePine className="w-5 h-5" />, text: 'En producción' }
    ],
    inmobiliaria: {
      nombre: 'Carlos Muñoz',
      tipoVendedor: 'Vendedor particular',
      descripcion: 'Propietario directo - Sin intermediarios',
      logo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjkwNjA3MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      telefono: '+56 9 5555 1234',
      email: 'carlos.munoz@email.cl'
    },
    plano: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9wZXJ0eSUyMGxheW91dHxlbnwxfHx8fDE3NjkxMTExNzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    documentos: [
      { nombre: 'Brochure', tipo: 'PDF', disponible: true },
      { nombre: 'Plano del terreno', tipo: 'PDF', disponible: true },
      { nombre: 'Certificado de avalúo', tipo: 'PDF', disponible: true },
      { nombre: 'Factibilidad de servicios', tipo: 'PDF', disponible: true },
      { nombre: 'Informe de suelo', tipo: 'PDF', disponible: true },
      { nombre: 'Derechos de agua', tipo: 'PDF', disponible: true },
    ],
    plusvalia: [
      { año: 2021, valor: 78000000 },
      { año: 2022, valor: 84000000 },
      { año: 2023, valor: 89500000 },
      { año: 2024, valor: 95000000 }
    ],
    historialPropiedad: 'Primer dueño'
  },
  {
    id: 4,
    nombre: 'Terreno Montaña Vista',
    ubicacion: 'Puerto Río Tranquilo, Aysén',
    ubicacionCompleta: 'Ruta 7 Sur, Km 223, Puerto Río Tranquilo, Región de Aysén',
    precio: '$52.000.000',
    precioNumero: 52000000,
    superficie: '8.000 m²',
    superficieNumero: 8000,
    lat: -46.6333,
    lng: -72.6833,
    descripcion: 'Terreno privilegiado en uno de los destinos turísticos más cotizados de la Carretera Austral. Con vista al lago General Carrera y las Capillas de Mármol. Ubicación estratégica a pasos de Puerto Río Tranquilo, con alto flujo turístico durante todo el año. Ideal para proyecto hotelero boutique, cabañas turísticas o centro de actividades. Oportunidad única de inversión en zona consolidada.',
    imagenes: [
      'https://images.unsplash.com/photo-1758625825203-6d36416bc5d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHZpZXclMjB0ZXJyYWlufGVufDF8fHx8MTc2OTEwODY5OHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHBhdGFnb25pYXxlbnwxfHx8fDE3NjkxMDg2OTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1640958903934-b116ab32c95b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwdmlldyUyMGxhbmR8ZW58MXx8fHwxNzY5MTA4Njk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyaXN0JTIwbGFrZXxlbnwxfHx8fDE3NjkxMDg2OTd8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    caracteristicasTerreno: [
      { label: 'Superficie total', valor: '8.000 m²', icon: <Expand className="w-6 h-6" /> },
      { label: 'Tipo de suelo', valor: 'Apto construcción', icon: <Pickaxe className="w-6 h-6" /> },
      { label: 'Orientación', valor: 'Noroeste', icon: <Compass className="w-6 h-6" /> },
      { label: 'Pendiente', valor: 'Moderada con terrazas', icon: <Mountain className="w-6 h-6" /> },
      { label: 'Uso permitido', valor: 'Turístico, comercial', icon: <Home className="w-6 h-6" /> },
    ],
    caracteristicasServicios: [
      { label: 'Agua', valor: 'Red pública disponible', icon: <Droplet className="w-6 h-6" /> },
      { label: 'Electricidad', valor: 'Conexión en límite', icon: <Zap className="w-6 h-6" /> },
      { label: 'Acceso', valor: 'Ruta 7 pavimentada', icon: <DoorOpen className="w-6 h-6" /> },
      { label: 'Cerco', valor: 'Parcial lateral', icon: <Fence className="w-6 h-6" /> },
      { label: 'Portón', valor: 'A instalar', icon: <DoorClosed className="w-6 h-6" /> },
    ],
    caracteristicasLegal: [
      { label: 'Rol de avalúo', valor: 'Actualizado', icon: <FileCheck className="w-6 h-6" /> },
      { label: 'Estado legal', valor: 'Saneado', icon: <FileText className="w-6 h-6" /> },
      { label: 'Documentación', valor: 'Disponible para revisión', icon: <CheckCircle className="w-6 h-6" /> },
    ],
    destacados: [
      { icon: <Expand className="w-5 h-5" />, text: '8.000 m²' },
      { icon: <Users className="w-5 h-5" />, text: 'Zona turística' },
      { icon: <TrendingUp className="w-5 h-5" />, text: 'Alta valorización' },
      { icon: <DoorOpen className="w-5 h-5" />, text: 'Sobre Ruta 7' }
    ],
    inmobiliaria: {
      nombre: 'Patagonia Properties',
      tipoVendedor: 'Inmobiliaria',
      descripcion: 'Especialistas en propiedades y proyectos en la Patagonia',
      logo: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnR8ZW58MXx8fHwxNzY5NDA5ODkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      telefono: '+56 9 6666 7890',
      email: 'contacto@patagoniaproperties.cl'
    },
    plano: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmUlMjBwbGFufGVufDF8fHx8MTc2OTExMTE3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    documentos: [
      { nombre: 'Brochure', tipo: 'PDF', disponible: true },
      { nombre: 'Plano del terreno', tipo: 'PDF', disponible: true },
      { nombre: 'Certificado de avalúo', tipo: 'PDF', disponible: true },
      { nombre: 'Factibilidad de servicios', tipo: 'PDF', disponible: true },
      { nombre: 'Estudio de mercado', tipo: 'PDF', disponible: true },
    ],
    historialPropiedad: 'Tercer dueño'
  },
  // Parcelas adicionales para Inmobiliaria Austral
  {
    id: 13,
    nombre: 'Terreno Agrícola El Mirador',
    ubicacion: 'Chile Chico, Aysén',
    ubicacionCompleta: 'Sector El Mirador, Chile Chico, Región de Aysén',
    precio: '$38.000.000',
    precioNumero: 38000000,
    superficie: '8.000 m²',
    superficieNumero: 8000,
    lat: -46.5567,
    lng: -71.7322,
    descripcion: 'Amplio terreno agrícola ideal para cultivos y emprendimientos rurales. Cuenta con suelo fértil, acceso a agua de riego y ubicación estratégica cerca de la ciudad.',
    imagenes: [],
    caracteristicasTerreno: [
      { label: 'Superficie total', valor: '8.000 m²', icon: <Expand className="w-5 h-5" /> },
      { label: 'Tipo de suelo', valor: 'Agrícola', icon: <Pickaxe className="w-5 h-5" /> },
      { label: 'Topografía', valor: 'Plana', icon: <Compass className="w-5 h-5" /> },
      { label: 'Orientación', valor: 'Norte', icon: <Compass className="w-5 h-5" /> }
    ],
    caracteristicasServicios: [
      { label: 'Luz', valor: 'Disponible', icon: <Zap className="w-5 h-5" /> },
      { label: 'Agua', valor: 'Canal de riego', icon: <Droplet className="w-5 h-5" /> },
      { label: 'Acceso', valor: 'Camino público', icon: <DoorOpen className="w-5 h-5" /> },
      { label: 'Cerco', valor: 'Parcial', icon: <Fence className="w-5 h-5" /> }
    ],
    caracteristicasLegal: [
      { label: 'Rol', valor: 'Al día', icon: <FileCheck className="w-5 h-5" /> },
      { label: 'Estado', valor: 'Saneado', icon: <CheckCircle className="w-5 h-5" /> },
      { label: 'Escritura', valor: 'Lista', icon: <FileText className="w-5 h-5" /> }
    ],
    destacados: [
      { icon: <Expand className="w-5 h-5" />, text: '8.000 m²' },
      { icon: <Droplet className="w-5 h-5" />, text: 'Riego disponible' },
      { icon: <FileCheck className="w-5 h-5" />, text: 'Rol al día' }
    ],
    inmobiliaria: {
      nombre: 'Inmobiliaria Austral',
      tipoVendedor: 'Inmobiliaria',
      descripcion: 'Especialistas en propiedades en la Patagonia con más de 15 años de experiencia',
      logo: 'https://images.unsplash.com/photo-1763479169474-728a7de108c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzY5MDYwNzI2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      telefono: '+56 9 1234 5678',
      email: 'contacto@inmobiliariaustral.cl'
    },
    plano: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmUlMjBwbGFufGVufDF8fHx8MTc2OTExMTE3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    documentos: [
      { nombre: 'Brochure', tipo: 'PDF', disponible: true },
      { nombre: 'Plano del terreno', tipo: 'PDF', disponible: true },
      { nombre: 'Certificado de avalúo', tipo: 'PDF', disponible: true }
    ],
    historialPropiedad: 'Segundo dueño'
  },
  {
    id: 5,
    nombre: 'Parcela Residencial Los Arrayanes',
    ubicacion: 'Chile Chico, Aysén',
    ubicacionCompleta: 'Condominio Los Arrayanes, Chile Chico, Región de Aysén',
    precio: '$52.000.000',
    precioNumero: 52000000,
    superficie: '3.500 m²',
    superficieNumero: 3500,
    lat: -46.5400,
    lng: -71.7100,
    descripcion: 'Exclusiva parcela en condominio cerrado con vista privilegiada al lago. Todos los servicios disponibles y seguridad 24/7.',
    imagenes: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGxhbmQlMjBsYWtlfGVufDF8fHx8MTc2OTQ2MTM2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kJTIwd2l0aCUyMHRyZWVzfGVufDF8fHx8MTc2OTQ2MTM3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzY5NDYxMzg3fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    caracteristicasTerreno: [
      { label: 'Superficie total', valor: '3.500 m²', icon: <Expand className="w-5 h-5" /> },
      { label: 'Tipo de suelo', valor: 'Residencial', icon: <Home className="w-5 h-5" /> },
      { label: 'Vista', valor: 'Lago', icon: <Mountain className="w-5 h-5" /> },
      { label: 'Condominio', valor: 'Cerrado', icon: <Fence className="w-5 h-5" /> }
    ],
    caracteristicasServicios: [
      { label: 'Luz', valor: 'Instalada', icon: <Zap className="w-5 h-5" /> },
      { label: 'Agua', valor: 'Red pública', icon: <Droplet className="w-5 h-5" /> },
      { label: 'Seguridad', valor: '24/7', icon: <Shield className="w-5 h-5" /> },
      { label: 'Portón', valor: 'Eléctrico', icon: <DoorClosed className="w-5 h-5" /> }
    ],
    caracteristicasLegal: [
      { label: 'Rol', valor: 'Al día', icon: <FileCheck className="w-5 h-5" /> },
      { label: 'Estado', valor: 'Saneado', icon: <CheckCircle className="w-5 h-5" /> },
      { label: 'Permiso', valor: 'Construcción', icon: <FileText className="w-5 h-5" /> }
    ],
    destacados: [
      { icon: <Mountain className="w-5 h-5" />, text: 'Vista al lago' },
      { icon: <Shield className="w-5 h-5" />, text: 'Condominio cerrado' },
      { icon: <Zap className="w-5 h-5" />, text: 'Todos los servicios' }
    ],
    inmobiliaria: {
      nombre: 'Inmobiliaria Austral',
      tipoVendedor: 'Inmobiliaria',
      descripcion: 'Especialistas en propiedades en la Patagonia con más de 15 años de experiencia',
      logo: 'https://images.unsplash.com/photo-1763479169474-728a7de108c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzY5MDYwNzI2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      telefono: '+56 9 1234 5678',
      email: 'contacto@inmobiliariaustral.cl'
    },
    plano: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmUlMjBwbGFufGVufDF8fHx8MTc2OTExMTE3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    documentos: [
      { nombre: 'Brochure', tipo: 'PDF', disponible: true },
      { nombre: 'Plano del terreno', tipo: 'PDF', disponible: true },
      { nombre: 'Reglamento condominio', tipo: 'PDF', disponible: true }
    ],
    historialPropiedad: 'Primer dueño'
  },
  {
    id: 6,
    nombre: 'Campo Turístico Valle Verde',
    ubicacion: 'Chile Chico, Aysén',
    ubicacionCompleta: 'Valle Verde, km 18, Chile Chico, Región de Aysén',
    precio: '$95.000.000',
    precioNumero: 95000000,
    superficie: '25.000 m²',
    superficieNumero: 25000,
    lat: -46.5650,
    lng: -71.7450,
    descripcion: 'Extenso campo con alto potencial turístico, ubicado en un valle rodeado de montañas. Ideal para desarrollar cabañas, camping o lodge.',
    imagenes: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHZhbGxleSUyMGxhbmR8ZW58MXx8fHwxNzY5NDYxNDI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzY5NDYxNDM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1426604966848-d7adac402bff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzY5NDYxNDQ3fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    caracteristicasTerreno: [
      { label: 'Superficie total', valor: '25.000 m²', icon: <Expand className="w-5 h-5" /> },
      { label: 'Uso', valor: 'Turístico', icon: <Users className="w-5 h-5" /> },
      { label: 'Vista', valor: 'Cordillera', icon: <Mountain className="w-5 h-5" /> },
      { label: 'Vegetación', valor: 'Nativa', icon: <TreePine className="w-5 h-5" /> }
    ],
    caracteristicasServicios: [
      { label: 'Agua', valor: 'Vertiente natural', icon: <Droplet className="w-5 h-5" /> },
      { label: 'Luz', valor: 'Factibilidad', icon: <Zap className="w-5 h-5" /> },
      { label: 'Acceso', valor: 'Ruta asfaltada', icon: <DoorOpen className="w-5 h-5" /> }
    ],
    caracteristicasLegal: [
      { label: 'Rol', valor: 'Al día', icon: <FileCheck className="w-5 h-5" /> },
      { label: 'Uso suelo', valor: 'Turístico', icon: <CheckCircle className="w-5 h-5" /> },
      { label: 'Estado', valor: 'Saneado', icon: <FileText className="w-5 h-5" /> }
    ],
    destacados: [
      { icon: <Expand className="w-5 h-5" />, text: '2,5 hectáreas' },
      { icon: <Users className="w-5 h-5" />, text: 'Potencial turístico' },
      { icon: <Droplet className="w-5 h-5" />, text: 'Vertiente natural' }
    ],
    inmobiliaria: {
      nombre: 'Inmobiliaria Austral',
      tipoVendedor: 'Inmobiliaria',
      descripcion: 'Especialistas en propiedades en la Patagonia con más de 15 años de experiencia',
      logo: 'https://images.unsplash.com/photo-1763479169474-728a7de108c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzY5MDYwNzI2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      telefono: '+56 9 1234 5678',
      email: 'contacto@inmobiliariaustral.cl'
    },
    plano: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmUlMjBwbGFufGVufDF8fHx8MTc2OTExMTE3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    documentos: [
      { nombre: 'Brochure', tipo: 'PDF', disponible: true },
      { nombre: 'Plano del terreno', tipo: 'PDF', disponible: true },
      { nombre: 'Estudio de suelo', tipo: 'PDF', disponible: true }
    ],
    historialPropiedad: 'Primer dueño'
  },
  // Parcelas adicionales para Propiedades del Sur
  {
    id: 7,
    nombre: 'Terreno Río Tranquilo',
    ubicacion: 'Cochrane, Aysén',
    ubicacionCompleta: 'Sector Río Tranquilo, Cochrane, Región de Aysén',
    precio: '$42.000.000',
    precioNumero: 42000000,
    superficie: '6.500 m²',
    superficieNumero: 6500,
    lat: -47.2525,
    lng: -72.5833,
    descripcion: 'Hermoso terreno con acceso al río, rodeado de bosque nativo. Perfecto para proyectos ecoturísticos.',
    imagenes: [
      'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaXZlciUyMGxhbmQlMjBmb3Jlc3R8ZW58MXx8fHwxNzY5NDYxNDk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBuYXR1cmV8ZW58MXx8fHwxNzY5NDYxNTA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaXZlciUyMHNjZW5lcnl8ZW58MXx8fHwxNzY5NDYxNTE3fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    caracteristicasTerreno: [
      { label: 'Superficie total', valor: '6.500 m²', icon: <Expand className="w-5 h-5" /> },
      { label: 'Acceso', valor: 'Río', icon: <Droplet className="w-5 h-5" /> },
      { label: 'Vegetación', valor: 'Bosque nativo', icon: <TreePine className="w-5 h-5" /> },
      { label: 'Vista', valor: 'Montañas', icon: <Mountain className="w-5 h-5" /> }
    ],
    caracteristicasServicios: [
      { label: 'Luz', valor: 'Factibilidad', icon: <Zap className="w-5 h-5" /> },
      { label: 'Agua', valor: 'Río', icon: <Droplet className="w-5 h-5" /> },
      { label: 'Acceso', valor: 'Camino ripiado', icon: <DoorOpen className="w-5 h-5" /> }
    ],
    caracteristicasLegal: [
      { label: 'Rol', valor: 'Al día', icon: <FileCheck className="w-5 h-5" /> },
      { label: 'Estado', valor: 'Saneado', icon: <CheckCircle className="w-5 h-5" /> }
    ],
    destacados: [
      { icon: <Droplet className="w-5 h-5" />, text: 'Acceso al río' },
      { icon: <TreePine className="w-5 h-5" />, text: 'Bosque nativo' },
      { icon: <Mountain className="w-5 h-5" />, text: 'Vista cordillera' }
    ],
    inmobiliaria: {
      nombre: 'Propiedades del Sur',
      tipoVendedor: 'Inmobiliaria',
      descripcion: 'Conectamos personas con la naturaleza a través de propiedades únicas en el sur de Chile',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwbG9nb3xlbnwxfHx8fDE3NjkwNjA3MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      telefono: '+56 9 8765 4321',
      email: 'ventas@propiedadesdelsur.cl'
    },
    plano: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmUlMjBwbGFufGVufDF8fHx8MTc2OTExMTE3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    documentos: [
      { nombre: 'Brochure', tipo: 'PDF', disponible: true },
      { nombre: 'Plano del terreno', tipo: 'PDF', disponible: true },
      { nombre: 'Certificado de avalúo', tipo: 'PDF', disponible: true }
    ],
    historialPropiedad: 'Cuarto dueño'
  },
  {
    id: 8,
    nombre: 'Parcela Montaña Azul',
    ubicacion: 'Cochrane, Aysén',
    ubicacionCompleta: 'Camino Montaña Azul, Cochrane, Región de Aysén',
    precio: '$55.000.000',
    precioNumero: 55000000,
    superficie: '10.000 m²',
    superficieNumero: 10000,
    lat: -47.2400,
    lng: -72.5700,
    descripcion: 'Amplia parcela con vistas panorámicas a la cordillera. Terreno semi-plano con excelente exposición solar.',
    imagenes: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3Njk0NjE1Njd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHZpZXclMjBsYW5kfGVufDF8fHx8MTc2OTQ2MTU3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHZhbGxleSUyMGxhbmR8ZW58MXx8fHwxNzY5NDYxNDI3fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    caracteristicasTerreno: [
      { label: 'Superficie total', valor: '10.000 m²', icon: <Expand className="w-5 h-5" /> },
      { label: 'Topografía', valor: 'Semi-plana', icon: <Compass className="w-5 h-5" /> },
      { label: 'Vista', valor: 'Cordillera', icon: <Mountain className="w-5 h-5" /> },
      { label: 'Orientación', valor: 'Norte', icon: <Compass className="w-5 h-5" /> }
    ],
    caracteristicasServicios: [
      { label: 'Luz', valor: 'Instalada', icon: <Zap className="w-5 h-5" /> },
      { label: 'Agua', valor: 'Pozo propio', icon: <Droplet className="w-5 h-5" /> },
      { label: 'Acceso', valor: 'Camino público', icon: <DoorOpen className="w-5 h-5" /> }
    ],
    caracteristicasLegal: [
      { label: 'Rol', valor: 'Al día', icon: <FileCheck className="w-5 h-5" /> },
      { label: 'Estado', valor: 'Saneado', icon: <CheckCircle className="w-5 h-5" /> }
    ],
    destacados: [
      { icon: <Mountain className="w-5 h-5" />, text: 'Vista cordillera' },
      { icon: <Zap className="w-5 h-5" />, text: 'Luz instalada' },
      { icon: <Droplet className="w-5 h-5" />, text: 'Pozo propio' }
    ],
    inmobiliaria: {
      nombre: 'Propiedades del Sur',
      tipoVendedor: 'Inmobiliaria',
      descripcion: 'Conectamos personas con la naturaleza a través de propiedades únicas en el sur de Chile',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwbG9nb3xlbnwxfHx8fDE3NjkwNjA3MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      telefono: '+56 9 8765 4321',
      email: 'ventas@propiedadesdelsur.cl'
    },
    plano: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmUlMjBwbGFufGVufDF8fHx8MTc2OTExMTE3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    documentos: [
      { nombre: 'Brochure', tipo: 'PDF', disponible: true },
      { nombre: 'Plano del terreno', tipo: 'PDF', disponible: true },
      { nombre: 'Certificado de avalúo', tipo: 'PDF', disponible: true }
    ],
    historialPropiedad: 'Segundo dueño'
  },
  {
    id: 9,
    nombre: 'Campo Los Boldos',
    ubicacion: 'Cochrane, Aysén',
    ubicacionCompleta: 'Sector Los Boldos, Cochrane, Región de Aysén',
    precio: '$68.000.000',
    precioNumero: 68000000,
    superficie: '15.000 m²',
    superficieNumero: 15000,
    lat: -47.2650,
    lng: -72.6000,
    descripcion: 'Extenso campo con potencial para desarrollo agrícola y ganadero. Cuenta con áreas de pastoreo y bosque nativo.',
    imagenes: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGxhbmQlMjBsYWtlfGVufDF8fHx8MTc2OTQ2MTM2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjBsYW5kfGVufDF8fHx8MTc2OTQ2MTI5Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBmaWVsZHxlbnwxfHx8fDE3Njk0NjE2Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    caracteristicasTerreno: [
      { label: 'Superficie total', valor: '15.000 m²', icon: <Expand className="w-5 h-5" /> },
      { label: 'Uso', valor: 'Agrícola/Ganadero', icon: <Pickaxe className="w-5 h-5" /> },
      { label: 'Vegetación', valor: 'Mixta', icon: <TreePine className="w-5 h-5" /> },
      { label: 'Topografía', valor: 'Ondulada', icon: <Compass className="w-5 h-5" /> }
    ],
    caracteristicasServicios: [
      { label: 'Agua', valor: 'Vertiente', icon: <Droplet className="w-5 h-5" /> },
      { label: 'Luz', valor: 'Factibilidad', icon: <Zap className="w-5 h-5" /> },
      { label: 'Acceso', valor: 'Camino ripiado', icon: <DoorOpen className="w-5 h-5" /> }
    ],
    caracteristicasLegal: [
      { label: 'Rol', valor: 'Al día', icon: <FileCheck className="w-5 h-5" /> },
      { label: 'Estado', valor: 'Saneado', icon: <CheckCircle className="w-5 h-5" /> }
    ],
    destacados: [
      { icon: <Expand className="w-5 h-5" />, text: '1,5 hectáreas' },
      { icon: <Pickaxe className="w-5 h-5" />, text: 'Uso agrícola' },
      { icon: <Droplet className="w-5 h-5" />, text: 'Agua disponible' }
    ],
    inmobiliaria: {
      nombre: 'Propiedades del Sur',
      tipoVendedor: 'Inmobiliaria',
      descripcion: 'Conectamos personas con la naturaleza a través de propiedades únicas en el sur de Chile',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwbG9nb3xlbnwxfHx8fDE3NjkwNjA3MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      telefono: '+56 9 8765 4321',
      email: 'ventas@propiedadesdelsur.cl'
    },
    plano: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmUlMjBwbGFufGVufDF8fHx8MTc2OTExMTE3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    documentos: [
      { nombre: 'Brochure', tipo: 'PDF', disponible: true },
      { nombre: 'Plano del terreno', tipo: 'PDF', disponible: true },
      { nombre: 'Estudio de suelo', tipo: 'PDF', disponible: true }
    ],
    historialPropiedad: 'Tercer dueño'
  },
  // Parcelas adicionales para Patagonia Properties
  {
    id: 10,
    nombre: 'Terreno Turístico Lago General Carrera',
    ubicacion: 'Puerto Río Tranquilo, Aysén',
    ubicacionCompleta: 'Ruta 7 Sur, km 223, Puerto Río Tranquilo, Región de Aysén',
    precio: '$78.000.000',
    precioNumero: 78000000,
    superficie: '12.000 m²',
    superficieNumero: 12000,
    lat: -46.6272,
    lng: -72.6853,
    descripcion: 'Exclusivo terreno frente al Lago General Carrera con increíbles vistas. Ubicación estratégica sobre la Ruta 7.',
    imagenes: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHZhbGxleSUyMGxhbmR8ZW58MXx8fHwxNzY5NDYxNDI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1640958903934-b116ab32c95b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwdmlldyUyMGxhbmR8ZW58MXx8fHwxNzY5MTA4Njk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaXZlciUyMGxhbmQlMjBmb3Jlc3R8ZW58MXx8fHwxNzY5NDYxNDk3fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    caracteristicasTerreno: [
      { label: 'Superficie total', valor: '12.000 m²', icon: <Expand className="w-5 h-5" /> },
      { label: 'Vista', valor: 'Lago', icon: <Mountain className="w-5 h-5" /> },
      { label: 'Ubicación', valor: 'Ruta 7', icon: <DoorOpen className="w-5 h-5" /> },
      { label: 'Uso', valor: 'Turístico', icon: <Users className="w-5 h-5" /> }
    ],
    caracteristicasServicios: [
      { label: 'Luz', valor: 'Trifásica', icon: <Zap className="w-5 h-5" /> },
      { label: 'Agua', valor: 'Red pública', icon: <Droplet className="w-5 h-5" /> },
      { label: 'Acceso', valor: 'Ruta pavimentada', icon: <DoorOpen className="w-5 h-5" /> }
    ],
    caracteristicasLegal: [
      { label: 'Rol', valor: 'Al día', icon: <FileCheck className="w-5 h-5" /> },
      { label: 'Uso suelo', valor: 'Turístico', icon: <CheckCircle className="w-5 h-5" /> }
    ],
    destacados: [
      { icon: <Users className="w-5 h-5" />, text: 'Zona turística' },
      { icon: <TrendingUp className="w-5 h-5" />, text: 'Alta valorización' },
      { icon: <DoorOpen className="w-5 h-5" />, text: 'Sobre Ruta 7' }
    ],
    inmobiliaria: {
      nombre: 'Patagonia Properties',
      tipoVendedor: 'Inmobiliaria',
      descripcion: 'Especialistas en propiedades y proyectos en la Patagonia',
      logo: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnR8ZW58MXx8fHwxNzY5NDA5ODkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      telefono: '+56 9 6666 7890',
      email: 'contacto@patagoniaproperties.cl'
    },
    plano: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmUlMjBwbGFufGVufDF8fHx8MTc2OTExMTE3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    documentos: [
      { nombre: 'Brochure', tipo: 'PDF', disponible: true },
      { nombre: 'Plano del terreno', tipo: 'PDF', disponible: true },
      { nombre: 'Certificado de avalúo', tipo: 'PDF', disponible: true }
    ],
    historialPropiedad: 'Primer dueño'
  },
  {
    id: 11,
    nombre: 'Parcela Premium Vista Catedrales',
    ubicacion: 'Puerto Río Tranquilo, Aysén',
    ubicacionCompleta: 'Sector Capillas de Mármol, Puerto Río Tranquilo, Región de Aysén',
    precio: '$125.000.000',
    precioNumero: 125000000,
    superficie: '20.000 m²',
    superficieNumero: 20000,
    lat: -46.6580,
    lng: -72.6200,
    descripcion: 'Parcela premium en ubicación estratégica cerca de las Capillas de Mármol. Terreno con alta plusvalía.',
    imagenes: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3Njk0NjE1Njd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGxhbmQlMjBsYWtlfGVufDF8fHx8MTc2OTQ2MTM2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzY5NDYxMzg3fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    caracteristicasTerreno: [
      { label: 'Superficie total', valor: '20.000 m²', icon: <Expand className="w-5 h-5" /> },
      { label: 'Clasificación', valor: 'Premium', icon: <TrendingUp className="w-5 h-5" /> },
      { label: 'Vista', valor: 'Panorámica', icon: <Mountain className="w-5 h-5" /> },
      { label: 'Ubicación', valor: 'Estratégica', icon: <Compass className="w-5 h-5" /> }
    ],
    caracteristicasServicios: [
      { label: 'Luz', valor: 'Trifásica instalada', icon: <Zap className="w-5 h-5" /> },
      { label: 'Agua', valor: 'Pozo y red', icon: <Droplet className="w-5 h-5" /> },
      { label: 'Acceso', valor: 'Ruta principal', icon: <DoorOpen className="w-5 h-5" /> }
    ],
    caracteristicasLegal: [
      { label: 'Rol', valor: 'Al día', icon: <FileCheck className="w-5 h-5" /> },
      { label: 'Uso suelo', valor: 'Mixto', icon: <CheckCircle className="w-5 h-5" /> }
    ],
    destacados: [
      { icon: <TrendingUp className="w-5 h-5" />, text: 'Ubicación premium' },
      { icon: <Users className="w-5 h-5" />, text: 'Alto potencial turístico' },
      { icon: <Zap className="w-5 h-5" />, text: 'Todos los servicios' }
    ],
    inmobiliaria: {
      nombre: 'Patagonia Properties',
      tipoVendedor: 'Inmobiliaria',
      descripcion: 'Especialistas en propiedades y proyectos en la Patagonia',
      logo: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnR8ZW58MXx8fHwxNzY5NDA5ODkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      telefono: '+56 9 6666 7890',
      email: 'contacto@patagoniaproperties.cl'
    },
    plano: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmUlMjBwbGFufGVufDF8fHx8MTc2OTExMTE3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    documentos: [
      { nombre: 'Brochure', tipo: 'PDF', disponible: true },
      { nombre: 'Plano del terreno', tipo: 'PDF', disponible: true },
      { nombre: 'Certificado de avalúo', tipo: 'PDF', disponible: true }
    ],
    historialPropiedad: 'Segundo dueño'
  },
  {
    id: 12,
    nombre: 'Campo Vista Cerro Castillo',
    ubicacion: 'Puerto Río Tranquilo, Aysén',
    ubicacionCompleta: 'Camino a Cerro Castillo, Puerto Río Tranquilo, Región de Aysén',
    precio: '$89.000.000',
    precioNumero: 89000000,
    superficie: '18.000 m²',
    superficieNumero: 18000,
    lat: -46.6700,
    lng: -72.7000,
    descripcion: 'Hermoso campo con vistas al imponente Cerro Castillo. Terreno con bosque nativo y áreas despejadas.',
    imagenes: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHZhbGxleSUyMGxhbmR8ZW58MXx8fHwxNzY5NDYxNDI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHZpZXclMjBsYW5kfGVufDF8fHx8MTc2OTQ2MTU3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzY5NDYxNDM3fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    caracteristicasTerreno: [
      { label: 'Superficie total', valor: '18.000 m²', icon: <Expand className="w-5 h-5" /> },
      { label: 'Vista', valor: 'Cerro Castillo', icon: <Mountain className="w-5 h-5" /> },
      { label: 'Vegetación', valor: 'Bosque nativo', icon: <TreePine className="w-5 h-5" /> },
      { label: 'Topografía', valor: 'Mixta', icon: <Compass className="w-5 h-5" /> }
    ],
    caracteristicasServicios: [
      { label: 'Luz', valor: 'Factibilidad', icon: <Zap className="w-5 h-5" /> },
      { label: 'Agua', valor: 'Vertiente', icon: <Droplet className="w-5 h-5" /> },
      { label: 'Acceso', valor: 'Camino ripiado', icon: <DoorOpen className="w-5 h-5" /> }
    ],
    caracteristicasLegal: [
      { label: 'Rol', valor: 'Al día', icon: <FileCheck className="w-5 h-5" /> },
      { label: 'Estado', valor: 'Saneado', icon: <CheckCircle className="w-5 h-5" /> }
    ],
    destacados: [
      { icon: <Mountain className="w-5 h-5" />, text: 'Vista Cerro Castillo' },
      { icon: <TreePine className="w-5 h-5" />, text: 'Bosque nativo' },
      { icon: <Users className="w-5 h-5" />, text: 'Potencial ecoturístico' }
    ],
    inmobiliaria: {
      nombre: 'Patagonia Properties',
      tipoVendedor: 'Inmobiliaria',
      descripcion: 'Especialistas en propiedades y proyectos en la Patagonia',
      logo: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnR8ZW58MXx8fHwxNzY5NDA5ODkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      telefono: '+56 9 6666 7890',
      email: 'contacto@patagoniaproperties.cl'
    },
    plano: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmUlMjBwbGFufGVufDF8fHx8MTc2OTExMTE3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    documentos: [
      { nombre: 'Brochure', tipo: 'PDF', disponible: true },
      { nombre: 'Plano del terreno', tipo: 'PDF', disponible: true },
      { nombre: 'Certificado de avalúo', tipo: 'PDF', disponible: true }
    ],
    historialPropiedad: 'Cuarto dueño'
  },
];

export function getParcelaById(id: number): Parcela | undefined {
  return PARCELAS_DATA.find(parcela => parcela.id === id);
}

export function getAllParcelas(): Parcela[] {
  return PARCELAS_DATA;
}

export function getSimilarParcelas(currentId: number, limit: number = 3): Parcela[] {
  return PARCELAS_DATA
    .filter(parcela => parcela.id !== currentId)
    .slice(0, limit);
}