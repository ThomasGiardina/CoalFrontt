import React from 'react';
import { Link } from 'react-router-dom';
import xboxImage from '../../assets/xbox.jpg';
import playstationImage from '../../assets/playstation.jpg';
import nintendoImage from '../../assets/nintendo.jpg';
import pcImage from '../../assets/pc.jpg';

function ConsolesSection() {
    return (
        <div className="w-full flex flex-col items-center mt-20">
            <h2 className="text-2xl font-bold text-white mb-10">Elegí tu aventura</h2>
            <div className="w-full flex justify-around mb-20">
                <Link to={{ pathname: "/store", search: "?filter=XBOX" }} className="console-box w-40 h-40">
                    <img src={xboxImage} alt="XBOX" className="w-full h-full object-cover rounded-lg transition-transform transform hover:scale-110" />
                </Link>
                <Link to={{ pathname: "/store", search: "?filter=PLAY_STATION" }} className="console-box w-40 h-40">
                    <img src={playstationImage} alt="PLAYSTATION" className="w-full h-full object-cover rounded-lg transition-transform transform hover:scale-110" />
                </Link>
                <Link to={{ pathname: "/store", search: "?filter=NINTENDO_SWITCH" }} className="console-box w-40 h-40">
                    <img src={nintendoImage} alt="NINTENDO SWITCH" className="w-full h-full object-cover rounded-lg transition-transform transform hover:scale-110" />
                </Link>
                <Link to={{ pathname: "/store", search: "?filter=PC" }} className="console-box w-40 h-40">
                    <img src={pcImage} alt="PC" className="w-full h-full object-cover rounded-lg transition-transform transform hover:scale-110" />
                </Link>
            </div>
        </div>
    );
}

export default ConsolesSection;