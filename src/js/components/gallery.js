// src/js/componentes/gallery.js

export function renderPagination(totalItems) {
    const itemsPerPage = 6;
    const pagination = document.getElementById('pagination');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const currentPage = window.currentPage;
    const pageCount = Math.ceil(totalItems / itemsPerPage);
    
    const pageButtons = Array.from(pagination.querySelectorAll('.pagination-button'));
    pageButtons.forEach(button => button.remove());
    
    for (let i = 1; i <= pageCount; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.className = `pagination-button mx-1 w-1 px-5 py-0 sombraInset hover:border-2 shadowColor2 transition-transform ease-in duration-100 botonLavanda2 btn border-0 text-shadow-lg group hover:scale-105 hover:border-white text-base md:text-base xl:text-lg text-gray-50 font-semibold${i === currentPage ? ' border-2 border-gray-50 text-white botonClaro' : ''}`;
        button.dataset.page = i;
        button.addEventListener('click', () => {
            window.currentPage = i;
            updateGallery();
        });
        pagination.insertBefore(button, nextPageButton);
    }
    
    prevPageButton.className = `pagination-arrow text-gray-50 mr-2 font-bold ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-125 transform transition-all text-white'}`;
    nextPageButton.className = `pagination-arrow text-gray-50 ml-2 font-bold ${currentPage === pageCount ? 'opacity-50 cursor-not-allowed' : 'hover:scale-125 transform transition-all text-white'}`;
    prevPageButton.classList.toggle('disabled', currentPage === 1);
    nextPageButton.classList.toggle('disabled', currentPage === pageCount);
}

export function updateGallery() {
    const gallery = document.getElementById('gallery');
    const itemsPerPage = 6;
    const currentCategory = window.currentCategory || 'all';
    const currentPage = window.currentPage || 1;
    const searchQuery = window.searchQuery || '';
    
    const filteredItems = window.products.filter(product => 
        (currentCategory === 'all' || product.category === currentCategory) &&
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToShow = filteredItems.slice(startIndex, endIndex);
    
    gallery.innerHTML = '';
    
    itemsToShow.forEach((product, index) => {
        const div = document.createElement('div');
        div.className = 'grid overflow-hidden product-item rounded-sm shadow hover:scale-105 transform transition-all ease-in rounded-tl-3xl rounded-br-3xl itemFondo shadowColor2 sombraInset2 itemFondo hover:border-2 hover:border-white';
        div.style.cursor = 'pointer';
        const modalId = `modal-${index}`;
        
        div.innerHTML = `
            <img src="${product.image}" class="opacity-0 shadowColor2 shadow-lg h-auto max-w-full rounded-tl-3xl rounded-br-3xl rounded-sm" alt="${product.name}">
            <h2 class="text-end p-2 pr-4 md:pr-6 xl:pr-8 relative backdrop-blur-lg bg-white bg-opacity-25 sombraTop w-full h-full xl:text-2xl md:text-2x1 text-lg font-semibold mt-5 text-shadow-md text-gray-50">${product.name}</h2>
            <dialog id="${modalId}" class="modal cursor-auto backdrop-blur-sm shadow-lg">
                <div class="modal-box w-11/12 max-w-5xl h-2/3 grid"> 
                    <h2 class="text-3xl md:text-4xl xl:text-6xl font-bold">${product.name}</h2>
                    <p class="py-4">${product.description}</p>
                    <div class="modal-action items-end">
                        <form method="dialog">
                            <button class="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        `;
        
        gallery.appendChild(div);
        
        div.addEventListener('click', () => {
            document.getElementById(modalId).showModal();
        });
    });
    
    renderPagination(filteredItems.length);
    window.scrollTo(0, 0);
}
