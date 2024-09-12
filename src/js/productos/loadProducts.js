// loadProducts.js
export async function loadProducts(toggleLoadingSpinner) {
    try {
        toggleLoadingSpinner(true);
        const response = await fetch('../../../public/data/productos.json');
        const data = await response.json();
        toggleLoadingSpinner(false);
        return data;
    } catch (error) {
        console.error('Error al cargar el JSON:', error);
        toggleLoadingSpinner(false);
        return [];
    }
}
