Rediseña el formulario de publicación de proyectos dentro del dashboard inmobiliaria

El formulario debe seguir los mismos lineamientos visuales y de layout que el resto del dashboard (cards, inputs compactos, espaciado consistente, tipografía y componentes ya utilizados en la plataforma).

El objetivo es crear un formulario claro, compacto y organizado en pasos, que permita a una inmobiliaria crear un proyecto con múltiples parcelas.

El formulario debe organizarse en un stepper de 6 pasos.

Los inputs deben organizarse en dos columnas cuando sea posible para mantener un diseño compacto.

Paso 1 — Información básica del proyecto

Campos:

Nombre del proyecto

Tipo de proyecto (residencial, turístico, mixto)

Estado del proyecto (en venta, en desarrollo, reservado)

Ubicación

dirección

ciudad

región

Precio base por parcela

Superficie mínima de parcelas

Superficie máxima de parcelas

Total de parcelas del proyecto

Descripción del proyecto (textarea).

Debajo de la descripción incluir multimedia del proyecto:

Imagen principal

Galería de imágenes

Usar un componente de upload de imágenes con preview.

Paso 2 — Características del terreno

Dividir en dos cards.

Terreno

Campos:

Superficie promedio

Tipo de suelo

Orientación

Pendiente

Uso permitido

Servicios

Opciones con toggle o checkbox:

Agua

Electricidad

Camino pavimentado

Cerco perimetral

Acceso vehicular

Paso 3 — Ubicación

Campos:

Dirección completa

Región

Ciudad

Debajo mostrar un mapa interactivo estilo Google Maps donde el usuario pueda:

mover el pin

ajustar la ubicación exacta del proyecto

El mapa debe ocupar todo el ancho del formulario.

Paso 4 — Información del entorno

Organizar en cards.

Accesos y conectividad

Campos:

Tiempo al centro (minutos)

Distancia a ciudad cercana (km)

Servicios cercanos

Inputs tipo nivel o selector:

Educación

Comercio

Salud

Recreación

Entorno natural

Campos:

Naturaleza / paisaje

Vistas

Temperatura promedio

Precipitaciones

Contexto del área

Campos:

Población aproximada

Actividades principales

Paso 5 — Parcelas del proyecto

Esta sección debe incluir una tabla editable de parcelas.

Arriba de la tabla agregar acciones:

botón Importar parcelas (desde Excel)

botón Agregar parcela

buscador de parcelas

Diseñar la tabla con scroll interno.

Columnas de la tabla:

Parcela (nombre o código)

Superficie m²

Precio

Estado

Moneda

Acciones

Estados disponibles:

Disponible

Reservado

Vendido

Acciones por fila:

editar

duplicar

eliminar

Agregar un botón Importar parcelas que permita subir un archivo Excel.

El Excel debe cargar automáticamente las parcelas dentro de la tabla.

Debajo de la tabla mostrar un resumen:

Total parcelas del proyecto

Parcelas cargadas

Disponibles

Reservadas

Vendidas

Paso 6 — Documentación del proyecto

Agrupar toda la documentación en un solo paso.

Secciones:

Masterplan

Upload de:

imagen del masterplan

PDF del plano

Estado legal

Campos:

Rol de avalúo

Estado legal

Documentación verificada

Documentos

Upload de archivos:

escritura

documentos legales

archivos adicionales

Reglas de diseño

El diseño debe:

mantener el estilo del dashboard actual

usar cards claras para cada sección

inputs alineados

layout compacto

máximo dos columnas de inputs

spacing consistente

Los botones de navegación del stepper deben incluir:

Anterior

Siguiente

Guardar borrador

Publicar proyecto