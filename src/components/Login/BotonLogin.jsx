import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/authSlice';

const BotonLogin = ({ email, password }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

            dispatch(login({ token: data.access_token, role: data.role }));

            console.log('Token guardado en Redux:', data.access_token);

            if (data.role === 'ADMIN') {
                navigate('/GamesAdmin');
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
