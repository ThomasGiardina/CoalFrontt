import './App.css'
import Gamefilter from '../components/Gamefilter/gamefilter'
import Carrousel from '../components/Carrousel/Carrousel'
import GameCard from '../components/Gamecard/gamecard'
import fifa18 from '../assets/dragonball.jpeg'
import { useState } from 'react';
import Pagination from '../components/Pagination/Pagination'

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

const ITEMS_PER_PAGE = 16; 

function Store() {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedGames = gamesData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      <Carrousel />
      <div className="flex flex-col md:flex-row ml-8 space-y-4 md:space-y-0 md:space-x-20 max-w-[1800px] mb-10">
        <Gamefilter />
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {selectedGames.map((game, index) => (
              <GameCard key={index} game={game} />
            ))}
          </div>
            <Pagination/>
        </div>
      </div>
    </>
  );
}

export default Store;
