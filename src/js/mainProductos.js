// src/js/componentes/main.js
import { loadJSONData } from './components/loading.js';
import { setupSearchInput } from './components/search.js';
import { setupPaginationButtons } from './components/pagination.js';
import { updateGallery } from './components/gallery.js'; 
import { setupCategoryButtons } from './components/categories.js';

document.addEventListener('DOMContentLoaded', function() {
    loadJSONData()
        .then(data => {
            window.products = data;
            window.itemsPerPage = 6; 
            window.currentPage = 1;
            window.currentCategory = 'all';
            window.searchQuery = ''; 
            
            setupSearchInput();
            setupPaginationButtons();
            setupCategoryButtons();
            
            updateGallery(); 
        })
        .catch(error => {
            console.error('Error al cargar datos:', error);
        });
});
