const PaymentCard = () => {
    const cardHolderName = "Luigi Aducci";
    const cardNumber = "1111222233334444";
    const expiryDate = "12/25";
    const cardType = "VISA";

    const maskCardNumber = (number) => {
        return number.slice(0, -4).replace(/\d/g, "*") + number.slice(-4);
    };

    return (
        <div className="h-[120px] w-[600px] rounded-lg p-5 ml-6 mb-6" style={{backgroundColor: "#2d2d2d", color: "white"}}>
            <div className="flex justify-between">
                <h1 className="text-lg font-bold">{cardHolderName}</h1>
                <span className="text-sm font-bold">{cardType}</span>
                
            </div>
            <div className="flex justify-between items-end h-full">
                <div className="text-lg font-mono tracking-widest mb-4">
                    {maskCardNumber(cardNumber)}
                </div>
                <div className="flex items-center space-x-4 mb-5">
                    <i className="fa-solid fa-pen text-white cursor-pointer"></i> 
                    <i className="fa-solid fa-trash text-red-500 cursor-pointer"></i> 
                </div>
            </div>
        </div>
    );
}

export default PaymentCard;
