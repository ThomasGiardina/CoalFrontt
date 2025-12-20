import { useState } from 'react';
import InputsLogin from "./InputsLogin";
import CarruselLogin from "../Register/CarruselLogin";
import Check from "../Register/Check";
import BotonLogin from "./BotonLogin";
import DivLogin from "../Register/DivLogin";
import BotonesLinksLogin from "./BotonesLinksLogin";
import { Link } from "react-router-dom";
import ForgotPassword from './ForgotPassword';

const ContainerLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className='min-h-[600px] w-full max-w-[1400px] rounded-lg flex flex-col lg:flex-row bg-neutral mx-auto overflow-hidden'>
            {/* Carousel - Left side */}
            <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-6">
                <CarruselLogin />
            </div>

            {/* Form - Right side */}
            <div className="flex flex-col justify-center items-center lg:items-start w-full lg:w-1/2 p-6 sm:p-8 lg:p-10">
                <div className="w-full max-w-[400px]">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 lg:mb-8 text-white font-bold">Iniciar Sesión</h1>
                    <InputsLogin setEmail={setEmail} setPassword={setPassword} />
                    <div className="mt-4 flex items-center">
                        <Check />
                        <span className="ml-3 text-white text-sm sm:text-base">Recuérdame</span>
                    </div>
                    <BotonLogin email={email} password={password} />
                    <div className="flex justify-center mt-4">
                        <ForgotPassword />
                    </div>
                    <DivLogin />
                    <BotonesLinksLogin />
                    <div className="flex justify-center mt-4 mb-4">
                        <p className="text-white text-sm sm:text-base text-center">¿No tienes cuenta? <Link to="/Register" className="text-primary hover:text-primary/80 transition">Regístrate</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContainerLogin;