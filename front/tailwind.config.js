/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        ink: '#172033',
        sunu: '#0f766e',
        mango: '#f59e0b',
        coral: '#ef4444',
      },
      boxShadow: {
        soft: '0 16px 45px rgba(23, 32, 51, 0.08)',
      },
    },
  },
  plugins: [],
};
