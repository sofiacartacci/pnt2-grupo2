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
          loading="lazy"
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
  max-width: 1400px;
  margin: 40px auto;
  padding: 0 20px;
  display: flex;
  justify-content: center;
}

.carrusel {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  border-radius: 20px;
  background: linear-gradient(135deg, #071423 0%, #1a3c5e 100%);
  box-shadow: 0 8px 32px rgba(26, 60, 94, 0.2);
}

.carrusel-track {
  display: flex;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
}

.carrusel-slide {
  min-width: 100%;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
  cursor: pointer;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}

.carrusel-slide:hover {
  filter: brightness(1.05);
  transition: filter 0.3s ease;
}

.carrusel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(27, 166, 224, 0.85);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.4);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  font-weight: bold;
  line-height: 1;
}

.carrusel-btn:hover {
  background: rgba(27, 166, 224, 1);
  border-color: white;
  transform: translateY(-50%) scale(1.12);
  box-shadow: 0 4px 16px rgba(27, 166, 224, 0.5);
}

.carrusel-btn:active {
  transform: translateY(-50%) scale(0.95);
}

.carrusel-btn.prev {
  left: 20px;
}

.carrusel-btn.next {
  right: 20px;
}

.carrusel-dots {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 5;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.dot:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: scale(1.2);
}

.dot.activo {
  background: #1ba6e0;
  border-color: white;
  box-shadow: 0 0 12px rgba(27, 166, 224, 0.8);
}

@media (max-width: 1024px) {
  .carrusel-wrapper {
    margin: 35px auto;
    padding: 0 16px;
  }

  .carrusel {
    height: 420px;
  }

  .carrusel-btn {
    width: 46px;
    height: 46px;
    font-size: 28px;
  }

  .carrusel-btn.prev {
    left: 16px;
  }

  .carrusel-btn.next {
    right: 16px;
  }
}

@media (max-width: 768px) {
  .carrusel-wrapper {
    margin: 30px auto;
    padding: 0 12px;
  }

  .carrusel {
    height: 360px;
    border-radius: 16px;
  }

  .carrusel-btn {
    width: 42px;
    height: 42px;
    font-size: 24px;
  }

  .carrusel-btn.prev {
    left: 12px;
  }

  .carrusel-btn.next {
    right: 12px;
  }

  .carrusel-dots {
    bottom: 16px;
    gap: 8px;
  }

  .dot {
    width: 10px;
    height: 10px;
  }
}

@media (max-width: 480px) {
  .carrusel-wrapper {
    margin: 24px auto;
    padding: 0 10px;
  }

  .carrusel {
    height: 280px;
    border-radius: 12px;
  }

  .carrusel-btn {
    width: 38px;
    height: 38px;
    font-size: 20px;
  }

  .carrusel-btn.prev {
    left: 8px;
  }

  .carrusel-btn.next {
    right: 8px;
  }

  .carrusel-dots {
    bottom: 12px;
    gap: 6px;
  }

  .dot {
    width: 8px;
    height: 8px;
  }
}
</style>