
const AddressForm = ({ formValues, handleInputChange, shippingOption, handleShippingOptionChange }) => {
    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Método de Entrega
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <button
                    type="button"
                    onClick={() => handleShippingOptionChange({ target: { value: 'envio' } })}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-3
                        ${shippingOption === 'envio'
                            ? "border-primary bg-primary/10"
                            : "border-base-200 bg-base-200/50 hover:border-gray-500"}`}
                >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${shippingOption === 'envio' ? "bg-primary/20" : "bg-base-300"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${shippingOption === 'envio' ? "text-primary" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                        </svg>
                    </div>
                    <div className="text-left">
                        <p className="font-semibold text-white">Envío a Domicilio</p>
                        <p className="text-gray-400 text-sm">$5000 ARS</p>
                    </div>
                </button>

                <button
                    type="button"
                    onClick={() => handleShippingOptionChange({ target: { value: 'retiro' } })}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-3
                        ${shippingOption === 'retiro'
                            ? "border-primary bg-primary/10"
                            : "border-base-200 bg-base-200/50 hover:border-gray-500"}`}
                >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${shippingOption === 'retiro' ? "bg-primary/20" : "bg-base-300"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${shippingOption === 'retiro' ? "text-primary" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <div className="text-left">
                        <p className="font-semibold text-white">Retiro en el Local</p>
                        <p className="text-gray-400 text-sm">Gratis</p>
                    </div>
                </button>
            </div>

            {shippingOption === "envio" && (
                <div className="bg-base-200/30 rounded-xl p-4 sm:p-6 border border-base-200 space-y-4">
                    <p className="text-gray-400 text-sm mb-4">Completa tu dirección de envío</p>

                    <div>
                        <label className="text-gray-400 text-sm mb-1 block">Dirección</label>
                        <input
                            type="text"
                            name="address"
                            value={formValues.address}
                            onChange={handleInputChange}
                            className="input input-bordered w-full bg-base-300 border-base-200 text-white"
                            placeholder="Ej: Av. Corrientes 1234, Piso 2"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-gray-400 text-sm mb-1 block">Ciudad</label>
                            <input
                                type="text"
                                name="city"
                                value={formValues.city}
                                onChange={handleInputChange}
                                className="input input-bordered w-full bg-base-300 border-base-200 text-white"
                                placeholder="Ej: Buenos Aires"
                            />
                        </div>
                        <div>
                            <label className="text-gray-400 text-sm mb-1 block">Código Postal</label>
                            <input
                                type="text"
                                name="postalCode"
                                value={formValues.postalCode}
                                onChange={handleInputChange}
                                className="input input-bordered w-full bg-base-300 border-base-200 text-white"
                                placeholder="Ej: C1043"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-gray-400 text-sm mb-1 block">Teléfono de contacto</label>
                        <input
                            type="text"
                            name="phone"
                            value={formValues.phone}
                            onChange={handleInputChange}
                            className="input input-bordered w-full bg-base-300 border-base-200 text-white"
                            placeholder="Ej: 11-1234-5678"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddressForm;
