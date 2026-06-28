import { defineStore } from "pinia";
import { getUsuarios, crearUsuario } from "../services/UsuariosServices";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    error: null,
  }),

  getters: {
    isLoggedIn: (state) => state.user !== null,
    isAdmin: (state) => state.user?.rol === "admin",
    isCliente: (state) => state.user?.rol === "cliente",
  },

  actions: {
    async login(email, password) {
      const usuarios = await getUsuarios();

      const usuarioEncontrado = usuarios.find(
        (usuario) =>
          usuario.email === email.trim() &&
          usuario.password === password.trim(),
      );

      if (usuarioEncontrado) {
        this.user = usuarioEncontrado;
        this.error = null;
        localStorage.setItem("user", JSON.stringify(usuarioEncontrado));
      } else {
        this.user = null;
        this.error = "Email o contraseña incorrectos";
        localStorage.removeItem("user");
      }
    },

    async register(usuario) {
      const usuarios = await getUsuarios();

      const usuarioExistente = usuarios.find(
        (unUsuario) => unUsuario.email === usuario.email,
      );

      if (usuarioExistente) {
        this.error = "El email ya se encuentra registrado";

        return false;
      } else {
        const usuarioCreado = await crearUsuario(usuario);

        this.user = usuarioCreado;
        this.error = null;

        localStorage.setItem("user", JSON.stringify(this.user));

        return true;
      }
    },

    logout() {
      this.user = null;
      this.error = null;
      localStorage.removeItem("user");
    },
  },
});
