# 👤 Guía: Vendedores Particulares en CompraTuParcela

## ✅ Adaptación Completada

El componente unificado "Publicado por" **ya está completamente preparado** para vendedores particulares sin necesidad de modificaciones adicionales.

---

## 🎯 Principio Fundamental

> **No crear variantes visuales por tipo de vendedor**

El diseño es **idéntico** para:
- ✅ Inmobiliarias
- ✅ Brokers  
- ✅ Vendedores particulares

**Lo único que cambia es el contenido (datos), no la estructura ni el diseño.**

---

## 📋 Contenido Específico para Vendedor Particular

### 1. **Nombre del vendedor**
```typescript
nombre: 'Carlos Muñoz'  // Nombre y apellido del propietario
```

### 2. **Badge de tipo**
```typescript
tipoVendedor: 'Vendedor particular'
```

**Estilos del badge:**
- Fondo: `#F5F5F5`
- Color texto: `#6B6B6B`
- Font size: `10px`
- Padding: `2px 8px`
- Border radius: `4px`

**✅ El badge tiene el MISMO diseño que para Inmobiliaria o Broker**

### 3. **Descripción recomendada**
```typescript
descripcion: 'Propietario directo - Sin intermediarios'
```

**Alternativas válidas:**
- "Propietario directo – Venta sin comisión"
- "Dueño directo de la propiedad"
- "Contacto directo con el propietario"

**Características:**
- ✅ Máximo 2 líneas (con `line-clamp-2`)
- ✅ Transmite cercanía y transparencia
- ✅ Resalta valor de no tener intermediarios

### 4. **Avatar/Logo**
```typescript
logo: 'https://...'  // Foto del vendedor
```

**Características:**
- ✅ Formato circular (48x48px en versión completa, 32x32px en compacta)
- ✅ Borde gris: `border-gray-200`
- ✅ Puede ser foto profesional o casual
- ✅ Fallback automático con `ImageWithFallback`

### 5. **Datos de contacto**
```typescript
telefono: '+56 9 5555 1234'
email: 'carlos.munoz@email.cl'
```

**Visualización:**
- ✅ Iconos de Phone y Mail (lucide-react)
- ✅ Color: `#525252`
- ✅ Font size: `var(--font-size-body-sm)`
- ✅ Separados por borde superior `#E5E5E5`

---

## 🎨 Diseño Visual (Idéntico en todos los casos)

### Versión Completa (Detalle)

```
┌─────────────────────────────────────┐
│  PUBLICADO POR                      │ ← Label uppercase #A3A3A3
│                                     │
│  ●  Carlos Muñoz                    │ ← Avatar 48px + Nombre #0A0A0A
│     [Vendedor particular]           │ ← Badge #F5F5F5 bg
│                                     │
│  Propietario directo –              │ ← Descripción (opcional)
│  Sin intermediarios                 │   Max 2 líneas, #737373
│  ─────────────────────────────────  │
│  📞 +56 9 5555 1234                 │ ← Contacto #525252
│  ✉️  carlos.munoz@email.cl          │
│  ─────────────────────────────────  │
│  [ Contactar ]                      │ ← Botón primario
│  [ Ver perfil → ]                   │ ← Link secundario
└─────────────────────────────────────┘
```

### Versión Compacta (Card)

```
─────────────────────────────
  ● Publicado por
    Carlos Muñoz [Vendedor particular]
─────────────────────────────
```

---

## 💻 Ejemplos de Implementación

### Ejemplo 1: Parcela con Vendedor Particular

```tsx
// En parcelasData.tsx
{
  id: 3,
  nombre: 'Parcela Agrícola Premium',
  // ... otros datos
  inmobiliaria: {
    nombre: 'Carlos Muñoz',
    tipoVendedor: 'Vendedor particular',
    descripcion: 'Propietario directo - Sin intermediarios',
    logo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e...',
    telefono: '+56 9 5555 1234',
    email: 'carlos.munoz@email.cl'
  }
}

// En ParcelaDetalle.tsx (ya implementado)
<PublicadoPor
  nombre={parcela.inmobiliaria.nombre}          // "Carlos Muñoz"
  tipoVendedor={parcela.inmobiliaria.tipoVendedor}  // "Vendedor particular"
  logo={parcela.inmobiliaria.logo}
  descripcion={parcela.inmobiliaria.descripcion}
  telefono={parcela.inmobiliaria.telefono}
  email={parcela.inmobiliaria.email}
  onContactar={() => { /* lógica */ }}
  onVerPerfil={() => {
    onNavigate('vendedor-particular-profile', undefined, parcela.inmobiliaria.nombre);
  }}
/>
```

### Ejemplo 2: Proyecto con Vendedor Particular

