"use strict";

const Carrito = (() => {
    const clave = "miche_store_carrito_hombre_v2";
    let items = cargar();

    function cargar() {
        try {
            const guardado = localStorage.getItem(clave);

            if (!guardado) {
                return [];
            }

            const datos = JSON.parse(guardado);

            if (!Array.isArray(datos)) {
                return [];
            }

            return datos.filter(item =>
                item &&
                Number.isInteger(item.id) &&
                typeof item.nombre === "string" &&
                typeof item.precio === "number" &&
                typeof item.imagen === "string" &&
                typeof item.talla === "string" &&
                Number.isInteger(item.cantidad) &&
                item.cantidad > 0 &&
                productos.some(producto => producto.id === item.id)
            );
        } catch (error) {
            console.error("Error al recuperar el carrito:", error);
            return [];
        }
    }

    function guardar() {
        try {
            localStorage.setItem(clave, JSON.stringify(items));
        } catch (error) {
            console.error("Error al guardar el carrito:", error);
        }
    }

    function formatoPrecio(precio) {
        return "Bs. " + Number(precio).toFixed(2);
    }

    function abrir() {
        document.getElementById("cart-drawer-backdrop")
            ?.classList.add("carrito-abierto");
        document.getElementById("cart-drawer-panel")
            ?.classList.add("carrito-abierto");
    }

    function cerrar() {
        document.getElementById("cart-drawer-backdrop")
            ?.classList.remove("carrito-abierto");
        document.getElementById("cart-drawer-panel")
            ?.classList.remove("carrito-abierto");
    }

    function actualizar() {
        guardar();

        const cantidadTotal = items.reduce(
            (total, item) => total + item.cantidad,
            0
        );
        const subtotal = items.reduce(
            (total, item) => total + item.precio * item.cantidad,
            0
        );
        const cartCounter = document.getElementById("cart-counter");
        const cartTitleCount = document.getElementById("cart-title-count");
        const cartSubtotal = document.getElementById("cart-subtotal");
        const cartTotal = document.getElementById("cart-total");
        const cartItems = document.getElementById("cart-items-container");

        if (cartCounter) cartCounter.textContent = cantidadTotal;
        if (cartTitleCount) cartTitleCount.textContent = `(${cantidadTotal})`;
        if (cartSubtotal) cartSubtotal.textContent = formatoPrecio(subtotal);
        if (cartTotal) cartTotal.textContent = formatoPrecio(subtotal);
        if (!cartItems) return;

        cartItems.replaceChildren();

        if (items.length === 0) {
            const mensaje = document.createElement("p");
            mensaje.className = "carrito-vacio-js";
            mensaje.textContent =
                "Tu carrito está vacío. ¡Agrega tus productos favoritos!";
            cartItems.appendChild(mensaje);
            return;
        }

        const fragmento = document.createDocumentFragment();

        items.forEach((item, indice) => {
            const producto = productos.find(
                candidato => candidato.id === item.id
            );
            const opcionesTalla = producto.tallas.map(talla => `
                <option value="${talla}" ${item.talla === talla ? "selected" : ""}>
                    ${talla}
                </option>
            `).join("");
            const fila = document.createElement("div");
            fila.className = "producto-carrito-js";
            fila.innerHTML = `
                <img src="${encodeURI(item.imagen)}" alt="${item.nombre}">

                <div>
                    <strong>${item.nombre}</strong>
                    <label class="selector-talla-carrito-js">
                        Talla:
                        <select
                            class="talla-carrito-js"
                            data-accion="talla"
                            data-indice="${indice}"
                            aria-label="Cambiar talla de ${item.nombre}">
                            ${opcionesTalla}
                        </select>
                    </label>
                    <p>${formatoPrecio(item.precio)}</p>

                    <div class="controles-cantidad-js">
                        <button
                            type="button"
                            data-accion="menos"
                            data-indice="${indice}"
                            ${item.cantidad <= 1 ? "disabled" : ""}
                            aria-label="Disminuir cantidad">−</button>

                        <span>${item.cantidad}</span>

                        <button
                            type="button"
                            data-accion="mas"
                            data-indice="${indice}"
                            aria-label="Aumentar cantidad">+</button>

                        <button
                            type="button"
                            class="eliminar-carrito-js"
                            data-accion="eliminar"
                            data-indice="${indice}">
                            Eliminar
                        </button>
                    </div>
                </div>
            `;
            fragmento.appendChild(fila);
        });

        cartItems.appendChild(fragmento);
    }

    function agregar(id, talla) {
        const producto = productos.find(item => item.id === id);

        if (!producto) return false;

        if (!producto.tallas.includes(talla)) {
            talla = producto.tallas.includes("M")
                ? "M"
                : producto.tallas[0];
        }

        const existente = items.find(
            item => item.id === id && item.talla === talla
        );

        if (existente) {
            existente.cantidad++;
        } else {
            items.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                imagen: producto.imagen,
                talla,
                cantidad: 1
            });
        }
        actualizar();
        return true;
    }

    function cambiarTalla(indice, talla) {
        const item = items[indice];
        if (!item) return;

        const producto = productos.find(candidato => candidato.id === item.id);
        if (!producto || !producto.tallas.includes(talla)) return;
        if (item.talla === talla) return;

        const existente = items.find(
            (candidato, posicion) =>
                posicion !== indice &&
                candidato.id === item.id &&
                candidato.talla === talla
        );

        if (existente) {
            existente.cantidad += item.cantidad;
            items.splice(indice, 1);
        } else {
            item.talla = talla;
        }

        actualizar();
    }

    function cambiarCantidad(indice, cambio) {
        if (!items[indice]) return;

        items[indice].cantidad = Math.max(
            1,
            items[indice].cantidad + cambio
        );

        actualizar();
    }

    function eliminar(indice) {
        if (indice < 0 || indice >= items.length) return;

        items.splice(indice, 1);
        actualizar();
    }

    function vaciar() {
        items = [];
        actualizar();
    }

    function configurarEventos() {
        document.getElementById("open-cart-btn")
            ?.addEventListener("click", abrir);
        document.getElementById("close-cart-btn")
            ?.addEventListener("click", cerrar);

        const backdrop = document.getElementById("cart-drawer-backdrop");
        backdrop?.addEventListener("click", evento => {
            if (evento.target === backdrop) cerrar();
        });

        document.getElementById("cart-items-container")
            ?.addEventListener("click", evento => {
                if (!(evento.target instanceof Element)) return;

                const boton = evento.target.closest("[data-accion]");
                if (!boton) return;

                const indice = Number(boton.dataset.indice);

                if (boton.dataset.accion === "mas") {
                    cambiarCantidad(indice, 1);
                } else if (boton.dataset.accion === "menos") {
                    cambiarCantidad(indice, -1);
                } else if (boton.dataset.accion === "eliminar") {
                    eliminar(indice);
                }
            });

        document.getElementById("cart-items-container")
            ?.addEventListener("change", evento => {
                if (!(evento.target instanceof HTMLSelectElement)) return;
                if (evento.target.dataset.accion !== "talla") return;

                cambiarTalla(
                    Number(evento.target.dataset.indice),
                    evento.target.value
                );
            });
    }

    return {
        agregar,
        abrir,
        cerrar,
        configurarEventos,
        estaVacio: () => items.length === 0,
        actualizar,
        vaciar
    };
})();
