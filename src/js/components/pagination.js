import { renderPagination, updateGallery } from './gallery.js';

export function setupPaginationButtons() {
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');

    function updatePaginationButtons() {
        if (!window.products) {
            console.error('window.products no está definido');
            return;
        }

        const totalItems = window.products.filter(product => 
            window.currentCategory === 'all' || product.category === window.currentCategory
        ).length;

        const totalPages = Math.ceil(totalItems / window.itemsPerPage);

        // Habilitar/deshabilitar botones según la página actual
        prevPageButton.disabled = window.currentPage <= 1;
        nextPageButton.disabled = window.currentPage >= totalPages || totalPages === 0;

        renderPagination(totalItems);
    }

    prevPageButton.addEventListener('click', () => {
        if (window.currentPage > 1) {
            window.currentPage--;
            updateGallery(); 
            updatePaginationButtons(); 
        }
    });

    nextPageButton.addEventListener('click', () => {
        if (!window.products) {
            console.error('window.products no está definido');
            return;
        }

        const totalItems = window.products.filter(product => 
            window.currentCategory === 'all' || product.category === window.currentCategory
        ).length;
        const totalPages = Math.ceil(totalItems / window.itemsPerPage);

        // Solo avanzar si no estamos en la última página y hay productos
        if (window.currentPage < totalPages && totalItems > 0) {
            window.currentPage++;
            updateGallery(); 
            updatePaginationButtons(); 
        }
    });

    // Inicializa los botones de paginación
    updatePaginationButtons();
}
