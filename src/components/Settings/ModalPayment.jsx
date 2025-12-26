import { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
    content: {
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '0',
        maxWidth: '600px',
        maxHeight: '90vh',
        margin: 'auto',
        padding: '0',
        overflow: 'visible',
        inset: '50% auto auto 50%',
        transform: 'translate(-50%, -50%)',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(4px)',
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
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1b1e] to-[#141517] border border-[#2a2b2e] shadow-2xl">
                {/* Background Decorative Elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#FF6828]/10 to-transparent rounded-full blur-3xl"></div>

                <div className="relative p-6 sm:p-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6828] to-[#E57028] flex items-center justify-center shadow-lg shadow-[#FF6828]/20">
                                <i className={`fa-solid ${isEditing ? 'fa-pen' : 'fa-plus'} text-white text-lg`}></i>
                            </div>
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold text-white">
                                    {isEditing ? 'Editar Tarjeta' : 'Nueva Tarjeta'}
                                </h2>
                                <p className="text-gray-400 text-sm">
                                    {isEditing ? 'Modifica los datos de tu tarjeta' : 'Agrega un nuevo método de pago'}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onRequestClose}
                            className="w-10 h-10 rounded-full bg-[#2a2b2e] hover:bg-[#3a3d46] flex items-center justify-center transition-colors"
                        >
                            <i className="fa-solid fa-xmark text-gray-400 hover:text-white"></i>
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {/* Owner Name */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                    <i className="fa-solid fa-user text-[#FF6828] text-xs"></i>
                                    Nombre del Titular
                                </label>
                                <input
                                    type="text"
                                    name="nombrePropietario"
                                    value={formData.nombrePropietario}
                                    onChange={handleInputChange}
                                    required
                                    maxLength="100"
                                    placeholder="Nombre completo"
                                    className={`w-full px-4 py-3 bg-[#0F1012] border ${nameError ? 'border-red-500' : 'border-[#2a2b2e]'} rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6828] focus:ring-1 focus:ring-[#FF6828]/50 transition-all duration-300`}
                                />
                                {nameError && <span className="text-red-400 text-xs flex items-center gap-1"><i className="fa-solid fa-circle-exclamation"></i>{nameError}</span>}
                            </div>

                            {/* Card Number */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                    <i className="fa-solid fa-credit-card text-[#FF6828] text-xs"></i>
                                    Número de Tarjeta
                                </label>
                                <input
                                    type="text"
                                    name="numeroTarjeta"
                                    value={formData.numeroTarjeta}
                                    onChange={handleInputChange}
                                    required
                                    maxLength="16"
                                    pattern="\d{16}"
                                    title="Debe ingresar 16 dígitos"
                                    placeholder="1234 5678 9012 3456"
                                    className="w-full px-4 py-3 bg-[#0F1012] border border-[#2a2b2e] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6828] focus:ring-1 focus:ring-[#FF6828]/50 transition-all duration-300 font-mono"
                                />
                            </div>

                            {/* CVV */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                    <i className="fa-solid fa-lock text-[#FF6828] text-xs"></i>
                                    CVV
                                </label>
                                <input
                                    type="text"
                                    name="codigoSeguridad"
                                    value={formData.codigoSeguridad}
                                    onChange={handleInputChange}
                                    maxLength="3"
                                    pattern="\d{3}"
                                    title="Debe ingresar 3 dígitos"
                                    placeholder="•••"
                                    disabled={isEditing}
                                    className={`w-full px-4 py-3 bg-[#0F1012] border border-[#2a2b2e] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6828] focus:ring-1 focus:ring-[#FF6828]/50 transition-all duration-300 font-mono ${isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                                />
                                {isEditing && <small className="text-gray-500 text-xs">El CVV no se puede modificar</small>}
                            </div>

                            {/* Expiry Date */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                    <i className="fa-solid fa-calendar text-[#FF6828] text-xs"></i>
                                    Fecha de Vencimiento
                                </label>
                                <input
                                    type="date"
                                    name="fechaVencimiento"
                                    value={formData.fechaVencimiento}
                                    onChange={handleInputChange}
                                    required
                                    className={`w-full px-4 py-3 bg-[#0F1012] border ${dateError ? 'border-red-500' : 'border-[#2a2b2e]'} rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6828] focus:ring-1 focus:ring-[#FF6828]/50 transition-all duration-300`}
                                />
                                {dateError && <span className="text-red-400 text-xs flex items-center gap-1"><i className="fa-solid fa-circle-exclamation"></i>{dateError}</span>}
                            </div>

                            {/* Address */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                    <i className="fa-solid fa-location-dot text-[#FF6828] text-xs"></i>
                                    Dirección
                                </label>
                                <input
                                    type="text"
                                    name="direccion"
                                    value={formData.direccion}
                                    onChange={handleInputChange}
                                    required
                                    maxLength="100"
                                    placeholder="Calle y número"
                                    className={`w-full px-4 py-3 bg-[#0F1012] border ${addressError ? 'border-red-500' : 'border-[#2a2b2e]'} rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6828] focus:ring-1 focus:ring-[#FF6828]/50 transition-all duration-300`}
                                />
                                {addressError && <span className="text-red-400 text-xs flex items-center gap-1"><i className="fa-solid fa-circle-exclamation"></i>{addressError}</span>}
                            </div>

                            {/* Card Type */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                    <i className="fa-solid fa-tag text-[#FF6828] text-xs"></i>
                                    Tipo de Tarjeta
                                </label>
                                <select
                                    name="tipoPago"
                                    value={formData.tipoPago}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-[#0F1012] border border-[#2a2b2e] rounded-xl text-white focus:outline-none focus:border-[#FF6828] focus:ring-1 focus:ring-[#FF6828]/50 transition-all duration-300 appearance-none cursor-pointer"
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23FF6828'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'right 1rem center',
                                        backgroundSize: '1.5rem',
                                    }}
                                >
                                    <option value="" className="bg-[#1a1b1e]">Seleccione tipo</option>
                                    <option value="CREDITO" className="bg-[#1a1b1e]">Crédito</option>
                                    <option value="DEBITO" className="bg-[#1a1b1e]">Débito</option>
                                </select>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onRequestClose}
                                className="flex-1 py-3 px-6 border border-[#3a3d46] rounded-xl font-semibold text-gray-400 hover:text-white hover:border-gray-500 transition-all duration-300"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={!!nameError || !!addressError || !!dateError}
                                className="flex-1 py-3 px-6 bg-gradient-to-r from-[#FF6828] to-[#E57028] rounded-xl font-semibold text-white shadow-lg shadow-[#FF6828]/25 hover:shadow-[#FF6828]/40 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <i className={`fa-solid ${isEditing ? 'fa-check' : 'fa-plus'}`}></i>
                                    {isEditing ? 'Guardar Cambios' : 'Agregar Tarjeta'}
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};

export default ModalPayment;
