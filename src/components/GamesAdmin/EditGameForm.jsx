import React, { useState} from 'react';
import { useSelector } from "react-redux";


const EditGameButton = ({ game, updateGame, closeModal }) => {
    const [selectedCategories, setSelectedCategories] = useState(game.categorias || []);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [title, setTitle] = useState(game.titulo);
    const [description, setDescription] = useState(game.descripcion);
    const [price, setPrice] = useState(game.precio);
    const [platform, setPlatform] = useState(game.plataforma);
    const [stock, setStock] = useState(game.stock);
    const [mainImage, setMainImage] = useState(null);
    const [carruselImagen1, setCarruselImagen1] = useState(null);
    const [carruselImagen2, setCarruselImagen2] = useState(null);
    const [carruselImagen3, setCarruselImagen3] = useState(null);
    const [fechaLanzamiento, setFechaLanzamiento] = useState(game.fechaLanzamiento);
    const [desarrolladora, setDesarrolladora] = useState(game.desarrolladora);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); //por ahora no se usa
    const role = useSelector((state) => state.auth.role);

    const allCategories = [
        "ACCION", "AVENTURA", "RPG", "SIMULACION", "DEPORTES", "ESTRATEGIA", 
        "PUZZLE", "TERROR", "VR", "EDUCATIVO"
    ];

    const handleCategorySelect = (category) => {
        if (!selectedCategories.includes(category)) {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const handleCategoryRemove = (category) => {
        setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    };

    const token = useSelector((state) => state.auth.token);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const updatedGame = {
            id: game.id,
            titulo: title,
            descripcion: description,
            precio: price,
            plataforma: platform,
            stock: stock,
            categorias: selectedCategories,
            fechaLanzamiento: fechaLanzamiento,
            desarrolladora: desarrolladora,
        };
    
        const formData = new FormData();
        formData.append('videojuego', JSON.stringify(updatedGame));
    
        if (mainImage) {
            formData.append('foto', mainImage);
        }
    
        if (carruselImagen1) {
            formData.append('carruselImagen1', carruselImagen1);
        }
    
        if (carruselImagen2) {
            formData.append('carruselImagen2', carruselImagen2);
        }
    
        if (carruselImagen3) {
            formData.append('carruselImagen3', carruselImagen3);
        }

        if (!token) {
            console.error("Token no disponible. El usuario no está autenticado.");
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:4002/videojuegos/${game.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Detalles del error:', errorData);
                throw new Error('Error al actualizar el videojuego');
            }
    
            const data = await response.json();
    
            updateGame(data);
            closeModal();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="modal modal-open">
            <div className="modal-box w-full max-w-5xl">
                <h3 className="font-bold text-lg mb-4">Editar Juego</h3>

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
                                    className="textarea textarea-bordered w-full h-72"
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
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Imagen Carrousel 1</span>
                                </label>
                                <input
                                    type="file"
                                    className="file-input file-input-bordered w-full"
                                    onChange={(e) => setCarruselImagen1(e.target.files[0])}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Imagen Carrousel 2</span>
                                </label>
                                <input
                                    type="file"
                                    className="file-input file-input-bordered w-full"
                                    onChange={(e) => setCarruselImagen2(e.target.files[0])}
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
                                    <span className="label-text">Imagen Carrousel 3</span>
                                </label>
                                <input
                                    type="file"
                                    className="file-input file-input-bordered w-full"
                                    onChange={(e) => setCarruselImagen3(e.target.files[0])}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="modal-action mt-4">
                        <button type="submit" className="btn btn-primary">Guardar cambios</button>
                        <button type="button" className="btn" onClick={closeModal}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditGameButton;
