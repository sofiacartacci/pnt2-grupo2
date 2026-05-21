<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

import { getPeliculas } from "../services/PeliculasServices.js";

import VideoPopup from "../components/VideoPopup.vue";

const route = useRoute();

const pelicula = ref(null);

const mostrarTrailer = ref(false);

const cargarPelicula = async () => {
  const todas = await getPeliculas();

  pelicula.value = todas.find((p) => String(p.id) === String(route.params.id));
};

onMounted(() => {
  cargarPelicula();
});

watch(
  () => route.params.id,
  () => {
    cargarPelicula();
  },
);

function abrirTrailer() {
  mostrarTrailer.value = true;
}

function cerrarTrailer() {
  mostrarTrailer.value = false;
}
</script>

<template>
  <div v-if="pelicula" class="detalle-container">
    <h2>{{ pelicula.titulo }}</h2>

    <div class="poster-container">
      <img
        :src="`/src/assets/${pelicula.poster}`"
        alt="Poster"
        class="poster-image"
      />

      <button class="trailer-button" @click="abrirTrailer">▶</button>
    </div>

    <p><strong>Género:</strong> {{ pelicula.genero }}</p>

    <p><strong>Clasificación:</strong> {{ pelicula.clasificacion }}</p>

    <p><strong>Duración:</strong> {{ pelicula.duracion }}</p>

    <p><strong>Director:</strong> {{ pelicula.director }}</p>

    <h3>Sinopsis</h3>

    <p>{{ pelicula.sinopsis }}</p>

    <VideoPopup
      v-if="mostrarTrailer"
      :pelicula="pelicula"
      @cerrar="cerrarTrailer"
    />
  </div>

  <div v-else>Cargando...</div>
</template>

<style scoped>
.detalle-container {
  max-width: 1200px;

  margin: 40px auto;

  padding: 0 20px;
}

.detalle-container h2 {
  margin-bottom: 24px;

  color: #071423;

  font-size: 42px;
  font-weight: 900;
}

.poster-container {
  position: relative;

  width: 360px;

  margin-bottom: 24px;
}

.poster-image {
  width: 100%;

  border-radius: 14px;

  display: block;
}

.trailer-button {
  position: absolute;

  right: 14px;
  bottom: 14px;

  width: 40px;
  height: 40px;

  border: none;
  border-radius: 10px;

  background-color: #ff0000;
  color: white;

  font-size: 18px;

  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);

  transition: transform 0.2s ease;
}

.trailer-button:hover {
  transform: scale(1.08);
}

.trailer-button:hover {
  transform: scale(1.08);
}

.detalle-container p {
  margin: 14px 0;

  font-size: 18px;

  line-height: 1.5;
}

.detalle-container h3 {
  margin-top: 28px;

  font-size: 28px;
  font-weight: 900;

  color: #071423;
}
</style>
