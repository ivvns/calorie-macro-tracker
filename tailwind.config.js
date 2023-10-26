/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/*.{html, js}'],
  screens: {
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1440px',
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

