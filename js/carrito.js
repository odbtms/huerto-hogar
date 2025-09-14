// js/carrito.js (Versión unificada)

document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA QUE SE EJECUTA EN TODAS LAS PÁGINAS ---

    // Intentamos obtener el carrito desde localStorage o lo inicializamos como un array vacío
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    const spanContadorCarrito = document.getElementById('carrito-contador');
    const botonesAgregar = document.querySelectorAll('.btn-primary');
    
    // Función para actualizar el contador del carrito en la navbar
    function actualizarContador() {
        if (spanContadorCarrito) {
            spanContadorCarrito.textContent = carrito.length;
        }
    }

    // Función para guardar el carrito en localStorage
    function guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    // Función para añadir un producto al carrito
    function agregarAlCarrito(evento) {
        const tarjeta = evento.target.closest('.card');
        const producto = {
            id: Date.now(),
            nombre: tarjeta.querySelector('.card-title').textContent,
            precio: tarjeta.querySelector('.card-subtitle').textContent,
            imagen: tarjeta.querySelector('.card-img-top').src
        };

        carrito.push(producto);
        guardarCarrito();
        actualizarContador();
    }

    // Añadimos un evento 'click' a cada botón de "Añadir al Carrito"
    botonesAgregar.forEach(boton => {
        if (boton.textContent.includes('Añadir al Carrito')) {
            boton.addEventListener('click', agregarAlCarrito);
        }
    });

    // Actualizamos el contador al cargar cualquier página
    actualizarContador();


    // --- LÓGICA QUE SOLO SE EJECUTA EN LA PÁGINA carrito.html ---

    const divListaCarrito = document.getElementById('lista-carrito');
    
    // Si el elemento 'lista-carrito' existe, significa que estamos en carrito.html
    if (divListaCarrito) {
        const spanTotalCarrito = document.getElementById('carrito-total');

        // Función para renderizar (dibujar) los productos en la página del carrito
        function renderizarCarrito() {
            divListaCarrito.innerHTML = ''; // Limpiamos el contenido anterior

            if (carrito.length === 0) {
                divListaCarrito.innerHTML = '<div class="alert alert-secondary text-center">Tu carrito está vacío.</div>';
                spanTotalCarrito.textContent = '$0';
                return;
            }

            let total = 0;
            carrito.forEach(producto => {
                const itemHTML = `
                    <div class="card mb-3 carrito-item-pagina" data-id="${producto.id}">
                        <div class="row g-0">
                            <div class="col-md-3">
                                <img src="${producto.imagen}" class="img-fluid rounded-start" alt="${producto.nombre}">
                            </div>
                            <div class="col-md-7">
                                <div class="card-body">
                                    <h5 class="card-title">${producto.nombre}</h5>
                                    <p class="card-text"><small class="text-muted">${producto.precio}</small></p>
                                </div>
                            </div>
                            <div class="col-md-2 d-flex justify-content-center align-items-center">
                                <button class="btn btn-danger btn-sm remover-item">&times;</button>
                            </div>
                        </div>
                    </div>
                `;
                divListaCarrito.innerHTML += itemHTML;
                
                // Limpiamos el precio para poder sumarlo
                const precioNumerico = parseFloat(producto.precio.replace('$', '').replace(/\./g, '').split(' ')[0]);
                if (!isNaN(precioNumerico)) {
                    total += precioNumerico;
                }
            });
            
            spanTotalCarrito.textContent = `$${total.toLocaleString('es-CL')}`;

            // Añadir evento a los botones de eliminar
            document.querySelectorAll('.remover-item').forEach(boton => {
                boton.addEventListener('click', removerDelCarrito);
            });
        }

        // Función para remover un producto del carrito
        function removerDelCarrito(evento) {
            const idProducto = parseInt(evento.target.closest('.carrito-item-pagina').dataset.id);
            carrito = carrito.filter(producto => producto.id !== idProducto);
            guardarCarrito();
            renderizarCarrito(); // Volver a dibujar el carrito
            actualizarContador(); // Actualizar el contador de la navbar también
        }

        // Renderizamos el carrito al cargar la página carrito.html
        renderizarCarrito();
    }
});