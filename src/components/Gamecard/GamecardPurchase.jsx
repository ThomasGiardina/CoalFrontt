import { BsNintendoSwitch, BsPcDisplay } from "react-icons/bs";
import tarjeta20 from '../../assets/tarjeta20.png';
import tarjeta50 from '../../assets/tarjeta50.png';
import tarjeta100 from '../../assets/tarjeta100.png';

const GamecardPurchase = ({ game }) => {
    const getPlatformIcon = (platform) => {
        if (!platform) return null;
        switch (String(platform).toUpperCase()) {  
            case 'XBOX':
                return <i className="fab fa-xbox text-green-500 text-2xl"></i>;
            case 'PLAY_STATION':
                return <i className="fab fa-playstation text-blue-500 text-2xl"></i>;
            case 'NINTENDO_SWITCH':
                return <div className='text-red-700 text-2xl p-1'><BsNintendoSwitch /></div>;
            case 'PC':
                return <div className='text-gray-500 text-2xl p-1'><BsPcDisplay /></div>;
            default:
                return null;
        }
    };

    const platforms = game && game.plataforma !== undefined
        ? (Array.isArray(game.plataforma) ? game.plataforma : [game.plataforma])
        : [];

    const formatPrice = (price) => {
        return price.toLocaleString('es-AR', {
            style: 'currency',
            currency: 'ARS',
        });
    };

    const getGiftCardImage = () => {
        const title = game?.titulo?.toLowerCase() || '';
        const isGift = game?.isGiftCard || game?.giftCard || game?.gift_card || title.includes('tarjeta') || title.includes('coal');
        
        if (!isGift) return null;
        
        const priceNum = Number(game?.precio);
        if (Math.abs(priceNum - 20) < 0.01) return tarjeta20;
        if (Math.abs(priceNum - 50) < 0.01) return tarjeta50;
        if (Math.abs(priceNum - 100) < 0.01) return tarjeta100;
        
        return null;
    };

    const giftCardImage = getGiftCardImage();
    const fotoUrl = giftCardImage
        ? giftCardImage
        : game && game.foto 
        ? `data:image/jpeg;base64,${game.foto}` 
        : '/ruta/a/imagen_por_defecto.png';

    return (
        <div className="bg-neutral p-4 rounded-lg flex justify-between items-center mb-4">
            <div className="flex items-center">
                <img 
                    src={fotoUrl}  
                    alt={game.titulo} 
                    className="w-20 h-20 object-cover rounded-lg mr-4"
                />
                <div>
                    <h3 className="text-xl font-semibold text-white">{game?.titulo || 'Item'}</h3>
                    <div className="flex items-center space-x-2 mt-2">
                        {platforms.map((plataforma, index) => (
                            <span key={index}>{getPlatformIcon(plataforma)}</span>
                        ))}
                    </div>
                </div>
            </div>
            <div className="text-right"> 
                <p className="text-xl font-semibold text-white">{formatPrice(game?.precio || 0)} ARS</p>
                <p className="text-gray-400">Cantidad: {game?.cantidad || 1}</p>
            </div>
        </div>
    );
};

export default GamecardPurchase;
