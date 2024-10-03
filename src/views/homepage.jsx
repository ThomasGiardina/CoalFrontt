import './App.css'
import Homenavbar from '../components/navbar/homepagenavbar'
import Homehero from '../components/Hero/HomeHero'

function App() {

    return (
        <div className="min-h-screen" style={{ backgroundImage: `url('./proto2.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <Homenavbar />
            <Homehero />
        </div>
    )
}

export default App
