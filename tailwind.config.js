/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/client/**/*.{html,js,jsx}'],
  theme: {
    colors: {
      ...colors,
      'dk-navy': '#0f172a',
      'lt-grey': '#94a3b8',
      white: '#FFFFFF',
      blue: '#38bdf8',
      gray: '#ededed',
    },

    screens: {},
    extend: {},
  },
  plugins: ['postcss-preset-env'],
};
