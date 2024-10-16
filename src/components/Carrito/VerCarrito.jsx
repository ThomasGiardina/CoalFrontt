import GamecardCart from "../Gamecard/GamecardCart";

const VerCarrito = ({ onContinue }) => {
    return (
        <div className="flex justify-between h-screen">
        <div className="w-[800px]">
            <GamecardCart />
        </div>
        <div className="bg-neutral w-[500px] h-[300px] p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold text-white mb-4 text-center">Confirmar Compra</h1>

            <div className="flex flex-col space-y-3 text-white">
            <div className="flex justify-between">
                <h2 className="text-xl font-medium">Total Estimado:</h2>
                <p className="text-xl">$12.99</p>
            </div>
            <div className="flex justify-between">
                <h2 className="text-xl font-medium">Cantidad de Productos:</h2>
                <p className="text-xl">3</p>
            </div>
            </div>

            <div className="mt-8 flex justify-center">
            <button
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 w-full rounded-md shadow-lg transition duration-200"
                onClick={onContinue} 
            >
                Continuar al Pago
            </button>
            </div>
        </div>
        </div>
    );
    };

export default VerCarrito;
