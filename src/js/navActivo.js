document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname; // Obtén la URL actual
  const links = document.querySelectorAll(".navLink"); // Selecciona todos los enlaces con la clase nav-link

  links.forEach(link => {
    const linkPath = new URL(link.href).pathname; // Obtén el path del href del enlace
    if (currentPath === linkPath) {
      link.classList.add("activo"); // Agrega la clase activa al enlace que coincide
    }
  });
});

