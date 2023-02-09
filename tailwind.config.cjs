/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: "'Raleway', sans-serif",
        noto: "'M PLUS Rounded 1c', sans-serif",
        montserrat: "'Montserrat', sans-serif",
      },
      colors: {
        app: {
          'dark-blue': '#1E213A',
          'dark-blue-2': '#100E1D',
          'dark-blue-3': '#110E3C',
          gray: '#6E707A',
          'gray-2': '#E7E7EB',
          'gray-3': '#616475',
          'gray-4': '#A09FB1',
          'gray-5': '#88869D',
          'gray-6': '#585676',
          purple: '#3C47E9',
          yellow: '#FFEC65',
        },
      },
      boxShadow: {
        button: '0px_4px_4px_rgba(0,0,0,0.25)',
      },
    },
  },
  plugins: [],
};
