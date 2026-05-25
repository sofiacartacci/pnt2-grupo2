# CineORT

Trabajo Práctico Integrador para la materia Programación en Nuevas Tecnologías 2 (PNT2) del Instituto Tecnológico ORT Argentina.

CineORT es una aplicación web de gestión de cines. Permite explorar la cartelera, ver detalles de películas, seleccionar butacas y realizar compras de entradas. Cuenta con un panel de administración para la gestión interna.

---

## Stack tecnológico

- **Vue.js 3** como framework principal
- **Vite** como build tool y servidor de desarrollo
- **Vue Router** para la navegación SPA
- **Pinia** para el manejo de estado global
- **MockAPI** como backend simulado (REST)
- **CSS3** con variables para el diseño responsive

---

## Funcionalidades

Para usuarios:
- Exploración de la cartelera con carrusel de películas destacadas
- Vista detallada de cada película con trailer y funciones disponibles
- Filtrado de funciones por día
- Selección interactiva de butacas
- Flujo de compra completo
- Registro e inicio de sesión

Para administradores:
- Panel de administración protegido por rol
- Gestión de películas, funciones y cines

Generales:
- Autenticación con dos roles (cliente y admin)
- Rutas protegidas mediante route guards
- Persistencia de sesión en localStorage

---

## Estructura del proyecto
pnt2_grupo_2/
├── public/
├── src/
│   ├── assets/              Imágenes, logos y estilos globales
│   ├── components/          Componentes reutilizables
│   ├── router/              Configuración de Vue Router
│   ├── services/            Capa de comunicación con la API
│   ├── stores/              Estado global con Pinia
│   ├── view/                Vistas principales (páginas)
│   ├── App.vue
│   └── main.js
├── index.html
├── vite.config.js
└── package.json

### Decisiones de organización

La carpeta `services/` aísla todas las llamadas a la API. Las vistas y los stores no hacen `fetch` directo, lo que permitiría cambiar el backend en el futuro sin tocar la UI.

La carpeta `stores/` centraliza el estado global usando Pinia, separado por dominio: `AuthStore` para autenticación, `cineStore` para películas y cines, y `comprasStore` para el flujo de compra.

Se distinguen `components/` (piezas reutilizables) de `view/` (páginas completas asociadas a una ruta).

En `router/index.js` las rutas protegidas se declaran mediante `meta: { requiereLogin, requiereAdmin }`, evitando repetir lógica de validación en cada vista.

---

## Instalación

Requisitos previos: Node.js (versión LTS recomendada) y npm.

```sh
git clone <url-del-repo>
cd pnt2_grupo_2
npm install
```

### Comandos disponibles

```sh
npm run dev       # Servidor de desarrollo con hot-reload
npm run build     # Build de producción
npm run preview   # Preview del build
```

Una vez levantado el servidor, abrir http://localhost:5173 en el navegador.

---

## API

El backend está simulado con MockAPI. Debido a la limitación del plan gratuito (2 recursos por proyecto), la API se divide en 3 proyectos:

Proyecto A — Usuarios y Películas:
- `https://6a03b7662afe8349b4b5717d.mockapi.io/api/v1/usuarios`
- `https://6a03b7662afe8349b4b5717d.mockapi.io/api/v1/peliculas`

Proyecto B — Funciones y Compras:
- `https://6a03cd8b2afe8349b4b5823d.mockapi.io/api/v1/funciones`
- `https://6a03cd8b2afe8349b4b5823d.mockapi.io/api/v1/compras`

Proyecto C - Cines
- `https://6a11d9c03e35d0f37ee3c133.mockapi.io/cines`

---

## IDE recomendado

VS Code con la extensión Vue (Official) instalada. Si se tenía Vetur, conviene deshabilitarla.

---

## Equipo

Grupo 2 — PNT2 — Instituto Tecnológico ORT Argentina

Profesor: Gaspar De Carlo  
Año: 2026