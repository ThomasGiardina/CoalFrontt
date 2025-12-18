import { FaShippingFast, FaLock, FaHeadset, FaStar, FaGamepad, FaGift } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const AboutContent = () => {
    return (
        <div className="relative w-full flex flex-col items-center bg-background p-4 sm:p-6 lg:p-12 rounded-lg mt-2 space-y-6 sm:space-y-8 lg:space-y-12">

            <div className="absolute top-0 left-0 w-1/4 h-48 bg-accent rounded-br-full opacity-30 z-0"></div>
            <div className="absolute top-0 right-0 w-1/4 h-32 bg-primary rounded-bl-full opacity-40 z-0"></div>

            <motion.h2 
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4 sm:mb-6 relative z-10 text-center px-4"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}>
                Bienvenido a Coal
            </motion.h2>

            <motion.p 
                className="text-white mb-4 text-base sm:text-lg max-w-4xl text-center leading-relaxed relative z-10 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 1 }}>
                En Coal, somos especialistas en videojuegos físicos y ediciones de colección. Contamos con una vasta selección para todas las plataformas y nos aseguramos de ofrecer la mejor experiencia de compra para los aficionados a los videojuegos. Desde títulos clásicos hasta las últimas novedades, siempre encontrarás lo que buscas en nuestra tienda.
            </motion.p>

            <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}>

                {[
                    { icon: <FaGamepad />, title: "Variedad", description: "Más de 1000 títulos físicos disponibles." },
                    { icon: <FaStar />, title: "Ediciones Exclusivas", description: "Ediciones limitadas y de colección." },
                    { icon: <FaShippingFast />, title: "Envío Express", description: "Entrega segura y rápida a todo el país." },
                    { icon: <FaLock />, title: "Pago Seguro", description: "Transacciones 100% seguras." },
                    { icon: <FaHeadset />, title: "Soporte 24/7", description: "Asistencia personalizada." },
                    { icon: <FaGift />, title: "Ofertas Especiales", description: "Descuentos y promociones." }
                ].map((item, index) => (
                    <div 
                        key={index} 
                        className="flex items-center bg-accent p-6 rounded-lg shadow-lg transform transition-all">
                        <div className="text-primary text-4xl mr-6">{item.icon}</div>
                        <div>
                            <h3 className="text-xl font-bold text-white">{item.title}</h3>
                            <p className="text-white">{item.description}</p>
                        </div>
                    </div>
                ))}
            </motion.div>

            <div className="absolute bottom-0 left-0 w-1/4 h-48 bg-primary rounded-tr-full opacity-30 z-0"></div>
            <div className="absolute bottom-0 right-0 w-1/4 h-40 bg-accent rounded-tl-full opacity-30 z-0"></div>

            <motion.div 
                className="relative z-10 w-full flex flex-col items-center bg-gradient-to-b from-background to-accent p-8 rounded-b-lg space-y-10 mt-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}>
                
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 text-center">Preguntas Frecuentes (FAQ)</h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 text-white text-base sm:text-lg leading-relaxed max-w-5xl px-4">
                    <div>
                        <p className="mb-2 font-bold">1. ¿Cómo puedo comprar un videojuego físico en la tienda?</p>
                        <p>Es muy fácil. Regístrate en nuestra página, selecciona los videojuegos que te interesen y sigue el proceso de compra. Podrás elegir el método de envío al finalizar.</p>
                    </div>
                    <div>
                        <p className="mb-2 font-bold">2. ¿Cuáles son los métodos de pago disponibles?</p>
                        <p>Aceptamos tarjetas de crédito, débito y Efectivo. Próximamente, agregaremos más opciones.</p>
                    </div>
                    <div>
                        <p className="mb-2 font-bold">3. ¿Hacen envíos a todo el país?</p>
                        <p>Sí, realizamos envíos a todo el país con opciones de envío exprés y estándar.</p>
                    </div>
                    <div>
                        <p className="mb-2 font-bold">4. ¿Puedo devolver un videojuego físico si no me gusta?</p>
                        <p>Aceptamos devoluciones si el juego está en su empaque original y sin abrir. Contacta con soporte para más detalles.</p>
                    </div>
                    <div>
                        <p className="mb-2 font-bold">5. ¿Puedo recoger mi pedido en persona?</p>
                        <p>No ofrecemos recogida en persona. Todos los pedidos son enviados a través de mensajería.</p>
                    </div>
                    <div>
                        <p className="mb-2 font-bold">6. ¿Qué hago si mi pedido llega dañado?</p>
                        <p>Si tu pedido llega dañado, contáctanos de inmediato con fotos del daño y gestionaremos un reemplazo o reembolso.</p>
                    </div>
                </div>
            </motion.div>

            <div className="relative z-10">
                <Link to={"/Store"}>
                    <button className="bg-primary text-white px-6 py-3 rounded-full shadow-lg transition-none">
                        Explora nuestro catálogo
                    </button>
                </Link>
            </div>

        </div>
    );
};

export default AboutContent;
