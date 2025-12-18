
const InputsAccount = ({ formData, handleInputChange }) => {
    const handlePhoneInput = (e) => {
        const { name, value } = e.target;
        const onlyNums = value.replace(/[^0-9]/g, ""); 
        if (onlyNums.length <= 10) { 
            handleInputChange({
                target: {
                    name,
                    value: onlyNums
                }
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex flex-col">
                    <label className="font-bold mb-2 text-sm sm:text-base">Username*</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="@username"
                        className="p-2 sm:p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black text-sm sm:text-base"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-bold mb-2 text-sm sm:text-base">Teléfono</label>
                    <input
                        type="text"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handlePhoneInput} 
                        placeholder="Teléfono"
                        className="p-2 sm:p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black text-sm sm:text-base"
                        maxLength={10} 
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-bold mb-2 text-sm sm:text-base">Nombre</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Nombre"
                        className="p-2 sm:p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black text-sm sm:text-base"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-bold mb-2 text-sm sm:text-base">Apellido</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Apellido"
                        className="p-2 sm:p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black text-sm sm:text-base"
                    />
                </div>
                <div className="flex flex-col md:col-span-2">
                    <label className="font-bold mb-2 text-sm sm:text-base">Email*</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="email@example.com"
                        className="p-2 sm:p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black text-sm sm:text-base"
                    />
                </div>
            </form>
        </div>
    );
};

export default InputsAccount;
