# Vista de Consultas - CompraTuParcela

## Descripción

Sistema completo de visualización y gestión de consultas dentro del dashboard, diseñado para mostrar todas las interacciones realizadas por los usuarios sobre las parcelas.

## Características por Tipo de Dashboard

### Dashboard Personal
- **Alcance**: Consultas de una sola parcela (el usuario particular solo puede publicar una parcela)
- **Filtros**: Solo por estado y tipo de consulta
- **Información mostrada**: Usuario, fecha/hora, tipo de consulta, estado
- **Vista simplificada**: Sin información de broker o inmobiliaria

### Dashboard Inmobiliaria
- **Alcance**: Consultas de múltiples parcelas del portafolio
- **Filtros**: Por parcela, estado y tipo de consulta
- **Información adicional**:
  - **Broker asignado** a cada consulta
  - Datos de contacto del broker (nombre, email, teléfono)
- **Vista completa**: Con panel de broker asignado en detalle de consulta

### Dashboard Broker
- **Alcance**: Consultas de múltiples parcelas gestionadas
- **Filtros**: Por parcela, estado y tipo de consulta
- **Información adicional**:
  - **Inmobiliaria propietaria** del terreno consultado
  - Identificación de la inmobiliaria con logo y nombre
- **Vista completa**: Con panel de inmobiliaria en detalle de consulta

## Componentes Creados

### 1. ConsultasView (`src/app/components/ConsultasView.tsx`)
Componente principal que gestiona la vista de consultas con:
- Toggle entre vista de calendario y lista
- Filtros avanzados (estado, tipo, parcela) para dashboards broker/inmobiliaria
- **Filtrado automático para dashboard personal** (solo parcela con id: 1)
- Separación entre consultas con fecha (visita/videollamada) y sin fecha (WhatsApp)
- Integración con ConsultasCalendar y ConsultasRecientes
- Drawer de detalle para cada consulta
- **Información contextual** según tipo de dashboard en vista de lista

