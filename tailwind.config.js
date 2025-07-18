// tailwind.config.js
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Adjust this based on your project structure
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors:{
        black: {
          //  DEFAULT: '#121212', 
        },
      },
      fontFamily: {
        // Bricolage: ["'Bricolage Grotesque'", "sans-serif"], // Corrected the font definition
        // Inter: ['Inter', 'sans-serif'], // Uncomment this if you need to use it
      },
    },
  },
  plugins: [],
};
