/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { 50: '#f0f9ff', 100: '#e0f2fe', 500: '#0ea5e9', 900: '#0c4a6e' },
        surface: { light: '#ffffff', dark: '#1e293b' },
        background: { light: '#f8fafc', dark: '#0f172a' }
      }
    },
  },
  plugins: [],
}