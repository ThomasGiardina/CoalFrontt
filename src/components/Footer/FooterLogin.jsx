const FooterLogin = () => {
    return (

        <>
        <footer className="footer bg-base-200 text-base-content p-10">
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
                <h6 className="footer-title">Legal</h6>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </nav>
            </footer>
        
        </>

    )

}

export default FooterLogin;