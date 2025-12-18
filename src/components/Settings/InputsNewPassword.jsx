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
        <div className="max-w-4xl p-4 sm:p-6 lg:p-8">
            <form className="grid grid-cols-1 gap-4 sm:gap-6" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label className="font-bold mb-2 text-sm sm:text-base">Contraseña Actual</label>
                    <input
                        type="password"
                        placeholder="Contraseña Actual"
                        className="p-2 sm:p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black text-sm sm:text-base"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-bold mb-2 text-sm sm:text-base">Contraseña Nueva</label>
                    <input
                        type="password"
                        placeholder="Contraseña Nueva"
                        className="p-2 sm:p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black text-sm sm:text-base"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-bold mb-2 text-sm sm:text-base">Repite Contraseña Nueva</label>
                    <input
                        type="password"
                        placeholder="Repite Contraseña"
                        className="p-2 sm:p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black text-sm sm:text-base"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn w-full btn-primary text-white rounded-md p-2 sm:p-3 mt-4 sm:mt-5 text-sm sm:text-base">
                    Guardar Cambios
                </button>
            </form>
        </div>
    );
};

export default InputsNewPassword;
