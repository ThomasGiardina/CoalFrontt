import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import GiftcardsImage from '../../assets/Giftcards.png';

const GiftCardsSection = () => {
    return (
        <div className="mb-8">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1a2332] via-[#1e2a3d] to-[#1a2332] border border-base-200">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute left-0 top-0 w-1/2 h-full">
                        <div className="w-full h-full bg-[url('/game-bg.jpg')] bg-cover bg-center opacity-20 blur-sm"></div>
                    </div>
                </div>
                <div className="relative flex flex-col lg:flex-row items-center justify-between p-6 lg:p-8 gap-6">
                    <div className="flex-1 text-center lg:text-left z-10">
                        <p className="text-gray-400 text-sm mb-1">¿No sabés qué regalar?</p>
                        <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4">Tarjetas regalo de Coal</h2>
                        <Link to="/GiftCards" className="btn btn-primary text-white gap-2">
                            Ver Tarjetas <FaArrowRight />
                        </Link>
                    </div>
                    <div className="flex items-center justify-center z-10">
                        <img
                            src={GiftcardsImage}
                            alt="Tarjetas de Regalo Coal"
                            className="w-[250px] sm:w-[300px] lg:w-[380px] h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GiftCardsSection;
