# CineORT

Aplicación web para una cadena de cines, hecha como trabajo integrador de la materia Programación en Nuevas Tecnologías 2 (PNT2) en el Instituto Tecnológico ORT.

La idea es básicamente lo que uno esperaría de la página de un cine: ver la cartelera, entrar al detalle de una película, elegir una función, seleccionar butacas y comprar la entrada. Aparte hay un panel de administración con estadísticas de ventas.

## Integrantes

- Eduardo Calaza
- Juan Ferreyra
- Martín Méndez
- Sofía Cartacci

Cada uno tomó una parte del proyecto, pero la app está pensada para funcionar como un solo flujo de punta a punta.

## Qué hace

- Cartelera con las películas en cartel y su detalle (sinopsis, trailer, funciones por día).
- Selección de cine. La app maneja dos sedes (Almagro y Belgrano) y la elección queda guardada para el resto de la navegación.
- Selección de butacas con una grilla interactiva: cada butaca puede estar libre, seleccionada u ocupada, y el total se actualiza solo a medida que vas eligiendo.
- Checkout y ticket de compra.
- Registro e inicio de sesión, con rutas protegidas según si sos cliente o administrador.
- Panel de admin con métricas del negocio: ingresos totales, cantidad de compras, ticket promedio, ranking de películas más y menos vendidas, ventas por género e ingresos por mes.

## Tecnologías

- Vue 3 (Composition API con `<script setup>`)
- Vite
- Pinia para el manejo de estado
- Vue Router
- ApexCharts para los gráficos del panel de admin
- MockAPI como backend simulado

## Sobre la persistencia

Usamos MockAPI para simular el backend. Un detalle que nos comió bastante tiempo: el plan gratuito deja solo 2 recursos por proyecto, así que tuvimos que repartir las entidades en varios proyectos de MockAPI (películas y usuarios por un lado, compras y funciones por otro, y los cines aparte). Las URLs están en los archivos de `src/services`.

Toda la comunicación con la API pasa por la capa de services. Los stores consumen esos services y los componentes consumen los stores, así que ningún componente le pega directo a la API.

## Cómo levantarlo

Necesitás Node instalado (versión 20 o superior).

```sh
npm install
npm run dev
```

Eso levanta el servidor.

Para generar el build de producción:

```sh
npm run build
```

Un par de cosas a tener en cuenta:

- `node_modules` no está en el repo, así que después de clonar o de cambiar de rama hay que correr `npm install` de nuevo.
- Como la sesión y el cine elegido se guardan en localStorage, si en algún momento ves datos raros conviene limpiar el localStorage del navegador y volver a entrar.

## Estructura

```
src/
├── components/     componentes reutilizables (cartelera, carrousel, popups, etc.)
├── services/       funciones que hablan con MockAPI
├── stores/         stores de Pinia (auth, cine, compras)
├── view/           las vistas / páginas
├── router/         rutas y guards
└── assets/         estilos e imágenes
```