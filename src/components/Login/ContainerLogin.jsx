import { useState } from 'react';
import InputsLogin from "./InputsLogin";
import CarruselLogin from "../Register/CarruselLogin";
import Check from "../Register/Check";
import BotonLogin from "./BotonLogin";
import DivLogin from "../Register/DivLogin";
import BotonesLinksLogin from "./BotonesLinksLogin";
import { Link } from "react-router-dom";

const ContainerLogin = () => {
    const [email, setEmail] = useState("");   
    const [password, setPassword] = useState(""); 

    return (
        <>
            <div className='h-[700px] w-[1275px] rounded-lg flex' style={{ backgroundColor: '#2B2738' }}>
                <div className="my-5 ml-5 mr-28">
                    <CarruselLogin />
                </div>
                <div className="flex flex-col my-20">
                    <a className="text-6xl mb-10">Iniciar Sesión</a>
                    <InputsLogin setEmail={setEmail} setPassword={setPassword} />
                    <div className="mt-5 flex items-center">
                        <Check />
                        <a className="ml-3">Recuerdame</a>
                    </div>
                    <BotonLogin email={email} password={password} />
                    <div className="flex justify-center mt-5">
                        <a target="_blank" href="https://youtu.be/2qvAxPqy2wA" style={{ color: "#1E90FF" }}>
                            ¿Olvidaste tu Contraseña?
                        </a>
                    </div>
                    <DivLogin />
                    <BotonesLinksLogin />
                    <div className="flex justify-center mt-5 mb-5">
                        <a>¿No tienes cuenta? <Link to="/Register" style={{ color: "#1E90FF" }}>Registrate</Link></a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContainerLogin;
