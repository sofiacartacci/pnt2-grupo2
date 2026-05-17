<script setup>
import { ref, onMounted } from "vue";
import { useComprasStore } from "../stores/comprasStore";
import { useAuthStore } from "../stores/authStore";

const comprasStore = useComprasStore();
const authStore = useAuthStore();

const paso = ref("butacas");

const nombreComprador = ref("");
const emailComprador = ref("");

const compraConfirmada = ref(null);
const procesando = ref(false);

const filas = ["A", "B", "C", "D", "E"];
const columnas = [1, 2, 3, 4, 5, 6, 7, 8];

onMounted(() => {
  comprasStore.cargarFuncion("1");
});

function estadoButaca(codigo) {
  const ocupadas = comprasStore.funcion?.butacasOcupadas || [];
  if (ocupadas.includes(codigo)) {
    return "ocupada";
  }
  if (comprasStore.butacasSeleccionadas.includes(codigo)) {
    return "seleccionada";
  }
  return "libre";
}

function clickButaca(codigo) {
  if (estadoButaca(codigo) === "ocupada") {
    return;
  }
  comprasStore.toggleButaca(codigo);
}

function irAlCheckout() {
  if (comprasStore.butacasSeleccionadas.length === 0) {
    return;
  }
  nombreComprador.value = authStore.user?.nombre || "";
  emailComprador.value = authStore.user?.email || "";
  paso.value = "checkout";
}

function volverAButacas() {
  paso.value = "butacas";
}

async function confirmarCompra() {
  procesando.value = true;

  const compra = await comprasStore.confirmarCompra(authStore.user.id);

  procesando.value = false;

  if (compra) {
    compraConfirmada.value = compra;
    paso.value = "exito";
  }
}
</script>

<template>
  <div class="butacas-page">
    <h1>Seleccioná tus butacas</h1>

    <div v-if="comprasStore.funcion" class="info-funcion">
      <p>{{ comprasStore.funcion.sala }} · {{ comprasStore.funcion.hora }} · {{ comprasStore.funcion.idioma }}</p>
    </div>
    <p v-else class="cargando">Cargando función...</p>

    <template v-if="paso === 'butacas'">
      <div class="pantalla">PANTALLA</div>

      <div class="sala">
        <div v-for="fila in filas" :key="fila" class="fila">
          <span class="letra-fila">{{ fila }}</span>
          <button
            v-for="col in columnas"
            :key="fila + col"
            class="butaca"
            :class="estadoButaca(fila + col)"
            @click="clickButaca(fila + col)"
          >
            {{ col }}
          </button>
        </div>
      </div>

      <div class="referencias">
        <span><span class="muestra libre"></span> Libre</span>
        <span><span class="muestra seleccionada"></span> Seleccionada</span>
        <span><span class="muestra ocupada"></span> Ocupada</span>
      </div>

      <div class="resumen">
        <p>Butacas seleccionadas: {{ comprasStore.butacasSeleccionadas.join(", ") || "ninguna" }}</p>
        <p class="total">Total: ${{ comprasStore.total }}</p>
      </div>

      <button
        class="boton-principal"
        :disabled="comprasStore.butacasSeleccionadas.length === 0"
        @click="irAlCheckout"
      >
        Continuar
      </button>
    </template>

    <template v-else-if="paso === 'checkout'">
      <div class="checkout">
        <h2>Confirmá tu compra</h2>

        <div class="resumen-compra">
          <div class="linea">
            <span>Función</span>
            <span>{{ comprasStore.funcion.sala }} · {{ comprasStore.funcion.hora }}</span>
          </div>
          <div class="linea">
            <span>Butacas</span>
            <span>{{ comprasStore.butacasSeleccionadas.join(", ") }}</span>
          </div>
          <div class="linea">
            <span>Cantidad</span>
            <span>{{ comprasStore.butacasSeleccionadas.length }}</span>
          </div>
          <div class="linea total-linea">
            <span>Total</span>
            <span>${{ comprasStore.total }}</span>
          </div>
        </div>

        <div class="formulario">
          <label>Nombre</label>
          <input v-model="nombreComprador" type="text" placeholder="Tu nombre" />

          <label>Email</label>
          <input v-model="emailComprador" type="email" placeholder="Tu email" />
        </div>

        <p v-if="comprasStore.error" class="error-msg">{{ comprasStore.error }}</p>

        <div class="botones-checkout">
          <button class="boton-secundario" @click="volverAButacas">
            Volver
          </button>
          <button
            class="boton-principal"
            :disabled="procesando"
            @click="confirmarCompra"
          >
            {{ procesando ? "Procesando..." : "Confirmar compra" }}
          </button>
        </div>
      </div>
    </template>

    <template v-else-if="paso === 'exito'">
      <div class="ticket">
        <div class="ticket-check">✓</div>
        <h2>¡Compra confirmada!</h2>
        <p class="ticket-sub">Tu entrada para CineORT</p>

        <div class="ticket-datos">
          <div class="linea">
            <span>Función</span>
            <span>{{ comprasStore.funcion.sala }} · {{ comprasStore.funcion.hora }}</span>
          </div>
          <div class="linea">
            <span>Butacas</span>
            <span>{{ compraConfirmada.butacas.join(", ") }}</span>
          </div>
          <div class="linea">
            <span>N° de compra</span>
            <span>#{{ compraConfirmada.id }}</span>
          </div>
          <div class="linea total-linea">
            <span>Total pagado</span>
            <span>${{ compraConfirmada.total }}</span>
          </div>
        </div>

        <p class="ticket-pie">Presentá este ticket en la entrada. ¡Disfrutá la función!</p>
      </div>
    </template>
  </div>
