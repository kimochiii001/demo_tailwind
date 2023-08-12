/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      
      fontFamily:{
        Karla:['Karla', 'sans-serif']
      },
      colors: {
        'dark-gray': '#605C7B',
        'light-coffee': '#C89F94',
        'coffee':{
          50:'#E8D6D0', 
          200:'#CB9F94',
          400:'#A25F4B'
        }
      },
      backgroundImage:{
        'slider-bg':'url("./src/assets/slider-bg.jpeg")'
      }
    },
  },
  plugins: [],
}