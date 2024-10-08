import './App.css';
import Gamefilter from '../components/Gamefilter/gamefilter';
import Carrousel from '../components/Carrousel/Carrousel';
import GameCard from '../components/Gamecard/gamecard';
import fifa18 from '../assets/dragonball.jpeg';
import { useState } from 'react';
import Pagination from '../components/Pagination/Pagination';

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
  { title: "Call of Duty", image: fifa18, likes: 250, downloads: 100 },
  { title: "Fortnite", image: fifa18, likes: 400, downloads: 120 },
  { title: "Apex Legends", image: fifa18, likes: 500, downloads: 200 },
  { title: "Cyberpunk 2077", image: fifa18, likes: 185.2, downloads: 63.6 },
  { title: "Assassin's Creed", image: fifa18, likes: 185.2, downloads: 63.6 },
  { title: "The Witcher", image: fifa18, likes: 185.2, downloads: 63.6 },
  { title: "Halo", image: fifa18, likes: 185.2, downloads: 63.6 },
  { title: "Elden Ring", image: fifa18, likes: 185.2, downloads: 63.6 },
];

const ITEMS_PER_PAGE = 15;

function Store() {
  // Estado para manejar la página actual
  const [currentPage, setCurrentPage] = useState(1);

  // Cálculo del número total de páginas
  const totalPages = Math.ceil(gamesData.length / ITEMS_PER_PAGE);

  // Cálculo de los juegos a mostrar en la página actual
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedGames = gamesData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Función para manejar el cambio de página
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      {/* Carrousel de juegos */}
      <Carrousel />
      <div className="flex flex-col md:flex-row ml-8 space-y-4 md:space-y-0 md:space-x-20 max-w-[1800px] mb-10">
        
        {/* Filtro de juegos */}
        <Gamefilter />
        
        <div className="flex-1">
          {/* Muestra las tarjetas de juegos seleccionados */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {selectedGames.map((game, index) => (
              <GameCard key={index} game={game} />
            ))}
          </div>
          
          {/* Paginación */}
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        </div>
      </div>
    </>
  );
}

export default Store;
