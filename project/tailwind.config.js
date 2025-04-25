/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4a6670',
        'primary-light': '#5c7882',
      },
    },
  },
  plugins: [],
};