// src/js/componentes/loading.js

export function toggleLoadingSpinner(visible) {
    const loadingSpinner = document.getElementById('loading-spinner'); // Asegúrate de que este ID sea correcto
    if (loadingSpinner) {
        loadingSpinner.style.display = visible ? 'flex' : 'none';
    } else {
        console.error('No se encontró el elemento con el ID "loading-spinner".');
    }
}

export function loadJSONData() {
    toggleLoadingSpinner(true);
    return fetch('../../public/data/productos.json')
        .then(response => response.json())
        .catch(error => {
            console.error('Error al cargar el JSON:', error);
            throw error;
        })
        .finally(() => {
            toggleLoadingSpinner(false);
        });
}
