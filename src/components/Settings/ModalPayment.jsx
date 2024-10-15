import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
    content: {
        backgroundColor: '#1C1C1E',
        borderRadius: '10px',
        maxWidth: '800px',
        maxHeight: '500px',
        margin: 'auto',
        padding: '20px',
        color: 'white',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 1000,
    },
};

// Valores iniciales por defecto
const defaultFormData = {
    nombrePropietario: '',
    numeroTarjeta: '',
    codigoSeguridad: '',
    fechaVencimiento: '',
    direccion: '',
    tipoPago: 'CREDITO',
};

const ModalPayment = ({ isOpen, onRequestClose, onSave, initialFormData = defaultFormData }) => {
    const [formData, setFormData] = useState(defaultFormData);
    const [nameError, setNameError] = useState('');
    const [addressError, setAddressError] = useState('');  // Para manejar errores de dirección
    const [isEditing, setIsEditing] = useState(false);
    const [dateError, setDateError] = useState('');

    // Función para validar el nombre (máx. 100 caracteres, solo letras)
    const validateName = (name) => {
        const regex = /^[a-zA-Z\s]{1,100}$/;  // Solo letras y espacios, máx. 100 caracteres
        if (!regex.test(name)) {
            return 'El nombre solo debe contener letras y un máximo de 100 caracteres.';
        }
        return '';
    };

    // Función para validar la dirección (máx. 100 caracteres, solo letras y números)
    const validateAddress = (address) => {
        const regex = /^[a-zA-Z0-9\s]{1,100}$/;  // Solo letras, números y espacios, máx. 100 caracteres
        if (!regex.test(address)) {
            return 'La dirección solo debe contener letras, números y un máximo de 100 caracteres.';
        }
        return '';
    };

    // Si estás editando, carga los datos y asegúrate de que el campo CVV esté vacío
    useEffect(() => {
        setFormData({
            ...initialFormData,
            codigoSeguridad: '',  // El CVV debe estar vacío al editar
        });
        setIsEditing(!!initialFormData.id);
    }, [initialFormData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Validar nombre y dirección en tiempo real
        if (name === 'nombrePropietario') {
            setNameError(validateName(value));
        } else if (name === 'direccion') {
            setAddressError(validateAddress(value));
        } else if (name === 'fechaVencimiento') {
            validateDate(value);
        }
    };

    // Validar que la fecha ingresada sea mayor a la actual
    const validateDate = (fecha) => {
        const today = new Date();  // Fecha actual
        const selectedDate = new Date(fecha);  // Fecha ingresada

        if (selectedDate <= today) {
            setDateError('La fecha de vencimiento debe ser mayor a la fecha actual.');
        } else {
            setDateError('');
        }
    };

    // Validar y enviar datos al backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que el CVV sea requerido solo si es nuevo o se está cambiando
        if (!isEditing && formData.codigoSeguridad.length !== 3) {
            alert('El código de seguridad debe tener exactamente 3 dígitos.');
            return;
        }

        // Si hay un error en la fecha, nombre o dirección, no permitir guardar
        if (dateError || nameError || addressError) {
            alert('Por favor corrige los errores antes de continuar.');
            return;
        }

        try {
            await onSave(formData); // Guardar datos
            onRequestClose();       // Cerrar modal
        } catch (error) {
            console.error('Error al guardar el método de pago:', error);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
        >
            <h2 className="text-2xl mb-4">{isEditing ? 'Editar Método de Pago' : 'Agregar Método de Pago'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2">Nombre del Propietario</label>
                        <input
                            type="text"
                            name="nombrePropietario"
                            value={formData.nombrePropietario}
                            onChange={handleInputChange}
                            required
                            maxLength="100"  // Limitar a 100 caracteres
                            className={`input input-bordered w-full bg-gray-700 text-white ${nameError ? 'border-red-500' : ''}`}
                        />
                        {nameError && <span className="text-red-500 text-sm">{nameError}</span>}
                    </div>
                    <div>
                        <label className="block mb-2">Número de Tarjeta</label>
                        <input
                            type="text"
                            name="numeroTarjeta"
                            value={formData.numeroTarjeta}
                            onChange={handleInputChange}
                            required
                            className="input input-bordered w-full bg-gray-700 text-white"
                            maxLength="16"
                            pattern="\d{16}"
                            title="Debe ingresar 16 dígitos"
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Código de Seguridad</label>
                        <input
                            type="text"
                            name="codigoSeguridad"
                            value={formData.codigoSeguridad}
                            onChange={handleInputChange}
                            className="input input-bordered w-full bg-gray-700 text-white"
                            maxLength="3"
                            pattern="\d{3}"
                            title="Debe ingresar 3 dígitos"
                            disabled={isEditing}
                        />
                        {isEditing && <small className="text-gray-400">No puedes cambiar el CVV al editar.</small>}
                    </div>
                    <div>
                        <label className="block mb-2">Fecha de Vencimiento</label>
                        <input
                            type="date"
                            name="fechaVencimiento"
                            value={formData.fechaVencimiento}
                            onChange={handleInputChange}
                            required
                            className="input input-bordered w-full bg-gray-700 text-white"
                        />
                        {dateError && <span className="text-red-500 text-sm">{dateError}</span>}
                    </div>
                    <div>
                        <label className="block mb-2">Dirección</label>
                        <input
                            type="text"
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleInputChange}
                            required
                            maxLength="100"  // Limitar a 100 caracteres
                            className={`input input-bordered w-full bg-gray-700 text-white ${addressError ? 'border-red-500' : ''}`}
                        />
                        {addressError && <span className="text-red-500 text-sm">{addressError}</span>}
                    </div>
                    <div>
                        <label className="block mb-2">Tipo de Pago</label>
                        <select
                            name="tipoPago"
                            value={formData.tipoPago}
                            onChange={handleInputChange}
                            className="select select-bordered w-full bg-gray-700 text-white"
                        >
                            <option value="CREDITO">CREDITO</option>
                            <option value="DEBITO">DEBITO</option>
                        </select>
                    </div>
                </div>
                <div className="modal-action mt-10">
                    <button type="submit" className="btn btn-primary" disabled={!!nameError || !!addressError || !!dateError}>Guardar</button>
                    <button type="button" className="btn" onClick={onRequestClose}>Cancelar</button>
                </div>
            </form>
        </Modal>
    );
};

export default ModalPayment;
