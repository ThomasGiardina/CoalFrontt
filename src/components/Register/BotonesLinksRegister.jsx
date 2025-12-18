const BotonesLinksRegister = () => {

    return (
        <div className="flex flex-col sm:flex-row gap-2 w-full max-w-[520px]">
            <button className="btn btn-outline w-full sm:w-1/2 h-10 sm:h-12 text-sm sm:text-base">
                <i className="fab fa-google mr-2"></i>Google
            </button>
            <button className="btn btn-outline w-full sm:w-1/2 h-10 sm:h-12 text-sm sm:text-base">
                <i className="fab fa-apple mr-2"></i>Apple
            </button>
        </div>

    )

}

export default BotonesLinksRegister;