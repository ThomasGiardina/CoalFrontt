import { useEffect, useState } from 'react';
import homeGif from '../../assets/homhero2.gif';

const ImageComponent = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsLoaded(true), 200);
    }, []);

    return (
        <div className="relative transition-all duration-1000 ease-in-out flex justify-center items-center w-full">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] lg:w-[380px] lg:h-[380px] rounded-full blur-[80px]" style={{ background: 'radial-gradient(circle, rgba(255,107,0,0.3) 0%, rgba(255,107,0,0.1) 50%, transparent 70%)' }}></div>
            </div>
            <div className={`relative transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                <img src={homeGif} alt="Gaming Hero" className="w-[220px] sm:w-[300px] md:w-[380px] lg:w-[450px] object-contain" style={{ filter: 'drop-shadow(0 0 40px rgba(255, 107, 0, 0.2)) drop-shadow(0 10px 30px rgba(0, 0, 0, 0.4))', maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }} />
            </div>
        </div>
    );
};

export default ImageComponent;
