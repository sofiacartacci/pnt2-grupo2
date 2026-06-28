<template>
  <div class="about-page">
    <section class="hero">
      <div class="hero-content">
        <span class="hero-tag">Cine</span>
        <h1>Bienvenidos a <span class="brand">CineORT</span></h1>
        <p class="hero-subtitle">
          Un proyecto desarrollado por estudiantes del Instituto Tecnológico ORT Argentina.
        </p>
      </div>
      <div class="hero-decoracion">
        <div class="circulo c1"></div>
        <div class="circulo c2"></div>
        <div class="circulo c3"></div>
      </div>
    </section>

    <section class="seccion">
      <div class="seccion-header">
        <span class="seccion-badge">Nuestra historia</span>
        <h2>Donde nace CineORT</h2>
      </div>
      <p class="seccion-texto">
        CineORT nació como proyecto integrador de la materia <strong>Programación en Nuevas Tecnologías 2</strong>
        en el Instituto ORT Argentina. Lo que empezó como un trabajo práctico para aprender Vue.js
        terminó siendo una plataforma completa de gestión de cines, con compra de butacas en tiempo real,
        múltiples sedes y panel de administración con dashboards al estilo Power BI.
      </p>
      <p class="seccion-texto">
        Hoy, CineORT es nuestra forma de demostrar todo lo aprendido durante la cursada:
        desde el manejo de estados con Pinia hasta la integración con MockAPI para simular un backend real.
      </p>
    </section>

    <section class="mvv">
      <div class="mvv-card">
        <div class="mvv-icon icon-azul">🎯</div>
        <h3>Misión</h3>
        <p>
          Brindar una experiencia de compra de entradas simple, rápida y confiable,
          poniendo la tecnología al servicio del disfrute del cine.
        </p>
      </div>

      <div class="mvv-card">
        <div class="mvv-icon icon-verde">👁️</div>
        <h3>Visión</h3>
        <p>
          Ser la plataforma de referencia para la gestión de cines, demostrando que
          un proyecto académico puede alcanzar estándares profesionales.
        </p>
      </div>

      <div class="mvv-card">
        <div class="mvv-icon icon-azul">⭐</div>
        <h3>Valores</h3>
        <p>
          Calidad, aprendizaje continuo, trabajo en equipo y compromiso con la
          excelencia técnica en cada línea de código.
        </p>
      </div>
    </section>

    <section class="numeros">
      <h2>CineORT en números</h2>
      <div class="numeros-grid">
        <div class="numero-card">
          <div class="numero-valor">2</div>
          <div class="numero-label">Sedes activas</div>
          <div class="numero-detalle">Almagro y Belgrano</div>
        </div>
        <div class="numero-card">
          <div class="numero-valor">8</div>
          <div class="numero-label">Películas en cartelera</div>
          <div class="numero-detalle">Actualización semanal</div>
        </div>
        <div class="numero-card">
          <div class="numero-valor">64</div>
          <div class="numero-label">Funciones disponibles</div>
          <div class="numero-detalle">Múltiples horarios</div>
        </div>
        <div class="numero-card">
          <div class="numero-valor">+40</div>
          <div class="numero-label">Butacas por sala</div>
          <div class="numero-detalle">Reserva en tiempo real</div>
        </div>
      </div>
    </section>

    <!-- TECNOLOGÍAS -->
    <section class="seccion tech-section">
      <div class="seccion-header">
        <span class="seccion-badge">Stack tecnológico</span>
        <h2>Construido con las mejores herramientas</h2>
      </div>
      <div class="tech-grid">
        <div class="tech-item">
          <div class="tech-icon">⚡</div>
          <strong>Vue.js 3</strong>
          <span>Framework principal</span>
        </div>
        <div class="tech-item">
          <div class="tech-icon">🍍</div>
          <strong>Pinia</strong>
          <span>Manejo de estado</span>
        </div>
        <div class="tech-item">
          <div class="tech-icon">🛣️</div>
          <strong>Vue Router</strong>
          <span>Navegación SPA</span>
        </div>
        <div class="tech-item">
          <div class="tech-icon">🔌</div>
          <strong>MockAPI</strong>
          <span>Backend simulado</span>
        </div>
        <div class="tech-item">
          <div class="tech-icon">🎨</div>
          <strong>CSS3</strong>
          <span>Diseño responsive</span>
        </div>
        <div class="tech-item">
          <div class="tech-icon">📦</div>
          <strong>Vite</strong>
          <span>Build & dev server</span>
        </div>
      </div>
    </section>

    <!-- EQUIPO -->
    <section class="equipo">
      <div class="seccion-header centrado">
        <span class="seccion-badge">Nuestro equipo</span>
        <h2>Las personas detrás de CineORT</h2>
        <p class="equipo-intro">
          Estudiantes de ORT trabajando juntos en este proyecto integrador
        </p>
      </div>
      <div class="equipo-grid">
        <div class="miembro-card">
          <div class="miembro-avatar avatar-1">I</div>
          <h4>Ramiro - Martin - Juan - Sofìa</h4>
          <p>Developers</p>
        </div>
        <div class="miembro-card">
          <div class="miembro-avatar avatar-2">PNT2</div>
          <h4>Grupo 2</h4>
          <p>Programación en Nuevas Tecnologías 2</p>
        </div>
      </div>
    </section>

    <section class="cta">
      <h2>¿Listos para vivir el cine?</h2>
      <p>Descubrí nuestra cartelera y reservá tus entradas en segundos</p>
      <div class="cta-botones">
        <RouterLink to="/Peliculas" class="btn-primario">Ver cartelera</RouterLink>
        <RouterLink to="/cines" class="btn-secundario">Nuestros cines</RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

