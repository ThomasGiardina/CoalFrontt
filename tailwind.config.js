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
          "primary": "#f97316", 
          "secondary": "#1b2838", 
          "accent": "#c27c2c",  
          "neutral": "#232f3e",  
          "base-100": "#0b0f14",  
          "info": "#66c0f4",  
          "success": "#4caf50",  
          "warning": "#ffc107",  
          "error": "#ef4444",  
        },
      },
    ],
  },
  plugins: [require('daisyui')],
}