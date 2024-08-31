module.exports = {
    content: [
      './*.{html,js}',  // Cambiado para buscar en la raíz
      './src/**/*.{html,js}',  // Asegúrate de que esta carpeta existe y contiene archivos HTML/JS
      './node_modules/flowbite/**/*.js',  // Para Flowbite
    ],
    theme: {
      extend: {
        colors: {
          'custom-blue': '#1fb6ff',
        },
      },
    },
    plugins: [
      require('@tailwindcss/forms'),  // Si usas algún plugin como Tailwind Forms
      require('daisyui'),  // Ejemplo de plugin adicional
      require('flowbite/plugin'),  // Para Flowbite
    ],
  }
  