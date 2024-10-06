import './App.css'
import Homenavbar from '../components/Navbar/homepagenavbar'
import Homehero from '../components/Hero/HomeHero'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login'; 
import Register from './Register';  
import Store from './Store'; 
import Footer from '../components/Footer/Footer';
import Homepage from './Homepage';
import Details from './Details';

function App() {

    return (
        <Router>
            <Homenavbar />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/Store" element={<Store />} />
                <Route path="/Details" element={<Details />} />
            </Routes>
            <Footer />
        </Router>
    )
}

export default App

