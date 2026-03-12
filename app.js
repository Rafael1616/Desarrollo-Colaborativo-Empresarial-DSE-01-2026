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