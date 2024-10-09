import React, { useState } from 'react';

const Admin = () => {
    const [games, setGames] = useState([]);
    const [newGame, setNewGame] = useState({
        titulo: '',
        descripcion: '',
        precio: '',
        plataforma: 'PC',
        categoria: 'ACCION',
        stock: '',
        fotoUrl: ''
    });
    const [showHistory, setShowHistory] = useState(false);
    const [purchaseHistory, setPurchaseHistory] = useState([]);

    const addGame = () => {
        setGames([...games, { ...newGame, id: Date.now(), purchases: 0 }]);
        setNewGame({
            titulo: '',
            descripcion: '',
            precio: '',
            plataforma: 'PC',
            categoria: 'ACCION',
            stock: '',
            fotoUrl: ''
        });
    };

    const updateGame = (index, updatedGame) => {
        const updatedGames = games.map((game, i) => (i === index ? updatedGame : game));
        setGames(updatedGames);
    };

    const deleteGame = (index) => {
        setGames(games.filter((_, i) => i !== index));
    };

    const handleGameChange = (e) => {
        const { name, value } = e.target;
        setNewGame({ ...newGame, [name]: value });
    };

    const totalPurchases = games.reduce((acc, game) => acc + game.purchases, 0);
    const totalRevenue = games.reduce((acc, game) => acc + game.purchases * game.precio, 0);
    const sortedGamesBySales = [...games].sort((a, b) => b.purchases - a.purchases);

    return (
        <div className="p-8 bg-gray-900 text-white min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
            <div className="mb-6">
                <input
                    type="text"
                    name="titulo"
                    value={newGame.titulo}
                    onChange={handleGameChange}
                    placeholder="Título"
                    className="input input-bordered w-full mb-2 bg-gray-700 text-white"
                />
                <input
                    type="text"
                    name="descripcion"
                    value={newGame.descripcion}
                    onChange={handleGameChange}
                    placeholder="Descripción"
                    className="input input-bordered w-full mb-2 bg-gray-700 text-white"
                />
                <input
                    type="number"
                    name="precio"
                    value={newGame.precio}
                    onChange={handleGameChange}
                    placeholder="Precio"
                    className="input input-bordered w-full mb-2 bg-gray-700 text-white"
                />
                <select
                    name="plataforma"
                    value={newGame.plataforma}
                    onChange={handleGameChange}
                    className="select select-bordered w-full mb-2 bg-gray-700 text-white"
                >
                    <option value="PC">PC</option>
                    <option value="XBOX">XBOX</option>
                    <option value="NINTENDO_SWITCH">Nintendo Switch</option>
                    <option value="PLAY_STATION">Play Station</option>
                </select>
                <select
                    name="categoria"
                    value={newGame.categoria}
                    onChange={handleGameChange}
                    className="select select-bordered w-full mb-2 bg-gray-700 text-white"
                >
                    <option value="ACCION">Acción</option>
                    <option value="AVENTURA">Aventura</option>
                    <option value="RPG">RPG</option>
                    <option value="SIMULACION">Simulación</option>
                    <option value="DEPORTES">Deportes</option>
                    <option value="ESTRATEGIA">Estrategia</option>
                    <option value="PUZZLE">Puzzle</option>
                    <option value="TERROR">Terror</option>
                    <option value="VR">VR</option>
                    <option value="EDUCATIVO">Educativo</option>
                </select>
                <input
                    type="number"
                    name="stock"
                    value={newGame.stock}
                    onChange={handleGameChange}
                    placeholder="Stock"
                    className="input input-bordered w-full mb-2 bg-gray-700 text-white"
                />
                <input
                    type="text"
                    name="fotoUrl"
                    value={newGame.fotoUrl}
                    onChange={handleGameChange}
                    placeholder="URL de la Foto"
                    className="input input-bordered w-full mb-2 bg-gray-700 text-white"
                />
                <button onClick={addGame} className="btn btn-success">Agregar Videojuego</button>
            </div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Lista de Videojuegos</h2>
                <div className="grid grid-cols-4 gap-4 mb-2 p-4 bg-gray-800 rounded-lg">
                    <p className="text-lg font-medium">Título</p>
                    <p className="text-lg font-medium">Descripción</p>
                    <p className="text-lg font-medium">Precio</p>
                    <p className="text-lg font-medium">Stock</p>
                </div>
                {games.map((game, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4 mb-4 p-4 bg-gray-800 rounded-lg">
                        <p className="text-lg font-medium">{game.titulo}</p>
                        <p className="text-lg">{game.descripcion}</p>
                        <p className="text-lg">${game.precio}</p>
                        <div className="flex items-center">
                            <input
                                type="number"
                                value={game.stock}
                                onChange={(e) => updateGame(index, { ...game, stock: parseInt(e.target.value) })}
                                className="input input-bordered w-20 mx-2 bg-gray-700 text-white"
                            />
                            <button onClick={() => deleteGame(index)} className="btn btn-error mx-2">Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Estadísticas</h2>
                <div className="mb-4 p-4 bg-gray-800 rounded-lg flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-bold mb-2">Total de Compras</h3>
                        <p>{totalPurchases}</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">Ingresos Generados</h3>
                        <p>${totalRevenue.toFixed(2)}</p>
                    </div>
                    <button onClick={() => setShowHistory(true)} className="btn btn-wide bg-orange-500 hover:bg-orange-600 text-white">Ver Historial de Compras</button>
                </div>
                <div className="mb-4 p-4 bg-gray-800 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">Juegos Vendidos</h3>
                    <ul>
                        {sortedGamesBySales.map((game, index) => (
                            <li key={index} className="mb-1">{game.titulo}: {game.purchases} vendidos</li>
                        ))}
                    </ul>
                </div>
            </div>
            {showHistory && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                    <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-3/4 max-w-3xl">
                        <h2 className="text-2xl font-bold mb-4">Historial de Compras</h2>
                        <button onClick={() => setShowHistory(false)} className="btn btn-error mb-4">Cerrar</button>
                        <ul>
                            {purchaseHistory.map((purchase, index) => (
                                <li key={index} className="mb-2">
                                    <p>Juego: {purchase.gameTitle}</p>
                                    <p>Fecha: {purchase.date}</p>
                                    <p>Cantidad: {purchase.quantity}</p>
                                    <p>Total: ${purchase.total}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;