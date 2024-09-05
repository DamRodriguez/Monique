document.addEventListener("DOMContentLoaded", function () {
  const navbarElement = document.getElementById("navbar");

  if (navbarElement) {
    navbarElement.innerHTML = `
    <div class="border-gray-200 fixed w-full z-20 top-0 start-0 bg-transparent">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse hover:scale-105 hover:transition-transform">
            <img src="public/assets/images/monique-logo.png" class="h-8 filter invert brightness-0" alt="Monique Logo"/>
        </a>
        <button data-collapse-toggle="navbar-solid-bg" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:bg-none hover:scale-105" aria-controls="navbar-solid-bg" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="w-5 h-5 text-gray-50 text-shadow-md" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
        <div class="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
        <div class="max-w-fit ml-auto rounded-lg shadow-xl backdrop-blur-lg bg-opacity-20 md:bg-none xl:bg-none md:shadow-none xl:shadow-none md:backdrop-blur-none">
        <ul class="p-2 md:overflow-visible xl:overflow-visible flex flex-col font-medium mt-4 rounded-lg md:rounded-none xl:rounded-none bg-gray-50 bg-opacity-20 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent overflow-hidden">
            <li>
            <a href="../../index.html" class="text-shadow-md rounded-md text-base relative block py-2 px-3 xl:text-xl md:text-lg text-gray-50 hover:bg-black hover:bg-opacity-10 hover:text-white md:hover:bg-transparent xl:hover:bg-transparent group hover:scale-105 hover:transition-transform">
                Inicio
                <span class="shadow-2x1 rounded-lg hidden md:block absolute bottom-0 left-1/2 w-0 h-[2px] bg-gradient-to-r from-white to-purple-600 transition-all duration-500 ease-in-out group-hover:w-full group-hover:left-0"></span>
            </a>
            </li>

            <a href="#" class="text-shadow-md rounded-md text-base relative block py-2 px-3 xl:text-xl md:text-lg text-gray-50 hover:bg-black hover:bg-opacity-10 hover:text-white md:hover:bg-transparent xl:hover:bg-transparent group hover:scale-105 hover:transition-transform">
                Productos
                <span class="shadow-2x1 rounded-lg hidden md:block absolute bottom-0 left-1/2 w-0 h-[2px] bg-gradient-to-r from-white to-purple-600 transition-all duration-500 ease-in-out group-hover:w-full group-hover:left-0"></span>
            </a>
            </li>

            <a href="#" class="text-shadow-md rounded-md text-base relative block py-2 px-3 xl:text-xl md:text-lg text-gray-50 hover:bg-black hover:bg-opacity-10 hover:text-white md:hover:bg-transparent xl:hover:bg-transparent group hover:scale-105 hover:transition-transform">
                Contacto
                <span class="shadow-2x1 rounded-lg hidden md:block absolute bottom-0 left-1/2 w-0 h-[2px] bg-gradient-to-r from-white to-purple-600 transition-all duration-500 ease-in-out group-hover:w-full group-hover:left-0"></span>
            </a>
            </li>
        </ul>
        </div>
        </div>
    </div>
    </div>

      `;
  }
});
