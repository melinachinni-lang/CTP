# 🎬 Demo Script: Buscador de Parcelas

## 🎯 Introducción (30 segundos)

> "Hoy vamos a demostrar el **buscador de parcelas** de CompraTuParcela, que permite a los usuarios encontrar exactamente lo que buscan usando **filtros tradicionales** o **búsqueda inteligente con lenguaje natural**."

---

## 📋 Demo 1: Búsqueda Común (2 minutos)

### Preparación
- Estar en el Home
- Mostrar el buscador hero

### Script
```
👉 "Imaginemos que un usuario busca parcelas en Aysén 
    con un presupuesto entre 50 y 100 millones."

ACCIÓN 1: Seleccionar dropdown "Ubicación"
→ "El sistema ofrece las 16 regiones de Chile"

ACCIÓN 2: Seleccionar "Aysén"
→ "Seleccionamos Aysén, la región patagónica"

ACCIÓN 3: Seleccionar dropdown "Rango de precio"
→ "Aquí tenemos 6 rangos de precio"

ACCIÓN 4: Seleccionar "$50M - $100M"
→ "Seleccionamos el rango de inversión medio"

ACCIÓN 5: Click "Buscar"
→ "Al hacer click en Buscar..."

RESULTADO:
✅ "El sistema navega a la página de Parcelas"
✅ "Vemos que encontró 2 parcelas"
✅ "Los filtros aplicados aparecen como chips"
✅ "Cada chip tiene una X para eliminarlo"
✅ "El grid muestra solo las parcelas que cumplen ambos criterios"

DESTACAR:
→ "Noten que la estructura de la página se mantiene:
   - Navbar arriba
   - Buscador disponible para refinar
   - Grid de 2 columnas con las parcelas"
```

### Puntos Clave
- ✅ Filtros precisos
- ✅ Navegación fluida
- ✅ Chips visibles y removibles
- ✅ Resultados acordes

---

## ✨ Demo 2: Búsqueda Inteligente - Texto (2 minutos)

### Preparación
- Volver al Home (click en logo)

### Script
```
👉 "Ahora veamos algo más innovador: la búsqueda inteligente.
    Imaginemos un usuario que no quiere usar filtros,
    simplemente quiere describir lo que busca."

ACCIÓN 1: Click botón "Búsqueda inteligente" (con ícono ✨)
→ "Al hacer click, se expande un panel con un campo de texto"

ACCIÓN 2: Escribir en el campo
"busco una parcela cerca de un lago para inversión"
→ "El usuario escribe en lenguaje natural, como hablaría normalmente"

ACCIÓN 3: Click "Buscar" (botón con ✨)
→ "El sistema analiza el texto..."

RESULTADO:
✅ "Detectó dos palabras clave: 'lago' e 'inversión'"
✅ "Automáticamente aplicó:"
   - Ubicación: Aysén (región con lagos)
   - Precio: $50M-$100M (rango de inversión)
✅ "Vemos los mismos chips que si los hubiera seleccionado manualmente"
✅ "Resultados: 2 parcelas que cumplen ambos criterios"

DESTACAR:
→ "El usuario no necesita conocer la estructura de filtros
   El sistema interpreta su intención y busca por él"
```

### Puntos Clave
- ✅ Lenguaje natural
- ✅ Detección de palabras clave
- ✅ Mapeo automático a filtros
- ✅ Misma precisión que búsqueda común

---

## 🏷️ Demo 3: Búsqueda Inteligente - Chips (1.5 minutos)

### Preparación
- Volver al Home

### Script
```
👉 "Para usuarios que prefieren algo visual,
    ofrecemos chips de búsqueda predefinidos."

ACCIÓN 1: Click "Búsqueda inteligente"
→ "El panel muestra 5 chips interactivos"

ACCIÓN 2: Click chip "Rodeado de naturaleza" 🌲
→ "El chip se pone azul, indicando que está seleccionado"

ACCIÓN 3: Click chip "Ideal para inversión" 📈
→ "Podemos combinar múltiples chips"
→ "Ambos están azules ahora"

ACCIÓN 4: Click "Buscar"

RESULTADO:
✅ "El sistema combinó ambos criterios:"
   - Naturaleza → Aysén + superficie mediana
   - Inversión → Precio $50M-$100M
✅ "Chips resultantes: [Aysén] [$50M-$100M] [1-5 ha]"
✅ "Parcelas que están en naturaleza Y son buena inversión"

DESTACAR:
→ "Es como tener un asesor que traduce lo que quieres
   en criterios técnicos de búsqueda"
```

### Puntos Clave
- ✅ Visual e intuitivo
- ✅ Selección múltiple
- ✅ Combinación inteligente
- ✅ Feedback inmediato (color)

---

## ❌ Demo 4: Empty State (1 minuto)

### Preparación
- Estar en Home

### Script
```
👉 "¿Qué pasa cuando no hay resultados?"

ACCIÓN 1: Seleccionar "Ubicación: Región Metropolitana"
ACCIÓN 2: Click "Buscar"

RESULTADO:
✅ "El sistema muestra un estado claro:"
   - Ícono de mapa
   - "No encontramos parcelas con estos filtros"
   - Texto explicativo útil
   - Dos acciones: Limpiar filtros / Volver al inicio
✅ "No deja al usuario perdido"
✅ "Ofrece alternativas concretas"

ACCIÓN 3: Click "Limpiar filtros"

RESULTADO:
✅ "Elimina todos los filtros"
✅ "Muestra todas las parcelas disponibles (5)"
✅ "El usuario puede empezar de nuevo"

DESTACAR:
→ "El sistema es transparente: explica por qué no hay resultados
   y ayuda al usuario a encontrar lo que busca"
```

