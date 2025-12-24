import { Link } from 'react-router-dom';
import { FaGift, FaShoppingCart, FaCheck } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { addItemToCarrito, fetchCarrito } from '../../redux/slices/cartSlice';
import { useEffect, useState, useCallback } from 'react';
import Swal from 'sweetalert2';
import Giftcard20 from '../../assets/tarjeta20.png';
import Giftcard50 from '../../assets/tarjeta50.png';
import Giftcard100 from '../../assets/tarjeta100.png';
import BackgroundImage from '../../assets/fondito.jpg';

const GiftCardRow = ({ card, isReversed, onAddToCart }) => {
    if (card.price === 20 || card.price === 50 || card.price === 100) {
        const isReversedLayout = card.price === 50;

        return (
            <div className="card bg-neutral border border-base-200 hover:border-primary/40 transition-all duration-300 overflow-hidden relative">
                <div className="absolute inset-0">
                    <img
                        src={BackgroundImage}
                        alt="Background"
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-black/75"></div>
                    <div className={`absolute inset-0 ${isReversedLayout ? 'bg-gradient-to-l from-black/70 via-black/50 to-transparent' : 'bg-gradient-to-r from-black/70 via-black/50 to-transparent'}`}></div>
                </div>

                <div className={`relative flex flex-col ${isReversedLayout ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center`}>
                    <div className="w-full lg:w-2/5 p-6 lg:p-8 flex items-center justify-center">
                        <img
                            src={card.image}
                            alt={card.name}
                            className="w-56 sm:w-64 lg:w-72 h-auto object-contain hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
                        />
                    </div>
                    <div className={`w-full lg:w-3/5 p-6 lg:p-8 z-10 ${isReversedLayout ? 'lg:text-left lg:pl-20' : 'lg:text-right lg:pr-20'}`}>
                        <div className={`flex items-center gap-2 mb-2 ${isReversedLayout ? 'lg:justify-start' : 'lg:justify-end'}`}>
                            <span className="badge bg-orange-500 border-orange-500 text-white gap-1"><FaGift /> Tarjeta Digital</span>
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">{card.name}</h3>
                        <p className="text-gray-200 mb-4">{card.description}</p>
                        <div className={`flex flex-wrap gap-2 mb-4 ${isReversedLayout ? 'lg:justify-start' : 'lg:justify-end'}`}>
                            {card.features.map((feature, i) => (
                                <span key={i} className="badge badge-ghost bg-white/10 text-white gap-1">
                                    <FaCheck className="text-orange-500 text-xs" /> {feature}
                                </span>
                            ))}
                        </div>
                        <div className={`flex items-center mt-6 ${isReversedLayout ? 'lg:justify-start' : 'lg:justify-end'}`}>
                            <button onClick={() => onAddToCart(card)} className="btn bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-none gap-2">
                                <FaShoppingCart /> Agregar al carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

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
    const { isAuthenticated, token } = useSelector((state) => state.auth);
    const carritoId = useSelector((state) => state.cart.carritoId);
    const [giftCardProducts, setGiftCardProducts] = useState([]);

    const loadGiftCards = useCallback(async () => {
        try {
            const resp = await fetch('http://localhost:4002/videojuegos', {
                headers: token ? { Authorization: `Bearer ${token}` } : undefined,
            });
            if (resp.ok) {
                const data = await resp.json();
                const list = Array.isArray(data)
                    ? data.filter(v =>
                        v.giftCard === true ||
                        v.gift_card === true ||
                        ((v.titulo || '').toLowerCase().includes('tarjeta coal'))
                    )
                    : [];
                setGiftCardProducts(list);
                return list;
            }
        } catch (e) {
            // silencioso
        }
        return [];
    }, [token]);

    useEffect(() => {
        loadGiftCards();
    }, [loadGiftCards]);

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

    const handleAddToCart = async (card) => {
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

        // Asegurar tener carritoId
        let cid = carritoId;
        if (!cid) {
            const res = await dispatch(fetchCarrito());
            const payload = res.payload;
            cid = payload?.id || cid;
        }

        // Resolver videojuegoId de la gift card (por precio aproximado o título). Si no hay lista, la refrescamos y reintentamos.
        const findGiftCard = (list) => {
            const target = Number(card.price);
            return list.find(p => Math.abs(Number(p.precio) - target) < 0.001)
                || list.find(p => (p.titulo || '').toLowerCase().includes(String(card.price)))
                || list.find(p => p.giftCard === true || p.gift_card === true);
        };

        let videojuego = findGiftCard(giftCardProducts);

        if (!videojuego) {
            const refreshed = await loadGiftCards();
            videojuego = findGiftCard(refreshed);
        }

        if (!videojuego) {
            Swal.fire({
                title: 'Ups',
                text: 'No pudimos encontrar la tarjeta en el catálogo. Verificá que existan las gift cards en el backend y que tengan el precio correcto.',
                icon: 'warning',
                background: '#1D1F23',
                color: '#fff'
            });
            return;
        }

        await dispatch(addItemToCarrito({ carritoId: cid, videojuegoId: videojuego.id, cantidad: 1 }));
        // Refrescar el carrito desde el backend
        await dispatch(fetchCarrito());

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
