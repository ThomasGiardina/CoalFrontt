import './App.css'
import Gamefilter from '../components/gamefilter/gamefilter'
import Storenavbar from '../components/navbar/storenavbar'
import Carrousel from '../components/Carrousel/Carrousel'
import GameCard from '../components/Gamecard/gamecard'
import fifa18 from '../assets/fifa18.jpg'

const gameData1 = {
  title: "Fifa18",
  image: fifa18, 
  likes: 185.2,
  downloads: 63.6
};

const gameData2 = {
  title: "Minecraft",
  image: "/assets/provisional3.jpg", 
  likes: 185.2,
  downloads: 63.6
};

const gameData3 = {
  title: "Minecraft",
  image: "/assets/provisional3.jpg", 
  likes: 185.2,
  downloads: 63.6
};

const gameData4 = {
  title: "Minecraft",
  image: "/assets/provisional3.jpg", 
  likes: 185.2,
  downloads: 63.6
};

function App() {

  return (
    <> 
      <Storenavbar />
      <Carrousel />
      <div className="flex ml-28 space-x-10 items-start max-w-7xl">
        <Gamefilter />
        <GameCard game={gameData1} />
        <GameCard game={gameData2} />
        <GameCard game={gameData3} />
        <GameCard game={gameData4} />
      </div>   
    </>
  )
}

export default App
