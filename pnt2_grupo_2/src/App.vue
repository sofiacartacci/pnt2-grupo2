<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import LoginPopup from "./components/LoginPopup.vue";
import { useAuthStore } from "./stores/authStore";

const authStore = useAuthStore();
const mostrarLogin = ref(false);
const route = useRoute();

watch(
  () => route.query.login,
  (valor) => {
    if (valor === "true") {
      mostrarLogin.value = true;
    }
  },
  { immediate: true },
);

function abrirLogin() {
  mostrarLogin.value = true;
}

function cerrarLogin() {
  mostrarLogin.value = false;
}

function cerrarSesion() {
  authStore.logout();
}
</script>

<template>
  <div id="app">
    <header>
      <div class="header-content">
        <h1>CineORT</h1>
      </div>

      <nav>
        <RouterLink to="/integrante2">Sofia Cartacci</RouterLink>
        <RouterLink to="/integrante3">Juan Ferreyra</RouterLink>
        <RouterLink to="/integrante4">Martin Mendez</RouterLink>

        <button v-if="!authStore.isLoggedIn" @click="abrirLogin">Login</button>

        <div v-else class="usuario-box">
          <span>{{ authStore.user.nombre }}</span>

          <button @click="cerrarSesion">Logout</button>
        </div>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>

    <LoginPopup v-if="mostrarLogin" @cerrar="cerrarLogin" />
  </div>
</template>

<style scoped>
header {
  background-color: var(--color-fondo);
  padding: 2rem 3rem;
  color: var(--color-texto);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

.header-content {
  margin-bottom: 1.5rem;
}

h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: -0.5px;
}

.subtitle {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.9rem;
  color: var(--color-texto-secundario);
  font-weight: 400;
}

nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

nav a,
nav button {
  text-decoration: none;
  color: var(--color-texto);
  padding: 0.6rem 1.2rem;
  border-radius: var(--radio-borde);
  font-size: 0.9rem;
  font-weight: 700;
  background-color: var(--color-superficie);
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
}

nav a:hover,
nav button:hover {
  background-color: var(--color-superficie-clara);
  transform: translateY(-1px);
}

nav a.router-link-active {
  background-color: var(--color-acento);
  color: var(--color-texto);
  font-weight: 700;
}

.usuario-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.usuario-box span {
  padding: 0.6rem 1.2rem;
  border-radius: var(--radio-borde);
  font-size: 0.9rem;
  font-weight: 700;
  background-color: var(--color-acento);
  color: var(--color-texto);
}

main {
  padding: 2.5rem 3rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
