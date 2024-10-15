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
          "primary": "#FF6828",         // Naranja oscuro y profundo para elementos destacados como botones principales.
          "secondary": "#E57028",       // Naranja ligeramente más oscuro para los botones secundarios o detalles menores.
          "accent": "#3A3D46",          // Azul grisáceo muy oscuro para detalles interactivos o enlaces, sutil y en línea con el tema oscuro.
          "neutral": "#141517",         // Gris casi negro, perfecto para los contenedores, creando un contraste suficiente con el fondo.
          "base-100": "#0A0B0D",        // Negro absoluto, usado para las secciones más importantes, como pie de página o encabezados.
          "background": "#0F1012",      // Fondo extremadamente oscuro, prácticamente negro, para resaltar los elementos naranjas.
          "info": "#3A4E57",            // Azul oscuro, casi gris, para información o detalles menores.
          "success": "#2F6A32",         // Verde muy oscuro para notificaciones de éxito.
          "warning": "#B3741F",         // Amarillo oscuro, tirando a marrón, para advertencias o alertas.
          "error": "#C13838"            // Rojo oscuro y profundo para mensajes de error o alertas críticas.
        }
        
        
        
        
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