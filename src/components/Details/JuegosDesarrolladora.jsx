import { Link } from "react-router-dom";

const JuegosDesarrolladora = () => {
    return(
        <div className="flex items-center">
            <div className="card bg-base-100 w-60 shadow-xl rounded">
                <figure>
                    <img
                    src="./deadcellsPortada.jpg"
                    alt="Shoes" />
                    <Link
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                        to="/Details"
                    >
                        <span className="text-white text-xl font-bold">Ver juego</span>
                    </Link>
                </figure>
                <div className=" h-10">
                    <h2 className="mt-2 mr-2 text-end text-xl">$4.99</h2>
                </div>
            
            </div>

            <div className="card bg-base-100 w-60 shadow-xl ml-5 rounded">
                <figure>
                    <img
                    src="./deadcellsPortada.jpg"
                    alt="Shoes" />
                    <Link
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                        to="/Details"
                    >
                        <span className="text-white text-xl font-bold">Ver juego</span>
                    </Link>
                </figure>
                <div className=" h-10">
                    <h2 className="mt-2 mr-2 text-end text-xl">$4.99</h2>
                </div>

            </div>

            <div className="card bg-base-100 w-60 shadow-xl ml-5 rounded">
                <figure>
                    <img
                    src="./deadcellsPortada.jpg"
                    alt="Shoes" />
                    <Link
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                        to="/Details"
                    >
                        <span className="text-white text-xl font-bold">Ver juego</span>
                    </Link>
                </figure>
                <div className=" h-10">
                    <h2 className="mt-2 mr-2 text-end text-xl">$4.99</h2>
                </div>

            </div>

            <div className="card bg-base-100 w-60 shadow-xl ml-5 rounded">
                <figure>
                    <img
                    src="./deadcellsPortada.jpg"
                    alt="Shoes" />
                    <Link
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                        to="/Details"
                    >
                        <span className="text-white text-xl font-bold">Ver juego</span>
                    </Link>
                </figure>
                <div className=" h-10">
                    <h2 className="mt-2 mr-2 text-end text-xl">$4.99</h2>
                </div>

            </div>

            <div className="card bg-base-100 w-60 shadow-xl ml-5 rounded">
                <figure>
                    <img
                    src="./deadcellsPortada.jpg"
                    alt="Shoes" />
                    <Link
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                        to="/Details"
                    >
                <span className="text-white text-xl font-bold">Ver juego</span>
            </Link>
                </figure>
                <div className=" h-10">
                    <h2 className="mt-2 mr-2 text-end text-xl">$4.99</h2>
                </div>

            </div>

        </div>
    )
}

export default JuegosDesarrolladora;