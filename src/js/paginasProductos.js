document.addEventListener('DOMContentLoaded', function() {
    const itemsPerPage = 6;
    const gallery = document.getElementById('gallery');
    const pagination = document.getElementById('pagination');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const loadingSpinner = document.getElementById('loading-spinner');
    const searchInput = document.getElementById('search-input');
    const suggestionsContainer = document.getElementById('suggestions');
    const lupaIcono = document.getElementById('lupa-icono');

    let currentCategory = 'all';
    let currentPage = 1;
    let products = [];
    let searchQuery = ''; // Variable para almacenar la consulta de búsqueda

    function showLoadingSpinner() {
        loadingSpinner.style.display = 'flex';
    }

    function hideLoadingSpinner() {
        loadingSpinner.style.display = 'none';
    }

    function loadJSONData() {
        showLoadingSpinner();
        fetch('../../public/data/productos.json')
            .then(response => response.json())
            .then(data => {
                products = data;
                updateGallery();
                hideLoadingSpinner();
            })
            .catch(error => {
                console.error('Error al cargar el JSON:', error);
                hideLoadingSpinner();
            });
    }

    function renderPagination(totalItems) {
        const pageCount = Math.ceil(totalItems / itemsPerPage);
    
        // Eliminar los botones de paginación existentes
        const pageButtons = pagination.querySelectorAll('.pagination-button');
        pageButtons.forEach(button => button.remove());
    
        for (let i = 1; i <= pageCount; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.className = 'pagination-button mx-1 w-1 px-5 py-0 sombraInset hover:border-2 shadowColor2 transition-transform ease-in duration-100 botonLavanda2 btn border-0 text-shadow-lg group hover:scale-105 hover:border-white text-base md:text-base xl:text-lg text-gray-50 font-semibold';
            button.dataset.page = i;
    
            // Agregar clases para el botón actual
            if (i === currentPage) {
                button.classList.add('border-2', 'border-gray-50', 'text-white', 'botonClaro');
            }
    
            // Añadir evento de clic al botón
            button.addEventListener('click', () => {
                currentPage = i;
                updateGallery();
            });
    
            // Insertar el botón en el contenedor de paginación
            pagination.insertBefore(button, nextPageButton);
        }
    
        // Actualizar el estado de los botones de navegación
        prevPageButton.classList.toggle('disabled', currentPage === 1);
        nextPageButton.classList.toggle('disabled', currentPage === pageCount);
    
        // Agregar clases específicas para los botones de navegación
        prevPageButton.className = `
            pagination-arrow text-gray-50 mr-2 font-bold
            ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-125 transform transition-all text-white'}
        `;
    
        nextPageButton.className = `
            pagination-arrow text-gray-50 ml-2 font-bold
            ${currentPage === pageCount ? 'opacity-50 cursor-not-allowed' : 'hover:scale-125 transform transition-all text-white'}
        `;
    }

    function updateGallery() {
        const filteredItems = products.filter(product => {
            const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const itemsToShow = filteredItems.slice(startIndex, endIndex);

        gallery.innerHTML = '';

        itemsToShow.forEach((product, index) => {
            // Crear el contenedor del producto
            const div = document.createElement('div');
            div.className = 'grid overflow-hidden product-item rounded-sm shadow hover:scale-105 transform transition-all ease-in rounded-tl-3xl rounded-br-3xl itemFondo shadowColor2 sombraInset2 itemFondo hover:border-2 hover:border-white';
            div.style.cursor = 'pointer'; // Añadir cursor pointer para indicar que es clickeable

            // Crear un ID único para el modal
            const modalId = `modal-${index}`;

            // HTML del producto con el modal
            div.innerHTML = `
                <img src="${product.image}" class="opacity-0 shadowColor2 shadow-lg h-auto max-w-full rounded-tl-3xl rounded-br-3xl rounded-sm" alt="${product.name}">
                <h2 class="text-end pr-3 md:pr-6 xl:pr-8 relative backdrop-blur-lg bg-white bg-opacity-20 sombraTop w-full h-full xl:text-2xl md:text-2x1 text-lg font-semibold mt-5 text-shadow-lg text-gray-50">${product.name}</h2>

                <!-- Modal -->
                <dialog id="${modalId}" class="modal cursor-auto backdrop-blur-sm shadow-lg">
                    <div class="modal-box w-11/12 max-w-5xl h-2/3 grid"> 
                        <h2 class="text-3xl md:text-4xl xl:text-6xl font-bold">${product.name}</h2>
                        <p class="py-4">${product.description}</p>
                        <div class="modal-action items-end">
                            <form method="dialog">
                                <!-- if there is a button, it will close the modal -->
                                <button class="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            `;

            gallery.appendChild(div);

            // Añadir evento de clic al contenedor del producto para abrir el modal
            div.addEventListener('click', () => {
                document.getElementById(modalId).showModal();
            });
        });

        renderPagination(filteredItems.length);
        window.scrollTo(0, 0);
    }

    function showSuggestions(suggestions) {
        suggestionsContainer.innerHTML = '';

        if (suggestions.length === 0) {
            const noResultsDiv = document.createElement('div');
            noResultsDiv.className = 'text-gray-50 p-1';
            noResultsDiv.textContent = 'No hay resultados que mostrar';
            suggestionsContainer.appendChild(noResultsDiv);
            suggestionsContainer.classList.remove('hidden');
            return;
        }

        suggestions.forEach(suggestion => {
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            div.textContent = suggestion.name;
            div.addEventListener('click', () => {
                searchInput.value = suggestion.name;
                searchQuery = suggestion.name;
                currentPage = 1;
                suggestionsContainer.classList.add('hidden');
                updateGallery();
            });
            suggestionsContainer.appendChild(div);
        });

        suggestionsContainer.classList.remove('hidden');
    }

    function filterSuggestions(query) {
        if (!query) {
            suggestionsContainer.classList.add('hidden');
            return;
        }

        const suggestions = products.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase())
        );

        showSuggestions(suggestions);
    }

    searchInput.addEventListener('input', function() {
        searchQuery = this.value;
        filterSuggestions(searchQuery);
        currentPage = 1;
        updateGallery();
    });

    searchInput.addEventListener('focus', function() {
        if (this.value.trim() !== '') {
            suggestionsContainer.classList.remove('hidden');
        }
    });

    searchInput.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            suggestionsContainer.classList.add('hidden');
        }
    });

    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
            suggestionsContainer.classList.add('hidden'); // Oculta las sugerencias
        }
    });

    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updateGallery();
        }
    });

    nextPageButton.addEventListener('click', () => {
        const totalItems = products.filter(product => {
            return currentCategory === 'all' || product.category === currentCategory;
        }).length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        if (currentPage < totalPages) {
            currentPage++;
            updateGallery();
        }
    });

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            currentCategory = this.dataset.category;
            currentPage = 1;
            document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('border-2', 'border-gray-50', 'scale-110', 'text-white', 'botonClaro'));
            this.classList.add('border-2', 'border-gray-50', 'scale-110', 'text-white', 'botonClaro');
            updateGallery();
        });
    });

    const defaultButton = document.querySelector('.btn[data-category="all"]');
    if (defaultButton) {
        defaultButton.classList.add('border-2', 'border-gray-50', 'scale-110', 'text-white', 'botonClaro');
    }

    searchInput.addEventListener('focus', function() {
        this.classList.add('border-2', 'border-gray-50');
        lupaIcono.classList.add('botonClaro');
    });

    searchInput.addEventListener('blur', function() {
        this.classList.remove('border-2', 'border-gray-50');
        lupaIcono.classList.remove('botonClaro');
    });

    loadJSONData();
});


