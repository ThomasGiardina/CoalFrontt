import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Redirector = () => {
    const { isAuthenticated, role } = useContext(AuthContext); 
    const navigate = useNavigate(); 

    useEffect(() => {
        if (isAuthenticated) {
            if (role === 'ADMIN') {
                navigate('/GamesAdmin');
            } else {
                navigate('/Store');
            }
        }
    }, [isAuthenticated, role, navigate]); 

    return null;
}

export default Redirector;
