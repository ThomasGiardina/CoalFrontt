import ContainerCart from "../components/Carrito/ContainerCart";

const Cart = () => {
    return(
        <>
            <div className="relative min-h-screen flex items-center justify-center"  style={{backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 70%, #1B2838 100%), url('/deadcellsPortada.jpg')", backgroundRepeat: "no-repeat", backgroundSize: "contain"}}>
                <div className="absolute inset-0  opacity-95" style={{backgroundColor:'#1B2838'}}></div>
                <div className="relative z-10">
                    <ContainerCart />
                </div>
            
            </div>
        </>
    )
}

export default Cart;