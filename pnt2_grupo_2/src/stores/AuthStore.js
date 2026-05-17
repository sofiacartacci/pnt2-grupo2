import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    email: null,
    token: null,
  }),

  actions: {
    login(email, password) {
      this.email = email;
      this.token = "token-falso";
    },

    register(email, password) {
      this.email = email;
      this.token = "token-falso";
    },

    logout() {
      this.email = null;
      this.token = null;
    },
  },
});
