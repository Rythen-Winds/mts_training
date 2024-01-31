/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        text: '#050315',
        background: '#fbfbfe',
        primary: '#334155',
        secondary: '#1e293b',
        accent: '#be0207',
      },
    },
  },
  plugins: [],
};
