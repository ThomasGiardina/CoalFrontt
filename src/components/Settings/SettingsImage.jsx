import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { updateProfileImage } from "../../redux/slices/authSlice";

const SettingsImage = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const profileImage = useSelector((state) => state.auth.profileImage);
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:4002/api/usuario/actual", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsername(data.username);
                    setUserId(data.id);

                    if (data.id) {
                        fetchUserImage(data.id);
                    }
                } else {
                    console.error("Error al obtener los datos del usuario");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchUserData();
    }, [token]);

    const fetchUserImage = async (id) => {
        try {
            const response = await fetch(`http://localhost:4002/api/usuario/imagen/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const blob = await response.blob();
                const imageUrl = URL.createObjectURL(blob);

                dispatch(updateProfileImage(imageUrl));
            } else {
                console.error("Error al obtener la imagen del usuario");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("imagen", file);

            try {
                const response = await fetch("http://localhost:4002/api/usuario/actualizar-imagen", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                });

                if (response.ok) {
                    Swal.fire({
                        icon: "success",
                        title: "Imagen actualizada",
                        text: "Tu imagen se ha actualizado correctamente.",
                        confirmButtonText: "Aceptar",
                    });

                    fetchUserImage(userId);
                } else {
                    console.error("Error al actualizar la imagen", response.status);
                }
            } catch (error) {
                console.error("Error al actualizar la imagen:", error);
            }
        }
    };

    return (
        <div className="relative min-h-[150px] sm:h-[180px] lg:h-[200px] w-full max-w-[650px] rounded-xl flex flex-col items-center justify-center bg-neutral p-4 sm:p-6">
            <div className="relative">
                <img
                    alt="Imagen de usuario"
                    src={profileImage || "https://www.vecteezy.com/free-vector/default-user"}
                    className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mb-2 sm:mb-3 rounded-full cursor-pointer object-cover"
                    onClick={() => document.getElementById("imageInput").click()}
                />
                <i
                    className="fa-solid fa-pen text-white cursor-pointer absolute bottom-0 sm:bottom-1 right-0 sm:right-1 bg-gray-800 p-1 sm:p-1.5 rounded-full text-xs sm:text-sm"
                    onClick={() => document.getElementById("imageInput").click()}
                ></i>
            </div>
            <p className="font-bold text-white mt-2 sm:mt-3 text-sm sm:text-base lg:text-lg break-words text-center px-2">{username}</p>
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