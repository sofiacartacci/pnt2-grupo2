<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

defineProps({
  fechas: Array,
  fechaSeleccionada: String,
  funcionesPorDia: Object,
});
defineEmits(["cambiar-fecha"]);

function irAComprar(funcionId) {
  router.push({ path: "/butacas", query: { funcionId } });
}
</script>

<template>
  <div class="funciones-wrapper">
    <div class="fechas-bar">
      <div
        v-for="f in fechas"
        :key="f"
        @click="$emit('cambiar-fecha', f)"
        class="fecha-chip"
        :class="{ activa: fechaSeleccionada === f }"
      >
        {{ f }}
      </div>
    </div>

    <div v-if="funcionesPorDia[fechaSeleccionada]" class="funciones-list">
      <div
        v-for="f in funcionesPorDia[fechaSeleccionada]"
        :key="f.id"
        class="funcion-card"
      >
        <div class="funcion-info">
          <p><strong>Hora:</strong> {{ f.hora }}</p>
          <p><strong>Sala:</strong> {{ f.sala }}</p>
          <p><strong>Idioma:</strong> {{ f.idioma }}</p>
          <p><strong>Precio:</strong> ${{ f.precio }}</p>
        </div>
        <button class="boton-comprar" @click="irAComprar(f.id)">
          Comprar
        </button>
      </div>
    </div>

    <div v-else class="sin-funciones">
      No hay funciones disponibles para esta fecha.
    </div>
  </div>
</template>

<style scoped>
.funciones-wrapper {
  width: 100%;
}

.fechas-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.fecha-chip {
  padding: 10px 18px;
  border-radius: 20px;
  cursor: pointer;
  background: #071423;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: 2px solid #1ba6e0;
  transition: transform 0.15s ease, background 0.2s ease;
  user-select: none;
}

.fecha-chip:hover {
  transform: translateY(-2px);
}

.fecha-chip.activa {
  background: #1ba6e0;
  color: #fff;
  border-color: #1ba6e0;
  box-shadow: 0 4px 12px rgba(27, 166, 224, 0.4);
}

.funciones-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.funcion-card {
  background: #f4f4f4;
  padding: 14px 18px;
  border-radius: 12px;
  border-left: 5px solid #1ba6e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.funcion-info {
  flex: 1;
}

.funcion-info p {
  margin: 6px 0;
  font-size: 16px;
  line-height: 1.4;
}

.boton-comprar {
  background-color: #1ba6e0;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px 22px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.15s ease, background 0.2s ease;
  box-shadow: 0 4px 12px rgba(27, 166, 224, 0.3);
}

.boton-comprar:hover {
  transform: scale(1.05);
  background-color: #1593c7;
}

.sin-funciones {
  padding: 14px;
  background: #f4f4f4;
  border-radius: 12px;
  color: #555;
  font-style: italic;
}
</style>