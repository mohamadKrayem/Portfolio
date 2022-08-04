/** @type {import('tailwindcss').Config} */
module.exports = {
  content:["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      backgroundImage:  {
        "calc": "url('src/assets/CalculatorApp.jpg')",
      }
    },
    fontFamily: {
      poppins: ["Poppins", 'Arial', 'sans-serif'],
    }
  },
  plugins: [],
}