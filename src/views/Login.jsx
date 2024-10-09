import './App.css'
import ContainerLogin from '../components/Login/ContainerLogin'

function App() {

return (
  <>
  
    <div className="relative min-h-screen flex items-center justify-center" style={{ backgroundImage: `url('/portada.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0  opacity-70" style={{backgroundColor:'#676279'}}></div>
      <div className="relative z-10">
        <ContainerLogin />
      </div>
    </div>
  </>
)
}

export default App
