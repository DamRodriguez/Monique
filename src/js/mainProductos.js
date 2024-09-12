// src/js/componentes/main.js

import { loadJSONData } from './components/loading.js';
import { setupSearchInput } from './components/search.js';
import { setupPaginationButtons } from './components/pagination.js';
import { setupCategoryButtons } from './components/categories.js';

document.addEventListener('DOMContentLoaded', function() {
    // Configurar entrada de búsqueda
    setupSearchInput();
    
    // Configurar botones de paginación
    setupPaginationButtons();
    
    // Configurar botones de categoría
    setupCategoryButtons();
    
    // Cargar datos iniciales
    loadJSONData();
});

