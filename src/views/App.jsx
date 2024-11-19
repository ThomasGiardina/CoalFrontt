import '../index.css';
import StoreNavbar from '../components/Navbar/storenavbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login'; 
import Register from './Register';  
import Store from './Store'; 
import Footer from '../components/Footer/Footer';
import Homepage from './Homepage';
import Details from './Details';
import Cart from './Cart';
import ScrollToTop from '../components/AppManagement/ScrollToTop';
import Settings from './Settings';
import Statistics from './Statistics';
import GamesAdmin from './GamesAdmin';
import About from './About'; 
import Support from './Support';
import AdminOrderHistory from './AdminOrderHistory';
import UserOrderHistory from './UserOrderHistory';
import Redirector from '../components/AppManagement/Redirector';
import Favorites from './Favorites';

function App() {
    return (
        <Router>
            <ScrollToTop />
            <StoreNavbar />
            <Redirector /> 
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
                <Route path="/AdminOrderHistory" element={<AdminOrderHistory />} />
                <Route path="/UserOrderHistory" element={<UserOrderHistory />} />
                <Route path="/Favorites" element={<Favorites />} />
            </Routes>
            <Footer />
        </Router>
    )
}

export default App;
