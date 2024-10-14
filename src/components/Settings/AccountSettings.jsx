import React, { useState, useEffect } from "react";
import ButtonSaveChanges from "./ButtonSaveChanges";
import InputsAccount from "./InputsAccount";

const AccountSettings = () => {
    const [formData, setFormData] = useState({
        id: "",
        username: "",  // Aquí es para el verdadero username
        telefono: "",
        firstName: "",  // Usamos firstName en lugar de nombre
        lastName: "",  // Usamos lastName en lugar de apellido
        email: ""  // Aquí es para el email
    });

    // Cargar los datos del usuario desde el backend al montar el componente
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token"); // Obtener el token de localStorage
                console.log("Token:", token); // Verifica si el token está almacenado
                
                const response = await fetch("http://localhost:4002/api/usuario/actual", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,  // Asegúrate de enviar el token
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    console.error("Error de respuesta:", response.status); // Agregar código de error
                    throw new Error("Error en la respuesta del servidor");
                }

                const userData = await response.json();
                
                // Asegurarnos de asignar los valores correctos a cada campo
                setFormData({
                    id: userData.id,              
                    username: userData.username,  
                    telefono: userData.telefono,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email  
                });
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
        const token = localStorage.getItem('token');  // Obtener el token de localStorage

        console.log("Token obtenido:", token);
        console.log("Datos enviados:", formData);  // Verificar el formData que se está enviando

        try {
            const response = await fetch("http://localhost:4002/api/usuario/actualizar", {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,  // Asegúrate de enviar el token
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)  // Envías los datos del formulario, incluyendo el ID
            });

            if (response.ok) {
                alert("Cambios guardados exitosamente");
            } else {
                alert("Error al guardar los cambios");
            }
        } catch (error) {
            console.error("Error al hacer la solicitud:", error);
        }
    };

    return (
        <>
            <div className="h-[550px] w-[650px] rounded-xl flex flex-col " style={{ backgroundColor: "#2c3e50" }}>
                <h1 className="flex items-start ml-5 mt-5 text-3xl text-white">Configuraciones de Usuario</h1>
                <p className="flex items-start ml-5 mt-5 text-white">Aquí puedes cambiar la información de tu cuenta</p>
                <InputsAccount formData={formData} handleInputChange={handleInputChange} />
                <ButtonSaveChanges handleSubmit={handleSubmit} />
            </div>
        </>
    );
};

export default AccountSettings;
