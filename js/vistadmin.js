const categoriasValidas = [
    "Frutas Frescas",
    "Verduras Orgánicas",
    "Productos Orgánicos",
    "Productos Lácteos"
];

// Cargar productos desde localStorage o usar iniciales
let productos = JSON.parse(localStorage.getItem("productos")) || [
    { id: "PR002", nombre: "Leche Descremada", categoria: "Productos Lácteos", stock: 80 }
];

function guardarEnLocalStorage() {
    localStorage.setItem("productos", JSON.stringify(productos));
}

function renderTabla() {
    const tbody = document.querySelector("#tablaProductos tbody");
    tbody.innerHTML = "";
    productos.forEach(p => {
        const fila = `<tr>
        <td>${p.id}</td>
        <td>${p.nombre}</td>
        <td>${p.categoria}</td>
        <td>${p.stock}</td>
      </tr>`;
        tbody.innerHTML += fila;
    });
}

function actualizarMetricas() {
    const totales = {
        "Frutas Frescas": 0,
        "Verduras Orgánicas": 0,
        "Productos Orgánicos": 0,
        "Productos Lácteos": 0
    };

    productos.forEach(p => {
        if (totales.hasOwnProperty(p.categoria)) {
            totales[p.categoria] += p.stock;
        }
    });

    document.querySelector("#stockFrutas strong").textContent = totales["Frutas Frescas"];
    document.querySelector("#stockVerduras strong").textContent = totales["Verduras Orgánicas"];
    document.querySelector("#stockOrganicos strong").textContent = totales["Productos Orgánicos"];
    document.querySelector("#stockLacteos strong").textContent = totales["Productos Lácteos"];
}

function validarProducto(producto) {
    if (!producto.id || !producto.nombre || !producto.categoria || isNaN(producto.stock)) {
        alert("Todos los campos son obligatorios.");
        return false;
    }

    if (!categoriasValidas.includes(producto.categoria)) {
        alert("La categoría ingresada no es válida.");
        return false;
    }

    if (productos.some(p => p.id === producto.id)) {
        alert("Ya existe un producto con ese ID.");
        return false;
    }

    if (producto.stock <= 0) {
        alert("El stock debe ser mayor a cero.");
        return false;
    }

    return true;
}

document.getElementById("formProducto").addEventListener("submit", function (e) {
    e.preventDefault();

    const nuevoProducto = {
        id: document.getElementById("idProducto").value.trim(),
        nombre: document.getElementById("nombreProducto").value.trim(),
        categoria: document.getElementById("categoriaProducto").value.trim(),
        stock: parseInt(document.getElementById("stockProducto").value)
    };


    if (!validarProducto(nuevoProducto)) return;

    productos.push(nuevoProducto);
    guardarEnLocalStorage();
    renderTabla();
    actualizarMetricas();
    this.reset();
});

document.getElementById("eliminarProductoBtn").addEventListener("click", function () {
    const idEliminar = document.getElementById("idEliminarProducto").value.trim();
    if (!idEliminar) {
        alert("Ingrese el ID del producto a eliminar.");
        return;
    }
    const index = productos.findIndex(p => p.id === idEliminar);
    if (index === -1) {
        alert("No se encontró un producto con ese ID.");
        return;
    }
    if (!confirm("¿Está seguro de eliminar el producto?")) return;
    productos.splice(index, 1);
    guardarEnLocalStorage();
    renderTabla();
    actualizarMetricas();
    document.getElementById("idEliminarProducto").value = "";
});

document.getElementById("verEstadoPedidoBtn").addEventListener("click", function () {
    const id = document.getElementById("idEstadoPedido").value.trim();
    const resultado = document.getElementById("resultadoEstadoPedido");
    if (!id) {
        resultado.innerHTML = '<div class="alert alert-warning">Ingrese un ID de producto.</div>';
        return;
    }
    const producto = productos.find(p => p.id === id);
    if (!producto) {
        resultado.innerHTML = '<div class="alert alert-danger">Producto no encontrado.</div>';
        return;
    }
    const estados = ["Pendiente", "Enviado", "Entregado", "Cancelado"];
    const estadoRandom = estados[Math.floor(Math.random() * estados.length)];
    let color = "secondary";
    if (estadoRandom === "Pendiente") color = "warning";
    if (estadoRandom === "Enviado") color = "info";
    if (estadoRandom === "Entregado") color = "success";
    if (estadoRandom === "Cancelado") color = "danger";
    resultado.innerHTML = `<div class="alert alert-${color}">El estado del pedido para <strong>${producto.nombre}</strong> es: <strong>${estadoRandom}</strong></div>`;
});

// Inicializar
renderTabla();
actualizarMetricas();