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
        <div className="w-full flex flex-col items-center p-6 rounded-lg mt-20 border border-gray-300">
            <h2 className="text-3xl font-bold text-black mb-6">¿Por qué Coal?</h2>
            <div className="w-full flex flex-wrap justify-center">
                {features.map((feature, index) => (
                    <div key={index} className="w-full md:w-1/2 lg:w-1/4 p-4">
                        <div className="bg-orange-500 p-6 rounded-lg text-center">    
                            <h3 className="text-xl font-bold text-black mb-2">{feature.title}</h3>
                            <p className="text-black">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-full mt-10 text-center">
                <h3 className="text-2xl font-bold text-black mb-4">Confían en nosotros</h3>
                <div className="w-full flex justify-center mb-20">
                    {sponsors.map((sponsor, index) => (
                        <div key={index} className="console-box w-40 h-40 mx-12">
                            <img src={sponsor.logo} alt={sponsor.name} className="w-full h-full object-cover rounded-lg transition-transform transform hover:scale-110" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhyCoalSection;