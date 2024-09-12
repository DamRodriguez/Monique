import { loadProducts } from '../js/productos/loadProducts';
import { updateGallery } from '../js/productos/galleryRenderer.js';
import { renderPagination } from '../js/productos/pagination.js';

document.addEventListener('DOMContentLoaded', function() {
    const itemsPerPage = 6;
    const gallery = document.getElementById('gallery');
    const pagination = document.getElementById('pagination');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const loadingSpinner = document.getElementById('loading-spinner');
    const searchInput = document.getElementById('search-input');
    const suggestionsContainer = document.getElementById('suggestions');
    const lupaIcono = document.getElementById('lupa-icono');

    let currentCategory = 'all';
    let currentPage = 1;
    let products = [];
    let searchQuery = '';

    function toggleLoadingSpinner(visible) {
        loadingSpinner.style.display = visible ? 'flex' : 'none';
    }

    loadProducts(toggleLoadingSpinner).then(data => {
        products = data;
        updateGallery(products, currentCategory, searchQuery, itemsPerPage, currentPage, gallery, (totalItems) => {
            renderPagination(totalItems, itemsPerPage, currentPage, pagination, prevPageButton, nextPageButton, () => {
                updateGallery(products, currentCategory, searchQuery, itemsPerPage, currentPage, gallery);
            });
        });
    });

    // Resto de la lógica de eventos
});