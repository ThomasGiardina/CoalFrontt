import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { login } from '../../redux/slices/authSlice';

const BotonRegister = ({ formData }) => {
    const dispatch = useDispatch();
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
                    imagenPerfil: 'defaultUser.jpg',
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage =
                    errorData.message === 'email_already_exists' ||
                        errorData.message === 'username_already_exists'
                        ? 'El username o email ya está en uso.'
                        : 'Error al crear la cuenta. Por favor, intenta nuevamente.';

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: errorMessage,
                    background: '#1D1F23',
                    color: '#fff',
                    confirmButtonColor: '#FF6828',
                });
                return;
            }

            const data = await response.json();

            dispatch(login({
                token: data.access_token,
                role: data.role,
                userId: data.user_id
            }));

            Swal.fire({
                icon: 'success',
                title: '¡Cuenta creada!',
                text: 'Tu cuenta ha sido creada exitosamente. Serás redirigido a la página principal.',
                background: '#1D1F23',
                color: '#fff',
                confirmButtonColor: '#FF6828',
            }).then(() => {
                navigate(data.role === 'ADMIN' ? '/GamesAdmin' : '/Store');
            });
        } catch (error) {
            console.error('Error al crear cuenta:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al crear la cuenta. Por favor, intenta nuevamente.',
                background: '#1D1F23',
                color: '#fff',
                confirmButtonColor: '#FF6828',
            });
        }
    };

    return (
        <button onClick={handleRegister} className="btn bg-gradient-to-r from-[#FF6828] to-[#E57028] hover:from-[#E57028] hover:to-[#FF6828] text-white border-none shadow-lg shadow-[#FF6828]/25 hover:shadow-[#FF6828]/40 transform hover:-translate-y-0.5 transition-all duration-300 mt-5 w-full">
            Crear Cuenta
        </button>
    );
};

export default BotonRegister;
