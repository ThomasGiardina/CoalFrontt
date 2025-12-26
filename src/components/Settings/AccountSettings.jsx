import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

const AccountSettings = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const [formData, setFormData] = useState({
        id: "",
        username: "",
        telefono: "",
        firstName: "",
        lastName: "",
        email: "",
    });
    const [originalEmail, setOriginalEmail] = useState("");

    useEffect(() => {
        if (!token) return;

        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:4002/api/usuario/actual", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Error en la respuesta del servidor");
                }

                const userData = await response.json();

                setFormData({
                    id: userData.id,
                    username: userData.username,
                    telefono: userData.telefono || "",
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                });

                setOriginalEmail(userData.email);
            } catch (error) {
                console.error("Error al cargar los datos del usuario:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se pudieron cargar los datos del usuario.",
                    background: "#1D1F23",
                    color: "#fff",
                    confirmButtonColor: '#FF6828',
                    confirmButtonText: "Aceptar",
                });
            }
        };

        fetchUserData();
    }, [token]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePhoneInput = (e) => {
        const { name, value } = e.target;
        const onlyNums = value.replace(/[^0-9]/g, "");
        if (onlyNums.length <= 10) {
            handleInputChange({
                target: {
                    name,
                    value: onlyNums
                }
            });
        }
    };

    const handleSubmit = async () => {
        if (!token) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Debes iniciar sesión para guardar los cambios.",
                background: "#1D1F23",
                color: "#fff",
                confirmButtonColor: '#FF6828',
                confirmButtonText: "Aceptar",
            });
            return;
        }

        if (formData.telefono && (formData.telefono.length !== 10 || !formData.telefono.startsWith("11"))) {
            Swal.fire({
                icon: "error",
                title: "Error",
                background: "#1D1F23",
                color: "#fff",
                text: "Si se proporciona, el teléfono debe tener exactamente 10 dígitos y comenzar con 11.",
                confirmButtonColor: '#FF6828',
                confirmButtonText: "Aceptar",
            });
            return;
        }

        console.log("Datos enviados:", formData);

        try {
            const response = await fetch("http://localhost:4002/api/usuario/actualizar", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: formData.id,
                    username: formData.username,
                    telefono: formData.telefono || null,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                }),
            });

            if (response.ok) {
                if (formData.email !== originalEmail) {
                    Swal.fire({
                        icon: "success",
                        title: "Correo cambiado",
                        text: "Has cambiado tu correo electrónico. Por favor, cierra sesión y vuelve a iniciar sesión para continuar.",
                        background: "#1D1F23",
                        color: "#fff",
                        confirmButtonColor: '#FF6828',
                        confirmButtonText: "Cerrar sesión",
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                    }).then(() => {
                        dispatch(logout());
                        window.location.href = "/login";
                    });
                } else {
                    Swal.fire({
                        icon: "success",
                        title: "Cambios guardados",
                        text: "Los cambios fueron guardados exitosamente",
                        background: "#1D1F23",
                        color: "#fff",
                        confirmButtonColor: '#FF6828',
                        confirmButtonText: "Aceptar",
                    });
                }
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Hubo un problema al guardar los cambios",
                    background: "#1D1F23",
                    color: "#fff",
                    confirmButtonColor: '#FF6828',
                    confirmButtonText: "Aceptar",
                });
            }
        } catch (error) {
            console.error("Error al hacer la solicitud:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Error al guardar los cambios: " + error.message,
                background: "#1D1F23",
                color: "#fff",
                confirmButtonColor: '#FF6828',
                confirmButtonText: "Aceptar",
            });
        }
    };

    return (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1b1e] to-[#141517] border border-[#2a2b2e] shadow-xl">
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-[#FF6828]/5 to-transparent rounded-full blur-3xl"></div>

            <div className="relative p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6828] to-[#E57028] flex items-center justify-center shadow-lg shadow-[#FF6828]/20">
                        <i className="fa-solid fa-user text-white text-lg"></i>
                    </div>
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-white">Información Personal</h2>
                        <p className="text-gray-400 text-sm">Actualiza tus datos de cuenta</p>
                    </div>
                </div>

                <form className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                <i className="fa-solid fa-at text-[#FF6828] text-xs"></i>
                                Username <span className="text-[#FF6828]">*</span>
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                placeholder="@username"
                                className="w-full px-4 py-3 bg-[#0F1012] border border-[#2a2b2e] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6828] focus:ring-1 focus:ring-[#FF6828]/50 transition-all duration-300"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                <i className="fa-solid fa-phone text-[#FF6828] text-xs"></i>
                                Teléfono
                            </label>
                            <input
                                type="text"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handlePhoneInput}
                                placeholder="1123456789"
                                maxLength={10}
                                className="w-full px-4 py-3 bg-[#0F1012] border border-[#2a2b2e] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6828] focus:ring-1 focus:ring-[#FF6828]/50 transition-all duration-300"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                <i className="fa-solid fa-signature text-[#FF6828] text-xs"></i>
                                Nombre
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                placeholder="Tu nombre"
                                className="w-full px-4 py-3 bg-[#0F1012] border border-[#2a2b2e] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6828] focus:ring-1 focus:ring-[#FF6828]/50 transition-all duration-300"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                <i className="fa-solid fa-signature text-[#FF6828] text-xs"></i>
                                Apellido
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder="Tu apellido"
                                className="w-full px-4 py-3 bg-[#0F1012] border border-[#2a2b2e] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6828] focus:ring-1 focus:ring-[#FF6828]/50 transition-all duration-300"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                            <i className="fa-solid fa-envelope text-[#FF6828] text-xs"></i>
                            Correo Electrónico <span className="text-[#FF6828]">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="email@ejemplo.com"
                            className="w-full px-4 py-3 bg-[#0F1012] border border-[#2a2b2e] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6828] focus:ring-1 focus:ring-[#FF6828]/50 transition-all duration-300"
                        />
                    </div>
                </form>

                <div className="mt-8 flex justify-end">
                    <button
                        onClick={handleSubmit}
                        className="group relative px-8 py-3 bg-gradient-to-r from-[#FF6828] to-[#E57028] rounded-xl font-semibold text-white shadow-lg shadow-[#FF6828]/25 hover:shadow-[#FF6828]/40 transform hover:-translate-y-0.5 transition-all duration-300"
                    >
                        <span className="flex items-center gap-2">
                            <i className="fa-solid fa-floppy-disk"></i>
                            Guardar Cambios
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;
