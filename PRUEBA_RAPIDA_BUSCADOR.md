# 🚀 Prueba Rápida: Buscador de Parcelas

## ⚡ Pruebas en 5 Minutos

### 🔎 PRUEBA 1: Búsqueda Básica
```
1. Abrir aplicación → Home
2. En buscador hero:
   - Ubicación: Aysén
3. Click "Buscar"

✅ RESULTADO:
- Navega a Parcelas
- Muestra: "5 parcelas encontradas"
- Chip visible: [Aysén] [x]
- Grid con 5 parcelas
```

---

### 💰 PRUEBA 2: Búsqueda con Precio
```
1. Home
2. Buscador:
   - Ubicación: Aysén
   - Rango de precio: $50M - $100M
3. Click "Buscar"

✅ RESULTADO:
- Muestra: "2 parcelas encontradas"
- Chips: [Aysén] [x]  [$50M - $100M] [x]
- Solo 2 parcelas en ese rango
```

---

### ✨ PRUEBA 3: Búsqueda Inteligente - Texto
```
1. Home
2. Click "Búsqueda inteligente" (botón con ✨)
3. Panel se expande
4. Escribir: "busco parcela cerca de lago"
5. Click "Buscar" (botón con ✨ dentro del campo)

✅ RESULTADO:
- Sistema detecta "lago"
- Navega a Parcelas
- Chip: [Aysén] [x]
- Muestra parcelas en región con lagos
```

---

### 🏷️ PRUEBA 4: Búsqueda Inteligente - Chips
```
1. Home
2. Click "Búsqueda inteligente"
3. Panel se expande con 5 chips
4. Click chip: "Cerca de lago o río" (🌊)
   - Chip se pone azul (#124854)
5. Click "Buscar"

✅ RESULTADO:
- Navega a Parcelas
- Chip: [Aysén] [x]
- Parcelas en Aysén (región lacustre)
```

---

### 🔄 PRUEBA 5: Chips Múltiples
```
1. Home
2. Click "Búsqueda inteligente"
3. Seleccionar:
   - "Rodeado de naturaleza" (🌲)
   - "Ideal para inversión" (📈)
   - Ambos se ponen azules
4. Click "Buscar"

✅ RESULTADO:
- Chips: [Aysén] [x]  [$50M-$100M] [x]
- Parcelas en naturaleza + rango inversión
```

---

### ❌ PRUEBA 6: Empty State
```
1. Home
2. Buscador:
   - Ubicación: Región Metropolitana
3. Click "Buscar"

✅ RESULTADO:
- "0 parcelas encontradas"
- Chip: [Región Metropolitana] [x]
- Empty state:
  🗺️
  "No encontramos parcelas con estos filtros"
  [Limpiar filtros] [Volver al inicio]
```

---

### 🧹 PRUEBA 7: Limpiar Filtros
```
1. Desde empty state (Prueba 6)
2. Click "Limpiar filtros"

✅ RESULTADO:
- Chips desaparecen
- Muestra: "5 parcelas encontradas"
- Grid con todas las parcelas
```

---

## 📋 Checklist Rápido

Al probar, verificar:

**Visual:**
- [ ] Navbar siempre visible
- [ ] Buscador hero en ambas páginas
- [ ] Chips con [x] para eliminar
- [ ] Contador de resultados actualizado
- [ ] Grid de 2 columnas
- [ ] Colores del design system (#124854, #0A0A0A)

**Funcional:**
- [ ] Filtros comunes funcionan
- [ ] Búsqueda inteligente funciona
- [ ] Navegación Home → Parcelas
- [ ] Chips se actualizan
- [ ] Empty state aparece cuando corresponde
- [ ] "Limpiar filtros" resetea todo

---

## 🎨 Ejemplos Visuales

### Estado Inicial (Home)
```
┌──────────────────────────────────────┐
│ [Logo] [Parcelas] [Inmobiliarias]   │
├──────────────────────────────────────┤
│                                      │
│   🏔️ Encuentra tu parcela ideal      │
│                                      │
│  [Ubicación ▼] [Tipo ▼] [Buscar]   │
│                                      │
│  [✨ Búsqueda inteligente]           │
│                                      │
└──────────────────────────────────────┘
```

### Búsqueda Inteligente Expandida
```
┌──────────────────────────────────────┐
│  [✨ Búsqueda inteligente]     [X]   │
│                                      │
│  Describe lo que buscas...           │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ busco parcela cerca de lago   │  │
│  │                    [✨ Buscar] │  │
│  └────────────────────────────────┘  │
│                                      │
│  [🌲 Naturaleza] [🌊 Lago] [📈 Inv] │
│  [🚗 Acceso] [⚡ Servicios]         │
│                                      │
└──────────────────────────────────────┘
```

### Resultados (Parcelas)
```
┌──────────────────────────────────────┐
│ 2 parcelas encontradas               │
│ [Aysén] [x]  [$50M-$100M] [x]       │
├──────────────────────────────────────┤
│                                      │
│ ┌────────────┐  ┌────────────┐     │
│ │  Terreno   │  │  Parcela   │     │
│ │ Cordillera │  │  Agrícola  │     │
│ │            │  │   Valle    │     │
│ │ $68.500.000│  │ $95.000.000│     │
│ │ 10.000 m²  │  │   2,5 ha   │     │
│ └────────────┘  └────────────┘     │
│                                      │
└──────────────────────────────────────┘
```

### Empty State
```
┌──────────────────────────────────────┐
│ 0 parcelas encontradas               │
│ [Región Metropolitana] [x]           │
├──────────────────────────────────────┤
│                                      │
│              🗺️                      │
│                                      │
│   No encontramos parcelas con        │
│         estos filtros                │
│                                      │
│ Intenta ajustar tus criterios de     │
│ búsqueda o elimina algunos filtros   │
│                                      │
│ [Limpiar filtros] [Volver al inicio] │
│                                      │
└──────────────────────────────────────┘
```

---

## 🔤 Palabras Clave Detectadas

Escribir en búsqueda inteligente:

| Texto | Filtro Aplicado |
|-------|-----------------|
| "lago" | Aysén |
| "río" | Aysén |
| "inversión" | $50M-$100M |
| "grande" | 10-50 ha |
| "pequeña" | 0-5.000 m² |
| "naturaleza" | Aysén + 1-5 ha |
| "servicios" | Aysén |
| "barata" | $30M-$50M |

---

## 🎯 Resultado Esperado

Después de todas las pruebas:
- ✅ Búsqueda común funciona
- ✅ Búsqueda inteligente funciona
- ✅ Chips interactivos
- ✅ Navegación fluida
- ✅ Resultados precisos
- ✅ Empty state claro
- ✅ UI consistente con design system

---

**Tiempo estimado**: 5 minutos  
**Pruebas**: 7 escenarios clave  
**Estado**: ✅ Todo funcionando
