# Validación de Consistencia - Fichas de Proyecto

## ✅ Estado Actual

### Estructura de secciones (Orden CORRECTO):

1. **Hero con galería de imágenes** ✅ Siempre visible
2. **Información general** ✅ Siempre visible (4 cards: Total parcelas, Disponibles, Superficie desde/hasta)
3. **Sobre el proyecto** ✅ Siempre visible (Descripción completa)
4. **Características** ⚠️ CONDICIONAL - Se oculta si no hay datos
5. **Planos y documentos** ⚠️ CONDICIONAL - Se oculta si no hay datos
6. **Masterplan** ✅ Siempre visible
7. **Ubicación** ✅ Siempre visible (con tabs Mapa/Entorno)
8. **Información del entorno** ⚠️ CONDICIONAL - Se oculta si no hay datos
9. **Parcelas disponibles** ⚠️ CONDICIONAL - Se oculta si no hay datos
10. **Sidebar** ✅ Siempre visible (Precio + Contacto)

## ❌ Problemas Identificados

### 1. Secciones con visibilidad condicional
Las siguientes secciones se ocultan completamente cuando no tienen datos:

- **Línea ~475**: Características - `{(proyecto.caracteristicasTerreno || ...) && (`
- **Línea ~642**: Planos y documentos - `{(proyecto.plano || ...) && (`  
- **Línea ~854**: Información del entorno - `{proyecto.entorno && (`
- **Línea ~1043**: Parcelas disponibles - `{proyecto.parcelasDelProyecto && proyecto.parcelasDelProyecto.length > 0 && (`

### 2. Impacto en consistencia

Cuando un proyecto no tiene ciertos datos, su layout cambia completamente:
- Diferentes alturas de página
- Diferentes secuencias visuales
- El usuario no reconoce que está viendo el mismo tipo de ficha

## ✅ Solución Requerida

### Cambios a implementar:

#### 1. Sección "Características" (líneas 474-639)
**ANTES:**
```tsx
{(proyecto.caracteristicasTerreno || proyecto.caracteristicasServicios || proyecto.caracteristicasLegal) && (
  <div className="bg-white rounded-xl border border-gray-200 p-8">
    <h2>Características</h2>
    <div className="space-y-6">
      {/* contenido */}
    </div>
  </div>
)}
```

**DESPUÉS:**
```tsx
<div className="bg-white rounded-xl border border-gray-200 p-8">
  <h2>Características</h2>
  {(proyecto.caracteristicasTerreno || proyecto.caracteristicasServicios || proyecto.caracteristicasLegal) ? (
    <div className="space-y-6">
      {/* contenido */}
    </div>
  ) : (
    <div className="text-center py-8">
      <p style={emptyStateStyle}>
        Información de características en proceso de actualización
      </p>
    </div>
  )}
</div>
```

#### 2. Sección "Planos y documentos" (líneas 641-743)
**ANTES:**
```tsx
{(proyecto.plano || (proyecto.documentos && proyecto.documentos.length > 0)) && (
  <div className="bg-white rounded-xl border border-gray-200 p-8">
    {/* contenido */}
  </div>
)}
```

**DESPUÉS:**
```tsx
<div className="bg-white rounded-xl border border-gray-200 p-8">
  <h2>Planos y documentos</h2>
  {(proyecto.plano || (proyecto.documentos && proyecto.documentos.length > 0)) ? (
    <div>
      {/* contenido existente */}
    </div>
  ) : (
    <div className="text-center py-8">
      <p style={emptyStateStyle}>
        Documentación en preparación
      </p>
    </div>
  )}
</div>
```

#### 3. Sección "Información del entorno" (líneas 853-1041)
**ANTES:**
```tsx
{proyecto.entorno && (
  <div className="mt-16 pt-12" style={{ borderTop: '1px solid #E5E5E5' }}>
    {/* contenido */}
  </div>
)}
```

**DESPUÉS:**
```tsx
<div className="mt-16 pt-12" style={{ borderTop: '1px solid #E5E5E5' }}>
  <div className="mb-8">
    <h2>Información del entorno</h2>
    <p>Conoce más sobre el área y contexto de este proyecto</p>
  </div>
  
  {proyecto.entorno ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* contenido existente */}
    </div>
  ) : (
    <div className="text-center py-12">
      <p style={emptyStateStyle}>
        Información del entorno en preparación
      </p>
    </div>
  )}
</div>
```

#### 4. Sección "Parcelas disponibles" (líneas 1042-1120)
**ANTES:**
```tsx
{proyecto.parcelasDelProyecto && proyecto.parcelasDelProyecto.length > 0 && (
  <div className="bg-white rounded-xl border border-gray-200 p-8">
    {/* contenido */}
  </div>
)}
```

**DESPUÉS:**
```tsx
<div className="bg-white rounded-xl border border-gray-200 p-8">
  <h2>Parcelas disponibles</h2>
  
  {proyecto.parcelasDelProyecto && proyecto.parcelasDelProyecto.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* contenido existente */}
    </div>
  ) : (
    <div className="text-center py-12">
      <p style={emptyStateStyle}>
        No hay parcelas individuales disponibles en este momento
      </p>
    </div>
  )}
</div>
```

## 📋 Checklist de Validación

- [ ] Todas las secciones se muestran en el mismo orden en todos los proyectos
- [ ] No hay condicionales que oculten secciones completas
- [ ] Estados vacíos son consistentes y bien diseñados
- [ ] Todos los proyectos tienen exactamente el mismo layout visual
- [ ] Solo varía el contenido, nunca la estructura
- [ ] Se respetan las variables CSS del design system
- [ ] Tipografía consistente en todos los textos

## 🎨 Estilo de Estados Vacíos

```tsx
const emptyStateStyle = {
  fontFamily: 'var(--font-body)',
  color: '#A3A3A3',
  fontSize: 'var(--font-size-body-sm)',
  lineHeight: 'var(--line-height-body)'
};
```

## ✅ Resultado Esperado

Después de estos cambios:
- ✅ Todas las fichas de proyecto mostrarán exactamente las mismas 10 secciones
- ✅ En el mismo orden
- ✅ Con la misma jerarquía visual
- ✅ Solo variando el contenido específico de cada proyecto
- ✅ Estados vacíos claros y profesionales cuando no hay datos
