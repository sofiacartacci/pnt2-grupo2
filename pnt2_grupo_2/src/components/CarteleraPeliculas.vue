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
      <RouterLink
        v-for="pelicula in peliculasFiltradas"
        :key="pelicula.id"
        :to="`/cartelera/${pelicula.id}`"
        class="pelicula-link"
      >
        <article class="pelicula-card">
          <div class="poster-wrapper">
            <img
              class="pelicula-poster"
              :src="`/src/assets/${pelicula.poster}`"
              :alt="pelicula.titulo"
            />
            <VideoPlayerPopup :pelicula="pelicula" @click.prevent />
          </div>

          <div class="pelicula-info">
            <div class="pelicula-header">
              <h3>{{ pelicula.titulo }}</h3>
              <span class="clasificacion">
                {{ pelicula.clasificacion }}
              </span>
            </div>

            <p class="duracion">{{ pelicula.duracion }} min</p>
            <p class="genero">{{ pelicula.genero }}</p>

            <button class="btn-trailer" @click.prevent="abrirDetalle(pelicula)">
              ▶ Ver más
            </button>
          </div>
        </article>
      </RouterLink>
    </div>
  </section>
  <VideoPlayerPopup
    v-if="peliculaSeleccionada"
    :titulo="peliculaSeleccionada.titulo"
    :videoUrl="peliculaSeleccionada.trailer"
    @cerrar="cerrarTrailer"
  />
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { getPeliculas } from "../services/PeliculasServices";
import { RouterLink, useRouter } from "vue-router";

const router = useRouter();
const peliculas = ref([]);
const generos = ref([]);
const clasificaciones = ref([]);
const query = ref("");
const filtroGenero = ref("");
const filtroClasificacion = ref("");
const peliculaSeleccionada = ref(null);

onMounted(async () => {
  peliculas.value = await getPeliculas();
  generos.value = [...new Set(peliculas.value.map((p) => p.genero))];
  clasificaciones.value = [
    ...new Set(peliculas.value.map((p) => p.clasificacion)),
  ];
});

const peliculasFiltradas = computed(() => {
  return peliculas.value.filter((p) => {
    const coincideBusqueda = p.titulo
      .toLowerCase()
      .includes(query.value.toLowerCase());
    const coincideGenero =
      !filtroGenero.value || p.genero === filtroGenero.value;
    const coincideClasificacion =
      !filtroClasificacion.value ||
      p.clasificacion === filtroClasificacion.value;

    return coincideBusqueda && coincideGenero && coincideClasificacion;
  });
});

function abrirDetalle(pelicula) {
  router.push(`/cartelera/${pelicula.id}`);
}

function abrirTrailer(pelicula) {
  peliculaSeleccionada.value = pelicula;
}

function cerrarTrailer() {
  peliculaSeleccionada.value = null;
}
</script>

<style scoped>
.cartelera-section {
  width: 100%;
  padding: 40px 0 60px;
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

.pelicula-link {
  text-decoration: none;
  color: inherit;
}

.pelicula-card {
  overflow: hidden;
  border-radius: 16px;
  background-color: #1f1b1b;
  transition: transform 0.2s ease;
  height: 520px;
  display: flex;
  flex-direction: column;
}

.pelicula-card:hover {
  transform: translateY(-4px);
}

.poster-wrapper {
  position: relative;
  height: 300px;
  flex-shrink: 0;
}

.pelicula-poster {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.pelicula-info {
  padding: 16px 14px;
  color: white;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.pelicula-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 8px;
}

.pelicula-header h3 {
  margin: 0;
  font-size: 17px;
  font-weight: 900;
  line-height: 1.3;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.clasificacion {
  padding: 4px 8px;
  border-radius: 6px;
  background-color: #00a3e0;
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
  flex-shrink: 0;
}

.duracion,
.genero {
  margin: 6px 0 0;
  color: #d1d1d1;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.btn-trailer {
  margin-top: auto;
  padding: 10px 16px;
  background-color: #00a3e0;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.btn-trailer:hover {
  background-color: #0089bd;
  transform: scale(1.02);
}

.btn-trailer:active {
  transform: scale(0.98);
}

.trailer-button {
  width: 100%;
  height: 46px;

  margin-top: 18px;

  border: none;
  border-radius: 10px;

  background-color: #00a3e0;
  color: white;

  font-size: 13px;
  font-weight: 900;

  cursor: pointer;
}

.trailer-button:hover {
  background-color: #008ec2;
}
</style>
