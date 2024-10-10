import PaymentCard from "./PaymentCard";

const PaymentSettings = () => {
    return (
        <>
            <div className="h-[800px] w-[650px] rounded-xl flex flex-col" style={{backgroundColor:"#2c3e50"}}>
                <h1 className="flex items-start ml-5 mt-5 text-3xl text-white">Metodos de Pago</h1>
                <p className="flex items-start ml-5 mt-5 text-white">Aquí puedes agregar y cambiar tus metodos de pago</p>
                <div className="flex flex-col justify-start mt-4 overflow-y-auto h-[555px] pt-5">
                    <PaymentCard />
                    <PaymentCard />
                    <PaymentCard />
                    <PaymentCard />
                    <PaymentCard /> 
                </div>
                <div className="flex justify-end mt-5 mr-5">
                    <button className="btn w-[200px] bg-black text-white rounded-md p-2">Agregar Metodo</button>
                </div>
            </div>
        </>
    );
}

export default PaymentSettings;
