/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'idcn-primary': '#ce1616',
        'idcn-dark': '#1e293b',
        'idcn-light': '#f8fafc',
      },
      fontFamily: {
        sans: ['Montserrat', 'Inter', 'sans-serif'],
        merriweather: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
}