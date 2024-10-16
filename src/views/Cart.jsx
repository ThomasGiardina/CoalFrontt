import NewContainerCart from "../components/Carrito/NewContainerCart";

const Cart = () => {
    return(
        <>
            <div className="relative min-h-screen flex items-center justify-center bg-backgorund">
                <div className="absolute inset-0  opacity-95"/>
                <div className="relative z-10">
                    <NewContainerCart />
                </div>
            
            </div>
        </>
    )
}

export default Cart;