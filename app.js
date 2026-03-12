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
 