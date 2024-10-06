import './App.css'
import Homenavbar from '../components/navbar/homepagenavbar'
import Homehero from '../components/Hero/HomeHero'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login'; 
import Register from './Register';  
import Store from './Store'; 
import Footer from '../components/Footer/Footer';

function App() {

    return (
    <Router>
      <Homenavbar />
      
      <Routes>
          <Route path="/" element={<Homehero />} />
          
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Store" element={<Store />} />
      </Routes>

      <Footer />
  </Router>
    )
}

export default App

