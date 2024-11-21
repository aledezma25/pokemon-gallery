/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],

    theme: {
      extend: {
        perspective: {
          1000: '1000px',
        },
        rotate: {
          'x-180': '180deg',
        },
      },
    },
    plugins: [],
  };
  

