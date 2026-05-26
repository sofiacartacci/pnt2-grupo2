<template>
  <section class="registro-page">
    <div class="registro-left">
      <div class="registro-card">
        <h1>Crear cuenta</h1>

        <h2>Información personal</h2>

        <form
          class="registro-form"
          @submit.prevent="registrarUsuario"
          autocomplete="off"
        >
          <input
            type="text"
            placeholder="Nombre*"
            v-model="nombre"
            autocomplete="off"
          />

          <input
            type="text"
            placeholder="Apellido*"
            v-model="apellido"
            autocomplete="off"
          />

          <input
            type="email"
            placeholder="Correo electrónico*"
            v-model="email"
            autocomplete="off"
          />

          <input type="date" v-model="fechaNacimiento" autocomplete="off" />

          <input
            type="tel"
            placeholder="Número de teléfono*"
            v-model="telefono"
            autocomplete="off"
          />

          <div class="input-password-wrapper">
            <input
              :type="mostrarPassword ? 'text' : 'password'"
              placeholder="Contraseña*"
              v-model="password"
              autocomplete="new-password"
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

          <div class="input-password-wrapper">
            <input
              :type="mostrarRepetirPassword ? 'text' : 'password'"
              placeholder="Repetir contraseña*"
              v-model="repetirPassword"
              autocomplete="new-password"
            />
            <button
              type="button"
              class="toggle-password"
              @click="mostrarRepetirPassword = !mostrarRepetirPassword"
              :aria-label="
                mostrarRepetirPassword
                  ? 'Ocultar contraseña'
                  : 'Mostrar contraseña'
              "
            >
              <svg
                v-if="!mostrarRepetirPassword"
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

          <button type="submit" class="create-button">CREAR CUENTA</button>

          <button type="button" class="cancel-button" @click="volverHome">
            CANCELAR
          </button>
        </form>
      </div>
    </div>
    <div class="registro-right">
      <img
        class="registro-imagen"
        src="@/assets/Images/CinemaortRegistro.png"
        alt="imagen registro"
      />
    </div>
  </section>

  <div
    v-if="mostrarBienvenida"
    class="overlay-bienvenida"
    @click="cerrarBienvenida"
  >
    <div class="popup-bienvenida" @click.stop>
      <button class="cerrar-popup" @click="cerrarBienvenida">×</button>

      <h2>¡Bienvenido a CineORT!</h2>

      <p>Tu usuario fue creado correctamente.</p>

      <button class="continuar-button" @click="cerrarBienvenida">
        CONTINUAR
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore";

const router = useRouter();
const authStore = useAuthStore();

const nombre = ref("");
const apellido = ref("");
const email = ref("");
const fechaNacimiento = ref("");
const telefono = ref("");
const password = ref("");
const repetirPassword = ref("");
const mostrarBienvenida = ref(false);
const mostrarPassword = ref(false);
const mostrarRepetirPassword = ref(false);

function validarEmail(valor) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(valor);
}

function validarTelefono(valor) {
  const regex = /^\d{9,11}$/;
  return regex.test(valor.trim());
}

function validarMayorDeEdad(fechaStr) {
  if (!fechaStr) return false;
  const hoy = new Date();
  const nacimiento = new Date(fechaStr);
  const edad = hoy.getFullYear() - nacimiento.getFullYear();
  const cumplioEsteAnio =
    hoy.getMonth() > nacimiento.getMonth() ||
    (hoy.getMonth() === nacimiento.getMonth() &&
      hoy.getDate() >= nacimiento.getDate());
  return edad > 18 || (edad === 18 && cumplioEsteAnio);
}

async function registrarUsuario() {
  if (!validarEmail(email.value)) {
    alert("El formato del correo electrónico no es válido");
    return;
  }

  if (!validarTelefono(telefono.value)) {
    alert("El teléfono debe contener entre 9 y 11 dígitos numéricos");
    return;
  }

  if (!validarMayorDeEdad(fechaNacimiento.value)) {
    alert("Debes ser mayor de 18 años para registrarte");
    return;
  }

  if (password.value !== repetirPassword.value) {
    alert("Las contraseñas no coinciden");
    return;
  }

  const usuario = {
    nombre: nombre.value,
    apellido: apellido.value,
    email: email.value,
    fechaNacimiento: fechaNacimiento.value,
    telefono: telefono.value,
    password: password.value,
    rol: "usuario",
  };

  const exito = await authStore.register(usuario);

  if (exito) {
    mostrarBienvenida.value = true;
  } else {
    alert(authStore.error);
  }
}

function cerrarBienvenida() {
  mostrarBienvenida.value = false;
  router.push("/");
}

function volverHome() {
  router.push("/");
}
</script>

<style scoped>
.registro-page {
  min-height: calc(100vh - 220px);
  display: flex;
  flex-direction: row;
  background: linear-gradient(135deg, #eaf6ff, #ffffff);
}

.registro-left,
.registro-right {
  width: 50%;
}

.registro-left {
  display: flex;
  flex-direction: column;
}

.registro-right {
  overflow: hidden;
}

.registro-imagen {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.registro-card {
  flex: 1;
  padding: 50px 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #071423;
  color: white;
}

.registro-card h1 {
  margin: 0 0 26px;
  color: white;
  font-size: 32px;
  font-weight: 900;
}

.registro-card h2 {
  margin: 0 0 22px;
  color: white;
  font-size: 18px;
  font-weight: 900;
  text-transform: uppercase;
}

.registro-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
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

.registro-form input {
  height: 58px;
  padding: 0 18px;
  border: none;
  border-radius: 12px;
  background-color: #132c46;
  color: white;
  font-size: 15px;
  outline: none;
}

.registro-form input::placeholder {
  color: #aab8c5;
}

.registro-form input[type="date"] {
  color: #aab8c5;
}

.registro-form input:-webkit-autofill,
.registro-form input:-webkit-autofill:hover,
.registro-form input:-webkit-autofill:focus {
  -webkit-text-fill-color: white;
  -webkit-box-shadow: 0 0 0 1000px #132c46 inset;
  transition: background-color 5000s ease-in-out 0s;
}

.create-button,
.cancel-button,
.continuar-button {
  height: 60px;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 900;
  cursor: pointer;
}

.create-button,
.continuar-button {
  background-color: #00a3e0;
  color: white;
}

.create-button {
  margin-top: 12px;
}

.create-button:hover,
.continuar-button:hover {
  background-color: #008ec2;
}

.cancel-button {
  background-color: white;
  color: #003b7a;
}

.cancel-button:hover {
  background-color: #e7f5ff;
}

.overlay-bienvenida {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.55);
}

.popup-bienvenida {
  width: 420px;
  position: relative;
  padding: 36px 32px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  border-radius: 18px;
  background-color: #071423;
  color: white;
  text-align: center;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
}

.popup-bienvenida h2 {
  margin: 0;
  font-size: 28px;
  font-weight: 900;
}

.popup-bienvenida p {
  margin: 0;
  color: #c7d6e5;
  font-size: 15px;
  line-height: 1.5;
}

.cerrar-popup {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 10px;
  background-color: #132c46;
  color: white;
  font-size: 22px;
  cursor: pointer;
}

.continuar-button {
  height: 56px;
}
</style>
