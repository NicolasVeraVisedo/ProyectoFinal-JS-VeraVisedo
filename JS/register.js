const formRegister = document.querySelector("#formReg"),
  email = document.querySelector("#email"),
  nombre = document.querySelector("#nombre"),
  userReg = document.querySelector("#userReg"),
  passReg = document.querySelector("#passReg"),
  btnRegistrar = document.querySelector("#registrar");

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || []; //si hay datos en LS usuarios = LS, sino usuarios = []

//Constructor de usuarios
class Usuario {
  constructor(nombre, usuario, email, password) {
    this.nombre = nombre;
    this.usuario = usuario;
    this.email = email;
    this.pass = password;
  }
}

//Guardar usuarios
function guardarUsuario(usuario) {
  return usuarios.push(usuario);
}

//Guardar en LS
function guardarEnLS(arr) {
  return localStorage.setItem("usuarios", JSON.stringify(arr));
}

//Evento
formRegister.addEventListener("submit", (e) => {
  e.preventDefault();

  // Verificar si algun input está vacío
  if (!nombre.value || !userReg.value || !email.value || !passReg.value) {
    // Mostrar mensaje de que todas las inputs deben estar completas
    Toastify({
      text: `Todos los campos deben estar completos`,
      duration: 3000,
      close: true,
      gravity: "bottom", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #ec4e04, #eba489)",
        borderRadius: "2rem",
        textTransform: "uppercase",
        fontSize: "0.75rem",
      },
      offset: {
        x: "1.5rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
        y: "1.5rem", // vertical axis - can be a number or a string indicating unity. eg: '2em'
      },
      onClick: function () {}, // Callback after click
    }).showToast();

    return; // Detener el proceso de registro
  }

  // Verificar si el usuario ya está registrado
  const usuarioExistente = usuarios.find(
    (usuario) => usuario.usuario === userReg.value
  );

  if (usuarioExistente) {
    // Mostrar mensaje de que el usuario ya está registrado
    Toastify({
      text: `El usuario ${userReg.value} ya se encuentra registrado`,
      duration: 3000,
      close: true,
      gravity: "bottom", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #ec4e04, #eba489)",
        borderRadius: "2rem",
        textTransform: "uppercase",
        fontSize: "0.75rem",
      },
      offset: {
        x: "1.5rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
        y: "1.5rem", // vertical axis - can be a number or a string indicating unity. eg: '2em'
      },
      onClick: function () {}, // Callback after click
    }).showToast();

    return; // Detener el proceso de registro
  }

  const newUsuario = new Usuario(
    nombre.value,
    userReg.value,
    email.value,
    passReg.value
  );

  guardarUsuario(newUsuario);
  guardarEnLS(usuarios);

  Toastify({
    text: `Usuario registrado con éxito`,
    duration: 3000,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #ec4e04, #eba489)",
      borderRadius: "2rem",
      textTransform: "uppercase",
      fontSize: "0.75rem",
    },
    offset: {
      x: "1.5rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
      y: "1.5rem", // vertical axis - can be a number or a string indicating unity. eg: '2em'
    },
    onClick: function () {}, // Callback after click
  }).showToast();
});
