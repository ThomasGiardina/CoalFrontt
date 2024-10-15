import React from "react";

const InputsAccount = ({ formData, handleInputChange }) => {
    return (
        <div className="max-w-4xl mx-auto p-8">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                    <label className="font-bold mb-2">Username*</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}  
                        onChange={handleInputChange}
                        placeholder="@username"
                        className="p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-bold mb-2">Telefono</label>
                    <input
                        type="text"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        placeholder="Telefono"
                        className="p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-bold mb-2">Nombre</label>
                    <input
                        type="text"
                        name="firstName"  
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Nombre"
                        className="p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-bold mb-2">Apellido</label>
                    <input
                        type="text"
                        name="lastName"  
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Apellido"
                        className="p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                    />
                </div>
                <div className="flex flex-col md:col-span-2">
                    <label className="font-bold mb-2">Email*</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email} 
                        onChange={handleInputChange}
                        placeholder="email@example.com"
                        className="p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                    />
                </div>
            </form>
        </div>
    );
};

export default InputsAccount;
