import { createPaginationButton } from './createPaginationButton.js';
import { updatePaginationArrows } from './updatePaginationArrows.js';

export function renderPagination(totalItems, itemsPerPage, currentPage) {
    const pageCount = Math.ceil(totalItems / itemsPerPage);
    const pagination = document.getElementById('pagination');
    const pageButtons = Array.from(pagination.querySelectorAll('.pagination-button'));

    pageButtons.forEach(button => button.remove());

    for (let i = 1; i <= pageCount; i++) {
        createPaginationButton(i, currentPage);
    }

    updatePaginationArrows(pageCount, currentPage);
}
