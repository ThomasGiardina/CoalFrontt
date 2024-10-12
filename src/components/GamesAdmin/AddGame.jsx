import React, { useState } from 'react';

const AddGameButton = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const allCategories = [
        "Acción", "Aventura", "RPG", "Simulación", "Deportes", "Estrategia", 
        "Puzzle", "Terror", "VR", "Educativo"
    ];

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleCategorySelect = (category) => {
        if (!selectedCategories.includes(category)) {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const handleCategoryRemove = (category) => {
        setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Categorías seleccionadas: ", selectedCategories);
        setShowModal(false); 
    };

    return (
        <>
            <button onClick={handleOpenModal} className="btn btn-primary">Agregar un Nuevo Juego</button>

            {showModal && (
                <div className="modal modal-open">
                    <div className="modal-box w-full max-w-5xl"> 
                        <h3 className="font-bold text-lg mb-4">Agregar un Nuevo Juego</h3>

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-4"> 
                                <div className="space-y-4">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Título</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            placeholder="Ingresa el título del juego" 
                                            className="input input-bordered w-full" 
                                            required
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Descripción</span>
                                        </label>
                                        <textarea 
                                            placeholder="Ingresa la descripción del juego" 
                                            className="textarea textarea-bordered w-full h-64"  
                                            required
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Precio</span>
                                        </label>
                                        <input 
                                            type="number" 
                                            placeholder="Precio en ARS" 
                                            className="input input-bordered w-full" 
                                            step="0.01"
                                            min="0" 
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Plataforma</span>
                                        </label>
                                        <select className="select select-bordered w-full" required>
                                            <option value="PC">PC</option>
                                            <option value="XBOX">XBOX</option>
                                            <option value="PLAY_STATION">PlayStation</option>
                                            <option value="NINTENDO_SWITCH">Nintendo Switch</option>
                                        </select>
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Categorías</span>
                                        </label>
                                        <div className="relative">
                                            <button
                                                type="button"
                                                className="btn btn-outline w-full"
                                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                            >
                                                Seleccionar categorías
                                            </button>
                                            {dropdownOpen && (
                                                <ul className="absolute z-10 mt-2 p-2 w-full bg-base-100 border border-gray-300 rounded-lg shadow">
                                                    {allCategories.map((category) => (
                                                        <li
                                                            key={category}
                                                            onClick={() => handleCategorySelect(category)}
                                                            className={`cursor-pointer hover:bg-primary hover:text-white p-2 rounded-lg 
                                                                ${selectedCategories.includes(category) ? 'bg-primary text-white' : ''}`}
                                                        >
                                                            {category}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {selectedCategories.map((category) => (
                                                <div key={category} className="badge badge-primary">
                                                    {category}
                                                    <button
                                                        type="button"
                                                        className="ml-1"
                                                        onClick={() => handleCategoryRemove(category)}
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Stock</span>
                                        </label>
                                        <input 
                                            type="number" 
                                            placeholder="Stock disponible" 
                                            className="input input-bordered w-full" 
                                            min="0"
                                            required
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Imagen principal</span>
                                        </label>
                                        <input type="file" className="file-input file-input-bordered w-full" />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Imagen secundaria</span>
                                        </label>
                                        <input type="file" className="file-input file-input-bordered w-full" />
                                    </div>
                                </div>
                            </div>

                            <div className="modal-action mt-4">
                                <button type="submit" className="btn btn-primary">Guardar</button>
                                <button type="button" className="btn" onClick={handleCloseModal}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddGameButton;
