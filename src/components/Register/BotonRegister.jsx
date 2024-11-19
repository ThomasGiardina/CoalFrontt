import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/slices/authSlice'; 

const BotonRegister = ({ formData }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); 

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
                    imagenPerfil: "defaultUser.jpg",
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.message === 'email_already_exists' || errorData.message === 'username_already_exists'
                    ? 'El username o email ya está en uso.'
                    : 'Error al crear la cuenta. Por favor, intenta nuevamente.';

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: errorMessage,
                    background: '#2B2738',
                    color: '#fff',
                    confirmButtonColor: '#FF5722',
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: 'btn btn-primary',
                    },
                });
                return;
            }

            const data = await response.json();
            console.log('Cuenta creada exitosamente:', data);

            dispatch(login({ token: data.access_token, role: data.role }));

            Swal.fire({
                icon: 'success',
                title: '¡Cuenta creada!',
                text: 'Tu cuenta ha sido creada exitosamente. Serás redirigido a la página principal.',
                background: '#2B2738',
                color: '#fff',
                confirmButtonColor: '#FF5722',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'btn btn-primary',
                },
            }).then(() => {
                if (data.role === 'ADMIN') {
                    navigate('/GamesAdmin');
                } else {
                    navigate('/Store');
                }
            });

        } catch (error) {
            console.error('Error al crear cuenta:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al crear la cuenta. Por favor, intenta nuevamente.',
                background: '#2B2738',
                color: '#fff',
                confirmButtonColor: '#FF5722',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'btn btn-primary',
                },
            });
        }
    };

    return (
        <button onClick={handleRegister} className="btn btn-active btn-primary mt-5">
            Crear Cuenta
        </button>
    );
};

export default BotonRegister;
