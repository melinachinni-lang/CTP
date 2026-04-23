# 🔍 Guía de Prueba: Buscador de Parcelas

## 📋 Descripción General

Se ha implementado completamente la funcionalidad del buscador de parcelas en CompraTuParcela, incluyendo:
- ✅ **Búsqueda común** con filtros tradicionales (ubicación, tipo, superficie, condición, precio)
- ✅ **Búsqueda inteligente** con campo de texto libre y chips de sugerencias
- ✅ Navegación desde Home a página de Parcelas con filtros aplicados
- ✅ Visualización de resultados filtrados
- ✅ Chips de filtros activos visibles

---

## 🎯 Objetivo de las Pruebas

Demostrar que el usuario puede:
1. Aplicar filtros desde el Home
2. Navegar a la página de Parcelas
3. Ver resultados acordes a los criterios seleccionados
4. Identificar fácilmente qué filtros están activos

---

## 🔎 BÚSQUEDA COMÚN

### Escenario 1: Búsqueda por Ubicación
**Pasos:**
1. Ir al Home
2. En el buscador hero, seleccionar:
   - **Ubicación**: Aysén
3. Click en **"Buscar"**

**Resultado Esperado:**
```
✅ Navega a página de Parcelas
✅ Muestra contador: "4-5 parcelas encontradas"
✅ Chip visible: [Aysén] [x]
✅ Grid muestra parcelas de Aysén:
   - Parcela Vista al Lago (Chile Chico)
   - Terreno Cordillera (Cochrane)
   - Parcela Agrícola Valle (Coyhaique)
   - Terreno Montaña Vista (Puerto Río Tranquilo)
```

---

### Escenario 2: Búsqueda por Ubicación + Precio
**Pasos:**
1. Ir al Home
2. Seleccionar:
   - **Ubicación**: Aysén
   - **Rango de precio**: $50M - $100M
3. Click en **"Buscar"**

**Resultado Esperado:**
```
✅ Muestra contador: "2-3 parcelas encontradas"
✅ Chips visibles: [Aysén] [x]  [$50M - $100M] [x]
✅ Grid muestra solo parcelas en ese rango:
   - Terreno Cordillera - $68.500.000
   - Parcela Agrícola Valle - $95.000.000
```

---

### Escenario 3: Búsqueda por Superficie
**Pasos:**
1. Ir al Home
2. Seleccionar:
   - **Ubicación**: Aysén
   - **Superficie**: 1 - 5 hectáreas
3. Click en **"Buscar"**

**Resultado Esperado:**
```
✅ Muestra contador: "2-3 parcelas encontradas"
✅ Chips visibles: [Aysén] [x]  [1 - 5 hectáreas] [x]
✅ Grid muestra parcelas de 1-5 ha:
   - Terreno Cordillera - 10.000 m² (1 ha)
   - Parcela Agrícola Valle - 2,5 ha
```

---

### Escenario 4: Sin Resultados (Empty State)
**Pasos:**
1. Ir al Home
2. Seleccionar:
   - **Ubicación**: Región Metropolitana
3. Click en **"Buscar"**

**Resultado Esperado:**
```
❌ Muestra contador: "0 parcelas encontradas"
❌ Chip visible: [Región Metropolitana] [x]
❌ Empty state con:
   - Ícono de mapa
   - "No encontramos parcelas con estos filtros"
   - Botón "Limpiar filtros"
   - Botón "Volver al inicio"
```

---

## ✨ BÚSQUEDA INTELIGENTE

### Escenario 5: Búsqueda por Texto - "lago"
**Pasos:**
1. Ir al Home
2. Click en **"Búsqueda inteligente"** (botón con ícono Sparkles)
3. Se expande el campo de búsqueda inteligente
4. Escribir en el campo: **"busco una parcela cerca de un lago"**
5. Click en **"Buscar"** (botón dentro del campo)

**Resultado Esperado:**
```
✅ Navega a página de Parcelas
✅ Sistema detecta palabra "lago"
✅ Aplica filtro: Ubicación = Aysén (región con lagos)
✅ Chip visible: [Aysén] [x]
✅ Muestra parcelas en Aysén con acceso a lagos
```

**Lógica Aplicada:**
- Palabra clave "lago" → `ubicacion: 'aysen'`

---

### Escenario 6: Búsqueda por Texto - "inversión"
**Pasos:**
1. Ir al Home
2. Click en **"Búsqueda inteligente"**
3. Escribir: **"quiero una parcela para inversión"**
4. Click en **"Buscar"**

**Resultado Esperado:**
```
✅ Sistema detecta "inversión"
✅ Aplica filtros:
   - Precio: $50M - $100M (rango medio-alto)
✅ Chip visible: [$50M - $100M] [x]
✅ Muestra parcelas ideales para invertir
```

