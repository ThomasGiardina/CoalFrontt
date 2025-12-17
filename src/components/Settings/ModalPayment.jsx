import { useState, useEffect } from 'react';
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

const defaultFormData = {
    nombrePropietario: '',
    numeroTarjeta: '',
    codigoSeguridad: '',
    fechaVencimiento: '',
    direccion: '',
    tipoPago: '',
};

const ModalPayment = ({ isOpen, onRequestClose, onSave, initialFormData = defaultFormData }) => {
    const [formData, setFormData] = useState(defaultFormData);
    const [nameError, setNameError] = useState('');
    const [addressError, setAddressError] = useState('');  
    const [isEditing, setIsEditing] = useState(false);
    const [dateError, setDateError] = useState('');

    const validateName = (name) => {
        const regex = /^[a-zA-Z\s]{1,100}$/;  
        if (!regex.test(name)) {
            return 'El nombre solo debe contener letras y un máximo de 100 caracteres.';
        }
        return '';
    };

    const validateAddress = (address) => {
        const regex = /^[a-zA-Z0-9\s]{1,100}$/;  
        if (!regex.test(address)) {
            return 'La dirección solo debe contener letras, números y un máximo de 100 caracteres.';
        }
        return '';
    };

    const validateTipoPago = (tipo) => {
        if (!tipo || tipo === "") {
            return "Por favor seleccione un tipo de tarjeta.";
        }
        return "";
    };

    useEffect(() => {
        setFormData({
            ...initialFormData,
            codigoSeguridad: '', 
        });
        setIsEditing(!!initialFormData.id);
    }, [initialFormData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'nombrePropietario') {
            setNameError(validateName(value));
        } else if (name === 'direccion') {
            setAddressError(validateAddress(value));
        } else if (name === 'fechaVencimiento') {
            validateDate(value);
        }
    };

    const validateDate = (fecha) => {
        const today = new Date();  
        const selectedDate = new Date(fecha);  

        if (selectedDate <= today) {
            setDateError('La fecha de vencimiento debe ser mayor a la fecha actual.');
        } else {
            setDateError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const tipoPagoError = validateTipoPago(formData.tipoPago);
        if (tipoPagoError) {
            alert(tipoPagoError);
            return;
        }
    
        if (!isEditing && formData.codigoSeguridad.length !== 3) {
            alert('El código de seguridad debe tener exactamente 3 dígitos.');
            return;
        }
    
        if (dateError || nameError || addressError) {
            alert('Por favor corrige los errores antes de continuar.');
            return;
        }
    
        try {
            await onSave(formData);
            onRequestClose();
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
                            maxLength="100" 
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
                            maxLength="100"  
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
                            <option value="">Seleccione Tipo de Tarjeta</option>
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
