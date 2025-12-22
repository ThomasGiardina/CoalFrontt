import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-neutral text-white border-t border-base-200">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <img alt="Coal" src="/logoCoalBlanco.png" className="w-8 h-8" />
                            <span className="text-xl font-semibold">Coal</span>
                        </div>
                        <div className="flex items-center gap-4 text-xl">
                            <a href="#" aria-label="Twitter" className="hover:text-primary transition-colors"><FaTwitter /></a>
                            <a href="#" aria-label="Facebook" className="hover:text-primary transition-colors"><FaFacebook /></a>
                            <a href="#" aria-label="Instagram" className="hover:text-primary transition-colors"><FaInstagram /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-3">Coal</h4>
                        <ul className="space-y-2 text-gray-300">
                            <li><Link to="/Store" className="hover:text-white">Tienda</Link></li>
                            <li><Link to="/About" className="hover:text-white">Acerca de</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-3">Tarjeta de regalo</h4>
                        <ul className="space-y-2 text-gray-300">
                            <li><Link to="/GiftCards" className="hover:text-white">Tarjeta de regalo</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-3">Ayuda</h4>
                        <ul className="space-y-2 text-gray-300">
                            <li><Link to="/Support" className="hover:text-white">Soporte</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="border-t border-base-200">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p className="text-sm text-gray-400">© 2024 Coal. Todos los derechos reservados.</p>
                    <div className="flex items-center gap-6 text-sm">
                        <a className="text-gray-400 hover:text-white">Términos y condiciones</a>
                        <a className="text-gray-400 hover:text-white">Política de privacidad</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
