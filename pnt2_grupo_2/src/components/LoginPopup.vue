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

        <div class="password-container">
          <input v-model="password" type="password" placeholder="Contraseña*" />

          <span class="eye-icon">👁</span>
        </div>

        <a href="#" class="forgot-password"> Olvidé mi contraseña </a>

        <button class="login-button" @click="iniciarSesion">
          INICIAR SESIÓN
        </button>

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

import { useAuthStore } from "../stores/authStore";

const emit = defineEmits(["cerrar"]);

const router = useRouter();

const authStore = useAuthStore();

const email = ref("");
const password = ref("");

async function iniciarSesion() {
  await authStore.login(email.value, password.value);

  if (authStore.token) {
    emit("cerrar");
  }
  console.log("click iniciar sesión");
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

.password-container {
  position: relative;

  display: flex;
}

.password-container input {
  width: 100%;

  padding-right: 48px;
}

.eye-icon {
  position: absolute;

  right: 18px;
  top: 18px;

  font-size: 14px;
}

.forgot-password {
  color: white;

  text-align: center;
  text-decoration: none;

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
