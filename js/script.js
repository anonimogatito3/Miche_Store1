"use strict";
const etiquetasCategoria = {
    poleras: "Poleras",
    sudaderas: "Sudaderas / Suéteres",
    chaquetas: "Chaquetas / Chamarras",
    pantalones: "Pantalones"
};
let filtros = {
    busqueda: "",
    categoria: "all",
    talla: "all",
    precioMaximo: 500
};
const productGrid = document.getElementById("product-grid");
const offersGrid = document.getElementById("offers-grid");
const emptyCatalog = document.getElementById("empty-catalog");
const productCount = document.getElementById("product-count");

const catalogSearch = document.getElementById("catalog-search");
const headerSearch = document.getElementById("header-search-input");
const priceRange = document.getElementById("price-range");
const priceLabel = document.getElementById("price-range-label");

const orderModal = document.getElementById("order-modal");
const productPreviewModal = document.getElementById("product-preview-modal");
const productPreviewImage = document.getElementById("product-preview-image");
const productPreviewCategory = document.getElementById("product-preview-category");
const productPreviewName = document.getElementById("product-preview-name");
const productPreviewPrice = document.getElementById("product-preview-price");
let productPreviewTrigger = null;

function formatoPrecio(precio) {
    return "Bs. " + Number(precio).toFixed(2);
}

function restablecerPrecioMaximo() {
    const precioMaximo = Number(priceRange?.max || 500);
    filtros.precioMaximo = precioMaximo;

    if (priceRange) priceRange.value = String(precioMaximo);
    if (priceLabel) priceLabel.textContent = formatoPrecio(precioMaximo);
}

function crearTarjeta(producto) {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta-producto-js";

    const etiqueta = producto.descuento > 0
        ? `<span class="etiqueta-descuento-js">-${producto.descuento}%</span>`
        : `<span class="etiqueta-descuento-js etiqueta-descuento-vacio-js" aria-hidden="true">&nbsp;</span>`;

    const precioAnterior = producto.descuento > 0
        ? `<span class="precio-anterior-js">${formatoPrecio(producto.precioOriginal)}</span>`
        : "";

    const tallasHTML = producto.tallas.map((talla, indice) => `
        <button
            type="button"
            class="talla-producto-js ${indice === 0 ? "elegida" : ""}"
            data-talla="${talla}"
            aria-pressed="${indice === 0 ? "true" : "false"}">
            ${talla}
        </button>
    `).join("");

    tarjeta.innerHTML = `
        <div>
            ${etiqueta}
            <button
                type="button"
                class="boton-vista-producto-js"
                aria-label="Ver imagen ampliada de ${producto.nombre}">
                <img
                    class="foto-producto-js"
                    src="${encodeURI(producto.imagen)}"
                    alt="${producto.nombre}"
                    loading="lazy">
            </button>
        </div>

        <div class="datos-producto-js">
            <span class="categoria-producto-js">${etiquetasCategoria[producto.categoria]}</span>

            <h3 class="nombre-producto-js">${producto.nombre}</h3>

            <div class="precios-producto-js">
                <span class="precio-actual-js">
                    ${formatoPrecio(producto.precio)}
                </span>
                ${precioAnterior}
            </div>

            <span class="categoria-producto-js">
                Selecciona tu talla:
            </span>

            <div class="tallas-producto-js">
                ${tallasHTML}
            </div>

            <button
                type="button"
                class="boton-agregar-js"
                data-producto="${producto.id}">
                Agregar al carrito
            </button>
        </div>
    `;

    return tarjeta;
}

function abrirVistaProducto(producto, tarjeta, boton) {
    if (
        !productPreviewModal ||
        !productPreviewImage ||
        !productPreviewCategory ||
        !productPreviewName ||
        !productPreviewPrice
    ) {
        console.error("No se encontró el contenido necesario para ampliar el producto.");
        return;
    }

    document.querySelectorAll(
        ".tarjeta-producto-js.seleccionada, .tarjeta-oferta-js.seleccionada"
    ).forEach(elemento => elemento.classList.remove("seleccionada"));

    tarjeta.classList.add("seleccionada");
    productPreviewTrigger = boton;
    productPreviewImage.src = encodeURI(producto.imagen);
    productPreviewImage.alt = producto.nombre;
    productPreviewCategory.textContent =
        etiquetasCategoria[producto.categoria] || producto.categoria;
    productPreviewName.textContent = producto.nombre;
    productPreviewPrice.textContent = formatoPrecio(producto.precio);
    productPreviewModal.classList.remove("oculto");
    productPreviewModal.setAttribute("aria-hidden", "false");
    productPreviewModal.querySelector(".boton-cerrar-vista-producto-js")
        ?.focus();
}

function cerrarVistaProducto() {
    if (!productPreviewModal) return;

    productPreviewModal.classList.add("oculto");
    productPreviewModal.setAttribute("aria-hidden", "true");

    if (productPreviewTrigger?.isConnected) {
        productPreviewTrigger.focus();
    }
}

