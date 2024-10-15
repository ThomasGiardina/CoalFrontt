import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SupportContent = () => {
    return (
        <div className="relative w-full flex flex-col items-center bg-background p-8 lg:p-12 rounded-lg mt-2 space-y-12">
            <div className="absolute top-0 left-0 w-1/4 h-48 bg-accent rounded-br-full opacity-30 z-0"></div>
            <div className="absolute top-0 right-0 w-1/4 h-32 bg-primary rounded-bl-full opacity-40 z-0"></div>
            <motion.h2 
                className="text-5xl font-bold text-primary mb-6 relative z-10"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}>
                Soporte al Cliente
            </motion.h2>
            <motion.p
                className="text-white mb-4 text-lg max-w-4xl text-center leading-relaxed relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 1 }}
            >
                Si tienes alguna duda o necesitas asistencia, no dudes en contactarnos por cualquiera de las siguientes formas. Estamos aquí para ayudarte.
            </motion.p>
            <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}>
                <div className="flex items-center bg-accent p-6 rounded-lg shadow-lg transform transition-all">
                    <div className="text-primary text-4xl mr-6">
                        <FaPhoneAlt />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">Teléfono</h3>
                        <p className="text-gray-300">+1 234 567 890</p>
                    </div>
                </div>
                <div className="flex items-center bg-accent p-6 rounded-lg shadow-lg transform transition-all">
                    <div className="text-primary text-4xl mr-6">
                        <FaEnvelope />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">Correo Electrónico</h3>
                        <p className="text-gray-300">support@coal.com</p>
                    </div>
                </div>
                <div className="flex items-center bg-accent p-6 rounded-lg shadow-lg transform transition-all">
                    <div className="text-primary text-4xl mr-6">
                        <FaMapMarkerAlt />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">Ubicación</h3>
                        <p className="text-gray-300">1234 Calle Falsa, Ciudad, País</p>
                    </div>
                </div>
            </motion.div>
            <motion.div 
                className="relative z-10 w-full flex flex-col items-center space-y-4 mt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}>
                <h3 className="text-4xl font-bold text-white mb-6 text-center">Horario de Atención</h3>

                <div className="flex flex-col lg:flex-row justify-around w-full max-w-4xl text-white text-lg leading-relaxed space-y-4 lg:space-y-0 lg:space-x-8">
                    <div className="flex items-center space-x-4">
                        <FaClock className="text-primary text-4xl" />
                        <div>
                            <h4 className="text-xl font-bold">Lunes a Viernes:</h4>
                            <p className="text-lg text-gray-300">9:00 AM - 6:00 PM</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <FaClock className="text-primary text-4xl" />
                        <div>
                            <h4 className="text-xl font-bold">Sábado:</h4>
                            <p className="text-lg text-gray-300">10:00 AM - 4:00 PM</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <FaClock className="text-primary text-4xl" />
                        <div>
                            <h4 className="text-xl font-bold">Domingo:</h4>
                            <p className="text-lg text-gray-300">Cerrado</p>
                        </div>
                    </div>
                </div>
            </motion.div>
            <motion.div
                className="relative z-10 w-full flex flex-col items-center bg-gradient-to-b from-background to-accent p-8 rounded-lg space-y-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}>
                
                <h3 className="text-4xl font-bold text-white mb-6">Síguenos en Redes Sociales</h3>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-white text-lg leading-relaxed max-w-5xl">
                    <div className="flex items-center space-x-4">
                        <FaFacebook className="text-primary text-4xl" />
                        <div>
                            <h4 className="font-bold">Facebook</h4>
                            <a href="https://facebook.com/coal" className="text-blue-400 underline">facebook.com/coal</a>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <FaTwitter className="text-primary text-4xl" />
                        <div>
                            <h4 className="font-bold">Twitter</h4>
                            <a href="https://twitter.com/coal" className="text-blue-400 underline">twitter.com/coal</a>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <FaInstagram className="text-primary text-4xl" />
                        <div>
                            <h4 className="font-bold">Instagram</h4>
                            <a href="https://instagram.com/coal" className="text-blue-400 underline">instagram.com/coal</a>
                        </div>
                    </div>
                </div>
            </motion.div>
            <div className="absolute bottom-0 left-0 w-1/4 h-48 bg-primary rounded-tr-full opacity-30 z-0"></div>
            <div className="absolute bottom-0 right-0 w-1/4 h-40 bg-accent rounded-tl-full opacity-30 z-0"></div>
        </div>
    );
};

export default SupportContent;
