import { updateGallery } from './updateGallery.js';

export function createPaginationButton(pageNumber, currentPage) {
    const pagination = document.getElementById('pagination');
    const nextPageButton = document.getElementById('next-page');

    const button = document.createElement('button');
    button.textContent = pageNumber;
    button.className = `pagination-button mx-1 w-1 px-5 py-0 sombraInset hover:border-2 shadowColor2 transition-transform ease-in duration-100 botonLavanda2 btn border-0 text-shadow-lg group hover:scale-105 hover:border-white text-base md:text-base xl:text-lg text-gray-50 font-semibold${pageNumber === currentPage ? ' border-2 border-gray-50 text-white botonClaro' : ''}`;
    button.dataset.page = pageNumber;
    button.addEventListener('click', () => {
        currentPage = pageNumber;
        updateGallery();
    });
    pagination.insertBefore(button, nextPageButton);
}
