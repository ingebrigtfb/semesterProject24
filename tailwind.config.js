/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./auth/**/*.html",
    "./post/**/*.html",
    "./profile/index.html",
    "./public/**/*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/css/**/*.css",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E2E8F0',
        secondary: '#1A202C',
        containers: '#EDF2F7'
      },
      fontFamily: {
        'custom': ['Poppins', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}

