import { useState, useEffect } from "react";
import provisional1 from "../../assets/provisional1.jpg";
import provisional2 from "../../assets/provisional2.jpg";
import provisional3 from "../../assets/provisional3.jpg";
import provisional4 from "../../assets/provisional4.jpg";

const slides = [
    {
        image: provisional1,
    },
    {
        image: provisional2,
    },
    {
        image: provisional3,
    },
    {
        image: provisional4,
    },
];

const CarrouselDetails = ({ containerHeight }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

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
                    <img
                        src={slide.image}
                        alt={`Slide ${index}`}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
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
