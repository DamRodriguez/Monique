// src/js/componentes/pagination.js

import { updateGallery } from './gallery.js';

export function setupPaginationButtons() {
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const itemsPerPage = 6;
    
    prevPageButton.addEventListener('click', () => {
        if (window.currentPage > 1) {
            window.currentPage--;
            updateGallery();
        }
    });
    
    nextPageButton.addEventListener('click', () => {
        const totalItems = window.products.filter(product => 
            window.currentCategory === 'all' || product.category === window.currentCategory
        ).length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        
        if (window.currentPage < totalPages) {
            window.currentPage++;
            updateGallery();
        }
    });
}
