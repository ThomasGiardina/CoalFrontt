import { useState, useEffect } from "react";
import provisional1 from "../../assets/provisional1.jpg";
import provisional2 from "../../assets/provisional2.jpg";
import provisional3 from "../../assets/provisional3.jpg";
import provisional4 from "../../assets/provisional4.jpg";

const slides = [
    {
        title: "¡Aprovecha descuentos inimaginables!",
        subtitle: "Aprovecha un 15% de dto con efectivo y 10% con debito",
        image: provisional1,
    },
    {
        title: "Tu Próximo Desafío Te Espera",
        subtitle: "Conquista los mejores títulos y supera cada nivel",
        image: provisional2,
    },
    {
        title: "Desafía tus Límites",
        subtitle: "Lucha, explora y gana en los juegos más intensos",
        image: provisional3,
    },
    {
        title: "Disfruta la Mejor Colección de Videojuegos",
        subtitle: "Juega sin parar con una selección épica de títulos",
        image: provisional4,
    },
];

const Carrousel = () => {
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
        <div className="relative w-full h-[300px] sm:h-[380px] lg:h-[450px] rounded-2xl overflow-hidden mb-8">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center p-4 sm:p-6">
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">{slide.title}</h2>
                        <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-4">{slide.subtitle}</p>
                    </div>
                </div>
            ))}

            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-primary transition-colors text-2xl sm:text-3xl"
                aria-label="Previous slide"
            >
                ❮
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-primary transition-colors text-2xl sm:text-3xl"
                aria-label="Next slide"
            >
                ❯
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? "bg-primary w-6" : "bg-white/50"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carrousel;
