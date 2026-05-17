import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const API_URL = 'https://6a03b7662afe8349b4b5717d.mockapi.io/api/v1'

export const useAuthStore = defineStore('auth', () => {
  // ----- STATE -----
  // user contiene { id, email, nombre, rol } cuando hay sesión, o null si no
  const user = ref(null)

  // ----- GETTERS -----
  const isLoggedIn = computed(() => user.value !== null)
  const isAdmin = computed(() => user.value?.rol === 'admin')
  const isCliente = computed(() => user.value?.rol === 'cliente')

  // ----- ACTIONS -----

  // Inicia sesión con email + password.
  async function login(email, password) {
    // TODO (Integrante 1):
    // 1. GET a `${API_URL}/usuarios?email=${email}`
    // 2. Validar que exista y que la password coincida
    // 3. Setear user.value = datos del usuario
    // 4. Guardar en localStorage para mantener la sesión
  }

  // Registra un nuevo usuario (siempre como "cliente").
  async function register(datos) {
    // TODO (Integrante 1):
    // 1. POST a `${API_URL}/usuarios` con { email, password, nombre, rol: 'cliente' }
    // 2. Setear user.value con la respuesta
    // 3. Guardar en localStorage
  }

  // Cierra sesión.
  function logout() {
    // TODO (Integrante 1):
    // 1. user.value = null
    // 2. Limpiar localStorage
  }

  // Restaura la sesión desde localStorage al recargar la página.
  function restaurarSesion() {
    // TODO (Integrante 1):
    // 1. Leer localStorage
    // 2. Si existe un usuario guardado, setear user.value
  }

  return {
    user,
    isLoggedIn,
    isAdmin,
    isCliente,
    login,
    register,
    logout,
    restaurarSesion
  }
})