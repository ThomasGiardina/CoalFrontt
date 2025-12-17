import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const InputsNewPassword = ({ onPasswordChange, resetInputs }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        if (resetInputs) {
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }
    }, [resetInputs]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Las nuevas contraseñas no coinciden.',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        onPasswordChange(currentPassword, newPassword);
    };

    return (
        <div className="max-w-4xl p-8">
            <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label className="font-bold mb-2">Contraseña Actual</label>
                    <input
                        type="password"
                        placeholder="Contraseña Actual"
                        className="p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-bold mb-2">Contraseña Nueva</label>
                    <input
                        type="password"
                        placeholder="Contraseña Nueva"
                        className="p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-bold mb-2">Repite Contraseña Nueva</label>
                    <input
                        type="password"
                        placeholder="Repite Contraseña"
                        className="p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn w-full btn-primary text-white rounded-md p-2 mt-5">
                    Guardar Cambios
                </button>
            </form>
        </div>
    );
};

export default InputsNewPassword;
