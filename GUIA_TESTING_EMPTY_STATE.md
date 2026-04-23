# Guía Rápida: Testear Empty State de Filtros

## 🎯 Objetivo
Probar que el empty state de "sin resultados con filtros" funciona correctamente en la página de Parcelas.

## 🚀 Inicio Rápido

### Para ver RESULTADOS (parcelas visibles):
1. Ir al Home
2. En el buscador, seleccionar: **Ubicación: Aysén**
3. Click en **"Buscar"**
4. ✅ **Resultado**: Se muestran 4-5 parcelas de Aysén

### Para ver EMPTY STATE (sin resultados):
1. Ir al Home
2. En el buscador, seleccionar: **Ubicación: Región Metropolitana**
3. Click en **"Buscar"**
4. ❌ **Resultado**: Empty state con mensaje "No encontramos parcelas con estos filtros"

## 📋 Escenarios de Prueba Detallados

### ✅ Escenario 1: Búsqueda Exitosa
```
Home → Filtros: Aysén + $50M-$100M → Buscar
```
**Esperado**:
- Muestra 2-3 parcelas
- Chips de filtros visibles: "Aysén", "Hasta $50M - $100M"
- Grid de 2 columnas con parcelas

**Visual**:
```
┌────────────────────────────────────────┐
│ 3 parcelas encontradas                  │
│ [Aysén] [x]  [Hasta $50M-$100M] [x]    │
├────────────────────────────────────────┤
│ ┌──────────┐  ┌──────────┐            │
│ │ Parcela  │  │ Terreno  │            │
│ │ Vista    │  │ Cordille │            │
│ │ al Lago  │  │ ra       │            │
│ │          │  │          │            │
│ │ $45.000  │  │ $68.500  │            │
│ └──────────┘  └──────────┘            │
│                                        │
│ ┌──────────┐                          │
│ │ Parcela  │                          │
│ │ Agrícola │                          │
│ │ Valle    │                          │
│ │          │                          │
│ │ $95.000  │                          │
│ └──────────┘                          │
└────────────────────────────────────────┘
```

---

### ❌ Escenario 2: Empty State - Región sin Datos
```
Home → Filtros: Región Metropolitana → Buscar
```
**Esperado**:
- Empty state centrado
- Ícono de mapa
- Mensaje claro
- Dos botones de acción

**Visual**:
```
┌────────────────────────────────────────┐
│ 0 parcelas encontradas                  │
│ [Región Metropolitana] [x]             │
├────────────────────────────────────────┤
│                                        │
│              🗺️                        │
│                                        │
│   No encontramos parcelas con         │
│          estos filtros                 │
│                                        │
│ Intenta ajustar tus criterios de      │
│ búsqueda o elimina algunos filtros    │
│ para ver más opciones disponibles.    │
│                                        │
│  [Limpiar filtros] [Volver al inicio] │
│                                        │
└────────────────────────────────────────┘
```

---

### ❌ Escenario 3: Empty State - Precio Fuera de Rango
```
Home → Filtros: Precio: Más de $200M → Buscar
```
**Esperado**:
- Empty state
- Chip: "Más de $200M"
- Mensaje sugiriendo ajustar filtros

---

### ❌ Escenario 4: Empty State - Superficie Grande
```
Home → Filtros: Superficie: Más de 50 hectáreas → Buscar
```
**Esperado**:
- Empty state
- Chip: "Más de 50 hectáreas"
- Botones funcionando correctamente

---

### ✅ Escenario 5: Limpiar Filtros desde Empty State
```
Empty State → Click "Limpiar filtros"
```
**Esperado**:
- Se eliminan todos los chips de filtros
- Se muestran TODAS las parcelas disponibles (4-5)
- Los dropdowns del buscador se resetean a "Todos"

---

### ✅ Escenario 6: Volver al Inicio desde Empty State
```
Empty State → Click "Volver al inicio"
```
**Esperado**:
- Navega al Home
- Se mantiene el estado del buscador

---

## 🎨 Checklist Visual

Al ver el empty state, verificar:

