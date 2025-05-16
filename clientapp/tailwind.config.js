// tailwind.config.js
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'standard': {
          red: '#FF0000',     // The bright red color
          navy: '#1A237E',    // The navy blue color
          light: '#F5F5F5',   // The light gray/white color
          DEFAULT: '#1A237E'  // Default color when using 'standard' without specifier
        }
      },
      borderRadius: {
        'xl': '1.5rem',       // For the rounded corners shown in the design
      }
    },
  },
  plugins: [],
}