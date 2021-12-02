module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        'cad': '-2px 2px 5px #000000',
      },
      backgroundColor: {
        'navbarPrimary': '#1F2937',
        'navbarSecondary': '#3c5068',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [],
}
