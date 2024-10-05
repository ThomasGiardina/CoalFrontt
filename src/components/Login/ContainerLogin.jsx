import InputsLogin from "./InputsLogin";
import CarruselLogin from "../Register/CarruselLogin";
import Check from "../Register/Check";
import BotonLogin from "./BotonLogin";
import DivLogin from "../Register/DivLogin";
import BotonesLinksLogin from "./BotonesLinksLogin";

const ContainerLogin = () =>{

    return(
        <>
        <div className='h-[700px] w-[1275px] rounded-lg flex' style={{ backgroundColor: '#2B2738' }}>
            <div className="my-5 ml-5 mr-28">
                <CarruselLogin />
            </div>
            <div className=" flex flex-col  my-20   ">
                <a className="text-6xl  mb-10">Iniciar Sesión</a>
                <InputsLogin className="items-start" />
                <div className="mt-5 flex items-center">
                    <Check />
                    <a className="ml-3">Recuerdame</a>
                </div>
                <BotonLogin />
                <div className="flex justify-center  mt-5 "><a target="_blank" href="https://youtu.be/2qvAxPqy2wA" style={{color:"#1E90FF"}}>¿Olvidaste tu Contraseña?</a></div>
                <div className=""><DivLogin /></div>
                <BotonesLinksLogin />
                <div className="flex justify-center mt-5 mb-5 "><a>¿No tienes cuenta? <a target="_blank" href="https://youtu.be/2qvAxPqy2wA" style={{color:"#1E90FF"}}>Registrate</a></a></div>
            </div>
        </div>
        </>
    )
}

export default ContainerLogin;