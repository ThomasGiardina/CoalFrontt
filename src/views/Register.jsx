import ContainerRegister from "../components/Register/ContainerRegister";

function Register() {
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-background py-8 sm:py-12">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url('/portada.png')`,
                    filter: 'brightness(50%) blur(3px)' 
                }}
            ></div>
            <div className="relative z-10 mb-8 w-full px-4">
                <ContainerRegister />
            </div>
        </div>
    );
}

export default Register;
