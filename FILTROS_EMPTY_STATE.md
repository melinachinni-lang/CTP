# Guía de Pruebas: Empty State de Filtros sin Resultados

## Descripción
Se ha implementado un empty state específico para cuando el usuario aplica filtros en la página de Parcelas pero no se encuentran resultados que coincidan con los criterios seleccionados.

## Componente Actualizado
- **Archivo**: `/src/app/components/ParcelasPage.tsx`
- **Funcionalidad**: Detecta cuando `parcelas.length === 0` y `filtersApplied === true`

## Cómo Probar

### Casos que MUESTRAN RESULTADOS ✅

Estas combinaciones de filtros devuelven parcelas porque coinciden con los datos existentes en Aysén:

1. **Ubicación: Aysén + Sin otros filtros**
   - Resultado: Muestra todas las parcelas de Aysén (4-5 parcelas)

2. **Ubicación: Aysén + Precio: $50M - $100M**
   - Resultado: Muestra parcelas en ese rango (2-3 parcelas)

3. **Ubicación: Aysén + Superficie: 1 - 5 hectáreas**
   - Resultado: Muestra parcelas que cumplen esos criterios

4. **Sin ubicación + Precio: Hasta $10.000.000**
   - Resultado: No filtra ubicación, puede mostrar algunas parcelas económicas

### Casos que MUESTRAN EMPTY STATE ❌

Estas combinaciones NO devuelven resultados porque no coinciden con los datos disponibles:

1. **Ubicación: Región Metropolitana + Cualquier filtro**
   - Motivo: No hay parcelas en Santiago en el dataset (todas están en Aysén)
   - Empty State: "No encontramos parcelas con estos filtros"

2. **Ubicación: Valparaíso + Cualquier filtro**
   - Motivo: No hay parcelas en Valparaíso
   - Empty State: Se muestra con mensaje y botones de acción

3. **Ubicación: Biobío + Cualquier filtro**
   - Motivo: No hay parcelas en Biobío
   - Empty State: Se muestra con opciones para limpiar filtros

4. **Superficie: Más de 50 hectáreas (500000+)**
   - Motivo: Las parcelas del dataset son más pequeñas (máximo ~2.5 ha)
   - Empty State: Sugiere ajustar criterios

5. **Precio: $10M - $30M + Ubicación: Región Metropolitana**
   - Motivo: Combinación que no existe en los datos
   - Empty State: Con botones "Limpiar filtros" y "Volver al inicio"

6. **Precio: Más de $200M**
   - Motivo: No hay parcelas tan caras en el dataset
   - Empty State: Se muestra

## Características del Empty State

### Diseño Visual
- **Ícono**: MapPin de Lucide (64px, color #CDD8DE)
- **Título**: "No encontramos parcelas con estos filtros"
- **Descripción**: Texto explicativo sugiriendo ajustar criterios
- **Colores**:
  - Título: #0A0A0A (negro estándar)
  - Descripción: #737373 (gris)
  - Botón primario: #124854 (Primary del design system)
  - Botón secundario: Borde #DEDEDE

### Acciones Disponibles

1. **Botón "Limpiar filtros"** (Primario)
   - Color: #124854 (Primary)
   - Hover: #0D3640
   - Acción: Elimina todos los filtros activos y recarga todas las parcelas

2. **Botón "Volver al inicio"** (Secundario)
   - Color: Transparente con borde
   - Hover: Fondo #F5F5F5
   - Acción: Navega de vuelta al Home

### Voz y Tono
El mensaje utiliza la voz de marca de CompraTuParcela:
- ✅ Clara y directa
- ✅ Profesional pero cercana
- ✅ Usa "tú" (español neutro adaptado a Chile)
- ✅ Acompañante: sugiere alternativas sin frustrar
- ✅ Realista: explica por qué no hay resultados

## Diferencias con Otros Empty States

### vs. ParcelasPageEmpty
- **ParcelasPageEmpty**: Cuando NO HAY PARCELAS en absoluto en la plataforma
- **Empty State de Filtros**: Cuando SÍ HAY parcelas, pero no coinciden con los filtros

### vs. Home Error State
- **Home Error**: Error técnico al cargar datos
- **Empty State de Filtros**: No es un error, simplemente no hay coincidencias

## Implementación Técnica

```typescript
{parcelas.length === 0 && filtersApplied ? (
  // Empty State cuando no hay resultados con filtros aplicados
  <div className="col-span-2 py-20">
    // ... contenido del empty state
  </div>
) : (
  // Grid normal de parcelas
  <div className="grid grid-cols-2 gap-6">
    // ... cards de parcelas
  </div>
)}
```

## Variables CSS Utilizadas

El empty state usa consistentemente las variables del design system:

```css
--font-heading: 'Montserrat', sans-serif
--font-body: 'Inter', sans-serif
--font-size-h3: 24px
--font-size-body-base: 16px
--line-height-heading: 1.2
--line-height-body: 1.6
```

Colores:
- `#0A0A0A`: Negro estándar para textos
- `#124854`: Primary para botones
- `#0D3640`: Primary hover
- `#737373`: Texto secundario
- `#CDD8DE`: Neutral light para iconos
- `#DEDEDE`: Bordes

## Casos de Uso en Producción

Cuando se implemente con datos reales, el empty state aparecerá cuando:
- Usuario busca una región sin propiedades disponibles
- Filtros de precio muy restrictivos (muy alto o muy bajo)
- Combinación de filtros muy específica sin coincidencias
- Búsqueda en zonas geográficas sin cobertura aún

## Testing Manual Recomendado

1. ✅ Aplicar filtro de Región Metropolitana → Ver empty state
2. ✅ Click en "Limpiar filtros" → Ver todas las parcelas
3. ✅ Aplicar filtro de Valparaíso → Ver empty state
4. ✅ Click en "Volver al inicio" → Ir al Home
5. ✅ Aplicar Aysén + precio bajo → Ver resultados
6. ✅ Cambiar a precio muy alto → Ver empty state
7. ✅ Verificar que los chips de filtros activos se muestran correctamente
8. ✅ Verificar responsive del empty state

## Notas de Desarrollo

- El estado `filtersApplied` se activa cuando el usuario hace click en "Buscar"
- Los filtros del Home se transfieren correctamente vía `initialFilters`
- La función `getSortedParcelas()` filtra el dataset completo
- El componente mantiene la estructura de layout (sidebar + main)
