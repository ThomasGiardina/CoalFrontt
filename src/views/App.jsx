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
import AdminRoute from '../components/AppManagement/AdminRoute';
import UserRoute from '../components/AppManagement/UserRoute';
import { Provider } from 'react-redux';
import store from '../redux/store';

function App() {
    return (
        <Provider store={store}>
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
                    <Route path="/About" element={<About />} />
                    <Route path="/Support" element={<Support />} />
                    <Route
                        path="/Cart"
                        element={
                            <UserRoute>
                                <Cart />
                            </UserRoute>
                        }
                    />
                    <Route
                        path="/Settings"
                        element={
                            <UserRoute>
                                <Settings />
                            </UserRoute>
                        }
                    />
                    <Route
                        path="/UserOrderHistory"
                        element={
                            <UserRoute>
                                <UserOrderHistory />
                            </UserRoute>
                        }
                    />
                    <Route 
                        path="/Favorites" 
                        element={
                            <UserRoute>
                                <Favorites />
                            </UserRoute>
                        } 
                    />
                    <Route
                        path="/GamesAdmin"
                        element={
                            <AdminRoute>
                                <GamesAdmin />
                            </AdminRoute>
                        }
                    />
                    <Route
                        path="/Statistics"
                        element={
                            <AdminRoute>
                                <Statistics />
                            </AdminRoute>
                        }
                    />
                    <Route
                        path="/AdminOrderHistory"
                        element={
                            <AdminRoute>
                                <AdminOrderHistory />
                            </AdminRoute>
                        }
                    />
                </Routes>
                <Footer />
            </Router>
        </Provider>
    );
}

export default App;
