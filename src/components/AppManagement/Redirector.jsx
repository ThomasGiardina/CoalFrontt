import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Redirector = () => {
    const { isAuthenticated, role } = useSelector((state) => state.auth);
    const navigate = useNavigate(); 
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        if (location.pathname === '/') {
            if (isAuthenticated) {
                if (role === 'ADMIN') {
                    navigate('/GamesAdmin');
                } else {
                    navigate('/Store');
                }
            } else {
                setIsLoading(false); 
            }
        } else {
            setIsLoading(false);
        }
    }, [isAuthenticated, role, navigate, location.pathname]);

    if (isLoading) {
        return <div className="loading-screen">Loading...</div>; 
    }

    return null;
};

export default Redirector;
