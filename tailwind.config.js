const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'], // Adjust paths based on your project structure
  theme: {
    extend: {
      colors: {
        primary: '#FFD700', // Yellow from the logo
        secondary: '#FF69B4', // Pink from the logo
        accent: '#3D85C6', // Blue from the logo
        black: colors.black,
        white: colors.white,
      },
      fontFamily: {
        sans: ['Helvetica', 'sans-serif'], // Default sans-serif font
      },
      spacing: {
        '60vh': '60vh', // Custom height used for prompt box
      },
    },
  },
  plugins: [],
};
