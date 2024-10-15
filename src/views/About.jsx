import React from 'react';

const AboutContent = () => {
    return (
        <div className="w-full flex flex-col items-center bg-background p-6 rounded-lg mt-20">
            <h2 className="text-4xl font-bold text-white mb-6">Bienvenido a Coal</h2>
            <p className="text-white mb-4 text-lg">
                En nuestra tienda online encontrarás una amplia selección de videojuegos físicos para todas las plataformas. Ya seas amante de las ediciones de coleccionista o prefieras tener tus juegos en formato físico, tenemos lo que necesitas. Contamos con títulos de los mejores desarrolladores, ediciones especiales y envío rápido a cualquier parte del país. ¡Explora nuestro catálogo y recibe tus juegos favoritos directamente en la puerta de tu casa!
            </p>
            <h3 className="text-3xl font-bold text-white mb-4">¿Por qué elegirnos?</h3>
            <ul className="list-disc list-inside text-white mb-4 text-lg">
                <li><span className="font-bold">Variedad:</span> Más de 1000 títulos físicos disponibles.</li>
                <li><span className="font-bold">Ediciones Especiales:</span> Encuentra ediciones limitadas y de coleccionista.</li>
                <li><span className="font-bold">Envío rápido:</span> Trabajamos con los mejores servicios de mensajería para que recibas tus juegos lo más pronto posible.</li>
                <li><span className="font-bold">Seguridad:</span> Sistema de pago seguro y confiable.</li>
                <li><span className="font-bold">Soporte:</span> Atención al cliente personalizada para cualquier duda o consulta.</li>
            </ul>
            <h3 className="text-3xl font-bold text-white mb-4">Preguntas Frecuentes (FAQ)</h3>
            <div className="text-white mb-4 text-lg">
                <p className="mb-2"><span className="font-bold">1. ¿Cómo puedo comprar un videojuego físico en la tienda?</span></p>
                <p className="mb-4">Es muy fácil. Regístrate en nuestra página, selecciona los videojuegos físicos que te interesen, agrégalos al carrito y sigue el proceso de compra. También podrás elegir tu método de envío al finalizar la compra.</p>
                
                <p className="mb-2"><span className="font-bold">2. ¿Cuáles son los métodos de pago disponibles?</span></p>
                <p className="mb-4">Aceptamos tarjetas de crédito, débito y Efectivo. Estamos trabajando para añadir más opciones en el futuro.</p>
                
                <p className="mb-2"><span className="font-bold">3. ¿Hacen envíos a todo el país?</span></p>
                <p className="mb-4">Sí, realizamos envíos a todo el país. También ofrecemos opciones de envío exprés para que recibas tus juegos lo más rápido posible. Puedes ver los costos y tiempos estimados de entrega al finalizar la compra.</p>
                
                <p className="mb-2"><span className="font-bold">4. ¿Puedo devolver un videojuego físico si no me gusta?</span></p>
                <p className="mb-4">Aceptamos devoluciones solo si el juego se encuentra en su empaque original y no ha sido abierto. Para iniciar una devolución, por favor contacta a nuestro equipo de soporte (coal@support.com) dentro de los primeros 7 días hábiles tras recibir tu pedido.</p>
                
                <p className="mb-2"><span className="font-bold">5. ¿Cómo sé cuándo llegará mi pedido?</span></p>
                <p className="mb-4">Una vez que realices tu compra, recibirás un correo de confirmación con los detalles del envío y un número de seguimiento para que puedas rastrear tu pedido en tiempo real.</p>
                
                <p className="mb-2"><span className="font-bold">6. ¿Qué hago si mi pedido llega dañado?</span></p>
                <p className="mb-4">Si tu pedido llega dañado, ponte en contacto con nosotros inmediatamente. Te pedimos que nos envíes fotos del daño y te ayudaremos a gestionar un reemplazo o reembolso.</p>
                
                <p className="mb-2"><span className="font-bold">7. ¿Puedo recoger mi pedido en persona?</span></p>
                <p className="mb-4">Actualmente, no ofrecemos la opción de recogida en persona. Todos nuestros productos son enviados a través de mensajería.</p>
            </div>
        </div>
    );
};

export default AboutContent;