<style scoped>
.about-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  color: #1a3c5e;
}

.hero {
  position: relative;
  padding: 80px 40px;
  background: linear-gradient(135deg, #1e88c4 0%, #1a3c5e 100%);
  border-radius: 24px;
  overflow: hidden;
  margin-bottom: 60px;
  color: white;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 700px;
}

.hero-tag {
  display: inline-block;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 20px;
  letter-spacing: 0.5px;
}

.hero h1 {
  font-size: 56px;
  font-weight: 900;
  margin: 0 0 20px 0;
  line-height: 1.1;
}

.hero .brand {
  color: #7cb342;
}

.hero-subtitle {
  font-size: 18px;
  line-height: 1.6;
  opacity: 0.95;
  margin: 0;
}

.hero-decoracion {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  pointer-events: none;
}

.circulo {
  position: absolute;
  border-radius: 50%;
  background: rgba(124, 179, 66, 0.2);
}

.circulo.c1 { width: 300px; height: 300px; top: -80px; right: -80px; }
.circulo.c2 { width: 200px; height: 200px; bottom: -50px; right: 100px; background: rgba(255, 255, 255, 0.1); }
.circulo.c3 { width: 120px; height: 120px; top: 50%; right: 250px; background: rgba(124, 179, 66, 0.3); }

.seccion {
  margin-bottom: 60px;
  padding: 0 20px;
}

.seccion-header {
  margin-bottom: 30px;
}

.seccion-header.centrado {
  text-align: center;
}

.seccion-badge {
  display: inline-block;
  padding: 6px 14px;
  background: #e3f2fc;
  color: #1e88c4;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 12px;
}

.seccion h2 {
  font-size: 36px;
  font-weight: 900;
  margin: 0 0 16px 0;
  color: #1a3c5e;
}

.seccion-texto {
  font-size: 17px;
  line-height: 1.7;
  color: #44546a;
  margin-bottom: 20px;
}

.seccion-texto strong {
  color: #1e88c4;
}

.mvv {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 60px;
}

.mvv-card {
  background: white;
  border-radius: 16px;
  padding: 32px 28px;
  border: 1px solid #e1e8ef;
  box-shadow: 0 4px 12px rgba(26, 60, 94, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.mvv-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(26, 60, 94, 0.12);
}

.mvv-icon {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin-bottom: 20px;
}

.icon-azul { background: linear-gradient(135deg, #1e88c4 0%, #1a3c5e 100%); }
.icon-verde { background: linear-gradient(135deg, #7cb342 0%, #558b2f 100%); }

.mvv-card h3 {
  font-size: 22px;
  margin: 0 0 12px 0;
  color: #1a3c5e;
  font-weight: 900;
}

.mvv-card p {
  font-size: 15px;
  line-height: 1.6;
  color: #44546a;
  margin: 0;
}

.numeros {
  background: #f5f7fa;
  border-radius: 24px;
  padding: 60px 40px;
  margin-bottom: 60px;
  text-align: center;
}

.numeros h2 {
  font-size: 32px;
  font-weight: 900;
  margin: 0 0 40px 0;
  color: #1a3c5e;
}

.numeros-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.numero-card {
  background: white;
  border-radius: 16px;
  padding: 30px 20px;
  border: 1px solid #e1e8ef;
}

.numero-valor {
  font-size: 56px;
  font-weight: 900;
  background: linear-gradient(135deg, #1e88c4 0%, #7cb342 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 10px;
}

.numero-label {
  font-size: 15px;
  font-weight: 700;
  color: #1a3c5e;
  margin-bottom: 4px;
}

.numero-detalle {
  font-size: 13px;
  color: #6b7c93;
}

.tech-section {
  background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%);
  padding: 50px 40px;
  border-radius: 24px;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin-top: 20px;
}

.tech-item {
  background: white;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  border: 1px solid #e1e8ef;
  transition: transform 0.2s ease;
}

.tech-item:hover {
  transform: translateY(-2px);
  border-color: #1e88c4;
}

.tech-icon {
  font-size: 32px;
  margin-bottom: 10px;
}

.tech-item strong {
  display: block;
  font-size: 15px;
  color: #1a3c5e;
  margin-bottom: 4px;
}

.tech-item span {
  font-size: 12px;
  color: #6b7c93;
}

.equipo {
  margin-bottom: 60px;
  padding: 0 20px;
}

.equipo-intro {
  color: #44546a;
  font-size: 16px;
  margin-top: 8px;
}

.equipo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
  margin-top: 30px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.miembro-card {
  background: white;
  border-radius: 16px;
  padding: 30px 20px;
  text-align: center;
  border: 1px solid #e1e8ef;
  transition: transform 0.2s ease;
}

.miembro-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(26, 60, 94, 0.1);
}

.miembro-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto 16px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 28px;
  font-weight: 900;
}

.avatar-1 { background: linear-gradient(135deg, #1e88c4 0%, #1a3c5e 100%); }
.avatar-2 { 
  background: linear-gradient(135deg, #7cb342 0%, #558b2f 100%);
  font-size: 18px;
}

.miembro-card h4 {
  margin: 0 0 6px 0;
  font-size: 18px;
  color: #1a3c5e;
  font-weight: 900;
}

.miembro-card p {
  margin: 0;
  font-size: 13px;
  color: #6b7c93;
}

.cta {
  background: linear-gradient(135deg, #1e88c4 0%, #1a3c5e 100%);
  color: white;
  border-radius: 24px;
  padding: 60px 40px;
  text-align: center;
  margin-bottom: 40px;
}

.cta h2 {
  font-size: 36px;
  font-weight: 900;
  margin: 0 0 12px 0;
}

.cta p {
  font-size: 17px;
  opacity: 0.95;
  margin: 0 0 30px 0;
}

.cta-botones {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primario,
.btn-secundario {
  padding: 14px 28px;
  border-radius: 10px;
  font-weight: 700;
  text-decoration: none;
  font-size: 15px;
  transition: all 0.2s ease;
  display: inline-block;
}

.btn-primario {
  background: #7cb342;
  color: white;
}

.btn-primario:hover {
  background: #558b2f;
  transform: translateY(-2px);
}

.btn-secundario {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border: 2px solid white;
}

.btn-secundario:hover {
  background: white;
  color: #1a3c5e;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .hero {
    padding: 50px 24px;
  }
  .hero h1 {
    font-size: 36px;
  }
  .hero-subtitle {
    font-size: 16px;
  }
  .hero-decoracion {
    display: none;
  }
  .seccion h2 {
    font-size: 28px;
  }
  .numeros, .cta, .tech-section {
    padding: 40px 20px;
  }
  .numero-valor {
    font-size: 42px;
  }
}
</style>