/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'regular-stratos': '#001049',
        'light-lavender': '#f8f4fc',
        'sky-blue': '#2596be',
        'purple': '#623ab3',
        'teal': '#46a895',
        'coral-red': '#fe4436'
      },
      width: {
        '160px': '160px',
        'cw': '300px',
        'ch': '600px',
      },
      height: {
        'img-detail': '600px',
        'img-detail-sm': '200px',
        'img-card': '150px',
        'img-home': '700px',
        'img-home-sm': '200px'
      },
      padding: {
        '25px': '25px',
      },
      fontFamily: {
        sans: ['Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    }
  },
  plugins: [],
}

// #001049