const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"], // Adjust paths based on your project structure
  theme: {
    extend: {
      colors: {
        primary: "#FFD700", // Yellow from the logo
        "primary-shade": {
          50: "#ffffe7",
          100: "#feffc1",
          200: "#fffd86",
          300: "#fff441",
          400: "#ffe60d",
          500: "#ffd700",
          600: "#d19e00",
          700: "#a67102",
          800: "#89580a",
          900: "#74480f",
          950: "#442604",
        },

        secondary: "#FF69B4", // Pink from the logo
        accent: "#3D85C6", // Blue from the logo
        black: colors.black,
        white: colors.white,
        "steel-blue": {
          50: "#f3f7fc",
          100: "#e6eef8",
          200: "#c7dbf0",
          300: "#95bde4",
          400: "#5d9cd3",
          500: "#3d85c6",
          600: "#2864a1",
          700: "#215083",
          800: "#1f456d",
          900: "#1f3b5b",
          950: "#14263d",
        },

        "hot-pink": {
          50: "#fef1f8",
          100: "#fee5f2",
          200: "#ffcbe8",
          300: "#ffa1d3",
          400: "#ff69b4",
          500: "#fa3a95",
          600: "#ea1870",
          700: "#cc0a57",
          800: "#a80c47",
          900: "#8c0f3e",
          950: "#560121",
        },
      },
      fontFamily: {
        sans: ["Helvetica", "sans-serif"], // Default sans-serif font
      },
      spacing: {
        "60vh": "60vh", // Custom height used for prompt box
      },
    },
  },
  plugins: [],
};
