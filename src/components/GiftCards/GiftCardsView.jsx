import { Link } from 'react-router-dom';
import { FaGift, FaShoppingCart, FaCheck, FaArrowLeft } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { addCartItem } from '../../redux/slices/cartSlice';
import Swal from 'sweetalert2';
import Giftcard20 from '../../assets/Giftcard20.png';
import Giftcard50 from '../../assets/Giftcard50.png';
import Giftcard100 from '../../assets/Giftcard100.png';

const GiftCardRow = ({ card, isReversed, onAddToCart }) => {
    return (
        <div className={`card bg-neutral border border-base-200 hover:border-primary/40 transition-all duration-300 overflow-hidden`}>
            <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center`}>
                <div className="w-full lg:w-2/5 p-6 lg:p-8 flex items-center justify-center bg-gradient-to-br from-base-200/50 to-base-300/50">
                    <img
                        src={card.image}
                        alt={card.name}
                        className="w-48 sm:w-56 lg:w-64 h-auto object-contain hover:scale-105 transition-transform duration-300 drop-shadow-xl"
                    />
                </div>
                <div className="w-full lg:w-3/5 p-6 lg:p-8">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="badge badge-primary gap-1"><FaGift /> Tarjeta Digital</span>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">{card.name}</h3>
                    <p className="text-gray-400 mb-4">{card.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {card.features.map((feature, i) => (
                            <span key={i} className="badge badge-ghost gap-1">
                                <FaCheck className="text-green-500 text-xs" /> {feature}
                            </span>
                        ))}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <span className="text-3xl font-bold text-primary">${card.price}</span>
                        <button onClick={() => onAddToCart(card)} className="btn btn-primary text-white gap-2">
                            <FaShoppingCart /> Agregar al carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const GiftCardsView = () => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);

    const giftCards = [
        {
            id: 'gc-20',
            name: 'Tarjeta Coal $20',
            price: 20,
            description: 'Perfecta para probar un nuevo juego indie o complementar tu siguiente compra.',
            features: ['Entrega inmediata', 'Sin vencimiento', 'Válida para toda la tienda'],
            image: Giftcard20
        },
        {
            id: 'gc-50',
            name: 'Tarjeta Coal $50',
            price: 50,
            description: 'Ideal para juegos AAA en oferta o varios títulos indie de calidad.',
            features: ['Entrega inmediata', 'Sin vencimiento', 'Válida para toda la tienda'],
            image: Giftcard50
        },
        {
            id: 'gc-100',
            name: 'Tarjeta Coal $100',
            price: 100,
            description: 'El regalo perfecto para cualquier gamer. Máxima libertad de elección.',
            features: ['Entrega inmediata', 'Sin vencimiento', 'Regalo Premium'],
            image: Giftcard100
        },
    ];

    const handleAddToCart = (card) => {
        if (!isAuthenticated) {
            Swal.fire({
                title: 'Inicia sesión',
                text: 'Debes iniciar sesión para agregar tarjetas al carrito',
                icon: 'info',
                background: '#1D1F23',
                color: '#fff',
                confirmButtonColor: '#FF6B00',
            });
            return;
        }

        // Add gift card to cart (local state - backend doesn't support gift cards yet)
        dispatch(addCartItem({
            id: card.id,
            titulo: card.name,
            precio: card.price,
            foto: null,
            isGiftCard: true,
            cantidad: 1
        }));

        Swal.fire({
            title: '¡Agregado!',
            text: `${card.name} agregada al carrito`,
            icon: 'success',
            background: '#1D1F23',
            color: '#fff',
            toast: true,
            position: 'top-end',
            timer: 3000,
            showConfirmButton: false,
        });
    };

    return (
        <div className="min-h-screen bg-base-300">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-6">
                    <Link to="/Store" className="btn btn-ghost btn-sm gap-2">
                        <FaArrowLeft /> Volver a la tienda
                    </Link>
                </div>

                <div className="text-center mb-10">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <FaGift className="text-primary text-3xl" />
                        <h1 className="text-3xl sm:text-4xl font-bold text-white">Tarjetas de Regalo</h1>
                    </div>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        El regalo perfecto para gamers. Nuestras tarjetas Coal no vencen y pueden usarse en cualquier juego de nuestra tienda.
                    </p>
                </div>

                <div className="space-y-6 mb-12">
                    {giftCards.map((card, index) => (
                        <GiftCardRow
                            key={card.id}
                            card={card}
                            isReversed={index % 2 !== 0}
                            onAddToCart={handleAddToCart}
                        />
                    ))}
                </div>

                <div className="card bg-neutral border border-base-200 p-6 lg:p-8">
                    <h2 className="text-xl font-bold text-white mb-6 text-center">¿Cómo funcionan las tarjetas?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                <span className="text-primary font-bold text-xl">1</span>
                            </div>
                            <h3 className="text-white font-medium mb-2">Elegí el monto</h3>
                            <p className="text-gray-400 text-sm">Seleccioná la tarjeta con el valor que más te convenga</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                <span className="text-primary font-bold text-xl">2</span>
                            </div>
                            <h3 className="text-white font-medium mb-2">Recibí el código</h3>
                            <p className="text-gray-400 text-sm">Te enviamos el código al instante por email</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                <span className="text-primary font-bold text-xl">3</span>
                            </div>
                            <h3 className="text-white font-medium mb-2">¡Canjealo!</h3>
                            <p className="text-gray-400 text-sm">Usá el código en tu próxima compra en Coal</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GiftCardsView;
