/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        movatif: ["Movatif", "sans-serif"],
        typogrotesk: ["TypoGrotesk", "sans-serif"],
        ibmflexmono: ['IBM Plex Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
