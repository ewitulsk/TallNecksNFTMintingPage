const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    scale: {
      '30': '.3',
      '20': '.2',
      },
      extend:{
        backgroundImage: {
        'exampleGif': "url('./assets/TallNeckExample.gif')",
      },
      colors: {
        "dark-orange": "#ff9900",
      }, 
    }
  },
  plugins: [],
}
