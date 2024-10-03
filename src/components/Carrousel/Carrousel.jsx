
import { useState, useEffect } from "react";
import provisional1 from "../../assets/provisional1.jpg";
import provisional2 from "../../assets/provisional2.jpg";
import provisional3 from "../../assets/provisional3.jpg";
import provisional4 from "../../assets/provisional4.jpg";

const slides = [
    {
        title: "Desata tu Potencial Gamer",
        subtitle: "Entra en un mundo de diversión y desafíos ilimitados",
        buttonText: "Jugar Ahora",
        image: provisional1,
    },
    {
        title: "Tu Próxima Aventura Te Espera",
        subtitle: "Sube de nivel y explora los mejores títulos de videojuegos",
        buttonText: "Explorar Juegos",
        image: provisional2,
    },
    {
        title: "¿Listo para un Nuevo Desafío?",
        subtitle: "Descubre juegos épicos y vive experiencias emocionantes",
        buttonText: "Comenzar Aventura",
        image: provisional3,
    },
    {
        title: "Únete a la Experiencia Definitiva en Videojuegos",
        subtitle: "Juega a tu manera con los títulos más emocionantes",
        buttonText: "Registrarse",
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
        }, 3000); 

    return () => clearInterval(interval); 
    }, [currentIndex]); 
    return (
        <div className="relative w-full max-w-7xl h-[400px] mx-auto my-10 rounded-lg overflow-hidden bg-gray-900 text-white">
        {slides.map((slide, index) => (
            <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            >
            <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center p-4">
                <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
                <p className="text-xl mb-6">{slide.subtitle}</p>
                <button className="px-6 py-2 bg-primary text-white rounded-full hover:bg-orange-600 transition-colors">
                {slide.buttonText}
                </button>
            </div>
            </div>
        ))}

        <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-orange-500 transition-colors"
            aria-label="Previous slide"
        >
            ❮
        </button>

        <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-orange-500 transition-colors"
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

export default Carrousel;
