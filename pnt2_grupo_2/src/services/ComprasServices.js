const URL_COMPRAS =
  "https://6a03cd8b2afe8349b4b5823d.mockapi.io/api/v1/compras";

async function getCompras() {
  const respuesta = await fetch(URL_COMPRAS);

  const compras = await respuesta.json();

  return compras;
}

async function getCompraPorId(id) {
  const respuesta = await fetch(`${URL_COMPRAS}/${id}`);

  const compra = await respuesta.json();

  return compra;
}

async function crearCompra(compra) {
  const respuesta = await fetch(URL_COMPRAS, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(compra),
  });

  const compraCreada = await respuesta.json();

  return compraCreada;
}

async function modificarCompra(id, compra) {
  const respuesta = await fetch(`${URL_COMPRAS}/${id}`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(compra),
  });

  const compraModificada = await respuesta.json();

  return compraModificada;
}

async function eliminarCompra(id) {
  await fetch(`${URL_COMPRAS}/${id}`, {
    method: "DELETE",
  });
}

export {
  getCompras,
  getCompraPorId,
  crearCompra,
  modificarCompra,
  eliminarCompra,
};
