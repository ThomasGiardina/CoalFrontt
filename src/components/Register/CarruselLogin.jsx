import { useState, useEffect } from 'react';

const CarruselLogin = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        '/src/assets/log1.jpg',  
        '/src/assets/log2.jpg', 
        '/src/assets/log3.jpg'  
    ];

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const goToPrev = () => {
        setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    useEffect(() => {
        const interval = setInterval(goToNext, 4000); 
    
        return () => clearInterval(interval); 
    }, []);

    return (
        <div className="relative w-[520px] h-[660px]"> 
            <div className="carousel rounded-box w-full h-full overflow-hidden">
                <div className="carousel-item w-full h-full">
                    <img
                        src={images[currentIndex]}
                        className="object-cover w-full h-full transition-transform duration-500 ease-in-out transform hover:scale-105" 
                    />
                </div>
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center space-x-2">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`h-2 w-2 rounded-full ${currentIndex === index ? 'bg-stone-950' : 'bg-gray-500'}`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default CarruselLogin;
