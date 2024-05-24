/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        error: "#444",
        // "error_severe": "#f00",
        primary: "#1a202c",
        secondary: "#2d3748",
      },
    },
  },
  plugins: [],
};
