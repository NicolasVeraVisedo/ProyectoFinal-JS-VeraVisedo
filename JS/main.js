//FETCH
let servicios = [];
fetch("./JS/db.json")
  .then((response) => response.json())
  .then((data) => {
    servicios = data;
    cargarServicios(servicios);
  });

// Selecciono los elementos del DOM necesarios
const contenedorServicios = document.querySelector("#contenedor-servicios");
const botonesCategorias = document.querySelectorAll(".boton-categorias");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".servicio-agregar");
const numerito = document.querySelector("#numerito");

// Función para cargar los servicios en el contenedor del DOM
function cargarServicios(serviciosElegidos) {
  if (serviciosElegidos && serviciosElegidos.length > 0) {
    // Verifica si el array está vacío o tiene servicios
    contenedorServicios.innerHTML = ""; // Vacía el contenedor de servicios
    let html;
    for (const el of serviciosElegidos) {
      // Recorre los servicios y crea una tarjeta para cada uno
      const { imagen, titulo, descripcion, precio, id } = el;

      html = `<div class="card">
                  <img class="servicio-imagen" src="${imagen}" alt="${titulo}">
                  <div class="servicio-detalle">
                      <h3 class="servicio-titulo">${titulo}</h3>
                      <p class="servicio-descripcion">${descripcion}</p>
                      <p class="servicio-precio">$${precio}</p>
                      <button class="servicio-agregar" id="${id}">Agregar</button>
                   </div>
                </div>`;
      //se la agrego al contenedor
      contenedorServicios.innerHTML += html;
    }
  } else {
    Toastify({
      text: "No se encontraron servicios disponibles",
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
  }
  actualizarBotonesAgregar(); // Actualiza los botones de agregar al carrito
}

// Función para manejar los eventos de clic en los botones de categorías
//Crea todas las tarjetas, luego al hacer click sobre cada servicio en el assets, los filtra segun su categoria y sino si vuelvo a todos, vuelve a generarlo al hacer click
botonesCategorias.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    botonesCategorias.forEach((boton) => boton.classList.remove("active"));
    e.currentTarget.classList.add("active");

    if (e.currentTarget.id != "todos") {
      // Filtra los servicios según la categoría seleccionada o muestra todos
      const servicioCategoria = servicios.find(
        (servicio) => servicio.categoria.id === e.currentTarget.id
      );
      tituloPrincipal.innerText = servicioCategoria.categoria.nombre;

      const serviciosBoton = servicios.filter(
        (servicio) => servicio.categoria.id === e.currentTarget.id
      );
      cargarServicios(serviciosBoton);
    } else {
      tituloPrincipal.innerText = "Todos los Servicios";
      cargarServicios(servicios);
    }
  });
});

// Función para actualizar los botones de agregar al carrito
function actualizarBotonesAgregar() {
  botonesAgregar = document.querySelectorAll(".servicio-agregar");
  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
  });
}

let serviciosEnCarrito;
let serviciosEnCarritoLS = localStorage.getItem("servicios-en-carrito");

if (serviciosEnCarritoLS) {
  serviciosEnCarrito = JSON.parse(serviciosEnCarritoLS);
  actualizarNumerito();
} else {
  serviciosEnCarrito = [];
}

// Función para agregar un servicio al carrito al hacer clic en el botón correspondiente
function agregarAlCarrito(e) {
  const idBoton = e.currentTarget.id;
  const servicioAgregado = servicios.find(
    (servicio) => servicio.id === idBoton
  );

  // Verificar si el servicio ya está en el carrito
  const categoria = servicioAgregado.categoria.id;
  if (
    serviciosEnCarrito.some((servicio) => servicio.categoria.id === categoria)
  ) {
    // Si el servicio ya está en el carrito, muestra un mensaje indicando que ya está agregado
    Toastify({
      text: `Ya tienes un servicio de "${servicioAgregado.categoria.nombre}" en el carrito.`,
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
  } else {
    // Si el servicio no está en el carrito, lo agrega y muestra un mensaje de éxito
    Toastify({
      text: "Servicio agregado al carrito con éxito",
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

    // Añadir el servicio al carrito
    servicioAgregado.cantidad = 1;
    serviciosEnCarrito.push(servicioAgregado);
    actualizarNumerito();
    // Guarda los servicios en el carrito en el local storage
    localStorage.setItem(
      "servicios-en-carrito",
      JSON.stringify(serviciosEnCarrito)
    );
  }

  //Prueba de que el numerito funciona incrementando su cantidad, se deben borrar los condicionales de servicios
  // Si el servicio ya está en el carrito, incrementa su cantidad; de lo contrario, lo añade con cantidad 1
  /* if (serviciosEnCarrito.some((servicio) => servicio.id === idBoton)) {
    const services = serviciosEnCarrito.findIndex(
      (servicio) => servicio.id === idBoton
    );
    serviciosEnCarrito[services].cantidad++;
  } else {
    servicioAgregado.cantidad = 1;
    serviciosEnCarrito.push(servicioAgregado);
  }
  actualizarNumerito();  */ // Actualiza el contador del carrito
}

// Función para actualizar el contador del carrito
function actualizarNumerito() {
  // Calcula la cantidad total de servicios en el carrito
  let nuevoNumerito = serviciosEnCarrito.reduce(
    (acc, servicio) => acc + servicio.cantidad,
    0
  );
  numerito.innerText = nuevoNumerito; // Actualiza el texto del contador en el DOM
}
