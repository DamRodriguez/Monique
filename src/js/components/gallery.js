export function updateGallery() {
    const filteredItems = window.products.filter(product => 
        (window.currentCategory === 'all' || product.category === window.currentCategory) &&
        product.name.toLowerCase().includes(window.searchQuery.toLowerCase())
    );

    const startIndex = (window.currentPage - 1) * window.itemsPerPage;
    const endIndex = startIndex + window.itemsPerPage;
    const itemsToShow = filteredItems.slice(startIndex, endIndex);

    const gallery = document.getElementById('gallery');
    const noProductsMessage = document.getElementById('no-products-message');
    const paginationButtonsContainer = document.getElementById('pagination');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');

    // Mostrar u ocultar mensaje y botones de paginación
    if (filteredItems.length === 0) {
        gallery.innerHTML = ''; // Vacía el contenedor de productos
        noProductsMessage.classList.remove('hidden'); // Muestra el mensaje
        paginationButtonsContainer.classList.add('hidden'); // Oculta los botones de paginación
    } else {
        noProductsMessage.classList.add('hidden'); // Oculta el mensaje
        paginationButtonsContainer.classList.remove('hidden'); // Muestra los botones de paginación

        gallery.innerHTML = '';

        // Carga solo los elementos visibles
        itemsToShow.forEach((product, index) => {
            const div = document.createElement('div');
            div.className = 'grid overflow-hidden product-item rounded-sm shadow hover:scale-105 transform transition-all ease-in rounded-tl-3xl rounded-br-3xl itemFondo shadowColor2 sombraInset2 itemFondo hover:border-2 hover:border-white';
            div.style.cursor = 'pointer';
            const modalId = `modal-${startIndex + index}`; // ID único para cada modal

            div.innerHTML = `
                <img src="${product.image}" class="opacity-0 shadowColor2 shadow-lg h-auto max-w-full rounded-tl-3xl rounded-br-3xl rounded-sm" alt="${product.name}">
                <h2 class="text-end p-2 pr-4 md:pr-6 xl:pr-8 relative backdrop-blur-lg bg-white bg-opacity-25 sombraTop w-full h-full xl:text-2xl md:text-2x1 text-lg font-semibold mt-5 text-shadow-md text-gray-50">${product.name}</h2>
            `;

            gallery.appendChild(div);

            // Evento para crear y mostrar modal cuando el producto es clicado
            div.addEventListener('click', () => {
                let modal = document.getElementById(modalId);
                
                // Crear modal si no existe
                if (!modal) {
                    modal = document.createElement('dialog');
                    modal.id = modalId;
                    modal.className = 'modal cursor-auto backdrop-blur-sm shadow-lg';
                    modal.innerHTML = `
                        <div class="modal-box w-11/12 max-w-5xl h-2/3 grid">
                            <h2 class="text-3xl md:text-4xl xl:text-6xl font-bold">${product.name}</h2>
                            <p class="py-4">${product.description}</p>
                            <div class="modal-action items-end">
                                <form method="dialog">
                                    <button class="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    `;
                    document.body.appendChild(modal); // Añadir el modal al body solo cuando es necesario
                }

                modal.showModal(); // Mostrar el modal
            });
        });

        renderPagination(filteredItems.length);
    }

    window.scrollTo(0, 0);
}

export function renderPagination(totalItems) {
    const itemsPerPage = 6;
    const pagination = document.getElementById('pagination');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const currentPage = window.currentPage;
    const pageCount = Math.ceil(totalItems / itemsPerPage);

    // Limpiar los botones de paginación antiguos
    const pageButtons = Array.from(pagination.querySelectorAll('.pagination-button'));
    pageButtons.forEach(button => button.remove());

    // Crear botones de página
    for (let i = 1; i <= pageCount; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.className = `pagination-button mx-1 w-1 px-5 py-0 sombraInset hover:border-2 shadowColor2 transition-transform ease-in duration-100 botonLavanda2 btn border-0 text-shadow-lg group hover:scale-105 hover:border-white text-base md:text-base xl:text-lg text-gray-50 font-semibold${i === currentPage ? ' border-2 border-gray-50 text-white botonClaro' : ''}`;
        button.dataset.page = i;
        button.addEventListener('click', () => {
            window.currentPage = i;
            updateGallery();
        });
        pagination.insertBefore(button, nextPageButton);
    }

    // Actualizar estado de los botones de paginación
    prevPageButton.classList.toggle('disabled', currentPage === 1);
    nextPageButton.classList.toggle('disabled', currentPage === pageCount);
    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === pageCount;
}
