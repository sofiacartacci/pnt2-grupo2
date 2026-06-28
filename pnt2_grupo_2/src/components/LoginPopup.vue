<template>
  <div class="overlay">
    <div class="login-popup">
      <div class="popup-header">
        <span>Iniciá sesión en CineORT</span>

        <button class="close-button" @click="$emit('cerrar')">×</button>
      </div>

      <div class="popup-body">
        <h1>¡HOLA! QUÉ BUENO VERTE POR ACÁ.</h1>

        <input v-model="email" type="email" placeholder="Correo electrónico*" />

        <div class="input-password-wrapper">
          <input
            v-model="password"
            :type="mostrarPassword ? 'text' : 'password'"
            placeholder="Contraseña*"
          />
          <button
            type="button"
            class="toggle-password"
            @click="mostrarPassword = !mostrarPassword"
            :aria-label="
              mostrarPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
            "
          >
            <svg
              v-if="!mostrarPassword"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"
              />
              <path
                d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"
              />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          </button>
        </div>

        <a href="#" class="forgot-password"> Olvidé mi contraseña </a>

        <button class="login-button" @click="iniciarSesion">
          INICIAR SESIÓN
        </button>

        <p v-if="authStore.error" class="error-msg">{{ authStore.error }}</p>

        <button class="register-button" @click="irARegistro">
          CREAR CUENTA
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useAuthStore } from "../stores/AuthStore";

const emit = defineEmits(["cerrar"]);

const router = useRouter();

const authStore = useAuthStore();

const email = ref("");
const password = ref("");
const mostrarPassword = ref(false);

async function iniciarSesion() {
  await authStore.login(email.value, password.value);

  if (authStore.isLoggedIn) {
    emit("cerrar");
  }
}

function irARegistro() {
  emit("cerrar");

  router.push("/registro");
}
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;

  background-color: rgba(0, 0, 0, 0.45);

  display: flex;
  justify-content: flex-end;
  align-items: flex-start;

  z-index: 1000;
}

.login-popup {
  width: 390px;

  background-color: #071423;
  color: white;

  display: flex;
  flex-direction: column;

  animation: slideIn 0.35s ease;
}

.popup-header {
  height: 72px;

  padding: 0 22px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid rgba(255, 255, 255, 0.12);

  font-size: 16px;
  font-weight: 600;
}

.close-button {
  width: 38px;
  height: 38px;

  border: none;
  border-radius: 10px;

  background-color: #102840;
  color: white;

  font-size: 22px;

  cursor: pointer;
}

.popup-body {
  padding: 34px 28px 32px;

  display: flex;
  flex-direction: column;
  gap: 18px;
}

.popup-body h1 {
  margin: 0;

  font-size: 29px;
  line-height: 1.1;

  font-weight: 900;

  text-transform: uppercase;
}

.popup-body input {
  height: 56px;

  border: none;
  border-radius: 12px;

  background-color: #132c46;
  color: white;

  padding: 0 18px;

  font-size: 14px;

  outline: none;
}

.popup-body input::placeholder {
  color: #aab8c5;
}

.input-password-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-password-wrapper input {
  width: 100%;
  padding-right: 50px !important;
}

.toggle-password {
  position: absolute;
  right: 14px;
  background: none;
  border: none;
  cursor: pointer;
  color: #5a6e7e;
  padding: 0;
  display: flex;
  align-items: center;
  height: auto;
}

.toggle-password:hover {
  color: white;
}

.forgot-password {
  color: white;

  text-align: center;
  text-decoration: none;

  font-size: 14px;
}

.error-msg {
  margin: 0;

  color: #ff6b6b;

  text-align: center;

  font-size: 14px;
}

.login-button,
.register-button {
  height: 58px;

  border: none;
  border-radius: 12px;

  font-size: 14px;
  font-weight: 900;

  cursor: pointer;
}

.login-button {
  background-color: #00a3e0;

  color: white;
}

.register-button {
  background-color: white;

  color: #003b7a;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
}
</style>
