import { defineStore } from "pinia";

import { getUsuarios } from "../services/UsuariosServices";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    email: localStorage.getItem("email"),
    token: localStorage.getItem("token"),
    error: null,
  }),

  actions: {
    async login(email, password) {
      const usuarios = await getUsuarios();

      const usuarioEncontrado = usuarios.find(
        (usuario) =>
          usuario.email === email.trim() &&
          usuario.password === password.trim(),
      );

      if (usuarioEncontrado) {
        this.email = usuarioEncontrado.email;
        this.token = "token-falso";
        this.error = null;

        localStorage.setItem("email", this.email);
        localStorage.setItem("token", this.token);
      } else {
        this.email = null;
        this.token = null;
        this.error = "Email o contraseña incorrectos";

        localStorage.removeItem("email");
        localStorage.removeItem("token");
      }
    },

    register(email, password) {
      this.email = email;
      this.token = "token-falso";

      localStorage.setItem("email", this.email);
      localStorage.setItem("token", this.token);
    },

    logout() {
      this.email = null;
      this.token = null;
      this.error = null;

      localStorage.removeItem("email");
      localStorage.removeItem("token");
    },
  },
});
