import { loadJSONData } from './components/loadJSONData.js';
import { setupSearchInput } from '../components/setupSearchInput.js';
import { setupPaginationButtons } from '../components/setupPaginationButtons.js';
import { setupCategoryButtons } from '../components/setupCategoryButtons.js';
import { setupSearchInputStyles } from '../components/setupSearchInputStyles.js';

document.addEventListener('DOMContentLoaded', function() {
    let products = [];
    let currentCategory = 'all';
    let currentPage = 1;
    const itemsPerPage = 6;
    let searchQuery = '';

    loadJSONData(products);
    setupSearchInput(products, currentPage, currentCategory, searchQuery);
    setupPaginationButtons(products, itemsPerPage, currentPage);
    setupCategoryButtons(currentCategory, currentPage, searchQuery);
    setupSearchInputStyles();
});
