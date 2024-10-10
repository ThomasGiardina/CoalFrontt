import { useNavigate } from 'react-router-dom';

const BotonLogin = ({ email, password }) => {
    const navigate = useNavigate(); 

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:4002/api/v1/auth/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Error al iniciar sesión');
            }
    
            const data = await response.json();
            console.log('Respuesta del backend:', data);
    
            if (data.access_token) {
                localStorage.setItem('token', data.access_token); 
                console.log('Token almacenado:', data.access_token);
    
                if (data.role === 'ADMIN') {
                    navigate('/admin');
                } else {
                    navigate('/store');
                }
            } else {
                throw new Error('Token no encontrado en la respuesta del servidor');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error.message);
        }
    };
    

    return (
        <>
            <button onClick={handleLogin} className="btn btn-active btn-primary mt-5">Iniciar Sesión</button>
        </>
    );
}

export default BotonLogin;
