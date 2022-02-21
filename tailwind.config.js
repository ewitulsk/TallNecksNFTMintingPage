const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    scale: {'60': '.6',},
      extend:{
        backgroundImage: {
        'exampleGif': "url('./assets/TallNeckExample.gif')",
      }
    }
  },
  plugins: [],
}
