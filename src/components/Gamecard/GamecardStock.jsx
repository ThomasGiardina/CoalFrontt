const GameCardStock = ({ game }) => {
    return (
        <div className="bg-slate-500 rounded-lg overflow-hidden flex items-center p-4">
            <img
                className="w-40 h-40 rounded-lg object-contain"
                src={game.imageUrl} 
                alt={game.title}
            />
            <div className="flex-grow ml-4">
                <h2 className="text-xl font-semibold text-gray-800">{game.title}</h2>
                <h3 className="text-lg font-medium text-gray-300">${game.price}</h3>
            </div>
            <div className="flex flex-col space-y-2">
                <button className="text-white p-2">
                    <i className="fa-solid fa-pen text-white cursor-pointer"></i> 
                </button>
                <button className="text-white p-2">
                    <i className="fa-solid fa-trash text-red-500 cursor-pointer"></i> 
                </button>
            </div>
        </div>
    );
};

export default GameCardStock;
