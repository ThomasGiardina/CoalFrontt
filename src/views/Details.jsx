import ContainerDetails from "../components/Details/ContainerDetails";

const Details = () => {

    return (
        <div className="relative min-h-screen flex items-center justify-center"  style={{backgroundImage:"url('/deadcellsPortada.jpg')", backgroundRepeat: "no-repeat", backgroundSize: "cover",backgroundPosition: "center"}}>
            <div className="absolute inset-0  opacity-95" style={{backgroundColor:'#192734'}}></div>
            <div className="relative z-10">
                <ContainerDetails />
            </div>
            
        
        
        </div>

    )

}

export default Details;