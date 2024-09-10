document.addEventListener('DOMContentLoaded', function() {
    const itemsPerPage = 6;
    const gallery = document.getElementById('gallery');
    const pagination = document.getElementById('pagination');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const loadingSpinner = document.getElementById('loading-spinner');
    let currentCategory = 'all';
    let currentPage = 1;
    let products = []; // Aquí se cargarán los productos desde el JSON

    // Mostrar el spinner de carga
    function showLoadingSpinner() {
        loadingSpinner.style.display = 'flex';
    }

    // Ocultar el spinner de carga
    function hideLoadingSpinner() {
        loadingSpinner.style.display = 'none';
    }

    // Cargar los datos desde un archivo JSON
    function loadJSONData() {
        showLoadingSpinner(); // Mostrar el spinner al comenzar la carga
        fetch('../../public/data/productos.json')
            .then(response => response.json())
            .then(data => {
                products = data;
                updateGallery(); // Actualizar la galería después de cargar los datos
                hideLoadingSpinner(); // Ocultar el spinner una vez cargado
            })
            .catch(error => {
                console.error('Error al cargar el JSON:', error);
                hideLoadingSpinner(); // Asegurarse de ocultar el spinner incluso si hay un error
            });
    }

    function renderPagination(totalItems) {
        const pageCount = Math.ceil(totalItems / itemsPerPage);

        // Limpiar paginación existente
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
            return currentCategory === 'all' || product.category === currentCategory;
        });

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const itemsToShow = filteredItems.slice(startIndex, endIndex);

        gallery.innerHTML = ''; // Limpiar la galería antes de insertar los nuevos productos

        itemsToShow.forEach(product => {
            const div = document.createElement('div');
            div.classList.add('product-item', 'p-3', 'border', 'rounded', 'shadow');

            // Contenido del div basado en los datos del JSON
            div.innerHTML = `
                <img src="${product.image}" class="h-auto max-w-full rounded-lg" alt="${product.name}">
                <h2 class="text-xl font-semibold mt-2">${product.name}</h2>
                <p class="text-gray-600">${product.description}</p>
            `;

            gallery.appendChild(div);
        });

        renderPagination(filteredItems.length);

        window.scrollTo(0, 0); // Para desplazar al principio de la página
    }

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

            // Eliminar la clase de resaltado de todos los botones
            document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('border-2', 'border-gray-50', 'scale-110', 'text-white', 'botonClaro'));

            // Añadir la clase de resaltado al botón seleccionado
            this.classList.add('border-2', 'border-gray-50', 'scale-110', 'text-white', 'botonClaro');

            updateGallery();
        });
    });

    // Resaltar el botón de la categoría "Todo" por defecto
    const defaultButton = document.querySelector('.btn[data-category="all"]');
    if (defaultButton) {
        defaultButton.classList.add('border-2', 'border-gray-50', 'scale-110', 'text-white', 'botonClaro');
    }

    loadJSONData(); // Llamar a la función para cargar los datos JSON
});
