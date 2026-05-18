<template>
  <section class="cartelera-section">
    <h2 class="cartelera-title">PELÍCULAS EN CARTELERA</h2>

        <div style="display:flex; gap:20px; margin-bottom:25px;">
      <input
        v-model="query"
        type="text"
        placeholder="Buscar..."
        style="padding:8px; font-size:16px;"
      />
      <select v-model="filtroGenero" style="padding:8px; font-size:16px;">
        <option value="">Todos los géneros</option>
        <option v-for="g in generos" :key="g" :value="g">{{ g }}</option>
      </select>

      <select v-model="filtroClasificacion" style="padding:8px; font-size:16px;">
        <option value="">Todas las clasificaciones</option>
        <option v-for="c in clasificaciones" :key="c" :value="c">{{ c }}</option>
      </select>
    </div>
    <div v-if="peliculasFiltradas.length === 0" style="font-size:20px; margin:20px 0;">
      No hay películas que coincidan con los filtros seleccionados.
      </div>
      <div class="peliculas-grid">
        <RouterLink
        v-for="pelicula in peliculasFiltradas"
        :key="pelicula.id"
        :to="`/cartelera/${pelicula.id}`"
        class="pelicula-link"
      >
      <article class = "pelicula-card">
        <img
          class="pelicula-poster"
          :src="`/src/assets/${pelicula.poster}`"
          :alt="pelicula.titulo"
        />

        <div class="pelicula-info">
          <div class="pelicula-header">
            <h3>{{ pelicula.titulo }}</h3>

            <span class="clasificacion">
              {{ pelicula.clasificacion }}
            </span>
          </div>

          <p class="duracion">{{ pelicula.duracion }} min</p>

          <p class="genero">
            {{ pelicula.genero }}
          </p>
        </div>
        </article>
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { getPeliculas } from "../services/PeliculasServices";
import { RouterLink } from "vue-router"

const peliculas = ref([]);
const generos = ref([])
const clasificaciones = ref([])
const query = ref("")
const filtroGenero = ref("")
const filtroClasificacion = ref("")

onMounted(async () => {
  peliculas.value = await getPeliculas();
  generos.value = [...new Set(peliculas.value.map(p => p.genero))]
  clasificaciones.value = [...new Set(peliculas.value.map(p => p.clasificacion))]
});
const peliculasFiltradas = computed(() => {
  return peliculas.value.filter(p => {
    const coincideBusqueda = p.titulo.toLowerCase().includes(query.value.toLowerCase())
    const coincideGenero = !filtroGenero.value || p.genero === filtroGenero.value
    const coincideClasificacion = !filtroClasificacion.value || p.clasificacion === filtroClasificacion.value

    return coincideBusqueda && coincideGenero && coincideClasificacion
  })
})

</script>

<style scoped>
.cartelera-section {
  width: 100%;
  padding: 40px 0 60px;
}

.cartelera-title {
  margin-bottom: 30px;

  color: #111111;

  font-size: 42px;
  font-weight: 900;
}

.peliculas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 28px;
}

.pelicula-card {
  overflow: hidden;

  border-radius: 16px;

  background-color: #1f1b1b;

  transition: transform 0.2s ease;
}

.pelicula-card:hover {
  transform: translateY(-4px);
}

.pelicula-poster {
  width: 100%;
  height: 340px;

  display: block;

  object-fit: cover;
}

.pelicula-info {
  padding: 18px 16px 22px;

  color: white;
}

.pelicula-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.pelicula-header h3 {
  margin: 0;

  font-size: 23px;
  font-weight: 900;
  line-height: 1.1;
}

.clasificacion {
  padding: 6px 10px;

  border-radius: 8px;

  background-color: #00a3e0;

  font-size: 13px;
  font-weight: 700;
}

.duracion,
.genero {
  margin: 12px 0 0;

  color: #d1d1d1;

  font-size: 20px;
}

.pelicula-link {
  text-decoration: none;
  color: inherit;
  display: block; /* mantiene el grid */
}


</style>
