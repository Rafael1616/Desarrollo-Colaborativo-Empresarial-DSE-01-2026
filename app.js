// Array donde guardamos los productos
let productos = [
    { nombre: "Laptop Lenovo IdeaPad 3", descripcion: "Laptop 15.6\" Ryzen 5, 8GB RAM, 512GB SSD", precio: 650, stock: 10, estado: "Disponible" },
    { nombre: "Mouse Logitech G203", descripcion: "Mouse gamer RGB 8000 DPI", precio: 25, stock: 30, estado: "Disponible" },
    { nombre: "Teclado Mecánico Redragon K552", descripcion: "Teclado mecánico switches azules", precio: 45, stock: 15, estado: "Disponible" },
    { nombre: "Monitor Samsung 24\"", descripcion: "Monitor Full HD 75Hz HDMI", precio: 140, stock: 8, estado: "Agotado" },
    { nombre: "Disco SSD Kingston 1TB", descripcion: "SSD SATA 2.5\" 1TB", precio: 80, stock: 20, estado: "Disponible" }
];

// ===============================
// REFERENCIAS DEL DOM
// ===============================
const form = document.getElementById("productoForm");
const tabla = document.getElementById("tablaProductos");
const indiceInput = document.getElementById("indice");
const vistaTabla = document.getElementById("vistaTabla");
const vistaFormulario = document.getElementById("vistaFormulario");


// ===============================
// MOSTRAR / OCULTAR VISTAS
// ===============================
function mostrarFormulario(esEdicion = false) {
    vistaTabla.classList.add("hidden");
    vistaFormulario.classList.remove("hidden");
    document.getElementById("formTitulo").textContent = esEdicion ? "Editar Producto" : "Nuevo Producto";
}

function mostrarTabla() {
    vistaFormulario.classList.add("hidden");
    vistaTabla.classList.remove("hidden");
    form.reset();
    indiceInput.value = "";
}

function cancelarFormulario() {
    mostrarTabla();
}


// ===============================
// EVENTO SUBMIT DEL FORMULARIO
// ===============================
form.addEventListener("submit", function(e) {
    e.preventDefault();
    if (indiceInput.value === "") {
        insertarProducto();
    } else {
        actualizarProducto();
    }
});


// ===============================
// OBTENER DATOS DEL FORMULARIO
// ===============================
function obtenerDatosFormulario() {
    let categoria = selectCategoria.value;
 
    // Si eligió nueva categoría
    if (categoria === "__nueva__") {
        const nueva = inputNuevaCategoria.value.trim();
        if (!nueva) {
            Swal.fire({ icon: "warning", title: "Categoría vacía", text: "Escribí el nombre de la nueva categoría.", confirmButtonColor: "#0d6efd" });
            return null;
        }
        // Agregar al array si no existe
        if (!categorias.includes(nueva)) {
            categorias.push(nueva);
        }
        categoria = nueva;
    }
 
    return {
        nombre: document.getElementById("nombre").value.trim(),
        descripcion: document.getElementById("descripcion").value.trim(),
        precio: Number(document.getElementById("precio").value),
        stock: Number(document.getElementById("stock").value),
        estado: document.getElementById("estado").value,
        categoria: categoria
    };
}


// ===============================
// INSERTAR PRODUCTO
// ===============================
function insertarProducto() {
    const producto = obtenerDatosFormulario();

    const productoExiste = productos.some(p =>
        p.nombre.toLowerCase() === producto.nombre.toLowerCase()
    );

    if (productoExiste) {
        Swal.fire({ icon: "error", title: "Nombre duplicado", text: "Ya existe un producto con ese nombre.", confirmButtonColor: "#0d6efd" });
        return;
    }

    if (producto.precio <= 0 || isNaN(producto.precio)) {
        Swal.fire({ icon: "warning", title: "Precio inválido", text: "El precio debe ser mayor a 0.", confirmButtonColor: "#0d6efd" });
        return;
    }

    if (producto.stock < 0 || isNaN(producto.stock)) {
        Swal.fire({ icon: "warning", title: "Stock inválido", text: "El stock no puede ser negativo.", confirmButtonColor: "#0d6efd" });
        return;
    }

    productos.push(producto);
    mostrarProductos();
    mostrarTabla();

    Swal.fire({ icon: "success", title: "¡Producto agregado!", text: `"${producto.nombre}" fue agregado correctamente.`, confirmButtonColor: "#0d6efd", timer: 2500, timerProgressBar: true });
}


// ===============================
// MOSTRAR PRODUCTOS EN TABLA
// ===============================
function mostrarProductos() {
    tabla.innerHTML = "";

    productos.forEach((producto, index) => {
        const badgeClass = producto.estado === "Disponible" ? "badge-disponible" : "badge-agotado";
        tabla.innerHTML += `
            <tr>
                <td>${producto.nombre}</td>
                <td>${producto.descripcion}</td>
                <td>$${producto.precio}</td>
                <td>${producto.stock}</td>
                <td><span class="badge-estado ${badgeClass}">${producto.estado}</span></td>
                <td>
                    <button class="btn-edit" onclick="editarProducto(${index})">Editar</button>
                    <button class="btn-delete" onclick="eliminarProducto(${index})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}


// ===============================
// EDITAR PRODUCTO
// ===============================
function editarProducto(index) {
    const producto = productos[index];
    document.getElementById("nombre").value = producto.nombre;
    document.getElementById("descripcion").value = producto.descripcion;
    document.getElementById("precio").value = producto.precio;
    document.getElementById("stock").value = producto.stock;
    document.getElementById("estado").value = producto.estado;
    indiceInput.value = index;
    mostrarFormulario(true);
}


// ===============================
// ACTUALIZAR PRODUCTO
// ===============================
function actualizarProducto() {
    const index = Number(indiceInput.value);
    productos[index] = obtenerDatosFormulario();
    mostrarProductos();
    mostrarTabla();
    Swal.fire({ icon: "success", title: "¡Producto actualizado!", text: "Los cambios fueron guardados correctamente.", confirmButtonColor: "#0d6efd", timer: 2500, timerProgressBar: true });
}


// ===============================
// ELIMINAR PRODUCTO
// ===============================
function eliminarProducto(index) {
    Swal.fire({
        title: "¿Eliminar producto?",
        text: `¿Estás seguro de eliminar "${productos[index].nombre}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            const nombre = productos[index].nombre;
            productos.splice(index, 1);
            mostrarProductos();
            Swal.fire({ icon: "success", title: "Eliminado", text: `"${nombre}" fue eliminado correctamente.`, confirmButtonColor: "#0d6efd", timer: 2000, timerProgressBar: true });
        }
    });
}


// ===============================
// INICIALIZACIÓN
// ===============================
mostrarProductos();
