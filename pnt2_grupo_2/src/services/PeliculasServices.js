const URL_PELICULAS =
  "https://6a03b7662afe8349b4b5717d.mockapi.io/api/v1/peliculas";

async function getPeliculas() {
  const respuesta = await fetch(URL_PELICULAS);

  const peliculas = await respuesta.json();

  return peliculas;
}

async function getPeliculaPorId(id) {
  const respuesta = await fetch(`${URL_PELICULAS}/${id}`);

  const pelicula = await respuesta.json();

  return pelicula;
}

async function crearPelicula(pelicula) {
  const respuesta = await fetch(URL_PELICULAS, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(pelicula),
  });

  const peliculaCreada = await respuesta.json();

  return peliculaCreada;
}

async function modificarPelicula(id, pelicula) {
  const respuesta = await fetch(`${URL_PELICULAS}/${id}`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(pelicula),
  });

  const peliculaModificada = await respuesta.json();

  return peliculaModificada;
}

async function eliminarPelicula(id) {
  await fetch(`${URL_PELICULAS}/${id}`, {
    method: "DELETE",
  });
}

export {
  getPeliculas,
  getPeliculaPorId,
  crearPelicula,
  modificarPelicula,
  eliminarPelicula,
};
