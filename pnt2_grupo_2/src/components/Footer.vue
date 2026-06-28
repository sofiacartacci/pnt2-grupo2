<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-top">
        <div class="footer-section">
          <h3 class="footer-title">CineORT</h3>
          <p class="footer-desc">Tu plataforma de cine favorita. Películas, funciones y experiencias increíbles.</p>
          <div class="social-links">
            <a href="#" class="social-icon facebook" title="Facebook" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" class="social-icon instagram" title="Instagram" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="url(#instagramGradient)">
                <defs>
                  <linearGradient id="instagramGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:#feda75;stop-opacity:1" />
                    <stop offset="5%" style="stop-color:#fa7e1e;stop-opacity:1" />
                    <stop offset="45%" style="stop-color:#d92e7f;stop-opacity:1" />
                    <stop offset="60%" style="stop-color:#9b36b7;stop-opacity:1" />
                    <stop offset="90%" style="stop-color:#515bd4;stop-opacity:1" />
                  </linearGradient>
                </defs>
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.117.6c-.77.3-1.417.72-2.049 1.35-.63.632-1.05 1.278-1.35 2.048-.267.789-.468 1.659-.527 3.037C.085 8.333.07 8.74.07 12c0 3.26.015 3.667.072 4.947.06 1.377.261 2.248.558 3.037.3.77.72 1.417 1.35 2.049.631.63 1.278 1.05 2.047 1.35.789.268 1.659.468 3.037.527 1.27.06 1.677.072 4.947.072s3.668-.015 4.947-.072c1.377-.059 2.248-.259 3.037-.558.77-.3 1.417-.72 2.049-1.35.63-.631 1.05-1.277 1.35-2.047.268-.789.468-1.659.527-3.037.06-1.27.072-1.677.072-4.947s-.015-3.668-.072-4.947c-.059-1.377-.259-2.248-.558-3.037-.3-.77-.72-1.417-1.35-2.049-.631-.63-1.278-1.05-2.047-1.35-.789-.268-1.659-.468-3.037-.527C15.667.085 15.26.07 12 .07zm0 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.25 2.227.415.56.217.96.477 1.382.896.419.42.679.822.896 1.381.165.422.36 1.057.413 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.25 1.805-.414 2.227-.217.56-.477.96-.896 1.382-.42.419-.822.679-1.381.896-.422.165-1.057.36-2.227.413-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.805-.25-2.227-.414-.56-.217-.96-.477-1.382-.896-.419-.42-.679-.822-.896-1.381-.165-.422-.36-1.057-.413-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.25-1.805.414-2.227.217-.56.477-.96.896-1.382.42-.419.822-.679 1.381-.896.422-.165 1.057-.36 2.227-.413 1.266-.058 1.646-.07 4.85-.07z"/>
                <circle cx="12" cy="12" r="3.846" fill="url(#instagramGradient)"/>
              </svg>
            </a>
            <a href="#" class="social-icon twitter" title="Twitter" aria-label="Twitter">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.625l-5.195-6.791-5.965 6.791h-3.306l7.73-8.835L.47 2.25h6.556l4.702 6.217 5.516-6.217zM17.15 18.39h1.828L5.066 4.1H3.15z"/>
              </svg>
            </a>
            <a href="#" class="social-icon youtube" title="YouTube" aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>

        <div class="footer-section">
          <h4 class="footer-subtitle">Navegación</h4>
          <ul class="footer-links">
            <li><RouterLink to="/">Home</RouterLink></li>
            <li><RouterLink to="/Peliculas">Películas</RouterLink></li>
          </ul>
        </div>

<div class="footer-section">
  <h4 class="footer-subtitle">Información</h4>
  <ul class="footer-links">
    <li><RouterLink to="/sobre-nosotros">Sobre Nosotros</RouterLink></li>
    <li><RouterLink to="/politicas-privacidad">Políticas de Privacidad</RouterLink></li>
    <li><RouterLink to="/terminos-condiciones">Términos y Condiciones</RouterLink></li>
  </ul>
</div>

        <div class="footer-section">
          <h4 class="footer-subtitle">Contacto</h4>
          <ul class="footer-contact">
            <li>
              <span class="contact-icon">✉</span>
              <span>info@cineort.com</span>
            </li>
            <li>
              <span class="contact-icon">☎</span>
              <span>+54 11 1234-5678</span>
            </li>
            <li>
              <span class="contact-icon">📍</span>
              <span>Buenos Aires, Argentina</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer-divider"></div>

      <div class="footer-bottom">
        <p class="footer-copyright">
          &copy; 2026 CineORT. Todos los derechos reservados. Desarrollado por PNT2 Grupo 2.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, #0a1a2f 0%, #0f2847 100%);
  color: var(--color-texto);
  margin-top: 2rem;
  border-top: 2px solid var(--color-acento);
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 3rem;
}

