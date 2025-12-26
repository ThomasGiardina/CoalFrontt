import { FaGift } from "react-icons/fa";

const getGiftCardImage = (precio) => {
    const price = parseFloat(precio);
    if (price >= 100) return '/src/assets/Giftcard100.png';
    if (price >= 50) return '/src/assets/Giftcard50.png';
    return '/src/assets/Giftcard20.png';
};

const GiftCardStock = ({ giftCard }) => {
    return (
        <div className="bg-neutral text-white rounded-lg overflow-hidden flex p-4 shadow-lg w-full max-w-none">
            <div className="w-40 h-40 flex-shrink-0">
                <img
                    className="w-full h-full object-cover rounded-md"
                    src={getGiftCardImage(giftCard.precio)}
                    alt={giftCard.titulo}
                />
            </div>

            <div className="flex-grow ml-4 flex flex-col justify-between">
                <div className="flex-grow flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                        <div className="flex-grow">
                            <h2 className="text-2xl font-semibold">{giftCard.titulo}</h2>
                            <p className="text-lg font-bold text-orange-400">${giftCard.precio}</p>
                            <p className="text-sm text-gray-400">Stock: {giftCard.stock}</p>
                        </div>
                        <div className="mr-2">
                            <FaGift className="text-primary text-2xl" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GiftCardStock;
