export function updatePaginationArrows(pageCount, currentPage) {
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');

    prevPageButton.className = `pagination-arrow text-gray-50 mr-2 font-bold ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-125 transform transition-all text-white'}`;
    nextPageButton.className = `pagination-arrow text-gray-50 ml-2 font-bold ${currentPage === pageCount ? 'opacity-50 cursor-not-allowed' : 'hover:scale-125 transform transition-all text-white'}`;
    prevPageButton.classList.toggle('disabled', currentPage === 1);
    nextPageButton.classList.toggle('disabled', currentPage === pageCount);
}
