<template>
  <button
    class="boton-comprar"
    :disabled="cargando || !authStore.isLoggedIn || comprasStore.butacasSeleccionadas.length === 0"
    @click="handleComprar"
  >
    {{ cargando ? "Procesando..." : "Comprar" }}
  </button>

  <p v-if="!authStore.isLoggedIn" class="aviso">
    Debés iniciar sesión para comprar.
  </p>

  <p v-if="comprasStore.error" class="error">
    {{ comprasStore.error }}
  </p>
</template>

<script setup>
import { ref } from "vue";
import { useComprasStore } from "../stores/comprasStore";
import { useAuthStore } from "../stores/AuthStore";

const comprasStore = useComprasStore();
const authStore = useAuthStore();

const cargando = ref(false);

const emit = defineEmits(["compraExitosa"]);

async function handleComprar() {
  cargando.value = true;
  const compra = await comprasStore.confirmarCompra(authStore.user.id);
  cargando.value = false;

  if (compra) {
    emit("compraExitosa", compra);
  }
}
</script>

<style scoped>
.boton-comprar {
  background-color: #e50914;
  color: white;
  padding: 10px 24px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.boton-comprar:hover:not(:disabled) {
  background-color: #b0060f;
}

.boton-comprar:disabled {
  background-color: #888;
  cursor: not-allowed;
}

.aviso {
  color: #f0a500;
  margin-top: 8px;
  font-size: 0.9rem;
}

.error {
  color: #e50914;
  margin-top: 8px;
  font-size: 0.9rem;
}
</style>
