import { renderPagination } from './renderPagination.js';
import { createProductItem } from './createProductItem.js';

export function updateGallery(products, currentCategory, currentPage, searchQuery, itemsPerPage) {
    const gallery = document.getElementById('gallery');
    const filteredItems = products.filter(product =>
        (currentCategory === 'all' || product.category === currentCategory) &&
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToShow = filteredItems.slice(startIndex, endIndex);

    gallery.innerHTML = '';
    itemsToShow.forEach((product, index) => createProductItem(product, index));

    renderPagination(filteredItems.length, itemsPerPage, currentPage);
    window.scrollTo(0, 0);
}
