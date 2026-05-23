<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

import { getPeliculas } from "../services/PeliculasServices";
import { getCompras } from "../services/ComprasServices";
import { getFunciones } from "../services/FuncionesServices";

const peliculas = ref([]);
const compras = ref([]);
const funciones = ref([]);

const cargando = ref(true);
const refrescando = ref(false);
const error = ref(null);
const ultimaActualizacion = ref(null);

let intervaloId = null;

async function cargarDatos(esRefresco = false) {
  if (esRefresco) {
    refrescando.value = true;
  }
  try {
    const [pels, comps, funcs] = await Promise.all([
      getPeliculas(),
      getCompras(),
      getFunciones(),
    ]);
    peliculas.value = pels;
    compras.value = comps;
    funciones.value = funcs;
    ultimaActualizacion.value = new Date();
    error.value = null;
  } catch (e) {
    error.value = "Hubo un problema al cargar los datos";
  } finally {
    cargando.value = false;
    refrescando.value = false;
  }
}

onMounted(async () => {
  await cargarDatos();
  intervaloId = setInterval(() => cargarDatos(true), 30000);
});

onUnmounted(() => {
  if (intervaloId) clearInterval(intervaloId);
});

const horaActualizacion = computed(() => {
  if (!ultimaActualizacion.value) return "";
  return ultimaActualizacion.value.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
});

const ingresosTotales = computed(() => {
  return compras.value.reduce((total, compra) => total + compra.total, 0);
});

const cantidadCompras = computed(() => {
  return compras.value.length;
});

const usuariosUnicos = computed(() => {
  const ids = compras.value.map((compra) => compra.usuarioId);
  return new Set(ids).size;
});

const promedioPorCompra = computed(() => {
  if (cantidadCompras.value === 0) return 0;
  return Math.round(ingresosTotales.value / cantidadCompras.value);
});

const ventasPorPelicula = computed(() => {
  const conteo = {};

  peliculas.value.forEach((pelicula) => {
    conteo[pelicula.id] = {
      id: pelicula.id,
      titulo: pelicula.titulo,
      genero: pelicula.genero,
      cantidad: 0,
      ingresos: 0,
    };
  });

  compras.value.forEach((compra) => {
    const funcion = funciones.value.find((f) => f.id === compra.funcionId);

    if (funcion) {
      const peliculaId = funcion.peliculaId;

      if (conteo[peliculaId]) {
        conteo[peliculaId].cantidad++;
        conteo[peliculaId].ingresos += compra.total;
      }
    }
  });

  return Object.values(conteo).sort((a, b) => b.cantidad - a.cantidad);
});

const top5Peliculas = computed(() => {
  return ventasPorPelicula.value.slice(0, 5);
});

const peoresPeliculas = computed(() => {
  return [...ventasPorPelicula.value].reverse().slice(0, 3);
});

const maxVentasPelicula = computed(() => {
  const max = Math.max(...ventasPorPelicula.value.map((p) => p.cantidad), 0);
  return max || 1;
});

function obtenerMes(fechaStr) {
  if (!fechaStr) return "Sin fecha";

  if (fechaStr.includes("-")) {
    return fechaStr.slice(0, 7);
  }

  if (fechaStr.length === 6) {
    const año = "20" + fechaStr.slice(0, 2);
    const mes = fechaStr.slice(2, 4);
    return `${año}-${mes}`;
  }

  return "Sin fecha";
}

function nombreMes(mesStr) {
  if (!mesStr || mesStr === "Sin fecha") return mesStr;
  const [año, mes] = mesStr.split("-");
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  return `${meses[parseInt(mes) - 1]} ${año}`;
}

const comprasPorMes = computed(() => {
  const conteo = {};

  compras.value.forEach((compra) => {
    const mes = obtenerMes(compra.fecCompra);

    if (!conteo[mes]) {
      conteo[mes] = { mes: mes, cantidad: 0, ingresos: 0 };
    }

    conteo[mes].cantidad++;
    conteo[mes].ingresos += compra.total;
  });

  return Object.values(conteo).sort((a, b) => a.mes.localeCompare(b.mes));
});

const maxIngresosMes = computed(() => {
  const max = Math.max(...comprasPorMes.value.map((m) => m.ingresos), 0);
  return max || 1;
});
</script>

