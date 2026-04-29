<script setup>
</script>

<template>
  <div id="app">
    <header>
      <h1>Trabajo Integrador - Grupo 2</h1>
      <nav>
        <RouterLink to="/integrante1">Eduardo Ramiro Calaza</RouterLink>
        <RouterLink to="/integrante2">Sofia Cartacci</RouterLink>
        <RouterLink to="/integrante3">Ferreyra Juan Gabriel</RouterLink>
        <RouterLink to="/integrante4">Mendez Monsalvo Martin</RouterLink>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
header {
  padding: 1rem 2rem;
  background-color: #1a1a1a;
  color: white;
}

h1 {
  margin: 0 0 1rem 0;
}

nav {
  display: flex;
  gap: 1rem;
}

nav a {
  text-decoration: none;
  color: #ccc;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

nav a:hover {
  background-color: #333;
  color: white;
}

nav a.router-link-active {
  background-color: #42b883;
  color: white;
}

main {
  padding: 2rem;
}
</style>