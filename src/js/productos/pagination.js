// pagination.js
export function renderPagination(totalItems, itemsPerPage, currentPage, pagination, prevPageButton, nextPageButton, updateGallery) {
    const pageCount = Math.ceil(totalItems / itemsPerPage);
    const pageButtons = Array.from(pagination.querySelectorAll('.pagination-button'));

    pageButtons.forEach(button => button.remove());

    for (let i = 1; i <= pageCount; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.className = `pagination-button mx-1 w-1 px-5 py-0 sombraInset hover:border-2 shadowColor2 transition-transform ease-in duration-100 botonLavanda2 btn border-0 text-shadow-lg group hover:scale-105 hover:border-white text-base md:text-base xl:text-lg text-gray-50 font-semibold${i === currentPage ? ' border-2 border-gray-50 text-white botonClaro' : ''}`;
        button.dataset.page = i;
        button.addEventListener('click', () => {
            currentPage = i;
            updateGallery();
        });
        pagination.insertBefore(button, nextPageButton);
    }

    prevPageButton.className = `pagination-arrow text-gray-50 mr-2 font-bold ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-125 transform transition-all text-white'}`;
    nextPageButton.className = `pagination-arrow text-gray-50 ml-2 font-bold ${currentPage === pageCount ? 'opacity-50 cursor-not-allowed' : 'hover:scale-125 transform transition-all text-white'}`;
    prevPageButton.classList.toggle('disabled', currentPage === 1);
    nextPageButton.classList.toggle('disabled', currentPage === pageCount);
}
