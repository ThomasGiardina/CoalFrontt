const Footer = () => {
    return (

        <>
        <footer class="text-base-content ">
            <div class="footer footer-center p-10 bg-background">

                <nav class="grid grid-flow-col gap-6">
                    <a class="btn btn-ghost btn-sm btn-circle">
                        <i class="fa-brands fa-github text-2xl"></i>
                    </a>
                    <a class="btn btn-ghost btn-sm btn-circle">
                        <i class="fa-brands fa-twitter text-2xl"></i>
                    </a>
                    <a class="btn btn-ghost btn-sm btn-circle">
                        <i class="fa-brands fa-facebook text-2xl"></i>
                    </a>
                    <a class="btn btn-ghost btn-sm btn-circle">
                        <i class="fa-brands fa-youtube text-2xl"></i>
                    </a>
                </nav>

                <nav>
                    <div class="flex flex-wrap justify-center gap-y-2 gap-x-6 text-lg">
                        <a class="link link-hover">Contactanos</a>
                        <a class="link link-hover">Servicios</a>
                        <a class="link link-hover">Politicas de Privacidad</a>
                        <a class="link link-hover">Terminos y Condiciones</a>
                        <a class="link link-hover">Acerca de Nosotros</a>
                    </div>
                </nav>
            </div>

            <aside class="bg-background py-4 px-8 w-full flex gap-2 flex-wrap justify-between items-center text-sm">
                <p class="text-xl flex items-center gap-2">
                    <img alt="Logo" src="./logoCoalBlanco.png" class="w-8" />
                    <span>Coal</span>
                </p>
                <p>Copyright © 2024 - All rights reserved</p>
            </aside>
</footer>
        
        </>

    )

}

export default Footer;


