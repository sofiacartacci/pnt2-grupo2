const URL_CINES = "https://6a11d9c03e35d0f37ee3c133.mockapi.io/cines";

async function getCines() {
  const respuesta = await fetch(URL_CINES);
  const cines = await respuesta.json();
  return cines;
}

async function getCinePorId(id) {
  const respuesta = await fetch(`${URL_CINES}/${id}`);
  const cine = await respuesta.json();
  return cine;
}

export { getCines, getCinePorId };