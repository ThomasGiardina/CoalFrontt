import React, { useState } from 'react';
import InputsNewPassword from './InputsNewPassword';
import Swal from 'sweetalert2';  

const ChangePassword = () => {
    const [resetInputs, setResetInputs] = useState(false);

    const handlePasswordChange = (currentPassword, newPassword) => {
        fetch('http://localhost:4002/api/usuario/cambiar-contrasena', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
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
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    setResetInputs(true);
                    setTimeout(() => setResetInputs(false), 100); 
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
                confirmButtonText: 'Aceptar'
            });
        });
    };

    return (
        <div className="h-[550px] w-[650px] rounded-xl flex flex-col mt-14" style={{ backgroundColor: '#2c3e50' }}>
            <h1 className="font-bold text-3xl ml-5 mt-5">Cambiar Contraseña</h1>
            <p className="mt-5 ml-5">Aquí puedes establecer una nueva contraseña</p>
            <InputsNewPassword onPasswordChange={handlePasswordChange} resetInputs={resetInputs} />
        </div>
    );
};

export default ChangePassword;
