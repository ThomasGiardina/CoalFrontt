import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

const SettingsImage = () => {
    const [imageSrc, setImageSrc] = useState("");  
    const [username, setUsername] = useState("");

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
    
                if (response.ok) {
                    const data = await response.json();
                    setUsername(data.username);
    
                    if (data.imagenPerfil) {
                        setImageSrc(`http://localhost:4002/api/usuario/imagen/${data.imagenPerfil}`);
                    }
                } else {
                    console.error("Error al obtener los datos del usuario");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };
    
        fetchUserData();
    }, []);

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('imagen', file); 
    
            try {
                const token = localStorage.getItem("token");  
                const response = await fetch("http://localhost:4002/api/usuario/actualizar-imagen", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,  
                    },
                    body: formData
                });

                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Imagen actualizada',
                        text: 'Tu imagen se ha actualizado correctamente.',
                        confirmButtonText: 'Aceptar',
                        background: '#1D1F23',
                        color: '#fff',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Hubo un problema al actualizar la imagen.',
                        confirmButtonText: 'Aceptar',
                        background: '#1D1F23',
                        color: '#fff',
                    });
                }
            } catch (error) {
                console.error("Error al actualizar la imagen:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al actualizar la imagen.',
                    confirmButtonText: 'Aceptar',
                    background: '#1D1F23',
                    color: '#fff',
                });
            }
        }
    };

    return (
        <div className="relative h-[200px] w-[650px] rounded-xl flex flex-col items-center justify-center bg-neutral">
            <div className="relative">
                <img
                    alt="Logo"
                    src={imageSrc}  
                    className="w-24 h-24 mb-3 rounded-full cursor-pointer"
                    onClick={() => document.getElementById("imageInput").click()}
                />
                <i
                    className="fa-solid fa-pen text-white cursor-pointer absolute bottom-1 right-1 bg-gray-800 p-1 rounded-full"
                    onClick={() => document.getElementById("imageInput").click()}
                ></i>
            </div>
            <p className="font-bold text-white mt-3">{username}</p> 
            <input
                type="file"
                id="imageInput"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}  
            />
        </div>
    );
};

export default SettingsImage;
