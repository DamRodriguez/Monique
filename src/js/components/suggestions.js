// src/js/componentes/suggestions.js

import { updateGallery } from './gallery.js';

export function showSuggestions(suggestions) {
    const suggestionsContainer = document.getElementById('suggestions');
    const searchInput = document.getElementById('search-input');
    
    suggestionsContainer.innerHTML = '';
    
    if (suggestions.length === 0) {
        suggestionsContainer.innerHTML = '<div class="text-gray-50 p-1">No hay resultados para mostrar</div>';
        suggestionsContainer.classList.remove('hidden');
        return;
    }
    
    suggestions.forEach(suggestion => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.textContent = suggestion.name;
        div.addEventListener('click', () => {
            searchInput.value = suggestion.name;
            window.searchQuery = suggestion.name;
            window.currentPage = 1;
            suggestionsContainer.classList.add('hidden');
            updateGallery();
        });
        suggestionsContainer.appendChild(div);
    });
    
    suggestionsContainer.classList.remove('hidden');
}

export function filterSuggestions(query) {
    if (!query) {
        document.getElementById('suggestions').classList.add('hidden');
        return;
    }
    
    const suggestions = window.products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase())
    );
    
    showSuggestions(suggestions);
}
