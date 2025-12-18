import NewContainerCart from "../components/Carrito/NewContainerCart";

const Cart = () => {
    return(
        <>
            <div className="relative min-h-screen flex items-center justify-center bg-background py-4 sm:py-6">
                <div className="absolute inset-0 opacity-95 z-0"/>
                <div className="relative z-10 w-full">
                    <NewContainerCart />
                </div>
            
            </div>
        </>
    )
}

export default Cart;