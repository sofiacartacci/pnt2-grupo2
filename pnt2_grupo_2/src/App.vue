<script setup>
import { ref } from "vue";
import LoginPopup from "./components/LoginPopup.vue";
import { useAuthStore } from "./stores/authStore";

const authStore = useAuthStore();
const mostrarLogin = ref(false);

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
        <h1>Trabajo Integrador</h1>
        <span class="subtitle">Grupo 2 · PNT2</span>
      </div>

      <nav>
        <RouterLink to="/integrante2">Sofia Cartacci</RouterLink>
        <RouterLink to="/integrante3">Juan Ferreyra</RouterLink>
        <RouterLink to="/integrante4">Martin Mendez</RouterLink>

        <button v-if="!authStore.email" @click="abrirLogin">Login</button>

        <div v-else class="usuario-box">
          <span>{{ authStore.email }}</span>

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
  background: linear-gradient(135deg, #1e3a8a 0%, #42b883 100%);
  padding: 2rem 3rem;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.header-content {
  margin-bottom: 1.5rem;
}

h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.subtitle {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.9rem;
  opacity: 0.85;
  font-weight: 300;
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
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  background-color: rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
}

nav a:hover,
nav button:hover {
  background-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-1px);
}

nav a.router-link-active {
  background-color: white;
  color: #1e3a8a;
  font-weight: 600;
}

.usuario-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.usuario-box span {
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  background-color: rgba(255, 255, 255, 0.18);
  color: white;
}

main {
  padding: 2.5rem 3rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
