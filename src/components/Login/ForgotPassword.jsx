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
                confirmButtonColor: '#FF6828',
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
                        confirmButtonColor: '#FF6828',
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
                    confirmButtonColor: '#FF6828',
                    confirmButtonText: 'Aceptar'
                });
            });
    };

    return (
        <div>
            <button onClick={() => setModalIsOpen(true)} className="text-primary hover:text-primary/80 text-sm transition">
                ¿Olvidaste tu Contraseña?
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Restablecer Contraseña"
                className="flex justify-center items-center h-screen z-50"
                overlayClassName="fixed inset-0 bg-black/60 z-40 flex justify-center items-center"
            >
                <div className="relative w-full max-w-[450px] rounded-xl flex flex-col bg-neutral p-8 shadow-2xl mx-4">
                    <button onClick={() => setModalIsOpen(false)} className="absolute top-4 right-4 btn btn-ghost btn-circle btn-sm text-gray-400 hover:text-white">
                        ✕
                    </button>
                    <h1 className="font-bold text-2xl text-white mb-2 text-center">Restablecer Contraseña</h1>
                    <p className="mb-6 text-center text-gray-400 text-sm">Ingresa tu email y nueva contraseña</p>
                    <InputsNewPassword onPasswordChange={handlePasswordChange} resetInputs={resetInputs} />
                </div>
            </Modal>
        </div>
    );
};

export default ForgotPassword;