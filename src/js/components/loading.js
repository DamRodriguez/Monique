export function toggleLoadingSpinner(visible) {
    const loadingSpinner = document.getElementById('loading-spinner'); 
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    
    if (loadingSpinner) {
        // Mostrar u ocultar el spinner
        loadingSpinner.style.display = visible ? 'flex' : 'none';
        
        // Mostrar u ocultar las flechas de paginación cuando el spinner esté visible
        if (prevPageButton && nextPageButton) {
            prevPageButton.style.display = visible ? 'none' : 'inline-block';
            nextPageButton.style.display = visible ? 'none' : 'inline-block';
        }
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