</template>

<style scoped>
.butacas-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

h1 {
  color: var(--color-acento);
}

.info-funcion p {
  color: var(--color-texto-secundario);
  margin: 0;
}

.pantalla {
  width: 80%;
  max-width: 500px;
  background-color: var(--color-superficie-clara);
  color: var(--color-texto-secundario);
  text-align: center;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  letter-spacing: 4px;
}

.sala {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.fila {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.letra-fila {
  width: 20px;
  font-weight: 700;
  color: var(--color-texto-secundario);
}

.butaca {
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 700;
  transition: transform 0.1s ease;
}

.butaca:hover {
  transform: scale(1.1);
}

.butaca.libre {
  background-color: #d3d1c7;
  color: #444;
}

.butaca.seleccionada {
  background-color: var(--color-acento);
  color: white;
}

.butaca.ocupada {
  background-color: #5f5e5a;
  color: #888;
  cursor: not-allowed;
}

.butaca.ocupada:hover {
  transform: none;
}

.referencias {
  display: flex;
  gap: 1.5rem;
  font-size: 0.85rem;
  color: var(--color-texto-secundario);
}

.referencias span {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.muestra {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  display: inline-block;
}

.muestra.libre { background-color: #d3d1c7; }
.muestra.seleccionada { background-color: var(--color-acento); }
.muestra.ocupada { background-color: #5f5e5a; }

.resumen {
  text-align: center;
}

.total {
  font-size: 1.3rem;
  font-weight: 900;
  color: var(--color-acento);
}

.boton-principal {
  background-color: var(--color-acento);
  color: white;
  border: none;
  border-radius: var(--radio-borde);
  padding: 0.9rem 2.5rem;
  font-size: 1rem;
  font-weight: 900;
  cursor: pointer;
}

.boton-principal:disabled {
  background-color: #5f5e5a;
  cursor: not-allowed;
}

.boton-secundario {
  background-color: var(--color-superficie);
  color: var(--color-texto);
  border: none;
  border-radius: var(--radio-borde);
  padding: 0.9rem 2.5rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
}

.checkout {
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.checkout h2 {
  color: var(--color-acento);
  text-align: center;
}

.resumen-compra {
  background-color: var(--color-superficie);
  border-radius: var(--radio-borde);
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.linea {
  display: flex;
  justify-content: space-between;
  color: var(--color-texto-secundario);
  font-size: 0.95rem;
}

.total-linea {
  border-top: 1px solid var(--color-superficie-clara);
  padding-top: 0.7rem;
  margin-top: 0.3rem;
  color: var(--color-texto);
  font-weight: 900;
  font-size: 1.2rem;
}

.formulario {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.formulario label {
  color: var(--color-texto-secundario);
  font-size: 0.9rem;
}

.formulario input {
  background-color: var(--color-superficie);
  border: none;
  border-radius: var(--radio-borde);
  padding: 0.8rem;
  color: var(--color-texto);
  font-size: 0.95rem;
}

.error-msg {
  margin: 0;
  color: var(--color-error);
  text-align: center;
  font-size: 0.9rem;
}

.botones-checkout {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.ticket {
  width: 100%;
  max-width: 420px;
  background-color: var(--color-superficie);
  border-radius: var(--radio-borde);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
}

.ticket-check {
  width: 60px;
  height: 60px;
  background-color: var(--color-acento);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 900;
}

.ticket h2 {
  color: var(--color-acento);
  margin: 0;
}

.ticket-sub {
  color: var(--color-texto-secundario);
  margin: 0;
}

.ticket-datos {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-top: 0.5rem;
}

.ticket-pie {
  color: var(--color-texto-secundario);
  font-size: 0.85rem;
  text-align: center;
  margin-top: 0.5rem;
}
</style>