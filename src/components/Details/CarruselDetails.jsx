import { useState, useEffect } from "react";

const CarrouselDetails = ({ containerHeight, carruselImagen1, carruselImagen2, carruselImagen3 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slides = [
        { image: carruselImagen1 ? `data:image/jpeg;base64,${carruselImagen1}` : "" }, 
        { image: carruselImagen2 ? `data:image/jpeg;base64,${carruselImagen2}` : "" }, 
        { image: carruselImagen3 ? `data:image/jpeg;base64,${carruselImagen3}` : "" }
    ];

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 6000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <div
            className="relative w-full mx-auto overflow-hidden bg-gray-900 text-white rounded-lg shadow-lg"
            style={{ height: containerHeight }} 
        >
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === currentIndex ? "opacity-100" : "opacity-0"
                    }`}
                >
                    {slide.image ? (
                        <img
                            src={slide.image}
                            alt={`Slide ${index}`}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 w-full h-full bg-gray-700 flex items-center justify-center">
                            <span>Imagen no disponible</span>
                        </div>
                    )}
                </div>
            ))}

            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-orange-500 transition-colors text-5xl"
                aria-label="Previous slide"
            >
                ❮
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-orange-500 transition-colors text-5xl"
                aria-label="Next slide"
            >
                ❯
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentIndex ? "bg-white" : "bg-gray-400"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default CarrouselDetails;
