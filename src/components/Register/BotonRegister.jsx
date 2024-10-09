import { useNavigate } from 'react-router-dom';

const BotonRegister = ({ formData }) => {
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await fetch('http://localhost:4002/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    username: formData.username,
                    password: formData.password,
                }),
            });

            if (!response.ok) {
                throw new Error('Error al crear cuenta');
            }

            const data = await response.json();
            console.log('Cuenta creada exitosamente:', data);

            navigate('/Store');
        } catch (error) {
            console.error('Error al crear cuenta:', error.message);
        }
    };

    return (
        <>
            <button onClick={handleRegister} className="btn btn-active btn-primary mt-5">Crear Cuenta</button>
        </>
    );
};

export default BotonRegister;
