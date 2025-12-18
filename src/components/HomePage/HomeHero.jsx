import { Link, useNavigate } from 'react-router-dom';

const Homehero = (Homehero) => {
    return (
        <div className="w-full max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center lg:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                    Explora, Juega y Conquista
                </h1>
                <p className="py-4 sm:py-6 text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed">
                    Los mejores videojuegos, al mejor precio. Encuentra tus favoritos y descubre nuevas aventuras hoy mismo.
                </p>
                <div className="flex justify-center lg:justify-start mt-6">
                    <Link 
                        to="/Store" 
                        className="btn btn-primary text-white h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold hover:scale-105 transition-transform"
                    >
                        Explorar Tienda
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Homehero;
