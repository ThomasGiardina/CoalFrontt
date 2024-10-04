import './App.css'
import Gamefilter from '../components/gamefilter/gamefilter'
import Storenavbar from '../components/navbar/storenavbar'
import Carrousel from '../components/Carrousel/Carrousel'
import GameCard from '../components/Gamecard/gamecard'
import fifa18 from '../assets/fifa18.jpg'
import ContainerLogin from '../components/Login/ContainerLogin'

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
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: `#676279`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <ContainerLogin />
    </div>
  )
}

export default App
