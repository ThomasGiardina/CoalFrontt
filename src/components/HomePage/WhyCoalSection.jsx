import { FaShieldAlt, FaTruck, FaHeadset, FaPercentage } from 'react-icons/fa';
import sponsor1Image from '../../assets/sponsor1.jpg';
import sponsor2Image from '../../assets/sponsor2.jpg';
import sponsor3Image from '../../assets/sponsor3.jpg';

const WhyCoalSection = () => {
    const features = [
        { icon: FaShieldAlt, title: "100% Seguro", description: "Transacciones protegidas y códigos verificados" },
        { icon: FaTruck, title: "Entrega Inmediata", description: "Recibí tu código al instante por email" },
        { icon: FaHeadset, title: "Soporte 24/7", description: "Atención personalizada todos los días" },
        { icon: FaPercentage, title: "Mejores Precios", description: "Ofertas exclusivas y descuentos permanentes" },
    ];

    const sponsors = [
        { name: "Sponsor 1", logo: sponsor1Image },
        { name: "Sponsor 2", logo: sponsor2Image },
        { name: "Sponsor 3", logo: sponsor3Image },
    ];

    return (
        <section className="py-16 sm:py-20">
            <div className="text-center mb-10">
                <span className="text-primary text-sm font-semibold tracking-wider uppercase">Beneficios</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">¿Por qué Coal?</h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
                {features.map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                        <div key={index} className="bg-neutral border border-base-200 rounded-2xl p-5 sm:p-6 text-center hover:border-primary/40 transition-all duration-300 group">
                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                                <IconComponent className="text-2xl text-primary" />
                            </div>
                            <h3 className="text-white font-bold mb-2">{feature.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                        </div>
                    );
                })}
            </div>

            <div className="text-center">
                <p className="text-gray-500 text-sm uppercase tracking-wider mb-6">Marcas que confían en nosotros</p>
                <div className="flex justify-center items-center gap-8 sm:gap-12 flex-wrap">
                    {sponsors.map((sponsor, index) => (
                        <div key={index} className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-neutral border border-base-200 overflow-hidden grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:border-primary/40 transition-all duration-300">
                            <img src={sponsor.logo} alt={sponsor.name} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyCoalSection;