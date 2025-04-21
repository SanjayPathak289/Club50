/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#00ADB5',
        dark: "#18191A",
        white: "#fff",
        gray: {
          dark: "#242526",
          light: "#3A3B3C",
          100: '#D3D3D390',
          200: '#dee2e6',
          300: '#ced4da'
        }
      },
      fontFamily: {
        pbold: ["ChesnaGrotesk-Bold", "sans-serif"],
        px: ["chesnagrotesk-medium", "sans-serif"]
      },
    },
  },
  plugins: [],
}

