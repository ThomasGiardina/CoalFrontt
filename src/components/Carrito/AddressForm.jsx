
const AddressForm = ({ formValues, handleInputChange, shippingOption, handleShippingOptionChange }) => {
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Método de Entrega</h2>
            <div className="mb-6">
                <label className="block mb-2">Selecciona una opción de entrega</label>
                <select
                    value={shippingOption}
                    onChange={handleShippingOptionChange}
                    className="bg-gray-700 p-3 w-full rounded-md"
                >
                    <option value="" disabled>Selecciona tipo de entrega</option>
                    <option value="envio">Envío a Domicilio</option>
                    <option value="retiro">Retiro en el Local</option>
                </select>
            </div>

            {shippingOption === "envio" && (
                <div className="mt-6">
                    <label className="block mb-2">Dirección</label>
                    <input
                        type="text"
                        name="address"
                        value={formValues.address}
                        onChange={handleInputChange}
                        className="bg-gray-700 p-3 w-full rounded-md"
                        placeholder="Dirección"
                    />

                    <label className="block mb-2 mt-4">Ciudad</label>
                    <input
                        type="text"
                        name="city"
                        value={formValues.city}
                        onChange={handleInputChange}
                        className="bg-gray-700 p-3 w-full rounded-md"
                        placeholder="Ciudad"
                    />

                    <label className="block mb-2 mt-4">Código Postal</label>
                    <input
                        type="text"
                        name="postalCode"
                        value={formValues.postalCode}
                        onChange={handleInputChange}
                        className="bg-gray-700 p-3 w-full rounded-md"
                        placeholder="Código Postal"
                    />

                    <label className="block mb-2 mt-4">Teléfono</label>
                    <input
                        type="text"
                        name="phone"
                        value={formValues.phone}
                        onChange={handleInputChange}
                        className="bg-gray-700 p-3 w-full rounded-md"
                        placeholder="Teléfono"
                    />
                </div>
            )}
        </div>
    );
};

export default AddressForm;
