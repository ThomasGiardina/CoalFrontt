import { Link } from 'react-router-dom';
import { FaGithub, FaTwitter, FaFacebook, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-base-100 text-base-content border-t border-base-200">
            {/* Main footer content */}
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-8 flex flex-col items-center gap-6">
                    {/* Social icons */}
                    <nav className="flex gap-4">
                        <a
                            target='_blank'
                            href='https://github.com/ThomasGiardina/CoalFrontt'
                            className="btn btn-ghost btn-circle btn-sm hover:btn-primary hover:text-white transition-colors"
                        >
                            <FaGithub className="text-lg" />
                        </a>
                        <a className="btn btn-ghost btn-circle btn-sm hover:btn-primary hover:text-white transition-colors">
                            <FaTwitter className="text-lg" />
                        </a>
                        <a className="btn btn-ghost btn-circle btn-sm hover:btn-primary hover:text-white transition-colors">
                            <FaFacebook className="text-lg" />
                        </a>
                        <a className="btn btn-ghost btn-circle btn-sm hover:btn-primary hover:text-white transition-colors">
                            <FaYoutube className="text-lg" />
                        </a>
                    </nav>

                    {/* Links */}
                    <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                        <Link to="/Support" className="link link-hover text-sm text-gray-400 hover:text-white transition-colors">Contactanos</Link>
                        <a className="link link-hover text-sm text-gray-400 hover:text-white transition-colors">Servicios</a>
                        <a className="link link-hover text-sm text-gray-400 hover:text-white transition-colors">Políticas de Privacidad</a>
                        <a className="link link-hover text-sm text-gray-400 hover:text-white transition-colors">Términos y Condiciones</a>
                        <Link to="/About" className="link link-hover text-sm text-gray-400 hover:text-white transition-colors">Acerca de Nosotros</Link>
                    </nav>
                </div>
            </div>

            {/* Bottom bar - matches navbar height of 64px */}
            <div className="border-t border-base-200 bg-base-100">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-16 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <img alt="Logo" src="/logoCoalBlanco.png" className="w-8" />
                            <span className="font-bold text-white">Coal</span>
                        </div>
                        <p className="text-sm text-gray-400">Copyright © 2024 - Todos Los Derechos Reservados</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
