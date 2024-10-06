import './App.css'
import Gamefilter from '../components/Gamefilter/gamefilter'
import Storenavbar from '../components/Navbar/storenavbar'
import Carrousel from '../components/Carrousel/Carrousel'
import GameCard from '../components/Gamecard/gamecard'
import fifa18 from '../assets/dragonball.jpeg'
import { useState } from 'react';

// Simulación de datos de los juegos
const gamesData = [
  { title: "Fifa18", image: fifa18, likes: 185.2, downloads: 63.6 },
  { title: "Minecraft", image: fifa18, likes: 185.2, downloads: 63.6 },
  { title: "Dragon Ball", image: fifa18, likes: 200, downloads: 70 },
  { title: "Valorant", image: fifa18, likes: 300, downloads: 90 },
  { title: "Call of Duty", image: fifa18, likes: 250, downloads: 100 },
  { title: "Fortnite", image: fifa18, likes: 400, downloads: 120 },
  { title: "Apex Legends", image: fifa18, likes: 500, downloads: 200 },
  { title: "Cyberpunk 2077", image: fifa18, likes: 185.2, downloads: 63.6 },
  { title: "Assassin's Creed", image: fifa18, likes: 185.2, downloads: 63.6 },
  { title: "The Witcher", image: fifa18, likes: 185.2, downloads: 63.6 },
  { title: "Halo", image: fifa18, likes: 185.2, downloads: 63.6 },
  { title: "Elden Ring", image: fifa18, likes: 185.2, downloads: 63.6 },
];

// Parámetros de paginación
const ITEMS_PER_PAGE = 16; // 4 filas de 4 juegos

function Store() {
  const [currentPage, setCurrentPage] = useState(1);

  // Cálculo de los juegos a mostrar en la página actual
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedGames = gamesData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Funciones para cambiar de página
  const handleNextPage = () => {
    if (startIndex + ITEMS_PER_PAGE < gamesData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <Carrousel />
      <div className="flex ml-8 space-x-10 max-w-7xl mb-10">
        {/* Filtro a la izquierda */}
        <Gamefilter />
        
        {/* Tarjetas de los juegos */}
        <div className="flex-1">
          <div className="grid grid-cols-4 gap-6">
            {selectedGames.map((game, index) => (
              <GameCard key={index} game={game} />
            ))}
          </div>

          {/* Controles de paginación */}
          <div className="flex justify-center mt-8 space-x-4">
            <button 
              onClick={handlePrevPage} 
              disabled={currentPage === 1} 
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <button 
              onClick={handleNextPage} 
              disabled={startIndex + ITEMS_PER_PAGE >= gamesData.length} 
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Store;
