<template>
  <section class="cines-section">
    <h2 class="cines-title">NUESTROS CINES</h2>

    <div class="cines-grid">
      <article v-for="cine in cines" :key="cine.id" class="cine-card">
        <img class="cine-poster" :src="cine.imagen" :alt="cine.nombre" />

        <div class="cine-info">
          <div class="cine-header">
            <h3>{{ cine.nombre }}</h3>
            <span class="cine-badge">{{ cine.barrio }}</span>
          </div>

          <p class="cine-dato">📍 {{ cine.direccion }}</p>
          <p class="cine-dato">📞 {{ cine.telefono }}</p>
          <p class="cine-dato">🕐 {{ cine.horario }}</p>
          <p class="cine-dato">🎬 {{ cine.salas }} salas disponibles</p>

          <button class="btn-reservar" @click="reservar(cine)">
            Reservar entrada
          </button>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const cines = ref([
  {
    id: 1,
    nombre: "CineORT Almagro",
    barrio: "Almagro",
    direccion: "Av. Acoyte 355, C1405 CABA",
    telefono: "(011) 4600-1000",
    horario: "Lunes a Domingo: 10:00 - 23:00",
    salas: 4,
    imagen: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&h=300&fit=crop"
  },
  {
    id: 2,
    nombre: "CineORT Belgrano",
    barrio: "Belgrano",
    direccion: "Av. Sarmiento 2085, C1425 CABA",
    telefono: "(011) 4806-0000",
    horario: "Lunes a Domingo: 10:00 - 23:00",
    salas: 5,
    imagen: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=500&h=300&fit=crop"
  }
]);

function reservar(cine) {
  alert(`Redirigiendo a reserva para ${cine.nombre}...`);
}
</script>

<style scoped>
.cines-section {
  width: 100%;
  padding: 40px 60px 60px;
  max-width: 1200px;
  margin: 0 auto;
}

.cines-title {
  margin-bottom: 30px;
  color: #00a3e0;
  font-size: 42px;
  font-weight: 900;
  text-align: center;
}

.cines-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 28px;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
}

.cine-card {
  overflow: hidden;
  border-radius: 16px;
  background-color: #1f1b1b;
  transition: transform 0.2s ease;
  height: 520px;
  display: flex;
  flex-direction: column;
}

.cine-card:hover {
  transform: translateY(-4px);
}

.cine-poster {
  width: 100%;
  height: 300px;
  display: block;
  object-fit: cover;
  flex-shrink: 0;
}

.cine-info {
  padding: 16px 14px;
  color: white;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.cine-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 8px;
}

.cine-header h3 {
  margin: 0;
  font-size: 17px;
  font-weight: 900;
  line-height: 1.3;
  flex: 1;
}

.cine-badge {
  padding: 4px 8px;
  border-radius: 6px;
  background-color: #00a3e0;
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
  flex-shrink: 0;
}

.cine-dato {
  margin: 4px 0 0;
  color: #d1d1d1;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.btn-reservar {
  margin-top: auto;
  padding: 10px 16px;
  background-color: #00a3e0;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.btn-reservar:hover {
  background-color: #0089bd;
  transform: scale(1.02);
}

.btn-reservar:active {
  transform: scale(0.98);
}
</style>