<template>
  <div class="admin-page">
    <div class="header-panel">
      <div>
        <h1>Panel del Administrador</h1>
        <p class="subtitulo">Resumen de actividad del cine en tiempo real</p>
      </div>
      <div class="header-acciones">
        <span v-if="ultimaActualizacion" class="ultima-act">
          <span class="dot" :class="{ pulse: refrescando }"></span>
          Última actualización: {{ horaActualizacion }}
        </span>
        <button
          class="btn-refresh"
          :disabled="refrescando"
          @click="cargarDatos(true)"
        >
          {{ refrescando ? "Actualizando..." : "↻ Refrescar" }}
        </button>
      </div>
    </div>

    <p v-if="cargando" class="estado">Cargando datos...</p>

    <p v-else-if="error" class="estado error">{{ error }}</p>

    <div v-else>
      <div class="cards">
        <div class="card card-1">
          <div class="card-icon">💰</div>
          <p class="card-label">Ingresos totales</p>
          <p class="card-valor">${{ ingresosTotales.toLocaleString("es-AR") }}</p>
        </div>

        <div class="card card-2">
          <div class="card-icon">🎟️</div>
          <p class="card-label">Compras realizadas</p>
          <p class="card-valor">{{ cantidadCompras }}</p>
        </div>

        <div class="card card-3">
          <div class="card-icon">👥</div>
          <p class="card-label">Usuarios únicos</p>
          <p class="card-valor">{{ usuariosUnicos }}</p>
        </div>

        <div class="card card-4">
          <div class="card-icon">📊</div>
          <p class="card-label">Ticket promedio</p>
          <p class="card-valor">${{ promedioPorCompra.toLocaleString("es-AR") }}</p>
        </div>
      </div>

      <div class="dashboard-grid">
        <div class="widget">
          <div class="widget-header">
            <h2>🏆 Top 5 películas más vendidas</h2>
          </div>
          <div class="ranking">
            <div
              v-for="(pelicula, index) in top5Peliculas"
              :key="pelicula.id"
              class="ranking-item"
            >
              <div class="ranking-pos" :class="`pos-${index + 1}`">
                {{ index + 1 }}
              </div>
              <div class="ranking-info">
                <div class="ranking-titulo">{{ pelicula.titulo }}</div>
                <div class="ranking-genero">{{ pelicula.genero }}</div>
                <div class="barra-bg">
                  <div
                    class="barra-fill"
                    :style="{ width: (pelicula.cantidad / maxVentasPelicula) * 100 + '%' }"
                  ></div>
                </div>
              </div>
              <div class="ranking-stats">
                <div class="ranking-cantidad">{{ pelicula.cantidad }}</div>
                <div class="ranking-ingresos">
                  ${{ pelicula.ingresos.toLocaleString("es-AR") }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="widget">
          <div class="widget-header">
            <h2>📈 Ingresos por mes</h2>
          </div>
          <div class="meses-chart">
            <div
              v-for="fila in comprasPorMes"
              :key="fila.mes"
              class="mes-item"
            >
              <div class="mes-info">
                <span class="mes-nombre">{{ nombreMes(fila.mes) }}</span>
                <span class="mes-ingresos">
                  ${{ fila.ingresos.toLocaleString("es-AR") }}
                </span>
              </div>
              <div class="barra-bg">
                <div
                  class="barra-fill barra-verde"
                  :style="{ width: (fila.ingresos / maxIngresosMes) * 100 + '%' }"
                ></div>
              </div>
              <div class="mes-detalle">{{ fila.cantidad }} compras</div>
            </div>
          </div>
        </div>

        <div class="widget">
          <div class="widget-header">
            <h2>⚠️ Películas con menos ventas</h2>
          </div>
          <table class="tabla">
            <thead>
              <tr>
                <th>Título</th>
                <th>Género</th>
                <th>Compras</th>
                <th>Ingresos</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="pelicula in peoresPeliculas" :key="pelicula.id">
                <td>{{ pelicula.titulo }}</td>
                <td><span class="badge">{{ pelicula.genero }}</span></td>
                <td><span class="num-pill">{{ pelicula.cantidad }}</span></td>
                <td class="ingresos-cell">
                  ${{ pelicula.ingresos.toLocaleString("es-AR") }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="widget">
          <div class="widget-header">
            <h2>🎬 Películas en cartelera</h2>
            <span class="widget-badge">{{ peliculas.length }} títulos</span>
          </div>
          <table class="tabla">
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Género</th>
                <th>Duración</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="pelicula in peliculas" :key="pelicula.id">
                <td class="id-cell">#{{ pelicula.id }}</td>
                <td>{{ pelicula.titulo }}</td>
                <td><span class="badge">{{ pelicula.genero }}</span></td>
                <td>{{ pelicula.duracion }} min</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Paleta ORT:
   - Azul ORT principal:    #1e88c4
   - Azul ORT oscuro:       #1a3c5e
   - Verde ORT:             #7cb342
   - Verde ORT oscuro:      #558b2f
   - Gris fondo:            #f5f7fa
   - Gris texto secundario: #6b7c93
*/

.admin-page {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.header-panel {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 3px solid #1e88c4;
  flex-wrap: wrap;
  gap: 1rem;
}

.header-panel h1 {
  margin: 0;
  font-size: 2rem;
  color: #1a3c5e;
  font-weight: 900;
}

.subtitulo {
  color: #6b7c93;
  margin: 0.3rem 0 0 0;
  font-size: 0.95rem;
}

.header-acciones {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.ultima-act {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #6b7c93;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #7cb342;
  display: inline-block;
}

.dot.pulse {
  background-color: #1e88c4;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.btn-refresh {
  background-color: #1e88c4;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.btn-refresh:hover:not(:disabled) {
  background-color: #1a6fa3;
  transform: translateY(-1px);
}

.btn-refresh:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.estado {
  font-size: 1.1rem;
  margin-top: 2rem;
  text-align: center;
  color: #6b7c93;
}

.estado.error {
  color: #e74c3c;
}

/* KPI Cards con la paleta ORT */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.2rem;
  margin-bottom: 2rem;
}

.card {
  padding: 1.5rem;
  border-radius: 12px;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(26, 60, 94, 0.15);
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
}

.card-1 { background: linear-gradient(135deg, #1e88c4 0%, #1a3c5e 100%); }
.card-2 { background: linear-gradient(135deg, #7cb342 0%, #558b2f 100%); }
.card-3 { background: linear-gradient(135deg, #1a3c5e 0%, #0d2540 100%); }
.card-4 { background: linear-gradient(135deg, #4fa8d8 0%, #1e88c4 100%); }

.card-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  opacity: 0.95;
}

.card-label {
  margin: 0;
  font-size: 0.85rem;
  opacity: 0.9;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.card-valor {
  margin: 0.4rem 0 0 0;
  font-size: 1.8rem;
  font-weight: 900;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 1.5rem;
}

.widget {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(26, 60, 94, 0.08);
  border: 1px solid #e1e8ef;
}

.widget-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid #e1e8ef;
}

.widget-header h2 {
  margin: 0;
  font-size: 1.1rem;
  color: #1a3c5e;
  font-weight: 700;
}

.widget-badge {
  background: #e3f2fc;
  color: #1e88c4;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
}

/* Top 5 ranking */
.ranking {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.ranking-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.7rem;
  border-radius: 8px;
  background: #f5f7fa;
  transition: background 0.2s ease;
}

.ranking-item:hover {
  background: #e8eef5;
}

.ranking-pos {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: 900;
  color: white;
  font-size: 0.95rem;
  flex-shrink: 0;
}

.pos-1 { background: linear-gradient(135deg, #7cb342 0%, #558b2f 100%); }
.pos-2 { background: linear-gradient(135deg, #1e88c4 0%, #1a3c5e 100%); }
.pos-3 { background: linear-gradient(135deg, #4fa8d8 0%, #1e88c4 100%); }
.pos-4, .pos-5 { background: linear-gradient(135deg, #6b7c93 0%, #4a5568 100%); }

.ranking-info {
  flex: 1;
  min-width: 0;
}

.ranking-titulo {
  font-weight: 700;
  color: #1a3c5e;
  font-size: 0.95rem;
  margin-bottom: 0.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ranking-genero {
  font-size: 0.78rem;
  color: #6b7c93;
  margin-bottom: 0.4rem;
}

.barra-bg {
  height: 6px;
  background: #e1e8ef;
  border-radius: 3px;
  overflow: hidden;
}

.barra-fill {
  height: 100%;
  background: linear-gradient(90deg, #1e88c4 0%, #1a3c5e 100%);
  border-radius: 3px;
  transition: width 0.5s ease;
}

.barra-verde {
  background: linear-gradient(90deg, #7cb342 0%, #558b2f 100%);
}

.ranking-stats {
  text-align: right;
  flex-shrink: 0;
}

.ranking-cantidad {
  font-size: 1.3rem;
  font-weight: 900;
  color: #1e88c4;
  line-height: 1;
}

.ranking-ingresos {
  font-size: 0.75rem;
  color: #6b7c93;
  margin-top: 0.2rem;
}

/* Meses chart */
.meses-chart {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mes-item {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0.7rem;
  background: #f5f7fa;
  border-radius: 8px;
}

.mes-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mes-nombre {
  font-weight: 700;
  color: #1a3c5e;
  font-size: 0.9rem;
}

.mes-ingresos {
  font-weight: 900;
  color: #558b2f;
  font-size: 1rem;
}

.mes-detalle {
  font-size: 0.78rem;
  color: #6b7c93;
}

/* Tablas */
.tabla {
  width: 100%;
  border-collapse: collapse;
}

.tabla th,
.tabla td {
  padding: 0.7rem 0.5rem;
  text-align: left;
  border-bottom: 1px solid #e1e8ef;
  font-size: 0.88rem;
}

.tabla th {
  background-color: transparent;
  color: #6b7c93;
  font-weight: 700;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.tabla tbody tr:hover {
  background: #f5f7fa;
}

.tabla tbody td {
  color: #1a3c5e;
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.6rem;
  background: #e3f2fc;
  color: #1e88c4;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 700;
}

.num-pill {
  display: inline-block;
  padding: 0.25rem 0.7rem;
  background: #eaf4d9;
  color: #558b2f;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.85rem;
}

.ingresos-cell {
  font-weight: 700;
  color: #558b2f;
}

.id-cell {
  color: #6b7c93;
  font-weight: 700;
  font-size: 0.85rem;
}
</style>