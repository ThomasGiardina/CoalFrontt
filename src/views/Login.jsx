import '../index.css';
import ContainerLogin from '../components/Login/ContainerLogin';

function App() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/portada.png')`,
          filter: 'brightness(50%) blur(3px)' 
        }}
      ></div>
      <div className="relative z-10 mb-8">
        <ContainerLogin />
      </div>
    </div>
  );
}

export default App;
