/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0052CC',
        secondary: '#E6F500',
        accent: '#00BCD4',
      },
    },
  },
  plugins: [],
}
