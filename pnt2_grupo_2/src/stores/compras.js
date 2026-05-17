import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const API_URL = 'https://6a03b7662afe8349b4b5717d.mockapi.io/api/v1'

export const useComprasStore = defineStore('compras', () => {
  // ----- STATE -----
  // butacas que el usuario está seleccionando ahora (antes de confirmar)
  const butacasSeleccionadas = ref([])
  // historial de compras del usuario actual
  const misCompras = ref([])

  // ----- GETTERS -----
  // Total = cantidad de butacas × precio de la función seleccionada
  const total = computed(() => {
    // TODO (Integrante 3):
    // Devolver butacasSeleccionadas.length * precio de la función seleccionada
    return 0
  })

  // ----- ACTIONS -----

  // Agrega o quita una butaca de la selección.
  function toggleButaca(codigoButaca) {
    // TODO (Integrante 3):
    // Si la butaca ya está seleccionada, la quitamos. Si no, la agregamos.
  }

  // Limpia la selección.
  function limpiarSeleccion() {
    butacasSeleccionadas.value = []
  }

  // Confirma la compra: crea el registro y actualiza las butacas ocupadas.
  async function confirmarCompra(usuarioId, funcionId) {
    // TODO (Integrante 3):
    // 1. POST a `${API_URL}/compras` con { usuarioId, funcionId, butacas, total, fechaCompra }
    // 2. PUT a `${API_URL}/funciones/${funcionId}` actualizando butacasOcupadas
    // 3. Limpiar la selección
  }

  // Carga el historial de compras de un usuario.
  async function cargarMisCompras(usuarioId) {
    // TODO (Integrante 3 o 4):
    // GET a `${API_URL}/compras?usuarioId=${usuarioId}`
  }

  return {
    butacasSeleccionadas,
    misCompras,
    total,
    toggleButaca,
    limpiarSeleccion,
    confirmarCompra,
    cargarMisCompras
  }
})