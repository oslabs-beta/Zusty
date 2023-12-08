/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/client/**/*.{html,js,jsx}'],
  theme: {
    colors: {
      ...colors,
      'code-bg': '#332930',
      'light-codebg': '#5B5459',
      'code-o': '#fd8b18',
      'dk-navy': '#0f172a',
      'lt-grey': '#94a3b8',
      'dk-white': '#ededed',
      white: '#FFFFFF',
      blue: '#38bdf8',
    },

    screens: {},
    extend: {},
  },
  plugins: ['postcss-preset-env'],
};
