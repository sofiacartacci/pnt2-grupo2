<template>
  <section class="cines-section">
    <h2 class="cines-title">NUESTRAS SEDES</h2>
    <p class="cines-subtitle">Visita cualquiera de nuestros cines en Buenos Aires</p>

    <div class="cines-grid">
      <article v-for="cine in cines" :key="cine.id" class="cine-card">
        <div class="cine-imagen">
          <img :src="cine.imagen" :alt="cine.nombre" />
          <div class="cine-badge">{{ cine.barrio }}</div>
        </div>

        <div class="cine-contenido">
          <h3>{{ cine.nombre }}</h3>
          
          <div class="cine-info">
            <div class="info-item">
              <span class="info-label">📍 Ubicación</span>
              <p>{{ cine.direccion }}</p>
            </div>

            <div class="info-item">
              <span class="info-label">📞 Contacto</span>
              <p>{{ cine.telefono }}</p>
            </div>

            <div class="info-item">
              <span class="info-label">🕐 Horario</span>
              <p>{{ cine.horario }}</p>
            </div>

            <div class="info-item">
              <span class="info-label">🎬 Salas</span>
              <p>{{ cine.salas }} salas disponibles</p>
            </div>
          </div>

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
    imagen: "https://images.unsplash.com/photo-1489599849228-ed4dc9ee47c0?w=500&h=300&fit=crop"
  },
  {
    id: 2,
    nombre: "CineORT Belgrano",
    barrio: "Belgrano",
    direccion: "Av. Sarmiento 2085, C1425 CABA",
    telefono: "(011) 4806-0000",
    horario: "Lunes a Domingo: 10:00 - 23:00",
    salas: 5,
    imagen: "https://images.unsplash.com/photo-1517604931442-7e0c6ed2963c?w=500&h=300&fit=crop"
  }
]);

function reservar(cine) {
  alert(`Redirigiendo a reserva para ${cine.nombre}...`);
  // TODO: Aquí iría la lógica de reserva
}
</script>

<style scoped>
.cines-section {
  width: 100%;
  padding: 40px 0 60px;
  background-color: #1a1a1a;
  background-image: 
    repeating-linear-gradient(
      0deg,
      rgba(0, 163, 224, 0.02) 0px,
      rgba(0, 163, 224, 0.02) 1px,
      transparent 1px,
      transparent 2px
    ),
    repeating-linear-gradient(
      90deg,
      rgba(0, 163, 224, 0.02) 0px,
      rgba(0, 163, 224, 0.02) 1px,
      transparent 1px,
      transparent 2px
    );
}

.cines-title {
  margin-bottom: 12px;
  color: #00a3e0;
  font-size: 42px;
  font-weight: 900;
}

.cines-subtitle {
  margin-bottom: 40px;
  color: #aab8c5;
  font-size: 18px;
  font-weight: 400;
}

.cines-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 32px;
}

.cine-card {
  overflow: hidden;
  border-radius: 16px;
  background-color: #1f1b1b;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
}

.cine-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(0, 163, 224, 0.25);
}

.cine-imagen {
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;
}

.cine-imagen img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.cine-card:hover .cine-imagen img {
  transform: scale(1.05);
}

.cine-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: #00a3e0;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.cine-contenido {
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.cine-contenido h3 {
  margin: 0 0 20px 0;
  font-size: 26px;
  font-weight: 900;
  color: #ffffff;
}

.cine-info {
  flex: 1;
  margin-bottom: 20px;
}

.info-item {
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.info-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.info-label {
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: #00a3e0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
}

.info-item p {
  margin: 0;
  font-size: 14px;
  color: #d1d1d1;
  line-height: 1.5;
}

.btn-reservar {
  padding: 14px 20px;
  background-color: #00a3e0;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-reservar:hover {
  background-color: #0089bd;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 163, 224, 0.3);
}

.btn-reservar:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .cines-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .cines-title {
    font-size: 32px;
  }

  .cines-subtitle {
    font-size: 16px;
  }

  .cine-contenido h3 {
    font-size: 22px;
  }

  .cine-imagen {
    height: 200px;
  }
}
</style>