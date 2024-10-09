import ContainerRegister from "../components/Register/ContainerRegister";

function Register() {

    return (
        <>
        
        <div className="relative min-h-screen flex items-center justify-center h-max" style={{ backgroundImage: `url('/portada.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0  opacity-70" style={{backgroundColor:'#676279'}}></div>
            <div className="relative z-10">
                <ContainerRegister />
            </div>
        </div>
        </>
    )
}

export default Register;
    