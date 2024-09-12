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

        const pageButtons = pagination.querySelectorAll('.pagination-button');
        pageButtons.forEach(button => button.remove());

        for (let i = 1; i <= pageCount; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.className = 'pagination-button mx-1 px-3 py-1 border rounded';
            button.dataset.page = i;
            if (i === currentPage) {
                button.classList.add('bg-blue-500', 'text-white');
            }
            button.addEventListener('click', () => {
                currentPage = i;
                updateGallery();
            });
            pagination.insertBefore(button, nextPageButton);
        }

        prevPageButton.classList.toggle('disabled', currentPage === 1);
        nextPageButton.classList.toggle('disabled', currentPage === pageCount);
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

        itemsToShow.forEach(product => {
            const div = document.createElement('div');
            div.classList.add('product-item', 'p-3', 'border', 'rounded', 'shadow');

            div.innerHTML = `
                <img src="${product.image}" class="h-auto max-w-full rounded-lg" alt="${product.name}">
                <h2 class="text-xl font-semibold mt-2">${product.name}</h2>
                <p class="text-gray-600">${product.description}</p>
            `;

            gallery.appendChild(div);
        });

        renderPagination(filteredItems.length);
        window.scrollTo(0, 0);
    }

    function showSuggestions(suggestions) {
        suggestionsContainer.innerHTML = '';

        if (suggestions.length === 0) {
            const noResultsDiv = document.createElement('div');
            noResultsDiv.className = 'text-gray-50 p-1';
            noResultsDiv.textContent = 'No hay nada que mostrar :(';
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
