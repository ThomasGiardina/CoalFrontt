import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'; // Importa el contexto de autenticación
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redireccionar

const BotonLogin = ({ email, password }) => {
    const { login } = useContext(AuthContext); // Usa el método login del contexto
    const navigate = useNavigate(); // Inicializa useNavigate para redirigir

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
            console.log('Inicio de sesión exitoso:', data); // <-- Agrega este console.log para verificar la respuesta

            // Llamar al login del AuthContext para actualizar el estado global
            login(data.access_token);

            // Verifica si el campo `role` es correcto
            console.log('Role del usuario:', data.role); // <-- Verificar el rol recibido

            // Redirigir según el rol del usuario
            if (data.role === 'ADMIN') {
                navigate('/Admin'); // Redirigir a /Admin si el rol es ADMIN
            } else if (data.role === 'USER') {
                navigate('/Store'); // Redirigir a /Store si el rol es USER
            } else {
                console.error('Rol no reconocido:', data.role); // <-- Mensaje de error si el rol no es correcto
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
}

export default BotonLogin;
