/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        'blink-border': 'blink-border 1s linear infinite', 
      },
      keyframes: {
        'blink-border': {
          '0%, 100%': { borderColor: 'transparent'},
          '50%': { borderColor: 'red'},
        }
      }
    },
  },
  plugins: [],
}

