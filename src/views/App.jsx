import '../index.css';
import { AuthProvider } from '../context/AuthContext';
import StoreNavbar from '../components/Navbar/Storenavbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login'; 
import Register from './Register';  
import Store from './Store'; 
import Footer from '../components/Footer/Footer';
import Homepage from './Homepage';
import Details from './Details';
import Cart from './Cart';
import ScrollToTop from '../components/Scroll/ScrollToTop';
import Settings from './Settings';
import Statistics from './Statistics';
import GamesAdmin from './GamesAdmin';
import About from './About'; 
import Support from './Support';

function App() {
    return (
        <AuthProvider>
            <Router>
                <ScrollToTop />
                <StoreNavbar />
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Register" element={<Register />} />
                    <Route path="/Store" element={<Store />} />
                    <Route path="/Details/:id" element={<Details />} />
                    <Route path="/Cart" element={<Cart />} />
                    <Route path="/Settings" element={<Settings />} />
                    <Route path="/Statistics" element={<Statistics />} />
                    <Route path="/GamesAdmin" element={<GamesAdmin />} />
                    <Route path="/About" element={<About />} />
                    <Route path="/Support" element={<Support />} />
                </Routes>
                <Footer />
            </Router>
        </AuthProvider>
    )
}

export default App;
