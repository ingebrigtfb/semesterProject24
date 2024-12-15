// tailwind.config.mjs
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./auth/**/*.{html,js}",
    "./profil/**/*.{html,js}",
    "./lage/**/*.{html,js}",
    "./rediger/**/*.{html,js}",
    "./annonse/**/*.{html,js}",
    "./oppdater-profil/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E2E8F0",
        secondary: "#1A202C",
        containers: "#EDF2F7",
      },
    },
  },
  plugins: [],
};
