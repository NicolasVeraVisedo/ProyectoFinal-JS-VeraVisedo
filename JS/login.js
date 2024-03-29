const formIngresar = document.querySelector("#login"),
  userInput = document.querySelector("#user"),
  passInput = document.querySelector("#pass");

//Funciones
function inicioSesion(usuarios) {
  //Código inicio sesion

  if (!usuarios || usuarios.length === 0) {
    // Si no hay usuarios o el array está vacío
    mostrarMensaje("Usuario no encontrado");
    return;
  }

  let userFound = usuarios.find((usuario) => {
    return usuario.nombre == userInput.value && passInput.value;
  });
  //si userFound redireccionar
  userFound
    ? (location.href = "./index2.html")
    : mostrarMensaje("Usuario no encontrado");
}

function mostrarMensaje(mensaje) {
  Toastify({
    text: mensaje,
    duration: 5000,
    close: true,
    gravity: "bottom",
    position: "center",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #ec4e04, #eba489)",
      borderRadius: "2rem",
      textTransform: "uppercase",
      fontSize: "0.75rem",
    },
    offset: {
      x: "1.5rem",
      y: "1.5rem",
    },
  }).showToast();
}

function recuperarLS() {
  return JSON.parse(localStorage.getItem("usuarios"));
}

//Ejecucion de funciones
const usuariosLS = recuperarLS();

//Listeners
formIngresar.addEventListener("submit", (e) => {
  e.preventDefault();
  inicioSesion(usuariosLS);
});
