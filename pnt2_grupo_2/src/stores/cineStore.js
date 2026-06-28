import { defineStore } from "pinia";
import { getCines } from "../services/CinesServices";

export const useCineStore = defineStore("cine", {
  state: () => ({
    cines: [],
    cineSeleccionado: JSON.parse(localStorage.getItem("cineSeleccionado")) || null,
  }),

  getters: {
    hayCineSeleccionado: (state) => state.cineSeleccionado !== null,
  },

  actions: {
    async cargarCines() {
      this.cines = await getCines();
    },

    setCine(cine) {
      this.cineSeleccionado = cine;
      localStorage.setItem("cineSeleccionado", JSON.stringify(cine));
    },

    limpiarCine() {
      this.cineSeleccionado = null;
      localStorage.removeItem("cineSeleccionado");
    },
  },
});