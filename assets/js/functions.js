// Función para mostrar articulos
function mostrarArticulos() {
    productos.forEach(productoDeLista => {
        let articuloElemento = crearArticulo(productoDeLista);
        contenedorArticulos.append(articuloElemento);
    });
};

// Crear elemento
function crearArticulo(productoDeLista) {
    let contenedor = document.createElement("div");
    contenedor.classList.add("productoDeLista");
    contenedor.innerHTML = `
        <img class="zapa-img" src="${productoDeLista.img}" alt="${productoDeLista.referencia}">
        <h3>${productoDeLista.referencia}</h3>
        <p>$${productoDeLista.valor}</p>
    `;

    let botonAgregar = document.createElement("button");
    botonAgregar.classList.add("btn-articulo");
    botonAgregar.textContent = "Agregar al carrito";
    botonAgregar.addEventListener('click', () => {
        agregarAlCarrito(productoDeLista);
    });

    contenedor.append(botonAgregar);
    return contenedor;
};

// Funciones para gestionar el carrito

function agregarAlCarrito(productoDeLista) {
    let productoEnCarrito = carro.filter(item => item.id === productoDeLista.id)[0];

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        let nuevoProducto = { ...productoDeLista, cantidad: 1 };
        carro.push(nuevoProducto);
    };

    actualizarCarrito();
};

//Función para vaciar carrito
function mostrarCarritoVacio() {
    mensajeCarritoVacio.classList.remove("d-none");
    contenedorDeCarrito.classList.add("d-none");
};

//Función para actualizar carrito
function actualizarCarrito() {
    if (carro.length === 0) {
        mostrarCarritoVacio();
    } else {
        mostrarCarritoConContenido();
    }
    guardarCarritoEnLocalStorage();
};

// Mostrar carrito con contenido
function mostrarCarritoConContenido() {
    mensajeCarritoVacio.classList.add("d-none");
    contenedorDeCarrito.classList.remove("d-none");
    contenedorDeCarrito.innerHTML = "";

    carro.forEach(articulo => {
        let productoEnCarrito = ProductoEnCarrito(articulo);
        contenedorDeCarrito.append(productoEnCarrito);
    });
    calcularTotal();
};

// Crear elemento del producto en el carrito
function ProductoEnCarrito(productoDeLista) {
    let contenedor = document.createElement("div");
    contenedor.classList.add("carrito-producto");
    contenedor.innerHTML = `
        <h3>${productoDeLista.referencia}</h3>
        <p>$${productoDeLista.valor}</p>
        <p>Cantidad: ${productoDeLista.cantidad}</p>
        <p>Subtotal: $${productoDeLista.valor * productoDeLista.cantidad}</p>
    `;

    let botonEliminar = document.createElement("button");
    botonEliminar.textContent = "✖️";
    botonEliminar.onclick = () => eliminarProducto(productoDeLista);
    contenedor.append(botonEliminar);

    return contenedor;
};

//Función para eliminar producto de carrito
function eliminarProducto(productoDeLista) {
    carro = carro.filter(item => item.id !== productoDeLista.id);
    actualizarCarrito();
    calcularTotal();
};

//Función para calcular total del carrito
function calcularTotal() {
    let total = carro.reduce((sum, item) => sum + item.valor * item.cantidad, 0);
    etiquetaTotal.textContent = `$${total}`;
};

//Función del LS
function guardarCarritoEnLocalStorage() {
    localStorage.setItem("carritoCompras", JSON.stringify(carro));
};
