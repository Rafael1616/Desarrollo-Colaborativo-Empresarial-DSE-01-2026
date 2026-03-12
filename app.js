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
 