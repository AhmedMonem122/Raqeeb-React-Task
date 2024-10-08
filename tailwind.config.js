/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      manrope: ["Manrope", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
    },

    colors: {
      dimSecondary: "#2A303C",
      secondaryText: "#B2CCD6",
    },
  },

  daisyui: {
    themes: ["light", "dark", "cupcake", "dim", "dim"],
  },

  plugins: [require("daisyui")],
};