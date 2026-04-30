import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',

  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        primary: '#0b99ce',
        secondary: '#fe3885',
        accent: '#0ea5e9',

        // theme support colors (IMPORTANT)
        darkBg: '#0f172a',
        darkCard: '#1e293b',
        lightBg: '#f8fafc',
      },

      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },

      boxShadow: {
        soft: '0 10px 25px rgba(0,0,0,0.05)',
        glow: '0 0 20px rgba(11, 153, 206, 0.3)',
      },

      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },

      animation: {
        fadeIn: 'fadeIn 0.4s ease-out',
      },
    },
  },

  plugins: [],
};
