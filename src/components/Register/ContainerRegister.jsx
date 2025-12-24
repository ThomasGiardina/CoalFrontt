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
        <div className="min-h-[600px] w-full max-w-[950px] rounded-xl flex flex-col lg:flex-row bg-neutral mx-auto overflow-hidden shadow-2xl">
            <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8 bg-base-200/30">
                <CarruselLogin />
            </div>

            <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-6 sm:p-8 lg:p-10">
                <div className="w-full max-w-[380px]">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-6 text-white font-bold text-center lg:text-left">Crear Cuenta</h1>
                    <InputsRegister setFormData={setFormData} formData={formData} />
                    <div className="mt-4 flex items-center">
                        <Check />
                        <span className="ml-3 text-white text-xs sm:text-sm">Acepto los Términos y Condiciones</span>
                    </div>
                    <BotonRegister formData={formData} />
                    <div className="mt-3">
                        <DivLogin />
                    </div>
                    <BotonesLinksRegister />
                    <div className="flex justify-center mt-4 mb-2">
                        <span className="text-white text-sm text-center">
                            ¿Ya tienes cuenta?{' '}
                            <Link to="/Login" className="text-primary hover:text-primary/80 transition">
                                Iniciar sesión
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContainerRegister;
