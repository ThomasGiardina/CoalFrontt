const Footer = () => {
    return (

        <>
        <footer className="footer bg-base-200 text-base-content p-10 mt-20 ">
            <aside>
                <div className="flex items-center   ">
                <img src="/logoCoalBlanco.png" alt="Logo Coal Blanco" width="50" height="50"/>
                <a className="text-3xl ml-3 font-bold">Coal</a>
                </div>
                <p>
                © 2024 Coal Corporation.
                <br />
                Todos los derechos reservados.
                </p>
            </aside>
            <nav>
                <h6 className="footer-title">Services</h6>
                <a className="link link-hover">Branding</a>
                <a className="link link-hover">Design</a>
                <a className="link link-hover">Marketing</a>
                <a className="link link-hover">Advertisement</a>
            </nav>
            <nav>
                <h6 className="footer-title">Company</h6>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </nav>
            <nav>
                <h6 className="footer-title">Contactanos</h6>
                <div className="flex items-center">
                    <i class="fa-brands fa-instagram"></i> <a className="ml-2">@Luigi_Aducci</a>
                </div>
                <div>
                    <i class="fa-brands fa-twitter"></i> <a className="ml-1">@Luigi_Aducci</a>
                </div>
                <div>
                    <i class="fa-brands fa-linkedin"></i> <a className="ml-2">LuigiValentino</a> 
                </div>
                <div>
                    <i class="fa-solid fa-envelope"></i> <a className="ml-2">luigiAdu@gmail.com</a> 
                </div>
            </nav>
            </footer>
        
        </>

    )

}

export default Footer;


