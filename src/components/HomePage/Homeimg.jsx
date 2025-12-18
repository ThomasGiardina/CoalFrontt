import { useEffect, useState } from 'react';
import homeImage from '../../assets/Homepng.png'; 

const ImageComponent = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 200);
    }, []);

    return (
        <div className="relative transition-all duration-1000 ease-in-out flex justify-center items-center w-full">
            <div className={`relative transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                <img
                    src={homeImage}
                    alt="Personaje"
                    className="h-[250px] w-[250px] sm:h-[350px] sm:w-[350px] md:h-[500px] md:w-[500px] lg:h-[700px] lg:w-[700px] xl:h-[800px] xl:w-[800px] object-contain brightness-[1.8] saturate-[1.2] transition-transform duration-300 ease-in-out"
                    style={{
                        filter: 'drop-shadow(0 -5px 50px rgba(255, 69, 0, 1)) drop-shadow(0 5px 10px rgba(255, 69, 0, 1))',
                        maskImage: 'linear-gradient(to bottom, black, transparent)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)' 
                    }}
                />
                <div className="absolute inset-0 pointer-events-none"></div>
            </div>
        </div>
    );
};

export default ImageComponent;
