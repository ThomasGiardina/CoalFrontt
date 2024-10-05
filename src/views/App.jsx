import './App.css'
import Gamefilter from '../components/gamefilter/gamefilter'
import Storenavbar from '../components/navbar/storenavbar'
import Carrousel from '../components/Carrousel/Carrousel'
import GameCard from '../components/Gamecard/gamecard'
import fifa18 from '../assets/fifa18.jpg'
import ContainerLogin from '../components/Login/ContainerLogin'
import FooterLogin from '../components/Login/FooterLogin'

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
    <div className="relative min-h-screen flex items-center justify-center" style={{ backgroundImage: `url('/portada.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0  opacity-70" style={{backgroundColor:'#676279'}}></div>
      <div className="relative z-10">
        <ContainerLogin />
      </div>
    </div>
    <FooterLogin />
  </>
  )
}

export default App
