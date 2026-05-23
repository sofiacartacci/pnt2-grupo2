<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import LoginPopup from "./components/LoginPopup.vue";
import { useAuthStore } from "./stores/authStore";
import Footer from "./components/Footer.vue";

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

const mostrarMenu = ref(false);

function toggleMenu() {
  mostrarMenu.value = !mostrarMenu.value;
}

function cerrarMenu() {
  mostrarMenu.value = false;
}
</script>

<template>
  <div id="app" class="app-wrapper">
    <header>
      <div class="header-wrapper">
        <RouterLink to="/" class="logo-section">
          <img src="https://www.ort.edu.ar/img/LogoOrtArgWeb2017.jpg" alt="ORT Logo" class="ort-logo" />
        </RouterLink>

        <nav class="nav-center">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/Peliculas">Películas</RouterLink>
          <RouterLink to="/cines">Cines</RouterLink>
        </nav>

        <div class="nav-right">
          <button v-if="!authStore.isLoggedIn" @click="abrirLogin">Login</button>

          <div v-else class="usuario-box">
            <button @click="toggleMenu" class="boton-usuario">
              {{ authStore.user.nombre }}
            </button>
            <div v-if="mostrarMenu" class="menu-desplegable">
              <RouterLink v-if="authStore.isAdmin" to="/admin" @click="cerrarMenu">
                Panel de administrador
              </RouterLink>
            </div>

            <button @click="cerrarSesion">Logout</button>
          </div>
        </div>
      </div>
    </header>

    <main>
      <RouterView />
    </main>

    <Footer />

    <LoginPopup v-if="mostrarLogin" @cerrar="cerrarLogin" />
  </div>
</template>

<style>
html,
body {
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  height: 100%;
  box-sizing: border-box;
}

* {
  box-sizing: border-box;
}

#app {
  width: 100vw;
  margin: 0;
  padding: 0;
}

.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-wrapper main {
  flex: 1;
}
</style>

<style scoped>
header {
  background-color: var(--color-fondo);
  padding: 0.8rem 3rem;
  color: var(--color-texto);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  box-sizing: border-box;
}

.header-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 3rem;
}

.logo-section {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.logo-section:hover {
  opacity: 0.8;
}

.ort-logo {
  height: 50px;
  width: auto;
  object-fit: contain;
}

.nav-center {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex: 1;
  justify-content: center;
}

.nav-center a,
.nav-right button {
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
  white-space: nowrap;
}

.nav-center a:hover,
.nav-right button:hover {
  background-color: var(--color-superficie-clara);
  transform: translateY(-1px);
}

.nav-center a.router-link-active {
  background-color: var(--color-acento);
  color: var(--color-texto);
  font-weight: 700;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
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
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.usuario-box {
  position: relative;
}

.boton-usuario {
  background-color: var(--color-acento) !important;
}

.menu-desplegable {
  position: absolute;
  top: 110%;
  left: 0;
  background-color: var(--color-superficie);
  border-radius: var(--radio-borde);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  padding: 0.5rem;
  z-index: 100;
  min-width: 200px;
}

.menu-desplegable a {
  display: block;
  text-decoration: none;
  color: var(--color-texto);
  padding: 0.6rem 1rem;
  border-radius: var(--radio-borde);
  font-size: 0.9rem;
  font-weight: 700;
  white-space: nowrap;
}

.menu-desplegable a:hover {
  background-color: var(--color-superficie-clara);
}

@media (max-width: 768px) {
  header {
    padding: 0.8rem 1.5rem;
  }

  .header-wrapper {
    padding: 0;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .logo-section {
    order: 1;
  }

  .nav-center {
    order: 3;
    flex-basis: 100%;
    gap: 0.4rem;
  }

  .nav-right {
    order: 2;
  }

  .ort-logo {
    height: 40px;
  }

  .nav-center a,
  .nav-right button {
    padding: 0.5rem 0.8rem;
    font-size: 0.8rem;
  }

  .usuario-box {
    flex-direction: column;
    gap: 0.3rem;
  }

  main {
    padding: 1.5rem;
  }
}
</style>