import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import BackgroundImage from '../../assets/unnamed.jpg';
import BackgroundImageMobile from '../../assets/fondotarjetascelu.jpg';

const GiftCardsSection = () => {
    return (
        <div className="mb-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a2840] via-[#233047] to-[#1e2a3d] border border-[#2a3f5f] shadow-2xl group min-h-[280px] sm:min-h-[320px]">
                <div className="absolute inset-0">
                    <img 
                        src={BackgroundImageMobile} 
                        alt="Background" 
                        className="w-full h-full object-cover object-center sm:hidden opacity-50"
                    />
                    <img 
                        src={BackgroundImage} 
                        alt="Background" 
                        className="w-full h-full object-cover object-center hidden sm:block"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70 sm:bg-gradient-to-r sm:from-[#1a2840]/60 sm:via-transparent sm:to-[#1e2a3d]/50"></div>
                </div>
                
                <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 group-hover:opacity-30 transition-opacity duration-700" 
                    style={{ background: 'radial-gradient(circle, rgba(255,107,0,0.4) 0%, rgba(255,50,50,0.3) 40%, transparent 70%)' }}>
                </div>
                
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px] opacity-10" 
                    style={{ background: 'radial-gradient(circle, rgba(255,107,0,0.3) 0%, transparent 70%)' }}>
                </div>
                
                <div className="relative flex flex-col lg:flex-row items-center justify-between p-8 lg:p-12 gap-8">
                    <div className="flex-1 text-center lg:text-left z-10 space-y-4">
                        <div className="inline-block">
                            <p className="text-orange-400 text-xs lg:text-sm font-semibold tracking-wider uppercase mb-2 opacity-90">
                                ¿No sabés qué regalar?
                            </p>
                            <div className="h-[2px] w-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                        </div>
                        
                        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                            Tarjetas regalo
                            <span className="block bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                                de Coal
                            </span>
                        </h2>
                        
                        <p className="text-gray-300 text-sm lg:text-base max-w-md opacity-80">
                            El regalo perfecto para los gamers. Disponibles en diferentes montos.
                        </p>
                        
                        <Link 
                            to="/GiftCards" 
                            className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-orange-500/30 transition-all duration-300 transform hover:scale-105 group/btn mt-2"
                        >
                            Ver Tarjetas 
                            <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GiftCardsSection;
