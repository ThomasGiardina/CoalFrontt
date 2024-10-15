import React from 'react';

const SupportContent = () => {
    return (
        <div className="w-full flex flex-col items-center bg-black p-6 rounded-lg mt-20">
            <h2 className="text-4xl font-bold text-orange-500 mb-6">Soporte</h2>
            <p className="text-gray-300 mb-4 text-lg">
                Si necesitas ayuda, no dudes en contactarnos a través de las siguientes maneras:
            </p>
            <div className="text-gray-300 mb-4 text-lg">
                <h3 className="text-3xl font-bold text-orange-500 mb-4">Contacto</h3>
                <p className="mb-2"><span className="font-bold text-white">Teléfono:</span> +1 234 567 890</p>
                <p className="mb-2"><span className="font-bold text-white">Correo Electrónico:</span> support@coal.com</p>
                <p className="mb-2"><span className="font-bold text-white">Dirección:</span> 1234 Calle Falsa, Ciudad, País</p>
            </div>
            <div className="text-gray-300 mb-4 text-lg">
                <h3 className="text-3xl font-bold text-orange-500 mb-4">Horario de Atención</h3>
                <p className="mb-2"><span className="font-bold text-white">Lunes a Viernes:</span> 9:00 AM - 6:00 PM</p>
                <p className="mb-2"><span className="font-bold text-white">Sábado:</span> 10:00 AM - 4:00 PM</p>
                <p className="mb-2"><span className="font-bold text-white">Domingo:</span> Cerrado</p>
            </div>
            <div className="text-gray-300 mb-4 text-lg">
                <h3 className="text-3xl font-bold text-orange-500 mb-4">Redes Sociales</h3>
                <p className="mb-2"><span className="font-bold text-white">Facebook:</span> <a href="https://facebook.com/coal" className="text-blue-400 underline">facebook.com/coal</a></p>
                <p className="mb-2"><span className="font-bold text-white">Twitter:</span> <a href="https://twitter.com/coal" className="text-blue-400 underline">twitter.com/coal</a></p>
                <p className="mb-2"><span className="font-bold text-white">Instagram:</span> <a href="https://instagram.com/coal" className="text-blue-400 underline">instagram.com/coal</a></p>
            </div>
        </div>
    );
};

export default SupportContent;