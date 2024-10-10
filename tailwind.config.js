/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#B0513D", 
          "secondary": "#2B2738", 
          "accent": "#c27c2c",  
          "neutral": "#232f3e",  
          "base-100": "#0b0f14",  
          "info": "#66c0f4",  
          "success": "#4caf50",  
          "warning": "#ffc107",  
          "error": "#ef4444",
          "extra": "#f5f2f0",
          "fondo": "#1B2838",
        },
      },
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [require('daisyui')],
}