/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    
  ],
  theme: {
    extend: {
      fontFamily:{
        Plyafire:['DM Serif Display'],
        Rovoto:['Roboto Condensed']
      }
    },
  },
  plugins: [require('flowbite/plugin')],
}



