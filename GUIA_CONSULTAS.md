# Vista de Consultas - Guía de Implementación

## Diferencias Clave por Dashboard

### 📱 Dashboard Personal
```
Características:
- Una sola parcela (el usuario particular solo puede publicar 1 parcela)
- Sin filtros de parcela (no es necesario)
- Vista simplificada
- Sin información de broker o inmobiliaria

Texto header:
"Gestiona todas las consultas sobre tu parcela" (singular)

Datos mostrados:
- Usuario consultante
- Fecha y hora
- Tipo de consulta
- Estado (pendiente/confirmada/cancelada)
- Notas
```

### 🏢 Dashboard Inmobiliaria
```
Características:
- Múltiples parcelas del portafolio
- Filtros: parcela + estado + tipo
- Vista completa con información de asignación

Información adicional:
✓ Broker asignado a cada consulta
  - Nombre completo
  - Email de contacto
  - Teléfono

Ubicación:
- En vista de lista: "Broker: [nombre]" bajo la info del usuario
- En drawer detalle: Panel dedicado con avatar y datos completos

Caso de uso:
"La inmobiliaria puede ver qué broker está gestionando cada consulta
y puede contactarlo directamente si es necesario"
```

### 👤 Dashboard Broker
```
Características:
- Múltiples parcelas gestionadas
- Filtros: parcela + estado + tipo
- Vista completa con información de contexto

Información adicional:
✓ Inmobiliaria propietaria del terreno
  - Nombre de la inmobiliaria
  - Logo (opcional)

Ubicación:
- En vista de lista: "Inmobiliaria: [nombre]" bajo la info del usuario
- En drawer detalle: Panel dedicado con avatar y nombre

Caso de uso:
"El broker puede identificar rápidamente a qué inmobiliaria pertenece
cada terreno consultado para coordinar visitas y seguimiento"
```

## Flujo de Información

### Cuando un usuario hace una consulta:
1. Se crea la consulta con todos los datos del usuario
2. Se asocia automáticamente a la parcela consultada
3. **En dashboard inmobiliaria**: Se asigna un broker responsable
4. **En dashboard broker**: Se identifica la inmobiliaria propietaria
5. El usuario ve la consulta en su dashboard con la información relevante

### Relaciones de datos:
```
Consulta
├── Usuario (quien consulta)
├── Parcela (terreno de interés)
├── Broker (asignado - visible para inmobiliaria)
└── Inmobiliaria (propietaria - visible para broker)
```

## Ejemplos de Uso

### Ejemplo 1: Inmobiliaria "Propiedades del Sur"
```
Ve 3 consultas en total:
- Parcela Vista al Valle (2 consultas)
  → Broker asignado: Carolina Méndez
- Parcela El Refugio (1 consulta)
  → Broker asignado: Patricia Lagos

Puede:
- Ver qué broker está manejando cada lead
- Contactar al broker si necesita seguimiento
- Filtrar por parcela para ver carga de trabajo
- Reasignar brokers si es necesario (futuro)
```

### Ejemplo 2: Broker "Carolina Méndez"
```
Ve consultas de parcelas que gestiona:
- Parcela Vista al Valle (2 consultas)
  → Inmobiliaria: Propiedades del Sur

Puede:
- Identificar a qué inmobiliaria pertenece cada terreno
- Coordinar visitas conociendo el contexto
- Filtrar por inmobiliaria si trabaja con varias
- Ver toda su agenda consolidada
```

### Ejemplo 3: Usuario Particular
```
Ve solo las consultas de su parcela:
- Parcela Vista al Valle (2 consultas)

Puede:
- Ver quién está interesado en su parcela
- Confirmar o reprogramar visitas
- Ver el historial de consultas
- No necesita ver info de brokers (gestión directa)
```

## Consideraciones de UX

### ¿Por qué dashboard personal no muestra broker/inmobiliaria?
- El usuario particular gestiona directamente sus consultas
- No hay intermediarios en el proceso
- Simplifica la interfaz y reduce confusión
- Mantiene el foco en lo esencial: el interesado y la cita

### ¿Por qué dashboard inmobiliaria muestra el broker?
- Las inmobiliarias tienen equipos de brokers
- Necesitan saber quién está atendiendo cada lead
- Facilita coordinación interna y seguimiento
- Permite redistribuir carga si es necesario

### ¿Por qué dashboard broker muestra la inmobiliaria?
- Los brokers pueden trabajar con múltiples inmobiliarias
- Necesitan contexto sobre el propietario del terreno
- Facilita coordinación con la inmobiliaria
- Ayuda a mantener relaciones profesionales claras

## Paleta de Colores Contextual

```css
/* Broker (Dashboard Inmobiliaria) */
.broker-avatar {
  background: #124854; /* Primary - representa al equipo */
  color: white;
}

/* Inmobiliaria (Dashboard Broker) */
.inmobiliaria-avatar {
  background: #462611; /* Secondary - diferenciación visual */
  color: white;
}

/* Usuario consultante (Todos los dashboards) */
.user-avatar {
  background: #124854; /* Primary - consistencia */
  color: white;
}
```

## Notas de Implementación

1. **Campos opcionales**: `broker` e `inmobiliaria` son opcionales en la interface
2. **Renderizado condicional**: Solo se muestran si existen y corresponde al viewType
3. **Links directos**: Email y teléfono son clicables (mailto:, tel:)
4. **Diseño consistente**: Todos los paneles usan el mismo estilo (bg + border)
5. **Responsive**: Los paneles se adaptan a mobile manteniendo legibilidad

## Testing Checklist

- [ ] Dashboard personal muestra solo 1 parcela
- [ ] Dashboard personal NO muestra info de broker/inmobiliaria
- [ ] Dashboard inmobiliaria muestra nombre de broker en lista
- [ ] Dashboard inmobiliaria muestra panel de broker en detalle
- [ ] Dashboard broker muestra nombre de inmobiliaria en lista
- [ ] Dashboard broker muestra panel de inmobiliaria en detalle
- [ ] Links de email y teléfono funcionan correctamente
- [ ] Diseño responsive en mobile
- [ ] Colores del design system aplicados correctamente
