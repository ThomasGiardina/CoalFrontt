import React, { useState, useEffect } from 'react';

const Gamefilter = ({ filter, setFilter }) => {
  const categories = [
    'ACCION',
    'AVENTURA',
    'RPG',
    'SIMULACION',
    'DEPORTES',
    'ESTRATEGIA',
    'PUZZLE',
    'TERROR',
    'VR',
    'EDUCATIVO',
  ];

  const platforms = ['XBOX', 'PC', 'NINTENDO_SWITCH', 'PLAY_STATION'];

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

  // useEffect para filtrar automáticamente al cambiar el estado de los filtros
  useEffect(() => {
    if (setFilter) {
      setFilter(filters); // Verificamos que setFilter exista
    }
  }, [filters, setFilter]); // Asegúrate de que setFilter esté correctamente pasado desde el componente padre

  const handlePriceChange = (e) => {
    setFilters({ ...filters, price: e.target.value });
  };

  const resetFilters = () => {
    setFilters(initialState);
  };

  return (
    <div className="bg-secondary bg-opacity-15 p-6 rounded-xl w-72 space-y-4">
      {/* Categorías */}
      <div>
        <h2 className="text-white font-bold mb-2">Categorías</h2>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                checked={filters[category]}
                onChange={() =>
                  setFilters({ ...filters, [category]: !filters[category] })
                }
              />
              <span className="text-gray-300">
                {category.charAt(0) + category.slice(1).toLowerCase()}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Plataformas */}
      <div>
        <h2 className="text-white font-bold mb-2">Plataformas</h2>
        <ul className="space-y-2">
          {platforms.map((platform) => (
            <li key={platform} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                checked={filters[platform]}
                onChange={() =>
                  setFilters({ ...filters, [platform]: !filters[platform] })
                }
              />
              <span className="text-gray-300">
                {platform.replace('_', ' ')}
              </span>
            </li>
          ))}
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
          Resetear Filtros
        </button>
      </div>
    </div>
  );
};

export default Gamefilter;
