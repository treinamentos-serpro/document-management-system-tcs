/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Source Sans 3"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#18212f',
        paper: '#f7f8f5',
        line: '#d8ded6',
        action: '#0f766e',
        archive: '#3b5b7c',
      },
      boxShadow: {
        panel: '0 18px 50px -30px rgb(24 33 47 / 0.45)',
      },
    },
  },
  plugins: [],
};