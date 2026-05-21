<script setup>
import { ref, onMounted , watch ,computed} from "vue"
import { useRoute } from "vue-router"
import { getPeliculas } from "../services/PeliculasServices.js"
import { getFunciones } from "../services/FuncionesServices.js"
import FuncionesPorDia from "../components/FuncionesPorDia.vue"

const route = useRoute()
const pelicula = ref(null)
const funcionesPorDia = ref({})
const fechaSeleccionada = ref(null)
const fechas = computed(() => {
  return Object.keys(funcionesPorDia.value)
})

function formatoFecha(fechaApi){
  const anio = "20"+fechaApi.slice(0,2)
  const mes = fechaApi.slice(2,4)
  const dia = fechaApi.slice(4,6)
  const fecha = new Date(anio,mes-1,dia)
  const dias = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
  const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
  const nombreDia = dias[fecha.getDay()]
  const nombreMes = meses[fecha.getMonth()]
  return `${nombreDia} ${dia}/${nombreMes}`
}

const cargarPelicula = async () => {
  const todas = await getPeliculas()
  pelicula.value = todas.find(p => String(p.id) === String(route.params.id))
}

const cargarFunciones = async () => {

const id = route.params.id
const funciones = (await getFunciones()).filter(f=>f?.peliculaId == id)
  const agrupado = funciones.reduce((acc, f) => {
    (acc[f.fecha] ||= []).push(f)
    return acc
  }, {})
  const resultado = {}
  for (const fecha in agrupado) {
    const fechaFormateada = formatoFecha(fecha)
    resultado[fechaFormateada] = agrupado[fecha]
  }

  funcionesPorDia.value = resultado
const keys = Object.keys(resultado)
  fechaSeleccionada.value = keys[0] || null 
}


onMounted(()=>{
    cargarPelicula()
    cargarFunciones()
    
})

watch(
  () => route.params.id,
  () => {
    cargarPelicula()
    cargarFunciones()
  }
)

</script>

<template>

  <div v-if="pelicula" style = "display: flex;gap:40px;align-items: flex-start;">
    <div style="max-width: 600px;">
      <h2>{{ pelicula.titulo }}</h2>
      <div style="max-width: 600px;">
      <img :src="`/src/assets/${pelicula.poster}`" alt="Poster" style="width:400px" />
      <p><strong>Género:</strong> {{ pelicula.genero }}</p>
      <p><strong>Clasificación:</strong> {{ pelicula.clasificacion }}</p>
      <p><strong>Duración:</strong> {{ pelicula.duracion }}</p>
      <p><strong>Director:</strong> {{ pelicula.director }}</p>

      <h3>Sinopsis</h3>
        <p style = "text-align: justify;">
        {{ pelicula.sinopsis }}
        </p>
      </div>
  </div>
  <FuncionesPorDia
      :fechas="fechas"
      :fechaSeleccionada="fechaSeleccionada"
      :funcionesPorDia="funcionesPorDia"
      @cambiar-fecha="fechaSeleccionada = $event"
    />
  </div>
    
  <div v-else>
    Cargando...
  </div>
</template>
