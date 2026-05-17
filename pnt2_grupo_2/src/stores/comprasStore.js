import { defineStore } from "pinia";

import { getFuncionPorId, modificarFuncion } from "../services/FuncionesServices";
import { crearCompra } from "../services/ComprasServices";

export const useComprasStore = defineStore("compras", {
  state: () => ({
    funcion: null,
    butacasSeleccionadas: [],
    error: null,
  }),

  getters: {
    total: (state) => {
      if (!state.funcion) {
        return 0;
      }
      return state.butacasSeleccionadas.length * state.funcion.precio;
    },
  },

  actions: {
    async cargarFuncion(id) {
      this.funcion = await getFuncionPorId(id);
      this.butacasSeleccionadas = [];
      this.error = null;
    },

    toggleButaca(codigoButaca) {
      const indice = this.butacasSeleccionadas.indexOf(codigoButaca);

      if (indice === -1) {
        this.butacasSeleccionadas.push(codigoButaca);
      } else {
        this.butacasSeleccionadas.splice(indice, 1);
      }
    },

    // Vacía la selección
    limpiarSeleccion() {
      this.butacasSeleccionadas = [];
    },

    async confirmarCompra(usuarioId) {
      if (this.butacasSeleccionadas.length === 0) {
        this.error = "Tenés que seleccionar al menos una butaca";
        return null;
      }

      const nuevaCompra = {
        usuarioId: usuarioId,
        funcionId: this.funcion.id,
        butacas: this.butacasSeleccionadas,
        total: this.total,
        fecCompra: new Date().toISOString(),
      };

      const compraCreada = await crearCompra(nuevaCompra);

      const funcionActualizada = {
        ...this.funcion,
        butacasOcupadas: [
          ...this.funcion.butacasOcupadas,
          ...this.butacasSeleccionadas,
        ],
      };

      await modificarFuncion(this.funcion.id, funcionActualizada);

      this.limpiarSeleccion();
      this.error = null;

      return compraCreada;
    },
  },
});