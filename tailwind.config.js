/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  safelist:[],
  theme: {
    extend: {fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
  },
  },
  plugins: [],
}

