import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'; 

const AddGameButton = ({ addGame }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [platform, setPlatform] = useState('');
    const [stock, setStock] = useState('');
    const [mainImage, setMainImage] = useState(null);
    const [secondaryImage, setSecondaryImage] = useState(null);
    const [fechaLanzamiento, setFechaLanzamiento] = useState('');
    const [desarrolladora, setDesarrolladora] = useState('');
    const { isAuthenticated, role } = useContext(AuthContext); 

    const allCategories = [
        "ACCION", "AVENTURA", "RPG", "SIMULACION", "DEPORTES", "ESTRATEGIA", 
        "PUZZLE", "TERROR", "VR", "EDUCATIVO"
    ];

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        // Limpiar los campos y cerrar el modal
        setTitle('');
        setDescription('');
        setPrice('');
        setPlatform('');
        setStock('');
        setMainImage(null);
        setSecondaryImage(null);
        setSelectedCategories([]);
        setFechaLanzamiento('');
        setDesarrolladora('');
        setShowModal(false);
    };

    // Definir la función handleCategorySelect
    const handleCategorySelect = (category) => {
        if (!selectedCategories.includes(category)) {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const handleCategoryRemove = (category) => {
        setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
    
        // Convertir el objeto videojuego a JSON y agregarlo como una parte llamada "videojuego"
        const videojuego = {
            titulo: title,
            descripcion: description,
            precio: price,
            plataforma: platform,
            stock: stock,
            categorias: selectedCategories,
            fechaLanzamiento: fechaLanzamiento,
            desarrolladora: desarrolladora,
        };
        formData.append('videojuego', new Blob([JSON.stringify(videojuego)], { type: 'application/json' }));
    
        if (mainImage) {
            formData.append('foto', mainImage); // Agregar la imagen principal
        }
    
        if (secondaryImage) {
            formData.append('foto2', secondaryImage); // Agregar la imagen secundaria
        }
    
        const token = localStorage.getItem('token');
        console.log('Token enviado en la solicitud:', token);
    
        try {
            const response = await fetch('http://localhost:4002/videojuegos', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData, // FormData maneja los archivos y los datos
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Detalles del error:', errorData);  
                throw new Error('Error al agregar el videojuego');
            }
    
            const data = await response.json();
            console.log('Videojuego creado: ', data);
            
            addGame(data); // Lógica para añadir el videojuego al estado
    
        } catch (error) {
            console.error('Error:', error);
        }
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
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
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
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
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
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Plataforma</span>
                                        </label>
                                        <select
                                            className="select select-bordered w-full"
                                            value={platform}
                                            onChange={(e) => setPlatform(e.target.value)}
                                            required
                                        >
                                            <option value="">Selecciona una plataforma</option>
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
                                            value={stock}
                                            onChange={(e) => setStock(e.target.value)}
                                            min="0"
                                            required
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Fecha de lanzamiento</span>
                                        </label>
                                        <input
                                            type="date"
                                            className="input input-bordered w-full"
                                            value={fechaLanzamiento}
                                            onChange={(e) => setFechaLanzamiento(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Desarrolladora</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Ingresa la desarrolladora"
                                            className="input input-bordered w-full"
                                            value={desarrolladora}
                                            onChange={(e) => setDesarrolladora(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Imagen principal</span>
                                        </label>
                                        <input
                                            type="file"
                                            className="file-input file-input-bordered w-full"
                                            onChange={(e) => setMainImage(e.target.files[0])}
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Imagen secundaria</span>
                                        </label>
                                        <input
                                            type="file"
                                            className="file-input file-input-bordered w-full"
                                            onChange={(e) => setSecondaryImage(e.target.files[0])}
                                        />
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
