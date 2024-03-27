/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        MyGray: 'rgb(61, 61, 61)',
      },
    },
  },
  plugins: [],
}

