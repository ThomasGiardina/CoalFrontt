import { Link } from "react-router-dom";

const ModalAgregarCarrito = ({ onAddToCarrito = () => console.log('Acción por defecto: agregar al carrito') }) => {
    return (
        <>
            <div className="join items-center">
                <div className="join-item w-[120px] h-[48px] border border-black" style={{ backgroundColor: "#314254" }}>
                    <p className="text-end text-lg mr-2 mt-3" style={{ color: "#85BB2F" }}>$12.49 USD</p>
                </div>
                <button 
                    className="btn join-item w-[200px] h-[46px] text-#85BB2F flex justify-center" 
                    style={{ backgroundColor: "#85BB2F", color: "#1B2838" }}
                    onClick={() => document.getElementById('my_modal_1').showModal()}
                >
                    Agregar al Carrito
                </button>
            </div>

            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Producto Agregado al Carrito!</h3>
                    <p className="py-4">Producto Agregado al Carrito con éxito, elija si seguir comprando o ir al carrito.</p>
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
