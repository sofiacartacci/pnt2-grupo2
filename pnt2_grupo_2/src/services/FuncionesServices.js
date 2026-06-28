const URL_FUNCIONES =
  "https://6a03cd8b2afe8349b4b5823d.mockapi.io/api/v1/funciones";

async function getFunciones() {
  const respuesta = await fetch(URL_FUNCIONES);

  const funciones = await respuesta.json();

  return funciones;
}

async function getFuncionPorId(id) {
  const respuesta = await fetch(`${URL_FUNCIONES}/${id}`);

  const funcion = await respuesta.json();

  return funcion;
}

async function crearFuncion(funcion) {
  const respuesta = await fetch(URL_FUNCIONES, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(funcion),
  });

  const funcionCreada = await respuesta.json();

  return funcionCreada;
}

async function modificarFuncion(id, funcion) {
  const respuesta = await fetch(`${URL_FUNCIONES}/${id}`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(funcion),
  });

  const funcionModificada = await respuesta.json();

  return funcionModificada;
}

async function eliminarFuncion(id) {
  await fetch(`${URL_FUNCIONES}/${id}`, {
    method: "DELETE",
  });
}

export {
  getFunciones,
  getFuncionPorId,
  crearFuncion,
  modificarFuncion,
  eliminarFuncion,
};
