import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'; 

const BotonLogin = ({ email, password }) => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:4002/api/v1/auth/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Error al iniciar sesión');
            }

            const data = await response.json();
            console.log('Inicio de sesión exitoso:', data);

            login(data.accessToken, data.role);

            if (data.role === 'ADMIN') {
                navigate('/AdminGames');
            } else {
                navigate('/Store');
            }

        } catch (error) {
            console.error('Error al iniciar sesión:', error.message);
        }
    };

    return (
        <button onClick={handleLogin} className="btn btn-active btn-primary mt-5">
            Iniciar Sesión
        </button>
    );
};

export default BotonLogin;
