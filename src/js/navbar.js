document.addEventListener("DOMContentLoaded", function () {
  const navbarElement = document.getElementById("navbar");

  if (navbarElement) {
    navbarElement.innerHTML = `
    <div class="border-gray-200 fixed w-full z-20 top-0 start-0 bg-transparent">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="public/assets/images/monique-logo.png" class="h-8" alt="Monique Logo"/>
        </a>
        <button data-collapse-toggle="navbar-solid-bg" type="button" class=" inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden hover:bg-black hover:bg-opacity-5 focus:outline-none focus:bg-none" aria-controls="navbar-solid-bg" aria-expanded="false">
            <span class="sr-only ">Open main menu</span>
            <svg class="w-5 h-5 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
        <div class="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
        <div class="max-w-fit ml-auto">
        <ul class="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 bg-opacity-20 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent overflow-hidden">
            <li>
            <a href="#" class="block py-2 px-3 xl:text-xl text-gray-900 xl:hover:text-gray-100 hover:bg-black hover:bg-opacity-10 hover:text-white md:hover:bg-transparent">Inicio</a>
            </li>
            <li>
            <a href="#" class="block py-2 px-3 xl:text-xl text-gray-900 xl:hover:text-gray-100 hover:bg-black hover:bg-opacity-10 hover:text-white md:hover:bg-transparent">Productos</a>
            </li>
            <li>
            <a href="#" class="block py-2 px-3 xl:text-xl text-gray-900 xl:hover:text-gray-100 hover:bg-black hover:bg-opacity-10 hover:text-white md:hover:bg-transparent">Contacto</a>
            </li>
        </ul>
        </div>
        </div>
    </div>
    </div>

      `;
  }
});
