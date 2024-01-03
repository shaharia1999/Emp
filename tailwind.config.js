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
        comforta:['Comfortaa'],
        Plyafire:['Lora'],
        Display:['DM Serif Display'],
        Rovoto:['Roboto Slab']
      }
    },
  },
  plugins: [require('flowbite/plugin')],
}



