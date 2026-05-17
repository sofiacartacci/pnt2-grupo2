import { defineStore } from 'pinia'
import { ref } from 'vue'

const API_URL = 'https://6a03b7662afe8349b4b5717d.mockapi.io/api/v1'

export const usePeliculasStore = defineStore('peliculas', () => {
  // ----- STATE -----
  const peliculas = ref([])              // Listado de cartelera
  const peliculaSeleccionada = ref(null) // Película elegida para ver el detalle
  const funciones = ref([])              // Funciones de la película seleccionada
  const funcionSeleccionada = ref(null)  // Función elegida para comprar

  // ----- ACTIONS -----

  // Trae todas las películas de la API.
  async function cargarPeliculas() {
    // TODO (Integrante 2):
    // 1. GET a `${API_URL}/peliculas`
    // 2. peliculas.value = respuesta
  }

  // Trae una película específica por ID.
  async function cargarPeliculaPorId(id) {
    // TODO (Integrante 2):
    // 1. GET a `${API_URL}/peliculas/${id}`
    // 2. peliculaSeleccionada.value = respuesta
  }

  // Trae las funciones de una película específica.
  async function cargarFuncionesDePelicula(peliculaId) {
    // TODO (Integrante 2):
    // 1. GET a `${API_URL}/funciones?peliculaId=${peliculaId}`
    // 2. funciones.value = respuesta
  }

  // Trae una función específica por ID.
  async function cargarFuncionPorId(id) {
    // TODO (Integrante 3):
    // 1. GET a `${API_URL}/funciones/${id}`
    // 2. funcionSeleccionada.value = respuesta
  }

  // ----- ACTIONS ADMIN (Integrante 4) -----

  async function crearPelicula(datos) {
    // TODO: POST a `${API_URL}/peliculas`
  }

  async function actualizarPelicula(id, datos) {
    // TODO: PUT a `${API_URL}/peliculas/${id}`
  }

  async function eliminarPelicula(id) {
    // TODO: DELETE a `${API_URL}/peliculas/${id}`
  }

  async function crearFuncion(datos) {
    // TODO: POST a `${API_URL}/funciones`
  }

  async function actualizarFuncion(id, datos) {
    // TODO: PUT a `${API_URL}/funciones/${id}`
  }

  async function eliminarFuncion(id) {
    // TODO: DELETE a `${API_URL}/funciones/${id}`
  }

  return {
    peliculas,
    peliculaSeleccionada,
    funciones,
    funcionSeleccionada,
    cargarPeliculas,
    cargarPeliculaPorId,
    cargarFuncionesDePelicula,
    cargarFuncionPorId,
    crearPelicula,
    actualizarPelicula,
    eliminarPelicula,
    crearFuncion,
    actualizarFuncion,
    eliminarFuncion
  }
})