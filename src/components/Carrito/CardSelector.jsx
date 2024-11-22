import React from "react";
import { useDispatch } from "react-redux";
import { setMetodoDePagoId } from "../../redux/slices/cartSlice"; 

const CardSelector = ({ cards, selectedCard, handleCardChange }) => {
    const dispatch = useDispatch();

    const handleCardSelection = (e) => {
        const selectedCardId = e.target.value;
        handleCardChange(selectedCardId); // Actualiza el estado local en el componente padre
        
        // Si se selecciona una tarjeta válida, actualiza el metodoDePagoId en Redux
        if (selectedCardId) {
            dispatch(setMetodoDePagoId(selectedCardId));
        }
    };

    return (
        <div className="mb-6">
            <label className="block mb-2 text-lg">Seleccionar Tarjeta</label>
            <select
                className="select select-bordered w-full bg-gray-700 text-white"
                value={selectedCard}
                onChange={handleCardSelection} // Usa la nueva función
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
