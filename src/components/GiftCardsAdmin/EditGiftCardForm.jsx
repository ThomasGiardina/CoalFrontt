import { useState } from 'react';
import { useSelector } from "react-redux";

const EditGiftCardForm = ({ giftCard, updateGiftCard, closeModal }) => {
    const [title, setTitle] = useState(giftCard.titulo);
    const [description, setDescription] = useState(giftCard.descripcion);
    const [price, setPrice] = useState(giftCard.precio);
    const [stock, setStock] = useState(giftCard.stock);
    const [mainImage, setMainImage] = useState(null);

    const token = useSelector((state) => state.auth.token);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedGiftCard = {
            id: giftCard.id,
            titulo: title,
            descripcion: description,
            precio: parseFloat(price),
            plataforma: "COAL",
            stock: parseInt(stock),
            giftCard: true,
            categorias: [],
            fechaLanzamiento: giftCard.fechaLanzamiento || new Date().toISOString().split('T')[0],
            desarrolladora: "Coal",
        };

        const formData = new FormData();
        formData.append('videojuego', JSON.stringify(updatedGiftCard));

        if (mainImage) {
            formData.append('foto', mainImage);
        }

        if (!token) {
            console.error("Token no disponible. El usuario no está autenticado.");
            return;
        }


        try {
            const response = await fetch(`http://localhost:4002/videojuegos/${giftCard.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            const responseText = await response.text();

            if (!response.ok) {
                console.error('Detalles del error:', responseText);
                throw new Error('Error al actualizar la tarjeta');
            }

            // Try to parse JSON, otherwise use the updated data we sent
            let data;
            try {
                data = responseText ? JSON.parse(responseText) : { ...updatedGiftCard, foto: giftCard.foto };
            } catch {
                // If parsing fails, use our local data with existing photo
                data = { ...updatedGiftCard, foto: giftCard.foto };
            }

            updateGiftCard(data);
            closeModal();
        } catch (error) {
            console.error('Error:', error);
            alert('Error al guardar los cambios');
        }
    };

    return (
        <div className="modal modal-open">
            <div className="modal-box w-full max-w-2xl">
                <h3 className="font-bold text-lg mb-4">Editar Tarjeta de Regalo</h3>

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
                            />
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

export default EditGiftCardForm;
