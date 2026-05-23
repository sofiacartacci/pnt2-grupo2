<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getPeliculas } from "../services/PeliculasServices.js";
import { getFunciones } from "../services/FuncionesServices.js";
import VideoPopup from "../components/VideoPopup.vue";
import FuncionesPorDia from "../components/FuncionesPorDia.vue";
import { useCineStore } from "../stores/cineStore.js";

const route = useRoute();
const router = useRouter();
const cineStore = useCineStore();

const pelicula = ref(null);
const mostrarTrailer = ref(false);
const funcionesPorDia = ref({});
const fechaSeleccionada = ref(null);

const fechas = computed(() => Object.keys(funcionesPorDia.value));

function formatoFecha(fechaApi) {
  const anio = "20" + fechaApi.slice(0, 2);
  const mes = fechaApi.slice(2, 4);
  const dia = fechaApi.slice(4, 6);
  const fecha = new Date(anio, mes - 1, dia);
  const dias = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  return `${dias[fecha.getDay()]} ${dia}/${meses[fecha.getMonth()]}`;
}

const cargarPelicula = async () => {
  const todas = await getPeliculas();
  pelicula.value = todas.find((p) => String(p.id) === String(route.params.id));
};

const cargarFunciones = async () => {
  const id = route.params.id;
  const cineId = cineStore.cineSeleccionado?.id;

  if (!cineId) {
    funcionesPorDia.value = {};
    fechaSeleccionada.value = null;
    return;
  }

  const funciones = (await getFunciones()).filter(
    (f) => f?.peliculaId == id && String(f.cineId) === String(cineId)
  );

  const agrupado = funciones.reduce((acc, f) => {
    (acc[f.fecha] ||= []).push(f);
    return acc;
  }, {});
  const resultado = {};
  for (const fecha in agrupado) {
    resultado[formatoFecha(fecha)] = agrupado[fecha];
  }
  funcionesPorDia.value = resultado;
  fechaSeleccionada.value = Object.keys(resultado)[0] || null;
};

onMounted(() => {
  cargarPelicula();
  cargarFunciones();
});

watch(
  () => route.params.id,
  () => {
    cargarPelicula();
    cargarFunciones();
  }
);

watch(
  () => cineStore.cineSeleccionado,
  () => {
    cargarFunciones();
  }
);

function abrirTrailer() {
  mostrarTrailer.value = true;
}
function cerrarTrailer() {
  mostrarTrailer.value = false;
}

function irACines() {
  router.push("/cines");
}
</script>

<template>
  <div v-if="pelicula" class="detalle-container">
    <div class="info-section">
      <h2>{{ pelicula.titulo }}</h2>

      <div class="poster-container">
        <img
          :src="`/src/assets/${pelicula.poster}`"
          alt="Poster"
          class="poster-image"
        />
        <button class="trailer-button" @click="abrirTrailer">▶Ver</button>
      </div>

      <p><strong>Género:</strong> {{ pelicula.genero }}</p>
      <p><strong>Clasificación:</strong> {{ pelicula.clasificacion }}</p>
      <p><strong>Duración:</strong> {{ pelicula.duracion }}</p>
      <p><strong>Director:</strong> {{ pelicula.director }}</p>

      <h3>Sinopsis</h3>
      <p class="sinopsis">{{ pelicula.sinopsis }}</p>
    </div>

    <div class="funciones-section">
      <h3>Funciones</h3>

      <div v-if="cineStore.cineSeleccionado" class="cine-banner">
        <div>
          <span class="cine-banner-label">Viendo cartelera de</span>
          <strong>{{ cineStore.cineSeleccionado.nombre }}</strong>
        </div>
        <button class="btn-cambiar-cine" @click="irACines">Cambiar cine</button>
      </div>

      <div v-else class="sin-cine-msg">
        <p>Elegí primero un cine para ver las funciones disponibles.</p>
        <button class="btn-cambiar-cine" @click="irACines">Elegir cine</button>
      </div>

      <FuncionesPorDia
        v-if="cineStore.cineSeleccionado"
        :fechas="fechas"
        :fechaSeleccionada="fechaSeleccionada"
        :funcionesPorDia="funcionesPorDia"
        @cambiar-fecha="fechaSeleccionada = $event"
      />
    </div>

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
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

.info-section {
  flex: 1;
  max-width: 600px;
}

.funciones-section {
  flex: 1;
  min-width: 320px;
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
  right: 4px;
  bottom: 4px;
  width: 60px;
  height: 35px;
  border: none;
  border-radius: 10px;
  background-color: #fe3a3a;
  color: white;
  font-size: 15px;
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

.detalle-container p {
  margin: 14px 0;
  font-size: 18px;
  line-height: 1.5;
}

.sinopsis {
  text-align: justify;
}

.detalle-container h3 {
  margin-top: 28px;
  font-size: 28px;
  font-weight: 900;
  color: #071423;
}

.cine-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  background: #071423;
  color: #fff;
  padding: 12px 16px;
  border-radius: 12px;
  margin-bottom: 16px;
  border-left: 5px solid #1ba6e0;
}

.cine-banner-label {
  display: block;
  font-size: 12px;
  color: #b0c0d0;
  margin-bottom: 2px;
}

.cine-banner strong {
  font-size: 16px;
  font-weight: 700;
}

.sin-cine-msg {
  background: #f4f4f4;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 16px;
  text-align: center;
}

.sin-cine-msg p {
  margin: 0 0 10px 0;
  color: #555;
  font-size: 15px;
}

.btn-cambiar-cine {
  background: #1ba6e0;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.15s ease;
  white-space: nowrap;
}

.btn-cambiar-cine:hover {
  background: #1593c7;
  transform: scale(1.05);
}
</style>