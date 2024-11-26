import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
        <footer className="text-base-content">
            <div className="footer footer-center p-10 bg-background">
                <nav className="grid grid-flow-col gap-6">
                    <a target='_blank' href='https://github.com/ThomasGiardina/CoalFrontt' className="btn btn-ghost btn-sm btn-circle">
                        <i className="fa-brands fa-github text-2xl"></i>
                    </a>
                    <a className="btn btn-ghost btn-sm btn-circle">
                        <i className="fa-brands fa-twitter text-2xl"></i>
                    </a>
                    <a className="btn btn-ghost btn-sm btn-circle">
                        <i className="fa-brands fa-facebook text-2xl"></i>
                    </a>
                    <a className="btn btn-ghost btn-sm btn-circle">
                        <i className="fa-brands fa-youtube text-2xl"></i>
                    </a>
                </nav>
                <nav>
                    <div className="flex flex-wrap justify-center gap-y-2 gap-x-6 text-lg">
                        <Link to="/Support" className="link link-hover">Contactanos</Link>
                        <a className="link link-hover">Servicios</a>
                        <a className="link link-hover">Politicas de Privacidad</a>
                        <a className="link link-hover">Terminos y Condiciones</a>
                        <Link to="/About" className="link link-hover">Acerca de Nosotros</Link>
                    </div>
                </nav>
            </div>
            <aside className="bg-background py-4 px-8 w-full flex gap-2 flex-wrap justify-between items-center text-sm">
                <p className="text-xl flex items-center gap-2">
                    <img alt="Logo" src="/logoCoalBlanco.png" className="w-8" />
                    <span>Coal</span>
                </p>
                <p>Copyright © 2024 - Todos Los Derechos Reservados</p>
            </aside>
        </footer>
        </>
    );
}

export default Footer;


