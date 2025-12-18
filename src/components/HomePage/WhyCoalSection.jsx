import sponsor1Image from '../../assets/sponsor1.jpg';
import sponsor2Image from '../../assets/sponsor2.jpg';
import sponsor3Image from '../../assets/sponsor3.jpg';

const WhyCoalSection = () => {
    const features = [
        {
            title: "Variedad de Juegos",
            description: "Ofrecemos una amplia selección de juegos para todas las plataformas y gustos.",
        },
        {
            title: "Precios Competitivos",
            description: "Nuestros precios son los más competitivos del mercado, garantizando el mejor valor.",
        },
        {
            title: "Soporte 24/7",
            description: "Nuestro equipo de soporte está disponible las 24 horas del día, los 7 días de la semana.",
        },
        {
            title: "Entrega Rápida",
            description: "Garantizamos una entrega rápida y segura de todos nuestros productos.",
        },
    ];

    const sponsors = [
        { name: "Sponsor 1", logo: sponsor1Image },
        { name: "Sponsor 2", logo: sponsor2Image },
        { name: "Sponsor 3", logo: sponsor3Image },
    ];

    return (
        <div className="w-full py-12 sm:py-16 lg:py-20">
            {/* ¿Por qué Coal? Section */}
            <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">¿Por qué Coal?</h2>
                <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
                {features.map((feature, index) => (
                    <div key={index} className="group">
                        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 sm:p-8 rounded-xl text-center h-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">    
                            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">{feature.title}</h3>
                            <p className="text-white text-sm sm:text-base leading-relaxed">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Sponsors Section */}
            <div className="mt-12 sm:mt-16 text-center">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 sm:mb-12">Confían en nosotros</h3>
                <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto">
                    {sponsors.map((sponsor, index) => (
                        <div key={index} className="group">
                            <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 aspect-square flex items-center justify-center">
                                <img 
                                    src={sponsor.logo} 
                                    alt={sponsor.name} 
                                    className="w-full h-full object-contain rounded-lg transition-transform transform group-hover:scale-110" 
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhyCoalSection;