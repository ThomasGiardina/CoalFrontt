import React, { useState, useEffect } from 'react';
import '../../index.css';

const Gamefilter = ({ setFilter }) => {
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

  useEffect(() => {
    if (setFilter) {
      setFilter(filters); 
    }
  }, [filters, setFilter]);

  const handlePriceChange = (e) => {
    setFilters({ ...filters, price: e.target.value });
  };

  const resetFilters = () => {
    setFilters(initialState);
  };

  return (
    <div className="bg-neutral p-6 rounded-xl w-[400px] h-[1010px] flex flex-col space-y-6">
      <div className="w-full flex-grow">
        <h2 className="text-white font-bold mb-4 text-xl">Categorías</h2>
        <ul className="space-y-3 w-full">
          {categories.map((category) => (
            <li key={category} className="flex items-center space-x-4 mr-4">
              <input
                type="checkbox"
                className="checkbox checkbox-lg checkbox-primary mr-2"
                checked={filters[category]}
                onChange={() =>
                  setFilters({ ...filters, [category]: !filters[category] })
                }
              />
              <span className="text-gray-300 text-xl mr-2">
                {category.charAt(0) + category.slice(1).toLowerCase()}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full flex-grow">
        <h2 className="text-white font-bold mb-4 text-xl">Plataformas</h2>
        <ul className="space-y-3 w-full">
          {platforms.map((platform) => (
            <li key={platform} className="flex items-center space-x-4 mr-4">
              <input
                type="checkbox"
                className="checkbox checkbox-lg checkbox-primary mr-2"
                checked={filters[platform]}
                onChange={() =>
                  setFilters({ ...filters, [platform]: !filters[platform] })
                }
              />
              <span className="text-gray-300 text-xl mr-2">
                {platform.replace('_', ' ')}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full flex-grow">
        <h2 className="text-white font-bold mb-4 text-xl">Rango de Precios</h2>
        <input
          type="range"
          min="0"
          max="200"
          value={filters.price}
          className="range range-lg range-primary w-full"
          onChange={handlePriceChange}
        />
        <p className="text-primary mt-4 text-xl">${filters.price}</p>
      </div>
      <div className="w-full flex-grow">
        <button
          onClick={resetFilters}
          className="btn btn-outline btn-primary w-full h-14 text-xl rounded-lg"
        >
          Resetear Filtros
        </button>
      </div>
    </div>
  );
};

export default Gamefilter;
