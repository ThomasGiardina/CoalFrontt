import InputsRegister from "./InputsRegister";
import CarruselLogin from "./CarruselLogin";
import Check from "./Check";
import BotonRegister from "./BotonRegister";
import DivLogin from "./DivLogin";
import BotonesLinksRegister from "./BotonesLinksRegister";
import BotonRegister from "./BotonRegister";


const ContainerRegister = () => {

    return (
        <>
        <div className='h-[700px] w-[1275px] rounded-lg flex' style={{ backgroundColor: '#2B2738' }}>
            <div className="my-5 ml-5 mr-28">
                <CarruselLogin />
            </div>
            <div className=" flex flex-col  my-20   ">
                <a className="text-6xl  mb-10">Crear Cuenta</a>
                <InputsRegister className="items-start" />
                <div className="mt-5 flex items-center">
                    <Check />
                    <a className="ml-3">Acepto los Terminos y Condiciones</a>
                </div>
                <BotonRegister className="my-5"/>
                <div className="mt-3"><DivLogin /></div>
                <BotonesLinksRegister />
                <div className="flex justify-center mt-5"><a>¿Ya tienes cuenta? <a target="_blank" href="https://youtu.be/2qvAxPqy2wA" style={{color:"#1E90FF"}}>Iniciar sesión</a></a></div>
            </div>
        </div>
        </>
    )

}

export default ContainerRegister;