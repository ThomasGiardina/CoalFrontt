import { useState } from 'react';
import InputsRegister from './InputsRegister';
import CarruselLogin from './CarruselLogin';
import Check from './Check';
import BotonRegister from './BotonRegister';
import DivLogin from './DivLogin';
import BotonesLinksRegister from './BotonesLinksRegister';
import { Link } from 'react-router-dom';

const ContainerRegister = () => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        firstname: '',
        lastname: '',
    });

    return (
        <div className="min-h-[600px] w-full max-w-[1275px] rounded-lg flex flex-col lg:flex-row bg-neutral mx-auto">
            <div className="hidden lg:block my-5 ml-5 mr-6 lg:mr-24">
                <CarruselLogin />
            </div>
            <div className="flex flex-col justify-center my-6 sm:my-8 lg:my-20 px-6 sm:px-8 lg:px-0 w-full lg:w-auto max-w-[500px] lg:max-w-none mx-auto lg:mx-0">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-6 lg:mb-10 text-white font-bold">Crear Cuenta</h1>
                <InputsRegister setFormData={setFormData} formData={formData} />
                <div className="mt-3 sm:mt-4 flex items-start sm:items-center">
                    <div className="flex-shrink-0">
                        <Check />
                    </div>
                    <span className="ml-3 text-white text-xs sm:text-sm leading-tight">Acepto los Términos y Condiciones</span>
                </div>
                <BotonRegister formData={formData} />
                <div className="mt-3">
                    <DivLogin />
                </div>
                <BotonesLinksRegister />
                <div className="flex justify-center mt-3 sm:mt-4 mb-3 sm:mb-4">
                    <span className="text-white text-sm sm:text-base text-center">
                        ¿Ya tienes cuenta?{' '}
                        <Link to="/Login" className="text-blue-500 hover:text-blue-400 transition">
                            Iniciar sesión
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ContainerRegister;
