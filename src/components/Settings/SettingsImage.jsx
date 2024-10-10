import { useState } from "react";

const SettingsImage = () => {
    const [imageSrc, setImageSrc] = useState("./defaultUser.jpg");

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result); 
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="relative h-[200px] w-[650px] rounded-xl flex flex-col items-center justify-center" style={{backgroundColor:"#2c3e50"}}>
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
            <p className="font-bold text-white mt-3">Luigi Aducci</p>
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
