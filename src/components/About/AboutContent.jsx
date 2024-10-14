import React from 'react';

const AboutContent = () => {
    return (
        <div className="w-full flex flex-col items-center bg-gray-800 p-6 rounded-lg mt-20">
            <h2 className="text-3xl font-bold text-white mb-6">Sobre Nosotros</h2>
            <p className="text-white mb-4">
                Bienvenido a Coal, tu tienda de videojuegos de confianza. Nos dedicamos a ofrecer una amplia variedad de juegos para todas las plataformas, asegurando siempre los mejores precios y un servicio de atención al cliente excepcional.
            </p>
            <p className="text-white mb-4">
                En Coal, creemos en la importancia de la comunidad gamer y trabajamos arduamente para crear un espacio donde todos los jugadores puedan encontrar lo que buscan. Ya sea que prefieras juegos de acción, aventura, RPG, simulación, deportes, estrategia, puzzle, terror, VR o educativos, tenemos algo para ti.
            </p>
            <p className="text-white mb-4">
                Nuestro equipo está disponible las 24 horas del día, los 7 días de la semana, para ayudarte con cualquier consulta o problema que puedas tener. Además, garantizamos una entrega rápida y segura de todos nuestros productos.
            </p>
            <p className="text-white">
                Gracias por elegir Coal. ¡Esperamos que disfrutes de tu experiencia con nosotros!
            </p>
        </div>
    );
};

export default AboutContent;