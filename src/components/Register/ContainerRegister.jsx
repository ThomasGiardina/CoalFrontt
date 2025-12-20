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
        <div className="min-h-[600px] w-full max-w-[1400px] rounded-lg flex flex-col lg:flex-row bg-neutral mx-auto overflow-hidden">
            {/* Carousel - Left side */}
            <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-6">
                <CarruselLogin />
            </div>

            {/* Form - Right side */}
            <div className="flex flex-col justify-center items-center lg:items-start w-full lg:w-1/2 p-6 sm:p-8 lg:p-10">
                <div className="w-full max-w-[400px]">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 lg:mb-8 text-white font-bold">Crear Cuenta</h1>
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
                    <div className="flex justify-center mt-4 mb-4">
                        <span className="text-white text-sm sm:text-base text-center">
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
