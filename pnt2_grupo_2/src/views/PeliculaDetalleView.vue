<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { getPeliculas } from "../services/PeliculasServices.js";

const route = useRoute();
const pelicula = ref(null);

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
</script>

<template>
  <div v-if="pelicula">
    <h2>{{ pelicula.titulo }}</h2>
    <img
      :src="`/src/assets/Images/${pelicula.poster}`"
      alt="Poster"
      style="width: 200px"
    />
    <p><strong>Género:</strong> {{ pelicula.genero }}</p>
    <p><strong>Clasificación:</strong> {{ pelicula.clasificacion }}</p>
    <p><strong>Duración:</strong> {{ pelicula.duracion }}</p>
    <p><strong>Director:</strong> {{ pelicula.director }}</p>

    <h3>Sinopsis</h3>
    <p>{{ pelicula.sinopsis }}</p>
  </div>

  <div v-else>Cargando...</div>
</template>
