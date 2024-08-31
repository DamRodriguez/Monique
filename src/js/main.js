function loadNavbar() {
    fetch('/src/components/navbar.html')  // Ruta relativa desde public/index.html
        .then(response => {
            if (!response.ok) {
                throw new Error('Red error');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
        })
        .catch(error => console.error('Error al cargar el navbar:', error));
}

document.addEventListener('DOMContentLoaded', loadNavbar);
