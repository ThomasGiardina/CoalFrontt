const Homehero = (Homehero) => {
    return (
        <div className="hero min-h-screen ml-5 max-w-3xl">
            <div className="hero-content flex items-center justify-start lg:flex-row-reverse">
                <div className="text-left lg:text-left">
                    <h1 className="text-7xl font-bold">Explora, Juega y Conquista</h1>
                    <p className="py-6 text-2xl">
                    Los mejores videojuegos, al mejor precio. Encuentra tus favoritos y descubre nuevas aventuras hoy mismo.
                    </p>
                    <div className="flex flex-row items-center">
                        <button className="btn btn-primary text-extra h-16 w-48 text-xl">Explorar Tienda</button>
                        <button className="btn btn-outline btn-primary ml-3 h-16 w-48 text-xl">Default</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homehero;
