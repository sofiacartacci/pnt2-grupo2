<script setup>
import { onMounted } from "vue";
import { useComprasStore } from "../stores/comprasStore";

const comprasStore = useComprasStore();

const filas = ["A", "B", "C", "D", "E"];
const columnas = [1, 2, 3, 4, 5, 6, 7, 8];

onMounted(() => {
  comprasStore.cargarFuncion("1");
});

function estadoButaca(codigo) {
  const ocupadas = comprasStore.funcion?.butacasOcupadas || [];

  if (ocupadas.includes(codigo)) {
    return "ocupada";
  }
  if (comprasStore.butacasSeleccionadas.includes(codigo)) {
    return "seleccionada";
  }
  return "libre";
}

function clickButaca(codigo) {
  if (estadoButaca(codigo) === "ocupada") {
    return;
  }
  comprasStore.toggleButaca(codigo);
}
</script>

<template>
  <div class="butacas-page">
    <h1>Seleccioná tus butacas</h1>

    <div v-if="comprasStore.funcion" class="info-funcion">
      <p>{{ comprasStore.funcion.sala }} · {{ comprasStore.funcion.hora }} · {{ comprasStore.funcion.idioma }}</p>
    </div>

    <p v-else class="cargando">Cargando función...</p>

    <div class="pantalla">PANTALLA</div>

    <div class="sala">
      <div v-for="fila in filas" :key="fila" class="fila">
        <span class="letra-fila">{{ fila }}</span>

        <button
          v-for="col in columnas"
          :key="fila + col"
          class="butaca"
          :class="estadoButaca(fila + col)"
          @click="clickButaca(fila + col)"
        >
          {{ col }}
        </button>
      </div>
    </div>

    <div class="referencias">
      <span><span class="muestra libre"></span> Libre</span>
      <span><span class="muestra seleccionada"></span> Seleccionada</span>
      <span><span class="muestra ocupada"></span> Ocupada</span>
    </div>

    <div class="resumen">
      <p>Butacas seleccionadas: {{ comprasStore.butacasSeleccionadas.join(", ") || "ninguna" }}</p>
      <p class="total">Total: ${{ comprasStore.total }}</p>
    </div>
  </div>
</template>

<style scoped>
.butacas-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

h1 {
  color: var(--color-acento);
}

.info-funcion p {
  color: var(--color-texto-secundario);
  margin: 0;
}

.pantalla {
  width: 80%;
  max-width: 500px;
  background-color: var(--color-superficie-clara);
  color: var(--color-texto-secundario);
  text-align: center;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  letter-spacing: 4px;
}

.sala {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.fila {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.letra-fila {
  width: 20px;
  font-weight: 700;
  color: var(--color-texto-secundario);
}

.butaca {
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 700;
  transition: transform 0.1s ease;
}

.butaca:hover {
  transform: scale(1.1);
}

.butaca.libre {
  background-color: #d3d1c7;
  color: #444;
}

.butaca.seleccionada {
  background-color: var(--color-acento);
  color: white;
}

.butaca.ocupada {
  background-color: #5f5e5a;
  color: #888;
  cursor: not-allowed;
}

.butaca.ocupada:hover {
  transform: none;
}

.referencias {
  display: flex;
  gap: 1.5rem;
  font-size: 0.85rem;
  color: var(--color-texto-secundario);
}

.referencias span {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.muestra {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  display: inline-block;
}

.muestra.libre { background-color: #d3d1c7; }
.muestra.seleccionada { background-color: var(--color-acento); }
.muestra.ocupada { background-color: #5f5e5a; }

.resumen {
  text-align: center;
}

.total {
  font-size: 1.3rem;
  font-weight: 900;
  color: var(--color-acento);
}
</style>