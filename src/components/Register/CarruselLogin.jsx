import { useState, useEffect } from 'react';


const CarruselLogin = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        'https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp',
        'https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp',
        'https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp',
        'https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp',
        'https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp',
        'https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp',
        'https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp',
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
        <div className="relative w-[500px] h-[660px]">
        <div className="carousel rounded-box h-full">
            <div className="carousel-item h-full">
            <img src={images[currentIndex]} className="object-cover w-full h-full" />
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