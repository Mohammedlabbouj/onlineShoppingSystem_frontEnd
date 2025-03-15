/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 }
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        }
      },
      animation: {
        slideIn: 'slideIn 0.2s ease-out',
        slideDown: 'slideDown 0.2s ease-out',
        fadeIn: 'fadeIn 0.2s ease-out'
      },
      colors: {
        github: {
          bg: '#0d1117',
          text: '#c9d1d9',
          border: '#30363d',
          hover: '#21262d',
        }
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark', 'github'],
      textColor: ['dark', 'github'],
      borderColor: ['dark', 'github']
    }
  },
  plugins: [],
}
