/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./src/**/**/*.{js,jsx,ts,tsx}",
  "./src/**/*.{js,jsx,ts,tsx}",
  "./src/*.{js,jsx,ts,tsx}",
  './public/**/*.html',
  './public/*.html',
],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('../public/images/bg.jpg')",
      }
    },
  },
  plugins: [{
    'postcss-nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  }],
  mode: 'jit'
}