```tsx
// En proyectosData.ts
{
  id: 3,
  nombre: 'Parcelas Río Claro',
  // ... otros datos
  publicadoPor: 'Juan Pérez',
  tipoVendedor: 'Vendedor particular',
  imagenVendedor: 'https://images.unsplash.com/photo-1560250097-0b93528c311a...',
  emailVendedor: 'jperez@email.com',
  telefonoVendedor: '+56 9 6543 2109',
}

// En ProyectoDetalle.tsx (ya implementado)
<PublicadoPor
  nombre={proyecto.publicadoPor}           // "Juan Pérez"
  tipoVendedor={proyecto.tipoVendedor}     // "Vendedor particular"
  logo={proyecto.imagenVendedor}
  telefono={proyecto.telefonoVendedor}
  email={proyecto.emailVendedor}
  onContactar={() => { /* lógica */ }}
  onVerPerfil={() => { /* navegar a perfil */ }}
/>
```

### Ejemplo 3: Card en Listado

```tsx
// En ProjectCard.tsx (ya implementado)
<PublicadoPorCompact 
  logo={proyecto.imagenVendedor} 
  nombre={proyecto.publicadoPor}           // "María González"
  tipoVendedor={proyecto.tipoVendedor}     // "Vendedor particular"
/>
```

---

## 🎭 Experiencia de Usuario (UX)

### Objetivos:

1. **Claridad Total**
   - ✅ El usuario entiende inmediatamente que trata con un propietario directo
   - ✅ Badge "Vendedor particular" es descriptivo y transparente

2. **Transmitir Confianza**
   - ✅ Mismo diseño profesional que inmobiliarias
   - ✅ No se diferencia visualmente (no hay discriminación)
   - ✅ Datos de contacto visibles y verificables

3. **Cercanía y Accesibilidad**
   - ✅ Descripción "Propietario directo - Sin intermediarios" humaniza
   - ✅ Foto personal genera conexión
   - ✅ Botón "Contactar" igual de prominente

4. **Consistencia**
   - ✅ Navegación predecible ("Ver perfil" funciona igual)
   - ✅ Mismo patrón visual en toda la plataforma

---

## 📊 Datos Reales en la Plataforma

### Vendedores Particulares Existentes:

**En Parcelas:**
1. **Carlos Muñoz** (ID: 3)
   - Parcela: "Parcela Agrícola Premium"
   - Ubicación: Coyhaique, Aysén
   - Descripción: "Propietario directo - Sin intermediarios"

**En Proyectos:**
1. **Juan Pérez** (ID: 3)
   - Proyecto: "Parcelas Río Claro"
   - Ubicación: Los Ángeles, Biobío
   - Tipo: Agrícola

2. **María González** (ID: 6)
   - Proyecto: "Parcelas Bosque Nativo"
   - Ubicación: Valdivia, Los Ríos
   - Tipo: Turístico

---

## 🔧 Tipos de Datos Actualizados

### En proyectosData.ts:
```typescript
tipoVendedor: 'Inmobiliaria' | 'Broker' | 'Vendedor particular'
```

### En parcelasData.tsx:
```typescript
tipoVendedor: string  // Acepta cualquier valor, incluido 'Vendedor particular'
```

---

## ✅ Checklist de Validación

Para asegurar que un vendedor particular se muestra correctamente:

- [ ] ✅ Nombre completo (nombre + apellido)
- [ ] ✅ `tipoVendedor: 'Vendedor particular'`
- [ ] ✅ Descripción que transmita cercanía (ej: "Propietario directo")
- [ ] ✅ Avatar/foto del vendedor
- [ ] ✅ Teléfono con formato `+56 9 XXXX XXXX`
- [ ] ✅ Email válido
- [ ] ✅ Callback `onVerPerfil` apunta a perfil de vendedor particular

---

## 🎯 Mensajes Clave

### Para Vendedores Particulares:
> "Vende tu parcela sin intermediarios con toda la profesionalidad de una plataforma confiable"

### Para Compradores:
> "Conecta directamente con el propietario, sin comisiones adicionales ni intermediarios"

---

## 🚫 Lo que NO debes hacer

❌ **NO crear un componente diferente para vendedores particulares**
❌ **NO cambiar colores, tamaños o estilos según tipo de vendedor**
❌ **NO agregar campos extra solo para vendedores particulares**
❌ **NO modificar la jerarquía visual**
❌ **NO usar terminología diferente** (todos dicen "Contactar", "Ver perfil")

---

## ✅ Resultado Final

**Vendedores particulares:**
- ✅ Tienen el mismo peso visual que inmobiliarias
- ✅ Generan la misma confianza
- ✅ Ofrecen la misma experiencia de usuario
- ✅ Se integran perfectamente en el sistema

**Sin:**
- ❌ Crear variantes visuales
- ❌ Discriminación en el diseño
- ❌ Duplicación de código
- ❌ Complejidad innecesaria

---

## 📞 Soporte

Si necesitas agregar un nuevo vendedor particular:

1. Agrega la entrada en `/src/app/data/parcelasData.tsx` o `/src/app/data/proyectosData.ts`
2. Asegúrate de usar `tipoVendedor: 'Vendedor particular'`
3. Usa descripción clara tipo: "Propietario directo - Sin intermediarios"
4. El componente `PublicadoPor` se encargará del resto automáticamente

**No necesitas modificar ningún componente visual.** 🎉
