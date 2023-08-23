/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#00FCED',
        secondary: '#D9D9D9',
      },
      fontFamily: {
        primary: 'IBM Plex Mono',
      },
      screens: {
        'vsm': '406px',
      },
    },
  },
  plugins: [],
}

