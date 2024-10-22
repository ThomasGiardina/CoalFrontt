import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Link, useNavigate } from "react-router-dom";
import { useContext } from 'react'; 
import { AuthContext } from '../../context/AuthContext'; 
import "../../index.css"

const ModalAgregarCarrito = ({ gameDetails, onAddToCarrito = () => console.log('Acción por defecto: agregar al carrito') }) => {
    const { isAuthenticated } = useContext(AuthContext); 
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal); 

    const isOutOfStock = gameDetails.stock <= 0;

    const handleButtonClick = () => {
        if (isAuthenticated && !isOutOfStock) {
            document.getElementById('my_modal_1').showModal(); 
        } else {
            MySwal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'Para agregar un juego al carrito primero debes iniciar sesión en la página',
                showConfirmButton: false,
                timer: 4000,
                background: '#1D1F23', 
                customClass: {
                    popup: 'custom-toast', 
                    title: 'text-white' 
                }
            });
            navigate('/Login'); 
        }
    };

    return (
        <>
            <div className="join items-center w-[300px]">
                <div className="join-item w-[120px] h-[48px] flex justify-center items-center rounded-l-lg bg-neutral">
                    <p className="text-[16px] text-success">${gameDetails.precio} ARS</p>
                </div>
                <button 
                    className={`join-item w-[180px] h-[48px] flex justify-center items-center rounded-r-lg 
                        ${isOutOfStock 
                            ? 'bg-red-500 text-neutral cursor-not-allowed'  
                            : 'bg-success text-neutral hover:bg-success/80 border border-black'}`}             
                    onClick={handleButtonClick}
                    disabled={isOutOfStock}
                >
                    {isOutOfStock ? 'No hay Stock' : 'Agregar al Carrito'}
                </button>
            </div>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Producto Agregado al Carrito!</h3>
                    <p className="py-4">Producto agregado al carrito con éxito. Elija si desea seguir comprando o ir al carrito.</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button 
                                className="btn mr-5" 
                                onClick={() => {
                                    console.log('Continuar comprando presionado');
                                    onAddToCarrito();
                                }}
                            >
                                Seguir Comprando
                            </button>
                            <button
                                className="btn mr-5" 
                                onClick={() => {
                                    console.log('Ir al carrito presionado');
                                    onAddToCarrito();
                                }}
                            >
                                <Link to="/Cart" className="btn">Ir al carrito</Link>
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default ModalAgregarCarrito;
