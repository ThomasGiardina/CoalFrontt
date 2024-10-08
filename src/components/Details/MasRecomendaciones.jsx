import GamercardRecomendaciones from "../Gamecard/GamecardRecomendacion";



const MasRecomendaciones =() =>{
    return (
        <>
        <div className="ml-5 mt-5 flex items-center">
            <p className="text-2xl">PRODUCTOS SIMILARES</p>
        </div>
        <div className="mt-5 ml-5 mr-5 mb-5 flex items-center ">
            <GamercardRecomendaciones />
            <GamercardRecomendaciones />
            <GamercardRecomendaciones />
            <GamercardRecomendaciones />
            <GamercardRecomendaciones />


        </div>
        
        
        </>

    )
}

export default MasRecomendaciones;