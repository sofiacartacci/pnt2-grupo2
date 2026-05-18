<template>
  <div class="carrusel-wrapper">
    <div class="carrusel">
      <div
        class="carrusel-track"
        :style="{ transform: `translateX(-${indiceActual * 100}%)` }"
      >
        <img
          v-for="(img, i) in imagenes"
          :key="i"
          :src="img.src"
          :alt="img.alt"
          class="carrusel-slide"
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
          v-for="(_, i) in imagenes"
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

import michael from "@/assets/michael.webp";
import mortal from "@/assets/mortal.webp";
import diablo from "@/assets/diablo moda.webp";

const imagenes = [
  { src: michael, alt: "Michael" },
  { src: mortal, alt: "Mortal" },
  { src: diablo, alt: "Diablo Moda" },
];

const indiceActual = ref(0);
let intervalo = null;

function siguiente() {
  indiceActual.value = (indiceActual.value + 1) % imagenes.length;
}

function anterior() {
  indiceActual.value =
    (indiceActual.value - 1 + imagenes.length) % imagenes.length;
}

function irA(i) {
  indiceActual.value = i;
}

onMounted(() => {
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
}

.carrusel {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 6px;
}

.carrusel-track {
  display: flex;
  transition: transform 0.5s ease;
}

.carrusel-slide {
  min-width: 100%;
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
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
