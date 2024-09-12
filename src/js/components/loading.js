// src/js/componentes/loading.js

import { updateGallery } from './gallery.js';

export function toggleLoadingSpinner(visible) {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (loadingSpinner) {
        loadingSpinner.style.display = visible ? 'flex' : 'none';
    }
}

export function loadJSONData() {
    toggleLoadingSpinner(true);
    fetch('../../public/data/productos.json')
        .then(response => response.json())
        .then(data => {
            window.products = data;
            updateGallery(); // Asegúrate de que updateGallery esté disponible globalmente
            toggleLoadingSpinner(false);
        })
        .catch(error => {
            console.error('Error al cargar el JSON:', error);
            toggleLoadingSpinner(false);
        });
}
