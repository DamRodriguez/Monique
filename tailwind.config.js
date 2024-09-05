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
  ],
  daisyui: {
    themes: ["light", "dark"],
  },
}
