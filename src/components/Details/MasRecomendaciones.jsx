import JuegosRecomendados from "./JuegosRecomendados";


const MasRecomendaciones =() =>{
    return (
        <>
        <div className="ml-5 mt-5 flex items-center">
            <p className="text-2xl">PRODUCTOS SIMILARES</p>
        </div>
        <div className="mt-5 ml-5 mr-5 mb-5">
            <JuegosRecomendados />


        </div>
        
        
        </>

    )
}

export default MasRecomendaciones;