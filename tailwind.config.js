module.exports = {
  content: [
    './*.{html,js}',  
    './src/**/*.{html,js}',
    './node_modules/flowbite/**/*.js',  
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['"Poppins"', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),  
    require('daisyui'),  
    require('flowbite/plugin'),
    require('tailwindcss-textshadow'),
  ],
  daisyui: {
    themes: ["light", "dark"],
  },
}
