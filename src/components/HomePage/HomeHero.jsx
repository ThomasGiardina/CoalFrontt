import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const Homehero = () => {
    return (
        <div className="w-full max-w-xl px-4">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">Tu tienda de confianza</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 mb-4 leading-tight">
                Descubrí tu próximo <span className="text-primary">juego favorito</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-6">
                Miles de juegos para todas las plataformas. Precios competitivos, entrega inmediata y soporte 24/7.
            </p>
            <div className="flex flex-wrap gap-6 mb-6 py-4 border-y border-base-200">
                <div>
                    <span className="text-2xl sm:text-3xl font-bold text-white">500+</span>
                    <p className="text-gray-500 text-sm">Juegos</p>
                </div>
                <div>
                    <span className="text-2xl sm:text-3xl font-bold text-white">4</span>
                    <p className="text-gray-500 text-sm">Plataformas</p>
                </div>
                <div>
                    <span className="text-2xl sm:text-3xl font-bold text-white">24/7</span>
                    <p className="text-gray-500 text-sm">Soporte</p>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/Store" className="btn bg-gradient-to-r from-[#FF6828] to-[#E57028] hover:from-[#E57028] hover:to-[#FF6828] text-white border-none shadow-lg shadow-[#FF6828]/25 hover:shadow-[#FF6828]/40 transform hover:-translate-y-0.5 transition-all duration-300 gap-2">
                    Explorar Tienda <FaArrowRight />
                </Link>
                <Link to="/About" className="btn btn-ghost">Conocer más</Link>
            </div>
        </div>
    )
}

export default Homehero;
