// Obtiene los servicios en el carrito desde el almacenamiento local y los parsea como un array
let serviciosEnCarrito = JSON.parse(
  localStorage.getItem("servicios-en-carrito")
);

// Selecciona los elementos del DOM necesarios
const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoServicios = document.querySelector("#carrito-servicios");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-servicio-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

// Función para cargar los servicios en el carrito en el DOM
function cargarServiciosCarrito() {
  // Verifica si hay servicios en el carrito y los muestra en el DOM si existen
  if (serviciosEnCarrito && serviciosEnCarrito.length > 0) {
    // Muestra el contenedor de servicios en el carrito y oculta el de carrito vacío
    contenedorCarritoVacio.classList.add("disable");
    contenedorCarritoServicios.classList.remove("disable");
    contenedorCarritoAcciones.classList.remove("disable");
    contenedorCarritoComprado.classList.add("disable");

    contenedorCarritoServicios.innerHTML = ""; // Limpia el contenedor de servicios en el carrito

    let html2;
    // Itera sobre los servicios en el carrito y los muestra en el DOM
    serviciosEnCarrito.forEach((servicio) => {
      const { imagen, titulo, descripcion, precio, id, cantidad } = servicio;
      html2 = `<div class="carrito-servicio">
                <img class="carrito-servicio-imagen" src="${imagen}" alt="${titulo}">
                <div class="carrito-servicio-titulo">
                 <small>Titulo</small>
                 <h3>${titulo}</h3>
                </div>
                <div class="carrito-servicio-descripcion">
                  <small>Descripcion</small>
                  <p>${descripcion}</p>
               </div>
               <div class="carrito-servicio-precio">
                 <small>Precio</small>
                 <p>$${precio}</p>
               </div>
               <button class="carrito-servicio-eliminar" id="${id}"><i class="bi bi-trash-fill"></i></button>
              </div>`;

      //se la agrego al contenedor
      contenedorCarritoServicios.innerHTML += html2;
    });
  } else {
    // Si no hay servicios en el carrito, muestra el contenedor de carrito vacío
    contenedorCarritoVacio.classList.remove("disable");
    contenedorCarritoServicios.classList.add("disable");
    contenedorCarritoAcciones.classList.add("disable");
    contenedorCarritoComprado.classList.add("disable");
  }

  actualizarBotonesEliminar(); // Actualiza los botones para eliminar servicios del carrito
  actualizarTotal(); // Actualiza el total del carrito
}

// Carga los servicios en el carrito al cargar la página
cargarServiciosCarrito();

// Función para actualizar los botones de eliminar servicios del carrito
function actualizarBotonesEliminar() {
  botonesEliminar = document.querySelectorAll(".carrito-servicio-eliminar");
  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", eliminarDelCarrito);
  });
}

// Función para eliminar un servicio del carrito
function eliminarDelCarrito(e) {
  // Muestra una notificación de que el servicio fue eliminado
  Toastify({
    text: "Servicio Eliminado del carrito",
    duration: 3000,
    close: true,
    gravity: "bottom",
    position: "right",
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
    onClick: function () {},
  }).showToast();

  // Obtiene el ID del servicio a eliminar y lo elimina del array de servicios en el carrito
  const idBoton = e.currentTarget.id;
  const services = serviciosEnCarrito.findIndex(
    (servicio) => servicio.id === idBoton
  );
  serviciosEnCarrito.splice(services, 1);

  cargarServiciosCarrito(); // Vuelve a cargar los servicios en el carrito actualizados

  // Actualiza el local storage con los servicios en el carrito actualizados
  localStorage.setItem(
    "servicios-en-carrito",
    JSON.stringify(serviciosEnCarrito)
  );
}

// Agrega un event listener al botón de vaciar carrito para vaciar todos los servicios del carrito
botonVaciar.addEventListener("click", vaciarCarrito);

// Función para vaciar todos los servicios del carrito
function vaciarCarrito() {
  // Muestra un diálogo de confirmación antes de vaciar el carrito
  Swal.fire({
    title: "¿Estas seguro?",
    icon: "question",
    html: `se van a borrar ${serviciosEnCarrito.reduce(
      (acc, servicio) => acc + servicio.cantidad,
      0
    )} servicios`,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: "Si",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      serviciosEnCarrito.length = 0; // Vacía el array de servicios en el carrito

      // Actualiza el local storage con el carrito vacío
      localStorage.setItem(
        "servicios-en-carrito",
        JSON.stringify(serviciosEnCarrito)
      );
      cargarServiciosCarrito(); // Vuelve a cargar los servicios en el carrito (que estarán vacíos)
      Swal.fire({
        icon: "success",
        title: "Se han eliminado correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });
}

// Función para actualizar el total del carrito
function actualizarTotal() {
  // Calcula el total sumando el precio de cada servicio multiplicado por su cantidad
  const totalCalculado = serviciosEnCarrito.reduce(
    (acc, servicio) => acc + servicio.precio * servicio.cantidad,
    0
  );
  total.innerText = `$${totalCalculado}`; // Actualiza el elemento del DOM que muestra el total
}

// Agrega un event listener al botón de comprar para realizar la compra
botonComprar.addEventListener("click", comprarCarrito);

// Función para realizar la compra (vacía el carrito y muestra un mensaje de compra realizada)
function comprarCarrito() {
  Swal.fire({
    title: "¿Estas seguro?",
    icon: "question",
    html: `Estás por comprar ${serviciosEnCarrito.reduce(
      (acc, servicio) => acc + servicio.cantidad,
      0
    )} servicios`,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: "Si",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      serviciosEnCarrito.length = 0; // Vacía el array de servicios en el carrito

      // Actualiza el almacenamiento local con el carrito vacío
      localStorage.setItem(
        "servicios-en-carrito",
        JSON.stringify(serviciosEnCarrito)
      );
      cargarServiciosCarrito(); // Vuelve a cargar los servicios en el carrito (que estarán vacíos)
      Swal.fire({
        icon: "success",
        title: "Compra realizada con éxito",
        showConfirmButton: false,
        timer: 1500,
      });
      // Oculta el contenedor del carrito y muestra el mensaje de compra realizada
      contenedorCarritoVacio.classList.add("disable");
      contenedorCarritoServicios.classList.add("disable");
      contenedorCarritoAcciones.classList.add("disable");
      contenedorCarritoComprado.classList.remove("disable");
    }
  });
}
