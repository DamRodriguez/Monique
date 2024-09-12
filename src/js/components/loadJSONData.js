import { toggleLoadingSpinner } from './toggleLoadingSpinner.js';
import { updateGallery } from './updateGallery.js';

export function loadJSONData(products) {
    toggleLoadingSpinner(true);
    fetch('../../../public/data/productos.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            updateGallery(products);
            toggleLoadingSpinner(false);
        })
        .catch(error => {
            console.error('Error al cargar el JSON:', error);
            toggleLoadingSpinner(false);
        });
}
