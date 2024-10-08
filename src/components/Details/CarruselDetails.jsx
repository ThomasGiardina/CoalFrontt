import { useState } from "react";

const CarruselDetails = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp",
        "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp",
        "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
        "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
    ];

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    return (

        

        <>
            <div className="carousel w-[40%] h-[620px]">
                <div className="carousel-item relative w-full">
                    <img src={slides[currentSlide]} className="w-full" alt="Slide" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <button onClick={handlePrev} className="btn btn-circle">❮</button>
                        <button onClick={handleNext} className="btn btn-circle">❯</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CarruselDetails;