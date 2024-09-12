// galleryRenderer.js
export function updateGallery(products, currentCategory, searchQuery, itemsPerPage, currentPage, gallery, renderPagination) {
    const filteredItems = products.filter(product => 
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
            <h2 class="text-end p-2 pr-4 md:pr-6 xl:pr-8 relative backdrop-blur-lg bg-white bg-opacity-20 sombraTop w-full h-full xl:text-2xl md:text-2x1 text-lg font-semibold mt-5 text-shadow-lg text-gray-50">${product.name}</h2>
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

    renderPagination(filteredItems.length, itemsPerPage, currentPage);
    window.scrollTo(0, 0);
}