/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bluePText: '#7D8FB3',
        blueCardTitle: '#4D5E80',
        blueCardSubTitle: '#ADB8CC',
        bgDark: '#17202a',
        CardDark: '#293747',
        cardText: '#6B7A99',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')

  ],
}