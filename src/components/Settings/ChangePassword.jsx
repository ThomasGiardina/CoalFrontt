import { useState } from 'react';
import InputsNewPassword from './InputsNewPassword';
import Swal from 'sweetalert2';  
import { useSelector } from 'react-redux';

const ChangePassword = () => {
    const [resetInputs, setResetInputs] = useState(false);
    const token = useSelector((state) => state.auth.token);

    const handlePasswordChange = (currentPassword, newPassword) => {
        fetch('http://localhost:4002/api/usuario/cambiar-contrasena', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`
            },
            body: new URLSearchParams({
                contraseñaActual: currentPassword,
                nuevaContraseña: newPassword
            })
        })
        .then(response => {
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Contraseña cambiada',
                    text: 'La contraseña ha sido cambiada exitosamente.',
                    background: '#1D1F23',
                    color: '#fff',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    setResetInputs(true);

                    setResetInputs(false);
                });
            } else {
                return response.text().then(text => {
                    throw new Error(text);
                });
            }
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Error al cambiar la contraseña',
                text: 'La contraseña actual es incorrecta.',
                background: '#1D1F23',
                color: '#fff',
                confirmButtonText: 'Aceptar'
            });
        });
    };

    return (
        <div className="min-h-[550px] h-auto w-full max-w-[650px] rounded-xl flex flex-col mt-8 sm:mt-14 bg-neutral p-4 sm:p-6">
            <h1 className="font-bold text-2xl sm:text-3xl mb-3 sm:mb-5">Cambiar Contraseña</h1>
            <p className="text-sm sm:text-base mb-4 sm:mb-5">Aquí puedes establecer una nueva contraseña</p>
            <InputsNewPassword onPasswordChange={handlePasswordChange} resetInputs={resetInputs} />
        </div>
    );
};

export default ChangePassword;
