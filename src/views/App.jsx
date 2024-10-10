import '../index.css'
import { AuthProvider } from '../context/AuthContext';
import Storenavbar from '../components/Navbar/Storenavbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login'; 
import Register from './Register';  
import Store from './Store'; 
import Footer from '../components/Footer/Footer';
import Homepage from './Homepage';
import Details from './Details';
import Cart from './Cart';
import ScrollToTop from '../components/Scroll/ScrollToTop';
import Admin from './Admin';
import Settings from './Settings';

function App() {

    return (
        <AuthProvider>
            <Router>
                <ScrollToTop />
                <Storenavbar />
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Register" element={<Register />} />
                    <Route path="/Store" element={<Store />} />
                    <Route path="/Details" element={<Details />} />
                    <Route path="/Cart" element={<Cart />} />
                    <Route path="/Admin" element={<Admin />} />
                    <Route path="/Settings" element={<Settings />} />
                </Routes>
                <Footer />
            </Router>
        </AuthProvider>
    )
}

export default App

