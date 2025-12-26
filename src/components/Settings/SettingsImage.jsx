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
    const [isHovering, setIsHovering] = useState(false);

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
                        confirmButtonColor: '#FF6828',
                        background: '#1D1F23',
                        color: '#fff',
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
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1b1e] to-[#141517] border border-[#2a2b2e] shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF6828]/10 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#E57028]/10 to-transparent rounded-full blur-2xl"></div>

            <div className="relative p-6 sm:p-8 flex flex-col items-center">
                <div
                    className="relative group cursor-pointer"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    onClick={() => document.getElementById("imageInput").click()}
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#FF6828] to-[#E57028] rounded-full opacity-75 blur group-hover:opacity-100 transition duration-300"></div>

                    <div className="relative">
                        <img
                            alt="Imagen de usuario"
                            src={profileImage || "https://www.vecteezy.com/free-vector/default-user"}
                            className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full object-cover border-4 border-[#1a1b1e] transition-transform duration-300 group-hover:scale-105"
                        />

                        <div className={`absolute inset-0 flex items-center justify-center rounded-full bg-black/60 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
                            <div className="text-center">
                                <i className="fa-solid fa-camera text-white text-xl mb-1"></i>
                                <p className="text-white text-xs font-medium">Cambiar foto</p>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-1 right-1 w-8 h-8 bg-gradient-to-r from-[#FF6828] to-[#E57028] rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                        <i className="fa-solid fa-pen text-white text-xs"></i>
                    </div>
                </div>

                <h2 className="mt-5 text-xl sm:text-2xl font-bold text-white">{username}</h2>
                <p className="mt-1 text-gray-400 text-sm">Haz clic en la foto para cambiarla</p>

                <input
                    type="file"
                    id="imageInput"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>
        </div>
    );
};

export default SettingsImage;