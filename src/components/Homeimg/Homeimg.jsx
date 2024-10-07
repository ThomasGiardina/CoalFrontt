import React, { useEffect, useState } from 'react';
import homeImage from '../../assets/Homepng.png'; 

const ImageComponent = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 200);
    }, []);

    return (
        <div className="relative transition-all duration-1000 ease-in-out flex justify-center items-center">
            <div className={`relative transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                <img
                    src={homeImage}
                    alt="Personaje"
                    className="h-[600px] w-[600px] object-contain brightness-[1.5] saturate-[1.2] transition-transform duration-300 ease-in-out"
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
