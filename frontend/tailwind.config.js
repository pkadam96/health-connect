/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'outfit': ['outfit', 'sans-serif'],
      },
      fontWeight: {
        'outfit': 400,
      },
      borderWidth: {
        '1': '1px',
      },
      letterSpacing: {
        'widest': '.35em',
      },
      lineHeight: {
        '12': '59px',
        '13': '64px'
      },
      height: {
        'screen-100': 'calc(100vh - 60px)',
        'screen-full':"90vh"
      },
      animation: {
        'slide-in-right': 'slideInRight 1s ease-out',
        'right-to-left': 'moveRightToLeft 50s linear infinite',
        'left-to-right': 'moveLeftToRight 50s linear infinite',
        'bottom-to-top': 'moveBottomToTop 2s ease-in-out',
        'breathing': 'breathing 2s ease-in-out'
      },
      keyframes: {
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '90%': { transform: 'translateX(-10%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        moveRightToLeft: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        moveLeftToRight: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        moveBottomToTop: {
          '0%': {
            transform: 'translateY(0%)'
          },
          '50%': {
            transform: 'translateY(-100%)'
          },
          '100%': {
            transform: 'translateY(0%)'
          }
        },
        breathing : {
          '0%': { transform: 'translateY(50%)' },
          '90%': { transform: 'translateY(-10%)' },
          '100%': { transform: 'translateY(0%)' },
        }
      }
    },
  },
  screens: {
    'sm': '640px',   // Target mobile screens
    'md': '768px',   // Target tablet screens
    'lg': '1024px',  // Target laptop screens
    'xl': '1280px',  // Target larger screens
  },
  plugins: [
  ],
}