.footer-top {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.footer-title {
  font-size: 1.4rem;
  font-weight: 900;
  background: linear-gradient(135deg, #00a3e0 0%, #0084d1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  letter-spacing: -1px;
}

.footer-subtitle {
  font-size: 0.85rem;
  font-weight: 700;
  color: #e0e0e0;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.footer-desc {
  color: #b0b8c1;
  font-size: 0.85rem;
  line-height: 1.5;
  margin: 0;
}

.social-links {
  display: flex;
  gap: 0.6rem;
  margin-top: 0.3rem;
}

.social-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  border: none;
  position: relative;
  overflow: hidden;
}

.social-icon svg {
  width: 24px;
  height: 24px;
  transition: all 0.3s ease;
}

.social-icon.facebook {
  color: white;
  background: #1877F2;
  box-shadow: 0 6px 16px rgba(24, 119, 242, 0.4);
}

.social-icon.facebook:hover {
  transform: translateY(-4px) scale(1.08);
  box-shadow: 0 10px 24px rgba(24, 119, 242, 0.6);
}

.social-icon.instagram {
  background: linear-gradient(135deg, #feda75 0%, #fa7e1e 5%, #d92e7f 45%, #9b36b7 60%, #515bd4 90%);
  color: white;
  box-shadow: 0 6px 16px rgba(217, 46, 127, 0.4);
}

.social-icon.instagram:hover {
  transform: translateY(-4px) scale(1.08);
  box-shadow: 0 10px 24px rgba(217, 46, 127, 0.6);
  filter: brightness(1.1);
}

.social-icon.twitter {
  color: white;
  background: #000000;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
}

.social-icon.twitter:hover {
  transform: translateY(-4px) scale(1.08);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.6);
}

.social-icon.youtube {
  color: white;
  background: #FF0000;
  box-shadow: 0 6px 16px rgba(255, 0, 0, 0.5);
}

.social-icon.youtube:hover {
  transform: translateY(-4px) scale(1.08);
  box-shadow: 0 10px 24px rgba(255, 0, 0, 0.7);
  filter: brightness(1.1);
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-links a {
  color: #b0b8c1;
  text-decoration: none;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  position: relative;
  padding-left: 0;
}

.footer-links a::before {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--color-acento);
  transition: width 0.3s ease;
}

.footer-links a:hover {
  color: var(--color-acento);
  padding-left: 6px;
}

.footer-links a:hover::before {
  width: 100%;
}

.footer-contact {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.footer-contact li {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: #b0b8c1;
  font-size: 0.85rem;
  transition: all 0.3s ease;
}

.footer-contact li:hover {
  color: var(--color-acento);
  transform: translateX(3px);
}

.contact-icon {
  font-size: 1rem;
  min-width: 18px;
  text-align: center;
}

.footer-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-acento), transparent);
  margin: 1.5rem 0;
}

.footer-bottom {
  text-align: center;
}

.footer-copyright {
  color: #7a8a99;
  font-size: 0.8rem;
  margin: 0;
  letter-spacing: 0.3px;
}

@media (max-width: 768px) {
  .footer-content {
    padding: 1.5rem;
  }

  .footer-top {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .footer-title {
    font-size: 1.2rem;
  }

  .social-links {
    gap: 0.5rem;
  }

  .social-icon {
    width: 36px;
    height: 36px;
  }

  .social-icon svg {
    width: 20px;
    height: 20px;
  }

  .footer-links a:hover {
    padding-left: 3px;
  }
}
</style>