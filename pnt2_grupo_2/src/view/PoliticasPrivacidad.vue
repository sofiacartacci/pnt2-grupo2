<template>
  <div class="legal-page">
    <div class="legal-header">
      <span class="legal-tag">Documento legal</span>
      <h1>Políticas de Privacidad</h1>
      <p class="legal-fecha">Última actualización: Mayo de 2026</p>
    </div>

    <div class="legal-intro">
      <p>
        En <strong>CineORT</strong> respetamos tu privacidad y nos comprometemos a proteger
        los datos personales que compartís con nosotros. Esta política describe cómo recopilamos,
        usamos y protegemos tu información cuando utilizás nuestra plataforma.
      </p>
    </div>

    <div class="legal-grid">
      <aside class="legal-nav">
        <h4>Índice</h4>
        <ol>
          <li><a href="#info">Información que recopilamos</a></li>
          <li><a href="#uso">Uso de tus datos</a></li>
          <li><a href="#cookies">Cookies</a></li>
          <li><a href="#proteccion">Protección de datos</a></li>
          <li><a href="#derechos">Tus derechos</a></li>
          <li><a href="#cambios">Cambios en la política</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ol>
      </aside>

      <article class="legal-content">
        <section id="info">
          <h2><span class="seccion-num">1</span> Información que recopilamos</h2>
          <p>
            Cuando te registrás o utilizás CineORT, podemos recopilar los siguientes datos:
          </p>
          <ul>
            <li><strong>Datos de identificación:</strong> nombre, apellido, fecha de nacimiento, teléfono.</li>
            <li><strong>Datos de contacto:</strong> dirección de correo electrónico.</li>
            <li><strong>Datos de acceso:</strong> contraseña encriptada y sesiones iniciadas.</li>
            <li><strong>Datos de uso:</strong> compras realizadas, butacas seleccionadas, cines visitados.</li>
            <li><strong>Datos técnicos:</strong> tipo de navegador, dispositivo y dirección IP (con fines estadísticos).</li>
          </ul>
        </section>

        <section id="uso">
          <h2><span class="seccion-num">2</span> Uso de tus datos</h2>
          <p>
            Utilizamos tu información personal exclusivamente para:
          </p>
          <ul>
            <li>Gestionar tu cuenta y permitir el acceso al sistema.</li>
            <li>Procesar tus reservas y compras de entradas.</li>
            <li>Enviarte confirmaciones de compra y notificaciones relevantes.</li>
            <li>Mejorar nuestros servicios mediante análisis estadísticos.</li>
            <li>Prevenir fraudes y proteger la seguridad de la plataforma.</li>
          </ul>
          <div class="legal-callout">
            <strong>🔒 Nunca venderemos tu información personal a terceros.</strong>
            Tus datos son tuyos y los tratamos con la confidencialidad que merecen.
          </div>
        </section>

        <section id="cookies">
          <h2><span class="seccion-num">3</span> Cookies y almacenamiento local</h2>
          <p>
            CineORT utiliza cookies y almacenamiento local del navegador (localStorage) para:
          </p>
          <ul>
            <li>Mantener tu sesión activa mientras navegás.</li>
            <li>Recordar el cine que elegiste para futuras visitas.</li>
            <li>Analizar de forma anónima cómo se usa la plataforma.</li>
          </ul>
          <p>
            Podés borrar las cookies en cualquier momento desde la configuración de tu navegador.
            Esto puede afectar algunas funcionalidades como mantener la sesión iniciada.
          </p>
        </section>

        <section id="proteccion">
          <h2><span class="seccion-num">4</span> Protección de tus datos</h2>
          <p>
            Implementamos medidas técnicas y organizativas para proteger tu información:
          </p>
          <ul>
            <li>Contraseñas almacenadas con técnicas de encriptación.</li>
            <li>Comunicación segura mediante protocolo HTTPS.</li>
            <li>Acceso restringido a la base de datos solo para personal autorizado.</li>
            <li>Auditorías periódicas de seguridad del sistema.</li>
          </ul>
        </section>

        <section id="derechos">
          <h2><span class="seccion-num">5</span> Tus derechos</h2>
          <p>
            Como usuario de CineORT, tenés derecho a:
          </p>
          <div class="derechos-grid">
            <div class="derecho-item">
              <div class="derecho-icon">👁️</div>
              <strong>Acceso</strong>
              <span>Solicitar qué datos tuyos almacenamos</span>
            </div>
            <div class="derecho-item">
              <div class="derecho-icon">✏️</div>
              <strong>Rectificación</strong>
              <span>Corregir información inexacta o desactualizada</span>
            </div>
            <div class="derecho-item">
              <div class="derecho-icon">🗑️</div>
              <strong>Eliminación</strong>
              <span>Pedir que borremos tu cuenta y datos</span>
            </div>
            <div class="derecho-item">
              <div class="derecho-icon">📤</div>
              <strong>Portabilidad</strong>
              <span>Recibir una copia de tus datos personales</span>
            </div>
          </div>
        </section>

        <section id="cambios">
          <h2><span class="seccion-num">6</span> Cambios en la política</h2>
          <p>
            Podemos actualizar esta política de privacidad ocasionalmente. Cualquier cambio
            importante será notificado en la plataforma. La fecha de "Última actualización"
            al inicio del documento indica cuándo se realizaron los cambios más recientes.
          </p>
        </section>

        <section id="contacto">
          <h2><span class="seccion-num">7</span> Contacto</h2>
          <p>
            Si tenés preguntas sobre esta política de privacidad o querés ejercer alguno de tus
            derechos, contactanos:
          </p>
          <div class="contacto-box">
            <p>📧 <strong>Email:</strong> privacidad@cineort.com</p>
            <p>📞 <strong>Teléfono:</strong> +54 11 1234-5678</p>
            <p>📍 <strong>Dirección:</strong> Buenos Aires, Argentina</p>
          </div>
        </section>
      </article>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.legal-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 60px;
  color: #1a3c5e;
}

