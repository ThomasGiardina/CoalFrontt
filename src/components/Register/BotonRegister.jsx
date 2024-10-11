import Swal from 'sweetalert2';
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
                    firstname: formData.firstname,
                    lastname: formData.lastname,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.message === 'email_already_exists' || errorData.message === 'username_already_exists') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'El correo electrónico o el nombre de usuario ya están en uso. Por favor, intenta con otros datos.',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Error al crear cuenta. Por favor, intenta nuevamente.',
                    });
                }
                return;  
            }

            const data = await response.json();
            console.log('Cuenta creada exitosamente:', data);

            navigate('/Store');
        } catch (error) {
            console.error('Error al crear cuenta:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al crear cuenta. Por favor, intenta nuevamente.',
            });
        }
    };

    return (
        <>
            <button onClick={handleRegister} className="btn btn-active btn-primary mt-5">Crear Cuenta</button>
        </>
    );
};

export default BotonRegister;
