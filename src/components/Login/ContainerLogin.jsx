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
        <div className='min-h-[600px] w-full max-w-[950px] rounded-xl flex flex-col lg:flex-row bg-neutral mx-auto overflow-hidden shadow-2xl'>
            <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8 bg-base-200/30">
                <CarruselLogin />
            </div>

            <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-6 sm:p-8 lg:p-10">
                <div className="w-full max-w-[340px]">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-6 text-white font-bold text-center lg:text-left">Iniciar Sesión</h1>
                    <InputsLogin setEmail={setEmail} setPassword={setPassword} />
                    <div className="mt-4 flex items-center">
                        <Check />
                        <span className="ml-3 text-white text-sm">Recuérdame</span>
                    </div>
                    <BotonLogin email={email} password={password} />
                    <div className="flex justify-center mt-4">
                        <ForgotPassword />
                    </div>
                    <DivLogin />
                    <BotonesLinksLogin />
                    <div className="flex justify-center mt-4 mb-2">
                        <p className="text-white text-sm text-center">¿No tienes cuenta? <Link to="/Register" className="text-primary hover:text-primary/80 transition">Regístrate</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContainerLogin;