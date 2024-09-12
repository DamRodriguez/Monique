// src/js/componentes/search.js

import { filterSuggestions, showSuggestions } from './suggestions.js';
import { updateGallery } from './gallery.js';

export function setupSearchInput() {
    const searchInput = document.getElementById('search-input');
    const suggestionsContainer = document.getElementById('suggestions');
    const lupaIcono = document.getElementById('lupa-icono');
    
    searchInput.addEventListener('input', function() {
        window.searchQuery = this.value;
        filterSuggestions(window.searchQuery);
        window.currentPage = 1;
        updateGallery();
    });
    
    searchInput.addEventListener('focus', function() {
        if (this.value.trim() !== '') {
            suggestionsContainer.classList.remove('hidden');
        }
    });
    
    searchInput.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            suggestionsContainer.classList.add('hidden');
        }
    });
    
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
            suggestionsContainer.classList.add('hidden');
        }
    });
    
    searchInput.addEventListener('focus', function() {
        this.classList.add('border-2', 'border-gray-50');
        lupaIcono.classList.add('botonClaro');
    });
    
    searchInput.addEventListener('blur', function() {
        this.classList.remove('border-2', 'border-gray-50');
        lupaIcono.classList.remove('botonClaro');
    });
}
