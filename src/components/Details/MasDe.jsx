import JuegosDesarrolladora from "./JuegosDesarrolladora";

const MasDe =() =>{
    return (
        <>
        <div className="ml-5 mt-5 flex justify-between items-center">
            <div className="flex items-center">
                <img alt="Logo" src="./logoCoalBlanco.png" className="w-8" />
                <p className="text-2xl ml-3">MÁS DE MOTION TWIN</p>
            </div>
            <div>
                <button className="btn mr-5 w-60" style={{backgroundColor:"#1B2838"}}>Ver Toda La Lista</button>
            </div>
        </div>
        <div className="mt-5 ml-5 mr-5 mb-5">
            <JuegosDesarrolladora />
        </div>
        
        
        </>

    )
}

export default MasDe;