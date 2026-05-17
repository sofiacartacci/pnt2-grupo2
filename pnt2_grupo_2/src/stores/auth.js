import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const API_URL = 'https://6a03b7662afe8349b4b5717d.mockapi.io/api/v1/usuarios'

export const useAuthStore = defineStore('auth', () => {
  // ----- STATE -----
  const user = ref(null)

  // ----- GETTERS -----
  const isLoggedIn = computed(() => user.value !== null)
  const isAdmin = computed(() => user.value?.rol === 'admin')
  const isCliente = computed(() => user.value?.rol === 'cliente')

  // ----- ACTIONS -----

  // Inicia sesión con email + password.
  async function login(email, password) {
    // 1. Pedimos a la API los usuarios con ese email
    const res = await fetch(`${API_URL}/usuarios?email=${email}`)

    // Si la API no responde con 200, algo falló
    if (!res.ok) {
      throw new Error('Error al conectar con el servidor')
    }

    const usuarios = await res.json()

    // 2. MockAPI devuelve un array. Si está vacío, el email no existe.
    if (usuarios.length === 0) {
      throw new Error('El email no está registrado')
    }

    const usuarioEncontrado = usuarios[0]

    // 3. Validamos la password
    if (usuarioEncontrado.password !== password) {
      throw new Error('Contraseña incorrecta')
    }

    // 4. Login exitoso: guardamos el usuario en el state
    user.value = usuarioEncontrado

    // 5. Guardamos en localStorage para mantener la sesión al recargar
    localStorage.setItem('user', JSON.stringify(usuarioEncontrado))
  }

  // Registra un nuevo usuario (siempre como "cliente").
  async function register(datos) {
    // 1. Primero chequeamos que el email no esté ya en uso
    const resCheck = await fetch(`${API_URL}/usuarios?email=${datos.email}`)
    const existentes = await resCheck.json()

    if (existentes.length > 0) {
      throw new Error('Ese email ya está registrado')
    }

    // 2. Creamos el usuario con POST. El rol siempre es 'cliente'.
    const nuevoUsuario = {
      email: datos.email,
      password: datos.password,
      nombre: datos.nombre,
      rol: 'cliente'
    }

    const res = await fetch(`${API_URL}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoUsuario)
    })

    if (!res.ok) {
      throw new Error('Error al registrar el usuario')
    }

    // 3. La API devuelve el usuario creado (con su id). Lo logueamos.
    const usuarioCreado = await res.json()
    user.value = usuarioCreado
    localStorage.setItem('user', JSON.stringify(usuarioCreado))
  }

  // Cierra sesión.
  function logout() {
    user.value = null
    localStorage.removeItem('user')
  }

  // Restaura la sesión desde localStorage al recargar la página.
  function restaurarSesion() {
    const guardado = localStorage.getItem('user')
    if (guardado) {
      user.value = JSON.parse(guardado)
    }
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