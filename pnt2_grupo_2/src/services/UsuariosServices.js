const URL_USUARIOS =
  "https://6a03b7662afe8349b4b5717d.mockapi.io/api/v1/usuarios";

async function getUsuarios() {
  const respuesta = await fetch(URL_USUARIOS);

  const usuarios = await respuesta.json();

  return usuarios;
}

async function getUsuarioPorId(id) {
  const respuesta = await fetch(`${URL_USUARIOS}/${id}`);

  const usuario = await respuesta.json();

  return usuario;
}

async function crearUsuario(usuario) {
  const respuesta = await fetch(URL_USUARIOS, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(usuario),
  });

  const usuarioCreado = await respuesta.json();

  return usuarioCreado;
}

export { getUsuarios, getUsuarioPorId, crearUsuario };
