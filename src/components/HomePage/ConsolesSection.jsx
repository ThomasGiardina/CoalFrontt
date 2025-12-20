import { Link } from 'react-router-dom';
import { FaXbox, FaPlaystation, FaDesktop, FaArrowRight } from 'react-icons/fa';
import { SiNintendoswitch } from 'react-icons/si';

function ConsolesSection() {
    const platforms = [
        { name: 'Xbox', filter: 'XBOX', icon: FaXbox, color: 'text-green-500', gradient: 'from-green-500/20 to-transparent', games: '120+' },
        { name: 'PlayStation', filter: 'PLAY_STATION', icon: FaPlaystation, color: 'text-blue-500', gradient: 'from-blue-500/20 to-transparent', games: '150+' },
        { name: 'Switch', filter: 'NINTENDO_SWITCH', icon: SiNintendoswitch, color: 'text-red-500', gradient: 'from-red-500/20 to-transparent', games: '80+' },
        { name: 'PC', filter: 'PC', icon: FaDesktop, color: 'text-purple-400', gradient: 'from-purple-400/20 to-transparent', games: '200+' },
    ];

    return (
        <section className="py-16 sm:py-20">
            <div className="text-center mb-10">
                <span className="text-primary text-sm font-semibold tracking-wider uppercase">Plataformas</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">Elegí tu plataforma</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {platforms.map((platform) => {
                    const IconComponent = platform.icon;
                    return (
                        <Link key={platform.filter} to={{ pathname: "/Store", search: `?filter=${platform.filter}` }} className={`relative overflow-hidden rounded-2xl bg-neutral border border-base-200 hover:border-primary/40 p-6 sm:p-8 text-center group transition-all duration-300 hover:shadow-xl`}>
                            <div className={`absolute inset-0 bg-gradient-to-b ${platform.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                            <div className="relative z-10">
                                <IconComponent className={`text-4xl sm:text-5xl ${platform.color} mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`} />
                                <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{platform.name}</h3>
                                <p className="text-gray-400 text-sm">{platform.games} juegos</p>
                                <div className="mt-4 flex items-center justify-center gap-1 text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                    Ver juegos <FaArrowRight className="text-xs" />
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}

export default ConsolesSection;