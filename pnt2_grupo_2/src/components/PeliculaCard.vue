<template>
  <article class="pelicula-card" @click="abrirDetalle">
    <div class="poster-wrapper">
      <img
        class="pelicula-poster"
        :src="`/src/assets/Images/${pelicula.poster}`"
        :alt="pelicula.titulo"
      />
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

      <button class="btn-ver-mas" @click.stop="abrirDetalle">▶ Ver más</button>
    </div>
  </article>
</template>

<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  pelicula: Object,
});

const router = useRouter();

function abrirDetalle() {
  router.push(`/cartelera/${props.pelicula.id}`);
}
</script>

<style scoped>
.pelicula-card {
  overflow: hidden;
  border-radius: 16px;
  background-color: #1f1b1b;
  transition: transform 0.2s ease;
  height: 520px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.pelicula-card:hover {
  transform: translateY(-4px);
}

.poster-wrapper {
  position: relative;
  height: 360px;
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

.btn-ver-mas {
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

.btn-ver-mas:hover {
  background-color: #0089bd;
  transform: scale(1.02);
}

.btn-ver-mas:active {
  transform: scale(0.98);
}
</style>
