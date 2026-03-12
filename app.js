// ===============================
// CATEGORÍAS
// ===============================
let categorias = ["Electrónica", "Periféricos", "Almacenamiento"];

// ===============================
// ARRAY DE PRODUCTOS
// ===============================
let productos = [
    { nombre: "Laptop Lenovo IdeaPad 3", descripcion: "Laptop 15.6\" Ryzen 5, 8GB RAM, 512GB SSD", precio: 650, stock: 10, estado: "Disponible", categoria: "Electrónica" },
    { nombre: "Mouse Logitech G203", descripcion: "Mouse gamer RGB 8000 DPI", precio: 25, stock: 30, estado: "Disponible", categoria: "Periféricos" },
    { nombre: "Teclado Mecánico Redragon K552", descripcion: "Teclado mecánico switches azules", precio: 45, stock: 15, estado: "Disponible", categoria: "Periféricos" },
    { nombre: "Monitor Samsung 24\"", descripcion: "Monitor Full HD 75Hz HDMI", precio: 140, stock: 8, estado: "Agotado", categoria: "Electrónica" },
    { nombre: "Disco SSD Kingston 1TB", descripcion: "SSD SATA 2.5\" 1TB", precio: 80, stock: 20, estado: "Disponible", categoria: "Almacenamiento" }
];


// ===============================
// REFERENCIAS DEL DOM
// ===============================
const form = document.getElementById("productoForm");
const tabla = document.getElementById("tablaProductos");
const indiceInput = document.getElementById("indice");
const vistaTabla = document.getElementById("vistaTabla");
const vistaFormulario = document.getElementById("vistaFormulario");
const selectCategoria = document.getElementById("categoria");
const inputNuevaCategoria = document.getElementById("nuevaCategoria");
const inputBusqueda = document.getElementById("busqueda");


// ===============================
// BÚSQUEDA Y FILTRADO
// ===============================
inputBusqueda.addEventListener("input", function() {
    const termino = this.value.trim().toLowerCase();
    const filtrados = productos.filter(p =>
        p.nombre.toLowerCase().includes(termino)
    );
    renderTabla(filtrados);
});


// ===============================
// CARGAR CATEGORÍAS EN SELECT
// ===============================
function cargarCategorias() {
    selectCategoria.innerHTML = "";
    categorias.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        selectCategoria.appendChild(option);
    });

    const optionNueva = document.createElement("option");
    optionNueva.value = "__nueva__";
    optionNueva.textContent = "➕ Nueva categoría...";
    selectCategoria.appendChild(optionNueva);
}

selectCategoria.addEventListener("change", function() {
    if (this.value === "__nueva__") {
        inputNuevaCategoria.classList.remove("hidden");
        inputNuevaCategoria.focus();
    } else {
        inputNuevaCategoria.classList.add("hidden");
        inputNuevaCategoria.value = "";
    }
});


// ===============================
// MOSTRAR / OCULTAR VISTAS
// ===============================
function mostrarFormulario(esEdicion = false) {
    vistaTabla.classList.add("hidden");
    vistaFormulario.classList.remove("hidden");
    document.getElementById("formTitulo").textContent = esEdicion ? "Editar Producto" : "Nuevo Producto";
    cargarCategorias();
}

function mostrarTabla() {
    vistaFormulario.classList.add("hidden");
    vistaTabla.classList.remove("hidden");
    form.reset();
    indiceInput.value = "";
    inputNuevaCategoria.classList.add("hidden");
    inputBusqueda.value = "";
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

    if (categoria === "__nueva__") {
        const nueva = inputNuevaCategoria.value.trim();
        if (!nueva) {
            Swal.fire({ icon: "warning", title: "Categoría vacía", text: "Escribí el nombre de la nueva categoría.", confirmButtonColor: "#0d6efd" });
            return null;
        }
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
    if (!producto) return;

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
// RENDER TABLA (con lista filtrada o completa)
// ===============================
function renderTabla(lista) {
    tabla.innerHTML = "";

    if (lista.length === 0) {
        tabla.innerHTML = `
            <tr>
                <td colspan="7" style="padding:24px; color:#94a3b8; font-style:italic;">
                    No se encontraron productos.
                </td>
            </tr>
        `;
        return;
    }

    lista.forEach((producto, index) => {
        const indexReal = productos.indexOf(producto);
        const badgeClass = producto.estado === "Disponible" ? "badge-disponible" : "badge-agotado";
        tabla.innerHTML += `
            <tr>
                <td>${producto.nombre}</td>
                <td>${producto.descripcion}</td>
                <td><span class="badge-categoria">${producto.categoria}</span></td>
                <td>$${producto.precio}</td>
                <td>${producto.stock}</td>
                <td><span class="badge-estado ${badgeClass}">${producto.estado}</span></td>
                <td>
                    <button class="btn-edit" onclick="editarProducto(${indexReal})">Editar</button>
                    <button class="btn-delete" onclick="eliminarProducto(${indexReal})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}


// ===============================
// MOSTRAR PRODUCTOS EN TABLA
// ===============================
function mostrarProductos() {
    renderTabla(productos);
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
    selectCategoria.value = producto.categoria;
}


// ===============================
// ACTUALIZAR PRODUCTO
// ===============================
function actualizarProducto() {
    const producto = obtenerDatosFormulario();
    if (!producto) return;

    const index = Number(indiceInput.value);
    productos[index] = producto;

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