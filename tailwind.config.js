/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Identidade LC CAPTA — azul petróleo / azul escuro
        capta: {
          50: '#eef4f6',
          100: '#d6e5e9',
          200: '#adc9d1',
          300: '#7fa8b4',
          400: '#4f8493',
          500: '#316879', // azul petróleo — cor primária
          600: '#26505d',
          700: '#1c3b45',
          800: '#13262d', // azul escuro — headers, sidebar
          900: '#0b171b',
        },
        ink: '#101820',
        surface: '#f6f8f9',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Sora"', '"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