**Lógica Aplicada:**
- Palabra clave "inversión" → `precio: '50000000-100000000'`

---

### Escenario 7: Búsqueda por Texto - "grande naturaleza"
**Pasos:**
1. Ir al Home
2. Click en **"Búsqueda inteligente"**
3. Escribir: **"parcela grande rodeada de naturaleza"**
4. Click en **"Buscar"**

**Resultado Esperado:**
```
✅ Sistema detecta "grande" y "naturaleza"
✅ Aplica filtros:
   - Ubicación: Aysén
   - Superficie: 10 - 50 hectáreas
✅ Chips visibles: [Aysén] [x]  [10 - 50 hectáreas] [x]
✅ Muestra parcelas grandes en entorno natural
```

**Lógica Aplicada:**
- "naturaleza" → `ubicacion: 'aysen'`, `superficie: '10000-50000'`
- "grande" → `superficie: '100000-500000'`

---

### Escenario 8: Búsqueda por Chips - "Cerca de lago o río"
**Pasos:**
1. Ir al Home
2. Click en **"Búsqueda inteligente"**
3. Se muestran chips de sugerencias
4. Click en chip **"Cerca de lago o río"** (se pone azul)
5. Click en **"Buscar"**

**Resultado Esperado:**
```
✅ Chip "Cerca de lago o río" seleccionado (fondo #124854)
✅ Navega a página de Parcelas
✅ Aplica filtro: Ubicación = Aysén
✅ Chip visible: [Aysén] [x]
✅ Muestra parcelas cercanas a cuerpos de agua
```

---

### Escenario 9: Búsqueda por Chips - "Ideal para inversión"
**Pasos:**
1. Ir al Home
2. Click en **"Búsqueda inteligente"**
3. Click en chip **"Ideal para inversión"**
4. Click en **"Buscar"**

**Resultado Esperado:**
```
✅ Aplica filtro: Precio = $50M - $100M
✅ Chip visible: [$50M - $100M] [x]
✅ Muestra parcelas en rango de inversión
```

---

### Escenario 10: Búsqueda Combinada - Múltiples Chips
**Pasos:**
1. Ir al Home
2. Click en **"Búsqueda inteligente"**
3. Seleccionar chips:
   - **"Rodeado de naturaleza"**
   - **"Con servicios disponibles"**
4. Click en **"Buscar"**

**Resultado Esperado:**
```
✅ Ambos chips seleccionados (azules)
✅ Aplica filtros combinados:
   - Ubicación: Aysén
   - Superficie: 1 - 5 hectáreas
✅ Chips visibles: [Aysén] [x]  [1 - 5 hectáreas] [x]
✅ Muestra parcelas en naturaleza con servicios
```

---

## 🎨 Mapeo de Búsqueda Inteligente

### Palabras Clave → Filtros

| Palabra Clave | Filtro Aplicado | Valor |
|--------------|-----------------|-------|
| "lago", "río" | Ubicación | Aysén |
| "naturaleza", "bosque" | Ubicación + Superficie | Aysén + 1-5 ha |
| "inversión", "invertir" | Precio | $50M - $100M |
| "grande", "amplia" | Superficie | 10 - 50 ha |
| "pequeña", "compacta" | Superficie | Hasta 5.000 m² |
| "barata", "económica" | Precio | $30M - $50M |
| "acceso", "carretera" | Ubicación | Aysén |
| "servicios", "luz", "agua" | Ubicación | Aysén |

### Chips → Filtros

| Chip | Filtro Aplicado |
|------|-----------------|
| "Rodeado de naturaleza" 🌲 | Ubicación: Aysén + Superficie: 1-5 ha |
| "Cerca de lago o río" 🌊 | Ubicación: Aysén |
| "Ideal para inversión" 📈 | Precio: $50M - $100M |
| "Buen acceso" 🚗 | Ubicación: Aysén |
| "Con servicios disponibles" ⚡ | Ubicación: Aysén |

---

## 📊 Dataset de Parcelas Disponibles

### Parcelas en Aysén (4 parcelas):

1. **Parcela Vista al Lago**
   - Ubicación: Chile Chico, Aysén
   - Precio: $45.000.000
   - Superficie: 5.000 m²

2. **Terreno Cordillera**
   - Ubicación: Cochrane, Aysén
   - Precio: $68.500.000
   - Superficie: 10.000 m² (1 ha)

3. **Parcela Agrícola Valle**
   - Ubicación: Coyhaique, Aysén
   - Precio: $95.000.000
   - Superficie: 2,5 ha (25.000 m²)

4. **Terreno Montaña Vista**
   - Ubicación: Puerto Río Tranquilo, Aysén
   - Precio: $52.000.000
   - Superficie: 8.000 m²

5. **Terreno Agrícola El Mirador**
   - Ubicación: Chile Chico, Aysén
   - Precio: $38.000.000
   - Superficie: 8.000 m²

