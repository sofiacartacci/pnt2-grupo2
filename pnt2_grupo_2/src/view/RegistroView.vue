<template>
  <section class="registro-page">
    <div class="registro-left">
      <div class="registro-card">
        <h1>Crear cuenta</h1>

        <h2>Información personal</h2>

        <form class="registro-form">
          <input type="text" placeholder="Nombre*" />

          <input type="text" placeholder="Apellido*" />

          <input type="email" placeholder="Correo electrónico*" />

          <input type="date" />

          <input type="tel" placeholder="Número de teléfono*" />

          <input type="password" placeholder="Contraseña*" />

          <input type="password" placeholder="Repetir contraseña*" />

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
        src="@/assets/CinemaortRegistro.png"
        alt="imagen registro"
      />
    </div>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function volverHome() {
  router.push("/");
}
</script>

<style scoped>
.registro-page {
  min-height: calc(100vh - 220px);
  background: linear-gradient(135deg, #eaf6ff, #ffffff);
  display: flex;
  flex-direction: row;
}

.registro-left {
  width: 50%;
  display: flex;
  flex-direction: column;
}

.registro-right {
  width: 50%;
  overflow: hidden;
}

.registro-imagen {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.registro-card {
  flex: 1;
  background-color: #071423;
  color: white;
  padding: 50px 48px;
  border-radius: 0;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.registro-card h1 {
  margin: 0 0 26px;
  color: #ffffff;
  font-size: 32px;
  font-weight: 900;
}

.registro-card h2 {
  margin: 0 0 22px;
  color: #ffffff;
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 900;
}

.registro-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.registro-form input {
  height: 58px;
  border: none;
  border-radius: 12px;
  background-color: #132c46;
  color: white;
  padding: 0 18px;
  font-size: 15px;
  outline: none;
}

.registro-form input::placeholder {
  color: #aab8c5;
}

.registro-form input[type="date"] {
  color: #aab8c5;
}

.create-button,
.cancel-button {
  height: 60px;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 900;
  cursor: pointer;
}

.create-button {
  margin-top: 12px;
  background-color: #00a3e0;
  color: white;
}

.create-button:hover {
  background-color: #008ec2;
}

.cancel-button {
  background-color: white;
  color: #003b7a;
}

.cancel-button:hover {
  background-color: #e7f5ff;
}
</style>
