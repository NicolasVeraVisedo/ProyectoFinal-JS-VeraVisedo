// Seleccionar elementos del formulario de inicio de sesión
const formIngresar = document.querySelector("#login"),
  userInput = document.querySelector("#user"),
  passInput = document.querySelector("#pass");

// Función para iniciar sesión
function inicioSesion(usuarios) {
  // Verificar si no hay usuarios o el array está vacío
  if (!usuarios || usuarios.length === 0) {
    mostrarMensaje1("Usuario no encontrado");
    return;
  }

  // Buscar el usuario en el array de usuarios
  let userFound = usuarios.find((user) => {
    return user.usuario == userInput.value && user.pass == passInput.value;
  });

  // Redireccionar si se encuentra el usuario, de lo contrario, mostrar mensaje
  if (userFound) {
    location.href = "./index2.html";
  } else {
    // Mostrar mensaje de contraseña incorrecta si el usuario existe pero la contraseña es incorrecta
    let userExists = usuarios.some((user) => user.usuario == userInput.value);
    if (userExists) {
      mostrarMensaje1("Contraseña incorrecta");
    } else {
      // Mostrar mensaje de usuario no encontrado si el usuario no existe
      mostrarMensaje1("Usuario no encontrado");
    }
  }
}

// Función para mostrar un mensaje con Toastify
function mostrarMensaje1(mensaje) {
  Toastify({
    text: mensaje,
    duration: 5000,
    close: true,
    gravity: "bottom",
    position: "center",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #000000, #eba489)",
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

// Función para recuperar usuarios del localStorage
function recuperarLS() {
  return JSON.parse(localStorage.getItem("usuarios"));
}

// Ejecutar función para recuperar usuarios del localStorage
const usuariosLS = recuperarLS();

// Listener para el evento del boton ingresar del formulario de inicio de sesión
formIngresar.addEventListener("submit", (e) => {
  e.preventDefault();
  inicioSesion(usuariosLS); // Llamar a la función para iniciar sesión con los usuarios recuperados del localStorage
});
