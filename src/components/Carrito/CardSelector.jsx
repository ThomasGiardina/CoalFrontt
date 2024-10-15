import React from 'react';

const CardSelector = ({ cards, selectedCard, handleCardChange }) => {
    return (
        <div className="mb-6">
            <label className="block mb-2 text-lg">Seleccionar Tarjeta</label>
            <select
                className="select select-bordered w-full bg-gray-700 text-white"
                value={selectedCard}
                onChange={handleCardChange}
            >
                <option value="">Selecciona una tarjeta</option>
                {cards.map((card, index) => (
                    <option key={index} value={card.id}>
                        {card.type} - **** **** **** {card.last4}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CardSelector;