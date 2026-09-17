/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#060614',
          800: '#0a0a1f',
          700: '#0f1230',
          600: '#161938',
          500: '#1e2248',
        },
        brand: {
          blue: '#38bdf8',
          indigo: '#6366f1',
          violet: '#a78bfa',
          fuchsia: '#f0abfc',
        },
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      },
    },
  },
  plugins: [],
};