### 2. ConsultasCalendar (`src/app/components/ConsultasCalendar.tsx`)
Vista tipo agenda inspirada en Google Calendar:
- Grid semanal con horarios de 8:00 a 20:00
- Navegación entre semanas (anterior/siguiente)
- Botón "Hoy" para volver a la fecha actual
- Código de colores por tipo de consulta:
  - **Primary (#124854)**: Visitas presenciales
  - **Accent (#7D460D)**: Videollamadas
- Estados visuales:
  - **Success (#647E3F)**: Confirmada
  - **Gray (#6B7280)**: Pendiente
  - **Error (#DC2626)**: Cancelada
- Vista responsive:
  - Desktop: Calendario completo tipo grid
  - Mobile: Lista por día
- Leyenda de colores en footer

### 3. ConsultasRecientes (`src/app/components/ConsultasRecientes.tsx`)
Panel lateral para consultas sin fecha (WhatsApp):
- Lista ordenada por más reciente
- Formato tipo inbox con:
  - Nombre de parcela y ubicación
  - Avatar y datos del usuario
  - Timestamp relativo ("Hace X min", "Ayer", etc.)
  - Badge identificando tipo WhatsApp
- Empty state cuando no hay consultas
- Contador de consultas en footer

### 4. ConsultaDetailDrawer (`src/app/components/ConsultaDetailDrawer.tsx`)
Drawer lateral para ver y gestionar detalles de consulta:
- Información completa de la consulta
- Datos del usuario con links directos (email, teléfono)
- **Panel de Broker Asignado** (solo dashboard inmobiliaria):
  - Avatar con inicial del broker
  - Nombre completo
  - Email y teléfono con links directos
  - Diseño con fondo gris claro y borde
- **Panel de Inmobiliaria** (solo dashboard broker):
  - Avatar con inicial de la inmobiliaria
  - Nombre de la inmobiliaria
  - Texto descriptivo "Propietario de la parcela"
  - Color secundario (#462611) para diferenciación visual
- Acciones disponibles:
  - Confirmar (si está pendiente)
  - Reprogramar
  - Cancelar
  - Abrir WhatsApp (para consultas WhatsApp)
- Estados visuales con iconos (CheckCircle, Clock, XCircle)
- Cierre con ESC o click en overlay
- Responsive (fullscreen en mobile, drawer en desktop)

## Integración con Dashboards

### PersonDashboardScreen
- Sección "Consultas recibidas" (`inquiries`)
- ViewType: `personal`
- **Muestra solo consultas de una parcela** (id: 1)
- Sin filtro de parcela (no es necesario)
- Sin información de broker/inmobiliaria

### BrokerDashboardScreen
- Sección "Leads" (`leads`)
- ViewType: `broker`
- Muestra consultas de múltiples parcelas
- **Incluye información de inmobiliaria propietaria**
- Filtros por parcela, estado y tipo

### RealEstateDashboardScreen
- Sección "Consultas" (`inquiries`)
- ViewType: `inmobiliaria`
- Muestra consultas de múltiples parcelas del portafolio
- **Incluye información de broker asignado a cada consulta**
- Filtros por parcela, estado y tipo

## Datos Ficticios

Se incluyen 8 consultas de ejemplo:
- 5 consultas con fecha (visitas y videollamadas)
- 3 consultas sin fecha (WhatsApp)
- Diferentes estados (confirmada, pendiente, cancelada)
- 5 parcelas diferentes
- Variedad de usuarios con información completa
- **Cada consulta incluye**:
  - Broker asignado (nombre, email, teléfono)
  - Inmobiliaria propietaria (nombre, logo opcional)
- **Distribución de brokers**:
  - Carolina Méndez (Propiedades del Sur)
  - Rodrigo Fuentes (Inmobiliaria Valle Verde)
  - Patricia Lagos (Propiedades del Sur)
  - Andrés Morales (Inmobiliaria Cordillera)
  - Verónica Castillo (Coastal Properties)
- **Distribución de inmobiliarias**:
  - Propiedades del Sur (3 consultas)
  - Inmobiliaria Valle Verde (2 consultas)
  - Inmobiliaria Cordillera (1 consulta)
  - Coastal Properties (1 consulta)

## Design System

Todos los componentes usan variables CSS del design system:
- **Colores de texto**: `#0A0A0A` (negro estándar)
- **Primary**: `#124854` (botones primarios, iconos de KPI)
- **Accent**: `#7D460D` (acentos visuales)
- **Success**: `#647E3F` (estados positivos, confirmados)
- **Error**: `#DC2626` (cancelaciones)
- **Neutral**: `#6B7280`, `#CDD8DE` (grises, divisores)
- **Border radius**: `8px` para contenedores, `6px` para botones
- **Tipografía**: Montserrat (headings), Inter (body)

## Características Principales

1. **Vista Calendario Tipo Google Calendar**
   - Grid semanal con horarios
   - Bloques de consultas visuales
   - Código de colores por tipo y estado
   - Responsive

2. **Filtros Avanzados** (Broker/Inmobiliaria)
   - Por estado (todos, pendiente, confirmada, cancelada)
   - Por tipo (todos, visita, videollamada, whatsapp)
   - Por parcela (dropdown con todas las parcelas)

3. **Consultas Recientes**
   - Panel lateral para WhatsApp
   - Ordenadas por más reciente
   - Formato inbox amigable

4. **Gestión de Consultas**
   - Ver detalle completo
   - Confirmar/Cancelar/Reprogramar
   - Link directo a WhatsApp

5. **Responsive Design**
   - Desktop: Calendario + sidebar
   - Mobile: Lista por día
   - Drawer fullscreen en mobile

6. **Información Contextual por Dashboard**
   - **Personal**: Vista simplificada, una sola parcela
   - **Inmobiliaria**: Muestra broker asignado a cada consulta
   - **Broker**: Muestra inmobiliaria propietaria de cada terreno

## Voz y Tono

- **Clara**: Mensajes directos sin jerga técnica
- **Confiable**: Estados visuales claros
- **Profesional**: Diseño limpio y organizado
- **Acompañante**: Ayuda contextual disponible
- **Realista**: Datos de ejemplo realistas

## Próximos Pasos Sugeridos

1. Conectar con API real de consultas
2. Implementar funcionalidad de reprogramación
3. Agregar notificaciones de consultas nuevas
4. Integrar con sistema de calendario (iCal, Google Calendar)
5. Añadir recordatorios automáticos
6. Implementar sincronización con WhatsApp Business API
