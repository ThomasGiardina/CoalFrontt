const InputsNewPassword = () => {
    return (
        <div className="max-w-4xl  p-8">
            <form className="grid grid-cols-1  gap-6">
                <div className="flex flex-col">
                    <label className="font-bold mb-2">Contraseña Actual</label>
                    <input
                        type="text"
                        placeholder="Contraseña Actual"
                        className="p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-bold mb-2">Contraseña Nueva</label>
                    <input
                        type="email"
                        placeholder="Contraseña Nueva"
                        className="p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-bold mb-2">Repite Contraseña Nueva</label>
                    <input
                        type="email"
                        placeholder="Repite Contraseña"
                        className="p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                    />
                </div>
            </form>
        </div>
    )
}

export default InputsNewPassword;