import GameCardStock from "../Gamecard/GamecardStock";
import Pagination from "../Pagination/Pagination";

const StockContainer = () => {

    

    return (
        <div className="mt-20 min-h-screen w-[1700px]" >
            <div className="flex justify-between items-center">
                <p className="font-bold text-4xl">Stock de Juegos</p>
                <div className="flex space-x-4">
                <input
                    type="text"
                    placeholder="Buscar juegos..."
                    className="px-4 py-2 border border-gray-300 rounded-lg "
                />
                <button className="btn bg-slate-500 text-white px-4 py-2 rounded-lg">
                    Agregar un Nuevo Juego
                </button>
                </div>
            </div>
            <div className="grid mt-6 gap-5">
                <GameCardStock />
                <GameCardStock />
                <GameCardStock />
                <GameCardStock />
            </div>
            <Pagination />
            
        </div>
    );
};

export default StockContainer;
