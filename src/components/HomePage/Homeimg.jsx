import { useEffect, useState } from 'react';
import homeGif from '../../assets/homhero2.gif';

const ImageComponent = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsLoaded(true), 200);
    }, []);

    return (
        <div className="relative transition-all duration-1000 ease-in-out flex justify-center items-center w-full">
            {/* Fondo azul oscuro */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] lg:w-[520px] lg:h-[520px] rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(15, 30, 70, 0.6) 0%, rgba(10, 20, 50, 0.3) 50%, transparent 80%)' }}></div>
            </div>
            
            <div className={`relative transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                <img src={homeGif} alt="Gaming Hero" className="w-[280px] sm:w-[380px] md:w-[480px] lg:w-[580px] object-contain" style={{ filter: 'drop-shadow(0 0 40px rgba(255, 107, 0, 0.2)) drop-shadow(0 10px 30px rgba(0, 0, 0, 0.4))', maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }} />
            </div>
        </div>
    );
};

export default ImageComponent;