function mostrarProductos(lista) {
    if (!productGrid) {
        console.error(
            'No se encontró el elemento HTML con id="product-grid".'
        );
        return;
    }

    productGrid.replaceChildren();

    if (lista.length === 0) {
        emptyCatalog?.classList.add("catalogo-visible");

        if (productCount) {
            productCount.textContent = "0 productos encontrados";
        }

        return;
    }

    emptyCatalog?.classList.remove("catalogo-visible");

    if (productCount) {
        productCount.textContent =
            `${lista.length} productos encontrados`;
    }

    const fragmento = document.createDocumentFragment();

    lista.forEach(producto => {
        fragmento.appendChild(crearTarjeta(producto));
    });

    productGrid.appendChild(fragmento);
}

function aplicarFiltros() {
    const resultado = productos.filter(producto => {
        const coincideBusqueda =
            producto.nombre.toLowerCase().includes(filtros.busqueda);

        const coincideCategoria =
            filtros.categoria === "all" ||
            producto.categoria === filtros.categoria;

        const coincideTalla =
            filtros.talla === "all" ||
            producto.tallas.includes(filtros.talla);

        const coincidePrecio =
            producto.precio <= filtros.precioMaximo;

        return coincideBusqueda &&
            coincideCategoria &&
            coincideTalla &&
            coincidePrecio;
    });

    mostrarProductos(resultado);
}

function mostrarOfertas() {
    if (!offersGrid) {
        console.warn(
            'No se encontró el elemento HTML con id="offers-grid".'
        );
        return;
    }

    offersGrid.replaceChildren();

    const ofertas = productos.filter(producto => producto.descuento > 0);
    const fragmento = document.createDocumentFragment();

    ofertas.forEach(producto => {
        const tarjeta = crearTarjeta(producto);

        tarjeta.classList.remove("tarjeta-producto-js");
        tarjeta.classList.add("tarjeta-oferta-js");

        fragmento.appendChild(tarjeta);
    });

    offersGrid.appendChild(fragmento);
}

function reiniciarFiltros() {
    filtros.busqueda = "";
    filtros.categoria = "all";
    filtros.talla = "all";

    if (catalogSearch) catalogSearch.value = "";
    if (headerSearch) headerSearch.value = "";
    restablecerPrecioMaximo();

    document.querySelectorAll('input[name="filter-cat"]').forEach(radio => {
        radio.checked = radio.value === "all";
    });

    document.querySelectorAll(".size-pill").forEach(boton => {
        boton.classList.toggle(
            "active-size",
            boton.dataset.size === "all"
        );
    });

    aplicarFiltros();
}

