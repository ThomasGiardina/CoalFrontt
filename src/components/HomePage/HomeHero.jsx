import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const Homehero = () => {
    return (
        <div className="w-full max-w-2xl px-4">
            <span className="text-primary text-base sm:text-lg font-semibold tracking-wider uppercase">Tu tienda de confianza</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-4 mb-5 leading-tight">
                Descubrí tu próximo <span className="text-primary">juego favorito</span>
            </h1>
            <p className="text-gray-400 text-lg sm:text-xl leading-relaxed mb-8">
                Miles de juegos para todas las plataformas. Precios competitivos, entrega inmediata y soporte 24/7.
            </p>
            <div className="flex flex-wrap gap-8 mb-8 py-5 border-y border-base-200">
                <div>
                    <span className="text-3xl sm:text-4xl font-bold text-white">500+</span>
                    <p className="text-gray-500 text-base">Juegos</p>
                </div>
                <div>
                    <span className="text-3xl sm:text-4xl font-bold text-white">4</span>
                    <p className="text-gray-500 text-base">Plataformas</p>
                </div>
                <div>
                    <span className="text-3xl sm:text-4xl font-bold text-white">24/7</span>
                    <p className="text-gray-500 text-base">Soporte</p>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/Store" className="btn btn-primary text-white gap-2 btn-lg">
                    Explorar Tienda <FaArrowRight />
                </Link>
                <Link to="/About" className="btn btn-neutral text-white btn-lg">Conocer más</Link>
            </div>
        </div>
    )
}

export default Homehero;
