import '../index.css';
import ContainerLogin from '../components/Login/ContainerLogin';

function App() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background py-8 sm:py-12">
      <div
        className="absolute inset-0 bg-cover bg-center w-full h-full"
        style={{
          backgroundImage: `url('/portada.png')`,
          filter: 'brightness(50%) blur(3px)',
          minHeight: '100vh',
          willChange: 'transform'
        }}
        aria-hidden="true"
      ></div>
      <div className="relative z-10 w-full max-w-[1400px] px-4 flex items-center justify-center">
        <ContainerLogin />
      </div>
    </div>
  );
}

export default App;
