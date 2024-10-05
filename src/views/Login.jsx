import './App.css'
import ContainerLogin from '../components/Register/ContainerRegister'

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
