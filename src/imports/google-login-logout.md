completar el flujo de Login con Google y agregar la opción “Cerrar sesión” utilizando la Navbar global existente.

IMPORTANTE:
La Navbar es un componente principal reutilizado en todas las páginas.
No crear una nueva Navbar.
No duplicar componentes.
No desacoplar instancias.
No renombrar capas existentes.

OBJETIVO DEL FLUJO:
Login → Selección cuenta Google → Home logueado → Navegación persistente → Cerrar sesión → Volver a estado visitante.

1) Login
- Mantener el diseño actual intacto.
- Solo agregar interacción al botón "Ingresar con Google".
- Al hacer click → navegar a nuevo frame:
  "Seleccionar cuenta Google".

2) Frame nuevo: "Seleccionar cuenta Google"
- Título: "Elegí una cuenta"
- Lista de cuentas clicables:
   • María Pérez – maria.perez@gmail.com
   • Juan Gómez – juan.gomez@gmail.com
- Al hacer click en una cuenta → navegar a "Home".

3) Navbar global – Sistema de variantes

Modificar el componente Navbar existente agregando una propiedad:

Propiedad: Estado
- Estado = Visitante (actual)
- Estado = Logueado (nuevo)

En "Estado = Logueado":
- Reemplazar botón "Ingresar" por:
   • Avatar circular
   • Texto: "María Pérez"
   • Ícono de dropdown

4) Dropdown del perfil (solo en Estado = Logueado)

Agregar dropdown dentro del mismo componente (no separado):
Opciones:
   • Mi perfil
   • Configuración
   • Cerrar sesión

5) Acción Cerrar sesión
- Al hacer click en "Cerrar sesión":
   - Navegar al frame "Home"
   - Cambiar variante Navbar a "Estado = Visitante"

6) Aplicación del estado

- En el frame "Home", cuando se llega desde selección de cuenta:
   Activar variante Navbar = Logueado.
- Mantener esa variante en todas las páginas que usan la Navbar.
- No crear versiones independientes por página.

RESTRICCIONES:
- No modificar grilla del Home.
- No alterar diseño del Login.
- No cambiar estilos globales.
- No modificar Auto Layout base.
- No romper responsive.
- No tocar otras páginas fuera del flujo descrito.

CRITERIOS DE ACEPTACIÓN:
- Click en "Ingresar con Google" → abre selección de cuenta.
- Click en cuenta → abre Home con Navbar Logueado.
- Dropdown funciona correctamente.
- Click en "Cerrar sesión" → vuelve a Home con Navbar Visitante.
- No hay duplicación de componentes.
- No hay cambios inesperados de layout.