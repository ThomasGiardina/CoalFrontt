import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setMetodoDePagoId } from "../../redux/slices/cartSlice"; 

const CardSelector = ({ cards, selectedCard, handleCardChange }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [localSelectedCard, setLocalSelectedCard] = useState(selectedCard || "");
    const dispatch = useDispatch();

    const handleCardSelection = (e) => {
        const selectedCardId = e.target.value;
        console.log("Tarjeta seleccionada:", selectedCardId);
        
        if (selectedCardId === "new") {
            setIsModalOpen(true); 
        } else {
            setLocalSelectedCard(selectedCardId); 
            dispatch(setMetodoDePagoId(selectedCardId)); 
        }
    };

    return (
        <div className="mb-6">
            <label className="block mb-2 text-lg">Seleccionar Tarjeta</label>
            <select
                className="select select-bordered w-full bg-gray-700 text-white"
                value={localSelectedCard}
                onChange={handleCardSelection}
            >
                <option value="">Selecciona una tarjeta</option>
                {cards.map((card, index) => (
                    <option key={index} value={card.id}>
                        {card.type} - **** **** **** {card.last4}
                    </option>
                ))}
                <option value="new">Agregar nueva tarjeta</option>
            </select>
        </div>
    );
};

export default CardSelector;
