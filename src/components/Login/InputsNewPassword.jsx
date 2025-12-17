import { useState } from 'react';

const InputsNewPassword = ({ onPasswordChange, resetInputs }) => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onPasswordChange(email, newPassword, confirmPassword);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-300">Correo Electrónico:</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-neutral-800 text-white sm:text-sm"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300">Nueva Contraseña:</label>
                <input 
                    type="password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    required 
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-neutral-800 text-white sm:text-sm"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300">Confirmar Contraseña:</label>
                <input 
                    type="password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    required 
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-neutral-800 text-white sm:text-sm"
                />
            </div>
            <button 
                type="submit" 
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
                Cambiar Contraseña
            </button>
        </form>
    );
};

export default InputsNewPassword;