---

## ✅ Checklist de Funcionalidades

### Búsqueda Común
- [x] Filtro de Ubicación funciona
- [x] Filtro de Tipo funciona
- [x] Filtro de Superficie funciona
- [x] Filtro de Condición funciona
- [x] Filtro de Precio funciona
- [x] Combinación de filtros funciona
- [x] Navegación a Parcelas con filtros
- [x] Chips de filtros activos visibles
- [x] Empty state cuando no hay resultados

### Búsqueda Inteligente
- [x] Campo de texto libre funciona
- [x] Detección de palabras clave
- [x] Chips de sugerencias funcionan
- [x] Selección múltiple de chips
- [x] Mapeo de texto a filtros
- [x] Mapeo de chips a filtros
- [x] Navegación con filtros inteligentes
- [x] Expansión/contracción del panel

### Página de Parcelas
- [x] Recibe filtros desde Home
- [x] Muestra chips de filtros activos
- [x] Contador de resultados correcto
- [x] Grid de parcelas filtrado
- [x] Empty state funcional
- [x] Botón "Limpiar filtros" funciona
- [x] Mantiene estructura de página

---

## 🎬 Flujo Completo de Usuario

### Flujo A: Búsqueda Común
```
Home
  ↓
Seleccionar filtros (Ubicación, Precio, Superficie, etc.)
  ↓
Click "Buscar"
  ↓
Página Parcelas
  ↓
Ver resultados filtrados + chips activos
  ↓
[Opcional] Eliminar chip → Recalcula resultados
  ↓
[Opcional] Click "Limpiar filtros" → Muestra todas
```

### Flujo B: Búsqueda Inteligente con Texto
```
Home
  ↓
Click "Búsqueda inteligente"
  ↓
Panel se expande
  ↓
Escribir: "parcela cerca de lago para inversión"
  ↓
Click "Buscar" (con Sparkles)
  ↓
Sistema detecta: "lago" + "inversión"
  ↓
Aplica filtros: Ubicación=Aysén + Precio=$50M-$100M
  ↓
Página Parcelas con resultados
```

### Flujo C: Búsqueda Inteligente con Chips
```
Home
  ↓
Click "Búsqueda inteligente"
  ↓
Panel se expande con chips
  ↓
Click chip "Rodeado de naturaleza"
  ↓
Click chip "Con servicios disponibles"
  ↓
Ambos chips se ponen azules (#124854)
  ↓
Click "Buscar"
  ↓
Aplica filtros combinados
  ↓
Página Parcelas con resultados
```

---

## 🐛 Casos Edge a Verificar

1. **Sin seleccionar nada + "Buscar"**
   - ✅ Debe mostrar todas las parcelas

2. **Búsqueda inteligente vacía + "Buscar"**
   - ✅ Debe mostrar todas las parcelas

3. **Texto sin palabras clave + "Buscar"**
   - ✅ Por defecto busca en Aysén

4. **Solo chips sin texto + "Buscar"**
   - ✅ Aplica filtros según chips seleccionados

5. **Filtro que no devuelve resultados**
   - ✅ Muestra empty state

6. **Cambiar filtros en Parcelas**
   - ✅ Recalcula y muestra nuevos resultados

---

## 🎨 Elementos Visuales

### Chips de Filtros Activos
```
┌─────────────────────────────────────┐
│ 3 parcelas encontradas              │
│                                     │
│ [Aysén] [x]  [$50M-$100M] [x]      │
│                                     │
└─────────────────────────────────────┘
```

### Búsqueda Inteligente Expandida
```
┌─────────────────────────────────────┐
│ Describe lo que buscas...           │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ busco parcela cerca de lago    │ │
│ │                        [Buscar] │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [🌲 Naturaleza] [🌊 Lago] [📈 Inv] │
└─────────────────────────────────────┘
```

---

## 📝 Notas Técnicas

### Estructura de Filtros
```typescript
{
  ubicacion: 'aysen',
  superficie: '10000-50000',
  condicion: '',
  precio: '50000000-100000000',
  tipo: 'parcelas'
}
```

### Función de Búsqueda Inteligente
```typescript
handleSmartSearch() {
  // 1. Analiza texto de búsqueda
  // 2. Detecta palabras clave
  // 3. Mapea a filtros
  // 4. Combina con chips seleccionados
  // 5. Navega a Parcelas con filtros
}
```

---

## ✨ Resultado Final

El usuario puede:
- ✅ Usar buscador común con filtros tradicionales
- ✅ Usar búsqueda inteligente con lenguaje natural
- ✅ Ver resultados filtrados correctamente
- ✅ Identificar filtros activos fácilmente
- ✅ Modificar o eliminar filtros
- ✅ Navegar entre estados de manera fluida

**Sistema completamente funcional y listo para demostración.**
