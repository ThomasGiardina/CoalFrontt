import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/authSlice';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const BotonLogin = ({ email, password }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const MySwal = withReactContent(Swal);

    const handleLogin = async () => {
        // Validación de campos vacíos
        if (!email || !password) {
            MySwal.fire({
                toast: true,
                position: 'top-end',
                icon: 'warning',
                title: 'Por favor, completa todos los campos.',
                showConfirmButton: false,
                timer: 3000,
                background: '#1D1F23',
                customClass: {
                    popup: 'custom-toast',
                    title: 'text-white',
                },
            });
            return;
        }

        try {
            const response = await fetch('http://localhost:4002/api/v1/auth/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const status = response.status;
                let errorMessage = 'Error al iniciar sesión';

                if (status === 403 || status === 401) {
                    errorMessage = 'Correo o contraseña incorrectos';
                } else if (status === 404) {
                    errorMessage = 'Usuario no encontrado';
                } else if (status >= 500) {
                    errorMessage = 'Error del servidor. Intenta más tarde';
                }

                MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: errorMessage,
                    showConfirmButton: false,
                    timer: 4000,
                    background: '#1D1F23',
                    customClass: {
                        popup: 'custom-toast',
                        title: 'text-white',
                    },
                });
                return;
            }

            const data = await response.json();

            const profileImageResponse = await fetch(`http://localhost:4002/api/usuario/imagen/${data.user_id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${data.access_token}`,
                },
            });

            let profileImage = null;
            if (profileImageResponse.ok) {
                const blob = await profileImageResponse.blob();
                profileImage = URL.createObjectURL(blob);
            }

            dispatch(login({
                token: data.access_token,
                role: data.role,
                userId: data.user_id,
                profileImage: profileImage,
            }));

            MySwal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: '¡Bienvenido!',
                showConfirmButton: false,
                timer: 2000,
                background: '#1D1F23',
                customClass: {
                    popup: 'custom-toast',
                    title: 'text-white',
                },
            });

            if (data.role === 'ADMIN') {
                navigate('/GamesAdmin');
            } else {
                navigate('/Store');
            }

        } catch (error) {
            console.error('Error al iniciar sesión:', error.message);
            MySwal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'Error de conexión. Verifica tu internet.',
                showConfirmButton: false,
                timer: 4000,
                background: '#1D1F23',
                customClass: {
                    popup: 'custom-toast',
                    title: 'text-white',
                },
            });
        }
    };

    return (
        <button onClick={handleLogin} className="btn btn-active btn-primary mt-5 w-full">
            Iniciar Sesión
        </button>
    );
};

export default BotonLogin;