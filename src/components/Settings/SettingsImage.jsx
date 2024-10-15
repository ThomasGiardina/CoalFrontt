import { useState, useEffect } from "react";

const SettingsImage = () => {
    const [imageSrc, setImageSrc] = useState("");  // Inicializar sin imagen por defecto
    const [username, setUsername] = useState("");

    // Cargar datos del usuario desde el backend, incluyendo la imagen de perfil
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
    
                    // Aquí es donde tienes que ajustar la imagen
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
            formData.append('imagen', file);  // Enviamos el archivo en un FormData
    
            try {
                const token = localStorage.getItem("token");  // Obtener el token de localStorage
                const response = await fetch("http://localhost:4002/api/usuario/actualizar-imagen", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,  // Aseguramos de enviar el token
                    },
                    body: formData
                });
    
                // Manejo de la respuesta como texto, no como JSON
                const responseText = await response.text();
                console.log(responseText); // Para ver el mensaje
    
                if (response.ok) {
                    alert("Imagen actualizada correctamente");
                } else {
                    alert("Error al actualizar la imagen");
                }
            } catch (error) {
                console.error("Error al actualizar la imagen:", error);
                alert("Error al actualizar la imagen");
            }
        }
    };

    return (
        <div className="relative h-[200px] w-[650px] rounded-xl flex flex-col items-center justify-center" style={{ backgroundColor: "#2c3e50" }}>
            <div className="relative">
                <img
                    alt="Logo"
                    src={imageSrc}  // Mostrar la imagen cargada
                    className="w-24 h-24 mb-3 rounded-full cursor-pointer"
                    onClick={() => document.getElementById("imageInput").click()}
                />
                <i
                    className="fa-solid fa-pen text-white cursor-pointer absolute bottom-1 right-1 bg-gray-800 p-1 rounded-full"
                    onClick={() => document.getElementById("imageInput").click()}
                ></i>
            </div>
            <p className="font-bold text-white mt-3">{username}</p>  {/* Mostrar el username */}
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
