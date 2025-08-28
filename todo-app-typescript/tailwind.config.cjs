// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkbg: "#1a1d25",
        text: "#f5f7fa",
        accent: "#ffcc00",
        gold: "#ffc107",
        danger: "#ff4c4c",
        btnbg: "#ffcc00",
        btnhover: "#e6b800",
        btntext: "#0f1117",
        borderc: "#333",
        linkc: "#61dafb"
      },
      boxShadow: {
        smx: "0 2px 8px rgba(0,0,0,0.1)",
        mdx: "0 4px 16px rgba(0,0,0,0.2)",
        lgx: "0 8px 24px rgba(0,0,0,0.3)"
      },
      borderRadius: {
        smx: "6px",
        mdx: "10px",
        lgx: "16px"
      },
      backgroundImage: {
        japan: "url('/japan-background-digital-art.jpg')"
      },
      animation: { "pulse-slow": "pulse-slow 1.5s infinite" },
      keyframes: {
        "pulse-slow": {
          "0%,100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" }
        }
      }
    }
  },
  plugins: [require("@tailwindcss/forms")],
};
