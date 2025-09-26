/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryGradientStart: "hsl(249, 99%, 64%)",
        primaryGradientEnd: "hsl(278, 94%, 30%)",
        error: "hsl(0, 100%, 66%)",
        white: "hsl(0, 100%, 100%)",
        gray200: "hsl(270, 3%, 87%)",
        gray400: "hsl(212, 12%, 71%)",
        purple950: "hsl(278, 68%, 11%)",
      },
      fontFamily: {
        spaceGrotesk: ['"Space Grotesk"', "sans-serif"],
      },
    },
  },
  plugins: [],
}
