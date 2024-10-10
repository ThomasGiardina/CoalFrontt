import React from 'react';

const categoryOptions = [
    'ACCION', 'AVENTURA', 'RPG', 'SIMULACION', 'DEPORTES', 'ESTRATEGIA', 'PUZZLE', 'TERROR', 'VR', 'EDUCATIVO'
];

const AddGameForm = ({ newGame, handleGameChange, addGame, handleCategoryChange }) => {
    return (
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
            <input
                type="text"
                name="categorias"
                value={newGame.categorias.join(', ')}
                onChange={handleCategoryChange}
                placeholder="Categorías (separadas por comas)"
                className="input input-bordered w-full mb-2 bg-gray-700 text-white"
            />
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
    );
};

export default AddGameForm;