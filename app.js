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