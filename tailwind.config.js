/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      tablet: '768px',
      desktop: '1024px',
    },
    extend: {
      colors: {
        orange: '#FFB000',
        teal: '#25B79F',
      },
    },
  },
  plugins: [],
}
