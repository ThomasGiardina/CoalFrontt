import { BsNintendoSwitch, BsPcDisplay } from "react-icons/bs";
import { FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useDispatch } from 'react-redux';
import { deleteItemFromCarrito, updateCartItemAsync, removeCartItem, updateCartItem } from '../../redux/slices/cartSlice';
import tarjeta20 from '../../assets/tarjeta20.png';
import tarjeta50 from '../../assets/tarjeta50.png';
import tarjeta100 from '../../assets/tarjeta100.png';

const GamecardCart = ({ item, onUpdateQuantity }) => {
    const dispatch = useDispatch();
    const { id, titulo, precio, cantidad, foto, plataforma, stock, isGiftCard } = item || {};

    const getGiftCardImage = () => {
        const title = titulo?.toLowerCase() || '';
        const isGift = isGiftCard || item.giftCard || item.gift_card || title.includes('tarjeta') || title.includes('coal');

        if (!isGift) return null;

        const priceNum = Number(precio);
        if (Math.abs(priceNum - 20) < 0.01) return tarjeta20;
        if (Math.abs(priceNum - 50) < 0.01) return tarjeta50;
        if (Math.abs(priceNum - 100) < 0.01) return tarjeta100;

        return null;
    };

    const giftCardImage = getGiftCardImage();
    const fotoUrl = giftCardImage
        ? giftCardImage
        : foto
            ? `data:image/jpeg;base64,${foto}`
            : '/ruta/a/imagen_por_defecto.png';

    const aumentarCantidad = () => {
        const nuevaCantidad = cantidad + 1;
        if (!isGiftCard) {
            if (nuevaCantidad <= stock) {
                dispatch(updateCartItemAsync({ id, cantidad: nuevaCantidad }));
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Cantidad máxima alcanzada',
                    text: `Solo hay ${stock} unidades disponibles.`,
                    background: '#1D1F23',
                    color: '#fff',
                    confirmButtonColor: '#FF6828',
                });
            }
        } else {
            dispatch(updateCartItem({ id, cantidad: nuevaCantidad }));
        }
    };

    const disminuirCantidad = () => {
        if (cantidad > 1) {
            const nuevaCantidad = cantidad - 1;
            if (!isGiftCard) {
                dispatch(updateCartItemAsync({ id, cantidad: nuevaCantidad }));
            } else {
                dispatch(updateCartItem({ id, cantidad: nuevaCantidad }));
            }
        }
    };

    const eliminarProducto = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Se eliminará el producto del carrito.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#FF6828',
            cancelButtonColor: '#374151',
            background: '#1D1F23',
            color: '#fff',
            confirmButtonText: 'Sí, eliminarlo',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                if (!isGiftCard) {
                    dispatch(deleteItemFromCarrito(id));
                } else {
                    dispatch(removeCartItem(id));
                }
            }
        });
    };

    const getPlatformIcon = (platform) => {
        const p = platform?.toUpperCase().replace(/[\s_-]/g, '');
        if (p === 'XBOX') return <i className="fab fa-xbox text-green-500 text-xl"></i>;
        if (p === 'PLAYSTATION' || p === 'PLAYSTATION5' || p === 'PS5' || p === 'PS4') return <i className="fab fa-playstation text-blue-500 text-xl"></i>;
        if (p === 'NINTENDOSWITCH' || p === 'SWITCH') return <BsNintendoSwitch className="text-red-500 text-xl" />;
        if (p === 'PC' || p === 'STEAM') return <BsPcDisplay className="text-gray-400 text-xl" />;
        return null;
    };

    return (
        <div className="bg-neutral text-white rounded-xl overflow-hidden border border-base-200 shadow-lg transition-all duration-300 hover:border-primary/30 hover:shadow-primary/10">
            <div className="flex flex-col sm:flex-row sm:h-[140px]">
                <div className="w-full sm:w-36 h-40 sm:h-full flex-shrink-0">
                    <img
                        className="w-full h-full object-cover"
                        src={fotoUrl}
                        alt={titulo || "Producto sin título"}
                    />
                </div>

                <div className="flex-1 p-4 flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold text-white line-clamp-1">{titulo || "Producto desconocido"}</h2>
                            <div className="flex items-center gap-2 mt-1">
                                {getPlatformIcon(plataforma)}
                                <span className="text-gray-400 text-sm">{plataforma?.replace('_', ' ')}</span>
                            </div>
                        </div>
                        <button
                            className="p-2 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-500 transition-all"
                            onClick={eliminarProducto}
                            title="Eliminar del carrito"
                        >
                            <FaTimes size={16} />
                        </button>
                    </div>

                    <div className="flex items-end justify-between mt-4">
                        <p className="text-2xl font-bold text-primary">${precio?.toFixed(2) || "0.00"}</p>

                        <div className="flex items-center gap-1 bg-base-200 rounded-lg p-1">
                            <button
                                className="w-8 h-8 flex items-center justify-center rounded-md bg-base-300 hover:bg-primary hover:text-white text-gray-300 font-bold transition-all"
                                onClick={disminuirCantidad}
                            >
                                −
                            </button>
                            <span className="w-10 text-center font-semibold text-white">{cantidad || 1}</span>
                            <button
                                className="w-8 h-8 flex items-center justify-center rounded-md bg-base-300 hover:bg-primary hover:text-white text-gray-300 font-bold transition-all"
                                onClick={aumentarCantidad}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GamecardCart;
