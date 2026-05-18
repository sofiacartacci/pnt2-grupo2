<template>
  <section class="cartelera-section">
    <h2 class="cartelera-title">PELÍCULAS EN CARTELERA</h2>

    <div class="peliculas-grid">
      <article
        v-for="pelicula in peliculas"
        :key="pelicula.id"
        class="pelicula-card"
      >
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
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";

import { getPeliculas } from "../services/PeliculasServices";

const peliculas = ref([]);

onMounted(async () => {
  peliculas.value = await getPeliculas();
});
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
</style>