.legal-header {
  background: linear-gradient(135deg, #1e88c4 0%, #1a3c5e 100%);
  color: white;
  padding: 60px 40px;
  border-radius: 24px;
  margin-bottom: 40px;
  text-align: center;
}

.legal-tag {
  display: inline-block;
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 16px;
}

.legal-header h1 {
  font-size: 48px;
  font-weight: 900;
  margin: 0 0 12px 0;
  line-height: 1.1;
}

.legal-fecha {
  font-size: 14px;
  opacity: 0.85;
  margin: 0;
}

.legal-intro {
  background: #f5f7fa;
  border-left: 4px solid #7cb342;
  padding: 24px 28px;
  border-radius: 12px;
  margin-bottom: 40px;
}

.legal-intro p {
  margin: 0;
  font-size: 16px;
  line-height: 1.7;
  color: #44546a;
}

.legal-intro strong {
  color: #1e88c4;
}

.legal-grid {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 40px;
  align-items: start;
}

.legal-nav {
  position: sticky;
  top: 20px;
  background: white;
  border: 1px solid #e1e8ef;
  border-radius: 16px;
  padding: 24px 20px;
  box-shadow: 0 4px 12px rgba(26, 60, 94, 0.06);
}

.legal-nav h4 {
  font-size: 13px;
  text-transform: uppercase;
  color: #6b7c93;
  font-weight: 700;
  margin: 0 0 14px 0;
  letter-spacing: 1px;
}

.legal-nav ol {
  list-style: none;
  padding: 0;
  margin: 0;
  counter-reset: nav;
}

.legal-nav li {
  counter-increment: nav;
  margin-bottom: 10px;
}

.legal-nav a {
  display: block;
  text-decoration: none;
  color: #44546a;
  font-size: 14px;
  padding: 6px 10px;
  border-radius: 6px;
  transition: all 0.2s ease;
  position: relative;
}

.legal-nav a::before {
  content: counter(nav) '.';
  color: #1e88c4;
  font-weight: 700;
  margin-right: 6px;
}

.legal-nav a:hover {
  background: #e3f2fc;
  color: #1e88c4;
  padding-left: 14px;
}

.legal-content section {
  background: white;
  border-radius: 16px;
  padding: 32px 36px;
  margin-bottom: 20px;
  border: 1px solid #e1e8ef;
  scroll-margin-top: 20px;
}

.legal-content h2 {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 24px;
  font-weight: 900;
  color: #1a3c5e;
  margin: 0 0 20px 0;
}

.seccion-num {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, #1e88c4 0%, #1a3c5e 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 900;
  flex-shrink: 0;
}

.legal-content p {
  font-size: 15px;
  line-height: 1.7;
  color: #44546a;
  margin: 0 0 12px 0;
}

.legal-content ul {
  padding-left: 0;
  list-style: none;
}

.legal-content li {
  position: relative;
  padding: 8px 0 8px 28px;
  font-size: 15px;
  line-height: 1.6;
  color: #44546a;
}

.legal-content li::before {
  content: '✓';
  position: absolute;
  left: 0;
  top: 8px;
  color: #7cb342;
  font-weight: 900;
  font-size: 16px;
}

.legal-content strong {
  color: #1a3c5e;
  font-weight: 700;
}

.legal-callout {
  background: linear-gradient(135deg, #eaf4d9 0%, #f5f7fa 100%);
  border-left: 4px solid #7cb342;
  padding: 16px 20px;
  border-radius: 8px;
  margin-top: 16px;
  color: #1a3c5e;
  font-size: 14px;
  line-height: 1.6;
}

.derechos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  margin-top: 16px;
}

.derecho-item {
  background: #f5f7fa;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  border: 1px solid #e1e8ef;
}

.derecho-icon {
  font-size: 28px;
  margin-bottom: 8px;
}

.derecho-item strong {
  display: block;
  font-size: 14px;
  color: #1a3c5e;
  margin-bottom: 4px;
}

.derecho-item span {
  font-size: 12px;
  color: #6b7c93;
  line-height: 1.4;
}

.contacto-box {
  background: #f5f7fa;
  border-radius: 12px;
  padding: 20px 24px;
  margin-top: 12px;
}

.contacto-box p {
  margin: 8px 0;
}

@media (max-width: 900px) {
  .legal-grid {
    grid-template-columns: 1fr;
  }
  .legal-nav {
    position: static;
  }
  .legal-header {
    padding: 40px 24px;
  }
  .legal-header h1 {
    font-size: 32px;
  }
  .legal-content section {
    padding: 24px 20px;
  }
}
</style>