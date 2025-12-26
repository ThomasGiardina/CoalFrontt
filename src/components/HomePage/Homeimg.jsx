import { useEffect, useState } from 'react';
import homeGif from '../../assets/homhero2.gif';

const ImageComponent = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsLoaded(true), 200);
    }, []);

    return (
        <div className="relative transition-all duration-1000 ease-in-out flex justify-center items-center w-full">
            <div className={`relative transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                <div className="absolute inset-0 bg-background opacity-30 pointer-events-none z-10"></div>
                <img src={homeGif} alt="Gaming Hero" className="w-[400px] sm:w-[500px] md:w-[650px] lg:w-[750px] object-contain" />
            </div>
        </div>
    );
};

export default ImageComponent;
