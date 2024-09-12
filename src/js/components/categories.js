// src/js/componentes/utils/categories.js

import { updateGallery } from './gallery.js';

export function setupCategoryButtons() {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            window.currentCategory = this.dataset.category;
            window.currentPage = 1;
            document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('border-2', 'border-gray-50', 'scale-110', 'text-white', 'botonClaro'));
            this.classList.add('border-2', 'border-gray-50', 'scale-110', 'text-white', 'botonClaro');
            updateGallery();
        });
    });

    const defaultButton = document.querySelector('.btn[data-category="all"]');
    if (defaultButton) {
        defaultButton.classList.add('border-2', 'border-gray-50', 'scale-110', 'text-white', 'botonClaro');
    }
}
