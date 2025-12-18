import { Link } from 'react-router-dom';
import xboxImage from '../../assets/xbox.jpg';
import playstationImage from '../../assets/playstation.jpg';
import nintendoImage from '../../assets/nintendo.jpg';
import pcImage from '../../assets/pc.jpg';

function ConsolesSection() {
    const consoles = [
        { name: 'XBOX', image: xboxImage, filter: 'XBOX' },
        { name: 'PlayStation', image: playstationImage, filter: 'PLAY_STATION' },
        { name: 'Nintendo Switch', image: nintendoImage, filter: 'NINTENDO_SWITCH' },
        { name: 'PC', image: pcImage, filter: 'PC' },
    ];

    return (
        <div className="w-full py-12 sm:py-16 lg:py-20">
            <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">Elegí tu aventura</h2>
                <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
                {consoles.map((console) => (
                    <Link 
                        key={console.filter}
                        to={{ pathname: "/store", search: `?filter=${console.filter}` }} 
                        className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 aspect-square"
                    >
                        <img 
                            src={console.image} 
                            alt={console.name} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-center">
                            <h3 className="text-white font-bold text-sm sm:text-base lg:text-lg drop-shadow-lg">{console.name}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ConsolesSection;