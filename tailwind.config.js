module.exports = {
    content: [
      './public/**/*.{html,js}',
      './src/**/*.{html,js}',
      './node_modules/flowbite/**/*.js',
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
    ],
}