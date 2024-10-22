import React from "react";

const CardForm = ({ formValues, handleInputChange, cardType, handleCardTypeChange, errors }) => {
    return (
        <div>
            <label className="block mb-2">Tipo de Tarjeta</label>
            <select
                value={cardType}
                onChange={handleCardTypeChange}
                className="bg-gray-700 p-3 w-full rounded-md"
            >
                <option value="" disabled>Selecciona tipo de tarjeta</option>
                <option value="CREDITO">Crédito</option>
                <option value="DEBITO">Débito</option>
            </select>

            <label className="block mb-2 mt-4">Nombre en la tarjeta</label>
            <input
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
                className="bg-gray-700 p-3 w-full rounded-md"
                placeholder="Nombre en la tarjeta"
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}

            <label className="block mb-2 mt-4">Número de tarjeta</label>
            <input
                type="text"
                name="cardNumber"
                value={formValues.cardNumber}
                onChange={handleInputChange}
                className="bg-gray-700 p-3 w-full rounded-md"
                placeholder="Número de tarjeta"
            />
            {errors.cardNumber && <p className="text-red-500">{errors.cardNumber}</p>}

            <label className="block mb-2 mt-4">Fecha de vencimiento</label>
            <input
                type="date"
                name="expirationDate"
                value={formValues.expirationDate}
                onChange={handleInputChange}
                className="bg-gray-700 p-3 w-full rounded-md"
            />
            {errors.expirationDate && <p className="text-red-500">{errors.expirationDate}</p>}

            <label className="block mb-2 mt-4">Código de seguridad</label>
            <input
                type="text"
                name="securityCode"
                value={formValues.securityCode}
                onChange={handleInputChange}
                className="bg-gray-700 p-3 w-full rounded-md"
                placeholder="CVV"
            />
            {errors.securityCode && <p className="text-red-500">{errors.securityCode}</p>}
        </div>
    );
};

export default CardForm;
