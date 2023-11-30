/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/client/**/*.{html,js,jsx}'],
  theme: {
    colors: {
      'dk-navy': '#0f172a',
      'lt-grey': '#94a3b8',
      'white': '#FFFFFF',
      'blue': '#38bdf8',
    },
  
    screens: {
      
    },
    extend: {},
  },
  plugins: ['postcss-preset-env'],
};
  