/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FAF3E7',
        card: '#FFFDF6',
        ink: '#221A12',
        cream: '#FAF3E7',
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      borderRadius: { pill: '999px' },
      boxShadow: {
        pill: '0 10px 22px -10px rgba(34,26,18,.6)',
        glow: '0 0 0 5px rgba(246,201,92,.3), 0 0 22px rgba(244,166,155,.5)',
      },
      minHeight: { pill: '56px' },
    },
  },
  plugins: [],
}
