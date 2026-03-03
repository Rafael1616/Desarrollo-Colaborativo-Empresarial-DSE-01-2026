// Array donde guardamos los productos
let productos = [
    {
        nombre: "Laptop Lenovo IdeaPad 3",
        descripcion: "Laptop 15.6\" Ryzen 5, 8GB RAM, 512GB SSD",
        precio: 650,
        stock: 10,
        estado: "Disponible"
    },
    {
        nombre: "Mouse Logitech G203",
        descripcion: "Mouse gamer RGB 8000 DPI",
        precio: 25,
        stock: 30,
        estado: "Disponible"
    },
    {
        nombre: "Teclado Mecánico Redragon K552",
        descripcion: "Teclado mecánico switches azules",
        precio: 45,
        stock: 15,
        estado: "Disponible"
    },
    {
        nombre: "Monitor Samsung 24\"",
        descripcion: "Monitor Full HD 75Hz HDMI",
        precio: 140,
        stock: 8,
        estado: "Agotado"
    },
    {
        nombre: "Disco SSD Kingston 1TB",
        descripcion: "SSD SATA 2.5\" 1TB",
        precio: 80,
        stock: 20,
        estado: "Disponible"
    }
];


// ===============================
// REFERENCIAS DEL DOM
// ===============================
const form = document.getElementById("productoForm");
const tabla = document.getElementById("tablaProductos");
const indiceInput = document.getElementById("indice");


// ===============================
// EVENTO SUBMIT DEL FORMULARIO
// ===============================
// Controla si el usuario está creando o editando un producto.
form.addEventListener("submit", function(e) {
    e.preventDefault(); // Evita que la página se recargue

    if (indiceInput.value === "") {
        insertarProducto();
    } else {
        actualizarProducto();
    }

    form.reset();          // Limpia el formulario
    indiceInput.value = ""; // Reinicia el índice oculto
    mostrarProductos();     // Refresca la tabla
});


// ===============================
// OBTENER DATOS DEL FORMULARIO
// ===============================
// Retorna un objeto producto con los valores actuales del formulario.
function obtenerDatosFormulario() {
    return {
        nombre: document.getElementById("nombre").value.trim(),
        descripcion: document.getElementById("descripcion").value.trim(),
        precio: Number(document.getElementById("precio").value),
        stock: Number(document.getElementById("stock").value),
        estado: document.getElementById("estado").value
    };
}   






// ===============================
// INSERTAR PRODUCTO
// ===============================
// Agrega un nuevo producto al array.
function insertarProducto() {

    const producto = obtenerDatosFormulario();

    // 🔎 Validar nombre repetido (ignorando mayúsculas/minúsculas)
    const productoExiste = productos.some(p =>
        p.nombre.toLowerCase() === producto.nombre.toLowerCase()
    );

    if (productoExiste) {
        alert("❌ Ya existe un producto con ese nombre.");
        return;
    }

    // 💲 Validar precio
    if (producto.precio <= 0 || isNaN(producto.precio)) {
        alert("❌ El precio debe ser mayor a 0.");
        return;
    }

    // 📦 Validar stock
    if (producto.stock < 0 || isNaN(producto.stock)) {
        alert("❌ El stock no puede ser negativo.");
        return;
    }

    // ✅ Si todo está correcto, se agrega
    productos.push(producto);
}

// ===============================
// MOSTRAR PRODUCTOS EN TABLA
// ===============================
// Recorre el array y renderiza dinámicamente la tabla.
function mostrarProductos() {
    tabla.innerHTML = ""; // Limpia la tabla antes de volver a pintar

    productos.forEach((producto, index) => {
        tabla.innerHTML += `
            <tr>
                <td>${producto.nombre}</td>
                <td>${producto.descripcion}</td>
                <td>$${producto.precio}</td>
                <td>${producto.stock}</td>
                <td>
                    <span class="badge ${producto.estado === 'Disponible' ? 'bg-success' : 'bg-danger'}">
                        ${producto.estado}
                    </span>
                </td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editarProducto(${index})">
                        Editar
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    });
}


// ===============================
// INICIALIZACIÓN
// ===============================
// Se ejecuta al cargar la página para mostrar los productos iniciales.
mostrarProductos();

// Carga los datos del producto seleccionado al formulario
function editarProducto(index) {
    const producto = productos[index];

    document.getElementById("nombre").value = producto.nombre;
    document.getElementById("descripcion").value = producto.descripcion;
    document.getElementById("precio").value = producto.precio;
    document.getElementById("stock").value = producto.stock;
    document.getElementById("estado").value = producto.estado;

    indiceInput.value = index;
}

// Actualiza el producto en el array con los nuevos datos
function actualizarProducto() {
    const index = Number(indiceInput.value);
    productos[index] = obtenerDatosFormulario();
	alert("✅ Producto actualizado correctamente.")
}