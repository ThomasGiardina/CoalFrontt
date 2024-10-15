import React, { useState, useEffect, useContext } from "react";
import Swal from 'sweetalert2';  
import ButtonSaveChanges from "./ButtonSaveChanges";
import InputsAccount from "./InputsAccount";
import { AuthContext } from '../../context/AuthContext';

const AccountSettings = () => {
    const { logout } = useContext(AuthContext); 
    const [formData, setFormData] = useState({
        id: "",
        username: "",  
        telefono: "",
        firstName: "",  
        lastName: "",  
        email: ""  
    });

    const [originalEmail, setOriginalEmail] = useState(""); 

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch("http://localhost:4002/api/usuario/actual", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,  
                        "Content-Type": "application/json",
                    },
                });
    
                if (!response.ok) {
                    throw new Error("Error en la respuesta del servidor");
                }
    
                const userData = await response.json();
                console.log("Username obtenido:", userData.username);
    
                setFormData({
                    id: userData.id,
                    username: userData.username,  
                    telefono: userData.telefono,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email  
                });

                setOriginalEmail(userData.email); 
            } catch (error) {
                console.error("Error al cargar los datos del usuario:", error);
            }
        };
        
        fetchUserData();
    }, []);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem('token'); 

        if (formData.telefono.length !== 10 || !formData.telefono.startsWith('11')) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El teléfono debe tener exactamente 10 dígitos y comenzar con 11.',
                confirmButtonText: 'Aceptar',
            });
            return; 
        }
    
        console.log("Datos enviados:", formData);  
    
        try {
            const response = await fetch("http://localhost:4002/api/usuario/actualizar", {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,  
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: formData.id,
                    username: formData.username,  
                    telefono: formData.telefono,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email  
                })
            });

            if (response.ok) {
                if (formData.email !== originalEmail) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Correo cambiado',
                        text: 'Has cambiado tu correo electrónico. Por favor, cierra sesión y vuelve a iniciar sesión para continuar.',
                        confirmButtonText: 'Cerrar sesión',
                        allowOutsideClick: false, 
                        allowEscapeKey: false 
                    }).then(() => {
                        logout(); 
                        window.location.href = '/login'; 
                    });
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Cambios guardados',
                        text: 'Los cambios fueron guardados exitosamente',
                        confirmButtonText: 'Aceptar',
                    });
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al guardar los cambios',
                    confirmButtonText: 'Aceptar',
                });
            }
        } catch (error) {
            console.error("Error al hacer la solicitud:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al guardar los cambios: ' + error.message,
                confirmButtonText: 'Aceptar',
            });
        }
    };

    return (
        <>
            <div className="h-[550px] w-[650px] rounded-xl flex flex-col bg-neutral">
                <h1 className="flex items-start ml-5 mt-5 text-3xl text-white">Configuraciones de Usuario</h1>
                <p className="flex items-start ml-5 mt-5 text-white">Aquí puedes cambiar la información de tu cuenta</p>
                <InputsAccount formData={formData} handleInputChange={handleInputChange} />
                <ButtonSaveChanges handleSubmit={handleSubmit} />
            </div>
        </>
    );
};

export default AccountSettings;
