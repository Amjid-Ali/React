/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        85: "10rem",
        100: "30rem",
        110:'40rem',
        120:'50rem',
      },
      boxShadow: {
        "inp": "-5px -5px 10px $color-white",
      },
    },
  },
  plugins: [],
};