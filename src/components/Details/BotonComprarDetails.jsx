import { Link } from "react-router-dom";

const BotonComprarDetails = () =>{

    return (
        <div className="join items-center">
            <div className=" join-item w-[120px] h-[48px] border border-black" style={{backgroundColor:"#314254"}}>
                <p className="text-end text-lg mr-2 mt-3" style={{ color: "#85BB2F" }}>$12.49 USD</p>
            </div>
            <Link to="/Cart" className="btn join-item w-[200px] h-[46px] text-#85BB2F" style={{backgroundColor:"#85BB2F"}}><p className="text-base" style={{color:"#314254"}} >Agregar al Carrito</p></Link>
        </div>
    )

}

export default BotonComprarDetails;