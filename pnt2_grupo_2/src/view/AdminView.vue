<script setup>
import { ref, onMounted } from "vue";
import { getPeliculas } from "../services/PeliculasServices";

// Acá guardamos la lista de películas que traemos de MockAPI.
// ref() = "variable reactiva", Vue actualiza la pantalla cuando cambia.
const peliculas = ref([]);

// onMounted() = "cuando el componente se carga en pantalla, ejecutá esto".
// Es el momento perfecto para pedir los datos a MockAPI.
onMounted(async () => {
  peliculas.value = await getPeliculas();
});
</script>

<template>
  <div class="admin-page">
    <h1>Panel de Administración</h1>
    <h2>Películas</h2>

    <table class="tabla-peliculas">
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
          <td>{{ pelicula.id }}</td>
          <td>{{ pelicula.titulo }}</td>
          <td>{{ pelicula.genero }}</td>
          <td>{{ pelicula.duracion }} min</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.admin-page {
  padding: 2rem;
}

.tabla-peliculas {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.tabla-peliculas th,
.tabla-peliculas td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #444;
}

.tabla-peliculas th {
  background-color: #1a1a1a;
  color: white;
}
</style>