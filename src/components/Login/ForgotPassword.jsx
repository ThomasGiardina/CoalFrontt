import { useState } from 'react';
import InputsNewPassword from './InputsNewPassword';
import Swal from 'sweetalert2';
import Modal from 'react-modal';

const ForgotPassword = () => {
    const [resetInputs, setResetInputs] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handlePasswordChange = (email, newPassword, confirmPassword) => {
        if (newPassword !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Error al cambiar la contraseña',
                text: 'Las contraseñas no coinciden.',
                background: '#1D1F23',
                color: '#fff',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        fetch('http://localhost:4002/api/usuario/olvidar-contrasena', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                email: email,
                nuevaContrasena: newPassword
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
                    setModalIsOpen(false);
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
                text: `Hubo un problema al cambiar la contraseña: ${error.message}`,
                background: '#1D1F23',
                color: '#fff',
                confirmButtonText: 'Aceptar'
            });
        });
    };

    return (
        <div>
            <a href="#" onClick={() => setModalIsOpen(true)} className="text-blue-500 hover:underline text-lg">
                ¿Olvidaste tu Contraseña?
            </a>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Restablecer Contraseña"
                className="flex justify-center items-center h-screen z-50"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center"
            >
                <div className="relative w-full max-w-4xl rounded-xl flex flex-col bg-neutral-950 p-10">
                    <button onClick={() => setModalIsOpen(false)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-3xl">
                        &times;
                    </button>
                    <h1 className="font-bold text-5xl text-orange-500 mb-8 text-center">Restablecer Contraseña</h1>
                    <p className="mb-10 text-center text-gray-300 text-xl">Aquí puedes restablecer tu contraseña</p>
                    <InputsNewPassword onPasswordChange={handlePasswordChange} resetInputs={resetInputs} />
                </div>
            </Modal>
        </div>
    );
};

export default ForgotPassword;