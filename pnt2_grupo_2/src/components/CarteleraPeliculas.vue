<template>
  <section class="cartelera-section">
    <h2 class="cartelera-title">PELÍCULAS EN CARTELERA</h2>

    <div class="filtros">
      <input
        v-model="query"
        type="text"
        placeholder="Buscar..."
        class="filtro-input"
      />

      <select v-model="filtroGenero" class="filtro-select">
        <option value="">Todos los géneros</option>
        <option v-for="g in generos" :key="g" :value="g">{{ g }}</option>
      </select>

      <select v-model="filtroClasificacion" class="filtro-select">
        <option value="">Todas las clasificaciones</option>
        <option v-for="c in clasificaciones" :key="c" :value="c">
          {{ c }}
        </option>
      </select>
    </div>

    <div v-if="peliculasFiltradas.length === 0" class="sin-resultados">
      No hay películas que coincidan con los filtros seleccionados.
    </div>

    <div class="peliculas-grid">
      <PeliculaCard
        v-for="pelicula in peliculasFiltradas"
        :key="pelicula.id"
        :pelicula="pelicula"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

import { getPeliculas } from "../services/PeliculasServices";
import PeliculaCard from "./PeliculaCard.vue";

const peliculas = ref([]);
const generos = ref([]);
const clasificaciones = ref([]);
const query = ref("");
const filtroGenero = ref("");
const filtroClasificacion = ref("");

function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

onMounted(async () => {
  peliculas.value = await getPeliculas();

  generos.value = [...new Set(peliculas.value.map((p) => p.genero))];

  clasificaciones.value = [
    ...new Set(peliculas.value.map((p) => p.clasificacion)),
  ];
});

const peliculasFiltradas = computed(() => {
  return peliculas.value.filter((p) => {
    const coincideBusqueda = normalizar(p.titulo).includes(
      normalizar(query.value),
    );

    const coincideGenero =
      !filtroGenero.value || p.genero === filtroGenero.value;

    const coincideClasificacion =
      !filtroClasificacion.value ||
      p.clasificacion === filtroClasificacion.value;

    return coincideBusqueda && coincideGenero && coincideClasificacion;
  });
});
</script>

<style scoped>
.cartelera-section {
  width: 100%;
  padding: 14px 0 60px;
}

.cartelera-title {
  margin-bottom: 30px;
  color: #00a3e0;
  font-size: 42px;
  font-weight: 900;
}

.filtros {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.filtro-input,
.filtro-select {
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: inherit;
}

.filtro-input {
  flex: 1;
  min-width: 200px;
}

.sin-resultados {
  font-size: 18px;
  color: #666;
  margin: 40px 0;
  text-align: center;
}

.peliculas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 28px;
}
</style>
