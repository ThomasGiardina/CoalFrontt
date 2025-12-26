import { useState } from 'react';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const token = useSelector((state) => state.auth.token);

    const handlePasswordChange = () => {
        if (newPassword !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Las nuevas contraseñas no coinciden.',
                background: '#1D1F23',
                color: '#fff',
                confirmButtonColor: '#FF6828',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

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
                        confirmButtonColor: '#FF6828',
                        confirmButtonText: 'Aceptar'
                    }).then(() => {
                        setCurrentPassword('');
                        setNewPassword('');
                        setConfirmPassword('');
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
                    confirmButtonColor: '#FF6828',
                    confirmButtonText: 'Aceptar'
                });
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handlePasswordChange();
    };

    return (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1b1e] to-[#141517] border border-[#2a2b2e] shadow-xl">
            {/* Background Decorative Elements */}
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-[#FF6828]/5 to-transparent rounded-full blur-3xl"></div>

            <div className="relative p-6 sm:p-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6828] to-[#E57028] flex items-center justify-center shadow-lg shadow-[#FF6828]/20">
                        <i className="fa-solid fa-lock text-white text-lg"></i>
                    </div>
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-white">Seguridad</h2>
                        <p className="text-gray-400 text-sm">Cambia tu contraseña</p>
                    </div>
                </div>

                {/* Form */}
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Current Password */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                            <i className="fa-solid fa-lock text-[#FF6828] text-xs"></i>
                            Contraseña Actual
                        </label>
                        <div className="relative">
                            <input
                                type={showCurrentPassword ? "text" : "password"}
                                placeholder="Ingresa tu contraseña actual"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full px-4 py-3 pr-12 bg-[#0F1012] border border-[#2a2b2e] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6828] focus:ring-1 focus:ring-[#FF6828]/50 transition-all duration-300"
                            />
                            <button
                                type="button"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#FF6828] transition-colors"
                            >
                                <i className={`fa-solid ${showCurrentPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                    </div>

                    {/* New Password */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                            <i className="fa-solid fa-key text-[#FF6828] text-xs"></i>
                            Nueva Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                placeholder="Ingresa tu nueva contraseña"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 py-3 pr-12 bg-[#0F1012] border border-[#2a2b2e] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6828] focus:ring-1 focus:ring-[#FF6828]/50 transition-all duration-300"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#FF6828] transition-colors"
                            >
                                <i className={`fa-solid ${showNewPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                            <i className="fa-solid fa-check-double text-[#FF6828] text-xs"></i>
                            Confirmar Nueva Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Repite tu nueva contraseña"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 pr-12 bg-[#0F1012] border border-[#2a2b2e] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6828] focus:ring-1 focus:ring-[#FF6828]/50 transition-all duration-300"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#FF6828] transition-colors"
                            >
                                <i className={`fa-solid ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                        {newPassword && confirmPassword && newPassword !== confirmPassword && (
                            <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                                <i className="fa-solid fa-circle-exclamation"></i>
                                Las contraseñas no coinciden
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full mt-6 py-3 bg-gradient-to-r from-[#FF6828] to-[#E57028] rounded-xl font-semibold text-white shadow-lg shadow-[#FF6828]/25 hover:shadow-[#FF6828]/40 transform hover:-translate-y-0.5 transition-all duration-300"
                    >
                        <span className="flex items-center justify-center gap-2">
                            <i className="fa-solid fa-shield-halved"></i>
                            Actualizar Contraseña
                        </span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
