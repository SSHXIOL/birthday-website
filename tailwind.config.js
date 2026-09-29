/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        plum: {
          950: '#120811',
          900: '#1a0d18',
          850: '#1f0e1d',
          800: '#230f20',
          700: '#32152d',
          600: '#461b3f',
        },
        blush: {
          100: '#fdf2f4',
          200: '#f7cad0',
          300: '#ffb3c6',
          400: '#ff85a1',
          500: '#ff5c8a',
        },
        roseGold: {
          300: '#f3c9be',
          400: '#e5ab9b',
          500: '#d48c7c',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        handwriting: ['"Caveat"', '"Dancing Script"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-8px)' },
          '40%, 80%': { transform: 'translateX(8px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(3deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(12px) rotate(-3deg)' },
        },
        jarShake: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '15%': { transform: 'rotate(-10deg) scale(1.05)' },
          '30%': { transform: 'rotate(10deg) scale(1.05)' },
          '45%': { transform: 'rotate(-8deg) scale(1.03)' },
          '60%': { transform: 'rotate(8deg) scale(1.03)' },
          '75%': { transform: 'rotate(-4deg) scale(1.01)' },
          '90%': { transform: 'rotate(4deg) scale(1.01)' },
          '100%': { transform: 'rotate(0deg) scale(1)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        }
      },
      animation: {
        shake: 'shake 0.45s cubic-bezier(0.36, 0.07, 0.19, 0.97) both',
        float: 'float 5s ease-in-out infinite',
        floatReverse: 'floatReverse 6s ease-in-out infinite',
        jarShake: 'jarShake 0.6s ease-in-out both',
        'spin-slow': 'spin 12s linear infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
      },
      boxShadow: {
        'glow-pink': '0 0 25px -3px rgba(255, 133, 161, 0.35)',
        'glow-rose': '0 0 35px -5px rgba(247, 202, 208, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }
    },
  },
  plugins: [],
}