function configurarEventos() {
    const toggleSearchBtn =
        document.getElementById("loggle-search-btn") ||
        document.getElementById("toggle-search-btn");

    const searchDropdown =
        document.getElementById("search-bar-dropdown");

    toggleSearchBtn?.addEventListener("click", () => {
        if (!searchDropdown) return;

        searchDropdown.classList.toggle("busqueda-visible");

        if (searchDropdown.classList.contains("busqueda-visible")) {
            headerSearch?.focus();
        }
    });
    catalogSearch?.addEventListener("input", () => {
        filtros.busqueda = catalogSearch.value.trim().toLowerCase();

        if (headerSearch) {
            headerSearch.value = catalogSearch.value;
        }

        if (!filtros.busqueda) restablecerPrecioMaximo();
        aplicarFiltros();
    });
    headerSearch?.addEventListener("input", () => {
        filtros.busqueda = headerSearch.value.trim().toLowerCase();

        if (catalogSearch) {
            catalogSearch.value = headerSearch.value;
        }

        if (!filtros.busqueda) restablecerPrecioMaximo();
        aplicarFiltros();
    });
    document.querySelectorAll('input[name="filter-cat"]').forEach(radio => {
        radio.addEventListener("change", () => {
            if (!radio.checked) return;

            filtros.categoria = radio.value;
            aplicarFiltros();
        });
    });
    document.querySelectorAll(".size-pill").forEach(boton => {
        boton.addEventListener("click", () => {
            filtros.talla = boton.dataset.size || "all";

            document.querySelectorAll(".size-pill").forEach(b => {
                b.classList.remove("active-size");
            });

            boton.classList.add("active-size");
            aplicarFiltros();
        });
    });
    priceRange?.addEventListener("input", () => {
        filtros.precioMaximo = Number(priceRange.value);

        if (priceLabel) {
            priceLabel.textContent =
                formatoPrecio(filtros.precioMaximo);
        }

        aplicarFiltros();
    });
    document.getElementById("reset-filters-btn")
        ?.addEventListener("click", reiniciarFiltros);
    document.querySelector(".boton-cerrar-vista-producto-js")
        ?.addEventListener("click", cerrarVistaProducto);
    productPreviewModal?.addEventListener("click", evento => {
        if (evento.target === productPreviewModal) {
            cerrarVistaProducto();
        }
    });
    document.addEventListener("click", evento => {
        if (!(evento.target instanceof Element)) return;

        const botonVistaProducto = evento.target.closest(
            ".boton-vista-producto-js"
        );

        if (botonVistaProducto) {
            const tarjeta = botonVistaProducto.closest(
                ".tarjeta-producto-js, .tarjeta-oferta-js"
            );
            const idProducto = Number(
                tarjeta?.querySelector(".boton-agregar-js")?.dataset.producto
            );
            const producto = productos.find(item => item.id === idProducto);

            if (!tarjeta || !producto) {
                console.error("No se pudo identificar el producto seleccionado.");
                return;
            }

            abrirVistaProducto(producto, tarjeta, botonVistaProducto);
            return;
        }

        const botonTalla = evento.target.closest(".talla-producto-js");

        if (botonTalla) {
            const grupo = botonTalla.closest(".tallas-producto-js");

            grupo?.querySelectorAll(".talla-producto-js").forEach(boton => {
                boton.classList.remove("elegida");
                boton.setAttribute("aria-pressed", "false");
            });

            botonTalla.classList.add("elegida");
            botonTalla.setAttribute("aria-pressed", "true");
            return;
        }

        const botonAgregar = evento.target.closest(".boton-agregar-js");

        if (botonAgregar) {
            const tarjeta = botonAgregar.closest(
                ".tarjeta-producto-js, .tarjeta-oferta-js"
            );

            const tallaSeleccionada =
                tarjeta?.querySelector(".talla-producto-js.elegida");

            const talla = tallaSeleccionada
                ? tallaSeleccionada.dataset.talla
                : "M";

            Carrito.agregar(
                Number(botonAgregar.dataset.producto),
                talla
            );

            return;
        }

        const tarjeta = evento.target.closest(
            ".tarjeta-producto-js, .tarjeta-oferta-js"
        );

        if (tarjeta) {
            document.querySelectorAll(
                ".tarjeta-producto-js.seleccionada, .tarjeta-oferta-js.seleccionada"
            ).forEach(elemento => elemento.classList.remove("seleccionada"));
            tarjeta.classList.add("seleccionada");
        }
    });
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileNav = document.getElementById("mobile-nav");

    mobileMenuBtn?.addEventListener("click", () => {
        mobileNav?.classList.toggle("menu-visible");
    });

    mobileNav?.querySelectorAll("a").forEach(enlace => {
        enlace.addEventListener("click", () => {
            mobileNav.classList.remove("menu-visible");
        });
    });
    document.querySelectorAll("[data-collection-filter]").forEach(tarjeta => {
        function seleccionarColeccion() {
            const categoria = tarjeta.dataset.collectionFilter;

            if (categoria === "ofertas") {
                document.getElementById("ofertas")
                    ?.scrollIntoView({ behavior: "smooth" });
                return;
            }

            filtros.categoria = categoria || "all";

            document.querySelectorAll('input[name="filter-cat"]').forEach(radio => {
                radio.checked = radio.value === filtros.categoria;
            });

            aplicarFiltros();

            document.getElementById("productos")
                ?.scrollIntoView({ behavior: "smooth" });
        }

        tarjeta.addEventListener("click", seleccionarColeccion);

        tarjeta.addEventListener("keydown", evento => {
            if (evento.key === "Enter" || evento.key === " ") {
                evento.preventDefault();
                seleccionarColeccion();
            }
        });
    });
    document.getElementById("checkout-btn")
        ?.addEventListener("click", () => {
            if (Carrito.estaVacio()) {
                alert("Tu carrito está vacío. Agrega un producto primero.");
                return;
            }

            if (orderModal) {
                orderModal.classList.remove("oculto");
                Carrito.cerrar();
            } else {
                alert("Tu pedido está listo. Gracias por comprar en MICHE STORE.");
            }
        });
    document.getElementById("close-modal-btn")
        ?.addEventListener("click", () => {
            orderModal?.classList.add("oculto");
            Carrito.vaciar();
        });
    const contactForm = document.getElementById("contact-form");
    const contactAlert = document.getElementById("contact-alert");

    contactForm?.addEventListener("submit", evento => {
        evento.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        if (contactAlert) {
            contactAlert.hidden = false;

            contactAlert.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
            setTimeout(() => {
                contactAlert.hidden = true;
            }, 10000);

        } else {
            alert("¡Gracias! Tu formulario se ha enviado correctamente.");
        }

        contactForm.reset();
    });
    document.addEventListener("keydown", evento => {
        if (evento.key === "Escape") {
            Carrito.cerrar();
            searchDropdown?.classList.remove("busqueda-visible");
            mobileNav?.classList.remove("menu-visible");
            orderModal?.classList.add("oculto");
            cerrarVistaProducto();
        }
    });
}

function iniciarTienda() {
    mostrarProductos(productos);
    mostrarOfertas();
    Carrito.actualizar();
    Carrito.configurarEventos();
    configurarEventos();
    if (priceLabel && priceRange) {
        priceLabel.textContent = formatoPrecio(
            Number(priceRange.value)
        );
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciarTienda);
} else {
    iniciarTienda();
}