### Puntos Clave
- ✅ No frustra al usuario
- ✅ Mensaje claro y útil
- ✅ Acciones concretas
- ✅ Fácil recuperación

---

## 🔄 Demo 5: Modificar Filtros (1 minuto)

### Preparación
- Tener filtros aplicados en Parcelas

### Script
```
👉 "Los usuarios pueden refinar su búsqueda en cualquier momento"

ACCIÓN 1: En página Parcelas, click [x] en chip "Aysén"
→ "El filtro se elimina inmediatamente"
→ "Los resultados se recalculan"

ACCIÓN 2: Click [x] en chip de precio
→ "Ahora solo queda el filtro de superficie"

DESTACAR:
→ "Control total en tiempo real
   El usuario puede explorar diferentes combinaciones"
```

### Puntos Clave
- ✅ Modificación en tiempo real
- ✅ Feedback inmediato
- ✅ Control granular
- ✅ Exploración fluida

---

## 🎨 Puntos de Diseño a Destacar

Durante la demo, mencionar:

### Design System
- **Colores consistentes**: #124854 (Primary) en todos los botones principales
- **Tipografía clara**: Montserrat para títulos, Inter para cuerpo
- **Espaciado uniforme**: Uso de variables CSS
- **Interactividad**: Hover states, transiciones suaves

### Voz y Tono
- **Clara**: Mensajes directos sin tecnicismos
- **Confiable**: Muestra exactamente lo que encuentra
- **Profesional**: Presentación pulida
- **Acompañante**: Sugiere alternativas, no frustra
- **Realista**: Explica cuando no hay resultados

---

## 📊 Datos para la Demo

### Parcelas Disponibles (5)
1. Parcela Vista al Lago - $45M - 5.000 m²
2. Terreno Cordillera - $68.5M - 1 ha
3. Parcela Agrícola Valle - $95M - 2,5 ha
4. Terreno Montaña Vista - $52M - 8.000 m²
5. Terreno Agrícola El Mirador - $38M - 8.000 m²

### Combinaciones que Funcionan
- Aysén → 5 parcelas
- Aysén + $50M-$100M → 2 parcelas
- Aysén + 1-5 ha → 2-3 parcelas

### Combinaciones Empty State
- Región Metropolitana → 0 parcelas
- Precio > $200M → 0 parcelas

---

## 🎯 Mensajes Clave

### Para el Usuario
> "Encuentra parcelas usando filtros tradicionales o simplemente describe lo que buscas en lenguaje natural"

### Para el Negocio
> "Sistema inteligente que reduce fricción en la búsqueda y aumenta la probabilidad de conversión"

### Para el Equipo
> "Implementación completa con design system, estados de error, y experiencia fluida"

---

## ⏱️ Timing Sugerido

| Demo | Tiempo | Acumulado |
|------|--------|-----------|
| Introducción | 0:30 | 0:30 |
| Búsqueda Común | 2:00 | 2:30 |
| Búsqueda Inteligente - Texto | 2:00 | 4:30 |
| Búsqueda Inteligente - Chips | 1:30 | 6:00 |
| Empty State | 1:00 | 7:00 |
| Modificar Filtros | 1:00 | 8:00 |
| Q&A | 2:00 | 10:00 |

**Total: 10 minutos** (incluye Q&A)

---

## 🎤 Frases de Cierre

> "Como pueden ver, el buscador de CompraTuParcela ofrece:
> - ✅ **Flexibilidad**: Dos formas de buscar según preferencia del usuario
> - ✅ **Inteligencia**: Interpreta lenguaje natural y mapea a filtros precisos
> - ✅ **Transparencia**: Muestra exactamente qué filtros están activos
> - ✅ **Control**: El usuario puede modificar en cualquier momento
> - ✅ **Diseño**: Consistente con el design system de la marca
> 
> El sistema está completamente funcional y listo para producción."

---

## 📝 Preguntas Frecuentes Anticipadas

**P: ¿Qué pasa si el texto no tiene palabras clave reconocidas?**
R: Por defecto busca en Aysén (región principal del dataset). En producción, mostraría todas las parcelas.

**P: ¿Se pueden combinar búsqueda común e inteligente?**
R: Sí, el usuario puede usar ambas en la misma sesión. Los filtros se combinan.

**P: ¿Cuántos chips se pueden seleccionar?**
R: Todos los que quiera. El sistema los combina inteligentemente.

**P: ¿Los filtros persisten al navegar?**
R: Sí, al navegar a una parcela y volver, los filtros se mantienen.

**P: ¿Funciona en mobile?**
R: El diseño actual es desktop, pero la estructura está preparada para responsive.

---

## ✅ Checklist Pre-Demo

Antes de iniciar:
- [ ] Navegador en pantalla completa
- [ ] Aplicación corriendo (localhost:5173)
- [ ] Empezar en Home
- [ ] Sin filtros aplicados
- [ ] Cerrar otras pestañas
- [ ] Preparar notas de puntos clave
- [ ] Timer a la vista (opcional)

---

**Demo preparada y lista para presentar. ✨**
