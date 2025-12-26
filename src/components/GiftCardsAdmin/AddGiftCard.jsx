import { useState } from 'react';
import { useSelector } from 'react-redux';

const AddGiftCardButton = ({ addGiftCard }) => {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [mainImage, setMainImage] = useState(null);

    const token = useSelector((state) => state.auth.token);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setTitle('');
        setDescription('');
        setPrice('');
        setStock('');
        setMainImage(null);
        setShowModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        const giftCardData = {
            titulo: title,
            descripcion: description,
            precio: parseFloat(price),
            plataforma: "COAL",
            stock: parseInt(stock),
            giftCard: true,
            categorias: [],
            fechaLanzamiento: new Date().toISOString().split('T')[0],
            desarrolladora: "Coal",
        };

        formData.append('videojuego', JSON.stringify(giftCardData));

        if (mainImage) {
            formData.append('foto', mainImage);
        }

        try {
            const response = await fetch('http://localhost:4002/videojuegos', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            const responseText = await response.text();

            if (!response.ok) {
                console.error('Detalles del error:', responseText);
                throw new Error('Error al agregar la tarjeta');
            }

            let data;
            try {
                data = responseText ? JSON.parse(responseText) : giftCardData;
            } catch {
                data = giftCardData;
            }

            addGiftCard(data);
            handleCloseModal();
        } catch (error) {
            console.error('Error:', error);
            alert('Error al agregar la tarjeta');
        }
    };

    return (
        <>
            <button onClick={handleOpenModal} className="btn bg-gradient-to-r from-[#FF6828] to-[#E57028] hover:from-[#E57028] hover:to-[#FF6828] text-white border-none shadow-lg shadow-[#FF6828]/25 hover:shadow-[#FF6828]/40 transform hover:-translate-y-0.5 transition-all duration-300">Agregar Nueva Tarjeta</button>

            {showModal && (
                <div className="modal modal-open">
                    <div className="modal-box w-full max-w-2xl">
                        <h3 className="font-bold text-lg mb-4">Agregar Nueva Tarjeta de Regalo</h3>

                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Título</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ej: Tarjeta Coal $5000"
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
                                        placeholder="Descripción de la tarjeta"
                                        className="textarea textarea-bordered w-full h-32"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
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
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Imagen de portada</span>
                                    </label>
                                    <input
                                        type="file"
                                        className="file-input file-input-bordered w-full"
                                        onChange={(e) => setMainImage(e.target.files[0])}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="modal-action mt-4">
                                <button type="submit" className="btn bg-gradient-to-r from-[#FF6828] to-[#E57028] hover:from-[#E57028] hover:to-[#FF6828] text-white border-none shadow-lg shadow-[#FF6828]/25">Guardar</button>
                                <button type="button" className="btn" onClick={handleCloseModal}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddGiftCardButton;