- [ ] Ícono de mapa (MapPin) visible en gris claro (#CDD8DE)
- [ ] Título en Montserrat, 24px, negro (#0A0A0A)
- [ ] Descripción en Inter, 16px, gris (#737373)
- [ ] Botón "Limpiar filtros" en azul (#124854)
- [ ] Botón "Volver al inicio" con borde gris
- [ ] Hover en botón primario cambia a #0D3640
- [ ] Hover en botón secundario muestra fondo #F5F5F5
- [ ] Chips de filtros activos visibles arriba
- [ ] Contador muestra "0 parcelas encontradas"

## 🔧 Acciones Funcionales

### Botón "Limpiar filtros"
- [ ] Elimina todos los chips
- [ ] Resetea dropdowns del buscador hero
- [ ] Muestra todas las parcelas
- [ ] NO navega a otra página

### Botón "Volver al inicio"
- [ ] Navega al Home
- [ ] Mantiene el estado de autenticación
- [ ] Funciona sin errores de consola

### Chips de Filtros
- [ ] Se muestran incluso con 0 resultados
- [ ] Click en "X" elimina el filtro individual
- [ ] Al eliminar un filtro, recalcula resultados

## 🐛 Posibles Problemas

### Si no aparece el empty state:
1. Verificar que `filtersApplied` es `true`
2. Confirmar que `parcelas.length` es 0
3. Revisar la lógica de filtrado en `getSortedParcelas()`

### Si los botones no funcionan:
1. Verificar que `onNavigate` está definido en props
2. Confirmar que `setActiveFilters` y `setHeroFilters` funcionan
3. Revisar consola del navegador por errores

### Si los estilos no se ven bien:
1. Verificar que `/src/styles/theme.css` está cargado
2. Confirmar que las variables CSS están definidas
3. Revisar que Tailwind está compilando correctamente

## 📸 Screenshots Recomendados

Para documentación, capturar:
1. Empty state completo con filtro "Región Metropolitana"
2. Empty state con filtro "Más de $200M"
3. Estado antes y después de click en "Limpiar filtros"
4. Hover states de ambos botones
5. Vista completa mostrando sidebar + empty state

## ✅ Criterios de Aceptación

El empty state está correcto si:
- ✅ Se muestra SOLO cuando hay filtros aplicados y 0 resultados
- ✅ No se muestra si no hay filtros aplicados
- ✅ Los botones funcionan correctamente
- ✅ Los colores coinciden con el design system
- ✅ La tipografía usa las variables CSS correctas
- ✅ El mensaje está en español neutro chileno con "tú"
- ✅ Es claro y no frustra al usuario
- ✅ Ofrece acciones concretas (no solo un mensaje)

## 🎓 Conceptos Clave

### Estado `filtersApplied`
Se activa cuando:
- Usuario hace click en "Buscar" en el hero
- Se reciben `initialFilters` desde el Home

### Diferencia con `ParcelasPageEmpty`
| Característica | Empty State Filtros | ParcelasPageEmpty |
|---------------|---------------------|-------------------|
| Cuándo aparece | Filtros aplicados, 0 resultados | No hay parcelas en la plataforma |
| Contexto | Usuario ya buscó algo | Estado inicial vacío |
| Acción principal | Ajustar filtros | Explorar otras opciones |
| Mensaje | "No encontramos con estos filtros" | "No hay parcelas disponibles" |

### Lógica de Filtrado
```typescript
const filtered = parcelasData.filter(parcela => {
  // Si ubicacion = "metropolitana" y no hay parcelas en Santiago
  // → filtered.length = 0
  // → Muestra empty state
})
```

## 📞 Soporte

Si algo no funciona:
1. Revisar `/FILTROS_EMPTY_STATE.md` para detalles técnicos
2. Verificar `/RESUMEN_EMPTY_STATE_FILTROS.md` para contexto
3. Inspeccionar componente `/src/app/components/ParcelasPage.tsx`
4. Verificar que los imports están correctos

---

**Última actualización**: Marzo 2026
**Versión**: 1.0
**Componente**: ParcelasPage.tsx
