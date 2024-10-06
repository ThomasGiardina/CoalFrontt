import React, { useState } from 'react';

const Gamefilter = ({ filter, setFilter }) => {
  const initialState = {
    ACCION: false,
    AVENTURA: false,
    RPG: false,
    SIMULACION: false,
    DEPORTES: false,
    ESTRATEGIA: false,
    PUZZLE: false,
    TERROR: false,
    VR: false,
    EDUCATIVO: false,
    XBOX: false,
    PC: false,
    NINTENDO_SWITCH: false,
    PLAY_STATION: false,
    price: 100,
  };

  const [filters, setFilters] = useState(initialState);

  const handlePriceChange = (e) => {
    setFilters({ ...filters, price: e.target.value });
  };

  const resetFilters = () => {
    setFilters(initialState);
  };

  return (
    <div className="bg-secondary bg-opacity-15 p-6 rounded-xl w-5/12 space-y-4">
      {/* Categorías */}
      <div>
        <h2 className="text-white font-bold mb-2">Categorías</h2>
        <ul className="space-y-2">
          <li className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={filters.ACCION}
              onChange={() => setFilters({ ...filters, ACCION: !filters.ACCION })}
            />
            <span className="text-gray-300">Acción</span>
          </li>
          <li className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={filters.AVENTURA}
              onChange={() => setFilters({ ...filters, AVENTURA: !filters.AVENTURA })}
            />
            <span className="text-gray-300">Aventura</span>
          </li>
          <li className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={filters.RPG}
              onChange={() => setFilters({ ...filters, RPG: !filters.RPG })}
            />
            <span className="text-gray-300">RPG</span>
          </li>
          <li className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={filters.SIMULACION}
              onChange={() => setFilters({ ...filters, SIMULACION: !filters.SIMULACION })}
            />
            <span className="text-gray-300">Simulación</span>
          </li>
          <li className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={filters.DEPORTES}
              onChange={() => setFilters({ ...filters, DEPORTES: !filters.DEPORTES })}
            />
            <span className="text-gray-300">Deportes</span>
          </li>
          <li className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={filters.ESTRATEGIA}
              onChange={() => setFilters({ ...filters, ESTRATEGIA: !filters.ESTRATEGIA })}
            />
            <span className="text-gray-300">Estrategia</span>
          </li>
          <li className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={filters.PUZZLE}
              onChange={() => setFilters({ ...filters, PUZZLE: !filters.PUZZLE })}
            />
            <span className="text-gray-300">Puzzle</span>
          </li>
          <li className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={filters.TERROR}
              onChange={() => setFilters({ ...filters, TERROR: !filters.TERROR })}
            />
            <span className="text-gray-300">Terror</span>
          </li>
          <li className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={filters.VR}
              onChange={() => setFilters({ ...filters, VR: !filters.VR })}
            />
            <span className="text-gray-300">VR</span>
          </li>
          <li className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={filters.EDUCATIVO}
              onChange={() => setFilters({ ...filters, EDUCATIVO: !filters.EDUCATIVO })}
            />
            <span className="text-gray-300">Educativo</span>
          </li>
        </ul>
      </div>

      {/* Plataformas */}
      <div>
        <h2 className="text-white font-bold mb-2">Plataformas</h2>
        <ul className="space-y-2">
          <li className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={filters.XBOX}
              onChange={() => setFilters({ ...filters, XBOX: !filters.XBOX })}
            />
            <span className="text-gray-300">Xbox</span>
          </li>
          <li className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={filters.PC}
              onChange={() => setFilters({ ...filters, PC: !filters.PC })}
            />
            <span className="text-gray-300">PC</span>
          </li>
          <li className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={filters.NINTENDO_SWITCH}
              onChange={() => setFilters({ ...filters, NINTENDO_SWITCH: !filters.NINTENDO_SWITCH })}
            />
            <span className="text-gray-300">Nintendo Switch</span>
          </li>
          <li className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={filters.PLAY_STATION}
              onChange={() => setFilters({ ...filters, PLAY_STATION: !filters.PLAY_STATION })}
            />
            <span className="text-gray-300">PlayStation</span>
          </li>
        </ul>
      </div>

      {/* Precio */}
      <div>
        <h2 className="text-white font-bold mb-2">Rango de Precios</h2>
        <input
          type="range"
          min="0"
          max="200"
          value={filters.price}
          className="range range-primary"
          onChange={handlePriceChange}
        />
        <p className="text-primary mt-2">${filters.price}</p>
      </div>

      {/* Botón para resetear filtros */}
      <div>
        <button
          onClick={resetFilters}
          className="btn btn-outline btn-primary w-full h-12 text-lg rounded-lg"
        >
          Resetea Filtros
        </button>
      </div>
    </div>
  );
};

export default Gamefilter;

