// Seleccionar elementos del formulario de registro
const formRegister = document.querySelector("#formReg"),
  email = document.querySelector("#email"),
  nombre = document.querySelector("#nombre"),
  userReg = document.querySelector("#userReg"),
  passReg = document.querySelector("#passReg"),
  btnRegistrar = document.querySelector("#registrar");

// Obtener usuarios de LS o inicializar como array vacío si no hay datos
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// Definir la clase Usuario para crear objetos de usuario
class Usuario {
  constructor(nombre, usuario, email, password) {
    this.nombre = nombre;
    this.usuario = usuario;
    this.email = email;
    this.pass = password;
  }
}

// Función para agregar un usuario al array usuarios
function guardarUsuario(usuario) {
  return usuarios.push(usuario);
}

// Función para guardar el array usuarios en LS
function guardarEnLS(arr) {
  return localStorage.setItem("usuarios", JSON.stringify(arr));
}

// Evento del boton registrarse del formulario de registro
formRegister.addEventListener("submit", (e) => {
  e.preventDefault();

  // Verificar si algun input está vacío
  if (!nombre.value || !userReg.value || !email.value || !passReg.value) {
    // Mostrar mensaje de que todas los inputs deben estar completos
    mostrarMensaje2(`Todos los campos deben estar completos`);
    return; // Detener el proceso de registro
  }

  // Verificar si el usuario ya está registrado
  const usuarioExistente = usuarios.find(
    (usuario) => usuario.usuario === userReg.value
  );

  if (usuarioExistente) {
    // Mostrar mensaje de que el usuario ya está registrado
    mostrarMensaje2(`El usuario ${userReg.value} ya se encuentra registrado`);
    return; // Detener el proceso de registro
  }

  // Crear un nuevo objeto Usuario con los datos del formulario
  const newUsuario = new Usuario(
    nombre.value,
    userReg.value,
    email.value,
    passReg.value
  );

  guardarUsuario(newUsuario); // Guardar el nuevo usuario en el array usuarios
  guardarEnLS(usuarios); // Guardar el array usuarios en localStorage

  // Mostrar mensaje de éxito
  mostrarMensaje2(`Usuario registrado con éxito`);
});

// Función para mostrar un mensaje con Toastify
function mostrarMensaje2(mensaje) {
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
