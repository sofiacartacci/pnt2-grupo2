<template>
  <div class="carrusel-wrapper">
    <div class="carrusel">
      <div
        class="carrusel-track"
        :style="{ transform: `translateX(-${indiceActual * 100}%)` }"
      >
        <img
          v-for="pelicula in peliculasBanner"
          :key="pelicula.id"
          :src="`/src/assets/Images/${pelicula.banner}`"
          :alt="pelicula.titulo"
          class="carrusel-slide"
          @click="irADetalle(pelicula.id)"
        />
      </div>

      <button class="carrusel-btn prev" @click="anterior" aria-label="Anterior">
        &#8249;
      </button>

      <button
        class="carrusel-btn next"
        @click="siguiente"
        aria-label="Siguiente"
      >
        &#8250;
      </button>

      <div class="carrusel-dots">
        <span
          v-for="(_, i) in peliculasBanner"
          :key="i"
          class="dot"
          :class="{ activo: i === indiceActual }"
          @click="irA(i)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { getPeliculas } from "../services/PeliculasServices";

const router = useRouter();
const peliculasBanner = ref([]);
const indiceActual = ref(0);

let intervalo = null;

async function cargarPeliculasBanner() {
  const peliculas = await getPeliculas();

  peliculasBanner.value = peliculas.filter(
    (pelicula) => pelicula.banner && pelicula.destacada,
  );
}

function siguiente() {
  if (peliculasBanner.value.length > 0) {
    indiceActual.value =
      (indiceActual.value + 1) % peliculasBanner.value.length;
  }
}

function anterior() {
  if (peliculasBanner.value.length > 0) {
    indiceActual.value =
      (indiceActual.value - 1 + peliculasBanner.value.length) %
      peliculasBanner.value.length;
  }
}

function irA(i) {
  indiceActual.value = i;
}

function irADetalle(id) {
  router.push(`/cartelera/${id}`);
}

onMounted(async () => {
  await cargarPeliculasBanner();

  intervalo = setInterval(siguiente, 4000);
});

onUnmounted(() => {
  clearInterval(intervalo);
});
</script>

<style scoped>
.carrusel-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #c1bfbf;
  border-radius: 18px;
  overflow: hidden;
}

.carrusel {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 18px;
}

.carrusel-track {
  display: flex;
  transition: transform 0.5s ease;
}

.carrusel-slide {
  min-width: 100%;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;

  cursor: pointer;
}

.carrusel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 28px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: background 0.2s;
}

.carrusel-btn:hover {
  background: rgba(0, 0, 0, 0.8);
}

.carrusel-btn.prev {
  left: 12px;
}

.carrusel-btn.next {
  right: 12px;
}

.carrusel-dots {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: background 0.2s;
}

.dot.activo {
  background: white;
}
</style>
