import InputsLogin from "./InputsLogin";
import CarruselLogin from "./CarruselLogin";
import Check from "./Check";
import BotonLogin from "./BotonLogin";
import DivLogin from "./DivLogin";
import BotonesLinksLogin from "./BotonesLinksLogin";
import Storenavbar from "../navbar/storenavbar";

const ContainerLogin = () => {

    return (
        <>
        <div className='h-[700px] w-8/12 rounded-lg flex' style={{ backgroundColor: '#2B2738' }}>
            <div className="my-5 ml-5 w-[600px]">
                <CarruselLogin />
            </div>
            <div className=" flex flex-col  my-20   ">
                <a className="text-6xl  mb-10">Crear Cuenta</a>
                <InputsLogin className="items-start" />
                <div className="mt-5 flex items-center">
                    <Check />
                    <a className="ml-3">Acepto los Terminos y Condiciones</a>
                </div>
                <BotonLogin className="my-5"/>
                <DivLogin className="my-28"/>
                <BotonesLinksLogin />
            </div>
        </div>
        </>
    )

}

export default ContainerLogin;