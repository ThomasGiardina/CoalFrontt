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
        <>
            <div className='min-h-[600px] w-full max-w-[1275px] rounded-lg flex flex-col lg:flex-row bg-neutral mx-auto'>
                <div className="hidden lg:block my-5 ml-5 mr-6 lg:mr-24">
                    <CarruselLogin />
                </div>
                <div className="flex flex-col justify-center my-6 sm:my-8 lg:my-20 px-6 sm:px-8 lg:px-0 w-full lg:w-auto max-w-[500px] lg:max-w-none mx-auto lg:mx-0">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-6 lg:mb-10 text-white font-bold">Iniciar Sesión</h1>
                    <InputsLogin setEmail={setEmail} setPassword={setPassword} />
                    <div className="mt-3 sm:mt-4 flex items-center">
                        <Check />
                        <span className="ml-3 text-white text-sm sm:text-base">Recuerdame</span>
                    </div>
                    <BotonLogin email={email} password={password} />
                    <div className="flex justify-center mt-3 sm:mt-4">
                        <ForgotPassword />
                    </div>
                    <DivLogin />
                    <BotonesLinksLogin />
                    <div className="flex justify-center mt-3 sm:mt-4 mb-3 sm:mb-4">
                        <p className="text-white text-sm sm:text-base text-center">¿No tienes cuenta? <Link to="/Register" className="text-blue-500 hover:text-blue-400 transition">Regístrate</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContainerLogin;