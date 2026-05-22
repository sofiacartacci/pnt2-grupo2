<script setup>
import { ref, computed, onMounted } from "vue";

import { getPeliculas } from "../services/PeliculasServices";
import { getCompras } from "../services/ComprasServices";
import { getFunciones } from "../services/FuncionesServices";

const peliculas = ref([]);
const compras = ref([]);
const funciones = ref([]);

const cargando = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    peliculas.value = await getPeliculas();
    compras.value = await getCompras();
    funciones.value = await getFunciones();
  } catch (e) {
    error.value = "Hubo un problema al cargar los datos";
  } finally {
    cargando.value = false;
  }
});

const ingresosTotales = computed(() => {
  return compras.value.reduce((total, compra) => total + compra.total, 0);
});

const cantidadCompras = computed(() => {
  return compras.value.length;
});

const usuariosUnicos = computed(() => {
  const ids = compras.value.map((compra) => compra.usuarioId);
  return new Set(ids).size;
});

const ventasPorPelicula = computed(() => {
  const conteo = {};

  peliculas.value.forEach((pelicula) => {
    conteo[pelicula.id] = {
      id: pelicula.id,
      titulo: pelicula.titulo,
      genero: pelicula.genero,
      cantidad: 0,
      ingresos: 0,
    };
  });

  compras.value.forEach((compra) => {
    const funcion = funciones.value.find((f) => f.id === compra.funcionId);

    if (funcion) {
      const peliculaId = funcion.peliculaId;

      if (conteo[peliculaId]) {
        conteo[peliculaId].cantidad++;
        conteo[peliculaId].ingresos += compra.total;
      }
    }
  });

  return Object.values(conteo).sort((a, b) => b.cantidad - a.cantidad);
});

const top5Peliculas = computed(() => {
  return ventasPorPelicula.value.slice(0, 5);
});

const peoresPeliculas = computed(() => {
  return [...ventasPorPelicula.value].reverse().slice(0, 3);
});

function obtenerMes(fechaStr) {
  if (!fechaStr) return "Sin fecha";

  if (fechaStr.includes("-")) {
    return fechaStr.slice(0, 7);
  }

  if (fechaStr.length === 6) {
    const año = "20" + fechaStr.slice(0, 2);
    const mes = fechaStr.slice(2, 4);
    return `${año}-${mes}`;
  }

  return "Sin fecha";
}

const comprasPorMes = computed(() => {
  const conteo = {};

  compras.value.forEach((compra) => {
    const mes = obtenerMes(compra.fecCompra);

    if (!conteo[mes]) {
      conteo[mes] = { mes: mes, cantidad: 0, ingresos: 0 };
    }

    conteo[mes].cantidad++;
    conteo[mes].ingresos += compra.total;
  });

  return Object.values(conteo).sort((a, b) => a.mes.localeCompare(b.mes));
});
</script>

<template>
  <div class="admin-page">
    <h1>Panel del Administrador</h1>
    <p class="subtitulo">Resumen de actividad del cine</p>

    <p v-if="cargando" class="estado">Cargando datos...</p>

    <p v-else-if="error" class="estado error">{{ error }}</p>

    <div v-else>
      <div class="cards">
        <div class="card">
          <p class="card-label">Ingresos totales</p>
          <p class="card-valor">${{ ingresosTotales.toLocaleString("es-AR") }}</p>
        </div>

        <div class="card">
          <p class="card-label">Compras realizadas</p>
          <p class="card-valor">{{ cantidadCompras }}</p>
        </div>

        <div class="card">
          <p class="card-label">Usuarios únicos</p>
          <p class="card-valor">{{ usuariosUnicos }}</p>
        </div>
      </div>

      <h2>Top 5 películas más vendidas</h2>
      <table class="tabla">
        <thead>
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Género</th>
            <th>Compras</th>
            <th>Ingresos</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(pelicula, index) in top5Peliculas" :key="pelicula.id">
            <td>{{ index + 1 }}</td>
            <td>{{ pelicula.titulo }}</td>
            <td>{{ pelicula.genero }}</td>
            <td>{{ pelicula.cantidad }}</td>
            <td>${{ pelicula.ingresos.toLocaleString("es-AR") }}</td>
          </tr>
        </tbody>
      </table>

      <h2>Películas con menos ventas</h2>
      
      <table class="tabla">
        <thead>
          <tr>
            <th>Título</th>
            <th>Género</th>
            <th>Compras</th>
            <th>Ingresos</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pelicula in peoresPeliculas" :key="pelicula.id">
            <td>{{ pelicula.titulo }}</td>
            <td>{{ pelicula.genero }}</td>
            <td>{{ pelicula.cantidad }}</td>
            <td>${{ pelicula.ingresos.toLocaleString("es-AR") }}</td>
          </tr>
        </tbody>
      </table>

      <h2>Compras por mes</h2>
      <table class="tabla">
        <thead>
          <tr>
            <th>Mes</th>
            <th>Compras</th>
            <th>Ingresos</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="fila in comprasPorMes" :key="fila.mes">
            <td>{{ fila.mes }}</td>
            <td>{{ fila.cantidad }}</td>
            <td>${{ fila.ingresos.toLocaleString("es-AR") }}</td>
          </tr>
        </tbody>
      </table>

      <h2>Películas en cartelera</h2>
      <table class="tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Género</th>
            <th>Duración</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pelicula in peliculas" :key="pelicula.id">
            <td>{{ pelicula.id }}</td>
            <td>{{ pelicula.titulo }}</td>
            <td>{{ pelicula.genero }}</td>
            <td>{{ pelicula.duracion }} min</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.admin-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.subtitulo {
  color: #888;
  margin-top: -0.5rem;
  margin-bottom: 2rem;
}

.estado {
  font-size: 1.1rem;
  margin-top: 2rem;
}

.estado.error {
  color: #e74c3c;
}

.cards {
  display: flex;
  gap: 1rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.card {
  background-color: #1e2a3a;
  padding: 1.5rem;
  border-radius: 8px;
  flex: 1;
  min-width: 200px;
  color: white;
}

.card-label {
  margin: 0;
  font-size: 0.9rem;
  color: #aaa;
}

.card-valor {
  margin: 0.5rem 0 0 0;
  font-size: 2rem;
  font-weight: 700;
}

h2 {
  margin-top: 2.5rem;
  margin-bottom: 0.5rem;
}

.hint {
  color: #888;
  font-size: 0.9rem;
  margin-top: 0;
  margin-bottom: 1rem;
}

.tabla {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

.tabla th,
.tabla td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #444;
}

.tabla th {
  background-color: #1a1a1a;
  color: white;
}
</style>