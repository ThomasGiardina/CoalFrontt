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

    useEffect(() => {
        const interval = setInterval(goToNext, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full max-w-[380px] aspect-[3/4] rounded-xl overflow-hidden shadow-xl mx-auto">
            <div className="carousel w-full h-full">
                <div className="carousel-item w-full h-full">
                    <img
                        src={images[currentIndex]}
                        className="object-cover w-full h-full transition-transform duration-500 ease-in-out transform hover:scale-105"
                        alt="Game artwork"
                    />
                </div>
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center space-x-2">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`h-2 w-2 rounded-full transition-colors ${currentIndex === index ? 'bg-primary' : 'bg-gray-500'}`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default CarruselLogin;
